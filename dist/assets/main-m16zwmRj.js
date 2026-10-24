var e=Object.defineProperty,n=(n,r)=>{let i={};for(var a in n)e(i,a,{get:n[a],enumerable:!0});return r||e(i,Symbol.toStringTag,{value:`Module`}),i};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))r(e);new MutationObserver(e=>{for(let n of e)if(n.type===`childList`)for(let e of n.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&r(e)}).observe(document,{childList:!0,subtree:!0});function n(e){let n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),n.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,n}function r(e){if(e.ep)return;e.ep=!0;let r=n(e);fetch(e.href,r)}})();var r={lang:window.localStorage.getItem(`darc-locale`)||`ar`,theme:window.localStorage.getItem(`darc-theme`)||`light`,view:`dashboard`,activeProjectId:null,projectTab:`overview`,settingsSection:`company`,templateCategory:`all`,searches:{projects:``,tasks:``,templates:``,documents:``},taskFilter:`all`,taskProjectFilter:`all`,taskPriorityFilter:`all`,docTaskFilter:`all`,docProjectFilter:`all`,sidebarOpen:!1,isOffline:typeof navigator<`u`&&!navigator.onLine,data:null},i=`darc_offline_db`,a=1,o=`cache_store`,s=`darc_offline_bootstrap`,c=`darc_offline_mutations_queue`,l=!1,u=null;function d(){return typeof indexedDB>`u`?Promise.resolve(null):(u||=new Promise(e=>{try{let n=indexedDB.open(i,a);n.onupgradeneeded=e=>{let n=e.target.result;n.objectStoreNames.contains(o)||n.createObjectStore(o)},n.onsuccess=()=>e(n.result),n.onerror=()=>e(null)}catch{e(null)}}),u)}async function f(e){let n=await d();return n?new Promise(r=>{try{let i=n.transaction(o,`readonly`).objectStore(o).get(e);i.onsuccess=()=>r(i.result||null),i.onerror=()=>r(null)}catch{r(null)}}):null}async function p(e,n){let r=await d();return r?new Promise(i=>{try{let a=r.transaction(o,`readwrite`).objectStore(o).put(n,e);a.onsuccess=()=>i(!0),a.onerror=()=>i(!1)}catch{i(!1)}}):!1}async function m(e){let n=await d();return n?new Promise(r=>{try{let i=n.transaction(o,`readwrite`).objectStore(o).delete(e);i.onsuccess=()=>r(!0),i.onerror=()=>r(!1)}catch{r(!1)}}):!1}function h(){return typeof navigator<`u`?navigator.onLine:!0}function g(e){if(!e)return;let n={timestamp:Date.now(),data:e};if(p(s,n).catch(()=>{}),typeof localStorage<`u`){let e=()=>{try{localStorage.setItem(s,JSON.stringify(n))}catch(e){console.warn(`[Offline] localStorage quota exceeded, relying on IndexedDB:`,e.message)}};typeof requestIdleCallback==`function`?requestIdleCallback(e,{timeout:2e3}):setTimeout(e,50)}}function _(){if(typeof localStorage<`u`)try{let e=localStorage.getItem(s);if(e){let n=JSON.parse(e);if(n?.data)return n.data}}catch{}return null}async function v(){let e=await f(s);return e?.data?e.data:_()}async function y(){if(typeof localStorage<`u`)try{localStorage.removeItem(s),localStorage.removeItem(c)}catch{}await Promise.all([m(s),m(c)]),b()}function b(){typeof window<`u`&&window.dispatchEvent(new CustomEvent(`darc:queue-change`,{detail:{count:C().length}}))}function x(e){return typeof crypto<`u`&&crypto.randomUUID?e+`_`+crypto.randomUUID().replace(/-/g,``).slice(0,16):e+`_`+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-8)}function S({path:e,method:n=`POST`,body:r=null,description:i=``}){if(typeof localStorage>`u`)return null;try{let a=localStorage.getItem(c),o=a?JSON.parse(a):[];if(n===`DELETE`){if(e.startsWith(`/api/tasks/`)){let n=e.split(`/`)[3];if(o.some(e=>e.method===`POST`&&e.path===`/api/tasks`&&e.body?.id===n)){let e=o.filter(e=>!(e.path===`/api/tasks`&&e.body?.id===n||e.path===`/api/tasks/${n}`||e.path.startsWith(`/api/tasks/${n}/`)));return localStorage.setItem(c,JSON.stringify(e)),b(),{id:`compacted`,compacted:!0}}}else if(e.startsWith(`/api/projects/`)){let n=e.split(`/`)[3];if(o.some(e=>e.method===`POST`&&e.path===`/api/projects`&&e.body?.id===n)){let e=o.filter(e=>!(e.path===`/api/projects`&&e.body?.id===n||e.path===`/api/projects/${n}`||e.method===`POST`&&e.path===`/api/tasks`&&e.body?.projectId===n));return localStorage.setItem(c,JSON.stringify(e)),b(),{id:`compacted`,compacted:!0}}}}let s={id:`mut_`+Date.now()+`_`+Math.random().toString(36).substr(2,6),path:e,method:n,body:r,description:i,createdAt:new Date().toISOString()};return o.push(s),localStorage.setItem(c,JSON.stringify(o)),b(),console.log(`[Offline Outbox] Enqueued mutation:`,s),s}catch(e){return console.warn(`[Offline Outbox] Failed to enqueue mutation:`,e.message),null}}function C(){if(typeof localStorage>`u`)return[];try{let e=localStorage.getItem(c);return e?JSON.parse(e):[]}catch{return[]}}function w(){typeof localStorage<`u`&&(localStorage.removeItem(c),b())}function T(e,n,r,i){if(!i||!i.data)return{ok:!0,queued:!0,offline:!0};let a=new Date().toISOString();if(n===`POST`&&e===`/api/tasks`&&r){let e=r.id||x(`tsk`);r.id=e;let n={id:e,code:`OFFLINE`,projectId:r.projectId,titleAr:r.titleAr,titleEn:r.titleEn||r.titleAr,descriptionAr:r.descriptionAr||``,descriptionEn:r.descriptionEn||``,status:r.status||`not_started`,priority:r.priority||`medium`,categoryAr:r.categoryAr||`عام`,categoryEn:r.categoryEn||`General`,weight:Number(r.weight||1),progress:Number(r.progress||0),assigneeId:r.assigneeId||null,assignee:i.data.users?.find(e=>e.id===r.assigneeId)||null,reviewerId:r.reviewerId||null,startDate:r.startDate||null,dueDate:r.dueDate||null,customFields:r.customFields||{},createdAt:a,updatedAt:a,_isOfflinePending:!0};i.data.tasks||(i.data.tasks=[]);let o=i.data.tasks.findIndex(n=>n.id===e);return o===-1?i.data.tasks.unshift(n):i.data.tasks[o]=n,g(i.data),{ok:!0,queued:!0,offline:!0,task:n}}if(n===`PATCH`&&e.startsWith(`/api/tasks/`)&&r){let n=e.split(`/`)[3],o=(i.data.tasks||[]).findIndex(e=>e.id===n);if(o!==-1){let e={...i.data.tasks[o],...r,updatedAt:a,_isOfflinePending:!0};return r.assigneeId!==void 0&&(e.assignee=i.data.users?.find(e=>e.id===r.assigneeId)||null),i.data.tasks[o]=e,g(i.data),{ok:!0,queued:!0,offline:!0,task:e}}}if(n===`DELETE`&&e.startsWith(`/api/tasks/`)){let n=e.split(`/`)[3];return i.data.tasks&&(i.data.tasks=i.data.tasks.filter(e=>e.id!==n),g(i.data)),{ok:!0,queued:!0,offline:!0}}if(n===`POST`&&e===`/api/projects`&&r){let e=r.id||x(`prj`);r.id=e;let n={id:e,code:r.code||`DARC-OFF`,nameAr:r.nameAr||r.name||`مشروع محلي جديد`,nameEn:r.nameEn||r.name||`New Offline Project`,clientAr:r.clientAr||``,clientEn:r.clientEn||``,descriptionAr:r.descriptionAr||``,descriptionEn:r.descriptionEn||``,lifecycle:r.lifecycle||`planning`,health:r.health||`on_track`,progress:0,progressMode:`weighted`,managerId:r.managerId||i.data.user?.id,startDate:r.startDate||null,dueDate:r.dueDate||null,createdAt:a,updatedAt:a,_isOfflinePending:!0};i.data.projects||(i.data.projects=[]);let o=i.data.projects.findIndex(n=>n.id===e);return o===-1?i.data.projects.unshift(n):i.data.projects[o]=n,g(i.data),{ok:!0,queued:!0,offline:!0,project:n}}if(n===`PATCH`&&e.startsWith(`/api/projects/`)&&r){let n=e.split(`/`)[3],o=(i.data.projects||[]).findIndex(e=>e.id===n);if(o!==-1){let e={...i.data.projects[o],...r,updatedAt:a,_isOfflinePending:!0};return i.data.projects[o]=e,g(i.data),{ok:!0,queued:!0,offline:!0,project:e}}}if(n===`DELETE`&&e.startsWith(`/api/projects/`)){let n=e.split(`/`)[3];return i.data.projects&&(i.data.projects=i.data.projects.filter(e=>e.id!==n),g(i.data)),{ok:!0,queued:!0,offline:!0}}if(n===`POST`&&e.includes(`/comments`)&&r){let n=e.split(`/`)[3],o={id:r.id||x(`cmt`),taskId:n,userId:i.data.user?.id,content:r.content,createdAt:a,_isOfflinePending:!0};return r.id=o.id,i.data.comments||(i.data.comments=[]),i.data.comments.some(e=>e.id===o.id)||i.data.comments.push(o),g(i.data),{ok:!0,queued:!0,offline:!0,comment:o}}return n===`PATCH`&&e===`/api/tasks/reorder`&&r&&Array.isArray(r.items)&&i.data.tasks&&(r.items.forEach(e=>{let n=i.data.tasks.find(n=>n.id===e.id);n&&(e.status&&(n.status=e.status),e.sortOrder&&(n.sortOrder=e.sortOrder),e.customFields&&(n.customFields={...n.customFields||{},...e.customFields}),n._isOfflinePending=!0)}),g(i.data)),{ok:!0,queued:!0,offline:!0}}async function ee(e){if(l)return{total:0,synced:0,failed:0};let n=C();if(!n.length)return{total:0,synced:0,failed:0};l=!0,console.log(`[Offline Sync] Replaying ${n.length} pending mutations...`);let r=0,i=!1;for(let a=0;a<n.length;a++){let o=n[a];try{let n={method:o.method,headers:{"X-Offline-Replay":`true`,"X-Offline-Id":o.id,"X-Idempotency-Key":o.id}};o.body&&(n.body=typeof o.body==`string`?o.body:JSON.stringify(o.body));let i=await e(o.path,n);i&&i.error&&!i.ok?console.warn(`[Offline Sync] Dropping unprocessable mutation:`,o.id,i.error):r++}catch(e){if(console.error(`[Offline Sync] Failed to replay mutation:`,o.id,o.path,e.message),typeof navigator<`u`&&!navigator.onLine||e.message&&(e.message.includes(`تعذر الاتصال`)||e.message.includes(`fetch`)||e.message.includes(`NetworkError`)||e.name===`TypeError`)){let e=n.slice(a);typeof localStorage<`u`&&localStorage.setItem(c,JSON.stringify(e)),i=!0;break}}}return i||w(),l=!1,b(),{total:n.length,synced:r,failed:i?n.length-r:0}}var te=n({closeModal:()=>ie,modalShell:()=>ae,renderLoading:()=>ne,showToast:()=>E});function ne(){document.getElementById(`app`).innerHTML=`<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${choose(`جاري تجهيز مساحة العمل...`,`Preparing your workspace...`)}</span></div></div>`}var re=!1;function ie(e=!1){let n=document.getElementById(`preview-modal-overlay`);n&&(n.style.display=`none`,n.innerHTML=``);let r=document.getElementById(`modal-root`);if(!r||!r.hasChildNodes()){document.body.style.overflow=``;return}if(e){r.innerHTML=``,document.body.style.overflow=``,re=!1;return}if(re)return;re=!0;let i=r.querySelector(`.modal-backdrop`),a=r.querySelector(`.modal`);i&&a?(i.classList.add(`is-closing`),a.classList.add(`is-closing`),setTimeout(()=>{r.innerHTML=``,document.body.style.overflow=``,re=!1},150)):(r.innerHTML=``,document.body.style.overflow=``,re=!1)}function ae(e,n,r,i=``,a=``){return document.body.style.overflow=`hidden`,`<div class="modal-backdrop"><div class="modal ${a}" data-modal="${i}"><div class="modal-head"><div><h2>${esc(e)}</h2><p>${esc(n||``)}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${choose(`إغلاق`,`Close`)}">${icon(`close`,15)}</button></div>${r}</div></div>`}function E(e,n=!1){let r=document.getElementById(`toast-root`);if(!r)return;let i=document.createElement(`div`);i.className=`toast ${n?`error`:``}`,i.innerHTML=`${icon(n?`alert`:`check`,16)}<span>${esc(e)}</span>`,r.appendChild(i),setTimeout(()=>i.remove(),3600)}var oe=n({I18N:()=>se,PERMISSION_ALIASES:()=>Te,avatar:()=>le,can:()=>j,canManageAccountPermissions:()=>Ee,choose:()=>O,currentViewTitle:()=>De,dateLabel:()=>he,dueLabel:()=>ve,esc:()=>k,extractDrawingVersion:()=>pe,formatUnifiedDateNumeric:()=>ge,getActiveCalendarSystem:()=>me,getFileFormatInfo:()=>fe,getHijriDateEquivalent:()=>_e,getTaskStatusStyle:()=>de,getTimeBasedGreeting:()=>ue,icon:()=>A,initials:()=>ce,isAdmin:()=>M,isOverdue:()=>ye,playSuccessChime:()=>Oe,priorityText:()=>Se,roleFor:()=>Ce,roleName:()=>we,showToast:()=>E,statusBadge:()=>xe,statusText:()=>be,t:()=>D}),se={ar:{dashboard:`الرئيسية`,projects:`المشاريع`,myTasks:`مهامي`,templates:`قاعدة المخططات`,team:`فريق العمل`,reports:`التقارير`,settings:`الإعدادات`,workspace:`مساحة العمل`,overview:`نظرة عامة`,welcome:`صباح الخير`,welcomeText:`تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.`,portfolioHealth:`صحة المحفظة`,activeProjects:`مشاريع نشطة`,openTasks:`مهام مفتوحة`,overdue:`مهام متأخرة`,dueThisWeek:`تستحق هذا الأسبوع`,projectProgress:`تقدم المشاريع`,projectProgressSub:`نظرة سريعة على المشاريع التي تحتاج انتباهك.`,seeAll:`عرض الكل`,attention:`يحتاج انتباهك`,attentionSub:`أولويات اليوم والمواعيد القريبة.`,teamProgress:`إنجاز الفريق`,teamProgressSub:`الإنجاز حسب المهام المسندة.`,recentPulse:`نبض التنفيذ`,recentPulseSub:`حركة المهام خلال الأسابيع الأخيرة.`,noProjects:`لا توجد مشاريع حتى الآن`,noTasks:`لا توجد مهام في هذا العرض`,noAttention:`لا يوجد ما يحتاج انتباهًا الآن.`,addProject:`مشروع جديد`,addTask:`مهمة جديدة`,addMember:`إضافة عضو`,addRole:`دور جديد`,search:`بحث...`,filter:`تصفية`,all:`الكل`,active:`نشط`,planning:`تخطيط`,atRisk:`يحتاج انتباه`,onTrack:`على المسار`,offTrack:`متأخر`,onHold:`متوقف`,completed:`مكتمل`,archived:`مؤرشف`,tasks:`المهام`,timeline:`الجدول الزمني`,drawings:`المخططات`,documents:`المستندات`,activity:`النشاط`,status:`الحالة`,owner:`المسؤول`,deadline:`موعد التسليم`,progress:`الإنجاز`,completedTasks:`المهام المكتملة`,weightedProgress:`الإنجاز الموزون`,simpleProgress:`الإنجاز بالعدد`,dueDate:`تاريخ التسليم`,startDate:`تاريخ البداية`,client:`العميل`,manager:`مدير المشروع`,health:`صحة المشروع`,create:`إنشاء`,save:`حفظ التغييرات`,cancel:`إلغاء`,edit:`تعديل`,delete:`حذف`,invite:`إرسال دعوة`,deactivate:`تعطيل`,close:`إغلاق`,nameAr:`الاسم بالعربية`,nameEn:`الاسم بالإنجليزية`,description:`الوصف`,role:`الدور`,email:`البريد الإلكتروني`,jobTitle:`المسمى الوظيفي`,accountStatus:`حالة الحساب`,activeAccount:`مفعّل`,pendingAccount:`بانتظار الدعوة`,inactiveAccount:`معطّل`,company:`الشركة`,roles:`الأدوار والصلاحيات`,accounts:`حسابات الفريق`,audit:`سجل العمليات`,permissions:`الصلاحيات`,roleDescription:`وصف الدور`,custom:`مخصص`,builtIn:`أساسي`,noEmail:`لم يحدد البريد بعد`,emailNotConfigured:`مزود البريد غير مكوّن`,emailConfigured:`البريد مكوّن`,notification:`تنبيه`,notifications:`التنبيهات`,unread:`غير مقروء`,markRead:`تحديد كمقروء`,signOut:`تسجيل الخروج`,login:`تسجيل الدخول`,emailAddress:`البريد الإلكتروني`,password:`كلمة المرور`,loginIntro:`أدخل بياناتك للوصول إلى مساحة عمل DARC.`,demoHint:`حساب العرض: admin@darc.local / DARC-Admin-2026!`,standardLibrary:`مكتبة المخرجات القياسية`,standardLibrarySub:`33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.`,useTemplate:`استخدام القالب`,templatesCount:`قالب`,weight:`الوزن`,taskTitle:`اسم المهمة`,taskType:`نوع المخرج`,assignee:`المسند إليه`,priority:`الأولوية`,low:`منخفضة`,medium:`متوسطة`,high:`عالية`,urgent:`عاجلة`,notStarted:`غير مبدوءة`,inProgress:`قيد التنفيذ`,review:`للمراجعة`,approval:`بانتظار الاعتماد`,done:`مكتملة`,blocked:`متوقفة`,canceled:`ملغاة`,reminder:`تذكير`,reminderDate:`تاريخ التذكير`,reminderNote:`ملاحظة التذكير`,saveReminder:`حفظ التذكير`,addFromLibrary:`إضافة من المكتبة`,projectCode:`رمز المشروع`,lifecycle:`دورة المشروع`,adminOnly:`هذه المنطقة متاحة لمدير النظام فقط.`,emailStatus:`حالة البريد`,emailInfo:`عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.`,weightedExplanation:`الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.`,sampleData:`بيانات تجريبية`,projectOverview:`ملخص المشروع`,teamMembers:`أعضاء المشروع`,projectTasks:`مهام المشروع`,noMembers:`لم تتم إضافة أعضاء بعد`,permissionCount:`صلاحيات`,manageOnlyAdmin:`إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.`,confirmDeactivate:`هل تريد تعطيل هذا الحساب؟`,confirmDeleteRole:`هل تريد حذف هذا الدور المخصص؟`,accountReady:`جاهز للدخول`,noAccountAccess:`بانتظار تفعيل الحساب`,today:`اليوم`,days:`يوم`,ago:`منذ`,more:`المزيد`,viewDetails:`التفاصيل`,quickActions:`إجراءات سريعة`,total:`الإجمالي`,reviewed:`تمت المراجعة`,teamLoad:`عبء الفريق`,riskReason:`سبب التنبيه`,currentRevision:`الإصدار الحالي`,approved:`معتمد`,superseded:`مستبدل`,draft:`مسودة`,addReminder:`إضافة تذكير`,noReminder:`لا يوجد تذكير`},en:{dashboard:`Home`,projects:`Projects`,myTasks:`My tasks`,templates:`Drawing library`,team:`Team`,reports:`Reports`,settings:`Settings`,workspace:`Workspace`,overview:`Overview`,welcome:`Good morning`,welcomeText:`Stay close to the most important moves across DARC projects and make the next decision with confidence.`,portfolioHealth:`Portfolio health`,activeProjects:`Active projects`,openTasks:`Open tasks`,overdue:`Overdue tasks`,dueThisWeek:`Due this week`,projectProgress:`Project progress`,projectProgressSub:`A quick view of the projects that need your attention.`,seeAll:`View all`,attention:`Needs your attention`,attentionSub:`Today’s priorities and near-term deadlines.`,teamProgress:`Team progress`,teamProgressSub:`Progress by assigned work.`,recentPulse:`Execution pulse`,recentPulseSub:`Task movement over recent weeks.`,noProjects:`No projects yet`,noTasks:`No tasks in this view`,noAttention:`Nothing needs attention right now.`,addProject:`New project`,addTask:`New task`,addMember:`Add member`,addRole:`New role`,search:`Search...`,filter:`Filter`,all:`All`,active:`Active`,planning:`Planning`,atRisk:`Needs attention`,onTrack:`On track`,offTrack:`Off track`,onHold:`On hold`,completed:`Completed`,archived:`Archived`,tasks:`Tasks`,timeline:`Timeline`,drawings:`Drawings`,documents:`Documents`,activity:`Activity`,status:`Status`,owner:`Owner`,deadline:`Deadline`,progress:`Progress`,completedTasks:`Completed tasks`,weightedProgress:`Weighted progress`,simpleProgress:`Count progress`,dueDate:`Due date`,startDate:`Start date`,client:`Client`,manager:`Project manager`,health:`Project health`,create:`Create`,save:`Save changes`,cancel:`Cancel`,edit:`Edit`,delete:`Delete`,invite:`Send invite`,deactivate:`Deactivate`,close:`Close`,nameAr:`Arabic name`,nameEn:`English name`,description:`Description`,role:`Role`,email:`Email`,jobTitle:`Job title`,accountStatus:`Account status`,activeAccount:`Active`,pendingAccount:`Invite pending`,inactiveAccount:`Inactive`,company:`Company`,roles:`Roles & permissions`,accounts:`Team accounts`,audit:`Audit log`,permissions:`Permissions`,roleDescription:`Role description`,custom:`Custom`,builtIn:`Built-in`,noEmail:`Email not set`,emailNotConfigured:`Email provider not configured`,emailConfigured:`Email configured`,notification:`Notification`,notifications:`Notifications`,unread:`Unread`,markRead:`Mark as read`,signOut:`Sign out`,login:`Sign in`,emailAddress:`Email address`,password:`Password`,loginIntro:`Enter your details to access the DARC workspace.`,demoHint:`Demo account: admin@darc.local / DARC-Admin-2026!`,standardLibrary:`Standard deliverable library`,standardLibrarySub:`33 ready-to-use templates so every project starts at the same level.`,useTemplate:`Use template`,templatesCount:`templates`,weight:`Weight`,taskTitle:`Task name`,taskType:`Deliverable type`,assignee:`Assignee`,priority:`Priority`,low:`Low`,medium:`Medium`,high:`High`,urgent:`Urgent`,notStarted:`Not started`,inProgress:`In progress`,review:`In review`,approval:`Awaiting approval`,done:`Complete`,blocked:`Blocked`,canceled:`Canceled`,reminder:`Reminder`,reminderDate:`Reminder date`,reminderNote:`Reminder note`,saveReminder:`Save reminder`,addFromLibrary:`Add from library`,projectCode:`Project code`,lifecycle:`Project lifecycle`,adminOnly:`This area is available to the system administrator only.`,emailStatus:`Email status`,emailInfo:`Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.`,weightedExplanation:`Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.`,sampleData:`Demo data`,projectOverview:`Project overview`,teamMembers:`Project members`,projectTasks:`Project tasks`,noMembers:`No members have been added yet`,permissionCount:`permissions`,manageOnlyAdmin:`Adding, editing, and deleting roles and permissions is available to the system administrator only.`,confirmDeactivate:`Deactivate this account?`,confirmDeleteRole:`Delete this custom role?`,accountReady:`Ready to sign in`,noAccountAccess:`Account activation pending`,today:`Today`,days:`days`,ago:`ago`,more:`More`,viewDetails:`Details`,quickActions:`Quick actions`,total:`Total`,reviewed:`Reviewed`,teamLoad:`Team load`,riskReason:`Attention reason`,currentRevision:`Current revision`,approved:`Approved`,superseded:`Superseded`,draft:`Draft`,addReminder:`Add reminder`,noReminder:`No reminder`}};function D(e){return se[r.lang][e]||se.ar[e]||e}function O(e,n){return r.lang===`ar`?e:n}function k(e){return String(e??``).replace(/[&<>'"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,"'":`&#39;`,'"':`&quot;`})[e])}function A(e,n=18){let r={grid:`<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>`,building:`<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>`,checklist:`<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>`,layers:`<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>`,users:`<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>`,chart:`<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>`,settings:`<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>`,bell:`<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>`,plus:`<path d="M12 5v14M5 12h14"/>`,search:`<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>`,arrow:`<path d="M5 12h14M13 6l6 6-6 6"/>`,arrowRight:`<path d="M5 12h14M13 6l6 6-6 6"/>`,arrowLeft:`<path d="M19 12H5M11 18l-6-6 6-6"/>`,calendar:`<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>`,clock:`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`,alert:`<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>`,check:`<path d="m5 12 4 4L19 6"/>`,chevron:`<path d="m9 18 6-6-6-6"/>`,chevronDown:`<path d="m6 9 6 6 6-6"/>`,logout:`<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>`,menu:`<path d="M4 6h16M4 12h16M4 18h16"/>`,close:`<path d="m6 6 12 12M18 6 6 18"/>`,shield:`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>`,mail:`<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>`,edit:`<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>`,trash:`<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>`,more:`<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>`,document:`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>`,filter:`<path d="M4 6h16M7 12h10M10 18h4"/>`,briefcase:`<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>`,eye:`<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>`,lock:`<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>`,send:`<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>`,user:`<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>`,target:`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>`,sparkles:`<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>`,folder:`<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>`,upload:`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>`,download:`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>`,link:`<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,globe:`<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>`,info:`<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>`};return`<svg width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${r[e]||r.info}</svg>`}function ce(e){if(!e)return`D`;let n=r.lang===`ar`?e.name:e.nameEn||e.name;return(n.replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i,``).split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``)||n.slice(0,2)).toUpperCase()}function le(e,n=``){let r=e||{name:`DARC`,avatarColor:`#0d6269`},i=/^#[0-9a-f]{6}$/i.test(r.avatarColor||``)?r.avatarColor:`#0d6269`,a=k(O(r.name,r.nameEn||r.name));if(r.avatarUrl){let e=k(ce(r)).replace(/['"\\]/g,``);return`<span class="avatar ${n}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${a}"><img src="${k(r.avatarUrl)}" alt="${a}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${i}';this.parentElement.textContent='${e}';" /></span>`}return`<span class="avatar ${n}" style="background:${i}" title="${a}">${k(ce(r))}</span>`}function ue(){let e=new Date().getHours();return r.lang===`ar`?e>=5&&e<12?`صباح الخير`:e>=12&&e<17||e>=17&&e<22?`مساء الخير`:`طابت ليلتك`:e>=5&&e<12?`Good morning`:e>=12&&e<17?`Good afternoon`:e>=17&&e<22?`Good evening`:`Good night`}function de(e){let n=e?.status,r=ye(e);return n===`done`||n===`completed`?{color:`#10b981`,bgColor:`#ecfdf5`,borderColor:`#059669`,textColor:`#065f46`,label:O(`مكتملة`,`Completed`)}:n===`review`||n===`approval`?{color:`#8b5cf6`,bgColor:`#f5f3ff`,borderColor:`#7c3aed`,textColor:`#5b21b6`,label:O(`للمراجعة والاعتماد`,`In Review`)}:n===`blocked`||r?{color:`#ef4444`,bgColor:`#fef2f2`,borderColor:`#dc2626`,textColor:`#991b1b`,label:r?O(`متأخرة`,`Overdue`):O(`متوقفة`,`Blocked`)}:n===`in_progress`||n===`progress`?{color:`#2563eb`,bgColor:`#eff6ff`,borderColor:`#3b82f6`,textColor:`#1e40af`,label:O(`قيد التنفيذ`,`In Progress`)}:{color:`#64748b`,bgColor:`#f8fafc`,borderColor:`#94a3b8`,textColor:`#334155`,label:O(`غير مبدوءة`,`Not Started`)}}function fe(e,n=``){let r=(e||``).split(`.`).pop()?.toLowerCase()||``;return[`dwg`,`dxf`].includes(r)?{ext:r.toUpperCase(),label:`AutoCAD`,color:`#0284c7`,bg:`rgba(2,132,199,0.12)`,border:`rgba(2,132,199,0.3)`,isCad:!0}:[`rvt`,`rfa`,`ifc`,`skp`,`pln`,`3ds`].includes(r)?{ext:r.toUpperCase(),label:`BIM / 3D`,color:`#7c3aed`,bg:`rgba(124,58,237,0.12)`,border:`rgba(124,58,237,0.3)`,isBim:!0}:r===`pdf`?{ext:`PDF`,label:`PDF Blueprint`,color:`#dc2626`,bg:`rgba(220,38,38,0.12)`,border:`rgba(220,38,38,0.3)`,isPdf:!0}:[`png`,`jpg`,`jpeg`,`webp`,`heic`].includes(r)?{ext:r.toUpperCase(),label:`Image`,color:`#059669`,bg:`rgba(5,150,105,0.12)`,border:`rgba(5,150,105,0.3)`,isImg:!0}:[`zip`,`rar`,`7z`,`tar`].includes(r)?{ext:r.toUpperCase(),label:`Archive`,color:`#d97706`,bg:`rgba(217,119,6,0.12)`,border:`rgba(217,119,6,0.3)`,isZip:!0}:{ext:r.toUpperCase()||`DOC`,label:`Document`,color:`#0d6269`,bg:`rgba(13,98,105,0.12)`,border:`rgba(13,98,105,0.3)`,isDoc:!0}}function pe(e){if(!e)return null;let n=e.match(/[_-\s]v(\d+)(\.|$)/i)||e.match(/\bv(\d+)\b/i);return n?`V${n[1]}`:null}function me(){return r.calendarSystem||r.data?.user?.customFields?.calendarSystem||localStorage.getItem(`darc_calendar_system`)||`gregorian`}function he(e,n=!0){if(!e)return`—`;let i=new Date(String(e).length===10?`${e}T12:00:00`:e);if(Number.isNaN(i.getTime()))return`—`;if(me()===`hijri`){let e=r.lang===`ar`?`ar-SA-u-ca-islamic-umalqura`:`en-u-ca-islamic-umalqura`;return new Intl.DateTimeFormat(e,{day:`numeric`,month:`short`,year:`numeric`}).format(i)}let a=r.lang===`ar`?`ar-u-ca-gregory`:`en-GB-u-ca-gregory`;return new Intl.DateTimeFormat(a,{day:`numeric`,month:`short`,year:`numeric`}).format(i)}function ge(e){if(!e)return`—`;let n=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(n.getTime())?`—`:`${String(n.getDate()).padStart(2,`0`)}/${String(n.getMonth()+1).padStart(2,`0`)}/${n.getFullYear()}`}function _e(e){if(!e)return``;let n=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(n.getTime())?``:new Intl.DateTimeFormat(`ar-SA-u-ca-islamic-umalqura`,{day:`numeric`,month:`long`,year:`numeric`}).format(n)}function ve(e){if(!e)return`—`;let n=new Date(`${e}T23:59:59`),r=Math.ceil((n-new Date)/864e5);return r<0?O(`متأخرة ${Math.abs(r)} ${D(`days`)}`,`${Math.abs(r)} ${D(`days`)} ${D(`ago`)}`):r===0?D(`today`):O(`بعد ${r} ${D(`days`)}`,`in ${r} ${D(`days`)}`)}function ye(e){return e?.dueDate&&![`done`,`completed`,`canceled`].includes(e.status)&&new Date(`${e.dueDate}T23:59:59`)<new Date}function be(e){return{not_started:D(`notStarted`),in_progress:D(`inProgress`),review:D(`review`),approval:D(`approval`),done:D(`done`),blocked:D(`blocked`),canceled:D(`canceled`),planning:D(`planning`),active:D(`active`),on_hold:D(`onHold`),completed:D(`completed`),archived:D(`archived`),on_track:D(`onTrack`),at_risk:D(`atRisk`),off_track:D(`offTrack`)}[e]||e}function xe(e){return e?`<span class="status-badge ${k(e)}">${k(be(e))}</span>`:`<span style="color:var(--muted)">—</span>`}function Se(e){return{low:D(`low`),medium:D(`medium`),high:D(`high`),urgent:D(`urgent`)}[e]||e}function Ce(e){let n=typeof e==`string`?r.data?.users.find(n=>n.id===e):e;return n?r.data?.roles.find(e=>e.id===n.roleId)||{id:n.roleId,nameAr:n.roleNameAr||``,nameEn:n.roleNameEn||``,permissions:[]}:null}function we(e){let n=Ce(e);return n?O(n.nameAr,n.nameEn):`—`}var Te={create_project:`create_projects`,create_projects:`create_project`,edit_project:`edit_projects`,edit_projects:`edit_project`,delete_project:`delete_projects`,delete_projects:`delete_project`,view_project:`view_projects`,view_projects:`view_project`,create_task:`create_tasks`,create_tasks:`create_task`,edit_task:`edit_tasks`,edit_tasks:`edit_task`,delete_task:`delete_tasks`,delete_tasks:`delete_task`,manage_tasks:`edit_tasks`,manage_roles:`manage_role`,manage_role:`manage_roles`,manage_template:`manage_templates`,manage_templates:`manage_template`,manage_company:`manage_settings`,manage_settings:`manage_company`};function j(e){let n=r.data?.role?.permissions||[];if(n.includes(`*`)||n.includes(e))return!0;let i=Te[e];return!!(i&&n.includes(i))}function M(){return r.data?.user?.roleId===`admin`}function Ee(){return M()||r.data?.user?.roleId===`account_permissions_manager`||r.data?.role?.permissions?.includes(`manage_existing_account_permissions`)}function De(){return r.view===`project-detail`?O(`تفاصيل المشروع`,`Project details`):{dashboard:D(`dashboard`),projects:D(`projects`),tasks:D(`myTasks`),documents:D(`documents`),templates:D(`templates`),team:D(`team`),reports:D(`reports`),settings:D(`settings`)}[r.view]||D(`dashboard`)}function Oe(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;let n=new e,r=n.currentTime,i=n.createOscillator(),a=n.createGain();i.type=`sine`,i.frequency.setValueAtTime(587.33,r),a.gain.setValueAtTime(.08,r),a.gain.exponentialRampToValueAtTime(.001,r+.35),i.connect(a),a.connect(n.destination),i.start(r),i.stop(r+.35);let o=n.createOscillator(),s=n.createGain();o.type=`sine`,o.frequency.setValueAtTime(880,r+.12),s.gain.setValueAtTime(.001,r),s.gain.setValueAtTime(.09,r+.12),s.gain.exponentialRampToValueAtTime(.001,r+.65),o.connect(s),s.connect(n.destination),o.start(r+.12),o.stop(r+.65)}catch{}}var ke=typeof window<`u`&&(window.location.hostname===`127.0.0.1`||window.location.hostname===`localhost`)?window.location.port===`8787`?`${window.location.protocol}//${window.location.hostname}:8787`:window.__API_BASE__===void 0?``:window.__API_BASE__:typeof window<`u`&&window.__API_BASE__?window.__API_BASE__:``,Ae=null;function je(){Ae=null}var Me=0,N=null;function Ne(){return typeof document>`u`?null:(N||(N=document.getElementById(`darc-global-progress`),N||(N=document.createElement(`div`),N.id=`darc-global-progress`,N.className=`global-top-progress`,document.body.appendChild(N))),N)}function Pe(){Me++;let e=Ne();e&&e.classList.add(`active`)}function Fe(){if(Me=Math.max(0,Me-1),Me===0){let e=Ne();e&&e.classList.remove(`active`)}}async function P(e,n={}){let i=[`POST`,`PATCH`,`PUT`,`DELETE`].includes(n.method),a=e.startsWith(`/api/auth`),o=!(!n.headers||n.headers[`X-Offline-Replay`]!==`true`&&n.headers[`X-Offline-Replay`]!==!0),s=null;if(i&&n.body)try{s=typeof n.body==`string`?JSON.parse(n.body):n.body}catch{}if(n.method===`POST`&&s&&typeof s==`object`&&!o&&(e===`/api/tasks`&&!s.id?(s.id=x(`tsk`),n.body=JSON.stringify(s)):e===`/api/projects`&&!s.id?(s.id=x(`prj`),n.body=JSON.stringify(s)):e.includes(`/comments`)&&!s.id&&(s.id=x(`cmt`),n.body=JSON.stringify(s))),typeof navigator<`u`&&!navigator.onLine&&i&&!a){if(o)throw Error(`تعذر الاتصال بالخادم، ما زال النظام دون اتصال.`);let i=S({path:e,method:n.method,body:s}),a=T(e,n.method,s,r);return E(O(`أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة النت 📡`,`Offline mode: action saved locally and will auto-sync on reconnect 📡`),!1),{ok:!0,queued:!0,offline:!0,id:i?.id,...a}}let c=typeof localStorage<`u`?localStorage.getItem(`darc_token`):null,l=!!(n.silent||n.headers&&n.headers[`X-Silent`]),u=l&&!!r.data&&!!Ae,d={...c?{Authorization:`Bearer ${c}`}:{},...n.body?{"Content-Type":`application/json`}:{},...e===`/api/bootstrap`&&u?{"If-None-Match":Ae}:{},...e===`/api/bootstrap`&&!u?{"Cache-Control":`no-cache, no-store`}:{},...n.headers||{}};e===`/api/bootstrap`&&!u&&(n.cache=`no-cache`),n.credentials=`include`;let f;l||Pe();try{f=await fetch(ke+e,{...n,headers:d})}catch{if(l||Fe(),i&&!a&&!o){let i=S({path:e,method:n.method,body:s}),a=T(e,n.method,s,r);return E(O(`تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية 📡`,`Connection lost: action saved locally for auto-sync 📡`),!1),{ok:!0,queued:!0,offline:!0,id:i?.id,...a}}throw Error(`تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.`)}if(l||Fe(),f.status===304)return null;if(!f.ok){let n=await f.text();f.status!==401&&console.error(`API Failed [${e}]: ${f.status} - ${n}`);let i={};try{i=JSON.parse(n)}catch{}f.status===401&&(Ae=null,e!==`/api/auth/login`&&(typeof localStorage<`u`&&localStorage.removeItem(`darc_token`),r.data&&(r.data.user=null),typeof window<`u`&&window.location.hash!==`#login`&&(window.location.hash=`#login`)));let a=Error(i.error||`Failed to fetch ${e}`);throw a.status=f.status,a}let p=f.headers.get(`ETag`);p&&e===`/api/bootstrap`&&(Ae=p);let m=await f.json();if([`POST`,`PATCH`,`PUT`,`DELETE`].includes(n.method)&&(je(),e!==`/api/auth/login`&&e!==`/api/auth/logout`&&typeof window<`u`)){if(typeof window.notifyStateMutation==`function`)window.notifyStateMutation();else if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:`STATE_MUTATION`,timestamp:Date.now()})}catch{}}return m}typeof window<`u`&&(window.api=P);var Ie=n({calculatePasswordStrength:()=>Le,openForcePasswordModal:()=>We,renderActivation:()=>He,renderLogin:()=>F,renderResetPassword:()=>Ue,renderStrengthMeterHtml:()=>Re});function Le(e){let n=String(e||``);if(!n)return{score:0,label:``,percent:0,color:`var(--line)`};let i=0;return n.length>=10&&(i+=1),/[a-z]/.test(n)&&/[A-Z]/.test(n)&&(i+=1),/\d/.test(n)&&(i+=1),/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`§±]/.test(n)&&(i+=1),i===1?{score:1,label:r.lang===`ar`?`ضعيفة جداً`:`Very weak`,percent:25,color:`var(--red)`}:i===2?{score:2,label:r.lang===`ar`?`متوسطة`:`Fair`,percent:50,color:`var(--amber)`}:i===3?{score:3,label:r.lang===`ar`?`جيدة`:`Good`,percent:75,color:`var(--blue)`}:{score:4,label:r.lang===`ar`?`قوية وممتازة 🛡️`:`Strong & Secure 🛡️`,percent:100,color:`var(--mint-strong)`}}function Re(e=`strength`){return`
    <div id="${e}-meter-wrap" style="margin-top:6px;display:none;flex-direction:column;gap:4px;">
      <div style="height:4px;width:100%;background:var(--line);border-radius:2px;overflow:hidden;display:flex;">
        <div id="${e}-meter-bar" style="height:100%;width:0%;transition:width 0.25s ease, background 0.25s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;">
        <span id="${e}-meter-label" style="font-weight:600;"></span>
        <span style="color:var(--muted);">${r.lang===`ar`?`10 أحرف + أرقام ورموز`:`10+ chars, mixed, digits & symbols`}</span>
      </div>
    </div>
  `}function ze(e,n,i,a,o){let s=document.getElementById(e);if(!s)return;let c=s.querySelector(`input[name="${n}"]`),l=s.querySelector(`input[name="${i}"]`),u=s.querySelector(o||`button[type="submit"]`),d=document.getElementById(`${a}-meter-wrap`),f=document.getElementById(`${a}-meter-bar`),p=document.getElementById(`${a}-meter-label`),m=document.getElementById(`${a}-match-indicator`);function h(){let e=c?c.value:``,n=l?l.value:``;if(e&&d&&f&&p){d.style.display=`flex`;let n=Le(e);f.style.width=`${n.percent}%`,f.style.background=n.color,p.textContent=n.label,p.style.color=n.color}else d&&(d.style.display=`none`);l&&m&&(n?e===n?(m.style.display=`block`,m.style.color=`var(--mint-strong)`,m.textContent=r.lang===`ar`?`✓ كلمتا المرور متطابقتان`:`✓ Passwords match`,u&&(u.disabled=!1)):(m.style.display=`block`,m.style.color=`var(--red)`,m.textContent=r.lang===`ar`?`✗ كلمتا المرور غير متطابقتين`:`✗ Passwords do not match`,u&&(u.disabled=!0)):(m.style.display=`none`,u&&(u.disabled=!1)))}c?.addEventListener(`input`,h),l?.addEventListener(`input`,h)}function Be(){document.querySelectorAll(`[data-action="toggle-password-visibility"]`).forEach(e=>{e.onclick=n=>{n.preventDefault();let i=e.getAttribute(`data-target`),a=i?document.getElementById(i):e.parentElement.querySelector(`input`);if(!a)return;let o=a.type===`password`;a.type=o?`text`:`password`,e.style.color=o?`var(--teal)`:`var(--ink-soft)`,e.setAttribute(`aria-label`,o?r.lang===`ar`?`إخفاء كلمة المرور`:`Hide password`:r.lang===`ar`?`إظهار كلمة المرور`:`Show password`)}}),document.querySelectorAll(`input[type="password"]`).forEach(e=>{let n=n=>{let i=n.getModifierState&&n.getModifierState(`CapsLock`),a=e.parentElement.parentElement.querySelector(`.capslock-warning`);i?a||(a=document.createElement(`div`),a.className=`capslock-warning`,a.style.fontSize=`11px`,a.style.color=`var(--amber)`,a.style.marginTop=`4px`,a.style.display=`flex`,a.style.alignItems=`center`,a.style.gap=`4px`,a.innerHTML=`<span>⚠️</span> <span>${r.lang===`ar`?`زر الحروف الكبيرة (Caps Lock) مفعّل`:`Caps Lock is active`}</span>`,e.parentElement.parentElement.appendChild(a)):a&&a.remove()};e.addEventListener(`keydown`,n),e.addEventListener(`keyup`,n)})}function Ve(e,n=60){if(!e)return;e.disabled=!0;let i=n,a=e.innerHTML,o=setInterval(()=>{i--,e.innerHTML=`<span>${r.lang===`ar`?`يرجى الانتظار (${i} ثانية)...`:`Please wait (${i}s)...`}</span>`,i<=0&&(clearInterval(o),e.disabled=!1,e.innerHTML=a)},1e3)}function F(e=``,n=`login`,i=!1){if(r.view=`login`,typeof window<`u`){let e=n===`forgot`?`#forgot`:`#login`;window.location.hash!==e&&(window.history&&window.history.replaceState?window.history.replaceState(null,``,e):window.location.hash=e)}document.body.classList.remove(`in-app`),document.body.classList.toggle(`is-ltr`,r.lang===`en`),document.documentElement.lang=r.lang,document.documentElement.dir=r.lang===`ar`?`rtl`:`ltr`,document.documentElement.dataset.theme=r.theme||`light`;let a=``,o=e?`<div class="login-demo" style="border-color:${i?`#cce3e0`:`var(--red-soft)`};background:${i?`#f0f9f7`:`var(--red-soft)`};color:${i?`var(--teal)`:`var(--red)`};margin-top:0;margin-bottom:15px">${icon(i?`check`:`alert`,15)}<span>${esc(e)}</span></div>`:``,s=(typeof localStorage<`u`?localStorage.getItem(`darc_last_email`):``)||``;n===`login`?a=`
      <form id="login-form">
        <div class="field">
          <label for="login-email">${t(`emailAddress`)}</label>
          <input id="login-email" name="email" type="email" autocomplete="username" placeholder="name@darc.com" value="${esc(s)}" required />
        </div>
        <div class="field">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <label for="login-password">${t(`password`)}</label>
            <a href="#" data-action="goto-forgot" style="font-size:12px;color:var(--blue);text-decoration:none">${choose(`نسيت كلمة المرور؟`,`Forgot password?`)}</a>
          </div>
          <div style="position:relative;display:flex;align-items:center;">
            <input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
            <button type="button" data-action="toggle-password-visibility" data-target="login-password" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin:4px 0 16px;font-size:12px;">
          <label style="display:flex;align-items:center;gap:7px;cursor:pointer;color:var(--ink-soft);user-select:none;">
            <input type="checkbox" id="remember-email-check" ${s?`checked`:``} style="cursor:pointer;accent-color:var(--teal);" />
            <span>${choose(`تذكر بريدي الإلكتروني على هذا الجهاز`,`Remember my email on this device`)}</span>
          </label>
        </div>
        ${o}
        <button class="btn btn-primary btn-block" type="submit">${icon(r.lang===`ar`?`arrowLeft`:`arrowRight`,16)} ${t(`login`)}</button>
      </form>
      <div class="login-demo" style="flex-direction:column;gap:10px;padding:14px 16px;">
        <div style="display:flex;align-items:center;gap:8px;font-weight:700;color:var(--teal);font-size:12px;">
          ${icon(`info`,15)}
          <span>${choose(`بيانات الحسابات التجريبية (جاهزة للتجربة):`,`Demo Workspace Accounts (Ready to test):`)}</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;width:100%;">
          <div class="demo-acc-card" style="display:flex;align-items:center;justify-content:space-between;background:var(--surface);border:1px solid rgba(27,157,143,0.22);padding:8px 12px;border-radius:10px;gap:8px;flex-wrap:wrap;">
            <div style="display:flex;align-items:center;gap:8px;font-size:11px;flex-wrap:wrap;">
              <span class="status-badge done" style="font-size:10px;padding:2px 7px;">${choose(`مدير النظام`,`Admin`)}</span>
              <code dir="ltr" style="font-family:monospace;font-size:11px;font-weight:600;color:var(--ink);unicode-bidi:isolate;">admin@darc.local</code>
              <span style="color:var(--muted);font-size:10px;">/</span>
              <code dir="ltr" style="font-family:monospace;font-size:11px;font-weight:600;color:var(--ink);unicode-bidi:isolate;">DARC-Admin-2026!</code>
            </div>
            <button type="button" class="btn btn-soft btn-xs" data-action="quick-fill-login" data-email="admin@darc.local" data-pass="DARC-Admin-2026!" style="padding:3px 9px;font-size:11px;cursor:pointer;">
              ${choose(`تعبئة سريعة`,`Quick Fill`)}
            </button>
          </div>
          <div class="demo-acc-card" style="display:flex;align-items:center;justify-content:space-between;background:var(--surface);border:1px solid rgba(27,157,143,0.22);padding:8px 12px;border-radius:10px;gap:8px;flex-wrap:wrap;">
            <div style="display:flex;align-items:center;gap:8px;font-size:11px;flex-wrap:wrap;">
              <span class="status-badge in_progress" style="font-size:10px;padding:2px 7px;">${choose(`جهاد (مصمم)`,`Jihad (Designer)`)}</span>
              <code dir="ltr" style="font-family:monospace;font-size:11px;font-weight:600;color:var(--ink);unicode-bidi:isolate;">jihad@darc.local</code>
              <span style="color:var(--muted);font-size:10px;">/</span>
              <code dir="ltr" style="font-family:monospace;font-size:11px;font-weight:600;color:var(--ink);unicode-bidi:isolate;">DARC-Jihad-2026!</code>
            </div>
            <button type="button" class="btn btn-soft btn-xs" data-action="quick-fill-login" data-email="jihad@darc.local" data-pass="DARC-Jihad-2026!" style="padding:3px 9px;font-size:11px;cursor:pointer;">
              ${choose(`تعبئة سريعة`,`Quick Fill`)}
            </button>
          </div>
        </div>
      </div>
    `:n===`forgot`&&(a=`
      <form id="forgot-form">
        <div class="field"><label for="login-email">${t(`emailAddress`)}</label><input id="login-email" name="email" type="email" placeholder="name@darc.com" value="${esc(s)}" required /></div>
        ${o}
        <button class="btn btn-primary btn-block" type="submit">${choose(`إرسال رابط الاستعادة`,`Send reset link`)}</button>
        <div style="text-align:center;margin-top:15px"><a href="#" data-action="goto-login" style="font-size:13px;color:var(--ink-soft)">${choose(`العودة لتسجيل الدخول`,`Back to login`)}</a></div>
      </form>
    `),document.getElementById(`app`).innerHTML=`
    <div class="login-shell ${r.lang===`en`?`is-ltr`:``}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup">
            <span class="brand-mark">${icon(`building`,24)}</span>
            <div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${choose(`مساحة تشغيل المشاريع`,`Project operations workspace`)}</div></div>
          </div>
          <div class="login-art-content">
            <p class="eyebrow">${choose(`وضوح · مسؤولية · إنجاز`,`CLARITY · OWNERSHIP · DELIVERY`)}</p>
            <h1>${choose(`كل مشروع واضح. كل خطوة محسوبة.`,`Every project clear. Every move accounted for.`)}</h1>
            <p>${choose(`لوحة هادئة لإدارة التصميم والتنفيذ، تجمع فريق DARC حول أحدث قرار وأهم موعد.`,`A calm operating layer for design and delivery, bringing the DARC team around the latest decision and the next important deadline.`)}</p>
          </div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${n===`login`?choose(`مرحبًا بعودتك`,`WELCOME BACK`):choose(`استعادة الحساب`,`ACCOUNT RECOVERY`)}</p><h2>${n===`login`?t(`login`):choose(`نسيت كلمة المرور`,`Forgot Password`)}</h2><p class="intro">${n===`login`?t(`loginIntro`):choose(`أدخل بريدك الإلكتروني لاستلام رابط استعادة كلمة المرور.`,`Enter your email to receive a reset link.`)}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme" title="${r.theme===`dark`?`الوضع النهاري`:`الوضع الليلي`}">${r.theme===`dark`?`☀️`:`🌙`}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${r.lang===`ar`?`EN`:`عربي`}</button>
              </div>
            </div>
            ${a}
          </div>
        </section>
      </div>
    </div>`,Be(),document.getElementById(`login-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let n=new FormData(e.currentTarget),r=String(n.get(`email`)||``).trim(),i=String(n.get(`password`)||``),a=document.getElementById(`remember-email-check`)?.checked,o=e.currentTarget.querySelector(`button[type="submit"]`);o.disabled=!0,o.innerHTML=`<span>${choose(`جاري التحقق وتسجيل الدخول...`,`Verifying & signing in...`)}</span>`;try{let e=await P(`/api/auth/login`,{method:`POST`,body:JSON.stringify({email:r,password:i})});typeof localStorage<`u`&&(e?.token&&localStorage.setItem(`darc_token`,e.token),a?localStorage.setItem(`darc_last_email`,r):localStorage.removeItem(`darc_last_email`)),await loadData()}catch(e){console.error(`Login Error:`,e),e.message&&(e.message.includes(`429`)||e.message.includes(`كثيرة`)||e.message.includes(`rate`))?(F(e.message,`login`),Ve(document.querySelector(`#login-form button[type="submit"]`),60)):F(e.message,`login`)}}),document.getElementById(`forgot-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let n=new FormData(e.currentTarget),r=e.currentTarget.querySelector(`button[type="submit"]`);r.disabled=!0;try{await P(`/api/auth/forgot-password`,{method:`POST`,body:JSON.stringify({email:n.get(`email`)})}),F(choose(`تم إرسال رابط الاستعادة إذا كان البريد مسجلاً.`,`Reset link sent if email is registered.`),`forgot`,!0)}catch(e){F(e.message,`forgot`)}})}function He(e,n=``){document.body.classList.remove(`in-app`),document.body.classList.toggle(`is-ltr`,r.lang===`en`),document.documentElement.lang=r.lang,document.documentElement.dir=r.lang===`ar`?`rtl`:`ltr`,document.documentElement.dataset.theme=r.theme||`light`,document.getElementById(`app`).innerHTML=`
    <div class="login-shell ${r.lang===`en`?`is-ltr`:``}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${icon(`building`,24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${choose(`تفعيل حساب الفريق`,`Team account activation`)}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${choose(`خطوة واحدة للبدء`,`ONE STEP TO START`)}</p><h1>${choose(`أكمل حسابك وانضم إلى مساحة العمل.`,`Finish your account and join the workspace.`)}</h1><p>${choose(`اختر كلمة مرور آمنة للوصول إلى المشاريع والمهام المسندة إليك.`,`Choose a secure password to access your projects and assigned work.`)}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${choose(`دعوة DARC الرسمية`,`DARC INVITE`)}</p><h2>${choose(`تفعيل الحساب`,`Activate account`)}</h2><p class="intro">${choose(`يجب أن تحتوي كلمة المرور على 10 أحرف على الأقل مع رموز وأرقام.`,`Your password must be at least 10 characters with numbers and symbols.`)}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${r.theme===`dark`?`☀️`:`🌙`}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${r.lang===`ar`?`EN`:`عربي`}</button>
              </div>
            </div>
            <form id="activation-form">
              <input type="hidden" name="token" value="${esc(e)}" />
              <div class="field">
                <label for="act-pass">${t(`password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass" name="password" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${Re(`act`)}
              </div>
              <div class="field">
                <label for="act-pass-confirm">${choose(`تأكيد كلمة المرور`,`Confirm password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="act-pass-confirm" name="passwordConfirm" type="password" minlength="10" autocomplete="new-password" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="act-pass-confirm" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div id="act-match-indicator" style="font-size:11px;font-weight:600;margin-top:4px;display:none;"></div>
              </div>
              ${n?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${icon(`alert`,15)}<span>${esc(n)}</span></div>`:``}
              <button class="btn btn-primary btn-block" type="submit">${icon(`shield`,16)} ${choose(`تفعيل الحساب والدخول`,`Activate and sign in`)}</button>
            </form>
            <div class="login-demo">${icon(`lock`,16)}<span>${choose(`جلسة الدخول مشفرة ولا يتم تخزين كلمة المرور بنص صريح أبداً.`,`Your session is encrypted and your password is never stored in plain text.`)}</span></div>
          </div>
        </section>
      </div>
    </div>`,Be(),ze(`activation-form`,`password`,`passwordConfirm`,`act`,`#activation-form button[type="submit"]`)}function Ue(e,n=``){document.body.classList.remove(`in-app`),document.body.classList.toggle(`is-ltr`,r.lang===`en`),document.documentElement.lang=r.lang,document.documentElement.dir=r.lang===`ar`?`rtl`:`ltr`,document.documentElement.dataset.theme=r.theme||`light`,document.getElementById(`app`).innerHTML=`
    <div class="login-shell ${r.lang===`en`?`is-ltr`:``}">
      <div class="login-wrap">
        <section class="login-art">
          <div class="login-geometry"></div>
          <div class="brand-lockup"><span class="brand-mark">${icon(`building`,24)}</span><div><div class="brand-name">DARC Design Team</div><div class="brand-subtitle">${choose(`استعادة كلمة المرور`,`Password Recovery`)}</div></div></div>
          <div class="login-art-content"><p class="eyebrow">${choose(`استعادة الحساب`,`ACCOUNT RECOVERY`)}</p><h1>${choose(`اختر كلمة مرور جديدة لحسابك.`,`Choose a new password for your account.`)}</h1><p>${choose(`كلمة المرور يجب أن تكون قوية وغير مستخدمة من قبل.`,`Password should be strong and unique.`)}</p></div>
          <div class="login-note">© 2026 DARC Design Team</div>
        </section>
        <section class="login-card">
          <div class="login-card-inner">
            <div class="page-head" style="align-items:flex-start;margin-bottom:0">
              <div><p class="eyebrow">${choose(`استعادة الحساب`,`ACCOUNT RECOVERY`)}</p><h2>${choose(`كلمة مرور جديدة`,`New Password`)}</h2><p class="intro">${choose(`أدخل كلمة المرور الجديدة وقم بتأكيدها.`,`Enter and confirm your new password.`)}</p></div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-theme">${r.theme===`dark`?`☀️`:`🌙`}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-lang">${r.lang===`ar`?`EN`:`عربي`}</button>
              </div>
            </div>
            <form id="reset-form">
              <div class="field">
                <label for="rst-pass">${choose(`كلمة المرور الجديدة`,`New Password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass" name="newPassword" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                ${Re(`rst`)}
              </div>
              <div class="field">
                <label for="rst-pass-confirm">${choose(`تأكيد كلمة المرور الجديدة`,`Confirm New Password`)}</label>
                <div style="position:relative;display:flex;align-items:center;">
                  <input id="rst-pass-confirm" name="newPasswordConfirm" type="password" minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" required />
                  <button type="button" data-action="toggle-password-visibility" data-target="rst-pass-confirm" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <div id="rst-match-indicator" style="font-size:11px;font-weight:600;margin-top:4px;display:none;"></div>
              </div>
              ${n?`<div class="login-demo" style="border-color:var(--red-soft);background:var(--red-soft);color:var(--red);margin-top:0;margin-bottom:15px">${icon(`alert`,15)}<span>${esc(n)}</span></div>`:``}
              <button class="btn btn-primary btn-block" type="submit">${choose(`حفظ وتسجيل الدخول`,`Save and login`)}</button>
            </form>
          </div>
        </section>
      </div>
    </div>`,Be(),ze(`reset-form`,`newPassword`,`newPasswordConfirm`,`rst`,`#reset-form button[type="submit"]`),document.getElementById(`reset-form`)?.addEventListener(`submit`,async n=>{n.preventDefault();let r=new FormData(n.currentTarget),i=r.get(`newPassword`);if(i!==r.get(`newPasswordConfirm`)){Ue(e,choose(`كلمتا المرور غير متطابقتين.`,`Passwords do not match.`));return}let a=n.currentTarget.querySelector(`button[type="submit"]`);a.disabled=!0;try{await P(`/api/auth/reset-password`,{method:`POST`,body:JSON.stringify({token:e,newPassword:i})}),window.history.replaceState({},``,window.location.pathname),await loadData()}catch(n){Ue(e,n.message)}})}function We(e){let n=e.status===`pending`,r=`
    <form id="force-password-form" data-user-id="${e.id}" data-is-pending="${n}">
      <div class="field">
        <label for="force-pass-input">${n?choose(`كلمة المرور للبدء`,`Initial password`):choose(`كلمة المرور الجديدة`,`New password`)}</label>
        <div style="position:relative;display:flex;align-items:center;">
          <input id="force-pass-input" name="newPassword" type="password" required minlength="10" placeholder="••••••••••" style="width:100%;padding-inline-end:40px;" />
          <button type="button" data-action="toggle-password-visibility" data-target="force-pass-input" style="position:absolute;inset-inline-end:10px;background:none;border:none;color:var(--ink-soft);cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;" title="${choose(`إظهار/إخفاء كلمة المرور`,`Show/Hide password`)}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        ${Re(`force`)}
        ${e.email?n?``:`<small class="field-hint" style="margin-top:6px;display:block;">${choose(`سيتم طرد المستخدم من جميع أجهزته فوراً.`,`The user will be signed out of all devices immediately.`)}</small>`:`<small class="field-hint" style="color:var(--red);margin-top:8px;display:flex;align-items:center;gap:4px;">${icon(`alert`,12)} ${choose(`تنبيه: هذا الحساب لا يملك بريداً إلكترونياً، لذا لن يتمكن من تسجيل الدخول. يرجى إضافة بريد إلكتروني للحساب من واجهة التعديل.`,`Warning: This account has no email, so they will not be able to log in. Please add an email to the account first.`)}</small>`}
      </div>
      <div class="form-actions" style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${n?choose(`تفعيل الحساب`,`Activate account`):choose(`حفظ وتغيير`,`Save and change`)}</button>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=modalShell(n?choose(`تفعيل الحساب يدوياً`,`Activate account manually`):choose(`تغيير كلمة المرور إجبارياً`,`Force change password`),n?choose(`قم بتعيين كلمة مرور مبدئية لتفعيل حساب ${esc(e.name)}.`,`Set an initial password to activate ${esc(e.name)}'s account.`):choose(`تعيين كلمة مرور جديدة لحساب ${esc(e.name)}`,`Set a new password for ${esc(e.name)}`),r,`force-password`),Be(),ze(`force-password-form`,`newPassword`,null,`force`,`#force-password-form button[type="submit"]`)}var Ge=n({attentionItem:()=>Je,metricCard:()=>Ke,projectProgress:()=>qe,pulseChart:()=>Ze,renderDashboard:()=>Qe,renderReports:()=>$e,teamMetrics:()=>Ye,teamRow:()=>Xe});function Ke(e,n,r,i,a,o=``){return`<article class="metric-card ${i}"><div class="metric-top"><span class="metric-label">${esc(e)}</span><span class="metric-icon">${icon(a,15)}</span></div><div class="metric-value">${esc(n)}</div><span class="metric-note ${o}">${esc(r)}</span></article>`}function qe(e){let n=e.health===`off_track`?`red`:e.health===`at_risk`?`amber`:``;return`<div class="progress-cell"><div class="progress-meta"><span>${t(`weightedProgress`)}</span><strong>${e.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${n}" style="width:${Math.min(100,e.progress)}%"></div></div></div>`}function Je(e){let n=isOverdue(e)||e.status===`blocked`?`red`:`amber`,r=isOverdue(e)?choose(`متأخرة`,`Overdue`):e.status===`blocked`?choose(`متوقفة`,`Blocked`):choose(`تستحق قريبًا`,`Due soon`);return`<button class="attention-item" data-action="open-task" data-task-id="${esc(e.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${n}">${icon(isOverdue(e)||e.status===`blocked`?`alert`:`clock`,14)}</span><span class="attention-copy"><strong style="color:var(--${n})">${esc(choose(e.titleAr,e.titleEn))}</strong><span>${esc(r)} · ${esc(dueLabel(e.dueDate))}</span></span></button>`}function Ye(e,n){let r=n.filter(n=>n.assigneeId===e),i=r.reduce((e,n)=>e+Number(n.weight||1),0),a=i?Math.round(r.reduce((e,n)=>e+n.progress*Number(n.weight||1),0)/i):0;return{tasks:r.length,progress:a,overdue:r.filter(isOverdue).length}}function Xe(e,n){let r=Ye(e.id,n);return`<div class="team-row"><div class="team-member">${avatar(e)}<div class="team-member-copy"><strong>${esc(choose(e.name,e.nameEn||e.name))}</strong><span>${esc(choose(e.jobTitleAr,e.jobTitleEn||e.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${r.tasks}</strong> ${t(`tasks`)}</div><div class="team-progress"><div class="progress-meta"><span>${t(`progress`)}</span><strong>${r.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${r.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${esc(e.id)}">${icon(`more`,15)}</button></div>`}function Ze(){let e=[38,48,45,62,55,72,68],n=r.lang===`ar`?[`أحد`,`اثن`,`ثلث`,`أربع`,`خمس`,`جمع`,`سبت`]:[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`];return`<div class="pulse">${e.map((r,i)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,r-22)}%"></span><span class="pulse-bar ${i===e.length-1?`current`:``}" style="height:${r}%"></span></div><span>${n[i]}</span></div>`).join(``)}</div>`}function Qe(){let e=r.data?.stats||{},n=r.data?.projects||[],i=r.data?.tasks||[],a=r.data?.users||[],o=r.data?.user||{},s=o.name||o.email||choose(`مستخدم`,`User`),c=n.reduce((e,n)=>e+(Number(n.totalWeight)||0),0),l=c?Math.round(n.reduce((e,n)=>e+(Number(n.progress)||0)*(Number(n.totalWeight)||0),0)/c):0,u=[...i].filter(e=>isOverdue(e)||e.status===`blocked`||e.dueDate&&(new Date(`${e.dueDate}T23:59:59`)-new Date)/864e5<=7).sort((e,n)=>new Date(e.dueDate||`9999-12-31`)-new Date(n.dueDate||`9999-12-31`)).slice(0,5),d=a.filter(e=>e.status!==`inactive`),f=e.projectCount??n.length,p=e.myTasks??i.filter(e=>e.assigneeId===o.id).length,m=e.overdueTasks??i.filter(isOverdue).length,h=e.dueSoon??0,g=e.completedTasks??i.filter(e=>e.status===`done`).length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${choose(`لوحة قيادة المشاريع`,`PROJECT COMMAND CENTER`)}</p><h1>${ue()}، ${esc(choose(s.replace(/^م\.\s?/,``),o.nameEn||s))}</h1><p>${t(`welcomeText`)}</p></div><div class="welcome-status"><span>${t(`portfolioHealth`)}</span><strong>${l}%</strong><small>${choose(`إنجاز المحفظة الموزون`,`Weighted portfolio progress`)}</small></div></div>
    <div class="metrics-grid">${Ke(t(`activeProjects`),e.activeProjects||0,choose(`${f} مشاريع إجمالًا`,`${f} projects total`),`teal`,`building`,`up`)}${Ke(t(`openTasks`),e.openTasks??i.length,choose(`${p} مسندة لك`,`${p} assigned to you`),`blue`,`checklist`)}${Ke(t(`overdue`),m,choose(`تحتاج تصعيدًا ومتابعة`,`Needs escalation and follow-up`),`red`,m?`alert`:`check`,m?`alert`:``)}${Ke(t(`dueThisWeek`),h,choose(`موعد قريب`,`Near-term due dates`),`amber`,`clock`)}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`projectProgress`)}</h2><p class="panel-subtitle">${t(`projectProgressSub`)}</p></div>${j(`view_projects`)?`<button class="text-link" data-view="projects">${t(`seeAll`)} ${icon(r.lang===`ar`?`arrowLeft`:`arrow`,12)}</button>`:``}</div><div class="project-list">${n.length?n.slice(0,5).map(projectRow).join(``):`<div class="empty">${icon(`building`,18)}<span>${t(`noProjects`)}</span></div>`}</div></section>${M()||j(`manage_users`)?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`teamProgress`)}</h2><p class="panel-subtitle">${t(`teamProgressSub`)}</p></div><button class="text-link" data-view="team">${t(`seeAll`)} ${icon(r.lang===`ar`?`arrowLeft`:`arrow`,12)}</button></div><div class="team-table">${d.slice(0,6).map(e=>Xe(e,i)).join(``)}</div></section>`:``}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`attention`)}</h2><p class="panel-subtitle">${t(`attentionSub`)}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${u.length}</span></div><div class="attention-list">${u.length?u.map(Je).join(``):`<div class="empty">${icon(`check`,18)}<span>${t(`noAttention`)}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`recentPulse`)}</h2><p class="panel-subtitle">${t(`recentPulseSub`)}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${g} ${t(`done`)}</span></div>${Ze()}</section></div></div>`}function $e(){let{projects:e,tasks:n,users:i}=r.data,a=j(`export_reports`)||M(),o=n.reduce((e,n)=>e+Number(n.weight||1),0),s=o?Math.round(n.reduce((e,n)=>e+n.progress*Number(n.weight||1),0)/o):0,c=new Map;n.forEach(e=>{let n=(r.lang===`ar`?e.categoryAr:e.categoryEn)||choose(e.typeAr||`عام`,e.typeEn||`General`),i=c.get(n)||{weight:0,progress:0};i.weight+=Number(e.weight||1),i.progress+=e.progress*Number(e.weight||1),c.set(n,i)});let l=[...c.entries()].map(([e,n])=>({label:e,progress:n.weight?Math.round(n.progress/n.weight):0})).sort((e,n)=>n.progress-e.progress);return`<div class="page-head"><div><p class="eyebrow">${choose(`قراءة الأداء`,`PERFORMANCE READOUT`)}</p><h1>${t(`reports`)}</h1><p>${choose(`مؤشرات بسيطة تساعد الإدارة على رؤية الانحراف قبل أن يصبح تأخيرًا.`,`Simple signals that help management see drift before it becomes delay.`)}</p></div><div class="page-actions">${a?`<button class="btn btn-soft" data-action="export-csv">${icon(`document`,15)} ${choose(`تصدير التقرير (Excel)`,`Export Report (Excel)`)}</button>`:``}</div></div><div class="report-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${choose(`الإنجاز حسب التخصص`,`Progress by discipline`)}</h2><p class="panel-subtitle">${t(`weightedProgress`)}</p></div><span class="status-badge on_track">${s}%</span></div><div class="report-bars">${l.length?l.map(e=>`<div class="report-bar-row"><span>${esc(e.label)}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${e.progress}%"></div></div><strong>${e.progress}%</strong></div>`).join(``):`<div class="empty">${t(`noTasks`)}</div>`}</div></section><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${choose(`صحة المحفظة`,`Portfolio health`)}</h2><p class="panel-subtitle">${choose(`توزيع حالات المشاريع الحالية.`,`Current project status distribution.`)}</p></div></div><div class="report-stat-list"><div class="report-stat"><span>${t(`onTrack`)}</span><strong style="color:var(--mint-strong)">${e.filter(e=>e.health===`on_track`).length}</strong></div><div class="report-stat"><span>${t(`atRisk`)}</span><strong style="color:var(--amber)">${e.filter(e=>e.health===`at_risk`).length}</strong></div><div class="report-stat"><span>${t(`offTrack`)}</span><strong style="color:var(--red)">${e.filter(e=>e.health===`off_track`).length}</strong></div></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`teamLoad`)}</h2><p class="panel-subtitle">${choose(`المهام المفتوحة لكل عضو.`,`Open tasks per member.`)}</p></div></div><div class="report-stat-list">${i.slice(0,5).map(e=>{let r=Ye(e.id,n);return`<div class="report-stat"><span>${esc(choose(e.name,e.nameEn||e.name))}</span><strong>${r.tasks}</strong></div>`}).join(``)}</div></section></div></div>`}var et=n({STATUS_OPTIONS:()=>xt,buildAssigneeChipsHtml:()=>mt,buildRemindersListHtml:()=>ht,drawTimelineArrows:()=>St,filterTasks:()=>dt,formatRemindAtDate:()=>pt,getSavedTaskSort:()=>L,getTaskSortOrder:()=>I,initTaskModalWidgets:()=>_t,openDocumentPreviewModal:()=>bt,openTaskModal:()=>gt,renderBoard:()=>st,renderCalendar:()=>ct,renderTaskAssignees:()=>tt,renderTaskComments:()=>vt,renderTaskDocuments:()=>yt,renderTaskSortSelect:()=>at,renderTasks:()=>ft,renderTimeline:()=>lt,renderTimelinePanel:()=>ut,setSavedTaskSort:()=>it,sortTasks:()=>ot,sortTasksByImportance:()=>rt,taskCard:()=>nt});function tt(e){let n=r.data?.users||[],i=r._userMap||new Map(n.map(e=>[e.id,e])),a=e.assignee||i.get(e.assigneeId),o=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(e=>i.get(e)).filter(Boolean),s=e.customFields?.externalAssignees||e.customFields?.external_assignees||[],c=`<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">`;return a||o.length?(c+=`<div class="avatar-stack" style="display:flex;align-items:center;">`,a&&(c+=`<span title="${esc(choose(a.name,a.nameEn||a.name))}">${avatar(a,`mini-avatar`)}</span>`),o.slice(0,2).forEach(e=>{c+=`<span title="${esc(choose(e.name,e.nameEn||e.name))}" style="margin-inline-start:-8px;">${avatar(e,`mini-avatar`)}</span>`}),o.length>2&&(c+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${o.slice(2).map(e=>choose(e.name,e.nameEn||e.name)).join(`، `)}">+${o.length-2}</span>`),c+=`</div>`,a&&(c+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${esc(choose(a.name,a.nameEn||a.name))}</span>`)):s.length||(c+=`<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>`),s.length&&(s.slice(0,2).forEach(e=>{c+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${esc(e)}">🌐 ${esc(e)} <small style="opacity:0.8">(${choose(`خارجي`,`Ext`)})</small></span>`}),s.length>2&&(c+=`<span style="font-size:10px;color:var(--amber);" title="${s.slice(2).map(esc).join(`، `)}">+${s.length-2}</span>`)),c+=`</div>`,c}function nt(e){let n=isOverdue(e),i=n?`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${icon(`alert`,11)} ${t(`overdue`)}</span>`:``,a=r._commentCounts?r._commentCounts[e.id]||0:(r.data?.comments||[]).filter(n=>n.taskId===e.id).length,o=r._docCounts?r._docCounts[e.id]||0:(r.data?.documents||[]).filter(n=>n.taskId===e.id).length,s=e.progress===100?`var(--mint-strong)`:e.progress>=80?`var(--amber)`:e.progress>0?`var(--blue)`:`var(--line)`,c=isAdmin()||can(`edit_tasks`)||e.assigneeId===r.data?.user?.id;return`<article class="task-card ${n?`is-overdue`:``} ${c?``:`not-draggable`}" draggable="${c?`true`:`false`}" data-action="open-task" data-task-id="${esc(e.id)}">
    <div class="task-card-top">
      <span class="task-code">${esc(e.templateId?e.templateId.replace(`tpl-`,`#`):`#CUSTOM`)}</span>
      <div style="display:flex;align-items:center;gap:6px;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${choose(`بانتظار المزامنة مع السيرفر`,`Pending cloud sync`)}">⏳ ${choose(`معلقة`,`Pending`)}</span>`:``}
        ${a>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${a} ${choose(`تعليقات`,`comments`)}">💬 ${a}</span>`:``}
        ${o>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${o} ${choose(`مرفقات`,`attachments`)}">📎 ${o}</span>`:``}
        ${i}
        <span class="priority-badge ${esc(e.priority)}">${esc(priorityText(e.priority))}</span>
      </div>
    </div>
    <h4>${esc(choose(e.titleAr,e.titleEn))}</h4>
    ${(()=>{let n=String(choose(e.descriptionAr||e.description,e.descriptionEn||e.description)||``).trim();if(!n)return``;let r=n.length>50?n.substring(0,50).trim()+`...`:n;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${esc(n)}">${esc(r)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${esc(choose(e.categoryAr,e.categoryEn)||``)}</span>
      ${e.dueDate?`<span style="display:inline-flex;align-items:center;gap:3px;color:${n?`var(--red)`:`var(--muted)`};">${icon(`calendar`,11)} ${dateLabel(e.dueDate)}</span>`:``}
    </div>
    <div class="task-card-foot">
      ${tt(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?`var(--mint-strong)`:`var(--teal)`};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${s};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function I(e){if(!e)return 999999;if(typeof e.sortOrder==`number`)return e.sortOrder;if(typeof e.sort_order==`number`)return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder==`number`)return e.customFields.sortOrder;if(typeof e.customFields.sort_order==`number`)return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder==`number`)return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order==`number`)return e.custom_fields.sort_order}return 999999}function rt(e=[]){let n={urgent:4,high:3,medium:2,low:1},r=Date.now();return[...e].sort((e,i)=>{let a=+(e.status===`blocked`),o=+(i.status===`blocked`);if(a!==o)return o-a;let s=e.dueDate?new Date(`${e.dueDate.split(`T`)[0]}T23:59:59`).getTime():null,c=i.dueDate?new Date(`${i.dueDate.split(`T`)[0]}T23:59:59`).getTime():null,l=s&&s<r&&e.status!==`done`?1:0,u=c&&c<r&&i.status!==`done`?1:0;if(l!==u)return u-l;let d=n[e.priority]||2,f=n[i.priority]||2;if(d!==f)return f-d;if(s&&c){if(s!==c)return s-c}else if(s&&!c)return-1;else if(!s&&c)return 1;let p=I(e),m=I(i);return p===m?(e.titleAr||``).localeCompare(i.titleAr||``,`ar`):p-m})}function L(){return localStorage.getItem(`darc_task_sort_pref`)||`importance`}function it(e){localStorage.setItem(`darc_task_sort_pref`,e),r.taskSortPref=e,r.projectTaskSort=e,r.myTaskSort=e}function at(e,n=`sort-project-tasks`){let r=e||L();return`
    <div class="sort-box">
      <span>${choose(`الترتيب:`,`Sort:`)}</span>
      <select class="filter-select select-compact" data-action="${n}">
        <option value="importance" ${r===`importance`?`selected`:``}>${choose(`حسب الأهمية والأولوية (افتراضي)`,`By Importance & Priority (Default)`)}</option>
        <option value="deadline" ${r===`deadline`?`selected`:``}>${choose(`الأقرب استحقاقاً`,`Earliest Deadline`)}</option>
        <option value="custom" ${r===`custom`?`selected`:``}>${choose(`ترتيب مخصص (السحب والإسقاط)`,`Custom (Drag & Drop)`)}</option>
        <option value="alpha" ${r===`alpha`?`selected`:``}>${choose(`أبجدياً`,`Alphabetical`)}</option>
      </select>
    </div>
  `}function ot(e=[],n=L()){return n===`deadline`?[...e].sort((e,n)=>(e.dueDate?new Date(`${e.dueDate.split(`T`)[0]}T23:59:59`).getTime():1/0)-(n.dueDate?new Date(`${n.dueDate.split(`T`)[0]}T23:59:59`).getTime():1/0)):n===`custom`?[...e].sort((e,n)=>I(e)-I(n)):n===`alpha`?[...e].sort((e,n)=>(e.titleAr||``).localeCompare(n.titleAr||``,`ar`)):rt(e)}function st(e,n=L()){let i=r.data?.users||[];r._userMap=new Map(i.map(e=>[e.id,e]));let a={};for(let e of r.data?.comments||[])e.taskId&&(a[e.taskId]=(a[e.taskId]||0)+1);let o={};for(let e of r.data?.documents||[])e.taskId&&(o[e.taskId]=(o[e.taskId]||0)+1);return r._commentCounts=a,r._docCounts=o,`<div class="board">${[{key:`not_started`,dot:``,label:t(`notStarted`)},{key:`in_progress`,dot:`blue`,label:t(`inProgress`)},{key:`review`,dot:`amber`,label:choose(`مراجعة / اعتماد`,`Review / approval`),statuses:[`review`,`approval`,`blocked`]},{key:`done`,dot:`green`,label:t(`done`)}].map(r=>{let i=ot(e.filter(e=>(r.statuses||[r.key]).includes(e.status)),n);return`<section class="board-column" data-status="${r.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${r.dot}"></span>${r.label}</div><span class="board-count">${i.length}</span></div><div class="board-cards">${i.length?i.map(nt).join(``):`<div class="empty" style="min-height:150px;pointer-events:none;">${t(`noTasks`)}</div>`}</div></section>`}).join(``)}</div>`}function ct(e,n){let i=r.calendarDate?new Date(r.calendarDate):new Date,a=i.getFullYear(),o=i.getMonth(),s=`${r.lang===`ar`?[`يناير`,`فبراير`,`مارس`,`أبريل`,`مايو`,`يونيو`,`يوليو`,`أغسطس`,`سبتمبر`,`أكتوبر`,`نوفمبر`,`ديسمبر`][o]:[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`][o]} ${a}`,c=r.lang===`ar`?[`الأحد`,`الإثنين`,`الثلاثاء`,`الأربعاء`,`الخميس`,`الجمعة`,`السبت`]:[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],l=new Date(a,o,1).getDay(),u=new Date(a,o+1,0).getDate(),d=new Date,f=d.getFullYear()===a&&d.getMonth()===o,p=``;for(let e=0;e<l;e++)p+=`<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>`;for(let n=1;n<=u;n++){let r=f&&d.getDate()===n,i=`${a}-${String(o+1).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,s=e.filter(e=>{if(!e.dueDate&&!e.startDate)return!1;let n=e.dueDate?e.dueDate.split(`T`)[0]:null,r=e.startDate?e.startDate.split(`T`)[0]:null;return n===i||r===i});p+=`
      <div class="calendar-day ${r?`is-today`:``}" style="min-height:95px;min-width:0;overflow:hidden;background:${r?`var(--mint)`:`var(--surface)`};border:1px solid ${r?`var(--teal)`:`var(--line)`};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${r?`bold`:`600`};color:${r?`var(--teal)`:`var(--ink)`};">
          <span>${n}</span>
          ${r?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${choose(`اليوم`,`Today`)}</span>`:``}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${s.map(e=>{let n=de(e);return`
              <div data-action="open-task" data-task-id="${esc(e.id)}" style="background:${n.bgColor};border:1px solid ${n.borderColor};border-inline-start:3px solid ${n.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${n.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${esc(choose(e.titleAr,e.titleEn))} — ${n.label}">
                <span style="font-weight:700;">${esc(choose(e.titleAr,e.titleEn))}</span>
              </div>
            `}).join(``)}
        </div>
      </div>
    `}return`
    <div class="calendar-wrapper" style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;">
      <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;font-size:15px;color:var(--ink);display:flex;align-items:center;gap:8px;">
          ${icon(`calendar`,16)} ${s}
        </h3>
        <div style="display:flex;align-items:center;gap:6px;">
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${icon(r.lang===`ar`?`arrow`:`arrowLeft`,12)} ${choose(`السابق`,`Prev`)}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${choose(`اليوم`,`Today`)}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${choose(`التالي`,`Next`)} ${icon(r.lang===`ar`?`arrowLeft`:`arrow`,12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${c.map(e=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e}</div>`).join(``)}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${p}
      </div>
    </div>
  `}function lt(e){let n=e.filter(e=>e.startDate&&e.dueDate).sort((e,n)=>new Date(e.startDate)-new Date(n.startDate));if(!n.length)return`<div class="empty" style="min-height:300px">${icon(`calendar`,24)}<span>${choose(`لا توجد مهام مجدولة زمنياً في هذا المشروع.`,`No scheduled tasks in this project.`)}</span></div>`;let i=Math.min(...n.map(e=>new Date(e.startDate).getTime())),a=Math.max(...n.map(e=>new Date(e.dueDate).getTime())),o=2592e5;i-=o,a+=o;let s=Math.max(7,Math.ceil((a-i)/864e5)),c=``;for(let e=0;e<s;e++){let n=new Date(i+e*864e5),a=n.getDay()===5||n.getDay()===6;c+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${a?`var(--surface-soft)`:`transparent`};border-bottom:1px solid var(--line)">${n.getDate()}<br>${n.toLocaleDateString(r.lang===`ar`?`ar-SA`:`en-US`,{month:`short`})}</div>`}let l=n.map((e,n)=>{let a=Math.floor((new Date(e.startDate).getTime()-i)/864e5)+1,o=a+Math.max(1,Math.ceil((new Date(e.dueDate).getTime()-new Date(e.startDate).getTime())/864e5)+1),s=de(e);return`<div style="display:contents" class="timeline-row" data-task-id="${e.id}" data-row="${n}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${e.id}" style="grid-column: ${a} / ${o}; margin: 8px 4px; background: ${s.color}; border: 1px solid ${s.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${esc(choose(e.titleAr,e.titleEn))} — ${s.label}">
        <span style="font-weight:600;opacity:0.9">${esc(e.templateId?e.templateId.replace(`tpl-`,`#`):`#`)}</span> ${esc(choose(e.titleAr,e.titleEn))}
        ${e.dependencies&&e.dependencies.length?`<span style="float:${r.lang===`ar`?`left`:`right`};opacity:0.8">${icon(`link`,10)}</span>`:``}
      </div>
    </div>`}).join(``);return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${s}, minmax(40px, 1fr)); min-width: ${s*40}px; position: relative;">
      ${c}
      ${l}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function ut(e,n){let i=r.timelineView||`gantt`;return`
    <div class="panel">
      <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 class="panel-title">${choose(`المخطط الزمني والتقويم`,`Timeline & Calendar`)}</h2>
          <p class="panel-subtitle">${choose(`متابعة تسلسل المهام ومواعيد التسليم بالصيغة الأنسب لك.`,`Track task flow and milestone deadlines in your preferred format.`)}</p>
        </div>
        <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:3px;gap:3px;">
          <button class="btn btn-sm ${i===`gantt`?`btn-primary`:`btn-ghost`}" data-action="toggle-timeline-view" data-view-mode="gantt" style="font-size:11px;padding:4px 10px;">
            ${icon(`clock`,12)} ${choose(`مخطط جانت`,`Gantt Chart`)}
          </button>
          <button class="btn btn-sm ${i===`calendar`?`btn-primary`:`btn-ghost`}" data-action="toggle-timeline-view" data-view-mode="calendar" style="font-size:11px;padding:4px 10px;">
            ${icon(`calendar`,12)} ${choose(`عرض التقويم`,`Calendar View`)}
          </button>
        </div>
      </div>
      
      ${i===`calendar`?ct(e,n):lt(e)}
    </div>
  `}window.__timelineExports={renderTimelinePanel:ut,renderCalendar:ct,renderTimeline:lt};function dt(e){let n=r.searches.tasks.trim().toLowerCase();return e.filter(e=>{let i=`${e.titleAr} ${e.titleEn} ${e.categoryAr} ${e.categoryEn}`.toLowerCase().includes(n),a=r.taskFilter===`all`||r.taskFilter===`mine`&&e.assigneeId===r.data.user.id||r.taskFilter===`overdue`&&isOverdue(e)||r.taskFilter===`blocked`&&e.status===`blocked`,o=r.taskProjectFilter===`all`||e.projectId===r.taskProjectFilter,s=!r.taskPriorityFilter||r.taskPriorityFilter===`all`||e.priority===r.taskPriorityFilter;return i&&a&&o&&s})}function ft(){let e=dt(r.data.tasks),n=[[`all`,t(`all`)],[`mine`,choose(`مسندة لي`,`Assigned to me`)],[`overdue`,t(`overdue`)],[`blocked`,t(`blocked`)]],i=r.myTaskSort||L();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${choose(`حركة التنفيذ`,`EXECUTION`)}</p>
        <h1>${t(`myTasks`)}</h1>
        <p>${choose(`نظّم العمل حسب الحالة، الموعد، والمسؤولية.`,`Organize work by status, deadline, and ownership.`)}</p>
      </div>
      <div class="page-actions">
        ${can(`create_tasks`)?`<button class="btn btn-primary" data-action="new-task">${icon(`plus`,15)} ${t(`addTask`)}</button>`:``}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${n.map(([e,n])=>`
            <button class="segmented-tab ${r.taskFilter===e?`active`:``}" data-action="task-filter" data-filter="${e}" role="tab">
              ${n}
            </button>
          `).join(``)}
        </div>
        <div class="search-box tasks-search-box">
          ${icon(`search`,15)}
          <input data-search="tasks" value="${esc(r.searches.tasks)}" placeholder="${choose(`بحث في المهام...`,`Search tasks...`)}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${choose(`📁 كل المشاريع`,`📁 All Projects`)}</option>
            ${r.data.projects.map(e=>`<option value="${esc(e.id)}" ${r.taskProjectFilter===e.id?`selected`:``}>${esc(choose(e.nameAr,e.nameEn))}</option>`).join(``)}
          </select>
          <select class="filter-select select-compact" data-action="task-priority-filter" style="min-width:140px;">
            <option value="all">${choose(`⚡ كل الأولويات`,`⚡ All Priorities`)}</option>
            <option value="urgent" ${r.taskPriorityFilter===`urgent`?`selected`:``}>🔥 ${choose(`عاجلة`,`Urgent`)}</option>
            <option value="high" ${r.taskPriorityFilter===`high`?`selected`:``}>⚡ ${choose(`عالية`,`High`)}</option>
            <option value="medium" ${r.taskPriorityFilter===`medium`?`selected`:``}>🔹 ${choose(`متوسطة`,`Medium`)}</option>
            <option value="low" ${r.taskPriorityFilter===`low`?`selected`:``}>☕ ${choose(`منخفضة`,`Low`)}</option>
          </select>
        </div>
        <div class="tasks-toolbar-sort">
          ${at(i,`sort-my-tasks`)}
        </div>
      </div>
    </div>

    ${e.length?st(e,i):`<section class="panel"><div class="empty">${icon(`checklist`,18)}<span>${t(`noTasks`)}</span></div></section>`}
  `}function pt(e){if(!e)return`—`;try{let n=new Date(e);return isNaN(n.getTime())?e:new Intl.DateTimeFormat(r.lang===`ar`?`ar-SA`:`en-US`,{year:`numeric`,month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(n)}catch{return e}}function mt(e=[],n=[]){let i=r.data?.users||[],a=``;return e.forEach(e=>{let n=i.find(n=>n.id===e)||{name:e,id:e};a+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${avatar(n,`mini-avatar`)}
        <span style="font-weight:500;">${esc(choose(n.name,n.nameEn||n.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${esc(e)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${choose(`إزالة`,`Remove`)}">×</button>
      </span>
    `}),n.forEach(e=>{a+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${esc(e)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${choose(`خارجي`,`Ext`)}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${esc(e)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${choose(`إزالة`,`Remove`)}">×</button>
      </span>
    `}),a}function ht(e=[]){return e.length?e.map((e,n)=>`
    <div class="reminder-card-row" data-idx="${n}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${esc(pt(e.remindAt))}</strong>
        ${e.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${esc(e.noteAr)}">(${esc(e.noteAr)})</span>`:``}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${n}" data-rem-id="${esc(e.id||``)}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${choose(`حذف التذكير`,`Delete reminder`)}">
        ${icon(`trash`,13)}
      </button>
    </div>
  `).join(``):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${choose(`لا توجد مواعيد تذكير مجدولة لهذه المهمة`,`No scheduled reminders for this task`)}</div>`}function gt(e=null,n=null,i=null){let a=r.data.templates.find(r=>r.id===(n||e?.templateId)),o=e?.projectId||i||r.activeProjectId||r.data.projects[0]?.id||``,s=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],c=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[],l=[];Array.isArray(e?.customFields?.reminders)?l=e.customFields.reminders:e?.remindAt?l=[{id:`rem_`+Math.random().toString(36).substr(2,9),remindAt:e.remindAt,noteAr:``}]:Array.isArray(r.data?.reminders)&&e?.id&&(l=r.data.reminders.filter(n=>n.taskId===e.id));let u=e?.progress===void 0?e?.status===`done`?100:e?.status===`review`||e?.status===`approval`?80:e?.status===`in_progress`?50:0:e.progress,d=s.length>0||c.length>0,f=d?mt(s,c):``,p=ht(l),m=`<form id="task-form" data-task-id="${esc(e?.id||``)}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${esc(e?.typeAr||a?.typeAr||(a?`مخطط`:``))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${esc(e?.typeEn||a?.typeEn||(a?`Drawing`:``))}" />
    <input type="hidden" name="additionalAssignees" id="task-additional-assignees-input" value="${esc(JSON.stringify(s))}" />
    <input type="hidden" name="externalAssignees" id="task-external-assignees-input" value="${esc(JSON.stringify(c))}" />
    <input type="hidden" name="remindersJson" id="task-reminders-input" value="${esc(JSON.stringify(l))}" />

    <div class="form-grid">
      <!-- 📋 القسم 1: البيانات الأساسية والمكتبة القياسية -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 2px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📋</span> <span>${choose(`البيانات الأساسية والمكتبة القياسية`,`Basic Details & Standard Library`)}</span>
      </div>

      <div class="field full">
        <label>${choose(`المشروع التابع له`,`Project`)} *</label>
        <select name="projectId" id="task-project-select" required>
          ${r.data.projects.map(e=>`<option value="${esc(e.id)}" ${e.id===o?`selected`:``}>${esc(choose(e.nameAr,e.nameEn))} (${esc(e.code)})</option>`).join(``)}
        </select>
      </div>

      <div class="field full">
        <label>${t(`taskTitle`)} *</label>
        <input name="titleAr" id="task-title-ar" value="${esc(e?.titleAr||a?.nameAr||``)}" placeholder="${choose(`اسم المخرج أو المهمة`,`Deliverable or task name`)}" required />
      </div>
      <div class="field">
        <label>${t(`nameEn`)}</label>
        <input name="titleEn" id="task-title-en" value="${esc(e?.titleEn||a?.nameEn||``)}" placeholder="${choose(`Task / Deliverable Name (EN)`,`Task / Deliverable Name (EN)`)}" />
      </div>
      <div class="field">
        <label>${t(`addFromLibrary`)}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${choose(`مهمة مخصصة`,`Custom task`)}</option>
          ${r.data.templates.map(r=>`<option value="${esc(r.id)}" ${(e?.templateId||n)===r.id?`selected`:``}>${esc(r.code)} — ${esc(choose(r.nameAr,r.nameEn))}</option>`).join(``)}
        </select>
      </div>

      <!-- 👥 القسم 2: المسؤوليات وفريق العمل -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>👥</span> <span>${choose(`المسؤوليات وفريق العمل`,`Ownership & Team`)}</span>
      </div>

      <div class="field full">
        <label>${choose(`المسؤول الرئيسي`,`Primary Assignee`)}</label>
        <select name="assigneeId" id="task-primary-assignee">
          <option value="">${choose(`— بدون تحديد —`,`— Unassigned —`)}</option>
          ${r.data.users.map(n=>`<option value="${esc(n.id)}" ${(e?e.assigneeId===n.id:r.data.user.id===n.id)?`selected`:``}>${esc(choose(n.name,n.nameEn||n.name))}</option>`).join(``)}
        </select>
      </div>

      <!-- قائمة منسدلة موحدة وسريعة للبحث والتحديد للأعضاء والمسؤولين الخارجيين -->
      <div class="field full" style="position:relative;">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${choose(`فريق العمل والمسؤولون المشاركون (داخلي وخارجي)`,`Collaborators & Assignees (Team & External)`)}</span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${choose(`اختر من الفريق أو اكتب اسماً خارجياً واضغط إضافة`,`Pick team members or type external name`)}</span>
        </label>

        <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
        <div id="assignees-chips-container" style="display:${d?`flex`:`none`};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
          ${f}
        </div>

        <!-- حقل البحث والإضافة السريعة -->
        <div style="position:relative;display:flex;gap:6px;">
          <input type="text" id="assignee-combobox-search" placeholder="${choose(`ابحث عن عضو بالفريق أو اكتب اسماً خارجياً...`,`Search team member or type external name...`)}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          <button type="button" id="btn-add-external-quick" class="btn btn-soft btn-sm" style="display:none;padding:0 12px;white-space:nowrap;font-size:11px;">
            ➕ ${choose(`إضافة كمسؤول خارجي`,`Add external`)}
          </button>
        </div>

        <!-- القائمة المنسدلة للبحث والاختيار -->
        <div id="assignee-combobox-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
        </div>
      </div>

      <!-- ⏱️ القسم 3: الحالة والجدولة والتذكيرات (بدون تبعيات نهائياً) -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>⏱️</span> <span>${choose(`الحالة والجدولة والتذكيرات`,`Status, Scheduling & Reminders`)}</span>
      </div>

      <div class="field">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${t(`status`)}</span>
          <span id="task-auto-progress-badge" style="font-size:11px;font-weight:600;color:var(--teal);">(${u}%)</span>
        </label>
        <select name="status" id="task-status-select">${xt().map(([n,r])=>`<option value="${n}" ${e?.status===n?`selected`:``}>${r}</option>`).join(``)}</select>
      </div>
      <div class="field">
        <label>${t(`priority`)}</label>
        <select name="priority">${[`low`,`medium`,`high`,`urgent`].map(n=>`<option value="${n}" ${(e?.priority||`medium`)===n?`selected`:``}>${priorityText(n)}</option>`).join(``)}</select>
      </div>
      <div class="field">
        <label>${t(`startDate`)}</label>
        <input type="date" name="startDate" id="task-start-date" value="${esc(e?.startDate||``)}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${t(`dueDate`)}</label>
        <input type="date" name="dueDate" id="task-due-date" value="${esc(e?.dueDate||``)}" min="${esc(e?.startDate||``)}" onchange="const st = document.getElementById('task-start-date'); if (st && st.value && this.value < st.value) this.value = st.value;" />
      </div>

      <!-- أداة التذكيرات المتعددة التفاعلية -->
      <div class="field full" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:10px;padding:12px;">
        <label style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:600;display:flex;align-items:center;gap:6px;">
            <span>⏰</span> ${choose(`تذكيرات المهمة (إشعار نظام + بريد إلكتروني للمسؤول)`,`Task Reminders (System Notification + Email to Assignee)`)}
          </span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${choose(`يمكنك إضافة أكثر من موعد تذكير وحذف ما تشاء`,`Add multiple reminders and delete any`)}</span>
        </label>

        <!-- قائمة التذكيرات المضافة (Pre-rendered for zero layout shift) -->
        <div id="task-reminders-list" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
          ${p}
        </div>

        <!-- صف إضافة تذكير جديد -->
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <input type="datetime-local" id="new-reminder-datetime" style="flex:1;min-width:180px;font-size:12px;padding:6px 10px;" />
          <input type="text" id="new-reminder-note" placeholder="${choose(`ملاحظة التذكير (اختياري)...`,`Reminder note (optional)...`)}" style="flex:1;min-width:150px;font-size:12px;padding:6px 10px;" />
          <button type="button" id="btn-add-reminder" class="btn btn-soft btn-sm" style="white-space:nowrap;padding:7px 12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">
            ➕ ${choose(`إضافة تذكير`,`Add Reminder`)}
          </button>
        </div>
      </div>

      <!-- 📝 القسم 4: تفاصيل ومخرجات المهمة -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📝</span> <span>${choose(`تفاصيل ومخرجات المهمة`,`Task Details & Deliverables`)}</span>
      </div>

      <div class="field full">
        <label>${t(`description`)}</label>
        <textarea name="descriptionAr" placeholder="${choose(`ما المطلوب؟ وما معيار الإغلاق؟`,`What is required and what defines completion?`)}">${esc(e?.descriptionAr||``)}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${e&&(can(`delete_tasks`)||isAdmin())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${esc(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${choose(`حذف المهمة ونقلها لسلة المهملات`,`Delete task and move to trash`)}">
            ${icon(`trash`,14)} ${choose(`حذف المهمة`,`Delete Task`)}
          </button>
        `:``}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${icon(`check`,14)} ${e?t(`save`):t(`create`)}</button>
      </div>
    </div>
  </form>`,h=m,g=``;e&&(g=`modal-lg`,h=`
      <div class="task-modal-layout">
        <div class="task-modal-col task-modal-main">
          <h3 style="margin:0 0 15px;font-size:14px;">${choose(`تفاصيل المهمة`,`Task Details`)}</h3>
          ${m}
        </div>
        <div class="task-modal-col task-modal-side">
          <div class="task-documents-section">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;font-size:14px;display:flex;align-items:center;gap:6px;">
                ${choose(`المخططات والملفات`,`Documents & Files`)}
              </h3>
              <label class="btn btn-soft btn-sm" style="cursor:pointer;margin:0;" id="task-upload-btn">
                ${icon(`plus`,12)} ${choose(`اختيار ملفات`,`Choose Files`)}
                <input type="file" multiple id="task-upload-input" data-task-id="${e.id}" style="display:none;" />
              </label>
            </div>
            <div id="task-dropzone" data-action="trigger-upload" data-task-id="${e.id}" style="border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;background:var(--surface-soft);cursor:pointer;transition:all 0.2s ease;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;">
                <span style="color:var(--brand-teal);">${icon(`upload`,22)}</span>
                <div style="font-size:12px;font-weight:600;color:var(--ink);">${choose(`اسحب المخططات والملفات وأفلتها هنا، أو اضغط للتصفح`,`Drag & drop files here, or click to browse`)}</div>
                <div style="font-size:10px;color:var(--muted);">${choose(`دعم كامل لملفات CAD و PDF و 3D و الصور حتى 5GB`,`Full support for CAD, PDF, 3D & images up to 5GB`)}</div>
              </div>
              <div id="upload-progress-container" style="display:none;margin-top:12px;padding:10px 12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.04);text-align:start;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--ink);margin-bottom:6px;gap:8px;">
                  <span id="upload-progress-text" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${choose(`جاري الرفع...`,`Uploading...`)}</span>
                  <strong id="upload-progress-percent" style="color:var(--brand-teal);font-variant-numeric:tabular-nums;flex-shrink:0;">0%</strong>
                </div>
                <div style="height:6px;background:var(--line);border-radius:3px;overflow:hidden;position:relative;">
                  <div id="upload-progress-bar" style="width:0%;height:100%;background:linear-gradient(90deg, var(--brand-teal), #00c2cb);border-radius:3px;transition:width 0.15s ease;"></div>
                </div>
              </div>
            </div>
            <div id="task-documents-list">${yt(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${choose(`النقاشات والتعليقات`,`Discussion & Comments`)}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${vt(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${choose(`اكتب تعليقاً... (استخدم @ للإشارة)`,`Write a comment... (use @ to mention)`)}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${choose(`إرسال`,`Send`)}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `),document.getElementById(`modal-root`).innerHTML=modalShell(e?choose(`تعديل المهمة`,`Edit task`):t(`addTask`),choose(`المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.`,`A task is the unit of execution; link a standard deliverable and add a reminder.`),h,`task`,g),_t(e)}function _t(e){let n=document.getElementById(`modal-root`);if(!n)return;let i=n.querySelector(`#task-status-select`),a=n.querySelector(`#task-auto-progress-badge`);i&&a&&i.addEventListener(`change`,()=>{let e={not_started:0,in_progress:50,review:80,approval:80,done:100}[i.value]??0;a.textContent=`(${e}%)`});let o=n.querySelector(`#task-template-select`);o&&o.addEventListener(`change`,()=>{let e=o.value,i=(r.data?.templates||[]).find(n=>n.id===e);if(i){let e=n.querySelector(`#task-title-ar`),r=n.querySelector(`#task-title-en`),a=n.querySelector(`#task-type-ar`),o=n.querySelector(`#task-type-en`);e&&!e.value&&(e.value=i.nameAr||``),r&&!r.value&&(r.value=i.nameEn||``),a&&(a.value=i.typeAr||`مخطط`),o&&(o.value=i.typeEn||`Drawing`)}});let s=n.querySelector(`#task-additional-assignees-input`),c=n.querySelector(`#task-external-assignees-input`),l=n.querySelector(`#assignees-chips-container`),u=n.querySelector(`#assignee-combobox-search`),d=n.querySelector(`#assignee-combobox-dropdown`),f=n.querySelector(`#btn-add-external-quick`),p=[];try{p=JSON.parse(s?.value||`[]`)}catch{p=[]}let m=[];try{m=JSON.parse(c?.value||`[]`)}catch{m=[]}function h(){s&&(s.value=JSON.stringify(p)),c&&(c.value=JSON.stringify(m))}function g(){l&&(p.length===0&&m.length===0?(l.style.display=`none`,l.innerHTML=``,h()):(l.style.display=`flex`,l.innerHTML=mt(p,m),h()))}function _(e=``){if(!d)return;let i=e.trim().toLowerCase(),a=r.data?.users||[],o=n.querySelector(`#task-primary-assignee`)?.value,s=a.filter(e=>{if(e.id===o)return!1;if(!i)return!0;let n=(e.name||``).toLowerCase(),r=(e.nameEn||``).toLowerCase(),a=(e.email||``).toLowerCase();return n.includes(i)||r.includes(i)||a.includes(i)}),c=``;i&&(c+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${choose(`إضافة مسؤول خارجي:`,`Add external assignee:`)} "${esc(e.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${choose(`إضافة سريعة`,`Quick Add`)}</span>
        </div>
      `),s.length===0&&!i?c+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${choose(`لا يوجد مستخدمين آخرين`,`No other users`)}</div>`:s.forEach(e=>{let n=p.includes(e.id);c+=`
          <div class="combobox-user-row" data-uid="${esc(e.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${esc(e.id)}" ${n?`checked`:``} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${avatar(e,`mini-avatar`)}
              <div>
                <strong style="color:var(--ink);">${esc(choose(e.name,e.nameEn||e.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${esc(choose(e.jobTitleAr,e.jobTitleEn)||e.email||``)}</span>
              </div>
            </div>
            ${n?`<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>`:``}
          </div>
        `}),d.innerHTML=c,d.style.display=`block`}h(),u&&(u.addEventListener(`focus`,()=>{_(u.value)}),u.addEventListener(`input`,()=>{let e=u.value.trim();_(e),f&&(f.style.display=e.length>1?`inline-flex`:`none`)}),u.addEventListener(`keydown`,e=>{if(e.key===`Enter`){e.preventDefault();let n=u.value.trim();n&&(m.includes(n)||(m.push(n),g()),u.value=``,f&&(f.style.display=`none`),d&&(d.style.display=`none`))}})),f&&f.addEventListener(`click`,()=>{let e=u?.value.trim();e&&(m.includes(e)||(m.push(e),g()),u.value=``,f.style.display=`none`,d&&(d.style.display=`none`))}),d&&d.addEventListener(`click`,e=>{if(e.target.closest(`.dropdown-ext-action`)){let e=u?.value.trim();e&&!m.includes(e)&&(m.push(e),g()),u&&(u.value=``),f&&(f.style.display=`none`),d.style.display=`none`;return}let n=e.target.closest(`.combobox-user-row`);if(n){let e=n.dataset.uid;p.includes(e)?p=p.filter(n=>n!==e):p.push(e),g(),_(u?.value||``)}}),l&&l.addEventListener(`click`,e=>{let n=e.target.closest(`.btn-remove-chip-user`);if(n){let e=n.dataset.uid;p=p.filter(n=>n!==e),g(),d&&d.style.display===`block`&&_(u?.value||``);return}let r=e.target.closest(`.btn-remove-chip-ext`);if(r){let e=r.dataset.ext;m=m.filter(n=>n!==e),g()}});let v=n.querySelector(`#task-reminders-input`),y=n.querySelector(`#task-reminders-list`),b=n.querySelector(`#new-reminder-datetime`),x=n.querySelector(`#new-reminder-note`),S=n.querySelector(`#btn-add-reminder`),C=[];try{C=JSON.parse(v?.value||`[]`)}catch{C=[]}Array.isArray(C)||(C=[]);function w(){y&&(v&&(v.value=JSON.stringify(C)),y.innerHTML=ht(C))}S&&S.addEventListener(`click`,()=>{let e=b?.value;if(!e){showToast(choose(`يرجى اختيار تاريخ ووقت التذكير.`,`Please pick a reminder date & time.`),!0);return}let n=x?.value.trim()||``,r={id:`rem_temp_`+Math.random().toString(36).substr(2,9),remindAt:new Date(e).toISOString(),noteAr:n};C.push(r),b&&(b.value=``),x&&(x.value=``),w(),showToast(choose(`تمت إضافة موعد التذكير للقائمة.`,`Reminder added to list.`))}),y&&y.addEventListener(`click`,async e=>{let n=e.target.closest(`.btn-delete-reminder`);if(n){let e=Number(n.dataset.idx),r=n.dataset.remId;!isNaN(e)&&e>=0&&e<C.length&&(C.splice(e,1),w(),r&&!r.startsWith(`rem_temp_`)&&P(`/api/reminders/${r}`,{method:`DELETE`}).catch(()=>{}),showToast(choose(`تم حذف موعد التذكير.`,`Reminder deleted.`)))}}),n.addEventListener(`mousedown`,e=>{d?.contains(e.target)||u?.contains(e.target)||f?.contains(e.target)||(d&&(d.style.display=`none`),f&&(f.style.display=`none`))})}function vt(e){let n=(r.data.comments||[]).filter(n=>n.taskId===e.id).sort((e,n)=>new Date(e.createdAt)-new Date(n.createdAt));return n.length?`<div style="display:flex;flex-direction:column;gap:12px;">${n.map(n=>{let i=n.user||(r.data?.users||[]).find(e=>e.id===n.userId)||r.data?.user||{name:`DARC Member`,id:``},a=!!(i.id&&r.data?.user?.id&&i.id===r.data.user.id),o=a||typeof isAdmin==`function`&&isAdmin(),s=esc(n.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,`<strong style="color:var(--blue)">@$1</strong>`);return`
      <div class="task-comment-item" data-comment-id="${esc(n.id)}" style="display:flex;gap:10px;flex-direction:${a?`row-reverse`:`row`};">
        ${avatar(i)}
        <div style="display:flex;flex-direction:column;align-items:${a?`flex-end`:`flex-start`};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${esc(choose(i.name,i.nameEn||i.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${dateLabel(n.createdAt,!0)}</span>
            ${o?`
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${esc(n.id)}" data-task-id="${esc(e.id)}" title="${choose(`تعديل التعليق`,`Edit comment`)}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${icon(`edit`,12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${esc(n.id)}" data-task-id="${esc(e.id)}" title="${choose(`حذف التعليق`,`Delete comment`)}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${icon(`trash`,12)}
                </button>
              </div>
            `:``}
          </div>
          <div id="comment-bubble-${esc(n.id)}" style="background:${a?`var(--blue)`:`var(--surface)`};color:${a?`#fff`:`var(--ink)`};padding:8px 12px;border-radius:12px;font-size:13px;border:${a?`none`:`1px solid var(--border)`};border-top-${a?`right`:`left`}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${s}</div>
        </div>
      </div>
    `}).join(``)}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${icon(`message`,18)}<span style="font-size:12px;">${choose(`لا توجد تعليقات`,`No comments yet`)}</span></div>`}function yt(e){let n=r.data.documents.filter(n=>n.taskId===e.id).sort((e,n)=>new Date(n.createdAt)-new Date(e.createdAt));return n.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${n.map(e=>`
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;transition:background 0.15s ease;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;cursor:pointer;" data-action="preview-doc" data-doc-id="${e.id}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${icon(`document`,14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${esc(e.originalName)}">${esc(e.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${dateLabel(e.createdAt,!0)} · ${esc(e.user?choose(e.user.name,e.user.nameEn||e.user.name):`Team Member`)} · ${e.size>1048576?(e.size/1048576).toFixed(1)+`MB`:Math.round(e.size/1024)+`KB`}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${e.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${choose(`نسخ رابط المشاركة`,`Copy share link`)}">${icon(`link`,14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${e.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${choose(`معاينة المخطط في نافذة منبثقة`,`Preview in popup modal`)}">${icon(`eye`,14)}</button>
        ${can(`review_tasks`)||can(`approve_tasks`)||can(`upload_documents`)||isAdmin()?`
          <select class="doc-status-select" data-doc-id="${e.id}" style="font-size:11px;padding:2px 4px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);">
            <option value="draft" ${e.status===`draft`?`selected`:``}>${choose(`مسودة`,`Draft`)}</option>
            ${can(`review_tasks`)||isAdmin()?`<option value="review" ${e.status===`review`?`selected`:``}>${choose(`مراجعة`,`Review`)}</option>`:``}
            ${can(`approve_tasks`)||isAdmin()?`<option value="approved" ${e.status===`approved`?`selected`:``}>${choose(`معتمد`,`Approved`)}</option>`:``}
            <option value="superseded" ${e.status===`superseded`?`selected`:``}>${choose(`ملغى`,`Superseded`)}</option>
          </select>
        `:``}
        ${can(`upload_documents`)||isAdmin()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${e.id}" style="padding:4px;min-width:0;height:auto;" title="${choose(`إعادة تسمية`,`Rename`)}">${icon(`edit`,14)}</button>`:``}
        ${can(`delete_documents`)||isAdmin()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${e.id}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${choose(`حذف`,`Delete`)}">${icon(`trash`,14)}</button>`:``}
      </div>
    </div>
  `).join(``)}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${icon(`document`,18)}<span style="font-size:12px;">${choose(`لا توجد ملفات مرفوعة`,`No documents uploaded`)}</span></div>`}function bt(e){let n=(r.data?.documents||[]).find(n=>n.id===e);if(!n)return;let i=n.diskFilename||`/api/documents/${n.id}`;(i.startsWith(`file://`)||i.startsWith(`/`)||!i.startsWith(`http`))&&(i=`/api/documents/${n.id}`);let a=``;if(i.includes(`drive.google.com`)){let e=i.match(/\/d\/([a-zA-Z0-9_-]+)/);e&&e[1]&&(a=e[1])}let o=a?`https://drive.google.com/file/d/${encodeURIComponent(a)}/preview`:i,s=/^(https?:\/\/|\/)/i.test(o)?o:`about:blank`,c=a?`https://drive.google.com/file/d/${encodeURIComponent(a)}/view?usp=drivesdk`:i.startsWith(`http`)?i:`${window.location.origin}${i}`,l=/^(https?:\/\/|\/)/i.test(c)?c:`#`,u=`/api/documents/${encodeURIComponent(n.id)}`,d=/\.(jpe?g|png|gif|webp|svg|heic)$/i.test(n.originalName)||n.mimeType&&n.mimeType.startsWith(`image/`);n.size>1048576?(n.size/1048576).toFixed(1)+``:Math.round((n.size||0)/1024)+``;let f=document.getElementById(`preview-modal-overlay`);f||(f=document.createElement(`div`),f.id=`preview-modal-overlay`,f.style.position=`fixed`,f.style.inset=`0`,f.style.zIndex=`1300`,f.style.background=`rgba(0, 0, 0, 0.75)`,f.style.backdropFilter=`blur(4px)`,f.style.display=`flex`,f.style.alignItems=`center`,f.style.justifyContent=`center`,f.style.padding=`20px`,document.body.appendChild(f)),f.innerHTML=`
    <div style="background:var(--surface);width:95%;max-width:1100px;height:88vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.3);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--border);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid var(--line);background:var(--surface);">
        <div style="display:flex;align-items:center;gap:10px;overflow:hidden;">
          <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${icon(`document`,16)}</span>
          <div style="overflow:hidden;">
            <h2 style="margin:0;font-size:15px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${esc(n.originalName)}">${esc(n.originalName)}</h2>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <button type="button" class="btn btn-soft btn-sm" data-action="copy-doc-link" data-doc-id="${esc(n.id)}" style="display:flex;align-items:center;gap:6px;" title="${choose(`نسخ رابط المشاركة`,`Copy share link`)}">
            ${icon(`link`,13)} <span class="hide-mobile">${choose(`نسخ الرابط`,`Copy Link`)}</span>
          </button>
          <a href="${esc(l)}" target="_blank" rel="noopener noreferrer" class="btn btn-soft btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${choose(`فتح في Google Drive`,`Open in Google Drive`)}">
            ${icon(`globe`,13)} <span class="hide-mobile">${choose(`فتح في Drive`,`Open in Drive`)}</span>
          </a>
          <a href="${esc(u)}" target="_blank" download class="btn btn-primary btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${choose(`تحميل المخطط`,`Download`)}">
            ${icon(`download`,13)} <span class="hide-mobile">${choose(`تحميل`,`Download`)}</span>
          </a>
          <button type="button" class="btn btn-ghost btn-sm" id="close-preview-modal-btn" style="padding:6px;min-width:0;margin-inline-start:4px;" title="${choose(`إغلاق`,`Close`)}">${icon(`close`,18)}</button>
        </div>
      </div>
      <div style="flex:1;position:relative;background:#1a1a1a;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        ${!a&&d?`
          <div style="width:100%;height:100%;overflow:auto;display:flex;align-items:center;justify-content:center;padding:15px;">
            <img src="${esc(s)}" alt="${esc(n.originalName)}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:0 4px 20px rgba(0,0,0,0.5);" onerror="this.onerror=null;this.src='${esc(u)}';" />
          </div>
        `:`
          <iframe src="${esc(s)}" style="width:100%;height:100%;border:none;background:#fff;" allow="autoplay" loading="lazy"></iframe>
        `}
      </div>
    </div>
  `,f.style.display=`flex`,document.getElementById(`close-preview-modal-btn`)?.addEventListener(`click`,()=>{f.style.display=`none`,f.innerHTML=``}),f.onclick=e=>{e.target===f&&(f.style.display=`none`,f.innerHTML=``)}}function xt(){return[[`not_started`,t(`notStarted`)],[`in_progress`,t(`inProgress`)],[`review`,t(`review`)],[`approval`,t(`approval`)],[`done`,t(`done`)],[`blocked`,t(`blocked`)],[`canceled`,t(`canceled`)]]}function St(){let e=document.querySelector(`.timeline-container > div`),n=document.querySelector(`.timeline-svg`);if(!e||!n)return;n.innerHTML=``;let i=Array.from(document.querySelectorAll(`.timeline-bar`)),a={},o=e.getBoundingClientRect();i.forEach(e=>{let n=e.getBoundingClientRect();a[e.dataset.taskId]={left:n.left-o.left,right:n.right-o.left,top:n.top-o.top,bottom:n.bottom-o.top,width:n.width,height:n.height,center:n.top-o.top+n.height/2}});let s=``,c=r.lang===`ar`;i.forEach(e=>{let n=e.dataset.taskId,i=(r.data?.tasks||[]).find(e=>e.id===n),o=i?.dependencies||i?.customFields?.dependencies||[];if(!i||!o.length)return;let l=a[n];l&&o.forEach(e=>{let n=a[e];if(!n)return;let r=c?n.left:n.right,i=n.center,o=c?l.right:l.left,u=l.center,d=r+(c?-20:20);s+=`<path d="M ${r} ${i} C ${d} ${i}, ${d} ${u}, ${o} ${u}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),n.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${s}
  `}var Ct=n({buildProjectMemberChipsHtml:()=>Ft,exportPortfolioXLS:()=>zt,exportProjectXLS:()=>Bt,exportXLS:()=>Rt,getDaysLeftBadge:()=>Tt,getProjectTeam:()=>Dt,getProjectTeamData:()=>Et,openCloneModal:()=>Lt,openProjectModal:()=>It,projectCard:()=>jt,projectRow:()=>wt,renderProjectCardTeamAvatars:()=>At,renderProjectDetail:()=>Pt,renderProjectOverviewTab:()=>Mt,renderProjectTeamAvatars:()=>Ot,renderProjectTimelineBar:()=>kt,renderProjects:()=>Nt});function wt(e){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${icon(`building`,17)}</span><div class="project-name"><strong>${esc(choose(e.nameAr,e.nameEn))}</strong><span>${esc(e.code)} · ${esc(choose(e.clientAr,e.clientEn))}</span></div></div>${projectProgress(e)}<div class="project-owner">${avatar(e.manager)}<span>${esc(e.manager?choose(e.manager.name,e.manager.nameEn||e.manager.name):`—`)}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${esc(e.id)}" aria-label="${t(`viewDetails`)}">${icon(r.lang===`ar`?`arrowLeft`:`arrow`,14)}</button></div>`}function Tt(e){if(!e)return``;let n=new Date(`${e}T23:59:59`),r=Math.ceil((n-new Date)/864e5),i=`var(--mint-strong)`,a=`var(--mint)`,o=``;return r<0?(i=`var(--red)`,a=`var(--red-soft)`,o=choose(`متأخر ${Math.abs(r)} يوم`,`${Math.abs(r)}d overdue`)):r===0?(i=`var(--red)`,a=`var(--red-soft)`,o=choose(`يستحق اليوم`,`Due today`)):r<=2?(i=`var(--red)`,a=`var(--red-soft)`,o=choose(`باقي ${r} يوم`,`${r}d left`)):r<=7?(i=`var(--amber)`,a=`var(--amber-soft)`,o=choose(`باقي ${r} أيام`,`${r}d left`)):(i=`var(--mint-strong)`,a=`var(--mint)`,o=choose(`باقي ${r} يوم`,`${r}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${i};background:${a};border:1px solid currentColor;">${icon(`clock`,11)} ${o}</span>`}function Et(e){let n=r.data?.users||[],i=(r.data?.tasks||[]).filter(n=>n.projectId===e.id),a=new Set,o=new Set;return e.managerId&&a.add(e.managerId),i.forEach(e=>{e.assigneeId&&a.add(e.assigneeId),(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).forEach(e=>a.add(e)),(e.customFields?.externalAssignees||e.customFields?.external_assignees||[]).forEach(e=>{e&&typeof e==`string`&&e.trim()&&o.add(e.trim())})}),{internalMembers:Array.from(a).map(e=>n.find(n=>n.id===e)).filter(Boolean),externalMembers:Array.from(o)}}function Dt(e){return Et(e).internalMembers}function Ot(e,n=4,r=!0,i=[]){if((!e||!e.length)&&(!i||!i.length))return`<span style="font-size:11px;color:var(--muted);">${choose(`لا يوجد فريق محدد`,`No team assigned`)}</span>`;let a=(e||[]).slice(0,n),o=(e||[]).length-n,s=(e||[]).map(e=>choose(e.name,e.nameEn||e.name)).join(`، `),c=`<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">`;return a.forEach(e=>{let n=choose(e.name,e.nameEn||e.name),i=r?`data-action="filter-by-member" data-member-id="${esc(e.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:`style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"`;c+=`
      <span class="team-member-chip" ${i} title="${esc(n)} (${esc(roleName(e))})">
        ${avatar(e,`mini-avatar`)}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${esc(n)}</span>
      </span>
    `}),o>0&&(c+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${esc(s)}">+${o} ${choose(`آخرين`,`more`)}</span>`),i&&i.length>0&&(c+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${esc(i.join(`، `))}">🌐 +${i.length} ${choose(`خارجي`,`ext`)}</span>`),c+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${choose(`فريق العمل الداخلي`,`Internal Team`)} (${(e||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(e||[]).map(e=>`
        <div ${r?`data-action="filter-by-member" data-member-id="${esc(e.id)}" title="${esc(choose(`فلترة مهام `+(e.name||``),`Filter tasks of `+(e.nameEn||e.name||``)))}"`:``} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${r?`cursor:pointer;transition:all 0.15s;`:``}" ${r?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:``}>
          ${avatar(e,`micro-avatar`)}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${esc(choose(e.name,e.nameEn||e.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${esc(roleName(e))}</span>
          </div>
        </div>
      `).join(``)}
    </div>
    
    ${i&&i.length>0?`
      <hr style="border:0;border-top:1px dashed var(--line);margin:8px 0 6px;" />
      <strong style="display:block;font-size:11px;color:var(--teal);margin-bottom:6px;">🌐 ${choose(`الشركاء والمتعاونون الخارجيون`,`External Partners`)} (${i.length})</strong>
      <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin;">
        ${i.map(e=>`
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink);background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;white-space:nowrap;">
            <span style="font-size:11px;color:var(--teal);">🌐</span>
            <span style="font-weight:500;">${esc(e)}</span>
          </div>
        `).join(``)}
      </div>
    `:``}

    ${r?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${choose(`💡 اضغط على أي عضو لفلترة مهامه`,`💡 Click member to filter tasks`)}</div>`:``}
  </div>`,c+=`</div>`,c}function kt(e){if(!e.dueDate)return``;let n=new Date(e.startDate||e.createdAt||Date.now()-2592e6),r=new Date(`${e.dueDate}T23:59:59`),i=new Date,a=r.getTime()-n.getTime(),o=0;a>0&&(o=Math.min(100,Math.max(0,Math.round((i.getTime()-n.getTime())/a*100))));let s=i>r,c=s?`var(--red)`:o>=80&&!s?`var(--amber)`:`var(--blue)`;return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${icon(`clock`,12)}
          <strong>${choose(`المؤشر الزمني للمشروع`,`Project Schedule Elapsed`)}</strong>: 
          <span style="color:${c};font-weight:bold;">${s?choose(`انتهى موعد التسليم!`,`Deadline passed!`):choose(`مضى ${o}% من الوقت`,`${o}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${dateLabel(e.startDate)} ➔ ${dateLabel(e.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${o}%;background:${c};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function At(e=[],n=[],r=3){let i=e.length+n.length;if(i===0)return`<span style="font-size:11px;color:var(--muted);">—</span>`;let a=e.slice(0,r),o=i-a.length;[...e.map(e=>choose(e.name,e.nameEn||e.name)),...n].join(`، `);let s=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${choose(`عرض فريق العمل`,`View Team`)}">`;return s+=`<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">`,a.forEach((e,n)=>{s+=`
      <div style="margin-inline-start:${n===0?`0`:`-8px`};position:relative;z-index:${10-n};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${avatar(e,`mini-avatar`)}
      </div>
    `}),o>0&&(s+=`
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${o}
      </div>
    `),n&&n.length>0&&o<=0&&(s+=`<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;">🌐</span>`),s+=`</div>`,s+=`
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${choose(`فريق العمل`,`Team Members`)}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${i}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${e.map(e=>`
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${avatar(e,`micro-avatar`)}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(choose(e.name,e.nameEn||e.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${esc(roleName(e))}</span>
            </div>
          </div>
        `).join(``)}
      </div>
      ${n&&n.length>0?`
        <div style="margin-top:8px;padding-top:6px;border-top:1px dashed var(--line);">
          <span style="font-size:9.5px;font-weight:700;color:var(--teal);display:block;margin-bottom:4px;">🌐 ${choose(`الشركاء الخارجيون`,`External Partners`)} (${n.length})</span>
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${n.map(e=>`
              <div style="font-size:10.5px;color:var(--ink-soft);padding:2px 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                • ${esc(e)}
              </div>
            `).join(``)}
          </div>
        </div>
      `:``}
    </div>
  `,s+=`</div>`,s}function jt(e){let{internalMembers:n,externalMembers:i}=Et(e),a=e.manager||(r.data?.users||[]).find(n=>n.id===e.managerId),o=Tt(e.dueDate),s=choose(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
        <span class="project-card-symbol">${icon(`building`,19)}</span>
        <div style="min-width:0;flex:1;">
          <span class="eyebrow" style="font-size:10px;margin-bottom:2px;display:block;">${esc(e.code)}</span>
          <h3 class="project-card-title" title="${esc(choose(e.nameAr,e.nameEn))}">${esc(choose(e.nameAr,e.nameEn))}</h3>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;align-self:flex-start;">
        ${e._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${choose(`بانتظار المزامنة مع السيرفر`,`Pending cloud sync`)}">⏳ ${choose(`معلقة`,`Pending`)}</span>`:``}
        <span class="status-badge ${esc(e.health)}">${esc(statusText(e.health))}</span>
      </div>
    </div>
    
    <p class="project-card-desc" title="${esc(s||``)}">
      ${s?esc(s):`<span style="color:var(--muted);font-style:italic;">${choose(`لا يوجد وصف مسجل لهذا المشروع`,`No description registered`)}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${avatar(a,`mini-avatar`)}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${t(`manager`)}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(a?choose(a.name,a.nameEn||a.name):`—`)}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${t(`team`)} (${n.length+i.length})</span>
        ${At(n,i,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${t(`deadline`)}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">
          <strong>${e.dueDate?dateLabel(e.dueDate,!0):`—`}</strong>
          ${o}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${e.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${e.health===`off_track`?`red`:e.health===`at_risk`?`amber`:``}" style="width:${e.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${esc(e.id)}">
      ${t(`viewDetails`)} ${icon(r.lang===`ar`?`arrowLeft`:`arrow`,13)}
    </button>
  </article>`}function Mt(e,n,i,a=[]){let o=e.manager||(r.data?.users||[]).find(n=>n.id===e.managerId),s=n.filter(e=>e.status===`done`).length,c=n.filter(e=>e.status===`in_progress`).length,l=n.filter(isOverdue).length;return`
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid" style="grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${choose(`إجمالي المهام`,`Total Tasks`)}</span>
          <div class="metric-value">${n.length}</div>
          <span class="metric-note up">${s} ${t(`done`)}</span>
        </div>
        <div class="metric-card blue" style="padding:14px 18px;">
          <span class="metric-label">${choose(`قيد التنفيذ`,`In Progress`)}</span>
          <div class="metric-value">${c}</div>
          <span class="metric-note">${choose(`عمل جارٍ`,`Active work`)}</span>
        </div>
        <div class="metric-card ${l?`red`:`teal`}" style="padding:14px 18px;">
          <span class="metric-label">${t(`overdue`)}</span>
          <div class="metric-value">${l}</div>
          <span class="metric-note ${l?`alert`:`up`}">${l?choose(`تحتاج تدخلاً عاجلاً`,`Needs urgent action`):choose(`لا يوجد تأخير`,`On track`)}</span>
        </div>
        <div class="metric-card amber" style="padding:14px 18px;">
          <span class="metric-label">${choose(`فريق العمل`,`Team Size`)}</span>
          <div class="metric-value">${i.length+(a?.length||0)}</div>
          <span class="metric-note">${choose(`أعضاء مساهمون`,`Active contributors`)}</span>
        </div>
      </div>

      <!-- Schedule Timeline Bar -->
      ${kt(e)}

      <!-- Details Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;">
        <!-- Left: Project Scope & Client -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${icon(`document`,16)}
            ${choose(`نطاق وتفاصيل المشروع`,`Project Scope & Details`)}
          </h3>
          <p style="color:var(--ink-soft);font-size:13px;line-height:1.7;margin-bottom:18px;">
            ${esc(e.descriptionAr||e.descriptionEn||choose(`لا يوجد وصف مسجل لهذا المشروع حالياً.`,`No description available for this project.`))}
          </p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:var(--surface-soft);padding:14px;border-radius:10px;border:1px solid var(--line);">
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t(`client`)}</span>
              <strong style="font-size:13px;color:var(--ink);">${esc(choose(e.clientAr,e.clientEn)||`—`)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t(`lifecycle`)}</span>
              <strong style="font-size:13px;color:var(--ink);">${esc(statusText(e.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t(`startDate`)}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(e.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t(`dueDate`)}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(e.dueDate,!0)}</strong>
            </div>
          </div>
        </div>

        <!-- Right: Team & Leadership -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${icon(`users`,16)}
            ${choose(`القيادة وفريق العمل`,`Leadership & Team`)}
          </h3>

          <!-- Manager card -->
          <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:10px;margin-bottom:16px;background:var(--surface);">
            ${avatar(o)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${t(`manager`)}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${esc(o?choose(o.name,o.nameEn||o.name):`—`)}</strong>
              <span style="font-size:11px;color:var(--muted);">${esc(o?.email||``)}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${choose(`أعضاء الفريق الداخلي:`,`Internal Team Members:`)}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${i.map(e=>{let r=n.filter(n=>n.assigneeId===e.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${avatar(e,`mini-avatar`)}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${esc(choose(e.name,e.nameEn||e.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${esc(roleName(e))}</span>
                    </div>
                  </div>
                  <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${r} ${t(`tasks`)}</span>
                </div>
              `}).join(``)}
          </div>

          ${a&&a.length>0?`
            <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0 10px;" />
            <span style="font-size:11px;color:var(--teal);font-weight:bold;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              🌐 ${choose(`الشركاء والمتعاونون الخارجيون:`,`External Partners & Collaborators:`)}
            </span>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:180px;overflow-y:auto;">
              ${a.map(e=>{let r=n.filter(n=>(n.customFields?.externalAssignees||n.customFields?.external_assignees||[]).includes(e)).length;return`
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="font-size:14px;">🌐</span>
                      <div>
                        <strong style="display:block;font-size:12px;color:var(--ink);">${esc(e)}</strong>
                        <span style="font-size:10px;color:var(--muted);">${choose(`شريك / جهة خارجية`,`External Partner`)}</span>
                      </div>
                    </div>
                    <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${r} ${t(`tasks`)}</span>
                  </div>
                `}).join(``)}
            </div>
          `:``}
        </div>
      </div>
    </div>
  `}function Nt(){let e=r.searches.projects.trim().toLowerCase(),n=r.data.projects.filter(n=>`${n.nameAr} ${n.nameEn} ${n.code} ${n.clientAr}`.toLowerCase().includes(e)),i=r.projectSort||`default`;return i===`alpha-asc`?n.sort((e,n)=>(choose(e.nameAr,e.nameEn)||``).localeCompare(choose(n.nameAr,n.nameEn)||``,r.lang===`ar`?`ar`:`en`)):i===`alpha-desc`?n.sort((e,n)=>(choose(n.nameAr,n.nameEn)||``).localeCompare(choose(e.nameAr,e.nameEn)||``,r.lang===`ar`?`ar`:`en`)):i===`progress-asc`?n.sort((e,n)=>(Number(e.progress)||0)-(Number(n.progress)||0)):i===`progress-desc`&&n.sort((e,n)=>(Number(n.progress)||0)-(Number(e.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${choose(`المحفظة`,`PORTFOLIO`)}</p><h1>${t(`projects`)}</h1><p>${choose(`كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.`,`One view for every project: health, progress, team, and next deadline.`)}</p></div><div class="page-actions">${can(`create_projects`)?`<button class="btn btn-primary" data-action="new-project">${icon(`plus`,15)} ${t(`addProject`)}</button>`:``}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${icon(`search`,15)}<input data-search="projects" value="${esc(r.searches.projects)}" placeholder="${t(`search`)}" /></div><div class="sort-box"><span>${choose(`الترتيب:`,`Sort:`)}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${i==="default"?`selected`:``}>${choose(`الافتراضي`,`Default`)}</option><option value="alpha-asc" ${i===`alpha-asc`?`selected`:``}>${choose(`أبجدياً (أ - ي)`,`Alphabetical (A - Z)`)}</option><option value="alpha-desc" ${i===`alpha-desc`?`selected`:``}>${choose(`أبجدياً (ي - أ)`,`Alphabetical (Z - A)`)}</option><option value="progress-asc" ${i===`progress-asc`?`selected`:``}>${choose(`نسبة الإنجاز (تصاعدي 0% ← 100%)`,`Progress (Low to High)`)}</option><option value="progress-desc" ${i===`progress-desc`?`selected`:``}>${choose(`نسبة الإنجاز (تنازلي 100% ← 0%)`,`Progress (High to Low)`)}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${n.length} ${choose(`مشاريع`,`projects`)}</span></div></div>${n.length?`<div class="project-cards">${n.map(jt).join(``)}</div>`:`<section class="panel"><div class="empty">${icon(`building`,18)}<span>${t(`noProjects`)}</span></div></section>`}`}function Pt(){let e=r.data.projects.find(e=>e.id===r.activeProjectId);if(!e)return r.view=`projects`,Nt();let n=r.data.tasks.filter(n=>n.projectId===e.id),{internalMembers:i,externalMembers:a}=Et(e),o=r.projectTab||`tasks`,s=r.projectMemberFilter||null,c=s?n.filter(e=>e.assigneeId===s||(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).includes(s)):n,l=s?r.data.users.find(e=>e.id===s):null,u=``;if(o===`overview`)u=Mt(e,n,i,a);else if(o===`tasks`){let n=r.projectTaskSort||L();u=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${t(`projectTasks`)} ${s?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${choose(`مهام`,`Tasks of`)}: ${esc(choose(l?.name,l?.nameEn||l?.name))})</span>`:``}</h2>
            <p class="panel-subtitle">${choose(`توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.`,`Tasks grouped by current workflow state, automatically sorted.`)}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${at(n,`sort-project-tasks`)}
            ${s?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${icon(`close`,12)} ${choose(`إلغاء الفلترة`,`Clear filter`)}</button>`:``}
            ${can(`create_tasks`)?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${esc(e.id)}" title="${choose(`اضغط N للإضافة السريعة`,`Press N to add quickly`)}">${icon(`plus`,14)} ${t(`addTask`)} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:``}
          </div>
        </div>
        ${renderBoard(c,n)}
      </div>
    `}else if(o===`timeline`){let{renderTimelinePanel:n}=window.__timelineExports||{};u=n?n(c,e):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${choose(`المخطط الزمني والتقويم`,`Timeline & Calendar`)}</h2></div></div>${renderTimeline(c)}</div>`}else if(o===`drawings`){let i=(r.data.documents||[]).filter(n=>n.projectId===e.id&&!n.deletedAt),a=n.filter(e=>e.typeAr===`مخطط`||e.typeEn===`Drawing`||e.templateId),o=r.docTaskFilter||`all`,s=o===`all`?i:i.filter(e=>e.taskId===o);u=`
      <div class="panel">
        <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h2 class="panel-title">${choose(`المخططات والمستندات الهندسية`,`Drawings & Documents`)}</h2>
            <p class="panel-subtitle">${choose(`جميع المخططات والملفات المرفوعة لهذا المشروع مع إمكانية الفلترة حسب المهمة والمعاينة الفورية.`,`All blueprints and files uploaded for this project, with task filtering and instant preview.`)}</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <!-- Filter by Task dropdown -->
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:12px;color:var(--ink-soft);">${choose(`المهمة:`,`Task:`)}</span>
              <select data-action="filter-project-docs-task" class="filter-select select-compact" style="max-width:200px;">
                <option value="all" ${o===`all`?`selected`:``}>${choose(`— جميع المهام —`,`— All Tasks —`)}</option>
                ${n.map(e=>`<option value="${esc(e.id)}" ${o===e.id?`selected`:``}>${esc(choose(e.titleAr,e.titleEn))}</option>`).join(``)}
              </select>
            </div>
            ${can(`create_tasks`)?`
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${esc(e.id)}">
                ${icon(`plus`,12)} ${choose(`إضافة مخرج / مخطط`,`Add Deliverable / Drawing`)}
              </button>
            `:``}
          </div>
        </div>

        <!-- Section 1: Uploaded Files (Direct previews) -->
        <div style="margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${icon(`document`,14)} ${choose(`الملفات والمخططات المرفوعة`,`Uploaded Files & Blueprints`)} (${s.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${choose(`اسم المخطط / الملف`,`Blueprint / File Name`)}</th>
                  <th>${t(`tasks`)}</th>
                  <th>${choose(`الحالة`,`Status`)}</th>
                  <th>${choose(`الحجم`,`Size`)}</th>
                  <th>${choose(`تاريخ الرفع`,`Upload Date`)}</th>
                  <th style="text-align:end;">${choose(`الإجراءات`,`Actions`)}</th>
                </tr>
              </thead>
              <tbody>
                ${s.length>0?s.map(e=>{let r=n.find(n=>n.id===e.taskId),i=e.size>1048576?(e.size/1048576).toFixed(1)+` MB`:Math.round((e.size||0)/1024)+` KB`;return`
                    <tr data-doc-id="${esc(e.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${esc(e.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${icon(`document`,15)}
                          </span>
                          <div>
                            <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(e.originalName)}">
                              ${esc(e.originalName)}
                            </strong>
                            <span style="font-size:11px;color:var(--muted);">${esc(e.mimeType||`application/octet-stream`)}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${r?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${esc(r.id)}">${esc(choose(r.titleAr,r.titleEn))}</span>`:`—`}
                      </td>
                      <td>
                        <span class="status-badge ${esc(e.status||`draft`)}" style="font-size:11px;">
                          ${esc(statusText(e.status||`draft`))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${i}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${dateLabel(e.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${esc(e.id)}" style="padding:5px;" title="${choose(`معاينة المخطط`,`Preview`)}">
                            ${icon(`eye`,14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${esc(e.id)}" style="padding:5px;color:var(--teal);" title="${choose(`نسخ الرابط`,`Copy Link`)}">
                            ${icon(`link`,14)}
                          </button>
                          <a href="/api/documents/${esc(e.id)}" target="_blank" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${choose(`تحميل`,`Download`)}">
                            ${icon(`download`,14)}
                          </a>
                        </div>
                      </td>
                    </tr>
                  `}).join(``):`
                  <tr>
                    <td colspan="6">
                      <div class="empty" style="padding:30px 10px;">
                        ${icon(`document`,20)}
                        <span>${choose(`لا توجد ملفات مرفوعة لهذه المهمة أو المشروع حتى الآن.`,`No files uploaded for this task/project yet.`)}</span>
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
            ${icon(`checklist`,14)} ${choose(`مخرجات المخططات المجدولة`,`Scheduled Drawing Tasks`)} (${a.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${t(`taskTitle`)}</th>
                  <th>${t(`taskType`)}</th>
                  <th>${t(`status`)}</th>
                  <th>${t(`progress`)}</th>
                  <th>${t(`assignee`)}</th>
                </tr>
              </thead>
              <tbody>
                ${a.map(e=>`
                  <tr data-action="open-task" data-task-id="${esc(e.id)}" style="cursor:pointer;" title="${choose(`انقر لعرض وتعديل المهمة ورفع المخططات`,`Click to open task and manage files`)}">
                    <td><span class="table-title">${esc(choose(e.titleAr,e.titleEn))}</span><span class="table-sub">${esc(e.templateId||`CUSTOM`)}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${esc(choose(e.typeAr,e.typeEn)||choose(`مخطط`,`Drawing`))}</span></td>
                    <td><span class="status-badge ${esc(e.status)}">${esc(statusText(e.status))}</span></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;min-width:40px;">
                          <div style="height:100%;background:${e.status===`done`?`var(--green)`:`var(--blue)`};width:${e.progress||0}%;"></div>
                        </div>
                        <span style="font-size:11px;font-weight:600;">${e.progress||0}%</span>
                      </div>
                    </td>
                    <td>${e.assignee?esc(choose(e.assignee.name,e.assignee.nameEn||e.assignee.name)):`—`}</td>
                  </tr>
                `).join(``)||`<tr><td colspan="5"><div class="empty">${t(`noTasks`)}</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}else o===`activity`&&(u=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${t(`activity`)}</h2><p class="panel-subtitle">${choose(`كل تغيير مهم يبقى قابلًا للمراجعة.`,`Every important change remains reviewable.`)}</p></div></div>${renderAuditForProject(e.id)}</div>`);let d=e.manager||(r.data.users||[]).find(n=>n.id===e.managerId),f=Tt(e.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${icon(r.lang===`ar`?`arrow`:`arrowLeft`,15)}</button>
        <div>
          <p class="eyebrow">${esc(e.code)} · ${e.demo?t(`sampleData`):t(`active`)}</p>
          <h1>${esc(choose(e.nameAr,e.nameEn))}</h1>
          <p>${esc(choose(e.descriptionAr||e.clientAr,e.descriptionEn||e.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${icon(`user`,12)} 
              <strong>${t(`manager`)}:</strong> ${esc(d?choose(d.name,d.nameEn||d.name):`—`)}
            </span>
            ${e.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${icon(`calendar`,12)} ${dateLabel(e.dueDate,!0)}
                ${f}
              </span>
            `:``}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${icon(`users`,12)}
              <span style="font-size:11px;">${t(`team`)}:</span>
              ${Ot(i,4,!0,a)}
            </span>
            <span class="status-badge ${esc(e.health)}">${esc(statusText(e.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${e.progress}%</strong>
        <span>${t(`weightedProgress`)}</span>
        ${can(`edit_projects`)||can(`create_projects`)||can(`delete_projects`)||can(`view_reports`)||isAdmin()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${icon(`more`,15)} ${choose(`خيارات`,`Options`)}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${r.lang===`ar`?`left:0`:`right:0`};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:180px;padding:5px;margin-top:5px;text-align:start">
              ${can(`edit_projects`)||isAdmin()?`<button class="menu-item" data-action="edit-project" data-project-id="${esc(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${icon(`edit`,14)} ${t(`edit`)}</button>`:``}
              ${can(`create_projects`)||isAdmin()?`<button class="menu-item" data-action="clone-project" data-project-id="${esc(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${icon(`document`,14)} ${choose(`استنساخ المشروع`,`Clone Project`)}</button>`:``}
              ${can(`export_reports`)||isAdmin()?`<button class="menu-item" data-action="export-project" data-project-id="${esc(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${icon(`document`,14)} ${choose(`تصدير التقرير (Excel)`,`Export Report (Excel)`)}</button>`:``}
              ${can(`delete_projects`)||isAdmin()?`<button class="menu-item" data-action="delete-project" data-project-id="${esc(e.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${icon(`trash`,14)} ${choose(`حذف المشروع`,`Delete Project`)}</button>`:``}
            </div>
          </div>
        `:``}
      </div>
    </div>

    <!-- Sub Navigation Tabs: 'تفاصيل' instead of 'overview' -->
    <div class="detail-tabs">
      <button class="detail-tab ${o===`tasks`?`active`:``}" data-action="project-tab" data-tab="tasks">${t(`tasks`)}</button>
      <button class="detail-tab ${o===`overview`?`active`:``}" data-action="project-tab" data-tab="overview">${choose(`تفاصيل`,`Details`)}</button>
      <button class="detail-tab ${o===`timeline`?`active`:``}" data-action="project-tab" data-tab="timeline">${choose(`المخطط الزمني والتقويم`,`Timeline & Calendar`)}</button>
      <button class="detail-tab ${o===`drawings`?`active`:``}" data-action="project-tab" data-tab="drawings">${t(`drawings`)}</button>
      <button class="detail-tab ${o===`activity`?`active`:``}" data-action="project-tab" data-tab="activity">${t(`activity`)}</button>
    </div>
    
    ${u}
  `}function Ft(e=[]){let n=r.data?.users||[];return e.map(e=>{let r=n.find(n=>n.id===e)||{name:e,id:e};return`
      <span class="chip-item" data-uid="${esc(e)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${avatar(r,`mini-avatar`)}
        <span style="font-weight:500;">${esc(choose(r.name,r.nameEn||r.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${esc(e)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${choose(`إزالة`,`Remove`)}">×</button>
      </span>
    `}).join(``)}function It(e=null){let n=e?.code||`DARC-${String((r.data?.projects?.length||0)+1).padStart(3,`0`)}`,i=e?Et(e).internalMembers.map(e=>e.id):[],a=i.length>0?i:[r.data?.user?.id].filter(Boolean),o=`
    <form id="project-form" data-project-id="${esc(e?.id||``)}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${esc(JSON.stringify(a))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${icon(`building`,14)} <span>${choose(`البيانات الأساسية للمشروع`,`Core Project Information`)}</span>
        </div>

        <div class="field full">
          <label>${t(`nameAr`)} *</label>
          <input name="nameAr" value="${esc(e?.nameAr||``)}" placeholder="${choose(`مثال: فيلا النخيل — التصميم الداخلي`,`e.g. Al Nakheel Villa — Interior Design`)}" required />
        </div>
        <div class="field">
          <label>${t(`nameEn`)}</label>
          <input name="nameEn" value="${esc(e?.nameEn||``)}" placeholder="Al Nakheel Villa — Interior Design" />
        </div>
        <div class="field">
          <label>${t(`projectCode`)} *</label>
          <input name="code" value="${esc(n)}" placeholder="DARC-025" required />
        </div>
        <div class="field full">
          <label>${t(`client`)}</label>
          <input name="clientAr" value="${esc(e?.clientAr||``)}" placeholder="${choose(`اسم العميل أو الجهة المالكة`,`Client or owning entity`)}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${icon(`calendar`,14)} <span>${choose(`الجدولة والإدارة`,`Management & Schedule`)}</span>
        </div>

        <div class="field full">
          <label>${t(`manager`)}</label>
          <select name="managerId" id="project-manager-select">
            <option value="">${choose(`— بدون تحديد —`,`— Unassigned —`)}</option>
            ${r.data.users.map(n=>`<option value="${esc(n.id)}" ${(e?e.managerId===n.id:r.data.user.id===n.id)?`selected`:``}>${esc(choose(n.name,n.nameEn||n.name))}</option>`).join(``)}
          </select>
        </div>
        <div class="field">
          <label>${choose(`أولوية المشروع`,`Project Priority`)}</label>
          <select name="priority">
            <option value="low" ${e?.priority===`low`||e?.customFields?.priority===`low`?`selected`:``}>${choose(`منخفضة`,`Low`)}</option>
            <option value="medium" ${!e||e?.priority===`medium`||e?.customFields?.priority===`medium`||!e?.priority?`selected`:``}>${choose(`متوسطة`,`Medium`)}</option>
            <option value="high" ${e?.priority===`high`||e?.customFields?.priority===`high`?`selected`:``}>${choose(`عالية`,`High`)}</option>
            <option value="urgent" ${e?.priority===`urgent`||e?.customFields?.priority===`urgent`?`selected`:``}>${choose(`حرجة / عاجلة`,`Urgent`)}</option>
          </select>
        </div>
        <div class="field">
          <label>${choose(`حالة المشروع`,`Project Status`)}</label>
          <select name="lifecycle">
            <option value="active" ${!e||e.lifecycle===`active`?`selected`:``}>${choose(`نشط (قيد التنفيذ)`,`Active (In Progress)`)}</option>
            <option value="planning" ${e?.lifecycle===`planning`?`selected`:``}>${choose(`تخطيط`,`Planning`)}</option>
            <option value="on_hold" ${e?.lifecycle===`on_hold`?`selected`:``}>${choose(`معلق / متوقف`,`On Hold`)}</option>
            <option value="completed" ${e?.lifecycle===`completed`?`selected`:``}>${choose(`مكتمل`,`Completed`)}</option>
            <option value="archived" ${e?.lifecycle===`archived`?`selected`:``}>${choose(`مؤرشف`,`Archived`)}</option>
          </select>
        </div>
        <div class="field">
          <label>${t(`startDate`)}</label>
          <input type="date" name="startDate" value="${esc(e?.startDate||``)}" />
        </div>
        <div class="field">
          <label>${t(`dueDate`)}</label>
          <input type="date" name="dueDate" value="${esc(e?.dueDate||``)}" />
        </div>

        <!-- 👥 القسم 3: أعضاء فريق المشروع والمشاركون -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:6px;">
            ${icon(`users`,14)} <span>${choose(`أعضاء فريق المشروع والمشاركون`,`Project Team Members & Collaborators`)}</span>
          </div>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${choose(`اختر من الفريق لإعطائهم حق الوصول للمشروع`,`Select team members who can access this project`)}</span>
        </div>

        <div class="field full" style="position:relative;">
          <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
          <div id="project-members-chips-container" style="display:${a.length?`flex`:`none`};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
            ${Ft(a)}
          </div>

          <!-- حقل البحث والإضافة السريعة -->
          <div style="position:relative;display:flex;gap:6px;">
            <input type="text" id="project-member-search" placeholder="${choose(`ابحث عن عضو لإضافته لفريق المشروع...`,`Search team member to add to project team...`)}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          </div>

          <!-- القائمة المنسدلة للبحث والاختيار -->
          <div id="project-member-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
          </div>
        </div>

        <!-- 📝 القسم 4: نطاق المشروع والملاحظات -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${icon(`document`,14)} <span>${choose(`نطاق المشروع والملاحظات`,`Scope & Notes`)}</span>
        </div>

        <div class="field full">
          <label>${choose(`وصف ونطاق المشروع`,`Project Scope & Description`)}</label>
          <textarea name="descriptionAr" placeholder="${choose(`وصف مختصر لنطاق العمل، المعايير المعتمدة، وأي ملاحظات خاصة...`,`Brief description of scope, design criteria, and special notes...`)}">${esc(e?.descriptionAr||``)}</textarea>
        </div>
      </div>

      <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;margin-top:20px;">
        <div>
          ${e&&(can(`delete_projects`)||isAdmin())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${esc(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${choose(`حذف المشروع ونقله لسلة المهملات`,`Delete project and move to trash`)}">
              ${icon(`trash`,14)} ${choose(`حذف المشروع`,`Delete Project`)}
            </button>
          `:``}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
          <button type="submit" class="btn btn-primary">${icon(`check`,14)} ${e?t(`save`):t(`create`)}</button>
        </div>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=modalShell(e?choose(`تعديل بيانات المشروع`,`Edit Project`):t(`addProject`),choose(`إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.`,`Manage project details, schedule, and workflow health.`),o,`project`),setTimeout(()=>{let e=document.getElementById(`project-member-search`),n=document.getElementById(`project-member-dropdown`),i=document.getElementById(`project-members-chips-container`),o=document.getElementById(`project-members-input`),s=document.getElementById(`project-manager-select`);if(!e||!n||!i||!o)return;let c=[...a];function l(){i.innerHTML=Ft(c),i.style.display=c.length?`flex`:`none`,o.value=JSON.stringify(c),i.querySelectorAll(`.btn-remove-project-member`).forEach(e=>{e.addEventListener(`click`,n=>{n.stopPropagation();let r=e.dataset.uid;c=c.filter(e=>e!==r),l()})})}s&&s.addEventListener(`change`,()=>{let e=s.value;e&&!c.includes(e)&&(c.push(e),l())});function u(i=``){let a=i.toLowerCase().trim(),o=(r.data?.users||[]).filter(e=>!c.includes(e.id)&&(!a||e.name&&e.name.toLowerCase().includes(a)||e.nameEn&&e.nameEn.toLowerCase().includes(a)||e.email&&e.email.toLowerCase().includes(a)));o.length?(n.innerHTML=o.map(e=>`
          <div class="project-member-opt" data-uid="${esc(e.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${avatar(e,`mini-avatar`)}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${esc(choose(e.name,e.nameEn||e.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${esc(e.roleId||``)}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${choose(`إضافة`,`Add`)}</span>
          </div>
        `).join(``),n.querySelectorAll(`.project-member-opt`).forEach(r=>{r.addEventListener(`mouseenter`,()=>r.style.background=`var(--surface-soft)`),r.addEventListener(`mouseleave`,()=>r.style.background=`transparent`),r.addEventListener(`click`,()=>{let i=r.dataset.uid;i&&!c.includes(i)&&(c.push(i),l(),e.value=``,n.style.display=`none`)})})):n.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${choose(`لا يوجد أعضاء مطابقون`,`No matching members`)}</div>`,n.style.display=`block`}e.addEventListener(`focus`,()=>u(e.value)),e.addEventListener(`input`,()=>u(e.value)),document.addEventListener(`click`,r=>{!e.contains(r.target)&&!n.contains(r.target)&&(n.style.display=`none`)}),l()},50)}function Lt(e){let n=`
    <form id="clone-form" data-project-id="${e.id}">
      <p style="margin-top:0;margin-bottom:20px;color:var(--ink-soft);font-size:13px">${choose(`أنت على وشك استنساخ المشروع:`,`You are about to clone the project:`)} <strong style="color:var(--ink)">${esc(choose(e.nameAr,e.nameEn))}</strong></p>
      <div class="form-grid">
        <div class="field full">
          <label>${t(`nameAr`)}</label>
          <input name="nameAr" value="${esc(e.nameAr)} (نسخة)" required />
        </div>
        <div class="field full">
          <label>${t(`nameEn`)}</label>
          <input name="nameEn" value="${esc(e.nameEn)} (Copy)" required />
        </div>
      </div>
      
      <div class="field full">
        <label>${choose(`تاريخ التسليم المتوقع`,`Expected Due Date`)}</label>
        <input name="dueDate" type="date" value="${e.dueDate||``}" />
      </div>

      <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:8px;padding:15px;margin-top:20px;display:flex;flex-direction:column;gap:12px">
        <strong style="font-size:13px">${choose(`إعدادات النسخ المتقدمة`,`Advanced Clone Settings`)}</strong>
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneTasks" checked style="width:16px;height:16px;margin:0">
          ${choose(`نسخ جميع المهام والهيكلة (Tasks)`,`Clone all tasks & structure`)}
        </label>
        
        <div style="padding-${r.lang===`ar`?`right`:`left`}:26px">
          <label style="display:flex;align-items:center;gap:8px;font-weight:400;color:var(--ink-soft);cursor:pointer">
            <input type="checkbox" name="keepAssignees" style="width:14px;height:14px;margin:0">
            ${choose(`الاحتفاظ بالمسند إليهم (Keep Assignees)`,`Keep Task Assignees`)}
          </label>
        </div>
        
        <hr style="border:0;border-top:1px solid var(--border);margin:4px 0" />
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneMembers" checked style="width:16px;height:16px;margin:0">
          ${choose(`استنساخ أعضاء فريق العمل (Team)`,`Clone team members`)}
        </label>
      </div>
      
      <div class="modal-actions" style="margin-top:24px">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${icon(`document`,14)} ${choose(`استنساخ المشروع`,`Clone Project`)}</button>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=modalShell(choose(`استنساخ المشروع`,`Clone Project`),choose(`أداة إنشاء قوالب المشاريع السريعة`,`Rapid project templating tool`),n,`clone`);let i=document.getElementById(`clone-form`),a=i.querySelector(`input[name="cloneTasks"]`),o=i.querySelector(`input[name="keepAssignees"]`);a.addEventListener(`change`,e=>{o.disabled=!e.target.checked,e.target.checked||(o.checked=!1)}),i.addEventListener(`submit`,async n=>{n.preventDefault();let a=i.querySelector(`button[type="submit"]`);a.disabled=!0;try{let n={nameAr:i.nameAr.value,nameEn:i.nameEn.value,dueDate:i.dueDate.value,cloneTasks:i.cloneTasks.checked,keepAssignees:i.keepAssignees.checked,cloneMembers:i.cloneMembers.checked},a=await P(`/api/projects/${e.id}/clone`,{method:`POST`,body:JSON.stringify(n)});closeModal(),r.view=`project-detail`,r.activeProjectId=a.project.id,await refreshView(),showToast(choose(`تم استنساخ المشروع بنجاح.`,`Project cloned successfully.`))}catch(e){showToast(e.message,!0),a.disabled=!1}})}function Rt(e,n){let i=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <style>
        table { border-collapse: collapse; font-family: Arial, sans-serif; }
        td, th { border: 1px solid #333; padding: 6px; text-align: right; vertical-align: middle; }
        .title { font-size: 18px; font-weight: bold; background: #0d6269; color: #fff; text-align: center; }
        .subtitle { font-size: 14px; font-weight: bold; background: #eef2f2; text-align: center; }
        .meta { font-size: 12px; text-align: center; background: #f9fafa; }
        .header { font-weight: bold; background: #d4e0e0; text-align: center; }
      </style>
    </head>
    <body dir="${r.lang===`ar`?`rtl`:`ltr`}">
      ${n}
    </body>
    </html>
  `,a=new Blob([`﻿`+i],{type:`application/vnd.ms-excel;charset=utf-8;`}),o=URL.createObjectURL(a),s=document.createElement(`a`);s.href=o,s.download=e+`.xls`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o)}function zt(){let e=r.data?.projects||[];if(!e||!e.length){showToast(choose(`لا توجد بيانات لتصديرها.`,`No data to export.`),!0);return}let n=new Date().toLocaleDateString(r.lang===`ar`?`ar-SA`:`en-US`),i=`<table>`;i+=`<tr><td colspan="11" class="title">DARC Design Team</td></tr>`,i+=`<tr><td colspan="11" class="subtitle">${choose(`تقرير حالة مشاريع المحفظة`,`Portfolio Projects Report`)}</td></tr>`,i+=`<tr><td colspan="11" class="meta">${choose(`تاريخ الإصدار:`,`Generated on:`)} ${n}</td></tr>`,i+=`<tr><td colspan="11" style="border:none;"></td></tr>`,i+=`<tr class="header">
    <td>${choose(`كود المشروع`,`Code`)}</td>
    <td>${choose(`اسم المشروع (عربي)`,`Project Name (Ar)`)}</td>
    <td>${choose(`اسم المشروع (إنجليزي)`,`Project Name (En)`)}</td>
    <td>${choose(`العميل`,`Client`)}</td>
    <td>${choose(`مدير المشروع`,`Manager`)}</td>
    <td>${choose(`الحالة`,`Lifecycle`)}</td>
    <td>${choose(`الصحة`,`Health`)}</td>
    <td>${choose(`تاريخ البدء`,`Start Date`)}</td>
    <td>${choose(`تاريخ التسليم`,`Due Date`)}</td>
    <td>${choose(`نسبة الإنجاز`,`Progress %`)}</td>
    <td>${choose(`عدد أعضاء الفريق`,`Team Size`)}</td>
  </tr>`,e.forEach(e=>{let n=e.manager?choose(e.manager.name,e.manager.nameEn||e.manager.name):``;i+=`<tr>
      <td>${esc(e.code)}</td>
      <td>${esc(e.nameAr)}</td>
      <td>${esc(e.nameEn)}</td>
      <td>${esc(choose(e.clientAr,e.clientEn))}</td>
      <td>${esc(n)}</td>
      <td>${esc(statusText(e.lifecycle))}</td>
      <td>${esc(statusText(e.health))}</td>
      <td>${esc(e.startDate||``)}</td>
      <td>${esc(e.dueDate||``)}</td>
      <td>${e.progress||0}%</td>
      <td>${e.memberCount||0}</td>
    </tr>`}),i+=`</table>`,Rt(`DARC_Portfolio_Report_${new Date().toISOString().split(`T`)[0]}`,i),showToast(choose(`تم بدء تحميل التقرير.`,`Report download started.`)),P(`/api/audit`,{method:`POST`,body:JSON.stringify({action:`export_report`,entityType:`report`,details:{title:choose(`تقرير حالة مشاريع المحفظة (Excel)`,`Portfolio Projects Report (Excel)`),count:e.length}})}).catch(()=>{})}function Bt(e){let n=(r.data?.projects||[]).find(n=>n.id===e);if(!n)return;let i=(r.data?.tasks||[]).filter(n=>n.projectId===e);if(!i.length){showToast(choose(`لا توجد مهام لهذا المشروع لتصديرها.`,`No tasks to export.`),!0);return}let a=new Date().toLocaleDateString(r.lang===`ar`?`ar-SA`:`en-US`),o=`<table>`;o+=`<tr><td colspan="8" class="title">DARC Design Team</td></tr>`,o+=`<tr><td colspan="8" class="subtitle">${choose(`تقرير مهام المشروع:`,`Project Tasks Report:`)} ${esc(choose(n.nameAr,n.nameEn))}</td></tr>`,o+=`<tr><td colspan="8" class="meta">${choose(`تاريخ الإصدار:`,`Generated on:`)} ${a}</td></tr>`,o+=`<tr><td colspan="8" style="border:none;"></td></tr>`,o+=`<tr class="header">
    <td>${choose(`المهمة (عربي)`,`Task (Ar)`)}</td>
    <td>${choose(`المهمة (إنجليزي)`,`Task (En)`)}</td>
    <td>${choose(`القسم`,`Category`)}</td>
    <td>${choose(`المسؤول`,`Assignee`)}</td>
    <td>${choose(`الحالة`,`Status`)}</td>
    <td>${choose(`تاريخ البدء`,`Start Date`)}</td>
    <td>${choose(`تاريخ التسليم`,`Due Date`)}</td>
    <td>${choose(`الإنجاز`,`Progress %`)}</td>
  </tr>`,i.forEach(e=>{let n=(r.data?.users||[]).find(n=>n.id===(e.assigneeId||e.assignee_id)),i=e.assignee?choose(e.assignee.name,e.assignee.nameEn||e.assignee.name):n?choose(n.name,n.nameEn||n.name):``;o+=`<tr>
      <td>${esc(e.titleAr)}</td>
      <td>${esc(e.titleEn)}</td>
      <td>${esc(choose(e.categoryAr,e.categoryEn))}</td>
      <td>${esc(i)}</td>
      <td>${esc(statusText(e.status))}</td>
      <td>${esc(e.startDate||``)}</td>
      <td>${esc(e.dueDate||``)}</td>
      <td>${e.progress||0}%</td>
    </tr>`}),o+=`</table>`,Rt(`DARC_Project_${n.code}_${new Date().toISOString().split(`T`)[0]}`,o),showToast(choose(`تم بدء تحميل التقرير.`,`Report download started.`)),P(`/api/audit`,{method:`POST`,body:JSON.stringify({action:`export_report`,entityType:`project`,entityId:e,details:{title:choose(`تقرير مهام مشروع: ${n.nameAr}`,`Project Tasks Report: ${n.nameEn||n.nameAr}`),taskCount:i.length}})}).catch(()=>{})}var Vt=n({TEMPLATE_CATEGORIES:()=>Ht,openTemplateModal:()=>Wt,renderTemplates:()=>Ut}),Ht=[{id:`architectural`,ar:`معماري`,en:`Architectural`,icon:`🏛️`},{id:`electrical`,ar:`كهرباء — إلكتروميكانيك`,en:`Electrical`,icon:`⚡`},{id:`plumbing`,ar:`سباكة — إلكتروميكانيك`,en:`Plumbing`,icon:`💧`},{id:`hvac`,ar:`تكييف — إلكتروميكانيك`,en:`HVAC`,icon:`🌡️`},{id:`fire`,ar:`حريق — إلكتروميكانيك`,en:`Fire Protection`,icon:`🧯`},{id:`low_current`,ar:`تيار خفيف`,en:`Low Current`,icon:`📡`},{id:`sections`,ar:`مقاطع`,en:`Sections`,icon:`✂️`},{id:`detail`,ar:`تفصيلي`,en:`Detailed`,icon:`🔍`},{id:`site`,ar:`موقع عام`,en:`Site Plan`,icon:`🗺️`},{id:`quantity`,ar:`جداول كميات`,en:`Quantity Tables`,icon:`📊`},{id:`documents`,ar:`وثائق وخطابات`,en:`Documents & Letters`,icon:`📄`}];function Ut(){let e=r.searches.templates.trim().toLowerCase(),n=[...r.data.templates||[]].sort((e,n)=>(parseInt(e.code,10)||0)-(parseInt(n.code,10)||0)),i=new Map;Ht.forEach(e=>i.set(e.id,0)),n.forEach(e=>{i.set(e.categoryId,(i.get(e.categoryId)||0)+1)});let a=r.templateCategory||`all`,o=Ht.map(r=>{if(a!==`all`&&a!==r.id)return null;let i=n.filter(n=>n.categoryId===r.id?!e||`${n.nameAr} ${n.nameEn} ${n.code} ${n.typeAr} ${n.typeEn}`.toLowerCase().includes(e):!1);return i.length?{...r,items:i}:null}).filter(Boolean);return`<div class="page-head">
    <div>
      <p class="eyebrow">${O(`مخرجات DARC القياسية`,`DARC STANDARD DELIVERABLES`)}</p>
      <h1>${D(`templates`)}</h1>
      <p>${D(`standardLibrarySub`)}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${n.length} ${D(`templatesCount`)}</span>
      ${j(`manage_templates`)?`<button class="btn btn-primary" data-action="new-template" style="margin-${r.lang===`ar`?`right`:`left`}:10px">${A(`plus`,15)} ${O(`إضافة قالب`,`Add Template`)}</button>`:``}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${A(`search`,15)}
        <input data-search="templates" value="${k(r.searches.templates)}" placeholder="${D(`search`)}" />
      </div>
    </div>
  </div>
  <div class="template-layout">
    <aside class="template-sidebar">
      <button class="template-category-tab ${a===`all`?`active`:``}" data-action="template-category" data-category="all">
        <span class="category-icon">◌</span>
        <span>${D(`all`)}</span>
        <small>${n.length}</small>
      </button>
      ${Ht.map(e=>`
        <button class="template-category-tab ${a===e.id?`active`:``}" data-action="template-category" data-category="${k(e.id)}">
          <span class="category-icon">${k(e.icon)}</span>
          <span>${k(O(e.ar,e.en))}</span>
          <small>${i.get(e.id)||0}</small>
        </button>
      `).join(``)}
    </aside>
    <div>
      ${o.length?o.map(e=>`
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
              <article class="template-item" style="position:relative;cursor:${j(`manage_templates`)?`pointer`:`default`};" ${j(`manage_templates`)?`data-action="edit-template" data-template-id="${k(e.id)}"`:``}>
                <span class="template-number">${k(e.code)}</span>
                <div class="template-copy">
                  <strong>${k(O(e.nameAr,e.nameEn))}</strong>
                  <span>${k(r.lang===`ar`?e.nameEn:e.nameAr)}</span>
                </div>
                ${j(`manage_templates`)?`<button class="template-action" data-action="edit-template" data-template-id="${k(e.id)}" title="${D(`edit`)}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${r.lang===`ar`?`right`:`left`}:auto">${A(`edit`,14)}</button>`:``}
              </article>
            `).join(``)}
          </div>
        </section>
      `).join(``):`
        <section class="panel">
          <div class="empty">
            ${A(`layers`,18)}
            <span>${D(`noTasks`)}</span>
          </div>
        </section>
      `}
    </div>
  </div>`}function Wt(e=null){if(!j(`manage_templates`))return E(D(`permissionDenied`),!0);let n=Ht.map(n=>`<option value="${k(n.id)}" ${e?.categoryId===n.id?`selected`:``}>${k(O(n.ar,n.en))}</option>`).join(``),r=`<form id="template-form" data-template-id="${k(e?.id||``)}">
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
        <select name="categoryId" required>${n}</select>
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
      ${e?`<button type="button" class="btn btn-ghost" data-action="delete-template" data-template-id="${k(e.id)}" style="color:var(--red)">${A(`trash`,14)} ${D(`delete`)}</button>`:`<div></div>`}
      <div style="display:flex;gap:10px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${D(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${A(`check`,14)} ${D(e?`save`:`create`)}</button>
      </div>
    </div>
  </form>`;document.getElementById(`modal-root`).innerHTML=ae(e?O(`تعديل قالب`,`Edit Template`):O(`إضافة قالب جديد`,`Add New Template`),O(`القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.`,`Templates help the team insert tasks quickly with standard criteria.`),r,`template`)}var Gt=n({openUploadDrawingModal:()=>qt,renderDocuments:()=>Kt});function Kt(){let e=r.data?.documents||[],n=r.data?.projects||[],i=r.data?.tasks||[],a=(r.searches?.documents||``).trim().toLowerCase(),o=r.docProjectFilter||`all`,s=r.data?.user?.id,c=M(),l=c||j(`review_tasks`)||j(`approve_tasks`)||j(`edit_tasks`),u=new Set(i.filter(e=>!e.deletedAt).map(e=>e.id)),d=new Set(n.filter(e=>!e.deletedAt).map(e=>e.id)),f=e.filter(e=>!(e.deletedAt||e.taskId&&!u.has(e.taskId)||e.projectId&&!d.has(e.projectId)||o!==`all`&&e.projectId!==o||a&&!(e.originalName||``).toLowerCase().includes(a))).sort((e,n)=>new Date(n.createdAt||0)-new Date(e.createdAt||0)),p=f.reduce((e,n)=>e+(n.size||0),0),m=p>1073741824?(p/1073741824).toFixed(1)+` GB`:p>1048576?(p/1048576).toFixed(1)+` MB`:Math.round(p/1024)+` KB`;return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${O(`مركز المخرجات والمخططات الهندسية`,`DELIVERABLES & BLUEPRINTS CENTER`)}</p>
        <h2>${D(`documents`)}</h2>
        <p class="intro">${O(`إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.`,`Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.`)}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        ${j(`upload_documents`)||c?`
          <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:7px;font-weight:700;box-shadow:0 2px 8px rgba(13,98,105,0.25);">
            ${A(`upload`,14)}
            <span>${O(`رفع مخطط / ملف جديد`,`Upload Drawing / File`)}</span>
          </button>
        `:``}
        <button class="btn btn-secondary btn-sm" data-action="go-to-trash" style="display:inline-flex;align-items:center;gap:6px;" title="${O(`الانتقال لسلة المحذوفات لاستعراض واستعادة الملفات والمشاريع المحذوفة`,`Go to trash bin to review and restore deleted files and projects`)}">
          ${A(`trash`,14)}
          <span>${O(`سلة المهملات`,`Trash`)}</span>
        </button>
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;">
          ${f.length} ${O(`مخطط / ملف`,`drawings`)} (${m})
        </span>
      </div>
    </div>

    <!-- Filters Bar (Unified View Toolbar) -->
    <div class="view-toolbar" style="margin-bottom:20px;">
      <div class="view-toolbar-start" style="flex:1;">
        <div class="search-box" style="flex:1;max-width:440px;">
          ${A(`search`,15)}
          <input 
            type="search" 
            placeholder="${O(`بحث برقم المخطط أو الاسم أو الامتداد (DWG, PDF, RVT)...`,`Search by drawing name, code, or format (DWG, PDF, RVT)...`)}" 
            value="${k(r.searches?.documents||``)}" 
            data-search="documents" 
            data-action="search-documents" 
          />
        </div>

        <div class="sort-box">
          <span>${O(`المشروع:`,`Project:`)}</span>
          <select data-action="doc-project-filter" class="filter-select select-compact" style="min-width:180px;">
            <option value="all" ${o===`all`?`selected`:``}>${O(`— جميع المشاريع —`,`— All Projects —`)}</option>
            ${n.map(e=>`<option value="${k(e.id)}" ${o===e.id?`selected`:``}>${k(e.code)} - ${k(O(e.nameAr,e.nameEn))}</option>`).join(``)}
          </select>
        </div>
      </div>

      <div class="view-toolbar-end">
        <span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">
          ${f.length} ${O(`مخرجات`,`deliverables`)}
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
            ${f.length>0?f.map(e=>{let r=n.find(n=>n.id===e.projectId),a=i.find(n=>n.id===e.taskId),o=fe(e.originalName,e.mimeType),u=pe(e.originalName),d=e.size>1048576?(e.size/1048576).toFixed(1)+` MB`:Math.round((e.size||0)/1024)+` KB`,f=c||j(`delete_documents`)||e.uploaderId===s;return`
                <tr data-doc-id="${k(e.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${k(e.id)}">
                      <span class="file-format-badge" style="background:${o.bg};color:${o.color};border:1px solid ${o.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${o.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${k(e.originalName)}">
                          ${k(e.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${o.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${r?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${k(r.id)}">${k(r.code)}</span>`:`—`}
                  </td>
                  <td>
                    ${a?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${k(a.id)}">${k(O(a.titleAr,a.titleEn))}</span>`:`<span style="color:var(--muted);font-size:11px;">مخطط عام</span>`}
                  </td>
                  <td>
                    ${u?`
                      <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                        ${u}
                      </span>
                    `:`<span style="font-size:11px;color:var(--muted);">V1</span>`}
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${l?`
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${k(e.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${e.status===`draft`?`selected`:``}>📝 ${O(`مسودة عمل`,`Draft`)}</option>
                          <option value="review" ${e.status===`review`?`selected`:``}>🔍 ${O(`قيد المراجعة`,`Review`)}</option>
                          <option value="approved" ${e.status===`approved`?`selected`:``}>✅ ${O(`معتمد للتنفيذ`,`Approved`)}</option>
                          <option value="superseded" ${e.status===`superseded`?`selected`:``}>⏳ ${O(`مستبدل بنسخة أحدث`,`Superseded`)}</option>
                        </select>
                      `:`
                        <span class="status-badge ${k(e.status||`draft`)}" style="font-size:11px;">
                          ${k(be(e.status||`draft`))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${d}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${he(e.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${k(e.id)}" style="padding:5px;" title="${O(`معاينة`,`Preview`)}">
                        ${A(`eye`,14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${k(e.id)}" style="padding:5px;color:var(--teal);" title="${O(`نسخ الرابط`,`Copy Link`)}">
                        ${A(`link`,14)}
                      </button>
                      <a href="/api/documents/${k(e.id)}" target="_blank" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${O(`تحميل`,`Download`)}">
                        ${A(`download`,14)}
                      </a>
                      ${f?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${k(e.id)}" style="padding:5px;color:var(--red);" title="${O(`نقل لسلة المهملات`,`Move to trash`)}">
                          ${A(`trash`,14)}
                        </button>
                      `:``}
                    </div>
                  </td>
                </tr>
              `}).join(``):`
              <tr>
                <td colspan="8">
                  <div class="empty" style="padding:40px 20px;">
                    ${A(`document`,24)}
                    <span>${O(`لا توجد ملفات أو مخططات مطابقة للبحث أو الفلترة المحددة.`,`No drawings or documents found matching the criteria.`)}</span>
                  </div>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function qt(e=null){let n=r.data?.projects||[],i=e||n[0]?.id||``,a=r.data?.tasks?.filter(e=>e.projectId===i&&!e.deletedAt)||[],o=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${O(`المشروع المستهدف *`,`Target Project *`)}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${n.map(e=>`<option value="${k(e.id)}" ${e.id===i?`selected`:``}>${k(e.code)} - ${k(O(e.nameAr,e.nameEn))}</option>`).join(``)}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${O(`المهمة الهندسية (اختياري)`,`Engineering Task (Optional)`)}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${O(`— مخطط عام لكامل المشروع —`,`— General Project Drawing —`)}</option>
            ${a.map(e=>`<option value="${k(e.id)}">${k(O(e.titleAr,e.titleEn))}</option>`).join(``)}
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
          <div style="color:var(--teal);margin-bottom:8px;">${A(`upload`,28)}</div>
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:var(--ink);">${O(`اسحب وأفلت المخططات هنا أو انقر للاختيار`,`Drag & drop drawings here or click to browse`)}</p>
          <p style="margin:0;font-size:11px;color:var(--muted);">${O(`يدعم ملفات هندسية عملاقة: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (حتى 100GB برفع مستأنف فائق السرعة)`,`Supports massive engineering files: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (Up to 100GB with resumable chunks)`)}</p>
          <input type="file" multiple id="drawing-file-input" style="display:none;" />
        </div>
        <div id="drawing-selected-files-list" style="margin-top:10px;display:grid;gap:6px;"></div>
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;">
        <button type="button" class="btn btn-secondary btn-sm" data-action="close-modal">${O(`إلغاء`,`Cancel`)}</button>
        <button type="submit" class="btn btn-primary btn-sm" id="start-drawing-upload-btn" style="font-weight:700;" disabled>
          ${A(`upload`,14)} <span>${O(`بدء الرفع المباشر`,`Start Resumable Upload`)}</span>
        </button>
      </div>
    </form>
  `,s=document.getElementById(`modal-root`);if(s){s.innerHTML=ae(O(`رفع مخطط أو مخرج هندسي جديد`,`Upload Architectural Deliverable / Drawing`),O(`رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.`,`Upload CAD, BIM, and PDF files with revision numbering and discipline tagging.`),o,`upload-drawing`,`modal-lg`);let e=document.getElementById(`drawing-upload-project`),n=document.getElementById(`drawing-upload-task`);e&&n&&e.addEventListener(`change`,()=>{let i=e.value,a=r.data?.tasks?.filter(e=>e.projectId===i&&!e.deletedAt)||[];n.innerHTML=`<option value="">${O(`— مخطط عام لكامل المشروع —`,`— General Project Drawing —`)}</option>`+a.map(e=>`<option value="${k(e.id)}">${k(O(e.titleAr,e.titleEn))}</option>`).join(``)});let i=document.getElementById(`drawing-dropzone`),a=document.getElementById(`drawing-file-input`),c=document.getElementById(`drawing-selected-files-list`),l=document.getElementById(`start-drawing-upload-btn`),u=[],d=()=>{u.length?(l.disabled=!1,c.innerHTML=u.map((e,n)=>{let r=fe(e.name,e.type),i=e.size>1048576?(e.size/1048576).toFixed(1)+` MB`:Math.round(e.size/1024)+` KB`;return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${r.bg};color:${r.color};border:1px solid ${r.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${r.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${k(e.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${i})</span>
            </div>
            <button type="button" data-file-remove="${n}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(``),c.querySelectorAll(`[data-file-remove]`).forEach(e=>{e.addEventListener(`click`,n=>{let r=parseInt(e.dataset.fileRemove);u.splice(r,1),d()})})):(c.innerHTML=``,l.disabled=!0)};i&&a&&(i.addEventListener(`click`,()=>a.click()),a.addEventListener(`change`,()=>{a.files?.length&&(u=Array.from(a.files),d())}),i.addEventListener(`dragover`,e=>{e.preventDefault(),i.style.borderColor=`var(--teal)`}),i.addEventListener(`dragleave`,()=>{i.style.borderColor=`var(--line)`}),i.addEventListener(`drop`,e=>{e.preventDefault(),i.style.borderColor=`var(--line)`,e.dataTransfer?.files?.length&&(u=Array.from(e.dataTransfer.files),d())}));let f=document.getElementById(`upload-drawing-form`);f&&f.addEventListener(`submit`,async r=>{if(r.preventDefault(),!u.length)return;let i=e.value,a=n.value||null,o=document.getElementById(`drawing-upload-discipline`)?.value||`عام`,s=document.getElementById(`drawing-upload-status`)?.value||`draft`;ie(),typeof window.uploadDirectFiles==`function`&&window.uploadDirectFiles({files:u,projectId:i,taskId:a,discipline:o,status:s})})}}var Jt=n({FULL_PERMISSIONS_CATALOG:()=>tn,openRoleModal:()=>nn,openUserModal:()=>rn,renderAuditForProject:()=>Xt,renderSettings:()=>en,renderTeam:()=>Yt,renderUserActivityCell:()=>Zt});function Yt(){if(!isAdmin()&&!can(`manage_users`))return`<section class="panel"><div class="empty">${icon(`alert`,18)}<span>${choose(`غير مصرح لك بعرض هذه الصفحة.`,`You are not authorized to view this page.`)}</span></div></section>`;let e=r.data?.user?.id,n=(r.data?.users||[]).filter(e=>e.status!==`inactive`);return n=e===`usr_ahmad`?[...n].sort((e,n)=>e.id===`usr_ahmad`?-1:+(n.id===`usr_ahmad`)):n.filter(e=>e.id!==`usr_ahmad`),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${choose(`الأشخاص والمسؤوليات`,`PEOPLE & OWNERSHIP`)}</p>
        <h1>${t(`team`)}</h1>
        <p>${choose(`كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.`,`Every member has a clear role, responsibility, and next action.`)}</p>
      </div>
      <div class="page-actions">
        ${isAdmin()||can(`manage_users`)?`<button class="btn btn-primary" data-action="new-user">${icon(`plus`,15)} ${t(`addMember`)}</button>`:``}
      </div>
    </div>
    <div class="team-grid">
      ${n.map(e=>{let n=teamMetrics(e.id,r.data?.tasks||[]),i=e.id===`usr_ahmad`;return`
          <article class="member-card ${i?`system-developer-card`:``}" style="${i?`border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);`:``}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${avatar(e,`avatar-lg`)}
                <div class="member-card-person-copy">
                  <strong>${esc(choose(e.name,e.nameEn||e.name))}</strong>
                  <span>${esc(choose(e.jobTitleAr||(i?`المبرمج / مدير النظام`:``),e.jobTitleEn||e.jobTitleAr||``))}</span>
                </div>
              </div>
              ${i?`<span class="stealth-dev-badge">${icon(`shield`,12)} ${choose(`مدير ومطور النظام`,`Super Admin & Dev`)}</span>`:canManageAccountPermissions()&&e.id!==r.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${esc(e.id)}">${icon(`more`,15)}</button>`:``}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${e.status===`active`?`done`:`not_started`}">${esc(roleName(e))}</span>
            </div>
            <div class="member-card-stats">
              <span>${t(`progress`)} <strong>${n.progress}%</strong></span>
              <span>${n.tasks} ${t(`tasks`)}</span>
            </div>
            <div class="member-email">${e.email?esc(e.email):t(`noEmail`)}</div>
          </article>
        `}).join(``)}
    </div>
  `}function Xt(e){let n=(r.data?.auditLogs||[]).filter(n=>n.details?.projectId===e||n.entityType===`project`&&n.entityId===e);return n.length?`<div class="audit-list">${n.map(e=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${esc(e.user?choose(e.user.name,e.user.nameEn||e.user.name):`DARC`)} · ${esc(e.action)}</strong><span>${esc(e.entityType)} · ${dateLabel(e.createdAt,!0)}</span></div></div>`).join(``)}</div>`:`<div class="empty">${icon(`check`,18)}<span>${choose(`لا توجد تغييرات مسجلة بعد.`,`No changes recorded yet.`)}</span></div>`}function Zt(e){let n=e.lastActiveAt||e.customFields?.lastActiveAt,i=e.lastLoginAt||e.customFields?.lastLoginAt;if(!n&&!i)return`<span class="activity-never">${choose(`لم يسجل دخول بعد`,`Never logged in`)}</span>`;let a=Date.now(),o=n?new Date(n).getTime():0,s=e.id===r.data?.user?.id?0:o&&!isNaN(o)?Math.floor((a-o)/6e4):999999,c=s>=0&&s<=5,l=``;if(c)l=`<span class="activity-pill online"><span class="activity-dot online"></span> ${choose(`نشط الآن`,`Online`)}</span>`;else if(s<60)l=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${choose(`منذ ${s} دقيقة`,`${s}m ago`)}</span>`;else if(s<1440){let e=Math.floor(s/60);l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${choose(`منذ ${e} ساعة`,`${e}h ago`)}</span>`}else o>0&&(l=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(n,!1)}</span>`);let u=i?`<span class="activity-sub" title="${esc(i)}">${choose(`دخول:`,`Login:`)} ${dateLabel(i,!0)}</span>`:``;return`<div class="activity-wrapper">${l}${u}</div>`}function Qt(e){if(!e)return{date:`—`,time:`—`};try{let n=new Date(e);return isNaN(n.getTime())?{date:e,time:``}:{date:new Intl.DateTimeFormat(r.lang===`ar`?`ar-SA`:`en-US`,{year:`numeric`,month:`short`,day:`numeric`}).format(n),time:new Intl.DateTimeFormat(r.lang===`ar`?`ar-SA`:`en-US`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!0}).format(n)}}catch{return{date:e,time:``}}}function $t(e){let n=e.action||``,r=e.entityType||e.entity_type||``,i=e.details||{},a=`badge-neutral`,o=n,s=r;n===`login`?(a=`badge-teal`,o=choose(`تسجيل دخول`,`Sign In`),s=choose(`جلسة نظام`,`System Session`)):n===`create`?(a=`badge-mint`,o=choose(`إنشاء جديد`,`Created`)):n===`update`?(a=`badge-blue`,o=choose(`تعديل بيانات`,`Updated`)):n===`delete`?(a=`badge-red`,o=choose(`نقل للمهملات`,`Moved to Trash`)):n===`status_change`?(a=`badge-amber`,o=choose(`تغيير حالة`,`Status Changed`)):n===`export_report`?(a=`badge-teal`,o=choose(`تصدير تقرير`,`Exported Report`)):n===`restore`?(a=`badge-mint`,o=choose(`استعادة`,`Restored`)):n===`purge`?(a=`badge-danger`,o=choose(`حذف نهائي`,`Purged`)):n===`invite`&&(a=`badge-blue`,o=choose(`دعوة مستخدم`,`Invite Sent`)),r===`task`?s=choose(`مهمة`,`Task`):r===`project`?s=choose(`مشروع`,`Project`):r===`document`?s=choose(`مستند`,`Document`):r===`user`?s=choose(`مستخدم`,`User`):r===`report`?s=choose(`تقرير`,`Report`):r===`role`&&(s=choose(`دور وصلاحيات`,`Role`));let c=`—`;return i.title||i.name?c=`<strong>${esc(i.title||i.name)}</strong>`:n===`status_change`&&(i.oldStatus||i.newStatus)?c=`<span>${esc(statusText(i.oldStatus))} ➔ <strong>${esc(statusText(i.newStatus))}</strong></span>`:e.entityId&&(c=`<code style="font-size:11px;color:var(--muted);">${esc(e.entityId)}</code>`),{badgeClass:a,actionLabel:o,entityLabel:s,detailHtml:c}}function en(){let e=r.data?.user?.id,n=isAdmin(),i=n||can(`manage_users`)||can(`view_user_activity`),a=[[`profile`,choose(`الملف الشخصي`,`Profile`)],...n||can(`manage_settings`)?[[`company`,t(`company`)]]:[],...n||can(`manage_roles`)?[[`roles`,t(`roles`)]]:[],...i?[[`accounts`,t(`accounts`)]]:[],[`security`,choose(`الأمان`,`Security`)],[`trash`,choose(`سلة المهملات`,`Trash`)],...n||can(`view_audit_logs`)?[[`audit`,t(`audit`)]]:[]];a.some(([e])=>e===r.settingsSection)||(r.settingsSection=`profile`);let o=r.data?.user||{},s=``;if(r.settingsSection===`profile`&&(s=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${choose(`الملف الشخصي`,`Profile`)}</h2>
            <p>${choose(`إدارة صورتك الشخصية وبيانات حسابك في النظام.`,`Manage your profile picture and account information.`)}</p>
          </div>
        </div>

        <div class="profile-avatar-card">
          <label for="user-avatar-file-input" class="avatar-upload-trigger" id="profile-avatar-preview" role="button" tabindex="0" title="${choose(`انقر لرفع صورة شخصية جديدة`,`Click to upload a new profile picture`)}">
            <div class="avatar-upload-circle">
              ${o.avatarUrl?`<img src="${esc(o.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(o.avatarColor||``)?o.avatarColor:`#0d6269`};">${esc(initials(o))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(o.avatarColor||``)?o.avatarColor:`#0d6269`};">${esc(initials(o))}</div>`}
              <div class="avatar-upload-overlay">
                ${icon(`upload`,18)}
                <span>${choose(`تغيير`,`Change`)}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${esc(choose(o.name,o.nameEn||o.name))}</h3>
            <p class="profile-user-role">${esc(choose(o.jobTitleAr||``,o.jobTitleEn||o.jobTitleAr||``))} · <span class="status-badge done">${esc(roleName(o))}</span></p>
            <div class="profile-upload-actions">
              <input type="file" id="user-avatar-file-input" accept="image/jpeg,image/png,image/webp" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="user-avatar-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${icon(`upload`,14)} ${choose(`رفع صورة جديدة`,`Upload new avatar`)}
              </label>
              <span class="upload-hint">${choose(`يدعم JPG, PNG, WebP (حد أقصى 2MB)`,`Supports JPG, PNG, WebP (Max 2MB)`)}</span>
            </div>
          </div>
        </div>

        <form data-action="update-profile">
          <div class="form-grid">
            <div class="field">
              <label>${t(`nameAr`)}</label>
              <input name="name" value="${esc(o.name||``)}" required />
            </div>
            <div class="field">
              <label>${t(`nameEn`)}</label>
              <input name="nameEn" value="${esc(o.nameEn||``)}" />
            </div>
            <div class="field">
              <label>${t(`jobTitle`)} (${choose(`عربي`,`AR`)})</label>
              <input name="jobTitleAr" value="${esc(o.jobTitleAr||``)}" />
            </div>
            <div class="field">
              <label>${t(`jobTitle`)} (${choose(`إنجليزي`,`EN`)})</label>
              <input name="jobTitleEn" value="${esc(o.jobTitleEn||``)}" />
            </div>
            <div class="field full">
              <label>${t(`email`)}</label>
              <input value="${esc(o.email||``)}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${choose(`نظام التقويم المفضل في المنصة`,`Preferred Calendar System`)}</label>
              <select name="calendarSystem" class="input">
                <option value="gregorian" ${me()===`gregorian`?`selected`:``}>${choose(`ميلادي — اليوم / الشهر / السنة (مثال: 07/09/2026)`,`Gregorian — Day / Month / Year (e.g. 07/09/2026)`)}</option>
                <option value="hijri" ${me()===`hijri`?`selected`:``}>${choose(`هجري أم القرى — اليوم / الشهر / السنة (مثال: 25/02/1448 هـ)`,`Hijri Umm al-Qura — Day / Month / Year (e.g. 25/02/1448 AH)`)}</option>
              </select>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${t(`save`)}</button>
          </div>
        </form>
      </section>
    `),r.settingsSection===`company`&&(n||can(`manage_settings`))){let e=r.data?.company||{};s=`
      <section class="setting-section">
        <h2>${t(`company`)}</h2>
        <p>${choose(`هوية مساحة العمل وشعار الشركة واللغة الافتراضية.`,`Workspace identity, company logo, and default language.`)}</p>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${choose(`انقر لرفع وتعديل شعار الشركة`,`Click to upload and change company logo`)}">
            <div class="logo-upload-box">
              ${e.logoUrl?`<img src="${esc(e.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${icon(`building`,24)}</span>`:`<span class="brand-mark">${icon(`building`,24)}</span>`}
              <div class="logo-upload-overlay">
                ${icon(`upload`,16)}
                <span>${choose(`تعديل`,`Edit`)}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${esc(e.name||`DARC Design Team`)}</strong>
            <span class="company-sub">${choose(`العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض`,`Arabic default · English support · Riyadh timezone`)}</span>
            <div class="company-upload-actions">
              <input type="file" id="company-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="company-logo-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${icon(`upload`,14)} ${choose(`رفع وتعديل الشعار`,`Upload & Change Logo`)}
              </label>
              <span class="upload-hint">${choose(`يدعم PNG, SVG, JPG (حد أقصى 2MB)`,`Supports PNG, SVG, JPG (Max 2MB)`)}</span>
            </div>
          </div>
        </div>

        <form data-action="update-company">
          <div class="form-grid">
            <div class="field">
              <label>${t(`nameAr`)}</label>
              <input name="nameAr" value="${esc(e.nameAr||``)}" required />
            </div>
            <div class="field">
              <label>${t(`nameEn`)}</label>
              <input name="nameEn" value="${esc(e.nameEn||``)}" />
            </div>
            <div class="field full">
              <label>${t(`emailStatus`)}</label>
              <input value="${esc(r.data?.emailConfigured?t(`emailConfigured`):t(`emailNotConfigured`))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:15px;">
            <button type="submit" class="btn btn-primary">${t(`save`)}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:12px;">${icon(`info`,16)}<span>${t(`emailInfo`)}</span></div>
      </section>
      <section class="setting-section">
        <h2>${choose(`نموذج الإنجاز`,`Progress model`)}</h2>
        <p>${t(`weightedExplanation`)}</p>
        <div class="report-stat-list">
          <div class="report-stat"><span>${t(`weightedProgress`)}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${t(`simpleProgress`)}</span><strong style="color:var(--ink-soft)">—</strong></div>
        </div>
      </section>
    `}if(r.settingsSection===`security`&&(s=`
      <section class="setting-section">
        <h2>${choose(`الأمان`,`Security`)}</h2>
        <p>${choose(`تغيير كلمة المرور أو تسجيل الخروج من كافة الأجهزة.`,`Change your password or sign out from all devices.`)}</p>
        <form data-action="change-password">
          <div class="form-grid" style="margin-top:18px">
            <div class="field"><label>${choose(`كلمة المرور الحالية`,`Current password`)}</label><input type="password" name="oldPassword" required /></div>
            <div class="field"><label>${choose(`كلمة المرور الجديدة`,`New password`)}</label><input type="password" name="newPassword" minlength="10" required /></div>
          </div>
          <div class="form-actions" style="margin-top:15px"><button type="submit" class="btn btn-primary">${t(`save`)}</button></div>
        </form>
        <hr style="margin:30px 0;border:0;border-top:1px solid var(--border)">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <h3 style="font-size:14px;margin-bottom:4px">${choose(`تسجيل الخروج من كل الأجهزة`,`Sign out of all devices`)}</h3>
            <p style="color:var(--muted);font-size:13px">${choose(`إنهاء كافة الجلسات النشطة على كل المتصفحات.`,`End all active sessions on all browsers.`)}</p>
          </div>
          <button class="btn btn-danger btn-sm" data-action="logout-all">${choose(`تسجيل خروج للكل`,`Sign out all`)}</button>
        </div>
      </section>
    `),r.settingsSection===`accounts`&&i){let n=isAdmin()||can(`view_user_activity`),i=isAdmin()||can(`manage_users`),a=isAdmin()||can(`manage_existing_account_permissions`)||can(`manage_users`),o=isAdmin(),c=r.data?.users||[];e!==`usr_ahmad`&&(c=c.filter(e=>e.id!==`usr_ahmad`)),s=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t(`accounts`)}</h2>
            <p>${choose(`الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.`,`Current accounts and each member’s access. Add, edit, or deactivate them here.`)}</p>
          </div>
          ${i?`<button class="btn btn-primary btn-sm" data-action="new-user">${icon(`plus`,14)} ${t(`addMember`)}</button>`:``}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t(`team`)}</th>
                <th>${t(`role`)}</th>
                <th>${t(`email`)}</th>
                <th>${t(`accountStatus`)}</th>
                ${n?`<th>${choose(`آخر ظهور ونشاط`,`Last Seen & Activity`)}</th>`:``}
                ${a?`<th></th>`:``}
              </tr>
            </thead>
            <tbody>
              ${c.map(e=>{let i=e.id===`usr_ahmad`;return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${avatar(e)}
                        <div class="team-member-copy">
                          <strong>${esc(choose(e.name,e.nameEn||e.name))}</strong>
                          <span>${esc(choose(e.jobTitleAr||(i?`المبرمج / مدير النظام`:``),e.jobTitleEn||e.jobTitleAr||``))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${i?`<span class="stealth-dev-badge">${icon(`shield`,12)} ${choose(`مدير ومطور النظام`,`Super Admin & Dev`)}</span>`:esc(roleName(e))}
                    </td>
                    <td>${e.email?esc(e.email):`<span style="color:var(--muted)">${t(`noEmail`)}</span>`}</td>
                    <td>
                      <span class="status-badge ${e.status===`active`?`done`:`not_started`}">${e.status===`active`?t(`activeAccount`):t(`pendingAccount`)}</span>
                    </td>
                    ${n?`
                      <td>
                        ${Zt(e)}
                      </td>
                    `:``}
                    ${a?`
                      <td>
                        <div class="role-actions">
                          ${i?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${esc(e.id)}">${t(`edit`)}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${esc(e.id)}">${t(`edit`)}</button>
                            ${e.id===r.data?.user?.id?``:`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${esc(e.id)}" title="${e.status===`pending`?choose(`تفعيل الحساب يدوياً`,`Activate manually`):choose(`تغيير كلمة المرور`,`Change password`)}">${icon(e.status===`pending`?`check`:`settings`,13)}</button>
                              ${o?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${esc(e.id)}" title="دخول كـ هذا الحساب">${icon(`user`,13)}</button>`:``}
                            `}
                            ${e.id!==r.data?.user?.id&&e.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${esc(e.id)}">${icon(`send`,13)}</button>`:``}
                            ${e.id===r.data?.user?.id?``:`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${esc(e.id)}">${icon(`trash`,13)}</button>`}
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
    `}if(r.settingsSection===`roles`&&(n||can(`manage_roles`))&&(s=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t(`roles`)}</h2>
            <p>${choose(`إدارة الأدوار وصلاحيات الوصول للنظام.`,`Manage roles and access permissions across the system.`)}</p>
          </div>
          ${n||can(`manage_roles`)?`<button class="btn btn-primary btn-sm" data-action="new-role">${icon(`plus`,14)} ${t(`addRole`)}</button>`:``}
        </div>
        <div class="role-list">
          ${(r.data?.roles||[]).map(e=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${esc(choose(e.nameAr,e.nameEn))}</strong>
                  ${e.builtIn?`<span class="role-system-badge">${icon(`shield`,11)} ${t(`builtIn`)}</span>`:``}
                </div>
                <p class="role-desc">${esc(choose(e.descriptionAr,e.descriptionEn))}</p>
                <div class="role-meta">${e.permissions.includes(`*`)?choose(`صلاحية كاملة`,`Full access`):`${e.permissions.length} ${t(`permissionCount`)}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${esc(e.id)}">${icon(`edit`,13)} ${t(`edit`)}</button>
                ${e.builtIn?``:`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${esc(e.id)}">${icon(`trash`,13)}</button>`}
              </div>
            </div>
          `).join(``)}
        </div>
      </section>
    `),r.settingsSection===`trash`){!r.trashLoaded&&!r._trashFetching&&(r._trashFetching=!0,P(`/api/trash`).then(e=>{r.trash=Array.isArray(e)?e:e.trash||[...(e.projects||[]).map(e=>({...e,type:`project`})),...(e.tasks||[]).map(e=>({...e,type:`task`})),...(e.documents||[]).map(e=>({...e,type:`document`}))],r.trashLoaded=!0,r._trashFetching=!1,typeof window.renderView==`function`&&window.renderView()}).catch(e=>{r._trashFetching=!1,console.error(`[Trash fetch error]`,e)}));let i=r.trash||[],a=r.trashFilter||`all`,o=(r.trashQuery||``).trim().toLowerCase(),c=i.filter(e=>{if(a!==`all`&&e.type!==a)return!1;if(!o)return!0;let n=(choose(e.nameAr||e.titleAr,e.nameEn||e.titleEn)||e.name||e.title||e.originalName||``).toLowerCase(),r=(e.code||e.projectCode||``).toLowerCase(),i=(e.projectNameAr||e.projectNameEn||``).toLowerCase();return n.includes(o)||r.includes(o)||i.includes(o)}),l=i.filter(e=>e.type===`project`).length,u=i.filter(e=>e.type===`task`).length,d=i.filter(e=>e.type===`document`).length,f=i.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${icon(`info`,16)}</div>
        <div class="trash-notice-text">
          <strong>${choose(`سلة المحذوفات المركزية المحمية`,`Central Protected Trash Bin`)}</strong>
          <p>${choose(`تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.`,`Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.`)}</p>
        </div>
      </div>

      <div class="trash-filter-bar" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <button class="btn btn-sm ${a===`all`?`btn-primary`:`btn-ghost`}" data-action="filter-trash" data-filter="all">
            ${choose(`الكل`,`All`)} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${i.length}</span>
          </button>
          <button class="btn btn-sm ${a===`project`?`btn-primary`:`btn-ghost`}" data-action="filter-trash" data-filter="project">
            ${icon(`building`,12)} ${choose(`المشاريع`,`Projects`)} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${l}</span>
          </button>
          <button class="btn btn-sm ${a===`task`?`btn-primary`:`btn-ghost`}" data-action="filter-trash" data-filter="task">
            ${icon(`checklist`,12)} ${choose(`المهام`,`Tasks`)} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${u}</span>
          </button>
          <button class="btn btn-sm ${a===`document`?`btn-primary`:`btn-ghost`}" data-action="filter-trash" data-filter="document">
            ${icon(`document`,12)} ${choose(`المستندات`,`Documents`)} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${d}</span>
          </button>
        </div>
        <div style="min-width:220px;max-width:320px;flex:1;">
          <input type="search" class="input input-sm" placeholder="${choose(`بحث في المحذوفات...`,`Search deleted items...`)}" value="${esc(r.trashQuery||``)}" data-action="search-trash-input" style="width:100%;padding:6px 12px;font-size:12px;" />
        </div>
      </div>

      ${c.length?`
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${choose(`الاسم / العنوان`,`Name / Title`)}</th>
                <th>${choose(`النوع`,`Type`)}</th>
                <th>${choose(`المشروع التابع له`,`Project`)}</th>
                <th>${choose(`الحالة السابقة`,`Prior Status`)}</th>
                <th>${choose(`تاريخ الحذف`,`Deleted At`)}</th>
                <th style="text-align:${r.lang===`ar`?`left`:`right`}">${choose(`الإجراءات`,`Actions`)}</th>
              </tr>
            </thead>
            <tbody>
              ${c.map(i=>{let a=i.type===`project`,o=i.type===`task`,s=i.type===`document`,c=choose(i.nameAr||i.titleAr,i.nameEn||i.titleEn)||i.name||i.title||i.originalName||i.code||choose(`عنصر محذوف`,`Deleted item`),l=!a&&i.projectId?(r.data?.projects||[]).find(e=>e.id===i.projectId):null,u=i.projectNameAr||i.projectNameEn||(l?choose(l.nameAr,l.nameEn||l.nameAr):null),d=i.projectCode||l?.code,f=s&&i.size?i.size>1048576?(i.size/1048576).toFixed(1)+` MB`:Math.round(i.size/1024)+` KB`:``,p=n||can(`manage_trash`)||i.uploaderId===e;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${a?`is-project`:o?`is-task`:`is-doc`}">
                          ${icon(a?`building`:o?`checklist`:`document`,14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${esc(c)}</strong>
                          ${i.code||a?`<span class="trash-item-code">${esc(i.code||i.id)}</span>`:``}
                          ${s&&f?`<span class="trash-item-code" style="color:var(--muted);">${f}</span>`:``}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${a?`type-project`:o?`type-task`:`type-doc`}">
                        ${icon(a?`building`:o?`checklist`:`document`,11)}
                        ${a?choose(`مشروع`,`Project`):o?choose(`مهمة`,`Task`):choose(`مستند`,`Document`)}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${a?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${choose(`مشروع رئيسي`,`Primary Project`)}</span>`:u?`${icon(`building`,11)} <span>${esc(u)}${d?` (${esc(d)})`:``}</span>${s&&i.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${esc(i.taskTitleAr)}</span>`:``}`:`<span style="color:var(--muted)">—</span>`}
                      </span>
                    </td>
                    <td>
                      ${i.status?`<span class="status-badge ${esc(i.status)}">${esc(statusText(i.status))}</span>`:`<span style="color:var(--muted)">—</span>`}
                    </td>
                    <td>
                      <span class="trash-date" title="${esc(i.deletedAt||``)}">
                        ${dateLabel(i.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${r.lang===`ar`?`left`:`right`}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${esc(i.type)}" data-id="${esc(i.id)}" title="${choose(`استعادة العنصر وإعادته للعمل`,`Restore item to active`)}">
                          ${icon(r.lang===`ar`?`arrow`:`arrowLeft`,12)} ${choose(`استعادة`,`Restore`)}
                        </button>
                        ${p?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${esc(i.type)}" data-id="${esc(i.id)}" title="${choose(`حذف العنصر نهائياً`,`Permanently delete item`)}">
                            ${icon(`trash`,12)} ${choose(`حذف نهائي`,`Purge`)}
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
          ${icon(`search`,22)}
          <span>${choose(`لا توجد نتائج تطابق بحثك في سلة المهملات.`,`No items match your search in trash.`)}</span>
        </div>
      `}
    `:`
      <div class="empty">
        ${icon(`trash`,24)}
        <span>${choose(`سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.`,`Trash is empty, no deleted items found.`)}</span>
      </div>
    `;s=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${choose(`سلة المهملات`,`Recycle Bin`)}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${i.length} ${choose(`عناصر`,`items`)}
              </span>
            </div>
            <p>${choose(`استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.`,`Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.`)}</p>
          </div>
          ${(n||can(`manage_trash`))&&i.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${choose(`حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات`,`Permanently erase all deleted items`)}">
                ${icon(`trash`,13)} ${choose(`إفراغ سلة المهملات`,`Empty Trash`)}
              </button>
            </div>
          `:``}
        </div>
        ${f}
      </section>
    `}if(r.settingsSection===`audit`&&(n||can(`view_audit_logs`))){let e=[...r.data?.auditLogs||[]].sort((e,n)=>new Date(n.createdAt).getTime()-new Date(e.createdAt).getTime());s=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${t(`audit`)}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${e.length} ${choose(`عملية مسجلة`,`events recorded`)}
              </span>
            </div>
            <p>${choose(`سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.`,`Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.`)}</p>
          </div>
        </div>

        ${e.length?`
          <div class="table-wrap" style="border:1px solid var(--line);border-radius:12px;overflow-x:auto;background:var(--surface);">
            <table class="data-table" style="width:100%;border-collapse:collapse;font-size:12px;min-width:650px;">
              <thead>
                <tr style="background:var(--surface-soft);border-bottom:1px solid var(--line);color:var(--ink-soft);font-size:11px;font-weight:700;text-align:inherit;">
                  <th style="padding:12px 14px;">${choose(`المستخدم / المنفذ`,`User / Actor`)}</th>
                  <th style="padding:12px 14px;">${choose(`نوع النشاط والعملية`,`Action & Target`)}</th>
                  <th style="padding:12px 14px;">${choose(`التفاصيل والتغيير`,`Details / Context`)}</th>
                  <th style="padding:12px 14px;text-align:${r.lang===`ar`?`left`:`right`};">${choose(`التاريخ والوقت الدقيق`,`Exact Date & Time`)}</th>
                </tr>
              </thead>
              <tbody>
                ${e.map(e=>{let n=e.user||(e.userId?(r.data?.users||[]).find(n=>n.id===e.userId):null),i=n?choose(n.name,n.nameEn||n.name):choose(`النظام`,`System`),a=n?roleName(n):choose(`تلقائي`,`Automated`),o=Qt(e.createdAt),{badgeClass:s,actionLabel:c,entityLabel:l,detailHtml:u}=$t(e);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${avatar(n)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${esc(i)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${esc(a)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${s}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${esc(c)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${esc(l)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${u}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${r.lang===`ar`?`left`:`right`};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${esc(o.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${icon(`clock`,11)}
                          <span>${esc(o.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join(``)}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${icon(`checklist`,24)}
            <span>${choose(`لا توجد عمليات مسجلة حتى الآن.`,`No audit logs recorded yet.`)}</span>
          </div>
        `}
      </section>
    `}return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${n?choose(`تحكم مركزي`,`CENTRAL CONTROL`):choose(`الملف الشخصي`,`USER PROFILE`)}</p>
        <h1>${n?t(`settings`):choose(`الملف الشخصي والأمان`,`Profile & Security`)}</h1>
        <p>${n?choose(`إدارة إعدادات الشركة والحسابات والأدوار والنظام.`,`Manage workspace, accounts, roles, and settings.`):choose(`إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.`,`Manage your account info, password, and personal avatar.`)}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${icon(n?`shield`:`user`,13)} ${esc(roleName(o))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${a.map(([e,n])=>`<button class="${r.settingsSection===e?`active`:``}" data-action="settings-section" data-section="${e}">${n}</button>`).join(``)}
      </aside>
      <div class="settings-content">${s}</div>
    </div>
  `}var tn=[{id:`view_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`عرض المشاريع`,nameEn:`View Projects`},{id:`create_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`إنشاء مشاريع جديدة`,nameEn:`Create Projects`},{id:`edit_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`تعديل بيانات ومراحل المشاريع`,nameEn:`Edit Projects`},{id:`delete_projects`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`حذف المشاريع`,nameEn:`Delete Projects`},{id:`manage_project_members`,category:`projects`,categoryAr:`المشاريع والفرق`,categoryEn:`Projects & Teams`,nameAr:`إدارة وتعيين أعضاء المشروع`,nameEn:`Manage Project Members`},{id:`create_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`إنشاء المهام والمخرجات`,nameEn:`Create Tasks`},{id:`edit_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`تعديل تفاصيل وحالة المهام`,nameEn:`Edit Tasks`},{id:`delete_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`حذف المهام`,nameEn:`Delete Tasks`},{id:`assign_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`إسناد وتوزيع المهام للمنفذين`,nameEn:`Assign Tasks`},{id:`review_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`مراجعة المخرجات الهندسية`,nameEn:`Review Deliverables`},{id:`approve_tasks`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`اعتماد وتوقيع المخرجات الهندسية`,nameEn:`Approve Deliverables`},{id:`manage_reminders`,category:`tasks`,categoryAr:`المهام والتنفيذ`,categoryEn:`Tasks & Execution`,nameAr:`إدارة التذكيرات والمتابعات`,nameEn:`Manage Reminders`},{id:`upload_documents`,category:`documents`,categoryAr:`المخططات والمكتبة القياسية`,categoryEn:`Drawings & Deliverables Library`,nameAr:`رفع وإدارة المخططات والمستندات`,nameEn:`Upload Documents`},{id:`delete_documents`,category:`documents`,categoryAr:`المخططات والمكتبة القياسية`,categoryEn:`Drawings & Deliverables Library`,nameAr:`حذف المخططات والمستندات`,nameEn:`Delete Documents`},{id:`manage_templates`,category:`documents`,categoryAr:`المخططات والمكتبة القياسية`,categoryEn:`Drawings & Deliverables Library`,nameAr:`إدارة مكتبة القوالب والمخرجات القياسية`,nameEn:`Manage Templates Library`},{id:`view_dashboard`,category:`reports`,categoryAr:`المؤشرات والتقارير`,categoryEn:`Analytics & Reports`,nameAr:`عرض لوحة التحكم والمؤشرات`,nameEn:`View Dashboard`},{id:`view_reports`,category:`reports`,categoryAr:`المؤشرات والتقارير`,categoryEn:`Analytics & Reports`,nameAr:`عرض صفحة التقارير والمؤشرات`,nameEn:`View Reports`},{id:`export_reports`,category:`reports`,categoryAr:`المؤشرات والتقارير`,categoryEn:`Analytics & Reports`,nameAr:`تصدير التقارير (Excel)`,nameEn:`Export Reports (Excel)`},{id:`manage_users`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إدارة ودعوة وتفعيل حسابات المستخدمين`,nameEn:`Manage Users`},{id:`manage_existing_account_permissions`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`تعديل أدوار وصلاحيات الحسابات الموجودة`,nameEn:`Manage Existing Account Permissions`},{id:`view_user_activity`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`متابعة أوقات دخول ونشاط المستخدمين`,nameEn:`View User Logins & Activity Timestamps`},{id:`manage_roles`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إنشاء وتعديل الأدوار والصلاحيات`,nameEn:`Manage Roles & Permissions`},{id:`manage_settings`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إدارة إعدادات النظام والشركة ومساحة العمل`,nameEn:`Manage Company & Settings`},{id:`manage_trash`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`إدارة واستعادة سلة المهملات`,nameEn:`Manage Trash`},{id:`view_audit_logs`,category:`admin`,categoryAr:`النظام والأمان`,categoryEn:`Administration & Governance`,nameAr:`استعراض سجل الرقابة والعمليات الأمنية`,nameEn:`View Audit Logs`}];function nn(e=null){let n=r.data?.permissionsCatalog&&r.data.permissionsCatalog.length>=10?r.data.permissionsCatalog:tn,i=new Map;n.forEach(e=>{let n=e.category||`general`,r=choose(e.categoryAr||n,e.categoryEn||n);i.has(n)||i.set(n,{name:r,items:[]}),i.get(n).items.push(e)});let a=e?.id===`admin`||e?.permissions&&e.permissions.includes(`*`),o=Array.from(i.entries()).map(([n,r])=>{let i=r.items.map(n=>{let r=n.id||n.key,i=choose(n.nameAr||n.ar,n.nameEn||n.en||r),o=a||e?.permissions&&(e.permissions.includes(r)||typeof PERMISSION_ALIASES<`u`&&PERMISSION_ALIASES[r]&&e.permissions.includes(PERMISSION_ALIASES[r])),s=a?`disabled`:``;return`
        <label class="permission-option" style="cursor:${a?`default`:`pointer`};">
          <input type="checkbox" name="permissions" value="${esc(r)}" ${o?`checked`:``} ${s} />
          <span style="font-weight:500;">${esc(i)}</span>
        </label>
      `}).join(``);return`
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${esc(r.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${r.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${i}
        </div>
      </div>
    `}).join(``),s=a?``:`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${t(`permissions`)} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${n.length} ${choose(`صلاحية متاحة`,`available permissions`)})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${choose(`تحديد الكل`,`Select All`)}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${choose(`إلغاء التحديد`,`Deselect All`)}</button>
      </div>
    </div>
  `,c=`
    <form id="role-form" data-role-id="${esc(e?.id||``)}">
      <div class="form-grid">
        <div class="field">
          <label>${t(`nameAr`)} *</label>
          <input name="nameAr" value="${esc(e?.nameAr||``)}" required />
        </div>
        <div class="field">
          <label>${t(`nameEn`)}</label>
          <input name="nameEn" value="${esc(e?.nameEn||``)}" />
        </div>
        <div class="field full">
          <label>${t(`roleDescription`)}</label>
          <textarea name="descriptionAr" rows="2">${esc(e?.descriptionAr||``)}</textarea>
        </div>
      </div>
      ${a?`
        <div class="role-modal-note" style="margin-top:15px;">
          ${choose(`مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.`,`The system administrator always keeps full root privileges [*] across all aspects of the system.`)}
        </div>
      `:`
        ${s}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${o}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button>
        <button type="submit" class="btn btn-primary">${icon(`check`,14)} ${e?t(`save`):t(`create`)}</button>
      </div>
    </form>
  `;document.getElementById(`modal-root`).innerHTML=modalShell(e?choose(`تعديل الدور والصلاحيات`,`Edit role & permissions`):t(`addRole`),choose(`تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.`,`Define granular permissions and workspace access levels for this role.`),c,`role`,`modal-lg`);let l=document.getElementById(`modal-root`);if(l){let e=l.querySelector(`#btn-perm-select-all`),n=l.querySelector(`#btn-perm-deselect-all`);e&&e.addEventListener(`click`,()=>{l.querySelectorAll(`input[name="permissions"]:not(:disabled)`).forEach(e=>e.checked=!0)}),n&&n.addEventListener(`click`,()=>{l.querySelectorAll(`input[name="permissions"]:not(:disabled)`).forEach(e=>e.checked=!1)})}}function rn(e=null){if(e?.id===`usr_ahmad`&&r.data?.user?.id!==`usr_ahmad`)return showToast(choose(`لا يمكن تعديل حساب مدير ومطور النظام.`,`System Developer account is protected.`),!0);if(!e&&!isAdmin())return showToast(t(`adminOnly`),!0);let n=!isAdmin(),i=n?`disabled`:``,a=(r.data?.roles||[]).filter(e=>isAdmin()||e.id!==`admin`),o=`<form id="user-form" data-user-id="${esc(e?.id||``)}" data-permission-only="${n}"><div class="form-grid"><div class="field full"><label>${t(`nameAr`)}</label><input name="name" value="${esc(e?.name||``)}" ${i} required /></div><div class="field"><label>${t(`nameEn`)}</label><input name="nameEn" value="${esc(e?.nameEn||``)}" ${i} /></div><div class="field"><label>${t(`jobTitle`)}</label><input name="jobTitleAr" value="${esc(e?.jobTitleAr||``)}" ${i} /></div><div class="field"><label>${t(`email`)}</label><input name="email" type="email" value="${esc(e?.email||``)}" placeholder="name@darc.com" ${i} /></div><div class="field"><label>${t(`role`)}</label><select name="roleId">${a.map(n=>`<option value="${esc(n.id)}" ${e?.roleId===n.id?`selected`:``}>${esc(choose(n.nameAr,n.nameEn))}</option>`).join(``)}</select></div></div><div class="field-hint">${n?choose(`يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.`,`Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator.`):choose(`إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.`,`If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.`)}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${t(`cancel`)}</button><button type="submit" class="btn btn-primary">${icon(`check`,14)} ${e?n?choose(`حفظ الصلاحية`,`Save permission`):t(`save`):t(`create`)}</button></div></form>`;document.getElementById(`modal-root`).innerHTML=modalShell(e?n?choose(`تعديل صلاحية الحساب`,`Change account permission`):choose(`تعديل حساب العضو`,`Edit member account`):t(`addMember`),choose(`الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.`,`The role defines what this member can see and change across projects.`),o,`user`)}var an=n({showNotifications:()=>on});function on(){let e=r.data?.notifications||[],n=`${e.filter(e=>!e.read&&!e.readAt).length>0?`
    <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
      <button class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 10px;">
        ${A(`check`,13)} ${O(`تحديد الكل كمقروء`,`Mark all as read`)}
      </button>
    </div>
  `:``}${e.length?`<div class="attention-list">${e.slice(0,20).map(e=>{let n=e.type===`overdue`||e.type===`escalation`?`red`:e.type===`due_soon`||e.type===`document_review`?`amber`:`blue`,r=!!(e.readAt||e.read),i=O(e.titleAr||e.titleEn||e.content||``,e.titleEn||e.titleAr||e.content||``),a=O(e.messageAr||e.bodyAr||e.content||``,e.messageEn||e.bodyEn||e.content||``),o=e.type===`overdue`||e.type===`escalation`?`alert`:e.type===`document_review`?`document`:e.type===`assignment`?`user`:`bell`;return`<button class="attention-item" data-action="read-notification" data-notification-id="${k(e.id)}" style="border:0;text-align:inherit;width:100%;opacity:${r?`.65`:`1`}"><span class="attention-icon ${n}">${A(o,14)}</span><span class="attention-copy"><strong style="color:var(--${n})">${k(i)}</strong><span>${k(a)} · ${he(e.createdAt)}</span></span></button>`}).join(``)}</div>`:`<div class="empty">${A(`bell`,18)}<span>${D(`noAttention`)}</span></div>`}`;document.getElementById(`modal-root`).innerHTML=ae(D(`notifications`),O(`تنبيهاتك داخل مساحة العمل والبريد.`,`Your workspace and email notifications.`),n,`notifications`)}var sn=n({canAccessView:()=>R,getFirstAllowedView:()=>z,loadData:()=>ln,navItem:()=>B,refreshView:()=>W,renderApp:()=>V,renderSyncIndicator:()=>cn,renderView:()=>H,switchView:()=>U});function R(e){return r.data?e===`dashboard`?j(`view_dashboard`):e===`projects`||e===`project-detail`?j(`view_projects`):e===`tasks`?j(`create_tasks`)||j(`edit_tasks`)||j(`delete_tasks`)||j(`assign_tasks`)||j(`review_tasks`)||j(`approve_tasks`)||j(`manage_reminders`)||j(`view_projects`)||M():e===`documents`?j(`upload_documents`)||j(`delete_documents`)||M():e===`templates`?j(`manage_templates`)||M():e===`team`?M()||j(`manage_users`):e===`reports`?j(`view_reports`)||M():e===`settings`:!0}function z(){for(let e of[`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`])if(R(e))return e;return`dashboard`}function cn(){let e=C().length;return h()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${O(`انقر للمزامنة الفورية مع السيرفر`,`Click to sync now with server`)}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${O(`مزامنة معلقة`,`Pending Sync`)}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:``:`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${O(`وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً`,`Offline Mode — all actions stored locally and will auto-sync`)}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${O(`أوفلاين`,`Offline`)}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:``}
    </button>`}if(typeof window<`u`&&!window._darcSyncIndicatorBound){window._darcSyncIndicatorBound=!0;let e=()=>{let e=document.getElementById(`sync-status-indicator`);e&&(e.innerHTML=cn())};window.addEventListener(`darc:queue-change`,e),window.addEventListener(`online`,e),window.addEventListener(`offline`,e)}function B(e,n,i){return`<button class="nav-item ${r.view===e||e===`projects`&&r.view===`project-detail`?`active`:``}" data-view="${e}">${A(i,17)}<span>${n}</span></button>`}function V(){if(R(r.view)||(r.view=z()),typeof window<`u`){let e=window.location.hash.replace(/^#/,``);if(!e||e===`login`||e===`forgot`){let e=r.view;r.view===`project-detail`&&r.activeProjectId&&(e=`project-detail?id=${encodeURIComponent(r.activeProjectId)}${r.projectTab?`&tab=${encodeURIComponent(r.projectTab)}`:``}`),window._isInternalNav=!0,window.history&&window.history.replaceState?window.history.replaceState(null,``,`#${e}`):window.location.hash=`#${e}`}}document.body.classList.add(`in-app`),document.body.classList.toggle(`is-ltr`,r.lang===`en`),document.documentElement.lang=r.lang,document.documentElement.dir=r.lang===`ar`?`rtl`:`ltr`;let e=(r.data?.notifications||[]).filter(e=>!e.read).length,n=r.data?.user||{},i=M()||j(`manage_settings`)||j(`manage_roles`)||j(`manage_users`)||j(`manage_trash`)||j(`view_audit_logs`);document.getElementById(`app`).innerHTML=`
    <div class="app-shell ${r.lang===`en`?`is-ltr`:``}">
      <aside class="sidebar ${r.sidebarOpen?`open`:``}">
        <div class="sidebar-brand">
          ${r.data?.company?.logoUrl?`<img src="${k(r.data.company.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${A(`building`,20)}</span>`:`<span class="brand-mark">${A(`building`,20)}</span>`}
          <div>
            <div class="brand-name">${k(O(r.data?.company?.nameAr||r.data?.company?.name||`DARC Design Team`,r.data?.company?.nameEn||r.data?.company?.name||`DARC Design Team`))}</div>
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
        <div class="nav-title">${i?O(`إدارة النظام`,`ADMIN`):O(`حسابي`,`MY ACCOUNT`)}</div>
        <nav class="nav-list">${B(`settings`,i?D(`settings`):O(`الملف الشخصي والأمان`,`Profile & Security`),`settings`)}</nav>
        <div class="sidebar-bottom">
          <div class="admin-badge">${le(n)}<div class="admin-info"><strong>${k(O(n.name,n.nameEn||n.name))}</strong><span>${k(we(n))}</span></div></div>
          <div class="sidebar-footer"><span>v1.0 · ${O(`نسخة عمل`,`Workspace build`)}</span><button data-action="logout" title="${D(`signOut`)}">${A(`logout`,15)}</button></div>
        </div>
      </aside>
      <section class="workspace">
        <header class="topbar">
          <div class="topbar-left"><button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">${A(`menu`,18)}</button><div><div class="topbar-kicker">DARC / ${D(`workspace`)}</div><div class="topbar-title">${k(De())}</div></div></div>
          <div class="topbar-right">
            <span id="sync-status-indicator">${cn()}</span>
            <button class="topbar-search-trigger" data-action="open-omnisearch" title="${O(`بحث شامل وسريع`,`Omnisearch`)}">
              ${A(`search`,14)}
              <span>${O(`بحث شامل...`,`Search...`)}</span>
              <kbd class="shortcut-kbd">${typeof navigator<`u`&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?`⌘K`:`Ctrl+K`}</kbd>
            </button>
            <button class="icon-button" data-action="open-cheatsheet" title="${O(`دليل اختصارات لوحة المفاتيح (?)`,`Keyboard shortcuts guide (?)`)}" style="color:var(--ink-soft);" aria-label="Shortcuts">
              <kbd class="shortcut-kbd" style="font-size:12px;padding:2px 7px;font-weight:bold;">?</kbd>
            </button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-theme">${r.theme===`dark`?`☀️`:`🌙`}</button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-lang">${r.lang===`ar`?`EN`:`عربي`} ${A(`globe`,14)}</button>
            <button class="icon-button" data-action="show-notifications" aria-label="${D(`notifications`)}">${A(`bell`,17)}${e?`<span class="notification-dot"></span>`:``}</button>
            <div class="topbar-divider"></div>
            <div class="profile-chip">${le(n)}<div class="profile-chip-text"><strong>${k(O(n.name,n.nameEn||n.name))}</strong><span>${k(we(n))}</span></div></div>
          </div>
        </header>
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,H()}function H(){let e=document.getElementById(`main-content`);if(!e)return;R(r.view)||(r.view=z());let n=``;r.view===`dashboard`&&(n=renderDashboard()),r.view===`projects`&&(n=renderProjects()),r.view===`tasks`&&(n=renderTasks()),r.view===`documents`&&(n=renderDocuments()),r.view===`templates`&&(n=renderTemplates()),r.view===`team`&&(n=renderTeam()),r.view===`reports`&&(n=renderReports()),r.view===`settings`&&(n=renderSettings()),r.view===`project-detail`&&(n=renderProjectDetail()),e.innerHTML=n,r.view===`project-detail`&&r.projectTab===`timeline`&&setTimeout(drawTimelineArrows,0)}function U(e,n=void 0){R(e)||(e=z()),r.view=e,n!==void 0&&(r.activeProjectId=n),r.sidebarOpen=!1,document.querySelector(`.sidebar`)?.classList.remove(`open`),document.querySelectorAll(`.nav-item`).forEach(n=>{let r=n.dataset.view,i=r===e||r===`projects`&&e===`project-detail`;n.classList.toggle(`active`,i)});let i=document.querySelector(`.topbar-title`);i&&(i.textContent=De());try{let n=e;e===`project-detail`&&r.activeProjectId&&(n=`project-detail?id=${encodeURIComponent(r.activeProjectId)}${r.projectTab?`&tab=${encodeURIComponent(r.projectTab)}`:``}`),typeof window<`u`&&window.location.hash.replace(/^#/,``)!==n&&(window._isInternalNav=!0,window.location.hash=n),typeof sessionStorage<`u`&&sessionStorage.setItem(`darc_last_route`,JSON.stringify({view:r.view,activeProjectId:r.activeProjectId,projectTab:r.projectTab}))}catch{}requestAnimationFrame(()=>{H();let e=document.getElementById(`main-content`);e&&(e.scrollTop=0,e.scrollLeft=0),typeof window<`u`&&window.scrollTo(0,0)})}async function W(e=!1){try{await ln(e)}catch(e){showToast(e.message,!0)}}async function ln(e=!1){try{let n=await P(`/api/bootstrap`,{silent:e});if(n===null){if(r.data)return;let e=await v();if(n=e&&e.user?e:await P(`/api/bootstrap`,{silent:!1,headers:{"Cache-Control":`no-cache, no-store`}}),!n)return}if(g(n),r.isOffline=!1,r.data?.tasks&&n?.tasks){let e=Date.now(),i=new Set(n.tasks.map(e=>e.id));for(let a of r.data.tasks)i.has(a.id)||e-(a.createdAt?new Date(a.createdAt).getTime():e)<12e4&&(n.tasks.unshift(a),i.add(a.id))}if(r.data?.projects&&n?.projects){let e=Date.now(),i=new Set(n.projects.map(e=>e.id));for(let a of r.data.projects)i.has(a.id)||e-(a.createdAt?new Date(a.createdAt).getTime():e)<12e4&&(n.projects.unshift(a),i.add(a.id))}let i=!1;if(r.data&&n){if(r.data.updatedAt!==n.updatedAt)i=!0;else if(r.data.tasks?.length!==n.tasks?.length||r.data.projects?.length!==n.projects?.length)i=!0;else{let e=r.data.tasks||[],a=n.tasks||[];for(let n=0;n<a.length;n++){let r=a[n],o=e[n];if(!o||o.id!==r.id||o.status!==r.status||(o.sortOrder||o.sort_order)!==(r.sortOrder||r.sort_order)||o.progress!==r.progress){i=!0;break}}if(!i){let e=r.data.projects||[],a=n.projects||[];for(let n=0;n<a.length;n++){let r=a[n],o=e[n];if(!o||o.id!==r.id||o.lifecycle!==r.lifecycle||o.health!==r.health||o.progress!==r.progress){i=!0;break}}}}}if(!r.data||i||r.data.comments?.length!==n.comments?.length||r.data.documents?.length!==n.documents?.length||r.data.users?.length!==n.users?.length||r.data.auditLogs?.length!==n.auditLogs?.length||r.data.notifications?.length!==n.notifications?.length){r.data=n,R(r.view)||(r.view=z());let i=!!document.getElementById(`modal-root`)?.children?.length,a=!!(document.querySelector(`.is-dragging`)||document.querySelector(`.touch-dragging`)||document.querySelector(`.drag-placeholder`)),o=!!(document.activeElement&&[`INPUT`,`TEXTAREA`].includes(document.activeElement.tagName)&&document.getElementById(`main-content`)?.contains(document.activeElement));if(e&&(a||o))return;requestAnimationFrame(!e&&!i?()=>V():()=>H())}else r.data=n,R(r.view)||(r.view=z(),requestAnimationFrame(()=>H()))}catch(n){if(n&&(n.status===401||n.status===403))throw n;let i=await v();if(i){r.data=i,R(r.view)||(r.view=z()),r.isOffline=!0;let n=!!document.getElementById(`modal-root`)?.children?.length;!e&&!n?V():H();return}throw n}}var un=typeof navigator<`u`&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?`⌘K`:`Ctrl+K`,G=0,K=[];function dn(){let e=document.getElementById(`omnisearch-modal`);e&&e.remove(),document.body.style.overflow=`hidden`;let n=O(`ابحث في المشاريع، المهام، والأعضاء... (${un})`,`Search projects, tasks, team... (${un})`),r=`
    <div id="omnisearch-modal" class="omnisearch-backdrop">
      <div class="omnisearch-box">
        <div class="omnisearch-input-wrap">
          <span style="color:var(--teal);display:flex;">${A(`search`,18)}</span>
          <input 
            id="omnisearch-input" 
            type="text" 
            autocomplete="off" 
            placeholder="${k(n)}" 
            onfocus="this.placeholder=''" 
            onblur="if(!this.value) this.placeholder='${k(n)}'"
          />
          <button class="btn btn-ghost btn-sm" data-action="close-omnisearch" style="padding:4px 8px;">
            <kbd class="shortcut-kbd">ESC</kbd>
          </button>
        </div>
        <div id="omnisearch-results-container" class="omnisearch-results">
          ${hn(``)}
        </div>
        <div class="omnisearch-foot">
          <div class="omni-shortcuts-hint">
            <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd> ${O(`للتنقل`,`to navigate`)}</span>
            <span><kbd class="shortcut-kbd">↵</kbd> ${O(`للاختيار`,`to select`)}</span>
            <span><kbd class="shortcut-kbd">ESC</kbd> ${O(`للإغلاق`,`to close`)}</span>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="open-cheatsheet" style="font-size:11px;padding:2px 6px;">
            ${A(`sparkles`,12)} ${O(`دليل الاختصارات (?)`,`Shortcuts (?)`)}
          </button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML(`beforeend`,r);let i=document.getElementById(`omnisearch-modal`);i&&i.addEventListener(`click`,e=>{e.target===i&&q()});let a=document.getElementById(`omnisearch-input`);a&&(a.focus(),a.addEventListener(`input`,e=>{G=0;let n=document.getElementById(`omnisearch-results-container`);n&&(n.innerHTML=hn(e.target.value))}),a.addEventListener(`keydown`,fn))}function q(){let e=document.getElementById(`omnisearch-modal`);e&&e.remove(),document.querySelector(`.modal-backdrop`)||(document.body.style.overflow=``)}function fn(e){e.key===`ArrowDown`?(e.preventDefault(),K.length>0&&(G=(G+1)%K.length,pn())):e.key===`ArrowUp`?(e.preventDefault(),K.length>0&&(G=(G-1+K.length)%K.length,pn())):e.key===`Enter`?(e.preventDefault(),K[G]&&mn(K[G])):e.key===`Escape`&&q()}function pn(){document.querySelectorAll(`.omni-item`).forEach((e,n)=>{e.classList.toggle(`selected`,n===G),n===G&&e.scrollIntoView({block:`nearest`})})}function mn(e){if(q(),e.type===`action`){if(e.id===`new-task`){let n=(r.data?.projects||[]).find(e=>e.id===(r.activeProjectId||r.lastActiveProjectId))||(r.data?.projects||[])[0];gt(null,null,e.targetProjectId||n?.id)}else e.id===`new-project`?It():e.id===`cheatsheet`&&gn()}else if(e.type===`project`)r.projectTab=`tasks`,r.lastActiveProjectId=e.id,U(`project-detail`,e.id);else if(e.type===`task`){let n=r.data?.tasks?.find(n=>n.id===e.id);n&&gt(n)}else if(e.type===`user`){let n=r.data?.users?.find(n=>n.id===e.id);n&&typeof window.openUserModal==`function`&&window.openUserModal(n)}}function hn(e){let n=e.trim().toLowerCase(),i=[],a=(r.data?.projects||[]).find(e=>e.id===(r.activeProjectId||r.lastActiveProjectId))||(r.data?.projects||[])[0],o=a?O(a.nameAr,a.nameEn):``,s=[];if((j(`create_tasks`)||M())&&s.push({type:`action`,id:`new-task`,targetProjectId:a?.id,title:O(`إضافة مهمة جديدة`,`Create new task`),sub:a?O(`في مشروع: ${o}`,`In project: ${o}`):O(`إجراء سريع`,`Quick action`),icon:`plus`,keywords:`new task مهمة إضافة عمل جديد`}),(j(`create_projects`)||M())&&s.push({type:`action`,id:`new-project`,title:O(`إنشاء مشروع جديد`,`Create new project`),sub:O(`إجراء سريع`,`Quick action`),icon:`building`,keywords:`new project مشروع إنشاء جديد`}),s.push({type:`action`,id:`cheatsheet`,title:O(`عرض دليل اختصارات لوحة المفاتيح`,`View keyboard shortcuts guide`),sub:O(`مساعدة`,`Help`),icon:`sparkles`,keywords:`shortcuts اختصارات كيبورد مساعدة`}),s.forEach(e=>{(!n||e.keywords.includes(n)||e.title.toLowerCase().includes(n))&&i.push(e)}),(j(`view_projects`)||M())&&(r.data?.projects||[]).forEach(e=>{(!n||`${e.nameAr} ${e.nameEn} ${e.code} ${e.clientAr} ${e.clientEn}`.toLowerCase().includes(n))&&i.push({type:`project`,id:e.id,title:O(e.nameAr,e.nameEn),sub:`${e.code} · ${O(e.clientAr,e.clientEn)||``}`,badge:`${e.progress}%`,icon:`building`})}),R(`tasks`)&&(r.data?.tasks||[]).forEach(e=>{(!n||`${e.titleAr} ${e.titleEn} ${e.categoryAr} ${e.categoryEn}`.toLowerCase().includes(n))&&i.push({type:`task`,id:e.id,title:O(e.titleAr,e.titleEn),sub:e.dueDate?`📅 ${he(e.dueDate)}`:O(e.categoryAr,e.categoryEn)||``,badge:`${e.progress}%`,icon:`checklist`})}),(M()||j(`manage_users`))&&(r.data?.users||[]).forEach(e=>{(!n||`${e.name} ${e.nameEn} ${e.email} ${e.jobTitleAr}`.toLowerCase().includes(n))&&i.push({type:`user`,id:e.id,title:O(e.name,e.nameEn||e.name),sub:e.email||``,badge:we(e),icon:`user`})}),K=i.slice(0,15),!K.length)return`
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${A(`search`,24)}</span>
        <strong style="color:var(--ink);">${O(`لا توجد نتائج مطابقة`,`No matching results`)}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${O(`جرب البحث بكلمات أخرى أو رمز المشروع.`,`Try different keywords or project code.`)}</p>
      </div>
    `;let c=``;return K.map((e,n)=>{let r=``,i=e.type===`action`?O(`إجراءات سريعة`,`Quick Actions`):e.type===`project`?O(`المشاريع`,`Projects`):e.type===`task`?O(`المهام والمخرجات`,`Tasks & Deliverables`):O(`فريق العمل`,`Team`);return i!==c&&(c=i,r=`<div class="omni-group-title">${i}</div>`),`
      ${r}
      <div class="omni-item ${n===G?`selected`:``}" data-omni-index="${n}" onclick="window.__selectOmniItem(${n})">
        <div class="omni-item-left">
          <span style="color:var(--teal);display:flex;">${A(e.icon,15)}</span>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <strong style="font-size:13px;">${k(e.title)}</strong>
            ${e.sub?`<span style="font-size:11px;color:var(--muted);">${k(e.sub)}</span>`:``}
          </div>
        </div>
        ${e.badge?`<span class="omni-badge">${k(e.badge)}</span>`:``}
      </div>
    `}).join(``)}window.__selectOmniItem=e=>{K[e]&&mn(K[e])};function gn(){q();let e=`
    <div style="padding:10px 0;">
      <p style="color:var(--ink-soft);font-size:13px;margin-top:0;">${O(`استخدم هذه الاختصارات لزيادة سرعة عملك داخل النظام بدون لمس الفأرة:`,`Use these shortcuts to navigate the workspace at full speed without a mouse:`)}</p>
      
      <div class="cheatsheet-grid">
        <div class="cheatsheet-row">
          <span>${O(`البحث الشامل والأوامر السريعة`,`Omnisearch & Quick Commands`)}</span>
          <kbd class="shortcut-kbd">${un}</kbd>
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
  `;document.getElementById(`modal-root`).innerHTML=ae(O(`دليل اختصارات لوحة المفاتيح`,`Keyboard Shortcuts Guide`),O(`طرق سريعة للتنقل وإنجاز العمل بكفاءة عالية`,`Work faster with productivity hotkeys`),e,`cheatsheet`)}function _n(){window.addEventListener(`keydown`,e=>{let n=document.activeElement,i=n&&(n.tagName===`INPUT`||n.tagName===`TEXTAREA`||n.tagName===`SELECT`||n.isContentEditable),a=e.code===`KeyK`||e.key?.toLowerCase()===`k`||e.key===`ن`;(e.metaKey||e.ctrlKey)&&a?(e.preventDefault(),document.getElementById(`omnisearch-modal`)?q():dn()):(e.key===`?`||e.key===`؟`||e.code===`Slash`&&e.shiftKey)&&!i?(e.preventDefault(),gn()):(e.code===`KeyN`||e.key?.toLowerCase()===`n`||e.key===`ى`)&&!i&&!e.metaKey&&!e.ctrlKey&&!e.altKey?(e.preventDefault(),gt(null,null,r.view===`project-detail`&&r.activeProjectId?r.activeProjectId:r.data?.projects?.[0]?.id)):(e.code===`KeyP`||e.key?.toLowerCase()===`p`||e.key===`ح`)&&!i&&!e.metaKey&&!e.ctrlKey&&!e.altKey?(e.preventDefault(),It()):e.key===`Escape`&&document.getElementById(`omnisearch-modal`)&&(e.preventDefault(),q())})}var vn=n({getOrCreateFloatingUploadWidget:()=>On,handleChange:()=>Cn,handleClick:()=>bn,handleInput:()=>Sn,handleSubmit:()=>yn,init:()=>jn,updateFloatingUploadWidget:()=>J,uploadDirectFiles:()=>An,uploadTaskFiles:()=>kn});async function yn(e){let n=e.target;if(![`project-form`,`task-form`,`user-form`,`role-form`,`activation-form`,`task-comment-form`,`template-form`,`force-password-form`].includes(n.id)&&!n.dataset.action)return;e.preventDefault();let i=Object.fromEntries(new FormData(n).entries()),a=n.querySelector(`button[type="submit"]`);a&&(a.disabled=!0,a.classList.add(`is-loading`));try{if(n.id===`activation-form`){if(i.password!==i.passwordConfirm)throw Error(choose(`كلمتا المرور غير متطابقتين.`,`Passwords do not match.`));delete i.passwordConfirm,await P(`/api/auth/activate`,{method:`POST`,body:JSON.stringify(i)}),window.history.replaceState({},``,window.location.pathname),await loadData();return}if(n.id===`project-form`){i.startDate||=null,i.dueDate||=null,i.managerId||=null;let e=[];try{i.memberIds&&(e=JSON.parse(i.memberIds))}catch{}i.managerId&&!e.includes(i.managerId)&&e.push(i.managerId),i.memberIds=e;let a=!!n.dataset.projectId,o=await P(a?`/api/projects/${n.dataset.projectId}`:`/api/projects`,{method:a?`PATCH`:`POST`,body:JSON.stringify(i)});if(o.project){if(r.data.projects||(r.data.projects=[]),a){let e=r.data.projects.findIndex(e=>e.id===o.project.id);e!==-1&&(r.data.projects[e]={...r.data.projects[e],...o.project})}else r.data.projects.unshift(o.project)}closeModal(),H(),showToast(choose(`تم حفظ المشروع.`,`Project saved.`));return}if(n.id===`task-form`){let e=n.dataset.taskId;i.remindAt,delete i.remindAt,i.templateId=i.templateId||null,i.typeAr=i.typeAr||(i.templateId?`مخطط`:null),i.typeEn=i.typeEn||(i.templateId?`Drawing`:null),i.startDate||=null,i.dueDate||=null,i.assigneeId||=null,i.reviewerId||=null;let a=[];try{a=JSON.parse(i.additionalAssignees||`[]`)}catch{a=[...n.querySelectorAll(`select[name="additionalAssignees"] option:checked`)].map(e=>e.value)}let o=[];try{o=JSON.parse(i.externalAssignees||`[]`)}catch{let e=String(i.externalAssignees||``).trim();o=e?e.split(/[,،]+/).map(e=>e.trim()).filter(Boolean):[]}let s=[];try{s=JSON.parse(i.remindersJson||`[]`)}catch{s=[]}delete i.additionalAssignees,delete i.externalAssignees,delete i.remindersJson,delete i.dependencies,delete i.weight,delete i.progress,i.customFields={additional_assignees:a,external_assignees:o,reminders:s},i.projectId||=r.activeProjectId||r.data.projects?.[0]?.id;let c=!!e,l=await P(c?`/api/tasks/${e}`:`/api/tasks`,{method:c?`PATCH`:`POST`,body:JSON.stringify(i)});if(l.task){if(r.data.tasks||(r.data.tasks=[]),c){let e=r.data.tasks.findIndex(e=>e.id===l.task.id);e!==-1&&(r.data.tasks[e]={...r.data.tasks[e],...l.task})}else r.data.tasks.unshift(l.task),r.view===`tasks`&&(r.taskProjectFilter!==`all`&&r.taskProjectFilter!==l.task.projectId&&(r.taskProjectFilter=l.task.projectId),r.taskFilter===`mine`&&l.task.assigneeId!==r.data.user?.id&&(r.taskFilter=`all`));if(Array.isArray(s)&&s.length>0)for(let e of s)(!e.id||e.id.startsWith(`rem_temp_`))&&P(`/api/reminders`,{method:`POST`,body:JSON.stringify({taskId:l.task.id,remindAt:new Date(e.remindAt).toISOString(),noteAr:e.noteAr||i.titleAr||`تذكير لمتابعة المهمة`})}).catch(e=>console.warn(`[Reminder dispatch note]`,e))}closeModal(),H(),showToast(choose(`تم حفظ المهمة بنجاح.`,`Task saved successfully.`));return}if(n.id===`task-comment-form`){let e=n.dataset.taskId,o=await P(`/api/tasks/${e}/comments`,{method:`POST`,body:JSON.stringify(i)});n.reset(),o.comment&&(r.data.comments||(r.data.comments=[]),r.data.comments.push(o.comment));let s=r.data.tasks.find(n=>n.id===e),c=document.getElementById(`task-comments-list`);c&&(c.innerHTML=renderTaskComments(s),c.scrollTop=c.scrollHeight),a&&(a.disabled=!1);return}if(n.id===`force-password-form`){let e=n.dataset.userId,o=n.dataset.isPending===`true`;await P(`/api/users/${e}/force-password`,{method:`POST`,body:JSON.stringify(i)});let s=r.data.users.find(n=>n.id===e);s&&(s.status=`active`),closeModal(),H(),showToast(o?choose(`تم تفعيل الحساب بنجاح.`,`Account activated successfully.`):choose(`تم تغيير كلمة المرور وطرد المستخدم بنجاح.`,`Password changed and user kicked successfully.`)),a&&(a.disabled=!1);return}if(n.id===`user-form`){let e=n.dataset.userId,a=!!e,o=await P(a?`/api/users/${e}`:`/api/users`,{method:a?`PATCH`:`POST`,body:JSON.stringify(i)});if(o.user){if(r.data.users||(r.data.users=[]),a){let e=r.data.users.findIndex(e=>e.id===o.user.id);e!==-1&&(r.data.users[e]={...r.data.users[e],...o.user})}else r.data.users.unshift(o.user)}closeModal(),H(),showToast(choose(`تم حفظ حساب العضو.`,`Member account saved.`));return}if(n.id===`role-form`){let e=n.dataset.roleId,a=[...n.querySelectorAll(`input[name="permissions"]:checked`)].map(e=>e.value),o=!!e,s=await P(o?`/api/roles/${e}`:`/api/roles`,{method:o?`PATCH`:`POST`,body:JSON.stringify({...i,permissions:a})});if(s.role){if(r.data.roles||(r.data.roles=[]),o){let e=r.data.roles.findIndex(e=>e.id===s.role.id);e!==-1&&(r.data.roles[e]={...r.data.roles[e],...s.role})}else r.data.roles.push(s.role)}closeModal(),H(),showToast(choose(`تم حفظ الدور بنجاح.`,`Role saved.`));return}if(n.id===`template-form`){let e=n.dataset.templateId,a=!!e,o=await P(a?`/api/templates/${e}`:`/api/templates`,{method:a?`PATCH`:`POST`,body:JSON.stringify(i)});if(o.template){if(r.data.templates||(r.data.templates=[]),a){let e=r.data.templates.findIndex(e=>e.id===o.template.id);e!==-1&&(r.data.templates[e]={...r.data.templates[e],...o.template})}else r.data.templates.push(o.template)}closeModal(),H(),showToast(choose(`تم حفظ القالب بنجاح.`,`Template saved.`));return}if(n.dataset.action===`update-profile`){if(i.calendarSystem){r.calendarSystem=i.calendarSystem;try{localStorage.setItem(`darc_calendar_system`,i.calendarSystem)}catch{}}let e=await P(`/api/users/me`,{method:`PATCH`,body:JSON.stringify(i)});if(e.user){r.data.user={...r.data.user,...e.user};let n=(r.data.users||[]).findIndex(e=>e.id===r.data.user.id);n!==-1&&(r.data.users[n]={...r.data.users[n],...e.user})}H(),showToast(choose(`تم حفظ وتحديث الملف الشخصي بنجاح.`,`Profile updated successfully.`)),a&&(a.disabled=!1);return}if(n.dataset.action===`update-company`){let e=await P(`/api/company`,{method:`PATCH`,body:JSON.stringify(i)});e.company&&(r.data.company={...r.data.company,...e.company}),H(),showToast(choose(`تم تحديث بيانات الشركة.`,`Company data updated.`)),a&&(a.disabled=!1);return}if(n.dataset.action===`change-password`){if(i.newPassword.length<10)throw Error(choose(`كلمة المرور يجب أن تكون 10 أحرف على الأقل.`,`Password must be at least 10 characters.`));await P(`/api/auth/change-password`,{method:`POST`,body:JSON.stringify(i)}),n.reset(),showToast(choose(`تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.`,`Password changed successfully. Signed out of other devices.`)),a&&(a.disabled=!1);return}}catch(e){n.id===`activation-form`?renderActivation(i.token,e.message):showToast(e.message,!0)}finally{a&&(a.disabled=!1,a.classList.remove(`is-loading`))}}async function bn(e){let n=document.getElementById(`mention-dropdown`),i=document.getElementById(`project-menu`);if(n&&!e.target.closest(`#mention-dropdown`)&&!e.target.closest(`input[name="content"]`)&&(n.style.display=`none`),i&&!e.target.closest(`#project-menu`)&&!e.target.closest(`[data-action="toggle-project-menu"]`)&&(i.style.display=`none`),e.target.classList.contains(`modal-backdrop`)){closeModal();return}if(e.target.closest(`#task-dropzone`)&&e.target.id!==`task-upload-input`){let e=document.getElementById(`upload-progress-container`);if(!e||e.style.display===`none`){let e=document.getElementById(`task-upload-input`);e&&e.click()}return}let a=e.target.closest(`[data-action], [data-view]`);if(!a)return;let o=a.dataset.action;if(a.classList.contains(`menu-item`)){let e=a.closest(`.dropdown-menu`);e&&(e.style.display=`none`)}if(a.dataset.view)U(a.dataset.view,a.dataset.projectId||void 0);else if(o===`trigger-avatar-upload`){let e=document.getElementById(`user-avatar-file-input`);e&&e.click()}else if(o===`trigger-company-logo-upload`){let e=document.getElementById(`company-logo-file-input`);e&&e.click()}else if(o===`toggle-theme`){r.theme=r.theme===`dark`?`light`:`dark`,window.localStorage.setItem(`darc-theme`,r.theme),document.documentElement.dataset.theme=r.theme;let e=document.querySelector(`[data-action="toggle-theme"]`);e&&(e.textContent=r.theme===`dark`?`☀️`:`🌙`)}else if(o===`toggle-lang`){if(r.lang=r.lang===`ar`?`en`:`ar`,window.localStorage.setItem(`darc-locale`,r.lang),document.documentElement.lang=r.lang,document.documentElement.dir=r.lang===`ar`?`rtl`:`ltr`,document.body.classList.toggle(`is-ltr`,r.lang===`en`),r.data)V();else{let e=new URLSearchParams(window.location.hash.replace(/^#/,``));e.get(`activate`)?renderActivation(e.get(`activate`)):e.get(`reset`)?renderResetPassword(e.get(`reset`)):renderLogin(``,document.getElementById(`forgot-form`)?`forgot`:`login`)}}else if(o===`quick-fill-login`){let e=a.closest(`[data-action="quick-fill-login"]`),n=document.getElementById(`login-email`),r=document.getElementById(`login-password`);n&&e?.dataset?.email&&(n.value=e.dataset.email),r&&e?.dataset?.pass&&(r.value=e.dataset.pass)}else if(o===`goto-forgot`)e.preventDefault(),typeof history<`u`&&history.replaceState&&history.replaceState(null,``,`#forgot`),renderLogin(``,`forgot`);else if(o===`goto-login`)e.preventDefault(),typeof history<`u`&&history.replaceState&&history.replaceState(null,``,`#login`),renderLogin();else if(o===`toggle-sidebar`)r.sidebarOpen=!r.sidebarOpen,document.querySelector(`.sidebar`)?.classList.toggle(`open`,r.sidebarOpen);else if(o===`logout`){await P(`/api/auth/logout`,{method:`POST`}).catch(()=>{});try{typeof localStorage<`u`&&localStorage.removeItem(`darc_token`),await y()}catch{try{localStorage.removeItem(`darc_token`),localStorage.removeItem(`darc_offline_bootstrap`),localStorage.removeItem(`darc_offline_queue`)}catch{}}je(),r.data=null,r.view=`login`,typeof history<`u`&&history.replaceState?history.replaceState(null,``,`#login`):typeof window<`u`&&(window.location.hash=`#login`),renderLogin()}else if(o===`logout-all`){await P(`/api/auth/logout-all`,{method:`POST`}).catch(()=>{});try{typeof localStorage<`u`&&localStorage.removeItem(`darc_token`),await y()}catch{try{localStorage.removeItem(`darc_token`),localStorage.removeItem(`darc_offline_bootstrap`),localStorage.removeItem(`darc_offline_queue`)}catch{}}je(),r.data=null,r.view=`login`,typeof history<`u`&&history.replaceState?history.replaceState(null,``,`#login`):typeof window<`u`&&(window.location.hash=`#login`),renderLogin()}else if(o===`open-omnisearch`)dn();else if(o===`close-omnisearch`)q();else if(o===`open-cheatsheet`)gn();else if(o===`close-modal`)closeModal();else if(o===`show-notifications`)showNotifications();else if(o===`read-notification`){let e=a.dataset.notificationId,n=(r.data?.notifications||[]).find(n=>n.id===e);try{if(await P(`/api/notifications/${e}`,{method:`PATCH`,body:JSON.stringify({})}),n&&(n.read=!0),closeModal(),n?.taskId){let e=(r.data?.tasks||[]).find(e=>e.id===n.taskId);if(e){openTaskModal(e);return}}if(n?.projectId){U(`project-detail`,n.projectId);return}await W()}catch(e){showToast(e.message,!0)}}else if(o===`mark-all-notifications-read`)try{await P(`/api/notifications/read-all`,{method:`POST`}),(r.data?.notifications||[]).forEach(e=>{e.read=!0,e.readAt=new Date().toISOString()}),showNotifications(),V(),showToast(choose(`تم تحديد كافة التنبيهات كمقروءة.`,`All notifications marked as read.`))}catch(e){showToast(e.message,!0)}else if(o===`toggle-project-menu`)i&&(i.style.display=i.style.display===`none`?`block`:`none`);else if(o===`preview-doc`){let e=a.dataset.docId||a.closest(`[data-doc-id]`)?.dataset.docId;e&&bt(e)}else if(o===`copy-doc-link`){let e=a.dataset.docId||a.closest(`[data-doc-id]`)?.dataset.docId,n=r.data?.documents?.find(n=>n.id===e);if(n){let e=n.viewLink||n.downloadLink||(n.driveFileId?`https://drive.google.com/file/d/${n.driveFileId}/view`:``);if((!e||e.startsWith(`file://`)||e.startsWith(`/`))&&(e=`${window.location.origin}/api/documents/${n.id}`),e)try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(e);else{let n=document.createElement(`textarea`);n.value=e,document.body.appendChild(n),n.select(),document.execCommand(`copy`),n.remove()}showToast(choose(`تم نسخ رابط الملف إلى الحافظة بنجاح.`,`Document link copied to clipboard.`))}catch{window.prompt(choose(`انسخ رابط الملف من هنا:`,`Copy document link:`),e)}else showToast(choose(`لا يوجد رابط متاح لهذا الملف.`,`No link available for this document.`),!0)}}else if(o===`trigger-upload`){let e=document.getElementById(`upload-progress-container`);if(!e||e.style.display===`none`){let e=document.getElementById(`task-upload-input`);e&&e.click()}}else if(o===`open-upload-drawing-modal`)typeof openUploadDrawingModal==`function`?openUploadDrawingModal(a.dataset.projectId||null):typeof window.openUploadDrawingModal==`function`&&window.openUploadDrawingModal(a.dataset.projectId||null);else if(o===`new-project`)openProjectModal();else if(o===`edit-project`){let e=r.data.projects.find(e=>e.id===a.dataset.projectId);e&&openProjectModal(e)}else if(o===`clone-project`){let e=r.data.projects.find(e=>e.id===a.dataset.projectId);e&&openCloneModal(e)}else if(o===`rename-doc`){let e=a.dataset.docId,n=r.data?.documents?.find(n=>n.id===e);if(!n)return;let i=window.prompt(choose(`أدخل الاسم الجديد:`,`Enter new name:`),n.originalName);if(!i||i===n.originalName)return;try{await P(`/api/documents/${e}`,{method:`PATCH`,body:JSON.stringify({originalName:i})}),n.originalName=i,await W(!0);let a=r.data?.tasks?.find(e=>e.id===n.taskId);if(a){let e=document.getElementById(`task-documents-list`);e&&(e.innerHTML=yt(a))}}catch(e){showToast(e.message,!0)}}else if(o===`go-to-trash`)r.settingsSection=`trash`,r.trashLoaded=!1,U(`settings`);else if(o===`delete-doc`){if(!window.confirm(choose(`هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.`,`Are you sure you want to move this document to trash? You can restore it within 30 days.`)))return;let e=a.dataset.docId,n=r.data?.documents?.find(n=>n.id===e)?.taskId;try{if(await P(`/api/documents/${e}`,{method:`DELETE`}),r.data?.documents&&(r.data.documents=r.data.documents.filter(n=>n.id!==e)),r.trashLoaded=!1,await W(!0),showToast(choose(`تم نقل المستند إلى سلة المهملات بنجاح.`,`Document moved to trash successfully.`)),n){let e=r.data?.tasks?.find(e=>e.id===n);if(e){let n=document.getElementById(`task-documents-list`);n&&(n.innerHTML=yt(e))}}}catch(e){showToast(e.message,!0)}}else if(o===`delete-project`){if(!window.confirm(choose(`هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.`,`Are you sure you want to delete this project? It will be archived.`)))return;let e=[...r.data.projects||[]];r.data.projects=r.data.projects.filter(e=>e.id!==a.dataset.projectId),closeModal(),U(`projects`),showToast(choose(`جاري حذف المشروع...`,`Deleting project...`));try{await P(`/api/projects/${a.dataset.projectId}`,{method:`DELETE`}),r.trashLoaded=!1,typeof navigator<`u`&&navigator.onLine&&await W(!0),showToast(choose(`تم حذف المشروع بنجاح.`,`Project deleted successfully.`))}catch(n){r.data.projects=e,H(),showToast(n.message,!0)}}else if(o===`delete-task`){if(!window.confirm(choose(`هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.`,`Are you sure you want to delete this task? It will be moved to trash.`)))return;let e=a.dataset.taskId,n=[...r.data.tasks||[]];r.data.tasks=r.data.tasks.filter(n=>n.id!==e),closeModal(),H(),showToast(choose(`جاري حذف المهمة...`,`Deleting task...`));try{await P(`/api/tasks/${e}`,{method:`DELETE`}),r.trashLoaded=!1,typeof navigator<`u`&&navigator.onLine&&await W(!0),showToast(choose(`تم حذف المهمة بنجاح.`,`Task deleted successfully.`))}catch(e){r.data.tasks=n,H(),showToast(e.message,!0)}}else if(o===`edit-task-comment`){let e=a.dataset.commentId,n=a.dataset.taskId,i=(r.data.comments||[]).find(n=>n.id===e);if(!i)return;let o=window.prompt(choose(`تعديل التعليق:`,`Edit comment:`),i.content);if(o===null)return;let s=o.trim();if(!s){showToast(choose(`لا يمكن ترك التعليق فارغاً.`,`Comment cannot be empty.`),!0);return}if(s===i.content)return;try{let i=await P(`/api/tasks/${n}/comments/${e}`,{method:`PATCH`,body:JSON.stringify({content:s})});if(i.comment){let a=(r.data.comments||[]).findIndex(n=>n.id===e);a!==-1&&(r.data.comments[a]=i.comment);let o=(r.data.tasks||[]).find(e=>e.id===n),s=document.getElementById(`task-comments-list`);s&&o&&(s.innerHTML=renderTaskComments(o)),showToast(choose(`تم تعديل التعليق بنجاح.`,`Comment updated successfully.`))}}catch(e){showToast(e.message,!0)}}else if(o===`delete-task-comment`){let e=a.dataset.commentId,n=a.dataset.taskId;if(!window.confirm(choose(`هل أنت متأكد من حذف هذا التعليق؟`,`Are you sure you want to delete this comment?`)))return;try{await P(`/api/tasks/${n}/comments/${e}`,{method:`DELETE`}),r.data.comments&&(r.data.comments=r.data.comments.filter(n=>n.id!==e));let i=(r.data.tasks||[]).find(e=>e.id===n),a=document.getElementById(`task-comments-list`);a&&i&&(a.innerHTML=renderTaskComments(i)),showToast(choose(`تم حذف التعليق بنجاح.`,`Comment deleted successfully.`))}catch(e){showToast(e.message,!0)}}else if(o===`manual-sync`){if(typeof navigator<`u`&&!navigator.onLine){showToast(choose(`أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡`,`You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡`),!1);return}let e=C();if(!e.length){showToast(choose(`جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️`,`All data is completely synchronized with cloud server ✔️`),!1);return}showToast(choose(`جاري مزامنة ${e.length} عمليات معلقة مع السيرفر...`,`Syncing ${e.length} pending actions with server...`),!1);let n=await ee(P);n.synced>0?(showToast(choose(`تمت مزامنة ${n.synced} عمليات بنجاح! 🚀`,`Successfully synced ${n.synced} actions! 🚀`),!1),await loadData()):n.failed>0&&showToast(choose(`فشلت مزامنة ${n.failed} عمليات، يرجى المحاولة لاحقاً.`,`Failed to sync ${n.failed} actions, please try again.`),!0)}else if(o===`new-task`)openTaskModal(null,null,a.dataset.projectId);else if(o===`new-user`)openUserModal();else if(o===`new-role`)openRoleModal();else if(o===`new-template`)openTemplateModal();else if(o===`edit-template`){let e=r.data.templates.find(e=>e.id===a.dataset.templateId);e&&openTemplateModal(e)}else if(o===`delete-template`){if(!window.confirm(choose(`هل أنت متأكد من حذف هذا القالب؟`,`Are you sure you want to delete this template?`)))return;let e=[...r.data.templates||[]];r.data.templates=r.data.templates.filter(e=>e.id!==a.dataset.templateId),H(),closeModal();try{await P(`/api/templates/${a.dataset.templateId}`,{method:`DELETE`}),await W(!0),showToast(choose(`تم حذف القالب.`,`Template deleted.`))}catch(n){r.data.templates=e,H(),showToast(n.message,!0)}}else if(o===`open-project`)r.projectTab=`tasks`,r.projectMemberFilter=null,U(`project-detail`,a.dataset.projectId);else if(o===`filter-by-member`){let e=a.dataset.memberId;r.projectMemberFilter=r.projectMemberFilter===e?null:e,r.projectTab=`tasks`,requestAnimationFrame(()=>H())}else if(o===`clear-member-filter`)r.projectMemberFilter=null,requestAnimationFrame(()=>H());else if(o===`back-to-projects`)r.projectMemberFilter=null,U(`projects`,null);else if(o===`project-tab`){r.projectTab=a.dataset.tab,a.closest(`.detail-tabs`)?.querySelectorAll(`.detail-tab`).forEach(e=>e.classList.toggle(`active`,e===a));let e=document.getElementById(`main-content`);e&&(e.scrollTop=0),requestAnimationFrame(()=>H())}else if(o===`toggle-timeline-view`)r.timelineView=a.dataset.viewMode||`gantt`,requestAnimationFrame(()=>H());else if(o===`prev-calendar-month`){let e=r.calendarDate?new Date(r.calendarDate):new Date;e.setMonth(e.getMonth()-1),r.calendarDate=e,requestAnimationFrame(()=>H())}else if(o===`next-calendar-month`){let e=r.calendarDate?new Date(r.calendarDate):new Date;e.setMonth(e.getMonth()+1),r.calendarDate=e,requestAnimationFrame(()=>H())}else if(o===`today-calendar-month`)r.calendarDate=new Date,requestAnimationFrame(()=>H());else if(o===`open-task`){if(window._justDroppedAt&&Date.now()-window._justDroppedAt<250)return;let e=r.data.tasks.find(e=>e.id===a.dataset.taskId);e&&openTaskModal(e)}else if(o===`task-filter`)r.taskFilter=a.dataset.filter,a.closest(`.view-toolbar-start`)?.querySelectorAll(`.filter-tab`).forEach(e=>e.classList.toggle(`active`,e===a)),requestAnimationFrame(()=>H());else if(o===`template-category`)r.templateCategory=a.dataset.category,requestAnimationFrame(()=>H());else if(o===`use-template`){if(!r.data.projects.length)return showToast(t(`noProjects`),!0);openTaskModal(null,a.dataset.templateId,r.activeProjectId)}else if(o===`open-user`){let e=r.data.users.find(e=>e.id===a.dataset.userId);e&&openUserModal(e)}else if(o===`impersonate-user`){if(!window.confirm(`هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً.`))return;try{let e=await P(`/api/users/${a.dataset.userId}/impersonate`,{method:`POST`});e&&e.token&&typeof localStorage<`u`&&localStorage.setItem(`darc_token`,e.token),window.location.reload()}catch(e){showToast(e.message,!0)}}else if(o===`force-password-user`){let e=r.data.users.find(e=>e.id===a.dataset.userId);e&&openForcePasswordModal(e)}else if(o===`invite-user`)try{let e=await P(`/api/users/${a.dataset.userId}/invite`,{method:`POST`});await W(),showToast(e.emailConfigured?choose(`تم إرسال الدعوة.`,`Invitation sent.`):choose(`تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.`,`Invite prepared, but the email provider is not configured.`))}catch(e){showToast(e.message,!0)}else if(o===`deactivate-user`){if(!window.confirm(t(`confirmDeactivate`)))return;let e=a.dataset.userId,n=r.data.users.find(n=>n.id===e),i=n?n.status:null;n&&(n.status=`inactive`),H(),closeModal();try{await P(`/api/users/${e}`,{method:`DELETE`}),await W(!0),showToast(choose(`تم تعطيل الحساب.`,`Account deactivated.`))}catch(e){n&&(n.status=i),H(),showToast(e.message,!0)}}else if(o===`settings-section`)r.settingsSection=a.dataset.section,a.closest(`.settings-nav`)?.querySelectorAll(`.settings-nav-item`).forEach(e=>e.classList.toggle(`active`,e===a)),r.settingsSection===`trash`&&!r.trashLoaded&&P(`/api/trash`).then(e=>{r.trash=Array.isArray(e)?e:e.trash||[...(e.projects||[]).map(e=>({...e,type:`project`})),...(e.tasks||[]).map(e=>({...e,type:`task`})),...(e.documents||[]).map(e=>({...e,type:`document`}))],r.trashLoaded=!0,H()}).catch(e=>console.error(e)),requestAnimationFrame(()=>H());else if(o===`restore-item`)try{await P(`/api/restore/${a.dataset.type}/${a.dataset.id}`,{method:`POST`});let e=await P(`/api/trash`);r.trash=Array.isArray(e)?e:e.trash||[...(e.projects||[]).map(e=>({...e,type:`project`})),...(e.tasks||[]).map(e=>({...e,type:`task`})),...(e.documents||[]).map(e=>({...e,type:`document`}))],await W(),showToast(choose(`تمت الاستعادة بنجاح.`,`Restored successfully.`))}catch(e){showToast(e.message,!0)}else if(o===`filter-trash`)r.trashFilter=a.dataset.filter,requestAnimationFrame(()=>H());else if(o===`purge-trash-item`){let e=a.dataset.type,n=a.dataset.id;if(!window.confirm(choose(`هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.`,`Are you sure you want to permanently delete this item? This action cannot be undone.`)))return;try{await P(`/api/trash/${e}/${n}`,{method:`DELETE`});let i=await P(`/api/trash`);r.trash=Array.isArray(i)?i:i.trash||[...(i.projects||[]).map(e=>({...e,type:`project`})),...(i.tasks||[]).map(e=>({...e,type:`task`})),...(i.documents||[]).map(e=>({...e,type:`document`}))],H(),showToast(choose(`تم حذف العنصر نهائياً بنجاح.`,`Item permanently deleted.`))}catch(e){showToast(e.message,!0)}}else if(o===`empty-trash`){if(!window.confirm(choose(`هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.`,`Are you sure you want to empty the entire recycle bin? All items will be permanently erased.`)))return;try{await P(`/api/trash/empty`,{method:`DELETE`}),r.trash=[],H(),showToast(choose(`تم إفراغ سلة المهملات بالكامل بنجاح.`,`Trash bin emptied successfully.`))}catch(e){showToast(e.message,!0)}}else if(o===`open-role`){let e=r.data.roles.find(e=>e.id===a.dataset.roleId);e&&openRoleModal(e)}else if(o===`delete-role`){if(!window.confirm(t(`confirmDeleteRole`)))return;let e=a.dataset.roleId,n=[...r.data.roles||[]];r.data.roles=r.data.roles.filter(n=>n.id!==e),H(),closeModal();try{await P(`/api/roles/${e}`,{method:`DELETE`}),await W(!0),showToast(choose(`تم حذف الدور.`,`Role deleted.`))}catch(e){r.data.roles=n,H(),showToast(e.message,!0)}}else if(o===`export-csv`){if(!can(`export_reports`)&&!isAdmin()){showToast(choose(`ليس لديك صلاحية لتصدير التقارير.`,`You do not have permission to export reports.`),!0);return}exportPortfolioXLS()}else if(o===`export-project`){if(!can(`export_reports`)&&!isAdmin()){showToast(choose(`ليس لديك صلاحية لتصدير التقارير.`,`You do not have permission to export reports.`),!0);return}exportProjectXLS(a.dataset.projectId)}}var xn=null;function Sn(e){if(e.target.name===`content`&&e.target.closest(`#task-comment-form`)){let n=e.target.value,i=n.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/),a=document.getElementById(`mention-dropdown`);if(i){let o=i[1].toLowerCase(),s=(r.data?.users||[]).filter(e=>e.status!==`inactive`).filter(e=>`${e.name||``} ${e.nameEn||``} ${e.email||``}`.toLowerCase().includes(o));s.length?(a.innerHTML=s.map(e=>{let n=(e.name||e.nameEn||e.email||`user`).trim().split(/\s+/)[0];return`
            <div class="mention-option" data-username="${esc(n)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${avatar(e,`avatar-sm`)}
              <span style="font-size:12px;">${esc(choose(e.name,e.nameEn||e.name))}</span>
            </div>
          `}).join(``),a.style.display=`block`,a.querySelectorAll(`.mention-option`).forEach(r=>{r.onclick=()=>{let i=r.dataset.username;e.target.value=n.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/,`@${i} `),a.style.display=`none`,e.target.focus()}})):a.style.display=`none`}else a.style.display=`none`}if(e.target.dataset.action===`search-trash-input`){r.trashQuery=e.target.value;let n=e.target.selectionStart;clearTimeout(xn),xn=setTimeout(()=>{H();let e=document.querySelector(`[data-action="search-trash-input"]`);e&&(e.focus(),e.setSelectionRange(n,n))},120);return}let n=e.target.dataset.search||(e.target.dataset.action===`search-documents`?`documents`:null);if(!n)return;r.searches[n]=e.target.value;let i=e.target.selectionStart;clearTimeout(xn),xn=setTimeout(()=>{H();let e=document.querySelector(`[data-search="${n}"], [data-action="search-documents"]`);e&&(e.focus(),e.setSelectionRange(i,i))},120)}async function Cn(e){if(e.target.dataset.action===`change-doc-status`){let n=e.target.dataset.docId,i=e.target.value,a=r.data?.documents?.find(e=>e.id===n);if(!a)return;try{await P(`/api/documents/${n}`,{method:`PATCH`,body:JSON.stringify({status:i})}),a.status=i,showToast(choose(`تم تحديث حالة المخطط بنجاح ✅`,`Drawing status updated ✅`)),await W(!0)}catch(e){showToast(e.message,!0)}}else if(e.target.dataset.action===`doc-project-filter`)r.docProjectFilter=e.target.value,H();else if(e.target.dataset.action===`filter-project-docs-task`)r.docTaskFilter=e.target.value,H();else if(e.target.dataset.action===`sort-project-tasks`||e.target.dataset.action===`sort-my-tasks`)it(e.target.value),H();else if(e.target.name===`templateId`&&e.target.form?.id===`task-form`){let n=e.target.form,i=e.target.value,a=r.data.templates?.find(e=>e.id===i),o=n.querySelector(`input[name="titleAr"]`),s=n.querySelector(`input[name="titleEn"]`),c=n.querySelector(`#task-type-ar`),l=n.querySelector(`#task-type-en`),u=n.querySelector(`textarea[name="descriptionAr"]`);a?(o&&(!o.value||n.dataset.templateSelected===`true`)&&(o.value=a.nameAr),s&&(!s.value||n.dataset.templateSelected===`true`)&&(s.value=a.nameEn||``),c&&(c.value=a.typeAr||`مخطط`),l&&(l.value=a.typeEn||`Drawing`),u&&(!u.value||n.dataset.templateSelected===`true`)&&(u.value=a.descriptionAr||``),n.dataset.templateSelected=`true`):(c&&(c.value=``),l&&(l.value=``),delete n.dataset.templateSelected)}else if(e.target.name===`status`&&e.target.form?.id===`task-form`){let n=e.target.form.querySelector(`#task-auto-progress-badge`);if(n){let r={not_started:0,in_progress:50,review:80,approval:80,done:100}[e.target.value];n.textContent=r===void 0?``:`(${r}%)`}}else if(e.target.dataset.action===`task-project-filter`)r.taskProjectFilter=e.target.value,H();else if(e.target.dataset.action===`task-priority-filter`)r.taskPriorityFilter=e.target.value,H();else if(e.target.id===`sort-projects`||e.target.dataset?.action===`sort-projects`)r.projectSort=e.target.value,H();else if(e.target.id===`task-upload-input`){let n=e.target.files;if(!n.length)return;let r=e.target.dataset.taskId;kn(n,r)}else if(e.target.classList.contains(`doc-status-select`)){let n=e.target.dataset.docId,r=e.target.value;P(`/api/documents/${n}`,{method:`PATCH`,body:JSON.stringify({status:r})}).then(()=>{W(!0).then(()=>showToast(choose(`تم تحديث حالة المخطط.`,`Document status updated.`)))}).catch(e=>showToast(e.message,!0))}else if(e.target.id===`user-avatar-file-input`){let n=e.target.files?.[0];if(!n)return;if(n.size>2621440){showToast(choose(`حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.`,`Image is too large. Maximum allowed size is 2MB.`),!0),e.target.value=``;return}if(!n.type.startsWith(`image/`)){showToast(choose(`يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).`,`Please select a valid image file (JPG, PNG, WebP).`),!0),e.target.value=``;return}try{showToast(choose(`جاري معالجة ورفع صورتك الشخصية...`,`Processing & uploading avatar...`));let i=await wn(n,256,256),a=await P(`/api/users/me`,{method:`PATCH`,body:JSON.stringify({avatarUrl:i})});if(a.user){r.data.user={...r.data.user,...a.user};let e=(r.data.users||[]).findIndex(e=>e.id===r.data.user.id);e!==-1&&(r.data.users[e]={...r.data.users[e],...a.user})}e.target.value=``,V(),Oe(),showToast(choose(`تم تحديث صورتك الشخصية وتثبيتها بنجاح!`,`Avatar updated successfully!`))}catch(n){e.target.value=``,showToast(n.message,!0)}}else if(e.target.id===`company-logo-file-input`){let n=e.target.files?.[0];if(!n)return;if(n.size>3145728){showToast(choose(`حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.`,`Logo is too large. Maximum allowed size is 3MB.`),!0),e.target.value=``;return}if(!n.type.startsWith(`image/`)){showToast(choose(`يرجى اختيار ملف صورة أو شعار صالح.`,`Please select a valid logo image file.`),!0),e.target.value=``;return}try{showToast(choose(`جاري معالجة ورفع شعار الشركة...`,`Uploading company logo...`));let i=await wn(n,400,400),a=await P(`/api/company`,{method:`PATCH`,body:JSON.stringify({logoUrl:i})});a.company&&(r.data.company={...r.data.company,...a.company}),e.target.value=``,V(),Oe(),showToast(choose(`تم تحديث وتثبيت شعار مساحة العمل بنجاح!`,`Company logo updated successfully!`))}catch(n){e.target.value=``,showToast(n.message,!0)}}}function wn(e,n=300,r=300){return new Promise((i,a)=>{let o=new FileReader;o.onerror=a,o.onload=()=>{let a=new Image;a.onerror=()=>i(o.result),a.onload=()=>{try{let{width:o,height:s}=a;if(o>n||s>r){let e=Math.min(n/o,r/s);o=Math.round(o*e),s=Math.round(s*e)}let c=document.createElement(`canvas`);c.width=o,c.height=s,c.getContext(`2d`).drawImage(a,0,0,o,s),i(c.toDataURL(e.type===`image/png`?`image/png`:`image/jpeg`,.88))}catch{i(o.result)}},a.src=o.result},o.readAsDataURL(e)})}function Tn({url:e,chunk:n,contentRange:r,headers:i={},onProgress:a}){return new Promise((o,s)=>{let c=new XMLHttpRequest;if(c.open(`PUT`,e,!0),e.includes(`/api/`)){c.withCredentials=!0;let e=typeof localStorage<`u`?localStorage.getItem(`darc_token`):null;e&&!i.Authorization&&c.setRequestHeader(`Authorization`,`Bearer ${e}`)}for(let[e,n]of Object.entries(i))c.setRequestHeader(e,n);r&&c.setRequestHeader(`Content-Range`,r),c.upload&&a&&(c.upload.onprogress=e=>{e.lengthComputable&&a(e.loaded)}),c.onload=()=>{o({status:c.status,ok:c.status>=200&&c.status<300,headers:{get:e=>c.getResponseHeader(e)},responseText:c.responseText,json:()=>{try{return JSON.parse(c.responseText)}catch{return{}}}})},c.onerror=()=>s(Error(`Network connection error`)),c.ontimeout=()=>s(Error(`Upload chunk timeout`)),c.timeout=18e4,c.send(n)})}async function En(e,n){try{let r=await Tn({url:e,chunk:new Blob([]),contentRange:`bytes */${n}`});if(r.status===308){let e=r.headers.get(`Range`);if(e){let n=e.match(/bytes=0-(\d+)/);if(n&&n[1])return parseInt(n[1],10)+1}return 0}if(r.ok)return{completed:!0,data:r.json()}}catch{}return null}var Dn=null;function On({projectName:e,taskName:n,totalFiles:i}){Dn&&=(clearTimeout(Dn),null);let a=document.getElementById(`floating-upload-manager`);if(a){a.style.opacity=`1`,a.style.transform=`none`;let r=a.querySelector(`#fum-proj-text`),i=a.querySelector(`#fum-task-text`);r&&e&&(r.textContent=e),i&&n&&(i.textContent=n)}else{a=document.createElement(`div`),a.id=`floating-upload-manager`,a.setAttribute(`dir`,r.lang===`ar`?`rtl`:`ltr`),a.style.cssText=`
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
    `,a.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--surface-soft);border-bottom:1px solid var(--line);">
        <div style="display:flex;align-items:center;gap:8px;">
          <span id="fum-indicator" style="display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal);"></span>
          <strong id="fum-header-title" style="font-size:12.5px;color:var(--ink);">${choose(`رفع الملفات في الخلفية`,`Background File Upload`)}</strong>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <button id="fum-minimize-btn" type="button" style="background:transparent;border:none;color:var(--ink-soft);cursor:pointer;padding:2px 6px;font-size:13px;line-height:1;border-radius:4px;" title="${choose(`تصغير / توسيع`,`Minimize / Expand`)}">—</button>
          <button id="fum-close-btn" type="button" style="background:transparent;border:none;color:var(--ink-soft);cursor:pointer;padding:2px 6px;font-size:15px;line-height:1;border-radius:4px;display:none;" title="${choose(`إغلاق`,`Close`)}">✕</button>
        </div>
      </div>
      <div id="fum-body" style="padding:12px 14px;display:flex;flex-direction:column;gap:9px;">
        <div style="display:flex;flex-direction:column;gap:3px;font-size:11.5px;color:var(--ink-soft);">
          <div style="display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <span style="color:var(--muted);">${choose(`المشروع:`,`Project:`)}</span>
            <span id="fum-proj-text" style="color:var(--ink);font-weight:600;">${esc(e||`—`)}</span>
          </div>
          <div style="display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <span style="color:var(--muted);">${choose(`المهمة:`,`Task:`)}</span>
            <span id="fum-task-text" style="color:var(--ink-soft);">${esc(n||`—`)}</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;">
          <span id="fum-file-text" style="color:var(--ink);font-weight:600;max-width:230px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">...</span>
          <span id="fum-count-text" style="color:var(--muted);font-size:11px;">(1/${i})</span>
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
    `,document.body.appendChild(a);let o=a.querySelector(`#fum-minimize-btn`),s=a.querySelector(`#fum-body`);o.addEventListener(`click`,()=>{let e=s.style.display===`none`;s.style.display=e?`flex`:`none`,o.textContent=e?`—`:`+`}),a.querySelector(`#fum-close-btn`).addEventListener(`click`,()=>{a.remove()})}return a}function J({fileName:e,fileIndex:n,totalFiles:r,pct:i,loadedMB:a,fileSizeMB:o,speedMBs:s,etaText:c,statusNote:l,isError:u,isDone:d}){let f=document.getElementById(`floating-upload-manager`);if(!f)return;let p=f.querySelector(`#fum-file-text`),m=f.querySelector(`#fum-count-text`),h=f.querySelector(`#fum-progress-fill`),g=f.querySelector(`#fum-pct-text`),_=f.querySelector(`#fum-speed-text`),v=f.querySelector(`#fum-eta-text`),y=f.querySelector(`#fum-status-badge`),b=f.querySelector(`#fum-indicator`),x=f.querySelector(`#fum-header-title`),S=f.querySelector(`#fum-close-btn`);e&&p&&(p.textContent=e),m&&n&&r&&(m.textContent=`(${n}/${r})`),h&&typeof i==`number`&&(h.style.width=`${i}%`),g&&typeof i==`number`&&(g.textContent=`${i}%`),_&&a!==void 0&&o!==void 0&&(_.textContent=`${a} / ${o} MB • ${s||`0.0`} MB/s`),v&&c&&(v.textContent=`${choose(`متبقي:`,`ETA:`)} ${c}`),l&&y?(y.style.display=`block`,y.textContent=l,y.style.background=u?`var(--red-soft)`:`var(--amber-soft)`,y.style.color=u?`var(--red)`:`var(--amber)`,y.style.border=u?`1px solid var(--red)`:`1px solid var(--amber)`):!u&&!d&&y&&(y.style.display=`none`),d&&(b&&(b.style.background=`var(--mint-strong)`,b.style.boxShadow=`0 0 10px var(--mint-strong)`),x&&(x.textContent=choose(`اكتمل الرفع بنجاح! ✓`,`Upload Complete! ✓`)),g&&(g.textContent=`100%`),h&&(h.style.width=`100%`),S&&(S.style.display=`inline-block`),y&&(y.style.display=`block`,y.style.background=`var(--mint)`,y.style.color=`var(--teal-dark)`,y.style.border=`1px solid var(--mint-strong)`,y.textContent=choose(`تم التوثيق والرفع إلى الخادم بنجاح.`,`Document saved & uploaded to server.`)),Dn=setTimeout(()=>{f&&f.parentNode&&(f.style.opacity=`0`,f.style.transform=`translateY(12px)`,setTimeout(()=>f.remove(),300))},4500)),u&&(b&&(b.style.background=`var(--red)`,b.style.boxShadow=`0 0 10px var(--red)`),x&&(x.textContent=choose(`فشل في الرفع ✕`,`Upload Failed ✕`)),S&&(S.style.display=`inline-block`))}async function kn(e,n){if(!e||!e.length||!n)return;let i=r.data?.tasks?.find(e=>e.id===n);return An({files:e,taskId:n,projectId:i?.projectId,status:`draft`,isTaskModal:!0})}async function An({files:e,projectId:n=null,taskId:i=null,discipline:a=`عام`,status:o=`draft`,isTaskModal:s=!1}){if(!e||!e.length)return;if(typeof navigator<`u`&&!navigator.onLine){showToast(choose(`لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.`,`Cannot upload drawings or files while offline. Please connect to the internet first.`),!0);return}let c=i?r.data?.tasks?.find(e=>e.id===i):null,l=n||c?.projectId,u=l?r.data?.projects?.find(e=>e.id===l):null,d=r.data?.documents?r.data.documents.filter(e=>!e.deletedAt&&(i?e.taskId===i:e.projectId===l)):[],f=u?u.nameAr:`Project`,p=c?c.titleAr:a||`General`,m={},h=e=>{if(m[e])return m[e];let n=0;return d.forEach(r=>{if(r.originalName&&r.originalName.toLowerCase().endsWith(e)){let e=r.originalName.match(/_v(\d+)\./);e&&parseInt(e[1])>n&&(n=parseInt(e[1]))}}),m[e]=n+1,n+1},g=document.getElementById(`upload-progress-container`);document.getElementById(`upload-progress-bar`),document.getElementById(`upload-progress-percent`),document.getElementById(`upload-progress-text`);let _=document.getElementById(`task-dropzone`);s&&g&&(g.style.display=`block`),s&&_&&(_.style.pointerEvents=`none`),On({projectName:f,taskName:p,totalFiles:e.length});let v=null,y=e=>(e.preventDefault(),e.returnValue=choose(`جاري رفع ملفات هندسية كبيرة. مغادرة الصفحة ستوقف الرفع.`,`Uploading large engineering files. Leaving will abort upload.`),e.returnValue);if(typeof window<`u`&&(window.addEventListener(`beforeunload`,y),`wakeLock`in navigator))try{navigator.wakeLock.request(`screen`).then(e=>{v=e}).catch(()=>{})}catch{}try{for(let n=0;n<e.length;n++){let r=e[n];if(!r.size||r.size===0){showToast(choose(`الملف "${r.name}" فارغ لا يحتوي على بيانات.`,`File "${r.name}" is empty.`),!0);continue}if(r.size>107374182400){showToast(choose(`حجم الملف "${r.name}" يتجاوز الحد الأقصى المسموح (100GB).`,`File "${r.name}" exceeds 100GB limit.`),!0);continue}let a=r.name.split(`.`).pop()?.toLowerCase()||``;if([`exe`,`bat`,`cmd`,`sh`,`bash`,`ps1`,`vbs`,`js`,`mjs`,`cjs`,`py`,`php`,`phtml`,`html`,`htm`,`jar`,`msi`,`dll`,`com`,`scr`,`hta`,`svg`,`apk`].includes(a)||r.type===`image/svg+xml`){showToast(choose(`صيغة الملف "${r.name}" غير مسموح بها لأسباب أمنية.`,`File type for "${r.name}" is not permitted for security reasons.`),!0);continue}let c=r.name.lastIndexOf(`.`),u=c===-1?``:r.name.substring(c).toLowerCase(),d=c===-1?r.name:r.name.substring(0,c),m=e=>(e||``).replace(/[/\\:*?"<>|\x00-\x1f\x7f-\x9f\u202A-\u202E\u2066-\u2069]/g,`-`).replace(/\s+/g,`_`).trim(),g=`${m(f)||`Project`}_${m(p)||`General`}_${m(d)||`Drawing`}_v${h(u)}${u}`,_=r.size>=1073741824?`${(r.size/1073741824).toFixed(2)} GB`:`${(r.size/1048576).toFixed(1)} MB`;J({fileName:r.name,fileIndex:n+1,totalFiles:e.length,pct:0,loadedMB:`0.0`,fileSizeMB:_,speedMBs:`0.0`,etaText:`...`,statusNote:choose(`بدء جلسة الرفع المستأنف...`,`Starting resumable session...`)});let v=(await P(`/api/documents/session`,{method:`POST`,body:JSON.stringify({compiledName:g,mimeType:r.type||`application/octet-stream`,projectId:l,taskId:i,size:r.size})})).sessionUrl,y=8388608;y=r.size<=10485760?r.size:r.size<=104857600?8388608:r.size<=524288e3?16777216:r.size<=2147483648?33554432:67108864;let b=Date.now(),x=0,S=i=>{let a=Math.min(r.size,x+i),o=Math.min(100,Math.round(a/r.size*100)),c=a>=1073741824?`${(a/1073741824).toFixed(2)} GB`:`${(a/1048576).toFixed(1)} MB`;if(s){let i=document.getElementById(`upload-progress-bar`),s=document.getElementById(`upload-progress-percent`),l=document.getElementById(`upload-progress-text`),u=document.getElementById(`upload-progress-container`);u&&(u.style.display=`block`),i&&(i.style.width=`${o}%`),s&&(s.textContent=`${o}%`);let d=(Date.now()-b)/1e3,f=a/Math.max(d,.2),p=(f/1048576).toFixed(1),m=Math.max(0,r.size-a),h=Math.round(m/Math.max(f,1)),g=h<60?`${h} ${choose(`ثانية`,`s`)}`:`${Math.floor(h/60)}:${String(h%60).padStart(2,`0`)} ${choose(`دقيقة`,`min`)}`;l&&(l.textContent=`${choose(`رفع إلى الخادم`,`Uploading to server`)} (${n+1}/${e.length}): ${r.name} — ${c} / ${_} (${o}%) • ${p} MB/s • ${choose(`متبقي:`,`ETA:`)} ${g}`)}let l=(Date.now()-b)/1e3,u=a/Math.max(l,.2),d=(u/1048576).toFixed(1),f=Math.max(0,r.size-a),p=Math.round(f/Math.max(u,1)),m=p<60?`${p} s`:`${Math.floor(p/60)}m`;J({fileName:r.name,fileIndex:n+1,totalFiles:e.length,pct:o,loadedMB:c,fileSizeMB:_,speedMBs:d,etaText:m})};S(0);let C=0,w=null,T=!1;for(;C<r.size;){let a=Math.min(C+y,r.size),s=r.slice(C,a),c=`bytes ${C}-${a-1}/${r.size}`,u=0,d=!1;for(;!d&&u<5;)try{let e;if(!T)try{e=await Tn({url:v,chunk:s,contentRange:c,headers:{},onProgress:e=>S(e)})}catch(e){console.warn(`[Upload] Direct GDrive upload failed, trying backend proxy:`,e.message),T=!0}if(T){let n={projectId:l,taskId:i,compiledName:g,mimeType:r.type,size:r.size,status:o};e=await Tn({url:`${ke}/api/documents/chunk`,chunk:s,contentRange:c,headers:{"x-session-url":v,"x-doc-meta":encodeURIComponent(JSON.stringify(n))},onProgress:e=>S(e)})}if(e.status===308){let n=e.headers.get(`Range`);if(n){let e=n.match(/bytes=0-(\d+)/);C=e&&e[1]?parseInt(e[1],10)+1:a}else C=a;x=C,S(0),d=!0}else if(e.ok){let n=e.json();w=n.id||n.document?.id,x=r.size,S(0),C=r.size,d=!0;break}else throw Error(`Upload returned status ${e.status}`)}catch(i){if(u++,J({fileName:r.name,fileIndex:n+1,totalFiles:e.length,statusNote:`${choose(`إعادة المحاولة`,`Retrying`)} (${u}/5)...`}),u>=5)throw Error(`${choose(`فشل الرفع بعد محاولات متعددة`,`Upload failed after multiple retries`)}: ${i.message}`);await new Promise(e=>setTimeout(e,1e3*2**(u-1)));let a=await En(v,r.size);if(typeof a==`number`&&a>C){C=a,x=C;break}if(a&&a.completed){w=a.data?.id,C=r.size,d=!0;break}}}w&&!w.startsWith(`doc_`)&&await P(`/api/documents/finalize`,{method:`POST`,body:JSON.stringify({driveFileId:w,projectId:l,taskId:i,compiledName:g,mimeType:r.type,size:r.size,status:o})})}if(await W(!0),s&&i){let e=r.data?.tasks?.find(e=>e.id===i),n=document.getElementById(`task-documents-list`);n&&e&&(n.innerHTML=yt(e))}Oe(),J({fileIndex:e.length,totalFiles:e.length,pct:100,isDone:!0}),showToast(choose(`تم رفع المخطط وتوثيقه بنجاح إلى الخادم ✅`,`Drawing uploaded & registered successfully ✅`))}catch(e){J({isError:!0,statusNote:e.message}),showToast(e.message,!0)}finally{if(typeof window<`u`&&window.removeEventListener(`beforeunload`,y),v){try{v.release()}catch{}v=null}if(s){let e=document.getElementById(`upload-progress-container`),n=document.getElementById(`upload-progress-bar`),r=document.getElementById(`task-dropzone`);e&&(e.style.display=`none`),n&&(n.style.width=`0%`),r&&(r.style.pointerEvents=`auto`);let i=document.getElementById(`task-upload-input`);i&&(i.value=``)}}}typeof window<`u`&&!window._taskDropzoneListenersSet&&(window._taskDropzoneListenersSet=!0,document.addEventListener(`dragover`,e=>{let n=e.target.closest(`#task-dropzone`);n&&(e.preventDefault(),n.style.borderColor=`var(--brand-teal)`,n.style.background=`var(--teal-soft)`)}),document.addEventListener(`dragleave`,e=>{let n=e.target.closest(`#task-dropzone`);n&&(n.style.borderColor=`var(--border)`,n.style.background=`var(--surface-soft)`)}),document.addEventListener(`drop`,e=>{let n=e.target.closest(`#task-dropzone`);if(n){e.preventDefault(),n.style.borderColor=`var(--border)`,n.style.background=`var(--surface-soft)`;let r=n.dataset.taskId,i=e.dataTransfer?.files;i&&i.length&&kn(i,r)}}));async function jn(){let e=typeof window<`u`?window.location.hash.replace(/^#/,``):``,n=new URLSearchParams(e.includes(`?`)?e.split(`?`)[1]:e.includes(`=`)?e:``),i=n.get(`activate`);if(i)return renderActivation(i);let a=n.get(`reset`);if(a)return renderResetPassword(a);if(e===`forgot`)return renderLogin(``,`forgot`);if(e===`login`)return renderLogin();let o=_();o&&o.user?(r.data=o,R(r.view)||(r.view=z()),V()):renderLoading();try{if(e){let[n,i]=e.split(`?`);if([`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`,`project-detail`].includes(n)&&(r.view=n,i)){let e=new URLSearchParams(i);e.get(`id`)&&(r.activeProjectId=e.get(`id`)),e.get(`tab`)&&(r.projectTab=e.get(`tab`))}}else if(typeof sessionStorage<`u`){let e=sessionStorage.getItem(`darc_last_route`);if(e){let n=JSON.parse(e);n.view&&(r.view=n.view),n.activeProjectId&&(r.activeProjectId=n.activeProjectId),n.projectTab&&(r.projectTab=n.projectTab)}}}catch{}try{if(typeof navigator<`u`&&navigator.onLine&&C().length>0&&await ee(P),await loadData(),!window._darcPollingActive){window._darcPollingActive=!0;let e=null,n=0,i=!1,a=Date.now(),o=0,s=()=>{let e=Date.now()-a>45e3;a=Date.now(),e&&Date.now()-o>4e3&&!i&&l()};if(typeof window<`u`){let e=0,n=()=>{let n=Date.now();n-e>5e3&&(e=n,s())};window.addEventListener(`click`,n,{passive:!0}),window.addEventListener(`keydown`,n,{passive:!0}),window.addEventListener(`touchstart`,n,{passive:!0}),window.addEventListener(`mousemove`,n,{passive:!0})}let c=()=>{e&&clearTimeout(e);let r=Date.now()-a>45e3?15e3:4e3,i=n>0?Math.min(25e3,r*2**n):r;e=setTimeout(l,i)},l=async()=>{if(typeof document<`u`&&document.hidden)c();else if(!r.data?.user||!r.view||r.view===`login`)c();else if(i)c();else{i=!0,o=Date.now();try{await loadData(!0),n=0}catch{n++}finally{i=!1,c()}}};c(),typeof document<`u`&&document.addEventListener(`visibilitychange`,()=>{!document.hidden&&r.data?.user&&r.view&&r.view!==`login`&&(s(),l())})}}catch{typeof window<`u`&&(window.history&&window.history.replaceState?window.history.replaceState(null,``,`#login`):window.location.hash=`#login`),renderLogin()}}if(typeof window<`u`&&!window._hashChangeListenerSet&&(window._hashChangeListenerSet=!0,window.addEventListener(`hashchange`,()=>{if(window._isInternalNav){window._isInternalNav=!1;return}let e=window.location.hash.replace(/^#/,``);if(!e)return;let[n,i]=e.split(`?`);if(n===`login`){r.data?.user&&(r.data.user=null),renderLogin();return}if(n===`forgot`){renderLogin(``,`forgot`);return}let a=new URLSearchParams(i||(e.includes(`=`)?e:``));if(a.get(`activate`))renderActivation(a.get(`activate`));else if(a.get(`reset`))renderResetPassword(a.get(`reset`));else if([`dashboard`,`projects`,`tasks`,`documents`,`templates`,`team`,`reports`,`settings`,`project-detail`].includes(n)){if(r.data&&!R(n)){U(z());return}let e=r.activeProjectId;if(i){let n=new URLSearchParams(i);n.get(`id`)&&(e=n.get(`id`)),n.get(`tab`)&&(r.projectTab=n.get(`tab`))}(r.view!==n||r.activeProjectId!==e)&&U(n,e)}})),typeof window<`u`&&!window._timelineScrollListenerSet){window._timelineScrollListenerSet=!0;let e=!1;document.addEventListener(`scroll`,n=>{n.target&&n.target.classList&&(n.target.classList.contains(`timeline-scroll`)||n.target.classList.contains(`gantt-scroll`)||n.target.classList.contains(`timeline-board`))&&(e||(e=!0,requestAnimationFrame(()=>{typeof drawTimelineArrows==`function`&&drawTimelineArrows(),e=!1})))},!0)}var Y=null,X=null;function Mn(){return Y||(Y=document.createElement(`div`),Y.className=`drag-placeholder`,Y.style.cssText=`
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
    `,Y.innerHTML=`<span>↓ ${O(`الموقع الجديد للمهمة`,`Drop position`)}</span>`),Y}function Nn(){Y&&Y.parentNode&&Y.parentNode.removeChild(Y)}function Pn(e,n){let r=Array.from(e.querySelectorAll(`.task-card:not(.is-dragging)`));for(let e of r){let r=e.getBoundingClientRect();if(n<r.top+r.height/2)return e}return null}document.addEventListener(`dragstart`,e=>{let n=e.target.closest(`.task-card`);if(n){let i=(r.data?.tasks||[]).find(e=>e.id===n.dataset.taskId);if(!(M()||j(`edit_tasks`)||i&&i.assigneeId===r.data?.user?.id)){e.preventDefault();return}window._isDraggingTask=!0,X=n.dataset.taskId,e.dataTransfer.effectAllowed=`move`;try{e.dataTransfer.setData(`text/plain`,X)}catch{}n.classList.add(`is-dragging`)}}),document.addEventListener(`dragend`,e=>{let n=e.target.closest(`.task-card`);n&&n.classList.remove(`is-dragging`),window._isDraggingTask=!1,window._justDroppedTaskId=X,window._justDroppedAt=Date.now(),X=null,document.querySelectorAll(`.board-column`).forEach(e=>e.classList.remove(`drag-over`)),Nn()}),document.addEventListener(`dragover`,e=>{let n=e.target.closest(`.board-column`);if(n){e.preventDefault(),e.dataTransfer.dropEffect=`move`,n.classList.add(`drag-over`);let r=document.querySelector(`.board, .board-columns, .tasks-board, [data-board]`);r&&(e.clientX<50?r.scrollLeft-=14:e.clientX>window.innerWidth-50&&(r.scrollLeft+=14));let i=n.querySelector(`.board-cards`);if(i){let n=Mn(),r=Pn(i,e.clientY);r?n.nextSibling!==r&&i.insertBefore(n,r):(!i.contains(n)||i.lastElementChild!==n)&&i.appendChild(n)}}}),document.addEventListener(`dragenter`,e=>{e.target.closest(`.board-column`)&&e.preventDefault()}),document.addEventListener(`dragleave`,e=>{let n=e.target.closest(`.board-column`);if(n){if(e.relatedTarget&&n.contains(e.relatedTarget))return;let r=n.getBoundingClientRect(),i=e.clientX,a=e.clientY;(i<=r.left||i>=r.right||a<=r.top||a>=r.bottom)&&(n.classList.remove(`drag-over`),Nn())}});async function Fn(e,n,i=null){if(!e){Nn();return}e.classList.remove(`drag-over`);let a=e.querySelector(`.board-cards`),o=null;if(Y&&Y.parentNode===a){let e=Y.nextElementSibling;e&&e.classList.contains(`task-card`)&&e.dataset.taskId!==(i||X)&&(o=e.dataset.taskId)}else if(a){let e=Pn(a,n);e&&e.dataset.taskId!==(i||X)&&(o=e.dataset.taskId)}Nn();let s=i||X;X=null;let c=e.dataset.status;if(!s||!c)return;let l=(r.data?.tasks||[]).find(e=>e.id===s);if(!l)return;if(!(l.status===c||c===`review`&&[`review`,`approval`,`blocked`].includes(l.status))&&c===`done`&&l.dependencies&&l.dependencies.length&&l.dependencies.filter(e=>{let n=r.data.tasks.find(n=>n.id===e);return n&&n.status!==`done`}).length)return E(O(`لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.`,`Cannot complete task before its dependencies.`),!0);r.projectTaskSort=`custom`,r.myTaskSort=`custom`,localStorage.setItem(`darc_task_sort_pref`,`custom`);let u=c===`review`?[`review`,`approval`,`blocked`]:[c],d=(r.data.tasks||[]).filter(e=>e.projectId===l.projectId&&(u.includes(e.status)||e.id===s)),f=d.findIndex(e=>e.id===s);f!==-1&&d.splice(f,1),d.sort((e,n)=>I(e)-I(n)),l.status=c;let p=d.length;if(o){let e=d.findIndex(e=>e.id===o);if(e===-1&&Y&&Y.parentNode){let n=Y.nextElementSibling;for(;n;){if(n.classList?.contains(`task-card`)&&n.dataset.taskId){let r=d.findIndex(e=>e.id===n.dataset.taskId);if(r!==-1){e=r;break}}n=n.nextElementSibling}}e!==-1&&(p=e)}d.splice(p,0,l),d.forEach((e,n)=>{let r=(n+1)*100;e.sortOrder=r,e.sort_order=r,e.customFields={...e.customFields||{},sortOrder:r,sort_order:r},e.custom_fields={...e.custom_fields||{},sortOrder:r,sort_order:r}}),H();let m=document.querySelector(`.task-card[data-task-id="${s}"]`);m&&(m.classList.add(`just-dropped`),setTimeout(()=>m.classList.remove(`just-dropped`),400)),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,d.forEach(e=>{window._pendingReorderBatch.set(e.id,{id:e.id,status:e.status,sortOrder:e.sortOrder,customFields:e.customFields})}),window._reorderSyncTimer=setTimeout(()=>{let e=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),P(`/api/tasks/reorder`,{method:`PATCH`,body:JSON.stringify({items:e})}).catch(e=>{console.warn(`Reorder sync error:`,e),E(O(`فشل حفظ الترتيب الجديد في الخادم.`,`Failed to save task order to server.`),!0)})},150)}document.addEventListener(`drop`,async e=>{let n=e.target.closest(`.board-column`);e.preventDefault();let r=X||(e.dataTransfer?e.dataTransfer.getData(`text/plain`):null);await Fn(n,e.clientY,r)});var Z=null,Q=null,In=0,Ln=0,Rn=0,zn=0,$=null,Bn=!1;function Vn(){$&&=(clearTimeout($),null),Q&&Q.parentNode&&Q.parentNode.removeChild(Q),Q=null,Z&&(Z.style.opacity=``,Z.style.pointerEvents=``,Z.classList.remove(`is-dragging`)),document.querySelectorAll(`.board-column`).forEach(e=>e.classList.remove(`drag-over`)),Nn(),Z=null,Bn=!1,X=null}document.addEventListener(`touchstart`,e=>{if(e.touches.length!==1)return;let n=e.target.closest(`.task-card`);if(!n||e.target.closest(`button, a, input, select, textarea, .btn`))return;let i=(r.data?.tasks||[]).find(e=>e.id===n.dataset.taskId);if(!(M()||j(`edit_tasks`)||i&&i.assigneeId===r.data?.user?.id))return;Z=n;let a=e.touches[0];In=a.clientX,Ln=a.clientY,Bn=!1,$=setTimeout(()=>{if(!Z)return;if(Bn=!0,X=Z.dataset.taskId,typeof navigator<`u`&&navigator.vibrate)try{navigator.vibrate(40)}catch{}let e=Z.getBoundingClientRect();Rn=a.clientX-e.left,zn=a.clientY-e.top,Q=Z.cloneNode(!0),Q.id=`touch-drag-ghost`,Q.style.cssText=`
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
    `,document.body.appendChild(Q),Z.classList.add(`is-dragging`),Z.style.opacity=`0.25`,Z.style.pointerEvents=`none`;let n=Z.closest(`.board-column`);if(n){n.classList.add(`drag-over`);let e=n.querySelector(`.board-cards`);if(e){let n=Mn(),r=Pn(e,a.clientY);r&&n.nextSibling!==r?e.insertBefore(n,r):e.contains(n)||e.appendChild(n)}}},220)},{passive:!0}),document.addEventListener(`touchmove`,e=>{if(!Z)return;let n=e.touches[0],r=Math.abs(n.clientX-In),i=Math.abs(n.clientY-Ln);if(!Bn){(r>8||i>8)&&($&&=(clearTimeout($),null),Z=null);return}if(e.cancelable&&e.preventDefault(),Q){let e=n.clientX-Rn,r=n.clientY-zn;Q.style.transform=`translate3d(${e}px, ${r}px, 0) scale(1.03) rotate(1.5deg)`}let a=document.querySelector(`.board, .board-columns, .tasks-board, [data-board]`);a&&(n.clientX<45?a.scrollLeft-=12:n.clientX>window.innerWidth-45&&(a.scrollLeft+=12));let o=document.elementFromPoint(n.clientX,n.clientY)?.closest(`.board-column`);if(document.querySelectorAll(`.board-column`).forEach(e=>e.classList.toggle(`drag-over`,e===o)),o){let e=o.querySelector(`.board-cards`);if(e){let r=Mn(),i=Pn(e,n.clientY);i?r.nextSibling!==i&&e.insertBefore(r,i):(!e.contains(r)||e.lastElementChild!==r)&&e.appendChild(r)}}},{passive:!1}),document.addEventListener(`touchend`,async e=>{if($&&=(clearTimeout($),null),Z){if(Bn){let n=e.changedTouches[0],r=document.elementFromPoint(n.clientX,n.clientY)?.closest(`.board-column`)||Y&&Y.closest(`.board-column`),i=X;Q&&Q.parentNode&&Q.parentNode.removeChild(Q),Q=null,r&&i&&await Fn(r,n.clientY,i),Vn()}else Vn()}}),document.addEventListener(`touchcancel`,()=>{Vn()});var Hn=null,Un=!1;function Wn(e=`realtime`){Hn&&clearTimeout(Hn),Hn=setTimeout(async()=>{if(!(typeof document<`u`&&document.hidden)&&r.data&&r.view)try{await ln(!0)}catch(e){console.warn(`[Realtime] Sync error:`,e.message)}},250)}function Gn(){if(!Un){if(Un=!0,typeof BroadcastChannel<`u`){let e=new BroadcastChannel(`darc_state_sync`);e.onmessage=e=>{e.data?.type===`STATE_MUTATION`&&Wn(`broadcast_channel`)},window._darcBroadcastChannel=e}window.addEventListener(`online`,async()=>{r.isOffline=!1;let e=window.api,n=typeof window.choose==`function`?window.choose:(e=>e),i=typeof window.showToast==`function`?window.showToast:console.log;if(e){let r=await ee(e);r&&r.synced>0?i(n(`تمت استعادة الاتصال ومزامنة ${r.synced} عمليات معلقة بنجاح! 🚀`,`Internet restored! Synced ${r.synced} pending actions successfully! 🚀`),!1):i(n(`تمت استعادة الاتصال بالإنترنت`,`Internet connection restored`),!1)}Wn(`online`)}),window.addEventListener(`offline`,()=>{if(r.isOffline=!0,typeof window.renderApp==`function`&&window.renderApp(),typeof window.showToast==`function`){let e=typeof window.choose==`function`?window.choose(`أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت`,`Offline Mode — you can continue working, changes will auto-sync on reconnect`):`أنت في وضع عدم الاتصال (Offline Mode)`;window.showToast(e,!0)}})}}function Kn(){if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:`STATE_MUTATION`,timestamp:Date.now()})}catch{}}typeof window<`u`&&(window.notifyStateMutation=Kn),document.documentElement.dataset.theme=r.theme,document.documentElement.lang=r.lang,document.documentElement.dir=r.lang===`ar`?`rtl`:`ltr`,r.lang===`en`?document.body.classList.add(`is-ltr`):document.body.classList.remove(`is-ltr`),Object.assign(window,te),Object.assign(window,Ie),Object.assign(window,Ge),Object.assign(window,Ct),Object.assign(window,et),Object.assign(window,Vt),Object.assign(window,Gt),Object.assign(window,Jt),Object.assign(window,an),Object.assign(window,sn),Object.assign(window,vn),Object.assign(window,oe),_n(),document.addEventListener(`click`,e=>{handleClick(e).catch(e=>showToast(e.message,!0))}),document.addEventListener(`submit`,e=>{handleSubmit(e).catch(e=>showToast(e.message,!0))}),document.addEventListener(`input`,handleInput),document.addEventListener(`change`,handleChange),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&closeModal()});var qn=null;window.addEventListener(`resize`,()=>{r.view===`project-detail`&&r.projectTab===`timeline`&&(qn||=requestAnimationFrame(()=>{qn=null,drawTimelineArrows()}))}),window.addEventListener(`error`,e=>{console.error(`Runtime Error:`,e.error),typeof showToast==`function`&&showToast(`خطأ برمجي: ${e.message}`,!0)}),`serviceWorker`in navigator&&window.location.protocol.startsWith(`http`)&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`/sw.js`).catch(e=>{console.warn(`[PWA] ServiceWorker registration skipped:`,e.message)})}),Gn(),init();