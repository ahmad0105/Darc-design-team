var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function n(e){if(typeof document>`u`)return null;let t=document.cookie.match(RegExp(`(?:^|; )`+e+`=([^;]*)`));return t?decodeURIComponent(t[1]):null}function r(){if(typeof window>`u`)return`ar`;try{let e=n(`darc_lang`)||window.localStorage.getItem(`darc-locale`);if(!e){let t=n(`darc_prefs`);if(t)try{e=JSON.parse(t).lang}catch{}}return e===`ar`||e===`en`?e:(navigator.languages&&navigator.languages[0]||navigator.language||``).toLowerCase().startsWith(`ar`)?`ar`:`en`}catch{return`ar`}}function i(){if(typeof window>`u`)return`light`;try{let e=n(`darc_theme`)||window.localStorage.getItem(`darc-theme`);if(!e){let t=n(`darc_prefs`);if(t)try{e=JSON.parse(t).theme}catch{}}if(e===`dark`||e===`light`)return e;if(window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).matches)return`dark`}catch{}return`light`}function a(){let e={view:`dashboard`,activeProjectId:null,projectTab:`overview`,settingsSection:`profile`};if(typeof window>`u`)return e;try{let e=window.location.hash.replace(/^#/,``);if(e&&![`login`,`forgot`].includes(e)){let[t,n]=e.split(`?`);if([`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`,`project-detail`].includes(t)){let e=null,r=`overview`,i=`profile`;if(n){let t=new URLSearchParams(n);t.get(`id`)&&(e=t.get(`id`)),t.get(`tab`)&&(r=t.get(`tab`)),t.get(`section`)&&(i=t.get(`section`))}return{view:t,activeProjectId:e,projectTab:r,settingsSection:i}}}let t=sessionStorage.getItem(`darc_last_route`);if(t){let e=JSON.parse(t);if(e.view)return{view:e.view,activeProjectId:e.activeProjectId||null,projectTab:e.projectTab||`overview`,settingsSection:e.settingsSection||`profile`}}}catch{}return e}var o=a(),s={lang:r(),theme:i(),view:o.view,activeProjectId:o.activeProjectId,projectTab:o.projectTab,settingsSection:o.settingsSection||`profile`,templateCategory:`all`,searches:{projects:``,tasks:``,templates:``,documents:``},taskFilter:`all`,taskProjectFilter:`all`,taskPriorityFilter:`all`,docTaskFilter:`all`,docProjectFilter:`all`,sidebarOpen:!1,isOffline:typeof navigator<`u`&&!navigator.onLine,data:null},c=`darc_offline_db`,l=1,u=`cache_store`,d=`darc_offline_bootstrap`,f=`darc_offline_mutations_queue`,p=!1,m=null;function h(){return typeof indexedDB>`u`?Promise.resolve(null):(m||=new Promise(e=>{try{let t=indexedDB.open(c,l);t.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(u)||t.createObjectStore(u)},t.onsuccess=()=>e(t.result),t.onerror=()=>e(null)}catch{e(null)}}),m)}async function g(e){let t=await h();return t?new Promise(n=>{try{let r=t.transaction(u,`readonly`).objectStore(u).get(e);r.onsuccess=()=>n(r.result||null),r.onerror=()=>n(null)}catch{n(null)}}):null}async function _(e,t){let n=await h();return n?new Promise(r=>{try{let i=n.transaction(u,`readwrite`).objectStore(u).put(t,e);i.onsuccess=()=>r(!0),i.onerror=()=>r(!1)}catch{r(!1)}}):!1}async function v(e){let t=await h();return t?new Promise(n=>{try{let r=t.transaction(u,`readwrite`).objectStore(u).delete(e);r.onsuccess=()=>n(!0),r.onerror=()=>n(!1)}catch{n(!1)}}):!1}function y(){return typeof navigator<`u`?navigator.onLine:!0}function b(e){if(!e)return;let t={timestamp:Date.now(),data:e};if(_(d,t).catch(()=>{}),typeof localStorage<`u`){let e=()=>{try{localStorage.setItem(d,JSON.stringify(t))}catch(e){console.warn(`[Offline] localStorage quota exceeded, relying on IndexedDB:`,e.message)}};typeof requestIdleCallback==`function`?requestIdleCallback(e,{timeout:2e3}):setTimeout(e,50)}}function x(){if(typeof localStorage<`u`)try{let e=localStorage.getItem(d);if(e){let t=JSON.parse(e);if(t?.data)return t.data}}catch{}return null}async function S(){let e=await g(d);return e?.data?e.data:x()}async function C(){if(typeof localStorage<`u`)try{localStorage.removeItem(d),localStorage.removeItem(f)}catch{}await Promise.all([v(d),v(f)]),ee()}function ee(){typeof window<`u`&&window.dispatchEvent(new CustomEvent(`darc:queue-change`,{detail:{count:re().length}}))}function te(e){return typeof crypto<`u`&&crypto.randomUUID?e+`_`+crypto.randomUUID().replace(/-/g,``).slice(0,16):e+`_`+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-8)}function ne({path:e,method:t=`POST`,body:n=null,description:r=``}){if(typeof localStorage>`u`)return null;try{let i=localStorage.getItem(f),a=i?JSON.parse(i):[];if(t===`DELETE`){if(e.startsWith(`/api/tasks/`)){let t=e.split(`/`)[3];if(a.some(e=>e.method===`POST`&&e.path===`/api/tasks`&&e.body?.id===t)){let e=a.filter(e=>!(e.path===`/api/tasks`&&e.body?.id===t||e.path===`/api/tasks/${t}`||e.path.startsWith(`/api/tasks/${t}/`)));return localStorage.setItem(f,JSON.stringify(e)),ee(),{id:`compacted`,compacted:!0}}}else if(e.startsWith(`/api/projects/`)){let t=e.split(`/`)[3];if(a.some(e=>e.method===`POST`&&e.path===`/api/projects`&&e.body?.id===t)){let e=a.filter(e=>!(e.path===`/api/projects`&&e.body?.id===t||e.path===`/api/projects/${t}`||e.method===`POST`&&e.path===`/api/tasks`&&e.body?.projectId===t));return localStorage.setItem(f,JSON.stringify(e)),ee(),{id:`compacted`,compacted:!0}}}}let o={id:`mut_`+Date.now()+`_`+Math.random().toString(36).substr(2,6),path:e,method:t,body:n,description:r,createdAt:new Date().toISOString()};return a.push(o),localStorage.setItem(f,JSON.stringify(a)),ee(),console.log(`[Offline Outbox] Enqueued mutation:`,o),o}catch(e){return console.warn(`[Offline Outbox] Failed to enqueue mutation:`,e.message),null}}function re(){if(typeof localStorage>`u`)return[];try{let e=localStorage.getItem(f);return e?JSON.parse(e):[]}catch{return[]}}function ie(){typeof localStorage<`u`&&(localStorage.removeItem(f),ee())}function ae(e,t,n,r){if(!r||!r.data)return{ok:!0,queued:!0,offline:!0};let i=new Date().toISOString();if(t===`POST`&&e===`/api/tasks`&&n){let e=n.id||te(`tsk`);n.id=e;let t={id:e,code:`OFFLINE`,projectId:n.projectId,titleAr:n.titleAr,titleEn:n.titleEn||n.titleAr,descriptionAr:n.descriptionAr||``,descriptionEn:n.descriptionEn||``,status:n.status||`not_started`,priority:n.priority||`medium`,categoryAr:n.categoryAr||`عام`,categoryEn:n.categoryEn||`General`,weight:Number(n.weight||1),progress:Number(n.progress||0),assigneeId:n.assigneeId||null,assignee:r.data.users?.find(e=>e.id===n.assigneeId)||null,reviewerId:n.reviewerId||null,startDate:n.startDate||null,dueDate:n.dueDate||null,customFields:n.customFields||{},createdAt:i,updatedAt:i,_isOfflinePending:!0};r.data.tasks||(r.data.tasks=[]);let a=r.data.tasks.findIndex(t=>t.id===e);return a===-1?r.data.tasks.unshift(t):r.data.tasks[a]=t,b(r.data),{ok:!0,queued:!0,offline:!0,task:t}}if(t===`PATCH`&&e.startsWith(`/api/tasks/`)&&n){let t=e.split(`/`)[3],a=(r.data.tasks||[]).findIndex(e=>e.id===t);if(a!==-1){let e={...r.data.tasks[a],...n,updatedAt:i,_isOfflinePending:!0};return n.assigneeId!==void 0&&(e.assignee=r.data.users?.find(e=>e.id===n.assigneeId)||null),r.data.tasks[a]=e,b(r.data),{ok:!0,queued:!0,offline:!0,task:e}}}if(t===`DELETE`&&e.startsWith(`/api/tasks/`)){let t=e.split(`/`)[3];return r.data.tasks&&(r.data.tasks=r.data.tasks.filter(e=>e.id!==t),b(r.data)),{ok:!0,queued:!0,offline:!0}}if(t===`POST`&&e===`/api/projects`&&n){let e=n.id||te(`prj`);n.id=e;let t={id:e,code:n.code||`DARC-OFF`,nameAr:n.nameAr||n.name||`مشروع محلي جديد`,nameEn:n.nameEn||n.name||`New Offline Project`,clientAr:n.clientAr||``,clientEn:n.clientEn||``,descriptionAr:n.descriptionAr||``,descriptionEn:n.descriptionEn||``,lifecycle:n.lifecycle||`planning`,health:n.health||`on_track`,progress:0,progressMode:`weighted`,managerId:n.managerId||r.data.user?.id,startDate:n.startDate||null,dueDate:n.dueDate||null,createdAt:i,updatedAt:i,_isOfflinePending:!0};r.data.projects||(r.data.projects=[]);let a=r.data.projects.findIndex(t=>t.id===e);return a===-1?r.data.projects.unshift(t):r.data.projects[a]=t,b(r.data),{ok:!0,queued:!0,offline:!0,project:t}}if(t===`PATCH`&&e.startsWith(`/api/projects/`)&&n){let t=e.split(`/`)[3],a=(r.data.projects||[]).findIndex(e=>e.id===t);if(a!==-1){let e={...r.data.projects[a],...n,updatedAt:i,_isOfflinePending:!0};return r.data.projects[a]=e,b(r.data),{ok:!0,queued:!0,offline:!0,project:e}}}if(t===`DELETE`&&e.startsWith(`/api/projects/`)){let t=e.split(`/`)[3];return r.data.projects&&(r.data.projects=r.data.projects.filter(e=>e.id!==t),b(r.data)),{ok:!0,queued:!0,offline:!0}}if(t===`POST`&&e.includes(`/comments`)&&n){let t=e.split(`/`)[3],a={id:n.id||te(`cmt`),taskId:t,userId:r.data.user?.id,content:n.content,createdAt:i,_isOfflinePending:!0};return n.id=a.id,r.data.comments||(r.data.comments=[]),r.data.comments.some(e=>e.id===a.id)||r.data.comments.push(a),b(r.data),{ok:!0,queued:!0,offline:!0,comment:a}}return t===`PATCH`&&e===`/api/tasks/reorder`&&n&&Array.isArray(n.items)&&r.data.tasks&&(n.items.forEach(e=>{let t=r.data.tasks.find(t=>t.id===e.id);t&&(e.status&&(t.status=e.status),e.sortOrder&&(t.sortOrder=e.sortOrder),e.customFields&&(t.customFields={...t.customFields||{},...e.customFields}),t._isOfflinePending=!0)}),b(r.data)),{ok:!0,queued:!0,offline:!0}}async function oe(e){if(p)return{total:0,synced:0,failed:0};let t=re();if(!t.length)return{total:0,synced:0,failed:0};p=!0,console.log(`[Offline Sync] Replaying ${t.length} pending mutations...`);let n=0,r=!1;for(let i=0;i<t.length;i++){let a=t[i];try{let t={method:a.method,headers:{"X-Offline-Replay":`true`,"X-Offline-Id":a.id,"X-Idempotency-Key":a.id}};a.body&&(t.body=typeof a.body==`string`?a.body:JSON.stringify(a.body));let r=await e(a.path,t);if(r&&r.error&&!r.ok)console.warn(`[Offline Sync] Dropping unprocessable mutation:`,a.id,r.error);else{n++;let e=a.body&&typeof a.body==`object`&&a.body.id||typeof a.path==`string`&&a.path.split(`/`)[3];e&&typeof window<`u`&&typeof window.recordRecentLocalMutation==`function`&&window.recordRecentLocalMutation(e)}}catch(e){if(console.error(`[Offline Sync] Failed to replay mutation:`,a.id,a.path,e.message),typeof navigator<`u`&&!navigator.onLine||e.message&&(e.message.includes(`تعذر الاتصال`)||e.message.includes(`fetch`)||e.message.includes(`NetworkError`)||e.name===`TypeError`)){let e=t.slice(i);typeof localStorage<`u`&&localStorage.setItem(f,JSON.stringify(e)),r=!0;break}}}return r||ie(),p=!1,ee(),{total:t.length,synced:n,failed:r?t.length-n:0}}var se=t({closeModal:()=>w,modalShell:()=>T,renderLoading:()=>ce,showToast:()=>E});function ce(){document.getElementById(`app`).innerHTML=`<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${O(`جاري تجهيز مساحة العمل...`,`Preparing your workspace...`)}</span></div></div>`}var le=!1;function w(e=!1){let t=document.getElementById(`preview-modal-overlay`);t&&(t.style.display=`none`,t.innerHTML=``);let n=document.getElementById(`modal-root`);if(!n||!n.hasChildNodes()){document.body.style.overflow=``;return}if(e){n.innerHTML=``,document.body.style.overflow=``,le=!1;return}if(le)return;le=!0;let r=n.querySelector(`.modal-backdrop`),i=n.querySelector(`.modal`);r&&i?(r.classList.add(`is-closing`),i.classList.add(`is-closing`),setTimeout(()=>{n.innerHTML=``,document.body.style.overflow=``,le=!1},150)):(n.innerHTML=``,document.body.style.overflow=``,le=!1)}function T(e,t,n,r=``,i=``){return document.body.style.overflow=`hidden`,`<div class="modal-backdrop"><div class="modal ${i}" data-modal="${r}"><div class="modal-head"><div><h2>${k(e)}</h2><p>${k(t||``)}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${O(`إغلاق`,`Close`)}">${j(`close`,15)}</button></div>${n}</div></div>`}function E(e,t=!1){let n=document.getElementById(`toast-root`);if(!n)return;let r=document.createElement(`div`);r.className=`toast ${t?`error`:``}`,r.innerHTML=`${j(t?`alert`:`check`,16)}<span>${k(e)}</span>`,n.appendChild(r),setTimeout(()=>r.remove(),3600)}var ue=t({I18N:()=>de,PERMISSION_ALIASES:()=>Oe,avatar:()=>M,can:()=>F,canManageAccountPermissions:()=>ke,choose:()=>O,currentViewTitle:()=>Ae,dateLabel:()=>be,dueLabel:()=>Ce,esc:()=>k,extractDrawingVersion:()=>ve,formatUnifiedDateNumeric:()=>xe,getActiveCalendarSystem:()=>ye,getCookieVal:()=>fe,getFileFormatInfo:()=>_e,getHijriDateEquivalent:()=>Se,getTaskStatusStyle:()=>ge,getTimeBasedGreeting:()=>he,icon:()=>j,initials:()=>me,isAdmin:()=>I,isOverdue:()=>we,playSuccessChime:()=>je,priorityText:()=>Ee,roleFor:()=>De,roleName:()=>P,sanitizeForSpreadsheet:()=>A,savePreferencesCookies:()=>pe,showToast:()=>E,statusBadge:()=>Te,statusText:()=>N,t:()=>D}),de={ar:{dashboard:`الرئيسية`,projects:`المشاريع`,myTasks:`مهامي`,templates:`قاعدة المخططات`,team:`فريق العمل`,reports:`التقارير`,settings:`الإعدادات`,workspace:`مساحة العمل`,overview:`نظرة عامة`,welcome:`صباح الخير`,welcomeText:`تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.`,portfolioHealth:`صحة المحفظة`,activeProjects:`مشاريع نشطة`,openTasks:`مهام مفتوحة`,overdue:`مهام متأخرة`,dueThisWeek:`تستحق هذا الأسبوع`,projectProgress:`تقدم المشاريع`,projectProgressSub:`نظرة سريعة على المشاريع التي تحتاج انتباهك.`,seeAll:`عرض الكل`,attention:`يحتاج انتباهك`,attentionSub:`أولويات اليوم والمواعيد القريبة.`,teamProgress:`إنجاز الفريق`,teamProgressSub:`الإنجاز حسب المهام المسندة.`,recentPulse:`نبض التنفيذ`,recentPulseSub:`حركة المهام خلال الأسابيع الأخيرة.`,noProjects:`لا توجد مشاريع حتى الآن`,noTasks:`لا توجد مهام في هذا العرض`,noAttention:`لا يوجد ما يحتاج انتباهًا الآن.`,addProject:`مشروع جديد`,addTask:`مهمة جديدة`,addMember:`إضافة عضو`,addRole:`دور جديد`,search:`بحث...`,filter:`تصفية`,all:`الكل`,active:`نشط`,planning:`تخطيط`,atRisk:`يحتاج انتباه`,onTrack:`على المسار`,offTrack:`متأخر`,onHold:`متوقف`,completed:`مكتمل`,archived:`مؤرشف`,tasks:`المهام`,timeline:`الجدول الزمني`,drawings:`المخططات`,documents:`المستندات`,activity:`النشاط`,status:`الحالة`,owner:`المسؤول`,deadline:`موعد التسليم`,progress:`الإنجاز`,completedTasks:`المهام المكتملة`,weightedProgress:`الإنجاز الموزون`,simpleProgress:`الإنجاز بالعدد`,dueDate:`تاريخ التسليم`,startDate:`تاريخ البداية`,client:`العميل`,manager:`مدير المشروع`,health:`صحة المشروع`,create:`إنشاء`,save:`حفظ التغييرات`,cancel:`إلغاء`,edit:`تعديل`,delete:`حذف`,invite:`إرسال دعوة`,deactivate:`تعطيل`,close:`إغلاق`,nameAr:`الاسم بالعربية`,nameEn:`الاسم بالإنجليزية`,description:`الوصف`,role:`الدور`,email:`البريد الإلكتروني`,jobTitle:`المسمى الوظيفي`,accountStatus:`حالة الحساب`,activeAccount:`مفعّل`,pendingAccount:`بانتظار الدعوة`,inactiveAccount:`معطّل`,company:`الشركة`,roles:`الأدوار والصلاحيات`,accounts:`حسابات الفريق`,audit:`سجل العمليات`,permissions:`الصلاحيات`,roleDescription:`وصف الدور`,custom:`مخصص`,builtIn:`أساسي`,noEmail:`لم يحدد البريد بعد`,emailNotConfigured:`مزود البريد غير مكوّن`,emailConfigured:`البريد مكوّن`,notification:`تنبيه`,notifications:`التنبيهات`,unread:`غير مقروء`,markRead:`تحديد كمقروء`,signOut:`تسجيل الخروج`,login:`تسجيل الدخول`,emailAddress:`البريد الإلكتروني`,password:`كلمة المرور`,loginIntro:`أدخل بياناتك للوصول إلى مساحة عمل DARC.`,demoHint:`حساب العرض: admin@darc.local / DARC-Admin-2026!`,standardLibrary:`مكتبة المخرجات القياسية`,standardLibrarySub:`33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.`,useTemplate:`استخدام القالب`,templatesCount:`قالب`,weight:`الوزن`,taskTitle:`اسم المهمة`,taskType:`نوع المخرج`,assignee:`المسند إليه`,priority:`الأولوية`,low:`منخفضة`,medium:`متوسطة`,high:`عالية`,urgent:`عاجلة`,notStarted:`غير مبدوءة`,inProgress:`قيد التنفيذ`,review:`للمراجعة`,approval:`بانتظار الاعتماد`,done:`مكتملة`,blocked:`متوقفة`,canceled:`ملغاة`,reminder:`تذكير`,reminderDate:`تاريخ التذكير`,reminderNote:`ملاحظة التذكير`,saveReminder:`حفظ التذكير`,addFromLibrary:`إضافة من المكتبة`,projectCode:`رمز المشروع`,lifecycle:`دورة المشروع`,adminOnly:`هذه المنطقة متاحة لمدير النظام فقط.`,emailStatus:`حالة البريد`,emailInfo:`عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.`,weightedExplanation:`الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.`,sampleData:`بيانات تجريبية`,projectOverview:`ملخص المشروع`,teamMembers:`أعضاء المشروع`,projectTasks:`مهام المشروع`,noMembers:`لم تتم إضافة أعضاء بعد`,permissionCount:`صلاحيات`,manageOnlyAdmin:`إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.`,confirmDeactivate:`هل تريد تعطيل هذا الحساب؟`,confirmDeleteRole:`هل تريد حذف هذا الدور المخصص؟`,accountReady:`جاهز للدخول`,noAccountAccess:`بانتظار تفعيل الحساب`,today:`اليوم`,days:`يوم`,ago:`منذ`,more:`المزيد`,viewDetails:`التفاصيل`,quickActions:`إجراءات سريعة`,total:`الإجمالي`,reviewed:`تمت المراجعة`,teamLoad:`عبء الفريق`,riskReason:`سبب التنبيه`,currentRevision:`الإصدار الحالي`,approved:`معتمد`,superseded:`مستبدل`,draft:`مسودة`,addReminder:`إضافة تذكير`,noReminder:`لا يوجد تذكير`},en:{dashboard:`Home`,projects:`Projects`,myTasks:`My tasks`,templates:`Drawing library`,team:`Team`,reports:`Reports`,settings:`Settings`,workspace:`Workspace`,overview:`Overview`,welcome:`Good morning`,welcomeText:`Stay close to the most important moves across DARC projects and make the next decision with confidence.`,portfolioHealth:`Portfolio health`,activeProjects:`Active projects`,openTasks:`Open tasks`,overdue:`Overdue tasks`,dueThisWeek:`Due this week`,projectProgress:`Project progress`,projectProgressSub:`A quick view of the projects that need your attention.`,seeAll:`View all`,attention:`Needs your attention`,attentionSub:`Today’s priorities and near-term deadlines.`,teamProgress:`Team progress`,teamProgressSub:`Progress by assigned work.`,recentPulse:`Execution pulse`,recentPulseSub:`Task movement over recent weeks.`,noProjects:`No projects yet`,noTasks:`No tasks in this view`,noAttention:`Nothing needs attention right now.`,addProject:`New project`,addTask:`New task`,addMember:`Add member`,addRole:`New role`,search:`Search...`,filter:`Filter`,all:`All`,active:`Active`,planning:`Planning`,atRisk:`Needs attention`,onTrack:`On track`,offTrack:`Off track`,onHold:`On hold`,completed:`Completed`,archived:`Archived`,tasks:`Tasks`,timeline:`Timeline`,drawings:`Drawings`,documents:`Documents`,activity:`Activity`,status:`Status`,owner:`Owner`,deadline:`Deadline`,progress:`Progress`,completedTasks:`Completed tasks`,weightedProgress:`Weighted progress`,simpleProgress:`Count progress`,dueDate:`Due date`,startDate:`Start date`,client:`Client`,manager:`Project manager`,health:`Project health`,create:`Create`,save:`Save changes`,cancel:`Cancel`,edit:`Edit`,delete:`Delete`,invite:`Send invite`,deactivate:`Deactivate`,close:`Close`,nameAr:`Arabic name`,nameEn:`English name`,description:`Description`,role:`Role`,email:`Email`,jobTitle:`Job title`,accountStatus:`Account status`,activeAccount:`Active`,pendingAccount:`Invite pending`,inactiveAccount:`Inactive`,company:`Company`,roles:`Roles & permissions`,accounts:`Team accounts`,audit:`Audit log`,permissions:`Permissions`,roleDescription:`Role description`,custom:`Custom`,builtIn:`Built-in`,noEmail:`Email not set`,emailNotConfigured:`Email provider not configured`,emailConfigured:`Email configured`,notification:`Notification`,notifications:`Notifications`,unread:`Unread`,markRead:`Mark as read`,signOut:`Sign out`,login:`Sign in`,emailAddress:`Email address`,password:`Password`,loginIntro:`Enter your details to access the DARC workspace.`,demoHint:`Demo account: admin@darc.local / DARC-Admin-2026!`,standardLibrary:`Standard deliverable library`,standardLibrarySub:`33 ready-to-use templates so every project starts at the same level.`,useTemplate:`Use template`,templatesCount:`templates`,weight:`Weight`,taskTitle:`Task name`,taskType:`Deliverable type`,assignee:`Assignee`,priority:`Priority`,low:`Low`,medium:`Medium`,high:`High`,urgent:`Urgent`,notStarted:`Not started`,inProgress:`In progress`,review:`In review`,approval:`Awaiting approval`,done:`Complete`,blocked:`Blocked`,canceled:`Canceled`,reminder:`Reminder`,reminderDate:`Reminder date`,reminderNote:`Reminder note`,saveReminder:`Save reminder`,addFromLibrary:`Add from library`,projectCode:`Project code`,lifecycle:`Project lifecycle`,adminOnly:`This area is available to the system administrator only.`,emailStatus:`Email status`,emailInfo:`Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.`,weightedExplanation:`Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.`,sampleData:`Demo data`,projectOverview:`Project overview`,teamMembers:`Project members`,projectTasks:`Project tasks`,noMembers:`No members have been added yet`,permissionCount:`permissions`,manageOnlyAdmin:`Adding, editing, and deleting roles and permissions is available to the system administrator only.`,confirmDeactivate:`Deactivate this account?`,confirmDeleteRole:`Delete this custom role?`,accountReady:`Ready to sign in`,noAccountAccess:`Account activation pending`,today:`Today`,days:`days`,ago:`ago`,more:`More`,viewDetails:`Details`,quickActions:`Quick actions`,total:`Total`,reviewed:`Reviewed`,teamLoad:`Team load`,riskReason:`Attention reason`,currentRevision:`Current revision`,approved:`Approved`,superseded:`Superseded`,draft:`Draft`,addReminder:`Add reminder`,noReminder:`No reminder`}};function D(e){return de[s.lang][e]||de.ar[e]||e}function O(e,t){return s.lang===`ar`?e:t}function fe(e){if(typeof document>`u`||!e)return null;let t=document.cookie?document.cookie.split(`; `):[];for(let n of t){let t=n.indexOf(`=`);if(t!==-1&&n.slice(0,t).trim()===e)return decodeURIComponent(n.slice(t+1))}return null}function pe({theme:e,lang:t}={}){if(typeof document>`u`)return;let n=31536e3,r=typeof window<`u`&&window.location.protocol===`https:`?`; Secure`:``,i=``;if(typeof window<`u`){let e=window.location.hostname;(e===`darc-design.bond`||e.endsWith(`.darc-design.bond`))&&(i=`; Domain=.darc-design.bond`)}let a=e===`dark`||e===`light`?e:null,o=t===`ar`||t===`en`?t:null;if(a){document.cookie=`darc_theme=${encodeURIComponent(a)}; Path=/; Max-Age=${n}; SameSite=Lax${r}${i}`;try{window.localStorage.setItem(`darc-theme`,a)}catch{}}if(o){document.cookie=`darc_lang=${encodeURIComponent(o)}; Path=/; Max-Age=${n}; SameSite=Lax${r}${i}`;try{window.localStorage.setItem(`darc-locale`,o)}catch{}}let c=a||(s&&s.theme===`dark`?`dark`:`light`)||`light`,l=o||(s&&s.lang===`en`?`en`:`ar`)||`ar`,u=JSON.stringify({theme:c,lang:l});document.cookie=`darc_prefs=${encodeURIComponent(u)}; Path=/; Max-Age=${n}; SameSite=Lax${r}${i}`}function k(e){return String(e??``).replace(/[&<>'"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,"'":`&#39;`,'"':`&quot;`})[e])}function A(e){if(e==null)return``;let t=String(e),n=t.trimStart();return/^[=+@\-]/.test(n)||/^[\t\r]/.test(t)?`'${t}`:t}function j(e,t=18){let n={grid:`<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>`,building:`<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>`,checklist:`<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>`,layers:`<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>`,users:`<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>`,chart:`<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>`,settings:`<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>`,bell:`<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>`,plus:`<path d="M12 5v14M5 12h14"/>`,search:`<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>`,arrow:`<path d="M5 12h14M13 6l6 6-6 6"/>`,arrowRight:`<path d="M5 12h14M13 6l6 6-6 6"/>`,arrowLeft:`<path d="M19 12H5M11 18l-6-6 6-6"/>`,calendar:`<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>`,clock:`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`,alert:`<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>`,check:`<path d="m5 12 4 4L19 6"/>`,chevron:`<path d="m9 18 6-6-6-6"/>`,chevronDown:`<path d="m6 9 6 6 6-6"/>`,logout:`<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>`,menu:`<path d="M4 6h16M4 12h16M4 18h16"/>`,close:`<path d="m6 6 12 12M18 6 6 18"/>`,shield:`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>`,mail:`<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>`,edit:`<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>`,trash:`<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>`,more:`<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>`,document:`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>`,filter:`<path d="M4 6h16M7 12h10M10 18h4"/>`,briefcase:`<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>`,eye:`<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>`,lock:`<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>`,send:`<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>`,user:`<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>`,target:`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>`,sparkles:`<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>`,folder:`<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>`,upload:`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>`,download:`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>`,printer:`<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>`,refresh:`<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>`,link:`<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,globe:`<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>`,info:`<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>`};return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${n[e]||n.info}</svg>`}function me(e){if(!e)return`D`;let t=s.lang===`ar`?e.name:e.nameEn||e.name;return(t.replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i,``).split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``)||t.slice(0,2)).toUpperCase()}function M(e,t=``){let n=e||{name:`DARC`,avatarColor:`#0d6269`},r=/^#[0-9a-f]{6}$/i.test(n.avatarColor||``)?n.avatarColor:`#0d6269`,i=k(O(n.name,n.nameEn||n.name));if(n.avatarUrl){let e=k(me(n)).replace(/['"\\]/g,``);return`<span class="avatar ${t}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${i}"><img src="${k(n.avatarUrl)}" alt="${i}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${r}';this.parentElement.textContent='${e}';" /></span>`}return`<span class="avatar ${t}" style="background:${r}" title="${i}">${k(me(n))}</span>`}function he(){let e=new Date().getHours();return s.lang===`ar`?e>=5&&e<12?`صباح الخير`:e>=12&&e<17||e>=17&&e<22?`مساء الخير`:`طابت ليلتك`:e>=5&&e<12?`Good morning`:e>=12&&e<17?`Good afternoon`:e>=17&&e<22?`Good evening`:`Good night`}function ge(e){let t=e?.status,n=we(e);return t===`done`||t===`completed`?{color:`#10b981`,bgColor:`#ecfdf5`,borderColor:`#059669`,textColor:`#065f46`,label:O(`مكتملة`,`Completed`)}:t===`review`||t===`approval`?{color:`#8b5cf6`,bgColor:`#f5f3ff`,borderColor:`#7c3aed`,textColor:`#5b21b6`,label:O(`للمراجعة والاعتماد`,`In Review`)}:t===`blocked`||n?{color:`#ef4444`,bgColor:`#fef2f2`,borderColor:`#dc2626`,textColor:`#991b1b`,label:n?O(`متأخرة`,`Overdue`):O(`متوقفة`,`Blocked`)}:t===`in_progress`||t===`progress`?{color:`#2563eb`,bgColor:`#eff6ff`,borderColor:`#3b82f6`,textColor:`#1e40af`,label:O(`قيد التنفيذ`,`In Progress`)}:{color:`#64748b`,bgColor:`#f8fafc`,borderColor:`#94a3b8`,textColor:`#334155`,label:O(`غير مبدوءة`,`Not Started`)}}function _e(e,t=``){let n=(e||``).split(`.`).pop()?.toLowerCase()||``;return[`dwg`,`dxf`].includes(n)?{ext:n.toUpperCase(),label:`AutoCAD`,color:`#0284c7`,bg:`rgba(2,132,199,0.12)`,border:`rgba(2,132,199,0.3)`,isCad:!0}:[`rvt`,`rfa`,`ifc`,`skp`,`pln`,`3ds`].includes(n)?{ext:n.toUpperCase(),label:`BIM / 3D`,color:`#7c3aed`,bg:`rgba(124,58,237,0.12)`,border:`rgba(124,58,237,0.3)`,isBim:!0}:n===`pdf`?{ext:`PDF`,label:`PDF Blueprint`,color:`#dc2626`,bg:`rgba(220,38,38,0.12)`,border:`rgba(220,38,38,0.3)`,isPdf:!0}:[`png`,`jpg`,`jpeg`,`webp`,`heic`].includes(n)?{ext:n.toUpperCase(),label:`Image`,color:`#059669`,bg:`rgba(5,150,105,0.12)`,border:`rgba(5,150,105,0.3)`,isImg:!0}:[`zip`,`rar`,`7z`,`tar`].includes(n)?{ext:n.toUpperCase(),label:`Archive`,color:`#d97706`,bg:`rgba(217,119,6,0.12)`,border:`rgba(217,119,6,0.3)`,isZip:!0}:{ext:n.toUpperCase()||`DOC`,label:`Document`,color:`#0d6269`,bg:`rgba(13,98,105,0.12)`,border:`rgba(13,98,105,0.3)`,isDoc:!0}}function ve(e){if(!e)return null;let t=e.match(/[_-\s]v(\d+)(\.|$)/i)||e.match(/\bv(\d+)\b/i);return t?`V${t[1]}`:null}function ye(){return s.calendarSystem||s.data?.user?.customFields?.calendarSystem||localStorage.getItem(`darc_calendar_system`)||`gregorian`}function be(e,t=!0){if(!e)return`—`;let n=new Date(String(e).length===10?`${e}T12:00:00`:e);if(Number.isNaN(n.getTime()))return`—`;if(ye()===`hijri`){let e=s.lang===`ar`?`ar-SA-u-ca-islamic-umalqura`:`en-u-ca-islamic-umalqura`;return new Intl.DateTimeFormat(e,{day:`numeric`,month:`short`,year:`numeric`}).format(n)}let r=s.lang===`ar`?`ar-u-ca-gregory`:`en-GB-u-ca-gregory`;return new Intl.DateTimeFormat(r,{day:`numeric`,month:`short`,year:`numeric`}).format(n)}function xe(e){if(!e)return`—`;let t=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(t.getTime())?`—`:`${String(t.getDate()).padStart(2,`0`)}/${String(t.getMonth()+1).padStart(2,`0`)}/${t.getFullYear()}`}function Se(e){if(!e)return``;let t=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`ar-SA-u-ca-islamic-umalqura`,{day:`numeric`,month:`long`,year:`numeric`}).format(t)}function Ce(e){if(!e)return`—`;let t=new Date(`${e}T23:59:59`),n=Math.ceil((t-new Date)/864e5);return n<0?O(`متأخرة ${Math.abs(n)} ${D(`days`)}`,`${Math.abs(n)} ${D(`days`)} ${D(`ago`)}`):n===0?D(`today`):O(`بعد ${n} ${D(`days`)}`,`in ${n} ${D(`days`)}`)}function we(e){return e?.dueDate&&![`done`,`completed`,`canceled`].includes(e.status)&&new Date(`${e.dueDate}T23:59:59`)<new Date}function N(e){return{not_started:D(`notStarted`),in_progress:D(`inProgress`),review:D(`review`),approval:D(`approval`),done:D(`done`),blocked:D(`blocked`),canceled:D(`canceled`),planning:D(`planning`),active:D(`active`),on_hold:D(`onHold`),completed:D(`completed`),archived:D(`archived`),on_track:D(`onTrack`),at_risk:D(`atRisk`),off_track:D(`offTrack`)}[e]||e}function Te(e){return e?`<span class="status-badge ${k(e)}">${k(N(e))}</span>`:`<span style="color:var(--muted)">—</span>`}function Ee(e){return{low:D(`low`),medium:D(`medium`),high:D(`high`),urgent:D(`urgent`)}[e]||e}function De(e){let t=typeof e==`string`?s.data?.users.find(t=>t.id===e):e;return t?s.data?.roles.find(e=>e.id===t.roleId)||{id:t.roleId,nameAr:t.roleNameAr||``,nameEn:t.roleNameEn||``,permissions:[]}:null}function P(e){let t=De(e);return t?O(t.nameAr,t.nameEn):`—`}var Oe={create_project:`create_projects`,create_projects:`create_project`,edit_project:`edit_projects`,edit_projects:`edit_project`,delete_project:`delete_projects`,delete_projects:`delete_project`,view_project:`view_projects`,view_projects:`view_project`,create_task:`create_tasks`,create_tasks:`create_task`,edit_task:`edit_tasks`,edit_tasks:`edit_task`,delete_task:`delete_tasks`,delete_tasks:`delete_task`,manage_tasks:`edit_tasks`,manage_roles:`manage_role`,manage_role:`manage_roles`,manage_template:`manage_templates`,manage_templates:`manage_template`,manage_company:`manage_settings`,manage_settings:`manage_company`};function F(e){let t=s.data?.role?.permissions||[];if(t.includes(`*`)||t.includes(e))return!0;let n=Oe[e];return!!(n&&t.includes(n))}function I(){return s.data?.user?.roleId===`admin`}function ke(){return I()||s.data?.user?.roleId===`account_permissions_manager`||s.data?.role?.permissions?.includes(`manage_existing_account_permissions`)}function Ae(){return s.view===`project-detail`?O(`تفاصيل المشروع`,`Project details`):{dashboard:D(`dashboard`),projects:D(`projects`),tasks:D(`myTasks`),documents:D(`documents`),templates:D(`templates`),team:D(`team`),reports:D(`reports`),settings:D(`settings`)}[s.view]||D(`dashboard`)}function je(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;let t=new e,n=t.currentTime,r=t.createOscillator(),i=t.createGain();r.type=`sine`,r.frequency.setValueAtTime(587.33,n),i.gain.setValueAtTime(.08,n),i.gain.exponentialRampToValueAtTime(.001,n+.35),r.connect(i),i.connect(t.destination),r.start(n),r.stop(n+.35);let a=t.createOscillator(),o=t.createGain();a.type=`sine`,a.frequency.setValueAtTime(880,n+.12),o.gain.setValueAtTime(.001,n),o.gain.setValueAtTime(.09,n+.12),o.gain.exponentialRampToValueAtTime(.001,n+.65),a.connect(o),o.connect(t.destination),a.start(n+.12),a.stop(n+.65)}catch{}}var Me=typeof window<`u`&&(window.location.hostname===`127.0.0.1`||window.location.hostname===`localhost`)?window.location.port===`8787`?`${window.location.protocol}//${window.location.hostname}:8787`:window.__API_BASE__===void 0?``:window.__API_BASE__:typeof window<`u`&&window.__API_BASE__?window.__API_BASE__:``,Ne=null;function Pe(){Ne=null}typeof document<`u`&&document.getElementById(`darc-global-progress`)?.remove();async function L(e,t={}){let n=[`POST`,`PATCH`,`PUT`,`DELETE`].includes(t.method),r=e.startsWith(`/api/auth`),i=!(!t.headers||t.headers[`X-Offline-Replay`]!==`true`&&t.headers[`X-Offline-Replay`]!==!0),a=null;if(n&&t.body)try{a=typeof t.body==`string`?JSON.parse(t.body):t.body}catch{}if(t.method===`POST`&&a&&typeof a==`object`&&!i&&(e===`/api/tasks`&&!a.id?(a.id=te(`tsk`),t.body=JSON.stringify(a)):e===`/api/projects`&&!a.id?(a.id=te(`prj`),t.body=JSON.stringify(a)):e.includes(`/comments`)&&!a.id&&(a.id=te(`cmt`),t.body=JSON.stringify(a))),typeof navigator<`u`&&!navigator.onLine&&n&&!r){if(i)throw Error(O(`تعذر الاتصال بالخادم، ما زال النظام دون اتصال.`,`Unable to connect to server. System is still offline.`));let n=ne({path:e,method:t.method,body:a}),r=ae(e,t.method,a,s);return E(O(`أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة النت 📡`,`Offline mode: action saved locally and will auto-sync on reconnect 📡`),!1),{ok:!0,queued:!0,offline:!0,id:n?.id,...r}}let o=typeof localStorage<`u`?localStorage.getItem(`darc_token`):null,c=!!(t.silent||t.headers&&t.headers[`X-Silent`])&&!!s.data&&!!Ne,l=n?`mut_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`:null,u={...o?{Authorization:`Bearer ${o}`}:{},...t.body?{"Content-Type":`application/json`}:{},...l?{"X-Mutation-ID":l}:{},...e===`/api/bootstrap`&&c?{"If-None-Match":Ne}:{},...e===`/api/bootstrap`&&!c?{"Cache-Control":`no-cache, no-store`}:{},...t.headers||{}};e===`/api/bootstrap`&&!c&&(t.cache=`no-cache`),t.credentials=`include`;let d;try{d=await fetch(Me+e,{...t,headers:u})}catch{if(n&&!r&&!i){let n=ne({path:e,method:t.method,body:a}),r=ae(e,t.method,a,s);return E(O(`تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية 📡`,`Connection lost: action saved locally for auto-sync 📡`),!1),{ok:!0,queued:!0,offline:!0,id:n?.id,...r}}throw Error(O(`تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.`,`Unable to connect to server. Please check your internet connection.`))}if(d.status===304)return null;if(!d.ok){let t=await d.text();d.status!==401&&console.error(`API Failed [${e}]: ${d.status} - ${t}`);let n={};try{n=JSON.parse(t)}catch{}d.status===401&&(Ne=null,typeof window<`u`&&typeof window.disconnectSupabaseRealtime==`function`&&window.disconnectSupabaseRealtime(`unauthorized_401`),e!==`/api/auth/login`&&(typeof localStorage<`u`&&localStorage.removeItem(`darc_token`),s.data&&(s.data.user=null),typeof window<`u`&&window.location.hash!==`#login`&&(window.location.hash=`#login`)));let r=Error(n.error||`Failed to fetch ${e}`);throw r.status=d.status,r}let f=d.headers.get(`ETag`);f&&e===`/api/bootstrap`&&(Ne=f);let p=await d.json();if([`POST`,`PATCH`,`PUT`,`DELETE`].includes(t.method)){Pe();let n=a&&typeof a.id==`string`?a.id:null;if(!n&&p&&typeof p==`object`&&(n=p.id||p.task?.id||p.project?.id||p.comment?.id||p.document?.id||p.data?.id),!n&&typeof e==`string`){let t=e.split(`/`);t.length>=4&&t[3]&&!t[3].includes(`?`)&&(n=t[3])}if(n&&typeof window<`u`&&typeof window.recordRecentLocalMutation==`function`&&window.recordRecentLocalMutation(n),l&&typeof window<`u`&&typeof window.recordRecentLocalMutation==`function`&&window.recordRecentLocalMutation(l),e!==`/api/auth/login`&&e!==`/api/auth/logout`){let r=null;if(p&&(p.task?r={table:`tasks`,action:t.method===`POST`?`INSERT`:`UPDATE`,record:p.task}:p.project?r={table:`projects`,action:t.method===`POST`?`INSERT`:`UPDATE`,record:p.project}:p.comment?r={table:`comments`,action:t.method===`POST`?`INSERT`:`UPDATE`,record:p.comment}:p.document&&(r={table:`documents`,action:t.method===`POST`?`INSERT`:`UPDATE`,record:p.document})),!r&&t.method===`DELETE`&&n&&(e.startsWith(`/api/tasks/`)?r={table:`tasks`,action:`DELETE`,record:{id:n}}:e.startsWith(`/api/projects/`)?r={table:`projects`,action:`DELETE`,record:{id:n}}:e.startsWith(`/api/documents/`)?r={table:`documents`,action:`DELETE`,record:{id:n}}:e.startsWith(`/api/comments/`)&&(r={table:`comments`,action:`DELETE`,record:{id:n}})),typeof window<`u`){if(typeof window.notifyStateMutation==`function`)window.notifyStateMutation(r);else if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:r?`GRANULAR_DELTA`:`STATE_MUTATION`,delta:r,timestamp:Date.now()})}catch{}}}}return p}typeof window<`u`&&(window.api=L);var Fe=t({canAccessView:()=>R,getFirstAllowedView:()=>z,loadData:()=>Le,navItem:()=>B,refreshView:()=>W,renderApp:()=>V,renderSyncIndicator:()=>Ie,renderView:()=>H,switchView:()=>U});function R(e){return s.data?e===`dashboard`?F(`view_dashboard`):e===`projects`||e===`project-detail`?F(`view_projects`):e===`tasks`?F(`create_tasks`)||F(`edit_tasks`)||F(`delete_tasks`)||F(`assign_tasks`)||F(`review_tasks`)||F(`approve_tasks`)||F(`manage_reminders`)||F(`view_projects`)||I():e===`documents`?F(`upload_documents`)||F(`delete_documents`)||I():e===`templates`?F(`manage_templates`)||I():e===`team`?I()||F(`manage_users`):e===`reports`?F(`view_reports`)||I():e===`settings`:!0}function z(){for(let e of[`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`])if(R(e))return e;return`dashboard`}function Ie(){let e=re().length;return y()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${O(`انقر للمزامنة الفورية مع السيرفر`,`Click to sync now with server`)}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${O(`مزامنة معلقة`,`Pending Sync`)}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:``:`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${O(`وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً`,`Offline Mode — all actions stored locally and will auto-sync`)}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${O(`أوفلاين`,`Offline`)}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:``}
    </button>`}if(typeof window<`u`&&!window._darcSyncIndicatorBound){window._darcSyncIndicatorBound=!0;let e=()=>{let e=document.getElementById(`sync-status-indicator`);e&&(e.innerHTML=Ie())};window.addEventListener(`darc:queue-change`,e),window.addEventListener(`online`,e),window.addEventListener(`offline`,e)}function B(e,t,n){return`<button class="nav-item ${s.view===e||e===`projects`&&s.view===`project-detail`?`active`:``}" data-view="${e}">${j(n,17)}<span>${t}</span></button>`}function V(){if(s.data&&!R(s.view)&&(s.view=z()),typeof window<`u`){let e=window.location.hash.replace(/^#/,``);if(!e||e===`login`||e===`forgot`){let e=s.view;s.view===`project-detail`&&s.activeProjectId?e=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:``}`:s.view===`settings`&&s.settingsSection&&(e=`settings?section=${encodeURIComponent(s.settingsSection)}`),window._isInternalNav=!0,window.history&&window.history.replaceState?window.history.replaceState(null,``,`#${e}`):window.location.hash=`#${e}`}}document.body.classList.add(`in-app`),document.body.classList.toggle(`is-ltr`,s.lang===`en`),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang===`ar`?`rtl`:`ltr`;let e=(s.data?.notifications||[]).filter(e=>!e.read).length,t=s.data?.user||{},n=I()||F(`manage_settings`)||F(`manage_roles`)||F(`manage_users`)||F(`manage_trash`)||F(`view_audit_logs`);document.getElementById(`app`).innerHTML=`
    <div class="app-shell ${s.lang===`en`?`is-ltr`:``}">
      <aside class="sidebar ${s.sidebarOpen?`open`:``}">
        <div class="sidebar-brand">
          ${s.data?.company?.logoUrl?`<img src="${k(s.data.company.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${j(`building`,20)}</span>`:`<span class="brand-mark">${j(`building`,20)}</span>`}
          <div>
            <div class="brand-name">${k(O(s.data?.company?.nameAr||s.data?.company?.name||`DARC Design Team`,s.data?.company?.nameEn||s.data?.company?.name||`DARC Design Team`))}</div>
            <div class="brand-subtitle">${D(`workspace`)}</div>
          </div>
        </div>
        <div class="nav-title">${O(`مساحة العمل`,`WORKSPACE`)}</div>
        <nav class="nav-list">
          ${R(`dashboard`)?B(`dashboard`,D(`dashboard`),`grid`):``}
          ${R(`projects`)?B(`projects`,D(`projects`),`building`):``}
          ${R(`tasks`)?B(`tasks`,D(`myTasks`),`checklist`):``}
          ${R(`documents`)?B(`documents`,D(`documents`),`document`):``}
          ${R(`templates`)?B(`templates`,D(`templates`),`layers`):``}
          ${R(`team`)?B(`team`,D(`team`),`users`):``}
          ${R(`reports`)?B(`reports`,D(`reports`),`chart`):``}
        </nav>
        <div class="nav-separator"></div>
        <div class="nav-title">${n?O(`إدارة النظام`,`ADMIN`):O(`حسابي`,`MY ACCOUNT`)}</div>
        <nav class="nav-list">${B(`settings`,n?D(`settings`):O(`الملف الشخصي والأمان`,`Profile & Security`),`settings`)}</nav>
        <div class="sidebar-bottom">
          <div class="admin-badge">${M(t)}<div class="admin-info"><strong>${k(O(t.name,t.nameEn||t.name))}</strong><span>${k(P(t))}</span></div></div>
          <div class="sidebar-footer"><span>v1.0 · ${O(`نسخة عمل`,`Workspace build`)}</span><button data-action="logout" title="${D(`signOut`)}">${j(`logout`,15)}</button></div>
        </div>
      </aside>
      <section class="workspace">
        ${s.data?.isDemo||s.data?.user?.id===`usr_demo`?`
        <div class="demo-showcase-banner" style="display:flex;align-items:center;justify-content:space-between;background:linear-gradient(90deg, rgba(13,98,105,0.12), rgba(20,184,166,0.14));border-bottom:1px solid rgba(20,184,166,0.28);padding:8px 20px;font-size:12px;color:var(--ink);gap:12px;flex-wrap:wrap;z-index:90;">
          <div style="display:flex;align-items:center;gap:8px;font-weight:600;flex-wrap:wrap;">
            <span style="background:var(--brand-teal);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:12px;letter-spacing:0.5px;text-transform:uppercase;">${O(`بيئة عرض تجريبية`,`DEMO SHOWCASE`)}</span>
            <span style="background:rgba(239,68,68,0.1);color:#dc2626;font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;border:1px solid rgba(239,68,68,0.2);display:inline-flex;align-items:center;gap:4px;">⏱️ ${O(`تنظيف ذاتي كل 15 دقيقة`,`Auto-resets every 15m`)}</span>
            <span>${O(`مساحة تفاعلية مخصصة لاستعراض قدرات المنصة — تُحذف الملفات والتعديلات تلقائياً كل 15 دقيقة لحماية السيرفر ونظافة العرض.`,`Interactive sandbox showcasing DARC capabilities — all demo changes & uploads automatically purge every 15 minutes.`)}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button class="btn btn-xs btn-soft" data-action="reset-demo-sandbox" style="font-size:11px;padding:3px 10px;border-radius:6px;display:flex;align-items:center;gap:4px;">
              <span>🔄</span>
              <span>${O(`إعادة ضبط الآن`,`Reset Now`)}</span>
            </button>
          </div>
        </div>`:``}
        <header class="topbar">
          <div class="topbar-left"><button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">${j(`menu`,18)}</button><div><div class="topbar-kicker">DARC / ${D(`workspace`)}</div><div class="topbar-title">${k(Ae())}</div></div></div>
          <div class="topbar-right">
            <span id="sync-status-indicator">${Ie()}</span>
            <button class="topbar-search-trigger" data-action="open-omnisearch" title="${O(`بحث شامل وسريع`,`Omnisearch`)}">
              ${j(`search`,14)}
              <span>${O(`بحث شامل...`,`Search...`)}</span>
              <kbd class="shortcut-kbd">${typeof navigator<`u`&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?`⌘K`:`Ctrl+K`}</kbd>
            </button>
            <button class="icon-button" data-action="open-cheatsheet" title="${O(`دليل اختصارات لوحة المفاتيح (?)`,`Keyboard shortcuts guide (?)`)}" style="color:var(--ink-soft);" aria-label="Shortcuts">
              <kbd class="shortcut-kbd" style="font-size:12px;padding:2px 7px;font-weight:bold;">?</kbd>
            </button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-theme">${s.theme===`dark`?`☀️`:`🌙`}</button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-lang">${s.lang===`ar`?`EN`:`عربي`} ${j(`globe`,14)}</button>
            <button class="icon-button" data-action="show-notifications" aria-label="${D(`notifications`)}">${j(`bell`,17)}${e?`<span class="notification-dot"></span>`:``}</button>
            <div class="topbar-divider"></div>
            <div class="profile-chip">${M(t)}<div class="profile-chip-text"><strong>${k(O(t.name,t.nameEn||t.name))}</strong><span>${k(P(t))}</span></div></div>
          </div>
        </header>
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,H()}function H(){let e=document.getElementById(`main-content`);if(!e)return;R(s.view)||(s.view=z());let t=``;s.view===`dashboard`&&(t=renderDashboard()),s.view===`projects`&&(t=renderProjects()),s.view===`tasks`&&(t=renderTasks()),s.view===`documents`&&(t=renderDocuments()),s.view===`templates`&&(t=renderTemplates()),s.view===`team`&&(t=renderTeam()),s.view===`reports`&&(t=renderReports()),s.view===`settings`&&(t=renderSettings()),s.view===`project-detail`&&(t=renderProjectDetail()),e.innerHTML=t,s.view===`project-detail`&&s.projectTab===`timeline`&&setTimeout(drawTimelineArrows,0)}function U(e,t=void 0){s.data&&!R(e)&&(e=z()),s.view=e,t!==void 0&&(s.activeProjectId=t),e===`settings`&&!s.settingsSection&&(s.settingsSection=`profile`),s.sidebarOpen=!1,document.querySelector(`.sidebar`)?.classList.remove(`open`),document.querySelectorAll(`.nav-item`).forEach(t=>{let n=t.dataset.view,r=n===e||n===`projects`&&e===`project-detail`;t.classList.toggle(`active`,r)});let n=document.querySelector(`.topbar-title`);n&&(n.textContent=Ae());try{let t=e;e===`project-detail`&&s.activeProjectId?t=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:``}`:e===`settings`&&s.settingsSection&&(t=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof window<`u`&&window.location.hash.replace(/^#/,``)!==t&&(window._isInternalNav=!0,window.location.hash=t),typeof sessionStorage<`u`&&sessionStorage.setItem(`darc_last_route`,JSON.stringify({view:s.view,activeProjectId:s.activeProjectId,projectTab:s.projectTab,settingsSection:s.settingsSection}))}catch{}requestAnimationFrame(()=>{H();let e=document.getElementById(`main-content`);e&&(e.scrollTop=0,e.scrollLeft=0),typeof window<`u`&&window.scrollTo(0,0)})}async function W(e=!1){try{await Le(e)}catch(e){E(e.message,!0)}}async function Le(e=!1){try{let t=await L(`/api/bootstrap`,{silent:e});if(t===null){if(s.data)return;let e=await S();if(t=e&&e.user?e:await L(`/api/bootstrap`,{silent:!1,headers:{"Cache-Control":`no-cache, no-store`}}),!t)return}if(b(t),s.isOffline=!1,s.data?.tasks&&t?.tasks){let e=Date.now(),n=new Set(t.tasks.map(e=>e.id));for(let r of s.data.tasks)n.has(r.id)||e-(r.createdAt?new Date(r.createdAt).getTime():e)<12e4&&(t.tasks.unshift(r),n.add(r.id))}if(s.data?.projects&&t?.projects){let e=Date.now(),n=new Set(t.projects.map(e=>e.id));for(let r of s.data.projects)n.has(r.id)||e-(r.createdAt?new Date(r.createdAt).getTime():e)<12e4&&(t.projects.unshift(r),n.add(r.id))}let n=!1;if(s.data&&t){if(s.data.updatedAt!==t.updatedAt)n=!0;else if(s.data.tasks?.length!==t.tasks?.length||s.data.projects?.length!==t.projects?.length)n=!0;else{let e=s.data.tasks||[],r=t.tasks||[];for(let t=0;t<r.length;t++){let i=r[t],a=e[t];if(!a||a.id!==i.id||a.status!==i.status||(a.sortOrder||a.sort_order)!==(i.sortOrder||i.sort_order)||a.progress!==i.progress){n=!0;break}}if(!n){let e=s.data.projects||[],r=t.projects||[];for(let t=0;t<r.length;t++){let i=r[t],a=e[t];if(!a||a.id!==i.id||a.lifecycle!==i.lifecycle||a.health!==i.health||a.progress!==i.progress){n=!0;break}}}}}if(!s.data||n||s.data.comments?.length!==t.comments?.length||s.data.documents?.length!==t.documents?.length||s.data.users?.length!==t.users?.length||s.data.auditLogs?.length!==t.auditLogs?.length||s.data.notifications?.length!==t.notifications?.length){s.data=t,R(s.view)||(s.view=z());let n=!!document.getElementById(`modal-root`)?.children?.length,r=!!(document.querySelector(`.is-dragging`)||document.querySelector(`.touch-dragging`)||document.querySelector(`.drag-placeholder`)),i=!!(document.activeElement&&[`INPUT`,`TEXTAREA`].includes(document.activeElement.tagName)&&document.getElementById(`main-content`)?.contains(document.activeElement));if(e&&(r||i))return;requestAnimationFrame(!e&&!n?()=>V():()=>H())}else s.data=t,R(s.view)||(s.view=z(),requestAnimationFrame(()=>H()))}catch(t){if(t&&(t.status===401||t.status===403))throw t;let n=await S();if(n){s.data=n,R(s.view)||(s.view=z()),s.isOffline=!0;let t=!!document.getElementById(`modal-root`)?.children?.length;!e&&!t?V():H();return}throw t}}typeof window<`u`&&(window.renderApp=V,window.renderView=H);var Re=t({calculatePasswordStrength:()=>ze,openForcePasswordModal:()=>Ke,renderActivation:()=>We,renderLogin:()=>G,renderResetPassword:()=>Ge,renderStrengthMeterHtml:()=>Be});function ze(e){let t=String(e||``);if(!t)return{score:0,label:``,percent:0,color:`var(--line)`};let n=0;return t.length>=10&&(n+=1),/[a-z]/.test(t)&&/[A-Z]/.test(t)&&(n+=1),/\d/.test(t)&&(n+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(t)&&(n+=1),n===1?{score:1,label:s.lang===`ar`?`ضعيفة جداً`:`Very weak`,percent:25,color:`var(--red)`}:n===2?{score:2,label:s.lang===`ar`?`متوسطة`:`Fair`,percent:50,color:`var(--amber)`}:n===3?{score:3,label:s.lang===`ar`?`جيدة`:`Good`,percent:75,color:`var(--blue)`}:{score:4,label:s.lang===`ar`?`قوية وممتازة 🛡️`:`Strong & Secure 🛡️`,percent:100,color:`var(--mint-strong)`}}function Be(e=`strength`){return`
    <div id="${e}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${e}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${e}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${s.lang===`ar`?`10 أحرف + أرقام ورموز`:`10+ chars, mixed, digits & symbols`}</span>
      </div>
    </div>
  `}function Ve(e,t,n,r,i){let a=document.getElementById(e);if(!a)return;let o=a.querySelector(`input[name="${t}"]`),c=a.querySelector(`input[name="${n}"]`),l=a.querySelector(i||`button[type="submit"]`),u=document.getElementById(`${r}-meter-wrap`),d=document.getElementById(`${r}-meter-bar`),f=document.getElementById(`${r}-meter-label`),p=document.getElementById(`${r}-match-indicator`);function m(){let e=o?o.value:``,t=c?c.value:``;if(e&&u&&d&&f){u.style.display=`flex`;let t=ze(e);d.style.width=`${t.percent}%`,d.style.background=t.color,f.textContent=t.label,f.style.color=t.color}else u&&(u.style.display=`none`);c&&p&&(t?e===t?(p.style.display=`block`,p.style.color=`var(--mint-strong)`,p.textContent=s.lang===`ar`?`✓ كلمتا المرور متطابقتان`:`✓ Passwords match`,l&&(l.disabled=!1)):(p.style.display=`block`,p.style.color=`var(--red)`,p.textContent=s.lang===`ar`?`✗ كلمتا المرور غير متطابقتين`:`✗ Passwords do not match`,l&&(l.disabled=!0)):(p.style.display=`none`,l&&(l.disabled=!1)))}o?.addEventListener(`input`,m),c?.addEventListener(`input`,m)}function He(){document.querySelectorAll(`[data-action="toggle-password-visibility"]`).forEach(e=>{e.onclick=t=>{t.preventDefault();let n=e.getAttribute(`data-target`),r=n?document.getElementById(n):e.parentElement.querySelector(`input`);if(!r)return;let i=r.type===`password`;r.type=i?`text`:`password`,e.style.color=i?`var(--teal)`:`var(--ink-soft)`,e.setAttribute(`aria-label`,i?s.lang===`ar`?`إخفاء كلمة المرور`:`Hide password`:s.lang===`ar`?`إظهار كلمة المرور`:`Show password`)}}),document.querySelectorAll(`input[type="password"]`).forEach(e=>{let t=t=>{let n=t.getModifierState&&t.getModifierState(`CapsLock`),r=e.parentElement.parentElement.querySelector(`.capslock-warning`);n?r||(r=document.createElement(`div`),r.className=`capslock-warning`,r.style.fontSize=`11px`,r.style.color=`var(--amber)`,r.style.marginTop=`4px`,r.style.display=`flex`,r.style.alignItems=`center`,r.style.gap=`4px`,r.innerHTML=`<span>⚠️</span> <span>${s.lang===`ar`?`زر الحروف الكبيرة (Caps Lock) مفعّل`:`Caps Lock is active`}</span>`,e.parentElement.parentElement.appendChild(r)):r&&r.remove()};e.addEventListener(`keydown`,t),e.addEventListener(`keyup`,t)})}function Ue(e,t=60){if(!e)return;e.disabled=!0;let n=t,r=e.innerHTML,i=setInterval(()=>{n--,e.innerHTML=`<span>${s.lang===`ar`?`يرجى الانتظار (${n} ثانية)...`:`Please wait (${n}s)...`}</span>`,n<=0&&(clearInterval(i),e.disabled=!1,e.innerHTML=r)},1e3)}function G(e=``,t=`login`,n=!1){if(s.view=`login`,typeof window<`u`){let e=t===`forgot`?`#forgot`:`#login`;window.location.hash!==e&&(window.history&&window.history.replaceState?window.history.replaceState(null,``,e):window.location.hash=e)}document.body.classList.remove(`in-app`),document.body.classList.toggle(`is-ltr`,s.lang===`en`),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang===`ar`?`rtl`:`ltr`,document.documentElement.dataset.theme=s.theme||`light`;let r=``,i=e?`<div class="login-demo" style="border-color:${n?`#cce3e0`:`var(--red-soft)`};background:${n?`#f0f9f7`:`var(--red-soft)`};color:${n?`var(--teal)`:`var(--red)`};margin-top:0;margin-bottom:15px">${j(n?`check`:`alert`,15)}<span>${k(e)}</span></div>`:``,a=(typeof localStorage<`u`?localStorage.getItem(`darc_last_email`):``)||``;t===`login`?r=`
      <form id="login-form">
        <div class="field">
          <label for="login-email">${D(`emailAddress`)}</label>
          <input id="login-email" name="email" type="email" autocomplete="username" placeholder="name@darc.com" value="${k(a)}" required />
        </div>
        <div class="field">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <label for="login-password">${D(`password`)}</label>
            <a href="#" data-action="goto-forgot" style="font-size:12px;color:var(--blue);text-decoration:none">${O(`نسيت كلمة المرور؟`,`Forgot password?`)}</a>
          </div>
          <div style="position:relative;display:flex;align-items:center;">
            <input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
            <button type="button" data-action="toggle-password-visibility" data-target="login-password" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${O(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin:4px 0 16px;font-size:12px;">
          <label style="display:flex;align-items:center;gap:7px;cursor:pointer;color:var(--ink-soft);user-select:none;">
            <input type="checkbox" id="remember-email-check" ${a?`checked`:``} style="cursor:pointer;accent-color:var(--teal);" />
            <span>${O(`تذكر بريدي الإلكتروني على هذا الجهاز`,`Remember my email on this device`)}</span>
          </label>
        </div>
        <div id="turnstile-widget-container" style="margin-bottom:14px;min-height:65px;display:flex;justify-content:center;"></div>
        ${i}
        <button class="btn btn-primary btn-block" type="submit">${j(s.lang===`ar`?`arrowLeft`:`arrowRight`,16)} ${D(`login`)}</button>
      </form>
      <div class="demo-showcase-box" style="margin-top:20px;padding:14px 16px;border-radius:10px;background:var(--surface-soft, rgba(13,98,105,0.06));border:1px dashed rgba(20,184,166,0.4);display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:var(--brand-teal, #0d6269);">
            <span>✨</span>
            <span>${O(`بيئة العرض التجريبي (Demo Showcase)`,`Live Demo Showcase`)}</span>
          </div>
          <span style="font-size:10px;background:rgba(20,184,166,0.15);color:var(--brand-teal, #0d6269);padding:2px 8px;border-radius:12px;font-weight:600;">
            ${O(`للزوار ومدراء التوظيف`,`For Visitors & Hiring Managers`)}
          </span>
        </div>
        <div style="font-size:11px;color:var(--ink-soft);display:flex;flex-direction:column;gap:3px;font-family:var(--font-mono, monospace);">
          <div><strong>${O(`البريد:`,`Email:`)}</strong> <code>demo@darc-design.bond</code></div>
          <div><strong>${O(`كلمة المرور:`,`Password:`)}</strong> <code>demo123456</code></div>
        </div>
        <button type="button" class="btn btn-sm btn-soft" data-action="quick-fill-login" data-email="demo@darc-design.bond" data-pass="demo123456" data-autosubmit="true" style="width:100%;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 12px;border-radius:6px;cursor:pointer;">
          <span>⚡</span>
          <span>${O(`تعبئة تلقائية ودخول فوري`,`Auto-fill & Sign In`)}</span>
        </button>
      </div>
    `:t===`forgot`&&(r=`
      <form id="forgot-form">
        <div class="field"><label for="login-email">${D(`emailAddress`)}</label><input id="login-email" name="email" type="email" placeholder="name@darc.com" value="${k(a)}" required /></div>
        ${i}
        <button class="btn btn-primary btn-block" type="submit">${O(`إرسال رابط الاستعادة`,`Send reset link`)}</button>
        <div style="text-align:center;margin-top:15px"><a href="#" data-action="goto-login" style="font-size:13px;color:var(--ink-soft)">${O(`العودة لتسجيل الدخول`,`Back to login`)}</a></div>
      </form>
    `),document.getElementById(`app`).innerHTML=`
    <div class="login-shell ${s.lang===`en`?`is-ltr`:``}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup">
            <span class="brand-mark">${j(`building`,24)}</span>
            <div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${O(`مساحة تشغيل المشاريع`,`Project operations workspace`)}</div></div>
          </div>
          <div class="login-art-content">
            <p class="eyebrow">${O(`وضوح · مسؤولية · إنجاز`,`CLARITY · OWNERSHIP · DELIVERY`)}</p>
            <h1>${O(`كل مشروع واضح. كل خطوة محسوبة.`,`Every project clear. Every move accounted for.`)}</h1>
            <p>${O(`لوحة هادئة لإدارة التصميم والتنفيذ، تجمع فريق DARC حول أحدث قرار وأهم موعد.`,`A calm operating layer for design and delivery, bringing the DARC team around the latest decision and the next important deadline.`)}</p>
          </div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${t===`login`?O(`مرحبًا بعودتك`,`WELCOME BACK`):O(`استعادة الحساب`,`ACCOUNT RECOVERY`)}</p><h2>${t===`login`?D(`login`):O(`نسيت كلمة المرور`,`Forgot Password`)}</h2><p class="intro">${t===`login`?D(`loginIntro`):O(`أدخل بريدك الإلكتروني لاستلام رابط استعادة كلمة المرور.`,`Enter your email to receive a reset link.`)}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${s.theme===`dark`?`الوضع النهاري`:`الوضع الليلي`}">${s.theme===`dark`?`☀️`:`🌙`}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${s.lang===`ar`?`EN`:`عربي`}</button>
              </div>
            </div>
            ${r}
          </div>
        </section>
      </div>
    </div>`,He();let o=()=>{let e=document.getElementById(`turnstile-widget-container`);if(e){if(typeof window<`u`&&window.turnstile)try{e.innerHTML=``,window._turnstileWidgetId=window.turnstile.render(`#turnstile-widget-container`,{sitekey:`0x4AAAAAAFkv_qFdOceTRDC2`,theme:s.theme===`dark`?`dark`:`light`,language:s.lang===`ar`?`ar`:`en`})}catch(e){console.warn(`[Turnstile] Render warning:`,e)}else setTimeout(o,250)}};o(),document.getElementById(`login-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=new FormData(e.currentTarget),n=String(t.get(`email`)||``).trim(),r=String(t.get(`password`)||``),i=document.getElementById(`remember-email-check`)?.checked,a=e.currentTarget.querySelector(`button[type="submit"]`);a.disabled=!0,a.innerHTML=`<span>${O(`جاري التحقق وتسجيل الدخول...`,`Verifying & signing in...`)}</span>`;let o=typeof window<`u`&&window.turnstile&&window._turnstileWidgetId!==void 0?window.turnstile.getResponse(window._turnstileWidgetId):t.get(`cf-turnstile-response`)||``;try{let e=await L(`/api/auth/login`,{method:`POST`,body:JSON.stringify({email:n,password:r,turnstileToken:o})});typeof localStorage<`u`&&(e?.token&&localStorage.setItem(`darc_token`,e.token),i?localStorage.setItem(`darc_last_email`,n):localStorage.removeItem(`darc_last_email`)),pe({theme:s.theme,lang:s.lang}),await Le()}catch(e){if(console.error(`Login Error:`,e),typeof window<`u`&&window.turnstile&&window._turnstileWidgetId!==void 0)try{window.turnstile.reset(window._turnstileWidgetId)}catch{}e.message&&(e.message.includes(`429`)||e.message.includes(`كثيرة`)||e.message.includes(`rate`))?(G(e.message,`login`),Ue(document.querySelector(`#login-form button[type="submit"]`),60)):G(e.message,`login`)}}),document.getElementById(`forgot-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=new FormData(e.currentTarget),n=e.currentTarget.querySelector(`button[type="submit"]`);n.disabled=!0;try{await L(`/api/auth/forgot-password`,{method:`POST`,body:JSON.stringify({email:t.get(`email`)})}),G(O(`تم إرسال رابط الاستعادة إذا كان البريد مسجلاً.`,`Reset link sent if email is registered.`),`forgot`,!0)}catch(e){G(e.message,`forgot`)}})}function We(e,t=``){document.body.classList.remove(`in-app`),document.body.classList.toggle(`is-ltr`,s.lang===`en`),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang===`ar`?`rtl`:`ltr`,document.documentElement.dataset.theme=s.theme||`light`,document.getElementById(`app`).innerHTML=`
    <div class="login-shell ${s.lang===`en`?`is-ltr`:``}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${j(`building`,24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${O(`تفعيل حساب الفريق`,`Team account activation`)}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${O(`خطوة واحدة للبدء`,`ONE STEP TO START`)}</p><h1>${O(`أكمل حسابك وانضم إلى مساحة العمل.`,`Finish your account and join the workspace.`)}</h1><p>${O(`اختر كلمة مرور آمنة للوصول إلى المشاريع والمهام المسندة إليك.`,`Choose a secure password to access your projects and assigned work.`)}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${O(`دعوة DARC الرسمية`,`DARC INVITE`)}</p><h2>${O(`تفعيل الحساب`,`Activate account`)}</h2><p class="intro">${O(`يجب أن تحتوي كلمة المرور على 10 أحرف على الأقل مع رموز وأرقام.`,`Your password must be at least 10 characters with numbers and symbols.`)}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${s.theme===`dark`?`☀️`:`🌙`}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${s.lang===`ar`?`EN`:`عربي`}</button>
              </div>
            </div>
            <form id="activation-form">
              <input type="hidden" name="token" value="${k(e)}" />
              <div class="field">
                <label for="act-pass">${D(`password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass" name="password" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${O(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${Be(`act`)}
              </div>
              <div class="field">
                <label for="act-pass-confirm">${O(`تأكيد كلمة المرور`,`Confirm password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass-confirm" name="passwordConfirm" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass-confirm" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${O(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div id="act-match-indicator" style="font-size:11px;font-weight:600;margin-top:4px;display:none;"></div>
              </div>
              ${t?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${j(`alert`,15)}<span>${k(t)}</span></div>`:``}
              <button class="btn btn-primary btn-block" type="submit">${j(`shield`,16)} ${O(`تفعيل الحساب والدخول`,`Activate and sign in`)}</button>
            </form>
            <div class="login-demo">${j(`lock`,16)}<span>${O(`جلسة الدخول مشفرة ولا يتم تخزين كلمة المرور بنص صريح أبداً.`,`Your session is encrypted and your password is never stored in plain text.`)}</span></div>
          </div>
        </section>
      </div>
    </div>`,He(),Ve(`activation-form`,`password`,`passwordConfirm`,`act`,`#activation-form button[type="submit"]`)}function Ge(e,t=``){document.body.classList.remove(`in-app`),document.body.classList.toggle(`is-ltr`,s.lang===`en`),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang===`ar`?`rtl`:`ltr`,document.documentElement.dataset.theme=s.theme||`light`,document.getElementById(`app`).innerHTML=`
    <div class="login-shell ${s.lang===`en`?`is-ltr`:``}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${j(`building`,24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${O(`استعادة كلمة المرور`,`Password Recovery`)}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${O(`استعادة الحساب`,`ACCOUNT RECOVERY`)}</p><h1>${O(`اختر كلمة مرور جديدة لحسابك.`,`Choose a new password for your account.`)}</h1><p>${O(`كلمة المرور يجب أن تكون قوية وغير مستخدمة من قبل.`,`Password should be strong and unique.`)}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${O(`استعادة الحساب`,`ACCOUNT RECOVERY`)}</p><h2>${O(`كلمة مرور جديدة`,`New Password`)}</h2><p class="intro">${O(`أدخل كلمة المرور الجديدة وقم بتأكيدها.`,`Enter and confirm your new password.`)}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${s.theme===`dark`?`☀️`:`🌙`}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${s.lang===`ar`?`EN`:`عربي`}</button>
              </div>
            </div>
            <form id="reset-form">
              <div class="field">
                <label for="rst-pass">${O(`كلمة المرور الجديدة`,`New Password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass" name="newPassword" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${O(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${Be(`rst`)}
              </div>
              <div class="field">
                <label for="rst-pass-confirm">${O(`تأكيد كلمة المرور الجديدة`,`Confirm New Password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass-confirm" name="newPasswordConfirm" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass-confirm" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${O(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div id="rst-match-indicator" style="font-size:11px;font-weight:600;margin-top:4px;display:none;"></div>
              </div>
              ${t?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${j(`alert`,15)}<span>${k(t)}</span></div>`:``}
              <button class="btn btn-primary btn-block" type="submit">${O(`حفظ وتسجيل الدخول`,`Save and login`)}</button>
            </form>
          </div>
        </section>
      </div>
    </div>`,He(),Ve(`reset-form`,`newPassword`,`newPasswordConfirm`,`rst`,`#reset-form button[type="submit"]`),document.getElementById(`reset-form`)?.addEventListener(`submit`,async t=>{t.preventDefault();let n=new FormData(t.currentTarget),r=n.get(`newPassword`);if(r!==n.get(`newPasswordConfirm`)){Ge(e,O(`كلمتا المرور غير متطابقتين.`,`Passwords do not match.`));return}let i=t.currentTarget.querySelector(`button[type="submit"]`);i.disabled=!0;try{await L(`/api/auth/reset-password`,{method:`POST`,body:JSON.stringify({token:e,newPassword:r})}),window.history.replaceState({},``,window.location.pathname),await Le()}catch(t){Ge(e,t.message)}})}function Ke(e){let t=e.status===`pending`,n=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${t}">
      <div class="field">
        <label for="force-pass-input">${t?O(`كلمة المرور للبدء`,`Initial password`):O(`كلمة المرور الجديدة`,`New password`)}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${O(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${Be(`force`)}
        ${e.email?t?``:`<small class="field-hint" style="margin-top:6px;display:block;">${O(`سيتم طرد المستخدم من جميع أجهزته فوراً.`,`The user will be signed out of all devices immediately.`)}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${j(`alert`,12)} ${O(`تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.`,`Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.`)}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${D(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${t?O(`تفعيل الحساب`,`Activate account`):O(`حفظ وتغيير`,`Save and change`)}</button>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=T(t?O(`تفعيل الحساب يدوياً`,`Activate account manually`):O(`تغيير كلمة المرور إجبارياً`,`Force change password`),t?O(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${k(e.name)}.`,`Set an initial password to activate ${k(e.name)}'s account.`):O(`تعيين كلمة مرور جديدة لحساب ${k(e.name)}`,`Set a new password for ${k(e.name)}`),n,`force-password`),He(),Ve(`force-password-form`,`newPassword`,null,`force`,`#force-password-form button[type="submit"]`)}var qe=t({attentionItem:()=>Xe,metricCard:()=>Je,projectProgress:()=>Ye,pulseChart:()=>$e,renderDashboard:()=>et,renderReports:()=>tt,teamMetrics:()=>Ze,teamRow:()=>Qe});function Je(e,t,n,r,i,a=``){return`<article class="metric-card ${r}"><div class="metric-top"><span class="metric-label">${k(e)}</span><span class="metric-icon">${j(i,15)}</span></div><div class="metric-value">${k(t)}</div><span class="metric-note ${a}">${k(n)}</span></article>`}function Ye(e){let t=e.health===`off_track`?`red`:e.health===`at_risk`?`amber`:``;return`<div class="progress-cell"><div class="progress-meta"><span>${D(`weightedProgress`)}</span><strong>${e.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${t}" style="width:${Math.min(100,e.progress)}%"></div></div></div>`}function Xe(e){let t=we(e)||e.status===`blocked`?`red`:`amber`,n=we(e)?O(`متأخرة`,`Overdue`):e.status===`blocked`?O(`متوقفة`,`Blocked`):O(`تستحق قريبًا`,`Due soon`);return`<button class="attention-item" data-action="open-task" data-task-id="${k(e.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${t}">${j(we(e)||e.status===`blocked`?`alert`:`clock`,14)}</span><span class="attention-copy"><strong style="color:var(--${t})">${k(O(e.titleAr,e.titleEn))}</strong><span>${k(n)} · ${k(Ce(e.dueDate))}</span></span></button>`}function Ze(e,t){let n=t.filter(t=>t.assigneeId===e),r=n.reduce((e,t)=>e+Number(t.weight||1),0),i=r?Math.round(n.reduce((e,t)=>e+t.progress*Number(t.weight||1),0)/r):0;return{tasks:n.length,progress:i,overdue:n.filter(we).length}}function Qe(e,t){let n=Ze(e.id,t);return`<div class="team-row"><div class="team-member">${M(e)}<div class="team-member-copy"><strong>${k(O(e.name,e.nameEn||e.name))}</strong><span>${k(O(e.jobTitleAr,e.jobTitleEn||e.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${n.tasks}</strong> ${D(`tasks`)}</div><div class="team-progress"><div class="progress-meta"><span>${D(`progress`)}</span><strong>${n.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${n.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${k(e.id)}">${j(`more`,15)}</button></div>`}function $e(){let e=[38,48,45,62,55,72,68],t=s.lang===`ar`?[`أحد`,`اثن`,`ثلث`,`أربع`,`خمس`,`جمع`,`سبت`]:[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`];return`<div class="pulse">${e.map((n,r)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,n-22)}%"></span><span class="pulse-bar ${r===e.length-1?`current`:``}" style="height:${n}%"></span></div><span>${t[r]}</span></div>`).join(``)}</div>`}function et(){let e=s.data?.stats||{},t=s.data?.projects||[],n=s.data?.tasks||[],r=s.data?.users||[],i=s.data?.user||{},a=i.name||i.email||O(`مستخدم`,`User`),o=t.reduce((e,t)=>e+(Number(t.totalWeight)||0),0),c=o?Math.round(t.reduce((e,t)=>e+(Number(t.progress)||0)*(Number(t.totalWeight)||0),0)/o):0,l=[...n].filter(e=>we(e)||e.status===`blocked`||e.dueDate&&(new Date(`${e.dueDate}T23:59:59`)-new Date)/864e5<=7).sort((e,t)=>new Date(e.dueDate||`9999-12-31`)-new Date(t.dueDate||`9999-12-31`)).slice(0,5),u=r.filter(e=>e.status!==`inactive`),d=e.projectCount??t.length,f=e.myTasks??n.filter(e=>e.assigneeId===i.id).length,p=e.overdueTasks??n.filter(we).length,m=e.dueSoon??0,h=e.completedTasks??n.filter(e=>e.status===`done`).length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${O(`لوحة قيادة المشاريع`,`PROJECT COMMAND CENTER`)}</p><h1>${he()}، ${k(O(a.replace(/^م\.\s?/,``),i.nameEn||a))}</h1><p>${D(`welcomeText`)}</p></div><div class="welcome-status"><span>${D(`portfolioHealth`)}</span><strong>${c}%</strong><small>${O(`إنجاز المحفظة الموزون`,`Weighted portfolio progress`)}</small></div></div>
    <div class="metrics-grid">${Je(D(`activeProjects`),e.activeProjects||0,O(`${d} مشاريع إجمالًا`,`${d} projects total`),`teal`,`building`,`up`)}${Je(D(`openTasks`),e.openTasks??n.length,O(`${f} مسندة لك`,`${f} assigned to you`),`blue`,`checklist`)}${Je(D(`overdue`),p,O(`تحتاج تصعيدًا ومتابعة`,`Needs escalation and follow-up`),`red`,p?`alert`:`check`,p?`alert`:``)}${Je(D(`dueThisWeek`),m,O(`موعد قريب`,`Near-term due dates`),`amber`,`clock`)}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${D(`projectProgress`)}</h2><p class="panel-subtitle">${D(`projectProgressSub`)}</p></div>${F(`view_projects`)?`<button class="text-link" data-view="projects">${D(`seeAll`)} ${j(s.lang===`ar`?`arrowLeft`:`arrow`,12)}</button>`:``}</div><div class="project-list">${t.length?t.slice(0,5).map(projectRow).join(``):`<div class="empty">${j(`building`,18)}<span>${D(`noProjects`)}</span></div>`}</div></section>${I()||F(`manage_users`)?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${D(`teamProgress`)}</h2><p class="panel-subtitle">${D(`teamProgressSub`)}</p></div><button class="text-link" data-view="team">${D(`seeAll`)} ${j(s.lang===`ar`?`arrowLeft`:`arrow`,12)}</button></div><div class="team-table">${u.slice(0,6).map(e=>Qe(e,n)).join(``)}</div></section>`:``}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${D(`attention`)}</h2><p class="panel-subtitle">${D(`attentionSub`)}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${l.length}</span></div><div class="attention-list">${l.length?l.map(Xe).join(``):`<div class="empty">${j(`check`,18)}<span>${D(`noAttention`)}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${D(`recentPulse`)}</h2><p class="panel-subtitle">${D(`recentPulseSub`)}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${h} ${D(`done`)}</span></div>${$e()}</section></div></div>`}function tt(){let{projects:e,tasks:t,users:n}=s.data,r=F(`export_reports`)||I(),i=t.reduce((e,t)=>e+Number(t.weight||1),0),a=i?Math.round(t.reduce((e,t)=>e+t.progress*Number(t.weight||1),0)/i):0,o=new Map;t.forEach(e=>{let t=(s.lang===`ar`?e.categoryAr:e.categoryEn)||O(e.typeAr||`عام`,e.typeEn||`General`),n=o.get(t)||{weight:0,progress:0};n.weight+=Number(e.weight||1),n.progress+=e.progress*Number(e.weight||1),o.set(t,n)});let c=[...o.entries()].map(([e,t])=>({label:e,progress:t.weight?Math.round(t.progress/t.weight):0})).sort((e,t)=>t.progress-e.progress);return`<div class="page-head"><div><p class="eyebrow">${O(`قراءة الأداء`,`PERFORMANCE READOUT`)}</p><h1>${D(`reports`)}</h1><p>${O(`مؤشرات بسيطة تساعد الإدارة على رؤية الانحراف قبل أن يصبح تأخيرًا.`,`Simple signals that help management see drift before it becomes delay.`)}</p></div><div class="page-actions">${r?`
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-primary" data-action="print-portfolio-pdf">${j(`printer`,15)} ${O(`طباعة تقرير المحفظة (PDF)`,`Print Portfolio (PDF)`)}</button>
      <button class="btn btn-soft" data-action="export-csv">${j(`document`,15)} ${O(`تصدير الإكسل (Excel)`,`Export Excel`)}</button>
    </div>
  `:``}</div></div><div class="report-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${O(`الإنجاز حسب التخصص`,`Progress by discipline`)}</h2><p class="panel-subtitle">${D(`weightedProgress`)}</p></div><span class="status-badge on_track">${a}%</span></div><div class="report-bars">${c.length?c.map(e=>`<div class="report-bar-row"><span>${k(e.label)}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${e.progress}%"></div></div><strong>${e.progress}%</strong></div>`).join(``):`<div class="empty">${D(`noTasks`)}</div>`}</div></section><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${O(`صحة المحفظة`,`Portfolio health`)}</h2><p class="panel-subtitle">${O(`توزيع حالات المشاريع الحالية.`,`Current project status distribution.`)}</p></div></div><div class="report-stat-list"><div class="report-stat"><span>${D(`onTrack`)}</span><strong style="color:var(--mint-strong)">${e.filter(e=>e.health===`on_track`).length}</strong></div><div class="report-stat"><span>${D(`atRisk`)}</span><strong style="color:var(--amber)">${e.filter(e=>e.health===`at_risk`).length}</strong></div><div class="report-stat"><span>${D(`offTrack`)}</span><strong style="color:var(--red)">${e.filter(e=>e.health===`off_track`).length}</strong></div></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${D(`teamLoad`)}</h2><p class="panel-subtitle">${O(`المهام المفتوحة لكل عضو.`,`Open tasks per member.`)}</p></div></div><div class="report-stat-list">${n.slice(0,5).map(e=>{let n=Ze(e.id,t);return`<div class="report-stat"><span>${k(O(e.name,e.nameEn||e.name))}</span><strong>${n.tasks}</strong></div>`}).join(``)}</div></section></div></div>`}var nt=t({STATUS_OPTIONS:()=>Tt,buildAssigneeChipsHtml:()=>vt,buildRemindersListHtml:()=>yt,drawTimelineArrows:()=>Et,filterTasks:()=>ht,formatRemindAtDate:()=>_t,getSavedTaskSort:()=>st,getTaskSortOrder:()=>at,initTaskModalWidgets:()=>xt,openDocumentPreviewModal:()=>wt,openTaskModal:()=>bt,renderBoard:()=>dt,renderCalendar:()=>ft,renderTaskAssignees:()=>rt,renderTaskComments:()=>St,renderTaskDocuments:()=>Ct,renderTaskSortSelect:()=>lt,renderTasks:()=>gt,renderTimeline:()=>pt,renderTimelinePanel:()=>mt,setSavedTaskSort:()=>ct,sortTasks:()=>ut,sortTasksByImportance:()=>ot,taskCard:()=>it});function rt(e){let t=s.data?.users||[],n=s._userMap||new Map(t.map(e=>[e.id,e])),r=e.assignee||n.get(e.assigneeId),i=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(e=>n.get(e)).filter(Boolean),a=e.customFields?.externalAssignees||e.customFields?.external_assignees||[],o=`<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">`;return r||i.length?(o+=`<div class="avatar-stack" style="display:flex;align-items:center;">`,r&&(o+=`<span title="${k(O(r.name,r.nameEn||r.name))}">${M(r,`mini-avatar`)}</span>`),i.slice(0,2).forEach(e=>{o+=`<span title="${k(O(e.name,e.nameEn||e.name))}" style="margin-inline-start:-8px;">${M(e,`mini-avatar`)}</span>`}),i.length>2&&(o+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${i.slice(2).map(e=>O(e.name,e.nameEn||e.name)).join(`، `)}">+${i.length-2}</span>`),o+=`</div>`,r&&(o+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${k(O(r.name,r.nameEn||r.name))}</span>`)):a.length||(o+=`<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>`),a.length&&(a.slice(0,2).forEach(e=>{o+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${k(e)}">🌐 ${k(e)} <small style="opacity:0.8">(${O(`خارجي`,`Ext`)})</small></span>`}),a.length>2&&(o+=`<span style="font-size:10px;color:var(--amber);" title="${a.slice(2).map(k).join(`، `)}">+${a.length-2}</span>`)),o+=`</div>`,o}function it(e){let t=isOverdue(e),n=t?`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${j(`alert`,11)} ${D(`overdue`)}</span>`:``,r=s._commentCounts?s._commentCounts[e.id]||0:(s.data?.comments||[]).filter(t=>t.taskId===e.id).length,i=s._docCounts?s._docCounts[e.id]||0:(s.data?.documents||[]).filter(t=>t.taskId===e.id).length,a=e.progress===100?`var(--mint-strong)`:e.progress>=80?`var(--amber)`:e.progress>0?`var(--blue)`:`var(--line)`,o=I()||F(`edit_tasks`)||e.assigneeId===s.data?.user?.id;return`<article class="task-card ${t?`is-overdue`:``} ${o?``:`not-draggable`}" draggable="${o?`true`:`false`}" data-action="open-task" data-task-id="${k(e.id)}">
    <div class="task-card-top">
      <span class="task-code">${k(e.templateId?e.templateId.replace(`tpl-`,`#`):`#CUSTOM`)}</span>
      <div style="display:flex;align-items:center;gap:6px;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${O(`بانتظار المزامنة مع السيرفر`,`Pending cloud sync`)}">⏳ ${O(`معلقة`,`Pending`)}</span>`:``}
        ${r>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${r} ${O(`تعليقات`,`comments`)}">💬 ${r}</span>`:``}
        ${i>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${i} ${O(`مرفقات`,`attachments`)}">📎 ${i}</span>`:``}
        ${n}
        <span class="priority-badge ${k(e.priority)}">${k(priorityText(e.priority))}</span>
      </div>
    </div>
    <h4>${k(O(e.titleAr,e.titleEn))}</h4>
    ${(()=>{let t=String(O(e.descriptionAr||e.description,e.descriptionEn||e.description)||``).trim();if(!t)return``;let n=t.length>50?t.substring(0,50).trim()+`...`:t;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${k(t)}">${k(n)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${k(O(e.categoryAr,e.categoryEn)||``)}</span>
      ${e.dueDate?`<span style="display:inline-flex;align-items:center;gap:3px;color:${t?`var(--red)`:`var(--muted)`};">${j(`calendar`,11)} ${dateLabel(e.dueDate)}</span>`:``}
    </div>
    <div class="task-card-foot">
      ${rt(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?`var(--mint-strong)`:`var(--teal)`};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${a};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function at(e){if(!e)return 999999;if(typeof e.sortOrder==`number`)return e.sortOrder;if(typeof e.sort_order==`number`)return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder==`number`)return e.customFields.sortOrder;if(typeof e.customFields.sort_order==`number`)return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder==`number`)return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order==`number`)return e.custom_fields.sort_order}return 999999}function ot(e=[]){let t={urgent:4,high:3,medium:2,low:1},n=Date.now();return[...e].sort((e,r)=>{let i=+(e.status===`blocked`),a=+(r.status===`blocked`);if(i!==a)return a-i;let o=e.dueDate?new Date(`${e.dueDate.split(`T`)[0]}T23:59:59`).getTime():null,s=r.dueDate?new Date(`${r.dueDate.split(`T`)[0]}T23:59:59`).getTime():null,c=o&&o<n&&e.status!==`done`?1:0,l=s&&s<n&&r.status!==`done`?1:0;if(c!==l)return l-c;let u=t[e.priority]||2,d=t[r.priority]||2;if(u!==d)return d-u;if(o&&s){if(o!==s)return o-s}else if(o&&!s)return-1;else if(!o&&s)return 1;let f=at(e),p=at(r);return f===p?(e.titleAr||``).localeCompare(r.titleAr||``,`ar`):f-p})}function st(){return localStorage.getItem(`darc_task_sort_pref`)||`importance`}function ct(e){localStorage.setItem(`darc_task_sort_pref`,e),s.taskSortPref=e,s.projectTaskSort=e,s.myTaskSort=e}function lt(e,t=`sort-project-tasks`){let n=e||st();return`
    <div class="sort-box">
      <span>${O(`الترتيب:`,`Sort:`)}</span>
      <select class="filter-select select-compact" data-action="${t}">
        <option value="importance" ${n===`importance`?`selected`:``}>${O(`حسب الأهمية والأولوية (افتراضي)`,`By Importance & Priority (Default)`)}</option>
        <option value="deadline" ${n===`deadline`?`selected`:``}>${O(`الأقرب استحقاقاً`,`Earliest Deadline`)}</option>
        <option value="custom" ${n===`custom`?`selected`:``}>${O(`ترتيب مخصص (السحب والإسقاط)`,`Custom (Drag & Drop)`)}</option>
        <option value="alpha" ${n===`alpha`?`selected`:``}>${O(`أبجدياً`,`Alphabetical`)}</option>
      </select>
    </div>
  `}function ut(e=[],t=st()){return t===`deadline`?[...e].sort((e,t)=>(e.dueDate?new Date(`${e.dueDate.split(`T`)[0]}T23:59:59`).getTime():1/0)-(t.dueDate?new Date(`${t.dueDate.split(`T`)[0]}T23:59:59`).getTime():1/0)):t===`custom`?[...e].sort((e,t)=>at(e)-at(t)):t===`alpha`?[...e].sort((e,t)=>(e.titleAr||``).localeCompare(t.titleAr||``,`ar`)):ot(e)}function dt(e,t=st()){let n=s.data?.users||[];s._userMap=new Map(n.map(e=>[e.id,e]));let r={};for(let e of s.data?.comments||[])e.taskId&&(r[e.taskId]=(r[e.taskId]||0)+1);let i={};for(let e of s.data?.documents||[])e.taskId&&(i[e.taskId]=(i[e.taskId]||0)+1);return s._commentCounts=r,s._docCounts=i,`<div class="board">${[{key:`not_started`,dot:``,label:D(`notStarted`)},{key:`in_progress`,dot:`blue`,label:D(`inProgress`)},{key:`review`,dot:`amber`,label:O(`مراجعة / اعتماد`,`Review / approval`),statuses:[`review`,`approval`,`blocked`]},{key:`done`,dot:`green`,label:D(`done`)}].map(n=>{let r=ut(e.filter(e=>(n.statuses||[n.key]).includes(e.status)),t);return`<section class="board-column" data-status="${n.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${n.dot}"></span>${n.label}</div><span class="board-count">${r.length}</span></div><div class="board-cards">${r.length?r.map(it).join(``):`<div class="empty" style="min-height:150px;pointer-events:none;">${D(`noTasks`)}</div>`}</div></section>`}).join(``)}</div>`}function ft(e,t){let n=s.calendarDate?new Date(s.calendarDate):new Date,r=n.getFullYear(),i=n.getMonth(),a=`${s.lang===`ar`?[`يناير`,`فبراير`,`مارس`,`أبريل`,`مايو`,`يونيو`,`يوليو`,`أغسطس`,`سبتمبر`,`أكتوبر`,`نوفمبر`,`ديسمبر`][i]:[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`][i]} ${r}`,o=s.lang===`ar`?[`الأحد`,`الإثنين`,`الثلاثاء`,`الأربعاء`,`الخميس`,`الجمعة`,`السبت`]:[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],c=new Date(r,i,1).getDay(),l=new Date(r,i+1,0).getDate(),u=new Date,d=u.getFullYear()===r&&u.getMonth()===i,f=``;for(let e=0;e<c;e++)f+=`<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>`;for(let t=1;t<=l;t++){let n=d&&u.getDate()===t,a=`${r}-${String(i+1).padStart(2,`0`)}-${String(t).padStart(2,`0`)}`,o=e.filter(e=>{if(!e.dueDate&&!e.startDate)return!1;let t=e.dueDate?e.dueDate.split(`T`)[0]:null,n=e.startDate?e.startDate.split(`T`)[0]:null;return t===a||n===a});f+=`
      <div class="calendar-day ${n?`is-today`:``}" style="min-height:95px;min-width:0;overflow:hidden;background:${n?`var(--mint)`:`var(--surface)`};border:1px solid ${n?`var(--teal)`:`var(--line)`};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${n?`bold`:`600`};color:${n?`var(--teal)`:`var(--ink)`};">
          <span>${t}</span>
          ${n?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${O(`اليوم`,`Today`)}</span>`:``}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${o.map(e=>{let t=ge(e);return`
              <div data-action="open-task" data-task-id="${k(e.id)}" style="background:${t.bgColor};border:1px solid ${t.borderColor};border-inline-start:3px solid ${t.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${t.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${k(O(e.titleAr,e.titleEn))} — ${t.label}">
                <span style="font-weight:700;">${k(O(e.titleAr,e.titleEn))}</span>
              </div>
            `}).join(``)}
        </div>
      </div>
    `}return`
    <div class="calendar-wrapper" style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;">
      <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;font-size:15px;color:var(--ink);display:flex;align-items:center;gap:8px;">
          ${j(`calendar`,16)} ${a}
        </h3>
        <div style="display:flex;align-items:center;gap:6px;">
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${j(s.lang===`ar`?`arrow`:`arrowLeft`,12)} ${O(`السابق`,`Prev`)}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${O(`اليوم`,`Today`)}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${O(`التالي`,`Next`)} ${j(s.lang===`ar`?`arrowLeft`:`arrow`,12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${o.map(e=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e}</div>`).join(``)}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${f}
      </div>
    </div>
  `}function pt(e){let t=e.filter(e=>e.startDate&&e.dueDate).sort((e,t)=>new Date(e.startDate)-new Date(t.startDate));if(!t.length)return`<div class="empty" style="min-height:300px">${j(`calendar`,24)}<span>${O(`لا توجد مهام مجدولة زمنياً في هذا المشروع.`,`No scheduled tasks in this project.`)}</span></div>`;let n=Math.min(...t.map(e=>new Date(e.startDate).getTime())),r=Math.max(...t.map(e=>new Date(e.dueDate).getTime())),i=2592e5;n-=i,r+=i;let a=Math.max(7,Math.ceil((r-n)/864e5)),o=``;for(let e=0;e<a;e++){let t=new Date(n+e*864e5),r=t.getDay()===5||t.getDay()===6;o+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${r?`var(--surface-soft)`:`transparent`};border-bottom:1px solid var(--line)">${t.getDate()}<br>${t.toLocaleDateString(s.lang===`ar`?`ar-SA`:`en-US`,{month:`short`})}</div>`}let c=t.map((e,t)=>{let r=Math.floor((new Date(e.startDate).getTime()-n)/864e5)+1,i=r+Math.max(1,Math.ceil((new Date(e.dueDate).getTime()-new Date(e.startDate).getTime())/864e5)+1),a=ge(e);return`<div style="display:contents" class="timeline-row" data-task-id="${e.id}" data-row="${t}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${e.id}" style="grid-column: ${r} / ${i}; margin: 8px 4px; background: ${a.color}; border: 1px solid ${a.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${k(O(e.titleAr,e.titleEn))} — ${a.label}">
        <span style="font-weight:600;opacity:0.9">${k(e.templateId?e.templateId.replace(`tpl-`,`#`):`#`)}</span> ${k(O(e.titleAr,e.titleEn))}
        ${e.dependencies&&e.dependencies.length?`<span style="float:${s.lang===`ar`?`left`:`right`};opacity:0.8">${j(`link`,10)}</span>`:``}
      </div>
    </div>`}).join(``);return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${a}, minmax(40px, 1fr)); min-width: ${a*40}px; position: relative;">
      ${o}
      ${c}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function mt(e,t){let n=s.timelineView||`gantt`;return`
    <div class="panel">
      <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 class="panel-title">${O(`المخطط الزمني والتقويم`,`Timeline & Calendar`)}</h2>
          <p class="panel-subtitle">${O(`متابعة تسلسل المهام ومواعيد التسليم بالصيغة الأنسب لك.`,`Track task flow and milestone deadlines in your preferred format.`)}</p>
        </div>
        <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:3px;gap:3px;">
          <button class="btn btn-sm ${n===`gantt`?`btn-primary`:`btn-ghost`}" data-action="toggle-timeline-view" data-view-mode="gantt" style="font-size:11px;padding:4px 10px;">
            ${j(`clock`,12)} ${O(`مخطط جانت`,`Gantt Chart`)}
          </button>
          <button class="btn btn-sm ${n===`calendar`?`btn-primary`:`btn-ghost`}" data-action="toggle-timeline-view" data-view-mode="calendar" style="font-size:11px;padding:4px 10px;">
            ${j(`calendar`,12)} ${O(`عرض التقويم`,`Calendar View`)}
          </button>
        </div>
      </div>
      
      ${n===`calendar`?ft(e,t):pt(e)}
    </div>
  `}typeof window<`u`&&(window.__timelineExports={renderTimelinePanel:mt,renderCalendar:ft,renderTimeline:pt});function ht(e){let t=s.searches.tasks.trim().toLowerCase();return e.filter(e=>{let n=`${e.titleAr} ${e.titleEn} ${e.categoryAr} ${e.categoryEn}`.toLowerCase().includes(t),r=s.taskFilter===`all`||s.taskFilter===`mine`&&e.assigneeId===s.data.user.id||s.taskFilter===`overdue`&&isOverdue(e)||s.taskFilter===`blocked`&&e.status===`blocked`,i=s.taskProjectFilter===`all`||e.projectId===s.taskProjectFilter,a=!s.taskPriorityFilter||s.taskPriorityFilter===`all`||e.priority===s.taskPriorityFilter;return n&&r&&i&&a})}function gt(){let e=ht(s.data.tasks),t=[[`all`,D(`all`)],[`mine`,O(`مسندة لي`,`Assigned to me`)],[`overdue`,D(`overdue`)],[`blocked`,D(`blocked`)]],n=s.myTaskSort||st();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${O(`حركة التنفيذ`,`EXECUTION`)}</p>
        <h1>${D(`myTasks`)}</h1>
        <p>${O(`نظّم العمل حسب الحالة، الموعد، والمسؤولية.`,`Organize work by status, deadline, and ownership.`)}</p>
      </div>
      <div class="page-actions">
        ${F(`create_tasks`)?`<button class="btn btn-primary" data-action="new-task">${j(`plus`,15)} ${D(`addTask`)}</button>`:``}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${t.map(([e,t])=>`
            <button class="segmented-tab ${s.taskFilter===e?`active`:``}" data-action="task-filter" data-filter="${e}" role="tab">
              ${t}
            </button>
          `).join(``)}
        </div>
        <div class="search-box tasks-search-box">
          ${j(`search`,15)}
          <input data-search="tasks" value="${k(s.searches.tasks)}" placeholder="${O(`بحث في المهام...`,`Search tasks...`)}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${O(`📁 كل المشاريع`,`📁 All Projects`)}</option>
            ${s.data.projects.map(e=>`<option value="${k(e.id)}" ${s.taskProjectFilter===e.id?`selected`:``}>${k(O(e.nameAr,e.nameEn))}</option>`).join(``)}
          </select>
          <select class="filter-select select-compact" data-action="task-priority-filter" style="min-width:140px;">
            <option value="all">${O(`⚡ كل الأولويات`,`⚡ All Priorities`)}</option>
            <option value="urgent" ${s.taskPriorityFilter===`urgent`?`selected`:``}>🔥 ${O(`عاجلة`,`Urgent`)}</option>
            <option value="high" ${s.taskPriorityFilter===`high`?`selected`:``}>⚡ ${O(`عالية`,`High`)}</option>
            <option value="medium" ${s.taskPriorityFilter===`medium`?`selected`:``}>🔹 ${O(`متوسطة`,`Medium`)}</option>
            <option value="low" ${s.taskPriorityFilter===`low`?`selected`:``}>☕ ${O(`منخفضة`,`Low`)}</option>
          </select>
        </div>
        <div class="tasks-toolbar-sort">
          ${lt(n,`sort-my-tasks`)}
        </div>
      </div>
    </div>

    ${e.length?dt(e,n):`<section class="panel"><div class="empty">${j(`checklist`,18)}<span>${D(`noTasks`)}</span></div></section>`}
  `}function _t(e){if(!e)return`—`;try{let t=new Date(e);return isNaN(t.getTime())?e:new Intl.DateTimeFormat(s.lang===`ar`?`ar-SA`:`en-US`,{year:`numeric`,month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(t)}catch{return e}}function vt(e=[],t=[]){let n=s.data?.users||[],r=``;return e.forEach(e=>{let t=n.find(t=>t.id===e)||{name:e,id:e};r+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${M(t,`mini-avatar`)}
        <span style="font-weight:500;">${k(O(t.name,t.nameEn||t.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${k(e)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${O(`إزالة`,`Remove`)}">×</button>
      </span>
    `}),t.forEach(e=>{r+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${k(e)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${O(`خارجي`,`Ext`)}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${k(e)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${O(`إزالة`,`Remove`)}">×</button>
      </span>
    `}),r}function yt(e=[]){return e.length?e.map((e,t)=>`
    <div class="reminder-card-row" data-idx="${t}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${k(_t(e.remindAt))}</strong>
        ${e.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${k(e.noteAr)}">(${k(e.noteAr)})</span>`:``}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${t}" data-rem-id="${k(e.id||``)}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${O(`حذف التذكير`,`Delete reminder`)}">
        ${j(`trash`,13)}
      </button>
    </div>
  `).join(``):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${O(`لا توجد مواعيد تذكير مجدولة لهذه المهمة`,`No scheduled reminders for this task`)}</div>`}function bt(e=null,t=null,n=null){let r=s.data.templates.find(n=>n.id===(t||e?.templateId)),i=e?.projectId||n||s.activeProjectId||s.data.projects[0]?.id||``,a=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],o=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[],c=[];Array.isArray(e?.customFields?.reminders)?c=e.customFields.reminders:e?.remindAt?c=[{id:`rem_`+Math.random().toString(36).substr(2,9),remindAt:e.remindAt,noteAr:``}]:Array.isArray(s.data?.reminders)&&e?.id&&(c=s.data.reminders.filter(t=>t.taskId===e.id));let l=e?.progress===void 0?e?.status===`done`?100:e?.status===`review`||e?.status===`approval`?80:e?.status===`in_progress`?50:0:e.progress,u=a.length>0||o.length>0,d=u?vt(a,o):``,f=yt(c),p=`<form id="task-form" data-task-id="${k(e?.id||``)}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${k(e?.typeAr||r?.typeAr||(r?`مخطط`:``))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${k(e?.typeEn||r?.typeEn||(r?`Drawing`:``))}" />
    <input type="hidden" name="additionalAssignees" id="task-additional-assignees-input" value="${k(JSON.stringify(a))}" />
    <input type="hidden" name="externalAssignees" id="task-external-assignees-input" value="${k(JSON.stringify(o))}" />
    <input type="hidden" name="remindersJson" id="task-reminders-input" value="${k(JSON.stringify(c))}" />

    <div class="form-grid">
      <!-- 📋 القسم 1: البيانات الأساسية والمكتبة القياسية -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 2px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📋</span> <span>${O(`البيانات الأساسية والمكتبة القياسية`,`Basic Details & Standard Library`)}</span>
      </div>

      <div class="field full">
        <label>${O(`المشروع التابع له`,`Project`)} *</label>
        <select name="projectId" id="task-project-select" required>
          ${s.data.projects.map(e=>`<option value="${k(e.id)}" ${e.id===i?`selected`:``}>${k(O(e.nameAr,e.nameEn))} (${k(e.code)})</option>`).join(``)}
        </select>
      </div>

      <div class="field full">
        <label>${D(`taskTitle`)} *</label>
        <input name="titleAr" id="task-title-ar" value="${k(e?.titleAr||r?.nameAr||``)}" placeholder="${O(`اسم المخرج أو المهمة`,`Deliverable or task name`)}" required />
      </div>
      <div class="field">
        <label>${D(`nameEn`)}</label>
        <input name="titleEn" id="task-title-en" value="${k(e?.titleEn||r?.nameEn||``)}" placeholder="${O(`Task / Deliverable Name (EN)`,`Task / Deliverable Name (EN)`)}" />
      </div>
      <div class="field">
        <label>${D(`addFromLibrary`)}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${O(`مهمة مخصصة`,`Custom task`)}</option>
          ${s.data.templates.map(n=>`<option value="${k(n.id)}" ${(e?.templateId||t)===n.id?`selected`:``}>${k(n.code)} — ${k(O(n.nameAr,n.nameEn))}</option>`).join(``)}
        </select>
      </div>

      <!-- 👥 القسم 2: المسؤوليات وفريق العمل -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>👥</span> <span>${O(`المسؤوليات وفريق العمل`,`Ownership & Team`)}</span>
      </div>

      <div class="field full">
        <label>${O(`المسؤول الرئيسي`,`Primary Assignee`)}</label>
        <select name="assigneeId" id="task-primary-assignee">
          <option value="">${O(`— بدون تحديد —`,`— Unassigned —`)}</option>
          ${s.data.users.map(t=>`<option value="${k(t.id)}" ${(e?e.assigneeId===t.id:s.data.user.id===t.id)?`selected`:``}>${k(O(t.name,t.nameEn||t.name))}</option>`).join(``)}
        </select>
      </div>

      <!-- قائمة منسدلة موحدة وسريعة للبحث والتحديد للأعضاء والمسؤولين الخارجيين -->
      <div class="field full" style="position:relative;">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${O(`فريق العمل والمسؤولون المشاركون (داخلي وخارجي)`,`Collaborators & Assignees (Team & External)`)}</span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${O(`اختر من الفريق أو اكتب اسماً خارجياً واضغط إضافة`,`Pick team members or type external name`)}</span>
        </label>

        <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
        <div id="assignees-chips-container" style="display:${u?`flex`:`none`};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
          ${d}
        </div>

        <!-- حقل البحث والإضافة السريعة -->
        <div style="position:relative;display:flex;gap:6px;">
          <input type="text" id="assignee-combobox-search" placeholder="${O(`ابحث عن عضو بالفريق أو اكتب اسماً خارجياً...`,`Search team member or type external name...`)}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          <button type="button" id="btn-add-external-quick" class="btn btn-soft btn-sm" style="display:none;padding:0 12px;white-space:nowrap;font-size:11px;">
            ➕ ${O(`إضافة كمسؤول خارجي`,`Add external`)}
          </button>
        </div>

        <!-- القائمة المنسدلة للبحث والاختيار -->
        <div id="assignee-combobox-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
        </div>
      </div>

      <!-- ⏱️ القسم 3: الحالة والجدولة والتذكيرات (بدون تبعيات نهائياً) -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>⏱️</span> <span>${O(`الحالة والجدولة والتذكيرات`,`Status, Scheduling & Reminders`)}</span>
      </div>

      <div class="field">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${D(`status`)}</span>
          <span id="task-auto-progress-badge" style="font-size:11px;font-weight:600;color:var(--teal);">(${l}%)</span>
        </label>
        <select name="status" id="task-status-select">${Tt().map(([t,n])=>`<option value="${t}" ${e?.status===t?`selected`:``}>${n}</option>`).join(``)}</select>
      </div>
      <div class="field">
        <label>${D(`priority`)}</label>
        <select name="priority">${[`low`,`medium`,`high`,`urgent`].map(t=>`<option value="${t}" ${(e?.priority||`medium`)===t?`selected`:``}>${priorityText(t)}</option>`).join(``)}</select>
      </div>
      <div class="field">
        <label>${D(`startDate`)}</label>
        <input type="date" name="startDate" id="task-start-date" value="${k(e?.startDate||``)}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${D(`dueDate`)}</label>
        <input type="date" name="dueDate" id="task-due-date" value="${k(e?.dueDate||``)}" min="${k(e?.startDate||``)}" onchange="const st = document.getElementById('task-start-date'); if (st && st.value && this.value < st.value) this.value = st.value;" />
      </div>

      <!-- أداة التذكيرات المتعددة التفاعلية -->
      <div class="field full" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:10px;padding:12px;">
        <label style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:600;display:flex;align-items:center;gap:6px;">
            <span>⏰</span> ${O(`تذكيرات المهمة (إشعار نظام + بريد إلكتروني للمسؤول)`,`Task Reminders (System Notification + Email to Assignee)`)}
          </span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${O(`يمكنك إضافة أكثر من موعد تذكير وحذف ما تشاء`,`Add multiple reminders and delete any`)}</span>
        </label>

        <!-- قائمة التذكيرات المضافة (Pre-rendered for zero layout shift) -->
        <div id="task-reminders-list" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
          ${f}
        </div>

        <!-- صف إضافة تذكير جديد -->
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <input type="datetime-local" id="new-reminder-datetime" style="flex:1;min-width:180px;font-size:12px;padding:6px 10px;" />
          <input type="text" id="new-reminder-note" placeholder="${O(`ملاحظة التذكير (اختياري)...`,`Reminder note (optional)...`)}" style="flex:1;min-width:150px;font-size:12px;padding:6px 10px;" />
          <button type="button" id="btn-add-reminder" class="btn btn-soft btn-sm" style="white-space:nowrap;padding:7px 12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">
            ➕ ${O(`إضافة تذكير`,`Add Reminder`)}
          </button>
        </div>
      </div>

      <!-- 📝 القسم 4: تفاصيل ومخرجات المهمة -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📝</span> <span>${O(`تفاصيل ومخرجات المهمة`,`Task Details & Deliverables`)}</span>
      </div>

      <div class="field full">
        <label>${D(`description`)}</label>
        <textarea name="descriptionAr" placeholder="${O(`ما المطلوب؟ وما معيار الإغلاق؟`,`What is required and what defines completion?`)}">${k(e?.descriptionAr||``)}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${e&&(F(`delete_tasks`)||I())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${k(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${O(`حذف المهمة ونقلها لسلة المهملات`,`Delete task and move to trash`)}">
            ${j(`trash`,14)} ${O(`حذف المهمة`,`Delete Task`)}
          </button>
        `:``}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${D(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${j(`check`,14)} ${D(e?`save`:`create`)}</button>
      </div>
    </div>
  </form>`,m=p,h=``;e&&(h=`modal-lg`,m=`
      <div class="task-modal-layout">
        <div class="task-modal-col task-modal-main">
          <h3 style="margin:0 0 15px;font-size:14px;">${O(`تفاصيل المهمة`,`Task Details`)}</h3>
          ${p}
        </div>
        <div class="task-modal-col task-modal-side">
          <div class="task-documents-section">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;font-size:14px;display:flex;align-items:center;gap:6px;">
                ${O(`المخططات والملفات`,`Documents & Files`)}
              </h3>
              <label class="btn btn-soft btn-sm" style="cursor:pointer;margin:0;" id="task-upload-btn">
                ${j(`plus`,12)} ${O(`اختيار ملفات`,`Choose Files`)}
                <input type="file" multiple id="task-upload-input" data-task-id="${e.id}" style="display:none;" />
              </label>
            </div>
            <div id="task-dropzone" data-action="trigger-upload" data-task-id="${e.id}" style="border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;background:var(--surface-soft);cursor:pointer;transition:all 0.2s ease;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;">
                <span style="color:var(--brand-teal);">${j(`upload`,22)}</span>
                <div style="font-size:12px;font-weight:600;color:var(--ink);">${O(`اسحب المخططات والملفات وأفلتها هنا، أو اضغط للتصفح`,`Drag & drop files here, or click to browse`)}</div>
                <div style="font-size:10px;color:var(--muted);">${O(`دعم كامل لملفات CAD و PDF و 3D و الصور حتى 5GB`,`Full support for CAD, PDF, 3D & images up to 5GB`)}</div>
              </div>
              <div id="upload-progress-container" style="display:none;margin-top:12px;padding:10px 12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.04);text-align:start;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--ink);margin-bottom:6px;gap:8px;">
                  <span id="upload-progress-text" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${O(`جاري الرفع...`,`Uploading...`)}</span>
                  <strong id="upload-progress-percent" style="color:var(--brand-teal);font-variant-numeric:tabular-nums;flex-shrink:0;">0%</strong>
                </div>
                <div style="height:6px;background:var(--line);border-radius:3px;overflow:hidden;position:relative;">
                  <div id="upload-progress-bar" style="width:0%;height:100%;background:linear-gradient(90deg, var(--brand-teal), #00c2cb);border-radius:3px;transition:width 0.15s ease;"></div>
                </div>
              </div>
            </div>
            <div id="task-documents-list">${Ct(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${O(`النقاشات والتعليقات`,`Discussion & Comments`)}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${St(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${O(`اكتب تعليقاً... (استخدم @ للإشارة)`,`Write a comment... (use @ to mention)`)}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${O(`إرسال`,`Send`)}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `),document.getElementById(`modal-root`).innerHTML=T(e?O(`تعديل المهمة`,`Edit task`):D(`addTask`),O(`المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.`,`A task is the unit of execution; link a standard deliverable and add a reminder.`),m,`task`,h),xt(e)}function xt(e){let t=document.getElementById(`modal-root`);if(!t)return;let n=t.querySelector(`#task-status-select`),r=t.querySelector(`#task-auto-progress-badge`);n&&r&&n.addEventListener(`change`,()=>{let e={not_started:0,in_progress:50,review:80,approval:80,done:100}[n.value]??0;r.textContent=`(${e}%)`});let i=t.querySelector(`#task-template-select`);i&&i.addEventListener(`change`,()=>{let e=i.value,n=(s.data?.templates||[]).find(t=>t.id===e);if(n){let e=t.querySelector(`#task-title-ar`),r=t.querySelector(`#task-title-en`),i=t.querySelector(`#task-type-ar`),a=t.querySelector(`#task-type-en`);e&&!e.value&&(e.value=n.nameAr||``),r&&!r.value&&(r.value=n.nameEn||``),i&&(i.value=n.typeAr||`مخطط`),a&&(a.value=n.typeEn||`Drawing`)}});let a=t.querySelector(`#task-additional-assignees-input`),o=t.querySelector(`#task-external-assignees-input`),c=t.querySelector(`#assignees-chips-container`),l=t.querySelector(`#assignee-combobox-search`),u=t.querySelector(`#assignee-combobox-dropdown`),d=t.querySelector(`#btn-add-external-quick`),f=[];try{f=JSON.parse(a?.value||`[]`)}catch{f=[]}let p=[];try{p=JSON.parse(o?.value||`[]`)}catch{p=[]}function m(){a&&(a.value=JSON.stringify(f)),o&&(o.value=JSON.stringify(p))}function h(){c&&(f.length===0&&p.length===0?(c.style.display=`none`,c.innerHTML=``,m()):(c.style.display=`flex`,c.innerHTML=vt(f,p),m()))}function g(e=``){if(!u)return;let n=e.trim().toLowerCase(),r=s.data?.users||[],i=t.querySelector(`#task-primary-assignee`)?.value,a=r.filter(e=>{if(e.id===i)return!1;if(!n)return!0;let t=(e.name||``).toLowerCase(),r=(e.nameEn||``).toLowerCase(),a=(e.email||``).toLowerCase();return t.includes(n)||r.includes(n)||a.includes(n)}),o=``;n&&(o+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${O(`إضافة مسؤول خارجي:`,`Add external assignee:`)} "${k(e.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${O(`إضافة سريعة`,`Quick Add`)}</span>
        </div>
      `),a.length===0&&!n?o+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${O(`لا يوجد مستخدمين آخرين`,`No other users`)}</div>`:a.forEach(e=>{let t=f.includes(e.id);o+=`
          <div class="combobox-user-row" data-uid="${k(e.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${k(e.id)}" ${t?`checked`:``} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${M(e,`mini-avatar`)}
              <div>
                <strong style="color:var(--ink);">${k(O(e.name,e.nameEn||e.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${k(O(e.jobTitleAr,e.jobTitleEn)||e.email||``)}</span>
              </div>
            </div>
            ${t?`<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>`:``}
          </div>
        `}),u.innerHTML=o,u.style.display=`block`}m(),l&&(l.addEventListener(`focus`,()=>{g(l.value)}),l.addEventListener(`input`,()=>{let e=l.value.trim();g(e),d&&(d.style.display=e.length>1?`inline-flex`:`none`)}),l.addEventListener(`keydown`,e=>{if(e.key===`Enter`){e.preventDefault();let t=l.value.trim();t&&(p.includes(t)||(p.push(t),h()),l.value=``,d&&(d.style.display=`none`),u&&(u.style.display=`none`))}})),d&&d.addEventListener(`click`,()=>{let e=l?.value.trim();e&&(p.includes(e)||(p.push(e),h()),l.value=``,d.style.display=`none`,u&&(u.style.display=`none`))}),u&&u.addEventListener(`click`,e=>{if(e.target.closest(`.dropdown-ext-action`)){let e=l?.value.trim();e&&!p.includes(e)&&(p.push(e),h()),l&&(l.value=``),d&&(d.style.display=`none`),u.style.display=`none`;return}let t=e.target.closest(`.combobox-user-row`);if(t){let e=t.dataset.uid;f.includes(e)?f=f.filter(t=>t!==e):f.push(e),h(),g(l?.value||``)}}),c&&c.addEventListener(`click`,e=>{let t=e.target.closest(`.btn-remove-chip-user`);if(t){let e=t.dataset.uid;f=f.filter(t=>t!==e),h(),u&&u.style.display===`block`&&g(l?.value||``);return}let n=e.target.closest(`.btn-remove-chip-ext`);if(n){let e=n.dataset.ext;p=p.filter(t=>t!==e),h()}});let _=t.querySelector(`#task-reminders-input`),v=t.querySelector(`#task-reminders-list`),y=t.querySelector(`#new-reminder-datetime`),b=t.querySelector(`#new-reminder-note`),x=t.querySelector(`#btn-add-reminder`),S=[];try{S=JSON.parse(_?.value||`[]`)}catch{S=[]}Array.isArray(S)||(S=[]);function C(){v&&(_&&(_.value=JSON.stringify(S)),v.innerHTML=yt(S))}x&&x.addEventListener(`click`,()=>{let e=y?.value;if(!e){E(O(`يرجى اختيار تاريخ ووقت التذكير.`,`Please pick a reminder date & time.`),!0);return}let t=b?.value.trim()||``,n={id:`rem_temp_`+Math.random().toString(36).substr(2,9),remindAt:new Date(e).toISOString(),noteAr:t};S.push(n),y&&(y.value=``),b&&(b.value=``),C(),E(O(`تمت إضافة موعد التذكير للقائمة.`,`Reminder added to list.`))}),v&&v.addEventListener(`click`,async e=>{let t=e.target.closest(`.btn-delete-reminder`);if(t){let e=Number(t.dataset.idx),n=t.dataset.remId;!isNaN(e)&&e>=0&&e<S.length&&(S.splice(e,1),C(),n&&!n.startsWith(`rem_temp_`)&&L(`/api/reminders/${n}`,{method:`DELETE`}).catch(()=>{}),E(O(`تم حذف موعد التذكير.`,`Reminder deleted.`)))}}),t.addEventListener(`mousedown`,e=>{u?.contains(e.target)||l?.contains(e.target)||d?.contains(e.target)||(u&&(u.style.display=`none`),d&&(d.style.display=`none`))}),e&&e.id&&!e.id.startsWith(`demo_`)&&L(`/api/tasks/${encodeURIComponent(e.id)}/comments`,{silent:!0}).then(t=>{if(t&&Array.isArray(t.comments)){s.data.comments||(s.data.comments=[]);let n=new Map(s.data.comments.map(e=>[e.id,e]));for(let e of t.comments)n.set(e.id,e);s.data.comments=Array.from(n.values());let r=document.getElementById(`task-comments-list`);r&&document.getElementById(`task-comment-form`)?.dataset?.taskId===e.id&&(r.innerHTML=St(e))}}).catch(()=>{})}function St(e){let t=(s.data.comments||[]).filter(t=>t.taskId===e.id).sort((e,t)=>new Date(e.createdAt)-new Date(t.createdAt));return t.length?`<div style="display:flex;flex-direction:column;gap:12px;">${t.map(t=>{let n=t.user||(s.data?.users||[]).find(e=>e.id===t.userId)||s.data?.user||{name:`DARC Member`,id:``},r=!!(n.id&&s.data?.user?.id&&n.id===s.data.user.id),i=r||typeof I==`function`&&I(),a=k(t.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,`<strong style="color:var(--blue)">@$1</strong>`);return`
      <div class="task-comment-item" data-comment-id="${k(t.id)}" style="display:flex;gap:10px;flex-direction:${r?`row-reverse`:`row`};">
        ${M(n)}
        <div style="display:flex;flex-direction:column;align-items:${r?`flex-end`:`flex-start`};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${k(O(n.name,n.nameEn||n.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${dateLabel(t.createdAt,!0)}</span>
            ${i?`
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${k(t.id)}" data-task-id="${k(e.id)}" title="${O(`تعديل التعليق`,`Edit comment`)}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${j(`edit`,12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${k(t.id)}" data-task-id="${k(e.id)}" title="${O(`حذف التعليق`,`Delete comment`)}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${j(`trash`,12)}
                </button>
              </div>
            `:``}
          </div>
          <div id="comment-bubble-${k(t.id)}" style="background:${r?`var(--blue)`:`var(--surface)`};color:${r?`#fff`:`var(--ink)`};padding:8px 12px;border-radius:12px;font-size:13px;border:${r?`none`:`1px solid var(--border)`};border-top-${r?`right`:`left`}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${a}</div>
        </div>
      </div>
    `}).join(``)}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${j(`message`,18)}<span style="font-size:12px;">${O(`لا توجد تعليقات`,`No comments yet`)}</span></div>`}function Ct(e){let t=s.data.documents.filter(t=>t.taskId===e.id).sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt));return t.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${t.map(e=>`
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;transition:background 0.15s ease;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;cursor:pointer;" data-action="preview-doc" data-doc-id="${e.id}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${j(`document`,14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${k(e.originalName)}">${k(e.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${dateLabel(e.createdAt,!0)} · ${k(e.user?O(e.user.name,e.user.nameEn||e.user.name):`Team Member`)} · ${e.size>1048576?(e.size/1048576).toFixed(1)+`MB`:Math.round(e.size/1024)+`KB`}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${e.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${O(`نسخ رابط المشاركة`,`Copy share link`)}">${j(`link`,14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${e.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${O(`معاينة المخطط في نافذة منبثقة`,`Preview in popup modal`)}">${j(`eye`,14)}</button>
        ${F(`review_tasks`)||F(`approve_tasks`)||F(`upload_documents`)||I()?`
          <select class="doc-status-select" data-doc-id="${e.id}" style="font-size:11px;padding:2px 4px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);">
            <option value="draft" ${e.status===`draft`?`selected`:``}>${O(`مسودة`,`Draft`)}</option>
            ${F(`review_tasks`)||I()?`<option value="review" ${e.status===`review`?`selected`:``}>${O(`مراجعة`,`Review`)}</option>`:``}
            ${F(`approve_tasks`)||I()?`<option value="approved" ${e.status===`approved`?`selected`:``}>${O(`معتمد`,`Approved`)}</option>`:``}
            <option value="superseded" ${e.status===`superseded`?`selected`:``}>${O(`ملغى`,`Superseded`)}</option>
          </select>
        `:``}
        ${F(`upload_documents`)||I()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${e.id}" style="padding:4px;min-width:0;height:auto;" title="${O(`إعادة تسمية`,`Rename`)}">${j(`edit`,14)}</button>`:``}
        ${F(`delete_documents`)||I()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${e.id}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${O(`حذف`,`Delete`)}">${j(`trash`,14)}</button>`:``}
      </div>
    </div>
  `).join(``)}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${j(`document`,18)}<span style="font-size:12px;">${O(`لا توجد ملفات مرفوعة`,`No documents uploaded`)}</span></div>`}function wt(e){let t=(s.data?.documents||[]).find(t=>t.id===e);if(!t)return;let n=t.diskFilename||`/api/documents/${t.id}`;(n.startsWith(`file://`)||n.startsWith(`/`)||!n.startsWith(`http`))&&(n=`/api/documents/${t.id}`);let r=``;if(n.includes(`drive.google.com`)){let e=n.match(/\/d\/([a-zA-Z0-9_-]+)/);e&&e[1]&&(r=e[1])}let i=r?`https://drive.google.com/file/d/${encodeURIComponent(r)}/preview`:n,a=/^(https?:\/\/|\/)/i.test(i)?i:`about:blank`,o=r?`https://drive.google.com/file/d/${encodeURIComponent(r)}/view?usp=drivesdk`:n.startsWith(`http`)?n:`${window.location.origin}${n}`,c=/^(https?:\/\/|\/)/i.test(o)?o:`#`,l=`/api/documents/${encodeURIComponent(t.id)}`,u=/\.(jpe?g|png|gif|webp|svg|heic)$/i.test(t.originalName)||t.mimeType&&t.mimeType.startsWith(`image/`);t.size>1048576?(t.size/1048576).toFixed(1)+``:Math.round((t.size||0)/1024)+``;let d=document.getElementById(`preview-modal-overlay`);d||(d=document.createElement(`div`),d.id=`preview-modal-overlay`,d.style.position=`fixed`,d.style.inset=`0`,d.style.zIndex=`1300`,d.style.background=`rgba(0, 0, 0, 0.75)`,d.style.backdropFilter=`blur(4px)`,d.style.display=`flex`,d.style.alignItems=`center`,d.style.justifyContent=`center`,d.style.padding=`20px`,document.body.appendChild(d)),d.innerHTML=`
    <div style="background:var(--surface);width:95%;max-width:1100px;height:88vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.3);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--border);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid var(--line);background:var(--surface);">
        <div style="display:flex;align-items:center;gap:10px;overflow:hidden;">
          <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${j(`document`,16)}</span>
          <div style="overflow:hidden;">
            <h2 style="margin:0;font-size:15px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${k(t.originalName)}">${k(t.originalName)}</h2>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <button type="button" class="btn btn-soft btn-sm" data-action="copy-doc-link" data-doc-id="${k(t.id)}" style="display:flex;align-items:center;gap:6px;" title="${O(`نسخ رابط المشاركة`,`Copy share link`)}">
            ${j(`link`,13)} <span class="hide-mobile">${O(`نسخ الرابط`,`Copy Link`)}</span>
          </button>
          <a href="${k(c)}" target="_blank" rel="noopener noreferrer" class="btn btn-soft btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${O(`فتح في Google Drive`,`Open in Google Drive`)}">
            ${j(`globe`,13)} <span class="hide-mobile">${O(`فتح في Drive`,`Open in Drive`)}</span>
          </a>
          <a href="${k(l)}" target="_blank" download class="btn btn-primary btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${O(`تحميل المخطط`,`Download`)}">
            ${j(`download`,13)} <span class="hide-mobile">${O(`تحميل`,`Download`)}</span>
          </a>
          <button type="button" class="btn btn-ghost btn-sm" id="close-preview-modal-btn" style="padding:6px;min-width:0;margin-inline-start:4px;" title="${O(`إغلاق`,`Close`)}">${j(`close`,18)}</button>
        </div>
      </div>
      <div style="flex:1;position:relative;background:#1a1a1a;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        ${!r&&u?`
          <div style="width:100%;height:100%;overflow:auto;display:flex;align-items:center;justify-content:center;padding:15px;">
            <img src="${k(a)}" alt="${k(t.originalName)}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:0 4px 20px rgba(0,0,0,0.5);" onerror="this.onerror=null;this.src='${k(l)}';" />
          </div>
        `:`
          <iframe src="${k(a)}" style="width:100%;height:100%;border:none;background:#fff;" allow="autoplay" loading="lazy"></iframe>
        `}
      </div>
    </div>
  `,d.style.display=`flex`,document.getElementById(`close-preview-modal-btn`)?.addEventListener(`click`,()=>{d.style.display=`none`,d.innerHTML=``}),d.onclick=e=>{e.target===d&&(d.style.display=`none`,d.innerHTML=``)}}function Tt(){return[[`not_started`,D(`notStarted`)],[`in_progress`,D(`inProgress`)],[`review`,D(`review`)],[`approval`,D(`approval`)],[`done`,D(`done`)],[`blocked`,D(`blocked`)],[`canceled`,D(`canceled`)]]}function Et(){let e=document.querySelector(`.timeline-container > div`),t=document.querySelector(`.timeline-svg`);if(!e||!t)return;t.innerHTML=``;let n=Array.from(document.querySelectorAll(`.timeline-bar`)),r={},i=e.getBoundingClientRect();n.forEach(e=>{let t=e.getBoundingClientRect();r[e.dataset.taskId]={left:t.left-i.left,right:t.right-i.left,top:t.top-i.top,bottom:t.bottom-i.top,width:t.width,height:t.height,center:t.top-i.top+t.height/2}});let a=``,o=s.lang===`ar`;n.forEach(e=>{let t=e.dataset.taskId,n=(s.data?.tasks||[]).find(e=>e.id===t),i=n?.dependencies||n?.customFields?.dependencies||[];if(!n||!i.length)return;let c=r[t];c&&i.forEach(e=>{let t=r[e];if(!t)return;let n=o?t.left:t.right,i=t.center,s=o?c.right:c.left,l=c.center,u=n+(o?-20:20);a+=`<path d="M ${n} ${i} C ${u} ${i}, ${u} ${l}, ${s} ${l}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),t.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${a}
  `}var Dt=t({buildProjectMemberChipsHtml:()=>zt,exportPortfolioPDF:()=>qt,exportPortfolioXLS:()=>Wt,exportProjectPDF:()=>Kt,exportProjectXLS:()=>Gt,exportXLS:()=>Ut,getCompanyBranding:()=>Ht,getDaysLeftBadge:()=>kt,getProjectTeam:()=>jt,getProjectTeamData:()=>At,openCloneModal:()=>Vt,openProjectModal:()=>Bt,projectCard:()=>Ft,projectRow:()=>Ot,renderInPagePrintModal:()=>Jt,renderProjectCardTeamAvatars:()=>Pt,renderProjectDetail:()=>Rt,renderProjectOverviewTab:()=>It,renderProjectTeamAvatars:()=>Mt,renderProjectTimelineBar:()=>Nt,renderProjects:()=>Lt});function Ot(e){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${j(`building`,17)}</span><div class="project-name"><strong>${k(O(e.nameAr,e.nameEn))}</strong><span>${k(e.code)} · ${k(O(e.clientAr,e.clientEn))}</span></div></div>${projectProgress(e)}<div class="project-owner">${M(e.manager)}<span>${k(e.manager?O(e.manager.name,e.manager.nameEn||e.manager.name):`—`)}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${k(e.id)}" aria-label="${D(`viewDetails`)}">${j(s.lang===`ar`?`arrowLeft`:`arrow`,14)}</button></div>`}function kt(e){if(!e)return``;let t=new Date(`${e}T23:59:59`),n=Math.ceil((t-new Date)/864e5),r=`var(--mint-strong)`,i=`var(--mint)`,a=``;return n<0?(r=`var(--red)`,i=`var(--red-soft)`,a=O(`متأخر ${Math.abs(n)} يوم`,`${Math.abs(n)}d overdue`)):n===0?(r=`var(--red)`,i=`var(--red-soft)`,a=O(`يستحق اليوم`,`Due today`)):n<=2?(r=`var(--red)`,i=`var(--red-soft)`,a=O(`باقي ${n} يوم`,`${n}d left`)):n<=7?(r=`var(--amber)`,i=`var(--amber-soft)`,a=O(`باقي ${n} أيام`,`${n}d left`)):(r=`var(--mint-strong)`,i=`var(--mint)`,a=O(`باقي ${n} يوم`,`${n}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${r};background:${i};border:1px solid currentColor;">${j(`clock`,11)} ${a}</span>`}function At(e){let t=s.data?.users||[],n=(s.data?.tasks||[]).filter(t=>t.projectId===e.id),r=new Set,i=new Set;return e.managerId&&r.add(e.managerId),n.forEach(e=>{e.assigneeId&&r.add(e.assigneeId),(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).forEach(e=>r.add(e)),(e.customFields?.externalAssignees||e.customFields?.external_assignees||[]).forEach(e=>{e&&typeof e==`string`&&e.trim()&&i.add(e.trim())})}),{internalMembers:Array.from(r).map(e=>t.find(t=>t.id===e)).filter(Boolean),externalMembers:Array.from(i)}}function jt(e){return At(e).internalMembers}function Mt(e,t=4,n=!0,r=[]){if((!e||!e.length)&&(!r||!r.length))return`<span style="font-size:11px;color:var(--muted);">${O(`لا يوجد فريق محدد`,`No team assigned`)}</span>`;let i=(e||[]).slice(0,t),a=(e||[]).length-t,o=(e||[]).map(e=>O(e.name,e.nameEn||e.name)).join(`، `),s=`<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">`;return i.forEach(e=>{let t=O(e.name,e.nameEn||e.name),r=n?`data-action="filter-by-member" data-member-id="${k(e.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:`style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"`;s+=`
      <span class="team-member-chip" ${r} title="${k(t)} (${k(P(e))})">
        ${M(e,`mini-avatar`)}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${k(t)}</span>
      </span>
    `}),a>0&&(s+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${k(o)}">+${a} ${O(`آخرين`,`more`)}</span>`),r&&r.length>0&&(s+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${k(r.join(`، `))}">🌐 +${r.length} ${O(`خارجي`,`ext`)}</span>`),s+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${O(`فريق العمل الداخلي`,`Internal Team`)} (${(e||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(e||[]).map(e=>`
        <div ${n?`data-action="filter-by-member" data-member-id="${k(e.id)}" title="${k(O(`فلترة مهام `+(e.name||``),`Filter tasks of `+(e.nameEn||e.name||``)))}"`:``} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${n?`cursor:pointer;transition:all 0.15s;`:``}" ${n?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:``}>
          ${M(e,`micro-avatar`)}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${k(O(e.name,e.nameEn||e.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${k(P(e))}</span>
          </div>
        </div>
      `).join(``)}
    </div>
    
    ${r&&r.length>0?`
      <hr style="border:0;border-top:1px dashed var(--line);margin:8px 0 6px;" />
      <strong style="display:block;font-size:11px;color:var(--teal);margin-bottom:6px;">🌐 ${O(`الشركاء والمتعاونون الخارجيون`,`External Partners`)} (${r.length})</strong>
      <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin;">
        ${r.map(e=>`
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink);background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;white-space:nowrap;">
            <span style="font-size:11px;color:var(--teal);">🌐</span>
            <span style="font-weight:500;">${k(e)}</span>
          </div>
        `).join(``)}
      </div>
    `:``}

    ${n?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${O(`💡 اضغط على أي عضو لفلترة مهامه`,`💡 Click member to filter tasks`)}</div>`:``}
  </div>`,s+=`</div>`,s}function Nt(e){if(!e.dueDate)return``;let t=new Date(e.startDate||e.createdAt||Date.now()-2592e6),n=new Date(`${e.dueDate}T23:59:59`),r=new Date,i=n.getTime()-t.getTime(),a=0;i>0&&(a=Math.min(100,Math.max(0,Math.round((r.getTime()-t.getTime())/i*100))));let o=r>n,s=o?`var(--red)`:a>=80&&!o?`var(--amber)`:`var(--blue)`;return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${j(`clock`,12)}
          <strong>${O(`المؤشر الزمني للمشروع`,`Project Schedule Elapsed`)}</strong>: 
          <span style="color:${s};font-weight:bold;">${o?O(`انتهى موعد التسليم!`,`Deadline passed!`):O(`مضى ${a}% من الوقت`,`${a}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${dateLabel(e.startDate)} ➔ ${dateLabel(e.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${a}%;background:${s};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function Pt(e=[],t=[],n=3){let r=e.length+t.length;if(r===0)return`<span style="font-size:11px;color:var(--muted);">—</span>`;let i=e.slice(0,n),a=r-i.length;[...e.map(e=>O(e.name,e.nameEn||e.name)),...t].join(`، `);let o=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${O(`عرض فريق العمل`,`View Team`)}">`;return o+=`<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">`,i.forEach((e,t)=>{o+=`
      <div style="margin-inline-start:${t===0?`0`:`-8px`};position:relative;z-index:${10-t};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${M(e,`mini-avatar`)}
      </div>
    `}),a>0&&(o+=`
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${a}
      </div>
    `),t&&t.length>0&&a<=0&&(o+=`<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;">🌐</span>`),o+=`</div>`,o+=`
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${O(`فريق العمل`,`Team Members`)}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${r}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${e.map(e=>`
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${M(e,`micro-avatar`)}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${k(O(e.name,e.nameEn||e.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${k(P(e))}</span>
            </div>
          </div>
        `).join(``)}
      </div>
      ${t&&t.length>0?`
        <div style="margin-top:8px;padding-top:6px;border-top:1px dashed var(--line);">
          <span style="font-size:9.5px;font-weight:700;color:var(--teal);display:block;margin-bottom:4px;">🌐 ${O(`الشركاء الخارجيون`,`External Partners`)} (${t.length})</span>
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${t.map(e=>`
              <div style="font-size:10.5px;color:var(--ink-soft);padding:2px 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                • ${k(e)}
              </div>
            `).join(``)}
          </div>
        </div>
      `:``}
    </div>
  `,o+=`</div>`,o}function Ft(e){let{internalMembers:t,externalMembers:n}=At(e),r=e.manager||(s.data?.users||[]).find(t=>t.id===e.managerId),i=kt(e.dueDate),a=O(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
        <span class="project-card-symbol">${j(`building`,19)}</span>
        <div style="min-width:0;flex:1;">
          <span class="eyebrow" style="font-size:10px;margin-bottom:2px;display:block;">${k(e.code)}</span>
          <h3 class="project-card-title" title="${k(O(e.nameAr,e.nameEn))}">${k(O(e.nameAr,e.nameEn))}</h3>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;align-self:flex-start;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${O(`بانتظار المزامنة مع السيرفر`,`Pending cloud sync`)}">⏳ ${O(`معلقة`,`Pending`)}</span>`:``}
        <span class="status-badge ${k(e.health)}">${k(N(e.health))}</span>
      </div>
    </div>
    
    <p class="project-card-desc" title="${k(a||``)}">
      ${a?k(a):`<span style="color:var(--muted);font-style:italic;">${O(`لا يوجد وصف مسجل لهذا المشروع`,`No description registered`)}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${M(r,`mini-avatar`)}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${D(`manager`)}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${k(r?O(r.name,r.nameEn||r.name):`—`)}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${D(`team`)} (${t.length+n.length})</span>
        ${Pt(t,n,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${D(`deadline`)}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">
          <strong>${e.dueDate?dateLabel(e.dueDate,!0):`—`}</strong>
          ${i}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${e.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${e.health===`off_track`?`red`:e.health===`at_risk`?`amber`:``}" style="width:${e.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${k(e.id)}">
      ${D(`viewDetails`)} ${j(s.lang===`ar`?`arrowLeft`:`arrow`,13)}
    </button>
  </article>`}function It(e,t,n,r=[]){let i=e.manager||(s.data?.users||[]).find(t=>t.id===e.managerId),a=t.filter(e=>e.status===`done`).length,o=t.filter(e=>e.status===`in_progress`).length,c=t.filter(isOverdue).length;return`
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid" style="grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${O(`إجمالي المهام`,`Total Tasks`)}</span>
          <div class="metric-value">${t.length}</div>
          <span class="metric-note up">${a} ${D(`done`)}</span>
        </div>
        <div class="metric-card blue" style="padding:14px 18px;">
          <span class="metric-label">${O(`قيد التنفيذ`,`In Progress`)}</span>
          <div class="metric-value">${o}</div>
          <span class="metric-note">${O(`عمل جارٍ`,`Active work`)}</span>
        </div>
        <div class="metric-card ${c?`red`:`teal`}" style="padding:14px 18px;">
          <span class="metric-label">${D(`overdue`)}</span>
          <div class="metric-value">${c}</div>
          <span class="metric-note ${c?`alert`:`up`}">${c?O(`تحتاج تدخلاً عاجلاً`,`Needs urgent action`):O(`لا يوجد تأخير`,`On track`)}</span>
        </div>
        <div class="metric-card amber" style="padding:14px 18px;">
          <span class="metric-label">${O(`فريق العمل`,`Team Size`)}</span>
          <div class="metric-value">${n.length+(r?.length||0)}</div>
          <span class="metric-note">${O(`أعضاء مساهمون`,`Active contributors`)}</span>
        </div>
      </div>

      <!-- Schedule Timeline Bar -->
      ${Nt(e)}

      <!-- Details Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;">
        <!-- Left: Project Scope & Client -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${j(`document`,16)}
            ${O(`نطاق وتفاصيل المشروع`,`Project Scope & Details`)}
          </h3>
          <p style="color:var(--ink-soft);font-size:13px;line-height:1.7;margin-bottom:18px;">
            ${k(e.descriptionAr||e.descriptionEn||O(`لا يوجد وصف مسجل لهذا المشروع حالياً.`,`No description available for this project.`))}
          </p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:var(--surface-soft);padding:14px;border-radius:10px;border:1px solid var(--line);">
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${D(`client`)}</span>
              <strong style="font-size:13px;color:var(--ink);">${k(O(e.clientAr,e.clientEn)||`—`)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${D(`lifecycle`)}</span>
              <strong style="font-size:13px;color:var(--ink);">${k(N(e.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${D(`startDate`)}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(e.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${D(`dueDate`)}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(e.dueDate,!0)}</strong>
            </div>
          </div>
        </div>

        <!-- Right: Team & Leadership -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${j(`users`,16)}
            ${O(`القيادة وفريق العمل`,`Leadership & Team`)}
          </h3>

          <!-- Manager card -->
          <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:10px;margin-bottom:16px;background:var(--surface);">
            ${M(i)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${D(`manager`)}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${k(i?O(i.name,i.nameEn||i.name):`—`)}</strong>
              <span style="font-size:11px;color:var(--muted);">${k(i?.email||``)}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${O(`أعضاء الفريق الداخلي:`,`Internal Team Members:`)}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${n.map(e=>{let n=t.filter(t=>t.assigneeId===e.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${M(e,`mini-avatar`)}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${k(O(e.name,e.nameEn||e.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${k(P(e))}</span>
                    </div>
                  </div>
                  <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${n} ${D(`tasks`)}</span>
                </div>
              `}).join(``)}
          </div>

          ${r&&r.length>0?`
            <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0 10px;" />
            <span style="font-size:11px;color:var(--teal);font-weight:bold;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              🌐 ${O(`الشركاء والمتعاونون الخارجيون:`,`External Partners & Collaborators:`)}
            </span>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:180px;overflow-y:auto;">
              ${r.map(e=>{let n=t.filter(t=>(t.customFields?.externalAssignees||t.customFields?.external_assignees||[]).includes(e)).length;return`
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="font-size:14px;">🌐</span>
                      <div>
                        <strong style="display:block;font-size:12px;color:var(--ink);">${k(e)}</strong>
                        <span style="font-size:10px;color:var(--muted);">${O(`شريك / جهة خارجية`,`External Partner`)}</span>
                      </div>
                    </div>
                    <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${n} ${D(`tasks`)}</span>
                  </div>
                `}).join(``)}
            </div>
          `:``}
        </div>
      </div>
    </div>
  `}function Lt(){let e=s.searches.projects.trim().toLowerCase(),t=s.data.projects.filter(t=>`${t.nameAr} ${t.nameEn} ${t.code} ${t.clientAr}`.toLowerCase().includes(e)),n=s.projectSort||`default`;return n===`alpha-asc`?t.sort((e,t)=>(O(e.nameAr,e.nameEn)||``).localeCompare(O(t.nameAr,t.nameEn)||``,s.lang===`ar`?`ar`:`en`)):n===`alpha-desc`?t.sort((e,t)=>(O(t.nameAr,t.nameEn)||``).localeCompare(O(e.nameAr,e.nameEn)||``,s.lang===`ar`?`ar`:`en`)):n===`progress-asc`?t.sort((e,t)=>(Number(e.progress)||0)-(Number(t.progress)||0)):n===`progress-desc`&&t.sort((e,t)=>(Number(t.progress)||0)-(Number(e.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${O(`المحفظة`,`PORTFOLIO`)}</p><h1>${D(`projects`)}</h1><p>${O(`كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.`,`One view for every project: health, progress, team, and next deadline.`)}</p></div><div class="page-actions">${F(`create_projects`)?`<button class="btn btn-primary" data-action="new-project">${j(`plus`,15)} ${D(`addProject`)}</button>`:``}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${j(`search`,15)}<input data-search="projects" value="${k(s.searches.projects)}" placeholder="${D(`search`)}" /></div><div class="sort-box"><span>${O(`الترتيب:`,`Sort:`)}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${n==="default"?`selected`:``}>${O(`الافتراضي`,`Default`)}</option><option value="alpha-asc" ${n===`alpha-asc`?`selected`:``}>${O(`أبجدياً (أ - ي)`,`Alphabetical (A - Z)`)}</option><option value="alpha-desc" ${n===`alpha-desc`?`selected`:``}>${O(`أبجدياً (ي - أ)`,`Alphabetical (Z - A)`)}</option><option value="progress-asc" ${n===`progress-asc`?`selected`:``}>${O(`نسبة الإنجاز (تصاعدي 0% ← 100%)`,`Progress (Low to High)`)}</option><option value="progress-desc" ${n===`progress-desc`?`selected`:``}>${O(`نسبة الإنجاز (تنازلي 100% ← 0%)`,`Progress (High to Low)`)}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${t.length} ${O(`مشاريع`,`projects`)}</span></div></div>${t.length?`<div class="project-cards">${t.map(Ft).join(``)}</div>`:`<section class="panel"><div class="empty">${j(`building`,18)}<span>${D(`noProjects`)}</span></div></section>`}`}function Rt(){let e=s.data.projects.find(e=>e.id===s.activeProjectId);if(!e)return s.view=`projects`,Lt();let t=s.data.tasks.filter(t=>t.projectId===e.id),{internalMembers:n,externalMembers:r}=At(e),i=s.projectTab||`tasks`,a=s.projectMemberFilter||null,o=a?t.filter(e=>e.assigneeId===a||(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).includes(a)):t,c=a?s.data.users.find(e=>e.id===a):null,l=``;if(i===`overview`)l=It(e,t,n,r);else if(i===`tasks`){let t=s.projectTaskSort||st();l=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${D(`projectTasks`)} ${a?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${O(`مهام`,`Tasks of`)}: ${k(O(c?.name,c?.nameEn||c?.name))})</span>`:``}</h2>
            <p class="panel-subtitle">${O(`توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.`,`Tasks grouped by current workflow state, automatically sorted.`)}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${lt(t,`sort-project-tasks`)}
            ${a?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${j(`close`,12)} ${O(`إلغاء الفلترة`,`Clear filter`)}</button>`:``}
            ${F(`create_tasks`)?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${k(e.id)}" title="${O(`اضغط N للإضافة السريعة`,`Press N to add quickly`)}">${j(`plus`,14)} ${D(`addTask`)} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:``}
          </div>
        </div>
        ${renderBoard(o,t)}
      </div>
    `}else if(i===`timeline`){let{renderTimelinePanel:t}=window.__timelineExports||{};l=t?t(o,e):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${O(`المخطط الزمني والتقويم`,`Timeline & Calendar`)}</h2></div></div>${renderTimeline(o)}</div>`}else if(i===`drawings`){let n=(s.data.documents||[]).filter(t=>t.projectId===e.id&&!t.deletedAt),r=t.filter(e=>e.typeAr===`مخطط`||e.typeEn===`Drawing`||e.templateId),i=s.docTaskFilter||`all`,a=i===`all`?n:n.filter(e=>e.taskId===i);l=`
      <div class="panel">
        <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h2 class="panel-title">${O(`المخططات والمستندات الهندسية`,`Drawings & Documents`)}</h2>
            <p class="panel-subtitle">${O(`جميع المخططات والملفات المرفوعة لهذا المشروع مع إمكانية الفلترة حسب المهمة والمعاينة الفورية.`,`All blueprints and files uploaded for this project, with task filtering and instant preview.`)}</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <!-- Filter by Task dropdown -->
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:12px;color:var(--ink-soft);">${O(`المهمة:`,`Task:`)}</span>
              <select data-action="filter-project-docs-task" class="filter-select select-compact" style="max-width:200px;">
                <option value="all" ${i===`all`?`selected`:``}>${O(`— جميع المهام —`,`— All Tasks —`)}</option>
                ${t.map(e=>`<option value="${k(e.id)}" ${i===e.id?`selected`:``}>${k(O(e.titleAr,e.titleEn))}</option>`).join(``)}
              </select>
            </div>
            ${F(`create_tasks`)?`
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${k(e.id)}">
                ${j(`plus`,12)} ${O(`إضافة مخرج / مخطط`,`Add Deliverable / Drawing`)}
              </button>
            `:``}
          </div>
        </div>

        <!-- Section 1: Uploaded Files (Direct previews) -->
        <div style="margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${j(`document`,14)} ${O(`الملفات والمخططات المرفوعة`,`Uploaded Files & Blueprints`)} (${a.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${O(`اسم المخطط / الملف`,`Blueprint / File Name`)}</th>
                  <th>${D(`tasks`)}</th>
                  <th>${O(`الحالة`,`Status`)}</th>
                  <th>${O(`الحجم`,`Size`)}</th>
                  <th>${O(`تاريخ الرفع`,`Upload Date`)}</th>
                  <th style="text-align:end;">${O(`الإجراءات`,`Actions`)}</th>
                </tr>
              </thead>
              <tbody>
                ${a.length>0?a.map(e=>{let n=t.find(t=>t.id===e.taskId),r=e.size>1048576?(e.size/1048576).toFixed(1)+` MB`:Math.round((e.size||0)/1024)+` KB`;return`
                    <tr data-doc-id="${k(e.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${k(e.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${j(`document`,15)}
                          </span>
                          <div>
                            <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${k(e.originalName)}">
                              ${k(e.originalName)}
                            </strong>
                            <span style="font-size:11px;color:var(--muted);">${k(e.mimeType||`application/octet-stream`)}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${n?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${k(n.id)}">${k(O(n.titleAr,n.titleEn))}</span>`:`—`}
                      </td>
                      <td>
                        <span class="status-badge ${k(e.status||`draft`)}" style="font-size:11px;">
                          ${k(N(e.status||`draft`))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${r}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${dateLabel(e.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${k(e.id)}" style="padding:5px;" title="${O(`معاينة المخطط`,`Preview`)}">
                            ${j(`eye`,14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${k(e.id)}" style="padding:5px;color:var(--teal);" title="${O(`نسخ الرابط`,`Copy Link`)}">
                            ${j(`link`,14)}
                          </button>
                          <a href="/api/documents/${k(e.id)}" target="_blank" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${O(`تحميل`,`Download`)}">
                            ${j(`download`,14)}
                          </a>
                        </div>
                      </td>
                    </tr>
                  `}).join(``):`
                  <tr>
                    <td colspan="6">
                      <div class="empty" style="padding:30px 10px;">
                        ${j(`document`,20)}
                        <span>${O(`لا توجد ملفات مرفوعة لهذه المهمة أو المشروع حتى الآن.`,`No files uploaded for this task/project yet.`)}</span>
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
            ${j(`checklist`,14)} ${O(`مخرجات المخططات المجدولة`,`Scheduled Drawing Tasks`)} (${r.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${D(`taskTitle`)}</th>
                  <th>${D(`taskType`)}</th>
                  <th>${D(`status`)}</th>
                  <th>${D(`progress`)}</th>
                  <th>${D(`assignee`)}</th>
                </tr>
              </thead>
              <tbody>
                ${r.map(e=>`
                  <tr data-action="open-task" data-task-id="${k(e.id)}" style="cursor:pointer;" title="${O(`انقر لعرض وتعديل المهمة ورفع المخططات`,`Click to open task and manage files`)}">
                    <td><span class="table-title">${k(O(e.titleAr,e.titleEn))}</span><span class="table-sub">${k(e.templateId||`CUSTOM`)}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${k(O(e.typeAr,e.typeEn)||O(`مخطط`,`Drawing`))}</span></td>
                    <td><span class="status-badge ${k(e.status)}">${k(N(e.status))}</span></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;min-width:40px;">
                          <div style="height:100%;background:${e.status===`done`?`var(--green)`:`var(--blue)`};width:${e.progress||0}%;"></div>
                        </div>
                        <span style="font-size:11px;font-weight:600;">${e.progress||0}%</span>
                      </div>
                    </td>
                    <td>${e.assignee?k(O(e.assignee.name,e.assignee.nameEn||e.assignee.name)):`—`}</td>
                  </tr>
                `).join(``)||`<tr><td colspan="5"><div class="empty">${D(`noTasks`)}</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}else i===`activity`&&(l=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${D(`activity`)}</h2><p class="panel-subtitle">${O(`كل تغيير مهم يبقى قابلًا للمراجعة.`,`Every important change remains reviewable.`)}</p></div></div>${renderAuditForProject(e.id)}</div>`);let u=e.manager||(s.data.users||[]).find(t=>t.id===e.managerId),d=kt(e.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${j(s.lang===`ar`?`arrow`:`arrowLeft`,15)}</button>
        <div>
          <p class="eyebrow">${k(e.code)} · ${e.demo?D(`sampleData`):D(`active`)}</p>
          <h1>${k(O(e.nameAr,e.nameEn))}</h1>
          <p>${k(O(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${j(`user`,12)} 
              <strong>${D(`manager`)}:</strong> ${k(u?O(u.name,u.nameEn||u.name):`—`)}
            </span>
            ${e.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${j(`calendar`,12)} ${dateLabel(e.dueDate,!0)}
                ${d}
              </span>
            `:``}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${j(`users`,12)}
              <span style="font-size:11px;">${D(`team`)}:</span>
              ${Mt(n,4,!0,r)}
            </span>
            <span class="status-badge ${k(e.health)}">${k(N(e.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${e.progress}%</strong>
        <span>${D(`weightedProgress`)}</span>
        ${F(`edit_projects`)||F(`create_projects`)||F(`delete_projects`)||F(`view_reports`)||I()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${j(`more`,15)} ${O(`خيارات`,`Options`)}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${s.lang===`ar`?`left:0`:`right:0`};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:220px;padding:5px;margin-top:5px;text-align:start">
              ${F(`edit_projects`)||I()?`<button class="menu-item" data-action="edit-project" data-project-id="${k(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${j(`edit`,14)} ${D(`edit`)}</button>`:``}
              ${F(`create_projects`)||I()?`<button class="menu-item" data-action="clone-project" data-project-id="${k(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${j(`document`,14)} ${O(`استنساخ المشروع`,`Clone Project`)}</button>`:``}
              ${F(`export_reports`)||I()?`
                <button class="menu-item" data-action="export-project-pdf" data-project-id="${k(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--brand-teal);font-weight:600;">
                  ${j(`printer`,14)} ${O(`تقرير تنفيذي معتمد (PDF)`,`Executive Report (PDF)`)}
                </button>
                <button class="menu-item" data-action="export-project-client-pdf" data-project-id="${k(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--ink);">
                  ${j(`user`,14)} ${O(`تقرير تسليمات العميل (PDF)`,`Client Deliverables (PDF)`)}
                </button>
                <button class="menu-item" data-action="export-project" data-project-id="${k(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;">
                  ${j(`document`,14)} ${O(`تصدير بيانات المهام (Excel)`,`Export Tasks (Excel)`)}
                </button>
              `:``}
              ${F(`delete_projects`)||I()?`<button class="menu-item" data-action="delete-project" data-project-id="${k(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${j(`trash`,14)} ${O(`حذف المشروع`,`Delete Project`)}</button>`:``}
            </div>
          </div>
        `:``}
      </div>
    </div>

    <!-- Sub Navigation Tabs: 'تفاصيل' instead of 'overview' -->
    <div class="detail-tabs">
      <button class="detail-tab ${i===`tasks`?`active`:``}" data-action="project-tab" data-tab="tasks">${D(`tasks`)}</button>
      <button class="detail-tab ${i===`overview`?`active`:``}" data-action="project-tab" data-tab="overview">${O(`تفاصيل`,`Details`)}</button>
      <button class="detail-tab ${i===`timeline`?`active`:``}" data-action="project-tab" data-tab="timeline">${O(`المخطط الزمني والتقويم`,`Timeline & Calendar`)}</button>
      <button class="detail-tab ${i===`drawings`?`active`:``}" data-action="project-tab" data-tab="drawings">${D(`drawings`)}</button>
      <button class="detail-tab ${i===`activity`?`active`:``}" data-action="project-tab" data-tab="activity">${D(`activity`)}</button>
    </div>
    
    ${l}
  `}function zt(e=[]){let t=s.data?.users||[];return e.map(e=>{let n=t.find(t=>t.id===e)||{name:e,id:e};return`
      <span class="chip-item" data-uid="${k(e)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${M(n,`mini-avatar`)}
        <span style="font-weight:500;">${k(O(n.name,n.nameEn||n.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${k(e)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${O(`إزالة`,`Remove`)}">×</button>
      </span>
    `}).join(``)}function Bt(e=null){let t=e?.code||`DARC-${String((s.data?.projects?.length||0)+1).padStart(3,`0`)}`,n=e?At(e).internalMembers.map(e=>e.id):[],r=n.length>0?n:[s.data?.user?.id].filter(Boolean),i=`
    <form id="project-form" data-project-id="${k(e?.id||``)}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${k(JSON.stringify(r))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${j(`building`,14)} <span>${O(`البيانات الأساسية للمشروع`,`Core Project Information`)}</span>
        </div>

        <div class="field full">
          <label>${D(`nameAr`)} *</label>
          <input name="nameAr" value="${k(e?.nameAr||``)}" placeholder="${O(`مثال: فيلا النخيل — التصميم الداخلي`,`e.g. Al Nakheel Villa — Interior Design`)}" required />
        </div>
        <div class="field">
          <label>${D(`nameEn`)}</label>
          <input name="nameEn" value="${k(e?.nameEn||``)}" placeholder="Al Nakheel Villa — Interior Design" />
        </div>
        <div class="field">
          <label>${D(`projectCode`)} *</label>
          <input name="code" value="${k(t)}" placeholder="DARC-025" required />
        </div>
        <div class="field full">
          <label>${D(`client`)}</label>
          <input name="clientAr" value="${k(e?.clientAr||``)}" placeholder="${O(`اسم العميل أو الجهة المالكة`,`Client or owning entity`)}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${j(`calendar`,14)} <span>${O(`الجدولة والإدارة`,`Management & Schedule`)}</span>
        </div>

        <div class="field full">
          <label>${D(`manager`)}</label>
          <select name="managerId" id="project-manager-select">
            <option value="">${O(`— بدون تحديد —`,`— Unassigned —`)}</option>
            ${s.data.users.map(t=>`<option value="${k(t.id)}" ${(e?e.managerId===t.id:s.data.user.id===t.id)?`selected`:``}>${k(O(t.name,t.nameEn||t.name))}</option>`).join(``)}
          </select>
        </div>
        <div class="field">
          <label>${O(`أولوية المشروع`,`Project Priority`)}</label>
          <select name="priority">
            <option value="low" ${e?.priority===`low`||e?.customFields?.priority===`low`?`selected`:``}>${O(`منخفضة`,`Low`)}</option>
            <option value="medium" ${!e||e?.priority===`medium`||e?.customFields?.priority===`medium`||!e?.priority?`selected`:``}>${O(`متوسطة`,`Medium`)}</option>
            <option value="high" ${e?.priority===`high`||e?.customFields?.priority===`high`?`selected`:``}>${O(`عالية`,`High`)}</option>
            <option value="urgent" ${e?.priority===`urgent`||e?.customFields?.priority===`urgent`?`selected`:``}>${O(`حرجة / عاجلة`,`Urgent`)}</option>
          </select>
        </div>
        <div class="field">
          <label>${O(`حالة المشروع`,`Project Status`)}</label>
          <select name="lifecycle">
            <option value="active" ${!e||e.lifecycle===`active`?`selected`:``}>${O(`نشط (قيد التنفيذ)`,`Active (In Progress)`)}</option>
            <option value="planning" ${e?.lifecycle===`planning`?`selected`:``}>${O(`تخطيط`,`Planning`)}</option>
            <option value="on_hold" ${e?.lifecycle===`on_hold`?`selected`:``}>${O(`معلق / متوقف`,`On Hold`)}</option>
            <option value="completed" ${e?.lifecycle===`completed`?`selected`:``}>${O(`مكتمل`,`Completed`)}</option>
            <option value="archived" ${e?.lifecycle===`archived`?`selected`:``}>${O(`مؤرشف`,`Archived`)}</option>
          </select>
        </div>
        <div class="field">
          <label>${D(`startDate`)}</label>
          <input type="date" name="startDate" value="${k(e?.startDate||``)}" />
        </div>
        <div class="field">
          <label>${D(`dueDate`)}</label>
          <input type="date" name="dueDate" value="${k(e?.dueDate||``)}" />
        </div>

        <!-- 👥 القسم 3: أعضاء فريق المشروع والمشاركون -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:6px;">
            ${j(`users`,14)} <span>${O(`أعضاء فريق المشروع والمشاركون`,`Project Team Members & Collaborators`)}</span>
          </div>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${O(`اختر من الفريق لإعطائهم حق الوصول للمشروع`,`Select team members who can access this project`)}</span>
        </div>

        <div class="field full" style="position:relative;">
          <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
          <div id="project-members-chips-container" style="display:${r.length?`flex`:`none`};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
            ${zt(r)}
          </div>

          <!-- حقل البحث والإضافة السريعة -->
          <div style="position:relative;display:flex;gap:6px;">
            <input type="text" id="project-member-search" placeholder="${O(`ابحث عن عضو لإضافته لفريق المشروع...`,`Search team member to add to project team...`)}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          </div>

          <!-- القائمة المنسدلة للبحث والاختيار -->
          <div id="project-member-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
          </div>
        </div>

        <!-- 📝 القسم 4: نطاق المشروع والملاحظات -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${j(`document`,14)} <span>${O(`نطاق المشروع والملاحظات`,`Scope & Notes`)}</span>
        </div>

        <div class="field full">
          <label>${O(`وصف ونطاق المشروع`,`Project Scope & Description`)}</label>
          <textarea name="descriptionAr" placeholder="${O(`وصف مختصر لنطاق العمل، المعايير المعتمدة، وأي ملاحظات خاصة...`,`Brief description of scope, design criteria, and special notes...`)}">${k(e?.descriptionAr||``)}</textarea>
        </div>
      </div>

      <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;margin-top:20px;">
        <div>
          ${e&&(F(`delete_projects`)||I())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${k(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${O(`حذف المشروع ونقله لسلة المهملات`,`Delete project and move to trash`)}">
              ${j(`trash`,14)} ${O(`حذف المشروع`,`Delete Project`)}
            </button>
          `:``}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${D(`cancel`)}</button>
          <button type="submit" class="btn btn-primary">${j(`check`,14)} ${D(e?`save`:`create`)}</button>
        </div>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=T(e?O(`تعديل بيانات المشروع`,`Edit Project`):D(`addProject`),O(`إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.`,`Manage project details, schedule, and workflow health.`),i,`project`),setTimeout(()=>{let e=document.getElementById(`project-member-search`),t=document.getElementById(`project-member-dropdown`),n=document.getElementById(`project-members-chips-container`),i=document.getElementById(`project-members-input`),a=document.getElementById(`project-manager-select`);if(!e||!t||!n||!i)return;let o=[...r];function c(){n.innerHTML=zt(o),n.style.display=o.length?`flex`:`none`,i.value=JSON.stringify(o),n.querySelectorAll(`.btn-remove-project-member`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.uid;o=o.filter(e=>e!==n),c()})})}a&&a.addEventListener(`change`,()=>{let e=a.value;e&&!o.includes(e)&&(o.push(e),c())});function l(n=``){let r=n.toLowerCase().trim(),i=(s.data?.users||[]).filter(e=>!o.includes(e.id)&&(!r||e.name&&e.name.toLowerCase().includes(r)||e.nameEn&&e.nameEn.toLowerCase().includes(r)||e.email&&e.email.toLowerCase().includes(r)));i.length?(t.innerHTML=i.map(e=>`
          <div class="project-member-opt" data-uid="${k(e.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${M(e,`mini-avatar`)}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${k(O(e.name,e.nameEn||e.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${k(e.roleId||``)}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${O(`إضافة`,`Add`)}</span>
          </div>
        `).join(``),t.querySelectorAll(`.project-member-opt`).forEach(n=>{n.addEventListener(`mouseenter`,()=>n.style.background=`var(--surface-soft)`),n.addEventListener(`mouseleave`,()=>n.style.background=`transparent`),n.addEventListener(`click`,()=>{let r=n.dataset.uid;r&&!o.includes(r)&&(o.push(r),c(),e.value=``,t.style.display=`none`)})})):t.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${O(`لا يوجد أعضاء مطابقون`,`No matching members`)}</div>`,t.style.display=`block`}e.addEventListener(`focus`,()=>l(e.value)),e.addEventListener(`input`,()=>l(e.value)),document.addEventListener(`click`,n=>{!e.contains(n.target)&&!t.contains(n.target)&&(t.style.display=`none`)}),c()},50)}function Vt(e){let t=`
    <form id="clone-form" data-project-id="${e.id}">
      <p style="margin-top:0;margin-bottom:20px;color:var(--ink-soft);font-size:13px">${O(`أنت على وشك استنساخ المشروع:`,`You are about to clone the project:`)} <strong style="color:var(--ink)">${k(O(e.nameAr,e.nameEn))}</strong></p>
      <div class="form-grid">
        <div class="field full">
          <label>${D(`nameAr`)}</label>
          <input name="nameAr" value="${k(e.nameAr)} (نسخة)" required />
        </div>
        <div class="field full">
          <label>${D(`nameEn`)}</label>
          <input name="nameEn" value="${k(e.nameEn)} (Copy)" required />
        </div>
      </div>
      
      <div class="field full">
        <label>${O(`تاريخ التسليم المتوقع`,`Expected Due Date`)}</label>
        <input name="dueDate" type="date" value="${e.dueDate||``}" />
      </div>

      <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:8px;padding:15px;margin-top:20px;display:flex;flex-direction:column;gap:12px">
        <strong style="font-size:13px">${O(`إعدادات النسخ المتقدمة`,`Advanced Clone Settings`)}</strong>
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneTasks" checked style="width:16px;height:16px;margin:0">
          ${O(`نسخ جميع المهام والهيكلة (Tasks)`,`Clone all tasks & structure`)}
        </label>
        
        <div style="padding-${s.lang===`ar`?`right`:`left`}:26px">
          <label style="display:flex;align-items:center;gap:8px;font-weight:400;color:var(--ink-soft);cursor:pointer">
            <input type="checkbox" name="keepAssignees" style="width:14px;height:14px;margin:0">
            ${O(`الاحتفاظ بالمسند إليهم (Keep Assignees)`,`Keep Task Assignees`)}
          </label>
        </div>
        
        <hr style="border:0;border-top:1px solid var(--border);margin:4px 0" />
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneMembers" checked style="width:16px;height:16px;margin:0">
          ${O(`استنساخ أعضاء فريق العمل (Team)`,`Clone team members`)}
        </label>
      </div>
      
      <div class="modal-actions" style="margin-top:24px">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${D(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${j(`document`,14)} ${O(`استنساخ المشروع`,`Clone Project`)}</button>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=T(O(`استنساخ المشروع`,`Clone Project`),O(`أداة إنشاء قوالب المشاريع السريعة`,`Rapid project templating tool`),t,`clone`);let n=document.getElementById(`clone-form`),r=n.querySelector(`input[name="cloneTasks"]`),i=n.querySelector(`input[name="keepAssignees"]`);r.addEventListener(`change`,e=>{i.disabled=!e.target.checked,e.target.checked||(i.checked=!1)}),n.addEventListener(`submit`,async t=>{t.preventDefault();let r=n.querySelector(`button[type="submit"]`);r.disabled=!0;try{let t={nameAr:n.nameAr.value,nameEn:n.nameEn.value,dueDate:n.dueDate.value,cloneTasks:n.cloneTasks.checked,keepAssignees:n.keepAssignees.checked,cloneMembers:n.cloneMembers.checked},r=await L(`/api/projects/${e.id}/clone`,{method:`POST`,body:JSON.stringify(t)});w(),s.view=`project-detail`,s.activeProjectId=r.project.id,await refreshView(),E(O(`تم استنساخ المشروع بنجاح.`,`Project cloned successfully.`))}catch(e){E(e.message,!0),r.disabled=!1}})}function Ht(){let e=s.data?.company||{},t=e.nameAr||e.name||`فريق دارك للتصميم`,n=e.nameEn||e.name||`DARC Design Team`,r=O(t,n),i=e.logoUrl||``,a=/^(https?:\/\/|data:image\/|\/)/i.test(i)&&!i.toLowerCase().includes(`javascript:`)?i:``;return a.startsWith(`/`)&&typeof window<`u`&&window.location?.origin&&(a=`${window.location.origin}${a}`),{nameAr:t,nameEn:n,displayName:r,logoUrl:a,emailFrom:e.emailFrom||``,timezone:e.timezone||`Asia/Riyadh`}}function Ut(e,t){let n=`
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
    <body dir="${s.lang===`ar`?`rtl`:`ltr`}">
      ${t}
    </body>
    </html>
  `,r=new Blob([`﻿`+n],{type:`application/vnd.ms-excel;charset=utf-8;`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=e+`.xls`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)}function Wt(){let e=s.data?.projects||[];if(!e||!e.length){E(O(`لا توجد بيانات لتصديرها.`,`No data to export.`),!0);return}let t=Ht(),n=new Date().toLocaleDateString(s.lang===`ar`?`ar-SA`:`en-US`),r=`<table>`;r+=`<tr><td colspan="11" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${t.logoUrl?`<img src="${k(t.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:``}
    <span style="vertical-align:middle;">${k(t.displayName)}</span>
  </td></tr>`,r+=`<tr><td colspan="11" class="subtitle">${O(`تقرير حالة مشاريع المحفظة الهندسية`,`Portfolio Projects Status Report`)}</td></tr>`,r+=`<tr><td colspan="11" class="meta">${O(`تاريخ الإصدار:`,`Generated on:`)} ${n}</td></tr>`,r+=`<tr><td colspan="11" style="border:none;"></td></tr>`,r+=`<tr class="header">
    <td>${O(`كود المشروع`,`Code`)}</td>
    <td>${O(`اسم المشروع (عربي)`,`Project Name (Ar)`)}</td>
    <td>${O(`اسم المشروع (إنجليزي)`,`Project Name (En)`)}</td>
    <td>${O(`العميل / المالك`,`Client`)}</td>
    <td>${O(`مدير المشروع`,`Manager`)}</td>
    <td>${O(`المرحلة`,`Lifecycle`)}</td>
    <td>${O(`الصحة التشغيلية`,`Health`)}</td>
    <td>${O(`تاريخ البدء`,`Start Date`)}</td>
    <td>${O(`تاريخ التسليم`,`Due Date`)}</td>
    <td>${O(`نسبة الإنجاز`,`Progress %`)}</td>
    <td>${O(`عدد أعضاء الفريق`,`Team Size`)}</td>
  </tr>`,e.forEach(e=>{let t=e.manager?O(e.manager.name,e.manager.nameEn||e.manager.name):``;r+=`<tr>
      <td>${k(A(e.code))}</td>
      <td>${k(A(e.nameAr))}</td>
      <td>${k(A(e.nameEn))}</td>
      <td>${k(A(O(e.clientAr,e.clientEn)))}</td>
      <td>${k(A(t))}</td>
      <td>${k(A(N(e.lifecycle)))}</td>
      <td>${k(A(N(e.health)))}</td>
      <td>${k(A(e.startDate||``))}</td>
      <td>${k(A(e.dueDate||``))}</td>
      <td>${e.progress||0}%</td>
      <td>${e.memberCount||0}</td>
    </tr>`}),r+=`</table>`,Ut(`DARC_Portfolio_Report_${new Date().toISOString().split(`T`)[0]}`,r),E(O(`تم بدء تحميل تقرير المحفظة.`,`Portfolio report download started.`)),L(`/api/audit`,{method:`POST`,body:JSON.stringify({action:`export_report`,entityType:`report`,details:{title:O(`تقرير حالة مشاريع المحفظة (Excel)`,`Portfolio Projects Report (Excel)`),count:e.length}})}).catch(()=>{})}function Gt(e){let t=(s.data?.projects||[]).find(t=>t.id===e);if(!t)return;let n=(s.data?.tasks||[]).filter(t=>t.projectId===e);if(!n.length){E(O(`لا توجد مهام لهذا المشروع لتصديرها.`,`No tasks to export.`),!0);return}let r=Ht(),i=s.data?.users||[],a=new Map(i.map(e=>[e.id,e]));function o(e){if(!e)return`—`;let t=a.get(e);return t?O(t.name,t.nameEn||t.name):e}let c=new Date().toLocaleDateString(s.lang===`ar`?`ar-SA`:`en-US`),l=`<table>`;l+=`<tr><td colspan="11" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${r.logoUrl?`<img src="${k(r.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:``}
    <span style="vertical-align:middle;">${k(r.displayName)}</span>
  </td></tr>`,l+=`<tr><td colspan="11" class="subtitle">${O(`تقرير مهام ومخرجات المشروع:`,`Project Tasks & Deliverables Report:`)} ${k(O(t.nameAr,t.nameEn))} (${k(t.code)})</td></tr>`,l+=`<tr><td colspan="11" class="meta">${O(`العميل / المالك:`,`Client:`)} ${k(O(t.clientAr,t.clientEn))||`—`} | ${O(`تاريخ الإصدار:`,`Generated on:`)} ${c}</td></tr>`,l+=`<tr><td colspan="11" style="border:none;"></td></tr>`,l+=`<tr class="header">
    <td>${O(`كود المخرج`,`Code`)}</td>
    <td>${O(`المهمة (عربي)`,`Task (Ar)`)}</td>
    <td>${O(`المهمة (إنجليزي)`,`Task (En)`)}</td>
    <td>${O(`التخصص / القسم`,`Category`)}</td>
    <td>${O(`المنفذ المسؤول`,`Assignee`)}</td>
    <td>${O(`المراجع الهندسي`,`Reviewer`)}</td>
    <td>${O(`المعتمد النهائي`,`Approver`)}</td>
    <td>${O(`الحالة`,`Status`)}</td>
    <td>${O(`تاريخ البدء`,`Start Date`)}</td>
    <td>${O(`تاريخ التسليم`,`Due Date`)}</td>
    <td>${O(`الإنجاز`,`Progress %`)}</td>
  </tr>`,n.forEach((e,t)=>{let n=e.templateId?e.templateId.replace(`tpl-`,`#`):e.id?`#${e.id.slice(-6)}`:`#${t+1}`,r=o(e.assigneeId||e.assignee_id),i=o(e.reviewerId||e.reviewer_id),a=o(e.approverId||e.approver_id);l+=`<tr>
      <td style="text-align:center;font-weight:bold;">${k(A(n))}</td>
      <td>${k(A(e.titleAr))}</td>
      <td>${k(A(e.titleEn))}</td>
      <td>${k(A(O(e.categoryAr,e.categoryEn)))}</td>
      <td>${k(A(r))}</td>
      <td style="color:#0369a1;">${k(A(i))}</td>
      <td style="color:#047857;">${k(A(a))}</td>
      <td>${k(A(N(e.status)))}</td>
      <td>${k(A(e.startDate||``))}</td>
      <td>${k(A(e.dueDate||``))}</td>
      <td style="font-weight:bold;">${e.progress||0}%</td>
    </tr>`}),l+=`</table>`,Ut(`DARC_Project_${t.code}_${new Date().toISOString().split(`T`)[0]}`,l),E(O(`تم بدء تحميل تقرير المهام.`,`Report download started.`)),L(`/api/audit`,{method:`POST`,body:JSON.stringify({action:`export_report`,entityType:`project`,entityId:e,details:{title:O(`تقرير مهام مشروع: ${t.nameAr}`,`Project Tasks Report: ${t.nameEn||t.nameAr}`),taskCount:n.length}})}).catch(()=>{})}function Kt(e,t=!1){let n=(s.data?.projects||[]).find(t=>t.id===e);if(!n)return;let r=(s.data?.tasks||[]).filter(t=>t.projectId===e);if(!r.length){E(O(`لا توجد مهام لهذا المشروع لطباعة التقرير.`,`No tasks to print report.`),!0);return}let i=Ht(),a=s.data?.users||[],o=new Map(a.map(e=>[e.id,e]));function c(e){if(!e)return`—`;let t=o.get(e);return t?O(t.name,t.nameEn||t.name):e}function l(e){return e?.dueDate&&![`done`,`completed`,`canceled`].includes(e.status)&&new Date(`${e.dueDate}T23:59:59`)<new Date}let u=r.length,d=r.filter(e=>[`done`,`completed`].includes(e.status)).length,f=r.filter(e=>[`review`,`approval`].includes(e.status)).length;r.filter(e=>e.status===`in_progress`).length;let p=r.filter(e=>l(e)).length,m=new Date,h=m.toLocaleDateString(s.lang===`ar`?`ar-SA`:`en-US`,{year:`numeric`,month:`long`,day:`numeric`}),g=m.toLocaleTimeString(s.lang===`ar`?`ar-SA`:`en-US`,{hour:`2-digit`,minute:`2-digit`}),_=new Map;r.forEach(e=>{let t=O(e.categoryAr,e.categoryEn)||O(e.typeAr,e.typeEn)||O(`عام`,`General`),n=_.get(t)||{total:0,completed:0,weight:0,progressSum:0},r=Number(e.weight||1);n.total++,[`done`,`completed`].includes(e.status)&&n.completed++,n.weight+=r,n.progressSum+=(e.progress||0)*r,_.set(t,n)});let v=Array.from(_.entries()).map(([e,t])=>({name:e,percent:t.weight?Math.round(t.progressSum/t.weight):0,completed:t.completed,total:t.total})),y=t?O(`تقرير تسليمات ومخرجات المشروع للمالك والعميل`,`Client Deliverables & Milestone Brief`):O(`تقرير الإنجاز التنفيذي والمخرجات والاعتمادات الهندسية`,`Official Executive Engineering & Deliverables Audit`);t?O(`ملخص رسمي لمخرجات ومخططات المشروع المعتمدة وتواريخ التسليم التعاقدية.`,`Official summary of approved architectural drawings, milestones, and deliverables.`):O(`بيان تفصيلي بمسار التنفيذ ومسؤوليات المراجعة والاعتماد لكافة مخرجات المشروع.`,`Detailed execution readout with review and approval sign-offs for all project assets.`);let b=r.map((e,n)=>{let r=e.templateId?e.templateId.replace(`tpl-`,`#`):e.id?`#${e.id.slice(-6)}`:`#${n+1}`,i=O(e.titleAr,e.titleEn),a=O(e.categoryAr,e.categoryEn)||O(e.typeAr,e.typeEn)||`—`,o=N(e.status),s=e.progress||0,l=e.dueDate||`—`;if(t)return`
        <tr>
          <td style="text-align:center;font-weight:bold;color:#475569;">${n+1}</td>
          <td style="text-align:center;font-weight:600;color:#0d6269;">${k(r)}</td>
          <td style="font-weight:600;">${k(i)}</td>
          <td style="text-align:center;">${k(a)}</td>
          <td style="text-align:center;"><span class="badge ${k(e.status)}">${k(o)}</span></td>
          <td style="text-align:center;direction:ltr;">${k(l)}</td>
          <td style="text-align:center;font-weight:bold;color:${s===100?`#0d6269`:`#1e293b`};">${s}%</td>
        </tr>
      `;let u=c(e.assigneeId||e.assignee_id),d=c(e.reviewerId||e.reviewer_id),f=c(e.approverId||e.approver_id);return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${n+1}</td>
        <td style="text-align:center;font-weight:600;color:#0d6269;">${k(r)}</td>
        <td style="font-weight:600;">${k(i)}</td>
        <td style="text-align:center;">${k(a)}</td>
        <td>${k(u)}</td>
        <td style="color:#0369a1;font-weight:600;">${k(d)}</td>
        <td style="color:#047857;font-weight:600;">${k(f)}</td>
        <td style="text-align:center;"><span class="badge ${k(e.status)}">${k(o)}</span></td>
        <td style="text-align:center;direction:ltr;">${k(l)}</td>
        <td style="text-align:center;font-weight:bold;color:${s===100?`#0d6269`:`#1e293b`};">${s}%</td>
      </tr>
    `}).join(``),x=`
    <!DOCTYPE html>
    <html lang="${s.lang}" dir="${s.lang===`ar`?`rtl`:`ltr`}">
    <head>
      <meta charset="utf-8" />
      <title>${k(i.displayName)} - ${k(n.code)} - ${t?`Client_Report`:`Executive_Report`}</title>
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
          text-align: ${s.lang===`ar`?`left`:`right`};
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
          text-align: ${s.lang===`ar`?`right`:`left`};
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
          <strong style="color:#0d6269;font-size:13px;">${k(y)}</strong>
          <div style="font-size:11px;color:#64748b;">${O(`معاينة التقرير جاهزة للطباعة أو الحفظ المباشر كملف PDF رسمي.`,`Ready for printing or saving directly as an official executive PDF file.`)}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-toolbar" onclick="window.print()">
            🖨️ ${O(`طباعة / حفظ كـ PDF`,`Print / Save as PDF`)}
          </button>
          <button class="btn-toolbar-ghost" onclick="window.location.search = (window.location.search.includes('client=1') ? '' : '?client=1')">
            🔄 ${t?O(`التبديل للتقرير الفني الشامل`,`Switch to Technical Report`):O(`التبديل لتقرير المالك والعميل`,`Switch to Client Report`)}
          </button>
          <button class="btn-toolbar-ghost" onclick="window.close()">
            ✕ ${O(`إغلاق`,`Close`)}
          </button>
        </div>
      </div>

      <header class="report-header">
        <div>
          ${i.logoUrl?`
            <img src="${k(i.logoUrl)}" alt="Logo" class="brand-logo-img" />
          `:`
            <div class="brand-logo-fallback">D</div>
          `}
          <h1 class="brand-title">${k(i.displayName)}</h1>
          <div class="brand-sub">${O(`مكتب الاستشارات والتصميم الهندسي`,`Architecture & Engineering Consultancy`)}</div>
        </div>
        <div class="report-meta-box">
          <div class="report-type-badge">${k(y)}</div>
          <div><strong>${O(`كود المشروع:`,`Project Code:`)}</strong> ${k(n.code)}</div>
          <div><strong>${O(`تاريخ التقرير:`,`Report Date:`)}</strong> ${k(h)} - ${k(g)}</div>
          <div><strong>${O(`حالة المشروع:`,`Project Status:`)}</strong> ${k(N(n.lifecycle))} (${k(N(n.health))})</div>
        </div>
      </header>

      <div class="info-strip">
        <div class="info-cell">
          <strong>${O(`اسم المشروع`,`Project Name`)}</strong>
          <span>${k(O(n.nameAr,n.nameEn))}</span>
        </div>
        <div class="info-cell">
          <strong>${O(`العميل / المالك`,`Client / Owner`)}</strong>
          <span>${k(O(n.clientAr,n.clientEn))||`—`}</span>
        </div>
        <div class="info-cell">
          <strong>${O(`الجدول الزمني`,`Schedule Timeline`)}</strong>
          <span>${k(n.startDate||`—`)} → ${k(n.dueDate||`—`)}</span>
        </div>
        <div class="info-cell">
          <strong>${O(`مدير المشروع المسؤول`,`Project Manager`)}</strong>
          <span>${k(c(n.managerId))}</span>
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${n.progress||0}%</div>
          <div class="kpi-label">${O(`نسبة الإنجاز الإجمالية`,`Overall Progress`)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#047857;">${d} / ${u}</div>
          <div class="kpi-label">${O(`المخرجات المعتمدة`,`Approved Deliverables`)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#b45309;">${f}</div>
          <div class="kpi-label">${O(`قيد المراجعة والاعتماد`,`Under Review`)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:${p>0?`#b91c1c`:`#64748b`};">${p}</div>
          <div class="kpi-label">${O(`المخرجات المتأخرة`,`Overdue Deliverables`)}</div>
        </div>
      </div>

      ${v.length?`
        <div class="disc-section">
          <strong style="font-size:11px;color:#334155;">${O(`مؤشرات الإنجاز بحسب التخصص الهندسي:`,`Engineering Discipline Progress Breakdown:`)}</strong>
          <div class="disc-grid">
            ${v.map(e=>`
              <div class="disc-item">
                <div style="display:flex;justify-content:space-between;font-weight:600;">
                  <span>${k(e.name)}</span>
                  <span>${e.percent}% (${e.completed}/${e.total})</span>
                </div>
                <div class="disc-bar-bg">
                  <div class="disc-bar-fill" style="width:${e.percent}%;"></div>
                </div>
              </div>
            `).join(``)}
          </div>
        </div>
      `:``}

      <table>
        <thead>
          <tr>
            <th style="width:30px;">#</th>
            <th style="width:75px;">${O(`الكود`,`Code`)}</th>
            <th>${t?O(`اسم المخرج الهندسي / المخطط`,`Deliverable / Drawing Title`):O(`المهمة والمخرج القياسي`,`Deliverable & Task Title`)}</th>
            <th style="width:90px;">${O(`التخصص`,`Discipline`)}</th>
            ${t?``:`
              <th style="width:105px;">${O(`المنفذ`,`Assignee`)}</th>
              <th style="width:105px;">${O(`المراجع`,`Reviewer`)}</th>
              <th style="width:105px;">${O(`المعتمد`,`Approver`)}</th>
            `}
            <th style="width:80px;">${O(`الحالة`,`Status`)}</th>
            <th style="width:85px;">${O(`موعد التسليم`,`Target Due`)}</th>
            <th style="width:55px;">${O(`الإنجاز`,`Progress`)}</th>
          </tr>
        </thead>
        <tbody>
          ${b}
        </tbody>
      </table>

      <div class="signature-section">
        <div class="stamp-box">
          ${O(`ختم المكتب الهندسي والاستشاري المعتمد`,`Official Engineering Consultancy Stamp`)}
        </div>
        <div class="signature-box">
          <div class="signature-title">${O(`مهندس ومدير المشروع`,`Project Manager`)}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${k(c(n.managerId))}</div>
          <div class="signature-line">${O(`التوقيع والمصادقة`,`Sign & Date`)}</div>
        </div>
        <div class="signature-box">
          <div class="signature-title">${O(`الاعتماد والاستشاري العام`,`Approved By Lead Consultant`)}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${k(i.displayName)}</div>
          <div class="signature-line">${O(`التوقيع والاعتماد النهائي`,`Sign & Authorization`)}</div>
        </div>
      </div>

      <footer class="report-footer">
        <div>${k(i.displayName)} — ${O(`وثيقة إدارية معتمدة صادرة عبر منصة دارك`,`Official Governance Document via DARC Platform`)}</div>
        <div>${O(`صفحة 1 من 1`,`Page 1 of 1`)}</div>
        <div>${k(h)}</div>
      </footer>
    </body>
    </html>
  `,S=window.open(``,`_blank`,`width=1100,height=900`);S?(S.document.open(),S.document.write(x),S.document.close()):Jt(x),E(O(`تم تجهيز التقرير الرسمي للطباعة والتصدير PDF.`,`Executive report ready for Print / PDF export.`)),L(`/api/audit`,{method:`POST`,body:JSON.stringify({action:`export_report`,entityType:`project`,entityId:e,details:{title:k(y),type:t?`client_pdf`:`executive_pdf`,taskCount:u}})}).catch(()=>{})}function qt(){let e=s.data?.projects||[];if(!e||!e.length){E(O(`لا توجد مشاريع لتصدير التقرير.`,`No projects to export.`),!0);return}let t=Ht(),n=new Date,r=n.toLocaleDateString(s.lang===`ar`?`ar-SA`:`en-US`,{year:`numeric`,month:`long`,day:`numeric`}),i=n.toLocaleTimeString(s.lang===`ar`?`ar-SA`:`en-US`,{hour:`2-digit`,minute:`2-digit`}),a=e.length,o=e.filter(e=>e.health===`on_track`).length,c=e.filter(e=>e.health===`at_risk`).length,l=e.filter(e=>e.health===`off_track`).length,u=e.map((e,t)=>{let n=e.manager?O(e.manager.name,e.manager.nameEn||e.manager.name):`—`;return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${t+1}</td>
        <td style="text-align:center;font-weight:700;color:#0d6269;">${k(e.code)}</td>
        <td style="font-weight:700;">${k(O(e.nameAr,e.nameEn))}</td>
        <td>${k(O(e.clientAr,e.clientEn))||`—`}</td>
        <td>${k(n)}</td>
        <td style="text-align:center;"><span class="badge ${k(e.lifecycle)}">${k(N(e.lifecycle))}</span></td>
        <td style="text-align:center;"><span class="badge ${k(e.health)}">${k(N(e.health))}</span></td>
        <td style="text-align:center;direction:ltr;">${k(e.startDate||`—`)}</td>
        <td style="text-align:center;direction:ltr;">${k(e.dueDate||`—`)}</td>
        <td style="text-align:center;font-weight:bold;color:${e.progress===100?`#0d6269`:`#0f172a`};">${e.progress||0}%</td>
      </tr>
    `}).join(``),d=O(`تقرير الأداء ومتابعة المشاريع للمحفظة الهندسية`,`Official Portfolio Projects Status & Operations Readout`),f=`
    <!DOCTYPE html>
    <html lang="${s.lang}" dir="${s.lang===`ar`?`rtl`:`ltr`}">
    <head>
      <meta charset="utf-8" />
      <title>${k(t.displayName)} - Portfolio_Report_${new Date().toISOString().split(`T`)[0]}</title>
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
        th, td { border: 1px solid #cbd5e1; padding: 7px 9px; text-align: ${s.lang===`ar`?`right`:`left`}; vertical-align: middle; }
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
          <strong style="color:#0d6269;font-size:13px;">${k(d)}</strong>
          <div style="font-size:11px;color:#64748b;">${O(`معاينة تقرير المحفظة جاهزة للطباعة أو الحفظ كـ PDF.`,`Portfolio report preview ready for print / save as PDF.`)}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-toolbar" onclick="window.print()">🖨️ ${O(`طباعة / حفظ كـ PDF`,`Print / Save as PDF`)}</button>
          <button class="btn-toolbar-ghost" onclick="window.close()">✕ ${O(`إغلاق`,`Close`)}</button>
        </div>
      </div>

      <header class="report-header">
        <div>
          ${t.logoUrl?`<img src="${k(t.logoUrl)}" alt="Logo" class="brand-logo-img" />`:``}
          <h1 class="brand-title">${k(t.displayName)}</h1>
          <div style="font-size:11px;color:#64748b;">${O(`الإدارة الهندسية وضبط الجودة والمشاريع`,`Engineering Operations & Project Portfolio Readout`)}</div>
        </div>
        <div style="text-align:${s.lang===`ar`?`left`:`right`};font-size:11px;color:#334155;line-height:1.6;">
          <div style="display:inline-block;background:#e6f4f5;color:#0d6269;font-weight:800;padding:3px 10px;border-radius:4px;font-size:11px;border:1px solid #bce1e4;margin-bottom:4px;">${O(`تقرير حالة المحفظة`,`Portfolio Status Report`)}</div>
          <div><strong>${O(`تاريخ التقرير:`,`Report Date:`)}</strong> ${k(r)} - ${k(i)}</div>
          <div><strong>${O(`إجمالي المشاريع:`,`Total Projects:`)}</strong> ${a}</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${a}</div>
          <div class="kpi-label">${O(`إجمالي مشاريع المحفظة`,`Total Projects`)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#166534;">${o}</div>
          <div class="kpi-label">${O(`مشاريع تسير وفق الخطة`,`On Track Projects`)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#b45309;">${c}</div>
          <div class="kpi-label">${O(`مشاريع تحت المراقبة (مخاطر)`,`At Risk Projects`)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#991b1b;">${l}</div>
          <div class="kpi-label">${O(`مشاريع متأخرة أو حرجة`,`Off Track / Delayed`)}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width:30px;">#</th>
            <th style="width:75px;">${O(`كود المشروع`,`Code`)}</th>
            <th>${O(`اسم المشروع`,`Project Name`)}</th>
            <th>${O(`العميل / المالك`,`Client / Owner`)}</th>
            <th>${O(`مدير المشروع`,`Manager`)}</th>
            <th style="width:80px;">${O(`المرحلة`,`Lifecycle`)}</th>
            <th style="width:80px;">${O(`الصحة التشغيلية`,`Health`)}</th>
            <th style="width:85px;">${O(`تاريخ البدء`,`Start Date`)}</th>
            <th style="width:85px;">${O(`تاريخ التسليم`,`Due Date`)}</th>
            <th style="width:65px;">${O(`الإنجاز`,`Progress %`)}</th>
          </tr>
        </thead>
        <tbody>
          ${u}
        </tbody>
      </table>

      <div class="signature-section">
        <div class="stamp-box">${O(`ختم الإدارة الهندسية والمكتب الاستشاري`,`Engineering Management Official Stamp`)}</div>
        <div class="signature-box">
          <div style="font-size:11px;font-weight:700;color:#1e293b;">${O(`مسؤول ضبط المشاريع (PMO)`,`PMO Lead`)}</div>
          <div style="border-top:1px dashed #94a3b8;margin-top:35px;padding-top:4px;font-size:10px;color:#64748b;">${O(`التوقيع والتاريخ`,`Sign & Date`)}</div>
        </div>
        <div class="signature-box">
          <div style="font-size:11px;font-weight:700;color:#1e293b;">${O(`المدير التنفيذي العام`,`Executive Director`)}</div>
          <div style="border-top:1px dashed #94a3b8;margin-top:35px;padding-top:4px;font-size:10px;color:#64748b;">${O(`المصادقة والاعتماد`,`Sign & Approval`)}</div>
        </div>
      </div>

      <footer class="report-footer">
        <div>${k(t.displayName)} — ${O(`تقرير إداري معتمد لمحفظة المشاريع`,`Official Portfolio Readout`)}</div>
        <div>${O(`صفحة 1 من 1`,`Page 1 of 1`)}</div>
        <div>${k(r)}</div>
      </footer>
    </body>
    </html>
  `,p=window.open(``,`_blank`,`width=1200,height=900`);p?(p.document.open(),p.document.write(f),p.document.close()):Jt(f),E(O(`تم تجهيز تقرير المحفظة للطباعة والتصدير PDF.`,`Portfolio report ready for Print / PDF export.`)),L(`/api/audit`,{method:`POST`,body:JSON.stringify({action:`export_report`,entityType:`report`,details:{title:k(d),type:`portfolio_pdf`,count:a}})}).catch(()=>{})}function Jt(e){let t=document.getElementById(`print-modal-overlay`);t||(t=document.createElement(`div`),t.id=`print-modal-overlay`,t.style.position=`fixed`,t.style.inset=`0`,t.style.zIndex=`1400`,t.style.background=`rgba(0, 0, 0, 0.75)`,t.style.backdropFilter=`blur(4px)`,t.style.display=`flex`,t.style.flexDirection=`column`,t.style.alignItems=`center`,t.style.justifyContent=`center`,t.style.padding=`15px`,document.body.appendChild(t)),t.innerHTML=`
    <div style="background:#fff;width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.3);overflow:hidden;display:flex;flex-direction:column;">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid #e2e8f0;background:#f8fafc;">
        <strong style="color:#0d6269;font-size:14px;">${O(`معاينة التقرير الرسمي المعتمد (PDF Preview)`,`Official Approved Report (PDF Preview)`)}</strong>
        <div style="display:flex;gap:10px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-print-iframe" style="display:flex;align-items:center;gap:6px;">
            ${j(`printer`,14)} ${O(`طباعة / حفظ كـ PDF`,`Print / Save as PDF`)}
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-close-print-modal">✕</button>
        </div>
      </div>
      <div style="flex:1;overflow:hidden;position:relative;">
        <iframe id="print-preview-iframe" style="width:100%;height:100%;border:none;" srcdoc="${k(e)}"></iframe>
      </div>
    </div>
  `,t.style.display=`flex`;let n=()=>{t.style.display=`none`,t.innerHTML=``,window.removeEventListener(`keydown`,r)},r=e=>{e.key===`Escape`&&n()};window.addEventListener(`keydown`,r),document.getElementById(`btn-close-print-modal`)?.addEventListener(`click`,n),document.getElementById(`btn-print-iframe`)?.addEventListener(`click`,()=>{let e=document.getElementById(`print-preview-iframe`);e&&e.contentWindow&&(e.contentWindow.focus(),e.contentWindow.print())})}var Yt=t({TEMPLATE_CATEGORIES:()=>Xt,openTemplateModal:()=>Qt,renderTemplates:()=>Zt}),Xt=[{id:`architectural`,ar:`معماري`,en:`Architectural`,icon:`🏛️`},{id:`electrical`,ar:`كهرباء — إلكتروميكانيك`,en:`Electrical`,icon:`⚡`},{id:`plumbing`,ar:`سباكة — إلكتروميكانيك`,en:`Plumbing`,icon:`💧`},{id:`hvac`,ar:`تكييف — إلكتروميكانيك`,en:`HVAC`,icon:`🌡️`},{id:`fire`,ar:`حريق — إلكتروميكانيك`,en:`Fire Protection`,icon:`🧯`},{id:`low_current`,ar:`تيار خفيف`,en:`Low Current`,icon:`📡`},{id:`sections`,ar:`مقاطع`,en:`Sections`,icon:`✂️`},{id:`detail`,ar:`تفصيلي`,en:`Detailed`,icon:`🔍`},{id:`site`,ar:`موقع عام`,en:`Site Plan`,icon:`🗺️`},{id:`quantity`,ar:`جداول كميات`,en:`Quantity Tables`,icon:`📊`},{id:`documents`,ar:`وثائق وخطابات`,en:`Documents & Letters`,icon:`📄`}];function Zt(){let e=s.searches.templates.trim().toLowerCase(),t=[...s.data.templates||[]].sort((e,t)=>(parseInt(e.code,10)||0)-(parseInt(t.code,10)||0)),n=new Map;Xt.forEach(e=>n.set(e.id,0)),t.forEach(e=>{n.set(e.categoryId,(n.get(e.categoryId)||0)+1)});let r=s.templateCategory||`all`,i=Xt.map(n=>{if(r!==`all`&&r!==n.id)return null;let i=t.filter(t=>t.categoryId===n.id?!e||`${t.nameAr} ${t.nameEn} ${t.code} ${t.typeAr} ${t.typeEn}`.toLowerCase().includes(e):!1);return i.length?{...n,items:i}:null}).filter(Boolean);return`<div class="page-head">
    <div>
      <p class="eyebrow">${O(`مخرجات DARC القياسية`,`DARC STANDARD DELIVERABLES`)}</p>
      <h1>${D(`templates`)}</h1>
      <p>${D(`standardLibrarySub`)}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${t.length} ${D(`templatesCount`)}</span>
      ${F(`manage_templates`)?`<button class="btn btn-primary" data-action="new-template" style="margin-${s.lang===`ar`?`right`:`left`}:10px">${j(`plus`,15)} ${O(`إضافة قالب`,`Add Template`)}</button>`:``}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${j(`search`,15)}
        <input data-search="templates" value="${k(s.searches.templates)}" placeholder="${D(`search`)}" />
      </div>
    </div>
  </div>
  <div class="template-layout">
    <aside class="template-sidebar">
      <button class="template-category-tab ${r===`all`?`active`:``}" data-action="template-category" data-category="all">
        <span class="category-icon">◌</span>
        <span>${D(`all`)}</span>
        <small>${t.length}</small>
      </button>
      ${Xt.map(e=>`
        <button class="template-category-tab ${r===e.id?`active`:``}" data-action="template-category" data-category="${k(e.id)}">
          <span class="category-icon">${k(e.icon)}</span>
          <span>${k(O(e.ar,e.en))}</span>
          <small>${n.get(e.id)||0}</small>
        </button>
      `).join(``)}
    </aside>
    <div>
      ${i.length?i.map(e=>`
        <section class="template-section">
          <div class="template-section-head">
            <span class="category-icon">${k(e.icon)}</span>
            <div>
              <h3>${k(O(e.ar,e.en))}</h3>
              <span>${e.items.length} ${D(`templatesCount`)}</span>
            </div>
          </div>
          <div class="template-grid">
            ${e.items.map(e=>`
              <article class="template-item" style="position:relative;cursor:${F(`manage_templates`)?`pointer`:`default`};" ${F(`manage_templates`)?`data-action="edit-template" data-template-id="${k(e.id)}"`:``}>
                <span class="template-number">${k(e.code)}</span>
                <div class="template-copy">
                  <strong>${k(O(e.nameAr,e.nameEn))}</strong>
                  <span>${k(s.lang===`ar`?e.nameEn:e.nameAr)}</span>
                </div>
                ${F(`manage_templates`)?`<button class="template-action" data-action="edit-template" data-template-id="${k(e.id)}" title="${D(`edit`)}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${s.lang===`ar`?`right`:`left`}:auto">${j(`edit`,14)}</button>`:``}
              </article>
            `).join(``)}
          </div>
        </section>
      `).join(``):`
        <section class="panel">
          <div class="empty">
            ${j(`layers`,18)}
            <span>${D(`noTasks`)}</span>
          </div>
        </section>
      `}
    </div>
  </div>`}function Qt(e=null){if(!F(`manage_templates`))return E(D(`permissionDenied`),!0);let t=Xt.map(t=>`<option value="${k(t.id)}" ${e?.categoryId===t.id?`selected`:``}>${k(O(t.ar,t.en))}</option>`).join(``),n=`<form id="template-form" data-template-id="${k(e?.id||``)}">
    <div class="form-grid">
      <div class="field">
        <label>${D(`nameAr`)}</label>
        <input name="nameAr" value="${k(e?.nameAr||``)}" required />
      </div>
      <div class="field">
        <label>${D(`nameEn`)}</label>
        <input name="nameEn" value="${k(e?.nameEn||``)}" required />
      </div>
      <div class="field">
        <label>${O(`الرمز / الكود`,`Code`)}</label>
        <input name="code" value="${k(e?.code||``)}" placeholder="e.g. 01" />
      </div>
      <div class="field">
        <label>${O(`التصنيف`,`Category`)}</label>
        <select name="categoryId" required>${t}</select>
      </div>
      <div class="field">
        <label>${O(`النوع (عربي)`,`Type (Ar)`)}</label>
        <input name="typeAr" value="${k(e?.typeAr||`مخطط`)}" required />
      </div>
      <div class="field">
        <label>${O(`النوع (إنجليزي)`,`Type (En)`)}</label>
        <input name="typeEn" value="${k(e?.typeEn||`Drawing`)}" required />
      </div>
      <div class="field">
        <label>${O(`الوزن الافتراضي`,`Default Weight`)}</label>
        <input name="defaultWeight" type="number" min="1" value="${e?.defaultWeight||1}" required />
      </div>
      <div class="field">
        <label>${O(`المدة الافتراضية (أيام)`,`Default Duration (Days)`)}</label>
        <input name="defaultDuration" type="number" min="1" value="${e?.defaultDuration||5}" required />
      </div>
    </div>
    <div class="modal-actions" style="display:flex;justify-content:space-between;width:100%">
      ${e?`<button type="button" class="btn btn-ghost" data-action="delete-template" data-template-id="${k(e.id)}" style="color:var(--red)">${j(`trash`,14)} ${D(`delete`)}</button>`:`<div></div>`}
      <div style="display:flex;gap:10px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${D(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${j(`check`,14)} ${D(e?`save`:`create`)}</button>
      </div>
    </div>
  </form>`;document.getElementById(`modal-root`).innerHTML=T(e?O(`تعديل قالب`,`Edit Template`):O(`إضافة قالب جديد`,`Add New Template`),O(`القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.`,`Templates help the team insert tasks quickly with standard criteria.`),n,`template`)}var $t=t({openUploadDrawingModal:()=>tn,renderDocuments:()=>en});function en(){let e=s.data?.documents||[],t=s.data?.projects||[],n=s.data?.tasks||[],r=(s.searches?.documents||``).trim().toLowerCase(),i=s.docProjectFilter||`all`,a=s.data?.user?.id,o=I(),c=o||F(`review_tasks`)||F(`approve_tasks`)||F(`edit_tasks`),l=new Set(n.filter(e=>!e.deletedAt).map(e=>e.id)),u=new Set(t.filter(e=>!e.deletedAt).map(e=>e.id)),d=e.filter(e=>!(e.deletedAt||e.taskId&&!l.has(e.taskId)||e.projectId&&!u.has(e.projectId)||i!==`all`&&e.projectId!==i||r&&!(e.originalName||``).toLowerCase().includes(r))).sort((e,t)=>new Date(t.createdAt||0)-new Date(e.createdAt||0)),f=d.reduce((e,t)=>e+(t.size||0),0),p=f>1073741824?(f/1073741824).toFixed(1)+` GB`:f>1048576?(f/1048576).toFixed(1)+` MB`:Math.round(f/1024)+` KB`;return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${O(`مركز المخرجات والمخططات الهندسية`,`DELIVERABLES & BLUEPRINTS CENTER`)}</p>
        <h2>${D(`documents`)}</h2>
        <p class="intro">${O(`إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.`,`Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.`)}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        ${F(`upload_documents`)||o?`
          <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:7px;font-weight:700;box-shadow:0 2px 8px rgba(13,98,105,0.25);">
            ${j(`upload`,14)}
            <span>${O(`رفع مخطط / ملف جديد`,`Upload Drawing / File`)}</span>
          </button>
        `:``}
        <button class="btn btn-secondary btn-sm" data-action="go-to-trash" style="display:inline-flex;align-items:center;gap:6px;" title="${O(`الانتقال لسلة المحذوفات لاستعراض واستعادة الملفات والمشاريع المحذوفة`,`Go to trash bin to review and restore deleted files and projects`)}">
          ${j(`trash`,14)}
          <span>${O(`سلة المهملات`,`Trash`)}</span>
        </button>
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;">
          ${d.length} ${O(`مخطط / ملف`,`drawings`)} (${p})
        </span>
      </div>
    </div>

    <!-- Filters Bar (Unified View Toolbar) -->
    <div class="view-toolbar" style="margin-bottom:20px;">
      <div class="view-toolbar-start" style="flex:1;">
        <div class="search-box" style="flex:1;max-width:440px;">
          ${j(`search`,15)}
          <input 
            type="search" 
            placeholder="${O(`بحث برقم المخطط أو الاسم أو الامتداد (DWG, PDF, RVT)...`,`Search by drawing name, code, or format (DWG, PDF, RVT)...`)}" 
            value="${k(s.searches?.documents||``)}" 
            data-search="documents" 
            data-action="search-documents" 
          />
        </div>

        <div class="sort-box">
          <span>${O(`المشروع:`,`Project:`)}</span>
          <select data-action="doc-project-filter" class="filter-select select-compact" style="min-width:180px;">
            <option value="all" ${i===`all`?`selected`:``}>${O(`— جميع المشاريع —`,`— All Projects —`)}</option>
            ${t.map(e=>`<option value="${k(e.id)}" ${i===e.id?`selected`:``}>${k(e.code)} - ${k(O(e.nameAr,e.nameEn))}</option>`).join(``)}
          </select>
        </div>
      </div>

      <div class="view-toolbar-end">
        <span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">
          ${d.length} ${O(`مخرجات`,`deliverables`)}
        </span>
      </div>
    </div>

    <!-- Documents Table -->
    <div class="panel">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${O(`المخطط / المخرج الهندسي`,`Drawing / Deliverable`)}</th>
              <th>${D(`projects`)}</th>
              <th>${D(`tasks`)}</th>
              <th>${O(`الإصدار`,`Revision`)}</th>
              <th>${O(`الحالة الهندسية`,`Status`)}</th>
              <th>${O(`الحجم`,`Size`)}</th>
              <th>${O(`تاريخ الرفع`,`Upload Date`)}</th>
              <th style="text-align:end;">${O(`الإجراءات`,`Actions`)}</th>
            </tr>
          </thead>
          <tbody>
            ${d.length>0?d.map(e=>{let r=t.find(t=>t.id===e.projectId),i=n.find(t=>t.id===e.taskId),s=_e(e.originalName,e.mimeType),l=ve(e.originalName),u=e.size>1048576?(e.size/1048576).toFixed(1)+` MB`:Math.round((e.size||0)/1024)+` KB`,d=o||F(`delete_documents`)||e.uploaderId===a;return`
                <tr data-doc-id="${k(e.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${k(e.id)}">
                      <span class="file-format-badge" style="background:${s.bg};color:${s.color};border:1px solid ${s.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${s.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${k(e.originalName)}">
                          ${k(e.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${s.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${r?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${k(r.id)}">${k(r.code)}</span>`:`—`}
                  </td>
                  <td>
                    ${i?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${k(i.id)}">${k(O(i.titleAr,i.titleEn))}</span>`:`<span style="color:var(--muted);font-size:11px;">مخطط عام</span>`}
                  </td>
                  <td>
                    ${l?`
                      <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                        ${l}
                      </span>
                    `:`<span style="font-size:11px;color:var(--muted);">V1</span>`}
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${c?`
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${k(e.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${e.status===`draft`?`selected`:``}>📝 ${O(`مسودة عمل`,`Draft`)}</option>
                          <option value="review" ${e.status===`review`?`selected`:``}>🔍 ${O(`قيد المراجعة`,`Review`)}</option>
                          <option value="approved" ${e.status===`approved`?`selected`:``}>✅ ${O(`معتمد للتنفيذ`,`Approved`)}</option>
                          <option value="superseded" ${e.status===`superseded`?`selected`:``}>⏳ ${O(`مستبدل بنسخة أحدث`,`Superseded`)}</option>
                        </select>
                      `:`
                        <span class="status-badge ${k(e.status||`draft`)}" style="font-size:11px;">
                          ${k(N(e.status||`draft`))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${u}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${be(e.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${k(e.id)}" style="padding:5px;" title="${O(`معاينة`,`Preview`)}">
                        ${j(`eye`,14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${k(e.id)}" style="padding:5px;color:var(--teal);" title="${O(`نسخ الرابط`,`Copy Link`)}">
                        ${j(`link`,14)}
                      </button>
                      <a href="/api/documents/${k(e.id)}" target="_blank" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${O(`تحميل`,`Download`)}">
                        ${j(`download`,14)}
                      </a>
                      ${d?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${k(e.id)}" style="padding:5px;color:var(--red);" title="${O(`نقل لسلة المهملات`,`Move to trash`)}">
                          ${j(`trash`,14)}
                        </button>
                      `:``}
                    </div>
                  </td>
                </tr>
              `}).join(``):`
              <tr>
                <td colspan="8">
                  <div class="empty" style="padding:40px 20px;">
                    ${j(`document`,24)}
                    <span>${O(`لا توجد ملفات أو مخططات مطابقة للبحث أو الفلترة المحددة.`,`No drawings or documents found matching the criteria.`)}</span>
                  </div>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function tn(e=null){let t=s.data?.projects||[],n=e||t[0]?.id||``,r=s.data?.tasks?.filter(e=>e.projectId===n&&!e.deletedAt)||[],i=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${O(`المشروع المستهدف *`,`Target Project *`)}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${t.map(e=>`<option value="${k(e.id)}" ${e.id===n?`selected`:``}>${k(e.code)} - ${k(O(e.nameAr,e.nameEn))}</option>`).join(``)}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${O(`المهمة الهندسية (اختياري)`,`Engineering Task (Optional)`)}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${O(`— مخطط عام لكامل المشروع —`,`— General Project Drawing —`)}</option>
            ${r.map(e=>`<option value="${k(e.id)}">${k(O(e.titleAr,e.titleEn))}</option>`).join(``)}
          </select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${O(`التخصص الهندسي`,`Engineering Discipline`)}</label>
          <select id="drawing-upload-discipline" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="معماري">🏛️ ${O(`معماري (Architectural)`,`Architectural`)}</option>
            <option value="إنشائي">🏗️ ${O(`إنشائي (Structural)`,`Structural`)}</option>
            <option value="كهرباء">⚡ ${O(`كهرباء (Electrical)`,`Electrical`)}</option>
            <option value="ميكانيك وتكييف">🌡️ ${O(`ميكانيك وتكييف (HVAC)`,`HVAC`)}</option>
            <option value="سباكة وصحي">💧 ${O(`سباكة وصحي (Plumbing)`,`Plumbing`)}</option>
            <option value="مخرجات ثلاثية الأبعاد">📐 ${O(`3D / BIM (Revit/SketchUp)`,`3D / BIM`)}</option>
            <option value="عام">📁 ${O(`مستندات عامة ومواصفات`,`General Specs`)}</option>
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${O(`الحالة الهندسية المبدئية`,`Initial Approval Status`)}</label>
          <select id="drawing-upload-status" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="draft">📝 ${O(`مسودة عمل (Draft)`,`Draft`)}</option>
            <option value="review" selected>🔍 ${O(`قيد المراجعة الفنية (Under Review)`,`Under Review`)}</option>
            <option value="approved">✅ ${O(`معتمد للتنفيذ (Approved for Construction)`,`Approved for Construction`)}</option>
          </select>
        </div>
      </div>

      <!-- File Upload Dropzone -->
      <div class="field">
        <label style="font-size:12px;font-weight:700;">${O(`الملفات والمخططات *`,`Drawings & Files *`)}</label>
        <div id="drawing-dropzone" style="border:2px dashed var(--line);border-radius:12px;padding:24px 16px;text-align:center;background:var(--surface);cursor:pointer;transition:border-color 0.2s;">
          <div style="color:var(--teal);margin-bottom:8px;">${j(`upload`,28)}</div>
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:var(--ink);">${O(`اسحب وأفلت المخططات هنا أو انقر للاختيار`,`Drag & drop drawings here or click to browse`)}</p>
          <p style="margin:0;font-size:11px;color:var(--muted);">${O(`يدعم ملفات هندسية عملاقة: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (حتى 100GB برفع مستأنف فائق السرعة)`,`Supports massive engineering files: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (Up to 100GB with resumable chunks)`)}</p>
          <input type="file" multiple id="drawing-file-input" style="display:none;" />
        </div>
        <div id="drawing-selected-files-list" style="margin-top:10px;display:grid;gap:6px;"></div>
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;">
        <button type="button" class="btn btn-secondary btn-sm" data-action="close-modal">${O(`إلغاء`,`Cancel`)}</button>
        <button type="submit" class="btn btn-primary btn-sm" id="start-drawing-upload-btn" style="font-weight:700;" disabled>
          ${j(`upload`,14)} <span>${O(`بدء الرفع المباشر`,`Start Resumable Upload`)}</span>
        </button>
      </div>
    </form>
  `,a=document.getElementById(`modal-root`);if(a){a.innerHTML=T(O(`رفع مخطط أو مخرج هندسي جديد`,`Upload Architectural Deliverable / Drawing`),O(`رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.`,`Upload CAD, BIM, and PDF files with revision numbering and discipline tagging.`),i,`upload-drawing`,`modal-lg`);let e=document.getElementById(`drawing-upload-project`),t=document.getElementById(`drawing-upload-task`);e&&t&&e.addEventListener(`change`,()=>{let n=e.value,r=s.data?.tasks?.filter(e=>e.projectId===n&&!e.deletedAt)||[];t.innerHTML=`<option value="">${O(`— مخطط عام لكامل المشروع —`,`— General Project Drawing —`)}</option>`+r.map(e=>`<option value="${k(e.id)}">${k(O(e.titleAr,e.titleEn))}</option>`).join(``)});let n=document.getElementById(`drawing-dropzone`),r=document.getElementById(`drawing-file-input`),o=document.getElementById(`drawing-selected-files-list`),c=document.getElementById(`start-drawing-upload-btn`),l=[],u=()=>{l.length?(c.disabled=!1,o.innerHTML=l.map((e,t)=>{let n=_e(e.name,e.type),r=e.size>1048576?(e.size/1048576).toFixed(1)+` MB`:Math.round(e.size/1024)+` KB`;return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${n.bg};color:${n.color};border:1px solid ${n.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${n.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${k(e.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${r})</span>
            </div>
            <button type="button" data-file-remove="${t}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(``),o.querySelectorAll(`[data-file-remove]`).forEach(e=>{e.addEventListener(`click`,t=>{let n=parseInt(e.dataset.fileRemove);l.splice(n,1),u()})})):(o.innerHTML=``,c.disabled=!0)};n&&r&&(n.addEventListener(`click`,()=>r.click()),r.addEventListener(`change`,()=>{r.files?.length&&(l=Array.from(r.files),u())}),n.addEventListener(`dragover`,e=>{e.preventDefault(),n.style.borderColor=`var(--teal)`}),n.addEventListener(`dragleave`,()=>{n.style.borderColor=`var(--line)`}),n.addEventListener(`drop`,e=>{e.preventDefault(),n.style.borderColor=`var(--line)`,e.dataTransfer?.files?.length&&(l=Array.from(e.dataTransfer.files),u())}));let d=document.getElementById(`upload-drawing-form`);d&&d.addEventListener(`submit`,async n=>{if(n.preventDefault(),!l.length)return;let r=e.value,i=t.value||null,a=document.getElementById(`drawing-upload-discipline`)?.value||`عام`,o=document.getElementById(`drawing-upload-status`)?.value||`draft`;w(),typeof window.uploadDirectFiles==`function`&&window.uploadDirectFiles({files:l,projectId:r,taskId:i,discipline:a,status:o})})}}var nn=t({FULL_PERMISSIONS_CATALOG:()=>pn,exportAuditLogsXLS:()=>ln,fetchFullAuditHistory:()=>dn,openRoleModal:()=>mn,openUserModal:()=>hn,printAuditReport:()=>un,renderAuditForProject:()=>an,renderSettings:()=>fn,renderTeam:()=>rn,renderUserActivityCell:()=>on});function rn(){if(!I()&&!F(`manage_users`))return`<section class="panel"><div class="empty">${j(`alert`,18)}<span>${O(`غير مصرح لك بعرض هذه الصفحة.`,`You are not authorized to view this page.`)}</span></div></section>`;let e=s.data?.user?.id,t=(s.data?.users||[]).filter(e=>e.status!==`inactive`);return t=e===`usr_ahmad`?[...t].sort((e,t)=>e.id===`usr_ahmad`?-1:+(t.id===`usr_ahmad`)):t.filter(e=>e.id!==`usr_ahmad`),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${O(`الأشخاص والمسؤوليات`,`PEOPLE & OWNERSHIP`)}</p>
        <h1>${D(`team`)}</h1>
        <p>${O(`كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.`,`Every member has a clear role, responsibility, and next action.`)}</p>
      </div>
      <div class="page-actions">
        ${I()||F(`manage_users`)?`<button class="btn btn-primary" data-action="new-user">${j(`plus`,15)} ${D(`addMember`)}</button>`:``}
      </div>
    </div>
    <div class="team-grid">
      ${t.map(e=>{let t=teamMetrics(e.id,s.data?.tasks||[]),n=e.id===`usr_ahmad`;return`
          <article class="member-card ${n?`system-developer-card`:``}" style="${n?`border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);`:``}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${M(e,`avatar-lg`)}
                <div class="member-card-person-copy">
                  <strong>${k(O(e.name,e.nameEn||e.name))}</strong>
                  <span>${k(O(e.jobTitleAr||(n?`المبرمج / مدير النظام`:``),e.jobTitleEn||e.jobTitleAr||``))}</span>
                </div>
              </div>
              ${n?`<span class="stealth-dev-badge">${j(`shield`,12)} ${O(`مدير ومطور النظام`,`Super Admin & Dev`)}</span>`:canManageAccountPermissions()&&e.id!==s.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${k(e.id)}">${j(`more`,15)}</button>`:``}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${e.status===`active`?`done`:`not_started`}">${k(P(e))}</span>
            </div>
            <div class="member-card-stats">
              <span>${D(`progress`)} <strong>${t.progress}%</strong></span>
              <span>${t.tasks} ${D(`tasks`)}</span>
            </div>
            <div class="member-email">${e.email?k(e.email):D(`noEmail`)}</div>
          </article>
        `}).join(``)}
    </div>
  `}function an(e){let t=(s.data?.auditLogs||[]).filter(t=>t.details?.projectId===e||t.entityType===`project`&&t.entityId===e);return t.length?`<div class="audit-list">${t.map(e=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${k(e.user?O(e.user.name,e.user.nameEn||e.user.name):`DARC`)} · ${k(e.action)}</strong><span>${k(e.entityType)} · ${dateLabel(e.createdAt,!0)}</span></div></div>`).join(``)}</div>`:`<div class="empty">${j(`check`,18)}<span>${O(`لا توجد تغييرات مسجلة بعد.`,`No changes recorded yet.`)}</span></div>`}function on(e){let t=e.lastActiveAt||e.customFields?.lastActiveAt,n=e.lastLoginAt||e.customFields?.lastLoginAt;if(!t&&!n)return`<span class="activity-never">${O(`لم يسجل دخول بعد`,`Never logged in`)}</span>`;let r=Date.now(),i=t?new Date(t).getTime():0,a=e.id===s.data?.user?.id?0:i&&!isNaN(i)?Math.floor((r-i)/6e4):999999,o=a>=0&&a<=5,c=``;if(o)c=`<span class="activity-pill online"><span class="activity-dot online"></span> ${O(`نشط الآن`,`Online`)}</span>`;else if(a<60)c=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${O(`منذ ${a} دقيقة`,`${a}m ago`)}</span>`;else if(a<1440){let e=Math.floor(a/60);c=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${O(`منذ ${e} ساعة`,`${e}h ago`)}</span>`}else i>0&&(c=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(t,!1)}</span>`);let l=n?`<span class="activity-sub" title="${k(n)}">${O(`دخول:`,`Login:`)} ${dateLabel(n,!0)}</span>`:``;return`<div class="activity-wrapper">${c}${l}</div>`}function sn(e){if(!e)return{date:`—`,time:`—`};try{let t=new Date(e);return isNaN(t.getTime())?{date:e,time:``}:{date:new Intl.DateTimeFormat(s.lang===`ar`?`ar-SA`:`en-US`,{year:`numeric`,month:`short`,day:`numeric`}).format(t),time:new Intl.DateTimeFormat(s.lang===`ar`?`ar-SA`:`en-US`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!0}).format(t)}}catch{return{date:e,time:``}}}function cn(e){let t=e.action||``,n=e.entityType||e.entity_type||``,r=e.details||{},i=`badge-neutral`,a=t,o=n;t===`login`?(i=`badge-teal`,a=O(`تسجيل دخول`,`Sign In`),o=O(`جلسة نظام`,`System Session`)):t===`create`?(i=`badge-mint`,a=O(`إنشاء جديد`,`Created`)):t===`update`?(i=`badge-blue`,a=O(`تعديل بيانات`,`Updated`)):t===`delete`?(i=`badge-red`,a=O(`نقل للمهملات`,`Moved to Trash`)):t===`status_change`?(i=`badge-amber`,a=O(`تغيير حالة`,`Status Changed`)):t===`export_report`?(i=`badge-teal`,a=O(`تصدير تقرير`,`Exported Report`)):t===`restore`?(i=`badge-mint`,a=O(`استعادة`,`Restored`)):t===`purge`?(i=`badge-danger`,a=O(`حذف نهائي`,`Purged`)):t===`invite`&&(i=`badge-blue`,a=O(`دعوة مستخدم`,`Invite Sent`)),n===`task`?o=O(`مهمة`,`Task`):n===`project`?o=O(`مشروع`,`Project`):n===`document`?o=O(`مستند`,`Document`):n===`user`?o=O(`مستخدم`,`User`):n===`report`?o=O(`تقرير`,`Report`):n===`role`&&(o=O(`دور وصلاحيات`,`Role`));let s=`—`;return r.title||r.name?s=`<strong>${k(r.title||r.name)}</strong>`:t===`status_change`&&(r.oldStatus||r.newStatus)?s=`<span>${k(N(r.oldStatus))} ➔ <strong>${k(N(r.newStatus))}</strong></span>`:e.entityId&&(s=`<code style="font-size:11px;color:var(--muted);">${k(e.entityId)}</code>`),{badgeClass:i,actionLabel:a,entityLabel:o,detailHtml:s}}function ln(e=null){let t=e||s._lastFilteredAuditLogs||s.data?.auditLogs||[];if(!t.length){E(O(`لا توجد عمليات لتصديرها.`,`No logs to export.`),!0);return}let n=s.data?.company||{},r=O(n.nameAr||n.name,n.nameEn||n.name)||`DARC Design Team`,i=n.logoUrl||``;i.startsWith(`/`)&&typeof window<`u`&&window.location?.origin&&(i=`${window.location.origin}${i}`);let a=s.data?.user||{},o=O(a.name,a.nameEn||a.name)||`Admin`,c=new Date().toLocaleDateString(s.lang===`ar`?`ar-SA`:`en-US`,{dateStyle:`full`}),l=new Date().toLocaleTimeString(s.lang===`ar`?`ar-SA`:`en-US`,{timeStyle:`medium`}),u=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${i?`<img src="${k(i)}" height="38" style="vertical-align:middle;margin-inline-end:10px;" />`:``}
          <span style="vertical-align:middle;">${O(`سجل الرقابة والتدقيق الأمني والعمليات — `+r,`Audit & Security Trail Report — `+r)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${O(`المؤسسة:`,`Company:`)} ${k(r)} | ${O(`المشرف المستخرج:`,`Exported by:`)} ${k(o)} | ${O(`تاريخ التصدير:`,`Export Date:`)} ${k(c)} ${k(l)}
        </th>
      </tr>
      <tr>
        <th colspan="7" style="background:#f8fafc;color:#64748b;font-size:11px;text-align:center;padding:6px;">
          ${O(`إجمالي العمليات المضمنة في التقرير:`,`Total Events in Report:`)} ${t.length} ${O(`عملية`,`events`)}
        </th>
      </tr>
      <tr style="height:10px;"><td colspan="7" style="border:none;"></td></tr>
      <tr class="header" style="background:#134e4a;color:#ffffff;font-weight:bold;font-size:12px;text-align:center;">
        <th style="padding:8px;border:1px solid #cbd5e1;">${O(`المعرف`,`ID`)}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${O(`التاريخ والوقت`,`Date & Time`)}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${O(`المنفذ / المستخدم`,`Actor`)}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${O(`الدور الوظيفي`,`Role`)}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${O(`نوع النشاط`,`Action`)}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${O(`نوع العنصر`,`Entity`)}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${O(`التفاصيل والتغييرات`,`Details / Context`)}</th>
      </tr>
  `;t.forEach((e,t)=>{let n=e.user||(e.userId?(s.data?.users||[]).find(t=>t.id===e.userId):null),r=n?O(n.name,n.nameEn||n.name):O(`النظام`,`System`),i=n?P(n):`—`,a=sn(e.createdAt),{actionLabel:o,entityLabel:c}=cn(e),l=``;l=e.details?.title||e.details?.name?e.details.title||e.details.name:e.action===`status_change`?`${N(e.details?.oldStatus)} ➔ ${N(e.details?.newStatus)}`:typeof e.details==`object`?JSON.stringify(e.details):String(e.details||e.entityId||`—`);let d=t%2==0?`#ffffff`:`#f8fafc`;u+=`
      <tr style="background:${d};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${k(A(e.id||`—`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${k(A(`${a.date} ${a.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${k(A(r))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${k(A(i))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${k(A(o))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${k(A(c))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${k(A(l))}</td>
      </tr>
    `}),u+=`</table>`;let d=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <style>
        table { border-collapse: collapse; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
        th, td { border: 1px solid #cbd5e1; }
      </style>
    </head>
    <body dir="${s.lang===`ar`?`rtl`:`ltr`}">
      ${u}
    </body>
    </html>
  `,f=new Blob([`﻿`+d],{type:`application/vnd.ms-excel;charset=utf-8;`}),p=URL.createObjectURL(f),m=document.createElement(`a`);m.href=p;let h=new Date().toISOString().split(`T`)[0];m.download=`DARC_Audit_Trail_${h}.xls`,document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(p),E(O(`تم تصدير ملف سجل التدقيق بنجاح.`,`Audit trail exported successfully.`)),L(`/api/audit`,{method:`POST`,body:JSON.stringify({action:`export_report`,entityType:`report`,entityId:`rep_audit_${h}`,details:{reportType:`Audit_Logs_Excel`,count:t.length}})}).catch(()=>{})}function un(e=null){let t=e||s._lastFilteredAuditLogs||s.data?.auditLogs||[];if(!t.length){E(O(`لا توجد عمليات لطباعتها.`,`No logs to print.`),!0);return}let n=s.data?.company||{},r=O(n.nameAr||n.name,n.nameEn||n.name)||`DARC Design Team`,i=n.logoUrl||``;i.startsWith(`/`)&&typeof window<`u`&&window.location?.origin&&(i=`${window.location.origin}${i}`);let a=s.data?.user||{},o=O(a.name,a.nameEn||a.name)||`Admin`,c=new Date().toLocaleDateString(s.lang===`ar`?`ar-SA`:`en-US`,{dateStyle:`full`}),l=new Date().toLocaleTimeString(s.lang===`ar`?`ar-SA`:`en-US`,{timeStyle:`medium`}),u=t.length,d=t.filter(e=>e.action===`create`).length,f=t.filter(e=>e.action===`update`||e.action===`status_change`).length,p=t.filter(e=>e.action===`delete`||e.action===`purge`||e.action===`trash`).length,m=``;t.forEach((e,t)=>{let n=e.user||(e.userId?(s.data?.users||[]).find(t=>t.id===e.userId):null),r=n?O(n.name,n.nameEn||n.name):O(`النظام`,`System`),i=n?P(n):`—`,a=sn(e.createdAt),{actionLabel:o,entityLabel:c}=cn(e),l=``;l=e.details?.title||e.details?.name?e.details.title||e.details.name:e.action===`status_change`?`${N(e.details?.oldStatus)} ➔ ${N(e.details?.newStatus)}`:typeof e.details==`object`?JSON.stringify(e.details):String(e.details||e.entityId||`—`),m+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${k(e.id||String(t+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${k(a.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${k(a.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${k(r)}</div>
          <div style="font-size:10px;color:#64748b;">${k(i)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${k(o)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${k(c)}</td>
        <td style="font-size:11px;color:#334155;">${k(l)}</td>
      </tr>
    `});let h=window.open(``,`_blank`,`width=1100,height=850`);if(!h){E(O(`يرجى السماح بالنوافذ المنبثقة للطباعة.`,`Please allow popups to print report.`),!0);return}let g=`
    <!DOCTYPE html>
    <html lang="${s.lang}" dir="${s.lang===`ar`?`rtl`:`ltr`}">
    <head>
      <meta charset="utf-8" />
      <title>DARC Audit & Security Report - ${new Date().toISOString().split(`T`)[0]}</title>
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
          text-align: ${s.lang===`ar`?`left`:`right`};
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
          text-align: ${s.lang===`ar`?`right`:`left`};
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
          <strong>${O(`معاينة التقرير الرقابي الرسمي جاهزة للطباعة / التصدير PDF`,`Official Executive Audit Report Ready for Print / Save as PDF`)}</strong>
          <span style="display:block;font-size:11px;color:#64748b;">${O(`يمكنك الضغط على زر الطباعة أدناه واختيار "Save as PDF" لتخزين الملف كـ PDF رسمي.`,`Click the button below and choose "Save as PDF" in your browser.`)}</span>
        </div>
        <button class="btn-print" onclick="window.print()">${O(`طباعة / حفظ كـ PDF`,`Print / Save as PDF`)}</button>
      </div>

      <header class="report-header">
        <div>
          ${i?`<img src="${k(i)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />`:``}
          <h1 class="brand-title">${k(r)}</h1>
          <div class="report-subtitle">${O(`تقرير الرقابة والتدقيق الأمني وسجل العمليات الإدارية`,`Official Security Audit & Governance Operations Trail`)}</div>
        </div>
        <div class="report-meta-box">
          <div><strong>${O(`المشرف المستخرج:`,`Generated By:`)}</strong> ${k(o)}</div>
          <div><strong>${O(`تاريخ التقرير:`,`Report Date:`)}</strong> ${k(c)} - ${k(l)}</div>
          <div><strong>${O(`حالة النظام:`,`System Status:`)}</strong> Active / Enforced</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${u}</div>
          <div class="kpi-label">${O(`إجمالي العمليات`,`Total Events`)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#059669;">${d}</div>
          <div class="kpi-label">${O(`عمليات إنشاء`,`Create Operations`)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#2563eb;">${f}</div>
          <div class="kpi-label">${O(`عمليات تعديل وحالة`,`Updates & State Changes`)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#dc2626;">${p}</div>
          <div class="kpi-label">${O(`عمليات حذف وحركة سلة`,`Deletions & Trash Moves`)}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width:50px;">#</th>
            <th style="width:130px;">${O(`التاريخ والوقت`,`Timestamp`)}</th>
            <th style="width:160px;">${O(`المستخدم / المنفذ`,`Actor`)}</th>
            <th style="width:90px;">${O(`نوع النشاط`,`Action`)}</th>
            <th style="width:90px;">${O(`نوع العنصر`,`Entity`)}</th>
            <th>${O(`التفاصيل والتغييرات`,`Details & Context`)}</th>
          </tr>
        </thead>
        <tbody>
          ${m}
        </tbody>
      </table>

      <footer class="signature-section">
        <div class="signature-box">
          <strong>${O(`إعداد وتصدير التقرير`,`Prepared By`)}</strong><br /><br />
          <span>${k(o)}</span>
        </div>
        <div class="signature-box">
          <strong>${O(`مسؤول الجودة والامتثال الأمني`,`Security & Compliance Lead`)}</strong><br /><br />
          <span>..............................................</span>
        </div>
        <div class="signature-box">
          <strong>${O(`الاعتماد الإداري العام`,`General Management Approval`)}</strong><br /><br />
          <span>..............................................</span>
        </div>
      </footer>
    </body>
    </html>
  `;h.document.open(),h.document.write(g),h.document.close(),L(`/api/audit`,{method:`POST`,body:JSON.stringify({action:`export_report`,entityType:`report`,entityId:`rep_audit_print_${Date.now()}`,details:{reportType:`Audit_Logs_Print_PDF`,count:t.length}})}).catch(()=>{})}async function dn(){try{E(O(`جاري تحميل سجل التدقيق التاريخي الكامل...`,`Loading complete audit history...`));let e=await L(`/api/audit?limit=1000`);e&&e.logs&&(s.data.auditLogs=e.logs,s.auditFullHistoryLoaded=!0,renderView(),E(O(`تم جلب ${e.logs.length} عملية بنجاح.`,`Loaded ${e.logs.length} audit logs.`)))}catch(e){E(e.message||O(`فشل جلب السجل التاريخي.`,`Failed to fetch audit history.`),!0)}}function fn(){let e=s.data?.user?.id,t=I(),n=t||F(`manage_users`)||F(`view_user_activity`),r=[[`profile`,O(`الملف الشخصي`,`Profile`)],...t||F(`manage_settings`)?[[`company`,D(`company`)]]:[],...t||F(`manage_roles`)?[[`roles`,D(`roles`)]]:[],...n?[[`accounts`,D(`accounts`)]]:[],[`security`,O(`الأمان`,`Security`)],[`trash`,O(`سلة المهملات`,`Trash`)],...t||F(`view_audit_logs`)?[[`audit`,D(`audit`)]]:[]];r.some(([e])=>e===s.settingsSection)||(s.settingsSection=`profile`);let i=s.data?.user||{},a=``;if(s.settingsSection===`profile`&&(a=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${O(`الملف الشخصي`,`Profile`)}</h2>
            <p>${O(`إدارة صورتك الشخصية وبيانات حسابك في النظام.`,`Manage your profile picture and account information.`)}</p>
          </div>
        </div>

        <div class="profile-avatar-card">
          <label for="user-avatar-file-input" class="avatar-upload-trigger" id="profile-avatar-preview" role="button" tabindex="0" title="${O(`انقر لرفع صورة شخصية جديدة`,`Click to upload a new profile picture`)}">
            <div class="avatar-upload-circle">
              ${i.avatarUrl?`<img src="${k(i.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(i.avatarColor||``)?i.avatarColor:`#0d6269`};">${k(me(i))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(i.avatarColor||``)?i.avatarColor:`#0d6269`};">${k(me(i))}</div>`}
              <div class="avatar-upload-overlay">
                ${j(`upload`,18)}
                <span>${O(`تغيير`,`Change`)}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${k(O(i.name,i.nameEn||i.name))}</h3>
            <p class="profile-user-role">${k(O(i.jobTitleAr||``,i.jobTitleEn||i.jobTitleAr||``))} · <span class="status-badge done">${k(P(i))}</span></p>
            <div class="profile-upload-actions">
              <input type="file" id="user-avatar-file-input" accept="image/jpeg,image/png,image/webp" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="user-avatar-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${j(`upload`,14)} ${O(`رفع صورة جديدة`,`Upload new avatar`)}
              </label>
              <span class="upload-hint">${O(`يدعم JPG, PNG, WebP (حد أقصى 2MB)`,`Supports JPG, PNG, WebP (Max 2MB)`)}</span>
            </div>
          </div>
        </div>

        <form data-action="update-profile">
          <div class="form-grid">
            <div class="field">
              <label>${D(`nameAr`)}</label>
              <input name="name" value="${k(i.name||``)}" required />
            </div>
            <div class="field">
              <label>${D(`nameEn`)}</label>
              <input name="nameEn" value="${k(i.nameEn||``)}" />
            </div>
            <div class="field">
              <label>${D(`jobTitle`)} (${O(`عربي`,`AR`)})</label>
              <input name="jobTitleAr" value="${k(i.jobTitleAr||``)}" />
            </div>
            <div class="field">
              <label>${D(`jobTitle`)} (${O(`إنجليزي`,`EN`)})</label>
              <input name="jobTitleEn" value="${k(i.jobTitleEn||``)}" />
            </div>
            <div class="field full">
              <label>${D(`email`)}</label>
              <input value="${k(i.email||``)}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${O(`نظام التقويم المفضل في المنصة`,`Preferred Calendar System`)}</label>
              <select name="calendarSystem" class="input">
                <option value="gregorian" ${ye()===`gregorian`?`selected`:``}>${O(`ميلادي — اليوم / الشهر / السنة (مثال: 07/09/2026)`,`Gregorian — Day / Month / Year (e.g. 07/09/2026)`)}</option>
                <option value="hijri" ${ye()===`hijri`?`selected`:``}>${O(`هجري أم القرى — اليوم / الشهر / السنة (مثال: 25/02/1448 هـ)`,`Hijri Umm al-Qura — Day / Month / Year (e.g. 25/02/1448 AH)`)}</option>
              </select>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${D(`save`)}</button>
          </div>
        </form>
      </section>
    `),s.settingsSection===`company`&&(t||F(`manage_settings`))){let e=s.data?.company||{};a=`
      <section class="setting-section">
        <h2>${D(`company`)}</h2>
        <p>${O(`هوية مساحة العمل وشعار الشركة واللغة الافتراضية.`,`Workspace identity, company logo, and default language.`)}</p>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${O(`انقر لرفع وتعديل شعار الشركة`,`Click to upload and change company logo`)}">
            <div class="logo-upload-box">
              ${e.logoUrl?`<img src="${k(e.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${j(`building`,24)}</span>`:`<span class="brand-mark">${j(`building`,24)}</span>`}
              <div class="logo-upload-overlay">
                ${j(`upload`,16)}
                <span>${O(`تعديل`,`Edit`)}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${k(e.name||`DARC Design Team`)}</strong>
            <span class="company-sub">${O(`العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض`,`Arabic default · English support · Riyadh timezone`)}</span>
            <div class="company-upload-actions">
              <input type="file" id="company-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="company-logo-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${j(`upload`,14)} ${O(`رفع وتعديل الشعار`,`Upload & Change Logo`)}
              </label>
              <span class="upload-hint">${O(`يدعم PNG, SVG, JPG (حد أقصى 2MB)`,`Supports PNG, SVG, JPG (Max 2MB)`)}</span>
            </div>
          </div>
        </div>

        <form data-action="update-company">
          <div class="form-grid">
            <div class="field">
              <label>${D(`nameAr`)}</label>
              <input name="nameAr" value="${k(e.nameAr||``)}" required />
            </div>
            <div class="field">
              <label>${D(`nameEn`)}</label>
              <input name="nameEn" value="${k(e.nameEn||``)}" />
            </div>
            <div class="field full">
              <label>${D(`emailStatus`)}</label>
              <input value="${k(s.data?.emailConfigured?D(`emailConfigured`):D(`emailNotConfigured`))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:15px;">
            <button type="submit" class="btn btn-primary">${D(`save`)}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:12px;">${j(`info`,16)}<span>${D(`emailInfo`)}</span></div>
      </section>
      <section class="setting-section">
        <h2>${O(`نموذج الإنجاز`,`Progress model`)}</h2>
        <p>${D(`weightedExplanation`)}</p>
        <div class="report-stat-list">
          <div class="report-stat"><span>${D(`weightedProgress`)}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${D(`simpleProgress`)}</span><strong style="color:var(--ink-soft)">—</strong></div>
        </div>
      </section>
    `}if(s.settingsSection===`security`&&(a=`
      <section class="setting-section">
        <h2>${O(`الأمان`,`Security`)}</h2>
        <p>${O(`تغيير كلمة المرور أو تسجيل الخروج من كافة الأجهزة.`,`Change your password or sign out from all devices.`)}</p>
        <form data-action="change-password">
          <div class="form-grid" style="margin-top:18px">
            <div class="field"><label>${O(`كلمة المرور الحالية`,`Current password`)}</label><input type="password" name="oldPassword" required /></div>
            <div class="field"><label>${O(`كلمة المرور الجديدة`,`New password`)}</label><input type="password" name="newPassword" minlength="10" required /></div>
          </div>
          <div class="form-actions" style="margin-top:15px"><button type="submit" class="btn btn-primary">${D(`save`)}</button></div>
        </form>
        <hr style="margin:30px 0;border:0;border-top:1px solid var(--border)">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <h3 style="font-size:14px;margin-bottom:4px">${O(`تسجيل الخروج من كل الأجهزة`,`Sign out of all devices`)}</h3>
            <p style="color:var(--muted);font-size:13px">${O(`إنهاء كافة الجلسات النشطة على كل المتصفحات.`,`End all active sessions on all browsers.`)}</p>
          </div>
          <button class="btn btn-danger btn-sm" data-action="logout-all">${O(`تسجيل خروج للكل`,`Sign out all`)}</button>
        </div>
      </section>
    `),s.settingsSection===`accounts`&&n){let t=I()||F(`view_user_activity`),n=I()||F(`manage_users`),r=I()||F(`manage_existing_account_permissions`)||F(`manage_users`),i=I(),o=s.data?.users||[];e!==`usr_ahmad`&&(o=o.filter(e=>e.id!==`usr_ahmad`)),a=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${D(`accounts`)}</h2>
            <p>${O(`الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.`,`Current accounts and each member’s access. Add, edit, or deactivate them here.`)}</p>
          </div>
          ${n?`<button class="btn btn-primary btn-sm" data-action="new-user">${j(`plus`,14)} ${D(`addMember`)}</button>`:``}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${D(`team`)}</th>
                <th>${D(`role`)}</th>
                <th>${D(`email`)}</th>
                <th>${D(`accountStatus`)}</th>
                ${t?`<th>${O(`آخر ظهور ونشاط`,`Last Seen & Activity`)}</th>`:``}
                ${r?`<th></th>`:``}
              </tr>
            </thead>
            <tbody>
              ${o.map(e=>{let n=e.id===`usr_ahmad`;return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${M(e)}
                        <div class="team-member-copy">
                          <strong>${k(O(e.name,e.nameEn||e.name))}</strong>
                          <span>${k(O(e.jobTitleAr||(n?`المبرمج / مدير النظام`:``),e.jobTitleEn||e.jobTitleAr||``))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${n?`<span class="stealth-dev-badge">${j(`shield`,12)} ${O(`مدير ومطور النظام`,`Super Admin & Dev`)}</span>`:k(P(e))}
                    </td>
                    <td>${e.email?k(e.email):`<span style="color:var(--muted)">${D(`noEmail`)}</span>`}</td>
                    <td>
                      <span class="status-badge ${e.status===`active`?`done`:`not_started`}">${e.status===`active`?D(`activeAccount`):D(`pendingAccount`)}</span>
                    </td>
                    ${t?`
                      <td>
                        ${on(e)}
                      </td>
                    `:``}
                    ${r?`
                      <td>
                        <div class="role-actions">
                          ${n?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${k(e.id)}">${D(`edit`)}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${k(e.id)}">${D(`edit`)}</button>
                            ${e.id===s.data?.user?.id?``:`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${k(e.id)}" title="${e.status===`pending`?O(`تفعيل الحساب يدوياً`,`Activate manually`):O(`تغيير كلمة المرور`,`Change password`)}">${j(e.status===`pending`?`check`:`settings`,13)}</button>
                              ${i?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${k(e.id)}" title="دخول كـ هذا الحساب">${j(`user`,13)}</button>`:``}
                            `}
                            ${e.id!==s.data?.user?.id&&e.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${k(e.id)}">${j(`send`,13)}</button>`:``}
                            ${e.id===s.data?.user?.id?``:`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${k(e.id)}">${j(`trash`,13)}</button>`}
                          `}
                        </div>
                      </td>
                    `:``}
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      </section>
    `}if(s.settingsSection===`roles`&&(t||F(`manage_roles`))&&(a=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${D(`roles`)}</h2>
            <p>${O(`إدارة الأدوار وصلاحيات الوصول للنظام.`,`Manage roles and access permissions across the system.`)}</p>
          </div>
          ${t||F(`manage_roles`)?`<button class="btn btn-primary btn-sm" data-action="new-role">${j(`plus`,14)} ${D(`addRole`)}</button>`:``}
        </div>
        <div class="role-list">
          ${(s.data?.roles||[]).map(e=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${k(O(e.nameAr,e.nameEn))}</strong>
                  ${e.builtIn?`<span class="role-system-badge">${j(`shield`,11)} ${D(`builtIn`)}</span>`:``}
                </div>
                <p class="role-desc">${k(O(e.descriptionAr,e.descriptionEn))}</p>
                <div class="role-meta">${e.permissions.includes(`*`)?O(`صلاحية كاملة`,`Full access`):`${e.permissions.length} ${D(`permissionCount`)}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${k(e.id)}">${j(`edit`,13)} ${D(`edit`)}</button>
                ${e.builtIn?``:`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${k(e.id)}">${j(`trash`,13)}</button>`}
              </div>
            </div>
          `).join(``)}
        </div>
      </section>
    `),s.settingsSection===`trash`){!s.trashLoaded&&!s._trashFetching&&(s._trashFetching=!0,L(`/api/trash`).then(e=>{s.trash=Array.isArray(e)?e:e.trash||[...(e.projects||[]).map(e=>({...e,type:`project`})),...(e.tasks||[]).map(e=>({...e,type:`task`})),...(e.documents||[]).map(e=>({...e,type:`document`}))],s.trashLoaded=!0,s._trashFetching=!1,typeof window.renderView==`function`&&window.renderView()}).catch(e=>{s._trashFetching=!1,console.error(`[Trash fetch error]`,e)}));let n=s.trash||[],r=s.trashFilter||`all`,i=(s.trashQuery||``).trim().toLowerCase(),o=n.filter(e=>{if(r!==`all`&&e.type!==r)return!1;if(!i)return!0;let t=(O(e.nameAr||e.titleAr,e.nameEn||e.titleEn)||e.name||e.title||e.originalName||``).toLowerCase(),n=(e.code||e.projectCode||``).toLowerCase(),a=(e.projectNameAr||e.projectNameEn||``).toLowerCase();return t.includes(i)||n.includes(i)||a.includes(i)}),c=n.filter(e=>e.type===`project`).length,l=n.filter(e=>e.type===`task`).length,u=n.filter(e=>e.type===`document`).length,d=n.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${j(`info`,16)}</div>
        <div class="trash-notice-text">
          <strong>${O(`سلة المحذوفات المركزية المحمية`,`Central Protected Trash Bin`)}</strong>
          <p>${O(`تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.`,`Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.`)}</p>
        </div>
      </div>

      <div class="trash-filter-bar" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <button class="btn btn-sm ${r===`all`?`btn-primary`:`btn-ghost`}" data-action="filter-trash" data-filter="all">
            ${O(`الكل`,`All`)} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${n.length}</span>
          </button>
          <button class="btn btn-sm ${r===`project`?`btn-primary`:`btn-ghost`}" data-action="filter-trash" data-filter="project">
            ${j(`building`,12)} ${O(`المشاريع`,`Projects`)} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${c}</span>
          </button>
          <button class="btn btn-sm ${r===`task`?`btn-primary`:`btn-ghost`}" data-action="filter-trash" data-filter="task">
            ${j(`checklist`,12)} ${O(`المهام`,`Tasks`)} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${l}</span>
          </button>
          <button class="btn btn-sm ${r===`document`?`btn-primary`:`btn-ghost`}" data-action="filter-trash" data-filter="document">
            ${j(`document`,12)} ${O(`المستندات`,`Documents`)} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${u}</span>
          </button>
        </div>
        <div style="min-width:220px;max-width:320px;flex:1;">
          <input type="search" class="input input-sm" placeholder="${O(`بحث في المحذوفات...`,`Search deleted items...`)}" value="${k(s.trashQuery||``)}" data-action="search-trash-input" style="width:100%;padding:6px 12px;font-size:12px;" />
        </div>
      </div>

      ${o.length?`
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${O(`الاسم / العنوان`,`Name / Title`)}</th>
                <th>${O(`النوع`,`Type`)}</th>
                <th>${O(`المشروع التابع له`,`Project`)}</th>
                <th>${O(`الحالة السابقة`,`Prior Status`)}</th>
                <th>${O(`تاريخ الحذف`,`Deleted At`)}</th>
                <th style="text-align:${s.lang===`ar`?`left`:`right`}">${O(`الإجراءات`,`Actions`)}</th>
              </tr>
            </thead>
            <tbody>
              ${o.map(n=>{let r=n.type===`project`,i=n.type===`task`,a=n.type===`document`,o=O(n.nameAr||n.titleAr,n.nameEn||n.titleEn)||n.name||n.title||n.originalName||n.code||O(`عنصر محذوف`,`Deleted item`),c=!r&&n.projectId?(s.data?.projects||[]).find(e=>e.id===n.projectId):null,l=n.projectNameAr||n.projectNameEn||(c?O(c.nameAr,c.nameEn||c.nameAr):null),u=n.projectCode||c?.code,d=a&&n.size?n.size>1048576?(n.size/1048576).toFixed(1)+` MB`:Math.round(n.size/1024)+` KB`:``,f=t||F(`manage_trash`)||n.uploaderId===e;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${r?`is-project`:i?`is-task`:`is-doc`}">
                          ${j(r?`building`:i?`checklist`:`document`,14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${k(o)}</strong>
                          ${n.code||r?`<span class="trash-item-code">${k(n.code||n.id)}</span>`:``}
                          ${a&&d?`<span class="trash-item-code" style="color:var(--muted);">${d}</span>`:``}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${r?`type-project`:i?`type-task`:`type-doc`}">
                        ${j(r?`building`:i?`checklist`:`document`,11)}
                        ${r?O(`مشروع`,`Project`):i?O(`مهمة`,`Task`):O(`مستند`,`Document`)}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${r?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${O(`مشروع رئيسي`,`Primary Project`)}</span>`:l?`${j(`building`,11)} <span>${k(l)}${u?` (${k(u)})`:``}</span>${a&&n.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${k(n.taskTitleAr)}</span>`:``}`:`<span style="color:var(--muted)">—</span>`}
                      </span>
                    </td>
                    <td>
                      ${n.status?`<span class="status-badge ${k(n.status)}">${k(N(n.status))}</span>`:`<span style="color:var(--muted)">—</span>`}
                    </td>
                    <td>
                      <span class="trash-date" title="${k(n.deletedAt||``)}">
                        ${dateLabel(n.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${s.lang===`ar`?`left`:`right`}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${k(n.type)}" data-id="${k(n.id)}" title="${O(`استعادة العنصر وإعادته للعمل`,`Restore item to active`)}">
                          ${j(s.lang===`ar`?`arrow`:`arrowLeft`,12)} ${O(`استعادة`,`Restore`)}
                        </button>
                        ${f?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${k(n.type)}" data-id="${k(n.id)}" title="${O(`حذف العنصر نهائياً`,`Permanently delete item`)}">
                            ${j(`trash`,12)} ${O(`حذف نهائي`,`Purge`)}
                          </button>
                        `:``}
                      </div>
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      `:`
        <div class="empty">
          ${j(`search`,22)}
          <span>${O(`لا توجد نتائج تطابق بحثك في سلة المهملات.`,`No items match your search in trash.`)}</span>
        </div>
      `}
    `:`
      <div class="empty">
        ${j(`trash`,24)}
        <span>${O(`سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.`,`Trash is empty, no deleted items found.`)}</span>
      </div>
    `;a=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${O(`سلة المهملات`,`Recycle Bin`)}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${n.length} ${O(`عناصر`,`items`)}
              </span>
            </div>
            <p>${O(`استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.`,`Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.`)}</p>
          </div>
          ${(t||F(`manage_trash`))&&n.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${O(`حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات`,`Permanently erase all deleted items`)}">
                ${j(`trash`,13)} ${O(`إفراغ سلة المهملات`,`Empty Trash`)}
              </button>
            </div>
          `:``}
        </div>
        ${d}
      </section>
    `}if(s.settingsSection===`audit`&&(t||F(`view_audit_logs`))){let e=[...s.data?.auditLogs||[]].sort((e,t)=>new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime()),t=s.auditFilterAction||`all`,n=s.auditFilterEntity||`all`,r=s.auditFilterUser||`all`,i=(s.auditSearchQuery||``).trim().toLowerCase(),o=e.filter(e=>{if(t!==`all`&&e.action!==t||n!==`all`&&(e.entityType||e.entity_type)!==n||r!==`all`&&(e.userId||e.user_id||e.user?.id)!==r)return!1;if(i){let t=e.user||(e.userId?(s.data?.users||[]).find(t=>t.id===e.userId):null),n=(t&&O(t.name,t.nameEn||t.name)||``).toLowerCase(),{actionLabel:r,entityLabel:a}=cn(e),o=(r||e.action||``).toLowerCase(),c=(a||e.entityType||``).toLowerCase(),l=(e.id||e.entityId||``).toLowerCase(),u=typeof e.details==`object`?JSON.stringify(e.details).toLowerCase():String(e.details||``).toLowerCase();if(!(n.includes(i)||o.includes(i)||c.includes(i)||l.includes(i)||u.includes(i)))return!1}return!0});s._lastFilteredAuditLogs=o;let c=[[`all`,O(`كافة العمليات`,`All Actions`)],[`create`,O(`إنشاء جديد`,`Create`)],[`update`,O(`تعديل بيانات`,`Update`)],[`status_change`,O(`تغيير حالة`,`Status Change`)],[`delete`,O(`نقل للمهملات`,`Delete / Trash`)],[`restore`,O(`استعادة`,`Restore`)],[`purge`,O(`حذف نهائي`,`Purge`)],[`export_report`,O(`تصدير تقرير`,`Export Report`)],[`login`,O(`تسجيل دخول`,`Sign In`)],[`invite`,O(`دعوة مستخدم`,`Invite`)]],l=[[`all`,O(`كافة العناصر`,`All Entities`)],[`project`,O(`المشاريع`,`Projects`)],[`task`,O(`المهام`,`Tasks`)],[`document`,O(`المستندات`,`Documents`)],[`user`,O(`المستخدمين`,`Users`)],[`role`,O(`الأدوار والصلاحيات`,`Roles`)],[`company`,O(`إعدادات الشركة`,`Company Settings`)],[`report`,O(`التقارير`,`Reports`)]],u=t!==`all`||n!==`all`||r!==`all`||!!i;a=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${D(`audit`)}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${o.length} ${O(`عملية معروضة`,`events shown`)}
              </span>
              ${u?`
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${O(`من أصل`,`out of`)} ${e.length}
                </span>
              `:``}
            </div>
            <p>${O(`سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.`,`Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.`)}</p>
          </div>
          <div class="page-actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${s.auditFullHistoryLoaded?``:`
              <button class="btn btn-ghost btn-sm" data-action="load-full-audit" title="${O(`جلب الأرشيف الكامل للسجلات من السيرفر`,`Load complete audit archive`)}">
                ${j(`refresh`,13)} ${O(`تحميل الأرشيف الكامل`,`Load All History`)}
              </button>
            `}
            <button class="btn btn-soft btn-sm" data-action="export-audit-xls" title="${O(`تصدير السجل كملف Excel منسق`,`Export as styled Excel file`)}">
              ${j(`download`,13)} ${O(`تصدير Excel`,`Export Excel`)}
            </button>
            <button class="btn btn-primary btn-sm" data-action="print-audit-pdf" title="${O(`معاينة وطباعة تقرير رسمي وحفظه كـ PDF`,`Print or save executive PDF report`)}">
              ${j(`printer`,13)} ${O(`طباعة تقرير PDF`,`Print / PDF`)}
            </button>
          </div>
        </div>

        <div class="audit-toolbar" style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:16px;flex-wrap:wrap;background:var(--surface-soft);padding:10px 14px;border-radius:12px;border:1px solid var(--line);">
          <div style="flex:1;min-width:220px;max-width:360px;">
            <input type="search" class="input input-sm" placeholder="${O(`بحث فوري بالمنفذ، العملية، أو التفاصيل...`,`Search by actor, action, details...`)}" value="${k(s.auditSearchQuery||``)}" data-action="search-audit-input" style="width:100%;font-size:12px;padding:6px 12px;" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="input input-sm" data-action="filter-audit-action" style="font-size:11.5px;padding:5px 8px;cursor:pointer;">
              ${c.map(([e,n])=>`<option value="${e}" ${t===e?`selected`:``}>${n}</option>`).join(``)}
            </select>
            <select class="input input-sm" data-action="filter-audit-entity" style="font-size:11.5px;padding:5px 8px;cursor:pointer;">
              ${l.map(([e,t])=>`<option value="${e}" ${n===e?`selected`:``}>${t}</option>`).join(``)}
            </select>
            <select class="input input-sm" data-action="filter-audit-user" style="font-size:11.5px;padding:5px 8px;cursor:pointer;">
              <option value="all">${O(`كافة المستخدمين`,`All Users`)}</option>
              ${(s.data?.users||[]).map(e=>`<option value="${e.id}" ${r===e.id?`selected`:``}>${k(O(e.name,e.nameEn||e.name))}</option>`).join(``)}
            </select>
            ${u?`
              <button class="btn btn-ghost btn-sm" data-action="reset-audit-filters" style="font-size:11px;color:var(--muted);padding:4px 8px;" title="${O(`إعادة تعيين الفلاتر`,`Reset filters`)}">
                ${O(`إلغاء التصفية`,`Clear`)}
              </button>
            `:``}
          </div>
        </div>

        ${o.length?`
          <div class="table-wrap" style="border:1px solid var(--line);border-radius:12px;overflow-x:auto;background:var(--surface);">
            <table class="data-table" style="width:100%;border-collapse:collapse;font-size:12px;min-width:650px;">
              <thead>
                <tr style="background:var(--surface-soft);border-bottom:1px solid var(--line);color:var(--ink-soft);font-size:11px;font-weight:700;text-align:inherit;">
                  <th style="padding:12px 14px;">${O(`المستخدم / المنفذ`,`User / Actor`)}</th>
                  <th style="padding:12px 14px;">${O(`نوع النشاط والعملية`,`Action & Target`)}</th>
                  <th style="padding:12px 14px;">${O(`التفاصيل والتغيير`,`Details / Context`)}</th>
                  <th style="padding:12px 14px;text-align:${s.lang===`ar`?`left`:`right`};">${O(`التاريخ والوقت الدقيق`,`Exact Date & Time`)}</th>
                </tr>
              </thead>
              <tbody>
                ${o.map(e=>{let t=e.user||(e.userId?(s.data?.users||[]).find(t=>t.id===e.userId):null),n=t?O(t.name,t.nameEn||t.name):O(`النظام`,`System`),r=t?P(t):O(`تلقائي`,`Automated`),i=sn(e.createdAt),{badgeClass:a,actionLabel:o,entityLabel:c,detailHtml:l}=cn(e);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${M(t)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${k(n)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${k(r)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${a}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${k(o)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${k(c)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${l}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${s.lang===`ar`?`left`:`right`};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${k(i.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${j(`clock`,11)}
                          <span>${k(i.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join(``)}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${j(u?`search`:`checklist`,24)}
            <span>${u?O(`لا توجد عمليات تطابق معايير التصفية المحددة.`,`No audit logs match the selected filter criteria.`):O(`لا توجد عمليات مسجلة حتى الآن.`,`No audit logs recorded yet.`)}</span>
            ${u?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${O(`إعادة تعيين الفلاتر`,`Reset filters`)}
              </button>
            `:``}
          </div>
        `}
      </section>
    `}return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${t?O(`تحكم مركزي`,`CENTRAL CONTROL`):O(`الملف الشخصي`,`USER PROFILE`)}</p>
        <h1>${t?D(`settings`):O(`الملف الشخصي والأمان`,`Profile & Security`)}</h1>
        <p>${t?O(`إدارة إعدادات الشركة والحسابات والأدوار والنظام.`,`Manage workspace, accounts, roles, and settings.`):O(`إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.`,`Manage your account info, password, and personal avatar.`)}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${j(t?`shield`:`user`,13)} ${k(P(i))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${r.map(([e,t])=>`<button class="${s.settingsSection===e?`active`:``}" data-action="settings-section" data-section="${e}">${t}</button>`).join(``)}
      </aside>
      <div class="settings-content">${a}</div>
    </div>
  `}var pn=[{id:`view_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`عرض المشاريع`,nameEn:`View Projects`},{id:`create_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`إنشاء مشاريع جديدة`,nameEn:`Create Projects`},{id:`edit_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`تعديل بيانات ومراحل المشاريع`,nameEn:`Edit Projects`},{id:`delete_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`حذف المشاريع`,nameEn:`Delete Projects`},{id:`manage_project_members`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`إدارة وتعيين أعضاء المشروع`,nameEn:`Manage Project Members`},{id:`create_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`إنشاء المهام والمخرجات`,nameEn:`Create Tasks`},{id:`edit_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`تعديل تفاصيل وحالة المهام`,nameEn:`Edit Tasks`},{id:`delete_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`حذف المهام`,nameEn:`Delete Tasks`},{id:`assign_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`إسناد وتوزيع المهام للمنفذين`,nameEn:`Assign Tasks`},{id:`review_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`مراجعة المخرجات الهندسية`,nameEn:`Review Deliverables`},{id:`approve_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`اعتماد وتوقيع المخرجات الهندسية`,nameEn:`Approve Deliverables`},{id:`manage_reminders`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`إدارة التذكيرات والمتابعات`,nameEn:`Manage Reminders`},{id:`upload_documents`,category:`documents`,categoryAr:`المخططات والمكتبة القياسية`,categoryEn:`Drawings & Deliverables Library`,nameAr:`رفع وإدارة المخططات والمستندات`,nameEn:`Upload Documents`},{id:`delete_documents`,category:`documents`,categoryAr:`المخططات والمكتبة القياسية`,categoryEn:`Drawings & Deliverables Library`,nameAr:`حذف المخططات والمستندات`,nameEn:`Delete Documents`},{id:`manage_templates`,category:`documents`,categoryAr:`المخططات والمكتبة القياسية`,categoryEn:`Drawings & Deliverables Library`,nameAr:`إدارة مكتبة القوالب والمخرجات القياسية`,nameEn:`Manage Templates Library`},{id:`view_dashboard`,category:`reports`,categoryAr:`المؤشرات والتقارير`,categoryEn:`Analytics & Reports`,nameAr:`عرض لوحة التحكم والمؤشرات`,nameEn:`View Dashboard`},{id:`view_reports`,category:`reports`,categoryAr:`المؤشرات والتقارير`,categoryEn:`Analytics & Reports`,nameAr:`عرض صفحة التقارير والمؤشرات`,nameEn:`View Reports`},{id:`export_reports`,category:`reports`,categoryAr:`المؤشرات والتقارير`,categoryEn:`Analytics & Reports`,nameAr:`تصدير التقارير (Excel)`,nameEn:`Export Reports (Excel)`},{id:`manage_users`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إدارة ودعوة وتفعيل حسابات المستخدمين`,nameEn:`Manage Users`},{id:`manage_existing_account_permissions`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`تعديل أدوار وصلاحيات الحسابات الموجودة`,nameEn:`Manage Existing Account Permissions`},{id:`view_user_activity`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`متابعة أوقات دخول ونشاط المستخدمين`,nameEn:`View User Logins & Activity Timestamps`},{id:`manage_roles`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إنشاء وتعديل الأدوار والصلاحيات`,nameEn:`Manage Roles & Permissions`},{id:`manage_settings`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إدارة إعدادات النظام والشركة ومساحة العمل`,nameEn:`Manage Company & Settings`},{id:`manage_trash`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إدارة واستعادة سلة المهملات`,nameEn:`Manage Trash`},{id:`view_audit_logs`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`استعراض سجل الرقابة والعمليات الأمنية`,nameEn:`View Audit Logs`}];function mn(e=null){let t=s.data?.permissionsCatalog&&s.data.permissionsCatalog.length>=10?s.data.permissionsCatalog:pn,n=new Map;t.forEach(e=>{let t=e.category||`general`,r=O(e.categoryAr||t,e.categoryEn||t);n.has(t)||n.set(t,{name:r,items:[]}),n.get(t).items.push(e)});let r=e?.id===`admin`||e?.permissions&&e.permissions.includes(`*`),i=Array.from(n.entries()).map(([t,n])=>{let i=n.items.map(t=>{let n=t.id||t.key,i=O(t.nameAr||t.ar,t.nameEn||t.en||n),a=r||e?.permissions&&(e.permissions.includes(n)||typeof PERMISSION_ALIASES<`u`&&PERMISSION_ALIASES[n]&&e.permissions.includes(PERMISSION_ALIASES[n])),o=r?`disabled`:``;return`
        <label class="permission-option" style="cursor:${r?`default`:`pointer`};">
          <input type="checkbox" name="permissions" value="${k(n)}" ${a?`checked`:``} ${o} />
          <span style="font-weight:500;">${k(i)}</span>
        </label>
      `}).join(``);return`
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${k(n.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${n.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${i}
        </div>
      </div>
    `}).join(``),a=r?``:`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${D(`permissions`)} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${t.length} ${O(`صلاحية متاحة`,`available permissions`)})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${O(`تحديد الكل`,`Select All`)}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${O(`إلغاء التحديد`,`Deselect All`)}</button>
      </div>
    </div>
  `,o=`
    <form id="role-form" data-role-id="${k(e?.id||``)}">
      <div class="form-grid">
        <div class="field">
          <label>${D(`nameAr`)} *</label>
          <input name="nameAr" value="${k(e?.nameAr||``)}" required />
        </div>
        <div class="field">
          <label>${D(`nameEn`)}</label>
          <input name="nameEn" value="${k(e?.nameEn||``)}" />
        </div>
        <div class="field full">
          <label>${D(`roleDescription`)}</label>
          <textarea name="descriptionAr" rows="2">${k(e?.descriptionAr||``)}</textarea>
        </div>
      </div>
      ${r?`
        <div class="role-modal-note" style="margin-top:15px;">
          ${O(`مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.`,`The system administrator always keeps full root privileges [*] across all aspects of the system.`)}
        </div>
      `:`
        ${a}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${i}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${D(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${j(`check`,14)} ${D(e?`save`:`create`)}</button>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=T(e?O(`تعديل الدور والصلاحيات`,`Edit role & permissions`):D(`addRole`),O(`تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.`,`Define granular permissions and workspace access levels for this role.`),o,`role`,`modal-lg`);let c=document.getElementById(`modal-root`);if(c){let e=c.querySelector(`#btn-perm-select-all`),t=c.querySelector(`#btn-perm-deselect-all`);e&&e.addEventListener(`click`,()=>{c.querySelectorAll(`input[name="permissions"]:not(:disabled)`).forEach(e=>e.checked=!0)}),t&&t.addEventListener(`click`,()=>{c.querySelectorAll(`input[name="permissions"]:not(:disabled)`).forEach(e=>e.checked=!1)})}}function hn(e=null){if(e?.id===`usr_ahmad`&&s.data?.user?.id!==`usr_ahmad`)return E(O(`لا يمكن تعديل حساب مدير ومطور النظام.`,`System Developer account is protected.`),!0);if(!e&&!I())return E(D(`adminOnly`),!0);let t=!I(),n=t?`disabled`:``,r=(s.data?.roles||[]).filter(e=>I()||e.id!==`admin`),i=`<form id="user-form" data-user-id="${k(e?.id||``)}" data-permission-only="${t}"><div class="form-grid"><div class="field full"><label>${D(`nameAr`)}</label><input name="name" value="${k(e?.name||``)}" ${n} required /></div><div class="field"><label>${D(`nameEn`)}</label><input name="nameEn" value="${k(e?.nameEn||``)}" ${n} /></div><div class="field"><label>${D(`jobTitle`)}</label><input name="jobTitleAr" value="${k(e?.jobTitleAr||``)}" ${n} /></div><div class="field"><label>${D(`email`)}</label><input name="email" type="email" value="${k(e?.email||``)}" placeholder="name@darc.com" ${n} /></div><div class="field"><label>${D(`role`)}</label><select name="roleId">${r.map(t=>`<option value="${k(t.id)}" ${e?.roleId===t.id?`selected`:``}>${k(O(t.nameAr,t.nameEn))}</option>`).join(``)}</select></div></div><div class="field-hint">${t?O(`يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.`,`Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator.`):O(`إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.`,`If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.`)}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${D(`cancel`)}</button><button type="submit" class="btn btn-primary">${j(`check`,14)} ${e?t?O(`حفظ الصلاحية`,`Save permission`):D(`save`):D(`create`)}</button></div></form>`;document.getElementById(`modal-root`).innerHTML=T(e?t?O(`تعديل صلاحية الحساب`,`Change account permission`):O(`تعديل حساب العضو`,`Edit member account`):D(`addMember`),O(`الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.`,`The role defines what this member can see and change across projects.`),i,`user`)}var gn=t({showNotifications:()=>_n});function _n(){let e=s.data?.notifications||[],t=`${e.filter(e=>!e.read&&!e.readAt).length>0?`
    <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
      <button class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 10px;">
        ${j(`check`,13)} ${O(`تحديد الكل كمقروء`,`Mark all as read`)}
      </button>
    </div>
  `:``}${e.length?`<div class="attention-list">${e.slice(0,20).map(e=>{let t=e.type===`overdue`||e.type===`escalation`?`red`:e.type===`due_soon`||e.type===`document_review`?`amber`:`blue`,n=!!(e.readAt||e.read),r=e.type===`overdue`?O(`مهمة متأخرة`,`Overdue Task`):e.type===`escalation`?O(`تصعيد مهمة`,`Task Escalation`):e.type===`due_soon`?O(`موعد تسليم قريب`,`Due Soon`):e.type===`document_review`?O(`مراجعة مستند`,`Document Review`):e.type===`assignment`?O(`إسناد مهمة جديدة`,`Task Assigned`):O(`تنبيه مساحة العمل`,`Workspace Notification`),i=O(e.titleAr||e.titleEn||r,e.titleEn||e.titleAr||r),a=O(e.messageAr||e.bodyAr||e.content||``,e.messageEn||e.bodyEn||e.content||``),o=a&&a!==i?`${a} · `:``,s=e.type===`overdue`||e.type===`escalation`?`alert`:e.type===`document_review`?`document`:e.type===`assignment`?`user`:`bell`;return`<button class="attention-item" data-action="read-notification" data-notification-id="${k(e.id)}" style="border:0;text-align:inherit;width:100%;opacity:${n?`.65`:`1`}"><span class="attention-icon ${t}">${j(s,14)}</span><span class="attention-copy"><strong style="color:var(--${t})">${k(i)}</strong><span>${k(o)}${be(e.createdAt)}</span></span></button>`}).join(``)}</div>`:`<div class="empty">${j(`bell`,18)}<span>${D(`noAttention`)}</span></div>`}`;document.getElementById(`modal-root`).innerHTML=T(D(`notifications`),O(`تنبيهاتك داخل مساحة العمل والبريد.`,`Your workspace and email notifications.`),t,`notifications`)}var vn=typeof navigator<`u`&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?`⌘K`:`Ctrl+K`,K=0,q=[];function yn(){let e=document.getElementById(`omnisearch-modal`);e&&e.remove(),document.body.style.overflow=`hidden`;let t=O(`ابحث في المشاريع، المهام، والأعضاء... (${vn})`,`Search projects, tasks, team... (${vn})`),n=`
    <div id="omnisearch-modal" class="omnisearch-backdrop">
      <div class="omnisearch-box">
        <div class="omnisearch-input-wrap">
          <span style="color:var(--teal);display:flex;">${j(`search`,18)}</span>
          <input 
            id="omnisearch-input" 
            type="text" 
            autocomplete="off" 
            placeholder="${k(t)}" 
            onfocus="this.placeholder=''" 
            onblur="if(!this.value) this.placeholder='${k(t)}'"
          />
          <button class="btn btn-ghost btn-sm" data-action="close-omnisearch" style="padding:4px 8px;">
            <kbd class="shortcut-kbd">ESC</kbd>
          </button>
        </div>
        <div id="omnisearch-results-container" class="omnisearch-results">
          ${wn(``)}
        </div>
        <div class="omnisearch-foot">
          <div class="omni-shortcuts-hint">
            <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd> ${O(`للتنقل`,`to navigate`)}</span>
            <span><kbd class="shortcut-kbd">↵</kbd> ${O(`للاختيار`,`to select`)}</span>
            <span><kbd class="shortcut-kbd">ESC</kbd> ${O(`للإغلاق`,`to close`)}</span>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="open-cheatsheet" style="font-size:11px;padding:2px 6px;">
            ${j(`sparkles`,12)} ${O(`دليل الاختصارات (?)`,`Shortcuts (?)`)}
          </button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML(`beforeend`,n);let r=document.getElementById(`omnisearch-modal`);r&&r.addEventListener(`click`,e=>{e.target===r&&bn()});let i=document.getElementById(`omnisearch-input`);i&&(i.focus(),i.addEventListener(`input`,e=>{K=0;let t=document.getElementById(`omnisearch-results-container`);t&&(t.innerHTML=wn(e.target.value))}),i.addEventListener(`keydown`,xn))}function bn(){let e=document.getElementById(`omnisearch-modal`);e&&e.remove(),document.querySelector(`.modal-backdrop`)||(document.body.style.overflow=``)}function xn(e){e.key===`ArrowDown`?(e.preventDefault(),q.length>0&&(K=(K+1)%q.length,Sn())):e.key===`ArrowUp`?(e.preventDefault(),q.length>0&&(K=(K-1+q.length)%q.length,Sn())):e.key===`Enter`?(e.preventDefault(),q[K]&&Cn(q[K])):e.key===`Escape`&&bn()}function Sn(){document.querySelectorAll(`.omni-item`).forEach((e,t)=>{e.classList.toggle(`selected`,t===K),t===K&&e.scrollIntoView({block:`nearest`})})}function Cn(e){if(bn(),e.type===`action`){if(e.id===`new-task`){let t=(s.data?.projects||[]).find(e=>e.id===(s.activeProjectId||s.lastActiveProjectId))||(s.data?.projects||[])[0];bt(null,null,e.targetProjectId||t?.id)}else e.id===`new-project`?Bt():e.id===`cheatsheet`&&Tn()}else if(e.type===`project`)s.projectTab=`tasks`,s.lastActiveProjectId=e.id,U(`project-detail`,e.id);else if(e.type===`task`){let t=s.data?.tasks?.find(t=>t.id===e.id);t&&bt(t)}else if(e.type===`user`){let t=s.data?.users?.find(t=>t.id===e.id);t&&typeof window.openUserModal==`function`&&window.openUserModal(t)}}function wn(e){let t=e.trim().toLowerCase(),n=[],r=(s.data?.projects||[]).find(e=>e.id===(s.activeProjectId||s.lastActiveProjectId))||(s.data?.projects||[])[0],i=r?O(r.nameAr,r.nameEn):``,a=[];if((F(`create_tasks`)||I())&&a.push({type:`action`,id:`new-task`,targetProjectId:r?.id,title:O(`إضافة مهمة جديدة`,`Create new task`),sub:r?O(`في مشروع: ${i}`,`In project: ${i}`):O(`إجراء سريع`,`Quick action`),icon:`plus`,keywords:`new task مهمة إضافة عمل جديد`}),(F(`create_projects`)||I())&&a.push({type:`action`,id:`new-project`,title:O(`إنشاء مشروع جديد`,`Create new project`),sub:O(`إجراء سريع`,`Quick action`),icon:`building`,keywords:`new project مشروع إنشاء جديد`}),a.push({type:`action`,id:`cheatsheet`,title:O(`عرض دليل اختصارات لوحة المفاتيح`,`View keyboard shortcuts guide`),sub:O(`مساعدة`,`Help`),icon:`sparkles`,keywords:`shortcuts اختصارات كيبورد مساعدة`}),a.forEach(e=>{(!t||e.keywords.includes(t)||e.title.toLowerCase().includes(t))&&n.push(e)}),(F(`view_projects`)||I())&&(s.data?.projects||[]).forEach(e=>{(!t||`${e.nameAr} ${e.nameEn} ${e.code} ${e.clientAr} ${e.clientEn}`.toLowerCase().includes(t))&&n.push({type:`project`,id:e.id,title:O(e.nameAr,e.nameEn),sub:`${e.code} · ${O(e.clientAr,e.clientEn)||``}`,badge:`${e.progress}%`,icon:`building`})}),R(`tasks`)&&(s.data?.tasks||[]).forEach(e=>{(!t||`${e.titleAr} ${e.titleEn} ${e.categoryAr} ${e.categoryEn}`.toLowerCase().includes(t))&&n.push({type:`task`,id:e.id,title:O(e.titleAr,e.titleEn),sub:e.dueDate?`📅 ${be(e.dueDate)}`:O(e.categoryAr,e.categoryEn)||``,badge:`${e.progress}%`,icon:`checklist`})}),(I()||F(`manage_users`))&&(s.data?.users||[]).forEach(e=>{(!t||`${e.name} ${e.nameEn} ${e.email} ${e.jobTitleAr}`.toLowerCase().includes(t))&&n.push({type:`user`,id:e.id,title:O(e.name,e.nameEn||e.name),sub:e.email||``,badge:P(e),icon:`user`})}),q=n.slice(0,15),!q.length)return`
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${j(`search`,24)}</span>
        <strong style="color:var(--ink);">${O(`لا توجد نتائج مطابقة`,`No matching results`)}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${O(`جرب البحث بكلمات أخرى أو رمز المشروع.`,`Try different keywords or project code.`)}</p>
      </div>
    `;let o=``;return q.map((e,t)=>{let n=``,r=e.type===`action`?O(`إجراءات سريعة`,`Quick Actions`):e.type===`project`?O(`المشاريع`,`Projects`):e.type===`task`?O(`المهام والمخرجات`,`Tasks & Deliverables`):O(`فريق العمل`,`Team`);return r!==o&&(o=r,n=`<div class="omni-group-title">${r}</div>`),`
      ${n}
      <div class="omni-item ${t===K?`selected`:``}" data-omni-index="${t}" onclick="window.__selectOmniItem(${t})">
        <div class="omni-item-left">
          <span style="color:var(--teal);display:flex;">${j(e.icon,15)}</span>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <strong style="font-size:13px;">${k(e.title)}</strong>
            ${e.sub?`<span style="font-size:11px;color:var(--muted);">${k(e.sub)}</span>`:``}
          </div>
        </div>
        ${e.badge?`<span class="omni-badge">${k(e.badge)}</span>`:``}
      </div>
    `}).join(``)}window.__selectOmniItem=e=>{q[e]&&Cn(q[e])};function Tn(){bn();let e=`
    <div style="padding:10px 0;">
      <p style="color:var(--ink-soft);font-size:13px;margin-top:0;">${O(`استخدم هذه الاختصارات لزيادة سرعة عملك داخل النظام بدون لمس الفأرة:`,`Use these shortcuts to navigate the workspace at full speed without a mouse:`)}</p>
      
      <div class="cheatsheet-grid">
        <div class="cheatsheet-row">
          <span>${O(`البحث الشامل والأوامر السريعة`,`Omnisearch & Quick Commands`)}</span>
          <kbd class="shortcut-kbd">${vn}</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${O(`إضافة مهمة سريعة في المشروع`,`Add new task in project`)}</span>
          <kbd class="shortcut-kbd">N</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${O(`إنشاء مشروع جديد`,`Create new project`)}</span>
          <kbd class="shortcut-kbd">P</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${O(`فتح دليل الاختصارات هذا`,`Open this shortcuts guide`)}</span>
          <kbd class="shortcut-kbd">? / ؟</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${O(`إغلاق أي نافذة منبثقة أو بحث`,`Close modal or search`)}</span>
          <kbd class="shortcut-kbd">ESC</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${O(`التنقل بين نتائج البحث`,`Navigate search results`)}</span>
          <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd></span>
        </div>
        <div class="cheatsheet-row">
          <span>${O(`تأكيد واختيار النتيجة`,`Select search result`)}</span>
          <kbd class="shortcut-kbd">↵ Enter</kbd>
        </div>
      </div>

      <div class="modal-actions" style="margin-top:24px;">
        <button type="button" class="btn btn-primary" data-action="close-modal">${O(`فهمت ذلك`,`Got it`)}</button>
      </div>
    </div>
  `;document.getElementById(`modal-root`).innerHTML=T(O(`دليل اختصارات لوحة المفاتيح`,`Keyboard Shortcuts Guide`),O(`طرق سريعة للتنقل وإنجاز العمل بكفاءة عالية`,`Work faster with productivity hotkeys`),e,`cheatsheet`)}function En(){window.addEventListener(`keydown`,e=>{let t=document.activeElement,n=t&&(t.tagName===`INPUT`||t.tagName===`TEXTAREA`||t.tagName===`SELECT`||t.isContentEditable),r=e.code===`KeyK`||e.key?.toLowerCase()===`k`||e.key===`ن`;(e.metaKey||e.ctrlKey)&&r?(e.preventDefault(),document.getElementById(`omnisearch-modal`)?bn():yn()):(e.key===`?`||e.key===`؟`||e.code===`Slash`&&e.shiftKey)&&!n?(e.preventDefault(),Tn()):(e.code===`KeyN`||e.key?.toLowerCase()===`n`||e.key===`ى`)&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey?(e.preventDefault(),bt(null,null,s.view===`project-detail`&&s.activeProjectId?s.activeProjectId:s.data?.projects?.[0]?.id)):(e.code===`KeyP`||e.key?.toLowerCase()===`p`||e.key===`ح`)&&!n&&!e.metaKey&&!e.ctrlKey&&!e.altKey?(e.preventDefault(),Bt()):e.key===`Escape`&&document.getElementById(`omnisearch-modal`)&&(e.preventDefault(),bn())})}var Dn=t({getOrCreateFloatingUploadWidget:()=>Ln,handleChange:()=>Mn,handleClick:()=>kn,handleInput:()=>jn,handleSubmit:()=>On,init:()=>Vn,updateFloatingUploadWidget:()=>Rn,uploadDirectFiles:()=>Bn,uploadTaskFiles:()=>zn});async function On(e){let t=e.target;if(![`project-form`,`task-form`,`user-form`,`role-form`,`activation-form`,`task-comment-form`,`template-form`,`force-password-form`].includes(t.id)&&!t.dataset.action)return;e.preventDefault();let n=Object.fromEntries(new FormData(t).entries()),r=t.querySelector(`button[type="submit"]`);r&&(r.disabled=!0,r.classList.add(`is-loading`));try{if(t.id===`activation-form`){if(n.password!==n.passwordConfirm)throw Error(O(`كلمتا المرور غير متطابقتين.`,`Passwords do not match.`));delete n.passwordConfirm,await L(`/api/auth/activate`,{method:`POST`,body:JSON.stringify(n)}),window.history.replaceState({},``,window.location.pathname),await Le();return}if(t.id===`project-form`){n.startDate||=null,n.dueDate||=null,n.managerId||=null;let e=[];try{n.memberIds&&(e=JSON.parse(n.memberIds))}catch{}n.managerId&&!e.includes(n.managerId)&&e.push(n.managerId),n.memberIds=e;let r=!!t.dataset.projectId,i=await L(r?`/api/projects/${t.dataset.projectId}`:`/api/projects`,{method:r?`PATCH`:`POST`,body:JSON.stringify(n)});if(i.project){if(s.data.projects||(s.data.projects=[]),r){let e=s.data.projects.findIndex(e=>e.id===i.project.id);e!==-1&&(s.data.projects[e]={...s.data.projects[e],...i.project})}else s.data.projects.unshift(i.project)}w(),H(),E(O(`تم حفظ المشروع.`,`Project saved.`));return}if(t.id===`task-form`){let e=t.dataset.taskId;n.remindAt,delete n.remindAt,n.templateId=n.templateId||null,n.typeAr=n.typeAr||(n.templateId?`مخطط`:null),n.typeEn=n.typeEn||(n.templateId?`Drawing`:null),n.startDate||=null,n.dueDate||=null,n.assigneeId||=null,n.reviewerId||=null;let r=[];try{r=JSON.parse(n.additionalAssignees||`[]`)}catch{r=[...t.querySelectorAll(`select[name="additionalAssignees"] option:checked`)].map(e=>e.value)}let i=[];try{i=JSON.parse(n.externalAssignees||`[]`)}catch{let e=String(n.externalAssignees||``).trim();i=e?e.split(/[,،]+/).map(e=>e.trim()).filter(Boolean):[]}let a=[];try{a=JSON.parse(n.remindersJson||`[]`)}catch{a=[]}delete n.additionalAssignees,delete n.externalAssignees,delete n.remindersJson,delete n.dependencies,delete n.weight,delete n.progress,n.customFields={additional_assignees:r,external_assignees:i,reminders:a},n.projectId||=s.activeProjectId||s.data.projects?.[0]?.id;let o=!!e;if(o){let t=(s.data?.tasks||[]).find(t=>t.id===e);t?.updatedAt&&(n.expectedUpdatedAt=t.updatedAt)}let c;try{c=await L(o?`/api/tasks/${e}`:`/api/tasks`,{method:o?`PATCH`:`POST`,body:JSON.stringify(n)})}catch(e){if(e.message&&e.message.includes(`تعارض`)){await W(!0),E(e.message,!0);return}throw e}if(c.task){if(s.data.tasks||(s.data.tasks=[]),o){let e=s.data.tasks.findIndex(e=>e.id===c.task.id);e!==-1&&(s.data.tasks[e]={...s.data.tasks[e],...c.task})}else s.data.tasks.unshift(c.task),s.view===`tasks`&&(s.taskProjectFilter!==`all`&&s.taskProjectFilter!==c.task.projectId&&(s.taskProjectFilter=c.task.projectId),s.taskFilter===`mine`&&c.task.assigneeId!==s.data.user?.id&&(s.taskFilter=`all`));if(Array.isArray(a)&&a.length>0){for(let e of a)if(!e.id||e.id.startsWith(`rem_temp_`)){let t=e.remindAt?new Date(e.remindAt):null;if(!t||isNaN(t.getTime()))continue;L(`/api/reminders`,{method:`POST`,body:JSON.stringify({taskId:c.task.id,remindAt:t.toISOString(),noteAr:e.noteAr||n.titleAr||`تذكير لمتابعة المهمة`})}).catch(e=>console.warn(`[Reminder dispatch note]`,e))}}}w(),H(),E(O(`تم حفظ المهمة بنجاح.`,`Task saved successfully.`));return}if(t.id===`task-comment-form`){let e=t.dataset.taskId,i=await L(`/api/tasks/${e}/comments`,{method:`POST`,body:JSON.stringify(n)});t.reset(),i.comment&&(s.data.comments||(s.data.comments=[]),s.data.comments.push(i.comment));let a=s.data.tasks.find(t=>t.id===e),o=document.getElementById(`task-comments-list`);o&&(o.innerHTML=renderTaskComments(a),o.scrollTop=o.scrollHeight),r&&(r.disabled=!1);return}if(t.id===`force-password-form`){let e=t.dataset.userId,i=t.dataset.isPending===`true`;await L(`/api/users/${e}/force-password`,{method:`POST`,body:JSON.stringify(n)});let a=s.data.users.find(t=>t.id===e);a&&(a.status=`active`),w(),H(),E(i?O(`تم تفعيل الحساب بنجاح.`,`Account activated successfully.`):O(`تم تغيير كلمة المرور وطرد المستخدم بنجاح.`,`Password changed and user kicked successfully.`)),r&&(r.disabled=!1);return}if(t.id===`user-form`){let e=t.dataset.userId,r=!!e,i=await L(r?`/api/users/${e}`:`/api/users`,{method:r?`PATCH`:`POST`,body:JSON.stringify(n)});if(i.user){if(s.data.users||(s.data.users=[]),r){let e=s.data.users.findIndex(e=>e.id===i.user.id);e!==-1&&(s.data.users[e]={...s.data.users[e],...i.user})}else s.data.users.unshift(i.user)}w(),H(),E(O(`تم حفظ حساب العضو.`,`Member account saved.`));return}if(t.id===`role-form`){let e=t.dataset.roleId,r=[...t.querySelectorAll(`input[name="permissions"]:checked`)].map(e=>e.value),i=!!e,a=await L(i?`/api/roles/${e}`:`/api/roles`,{method:i?`PATCH`:`POST`,body:JSON.stringify({...n,permissions:r})});if(a.role){if(s.data.roles||(s.data.roles=[]),i){let e=s.data.roles.findIndex(e=>e.id===a.role.id);e!==-1&&(s.data.roles[e]={...s.data.roles[e],...a.role})}else s.data.roles.push(a.role)}w(),H(),E(O(`تم حفظ الدور بنجاح.`,`Role saved.`));return}if(t.id===`template-form`){let e=t.dataset.templateId,r=!!e,i=await L(r?`/api/templates/${e}`:`/api/templates`,{method:r?`PATCH`:`POST`,body:JSON.stringify(n)});if(i.template){if(s.data.templates||(s.data.templates=[]),r){let e=s.data.templates.findIndex(e=>e.id===i.template.id);e!==-1&&(s.data.templates[e]={...s.data.templates[e],...i.template})}else s.data.templates.push(i.template)}w(),H(),E(O(`تم حفظ القالب بنجاح.`,`Template saved.`));return}if(t.dataset.action===`update-profile`){if(n.calendarSystem){s.calendarSystem=n.calendarSystem;try{localStorage.setItem(`darc_calendar_system`,n.calendarSystem)}catch{}}let e=await L(`/api/users/me`,{method:`PATCH`,body:JSON.stringify(n)});if(e.user){s.data.user={...s.data.user,...e.user};let t=(s.data.users||[]).findIndex(e=>e.id===s.data.user.id);t!==-1&&(s.data.users[t]={...s.data.users[t],...e.user})}H(),E(O(`تم حفظ وتحديث الملف الشخصي بنجاح.`,`Profile updated successfully.`)),r&&(r.disabled=!1);return}if(t.dataset.action===`update-company`){let e=await L(`/api/company`,{method:`PATCH`,body:JSON.stringify(n)});e.company&&(s.data.company={...s.data.company,...e.company}),H(),E(O(`تم تحديث بيانات الشركة.`,`Company data updated.`)),r&&(r.disabled=!1);return}if(t.dataset.action===`change-password`){if(n.newPassword.length<10)throw Error(O(`كلمة المرور يجب أن تكون 10 أحرف على الأقل.`,`Password must be at least 10 characters.`));await L(`/api/auth/change-password`,{method:`POST`,body:JSON.stringify(n)}),t.reset(),E(O(`تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.`,`Password changed successfully. Signed out of other devices.`)),r&&(r.disabled=!1);return}}catch(e){t.id===`activation-form`?We(n.token,e.message):E(e.message,!0)}finally{r&&(r.disabled=!1,r.classList.remove(`is-loading`))}}async function kn(e){let t=document.getElementById(`mention-dropdown`),n=document.getElementById(`project-menu`);if(t&&!e.target.closest(`#mention-dropdown`)&&!e.target.closest(`input[name="content"]`)&&(t.style.display=`none`),n&&!e.target.closest(`#project-menu`)&&!e.target.closest(`[data-action="toggle-project-menu"]`)&&(n.style.display=`none`),e.target.classList.contains(`modal-backdrop`)){w();return}if(e.target.closest(`#task-dropzone`)&&e.target.id!==`task-upload-input`){let e=document.getElementById(`upload-progress-container`);if(!e||e.style.display===`none`){let e=document.getElementById(`task-upload-input`);e&&e.click()}return}let r=e.target.closest(`[data-action], [data-view]`);if(!r)return;let i=r.dataset.action;if(r.classList.contains(`menu-item`)){let e=r.closest(`.dropdown-menu`);e&&(e.style.display=`none`)}if(r.dataset.view)U(r.dataset.view,r.dataset.projectId||void 0);else if(i===`trigger-avatar-upload`){let e=document.getElementById(`user-avatar-file-input`);e&&e.click()}else if(i===`trigger-company-logo-upload`){let e=document.getElementById(`company-logo-file-input`);e&&e.click()}else if(i===`toggle-theme`)s.theme=s.theme===`dark`?`light`:`dark`,pe({theme:s.theme}),document.documentElement.dataset.theme=s.theme,document.querySelectorAll(`[data-action="toggle-theme"]`).forEach(e=>{e.textContent=s.theme===`dark`?`☀️`:`🌙`});else if(i===`toggle-lang`){if(s.lang=s.lang===`ar`?`en`:`ar`,pe({lang:s.lang}),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang===`ar`?`rtl`:`ltr`,document.body.classList.toggle(`is-ltr`,s.lang===`en`),s.data)V();else{let e=new URLSearchParams(window.location.hash.replace(/^#/,``));e.get(`activate`)?We(e.get(`activate`)):e.get(`reset`)?Ge(e.get(`reset`)):G(``,document.getElementById(`forgot-form`)?`forgot`:`login`)}}else if(i===`quick-fill-login`){let e=r.closest(`[data-action="quick-fill-login"]`),t=document.getElementById(`login-email`),n=document.getElementById(`login-password`);if(t&&e?.dataset?.email&&(t.value=e.dataset.email),n&&e?.dataset?.pass&&(n.value=e.dataset.pass),e?.dataset?.autosubmit===`true`){let t=document.getElementById(`login-form`);if(t){let n=()=>typeof window<`u`&&window.turnstile&&window._turnstileWidgetId!==void 0?window.turnstile.getResponse(window._turnstileWidgetId):null,r=()=>{typeof t.requestSubmit==`function`?t.requestSubmit():t.dispatchEvent(new Event(`submit`,{cancelable:!0,bubbles:!0}))};if(!n()&&typeof window<`u`&&window.turnstile){e.disabled=!0;let t=e.innerHTML;e.innerHTML=`<span>⏳ ${O(`جاري التحقق من أمان المتصفح...`,`Verifying browser security...`)}</span>`;let i=0,a=setInterval(()=>{i++,(n()||i>20)&&(clearInterval(a),e.disabled=!1,e.innerHTML=t,r())},100);return}r()}}}else if(i===`goto-forgot`)e.preventDefault(),typeof history<`u`&&history.replaceState&&history.replaceState(null,``,`#forgot`),G(``,`forgot`);else if(i===`goto-login`)e.preventDefault(),typeof history<`u`&&history.replaceState&&history.replaceState(null,``,`#login`),G();else if(i===`reset-demo-sandbox`)try{E(O(`جاري إعادة ضبط بيانات العرض التجريبي...`,`Resetting demo sandbox...`),!1);let e=await L(`/api/demo/reset`,{method:`POST`});e&&e.data&&(s.data=e.data,b(e.data),V(),E(O(`تمت إعادة ضبط البيانات بنجاح ✨`,`Demo data reset successfully ✨`),!1))}catch(e){E(e.message,!0)}else if(i===`toggle-sidebar`)s.sidebarOpen=!s.sidebarOpen,document.querySelector(`.sidebar`)?.classList.toggle(`open`,s.sidebarOpen);else if(i===`logout`){typeof localStorage<`u`&&localStorage.removeItem(`darc_token`),typeof window<`u`&&typeof window.disconnectSupabaseRealtime==`function`&&window.disconnectSupabaseRealtime(`logout`),await L(`/api/auth/logout`,{method:`POST`}).catch(()=>{});try{await C()}catch{try{localStorage.removeItem(`darc_offline_bootstrap`),localStorage.removeItem(`darc_offline_queue`)}catch{}}Pe(),s.data=null,s.view=`login`,typeof history<`u`&&history.replaceState?history.replaceState(null,``,`#login`):typeof window<`u`&&(window.location.hash=`#login`),G()}else if(i===`logout-all`){typeof localStorage<`u`&&localStorage.removeItem(`darc_token`),typeof window<`u`&&typeof window.disconnectSupabaseRealtime==`function`&&window.disconnectSupabaseRealtime(`logout_all`),await L(`/api/auth/logout-all`,{method:`POST`}).catch(()=>{});try{await C()}catch{try{localStorage.removeItem(`darc_offline_bootstrap`),localStorage.removeItem(`darc_offline_queue`)}catch{}}Pe(),s.data=null,s.view=`login`,typeof history<`u`&&history.replaceState?history.replaceState(null,``,`#login`):typeof window<`u`&&(window.location.hash=`#login`),G()}else if(i===`open-omnisearch`)yn();else if(i===`close-omnisearch`)bn();else if(i===`open-cheatsheet`)Tn();else if(i===`close-modal`)w();else if(i===`show-notifications`)showNotifications();else if(i===`read-notification`){let e=r.dataset.notificationId,t=(s.data?.notifications||[]).find(t=>t.id===e);try{if(await L(`/api/notifications/${e}`,{method:`PATCH`,body:JSON.stringify({})}),t&&(t.read=!0),w(),t?.taskId){let e=(s.data?.tasks||[]).find(e=>e.id===t.taskId);if(e){openTaskModal(e);return}}if(t?.projectId){U(`project-detail`,t.projectId);return}await W()}catch(e){E(e.message,!0)}}else if(i===`mark-all-notifications-read`)try{await L(`/api/notifications/read-all`,{method:`POST`}),(s.data?.notifications||[]).forEach(e=>{e.read=!0,e.readAt=new Date().toISOString()}),showNotifications(),V(),E(O(`تم تحديد كافة التنبيهات كمقروءة.`,`All notifications marked as read.`))}catch(e){E(e.message,!0)}else if(i===`toggle-project-menu`)n&&(n.style.display=n.style.display===`none`?`block`:`none`);else if(i===`preview-doc`){let e=r.dataset.docId||r.closest(`[data-doc-id]`)?.dataset.docId;e&&wt(e)}else if(i===`copy-doc-link`){let e=r.dataset.docId||r.closest(`[data-doc-id]`)?.dataset.docId,t=s.data?.documents?.find(t=>t.id===e);if(t){let e=t.viewLink||t.downloadLink||(t.driveFileId?`https://drive.google.com/file/d/${t.driveFileId}/view`:``);if((!e||e.startsWith(`file://`)||e.startsWith(`/`))&&(e=`${window.location.origin}/api/documents/${t.id}`),e)try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(e);else{let t=document.createElement(`textarea`);t.value=e,document.body.appendChild(t),t.select(),document.execCommand(`copy`),t.remove()}E(O(`تم نسخ رابط الملف إلى الحافظة بنجاح.`,`Document link copied to clipboard.`))}catch{window.prompt(O(`انسخ رابط الملف من هنا:`,`Copy document link:`),e)}else E(O(`لا يوجد رابط متاح لهذا الملف.`,`No link available for this document.`),!0)}}else if(i===`trigger-upload`){let e=document.getElementById(`upload-progress-container`);if(!e||e.style.display===`none`){let e=document.getElementById(`task-upload-input`);e&&e.click()}}else if(i===`open-upload-drawing-modal`)typeof openUploadDrawingModal==`function`?openUploadDrawingModal(r.dataset.projectId||null):typeof window.openUploadDrawingModal==`function`&&window.openUploadDrawingModal(r.dataset.projectId||null);else if(i===`new-project`)openProjectModal();else if(i===`edit-project`){let e=s.data.projects.find(e=>e.id===r.dataset.projectId);e&&openProjectModal(e)}else if(i===`clone-project`){let e=s.data.projects.find(e=>e.id===r.dataset.projectId);e&&openCloneModal(e)}else if(i===`rename-doc`){let e=r.dataset.docId,t=s.data?.documents?.find(t=>t.id===e);if(!t)return;let n=window.prompt(O(`أدخل الاسم الجديد:`,`Enter new name:`),t.originalName);if(!n||n===t.originalName)return;try{await L(`/api/documents/${e}`,{method:`PATCH`,body:JSON.stringify({originalName:n})}),t.originalName=n,await W(!0);let r=s.data?.tasks?.find(e=>e.id===t.taskId);if(r){let e=document.getElementById(`task-documents-list`);e&&(e.innerHTML=Ct(r))}}catch(e){E(e.message,!0)}}else if(i===`go-to-trash`)s.settingsSection=`trash`,s.trashLoaded=!1,U(`settings`);else if(i===`delete-doc`){if(!window.confirm(O(`هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.`,`Are you sure you want to move this document to trash? You can restore it within 30 days.`)))return;let e=r.dataset.docId,t=s.data?.documents?.find(t=>t.id===e)?.taskId;try{if(await L(`/api/documents/${e}`,{method:`DELETE`}),s.data?.documents&&(s.data.documents=s.data.documents.filter(t=>t.id!==e)),s.trashLoaded=!1,await W(!0),E(O(`تم نقل المستند إلى سلة المهملات بنجاح.`,`Document moved to trash successfully.`)),t){let e=s.data?.tasks?.find(e=>e.id===t);if(e){let t=document.getElementById(`task-documents-list`);t&&(t.innerHTML=Ct(e))}}}catch(e){E(e.message,!0)}}else if(i===`delete-project`){if(!window.confirm(O(`هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.`,`Are you sure you want to delete this project? It will be archived.`)))return;let e=[...s.data.projects||[]];s.data.projects=s.data.projects.filter(e=>e.id!==r.dataset.projectId),w(),U(`projects`),E(O(`جاري حذف المشروع...`,`Deleting project...`));try{await L(`/api/projects/${r.dataset.projectId}`,{method:`DELETE`}),s.trashLoaded=!1,typeof navigator<`u`&&navigator.onLine&&await W(!0),E(O(`تم حذف المشروع بنجاح.`,`Project deleted successfully.`))}catch(t){s.data.projects=e,H(),E(t.message,!0)}}else if(i===`delete-task`){if(!window.confirm(O(`هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.`,`Are you sure you want to delete this task? It will be moved to trash.`)))return;let e=r.dataset.taskId,t=[...s.data.tasks||[]];s.data.tasks=s.data.tasks.filter(t=>t.id!==e),w(),H(),E(O(`جاري حذف المهمة...`,`Deleting task...`));try{await L(`/api/tasks/${e}`,{method:`DELETE`}),s.trashLoaded=!1,typeof navigator<`u`&&navigator.onLine&&await W(!0),E(O(`تم حذف المهمة بنجاح.`,`Task deleted successfully.`))}catch(e){s.data.tasks=t,H(),E(e.message,!0)}}else if(i===`edit-task-comment`){let e=r.dataset.commentId,t=r.dataset.taskId,n=(s.data.comments||[]).find(t=>t.id===e);if(!n)return;let i=window.prompt(O(`تعديل التعليق:`,`Edit comment:`),n.content);if(i===null)return;let a=i.trim();if(!a){E(O(`لا يمكن ترك التعليق فارغاً.`,`Comment cannot be empty.`),!0);return}if(a===n.content)return;try{let n=await L(`/api/tasks/${t}/comments/${e}`,{method:`PATCH`,body:JSON.stringify({content:a})});if(n.comment){let r=(s.data.comments||[]).findIndex(t=>t.id===e);r!==-1&&(s.data.comments[r]=n.comment);let i=(s.data.tasks||[]).find(e=>e.id===t),a=document.getElementById(`task-comments-list`);a&&i&&(a.innerHTML=renderTaskComments(i)),E(O(`تم تعديل التعليق بنجاح.`,`Comment updated successfully.`))}}catch(e){E(e.message,!0)}}else if(i===`delete-task-comment`){let e=r.dataset.commentId,t=r.dataset.taskId;if(!window.confirm(O(`هل أنت متأكد من حذف هذا التعليق؟`,`Are you sure you want to delete this comment?`)))return;try{await L(`/api/tasks/${t}/comments/${e}`,{method:`DELETE`}),s.data.comments&&(s.data.comments=s.data.comments.filter(t=>t.id!==e));let n=(s.data.tasks||[]).find(e=>e.id===t),r=document.getElementById(`task-comments-list`);r&&n&&(r.innerHTML=renderTaskComments(n)),E(O(`تم حذف التعليق بنجاح.`,`Comment deleted successfully.`))}catch(e){E(e.message,!0)}}else if(i===`manual-sync`){if(typeof navigator<`u`&&!navigator.onLine){E(O(`أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡`,`You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡`),!1);return}let e=re();if(!e.length){E(O(`جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️`,`All data is completely synchronized with cloud server ✔️`),!1);return}E(O(`جاري مزامنة ${e.length} عمليات معلقة مع السيرفر...`,`Syncing ${e.length} pending actions with server...`),!1);let t=await oe(L);t.synced>0?(E(O(`تمت مزامنة ${t.synced} عمليات بنجاح! 🚀`,`Successfully synced ${t.synced} actions! 🚀`),!1),await Le()):t.failed>0&&E(O(`فشلت مزامنة ${t.failed} عمليات، يرجى المحاولة لاحقاً.`,`Failed to sync ${t.failed} actions, please try again.`),!0)}else if(i===`new-task`)openTaskModal(null,null,r.dataset.projectId);else if(i===`new-user`)openUserModal();else if(i===`new-role`)openRoleModal();else if(i===`new-template`)openTemplateModal();else if(i===`edit-template`){let e=s.data.templates.find(e=>e.id===r.dataset.templateId);e&&openTemplateModal(e)}else if(i===`delete-template`){if(!window.confirm(O(`هل أنت متأكد من حذف هذا القالب؟`,`Are you sure you want to delete this template?`)))return;let e=[...s.data.templates||[]];s.data.templates=s.data.templates.filter(e=>e.id!==r.dataset.templateId),H(),w();try{await L(`/api/templates/${r.dataset.templateId}`,{method:`DELETE`}),await W(!0),E(O(`تم حذف القالب.`,`Template deleted.`))}catch(t){s.data.templates=e,H(),E(t.message,!0)}}else if(i===`open-project`)s.projectTab=`tasks`,s.projectMemberFilter=null,U(`project-detail`,r.dataset.projectId);else if(i===`filter-by-member`){let e=r.dataset.memberId;s.projectMemberFilter=s.projectMemberFilter===e?null:e,s.projectTab=`tasks`,requestAnimationFrame(()=>H())}else if(i===`clear-member-filter`)s.projectMemberFilter=null,requestAnimationFrame(()=>H());else if(i===`back-to-projects`)s.projectMemberFilter=null,U(`projects`,null);else if(i===`project-tab`){s.projectTab=r.dataset.tab;try{if(typeof window<`u`&&s.activeProjectId&&(window._isInternalNav=!0,window.location.hash=`project-detail?id=${encodeURIComponent(s.activeProjectId)}&tab=${encodeURIComponent(s.projectTab)}`),typeof sessionStorage<`u`){let e=sessionStorage.getItem(`darc_last_route`),t=e?JSON.parse(e):{};t.view=`project-detail`,t.activeProjectId=s.activeProjectId,t.projectTab=s.projectTab,sessionStorage.setItem(`darc_last_route`,JSON.stringify(t))}}catch{}r.closest(`.detail-tabs`)?.querySelectorAll(`.detail-tab`).forEach(e=>e.classList.toggle(`active`,e===r));let e=document.getElementById(`main-content`);e&&(e.scrollTop=0),requestAnimationFrame(()=>H())}else if(i===`toggle-timeline-view`)s.timelineView=r.dataset.viewMode||`gantt`,requestAnimationFrame(()=>H());else if(i===`prev-calendar-month`){let e=s.calendarDate?new Date(s.calendarDate):new Date;e.setMonth(e.getMonth()-1),s.calendarDate=e,requestAnimationFrame(()=>H())}else if(i===`next-calendar-month`){let e=s.calendarDate?new Date(s.calendarDate):new Date;e.setMonth(e.getMonth()+1),s.calendarDate=e,requestAnimationFrame(()=>H())}else if(i===`today-calendar-month`)s.calendarDate=new Date,requestAnimationFrame(()=>H());else if(i===`open-task`){if(window._justDroppedAt&&Date.now()-window._justDroppedAt<250)return;let e=s.data.tasks.find(e=>e.id===r.dataset.taskId);e&&openTaskModal(e)}else if(i===`task-filter`)s.taskFilter=r.dataset.filter,r.closest(`.view-toolbar-start`)?.querySelectorAll(`.filter-tab`).forEach(e=>e.classList.toggle(`active`,e===r)),requestAnimationFrame(()=>H());else if(i===`template-category`)s.templateCategory=r.dataset.category,requestAnimationFrame(()=>H());else if(i===`use-template`){if(!s.data.projects.length)return E(D(`noProjects`),!0);openTaskModal(null,r.dataset.templateId,s.activeProjectId)}else if(i===`open-user`){let e=s.data.users.find(e=>e.id===r.dataset.userId);e&&openUserModal(e)}else if(i===`impersonate-user`){if(!window.confirm(`هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً.`))return;try{let e=await L(`/api/users/${r.dataset.userId}/impersonate`,{method:`POST`});e&&e.token&&typeof localStorage<`u`&&localStorage.setItem(`darc_token`,e.token),window.location.reload()}catch(e){E(e.message,!0)}}else if(i===`force-password-user`){let e=s.data.users.find(e=>e.id===r.dataset.userId);e&&openForcePasswordModal(e)}else if(i===`invite-user`)try{let e=await L(`/api/users/${r.dataset.userId}/invite`,{method:`POST`});await W(),E(e.emailConfigured?O(`تم إرسال الدعوة.`,`Invitation sent.`):O(`تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.`,`Invite prepared, but the email provider is not configured.`))}catch(e){E(e.message,!0)}else if(i===`deactivate-user`){if(!window.confirm(D(`confirmDeactivate`)))return;let e=r.dataset.userId,t=s.data.users.find(t=>t.id===e),n=t?t.status:null;t&&(t.status=`inactive`),H(),w();try{await L(`/api/users/${e}`,{method:`DELETE`}),await W(!0),E(O(`تم تعطيل الحساب.`,`Account deactivated.`))}catch(e){t&&(t.status=n),H(),E(e.message,!0)}}else if(i===`settings-section`){s.settingsSection=r.dataset.section||`profile`;try{if(typeof window<`u`&&(window._isInternalNav=!0,window.location.hash=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof sessionStorage<`u`){let e=sessionStorage.getItem(`darc_last_route`),t=e?JSON.parse(e):{};t.view=`settings`,t.settingsSection=s.settingsSection,sessionStorage.setItem(`darc_last_route`,JSON.stringify(t))}}catch{}r.closest(`.settings-nav`)?.querySelectorAll(`.settings-nav-item`).forEach(e=>e.classList.toggle(`active`,e===r)),s.settingsSection===`trash`&&!s.trashLoaded&&L(`/api/trash`).then(e=>{s.trash=Array.isArray(e)?e:e.trash||[...(e.projects||[]).map(e=>({...e,type:`project`})),...(e.tasks||[]).map(e=>({...e,type:`task`})),...(e.documents||[]).map(e=>({...e,type:`document`}))],s.trashLoaded=!0,H()}).catch(e=>console.error(e)),requestAnimationFrame(()=>H())}else if(i===`restore-item`)try{await L(`/api/restore/${r.dataset.type}/${r.dataset.id}`,{method:`POST`});let e=await L(`/api/trash`);s.trash=Array.isArray(e)?e:e.trash||[...(e.projects||[]).map(e=>({...e,type:`project`})),...(e.tasks||[]).map(e=>({...e,type:`task`})),...(e.documents||[]).map(e=>({...e,type:`document`}))],await W(),E(O(`تمت الاستعادة بنجاح.`,`Restored successfully.`))}catch(e){E(e.message,!0)}else if(i===`filter-trash`)s.trashFilter=r.dataset.filter,requestAnimationFrame(()=>H());else if(i===`purge-trash-item`){let e=r.dataset.type,t=r.dataset.id;if(!window.confirm(O(`هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.`,`Are you sure you want to permanently delete this item? This action cannot be undone.`)))return;try{await L(`/api/trash/${e}/${t}`,{method:`DELETE`});let n=await L(`/api/trash`);s.trash=Array.isArray(n)?n:n.trash||[...(n.projects||[]).map(e=>({...e,type:`project`})),...(n.tasks||[]).map(e=>({...e,type:`task`})),...(n.documents||[]).map(e=>({...e,type:`document`}))],H(),E(O(`تم حذف العنصر نهائياً بنجاح.`,`Item permanently deleted.`))}catch(e){E(e.message,!0)}}else if(i===`empty-trash`){if(!window.confirm(O(`هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.`,`Are you sure you want to empty the entire recycle bin? All items will be permanently erased.`)))return;try{await L(`/api/trash/empty`,{method:`DELETE`}),s.trash=[],H(),E(O(`تم إفراغ سلة المهملات بالكامل بنجاح.`,`Trash bin emptied successfully.`))}catch(e){E(e.message,!0)}}else if(i===`open-role`){let e=s.data.roles.find(e=>e.id===r.dataset.roleId);e&&openRoleModal(e)}else if(i===`delete-role`){if(!window.confirm(D(`confirmDeleteRole`)))return;let e=r.dataset.roleId,t=[...s.data.roles||[]];s.data.roles=s.data.roles.filter(t=>t.id!==e),H(),w();try{await L(`/api/roles/${e}`,{method:`DELETE`}),await W(!0),E(O(`تم حذف الدور.`,`Role deleted.`))}catch(e){s.data.roles=t,H(),E(e.message,!0)}}else if(i===`export-csv`){if(!F(`export_reports`)&&!I()){E(O(`ليس لديك صلاحية لتصدير التقارير.`,`You do not have permission to export reports.`),!0);return}Wt()}else if(i===`print-portfolio-pdf`){if(!F(`export_reports`)&&!I()){E(O(`ليس لديك صلاحية لطباعة التقارير.`,`You do not have permission to print reports.`),!0);return}qt()}else if(i===`export-project`){if(!F(`export_reports`)&&!I()){E(O(`ليس لديك صلاحية لتصدير التقارير.`,`You do not have permission to export reports.`),!0);return}Gt(r.dataset.projectId)}else if(i===`export-project-pdf`){if(!F(`export_reports`)&&!I()){E(O(`ليس لديك صلاحية لتصدير التقارير.`,`You do not have permission to export reports.`),!0);return}Kt(r.dataset.projectId,!1)}else if(i===`export-project-client-pdf`){if(!F(`export_reports`)&&!I()){E(O(`ليس لديك صلاحية لتصدير التقارير.`,`You do not have permission to export reports.`),!0);return}Kt(r.dataset.projectId,!0)}else if(i===`export-audit-xls`){if(!F(`view_audit_logs`)&&!I()){E(O(`ليس لديك صلاحية لتصدير سجل الرقابة.`,`You do not have permission to export audit logs.`),!0);return}ln()}else if(i===`print-audit-pdf`){if(!F(`view_audit_logs`)&&!I()){E(O(`ليس لديك صلاحية لطباعة سجل الرقابة.`,`You do not have permission to print audit logs.`),!0);return}un()}else i===`load-full-audit`?dn():i===`reset-audit-filters`&&(s.auditFilterAction=`all`,s.auditFilterEntity=`all`,s.auditFilterUser=`all`,s.auditSearchQuery=``,H())}var An=null;function jn(e){if(e.target.name===`content`&&e.target.closest(`#task-comment-form`)){let t=e.target.value,n=t.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/),r=document.getElementById(`mention-dropdown`);if(n){let i=n[1].toLowerCase(),a=(s.data?.users||[]).filter(e=>e.status!==`inactive`).filter(e=>`${e.name||``} ${e.nameEn||``} ${e.email||``}`.toLowerCase().includes(i));a.length?(r.innerHTML=a.map(e=>{let t=(e.name||e.nameEn||e.email||`user`).trim().split(/\s+/)[0];return`
            <div class="mention-option" data-username="${k(t)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${M(e,`avatar-sm`)}
              <span style="font-size:12px;">${k(O(e.name,e.nameEn||e.name))}</span>
            </div>
          `}).join(``),r.style.display=`block`,r.querySelectorAll(`.mention-option`).forEach(n=>{n.onclick=()=>{let i=n.dataset.username;e.target.value=t.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/,`@${i} `),r.style.display=`none`,e.target.focus()}})):r.style.display=`none`}else r.style.display=`none`}if(e.target.dataset.action===`search-trash-input`){s.trashQuery=e.target.value;let t=e.target.selectionStart;clearTimeout(An),An=setTimeout(()=>{H();let e=document.querySelector(`[data-action="search-trash-input"]`);e&&(e.focus(),e.setSelectionRange(t,t))},120);return}if(e.target.dataset.action===`search-audit-input`){s.auditSearchQuery=e.target.value;let t=e.target.selectionStart;clearTimeout(An),An=setTimeout(()=>{H();let e=document.querySelector(`[data-action="search-audit-input"]`);e&&(e.focus(),e.setSelectionRange(t,t))},120);return}let t=e.target.dataset.search||(e.target.dataset.action===`search-documents`?`documents`:null);if(!t)return;s.searches[t]=e.target.value;let n=e.target.selectionStart;clearTimeout(An),An=setTimeout(()=>{H();let e=document.querySelector(`[data-search="${t}"], [data-action="search-documents"]`);e&&(e.focus(),e.setSelectionRange(n,n))},120)}async function Mn(e){if(e.target.dataset.action===`change-doc-status`){let t=e.target.dataset.docId,n=e.target.value,r=s.data?.documents?.find(e=>e.id===t);if(!r)return;try{await L(`/api/documents/${t}`,{method:`PATCH`,body:JSON.stringify({status:n})}),r.status=n,E(O(`تم تحديث حالة المخطط بنجاح ✅`,`Drawing status updated ✅`)),await W(!0)}catch(e){E(e.message,!0)}}else if(e.target.dataset.action===`doc-project-filter`)s.docProjectFilter=e.target.value,H();else if(e.target.dataset.action===`filter-project-docs-task`)s.docTaskFilter=e.target.value,H();else if(e.target.dataset.action===`filter-audit-action`)s.auditFilterAction=e.target.value,H();else if(e.target.dataset.action===`filter-audit-entity`)s.auditFilterEntity=e.target.value,H();else if(e.target.dataset.action===`filter-audit-user`)s.auditFilterUser=e.target.value,H();else if(e.target.dataset.action===`sort-project-tasks`||e.target.dataset.action===`sort-my-tasks`)ct(e.target.value),H();else if(e.target.name===`templateId`&&e.target.form?.id===`task-form`){let t=e.target.form,n=e.target.value,r=s.data.templates?.find(e=>e.id===n),i=t.querySelector(`input[name="titleAr"]`),a=t.querySelector(`input[name="titleEn"]`),o=t.querySelector(`#task-type-ar`),c=t.querySelector(`#task-type-en`),l=t.querySelector(`textarea[name="descriptionAr"]`);r?(i&&(!i.value||t.dataset.templateSelected===`true`)&&(i.value=r.nameAr),a&&(!a.value||t.dataset.templateSelected===`true`)&&(a.value=r.nameEn||``),o&&(o.value=r.typeAr||`مخطط`),c&&(c.value=r.typeEn||`Drawing`),l&&(!l.value||t.dataset.templateSelected===`true`)&&(l.value=r.descriptionAr||``),t.dataset.templateSelected=`true`):(o&&(o.value=``),c&&(c.value=``),delete t.dataset.templateSelected)}else if(e.target.name===`status`&&e.target.form?.id===`task-form`){let t=e.target.form.querySelector(`#task-auto-progress-badge`);if(t){let n={not_started:0,in_progress:50,review:80,approval:80,done:100}[e.target.value];t.textContent=n===void 0?``:`(${n}%)`}}else if(e.target.dataset.action===`task-project-filter`)s.taskProjectFilter=e.target.value,H();else if(e.target.dataset.action===`task-priority-filter`)s.taskPriorityFilter=e.target.value,H();else if(e.target.id===`sort-projects`||e.target.dataset?.action===`sort-projects`)s.projectSort=e.target.value,H();else if(e.target.id===`task-upload-input`){let t=e.target.files;if(!t.length)return;let n=e.target.dataset.taskId;zn(t,n)}else if(e.target.classList.contains(`doc-status-select`)){let t=e.target.dataset.docId,n=e.target.value;L(`/api/documents/${t}`,{method:`PATCH`,body:JSON.stringify({status:n})}).then(()=>{W(!0).then(()=>E(O(`تم تحديث حالة المخطط.`,`Document status updated.`)))}).catch(e=>E(e.message,!0))}else if(e.target.id===`user-avatar-file-input`){let t=e.target.files?.[0];if(!t)return;if(t.size>2621440){E(O(`حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.`,`Image is too large. Maximum allowed size is 2MB.`),!0),e.target.value=``;return}if(!t.type.startsWith(`image/`)){E(O(`يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).`,`Please select a valid image file (JPG, PNG, WebP).`),!0),e.target.value=``;return}try{E(O(`جاري معالجة ورفع صورتك الشخصية...`,`Processing & uploading avatar...`));let n=await Nn(t,256,256),r=await L(`/api/users/me`,{method:`PATCH`,body:JSON.stringify({avatarUrl:n})});if(r.user){s.data.user={...s.data.user,...r.user};let e=(s.data.users||[]).findIndex(e=>e.id===s.data.user.id);e!==-1&&(s.data.users[e]={...s.data.users[e],...r.user})}e.target.value=``,V(),je(),E(O(`تم تحديث صورتك الشخصية وتثبيتها بنجاح!`,`Avatar updated successfully!`))}catch(t){e.target.value=``,E(t.message,!0)}}else if(e.target.id===`company-logo-file-input`){let t=e.target.files?.[0];if(!t)return;if(t.size>3145728){E(O(`حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.`,`Logo is too large. Maximum allowed size is 3MB.`),!0),e.target.value=``;return}if(!t.type.startsWith(`image/`)){E(O(`يرجى اختيار ملف صورة أو شعار صالح.`,`Please select a valid logo image file.`),!0),e.target.value=``;return}try{E(O(`جاري معالجة ورفع شعار الشركة...`,`Uploading company logo...`));let n=await Nn(t,400,400),r=await L(`/api/company`,{method:`PATCH`,body:JSON.stringify({logoUrl:n})});r.company&&(s.data.company={...s.data.company,...r.company}),e.target.value=``,V(),je(),E(O(`تم تحديث وتثبيت شعار مساحة العمل بنجاح!`,`Company logo updated successfully!`))}catch(t){e.target.value=``,E(t.message,!0)}}}function Nn(e,t=300,n=300){return new Promise((r,i)=>{let a=new FileReader;a.onerror=()=>i(Error(O(`فشل قراءة ملف الصورة.`,`Failed to read image file.`))),a.onload=()=>{let e=new Image;e.onerror=()=>i(Error(O(`صيغة الصورة تالفة أو غير صالحة.`,`Corrupted or invalid image format.`))),e.onload=()=>{try{let a=e.naturalWidth||e.width,o=e.naturalHeight||e.height;if(a>4096||o>4096||a*o>16e6){i(Error(O(`أبعاد الصورة ضخمة جداً وغير آمنة (Pixel Flood Blocked). يرجى اختيار صورة قياسية.`,`Image dimensions too large (Pixel Flood Blocked). Please select a standard image.`)));return}let s=a,c=o;if(s>t||c>n){let e=Math.min(t/s,n/c);s=Math.round(s*e),c=Math.round(c*e)}let l=document.createElement(`canvas`);l.width=s,l.height=c;let u=l.getContext(`2d`);u.imageSmoothingEnabled=!0,u.imageSmoothingQuality=`high`,u.drawImage(e,0,0,s,c);let d=`image/webp`,f=l.toDataURL(d,.82);f.startsWith(`data:image/webp`)||(d=`image/jpeg`,f=l.toDataURL(d,.82)),f.length>184320&&(f=l.toDataURL(d,.65)),r(f)}catch{i(Error(O(`تعذر معالجة وضغط الصورة.`,`Failed to process and compress image.`)))}},e.src=a.result},a.readAsDataURL(e)})}function Pn({url:e,chunk:t,contentRange:n,headers:r={},onProgress:i}){return new Promise((a,o)=>{let s=new XMLHttpRequest;if(s.open(`PUT`,e,!0),e.includes(`/api/`)){s.withCredentials=!0;let e=typeof localStorage<`u`?localStorage.getItem(`darc_token`):null;e&&!r.Authorization&&s.setRequestHeader(`Authorization`,`Bearer ${e}`)}for(let[e,t]of Object.entries(r))s.setRequestHeader(e,t);n&&s.setRequestHeader(`Content-Range`,n),s.upload&&i&&(s.upload.onprogress=e=>{e.lengthComputable&&i(e.loaded)}),s.onload=()=>{a({status:s.status,ok:s.status>=200&&s.status<300,headers:{get:e=>s.getResponseHeader(e)},responseText:s.responseText,json:()=>{try{return JSON.parse(s.responseText)}catch{return{}}}})},s.onerror=()=>o(Error(`Network connection error`)),s.ontimeout=()=>o(Error(`Upload chunk timeout`)),s.timeout=18e4,s.send(t)})}async function Fn(e,t){try{let n=await Pn({url:e,chunk:new Blob([]),contentRange:`bytes */${t}`});if(n.status===308){let e=n.headers.get(`Range`);if(e){let t=e.match(/bytes=0-(\d+)/);if(t&&t[1])return parseInt(t[1],10)+1}return 0}if(n.ok)return{completed:!0,data:n.json()}}catch{}return null}var In=null;function Ln({projectName:e,taskName:t,totalFiles:n}){In&&=(clearTimeout(In),null);let r=document.getElementById(`floating-upload-manager`);if(r){r.style.opacity=`1`,r.style.transform=`none`;let n=r.querySelector(`#fum-proj-text`),i=r.querySelector(`#fum-task-text`);n&&e&&(n.textContent=e),i&&t&&(i.textContent=t)}else{r=document.createElement(`div`),r.id=`floating-upload-manager`,r.setAttribute(`dir`,s.lang===`ar`?`rtl`:`ltr`),r.style.cssText=`
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
          <strong id="fum-header-title" style="font-size:12.5px;color:var(--ink);">${O(`رفع الملفات في الخلفية`,`Background File Upload`)}</strong>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <button id="fum-minimize-btn" type="button" style="background:transparent;border:none;color:var(--ink-soft);cursor:pointer;padding:2px 6px;font-size:13px;line-height:1;border-radius:4px;" title="${O(`تصغير / توسيع`,`Minimize / Expand`)}">—</button>
          <button id="fum-close-btn" type="button" style="background:transparent;border:none;color:var(--ink-soft);cursor:pointer;padding:2px 6px;font-size:15px;line-height:1;border-radius:4px;display:none;" title="${O(`إغلاق`,`Close`)}">✕</button>
        </div>
      </div>
      <div id="fum-body" style="padding:12px 14px;display:flex;flex-direction:column;gap:9px;">
        <div style="display:flex;flex-direction:column;gap:3px;font-size:11.5px;color:var(--ink-soft);">
          <div style="display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <span style="color:var(--muted);">${O(`المشروع:`,`Project:`)}</span>
            <span id="fum-proj-text" style="color:var(--ink);font-weight:600;">${k(e||`—`)}</span>
          </div>
          <div style="display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <span style="color:var(--muted);">${O(`المهمة:`,`Task:`)}</span>
            <span id="fum-task-text" style="color:var(--ink-soft);">${k(t||`—`)}</span>
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
    `,document.body.appendChild(r);let i=r.querySelector(`#fum-minimize-btn`),a=r.querySelector(`#fum-body`);i.addEventListener(`click`,()=>{let e=a.style.display===`none`;a.style.display=e?`flex`:`none`,i.textContent=e?`—`:`+`}),r.querySelector(`#fum-close-btn`).addEventListener(`click`,()=>{r.remove()})}return r}function Rn({fileName:e,fileIndex:t,totalFiles:n,pct:r,loadedMB:i,fileSizeMB:a,speedMBs:o,etaText:s,statusNote:c,isError:l,isDone:u}){let d=document.getElementById(`floating-upload-manager`);if(!d)return;let f=d.querySelector(`#fum-file-text`),p=d.querySelector(`#fum-count-text`),m=d.querySelector(`#fum-progress-fill`),h=d.querySelector(`#fum-pct-text`),g=d.querySelector(`#fum-speed-text`),_=d.querySelector(`#fum-eta-text`),v=d.querySelector(`#fum-status-badge`),y=d.querySelector(`#fum-indicator`),b=d.querySelector(`#fum-header-title`),x=d.querySelector(`#fum-close-btn`);e&&f&&(f.textContent=e),p&&t&&n&&(p.textContent=`(${t}/${n})`),m&&typeof r==`number`&&(m.style.width=`${r}%`),h&&typeof r==`number`&&(h.textContent=`${r}%`),g&&i!==void 0&&a!==void 0&&(g.textContent=`${i} / ${a} MB • ${o||`0.0`} MB/s`),_&&s&&(_.textContent=`${O(`متبقي:`,`ETA:`)} ${s}`),c&&v?(v.style.display=`block`,v.textContent=c,v.style.background=l?`var(--red-soft)`:`var(--amber-soft)`,v.style.color=l?`var(--red)`:`var(--amber)`,v.style.border=l?`1px solid var(--red)`:`1px solid var(--amber)`):!l&&!u&&v&&(v.style.display=`none`),u&&(y&&(y.style.background=`var(--mint-strong)`,y.style.boxShadow=`0 0 10px var(--mint-strong)`),b&&(b.textContent=O(`اكتمل الرفع بنجاح! ✓`,`Upload Complete! ✓`)),h&&(h.textContent=`100%`),m&&(m.style.width=`100%`),x&&(x.style.display=`inline-block`),v&&(v.style.display=`block`,v.style.background=`var(--mint)`,v.style.color=`var(--teal-dark)`,v.style.border=`1px solid var(--mint-strong)`,v.textContent=O(`تم التوثيق والرفع إلى الخادم بنجاح.`,`Document saved & uploaded to server.`)),In=setTimeout(()=>{d&&d.parentNode&&(d.style.opacity=`0`,d.style.transform=`translateY(12px)`,setTimeout(()=>d.remove(),300))},4500)),l&&(y&&(y.style.background=`var(--red)`,y.style.boxShadow=`0 0 10px var(--red)`),b&&(b.textContent=O(`فشل في الرفع ✕`,`Upload Failed ✕`)),x&&(x.style.display=`inline-block`))}async function zn(e,t){if(!e||!e.length||!t)return;let n=s.data?.tasks?.find(e=>e.id===t);return Bn({files:e,taskId:t,projectId:n?.projectId,status:`draft`,isTaskModal:!0})}async function Bn({files:e,projectId:t=null,taskId:n=null,discipline:r=`عام`,status:i=`draft`,isTaskModal:a=!1}){if(!e||!e.length)return;if(typeof navigator<`u`&&!navigator.onLine){E(O(`لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.`,`Cannot upload drawings or files while offline. Please connect to the internet first.`),!0);return}let o=n?s.data?.tasks?.find(e=>e.id===n):null,c=t||o?.projectId,l=c?s.data?.projects?.find(e=>e.id===c):null,u=s.data?.documents?s.data.documents.filter(e=>!e.deletedAt&&(n?e.taskId===n:e.projectId===c)):[],d=l?l.nameAr:`Project`,f=o?o.titleAr:r||`General`,p={},m=e=>{if(p[e])return p[e];let t=0;return u.forEach(n=>{if(n.originalName&&n.originalName.toLowerCase().endsWith(e)){let e=n.originalName.match(/_v(\d+)\./);e&&parseInt(e[1])>t&&(t=parseInt(e[1]))}}),p[e]=t+1,t+1},h=document.getElementById(`upload-progress-container`);document.getElementById(`upload-progress-bar`),document.getElementById(`upload-progress-percent`),document.getElementById(`upload-progress-text`);let g=document.getElementById(`task-dropzone`);a&&h&&(h.style.display=`block`),a&&g&&(g.style.pointerEvents=`none`),Ln({projectName:d,taskName:f,totalFiles:e.length});let _=null,v=e=>(e.preventDefault(),e.returnValue=O(`جاري رفع ملفات هندسية كبيرة. مغادرة الصفحة ستوقف الرفع.`,`Uploading large engineering files. Leaving will abort upload.`),e.returnValue);if(typeof window<`u`&&(window.addEventListener(`beforeunload`,v),`wakeLock`in navigator))try{navigator.wakeLock.request(`screen`).then(e=>{_=e}).catch(()=>{})}catch{}try{for(let t=0;t<e.length;t++){let r=e[t];if(!r.size||r.size===0){E(O(`الملف "${r.name}" فارغ لا يحتوي على بيانات.`,`File "${r.name}" is empty.`),!0);continue}if(r.size>107374182400){E(O(`حجم الملف "${r.name}" يتجاوز الحد الأقصى المسموح (100GB).`,`File "${r.name}" exceeds 100GB limit.`),!0);continue}let o=r.name.split(`.`).pop()?.toLowerCase()||``;if([`exe`,`bat`,`cmd`,`sh`,`bash`,`ps1`,`vbs`,`js`,`mjs`,`cjs`,`py`,`php`,`phtml`,`html`,`htm`,`jar`,`msi`,`dll`,`com`,`scr`,`hta`,`svg`,`apk`].includes(o)||r.type===`image/svg+xml`){E(O(`صيغة الملف "${r.name}" غير مسموح بها لأسباب أمنية.`,`File type for "${r.name}" is not permitted for security reasons.`),!0);continue}let s=r.name.lastIndexOf(`.`),l=s===-1?``:r.name.substring(s).toLowerCase(),u=s===-1?r.name:r.name.substring(0,s),p=e=>(e||``).replace(/[/\\:*?"<>|\x00-\x1f\x7f-\x9f\u202A-\u202E\u2066-\u2069]/g,`-`).replace(/\s+/g,`_`).trim(),h=`${p(d)||`Project`}_${p(f)||`General`}_${p(u)||`Drawing`}_v${m(l)}${l}`,g=r.size>=1073741824?`${(r.size/1073741824).toFixed(2)} GB`:`${(r.size/1048576).toFixed(1)} MB`;Rn({fileName:r.name,fileIndex:t+1,totalFiles:e.length,pct:0,loadedMB:`0.0`,fileSizeMB:g,speedMBs:`0.0`,etaText:`...`,statusNote:O(`بدء جلسة الرفع المستأنف...`,`Starting resumable session...`)});let _=(await L(`/api/documents/session`,{method:`POST`,body:JSON.stringify({compiledName:h,mimeType:r.type||`application/octet-stream`,projectId:c,taskId:n,size:r.size})})).sessionUrl,v=8388608;v=r.size<=10485760?r.size:r.size<=104857600?8388608:r.size<=524288e3?16777216:r.size<=2147483648?33554432:67108864;let y=Date.now(),b=0,x=n=>{let i=Math.min(r.size,b+n),o=Math.min(100,Math.round(i/r.size*100)),s=i>=1073741824?`${(i/1073741824).toFixed(2)} GB`:`${(i/1048576).toFixed(1)} MB`;if(a){let n=document.getElementById(`upload-progress-bar`),a=document.getElementById(`upload-progress-percent`),c=document.getElementById(`upload-progress-text`),l=document.getElementById(`upload-progress-container`);l&&(l.style.display=`block`),n&&(n.style.width=`${o}%`),a&&(a.textContent=`${o}%`);let u=(Date.now()-y)/1e3,d=i/Math.max(u,.2),f=(d/1048576).toFixed(1),p=Math.max(0,r.size-i),m=Math.round(p/Math.max(d,1)),h=m<60?`${m} ${O(`ثانية`,`s`)}`:`${Math.floor(m/60)}:${String(m%60).padStart(2,`0`)} ${O(`دقيقة`,`min`)}`;c&&(c.textContent=`${O(`رفع إلى الخادم`,`Uploading to server`)} (${t+1}/${e.length}): ${r.name} — ${s} / ${g} (${o}%) • ${f} MB/s • ${O(`متبقي:`,`ETA:`)} ${h}`)}let c=(Date.now()-y)/1e3,l=i/Math.max(c,.2),u=(l/1048576).toFixed(1),d=Math.max(0,r.size-i),f=Math.round(d/Math.max(l,1)),p=f<60?`${f} s`:`${Math.floor(f/60)}m`;Rn({fileName:r.name,fileIndex:t+1,totalFiles:e.length,pct:o,loadedMB:s,fileSizeMB:g,speedMBs:u,etaText:p})};x(0);let S=0,C=null,ee=!1;for(;S<r.size;){let a=Math.min(S+v,r.size),o=r.slice(S,a),s=`bytes ${S}-${a-1}/${r.size}`,l=0,u=!1;for(;!u&&l<5;)try{let e;if(!ee)try{e=await Pn({url:_,chunk:o,contentRange:s,headers:{},onProgress:e=>x(e)})}catch(e){console.warn(`[Upload] Direct GDrive upload failed, trying backend proxy:`,e.message),ee=!0}if(ee){let t={projectId:c,taskId:n,compiledName:h,mimeType:r.type,size:r.size,status:i};e=await Pn({url:`${Me}/api/documents/chunk`,chunk:o,contentRange:s,headers:{"x-session-url":_,"x-doc-meta":encodeURIComponent(JSON.stringify(t))},onProgress:e=>x(e)})}if(e.status===308){let t=e.headers.get(`Range`);if(t){let e=t.match(/bytes=0-(\d+)/);S=e&&e[1]?parseInt(e[1],10)+1:a}else S=a;b=S,x(0),u=!0}else if(e.ok){let t=e.json();C=t.id||t.document?.id,b=r.size,x(0),S=r.size,u=!0;break}else throw Error(`Upload returned status ${e.status}`)}catch(n){if(l++,Rn({fileName:r.name,fileIndex:t+1,totalFiles:e.length,statusNote:`${O(`إعادة المحاولة`,`Retrying`)} (${l}/5)...`}),l>=5)throw Error(`${O(`فشل الرفع بعد محاولات متعددة`,`Upload failed after multiple retries`)}: ${n.message}`);await new Promise(e=>setTimeout(e,1e3*2**(l-1)));let i=await Fn(_,r.size);if(typeof i==`number`&&i>S){S=i,b=S;break}if(i&&i.completed){C=i.data?.id,S=r.size,u=!0;break}}}C&&!C.startsWith(`doc_`)&&await L(`/api/documents/finalize`,{method:`POST`,body:JSON.stringify({driveFileId:C,projectId:c,taskId:n,compiledName:h,mimeType:r.type,size:r.size,status:i})})}if(await W(!0),a&&n){let e=s.data?.tasks?.find(e=>e.id===n),t=document.getElementById(`task-documents-list`);t&&e&&(t.innerHTML=Ct(e))}je(),Rn({fileIndex:e.length,totalFiles:e.length,pct:100,isDone:!0}),E(O(`تم رفع المخطط وتوثيقه بنجاح إلى الخادم ✅`,`Drawing uploaded & registered successfully ✅`))}catch(e){Rn({isError:!0,statusNote:e.message}),E(e.message,!0)}finally{if(typeof window<`u`&&window.removeEventListener(`beforeunload`,v),_){try{_.release()}catch{}_=null}if(a){let e=document.getElementById(`upload-progress-container`),t=document.getElementById(`upload-progress-bar`),n=document.getElementById(`task-dropzone`);e&&(e.style.display=`none`),t&&(t.style.width=`0%`),n&&(n.style.pointerEvents=`auto`);let r=document.getElementById(`task-upload-input`);r&&(r.value=``)}}}typeof window<`u`&&!window._taskDropzoneListenersSet&&(window._taskDropzoneListenersSet=!0,document.addEventListener(`dragover`,e=>{let t=e.target.closest(`#task-dropzone`);t&&(e.preventDefault(),t.style.borderColor=`var(--brand-teal)`,t.style.background=`var(--teal-soft)`)}),document.addEventListener(`dragleave`,e=>{let t=e.target.closest(`#task-dropzone`);t&&(t.style.borderColor=`var(--border)`,t.style.background=`var(--surface-soft)`)}),document.addEventListener(`drop`,e=>{let t=e.target.closest(`#task-dropzone`);if(t){e.preventDefault(),t.style.borderColor=`var(--border)`,t.style.background=`var(--surface-soft)`;let n=t.dataset.taskId,r=e.dataTransfer?.files;r&&r.length&&zn(r,n)}}));async function Vn(){if(pe({theme:s.theme,lang:s.lang}),typeof window<`u`&&window.matchMedia&&!window._darcThemeListenerBound){window._darcThemeListenerBound=!0;try{window.matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,e=>{try{if(!localStorage.getItem(`darc-theme`)){s.theme=e.matches?`dark`:`light`,document.documentElement.dataset.theme=s.theme;let t=document.querySelector(`[data-action="toggle-theme"]`);t&&(t.textContent=s.theme===`dark`?`☀️`:`🌙`)}}catch{}})}catch{}}let e=typeof window<`u`?window.location.hash.replace(/^#/,``):``,t=new URLSearchParams(e.includes(`?`)?e.split(`?`)[1]:e.includes(`=`)?e:``),n=t.get(`activate`);if(n)return We(n);let r=t.get(`reset`);if(r)return Ge(r);if(e===`forgot`)return G(``,`forgot`);if(e===`login`)return G();try{if(e){let[t,n]=e.split(`?`);if([`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`,`project-detail`].includes(t)&&(s.view=t,n)){let e=new URLSearchParams(n);e.get(`id`)&&(s.activeProjectId=e.get(`id`)),e.get(`tab`)&&(s.projectTab=e.get(`tab`)),e.get(`section`)&&(s.settingsSection=e.get(`section`))}}else if(typeof sessionStorage<`u`){let e=sessionStorage.getItem(`darc_last_route`);if(e){let t=JSON.parse(e);t.view&&(s.view=t.view),t.activeProjectId&&(s.activeProjectId=t.activeProjectId),t.projectTab&&(s.projectTab=t.projectTab),t.settingsSection&&(s.settingsSection=t.settingsSection)}}}catch{}s.view===`settings`&&!s.settingsSection&&(s.settingsSection=`profile`);let i=x();i&&i.user?(s.data=i,R(s.view)||(s.view=z()),V()):ce();try{if(typeof navigator<`u`&&navigator.onLine&&re().length>0&&await oe(L),await Le(),!window._darcPollingActive){window._darcPollingActive=!0;let e=null,t=0,n=!1,r=Date.now(),i=0,a=()=>{let e=Date.now()-r>45e3;r=Date.now(),e&&Date.now()-i>4e3&&!n&&c()};if(typeof window<`u`){let e=0,t=()=>{let t=Date.now();t-e>5e3&&(e=t,a())};window.addEventListener(`click`,t,{passive:!0}),window.addEventListener(`keydown`,t,{passive:!0}),window.addEventListener(`touchstart`,t,{passive:!0}),window.addEventListener(`mousemove`,t,{passive:!0})}let o=()=>{e&&clearTimeout(e);let n=Date.now()-r>45e3?15e3:4e3,i=t>0?Math.min(25e3,n*2**t):n;e=setTimeout(c,i)},c=async()=>{if(typeof document<`u`&&document.hidden)o();else if(!s.data?.user||!s.view||s.view===`login`)o();else if(n)o();else{n=!0,i=Date.now();try{await Le(!0),t=0}catch{t++}finally{n=!1,o()}}};o(),typeof document<`u`&&document.addEventListener(`visibilitychange`,()=>{!document.hidden&&s.data?.user&&s.view&&s.view!==`login`&&(a(),c())})}}catch{typeof window<`u`&&(window.history&&window.history.replaceState?window.history.replaceState(null,``,`#login`):window.location.hash=`#login`),G()}}if(typeof window<`u`&&!window._hashChangeListenerSet&&(window._hashChangeListenerSet=!0,window.addEventListener(`hashchange`,()=>{if(window._isInternalNav){window._isInternalNav=!1;return}let e=window.location.hash.replace(/^#/,``);if(!e)return;let[t,n]=e.split(`?`);if(t===`login`){s.data?.user&&(s.data.user=null),G();return}if(t===`forgot`){G(``,`forgot`);return}let r=new URLSearchParams(n||(e.includes(`=`)?e:``));if(r.get(`activate`))We(r.get(`activate`));else if(r.get(`reset`))Ge(r.get(`reset`));else if([`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`,`project-detail`].includes(t)){if(s.data&&!R(t)){U(z());return}let e=s.activeProjectId;if(n){let t=new URLSearchParams(n);t.get(`id`)&&(e=t.get(`id`)),t.get(`tab`)&&(s.projectTab=t.get(`tab`)),t.get(`section`)&&(s.settingsSection=t.get(`section`))}s.view!==t||s.activeProjectId!==e?U(t,e):H()}})),typeof window<`u`&&!window._timelineScrollListenerSet){window._timelineScrollListenerSet=!0;let e=!1;document.addEventListener(`scroll`,t=>{t.target&&t.target.classList&&(t.target.classList.contains(`timeline-scroll`)||t.target.classList.contains(`gantt-scroll`)||t.target.classList.contains(`timeline-board`))&&(e||(e=!0,requestAnimationFrame(()=>{typeof drawTimelineArrows==`function`&&drawTimelineArrows(),e=!1})))},!0)}var J=null,Y=null;function Hn(){return J||(J=document.createElement(`div`),J.className=`drag-placeholder`,J.style.cssText=`
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
    `,J.innerHTML=`<span>↓ ${O(`الموقع الجديد للمهمة`,`Drop position`)}</span>`),J}function Un(){J&&J.parentNode&&J.parentNode.removeChild(J)}function Wn(e,t){let n=Array.from(e.querySelectorAll(`.task-card:not(.is-dragging)`));for(let e of n){let n=e.getBoundingClientRect();if(t<n.top+n.height/2)return e}return null}document.addEventListener(`dragstart`,e=>{let t=e.target.closest(`.task-card`);if(t){let n=(s.data?.tasks||[]).find(e=>e.id===t.dataset.taskId);if(!(I()||F(`edit_tasks`)||n&&n.assigneeId===s.data?.user?.id)){e.preventDefault();return}window._isDraggingTask=!0,Y=t.dataset.taskId,e.dataTransfer.effectAllowed=`move`;try{e.dataTransfer.setData(`text/plain`,Y)}catch{}t.classList.add(`is-dragging`)}}),document.addEventListener(`dragend`,e=>{let t=e.target.closest(`.task-card`);t&&t.classList.remove(`is-dragging`),window._isDraggingTask=!1,window._justDroppedTaskId=Y,window._justDroppedAt=Date.now(),Y=null,document.querySelectorAll(`.board-column`).forEach(e=>e.classList.remove(`drag-over`)),Un()}),document.addEventListener(`dragover`,e=>{let t=e.target.closest(`.board-column`);if(t){e.preventDefault(),e.dataTransfer.dropEffect=`move`,t.classList.add(`drag-over`);let n=document.querySelector(`.board, .board-columns, .tasks-board, [data-board]`);n&&(e.clientX<50?n.scrollLeft-=14:e.clientX>window.innerWidth-50&&(n.scrollLeft+=14));let r=t.querySelector(`.board-cards`);if(r){let t=Hn(),n=Wn(r,e.clientY);n?t.nextSibling!==n&&r.insertBefore(t,n):(!r.contains(t)||r.lastElementChild!==t)&&r.appendChild(t)}}}),document.addEventListener(`dragenter`,e=>{e.target.closest(`.board-column`)&&e.preventDefault()}),document.addEventListener(`dragleave`,e=>{let t=e.target.closest(`.board-column`);if(t){if(e.relatedTarget&&t.contains(e.relatedTarget))return;let n=t.getBoundingClientRect(),r=e.clientX,i=e.clientY;(r<=n.left||r>=n.right||i<=n.top||i>=n.bottom)&&(t.classList.remove(`drag-over`),Un())}});async function Gn(e,t,n=null){if(!e){Un();return}e.classList.remove(`drag-over`);let r=e.querySelector(`.board-cards`),i=null;if(J&&J.parentNode===r){let e=J.nextElementSibling;e&&e.classList.contains(`task-card`)&&e.dataset.taskId!==(n||Y)&&(i=e.dataset.taskId)}else if(r){let e=Wn(r,t);e&&e.dataset.taskId!==(n||Y)&&(i=e.dataset.taskId)}Un();let a=n||Y;Y=null;let o=e.dataset.status;if(!a||!o)return;let c=(s.data?.tasks||[]).find(e=>e.id===a);if(!c)return;if(!(c.status===o||o===`review`&&[`review`,`approval`,`blocked`].includes(c.status))&&o===`done`&&c.dependencies&&c.dependencies.length&&c.dependencies.filter(e=>{let t=s.data.tasks.find(t=>t.id===e);return t&&t.status!==`done`}).length)return E(O(`لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.`,`Cannot complete task before its dependencies.`),!0);s.projectTaskSort=`custom`,s.myTaskSort=`custom`,localStorage.setItem(`darc_task_sort_pref`,`custom`);let l=o===`review`?[`review`,`approval`,`blocked`]:[o],u=(s.data.tasks||[]).filter(e=>e.projectId===c.projectId&&(l.includes(e.status)||e.id===a)),d=u.findIndex(e=>e.id===a);d!==-1&&u.splice(d,1),u.sort((e,t)=>at(e)-at(t)),c.status=o;let f=u.length;if(i){let e=u.findIndex(e=>e.id===i);if(e===-1&&J&&J.parentNode){let t=J.nextElementSibling;for(;t;){if(t.classList?.contains(`task-card`)&&t.dataset.taskId){let n=u.findIndex(e=>e.id===t.dataset.taskId);if(n!==-1){e=n;break}}t=t.nextElementSibling}}e!==-1&&(f=e)}u.splice(f,0,c),u.forEach((e,t)=>{let n=(t+1)*100;e.sortOrder=n,e.sort_order=n,e.customFields={...e.customFields||{},sortOrder:n,sort_order:n},e.custom_fields={...e.custom_fields||{},sortOrder:n,sort_order:n}}),H();let p=document.querySelector(`.task-card[data-task-id="${a}"]`);p&&(p.classList.add(`just-dropped`),setTimeout(()=>p.classList.remove(`just-dropped`),400)),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,u.forEach(e=>{window._pendingReorderBatch.set(e.id,{id:e.id,status:e.status,sortOrder:e.sortOrder,customFields:e.customFields})}),window._reorderSyncTimer=setTimeout(()=>{let e=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),L(`/api/tasks/reorder`,{method:`PATCH`,body:JSON.stringify({items:e})}).catch(e=>{console.warn(`Reorder sync error:`,e),E(O(`فشل حفظ الترتيب الجديد في الخادم.`,`Failed to save task order to server.`),!0)})},150)}document.addEventListener(`drop`,async e=>{let t=e.target.closest(`.board-column`);e.preventDefault();let n=Y||(e.dataTransfer?e.dataTransfer.getData(`text/plain`):null);await Gn(t,e.clientY,n)});var X=null,Z=null,Kn=0,qn=0,Jn=0,Yn=0,Xn=null,Zn=!1;function Qn(){Xn&&=(clearTimeout(Xn),null),Z&&Z.parentNode&&Z.parentNode.removeChild(Z),Z=null,X&&(X.style.opacity=``,X.style.pointerEvents=``,X.classList.remove(`is-dragging`)),document.querySelectorAll(`.board-column`).forEach(e=>e.classList.remove(`drag-over`)),Un(),X=null,Zn=!1,Y=null}document.addEventListener(`touchstart`,e=>{if(e.touches.length!==1)return;let t=e.target.closest(`.task-card`);if(!t||e.target.closest(`button, a, input, select, textarea, .btn`))return;let n=(s.data?.tasks||[]).find(e=>e.id===t.dataset.taskId);if(!(I()||F(`edit_tasks`)||n&&n.assigneeId===s.data?.user?.id))return;X=t;let r=e.touches[0];Kn=r.clientX,qn=r.clientY,Zn=!1,Xn=setTimeout(()=>{if(!X)return;if(Zn=!0,Y=X.dataset.taskId,typeof navigator<`u`&&navigator.vibrate)try{navigator.vibrate(40)}catch{}let e=X.getBoundingClientRect();Jn=r.clientX-e.left,Yn=r.clientY-e.top,Z=X.cloneNode(!0),Z.id=`touch-drag-ghost`,Z.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: ${e.width}px;
      pointer-events: none;
      z-index: 10000;
      opacity: 0.95;
      transform: translate3d(${e.left}px, ${e.top}px, 0) scale(1.03) rotate(1.5deg);
      box-shadow: 0 16px 36px rgba(0,0,0,0.25);
      transition: transform 0.05s linear;
      border: 1px solid var(--teal, #0d9488);
      background: var(--surface, #ffffff);
      border-radius: 12px;
    `,document.body.appendChild(Z),X.classList.add(`is-dragging`),X.style.opacity=`0.25`,X.style.pointerEvents=`none`;let t=X.closest(`.board-column`);if(t){t.classList.add(`drag-over`);let e=t.querySelector(`.board-cards`);if(e){let t=Hn(),n=Wn(e,r.clientY);n&&t.nextSibling!==n?e.insertBefore(t,n):e.contains(t)||e.appendChild(t)}}},220)},{passive:!0}),document.addEventListener(`touchmove`,e=>{if(!X)return;let t=e.touches[0],n=Math.abs(t.clientX-Kn),r=Math.abs(t.clientY-qn);if(!Zn){(n>8||r>8)&&(Xn&&=(clearTimeout(Xn),null),X=null);return}if(e.cancelable&&e.preventDefault(),Z){let e=t.clientX-Jn,n=t.clientY-Yn;Z.style.transform=`translate3d(${e}px, ${n}px, 0) scale(1.03) rotate(1.5deg)`}let i=document.querySelector(`.board, .board-columns, .tasks-board, [data-board]`);i&&(t.clientX<45?i.scrollLeft-=12:t.clientX>window.innerWidth-45&&(i.scrollLeft+=12));let a=document.elementFromPoint(t.clientX,t.clientY)?.closest(`.board-column`);if(document.querySelectorAll(`.board-column`).forEach(e=>e.classList.toggle(`drag-over`,e===a)),a){let e=a.querySelector(`.board-cards`);if(e){let n=Hn(),r=Wn(e,t.clientY);r?n.nextSibling!==r&&e.insertBefore(n,r):(!e.contains(n)||e.lastElementChild!==n)&&e.appendChild(n)}}},{passive:!1}),document.addEventListener(`touchend`,async e=>{if(Xn&&=(clearTimeout(Xn),null),X){if(Zn){let t=e.changedTouches[0],n=document.elementFromPoint(t.clientX,t.clientY)?.closest(`.board-column`)||J&&J.closest(`.board-column`),r=Y;Z&&Z.parentNode&&Z.parentNode.removeChild(Z),Z=null,n&&r&&await Gn(n,t.clientY,r),Qn()}else Qn()}}),document.addEventListener(`touchcancel`,()=>{Qn()});var $n=`wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0`,er=typeof navigator<`u`&&!!navigator.connection?.saveData,tr=3e5,nr=er?1e4:3e4,rr=er?600:300,ir=25e3,ar=150,or=null,sr=!1,cr=!1,lr=null,Q=null,ur=null,dr=null,fr=null,pr=null,mr=0,hr=0,gr=!1,_r=Date.now(),vr=0,yr=null,$=new Map;function br(e){if(!e||typeof e!=`string`)return;let t=Date.now();$.set(e,t);for(let[e,n]of $.entries())t-n>8e3&&$.delete(e);if($.size>ar){let e=$.keys().next().value;e&&$.delete(e)}}function xr(){return typeof localStorage>`u`?!1:!!localStorage.getItem(`darc_token`)}var Sr=new Set([`__proto__`,`constructor`,`prototype`]),Cr=new Set([`custom_fields`,`permissions`,`details`]);function wr(e){if(typeof e!=`object`||!e)return e;if(Array.isArray(e))return e.map(wr);let t={};for(let[n,r]of Object.entries(e)){if(Sr.has(n))continue;let e=n.indexOf(`_`)===-1?n:n.replace(/_([a-z0-9])/g,(e,t)=>t.toUpperCase());Sr.has(e)||(t[e]=typeof r==`object`&&r&&!Cr.has(n)?wr(r):r)}return t}function Tr(e){if(typeof e!=`object`||!e)return e;if(Array.isArray(e))return e.map(Tr);let t={};for(let[n,r]of Object.entries(e))Sr.has(n)||(t[n]=typeof r==`object`&&r&&!Cr.has(n)?Tr(r):r);return t}function Er(e){if(!e||!s.data||!Array.isArray(s.data.tasks)||!Array.isArray(s.data.projects))return;let t=s.data.projects.find(t=>t.id===e);if(!t)return;let n=s.data.tasks.filter(t=>t.projectId===e&&!t.deletedAt&&!t.deleted_at),r=0,i=0;for(let e of n){let t=Number(e.weight)||1,n=Number(e.progress)||0;r+=t,i+=n/100*t}let a=r>0?Math.round(i/r*100):0;t.progress!==a&&(t.progress=a),t.totalWeight=r;let o=n.length>0,c=o&&n.every(e=>e.status===`done`||e.status===`completed`);o&&c&&a===100?t.lifecycle=`completed`:t.lifecycle===`completed`&&(!c||a<100)&&(t.lifecycle=`active`)}function Dr(){if(typeof document>`u`)return;let e=document.querySelector(`[data-action="show-notifications"]`);if(!e)return;let t=(s.data?.notifications||[]).filter(e=>!e.read&&!e.readAt).length,n=e.querySelector(`.notification-dot`);t>0?n||e.insertAdjacentHTML(`beforeend`,`<span class="notification-dot"></span>`):n&&n.remove()}function Or(){if(typeof window<`u`)try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!lr||lr.state===`closed`)&&(lr=new e),lr.state===`suspended`&&lr.resume().catch(()=>{});let t=lr,n=t.createOscillator(),r=t.createGain();n.type=`sine`,n.frequency.setValueAtTime(587.33,t.currentTime),n.frequency.exponentialRampToValueAtTime(880,t.currentTime+.15),r.gain.setValueAtTime(.06,t.currentTime),r.gain.exponentialRampToValueAtTime(.001,t.currentTime+.35),n.connect(r),r.connect(t.destination),n.start(),n.stop(t.currentTime+.36)}catch{}}function kr(){yr&&cancelAnimationFrame(yr),yr=requestAnimationFrame(()=>{yr=null,typeof H==`function`?H():typeof V==`function`&&V()})}function Ar(e,t,n,r){if(!s.data||!e||![`tasks`,`projects`,`comments`,`documents`,`notifications`].includes(e))return!1;let i=n?Tr(wr(n)):null,a=r?Tr(wr(r)):null,o=i&&i.id||a&&a.id;if(!o)return!1;let c=$.get(o);if(c&&Date.now()-c<5e3)return!0;Array.isArray(s.data[e])||(s.data[e]=[]);let l=s.data[e],u=!1,d=!!(i?.deletedAt||i?.deleted_at);if(t===`DELETE`||d){let t=l.length,n=null;e===`tasks`&&(n=l.find(e=>e.id===o)?.projectId||a?.projectId||i?.projectId),s.data[e]=l.filter(e=>e.id!==o),s.data[e].length!==t&&(u=!0),e===`tasks`&&n?Er(n):e===`projects`?Array.isArray(s.data.tasks)&&(s.data.tasks=s.data.tasks.filter(e=>e.projectId!==o)):e===`notifications`&&Dr()}else if(t===`UPDATE`&&i){let t=l.findIndex(e=>e.id===o);if(t!==-1){for(let[e,n]of Object.entries(i))Sr.has(e)||(l[t][e]=n);u=!0}else l.unshift(i),u=!0;e===`tasks`?(i.projectId&&Er(i.projectId),a?.projectId&&a.projectId!==i.projectId&&Er(a.projectId)):e===`notifications`&&Dr()}else if(t===`INSERT`&&i){if(l.some(e=>e.id===o)||(l.unshift(i),u=!0),e===`tasks`&&i.projectId)Er(i.projectId);else if(e===`notifications`){let e=s.data?.user?.id;if(e&&i.userId===e&&!i.read){Dr();let e=i.content||(s.lang===`ar`?i.titleAr||i.title:i.titleEn||i.title||i.titleAr)||O(`إشعار جديد`,`New notification`);e&&E(`🔔 ${e}`,!1),Or()}}}if(u){Pe();let t=i?.taskId||a?.taskId;if(t){let n=(s.data?.tasks||[]).find(e=>e.id===t);if(n){if(e===`comments`){let e=document.getElementById(`task-comment-form`);if(e&&e.dataset.taskId===t){let e=document.getElementById(`task-comments-list`);e&&typeof St==`function`&&(e.innerHTML=St(n),e.scrollTop=e.scrollHeight)}}if(e===`documents`){let e=document.getElementById(`task-dropzone`);if(e&&e.dataset.taskId===t){let e=document.getElementById(`task-documents-list`);e&&typeof Ct==`function`&&(e.innerHTML=Ct(n))}}}}return kr(),!0}return!1}function jr(e=`realtime`){xr()&&(gr&&e!==`tab_visible`&&e!==`user_active`&&e!==`online`||typeof document<`u`&&document.hidden||s.data&&s.view&&(or&&clearTimeout(or),or=setTimeout(async()=>{try{await Le(!0)}catch(t){console.warn(`[Realtime] Sync error:`,String(e),t.message)}},rr)))}function Mr(e,t,n,r={}){e&&e.readyState===WebSocket.OPEN&&(mr++,e.send(JSON.stringify({topic:t,event:n,payload:r,ref:String(mr)})))}function Nr(e){Pr(),ur=setInterval(()=>{e&&e.readyState===WebSocket.OPEN&&Mr(e,`phoenix`,`heartbeat`)},ir)}function Pr(){ur&&=(clearInterval(ur),null)}function Fr(e=`disconnect`){if(cr=!0,Pr(),dr&&=(clearTimeout(dr),null),Q){try{Q.close(1e3,e)}catch{}Q=null}}function Ir(e=`idle`){gr||(gr=!0,Fr(e))}function Lr(e=`wake_up`){let t=gr;gr=!1,xr()&&(typeof navigator>`u`||navigator.onLine)&&((!Q||Q.readyState===WebSocket.CLOSED||Q.readyState===WebSocket.CLOSING)&&Rr(),(t||e===`tab_visible`)&&jr(e))}function Rr(){if(typeof WebSocket<`u`&&(typeof navigator>`u`||navigator.onLine)&&xr()&&!gr&&(!Q||Q.readyState!==WebSocket.CONNECTING&&Q.readyState!==WebSocket.OPEN)){cr=!1;try{let e=new WebSocket($n);Q=e,e.onopen=()=>{hr=0,Nr(e),Mr(e,`realtime:darc_live`,`phx_join`,{config:{broadcast:{ack:!1,self:!1}}}),[`tasks`,`projects`,`comments`,`documents`,`notifications`].forEach(t=>{Mr(e,`realtime:public:${t}`,`phx_join`,{config:{postgres_changes:[{event:`*`,schema:`public`,table:t}]}})})},e.onmessage=e=>{try{let{event:t,topic:n,payload:r}=JSON.parse(e.data);if(t===`phx_reply`||t===`phx_close`)return;if(t===`postgres_changes`&&r?.data){let{table:e,type:t,record:n,old_record:i}=r.data;if(Ar(e,t,n,i))return}if((t===`INSERT`||t===`UPDATE`||t===`DELETE`)&&n?.startsWith(`realtime:public:`)){let e=n.split(`:`)[2];if(Ar(e,t,r?.record||r?.new,r?.old_record||r?.old))return}if(n===`realtime:darc_live`&&(t===`broadcast`||t===`STATE_MUTATION`||t===`GRANULAR_DELTA`)){let e=r?.payload||r,t=e?.mutationId||e?.id||e?.entityId;if(t&&$.has(t))return;if(e?.delta){let{table:t,action:n,record:r,oldRecord:i}=e.delta;if(Ar(t,n,r,i))return}jr(`edge_broadcast`);return}(t===`broadcast`||n===`realtime:darc_live`||typeof n==`string`&&n.startsWith(`realtime:public:`))&&jr(`supabase_ws`)}catch{}},e.onerror=()=>{},e.onclose=e=>{if(Pr(),Q=null,!(cr||!xr()||gr)&&e?.reason!==`logout`&&e?.reason!==`unauthorized_401`&&typeof navigator<`u`&&navigator.onLine){hr++;let e=Math.min(3e4,2**Math.min(hr,5)*1e3);dr&&clearTimeout(dr),dr=setTimeout(()=>{Rr()},e)}}}catch(e){console.warn(`[Realtime] WebSocket init failed:`,e.message)}}}function zr(){let e=Date.now();e-vr>1e4&&(vr=e,_r=e,gr&&(typeof document>`u`||!document.hidden)&&Lr(`user_active`))}function Br(){fr&&clearInterval(fr),fr=setInterval(()=>{let e=Date.now();for(let[t,n]of $.entries())e-n>8e3&&$.delete(t);gr||typeof document<`u`&&document.hidden||Date.now()-_r>=tr&&Ir(`inactivity_idle`)},6e4)}function Vr(){if(!sr){if(sr=!0,xr()&&Rr(),Br(),typeof window<`u`&&([`pointerdown`,`keydown`,`scroll`,`touchstart`].forEach(e=>{window.addEventListener(e,zr,{passive:!0})}),window.addEventListener(`mousemove`,zr,{passive:!0})),typeof document<`u`&&document.addEventListener(`visibilitychange`,()=>{document.hidden?(pr&&clearTimeout(pr),pr=setTimeout(()=>{Ir(`tab_hidden`)},nr)):(pr&&=(clearTimeout(pr),null),_r=Date.now(),vr=Date.now(),Lr(`tab_visible`))}),typeof BroadcastChannel<`u`){let e=new BroadcastChannel(`darc_state_sync`);e.onmessage=e=>{if(e.data?.type===`GRANULAR_DELTA`&&e.data.delta){let{table:t,action:n,record:r,oldRecord:i}=e.data.delta;Ar(t,n,r,i)}else e.data?.type===`STATE_MUTATION`&&jr(`broadcast_channel`)},window._darcBroadcastChannel=e}window.addEventListener(`online`,async()=>{s.isOffline=!1,hr=0;let e=window.api,t=typeof window.choose==`function`?window.choose:(e=>e),n=typeof window.showToast==`function`?window.showToast:console.log;if(Lr(`online`),e){let r=await oe(e);r&&r.synced>0?n(t(`تمت استعادة الاتصال ومزامنة ${r.synced} عمليات معلقة بنجاح! 🚀`,`Internet restored! Synced ${r.synced} pending actions successfully! 🚀`),!1):n(t(`تمت استعادة الاتصال بالإنترنت`,`Internet connection restored`),!1)}jr(`online`)}),window.addEventListener(`offline`,()=>{if(s.isOffline=!0,hr=0,Ir(`offline`),typeof window.renderApp==`function`&&window.renderApp(),typeof window.showToast==`function`){let e=typeof window.choose==`function`?window.choose(`أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت`,`Offline Mode — you can continue working, changes will auto-sync on reconnect`):`أنت في وضع عدم الاتصال (Offline Mode)`;window.showToast(e,!0)}})}}function Hr(e=null){if(typeof window<`u`&&window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:e?`GRANULAR_DELTA`:`STATE_MUTATION`,delta:e,timestamp:Date.now()})}catch{}}typeof window<`u`&&(window.notifyStateMutation=Hr,window.disconnectSupabaseRealtime=Fr,window.recordRecentLocalMutation=br,window.recalculateProjectProgressInMemory=Er),document.documentElement.dataset.theme=s.theme,document.documentElement.lang=s.lang,document.documentElement.dir=s.lang===`ar`?`rtl`:`ltr`,s.lang===`en`?document.body.classList.add(`is-ltr`):document.body.classList.remove(`is-ltr`),Object.assign(window,se),Object.assign(window,Re),Object.assign(window,qe),Object.assign(window,Dt),Object.assign(window,nt),Object.assign(window,Yt),Object.assign(window,$t),Object.assign(window,nn),Object.assign(window,gn),Object.assign(window,Fe),Object.assign(window,Dn),Object.assign(window,ue),En(),document.addEventListener(`click`,e=>{handleClick(e).catch(e=>showToast(e.message,!0))}),document.addEventListener(`submit`,e=>{handleSubmit(e).catch(e=>showToast(e.message,!0))}),document.addEventListener(`input`,handleInput),document.addEventListener(`change`,handleChange),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&closeModal()});var Ur=null;window.addEventListener(`resize`,()=>{s.view===`project-detail`&&s.projectTab===`timeline`&&(Ur||=requestAnimationFrame(()=>{Ur=null,drawTimelineArrows()}))}),window.addEventListener(`error`,e=>{console.error(`Runtime Error:`,e.error),typeof showToast==`function`&&showToast(`خطأ برمجي: ${e.message}`,!0)}),`serviceWorker`in navigator&&window.location.protocol.startsWith(`http`)&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`/sw.js`).catch(e=>{console.warn(`[PWA] ServiceWorker registration skipped:`,e.message)})}),Vr(),init();