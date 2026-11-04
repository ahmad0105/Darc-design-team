import{t as J}from"./rolldown-runtime-BQ-_32WO.js";import{A as tt,Ct as v,F as z,G as q,H as O,L as g,P as t,Q as R,R as F,V as B,W as I,X as u,dt as x,gt as f,j as C,ot as et,st as h,tt as M,ut as A}from"./core-realtime-B8oLFM1Q.js";var ut=J({computeDisciplinesBreakdown:()=>K,computeTeamWorkload:()=>Q,exportDisciplinesExcel:()=>ot,exportDrawingsExcel:()=>pt,exportRisksExcel:()=>ct,exportTeamWorkloadExcel:()=>dt,getDaysOverdue:()=>q,getDisciplineIcon:()=>U,getReportFilteredTasks:()=>_,renderReports:()=>at});function U(l=""){const n=String(l).toLowerCase();return n.includes("معمار")||n.includes("arch")?"🏛️":n.includes("كهرب")||n.includes("elect")?"⚡":n.includes("سباك")||n.includes("صحي")||n.includes("plumb")?"💧":n.includes("تكييف")||n.includes("hvac")||n.includes("ميكانيك")?"🌡️":n.includes("إنشائ")||n.includes("انشائ")||n.includes("struct")?"🏗️":n.includes("ديكور")||n.includes("داخل")||n.includes("interior")?"🛋️":n.includes("3d")||n.includes("رندر")||n.includes("visual")?"🎨":n.includes("كميات")||n.includes("boq")||n.includes("quantity")?"📊":n.includes("حريق")||n.includes("fire")?"🧯":"📐"}function _(l=[],n="all",r="all"){let i=n==="all"?l:l.filter(o=>o.projectId===n);const a=new Date;if(r==="month"){const o=new Date(a.getFullYear(),a.getMonth(),1);i=i.filter(s=>{const e=s.dueDate?new Date(s.dueDate):s.updatedAt?new Date(s.updatedAt):null;return e&&e>=o})}else if(r==="quarter"){const o=Math.floor(a.getMonth()/3)*3,s=new Date(a.getFullYear(),o,1);i=i.filter(e=>{const p=e.dueDate?new Date(e.dueDate):e.updatedAt?new Date(e.updatedAt):null;return p&&p>=s})}else r==="critical"&&(i=i.filter(o=>M(o)||o.priority==="urgent"||o.status==="blocked"));return i}function K(l=[]){const n=new Map;return l.forEach(r=>{const i=((v.lang==="ar"?r.categoryAr:r.categoryEn)||t(r.typeAr||"معماري",r.typeEn||"Architectural")).trim(),a=n.get(i)||{name:i,weight:0,progress:0,total:0,done:0,overdue:0},o=Number(r.weight||1);a.weight+=o,a.progress+=(r.progress||0)*o,a.total++,["done","completed"].includes(r.status)&&a.done++,M(r)&&a.overdue++,n.set(i,a)}),[...n.values()].map(r=>({...r,percentage:r.weight?Math.round(r.progress/r.weight):0})).sort((r,i)=>i.total-r.total)}function Q(l=[],n=[]){const r=new Map;return l.forEach(i=>{const a=new Set;i.assigneeId&&a.add(i.assigneeId),i.assignee_id&&a.add(i.assignee_id);const o=i.customFields?.additionalAssignees||i.customFields?.additional_assignees||i.custom_fields?.additionalAssignees||i.custom_fields?.additional_assignees;Array.isArray(o)&&o.forEach(s=>{s&&a.add(s)}),a.forEach(s=>{const e=r.get(s);e?e.push(i):r.set(s,[i])})}),n.filter(i=>i.status!=="inactive").map(i=>{const a=r.get(i.id)||[],o=a.filter(m=>["done","completed"].includes(m.status)).length,s=a.filter(m=>["in_progress","review","approval"].includes(m.status)).length,e=a.filter(M).length,p=a.reduce((m,D)=>m+Number(D.weight||1),0),c=a.reduce((m,D)=>m+(D.progress||0)*Number(D.weight||1),0),$=p?Math.round(c/p):0;let b="optimal",y=t("متزن","Optimal");return s===0&&a.length===0?(b="idle",y=t("متاح","Available")):s>7||e>=2?(b="critical",y=t("ضغط حرج","Critical Overload")):s>4&&(b="high",y=t("حمولة مرتفعة","High Load")),{user:i,total:a.length,done:o,active:s,overdue:e,progress:$,capacity:b,capacityLabel:y}}).sort((i,a)=>a.active-i.active||a.overdue-i.overdue)}function at(){const{projects:l=[],tasks:n=[],users:r=[],documents:i=[]}=v.data||{},a=C("export_reports")||R(),o=v.reportProjectFilter||"all",s=v.reportTimeframe||"all",e=v.reportsTab||"overview",p=o==="all"?l:l.filter(d=>d.id===o),c=_(n,o,s),$=c.reduce((d,T)=>d+Number(T.weight||1),0),b=$?Math.round(c.reduce((d,T)=>d+(T.progress||0)*Number(T.weight||1),0)/$):0,y=c.filter(d=>["done","completed"].includes(d.status)).length,m=c.filter(d=>d.status==="in_progress").length,D=c.filter(d=>["review","approval"].includes(d.status)).length,S=c.filter(M),w=S.length,N=c.filter(d=>d.status==="blocked").length,j=p.filter(d=>d.health==="on_track").length,V=p.filter(d=>d.health==="at_risk").length,P=p.filter(d=>d.health==="off_track").length,W=p.filter(d=>d.lifecycle==="completed"||d.progress===100).length,L=c.length?Math.max(0,Math.min(100,Math.round((c.length-w)/c.length*100))):100,E=o==="all"?(i||[]).filter(d=>!d.deletedAt):(i||[]).filter(d=>d.projectId===o&&!d.deletedAt),H=E.filter(d=>d.status==="approved").length,k=K(c),G=Q(c,r),X=k[0]?.name||t("معماري","Architectural"),Z=[...p].sort((d,T)=>(T.progress||0)-(d.progress||0))[0],Y=[...p].filter(d=>d.lifecycle==="active").sort((d,T)=>(d.progress||0)-(T.progress||0))[0];return`
    <!-- 📄 Page Header with Actions -->
    <div class="page-head">
      <div>
        <p class="eyebrow">${t("الرقابة والذكاء التنفيذي","EXECUTIVE INTELLIGENCE & AUDIT")}</p>
        <h1>${x("reports")}</h1>
        <p>${t("تحليلات شاملة للمحفظة الهندسية: الإنجاز الموزون، كفاءة الأقسام، ضغط الفريق، ومؤشرات المخاطر.","Comprehensive engineering portfolio readout: weighted progress, discipline efficiency, team capacity, and risk indicators.")}</p>
      </div>
      <div class="page-actions">
        ${a?`
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <button class="btn btn-primary" data-action="print-portfolio-pdf">
              ${u("printer",15)} ${t("تقرير المحفظة الرسمي (PDF)","Official Portfolio Report (PDF)")}
            </button>
            <button class="btn btn-soft" data-action="export-csv">
              ${u("document",15)} ${t("تصدير بيانات Excel","Export Excel Data")}
            </button>
          </div>
        `:""}
      </div>
    </div>

    <!-- 🎛️ Filter Toolbar & Horizon Selector -->
    <div class="view-toolbar" style="margin-bottom:16px;">
      <div class="view-toolbar-start" style="flex:1;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <!-- Project Scope Dropdown -->
        <div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1 1 180px;">
          <span style="font-size:12px;color:var(--ink-soft);font-weight:600;white-space:nowrap;">
            ${u("building",13)} ${t("المشروع:","Project:")}
          </span>
          <select class="select-compact" data-action="filter-report-project" style="width:100%;">
            <option value="all" ${o==="all"?"selected":""}>${t("— كافة مشاريع المحفظة —","— All Portfolio Projects —")}</option>
            ${l.map(d=>`
              <option value="${g(d.id)}" ${o===d.id?"selected":""}>
                ${g(d.code)} · ${g(t(d.nameAr,d.nameEn))}
              </option>
            `).join("")}
          </select>
        </div>

        <!-- Timeframe / Horizon Dropdown -->
        <div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1 1 160px;">
          <span style="font-size:12px;color:var(--ink-soft);font-weight:600;white-space:nowrap;">
            ${u("calendar",13)} ${t("الفترة:","Period:")}
          </span>
          <select class="select-compact" data-action="filter-report-timeframe" style="width:100%;">
            <option value="all" ${s==="all"?"selected":""}>${t("كافة الفترات والمراحل","All Milestones & Time")}</option>
            <option value="month" ${s==="month"?"selected":""}>${t("الشهر الحالي","Current Month")}</option>
            <option value="quarter" ${s==="quarter"?"selected":""}>${t("الربع السنوي الحالي (Q)","Current Quarter")}</option>
            <option value="critical" ${s==="critical"?"selected":""}>⚠️ ${t("المهام والمشاريع الحرجة فقط","Critical Focus Only")}</option>
          </select>
        </div>
      </div>

      <div class="view-toolbar-end">
        <span class="mini-badge" style="padding:6px 10px;font-size:11px;font-weight:700;color:var(--brand-teal);background:rgba(20,184,166,0.1);">
          ${p.length} ${t("مشاريع مشمولة","projects analyzed")} · ${c.length} ${t("مهمة","tasks")}
        </span>
      </div>
    </div>

    <!-- 📑 Report Perspectives Navigation Tabs -->
    <div class="detail-tabs" style="margin-bottom:20px;">
      <button class="detail-tab ${e==="overview"?"active":""}" data-action="report-tab" data-tab="overview">
        📊 ${t("النظرة التنفيذية ومؤشرات الأداء","Executive KPI Overview")}
      </button>
      <button class="detail-tab ${e==="disciplines"?"active":""}" data-action="report-tab" data-tab="disciplines">
        📐 ${t("تحليل الأقسام والتخصصات","Disciplines & Deliverables")}
      </button>
      <button class="detail-tab ${e==="team"?"active":""}" data-action="report-tab" data-tab="team">
        👥 ${t("أداء وحمولة فريق العمل","Team Workload & Capacity")}
      </button>
      <button class="detail-tab ${e==="risks"?"active":""}" data-action="report-tab" data-tab="risks">
        ⚠️ ${t("مصفوفة المخاطر والانحراف","Risk & Delay Matrix")}
        ${w>0?`<span class="badge badge-red" style="padding:1px 5px;font-size:10px;margin-inline-start:4px;">${w}</span>`:""}
      </button>
      <button class="detail-tab ${e==="drawings"?"active":""}" data-action="report-tab" data-tab="drawings">
        📑 ${t("المخططات والاعتمادات","Drawings & Submittals")}
      </button>
    </div>

    <!-- 📊 Tab Content Body -->
    ${e==="overview"?st({filteredProjects:p,filteredTasks:c,totalWeight:$,weightedProgress:b,completedTasksCount:y,inProgressTasksCount:m,inReviewTasksCount:D,overdueTasksCount:w,blockedTasksCount:N,onTrackProjectsCount:j,atRiskProjectsCount:V,offTrackProjectsCount:P,completedProjectsCount:W,onTimeRate:L,approvedDocsCount:H,filteredDocs:E,disciplines:k,highestDiscipline:X,highestProject:Z,lowestProject:Y}):""}

    ${e==="disciplines"?rt(k,c.length):""}
    ${e==="team"?it(G,c.length):""}
    ${e==="risks"?nt(S,p,N):""}
    ${e==="drawings"?lt(E,p):""}
  `}function st(l){const{filteredProjects:n,filteredTasks:r,weightedProgress:i,completedTasksCount:a,inProgressTasksCount:o,inReviewTasksCount:s,overdueTasksCount:e,blockedTasksCount:p,onTrackProjectsCount:c,atRiskProjectsCount:$,offTrackProjectsCount:b,completedProjectsCount:y,onTimeRate:m,approvedDocsCount:D,filteredDocs:S,disciplines:w,highestDiscipline:N,highestProject:j,lowestProject:V}=l,P=n.length||1,W=Math.round(c/P*100),L=Math.round($/P*100),E=Math.round(b/P*100),H=Math.round(y/P*100);return`
    <div style="display:flex;flex-direction:column;gap:20px;">
      <!-- 1. Executive KPIs Grid -->
      <div class="metrics-grid" style="margin-bottom:0;">
        <article class="metric-card teal">
          <div class="metric-top">
            <span class="metric-label">${t("الإنجاز الموزون العام","Weighted Portfolio Progress")}</span>
            <span class="metric-icon">${u("chart",16)}</span>
          </div>
          <div class="metric-value">${i}%</div>
          <span class="metric-note up">🎯 ${a} ${t("مهام مكتملة","tasks done")} (${r.length} ${t("إجمالي","total")})</span>
        </article>

        <article class="metric-card blue">
          <div class="metric-top">
            <span class="metric-label">${t("معدل الالتزام الزمني","On-Time Schedule Adherence")}</span>
            <span class="metric-icon">${u("clock",16)}</span>
          </div>
          <div class="metric-value">${m}%</div>
          <span class="metric-note ${m>=80?"up":"alert"}">${m>=80?t("وتيرة تسليم مستقرة","Healthy delivery pace"):t("تراجع في وتيرة التسليم","Pace needs correction")}</span>
        </article>

        <article class="metric-card ${e>0?"red":"teal"}">
          <div class="metric-top">
            <span class="metric-label">${t("المهام المتأخرة والحرجة","Critical & Overdue Tasks")}</span>
            <span class="metric-icon">${u(e>0?"alert":"check",16)}</span>
          </div>
          <div class="metric-value">${e}</div>
          <span class="metric-note ${e>0?"alert":"up"}">${e>0?t("تتطلب تدخلاً ومتابعة","Immediate escalation needed"):t("لا يوجد تأخير حرج","Zero critical delays")}</span>
        </article>

        <article class="metric-card amber">
          <div class="metric-top">
            <span class="metric-label">${t("المخططات المعتمدة","Approved Deliverables")}</span>
            <span class="metric-icon">${u("document",16)}</span>
          </div>
          <div class="metric-value">${D}</div>
          <span class="metric-note">📐 ${S.length} ${t("ملف ومخطط مرفوع","total uploaded documents")}</span>
        </article>
      </div>

      <!-- 2. Smart Executive Summary & Highlights -->
      <section class="panel" style="background:linear-gradient(135deg, var(--surface) 0%, var(--surface-soft) 100%);padding:20px;border:1px solid var(--line);">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:24px;">💡</span>
            <div>
              <h3 style="margin:0;font-size:15px;color:var(--ink);">${t("الملخص التحليلي التنفيذي","Executive Operations & Health Summary")}</h3>
              <p style="margin:2px 0 0;font-size:12px;color:var(--ink-soft);">${t("قراءة ذكية لحركة المحفظة وجاهزية المخرجات ومكامن التباطؤ.","Automated synthesis of deliverable flow, velocity, and bottlenecks.")}</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="badge ${i>=70?"badge-teal":i>=40?"badge-amber":"badge-red"}" style="font-size:12px;font-weight:700;padding:4px 10px;">
              ${i>=70?t("حالة المحفظة: ممتازة ✅","Status: Excellent ✅"):i>=40?t("حالة المحفظة: تحتاج متابعة ⚠️","Status: Needs Attention ⚠️"):t("حالة المحفظة: حرجة 🚨","Status: Critical 🚨")}
            </span>
          </div>
        </div>

        <div style="margin-top:16px;display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 250px), 1fr));gap:14px;">
          <div style="background:var(--surface);padding:12px 14px;border-radius:10px;border:1px solid var(--line);">
            <span style="font-size:11px;color:var(--muted);font-weight:700;display:block;margin-bottom:4px;">🚀 ${t("المشروع الأكثر تقدماً","Top Progressing Project")}</span>
            <strong style="font-size:13px;color:var(--ink);display:block;">${g(j?t(j.nameAr,j.nameEn):"—")}</strong>
            <span style="font-size:11px;color:var(--brand-teal);font-weight:bold;">${j?`${j.progress}% ${t("إنجاز","completed")}`:""}</span>
          </div>

          <div style="background:var(--surface);padding:12px 14px;border-radius:10px;border:1px solid var(--line);">
            <span style="font-size:11px;color:var(--muted);font-weight:700;display:block;margin-bottom:4px;">📐 ${t("التخصص الأكبر حجماً","Largest Active Discipline")}</span>
            <strong style="font-size:13px;color:var(--ink);display:block;">${g(N)}</strong>
            <span style="font-size:11px;color:var(--ink-soft);">${w[0]?`${w[0].total} ${t("مهمة ومخرج مسجل","deliverables registered")}`:""}</span>
          </div>

          <div style="background:var(--surface);padding:12px 14px;border-radius:10px;border:1px solid var(--line);">
            <span style="font-size:11px;color:var(--muted);font-weight:700;display:block;margin-bottom:4px;">⚠️ ${t("أولويات تحتاج انتباهك","Critical Attention Need")}</span>
            <strong style="font-size:13px;color:${e>0?"var(--red)":"var(--teal)"};display:block;">
              ${e>0?`${e} ${t("مهام تجاوزت موعد التسليم","tasks overdue")}`:t("جميع المواعيد منتظمة ومستقرة","All schedules on track")}
            </strong>
            <span style="font-size:11px;color:var(--ink-soft);">${p>0?`${p} ${t("مهام بانتظار فك الحجب","blocked tasks")}`:t("لا توجد مهام محجوبة","Zero blockers")}</span>
          </div>
        </div>
      </section>

      <!-- 3. Portfolio Distribution & Discipline Breakdown Panels -->
      <div class="report-grid">
        <!-- Left: Disciplines Progress Bars -->
        <section class="panel">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">${t("الإنجاز الموزون حسب التخصص الهندسي","Progress by Engineering Discipline")}</h2>
              <p class="panel-subtitle">${t("نسبة الإنجاز الموزونة لكل تخصص ومخرجاته الهندسية.","Weighted completion for each engineering discipline.")}</p>
            </div>
            <span class="status-badge on_track">${i}%</span>
          </div>
          <div class="report-bars">
            ${w.length?w.map(k=>`
              <div class="report-bar-row">
                <span title="${g(k.name)}" style="display:flex;align-items:center;gap:6px;min-width:0;">
                  <span style="flex-shrink:0;">${U(k.name)}</span>
                  <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${g(k.name)}</span>
                </span>
                <div class="report-bar-track" title="${k.percentage}%">
                  <div class="report-bar-fill" style="width:${k.percentage}%;"></div>
                </div>
                <strong>${k.percentage}%</strong>
              </div>
            `).join(""):`<div class="empty">${x("noTasks")}</div>`}
          </div>
        </section>

        <!-- Right: Portfolio Health & Workload Pulse -->
        <div class="stack">
          <!-- Portfolio Health Distribution -->
          <section class="panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">${t("صحة وتوزيع المحفظة","Portfolio Health Breakdown")}</h2>
                <p class="panel-subtitle">${t("توزيع المشاريع حسب مسار التنفيذ والمخاطر.","Project health status breakdown.")}</p>
              </div>
              <span class="mini-badge" style="font-size:10px;">${n.length} ${t("مشاريع","projects")}</span>
            </div>

            <!-- Visual Multi-segment Distribution Bar -->
            <div style="margin:8px 0 16px;">
              <div style="display:flex;height:10px;border-radius:6px;overflow:hidden;background:var(--line);">
                <div style="width:${W}%;background:var(--mint-strong);" title="${t("على المسار","On Track")}: ${c}"></div>
                <div style="width:${L}%;background:var(--amber);" title="${t("يحتاج انتباه","At Risk")}: ${$}"></div>
                <div style="width:${E}%;background:var(--red);" title="${t("متأخر","Off Track")}: ${b}"></div>
                <div style="width:${H}%;background:var(--teal);" title="${t("مكتمل","Completed")}: ${y}"></div>
              </div>
            </div>

            <div class="report-stat-list">
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--mint-strong);"></span>
                  ${x("onTrack")}
                </span>
                <strong style="color:var(--mint-strong)">${c}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--amber);"></span>
                  ${x("atRisk")}
                </span>
                <strong style="color:var(--amber)">${$}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--red);"></span>
                  ${x("offTrack")}
                </span>
                <strong style="color:var(--red)">${b}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--teal);"></span>
                  ${x("completed")}
                </span>
                <strong style="color:var(--teal)">${y}</strong>
              </div>
            </div>
          </section>

          <!-- Task Workflow Phases Pulse -->
          <section class="panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">${t("مراحل دورة عمل المهام","Task Workflow Stages")}</h2>
                <p class="panel-subtitle">${t("توزيع المهام النشطة حسب الحالة التشغيلية.","Active task distribution by stage.")}</p>
              </div>
            </div>
            <div class="report-stat-list">
              <div class="report-stat">
                <span>⚡ ${t("قيد التنفيذ النشط","In Progress")}</span>
                <strong style="color:var(--blue)">${o}</strong>
              </div>
              <div class="report-stat">
                <span>🔍 ${t("قيد المراجعة والاعتماد","Under Review & Approval")}</span>
                <strong style="color:var(--amber)">${s}</strong>
              </div>
              <div class="report-stat">
                <span>✅ ${t("مهام مكتملة","Completed")}</span>
                <strong style="color:var(--mint-strong)">${a}</strong>
              </div>
              ${p>0?`
                <div class="report-stat">
                  <span>⛔ ${t("مهام متوقفة / محجوبة","Blocked Tasks")}</span>
                  <strong style="color:var(--red)">${p}</strong>
                </div>
              `:""}
            </div>
          </section>
        </div>
      </div>
    </div>
  `}function rt(l,n){return`
    <div class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">${t("التحليل التفصيلي للأقسام والتخصصات الهندسية","Engineering Disciplines & Deliverables Breakdown")}</h2>
          <p class="panel-subtitle">${t("إحصائيات الإنجاز والوزن التراكمي ومخرجات كل قسم تخصصي في المحفظة.","Detailed progress, weighted impact, and deliverable health for every discipline.")}</p>
        </div>
        <button class="btn btn-soft btn-sm" data-action="export-disciplines-excel">
          ${u("document",14)} ${t("تصدير التخصصات (Excel)","Export Disciplines (Excel)")}
        </button>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${t("التخصص الهندسي","Engineering Discipline")}</th>
              <th>${t("إجمالي المخرجات","Total Deliverables")}</th>
              <th>${t("المكتمل","Done")}</th>
              <th>${t("نسبة الإنجاز","Completion Rate")}</th>
              <th>${t("الوزن النسبي","Weight Share")}</th>
              <th>${t("الحالة","Discipline Health")}</th>
            </tr>
          </thead>
          <tbody>
            ${l.length?l.map(r=>{const i=n?Math.round(r.total/n*100):0,a=r.overdue===0&&r.percentage>=50,o=r.overdue>0;return`
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="font-size:18px;">${U(r.name)}</span>
                      <div>
                        <strong style="font-size:13px;color:var(--ink);display:block;">${g(r.name)}</strong>
                        <span style="font-size:11px;color:var(--muted);">${r.total} ${t("مخرج مسجل","deliverables")}</span>
                      </div>
                    </div>
                  </td>
                  <td style="font-weight:700;font-size:13px;">${r.total}</td>
                  <td style="color:var(--mint-strong);font-weight:700;">${r.done}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px;min-width:140px;">
                      <div style="flex:1;height:6px;background:var(--line);border-radius:3px;overflow:hidden;">
                        <div style="height:100%;width:${r.percentage}%;background:${r.percentage===100?"var(--mint-strong)":"var(--brand-teal)"};"></div>
                      </div>
                      <strong style="font-size:12px;">${r.percentage}%</strong>
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${i}%</td>
                  <td>
                    <span class="badge ${o?"badge-red":a?"badge-teal":"badge-amber"}" style="font-size:11px;font-weight:700;">
                      ${o?`⚠️ ${r.overdue} ${t("متأخرة","overdue")}`:a?t("ممتاز ✅","On Track ✅"):t("جارٍ التنفيذ ⏳","Active ⏳")}
                    </span>
                  </td>
                </tr>
              `}).join(""):`
              <tr>
                <td colspan="6"><div class="empty">${x("noTasks")}</div></td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function it(l,n){return`
    <div class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">${t("مصفوفة كفاءة وضغط فريق العمل","Team Capacity & Workload Matrix")}</h2>
          <p class="panel-subtitle">${t("توزيع المهام النشطة، المكتملة، والمتأخرة ومعدل الضغط لكل عضو في الفريق.","Active tasks, completion rate, and workload pressure indicator for each team member.")}</p>
        </div>
        <button class="btn btn-soft btn-sm" data-action="export-team-workload-excel">
          ${u("document",14)} ${t("تصدير حمولة الفريق (Excel)","Export Team Load (Excel)")}
        </button>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${t("عضو الفريق","Team Member")}</th>
              <th>${t("المسمى / الدور","Role")}</th>
              <th>${t("المهام النشطة","Active Load")}</th>
              <th>${t("المكتملة","Completed")}</th>
              <th>${t("المتأخرة","Overdue")}</th>
              <th>${t("نسبة الإنجاز","Progress %")}</th>
              <th>${t("مستوى الحمولة","Capacity Status")}</th>
            </tr>
          </thead>
          <tbody>
            ${l.length?l.map(r=>{const i=r.user,a=r.capacity==="idle"?`<span class="badge" style="background:var(--surface-soft);color:var(--ink-soft);border:1px solid var(--line);">🟢 ${t("متاح للمهام","Available")}</span>`:r.capacity==="optimal"?`<span class="badge badge-teal">🟢 ${t("حمولة متزنة","Balanced")}</span>`:r.capacity==="high"?`<span class="badge badge-amber">🟡 ${t("حمولة مرتفعة","High Load")}</span>`:`<span class="badge badge-red">🔴 ${t("عبء حرج / تأخير","Overloaded")}</span>`;return`
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                      ${tt(i,"mini-avatar")}
                      <div>
                        <strong style="font-size:13px;color:var(--ink);display:block;">${g(t(i.name,i.nameEn||i.name))}</strong>
                        <span style="font-size:11px;color:var(--muted);">${g(i.email||"")}</span>
                      </div>
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${g(et(i))}</td>
                  <td style="font-weight:700;font-size:13px;color:var(--blue);">${r.active}</td>
                  <td style="font-weight:700;font-size:13px;color:var(--mint-strong);">${r.done}</td>
                  <td style="font-weight:700;font-size:13px;color:${r.overdue>0?"var(--red)":"var(--muted)"};">${r.overdue}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:6px;min-width:100px;">
                      <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;">
                        <div style="height:100%;width:${r.progress}%;background:var(--teal);"></div>
                      </div>
                      <span style="font-size:11px;font-weight:700;">${r.progress}%</span>
                    </div>
                  </td>
                  <td>${a}</td>
                </tr>
              `}).join(""):`
              <tr>
                <td colspan="7"><div class="empty">${t("لا يوجد أعضاء مسجلون","No members found")}</div></td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function nt(l,n,r){const i=n.filter(a=>a.health==="at_risk"||a.health==="off_track");return`
    <div style="display:flex;flex-direction:column;gap:20px;">
      <!-- Overdue Tasks Register -->
      <div class="panel">
        <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div>
            <h2 class="panel-title" style="color:var(--red);display:flex;align-items:center;gap:6px;">
              ${u("alert",16)} ${t("سجل المهام المتأخرة والحرجة","Overdue & Critical Tasks Register")} (${l.length})
            </h2>
            <p class="panel-subtitle">${t("قائمة بالمهام التي تجاوزت تاريخ التسليم المعتمد وتتطلب اتخاذ إجراء إداري فوري.","List of tasks past approved deadline requiring immediate managerial intervention.")}</p>
          </div>
          <button class="btn btn-soft btn-sm" data-action="export-risks-excel">
            ${u("document",14)} ${t("تصدير قائمة المخاطر (Excel)","Export Risks (Excel)")}
          </button>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t("اسم المهمة / المخرج","Task / Deliverable")}</th>
                <th>${t("المشروع","Project")}</th>
                <th>${t("المسؤول / المكلف","Assignee")}</th>
                <th>${t("الأولوية","Priority")}</th>
                <th>${t("تاريخ الاستحقاق","Due Date")}</th>
                <th>${t("مدة التأخير","Days Overdue")}</th>
                <th style="text-align:end;">${t("الإجراء","Action")}</th>
              </tr>
            </thead>
            <tbody>
              ${l.length?l.map(a=>{const o=q(a.dueDate),s=(v.data?.projects||[]).find(p=>p.id===a.projectId),e=a.assignee?t(a.assignee.name,a.assignee.nameEn||a.assignee.name):"—";return`
                  <tr>
                    <td>
                      <strong style="display:block;font-size:13px;color:var(--ink);">${g(t(a.titleAr,a.titleEn))}</strong>
                      <span style="font-size:10.5px;color:var(--muted);">${g(a.templateId||t("مخرج مخصص","Custom Deliverable"))}</span>
                    </td>
                    <td>
                      <span class="badge badge-teal" style="font-size:10.5px;">${g(s?s.code:"—")}</span>
                      <span style="font-size:11px;color:var(--ink);margin-inline-start:4px;">${g(s?t(s.nameAr,s.nameEn):"—")}</span>
                    </td>
                    <td>${g(e)}</td>
                    <td>
                      <span class="badge ${a.priority==="urgent"?"badge-red":a.priority==="high"?"badge-amber":"badge-blue"}" style="font-size:10.5px;">
                        ${g(A(a.priority||"medium"))}
                      </span>
                    </td>
                    <td style="font-size:12px;color:var(--ink);">${z(a.dueDate,!0)}</td>
                    <td>
                      <span class="badge badge-red" style="font-weight:700;font-size:11px;">
                        ⏱️ ${o} ${t("يوم تأخير","days late")}
                      </span>
                    </td>
                    <td style="text-align:end;">
                      <button class="btn btn-soft btn-xs" data-action="open-task" data-task-id="${g(a.id)}">
                        ${u("edit",12)} ${t("متابعة","Review")}
                      </button>
                    </td>
                  </tr>
                `}).join(""):`
                <tr>
                  <td colspan="7">
                    <div class="empty" style="padding:28px 10px;">
                      <span style="font-size:28px;">🎉</span>
                      <strong style="color:var(--mint-strong);font-size:14px;margin-top:4px;">${t("ممتاز! لا توجد أي مهام متأخرة في المحفظة حالياً.","Excellent! Zero overdue tasks in portfolio.")}</strong>
                      <span style="font-size:11px;color:var(--muted);">${t("كافة مخرجات ومواعيد التسليم على المسار الصحيح.","All schedules and milestones are currently on track.")}</span>
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
            <h2 class="panel-title">${t("المشاريع ذات المخاطر والانحراف","Projects Requiring Escalation")} (${i.length})</h2>
            <p class="panel-subtitle">${t("مشاريع بحاجة لدعم إداري لتلافي تفاقم التأخير.","Projects needing attention to prevent deadline slippage.")}</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t("رمز المشروع","Code")}</th>
                <th>${t("اسم المشروع","Project Name")}</th>
                <th>${t("العميل","Client")}</th>
                <th>${t("مدير المشروع","Manager")}</th>
                <th>${t("الحالة","Status")}</th>
                <th>${t("نسبة الإنجاز","Progress")}</th>
                <th>${t("تاريخ التسليم","Due Date")}</th>
                <th style="text-align:end;">${t("فتح المشروع","Open")}</th>
              </tr>
            </thead>
            <tbody>
              ${i.length?i.map(a=>`
                <tr>
                  <td><strong style="color:var(--brand-teal);">${g(a.code)}</strong></td>
                  <td><strong>${g(t(a.nameAr,a.nameEn))}</strong></td>
                  <td>${g(t(a.clientAr,a.clientEn))||"—"}</td>
                  <td>${g(a.manager?t(a.manager.name,a.manager.nameEn||a.manager.name):"—")}</td>
                  <td><span class="status-badge ${g(a.health)}">${g(A(a.health))}</span></td>
                  <td><strong>${a.progress||0}%</strong></td>
                  <td>${z(a.dueDate,!0)}</td>
                  <td style="text-align:end;">
                    <button class="btn btn-soft btn-xs" data-action="open-project" data-project-id="${g(a.id)}">
                      ${t("عرض","View")} ➔
                    </button>
                  </td>
                </tr>
              `).join(""):`
                <tr>
                  <td colspan="8"><div class="empty">${t("كافة المشاريع تسير على المسار المعتمد دون تعثر.","All projects are proceeding on track.")}</div></td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function lt(l,n){const r=l.filter(s=>s.status==="approved"),i=l.filter(s=>s.status==="review"||s.status==="approval"),a=l.filter(s=>!s.status||s.status==="draft"),o=l.filter(s=>s.status==="superseded");return`
    <div style="display:flex;flex-direction:column;gap:20px;">
      <!-- Document Status Cards -->
      <div class="metrics-grid">
        <article class="metric-card teal">
          <div class="metric-top"><span class="metric-label">${t("مخططات معتمدة","Approved Drawings")}</span><span>✅</span></div>
          <div class="metric-value">${r.length}</div>
          <span class="metric-note up">${t("جاهزة للتنفيذ","Ready for construction")}</span>
        </article>
        <article class="metric-card amber">
          <div class="metric-top"><span class="metric-label">${t("قيد المراجعة الفنية","Under Review")}</span><span>🔍</span></div>
          <div class="metric-value">${i.length}</div>
          <span class="metric-note alert">${t("بانتظار موافقة المهندس","Awaiting engineer approval")}</span>
        </article>
        <article class="metric-card blue">
          <div class="metric-top"><span class="metric-label">${t("مسودات وتعديلات","Drafts / Revisions")}</span><span>✏️</span></div>
          <div class="metric-value">${a.length}</div>
          <span class="metric-note">${t("عمل جارٍ","Work in progress")}</span>
        </article>
        <article class="metric-card red">
          <div class="metric-top"><span class="metric-label">${t("مخططات ملغاة / مستبدلة","Superseded")}</span><span>📦</span></div>
          <div class="metric-value">${o.length}</div>
          <span class="metric-note">${t("إصدارات سابقة مؤرشفة","Archived previous revisions")}</span>
        </article>
      </div>

      <!-- Drawings Register Table -->
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${t("سجل المخططات والمستندات الهندسية (Drawings Register)","Drawings & Blueprints Submittals Register")} (${l.length})</h2>
            <p class="panel-subtitle">${t("قائمة المخططات الهندسية المعتمدة والمرفوعة مع الحجم، الحالة، وإمكانية المعاينة.","Registered engineering blueprints, upload status, revisions, and direct preview.")}</p>
          </div>
          <button class="btn btn-soft btn-sm" data-action="export-drawings-excel">
            ${u("document",14)} ${t("تصدير السجل (Excel)","Export Register (Excel)")}
          </button>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t("اسم المخطط / الملف","File / Blueprint Name")}</th>
                <th>${t("المشروع","Project")}</th>
                <th>${t("الحالة","Status")}</th>
                <th>${t("الحجم","Size")}</th>
                <th>${t("تاريخ الرفع","Date")}</th>
                <th style="text-align:end;">${t("المعاينة والتحميل","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${l.length?l.map(s=>{const e=n.find(c=>c.id===s.projectId),p=s.size>1048576?(s.size/1048576).toFixed(1)+" MB":Math.round((s.size||0)/1024)+" KB";return`
                  <tr>
                    <td>
                      <div style="display:flex;align-items:center;gap:8px;cursor:pointer;" data-action="preview-doc" data-doc-id="${g(s.id)}">
                        <span style="color:var(--brand-teal);">${u("document",16)}</span>
                        <div>
                          <strong style="display:block;font-size:13px;color:var(--ink);">${g(s.originalName||s.name||"Drawing.pdf")}</strong>
                          <span style="font-size:10.5px;color:var(--muted);">${g(s.mimeType||"application/pdf")}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge badge-teal" style="font-size:10.5px;">${g(e?e.code:"—")}</span>
                      <span style="font-size:11px;color:var(--ink);margin-inline-start:4px;">${g(e?t(e.nameAr,e.nameEn):"—")}</span>
                    </td>
                    <td>
                      <span class="status-badge ${g(s.status||"draft")}">
                        ${g(A(s.status||"draft"))}
                      </span>
                    </td>
                    <td style="font-size:12px;color:var(--ink-soft);">${p}</td>
                    <td style="font-size:12px;color:var(--ink-soft);">${z(s.createdAt,!0)}</td>
                    <td style="text-align:end;">
                      <div style="display:inline-flex;gap:4px;">
                        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${g(s.id)}" title="${t("معاينة","Preview")}">
                          ${u("eye",14)}
                        </button>
                        <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${g(s.id)}" style="color:var(--blue);" title="${t("تحميل","Download")}">
                          ${u("download",14)}
                        </button>
                      </div>
                    </td>
                  </tr>
                `}).join(""):`
                <tr>
                  <td colspan="6"><div class="empty">${t("لا توجد مخططات مرفوعة مطابقة للفلتر المحدد.","No uploaded drawings matching current filter.")}</div></td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function ot(){if(!C("export_reports")&&!R()){f(x("permissionDenied"),!0);return}const{projects:l=[],tasks:n=[]}=v.data||{},r=v.reportProjectFilter||"all",i=v.reportTimeframe||"all",a=_(n,r,i),o=K(a);if(!o.length){f(t("لا توجد بيانات تخصصات لتصديرها.","No discipline data to export."),!0);return}const s=I(),e=r==="all"?t("كافة مشاريع المحفظة","All Portfolio Projects"):l.find(c=>c.id===r)?.nameAr||r,p=`
    <table>
      <tr><th colspan="6" class="title">${h(s.displayName)} - ${t("تقرير تحليل التخصصات الهندسية والمخرجات","Engineering Disciplines & Deliverables Report")}</th></tr>
      <tr><td colspan="6" class="subtitle">${t("نطاق المشروع:","Project Scope:")} ${h(e)} | ${t("الفترة:","Timeframe:")} ${h(i)}</td></tr>
      <tr><td colspan="6" class="meta">${t("تاريخ التصدير:","Export Date:")} ${B(new Date)} ${O(new Date)}</td></tr>
      <tr>
        <th class="header">${t("التخصص الهندسي","Engineering Discipline")}</th>
        <th class="header">${t("إجمالي المخرجات","Total Deliverables")}</th>
        <th class="header">${t("المكتمل","Done")}</th>
        <th class="header">${t("نسبة الإنجاز","Completion Rate")}</th>
        <th class="header">${t("الحصة من المهام","Share")}</th>
        <th class="header">${t("المهام المتأخرة","Overdue Tasks")}</th>
      </tr>
      ${o.map(c=>{const $=a.length?Math.round(c.total/a.length*100):0;return`
          <tr>
            <td>${h(c.name)}</td>
            <td style="text-align:center;">${c.total}</td>
            <td style="text-align:center;">${c.done}</td>
            <td style="text-align:center;">${c.percentage}%</td>
            <td style="text-align:center;">${$}%</td>
            <td style="text-align:center;color:${c.overdue>0?"#dc2626":"#16a34a"};">${c.overdue}</td>
          </tr>
        `}).join("")}
    </table>
  `;F(`DARC_Disciplines_${Date.now()}`,p),f(t("تم تصدير تقرير التخصصات بنجاح 📊","Disciplines report exported successfully 📊"))}function dt(){if(!C("export_reports")&&!R()){f(x("permissionDenied"),!0);return}const{tasks:l=[],users:n=[]}=v.data||{},r=_(l,v.reportProjectFilter||"all",v.reportTimeframe||"all"),i=Q(r,n);if(!i.length){f(t("لا توجد بيانات فريق لتصديرها.","No team data to export."),!0);return}const a=I(),o=`
    <table>
      <tr><th colspan="7" class="title">${h(a.displayName)} - ${t("تقرير أداء وحمولة فريق العمل الهندسي","Engineering Team Workload & Capacity Report")}</th></tr>
      <tr><td colspan="7" class="subtitle">${t("إجمالي أعضاء الفريق:","Total Members:")} ${i.length} | ${t("المهام الإجمالية:","Total Tasks:")} ${r.length}</td></tr>
      <tr><td colspan="7" class="meta">${t("تاريخ التصدير:","Export Date:")} ${B(new Date)} ${O(new Date)}</td></tr>
      <tr>
        <th class="header">${t("عضو الفريق","Member Name")}</th>
        <th class="header">${t("المسمى الوظيفي","Job Title")}</th>
        <th class="header">${t("إجمالي المهام","Total Tasks")}</th>
        <th class="header">${t("المهام النشطة","Active")}</th>
        <th class="header">${t("المكتملة","Completed")}</th>
        <th class="header">${t("المتأخرة","Overdue")}</th>
        <th class="header">${t("حالة الحمولة","Capacity")}</th>
      </tr>
      ${i.map(s=>`
        <tr>
          <td>${h(t(s.user.name,s.user.nameEn||s.user.name))}</td>
          <td>${h(t(s.user.jobTitleAr,s.user.jobTitleEn||s.user.jobTitleAr)||"—")}</td>
          <td style="text-align:center;">${s.total}</td>
          <td style="text-align:center;">${s.active}</td>
          <td style="text-align:center;color:#16a34a;">${s.done}</td>
          <td style="text-align:center;color:${s.overdue>0?"#dc2626":"#16a34a"};">${s.overdue}</td>
          <td style="text-align:center;">${h(s.capacityLabel)}</td>
        </tr>
      `).join("")}
    </table>
  `;F(`DARC_Team_Workload_${Date.now()}`,o),f(t("تم تصدير تقرير حمولة الفريق بنجاح 👥","Team workload report exported successfully 👥"))}function ct(){if(!C("export_reports")&&!R()){f(x("permissionDenied"),!0);return}const{projects:l=[],tasks:n=[]}=v.data||{},r=v.reportProjectFilter||"all",i=_(n,r,"all").filter(M),a=(r==="all"?l:l.filter(e=>e.id===r)).filter(e=>e.health==="at_risk"||e.health==="off_track");if(!i.length&&!a.length){f(t("لا توجد مهام أو مشاريع متأخرة حالياً لتصديرها 🎉","No overdue tasks or at-risk projects to export 🎉"));return}const o=I(),s=`
    <table>
      <tr><th colspan="7" class="title">${h(o.displayName)} - ${t("سجل المخاطر والتأخيرات الهندسية (Risk & Delay Register)","Engineering Risk & Delay Register")}</th></tr>
      <tr><td colspan="7" class="meta">${t("تاريخ التصدير:","Export Date:")} ${B(new Date)} ${O(new Date)}</td></tr>
      
      <!-- Section 1: Overdue Tasks -->
      <tr><th colspan="7" class="header" style="background:#fecaca;color:#991b1b;font-size:14px;">⚠️ ${t("المهام والمخرجات المتأخرة عن موعدها","Overdue Deliverables & Tasks")} (${i.length})</th></tr>
      <tr>
        <th class="header">${t("المهمة / المخرج","Deliverable")}</th>
        <th class="header">${t("رمز المشروع","Project Code")}</th>
        <th class="header">${t("المشروع","Project Name")}</th>
        <th class="header">${t("المسؤول","Assignee")}</th>
        <th class="header">${t("الأولوية","Priority")}</th>
        <th class="header">${t("تاريخ الاستحقاق","Due Date")}</th>
        <th class="header">${t("أيام التأخير","Days Overdue")}</th>
      </tr>
      ${i.map(e=>{const p=l.find(b=>b.id===e.projectId),c=q(e.dueDate),$=e.assignee?t(e.assignee.name,e.assignee.nameEn||e.assignee.name):"—";return`
          <tr>
            <td>${h(t(e.titleAr,e.titleEn))}</td>
            <td style="text-align:center;">${h(p?.code||"—")}</td>
            <td>${h(p?t(p.nameAr,p.nameEn):"—")}</td>
            <td>${h($)}</td>
            <td style="text-align:center;">${h(A(e.priority||"medium"))}</td>
            <td style="text-align:center;">${z(e.dueDate,!0)}</td>
            <td style="text-align:center;color:#dc2626;font-weight:bold;">${c}</td>
          </tr>
        `}).join("")}

      <!-- Section 2: At-Risk Projects -->
      <tr><td colspan="7" style="height:16px;"></td></tr>
      <tr><th colspan="7" class="header" style="background:#fed7aa;color:#9a3412;font-size:14px;">⚡ ${t("المشاريع ذات المخاطر والانحراف","Projects Requiring Management Escalation")} (${a.length})</th></tr>
      <tr>
        <th class="header">${t("رمز المشروع","Project Code")}</th>
        <th class="header" colspan="2">${t("اسم المشروع","Project Name")}</th>
        <th class="header">${t("العميل","Client")}</th>
        <th class="header">${t("مدير المشروع","Manager")}</th>
        <th class="header">${t("الحالة","Status")}</th>
        <th class="header">${t("الإنجاز","Progress")}</th>
      </tr>
      ${a.map(e=>`
        <tr>
          <td style="text-align:center;font-weight:bold;">${h(e.code)}</td>
          <td colspan="2">${h(t(e.nameAr,e.nameEn))}</td>
          <td>${h(t(e.clientAr,e.clientEn)||"—")}</td>
          <td>${h(e.manager?t(e.manager.name,e.manager.nameEn||e.manager.name):"—")}</td>
          <td style="text-align:center;color:${e.health==="off_track"?"#dc2626":"#d97706"};">${h(A(e.health))}</td>
          <td style="text-align:center;">${e.progress}%</td>
        </tr>
      `).join("")}
    </table>
  `;F(`DARC_Risks_Register_${Date.now()}`,s),f(t("تم تصدير سجل المخاطر بنجاح ⚠️","Risk register exported successfully ⚠️"))}function pt(){if(!C("export_reports")&&!R()){f(x("permissionDenied"),!0);return}const{projects:l=[],documents:n=[]}=v.data||{},r=v.reportProjectFilter||"all",i=r==="all"?(n||[]).filter(e=>!e.deletedAt):(n||[]).filter(e=>e.projectId===r&&!e.deletedAt);if(!i.length){f(t("لا توجد مخططات مرفوعة لتصديرها.","No drawings to export."),!0);return}const a=I(),o=r==="all"?t("كافة مشاريع المحفظة","All Portfolio Projects"):l.find(e=>e.id===r)?.nameAr||r,s=`
    <table>
      <tr><th colspan="6" class="title">${h(a.displayName)} - ${t("سجل المخططات والمستندات الهندسية (Drawings Register)","Drawings & Blueprints Submittals Register")}</th></tr>
      <tr><td colspan="6" class="subtitle">${t("نطاق المشروع:","Project Scope:")} ${h(o)} | ${t("إجمالي المخططات:","Total Blueprints:")} ${i.length}</td></tr>
      <tr><td colspan="6" class="meta">${t("تاريخ التصدير:","Export Date:")} ${B(new Date)} ${O(new Date)}</td></tr>
      <tr>
        <th class="header">${t("اسم المخطط / الملف","File / Blueprint Name")}</th>
        <th class="header">${t("رمز المشروع","Project Code")}</th>
        <th class="header">${t("اسم المشروع","Project Name")}</th>
        <th class="header">${t("الحالة","Status")}</th>
        <th class="header">${t("حجم الملف","Size")}</th>
        <th class="header">${t("تاريخ الرفع","Upload Date")}</th>
      </tr>
      ${i.map(e=>{const p=l.find($=>$.id===e.projectId),c=e.size>1048576?(e.size/1048576).toFixed(1)+" MB":Math.round((e.size||0)/1024)+" KB";return`
          <tr>
            <td>${h(e.originalName||e.name||"Drawing.pdf")}</td>
            <td style="text-align:center;">${h(p?.code||"—")}</td>
            <td>${h(p?t(p.nameAr,p.nameEn):"—")}</td>
            <td style="text-align:center;">${h(A(e.status||"draft"))}</td>
            <td style="text-align:center;">${c}</td>
            <td style="text-align:center;">${z(e.createdAt,!0)}</td>
          </tr>
        `}).join("")}
    </table>
  `;F(`DARC_Drawings_Register_${Date.now()}`,s),f(t("تم تصدير سجل المخططات بنجاح 📑","Drawings register exported successfully 📑"))}export{ut as a,dt as i,pt as n,ct as r,ot as t};
