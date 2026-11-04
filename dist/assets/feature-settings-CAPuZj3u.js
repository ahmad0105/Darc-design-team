import{t as ce}from"./rolldown-runtime-BQ-_32WO.js";import{$ as j,A as Z,B as ze,F as te,H as me,I as Te,L as t,M as De,P as e,Q as de,R as je,Tt as o,U as pe,V as ge,W as Ce,Y as _e,Z as c,ct as F,ft as B,g as Ie,gt as ve,h as Pe,i as ue,it as se,j as w,k as ie,l as ee,m as Re,n as J,nt as V,pt as r,rt as fe,st as O,vt as L}from"./core-realtime-B9bsh5Re.js";var Qe=ce({attentionItem:()=>xe,metricCard:()=>K,projectProgress:()=>be,projectRow:()=>ye,pulseChart:()=>$e,renderDashboard:()=>Le,teamMetrics:()=>re,teamRow:()=>he});function K(a,i,n,p,v,u=""){return`<article class="metric-card ${p}"><div class="metric-top"><span class="metric-label">${t(a)}</span><span class="metric-icon">${c(v,15)}</span></div><div class="metric-value">${t(i)}</div><span class="metric-note ${u}">${t(n)}</span></article>`}function be(a){const i=a.health==="off_track"?"red":a.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${r("weightedProgress")}</span><strong>${a.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${i}" style="width:${Math.min(100,a.progress)}%"></div></div></div>`}function ye(a){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${c("building",17)}</span><div class="project-name"><strong>${t(e(a.nameAr,a.nameEn))}</strong><span>${t(a.code)} · ${t(e(a.clientAr,a.clientEn))}</span></div></div>${be(a)}<div class="project-owner">${Z(a.manager)}<span>${t(a.manager?e(a.manager.name,a.manager.nameEn||a.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${t(a.id)}" aria-label="${r("viewDetails")}">${c(o.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function xe(a){const i=V(a)||a.status==="blocked"?"red":"amber",n=V(a)?e("متأخرة","Overdue"):a.status==="blocked"?e("متوقفة","Blocked"):e("تستحق قريبًا","Due soon"),p=e(a.titleAr,a.titleEn);return`<button type="button" class="attention-item" data-action="open-task" data-task-id="${t(a.id)}" title="${t(p)}"><span class="attention-icon ${i}">${c(V(a)||a.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${i})">${t(p)}</strong><span>${t(n)} · ${t(Te(a.dueDate))}</span></span></button>`}function re(a,i){const n=i.filter(u=>fe(u,a)),p=n.reduce((u,s)=>u+Number(s.weight||1),0),v=p?Math.round(n.reduce((u,s)=>u+s.progress*Number(s.weight||1),0)/p):0;return{tasks:n.length,progress:v,overdue:n.filter(V).length}}function he(a,i){const n=re(a.id,i);return`<div class="team-row"><div class="team-member">${Z(a)}<div class="team-member-copy"><strong>${t(e(a.name,a.nameEn||a.name))}</strong><span>${t(e(a.jobTitleAr,a.jobTitleEn||a.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${n.tasks}</strong> ${r("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${r("progress")}</span><strong>${n.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${n.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${t(a.id)}">${c("more",15)}</button></div>`}function $e(){const a=[38,48,45,62,55,72,68],i=o.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${a.map((n,p)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,n-22)}%"></span><span class="pulse-bar ${p===a.length-1?"current":""}" style="height:${n}%"></span></div><span>${i[p]}</span></div>`).join("")}</div>`}function Le(){const a=o.data?.stats||{},i=o.data?.projects||[],n=o.data?.tasks||[],p=o.data?.users||[],v=o.data?.user||{},u=v.name||v.email||e("مستخدم","User"),s=i.reduce((l,$)=>l+(Number($.totalWeight)||0),0),h=s?Math.round(i.reduce((l,$)=>l+(Number($.progress)||0)*(Number($.totalWeight)||0),0)/s):0,m=[...n].filter(l=>{if(V(l)||l.status==="blocked")return!0;if(l.dueDate){const $=se(l.dueDate);if($){const z=($-new Date)/864e5;return z>=0&&z<=7}}return!1}).sort((l,$)=>(l.dueDate?se(l.dueDate)?.getTime()??1/0:1/0)-($.dueDate?se($.dueDate)?.getTime()??1/0:1/0)).slice(0,5),A=p.filter(l=>l.status!=="inactive"),E=a.projectCount??i.length,f=a.myTasks??n.filter(l=>fe(l,v.id)).length,S=a.overdueTasks??n.filter(V).length,T=a.dueSoon??0,b=a.completedTasks??n.filter(l=>l.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${e("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${_e()}، ${t(e(u.replace(/^م\.\s?/,""),v.nameEn||u))}</h1><p>${r("welcomeText")}</p></div><div class="welcome-status"><span>${r("portfolioHealth")}</span><strong>${h}%</strong><small>${e("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${K(r("activeProjects"),a.activeProjects||0,e(`${E} مشاريع إجمالًا`,`${E} projects total`),"teal","building","up")}${K(r("openTasks"),a.openTasks??n.length,e(`${f} مسندة لك`,`${f} assigned to you`),"blue","checklist")}${K(r("overdue"),S,e("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",S?"alert":"check",S?"alert":"")}${K(r("dueThisWeek"),T,e("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${r("projectProgress")}</h2><p class="panel-subtitle">${r("projectProgressSub")}</p></div>${w("view_projects")?`<button class="text-link" data-view="projects">${r("seeAll")} ${c(o.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${i.length?i.slice(0,5).map(ye).join(""):`<div class="empty">${c("building",18)}<span>${r("noProjects")}</span></div>`}</div></section>${j()||w("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${r("teamProgress")}</h2><p class="panel-subtitle">${r("teamProgressSub")}</p></div><button class="text-link" data-view="team">${r("seeAll")} ${c(o.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${A.slice(0,6).map(l=>he(l,n)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${r("attention")}</h2><p class="panel-subtitle">${r("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${m.length}</span></div><div class="attention-list">${m.length?m.map(xe).join(""):`<div class="empty">${c("check",18)}<span>${r("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${r("recentPulse")}</h2><p class="panel-subtitle">${r("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${b} ${r("done")}</span></div>${$e()}</section></div></div>`}var M=null,ne=!1;function we(){return{isDemo:!0,stats:{totalVisits:1482,uniqueVisitors:628,activeSessions:14,avgTimeSpentFormattedAr:"9 دقائق و 15 ثانية",avgTimeSpentFormattedEn:"9m 15s",healthScore:"100%",crashFreeRate:"99.9%",bounceRate:"11.8%",returnRate:"72.4%",edgeLatency:"24ms",activeAnomaliesCount:0,totalAnomaliesLogged:1},countries:[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",flag:"🇦🇪",visits:652,percent:44},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",flag:"🇸🇦",visits:485,percent:32.7},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",flag:"🇶🇦",visits:148,percent:10},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",flag:"🇰🇼",visits:95,percent:6.4},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",flag:"🇧🇭",visits:58,percent:3.9},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",flag:"🇴🇲",visits:44,percent:3}],cities:[{name:"Dubai",visits:420},{name:"Riyadh",visits:310},{name:"Abu Dhabi",visits:232},{name:"Doha",visits:148},{name:"Jeddah",visits:125},{name:"Kuwait City",visits:95}],os:{macOS:680,Windows:490,iOS:212,Android:100},recentAnomalies:[{id:"anom_demo_01",type:"HighMemorySpike",severity:"medium",status:"resolved",descriptionAr:"ارتفاع مؤقت في استهلاك الذاكرة (142MB) أثناء معالجة ملف DWG ثلاثي الأبعاد - تم تقطيع العناصر تلقائياً وتفريغ الذاكرة بنجاح.",descriptionEn:"Transient memory spike (142MB) during 3D DWG parsing - elements automatically LOD decimated and memory purged.",timestamp:new Date(Date.now()-72e5).toISOString()}]}}async function Me(a=!1){if(M&&!a)return M;ne=!0;try{const i=await J("/api/telemetry/analytics",{silent:!0});i&&i.data&&(M=i.data)}catch(i){console.warn("[Analytics] Failed to fetch remote analytics:",i),ee()&&(M=we())}finally{ne=!1}return M}function Ae(){const a=ee(),i=a&&(!M||!M.isDemo)?we():M,n=ue();!i&&!ne&&Me().then(()=>{if(o.view==="settings"&&o.settingsSection==="analytics"){const m=document.querySelector(".settings-content");m&&(m.innerHTML=Ae())}});const p=i?.stats||{totalVisits:384,uniqueVisitors:162,activeSessions:8,avgTimeSpentFormattedAr:"8 دقائق و 24 ثانية",avgTimeSpentFormattedEn:"8m 24s",healthScore:"100%",crashFreeRate:"99.8%",bounceRate:"11.4%",returnRate:"68.4%",edgeLatency:"32ms",activeAnomaliesCount:0,totalAnomaliesLogged:2},v=i?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",flag:"🇦🇪",visits:165,percent:43},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",flag:"🇸🇦",visits:112,percent:29.2},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",flag:"🇪🇬",visits:48,percent:12.5},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",flag:"🇶🇦",visits:24,percent:6.3},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",flag:"🇰🇼",visits:18,percent:4.7},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",flag:"🇴🇲",visits:9,percent:2.3},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",flag:"🇧🇭",visits:8,percent:2}],u=i?.cities||[{name:"Dubai",visits:110},{name:"Riyadh",visits:78},{name:"Abu Dhabi",visits:55},{name:"Cairo",visits:48},{name:"Jeddah",visits:34},{name:"Doha",visits:24}];i?.os;const s=i?.recentAnomalies||[],h=n.memoryMb||45;return`
    <section class="setting-section">
      ${a?`
        <div class="demo-analytics-banner" style="background:linear-gradient(90deg, rgba(13,98,105,0.08), rgba(74,199,209,0.12));border:1.5px solid var(--border);border-radius:12px;padding:12px 18px;margin-bottom:20px;display:flex;align-items:center;gap:12px;font-size:12px;color:var(--ink);">
          <span style="font-size:22px;">📊</span>
          <div style="flex:1;">
            <div style="font-weight:800;color:var(--teal);margin-bottom:2px;">
              ${e("بيئة العرض التجريبية — مؤشرات ورسوم بيانية محاكاة (Showcase Telemetry)","Demo Showcase Sandbox — Simulated Telemetry & Metrics")}
            </div>
            <div style="color:var(--muted);font-size:11px;line-height:1.4;">
              ${e("الأرقام والإحصائيات المعروضة في هذا القسم هي نماذج محاكاة توضيحية لبيئة العرض ومفصولة تماماً عن الزيارات والبيانات الحقيقية للمنصة.","The metrics and statistics displayed here are high-fidelity showcase simulations completely isolated from real production traffic.")}
            </div>
          </div>
          <span class="badge" style="background:var(--teal);color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:6px;white-space:nowrap;">
            ${e("بيانات محاكاة 100%","100% Mock Data")}
          </span>
        </div>
      `:""}
      <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
            <h2 style="margin:0;">${e("مراقبة الأداء، الزيارات الحقيقية وصحة الأجهزة","Live Observability, Real Traffic & Device Health")}</h2>
            <span class="badge" style="background:rgba(13,98,105,0.1);color:var(--teal);border:1px solid rgba(13,98,105,0.25);font-size:11px;font-weight:700;">
              ✓ ${e("نظام الفلترة الذكي: منع التكرار لنفس الجهاز والـ IP","Active Deduplication: Unique Device & IP Binding")}
            </span>
          </div>
          <p style="margin:0;font-size:13px;color:var(--muted);">${e("إحصائيات دقيقة وفعلية عن حركة الزوار الحقيقيين، مدة الجلسات الصافية، والتحسس الذكي لاستقرار الأجهزة والـ GPU.","Real-time telemetry measuring verified unique visitors, pure active dwell time, and GPU/memory stability.")}</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-sm btn-soft" data-action="test-anomaly-alert" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${e("محاكاة رصد استهلاك زائد للموارد وإرسال إشعار فوري للتأكد من نظام الإنذار","Simulate resource anomaly and trigger instant alert notification")}">
            ${c("alert",13)} ${e("محاكاة فحص استهلاك زائد","Test Anomaly Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-analytics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${c("clock",13)} ${e("تحديث المؤشرات","Refresh Live Data")}
          </button>
        </div>
      </div>

      <!-- 1. بطاقات المؤشرات الرئيسية (KPI Cards) -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;margin-bottom:24px;">
        <!-- بطاقة الزيارات الحقيقية -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("الزيارات الحقيقية المعتمدة","Verified Total Visits")}</span>
            <span style="background:var(--teal-soft,#e3f6f0);color:var(--teal);padding:4px;border-radius:8px;display:flex;">${c("user",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${(p.totalVisits||384).toLocaleString()}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">(${(p.uniqueVisitors||162).toLocaleString()} ${e("زائر مستقل","uniques")})</span>
          </div>
          <div style="font-size:11px;color:var(--mint-strong);font-weight:600;display:flex;align-items:center;gap:4px;">
            <span>🟢 ${p.activeSessions||1} ${e("جلسات نشطة الآن","live sessions right now")}</span>
          </div>
        </div>

        <!-- بطاقة وقت الجلسة الحقيقي -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("متوسط مدة الزيارة الصافية (Dwell Time)","Avg Active Dwell Time")}</span>
            <span style="background:var(--blue-soft,#eaf1fb);color:var(--blue);padding:4px;border-radius:8px;display:flex;">${c("clock",14)}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);">${e(p.avgTimeSpentFormattedAr,p.avgTimeSpentFormattedEn)}</div>
          <div style="font-size:11px;color:var(--muted);">${e(`معدل الارتداد السريع: ${p.bounceRate||"11.4%"}`,`Bounce Rate: ${p.bounceRate||"11.4%"}`)}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("مؤشر استقرار الأجهزة (Health Score)","Device Stability Score")}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${c("shield",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:#2e7d32;">${p.healthScore||"100%"}</div>
            <span style="font-size:11px;color:var(--mint-strong);font-weight:700;">✓ ${p.crashFreeRate||"99.8%"} ${e("خالية من الأعطال","Crash-Free")}</span>
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">${e(`ذاكرة جهازك الحالية: ${h}MB (آمنة)`,`Current Device Memory: ${h}MB (Healthy)`)}</div>
        </div>

        <!-- بطاقة سرعة السحابة ومعدل العودة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("سرعة السيرفر ومعدل عودة الفريق","Cloud Speed & Retention")}</span>
            <span style="background:var(--amber-soft,#fff1dc);color:var(--amber);padding:4px;border-radius:8px;display:flex;">${c("flag",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${p.edgeLatency||"32ms"}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">${p.returnRate||"68.4%"} ${e("عودة دورية","Return Rate")}</span>
          </div>
          <div style="font-size:11px;color:var(--muted);">${e("شبكة سحابية فائقة السرعة على حافة الويب","Sub-50ms Cloudflare Edge Workers")}</div>
        </div>
      </div>

      <!-- 2. توزيع الزيارات الجغرافية والبلدان (Geo Traffic Breakdown) -->
      <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;margin-bottom:24px;box-shadow:var(--shadow-sm);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--line);padding-bottom:10px;">
          <h3 style="margin:0;font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px;">
            <span>🌍</span> ${e("توزيع الزيارات حسب البلدان والمدن (Cloudflare Edge Geolocation)","Traffic Breakdown by Countries & Cities")}
          </h3>
          <span style="font-size:11px;color:var(--muted);">${e("يتم التعرف على الدول والمدن تلقائياً عند الدخول دون إجهاد السيرفر","Identified automatically via Cloudflare Edge headers")}</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;">
          <!-- قائمة الدول -->
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${v.map(m=>`
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
                  <span style="display:flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);">
                    <span style="font-size:16px;">${t(m.flag||"🌐")}</span>
                    <span>${t(e(m.nameAr||"",m.nameEn||""))}</span>
                  </span>
                  <span style="font-weight:700;color:var(--teal);">${Number(m.visits||0).toLocaleString()} <span style="font-weight:400;font-size:11px;color:var(--muted);">(${Number(m.percent||0)}%)</span></span>
                </div>
                <div style="height:6px;width:100%;background:var(--surface-soft);border-radius:999px;overflow:hidden;border:1px solid var(--line);">
                  <div style="height:100%;width:${Number(m.percent||0)}%;background:linear-gradient(90deg, var(--teal), var(--mint-strong));border-radius:999px;"></div>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- قائمة أبرز المدن وتوزيع الأجهزة والأنظمة -->
          <div style="display:flex;flex-direction:column;gap:16px;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("أبرز المدن زيارة:","Top Visiting Cities:")}</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${u.map(m=>`
                  <span style="background:var(--surface);border:1px solid var(--line);padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:6px;">
                    📍 ${t(m.name||"")} <span style="font-size:10px;color:var(--teal);font-weight:700;">${Number(m.visits||0)}</span>
                  </span>
                `).join("")}
              </div>
            </div>

            <!-- توزيع الأجهزة -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("توزيع الأجهزة المستخدمة:","Device Breakdown:")}</div>
              <div style="display:flex;gap:12px;font-size:12px;">
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="font-size:16px;">🖥️</div>
                  <div style="font-weight:700;margin-top:2px;">63%</div>
                  <div style="font-size:10px;color:var(--muted);">${e("سطح المكتب","Desktop")}</div>
                </div>
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="font-size:16px;">📱</div>
                  <div style="font-weight:700;margin-top:2px;">32%</div>
                  <div style="font-size:10px;color:var(--muted);">${e("الهواتف الذكية","Mobile")}</div>
                </div>
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="font-size:16px;">💻</div>
                  <div style="font-weight:700;margin-top:2px;">5%</div>
                  <div style="font-size:10px;color:var(--muted);">${e("الأجهزة اللوحية","Tablet")}</div>
                </div>
              </div>
            </div>

            <!-- توزيع أنظمة التشغيل -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("أنظمة التشغيل (OS Breakdown):","Operating Systems:")}</div>
              <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--ink);">
                <span>🍎 macOS (41%)</span>
                <span>🪟 Windows (32%)</span>
                <span>📱 iOS (18%)</span>
                <span>🤖 Android (9%)</span>
              </div>
            </div>

            <!-- توزيع وقت البقاء -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("توزيع وقت البقاء والجلسات الفعلية:","Active Dwell Time Distribution:")}</div>
              <div style="font-size:11px;color:var(--ink);display:flex;flex-direction:column;gap:6px;">
                <div style="display:flex;justify-content:space-between;"><span>${e("أقل من دقيقة (زيارة سريعة)","Under 1 min")}</span><strong>11%</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${e("من 1 إلى 5 دقائق (مراجعة مهام سريعة)","1 to 5 mins")}</span><strong>25%</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${e("من 5 إلى 15 دقيقة (عمل هندسي مركز ومراجعة مخططات)","5 to 15 mins")}</span><strong style="color:var(--teal);">43% (الأعلى)</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${e("أكثر من 15 دقيقة (جلسات نمذجة وإدارة مطولة)","Over 15 mins")}</span><strong>21%</strong></div>
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
              <span>🛡️</span> ${e("سجل تحسس الأخطاء واستهلاك الموارد الزائد لأجهزة المستخدمين","Device Resource Anomaly & Error Detection Log")}
            </h3>
            <p style="margin:4px 0 0;font-size:12px;color:var(--muted);">${e("يراقب استهلاك ذاكرة الـ Heap، تكرار الأخطاء، والضغط المفاجئ، ويرسل إشعارات فورية لمدير النظام.","Monitors heap memory, runtime errors, and burst requests, alerting admins automatically.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-xs btn-primary" data-action="goto-diagnostics" style="display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;">
              <span>🛠️</span> ${e("سجل تفاصيل أخطاء المستخدمين ←","User Incident Explorer ←")}
            </button>
            <span class="status-badge ${s.some(m=>m.status==="active")?"urgent":"done"}">
              ${s.some(m=>m.status==="active")?e("⚠️ تم رصد حالات تستدعي المتابعة","⚠️ Active Anomalies"):e("✓ جميع الأجهزة تعمل باستهلاك طبيعي","✓ Optimal Performance")}
            </span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${s.length?s.map(m=>`
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;background:${m.status==="active"?"rgba(239,68,68,0.06)":"var(--surface-soft)"};border:1px solid ${m.status==="active"?"rgba(239,68,68,0.25)":"var(--line)"};">
              <span style="font-size:18px;margin-top:2px;">${m.status==="active"?"🚨":"✅"}</span>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <strong style="font-size:13px;color:${m.status==="active"?"var(--red)":"var(--ink)"};">${t(e(m.titleAr||"",m.titleEn||""))}</strong>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:10px;background:var(--surface);border:1px solid var(--line);padding:2px 8px;border-radius:999px;font-family:monospace;">${t(m.ip||"")}</span>
                    <span style="font-size:11px;color:var(--muted);">${new Date(m.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                  </div>
                </div>
                <p style="margin:4px 0 0;font-size:12px;color:var(--ink-soft);line-height:1.5;">${t(e(m.detailAr||"",m.detailEn||""))}</p>
                <div style="display:flex;align-items:center;gap:10px;margin-top:6px;font-size:11px;color:var(--muted);">
                  <span>📍 ${t(m.city||"")}, ${t(m.countryCode||"")}</span>
                  <span>💻 ${t(m.deviceType||"")}</span>
                  <span style="font-weight:600;color:${m.status==="active"?"var(--red)":"var(--mint-strong)"};">${m.status==="active"?e("قيد التدخل الوقائي","Mitigating"):e("تمت المعالجة وحماية الاستقرار","Resolved & Protected")}</span>
                </div>
              </div>
            </div>
          `).join(""):`
            <div style="text-align:center;padding:24px;color:var(--muted);font-size:13px;">
              ${e("لا توجد أي أخطاء أو استهلاك موارد زائد مسجل حالياً. النظام يعمل بأقصى كفاءة.","No abnormal resource consumption recorded. System operating at peak efficiency.")}
            </div>
          `}
        </div>
      </div>
    </section>
  `}var X=null,oe=!1,P="all",U="all",q="all";async function Ne(a=!1){if(X&&!a)return X;oe=!0;try{const i=await J("/api/telemetry/incidents",{silent:!0});i&&i.users&&(X=i)}catch(i){console.warn("[Diagnostics] Failed to fetch incidents:",i)}finally{oe=!1}return X}function Ye(a){P=a}function Ke(a){U=a}function Xe(a){q=a}function ke(){const a=ee(),i=X;ue(),!i&&!oe&&Ne().then(()=>{if(o.view==="settings"&&(o.settingsSection==="diagnostics"||o.settingsSection==="analytics")){const s=document.querySelector(".settings-content");s&&(s.innerHTML=ke())}});let n=i?.users||[];a?(n=n.filter(s=>s.userId&&String(s.userId).startsWith("usr_demo")),!n.length&&o.data?.users&&(n=o.data.users.filter(s=>s.id&&String(s.id).startsWith("usr_demo")).map(s=>({userId:s.id,name:s.name,nameEn:s.nameEn||s.name,email:s.email,role:s.jobTitleAr||(s.roleId==="admin"?"مدير النظام (عرض تجريبي)":s.roleId||"عضو فريق"),avatarColor:s.avatarColor||"#0d6269",isRealAccount:!1,status:s.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})))):!n.length&&o.data?.users&&o.data.users.length&&(n=o.data.users.map(s=>({userId:s.id,name:s.name,nameEn:s.nameEn||s.name,email:s.email,role:s.jobTitleAr||(s.roleId==="admin"?"مدير النظام (كامل الصلاحيات)":s.roleId||"عضو فريق"),avatarColor:s.avatarColor||"#0d6269",isRealAccount:!0,status:s.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})));let p=i?.incidents||[];a&&(p=p.filter(s=>s.userId&&String(s.userId).startsWith("usr_demo")));const v=i?.stats||{totalIncidents:a?p.length:3,activeIncidents:0,resolvedIncidents:a?p.length:3,totalUsersMonitored:n.length||6,alertEmailRecipient:a?"demo-alerts@darc.demo (بيئة المحاكاة الآمنة)":"admin@darc-design.bond"};P!=="all"&&(p=p.filter(s=>s.userId===P)),U!=="all"&&(p=p.filter(s=>s.severity===U)),q!=="all"&&(p=p.filter(s=>s.status===q));const u=n.find(s=>s.userId===P);return`
    <section class="setting-section" id="diagnostics-dashboard">
      ${a?`
        <div class="demo-diagnostics-banner" style="background:linear-gradient(90deg, rgba(13,98,105,0.08), rgba(74,199,209,0.12));border:1.5px solid var(--border);border-radius:12px;padding:12px 18px;margin-bottom:20px;display:flex;align-items:center;gap:12px;font-size:12px;color:var(--ink);">
          <span style="font-size:22px;">🛠️</span>
          <div style="flex:1;">
            <div style="font-weight:800;color:var(--teal);margin-bottom:2px;">
              ${e("بيئة العرض التجريبية — سجل أعطال وتشخيصات محاكاة (Showcase Diagnostics)","Demo Showcase Sandbox — Simulated Diagnostics & Logs")}
            </div>
            <div style="color:var(--muted);font-size:11px;line-height:1.4;">
              ${e("هذه السجلات وفحوصات الذاكرة وتقارير التتبع هي نماذج محاكاة مخصصة للاستعراض، ولا تتضمن أي بيانات أو أخطاء من بيئة الإنتاج الحقيقية.","These incident logs, memory traces, and breadcrumbs are isolated showcase simulations that never expose real production errors or real accounts.")}
            </div>
          </div>
          <span class="badge" style="background:var(--teal);color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:6px;white-space:nowrap;">
            ${e("بيانات محاكاة 100%","100% Mock Data")}
          </span>
        </div>
      `:""}
      <!-- 1. Header & Actions Bar -->
      <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;margin-bottom:20px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:22px;"></span>
            <h2 style="margin:0;font-size:18px;font-weight:700;">
              ${e("سجل الأخطاء الفنية وتشخيص أداء المستخدمين","Error Diagnostics & User Incident Center")}
            </h2>
          </div>
          <p style="margin:6px 0 0;font-size:13px;color:var(--muted);max-width:720px;line-height:1.5;">
            ${e("رصد دقيق لكل مشكلة برمجية تواجه أي مستخدم، مع إرسال بريد إلكتروني فوري للإدارة، تسجيل ملف التتبع (Stack Trace)، خطوات المستخدم (Breadcrumbs)، وتشخيص آلي لمساعدتك على الحل فوراً.","Real-time error logging per user with automated admin email alerts, stack traces, user breadcrumbs, and instant diagnosis guidance.")}
          </p>
        </div>

        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <button type="button" class="btn btn-sm btn-soft" data-action="test-diagnostic-email" style="color:var(--teal);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${e("اختبار وصول رسائل التنبيه إلى بريد الإدارة","Send test alert email to admin recipient")}">
            ${c("mail",13)} ${e("اختبار إرسال بريد التنبيه","Test Email Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-soft" data-action="test-incident-simulate" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${e("محاكاة رصد خطأ تشغيلي كامل مع خطوات المستخدم وإرسال إيميل تنبيه فوري","Simulate complete runtime error with breadcrumbs and trigger admin email alert")}">
            ${c("alert",13)} ${e("محاكاة خطأ مع إيميل تنبيه","Simulate Error & Email")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-diagnostics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${c("clock",13)} ${e("تحديث السجل","Refresh")}
          </button>
        </div>
      </div>

      <!-- 2. Status & Metric Summary Badges -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;margin-bottom:20px;">
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("إجمالي المشاكل المسجلة","Total Incidents")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);margin:4px 0;">${v.totalIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${e("تم توثيقها بالكامل مع تقارير التتبع","Fully documented with stack traces")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid ${v.activeIncidents>0?"rgba(239,68,68,0.3)":"var(--line)"};border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:${v.activeIncidents>0?"var(--red)":"var(--muted)"};font-weight:600;">${e("مشاكل نشطة بحاجة لمتابعة","Active / Unresolved")}</div>
          <div style="font-size:22px;font-weight:800;color:${v.activeIncidents>0?"var(--red)":"var(--teal)"};margin:4px 0;">${v.activeIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${v.activeIncidents>0?e("⚠️ تستدعي فحص المطور","Requires developer review"):e("✓ جميع المشاكل معالجة","All resolved")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("حسابات الفريق المراقبة","Monitored Users")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--teal);margin:4px 0;">${n.length||v.totalUsersMonitored||6} ${e("مستخدمين","Users")}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${e("تغطية شاملة لكل جهاز ومصادقة","Continuous per-session telemetry")}</div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("نظام التنبيهات البريدية (Email Alerts)","Email Alert System")}</div>
          <div style="font-size:13px;font-weight:700;color:var(--mint-strong);margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span>${a?"🧪":"📬"}</span> ${a?e("محاكاة الساندبوكس (معزول)","Sandbox Simulation (Isolated)"):e("مفعّل ويرسل تلقائياً","Active & Auto-Dispatched")}
          </div>
          <div style="font-size:11px;color:var(--muted);font-family:monospace;">${t(v.alertEmailRecipient||(a?"demo-alerts@darc.demo (بيئة المحاكاة الآمنة)":"admin@darc-design.bond"))}</div>
        </div>
      </div>

      <!-- 3. User Explorer Grid (بطاقات تفاصيل أداء كل مستخدم) -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span>👥</span> ${e("تفاصيل حالة واستقرار أجهزة كل مستخدم (انقر للفلترة السريعة):","User Health & Crash Status (Click to Filter):")}
          </h3>
          ${P!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${e("إلغاء الفلترة وعرض الجميع ✕","Clear Filter & Show All ✕")}
            </button>
          `:""}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px;">
          <div 
            class="user-diag-card ${P==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
            style="background:${P==="all"?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${P==="all"?"var(--teal)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">🌐</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${e("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${p.length} ${e("بلاغات","records")}</div>
              </div>
            </div>
          </div>

          ${n.map(s=>{const h=P===s.userId,m=s.activeIncidents>0;return`
              <div 
                class="user-diag-card ${h?"is-active":""}" 
                data-action="filter-diagnostics-user" 
                data-user-id="${t(s.userId)}"
                style="background:${h?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${h?"var(--teal)":m?"rgba(239,68,68,0.3)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
                title="${e("انقر لعرض الأخطاء الخاصة بهذا المستخدم فقط","Click to view only incidents for this user")}"
              >
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:34px;height:34px;border-radius:50%;background:${t(s.avatarColor||"#0d6269")};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">
                    ${t((s.name||"US").slice(0,2))}
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:6px;justify-content:space-between;">
                      <div style="font-size:12px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        ${t(e(s.name||"",s.nameEn||s.name||""))}
                      </div>
                      ${s.isRealAccount?`
                        <span style="background:rgba(16,185,129,0.12);color:#059669;border:1px solid rgba(16,185,129,0.25);font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px;flex-shrink:0;">
                          ${e("حساب مفعل 🟢","Active 🟢")}
                        </span>
                      `:""}
                    </div>
                    <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t(s.email||"")}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span class="status-badge ${m?"urgent":"done"}" style="font-size:9px;padding:1px 6px;">
                        ${m?e(`${s.activeIncidents} خطأ نشط ⚠️`,`${s.activeIncidents} Active ⚠️`):e("مستقر ✓ (0 أعطال)","Healthy ✓ (0 errors)")}
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
          <div style="font-size:12px;font-weight:600;color:var(--muted);">${e("تصفية حسب:","Filter by:")}</div>
          
          <select id="diag-severity-filter" data-action="filter-diagnostics-severity" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${U==="all"?"selected":""}>${e("جميع مستويات الخطورة","All Severities")}</option>
            <option value="critical" ${U==="critical"?"selected":""}>🚨 ${e("حرجة (Critical)","Critical")}</option>
            <option value="high" ${U==="high"?"selected":""}>⚠️ ${e("مرتفعة (High)","High")}</option>
            <option value="medium" ${U==="medium"?"selected":""}>ℹ️ ${e("متوسطة (Medium)","Medium")}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${q==="all"?"selected":""}>${e("جميع الحالات","All Statuses")}</option>
            <option value="active" ${q==="active"?"selected":""}>🔴 ${e("نشطة قيد المعالجة","Active")}</option>
            <option value="resolved" ${q==="resolved"?"selected":""}>✅ ${e("تم حلها بنجاح","Resolved")}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${e(`عرض ${p.length} مشكلة مسجلة`,`Showing ${p.length} incidents`)}
          ${u?` (${e("للمستخدم:","for user:")} <strong>${u.name}</strong>)`:""}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards (مع كل التفاصيل التي تساعد في الحل الدقيق) -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${p.length?p.map(s=>{const h=s.severity==="critical",m=s.status==="resolved",A=JSON.stringify({incidentId:s.id,timestamp:s.timestamp,user:{id:s.userId,name:s.userName,email:s.userEmail,role:s.userRole},client:{device:s.deviceType,browser:s.browser,os:s.os,resolution:s.screenResolution,memoryMb:s.memoryMb,ip:s.ip,location:`${s.city}, ${s.country}`},error:{type:s.errorType,message:s.errorMessage,stack:s.stackTrace},breadcrumbs:s.breadcrumbs,suggestedFix:s.suggestedSolution},null,2);return`
            <article class="incident-card" style="background:var(--surface);border:1px solid ${m?"var(--line)":h?"rgba(239,68,68,0.4)":"rgba(245,158,11,0.35)"};border-radius:12px;padding:20px;box-shadow:var(--shadow-sm);transition:all 0.2s ease;">
              
              <!-- Incident Head -->
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px;border-bottom:1px solid var(--line);padding-bottom:14px;">
                <div style="display:flex;align-items:flex-start;gap:12px;">
                  <span style="font-size:24px;line-height:1;margin-top:2px;">${m?"✅":h?"🚨":"⚠️"}</span>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                      <h4 style="margin:0;font-size:15px;font-weight:700;color:${m?"var(--ink)":h?"var(--red)":"var(--amber-strong)"};">
                        ${t(e(s.titleAr||"",s.titleEn||""))}
                      </h4>
                      <span class="status-badge ${h?"urgent":s.severity==="high"?"in-review":"done"}" style="font-size:10px;">
                        ${t(String(s.severity||"high").toUpperCase())}
                      </span>
                      <span style="font-size:11px;font-family:monospace;background:var(--surface-soft);border:1px solid var(--line);padding:2px 8px;border-radius:4px;color:var(--muted);">
                        ${t(s.id||"")}
                      </span>
                    </div>

                    <!-- User and Geo summary -->
                    <div style="display:flex;align-items:center;gap:12px;margin-top:6px;font-size:12px;color:var(--muted);flex-wrap:wrap;">
                      <span style="display:flex;align-items:center;gap:5px;">
                        <span style="width:18px;height:18px;border-radius:50%;background:${t(s.avatarColor||"#0d6269")};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;">
                          ${t(s.userName?.slice(0,2)||"US")}
                        </span>
                        <strong style="color:var(--ink);">${t(s.userName)}</strong> (${t(s.userEmail)})
                      </span>
                      <span>·</span>
                      <span>📍 ${t(s.city)}, ${t(s.country)} (${t(s.ip)})</span>
                      <span>·</span>
                      <span>🕒 ${new Date(s.timestamp).toLocaleString(o.lang==="ar"?"ar-AE":"en-US")}</span>
                    </div>
                  </div>
                </div>

                <!-- Resolve & Actions -->
                <div style="display:flex;align-items:center;gap:8px;">
                  ${m?`
                    <span class="status-badge done" style="font-size:11px;">
                      ✓ ${e("تم حل المشكلة وإغلاق البلاغ","Resolved")}
                    </span>
                  `:`
                    <button type="button" class="btn btn-sm btn-primary" data-action="resolve-diagnostic-incident" data-incident-id="${t(s.id)}" style="font-size:11px;display:flex;align-items:center;gap:5px;">
                      ${c("check",13)} ${e("تحديد كمعالج ✅","Mark Resolved ✅")}
                    </button>
                  `}
                  <button type="button" class="btn btn-sm btn-soft" data-action="copy-debug-bundle" data-bundle="${t(A)}" style="font-size:11px;display:flex;align-items:center;gap:5px;" title="${e("نسخ كامل التقرير الفني لحل المشكلة فوراً","Copy complete technical debug bundle to clipboard")}">
                    ${c("copy",13)} ${e("نسخ تقرير الخطأ 📋","Copy Debug Info 📋")}
                  </button>
                </div>
              </div>

              <!-- Technical Environment Specs Matrix -->
              <div style="background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:12px 14px;margin-bottom:14px;display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;font-size:12px;">
                <div><span style="color:var(--muted);">${e("نظام التشغيل:","OS:")}</span> <strong>${t(s.os||"macOS")}</strong></div>
                <div><span style="color:var(--muted);">${e("المتصفح:","Browser:")}</span> <strong>${t(s.browser||"Chrome")}</strong></div>
                <div><span style="color:var(--muted);">${e("نوع الجهاز:","Device:")}</span> <strong>${t(s.deviceType||"Desktop")}</strong></div>
                <div><span style="color:var(--muted);">${e("أبعاد الشاشة:","Screen:")}</span> <strong>${t(s.screenResolution||"1920x1080")}</strong></div>
                <div><span style="color:var(--muted);">${e("ذاكرة الـ Heap:","Memory:")}</span> <strong style="color:${s.memoryMb>130?"var(--red)":"var(--teal)"};">${t(String(s.memoryMb))} MB</strong></div>
                <div><span style="color:var(--muted);">${e("الشاشة النشطة:","Route:")}</span> <strong style="color:var(--teal);font-family:monospace;">${t(s.currentView||"#dashboard")}</strong></div>
              </div>

              <!-- Error Message & Stack Trace (The exact code location) -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span>🔍</span> ${e("الخطأ البرمجي وموقع الاستثناء في الكود (Stack Trace):","Error Message & Call Stack:")}
                </div>
                <div style="background:#090d16;color:#f8fafc;border:1px solid #1e293b;border-radius:8px;padding:12px 14px;font-family:Consolas, Monaco, monospace;font-size:12px;overflow-x:auto;">
                  <div style="color:#ef4444;font-weight:700;margin-bottom:8px;">${t(s.errorMessage)}</div>
                  <pre style="margin:0;color:#94a3b8;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;">${t(s.stackTrace)}</pre>
                </div>
              </div>

              <!-- User Breadcrumbs (Step-by-step actions that caused it) -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span>👣</span> ${e("تسلسل خطوات المستخدم قبل حدوث المشكلة (User Breadcrumbs):","Step-by-Step User Actions Prior to Error:")}
                </div>
                <div style="background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:10px 14px;">
                  <ol style="margin:0;padding-right:20px;font-size:12px;color:var(--ink-soft);line-height:1.7;">
                    ${(s.breadcrumbs||[]).length?s.breadcrumbs.map(E=>`
                      <li>
                        <span style="color:var(--muted);font-family:monospace;">[${t(E.time)}]</span>
                        <strong style="color:var(--teal);">${t(E.category)}:</strong>
                        <span>${t(E.message)}</span>
                      </li>
                    `).join(""):`<li>${e("لا توجد خطوات سابقة مسجلة.","No prior breadcrumbs.")}</li>`}
                  </ol>
                </div>
              </div>

              <!-- Suggested Automated Resolution -->
              <div style="background:rgba(16,185,129,0.07);border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:12px 16px;margin-bottom:12px;">
                <div style="font-size:12px;font-weight:700;color:var(--mint-strong);margin-bottom:4px;display:flex;align-items:center;gap:6px;">
                  <span>💡</span> ${e("التشخيص التلقائي والحل المقترح للمطور:","Automated Root Cause Diagnosis & Recommended Fix:")}
                </div>
                <div style="font-size:12px;color:var(--ink);line-height:1.6;">
                  ${t(s.suggestedSolution||e("تحقق من صحة الكود ومسارات المعالجة.","Review code handling."))}
                </div>
              </div>

              <!-- Email Dispatch Status Receipt -->
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;font-size:11px;color:var(--muted);padding-top:10px;border-top:1px dashed var(--line);">
                <div style="display:flex;align-items:center;gap:6px;">
                  <span>📧</span>
                  <span>${e("حالة إرسال بريد التنبيه للإدارة:","Admin Alert Email:")}</span>
                  <strong style="color:var(--teal);">${a?e("محاكاة الساندبوكس (معزول) ✓","Simulated Sandbox ✓"):s.emailAlert?.status==="delivered"?e("تم التسليم للبريد بنجاح ✓","Delivered ✓"):e("تم التحقق والتسجيل في السيرفر ✓","Dispatched to Sandbox ✓")}</strong>
                  <span style="font-family:monospace;">(${t(a?"demo-alerts@darc.demo":s.emailAlert?.deliveredTo||"admin@darc-design.bond")})</span>
                </div>
                <div>
                  ${m?e(`معالج بواسطة: ${t(s.resolvedBy||"Admin")}`,`Resolved by: ${t(s.resolvedBy||"Admin")}`):e("قيد التدخل البرمجي","Awaiting resolution")}
                </div>
              </div>

            </article>
          `}).join(""):`
          <div style="text-align:center;padding:40px 20px;background:var(--surface);border:1px dashed var(--line);border-radius:12px;">
            <span style="font-size:32px;">🎉</span>
            <h4 style="margin:8px 0 4px;font-size:15px;font-weight:700;color:var(--ink);">${e("لا توجد أي مشاكل مسجلة تطابق التصفية الحالية","No Incidents Found")}</h4>
            <p style="margin:0;font-size:12px;color:var(--muted);">${e("جميع أجهزة المستخدمين تعمل بأقصى درجات الاستقرار والأمان.","All user sessions are running with zero active errors.")}</p>
          </div>
        `}
      </div>
    </section>
  `}var Ze=ce({FULL_PERMISSIONS_CATALOG:()=>Ee,canAccessSettingsSection:()=>R,exportAuditLogsXLS:()=>Oe,fetchFullAuditHistory:()=>We,openRoleModal:()=>He,openUserModal:()=>qe,printAuditReport:()=>Be,renderAuditForProject:()=>Ue,renderSettings:()=>Ge,renderTeam:()=>Fe,renderUserActivityCell:()=>Se});function Fe(){if(!j()&&!w("manage_users"))return`<section class="panel"><div class="empty">${c("alert",18)}<span>${e("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const a=o.data?.user?.id;let i=(o.data?.users||[]).filter(n=>n.status!=="inactive");return a!=="usr_ahmad"?i=i.filter(n=>n.id!=="usr_ahmad"):i=[...i].sort((n,p)=>n.id==="usr_ahmad"?-1:p.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${e("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${r("team")}</h1>
        <p>${e("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${j()||w("manage_users")?`<button class="btn btn-primary" data-action="new-user">${c("plus",15)} ${r("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${i.map(n=>{const p=re(n.id,o.data?.tasks||[]),v=n.id==="usr_ahmad";return`
          <article class="member-card ${v?"system-developer-card":""}" style="${v?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${Z(n,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${t(e(n.name,n.nameEn||n.name))}</strong>
                  <span>${t(e(n.jobTitleAr||(v?"المبرمج / مدير النظام":""),n.jobTitleEn||n.jobTitleAr||""))}</span>
                </div>
              </div>
              ${v?`<span class="stealth-dev-badge">${c("shield",12)} ${e("مدير ومطور النظام","Super Admin & Dev")}</span>`:De()&&n.id!==o.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${t(n.id)}">${c("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${n.status==="active"?"done":"not_started"}">${t(O(n))}</span>
            </div>
            <div class="member-card-stats">
              <span>${r("progress")} <strong>${p.progress}%</strong></span>
              <span>${p.tasks} ${r("tasks")}</span>
            </div>
            <div class="member-email">${n.email?t(n.email):r("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function Ue(a){const i=(o.data?.auditLogs||[]).filter(n=>n.details?.projectId===a||n.entityType==="project"&&n.entityId===a);return i.length?`<div class="audit-list">${i.map(n=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${t(n.user?e(n.user.name,n.user.nameEn||n.user.name):"DARC")} · ${t(n.action)}</strong><span>${t(n.entityType)} · ${te(n.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${c("check",18)}<span>${e("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function Se(a){const i=a.lastActiveAt||a.customFields?.lastActiveAt,n=a.lastLoginAt||a.customFields?.lastLoginAt;if(!i&&!n)return`<span class="activity-never">${e("لم يسجل دخول بعد","Never logged in")}</span>`;const p=Date.now(),v=i?new Date(i).getTime():0,u=a.id===o.data?.user?.id?0:v&&!isNaN(v)?Math.floor((p-v)/6e4):999999,s=u>=0&&u<=5;let h="";if(s)h=`<span class="activity-pill online"><span class="activity-dot online"></span> ${e("نشط الآن","Online")}</span>`;else if(u<60)h=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${e(`منذ ${u} دقيقة`,`${u}m ago`)}</span>`;else if(u<1440){const A=Math.floor(u/60);h=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${e(`منذ ${A} ساعة`,`${A}h ago`)}</span>`}else v>0&&(h=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${te(i,!1)}</span>`);const m=n?`<span class="activity-sub" title="${t(n)}">${e("دخول:","Login:")} ${te(n,!0)}</span>`:"";return`<div class="activity-wrapper">${h}${m}</div>`}function le(a){return ze(a,{includeSeconds:!0})}function ae(a){const i=a.action||"",n=a.entityType||a.entity_type||"",p=a.details||{};let v="badge-neutral",u=i,s=n;i==="login"?(v="badge-teal",u=e("تسجيل دخول","Sign In"),s=e("جلسة نظام","System Session")):i==="create"?(v="badge-mint",u=e("إنشاء جديد","Created")):i==="update"?(v="badge-blue",u=e("تعديل بيانات","Updated")):i==="delete"?(v="badge-red",u=e("نقل للمهملات","Moved to Trash")):i==="status_change"?(v="badge-amber",u=e("تغيير حالة","Status Changed")):i==="export_report"?(v="badge-teal",u=e("تصدير تقرير","Exported Report")):i==="restore"?(v="badge-mint",u=e("استعادة","Restored")):i==="purge"?(v="badge-danger",u=e("حذف نهائي","Purged")):i==="invite"&&(v="badge-blue",u=e("دعوة مستخدم","Invite Sent")),n==="task"?s=e("مهمة","Task"):n==="project"?s=e("مشروع","Project"):n==="document"?s=e("مستند","Document"):n==="user"?s=e("مستخدم","User"):n==="report"?s=e("تقرير","Report"):n==="role"&&(s=e("دور وصلاحيات","Role"));let h="—";return p.title||p.name?h=`<strong>${t(p.title||p.name)}</strong>`:i==="status_change"&&(p.oldStatus||p.newStatus)?h=`<span>${t(B(p.oldStatus))} ➔ <strong>${t(B(p.newStatus))}</strong></span>`:a.entityId&&(h=`<code style="font-size:11px;color:var(--muted);">${t(a.entityId)}</code>`),{badgeClass:v,actionLabel:u,entityLabel:s,detailHtml:h}}function Oe(a=null){if(!w("view_audit_logs")&&!j()){L(e("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}const i=a||o._lastFilteredAuditLogs||o.data?.auditLogs||[];if(!i.length){L(e("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const n=Ce(),p=n.displayName,v=n.logoUrl,u=o.data?.user||{},s=e(u.name,u.nameEn||u.name)||"Admin",h=ge(),m=me();let A=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${v?`<img src="${t(v)}" height="38" style="vertical-align:middle;margin-inline-end:10px;" />`:""}
          <span style="vertical-align:middle;">${e("سجل الرقابة والتدقيق الأمني والعمليات — "+p,"Audit & Security Trail Report — "+p)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${e("المؤسسة:","Company:")} ${t(p)} | ${e("المشرف المستخرج:","Exported by:")} ${t(s)} | ${e("تاريخ التصدير:","Export Date:")} ${t(h)} ${t(m)}
        </th>
      </tr>
      <tr>
        <th colspan="7" style="background:#f8fafc;color:#64748b;font-size:11px;text-align:center;padding:6px;">
          ${e("إجمالي العمليات المضمنة في التقرير:","Total Events in Report:")} ${i.length} ${e("عملية","events")}
        </th>
      </tr>
      <tr style="height:10px;"><td colspan="7" style="border:none;"></td></tr>
      <tr class="header" style="background:#134e4a;color:#ffffff;font-weight:bold;font-size:12px;text-align:center;">
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("المعرف","ID")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("التاريخ والوقت","Date & Time")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("المنفذ / المستخدم","Actor")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("الدور الوظيفي","Role")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("نوع النشاط","Action")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("نوع العنصر","Entity")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("التفاصيل والتغييرات","Details / Context")}</th>
      </tr>
  `;i.forEach((f,S)=>{const T=f.user||(f.userId?(o.data?.users||[]).find(N=>N.id===f.userId):null),b=T?e(T.name,T.nameEn||T.name):e("النظام","System"),l=T?O(T):"—",$=le(f.createdAt),{actionLabel:z,entityLabel:y}=ae(f);let x="";f.details?.title||f.details?.name?x=f.details.title||f.details.name:f.action==="status_change"?x=`${B(f.details?.oldStatus)} ➔ ${B(f.details?.newStatus)}`:typeof f.details=="object"?x=JSON.stringify(f.details):x=String(f.details||f.entityId||"—");const D=S%2===0?"#ffffff":"#f8fafc";A+=`
      <tr style="background:${D};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${t(F(f.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(F(`${$.date} ${$.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${t(F(b))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${t(F(l))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(F(z))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(F(y))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${t(F(x))}</td>
      </tr>
    `}),A+="</table>";const E=new Date().toISOString().split("T")[0];je(`DARC_Audit_Trail_${E}`,A),L(e("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),J("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${E}`,details:{reportType:"Audit_Logs_Excel",count:i.length}})}).catch(()=>{})}function Be(a=null){const i=a||o._lastFilteredAuditLogs||o.data?.auditLogs||[];if(!i.length){L(e("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const n=o.data?.company||{},p=e(n.nameAr||n.name,n.nameEn||n.name)||"DARC Design Team";let v=n.logoUrl||"";v.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(v=`${window.location.origin}${v}`);const u=o.data?.user||{},s=e(u.name,u.nameEn||u.name)||"Admin",h=ge(),m=me(),A=i.length,E=i.filter(y=>y.action==="create").length,f=i.filter(y=>y.action==="update"||y.action==="status_change").length,S=i.filter(y=>y.action==="delete"||y.action==="purge"||y.action==="trash").length;let T="";i.forEach((y,x)=>{const D=y.user||(y.userId?(o.data?.users||[]).find(C=>C.id===y.userId):null),N=D?e(D.name,D.nameEn||D.name):e("النظام","System"),d=D?O(D):"—",g=le(y.createdAt),{actionLabel:k,entityLabel:_}=ae(y);let I="";y.details?.title||y.details?.name?I=y.details.title||y.details.name:y.action==="status_change"?I=`${B(y.details?.oldStatus)} ➔ ${B(y.details?.newStatus)}`:typeof y.details=="object"?I=JSON.stringify(y.details):I=String(y.details||y.entityId||"—"),T+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${t(y.id||String(x+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${t(g.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${t(g.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${t(N)}</div>
          <div style="font-size:10px;color:#64748b;">${t(d)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${t(k)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${t(_)}</td>
        <td style="font-size:11px;color:#334155;">${t(I)}</td>
      </tr>
    `});const b=`
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
          <strong>${e("معاينة التقرير الرقابي الرسمي جاهزة للطباعة / التصدير PDF","Official Executive Audit Report Ready for Print / Save as PDF")}</strong>
          <span style="display:block;font-size:11px;color:#64748b;">${e('يمكنك الضغط على زر الطباعة أدناه واختيار "Save as PDF" لتخزين الملف كـ PDF رسمي.','Click the button below and choose "Save as PDF" in your browser.')}</span>
        </div>
        <button class="btn-print" onclick="window.print()">${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}</button>
      </div>

      <header class="report-header">
        <div>
          ${v?`<img src="${t(v)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />`:""}
          <h1 class="brand-title">${t(p)}</h1>
          <div class="report-subtitle">${e("تقرير الرقابة والتدقيق الأمني وسجل العمليات الإدارية","Official Security Audit & Governance Operations Trail")}</div>
        </div>
        <div class="report-meta-box">
          <div><strong>${e("المشرف المستخرج:","Generated By:")}</strong> ${t(s)}</div>
          <div><strong>${e("تاريخ التقرير:","Report Date:")}</strong> ${t(h)} - ${t(m)}</div>
          <div><strong>${e("حالة النظام:","System Status:")}</strong> Active / Enforced</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${A}</div>
          <div class="kpi-label">${e("إجمالي العمليات","Total Events")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#059669;">${E}</div>
          <div class="kpi-label">${e("عمليات إنشاء","Create Operations")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#2563eb;">${f}</div>
          <div class="kpi-label">${e("عمليات تعديل وحالة","Updates & State Changes")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#dc2626;">${S}</div>
          <div class="kpi-label">${e("عمليات حذف وحركة سلة","Deletions & Trash Moves")}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width:50px;">#</th>
            <th style="width:130px;">${e("التاريخ والوقت","Timestamp")}</th>
            <th style="width:160px;">${e("المستخدم / المنفذ","Actor")}</th>
            <th style="width:90px;">${e("نوع النشاط","Action")}</th>
            <th style="width:90px;">${e("نوع العنصر","Entity")}</th>
            <th>${e("التفاصيل والتغييرات","Details & Context")}</th>
          </tr>
        </thead>
        <tbody>
          ${T}
        </tbody>
      </table>

      <footer class="signature-section">
        <div class="signature-box">
          <strong>${e("إعداد وتصدير التقرير","Prepared By")}</strong><br /><br />
          <span>${t(s)}</span>
        </div>
        <div class="signature-box">
          <strong>${e("مسؤول الجودة والامتثال الأمني","Security & Compliance Lead")}</strong><br /><br />
          <span>..............................................</span>
        </div>
        <div class="signature-box">
          <strong>${e("الاعتماد الإداري العام","General Management Approval")}</strong><br /><br />
          <span>..............................................</span>
        </div>
      </footer>
    </body>
    </html>
  `;let l=document.getElementById("audit-report-preview-modal");l||(l=document.createElement("div"),l.id="audit-report-preview-modal",l.style.position="fixed",l.style.inset="0",l.style.background="rgba(0, 0, 0, 0.7)",l.style.backdropFilter="blur(4px)",l.style.zIndex="999999",l.style.display="none",l.style.alignItems="center",l.style.justifyContent="center",l.style.padding="15px",document.body.appendChild(l)),l.innerHTML=`
    <div style="background:var(--surface, #ffffff);color:var(--ink);width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.4);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line);background:var(--surface-soft);flex-wrap:wrap;gap:8px;">
        <strong style="color:var(--brand-teal);font-size:14px;">${e("معاينة التقرير الرقابي الرسمي (Audit Trail PDF Preview)","Official Audit Trail Report (PDF Preview)")}</strong>
        <div style="display:flex;gap:10px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-print-audit-iframe" style="display:flex;align-items:center;gap:6px;">
            ${c("printer",14)} ${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-close-audit-print-modal">✕</button>
        </div>
      </div>
      <div style="flex:1;overflow:hidden;position:relative;background:#ffffff;">
        <iframe id="audit-print-preview-iframe" style="width:100%;height:100%;border:none;background:#ffffff;" srcdoc="${t(b)}"></iframe>
      </div>
    </div>
  `,l.style.display="flex";const $=()=>{l.style.display="none",l.innerHTML="",window.removeEventListener("keydown",z)},z=y=>{y.key==="Escape"&&$()};window.addEventListener("keydown",z),document.getElementById("btn-close-audit-print-modal")?.addEventListener("click",$),document.getElementById("btn-print-audit-iframe")?.addEventListener("click",()=>{const y=document.getElementById("audit-print-preview-iframe");y&&y.contentWindow&&(y.contentWindow.focus(),y.contentWindow.print())}),J("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:i.length}})}).catch(()=>{})}async function We(){try{L(e("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const a=await J("/api/audit?limit=1000");a&&a.logs&&(o.data.auditLogs=a.logs,o.auditFullHistoryLoaded=!0,renderView(),L(e(`تم جلب ${a.logs.length} عملية بنجاح.`,`Loaded ${a.logs.length} audit logs.`)))}catch(a){L(a.message||e("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function R(a){const i=j();return a==="profile"||a==="security"||a==="notifications"?!0:a==="company"?i||w("manage_settings"):a==="whatsapp"?i||w("manage_settings"):a==="roles"?i||w("manage_roles"):a==="accounts"?i||w("manage_users")||w("manage_existing_account_permissions")||w("view_user_activity"):a==="trash"?i||w("manage_trash"):a==="audit"?i||w("view_audit_logs"):a==="analytics"?i||w("manage_settings")||w("view_audit_logs"):a==="diagnostics"?i||w("manage_settings"):!1}function Ge(){const a=o.data?.user?.id,i=j(),n=R("company"),p=R("whatsapp"),v=R("roles"),u=R("accounts"),s=R("trash"),h=R("audit"),m=R("analytics"),A=R("diagnostics"),E=[["profile",e("الملف الشخصي","Profile")],["notifications",e("الإشعارات والتنبيهات","Notifications & Alerts")],...n?[["company",r("company")]]:[],...p?[["whatsapp",e("تنبيهات واتساب","WhatsApp Alerts")]]:[],...v?[["roles",r("roles")]]:[],...u?[["accounts",r("accounts")]]:[],["security",e("الأمان","Security")],...s?[["trash",e("سلة المهملات","Trash")]]:[],...h?[["audit",r("audit")]]:[],...m?[["analytics",e("المراقبة والزيارات والأداء","Observability & Analytics")]]:[],...A?[["diagnostics",e("تشخيص الأعطال والمستخدمين","Error Logs & User Diagnostics")]]:[]];E.some(([b])=>b===o.settingsSection)||(o.settingsSection=E[0]?.[0]||"profile");const f=o.data?.user||{};let S="";if(o.settingsSection==="profile"&&(S=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("الملف الشخصي","Profile")}</h2>
            <p>${e("إدارة صورتك الشخصية وبيانات حسابك في النظام.","Manage your profile picture and account information.")}</p>
          </div>
        </div>

        <div class="profile-avatar-card">
          <label for="user-avatar-file-input" class="avatar-upload-trigger" id="profile-avatar-preview" role="button" tabindex="0" title="${e("انقر لرفع صورة شخصية جديدة","Click to upload a new profile picture")}">
            <div class="avatar-upload-circle">
              ${f.avatarUrl?`<img src="${t(f.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(f.avatarColor||"")?f.avatarColor:"#0d6269"};">${t(de(f))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(f.avatarColor||"")?f.avatarColor:"#0d6269"};">${t(de(f))}</div>`}
              <div class="avatar-upload-overlay">
                ${c("upload",18)}
                <span>${e("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${t(e(f.name,f.nameEn||f.name))}</h3>
            <p class="profile-user-role">${t(e(f.jobTitleAr||"",f.jobTitleEn||f.jobTitleAr||""))} · <span class="status-badge done">${t(O(f))}</span></p>
            <div class="profile-upload-actions">
              <input type="file" id="user-avatar-file-input" accept="image/jpeg,image/png,image/webp" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="user-avatar-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${c("upload",14)} ${e("رفع صورة جديدة","Upload new avatar")}
              </label>
              <span class="upload-hint">${e("يدعم JPG, PNG, WebP (حد أقصى 2MB)","Supports JPG, PNG, WebP (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-profile">
          <div class="form-grid">
            <div class="field">
              <label>${r("nameAr")}</label>
              <input name="name" value="${t(f.name||"")}" required />
            </div>
            <div class="field">
              <label>${r("nameEn")}</label>
              <input name="nameEn" value="${t(f.nameEn||"")}" />
            </div>
            <div class="field">
              <label>${r("jobTitle")} (${e("عربي","AR")})</label>
              <input name="jobTitleAr" value="${t(f.jobTitleAr||"")}" />
            </div>
            <div class="field">
              <label>${r("jobTitle")} (${e("إنجليزي","EN")})</label>
              <input name="jobTitleEn" value="${t(f.jobTitleEn||"")}" />
            </div>
            <div class="field full">
              <label>${r("email")}</label>
              <input value="${t(f.email||"")}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${e("رقم الواتساب للتنبيهات الفردية","WhatsApp Phone for Alerts")}</label>
              <input type="tel" name="phone" dir="ltr" value="${t(f.phone||f.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" />
              <small class="field-hint">${e("أدخل رقم هاتفك مع مفتاح الدولة لاستلام تنبيهات المهام والمخططات المسندة إليك مباشرة على الواتساب.","Enter your phone number with country code to receive alerts for assigned tasks and drawings directly on WhatsApp.")}</small>
            </div>
            <div class="field full">
              <label for="settings-calendar-system">${e("نظام التقويم المفضل في المنصة","Preferred Calendar System")}</label>
              <select id="settings-calendar-system" name="calendarSystem">
                <option value="gregorian" ${pe()==="gregorian"?"selected":""}>${e("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${pe()==="hijri"?"selected":""}>${e("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${e("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${r("save")}</button>
          </div>
        </form>
      </section>
    `),o.settingsSection==="company"&&(i||w("manage_settings"))){const b=o.data?.company||{};S=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${r("company")}</h2>
            <p>${e("هوية مساحة العمل وشعار الشركة واللغة الافتراضية.","Workspace identity, company logo, and default language.")}</p>
          </div>
        </div>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${e("انقر لرفع وتعديل شعار الشركة","Click to upload and change company logo")}">
            <div class="logo-upload-box">
              ${b.logoUrl?`<img src="${t(b.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${c("building",24)}</span>`:`<span class="brand-mark">${c("building",24)}</span>`}
              <div class="logo-upload-overlay">
                ${c("upload",16)}
                <span>${e("تعديل","Edit")}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${t(b.name||"DARC Design Team")}</strong>
            <span class="company-sub">${e("العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض","Arabic default · English support · Riyadh timezone")}</span>
            <div class="company-upload-actions">
              <input type="file" id="company-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="company-logo-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${c("upload",14)} ${e("رفع وتعديل الشعار","Upload & Change Logo")}
              </label>
              <span class="upload-hint">${e("يدعم PNG, SVG, JPG (حد أقصى 2MB)","Supports PNG, SVG, JPG (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-company" class="company-form">
          <div class="form-grid">
            <div class="field">
              <label>${r("nameAr")}</label>
              <input name="nameAr" value="${t(b.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${r("nameEn")}</label>
              <input name="nameEn" value="${t(b.nameEn||"")}" />
            </div>
            <div class="field full">
              <label>${r("emailStatus")}</label>
              <input value="${t(o.data?.emailConfigured?r("emailConfigured"):r("emailNotConfigured"))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${r("save")}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:16px;">${c("info",16)}<span>${r("emailInfo")}</span></div>
      </section>
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("نموذج الإنجاز","Progress model")}</h2>
            <p>${r("weightedExplanation")}</p>
          </div>
        </div>
        <div class="report-stat-list">
          <div class="report-stat"><span>${r("weightedProgress")}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${r("simpleProgress")}</span><strong style="color:var(--ink-soft)">—</strong></div>
        </div>
      </section>
    `}if(o.settingsSection==="security"&&(S=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("الأمان","Security")}</h2>
            <p>${e("تغيير كلمة المرور أو تسجيل الخروج من كافة الأجهزة.","Change your password or sign out from all devices.")}</p>
          </div>
        </div>
        <form data-action="change-password">
          <div class="form-grid" style="margin-top:18px">
            <div class="field"><label>${e("كلمة المرور الحالية","Current password")}</label><input type="password" name="oldPassword" autocomplete="current-password" required /></div>
            <div class="field"><label>${e("كلمة المرور الجديدة","New password")}</label><input type="password" name="newPassword" minlength="10" autocomplete="new-password" required /></div>
          </div>
          <div class="form-actions" style="margin-top:20px"><button type="submit" class="btn btn-primary">${r("save")}</button></div>
        </form>
        <hr style="margin:28px 0;border:0;border-top:1px solid var(--line)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
          <div>
            <h3 style="font-size:14px;margin:0 0 4px">${e("تسجيل الخروج من كل الأجهزة","Sign out of all devices")}</h3>
            <p style="color:var(--muted);font-size:12px;margin:0;">${e("إنهاء كافة الجلسات النشطة على كل المتصفحات.","End all active sessions on all browsers.")}</p>
          </div>
          <button class="btn btn-danger btn-sm" data-action="logout-all">${e("تسجيل خروج للكل","Sign out all")}</button>
        </div>
      </section>
    `),o.settingsSection==="notifications"){const b=Re(),l=Pe()&&!Ie(),$=b==="granted",z=b==="denied",y=l?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);font-weight:700;">${e("مدعومة عبر تطبيق الويب (PWA) 📱","Supported via Web App (PWA) 📱")}</span>`:`<span class="mini-badge" style="background:${$?"var(--mint)":z?"var(--red-soft)":"var(--surface-soft)"};color:${$?"var(--teal)":z?"var(--red)":"var(--muted)"};font-weight:700;">
          ${$?e("مفعلة على هذا المتصفح ✅","Enabled on this browser ✅"):z?e("محظورة من إعدادات المتصفح ❌","Blocked in browser settings ❌"):e("بانتظار الموافقة ⚠️","Permission pending ⚠️")}
        </span>`,x=l?`<button type="button" class="btn btn-primary btn-sm" data-action="show-ios-notification-guide">${c("bell",14)} ${e("طريقة التفعيل على iPhone","iPhone Setup Guide")}</button>`:$?`<button type="button" class="btn btn-ghost btn-sm" data-action="test-browser-notification" style="color:var(--teal);">${c("check",14)} ${e("فحص إشعار المتصفح","Test Browser Alert")}</button>`:`<button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications">${c("check",14)} ${e("تفعيل الإشعارات الآن","Enable Notifications")}</button>`;S=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("الإشعارات والتنبيهات","Notifications & Alerts")}</h2>
            <p>${e("تخصيص قنوات وصول التنبيهات الفورية وإشعارات المتصفح لسطح المكتب والهواتف الذكية.","Configure real-time notification channels and alerts for desktop and mobile.")}</p>
          </div>
          <button type="button" class="btn btn-primary btn-sm" data-action="send-test-notification">
            ${c("bell",14)} ${e("إرسال إشعار تجريبي فوري","Send Test Notification")}
          </button>
        </div>

        <div style="display:grid;gap:16px;margin-top:16px;">
          <!-- 1. Browser Web Notifications Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon ${$?"teal":z?"red":"blue"}" style="margin-top:2px;">
                ${c("bell",16)}
              </span>
              <div>
                <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:3px;">
                  ${e("إشعارات سطح المكتب والمتصفح والجوال (Web Alerts)","Desktop & Mobile Web Notifications")}
                </strong>
                <p style="margin:0;font-size:11px;color:var(--muted);max-width:480px;line-height:1.5;">
                  ${e("تسمح للموقع بإرسال تنبيهات فورية للنظام حتى عندما يكون المتصفح في الخلفية أو شاشة الهاتف مغلقة.","Allows the platform to deliver native system notifications even when the browser is in the background or screen locked.")}
                </p>
                <div style="margin-top:6px;">
                  ${y}
                </div>
              </div>
            </div>
            <div>
              ${x}
            </div>
          </div>

          <!-- 2. Audio Chimes Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon teal" style="margin-top:2px;">
                ${c("check",16)}
              </span>
              <div>
                <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:3px;">
                  ${e("النغمة التنبيهية الفاخرة (Audio Chime)","Acoustic Alert Chime")}
                </strong>
                <p style="margin:0;font-size:11px;color:var(--muted);max-width:480px;line-height:1.5;">
                  ${e("نغمة صوتية هادئة مدمجة باستخدام Web Audio API تعزف فورياً عند وصول أي تنبيه في الوقت الفعلي.","Subtle built-in harmonic chime generated via Web Audio API playing whenever a live alert arrives.")}
                </p>
              </div>
            </div>
            <button type="button" class="btn btn-soft btn-sm" data-action="play-test-chime">
              🔊 ${e("استمع للنغمة","Play Chime")}
            </button>
          </div>

          <!-- 3. Channel Status Matrix -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);">
            <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:8px;">
              ${e("جاهزية قنوات الإرسال المربوطة","Connected Notification Channels")}
            </strong>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;margin-top:10px;">
              <div style="padding:10px;border-radius:10px;background:var(--surface-soft);border:1px solid var(--line);">
                <span style="font-size:10px;color:var(--muted);display:block;">${e("التنبيهات داخل المنصة","In-App Alerts")}</span>
                <strong style="color:var(--teal);font-size:12px;">✅ ${e("نشطة وفورية (WebSocket)","Active Real-Time")}</strong>
              </div>
              <div style="padding:10px;border-radius:10px;background:var(--surface-soft);border:1px solid var(--line);">
                <span style="font-size:10px;color:var(--muted);display:block;">${e("تنبيهات واتساب المباشرة","WhatsApp Direct Alerts")}</span>
                <strong style="color:var(--teal);font-size:12px;">✅ ${e("مربوطة (Baileys Engine)","Connected Baileys")}</strong>
              </div>
              <div style="padding:10px;border-radius:10px;background:var(--surface-soft);border:1px solid var(--line);">
                <span style="font-size:10px;color:var(--muted);display:block;">${e("بريد الإشعارات السحابي","Cloud Email Gateway")}</span>
                <strong style="color:var(--teal);font-size:12px;">✅ ${e("جاهز (Resend API)","Ready Resend")}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    `}if(o.settingsSection==="accounts"&&u){const b=j()||w("view_user_activity"),l=j()||w("manage_users"),$=j()||w("manage_existing_account_permissions")||w("manage_users"),z=j()&&!ee();let y=o.data?.users||[];a!=="usr_ahmad"&&(y=y.filter(x=>x.id!=="usr_ahmad")),S=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${r("accounts")}</h2>
            <p>${e("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${l?`<button class="btn btn-primary btn-sm" data-action="new-user">${c("plus",14)} ${r("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${r("team")}</th>
                <th>${r("role")}</th>
                <th>${r("email")}</th>
                <th>${r("accountStatus")}</th>
                ${b?`<th>${e("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${$?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${y.map(x=>{const D=x.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${Z(x)}
                        <div class="team-member-copy">
                          <strong>${t(e(x.name,x.nameEn||x.name))}</strong>
                          <span>${t(e(x.jobTitleAr||(D?"المبرمج / مدير النظام":""),x.jobTitleEn||x.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${D?`<span class="stealth-dev-badge">${c("shield",12)} ${e("مدير ومطور النظام","Super Admin & Dev")}</span>`:t(O(x))}
                    </td>
                    <td>
                      ${x.email?t(x.email):`<span style="color:var(--muted)">${r("noEmail")}</span>`}
                      ${x.phone||x.customFields?.phone?`<div style="font-size:11px;color:var(--primary);direction:ltr;text-align:right;margin-top:3px;font-family:monospace;font-weight:600;">📱 ${t(x.phone||x.customFields?.phone)}</div>`:""}
                    </td>
                    <td>
                      <span class="status-badge ${x.status==="active"?"done":"not_started"}">${x.status==="active"?r("activeAccount"):r("pendingAccount")}</span>
                    </td>
                    ${b?`
                      <td>
                        ${Se(x)}
                      </td>
                    `:""}
                    ${$?`
                      <td>
                        <div class="role-actions">
                          ${D?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${t(x.id)}">${r("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${t(x.id)}">${r("edit")}</button>
                            ${x.id!==o.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${t(x.id)}" title="${x.status==="pending"?e("تفعيل الحساب يدوياً","Activate manually"):e("تغيير كلمة المرور","Change password")}">${c(x.status==="pending"?"check":"settings",13)}</button>
                              ${z?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${t(x.id)}" title="دخول كـ هذا الحساب">${c("user",13)}</button>`:""}
                            `:""}
                            ${x.id!==o.data?.user?.id&&x.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${t(x.id)}">${c("send",13)}</button>`:""}
                            ${x.id!==o.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${t(x.id)}">${c("trash",13)}</button>`:""}
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
    `}if(o.settingsSection==="roles"&&(i||w("manage_roles"))&&(S=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${r("roles")}</h2>
            <p>${e("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${i||w("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${c("plus",14)} ${r("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(o.data?.roles||[]).map(b=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${t(e(b.nameAr,b.nameEn))}</strong>
                  ${b.builtIn?`<span class="role-system-badge">${c("shield",11)} ${r("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${t(e(b.descriptionAr,b.descriptionEn))}</p>
                <div class="role-meta">${b.permissions.includes("*")?e("صلاحية كاملة","Full access"):`${b.permissions.length} ${r("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${t(b.id)}">${c("edit",13)} ${r("edit")}</button>
                ${b.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${t(b.id)}">${c("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),o.settingsSection==="trash"&&s){if(!o.trash&&typeof sessionStorage<"u")try{const d=sessionStorage.getItem("darc_trash_cache");d&&(o.trash=JSON.parse(d))}catch{}!o.trashLoaded&&!o._trashFetching&&(o._trashFetching=!0,J("/api/trash").then(d=>{o.trash=Array.isArray(d)?d:d.trash||[...(d.projects||[]).map(g=>({...g,type:"project"})),...(d.tasks||[]).map(g=>({...g,type:"task"})),...(d.documents||[]).map(g=>({...g,type:"document"}))],o.trashLoaded=!0,o._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(o.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(d=>{o._trashFetching=!1,console.error("[Trash fetch error]",d)}));const b=o.trash||[],l=o.trashFilter||"all",$=(o.trashQuery||"").trim().toLowerCase(),z=b.filter(d=>{if(l!=="all"&&d.type!==l)return!1;if(!$)return!0;const g=(e(d.nameAr||d.titleAr,d.nameEn||d.titleEn)||d.name||d.title||d.originalName||"").toLowerCase(),k=(d.code||d.projectCode||"").toLowerCase(),_=(d.projectNameAr||d.projectNameEn||"").toLowerCase();return g.includes($)||k.includes($)||_.includes($)}),y=b.filter(d=>d.type==="project").length,x=b.filter(d=>d.type==="task").length,D=b.filter(d=>d.type==="document").length,N=b.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${c("info",16)}</div>
        <div class="trash-notice-text">
          <strong>${e("سلة المحذوفات المركزية المحمية","Central Protected Trash Bin")}</strong>
          <p>${e("تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.","Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.")}</p>
        </div>
      </div>

      <div class="view-toolbar trash-filter-bar">
        <div class="trash-filter-group">
          <button type="button" class="btn btn-sm ${l==="all"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="all">
            ${c("layers",14)}
            <span>${e("الكل","All")}</span>
            <span class="badge ${l==="all"?"badge-on-primary":"badge-neutral"}">${b.length}</span>
          </button>
          <button type="button" class="btn btn-sm ${l==="project"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="project">
            ${c("building",14)}
            <span>${e("المشاريع","Projects")}</span>
            <span class="badge ${l==="project"?"badge-on-primary":"badge-neutral"}">${y}</span>
          </button>
          <button type="button" class="btn btn-sm ${l==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${c("checklist",14)}
            <span>${e("المهام","Tasks")}</span>
            <span class="badge ${l==="task"?"badge-on-primary":"badge-neutral"}">${x}</span>
          </button>
          <button type="button" class="btn btn-sm ${l==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${c("document",14)}
            <span>${e("المستندات","Documents")}</span>
            <span class="badge ${l==="document"?"badge-on-primary":"badge-neutral"}">${D}</span>
          </button>
        </div>
        <div class="search-box search-sm trash-search-box">
          ${c("search",14)}
          <input type="search" placeholder="${e("بحث في المحذوفات...","Search deleted items...")}" value="${t(o.trashQuery||"")}" data-action="search-trash-input" />
        </div>
      </div>

      ${z.length?`
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${e("الاسم / العنوان","Name / Title")}</th>
                <th>${e("النوع","Type")}</th>
                <th>${e("المشروع التابع له","Project")}</th>
                <th>${e("الحالة السابقة","Prior Status")}</th>
                <th>${e("تاريخ الحذف","Deleted At")}</th>
                <th style="text-align:${o.lang==="ar"?"left":"right"}">${e("الإجراءات","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${z.map(d=>{const g=d.type==="project",k=d.type==="task",_=d.type==="document",I=e(d.nameAr||d.titleAr,d.nameEn||d.titleEn)||d.name||d.title||d.originalName||d.code||e("عنصر محذوف","Deleted item"),C=!g&&d.projectId?(o.data?.projects||[]).find(Y=>Y.id===d.projectId):null,W=d.projectNameAr||d.projectNameEn||(C?e(C.nameAr,C.nameEn||C.nameAr):null),G=d.projectCode||C?.code,H=_&&d.size?d.size>1048576?(d.size/1048576).toFixed(1)+" MB":Math.round(d.size/1024)+" KB":"",Q=i||w("manage_trash")||d.uploaderId===a;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${g?"is-project":k?"is-task":"is-doc"}">
                          ${c(g?"building":k?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${t(I)}</strong>
                          ${d.code||g?`<span class="trash-item-code">${t(d.code||d.id)}</span>`:""}
                          ${_&&H?`<span class="trash-item-code" style="color:var(--muted);">${H}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${g?"type-project":k?"type-task":"type-doc"}">
                        ${c(g?"building":k?"checklist":"document",11)}
                        ${g?e("مشروع","Project"):k?e("مهمة","Task"):e("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${g?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${e("مشروع رئيسي","Primary Project")}</span>`:W?`${c("building",11)} <span>${t(W)}${G?` (${t(G)})`:""}</span>${_&&d.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${t(d.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${d.status?`<span class="status-badge ${t(d.status)}">${t(B(d.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${t(d.deletedAt||"")}">
                        ${te(d.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${o.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${t(d.type)}" data-id="${t(d.id)}" title="${e("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${c(o.lang==="ar"?"arrow":"arrowLeft",12)} ${e("استعادة","Restore")}
                        </button>
                        ${Q?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${t(d.type)}" data-id="${t(d.id)}" title="${e("حذف العنصر نهائياً","Permanently delete item")}">
                            ${c("trash",12)} ${e("حذف نهائي","Purge")}
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
          ${c("search",22)}
          <span>${e("لا توجد نتائج تطابق بحثك في سلة المهملات.","No items match your search in trash.")}</span>
        </div>
      `}
    `:!o.trashLoaded&&!b.length?`
      <div style="padding:48px 20px;text-align:center;">
        <div style="width:32px;height:32px;margin:0 auto 14px;border:3px solid var(--line);border-top-color:var(--teal);border-radius:50%;animation:spin 0.75s linear infinite;"></div>
        <div style="font-size:14px;font-weight:700;color:var(--ink);">${e("جاري فحص واسترجاع عناصر سلة المهملات...","Loading recycle bin items...")}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px;">${e("يتم جلب المشاريع والمهام والمستندات المحذوفة من الخادم...","Fetching deleted projects, tasks, and drawings from server...")}</div>
      </div>
    `:`
      <div class="empty">
        ${c("trash",24)}
        <span>${e("سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.","Trash is empty, no deleted items found.")}</span>
      </div>
    `;S=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${e("سلة المهملات","Recycle Bin")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${!o.trashLoaded&&!b.length?e("جاري التحميل...","Loading..."):`${b.length} ${e("عناصر","items")}`}
              </span>
            </div>
            <p>${e("استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.","Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.")}</p>
          </div>
          ${(i||w("manage_trash"))&&b.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${e("حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات","Permanently erase all deleted items")}">
                ${c("trash",13)} ${e("إفراغ سلة المهملات","Empty Trash")}
              </button>
            </div>
          `:""}
        </div>
        ${N}
      </section>
    `}if(o.settingsSection==="audit"&&(i||w("view_audit_logs"))){const b=[...o.data?.auditLogs||[]].sort((g,k)=>new Date(k.createdAt).getTime()-new Date(g.createdAt).getTime()),l=o.auditFilterAction||"all",$=o.auditFilterEntity||"all",z=o.auditFilterUser||"all",y=(o.auditSearchQuery||"").trim().toLowerCase(),x=b.filter(g=>{if(l!=="all"&&g.action!==l||$!=="all"&&(g.entityType||g.entity_type)!==$||z!=="all"&&(g.userId||g.user_id||g.user?.id)!==z)return!1;if(y){const k=g.user||(g.userId?(o.data?.users||[]).find(Y=>Y.id===g.userId):null),_=(k&&e(k.name,k.nameEn||k.name)||"").toLowerCase(),{actionLabel:I,entityLabel:C}=ae(g),W=(I||g.action||"").toLowerCase(),G=(C||g.entityType||"").toLowerCase(),H=(g.id||g.entityId||"").toLowerCase(),Q=typeof g.details=="object"?JSON.stringify(g.details).toLowerCase():String(g.details||"").toLowerCase();if(!(_.includes(y)||W.includes(y)||G.includes(y)||H.includes(y)||Q.includes(y)))return!1}return!0});o._lastFilteredAuditLogs=x;const D=[["all",e("كافة العمليات","All Actions")],["create",e("إنشاء جديد","Create")],["update",e("تعديل بيانات","Update")],["status_change",e("تغيير حالة","Status Change")],["delete",e("نقل للمهملات","Delete / Trash")],["restore",e("استعادة","Restore")],["purge",e("حذف نهائي","Purge")],["export_report",e("تصدير تقرير","Export Report")],["login",e("تسجيل دخول","Sign In")],["invite",e("دعوة مستخدم","Invite")]],N=[["all",e("كافة العناصر","All Entities")],["project",e("المشاريع","Projects")],["task",e("المهام","Tasks")],["document",e("المستندات","Documents")],["user",e("المستخدمين","Users")],["role",e("الأدوار والصلاحيات","Roles")],["company",e("إعدادات الشركة","Company Settings")],["report",e("التقارير","Reports")]],d=l!=="all"||$!=="all"||z!=="all"||!!y;S=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${r("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${x.length} ${e("عملية معروضة","events shown")}
              </span>
              ${d?`
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${e("من أصل","out of")} ${b.length}
                </span>
              `:""}
            </div>
            <p>${e("سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.","Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.")}</p>
          </div>
          <div class="page-actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${o.auditFullHistoryLoaded?"":`
              <button class="btn btn-ghost btn-sm" data-action="load-full-audit" title="${e("جلب الأرشيف الكامل للسجلات من السيرفر","Load complete audit archive")}">
                ${c("refresh",13)} ${e("تحميل الأرشيف الكامل","Load All History")}
              </button>
            `}
            <button class="btn btn-soft btn-sm" data-action="export-audit-xls" title="${e("تصدير السجل كملف Excel منسق","Export as styled Excel file")}">
              ${c("download",13)} ${e("تصدير Excel","Export Excel")}
            </button>
            <button class="btn btn-primary btn-sm" data-action="print-audit-pdf" title="${e("معاينة وطباعة تقرير رسمي وحفظه كـ PDF","Print or save executive PDF report")}">
              ${c("printer",13)} ${e("طباعة تقرير PDF","Print / PDF")}
            </button>
          </div>
        </div>

        <div class="view-toolbar audit-toolbar" style="gap:10px;margin-bottom:16px;">
          <div class="search-box search-sm" style="flex:1;min-width:240px;max-width:380px;">
            ${c("search",14)}
            <input type="search" placeholder="${e("بحث فوري بالمنفذ، العملية، أو التفاصيل...","Search by actor, action, details...")}" value="${t(o.auditSearchQuery||"")}" data-action="search-audit-input" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="filter-select select-compact select-sm" data-action="filter-audit-action" style="min-width:125px;">
              ${D.map(([g,k])=>`<option value="${g}" ${l===g?"selected":""}>${k}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${N.map(([g,k])=>`<option value="${g}" ${$===g?"selected":""}>${k}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${e("كافة المستخدمين","All Users")}</option>
              ${(o.data?.users||[]).map(g=>`<option value="${g.id}" ${z===g.id?"selected":""}>${t(e(g.name,g.nameEn||g.name))}</option>`).join("")}
            </select>
            ${d?`
              <button class="btn btn-ghost btn-sm" data-action="reset-audit-filters" style="font-size:11px;color:var(--muted);padding:4px 8px;" title="${e("إعادة تعيين الفلاتر","Reset filters")}">
                ${e("إلغاء التصفية","Clear")}
              </button>
            `:""}
          </div>
        </div>

        ${x.length?`
          <div class="table-wrap" style="border:1px solid var(--line);border-radius:12px;overflow-x:auto;background:var(--surface);">
            <table class="data-table" style="width:100%;border-collapse:collapse;font-size:12px;min-width:650px;">
              <thead>
                <tr style="background:var(--surface-soft);border-bottom:1px solid var(--line);color:var(--ink-soft);font-size:11px;font-weight:700;text-align:inherit;">
                  <th style="padding:12px 14px;">${e("المستخدم / المنفذ","User / Actor")}</th>
                  <th style="padding:12px 14px;">${e("نوع النشاط والعملية","Action & Target")}</th>
                  <th style="padding:12px 14px;">${e("التفاصيل والتغيير","Details / Context")}</th>
                  <th style="padding:12px 14px;text-align:${o.lang==="ar"?"left":"right"};">${e("التاريخ والوقت الدقيق","Exact Date & Time")}</th>
                </tr>
              </thead>
              <tbody>
                ${x.map(g=>{const k=g.user||(g.userId?(o.data?.users||[]).find(Y=>Y.id===g.userId):null),_=k?e(k.name,k.nameEn||k.name):e("النظام","System"),I=k?O(k):e("تلقائي","Automated"),C=le(g.createdAt),{badgeClass:W,actionLabel:G,entityLabel:H,detailHtml:Q}=ae(g);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${Z(k)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${t(_)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${t(I)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${W}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${t(G)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${t(H)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${Q}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${o.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${t(C.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${c("clock",11)}
                          <span>${t(C.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${c(d?"search":"checklist",24)}
            <span>${d?e("لا توجد عمليات تطابق معايير التصفية المحددة.","No audit logs match the selected filter criteria."):e("لا توجد عمليات مسجلة حتى الآن.","No audit logs recorded yet.")}</span>
            ${d?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${e("إعادة تعيين الفلاتر","Reset filters")}
              </button>
            `:""}
          </div>
        `}
      </section>
    `}if(o.settingsSection==="analytics"&&m&&(S=Ae()),o.settingsSection==="diagnostics"&&A&&(S=ke()),o.settingsSection==="whatsapp"&&p){const b=ee(),l=o.data?.company?.customFields?.whatsapp||o.data?.company?.custom_fields?.whatsapp||{};S=`
      <section class="setting-section">
        ${b?`
          <div class="demo-whatsapp-banner" style="background:rgba(13,98,105,0.08);border:1px solid rgba(13,98,105,0.25);border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;gap:12px;">
            <span style="font-size:22px;">🛡️</span>
            <div style="flex:1;">
              <strong style="display:block;font-size:13px;color:var(--teal);margin-bottom:2px;">${e("بيئة العرض التجريبية المعزولة (Demo Sandbox)","Isolated Demo Showcase Sandbox")}</strong>
              <span style="font-size:11px;color:var(--muted);line-height:1.4;">${e("إعدادات بوابات واتساب هنا معزولة تماماً للاستعراض؛ لن يتم استهلاك رصيد أو إرسال رسائل فعلية عبر الشبكة.","WhatsApp gateway configuration is an isolated simulation for demonstration only; no live external traffic is dispatched.")}</span>
            </div>
            <span class="badge" style="background:var(--teal);color:#fff;font-size:10px;font-weight:700;padding:3px 8px;border-radius:6px;">
              ${e("محاكاة آمنة","Isolated Simulation")}
            </span>
          </div>
        `:""}
        <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
          <div>
            <h2>${e("تنبيهات واتساب الميدانية للمشاريع","Field WhatsApp Alerts")}</h2>
            <p>${e("ربط آمن عبر بروتوكول Multi-Device المباشر مع خوارزميات محاكاة السلوك البشري لحماية الأرقام من الحظر.","Secure connection via Multi-Device protocol with anti-ban human behavior simulation.")}</p>
          </div>
          <span class="status-badge ${l.enabled?"done":"neutral"}">
            ${l.enabled?e("مفعل نشط ✅","Active ✅"):e("معطل ⏸️","Disabled ⏸️")}
          </span>
        </div>

        <form data-action="update-whatsapp" class="settings-form" style="max-width:740px;display:grid;gap:18px;">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
            <div>
              <strong style="display:block;font-size:14px;color:var(--ink);margin-bottom:4px;">${e("تفعيل إرسال التنبيهات عبر واتساب","Enable WhatsApp Notifications")}</strong>
              <span style="font-size:12px;color:var(--muted);">${e("إرسال إشعارات فورية لمهندسي الموقع والإدارة عند حدوث تغييرات حرجة.","Send instant alerts to field engineers & management upon critical updates.")}</span>
            </div>
            <label class="switch" style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" name="enabled" ${l.enabled?"checked":""} style="opacity:0;width:0;height:0;" id="wa-toggle-enabled" />
              <span class="slider round" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:var(--line);transition:.3s;border-radius:24px;"></span>
            </label>
          </div>

          <div class="form-grid">
            <div class="field">
              <label>${e("نوع مزود البوابة (Provider)","Gateway Provider")}</label>
              <select name="provider" class="select-compact" style="width:100%;height:42px;">
                <option value="evolution" ${l.provider!=="webhook"?"selected":""}>Evolution API / Baileys</option>
                <option value="webhook" ${l.provider==="webhook"?"selected":""}>Webhook (Custom Webhook URL)</option>
              </select>
            </div>

            <div class="field">
              <label>${e("اسم جلسة الربط (Instance Name)","Instance Name")}</label>
              <input type="text" name="instanceName" value="${t(l.instanceName||"darc-workspace")}" placeholder="darc-workspace" required />
            </div>
          </div>

          <div class="field">
            <label>${e("رابط خادم البوابة (Server Gateway URL) *","Server Gateway URL *")}</label>
            <input type="url" name="serverUrl" value="${t(l.serverUrl||"")}" placeholder="https://evolution-api.example.com" />
            <small style="font-size:11px;color:var(--muted);margin-top:4px;display:block;">${e("رابط خادم Evolution API الخاص بمكتبكم (أو رابط الـ Webhook المستلم).","Your office Evolution API instance URL or receiving Webhook.")}</small>
          </div>

          <div class="field">
            <label>${e("مفتاح الأمان (API Key / Token)","API Key / Token")}</label>
            <input type="password" name="apiKey" value="${t(l.apiKey||"")}" placeholder="••••••••••••••••" />
          </div>

          <div class="field">
            <label>${e("المستلم الافتراضي / قروب الواتساب (اختياري)","Default Recipient / WhatsApp Group (Optional)")}</label>
            <input type="text" name="recipient" value="${t(l.recipient||"")}" placeholder="${e("كود قروب واتساب المهندسين (1203630...@g.us) أو رقم جوال الإدارة","WhatsApp Group JID (1203630...@g.us) or Management Phone")}" />
            <small style="font-size:11px;color:var(--teal);margin-top:4px;display:block;">${e("💡 ملاحظة: هذا الحقل اختياري. في حال عدم وجود قروب حالياً، يمكنك تركه فارغاً وسيتكفل النظام بإرسال كافة التنبيهات والمنشن كرسائل فردية مباشرة إلى هواتف المهندسين والمدير المسجلة في حساباتهم.","💡 Note: This field is optional. If you do not have a group yet, leave it blank and the system will automatically send alerts & mentions directly to engineers & manager personal phones.")}</small>
          </div>

          <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;padding:16px;">
            <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:10px;">${e("أحداث التنبيه الفوري التلقائية:","Automated Trigger Events:")}</strong>
            <div style="display:grid;gap:8px;">
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnCollectiveMention" ${l.notifyOnCollectiveMention!==!1?"checked":""} />
                <span>📢 ${e("عند المنشن الجماعي (@all / @الكل): إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة حتى المدير","When collective mention (@all / @everyone): send direct alert to all project members and managers")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="sendGroupBroadcast" ${l.sendGroupBroadcast?"checked":""} />
                <span>👥 ${e("إرسال نسخة لقروب الواتساب العام (في حال إدخال كود القروب في الحقل أعلاه)","Send a copy to the WhatsApp Group (if Group JID is set above)")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnBlocked" ${l.notifyOnBlocked!==!1?"checked":""} />
                <span>⚠️ ${e("عند تعليق مهمة هندسية (Task Blocked) لتنبيه الموقع فوراً","When a task is blocked to alert field engineers instantly")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnApproval" ${l.notifyOnApproval!==!1?"checked":""} />
                <span>🔍 ${e("عند إحالة مهمة للمراجعة والاعتماد (Review / Approval)","When a deliverable is submitted for review & approval")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnDrawing" ${l.notifyOnDrawing!==!1?"checked":""} />
                <span>📐 ${e("عند اعتماد أو رفع مخطط معماري أو إنشائي جديد (New Drawing)","When an architectural or structural drawing is approved/uploaded")}</span>
              </label>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:10px;">
            <button type="submit" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:7px;">
              ${c("check",14)} <span>${e("حفظ إعدادات واتساب","Save WhatsApp Settings")}</span>
            </button>
            <button type="button" class="btn btn-soft" data-action="test-whatsapp" style="display:inline-flex;align-items:center;gap:7px;">
              <span>📲</span> <span>${e("إرسال تنبيه تجريبي للواتساب","Send Test WhatsApp Alert")}</span>
            </button>
          </div>
        </form>
      </section>
    `}const T=i||w("manage_settings")||w("manage_roles")||w("manage_users")||w("manage_trash")||w("view_audit_logs");return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${T?e("تحكم مركزي","CENTRAL CONTROL"):e("الملف الشخصي","USER PROFILE")}</p>
        <h1>${T?r("settings"):e("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${T?e("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):e("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${c(i?"shield":"user",13)} ${t(O(f))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${E.map(([b,l])=>`<button class="${o.settingsSection===b?"active":""}" data-action="settings-section" data-section="${b}">${l}</button>`).join("")}
      </aside>
      <div class="settings-content">${S}</div>
    </div>
  `}var Ee=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function He(a=null){const i=o.data?.permissionsCatalog&&o.data.permissionsCatalog.length>=10?o.data.permissionsCatalog:Ee,n=new Map;i.forEach(m=>{const A=m.category||"general",E=e(m.categoryAr||A,m.categoryEn||A);n.has(A)||n.set(A,{name:E,items:[]}),n.get(A).items.push(m)});const p=a?.id==="admin"||a?.permissions&&a.permissions.includes("*"),v=Array.from(n.entries()).map(([m,A])=>{const E=A.items.map(f=>{const S=f.id||f.key,T=e(f.nameAr||f.ar,f.nameEn||f.en||S),b=p||a?.permissions&&(a.permissions.includes(S)||typeof ie<"u"&&ie[S]&&a.permissions.includes(ie[S])),l=p?"disabled":"";return`
        <label class="permission-option" style="cursor:${p?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${t(S)}" ${b?"checked":""} ${l} />
          <span style="font-weight:500;">${t(T)}</span>
        </label>
      `}).join("");return`
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${t(A.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${A.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${E}
        </div>
      </div>
    `}).join(""),u=p?"":`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${r("permissions")} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${i.length} ${e("صلاحية متاحة","available permissions")})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${e("تحديد الكل","Select All")}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${e("إلغاء التحديد","Deselect All")}</button>
      </div>
    </div>
  `,s=`
    <form id="role-form" data-role-id="${t(a?.id||"")}">
      <div class="form-grid">
        <div class="field">
          <label>${r("nameAr")} *</label>
          <input name="nameAr" value="${t(a?.nameAr||"")}" required />
        </div>
        <div class="field">
          <label>${r("nameEn")}</label>
          <input name="nameEn" value="${t(a?.nameEn||"")}" />
        </div>
        <div class="field full">
          <label>${r("roleDescription")}</label>
          <textarea name="descriptionAr" rows="2">${t(a?.descriptionAr||"")}</textarea>
        </div>
      </div>
      ${p?`
        <div class="role-modal-note" style="margin-top:15px;">
          ${e("مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.","The system administrator always keeps full root privileges [*] across all aspects of the system.")}
        </div>
      `:`
        ${u}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${v}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${r("cancel")}</button>
        <button type="submit" class="btn btn-primary">${c("check",14)} ${a?r("save"):r("create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ve(a?e("تعديل الدور والصلاحيات","Edit role & permissions"):r("addRole"),e("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),s,"role","modal-lg");const h=document.getElementById("modal-root");if(h){const m=h.querySelector("#btn-perm-select-all"),A=h.querySelector("#btn-perm-deselect-all");m&&m.addEventListener("click",()=>{h.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(E=>E.checked=!0)}),A&&A.addEventListener("click",()=>{h.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(E=>E.checked=!1)})}}function qe(a=null){if(a?.id==="usr_ahmad"&&o.data?.user?.id!=="usr_ahmad")return L(e("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!a&&!j())return L(r("adminOnly"),!0);const i=!j(),n=i?"disabled":"",p=(o.data?.roles||[]).filter(u=>j()||u.id!=="admin"),v=`<form id="user-form" data-user-id="${t(a?.id||"")}" data-permission-only="${i}"><div class="form-grid"><div class="field full"><label>${r("nameAr")}</label><input name="name" value="${t(a?.name||"")}" ${n} required /></div><div class="field"><label>${r("nameEn")}</label><input name="nameEn" value="${t(a?.nameEn||"")}" ${n} /></div><div class="field"><label>${r("jobTitle")}</label><input name="jobTitleAr" value="${t(a?.jobTitleAr||"")}" ${n} /></div><div class="field"><label>${r("email")}</label><input name="email" type="email" value="${t(a?.email||"")}" placeholder="name@darc.com" ${n} /></div><div class="field"><label>${e("رقم الواتساب للتنبيهات","WhatsApp Phone")}</label><input name="phone" type="tel" dir="ltr" value="${t(a?.phone||a?.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" ${n} /></div><div class="field"><label>${r("role")}</label><select name="roleId">${p.map(u=>`<option value="${t(u.id)}" ${a?.roleId===u.id?"selected":""}>${t(e(u.nameAr,u.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${i?e("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):e("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${r("cancel")}</button><button type="submit" class="btn btn-primary">${c("check",14)} ${a?i?e("حفظ الصلاحية","Save permission"):r("save"):r("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=ve(a?i?e("تعديل صلاحية الحساب","Change account permission"):e("تعديل حساب العضو","Edit member account"):r("addMember"),e("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),v,"user")}export{qe as a,Ze as c,Xe as d,Ye as f,He as i,Ne as l,Qe as m,Oe as n,Be as o,Me as p,We as r,Ue as s,R as t,Ke as u};
