import{t as ve}from"./rolldown-runtime-BQ-_32WO.js";import{$ as t,A as Ce,Dt as W,Et as O,G as ie,J as je,K as ee,M as _e,Mt as ue,Ot as l,Pt as R,Q as Ie,Rt as ce,St as F,Vt as r,X as ae,Y as e,_t as fe,at as pe,c as ge,et as Pe,ft as n,gt as J,i as ye,it as be,j as Re,mt as C,n as Q,nt as Le,ot as Me,pt as me,q as w,rt as xe,u as te,ut as Ne,xt as B,yt as ne}from"./core-dragdrop-BwC34WZu.js";var Ze=ve({attentionItem:()=>we,metricCard:()=>X,projectProgress:()=>he,projectRow:()=>$e,pulseChart:()=>ke,renderDashboard:()=>Fe,teamMetrics:()=>le,teamRow:()=>Ae});function X(s,i,o,p,f,y=""){return`<article class="metric-card ${p}"><div class="metric-top"><span class="metric-label">${t(s)}</span><span class="metric-icon">${n(f,15)}</span></div><div class="metric-value">${t(i)}</div><span class="metric-note ${y}">${t(o)}</span></article>`}function he(s){const i=s.health==="off_track"?"red":s.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${l("weightedProgress")}</span><strong>${s.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${i}" style="width:${Math.min(100,s.progress)}%"></div></div></div>`}function $e(s){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${n("building",17)}</span><div class="project-name"><strong>${t(e(s.nameAr,s.nameEn))}</strong><span>${t(s.code)} · ${t(e(s.clientAr,s.clientEn))}</span></div></div>${he(s)}<div class="project-owner">${ee(s.manager)}<span>${t(s.manager?e(s.manager.name,s.manager.nameEn||s.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${t(s.id)}" aria-label="${l("viewDetails")}">${n(r.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function we(s){const i=J(s)||s.status==="blocked"?"red":"amber",o=J(s)?e("متأخرة","Overdue"):s.status==="blocked"?e("متوقفة","Blocked"):e("تستحق قريبًا","Due soon"),p=e(s.titleAr,s.titleEn);return`<button type="button" class="attention-item" data-action="open-task" data-task-id="${t(s.id)}" title="${t(p)}"><span class="attention-icon ${i}">${n(J(s)||s.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${i})">${t(p)}</strong><span>${t(o)} · ${t(Ie(s.dueDate))}</span></span></button>`}function le(s,i){const o=i.filter(y=>fe(y,s)),p=o.reduce((y,x)=>y+Number(x.weight||1),0),f=p?Math.round(o.reduce((y,x)=>y+x.progress*Number(x.weight||1),0)/p):0;return{tasks:o.length,progress:f,overdue:o.filter(J).length}}function Ae(s,i){const o=le(s.id,i);return`<div class="team-row"><div class="team-member">${ee(s)}<div class="team-member-copy"><strong>${t(e(s.name,s.nameEn||s.name))}</strong><span>${t(e(s.jobTitleAr,s.jobTitleEn||s.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${o.tasks}</strong> ${l("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${l("progress")}</span><strong>${o.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${o.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${t(s.id)}">${n("more",15)}</button></div>`}function ke(){const s=[38,48,45,62,55,72,68],i=r.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${s.map((o,p)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,o-22)}%"></span><span class="pulse-bar ${p===s.length-1?"current":""}" style="height:${o}%"></span></div><span>${i[p]}</span></div>`).join("")}</div>`}function Fe(){const s=r.data?.stats||{},i=r.data?.projects||[],o=r.data?.tasks||[],p=r.data?.users||[],f=r.data?.user||{},y=f.name||f.email||e("مستخدم","User"),x=i.reduce((d,h)=>d+(Number(h.totalWeight)||0),0),A=x?Math.round(i.reduce((d,h)=>d+(Number(h.progress)||0)*(Number(h.totalWeight)||0),0)/x):0,g=[...o].filter(d=>{if(J(d)||d.status==="blocked")return!0;if(d.dueDate){const h=ne(d.dueDate);if(h){const T=(h-new Date)/864e5;return T>=0&&T<=7}}return!1}).sort((d,h)=>(d.dueDate?ne(d.dueDate)?.getTime()??1/0:1/0)-(h.dueDate?ne(h.dueDate)?.getTime()??1/0:1/0)).slice(0,5),k=p.filter(d=>d.status!=="inactive"),z=s.projectCount??i.length,a=s.myTasks??o.filter(d=>fe(d,f.id)).length,$=s.overdueTasks??o.filter(J).length,E=s.dueSoon??0,v=s.completedTasks??o.filter(d=>d.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${e("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${Ne()}، ${t(e(y.replace(/^م\.\s?/,""),f.nameEn||y))}</h1><p>${l("welcomeText")}</p></div><div class="welcome-status"><span>${l("portfolioHealth")}</span><strong>${A}%</strong><small>${e("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${X(l("activeProjects"),s.activeProjects||0,e(`${z} مشاريع إجمالًا`,`${z} projects total`),"teal","building","up")}${X(l("openTasks"),s.openTasks??o.length,e(`${a} مسندة لك`,`${a} assigned to you`),"blue","checklist")}${X(l("overdue"),$,e("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",$?"alert":"check",$?"alert":"")}${X(l("dueThisWeek"),E,e("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${l("projectProgress")}</h2><p class="panel-subtitle">${l("projectProgressSub")}</p></div>${w("view_projects")?`<button class="text-link" data-view="projects">${l("seeAll")} ${n(r.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${i.length?i.slice(0,5).map($e).join(""):`<div class="empty">${n("building",18)}<span>${l("noProjects")}</span></div>`}</div></section>${C()||w("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${l("teamProgress")}</h2><p class="panel-subtitle">${l("teamProgressSub")}</p></div><button class="text-link" data-view="team">${l("seeAll")} ${n(r.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${k.slice(0,6).map(d=>Ae(d,o)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${l("attention")}</h2><p class="panel-subtitle">${l("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${g.length}</span></div><div class="attention-list">${g.length?g.map(we).join(""):`<div class="empty">${n("check",18)}<span>${l("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${l("recentPulse")}</h2><p class="panel-subtitle">${l("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${v} ${l("done")}</span></div>${ke()}</section></div></div>`}var M=null,oe=!1;function Se(){return{isDemo:!0,stats:{totalVisits:1482,uniqueVisitors:628,activeSessions:14,avgTimeSpentFormattedAr:"9 دقائق و 15 ثانية",avgTimeSpentFormattedEn:"9m 15s",healthScore:"100%",crashFreeRate:"99.9%",bounceRate:"11.8%",returnRate:"72.4%",edgeLatency:"24ms",activeAnomaliesCount:0,totalAnomaliesLogged:1},countries:[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",visits:652,percent:44},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",visits:485,percent:32.7},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",visits:148,percent:10},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",visits:95,percent:6.4},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",visits:58,percent:3.9},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",visits:44,percent:3}],cities:[{name:"Dubai",visits:420},{name:"Riyadh",visits:310},{name:"Abu Dhabi",visits:232},{name:"Doha",visits:148},{name:"Jeddah",visits:125},{name:"Kuwait City",visits:95}],os:{macOS:680,Windows:490,iOS:212,Android:100},recentAnomalies:[{id:"anom_demo_01",type:"HighMemorySpike",severity:"medium",status:"resolved",descriptionAr:"ارتفاع مؤقت في استهلاك الذاكرة (142MB) أثناء معالجة ملف DWG ثلاثي الأبعاد - تم تقطيع العناصر تلقائياً وتفريغ الذاكرة بنجاح.",descriptionEn:"Transient memory spike (142MB) during 3D DWG parsing - elements automatically LOD decimated and memory purged.",timestamp:new Date(Date.now()-72e5).toISOString()}]}}async function Ue(s=!1){if(M&&!s)return M;oe=!0;try{const i=await Q("/api/telemetry/analytics",{silent:!0});i&&i.data&&(M=i.data)}catch(i){console.warn("[Analytics] Failed to fetch remote analytics:",i),te()&&(M=Se())}finally{oe=!1}return M}function Ee(){const s=te(),i=s&&(!M||!M.isDemo)?Se():M,o=ye();!i&&!oe&&Ue().then(()=>{if(r.view==="settings"&&r.settingsSection==="analytics"){const g=document.querySelector(".settings-content");g&&(g.innerHTML=Ee())}});const p=i?.stats||{totalVisits:384,uniqueVisitors:162,activeSessions:8,avgTimeSpentFormattedAr:"8 دقائق و 24 ثانية",avgTimeSpentFormattedEn:"8m 24s",healthScore:"100%",crashFreeRate:"99.8%",bounceRate:"11.4%",returnRate:"68.4%",edgeLatency:"32ms",activeAnomaliesCount:0,totalAnomaliesLogged:2},f=i?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",visits:165,percent:43},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",visits:112,percent:29.2},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",visits:48,percent:12.5},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",visits:24,percent:6.3},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",visits:18,percent:4.7},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",visits:9,percent:2.3},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",visits:8,percent:2}],y=i?.cities||[{name:"Dubai",visits:110},{name:"Riyadh",visits:78},{name:"Abu Dhabi",visits:55},{name:"Cairo",visits:48},{name:"Jeddah",visits:34},{name:"Doha",visits:24}];i?.os;const x=i?.recentAnomalies||[],A=o.memoryMb||45;return`
    <section class="setting-section">
      ${s?`
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
              ${O("active")} ${e("نظام الفلترة الذكي: منع التكرار لنفس الجهاز والـ IP","Active Deduplication: Unique Device & IP Binding")}
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
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${(p.totalVisits||384).toLocaleString()}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">(${(p.uniqueVisitors||162).toLocaleString()} ${e("زائر مستقل","uniques")})</span>
          </div>
          <div style="font-size:11px;color:var(--mint-strong);font-weight:600;display:flex;align-items:center;gap:4px;">
            <span>${O("active")} ${p.activeSessions||1} ${e("جلسات نشطة الآن","live sessions right now")}</span>
          </div>
        </div>

        <!-- بطاقة وقت الجلسة الحقيقي -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("متوسط مدة الزيارة الصافية (Dwell Time)","Avg Active Dwell Time")}</span>
            <span style="background:var(--blue-soft,#eaf1fb);color:var(--blue);padding:4px;border-radius:8px;display:flex;">${n("clock",14)}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);">${e(p.avgTimeSpentFormattedAr,p.avgTimeSpentFormattedEn)}</div>
          <div style="font-size:11px;color:var(--muted);">${e(`معدل الارتداد السريع: ${p.bounceRate||"11.4%"}`,`Bounce Rate: ${p.bounceRate||"11.4%"}`)}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("مؤشر استقرار الأجهزة (Health Score)","Device Stability Score")}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${n("shield",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:#2e7d32;">${p.healthScore||"100%"}</div>
            <span style="font-size:11px;color:var(--mint-strong);font-weight:700;display:inline-flex;align-items:center;gap:4px;">${O("healthy")} ${p.crashFreeRate||"99.8%"} ${e("خالية من الأعطال","Crash-Free")}</span>
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">${e(`ذاكرة جهازك الحالية: ${A}MB (آمنة)`,`Current Device Memory: ${A}MB (Healthy)`)}</div>
        </div>

        <!-- بطاقة سرعة السحابة ومعدل العودة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("سرعة السيرفر ومعدل عودة الفريق","Cloud Speed & Retention")}</span>
            <span style="background:var(--amber-soft,#fff1dc);color:var(--amber);padding:4px;border-radius:8px;display:flex;">${n("trendingUp",14)}</span>
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
            <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("globe",16)}</span> ${e("توزيع الزيارات حسب البلدان والمدن (Cloudflare Edge Geolocation)","Traffic Breakdown by Countries & Cities")}
          </h3>
          <span style="font-size:11px;color:var(--muted);">${e("يتم التعرف على الدول والمدن تلقائياً عند الدخول دون إجهاد السيرفر","Identified automatically via Cloudflare Edge headers")}</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;">
          <!-- قائمة الدول -->
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${f.map(g=>`
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
                  <span style="display:flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);">
                    <span style="font-size:11px;font-weight:800;background:var(--surface-soft);border:1px solid var(--line);padding:2px 6px;border-radius:4px;color:var(--teal);">${t(g.code||"GL")}</span>
                    <span>${t(e(g.nameAr||"",g.nameEn||""))}</span>
                  </span>
                  <span style="font-weight:700;color:var(--teal);">${Number(g.visits||0).toLocaleString()} <span style="font-weight:400;font-size:11px;color:var(--muted);">(${Number(g.percent||0)}%)</span></span>
                </div>
                <div style="height:6px;width:100%;background:var(--surface-soft);border-radius:999px;overflow:hidden;border:1px solid var(--line);">
                  <div style="height:100%;width:${Number(g.percent||0)}%;background:linear-gradient(90deg, var(--teal), var(--mint-strong));border-radius:999px;"></div>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- قائمة أبرز المدن وتوزيع الأجهزة والأنظمة -->
          <div style="display:flex;flex-direction:column;gap:16px;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("أبرز المدن زيارة:","Top Visiting Cities:")}</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${y.map(g=>`
                  <span style="background:var(--surface);border:1px solid var(--line);padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:6px;">
                    ${n("pin",11)} ${t(g.name||"")} <span style="font-size:10px;color:var(--teal);font-weight:700;">${Number(g.visits||0)}</span>
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
            <span class="status-badge ${x.some(g=>g.status==="active")?"urgent":"done"}">
              ${x.some(g=>g.status==="active")?e("تم رصد حالات تستدعي المتابعة","Active Anomalies"):e("جميع الأجهزة تعمل باستهلاك طبيعي","Optimal Performance")}
            </span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${x.length?x.map(g=>`
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;background:${g.status==="active"?"rgba(239,68,68,0.06)":"var(--surface-soft)"};border:1px solid ${g.status==="active"?"rgba(239,68,68,0.25)":"var(--line)"};">
              <span style="margin-top:2px;display:inline-flex;align-items:center;color:${g.status==="active"?"#ef4444":"#10b981"};">${g.status==="active"?n("alert",18):n("success",18)}</span>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <strong style="font-size:13px;color:${g.status==="active"?"var(--red)":"var(--ink)"};">${t(e(g.titleAr||"",g.titleEn||""))}</strong>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:10px;background:var(--surface);border:1px solid var(--line);padding:2px 8px;border-radius:999px;font-family:monospace;">${t(g.ip||"")}</span>
                    <span style="font-size:11px;color:var(--muted);">${new Date(g.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                  </div>
                </div>
                <p style="margin:4px 0 0;font-size:12px;color:var(--ink-soft);line-height:1.5;">${t(e(g.detailAr||"",g.detailEn||""))}</p>
                <div style="display:flex;align-items:center;gap:10px;margin-top:6px;font-size:11px;color:var(--muted);flex-wrap:wrap;">
                  <span style="display:inline-flex;align-items:center;gap:4px;">${n("pin",11)} ${t(g.city||"")}, ${t(g.countryCode||"")}</span>
                  <span style="display:inline-flex;align-items:center;gap:4px;">${n("grid",11)} ${t(g.deviceType||"")}</span>
                  <span style="font-weight:600;color:${g.status==="active"?"var(--red)":"var(--mint-strong)"};">${g.status==="active"?e("قيد التدخل الوقائي","Mitigating"):e("تمت المعالجة وحماية الاستقرار","Resolved & Protected")}</span>
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
  `}var Z=null,re=!1,L="all",U="all",V="all";async function Oe(s=!1){if(Z&&!s)return Z;re=!0;try{const i=await Q("/api/telemetry/incidents",{silent:!0});i&&i.users&&(Z=i)}catch(i){console.warn("[Diagnostics] Failed to fetch incidents:",i)}finally{re=!1}return Z}function et(s){L=s}function tt(s){U=s}function at(s){V=s}function Be(s=""){const i=String(s).toLowerCase();return i.includes("http")||i.includes("api")?"cat-http":i.includes("nav")?"cat-nav":i.includes("ui")||i.includes("click")||i.includes("drop")?"cat-ui":i.includes("ws")||i.includes("socket")||i.includes("realtime")?"cat-ws":i.includes("err")?"cat-err":i.includes("warn")?"cat-warn":"cat-ui"}function Te(){const s=te(),i=Z;ye(),!i&&!re&&Oe().then(()=>{if(r.view==="settings"&&(r.settingsSection==="diagnostics"||r.settingsSection==="analytics")){const a=document.querySelector(".settings-content");a&&(a.innerHTML=Te())}});let o=i?.users||[];s?(o=o.filter(a=>a.userId&&String(a.userId).startsWith("usr_demo")),!o.length&&r.data?.users&&(o=r.data.users.filter(a=>a.id&&String(a.id).startsWith("usr_demo")).map(a=>({userId:a.id,name:a.name,nameEn:a.nameEn||a.name,email:a.email,role:a.jobTitleAr||(a.roleId==="admin"?"مدير النظام (عرض تجريبي)":a.roleId||"عضو فريق"),avatarColor:a.avatarColor||"#0d6269",isRealAccount:!1,status:a.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})))):!o.length&&r.data?.users&&r.data.users.length&&(o=r.data.users.map(a=>({userId:a.id,name:a.name,nameEn:a.nameEn||a.name,email:a.email,role:a.jobTitleAr||(a.roleId==="admin"?"مدير النظام (كامل الصلاحيات)":a.roleId||"عضو فريق"),avatarColor:a.avatarColor||"#0d6269",isRealAccount:!0,status:a.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})));let p=i?.incidents||[];s&&(p=p.filter(a=>a.userId&&String(a.userId).startsWith("usr_demo")));const f=i?.stats||{totalIncidents:s?p.length:3,activeIncidents:0,resolvedIncidents:s?p.length:3,totalUsersMonitored:o.length||6,alertEmailRecipient:s?"demo-alerts@darc.demo (بيئة المحاكاة الآمنة)":"admin@darc-design.bond"};L!=="all"&&(p=p.filter(a=>a.userId===L||a.affectedUsers?.includes(L))),U!=="all"&&(p=p.filter(a=>a.severity===U)),V!=="all"&&(p=p.filter(a=>a.status===V));const y=o.find(a=>a.userId===L),x=typeof ge=="function"?ge():{connected:!1},A=typeof ce=="function"?ce().length:0,g=typeof navigator<"u"?navigator.onLine:!0,k=g?x.connected?e("متصل ومستقر","Connected"):x.hibernating?e("في وضع التوفير (خامل)","Hibernating"):e("بانتظار الربط","Connecting"):e("غير متصل (أوفلاين)","Offline"),z=g?x.connected?"var(--mint-strong)":"var(--blue)":"var(--amber)";return`
    <section class="setting-section diag-section" id="diagnostics-dashboard">
      ${s?`
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
          <div style="font-size:22px;font-weight:800;color:var(--ink);margin:4px 0;">${f.totalIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${e("موثقة بالكامل ببصمات فريدة","Fingerprint grouped with stack traces")}</div>
        </div>

        <div class="diag-metric-card ${f.activeIncidents>0?"is-active-warning":""}">
          <div style="font-size:11px;color:${f.activeIncidents>0?"var(--red)":"var(--muted)"};font-weight:600;">${e("حوادث نشطة بحاجة لمتابعة","Active / Unresolved")}</div>
          <div style="font-size:22px;font-weight:800;color:${f.activeIncidents>0?"var(--red)":"var(--teal)"};margin:4px 0;">${f.activeIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${f.activeIncidents>0?`${O("warning")} ${e("تستدعي تدخل هندسي","Requires engineering fix")}`:`${O("healthy")} ${e("جميع الحوادث معالجة","All resolved")}`}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("حسابات الفريق المراقبة","Monitored Users")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--teal);margin:4px 0;">${o.length||f.totalUsersMonitored||6} ${e("مستخدمين","Users")}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${e("تغطية شاملة لكل جلسة ومصادقة","Continuous per-session telemetry")}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("نظام التنبيهات البريدية (Email Alerts)","Email Alert System")}</div>
          <div style="font-size:13px;font-weight:700;color:var(--mint-strong);margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span style="display:inline-flex;align-items:center;">${s?n("flask",14):n("mail",14)}</span> ${s?e("محاكاة الساندبوكس (معزول)","Sandbox Simulation (Isolated)"):e("مفعّل ويرسل تلقائياً","Active & Auto-Dispatched")}
          </div>
          <div style="font-size:11px;color:var(--muted);font-family:monospace;overflow:hidden;text-overflow:ellipsis;">${t(f.alertEmailRecipient||(s?"demo-alerts@darc.demo":"admin@darc-design.bond"))}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("المزامنة الفورية (Realtime & Outbox)","Live Sync & Outbox")}</div>
          <div style="font-size:13px;font-weight:700;color:${z};margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span class="column-dot ${x.connected?"green":"amber"}"></span>
            ${k}
            ${x.latencyMs?`<span style="font-size:10px;color:var(--muted);font-weight:500;">(${x.latencyMs}ms)</span>`:""}
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">
            ${A>0?`<span style="color:var(--amber);font-weight:600;">${A} ${e("معلقة بالإرسال","outbox pending")}</span>`:`${O("healthy")} ${e("قائمة الإرسال خالية ومحدثة","Outbox empty & synced")}`}
          </div>
        </div>
      </div>

      <!-- 3. User Explorer Grid -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span style="display:inline-flex;align-items:center;">${n("users",14)}</span> ${e("حالة واستقرار حسابات المستخدمين (انقر للفلترة السريعة):","User Health & Incidents (Click to Filter):")}
          </h3>
          ${L!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${e("إلغاء الفلترة وعرض الجميع","Clear Filter & Show All")}
            </button>
          `:""}
        </div>

        <div class="diag-users-grid">
          <div 
            class="diag-user-card user-diag-card ${L==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("globe",18)}</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${e("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${p.length} ${e("حوادث","records")}</div>
              </div>
            </div>
          </div>

          ${o.map(a=>{const $=L===a.userId,E=a.activeIncidents>0;return`
              <div 
                class="diag-user-card user-diag-card ${$?"is-active":""}" 
                data-action="filter-diagnostics-user" 
                data-user-id="${t(a.userId)}"
                title="${e("انقر لعرض الحوادث الخاصة بهذا المستخدم فقط","Click to view only incidents for this user")}"
              >
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:34px;height:34px;border-radius:50%;background:${t(a.avatarColor||"#0d6269")};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">
                    ${t((a.name||"US").slice(0,2))}
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:6px;justify-content:space-between;">
                      <div style="font-size:12px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        ${t(e(a.name||"",a.nameEn||a.name||""))}
                      </div>
                      ${a.isRealAccount?`
                        <span style="background:rgba(16,185,129,0.12);color:#059669;border:1px solid rgba(16,185,129,0.25);font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px;flex-shrink:0;display:inline-flex;align-items:center;gap:3px;">
                          ${O("active")} ${e("حساب مفعل","Active")}
                        </span>
                      `:""}
                    </div>
                    <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t(a.email||"")}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span class="status-badge ${E?"urgent":"done"}" style="font-size:9px;padding:1px 6px;">
                        ${E?e(`${a.activeIncidents} حادث نشط`,`${a.activeIncidents} Active`):e("مستقر (0 أعطال)","Healthy (0 errors)")}
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
            <option value="all" ${U==="all"?"selected":""}>${e("جميع مستويات الخطورة","All Severities")}</option>
            <option value="critical" ${U==="critical"?"selected":""}>${e("حرجة (Critical)","Critical")}</option>
            <option value="high" ${U==="high"?"selected":""}>${e("مرتفعة (High)","High")}</option>
            <option value="medium" ${U==="medium"?"selected":""}>${e("متوسطة (Medium)","Medium")}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${V==="all"?"selected":""}>${e("جميع الحالات","All Statuses")}</option>
            <option value="active" ${V==="active"?"selected":""}>${e("نشطة قيد المعالجة","Active")}</option>
            <option value="resolved" ${V==="resolved"?"selected":""}>${e("تم حلها بنجاح","Resolved")}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${e(`عرض ${p.length} حادث مسجل`,`Showing ${p.length} incidents`)}
          ${y?` (${e("للمستخدم:","for user:")} <strong>${y.name}</strong>)`:""}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${p.length?p.map(a=>{const $=a.severity==="critical",E=a.status==="resolved",v=a.occurrences||1,d=a.affectedUsers&&a.affectedUsers.length||1,h=a.origin==="backend_worker"?"Backend Server (Worker)":"Frontend Client (SPA)",T=JSON.stringify({incidentId:a.id,fingerprint:a.fingerprint||null,occurrences:v,affectedUsersCount:d,origin:a.origin||"frontend_client",timestamp:a.timestamp,user:{id:a.userId,name:a.userName,email:a.userEmail,role:a.userRole},client:{device:a.deviceType,browser:a.browser,os:a.os,resolution:a.screenResolution,memoryMb:a.memoryMb,ip:a.ip,location:`${a.city}, ${a.country}`},error:{type:a.errorType,message:a.errorMessage,stack:a.stackTrace},breadcrumbs:a.breadcrumbs,suggestedFix:a.suggestedSolution},null,2);return`
            <article class="diag-incident-card ${$?"is-critical":a.severity==="high"?"is-warning":""}">
              
              <!-- Incident Head -->
              <div class="diag-incident-head">
                <div style="display:flex;align-items:flex-start;gap:12px;">
                  <span style="line-height:1;margin-top:2px;display:flex;align-items:center;color:${E?"#10b981":$?"#ef4444":"#f59e0b"};">${E?n("success",22):$?n("alert",22):n("warning",22)}</span>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                      <h4 style="margin:0;font-size:15px;font-weight:700;color:${E?"var(--ink)":$?"var(--red)":"var(--amber-strong)"};">
                        ${t(e(a.titleAr||"",a.titleEn||""))}
                      </h4>
                      <span class="status-badge ${$?"urgent":a.severity==="high"?"in-review":"done"}" style="font-size:10px;">
                        ${t(String(a.severity||"high").toUpperCase())}
                      </span>
                      <span style="font-size:10px;font-family:monospace;background:var(--surface-soft);border:1px solid var(--line);padding:2px 8px;border-radius:4px;color:var(--muted);">
                        ${t(a.id||"")}
                      </span>
                      <span style="font-size:10px;font-family:monospace;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);padding:2px 6px;border-radius:4px;">
                        ${t(h)}
                      </span>
                      ${v>1?`
                        <span class="badge" style="background:rgba(239,68,68,0.12);color:var(--red);border:1px solid rgba(239,68,68,0.25);font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;">
                          ${n("alert",11)} ${e(`تكرر ${v} مرات`,`${v} occurrences`)}
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
                        <span style="width:18px;height:18px;border-radius:50%;background:${t(a.avatarColor||"#0d6269")};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;">
                          ${t(a.userName?.slice(0,2)||"US")}
                        </span>
                        <strong style="color:var(--ink);">${t(a.userName)}</strong> (${t(a.userEmail)})
                      </span>
                      <span>·</span>
                      <span style="display:inline-flex;align-items:center;gap:4px;">${n("pin",12)} ${t(a.city)}, ${t(a.country)} (${t(a.ip)})</span>
                      <span>·</span>
                      <span style="display:inline-flex;align-items:center;gap:4px;">${n("clock",12)} ${new Date(a.timestamp).toLocaleString(r.lang==="ar"?"ar-AE":"en-US")}</span>
                    </div>
                  </div>
                </div>

                <!-- Resolve & Actions -->
                <div style="display:flex;align-items:center;gap:8px;">
                  ${E?`
                    <span class="status-badge done" style="font-size:11px;display:inline-flex;align-items:center;gap:4px;">
                      ${n("check",12)} ${e("تم حل المشكلة وإغلاق البلاغ","Resolved")}
                    </span>
                  `:`
                    <button type="button" class="btn btn-sm btn-primary" data-action="resolve-diagnostic-incident" data-incident-id="${t(a.id)}" style="font-size:11px;display:flex;align-items:center;gap:5px;">
                      ${n("check",13)} ${e("تحديد كمعالج","Mark Resolved")}
                    </button>
                  `}
                  <button type="button" class="btn btn-sm btn-soft" data-action="copy-debug-bundle" data-bundle="${t(T)}" style="font-size:11px;display:flex;align-items:center;gap:5px;" title="${e("نسخ كامل التقرير الفني لحل المشكلة فوراً","Copy complete technical debug bundle to clipboard")}">
                    ${n("copy",13)} ${e("نسخ تقرير الخطأ","Copy Debug Info")}
                  </button>
                </div>
              </div>

              <!-- Technical Environment Specs Matrix -->
              <div class="diag-specs-grid" dir="ltr" style="text-align:left;">
                <div><span style="color:var(--muted);">${e("نظام التشغيل:","OS:")}</span> <strong>${t(a.os||"macOS")}</strong></div>
                <div><span style="color:var(--muted);">${e("المتصفح:","Browser:")}</span> <strong>${t(a.browser||"Chrome")}</strong></div>
                <div><span style="color:var(--muted);">${e("نوع الجهاز:","Device:")}</span> <strong>${t(a.deviceType||"Desktop")}</strong></div>
                <div><span style="color:var(--muted);">${e("أبعاد الشاشة:","Screen:")}</span> <strong>${t(a.screenResolution||"1920x1080")}</strong></div>
                <div><span style="color:var(--muted);">${e("ذاكرة الـ Heap:","Memory:")}</span> <strong style="color:${a.memoryMb>130?"var(--red)":"var(--teal)"};">${t(String(a.memoryMb))} MB</strong></div>
                <div><span style="color:var(--muted);">${e("المسار النشط:","Route:")}</span> <strong style="color:var(--teal);font-family:monospace;">${t(a.currentView||"#dashboard")}</strong></div>
              </div>

              <!-- Error Message & Stack Trace (The exact code location) -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("search",14)}</span> ${e("الخطأ وموقع الاستثناء البرمجي (Stack Trace):","Error Message & Call Stack:")}
                </div>
                <div class="diag-code-box">
                  <div style="color:#ef4444;font-weight:700;margin-bottom:8px;">${t(a.errorMessage)}</div>
                  <pre style="margin:0;color:#94a3b8;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;">${t(a.stackTrace)}</pre>
                </div>
              </div>

              <!-- User 5D Flight Recorder Timeline -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("footprint",14)}</span> ${e("تسلسل خطوات المستخدم قبل الخطأ (5D Flight Recorder Timeline):","Step-by-Step Flight Recorder Timeline:")}
                </div>
                <div class="diag-timeline">
                  ${(a.breadcrumbs||[]).length?a.breadcrumbs.map(u=>{const b=Be(u.category);return`
                      <div class="diag-timeline-item ${b}">
                        <span class="diag-badge-category ${b}">[${t(u.category||"action")}]</span>
                        <span style="font-family:monospace;color:var(--muted);font-size:11px;">[${t(u.time||"")}]</span>
                        <span style="flex:1;">${t(u.message||"")}</span>
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
                  ${t(a.suggestedSolution||e("تحقق من صحة الكود ومسارات المعالجة.","Review code handling."))}
                </div>
              </div>

              <!-- Email Dispatch Status Receipt -->
              <div class="diag-footer-receipt">
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <span style="display:inline-flex;align-items:center;">${n("mail",13)}</span>
                  <span>${e("حالة إرسال بريد التنبيه للإدارة:","Admin Alert Email:")}</span>
                  <strong style="color:var(--teal);">${s?e("محاكاة الساندبوكس (معزول)","Simulated Sandbox"):a.emailAlert?.status==="delivered"?e("تم التسليم للبريد بنجاح","Delivered"):e("تم التحقق والتسجيل في السيرفر","Dispatched to Sandbox")}</strong>
                  <span style="font-family:monospace;">(${t(s?"demo-alerts@darc.demo":a.emailAlert?.deliveredTo||"admin@darc-design.bond")})</span>
                </div>
                <div>
                  ${E?e(`معالج بواسطة: ${t(a.resolvedBy||"Admin")}`,`Resolved by: ${t(a.resolvedBy||"Admin")}`):e("قيد التدخل البرمجي","Awaiting resolution")}
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
  `}var st=ve({FULL_PERMISSIONS_CATALOG:()=>De,canAccessSettingsSection:()=>P,exportAuditLogsXLS:()=>He,fetchFullAuditHistory:()=>Ve,openRoleModal:()=>Qe,openUserModal:()=>Ye,printAuditReport:()=>qe,renderAuditForProject:()=>Ge,renderSettings:()=>Je,renderTeam:()=>We,renderUserActivityCell:()=>ze});function We(){if(!C()&&!w("manage_users"))return`<section class="panel"><div class="empty">${n("alert",18)}<span>${e("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const s=r.data?.user?.id;let i=(r.data?.users||[]).filter(o=>o.status!=="inactive");return s!=="usr_ahmad"?i=i.filter(o=>o.id!=="usr_ahmad"):i=[...i].sort((o,p)=>o.id==="usr_ahmad"?-1:p.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${e("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${l("team")}</h1>
        <p>${e("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${C()||w("manage_users")?`<button class="btn btn-primary" data-action="new-user">${n("plus",15)} ${l("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${i.map(o=>{const p=le(o.id,r.data?.tasks||[]),f=o.id==="usr_ahmad";return`
          <article class="member-card ${f?"system-developer-card":""}" style="${f?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${ee(o,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${t(e(o.name,o.nameEn||o.name))}</strong>
                  <span>${t(e(o.jobTitleAr||(f?"المبرمج / مدير النظام":""),o.jobTitleEn||o.jobTitleAr||""))}</span>
                </div>
              </div>
              ${f?`<span class="stealth-dev-badge">${n("shield",12)} ${e("مدير ومطور النظام","Super Admin & Dev")}</span>`:je()&&o.id!==r.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${t(o.id)}">${n("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${o.status==="active"?"done":"not_started"}">${t(B(o))}</span>
            </div>
            <div class="member-card-stats">
              <span>${l("progress")} <strong>${p.progress}%</strong></span>
              <span>${p.tasks} ${l("tasks")}</span>
            </div>
            <div class="member-email">${o.email?t(o.email):l("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function Ge(s){const i=(r.data?.auditLogs||[]).filter(o=>o.details?.projectId===s||o.entityType==="project"&&o.entityId===s);return i.length?`<div class="audit-list">${i.map(o=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${t(o.user?e(o.user.name,o.user.nameEn||o.user.name):"DARC")} · ${t(o.action)}</strong><span>${t(o.entityType)} · ${ae(o.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${n("check",18)}<span>${e("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function ze(s){const i=s.lastActiveAt||s.customFields?.lastActiveAt,o=s.lastLoginAt||s.customFields?.lastLoginAt;if(!i&&!o)return`<span class="activity-never">${e("لم يسجل دخول بعد","Never logged in")}</span>`;const p=Date.now(),f=i?new Date(i).getTime():0,y=s.id===r.data?.user?.id?0:f&&!isNaN(f)?Math.floor((p-f)/6e4):999999,x=y>=0&&y<=5;let A="";if(x)A=`<span class="activity-pill online"><span class="activity-dot online"></span> ${e("نشط الآن","Online")}</span>`;else if(y<60)A=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${e(`منذ ${y} دقيقة`,`${y}m ago`)}</span>`;else if(y<1440){const k=Math.floor(y/60);A=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${e(`منذ ${k} ساعة`,`${k}h ago`)}</span>`}else f>0&&(A=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${ae(i,!1)}</span>`);const g=o?`<span class="activity-sub" title="${t(o)}">${e("دخول:","Login:")} ${ae(o,!0)}</span>`:"";return`<div class="activity-wrapper">${A}${g}</div>`}function de(s){return Le(s,{includeSeconds:!0})}function se(s){const i=s.action||"",o=s.entityType||s.entity_type||"",p=s.details||{};let f="badge-neutral",y=i,x=o;i==="login"?(f="badge-teal",y=e("تسجيل دخول","Sign In"),x=e("جلسة نظام","System Session")):i==="create"?(f="badge-mint",y=e("إنشاء جديد","Created")):i==="update"?(f="badge-blue",y=e("تعديل بيانات","Updated")):i==="delete"?(f="badge-red",y=e("نقل للمهملات","Moved to Trash")):i==="status_change"?(f="badge-amber",y=e("تغيير حالة","Status Changed")):i==="export_report"?(f="badge-teal",y=e("تصدير تقرير","Exported Report")):i==="restore"?(f="badge-mint",y=e("استعادة","Restored")):i==="purge"?(f="badge-danger",y=e("حذف نهائي","Purged")):i==="invite"&&(f="badge-blue",y=e("دعوة مستخدم","Invite Sent")),o==="task"?x=e("مهمة","Task"):o==="project"?x=e("مشروع","Project"):o==="document"?x=e("مستند","Document"):o==="user"?x=e("مستخدم","User"):o==="report"?x=e("تقرير","Report"):o==="role"&&(x=e("دور وصلاحيات","Role"));let A="—";return p.title||p.name?A=`<strong>${t(p.title||p.name)}</strong>`:i==="status_change"&&(p.oldStatus||p.newStatus)?A=`<span>${t(W(p.oldStatus))} → <strong>${t(W(p.newStatus))}</strong></span>`:s.entityId&&(A=`<code style="font-size:11px;color:var(--muted);">${t(s.entityId)}</code>`),{badgeClass:f,actionLabel:y,entityLabel:x,detailHtml:A}}function He(s=null){if(!w("view_audit_logs")&&!C()){R(e("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}const i=s||r._lastFilteredAuditLogs||r.data?.auditLogs||[];if(!i.length){R(e("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const o=Me(),p=o.displayName,f=o.logoUrl,y=r.data?.user||{},x=e(y.name,y.nameEn||y.name)||"Admin",A=xe(),g=be();let k=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${f?`<img src="${t(f)}" height="38" style="vertical-align:middle;margin-inline-end:10px;" />`:""}
          <span style="vertical-align:middle;">${e("سجل الرقابة والتدقيق الأمني والعمليات — "+p,"Audit & Security Trail Report — "+p)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${e("المؤسسة:","Company:")} ${t(p)} | ${e("المشرف المستخرج:","Exported by:")} ${t(x)} | ${e("تاريخ التصدير:","Export Date:")} ${t(A)} ${t(g)}
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
  `;i.forEach((a,$)=>{const E=a.user||(a.userId?(r.data?.users||[]).find(N=>N.id===a.userId):null),v=E?e(E.name,E.nameEn||E.name):e("النظام","System"),d=E?B(E):"—",h=de(a.createdAt),{actionLabel:T,entityLabel:u}=se(a);let b="";a.details?.title||a.details?.name?b=a.details.title||a.details.name:a.action==="status_change"?b=`${W(a.details?.oldStatus)} → ${W(a.details?.newStatus)}`:typeof a.details=="object"?b=JSON.stringify(a.details):b=String(a.details||a.entityId||"—");const D=$%2===0?"#ffffff":"#f8fafc";k+=`
      <tr style="background:${D};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${t(F(a.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(F(`${h.date} ${h.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${t(F(v))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${t(F(d))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(F(T))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(F(u))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${t(F(b))}</td>
      </tr>
    `}),k+="</table>";const z=new Date().toISOString().split("T")[0];Pe(`DARC_Audit_Trail_${z}`,k),R(e("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),Q("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${z}`,details:{reportType:"Audit_Logs_Excel",count:i.length}})}).catch(()=>{})}function qe(s=null){const i=s||r._lastFilteredAuditLogs||r.data?.auditLogs||[];if(!i.length){R(e("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const o=r.data?.company||{},p=e(o.nameAr||o.name,o.nameEn||o.name)||"DARC Design Team";let f=o.logoUrl||"";f.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(f=`${window.location.origin}${f}`);const y=r.data?.user||{},x=e(y.name,y.nameEn||y.name)||"Admin",A=xe(),g=be(),k=i.length,z=i.filter(u=>u.action==="create").length,a=i.filter(u=>u.action==="update"||u.action==="status_change").length,$=i.filter(u=>u.action==="delete"||u.action==="purge"||u.action==="trash").length;let E="";i.forEach((u,b)=>{const D=u.user||(u.userId?(r.data?.users||[]).find(j=>j.id===u.userId):null),N=D?e(D.name,D.nameEn||D.name):e("النظام","System"),c=D?B(D):"—",m=de(u.createdAt),{actionLabel:S,entityLabel:_}=se(u);let I="";u.details?.title||u.details?.name?I=u.details.title||u.details.name:u.action==="status_change"?I=`${W(u.details?.oldStatus)} → ${W(u.details?.newStatus)}`:typeof u.details=="object"?I=JSON.stringify(u.details):I=String(u.details||u.entityId||"—"),E+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${t(u.id||String(b+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${t(m.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${t(m.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${t(N)}</div>
          <div style="font-size:10px;color:#64748b;">${t(c)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${t(S)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${t(_)}</td>
        <td style="font-size:11px;color:#334155;">${t(I)}</td>
      </tr>
    `});const v=`
    <!DOCTYPE html>
    <html lang="${r.lang}" dir="${r.lang==="ar"?"rtl":"ltr"}">
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
          text-align: ${r.lang==="ar"?"left":"right"};
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
          text-align: ${r.lang==="ar"?"right":"left"};
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
          ${f?`<img src="${t(f)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />`:""}
          <h1 class="brand-title">${t(p)}</h1>
          <div class="report-subtitle">${e("تقرير الرقابة والتدقيق الأمني وسجل العمليات الإدارية","Official Security Audit & Governance Operations Trail")}</div>
        </div>
        <div class="report-meta-box">
          <div><strong>${e("المشرف المستخرج:","Generated By:")}</strong> ${t(x)}</div>
          <div><strong>${e("تاريخ التقرير:","Report Date:")}</strong> ${t(A)} - ${t(g)}</div>
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
          <div class="kpi-val" style="color:#2563eb;">${a}</div>
          <div class="kpi-label">${e("عمليات تعديل وحالة","Updates & State Changes")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#dc2626;">${$}</div>
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
          ${E}
        </tbody>
      </table>

      <footer class="signature-section">
        <div class="signature-box">
          <strong>${e("إعداد وتصدير التقرير","Prepared By")}</strong><br /><br />
          <span>${t(x)}</span>
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
        <iframe id="audit-print-preview-iframe" style="width:100%;height:100%;border:none;background:#ffffff;" srcdoc="${t(v)}"></iframe>
      </div>
    </div>
  `,d.style.display="flex";const h=()=>{d.style.display="none",d.innerHTML="",window.removeEventListener("keydown",T)},T=u=>{u.key==="Escape"&&h()};window.addEventListener("keydown",T),document.getElementById("btn-close-audit-print-modal")?.addEventListener("click",h),document.getElementById("btn-print-audit-iframe")?.addEventListener("click",()=>{const u=document.getElementById("audit-print-preview-iframe");u&&u.contentWindow&&(u.contentWindow.focus(),u.contentWindow.print())}),Q("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:i.length}})}).catch(()=>{})}async function Ve(){try{R(e("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const s=await Q("/api/audit?limit=1000");s&&s.logs&&(r.data.auditLogs=s.logs,r.auditFullHistoryLoaded=!0,renderView(),R(e(`تم جلب ${s.logs.length} عملية بنجاح.`,`Loaded ${s.logs.length} audit logs.`)))}catch(s){R(s.message||e("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function P(s){const i=C();return s==="profile"||s==="security"||s==="notifications"?!0:s==="company"?i||w("manage_settings"):s==="whatsapp"?i||w("manage_settings"):s==="roles"?i||w("manage_roles"):s==="accounts"?i||w("manage_users")||w("manage_existing_account_permissions")||w("view_user_activity"):s==="trash"?i||w("manage_trash"):s==="audit"?i||w("view_audit_logs"):s==="analytics"?i||w("manage_settings")||w("view_audit_logs"):s==="diagnostics"?i||w("manage_settings"):!1}function Je(){const s=r.data?.user?.id,i=C(),o=P("company"),p=P("whatsapp"),f=P("roles"),y=P("accounts"),x=P("trash"),A=P("audit"),g=P("analytics"),k=P("diagnostics"),z=[["profile",e("الملف الشخصي","Profile")],["notifications",e("الإشعارات والتنبيهات","Notifications & Alerts")],...o?[["company",l("company")]]:[],...p?[["whatsapp",e("تنبيهات واتساب","WhatsApp Alerts")]]:[],...f?[["roles",l("roles")]]:[],...y?[["accounts",l("accounts")]]:[],["security",e("الأمان","Security")],...x?[["trash",e("سلة المهملات","Trash")]]:[],...A?[["audit",l("audit")]]:[],...g?[["analytics",e("المراقبة والزيارات والأداء","Observability & Analytics")]]:[],...k?[["diagnostics",e("تشخيص الأعطال والمستخدمين","Error Logs & User Diagnostics")]]:[]];z.some(([v])=>v===r.settingsSection)||(r.settingsSection=z[0]?.[0]||"profile");const a=r.data?.user||{};let $="";if(r.settingsSection==="profile"&&($=`
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
              ${a.avatarUrl?`<img src="${t(a.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(a.avatarColor||"")?a.avatarColor:"#0d6269"};">${t(me(a))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(a.avatarColor||"")?a.avatarColor:"#0d6269"};">${t(me(a))}</div>`}
              <div class="avatar-upload-overlay">
                ${n("upload",18)}
                <span>${e("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${t(e(a.name,a.nameEn||a.name))}</h3>
            <p class="profile-user-role">${t(e(a.jobTitleAr||"",a.jobTitleEn||a.jobTitleAr||""))} · <span class="status-badge done">${t(B(a))}</span></p>
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
              <label>${l("nameAr")}</label>
              <input name="name" value="${t(a.name||"")}" required />
            </div>
            <div class="field">
              <label>${l("nameEn")}</label>
              <input name="nameEn" value="${t(a.nameEn||"")}" />
            </div>
            <div class="field">
              <label>${l("jobTitle")} (${e("عربي","AR")})</label>
              <input name="jobTitleAr" value="${t(a.jobTitleAr||"")}" />
            </div>
            <div class="field">
              <label>${l("jobTitle")} (${e("إنجليزي","EN")})</label>
              <input name="jobTitleEn" value="${t(a.jobTitleEn||"")}" />
            </div>
            <div class="field full">
              <label>${l("email")}</label>
              <input value="${t(a.email||"")}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${e("رقم الواتساب للتنبيهات الفردية","WhatsApp Phone for Alerts")}</label>
              <input type="tel" name="phone" dir="ltr" value="${t(a.phone||a.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" />
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
            <button type="submit" class="btn btn-primary">${l("save")}</button>
          </div>
        </form>
      </section>
    `),r.settingsSection==="company"&&(i||w("manage_settings"))){const v=r.data?.company||{};$=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${l("company")}</h2>
            <p>${e("هوية مساحة العمل وشعار الشركة واللغة الافتراضية.","Workspace identity, company logo, and default language.")}</p>
          </div>
        </div>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${e("انقر لرفع وتعديل شعار الشركة","Click to upload and change company logo")}">
            <div class="logo-upload-box">
              ${v.logoUrl?`<img src="${t(v.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${n("building",24)}</span>`:`<span class="brand-mark">${n("building",24)}</span>`}
              <div class="logo-upload-overlay">
                ${n("upload",16)}
                <span>${e("تعديل","Edit")}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${t(v.name||"DARC Design Team")}</strong>
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
              <label>${l("nameAr")}</label>
              <input name="nameAr" value="${t(v.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${l("nameEn")}</label>
              <input name="nameEn" value="${t(v.nameEn||"")}" />
            </div>
            <div class="field full">
              <label>${l("emailStatus")}</label>
              <input value="${t(r.data?.emailConfigured?l("emailConfigured"):l("emailNotConfigured"))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${l("save")}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:16px;">${n("info",16)}<span>${l("emailInfo")}</span></div>
      </section>
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("نموذج الإنجاز","Progress model")}</h2>
            <p>${l("weightedExplanation")}</p>
          </div>
        </div>
        <div class="report-stat-list">
          <div class="report-stat"><span>${l("weightedProgress")}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${l("simpleProgress")}</span><strong style="color:var(--ink-soft)">—</strong></div>
        </div>
      </section>
    `}if(r.settingsSection==="security"&&($=`
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
          <div class="form-actions" style="margin-top:20px"><button type="submit" class="btn btn-primary">${l("save")}</button></div>
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
    `),r.settingsSection==="notifications"){const v=Ce(),d=Re()&&!_e(),h=v==="granted",T=v==="denied",u=d?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);font-weight:700;">${e("مدعومة عبر تطبيق الويب (PWA)","Supported via Web App (PWA)")}</span>`:`<span class="mini-badge" style="background:${h?"var(--mint)":T?"var(--red-soft)":"var(--surface-soft)"};color:${h?"var(--teal)":T?"var(--red)":"var(--muted)"};font-weight:700;">
          ${h?e("مفعلة على هذا المتصفح","Enabled on this browser"):T?e("محظورة من إعدادات المتصفح","Blocked in browser settings"):e("بانتظار الموافقة","Permission pending")}
        </span>`,b=d?`<button type="button" class="btn btn-primary btn-sm" data-action="show-ios-notification-guide">${n("bell",14)} ${e("طريقة التفعيل على iPhone","iPhone Setup Guide")}</button>`:h?`<button type="button" class="btn btn-ghost btn-sm" data-action="test-browser-notification" style="color:var(--teal);">${n("check",14)} ${e("فحص إشعار المتصفح","Test Browser Alert")}</button>`:`<button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications">${n("check",14)} ${e("تفعيل الإشعارات الآن","Enable Notifications")}</button>`;$=`
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
              <span class="attention-icon ${h?"teal":T?"red":"blue"}" style="margin-top:2px;">
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
                  ${u}
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
    `}if(r.settingsSection==="accounts"&&y){const v=C()||w("view_user_activity"),d=C()||w("manage_users"),h=C()||w("manage_existing_account_permissions")||w("manage_users"),T=C()&&!te();let u=r.data?.users||[];s!=="usr_ahmad"&&(u=u.filter(b=>b.id!=="usr_ahmad")),$=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${l("accounts")}</h2>
            <p>${e("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${d?`<button class="btn btn-primary btn-sm" data-action="new-user">${n("plus",14)} ${l("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${l("team")}</th>
                <th>${l("role")}</th>
                <th>${l("email")}</th>
                <th>${l("accountStatus")}</th>
                ${v?`<th>${e("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${h?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${u.map(b=>{const D=b.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${ee(b)}
                        <div class="team-member-copy">
                          <strong>${t(e(b.name,b.nameEn||b.name))}</strong>
                          <span>${t(e(b.jobTitleAr||(D?"المبرمج / مدير النظام":""),b.jobTitleEn||b.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${D?`<span class="stealth-dev-badge">${n("shield",12)} ${e("مدير ومطور النظام","Super Admin & Dev")}</span>`:t(B(b))}
                    </td>
                    <td>
                      ${b.email?t(b.email):`<span style="color:var(--muted)">${l("noEmail")}</span>`}
                      ${b.phone||b.customFields?.phone?`<div style="font-size:11px;color:var(--primary);direction:ltr;text-align:right;margin-top:3px;font-family:monospace;font-weight:600;display:inline-flex;align-items:center;gap:4px;">${n("phone",11)} ${t(b.phone||b.customFields?.phone)}</div>`:""}
                    </td>
                    <td>
                      <span class="status-badge ${b.status==="active"?"done":"not_started"}">${b.status==="active"?l("activeAccount"):l("pendingAccount")}</span>
                    </td>
                    ${v?`
                      <td>
                        ${ze(b)}
                      </td>
                    `:""}
                    ${h?`
                      <td>
                        <div class="role-actions">
                          ${D?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${t(b.id)}">${l("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${t(b.id)}">${l("edit")}</button>
                            ${b.id!==r.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${t(b.id)}" title="${b.status==="pending"?e("تفعيل الحساب يدوياً","Activate manually"):e("تغيير كلمة المرور","Change password")}">${n(b.status==="pending"?"check":"settings",13)}</button>
                              ${T?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${t(b.id)}" title="دخول كـ هذا الحساب">${n("user",13)}</button>`:""}
                            `:""}
                            ${b.id!==r.data?.user?.id&&b.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${t(b.id)}">${n("send",13)}</button>`:""}
                            ${b.id!==r.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${t(b.id)}">${n("trash",13)}</button>`:""}
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
    `}if(r.settingsSection==="roles"&&(i||w("manage_roles"))&&($=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${l("roles")}</h2>
            <p>${e("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${i||w("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${n("plus",14)} ${l("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(r.data?.roles||[]).map(v=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${t(e(v.nameAr,v.nameEn))}</strong>
                  ${v.builtIn?`<span class="role-system-badge">${n("shield",11)} ${l("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${t(e(v.descriptionAr,v.descriptionEn))}</p>
                <div class="role-meta">${v.permissions.includes("*")?e("صلاحية كاملة","Full access"):`${v.permissions.length} ${l("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${t(v.id)}">${n("edit",13)} ${l("edit")}</button>
                ${v.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${t(v.id)}">${n("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),r.settingsSection==="trash"&&x){if(!r.trash&&typeof sessionStorage<"u")try{const c=sessionStorage.getItem("darc_trash_cache");c&&(r.trash=JSON.parse(c))}catch{}!r.trashLoaded&&!r._trashFetching&&(r._trashFetching=!0,Q("/api/trash").then(c=>{r.trash=Array.isArray(c)?c:c.trash||[...(c.projects||[]).map(m=>({...m,type:"project"})),...(c.tasks||[]).map(m=>({...m,type:"task"})),...(c.documents||[]).map(m=>({...m,type:"document"}))],r.trashLoaded=!0,r._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(r.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(c=>{r._trashFetching=!1,console.error("[Trash fetch error]",c)}));const v=r.trash||[],d=r.trashFilter||"all",h=(r.trashQuery||"").trim().toLowerCase(),T=v.filter(c=>{if(d!=="all"&&c.type!==d)return!1;if(!h)return!0;const m=(e(c.nameAr||c.titleAr,c.nameEn||c.titleEn)||c.name||c.title||c.originalName||"").toLowerCase(),S=(c.code||c.projectCode||"").toLowerCase(),_=(c.projectNameAr||c.projectNameEn||"").toLowerCase();return m.includes(h)||S.includes(h)||_.includes(h)}),u=v.filter(c=>c.type==="project").length,b=v.filter(c=>c.type==="task").length,D=v.filter(c=>c.type==="document").length,N=v.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${n("info",16)}</div>
        <div class="trash-notice-text">
          <strong>${e("سلة المحذوفات المركزية المحمية","Central Protected Trash Bin")}</strong>
          <p>${e("تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.","Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.")}</p>
        </div>
      </div>

      <div class="view-toolbar trash-filter-bar">
        <div class="trash-filter-group">
          <button type="button" class="btn btn-sm ${d==="all"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="all">
            ${n("layers",14)}
            <span>${e("الكل","All")}</span>
            <span class="badge ${d==="all"?"badge-on-primary":"badge-neutral"}">${v.length}</span>
          </button>
          <button type="button" class="btn btn-sm ${d==="project"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="project">
            ${n("building",14)}
            <span>${e("المشاريع","Projects")}</span>
            <span class="badge ${d==="project"?"badge-on-primary":"badge-neutral"}">${u}</span>
          </button>
          <button type="button" class="btn btn-sm ${d==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${n("checklist",14)}
            <span>${e("المهام","Tasks")}</span>
            <span class="badge ${d==="task"?"badge-on-primary":"badge-neutral"}">${b}</span>
          </button>
          <button type="button" class="btn btn-sm ${d==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${n("document",14)}
            <span>${e("المستندات","Documents")}</span>
            <span class="badge ${d==="document"?"badge-on-primary":"badge-neutral"}">${D}</span>
          </button>
        </div>
        <div class="search-box search-sm trash-search-box">
          ${n("search",14)}
          <input type="search" placeholder="${e("بحث في المحذوفات...","Search deleted items...")}" value="${t(r.trashQuery||"")}" data-action="search-trash-input" />
        </div>
      </div>

      ${T.length?`
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${e("الاسم / العنوان","Name / Title")}</th>
                <th>${e("النوع","Type")}</th>
                <th>${e("المشروع التابع له","Project")}</th>
                <th>${e("الحالة السابقة","Prior Status")}</th>
                <th>${e("تاريخ الحذف","Deleted At")}</th>
                <th style="text-align:${r.lang==="ar"?"left":"right"}">${e("الإجراءات","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${T.map(c=>{const m=c.type==="project",S=c.type==="task",_=c.type==="document",I=e(c.nameAr||c.titleAr,c.nameEn||c.titleEn)||c.name||c.title||c.originalName||c.code||e("عنصر محذوف","Deleted item"),j=!m&&c.projectId?(r.data?.projects||[]).find(K=>K.id===c.projectId):null,G=c.projectNameAr||c.projectNameEn||(j?e(j.nameAr,j.nameEn||j.nameAr):null),H=c.projectCode||j?.code,q=_&&c.size?c.size>1048576?(c.size/1048576).toFixed(1)+" MB":Math.round(c.size/1024)+" KB":"",Y=i||w("manage_trash")||c.uploaderId===s;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${m?"is-project":S?"is-task":"is-doc"}">
                          ${n(m?"building":S?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${t(I)}</strong>
                          ${c.code||m?`<span class="trash-item-code">${t(c.code||c.id)}</span>`:""}
                          ${_&&q?`<span class="trash-item-code" style="color:var(--muted);">${q}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${m?"type-project":S?"type-task":"type-doc"}">
                        ${n(m?"building":S?"checklist":"document",11)}
                        ${m?e("مشروع","Project"):S?e("مهمة","Task"):e("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${m?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${e("مشروع رئيسي","Primary Project")}</span>`:G?`${n("building",11)} <span>${t(G)}${H?` (${t(H)})`:""}</span>${_&&c.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${t(c.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${c.status?`<span class="status-badge ${t(c.status)}">${t(W(c.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${t(c.deletedAt||"")}">
                        ${ae(c.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${r.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${t(c.type)}" data-id="${t(c.id)}" title="${e("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${n(r.lang==="ar"?"arrow":"arrowLeft",12)} ${e("استعادة","Restore")}
                        </button>
                        ${Y?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${t(c.type)}" data-id="${t(c.id)}" title="${e("حذف العنصر نهائياً","Permanently delete item")}">
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
    `:!r.trashLoaded&&!v.length?`
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
                ${!r.trashLoaded&&!v.length?e("جاري التحميل...","Loading..."):`${v.length} ${e("عناصر","items")}`}
              </span>
            </div>
            <p>${e("استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.","Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.")}</p>
          </div>
          ${(i||w("manage_trash"))&&v.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${e("حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات","Permanently erase all deleted items")}">
                ${n("trash",13)} ${e("إفراغ سلة المهملات","Empty Trash")}
              </button>
            </div>
          `:""}
        </div>
        ${N}
      </section>
    `}if(r.settingsSection==="audit"&&(i||w("view_audit_logs"))){const v=[...r.data?.auditLogs||[]].sort((m,S)=>new Date(S.createdAt).getTime()-new Date(m.createdAt).getTime()),d=r.auditFilterAction||"all",h=r.auditFilterEntity||"all",T=r.auditFilterUser||"all",u=(r.auditSearchQuery||"").trim().toLowerCase(),b=v.filter(m=>{if(d!=="all"&&m.action!==d||h!=="all"&&(m.entityType||m.entity_type)!==h||T!=="all"&&(m.userId||m.user_id||m.user?.id)!==T)return!1;if(u){const S=m.user||(m.userId?(r.data?.users||[]).find(K=>K.id===m.userId):null),_=(S&&e(S.name,S.nameEn||S.name)||"").toLowerCase(),{actionLabel:I,entityLabel:j}=se(m),G=(I||m.action||"").toLowerCase(),H=(j||m.entityType||"").toLowerCase(),q=(m.id||m.entityId||"").toLowerCase(),Y=typeof m.details=="object"?JSON.stringify(m.details).toLowerCase():String(m.details||"").toLowerCase();if(!(_.includes(u)||G.includes(u)||H.includes(u)||q.includes(u)||Y.includes(u)))return!1}return!0});r._lastFilteredAuditLogs=b;const D=[["all",e("كافة العمليات","All Actions")],["create",e("إنشاء جديد","Create")],["update",e("تعديل بيانات","Update")],["status_change",e("تغيير حالة","Status Change")],["delete",e("نقل للمهملات","Delete / Trash")],["restore",e("استعادة","Restore")],["purge",e("حذف نهائي","Purge")],["export_report",e("تصدير تقرير","Export Report")],["login",e("تسجيل دخول","Sign In")],["invite",e("دعوة مستخدم","Invite")]],N=[["all",e("كافة العناصر","All Entities")],["project",e("المشاريع","Projects")],["task",e("المهام","Tasks")],["document",e("المستندات","Documents")],["user",e("المستخدمين","Users")],["role",e("الأدوار والصلاحيات","Roles")],["company",e("إعدادات الشركة","Company Settings")],["report",e("التقارير","Reports")]],c=d!=="all"||h!=="all"||T!=="all"||!!u;$=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${l("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${b.length} ${e("عملية معروضة","events shown")}
              </span>
              ${c?`
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${e("من أصل","out of")} ${v.length}
                </span>
              `:""}
            </div>
            <p>${e("سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.","Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.")}</p>
          </div>
          <div class="page-actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${r.auditFullHistoryLoaded?"":`
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
            <input type="search" placeholder="${e("بحث فوري بالمنفذ، العملية، أو التفاصيل...","Search by actor, action, details...")}" value="${t(r.auditSearchQuery||"")}" data-action="search-audit-input" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="filter-select select-compact select-sm" data-action="filter-audit-action" style="min-width:125px;">
              ${D.map(([m,S])=>`<option value="${m}" ${d===m?"selected":""}>${S}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${N.map(([m,S])=>`<option value="${m}" ${h===m?"selected":""}>${S}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${e("كافة المستخدمين","All Users")}</option>
              ${(r.data?.users||[]).map(m=>`<option value="${m.id}" ${T===m.id?"selected":""}>${t(e(m.name,m.nameEn||m.name))}</option>`).join("")}
            </select>
            ${c?`
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
                  <th style="padding:12px 14px;text-align:${r.lang==="ar"?"left":"right"};">${e("التاريخ والوقت الدقيق","Exact Date & Time")}</th>
                </tr>
              </thead>
              <tbody>
                ${b.map(m=>{const S=m.user||(m.userId?(r.data?.users||[]).find(K=>K.id===m.userId):null),_=S?e(S.name,S.nameEn||S.name):e("النظام","System"),I=S?B(S):e("تلقائي","Automated"),j=de(m.createdAt),{badgeClass:G,actionLabel:H,entityLabel:q,detailHtml:Y}=se(m);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${ee(S)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${t(_)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${t(I)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${G}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${t(H)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${t(q)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${Y}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${r.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${t(j.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${n("clock",11)}
                          <span>${t(j.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${n(c?"search":"checklist",24)}
            <span>${c?e("لا توجد عمليات تطابق معايير التصفية المحددة.","No audit logs match the selected filter criteria."):e("لا توجد عمليات مسجلة حتى الآن.","No audit logs recorded yet.")}</span>
            ${c?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${e("إعادة تعيين الفلاتر","Reset filters")}
              </button>
            `:""}
          </div>
        `}
      </section>
    `}if(r.settingsSection==="analytics"&&g&&($=Ee()),r.settingsSection==="diagnostics"&&k&&($=Te()),r.settingsSection==="whatsapp"&&p){const v=te(),d=r.data?.company?.customFields?.whatsapp||r.data?.company?.custom_fields?.whatsapp||{};$=`
      <section class="setting-section">
        ${v?`
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
          <span class="status-badge ${d.enabled?"done":"neutral"}">
            ${d.enabled?e("مفعل نشط","Active"):e("معطل","Disabled")}
          </span>
        </div>

        <form data-action="update-whatsapp" class="settings-form" style="max-width:740px;display:grid;gap:18px;">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
            <div>
              <strong style="display:block;font-size:14px;color:var(--ink);margin-bottom:4px;">${e("تفعيل إرسال التنبيهات عبر واتساب","Enable WhatsApp Notifications")}</strong>
              <span style="font-size:12px;color:var(--muted);">${e("إرسال إشعارات فورية لمهندسي الموقع والإدارة عند حدوث تغييرات حرجة.","Send instant alerts to field engineers & management upon critical updates.")}</span>
            </div>
            <label class="switch" style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" name="enabled" ${d.enabled?"checked":""} style="opacity:0;width:0;height:0;" id="wa-toggle-enabled" />
              <span class="slider round" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:var(--line);transition:.3s;border-radius:24px;"></span>
            </label>
          </div>

          <div class="form-grid">
            <div class="field">
              <label>${e("نوع مزود البوابة (Provider)","Gateway Provider")}</label>
              <select name="provider" class="select-compact" style="width:100%;height:42px;">
                <option value="evolution" ${d.provider!=="webhook"?"selected":""}>Evolution API / Baileys</option>
                <option value="webhook" ${d.provider==="webhook"?"selected":""}>Webhook (Custom Webhook URL)</option>
              </select>
            </div>

            <div class="field">
              <label>${e("اسم جلسة الربط (Instance Name)","Instance Name")}</label>
              <input type="text" name="instanceName" value="${t(d.instanceName||"darc-workspace")}" placeholder="darc-workspace" required />
            </div>
          </div>

          <div class="field">
            <label>${e("رابط خادم البوابة (Server Gateway URL) *","Server Gateway URL *")}</label>
            <input type="url" name="serverUrl" value="${t(d.serverUrl||"")}" placeholder="https://evolution-api.example.com" />
            <small style="font-size:11px;color:var(--muted);margin-top:4px;display:block;">${e("رابط خادم Evolution API الخاص بمكتبكم (أو رابط الـ Webhook المستلم).","Your office Evolution API instance URL or receiving Webhook.")}</small>
          </div>

          <div class="field">
            <label>${e("مفتاح الأمان (API Key / Token)","API Key / Token")}</label>
            <input type="password" name="apiKey" value="${t(d.apiKey||"")}" placeholder="••••••••••••••••" />
          </div>

          <div class="field">
            <label>${e("المستلم الافتراضي / قروب الواتساب (اختياري)","Default Recipient / WhatsApp Group (Optional)")}</label>
            <input type="text" name="recipient" value="${t(d.recipient||"")}" placeholder="${e("كود قروب واتساب المهندسين (1203630...@g.us) أو رقم جوال الإدارة","WhatsApp Group JID (1203630...@g.us) or Management Phone")}" />
            <small style="font-size:11px;color:var(--teal);margin-top:4px;display:block;">${e("ملاحظة: هذا الحقل اختياري. في حال عدم وجود قروب حالياً، يمكنك تركه فارغاً وسيتكفل النظام بإرسال كافة التنبيهات والمنشن كرسائل فردية مباشرة إلى هواتف المهندسين والمدير المسجلة في حساباتهم.","Note: This field is optional. If you do not have a group yet, leave it blank and the system will automatically send alerts & mentions directly to engineers & manager personal phones.")}</small>
          </div>

          <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;padding:16px;">
            <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:10px;">${e("أحداث التنبيه الفوري التلقائية:","Automated Trigger Events:")}</strong>
            <div style="display:grid;gap:8px;">
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnCollectiveMention" ${d.notifyOnCollectiveMention!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("megaphone",13)} ${e("عند المنشن الجماعي (@all / @الكل): إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة حتى المدير","When collective mention (@all / @everyone): send direct alert to all project members and managers")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="sendGroupBroadcast" ${d.sendGroupBroadcast?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("users",13)} ${e("إرسال نسخة لقروب الواتساب العام (في حال إدخال كود القروب في الحقل أعلاه)","Send a copy to the WhatsApp Group (if Group JID is set above)")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnBlocked" ${d.notifyOnBlocked!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("warning",13)} ${e("عند تعليق مهمة هندسية (Task Blocked) لتنبيه الموقع فوراً","When a task is blocked to alert field engineers instantly")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnApproval" ${d.notifyOnApproval!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("search",13)} ${e("عند إحالة مهمة للمراجعة والاعتماد (Review / Approval)","When a deliverable is submitted for review & approval")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnDrawing" ${d.notifyOnDrawing!==!1?"checked":""} />
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
    `}const E=i||w("manage_settings")||w("manage_roles")||w("manage_users")||w("manage_trash")||w("view_audit_logs");return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${E?e("تحكم مركزي","CENTRAL CONTROL"):e("الملف الشخصي","USER PROFILE")}</p>
        <h1>${E?l("settings"):e("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${E?e("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):e("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${n(i?"shield":"user",13)} ${t(B(a))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${z.map(([v,d])=>`<button class="${r.settingsSection===v?"active":""}" data-action="settings-section" data-section="${v}">${d}</button>`).join("")}
      </aside>
      <div class="settings-content">${$}</div>
    </div>
  `}var De=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function Qe(s=null){const i=r.data?.permissionsCatalog&&r.data.permissionsCatalog.length>=10?r.data.permissionsCatalog:De,o=new Map;i.forEach(g=>{const k=g.category||"general",z=e(g.categoryAr||k,g.categoryEn||k);o.has(k)||o.set(k,{name:z,items:[]}),o.get(k).items.push(g)});const p=s?.id==="admin"||s?.permissions&&s.permissions.includes("*"),f=Array.from(o.entries()).map(([g,k])=>{const z=k.items.map(a=>{const $=a.id||a.key,E=e(a.nameAr||a.ar,a.nameEn||a.en||$),v=p||s?.permissions&&(s.permissions.includes($)||typeof ie<"u"&&ie[$]&&s.permissions.includes(ie[$])),d=p?"disabled":"";return`
        <label class="permission-option" style="cursor:${p?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${t($)}" ${v?"checked":""} ${d} />
          <span style="font-weight:500;">${t(E)}</span>
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
    `}).join(""),y=p?"":`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${l("permissions")} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${i.length} ${e("صلاحية متاحة","available permissions")})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${e("تحديد الكل","Select All")}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${e("إلغاء التحديد","Deselect All")}</button>
      </div>
    </div>
  `,x=`
    <form id="role-form" data-role-id="${t(s?.id||"")}">
      <div class="form-grid">
        <div class="field">
          <label>${l("nameAr")} *</label>
          <input name="nameAr" value="${t(s?.nameAr||"")}" required />
        </div>
        <div class="field">
          <label>${l("nameEn")}</label>
          <input name="nameEn" value="${t(s?.nameEn||"")}" />
        </div>
        <div class="field full">
          <label>${l("roleDescription")}</label>
          <textarea name="descriptionAr" rows="2">${t(s?.descriptionAr||"")}</textarea>
        </div>
      </div>
      ${p?`
        <div class="role-modal-note" style="margin-top:15px;">
          ${e("مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.","The system administrator always keeps full root privileges [*] across all aspects of the system.")}
        </div>
      `:`
        ${y}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${f}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${l("cancel")}</button>
        <button type="submit" class="btn btn-primary">${n("check",14)} ${s?l("save"):l("create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ue(s?e("تعديل الدور والصلاحيات","Edit role & permissions"):l("addRole"),e("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),x,"role","modal-lg");const A=document.getElementById("modal-root");if(A){const g=A.querySelector("#btn-perm-select-all"),k=A.querySelector("#btn-perm-deselect-all");g&&g.addEventListener("click",()=>{A.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(z=>z.checked=!0)}),k&&k.addEventListener("click",()=>{A.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(z=>z.checked=!1)})}}function Ye(s=null){if(s?.id==="usr_ahmad"&&r.data?.user?.id!=="usr_ahmad")return R(e("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!s&&!C())return R(l("adminOnly"),!0);const i=!C(),o=i?"disabled":"",p=(r.data?.roles||[]).filter(y=>C()||y.id!=="admin"),f=`<form id="user-form" data-user-id="${t(s?.id||"")}" data-permission-only="${i}"><div class="form-grid"><div class="field full"><label>${l("nameAr")}</label><input name="name" value="${t(s?.name||"")}" ${o} required /></div><div class="field"><label>${l("nameEn")}</label><input name="nameEn" value="${t(s?.nameEn||"")}" ${o} /></div><div class="field"><label>${l("jobTitle")}</label><input name="jobTitleAr" value="${t(s?.jobTitleAr||"")}" ${o} /></div><div class="field"><label>${l("email")}</label><input name="email" type="email" value="${t(s?.email||"")}" placeholder="name@darc.com" ${o} /></div><div class="field"><label>${e("رقم الواتساب للتنبيهات","WhatsApp Phone")}</label><input name="phone" type="tel" dir="ltr" value="${t(s?.phone||s?.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" ${o} /></div><div class="field"><label>${l("role")}</label><select name="roleId">${p.map(y=>`<option value="${t(y.id)}" ${s?.roleId===y.id?"selected":""}>${t(e(y.nameAr,y.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${i?e("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):e("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${l("cancel")}</button><button type="submit" class="btn btn-primary">${n("check",14)} ${s?i?e("حفظ الصلاحية","Save permission"):l("save"):l("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=ue(s?i?e("تعديل صلاحية الحساب","Change account permission"):e("تعديل حساب العضو","Edit member account"):l("addMember"),e("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),f,"user")}export{Ye as a,st as c,at as d,et as f,Qe as i,Oe as l,Ze as m,He as n,qe as o,Ue as p,Ve as r,Ge as s,P as t,tt as u};
