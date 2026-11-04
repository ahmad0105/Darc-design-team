import{t as J}from"./rolldown-runtime-BQ-_32WO.js";import{A as ee,Ct as v,F as R,G as q,H as O,L as h,P as e,Q as C,R as F,V as B,W as I,X as n,dt as f,gt as x,j as z,ot as te,st as u,tt as M,ut as A}from"./core-realtime-B8eq5UKf.js";var ue=J({computeDisciplinesBreakdown:()=>K,computeTeamWorkload:()=>Q,exportDisciplinesExcel:()=>oe,exportDrawingsExcel:()=>pe,exportRisksExcel:()=>ce,exportTeamWorkloadExcel:()=>de,getDaysOverdue:()=>q,getDisciplineIcon:()=>U,getReportFilteredTasks:()=>_,renderReports:()=>ae});function U(l="",d=15){const t=String(l).toLowerCase();return t.includes("معمار")||t.includes("arch")?n("building",d):t.includes("كهرب")||t.includes("elect")?n("zap",d):t.includes("سباك")||t.includes("صحي")||t.includes("plumb")?n("droplet",d):t.includes("تكييف")||t.includes("hvac")||t.includes("ميكانيك")?n("thermometer",d):t.includes("إنشائ")||t.includes("انشائ")||t.includes("struct")?n("layers",d):t.includes("ديكور")||t.includes("داخل")||t.includes("interior")?n("armchair",d):t.includes("3d")||t.includes("رندر")||t.includes("visual")?n("palette",d):t.includes("كميات")||t.includes("boq")||t.includes("quantity")?n("chart",d):t.includes("حريق")||t.includes("fire")?n("flame",d):n("compass",d)}function _(l=[],d="all",t="all"){let i=d==="all"?l:l.filter(o=>o.projectId===d);const s=new Date;if(t==="month"){const o=new Date(s.getFullYear(),s.getMonth(),1);i=i.filter(r=>{const a=r.dueDate?new Date(r.dueDate):r.updatedAt?new Date(r.updatedAt):null;return a&&a>=o})}else if(t==="quarter"){const o=Math.floor(s.getMonth()/3)*3,r=new Date(s.getFullYear(),o,1);i=i.filter(a=>{const g=a.dueDate?new Date(a.dueDate):a.updatedAt?new Date(a.updatedAt):null;return g&&g>=r})}else t==="critical"&&(i=i.filter(o=>M(o)||o.priority==="urgent"||o.status==="blocked"));return i}function K(l=[]){const d=new Map;return l.forEach(t=>{const i=((v.lang==="ar"?t.categoryAr:t.categoryEn)||e(t.typeAr||"معماري",t.typeEn||"Architectural")).trim(),s=d.get(i)||{name:i,weight:0,progress:0,total:0,done:0,overdue:0},o=Number(t.weight||1);s.weight+=o,s.progress+=(t.progress||0)*o,s.total++,["done","completed"].includes(t.status)&&s.done++,M(t)&&s.overdue++,d.set(i,s)}),[...d.values()].map(t=>({...t,percentage:t.weight?Math.round(t.progress/t.weight):0})).sort((t,i)=>i.total-t.total)}function Q(l=[],d=[]){const t=new Map;return l.forEach(i=>{const s=new Set;i.assigneeId&&s.add(i.assigneeId),i.assignee_id&&s.add(i.assignee_id);const o=i.customFields?.additionalAssignees||i.customFields?.additional_assignees||i.custom_fields?.additionalAssignees||i.custom_fields?.additional_assignees;Array.isArray(o)&&o.forEach(r=>{r&&s.add(r)}),s.forEach(r=>{const a=t.get(r);a?a.push(i):t.set(r,[i])})}),d.filter(i=>i.status!=="inactive").map(i=>{const s=t.get(i.id)||[],o=s.filter(m=>["done","completed"].includes(m.status)).length,r=s.filter(m=>["in_progress","review","approval"].includes(m.status)).length,a=s.filter(M).length,g=s.reduce((m,D)=>m+Number(D.weight||1),0),p=s.reduce((m,D)=>m+(D.progress||0)*Number(D.weight||1),0),$=g?Math.round(p/g):0;let b="optimal",y=e("متزن","Optimal");return r===0&&s.length===0?(b="idle",y=e("متاح","Available")):r>7||a>=2?(b="critical",y=e("ضغط حرج","Critical Overload")):r>4&&(b="high",y=e("حمولة مرتفعة","High Load")),{user:i,total:s.length,done:o,active:r,overdue:a,progress:$,capacity:b,capacityLabel:y}}).sort((i,s)=>s.active-i.active||s.overdue-i.overdue)}function ae(){const{projects:l=[],tasks:d=[],users:t=[],documents:i=[]}=v.data||{},s=z("export_reports")||C(),o=v.reportProjectFilter||"all",r=v.reportTimeframe||"all",a=v.reportsTab||"overview",g=o==="all"?l:l.filter(c=>c.id===o),p=_(d,o,r),$=p.reduce((c,T)=>c+Number(T.weight||1),0),b=$?Math.round(p.reduce((c,T)=>c+(T.progress||0)*Number(T.weight||1),0)/$):0,y=p.filter(c=>["done","completed"].includes(c.status)).length,m=p.filter(c=>c.status==="in_progress").length,D=p.filter(c=>["review","approval"].includes(c.status)).length,S=p.filter(M),w=S.length,N=p.filter(c=>c.status==="blocked").length,j=g.filter(c=>c.health==="on_track").length,V=g.filter(c=>c.health==="at_risk").length,P=g.filter(c=>c.health==="off_track").length,W=g.filter(c=>c.lifecycle==="completed"||c.progress===100).length,L=p.length?Math.max(0,Math.min(100,Math.round((p.length-w)/p.length*100))):100,E=o==="all"?(i||[]).filter(c=>!c.deletedAt):(i||[]).filter(c=>c.projectId===o&&!c.deletedAt),H=E.filter(c=>c.status==="approved").length,k=K(p),G=Q(p,t),X=k[0]?.name||e("معماري","Architectural"),Z=[...g].sort((c,T)=>(T.progress||0)-(c.progress||0))[0],Y=[...g].filter(c=>c.lifecycle==="active").sort((c,T)=>(c.progress||0)-(T.progress||0))[0];return`
    <!-- Page Header with Actions -->
    <div class="page-head report-page-head">
      <div>
        <p class="eyebrow">${e("الرقابة والذكاء التنفيذي","EXECUTIVE INTELLIGENCE & AUDIT")}</p>
        <h1>${f("reports")}</h1>
        <p>${e("تحليلات شاملة للمحفظة الهندسية: الإنجاز الموزون، كفاءة الأقسام، ضغط الفريق، ومؤشرات المخاطر.","Comprehensive engineering portfolio readout: weighted progress, discipline efficiency, team capacity, and risk indicators.")}</p>
      </div>
      <div class="page-actions report-actions">
        ${s?`
          <div class="report-action-buttons">
            <button class="btn btn-primary btn-report-action" data-action="print-portfolio-pdf">
              ${n("printer",15)} <span>${e("تقرير المحفظة الرسمي (PDF)","Official Portfolio Report (PDF)")}</span>
            </button>
            <button class="btn btn-soft btn-report-action" data-action="export-csv">
              ${n("document",15)} <span>${e("تصدير بيانات Excel","Export Excel Data")}</span>
            </button>
          </div>
        `:""}
      </div>
    </div>

    <!-- Filter Toolbar & Horizon Selector -->
    <div class="view-toolbar report-toolbar" style="margin-bottom:16px;">
      <div class="view-toolbar-start report-toolbar-start" style="flex:1;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <!-- Project Scope Dropdown -->
        <div class="report-filter-item" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1 1 200px;">
          <span style="font-size:12px;color:var(--ink-soft);font-weight:600;white-space:nowrap;display:inline-flex;align-items:center;gap:4px;">
            ${n("building",13)} ${e("المشروع:","Project:")}
          </span>
          <select class="select-compact report-select" data-action="filter-report-project" style="width:100%;">
            <option value="all" ${o==="all"?"selected":""}>${e("— كافة مشاريع المحفظة —","— All Portfolio Projects —")}</option>
            ${l.map(c=>`
              <option value="${h(c.id)}" ${o===c.id?"selected":""}>
                ${h(c.code)} · ${h(e(c.nameAr,c.nameEn))}
              </option>
            `).join("")}
          </select>
        </div>

        <!-- Timeframe / Horizon Dropdown -->
        <div class="report-filter-item" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1 1 180px;">
          <span style="font-size:12px;color:var(--ink-soft);font-weight:600;white-space:nowrap;display:inline-flex;align-items:center;gap:4px;">
            ${n("calendar",13)} ${e("الفترة:","Period:")}
          </span>
          <select class="select-compact report-select" data-action="filter-report-timeframe" style="width:100%;">
            <option value="all" ${r==="all"?"selected":""}>${e("كافة الفترات والمراحل","All Milestones & Time")}</option>
            <option value="month" ${r==="month"?"selected":""}>${e("الشهر الحالي","Current Month")}</option>
            <option value="quarter" ${r==="quarter"?"selected":""}>${e("الربع السنوي الحالي (Q)","Current Quarter")}</option>
            <option value="critical" ${r==="critical"?"selected":""}>${e("المهام والمشاريع الحرجة فقط","Critical Focus Only")}</option>
          </select>
        </div>
      </div>

      <div class="view-toolbar-end report-toolbar-end">
        <span class="mini-badge report-badge-count" style="padding:6px 10px;font-size:11px;font-weight:700;color:var(--brand-teal);background:rgba(20,184,166,0.1);display:inline-flex;align-items:center;gap:4px;">
          ${n("target",12)} ${g.length} ${e("مشاريع مشمولة","projects analyzed")} · ${p.length} ${e("مهمة","tasks")}
        </span>
      </div>
    </div>

    <!-- Report Perspectives Navigation Tabs -->
    <div class="detail-tabs report-tabs" style="margin-bottom:20px;">
      <button class="detail-tab ${a==="overview"?"active":""}" data-action="report-tab" data-tab="overview">
        ${n("chart",15)} <span>${e("النظرة التنفيذية ومؤشرات الأداء","Executive KPI Overview")}</span>
      </button>
      <button class="detail-tab ${a==="disciplines"?"active":""}" data-action="report-tab" data-tab="disciplines">
        ${n("layers",15)} <span>${e("تحليل الأقسام والتخصصات","Disciplines & Deliverables")}</span>
      </button>
      <button class="detail-tab ${a==="team"?"active":""}" data-action="report-tab" data-tab="team">
        ${n("users",15)} <span>${e("أداء وحمولة فريق العمل","Team Workload & Capacity")}</span>
      </button>
      <button class="detail-tab ${a==="risks"?"active":""}" data-action="report-tab" data-tab="risks">
        ${n("alert",15)} <span>${e("مصفوفة المخاطر والانحراف","Risk & Delay Matrix")}</span>
        ${w>0?`<span class="badge badge-red" style="padding:1px 5px;font-size:10px;margin-inline-start:4px;">${w}</span>`:""}
      </button>
      <button class="detail-tab ${a==="drawings"?"active":""}" data-action="report-tab" data-tab="drawings">
        ${n("document",15)} <span>${e("المخططات والاعتمادات","Drawings & Submittals")}</span>
      </button>
    </div>

    <!-- Tab Content Body -->
    ${a==="overview"?se({filteredProjects:g,filteredTasks:p,totalWeight:$,weightedProgress:b,completedTasksCount:y,inProgressTasksCount:m,inReviewTasksCount:D,overdueTasksCount:w,blockedTasksCount:N,onTrackProjectsCount:j,atRiskProjectsCount:V,offTrackProjectsCount:P,completedProjectsCount:W,onTimeRate:L,approvedDocsCount:H,filteredDocs:E,disciplines:k,highestDiscipline:X,highestProject:Z,lowestProject:Y}):""}

    ${a==="disciplines"?re(k,p.length):""}
    ${a==="team"?ie(G,p.length):""}
    ${a==="risks"?ne(S,g,N):""}
    ${a==="drawings"?le(E,g):""}
  `}function se(l){const{filteredProjects:d,filteredTasks:t,weightedProgress:i,completedTasksCount:s,inProgressTasksCount:o,inReviewTasksCount:r,overdueTasksCount:a,blockedTasksCount:g,onTrackProjectsCount:p,atRiskProjectsCount:$,offTrackProjectsCount:b,completedProjectsCount:y,onTimeRate:m,approvedDocsCount:D,filteredDocs:S,disciplines:w,highestDiscipline:N,highestProject:j,lowestProject:V}=l,P=d.length||1,W=Math.round(p/P*100),L=Math.round($/P*100),E=Math.round(b/P*100),H=Math.round(y/P*100);return`
    <div style="display:flex;flex-direction:column;gap:20px;">
      <!-- 1. Executive KPIs Grid -->
      <div class="metrics-grid" style="margin-bottom:0;">
        <article class="metric-card teal">
          <div class="metric-top">
            <span class="metric-label">${e("الإنجاز الموزون العام","Weighted Portfolio Progress")}</span>
            <span class="metric-icon">${n("chart",16)}</span>
          </div>
          <div class="metric-value">${i}%</div>
          <span class="metric-note up" style="display:inline-flex;align-items:center;gap:4px;">${n("check",12)} ${s} ${e("مهام مكتملة","tasks done")} (${t.length} ${e("إجمالي","total")})</span>
        </article>

        <article class="metric-card blue">
          <div class="metric-top">
            <span class="metric-label">${e("معدل الالتزام الزمني","On-Time Schedule Adherence")}</span>
            <span class="metric-icon">${n("clock",16)}</span>
          </div>
          <div class="metric-value">${m}%</div>
          <span class="metric-note ${m>=80?"up":"alert"}">${m>=80?e("وتيرة تسليم مستقرة","Healthy delivery pace"):e("تراجع في وتيرة التسليم","Pace needs correction")}</span>
        </article>

        <article class="metric-card ${a>0?"red":"teal"}">
          <div class="metric-top">
            <span class="metric-label">${e("المهام المتأخرة والحرجة","Critical & Overdue Tasks")}</span>
            <span class="metric-icon">${n(a>0?"alert":"check",16)}</span>
          </div>
          <div class="metric-value">${a}</div>
          <span class="metric-note ${a>0?"alert":"up"}">${a>0?e("تتطلب تدخلاً ومتابعة","Immediate escalation needed"):e("لا يوجد تأخير حرج","Zero critical delays")}</span>
        </article>

        <article class="metric-card amber">
          <div class="metric-top">
            <span class="metric-label">${e("المخططات المعتمدة","Approved Deliverables")}</span>
            <span class="metric-icon">${n("document",16)}</span>
          </div>
          <div class="metric-value">${D}</div>
          <span class="metric-note" style="display:inline-flex;align-items:center;gap:4px;">${n("document",12)} ${S.length} ${e("ملف ومخطط مرفوع","total uploaded documents")}</span>
        </article>
      </div>

      <!-- 2. Smart Executive Summary & Highlights -->
      <section class="panel" style="background:linear-gradient(135deg, var(--surface) 0%, var(--surface-soft) 100%);padding:20px;border:1px solid var(--line);">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="report-kpi-icon-pill" style="width:36px;height:36px;border-radius:10px;background:var(--mint);color:var(--teal);display:grid;place-items:center;flex-shrink:0;">${n("sparkles",18)}</span>
            <div>
              <h3 style="margin:0;font-size:15px;color:var(--ink);">${e("الملخص التحليلي التنفيذي","Executive Operations & Health Summary")}</h3>
              <p style="margin:2px 0 0;font-size:12px;color:var(--ink-soft);">${e("قراءة ذكية لحركة المحفظة وجاهزية المخرجات ومكامن التباطؤ.","Automated synthesis of deliverable flow, velocity, and bottlenecks.")}</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="badge ${i>=70?"badge-teal":i>=40?"badge-amber":"badge-red"}" style="font-size:12px;font-weight:700;padding:4px 10px;display:inline-flex;align-items:center;gap:5px;">
              <span class="report-status-dot" style="width:7px;height:7px;border-radius:50%;background:currentColor;"></span>
              ${i>=70?e("حالة المحفظة: ممتازة","Status: Excellent"):i>=40?e("حالة المحفظة: تحتاج متابعة","Status: Needs Attention"):e("حالة المحفظة: حرجة","Status: Critical")}
            </span>
          </div>
        </div>

        <div style="margin-top:16px;display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 250px), 1fr));gap:14px;">
          <div style="background:var(--surface);padding:12px 14px;border-radius:10px;border:1px solid var(--line);">
            <span style="font-size:11px;color:var(--muted);font-weight:700;display:flex;align-items:center;gap:5px;margin-bottom:4px;">${n("trendingUp",12)} ${e("المشروع الأكثر تقدماً","Top Progressing Project")}</span>
            <strong style="font-size:13px;color:var(--ink);display:block;">${h(j?e(j.nameAr,j.nameEn):"—")}</strong>
            <span style="font-size:11px;color:var(--brand-teal);font-weight:bold;">${j?`${j.progress}% ${e("إنجاز","completed")}`:""}</span>
          </div>

          <div style="background:var(--surface);padding:12px 14px;border-radius:10px;border:1px solid var(--line);">
            <span style="font-size:11px;color:var(--muted);font-weight:700;display:flex;align-items:center;gap:5px;margin-bottom:4px;">${n("building",12)} ${e("التخصص الأكبر حجماً","Largest Active Discipline")}</span>
            <strong style="font-size:13px;color:var(--ink);display:block;">${h(N)}</strong>
            <span style="font-size:11px;color:var(--ink-soft);">${w[0]?`${w[0].total} ${e("مهمة ومخرج مسجل","deliverables registered")}`:""}</span>
          </div>

          <div style="background:var(--surface);padding:12px 14px;border-radius:10px;border:1px solid var(--line);">
            <span style="font-size:11px;color:var(--muted);font-weight:700;display:flex;align-items:center;gap:5px;margin-bottom:4px;">${n("alert",12)} ${e("أولويات تحتاج انتباهك","Critical Attention Need")}</span>
            <strong style="font-size:13px;color:${a>0?"var(--red)":"var(--teal)"};display:block;">
              ${a>0?`${a} ${e("مهام تجاوزت موعد التسليم","tasks overdue")}`:e("جميع المواعيد منتظمة ومستقرة","All schedules on track")}
            </strong>
            <span style="font-size:11px;color:var(--ink-soft);">${g>0?`${g} ${e("مهام بانتظار فك الحجب","blocked tasks")}`:e("لا توجد مهام محجوبة","Zero blockers")}</span>
          </div>
        </div>
      </section>

      <!-- 3. Portfolio Distribution & Discipline Breakdown Panels -->
      <div class="report-grid">
        <!-- Left: Disciplines Progress Bars -->
        <section class="panel">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">${e("الإنجاز الموزون حسب التخصص الهندسي","Progress by Engineering Discipline")}</h2>
              <p class="panel-subtitle">${e("نسبة الإنجاز الموزونة لكل تخصص ومخرجاته الهندسية.","Weighted completion for each engineering discipline.")}</p>
            </div>
            <span class="status-badge on_track">${i}%</span>
          </div>
          <div class="report-bars">
            ${w.length?w.map(k=>`
              <div class="report-bar-row">
                <span title="${h(k.name)}" style="display:flex;align-items:center;gap:6px;min-width:0;">
                  <span style="flex-shrink:0;">${U(k.name)}</span>
                  <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${h(k.name)}</span>
                </span>
                <div class="report-bar-track" title="${k.percentage}%">
                  <div class="report-bar-fill" style="width:${k.percentage}%;"></div>
                </div>
                <strong>${k.percentage}%</strong>
              </div>
            `).join(""):`<div class="empty">${f("noTasks")}</div>`}
          </div>
        </section>

        <!-- Right: Portfolio Health & Workload Pulse -->
        <div class="stack">
          <!-- Portfolio Health Distribution -->
          <section class="panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">${e("صحة وتوزيع المحفظة","Portfolio Health Breakdown")}</h2>
                <p class="panel-subtitle">${e("توزيع المشاريع حسب مسار التنفيذ والمخاطر.","Project health status breakdown.")}</p>
              </div>
              <span class="mini-badge" style="font-size:10px;">${d.length} ${e("مشاريع","projects")}</span>
            </div>

            <!-- Visual Multi-segment Distribution Bar -->
            <div style="margin:8px 0 16px;">
              <div style="display:flex;height:10px;border-radius:6px;overflow:hidden;background:var(--line);">
                <div style="width:${W}%;background:var(--mint-strong);" title="${e("على المسار","On Track")}: ${p}"></div>
                <div style="width:${L}%;background:var(--amber);" title="${e("يحتاج انتباه","At Risk")}: ${$}"></div>
                <div style="width:${E}%;background:var(--red);" title="${e("متأخر","Off Track")}: ${b}"></div>
                <div style="width:${H}%;background:var(--teal);" title="${e("مكتمل","Completed")}: ${y}"></div>
              </div>
            </div>

            <div class="report-stat-list">
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--mint-strong);"></span>
                  ${f("onTrack")}
                </span>
                <strong style="color:var(--mint-strong)">${p}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--amber);"></span>
                  ${f("atRisk")}
                </span>
                <strong style="color:var(--amber)">${$}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--red);"></span>
                  ${f("offTrack")}
                </span>
                <strong style="color:var(--red)">${b}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--teal);"></span>
                  ${f("completed")}
                </span>
                <strong style="color:var(--teal)">${y}</strong>
              </div>
            </div>
          </section>

          <!-- Task Workflow Phases Pulse -->
          <section class="panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">${e("مراحل دورة عمل المهام","Task Workflow Stages")}</h2>
                <p class="panel-subtitle">${e("توزيع المهام النشطة حسب الحالة التشغيلية.","Active task distribution by stage.")}</p>
              </div>
            </div>
            <div class="report-stat-list">
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:7px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--blue);flex-shrink:0;"></span>${e("قيد التنفيذ النشط","In Progress")}</span>
                <strong style="color:var(--blue)">${o}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:7px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--amber);flex-shrink:0;"></span>${e("قيد المراجعة والاعتماد","Under Review & Approval")}</span>
                <strong style="color:var(--amber)">${r}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:7px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--mint-strong);flex-shrink:0;"></span>${e("مهام مكتملة","Completed")}</span>
                <strong style="color:var(--mint-strong)">${s}</strong>
              </div>
              ${g>0?`
                <div class="report-stat">
                  <span style="display:flex;align-items:center;gap:7px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--red);flex-shrink:0;"></span>${e("مهام متوقفة / محجوبة","Blocked Tasks")}</span>
                  <strong style="color:var(--red)">${g}</strong>
                </div>
              `:""}
            </div>
          </section>
        </div>
      </div>
    </div>
  `}function re(l,d){return`
    <div class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">${e("التحليل التفصيلي للأقسام والتخصصات الهندسية","Engineering Disciplines & Deliverables Breakdown")}</h2>
          <p class="panel-subtitle">${e("إحصائيات الإنجاز والوزن التراكمي ومخرجات كل قسم تخصصي في المحفظة.","Detailed progress, weighted impact, and deliverable health for every discipline.")}</p>
        </div>
        <button class="btn btn-soft btn-sm" data-action="export-disciplines-excel">
          ${n("document",14)} ${e("تصدير التخصصات (Excel)","Export Disciplines (Excel)")}
        </button>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${e("التخصص الهندسي","Engineering Discipline")}</th>
              <th>${e("إجمالي المخرجات","Total Deliverables")}</th>
              <th>${e("المكتمل","Done")}</th>
              <th>${e("نسبة الإنجاز","Completion Rate")}</th>
              <th>${e("الوزن النسبي","Weight Share")}</th>
              <th>${e("الحالة","Discipline Health")}</th>
            </tr>
          </thead>
          <tbody>
            ${l.length?l.map(t=>{const i=d?Math.round(t.total/d*100):0,s=t.overdue===0&&t.percentage>=50,o=t.overdue>0;return`
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span class="discipline-icon-badge" style="width:32px;height:32px;border-radius:8px;background:var(--mint);color:var(--teal);display:grid;place-items:center;flex-shrink:0;">
                        ${U(t.name,16)}
                      </span>
                      <div>
                        <strong style="font-size:13px;color:var(--ink);display:block;">${h(t.name)}</strong>
                        <span style="font-size:11px;color:var(--muted);">${t.total} ${e("مخرج مسجل","deliverables")}</span>
                      </div>
                    </div>
                  </td>
                  <td style="font-weight:700;font-size:13px;">${t.total}</td>
                  <td style="color:var(--mint-strong);font-weight:700;">${t.done}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px;min-width:140px;">
                      <div style="flex:1;height:6px;background:var(--line);border-radius:3px;overflow:hidden;">
                        <div style="height:100%;width:${t.percentage}%;background:${t.percentage===100?"var(--mint-strong)":"var(--brand-teal)"};"></div>
                      </div>
                      <strong style="font-size:12px;">${t.percentage}%</strong>
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${i}%</td>
                  <td>
                    <span class="badge ${o?"badge-red":s?"badge-teal":"badge-amber"}" style="font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px;">
                      ${o?`${n("alert",12)} ${t.overdue} ${e("متأخرة","overdue")}`:s?`${n("check",12)} ${e("ممتاز","On Track")}`:`${n("clock",12)} ${e("جارٍ التنفيذ","Active")}`}
                    </span>
                  </td>
                </tr>
              `}).join(""):`
              <tr>
                <td colspan="6"><div class="empty">${f("noTasks")}</div></td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function ie(l,d){return`
    <div class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">${e("مصفوفة كفاءة وضغط فريق العمل","Team Capacity & Workload Matrix")}</h2>
          <p class="panel-subtitle">${e("توزيع المهام النشطة، المكتملة، والمتأخرة ومعدل الضغط لكل عضو في الفريق.","Active tasks, completion rate, and workload pressure indicator for each team member.")}</p>
        </div>
        <button class="btn btn-soft btn-sm" data-action="export-team-workload-excel">
          ${n("document",14)} ${e("تصدير حمولة الفريق (Excel)","Export Team Load (Excel)")}
        </button>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${e("عضو الفريق","Team Member")}</th>
              <th>${e("المسمى / الدور","Role")}</th>
              <th>${e("المهام النشطة","Active Load")}</th>
              <th>${e("المكتملة","Completed")}</th>
              <th>${e("المتأخرة","Overdue")}</th>
              <th>${e("نسبة الإنجاز","Progress %")}</th>
              <th>${e("مستوى الحمولة","Capacity Status")}</th>
            </tr>
          </thead>
          <tbody>
            ${l.length?l.map(t=>{const i=t.user,s=t.capacity==="idle"?`<span class="badge" style="background:var(--surface-soft);color:var(--ink-soft);border:1px solid var(--line);display:inline-flex;align-items:center;gap:5px;"><span class="report-status-dot" style="width:6px;height:6px;border-radius:50%;background:var(--mint-strong);"></span>${e("متاح للمهام","Available")}</span>`:t.capacity==="optimal"?`<span class="badge badge-teal" style="display:inline-flex;align-items:center;gap:5px;"><span class="report-status-dot" style="width:6px;height:6px;border-radius:50%;background:var(--teal);"></span>${e("حمولة متزنة","Balanced")}</span>`:t.capacity==="high"?`<span class="badge badge-amber" style="display:inline-flex;align-items:center;gap:5px;"><span class="report-status-dot" style="width:6px;height:6px;border-radius:50%;background:var(--amber);"></span>${e("حمولة مرتفعة","High Load")}</span>`:`<span class="badge badge-red" style="display:inline-flex;align-items:center;gap:5px;"><span class="report-status-dot" style="width:6px;height:6px;border-radius:50%;background:var(--red);"></span>${e("عبء حرج / تأخير","Overloaded")}</span>`;return`
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                      ${ee(i,"mini-avatar")}
                      <div>
                        <strong style="font-size:13px;color:var(--ink);display:block;">${h(e(i.name,i.nameEn||i.name))}</strong>
                        <span style="font-size:11px;color:var(--muted);">${h(i.email||"")}</span>
                      </div>
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${h(te(i))}</td>
                  <td style="font-weight:700;font-size:13px;color:var(--blue);">${t.active}</td>
                  <td style="font-weight:700;font-size:13px;color:var(--mint-strong);">${t.done}</td>
                  <td style="font-weight:700;font-size:13px;color:${t.overdue>0?"var(--red)":"var(--muted)"};">${t.overdue}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:6px;min-width:100px;">
                      <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;">
                        <div style="height:100%;width:${t.progress}%;background:var(--teal);"></div>
                      </div>
                      <span style="font-size:11px;font-weight:700;">${t.progress}%</span>
                    </div>
                  </td>
                  <td>${s}</td>
                </tr>
              `}).join(""):`
              <tr>
                <td colspan="7"><div class="empty">${e("لا يوجد أعضاء مسجلون","No members found")}</div></td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function ne(l,d,t){const i=d.filter(s=>s.health==="at_risk"||s.health==="off_track");return`
    <div style="display:flex;flex-direction:column;gap:20px;">
      <!-- Overdue Tasks Register -->
      <div class="panel">
        <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div>
            <h2 class="panel-title" style="color:var(--red);display:flex;align-items:center;gap:6px;">
              ${n("alert",16)} ${e("سجل المهام المتأخرة والحرجة","Overdue & Critical Tasks Register")} (${l.length})
            </h2>
            <p class="panel-subtitle">${e("قائمة بالمهام التي تجاوزت تاريخ التسليم المعتمد وتتطلب اتخاذ إجراء إداري فوري.","List of tasks past approved deadline requiring immediate managerial intervention.")}</p>
          </div>
          <button class="btn btn-soft btn-sm" data-action="export-risks-excel">
            ${n("document",14)} ${e("تصدير قائمة المخاطر (Excel)","Export Risks (Excel)")}
          </button>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${e("اسم المهمة / المخرج","Task / Deliverable")}</th>
                <th>${e("المشروع","Project")}</th>
                <th>${e("المسؤول / المكلف","Assignee")}</th>
                <th>${e("الأولوية","Priority")}</th>
                <th>${e("تاريخ الاستحقاق","Due Date")}</th>
                <th>${e("مدة التأخير","Days Overdue")}</th>
                <th style="text-align:end;">${e("الإجراء","Action")}</th>
              </tr>
            </thead>
            <tbody>
              ${l.length?l.map(s=>{const o=q(s.dueDate),r=(v.data?.projects||[]).find(g=>g.id===s.projectId),a=s.assignee?e(s.assignee.name,s.assignee.nameEn||s.assignee.name):"—";return`
                  <tr>
                    <td>
                      <strong style="display:block;font-size:13px;color:var(--ink);">${h(e(s.titleAr,s.titleEn))}</strong>
                      <span style="font-size:10.5px;color:var(--muted);">${h(s.templateId||e("مخرج مخصص","Custom Deliverable"))}</span>
                    </td>
                    <td>
                      <span class="badge badge-teal" style="font-size:10.5px;">${h(r?r.code:"—")}</span>
                      <span style="font-size:11px;color:var(--ink);margin-inline-start:4px;">${h(r?e(r.nameAr,r.nameEn):"—")}</span>
                    </td>
                    <td>${h(a)}</td>
                    <td>
                      <span class="badge ${s.priority==="urgent"?"badge-red":s.priority==="high"?"badge-amber":"badge-blue"}" style="font-size:10.5px;">
                        ${h(A(s.priority||"medium"))}
                      </span>
                    </td>
                    <td style="font-size:12px;color:var(--ink);">${R(s.dueDate,!0)}</td>
                    <td>
                      <span class="badge badge-red" style="font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:4px;">
                        ${n("clock",12)} ${o} ${e("يوم تأخير","days late")}
                      </span>
                    </td>
                    <td style="text-align:end;">
                      <button class="btn btn-soft btn-xs" data-action="open-task" data-task-id="${h(s.id)}">
                        ${n("edit",12)} ${e("متابعة","Review")}
                      </button>
                    </td>
                  </tr>
                `}).join(""):`
                <tr>
                  <td colspan="7">
                    <div class="empty" style="padding:28px 10px;">
                      <span style="width:44px;height:44px;border-radius:12px;background:var(--mint);color:var(--teal);display:grid;place-items:center;margin:0 auto 10px;">${n("check",22)}</span>
                      <strong style="color:var(--mint-strong);font-size:14px;margin-top:4px;">${e("ممتاز! لا توجد أي مهام متأخرة في المحفظة حالياً.","Excellent! Zero overdue tasks in portfolio.")}</strong>
                      <span style="font-size:11px;color:var(--muted);">${e("كافة مخرجات ومواعيد التسليم على المسار الصحيح.","All schedules and milestones are currently on track.")}</span>
                    </div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>

      <!-- At Risk Projects Overview -->
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${e("المشاريع ذات المخاطر والانحراف","Projects Requiring Escalation")} (${i.length})</h2>
            <p class="panel-subtitle">${e("مشاريع بحاجة لدعم إداري لتلافي تفاقم التأخير.","Projects needing attention to prevent deadline slippage.")}</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${e("رمز المشروع","Code")}</th>
                <th>${e("اسم المشروع","Project Name")}</th>
                <th>${e("العميل","Client")}</th>
                <th>${e("مدير المشروع","Manager")}</th>
                <th>${e("الحالة","Status")}</th>
                <th>${e("نسبة الإنجاز","Progress")}</th>
                <th>${e("تاريخ التسليم","Due Date")}</th>
                <th style="text-align:end;">${e("فتح المشروع","Open")}</th>
              </tr>
            </thead>
            <tbody>
              ${i.length?i.map(s=>`
                <tr>
                  <td><strong style="color:var(--brand-teal);">${h(s.code)}</strong></td>
                  <td><strong>${h(e(s.nameAr,s.nameEn))}</strong></td>
                  <td>${h(e(s.clientAr,s.clientEn))||"—"}</td>
                  <td>${h(s.manager?e(s.manager.name,s.manager.nameEn||s.manager.name):"—")}</td>
                  <td><span class="status-badge ${h(s.health)}">${h(A(s.health))}</span></td>
                  <td><strong>${s.progress||0}%</strong></td>
                  <td>${R(s.dueDate,!0)}</td>
                  <td style="text-align:end;">
                    <button class="btn btn-soft btn-xs" data-action="open-project" data-project-id="${h(s.id)}" style="display:inline-flex;align-items:center;gap:4px;">
                      <span>${e("عرض","View")}</span> ${n("chevron",12)}
                    </button>
                  </td>
                </tr>
              `).join(""):`
                <tr>
                  <td colspan="8"><div class="empty">${e("كافة المشاريع تسير على المسار المعتمد دون تعثر.","All projects are proceeding on track.")}</div></td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function le(l,d){const t=l.filter(r=>r.status==="approved"),i=l.filter(r=>r.status==="review"||r.status==="approval"),s=l.filter(r=>!r.status||r.status==="draft"),o=l.filter(r=>r.status==="superseded");return`
    <div style="display:flex;flex-direction:column;gap:20px;">
      <!-- Document Status Cards -->
      <div class="metrics-grid">
        <article class="metric-card teal">
          <div class="metric-top"><span class="metric-label">${e("مخططات معتمدة","Approved Drawings")}</span><span style="color:var(--teal);">${n("check",16)}</span></div>
          <div class="metric-value">${t.length}</div>
          <span class="metric-note up">${e("جاهزة للتنفيذ","Ready for construction")}</span>
        </article>
        <article class="metric-card amber">
          <div class="metric-top"><span class="metric-label">${e("قيد المراجعة الفنية","Under Review")}</span><span style="color:var(--amber);">${n("eye",16)}</span></div>
          <div class="metric-value">${i.length}</div>
          <span class="metric-note alert">${e("بانتظار موافقة المهندس","Awaiting engineer approval")}</span>
        </article>
        <article class="metric-card blue">
          <div class="metric-top"><span class="metric-label">${e("مسودات وتعديلات","Drafts / Revisions")}</span><span style="color:var(--blue);">${n("edit",16)}</span></div>
          <div class="metric-value">${s.length}</div>
          <span class="metric-note">${e("عمل جارٍ","Work in progress")}</span>
        </article>
        <article class="metric-card red">
          <div class="metric-top"><span class="metric-label">${e("مخططات ملغاة / مستبدلة","Superseded")}</span><span style="color:var(--red);">${n("archive",16)}</span></div>
          <div class="metric-value">${o.length}</div>
          <span class="metric-note">${e("إصدارات سابقة مؤرشفة","Archived previous revisions")}</span>
        </article>
      </div>

      <!-- Drawings Register Table -->
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${e("سجل المخططات والمستندات الهندسية (Drawings Register)","Drawings & Blueprints Submittals Register")} (${l.length})</h2>
            <p class="panel-subtitle">${e("قائمة المخططات الهندسية المعتمدة والمرفوعة مع الحجم، الحالة، وإمكانية المعاينة.","Registered engineering blueprints, upload status, revisions, and direct preview.")}</p>
          </div>
          <button class="btn btn-soft btn-sm" data-action="export-drawings-excel">
            ${n("document",14)} ${e("تصدير السجل (Excel)","Export Register (Excel)")}
          </button>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${e("اسم المخطط / الملف","File / Blueprint Name")}</th>
                <th>${e("المشروع","Project")}</th>
                <th>${e("الحالة","Status")}</th>
                <th>${e("الحجم","Size")}</th>
                <th>${e("تاريخ الرفع","Date")}</th>
                <th style="text-align:end;">${e("المعاينة والتحميل","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${l.length?l.map(r=>{const a=d.find(p=>p.id===r.projectId),g=r.size>1048576?(r.size/1048576).toFixed(1)+" MB":Math.round((r.size||0)/1024)+" KB";return`
                  <tr>
                    <td>
                      <div style="display:flex;align-items:center;gap:8px;cursor:pointer;" data-action="preview-doc" data-doc-id="${h(r.id)}">
                        <span style="color:var(--brand-teal);">${n("document",16)}</span>
                        <div>
                          <strong style="display:block;font-size:13px;color:var(--ink);">${h(r.originalName||r.name||"Drawing.pdf")}</strong>
                          <span style="font-size:10.5px;color:var(--muted);">${h(r.mimeType||"application/pdf")}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge badge-teal" style="font-size:10.5px;">${h(a?a.code:"—")}</span>
                      <span style="font-size:11px;color:var(--ink);margin-inline-start:4px;">${h(a?e(a.nameAr,a.nameEn):"—")}</span>
                    </td>
                    <td>
                      <span class="status-badge ${h(r.status||"draft")}">
                        ${h(A(r.status||"draft"))}
                      </span>
                    </td>
                    <td style="font-size:12px;color:var(--ink-soft);">${g}</td>
                    <td style="font-size:12px;color:var(--ink-soft);">${R(r.createdAt,!0)}</td>
                    <td style="text-align:end;">
                      <div style="display:inline-flex;gap:4px;">
                        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${h(r.id)}" title="${e("معاينة","Preview")}">
                          ${n("eye",14)}
                        </button>
                        <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${h(r.id)}" style="color:var(--blue);" title="${e("تحميل","Download")}">
                          ${n("download",14)}
                        </button>
                      </div>
                    </td>
                  </tr>
                `}).join(""):`
                <tr>
                  <td colspan="6"><div class="empty">${e("لا توجد مخططات مرفوعة مطابقة للفلتر المحدد.","No uploaded drawings matching current filter.")}</div></td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function oe(){if(!z("export_reports")&&!C()){x(f("permissionDenied"),!0);return}const{projects:l=[],tasks:d=[]}=v.data||{},t=v.reportProjectFilter||"all",i=v.reportTimeframe||"all",s=_(d,t,i),o=K(s);if(!o.length){x(e("لا توجد بيانات تخصصات لتصديرها.","No discipline data to export."),!0);return}const r=I(),a=t==="all"?e("كافة مشاريع المحفظة","All Portfolio Projects"):l.find(p=>p.id===t)?.nameAr||t,g=`
    <table>
      <tr><th colspan="6" class="title">${u(r.displayName)} - ${e("تقرير تحليل التخصصات الهندسية والمخرجات","Engineering Disciplines & Deliverables Report")}</th></tr>
      <tr><td colspan="6" class="subtitle">${e("نطاق المشروع:","Project Scope:")} ${u(a)} | ${e("الفترة:","Timeframe:")} ${u(i)}</td></tr>
      <tr><td colspan="6" class="meta">${e("تاريخ التصدير:","Export Date:")} ${B(new Date)} ${O(new Date)}</td></tr>
      <tr>
        <th class="header">${e("التخصص الهندسي","Engineering Discipline")}</th>
        <th class="header">${e("إجمالي المخرجات","Total Deliverables")}</th>
        <th class="header">${e("المكتمل","Done")}</th>
        <th class="header">${e("نسبة الإنجاز","Completion Rate")}</th>
        <th class="header">${e("الحصة من المهام","Share")}</th>
        <th class="header">${e("المهام المتأخرة","Overdue Tasks")}</th>
      </tr>
      ${o.map(p=>{const $=s.length?Math.round(p.total/s.length*100):0;return`
          <tr>
            <td>${u(p.name)}</td>
            <td style="text-align:center;">${p.total}</td>
            <td style="text-align:center;">${p.done}</td>
            <td style="text-align:center;">${p.percentage}%</td>
            <td style="text-align:center;">${$}%</td>
            <td style="text-align:center;color:${p.overdue>0?"#dc2626":"#16a34a"};">${p.overdue}</td>
          </tr>
        `}).join("")}
    </table>
  `;F(`DARC_Disciplines_${Date.now()}`,g),x(e("تم تصدير تقرير التخصصات بنجاح.","Disciplines report exported successfully."))}function de(){if(!z("export_reports")&&!C()){x(f("permissionDenied"),!0);return}const{tasks:l=[],users:d=[]}=v.data||{},t=_(l,v.reportProjectFilter||"all",v.reportTimeframe||"all"),i=Q(t,d);if(!i.length){x(e("لا توجد بيانات فريق لتصديرها.","No team data to export."),!0);return}const s=I(),o=`
    <table>
      <tr><th colspan="7" class="title">${u(s.displayName)} - ${e("تقرير أداء وحمولة فريق العمل الهندسي","Engineering Team Workload & Capacity Report")}</th></tr>
      <tr><td colspan="7" class="subtitle">${e("إجمالي أعضاء الفريق:","Total Members:")} ${i.length} | ${e("المهام الإجمالية:","Total Tasks:")} ${t.length}</td></tr>
      <tr><td colspan="7" class="meta">${e("تاريخ التصدير:","Export Date:")} ${B(new Date)} ${O(new Date)}</td></tr>
      <tr>
        <th class="header">${e("عضو الفريق","Member Name")}</th>
        <th class="header">${e("المسمى الوظيفي","Job Title")}</th>
        <th class="header">${e("إجمالي المهام","Total Tasks")}</th>
        <th class="header">${e("المهام النشطة","Active")}</th>
        <th class="header">${e("المكتملة","Completed")}</th>
        <th class="header">${e("المتأخرة","Overdue")}</th>
        <th class="header">${e("حالة الحمولة","Capacity")}</th>
      </tr>
      ${i.map(r=>`
        <tr>
          <td>${u(e(r.user.name,r.user.nameEn||r.user.name))}</td>
          <td>${u(e(r.user.jobTitleAr,r.user.jobTitleEn||r.user.jobTitleAr)||"—")}</td>
          <td style="text-align:center;">${r.total}</td>
          <td style="text-align:center;">${r.active}</td>
          <td style="text-align:center;color:#16a34a;">${r.done}</td>
          <td style="text-align:center;color:${r.overdue>0?"#dc2626":"#16a34a"};">${r.overdue}</td>
          <td style="text-align:center;">${u(r.capacityLabel)}</td>
        </tr>
      `).join("")}
    </table>
  `;F(`DARC_Team_Workload_${Date.now()}`,o),x(e("تم تصدير تقرير حمولة الفريق بنجاح.","Team workload report exported successfully."))}function ce(){if(!z("export_reports")&&!C()){x(f("permissionDenied"),!0);return}const{projects:l=[],tasks:d=[]}=v.data||{},t=v.reportProjectFilter||"all",i=_(d,t,"all").filter(M),s=(t==="all"?l:l.filter(a=>a.id===t)).filter(a=>a.health==="at_risk"||a.health==="off_track");if(!i.length&&!s.length){x(e("لا توجد مهام أو مشاريع متأخرة حالياً لتصديرها.","No overdue tasks or at-risk projects to export."));return}const o=I(),r=`
    <table>
      <tr><th colspan="7" class="title">${u(o.displayName)} - ${e("سجل المخاطر والتأخيرات الهندسية (Risk & Delay Register)","Engineering Risk & Delay Register")}</th></tr>
      <tr><td colspan="7" class="meta">${e("تاريخ التصدير:","Export Date:")} ${B(new Date)} ${O(new Date)}</td></tr>
      
      <!-- Section 1: Overdue Tasks -->
      <tr><th colspan="7" class="header" style="background:#fecaca;color:#991b1b;font-size:14px;">${e("المهام والمخرجات المتأخرة عن موعدها","Overdue Deliverables & Tasks")} (${i.length})</th></tr>
      <tr>
        <th class="header">${e("المهمة / المخرج","Deliverable")}</th>
        <th class="header">${e("رمز المشروع","Project Code")}</th>
        <th class="header">${e("المشروع","Project Name")}</th>
        <th class="header">${e("المسؤول","Assignee")}</th>
        <th class="header">${e("الأولوية","Priority")}</th>
        <th class="header">${e("تاريخ الاستحقاق","Due Date")}</th>
        <th class="header">${e("أيام التأخير","Days Overdue")}</th>
      </tr>
      ${i.map(a=>{const g=l.find(b=>b.id===a.projectId),p=q(a.dueDate),$=a.assignee?e(a.assignee.name,a.assignee.nameEn||a.assignee.name):"—";return`
          <tr>
            <td>${u(e(a.titleAr,a.titleEn))}</td>
            <td style="text-align:center;">${u(g?.code||"—")}</td>
            <td>${u(g?e(g.nameAr,g.nameEn):"—")}</td>
            <td>${u($)}</td>
            <td style="text-align:center;">${u(A(a.priority||"medium"))}</td>
            <td style="text-align:center;">${R(a.dueDate,!0)}</td>
            <td style="text-align:center;color:#dc2626;font-weight:bold;">${p}</td>
          </tr>
        `}).join("")}

      <!-- Section 2: At-Risk Projects -->
      <tr><td colspan="7" style="height:16px;"></td></tr>
      <tr><th colspan="7" class="header" style="background:#fed7aa;color:#9a3412;font-size:14px;">${e("المشاريع ذات المخاطر والانحراف","Projects Requiring Management Escalation")} (${s.length})</th></tr>
      <tr>
        <th class="header">${e("رمز المشروع","Project Code")}</th>
        <th class="header" colspan="2">${e("اسم المشروع","Project Name")}</th>
        <th class="header">${e("العميل","Client")}</th>
        <th class="header">${e("مدير المشروع","Manager")}</th>
        <th class="header">${e("الحالة","Status")}</th>
        <th class="header">${e("الإنجاز","Progress")}</th>
      </tr>
      ${s.map(a=>`
        <tr>
          <td style="text-align:center;font-weight:bold;">${u(a.code)}</td>
          <td colspan="2">${u(e(a.nameAr,a.nameEn))}</td>
          <td>${u(e(a.clientAr,a.clientEn)||"—")}</td>
          <td>${u(a.manager?e(a.manager.name,a.manager.nameEn||a.manager.name):"—")}</td>
          <td style="text-align:center;color:${a.health==="off_track"?"#dc2626":"#d97706"};">${u(A(a.health))}</td>
          <td style="text-align:center;">${a.progress}%</td>
        </tr>
      `).join("")}
    </table>
  `;F(`DARC_Risks_Register_${Date.now()}`,r),x(e("تم تصدير سجل المخاطر بنجاح.","Risk register exported successfully."))}function pe(){if(!z("export_reports")&&!C()){x(f("permissionDenied"),!0);return}const{projects:l=[],documents:d=[]}=v.data||{},t=v.reportProjectFilter||"all",i=t==="all"?(d||[]).filter(a=>!a.deletedAt):(d||[]).filter(a=>a.projectId===t&&!a.deletedAt);if(!i.length){x(e("لا توجد مخططات مرفوعة لتصديرها.","No drawings to export."),!0);return}const s=I(),o=t==="all"?e("كافة مشاريع المحفظة","All Portfolio Projects"):l.find(a=>a.id===t)?.nameAr||t,r=`
    <table>
      <tr><th colspan="6" class="title">${u(s.displayName)} - ${e("سجل المخططات والمستندات الهندسية (Drawings Register)","Drawings & Blueprints Submittals Register")}</th></tr>
      <tr><td colspan="6" class="subtitle">${e("نطاق المشروع:","Project Scope:")} ${u(o)} | ${e("إجمالي المخططات:","Total Blueprints:")} ${i.length}</td></tr>
      <tr><td colspan="6" class="meta">${e("تاريخ التصدير:","Export Date:")} ${B(new Date)} ${O(new Date)}</td></tr>
      <tr>
        <th class="header">${e("اسم المخطط / الملف","File / Blueprint Name")}</th>
        <th class="header">${e("رمز المشروع","Project Code")}</th>
        <th class="header">${e("اسم المشروع","Project Name")}</th>
        <th class="header">${e("الحالة","Status")}</th>
        <th class="header">${e("حجم الملف","Size")}</th>
        <th class="header">${e("تاريخ الرفع","Upload Date")}</th>
      </tr>
      ${i.map(a=>{const g=l.find($=>$.id===a.projectId),p=a.size>1048576?(a.size/1048576).toFixed(1)+" MB":Math.round((a.size||0)/1024)+" KB";return`
          <tr>
            <td>${u(a.originalName||a.name||"Drawing.pdf")}</td>
            <td style="text-align:center;">${u(g?.code||"—")}</td>
            <td>${u(g?e(g.nameAr,g.nameEn):"—")}</td>
            <td style="text-align:center;">${u(A(a.status||"draft"))}</td>
            <td style="text-align:center;">${p}</td>
            <td style="text-align:center;">${R(a.createdAt,!0)}</td>
          </tr>
        `}).join("")}
    </table>
  `;F(`DARC_Drawings_Register_${Date.now()}`,r),x(e("تم تصدير سجل المخططات بنجاح.","Drawings register exported successfully."))}export{ue as a,de as i,pe as n,ce as r,oe as t};
