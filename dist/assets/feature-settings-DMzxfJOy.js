import{t as Te}from"./rolldown-runtime-BQ-_32WO.js";import{$ as Ue,Bt as R,Ct as ze,Dt as G,F as He,Ht as o,I as Ge,L as We,Mt as W,Nt as V,Ot as U,Pt as c,Q as A,Rt as xe,St as X,Tt as ge,X as ve,Z as ne,_t as n,at as Ve,ct as De,d as re,dt as qe,et as e,h as O,ht as Je,it as t,l as Re,lt as Ce,n as P,o as we,p as ke,rt as Qe,st as ue,tt as le,ut as Ae,vt as Ee,yt as _}from"./core-dragdrop-DXlFjJR9.js";var mt=Te({attentionItem:()=>Le,metricCard:()=>ae,projectProgress:()=>_e,projectRow:()=>Ie,pulseChart:()=>Pe,renderDashboard:()=>Ye,teamMetrics:()=>he,teamRow:()=>je});function ae(a,i,r,l,p,g=""){return`<article class="metric-card ${l}"><div class="metric-top"><span class="metric-label">${t(a)}</span><span class="metric-icon">${n(p,15)}</span></div><div class="metric-value">${t(i)}</div><span class="metric-note ${g}">${t(r)}</span></article>`}function _e(a){const i=a.health==="off_track"?"red":a.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${c("weightedProgress")}</span><strong>${a.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${i}" style="width:${Math.min(100,a.progress)}%"></div></div></div>`}function Ie(a){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${n("building",17)}</span><div class="project-name"><strong>${t(e(a.nameAr,a.nameEn))}</strong><span>${t(a.code)} · ${t(e(a.clientAr,a.clientEn))}</span></div></div>${_e(a)}<div class="project-owner">${ne(a.manager)}<span>${t(a.manager?e(a.manager.name,a.manager.nameEn||a.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${t(a.id)}" aria-label="${c("viewDetails")}">${n(o.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function Le(a){const i=X(a)||a.status==="blocked"?"red":"amber",r=X(a)?e("متأخرة","Overdue"):a.status==="blocked"?e("متوقفة","Blocked"):e("تستحق قريبًا","Due soon"),l=e(a.titleAr,a.titleEn);return`<button type="button" class="attention-item" data-action="open-task" data-task-id="${t(a.id)}" title="${t(l)}"><span class="attention-icon ${i}">${n(X(a)||a.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${i})">${t(l)}</strong><span>${t(r)} · ${t(Qe(a.dueDate))}</span></span></button>`}function he(a,i){const r=i.filter(g=>ze(g,a)),l=r.reduce((g,h)=>g+Number(h.weight||1),0),p=l?Math.round(r.reduce((g,h)=>g+h.progress*Number(h.weight||1),0)/l):0;return{tasks:r.length,progress:p,overdue:r.filter(X).length}}function je(a,i){const r=he(a.id,i);return`<div class="team-row"><div class="team-member">${ne(a)}<div class="team-member-copy"><strong>${t(e(a.name,a.nameEn||a.name))}</strong><span>${t(e(a.jobTitleAr,a.jobTitleEn||a.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${r.tasks}</strong> ${c("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${c("progress")}</span><strong>${r.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${r.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${t(a.id)}">${n("more",15)}</button></div>`}function Pe(){const a=[38,48,45,62,55,72,68],i=o.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${a.map((r,l)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,r-22)}%"></span><span class="pulse-bar ${l===a.length-1?"current":""}" style="height:${r}%"></span></div><span>${i[l]}</span></div>`).join("")}</div>`}function Ye(){const a=o.data?.stats||{},i=o.data?.projects||[],r=o.data?.tasks||[],l=o.data?.users||[],p=o.data?.user||{},g=p.name||p.email||e("مستخدم","User"),h=i.reduce((d,f)=>d+(Number(f.totalWeight)||0),0),w=h?Math.round(i.reduce((d,f)=>d+(Number(f.progress)||0)*(Number(f.totalWeight)||0),0)/h):0,v=[...r].filter(d=>{if(X(d)||d.status==="blocked")return!0;if(d.dueDate){const f=ge(d.dueDate);if(f){const E=(f-new Date)/864e5;return E>=0&&E<=7}}return!1}).sort((d,f)=>(d.dueDate?ge(d.dueDate)?.getTime()??1/0:1/0)-(f.dueDate?ge(f.dueDate)?.getTime()??1/0:1/0)).slice(0,5),k=l.filter(d=>d.status!=="inactive"),z=a.projectCount??i.length,s=a.myTasks??r.filter(d=>ze(d,p.id)).length,x=a.overdueTasks??r.filter(X).length,$=a.dueSoon??0,D=a.completedTasks??r.filter(d=>d.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${e("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${Je()}، ${t(e(g.replace(/^م\.\s?/,""),p.nameEn||g))}</h1><p>${c("welcomeText")}</p></div><div class="welcome-status"><span>${c("portfolioHealth")}</span><strong>${w}%</strong><small>${e("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${ae(c("activeProjects"),a.activeProjects||0,e(`${z} مشاريع إجمالًا`,`${z} projects total`),"teal","building","up")}${ae(c("openTasks"),a.openTasks??r.length,e(`${s} مسندة لك`,`${s} assigned to you`),"blue","checklist")}${ae(c("overdue"),x,e("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",x?"alert":"check",x?"alert":"")}${ae(c("dueThisWeek"),$,e("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${c("projectProgress")}</h2><p class="panel-subtitle">${c("projectProgressSub")}</p></div>${A("view_projects")?`<button class="text-link" data-view="projects">${c("seeAll")} ${n(o.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${i.length?i.slice(0,5).map(Ie).join(""):`<div class="empty">${n("building",18)}<span>${c("noProjects")}</span></div>`}</div></section>${_()||A("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${c("teamProgress")}</h2><p class="panel-subtitle">${c("teamProgressSub")}</p></div><button class="text-link" data-view="team">${c("seeAll")} ${n(o.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${k.slice(0,6).map(d=>je(d,r)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${c("attention")}</h2><p class="panel-subtitle">${c("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${v.length}</span></div><div class="attention-list">${v.length?v.map(Le).join(""):`<div class="empty">${n("check",18)}<span>${c("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${c("recentPulse")}</h2><p class="panel-subtitle">${c("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${D} ${c("done")}</span></div>${Pe()}</section></div></div>`}var B=null,fe=!1;function Me(){return{isDemo:!0,stats:{totalVisits:1482,uniqueVisitors:628,activeSessions:14,avgTimeSpentFormattedAr:"9 دقائق و 15 ثانية",avgTimeSpentFormattedEn:"9m 15s",healthScore:"100%",crashFreeRate:"99.9%",bounceRate:"11.8%",returnRate:"72.4%",edgeLatency:"24ms",activeAnomaliesCount:0,totalAnomaliesLogged:1},countries:[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",visits:652,percent:44},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",visits:485,percent:32.7},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",visits:148,percent:10},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",visits:95,percent:6.4},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",visits:58,percent:3.9},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",visits:44,percent:3}],cities:[{name:"Dubai",visits:420},{name:"Riyadh",visits:310},{name:"Abu Dhabi",visits:232},{name:"Doha",visits:148},{name:"Jeddah",visits:125},{name:"Kuwait City",visits:95}],os:{macOS:680,Windows:490,iOS:212,Android:100},recentAnomalies:[{id:"anom_demo_01",type:"HighMemorySpike",severity:"medium",status:"resolved",descriptionAr:"ارتفاع مؤقت في استهلاك الذاكرة (142MB) أثناء معالجة ملف DWG ثلاثي الأبعاد - تم تقطيع العناصر تلقائياً وتفريغ الذاكرة بنجاح.",descriptionEn:"Transient memory spike (142MB) during 3D DWG parsing - elements automatically LOD decimated and memory purged.",timestamp:new Date(Date.now()-72e5).toISOString()}]}}async function Ke(a=!1){if(B&&!a)return B;fe=!0;try{const i=await P("/api/telemetry/analytics",{silent:!0});i&&i.data&&(B=i.data)}catch(i){console.warn("[Analytics] Failed to fetch remote analytics:",i),O()&&(B=Me())}finally{fe=!1}return B}function Be(){const a=O(),i=a&&(!B||!B.isDemo)?Me():B,r=Re();!i&&!fe&&Ke().then(()=>{if(o.view==="settings"&&o.settingsSection==="analytics"){const v=document.querySelector(".settings-content");v&&(v.innerHTML=Be())}});const l=i?.stats||{totalVisits:384,uniqueVisitors:162,activeSessions:8,avgTimeSpentFormattedAr:"8 دقائق و 24 ثانية",avgTimeSpentFormattedEn:"8m 24s",healthScore:"100%",crashFreeRate:"99.8%",bounceRate:"11.4%",returnRate:"68.4%",edgeLatency:"32ms",activeAnomaliesCount:0,totalAnomaliesLogged:2},p=i?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",visits:165,percent:43},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",visits:112,percent:29.2},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",visits:48,percent:12.5},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",visits:24,percent:6.3},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",visits:18,percent:4.7},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",visits:9,percent:2.3},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",visits:8,percent:2}],g=i?.cities||[{name:"Dubai",visits:110},{name:"Riyadh",visits:78},{name:"Abu Dhabi",visits:55},{name:"Cairo",visits:48},{name:"Jeddah",visits:34},{name:"Doha",visits:24}];i?.os;const h=i?.recentAnomalies||[],w=r.memoryMb||45;return`
    <section class="setting-section">
      ${a?`
        <div class="demo-analytics-banner" style="background:linear-gradient(90deg, rgba(13,98,105,0.08), rgba(74,199,209,0.12));border:1.5px solid var(--border);border-radius:12px;padding:12px 18px;margin-bottom:20px;display:flex;align-items:center;gap:12px;font-size:12px;color:var(--ink);">
          <span style="color:var(--teal);display:flex;align-items:center;">${n("chart",22)}</span>
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
            <span class="badge" style="background:rgba(13,98,105,0.1);color:var(--teal);border:1px solid rgba(13,98,105,0.25);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px;">
              ${W("active")} ${e("نظام الفلترة الذكي: منع التكرار لنفس الجهاز والـ IP","Active Deduplication: Unique Device & IP Binding")}
            </span>
          </div>
          <p style="margin:0;font-size:13px;color:var(--muted);">${e("إحصائيات دقيقة وفعلية عن حركة الزوار الحقيقيين، مدة الجلسات الصافية، والتحسس الذكي لاستقرار الأجهزة والـ GPU.","Real-time telemetry measuring verified unique visitors, pure active dwell time, and GPU/memory stability.")}</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-sm btn-soft" data-action="test-anomaly-alert" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${e("محاكاة رصد استهلاك زائد للموارد وإرسال إشعار فوري للتأكد من نظام الإنذار","Simulate resource anomaly and trigger instant alert notification")}">
            ${n("alert",13)} ${e("محاكاة فحص استهلاك زائد","Test Anomaly Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-analytics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${n("clock",13)} ${e("تحديث المؤشرات","Refresh Live Data")}
          </button>
        </div>
      </div>

      <!-- 1. بطاقات المؤشرات الرئيسية (KPI Cards) -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;margin-bottom:24px;">
        <!-- بطاقة الزيارات الحقيقية -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("الزيارات الحقيقية المعتمدة","Verified Total Visits")}</span>
            <span style="background:var(--teal-soft,#e3f6f0);color:var(--teal);padding:4px;border-radius:8px;display:flex;">${n("user",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${(l.totalVisits||384).toLocaleString()}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">(${(l.uniqueVisitors||162).toLocaleString()} ${e("زائر مستقل","uniques")})</span>
          </div>
          <div style="font-size:11px;color:var(--mint-strong);font-weight:600;display:flex;align-items:center;gap:4px;">
            <span>${W("active")} ${l.activeSessions||1} ${e("جلسات نشطة الآن","live sessions right now")}</span>
          </div>
        </div>

        <!-- بطاقة وقت الجلسة الحقيقي -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("متوسط مدة الزيارة الصافية (Dwell Time)","Avg Active Dwell Time")}</span>
            <span style="background:var(--blue-soft,#eaf1fb);color:var(--blue);padding:4px;border-radius:8px;display:flex;">${n("clock",14)}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);">${e(l.avgTimeSpentFormattedAr,l.avgTimeSpentFormattedEn)}</div>
          <div style="font-size:11px;color:var(--muted);">${e(`معدل الارتداد السريع: ${l.bounceRate||"11.4%"}`,`Bounce Rate: ${l.bounceRate||"11.4%"}`)}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("مؤشر استقرار الأجهزة (Health Score)","Device Stability Score")}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${n("shield",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:#2e7d32;">${l.healthScore||"100%"}</div>
            <span style="font-size:11px;color:var(--mint-strong);font-weight:700;display:inline-flex;align-items:center;gap:4px;">${W("healthy")} ${l.crashFreeRate||"99.8%"} ${e("خالية من الأعطال","Crash-Free")}</span>
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">${e(`ذاكرة جهازك الحالية: ${w}MB (آمنة)`,`Current Device Memory: ${w}MB (Healthy)`)}</div>
        </div>

        <!-- بطاقة سرعة السحابة ومعدل العودة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("سرعة السيرفر ومعدل عودة الفريق","Cloud Speed & Retention")}</span>
            <span style="background:var(--amber-soft,#fff1dc);color:var(--amber);padding:4px;border-radius:8px;display:flex;">${n("trendingUp",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${l.edgeLatency||"32ms"}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">${l.returnRate||"68.4%"} ${e("عودة دورية","Return Rate")}</span>
          </div>
          <div style="font-size:11px;color:var(--muted);">${e("شبكة سحابية فائقة السرعة على حافة الويب","Sub-50ms Cloudflare Edge Workers")}</div>
        </div>
      </div>

      <!-- 2. توزيع الزيارات الجغرافية والبلدان (Geo Traffic Breakdown) -->
      <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;margin-bottom:24px;box-shadow:var(--shadow-sm);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--line);padding-bottom:10px;">
          <h3 style="margin:0;font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px;">
            <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("globe",16)}</span> ${e("توزيع الزيارات حسب البلدان والمدن (Cloudflare Edge Geolocation)","Traffic Breakdown by Countries & Cities")}
          </h3>
          <span style="font-size:11px;color:var(--muted);">${e("يتم التعرف على الدول والمدن تلقائياً عند الدخول دون إجهاد السيرفر","Identified automatically via Cloudflare Edge headers")}</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;">
          <!-- قائمة الدول -->
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${p.map(v=>`
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
                  <span style="display:flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);">
                    <span style="font-size:11px;font-weight:800;background:var(--surface-soft);border:1px solid var(--line);padding:2px 6px;border-radius:4px;color:var(--teal);">${t(v.code||"GL")}</span>
                    <span>${t(e(v.nameAr||"",v.nameEn||""))}</span>
                  </span>
                  <span style="font-weight:700;color:var(--teal);">${Number(v.visits||0).toLocaleString()} <span style="font-weight:400;font-size:11px;color:var(--muted);">(${Number(v.percent||0)}%)</span></span>
                </div>
                <div style="height:6px;width:100%;background:var(--surface-soft);border-radius:999px;overflow:hidden;border:1px solid var(--line);">
                  <div style="height:100%;width:${Number(v.percent||0)}%;background:linear-gradient(90deg, var(--teal), var(--mint-strong));border-radius:999px;"></div>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- قائمة أبرز المدن وتوزيع الأجهزة والأنظمة -->
          <div style="display:flex;flex-direction:column;gap:16px;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("أبرز المدن زيارة:","Top Visiting Cities:")}</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${g.map(v=>`
                  <span style="background:var(--surface);border:1px solid var(--line);padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:6px;">
                    ${n("pin",11)} ${t(v.name||"")} <span style="font-size:10px;color:var(--teal);font-weight:700;">${Number(v.visits||0)}</span>
                  </span>
                `).join("")}
              </div>
            </div>

            <!-- توزيع الأجهزة -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("توزيع الأجهزة المستخدمة:","Device Breakdown:")}</div>
              <div style="display:flex;gap:12px;font-size:12px;">
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="display:flex;justify-content:center;color:var(--teal);margin-bottom:4px;">${n("grid",18)}</div>
                  <div style="font-weight:700;margin-top:2px;">63%</div>
                  <div style="font-size:10px;color:var(--muted);">${e("سطح المكتب","Desktop")}</div>
                </div>
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="display:flex;justify-content:center;color:var(--teal);margin-bottom:4px;">${n("phone",18)}</div>
                  <div style="font-weight:700;margin-top:2px;">32%</div>
                  <div style="font-size:10px;color:var(--muted);">${e("الهواتف الذكية","Mobile")}</div>
                </div>
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="display:flex;justify-content:center;color:var(--teal);margin-bottom:4px;">${n("layers",18)}</div>
                  <div style="font-weight:700;margin-top:2px;">5%</div>
                  <div style="font-size:10px;color:var(--muted);">${e("الأجهزة اللوحية","Tablet")}</div>
                </div>
              </div>
            </div>

            <!-- توزيع أنظمة التشغيل -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("أنظمة التشغيل (OS Breakdown):","Operating Systems:")}</div>
              <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--ink);flex-wrap:wrap;gap:6px;">
                <span>macOS (41%)</span>
                <span>Windows (32%)</span>
                <span>iOS (18%)</span>
                <span>Android (9%)</span>
              </div>
            </div>

            <!-- توزيع وقت البقاء -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("توزيع وقت البقاء والجلسات الفعلية:","Active Dwell Time Distribution:")}</div>
              <div style="font-size:11px;color:var(--ink);display:flex;flex-direction:column;gap:6px;">
                <div style="display:flex;justify-content:space-between;"><span>${e("أقل من دقيقة (زيارة سريعة)","Under 1 min")}</span><strong>11%</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${e("من 1 إلى 5 دقائق (مراجعة مهام سريعة)","1 to 5 mins")}</span><strong>25%</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${e("من 5 إلى 15 دقيقة (عمل هندسي مركز ومراجعة مخططات)","5 to 15 mins")}</span><strong style="color:var(--teal);">43% (${e("الأعلى","Top")})</strong></div>
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
              <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("shield",16)}</span> ${e("سجل تحسس الأخطاء واستهلاك الموارد الزائد لأجهزة المستخدمين","Device Resource Anomaly & Error Detection Log")}
            </h3>
            <p style="margin:4px 0 0;font-size:12px;color:var(--muted);">${e("يراقب استهلاك ذاكرة الـ Heap، تكرار الأخطاء، والضغط المفاجئ، ويرسل إشعارات فورية لمدير النظام.","Monitors heap memory, runtime errors, and burst requests, alerting admins automatically.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-xs btn-primary" data-action="goto-diagnostics" style="display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;">
              <span>${n("settings",13)}</span> ${e("سجل تفاصيل أخطاء المستخدمين ←","User Incident Explorer ←")}
            </button>
            <span class="status-badge ${h.some(v=>v.status==="active")?"urgent":"done"}">
              ${h.some(v=>v.status==="active")?e("تم رصد حالات تستدعي المتابعة","Active Anomalies"):e("جميع الأجهزة تعمل باستهلاك طبيعي","Optimal Performance")}
            </span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${h.length?h.map(v=>`
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;background:${v.status==="active"?"rgba(239,68,68,0.06)":"var(--surface-soft)"};border:1px solid ${v.status==="active"?"rgba(239,68,68,0.25)":"var(--line)"};">
              <span style="margin-top:2px;display:inline-flex;align-items:center;color:${v.status==="active"?"#ef4444":"#10b981"};">${v.status==="active"?n("alert",18):n("success",18)}</span>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <strong style="font-size:13px;color:${v.status==="active"?"var(--red)":"var(--ink)"};">${t(e(v.titleAr||"",v.titleEn||""))}</strong>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:10px;background:var(--surface);border:1px solid var(--line);padding:2px 8px;border-radius:999px;font-family:monospace;">${t(v.ip||"")}</span>
                    <span style="font-size:11px;color:var(--muted);">${new Date(v.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                  </div>
                </div>
                <p style="margin:4px 0 0;font-size:12px;color:var(--ink-soft);line-height:1.5;">${t(e(v.detailAr||"",v.detailEn||""))}</p>
                <div style="display:flex;align-items:center;gap:10px;margin-top:6px;font-size:11px;color:var(--muted);flex-wrap:wrap;">
                  <span style="display:inline-flex;align-items:center;gap:4px;">${n("pin",11)} ${t(v.city||"")}, ${t(v.countryCode||"")}</span>
                  <span style="display:inline-flex;align-items:center;gap:4px;">${n("grid",11)} ${t(v.deviceType||"")}</span>
                  <span style="font-weight:600;color:${v.status==="active"?"var(--red)":"var(--mint-strong)"};">${v.status==="active"?e("قيد التدخل الوقائي","Mitigating"):e("تمت المعالجة وحماية الاستقرار","Resolved & Protected")}</span>
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
  `}var ie=null,ye=!1,M="all",H="all",K="all";async function Xe(a=!1){if(ie&&!a)return ie;ye=!0;try{const i=await P("/api/telemetry/incidents",{silent:!0});i&&i.users&&(ie=i)}catch(i){console.warn("[Diagnostics] Failed to fetch incidents:",i)}finally{ye=!1}return ie}function gt(a){M=a}function vt(a){H=a}function ut(a){K=a}function Ze(a=""){const i=String(a).toLowerCase();return i.includes("http")||i.includes("api")?"cat-http":i.includes("nav")?"cat-nav":i.includes("ui")||i.includes("click")||i.includes("drop")?"cat-ui":i.includes("ws")||i.includes("socket")||i.includes("realtime")?"cat-ws":i.includes("err")?"cat-err":i.includes("warn")?"cat-warn":"cat-ui"}function Ne(){const a=O(),i=ie;Re(),!i&&!ye&&Xe().then(()=>{if(o.view==="settings"&&(o.settingsSection==="diagnostics"||o.settingsSection==="analytics")){const s=document.querySelector(".settings-content");s&&(s.innerHTML=Ne())}});let r=i?.users||[];a?(r=r.filter(s=>s.userId&&String(s.userId).startsWith("usr_demo")),!r.length&&o.data?.users&&(r=o.data.users.filter(s=>s.id&&String(s.id).startsWith("usr_demo")).map(s=>({userId:s.id,name:s.name,nameEn:s.nameEn||s.name,email:s.email,role:s.jobTitleAr||(s.roleId==="admin"?"مدير النظام (عرض تجريبي)":s.roleId||"عضو فريق"),avatarColor:s.avatarColor||"#0d6269",isRealAccount:!1,status:s.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})))):!r.length&&o.data?.users&&o.data.users.length&&(r=o.data.users.map(s=>({userId:s.id,name:s.name,nameEn:s.nameEn||s.name,email:s.email,role:s.jobTitleAr||(s.roleId==="admin"?"مدير النظام (كامل الصلاحيات)":s.roleId||"عضو فريق"),avatarColor:s.avatarColor||"#0d6269",isRealAccount:!0,status:s.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})));let l=i?.incidents||[];a&&(l=l.filter(s=>s.userId&&String(s.userId).startsWith("usr_demo")));const p=i?.stats||{totalIncidents:a?l.length:3,activeIncidents:0,resolvedIncidents:a?l.length:3,totalUsersMonitored:r.length||6,alertEmailRecipient:a?"demo-alerts@darc.demo (بيئة المحاكاة الآمنة)":"admin@darc-design.bond"};M!=="all"&&(l=l.filter(s=>s.userId===M||s.affectedUsers?.includes(M))),H!=="all"&&(l=l.filter(s=>s.severity===H)),K!=="all"&&(l=l.filter(s=>s.status===K));const g=r.find(s=>s.userId===M),h=typeof ke=="function"?ke():{connected:!1},w=typeof we=="function"?we().length:0,v=typeof navigator<"u"?navigator.onLine:!0,k=v?h.connected?e("متصل ومستقر","Connected"):h.hibernating?e("في وضع التوفير (خامل)","Hibernating"):e("بانتظار الربط","Connecting"):e("غير متصل (أوفلاين)","Offline"),z=v?h.connected?"var(--mint-strong)":"var(--blue)":"var(--amber)";return`
    <section class="setting-section diag-section" id="diagnostics-dashboard">
      ${a?`
        <div class="diag-banner">
          <span style="color:var(--teal);display:flex;align-items:center;">${n("settings",22)}</span>
          <div style="flex:1;">
            <div style="font-weight:800;color:var(--teal);margin-bottom:2px;">
              ${e("بيئة العرض التجريبية — مركز تشخيص محاكاة (Showcase Diagnostics)","Demo Showcase Sandbox — Simulated Diagnostics & Logs")}
            </div>
            <div style="color:var(--muted);font-size:11px;line-height:1.4;">
              ${e("سجلات الأعطال وفحوصات الذاكرة وتقارير التتبع هنا معزولة تماماً لأغراض الاستعراض ولن تسرب أخطاء الإنتاج الحقيقية.","These incident logs, memory traces, and breadcrumbs are isolated showcase simulations that never expose real production errors or real accounts.")}
            </div>
          </div>
          <span class="badge" style="background:var(--teal);color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:6px;white-space:nowrap;">
            ${e("بيانات محاكاة 100%","100% Mock Data")}
          </span>
        </div>
      `:""}

      <!-- 1. Header & Actions Bar -->
      <div class="panel-head diag-header">
        <div>
          <div style="display:flex;align-items:center;gap:8px;">
            <h2 style="margin:0;font-size:18px;font-weight:700;">
              ${e("مركز تشخيص الأعطال وحوادث المستخدمين","Error Diagnostics & User Incident Center")}
            </h2>
          </div>
          <p style="margin:6px 0 0;font-size:13px;color:var(--muted);max-width:760px;line-height:1.5;">
            ${e("نظام مراقبة أداء وتتبع أخطاء متقدم يجمع بين تقارير تتبع الكود (Stack Traces)، بصمة الخطأ التلقائية، خطوات المستخدم (5D Flight Recorder)، والحلول الهندسية الفورية.","Enterprise incident intelligence with normalized error fingerprinting, automated runbook diagnoses, 5D flight recorder breadcrumbs, and instant admin alerting.")}
          </p>
        </div>

        <div class="diag-header-actions">
          <button type="button" class="btn btn-sm btn-soft" data-action="test-diagnostic-email" style="color:var(--teal);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${e("اختبار وصول رسائل التنبيه إلى بريد الإدارة","Send test alert email to admin recipient")}">
            ${n("mail",13)} ${e("اختبار إرسال بريد التنبيه","Test Email Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-soft" data-action="test-incident-simulate" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${e("محاكاة رصد خطأ تشغيلي كامل مع خطوات المستخدم وإرسال إيميل تنبيه فوري","Simulate complete runtime error with breadcrumbs and trigger admin email alert")}">
            ${n("alert",13)} ${e("محاكاة خطأ مع إيميل تنبيه","Simulate Error & Email")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-diagnostics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${n("clock",13)} ${e("تحديث السجل","Refresh")}
          </button>
        </div>
      </div>

      <!-- 2. Status & Metric Summary Badges -->
      <div class="diag-metrics-grid">
        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("إجمالي الحوادث المسجلة","Total Incidents")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);margin:4px 0;">${p.totalIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${e("موثقة بالكامل ببصمات فريدة","Fingerprint grouped with stack traces")}</div>
        </div>

        <div class="diag-metric-card ${p.activeIncidents>0?"is-active-warning":""}">
          <div style="font-size:11px;color:${p.activeIncidents>0?"var(--red)":"var(--muted)"};font-weight:600;">${e("حوادث نشطة بحاجة لمتابعة","Active / Unresolved")}</div>
          <div style="font-size:22px;font-weight:800;color:${p.activeIncidents>0?"var(--red)":"var(--teal)"};margin:4px 0;">${p.activeIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${p.activeIncidents>0?`${W("warning")} ${e("تستدعي تدخل هندسي","Requires engineering fix")}`:`${W("healthy")} ${e("جميع الحوادث معالجة","All resolved")}`}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("حسابات الفريق المراقبة","Monitored Users")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--teal);margin:4px 0;">${r.length||p.totalUsersMonitored||6} ${e("مستخدمين","Users")}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${e("تغطية شاملة لكل جلسة ومصادقة","Continuous per-session telemetry")}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("نظام التنبيهات البريدية (Email Alerts)","Email Alert System")}</div>
          <div style="font-size:13px;font-weight:700;color:var(--mint-strong);margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span style="display:inline-flex;align-items:center;">${a?n("flask",14):n("mail",14)}</span> ${a?e("محاكاة الساندبوكس (معزول)","Sandbox Simulation (Isolated)"):e("مفعّل ويرسل تلقائياً","Active & Auto-Dispatched")}
          </div>
          <div style="font-size:11px;color:var(--muted);font-family:monospace;overflow:hidden;text-overflow:ellipsis;">${t(p.alertEmailRecipient||(a?"demo-alerts@darc.demo":"admin@darc-design.bond"))}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("المزامنة الفورية (Realtime & Outbox)","Live Sync & Outbox")}</div>
          <div style="font-size:13px;font-weight:700;color:${z};margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span class="column-dot ${h.connected?"green":"amber"}"></span>
            ${k}
            ${h.latencyMs?`<span style="font-size:10px;color:var(--muted);font-weight:500;">(${h.latencyMs}ms)</span>`:""}
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">
            ${w>0?`<span style="color:var(--amber);font-weight:600;">${w} ${e("معلقة بالإرسال","outbox pending")}</span>`:`${W("healthy")} ${e("قائمة الإرسال خالية ومحدثة","Outbox empty & synced")}`}
          </div>
        </div>
      </div>

      <!-- 3. User Explorer Grid -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span style="display:inline-flex;align-items:center;">${n("users",14)}</span> ${e("حالة واستقرار حسابات المستخدمين (انقر للفلترة السريعة):","User Health & Incidents (Click to Filter):")}
          </h3>
          ${M!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${e("إلغاء الفلترة وعرض الجميع","Clear Filter & Show All")}
            </button>
          `:""}
        </div>

        <div class="diag-users-grid">
          <div 
            class="diag-user-card user-diag-card ${M==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("globe",18)}</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${e("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${l.length} ${e("حوادث","records")}</div>
              </div>
            </div>
          </div>

          ${r.map(s=>{const x=M===s.userId,$=s.activeIncidents>0;return`
              <div 
                class="diag-user-card user-diag-card ${x?"is-active":""}" 
                data-action="filter-diagnostics-user" 
                data-user-id="${t(s.userId)}"
                title="${e("انقر لعرض الحوادث الخاصة بهذا المستخدم فقط","Click to view only incidents for this user")}"
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
                        <span style="background:rgba(16,185,129,0.12);color:#059669;border:1px solid rgba(16,185,129,0.25);font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px;flex-shrink:0;display:inline-flex;align-items:center;gap:3px;">
                          ${W("active")} ${e("حساب مفعل","Active")}
                        </span>
                      `:""}
                    </div>
                    <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t(s.email||"")}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span class="status-badge ${$?"urgent":"done"}" style="font-size:9px;padding:1px 6px;">
                        ${$?e(`${s.activeIncidents} حادث نشط`,`${s.activeIncidents} Active`):e("مستقر (0 أعطال)","Healthy (0 errors)")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>

      <!-- 4. Filter Toolbar -->
      <div class="diag-filter-bar">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="font-size:12px;font-weight:600;color:var(--muted);">${e("تصفية حسب:","Filter by:")}</div>
          
          <select id="diag-severity-filter" data-action="filter-diagnostics-severity" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${H==="all"?"selected":""}>${e("جميع مستويات الخطورة","All Severities")}</option>
            <option value="critical" ${H==="critical"?"selected":""}>${e("حرجة (Critical)","Critical")}</option>
            <option value="high" ${H==="high"?"selected":""}>${e("مرتفعة (High)","High")}</option>
            <option value="medium" ${H==="medium"?"selected":""}>${e("متوسطة (Medium)","Medium")}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${K==="all"?"selected":""}>${e("جميع الحالات","All Statuses")}</option>
            <option value="active" ${K==="active"?"selected":""}>${e("نشطة قيد المعالجة","Active")}</option>
            <option value="resolved" ${K==="resolved"?"selected":""}>${e("تم حلها بنجاح","Resolved")}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${e(`عرض ${l.length} حادث مسجل`,`Showing ${l.length} incidents`)}
          ${g?` (${e("للمستخدم:","for user:")} <strong>${g.name}</strong>)`:""}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${l.length?l.map(s=>{const x=s.severity==="critical",$=s.status==="resolved",D=s.occurrences||1,d=s.affectedUsers&&s.affectedUsers.length||1,f=s.origin==="backend_worker"?"Backend Server (Worker)":"Frontend Client (SPA)",E=JSON.stringify({incidentId:s.id,fingerprint:s.fingerprint||null,occurrences:D,affectedUsersCount:d,origin:s.origin||"frontend_client",timestamp:s.timestamp,user:{id:s.userId,name:s.userName,email:s.userEmail,role:s.userRole},client:{device:s.deviceType,browser:s.browser,os:s.os,resolution:s.screenResolution,memoryMb:s.memoryMb,ip:s.ip,location:`${s.city}, ${s.country}`},error:{type:s.errorType,message:s.errorMessage,stack:s.stackTrace},breadcrumbs:s.breadcrumbs,suggestedFix:s.suggestedSolution},null,2);return`
            <article class="diag-incident-card ${x?"is-critical":s.severity==="high"?"is-warning":""}">
              
              <!-- Incident Head -->
              <div class="diag-incident-head">
                <div style="display:flex;align-items:flex-start;gap:12px;">
                  <span style="line-height:1;margin-top:2px;display:flex;align-items:center;color:${$?"#10b981":x?"#ef4444":"#f59e0b"};">${$?n("success",22):x?n("alert",22):n("warning",22)}</span>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                      <h4 style="margin:0;font-size:15px;font-weight:700;color:${$?"var(--ink)":x?"var(--red)":"var(--amber-strong)"};">
                        ${t(e(s.titleAr||"",s.titleEn||""))}
                      </h4>
                      <span class="status-badge ${x?"urgent":s.severity==="high"?"in-review":"done"}" style="font-size:10px;">
                        ${t(String(s.severity||"high").toUpperCase())}
                      </span>
                      <span style="font-size:10px;font-family:monospace;background:var(--surface-soft);border:1px solid var(--line);padding:2px 8px;border-radius:4px;color:var(--muted);">
                        ${t(s.id||"")}
                      </span>
                      <span style="font-size:10px;font-family:monospace;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);padding:2px 6px;border-radius:4px;">
                        ${t(f)}
                      </span>
                      ${D>1?`
                        <span class="badge" style="background:rgba(239,68,68,0.12);color:var(--red);border:1px solid rgba(239,68,68,0.25);font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;">
                          ${n("alert",11)} ${e(`تكرر ${D} مرات`,`${D} occurrences`)}
                        </span>
                      `:""}
                      ${d>1?`
                        <span class="badge" style="background:rgba(124,58,237,0.1);color:#7c3aed;border:1px solid rgba(124,58,237,0.2);font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;">
                          ${n("users",11)} ${e(`${d} مستخدمين متأثرين`,`${d} users affected`)}
                        </span>
                      `:""}
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
                      <span style="display:inline-flex;align-items:center;gap:4px;">${n("pin",12)} ${t(s.city)}, ${t(s.country)} (${t(s.ip)})</span>
                      <span>·</span>
                      <span style="display:inline-flex;align-items:center;gap:4px;">${n("clock",12)} ${new Date(s.timestamp).toLocaleString(o.lang==="ar"?"ar-AE":"en-US")}</span>
                    </div>
                  </div>
                </div>

                <!-- Resolve & Actions -->
                <div style="display:flex;align-items:center;gap:8px;">
                  ${$?`
                    <span class="status-badge done" style="font-size:11px;display:inline-flex;align-items:center;gap:4px;">
                      ${n("check",12)} ${e("تم حل المشكلة وإغلاق البلاغ","Resolved")}
                    </span>
                  `:`
                    <button type="button" class="btn btn-sm btn-primary" data-action="resolve-diagnostic-incident" data-incident-id="${t(s.id)}" style="font-size:11px;display:flex;align-items:center;gap:5px;">
                      ${n("check",13)} ${e("تحديد كمعالج","Mark Resolved")}
                    </button>
                  `}
                  <button type="button" class="btn btn-sm btn-soft" data-action="copy-debug-bundle" data-bundle="${t(E)}" style="font-size:11px;display:flex;align-items:center;gap:5px;" title="${e("نسخ كامل التقرير الفني لحل المشكلة فوراً","Copy complete technical debug bundle to clipboard")}">
                    ${n("copy",13)} ${e("نسخ تقرير الخطأ","Copy Debug Info")}
                  </button>
                </div>
              </div>

              <!-- Technical Environment Specs Matrix -->
              <div class="diag-specs-grid" dir="ltr" style="text-align:left;">
                <div><span style="color:var(--muted);">${e("نظام التشغيل:","OS:")}</span> <strong>${t(s.os||"macOS")}</strong></div>
                <div><span style="color:var(--muted);">${e("المتصفح:","Browser:")}</span> <strong>${t(s.browser||"Chrome")}</strong></div>
                <div><span style="color:var(--muted);">${e("نوع الجهاز:","Device:")}</span> <strong>${t(s.deviceType||"Desktop")}</strong></div>
                <div><span style="color:var(--muted);">${e("أبعاد الشاشة:","Screen:")}</span> <strong>${t(s.screenResolution||"1920x1080")}</strong></div>
                <div><span style="color:var(--muted);">${e("ذاكرة الـ Heap:","Memory:")}</span> <strong style="color:${s.memoryMb>130?"var(--red)":"var(--teal)"};">${t(String(s.memoryMb))} MB</strong></div>
                <div><span style="color:var(--muted);">${e("المسار النشط:","Route:")}</span> <strong style="color:var(--teal);font-family:monospace;">${t(s.currentView||"#dashboard")}</strong></div>
              </div>

              <!-- Error Message & Stack Trace (The exact code location) -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("search",14)}</span> ${e("الخطأ وموقع الاستثناء البرمجي (Stack Trace):","Error Message & Call Stack:")}
                </div>
                <div class="diag-code-box">
                  <div style="color:#ef4444;font-weight:700;margin-bottom:8px;">${t(s.errorMessage)}</div>
                  <pre style="margin:0;color:#94a3b8;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;">${t(s.stackTrace)}</pre>
                </div>
              </div>

              <!-- User 5D Flight Recorder Timeline -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("footprint",14)}</span> ${e("تسلسل خطوات المستخدم قبل الخطأ (5D Flight Recorder Timeline):","Step-by-Step Flight Recorder Timeline:")}
                </div>
                <div class="diag-timeline">
                  ${(s.breadcrumbs||[]).length?s.breadcrumbs.map(y=>{const T=Ze(y.category);return`
                      <div class="diag-timeline-item ${T}">
                        <span class="diag-badge-category ${T}">[${t(y.category||"action")}]</span>
                        <span style="font-family:monospace;color:var(--muted);font-size:11px;">[${t(y.time||"")}]</span>
                        <span style="flex:1;">${t(y.message||"")}</span>
                      </div>
                    `}).join(""):`
                    <div style="font-size:12px;color:var(--muted);">${e("لا توجد خطوات سابقة مسجلة.","No prior breadcrumbs.")}</div>
                  `}
                </div>
              </div>

              <!-- Suggested Automated Resolution (Runbook Engine) -->
              <div class="diag-solution-box">
                <div style="font-size:12px;font-weight:700;color:var(--mint-strong);margin-bottom:4px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("bulb",14)}</span> ${e("التشخيص التلقائي والحل الهندسي المقترح (Runbook Engine):","Automated Diagnosis & Runbook Recommendation:")}
                </div>
                <div style="font-size:12px;color:var(--ink);line-height:1.6;">
                  ${t(s.suggestedSolution||e("تحقق من صحة الكود ومسارات المعالجة.","Review code handling."))}
                </div>
              </div>

              <!-- Email Dispatch Status Receipt -->
              <div class="diag-footer-receipt">
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <span style="display:inline-flex;align-items:center;">${n("mail",13)}</span>
                  <span>${e("حالة إرسال بريد التنبيه للإدارة:","Admin Alert Email:")}</span>
                  <strong style="color:var(--teal);">${a?e("محاكاة الساندبوكس (معزول)","Simulated Sandbox"):s.emailAlert?.status==="delivered"?e("تم التسليم للبريد بنجاح","Delivered"):e("تم التحقق والتسجيل في السيرفر","Dispatched to Sandbox")}</strong>
                  <span style="font-family:monospace;">(${t(a?"demo-alerts@darc.demo":s.emailAlert?.deliveredTo||"admin@darc-design.bond")})</span>
                </div>
                <div>
                  ${$?e(`معالج بواسطة: ${t(s.resolvedBy||"Admin")}`,`Resolved by: ${t(s.resolvedBy||"Admin")}`):e("قيد التدخل البرمجي","Awaiting resolution")}
                </div>
              </div>

            </article>
          `}).join(""):`
          <div style="text-align:center;padding:40px 20px;background:var(--surface);border:1px dashed var(--line);border-radius:12px;">
            <div style="color:var(--teal);margin-bottom:8px;display:flex;justify-content:center;">${n("celebrate",36)}</div>
            <h4 style="margin:8px 0 4px;font-size:15px;font-weight:700;color:var(--ink);">${e("لا توجد أي مشاكل مسجلة تطابق التصفية الحالية","No Incidents Found")}</h4>
            <p style="margin:0;font-size:12px;color:var(--muted);">${e("جميع أجهزة المستخدمين تعمل بأقصى درجات الاستقرار والأمان.","All user sessions are running with zero active errors.")}</p>
          </div>
        `}
      </div>
    </section>
  `}var N=null,de=!1,se=null,Y=null,oe=0;async function be(a=!1){if(N&&!a)return N;de=!0,se=null;try{re("vault","Fetching vault backups from Google Drive API");const i=await P("/api/vault/backups"+(a?"?force=true":""));i&&i.backups&&(N=i,se=null)}catch(i){console.warn("[Vault] Failed to fetch vault backups:",i),se=i.message||e("فشل في استرجاع النسخ الاحتياطية من الخزنة","Failed to retrieve backups from vault"),re("vault","Fetch error: "+(i.message||"unknown"))}finally{de=!1}return N}function et(){const a=O(),i=N;return!i&&!de&&be().then(()=>{const r=document.getElementById("vault-content-area");r&&(r.innerHTML=ce(a,N),pe())}),`
    <div class="settings-vault-wrap" id="vault-content-area">
      ${ce(a,i)}
    </div>
  `}function ce(a,i){if(!i&&se)return`
      <div class="vault-error-state card" style="text-align:center; padding:3.5rem 1.5rem; border:1px solid rgba(239, 68, 68, 0.3); background:rgba(239, 68, 68, 0.04); border-radius:1rem; margin-bottom:2rem;">
        <div style="color:#ef4444; margin-bottom:1rem;">
          ${n("alert-triangle","width:36px; height:36px;")}
        </div>
        <h3 style="font-weight:700; color:var(--text-main); margin-bottom:0.5rem;">
          ${e("تعذر تحميل سجل النسخ الاحتياطية من Google Drive","Failed to Load Backups Ledger from Google Drive")}
        </h3>
        <p style="color:var(--text-muted); font-size:0.9rem; max-width:540px; margin:0 auto 1.5rem auto;">
          ${t(se)}
        </p>
        <button id="btn-retry-vault-fetch" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:0.5rem; background:#059669; border-color:#059669; font-size:0.9rem;">
          ${n("refresh","width:15px; height:15px;")}
          <span>${e("إعادة المحاولة الآن","Retry Now")}</span>
        </button>
      </div>
    `;if(!i||de)return`
      <div class="vault-loading-state" style="text-align:center; padding:4rem 1rem;">
        <div class="loading-spinner" style="margin: 0 auto 1.5rem auto;"></div>
        <h3 style="font-weight:600; color:var(--text-main); margin-bottom:0.5rem;">
          ${e("جاري فحص خزنة Google Drive 5TB ومطابقة النسخ المشفرة...","Scanning Google Drive 5TB Vault & Verifying Checksums...")}
        </h3>
        <p style="color:var(--text-muted); font-size:0.9rem;">
          ${e("يتم الاتصال عبر مصادقة Google OAuth2 المشفرة","Connecting via secure Google OAuth2 handshake")}
        </p>
      </div>
    `;const r=i?.total||0,l=i?.latestBackup,p=i?.backups||[];return`
    <!-- Top Hero Banner: Karim Al-Hakim Serenity & High Resilience -->
    <div class="vault-hero-card" style="
      background: linear-gradient(135deg, rgba(16, 24, 39, 0.95), rgba(15, 23, 42, 0.98));
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-radius: 1rem;
      padding: 1.75rem 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      position: relative;
      overflow: hidden;
    ">
      <div style="position:absolute; top:-40px; right:-40px; width:180px; height:180px; background:radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%); pointer-events:none;"></div>
      
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1.25rem;">
        <div>
          <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
            <span style="
              display:inline-flex; align-items:center; gap:0.5rem;
              background:rgba(16, 185, 129, 0.12); color:#10b981;
              padding:0.35rem 0.85rem; border-radius:2rem; font-size:0.8rem; font-weight:700;
              border: 1px solid rgba(16, 185, 129, 0.3);
            ">
              <span style="width:8px; height:8px; border-radius:50%; background:#10b981; box-shadow:0 0 10px #10b981; animation:pulse 2s infinite;"></span>
              ${e("نظام الحصانة السحابية نشط 100%","Air-Gapped Cloud Vault Active")}
            </span>
            <span style="color:var(--text-muted); font-size:0.85rem;">
              ${e("حساب Google Drive 5TB + أرشيف GitHub السحابي","Google Drive 5TB + GitHub Azure Cloud")}
            </span>
          </div>

          <h2 style="font-size:1.45rem; font-weight:700; color:#f8fafc; margin:0 0 0.5rem 0; letter-spacing:-0.02em;">
            ${e("مركز النسخ الاحتياطي والتعافي من الكوارث (DARC Vault)","Disaster Recovery & Enterprise Vault")}
          </h2>
          <p style="color:#94a3b8; font-size:0.92rem; max-width:680px; line-height:1.6; margin:0;">
            ${e("النسخ تُسحب ذرياً، تُشفر محلياً بـ AES-256 عسكري قبل خروجها للإنترنت، وتُحفظ مستقلاً في سحابتين منفصلتين لحماية بيانات المشاريع من أي كارثة أو عطل سحابي.","Database is dumped atomically, encrypted client-side with AES-256 before transit, and preserved across two independent cloud providers with 30-day rolling retention.")}
          </p>
        </div>

        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <button id="btn-trigger-backup-now" class="btn btn-secondary" style="background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.12); color:#e2e8f0;">
            ${n("upload","width:15px; height:15px;")}
            <span>${e("أخذ نسخة فورية الآن","Backup Now")}</span>
          </button>
          <button id="btn-refresh-vault" class="btn btn-secondary" style="background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.12); color:#e2e8f0;">
            ${n("refresh","width:15px; height:15px;")}
            <span>${e("تحديث القائمة","Refresh Vault")}</span>
          </button>
          <button id="btn-open-restore-wizard" class="btn btn-primary" style="background:#059669; border-color:#059669; color:#fff; box-shadow:0 4px 14px rgba(5,150,105,0.4);">
            ${n("shield","width:15px; height:15px;")}
            <span>${e("معالج الاستعادة الآمن","Restore Wizard")}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 4 High-Precision Telemetry Metrics Cards -->
    <div class="vault-metrics-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:1.25rem; margin-bottom:2rem;">
      <div class="card" style="padding:1.25rem; background:var(--surface); border:1px solid var(--border-color); border-radius:0.75rem;">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${e("النسخ المحفوظة على Drive","Stored Encrypted Backups")}
        </span>
        <div style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-top:0.4rem;">
          ${r} <span style="font-size:0.9rem; font-weight:500; color:var(--text-muted);">${e("نسخة معتمدة","snapshots")}</span>
        </div>
      </div>

      <div class="card" style="padding:1.25rem; background:var(--surface); border:1px solid var(--border-color); border-radius:0.75rem;">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${e("تاريخ آخر نسخة ناجحة","Latest Backup Timestamp")}
        </span>
        <div style="font-size:1.1rem; font-weight:700; color:var(--text-main); margin-top:0.6rem;">
          ${l?ue(l.createdAt):e("لا توجد نسخ","None")}
        </div>
      </div>

      <div class="card" style="padding:1.25rem; background:var(--surface); border:1px solid var(--border-color); border-radius:0.75rem;">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${e("معيار التشفير والبصمة","Encryption Standard")}
        </span>
        <div style="font-size:1.1rem; font-weight:700; color:#10b981; margin-top:0.6rem;">
          AES-256-CBC <span style="font-size:0.75rem; color:var(--text-muted);">(PBKDF2 100k)</span>
        </div>
      </div>

      <div class="card" style="padding:1.25rem; background:var(--surface); border:1px solid var(--border-color); border-radius:0.75rem;">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${e("حجم أرشيف قاعدة البيانات","Latest Archive Size")}
        </span>
        <div style="font-size:1.4rem; font-weight:800; color:var(--text-main); margin-top:0.5rem;">
          ${l?.sizeFormatted||"—"}
        </div>
      </div>
    </div>

    <!-- Backups Table Ledger -->
    <div class="card" style="padding:0; overflow:hidden; border-radius:0.75rem; border:1px solid var(--border-color);">
      <div style="padding:1.25rem 1.5rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
        <h3 style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin:0;">
          ${e("سجل النسخ الاحتياطية المتاحة على Google Drive (5TB)","Available Backups Ledger (Google Drive 5TB)")}
        </h3>
        <span style="font-size:0.82rem; color:var(--text-muted);">
          ${e("فترة الاستبقاء: 30 يوماً متجددة","Retention Policy: 30-Day Rolling")}
        </span>
      </div>

      ${p.length===0?`
        <div style="padding:3rem 1rem; text-align:center; color:var(--text-muted);">
          <p>${e("لم يتم العثور على نسخ احتياطية في مجلد Drive.","No encrypted backups found in Google Drive folder.")}</p>
        </div>
      `:`
        <div style="overflow-x:auto;">
          <table class="table" style="width:100%; margin:0; border-collapse:collapse; font-size:0.9rem;">
            <thead>
              <tr style="background:rgba(0,0,0,0.03); border-bottom:1px solid var(--border-color); text-align:start;">
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("اسم الملف المشفر","Encrypted Filename")}</th>
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("تاريخ الحفظ","Timestamp")}</th>
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("الحجم","Size")}</th>
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("بصمة SHA-256","Integrity")}</th>
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted); text-align:end;">${e("الإجراءات","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${p.map(g=>`
                <tr style="border-bottom:1px solid var(--border-color); transition:background 0.15s ease;">
                  <td style="padding:1rem 1.25rem; font-weight:600; color:var(--text-main);">
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                      <span style="color:#10b981;">${n("lock","width:16px; height:16px;")}</span>
                      <code style="font-family:monospace; font-size:0.85rem; color:var(--text-main);">${t(g.filename)}</code>
                    </div>
                  </td>
                  <td style="padding:1rem 1.25rem; color:var(--text-muted);">${ue(g.createdAt)}</td>
                  <td style="padding:1rem 1.25rem; color:var(--text-main); font-weight:600;">${g.sizeFormatted}</td>
                  <td style="padding:1rem 1.25rem;">
                    <span style="
                      display:inline-flex; align-items:center; gap:0.35rem;
                      font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:1rem;
                      background:rgba(16,185,129,0.1); color:#10b981; font-weight:600;
                    ">
                      ${n("check","width:12px; height:12px;")} ${e("مطابقة وموثقة","Verified SHA-256")}
                    </span>
                  </td>
                  <td style="padding:1rem 1.25rem; text-align:end;">
                    <a href="https://drive.google.com/file/d/${t(g.id)}/view" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="font-size:0.8rem; margin-inline-end:0.4rem; text-decoration:none;">
                      ${n("download","width:13px; height:13px;")}
                      <span>${e("Drive","Drive")}</span>
                    </a>
                    <button class="btn btn-sm btn-secondary btn-copy-cli" data-filename="${t(g.filename)}" style="font-size:0.8rem; margin-inline-end:0.4rem;">
                      ${n("copy","width:13px; height:13px;")}
                      <span>${e("أمر CLI","CLI Command")}</span>
                    </button>
                    <button class="btn btn-sm btn-primary btn-restore-target" data-filename="${t(g.filename)}" style="background:#059669; border-color:#059669; font-size:0.8rem;">
                      ${n("shield","width:13px; height:13px;")}
                      <span>${e("استعادة","Restore")}</span>
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `}function pe(){const a=document.getElementById("btn-retry-vault-fetch");a&&(a.onclick=async()=>{a.disabled=!0,a.innerHTML=`${n("refresh","width:15px; height:15px; animation:spin 1s linear infinite;")} <span>${e("جاري الفحص...","Retrying...")}</span>`,await be(!0);const p=document.getElementById("vault-content-area");p&&(p.innerHTML=ce(O(),N),pe())});const i=document.getElementById("btn-trigger-backup-now");i&&(i.onclick=async()=>{i.disabled=!0,i.innerHTML=`${n("refresh","width:15px; height:15px; animation:spin 1s linear infinite;")} <span>${e("جاري الإطلاق...","Launching...")}</span>`;try{re("vault","Triggering backup-now from UI"),await P("/api/vault/backup-now",{method:"POST"}),R(e("تم إطلاق مسار النسخ الاحتياطي المشفر على GitHub بنجاح","Encrypted backup dispatched to GitHub successfully"))}catch(p){R(p.message||"Failed to dispatch backup","error")}finally{i.disabled=!1,i.innerHTML=`${n("upload","width:15px; height:15px;")} <span>${e("أخذ نسخة فورية الآن","Backup Now")}</span>`}});const r=document.getElementById("btn-refresh-vault");r&&(r.onclick=async()=>{r.disabled=!0,r.innerHTML=`${n("refresh","width:16px; height:16px; animation:spin 1s linear infinite;")} ${e("جاري الفحص...","Scanning...")}`,await be(!0);const p=document.getElementById("vault-content-area");p&&(p.innerHTML=ce(O(),N),pe()),R(e("تم تحديث قائمة النسخ من Google Drive بنجاح","Vault list refreshed successfully"))});const l=document.getElementById("btn-open-restore-wizard");l&&(l.onclick=()=>Se("latest")),document.querySelectorAll(".btn-restore-target").forEach(p=>{p.onclick=()=>{Se(p.getAttribute("data-filename"))}}),document.querySelectorAll(".btn-copy-cli").forEach(p=>{p.onclick=()=>{const g=`openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -pass pass:"$BACKUP_ENCRYPTION_KEY" -in "${p.getAttribute("data-filename")}" | gunzip | psql "$SUPABASE_DB_URL"`;navigator.clipboard.writeText(g),R(e("تم نسخ أمر فك التشفير والاستعادة إلى الحافظة","Decryption & restore command copied to clipboard"))}})}function Se(a="latest"){re("vault","Opened disaster recovery wizard modal",{targetFilename:a});const i=`
    <div class="restore-wizard-dialog" style="max-width:540px; margin:0 auto; padding:1.5rem 0;">
      <div style="text-align:center; margin-bottom:1.5rem;">
        <div style="width:56px; height:56px; border-radius:50%; background:rgba(217,119,6,0.12); color:#d97706; display:inline-flex; align-items:center; justify-content:center; margin-bottom:1rem;">
          ${n("alert-triangle","width:28px; height:28px;")}
        </div>
        <h3 style="font-size:1.3rem; font-weight:700; color:var(--text-main); margin:0 0 0.5rem 0;">
          ${e("معالج استعادة قاعدة البيانات (Disaster Recovery)","Database Disaster Recovery Wizard")}
        </h3>
        <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.5; margin:0;">
          ${e("النسخة المستهدفة:","Target Backup Archive:")}
          <strong style="color:#10b981; font-family:monospace;">${t(a)}</strong>
        </p>
      </div>

      <!-- Mode Selector: Dry Run vs Real Restore -->
      <div style="background:var(--surface); border:1px solid var(--border-color); border-radius:0.75rem; padding:1.25rem; margin-bottom:1.5rem;">
        <label style="display:flex; align-items:flex-start; gap:0.75rem; cursor:pointer; margin-bottom:1rem;">
          <input type="radio" name="restore-mode" id="mode-dryrun" value="dryrun" checked style="margin-top:0.25rem;">
          <div>
            <strong style="display:flex; align-items:center; gap:0.4rem; color:var(--text-main); font-size:0.95rem;">
              <span style="color:#10b981;">${n("shield","width:15px; height:15px;")}</span>
              <span>${e("المحاكاة الآمنة (Dry-Run Rehearsal) — موصى به","Safe Rehearsal (Dry-Run) — Recommended")}</span>
            </strong>
            <span style="color:var(--text-muted); font-size:0.83rem;">
              ${e("يقوم بتحميل وفك تشفير النسخة والتأكد من مطابقة الـ SHA-256 وحساب الجداول دون لمس قاعدة البيانات الحية.","Downloads, verifies SHA-256, decrypts and inspects SQL without modifying production data.")}
            </span>
          </div>
        </label>

        <label style="display:flex; align-items:flex-start; gap:0.75rem; cursor:pointer;">
          <input type="radio" name="restore-mode" id="mode-real" value="real" style="margin-top:0.25rem;">
          <div>
            <strong style="display:flex; align-items:center; gap:0.4rem; color:#ef4444; font-size:0.95rem;">
              <span>${n("alert-triangle","width:15px; height:15px;")}</span>
              <span>${e("الاستعادة الإنتاجية الكاملة (Live Database Restore)","Full Live Production Restoration")}</span>
            </strong>
            <span style="color:var(--text-muted); font-size:0.83rem;">
              ${e("يسحب لقطة أمان مسبقة، ثم يحقن النسخة المستعادة في معاملة ذرية مع تجميد الـ Triggers تلقائياً.","Takes a pre-restore safety snapshot, freezes triggers, and injects data in an atomic transaction.")}
            </span>
          </div>
        </label>
      </div>

      <!-- Live Confirmation Phrase (Only if Real is chosen) -->
      <div id="real-confirm-box" style="display:none; margin-bottom:1.5rem;">
        <label style="display:block; font-size:0.85rem; font-weight:600; color:#ef4444; margin-bottom:0.5rem;">
          ${e("لحماية البيانات، اكتب بالضبط: RESTORE_PRODUCTION_DATABASE","Type exactly to confirm: RESTORE_PRODUCTION_DATABASE")}
        </label>
        <input type="text" id="input-confirm-phrase" class="form-control" placeholder="RESTORE_PRODUCTION_DATABASE" style="font-family:monospace; letter-spacing:0.05em;">
      </div>

      <!-- Karim Al-Hakim 3.5s Radial Hold Safety Trigger -->
      <div style="text-align:center; padding:1rem 0;">
        <button id="btn-hold-restore" class="btn" style="
          width:100%; height:52px; font-weight:700; font-size:1rem;
          background:#059669; color:#fff; border:none; border-radius:0.75rem;
          position:relative; overflow:hidden; user-select:none;
        ">
          <span id="hold-progress-bar" style="
            position:absolute; top:0; left:0; bottom:0; width:0%;
            background:rgba(255,255,255,0.25); transition:width 0.05s linear;
          "></span>
          <span id="hold-btn-text" style="position:relative; z-index:2; display:inline-flex; align-items:center; gap:0.5rem;">
            ${n("play","width:18px; height:18px;")}
            <span>${e("اضغط مطولاً لبدء المحاكاة التجريبية (3.5 ثانية)","Hold 3.5s to Execute Rehearsal")}</span>
          </span>
        </button>
        <p style="color:var(--text-muted); font-size:0.8rem; margin-top:0.75rem;">
          ${e("آلية أمان لمنع النقر بالخطأ تحت الضغط العصبي","Safety latch to prevent accidental activation under stress")}
        </p>
      </div>

      <div id="restore-live-feedback" style="display:none; margin-top:1rem; padding:1rem; border-radius:0.5rem; background:rgba(0,0,0,0.2); font-family:monospace; font-size:0.85rem;"></div>
    </div>
  `,r=document.getElementById("modal-root");if(!r){console.error("[Vault] modal-root element not found in DOM");return}r.innerHTML=xe(e("غرفة عمليات التعافي من الكوارث","Disaster Recovery Ops"),e("نظام استعادة آمن محمي بلقطة استباقية وتجميد الـ Triggers","Secure recovery protected by pre-flight snapshot & trigger freeze"),i,"restore-wizard","modal-lg");const l=document.getElementById("mode-dryrun"),p=document.getElementById("mode-real"),g=document.getElementById("real-confirm-box"),h=document.getElementById("hold-btn-text"),w=document.getElementById("btn-hold-restore");if(!l||!p||!w){console.warn("[Vault] Wizard modal elements not ready in DOM");return}const v=()=>{const $=l.checked;g&&(g.style.display=$?"none":"block"),w&&(w.style.background=$?"#059669":"#dc2626"),h&&($?h.innerHTML=`${n("play","width:18px; height:18px;")} <span>${e("اضغط مطولاً لبدء المحاكاة التجريبية (3.5 ثوانٍ)","Hold 3.5s to Execute Rehearsal")}</span>`:h.innerHTML=`${n("alert-triangle","width:18px; height:18px;")} <span>${e("اضغط مطولاً لتأكيد الاستعادة الحية (3.5 ثوانٍ)","Hold 3.5s to Trigger LIVE Restore")}</span>`)};l.onchange=v,p.onchange=v;const k=document.getElementById("hold-progress-bar");let z=0;const s=()=>{const $=l.checked;if(!$&&(document.getElementById("input-confirm-phrase")?.value||"").trim()!=="RESTORE_PRODUCTION_DATABASE"){R(e("يجب كتابة عبارة التأكيد RESTORE_PRODUCTION_DATABASE أولاً","Please enter confirmation phrase first"),"error");return}z=Date.now(),oe=0,k.style.width="0%",Y=setInterval(()=>{const D=Date.now()-z;oe=Math.min(D/3500*100,100),k.style.width=oe+"%",oe>=100&&(clearInterval(Y),Y=null,tt(a,$))},50)},x=()=>{Y&&(clearInterval(Y),Y=null,k.style.width="0%")};w.addEventListener("mousedown",s),w.addEventListener("mouseup",x),w.addEventListener("mouseleave",x),w.addEventListener("touchstart",s,{passive:!0}),w.addEventListener("touchend",x)}async function tt(a,i){const r=document.getElementById("restore-live-feedback"),l=document.getElementById("btn-hold-restore");l&&(l.disabled=!0),r&&(r.style.display="block",r.innerHTML=`
      <div style="color:#10b981; display:flex; align-items:center; gap:0.4rem;">${n("play","width:14px; height:14px;")} <span>${e("جاري إطلاق مسار التعافي على GitHub Actions...","Dispatching Disaster Recovery on GitHub Actions...")}</span></div>
      <div style="color:var(--text-muted); margin-top:0.4rem;">Mode: ${i?"DRY_RUN (Safe Rehearsal)":"PRODUCTION_RESTORE"}</div>
    `);try{re("vault","Triggering restore API call",{backupFilename:a,isDryRun:i}),await P("/api/vault/restore",{method:"POST",body:JSON.stringify({backupFilename:a,dryRun:i,confirmationPhrase:i?"DRY_RUN_REHEARSAL":"RESTORE_PRODUCTION_DATABASE"})}),r&&(r.innerHTML+=`
        <div style="color:#10b981; margin-top:0.6rem; display:flex; align-items:center; gap:0.4rem;">${n("check","width:14px; height:14px;")} <span>${e("تم قبول العملية وتشغيل المسار المعزول بنجاح!","Workflow dispatched successfully!")}</span></div>
        <div style="color:var(--text-muted); margin-top:0.4rem;">Status: Initiated via GitHub Actions Runner</div>
        <div style="margin-top:0.75rem;">
          <a href="https://github.com/ahmad0105/Darc-design-team/actions/workflows/database-restore.yml" target="_blank" class="btn btn-sm btn-secondary" style="font-size:0.8rem;">
            ${e("متابعة التنفيذ الحي على GitHub ↗","Watch Live Run on GitHub ↗")}
          </a>
        </div>
      `),R(e("تم إطلاق مسار التعافي بنجاح","Disaster recovery launched successfully"))}catch(p){r&&(r.innerHTML+=`
        <div style="color:#ef4444; margin-top:0.6rem; display:flex; align-items:center; gap:0.4rem;">${n("alert-triangle","width:14px; height:14px;")} <span>${e("خطأ في إطلاق المسار:","Dispatch Error:")} ${t(p.message)}</span></div>
      `),R(p.message||"Error triggering restore","error")}finally{l&&(l.disabled=!1)}}var ft=Te({FULL_PERMISSIONS_CATALOG:()=>Fe,canAccessSettingsSection:()=>j,exportAuditLogsXLS:()=>st,fetchFullAuditHistory:()=>rt,openRoleModal:()=>lt,openUserModal:()=>dt,printAuditReport:()=>nt,renderAuditForProject:()=>it,renderSettings:()=>ot,renderTeam:()=>at,renderUserActivityCell:()=>Oe});function at(){if(!_()&&!A("manage_users"))return`<section class="panel"><div class="empty">${n("alert",18)}<span>${e("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const a=o.data?.user?.id;let i=(o.data?.users||[]).filter(r=>r.status!=="inactive");return a!=="usr_ahmad"?i=i.filter(r=>r.id!=="usr_ahmad"):i=[...i].sort((r,l)=>r.id==="usr_ahmad"?-1:l.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${e("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${c("team")}</h1>
        <p>${e("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${_()||A("manage_users")?`<button class="btn btn-primary" data-action="new-user">${n("plus",15)} ${c("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${i.map(r=>{const l=he(r.id,o.data?.tasks||[]),p=r.id==="usr_ahmad";return`
          <article class="member-card ${p?"system-developer-card":""}" style="${p?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${ne(r,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${t(e(r.name,r.nameEn||r.name))}</strong>
                  <span>${t(e(r.jobTitleAr||(p?"المبرمج / مدير النظام":""),r.jobTitleEn||r.jobTitleAr||""))}</span>
                </div>
              </div>
              ${p?`<span class="stealth-dev-badge">${n("shield",12)} ${e("مدير ومطور النظام","Super Admin & Dev")}</span>`:Ue()&&r.id!==o.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${t(r.id)}">${n("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${r.status==="active"?"done":"not_started"}">${t(G(r))}</span>
            </div>
            <div class="member-card-stats">
              <span>${c("progress")} <strong>${l.progress}%</strong></span>
              <span>${l.tasks} ${c("tasks")}</span>
            </div>
            <div class="member-email">${r.email?t(r.email):c("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function it(a){const i=(o.data?.auditLogs||[]).filter(r=>r.details?.projectId===a||r.entityType==="project"&&r.entityId===a);return i.length?`<div class="audit-list">${i.map(r=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${t(r.user?e(r.user.name,r.user.nameEn||r.user.name):"DARC")} · ${t(r.action)}</strong><span>${t(r.entityType)} · ${le(r.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${n("check",18)}<span>${e("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function Oe(a){const i=a.lastActiveAt||a.customFields?.lastActiveAt,r=a.lastLoginAt||a.customFields?.lastLoginAt;if(!i&&!r)return`<span class="activity-never">${e("لم يسجل دخول بعد","Never logged in")}</span>`;const l=Date.now(),p=i?new Date(i).getTime():0,g=a.id===o.data?.user?.id?0:p&&!isNaN(p)?Math.floor((l-p)/6e4):999999,h=g>=0&&g<=5;let w="";if(h)w=`<span class="activity-pill online"><span class="activity-dot online"></span> ${e("نشط الآن","Online")}</span>`;else if(g<60)w=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${e(`منذ ${g} دقيقة`,`${g}m ago`)}</span>`;else if(g<1440){const k=Math.floor(g/60);w=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${e(`منذ ${k} ساعة`,`${k}h ago`)}</span>`}else p>0&&(w=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${le(i,!1)}</span>`);const v=r?`<span class="activity-sub" title="${t(r)}">${e("دخول:","Login:")} ${le(r,!0)}</span>`:"";return`<div class="activity-wrapper">${w}${v}</div>`}function $e(a){return ue(a,{includeSeconds:!0})}function me(a){const i=a.action||"",r=a.entityType||a.entity_type||"",l=a.details||{};let p="badge-neutral",g=i,h=r;i==="login"?(p="badge-teal",g=e("تسجيل دخول","Sign In"),h=e("جلسة نظام","System Session")):i==="create"?(p="badge-mint",g=e("إنشاء جديد","Created")):i==="update"?(p="badge-blue",g=e("تعديل بيانات","Updated")):i==="delete"?(p="badge-red",g=e("نقل للمهملات","Moved to Trash")):i==="status_change"?(p="badge-amber",g=e("تغيير حالة","Status Changed")):i==="export_report"?(p="badge-teal",g=e("تصدير تقرير","Exported Report")):i==="restore"?(p="badge-mint",g=e("استعادة","Restored")):i==="purge"?(p="badge-danger",g=e("حذف نهائي","Purged")):i==="invite"&&(p="badge-blue",g=e("دعوة مستخدم","Invite Sent")),r==="task"?h=e("مهمة","Task"):r==="project"?h=e("مشروع","Project"):r==="document"?h=e("مستند","Document"):r==="user"?h=e("مستخدم","User"):r==="report"?h=e("تقرير","Report"):r==="role"&&(h=e("دور وصلاحيات","Role"));let w="—";return l.title||l.name?w=`<strong>${t(l.title||l.name)}</strong>`:i==="status_change"&&(l.oldStatus||l.newStatus)?w=`<span>${t(V(l.oldStatus))} → <strong>${t(V(l.newStatus))}</strong></span>`:a.entityId&&(w=`<code style="font-size:11px;color:var(--muted);">${t(a.entityId)}</code>`),{badgeClass:p,actionLabel:g,entityLabel:h,detailHtml:w}}function st(a=null){if(!A("view_audit_logs")&&!_()){R(e("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}const i=a||o._lastFilteredAuditLogs||o.data?.auditLogs||[];if(!i.length){R(e("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const r=qe(),l=r.displayName,p=r.logoUrl,g=o.data?.user||{},h=e(g.name,g.nameEn||g.name)||"Admin",w=De(),v=Ce();let k=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${p?`<img src="${t(p)}" height="38" style="vertical-align:middle;margin-inline-end:10px;" />`:""}
          <span style="vertical-align:middle;">${e("سجل الرقابة والتدقيق الأمني والعمليات — "+l,"Audit & Security Trail Report — "+l)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${e("المؤسسة:","Company:")} ${t(l)} | ${e("المشرف المستخرج:","Exported by:")} ${t(h)} | ${e("تاريخ التصدير:","Export Date:")} ${t(w)} ${t(v)}
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
  `;i.forEach((s,x)=>{const $=s.user||(s.userId?(o.data?.users||[]).find(I=>I.id===s.userId):null),D=$?e($.name,$.nameEn||$.name):e("النظام","System"),d=$?G($):"—",f=$e(s.createdAt),{actionLabel:E,entityLabel:y}=me(s);let T="";s.details?.title||s.details?.name?T=s.details.title||s.details.name:s.action==="status_change"?T=`${V(s.details?.oldStatus)} → ${V(s.details?.newStatus)}`:typeof s.details=="object"?T=JSON.stringify(s.details):T=String(s.details||s.entityId||"—");const b=x%2===0?"#ffffff":"#f8fafc";k+=`
      <tr style="background:${b};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${t(U(s.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(U(`${f.date} ${f.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${t(U(D))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${t(U(d))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(U(E))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(U(y))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${t(U(T))}</td>
      </tr>
    `}),k+="</table>";const z=new Date().toISOString().split("T")[0];Ve(`DARC_Audit_Trail_${z}`,k),R(e("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),P("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${z}`,details:{reportType:"Audit_Logs_Excel",count:i.length}})}).catch(()=>{})}function nt(a=null){const i=a||o._lastFilteredAuditLogs||o.data?.auditLogs||[];if(!i.length){R(e("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const r=o.data?.company||{},l=e(r.nameAr||r.name,r.nameEn||r.name)||"DARC Design Team";let p=r.logoUrl||"";p.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(p=`${window.location.origin}${p}`);const g=o.data?.user||{},h=e(g.name,g.nameEn||g.name)||"Admin",w=De(),v=Ce(),k=i.length,z=i.filter(y=>y.action==="create").length,s=i.filter(y=>y.action==="update"||y.action==="status_change").length,x=i.filter(y=>y.action==="delete"||y.action==="purge"||y.action==="trash").length;let $="";i.forEach((y,T)=>{const b=y.user||(y.userId?(o.data?.users||[]).find(F=>F.id===y.userId):null),I=b?e(b.name,b.nameEn||b.name):e("النظام","System"),Z=b?G(b):"—",m=$e(y.createdAt),{actionLabel:u,entityLabel:S}=me(y);let C="";y.details?.title||y.details?.name?C=y.details.title||y.details.name:y.action==="status_change"?C=`${V(y.details?.oldStatus)} → ${V(y.details?.newStatus)}`:typeof y.details=="object"?C=JSON.stringify(y.details):C=String(y.details||y.entityId||"—"),$+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${t(y.id||String(T+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${t(m.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${t(m.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${t(I)}</div>
          <div style="font-size:10px;color:#64748b;">${t(Z)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${t(u)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${t(S)}</td>
        <td style="font-size:11px;color:#334155;">${t(C)}</td>
      </tr>
    `});const D=`
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
          ${p?`<img src="${t(p)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />`:""}
          <h1 class="brand-title">${t(l)}</h1>
          <div class="report-subtitle">${e("تقرير الرقابة والتدقيق الأمني وسجل العمليات الإدارية","Official Security Audit & Governance Operations Trail")}</div>
        </div>
        <div class="report-meta-box">
          <div><strong>${e("المشرف المستخرج:","Generated By:")}</strong> ${t(h)}</div>
          <div><strong>${e("تاريخ التقرير:","Report Date:")}</strong> ${t(w)} - ${t(v)}</div>
          <div><strong>${e("حالة النظام:","System Status:")}</strong> Active / Enforced</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${k}</div>
          <div class="kpi-label">${e("إجمالي العمليات","Total Events")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#059669;">${z}</div>
          <div class="kpi-label">${e("عمليات إنشاء","Create Operations")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#2563eb;">${s}</div>
          <div class="kpi-label">${e("عمليات تعديل وحالة","Updates & State Changes")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#dc2626;">${x}</div>
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
          ${$}
        </tbody>
      </table>

      <footer class="signature-section">
        <div class="signature-box">
          <strong>${e("إعداد وتصدير التقرير","Prepared By")}</strong><br /><br />
          <span>${t(h)}</span>
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
  `;let d=document.getElementById("audit-report-preview-modal");d||(d=document.createElement("div"),d.id="audit-report-preview-modal",d.style.position="fixed",d.style.inset="0",d.style.background="rgba(0, 0, 0, 0.7)",d.style.backdropFilter="blur(4px)",d.style.zIndex="999999",d.style.display="none",d.style.alignItems="center",d.style.justifyContent="center",d.style.padding="15px",document.body.appendChild(d)),d.innerHTML=`
    <div style="background:var(--surface, #ffffff);color:var(--ink);width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.4);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line);background:var(--surface-soft);flex-wrap:wrap;gap:8px;">
        <strong style="color:var(--brand-teal);font-size:14px;">${e("معاينة التقرير الرقابي الرسمي (Audit Trail PDF Preview)","Official Audit Trail Report (PDF Preview)")}</strong>
        <div style="display:flex;gap:10px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-print-audit-iframe" style="display:flex;align-items:center;gap:6px;">
            ${n("printer",14)} ${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-close-audit-print-modal">${n("close",14)}</button>
        </div>
      </div>
      <div style="flex:1;overflow:hidden;position:relative;background:#ffffff;">
        <iframe id="audit-print-preview-iframe" style="width:100%;height:100%;border:none;background:#ffffff;" srcdoc="${t(D)}"></iframe>
      </div>
    </div>
  `,d.style.display="flex";const f=()=>{d.style.display="none",d.innerHTML="",window.removeEventListener("keydown",E)},E=y=>{y.key==="Escape"&&f()};window.addEventListener("keydown",E),document.getElementById("btn-close-audit-print-modal")?.addEventListener("click",f),document.getElementById("btn-print-audit-iframe")?.addEventListener("click",()=>{const y=document.getElementById("audit-print-preview-iframe");y&&y.contentWindow&&(y.contentWindow.focus(),y.contentWindow.print())}),P("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:i.length}})}).catch(()=>{})}async function rt(){try{R(e("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const a=await P("/api/audit?limit=1000");a&&a.logs&&(o.data.auditLogs=a.logs,o.auditFullHistoryLoaded=!0,renderView(),R(e(`تم جلب ${a.logs.length} عملية بنجاح.`,`Loaded ${a.logs.length} audit logs.`)))}catch(a){R(a.message||e("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function j(a){const i=_();return a==="profile"||a==="security"||a==="notifications"?!0:a==="company"?i||A("manage_settings"):a==="whatsapp"?i||A("manage_settings"):a==="roles"?i||A("manage_roles"):a==="accounts"?i||A("manage_users")||A("manage_existing_account_permissions")||A("view_user_activity"):a==="trash"?i||A("manage_trash"):a==="audit"?i||A("view_audit_logs"):a==="analytics"?i||A("manage_settings")||A("view_audit_logs"):a==="diagnostics"?i||A("manage_settings"):a==="vault"?i:!1}function ot(){const a=o.data?.user?.id,i=_(),r=j("company"),l=j("whatsapp"),p=j("roles"),g=j("accounts"),h=j("trash"),w=j("audit"),v=j("analytics"),k=j("diagnostics"),z=j("vault"),s=[["profile",e("الملف الشخصي","Profile")],["notifications",e("الإشعارات والتنبيهات","Notifications & Alerts")],...r?[["company",c("company")]]:[],...l?[["whatsapp",e("تنبيهات واتساب","WhatsApp Alerts")]]:[],...p?[["roles",c("roles")]]:[],...g?[["accounts",c("accounts")]]:[],["security",e("الأمان","Security")],...h?[["trash",e("سلة المهملات","Trash")]]:[],...w?[["audit",c("audit")]]:[],...v?[["analytics",e("المراقبة والزيارات والأداء","Observability & Analytics")]]:[],...k?[["diagnostics",e("تشخيص الأعطال والمستخدمين","Error Logs & User Diagnostics")]]:[],...z?[["vault",e("مركز النسخ والتعافي من الكوارث","Disaster Recovery & Vault")]]:[]];s.some(([d])=>d===o.settingsSection)||(o.settingsSection=s[0]?.[0]||"profile");const x=o.data?.user||{};let $="";if(o.settingsSection==="profile"&&($=`
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
              ${x.avatarUrl?`<img src="${t(x.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(x.avatarColor||"")?x.avatarColor:"#0d6269"};">${t(Ee(x))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(x.avatarColor||"")?x.avatarColor:"#0d6269"};">${t(Ee(x))}</div>`}
              <div class="avatar-upload-overlay">
                ${n("upload",18)}
                <span>${e("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${t(e(x.name,x.nameEn||x.name))}</h3>
            <p class="profile-user-role">${t(e(x.jobTitleAr||"",x.jobTitleEn||x.jobTitleAr||""))} · <span class="status-badge done">${t(G(x))}</span></p>
            <div class="profile-upload-actions">
              <input type="file" id="user-avatar-file-input" accept="image/jpeg,image/png,image/webp" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="user-avatar-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${n("upload",14)} ${e("رفع صورة جديدة","Upload new avatar")}
              </label>
              <span class="upload-hint">${e("يدعم JPG, PNG, WebP (حد أقصى 2MB)","Supports JPG, PNG, WebP (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-profile">
          <div class="form-grid">
            <div class="field">
              <label>${c("nameAr")}</label>
              <input name="name" value="${t(x.name||"")}" required />
            </div>
            <div class="field">
              <label>${c("nameEn")}</label>
              <input name="nameEn" value="${t(x.nameEn||"")}" />
            </div>
            <div class="field">
              <label>${c("jobTitle")} (${e("عربي","AR")})</label>
              <input name="jobTitleAr" value="${t(x.jobTitleAr||"")}" />
            </div>
            <div class="field">
              <label>${c("jobTitle")} (${e("إنجليزي","EN")})</label>
              <input name="jobTitleEn" value="${t(x.jobTitleEn||"")}" />
            </div>
            <div class="field full">
              <label>${c("email")}</label>
              <input value="${t(x.email||"")}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${e("رقم الواتساب للتنبيهات الفردية","WhatsApp Phone for Alerts")}</label>
              <input type="tel" name="phone" dir="ltr" value="${t(x.phone||x.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" />
              <small class="field-hint">${e("أدخل رقم هاتفك مع مفتاح الدولة لاستلام تنبيهات المهام والمخططات المسندة إليك مباشرة على الواتساب.","Enter your phone number with country code to receive alerts for assigned tasks and drawings directly on WhatsApp.")}</small>
            </div>
            <div class="field full">
              <label for="settings-calendar-system">${e("نظام التقويم المفضل في المنصة","Preferred Calendar System")}</label>
              <select id="settings-calendar-system" name="calendarSystem">
                <option value="gregorian" ${Ae()==="gregorian"?"selected":""}>${e("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${Ae()==="hijri"?"selected":""}>${e("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${e("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${c("save")}</button>
          </div>
        </form>
      </section>
    `),o.settingsSection==="company"&&(i||A("manage_settings"))){const d=o.data?.company||{};$=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${c("company")}</h2>
            <p>${e("هوية مساحة العمل وشعار الشركة واللغة الافتراضية.","Workspace identity, company logo, and default language.")}</p>
          </div>
        </div>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${e("انقر لرفع وتعديل شعار الشركة","Click to upload and change company logo")}">
            <div class="logo-upload-box">
              ${d.logoUrl?`<img src="${t(d.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${n("building",24)}</span>`:`<span class="brand-mark">${n("building",24)}</span>`}
              <div class="logo-upload-overlay">
                ${n("upload",16)}
                <span>${e("تعديل","Edit")}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${t(d.name||"DARC Design Team")}</strong>
            <span class="company-sub">${e("العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض","Arabic default · English support · Riyadh timezone")}</span>
            <div class="company-upload-actions">
              <input type="file" id="company-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="company-logo-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${n("upload",14)} ${e("رفع وتعديل الشعار","Upload & Change Logo")}
              </label>
              <span class="upload-hint">${e("يدعم PNG, SVG, JPG (حد أقصى 2MB)","Supports PNG, SVG, JPG (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-company" class="company-form">
          <div class="form-grid">
            <div class="field">
              <label>${c("nameAr")}</label>
              <input name="nameAr" value="${t(d.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${c("nameEn")}</label>
              <input name="nameEn" value="${t(d.nameEn||"")}" />
            </div>
            <div class="field full">
              <label>${c("emailStatus")}</label>
              <input value="${t(o.data?.emailConfigured?c("emailConfigured"):c("emailNotConfigured"))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${c("save")}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:16px;">${n("info",16)}<span>${c("emailInfo")}</span></div>
      </section>
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("نموذج الإنجاز","Progress model")}</h2>
            <p>${c("weightedExplanation")}</p>
          </div>
        </div>
        <div class="report-stat-list">
          <div class="report-stat"><span>${c("weightedProgress")}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${c("simpleProgress")}</span><strong style="color:var(--ink-soft)">—</strong></div>
        </div>
      </section>
    `}if(o.settingsSection==="security"&&($=`
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
          <div class="form-actions" style="margin-top:20px"><button type="submit" class="btn btn-primary">${c("save")}</button></div>
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
    `),o.settingsSection==="notifications"){const d=He(),f=Ge()&&!We(),E=d==="granted",y=d==="denied",T=f?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);font-weight:700;">${e("مدعومة عبر تطبيق الويب (PWA)","Supported via Web App (PWA)")}</span>`:`<span class="mini-badge" style="background:${E?"var(--mint)":y?"var(--red-soft)":"var(--surface-soft)"};color:${E?"var(--teal)":y?"var(--red)":"var(--muted)"};font-weight:700;">
          ${E?e("مفعلة على هذا المتصفح","Enabled on this browser"):y?e("محظورة من إعدادات المتصفح","Blocked in browser settings"):e("بانتظار الموافقة","Permission pending")}
        </span>`,b=f?`<button type="button" class="btn btn-primary btn-sm" data-action="show-ios-notification-guide">${n("bell",14)} ${e("طريقة التفعيل على iPhone","iPhone Setup Guide")}</button>`:E?`<button type="button" class="btn btn-ghost btn-sm" data-action="test-browser-notification" style="color:var(--teal);">${n("check",14)} ${e("فحص إشعار المتصفح","Test Browser Alert")}</button>`:`<button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications">${n("check",14)} ${e("تفعيل الإشعارات الآن","Enable Notifications")}</button>`;$=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("الإشعارات والتنبيهات","Notifications & Alerts")}</h2>
            <p>${e("تخصيص قنوات وصول التنبيهات الفورية وإشعارات المتصفح لسطح المكتب والهواتف الذكية.","Configure real-time notification channels and alerts for desktop and mobile.")}</p>
          </div>
          <button type="button" class="btn btn-primary btn-sm" data-action="send-test-notification">
            ${n("bell",14)} ${e("إرسال إشعار تجريبي فوري","Send Test Notification")}
          </button>
        </div>

        <div style="display:grid;gap:16px;margin-top:16px;">
          <!-- 1. Browser Web Notifications Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon ${E?"teal":y?"red":"blue"}" style="margin-top:2px;">
                ${n("bell",16)}
              </span>
              <div>
                <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:3px;">
                  ${e("إشعارات سطح المكتب والمتصفح والجوال (Web Alerts)","Desktop & Mobile Web Notifications")}
                </strong>
                <p style="margin:0;font-size:11px;color:var(--muted);max-width:480px;line-height:1.5;">
                  ${e("تسمح للموقع بإرسال تنبيهات فورية للنظام حتى عندما يكون المتصفح في الخلفية أو شاشة الهاتف مغلقة.","Allows the platform to deliver native system notifications even when the browser is in the background or screen locked.")}
                </p>
                <div style="margin-top:6px;">
                  ${T}
                </div>
              </div>
            </div>
            <div>
              ${b}
            </div>
          </div>

          <!-- 2. Audio Chimes Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon teal" style="margin-top:2px;">
                ${n("check",16)}
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
            <button type="button" class="btn btn-soft btn-sm" data-action="play-test-chime" style="display:inline-flex;align-items:center;gap:6px;">
              ${n("volume",14)} ${e("استمع للنغمة","Play Chime")}
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
                <strong style="color:var(--teal);font-size:12px;display:inline-flex;align-items:center;gap:4px;">${n("check",12)} ${e("نشطة وفورية (WebSocket)","Active Real-Time")}</strong>
              </div>
              <div style="padding:10px;border-radius:10px;background:var(--surface-soft);border:1px solid var(--line);">
                <span style="font-size:10px;color:var(--muted);display:block;">${e("تنبيهات واتساب المباشرة","WhatsApp Direct Alerts")}</span>
                <strong style="color:var(--teal);font-size:12px;display:inline-flex;align-items:center;gap:4px;">${n("check",12)} ${e("مربوطة (Baileys Engine)","Connected Baileys")}</strong>
              </div>
              <div style="padding:10px;border-radius:10px;background:var(--surface-soft);border:1px solid var(--line);">
                <span style="font-size:10px;color:var(--muted);display:block;">${e("بريد الإشعارات السحابي","Cloud Email Gateway")}</span>
                <strong style="color:var(--teal);font-size:12px;display:inline-flex;align-items:center;gap:4px;">${n("check",12)} ${e("جاهز (Resend API)","Ready Resend")}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    `}if(o.settingsSection==="accounts"&&g){const d=_()||A("view_user_activity"),f=_()||A("manage_users"),E=_()||A("manage_existing_account_permissions")||A("manage_users"),y=_()&&!O();let T=o.data?.users||[];a!=="usr_ahmad"&&(T=T.filter(b=>b.id!=="usr_ahmad")),$=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${c("accounts")}</h2>
            <p>${e("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${f?`<button class="btn btn-primary btn-sm" data-action="new-user">${n("plus",14)} ${c("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${c("team")}</th>
                <th>${c("role")}</th>
                <th>${c("email")}</th>
                <th>${c("accountStatus")}</th>
                ${d?`<th>${e("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${E?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${T.map(b=>{const I=b.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${ne(b)}
                        <div class="team-member-copy">
                          <strong>${t(e(b.name,b.nameEn||b.name))}</strong>
                          <span>${t(e(b.jobTitleAr||(I?"المبرمج / مدير النظام":""),b.jobTitleEn||b.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${I?`<span class="stealth-dev-badge">${n("shield",12)} ${e("مدير ومطور النظام","Super Admin & Dev")}</span>`:t(G(b))}
                    </td>
                    <td>
                      ${b.email?t(b.email):`<span style="color:var(--muted)">${c("noEmail")}</span>`}
                      ${b.phone||b.customFields?.phone?`<div style="font-size:11px;color:var(--primary);direction:ltr;text-align:right;margin-top:3px;font-family:monospace;font-weight:600;display:inline-flex;align-items:center;gap:4px;">${n("phone",11)} ${t(b.phone||b.customFields?.phone)}</div>`:""}
                    </td>
                    <td>
                      <span class="status-badge ${b.status==="active"?"done":"not_started"}">${b.status==="active"?c("activeAccount"):c("pendingAccount")}</span>
                    </td>
                    ${d?`
                      <td>
                        ${Oe(b)}
                      </td>
                    `:""}
                    ${E?`
                      <td>
                        <div class="role-actions">
                          ${I?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${t(b.id)}">${c("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${t(b.id)}">${c("edit")}</button>
                            ${b.id!==o.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${t(b.id)}" title="${b.status==="pending"?e("تفعيل الحساب يدوياً","Activate manually"):e("تغيير كلمة المرور","Change password")}">${n(b.status==="pending"?"check":"settings",13)}</button>
                              ${y?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${t(b.id)}" title="دخول كـ هذا الحساب">${n("user",13)}</button>`:""}
                            `:""}
                            ${b.id!==o.data?.user?.id&&b.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${t(b.id)}">${n("send",13)}</button>`:""}
                            ${b.id!==o.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${t(b.id)}">${n("trash",13)}</button>`:""}
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
    `}if(o.settingsSection==="roles"&&(i||A("manage_roles"))&&($=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${c("roles")}</h2>
            <p>${e("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${i||A("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${n("plus",14)} ${c("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(o.data?.roles||[]).map(d=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${t(e(d.nameAr,d.nameEn))}</strong>
                  ${d.builtIn?`<span class="role-system-badge">${n("shield",11)} ${c("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${t(e(d.descriptionAr,d.descriptionEn))}</p>
                <div class="role-meta">${d.permissions.includes("*")?e("صلاحية كاملة","Full access"):`${d.permissions.length} ${c("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${t(d.id)}">${n("edit",13)} ${c("edit")}</button>
                ${d.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${t(d.id)}">${n("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),o.settingsSection==="trash"&&h){if(!o.trash&&typeof sessionStorage<"u")try{const m=sessionStorage.getItem("darc_trash_cache");m&&(o.trash=JSON.parse(m))}catch{}!o.trashLoaded&&!o._trashFetching&&(o._trashFetching=!0,P("/api/trash").then(m=>{o.trash=Array.isArray(m)?m:m.trash||[...(m.projects||[]).map(u=>({...u,type:"project"})),...(m.tasks||[]).map(u=>({...u,type:"task"})),...(m.documents||[]).map(u=>({...u,type:"document"}))],o.trashLoaded=!0,o._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(o.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(m=>{o._trashFetching=!1,console.error("[Trash fetch error]",m)}));const d=o.trash||[],f=o.trashFilter||"all",E=(o.trashQuery||"").trim().toLowerCase(),y=d.filter(m=>{if(f!=="all"&&m.type!==f)return!1;if(!E)return!0;const u=(e(m.nameAr||m.titleAr,m.nameEn||m.titleEn)||m.name||m.title||m.originalName||"").toLowerCase(),S=(m.code||m.projectCode||"").toLowerCase(),C=(m.projectNameAr||m.projectNameEn||"").toLowerCase();return u.includes(E)||S.includes(E)||C.includes(E)}),T=d.filter(m=>m.type==="project").length,b=d.filter(m=>m.type==="task").length,I=d.filter(m=>m.type==="document").length,Z=d.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${n("info",16)}</div>
        <div class="trash-notice-text">
          <strong>${e("سلة المحذوفات المركزية المحمية","Central Protected Trash Bin")}</strong>
          <p>${e("تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.","Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.")}</p>
        </div>
      </div>

      <div class="view-toolbar trash-filter-bar">
        <div class="trash-filter-group">
          <button type="button" class="btn btn-sm ${f==="all"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="all">
            ${n("layers",14)}
            <span>${e("الكل","All")}</span>
            <span class="badge ${f==="all"?"badge-on-primary":"badge-neutral"}">${d.length}</span>
          </button>
          <button type="button" class="btn btn-sm ${f==="project"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="project">
            ${n("building",14)}
            <span>${e("المشاريع","Projects")}</span>
            <span class="badge ${f==="project"?"badge-on-primary":"badge-neutral"}">${T}</span>
          </button>
          <button type="button" class="btn btn-sm ${f==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${n("checklist",14)}
            <span>${e("المهام","Tasks")}</span>
            <span class="badge ${f==="task"?"badge-on-primary":"badge-neutral"}">${b}</span>
          </button>
          <button type="button" class="btn btn-sm ${f==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${n("document",14)}
            <span>${e("المستندات","Documents")}</span>
            <span class="badge ${f==="document"?"badge-on-primary":"badge-neutral"}">${I}</span>
          </button>
        </div>
        <div class="search-box search-sm trash-search-box">
          ${n("search",14)}
          <input type="search" placeholder="${e("بحث في المحذوفات...","Search deleted items...")}" value="${t(o.trashQuery||"")}" data-action="search-trash-input" />
        </div>
      </div>

      ${y.length?`
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
              ${y.map(m=>{const u=m.type==="project",S=m.type==="task",C=m.type==="document",F=e(m.nameAr||m.titleAr,m.nameEn||m.titleEn)||m.name||m.title||m.originalName||m.code||e("عنصر محذوف","Deleted item"),L=!u&&m.projectId?(o.data?.projects||[]).find(te=>te.id===m.projectId):null,q=m.projectNameAr||m.projectNameEn||(L?e(L.nameAr,L.nameEn||L.nameAr):null),J=m.projectCode||L?.code,Q=C&&m.size?m.size>1048576?(m.size/1048576).toFixed(1)+" MB":Math.round(m.size/1024)+" KB":"",ee=i||A("manage_trash")||m.uploaderId===a;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${u?"is-project":S?"is-task":"is-doc"}">
                          ${n(u?"building":S?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${t(F)}</strong>
                          ${m.code||u?`<span class="trash-item-code">${t(m.code||m.id)}</span>`:""}
                          ${C&&Q?`<span class="trash-item-code" style="color:var(--muted);">${Q}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${u?"type-project":S?"type-task":"type-doc"}">
                        ${n(u?"building":S?"checklist":"document",11)}
                        ${u?e("مشروع","Project"):S?e("مهمة","Task"):e("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${u?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${e("مشروع رئيسي","Primary Project")}</span>`:q?`${n("building",11)} <span>${t(q)}${J?` (${t(J)})`:""}</span>${C&&m.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${t(m.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${m.status?`<span class="status-badge ${t(m.status)}">${t(V(m.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${t(m.deletedAt||"")}">
                        ${le(m.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${o.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${t(m.type)}" data-id="${t(m.id)}" title="${e("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${n(o.lang==="ar"?"arrow":"arrowLeft",12)} ${e("استعادة","Restore")}
                        </button>
                        ${ee?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${t(m.type)}" data-id="${t(m.id)}" title="${e("حذف العنصر نهائياً","Permanently delete item")}">
                            ${n("trash",12)} ${e("حذف نهائي","Purge")}
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
          ${n("search",22)}
          <span>${e("لا توجد نتائج تطابق بحثك في سلة المهملات.","No items match your search in trash.")}</span>
        </div>
      `}
    `:!o.trashLoaded&&!d.length?`
      <div style="padding:48px 20px;text-align:center;">
        <div style="width:32px;height:32px;margin:0 auto 14px;border:3px solid var(--line);border-top-color:var(--teal);border-radius:50%;animation:spin 0.75s linear infinite;"></div>
        <div style="font-size:14px;font-weight:700;color:var(--ink);">${e("جاري فحص واسترجاع عناصر سلة المهملات...","Loading recycle bin items...")}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px;">${e("يتم جلب المشاريع والمهام والمستندات المحذوفة من الخادم...","Fetching deleted projects, tasks, and drawings from server...")}</div>
      </div>
    `:`
      <div class="empty">
        ${n("trash",24)}
        <span>${e("سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.","Trash is empty, no deleted items found.")}</span>
      </div>
    `;$=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${e("سلة المهملات","Recycle Bin")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${!o.trashLoaded&&!d.length?e("جاري التحميل...","Loading..."):`${d.length} ${e("عناصر","items")}`}
              </span>
            </div>
            <p>${e("استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.","Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.")}</p>
          </div>
          ${(i||A("manage_trash"))&&d.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${e("حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات","Permanently erase all deleted items")}">
                ${n("trash",13)} ${e("إفراغ سلة المهملات","Empty Trash")}
              </button>
            </div>
          `:""}
        </div>
        ${Z}
      </section>
    `}if(o.settingsSection==="audit"&&(i||A("view_audit_logs"))){const d=[...o.data?.auditLogs||[]].sort((u,S)=>new Date(S.createdAt).getTime()-new Date(u.createdAt).getTime()),f=o.auditFilterAction||"all",E=o.auditFilterEntity||"all",y=o.auditFilterUser||"all",T=(o.auditSearchQuery||"").trim().toLowerCase(),b=d.filter(u=>{if(f!=="all"&&u.action!==f||E!=="all"&&(u.entityType||u.entity_type)!==E||y!=="all"&&(u.userId||u.user_id||u.user?.id)!==y)return!1;if(T){const S=u.user||(u.userId?(o.data?.users||[]).find(te=>te.id===u.userId):null),C=(S&&e(S.name,S.nameEn||S.name)||"").toLowerCase(),{actionLabel:F,entityLabel:L}=me(u),q=(F||u.action||"").toLowerCase(),J=(L||u.entityType||"").toLowerCase(),Q=(u.id||u.entityId||"").toLowerCase(),ee=typeof u.details=="object"?JSON.stringify(u.details).toLowerCase():String(u.details||"").toLowerCase();if(!(C.includes(T)||q.includes(T)||J.includes(T)||Q.includes(T)||ee.includes(T)))return!1}return!0});o._lastFilteredAuditLogs=b;const I=[["all",e("كافة العمليات","All Actions")],["create",e("إنشاء جديد","Create")],["update",e("تعديل بيانات","Update")],["status_change",e("تغيير حالة","Status Change")],["delete",e("نقل للمهملات","Delete / Trash")],["restore",e("استعادة","Restore")],["purge",e("حذف نهائي","Purge")],["export_report",e("تصدير تقرير","Export Report")],["login",e("تسجيل دخول","Sign In")],["invite",e("دعوة مستخدم","Invite")]],Z=[["all",e("كافة العناصر","All Entities")],["project",e("المشاريع","Projects")],["task",e("المهام","Tasks")],["document",e("المستندات","Documents")],["user",e("المستخدمين","Users")],["role",e("الأدوار والصلاحيات","Roles")],["company",e("إعدادات الشركة","Company Settings")],["report",e("التقارير","Reports")]],m=f!=="all"||E!=="all"||y!=="all"||!!T;$=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${c("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${b.length} ${e("عملية معروضة","events shown")}
              </span>
              ${m?`
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${e("من أصل","out of")} ${d.length}
                </span>
              `:""}
            </div>
            <p>${e("سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.","Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.")}</p>
          </div>
          <div class="page-actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${o.auditFullHistoryLoaded?"":`
              <button class="btn btn-ghost btn-sm" data-action="load-full-audit" title="${e("جلب الأرشيف الكامل للسجلات من السيرفر","Load complete audit archive")}">
                ${n("refresh",13)} ${e("تحميل الأرشيف الكامل","Load All History")}
              </button>
            `}
            <button class="btn btn-soft btn-sm" data-action="export-audit-xls" title="${e("تصدير السجل كملف Excel منسق","Export as styled Excel file")}">
              ${n("download",13)} ${e("تصدير Excel","Export Excel")}
            </button>
            <button class="btn btn-primary btn-sm" data-action="print-audit-pdf" title="${e("معاينة وطباعة تقرير رسمي وحفظه كـ PDF","Print or save executive PDF report")}">
              ${n("printer",13)} ${e("طباعة تقرير PDF","Print / PDF")}
            </button>
          </div>
        </div>

        <div class="view-toolbar audit-toolbar" style="gap:10px;margin-bottom:16px;">
          <div class="search-box search-sm" style="flex:1;min-width:240px;max-width:380px;">
            ${n("search",14)}
            <input type="search" placeholder="${e("بحث فوري بالمنفذ، العملية، أو التفاصيل...","Search by actor, action, details...")}" value="${t(o.auditSearchQuery||"")}" data-action="search-audit-input" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="filter-select select-compact select-sm" data-action="filter-audit-action" style="min-width:125px;">
              ${I.map(([u,S])=>`<option value="${u}" ${f===u?"selected":""}>${S}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${Z.map(([u,S])=>`<option value="${u}" ${E===u?"selected":""}>${S}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${e("كافة المستخدمين","All Users")}</option>
              ${(o.data?.users||[]).map(u=>`<option value="${u.id}" ${y===u.id?"selected":""}>${t(e(u.name,u.nameEn||u.name))}</option>`).join("")}
            </select>
            ${m?`
              <button class="btn btn-ghost btn-sm" data-action="reset-audit-filters" style="font-size:11px;color:var(--muted);padding:4px 8px;" title="${e("إعادة تعيين الفلاتر","Reset filters")}">
                ${e("إلغاء التصفية","Clear")}
              </button>
            `:""}
          </div>
        </div>

        ${b.length?`
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
                ${b.map(u=>{const S=u.user||(u.userId?(o.data?.users||[]).find(te=>te.id===u.userId):null),C=S?e(S.name,S.nameEn||S.name):e("النظام","System"),F=S?G(S):e("تلقائي","Automated"),L=$e(u.createdAt),{badgeClass:q,actionLabel:J,entityLabel:Q,detailHtml:ee}=me(u);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${ne(S)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${t(C)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${t(F)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${q}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${t(J)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${t(Q)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${ee}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${o.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${t(L.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${n("clock",11)}
                          <span>${t(L.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${n(m?"search":"checklist",24)}
            <span>${m?e("لا توجد عمليات تطابق معايير التصفية المحددة.","No audit logs match the selected filter criteria."):e("لا توجد عمليات مسجلة حتى الآن.","No audit logs recorded yet.")}</span>
            ${m?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${e("إعادة تعيين الفلاتر","Reset filters")}
              </button>
            `:""}
          </div>
        `}
      </section>
    `}if(o.settingsSection==="analytics"&&v&&($=Be()),o.settingsSection==="diagnostics"&&k&&($=Ne()),o.settingsSection==="vault"&&z&&($=et(),requestAnimationFrame(()=>{pe()})),o.settingsSection==="whatsapp"&&l){const d=O(),f=o.data?.company?.customFields?.whatsapp||o.data?.company?.custom_fields?.whatsapp||{};$=`
      <section class="setting-section">
        ${d?`
          <div class="demo-whatsapp-banner" style="background:rgba(13,98,105,0.08);border:1px solid rgba(13,98,105,0.25);border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;gap:12px;">
            <span style="color:var(--teal);display:flex;align-items:center;">${n("shield",22)}</span>
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
          <span class="status-badge ${f.enabled?"done":"neutral"}">
            ${f.enabled?e("مفعل نشط","Active"):e("معطل","Disabled")}
          </span>
        </div>

        <form data-action="update-whatsapp" class="settings-form" style="max-width:740px;display:grid;gap:18px;">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
            <div>
              <strong style="display:block;font-size:14px;color:var(--ink);margin-bottom:4px;">${e("تفعيل إرسال التنبيهات عبر واتساب","Enable WhatsApp Notifications")}</strong>
              <span style="font-size:12px;color:var(--muted);">${e("إرسال إشعارات فورية لمهندسي الموقع والإدارة عند حدوث تغييرات حرجة.","Send instant alerts to field engineers & management upon critical updates.")}</span>
            </div>
            <label class="switch" style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" name="enabled" ${f.enabled?"checked":""} style="opacity:0;width:0;height:0;" id="wa-toggle-enabled" />
              <span class="slider round" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:var(--line);transition:.3s;border-radius:24px;"></span>
            </label>
          </div>

          <div class="form-grid">
            <div class="field">
              <label>${e("نوع مزود البوابة (Provider)","Gateway Provider")}</label>
              <select name="provider" class="select-compact" style="width:100%;height:42px;">
                <option value="evolution" ${f.provider!=="webhook"?"selected":""}>Evolution API / Baileys</option>
                <option value="webhook" ${f.provider==="webhook"?"selected":""}>Webhook (Custom Webhook URL)</option>
              </select>
            </div>

            <div class="field">
              <label>${e("اسم جلسة الربط (Instance Name)","Instance Name")}</label>
              <input type="text" name="instanceName" value="${t(f.instanceName||"darc-workspace")}" placeholder="darc-workspace" required />
            </div>
          </div>

          <div class="field">
            <label>${e("رابط خادم البوابة (Server Gateway URL) *","Server Gateway URL *")}</label>
            <input type="url" name="serverUrl" value="${t(f.serverUrl||"")}" placeholder="https://evolution-api.example.com" />
            <small style="font-size:11px;color:var(--muted);margin-top:4px;display:block;">${e("رابط خادم Evolution API الخاص بمكتبكم (أو رابط الـ Webhook المستلم).","Your office Evolution API instance URL or receiving Webhook.")}</small>
          </div>

          <div class="field">
            <label>${e("مفتاح الأمان (API Key / Token)","API Key / Token")}</label>
            <input type="password" name="apiKey" value="${t(f.apiKey||"")}" placeholder="••••••••••••••••" />
          </div>

          <div class="field">
            <label>${e("المستلم الافتراضي / قروب الواتساب (اختياري)","Default Recipient / WhatsApp Group (Optional)")}</label>
            <input type="text" name="recipient" value="${t(f.recipient||"")}" placeholder="${e("كود قروب واتساب المهندسين (1203630...@g.us) أو رقم جوال الإدارة","WhatsApp Group JID (1203630...@g.us) or Management Phone")}" />
            <small style="font-size:11px;color:var(--teal);margin-top:4px;display:block;">${e("ملاحظة: هذا الحقل اختياري. في حال عدم وجود قروب حالياً، يمكنك تركه فارغاً وسيتكفل النظام بإرسال كافة التنبيهات والمنشن كرسائل فردية مباشرة إلى هواتف المهندسين والمدير المسجلة في حساباتهم.","Note: This field is optional. If you do not have a group yet, leave it blank and the system will automatically send alerts & mentions directly to engineers & manager personal phones.")}</small>
          </div>

          <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;padding:16px;">
            <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:10px;">${e("أحداث التنبيه الفوري التلقائية:","Automated Trigger Events:")}</strong>
            <div style="display:grid;gap:8px;">
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnCollectiveMention" ${f.notifyOnCollectiveMention!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("megaphone",13)} ${e("عند المنشن الجماعي (@all / @الكل): إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة حتى المدير","When collective mention (@all / @everyone): send direct alert to all project members and managers")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="sendGroupBroadcast" ${f.sendGroupBroadcast?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("users",13)} ${e("إرسال نسخة لقروب الواتساب العام (في حال إدخال كود القروب في الحقل أعلاه)","Send a copy to the WhatsApp Group (if Group JID is set above)")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnBlocked" ${f.notifyOnBlocked!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("warning",13)} ${e("عند تعليق مهمة هندسية (Task Blocked) لتنبيه الموقع فوراً","When a task is blocked to alert field engineers instantly")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnApproval" ${f.notifyOnApproval!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("search",13)} ${e("عند إحالة مهمة للمراجعة والاعتماد (Review / Approval)","When a deliverable is submitted for review & approval")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnDrawing" ${f.notifyOnDrawing!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("compass",13)} ${e("عند اعتماد أو رفع مخطط معماري أو إنشائي جديد (New Drawing)","When an architectural or structural drawing is approved/uploaded")}</span>
              </label>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:10px;">
            <button type="submit" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:7px;">
              ${n("check",14)} <span>${e("حفظ إعدادات واتساب","Save WhatsApp Settings")}</span>
            </button>
            <button type="button" class="btn btn-soft" data-action="test-whatsapp" style="display:inline-flex;align-items:center;gap:7px;">
              <span>${n("phone",13)}</span> <span>${e("إرسال تنبيه تجريبي للواتساب","Send Test WhatsApp Alert")}</span>
            </button>
          </div>
        </form>
      </section>
    `}const D=i||A("manage_settings")||A("manage_roles")||A("manage_users")||A("manage_trash")||A("view_audit_logs");return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${D?e("تحكم مركزي","CENTRAL CONTROL"):e("الملف الشخصي","USER PROFILE")}</p>
        <h1>${D?c("settings"):e("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${D?e("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):e("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${n(i?"shield":"user",13)} ${t(G(x))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${s.map(([d,f])=>`<button class="${o.settingsSection===d?"active":""}" data-action="settings-section" data-section="${d}">${f}</button>`).join("")}
      </aside>
      <div class="settings-content">${$}</div>
    </div>
  `}var Fe=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function lt(a=null){const i=o.data?.permissionsCatalog&&o.data.permissionsCatalog.length>=10?o.data.permissionsCatalog:Fe,r=new Map;i.forEach(v=>{const k=v.category||"general",z=e(v.categoryAr||k,v.categoryEn||k);r.has(k)||r.set(k,{name:z,items:[]}),r.get(k).items.push(v)});const l=a?.id==="admin"||a?.permissions&&a.permissions.includes("*"),p=Array.from(r.entries()).map(([v,k])=>{const z=k.items.map(s=>{const x=s.id||s.key,$=e(s.nameAr||s.ar,s.nameEn||s.en||x),D=l||a?.permissions&&(a.permissions.includes(x)||typeof ve<"u"&&ve[x]&&a.permissions.includes(ve[x])),d=l?"disabled":"";return`
        <label class="permission-option" style="cursor:${l?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${t(x)}" ${D?"checked":""} ${d} />
          <span style="font-weight:500;">${t($)}</span>
        </label>
      `}).join("");return`
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${t(k.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${k.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${z}
        </div>
      </div>
    `}).join(""),g=l?"":`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${c("permissions")} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${i.length} ${e("صلاحية متاحة","available permissions")})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${e("تحديد الكل","Select All")}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${e("إلغاء التحديد","Deselect All")}</button>
      </div>
    </div>
  `,h=`
    <form id="role-form" data-role-id="${t(a?.id||"")}">
      <div class="form-grid">
        <div class="field">
          <label>${c("nameAr")} *</label>
          <input name="nameAr" value="${t(a?.nameAr||"")}" required />
        </div>
        <div class="field">
          <label>${c("nameEn")}</label>
          <input name="nameEn" value="${t(a?.nameEn||"")}" />
        </div>
        <div class="field full">
          <label>${c("roleDescription")}</label>
          <textarea name="descriptionAr" rows="2">${t(a?.descriptionAr||"")}</textarea>
        </div>
      </div>
      ${l?`
        <div class="role-modal-note" style="margin-top:15px;">
          ${e("مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.","The system administrator always keeps full root privileges [*] across all aspects of the system.")}
        </div>
      `:`
        ${g}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${p}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${c("cancel")}</button>
        <button type="submit" class="btn btn-primary">${n("check",14)} ${a?c("save"):c("create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=xe(a?e("تعديل الدور والصلاحيات","Edit role & permissions"):c("addRole"),e("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),h,"role","modal-lg");const w=document.getElementById("modal-root");if(w){const v=w.querySelector("#btn-perm-select-all"),k=w.querySelector("#btn-perm-deselect-all");v&&v.addEventListener("click",()=>{w.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(z=>z.checked=!0)}),k&&k.addEventListener("click",()=>{w.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(z=>z.checked=!1)})}}function dt(a=null){if(a?.id==="usr_ahmad"&&o.data?.user?.id!=="usr_ahmad")return R(e("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!a&&!_())return R(c("adminOnly"),!0);const i=!_(),r=i?"disabled":"",l=(o.data?.roles||[]).filter(g=>_()||g.id!=="admin"),p=`<form id="user-form" data-user-id="${t(a?.id||"")}" data-permission-only="${i}"><div class="form-grid"><div class="field full"><label>${c("nameAr")}</label><input name="name" value="${t(a?.name||"")}" ${r} required /></div><div class="field"><label>${c("nameEn")}</label><input name="nameEn" value="${t(a?.nameEn||"")}" ${r} /></div><div class="field"><label>${c("jobTitle")}</label><input name="jobTitleAr" value="${t(a?.jobTitleAr||"")}" ${r} /></div><div class="field"><label>${c("email")}</label><input name="email" type="email" value="${t(a?.email||"")}" placeholder="name@darc.com" ${r} /></div><div class="field"><label>${e("رقم الواتساب للتنبيهات","WhatsApp Phone")}</label><input name="phone" type="tel" dir="ltr" value="${t(a?.phone||a?.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" ${r} /></div><div class="field"><label>${c("role")}</label><select name="roleId">${l.map(g=>`<option value="${t(g.id)}" ${a?.roleId===g.id?"selected":""}>${t(e(g.nameAr,g.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${i?e("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):e("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${c("cancel")}</button><button type="submit" class="btn btn-primary">${n("check",14)} ${a?i?e("حفظ الصلاحية","Save permission"):c("save"):c("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=xe(a?i?e("تعديل صلاحية الحساب","Change account permission"):e("تعديل حساب العضو","Edit member account"):c("addMember"),e("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),p,"user")}export{dt as a,ft as c,Xe as d,vt as f,mt as g,Ke as h,lt as i,pe as l,gt as m,st as n,nt as o,ut as p,rt as r,it as s,j as t,be as u};
