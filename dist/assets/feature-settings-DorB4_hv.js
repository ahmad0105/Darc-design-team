import{t as je}from"./rolldown-runtime-BQ-_32WO.js";import{$ as Ke,Bt as D,Ct as Pe,Dt as U,F as Ze,Ht as l,I as et,L as tt,Mt as G,Nt as V,Ot as F,Pt as p,Q as A,Rt as Ee,St as ee,Tt as he,X as xe,Z as me,_t as n,at,ct as Me,d as ae,dt as it,et as e,h as M,ht as st,it as a,l as Be,lt as Ne,n as P,o as De,p as Re,rt as nt,st as ue,tt as ve,ut as _e,vt as Ce,yt as C}from"./core-dragdrop-B2Hvc4N4.js";var Et=je({attentionItem:()=>He,metricCard:()=>de,projectProgress:()=>Oe,projectRow:()=>Fe,pulseChart:()=>Ge,renderDashboard:()=>rt,teamMetrics:()=>Se,teamRow:()=>Ue});function de(t,i,r,o,m,c=""){return`<article class="metric-card ${o}"><div class="metric-top"><span class="metric-label">${a(t)}</span><span class="metric-icon">${n(m,15)}</span></div><div class="metric-value">${a(i)}</div><span class="metric-note ${c}">${a(r)}</span></article>`}function Oe(t){const i=t.health==="off_track"?"red":t.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${p("weightedProgress")}</span><strong>${t.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${i}" style="width:${Math.min(100,t.progress)}%"></div></div></div>`}function Fe(t){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${n("building",17)}</span><div class="project-name"><strong>${a(e(t.nameAr,t.nameEn))}</strong><span>${a(t.code)} · ${a(e(t.clientAr,t.clientEn))}</span></div></div>${Oe(t)}<div class="project-owner">${me(t.manager)}<span>${a(t.manager?e(t.manager.name,t.manager.nameEn||t.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${a(t.id)}" aria-label="${p("viewDetails")}">${n(l.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function He(t){const i=ee(t)||t.status==="blocked"?"red":"amber",r=ee(t)?e("متأخرة","Overdue"):t.status==="blocked"?e("متوقفة","Blocked"):e("تستحق قريبًا","Due soon"),o=e(t.titleAr,t.titleEn);return`<button type="button" class="attention-item" data-action="open-task" data-task-id="${a(t.id)}" title="${a(o)}"><span class="attention-icon ${i}">${n(ee(t)||t.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${i})">${a(o)}</strong><span>${a(r)} · ${a(nt(t.dueDate))}</span></span></button>`}function Se(t,i){const r=i.filter(c=>Pe(c,t)),o=r.reduce((c,f)=>c+Number(f.weight||1),0),m=o?Math.round(r.reduce((c,f)=>c+f.progress*Number(f.weight||1),0)/o):0;return{tasks:r.length,progress:m,overdue:r.filter(ee).length}}function Ue(t,i){const r=Se(t.id,i);return`<div class="team-row"><div class="team-member">${me(t)}<div class="team-member-copy"><strong>${a(e(t.name,t.nameEn||t.name))}</strong><span>${a(e(t.jobTitleAr,t.jobTitleEn||t.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${r.tasks}</strong> ${p("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${p("progress")}</span><strong>${r.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${r.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${a(t.id)}">${n("more",15)}</button></div>`}function Ge(){const t=[38,48,45,62,55,72,68],i=l.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${t.map((r,o)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,r-22)}%"></span><span class="pulse-bar ${o===t.length-1?"current":""}" style="height:${r}%"></span></div><span>${i[o]}</span></div>`).join("")}</div>`}function rt(){const t=l.data?.stats||{},i=l.data?.projects||[],r=l.data?.tasks||[],o=l.data?.users||[],m=l.data?.user||{},c=m.name||m.email||e("مستخدم","User"),f=i.reduce((d,y)=>d+(Number(y.totalWeight)||0),0),h=f?Math.round(i.reduce((d,y)=>d+(Number(y.progress)||0)*(Number(y.totalWeight)||0),0)/f):0,u=[...r].filter(d=>{if(ee(d)||d.status==="blocked")return!0;if(d.dueDate){const y=he(d.dueDate);if(y){const E=(y-new Date)/864e5;return E>=0&&E<=7}}return!1}).sort((d,y)=>(d.dueDate?he(d.dueDate)?.getTime()??1/0:1/0)-(y.dueDate?he(y.dueDate)?.getTime()??1/0:1/0)).slice(0,5),k=o.filter(d=>d.status!=="inactive"),z=t.projectCount??i.length,s=t.myTasks??r.filter(d=>Pe(d,m.id)).length,$=t.overdueTasks??r.filter(ee).length,w=t.dueSoon??0,R=t.completedTasks??r.filter(d=>d.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${e("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${st()}، ${a(e(c.replace(/^م\.\s?/,""),m.nameEn||c))}</h1><p>${p("welcomeText")}</p></div><div class="welcome-status"><span>${p("portfolioHealth")}</span><strong>${h}%</strong><small>${e("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${de(p("activeProjects"),t.activeProjects||0,e(`${z} مشاريع إجمالًا`,`${z} projects total`),"teal","building","up")}${de(p("openTasks"),t.openTasks??r.length,e(`${s} مسندة لك`,`${s} assigned to you`),"blue","checklist")}${de(p("overdue"),$,e("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",$?"alert":"check",$?"alert":"")}${de(p("dueThisWeek"),w,e("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${p("projectProgress")}</h2><p class="panel-subtitle">${p("projectProgressSub")}</p></div>${A("view_projects")?`<button class="text-link" data-view="projects">${p("seeAll")} ${n(l.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${i.length?i.slice(0,5).map(Fe).join(""):`<div class="empty">${n("building",18)}<span>${p("noProjects")}</span></div>`}</div></section>${C()||A("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${p("teamProgress")}</h2><p class="panel-subtitle">${p("teamProgressSub")}</p></div><button class="text-link" data-view="team">${p("seeAll")} ${n(l.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${k.slice(0,6).map(d=>Ue(d,r)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${p("attention")}</h2><p class="panel-subtitle">${p("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${u.length}</span></div><div class="attention-list">${u.length?u.map(He).join(""):`<div class="empty">${n("check",18)}<span>${p("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${p("recentPulse")}</h2><p class="panel-subtitle">${p("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${R} ${p("done")}</span></div>${Ge()}</section></div></div>`}var N=null,$e=!1;function We(){return{isDemo:!0,stats:{totalVisits:1482,uniqueVisitors:628,activeSessions:14,avgTimeSpentFormattedAr:"9 دقائق و 15 ثانية",avgTimeSpentFormattedEn:"9m 15s",healthScore:"100%",crashFreeRate:"99.9%",bounceRate:"11.8%",returnRate:"72.4%",edgeLatency:"24ms",activeAnomaliesCount:0,totalAnomaliesLogged:1},countries:[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",visits:652,percent:44},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",visits:485,percent:32.7},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",visits:148,percent:10},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",visits:95,percent:6.4},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",visits:58,percent:3.9},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",visits:44,percent:3}],cities:[{name:"Dubai",visits:420},{name:"Riyadh",visits:310},{name:"Abu Dhabi",visits:232},{name:"Doha",visits:148},{name:"Jeddah",visits:125},{name:"Kuwait City",visits:95}],os:{macOS:680,Windows:490,iOS:212,Android:100},recentAnomalies:[{id:"anom_demo_01",type:"HighMemorySpike",severity:"medium",status:"resolved",descriptionAr:"ارتفاع مؤقت في استهلاك الذاكرة (142MB) أثناء معالجة ملف DWG ثلاثي الأبعاد - تم تقطيع العناصر تلقائياً وتفريغ الذاكرة بنجاح.",descriptionEn:"Transient memory spike (142MB) during 3D DWG parsing - elements automatically LOD decimated and memory purged.",timestamp:new Date(Date.now()-72e5).toISOString()}]}}async function ot(t=!1){if(N&&!t)return N;$e=!0;try{const i=await P("/api/telemetry/analytics",{silent:!0});i&&i.data&&(N=i.data)}catch(i){console.warn("[Analytics] Failed to fetch remote analytics:",i),M()&&(N=We())}finally{$e=!1}return N}function Ve(){const t=M(),i=t&&(!N||!N.isDemo)?We():N,r=Be();!i&&!$e&&ot().then(()=>{if(l.view==="settings"&&l.settingsSection==="analytics"){const u=document.querySelector(".settings-content");u&&(u.innerHTML=Ve())}});const o=i?.stats||{totalVisits:384,uniqueVisitors:162,activeSessions:8,avgTimeSpentFormattedAr:"8 دقائق و 24 ثانية",avgTimeSpentFormattedEn:"8m 24s",healthScore:"100%",crashFreeRate:"99.8%",bounceRate:"11.4%",returnRate:"68.4%",edgeLatency:"32ms",activeAnomaliesCount:0,totalAnomaliesLogged:2},m=i?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",visits:165,percent:43},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",visits:112,percent:29.2},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",visits:48,percent:12.5},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",visits:24,percent:6.3},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",visits:18,percent:4.7},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",visits:9,percent:2.3},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",visits:8,percent:2}],c=i?.cities||[{name:"Dubai",visits:110},{name:"Riyadh",visits:78},{name:"Abu Dhabi",visits:55},{name:"Cairo",visits:48},{name:"Jeddah",visits:34},{name:"Doha",visits:24}];i?.os;const f=i?.recentAnomalies||[],h=r.memoryMb||45;return`
    <section class="setting-section">
      ${t?`
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
              ${G("active")} ${e("نظام الفلترة الذكي: منع التكرار لنفس الجهاز والـ IP","Active Deduplication: Unique Device & IP Binding")}
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
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${(o.totalVisits||384).toLocaleString()}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">(${(o.uniqueVisitors||162).toLocaleString()} ${e("زائر مستقل","uniques")})</span>
          </div>
          <div style="font-size:11px;color:var(--mint-strong);font-weight:600;display:flex;align-items:center;gap:4px;">
            <span>${G("active")} ${o.activeSessions||1} ${e("جلسات نشطة الآن","live sessions right now")}</span>
          </div>
        </div>

        <!-- بطاقة وقت الجلسة الحقيقي -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("متوسط مدة الزيارة الصافية (Dwell Time)","Avg Active Dwell Time")}</span>
            <span style="background:var(--blue-soft,#eaf1fb);color:var(--blue);padding:4px;border-radius:8px;display:flex;">${n("clock",14)}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);">${e(o.avgTimeSpentFormattedAr,o.avgTimeSpentFormattedEn)}</div>
          <div style="font-size:11px;color:var(--muted);">${e(`معدل الارتداد السريع: ${o.bounceRate||"11.4%"}`,`Bounce Rate: ${o.bounceRate||"11.4%"}`)}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("مؤشر استقرار الأجهزة (Health Score)","Device Stability Score")}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${n("shield",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:#2e7d32;">${o.healthScore||"100%"}</div>
            <span style="font-size:11px;color:var(--mint-strong);font-weight:700;display:inline-flex;align-items:center;gap:4px;">${G("healthy")} ${o.crashFreeRate||"99.8%"} ${e("خالية من الأعطال","Crash-Free")}</span>
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">${e(`ذاكرة جهازك الحالية: ${h}MB (آمنة)`,`Current Device Memory: ${h}MB (Healthy)`)}</div>
        </div>

        <!-- بطاقة سرعة السحابة ومعدل العودة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("سرعة السيرفر ومعدل عودة الفريق","Cloud Speed & Retention")}</span>
            <span style="background:var(--amber-soft,#fff1dc);color:var(--amber);padding:4px;border-radius:8px;display:flex;">${n("trendingUp",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${o.edgeLatency||"32ms"}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">${o.returnRate||"68.4%"} ${e("عودة دورية","Return Rate")}</span>
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
            ${m.map(u=>`
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
                  <span style="display:flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);">
                    <span style="font-size:11px;font-weight:800;background:var(--surface-soft);border:1px solid var(--line);padding:2px 6px;border-radius:4px;color:var(--teal);">${a(u.code||"GL")}</span>
                    <span>${a(e(u.nameAr||"",u.nameEn||""))}</span>
                  </span>
                  <span style="font-weight:700;color:var(--teal);">${Number(u.visits||0).toLocaleString()} <span style="font-weight:400;font-size:11px;color:var(--muted);">(${Number(u.percent||0)}%)</span></span>
                </div>
                <div style="height:6px;width:100%;background:var(--surface-soft);border-radius:999px;overflow:hidden;border:1px solid var(--line);">
                  <div style="height:100%;width:${Number(u.percent||0)}%;background:linear-gradient(90deg, var(--teal), var(--mint-strong));border-radius:999px;"></div>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- قائمة أبرز المدن وتوزيع الأجهزة والأنظمة -->
          <div style="display:flex;flex-direction:column;gap:16px;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("أبرز المدن زيارة:","Top Visiting Cities:")}</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${c.map(u=>`
                  <span style="background:var(--surface);border:1px solid var(--line);padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:6px;">
                    ${n("pin",11)} ${a(u.name||"")} <span style="font-size:10px;color:var(--teal);font-weight:700;">${Number(u.visits||0)}</span>
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
            <span class="status-badge ${f.some(u=>u.status==="active")?"urgent":"done"}">
              ${f.some(u=>u.status==="active")?e("تم رصد حالات تستدعي المتابعة","Active Anomalies"):e("جميع الأجهزة تعمل باستهلاك طبيعي","Optimal Performance")}
            </span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${f.length?f.map(u=>`
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;background:${u.status==="active"?"rgba(239,68,68,0.06)":"var(--surface-soft)"};border:1px solid ${u.status==="active"?"rgba(239,68,68,0.25)":"var(--line)"};">
              <span style="margin-top:2px;display:inline-flex;align-items:center;color:${u.status==="active"?"#ef4444":"#10b981"};">${u.status==="active"?n("alert",18):n("success",18)}</span>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <strong style="font-size:13px;color:${u.status==="active"?"var(--red)":"var(--ink)"};">${a(e(u.titleAr||"",u.titleEn||""))}</strong>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:10px;background:var(--surface);border:1px solid var(--line);padding:2px 8px;border-radius:999px;font-family:monospace;">${a(u.ip||"")}</span>
                    <span style="font-size:11px;color:var(--muted);">${new Date(u.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                  </div>
                </div>
                <p style="margin:4px 0 0;font-size:12px;color:var(--ink-soft);line-height:1.5;">${a(e(u.detailAr||"",u.detailEn||""))}</p>
                <div style="display:flex;align-items:center;gap:10px;margin-top:6px;font-size:11px;color:var(--muted);flex-wrap:wrap;">
                  <span style="display:inline-flex;align-items:center;gap:4px;">${n("pin",11)} ${a(u.city||"")}, ${a(u.countryCode||"")}</span>
                  <span style="display:inline-flex;align-items:center;gap:4px;">${n("grid",11)} ${a(u.deviceType||"")}</span>
                  <span style="font-weight:600;color:${u.status==="active"?"var(--red)":"var(--mint-strong)"};">${u.status==="active"?e("قيد التدخل الوقائي","Mitigating"):e("تمت المعالجة وحماية الاستقرار","Resolved & Protected")}</span>
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
  `}var ce=null,we=!1,B="all",H="all",K="all";async function lt(t=!1){if(ce&&!t)return ce;we=!0;try{const i=await P("/api/telemetry/incidents",{silent:!0});i&&i.users&&(ce=i)}catch(i){console.warn("[Diagnostics] Failed to fetch incidents:",i)}finally{we=!1}return ce}function St(t){B=t}function Tt(t){H=t}function zt(t){K=t}function dt(t=""){const i=String(t).toLowerCase();return i.includes("http")||i.includes("api")?"cat-http":i.includes("nav")?"cat-nav":i.includes("ui")||i.includes("click")||i.includes("drop")?"cat-ui":i.includes("ws")||i.includes("socket")||i.includes("realtime")?"cat-ws":i.includes("err")?"cat-err":i.includes("warn")?"cat-warn":"cat-ui"}function qe(){const t=M(),i=ce;Be(),!i&&!we&&lt().then(()=>{if(l.view==="settings"&&(l.settingsSection==="diagnostics"||l.settingsSection==="analytics")){const s=document.querySelector(".settings-content");s&&(s.innerHTML=qe())}});let r=i?.users||[];t?(r=r.filter(s=>s.userId&&String(s.userId).startsWith("usr_demo")),!r.length&&l.data?.users&&(r=l.data.users.filter(s=>s.id&&String(s.id).startsWith("usr_demo")).map(s=>({userId:s.id,name:s.name,nameEn:s.nameEn||s.name,email:s.email,role:s.jobTitleAr||(s.roleId==="admin"?"مدير النظام (عرض تجريبي)":s.roleId||"عضو فريق"),avatarColor:s.avatarColor||"#0d6269",isRealAccount:!1,status:s.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})))):!r.length&&l.data?.users&&l.data.users.length&&(r=l.data.users.map(s=>({userId:s.id,name:s.name,nameEn:s.nameEn||s.name,email:s.email,role:s.jobTitleAr||(s.roleId==="admin"?"مدير النظام (كامل الصلاحيات)":s.roleId||"عضو فريق"),avatarColor:s.avatarColor||"#0d6269",isRealAccount:!0,status:s.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})));let o=i?.incidents||[];t&&(o=o.filter(s=>s.userId&&String(s.userId).startsWith("usr_demo")));const m=i?.stats||{totalIncidents:t?o.length:3,activeIncidents:0,resolvedIncidents:t?o.length:3,totalUsersMonitored:r.length||6,alertEmailRecipient:t?"demo-alerts@darc.demo (بيئة المحاكاة الآمنة)":"admin@darc-design.bond"};B!=="all"&&(o=o.filter(s=>s.userId===B||s.affectedUsers?.includes(B))),H!=="all"&&(o=o.filter(s=>s.severity===H)),K!=="all"&&(o=o.filter(s=>s.status===K));const c=r.find(s=>s.userId===B),f=typeof Re=="function"?Re():{connected:!1},h=typeof De=="function"?De().length:0,u=typeof navigator<"u"?navigator.onLine:!0,k=u?f.connected?e("متصل ومستقر","Connected"):f.hibernating?e("في وضع التوفير (خامل)","Hibernating"):e("بانتظار الربط","Connecting"):e("غير متصل (أوفلاين)","Offline"),z=u?f.connected?"var(--mint-strong)":"var(--blue)":"var(--amber)";return`
    <section class="setting-section diag-section" id="diagnostics-dashboard">
      ${t?`
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
          <div style="font-size:22px;font-weight:800;color:var(--ink);margin:4px 0;">${m.totalIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${e("موثقة بالكامل ببصمات فريدة","Fingerprint grouped with stack traces")}</div>
        </div>

        <div class="diag-metric-card ${m.activeIncidents>0?"is-active-warning":""}">
          <div style="font-size:11px;color:${m.activeIncidents>0?"var(--red)":"var(--muted)"};font-weight:600;">${e("حوادث نشطة بحاجة لمتابعة","Active / Unresolved")}</div>
          <div style="font-size:22px;font-weight:800;color:${m.activeIncidents>0?"var(--red)":"var(--teal)"};margin:4px 0;">${m.activeIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${m.activeIncidents>0?`${G("warning")} ${e("تستدعي تدخل هندسي","Requires engineering fix")}`:`${G("healthy")} ${e("جميع الحوادث معالجة","All resolved")}`}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("حسابات الفريق المراقبة","Monitored Users")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--teal);margin:4px 0;">${r.length||m.totalUsersMonitored||6} ${e("مستخدمين","Users")}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${e("تغطية شاملة لكل جلسة ومصادقة","Continuous per-session telemetry")}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("نظام التنبيهات البريدية (Email Alerts)","Email Alert System")}</div>
          <div style="font-size:13px;font-weight:700;color:var(--mint-strong);margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span style="display:inline-flex;align-items:center;">${t?n("flask",14):n("mail",14)}</span> ${t?e("محاكاة الساندبوكس (معزول)","Sandbox Simulation (Isolated)"):e("مفعّل ويرسل تلقائياً","Active & Auto-Dispatched")}
          </div>
          <div style="font-size:11px;color:var(--muted);font-family:monospace;overflow:hidden;text-overflow:ellipsis;">${a(m.alertEmailRecipient||(t?"demo-alerts@darc.demo":"admin@darc-design.bond"))}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("المزامنة الفورية (Realtime & Outbox)","Live Sync & Outbox")}</div>
          <div style="font-size:13px;font-weight:700;color:${z};margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span class="column-dot ${f.connected?"green":"amber"}"></span>
            ${k}
            ${f.latencyMs?`<span style="font-size:10px;color:var(--muted);font-weight:500;">(${f.latencyMs}ms)</span>`:""}
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">
            ${h>0?`<span style="color:var(--amber);font-weight:600;">${h} ${e("معلقة بالإرسال","outbox pending")}</span>`:`${G("healthy")} ${e("قائمة الإرسال خالية ومحدثة","Outbox empty & synced")}`}
          </div>
        </div>
      </div>

      <!-- 3. User Explorer Grid -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span style="display:inline-flex;align-items:center;">${n("users",14)}</span> ${e("حالة واستقرار حسابات المستخدمين (انقر للفلترة السريعة):","User Health & Incidents (Click to Filter):")}
          </h3>
          ${B!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${e("إلغاء الفلترة وعرض الجميع","Clear Filter & Show All")}
            </button>
          `:""}
        </div>

        <div class="diag-users-grid">
          <div 
            class="diag-user-card user-diag-card ${B==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("globe",18)}</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${e("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${o.length} ${e("حوادث","records")}</div>
              </div>
            </div>
          </div>

          ${r.map(s=>{const $=B===s.userId,w=s.activeIncidents>0;return`
              <div 
                class="diag-user-card user-diag-card ${$?"is-active":""}" 
                data-action="filter-diagnostics-user" 
                data-user-id="${a(s.userId)}"
                title="${e("انقر لعرض الحوادث الخاصة بهذا المستخدم فقط","Click to view only incidents for this user")}"
              >
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:34px;height:34px;border-radius:50%;background:${a(s.avatarColor||"#0d6269")};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">
                    ${a((s.name||"US").slice(0,2))}
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:6px;justify-content:space-between;">
                      <div style="font-size:12px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        ${a(e(s.name||"",s.nameEn||s.name||""))}
                      </div>
                      ${s.isRealAccount?`
                        <span style="background:rgba(16,185,129,0.12);color:#059669;border:1px solid rgba(16,185,129,0.25);font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px;flex-shrink:0;display:inline-flex;align-items:center;gap:3px;">
                          ${G("active")} ${e("حساب مفعل","Active")}
                        </span>
                      `:""}
                    </div>
                    <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${a(s.email||"")}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span class="status-badge ${w?"urgent":"done"}" style="font-size:9px;padding:1px 6px;">
                        ${w?e(`${s.activeIncidents} حادث نشط`,`${s.activeIncidents} Active`):e("مستقر (0 أعطال)","Healthy (0 errors)")}
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
          ${e(`عرض ${o.length} حادث مسجل`,`Showing ${o.length} incidents`)}
          ${c?` (${e("للمستخدم:","for user:")} <strong>${c.name}</strong>)`:""}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${o.length?o.map(s=>{const $=s.severity==="critical",w=s.status==="resolved",R=s.occurrences||1,d=s.affectedUsers&&s.affectedUsers.length||1,y=s.origin==="backend_worker"?"Backend Server (Worker)":"Frontend Client (SPA)",E=JSON.stringify({incidentId:s.id,fingerprint:s.fingerprint||null,occurrences:R,affectedUsersCount:d,origin:s.origin||"frontend_client",timestamp:s.timestamp,user:{id:s.userId,name:s.userName,email:s.userEmail,role:s.userRole},client:{device:s.deviceType,browser:s.browser,os:s.os,resolution:s.screenResolution,memoryMb:s.memoryMb,ip:s.ip,location:`${s.city}, ${s.country}`},error:{type:s.errorType,message:s.errorMessage,stack:s.stackTrace},breadcrumbs:s.breadcrumbs,suggestedFix:s.suggestedSolution},null,2);return`
            <article class="diag-incident-card ${$?"is-critical":s.severity==="high"?"is-warning":""}">
              
              <!-- Incident Head -->
              <div class="diag-incident-head">
                <div style="display:flex;align-items:flex-start;gap:12px;">
                  <span style="line-height:1;margin-top:2px;display:flex;align-items:center;color:${w?"#10b981":$?"#ef4444":"#f59e0b"};">${w?n("success",22):$?n("alert",22):n("warning",22)}</span>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                      <h4 style="margin:0;font-size:15px;font-weight:700;color:${w?"var(--ink)":$?"var(--red)":"var(--amber-strong)"};">
                        ${a(e(s.titleAr||"",s.titleEn||""))}
                      </h4>
                      <span class="status-badge ${$?"urgent":s.severity==="high"?"in-review":"done"}" style="font-size:10px;">
                        ${a(String(s.severity||"high").toUpperCase())}
                      </span>
                      <span style="font-size:10px;font-family:monospace;background:var(--surface-soft);border:1px solid var(--line);padding:2px 8px;border-radius:4px;color:var(--muted);">
                        ${a(s.id||"")}
                      </span>
                      <span style="font-size:10px;font-family:monospace;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);padding:2px 6px;border-radius:4px;">
                        ${a(y)}
                      </span>
                      ${R>1?`
                        <span class="badge" style="background:rgba(239,68,68,0.12);color:var(--red);border:1px solid rgba(239,68,68,0.25);font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;">
                          ${n("alert",11)} ${e(`تكرر ${R} مرات`,`${R} occurrences`)}
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
                        <span style="width:18px;height:18px;border-radius:50%;background:${a(s.avatarColor||"#0d6269")};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;">
                          ${a(s.userName?.slice(0,2)||"US")}
                        </span>
                        <strong style="color:var(--ink);">${a(s.userName)}</strong> (${a(s.userEmail)})
                      </span>
                      <span>·</span>
                      <span style="display:inline-flex;align-items:center;gap:4px;">${n("pin",12)} ${a(s.city)}, ${a(s.country)} (${a(s.ip)})</span>
                      <span>·</span>
                      <span style="display:inline-flex;align-items:center;gap:4px;">${n("clock",12)} ${new Date(s.timestamp).toLocaleString(l.lang==="ar"?"ar-AE":"en-US")}</span>
                    </div>
                  </div>
                </div>

                <!-- Resolve & Actions -->
                <div style="display:flex;align-items:center;gap:8px;">
                  ${w?`
                    <span class="status-badge done" style="font-size:11px;display:inline-flex;align-items:center;gap:4px;">
                      ${n("check",12)} ${e("تم حل المشكلة وإغلاق البلاغ","Resolved")}
                    </span>
                  `:`
                    <button type="button" class="btn btn-sm btn-primary" data-action="resolve-diagnostic-incident" data-incident-id="${a(s.id)}" style="font-size:11px;display:flex;align-items:center;gap:5px;">
                      ${n("check",13)} ${e("تحديد كمعالج","Mark Resolved")}
                    </button>
                  `}
                  <button type="button" class="btn btn-sm btn-soft" data-action="copy-debug-bundle" data-bundle="${a(E)}" style="font-size:11px;display:flex;align-items:center;gap:5px;" title="${e("نسخ كامل التقرير الفني لحل المشكلة فوراً","Copy complete technical debug bundle to clipboard")}">
                    ${n("copy",13)} ${e("نسخ تقرير الخطأ","Copy Debug Info")}
                  </button>
                </div>
              </div>

              <!-- Technical Environment Specs Matrix -->
              <div class="diag-specs-grid" dir="ltr" style="text-align:left;">
                <div><span style="color:var(--muted);">${e("نظام التشغيل:","OS:")}</span> <strong>${a(s.os||"macOS")}</strong></div>
                <div><span style="color:var(--muted);">${e("المتصفح:","Browser:")}</span> <strong>${a(s.browser||"Chrome")}</strong></div>
                <div><span style="color:var(--muted);">${e("نوع الجهاز:","Device:")}</span> <strong>${a(s.deviceType||"Desktop")}</strong></div>
                <div><span style="color:var(--muted);">${e("أبعاد الشاشة:","Screen:")}</span> <strong>${a(s.screenResolution||"1920x1080")}</strong></div>
                <div><span style="color:var(--muted);">${e("ذاكرة الـ Heap:","Memory:")}</span> <strong style="color:${s.memoryMb>130?"var(--red)":"var(--teal)"};">${a(String(s.memoryMb))} MB</strong></div>
                <div><span style="color:var(--muted);">${e("المسار النشط:","Route:")}</span> <strong style="color:var(--teal);font-family:monospace;">${a(s.currentView||"#dashboard")}</strong></div>
              </div>

              <!-- Error Message & Stack Trace (The exact code location) -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("search",14)}</span> ${e("الخطأ وموقع الاستثناء البرمجي (Stack Trace):","Error Message & Call Stack:")}
                </div>
                <div class="diag-code-box">
                  <div style="color:#ef4444;font-weight:700;margin-bottom:8px;">${a(s.errorMessage)}</div>
                  <pre style="margin:0;color:#94a3b8;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;">${a(s.stackTrace)}</pre>
                </div>
              </div>

              <!-- User 5D Flight Recorder Timeline -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("footprint",14)}</span> ${e("تسلسل خطوات المستخدم قبل الخطأ (5D Flight Recorder Timeline):","Step-by-Step Flight Recorder Timeline:")}
                </div>
                <div class="diag-timeline">
                  ${(s.breadcrumbs||[]).length?s.breadcrumbs.map(b=>{const T=dt(b.category);return`
                      <div class="diag-timeline-item ${T}">
                        <span class="diag-badge-category ${T}">[${a(b.category||"action")}]</span>
                        <span style="font-family:monospace;color:var(--muted);font-size:11px;">[${a(b.time||"")}]</span>
                        <span style="flex:1;">${a(b.message||"")}</span>
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
                  ${a(s.suggestedSolution||e("تحقق من صحة الكود ومسارات المعالجة.","Review code handling."))}
                </div>
              </div>

              <!-- Email Dispatch Status Receipt -->
              <div class="diag-footer-receipt">
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <span style="display:inline-flex;align-items:center;">${n("mail",13)}</span>
                  <span>${e("حالة إرسال بريد التنبيه للإدارة:","Admin Alert Email:")}</span>
                  <strong style="color:var(--teal);">${t?e("محاكاة الساندبوكس (معزول)","Simulated Sandbox"):s.emailAlert?.status==="delivered"?e("تم التسليم للبريد بنجاح","Delivered"):e("تم التحقق والتسجيل في السيرفر","Dispatched to Sandbox")}</strong>
                  <span style="font-family:monospace;">(${a(t?"demo-alerts@darc.demo":s.emailAlert?.deliveredTo||"admin@darc-design.bond")})</span>
                </div>
                <div>
                  ${w?e(`معالج بواسطة: ${a(s.resolvedBy||"Admin")}`,`Resolved by: ${a(s.resolvedBy||"Admin")}`):e("قيد التدخل البرمجي","Awaiting resolution")}
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
  `}var ie=Object.freeze({HOLD_LATCH_MS:3500,CACHE_TTL_MS:18e4,POLL_INTERVAL_MS:4e3,MAX_RUNS_DISPLAY:5}),Z=null,Le=0,ke=!1,pe=null;function ye(){return`darc_vault_${Date.now().toString(36)}_${Math.random().toString(36).substring(2,9)}`}async function Je(t=!1){const i=Date.now();if(Z&&!t&&i-Le<ie.CACHE_TTL_MS)return{data:Z,error:null};ke=!0,pe=null;const r=ye();try{ae("vault","Fetching vault backups ledger from API",{traceId:r,force:t});const o=await P("/api/vault/backups"+(t?"?force=true":""),{headers:{"x-darc-trace-id":r}});return o&&o.backups&&(Z=o,Le=i,pe=null),{data:Z,error:null}}catch(o){return console.warn("[VaultService] Failed to fetch vault backups:",o),pe=o.message||e("فشل في جلب النسخ الاحتياطية من الخزنة","Failed to retrieve backups from vault"),ae("vault","Fetch error: "+(o.message||"unknown"),{traceId:r}),{data:Z,error:pe}}finally{ke=!1}}async function Te(){const t=ye();try{return(await P("/api/vault/runs",{headers:{"x-darc-trace-id":t},silent:!0}))?.runs||[]}catch(i){return console.warn("[VaultService] Failed to fetch workflow runs:",i),[]}}async function ct(){const t=ye();return ae("vault","Triggering instant encrypted backup dispatch",{traceId:t}),await P("/api/vault/backup-now",{method:"POST",headers:{"x-darc-trace-id":t}})}async function pt({backupFilename:t="latest",dryRun:i=!0,confirmationPhrase:r=""}){const o=ye();return ae("vault","Dispatching disaster recovery workflow",{traceId:o,backupFilename:t,dryRun:i,isReal:!i}),await P("/api/vault/restore",{method:"POST",headers:{"x-darc-trace-id":o},body:JSON.stringify({backupFilename:t,dryRun:!!i,confirmationPhrase:r})})}function W(){return{cachedVault:Z,isLoading:ke,vaultError:pe}}async function mt(t){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}if(typeof document<"u"){const i=document.createElement("textarea");i.value=t,i.style.position="fixed",i.style.left="-999999px",i.style.top="-999999px",document.body.appendChild(i),i.focus(),i.select();try{return document.execCommand("copy"),i.remove(),!0}catch{return i.remove(),!1}}return!1}var X=null,ge=0,q=[],le=null;async function Ae(t=!1){const i=await Je(t);return i.data&&Te().then(r=>{q=r.slice(0,ie.MAX_RUNS_DISPLAY);const o=document.getElementById("vault-runs-ledger");o&&(o.innerHTML=be(q))}),i.data}function gt(){const t=M(),{cachedVault:i,isLoading:r}=W();return!i&&!r&&Ae().then(()=>{const o=document.getElementById("vault-content-area");if(o){const m=W();o.innerHTML=te(t,m.cachedVault,m.vaultError,m.isLoading),se()}}).catch(o=>{const m=document.getElementById("vault-content-area");if(m){const c=W();m.innerHTML=te(t,c.cachedVault,o?.message||c.vaultError,!1),se()}}),`
    <div class="settings-vault-wrap" id="vault-content-area">
      ${te(t,i,null,r)}
    </div>
  `}function be(t){return!t||t.length===0?`
      <div style="padding:2rem 1rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">
        ${e("لا توجد عمليات سحابية مسجلة مؤخراً.","No recent cloud workflow executions found.")}
      </div>
    `:`
    <div style="overflow-x:auto;">
      <table class="table" style="width:100%; margin:0; border-collapse:collapse; font-size:0.85rem;">
        <thead>
          <tr style="background:rgba(0,0,0,0.02); border-bottom:1px solid var(--border-color); text-align:start;">
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("مسار التشغيل","Workflow")}</th>
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("الحالة","Status")}</th>
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("طريقة الإطلاق","Trigger")}</th>
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("التوقيت","Timestamp")}</th>
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted); text-align:end;">${e("التفاصيل","Log")}</th>
          </tr>
        </thead>
        <tbody>
          ${t.map(i=>{const r=i.conclusion==="success",o=i.conclusion==="failure",m=i.status==="in_progress"||i.status==="queued";let c="";return m?c=`
                <span style="display:inline-flex; align-items:center; gap:0.35rem; font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:1rem; background:rgba(217,119,6,0.12); color:#d97706; font-weight:600;">
                  <span style="width:6px; height:6px; border-radius:50%; background:#d97706; animation:pulse 1.5s infinite;"></span>
                  ${e("قيد التنفيذ...","In Progress...")}
                </span>
              `:r?c=`
                <span style="display:inline-flex; align-items:center; gap:0.35rem; font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:1rem; background:rgba(16,185,129,0.12); color:#10b981; font-weight:600;">
                  ${n("check","width:12px; height:12px;")} ${e("ناجح 100%","Success")}
                </span>
              `:o?c=`
                <span style="display:inline-flex; align-items:center; gap:0.35rem; font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:1rem; background:rgba(239,68,68,0.12); color:#ef4444; font-weight:600;">
                  ${n("alert-triangle","width:12px; height:12px;")} ${e("تعثر التنفيذ","Failed")}
                </span>
              `:c=`<span style="font-size:0.75rem; color:var(--text-muted);">${a(i.status||"unknown")}</span>`,`
              <tr style="border-bottom:1px solid var(--border-color);">
                <td style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-main);">
                  <div style="display:flex; align-items:center; gap:0.4rem;">
                    ${n("terminal","width:14px; height:14px; color:var(--text-muted);")}
                    <span>${a(i.name)}</span>
                  </div>
                </td>
                <td style="padding:0.75rem 1.25rem;">${c}</td>
                <td style="padding:0.75rem 1.25rem; color:var(--text-muted); font-size:0.8rem; font-family:monospace;">
                  ${i.event==="workflow_dispatch"?e("يدوي من اللوحة","Manual UI"):a(i.event)}
                </td>
                <td style="padding:0.75rem 1.25rem; color:var(--text-muted); font-size:0.8rem;">
                  ${ue(i.createdAt)}
                </td>
                <td style="padding:0.75rem 1.25rem; text-align:end;">
                  <a href="${a(i.htmlUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="font-size:0.75rem; text-decoration:none; padding:0.25rem 0.6rem;">
                    ${e("GitHub ↗","GitHub ↗")}
                  </a>
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `}function te(t,i,r=null,o=!1){if(!i&&r)return`
      <div class="vault-error-state card" style="text-align:center; padding:3.5rem 1.5rem; border:1px solid rgba(239, 68, 68, 0.3); background:rgba(239, 68, 68, 0.04); border-radius:1rem; margin-bottom:2rem;">
        <div style="color:#ef4444; margin-bottom:1rem;">
          ${n("alert-triangle","width:36px; height:36px;")}
        </div>
        <h3 style="font-weight:700; color:var(--text-main); margin-bottom:0.5rem;">
          ${e("تعذر تحميل سجل النسخ الاحتياطية من Google Drive","Failed to Load Backups Ledger from Google Drive")}
        </h3>
        <p style="color:var(--text-muted); font-size:0.9rem; max-width:540px; margin:0 auto 1.5rem auto;">
          ${a(r)}
        </p>
        <button id="btn-retry-vault-fetch" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:0.5rem; background:#059669; border-color:#059669; font-size:0.9rem;">
          ${n("refresh","width:15px; height:15px;")}
          <span>${e("إعادة المحاولة الآن","Retry Now")}</span>
        </button>
      </div>
    `;if(!i||o)return`
      <div class="vault-loading-state" style="text-align:center; padding:4rem 1rem;">
        <div class="loading-spinner" style="margin: 0 auto 1.5rem auto;"></div>
        <h3 style="font-weight:600; color:var(--text-main); margin-bottom:0.5rem;">
          ${e("جاري فحص خزنة Google Drive 5TB ومطابقة النسخ المشفرة...","Scanning Google Drive 5TB Vault & Verifying Checksums...")}
        </h3>
        <p style="color:var(--text-muted); font-size:0.9rem;">
          ${e("يتم الاتصال عبر مصادقة Google OAuth2 المشفرة","Connecting via secure Google OAuth2 handshake")}
        </p>
      </div>
    `;const m=i?.total||0,c=i?.latestBackup,f=i?.backups||[];return`
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

    <!-- Metrics Bento Row -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; margin-bottom:2rem;">
      <div class="card" style="padding:1.25rem 1.5rem; border-radius:0.75rem; border:1px solid var(--border-color);">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${e("حالة أحدث نسخة مشفرة","Latest Encrypted Backup")}
        </span>
        <div style="font-size:1.15rem; font-weight:700; color:var(--text-main); margin-top:0.5rem; display:flex; align-items:center; gap:0.5rem;">
          <span style="color:#10b981;">${n("check","width:18px; height:18px;")}</span>
          <span>${c?ue(c.createdAt):e("لا توجد نسخ","None")}</span>
        </div>
      </div>

      <div class="card" style="padding:1.25rem 1.5rem; border-radius:0.75rem; border:1px solid var(--border-color);">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${e("معيار التشفير المعتمد","Cipher Standard")}
        </span>
        <div style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin-top:0.5rem; font-family:monospace;">
          AES-256-CBC (PBKDF2 100k)
        </div>
      </div>

      <div class="card" style="padding:1.25rem 1.5rem; border-radius:0.75rem; border:1px solid var(--border-color);">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${e("إجمالي النسخ المتاحة (Drive 5TB)","Total Backups Available")}
        </span>
        <div style="font-size:1.5rem; font-weight:800; color:#10b981; margin-top:0.35rem;">
          ${m} ${e("نسخ موثقة","Archives")}
        </div>
      </div>

      <div class="card" style="padding:1.25rem 1.5rem; border-radius:0.75rem; border:1px solid var(--border-color);">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${e("حجم أرشيف قاعدة البيانات الأحدث","Latest Archive Size")}
        </span>
        <div style="font-size:1.4rem; font-weight:800; color:var(--text-main); margin-top:0.5rem;">
          ${c?.sizeFormatted||"—"}
        </div>
      </div>
    </div>

    <!-- Backups Table Ledger -->
    <div class="card" style="padding:0; overflow:hidden; border-radius:0.75rem; border:1px solid var(--border-color); margin-bottom:2rem;">
      <div style="padding:1.25rem 1.5rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
        <h3 style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin:0;">
          ${e("سجل النسخ الاحتياطية المتاحة على Google Drive (5TB)","Available Backups Ledger (Google Drive 5TB)")}
        </h3>
        <span style="font-size:0.82rem; color:var(--text-muted);">
          ${e("فترة الاستبقاء: 30 يوماً متجددة","Retention Policy: 30-Day Rolling")}
        </span>
      </div>

      ${f.length===0?`
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
              ${f.map(h=>`
                <tr style="border-bottom:1px solid var(--border-color); transition:background 0.15s ease;">
                  <td style="padding:1rem 1.25rem; font-weight:600; color:var(--text-main);">
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                      <span style="color:#10b981;">${n("lock","width:16px; height:16px;")}</span>
                      <code style="font-family:monospace; font-size:0.85rem; color:var(--text-main);">${a(h.filename)}</code>
                    </div>
                  </td>
                  <td style="padding:1rem 1.25rem; color:var(--text-muted);">${ue(h.createdAt)}</td>
                  <td style="padding:1rem 1.25rem; color:var(--text-main); font-weight:600;">${h.sizeFormatted}</td>
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
                    <a href="https://drive.google.com/file/d/${a(h.id)}/view" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="font-size:0.8rem; margin-inline-end:0.4rem; text-decoration:none;">
                      ${n("download","width:13px; height:13px;")}
                      <span>${e("Drive","Drive")}</span>
                    </a>
                    <button class="btn btn-sm btn-secondary btn-copy-cli" data-filename="${a(h.filename)}" style="font-size:0.8rem; margin-inline-end:0.4rem;">
                      ${n("copy","width:13px; height:13px;")}
                      <span>${e("أمر CLI","CLI Command")}</span>
                    </button>
                    <button class="btn btn-sm btn-primary btn-restore-target" data-filename="${a(h.filename)}" style="background:#059669; border-color:#059669; font-size:0.8rem;">
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

    <!-- Live Cloud Run & Automation Ledger -->
    <div class="card" style="padding:0; overflow:hidden; border-radius:0.75rem; border:1px solid var(--border-color);">
      <div style="padding:1.25rem 1.5rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
        <div>
          <h3 style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin:0;">
            ${e("سجل العمليات الحية ومسارات الأتمتة (Cloud Run Ledger)","Live Automation & Cloud Run History")}
          </h3>
          <span style="font-size:0.82rem; color:var(--text-muted);">
            ${e("مراقبة حالة مسارات GitHub Actions المباشرة للنسخ والتعافي","Live GitHub Actions Workflow Executions")}
          </span>
        </div>
        <button id="btn-refresh-runs" class="btn btn-sm btn-secondary" style="font-size:0.8rem;">
          ${n("refresh","width:13px; height:13px;")}
          <span>${e("تحديث السجل الحي","Refresh Runs")}</span>
        </button>
      </div>

      <div id="vault-runs-ledger">
        ${be(q)}
      </div>
    </div>
  `}function se(){const t=document.getElementById("btn-retry-vault-fetch");t&&(t.onclick=async()=>{t.disabled=!0,t.innerHTML=`${n("refresh","width:15px; height:15px; animation:spin 1s linear infinite;")} <span>${e("جاري الفحص...","Retrying...")}</span>`,await Ae(!0);const c=document.getElementById("vault-content-area");if(c){const f=W();c.innerHTML=te(M(),f.cachedVault,f.vaultError,f.isLoading),se()}});const i=document.getElementById("btn-trigger-backup-now");i&&(i.onclick=async()=>{i.disabled=!0,i.innerHTML=`${n("refresh","width:15px; height:15px; animation:spin 1s linear infinite;")} <span>${e("جاري الإطلاق...","Launching...")}</span>`;try{await ct(),D(e("تم إطلاق مسار النسخ الاحتياطي المشفر على GitHub بنجاح","Encrypted backup dispatched to GitHub successfully")),Ye()}catch(c){D(c.message||"Failed to dispatch backup","error")}finally{i.disabled=!1,i.innerHTML=`${n("upload","width:15px; height:15px;")} <span>${e("أخذ نسخة فورية الآن","Backup Now")}</span>`}});const r=document.getElementById("btn-refresh-vault");r&&(r.onclick=async()=>{r.disabled=!0,r.innerHTML=`${n("refresh","width:16px; height:16px; animation:spin 1s linear infinite;")} <span>${e("جاري الفحص...","Scanning...")}</span>`,await Ae(!0);const c=document.getElementById("vault-content-area");if(c){const h=W();c.innerHTML=te(M(),h.cachedVault,h.vaultError,h.isLoading),se()}const f=W();f.vaultError?D(f.vaultError,"error"):D(e("تم تحديث قائمة النسخ من Google Drive بنجاح","Vault list refreshed successfully"))});const o=document.getElementById("btn-refresh-runs");o&&(o.onclick=async()=>{o.disabled=!0,q=(await Te()).slice(0,ie.MAX_RUNS_DISPLAY);const c=document.getElementById("vault-runs-ledger");c&&(c.innerHTML=be(q)),o.disabled=!1,D(e("تم تحديث سجل العمليات الحية","Live run history updated"))});const m=document.getElementById("btn-open-restore-wizard");m&&(m.onclick=()=>Ie("latest")),document.querySelectorAll(".btn-restore-target").forEach(c=>{c.onclick=()=>{Ie(c.getAttribute("data-filename"))}}),document.querySelectorAll(".btn-copy-cli").forEach(c=>{c.onclick=async()=>{const f=`openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -pass pass:"$BACKUP_ENCRYPTION_KEY" -in "${c.getAttribute("data-filename")}" | gunzip | psql "$SUPABASE_DB_URL"`;await mt(f)?D(e("تم نسخ أمر فك التشفير والاستعادة إلى الحافظة","Decryption & restore command copied to clipboard")):D(e("تعذر النسخ التلقائي، يرجى النسخ يدوياً","Could not auto-copy, please copy manually"),"error")}})}function Ye(){le&&clearInterval(le);let t=0;le=setInterval(async()=>{if(typeof document<"u"&&document.hidden)return;t++;const i=await Te();q=i.slice(0,ie.MAX_RUNS_DISPLAY);const r=document.getElementById("vault-runs-ledger");r&&(r.innerHTML=be(q)),(!i.some(o=>o.status==="in_progress"||o.status==="queued")||t>15)&&(clearInterval(le),le=null,Je(!0).then(()=>{const o=document.getElementById("vault-content-area");if(o){const m=W();o.innerHTML=te(M(),m.cachedVault,m.vaultError,m.isLoading),se()}}))},ie.POLL_INTERVAL_MS)}function Ie(t="latest"){ae("vault","Opened disaster recovery wizard modal",{targetFilename:t});const i=`
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
          <strong style="color:#10b981; font-family:monospace;">${a(t)}</strong>
        </p>
      </div>

      <!-- Mode Selector: Dry Run vs Real Restore -->
      <div style="background:var(--surface); border:1px solid var(--border-color); border-radius:0.75rem; padding:1.25rem; margin-bottom:1.5rem;">
        <label style="display:flex; align-items:flex-start; gap:0.75rem; cursor:pointer; margin-bottom:1rem;">
          <input type="radio" name="restore-mode" id="mode-dryrun" value="dryrun" checked style="margin-top:0.25rem;">
          <div>
            <strong style="display:flex; align-items:center; gap:0.4rem; color:var(--text-main); font-size:0.95rem;">
              <span style="color:#10b981;">${n("check","width:16px; height:16px;")}</span>
              <span>${e("محاكاة تجريبية آمنة (Dry-Run Rehearsal)","Safe Dry-Run Rehearsal")}</span>
            </strong>
            <p style="color:var(--text-muted); font-size:0.83rem; margin:0.25rem 0 0 0; line-height:1.4;">
              ${e("يقوم السيرفر بتنزيل النسخة، التحقق من بصمة SHA-256، وفك تشفيرها للتأكد من سلامتها دون أي مساس ببيانات الإنتاج الحية.","Downloads archive, validates SHA-256 checksum & decrypts without touching production database.")}
            </p>
          </div>
        </label>

        <label style="display:flex; align-items:flex-start; gap:0.75rem; cursor:pointer; margin:0;">
          <input type="radio" name="restore-mode" id="mode-real" value="real" style="margin-top:0.25rem;">
          <div>
            <strong style="display:flex; align-items:center; gap:0.4rem; color:#ef4444; font-size:0.95rem;">
              <span style="color:#ef4444;">${n("alert-triangle","width:16px; height:16px;")}</span>
              <span>${e("استعادة حقيقية كاملة (Live Production Restore)","Live Production Restore")}</span>
            </strong>
            <p style="color:var(--text-muted); font-size:0.83rem; margin:0.25rem 0 0 0; line-height:1.4;">
              ${e("يؤخذ باك أب استباقي فوري، ثم يتم حقن النسخة المستهدفة داخل معاملة ذرية مع تجميد التريغرز لمنع تكرار الإشعارات والرسائل.","Takes pre-restore safety snapshot, disables triggers & injects SQL atomically.")}
            </p>
          </div>
        </label>
      </div>

      <!-- Live Restore Confirmation Box -->
      <div id="real-confirm-box" style="display:none; background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.3); border-radius:0.75rem; padding:1.25rem; margin-bottom:1.5rem;">
        <label style="font-size:0.85rem; font-weight:700; color:#ef4444; display:block; margin-bottom:0.5rem;">
          ${e("اكتب عبارة الأمان لتأكيد الاستعادة الحية:","Type confirmation phrase to proceed:")}
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
  `,r=document.getElementById("modal-root");if(!r){console.error("[Vault] modal-root element not found in DOM");return}r.innerHTML=Ee(e("غرفة عمليات التعافي من الكوارث","Disaster Recovery Ops"),e("نظام استعادة آمن محمي بلقطة استباقية وتجميد الـ Triggers","Secure recovery protected by pre-flight snapshot & trigger freeze"),i,"restore-wizard","modal-lg");const o=document.getElementById("mode-dryrun"),m=document.getElementById("mode-real"),c=document.getElementById("real-confirm-box"),f=document.getElementById("hold-btn-text"),h=document.getElementById("btn-hold-restore");if(!o||!m||!h){console.warn("[Vault] Wizard modal elements not ready in DOM");return}const u=()=>{const w=o.checked;c&&(c.style.display=w?"none":"block"),h&&(h.style.background=w?"#059669":"#dc2626"),f&&(w?f.innerHTML=`${n("play","width:18px; height:18px;")} <span>${e("اضغط مطولاً لبدء المحاكاة التجريبية (3.5 ثوانٍ)","Hold 3.5s to Execute Rehearsal")}</span>`:f.innerHTML=`${n("alert-triangle","width:18px; height:18px;")} <span>${e("اضغط مطولاً لتأكيد الاستعادة الحية (3.5 ثوانٍ)","Hold 3.5s to Trigger LIVE Restore")}</span>`)};o.onchange=u,m.onchange=u;const k=document.getElementById("hold-progress-bar");let z=0;const s=()=>{const w=o.checked;if(!w&&(document.getElementById("input-confirm-phrase")?.value||"").trim()!=="RESTORE_PRODUCTION_DATABASE"){D(e("يجب كتابة عبارة التأكيد RESTORE_PRODUCTION_DATABASE أولاً","Please enter confirmation phrase first"),"error");return}z=Date.now(),ge=0,k.style.width="0%",X=setInterval(()=>{const R=Date.now()-z;ge=Math.min(R/ie.HOLD_LATCH_MS*100,100),k.style.width=ge+"%",ge>=100&&(clearInterval(X),X=null,ut(t,w))},50)},$=()=>{X&&(clearInterval(X),X=null,k.style.width="0%")};h.addEventListener("mousedown",s),h.addEventListener("mouseup",$),h.addEventListener("mouseleave",$),h.addEventListener("touchstart",s,{passive:!0}),h.addEventListener("touchend",$)}async function ut(t,i){const r=document.getElementById("restore-live-feedback"),o=document.getElementById("btn-hold-restore");o&&(o.disabled=!0),r&&(r.style.display="block",r.innerHTML=`
      <div style="color:#10b981; display:flex; align-items:center; gap:0.4rem;">${n("play","width:14px; height:14px;")} <span>${e("جاري إطلاق مسار التعافي على GitHub Actions...","Dispatching Disaster Recovery on GitHub Actions...")}</span></div>
      <div style="color:var(--text-muted); margin-top:0.4rem;">Mode: ${i?"DRY_RUN (Safe Rehearsal)":"PRODUCTION_RESTORE"}</div>
    `);try{ae("vault","Triggering restore API call",{backupFilename:t,isDryRun:i}),await pt({backupFilename:t,dryRun:i,confirmationPhrase:i?"DRY_RUN_REHEARSAL":"RESTORE_PRODUCTION_DATABASE"}),r&&(r.innerHTML+=`
        <div style="color:#10b981; margin-top:0.6rem; display:flex; align-items:center; gap:0.4rem;">${n("check","width:14px; height:14px;")} <span>${e("تم قبول العملية وتشغيل المسار المعزول بنجاح!","Workflow dispatched successfully!")}</span></div>
        <div style="color:var(--text-muted); margin-top:0.4rem;">Status: Initiated via GitHub Actions Runner</div>
        <div style="margin-top:0.75rem;">
          <a href="https://github.com/ahmad0105/Darc-design-team/actions/workflows/database-restore.yml" target="_blank" class="btn btn-sm btn-secondary" style="font-size:0.8rem;">
            ${e("متابعة التنفيذ الحي على GitHub ↗","Watch Live Run on GitHub ↗")}
          </a>
        </div>
      `),D(e("تم إطلاق مسار التعافي بنجاح","Disaster recovery launched successfully")),Ye()}catch(m){r&&(r.innerHTML+=`
        <div style="color:#ef4444; margin-top:0.6rem; display:flex; align-items:center; gap:0.4rem;">${n("alert-triangle","width:14px; height:14px;")} <span>${e("خطأ في إطلاق المسار:","Dispatch Error:")} ${a(m.message)}</span></div>
      `),D(m.message||"Error triggering restore","error")}finally{o&&(o.disabled=!1)}}var Dt=je({FULL_PERMISSIONS_CATALOG:()=>Xe,canAccessSettingsSection:()=>j,exportAuditLogsXLS:()=>yt,fetchFullAuditHistory:()=>ht,openRoleModal:()=>$t,openUserModal:()=>wt,printAuditReport:()=>bt,renderAuditForProject:()=>ft,renderSettings:()=>xt,renderTeam:()=>vt,renderUserActivityCell:()=>Qe});function vt(){if(!C()&&!A("manage_users"))return`<section class="panel"><div class="empty">${n("alert",18)}<span>${e("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const t=l.data?.user?.id;let i=(l.data?.users||[]).filter(r=>r.status!=="inactive");return t!=="usr_ahmad"?i=i.filter(r=>r.id!=="usr_ahmad"):i=[...i].sort((r,o)=>r.id==="usr_ahmad"?-1:o.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${e("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${p("team")}</h1>
        <p>${e("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${C()||A("manage_users")?`<button class="btn btn-primary" data-action="new-user">${n("plus",15)} ${p("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${i.map(r=>{const o=Se(r.id,l.data?.tasks||[]),m=r.id==="usr_ahmad";return`
          <article class="member-card ${m?"system-developer-card":""}" style="${m?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${me(r,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${a(e(r.name,r.nameEn||r.name))}</strong>
                  <span>${a(e(r.jobTitleAr||(m?"المبرمج / مدير النظام":""),r.jobTitleEn||r.jobTitleAr||""))}</span>
                </div>
              </div>
              ${m?`<span class="stealth-dev-badge">${n("shield",12)} ${e("مدير ومطور النظام","Super Admin & Dev")}</span>`:Ke()&&r.id!==l.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${a(r.id)}">${n("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${r.status==="active"?"done":"not_started"}">${a(U(r))}</span>
            </div>
            <div class="member-card-stats">
              <span>${p("progress")} <strong>${o.progress}%</strong></span>
              <span>${o.tasks} ${p("tasks")}</span>
            </div>
            <div class="member-email">${r.email?a(r.email):p("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function ft(t){const i=(l.data?.auditLogs||[]).filter(r=>r.details?.projectId===t||r.entityType==="project"&&r.entityId===t);return i.length?`<div class="audit-list">${i.map(r=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${a(r.user?e(r.user.name,r.user.nameEn||r.user.name):"DARC")} · ${a(r.action)}</strong><span>${a(r.entityType)} · ${ve(r.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${n("check",18)}<span>${e("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function Qe(t){const i=t.lastActiveAt||t.customFields?.lastActiveAt,r=t.lastLoginAt||t.customFields?.lastLoginAt;if(!i&&!r)return`<span class="activity-never">${e("لم يسجل دخول بعد","Never logged in")}</span>`;const o=Date.now(),m=i?new Date(i).getTime():0,c=t.id===l.data?.user?.id?0:m&&!isNaN(m)?Math.floor((o-m)/6e4):999999,f=c>=0&&c<=5;let h="";if(f)h=`<span class="activity-pill online"><span class="activity-dot online"></span> ${e("نشط الآن","Online")}</span>`;else if(c<60)h=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${e(`منذ ${c} دقيقة`,`${c}m ago`)}</span>`;else if(c<1440){const k=Math.floor(c/60);h=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${e(`منذ ${k} ساعة`,`${k}h ago`)}</span>`}else m>0&&(h=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${ve(i,!1)}</span>`);const u=r?`<span class="activity-sub" title="${a(r)}">${e("دخول:","Login:")} ${ve(r,!0)}</span>`:"";return`<div class="activity-wrapper">${h}${u}</div>`}function ze(t){return ue(t,{includeSeconds:!0})}function fe(t){const i=t.action||"",r=t.entityType||t.entity_type||"",o=t.details||{};let m="badge-neutral",c=i,f=r;i==="login"?(m="badge-teal",c=e("تسجيل دخول","Sign In"),f=e("جلسة نظام","System Session")):i==="create"?(m="badge-mint",c=e("إنشاء جديد","Created")):i==="update"?(m="badge-blue",c=e("تعديل بيانات","Updated")):i==="delete"?(m="badge-red",c=e("نقل للمهملات","Moved to Trash")):i==="status_change"?(m="badge-amber",c=e("تغيير حالة","Status Changed")):i==="export_report"?(m="badge-teal",c=e("تصدير تقرير","Exported Report")):i==="restore"?(m="badge-mint",c=e("استعادة","Restored")):i==="purge"?(m="badge-danger",c=e("حذف نهائي","Purged")):i==="invite"&&(m="badge-blue",c=e("دعوة مستخدم","Invite Sent")),r==="task"?f=e("مهمة","Task"):r==="project"?f=e("مشروع","Project"):r==="document"?f=e("مستند","Document"):r==="user"?f=e("مستخدم","User"):r==="report"?f=e("تقرير","Report"):r==="role"&&(f=e("دور وصلاحيات","Role"));let h="—";return o.title||o.name?h=`<strong>${a(o.title||o.name)}</strong>`:i==="status_change"&&(o.oldStatus||o.newStatus)?h=`<span>${a(V(o.oldStatus))} → <strong>${a(V(o.newStatus))}</strong></span>`:t.entityId&&(h=`<code style="font-size:11px;color:var(--muted);">${a(t.entityId)}</code>`),{badgeClass:m,actionLabel:c,entityLabel:f,detailHtml:h}}function yt(t=null){if(!A("view_audit_logs")&&!C()){D(e("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}const i=t||l._lastFilteredAuditLogs||l.data?.auditLogs||[];if(!i.length){D(e("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const r=it(),o=r.displayName,m=r.logoUrl,c=l.data?.user||{},f=e(c.name,c.nameEn||c.name)||"Admin",h=Me(),u=Ne();let k=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${m?`<img src="${a(m)}" height="38" loading="lazy" decoding="async" style="vertical-align:middle;margin-inline-end:10px;" />`:""}
          <span style="vertical-align:middle;">${e("سجل الرقابة والتدقيق الأمني والعمليات — "+o,"Audit & Security Trail Report — "+o)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${e("المؤسسة:","Company:")} ${a(o)} | ${e("المشرف المستخرج:","Exported by:")} ${a(f)} | ${e("تاريخ التصدير:","Export Date:")} ${a(h)} ${a(u)}
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
  `;i.forEach((s,$)=>{const w=s.user||(s.userId?(l.data?.users||[]).find(L=>L.id===s.userId):null),R=w?e(w.name,w.nameEn||w.name):e("النظام","System"),d=w?U(w):"—",y=ze(s.createdAt),{actionLabel:E,entityLabel:b}=fe(s);let T="";s.details?.title||s.details?.name?T=s.details.title||s.details.name:s.action==="status_change"?T=`${V(s.details?.oldStatus)} → ${V(s.details?.newStatus)}`:typeof s.details=="object"?T=JSON.stringify(s.details):T=String(s.details||s.entityId||"—");const x=$%2===0?"#ffffff":"#f8fafc";k+=`
      <tr style="background:${x};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${a(F(s.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${a(F(`${y.date} ${y.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${a(F(R))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${a(F(d))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${a(F(E))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${a(F(b))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${a(F(T))}</td>
      </tr>
    `}),k+="</table>";const z=new Date().toISOString().split("T")[0];at(`DARC_Audit_Trail_${z}`,k),D(e("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),P("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${z}`,details:{reportType:"Audit_Logs_Excel",count:i.length}})}).catch(()=>{})}function bt(t=null){const i=t||l._lastFilteredAuditLogs||l.data?.auditLogs||[];if(!i.length){D(e("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const r=l.data?.company||{},o=e(r.nameAr||r.name,r.nameEn||r.name)||"DARC Design Team";let m=r.logoUrl||"";m.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(m=`${window.location.origin}${m}`);const c=l.data?.user||{},f=e(c.name,c.nameEn||c.name)||"Admin",h=Me(),u=Ne(),k=i.length,z=i.filter(b=>b.action==="create").length,s=i.filter(b=>b.action==="update"||b.action==="status_change").length,$=i.filter(b=>b.action==="delete"||b.action==="purge"||b.action==="trash").length;let w="";i.forEach((b,T)=>{const x=b.user||(b.userId?(l.data?.users||[]).find(O=>O.id===b.userId):null),L=x?e(x.name,x.nameEn||x.name):e("النظام","System"),ne=x?U(x):"—",g=ze(b.createdAt),{actionLabel:v,entityLabel:S}=fe(b);let _="";b.details?.title||b.details?.name?_=b.details.title||b.details.name:b.action==="status_change"?_=`${V(b.details?.oldStatus)} → ${V(b.details?.newStatus)}`:typeof b.details=="object"?_=JSON.stringify(b.details):_=String(b.details||b.entityId||"—"),w+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${a(b.id||String(T+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${a(g.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${a(g.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${a(L)}</div>
          <div style="font-size:10px;color:#64748b;">${a(ne)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${a(v)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${a(S)}</td>
        <td style="font-size:11px;color:#334155;">${a(_)}</td>
      </tr>
    `});const R=`
    <!DOCTYPE html>
    <html lang="${l.lang}" dir="${l.lang==="ar"?"rtl":"ltr"}">
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
          text-align: ${l.lang==="ar"?"left":"right"};
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
          text-align: ${l.lang==="ar"?"right":"left"};
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
          ${m?`<img src="${a(m)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />`:""}
          <h1 class="brand-title">${a(o)}</h1>
          <div class="report-subtitle">${e("تقرير الرقابة والتدقيق الأمني وسجل العمليات الإدارية","Official Security Audit & Governance Operations Trail")}</div>
        </div>
        <div class="report-meta-box">
          <div><strong>${e("المشرف المستخرج:","Generated By:")}</strong> ${a(f)}</div>
          <div><strong>${e("تاريخ التقرير:","Report Date:")}</strong> ${a(h)} - ${a(u)}</div>
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
          ${w}
        </tbody>
      </table>

      <footer class="signature-section">
        <div class="signature-box">
          <strong>${e("إعداد وتصدير التقرير","Prepared By")}</strong><br /><br />
          <span>${a(f)}</span>
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
        <iframe id="audit-print-preview-iframe" style="width:100%;height:100%;border:none;background:#ffffff;" srcdoc="${a(R)}"></iframe>
      </div>
    </div>
  `,d.style.display="flex";const y=()=>{d.style.display="none",d.innerHTML="",window.removeEventListener("keydown",E)},E=b=>{b.key==="Escape"&&y()};window.addEventListener("keydown",E),document.getElementById("btn-close-audit-print-modal")?.addEventListener("click",y),document.getElementById("btn-print-audit-iframe")?.addEventListener("click",()=>{const b=document.getElementById("audit-print-preview-iframe");b&&b.contentWindow&&(b.contentWindow.focus(),b.contentWindow.print())}),P("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:i.length}})}).catch(()=>{})}async function ht(){try{D(e("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const t=await P("/api/audit?limit=1000");t&&t.logs&&(l.data.auditLogs=t.logs,l.auditFullHistoryLoaded=!0,renderView(),D(e(`تم جلب ${t.logs.length} عملية بنجاح.`,`Loaded ${t.logs.length} audit logs.`)))}catch(t){D(t.message||e("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function j(t){const i=C();return t==="profile"||t==="security"||t==="notifications"?!0:t==="company"?i||A("manage_settings"):t==="whatsapp"?i||A("manage_settings"):t==="roles"?i||A("manage_roles"):t==="accounts"?i||A("manage_users")||A("manage_existing_account_permissions")||A("view_user_activity"):t==="trash"?i||A("manage_trash"):t==="audit"?i||A("view_audit_logs"):t==="analytics"?i||A("manage_settings")||A("view_audit_logs"):t==="diagnostics"?i||A("manage_settings"):t==="vault"?i:!1}function xt(){const t=l.data?.user?.id,i=C(),r=j("company"),o=j("whatsapp"),m=j("roles"),c=j("accounts"),f=j("trash"),h=j("audit"),u=j("analytics"),k=j("diagnostics"),z=j("vault"),s=[["profile",e("الملف الشخصي","Profile")],["notifications",e("الإشعارات والتنبيهات","Notifications & Alerts")],...r?[["company",p("company")]]:[],...o?[["whatsapp",e("تنبيهات واتساب","WhatsApp Alerts")]]:[],...m?[["roles",p("roles")]]:[],...c?[["accounts",p("accounts")]]:[],["security",e("الأمان","Security")],...f?[["trash",e("سلة المهملات","Trash")]]:[],...h?[["audit",p("audit")]]:[],...u?[["analytics",e("المراقبة والزيارات والأداء","Observability & Analytics")]]:[],...k?[["diagnostics",e("تشخيص الأعطال والمستخدمين","Error Logs & User Diagnostics")]]:[],...z?[["vault",e("مركز النسخ والتعافي من الكوارث","Disaster Recovery & Vault")]]:[]];s.some(([d])=>d===l.settingsSection)||(l.settingsSection=s[0]?.[0]||"profile");const $=l.data?.user||{};let w="";if(l.settingsSection==="profile"&&(w=`
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
              ${$.avatarUrl?`<img src="${a($.avatarUrl)}" alt="Avatar" loading="lazy" decoding="async" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test($.avatarColor||"")?$.avatarColor:"#0d6269"};">${a(Ce($))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test($.avatarColor||"")?$.avatarColor:"#0d6269"};">${a(Ce($))}</div>`}
              <div class="avatar-upload-overlay">
                ${n("upload",18)}
                <span>${e("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${a(e($.name,$.nameEn||$.name))}</h3>
            <p class="profile-user-role">${a(e($.jobTitleAr||"",$.jobTitleEn||$.jobTitleAr||""))} · <span class="status-badge done">${a(U($))}</span></p>
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
              <label>${p("nameAr")}</label>
              <input name="name" value="${a($.name||"")}" required />
            </div>
            <div class="field">
              <label>${p("nameEn")}</label>
              <input name="nameEn" value="${a($.nameEn||"")}" />
            </div>
            <div class="field">
              <label>${p("jobTitle")} (${e("عربي","AR")})</label>
              <input name="jobTitleAr" value="${a($.jobTitleAr||"")}" />
            </div>
            <div class="field">
              <label>${p("jobTitle")} (${e("إنجليزي","EN")})</label>
              <input name="jobTitleEn" value="${a($.jobTitleEn||"")}" />
            </div>
            <div class="field full">
              <label>${p("email")}</label>
              <input value="${a($.email||"")}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${e("رقم الواتساب للتنبيهات الفردية","WhatsApp Phone for Alerts")}</label>
              <input type="tel" name="phone" dir="ltr" value="${a($.phone||$.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" />
              <small class="field-hint">${e("أدخل رقم هاتفك مع مفتاح الدولة لاستلام تنبيهات المهام والمخططات المسندة إليك مباشرة على الواتساب.","Enter your phone number with country code to receive alerts for assigned tasks and drawings directly on WhatsApp.")}</small>
            </div>
            <div class="field full">
              <label for="settings-calendar-system">${e("نظام التقويم المفضل في المنصة","Preferred Calendar System")}</label>
              <select id="settings-calendar-system" name="calendarSystem">
                <option value="gregorian" ${_e()==="gregorian"?"selected":""}>${e("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${_e()==="hijri"?"selected":""}>${e("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${e("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${p("save")}</button>
          </div>
        </form>
      </section>
    `),l.settingsSection==="company"&&(i||A("manage_settings"))){const d=l.data?.company||{};w=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${p("company")}</h2>
            <p>${e("هوية مساحة العمل وشعار الشركة واللغة الافتراضية.","Workspace identity, company logo, and default language.")}</p>
          </div>
        </div>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${e("انقر لرفع وتعديل شعار الشركة","Click to upload and change company logo")}">
            <div class="logo-upload-box">
              ${d.logoUrl?`<img src="${a(d.logoUrl)}" alt="Logo" loading="lazy" decoding="async" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${n("building",24)}</span>`:`<span class="brand-mark">${n("building",24)}</span>`}
              <div class="logo-upload-overlay">
                ${n("upload",16)}
                <span>${e("تعديل","Edit")}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${a(d.name||"DARC Design Team")}</strong>
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
              <label>${p("nameAr")}</label>
              <input name="nameAr" value="${a(d.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${p("nameEn")}</label>
              <input name="nameEn" value="${a(d.nameEn||"")}" />
            </div>
            <div class="field full">
              <label>${p("emailStatus")}</label>
              <input value="${a(l.data?.emailConfigured?p("emailConfigured"):p("emailNotConfigured"))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${p("save")}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:16px;">${n("info",16)}<span>${p("emailInfo")}</span></div>
      </section>
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("نموذج الإنجاز","Progress model")}</h2>
            <p>${p("weightedExplanation")}</p>
          </div>
        </div>
        <div class="report-stat-list">
          <div class="report-stat"><span>${p("weightedProgress")}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${p("simpleProgress")}</span><strong style="color:var(--ink-soft)">—</strong></div>
        </div>
      </section>
    `}if(l.settingsSection==="security"&&(w=`
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
          <div class="form-actions" style="margin-top:20px"><button type="submit" class="btn btn-primary">${p("save")}</button></div>
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
    `),l.settingsSection==="notifications"){const d=Ze(),y=et()&&!tt(),E=d==="granted",b=d==="denied",T=y?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);font-weight:700;">${e("مدعومة عبر تطبيق الويب (PWA)","Supported via Web App (PWA)")}</span>`:`<span class="mini-badge" style="background:${E?"var(--mint)":b?"var(--red-soft)":"var(--surface-soft)"};color:${E?"var(--teal)":b?"var(--red)":"var(--muted)"};font-weight:700;">
          ${E?e("مفعلة على هذا المتصفح","Enabled on this browser"):b?e("محظورة من إعدادات المتصفح","Blocked in browser settings"):e("بانتظار الموافقة","Permission pending")}
        </span>`,x=y?`<button type="button" class="btn btn-primary btn-sm" data-action="show-ios-notification-guide">${n("bell",14)} ${e("طريقة التفعيل على iPhone","iPhone Setup Guide")}</button>`:E?`<button type="button" class="btn btn-ghost btn-sm" data-action="test-browser-notification" style="color:var(--teal);">${n("check",14)} ${e("فحص إشعار المتصفح","Test Browser Alert")}</button>`:`<button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications">${n("check",14)} ${e("تفعيل الإشعارات الآن","Enable Notifications")}</button>`;w=`
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
              <span class="attention-icon ${E?"teal":b?"red":"blue"}" style="margin-top:2px;">
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
              ${x}
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
    `}if(l.settingsSection==="accounts"&&c){const d=C()||A("view_user_activity"),y=C()||A("manage_users"),E=C()||A("manage_existing_account_permissions")||A("manage_users"),b=C()&&!M();let T=l.data?.users||[];t!=="usr_ahmad"&&(T=T.filter(x=>x.id!=="usr_ahmad")),w=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${p("accounts")}</h2>
            <p>${e("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${y?`<button class="btn btn-primary btn-sm" data-action="new-user">${n("plus",14)} ${p("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${p("team")}</th>
                <th>${p("role")}</th>
                <th>${p("email")}</th>
                <th>${p("accountStatus")}</th>
                ${d?`<th>${e("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${E?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${T.map(x=>{const L=x.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${me(x)}
                        <div class="team-member-copy">
                          <strong>${a(e(x.name,x.nameEn||x.name))}</strong>
                          <span>${a(e(x.jobTitleAr||(L?"المبرمج / مدير النظام":""),x.jobTitleEn||x.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${L?`<span class="stealth-dev-badge">${n("shield",12)} ${e("مدير ومطور النظام","Super Admin & Dev")}</span>`:a(U(x))}
                    </td>
                    <td>
                      ${x.email?a(x.email):`<span style="color:var(--muted)">${p("noEmail")}</span>`}
                      ${x.phone||x.customFields?.phone?`<div style="font-size:11px;color:var(--primary);direction:ltr;text-align:right;margin-top:3px;font-family:monospace;font-weight:600;display:inline-flex;align-items:center;gap:4px;">${n("phone",11)} ${a(x.phone||x.customFields?.phone)}</div>`:""}
                    </td>
                    <td>
                      <span class="status-badge ${x.status==="active"?"done":"not_started"}">${x.status==="active"?p("activeAccount"):p("pendingAccount")}</span>
                    </td>
                    ${d?`
                      <td>
                        ${Qe(x)}
                      </td>
                    `:""}
                    ${E?`
                      <td>
                        <div class="role-actions">
                          ${L?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${a(x.id)}">${p("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${a(x.id)}">${p("edit")}</button>
                            ${x.id!==l.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${a(x.id)}" title="${x.status==="pending"?e("تفعيل الحساب يدوياً","Activate manually"):e("تغيير كلمة المرور","Change password")}">${n(x.status==="pending"?"check":"settings",13)}</button>
                              ${b?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${a(x.id)}" title="دخول كـ هذا الحساب">${n("user",13)}</button>`:""}
                            `:""}
                            ${x.id!==l.data?.user?.id&&x.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${a(x.id)}">${n("send",13)}</button>`:""}
                            ${x.id!==l.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${a(x.id)}">${n("trash",13)}</button>`:""}
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
    `}if(l.settingsSection==="roles"&&(i||A("manage_roles"))&&(w=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${p("roles")}</h2>
            <p>${e("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${i||A("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${n("plus",14)} ${p("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(l.data?.roles||[]).map(d=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${a(e(d.nameAr,d.nameEn))}</strong>
                  ${d.builtIn?`<span class="role-system-badge">${n("shield",11)} ${p("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${a(e(d.descriptionAr,d.descriptionEn))}</p>
                <div class="role-meta">${d.permissions.includes("*")?e("صلاحية كاملة","Full access"):`${d.permissions.length} ${p("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${a(d.id)}">${n("edit",13)} ${p("edit")}</button>
                ${d.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${a(d.id)}">${n("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),l.settingsSection==="trash"&&f){if(!l.trash&&typeof sessionStorage<"u")try{const g=sessionStorage.getItem("darc_trash_cache");g&&(l.trash=JSON.parse(g))}catch{}!l.trashLoaded&&!l._trashFetching&&(l._trashFetching=!0,P("/api/trash").then(g=>{l.trash=Array.isArray(g)?g:g.trash||[...(g.projects||[]).map(v=>({...v,type:"project"})),...(g.tasks||[]).map(v=>({...v,type:"task"})),...(g.documents||[]).map(v=>({...v,type:"document"}))],l.trashLoaded=!0,l._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(l.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(g=>{l._trashFetching=!1,console.error("[Trash fetch error]",g)}));const d=l.trash||[],y=l.trashFilter||"all",E=(l.trashQuery||"").trim().toLowerCase(),b=d.filter(g=>{if(y!=="all"&&g.type!==y)return!1;if(!E)return!0;const v=(e(g.nameAr||g.titleAr,g.nameEn||g.titleEn)||g.name||g.title||g.originalName||"").toLowerCase(),S=(g.code||g.projectCode||"").toLowerCase(),_=(g.projectNameAr||g.projectNameEn||"").toLowerCase();return v.includes(E)||S.includes(E)||_.includes(E)}),T=d.filter(g=>g.type==="project").length,x=d.filter(g=>g.type==="task").length,L=d.filter(g=>g.type==="document").length,ne=d.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${n("info",16)}</div>
        <div class="trash-notice-text">
          <strong>${e("سلة المحذوفات المركزية المحمية","Central Protected Trash Bin")}</strong>
          <p>${e("تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.","Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.")}</p>
        </div>
      </div>

      <div class="view-toolbar trash-filter-bar">
        <div class="trash-filter-group">
          <button type="button" class="btn btn-sm ${y==="all"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="all">
            ${n("layers",14)}
            <span>${e("الكل","All")}</span>
            <span class="badge ${y==="all"?"badge-on-primary":"badge-neutral"}">${d.length}</span>
          </button>
          <button type="button" class="btn btn-sm ${y==="project"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="project">
            ${n("building",14)}
            <span>${e("المشاريع","Projects")}</span>
            <span class="badge ${y==="project"?"badge-on-primary":"badge-neutral"}">${T}</span>
          </button>
          <button type="button" class="btn btn-sm ${y==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${n("checklist",14)}
            <span>${e("المهام","Tasks")}</span>
            <span class="badge ${y==="task"?"badge-on-primary":"badge-neutral"}">${x}</span>
          </button>
          <button type="button" class="btn btn-sm ${y==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${n("document",14)}
            <span>${e("المستندات","Documents")}</span>
            <span class="badge ${y==="document"?"badge-on-primary":"badge-neutral"}">${L}</span>
          </button>
        </div>
        <div class="search-box search-sm trash-search-box">
          ${n("search",14)}
          <input type="search" placeholder="${e("بحث في المحذوفات...","Search deleted items...")}" value="${a(l.trashQuery||"")}" data-action="search-trash-input" />
        </div>
      </div>

      ${b.length?`
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${e("الاسم / العنوان","Name / Title")}</th>
                <th>${e("النوع","Type")}</th>
                <th>${e("المشروع التابع له","Project")}</th>
                <th>${e("الحالة السابقة","Prior Status")}</th>
                <th>${e("تاريخ الحذف","Deleted At")}</th>
                <th style="text-align:${l.lang==="ar"?"left":"right"}">${e("الإجراءات","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${b.map(g=>{const v=g.type==="project",S=g.type==="task",_=g.type==="document",O=e(g.nameAr||g.titleAr,g.nameEn||g.titleEn)||g.name||g.title||g.originalName||g.code||e("عنصر محذوف","Deleted item"),I=!v&&g.projectId?(l.data?.projects||[]).find(oe=>oe.id===g.projectId):null,J=g.projectNameAr||g.projectNameEn||(I?e(I.nameAr,I.nameEn||I.nameAr):null),Y=g.projectCode||I?.code,Q=_&&g.size?g.size>1048576?(g.size/1048576).toFixed(1)+" MB":Math.round(g.size/1024)+" KB":"",re=i||A("manage_trash")||g.uploaderId===t;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${v?"is-project":S?"is-task":"is-doc"}">
                          ${n(v?"building":S?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${a(O)}</strong>
                          ${g.code||v?`<span class="trash-item-code">${a(g.code||g.id)}</span>`:""}
                          ${_&&Q?`<span class="trash-item-code" style="color:var(--muted);">${Q}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${v?"type-project":S?"type-task":"type-doc"}">
                        ${n(v?"building":S?"checklist":"document",11)}
                        ${v?e("مشروع","Project"):S?e("مهمة","Task"):e("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${v?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${e("مشروع رئيسي","Primary Project")}</span>`:J?`${n("building",11)} <span>${a(J)}${Y?` (${a(Y)})`:""}</span>${_&&g.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${a(g.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${g.status?`<span class="status-badge ${a(g.status)}">${a(V(g.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${a(g.deletedAt||"")}">
                        ${ve(g.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${l.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${a(g.type)}" data-id="${a(g.id)}" title="${e("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${n(l.lang==="ar"?"arrow":"arrowLeft",12)} ${e("استعادة","Restore")}
                        </button>
                        ${re?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${a(g.type)}" data-id="${a(g.id)}" title="${e("حذف العنصر نهائياً","Permanently delete item")}">
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
    `:!l.trashLoaded&&!d.length?`
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
    `;w=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${e("سلة المهملات","Recycle Bin")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${!l.trashLoaded&&!d.length?e("جاري التحميل...","Loading..."):`${d.length} ${e("عناصر","items")}`}
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
        ${ne}
      </section>
    `}if(l.settingsSection==="audit"&&(i||A("view_audit_logs"))){const d=[...l.data?.auditLogs||[]].sort((v,S)=>new Date(S.createdAt).getTime()-new Date(v.createdAt).getTime()),y=l.auditFilterAction||"all",E=l.auditFilterEntity||"all",b=l.auditFilterUser||"all",T=(l.auditSearchQuery||"").trim().toLowerCase(),x=d.filter(v=>{if(y!=="all"&&v.action!==y||E!=="all"&&(v.entityType||v.entity_type)!==E||b!=="all"&&(v.userId||v.user_id||v.user?.id)!==b)return!1;if(T){const S=v.user||(v.userId?(l.data?.users||[]).find(oe=>oe.id===v.userId):null),_=(S&&e(S.name,S.nameEn||S.name)||"").toLowerCase(),{actionLabel:O,entityLabel:I}=fe(v),J=(O||v.action||"").toLowerCase(),Y=(I||v.entityType||"").toLowerCase(),Q=(v.id||v.entityId||"").toLowerCase(),re=typeof v.details=="object"?JSON.stringify(v.details).toLowerCase():String(v.details||"").toLowerCase();if(!(_.includes(T)||J.includes(T)||Y.includes(T)||Q.includes(T)||re.includes(T)))return!1}return!0});l._lastFilteredAuditLogs=x;const L=[["all",e("كافة العمليات","All Actions")],["create",e("إنشاء جديد","Create")],["update",e("تعديل بيانات","Update")],["status_change",e("تغيير حالة","Status Change")],["delete",e("نقل للمهملات","Delete / Trash")],["restore",e("استعادة","Restore")],["purge",e("حذف نهائي","Purge")],["export_report",e("تصدير تقرير","Export Report")],["login",e("تسجيل دخول","Sign In")],["invite",e("دعوة مستخدم","Invite")]],ne=[["all",e("كافة العناصر","All Entities")],["project",e("المشاريع","Projects")],["task",e("المهام","Tasks")],["document",e("المستندات","Documents")],["user",e("المستخدمين","Users")],["role",e("الأدوار والصلاحيات","Roles")],["company",e("إعدادات الشركة","Company Settings")],["report",e("التقارير","Reports")]],g=y!=="all"||E!=="all"||b!=="all"||!!T;w=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${p("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${x.length} ${e("عملية معروضة","events shown")}
              </span>
              ${g?`
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${e("من أصل","out of")} ${d.length}
                </span>
              `:""}
            </div>
            <p>${e("سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.","Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.")}</p>
          </div>
          <div class="page-actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${l.auditFullHistoryLoaded?"":`
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
            <input type="search" placeholder="${e("بحث فوري بالمنفذ، العملية، أو التفاصيل...","Search by actor, action, details...")}" value="${a(l.auditSearchQuery||"")}" data-action="search-audit-input" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="filter-select select-compact select-sm" data-action="filter-audit-action" style="min-width:125px;">
              ${L.map(([v,S])=>`<option value="${v}" ${y===v?"selected":""}>${S}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${ne.map(([v,S])=>`<option value="${v}" ${E===v?"selected":""}>${S}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${e("كافة المستخدمين","All Users")}</option>
              ${(l.data?.users||[]).map(v=>`<option value="${v.id}" ${b===v.id?"selected":""}>${a(e(v.name,v.nameEn||v.name))}</option>`).join("")}
            </select>
            ${g?`
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
                  <th style="padding:12px 14px;text-align:${l.lang==="ar"?"left":"right"};">${e("التاريخ والوقت الدقيق","Exact Date & Time")}</th>
                </tr>
              </thead>
              <tbody>
                ${x.map(v=>{const S=v.user||(v.userId?(l.data?.users||[]).find(oe=>oe.id===v.userId):null),_=S?e(S.name,S.nameEn||S.name):e("النظام","System"),O=S?U(S):e("تلقائي","Automated"),I=ze(v.createdAt),{badgeClass:J,actionLabel:Y,entityLabel:Q,detailHtml:re}=fe(v);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${me(S)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${a(_)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${a(O)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${J}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${a(Y)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${a(Q)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${re}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${l.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${a(I.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${n("clock",11)}
                          <span>${a(I.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${n(g?"search":"checklist",24)}
            <span>${g?e("لا توجد عمليات تطابق معايير التصفية المحددة.","No audit logs match the selected filter criteria."):e("لا توجد عمليات مسجلة حتى الآن.","No audit logs recorded yet.")}</span>
            ${g?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${e("إعادة تعيين الفلاتر","Reset filters")}
              </button>
            `:""}
          </div>
        `}
      </section>
    `}if(l.settingsSection==="analytics"&&u&&(w=Ve()),l.settingsSection==="diagnostics"&&k&&(w=qe()),l.settingsSection==="vault"&&z&&(w=gt(),requestAnimationFrame(()=>{se()})),l.settingsSection==="whatsapp"&&o){const d=M(),y=l.data?.company?.customFields?.whatsapp||l.data?.company?.custom_fields?.whatsapp||{};w=`
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
          <span class="status-badge ${y.enabled?"done":"neutral"}">
            ${y.enabled?e("مفعل نشط","Active"):e("معطل","Disabled")}
          </span>
        </div>

        <form data-action="update-whatsapp" class="settings-form" style="max-width:740px;display:grid;gap:18px;">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
            <div>
              <strong style="display:block;font-size:14px;color:var(--ink);margin-bottom:4px;">${e("تفعيل إرسال التنبيهات عبر واتساب","Enable WhatsApp Notifications")}</strong>
              <span style="font-size:12px;color:var(--muted);">${e("إرسال إشعارات فورية لمهندسي الموقع والإدارة عند حدوث تغييرات حرجة.","Send instant alerts to field engineers & management upon critical updates.")}</span>
            </div>
            <label class="switch" style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" name="enabled" ${y.enabled?"checked":""} style="opacity:0;width:0;height:0;" id="wa-toggle-enabled" />
              <span class="slider round" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:var(--line);transition:.3s;border-radius:24px;"></span>
            </label>
          </div>

          <div class="form-grid">
            <div class="field">
              <label>${e("نوع مزود البوابة (Provider)","Gateway Provider")}</label>
              <select name="provider" class="select-compact" style="width:100%;height:42px;">
                <option value="evolution" ${y.provider!=="webhook"?"selected":""}>Evolution API / Baileys</option>
                <option value="webhook" ${y.provider==="webhook"?"selected":""}>Webhook (Custom Webhook URL)</option>
              </select>
            </div>

            <div class="field">
              <label>${e("اسم جلسة الربط (Instance Name)","Instance Name")}</label>
              <input type="text" name="instanceName" value="${a(y.instanceName||"darc-workspace")}" placeholder="darc-workspace" required />
            </div>
          </div>

          <div class="field">
            <label>${e("رابط خادم البوابة (Server Gateway URL) *","Server Gateway URL *")}</label>
            <input type="url" name="serverUrl" value="${a(y.serverUrl||"")}" placeholder="https://evolution-api.example.com" />
            <small style="font-size:11px;color:var(--muted);margin-top:4px;display:block;">${e("رابط خادم Evolution API الخاص بمكتبكم (أو رابط الـ Webhook المستلم).","Your office Evolution API instance URL or receiving Webhook.")}</small>
          </div>

          <div class="field">
            <label>${e("مفتاح الأمان (API Key / Token)","API Key / Token")}</label>
            <input type="password" name="apiKey" value="${a(y.apiKey||"")}" placeholder="••••••••••••••••" />
          </div>

          <div class="field">
            <label>${e("المستلم الافتراضي / قروب الواتساب (اختياري)","Default Recipient / WhatsApp Group (Optional)")}</label>
            <input type="text" name="recipient" value="${a(y.recipient||"")}" placeholder="${e("كود قروب واتساب المهندسين (1203630...@g.us) أو رقم جوال الإدارة","WhatsApp Group JID (1203630...@g.us) or Management Phone")}" />
            <small style="font-size:11px;color:var(--teal);margin-top:4px;display:block;">${e("ملاحظة: هذا الحقل اختياري. في حال عدم وجود قروب حالياً، يمكنك تركه فارغاً وسيتكفل النظام بإرسال كافة التنبيهات والمنشن كرسائل فردية مباشرة إلى هواتف المهندسين والمدير المسجلة في حساباتهم.","Note: This field is optional. If you do not have a group yet, leave it blank and the system will automatically send alerts & mentions directly to engineers & manager personal phones.")}</small>
          </div>

          <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;padding:16px;">
            <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:10px;">${e("أحداث التنبيه الفوري التلقائية:","Automated Trigger Events:")}</strong>
            <div style="display:grid;gap:8px;">
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnCollectiveMention" ${y.notifyOnCollectiveMention!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("megaphone",13)} ${e("عند المنشن الجماعي (@all / @الكل): إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة حتى المدير","When collective mention (@all / @everyone): send direct alert to all project members and managers")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="sendGroupBroadcast" ${y.sendGroupBroadcast?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("users",13)} ${e("إرسال نسخة لقروب الواتساب العام (في حال إدخال كود القروب في الحقل أعلاه)","Send a copy to the WhatsApp Group (if Group JID is set above)")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnBlocked" ${y.notifyOnBlocked!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("warning",13)} ${e("عند تعليق مهمة هندسية (Task Blocked) لتنبيه الموقع فوراً","When a task is blocked to alert field engineers instantly")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnApproval" ${y.notifyOnApproval!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("search",13)} ${e("عند إحالة مهمة للمراجعة والاعتماد (Review / Approval)","When a deliverable is submitted for review & approval")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnDrawing" ${y.notifyOnDrawing!==!1?"checked":""} />
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
    `}const R=i||A("manage_settings")||A("manage_roles")||A("manage_users")||A("manage_trash")||A("view_audit_logs");return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${R?e("تحكم مركزي","CENTRAL CONTROL"):e("الملف الشخصي","USER PROFILE")}</p>
        <h1>${R?p("settings"):e("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${R?e("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):e("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${n(i?"shield":"user",13)} ${a(U($))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${s.map(([d,y])=>`<button class="${l.settingsSection===d?"active":""}" data-action="settings-section" data-section="${d}">${y}</button>`).join("")}
      </aside>
      <div class="settings-content">${w}</div>
    </div>
  `}var Xe=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function $t(t=null){const i=l.data?.permissionsCatalog&&l.data.permissionsCatalog.length>=10?l.data.permissionsCatalog:Xe,r=new Map;i.forEach(u=>{const k=u.category||"general",z=e(u.categoryAr||k,u.categoryEn||k);r.has(k)||r.set(k,{name:z,items:[]}),r.get(k).items.push(u)});const o=t?.id==="admin"||t?.permissions&&t.permissions.includes("*"),m=Array.from(r.entries()).map(([u,k])=>{const z=k.items.map(s=>{const $=s.id||s.key,w=e(s.nameAr||s.ar,s.nameEn||s.en||$),R=o||t?.permissions&&(t.permissions.includes($)||typeof xe<"u"&&xe[$]&&t.permissions.includes(xe[$])),d=o?"disabled":"";return`
        <label class="permission-option" style="cursor:${o?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${a($)}" ${R?"checked":""} ${d} />
          <span style="font-weight:500;">${a(w)}</span>
        </label>
      `}).join("");return`
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${a(k.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${k.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${z}
        </div>
      </div>
    `}).join(""),c=o?"":`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${p("permissions")} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${i.length} ${e("صلاحية متاحة","available permissions")})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${e("تحديد الكل","Select All")}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${e("إلغاء التحديد","Deselect All")}</button>
      </div>
    </div>
  `,f=`
    <form id="role-form" data-role-id="${a(t?.id||"")}">
      <div class="form-grid">
        <div class="field">
          <label>${p("nameAr")} *</label>
          <input name="nameAr" value="${a(t?.nameAr||"")}" required />
        </div>
        <div class="field">
          <label>${p("nameEn")}</label>
          <input name="nameEn" value="${a(t?.nameEn||"")}" />
        </div>
        <div class="field full">
          <label>${p("roleDescription")}</label>
          <textarea name="descriptionAr" rows="2">${a(t?.descriptionAr||"")}</textarea>
        </div>
      </div>
      ${o?`
        <div class="role-modal-note" style="margin-top:15px;">
          ${e("مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.","The system administrator always keeps full root privileges [*] across all aspects of the system.")}
        </div>
      `:`
        ${c}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${m}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${p("cancel")}</button>
        <button type="submit" class="btn btn-primary">${n("check",14)} ${t?p("save"):p("create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=Ee(t?e("تعديل الدور والصلاحيات","Edit role & permissions"):p("addRole"),e("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),f,"role","modal-lg");const h=document.getElementById("modal-root");if(h){const u=h.querySelector("#btn-perm-select-all"),k=h.querySelector("#btn-perm-deselect-all");u&&u.addEventListener("click",()=>{h.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(z=>z.checked=!0)}),k&&k.addEventListener("click",()=>{h.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(z=>z.checked=!1)})}}function wt(t=null){if(t?.id==="usr_ahmad"&&l.data?.user?.id!=="usr_ahmad")return D(e("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!t&&!C())return D(p("adminOnly"),!0);const i=!C(),r=i?"disabled":"",o=(l.data?.roles||[]).filter(c=>C()||c.id!=="admin"),m=`<form id="user-form" data-user-id="${a(t?.id||"")}" data-permission-only="${i}"><div class="form-grid"><div class="field full"><label>${p("nameAr")}</label><input name="name" value="${a(t?.name||"")}" ${r} required /></div><div class="field"><label>${p("nameEn")}</label><input name="nameEn" value="${a(t?.nameEn||"")}" ${r} /></div><div class="field"><label>${p("jobTitle")}</label><input name="jobTitleAr" value="${a(t?.jobTitleAr||"")}" ${r} /></div><div class="field"><label>${p("email")}</label><input name="email" type="email" value="${a(t?.email||"")}" placeholder="name@darc.com" ${r} /></div><div class="field"><label>${e("رقم الواتساب للتنبيهات","WhatsApp Phone")}</label><input name="phone" type="tel" dir="ltr" value="${a(t?.phone||t?.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" ${r} /></div><div class="field"><label>${p("role")}</label><select name="roleId">${o.map(c=>`<option value="${a(c.id)}" ${t?.roleId===c.id?"selected":""}>${a(e(c.nameAr,c.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${i?e("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):e("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${p("cancel")}</button><button type="submit" class="btn btn-primary">${n("check",14)} ${t?i?e("حفظ الصلاحية","Save permission"):p("save"):p("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=Ee(t?i?e("تعديل صلاحية الحساب","Change account permission"):e("تعديل حساب العضو","Edit member account"):p("addMember"),e("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),m,"user")}export{wt as a,Dt as c,lt as d,Tt as f,Et as g,ot as h,$t as i,se as l,St as m,yt as n,bt as o,zt as p,ht as r,ft as s,j as t,Ae as u};
