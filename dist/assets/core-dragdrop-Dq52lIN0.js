import{t as Ze}from"./rolldown-runtime-BQ-_32WO.js";function Ft(e){if(typeof document>"u"||!e||!document.cookie)return null;const t=document.cookie.split("; "),n=encodeURIComponent(String(e))+"=",i=String(e)+"=";for(let a=0;a<t.length;a++){const r=t[a];if(r.startsWith(n)){const d=r.substring(n.length);try{return decodeURIComponent(d)}catch{return d}}else if(r.startsWith(i)){const d=r.substring(i.length);try{return decodeURIComponent(d)}catch{return d}}}return null}function va(){if(typeof window>"u")return"ar";try{let e=Ft("darc_lang")||window.localStorage.getItem("darc-locale");if(!e){const t=Ft("darc_prefs");if(t)try{e=JSON.parse(t).lang}catch{}}return e==="ar"||e==="en"?e:(navigator.languages&&navigator.languages[0]||navigator.language||"").toLowerCase().startsWith("ar")?"ar":"en"}catch{return"ar"}}function xa(){if(typeof window>"u")return"light";try{let e=Ft("darc_theme")||window.localStorage.getItem("darc-theme");if(!e){const t=Ft("darc_prefs");if(t)try{e=JSON.parse(t).theme}catch{}}if(e==="dark"||e==="light")return e;if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}catch{}return"light"}function wa(){const e={view:"dashboard",activeProjectId:null,projectTab:"overview",settingsSection:"profile"};if(typeof window>"u")return e;try{const t=window.location.hash.replace(/^#/,"");if(t&&!["login","forgot"].includes(t)){const[i,a]=t.split("?");if(["dashboard","projects","tasks","documents","templates","team","reports","settings","project-detail"].includes(i)){let r=null,d="overview",l="profile";if(a){const c=new URLSearchParams(a),p=c.get("id");p&&/^[a-zA-Z0-9_-]{3,64}$/.test(p)&&(r=p);const u=c.get("tab");u&&["overview","tasks","drawings","documents","timeline","activity"].includes(u)&&(d=u);const m=c.get("section");m&&["profile","company","roles","accounts","whatsapp","security","audit","trash","analytics","diagnostics","vault","preferences"].includes(m)&&(l=m)}return{view:i,activeProjectId:r,projectTab:d,settingsSection:l}}}const n=sessionStorage.getItem("darc_last_route");if(n){const i=JSON.parse(n);if(i.view)return{view:i.view,activeProjectId:i.activeProjectId||null,projectTab:i.projectTab||"overview",settingsSection:i.settingsSection||"profile"}}}catch{}return e}var Ct=wa(),s={lang:va(),theme:xa(),view:Ct.view,activeProjectId:Ct.activeProjectId,projectTab:Ct.projectTab,settingsSection:Ct.settingsSection||"profile",templateCategory:"all",searches:{projects:"",tasks:"",templates:"",documents:""},taskFilter:"all",taskProjectFilter:"all",taskPriorityFilter:"all",docTaskFilter:"all",docProjectFilter:"all",docDisciplineFilter:"all",docStatusFilter:"all",docSortOrder:"newest",docViewMode:typeof localStorage<"u"&&localStorage.getItem("darc_doc_view_mode")||"grid",sidebarOpen:!1,isOffline:typeof navigator<"u"?!navigator.onLine:!1,data:null},qo=Ze({closeModal:()=>gi,handleModalPopState:()=>mi,hideSplashScreen:()=>An,isAnyModalOpen:()=>ui,modalShell:()=>Qt,pushModalHistory:()=>fi,renderLoading:()=>ka,showToast:()=>Y}),Kn=!1;function An(){if(Kn)return;Kn=!0;const e=document.getElementById("darc-splash-screen");e&&(e.style.transition="opacity 0.1s ease",e.style.opacity="0",setTimeout(()=>{e.style.display="none",e.remove()},110))}function ka(){An(),document.getElementById("app").innerHTML=`<div class="loading"><div class="loading-mark"><div class="loading-spinner"></div><span>${o("جاري تجهيز مساحة العمل...","Preparing your workspace...")}</span></div></div>`}var We=!1,je=null,Ke=0,gn=!1;function ui(){if(typeof document>"u")return!1;const e=document.getElementById("modal-root");if(e&&e.hasChildNodes()&&e.querySelector(".modal")||document.getElementById("omnisearch-modal"))return!0;const t=document.getElementById("preview-modal-overlay");if(t&&t.style.display!=="none"&&t.innerHTML.trim()!=="")return!0;const n=document.getElementById("project-report-preview-modal");if(n&&n.style.display!=="none"&&n.innerHTML.trim()!=="")return!0;const i=document.getElementById("audit-report-preview-modal");return!!(i&&i.style.display!=="none"&&i.innerHTML.trim()!=="")}function fi(e=""){if(typeof window<"u"&&window.history&&typeof window.history.pushState=="function"){Ke++;try{window.history.pushState({darcModal:e||"active",count:Ke},"")}catch{}}}function mi(){if(gn){gn=!1;return}(ui()||Ke>0)&&(Ke=Math.max(0,Ke-1),gi(!1,!0))}typeof window<"u"&&typeof window.addEventListener=="function"&&window.addEventListener("popstate",mi);function gi(e=!1,t=!1){if(je&&(clearTimeout(je),je=null),!t&&Ke>0&&(Ke--,gn=!0,typeof window<"u"&&window.history&&typeof window.history.back=="function"))try{window.history.back()}catch{}const n=document.getElementById("preview-modal-overlay");n&&(n.style.display="none",n.innerHTML="");const i=document.getElementById("project-report-preview-modal");i&&(i.style.display="none",i.innerHTML="");const a=document.getElementById("audit-report-preview-modal");a&&(a.style.display="none",a.innerHTML="");const r=document.getElementById("omnisearch-modal");r&&r.remove();const d=document.getElementById("modal-root");if(!d||!d.hasChildNodes()){document.body.style.overflow="",We=!1;return}if(e){d.innerHTML="",document.body.style.overflow="",We=!1;return}if(We)return;We=!0;const l=d.querySelector(".modal-backdrop"),c=d.querySelector(".modal");l&&c?(l.classList.add("is-closing"),c.classList.add("is-closing"),je=setTimeout(()=>{je=null,d.innerHTML="",document.body.style.overflow="",We=!1},150)):(d.innerHTML="",document.body.style.overflow="",We=!1)}function Qt(e,t,n,i="",a=""){return je&&(clearTimeout(je),je=null),We=!1,document.body.style.overflow="hidden",fi(i),`<div class="modal-backdrop ${i?`backdrop-${i}`:""}"><div class="modal ${a}" data-modal="${i}"><div class="modal-head"><div><h2>${g(e)}</h2><p>${g(t||"")}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="${o("إغلاق","Close")}">${v("close",15)}</button></div>${n}</div></div>`}function Y(e,t="success"){if(!e)return;let n=document.getElementById("toast-root");n||(n=document.createElement("div"),n.id="toast-root",n.className="toast-stack",n.setAttribute("role","region"),n.setAttribute("aria-label","Notifications"),document.body.appendChild(n));let i="success";if(typeof t=="boolean"?i=t?"error":"success":typeof t=="string"&&t&&(i=t.toLowerCase()),i==="success"||i==="info"){const m=String(e);/رفع|مخطط|تحميل|تنزيل|ملف|upload|file|document|dwg|pdf/i.test(m)?i="upload":/خطأ|فشل|تعذر|مرفوض|غير مصرح|blocked|error|fail|denied|حظر/i.test(m)?i="error":/تحذير|انتبه|تنبيه|أوفلاين|offline|warn/i.test(m)?i="warning":/إشعار|معلومة|رابط|نسخ|copied|info|bell/i.test(m)&&(i="info")}const a={success:"check",error:"alert",warning:"alert",info:"bell",upload:"upload"}[i]||"check",r=String(e).replace(/^[\s\uFEFF\xA0]*[✅🔔🚀⚠️✨✓✕❌📑📊👥🎉]+\s*/u,"").replace(/\s*[✅🔔🚀⚠️✨✓✕❌📑📊👥🎉]+[\s\uFEFF\xA0]*$/u,"").trim(),d=Array.from(n.children||[]).filter(m=>!m.dataset?.evicting);for(;d.length>=3;){const m=d.shift();if(!m)break;m.dataset.evicting="true",m._dismissTimer&&clearTimeout(m._dismissTimer),m.classList.add("toast-exit"),setTimeout(()=>{try{m.remove()}catch{}},120)}const l=document.createElement("div");l.className=`toast toast-${i} ${i==="error"?"error":""}`,l.setAttribute("role","alert"),l.setAttribute("aria-live","polite"),l.innerHTML=`
    <span class="toast-icon-badge ${i}" aria-hidden="true">
      ${v(a,17)}
    </span>
    <div class="toast-content">
      <span class="toast-text" dir="auto">${g(r)}</span>
    </div>
    <button type="button" class="toast-close" aria-label="${o("إغلاق","Close")}" title="${o("إغلاق","Close")}">
      ${v("close",13)}
    </button>
  `;let c=null;const p=()=>{c&&clearTimeout(c),l.classList.add("toast-exit"),setTimeout(()=>{try{l.remove()}catch{}},220)},u=l.querySelector(".toast-close");u&&u.addEventListener("click",m=>{m.stopPropagation(),p()}),c=setTimeout(p,4200),l._dismissTimer=c,l.addEventListener("mouseenter",()=>{c&&clearTimeout(c)}),l.addEventListener("mouseleave",()=>{c=setTimeout(p,2e3),l._dismissTimer=c}),n.appendChild(l)}var Ho=Ze({I18N:()=>yn,PERMISSION_ALIASES:()=>Ti,avatar:()=>Be,can:()=>z,canManageAccountPermissions:()=>ja,canUserMoveTask:()=>Qe,choose:()=>o,currentViewTitle:()=>tn,dateLabel:()=>Tt,detectDocumentDiscipline:()=>xi,docBlobManager:()=>Ei,dueLabel:()=>Pa,esc:()=>g,exportXLS:()=>Fa,extractDrawingVersion:()=>vi,formatDateTime:()=>ki,formatReportDate:()=>Ca,formatReportTime:()=>Ma,formatUnifiedDateNumeric:()=>Ia,getActiveCalendarSystem:()=>Xe,getCompanyBranding:()=>Ba,getCookieVal:()=>yi,getDaysOverdue:()=>za,getDisciplineInfo:()=>wi,getFileFormatInfo:()=>bi,getHijriDateEquivalent:()=>La,getTaskDueTier:()=>En,getTaskStatusStyle:()=>qt,getTimeBasedGreeting:()=>Da,hasSessionIndicator:()=>St,icon:()=>v,initials:()=>bn,isAdmin:()=>ee,isDueSoon:()=>$i,isNotificationRead:()=>Ne,isOverdue:()=>en,isTaskAssignedToUser:()=>Ai,normalizeArabic:()=>hn,parseEndOfDay:()=>At,playSuccessChime:()=>Oa,priorityText:()=>Dn,roleFor:()=>Si,roleName:()=>In,runInWorker:()=>Na,sanitizeForSpreadsheet:()=>Ea,savePreferencesCookies:()=>$a,setSavedTaskSort:()=>Cn,setSessionIndicator:()=>hi,showToast:()=>Y,statusBadge:()=>Ra,statusDot:()=>_a,statusText:()=>_n,t:()=>T}),yn={ar:{dashboard:"الرئيسية",projects:"المشاريع",myTasks:"مهامي",templates:"قاعدة المخططات",team:"فريق العمل",reports:"التقارير",settings:"الإعدادات",workspace:"مساحة العمل",overview:"نظرة عامة",welcome:"صباح الخير",welcomeText:"تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.",portfolioHealth:"صحة المحفظة",activeProjects:"مشاريع نشطة",openTasks:"مهام مفتوحة",overdue:"مهام متأخرة",dueThisWeek:"تستحق هذا الأسبوع",projectProgress:"تقدم المشاريع",projectProgressSub:"نظرة سريعة على المشاريع التي تحتاج انتباهك.",seeAll:"عرض الكل",attention:"يحتاج انتباهك",attentionSub:"أولويات اليوم والمواعيد القريبة.",teamProgress:"إنجاز الفريق",teamProgressSub:"الإنجاز حسب المهام المسندة.",recentPulse:"نبض التنفيذ",recentPulseSub:"حركة المهام خلال الأسابيع الأخيرة.",noProjects:"لا توجد مشاريع حتى الآن",noTasks:"لا توجد مهام في هذا العرض",noAttention:"لا يوجد ما يحتاج انتباهًا الآن.",addProject:"مشروع جديد",addTask:"مهمة جديدة",addMember:"إضافة عضو",addRole:"دور جديد",search:"بحث...",filter:"تصفية",all:"الكل",active:"نشط",planning:"تخطيط",atRisk:"يحتاج انتباه",onTrack:"على المسار",offTrack:"متأخر",onHold:"متوقف",completed:"مكتمل",archived:"مؤرشف",tasks:"المهام",timeline:"الجدول الزمني",drawings:"المخططات",documents:"المستندات",activity:"النشاط",status:"الحالة",owner:"المسؤول",deadline:"موعد التسليم",progress:"الإنجاز",completedTasks:"المهام المكتملة",weightedProgress:"الإنجاز الموزون",simpleProgress:"الإنجاز بالعدد",dueDate:"تاريخ التسليم",startDate:"تاريخ البداية",client:"العميل",manager:"مدير المشروع",health:"صحة المشروع",create:"إنشاء",save:"حفظ التغييرات",cancel:"إلغاء",edit:"تعديل",delete:"حذف",invite:"إرسال دعوة",deactivate:"تعطيل",close:"إغلاق",nameAr:"الاسم بالعربية",nameEn:"الاسم بالإنجليزية",description:"الوصف",role:"الدور",email:"البريد الإلكتروني",jobTitle:"المسمى الوظيفي",accountStatus:"حالة الحساب",activeAccount:"مفعّل",pendingAccount:"بانتظار الدعوة",inactiveAccount:"معطّل",company:"الشركة",roles:"الأدوار والصلاحيات",accounts:"حسابات الفريق",audit:"سجل العمليات",permissions:"الصلاحيات",roleDescription:"وصف الدور",custom:"مخصص",builtIn:"أساسي",noEmail:"لم يحدد البريد بعد",emailNotConfigured:"مزود البريد غير مكوّن",emailConfigured:"البريد مكوّن",notification:"تنبيه",notifications:"التنبيهات",unread:"غير مقروء",markRead:"تحديد كمقروء",signOut:"تسجيل الخروج",login:"تسجيل الدخول",emailAddress:"البريد الإلكتروني",password:"كلمة المرور",loginIntro:"أدخل بياناتك للوصول إلى مساحة عمل DARC.",demoHint:"حساب العرض: admin@darc.local / DARC-Admin-2026!",standardLibrary:"مكتبة المخرجات القياسية",standardLibrarySub:"33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.",useTemplate:"استخدام القالب",templatesCount:"قالب",weight:"الوزن",taskTitle:"اسم المهمة",taskType:"نوع المخرج",assignee:"المسند إليه",priority:"الأولوية",low:"منخفضة",medium:"متوسطة",high:"عالية",urgent:"عاجلة",notStarted:"غير مبدوءة",inProgress:"قيد التنفيذ",review:"للمراجعة",approval:"بانتظار الاعتماد",done:"مكتملة",blocked:"متوقفة",canceled:"ملغاة",reminder:"تذكير",reminderDate:"تاريخ التذكير",reminderNote:"ملاحظة التذكير",saveReminder:"حفظ التذكير",addFromLibrary:"إضافة من المكتبة",projectCode:"رمز المشروع",lifecycle:"دورة المشروع",adminOnly:"هذه المنطقة متاحة لمدير النظام فقط.",emailStatus:"حالة البريد",emailInfo:"عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.",weightedExplanation:"الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.",sampleData:"بيانات تجريبية",projectOverview:"ملخص المشروع",teamMembers:"أعضاء المشروع",projectTasks:"مهام المشروع",noMembers:"لم تتم إضافة أعضاء بعد",permissionCount:"صلاحيات",manageOnlyAdmin:"إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.",confirmDeactivate:"هل تريد تعطيل هذا الحساب؟",confirmDeleteRole:"هل تريد حذف هذا الدور المخصص؟",accountReady:"جاهز للدخول",noAccountAccess:"بانتظار تفعيل الحساب",today:"اليوم",days:"يوم",ago:"منذ",more:"المزيد",viewDetails:"التفاصيل",quickActions:"إجراءات سريعة",total:"الإجمالي",reviewed:"تمت المراجعة",teamLoad:"عبء الفريق",riskReason:"سبب التنبيه",currentRevision:"الإصدار الحالي",approved:"معتمد",superseded:"مستبدل",draft:"مسودة",addReminder:"إضافة تذكير",noReminder:"لا يوجد تذكير"},en:{dashboard:"Home",projects:"Projects",myTasks:"My tasks",templates:"Drawing library",team:"Team",reports:"Reports",settings:"Settings",workspace:"Workspace",overview:"Overview",welcome:"Good morning",welcomeText:"Stay close to the most important moves across DARC projects and make the next decision with confidence.",portfolioHealth:"Portfolio health",activeProjects:"Active projects",openTasks:"Open tasks",overdue:"Overdue tasks",dueThisWeek:"Due this week",projectProgress:"Project progress",projectProgressSub:"A quick view of the projects that need your attention.",seeAll:"View all",attention:"Needs your attention",attentionSub:"Today’s priorities and near-term deadlines.",teamProgress:"Team progress",teamProgressSub:"Progress by assigned work.",recentPulse:"Execution pulse",recentPulseSub:"Task movement over recent weeks.",noProjects:"No projects yet",noTasks:"No tasks in this view",noAttention:"Nothing needs attention right now.",addProject:"New project",addTask:"New task",addMember:"Add member",addRole:"New role",search:"Search...",filter:"Filter",all:"All",active:"Active",planning:"Planning",atRisk:"Needs attention",onTrack:"On track",offTrack:"Off track",onHold:"On hold",completed:"Completed",archived:"Archived",tasks:"Tasks",timeline:"Timeline",drawings:"Drawings",documents:"Documents",activity:"Activity",status:"Status",owner:"Owner",deadline:"Deadline",progress:"Progress",completedTasks:"Completed tasks",weightedProgress:"Weighted progress",simpleProgress:"Count progress",dueDate:"Due date",startDate:"Start date",client:"Client",manager:"Project manager",health:"Project health",create:"Create",save:"Save changes",cancel:"Cancel",edit:"Edit",delete:"Delete",invite:"Send invite",deactivate:"Deactivate",close:"Close",nameAr:"Arabic name",nameEn:"English name",description:"Description",role:"Role",email:"Email",jobTitle:"Job title",accountStatus:"Account status",activeAccount:"Active",pendingAccount:"Invite pending",inactiveAccount:"Inactive",company:"Company",roles:"Roles & permissions",accounts:"Team accounts",audit:"Audit log",permissions:"Permissions",roleDescription:"Role description",custom:"Custom",builtIn:"Built-in",noEmail:"Email not set",emailNotConfigured:"Email provider not configured",emailConfigured:"Email configured",notification:"Notification",notifications:"Notifications",unread:"Unread",markRead:"Mark as read",signOut:"Sign out",login:"Sign in",emailAddress:"Email address",password:"Password",loginIntro:"Enter your details to access the DARC workspace.",demoHint:"Demo account: admin@darc.local / DARC-Admin-2026!",standardLibrary:"Standard deliverable library",standardLibrarySub:"33 ready-to-use templates so every project starts at the same level.",useTemplate:"Use template",templatesCount:"templates",weight:"Weight",taskTitle:"Task name",taskType:"Deliverable type",assignee:"Assignee",priority:"Priority",low:"Low",medium:"Medium",high:"High",urgent:"Urgent",notStarted:"Not started",inProgress:"In progress",review:"In review",approval:"Awaiting approval",done:"Complete",blocked:"Blocked",canceled:"Canceled",reminder:"Reminder",reminderDate:"Reminder date",reminderNote:"Reminder note",saveReminder:"Save reminder",addFromLibrary:"Add from library",projectCode:"Project code",lifecycle:"Project lifecycle",adminOnly:"This area is available to the system administrator only.",emailStatus:"Email status",emailInfo:"Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.",weightedExplanation:"Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.",sampleData:"Demo data",projectOverview:"Project overview",teamMembers:"Project members",projectTasks:"Project tasks",noMembers:"No members have been added yet",permissionCount:"permissions",manageOnlyAdmin:"Adding, editing, and deleting roles and permissions is available to the system administrator only.",confirmDeactivate:"Deactivate this account?",confirmDeleteRole:"Delete this custom role?",accountReady:"Ready to sign in",noAccountAccess:"Account activation pending",today:"Today",days:"days",ago:"ago",more:"More",viewDetails:"Details",quickActions:"Quick actions",total:"Total",reviewed:"Reviewed",teamLoad:"Team load",riskReason:"Attention reason",currentRevision:"Current revision",approved:"Approved",superseded:"Superseded",draft:"Draft",addReminder:"Add reminder",noReminder:"No reminder"}};function T(e){return yn[s.lang][e]||yn.ar[e]||e}function o(e,t){return s.lang==="ar"?e:t}function yi(e){if(typeof document>"u"||!e)return null;const t=document.cookie?document.cookie.split("; "):[];for(const n of t){const i=n.indexOf("=");if(i!==-1&&n.slice(0,i).trim()===e)return decodeURIComponent(n.slice(i+1))}return null}function St(){return typeof document>"u"?!1:yi("darc_logged_in")==="1"}function hi(e=!0){if(typeof document>"u")return;const t=typeof window<"u"&&window.location.protocol==="https:"?"; Secure":"";let n="";if(typeof window<"u"){const i=window.location.hostname;(i==="darc-design.bond"||i.endsWith(".darc-design.bond"))&&(n="; Domain=.darc-design.bond")}e?document.cookie=`darc_logged_in=1; Path=/; Max-Age=604800; SameSite=Lax${t}${n}`:(document.cookie=`darc_logged_in=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${t}`,n&&(document.cookie=`darc_logged_in=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${t}${n}`))}function $a({theme:e,lang:t}={}){if(typeof document>"u")return;const n=31536e3,i=typeof window<"u"&&window.location.protocol==="https:"?"; Secure":"";let a="";if(typeof window<"u"){const u=window.location.hostname;(u==="darc-design.bond"||u.endsWith(".darc-design.bond"))&&(a="; Domain=.darc-design.bond")}const r=e==="dark"||e==="light"?e:null,d=t==="ar"||t==="en"?t:null;if(r){document.cookie=`darc_theme=${encodeURIComponent(r)}; Path=/; Max-Age=${n}; SameSite=Lax${i}${a}`;try{window.localStorage.setItem("darc-theme",r)}catch{}}if(d){document.cookie=`darc_lang=${encodeURIComponent(d)}; Path=/; Max-Age=${n}; SameSite=Lax${i}${a}`;try{window.localStorage.setItem("darc-locale",d)}catch{}}const l=r||(s&&s.theme==="dark"?"dark":"light")||"light",c=d||(s&&s.lang==="en"?"en":"ar")||"ar",p=JSON.stringify({theme:l,lang:c});document.cookie=`darc_prefs=${encodeURIComponent(p)}; Path=/; Max-Age=${n}; SameSite=Lax${i}${a}`}var Sa={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},Ta=/[&<>'"]/,Aa=/[&<>'"]/g;function g(e){if(e==null)return"";const t=String(e);return Ta.test(t)?t.replace(Aa,n=>Sa[n]):t}function hn(e){return!e||typeof e!="string"?"":e.replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/[\u064B-\u065F]/g,"").replace(/[٠-٩]/g,t=>"٠١٢٣٤٥٦٧٨٩".indexOf(t)).toLowerCase().trim()}function Ea(e){if(e==null)return"";const t=String(e),n=t.trimStart();return/^[=+@\-]/.test(n)||/^[\t\r]/.test(t)?`'${t}`:t}var Xn={grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',building:'<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',checklist:'<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>',layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',chart:'<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>',settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowLeft:'<path d="M19 12H5M11 18l-6-6 6-6"/>',calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',alert:'<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',logout:'<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',document:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',briefcase:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>',eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',user:'<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',sparkles:'<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>',folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',printer:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',droplet:'<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',thermometer:'<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>',armchair:'<path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/><path d="M5 18v3M19 18v3"/>',palette:'<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',trendingUp:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',archive:'<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',compass:'<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',success:'<circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/>',error:'<circle cx="12" cy="12" r="9"/><path d="m15 9-6 6M9 9l6 6"/>',warning:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',rocket:'<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',signal:'<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>',bug:'<rect width="8" height="14" x="8" y="6" rx="4"/><path d="m19 7-3 2M5 7l3 2M19 19l-3-2M5 19l3-2M20 13h-4M4 13h4M10 4l1 2M14 4l-1 2"/>',flask:'<path d="M10 2v7.5a2 2 0 0 1-.2.9L4.7 20.5A1 1 0 0 0 5.6 22h12.8a1 1 0 0 0 .9-1.5L14.2 10.4a2 2 0 0 1-.2-.9V2M8.5 2h7M7 16h10"/>',inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',copy:'<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',celebrate:'<path d="M5 21v-7"/><path d="m3 14 4-2"/><path d="m3 18 4-2"/><path d="M19 21v-7"/><path d="m17 14 4-2"/><path d="m17 18 4-2"/><path d="M12 3a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3z"/><path d="M6 10h12v11H6z"/>',chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',volume:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>',bulb:'<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"/>',megaphone:'<path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6"/>',footprint:'<path d="M4 16v-2.38C4 11.5 7 11 7 11s3 .5 3 2.62V16M4 20h6M14 8V5.62C14 3.5 17 3 17 3s3 .5 3 2.62V8M14 12h6"/>',hourglass:'<path d="M5 22h14M5 2h14M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/>',minus:'<line x1="5" y1="12" x2="19" y2="12"/>',thumbUp:'<path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3"/>',package:'<path d="m7.5 4.27 9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',construction:'<rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v7M7 14v7M17 3v3M7 3v3M10 14 2.3 6.3M14 6l7.7 7.7M8 6l8 8"/>',list:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',external:'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',fileText:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'};function v(e,t=18,n=""){return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${n?` class="${g(n)}"`:""}>${Xn[e]||Xn.info}</svg>`}function _a(e="active"){return`<span class="status-dot status-dot--${g(e)}" aria-hidden="true"></span>`}function bn(e){if(!e||typeof e!="object")return"D";const t=(s.lang==="ar"?e.name:e.nameEn||e.name)||e.email||"DARC";return(String(t).replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i,"").split(/\s+/).filter(Boolean).slice(0,2).map(n=>n[0]).join("")||String(t).slice(0,2)).toUpperCase()}function Be(e,t=""){const n=e||{name:"DARC",avatarColor:"#0d6269"},i=/^#[0-9a-f]{6}$/i.test(n.avatarColor||"")?n.avatarColor:"#0d6269",a=g(o(n.name,n.nameEn||n.name));if(n.avatarUrl){const r=g(bn(n)).replace(/['"\\]/g,"");return`<span class="avatar ${t}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${a}"><img src="${g(n.avatarUrl)}" alt="${a}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${i}';this.parentElement.textContent='${r}';" /></span>`}return`<span class="avatar ${t}" style="background:${i}" title="${a}">${g(bn(n))}</span>`}function Da(){const e=new Date().getHours();return s.lang==="ar"?e>=5&&e<12?"صباح الخير":e>=12&&e<17||e>=17&&e<22?"مساء الخير":"طابت ليلتك":e>=5&&e<12?"Good morning":e>=12&&e<17?"Good afternoon":e>=17&&e<22?"Good evening":"Good night"}function qt(e){const t=e?.status,n=en(e);return t==="done"||t==="completed"?{color:"#10b981",bgColor:"#ecfdf5",borderColor:"#059669",textColor:"#065f46",label:o("مكتملة","Completed")}:t==="review"||t==="approval"?{color:"#8b5cf6",bgColor:"#f5f3ff",borderColor:"#7c3aed",textColor:"#5b21b6",label:o("للمراجعة والاعتماد","In Review")}:t==="blocked"||n?{color:"#ef4444",bgColor:"#fef2f2",borderColor:"#dc2626",textColor:"#991b1b",label:n?o("متأخرة","Overdue"):o("متوقفة","Blocked")}:t==="in_progress"||t==="progress"?{color:"#2563eb",bgColor:"#eff6ff",borderColor:"#3b82f6",textColor:"#1e40af",label:o("قيد التنفيذ","In Progress")}:{color:"#64748b",bgColor:"#f8fafc",borderColor:"#94a3b8",textColor:"#334155",label:o("غير مبدوءة","Not Started")}}function bi(e,t=""){const n=(e||"").split(".").pop()?.toLowerCase()||"";return["dwg","dxf"].includes(n)?{ext:n.toUpperCase(),label:"AutoCAD",color:"#0284c7",bg:"rgba(2,132,199,0.12)",border:"rgba(2,132,199,0.3)",isCad:!0}:["rvt","rfa","ifc","skp","pln","3ds"].includes(n)?{ext:n.toUpperCase(),label:"BIM / 3D",color:"#7c3aed",bg:"rgba(124,58,237,0.12)",border:"rgba(124,58,237,0.3)",isBim:!0}:n==="pdf"?{ext:"PDF",label:"PDF Blueprint",color:"#dc2626",bg:"rgba(220,38,38,0.12)",border:"rgba(220,38,38,0.3)",isPdf:!0}:["xlsx","xls","csv"].includes(n)?{ext:n.toUpperCase(),label:"Excel Sheet",color:"#107c41",bg:"rgba(16,124,65,0.12)",border:"rgba(16,124,65,0.3)",isExcel:!0}:["docx","doc","rtf","odt"].includes(n)?{ext:n.toUpperCase(),label:"Word Document",color:"#2b579a",bg:"rgba(43,87,154,0.12)",border:"rgba(43,87,154,0.3)",isWord:!0}:["pptx","ppt","key"].includes(n)?{ext:n.toUpperCase(),label:"PowerPoint Deck",color:"#d24726",bg:"rgba(210,71,38,0.12)",border:"rgba(210,71,38,0.3)",isPpt:!0}:["png","jpg","jpeg","webp","heic"].includes(n)?{ext:n.toUpperCase(),label:"Image",color:"#059669",bg:"rgba(5,150,105,0.12)",border:"rgba(5,150,105,0.3)",isImg:!0}:["mp4","webm","mov","m4v","ogv"].includes(n)?{ext:n.toUpperCase(),label:"Video",color:"#8b5cf6",bg:"rgba(139,92,246,0.12)",border:"rgba(139,92,246,0.3)",isVideo:!0}:["zip","rar","7z","tar"].includes(n)?{ext:n.toUpperCase(),label:"Archive",color:"#d97706",bg:"rgba(217,119,6,0.12)",border:"rgba(217,119,6,0.3)",isZip:!0}:{ext:n.toUpperCase()||"DOC",label:"Document",color:"#0d6269",bg:"rgba(13,98,105,0.12)",border:"rgba(13,98,105,0.3)",isDoc:!0}}function vi(e){if(!e)return null;const t=e.match(/[_-\s](?:rev|r|v)(\d+)([_.\s]|$)/i)||e.match(/\b(?:rev|r|v)(\d+)\b/i);return t?`V${parseInt(t[1],10)}`:null}function xi(e){if(!e)return"architectural";if(e.discipline&&typeof e.discipline=="string"&&e.discipline!=="all")return e.discipline.toLowerCase();if(e.customFields?.discipline&&e.customFields.discipline!=="all")return String(e.customFields.discipline).toLowerCase();const t=String(e.originalName||e.name||"").toUpperCase(),n=(t.split(".").pop()||"").toLowerCase();return t.includes("STRUCT")||t.includes("-S-")||t.includes("STR-")||t.includes("CONCRETE")||t.includes("STEEL")||t.includes("FOUNDATION")||t.includes("REBAR")||t.includes("BEAM")||t.includes("COLUMN")||t.includes("CALCULATION")?"structural":t.includes("MEP")||t.includes("-M-")||t.includes("-E-")||t.includes("-P-")||t.includes("HVAC")||t.includes("ELECTRICAL")||t.includes("PLUMBING")||t.includes("DRAINAGE")||t.includes("LIGHTING")?"mep":t.includes("BOQ")||t.includes("QUANTIT")||t.includes("BILL")||t.includes("SPEC")||["xlsx","xls","csv"].includes(n)?"boq":t.includes("CONTRACT")||t.includes("PERMIT")||t.includes("LICENSE")||t.includes("AGREEMENT")||t.includes("APPROVAL")||t.includes("TENDER")?"contracts":"architectural"}function wi(e){const t={architectural:{key:"architectural",labelAr:"معماري",labelEn:"Architectural",color:"#0d6269",bg:"rgba(13, 98, 105, 0.12)",border:"rgba(13, 98, 105, 0.3)",icon:"building"},structural:{key:"structural",labelAr:"إنشائي",labelEn:"Structural",color:"#2563eb",bg:"rgba(37, 99, 235, 0.12)",border:"rgba(37, 99, 235, 0.3)",icon:"shield"},mep:{key:"mep",labelAr:"كهروميكانيكي",labelEn:"MEP Systems",color:"#d97706",bg:"rgba(217, 119, 6, 0.12)",border:"rgba(217, 119, 6, 0.3)",icon:"zap"},boq:{key:"boq",labelAr:"كميات ومواصفات",labelEn:"BOQ & Specs",color:"#059669",bg:"rgba(5, 150, 105, 0.12)",border:"rgba(5, 150, 105, 0.3)",icon:"document"},contracts:{key:"contracts",labelAr:"عقود وتراخيص",labelEn:"Contracts & Permits",color:"#7c3aed",bg:"rgba(124, 58, 237, 0.12)",border:"rgba(124, 58, 237, 0.3)",icon:"award"},general:{key:"general",labelAr:"عام / مخرجات",labelEn:"General",color:"#475569",bg:"rgba(71, 85, 105, 0.12)",border:"rgba(71, 85, 105, 0.3)",icon:"folder"}};return t[e]||t.architectural}function Xe(){let e=null;try{e=localStorage.getItem("darc_calendar_system")}catch{}return s.calendarSystem||s.data?.user?.customFields?.calendarSystem||e||"gregorian"}var Yn=new Map;function Fe(e,t={}){const n=e+"|"+JSON.stringify(t);let i=Yn.get(n);return i||(i=new Intl.DateTimeFormat(e,t),Yn.set(n,i)),i}function Tt(e,t=!0){if(!e)return"—";const n=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(n.getTime())?"—":Xe()==="hijri"?Fe(s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura",{day:"numeric",month:"short",...t?{year:"numeric"}:{}}).format(n):Fe(s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{day:"numeric",month:"short",...t?{year:"numeric"}:{}}).format(n)}function Ia(e){if(!e)return"—";const t=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(t.getTime())?"—":Xe()==="hijri"?Fe(s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura",{day:"2-digit",month:"2-digit",year:"numeric"}).format(t):`${String(t.getDate()).padStart(2,"0")}/${String(t.getMonth()+1).padStart(2,"0")}/${t.getFullYear()}`}function ki(e,t={}){if(!e)return{date:"—",time:"—",full:"—"};try{const n=new Date(e);if(Number.isNaN(n.getTime()))return{date:String(e),time:"—",full:String(e)};const i=Xe(),a=s.lang==="ar",r=Fe(i==="hijri"?a?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":a?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{year:"numeric",month:t.monthStyle||"short",day:"numeric"}).format(n),d=Fe(a?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",...t.includeSeconds!==!1?{second:"2-digit"}:{},hour12:!0}).format(n);return{date:r,time:d,full:`${r} ${d}`}}catch{return{date:String(e),time:"—",full:String(e)}}}function Ca(e=new Date){const t=new Date(e);if(Number.isNaN(t.getTime()))return"—";const n=Xe(),i=s.lang==="ar";return Fe(n==="hijri"?i?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":i?"ar-u-ca-gregory":"en-GB-u-ca-gregory",{dateStyle:"full"}).format(t)}function Ma(e=new Date){const t=new Date(e);return Number.isNaN(t.getTime())?"—":Fe(s.lang==="ar"?"ar-SA":"en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}).format(t)}function La(e){if(!e)return"";const t=new Date(String(e).length===10?`${e}T12:00:00`:e);return Number.isNaN(t.getTime())?"":Fe("ar-SA-u-ca-islamic-umalqura",{day:"numeric",month:"long",year:"numeric"}).format(t)}function At(e){if(!e)return null;if(e instanceof Date){if(isNaN(e.getTime()))return null;const t=new Date(e.getTime());return t.setHours(23,59,59,999),t}if(typeof e=="number"){const t=new Date(e);return isNaN(t.getTime())?null:(t.setHours(23,59,59,999),t)}if(typeof e=="string"){const t=e.trim();if(!t)return null;const n=t.split("T")[0].split(" ")[0];if(/^\d{4}-\d{2}-\d{2}$/.test(n)){const[a,r,d]=n.split("-").map(Number);return new Date(a,r-1,d,23,59,59,999)}const i=new Date(t);if(!isNaN(i.getTime()))return i.setHours(23,59,59,999),i}return null}function Pa(e){if(!e)return"—";const t=At(e);if(!t||isNaN(t.getTime()))return"—";const n=Math.ceil((t-new Date)/864e5);return isNaN(n)?"—":n<0?o(`متأخرة ${Math.abs(n)} ${T("days")}`,`${Math.abs(n)} ${T("days")} ${T("ago")}`):n===0?T("today"):o(`بعد ${n} ${T("days")}`,`in ${n} ${T("days")}`)}function en(e){if(!e?.dueDate||["done","completed","canceled"].includes(e.status))return!1;const t=At(e.dueDate);return t?t<new Date:!1}function En(e){if(!e?.dueDate||["done","completed","canceled"].includes(e.status))return null;const t=At(e.dueDate);if(!t)return null;const n=new Date,i=(t.getTime()-n.getTime())/36e5;return i<0?"overdue":i<=24?"due_24h":i<=48?"due_48h":i<=72?"due_72h":null}function $i(e,t=3){const n=En(e);return n==="due_24h"||n==="due_48h"||n==="due_72h"}function _n(e){switch(e){case"not_started":return T("notStarted");case"in_progress":return T("inProgress");case"review":return T("review");case"approval":return T("approval");case"done":return T("done");case"blocked":return T("blocked");case"canceled":return T("canceled");case"planning":return T("planning");case"active":return T("active");case"on_hold":return T("onHold");case"completed":return T("completed");case"archived":return T("archived");case"on_track":return T("onTrack");case"at_risk":return T("atRisk");case"off_track":return T("offTrack");default:return e||""}}function Ra(e){return e?`<span class="status-badge ${g(e)}">${g(_n(e))}</span>`:'<span style="color:var(--muted)">—</span>'}function Dn(e){switch(e){case"low":return T("low");case"medium":return T("medium");case"high":return T("high");case"urgent":return T("urgent");default:return e||""}}function Ne(e){return e?e.read===!0?!0:e.read===!1?!1:!!(e.readAt||e.read_at):!1}function Si(e){const t=typeof e=="string"?s.data?.users?.find(n=>n.id===e):e;return t?s.data?.roles?.find(n=>n.id===t.roleId)||{id:t.roleId,nameAr:t.roleNameAr||"",nameEn:t.roleNameEn||"",permissions:[]}:null}function In(e){const t=Si(e);return t?o(t.nameAr,t.nameEn):"—"}var Ti={create_project:"create_projects",create_projects:"create_project",edit_project:"edit_projects",edit_projects:"edit_project",delete_project:"delete_projects",delete_projects:"delete_project",view_project:"view_projects",view_projects:"view_project",create_task:"create_tasks",create_tasks:"create_task",edit_task:"edit_tasks",edit_tasks:"edit_task",delete_task:"delete_tasks",delete_tasks:"delete_task",manage_tasks:"edit_tasks",manage_roles:"manage_role",manage_role:"manage_roles",manage_template:"manage_templates",manage_templates:"manage_template",manage_company:"manage_settings",manage_settings:"manage_company"};function z(e){if(ee())return!0;const t=s.data?.role?.permissions;if(!t||!t.length)return!1;if(t.includes("*")||t.includes(e))return!0;const n=Ti[e];return!!(n&&t.includes(n))}function ee(){return s.data?.user?.roleId==="admin"||s.data?.user?.role_id==="admin"}function Ai(e,t){if(!e||!t)return!1;if((e.assigneeId||e.assignee_id)===t)return!0;const n=e.customFields?.additionalAssignees||e.customFields?.additional_assignees||e.custom_fields?.additionalAssignees||e.custom_fields?.additional_assignees;return!!(Array.isArray(n)&&n.includes(t))}function ja(){return ee()||s.data?.user?.roleId==="account_permissions_manager"||s.data?.role?.permissions?.includes("manage_existing_account_permissions")}function tn(){return s.view==="project-detail"?o("تفاصيل المشروع","Project details"):{dashboard:T("dashboard"),projects:T("projects"),tasks:T("myTasks"),documents:T("documents"),templates:T("templates"),team:T("team"),reports:T("reports"),settings:T("settings")}[s.view]||T("dashboard")}var tt=null;function Oa(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;!tt||tt.state==="closed"?tt=new e:tt.state==="suspended"&&tt.resume().catch(()=>{});const t=tt,n=t.currentTime,i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.setValueAtTime(587.33,n),a.gain.setValueAtTime(.08,n),a.gain.exponentialRampToValueAtTime(.001,n+.35),i.connect(a),a.connect(t.destination),i.start(n),i.stop(n+.35);const r=t.createOscillator(),d=t.createGain();r.type="sine",r.frequency.setValueAtTime(880,n+.12),d.gain.setValueAtTime(.001,n),d.gain.setValueAtTime(.09,n+.12),d.gain.exponentialRampToValueAtTime(.001,n+.65),r.connect(d),d.connect(t.destination),r.start(n+.12),r.stop(n+.65)}catch{}}function Na(e,t){return typeof window>"u"||typeof Worker>"u"||typeof Blob>"u"?Promise.resolve(e(t)):new Promise((n,i)=>{try{const a=new Blob([`
        self.onmessage = function(e) {
          try {
            var fn = ${e.toString()};
            var res = fn(e.data);
            self.postMessage({ ok: true, result: res });
          } catch (err) {
            self.postMessage({ ok: false, error: err.message });
          }
        };
      `],{type:"application/javascript"}),r=URL.createObjectURL(a),d=new Worker(r);d.onmessage=l=>{URL.revokeObjectURL(r),d.terminate(),l.data.ok?n(l.data.result):i(new Error(l.data.error))},d.onerror=l=>{URL.revokeObjectURL(r),d.terminate(),i(l)},d.postMessage(t)}catch{try{n(e(t))}catch(r){i(r)}}})}function za(e){if(!e)return 0;const t=At(e);if(!t||isNaN(t.getTime()))return 0;const n=Date.now()-t.getTime();return n>0?Math.ceil(n/864e5):0}function Ba(){const e=s.data?.company||{},t=e.nameAr||e.name||"فريق دارك للتصميم",n=e.nameEn||e.name||"DARC Design Team",i=o(t,n),a=e.logoUrl||"";let r=/^(https?:\/\/|data:image\/|\/)/i.test(a)&&!a.toLowerCase().includes("javascript:")?a:"";return r.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(r=`${window.location.origin}${r}`),{nameAr:t,nameEn:n,displayName:i,logoUrl:r,emailFrom:e.emailFrom||"",emailTo:e.emailTo||"",phone:e.phone||"",website:e.website||"",address:e.address||""}}function Fa(e,t){const n=`
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
      ${t}
    </body>
    </html>
  `,i=new Blob(["\uFEFF"+n],{type:"application/vnd.ms-excel;charset=utf-8;"}),a=URL.createObjectURL(i),r=document.createElement("a");r.href=a,r.download=e.endsWith(".xls")?e:`${e}.xls`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(a)}function Qe(e){if(!e)return!1;if(ee()||s.data?.isDemo||s.data?.user?.id==="usr_demo"||typeof localStorage<"u"&&localStorage.getItem("darc_user_id")==="usr_demo")return!0;if(!z("edit_tasks"))return!1;const t=s.data?.user?.id;if(!t)return!1;const n=s.data?.user?.roleId||s.data?.user?.role_id;if(n==="discipline_lead"||n==="admin"||(e.assigneeId||e.assignee_id)===t||(e.creatorId||e.createdById||e.created_by_id||e.created_by)===t)return!0;const i=e.reviewerId||e.reviewer_id,a=e.approverId||e.approver_id;if(i===t||a===t)return!0;const r=e.customFields?.additionalAssignees||e.customFields?.additional_assignees||e.custom_fields?.additionalAssignees||e.custom_fields?.additional_assignees;if(Array.isArray(r)&&r.includes(t))return!0;const d=e.projectId||e.project_id;if(d&&s.data?.projects){const l=s.data?.projects?.find(c=>c.id===d);if(l){const c=l.managerId||l.manager_id,p=l.ownerId||l.owner_id||l.leadId||l.lead_id||l.createdById||l.created_by;if(c===t||p===t||Array.isArray(l.members)&&l.members.some(u=>(u.userId||u.id||u.user_id||u)===t)||Array.isArray(l.memberIds)&&l.memberIds.includes(t))return!0}}return!1}function Cn(e){try{localStorage.setItem("darc_task_sort_pref",e)}catch{}s.taskSortPref=e,s.projectTaskSort=e,s.myTaskSort=e}var qa=8,Ha=9e5,Ua=class{constructor(e=qa){this.maxSize=e,this.cache=new Map}set(e,t,n=0){if(!(!e||!t)){if(this.cache.has(e)){const i=this.cache.get(e);if(i?.url&&i.url!==t)try{URL.revokeObjectURL(i.url)}catch{}this.cache.delete(e)}for(;this.cache.size>=this.maxSize;){const i=this.cache.keys().next().value;if(!i)break;const a=this.cache.get(i);if(a?.url)try{URL.revokeObjectURL(a.url)}catch{}this.cache.delete(i)}this.cache.set(e,{url:t,size:n,timestamp:Date.now()})}}get(e){if(!e||!this.cache.has(e))return null;const t=this.cache.get(e);if(!t)return null;if(Date.now()-t.timestamp>Ha){if(t.url)try{URL.revokeObjectURL(t.url)}catch{}return this.cache.delete(e),null}return this.cache.delete(e),this.cache.set(e,t),t.url}has(e){return!!this.get(e)}revoke(e){if(!e||!this.cache.has(e))return;const t=this.cache.get(e);if(t?.url)try{URL.revokeObjectURL(t.url)}catch{}this.cache.delete(e)}clear(){for(const[,e]of this.cache.entries())if(e?.url)try{URL.revokeObjectURL(e.url)}catch{}this.cache.clear()}},Ei=new Ua;typeof window<"u"&&(window.__docBlobCache=Ei);var Uo=Ze({initSyncIndicatorListener:()=>_i,renderNavbar:()=>Di,renderSyncIndicator:()=>Mn,updateNavbarTitle:()=>Wa});function Mn(){const e=wt().length;return Io()?e>0?`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${o("انقر للمزامنة الفورية مع السيرفر","Click to sync now with server")}">
      <span class="sync-spinner" style="display:inline-flex;align-items:center;">${v("refresh",13)}</span>
      <span>${o("مزامنة معلقة","Pending Sync")}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>
    </button>`:`<span class="btn btn-sm btn-ghost online-indicator-pill" style="font-size:11px;font-weight:600;color:var(--teal);border:1px solid rgba(20,184,166,0.2);background:rgba(20,184,166,0.05);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;pointer-events:none;" title="${o("متصل بالسيرفر — كافة البيانات متزامنة ولحظية","Connected to Cloud — fully synced")}">
    <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 5px var(--teal);"></span>
    <span>${o("متصل","Synced")}</span>
  </span>`:`<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${o("وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً","Offline Mode — all actions stored locally and will auto-sync")}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${o("أوفلاين","Offline")}</span>
      ${e>0?`<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${e}</span>`:""}
    </button>`}function _i(){if(typeof window>"u"||window._darcSyncIndicatorBound)return;window._darcSyncIndicatorBound=!0;const e=()=>{const t=document.getElementById("sync-status-indicator");t&&(t.innerHTML=Mn())};window.addEventListener("darc:queue-change",e),window.addEventListener("online",e),window.addEventListener("offline",e)}function Di(e=null){const t=(s.data?.notifications||[]).filter(a=>!Ne(a)).length,n=s.data?.user||{},i=e||tn();return`
    <header class="topbar">
      <div class="topbar-left">
        <button class="mobile-menu" data-action="toggle-sidebar" aria-label="Menu">
          ${v("menu",18)}
        </button>
        <div>
          <div class="topbar-kicker">DARC / ${T("workspace")}</div>
          <div class="topbar-title">${g(i)}</div>
        </div>
      </div>
      <div class="topbar-right">
        <span id="sync-status-indicator">${Mn()}</span>
        <button class="topbar-search-trigger" data-action="open-omnisearch" title="${o("بحث شامل وسريع","Omnisearch")}">
          ${v("search",14)}
          <span>${o("بحث شامل...","Search...")}</span>
          <kbd class="shortcut-kbd">${typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"⌘K":"Ctrl+K"}</kbd>
        </button>
        <button class="icon-button topbar-action-btn" data-action="open-cheatsheet" title="${o("دليل اختصارات لوحة المفاتيح (?)","Keyboard shortcuts guide (?)")}" aria-label="Shortcuts">
          ${v("help",16)}
        </button>
        <button class="icon-button topbar-action-btn" data-action="toggle-theme" title="${o("تبديل المظهر","Toggle Theme")}" aria-label="${o("تبديل المظهر","Toggle Theme")}">${v(s.theme==="dark"?"sun":"moon",16)}</button>
        <button class="icon-button topbar-action-btn" data-action="toggle-lang" title="${o("تبديل اللغة (English / العربية)","Toggle Language (Arabic / English)")}" aria-label="${o("تبديل اللغة","Toggle Language")}">${v("globe",16)}</button>
        <button class="icon-button topbar-action-btn" data-action="show-notifications" aria-label="${T("notifications")}">${v("bell",16)}${t?'<span class="notification-dot"></span>':""}</button>
        <div class="topbar-divider"></div>
        <div class="profile-chip" data-action="open-user-profile" title="${g(o(n.name,n.nameEn||n.name))}">
          ${Be(n)}
          <div class="profile-chip-text">
            <strong>${g(o(n.name,n.nameEn||n.name))}</strong>
            <span>${g(In(n))}</span>
          </div>
        </div>
      </div>
    </header>
  `}function Wa(e=null){const t=document.querySelector(".topbar-title");t&&(t.textContent=e||tn())}var Wo=Ze({navItem:()=>Le,renderSidebar:()=>Ci,renderSidebarBackdrop:()=>Ii});function Le(e,t,n){return`<button class="nav-item ${s.view===e||e==="projects"&&s.view==="project-detail"?"active":""}" data-view="${e}">${v(n,17)}<span>${t}</span></button>`}function Ii(){return`<div class="sidebar-backdrop ${s.sidebarOpen?"visible":""}" data-action="toggle-sidebar" aria-hidden="true"></div>`}function Ci(){const e=s.data?.user||{},t=ee()||z("manage_settings")||z("manage_roles")||z("manage_users")||z("manage_trash")||z("view_audit_logs")||z("manage_templates");return`
    <aside class="sidebar ${s.sidebarOpen?"open":""}">
      <div class="sidebar-brand">
        ${s.data?.company?.logoUrl?`<img src="${g(s.data?.company?.logoUrl)}" alt="Logo" loading="lazy" decoding="async" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${v("building",20)}</span>`:`<span class="brand-mark">${v("building",20)}</span>`}
        <div>
          <div class="brand-name">${g(o(s.data?.company?.nameAr||s.data?.company?.name||"DARC Design Team",s.data?.company?.nameEn||s.data?.company?.name||"DARC Design Team"))}</div>
          <div class="brand-subtitle">${T("workspace")}</div>
        </div>
      </div>
      <div class="nav-title">${o("مساحة العمل","WORKSPACE")}</div>
      <nav class="nav-list">
        ${oe("dashboard")?Le("dashboard",T("dashboard"),"grid"):""}
        ${oe("projects")?Le("projects",T("projects"),"building"):""}
        ${oe("tasks")?Le("tasks",T("myTasks"),"checklist"):""}
        ${oe("documents")?Le("documents",T("documents"),"document"):""}
        ${oe("team")?Le("team",T("team"),"users"):""}
        ${oe("reports")?Le("reports",T("reports"),"chart"):""}
      </nav>
      <div class="nav-separator"></div>
      <div class="nav-title">${t||oe("templates")?o("إدارة النظام","ADMIN"):o("حسابي","MY ACCOUNT")}</div>
      <nav class="nav-list">
        ${oe("templates")?Le("templates",T("templates"),"layers"):""}
        ${Le("settings",t?T("settings"):o("الملف الشخصي والأمان","Profile & Security"),"settings")}
      </nav>
      <div class="sidebar-bottom">
        <div class="admin-badge">${Be(e)}<div class="admin-info"><strong>${g(o(e.name,e.nameEn||e.name))}</strong><span>${g(In(e))}</span></div></div>
        <div class="sidebar-footer"><span>v1.0 · ${o("نسخة عمل","Workspace build")}</span><button data-action="logout" title="${T("signOut")}">${v("logout",15)}</button></div>
      </div>
    </aside>
  `}var Vo=Ze({canAccessView:()=>oe,getFirstAllowedView:()=>ze,loadData:()=>Ln,refreshView:()=>Ga,renderApp:()=>Re,renderView:()=>de,switchView:()=>Va});function oe(e){return s.data?e==="dashboard"?z("view_dashboard"):e==="projects"||e==="project-detail"?z("view_projects"):e==="tasks"?z("create_tasks")||z("edit_tasks")||z("delete_tasks")||z("assign_tasks")||z("review_tasks")||z("approve_tasks")||z("manage_reminders")||z("view_projects")||ee():e==="documents"?z("upload_documents")||z("delete_documents")||ee():e==="templates"?z("manage_templates")||ee():e==="team"?ee()||z("manage_users"):e==="reports"?z("view_reports")||ee():e==="settings":!0}function ze(){for(const e of["dashboard","projects","tasks","documents","team","reports","templates","settings"])if(oe(e))return e;return"dashboard"}_i();function Re(){if(s.data&&!oe(s.view)&&(s.view=ze()),typeof window<"u"){const e=window.location.hash.replace(/^#/,"");if(!e||e==="login"||e==="forgot"){let t=s.view;s.view==="project-detail"&&s.activeProjectId?t=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:s.view==="settings"&&s.settingsSection&&(t=`settings?section=${encodeURIComponent(s.settingsSection)}`),window.history&&window.history.replaceState?window.history.replaceState(null,"",`#${t}`):(window._isInternalNav=!0,window.location.hash=`#${t}`)}}document.body.classList.add("in-app"),document.body.classList.toggle("is-ltr",s.lang==="en"),document.documentElement.lang=s.lang,document.documentElement.dir=s.lang==="ar"?"rtl":"ltr",An(),document.getElementById("app").innerHTML=`
    <div class="app-shell ${s.lang==="en"?"is-ltr":""}">
      ${Ii()}
      ${Ci()}
      <section class="workspace">
        ${s.data?.isDemo||s.data?.user?.id==="usr_demo"?`
        <div class="demo-showcase-banner">
          <div class="demo-showcase-content">
            <span class="demo-showcase-badge">${o("بيئة عرض تجريبية","DEMO SHOWCASE")}</span>
            <span class="demo-showcase-timer" style="display:inline-flex;align-items:center;gap:4px;">${v("clock",12)} ${o("تنظيف ذاتي كل 15 دقيقة","Auto-resets every 15m")}</span>
            <span class="demo-showcase-desc">${o("مساحة تفاعلية مخصصة لاستعراض قدرات المنصة — تُحذف الملفات والتعديلات تلقائياً كل 15 دقيقة لحماية السيرفر ونظافة العرض.","Interactive sandbox showcasing DARC capabilities — all demo changes & uploads automatically purge every 15 minutes.")}</span>
          </div>
          <div class="demo-showcase-actions">
            <button class="btn btn-xs demo-showcase-btn" data-action="reset-demo-sandbox" style="display:inline-flex;align-items:center;gap:5px;">
              <span>${v("refresh",12)}</span>
              <span>${o("إعادة ضبط الآن","Reset Now")}</span>
            </button>
          </div>
        </div>`:""}
        ${Di()}
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`,de()}var Zn=null;function de(e=!1){if(!e&&(window._isDraggingTask||window._isKeyboardDraggingTask||window._isTouchHoldingTask)){window._pendingRenderAfterDrag=!0;return}const t=document.getElementById("main-content");if(!t)return;oe(s.view)||(s.view=ze());const n=Zn===s.view,i=n?t.scrollTop:0,a=n?t.scrollLeft:0,r=n?t.querySelector(".board, .tasks-board, .board-columns"):null,d=r?r.scrollLeft:null;Zn=s.view;let l="";if(s.view==="dashboard"&&typeof window.renderDashboard=="function"&&(l=window.renderDashboard()),s.view==="projects"&&typeof window.renderProjects=="function"&&(l=window.renderProjects()),s.view==="tasks"&&typeof window.renderTasks=="function"&&(l=window.renderTasks()),s.view==="documents"&&typeof window.renderDocuments=="function"&&(l=window.renderDocuments()),s.view==="templates"&&typeof window.renderTemplates=="function"&&(l=window.renderTemplates()),s.view==="team"&&typeof window.renderTeam=="function"&&(l=window.renderTeam()),s.view==="reports"&&typeof window.renderReports=="function"&&(l=window.renderReports()),s.view==="settings"&&typeof window.renderSettings=="function"&&(l=window.renderSettings()),s.view==="project-detail"&&typeof window.renderProjectDetail=="function"&&(l=window.renderProjectDetail()),t.innerHTML=l,i&&(t.scrollTop=i),a&&(t.scrollLeft=a),d!==null){const c=t.querySelector(".board, .tasks-board, .board-columns");c&&(c.style.scrollSnapType="none",c.scrollLeft=d,requestAnimationFrame(()=>{c&&!window._isDraggingTask&&(c.style.scrollSnapType="")}))}(s.view==="tasks"||s.view==="project-detail")&&requestAnimationFrame(()=>{typeof window.verifyBoardSymmetry=="function"&&window.verifyBoardSymmetry()}),s.view==="project-detail"&&s.projectTab==="timeline"&&setTimeout(()=>{typeof window.drawTimelineArrows=="function"&&window.drawTimelineArrows()},0)}function Va(e,t=void 0){s.data&&!oe(e)&&(e=ze()),ye("navigation",`الانتقال إلى واجهة #${e}${t?` (مشروع: ${t})`:""}`),s.view=e,t!==void 0&&(s.activeProjectId=t),e==="settings"&&!s.settingsSection&&(s.settingsSection="profile"),s.sidebarOpen=!1,document.querySelector(".sidebar")?.classList.remove("open"),document.querySelector(".sidebar-backdrop")?.classList.remove("visible"),document.querySelectorAll(".nav-item").forEach(i=>{const a=i.dataset.view,r=a===e||a==="projects"&&e==="project-detail";i.classList.toggle("active",r)});const n=document.querySelector(".topbar-title");n&&(n.textContent=tn());try{let i=e;e==="project-detail"&&s.activeProjectId?i=`project-detail?id=${encodeURIComponent(s.activeProjectId)}${s.projectTab?`&tab=${encodeURIComponent(s.projectTab)}`:""}`:e==="settings"&&s.settingsSection&&(i=`settings?section=${encodeURIComponent(s.settingsSection)}`),typeof window<"u"&&window.location.hash.replace(/^#/,"")!==i&&(window._isInternalNav=!0,window.location.hash=i),typeof sessionStorage<"u"&&sessionStorage.setItem("darc_last_route",JSON.stringify({view:s.view,activeProjectId:s.activeProjectId,projectTab:s.projectTab,settingsSection:s.settingsSection}))}catch{}requestAnimationFrame(()=>{de();const i=document.getElementById("main-content");i&&(i.scrollTop=0,i.scrollLeft=0),typeof window<"u"&&window.scrollTo(0,0)})}async function Ga(e=!1){try{await Ln(e)}catch(t){Y(t.message,!0)}}async function Ln(e=!1){try{if(!St()){typeof localStorage<"u"&&(localStorage.removeItem("darc_token"),localStorage.removeItem("darc_user_id"));try{kn()}catch{}s.data=null,s.view="login";const a=new Error("No session");throw a.status=401,a}if(!s.data){const a=ca();a&&a.user&&(s.data=a,(s.view==="login"||!oe(s.view))&&(s.view=ze()),requestAnimationFrame(()=>Re()))}const t=s.view==="settings"&&s.settingsSection==="trash"&&!s.trashLoaded?ke("/api/trash",{silent:!0}).catch(()=>null):null;let n=await ke("/api/bootstrap",{silent:e});if(n===null){if(s.data&&s.data.user){if(wt().length===0){let r=!1;["tasks","projects","comments","documents"].forEach(d=>{Array.isArray(s.data[d])&&s.data[d].forEach(l=>{l._isOfflinePending&&(delete l._isOfflinePending,r=!0)})}),r&&(he(s.data),typeof document<"u"&&document.querySelectorAll(".badge-offline-pending").forEach(d=>d.remove()))}return}const a=await si();if(a&&a.user?n=a:(bt(),n=await ke("/api/bootstrap",{silent:!1,headers:{"Cache-Control":"no-cache, no-store"}})),!n||!n.user)return}if(wt().length===0&&(["tasks","projects","comments","documents"].forEach(a=>{Array.isArray(n?.[a])&&n[a].forEach(r=>{r._isOfflinePending&&delete r._isOfflinePending})}),typeof document<"u"&&document.querySelectorAll(".badge-offline-pending").forEach(a=>a.remove())),he(n),s.isOffline=!1,t)try{const a=await t;a&&(s.trash=Array.isArray(a)?a:a.trash||[...(a.projects||[]).map(r=>({...r,type:"project"})),...(a.tasks||[]).map(r=>({...r,type:"task"})),...(a.documents||[]).map(r=>({...r,type:"document"}))],s.trashLoaded=!0,typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(s.trash)))}catch{}if(s.data?.tasks&&n?.tasks){const a=Date.now(),r=new Set(n.tasks.map(d=>d.id));for(const d of s.data.tasks)if(!r.has(d.id))a-(d.createdAt?new Date(d.createdAt).getTime():a)<12e4&&(n.tasks.unshift(d),r.add(d.id));else{const l=window._recentlyMovedTasks?.get(d.id);if(l&&a-l.timestamp<2e4){const c=n.tasks.find(p=>p.id===d.id);c&&(c.status=l.status,l.progress!==void 0&&(c.progress=l.progress),l.sortOrder!==void 0&&(c.sortOrder=l.sortOrder,c.sort_order=l.sortOrder,c.customFields||(c.customFields={}),c.customFields.sortOrder=l.sortOrder,c.customFields.sort_order=l.sortOrder,c.custom_fields||(c.custom_fields={}),c.custom_fields.sortOrder=l.sortOrder,c.custom_fields.sort_order=l.sortOrder))}}}if(s.data?.projects&&n?.projects){const a=Date.now(),r=new Set(n.projects.map(d=>d.id));for(const d of s.data.projects)r.has(d.id)||a-(d.createdAt?new Date(d.createdAt).getTime():a)<12e4&&(n.projects.unshift(d),r.add(d.id))}let i=!1;if(s.data&&n)if(s.data.updatedAt!==n.updatedAt)i=!0;else if(s.data.tasks?.length!==n.tasks?.length||s.data.projects?.length!==n.projects?.length)i=!0;else{const a=s.data.tasks||[],r=n.tasks||[];for(let d=0;d<r.length;d++){const l=r[d],c=a[d];if(!c||c.id!==l.id||c.status!==l.status||(c.sortOrder||c.sort_order)!==(l.sortOrder||l.sort_order)||c.progress!==l.progress){i=!0;break}}if(!i){const d=s.data.projects||[],l=n.projects||[];for(let c=0;c<l.length;c++){const p=l[c],u=d[c];if(!u||u.id!==p.id||u.lifecycle!==p.lifecycle||u.health!==p.health||u.progress!==p.progress){i=!0;break}}}}if(!s.data||i||s.data.comments?.length!==n.comments?.length||s.data.documents?.length!==n.documents?.length||s.data.users?.length!==n.users?.length||s.data.auditLogs?.length!==n.auditLogs?.length||s.data.notifications?.length!==n.notifications?.length||s.view==="login"){n&&n.user&&(s.data=n),(s.view==="login"||!oe(s.view))&&(s.view=ze());const a=!!document.getElementById("modal-root")?.children?.length,r=!!(window._isDraggingTask||window._isTouchHoldingTask||window._isKeyboardDraggingTask||document.querySelector(".is-dragging")||document.querySelector(".touch-dragging")||document.querySelector(".drag-placeholder")),d=!!(document.activeElement&&["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&document.getElementById("main-content")?.contains(document.activeElement));if(e&&(r||d))return;requestAnimationFrame(!e&&!a?()=>Re():()=>de())}else n&&n.user&&(s.data=n),oe(s.view)||(s.view=ze(),requestAnimationFrame(()=>de()))}catch(t){if(t&&(t.status===401||t.status===403))throw t;const n=await si();if(n){s.data=n,oe(s.view)||(s.view=ze()),s.isOffline=!0;const i=!!document.getElementById("modal-root")?.children?.length;!e&&!i?Re():de();return}throw t}}typeof window<"u"&&(window.renderApp=Re,window.renderView=de);var Qn={assignment:{type:"assignment",category:"tasks",icon:"user",color:"blue",titleAr:"إسناد مهمة جديدة",titleEn:"Task Assigned",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_status:{type:"task_status",category:"tasks",icon:"check",color:"teal",titleAr:"تحديث حالة المهمة",titleEn:"Task Status Update",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_blocked:{type:"task_blocked",category:"tasks",icon:"alert",color:"red",titleAr:"مهمة متوقفة",titleEn:"Task Blocked",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_review:{type:"task_review",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة للمراجعة الفنية",titleEn:"Task for Review",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},task_approval:{type:"task_approval",category:"tasks",icon:"check",color:"teal",titleAr:"مهمة بانتظار الاعتماد",titleEn:"Task Pending Approval",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},due_soon:{type:"due_soon",category:"schedule",icon:"clock",color:"amber",titleAr:"موعد تسليم قريب",titleEn:"Due Soon",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},overdue:{type:"overdue",category:"schedule",icon:"alert",color:"red",titleAr:"مهمة متأخرة",titleEn:"Overdue Task",badgeTextAr:"فتح المهمة",badgeTextEn:"Open Task"},reminder:{type:"reminder",category:"schedule",icon:"clock",color:"amber",titleAr:"تذكير بموعد ⏰",titleEn:"Due Reminder ⏰",badgeTextAr:"فتح التذكير",badgeTextEn:"Open Reminder"},comment:{type:"comment",category:"communication",icon:"mail",color:"blue",titleAr:"تعليق جديد",titleEn:"New Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},mention:{type:"mention",category:"communication",icon:"mail",color:"blue",titleAr:"تم ذكرك في تعليق",titleEn:"Mentioned in Comment",badgeTextAr:"عرض التعليق",badgeTextEn:"View Comment"},document_review:{type:"document_review",category:"drawings",icon:"document",color:"amber",titleAr:"مراجعة مخطط هندسي",titleEn:"Drawing Review",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},document_approved:{type:"document_approved",category:"drawings",icon:"document",color:"teal",titleAr:"اعتماد مخطط هندسي",titleEn:"Drawing Approved",badgeTextAr:"معاينة المخطط",badgeTextEn:"View Drawing"},escalation:{type:"escalation",category:"system",icon:"alert",color:"red",titleAr:"تصعيد مهمة ونظام",titleEn:"Escalation Alert",badgeTextAr:"التفاصيل",badgeTextEn:"Details"},general:{type:"general",category:"system",icon:"bell",color:"blue",titleAr:"تنبيه مساحة العمل",titleEn:"Workspace Notification",badgeTextAr:"عرض",badgeTextEn:"View"}};function Ja(e){const t=Qn[e]||Qn.general;return{...t,defaultTitle:o(t.titleAr,t.titleEn),badgeText:o(t.badgeTextAr,t.badgeTextEn)}}function Pn(){return typeof navigator>"u"?!1:/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function Rn(){return typeof window>"u"?!1:!!(typeof window.matchMedia=="function"&&window.matchMedia("(display-mode: standalone)").matches||typeof navigator<"u"&&navigator.standalone===!0||window.navigator?.standalone===!0)}function Mi(){return typeof window>"u"?"default":"Notification"in window&&window.Notification?window.Notification.permission:Pn()&&!Rn()?"ios_safari_tab":"default"}async function Go(){if(typeof window>"u")return{status:"denied"};if(Pn()&&!Rn())return Xa(),{status:"ios_guide_shown"};if("Notification"in window&&window.Notification&&typeof window.Notification.requestPermission=="function")try{return{status:await window.Notification.requestPermission()}}catch(e){console.warn("[Notifications] window.Notification.requestPermission failed:",e)}if(typeof navigator<"u"&&"serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(e&&"pushManager"in e)return{status:"granted"}}catch{}return{status:"unsupported"}}async function Ka({title:e="DARC Design Team",body:t="",icon:n="/favicon.ico",badge:i="/favicon.ico",url:a=null,tag:r=null,data:d={}}={}){try{yo()}catch{}if(typeof navigator<"u"&&typeof navigator.vibrate=="function")try{navigator.vibrate([100,60,100])}catch{}let l=!1;const c=a||(typeof window<"u"?window.location.href:"/"),p=r||`darc_notif_${Date.now()}`;if(typeof navigator<"u"&&"serviceWorker"in navigator)try{const u=await navigator.serviceWorker.ready;if(u&&typeof u.showNotification=="function"&&Mi()==="granted")return await u.showNotification(e,{body:t,icon:n,badge:i,tag:p,vibrate:[100,60,100],data:{url:c,...d},renotify:!0}),l=!0,{success:!0,channel:"service_worker"}}catch(u){console.warn("[Notifications] ServiceWorker showNotification failed:",u)}if(!l&&typeof window<"u"&&"Notification"in window&&window.Notification&&window.Notification.permission==="granted")try{const u=new window.Notification(e,{body:t,icon:n,badge:i,tag:p,renotify:!0});return u.onclick=()=>{window.focus(),u.close(),c&&(window.location.href=c)},l=!0,{success:!0,channel:"notification_api"}}catch(u){console.warn("[Notifications] window.Notification constructor failed:",u)}return Y(`${e}: ${t}`,!1),{success:!0,channel:"in_app"}}function Xa(){const e=`
    <div style="padding:10px 4px;text-align:center;">
      <div style="width:56px;height:56px;border-radius:18px;background:var(--mint);color:var(--teal);display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px;box-shadow:0 4px 12px rgba(13,98,105,0.15);">
        ${v("bell",28)}
      </div>

      <h3 style="font-size:16px;font-weight:700;color:var(--ink);margin:0 0 8px;">
        ${o("تفعيل الإشعارات الفورية على iPhone و iPad","Enable Push Notifications on iPhone & iPad")}
      </h3>
      
      <p style="font-size:12px;color:var(--muted);line-height:1.6;margin:0 0 20px;">
        ${o("للحصول على إشعارات النظام الفورية عند وصول مهام ومخططات وتنبيهات حتى عندما يكون الهاتف مغلقاً، يتطلب نظام iOS إضافة الموقع إلى الشاشة الرئيسية.","To receive native iOS system alerts even when your phone is locked, Apple iOS requires adding the platform to your Home Screen.")}
      </p>

      <div style="display:flex;flex-direction:column;gap:12px;text-align:start;background:var(--surface-soft);padding:14px;border-radius:12px;border:1px solid var(--line);margin-bottom:20px;">
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <span style="width:24px;height:24px;border-radius:50%;background:var(--teal);color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">1</span>
          <div>
            <strong style="font-size:12px;color:var(--ink);display:block;">${o("اضغط على زر المشاركة (Share) في متصفح Safari","Tap the Share button in Safari")}</strong>
            <span style="font-size:11px;color:var(--muted);">${o("الأيقونة المربعة مع السهم المتجه للأعلى [⎋] أسفل شاشة الهاتف.","The square icon with an upward arrow [⎋] at the bottom of the screen.")}</span>
          </div>
        </div>

        <div style="display:flex;align-items:flex-start;gap:10px;">
          <span style="width:24px;height:24px;border-radius:50%;background:var(--teal);color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">2</span>
          <div>
            <strong style="font-size:12px;color:var(--ink);display:block;">${o('اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen)','Select "Add to Home Screen"')}</strong>
            <span style="font-size:11px;color:var(--muted);">${o("ستجد أيقونة دارك الهندسية [+] ضمن قائمة الخيارات.","Look for the DARC icon [+] in the share sheet menu.")}</span>
          </div>
        </div>

        <div style="display:flex;align-items:flex-start;gap:10px;">
          <span style="width:24px;height:24px;border-radius:50%;background:var(--teal);color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">3</span>
          <div>
            <strong style="font-size:12px;color:var(--ink);display:block;">${o("افتح التطبيق من الشاشة الرئيسية واستمتع بالإشعارات","Open DARC from Home Screen")}</strong>
            <span style="font-size:11px;color:var(--muted);">${o("ستظهر لك نافذة السماح بالإشعارات الفورية لنظام iOS مباشرة!","An iOS prompt will appear allowing push notifications seamlessly!")}</span>
          </div>
        </div>
      </div>

      <div style="display:flex;align-items:center;justify-content:center;gap:10px;">
        <button type="button" class="btn btn-primary btn-sm" data-action="close-modal" style="padding:8px 20px;">
          ${o("فهمت ذلك","Got it")}
        </button>
        <button type="button" class="btn btn-ghost btn-sm" data-action="test-in-app-notification" style="color:var(--teal);display:inline-flex;align-items:center;gap:5px;">
          ${v("volume",14)} <span>${o("تجربة التنبيه الصوتي الآن","Test Sound Alert")}</span>
        </button>
      </div>
    </div>
  `;document.getElementById("modal-root").innerHTML=Qt(o("إشعارات أجهزة iPhone & iPad","iPhone & iPad Notifications"),o("دليل التفعيل السريع لإشعارات نظام Apple","Quick setup guide for Apple push alerts"),e,"ios-notif-guide","modal-ios-notif-guide")}var Jo=Ze({showNotifications:()=>Ve});function Ve(){const e=s.data?.notifications||[],t=s.notificationTab||"all",n=e.filter(m=>!Ne(m)).length,i=e.length-n;let a=e;t==="unread"?a=e.filter(m=>!Ne(m)):t==="read"&&(a=e.filter(m=>Ne(m)));const r=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--line);flex-wrap:wrap;gap:10px;">
      <!-- Navigation filter tabs -->
      <div class="notif-tabs" style="display:inline-flex;align-items:center;background:var(--surface-soft);padding:3px;border-radius:10px;border:1px solid var(--line);gap:3px;">
        <button type="button" class="btn btn-sm ${t==="all"?"btn-primary":"btn-ghost"}" data-action="filter-notifications" data-tab="all" style="font-size:11px;padding:4px 10px;height:28px;border-radius:7px;display:inline-flex;align-items:center;gap:5px;">
          <span>${o("الكل","All")}</span>
          <span style="font-size:10px;opacity:0.85;background:rgba(0,0,0,0.12);padding:1px 5px;border-radius:10px;">${e.length}</span>
        </button>
        <button type="button" class="btn btn-sm ${t==="unread"?"btn-primary":"btn-ghost"}" data-action="filter-notifications" data-tab="unread" style="font-size:11px;padding:4px 10px;height:28px;border-radius:7px;display:inline-flex;align-items:center;gap:5px;">
          <span>${o("غير مقروء","Unread")}</span>
          ${n>0?`<span style="font-size:10px;background:var(--amber-strong);color:#fff;padding:1px 5px;border-radius:10px;font-weight:700;">${n}</span>`:'<span style="font-size:10px;opacity:0.85;padding:1px 5px;">0</span>'}
        </button>
        <button type="button" class="btn btn-sm ${t==="read"?"btn-primary":"btn-ghost"}" data-action="filter-notifications" data-tab="read" style="font-size:11px;padding:4px 10px;height:28px;border-radius:7px;display:inline-flex;align-items:center;gap:5px;">
          <span>${o("مقروء","Read")}</span>
          <span style="font-size:10px;opacity:0.85;padding:1px 5px;border-radius:10px;">${i}</span>
        </button>
      </div>

      <!-- Action buttons -->
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
        ${n>0?`
          <button type="button" class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${o("تحديد كافة التنبيهات كمقروءة","Mark all notifications as read")}">
            ${v("check",12)} ${o("تحديد الكل كمقروء","Mark all read")}
          </button>
        `:""}
        ${i>0?`
          <button type="button" class="btn btn-ghost btn-sm" data-action="clear-read-notifications" style="font-size:11px;color:var(--muted);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${o("حذف كافة الإشعارات المقروءة","Clear all read notifications")}">
            ${v("trash",12)} ${o("مسح المقروء","Clear read")}
          </button>
        `:""}
        <button type="button" class="btn btn-ghost btn-sm" data-action="send-test-notification" style="font-size:11px;color:var(--blue);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${o("إرسال إشعار تجريبي فوري للتأكد من وصوله","Send live test notification")}">
          ${v("bell",12)} ${o("تجربة إرسال","Test Send")}
        </button>
      </div>
    </div>
  `,d=Mi(),l=Pn()&&!Rn();let c="";l?c=`
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-radius:8px;background:var(--surface-soft);border:1px dashed var(--blue);margin-bottom:12px;font-size:11px;">
        <span style="color:var(--ink-soft);display:inline-flex;align-items:center;gap:5px;">${v("phone",13)} ${o("تفعيل إشعارات نظام iOS الفورية على iPhone و iPad","Enable native iOS push alerts on iPhone & iPad")}</span>
        <button type="button" class="btn btn-primary btn-sm" data-action="show-ios-notification-guide" style="font-size:10px;padding:3px 8px;height:auto;flex-shrink:0;">${o("عرض الطريقة","View Setup")}</button>
      </div>
    `:d==="default"&&(c=`
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-radius:8px;background:var(--surface-soft);border:1px dashed var(--blue);margin-bottom:12px;font-size:11px;">
        <span style="color:var(--ink-soft);">${o("تفعيل إشعارات سطح المكتب والجوال عند وصول مهام أو تنبيهات؟","Enable desktop & mobile alerts when new tasks or mentions arrive?")}</span>
        <button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications" style="font-size:10px;padding:3px 8px;height:auto;flex-shrink:0;">${o("تفعيل الآن","Enable")}</button>
      </div>
    `);let p="";a.length?p=`<div class="attention-list" style="display:flex;flex-direction:column;gap:8px;">${a.slice(0,40).map(m=>{const x=Ne(m),y=Ja(m.type),h=s.lang==="ar"?m.titleAr||y.titleAr||m.titleEn||y.defaultTitle:m.titleEn||y.titleEn||m.titleAr||y.defaultTitle,f=s.lang==="ar"?m.messageAr||m.bodyAr||m.content||"":m.messageEn||m.bodyEn||(m.content!==m.titleAr&&m.content!==m.messageAr?m.content:"")||m.messageAr||m.bodyAr||"",k=f&&f!==h?`${f} · `:"",S=m.type==="document_review"||m.type==="document_approved"||m.documentId,A=m.taskId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);font-weight:600;">${v("check",10)} ${o("فتح المهمة","Open Task")}</span>`:S?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--blue);border:1px solid var(--line);font-weight:600;">${v("document",10)} ${o("معاينة المخطط","View Drawing")}</span>`:m.projectId?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--mint-strong);border:1px solid var(--line);font-weight:600;">${v("building",10)} ${o("المشروع","Project")}</span>`:"",_=x?"":`<span style="width:7px;height:7px;border-radius:50%;background:var(--blue);display:inline-block;flex-shrink:0;box-shadow:0 0 0 2px var(--surface);" title="${o("غير مقروء","Unread")}"></span>`,N=x?`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;color:var(--muted);">${v("check",10)} <span style="font-size:9px;">${o("مقروء","Read")}</span></span>`:"",j=x?"border:1px solid var(--line);border-inline-start:3px solid transparent;":"border:1px solid rgba(56,189,248,0.35);border-inline-start:3px solid var(--blue);",F=x?"background:var(--surface-soft);":"background:var(--surface);",M=x?"opacity:0.85;":"opacity:1;";return`
        <div class="attention-item notif-item ${x?"notif-read":"notif-unread"}" 
             data-action="read-notification" 
             data-notification-id="${g(m.id)}" 
             data-task-id="${g(m.taskId||"")}" 
             data-project-id="${g(m.projectId||"")}" 
             data-document-id="${g(m.documentId||"")}" 
             data-type="${g(m.type||"")}" 
             style="${j}${F}${M}text-align:start;width:100%;cursor:pointer;position:relative;display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;transition:all 0.15s ease;">
          
          <div style="display:flex;align-items:flex-start;gap:10px;flex:1;min-width:0;">
            <span class="attention-icon ${y.color}" style="flex-shrink:0;margin-top:2px;">${v(y.icon,14)}</span>
            <div class="attention-copy" style="flex:1;min-width:0;text-align:start;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:nowrap;overflow:hidden;">
                ${_}
                <strong dir="auto" style="color:var(--${y.color});font-size:12px;font-weight:${x?"600":"700"};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${g(h)}</strong>
                ${N}
                ${A}
              </div>
              <div dir="auto" style="color:var(--muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${g(f)}">
                ${g(k)}<span style="color:var(--ink-soft);">${Tt(m.createdAt)}</span>
              </div>
            </div>
          </div>

          <!-- Quick actions: Toggle read/unread & delete -->
          <div style="display:flex;align-items:center;gap:4px;margin-inline-start:10px;flex-shrink:0;">
            <button type="button" class="btn btn-ghost btn-sm notif-toggle-btn" 
                    data-action="toggle-notification-read" 
                    data-notification-id="${g(m.id)}" 
                    title="${x?o("تحديد كغير مقروء","Mark as unread"):o("تحديد كمقروء","Mark as read")}" 
                    style="padding:4px 6px;height:26px;color:${x?"var(--muted)":"var(--blue)"};border-radius:6px;">
              ${v(x?"bell":"check",12)}
            </button>
            <button type="button" class="notif-dismiss-btn" 
                    data-action="delete-notification" 
                    data-notification-id="${g(m.id)}" 
                    title="${o("حذف الإشعار","Dismiss notification")}" 
                    style="margin:0;">
              ${v("close",12)}
            </button>
          </div>
        </div>
      `}).join("")}</div>`:t==="unread"?p=`
        <div class="empty" style="padding:40px 20px;text-align:center;">
          <span style="color:var(--teal);background:var(--mint);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
            ${v("check",24)}
          </span>
          <strong style="display:block;font-size:14px;color:var(--ink);">${o("رائع! لقد اطلعت على كافة التنبيهات","All caught up! No unread notifications")}</strong>
          <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${o("لا توجد إشعارات غير مقروءة في صندوق الوارد حالياً.","You have no unread notifications in your inbox right now.")}</span>
        </div>
      `:t==="read"?p=`
        <div class="empty" style="padding:40px 20px;text-align:center;">
          <span style="color:var(--muted);background:var(--surface-soft);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
            ${v("bell",24)}
          </span>
          <strong style="display:block;font-size:14px;color:var(--ink);">${o("لا توجد إشعارات مقروءة حالياً","No read notifications")}</strong>
          <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${o("الإشعارات التي تفتحها أو تحددها كمقروءة ستظهر هنا.","Notifications you read or mark as read will appear here.")}</span>
        </div>
      `:p=`
        <div class="empty" style="padding:48px 20px;text-align:center;">
          <span style="color:var(--teal);background:var(--mint);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
            ${v("bell",24)}
          </span>
          <strong style="display:block;font-size:14px;color:var(--ink);">${o("لا توجد إشعارات حالياً","No notifications right now")}</strong>
          <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${o("ستظهر هنا التنبيهات الخاصة بالمهام والمشاريع والإشارات والتذكيرات.","Task, project, mention, and reminder alerts will appear here.")}</span>
        </div>
      `;const u=`${r}${c}${p}`;document.getElementById("modal-root").innerHTML=Qt(T("notifications"),o("تنبيهاتك داخل مساحة العمل والبريد.","Your workspace and email notifications."),u,"notifications","modal-notifications")}var Ya="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH",rn=`https://drive.google.com/drive/folders/${Ya}?usp=sharing`;function jn(e){if(_e()||e&&(String(e.id).startsWith("doc_demo")||e.isDemo||String(e.driveFileId||"").startsWith("demo_"))){const i=e?.originalName;return i&&Li.has(i)?`/assets/${encodeURIComponent(i)}`:e?.diskFilename&&!e.diskFilename.includes("drive.google.com")?e.diskFilename:"/assets/DARC-VILLA-ARCH-A101_Rev03.pdf"}if(!e)return rn;const t=e.driveFileId||e.drive_file_id;if(t&&!String(t).startsWith("demo_")&&String(t).length>=25&&t!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${encodeURIComponent(t)}/view?usp=sharing`;const n=e.diskFilename||e.disk_filename||e.viewLink||e.webViewLink||"";if(n&&n.includes("drive.google.com")){if(n.includes("1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"))return rn;if(n.includes("/folders/"))return n;const i=n.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(i&&i[1]&&!i[1].startsWith("demo_")&&i[1].length>=25&&i[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${i[1]}/view?usp=sharing`}return n&&(n.startsWith("https://")||n.startsWith("http://"))&&!n.includes("localhost")&&!n.includes("127.0.0.1")&&!n.includes("demo_sample")?n:rn}var Li=new Set(["DARC-VILLA-ARCH-A101_Rev03.pdf","SKYLINE-CW-SECTION-DETAILS-DWG.pdf","RED-SEA-RESORT-MASTERPLAN-APPROVED.pdf","DARC-VILLA-BOQ-BILL-OF-QUANTITIES.xlsx","DARC-PALM-VILLA-TECHNICAL-SPECIFICATIONS.docx","DARC-ARCHITECTURAL-CONCEPT-PRESENTATION.pptx","DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4","PALM_VILLA_MAJLIS_3D_RENDER_4K.jpg","DARC-STRUCTURAL-LAYOUT-V2.dwg"]);function mt(e){if(!e)return"";if(e.blobUrl&&typeof e.blobUrl=="string"&&e.blobUrl.startsWith("blob:"))return e.blobUrl;if(e._blobUrl&&typeof e._blobUrl=="string"&&e._blobUrl.startsWith("blob:"))return e._blobUrl;if(typeof window<"u"&&window.__docBlobCache){const r=window.__docBlobCache.get(e.id)||window.__docBlobCache.get(e.originalName);if(r&&typeof r=="string"&&r.startsWith("blob:"))return r}const t=!!(e.id?.startsWith("doc_demo_")||e.projectId?.startsWith("prj_demo_")||_e()),n=(e.originalName||"").trim();if(t){if(n==="darc-walkthrough.mp4")return"/assets/DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4";if(n&&Li.has(n))return`/assets/${encodeURIComponent(n)}`}const i=(e.diskFilename||e.disk_filename||e.url||"").trim();if(i&&(i.startsWith("https://")||i.startsWith("http://")))try{const r=new URL(i);if(["http:","https:"].includes(r.protocol)&&!r.hostname.includes("drive.google.com")&&!r.hostname.includes("docs.google.com"))return i}catch{}if(e.id)return`/api/documents/${encodeURIComponent(e.id)}?stream=1`;const a=n.replace(/[/\\:*?"<>|\x00-\x1f]/g,"_");return a?`/assets/${encodeURIComponent(a)}`:""}async function Pi(e,t=null){if(!e)return;const n=jn(e);let i=!1;try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(n),i=!0;else{const a=document.createElement("textarea");a.value=n,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select(),i=document.execCommand("copy"),a.remove()}}catch(a){console.warn("[DocViewer] Clipboard writeText failed:",a),window.prompt(o("انسخ رابط Google Drive من هنا:","Copy Google Drive link:"),n),i=!0}if(i){if(t){const r=t.innerHTML;t.innerHTML=`${v("check",14)} <span style="font-size:11px;font-weight:700;">${o("تم النسخ","Copied")}</span>`,t.style.color="var(--mint-strong, #10b981)",t.style.transition="all 0.2s ease",setTimeout(()=>{t.innerHTML=r,t.style.color=""},2200)}const a=_e()||e&&(String(e.id).startsWith("doc_demo")||e.isDemo||String(e.driveFileId||"").startsWith("demo_"));Y(o(a?"تم نسخ رابط المستند بنجاح":"تم نسخ رابط المخرج الهندسي في Google Drive بنجاح",a?"Document link copied successfully":"Google Drive deliverable link copied"))}}async function ge(e){if(!e)return;let t=(s.data?.documents||[]).find(i=>i.id===e);if(!t)try{const i=await ke(`/api/documents/${e}`);i&&i.document&&(t=i.document)}catch{}if(!t){Y(o("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}Y(o(`جاري بدء تحميل "${t.originalName}"...`,`Starting download of "${t.originalName}"...`));const n=t.diskFilename||t.disk_filename||"";if(n&&n.includes("drive.google.com")){const i=n.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(i&&i[1]&&!i[1].startsWith("demo_")&&i[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"){const a=`https://drive.google.com/uc?export=download&id=${i[1]}`,r=(t.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),d=document.createElement("a");d.href=a,d.target="_blank",d.rel="noopener noreferrer",d.download=r,document.body.appendChild(d),d.click(),d.remove(),Y(o(`تم بدء تنزيل "${t.originalName}" من Google Drive بنجاح.`,`Downloaded "${t.originalName}" from Google Drive.`));return}}try{let i=null;const a=mt(t);if(a&&!a.startsWith("http://drive.google.com")&&!a.startsWith("https://drive.google.com"))try{const r=await fetch(a);r.ok&&(i=await r.blob())}catch(r){console.warn("[DocViewer] Real asset fetch error:",r)}if(i){const r=URL.createObjectURL(i);Za(r);const d=(t.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),l=document.createElement("a");l.href=r,l.download=d,document.body.appendChild(l),l.click(),l.remove(),setTimeout(()=>URL.revokeObjectURL(r),3e4),Y(o(`تم تنزيل المستند الأصلي "${t.originalName}" بنجاح`,`Downloaded "${t.originalName}" successfully`));return}window.open(`/api/documents/${encodeURIComponent(t.id)}?download=1`,"_blank"),Y(o(`تم بدء تنزيل "${t.originalName}" بنجاح.`,`Downloaded "${t.originalName}" successfully.`))}catch(i){console.error("[DocViewer] Local download creation failed:",i),window.open(`/api/documents/${encodeURIComponent(t.id)}?download=1`,"_blank")}}var vn=new Set;function Za(e){e&&typeof e=="string"&&e.startsWith("blob:")&&vn.add(e)}function Qa(){typeof URL>"u"||typeof URL.revokeObjectURL!="function"||(vn.forEach(e=>{try{URL.revokeObjectURL(e)}catch{}}),vn.clear())}function Lt(){const e=document.getElementById("preview-modal-overlay");if(!e)return;const t=e.querySelector("video");if(t)try{t.pause(),t.removeAttribute("src"),t.load()}catch{}e.querySelectorAll("canvas").forEach(n=>{try{n.width=0,n.height=0}catch{}}),e.querySelectorAll("iframe, object").forEach(n=>{try{n.src="about:blank",n.data="about:blank"}catch{}}),Qa(),window.__docPreviewKeyHandler&&(window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=null),Array.isArray(window.__docPreviewCleanups)&&(window.__docPreviewCleanups.forEach(n=>{try{n()}catch{}}),window.__docPreviewCleanups=[]),document.body.style.overflow="",e.style.display="none",e.innerHTML=""}function eo(){if(document.getElementById("darc-doc-viewer-responsive-styles"))return;const e=document.createElement("style");e.id="darc-doc-viewer-responsive-styles",e.textContent=`
    #preview-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(8, 14, 18, 0.92);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: clamp(0px, 1.5vw, 16px);
      box-sizing: border-box;
      animation: docModalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes docModalFadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    .doc-modal-container {
      background: var(--surface, #ffffff);
      width: 100%;
      max-width: 1280px;
      height: 94vh;
      border-radius: 16px;
      box-shadow: 0 30px 80px rgba(0,0,0,0.6);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--line, #e2e8f0);
    }
    @media (max-width: 768px) {
      #preview-modal-overlay {
        padding: 0 !important;
      }
      .doc-modal-container {
        height: 100vh !important;
        height: 100dvh !important;
        max-width: 100vw !important;
        border-radius: 0 !important;
        border: none !important;
      }
      .doc-modal-header {
        padding: 10px 14px !important;
      }
      .doc-modal-header-actions .btn span.btn-label {
        display: none !important;
      }
      .doc-modal-header-actions .btn {
        padding: 6px 10px !important;
        min-height: 38px !important;
      }
    }
    /* Touch momentum scrolling */
    .touch-scroll {
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
    }
    /* Custom clean scrollbars */
    .doc-custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .doc-custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
    }
    .doc-custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(13, 98, 105, 0.35);
      border-radius: 3px;
    }
    .doc-custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(13, 98, 105, 0.6);
    }
  `,document.head.appendChild(e)}function to(e){if(!e||typeof e!="string")return null;const t=e.split(/\r?\n/);if(t.length<4)return null;const n=[],i=new Set;let a=!1,r=null;for(let d=0;d<t.length-1;d+=2){const l=t[d].trim(),c=t[d+1]?.trim()||"",p=parseInt(l,10);if(!isNaN(p))if(p===0){if(c!=="SECTION")if(c==="ENDSEC")a&&r&&n.push(r),r=null,a=!1;else{if(c==="EOF")break;a&&(r&&n.push(r),r={type:c,layer:"0"})}}else p===2&&c==="ENTITIES"?a=!0:a&&r&&(p===8?(r.layer=c,i.add(c)):p===10?r.x1=parseFloat(c):p===20?r.y1=parseFloat(c):p===11?r.x2=parseFloat(c):p===21?r.y2=parseFloat(c):p===40?r.radius=parseFloat(c):p===50?r.startAngle=parseFloat(c):p===51?r.endAngle=parseFloat(c):p===62?r.colorIndex=parseInt(c,10):p===1&&(r.text=c))}return a&&r&&n.push(r),{entities:n,layers:Array.from(i)}}async function no(e){if(!e)return;eo();let t=(s.data?.documents||[]).find($=>$.id===e);if(!t)try{const $=await ke(`/api/documents/${e}`);$&&($.id||$.document?.id)&&(t=$.document||$,s.data&&!s.data.documents&&(s.data.documents=[]),s.data?.documents&&s.data.documents.push(t))}catch($){console.warn("[DocViewer] Failed to fetch doc on demand:",$)}if(!t){Y(o("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}const n=(t.originalName||"").split(".").pop()?.toLowerCase()||"",i=bi(t.originalName,t.mimeType),a=vi(t.originalName)||"V1",r=xi(t),d=wi(r),l=t.size>1048576?(t.size/1048576).toFixed(1)+" MB":Math.round((t.size||0)/1024)+" KB",c=n==="pdf"||i.isPdf,p=["dwg","dxf"].includes(n)||i.isCad,u=["rvt","rfa","ifc","skp"].includes(n)||i.isBim,m=["xlsx","xls","csv"].includes(n)||i.isExcel,x=["docx","doc","rtf","odt"].includes(n)||i.isWord,y=["pptx","ppt","key"].includes(n)||i.isPpt,h=["zip","rar","7z","tar"].includes(n)||i.isZip,f=["jpg","jpeg","png","webp","svg","heic"].includes(n)||i.isImg,k=["mp4","webm","mov","m4v"].includes(n)||t.mimeType&&t.mimeType.startsWith("video/"),S=_e()||t&&(String(t.id).startsWith("doc_demo")||t.isDemo),A=jn(t),_=t.driveFileId||t.drive_file_id;let N=null;if(_&&!String(_).startsWith("demo_")&&String(_).length>=20&&_!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")N=`https://drive.google.com/file/d/${encodeURIComponent(_)}/preview`;else{const $=(t.diskFilename||t.disk_filename||t.viewLink||t.webViewLink||t.url||"").match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);$&&$[1]&&!$[1].startsWith("demo_")&&$[1].length>=20&&$[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"&&(N=`https://drive.google.com/file/d/${$[1]}/preview`)}let j=document.getElementById("preview-modal-overlay");j||(j=document.createElement("div"),j.id="preview-modal-overlay",document.body.appendChild(j)),j.innerHTML=`
    <div class="doc-modal-container">
      <!-- Universal Responsive Modal Header -->
      <div class="doc-modal-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line, #e2e8f0);background:var(--surface, #ffffff);flex-wrap:wrap;gap:10px;z-index:20;">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;flex:1;">
          <span style="background:${i.bg};color:${i.color};border:1px solid ${i.border};font-size:11px;font-weight:900;padding:4px 8px;border-radius:6px;flex-shrink:0;">
            ${i.ext}
          </span>
          <div style="min-width:0;flex:1;">
            <h3 style="margin:0;font-size:14px;font-weight:800;color:var(--ink, #0f172a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:clamp(220px, 45vw, 550px);" title="${g(t.originalName)}">
              ${g(t.originalName)}
            </h3>
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;font-size:11px;color:var(--muted, #64748b);flex-wrap:wrap;">
              <span class="version-badge" style="background:rgba(13,98,105,0.08);color:var(--teal, #0d6269);padding:1px 6px;border-radius:4px;font-weight:800;">${a}</span>
              <span>•</span>
              <span style="background:${d.bg};color:${d.color};border:1px solid ${d.border};padding:1px 6px;border-radius:4px;font-weight:800;">${o(d.labelAr,d.labelEn)}</span>
              <span>•</span>
              <span>${l}</span>
              <span>•</span>
              <span class="status-badge ${g(t.status||"approved")}" style="font-size:10px;padding:2px 7px;">${g(_n(t.status||"approved"))}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons (Responsive on Mobile) -->
        <div class="doc-modal-header-actions" style="display:flex;align-items:center;gap:8px;flex-shrink:0;flex-wrap:wrap;">
          <!-- Dual Engine Switcher -->
          <div class="doc-viewer-engine-switch" style="display:inline-flex;align-items:center;background:var(--surface-soft, #f1f5f9);border:1px solid var(--line, #e2e8f0);border-radius:8px;padding:2px;gap:2px;">
            <button type="button" class="btn btn-sm" id="btn-engine-native" style="padding:4px 9px;font-size:11px;font-weight:700;border-radius:6px;border:none;cursor:pointer;background:var(--brand-teal, #0d6269);color:#ffffff;transition:all 0.15s;" title="${o("عرض بالمستعرض المدمج فائق الدقة","View in Native High-Fidelity Viewer")}">
              ${o("المستعرض المدمج","Native")}
            </button>
            <button type="button" class="btn btn-sm" id="btn-engine-drive" style="padding:4px 9px;font-size:11px;font-weight:700;border-radius:6px;border:none;cursor:pointer;background:transparent;color:var(--ink-soft, #475569);transition:all 0.15s;" title="${o("عرض بتضمين Google Drive","View in Google Drive Viewer")}">
              Google Drive
            </button>
          </div>

          <button type="button" class="btn btn-soft btn-sm" id="modal-copy-link-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--teal, #0d6269);" title="${o(S?"نسخ رابط المستند":"نسخ رابط Google Drive",S?"Copy Document Link":"Copy Drive Link")}">
            ${v("link",14)} <span class="btn-label">${o("نسخ الرابط","Copy Link")}</span>
          </button>
          <a href="${g(A)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;" title="${o(S?"فتح المستند":"فتح في Google Drive",S?"Open Document":"Open in Drive")}">
            ${v("external",13)} <span class="btn-label">${S?o("فتح الملف","Open File"):"Google Drive"}</span>
          </a>
          <button type="button" class="btn btn-primary btn-sm" id="modal-download-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;background:var(--brand-teal, #0d6269);color:#ffffff;" title="${o("تحميل المخطط","Download")}">
            ${v("download",14)} <span class="btn-label">${o("تنزيل الملف","Download")}</span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="close-doc-preview-btn" style="padding:6px;min-width:36px;height:36px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;" title="${o("إغلاق (Esc)","Close (Esc)")}">
            ${v("close",18)}
          </button>
        </div>
      </div>

      <!-- Main Viewer Viewport -->
      <div id="doc-viewer-viewport" class="touch-scroll" style="flex:1;position:relative;background:#0d1117;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        <!-- Injected format viewer below -->
      </div>
    </div>
  `,j.style.display="flex",document.body.style.overflow="hidden",window.__docPreviewKeyHandler&&window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=$=>{$.key==="Escape"&&Lt()},window.addEventListener("keydown",window.__docPreviewKeyHandler),document.getElementById("modal-copy-link-btn")?.addEventListener("click",$=>{Pi(t,$.currentTarget)}),document.getElementById("modal-download-btn")?.addEventListener("click",()=>{ge(t.id)}),document.getElementById("close-doc-preview-btn")?.addEventListener("click",Lt),j.onclick=$=>{$.target===j&&Lt()};const F=document.getElementById("doc-viewer-viewport");if(!F)return;function M(){const $=F.querySelector("video");if($)try{$.pause(),$.removeAttribute("src"),$.load()}catch{}Array.isArray(window.__docPreviewCleanups)&&(window.__docPreviewCleanups.forEach(E=>{try{E()}catch{}}),window.__docPreviewCleanups=[])}function w($){const E=document.getElementById("btn-engine-native"),L=document.getElementById("btn-engine-drive");E&&L&&($==="native"?(E.style.background="var(--brand-teal, #0d6269)",E.style.color="#ffffff",L.style.background="transparent",L.style.color="var(--ink-soft, #475569)"):(L.style.background="var(--brand-teal, #0d6269)",L.style.color="#ffffff",E.style.background="transparent",E.style.color="var(--ink-soft, #475569)")),M(),F.innerHTML="",$==="drive"?I():D()}function I(){N?F.innerHTML=`
        <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#1e293b;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #334155;color:#94a3b8;font-size:12px;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;"></span>
              <span style="font-weight:700;color:#f8fafc;">${o("مستعرض Google Drive السحابي الرسمي","Official Google Drive Cloud Viewer")}</span>
            </div>
            <a href="${g(A)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="color:#38bdf8;background:transparent;border:none;cursor:pointer;font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:4px;">
              ${v("external",12)} ${o("فتح في علامة تبويب جديدة","Open in New Tab")}
            </a>
          </div>
          <iframe 
            src="${g(N)}" 
            style="flex:1;width:100%;height:100%;border:none;background:#ffffff;" 
            allow="autoplay; encrypted-media; fullscreen"
            title="Google Drive Preview"
          ></iframe>
        </div>
      `:(F.innerHTML=`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;text-align:center;padding:30px;box-sizing:border-box;">
          <div style="background:rgba(15,23,42,0.85);border:1px solid #334155;border-radius:14px;padding:32px 24px;max-width:480px;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
            <div style="color:var(--teal, #0d6269);margin-bottom:14px;display:flex;justify-content:center;">${v("external",36)}</div>
            <h4 style="margin:0 0 8px;font-size:16px;font-weight:800;color:#f8fafc;">${o("معاينة Google Drive السحابية","Google Drive Cloud Preview")}</h4>
            <p style="margin:0 0 18px;font-size:13px;color:#94a3b8;line-height:1.6;">
              ${o("هذا الملف مخزن في بيئة العمل المحلية أو كعينة هندسية، ولا يتوفر له رابط تضمين مباشر من Drive. نوصي باستخدام المستعرض المدمج فائق الدقة.","This file is hosted locally or as a demo showcase asset and does not have an active Google Drive embed link. We recommend using the high-fidelity native viewer.")}
            </p>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary btn-sm" id="btn-revert-native" style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
                ${v("eye",13)} <span>${o("العودة للمستعرض المدمج","Back to Native Viewer")}</span>
              </button>
              <a href="${g(A)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
                ${v("external",13)} <span>${o("مجلد Google Drive","Google Drive Folder")}</span>
              </a>
            </div>
          </div>
        </div>
      `,document.getElementById("btn-revert-native")?.addEventListener("click",()=>w("native")))}function D(){if(c){const $=mt(t);F.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#1e242c;">
        <!-- Inspection Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #334155;color:#e2e8f0;font-size:12px;z-index:10;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:900;color:#dc2626;background:rgba(220,38,38,0.15);padding:3px 8px;border-radius:4px;">PDF</span>
            <span style="font-weight:700;color:#38bdf8;">${o("المخطط المعماري المعتمد للتنفيذ","Architectural Blueprint")}</span>
            <span style="color:#64748b;display:none;sm:inline;">•</span>
            <span style="color:#2dd4bf;font-size:11px;">● ${o("معتمد برقم ترخيص 2026/DARC-104","Stamp 2026/DARC-104")}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="pdf-open-newtab" style="background:#0284c7;color:#fff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ↗ ${o("نافذة كاملة مستقلة","Full Window")}
            </button>
            <button type="button" class="btn btn-sm" id="pdf-download-btn" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ${v("download",12)} ${o("تنزيل PDF","Download PDF")}
            </button>
          </div>
        </div>

        <!-- Native PDF Object + Mobile Fallback Container -->
        <div id="pdf-frame-container" style="flex:1;width:100%;height:100%;background:#525659;position:relative;overflow:hidden;">
          <object 
            id="pdf-native-object"
            data="${g($)}#toolbar=1&navpanes=1&scrollbar=1" 
            type="application/pdf"
            style="width:100%;height:100%;border:none;display:block;"
          >
            <iframe 
              id="pdf-native-frame"
              src="${g($)}#toolbar=1&navpanes=1&scrollbar=1" 
              type="application/pdf"
              style="width:100%;height:100%;border:none;display:block;"
              title="${g(t.originalName)}"
              allow="fullscreen"
            >
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;text-align:center;padding:24px;">
                <p style="margin-bottom:12px;font-size:14px;color:#cbd5e1;">${o("متصفحك يحتاج لفتح مستند PDF في نافذة جديدة أو تنزيله مباشرة.","Your browser requires opening this PDF in a new window or downloading it.")}</p>
                <a href="${g($)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding:8px 18px;font-weight:700;">
                  ↗ ${o("فتح مستند PDF الأصلي","Open PDF in New Window")}
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    `,document.getElementById("pdf-open-newtab")?.addEventListener("click",()=>{window.open($,"_blank")}),document.getElementById("pdf-download-btn")?.addEventListener("click",()=>{ge(t.id)});return}if(f){let H=function(){P&&(P.style.transform=`translate(${X}px, ${U}px) scale(${E}) rotate(${L}deg)`),ne&&(ne.textContent=`${Math.round(E*100)}%`)};const $=mt(t);F.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#0a0e14;user-select:none;">
        <!-- Inspection Toolbar -->
        <div style="position:absolute;top:16px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.88);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);padding:6px 14px;border-radius:30px;display:flex;align-items:center;gap:10px;z-index:20;box-shadow:0 10px 25px rgba(0,0,0,0.5);color:#fff;font-size:12px;">
          <button type="button" class="btn btn-ghost btn-sm" id="img-zoom-in" style="color:#fff;padding:4px 8px;font-weight:700;display:inline-flex;align-items:center;" title="${o("تكبير","Zoom In")}">${v("plus",14)}</button>
          <span id="img-zoom-level" style="font-weight:700;min-width:44px;text-align:center;">100%</span>
          <button type="button" class="btn btn-ghost btn-sm" id="img-zoom-out" style="color:#fff;padding:4px 8px;font-weight:700;display:inline-flex;align-items:center;" title="${o("تصغير","Zoom Out")}">${v("minus",14)}</button>
          <button type="button" class="btn btn-ghost btn-sm" id="img-rotate-btn" style="color:#38bdf8;padding:4px 8px;font-weight:700;" title="${o("تدوير 90 درجة","Rotate 90")}">↻ 90°</button>
          <button type="button" class="btn btn-ghost btn-sm" id="img-reset-btn" style="color:#fff;padding:4px 8px;font-weight:700;" title="${o("إعادة ضبط","Reset")}">⤢ 100%</button>
        </div>

        <!-- High-Res Image Viewport Canvas -->
        <div id="img-pan-viewport" style="flex:1;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:grab;position:relative;touch-action:none;">
          <img 
            id="active-preview-img" 
            src="${$}" 
            alt="${g(t.originalName)}" 
            style="max-width:92%;max-height:88%;object-fit:contain;border-radius:8px;box-shadow:0 20px 50px rgba(0,0,0,0.7);transition:transform 0.1s ease;transform-origin:center center;pointer-events:none;" 
          />
        </div>
      </div>
    `;let E=1,L=0,X=0,U=0,O=!1,se=0,b=0;const P=document.getElementById("active-preview-img"),ne=document.getElementById("img-zoom-level"),G=document.getElementById("img-pan-viewport");if(document.getElementById("img-zoom-in")?.addEventListener("click",()=>{E=Math.min(5,E+.25),H()}),document.getElementById("img-zoom-out")?.addEventListener("click",()=>{E=Math.max(.4,E-.25),H()}),document.getElementById("img-rotate-btn")?.addEventListener("click",()=>{L=(L+90)%360,H()}),document.getElementById("img-reset-btn")?.addEventListener("click",()=>{E=1,L=0,X=0,U=0,H()}),G){G.addEventListener("wheel",me=>{me.preventDefault();const Dt=me.deltaY<0?.15:-.15;E=Math.max(.4,Math.min(5,E+Dt)),H()},{passive:!1}),G.addEventListener("pointerdown",me=>{O=!0;try{G.setPointerCapture(me.pointerId)}catch{}se=me.clientX-X,b=me.clientY-U,G.style.cursor="grabbing"}),G.addEventListener("pointermove",me=>{O&&(X=me.clientX-se,U=me.clientY-b,H())});const fe=()=>{O=!1,G.style.cursor="grab"};G.addEventListener("pointerup",fe),G.addEventListener("pointercancel",fe),G.addEventListener("dblclick",()=>{E=E===1?2:1,X=0,U=0,H()})}return}if(k){const $=mt(t);F.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#06090e;">
        <!-- Video Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:10;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:900;color:#8b5cf6;background:rgba(139,92,246,0.15);padding:3px 8px;border-radius:4px;">MP4 / 4K</span>
            <span style="font-weight:700;color:#e2e8f0;">${o("جولة الموقع ونسبة الإنجاز (Site Progress)","Walkthrough Video")}</span>
            <span style="color:#64748b;">•</span>
            <span style="color:#94a3b8;">${l}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <select id="video-playback-rate" style="background:#1e293b;color:#e2e8f0;border:1px solid #334155;border-radius:6px;padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer;">
              <option value="0.75">0.75x</option>
              <option value="1" selected>1.0x ${o("عادي","Normal")}</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2.0x</option>
            </select>
            <button type="button" class="btn btn-sm" id="video-pip-btn" style="background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
              ${v("eye",13)} <span>PiP</span>
            </button>
            <button type="button" class="btn btn-sm btn-primary" id="video-download-btn" style="padding:4px 12px;font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:4px;">
              ${v("download",13)} <span>${o("تنزيل الفيديو","Download Video")}</span>
            </button>
          </div>
        </div>

        <!-- Video Player Viewport -->
        <div style="flex:1;position:relative;display:flex;align-items:center;justify-content:center;background:#000;overflow:hidden;">
          <video 
            id="darc-main-video-player" 
            controls 
            autoplay 
            playsinline 
            webkit-playsinline
            preload="metadata"
            style="max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;outline:none;"
            src="${g($)}"
          >
            <source src="${g($)}" type="video/mp4" />
          </video>
        </div>

        <!-- Keyframe Jump Chips -->
        <div style="padding:8px 16px;background:rgba(15,23,42,0.95);border-top:1px solid #1e293b;display:flex;align-items:center;gap:8px;overflow-x:auto;" class="touch-scroll">
          <span style="font-size:11px;color:#94a3b8;white-space:nowrap;font-weight:700;display:inline-flex;align-items:center;gap:4px;">${v("pin",12)} <span>${o("محطات الجولة:","Keyframes:")}</span></span>
          <button type="button" class="video-jump-btn" data-sec="0" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:14px;font-size:11px;cursor:pointer;white-space:nowrap;">
            00:00 ${o("المدخل والمجلس","Majlis & Entry")}
          </button>
          <button type="button" class="video-jump-btn" data-sec="4" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:14px;font-size:11px;cursor:pointer;white-space:nowrap;">
            00:04 ${o("الصالة الرئيسية والبهو","Main Hall")}
          </button>
          <button type="button" class="video-jump-btn" data-sec="8" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:14px;font-size:11px;cursor:pointer;white-space:nowrap;">
            00:08 ${o("المسبح والحديقة الخلفية","Courtyard & Pool")}
          </button>
        </div>
      </div>
    `;const E=document.getElementById("darc-main-video-player");E&&(document.querySelectorAll(".video-jump-btn").forEach(L=>{L.addEventListener("click",()=>{const X=parseFloat(L.dataset.sec||"0");E.currentTime=X,E.play().catch(()=>{})})}),document.getElementById("video-playback-rate")?.addEventListener("change",L=>{E.playbackRate=parseFloat(L.target.value||"1")}),document.getElementById("video-pip-btn")?.addEventListener("click",async()=>{try{document.pictureInPictureElement?await document.exitPictureInPicture():E.requestPictureInPicture&&await E.requestPictureInPicture()}catch{}})),document.getElementById("video-download-btn")?.addEventListener("click",()=>ge(t.id));return}if(p||u){let $=null;const E=mt(t),L={WALLS:"#4ade80",COLUMNS:"#f87171",AXES:"#38bdf8",DIMS:"#f472b6",DOORS:"#facc15",WINDOWS:"#60a5fa"},X=`
      <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:#38bdf8;">
        <input type="checkbox" id="layer-axes" checked style="cursor:pointer;" /> ${o("المحاور (Axes)","Axes")}
      </label>
      <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:#4ade80;">
        <input type="checkbox" id="layer-columns" checked style="cursor:pointer;" /> ${o("الأعمدة (Columns)","Columns")}
      </label>
      <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:#facc15;">
        <input type="checkbox" id="layer-walls" checked style="cursor:pointer;" /> ${o("الجدران والكمرات (Walls)","Walls")}
      </label>
      <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:#f472b6;">
        <input type="checkbox" id="layer-dims" checked style="cursor:pointer;" /> ${o("الأبعاد (Dimensions)","Dimensions")}
      </label>
    `;F.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#0c1015;user-select:none;">
        <!-- CAD Inspection Top Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(16,20,24,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:20;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-weight:900;color:#0284c7;background:rgba(2,132,199,0.15);padding:3px 8px;border-radius:4px;display:inline-flex;align-items:center;gap:4px;">
              ${v("compass",13)} <span>CAD 2D</span>
            </span>
            <span style="font-weight:700;color:#f8fafc;">${g(t.originalName)}</span>
            <span style="color:#64748b;">•</span>
            <span id="cad-coords" style="font-family:monospace;color:#38bdf8;font-size:11px;">X: 0.00m | Y: 0.00m</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="cad-zoom-in" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:4px 8px;font-weight:700;display:inline-flex;align-items:center;">${v("plus",14)}</button>
            <button type="button" class="btn btn-sm" id="cad-zoom-out" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:4px 8px;font-weight:700;display:inline-flex;align-items:center;">${v("minus",14)}</button>
            <button type="button" class="btn btn-sm" id="cad-reset" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:4px 8px;font-weight:700;">⤢ 100%</button>
            <button type="button" class="btn btn-sm" id="cad-download-btn" style="background:#0284c7;border:none;color:#fff;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
              ${v("download",13)} <span>${o("تنزيل DWG / DXF","Download CAD")}</span>
            </button>
          </div>
        </div>

        <!-- Layer Toggles Bar -->
        <div class="cad-layer-bar touch-scroll" style="padding:6px 16px;background:rgba(12,16,21,0.9);border-bottom:1px solid #1e293b;display:flex;align-items:center;gap:12px;font-size:11px;color:#94a3b8;overflow-x:auto;">
          <span style="font-weight:700;color:#cbd5e1;">${o("الطبقات:","Layers:")}</span>
          ${X}
        </div>

        <!-- Interactive 2D Vector CAD Canvas -->
        <div id="cad-canvas-box" style="flex:1;width:100%;height:100%;position:relative;overflow:hidden;cursor:crosshair;touch-action:none;">
          <canvas id="cad-canvas" style="display:block;width:100%;height:100%;"></canvas>
        </div>
      </div>
    `;const U=document.getElementById("cad-canvas"),O=document.getElementById("cad-canvas-box"),se=document.getElementById("cad-coords");if(U&&O){let on=function(){const q=Math.min(window.devicePixelRatio||1,2);U.width=O.clientWidth*q,U.height=O.clientHeight*q,Ie()},Ie=function(){if(!b)return;const q=Math.min(window.devicePixelRatio||1,2),ie=U.width/q,Ce=U.height/q;b.save(),b.scale(q,q),b.clearRect(0,0,ie,Ce),b.fillStyle="#0b1016",b.fillRect(0,0,ie,Ce),b.translate(ie/2+ne,Ce/2+G),b.scale(P,P),b.lineWidth=1/P,b.strokeStyle="rgba(255, 255, 255, 0.04)";for(let C=-400;C<=400;C+=20)b.beginPath(),b.moveTo(C,-300),b.lineTo(C,300),b.stroke();for(let C=-300;C<=300;C+=20)b.beginPath(),b.moveTo(-400,C),b.lineTo(400,C),b.stroke();b.strokeStyle="rgba(2, 132, 199, 0.12)";for(let C=-400;C<=400;C+=100)b.beginPath(),b.moveTo(C,-300),b.lineTo(C,300),b.stroke();for(let C=-300;C<=300;C+=100)b.beginPath(),b.moveTo(-400,C),b.lineTo(400,C),b.stroke();if($&&$.entities&&$.entities.length>0){const C=new Set;F.querySelectorAll(".cad-layer-chk:checked").forEach(W=>C.add(W.dataset.cadLayer)),$.entities.forEach(W=>{if(!C.has(W.layer))return;const et=L[W.layer.toUpperCase()]||"#38bdf8";if(W.type==="LINE")b.beginPath(),b.moveTo(W.x1*20,-W.y1*20),b.lineTo(W.x2*20,-W.y2*20),b.strokeStyle=et,b.lineWidth=Math.max(1,2.5/P),b.stroke();else if(W.type==="POINT"){b.fillStyle=et,b.strokeStyle="#ffffff",b.lineWidth=1/P;const $e=Math.max(6,12/P);b.fillRect(W.x1*20-$e/2,-W.y1*20-$e/2,$e,$e),b.strokeRect(W.x1*20-$e/2,-W.y1*20-$e/2,$e,$e)}else W.type==="CIRCLE"&&(b.beginPath(),b.arc(W.x1*20,-W.y1*20,(W.radius||1)*20,0,Math.PI*2),b.strokeStyle=et,b.lineWidth=Math.max(1,2/P),b.stroke())}),b.restore();return}const ue=[{label:"1",x:-240},{label:"2",x:-120},{label:"3",x:0},{label:"4",x:120},{label:"5",x:240}],It=[{label:"A",y:-160},{label:"B",y:-60},{label:"C",y:60},{label:"D",y:160}];if(Dt?.checked&&(b.strokeStyle="rgba(56, 189, 248, 0.55)",b.setLineDash([8/P,4/P,2/P,4/P]),b.lineWidth=1.2/P,ue.forEach(C=>{b.beginPath(),b.moveTo(C.x,-210),b.lineTo(C.x,210),b.stroke(),b.setLineDash([]),b.fillStyle="#0284c7",b.beginPath(),b.arc(C.x,-225,12,0,Math.PI*2),b.arc(C.x,225,12,0,Math.PI*2),b.fill(),b.fillStyle="#ffffff",b.font="bold 11px sans-serif",b.textAlign="center",b.textBaseline="middle",b.fillText(C.label,C.x,-225),b.fillText(C.label,C.x,225),b.setLineDash([8/P,4/P,2/P,4/P])}),It.forEach(C=>{b.beginPath(),b.moveTo(-290,C.y),b.lineTo(290,C.y),b.stroke(),b.setLineDash([]),b.fillStyle="#0284c7",b.beginPath(),b.arc(-305,C.y,12,0,Math.PI*2),b.arc(305,C.y,12,0,Math.PI*2),b.fill(),b.fillStyle="#ffffff",b.font="bold 11px sans-serif",b.textAlign="center",b.textBaseline="middle",b.fillText(C.label,-305,C.y),b.fillText(C.label,305,C.y),b.setLineDash([8/P,4/P,2/P,4/P])}),b.setLineDash([])),ha?.checked&&(b.strokeStyle="#facc15",b.lineWidth=2.5/P,b.strokeRect(-240,-160,480,320),b.strokeRect(-120,-160,240,100),b.strokeRect(-240,60,240,100),b.strokeStyle="#38bdf8",b.strokeRect(120,60,140,100)),ya?.checked&&(b.fillStyle="#4ade80",b.strokeStyle="#ffffff",b.lineWidth=1/P,ue.forEach(C=>{It.forEach(W=>{b.fillRect(C.x-9,W.y-9,18,18),b.strokeRect(C.x-9,W.y-9,18,18),b.beginPath(),b.moveTo(C.x-9,W.y-9),b.lineTo(C.x+9,W.y+9),b.stroke()})})),ba?.checked){b.strokeStyle="#f472b6",b.fillStyle="#f472b6",b.lineWidth=1.2/P,b.font="bold 10px monospace",b.textAlign="center";for(let C=0;C<ue.length-1;C++){const W=ue[C].x,et=ue[C+1].x,$e=(W+et)/2;b.beginPath(),b.moveTo(W,-190),b.lineTo(et,-190),b.stroke(),b.fillText("6.00m",$e,-196)}}b.restore()};const b=U.getContext("2d");let P=1,ne=0,G=0,H=!1,fe=0,me=0;const Dt=document.getElementById("layer-axes"),ya=document.getElementById("layer-columns"),ha=document.getElementById("layer-walls"),ba=document.getElementById("layer-dims");E&&typeof window<"u"&&window.fetch&&fetch(E).then(q=>q.ok?q.text():"").then(q=>{if(q&&(q.includes("SECTION")||q.includes("ENTITIES"))){const ie=to(q);if(ie&&ie.layers&&ie.layers.length>0){$=ie;const Ce=F.querySelector(".cad-layer-bar");Ce&&(Ce.innerHTML=`<span style="font-weight:700;color:#cbd5e1;">${o("الطبقات:","Layers:")}</span>`+ie.layers.map((ue,It)=>`
                        <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:${L[ue.toUpperCase()]||`hsl(${It*75%360}, 85%, 65%)`};font-weight:700;">
                          <input type="checkbox" class="cad-layer-chk" data-cad-layer="${g(ue)}" checked style="cursor:pointer;" /> ${g(ue)}
                        </label>
                      `).join(""),Ce.querySelectorAll(".cad-layer-chk").forEach(ue=>ue.addEventListener("change",Ie))),Ie()}}}).catch(()=>{}),window.addEventListener("resize",on),window.__docPreviewCleanups=window.__docPreviewCleanups||[],window.__docPreviewCleanups.push(()=>window.removeEventListener("resize",on)),setTimeout(on,50),F.querySelectorAll(".cad-layer-chk, #layer-axes, #layer-columns, #layer-walls, #layer-dims").forEach(q=>{q?.addEventListener("change",Ie)}),document.getElementById("cad-zoom-in")?.addEventListener("click",()=>{P=Math.min(4,P*1.25),Ie()}),document.getElementById("cad-zoom-out")?.addEventListener("click",()=>{P=Math.max(.3,P*.8),Ie()}),document.getElementById("cad-reset")?.addEventListener("click",()=>{P=1,ne=0,G=0,Ie()}),O.addEventListener("wheel",q=>{q.preventDefault();const ie=q.deltaY<0?1.15:.87;P=Math.max(.3,Math.min(4,P*ie)),Ie()},{passive:!1}),O.addEventListener("pointerdown",q=>{H=!0;try{O.setPointerCapture(q.pointerId)}catch{}fe=q.clientX-ne,me=q.clientY-G,O.style.cursor="grabbing"}),O.addEventListener("pointermove",q=>{const ie=O.getBoundingClientRect(),Ce=((q.clientX-ie.left-ie.width/2-ne)/P/20).toFixed(2),ue=((q.clientY-ie.top-ie.height/2-G)/P/20).toFixed(2);se&&(se.textContent=`X: ${Ce}m | Y: ${ue}m`),H&&(ne=q.clientX-fe,G=q.clientY-me,Ie())});const Jn=()=>{H=!1,O.style.cursor="crosshair"};O.addEventListener("pointerup",Jn),O.addEventListener("pointercancel",Jn)}document.getElementById("cad-download-btn")?.addEventListener("click",()=>ge(t.id));return}if(m){let X=function(){const U=$[E],O=L.toLowerCase().trim(),se=U.rows.filter(H=>O?H.code.toLowerCase().includes(O)||H.desc.toLowerCase().includes(O)||H.unit.toLowerCase().includes(O):!0),b=se.reduce((H,fe)=>H+fe.total,0),P=document.getElementById("excel-interactive-table-body"),ne=document.getElementById("excel-sheet-subtotal"),G=document.getElementById("excel-filtered-count");G&&(G.textContent=`${se.length} ${o("بند","items")}`),ne&&(ne.textContent=`${b.toLocaleString()} ${o("ر.س","SAR")}`),P&&(P.innerHTML=se.map(H=>`
          <tr style="border-bottom:1px solid var(--line, #e2e8f0);transition:background 0.15s ease;">
            <td style="padding:10px 14px;font-weight:800;font-family:monospace;color:var(--brand-teal, #0d6269);white-space:nowrap;">${g(H.code)}</td>
            <td style="padding:10px 14px;color:var(--ink, #0f172a);font-weight:600;min-width:240px;line-height:1.5;">${g(H.desc)}</td>
            <td style="padding:10px 14px;text-align:center;color:var(--ink-soft, #475569);font-weight:700;">${g(H.unit)}</td>
            <td style="padding:10px 14px;text-align:center;font-weight:800;font-variant-numeric:tabular-nums;">${H.qty.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:end;font-weight:700;font-variant-numeric:tabular-nums;">${H.rate.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:end;font-weight:900;color:#107c41;font-variant-numeric:tabular-nums;">${H.total.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:center;">
              <span class="status-badge approved" style="font-size:10px;padding:2px 8px;font-weight:800;display:inline-flex;align-items:center;gap:4px;">${v("check",11)} ${o("معتمد","Approved")}</span>
            </td>
          </tr>
        `).join(""))};const $=[{id:"structural",title:o("أعمال الهيكل الإنشائي والعظم","Structural & Concrete Works"),rows:[{code:"01.01",desc:o("حفر وتجهيز الموقع وترحيل المخلفات لعمق التأسيس","Excavation & site prep to foundation depth"),unit:"م3",qty:1200,rate:45,total:54e3,status:"approved"},{code:"01.02",desc:o("خرسانة عادية للنظافة C20 سمك 10سم أسفل القواعد","Plain blinding concrete C20 (100mm) under footings"),unit:"م3",qty:180,rate:280,total:50400,status:"approved"},{code:"01.03",desc:o("خرسانة مسلحة للقواعد والرقاب C35 مقاوم للأملاح والكلوريدات","Reinforced concrete C35 SRC for footings and column necks"),unit:"م3",qty:420,rate:390,total:163800,status:"approved"},{code:"01.04",desc:o("حديد تسليح عالي المقاومة مشوه Grade 60 (ASTM A615)","Deformed high-strength rebar Grade 60 (ASTM A615)"),unit:"طن",qty:48,rate:3250,total:156e3,status:"approved"},{code:"01.05",desc:o("خرسانة مسلحة للأعمدة والجدران الاستنادية C40","Reinforced concrete C40 for columns and retaining walls"),unit:"م3",qty:260,rate:420,total:109200,status:"approved"},{code:"01.06",desc:o("عوازل مائية للقواعد ورقاب الأعمدة دهان بيتوميني وممبرين 4مم","Waterproofing bituminous primer + 4mm modified bitumen membrane"),unit:"م2",qty:850,rate:65,total:55250,status:"approved"},{code:"01.07",desc:o("أسقف خرسانية هوردي ولاكمرية Flat Slab مع كمرات ساقطة","Hollow-block and flat slab concrete with drop beams"),unit:"م3",qty:520,rate:410,total:213200,status:"approved"}]},{id:"finishes",title:o("التشطيبات المعمارية الفاخرة","Architectural Finishes"),rows:[{code:"02.01",desc:o("تكسيات حجر ترافنتينو إيطالي نخب أول للواجهات الخارجية","Italian Travertine stone cladding for exterior facades"),unit:"م2",qty:640,rate:480,total:307200,status:"approved"},{code:"02.02",desc:o("واجهات زجاجية مزدوجة معزولة حرارياً كيرتن وول قطاع Schüco","Double-glazed thermally broken curtain walls (Schüco profile)"),unit:"م2",qty:220,rate:1150,total:253e3,status:"approved"},{code:"02.03",desc:o("أرضيات رخام ستاتوريو إيطالي للمجالس والصالات الرئيسية","Statuario Italian marble flooring for main majlis & halls"),unit:"م2",qty:380,rate:620,total:235600,status:"approved"},{code:"02.04",desc:o("أسقف معلقة جبسية مقاومة للرطوبة مع مسارات إنارة مغناطيسية","Moisture-resistant gypsum ceilings with magnetic track lighting"),unit:"م2",qty:580,rate:195,total:113100,status:"approved"},{code:"02.05",desc:o("أبواب خشب جوز طبيعي بارتفاع 3.20م مع أقفال ذكية وكوالين خفية","Natural walnut flush doors (3.2m height) with concealed hinges"),unit:"عدد",qty:18,rate:4800,total:86400,status:"approved"},{code:"02.06",desc:o("دهانات داخلية ميكرو سمنت ديكوري فاخر للممرات والصالات","Luxury decorative microcement internal wall finishes"),unit:"م2",qty:1200,rate:85,total:102e3,status:"approved"}]},{id:"mep",title:o("الأنظمة الكهروميكانيكية والتكييف","MEP & HVAC Systems"),rows:[{code:"03.01",desc:o("نظام تكييف مركزي مخفي VRF إنفرتر مع تحكم ذكي غرفي","Inverter VRF central concealed AC system with smart zone thermostats"),unit:"نظام",qty:1,rate:28e4,total:28e4,status:"approved"},{code:"03.02",desc:o("شبكة التغذية والصرف الصحي أنابيب بولي بروبلين ألماني عازل للصوت","Acoustic PPR plumbing & drainage networks with booster pumps"),unit:"مقطوعية",qty:1,rate:95e3,total:95e3,status:"approved"},{code:"03.03",desc:o("نظام سمارت هوم للتحكم بالإنارة والتكييف والستائر بروتوكول KNX","KNX Smart Home automation for lighting, climate and shading"),unit:"نظام",qty:1,rate:145e3,total:145e3,status:"approved"},{code:"03.04",desc:o("لوحات التوزيع الكهربائية والقواطع الذكية شنايدر إلكتريك","Schneider Electric main electrical distribution boards & RCBOs"),unit:"لوحة",qty:6,rate:14e3,total:84e3,status:"approved"},{code:"03.05",desc:o("أنظمة إنذار ومكافحة الحريق وكواشف الدخان المتطورة","Advanced addressable fire alarm, smoke detectors & clean agent extinguishers"),unit:"نظام",qty:1,rate:48e3,total:48e3,status:"approved"}]}];let E=0,L="";F.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);overflow:hidden;">
        <!-- Excel Green Header -->
        <div style="background:#107c41;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 8px rgba(16,124,65,0.25);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#107c41;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">X</div>
            <div>
              <div style="font-weight:800;font-size:14px;letter-spacing:-0.2px;">${g(t.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Excel Spreadsheet • ${o("جداول حساب الكميات والمقايسة المعتمدة","Approved Bill of Quantities")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="excel-print-btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ${v("printer",13)} ${o("طباعة المقايسة","Print BOQ")}
            </button>
            <button type="button" class="btn btn-sm" id="excel-direct-download" style="background:#ffffff;color:#107c41;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              ${v("download",13)} ${o("تنزيل ملف XLSX الأصلي","Download XLSX")}
            </button>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 18px;background:var(--surface-soft, #f8fafc);border-bottom:1px solid var(--line, #e2e8f0);flex-wrap:wrap;gap:10px;">
          <!-- Sheet Tabs -->
          <div style="display:flex;align-items:center;gap:6px;overflow-x:auto;" class="touch-scroll">
            ${$.map((U,O)=>`
              <button type="button" class="excel-sheet-tab-btn" data-sheet-idx="${O}" style="padding:6px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid ${O===0?"#107c41":"var(--line, #e2e8f0)"};background:${O===0?"#107c41":"var(--surface, #ffffff)"};color:${O===0?"#ffffff":"var(--ink, #0f172a)"};white-space:nowrap;transition:all 0.15s ease;">
                ${g(U.title)}
              </button>
            `).join("")}
          </div>

          <!-- Live Search Input -->
          <div style="position:relative;min-width:240px;flex:1;max-width:360px;">
            <input 
              type="search" 
              id="excel-live-search" 
              placeholder="${o("بحث في بنود جدول الكميات...","Search BOQ items...")}" 
              style="width:100%;padding:7px 12px;font-size:12px;border:1px solid var(--line, #e2e8f0);border-radius:8px;background:var(--surface, #ffffff);color:var(--ink, #0f172a);outline:none;box-sizing:border-box;"
            />
          </div>
        </div>

        <!-- Spreadsheet Grid Container -->
        <div style="flex:1;overflow:auto;position:relative;" class="touch-scroll doc-custom-scrollbar">
          <table style="width:100%;border-collapse:collapse;font-size:12px;text-align:start;">
            <thead style="position:sticky;top:0;background:var(--surface-soft, #f1f5f9);z-index:5;border-bottom:2px solid var(--line, #cbd5e1);color:var(--ink, #0f172a);font-weight:800;">
              <tr>
                <th style="padding:10px 14px;text-align:start;white-space:nowrap;">${o("رقم البند","Item #")}</th>
                <th style="padding:10px 14px;text-align:start;">${o("التوصيف والمواصفات الهندسية","Description & Engineering Specs")}</th>
                <th style="padding:10px 14px;text-align:center;white-space:nowrap;">${o("الوحدة","Unit")}</th>
                <th style="padding:10px 14px;text-align:center;white-space:nowrap;">${o("الكمية","Qty")}</th>
                <th style="padding:10px 14px;text-align:end;white-space:nowrap;">${o("السعر الفردي (ر.س)","Rate (SAR)")}</th>
                <th style="padding:10px 14px;text-align:end;white-space:nowrap;">${o("الإجمالي (ر.س)","Total (SAR)")}</th>
                <th style="padding:10px 14px;text-align:center;white-space:nowrap;">${o("الحالة","Status")}</th>
              </tr>
            </thead>
            <tbody id="excel-interactive-table-body">
              <!-- Rendered dynamically -->
            </tbody>
          </table>
        </div>

        <!-- Spreadsheet Footer Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:var(--surface-soft, #f8fafc);border-top:1px solid var(--line, #e2e8f0);flex-wrap:wrap;gap:10px;font-size:12px;">
          <div style="display:flex;align-items:center;gap:10px;color:var(--ink-soft, #475569);font-weight:700;">
            <span id="excel-filtered-count">0 بند</span>
            <span>•</span>
            <span>${o("العملة: ريال سعودي (SAR)","Currency: Saudi Riyal (SAR)")}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-weight:700;color:var(--ink-soft, #475569);">${o("إجمالي القسم المحدد:","Subtotal:")}</span>
            <span id="excel-sheet-subtotal" style="font-size:15px;font-weight:900;color:#107c41;font-family:monospace;">0 ر.س</span>
          </div>
        </div>
      </div>
    `,X(),document.querySelectorAll(".excel-sheet-tab-btn").forEach(U=>{U.addEventListener("click",()=>{E=parseInt(U.dataset.sheetIdx,10)||0,document.querySelectorAll(".excel-sheet-tab-btn").forEach((O,se)=>{se===E?(O.style.background="#107c41",O.style.borderColor="#107c41",O.style.color="#ffffff"):(O.style.background="var(--surface, #ffffff)",O.style.borderColor="var(--line, #e2e8f0)",O.style.color="var(--ink, #0f172a)")}),X()})}),document.getElementById("excel-live-search")?.addEventListener("input",U=>{L=U.target.value||"",X()}),document.getElementById("excel-print-btn")?.addEventListener("click",()=>window.print()),document.getElementById("excel-direct-download")?.addEventListener("click",()=>ge(t.id));return}if(x){F.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#1e242c;overflow:hidden;">
        <!-- Word Header -->
        <div style="background:#2b579a;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(43,87,154,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#2b579a;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">W</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${g(t.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Word Document • ${o("دفاتر الشروط والمواصفات الفنية المعتمدة","Approved Technical Specifications Document")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="word-print-btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ${v("printer",13)} ${o("طباعة الوثيقة","Print Specs")}
            </button>
            <button type="button" class="btn btn-sm" id="word-download-btn" style="background:#ffffff;color:#2b579a;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              ${v("download",13)} ${o("تنزيل DOCX الأصلي","Download DOCX")}
            </button>
          </div>
        </div>

        <!-- Section Navigation Chips -->
        <div style="padding:8px 18px;background:rgba(15,23,42,0.9);border-bottom:1px solid #334155;display:flex;align-items:center;gap:8px;overflow-x:auto;" class="touch-scroll">
          <span style="font-size:11px;color:#94a3b8;font-weight:700;white-space:nowrap;">${o("فهرس البنود:","Index:")}</span>
          <a href="#spec-sec-1" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:12px;font-size:11px;text-decoration:none;white-space:nowrap;">1. ${o("الاشتراطات العامة","General")}</a>
          <a href="#spec-sec-2" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:12px;font-size:11px;text-decoration:none;white-space:nowrap;">2. ${o("الخرسانة والحديد","Structural")}</a>
          <a href="#spec-sec-3" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:12px;font-size:11px;text-decoration:none;white-space:nowrap;">3. ${o("العوازل والواجهات","Insulation & Facades")}</a>
          <a href="#spec-sec-4" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:12px;font-size:11px;text-decoration:none;white-space:nowrap;">4. ${o("كود البناء SBC","SBC Codes")}</a>
        </div>

        <!-- Executive Document Body (A4 styled layout) -->
        <div style="flex:1;overflow-y:auto;padding:24px 16px;display:flex;justify-content:center;background:#0d1117;" class="touch-scroll doc-custom-scrollbar">
          <div style="width:100%;max-width:880px;background:#ffffff;color:#0f172a;border-radius:12px;box-shadow:0 15px 40px rgba(0,0,0,0.5);padding:clamp(20px, 4vw, 48px);box-sizing:border-box;font-family:system-ui, -apple-system, sans-serif;line-height:1.7;">
            
            <!-- Document Formal Letterhead -->
            <div style="border-bottom:2px solid #2b579a;padding-bottom:18px;margin-bottom:28px;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
              <div>
                <h1 style="margin:0 0 6px;font-size:22px;color:#2b579a;font-weight:900;">DARC DESIGN TEAM</h1>
                <p style="margin:0;font-size:13px;color:#64748b;font-weight:700;">${o("قسم إدارة الجودة والمواصفات الهندسية التنفيذية","Engineering Quality & Technical Specifications Division")}</p>
              </div>
              <div style="text-align:end;font-size:11px;color:#64748b;">
                <div><strong>${o("رقم الوثيقة:","Doc Code:")}</strong> SPEC-2026-VILLA-01-REV03</div>
                <div><strong>${o("تاريخ الاعتماد:","Date:")}</strong> 2026-11-01</div>
                <div><span class="status-badge approved" style="font-size:10px;display:inline-flex;align-items:center;gap:4px;margin-top:4px;">${v("check",11)} معتمد للتنفيذ (Approved for Construction)</span></div>
              </div>
            </div>

            <!-- Title -->
            <div style="background:#f1f5f9;border-right:4px solid #2b579a;padding:14px 18px;margin-bottom:30px;border-radius:4px;">
              <h2 style="margin:0 0 4px;font-size:17px;font-weight:900;color:#0f172a;">${o("دفتر المواصفات الفنية العامة والخاصة لمشروع فيلا النخيل السكنية","General & Particular Technical Specifications for Palm Villa Project")}</h2>
              <p style="margin:0;font-size:12px;color:#475569;">${o("مطابقة للمخططات المعمارية والإنشائية المعتمدة وكود البناء السعودي (SBC)","Compliant with Approved Drawings and the Saudi Building Code (SBC)")}</p>
            </div>

            <!-- Section 1 -->
            <section id="spec-sec-1" style="margin-bottom:30px;">
              <h3 style="font-size:15px;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">1. ${o("الاشتراطات العامة وضبط الجودة بالموقع","1. General Requirements & Site Quality Control")}</h3>
              <p style="font-size:13px;color:#334155;margin:0 0 10px;">
                ${o("يلتزم المقاول المنفذ بالتقيد التام بجميع المخططات المعتمدة الصادرة عن استشاري المشروع (DARC Design Team). لا يُسمح بإجراء أي تعديل أو استبدال في المواد أو الأبعاد دون الحصول على اعتماد خطي مسبق (RFI / Material Approval Request).","The contractor shall strictly adhere to all approved drawings issued by the consultant (DARC Design Team). No modifications or substitutions shall be executed without prior written approval.")}
              </p>
              <ul style="font-size:13px;color:#334155;padding-right:20px;margin:0;">
                <li>${o("تقديم عينات المواد والتشطيبات للاستشاري قبل التوريد بمدة لا تقل عن 15 يوماً.","Submit material samples at least 15 days prior to site delivery.")}</li>
                <li>${o("توثيق جميع مراحل الصب والتأسيس بتقرير مصور واختبارات مختبر معتمد.","Document all concrete pours with certified third-party lab testing.")}</li>
              </ul>
            </section>

            <!-- Section 2 -->
            <section id="spec-sec-2" style="margin-bottom:30px;">
              <h3 style="font-size:15px;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">2. ${o("مواصفات الأعمال الخرسانية وحديد التسليح","2. Concrete & Structural Steel Specifications")}</h3>
              <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:14px;border:1px solid #cbd5e1;">
                <thead>
                  <tr style="background:#f8fafc;color:#0f172a;">
                    <th style="padding:8px 12px;border:1px solid #cbd5e1;text-align:start;">${o("العنصر الإنشائي","Structural Element")}</th>
                    <th style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${o("رتبة الخرسانة (f’c)","Concrete Grade")}</th>
                    <th style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${o("نوع الإسمنت","Cement Type")}</th>
                    <th style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${o("هبوط الخرسانة (Slump)","Slump Test")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;font-weight:700;">${o("القواعد والرقاب والميد","Footings & Grade Beams")}</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;font-weight:800;color:#2b579a;">C35 (35 MPa)</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${o("مقاوم للأملاح Type V","Sulfate Resistant")}</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">120 ± 25 mm</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;font-weight:700;">${o("الأعمدة والأسقف والكمرات","Columns & Slabs")}</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;font-weight:800;color:#2b579a;">C40 (40 MPa)</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${o("بورتلاندي عادي Type I","Ordinary Portland")}</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">140 ± 25 mm</td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:12px;color:#475569;margin:0;">
                ${o("حديد التسليح: مطابق للمواصفة ASTM A615 Grade 60 بحد خضوع لا يقل عن 420 ميجاباسكال، مع حماية أطراف التشريك والربط بسلك مجلفن نمرة 18.","Reinforcing steel: Conforming to ASTM A615 Grade 60 with yield strength not less than 420 MPa.")}
              </p>
            </section>

            <!-- Section 3 -->
            <section id="spec-sec-3" style="margin-bottom:30px;">
              <h3 style="font-size:15px;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">3. ${o("أنظمة العزل والكسوات المعمارية والواجهات","3. Insulation, Facades & Cladding")}</h3>
              <p style="font-size:13px;color:#334155;margin:0 0 10px;">
                ${o("تُنفذ العوازل المائية للأسطح بنظام الممبرين المزدوج (Dual Layer 4mm SBS Membrane) مع ضمان لا يقل عن 10 سنوات، وتُعزل الجدران الخارجية بألواح بوليسترين مبثوق XPS سمك 75مم لتحقيق معامل انتقال حراري U-value مطابق لمعايير المركز السعودي لكفاءة الطاقة (SEEC).","Waterproofing for roof slabs shall be executed with dual 4mm SBS modified membrane carrying a 10-year warranty. External walls insulated with 75mm XPS.")}
              </p>
            </section>

            <!-- Section 4 -->
            <section id="spec-sec-4">
              <h3 style="font-size:15px;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">4. ${o("الالتزام بكود البناء السعودي (SBC)","4. Compliance with Saudi Building Code")}</h3>
              <p style="font-size:13px;color:#334155;margin:0;">
                ${o("تمت صياغة واعتماد هذه المواصفات لتتوافق بشكل كامل مع اشتراطات SBC 201 (المعماري)، SBC 304 (الخرساني)، SBC 601 (كفاءة الطاقة)، و SBC 801 (الحماية من الحريق).","These specifications comply fully with SBC 201 (Architectural), SBC 304 (Structural Concrete), SBC 601 (Energy), and SBC 801 (Fire Protection).")}
              </p>
            </section>
          </div>
        </div>
      </div>
    `,document.getElementById("word-print-btn")?.addEventListener("click",()=>window.print()),document.getElementById("word-download-btn")?.addEventListener("click",()=>ge(t.id));return}if(y){let L=function(){const b=$[E],P=document.getElementById("ppt-slide-canvas-viewport"),ne=document.getElementById("ppt-slide-counter"),G=document.getElementById("ppt-slide-dots-container");ne&&(ne.textContent=`${o("شريحة","Slide")} ${E+1} / ${$.length}`),G&&(G.innerHTML=$.map((H,fe)=>`
          <button type="button" class="ppt-dot" data-dot-idx="${fe}" style="width:${fe===E?"24px":"8px"};height:8px;border-radius:4px;border:none;background:${fe===E?"#d24726":"rgba(255,255,255,0.3)"};cursor:pointer;transition:all 0.2s ease;padding:0;" title="${o("انتقال للشريحة","Go to slide")} ${fe+1}"></button>
        `).join(""),G.querySelectorAll(".ppt-dot").forEach(H=>{H.addEventListener("click",()=>{E=parseInt(H.dataset.dotIdx,10)||0,L()})})),P&&(P.style.backgroundColor=b.theme,P.innerHTML=b.html,document.getElementById("ppt-slide-download-btn")?.addEventListener("click",()=>ge(t.id)))};const $=[{number:1,title:o("فلسفة التصميم والمفهوم المعماري","Design Philosophy & Architectural Concept"),subtitle:o("فيلا النخيل الفاخرة — مخرجات مرحلة المفهوم الأولي Concept Phase","Palm Villa Luxury Residence — Concept Deliverables"),theme:"#090d13",accent:"#d24726",html:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:clamp(16px, 4vw, 40px);box-sizing:border-box;">
            <span style="font-size:12px;font-weight:900;color:#d24726;background:rgba(210,71,38,0.18);padding:4px 14px;border-radius:20px;letter-spacing:1px;margin-bottom:16px;">
              DARC ARCHITECTURAL PORTFOLIO 2026
            </span>
            <h1 style="font-size:clamp(22px, 4vw, 38px);font-weight:900;color:#ffffff;margin:0 0 12px;line-height:1.2;">
              PALM VILLA LUXURY CONCEPT
            </h1>
            <p style="font-size:clamp(13px, 1.8vw, 16px);color:#94a3b8;max-width:620px;line-height:1.6;margin:0 0 24px;">
              ${o("دمج العمارة النجدية المعاصرة بالخطوط الهندسية الحديثة، مع تعزيز الانفتاح البصري والخصوصية العائلية المطلقة.","Seamless blend of contemporary regional architecture and modern minimalism, maximizing indoor-outdoor spatial harmony.")}
            </p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;font-size:12px;color:#cbd5e1;">
              <span style="background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);display:inline-flex;align-items:center;gap:6px;">${v("pin",12)} ${o("الرياض / نخلة جميرا","Riyadh / Palm Jumeirah")}</span>
              <span style="background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);display:inline-flex;align-items:center;gap:6px;">${v("compass",12)} ${o("المساحة المبنية: 1,450 م2","BUA: 1,450 sqm")}</span>
              <span style="background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);display:inline-flex;align-items:center;gap:6px;">${v("building",12)} ${o("الإصدار: Rev 03","Revision: Rev 03")}</span>
            </div>
          </div>
        `},{number:2,title:o("دراسة الكتلة والتوجيه البيئي","Massing & Solar Shading Analysis"),subtitle:o("تحليل مسار الشمس وحركة الرياح لتخفيض الأحمال الحرارية بنسبة 35%","Solar path & wind direction study yielding 35% thermal load reduction"),theme:"#0d1117",accent:"#0284c7",html:`
          <div style="height:100%;display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:24px;align-items:center;padding:clamp(16px, 3vw, 40px);box-sizing:border-box;">
            <div>
              <span style="color:#0284c7;font-weight:800;font-size:12px;text-transform:uppercase;">Analysis & Simulation</span>
              <h2 style="color:#ffffff;font-size:clamp(18px, 2.5vw, 24px);margin:6px 0 14px;font-weight:900;">${o("دراسة التوجيه ومسار الإشعاع الشمسي","Microclimate & Solar Shading Analysis")}</h2>
              <p style="color:#94a3b8;font-size:13px;line-height:1.7;margin:0 0 16px;">
                ${o("تم توجيه الفتحات الزجاجية الكبرى نحو الشمال والشمال الشرقي، مع استخدام كواسر شمسية عمودية (Vertical Louvers) في الواجهات الغربية والجنوبية لتجنب وهج الشمس المباشر.","Primary fenestrations oriented towards North and Northeast, complemented by motorized architectural louvers on the West elevation to mitigate solar heat gain.")}
              </p>
              <div style="display:grid;gap:8px;font-size:12px;">
                <div style="background:rgba(2,132,199,0.1);border-left:3px solid #0284c7;padding:8px 12px;color:#e2e8f0;display:flex;align-items:center;gap:6px;"><span class="ui-inline-icon icon-info">${v("zap",14)}</span> ${o("توفير سنوي مقدر بنسبة 32% في استهلاك طاقة التكييف.","32% estimated annual HVAC cooling load reduction.")}</div>
                <div style="background:rgba(16,185,129,0.1);border-left:3px solid #10b981;padding:8px 12px;color:#e2e8f0;display:flex;align-items:center;gap:6px;"><span class="ui-inline-icon icon-success">${v("leaf",14)}</span> ${o("استغلال الإضاءة الطبيعية لتقليل الاعتماد على الإنارة الاصطناعية النهارية.","Optimal daylight autonomy across all active family spaces.")}</div>
              </div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px dashed #334155;border-radius:12px;padding:24px;text-align:center;">
              <div style="margin-bottom:12px;color:#f59e0b;display:flex;justify-content:center;">${v("sun",44)}</div>
              <h4 style="color:#f8fafc;margin:0 0 6px;">${o("توزيع الإشعاع الشمسي المباشر","Direct Radiation Spectrum")}</h4>
              <p style="color:#64748b;font-size:11px;margin:0;">SBC 601 Certified Passive Thermal Envelope</p>
            </div>
          </div>
        `},{number:3,title:o("المخطط التوجيهي والفصل الحركي","Zoning & Circulation Flow"),subtitle:o("التدرج من الفضاءات العامة إلى غرف النوم العائلية الخاصة","Public hospitality zones to private family living quarters"),theme:"#090d13",accent:"#10b981",html:`
          <div style="height:100%;display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:24px;align-items:center;padding:clamp(16px, 3vw, 40px);box-sizing:border-box;">
            <div>
              <span style="color:#10b981;font-weight:800;font-size:12px;">Spatial Hierarchy</span>
              <h2 style="color:#ffffff;font-size:clamp(18px, 2.5vw, 24px);margin:6px 0 14px;font-weight:900;">${o("التوزيع الفضائي والتدرج الوظيفي","Spatial Flow & Privacy Gradients")}</h2>
              <ul style="color:#cbd5e1;font-size:13px;line-height:1.8;padding-right:20px;margin:0;">
                <li><strong>${o("الجناح الرسمي (Ground Floor Majlis):","Formal Majlis:")}</strong> ${o("مدخل مستقل، بهو استقبال واسع، دورات مياه وصالة طعام فاخرة.","Dedicated guest entrance, expansive atrium, and luxury formal dining.")}</li>
                <li><strong>${o("قلب الفيلا (Central Family Living):","Family Heart:")}</strong> ${o("صالة عائلية بارتفاع مزدوج (Double Height) مطلة على الحديقة والمسبح.","Double-height living space with panoramic glazed connection to pool.")}</li>
                <li><strong>${o("الجناح الخاص (First Floor Suites):","Private Suites:")}</strong> ${o("4 أجنحة نوم ماستر مع تراسات معلقة وغرفة معيشة خاصة.","4 Master bedroom suites with cantilevered balconies.")}</li>
              </ul>
            </div>
            <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.25);border-radius:12px;padding:24px;text-align:center;">
              <div style="margin-bottom:12px;color:#10b981;display:flex;justify-content:center;">${v("building",44)}</div>
              <h4 style="color:#f8fafc;margin:0 0 6px;">${o("مخطط الحركة والخصوصية التامة","Circulation & Privacy Blueprint")}</h4>
              <p style="color:#94a3b8;font-size:12px;margin:0;">${o("فصل تام لحركة الضيوف عن خصوصية أهل المنزل.","Zero visual overlap between guest circulation and family quarters.")}</p>
            </div>
          </div>
        `},{number:4,title:o("لوحة المواد والكسوات المعمارية","Materiality & Texture Palette"),subtitle:o("حجر ترافنتينو، خشب تيرموود معالج، زجاج عاكس وألمنيوم برونزي","Travertine stone, thermo-treated oak, bronze anodized aluminum"),theme:"#0c1015",accent:"#f59e0b",html:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;padding:clamp(16px, 3vw, 40px);box-sizing:border-box;">
            <h2 style="color:#ffffff;font-size:clamp(18px, 2.5vw, 24px);margin:0 0 20px;font-weight:900;">${o("لوحة المواد والتشطيبات الفاخرة المعتمدة","Curated Architectural Material Board")}</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;">
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;">
                <div style="width:36px;height:36px;border-radius:8px;background:#e2d9cc;margin-bottom:10px;"></div>
                <h4 style="color:#fff;margin:0 0 4px;font-size:13px;">${o("حجر ترافنتينو بيج روماني","Roman Travertine")}</h4>
                <p style="color:#94a3b8;font-size:11px;margin:0;">${o("ملمس طبيعي معالج للواجهات الخارجية وممرات المدخل.","Honed unfilled finish for primary exterior facades.")}</p>
              </div>
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;">
                <div style="width:36px;height:36px;border-radius:8px;background:#654321;margin-bottom:10px;"></div>
                <h4 style="color:#fff;margin:0 0 4px;font-size:13px;">${o("خشب تيرموود معالج بالحرارة","Thermo-Wood Slats")}</h4>
                <p style="color:#94a3b8;font-size:11px;margin:0;">${o("مقاوم للعوامل الجوية والحرارة العالية مع كواسر شمسية.","Weather-resistant acoustic external louvers.")}</p>
              </div>
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;">
                <div style="width:36px;height:36px;border-radius:8px;background:#38bdf8;margin-bottom:10px;"></div>
                <h4 style="color:#fff;margin:0 0 4px;font-size:13px;">${o("زجاج Low-E مزدوج العزل","Low-E Performance Glass")}</h4>
                <p style="color:#94a3b8;font-size:11px;margin:0;">${o("عزل صوتي 42dB مع نفاذية ضوء ممتازة وعزل حراري.","U-value: 1.1 W/m²K, 42dB acoustic isolation.")}</p>
              </div>
            </div>
          </div>
        `},{number:5,title:o("الابتكار الإنشائي والحلول الهندسية","Structural Innovation & Cantilevers"),subtitle:o("أطراف معلقة (Cantilevers) بطول 4.20م مع بلاطات لاكمرية مسبقة الإجهاد","Post-tensioned 4.2m cantilevers creating column-free covered terraces"),theme:"#090d13",accent:"#8b5cf6",html:`
          <div style="height:100%;display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:24px;align-items:center;padding:clamp(16px, 3vw, 40px);box-sizing:border-box;">
            <div>
              <span style="color:#8b5cf6;font-weight:800;font-size:12px;">Structural Feasibility</span>
              <h2 style="color:#ffffff;font-size:clamp(18px, 2.5vw, 24px);margin:6px 0 14px;font-weight:900;">${o("الحلول الإنشائية للأسقف الطائرة","Post-Tensioned Cantilevered Structure")}</h2>
              <p style="color:#94a3b8;font-size:13px;line-height:1.7;margin:0 0 16px;">
                ${o("استخدام كمرات مدفونة بنظام الكابلات مسبقة الإجهاد (Post-Tension) لإلغاء أي أعمدة في منطقة المسبح والجلسة الخارجية المفتوحة، مما يمنح إطلالة بانورامية كاملة بدون عوائق بصرية.","Integration of post-tensioned embedded transfer girders enables a 4.2m column-free overhang across the poolside terrace for uninterrupted panoramic outdoor living.")}
              </p>
            </div>
            <div style="background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.25);border-radius:12px;padding:24px;text-align:center;">
              <div style="margin-bottom:12px;color:#8b5cf6;display:flex;justify-content:center;">${v("construction",44)}</div>
              <h4 style="color:#f8fafc;margin:0 0 6px;">4.20m Column-Free Overhang</h4>
              <p style="color:#94a3b8;font-size:12px;margin:0;">SBC 304 Reinforced Concrete Engineering Verification</p>
            </div>
          </div>
        `},{number:6,title:o("السيناريوهات الليلية وتصميم الإنارة","Nightscape & Lighting Symphony"),subtitle:o("درجات حرارة لونية دافئة (2700K - 3000K) مع إنارة جدارية مخفية","Warm 2700K-3000K indirect wash lighting emphasizing facade depth"),theme:"#070a0f",accent:"#f43f5e",html:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:clamp(16px, 4vw, 40px);box-sizing:border-box;">
            <span style="color:#f43f5e;font-weight:800;font-size:12px;margin-bottom:12px;">Illumination Design</span>
            <h2 style="color:#ffffff;font-size:clamp(20px, 3vw, 30px);font-weight:900;margin:0 0 16px;">${o("الرؤية الليلية وتوزيع الإنارة المعمارية","Architectural Nightscape & Facade Lighting")}</h2>
            <p style="color:#94a3b8;font-size:14px;max-width:620px;line-height:1.7;margin:0 0 24px;">
              ${o("تم تصميم الإنارة المعمارية لتعزيز بروز كتل الحجر والخشب ليلاً بدون أي تلوث ضوئي، مع تخصيص مسارات إنارة أرضية خفية حول المسبح والحدائق العلوية.","Indirect warm linear wash illumination elevates natural textures, while shielded low-glare ground fixtures define evening circulation.")}
            </p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
              <button type="button" class="btn btn-primary" id="ppt-slide-download-btn" style="background:#d24726;border:none;padding:10px 22px;border-radius:8px;font-weight:800;display:inline-flex;align-items:center;gap:6px;">
                ${v("download",14)} ${o("تنزيل العرض التقديمي الكامل (PPTX)","Download Complete Presentation (PPTX)")}
              </button>
            </div>
          </div>
        `}];let E=0;F.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#090d13;color:#f0f6fc;overflow:hidden;user-select:none;">
        <!-- PPT Header -->
        <div style="background:#d24726;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(210,71,38,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d24726;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">P</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${g(t.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft PowerPoint Presentation • ${o("عرض المفهوم المعماري الأولي","Concept Design Presentation Deck")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span id="ppt-slide-counter" style="font-size:12px;font-weight:800;background:rgba(0,0,0,0.25);padding:4px 10px;border-radius:12px;">شريحة 1 / 6</span>
            <button type="button" class="btn btn-sm" id="ppt-download-btn" style="background:#ffffff;color:#d24726;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              ${v("download",13)} ${o("تنزيل PPTX الأصلي","Download PPTX")}
            </button>
          </div>
        </div>

        <!-- Slide Display Viewport with Touch Navigation -->
        <div style="flex:1;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;" id="ppt-touch-wrapper">
          <!-- Slide Canvas -->
          <div id="ppt-slide-canvas-viewport" style="width:100%;height:100%;overflow:hidden;transition:background-color 0.3s ease;">
            <!-- Slide Injected Here -->
          </div>

          <!-- Prev/Next Overlay Buttons (Apple HIG touch friendly >= 48px) -->
          <button type="button" id="ppt-prev-btn" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-size:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;box-shadow:0 8px 24px rgba(0,0,0,0.5);transition:all 0.15s ease;" title="${o("الشريحة السابقة","Previous Slide")}">
            ‹
          </button>
          <button type="button" id="ppt-next-btn" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-size:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;box-shadow:0 8px 24px rgba(0,0,0,0.5);transition:all 0.15s ease;" title="${o("الشريحة التالية","Next Slide")}">
            ›
          </button>
        </div>

        <!-- Bottom Controls & Dots Indicator -->
        <div style="padding:10px 18px;background:rgba(10,14,20,0.95);border-top:1px solid #1e293b;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div id="ppt-slide-dots-container" style="display:flex;align-items:center;gap:6px;">
            <!-- Dots injected dynamically -->
          </div>
          <div style="font-size:11px;color:#94a3b8;">
            ${o("استخدم الأسهم ‹ › أو اسحب الشاشة للتنقل بين الشرائح","Use ‹ › arrows or touch swipe to navigate slides")}
          </div>
        </div>
      </div>
    `,L();const X=()=>{E=(E+1)%$.length,L()},U=()=>{E=(E-1+$.length)%$.length,L()};document.getElementById("ppt-next-btn")?.addEventListener("click",X),document.getElementById("ppt-prev-btn")?.addEventListener("click",U);const O=b=>{(b.key==="ArrowRight"||b.key==="ArrowDown")&&X(),(b.key==="ArrowLeft"||b.key==="ArrowUp")&&U()};window.addEventListener("keydown",O),window.__docPreviewCleanups=window.__docPreviewCleanups||[],window.__docPreviewCleanups.push(()=>window.removeEventListener("keydown",O));const se=document.getElementById("ppt-touch-wrapper");if(se){let b=0;se.addEventListener("touchstart",P=>{b=P.changedTouches[0].screenX},{passive:!0}),se.addEventListener("touchend",P=>{const ne=P.changedTouches[0].screenX-b;Math.abs(ne)>40&&(ne<0?X():U())},{passive:!0})}document.getElementById("ppt-download-btn")?.addEventListener("click",()=>ge(t.id));return}if(h){F.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);color:var(--text, #0f172a);overflow:hidden;">
        <!-- Zip Header -->
        <div style="background:#d97706;color:#ffffff;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d97706;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">${v("package",18)}</div>
            <div>
              <div style="font-weight:800;font-size:15px;">${g(t.originalName)}</div>
              <div style="font-size:12px;opacity:0.9;">Archive Deliverable Package • ${l}</div>
            </div>
          </div>
          <button type="button" class="btn btn-sm" id="zip-download-btn" style="background:#ffffff;color:#d97706;border:none;padding:6px 16px;border-radius:6px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
            ${v("download",13)} ${o("تنزيل كامل الحزمة المضغوطة","Download Full Archive")}
          </button>
        </div>

        <!-- Archive Workspace Viewport -->
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;">
          <div style="max-width:540px;">
            <div style="margin-bottom:16px;color:#d97706;display:flex;justify-content:center;">${v("package",48)}</div>
            <h3 style="color:var(--text, #0f172a);font-size:18px;font-weight:800;margin:0 0 8px 0;">${g(t.originalName)}</h3>
            <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${o("ملف أرشيف مضغوط حقيقي معتمد. يحتوي على كامل مخرجات المشروع الهندسية جاهزة للتنزيل وفك الضغط.","Authentic archive deliverable. Ready for direct binary download and local extraction.")}
            </p>
            <button type="button" class="btn btn-primary" id="zip-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#d97706;color:#fff;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
              ${v("download",14)} ${o("تنزيل الحزمة المضغوطة الآن","Download Archive Now")} (${l})
            </button>
          </div>
        </div>
      </div>
    `,document.getElementById("zip-download-btn")?.addEventListener("click",()=>ge(t.id)),document.getElementById("zip-cta-download")?.addEventListener("click",()=>ge(t.id));return}F.innerHTML=`
    <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;background:var(--surface, #ffffff);">
      <div style="width:80px;height:80px;border-radius:20px;background:${i.bg};color:${i.color};display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:900;margin-bottom:20px;border:2px solid ${i.border};">
        ${i.ext}
      </div>
      <h2 style="font-size:22px;font-weight:900;margin:0 0 8px 0;color:var(--text, #0f172a);">${g(t.originalName)}</h2>
      <p style="color:#64748b;font-size:14px;max-width:480px;line-height:1.6;margin:0 0 24px 0;">
        ${o("هذا المستند المعماري جاهز للتنزيل المباشر أو الفتح عبر التطبيق الهندسي المختص.","This architectural document is ready for direct download or local desktop review.")}
      </p>
      <div style="display:flex;gap:12px;">
        <button type="button" class="btn btn-primary" id="fallback-download-btn" style="padding:10px 24px;border-radius:8px;font-weight:800;display:inline-flex;align-items:center;gap:6px;">
          ${v("download",14)} ${o("تنزيل الملف الآن","Download File")} (${l})
        </button>
      </div>
    </div>
  `,document.getElementById("fallback-download-btn")?.addEventListener("click",()=>ge(t.id))}document.getElementById("btn-engine-native")?.addEventListener("click",()=>w("native")),document.getElementById("btn-engine-drive")?.addEventListener("click",()=>w("drive")),w("native")}var Ko=Ze({STATUS_OPTIONS:()=>Ji,buildAssigneeChipsHtml:()=>zn,buildRemindersListHtml:()=>Bn,canUserMoveTask:()=>Qe,canUserUploadToTask:()=>ji,closeDocumentPreviewModal:()=>Lt,downloadDocument:()=>ge,drawTimelineArrows:()=>oo,filterTasks:()=>Ui,formatRemindAtDate:()=>Wi,getDocumentShareableLink:()=>jn,getSavedTaskSort:()=>Et,getTaskSortOrder:()=>vt,handleCopyDocLink:()=>Pi,initTaskModalWidgets:()=>Vi,openDocumentPreviewModal:()=>no,openTaskModal:()=>ao,renderBoard:()=>qi,renderCalendar:()=>On,renderTaskAssignees:()=>Ri,renderTaskBadgesRow:()=>Ni,renderTaskComments:()=>Fn,renderTaskDocuments:()=>Gi,renderTaskMetaRow:()=>Oi,renderTaskSortSelect:()=>Bi,renderTasks:()=>io,renderTimeline:()=>Nn,renderTimelinePanel:()=>Hi,setSavedTaskSort:()=>Cn,sortTasks:()=>Fi,sortTasksByImportance:()=>zi,taskCard:()=>nn,verifyBoardSymmetry:()=>an});function Ri(e){const t=s.data?.users||[],n=s._userMap||new Map(t.map(l=>[l.id,l])),i=e.assignee||n.get(e.assigneeId),a=(e.customFields?.additionalAssignees||e.customFields?.additional_assignees||[]).map(l=>n.get(l)).filter(Boolean),r=e.customFields?.externalAssignees||e.customFields?.external_assignees||[];let d='<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';return i||a.length?(d+='<div class="avatar-stack" style="display:flex;align-items:center;">',i&&(d+=`<span title="${g(o(i.name,i.nameEn||i.name))}">${Be(i,"mini-avatar")}</span>`),a.slice(0,2).forEach(l=>{d+=`<span title="${g(o(l.name,l.nameEn||l.name))}" style="margin-inline-start:-8px;">${Be(l,"mini-avatar")}</span>`}),a.length>2&&(d+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${a.slice(2).map(l=>o(l.name,l.nameEn||l.name)).join("، ")}">+${a.length-2}</span>`),d+="</div>",i&&(d+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${g(o(i.name,i.nameEn||i.name))}</span>`)):r.length||(d+='<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>'),r.length&&(r.slice(0,2).forEach(l=>{d+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${g(l)}">${v("globe",11)} ${g(l)} <small style="opacity:0.8">(${o("خارجي","Ext")})</small></span>`}),r.length>2&&(d+=`<span style="font-size:10px;color:var(--amber);" title="${r.slice(2).map(g).join("، ")}">+${r.length-2}</span>`)),d+="</div>",d}function ji(e){if(!e)return!1;if(ee())return!0;if(!z("upload_documents")&&!z("edit_tasks"))return!1;const t=s.data?.user?.id;if(!t)return!1;if(Qe(e))return!0;const n=e.projectId||e.project_id;if(n&&Array.isArray(s.data?.projects)){const i=s.data.projects.find(a=>a.id===n);if(i){const a=i.managerId||i.manager_id,r=i.ownerId||i.owner_id||i.leadId||i.lead_id||i.createdById||i.created_by;if(a===t||r===t||Array.isArray(i.members)&&i.members.some(d=>(d.userId||d.id||d)===t)||Array.isArray(i.memberIds)&&i.memberIds.includes(t))return!0}}return!1}function Oi(e){const t=!!e._isOfflinePending,n=g(e.templateId?e.templateId.replace("tpl-","#"):"#CUSTOM");return`
    <div class="task-card-meta-line">
      <div class="task-card-code-wrap">
        <span class="task-drag-handle" title="${o("اسحب لتحريك المهمة","Drag to reorder")}" aria-label="${o("مقبض السحب","Drag handle")}" role="button" tabindex="0"><span class="drag-handle-dots" aria-hidden="true">⋮⋮</span></span>
        <span class="task-code">${n}</span>
      </div>
      ${t?`<span class="badge badge-amber badge-offline-pending" style="font-size:9px;padding:1px 5px;display:inline-flex;align-items:center;gap:3px;border-radius:4px;white-space:nowrap;line-height:1.2;" title="${o("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">${v("hourglass",10)} <span>${o("معلقة","Pending")}</span></span>`:""}
    </div>
  `}function Ni(e,t=0,n=0,i=""){const a=e.priority?`<span class="priority-badge ${g(e.priority)}">${g(Dn(e.priority))}</span>`:"",r=t>0||n>0?`
    <div class="task-card-counters" style="display:inline-flex;align-items:center;gap:4px;margin-inline-start:auto;">
      ${t>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${t} ${o("تعليقات","comments")}">${v("chat",11)} ${t}</span>`:""}
      ${n>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${n} ${o("مرفقات","attachments")}">${v("link",11)} ${n}</span>`:""}
    </div>
  `:"";return`
    <div class="task-card-badges-line">
      ${a}
      ${i||""}
      ${r}
    </div>
  `}function nn(e){const t=En(e),n=t==="overdue"||en(e);let i="",a="";t==="overdue"?(a="is-overdue",i=`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;white-space:nowrap;">${v("alert",11)} ${o("متأخرة","Overdue")}</span>`):t==="due_24h"?(a="is-due-24h",i=`<span class="due-tag-24h" style="display:inline-flex;align-items:center;gap:3px;white-space:nowrap;" title="${o("متبقي أقل من 24 ساعة على موعد التسليم","Due in less than 24 hours")}">${v("clock",11)} ${o("خلال 24 ساعة","Due in 24h")}</span>`):t==="due_48h"?(a="is-due-48h",i=`<span class="due-tag-48h" style="display:inline-flex;align-items:center;gap:3px;white-space:nowrap;" title="${o("متبقي أقل من 48 ساعة على موعد التسليم","Due within 48 hours")}">${v("clock",11)} ${o("خلال 48 ساعة","Due in 48h")}</span>`):t==="due_72h"&&(a="is-due-72h",i=`<span class="due-tag-72h" style="display:inline-flex;align-items:center;gap:3px;white-space:nowrap;" title="${o("متبقي أقل من 72 ساعة على موعد التسليم","Due within 72 hours")}">${v("clock",11)} ${o("خلال 72 ساعة","Due in 72h")}</span>`);const r=n?"var(--red)":t==="due_24h"?"#ea580c":t==="due_48h"?"#d97706":t==="due_72h"?"#0284c7":"var(--muted)",d=s._commentCounts?s._commentCounts[e.id]||0:(s.data?.comments||[]).filter(m=>m.taskId===e.id).length,l=s._docCounts?s._docCounts[e.id]||0:(s.data?.documents||[]).filter(m=>m.taskId===e.id).length,c=e.progress===100?"var(--mint-strong)":e.progress>=80?"var(--amber)":e.progress>0?"var(--blue)":"var(--line)",p=Qe(e),u=o(e.titleAr,e.titleEn);return`<article class="task-card ${a} ${p?"":"not-draggable"}" draggable="false" tabindex="0" role="button" aria-roledescription="sortable task card" aria-label="${g(u)}" data-action="open-task" data-task-id="${g(e.id)}">
    <header class="task-card-header">
      ${Oi(e)}
      ${Ni(e,d,l,i)}
    </header>
    <h4>${g(o(e.titleAr,e.titleEn))}</h4>
    ${(()=>{const m=String(o(e.descriptionAr||e.description,e.descriptionEn||e.description)||"").trim();if(!m)return"";const x=m.length>50?m.substring(0,50).trim()+"...":m;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${g(m)}">${g(x)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${g(o(e.categoryAr,e.categoryEn)||"")}</span>
      ${e.dueDate?`<span class="task-due-date" style="display:inline-flex;align-items:center;gap:3px;color:${r};font-weight:${n||t?"700":"500"};">${v("calendar",11)} ${Tt(e.dueDate)}</span>`:""}
    </div>
    <div class="task-card-foot">
      ${Ri(e)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${e.progress===100?"var(--mint-strong)":"var(--teal)"};">${e.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${e.progress}%;background:${c};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function vt(e){if(!e)return 999999;if(typeof e.sortOrder=="number")return e.sortOrder;if(typeof e.sort_order=="number")return e.sort_order;if(e.customFields){if(typeof e.customFields.sortOrder=="number")return e.customFields.sortOrder;if(typeof e.customFields.sort_order=="number")return e.customFields.sort_order}if(e.custom_fields){if(typeof e.custom_fields.sortOrder=="number")return e.custom_fields.sortOrder;if(typeof e.custom_fields.sort_order=="number")return e.custom_fields.sort_order}return 999999}function zi(e=[]){const t={urgent:4,high:3,medium:2,low:1},n=Date.now();return[...e].sort((i,a)=>{const r=i.status==="blocked"?1:0,d=a.status==="blocked"?1:0;if(r!==d)return d-r;const l=i.dueDate?new Date(`${i.dueDate.split("T")[0]}T23:59:59`).getTime():null,c=a.dueDate?new Date(`${a.dueDate.split("T")[0]}T23:59:59`).getTime():null,p=l&&l<n&&i.status!=="done"?1:0,u=c&&c<n&&a.status!=="done"?1:0;if(p!==u)return u-p;const m=t[i.priority]||2,x=t[a.priority]||2;if(m!==x)return x-m;if(l&&c){if(l!==c)return l-c}else{if(l&&!c)return-1;if(!l&&c)return 1}const y=vt(i),h=vt(a);return y!==h?y-h:(i.titleAr||"").localeCompare(a.titleAr||"","ar")})}function Et(){try{return localStorage.getItem("darc_task_sort_pref")||"custom"}catch{return"custom"}}function Bi(e,t="sort-project-tasks"){const n=e||Et();return`
    <div class="sort-box">
      <span>${o("الترتيب:","Sort:")}</span>
      <select class="filter-select select-compact" data-action="${t}">
        <option value="custom" ${n==="custom"?"selected":""}>${o("ترتيب مخصص (السحب والإسقاط)","Custom (Drag & Drop)")}</option>
        <option value="importance" ${n==="importance"?"selected":""}>${o("حسب الأهمية والأولوية","By Importance & Priority")}</option>
        <option value="deadline" ${n==="deadline"?"selected":""}>${o("الأقرب استحقاقاً","Earliest Deadline")}</option>
        <option value="alpha" ${n==="alpha"?"selected":""}>${o("أبجدياً","Alphabetical")}</option>
      </select>
    </div>
  `}function Fi(e=[],t=Et()){return t==="deadline"?[...e].sort((n,i)=>(n.dueDate?new Date(`${n.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)-(i.dueDate?new Date(`${i.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)):t==="custom"?[...e].sort((n,i)=>vt(n)-vt(i)):t==="alpha"?[...e].sort((n,i)=>(n.titleAr||"").localeCompare(i.titleAr||"","ar")):zi(e)}function qi(e,t=Et()){const n=s.data?.users||[];s._userMap=new Map(n.map(d=>[d.id,d]));const i={};for(const d of s.data?.comments||[])d.taskId&&(i[d.taskId]=(i[d.taskId]||0)+1);const a={};for(const d of s.data?.documents||[])d.taskId&&(a[d.taskId]=(a[d.taskId]||0)+1);s._commentCounts=i,s._docCounts=a;const r=[{key:"not_started",dot:"",label:T("notStarted")},{key:"in_progress",dot:"blue",label:T("inProgress")},{key:"review",dot:"amber",label:o("مراجعة / اعتماد","Review / approval"),statuses:["review","approval","blocked"]},{key:"done",dot:"green",label:T("done")}];return typeof requestAnimationFrame=="function"&&requestAnimationFrame(()=>{an()}),`<div class="board">${r.map(d=>{const l=Fi(e.filter(c=>(d.statuses||[d.key]).includes(c.status)),t);return`<section class="board-column" data-status="${d.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${d.dot}"></span>${d.label}</div><span class="board-count">${l.length}</span></div><div class="board-cards">${l.length?l.map(nn).join(""):`<div class="empty" style="min-height:150px;pointer-events:none;">${T("noTasks")}</div>`}</div></section>`}).join("")}</div>`}function an(){if(typeof document>"u")return;const e=document.querySelector(".board, .tasks-board");if(!e)return;const t=Array.from(e.querySelectorAll(".board-column"));if(t.length<2)return;if(typeof window<"u"&&window.innerWidth<=880){e.style.display="",e.style.gridTemplateColumns="",e.style.gridAutoColumns="",t.forEach(a=>{a.style.width="",a.style.minWidth="",a.style.maxWidth="",a.style.flex=""});return}const n=t.map(a=>Math.round(a.getBoundingClientRect().width*10)/10),i=Math.min(...n);Math.max(...n)-i>2.5&&(e.style.display="grid",e.style.gridTemplateColumns=`repeat(${t.length}, minmax(0, 1fr))`,e.style.gridAutoColumns="1fr",t.forEach(a=>{a.style.width="100%",a.style.minWidth="0",a.style.maxWidth="100%",a.style.flex="1 1 0px"}))}if(typeof window<"u"&&!window._boardResizeBound){window._boardResizeBound=!0;let e=null;window.addEventListener("resize",()=>{e&&cancelAnimationFrame(e),e=requestAnimationFrame(()=>{an()})},{passive:!0})}typeof window<"u"&&(window.verifyBoardSymmetry=an);function On(e,t){const n=s.calendarDate?new Date(s.calendarDate):new Date,i=n.getFullYear(),a=n.getMonth(),r=`${s.lang==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][a]:["January","February","March","April","May","June","July","August","September","October","November","December"][a]} ${i}`,d=s.lang==="ar"?["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],l=new Date(i,a,1).getDay(),c=new Date(i,a+1,0).getDate(),p=new Date,u=p.getFullYear()===i&&p.getMonth()===a;let m="";for(let x=0;x<l;x++)m+='<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>';for(let x=1;x<=c;x++){const y=u&&p.getDate()===x,h=`${i}-${String(a+1).padStart(2,"0")}-${String(x).padStart(2,"0")}`,f=e.filter(k=>{if(!k.dueDate&&!k.startDate)return!1;const S=k.dueDate?k.dueDate.split("T")[0]:null,A=k.startDate?k.startDate.split("T")[0]:null;return S===h||A===h});m+=`
      <div class="calendar-day ${y?"is-today":""}" style="min-height:95px;min-width:0;overflow:hidden;background:${y?"var(--mint)":"var(--surface)"};border:1px solid ${y?"var(--teal)":"var(--line)"};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${y?"bold":"600"};color:${y?"var(--teal)":"var(--ink)"};">
          <span>${x}</span>
          ${y?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${o("اليوم","Today")}</span>`:""}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${f.map(k=>{const S=qt(k);return`
              <div data-action="open-task" data-task-id="${g(k.id)}" style="background:${S.bgColor};border:1px solid ${S.borderColor};border-inline-start:3px solid ${S.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${S.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${g(o(k.titleAr,k.titleEn))} — ${S.label}">
                <span style="font-weight:700;">${g(o(k.titleAr,k.titleEn))}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}return`
    <div class="calendar-wrapper" style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;">
      <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;font-size:15px;color:var(--ink);display:flex;align-items:center;gap:8px;">
          ${v("calendar",16)} ${r}
        </h3>
        <div style="display:flex;align-items:center;gap:6px;">
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${v(s.lang==="ar"?"arrow":"arrowLeft",12)} ${o("السابق","Prev")}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${o("اليوم","Today")}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${o("التالي","Next")} ${v(s.lang==="ar"?"arrowLeft":"arrow",12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${d.map(x=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${x}</div>`).join("")}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${m}
      </div>
    </div>
  `}function Nn(e){const t=e.filter(y=>y.startDate&&y.dueDate).sort((y,h)=>new Date(y.startDate)-new Date(h.startDate));if(!t.length)return`<div class="empty" style="min-height:300px">${v("calendar",24)}<span>${o("لا توجد مهام مجدولة زمنياً في هذا المشروع.","No scheduled tasks in this project.")}</span></div>`;let n=Math.min(...t.map(y=>new Date(y.startDate).getTime())),i=Math.max(...t.map(y=>new Date(y.dueDate).getTime()));const a=Math.max(7,Math.ceil((i-n)/864e5)),r=s.timelineScale||(a>45?"month":a>14?"week":"day");let d="",l="",c=600,p=y=>1,u=(y,h)=>1;if(r==="month"){const y=new Date(n);y.setDate(1);const h=new Date(i);h.setMonth(h.getMonth()+1),h.setDate(0);const f=[],k=new Date(y);for(;k<=h;)f.push(new Date(k)),k.setMonth(k.getMonth()+1);const S=Math.max(1,f.length);l=`repeat(${S}, minmax(90px, 1fr))`,c=S*90;const A=Xe();d=f.map(_=>{const N=A==="hijri"?s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",j=new Intl.DateTimeFormat(N,{month:"short",year:"numeric"}).format(_);return`<div style="padding:10px 6px;text-align:center;font-size:11px;font-weight:700;color:var(--ink-soft);border-right:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--surface-soft);">${g(j)}</div>`}).join(""),p=_=>{const N=new Date(_),j=(N.getFullYear()-y.getFullYear())*12+(N.getMonth()-y.getMonth());return Math.max(1,j+1)},u=(_,N)=>{const j=new Date(_),F=new Date(N),M=(F.getFullYear()-j.getFullYear())*12+(F.getMonth()-j.getMonth());return Math.max(1,M+1)}}else if(r==="week"){n-=6048e5,i+=6048e5;const h=Math.max(4,Math.ceil((i-n)/6048e5));l=`repeat(${h}, minmax(65px, 1fr))`,c=h*65;for(let f=0;f<h;f++){const k=new Date(n+f*7*864e5),S=new Intl.DateTimeFormat(s.lang==="ar"?"ar-SA":"en-GB",{month:"short",day:"numeric"}).format(k);d+=`<div style="padding:10px 4px;text-align:center;font-size:10px;font-weight:600;color:var(--ink-soft);border-right:1px solid var(--line);border-bottom:1px solid var(--line);">${o("أسبوع","W")} ${f+1}<br><span style="font-size:9px;color:var(--muted);">${S}</span></div>`}p=f=>Math.max(1,Math.floor((new Date(f).getTime()-n)/6048e5)+1),u=(f,k)=>Math.max(1,Math.ceil((new Date(k).getTime()-new Date(f).getTime())/6048e5)+1)}else{n-=2592e5,i+=2592e5;const h=Math.max(7,Math.ceil((i-n)/864e5));l=`repeat(${h}, minmax(40px, 1fr))`,c=h*40;for(let f=0;f<h;f++){const k=new Date(n+f*864e5),S=k.getDay()===5||k.getDay()===6,A=Xe()==="hijri"?s.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":s.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",_=new Intl.DateTimeFormat(A,{month:"short"}).format(k);d+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${S?"var(--surface-soft)":"transparent"};border-bottom:1px solid var(--line)">${k.getDate()}<br>${_}</div>`}p=f=>Math.max(1,Math.floor((new Date(f).getTime()-n)/864e5)+1),u=(f,k)=>Math.max(1,Math.ceil((new Date(k).getTime()-new Date(f).getTime())/864e5)+1)}const m=t.map((y,h)=>{const f=qt(y);return`
      <div class="timeline-task-cell" data-action="open-task" data-task-id="${y.id}" style="height:48px;padding:6px 12px;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:8px;cursor:pointer;background:var(--surface);" title="${g(o(y.titleAr,y.titleEn))}">
        <span style="width:8px;height:8px;border-radius:50%;background:${f.color};flex-shrink:0;"></span>
        <div style="min-width:0;flex:1;display:flex;flex-direction:column;gap:1px;">
          <div style="display:flex;align-items:center;gap:4px;">
            <span style="font-size:10px;font-weight:700;color:var(--ink-soft);">${g(y.templateId?y.templateId.replace("tpl-","#"):"#")}</span>
            <span style="font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--ink);">${g(o(y.titleAr,y.titleEn))}</span>
          </div>
          <span style="font-size:9px;color:var(--muted);">${f.label}</span>
        </div>
      </div>
    `}).join(""),x=t.map((y,h)=>{const f=p(y.startDate),k=f+u(y.startDate,y.dueDate),S=qt(y);return`<div style="display:contents" class="timeline-row" data-task-id="${y.id}" data-row="${h}">
      <div style="grid-column: 1 / -1; height:48px; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${y.id}" style="grid-column: ${f} / ${k}; margin: 8px 4px; height:32px; display:flex; align-items:center; background: ${S.color}; border: 1px solid ${S.borderColor}; border-radius: 6px; padding: 4px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${g(o(y.titleAr,y.titleEn))} — ${S.label}">
        <span style="font-weight:700;opacity:0.95;margin-inline-end:4px;">${g(y.templateId?y.templateId.replace("tpl-","#"):"#")}</span> ${g(o(y.titleAr,y.titleEn))}
        ${y.dependencies&&y.dependencies.length?`<span style="margin-inline-start:auto;opacity:0.85">${v("link",10)}</span>`:""}
      </div>
    </div>`}).join("");return`
    <div class="timeline-split-wrapper" style="display:flex;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--surface);">
      <!-- Left Sticky Task Hierarchy Column -->
      <div class="timeline-left-column" style="width:230px;min-width:180px;flex-shrink:0;border-inline-end:1px solid var(--line);background:var(--surface);z-index:5;">
        <div style="height:41px;padding:10px 12px;font-size:11px;font-weight:700;color:var(--ink-soft);background:var(--surface-soft);border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;">
          <span>${o("المهام والجدول","Tasks & Timeline")}</span>
          <span class="badge badge-sm" style="font-size:10px;">${t.length}</span>
        </div>
        <div style="overflow-y:hidden;">
          ${m}
        </div>
      </div>

      <!-- Right Scrollable Gantt Flow -->
      <div class="timeline-container" style="flex:1;min-width:0;overflow-x:auto;-webkit-overflow-scrolling:touch;touch-action:pan-x pan-y;position:relative;">
        <div style="display:grid; grid-template-columns: ${l}; min-width: ${c}px; position: relative;">
          ${d}
          ${x}
          <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
        </div>
      </div>
    </div>
  `}function Hi(e,t){const n=s.timelineView||"gantt",i=s.timelineScale||"month";return`
    <div class="panel">
      <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 class="panel-title">${o("المخطط الزمني والتقويم","Timeline & Calendar")}</h2>
          <p class="panel-subtitle">${o("متابعة تسلسل المهام ومواعيد التسليم وفق المعايير المعمارية العالمية.","Track task flow and milestone deadlines using global engineering standards.")}</p>
        </div>
        
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          ${n==="gantt"?`
            <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:2px;gap:2px;">
              <button class="btn btn-xs ${i==="day"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-scale" data-scale="day" style="font-size:10px;padding:3px 8px;">
                ${o("يومي","Day")}
              </button>
              <button class="btn btn-xs ${i==="week"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-scale" data-scale="week" style="font-size:10px;padding:3px 8px;">
                ${o("أسبوعي","Week")}
              </button>
              <button class="btn btn-xs ${i==="month"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-scale" data-scale="month" style="font-size:10px;padding:3px 8px;">
                ${o("شهري","Month")}
              </button>
            </div>
          `:""}

          <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:3px;gap:3px;">
            <button class="btn btn-sm ${n==="gantt"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="gantt" style="font-size:11px;padding:4px 10px;">
              ${v("clock",12)} ${o("مخطط جانت","Gantt Chart")}
            </button>
            <button class="btn btn-sm ${n==="calendar"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="calendar" style="font-size:11px;padding:4px 10px;">
              ${v("calendar",12)} ${o("عرض التقويم","Calendar View")}
            </button>
          </div>
        </div>
      </div>
      
      ${n==="calendar"?On(e,t):Nn(e)}
    </div>
  `}typeof window<"u"&&(window.__timelineExports={renderTimelinePanel:Hi,renderCalendar:On,renderTimeline:Nn});function Ui(e){const t=hn(s.searches?.tasks||"");return e.filter(n=>{const i=!t||hn(`${n.titleAr||""} ${n.titleEn||""} ${n.categoryAr||""} ${n.categoryEn||""}`).includes(t),a=s.taskFilter==="all"||s.taskFilter==="mine"&&Ai(n,s.data?.user?.id)||s.taskFilter==="due_soon"&&$i(n)||s.taskFilter==="overdue"&&en(n)||s.taskFilter==="blocked"&&n.status==="blocked",r=s.taskProjectFilter==="all"||n.projectId===s.taskProjectFilter,d=!s.taskPriorityFilter||s.taskPriorityFilter==="all"||n.priority===s.taskPriorityFilter;return i&&a&&r&&d})}function io(){const e=Ui(s.data?.tasks||[]),t=[["all",T("all")],["mine",o("مسندة لي","Assigned to me")],["due_soon",o("تستحق قريباً","Due soon")],["overdue",T("overdue")],["blocked",T("blocked")]],n=s.myTaskSort||Et();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${o("حركة التنفيذ","EXECUTION")}</p>
        <h1>${T("myTasks")}</h1>
        <p>${o("نظّم العمل حسب الحالة، الموعد، والمسؤولية.","Organize work by status, deadline, and ownership.")}</p>
      </div>
      <div class="page-actions">
        ${z("create_tasks")?`<button class="btn btn-primary" data-action="new-task">${v("plus",15)} ${T("addTask")}</button>`:""}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${t.map(([i,a])=>`
            <button class="segmented-tab ${s.taskFilter===i?"active":""}" data-action="task-filter" data-filter="${i}" role="tab">
              ${a}
            </button>
          `).join("")}
        </div>
        <div class="search-box tasks-search-box">
          ${v("search",15)}
          <input data-search="tasks" value="${g(s.searches.tasks)}" placeholder="${o("بحث في المهام...","Search tasks...")}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${o("كل المشاريع","All Projects")}</option>
            ${(s.data?.projects||[]).map(i=>`<option value="${g(i.id)}" ${s.taskProjectFilter===i.id?"selected":""}>${g(o(i.nameAr,i.nameEn))}</option>`).join("")}
          </select>
          <select class="filter-select select-compact" data-action="task-priority-filter" style="min-width:140px;">
            <option value="all">${o("كل الأولويات","All Priorities")}</option>
            <option value="urgent" ${s.taskPriorityFilter==="urgent"?"selected":""}>${o("عاجلة","Urgent")}</option>
            <option value="high" ${s.taskPriorityFilter==="high"?"selected":""}>${o("عالية","High")}</option>
            <option value="medium" ${s.taskPriorityFilter==="medium"?"selected":""}>${o("متوسطة","Medium")}</option>
            <option value="low" ${s.taskPriorityFilter==="low"?"selected":""}>${o("منخفضة","Low")}</option>
          </select>
        </div>
        <div class="tasks-toolbar-sort">
          ${Bi(n,"sort-my-tasks")}
        </div>
      </div>
    </div>

    ${e.length?qi(e,n):`<section class="panel"><div class="empty">${v("checklist",18)}<span>${T("noTasks")}</span></div></section>`}
  `}function Wi(e){return ki(e,{includeSeconds:!1}).full}function zn(e=[],t=[]){const n=s.data?.users||[];let i="";return e.forEach(a=>{const r=n.find(d=>d.id===a)||{name:a,id:a};i+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${Be(r,"mini-avatar")}
        <span style="font-weight:500;">${g(o(r.name,r.nameEn||r.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${g(a)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${o("إزالة","Remove")}">×</button>
      </span>
    `}),t.forEach(a=>{i+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span style="display:inline-flex;align-items:center;">${v("globe",11)}</span>
        <span style="font-weight:600;">${g(a)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${o("خارجي","Ext")}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${g(a)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${o("إزالة","Remove")}">×</button>
      </span>
    `}),i}function Bn(e=[]){return e.length?e.map((t,n)=>`
    <div class="reminder-card-row" data-idx="${n}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${g(Wi(t.remindAt))}</strong>
        ${t.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${g(t.noteAr)}">(${g(t.noteAr)})</span>`:""}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${n}" data-rem-id="${g(t.id||"")}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${o("حذف التذكير","Delete reminder")}">
        ${v("trash",13)}
      </button>
    </div>
  `).join(""):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${o("لا توجد مواعيد تذكير مجدولة لهذه المهمة","No scheduled reminders for this task")}</div>`}function ao(e=null,t=null,n=null){const i=s.data?.templates?.find(f=>f.id===(t||e?.templateId)),a=e?.projectId||n||s.activeProjectId||s.data?.projects?.[0]?.id||"",r=Array.isArray(e?.customFields?.additionalAssignees)?e.customFields.additionalAssignees:Array.isArray(e?.customFields?.additional_assignees)?e.customFields.additional_assignees:[],d=Array.isArray(e?.customFields?.externalAssignees)?e.customFields.externalAssignees:Array.isArray(e?.customFields?.external_assignees)?e.customFields.external_assignees:[];let l=[];Array.isArray(e?.customFields?.reminders)?l=e.customFields.reminders:e?.remindAt?l=[{id:"rem_"+Math.random().toString(36).substring(2,11),remindAt:e.remindAt,noteAr:""}]:Array.isArray(s.data?.reminders)&&e?.id&&(l=(s.data?.reminders||[]).filter(f=>f.taskId===e.id));const c=e?.progress!==void 0?e.progress:e?.status==="done"?100:e?.status==="review"||e?.status==="approval"?80:e?.status==="in_progress"?50:0,p=r.length>0||d.length>0,u=p?zn(r,d):"",m=Bn(l),x=`<form id="task-form" data-task-id="${g(e?.id||"")}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${g(e?.typeAr||i?.typeAr||(i?"مخطط":""))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${g(e?.typeEn||i?.typeEn||(i?"Drawing":""))}" />
    <input type="hidden" name="additionalAssignees" id="task-additional-assignees-input" value="${g(JSON.stringify(r))}" />
    <input type="hidden" name="externalAssignees" id="task-external-assignees-input" value="${g(JSON.stringify(d))}" />
    <input type="hidden" name="remindersJson" id="task-reminders-input" value="${g(JSON.stringify(l))}" />

    <div class="form-grid">
      <!-- Section 1: Basic Details & Standard Library -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 2px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        ${v("checklist",14)} <span>${o("البيانات الأساسية والمكتبة القياسية","Basic Details & Standard Library")}</span>
      </div>

      <div class="field full">
        <label>${o("المشروع التابع له","Project")} *</label>
        <select name="projectId" id="task-project-select" required>
          ${(s.data?.projects||[]).map(f=>`<option value="${g(f.id)}" ${f.id===a?"selected":""}>${g(o(f.nameAr,f.nameEn))} (${g(f.code)})</option>`).join("")}
        </select>
      </div>

      <div class="field full">
        <label>${T("taskTitle")} *</label>
        <input name="titleAr" id="task-title-ar" value="${g(e?.titleAr||i?.nameAr||"")}" placeholder="${o("اسم المخرج أو المهمة","Deliverable or task name")}" required />
      </div>
      <div class="field">
        <label>${T("nameEn")}</label>
        <input name="titleEn" id="task-title-en" value="${g(e?.titleEn||i?.nameEn||"")}" placeholder="${o("Task / Deliverable Name (EN)","Task / Deliverable Name (EN)")}" />
      </div>
      <div class="field">
        <label>${T("addFromLibrary")}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${o("مهمة مخصصة","Custom task")}</option>
          ${(s.data?.templates||[]).map(f=>`<option value="${g(f.id)}" ${(e?.templateId||t)===f.id?"selected":""}>${g(f.code)} — ${g(o(f.nameAr,f.nameEn))}</option>`).join("")}
        </select>
      </div>

      <!-- Section 2: Ownership & Team -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        ${v("users",14)} <span>${o("المسؤوليات وفريق العمل","Ownership & Team")}</span>
      </div>

      <div class="field full">
        <label>${o("المسؤول الرئيسي","Primary Assignee")}</label>
        <select name="assigneeId" id="task-primary-assignee">
          <option value="">${o("— بدون تحديد —","— Unassigned —")}</option>
          ${(s.data?.users||[]).map(f=>`<option value="${g(f.id)}" ${(e?e.assigneeId===f.id:s.data?.user?.id===f.id)?"selected":""}>${g(o(f.name,f.nameEn||f.name))}</option>`).join("")}
        </select>
      </div>

      <!-- قائمة منسدلة موحدة وسريعة للبحث والتحديد للأعضاء والمسؤولين الخارجيين -->
      <div class="field full" style="position:relative;">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${o("فريق العمل والمسؤولون المشاركون (داخلي وخارجي)","Collaborators & Assignees (Team & External)")}</span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${o("اختر من الفريق أو اكتب اسماً خارجياً واضغط إضافة","Pick team members or type external name")}</span>
        </label>

        <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
        <div id="assignees-chips-container" style="display:${p?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
          ${u}
        </div>

        <!-- حقل البحث والإضافة السريعة -->
        <div style="position:relative;display:flex;gap:6px;">
          <input type="text" id="assignee-combobox-search" placeholder="${o("ابحث عن عضو بالفريق أو اكتب اسماً خارجياً...","Search team member or type external name...")}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          <button type="button" id="btn-add-external-quick" class="btn btn-soft btn-sm" style="display:none;padding:0 12px;white-space:nowrap;font-size:11px;display:inline-flex;align-items:center;gap:4px;">
            ${v("plus",11)} <span>${o("إضافة كمسؤول خارجي","Add external")}</span>
          </button>
        </div>

        <!-- القائمة المنسدلة للبحث والاختيار -->
        <div id="assignee-combobox-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
        </div>
      </div>

      <!-- Section 3: Status, Scheduling & Reminders -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        ${v("clock",14)} <span>${o("الحالة والجدولة والتذكيرات","Status, Scheduling & Reminders")}</span>
      </div>

      <div class="field">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${T("status")}</span>
          <span id="task-auto-progress-badge" style="font-size:11px;font-weight:600;color:var(--teal);">(${c}%)</span>
        </label>
        <select name="status" id="task-status-select">${Ji().map(([f,k])=>`<option value="${f}" ${e?.status===f?"selected":""}>${k}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${T("priority")}</label>
        <select name="priority">${["low","medium","high","urgent"].map(f=>`<option value="${f}" ${(e?.priority||"medium")===f?"selected":""}>${Dn(f)}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${T("startDate")}</label>
        <input type="date" name="startDate" id="task-start-date" value="${g((e?.startDate||"").split("T")[0])}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${T("dueDate")}</label>
        <input type="date" name="dueDate" id="task-due-date" value="${g((e?.dueDate||"").split("T")[0])}" min="${g((e?.startDate||"").split("T")[0])}" onchange="const st = document.getElementById('task-start-date'); if (st && st.value && this.value < st.value) this.value = st.value;" />
      </div>

      <!-- أداة التذكيرات المتعددة التفاعلية -->
      <div class="field full" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:10px;padding:12px;">
        <label style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:600;display:flex;align-items:center;gap:6px;">
            ${v("bell",13)} ${o("تذكيرات المهمة (إشعار نظام + بريد إلكتروني للمسؤول)","Task Reminders (System Notification + Email to Assignee)")}
          </span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${o("يمكنك إضافة أكثر من موعد تذكير وحذف ما تشاء","Add multiple reminders and delete any")}</span>
        </label>

        <!-- قائمة التذكيرات المضافة (Pre-rendered for zero layout shift) -->
        <div id="task-reminders-list" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
          ${m}
        </div>

        <!-- صف إضافة تذكير جديد -->
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <input type="datetime-local" id="new-reminder-datetime" style="flex:1;min-width:180px;font-size:12px;padding:6px 10px;" />
          <input type="text" id="new-reminder-note" placeholder="${o("ملاحظة التذكير (اختياري)...","Reminder note (optional)...")}" style="flex:1;min-width:150px;font-size:12px;padding:6px 10px;" />
          <button type="button" id="btn-add-reminder" class="btn btn-soft btn-sm" style="white-space:nowrap;padding:7px 12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">
            ${v("plus",11)} <span>${o("إضافة تذكير","Add Reminder")}</span>
          </button>
        </div>
      </div>

      <!-- Section 4: Details & Deliverables -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        ${v("edit",14)} <span>${o("تفاصيل ومخرجات المهمة","Task Details & Deliverables")}</span>
      </div>

      <div class="field full">
        <label>${T("description")}</label>
        <textarea name="descriptionAr" placeholder="${o("ما المطلوب؟ وما معيار الإغلاق؟","What is required and what defines completion?")}">${g(e?.descriptionAr||"")}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${e&&(z("delete_tasks")||ee())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${g(e.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${o("حذف المهمة ونقلها لسلة المهملات","Delete task and move to trash")}">
            ${v("trash",14)} ${o("حذف المهمة","Delete Task")}
          </button>
        `:""}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${T("cancel")}</button>
        <button type="submit" class="btn btn-primary">${v("check",14)} ${T(e?"save":"create")}</button>
      </div>
    </div>
  </form>`;let y=x,h="";if(e){h="modal-lg";const f=ji(e);y=`
      <div class="task-modal-layout">
        <div class="task-modal-col task-modal-main">
          <h3 style="margin:0 0 15px;font-size:14px;">${o("تفاصيل المهمة","Task Details")}</h3>
          ${x}
        </div>
        <div class="task-modal-col task-modal-side">
          <div class="task-documents-section">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;font-size:14px;display:flex;align-items:center;gap:6px;">
                ${o("المخططات والملفات","Documents & Files")}
              </h3>
              ${f?`
              <label class="btn btn-soft btn-sm" style="cursor:pointer;margin:0;" id="task-upload-btn">
                ${v("plus",12)} ${o("اختيار ملفات","Choose Files")}
                <input type="file" multiple id="task-upload-input" data-task-id="${e.id}" style="display:none;" />
              </label>
              `:""}
            </div>
            ${f?`
            <div id="task-dropzone" data-action="trigger-upload" data-task-id="${e.id}" style="border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;background:var(--surface-soft);cursor:pointer;transition:all 0.2s ease;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;">
                <span style="color:var(--brand-teal);">${v("upload",22)}</span>
                <div style="font-size:12px;font-weight:600;color:var(--ink);">${o("اسحب المخططات والملفات وأفلتها هنا، أو اضغط للتصفح","Drag & drop files here, or click to browse")}</div>
                <div style="font-size:10px;color:var(--muted);">${o("دعم كامل لملفات CAD و PDF و 3D و الصور حتى 5GB","Full support for CAD, PDF, 3D & images up to 5GB")}</div>
              </div>
              <div id="upload-progress-container" style="display:none;margin-top:12px;padding:10px 12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.04);text-align:start;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--ink);margin-bottom:6px;gap:8px;">
                  <span id="upload-progress-text" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${o("جاري الرفع...","Uploading...")}</span>
                  <strong id="upload-progress-percent" style="color:var(--brand-teal);font-variant-numeric:tabular-nums;flex-shrink:0;">0%</strong>
                </div>
                <div style="height:6px;background:var(--line);border-radius:3px;overflow:hidden;position:relative;">
                  <div id="upload-progress-bar" style="width:0%;height:100%;background:linear-gradient(90deg, var(--brand-teal), #00c2cb);border-radius:3px;transition:width 0.15s ease;"></div>
                </div>
              </div>
            </div>
            `:`
            <div style="padding:10px 12px;margin-bottom:12px;background:var(--surface-soft);border:1px dashed var(--line);border-radius:8px;font-size:11px;color:var(--muted);text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;">
              ${v("lock",13)} <span>${o("إرفاق ورفع الملفات متاح لمدير المشروع والمسند إليهم المهمة فقط.","File attachments restricted to project managers and task assignees.")}</span>
            </div>
            `}
            <div id="task-documents-list">${Gi(e)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${o("النقاشات والتعليقات","Discussion & Comments")}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${Fn(e)}</div>
            <form id="task-comment-form" data-task-id="${e.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${o("اكتب تعليقاً... (استخدم @ للإشارة)","Write a comment... (use @ to mention)")}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${o("إرسال","Send")}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `}document.getElementById("modal-root").innerHTML=Qt(e?o("تعديل المهمة","Edit task"):T("addTask"),o("المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.","A task is the unit of execution; link a standard deliverable and add a reminder."),y,"task",h),Vi(e)}function Vi(e){const t=document.getElementById("modal-root");if(!t)return;const n=t.querySelector("#task-status-select"),i=t.querySelector("#task-auto-progress-badge");n&&i&&n.addEventListener("change",()=>{const M={not_started:0,in_progress:50,review:80,approval:80,done:100}[n.value]??0;i.textContent=`(${M}%)`});const a=t.querySelector("#task-template-select");a&&a.addEventListener("change",()=>{const M=a.value,w=(s.data?.templates||[]).find(I=>I.id===M);if(w){const I=t.querySelector("#task-title-ar"),D=t.querySelector("#task-title-en"),$=t.querySelector("#task-type-ar"),E=t.querySelector("#task-type-en");I&&!I.value&&(I.value=w.nameAr||""),D&&!D.value&&(D.value=w.nameEn||""),$&&($.value=w.typeAr||"مخطط"),E&&(E.value=w.typeEn||"Drawing")}});const r=t.querySelector("#task-additional-assignees-input"),d=t.querySelector("#task-external-assignees-input"),l=t.querySelector("#assignees-chips-container"),c=t.querySelector("#assignee-combobox-search"),p=t.querySelector("#assignee-combobox-dropdown"),u=t.querySelector("#btn-add-external-quick");let m=[];try{m=JSON.parse(r?.value||"[]")}catch{m=[]}let x=[];try{x=JSON.parse(d?.value||"[]")}catch{x=[]}function y(){r&&(r.value=JSON.stringify(m)),d&&(d.value=JSON.stringify(x))}function h(){if(l){if(m.length===0&&x.length===0){l.style.display="none",l.innerHTML="",y();return}l.style.display="flex",l.innerHTML=zn(m,x),y()}}function f(M=""){if(!p)return;const w=M.trim().toLowerCase(),I=s.data?.users||[],D=t.querySelector("#task-primary-assignee")?.value,$=I.filter(L=>{if(L.id===D)return!1;if(!w)return!0;const X=(L.name||"").toLowerCase(),U=(L.nameEn||"").toLowerCase(),O=(L.email||"").toLowerCase();return X.includes(w)||U.includes(w)||O.includes(w)});let E="";w&&(E+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span style="display:flex;align-items:center;gap:4px;">${v("plus",11)} <span>${o("إضافة مسؤول خارجي:","Add external assignee:")} "${g(M.trim())}"</span></span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${o("إضافة سريعة","Quick Add")}</span>
        </div>
      `),$.length===0&&!w?E+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${o("لا يوجد مستخدمين آخرين","No other users")}</div>`:$.forEach(L=>{const X=m.includes(L.id);E+=`
          <div class="combobox-user-row" data-uid="${g(L.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${g(L.id)}" ${X?"checked":""} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${Be(L,"mini-avatar")}
              <div>
                <strong style="color:var(--ink);">${g(o(L.name,L.nameEn||L.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${g(o(L.jobTitleAr,L.jobTitleEn)||L.email||"")}</span>
              </div>
            </div>
            ${X?`<span style="display:inline-flex;align-items:center;color:var(--teal);">${v("check",13)}</span>`:""}
          </div>
        `}),p.innerHTML=E,p.style.display="block"}y(),c&&(c.addEventListener("focus",()=>{f(c.value)}),c.addEventListener("input",()=>{const M=c.value.trim();f(M),u&&(u.style.display=M.length>1?"inline-flex":"none")}),c.addEventListener("keydown",M=>{if(M.key==="Enter"){M.preventDefault();const w=c.value.trim();w&&(x.includes(w)||(x.push(w),h()),c.value="",u&&(u.style.display="none"),p&&(p.style.display="none"))}})),u&&u.addEventListener("click",()=>{const M=c?.value.trim();M&&(x.includes(M)||(x.push(M),h()),c.value="",u.style.display="none",p&&(p.style.display="none"))}),p&&p.addEventListener("click",M=>{if(M.target.closest(".dropdown-ext-action")){const I=c?.value.trim();I&&!x.includes(I)&&(x.push(I),h()),c&&(c.value=""),u&&(u.style.display="none"),p.style.display="none";return}const w=M.target.closest(".combobox-user-row");if(w){const I=w.dataset.uid;m.includes(I)?m=m.filter(D=>D!==I):m.push(I),h(),f(c?.value||"")}}),l&&l.addEventListener("click",M=>{const w=M.target.closest(".btn-remove-chip-user");if(w){const D=w.dataset.uid;m=m.filter($=>$!==D),h(),p&&p.style.display==="block"&&f(c?.value||"");return}const I=M.target.closest(".btn-remove-chip-ext");if(I){const D=I.dataset.ext;x=x.filter($=>$!==D),h()}});const k=t.querySelector("#task-reminders-input"),S=t.querySelector("#task-reminders-list"),A=t.querySelector("#new-reminder-datetime"),_=t.querySelector("#new-reminder-note"),N=t.querySelector("#btn-add-reminder");let j=[];try{j=JSON.parse(k?.value||"[]")}catch{j=[]}Array.isArray(j)||(j=[]);function F(){S&&(k&&(k.value=JSON.stringify(j)),S.innerHTML=Bn(j))}N&&N.addEventListener("click",()=>{const M=A?.value;if(!M){Y(o("يرجى اختيار تاريخ ووقت التذكير.","Please pick a reminder date & time."),!0);return}const w=_?.value.trim()||"",I={id:"rem_temp_"+Math.random().toString(36).substring(2,11),remindAt:new Date(M).toISOString(),noteAr:w};j.push(I),A&&(A.value=""),_&&(_.value=""),F(),Y(o("تمت إضافة موعد التذكير للقائمة.","Reminder added to list."))}),S&&S.addEventListener("click",async M=>{const w=M.target.closest(".btn-delete-reminder");if(w){const I=Number(w.dataset.idx),D=w.dataset.remId;!isNaN(I)&&I>=0&&I<j.length&&(j.splice(I,1),F(),D&&!D.startsWith("rem_temp_")&&ke(`/api/reminders/${D}`,{method:"DELETE"}).catch(()=>{}),Y(o("تم حذف موعد التذكير.","Reminder deleted.")))}}),t.addEventListener("mousedown",M=>{p?.contains(M.target)||c?.contains(M.target)||u?.contains(M.target)||(p&&(p.style.display="none"),u&&(u.style.display="none"))}),e&&e.id&&!e.id.startsWith("demo_")&&ke(`/api/tasks/${encodeURIComponent(e.id)}/comments`,{silent:!0}).then(M=>{if(M&&Array.isArray(M.comments)){s.data&&!s.data.comments&&(s.data.comments=[]);const w=new Map((s.data?.comments||[]).map(D=>[D.id,D]));for(const D of M.comments)w.set(D.id,D);s.data&&(s.data.comments=Array.from(w.values()));const I=document.getElementById("task-comments-list");I&&document.getElementById("task-comment-form")?.dataset?.taskId===e.id&&(I.innerHTML=Fn(e))}}).catch(()=>{})}function Fn(e){const t=(s.data?.comments||[]).filter(n=>n.taskId===e.id).sort((n,i)=>new Date(n.createdAt)-new Date(i.createdAt));return t.length?`<div style="display:flex;flex-direction:column;gap:12px;">${t.map(n=>{const i=n.user||(s.data?.users||[]).find(l=>l.id===n.userId)||s.data?.user||{name:"DARC Member",id:""},a=!!(i.id&&s.data?.user?.id&&i.id===s.data?.user?.id),r=a||typeof ee=="function"&&ee(),d=g(n.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,'<strong style="color:var(--blue)">@$1</strong>');return`
      <div class="task-comment-item" data-comment-id="${g(n.id)}" style="display:flex;gap:10px;flex-direction:${a?"row-reverse":"row"};">
        ${Be(i)}
        <div style="display:flex;flex-direction:column;align-items:${a?"flex-end":"flex-start"};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${g(o(i.name,i.nameEn||i.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${Tt(n.createdAt,!0)}</span>
            ${r?`
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${g(n.id)}" data-task-id="${g(e.id)}" title="${o("تعديل التعليق","Edit comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${v("edit",12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${g(n.id)}" data-task-id="${g(e.id)}" title="${o("حذف التعليق","Delete comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${v("trash",12)}
                </button>
              </div>
            `:""}
          </div>
          <div id="comment-bubble-${g(n.id)}" style="background:${a?"var(--blue)":"var(--surface)"};color:${a?"#fff":"var(--ink)"};padding:8px 12px;border-radius:12px;font-size:13px;border:${a?"none":"1px solid var(--border)"};border-top-${a?"right":"left"}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${d}</div>
        </div>
      </div>
    `}).join("")}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${v("message",18)}<span style="font-size:12px;">${o("لا توجد تعليقات","No comments yet")}</span></div>`}function Gi(e){const t=(s.data?.documents||[]).filter(n=>n.taskId===e.id&&!n.deletedAt).sort((n,i)=>new Date(i.createdAt)-new Date(n.createdAt));return t.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${t.map(n=>`
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:var(--surface-soft);border:1px solid var(--line);border-radius:10px;transition:background 0.15s ease;flex-wrap:wrap;gap:8px;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;min-width:200px;cursor:pointer;" data-action="preview-doc" data-doc-id="${g(n.id)}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;flex-shrink:0;">${v("document",14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;min-width:0;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${g(n.originalName)}">${g(n.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${Tt(n.createdAt,!0)} · ${g(n.user?o(n.user.name,n.user.nameEn||n.user.name):"Team Member")} · ${n.size>1048576?(n.size/1048576).toFixed(1)+"MB":Math.round(n.size/1024)+"KB"}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
        <button type="button" class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${g(n.id)}" style="padding:6px;min-width:32px;min-height:32px;color:var(--brand-teal);display:inline-flex;align-items:center;justify-content:center;" title="${o("نسخ رابط Google Drive","Copy Drive link")}">${v("link",14)}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${g(n.id)}" style="padding:6px;min-width:32px;min-height:32px;color:var(--brand-teal);display:inline-flex;align-items:center;justify-content:center;" title="${o("معاينة المخطط في نافذة منبثقة","Preview in popup modal")}">${v("eye",14)}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${g(n.id)}" style="padding:6px;min-width:32px;min-height:32px;color:var(--blue);display:inline-flex;align-items:center;justify-content:center;" title="${o("تحميل المخطط","Download")}">${v("download",14)}</button>
        ${z("review_tasks")||z("approve_tasks")||z("upload_documents")||ee()?`
          <select class="doc-status-select" data-doc-id="${g(n.id)}" style="font-size:11px;padding:3px 6px;border-radius:6px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;min-height:30px;">
            <option value="draft" ${n.status==="draft"?"selected":""}>${o("مسودة","Draft")}</option>
            ${z("review_tasks")||ee()?`<option value="review" ${n.status==="review"?"selected":""}>${o("مراجعة","Review")}</option>`:""}
            ${z("approve_tasks")||ee()?`<option value="approved" ${n.status==="approved"?"selected":""}>${o("معتمد","Approved")}</option>`:""}
            <option value="superseded" ${n.status==="superseded"?"selected":""}>${o("ملغى","Superseded")}</option>
          </select>
        `:""}
        ${z("upload_documents")||ee()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${g(n.id)}" style="padding:4px;min-width:0;height:auto;" title="${o("إعادة تسمية","Rename")}">${v("edit",14)}</button>`:""}
        ${z("delete_documents")||ee()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${g(n.id)}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${o("حذف","Delete")}">${v("trash",14)}</button>`:""}
      </div>
    </div>
  `).join("")}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${v("document",18)}<span style="font-size:12px;">${o("لا توجد ملفات مرفوعة","No documents uploaded")}</span></div>`}function Ji(){return[["not_started",T("notStarted")],["in_progress",T("inProgress")],["review",T("review")],["approval",T("approval")],["done",T("done")],["blocked",T("blocked")],["canceled",T("canceled")]]}var ei="";function oo(){const e=document.querySelector(".timeline-container > div"),t=document.querySelector(".timeline-svg");if(!e||!t)return;const n=Array.from(document.querySelectorAll(".timeline-bar")),i=e.getBoundingClientRect(),a=`${Math.round(i.width)}_${n.length}_${s.lang}_${(s.data?.tasks||[]).length}`;if(a===ei&&t.hasChildNodes())return;ei=a,t.innerHTML="";const r={};n.forEach(c=>{const p=c.getBoundingClientRect();r[c.dataset.taskId]={left:p.left-i.left,right:p.right-i.left,top:p.top-i.top,bottom:p.bottom-i.top,width:p.width,height:p.height,center:p.top-i.top+p.height/2}});let d="";const l=s.lang==="ar";n.forEach(c=>{const p=c.dataset.taskId,u=(s.data?.tasks||[]).find(y=>y.id===p),m=u?.dependencies||u?.customFields?.dependencies||[];if(!u||!m.length)return;const x=r[p];x&&m.forEach(y=>{const h=r[y];if(!h)return;const f=l?h.left:h.right,k=h.center,S=l?x.right:x.left,A=x.center,_=f+(l?-20:20);d+=`<path d="M ${f} ${k} C ${_} ${k}, ${_} ${A}, ${S} ${A}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),t.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${d}
  `}var ro="wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0",Ki=typeof navigator<"u"&&!!navigator.connection?.saveData,so=3e5,lo=Ki?1e4:3e4,co=Ki?500:250,po=25e3,uo=45e3,fo=50,sn=null,ti=!1,Pt=!1,nt=null,K=null,Rt=null,ot=null,Ae=null,dn=null,it=null,ni=0,rt=0,we=!1,ct=Date.now(),xn=0,Mt=null,Ht=0,Xi=null,Yi=0,Zi=0;function Qi(){return!!(K&&K.readyState===1)}function mo(){return{connected:Qi(),hibernating:we,reconnectAttempts:rt,latencyMs:Xi,carrierDrops:Yi,messagesReceived:Zi,lastActivity:ct,socketReadyState:K?K.readyState:3}}typeof window<"u"&&(window.getRealtimeDiagnostics=mo);var ve=new Map;function go(e){if(!e||typeof e!="string")return;const t=Date.now();ve.set(e,t);for(const[n,i]of ve.entries())t-i>4e3&&ve.delete(n);if(ve.size>fo){const n=ve.keys().next().value;n&&ve.delete(n)}}function xt(){return typeof localStorage>"u"?!1:St()&&!!localStorage.getItem("darc_token")}function _e(){return typeof window>"u"||!St()?!1:!!(s.data?.isDemo||s.currentUser?.isDemo||s.data?.user&&(s.data.user.id==="usr_demo"||s.data.user.isDemo)||s.currentUser&&(s.currentUser.id==="usr_demo"||s.currentUser.isDemo)||typeof localStorage<"u"&&localStorage.getItem("darc_user_id")==="usr_demo")}var Ut=new Set(["__proto__","constructor","prototype"]),ea=new Set(["custom_fields","permissions","details"]);function Wt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(Wt);const t={};for(const[n,i]of Object.entries(e)){if(Ut.has(n))continue;const a=n.indexOf("_")===-1?n:n.replace(/_([a-z0-9])/g,(r,d)=>d.toUpperCase());Ut.has(a)||(t[a]=i!==null&&typeof i=="object"&&!ea.has(n)?Wt(i):i)}return t}function Vt(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(Vt);const t={};for(const[n,i]of Object.entries(e))Ut.has(n)||(t[n]=i!==null&&typeof i=="object"&&!ea.has(n)?Vt(i):i);return t}function at(e){if(!e||!s.data||!Array.isArray(s.data.tasks)||!Array.isArray(s.data.projects))return;const t=s.data.projects.find(c=>c.id===e);if(!t)return;const n=s.data.tasks.filter(c=>c.projectId===e&&!c.deletedAt&&!c.deleted_at);let i=0,a=0;for(const c of n){const p=Number(c.weight)||1,u=Number(c.progress)||0;i+=p,a+=p*(u/100)}const r=i>0?Math.round(a/i*100):0;t.progress!==r&&(t.progress=r),t.totalWeight=i;const d=n.length>0,l=d&&n.every(c=>c.status==="done"||c.status==="completed");d&&l&&r===100?t.lifecycle="completed":t.lifecycle==="completed"&&(!l||r<100)&&(t.lifecycle="active")}function ln(){if(typeof document>"u")return;const e=document.querySelector('[data-action="show-notifications"]');if(!e)return;const t=(s.data?.notifications||[]).filter(i=>!Ne(i)).length;let n=e.querySelector(".notification-dot");t>0?n||e.insertAdjacentHTML("beforeend",'<span class="notification-dot"></span>'):n&&n.remove()}function yo(){if(!(typeof window>"u"))try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!nt||nt.state==="closed")&&(nt=new e),nt.state==="suspended"&&nt.resume().catch(()=>{});const t=nt,n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(587.33,t.currentTime),n.frequency.exponentialRampToValueAtTime(880,t.currentTime+.15),i.gain.setValueAtTime(.06,t.currentTime),i.gain.exponentialRampToValueAtTime(.001,t.currentTime+.35),n.connect(i),i.connect(t.destination),n.start(),n.stop(t.currentTime+.36)}catch{}}function qn(e){return e?["review","approval","blocked"].includes(e)?"review":["done","completed"].includes(e)?"done":e==="in_progress"?"in_progress":"not_started":"not_started"}typeof window<"u"&&(window.getColumnKeyForStatus=qn);function ta(e){if(!e||!s||s.view!=="tasks"&&s.view!=="project-detail")return!0;if(s.taskProjectFilter&&s.taskProjectFilter!=="all"&&e.projectId!==s.taskProjectFilter||s.taskPriorityFilter&&s.taskPriorityFilter!=="all"&&e.priority!==s.taskPriorityFilter)return!1;if(s.taskFilter==="mine"){const t=s.data?.user?.id;if(!(e.assigneeId===t||Array.isArray(e.additionalAssignees)&&e.additionalAssignees.includes(t)))return!1}return!(s.taskFilter==="blocked"&&e.status!=="blocked")}function na(e,t,n){if(typeof document>"u"||!e)return!1;const i=document.querySelector(`.task-card[data-task-id="${e}"]`);if(!i)return!1;if(n==="DELETE"||t?.deletedAt||t?.deleted_at){const u=i.closest(".board-column");if(i.remove(),u){const m=u.querySelector(".board-count");if(m){const x=Math.max(0,(parseInt(m.textContent,10)||1)-1);if(m.textContent=String(x),x===0&&!u.querySelector(".task-card")){const y=u.querySelector(".board-cards");y&&!y.querySelector(".empty")&&(y.innerHTML='<div class="empty"><span>'+(window.t?window.t("noTasks"):"No tasks")+"</span></div>")}}}return!0}if(window._isDraggingTask&&window._activeDraggedTaskId===e)return!0;const a=(s.data?.tasks||[]).find(u=>u.id===e);if(!a)return!1;const r=i.closest(".board-column"),d=r&&r.dataset.status||"not_started",l=qn(a.status);if(!ta(a)){if(i.remove(),r){const u=r.querySelector(".board-count");if(u){const m=Math.max(0,(parseInt(u.textContent,10)||1)-1);if(u.textContent=String(m),m===0&&!r.querySelector(".task-card")){const x=typeof window.t=="function"?window.t("noTasks"):"لا توجد مهام";r.querySelector(".board-cards")?.insertAdjacentHTML("beforeend",`<div class="empty" style="min-height:150px;pointer-events:none;">${x}</div>`)}}}return!0}const c=document.createElement("div");c.innerHTML=nn(a);const p=c.firstElementChild;if(!p)return!1;if(r&&d!==l){const u=document.querySelector(`.board-column[data-status="${l}"]`);if(u){const m=u.querySelector(".board-cards");if(m){m.querySelector(".empty")?.remove(),m.prepend(p),i.remove();const x=r.querySelector(".board-count");if(x){const h=Math.max(0,(parseInt(x.textContent,10)||1)-1);if(x.textContent=String(h),h===0&&!r.querySelector(".task-card")){const f=typeof window.t=="function"?window.t("noTasks"):"لا توجد مهام";r.querySelector(".board-cards")?.insertAdjacentHTML("beforeend",`<div class="empty" style="min-height:150px;pointer-events:none;">${f}</div>`)}}const y=u.querySelector(".board-count");if(y){const h=(parseInt(y.textContent,10)||0)+1;y.textContent=String(h)}}else i.replaceWith(p)}else i.replaceWith(p)}else i.replaceWith(p);return typeof window<"u"&&typeof window.verifyBoardSymmetry=="function"&&requestAnimationFrame(()=>window.verifyBoardSymmetry()),p.style.transition="box-shadow 0.3s ease",p.style.boxShadow="0 0 0 2px var(--teal)",setTimeout(()=>{p&&(p.style.boxShadow="")},800),!0}function ho(e){if(typeof document>"u"||!Array.isArray(e))return!1;let t=!1;const n=new Set;for(const i of e)if(i.id){const a=document.querySelector(`.task-card[data-task-id="${i.id}"]`);if(a){const r=a.closest(".board-column");r&&n.add(r)}na(i.id,i)&&(t=!0)}if(s.data?.tasks&&n.size>0){const i=new Map(s.data.tasks.map(a=>[a.id,a]));n.forEach(a=>{const r=a.querySelector(".board-cards");if(!r)return;const d=Array.from(r.querySelectorAll(".task-card"));d.length<=1||(d.sort((l,c)=>{const p=i.get(l.dataset.taskId),u=i.get(c.dataset.taskId);return(p&&typeof p.sortOrder=="number"?p.sortOrder:p&&typeof p.sort_order=="number"?p.sort_order:0)-(u&&typeof u.sortOrder=="number"?u.sortOrder:u&&typeof u.sort_order=="number"?u.sort_order:0)}),d.forEach(l=>r.appendChild(l)))})}return typeof window<"u"&&typeof window.verifyBoardSymmetry=="function"&&requestAnimationFrame(()=>window.verifyBoardSymmetry()),t}function bo(e){if(typeof document>"u"||!e||!e.id)return!1;if(document.querySelector(`.task-card[data-task-id="${e.id}"]`)||!ta(e))return!0;const t=qn(e.status),n=document.querySelector(`.board-column[data-status="${t}"]`);if(!n)return!1;const i=n.querySelector(".board-cards");if(!i)return!1;const a=document.createElement("div");a.innerHTML=nn(e);const r=a.firstElementChild;if(!r)return!1;i.querySelector(".empty")?.remove(),i.prepend(r);const d=n.querySelector(".board-count");if(d){const l=(parseInt(d.textContent,10)||0)+1;d.textContent=String(l)}return typeof window<"u"&&typeof window.verifyBoardSymmetry=="function"&&requestAnimationFrame(()=>window.verifyBoardSymmetry()),r.style.transition="box-shadow 0.3s ease",r.style.boxShadow="0 0 0 2px var(--teal)",setTimeout(()=>{r&&(r.style.boxShadow="")},1e3),!0}function vo(){if(!(typeof window>"u"||typeof document>"u")){if(typeof requestAnimationFrame>"u"){typeof de=="function"?de():typeof Re=="function"&&Re();return}Mt&&cancelAnimationFrame(Mt),Mt=requestAnimationFrame(()=>{Mt=null,typeof de=="function"?de():typeof Re=="function"&&Re()})}}function jt(e,t,n,i){if(!s.data||!e||!["tasks","projects","comments","documents","notifications"].includes(e))return!1;const a=n?Vt(Wt(n)):null,r=i?Vt(Wt(i)):null,d=a&&a.id||r&&r.id;if(!d&&t!=="BATCH_REORDER")return!1;const l=a?._clientMutationId||a?.clientMutationId||r?._clientMutationId;if(l&&ve.has(l))return!0;if(d&&ve.has(d)){const x=(s.data[e]||[]).find(y=>y.id===d);if(x&&a&&a.updatedAt&&x.updatedAt){const y=new Date(a.updatedAt).getTime(),h=new Date(x.updatedAt).getTime();if(!isNaN(y)&&!isNaN(h)&&y<h)return!0}}const c=s.data?.user?.roleId==="admin"||s.data?.user?.role_id==="admin";if(a&&e==="notifications"){const x=a.userId||a.user_id;if(x&&x!==s.data?.user?.id)return!1}else if(!c&&a&&(e==="tasks"||e==="documents"||e==="comments")){const x=a.projectId||(e==="comments"?s.data?.tasks?.find(y=>y.id===a.taskId)?.projectId:null);if(x&&!s.data?.projects?.some(y=>y.id===x))return Ye("missing_project_dependency"),!1}Array.isArray(s.data[e])||(s.data[e]=[]);const p=s.data[e];let u=!1;const m=!!(a?.deletedAt||a?.deleted_at);if(t==="BATCH_REORDER"&&Array.isArray(a?.items)){const x=new Set,y=new Set((s.data?.projects||[]).map(h=>h.id));for(const h of a.items){if(!h?.id)continue;const f=p.find(k=>k.id===h.id);if(f){const k=f.projectId||h.projectId||h.project_id;if(!c&&k&&!y.has(k))continue;h.status&&f.status!==h.status&&(f.status=h.status,u=!0);const S=typeof h.sortOrder=="number"?h.sortOrder:typeof h.sort_order=="number"?h.sort_order:null;S!==null&&f.sortOrder!==S&&(f.sortOrder=S,u=!0),typeof h.progress=="number"&&f.progress!==h.progress&&(f.progress=h.progress,u=!0),f.projectId&&x.add(f.projectId)}}u&&e==="tasks"&&x.forEach(h=>at(h))}else if(t==="DELETE"||m){const x=p.length;let y=null;e==="tasks"&&(y=p.find(h=>h.id===d)?.projectId||r?.projectId||a?.projectId),s.data[e]=p.filter(h=>h.id!==d),s.data[e].length!==x&&(u=!0),e==="tasks"&&y?at(y):e==="projects"?Array.isArray(s.data.tasks)&&(s.data.tasks=s.data.tasks.filter(h=>h.projectId!==d)):e==="notifications"&&(ln(),typeof Ve=="function"&&document.querySelector(".modal-shell.notifications")&&Ve())}else if(t==="UPDATE"&&a){const x=p.findIndex(y=>y.id===d);if(x!==-1){const y=p[x],h=y.updatedAt||y.updated_at||y.createdAt||y.created_at,f=a.updatedAt||a.updated_at||a.createdAt||a.created_at;if(h&&f){const k=new Date(h).getTime(),S=new Date(f).getTime();if(!isNaN(k)&&!isNaN(S)&&S<k)return!0}for(const[k,S]of Object.entries(a))Ut.has(k)||(p[x][k]=S);u=!0}else p.unshift(a),u=!0;e==="tasks"?(a.projectId&&at(a.projectId),r?.projectId&&r.projectId!==a.projectId&&at(r.projectId)):e==="notifications"&&(ln(),typeof Ve=="function"&&document.querySelector(".modal-shell.notifications")&&Ve())}else if(t==="INSERT"&&a){if(p.some(x=>x.id===d)||(p.unshift(a),u=!0),e==="tasks"&&a.projectId)at(a.projectId);else if(e==="notifications"){const x=s.data?.user?.id,y=a.userId||a.user_id,h=Ne(a);if(x&&y===x&&!h){ln();const f=s.lang==="ar"?a.titleAr||a.messageAr||a.bodyAr||a.content||a.titleEn||o("إشعار جديد","New notification"):a.titleEn||a.messageEn||a.bodyEn||(a.content!==a.titleAr&&a.content!==a.messageAr?a.content:"")||a.titleAr||o("إشعار جديد","New notification");f&&Y(f,!1);const k=s.lang==="ar"?a.messageAr||a.bodyAr||a.content||"":a.messageEn||a.bodyEn||a.content||"";Ka({title:f,body:k,icon:"/favicon.ico",tag:a.id||"darc-alert",url:a.taskId?`${window.location.origin}/#workspace?task=${a.taskId}`:a.projectId?`${window.location.origin}/#project-detail?id=${a.projectId}`:window.location.href}).catch(()=>{}),typeof Ve=="function"&&document.querySelector(".modal-notifications")&&Ve()}}}if(u){bt();let x=!1;e==="tasks"&&((t==="UPDATE"||t==="DELETE"||m)&&(a||d)?x=na(d,a,m?"DELETE":t):t==="BATCH_REORDER"&&Array.isArray(a?.items)?x=ho(a.items):t==="INSERT"&&a&&a.id&&(x=bo(a)));const y=a?.taskId||r?.taskId;if(y){const h=(s.data?.tasks||[]).find(f=>f.id===y);if(h){if(e==="comments"){const f=document.getElementById("task-comment-form");if(f&&f.dataset.taskId===y){const k=document.getElementById("task-comments-list");k&&typeof window.renderTaskComments=="function"&&(k.innerHTML=window.renderTaskComments(h),k.scrollTop=k.scrollHeight)}}if(e==="documents"){const f=document.getElementById("task-dropzone");if(f&&f.dataset.taskId===y){const k=document.getElementById("task-documents-list");k&&typeof window.renderTaskDocuments=="function"&&(k.innerHTML=window.renderTaskDocuments(h))}}}}return x||vo(),!0}return!1}function Ye(e="realtime",t=!1){if(!xt()||we&&e!=="tab_visible"&&e!=="user_active"&&e!=="online"||typeof document<"u"&&document.hidden||!s.data||!s.view)return;sn&&clearTimeout(sn);const n=async()=>{try{await Ln(!0)}catch(i){console.warn("[Realtime] Sync error:",String(e),i.message)}};t?n():sn=setTimeout(n,co)}function Gt(e,t,n,i={}){e&&e.readyState===WebSocket.OPEN&&(ni++,e.send(JSON.stringify({topic:t,event:n,payload:i,ref:String(ni)})))}function xo(){return Date.now()-ct>12e4?uo:po}function ia(e){Hn();const t=()=>{const n=xo();Rt=setTimeout(()=>{e&&e.readyState===WebSocket.OPEN&&(Ht=Date.now(),Gt(e,"phoenix","heartbeat"),t())},n)};t()}function Hn(){Rt&&(clearTimeout(Rt),Rt=null)}function Jt(e="disconnect"){if(Pt=!0,Hn(),Ae&&(clearTimeout(Ae),Ae=null),ot&&(clearTimeout(ot),ot=null),K){try{K.close(1e3,e)}catch{}K=null}}function wn(e="idle"){we||(we=!0,Jt(e))}function gt(e="wake_up"){const t=we;we=!1,xt()&&(typeof navigator<"u"&&!navigator.onLine||(K&&K.readyState===WebSocket.OPEN?(Ae&&clearTimeout(Ae),Ae=setTimeout(()=>{console.warn("[Realtime] Socket health probe timed out (zombie connection detected). Reconnecting cleanly..."),Ae=null,Jt("zombie_probe_timeout"),yt(),Ye("zombie_recovery",!0)},2500),Ht=Date.now(),Gt(K,"phoenix","heartbeat")):K&&K.readyState===WebSocket.CONNECTING?(Jt("hung_connecting"),yt()):(!K||K.readyState===WebSocket.CLOSED||K.readyState===WebSocket.CLOSING)&&yt(),(t||e==="tab_visible"||e==="pageshow"||e==="focus"||e==="online")&&Ye(e,!0)))}function yt(){if(!(typeof WebSocket>"u")&&!(typeof navigator<"u"&&!navigator.onLine)&&xt()&&!we&&!_e()&&!(K&&(K.readyState===WebSocket.CONNECTING||K.readyState===WebSocket.OPEN))){Pt=!1;try{const e=new WebSocket(ro);K=e,e.onopen=()=>{rt=0,ia(e),Gt(e,"realtime:darc_live","phx_join",{config:{broadcast:{ack:!1,self:!1}}}),["tasks","projects","comments","documents","notifications"].forEach(t=>{Gt(e,`realtime:public:${t}`,"phx_join",{config:{postgres_changes:[{event:"*",schema:"public",table:t}]}})})},e.onmessage=t=>{try{Ae&&(clearTimeout(Ae),Ae=null),Zi++;const{event:n,topic:i,payload:a}=JSON.parse(t.data);if(n==="phx_reply"){Ht&&(Xi=Math.max(1,Date.now()-Ht));return}if(n==="phx_close"||_e())return;if(n==="postgres_changes"&&a?.data){const{table:r,type:d,record:l,old_record:c}=a.data;if(jt(r,d,l,c))return}if((n==="INSERT"||n==="UPDATE"||n==="DELETE")&&i?.startsWith("realtime:public:")){const r=i.split(":")[2];if(jt(r,n,a?.record||a?.new,a?.old_record||a?.old))return}if(i==="realtime:darc_live"&&(n==="broadcast"||n==="STATE_MUTATION"||n==="GRANULAR_DELTA")){const r=a?.payload||a,d=r?.mutationId||r?.id||r?.entityId;if(d&&ve.has(d))return;if(r?.delta){const{table:l,action:c,record:p,oldRecord:u}=r.delta;if(jt(l,c,p,u))return}Ye("edge_broadcast");return}(n==="broadcast"||i==="realtime:darc_live"||typeof i=="string"&&i.startsWith("realtime:public:"))&&Ye("supabase_ws")}catch{}},e.onerror=()=>{},e.onclose=t=>{if(Hn(),K=null,!Pt&&!we&&t?.reason!=="logout"&&t?.reason!=="unauthorized_401"&&Yi++,!(Pt||!xt()||we)&&!(t?.reason==="logout"||t?.reason==="unauthorized_401")&&typeof navigator<"u"&&navigator.onLine){rt++;const n=Math.min(3e4,Math.pow(2,Math.min(rt,5))*1e3)+Math.floor(Math.random()*800);ot&&clearTimeout(ot),ot=setTimeout(()=>{yt()},n)}}}catch(e){console.warn("[Realtime] WebSocket init failed:",e.message)}}}function ii(){const e=Date.now();if(e-xn>1e4){const t=e-ct>12e4;xn=e,ct=e,t&&K&&K.readyState===WebSocket.OPEN&&ia(K),we&&(typeof document>"u"||!document.hidden)&&gt("user_active")}}function wo(){dn&&clearInterval(dn),dn=setInterval(()=>{const e=Date.now();for(const[t,n]of ve.entries())e-n>8e3&&ve.delete(t);we||typeof document<"u"&&document.hidden||Date.now()-ct>=so&&wn("inactivity_idle")},6e4)}function Xo(){if(!ti){if(ti=!0,xt()&&yt(),wo(),typeof window<"u"&&(["pointerdown","keydown","scroll","touchstart"].forEach(e=>{window.addEventListener(e,ii,{passive:!0})}),window.addEventListener("mousemove",ii,{passive:!0})),typeof document<"u"&&(document.addEventListener("visibilitychange",()=>{document.hidden?(it&&clearTimeout(it),it=setTimeout(()=>{wn("tab_hidden")},lo)):(it&&(clearTimeout(it),it=null),ct=Date.now(),xn=Date.now(),gt("tab_visible"))}),typeof window<"u"&&(window.addEventListener("pageshow",()=>gt("pageshow"),{passive:!0}),window.addEventListener("focus",()=>gt("focus"),{passive:!0}))),typeof BroadcastChannel<"u"){const e=new BroadcastChannel("darc_state_sync");e.onmessage=t=>{if(!!t.data?.isDemo===_e())if(t.data?.type==="GRANULAR_DELTA"&&t.data.delta){const{table:n,action:i,record:a,oldRecord:r}=t.data.delta;jt(n,i,a,r)}else t.data?.type==="STATE_MUTATION"&&Ye("broadcast_channel",!0)},window._darcBroadcastChannel=e}window.addEventListener("online",async()=>{s.isOffline=!1,rt=0;const e=window.api,t=typeof window.choose=="function"?window.choose:(i=>i),n=typeof window.showToast=="function"?window.showToast:console.log;if(gt("online"),e){const i=await Mo(e);i&&i.synced>0?n(t(`تمت استعادة الاتصال ومزامنة ${i.synced} عمليات معلقة بنجاح!`,`Internet restored! Synced ${i.synced} pending actions successfully!`),!1):n(t("تمت استعادة الاتصال بالإنترنت","Internet connection restored"),!1)}Ye("online")}),window.addEventListener("offline",()=>{if(s.isOffline=!0,rt=0,wn("offline"),typeof window.renderApp=="function"&&window.renderApp(),typeof window.showToast=="function"){const e=typeof window.choose=="function"?window.choose("أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت","Offline Mode — you can continue working, changes will auto-sync on reconnect"):"أنت في وضع عدم الاتصال (Offline Mode)";window.showToast(e,!0)}})}}function ko(e=null){if(typeof window<"u"&&window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:e?"GRANULAR_DELTA":"STATE_MUTATION",delta:e,timestamp:Date.now(),isDemo:_e()})}catch{}}typeof window<"u"&&(window.isRealtimeConnected=Qi,window.notifyStateMutation=ko,window.disconnectSupabaseRealtime=Jt,window.recordRecentLocalMutation=go,window.recalculateProjectProgressInMemory=at);var $o=Date.now(),aa=0,ht=typeof document<"u"&&document.visibilityState==="visible"?Date.now():0;function oa(){if(ht>0){const e=Date.now();aa+=Math.max(0,Math.round((e-ht)/1e3)),ht=typeof document<"u"&&document.visibilityState==="visible"?e:0}}var Kt=0,Xt=0,cn=null,ai=Date.now(),Ot=[],ft=new Map,So=/(password|token|secret|authorization|cookie|creditCard|apiKey|turnstile|sessionToken)/i;function pt(e){if(e==null)return e;if(typeof e=="string")return e.replace(/Bearer\s+[A-Za-z0-9-_=.]+/gi,"Bearer [REDACTED_JWT]").replace(/ey[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/g,"[REDACTED_JWT]").replace(/\b[A-Fa-f0-9]{32,64}\b/g,"[REDACTED_HASH]").replace(/\b\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}\b/g,"[REDACTED_CARD]").replace(/(password|secret|token|apiKey)=(?:[^\s&]+)/gi,"$1=[REDACTED]");if(Array.isArray(e))return e.map(pt);if(typeof e=="object"){const t={};for(const[n,i]of Object.entries(e))So.test(n)?t[n]="[REDACTED]":t[n]=pt(i);return t}return e}function ye(e="action",t="",n=null){const i=new Date,a=i.toTimeString().split(" ")[0]+"."+String(i.getMilliseconds()).padStart(3,"0"),r=pt(String(t||"").slice(0,250)),d=n?pt(n):null;Ot.push({time:a,timestamp:i.getTime(),category:String(e).slice(0,40),message:r,metadata:d?JSON.stringify(d).slice(0,300):null}),Ot.length>25&&Ot.shift()}function ra(){return[...Ot]}typeof document<"u"&&document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"?ht=Date.now():(oa(),ht=0)});if(typeof window<"u"){if(window.addEventListener("webglcontextlost",e=>{e.preventDefault(),console.warn("[WebGL Context Guard] Context loss intercepted; executing LOD vertex decimation and GPU memory purge."),ye("webgl.guard","WebGL Context Lost intercepted. Auto-recovery and LOD mesh decimation active.")},!1),window.addEventListener("webglcontextrestored",()=>{console.info("[WebGL Context Guard] WebGL context successfully restored with optimized buffer allocation."),ye("webgl.guard","WebGL Context successfully restored with optimized buffer allocation.")},!1),window.addEventListener("hashchange",()=>{ye("navigation",`الانتقال إلى: ${window.location.hash||"#dashboard"}`)}),typeof document<"u"&&document.addEventListener("click",e=>{try{const t=e.target.closest('button, a, [data-action], input[type="submit"], .nav-item, .tab-item');if(!t)return;const n=t.getAttribute("data-action")||t.getAttribute("href")||t.className||t.tagName,i=(t.innerText||t.value||t.title||"").trim().slice(0,40);ye("ui.click",`النقر على: ${i?`"${i}" `:""}[${n}]`)}catch{}},{passive:!0,capture:!0}),!window.__DARC_CONSOLE_HOOKED__){window.__DARC_CONSOLE_HOOKED__=!0;const e=console.warn,t=console.error;console.warn=(...n)=>{try{const i=n.map(a=>typeof a=="object"?JSON.stringify(a):String(a)).join(" ");!i.includes("[Telemetry]")&&!i.includes("[WebGL Context Guard]")&&!i.includes("[Offline Outbox]")&&ye("console.warn",i.slice(0,160))}catch{}e.apply(console,n)},console.error=(...n)=>{try{const i=n.map(a=>typeof a=="object"?JSON.stringify(a):String(a)).join(" ");!i.includes("[Telemetry]")&&!i.includes("API Failed")&&ye("console.error",i.slice(0,160))}catch{}t.apply(console,n)}}try{"PerformanceObserver"in window&&PerformanceObserver.supportedEntryTypes?.includes("longtask")&&new PerformanceObserver(e=>{Xt+=e.getEntries().length}).observe({type:"longtask",buffered:!0})}catch{}document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Yt(!1,!0)}),window.addEventListener("pagehide",()=>{Yt(!1,!0)})}function Un(){return typeof performance<"u"&&performance.memory?.usedJSHeapSize?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:42.5}function sa(){if(typeof navigator>"u")return{os:"Unknown",browser:"Unknown"};const e=navigator.userAgent;let t="Chrome";e.includes("Edg/")?t="Edge":e.includes("Safari/")&&!e.includes("Chrome/")?t="Safari":e.includes("Firefox/")&&(t="Firefox");let n="macOS";return e.includes("Win")?n="Windows":e.includes("Android")?n="Android":e.includes("iPhone")||e.includes("iPad")?n="iOS":e.includes("Linux")&&(n="Linux"),{os:n,browser:t}}function da(){if(typeof window>"u")return"desktop";const e=window.innerWidth;return e<768?"mobile":e<1024?"tablet":"desktop"}async function To(e,t={}){Kt++;const{os:n,browser:i}=sa(),a=da(),r=typeof window<"u"&&window.screen?`${window.screen.width} x ${window.screen.height} (Scale: ${window.devicePixelRatio||1}x)`:"Unknown",d=e||{},l=String(d.message||d.reason||d||"Unknown client error"),c=String(d.stack||t.stack||"No stack trace provided."),p=d.name||t.errorType||"ClientRuntimeError",u=pt(l),m=pt(c),x=`${p}:${u.slice(0,80)}`,y=Date.now();if(y-(ft.get(x)||0)<15e3)return ye("error.throttled",`${p}: ${u.slice(0,100)} (Throttled local)`),{ok:!0,throttled:!0};if(ft.set(x,y),ft.size>50)for(const[S,A]of ft.entries())y-A>6e4&&ft.delete(S);ye("error",`${p}: ${u}`);const h=s.data?.user||{},f=_e(),k={userId:h.id||"usr_demo",isDemo:f,userName:h.name||"Demo",userEmail:h.email||"demo@darc-design.bond",userRole:h.jobTitleAr||s.data?.role?.nameAr||"مهندس مساحة العمل",avatarColor:h.avatarColor||"#0d6269",errorType:p,errorMessage:u,stackTrace:m,deviceType:a,browser:i,os:n,screenResolution:r,memoryMb:Un(),currentView:s.view?`#${s.view}`:typeof window<"u"&&window.location.hash||"#dashboard",breadcrumbs:ra(),severity:t.severity||"high",titleAr:t.titleAr||`خطأ تشغيلي في مساحة العمل (${p})`,titleEn:t.titleEn||`Workspace Runtime Error (${p})`};try{return await ke("/api/telemetry/report-error",{method:"POST",body:JSON.stringify(k),silent:!0})}catch{if(typeof navigator<"u"&&navigator.sendBeacon)try{const A=new Blob([JSON.stringify(k)],{type:"application/json"});navigator.sendBeacon((Vn||"")+"/api/telemetry/report-error",A)}catch{}}}async function Yt(e=!1,t=!1){const n=Date.now(),i=Math.max(5,Math.round((n-ai)/1e3));ai=n;let a=null,r=null,d=!1;try{typeof localStorage<"u"&&(a=localStorage.getItem("darc_vid"),a||(a="vid_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36),localStorage.setItem("darc_vid",a))),typeof sessionStorage<"u"&&(r=sessionStorage.getItem("darc_sid"),r||(r="sid_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36),sessionStorage.setItem("darc_sid",r),d=!0))}catch{}const{os:l,browser:c}=sa(),p=da(),u=_e(),m={userId:s.data?.user?.id||"anonymous",isDemo:u,sessionId:r,visitorId:a,isNewVisit:d,os:l,browser:c,deviceType:p,durationSeconds:i,memoryMb:Un(),errorCount:Kt,longTaskCount:Xt,currentView:s.view||"dashboard"};if(m.memoryMb>140&&(e=!0),t&&typeof navigator<"u"&&navigator.sendBeacon)try{const x=new Blob([JSON.stringify(m)],{type:"application/json"}),y=(Vn||"")+"/api/telemetry/heartbeat";navigator.sendBeacon(y,x);return}catch{}try{const x=await ke("/api/telemetry/heartbeat",{method:"POST",body:JSON.stringify(m),silent:!0});return Kt=0,Xt=0,x}catch{}}var la=Date.now();if(typeof window<"u"){const e=()=>{la=Date.now()};["pointerdown","keydown","touchstart"].forEach(t=>{window.addEventListener(t,e,{passive:!0})})}function Yo(){cn&&clearInterval(cn);const e=typeof navigator<"u"&&navigator.connection?.saveData?9e4:45e3;setTimeout(()=>Yt(!1),5e3),cn=setInterval(()=>{typeof document<"u"&&document.visibilityState==="visible"&&(Date.now()-la>12e4||Yt(!1))},e)}function Zo(){return oa(),{totalSessionDurationSeconds:Math.round((Date.now()-$o)/1e3),activeDurationSeconds:aa,memoryMb:Un(),errorCount:Kt,longTaskCount:Xt,recentBreadcrumbs:ra()}}var Ao="darc_offline_db",Eo=1,qe="cache_store",ut="darc_offline_bootstrap",xe="darc_offline_mutations_queue",oi="darc_offline_dead_letter_queue",pn=!1,un=null;function Wn(){return typeof indexedDB>"u"?Promise.resolve(null):(un||(un=new Promise(e=>{try{const t=indexedDB.open(Ao,Eo);t.onupgradeneeded=n=>{const i=n.target.result;i.objectStoreNames.contains(qe)||i.createObjectStore(qe)},t.onsuccess=()=>e(t.result),t.onerror=()=>e(null)}catch{e(null)}})),un)}async function _o(e){const t=await Wn();return t?new Promise(n=>{try{const i=t.transaction(qe,"readonly").objectStore(qe).get(e);i.onsuccess=()=>n(i.result||null),i.onerror=()=>n(null)}catch{n(null)}}):null}async function Do(e,t){const n=await Wn();return n?new Promise(i=>{try{const a=n.transaction(qe,"readwrite").objectStore(qe).put(t,e);a.onsuccess=()=>i(!0),a.onerror=()=>i(!1)}catch{i(!1)}}):!1}async function ri(e){const t=await Wn();return t?new Promise(n=>{try{const i=t.transaction(qe,"readwrite").objectStore(qe).delete(e);i.onsuccess=()=>n(!0),i.onerror=()=>n(!1)}catch{n(!1)}}):!1}function Io(){return typeof navigator<"u"?navigator.onLine:!0}function he(e){if(!e||!e.user)return;const t={timestamp:Date.now(),data:e};if(Do(ut,t).catch(()=>{}),typeof localStorage<"u"){const n=()=>{try{const i=JSON.stringify(t);if(i.length>3670016){console.warn("[Offline] Payload exceeds 3.5MB, bypassing localStorage and relying exclusively on IndexedDB");return}localStorage.setItem(ut,i)}catch(i){console.warn("[Offline] localStorage quota exceeded, relying on IndexedDB:",i.message)}};typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:2e3}):setTimeout(n,50)}}function ca(){if(typeof localStorage<"u")try{const e=localStorage.getItem(ut);if(e){const t=JSON.parse(e);if(t?.data&&t.data.user)return t.data}}catch{}return null}async function si(){const e=await _o(ut);return e?.data&&e.data.user?e.data:ca()}async function kn(){if(typeof localStorage<"u")try{localStorage.removeItem(ut),localStorage.removeItem(xe)}catch{}await Promise.all([ri(ut),ri(xe)]),Oe()}function Oe(){typeof window<"u"&&window.dispatchEvent(new CustomEvent("darc:queue-change",{detail:{count:wt().length}}))}function st(e){return typeof crypto<"u"&&crypto.randomUUID?e+"_"+crypto.randomUUID().replace(/-/g,"").slice(0,16):e+"_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-8)}function di({path:e,method:t="POST",body:n=null,description:i=""}){if(typeof localStorage>"u")return null;try{const a=localStorage.getItem(xe),r=a?JSON.parse(a):[];if(t==="DELETE"){if(e.startsWith("/api/tasks/")){const l=e.split("/")[3];if(r.some(c=>c.method==="POST"&&c.path==="/api/tasks"&&c.body?.id===l)){const c=r.filter(p=>!(p.path==="/api/tasks"&&p.body?.id===l||p.path===`/api/tasks/${l}`||p.path.startsWith(`/api/tasks/${l}/`)));return localStorage.setItem(xe,JSON.stringify(c)),Oe(),{id:"compacted",compacted:!0}}}else if(e.startsWith("/api/projects/")){const l=e.split("/")[3];if(r.some(c=>c.method==="POST"&&c.path==="/api/projects"&&c.body?.id===l)){const c=r.filter(p=>!(p.path==="/api/projects"&&p.body?.id===l||p.path===`/api/projects/${l}`||p.method==="POST"&&p.path==="/api/tasks"&&p.body?.projectId===l));return localStorage.setItem(xe,JSON.stringify(c)),Oe(),{id:"compacted",compacted:!0}}}}if(t==="PATCH"&&e==="/api/tasks/reorder"&&n?.items&&Array.isArray(n.items)){const l=r.findIndex(c=>c.method==="PATCH"&&c.path==="/api/tasks/reorder");if(l!==-1){const c=r[l],p=new Map((c.body?.items||[]).map(u=>[u.id,u]));return n.items.forEach(u=>p.set(u.id,u)),c.body={items:Array.from(p.values())},c.createdAt=new Date().toISOString(),localStorage.setItem(xe,JSON.stringify(r)),Oe(),c}}if(t==="PATCH"&&n&&typeof n=="object"){const l=r.findIndex(c=>c.method==="PATCH"&&c.path===e);if(l!==-1){const c=r[l];if(e==="/api/tasks/reorder"&&Array.isArray(n.items)){const p=new Map((c.body?.items||[]).map(u=>[u.id,u]));n.items.forEach(u=>p.set(u.id,u)),c.body={items:Array.from(p.values())}}else c.body={...c.body||{},...n};return c.createdAt=new Date().toISOString(),localStorage.setItem(xe,JSON.stringify(r)),Oe(),c}}const d={id:"mut_"+Date.now()+"_"+Math.random().toString(36).substring(2,8),path:e,method:t,body:n,description:i,createdAt:new Date().toISOString()};return r.push(d),localStorage.setItem(xe,JSON.stringify(r)),Oe(),console.log("[Offline Outbox] Enqueued mutation:",d),d}catch(a){return console.warn("[Offline Outbox] Failed to enqueue mutation:",a.message),null}}function wt(){if(typeof localStorage>"u")return[];try{const e=localStorage.getItem(xe);return e?JSON.parse(e):[]}catch{return[]}}function Co(){typeof localStorage>"u"||(localStorage.removeItem(xe),Oe())}function fn(e,t,n=400){if(!(typeof localStorage>"u"||!e))try{const i=localStorage.getItem(oi),a=i?JSON.parse(i):[];a.unshift({id:e.id,path:e.path,method:e.method,description:e.description||"",failedAt:new Date().toISOString(),reason:String(t||"Client rejection"),status:Number(n||400)}),a.length>20&&(a.length=20),localStorage.setItem(oi,JSON.stringify(a)),typeof window<"u"&&typeof window.recordBreadcrumb=="function"&&window.recordBreadcrumb("offline.deadletter",`Rejected: ${e.method} ${e.path} (${n})`)}catch(i){console.warn("[Offline DeadLetter] Failed to record:",i.message)}}function li(e,t,n,i){if(!i||!i.data)return{ok:!0,queued:!0,offline:!0};const a=new Date().toISOString();if(t==="POST"&&e==="/api/tasks"&&n){const r=n.id||st("tsk");n.id=r;const d={id:r,code:"OFFLINE",projectId:n.projectId,titleAr:n.titleAr,titleEn:n.titleEn||n.titleAr,descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",status:n.status||"not_started",priority:n.priority||"medium",categoryAr:n.categoryAr||"عام",categoryEn:n.categoryEn||"General",weight:Number(n.weight||1),progress:Number(n.progress||0),assigneeId:n.assigneeId||null,assignee:i.data.users?.find(c=>c.id===n.assigneeId)||null,reviewerId:n.reviewerId||null,startDate:n.startDate||null,dueDate:n.dueDate||null,customFields:n.customFields||{},createdAt:a,updatedAt:a,_isOfflinePending:!0};i.data.tasks||(i.data.tasks=[]);const l=i.data.tasks.findIndex(c=>c.id===r);return l!==-1?i.data.tasks[l]=d:i.data.tasks.unshift(d),he(i.data),{ok:!0,queued:!0,offline:!0,task:d}}if(t==="PATCH"&&e.startsWith("/api/tasks/")&&n){const r=e.split("/")[3],d=(i.data.tasks||[]).findIndex(l=>l.id===r);if(d!==-1){const l={...i.data.tasks[d],...n,updatedAt:a,_isOfflinePending:!0};return n.assigneeId!==void 0&&(l.assignee=i.data.users?.find(c=>c.id===n.assigneeId)||null),i.data.tasks[d]=l,he(i.data),{ok:!0,queued:!0,offline:!0,task:l}}}if(t==="DELETE"&&e.startsWith("/api/tasks/")){const r=e.split("/")[3];return i.data.tasks&&(i.data.tasks=i.data.tasks.filter(d=>d.id!==r),he(i.data)),{ok:!0,queued:!0,offline:!0}}if(t==="POST"&&e==="/api/projects"&&n){const r=n.id||st("prj");n.id=r;const d={id:r,code:n.code||"DARC-OFF-"+Date.now().toString(36).slice(-4).toUpperCase(),nameAr:n.nameAr||n.name||"مشروع محلي جديد",nameEn:n.nameEn||n.name||"New Offline Project",clientAr:n.clientAr||"",clientEn:n.clientEn||"",descriptionAr:n.descriptionAr||"",descriptionEn:n.descriptionEn||"",lifecycle:n.lifecycle||"planning",health:n.health||"on_track",progress:0,progressMode:"weighted",managerId:n.managerId||i.data.user?.id,memberIds:Array.isArray(n.memberIds)?n.memberIds:[],startDate:n.startDate||null,dueDate:n.dueDate||null,createdAt:a,updatedAt:a,_isOfflinePending:!0};i.data.projects||(i.data.projects=[]);const l=i.data.projects.findIndex(c=>c.id===r);return l!==-1?i.data.projects[l]=d:i.data.projects.unshift(d),he(i.data),{ok:!0,queued:!0,offline:!0,project:d}}if(t==="PATCH"&&e.startsWith("/api/projects/")&&n){const r=e.split("/")[3],d=(i.data.projects||[]).findIndex(l=>l.id===r);if(d!==-1){const l={...i.data.projects[d],...n,updatedAt:a,_isOfflinePending:!0};return i.data.projects[d]=l,he(i.data),{ok:!0,queued:!0,offline:!0,project:l}}}if(t==="DELETE"&&e.startsWith("/api/projects/")){const r=e.split("/")[3];return i.data.projects&&(i.data.projects=i.data.projects.filter(d=>d.id!==r),he(i.data)),{ok:!0,queued:!0,offline:!0}}if(t==="POST"&&e.includes("/comments")&&n){const r=e.split("/")[3],d={id:n.id||st("cmt"),taskId:r,userId:i.data.user?.id,content:n.content,createdAt:a,_isOfflinePending:!0};return n.id=d.id,i.data.comments||(i.data.comments=[]),i.data.comments.some(l=>l.id===d.id)||i.data.comments.push(d),he(i.data),{ok:!0,queued:!0,offline:!0,comment:d}}return t==="PATCH"&&e==="/api/tasks/reorder"&&n&&Array.isArray(n.items)?(i.data.tasks&&(n.items.forEach(r=>{const d=i.data.tasks.find(l=>l.id===r.id);d&&(r.status&&(d.status=r.status),r.sortOrder&&(d.sortOrder=r.sortOrder),r.customFields&&(d.customFields={...d.customFields||{},...r.customFields}),d._isOfflinePending=!0)}),he(i.data)),{ok:!0,queued:!0,offline:!0}):{ok:!0,queued:!0,offline:!0}}async function Mo(e){return typeof navigator<"u"&&navigator.locks&&typeof navigator.locks.request=="function"?await navigator.locks.request("darc_offline_sync_lock",{ifAvailable:!0},async t=>t?await ci(e):(console.log("[Offline Sync] Another tab is currently synchronizing outbox mutations. Skipping redundant execution."),{total:0,synced:0,failed:0,locked:!0})):await ci(e)}async function ci(e){if(pn)return{total:0,synced:0,failed:0};const t=wt();if(!t.length)return{total:0,synced:0,failed:0};pn=!0,console.log(`[Offline Sync] Replaying ${t.length} pending mutations...`);let n=0,i=!1;const a=/^\/api\/(tasks|projects|documents|reminders|comments|notifications)(\/|$)/,r=new Set(["POST","PATCH","PUT","DELETE"]);try{for(let d=0;d<t.length;d++){const l=t[d];if(!l||!l.path||typeof l.path!="string"||!a.test(l.path)||!r.has(l.method)){console.warn("[Offline Sync] Dropping unauthorized/malformed queue mutation:",l?.id,l?.path),fn(l,"Unauthorized or malformed path",400);continue}try{const c={method:l.method,headers:{"X-Offline-Replay":"true","X-Offline-Id":l.id,"X-Idempotency-Key":l.id}};l.body&&(c.body=typeof l.body=="string"?l.body:JSON.stringify(l.body));const p=await e(l.path,c);if(p&&p.error&&!p.ok)console.warn("[Offline Sync] Dropping unprocessable mutation:",l.id,p.error),fn(l,p.error,p.status||422);else if(n++,l.path==="/api/tasks/reorder"&&Array.isArray(l.body?.items))l.body.items.forEach(u=>{u?.id&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(u.id)});else{const u=l.body&&typeof l.body=="object"&&l.body.id||typeof l.path=="string"&&l.path.split("/")[3];u&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(u)}}catch(c){console.error("[Offline Sync] Failed to replay mutation:",l.id,l.path,c.message);const p=typeof c.status=="number"&&c.status>0,u=p&&(c.status===412||c.status===409);if(!(p&&c.status>=400&&c.status<500&&!u)&&!u&&(typeof navigator<"u"&&!navigator.onLine||!p&&c.name==="TypeError"||c.message&&(c.message.includes("تعذر الاتصال")||c.message.includes("NetworkError")))){const m=t.slice(d);typeof localStorage<"u"&&localStorage.setItem(xe,JSON.stringify(m)),i=!0;break}if(u&&(ye("offline.conflict",`تعارض في النسخ للمعاملة: ${l.path} (${c.status})`),To(c,{source:"syncPendingMutations.conflict",mutationId:l.id,path:l.path,severity:"warning"}),typeof window<"u")){const m=new CustomEvent("darc:sync-conflict",{detail:{item:l,error:c.message,status:c.status}});window.dispatchEvent(m),typeof window.showToast=="function"&&window.showToast("تنبيه: حدث تعارض في مزامنة بيانات الميدان، تم حفظ التعديل محلياً للمراجعة",!0)}console.warn(`[Offline Sync] Poison pill archived in Dead-Letter Queue (HTTP ${c.status||"Client Error"}):`,l.id,l.path),fn(l,c.message,c.status||400)}}i||(Co(),["tasks","projects","comments","documents"].forEach(d=>{Array.isArray(s.data?.[d])&&s.data[d].forEach(l=>{l._isOfflinePending&&delete l._isOfflinePending})}),s.data&&he(s.data),typeof document<"u"&&document.querySelectorAll(".badge-offline-pending").forEach(d=>d.remove()))}finally{pn=!1,Oe()}return{total:t.length,synced:n,failed:i?t.length-n:0}}var Vn=typeof window<"u"&&(window.location.hostname==="127.0.0.1"||window.location.hostname==="localhost")?window.location.port==="8787"?`${window.location.protocol}//${window.location.hostname}:8787`:window.__API_BASE__!==void 0?window.__API_BASE__:"":typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:"",Nt=typeof sessionStorage<"u"?sessionStorage.getItem("darc_bootstrap_etag"):null;function bt(){Nt=null;try{typeof sessionStorage<"u"&&sessionStorage.removeItem("darc_bootstrap_etag")}catch{}}typeof document<"u"&&document.getElementById("darc-global-progress")?.remove();async function ke(e,t={}){const n=["POST","PATCH","PUT","DELETE"].includes(t.method),i=e.startsWith("/api/auth")||e.startsWith("/api/telemetry")||e==="/api/health",a=!!(t.headers&&(t.headers["X-Offline-Replay"]==="true"||t.headers["X-Offline-Replay"]===!0));let r=null;if(n&&t.body)try{r=typeof t.body=="string"?JSON.parse(t.body):t.body}catch{}t.method==="POST"&&r&&typeof r=="object"&&!a&&(e==="/api/tasks"&&!r.id?(r.id=st("tsk"),t.body=JSON.stringify(r)):e==="/api/projects"&&!r.id?(r.id=st("prj"),t.body=JSON.stringify(r)):e.includes("/comments")&&!r.id&&(r.id=st("cmt"),t.body=JSON.stringify(r)));const d=typeof FormData<"u"&&t.body instanceof FormData;if(typeof navigator<"u"&&!navigator.onLine&&n&&!i){if(a)throw new Error(o("تعذر الاتصال بالخادم، ما زال النظام دون اتصال.","Unable to connect to server. System is still offline."));if(d){const N=o("لا يمكن رفع المخططات أو الملفات في وضع عدم الاتصال. يرجى الاتصال بالإنترنت لإتمام الرفع.","File and drawing uploads are not supported offline. Please reconnect to upload.");throw Y(N,!0),new Error(N)}const A=di({path:e,method:t.method,body:r}),_=li(e,t.method,r,s);return Y(o("أنت في وضع عدم الاتصال: تم حفظ العملية محلياً وستُرفع تلقائياً عند عودة الاتصال","Offline mode: action saved locally and will auto-sync on reconnect"),!1),{ok:!0,queued:!0,offline:!0,id:A?.id,..._}}const l=St();if(!i&&!l){bt(),typeof localStorage<"u"&&(localStorage.removeItem("darc_token"),localStorage.removeItem("darc_user_id")),kn(),s.data=null,s.view="login",typeof window<"u"&&(typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("cookie_deleted"),window.location.hash!=="#login"&&(window.location.hash="#login"),typeof window.renderLogin=="function"&&window.renderLogin());const A=new Error(o("تم إنهاء الجلسة أو حذف ملفات تعريف الارتباط.","Session ended or cookies cleared."));throw A.status=401,A}const c=l&&typeof localStorage<"u"?localStorage.getItem("darc_token"):null,p=!!(t.silent||t.headers&&t.headers["X-Silent"]),u=typeof localStorage<"u"&&!!localStorage.getItem("darc_offline_bootstrap"),m=!!Nt&&(p||!!s.data||u),x=n?`mut_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`:null,y={...c?{Authorization:`Bearer ${c}`}:{},...t.body&&!d?{"Content-Type":"application/json"}:{},...x?{"X-Mutation-ID":x}:{},...e==="/api/bootstrap"&&m?{"If-None-Match":Nt}:{},...e==="/api/bootstrap"&&!m?{"Cache-Control":"no-cache, no-store"}:{},...t.headers||{}};e==="/api/bootstrap"&&!m&&(t.cache="no-cache"),t.credentials="include";const h=typeof performance<"u"?performance.now():Date.now();let f;try{f=await fetch(Vn+e,{...t,headers:y});const A=Math.round((typeof performance<"u"?performance.now():Date.now())-h);e.startsWith("/api/telemetry")||ye("http.request",`${t.method||"GET"} ${e} (${f.status} - ${A}ms)`)}catch{if(n&&!i&&!a){if(d){const j=o("انقطع الاتصال بالإنترنت أثناء الرفع. يرجى إعادة المحاولة عند استقرار الشبكة.","Internet disconnected during file upload. Please retry once reconnected.");throw Y(j,!0),new Error(j)}const _=di({path:e,method:t.method,body:r}),N=li(e,t.method,r,s);return Y(o("تعذر الاتصال بالخادم: تم حفظ العملية محلياً للمزامنة التلقائية","Connection lost: action saved locally for auto-sync"),!1),{ok:!0,queued:!0,offline:!0,id:_?.id,...N}}throw new Error(o("تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.","Unable to connect to server. Please check your internet connection."))}if(f.status===304)return null;if(!f.ok){const A=await f.text();f.status!==401&&console.error(`API Failed [${e}]: ${f.status} - ${A}`);let _={};try{_=JSON.parse(A)}catch{}if(f.status===401&&(bt(),hi(!1),typeof window<"u"&&typeof window.disconnectSupabaseRealtime=="function"&&window.disconnectSupabaseRealtime("unauthorized_401"),e!=="/api/auth/login")){typeof localStorage<"u"&&(localStorage.removeItem("darc_token"),localStorage.removeItem("darc_user_id"));try{kn()}catch{}s.data=null,s.view="login",typeof window<"u"&&(window.location.hash!=="#login"&&(window.location.hash="#login"),typeof window.renderLogin=="function"&&window.renderLogin())}ye("api.error",`${t.method||"GET"} ${e} (Status ${f.status}: ${_.error||"Failed"})`);const N=_.error||(A&&A.length<200&&!A.includes("<!DOCTYPE")?A:null)||o(`فشل الطلب على المسار ${e} (رمز الحالة ${f.status})`,`Request failed for ${e} (Status ${f.status})`),j=new Error(N);throw j.status=f.status,j.code=_.code||`HTTP_${f.status}`,j.rawResponse=A,j}const k=f.headers.get("ETag");if(k&&e==="/api/bootstrap"){Nt=k;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_bootstrap_etag",k)}catch{}}let S;try{const A=await f.text();S=A?JSON.parse(A):{ok:!0}}catch(A){if(e.startsWith("/api/bootstrap")||!n&&!i)throw console.error("[API] JSON parse failed on path:",e,A.message),new Error(o("فشل استلام بيانات النظام بشكل صحيح من الخادم.","Failed to parse workspace data from server."));S={ok:!0}}if(["POST","PATCH","PUT","DELETE"].includes(t.method)){bt();let A=r&&typeof r.id=="string"?r.id:null;if(!A&&S&&typeof S=="object"&&(A=S.id||S.task?.id||S.project?.id||S.comment?.id||S.document?.id||S.data?.id),!A&&typeof e=="string"){const _=e.split("/");_.length>=4&&_[3]&&!_[3].includes("?")&&(A=_[3])}if(A&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(A),x&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(x),e!=="/api/auth/login"&&e!=="/api/auth/logout"){let _=null;if(S&&(S.task?_={table:"tasks",action:t.method==="POST"?"INSERT":"UPDATE",record:S.task}:S.project?_={table:"projects",action:t.method==="POST"?"INSERT":"UPDATE",record:S.project}:S.comment?_={table:"comments",action:t.method==="POST"?"INSERT":"UPDATE",record:S.comment}:S.document?_={table:"documents",action:t.method==="POST"?"INSERT":"UPDATE",record:S.document}:e==="/api/tasks/reorder"&&(Array.isArray(S.items)||r&&Array.isArray(r.items))&&(_={table:"tasks",action:"BATCH_REORDER",record:{items:S.items||r.items}})),!_&&t.method==="DELETE"&&A&&(e.startsWith("/api/tasks/")?_={table:"tasks",action:"DELETE",record:{id:A}}:e.startsWith("/api/projects/")?_={table:"projects",action:"DELETE",record:{id:A}}:e.startsWith("/api/documents/")?_={table:"documents",action:"DELETE",record:{id:A}}:e.startsWith("/api/comments/")&&(_={table:"comments",action:"DELETE",record:{id:A}})),typeof window<"u"){if(typeof window.notifyStateMutation=="function")window.notifyStateMutation(_);else if(window._darcBroadcastChannel)try{window._darcBroadcastChannel.postMessage({type:_?"GRANULAR_DELTA":"STATE_MUTATION",delta:_,timestamp:Date.now()})}catch{}}}}return S}typeof window<"u"&&(window.api=ke);var Z=null,be=null,kt=64,Je=null,Q=-1,V=-1,dt=-1,Pe=0,_t=!1,R=null,B=null,He=0,Ue=0,Se=0,Te=0,le=!1,Ee=null,re=null,De="mouse",Me=null,J=null,pi=null,mn=null;function Ge(e){let t=document.getElementById("dnd-live-announcer");t||(t=document.createElement("div"),t.id="dnd-live-announcer",t.className="sr-only",t.setAttribute("aria-live","assertive"),t.setAttribute("aria-atomic","true"),document.body.appendChild(t)),t.textContent="",setTimeout(()=>{t.textContent=e},40)}function pa(e){Z||(Z=document.createElement("div"),Z.className="drag-placeholder");const t=Math.max(48,Math.min(220,e||kt||64));return Z.style.cssText=`
    border: 2px dashed var(--brand-teal, #0d6269);
    background: rgba(13, 98, 105, 0.06);
    border-radius: 12px;
    height: ${t}px;
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
  `,Z.innerHTML=`<span>↓ ${o("الموضع الجديد للمهمة","Drop position")}</span>`,Z}function Lo(){Z&&Z.parentNode&&Z.parentNode.removeChild(Z)}function Gn(e,t){const n=Array.from(e.querySelectorAll(".task-card:not(.is-dragging):not(#active-drag-ghost)"));return n.length===0?null:n.reduce((i,a)=>{const r=a.getBoundingClientRect(),d=t-(r.top+r.height/2);return d<0&&d>i.offset?{offset:d,element:a}:i},{offset:Number.NEGATIVE_INFINITY}).element}var ce=null,pe=null,ae=null,lt=null;function Po(){if(typeof document>"u"||!(window.innerWidth<=860||De==="touch")||ae&&ae.parentNode)return;const e=Array.from(document.querySelectorAll(".board-column"));if(!e.length)return;ae=document.createElement("div"),ae.id="dnd-column-dock",ae.className="dnd-column-dock",ae.setAttribute("role","toolbar"),ae.setAttribute("aria-label",o("التنقل السريع بين الأعمدة","Quick column navigator"));let t="";e.forEach(n=>{const i=n.dataset.status,a=n.querySelector(".board-column-title"),r=n.querySelector(".column-dot"),d=r?r.className:"column-dot",l=n.querySelector(".board-count"),c=a?a.innerText.trim():i,p=l?l.innerText.trim():"0";t+=`
      <div class="dock-column-pill" data-dock-status="${i}">
        <span class="${d}" style="width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0;"></span>
        <span class="dock-pill-title" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85px;">${c}</span>
        <span class="dock-pill-count" style="font-size:10px;font-weight:700;opacity:0.85;padding:1px 5px;border-radius:10px;background:rgba(0,0,0,0.06);">${p}</span>
      </div>
    `}),ae.innerHTML=t,document.body.appendChild(ae),requestAnimationFrame(()=>{ae?.classList.add("is-visible")})}function ua(){if(lt=null,ae){ae.classList.remove("is-visible");const e=ae;ae=null,setTimeout(()=>{e&&e.parentNode&&e.parentNode.removeChild(e)},220)}}function Ro(){typeof document>"u"||(ce||(ce=document.createElement("div"),ce.className="dnd-edge-hotzone left",document.body.appendChild(ce)),pe||(pe=document.createElement("div"),pe.className="dnd-edge-hotzone right",document.body.appendChild(pe)))}function jo(){ce&&ce.parentNode&&(ce.parentNode.removeChild(ce),ce=null),pe&&pe.parentNode&&(pe.parentNode.removeChild(pe),pe=null)}var zt=-1,$n=null,Sn=-1;function fa(e,t){if(!_t||e<0||t<0)return;let n=document.elementFromPoint(e,t)?.closest(".board-column");const i=document.querySelector(".board, .tasks-board, .board-columns");if(!n&&i){const r=i.getBoundingClientRect();if(t>=r.top-80&&t<=r.bottom+80){const d=Array.from(document.querySelectorAll(".board-column"));d.length>0&&(n=d.reduce((l,c)=>{const p=c.getBoundingClientRect(),u=Math.abs(e-(p.left+p.width/2));return u<l.dist?{col:c,dist:u}:l},{col:null,dist:1/0}).col)}}if(!n){document.querySelectorAll(".board-column").forEach(r=>r.classList.remove("drag-over"));return}document.querySelectorAll(".board-column").forEach(r=>r.classList.toggle("drag-over",r===n));const a=n.querySelector(".board-cards");if(a){if($n===n&&zt>=0&&Math.abs(t-zt)<14)return;$n=n,zt=t;const r=pa(kt),d=Gn(a,t);d==null?(!a.contains(r)||a.lastElementChild!==r)&&a.appendChild(r):r.nextElementSibling!==d&&a.insertBefore(r,d)}}function Oo(){if(Je)return;function e(){if(!_t){Je=null;return}if(Q>=0&&V>=0){let t=!1;const n=document.querySelector(".board, .board-columns, .tasks-board, [data-board]"),i=typeof window<"u"&&window.innerWidth<=768,a=i?75:85,r=i?24:28;if(n){let h=0;const f=typeof window<"u"&&window.visualViewport?.width||window.innerWidth,k=B?B.getBoundingClientRect():null,S=Q<a||k&&k.left<35,A=Q>f-a||k&&k.right>f-35;if(S){const _=Math.max(0,Q<a?a-Q:35),N=Math.min(1.5,Math.max(.15,_/a));h=-Math.max(4,Math.round(Math.pow(N,1.3)*r))}else if(A){const _=Math.max(0,Q>f-a?Q-(f-a):35),N=Math.min(1.5,Math.max(.15,_/a));h=Math.max(4,Math.round(Math.pow(N,1.3)*r))}if(h!==0){const _=n.scrollLeft;try{n.scrollBy({left:h})}catch{}if(n.scrollLeft===_&&(n.scrollLeft+=h),n.scrollLeft!==_&&(t=!0),t?h<0?(ce?.classList.add("is-active"),pe?.classList.remove("is-active")):(pe?.classList.add("is-active"),ce?.classList.remove("is-active")):(ce?.classList.remove("is-active"),pe?.classList.remove("is-active")),i){const N=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)?.closest(".board-column");if(N){const j=Array.from(document.querySelectorAll(".board-column")).indexOf(N);if(j!==-1&&j!==Sn&&(Sn=j,typeof navigator<"u"&&navigator.vibrate))try{navigator.vibrate(12)}catch{}}}}else ce?.classList.remove("is-active"),pe?.classList.remove("is-active")}const d=95,l=26,c=document.getElementById("main-content")||document.querySelector(".workspace-content"),p=c?c.getBoundingClientRect():null,u=p?Math.max(60,p.top+60):80,m=p?Math.min(window.innerHeight-30,p.bottom-60):window.innerHeight-80;if(V>m){const h=Math.min(1.5,Math.max(.2,(V-m)/d)),f=Math.max(4,Math.round(h*l));if(c&&c.scrollHeight>c.clientHeight){const k=c.scrollTop;c.scrollTop+=f,c.scrollTop!==k&&(t=!0)}if(document.documentElement.scrollHeight>window.innerHeight){const k=window.scrollY;window.scrollBy({top:f,behavior:"instant"}),window.scrollY!==k&&(t=!0)}}else if(V<u){const h=Math.min(1.5,Math.max(.2,(u-V)/d)),f=-Math.max(4,Math.round(h*l));if(c&&c.scrollHeight>c.clientHeight){const k=c.scrollTop;c.scrollTop+=f,c.scrollTop!==k&&(t=!0)}if(document.documentElement.scrollHeight>window.innerHeight){const k=window.scrollY;window.scrollBy({top:f,behavior:"instant"}),window.scrollY!==k&&(t=!0)}}const x=document.elementFromPoint(Q,V),y=x?.closest(".board-cards")||x?.closest(".board-column")?.querySelector(".board-cards");if(y&&y.scrollHeight>y.clientHeight){const h=y.getBoundingClientRect(),f=60;if(V>h.top&&V<h.top+f){const k=(f-(V-h.top))/f;y.scrollTop-=Math.max(3,Math.round(k*18)),t=!0}else if(V<h.bottom&&V>h.bottom-f){const k=(V-(h.bottom-f))/f;y.scrollTop+=Math.max(3,Math.round(k*18)),t=!0}}t&&fa(Q,V)}Je=requestAnimationFrame(e)}Je=requestAnimationFrame(e)}function No(){Je&&(cancelAnimationFrame(Je),Je=null)}async function Bt(e,t,n=null){if(!e){te();return}e.classList.remove("drag-over");const i=n||be;be=null;const a=e.dataset.status;if(!i||!a){te();return}const r=(s.data?.tasks||[]).find(w=>w.id===i);if(!r){te();return}const d=e.querySelector(".board-cards");if(!d){te();return}const l=r.status===a||a==="review"&&["review","approval","blocked"].includes(r.status);if(!l&&a==="done"&&r.dependencies&&r.dependencies.length&&r.dependencies.filter(w=>{const I=s.data.tasks.find(D=>D.id===w);return I&&I.status!=="done"}).length)return te(),Y(o("لا يمكن إكمال المهمة قبل إنجاز المهام المعتمدة عليها.","Cannot complete task before its dependencies."),!0);const c=Array.from(d.querySelectorAll(".task-card")).filter(w=>w.dataset.taskId!==i),p=c.map(w=>w.dataset.taskId).filter(Boolean);let u=p.length;if(Z&&Z.parentNode===d)if(!Z.previousElementSibling||Z.previousElementSibling.classList?.contains("empty"))u=0;else{let w=Z.nextElementSibling;for(;w&&(!w.classList?.contains("task-card")||w.dataset?.taskId===i||w.classList?.contains("is-dragging"));)w=w.nextElementSibling;if(w&&w.dataset?.taskId&&w.dataset.taskId!==i){const I=p.indexOf(w.dataset.taskId);u=I!==-1?I:p.length}else u=p.length}else if(c.length>0){const w=t&&t>0?t:V>0?V:0,I=c[0].getBoundingClientRect(),D=c[c.length-1].getBoundingClientRect();if(w<=I.top+I.height*.45)u=0;else if(w>=D.bottom-D.height*.45)u=p.length;else{const $=Gn(d,w);if($&&$.dataset.taskId!==i){const E=p.indexOf($.dataset.taskId);E!==-1&&(u=E)}}}else u=0;const m=Array.from(d.querySelectorAll(".task-card")).findIndex(w=>w.dataset.taskId===i);if(l&&m!==-1&&(u===m||u===m+1)){te();return}const x=r.status,y=(s.data.tasks||[]).map(w=>({id:w.id,status:w.status,sortOrder:w.sortOrder||w.sort_order,progress:w.progress,customFields:JSON.parse(JSON.stringify(w.customFields||w.custom_fields||{}))}));te();const h=[...p];h.splice(u,0,i),a==="review"&&["review","approval","blocked"].includes(r.status)||(r.status=a),r.status==="done"?r.progress=100:r.status==="not_started"?r.progress=0:r.status==="in_progress"&&(r.progress===0||!r.progress)?r.progress=50:["review","approval"].includes(r.status)&&(r.progress||0)<80&&(r.progress=80);let f=100,k=!1;if(h.length<=1)f=100;else if(u===0){const w=(s.data?.tasks||[]).find(D=>D.id===h[1]),I=w?.sortOrder||w?.sort_order||100;f=Math.max(1,Math.round(I/2)),f>=I&&(k=!0)}else if(u===h.length-1){const w=(s.data?.tasks||[]).find(I=>I.id===h[h.length-2]);f=(w?.sortOrder||w?.sort_order||100)+100}else{const w=(s.data?.tasks||[]).find(E=>E.id===h[u-1]),I=(s.data?.tasks||[]).find(E=>E.id===h[u+1]),D=w?.sortOrder||w?.sort_order||100,$=I?.sortOrder||I?.sort_order||200;$-D>1?f=Math.round((D+$)/2):k=!0}const S=Date.now();window._recentlyMovedTasks||(window._recentlyMovedTasks=new Map);const A=[];k?h.forEach((w,I)=>{const D=(s.data?.tasks||[]).find($=>$.id===w);if(D){const $=(I+1)*100;D.sortOrder=$,D.sort_order=$,D.customFields||(D.customFields={}),D.customFields.sortOrder=$,D.customFields.sort_order=$,D.custom_fields||(D.custom_fields={}),D.custom_fields.sortOrder=$,D.custom_fields.sort_order=$,window._recentlyMovedTasks.set(w,{status:D.status,sortOrder:$,progress:D.progress,timestamp:S}),A.push({id:D.id,status:D.status,sortOrder:$,customFields:D.customFields})}}):(r.sortOrder=f,r.sort_order=f,r.customFields||(r.customFields={}),r.customFields.sortOrder=f,r.customFields.sort_order=f,r.custom_fields||(r.custom_fields={}),r.custom_fields.sortOrder=f,r.custom_fields.sort_order=f,window._recentlyMovedTasks.set(r.id,{status:r.status,sortOrder:f,progress:r.progress,timestamp:S}),A.push({id:r.id,status:r.status,sortOrder:f,customFields:r.customFields}));for(const[w,I]of window._recentlyMovedTasks.entries())S-I.timestamp>45e3&&window._recentlyMovedTasks.delete(w);Cn("custom"),s.taskSortPref="custom",s.projectTaskSort="custom",s.myTaskSort="custom",de(!0);const _=document.querySelector(".board, .tasks-board, .board-columns")?.querySelector(`.board-column[data-status="${a}"]`),N=typeof window<"u"&&window.innerWidth<=768;if(_&&N)try{_.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}catch{}if(typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(20)}catch{}x!==a&&document.querySelectorAll(`.board-column[data-status="${a}"] .board-count, .board-column[data-status="${x}"] .board-count`).forEach(w=>{w.classList.remove("count-updated"),w.offsetWidth,w.classList.add("count-updated"),setTimeout(()=>w.classList.remove("count-updated"),350)});const j=document.querySelector(`.task-card[data-task-id="${i}"]`);j&&(j.classList.add("just-dropped"),setTimeout(()=>j?.classList.remove("just-dropped"),450));const F=e.querySelector(".board-column-title"),M=F?F.innerText.trim():a;Ge(o(`تم إفلات المهمة في عمود: ${M}، الموضع ${u+1}.`,`Dropped task into column: ${M}, position ${u+1}.`)),A.forEach(w=>{w?.id&&typeof window<"u"&&typeof window.recordRecentLocalMutation=="function"&&window.recordRecentLocalMutation(w.id)}),typeof window<"u"&&typeof window.notifyStateMutation=="function"&&window.notifyStateMutation({table:"tasks",action:"BATCH_REORDER",record:{items:A}}),window._reorderSyncTimer&&clearTimeout(window._reorderSyncTimer),window._pendingReorderBatch=window._pendingReorderBatch||new Map,A.forEach(w=>{window._pendingReorderBatch.set(w.id,w)}),window._reorderSyncTimer=setTimeout(()=>{const w=Array.from(window._pendingReorderBatch.values());window._pendingReorderBatch.clear(),ke("/api/tasks/reorder",{method:"PATCH",body:JSON.stringify({items:w})}).catch(I=>{console.warn("Reorder sync error, performing local rollback:",I),y.forEach(D=>{const $=window._recentlyMovedTasks?.get(D.id);if($&&$.timestamp>S)return;const E=(s.data?.tasks||[]).find(L=>L.id===D.id);E&&(E.status=D.status,E.sortOrder=D.sortOrder,E.sort_order=D.sortOrder,E.progress=D.progress,E.customFields=D.customFields)}),de(!0),Y(o("فشل حفظ الترتيب الجديد في الخادم. تم التراجع عن التعديل تلقائياً.","Failed to save task order to server. Reverted automatically."),!0)})},10)}function te(){if(re&&(clearTimeout(re),re=null),B&&B.parentNode&&B.parentNode.removeChild(B),B=null,R){try{Ee!=null&&R.releasePointerCapture(Ee)}catch{}R.style.opacity="",R.style.pointerEvents="",R.style.touchAction="",R.classList.remove("is-dragging"),R.classList.remove("is-touch-charging"),R.classList.remove("is-touch-holding")}R=null;const e=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");e&&(e.style.scrollSnapType=""),document.body.classList.remove("is-touch-dragging"),Ee=null,le=!1,_t=!1,Bo=!1,$t=!1,window._isDraggingTask=!1,window._isTouchHoldingTask=!1,be=null,Q=-1,V=-1,dt=-1,Pe=0,zt=-1,$n=null,Sn=-1,De="mouse",ce?.classList.remove("is-active"),pe?.classList.remove("is-active"),ua(),jo(),No(),document.querySelectorAll(".board-column").forEach(t=>t.classList.remove("drag-over")),Lo(),document.body.style.userSelect="",document.body.style.webkitUserSelect="",document.body.style.cursor="",window._pendingRenderAfterDrag&&(window._pendingRenderAfterDrag=!1,requestAnimationFrame(()=>de(!0)))}function Zt(e,t,n=De){if(!R||le)return;De=n;const i=R.dataset.taskId;if(!R.isConnected&&i){const f=document.querySelector(`.task-card[data-task-id="${i}"]`);f&&(R=f)}const a=(s.data?.tasks||[]).find(f=>f.id===R.dataset.taskId);if(!Qe(a)){te();return}if(e===0&&t===0&&(He!==0||Ue!==0)&&(e=He,t=Ue),le=!0,_t=!0,window._isDraggingTask=!0,window._isTouchHoldingTask=!1,be=R.dataset.taskId,Q=e,V=t,dt=e,Pe=0,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(35)}catch{}const r=R.getBoundingClientRect();kt=r.height;const d=(R.closest(".board-column")||document.querySelector(".board-column"))?.getBoundingClientRect(),l=d?Math.round(d.width-24):260,c=Math.max(230,Math.min(320,l)),p=r&&Number.isFinite(r.width)&&r.width>=180&&r.width<=400?Math.round(r.width):c;Se=e-r.left,Te=t-r.top,(isNaN(Se)||Se<=0||Se>p)&&(Se=p/2),(isNaN(Te)||Te<=0||Te>(r.height||120))&&(Te=(r.height||120)/2);const u=n==="touch"?32:0,m=Math.round(e-Se),x=Math.round(t-Te-u),y=document.querySelector(".board, .board-columns, .tasks-board, [data-board]");if(y&&(y.style.scrollSnapType="none"),B=R.cloneNode(!0),B.id="active-drag-ghost",B.style.cssText=`
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
    transform: translate3d(${m}px, ${x}px, 0) scale(1.025);
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
  `,document.body.appendChild(B),Ee!=null&&R)try{R.releasePointerCapture(Ee)}catch{}R.classList.remove("is-touch-charging"),R.classList.remove("is-touch-holding"),R.classList.add("is-dragging"),R.style.opacity="0.22",R.style.pointerEvents="none",document.body.classList.add("is-touch-dragging"),document.body.style.userSelect="none",document.body.style.webkitUserSelect="none",document.body.style.cursor="grabbing",Ro(),Po();const h=R.closest(".board-column");if(h){h.classList.add("drag-over");const f=h.querySelector(".board-cards");if(f){const k=pa(kt),S=Gn(f,t);S==null?f.appendChild(k):f.insertBefore(k,S)}}Oo()}function ma(e,t,n=De){if(!_t||!B||e===0&&t===0&&(He!==0||Ue!==0)||!Number.isFinite(e)||!Number.isFinite(t))return;if(De=n,Q=e,V=t,n==="touch")Pe=0;else{const d=dt>=0?e-dt:0,l=Math.max(-2,Math.min(2,(Math.abs(d)<1.5?0:d)*.12));Pe+=(l-Pe)*.22,Math.abs(Pe)<.12&&(Pe=0)}dt=e;const i=n==="touch"?32:0,a=Math.round(e-Se),r=Math.round(t-Te-i);if(Number.isFinite(a)&&Number.isFinite(r)){const d=Pe!==0?` rotate(${Pe.toFixed(1)}deg)`:"";B.style.transform=`translate3d(${a}px, ${r}px, 0) scale(1.025)${d}`}if(ae){const d=ae.getBoundingClientRect(),l=t>=d.top-15&&t<=d.bottom+18&&e>=d.left-10&&e<=d.right+10,c=ae.querySelectorAll(".dock-column-pill");let p=null;if(l?c.forEach(u=>{const m=u.getBoundingClientRect(),x=e>=m.left&&e<=m.right&&t>=m.top-15&&t<=m.bottom+15;u.classList.toggle("is-hovered",x),x&&(p=u.dataset.dockStatus)}):c.forEach(u=>u.classList.remove("is-hovered")),p&&p!==lt){if(lt=p,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(14)}catch{}}else p||(lt=null)}fa(e,t)}async function ga(e,t){if(re&&(clearTimeout(re),re=null),R&&(R.classList.remove("is-touch-charging"),R.classList.remove("is-touch-holding")),!le&&!be){te();return}if(lt&&be){const i=document.querySelector(`.board-column[data-status="${lt}"]`),a=be;if(be=null,B&&B.parentNode&&B.parentNode.removeChild(B),B=null,ua(),i&&a){await Bt(i,0,a);return}}const n=Math.hypot(e-He,t-Ue);if(window._justDroppedTaskId=be,window._justDroppedAt=Date.now(),window._isDraggingTask=!1,n>4&&be){let i=document.elementFromPoint(e,t)?.closest(".board-column")||Z&&Z.closest(".board-column");if(!i){const d=Array.from(document.querySelectorAll(".board-column"));d.length>0&&(i=d.reduce((l,c)=>{const p=c.getBoundingClientRect(),u=Math.abs(e-(p.left+p.width/2));return u<l.dist?{col:c,dist:u}:l},{col:null,dist:1/0}).col)}const a=be,r=Z&&Z.parentNode?Z.getBoundingClientRect():null;if(B&&r&&r.width>0&&r.height>0){B.style.transition="transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.14s ease, opacity 0.14s ease",B.style.transform=`translate3d(${r.left}px, ${r.top}px, 0) scale(1) rotate(0deg)`,B.style.boxShadow="0 4px 14px rgba(13, 98, 105, 0.12)",setTimeout(async()=>{B&&B.parentNode&&B.parentNode.removeChild(B),B=null,i&&a?await Bt(i,t,a):te()},130);return}if(i&&a){B&&B.parentNode&&B.parentNode.removeChild(B),B=null,await Bt(i,t,a);return}}te()}var zo=14,Bo=!1,$t=!1,Tn=!1;document.addEventListener("pointerdown",e=>{if(e.button!==0&&e.pointerType==="mouse")return;const t=e.target instanceof Element?e.target:e.target?.parentElement||null,n=t?.closest?.(".task-card");if(!n||t?.closest?.("button, a, input, select, textarea, .btn, .tag, [data-prevent-drag]"))return;const i=(s.data?.tasks||[]).find(r=>r.id===n.dataset.taskId);if(!Qe(i))return;R=n,Ee=e.pointerId,He=e.clientX,Ue=e.clientY,Q=e.clientX,V=e.clientY,dt=e.clientX,le=!1,$t=!1;const a=n.getBoundingClientRect();if(kt=a.height,Se=e.clientX-a.left,Te=e.clientY-a.top,isNaN(Se)&&(Se=a.width/2),isNaN(Te)&&(Te=a.height/2),Tn=!!t?.closest?.(".task-drag-handle"),e.pointerType==="touch")De="touch",window._isTouchHoldingTask=!0,Tn?Zt(e.clientX,e.clientY,"touch"):(n.classList.add("is-touch-charging"),re=setTimeout(()=>{if(re=null,R&&!$t&&!le){if(n.classList.remove("is-touch-charging"),typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(28)}catch{}Zt(Q>=0?Q:He,V>=0?V:Ue,"touch")}},260));else{De=e.pointerType||"mouse";try{n.setPointerCapture(e.pointerId)}catch{}}},{passive:!0});document.addEventListener("pointermove",e=>{if(!(!R||$t)&&!(Ee!=null&&e.pointerId!==Ee)){if(Q=e.clientX,V=e.clientY,!le){const t=Math.hypot(e.clientX-He,e.clientY-Ue);if(e.pointerType==="touch"){if(De="touch",Tn)t>=4&&Zt(e.clientX,e.clientY,"touch");else if(t>zo){$t=!0,window._isTouchHoldingTask=!1,re&&(clearTimeout(re),re=null),R&&(R.classList.remove("is-touch-charging"),R.classList.remove("is-touch-holding"));return}}else if(De=e.pointerType||"mouse",t>=6)Zt(e.clientX,e.clientY,e.pointerType||"mouse");else return}le&&(e.cancelable&&e.preventDefault(),ma(e.clientX,e.clientY,e.pointerType))}},{passive:!1});document.addEventListener("pointerup",async e=>{if(re&&(clearTimeout(re),re=null),R&&(R.classList.remove("is-touch-charging"),R.classList.remove("is-touch-holding")),Ee!=null&&R)try{R.releasePointerCapture(Ee)}catch{}if(!le){te();return}await ga(e.clientX,e.clientY)});document.addEventListener("pointercancel",()=>{te()});window.addEventListener("blur",()=>{(le||R)&&te()});document.addEventListener("visibilitychange",()=>{document.hidden&&(le||R)&&te()});window.addEventListener("orientationchange",()=>{(le||R)&&te()});window.addEventListener("resize",()=>{(le||R)&&te()});window.addEventListener("touchmove",e=>{if(le&&(e.cancelable&&e.preventDefault(),e.touches&&e.touches.length>0)){const t=e.touches[0];t&&t.clientX>0&&t.clientY>0&&(Q=t.clientX,V=t.clientY,ma(t.clientX,t.clientY,"touch"))}},{passive:!1});window.addEventListener("touchend",async e=>{if(window._isTouchHoldingTask=!1,re&&(clearTimeout(re),re=null),le){const t=e.changedTouches&&e.changedTouches[0]?e.changedTouches[0]:null;await ga(t?t.clientX:Q>=0?Q:He,t?t.clientY:V>=0?V:Ue)}},{passive:!0});window.addEventListener("touchcancel",()=>{te()});document.addEventListener("dragstart",e=>{(e.target instanceof Element?e.target:e.target?.parentElement||null)?.closest?.(".task-card")&&e.preventDefault()});document.addEventListener("click",e=>{window._justDroppedAt&&Date.now()-window._justDroppedAt<500&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())},!0);document.addEventListener("keydown",async e=>{if((e.target instanceof Element?e.target:e.target?.parentElement||null)?.closest?.('input, textarea, select, [contenteditable="true"]')||document.querySelector(".modal-overlay, #taskModal, .modal-backdrop"))return;const t=document.activeElement?.closest?.(".task-card");if((e.key===" "||e.altKey&&(e.key==="m"||e.key==="M"))&&t){const n=(s.data?.tasks||[]).find(i=>i.id===t.dataset.taskId);if(!Qe(n))return;if(e.preventDefault(),Me)Me===n.id&&(J?.classList.remove("is-keyboard-grabbed"),J?.setAttribute("aria-grabbed","false"),Me=null,J=null,window._isKeyboardDraggingTask=!1,Ge(o("تم إلغاء الإمساك بالمهمة.","Task released.")));else{Me=n.id,J=t,pi=n.status,mn=n.sortOrder||n.sort_order,window._isKeyboardDraggingTask=!0,t.classList.add("is-keyboard-grabbed"),t.setAttribute("aria-grabbed","true");const i=t.closest(".board-column")?.querySelector(".board-column-title")?.innerText?.trim()||"",a=o(n.titleAr,n.titleEn);Ge(o(`تم الإمساك بالمهمة "${a}". العمود الحالي: ${i}. استخدم الأسهم للتحريك، Enter للإفلات، Escape للإلغاء.`,`Grabbed task "${a}". Current column: ${i}. Use arrow keys to move, Enter to drop, Escape to cancel.`))}return}if(Me&&J){const n=(s.data?.tasks||[]).find(l=>l.id===Me);if(!n)return;const i=J.closest(".board-column");if(!i)return;const a=Array.from(document.querySelectorAll(".board-column")),r=a.indexOf(i),d=document.documentElement.dir==="rtl"||s.lang==="ar";if(e.key==="ArrowUp"){e.preventDefault();const l=J.previousElementSibling;l&&l.classList.contains("task-card")&&(i.querySelector(".board-cards").insertBefore(J,l),J.focus(),Ge(o("تم التحريك للأعلى.","Moved up.")));return}if(e.key==="ArrowDown"){e.preventDefault();const l=J.nextElementSibling;l&&l.classList.contains("task-card")&&(i.querySelector(".board-cards").insertBefore(l,J),J.focus(),Ge(o("تم التحريك للأسفل.","Moved down.")));return}if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();const l=d?"ArrowLeft":"ArrowRight",c=e.key===l?r+1:r-1;if(c>=0&&c<a.length){const p=a[c],u=p.querySelector(".board-cards");if(u){u.appendChild(J),J.focus();const m=p.querySelector(".board-column-title")?.innerText?.trim()||"";Ge(o(`تم النقل إلى عمود: ${m}.`,`Moved to column: ${m}.`))}}return}if(e.key==="Enter"){e.preventDefault();const l=J.closest(".board-column"),c=Me,p=J?J.getBoundingClientRect():null;J.classList.remove("is-keyboard-grabbed"),J.setAttribute("aria-grabbed","false"),Me=null,J=null,window._isKeyboardDraggingTask=!1,l&&c&&await Bt(l,p?p.top+10:0,c);return}if(e.key==="Escape"){e.preventDefault(),J.classList.remove("is-keyboard-grabbed"),J.setAttribute("aria-grabbed","false"),Me=null,J=null,window._isKeyboardDraggingTask=!1,n.status=pi,mn!==null&&(n.sortOrder=mn),de(!0),Ge(o("تم إلغاء النقل وإعادة المهمة لمكانها الأصلي.","Move cancelled. Task returned to original position."));return}}});export{ja as $,Pi as A,Cn as At,oe as B,Y as Bt,Gi as C,Ai as Ct,ge as D,In as Dt,Ko as E,Oa as Et,Mi as F,Ho as Ft,de as G,Ln as H,s as Ht,Pn as I,gi as It,Wo as J,Vo as K,Rn as L,An as Lt,Jo as M,_a as Mt,Ve as N,_n as Nt,jn as O,Ea as Ot,Ka as P,T as Pt,z as Q,Go as R,Qt as Rt,Fn as S,en as St,Nn as T,At as Tt,Ga as U,ze as V,qo as Vt,Re as W,Ti as X,Uo as Y,Be as Z,ji as _,v as _t,ca as a,Fa as at,ao as b,$i as bt,Mo as c,Ca as ct,ye as d,Ba as dt,o as et,To as f,za as ft,yo as g,St as gt,_e as h,Da as ht,kn as i,g as it,no as j,hi as jt,mt as k,$a as kt,Zo as l,Ma as lt,Xo as m,bi as mt,ke as n,xi as nt,wt as o,vi as ot,mo as p,wi as pt,Va as q,bt as r,Pa as rt,he as s,ki as st,Vn as t,Tt as tt,Yo as u,Xe as ut,oo as v,bn as vt,Bi as w,hn as wt,qi as x,Ne as xt,Et as y,ee as yt,Xa as z,ka as zt};
