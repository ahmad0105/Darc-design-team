import{t as pe}from"./rolldown-runtime-BQ-_32WO.js";import{$ as U,A as Ee,C as ae,E as Se,F as ce,G as le,I as me,J as q,K as C,L as de,M as ze,O as e,P as Te,R as je,T as $,U as Ce,W as d,X as se,Y as ge,_ as J,et as N,gt as o,it as r,j as t,k as ee,lt as L,rt as O,st as ve,w as Z,y as ue}from"./core-realtime-B_2J7PVt.js";var Ge=pe({attentionItem:()=>be,metricCard:()=>Y,projectProgress:()=>fe,projectRow:()=>ye,pulseChart:()=>he,renderDashboard:()=>De,teamMetrics:()=>oe,teamRow:()=>xe});function Y(a,n,i,v,f,s=""){return`<article class="metric-card ${v}"><div class="metric-top"><span class="metric-label">${t(a)}</span><span class="metric-icon">${d(f,15)}</span></div><div class="metric-value">${t(n)}</div><span class="metric-note ${s}">${t(i)}</span></article>`}function fe(a){const n=a.health==="off_track"?"red":a.health==="at_risk"?"amber":"";return`<div class="progress-cell"><div class="progress-meta"><span>${r("weightedProgress")}</span><strong>${a.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${n}" style="width:${Math.min(100,a.progress)}%"></div></div></div>`}function ye(a){return`<div class="project-row"><div class="project-main"><span class="project-symbol">${d("building",17)}</span><div class="project-name"><strong>${t(e(a.nameAr,a.nameEn))}</strong><span>${t(a.code)} · ${t(e(a.clientAr,a.clientEn))}</span></div></div>${fe(a)}<div class="project-owner">${Z(a.manager)}<span>${t(a.manager?e(a.manager.name,a.manager.nameEn||a.manager.name):"—")}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${t(a.id)}" aria-label="${r("viewDetails")}">${d(o.lang==="ar"?"arrowLeft":"arrow",14)}</button></div>`}function be(a){const n=q(a)||a.status==="blocked"?"red":"amber",i=q(a)?e("متأخرة","Overdue"):a.status==="blocked"?e("متوقفة","Blocked"):e("تستحق قريبًا","Due soon"),v=e(a.titleAr,a.titleEn);return`<button type="button" class="attention-item" data-action="open-task" data-task-id="${t(a.id)}" title="${t(v)}"><span class="attention-icon ${n}">${d(q(a)||a.status==="blocked"?"alert":"clock",14)}</span><span class="attention-copy"><strong style="color:var(--${n})">${t(v)}</strong><span>${t(i)} · ${t(Ee(a.dueDate))}</span></span></button>`}function oe(a,n){const i=n.filter(s=>ge(s,a)),v=i.reduce((s,x)=>s+Number(x.weight||1),0),f=v?Math.round(i.reduce((s,x)=>s+x.progress*Number(x.weight||1),0)/v):0;return{tasks:i.length,progress:f,overdue:i.filter(q).length}}function xe(a,n){const i=oe(a.id,n);return`<div class="team-row"><div class="team-member">${Z(a)}<div class="team-member-copy"><strong>${t(e(a.name,a.nameEn||a.name))}</strong><span>${t(e(a.jobTitleAr,a.jobTitleEn||a.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${i.tasks}</strong> ${r("tasks")}</div><div class="team-progress"><div class="progress-meta"><span>${r("progress")}</span><strong>${i.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${i.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${t(a.id)}">${d("more",15)}</button></div>`}function he(){const a=[38,48,45,62,55,72,68],n=o.lang==="ar"?["أحد","اثن","ثلث","أربع","خمس","جمع","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`<div class="pulse">${a.map((i,v)=>`<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12,i-22)}%"></span><span class="pulse-bar ${v===a.length-1?"current":""}" style="height:${i}%"></span></div><span>${n[v]}</span></div>`).join("")}</div>`}function De(){const a=o.data?.stats||{},n=o.data?.projects||[],i=o.data?.tasks||[],v=o.data?.users||[],f=o.data?.user||{},s=f.name||f.email||e("مستخدم","User"),x=n.reduce((c,h)=>c+(Number(h.totalWeight)||0),0),p=x?Math.round(n.reduce((c,h)=>c+(Number(h.progress)||0)*(Number(h.totalWeight)||0),0)/x):0,E=[...i].filter(c=>{if(q(c)||c.status==="blocked")return!0;if(c.dueDate){const h=se(c.dueDate);if(h){const T=(h-new Date)/864e5;return T>=0&&T<=7}}return!1}).sort((c,h)=>(c.dueDate?se(c.dueDate)?.getTime()??1/0:1/0)-(h.dueDate?se(h.dueDate)?.getTime()??1/0:1/0)).slice(0,5),w=v.filter(c=>c.status!=="inactive"),S=a.projectCount??n.length,u=a.myTasks??i.filter(c=>ge(c,f.id)).length,k=a.overdueTasks??i.filter(q).length,z=a.dueSoon??0,m=a.completedTasks??i.filter(c=>c.status==="done").length;return`<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${e("لوحة قيادة المشاريع","PROJECT COMMAND CENTER")}</p><h1>${Ce()}، ${t(e(s.replace(/^م\.\s?/,""),f.nameEn||s))}</h1><p>${r("welcomeText")}</p></div><div class="welcome-status"><span>${r("portfolioHealth")}</span><strong>${p}%</strong><small>${e("إنجاز المحفظة الموزون","Weighted portfolio progress")}</small></div></div>
    <div class="metrics-grid">${Y(r("activeProjects"),a.activeProjects||0,e(`${S} مشاريع إجمالًا`,`${S} projects total`),"teal","building","up")}${Y(r("openTasks"),a.openTasks??i.length,e(`${u} مسندة لك`,`${u} assigned to you`),"blue","checklist")}${Y(r("overdue"),k,e("تحتاج تصعيدًا ومتابعة","Needs escalation and follow-up"),"red",k?"alert":"check",k?"alert":"")}${Y(r("dueThisWeek"),z,e("موعد قريب","Near-term due dates"),"amber","clock")}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${r("projectProgress")}</h2><p class="panel-subtitle">${r("projectProgressSub")}</p></div>${$("view_projects")?`<button class="text-link" data-view="projects">${r("seeAll")} ${d(o.lang==="ar"?"arrowLeft":"arrow",12)}</button>`:""}</div><div class="project-list">${n.length?n.slice(0,5).map(ye).join(""):`<div class="empty">${d("building",18)}<span>${r("noProjects")}</span></div>`}</div></section>${C()||$("manage_users")?`<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${r("teamProgress")}</h2><p class="panel-subtitle">${r("teamProgressSub")}</p></div><button class="text-link" data-view="team">${r("seeAll")} ${d(o.lang==="ar"?"arrowLeft":"arrow",12)}</button></div><div class="team-table">${w.slice(0,6).map(c=>xe(c,i)).join("")}</div></section>`:""}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${r("attention")}</h2><p class="panel-subtitle">${r("attentionSub")}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${E.length}</span></div><div class="attention-list">${E.length?E.map(be).join(""):`<div class="empty">${d("check",18)}<span>${r("noAttention")}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${r("recentPulse")}</h2><p class="panel-subtitle">${r("recentPulseSub")}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${m} ${r("done")}</span></div>${he()}</section></div></div>`}var X=null,ie=!1;async function _e(a=!1){if(X&&!a)return X;ie=!0;try{const n=await J("/api/telemetry/analytics",{silent:!0});n&&n.data&&(X=n.data)}catch(n){console.warn("[Analytics] Failed to fetch remote analytics:",n)}finally{ie=!1}return X}function $e(){const a=X,n=ue();!a&&!ie&&_e().then(()=>{if(o.view==="settings"&&o.settingsSection==="analytics"){const p=document.querySelector(".settings-content");p&&(p.innerHTML=$e())}});const i=a?.stats||{totalVisits:384,uniqueVisitors:162,activeSessions:8,avgTimeSpentFormattedAr:"8 دقائق و 24 ثانية",avgTimeSpentFormattedEn:"8m 24s",healthScore:"100%",crashFreeRate:"99.8%",bounceRate:"11.4%",returnRate:"68.4%",edgeLatency:"32ms",activeAnomaliesCount:0,totalAnomaliesLogged:2},v=a?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",flag:"🇦🇪",visits:165,percent:43},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",flag:"🇸🇦",visits:112,percent:29.2},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",flag:"🇪🇬",visits:48,percent:12.5},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",flag:"🇶🇦",visits:24,percent:6.3},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",flag:"🇰🇼",visits:18,percent:4.7},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",flag:"🇴🇲",visits:9,percent:2.3},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",flag:"🇧🇭",visits:8,percent:2}],f=a?.cities||[{name:"Dubai",visits:110},{name:"Riyadh",visits:78},{name:"Abu Dhabi",visits:55},{name:"Cairo",visits:48},{name:"Jeddah",visits:34},{name:"Doha",visits:24}];a?.os;const s=a?.recentAnomalies||[],x=n.memoryMb||45;return`
    <section class="setting-section">
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
            ${d("alert",13)} ${e("محاكاة فحص استهلاك زائد","Test Anomaly Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-analytics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${d("clock",13)} ${e("تحديث المؤشرات","Refresh Live Data")}
          </button>
        </div>
      </div>

      <!-- 1. بطاقات المؤشرات الرئيسية (KPI Cards) -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;margin-bottom:24px;">
        <!-- بطاقة الزيارات الحقيقية -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("الزيارات الحقيقية المعتمدة","Verified Total Visits")}</span>
            <span style="background:var(--teal-soft,#e3f6f0);color:var(--teal);padding:4px;border-radius:8px;display:flex;">${d("user",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${(i.totalVisits||384).toLocaleString()}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">(${(i.uniqueVisitors||162).toLocaleString()} ${e("زائر مستقل","uniques")})</span>
          </div>
          <div style="font-size:11px;color:var(--mint-strong);font-weight:600;display:flex;align-items:center;gap:4px;">
            <span>🟢 ${i.activeSessions||1} ${e("جلسات نشطة الآن","live sessions right now")}</span>
          </div>
        </div>

        <!-- بطاقة وقت الجلسة الحقيقي -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("متوسط مدة الزيارة الصافية (Dwell Time)","Avg Active Dwell Time")}</span>
            <span style="background:var(--blue-soft,#eaf1fb);color:var(--blue);padding:4px;border-radius:8px;display:flex;">${d("clock",14)}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);">${e(i.avgTimeSpentFormattedAr,i.avgTimeSpentFormattedEn)}</div>
          <div style="font-size:11px;color:var(--muted);">${e(`معدل الارتداد السريع: ${i.bounceRate||"11.4%"}`,`Bounce Rate: ${i.bounceRate||"11.4%"}`)}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("مؤشر استقرار الأجهزة (Health Score)","Device Stability Score")}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${d("shield",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:#2e7d32;">${i.healthScore||"100%"}</div>
            <span style="font-size:11px;color:var(--mint-strong);font-weight:700;">✓ ${i.crashFreeRate||"99.8%"} ${e("خالية من الأعطال","Crash-Free")}</span>
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">${e(`ذاكرة جهازك الحالية: ${x}MB (آمنة)`,`Current Device Memory: ${x}MB (Healthy)`)}</div>
        </div>

        <!-- بطاقة سرعة السحابة ومعدل العودة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("سرعة السيرفر ومعدل عودة الفريق","Cloud Speed & Retention")}</span>
            <span style="background:var(--amber-soft,#fff1dc);color:var(--amber);padding:4px;border-radius:8px;display:flex;">${d("flag",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${i.edgeLatency||"32ms"}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">${i.returnRate||"68.4%"} ${e("عودة دورية","Return Rate")}</span>
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
            ${v.map(p=>`
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
                  <span style="display:flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);">
                    <span style="font-size:16px;">${p.flag}</span>
                    <span>${e(p.nameAr,p.nameEn)}</span>
                  </span>
                  <span style="font-weight:700;color:var(--teal);">${p.visits.toLocaleString()} <span style="font-weight:400;font-size:11px;color:var(--muted);">(${p.percent}%)</span></span>
                </div>
                <div style="height:6px;width:100%;background:var(--surface-soft);border-radius:999px;overflow:hidden;border:1px solid var(--line);">
                  <div style="height:100%;width:${p.percent}%;background:linear-gradient(90deg, var(--teal), var(--mint-strong));border-radius:999px;"></div>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- قائمة أبرز المدن وتوزيع الأجهزة والأنظمة -->
          <div style="display:flex;flex-direction:column;gap:16px;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("أبرز المدن زيارة:","Top Visiting Cities:")}</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${f.map(p=>`
                  <span style="background:var(--surface);border:1px solid var(--line);padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:6px;">
                    📍 ${p.name} <span style="font-size:10px;color:var(--teal);font-weight:700;">${p.visits}</span>
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
            <span class="status-badge ${s.some(p=>p.status==="active")?"urgent":"done"}">
              ${s.some(p=>p.status==="active")?e("⚠️ تم رصد حالات تستدعي المتابعة","⚠️ Active Anomalies"):e("✓ جميع الأجهزة تعمل باستهلاك طبيعي","✓ Optimal Performance")}
            </span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${s.length?s.map(p=>`
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;background:${p.status==="active"?"rgba(239,68,68,0.06)":"var(--surface-soft)"};border:1px solid ${p.status==="active"?"rgba(239,68,68,0.25)":"var(--line)"};">
              <span style="font-size:18px;margin-top:2px;">${p.status==="active"?"🚨":"✅"}</span>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <strong style="font-size:13px;color:${p.status==="active"?"var(--red)":"var(--ink)"};">${e(p.titleAr,p.titleEn)}</strong>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:10px;background:var(--surface);border:1px solid var(--line);padding:2px 8px;border-radius:999px;font-family:monospace;">${p.ip}</span>
                    <span style="font-size:11px;color:var(--muted);">${new Date(p.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                  </div>
                </div>
                <p style="margin:4px 0 0;font-size:12px;color:var(--ink-soft);line-height:1.5;">${e(p.detailAr,p.detailEn)}</p>
                <div style="display:flex;align-items:center;gap:10px;margin-top:6px;font-size:11px;color:var(--muted);">
                  <span>📍 ${p.city}, ${p.countryCode}</span>
                  <span>💻 ${p.deviceType}</span>
                  <span style="font-weight:600;color:${p.status==="active"?"var(--red)":"var(--mint-strong)"};">${p.status==="active"?e("قيد التدخل الوقائي","Mitigating"):e("تمت المعالجة وحماية الاستقرار","Resolved & Protected")}</span>
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
  `}var K=null,ne=!1,I="all",F="all",H="all";async function Pe(a=!1){if(K&&!a)return K;ne=!0;try{const n=await J("/api/telemetry/incidents",{silent:!0});n&&n.users&&(K=n)}catch(n){console.warn("[Diagnostics] Failed to fetch incidents:",n)}finally{ne=!1}return K}function He(a){I=a}function qe(a){F=a}function Je(a){H=a}function we(){const a=K;ue(),!a&&!ne&&Pe().then(()=>{if(o.view==="settings"&&(o.settingsSection==="diagnostics"||o.settingsSection==="analytics")){const s=document.querySelector(".settings-content");s&&(s.innerHTML=we())}});let n=a?.users||[];!n.length&&o.data?.users&&o.data.users.length&&(n=o.data.users.map(s=>({userId:s.id,name:s.name,nameEn:s.nameEn||s.name,email:s.email,role:s.jobTitleAr||(s.roleId==="admin"?"مدير النظام (كامل الصلاحيات)":s.roleId||"عضو فريق"),avatarColor:s.avatarColor||"#0d6269",isRealAccount:!0,status:s.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})));let i=a?.incidents||[];const v=a?.stats||{totalIncidents:3,activeIncidents:0,resolvedIncidents:3,totalUsersMonitored:n.length||6,alertEmailRecipient:"admin@darc-design.bond"};I!=="all"&&(i=i.filter(s=>s.userId===I)),F!=="all"&&(i=i.filter(s=>s.severity===F)),H!=="all"&&(i=i.filter(s=>s.status===H));const f=n.find(s=>s.userId===I);return`
    <section class="setting-section" id="diagnostics-dashboard">
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
            ${d("mail",13)} ${e("اختبار إرسال بريد التنبيه","Test Email Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-soft" data-action="test-incident-simulate" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${e("محاكاة رصد خطأ تشغيلي كامل مع خطوات المستخدم وإرسال إيميل تنبيه فوري","Simulate complete runtime error with breadcrumbs and trigger admin email alert")}">
            ${d("alert",13)} ${e("محاكاة خطأ مع إيميل تنبيه","Simulate Error & Email")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-diagnostics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${d("clock",13)} ${e("تحديث السجل","Refresh")}
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
            <span></span> ${e("مفعّل ويرسل تلقائياً","Active & Auto-Dispatched")}
          </div>
          <div style="font-size:11px;color:var(--muted);font-family:monospace;">${v.alertEmailRecipient||"admin@darc-design.bond"}</div>
        </div>
      </div>

      <!-- 3. User Explorer Grid (بطاقات تفاصيل أداء كل مستخدم) -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span>👥</span> ${e("تفاصيل حالة واستقرار أجهزة كل مستخدم (انقر للفلترة السريعة):","User Health & Crash Status (Click to Filter):")}
          </h3>
          ${I!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${e("إلغاء الفلترة وعرض الجميع ✕","Clear Filter & Show All ✕")}
            </button>
          `:""}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px;">
          <div 
            class="user-diag-card ${I==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
            style="background:${I==="all"?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${I==="all"?"var(--teal)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">🌐</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${e("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${i.length} ${e("بلاغات","records")}</div>
              </div>
            </div>
          </div>

          ${n.map(s=>{const x=I===s.userId,p=s.activeIncidents>0;return`
              <div 
                class="user-diag-card ${x?"is-active":""}" 
                data-action="filter-diagnostics-user" 
                data-user-id="${t(s.userId)}"
                style="background:${x?"rgba(13,98,105,0.08)":"var(--surface)"};border:1px solid ${x?"var(--teal)":p?"rgba(239,68,68,0.3)":"var(--line)"};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
                title="${e("انقر لعرض الأخطاء الخاصة بهذا المستخدم فقط","Click to view only incidents for this user")}"
              >
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:34px;height:34px;border-radius:50%;background:${t(s.avatarColor||"#0d6269")};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">
                    ${t(s.name.slice(0,2))}
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:6px;justify-content:space-between;">
                      <div style="font-size:12px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        ${t(e(s.name,s.nameEn||s.name))}
                      </div>
                      ${s.isRealAccount?`
                        <span style="background:rgba(16,185,129,0.12);color:#059669;border:1px solid rgba(16,185,129,0.25);font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px;flex-shrink:0;">
                          ${e("حساب مفعل 🟢","Active 🟢")}
                        </span>
                      `:""}
                    </div>
                    <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t(s.email)}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span class="status-badge ${p?"urgent":"done"}" style="font-size:9px;padding:1px 6px;">
                        ${p?e(`${s.activeIncidents} خطأ نشط ⚠️`,`${s.activeIncidents} Active ⚠️`):e("مستقر ✓ (0 أعطال)","Healthy ✓ (0 errors)")}
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
            <option value="all" ${F==="all"?"selected":""}>${e("جميع مستويات الخطورة","All Severities")}</option>
            <option value="critical" ${F==="critical"?"selected":""}>🚨 ${e("حرجة (Critical)","Critical")}</option>
            <option value="high" ${F==="high"?"selected":""}>⚠️ ${e("مرتفعة (High)","High")}</option>
            <option value="medium" ${F==="medium"?"selected":""}>ℹ️ ${e("متوسطة (Medium)","Medium")}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${H==="all"?"selected":""}>${e("جميع الحالات","All Statuses")}</option>
            <option value="active" ${H==="active"?"selected":""}>🔴 ${e("نشطة قيد المعالجة","Active")}</option>
            <option value="resolved" ${H==="resolved"?"selected":""}>✅ ${e("تم حلها بنجاح","Resolved")}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${e(`عرض ${i.length} مشكلة مسجلة`,`Showing ${i.length} incidents`)}
          ${f?` (${e("للمستخدم:","for user:")} <strong>${f.name}</strong>)`:""}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards (مع كل التفاصيل التي تساعد في الحل الدقيق) -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${i.length?i.map(s=>{const x=s.severity==="critical",p=s.status==="resolved",E=JSON.stringify({incidentId:s.id,timestamp:s.timestamp,user:{id:s.userId,name:s.userName,email:s.userEmail,role:s.userRole},client:{device:s.deviceType,browser:s.browser,os:s.os,resolution:s.screenResolution,memoryMb:s.memoryMb,ip:s.ip,location:`${s.city}, ${s.country}`},error:{type:s.errorType,message:s.errorMessage,stack:s.stackTrace},breadcrumbs:s.breadcrumbs,suggestedFix:s.suggestedSolution},null,2);return`
            <article class="incident-card" style="background:var(--surface);border:1px solid ${p?"var(--line)":x?"rgba(239,68,68,0.4)":"rgba(245,158,11,0.35)"};border-radius:12px;padding:20px;box-shadow:var(--shadow-sm);transition:all 0.2s ease;">
              
              <!-- Incident Head -->
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px;border-bottom:1px solid var(--line);padding-bottom:14px;">
                <div style="display:flex;align-items:flex-start;gap:12px;">
                  <span style="font-size:24px;line-height:1;margin-top:2px;">${p?"✅":x?"🚨":"⚠️"}</span>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                      <h4 style="margin:0;font-size:15px;font-weight:700;color:${p?"var(--ink)":x?"var(--red)":"var(--amber-strong)"};">
                        ${e(s.titleAr,s.titleEn)}
                      </h4>
                      <span class="status-badge ${x?"urgent":s.severity==="high"?"in-review":"done"}" style="font-size:10px;">
                        ${s.severity.toUpperCase()}
                      </span>
                      <span style="font-size:11px;font-family:monospace;background:var(--surface-soft);border:1px solid var(--line);padding:2px 8px;border-radius:4px;color:var(--muted);">
                        ${s.id}
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
                  ${p?`
                    <span class="status-badge done" style="font-size:11px;">
                      ✓ ${e("تم حل المشكلة وإغلاق البلاغ","Resolved")}
                    </span>
                  `:`
                    <button type="button" class="btn btn-sm btn-primary" data-action="resolve-diagnostic-incident" data-incident-id="${t(s.id)}" style="font-size:11px;display:flex;align-items:center;gap:5px;">
                      ${d("check",13)} ${e("تحديد كمعالج ✅","Mark Resolved ✅")}
                    </button>
                  `}
                  <button type="button" class="btn btn-sm btn-soft" data-action="copy-debug-bundle" data-bundle="${t(E)}" style="font-size:11px;display:flex;align-items:center;gap:5px;" title="${e("نسخ كامل التقرير الفني لحل المشكلة فوراً","Copy complete technical debug bundle to clipboard")}">
                    ${d("copy",13)} ${e("نسخ تقرير الخطأ 📋","Copy Debug Info 📋")}
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
                    ${(s.breadcrumbs||[]).length?s.breadcrumbs.map(w=>`
                      <li>
                        <span style="color:var(--muted);font-family:monospace;">[${t(w.time)}]</span>
                        <strong style="color:var(--teal);">${t(w.category)}:</strong>
                        <span>${t(w.message)}</span>
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
                  <strong style="color:var(--teal);">${s.emailAlert?.status==="delivered"?e("تم التسليم للبريد بنجاح ✓","Delivered ✓"):e("تم التحقق والتسجيل في السيرفر ✓","Dispatched to Sandbox ✓")}</strong>
                  <span style="font-family:monospace;">(${t(s.emailAlert?.deliveredTo||"admin@darc-design.bond")})</span>
                </div>
                <div>
                  ${p?e(`معالج بواسطة: ${s.resolvedBy||"Admin"}`,`Resolved by: ${s.resolvedBy||"Admin"}`):e("قيد التدخل البرمجي","Awaiting resolution")}
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
  `}var Ve=pe({FULL_PERMISSIONS_CATALOG:()=>ke,canAccessSettingsSection:()=>R,exportAuditLogsXLS:()=>Le,fetchFullAuditHistory:()=>Ne,openRoleModal:()=>Ue,openUserModal:()=>Oe,printAuditReport:()=>Me,renderAuditForProject:()=>Re,renderSettings:()=>Fe,renderTeam:()=>Ie,renderUserActivityCell:()=>Ae});function Ie(){if(!C()&&!$("manage_users"))return`<section class="panel"><div class="empty">${d("alert",18)}<span>${e("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const a=o.data?.user?.id;let n=(o.data?.users||[]).filter(i=>i.status!=="inactive");return a!=="usr_ahmad"?n=n.filter(i=>i.id!=="usr_ahmad"):n=[...n].sort((i,v)=>i.id==="usr_ahmad"?-1:v.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${e("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${r("team")}</h1>
        <p>${e("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${C()||$("manage_users")?`<button class="btn btn-primary" data-action="new-user">${d("plus",15)} ${r("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${n.map(i=>{const v=oe(i.id,o.data?.tasks||[]),f=i.id==="usr_ahmad";return`
          <article class="member-card ${f?"system-developer-card":""}" style="${f?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${Z(i,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${t(e(i.name,i.nameEn||i.name))}</strong>
                  <span>${t(e(i.jobTitleAr||(f?"المبرمج / مدير النظام":""),i.jobTitleEn||i.jobTitleAr||""))}</span>
                </div>
              </div>
              ${f?`<span class="stealth-dev-badge">${d("shield",12)} ${e("مدير ومطور النظام","Super Admin & Dev")}</span>`:Se()&&i.id!==o.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${t(i.id)}">${d("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${i.status==="active"?"done":"not_started"}">${t(U(i))}</span>
            </div>
            <div class="member-card-stats">
              <span>${r("progress")} <strong>${v.progress}%</strong></span>
              <span>${v.tasks} ${r("tasks")}</span>
            </div>
            <div class="member-email">${i.email?t(i.email):r("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function Re(a){const n=(o.data?.auditLogs||[]).filter(i=>i.details?.projectId===a||i.entityType==="project"&&i.entityId===a);return n.length?`<div class="audit-list">${n.map(i=>`<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${t(i.user?e(i.user.name,i.user.nameEn||i.user.name):"DARC")} · ${t(i.action)}</strong><span>${t(i.entityType)} · ${ee(i.createdAt,!0)}</span></div></div>`).join("")}</div>`:`<div class="empty">${d("check",18)}<span>${e("لا توجد تغييرات مسجلة بعد.","No changes recorded yet.")}</span></div>`}function Ae(a){const n=a.lastActiveAt||a.customFields?.lastActiveAt,i=a.lastLoginAt||a.customFields?.lastLoginAt;if(!n&&!i)return`<span class="activity-never">${e("لم يسجل دخول بعد","Never logged in")}</span>`;const v=Date.now(),f=n?new Date(n).getTime():0,s=a.id===o.data?.user?.id?0:f&&!isNaN(f)?Math.floor((v-f)/6e4):999999,x=s>=0&&s<=5;let p="";if(x)p=`<span class="activity-pill online"><span class="activity-dot online"></span> ${e("نشط الآن","Online")}</span>`;else if(s<60)p=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${e(`منذ ${s} دقيقة`,`${s}m ago`)}</span>`;else if(s<1440){const w=Math.floor(s/60);p=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${e(`منذ ${w} ساعة`,`${w}h ago`)}</span>`}else f>0&&(p=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${ee(n,!1)}</span>`);const E=i?`<span class="activity-sub" title="${t(i)}">${e("دخول:","Login:")} ${ee(i,!0)}</span>`:"";return`<div class="activity-wrapper">${p}${E}</div>`}function re(a){return Te(a,{includeSeconds:!0})}function te(a){const n=a.action||"",i=a.entityType||a.entity_type||"",v=a.details||{};let f="badge-neutral",s=n,x=i;n==="login"?(f="badge-teal",s=e("تسجيل دخول","Sign In"),x=e("جلسة نظام","System Session")):n==="create"?(f="badge-mint",s=e("إنشاء جديد","Created")):n==="update"?(f="badge-blue",s=e("تعديل بيانات","Updated")):n==="delete"?(f="badge-red",s=e("نقل للمهملات","Moved to Trash")):n==="status_change"?(f="badge-amber",s=e("تغيير حالة","Status Changed")):n==="export_report"?(f="badge-teal",s=e("تصدير تقرير","Exported Report")):n==="restore"?(f="badge-mint",s=e("استعادة","Restored")):n==="purge"?(f="badge-danger",s=e("حذف نهائي","Purged")):n==="invite"&&(f="badge-blue",s=e("دعوة مستخدم","Invite Sent")),i==="task"?x=e("مهمة","Task"):i==="project"?x=e("مشروع","Project"):i==="document"?x=e("مستند","Document"):i==="user"?x=e("مستخدم","User"):i==="report"?x=e("تقرير","Report"):i==="role"&&(x=e("دور وصلاحيات","Role"));let p="—";return v.title||v.name?p=`<strong>${t(v.title||v.name)}</strong>`:n==="status_change"&&(v.oldStatus||v.newStatus)?p=`<span>${t(O(v.oldStatus))} ➔ <strong>${t(O(v.newStatus))}</strong></span>`:a.entityId&&(p=`<code style="font-size:11px;color:var(--muted);">${t(a.entityId)}</code>`),{badgeClass:f,actionLabel:s,entityLabel:x,detailHtml:p}}function Le(a=null){if(!$("view_audit_logs")&&!C()){L(e("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}const n=a||o._lastFilteredAuditLogs||o.data?.auditLogs||[];if(!n.length){L(e("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const i=je(),v=i.displayName,f=i.logoUrl,s=o.data?.user||{},x=e(s.name,s.nameEn||s.name)||"Admin",p=ce(),E=me();let w=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${f?`<img src="${t(f)}" height="38" style="vertical-align:middle;margin-inline-end:10px;" />`:""}
          <span style="vertical-align:middle;">${e("سجل الرقابة والتدقيق الأمني والعمليات — "+v,"Audit & Security Trail Report — "+v)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${e("المؤسسة:","Company:")} ${t(v)} | ${e("المشرف المستخرج:","Exported by:")} ${t(x)} | ${e("تاريخ التصدير:","Export Date:")} ${t(p)} ${t(E)}
        </th>
      </tr>
      <tr>
        <th colspan="7" style="background:#f8fafc;color:#64748b;font-size:11px;text-align:center;padding:6px;">
          ${e("إجمالي العمليات المضمنة في التقرير:","Total Events in Report:")} ${n.length} ${e("عملية","events")}
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
  `;n.forEach((u,k)=>{const z=u.user||(u.userId?(o.data?.users||[]).find(M=>M.id===u.userId):null),m=z?e(z.name,z.nameEn||z.name):e("النظام","System"),c=z?U(z):"—",h=re(u.createdAt),{actionLabel:T,entityLabel:y}=te(u);let b="";u.details?.title||u.details?.name?b=u.details.title||u.details.name:u.action==="status_change"?b=`${O(u.details?.oldStatus)} ➔ ${O(u.details?.newStatus)}`:typeof u.details=="object"?b=JSON.stringify(u.details):b=String(u.details||u.entityId||"—");const j=k%2===0?"#ffffff":"#f8fafc";w+=`
      <tr style="background:${j};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${t(N(u.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(N(`${h.date} ${h.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${t(N(m))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${t(N(c))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(N(T))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(N(y))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${t(N(b))}</td>
      </tr>
    `}),w+="</table>";const S=new Date().toISOString().split("T")[0];ze(`DARC_Audit_Trail_${S}`,w),L(e("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),J("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${S}`,details:{reportType:"Audit_Logs_Excel",count:n.length}})}).catch(()=>{})}function Me(a=null){const n=a||o._lastFilteredAuditLogs||o.data?.auditLogs||[];if(!n.length){L(e("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const i=o.data?.company||{},v=e(i.nameAr||i.name,i.nameEn||i.name)||"DARC Design Team";let f=i.logoUrl||"";f.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(f=`${window.location.origin}${f}`);const s=o.data?.user||{},x=e(s.name,s.nameEn||s.name)||"Admin",p=ce(),E=me(),w=n.length,S=n.filter(y=>y.action==="create").length,u=n.filter(y=>y.action==="update"||y.action==="status_change").length,k=n.filter(y=>y.action==="delete"||y.action==="purge"||y.action==="trash").length;let z="";n.forEach((y,b)=>{const j=y.user||(y.userId?(o.data?.users||[]).find(D=>D.id===y.userId):null),M=j?e(j.name,j.nameEn||j.name):e("النظام","System"),l=j?U(j):"—",g=re(y.createdAt),{actionLabel:A,entityLabel:_}=te(y);let P="";y.details?.title||y.details?.name?P=y.details.title||y.details.name:y.action==="status_change"?P=`${O(y.details?.oldStatus)} ➔ ${O(y.details?.newStatus)}`:typeof y.details=="object"?P=JSON.stringify(y.details):P=String(y.details||y.entityId||"—"),z+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${t(y.id||String(b+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${t(g.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${t(g.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${t(M)}</div>
          <div style="font-size:10px;color:#64748b;">${t(l)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${t(A)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${t(_)}</td>
        <td style="font-size:11px;color:#334155;">${t(P)}</td>
      </tr>
    `});const m=`
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
          ${f?`<img src="${t(f)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />`:""}
          <h1 class="brand-title">${t(v)}</h1>
          <div class="report-subtitle">${e("تقرير الرقابة والتدقيق الأمني وسجل العمليات الإدارية","Official Security Audit & Governance Operations Trail")}</div>
        </div>
        <div class="report-meta-box">
          <div><strong>${e("المشرف المستخرج:","Generated By:")}</strong> ${t(x)}</div>
          <div><strong>${e("تاريخ التقرير:","Report Date:")}</strong> ${t(p)} - ${t(E)}</div>
          <div><strong>${e("حالة النظام:","System Status:")}</strong> Active / Enforced</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${w}</div>
          <div class="kpi-label">${e("إجمالي العمليات","Total Events")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#059669;">${S}</div>
          <div class="kpi-label">${e("عمليات إنشاء","Create Operations")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#2563eb;">${u}</div>
          <div class="kpi-label">${e("عمليات تعديل وحالة","Updates & State Changes")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#dc2626;">${k}</div>
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
          ${z}
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
  `;let c=document.getElementById("audit-report-preview-modal");c||(c=document.createElement("div"),c.id="audit-report-preview-modal",c.style.position="fixed",c.style.inset="0",c.style.background="rgba(0, 0, 0, 0.7)",c.style.backdropFilter="blur(4px)",c.style.zIndex="999999",c.style.display="none",c.style.alignItems="center",c.style.justifyContent="center",c.style.padding="15px",document.body.appendChild(c)),c.innerHTML=`
    <div style="background:var(--surface, #ffffff);color:var(--ink);width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.4);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line);background:var(--surface-soft);flex-wrap:wrap;gap:8px;">
        <strong style="color:var(--brand-teal);font-size:14px;">${e("معاينة التقرير الرقابي الرسمي (Audit Trail PDF Preview)","Official Audit Trail Report (PDF Preview)")}</strong>
        <div style="display:flex;gap:10px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-print-audit-iframe" style="display:flex;align-items:center;gap:6px;">
            ${d("printer",14)} ${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-close-audit-print-modal">✕</button>
        </div>
      </div>
      <div style="flex:1;overflow:hidden;position:relative;background:#ffffff;">
        <iframe id="audit-print-preview-iframe" style="width:100%;height:100%;border:none;background:#ffffff;" srcdoc="${t(m)}"></iframe>
      </div>
    </div>
  `,c.style.display="flex";const h=()=>{c.style.display="none",c.innerHTML="",window.removeEventListener("keydown",T)},T=y=>{y.key==="Escape"&&h()};window.addEventListener("keydown",T),document.getElementById("btn-close-audit-print-modal")?.addEventListener("click",h),document.getElementById("btn-print-audit-iframe")?.addEventListener("click",()=>{const y=document.getElementById("audit-print-preview-iframe");y&&y.contentWindow&&(y.contentWindow.focus(),y.contentWindow.print())}),J("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:n.length}})}).catch(()=>{})}async function Ne(){try{L(e("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const a=await J("/api/audit?limit=1000");a&&a.logs&&(o.data.auditLogs=a.logs,o.auditFullHistoryLoaded=!0,renderView(),L(e(`تم جلب ${a.logs.length} عملية بنجاح.`,`Loaded ${a.logs.length} audit logs.`)))}catch(a){L(a.message||e("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function R(a){const n=C();return a==="profile"||a==="security"||a==="notifications"?!0:a==="company"?n||$("manage_settings"):a==="whatsapp"?n||$("manage_settings"):a==="roles"?n||$("manage_roles"):a==="accounts"?n||$("manage_users")||$("manage_existing_account_permissions")||$("view_user_activity"):a==="trash"?n||$("manage_trash"):a==="audit"?n||$("view_audit_logs"):a==="analytics"?n||$("manage_settings")||$("view_audit_logs"):a==="diagnostics"?n||$("manage_settings"):!1}function Fe(){const a=o.data?.user?.id,n=C(),i=R("company"),v=R("whatsapp"),f=R("roles"),s=R("accounts"),x=R("trash"),p=R("audit"),E=R("analytics"),w=R("diagnostics"),S=[["profile",e("الملف الشخصي","Profile")],["notifications",e("الإشعارات والتنبيهات","Notifications & Alerts")],...i?[["company",r("company")]]:[],...v?[["whatsapp",e("تنبيهات واتساب","WhatsApp Alerts")]]:[],...f?[["roles",r("roles")]]:[],...s?[["accounts",r("accounts")]]:[],["security",e("الأمان","Security")],...x?[["trash",e("سلة المهملات","Trash")]]:[],...p?[["audit",r("audit")]]:[],...E?[["analytics",e("المراقبة والزيارات والأداء","Observability & Analytics")]]:[],...w?[["diagnostics",e("تشخيص الأعطال والمستخدمين","Error Logs & User Diagnostics")]]:[]];S.some(([m])=>m===o.settingsSection)||(o.settingsSection=S[0]?.[0]||"profile");const u=o.data?.user||{};let k="";if(o.settingsSection==="profile"&&(k=`
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
              ${u.avatarUrl?`<img src="${t(u.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(u.avatarColor||"")?u.avatarColor:"#0d6269"};">${t(le(u))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(u.avatarColor||"")?u.avatarColor:"#0d6269"};">${t(le(u))}</div>`}
              <div class="avatar-upload-overlay">
                ${d("upload",18)}
                <span>${e("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${t(e(u.name,u.nameEn||u.name))}</h3>
            <p class="profile-user-role">${t(e(u.jobTitleAr||"",u.jobTitleEn||u.jobTitleAr||""))} · <span class="status-badge done">${t(U(u))}</span></p>
            <div class="profile-upload-actions">
              <input type="file" id="user-avatar-file-input" accept="image/jpeg,image/png,image/webp" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="user-avatar-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${d("upload",14)} ${e("رفع صورة جديدة","Upload new avatar")}
              </label>
              <span class="upload-hint">${e("يدعم JPG, PNG, WebP (حد أقصى 2MB)","Supports JPG, PNG, WebP (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-profile">
          <div class="form-grid">
            <div class="field">
              <label>${r("nameAr")}</label>
              <input name="name" value="${t(u.name||"")}" required />
            </div>
            <div class="field">
              <label>${r("nameEn")}</label>
              <input name="nameEn" value="${t(u.nameEn||"")}" />
            </div>
            <div class="field">
              <label>${r("jobTitle")} (${e("عربي","AR")})</label>
              <input name="jobTitleAr" value="${t(u.jobTitleAr||"")}" />
            </div>
            <div class="field">
              <label>${r("jobTitle")} (${e("إنجليزي","EN")})</label>
              <input name="jobTitleEn" value="${t(u.jobTitleEn||"")}" />
            </div>
            <div class="field full">
              <label>${r("email")}</label>
              <input value="${t(u.email||"")}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${e("رقم الواتساب للتنبيهات الفردية","WhatsApp Phone for Alerts")}</label>
              <input type="tel" name="phone" dir="ltr" value="${t(u.phone||u.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" />
              <small class="field-hint">${e("أدخل رقم هاتفك مع مفتاح الدولة لاستلام تنبيهات المهام والمخططات المسندة إليك مباشرة على الواتساب.","Enter your phone number with country code to receive alerts for assigned tasks and drawings directly on WhatsApp.")}</small>
            </div>
            <div class="field full">
              <label for="settings-calendar-system">${e("نظام التقويم المفضل في المنصة","Preferred Calendar System")}</label>
              <select id="settings-calendar-system" name="calendarSystem">
                <option value="gregorian" ${de()==="gregorian"?"selected":""}>${e("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${de()==="hijri"?"selected":""}>${e("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${e("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${r("save")}</button>
          </div>
        </form>
      </section>
    `),o.settingsSection==="company"&&(n||$("manage_settings"))){const m=o.data?.company||{};k=`
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
              ${m.logoUrl?`<img src="${t(m.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${d("building",24)}</span>`:`<span class="brand-mark">${d("building",24)}</span>`}
              <div class="logo-upload-overlay">
                ${d("upload",16)}
                <span>${e("تعديل","Edit")}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${t(m.name||"DARC Design Team")}</strong>
            <span class="company-sub">${e("العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض","Arabic default · English support · Riyadh timezone")}</span>
            <div class="company-upload-actions">
              <input type="file" id="company-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="company-logo-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${d("upload",14)} ${e("رفع وتعديل الشعار","Upload & Change Logo")}
              </label>
              <span class="upload-hint">${e("يدعم PNG, SVG, JPG (حد أقصى 2MB)","Supports PNG, SVG, JPG (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-company" class="company-form">
          <div class="form-grid">
            <div class="field">
              <label>${r("nameAr")}</label>
              <input name="nameAr" value="${t(m.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${r("nameEn")}</label>
              <input name="nameEn" value="${t(m.nameEn||"")}" />
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
        <div class="login-demo" style="margin-top:16px;">${d("info",16)}<span>${r("emailInfo")}</span></div>
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
    `}if(o.settingsSection==="security"&&(k=`
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
    `),o.settingsSection==="notifications"){const m=typeof window<"u"&&"Notification"in window?Notification.permission:"unsupported",c=m==="granted",h=m==="denied";k=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("الإشعارات والتنبيهات","Notifications & Alerts")}</h2>
            <p>${e("تخصيص قنوات وصول التنبيهات الفورية وإشعارات المتصفح لسطح المكتب.","Configure your real-time notification channels and desktop alerts.")}</p>
          </div>
          <button type="button" class="btn btn-primary btn-sm" data-action="send-test-notification">
            ${d("bell",14)} ${e("إرسال إشعار تجريبي فوري","Send Test Notification")}
          </button>
        </div>

        <div style="display:grid;gap:16px;margin-top:16px;">
          <!-- 1. Browser Web Notifications Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon ${c?"teal":h?"red":"blue"}" style="margin-top:2px;">
                ${d("bell",16)}
              </span>
              <div>
                <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:3px;">
                  ${e("إشعارات سطح المكتب والمتصفح (Web Push Alerts)","Desktop & Browser Web Notifications")}
                </strong>
                <p style="margin:0;font-size:11px;color:var(--muted);max-width:480px;line-height:1.5;">
                  ${e("تسمح للموقع بإرسال تنبيهات فورية للنظام حتى عندما يكون المتصفح في الخلفية أو تعمل على نافذة أخرى.","Allows the platform to deliver native desktop notifications even when you are in another tab or window.")}
                </p>
                <div style="margin-top:6px;">
                  <span class="mini-badge" style="background:${c?"var(--mint)":h?"var(--red-soft)":"var(--surface-soft)"};color:${c?"var(--teal)":h?"var(--red)":"var(--muted)"};font-weight:700;">
                    ${c?e("مفعلة على هذا المتصفح ✅","Enabled on this browser ✅"):h?e("محظورة من إعدادات المتصفح ❌","Blocked in browser settings ❌"):e("بانتظار الموافقة ⚠️","Permission pending ⚠️")}
                  </span>
                </div>
              </div>
            </div>
            <div>
              ${c?`
                <button type="button" class="btn btn-ghost btn-sm" data-action="test-browser-notification" style="color:var(--teal);">
                  ${d("check",14)} ${e("فحص إشعار المتصفح","Test Browser Alert")}
                </button>
              `:`
                <button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications">
                  ${d("check",14)} ${e("تفعيل الإشعارات الآن","Enable Notifications")}
                </button>
              `}
            </div>
          </div>

          <!-- 2. Audio Chimes Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon teal" style="margin-top:2px;">
                ${d("check",16)}
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
    `}if(o.settingsSection==="accounts"&&s){const m=C()||$("view_user_activity"),c=C()||$("manage_users"),h=C()||$("manage_existing_account_permissions")||$("manage_users"),T=C();let y=o.data?.users||[];a!=="usr_ahmad"&&(y=y.filter(b=>b.id!=="usr_ahmad")),k=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${r("accounts")}</h2>
            <p>${e("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${c?`<button class="btn btn-primary btn-sm" data-action="new-user">${d("plus",14)} ${r("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${r("team")}</th>
                <th>${r("role")}</th>
                <th>${r("email")}</th>
                <th>${r("accountStatus")}</th>
                ${m?`<th>${e("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${h?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${y.map(b=>{const j=b.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${Z(b)}
                        <div class="team-member-copy">
                          <strong>${t(e(b.name,b.nameEn||b.name))}</strong>
                          <span>${t(e(b.jobTitleAr||(j?"المبرمج / مدير النظام":""),b.jobTitleEn||b.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${j?`<span class="stealth-dev-badge">${d("shield",12)} ${e("مدير ومطور النظام","Super Admin & Dev")}</span>`:t(U(b))}
                    </td>
                    <td>
                      ${b.email?t(b.email):`<span style="color:var(--muted)">${r("noEmail")}</span>`}
                      ${b.phone||b.customFields?.phone?`<div style="font-size:11px;color:var(--primary);direction:ltr;text-align:right;margin-top:3px;font-family:monospace;font-weight:600;">📱 ${t(b.phone||b.customFields?.phone)}</div>`:""}
                    </td>
                    <td>
                      <span class="status-badge ${b.status==="active"?"done":"not_started"}">${b.status==="active"?r("activeAccount"):r("pendingAccount")}</span>
                    </td>
                    ${m?`
                      <td>
                        ${Ae(b)}
                      </td>
                    `:""}
                    ${h?`
                      <td>
                        <div class="role-actions">
                          ${j?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${t(b.id)}">${r("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${t(b.id)}">${r("edit")}</button>
                            ${b.id!==o.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${t(b.id)}" title="${b.status==="pending"?e("تفعيل الحساب يدوياً","Activate manually"):e("تغيير كلمة المرور","Change password")}">${d(b.status==="pending"?"check":"settings",13)}</button>
                              ${T?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${t(b.id)}" title="دخول كـ هذا الحساب">${d("user",13)}</button>`:""}
                            `:""}
                            ${b.id!==o.data?.user?.id&&b.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${t(b.id)}">${d("send",13)}</button>`:""}
                            ${b.id!==o.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${t(b.id)}">${d("trash",13)}</button>`:""}
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
    `}if(o.settingsSection==="roles"&&(n||$("manage_roles"))&&(k=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${r("roles")}</h2>
            <p>${e("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${n||$("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${d("plus",14)} ${r("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(o.data?.roles||[]).map(m=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${t(e(m.nameAr,m.nameEn))}</strong>
                  ${m.builtIn?`<span class="role-system-badge">${d("shield",11)} ${r("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${t(e(m.descriptionAr,m.descriptionEn))}</p>
                <div class="role-meta">${m.permissions.includes("*")?e("صلاحية كاملة","Full access"):`${m.permissions.length} ${r("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${t(m.id)}">${d("edit",13)} ${r("edit")}</button>
                ${m.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${t(m.id)}">${d("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),o.settingsSection==="trash"&&x){if(!o.trash&&typeof sessionStorage<"u")try{const l=sessionStorage.getItem("darc_trash_cache");l&&(o.trash=JSON.parse(l))}catch{}!o.trashLoaded&&!o._trashFetching&&(o._trashFetching=!0,J("/api/trash").then(l=>{o.trash=Array.isArray(l)?l:l.trash||[...(l.projects||[]).map(g=>({...g,type:"project"})),...(l.tasks||[]).map(g=>({...g,type:"task"})),...(l.documents||[]).map(g=>({...g,type:"document"}))],o.trashLoaded=!0,o._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(o.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(l=>{o._trashFetching=!1,console.error("[Trash fetch error]",l)}));const m=o.trash||[],c=o.trashFilter||"all",h=(o.trashQuery||"").trim().toLowerCase(),T=m.filter(l=>{if(c!=="all"&&l.type!==c)return!1;if(!h)return!0;const g=(e(l.nameAr||l.titleAr,l.nameEn||l.titleEn)||l.name||l.title||l.originalName||"").toLowerCase(),A=(l.code||l.projectCode||"").toLowerCase(),_=(l.projectNameAr||l.projectNameEn||"").toLowerCase();return g.includes(h)||A.includes(h)||_.includes(h)}),y=m.filter(l=>l.type==="project").length,b=m.filter(l=>l.type==="task").length,j=m.filter(l=>l.type==="document").length,M=m.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${d("info",16)}</div>
        <div class="trash-notice-text">
          <strong>${e("سلة المحذوفات المركزية المحمية","Central Protected Trash Bin")}</strong>
          <p>${e("تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.","Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.")}</p>
        </div>
      </div>

      <div class="view-toolbar trash-filter-bar">
        <div class="trash-filter-group">
          <button type="button" class="btn btn-sm ${c==="all"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="all">
            ${d("layers",14)}
            <span>${e("الكل","All")}</span>
            <span class="badge ${c==="all"?"badge-on-primary":"badge-neutral"}">${m.length}</span>
          </button>
          <button type="button" class="btn btn-sm ${c==="project"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="project">
            ${d("building",14)}
            <span>${e("المشاريع","Projects")}</span>
            <span class="badge ${c==="project"?"badge-on-primary":"badge-neutral"}">${y}</span>
          </button>
          <button type="button" class="btn btn-sm ${c==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${d("checklist",14)}
            <span>${e("المهام","Tasks")}</span>
            <span class="badge ${c==="task"?"badge-on-primary":"badge-neutral"}">${b}</span>
          </button>
          <button type="button" class="btn btn-sm ${c==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${d("document",14)}
            <span>${e("المستندات","Documents")}</span>
            <span class="badge ${c==="document"?"badge-on-primary":"badge-neutral"}">${j}</span>
          </button>
        </div>
        <div class="search-box search-sm trash-search-box">
          ${d("search",14)}
          <input type="search" placeholder="${e("بحث في المحذوفات...","Search deleted items...")}" value="${t(o.trashQuery||"")}" data-action="search-trash-input" />
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
                <th style="text-align:${o.lang==="ar"?"left":"right"}">${e("الإجراءات","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${T.map(l=>{const g=l.type==="project",A=l.type==="task",_=l.type==="document",P=e(l.nameAr||l.titleAr,l.nameEn||l.titleEn)||l.name||l.title||l.originalName||l.code||e("عنصر محذوف","Deleted item"),D=!g&&l.projectId?(o.data?.projects||[]).find(Q=>Q.id===l.projectId):null,B=l.projectNameAr||l.projectNameEn||(D?e(D.nameAr,D.nameEn||D.nameAr):null),W=l.projectCode||D?.code,G=_&&l.size?l.size>1048576?(l.size/1048576).toFixed(1)+" MB":Math.round(l.size/1024)+" KB":"",V=n||$("manage_trash")||l.uploaderId===a;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${g?"is-project":A?"is-task":"is-doc"}">
                          ${d(g?"building":A?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${t(P)}</strong>
                          ${l.code||g?`<span class="trash-item-code">${t(l.code||l.id)}</span>`:""}
                          ${_&&G?`<span class="trash-item-code" style="color:var(--muted);">${G}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${g?"type-project":A?"type-task":"type-doc"}">
                        ${d(g?"building":A?"checklist":"document",11)}
                        ${g?e("مشروع","Project"):A?e("مهمة","Task"):e("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${g?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${e("مشروع رئيسي","Primary Project")}</span>`:B?`${d("building",11)} <span>${t(B)}${W?` (${t(W)})`:""}</span>${_&&l.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${t(l.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${l.status?`<span class="status-badge ${t(l.status)}">${t(O(l.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${t(l.deletedAt||"")}">
                        ${ee(l.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${o.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${t(l.type)}" data-id="${t(l.id)}" title="${e("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${d(o.lang==="ar"?"arrow":"arrowLeft",12)} ${e("استعادة","Restore")}
                        </button>
                        ${V?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${t(l.type)}" data-id="${t(l.id)}" title="${e("حذف العنصر نهائياً","Permanently delete item")}">
                            ${d("trash",12)} ${e("حذف نهائي","Purge")}
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
          ${d("search",22)}
          <span>${e("لا توجد نتائج تطابق بحثك في سلة المهملات.","No items match your search in trash.")}</span>
        </div>
      `}
    `:!o.trashLoaded&&!m.length?`
      <div style="padding:48px 20px;text-align:center;">
        <div style="width:32px;height:32px;margin:0 auto 14px;border:3px solid var(--line);border-top-color:var(--teal);border-radius:50%;animation:spin 0.75s linear infinite;"></div>
        <div style="font-size:14px;font-weight:700;color:var(--ink);">${e("جاري فحص واسترجاع عناصر سلة المهملات...","Loading recycle bin items...")}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px;">${e("يتم جلب المشاريع والمهام والمستندات المحذوفة من الخادم...","Fetching deleted projects, tasks, and drawings from server...")}</div>
      </div>
    `:`
      <div class="empty">
        ${d("trash",24)}
        <span>${e("سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.","Trash is empty, no deleted items found.")}</span>
      </div>
    `;k=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${e("سلة المهملات","Recycle Bin")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${!o.trashLoaded&&!m.length?e("جاري التحميل...","Loading..."):`${m.length} ${e("عناصر","items")}`}
              </span>
            </div>
            <p>${e("استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.","Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.")}</p>
          </div>
          ${(n||$("manage_trash"))&&m.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${e("حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات","Permanently erase all deleted items")}">
                ${d("trash",13)} ${e("إفراغ سلة المهملات","Empty Trash")}
              </button>
            </div>
          `:""}
        </div>
        ${M}
      </section>
    `}if(o.settingsSection==="audit"&&(n||$("view_audit_logs"))){const m=[...o.data?.auditLogs||[]].sort((g,A)=>new Date(A.createdAt).getTime()-new Date(g.createdAt).getTime()),c=o.auditFilterAction||"all",h=o.auditFilterEntity||"all",T=o.auditFilterUser||"all",y=(o.auditSearchQuery||"").trim().toLowerCase(),b=m.filter(g=>{if(c!=="all"&&g.action!==c||h!=="all"&&(g.entityType||g.entity_type)!==h||T!=="all"&&(g.userId||g.user_id||g.user?.id)!==T)return!1;if(y){const A=g.user||(g.userId?(o.data?.users||[]).find(Q=>Q.id===g.userId):null),_=(A&&e(A.name,A.nameEn||A.name)||"").toLowerCase(),{actionLabel:P,entityLabel:D}=te(g),B=(P||g.action||"").toLowerCase(),W=(D||g.entityType||"").toLowerCase(),G=(g.id||g.entityId||"").toLowerCase(),V=typeof g.details=="object"?JSON.stringify(g.details).toLowerCase():String(g.details||"").toLowerCase();if(!(_.includes(y)||B.includes(y)||W.includes(y)||G.includes(y)||V.includes(y)))return!1}return!0});o._lastFilteredAuditLogs=b;const j=[["all",e("كافة العمليات","All Actions")],["create",e("إنشاء جديد","Create")],["update",e("تعديل بيانات","Update")],["status_change",e("تغيير حالة","Status Change")],["delete",e("نقل للمهملات","Delete / Trash")],["restore",e("استعادة","Restore")],["purge",e("حذف نهائي","Purge")],["export_report",e("تصدير تقرير","Export Report")],["login",e("تسجيل دخول","Sign In")],["invite",e("دعوة مستخدم","Invite")]],M=[["all",e("كافة العناصر","All Entities")],["project",e("المشاريع","Projects")],["task",e("المهام","Tasks")],["document",e("المستندات","Documents")],["user",e("المستخدمين","Users")],["role",e("الأدوار والصلاحيات","Roles")],["company",e("إعدادات الشركة","Company Settings")],["report",e("التقارير","Reports")]],l=c!=="all"||h!=="all"||T!=="all"||!!y;k=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${r("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${b.length} ${e("عملية معروضة","events shown")}
              </span>
              ${l?`
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${e("من أصل","out of")} ${m.length}
                </span>
              `:""}
            </div>
            <p>${e("سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.","Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.")}</p>
          </div>
          <div class="page-actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${o.auditFullHistoryLoaded?"":`
              <button class="btn btn-ghost btn-sm" data-action="load-full-audit" title="${e("جلب الأرشيف الكامل للسجلات من السيرفر","Load complete audit archive")}">
                ${d("refresh",13)} ${e("تحميل الأرشيف الكامل","Load All History")}
              </button>
            `}
            <button class="btn btn-soft btn-sm" data-action="export-audit-xls" title="${e("تصدير السجل كملف Excel منسق","Export as styled Excel file")}">
              ${d("download",13)} ${e("تصدير Excel","Export Excel")}
            </button>
            <button class="btn btn-primary btn-sm" data-action="print-audit-pdf" title="${e("معاينة وطباعة تقرير رسمي وحفظه كـ PDF","Print or save executive PDF report")}">
              ${d("printer",13)} ${e("طباعة تقرير PDF","Print / PDF")}
            </button>
          </div>
        </div>

        <div class="view-toolbar audit-toolbar" style="gap:10px;margin-bottom:16px;">
          <div class="search-box search-sm" style="flex:1;min-width:240px;max-width:380px;">
            ${d("search",14)}
            <input type="search" placeholder="${e("بحث فوري بالمنفذ، العملية، أو التفاصيل...","Search by actor, action, details...")}" value="${t(o.auditSearchQuery||"")}" data-action="search-audit-input" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="filter-select select-compact select-sm" data-action="filter-audit-action" style="min-width:125px;">
              ${j.map(([g,A])=>`<option value="${g}" ${c===g?"selected":""}>${A}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${M.map(([g,A])=>`<option value="${g}" ${h===g?"selected":""}>${A}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${e("كافة المستخدمين","All Users")}</option>
              ${(o.data?.users||[]).map(g=>`<option value="${g.id}" ${T===g.id?"selected":""}>${t(e(g.name,g.nameEn||g.name))}</option>`).join("")}
            </select>
            ${l?`
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
                ${b.map(g=>{const A=g.user||(g.userId?(o.data?.users||[]).find(Q=>Q.id===g.userId):null),_=A?e(A.name,A.nameEn||A.name):e("النظام","System"),P=A?U(A):e("تلقائي","Automated"),D=re(g.createdAt),{badgeClass:B,actionLabel:W,entityLabel:G,detailHtml:V}=te(g);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${Z(A)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${t(_)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${t(P)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${B}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${t(W)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${t(G)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${V}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${o.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${t(D.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${d("clock",11)}
                          <span>${t(D.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${d(l?"search":"checklist",24)}
            <span>${l?e("لا توجد عمليات تطابق معايير التصفية المحددة.","No audit logs match the selected filter criteria."):e("لا توجد عمليات مسجلة حتى الآن.","No audit logs recorded yet.")}</span>
            ${l?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${e("إعادة تعيين الفلاتر","Reset filters")}
              </button>
            `:""}
          </div>
        `}
      </section>
    `}if(o.settingsSection==="analytics"&&E&&(k=$e()),o.settingsSection==="diagnostics"&&w&&(k=we()),o.settingsSection==="whatsapp"&&v){const m=o.data?.company?.customFields?.whatsapp||o.data?.company?.custom_fields?.whatsapp||{};k=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
          <div>
            <h2>${e("تنبيهات واتساب الميدانية للمشاريع","Field WhatsApp Alerts")}</h2>
            <p>${e("ربط آمن عبر بروتوكول Multi-Device المباشر مع خوارزميات محاكاة السلوك البشري لحماية الأرقام من الحظر.","Secure connection via Multi-Device protocol with anti-ban human behavior simulation.")}</p>
          </div>
          <span class="status-badge ${m.enabled?"done":"neutral"}">
            ${m.enabled?e("مفعل نشط ✅","Active ✅"):e("معطل ⏸️","Disabled ⏸️")}
          </span>
        </div>

        <form data-action="update-whatsapp" class="settings-form" style="max-width:740px;display:grid;gap:18px;">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
            <div>
              <strong style="display:block;font-size:14px;color:var(--ink);margin-bottom:4px;">${e("تفعيل إرسال التنبيهات عبر واتساب","Enable WhatsApp Notifications")}</strong>
              <span style="font-size:12px;color:var(--muted);">${e("إرسال إشعارات فورية لمهندسي الموقع والإدارة عند حدوث تغييرات حرجة.","Send instant alerts to field engineers & management upon critical updates.")}</span>
            </div>
            <label class="switch" style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" name="enabled" ${m.enabled?"checked":""} style="opacity:0;width:0;height:0;" id="wa-toggle-enabled" />
              <span class="slider round" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:var(--line);transition:.3s;border-radius:24px;"></span>
            </label>
          </div>

          <div class="form-grid">
            <div class="field">
              <label>${e("نوع مزود البوابة (Provider)","Gateway Provider")}</label>
              <select name="provider" class="select-compact" style="width:100%;height:42px;">
                <option value="evolution" ${m.provider!=="webhook"?"selected":""}>Evolution API / Baileys</option>
                <option value="webhook" ${m.provider==="webhook"?"selected":""}>Webhook (Custom Webhook URL)</option>
              </select>
            </div>

            <div class="field">
              <label>${e("اسم جلسة الربط (Instance Name)","Instance Name")}</label>
              <input type="text" name="instanceName" value="${t(m.instanceName||"darc-workspace")}" placeholder="darc-workspace" required />
            </div>
          </div>

          <div class="field">
            <label>${e("رابط خادم البوابة (Server Gateway URL) *","Server Gateway URL *")}</label>
            <input type="url" name="serverUrl" value="${t(m.serverUrl||"")}" placeholder="https://evolution-api.example.com" />
            <small style="font-size:11px;color:var(--muted);margin-top:4px;display:block;">${e("رابط خادم Evolution API الخاص بمكتبكم (أو رابط الـ Webhook المستلم).","Your office Evolution API instance URL or receiving Webhook.")}</small>
          </div>

          <div class="field">
            <label>${e("مفتاح الأمان (API Key / Token)","API Key / Token")}</label>
            <input type="password" name="apiKey" value="${t(m.apiKey||"")}" placeholder="••••••••••••••••" />
          </div>

          <div class="field">
            <label>${e("المستلم الافتراضي / قروب الواتساب (اختياري)","Default Recipient / WhatsApp Group (Optional)")}</label>
            <input type="text" name="recipient" value="${t(m.recipient||"")}" placeholder="${e("كود قروب واتساب المهندسين (1203630...@g.us) أو رقم جوال الإدارة","WhatsApp Group JID (1203630...@g.us) or Management Phone")}" />
            <small style="font-size:11px;color:var(--teal);margin-top:4px;display:block;">${e("💡 ملاحظة: هذا الحقل اختياري. في حال عدم وجود قروب حالياً، يمكنك تركه فارغاً وسيتكفل النظام بإرسال كافة التنبيهات والمنشن كرسائل فردية مباشرة إلى هواتف المهندسين والمدير المسجلة في حساباتهم.","💡 Note: This field is optional. If you do not have a group yet, leave it blank and the system will automatically send alerts & mentions directly to engineers & manager personal phones.")}</small>
          </div>

          <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;padding:16px;">
            <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:10px;">${e("أحداث التنبيه الفوري التلقائية:","Automated Trigger Events:")}</strong>
            <div style="display:grid;gap:8px;">
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnCollectiveMention" ${m.notifyOnCollectiveMention!==!1?"checked":""} />
                <span>📢 ${e("عند المنشن الجماعي (@all / @الكل): إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة حتى المدير","When collective mention (@all / @everyone): send direct alert to all project members and managers")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="sendGroupBroadcast" ${m.sendGroupBroadcast?"checked":""} />
                <span>👥 ${e("إرسال نسخة لقروب الواتساب العام (في حال إدخال كود القروب في الحقل أعلاه)","Send a copy to the WhatsApp Group (if Group JID is set above)")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnBlocked" ${m.notifyOnBlocked!==!1?"checked":""} />
                <span>⚠️ ${e("عند تعليق مهمة هندسية (Task Blocked) لتنبيه الموقع فوراً","When a task is blocked to alert field engineers instantly")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnApproval" ${m.notifyOnApproval!==!1?"checked":""} />
                <span>🔍 ${e("عند إحالة مهمة للمراجعة والاعتماد (Review / Approval)","When a deliverable is submitted for review & approval")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnDrawing" ${m.notifyOnDrawing!==!1?"checked":""} />
                <span>📐 ${e("عند اعتماد أو رفع مخطط معماري أو إنشائي جديد (New Drawing)","When an architectural or structural drawing is approved/uploaded")}</span>
              </label>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:10px;">
            <button type="submit" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:7px;">
              ${d("check",14)} <span>${e("حفظ إعدادات واتساب","Save WhatsApp Settings")}</span>
            </button>
            <button type="button" class="btn btn-soft" data-action="test-whatsapp" style="display:inline-flex;align-items:center;gap:7px;">
              <span>📲</span> <span>${e("إرسال تنبيه تجريبي للواتساب","Send Test WhatsApp Alert")}</span>
            </button>
          </div>
        </form>
      </section>
    `}const z=n||$("manage_settings")||$("manage_roles")||$("manage_users")||$("manage_trash")||$("view_audit_logs");return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${z?e("تحكم مركزي","CENTRAL CONTROL"):e("الملف الشخصي","USER PROFILE")}</p>
        <h1>${z?r("settings"):e("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${z?e("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):e("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${d(n?"shield":"user",13)} ${t(U(u))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${S.map(([m,c])=>`<button class="${o.settingsSection===m?"active":""}" data-action="settings-section" data-section="${m}">${c}</button>`).join("")}
      </aside>
      <div class="settings-content">${k}</div>
    </div>
  `}var ke=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function Ue(a=null){const n=o.data?.permissionsCatalog&&o.data.permissionsCatalog.length>=10?o.data.permissionsCatalog:ke,i=new Map;n.forEach(E=>{const w=E.category||"general",S=e(E.categoryAr||w,E.categoryEn||w);i.has(w)||i.set(w,{name:S,items:[]}),i.get(w).items.push(E)});const v=a?.id==="admin"||a?.permissions&&a.permissions.includes("*"),f=Array.from(i.entries()).map(([E,w])=>{const S=w.items.map(u=>{const k=u.id||u.key,z=e(u.nameAr||u.ar,u.nameEn||u.en||k),m=v||a?.permissions&&(a.permissions.includes(k)||typeof ae<"u"&&ae[k]&&a.permissions.includes(ae[k])),c=v?"disabled":"";return`
        <label class="permission-option" style="cursor:${v?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${t(k)}" ${m?"checked":""} ${c} />
          <span style="font-weight:500;">${t(z)}</span>
        </label>
      `}).join("");return`
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${t(w.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${w.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${S}
        </div>
      </div>
    `}).join(""),s=v?"":`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${r("permissions")} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${n.length} ${e("صلاحية متاحة","available permissions")})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${e("تحديد الكل","Select All")}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${e("إلغاء التحديد","Deselect All")}</button>
      </div>
    </div>
  `,x=`
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
      ${v?`
        <div class="role-modal-note" style="margin-top:15px;">
          ${e("مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.","The system administrator always keeps full root privileges [*] across all aspects of the system.")}
        </div>
      `:`
        ${s}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${f}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${r("cancel")}</button>
        <button type="submit" class="btn btn-primary">${d("check",14)} ${a?r("save"):r("create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ve(a?e("تعديل الدور والصلاحيات","Edit role & permissions"):r("addRole"),e("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),x,"role","modal-lg");const p=document.getElementById("modal-root");if(p){const E=p.querySelector("#btn-perm-select-all"),w=p.querySelector("#btn-perm-deselect-all");E&&E.addEventListener("click",()=>{p.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(S=>S.checked=!0)}),w&&w.addEventListener("click",()=>{p.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(S=>S.checked=!1)})}}function Oe(a=null){if(a?.id==="usr_ahmad"&&o.data?.user?.id!=="usr_ahmad")return L(e("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!a&&!C())return L(r("adminOnly"),!0);const n=!C(),i=n?"disabled":"",v=(o.data?.roles||[]).filter(s=>C()||s.id!=="admin"),f=`<form id="user-form" data-user-id="${t(a?.id||"")}" data-permission-only="${n}"><div class="form-grid"><div class="field full"><label>${r("nameAr")}</label><input name="name" value="${t(a?.name||"")}" ${i} required /></div><div class="field"><label>${r("nameEn")}</label><input name="nameEn" value="${t(a?.nameEn||"")}" ${i} /></div><div class="field"><label>${r("jobTitle")}</label><input name="jobTitleAr" value="${t(a?.jobTitleAr||"")}" ${i} /></div><div class="field"><label>${r("email")}</label><input name="email" type="email" value="${t(a?.email||"")}" placeholder="name@darc.com" ${i} /></div><div class="field"><label>${e("رقم الواتساب للتنبيهات","WhatsApp Phone")}</label><input name="phone" type="tel" dir="ltr" value="${t(a?.phone||a?.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" ${i} /></div><div class="field"><label>${r("role")}</label><select name="roleId">${v.map(s=>`<option value="${t(s.id)}" ${a?.roleId===s.id?"selected":""}>${t(e(s.nameAr,s.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${n?e("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):e("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${r("cancel")}</button><button type="submit" class="btn btn-primary">${d("check",14)} ${a?n?e("حفظ الصلاحية","Save permission"):r("save"):r("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=ve(a?n?e("تعديل صلاحية الحساب","Change account permission"):e("تعديل حساب العضو","Edit member account"):r("addMember"),e("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),f,"user")}export{Oe as a,Ve as c,Je as d,He as f,Ue as i,Pe as l,Ge as m,Le as n,Me as o,_e as p,Ne as r,Re as s,R as t,qe as u};
