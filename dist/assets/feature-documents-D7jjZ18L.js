import{t as K}from"./rolldown-runtime-BQ-_32WO.js";import{Ht as g,It as Q,Nt as P,O as T,Pt as E,Q as z,Rt as H,_t as s,et as e,it as a,k as q,mt as A,nt as B,ot as F,pt as M,tt as C,wt as j,yt as N}from"./core-dragdrop-CSt3rKY6.js";var te=K({openUploadDrawingModal:()=>J,renderDocuments:()=>W});function W(){const $=g.data?.documents||[],x=g.data?.projects||[],b=g.data?.tasks||[],w=(g.searches?.documents||"").trim().toLowerCase(),m=g.docProjectFilter||"all",u=g.docDisciplineFilter||"all",t=g.docStatusFilter||"all",l=g.docSortOrder||"newest",r=g.docViewMode||"grid",o=g.data?.user?.id,f=N(),y=f||z("review_tasks")||z("approve_tasks")||z("edit_tasks"),d=z("upload_documents")||f,h=new Set(b.filter(i=>!i.deletedAt).map(i=>i.id)),k=new Set(x.filter(i=>!i.deletedAt).map(i=>i.id)),n=$.filter(i=>{if(i.deletedAt||i.projectId&&!k.has(i.projectId)||!i.projectId&&i.taskId&&!h.has(i.taskId)||m!=="all"&&i.projectId!==m||u!=="all"&&B(i)!==u||t!=="all"&&(i.status||"draft")!==t)return!1;if(w){const v=j(w),L=j(i.originalName||i.name||""),S=x.find(O=>O.id===i.projectId),U=j(S?.code||""),R=j(e(S?.nameAr,S?.nameEn||"")),V=j(F(i.originalName)||""),_=(A(i.originalName,i.mimeType).ext||"").toLowerCase();if(!(L.includes(v)||U.includes(v)||R.includes(v)||V.includes(v)||_.includes(v)))return!1}return!0});n.sort((i,v)=>l==="oldest"?new Date(i.createdAt||0)-new Date(v.createdAt||0):l==="name"?(i.originalName||"").localeCompare(v.originalName||""):l==="size"?(v.size||0)-(i.size||0):new Date(v.createdAt||0)-new Date(i.createdAt||0));const p=n.reduce((i,v)=>i+(v.size||0),0),c=p>1073741824?(p/1073741824).toFixed(1)+" GB":p>1048576?(p/1048576).toFixed(1)+" MB":Math.round(p/1024)+" KB",D=n.filter(i=>i.status==="approved").length,I=n.filter(i=>i.status==="review"||!i.status).length;return`
    <!-- Header -->
    <div class="page-head">
      <div>
        <p class="eyebrow">${e("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h1>${E("documents")}</h1>
        <p>${e("إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.","Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.")}</p>
      </div>
      <div class="page-actions">
        ${d?`
          <button class="btn btn-primary" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:7px;">
            ${s("upload",15)}
            <span>${e("رفع مخطط / ملف جديد","Upload Drawing / File")}</span>
          </button>
        `:""}
        <button class="btn btn-secondary btn-sm" data-action="go-to-trash" style="display:inline-flex;align-items:center;gap:6px;" title="${e("الانتقال لسلة المحذوفات لاستعراض واستعادة الملفات والمشاريع المحذوفة","Go to trash bin to review and restore deleted files and projects")}">
          ${s("trash",15)}
          <span>${e("سلة المهملات","Trash")}</span>
        </button>
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;display:inline-flex;align-items:center;gap:6px;">
          <span>${n.length} ${e("مخرج","files")}</span>
          <span style="opacity:0.6;">•</span>
          <span>${c}</span>
        </span>
      </div>
    </div>

    <!-- Quick Stats Metric Pills -->
    <div class="documents-stats-strip" style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
      <div class="mini-badge" style="padding:6px 12px;background:var(--surface);border:1px solid var(--line);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--teal);"></span>
        <span>${e("معتمد للتنفيذ:","Approved:")} <strong>${D}</strong></span>
      </div>
      <div class="mini-badge" style="padding:6px 12px;background:var(--surface);border:1px solid var(--line);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber);"></span>
        <span>${e("قيد المراجعة الفنية:","Under Review:")} <strong>${I}</strong></span>
      </div>
      <div class="mini-badge" style="padding:6px 12px;background:var(--surface);border:1px solid var(--line);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        ${s("folder",12)}
        <span>${e("المشاريع النشطة:","Active Projects:")} <strong>${x.filter(i=>!i.deletedAt).length}</strong></span>
      </div>
    </div>

    <!-- Unified Responsive View Toolbar -->
    <div class="view-toolbar documents-toolbar" style="gap:10px;flex-wrap:wrap;align-items:center;">
      <div class="view-toolbar-start documents-toolbar-start" style="flex:1 1 auto;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        
        <!-- 0ms Instant In-Place Search Box -->
        <div class="search-box documents-search-box" style="min-width:240px;flex:1 1 260px;">
          ${s("search",15)}
          <input 
            type="search" 
            placeholder="${e("بحث برقم المخطط أو الاسم أو الامتداد (DWG, PDF, RVT)...","Search by drawing name, code, or format (DWG, PDF, RVT)...")}" 
            value="${a(g.searches?.documents||"")}" 
            data-search="documents" 
            data-action="search-documents" 
          />
        </div>

        <!-- Project Selector -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${s("building",13)} ${e("المشروع:","Project:")}</span>
          <select data-action="doc-project-filter" class="filter-select select-compact documents-select" style="min-width:160px;">
            <option value="all" ${m==="all"?"selected":""}>${e("— جميع المشاريع —","— All Projects —")}</option>
            ${x.map(i=>`<option value="${a(i.id)}" ${m===i.id?"selected":""}>${a(i.code)} - ${a(e(i.nameAr,i.nameEn))}</option>`).join("")}
          </select>
        </div>

        <!-- Discipline Filter -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${s("layers",13)} ${e("التخصص:","Discipline:")}</span>
          <select data-action="doc-discipline-filter" class="filter-select select-compact documents-select" style="min-width:140px;">
            <option value="all" ${u==="all"?"selected":""}>${e("— كل التخصصات —","— All Disciplines —")}</option>
            <option value="architectural" ${u==="architectural"?"selected":""}>${e("معماري (Architectural)","Architectural")}</option>
            <option value="structural" ${u==="structural"?"selected":""}>${e("إنشائي (Structural)","Structural")}</option>
            <option value="mep" ${u==="mep"?"selected":""}>${e("كهروميكانيكي (MEP)","MEP Systems")}</option>
            <option value="boq" ${u==="boq"?"selected":""}>${e("كميات ومواصفات (BOQ)","BOQ & Specs")}</option>
            <option value="contracts" ${u==="contracts"?"selected":""}>${e("عقود وتراخيص (Contracts)","Contracts & Permits")}</option>
          </select>
        </div>

        <!-- Status Filter -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${s("shield",13)} ${e("الحالة:","Status:")}</span>
          <select data-action="doc-status-filter" class="filter-select select-compact documents-select" style="min-width:130px;">
            <option value="all" ${t==="all"?"selected":""}>${e("— كل الحالات —","— All Statuses —")}</option>
            <option value="approved" ${t==="approved"?"selected":""}>${e("معتمد للتنفيذ","Approved")}</option>
            <option value="review" ${t==="review"?"selected":""}>${e("قيد المراجعة","Under Review")}</option>
            <option value="draft" ${t==="draft"?"selected":""}>${e("مسودة عمل","Draft")}</option>
            <option value="superseded" ${t==="superseded"?"selected":""}>${e("مستبدل بنسخة أحدث","Superseded")}</option>
          </select>
        </div>

        <!-- Sort Order -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${s("clock",13)} ${e("الترتيب:","Sort:")}</span>
          <select data-action="doc-sort-order" class="filter-select select-compact documents-select" style="min-width:130px;">
            <option value="newest" ${l==="newest"?"selected":""}>${e("الأحدث رفعاً","Newest First")}</option>
            <option value="oldest" ${l==="oldest"?"selected":""}>${e("الأقدم رفعاً","Oldest First")}</option>
            <option value="name" ${l==="name"?"selected":""}>${e("الاسم (أ - ي)","Name (A-Z)")}</option>
            <option value="size" ${l==="size"?"selected":""}>${e("الحجم (الأكبر)","Size (Largest)")}</option>
          </select>
        </div>

      </div>

      <!-- View Switcher (Grid vs Table) -->
      <div class="view-toolbar-end documents-toolbar-end" style="display:flex;align-items:center;gap:8px;">
        <div class="doc-view-toggle" style="display:inline-flex;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:3px;gap:2px;">
          <button 
            type="button" 
            class="btn btn-sm ${r==="grid"?"active":""}" 
            data-action="toggle-doc-view" 
            data-view-mode="grid"
            style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:8px;font-weight:700;font-size:12px;border:none;cursor:pointer;transition:all 0.15s;${r==="grid"?"background:var(--teal);color:#fff;box-shadow:0 2px 6px rgba(13,98,105,0.3);":"background:transparent;color:var(--ink-soft);"}"
            title="${e("عرض الشبكة المعمارية","Visual Blueprint Grid")}"
          >
            ${s("grid",14)}
            <span>${e("شبكة","Grid")}</span>
          </button>
          <button 
            type="button" 
            class="btn btn-sm ${r==="table"?"active":""}" 
            data-action="toggle-doc-view" 
            data-view-mode="table"
            style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:8px;font-weight:700;font-size:12px;border:none;cursor:pointer;transition:all 0.15s;${r==="table"?"background:var(--teal);color:#fff;box-shadow:0 2px 6px rgba(13,98,105,0.3);":"background:transparent;color:var(--ink-soft);"}"
            title="${e("عرض الجدول التنفيذي","Engineering Data Table")}"
          >
            ${s("list",14)}
            <span>${e("جدول","Table")}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Active Documents Presentation Mode -->
    ${r==="grid"?Z(n,x,b,y,f,o):X(n,x,b,y,f,o)}
  `}function Z($,x,b,w,m,u){return $.length?`
    <div class="documents-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(295px, 1fr));gap:16px;margin-top:14px;">
      ${$.map(t=>{const l=x.find(c=>c.id===t.projectId),r=b.find(c=>c.id===t.taskId),o=A(t.originalName,t.mimeType),f=F(t.originalName)||"V1",y=B(t),d=M(y),h=t.size>1048576?(t.size/1048576).toFixed(1)+" MB":Math.round((t.size||0)/1024)+" KB",k=m||z("delete_documents")||t.uploaderId===u,n=q(t),p=T(t);return`
          <div class="doc-blueprint-card" data-doc-id="${a(t.id)}" style="background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 4px 16px rgba(0,0,0,0.03);transition:transform 0.2s cubic-bezier(0.16,1,0.3,1),box-shadow 0.2s cubic-bezier(0.16,1,0.3,1),border-color 0.2s;">
            
            <!-- Blueprint Thumbnail Banner -->
            <div class="doc-card-banner" data-action="preview-doc" data-doc-id="${a(t.id)}" style="height:148px;position:relative;background:var(--surface-soft);overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none;border-bottom:1px solid var(--line);">
              ${o.isImg&&n?`
                <img 
                  src="${a(n)}" 
                  alt="${a(t.originalName)}" 
                  loading="lazy" 
                  decoding="async" 
                  style="width:100%;height:100%;object-fit:cover;transition:transform 0.3s ease;" 
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
                />
                <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;flex-direction:column;gap:8px;">
                  <span style="background:${o.bg};color:${o.color};border:1px solid ${o.border};font-size:12px;font-weight:900;padding:6px 14px;border-radius:8px;">${o.ext}</span>
                </div>
              `:`
                <!-- Architectural Blueprint Vector Grid Backdrop -->
                <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(13,98,105,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,98,105,0.05) 1px, transparent 1px);background-size:14px 14px;pointer-events:none;"></div>
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;z-index:2;">
                  <span style="background:${o.bg};color:${o.color};border:1px solid ${o.border};font-size:13px;font-weight:900;padding:6px 16px;border-radius:8px;letter-spacing:0.8px;box-shadow:0 4px 12px rgba(0,0,0,0.04);">
                    ${o.ext}
                  </span>
                  <span style="font-size:11px;font-weight:700;color:var(--muted);">${o.label}</span>
                </div>
              `}

              <!-- Top Floating Badges (Discipline & Version) -->
              <div style="position:absolute;top:10px;left:10px;right:10px;display:flex;align-items:center;justify-content:space-between;pointer-events:none;z-index:3;">
                <span style="background:${d.bg};color:${d.color};border:1px solid ${d.border};font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);">
                  ${e(d.labelAr,d.labelEn)}
                </span>
                <span class="version-badge" style="background:rgba(15,23,42,0.78);color:#ffffff;border:1px solid rgba(255,255,255,0.15);font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);">
                  ${f}
                </span>
              </div>

              <!-- Hover Eye Overlay Button -->
              <div class="doc-card-hover-overlay" style="position:absolute;inset:0;background:rgba(8,14,18,0.45);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);opacity:0;transition:opacity 0.2s ease;display:flex;align-items:center;justify-content:center;z-index:4;">
                <span class="btn btn-sm" style="background:#ffffff;color:var(--ink);font-weight:800;font-size:12px;padding:6px 14px;border-radius:8px;box-shadow:0 4px 14px rgba(0,0,0,0.25);display:inline-flex;align-items:center;gap:6px;">
                  ${s("eye",14)} <span>${e("معاينة سريعة","Quick Preview")}</span>
                </span>
              </div>
            </div>

            <!-- Card Body -->
            <div class="doc-card-body" style="padding:14px 16px;display:flex;flex-direction:column;gap:10px;flex:1;">
              
              <!-- Title -->
              <div>
                <h4 
                  data-action="preview-doc" 
                  data-doc-id="${a(t.id)}" 
                  style="margin:0;font-size:13.5px;font-weight:800;color:var(--ink);cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;" 
                  title="${a(t.originalName)}"
                >
                  ${a(t.originalName)}
                </h4>
                <div style="display:flex;align-items:center;gap:6px;margin-top:3px;font-size:11px;color:var(--muted);">
                  <span>${h}</span>
                  <span>•</span>
                  <span>${C(t.createdAt,!0)}</span>
                </div>
              </div>

              <!-- Project & Task Attribution Tags -->
              <div style="display:flex;flex-direction:column;gap:5px;font-size:11.5px;">
                <div style="display:flex;align-items:center;gap:6px;color:var(--ink-soft);">
                  ${s("building",12)}
                  ${l?`
                    <span 
                      data-action="open-project" 
                      data-project-id="${a(l.id)}" 
                      style="font-weight:700;color:var(--teal);cursor:pointer;text-decoration:none;"
                    >
                      ${a(l.code)} - ${a(e(l.nameAr,l.nameEn))}
                    </span>
                  `:'<span style="color:var(--muted);">—</span>'}
                </div>

                <div style="display:flex;align-items:center;gap:6px;color:var(--muted);">
                  ${s("checklist",12)}
                  ${r?`
                    <span 
                      data-action="open-task" 
                      data-task-id="${a(r.id)}" 
                      style="cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink-soft);"
                    >
                      ${a(e(r.titleAr,r.titleEn))}
                    </span>
                  `:`<span>${e("مخطط عام للمشروع","General Project Drawing")}</span>`}
                </div>
              </div>

              <!-- Approval Status Selector / Badge -->
              <div style="margin-top:auto;padding-top:6px;">
                ${w?`
                  <select 
                    class="select-compact doc-status-select" 
                    data-action="change-doc-status" 
                    data-doc-id="${a(t.id)}" 
                    style="width:100%;font-size:11.5px;font-weight:700;padding:5px 10px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;"
                  >
                    <option value="draft" ${t.status==="draft"?"selected":""}>${e("مسودة عمل (Draft)","Draft")}</option>
                    <option value="review" ${t.status==="review"?"selected":""}>${e("قيد المراجعة الفنية (Under Review)","Under Review")}</option>
                    <option value="approved" ${t.status==="approved"?"selected":""}>${e("معتمد للتنفيذ (Approved)","Approved")}</option>
                    <option value="superseded" ${t.status==="superseded"?"selected":""}>${e("مستبدل بنسخة أحدث (Superseded)","Superseded")}</option>
                  </select>
                `:`
                  <span class="status-badge ${a(t.status||"draft")}" style="font-size:11px;display:inline-block;padding:3px 8px;border-radius:6px;">
                    ${a(P(t.status||"draft"))}
                  </span>
                `}
              </div>

            </div>

            <!-- Card Bottom Actions Bar -->
            <div class="doc-card-actions" style="padding:8px 14px;border-top:1px solid var(--line);background:var(--surface-soft);display:flex;align-items:center;justify-content:space-between;gap:6px;">
              <div style="display:inline-flex;align-items:center;gap:6px;">
                <button 
                  type="button" 
                  class="btn btn-sm btn-ghost" 
                  data-action="preview-doc" 
                  data-doc-id="${a(t.id)}" 
                  style="padding:4px 8px;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px;color:var(--teal);"
                  title="${e("معاينة المخطط في المشغل المدمج","Preview Drawing")}"
                >
                  ${s("eye",13)}
                  <span>${e("معاينة","Preview")}</span>
                </button>

                <a 
                  href="${a(p)}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-sm btn-ghost" 
                  style="padding:4px 8px;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px;color:var(--ink-soft);text-decoration:none;"
                  title="${e("فتح في Google Drive","Open in Google Drive")}"
                >
                  ${s("external",12)}
                  <span>Drive</span>
                </a>
              </div>

              <div style="display:inline-flex;align-items:center;gap:4px;">
                <button 
                  type="button" 
                  class="btn btn-sm btn-ghost" 
                  data-action="download-doc" 
                  data-doc-id="${a(t.id)}" 
                  style="padding:5px;color:var(--blue);" 
                  title="${e("تحميل المخطط مباشرة","Download")}"
                >
                  ${s("download",14)}
                </button>

                ${k?`
                  <button 
                    type="button" 
                    class="btn btn-sm btn-ghost" 
                    data-action="delete-doc" 
                    data-doc-id="${a(t.id)}" 
                    style="padding:5px;color:var(--red);" 
                    title="${e("نقل لسلة المهملات","Move to trash")}"
                  >
                    ${s("trash",14)}
                  </button>
                `:""}
              </div>
            </div>

          </div>
        `}).join("")}
    </div>
  `:G()}function X($,x,b,w,m,u){return $.length?`
    <div class="panel" style="margin-top:14px;">
      <div class="table-wrap">
        <table class="data-table documents-table">
          <thead>
            <tr>
              <th>${e("المخطط / المخرج الهندسي","Drawing / Deliverable")}</th>
              <th>${E("projects")}</th>
              <th>${E("tasks")}</th>
              <th>${e("الإصدار","Revision")}</th>
              <th>${e("التخصص","Discipline")}</th>
              <th>${e("الحالة الهندسية","Status")}</th>
              <th>${e("الحجم","Size")}</th>
              <th>${e("تاريخ الرفع","Upload Date")}</th>
              <th style="text-align:end;">${e("الإجراءات","Actions")}</th>
            </tr>
          </thead>
          <tbody>
            ${$.map(t=>{const l=x.find(p=>p.id===t.projectId),r=b.find(p=>p.id===t.taskId),o=A(t.originalName,t.mimeType),f=F(t.originalName)||"V1",y=B(t),d=M(y),h=t.size>1048576?(t.size/1048576).toFixed(1)+" MB":Math.round((t.size||0)/1024)+" KB",k=m||z("delete_documents")||t.uploaderId===u,n=T(t);return`
                <tr data-doc-id="${a(t.id)}" class="doc-row">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${a(t.id)}">
                      <span class="file-format-badge" style="background:${o.bg};color:${o.color};border:1px solid ${o.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${o.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${a(t.originalName)}">
                          ${a(t.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${o.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${l?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${a(l.id)}">${a(l.code)}</span>`:"—"}
                  </td>
                  <td>
                    ${r?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${a(r.id)}">${a(e(r.titleAr,r.titleEn))}</span>`:`<span style="color:var(--muted);font-size:11px;">${e("مخطط عام","General Drawing")}</span>`}
                  </td>
                  <td>
                    <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                      ${f}
                    </span>
                  </td>
                  <td>
                    <span style="background:${d.bg};color:${d.color};border:1px solid ${d.border};font-size:10px;font-weight:800;padding:2px 7px;border-radius:6px;">
                      ${e(d.labelAr,d.labelEn)}
                    </span>
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${w?`
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${a(t.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${t.status==="draft"?"selected":""}>${e("مسودة عمل","Draft")}</option>
                          <option value="review" ${t.status==="review"?"selected":""}>${e("قيد المراجعة","Review")}</option>
                          <option value="approved" ${t.status==="approved"?"selected":""}>${e("معتمد للتنفيذ","Approved")}</option>
                          <option value="superseded" ${t.status==="superseded"?"selected":""}>${e("مستبدل بنسخة أحدث","Superseded")}</option>
                        </select>
                      `:`
                        <span class="status-badge ${a(t.status||"draft")}" style="font-size:11px;">
                          ${a(P(t.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${h}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${C(t.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${a(t.id)}" style="padding:5px;" title="${e("معاينة","Preview")}">
                        ${s("eye",14)}
                      </button>
                      <a href="${a(n)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" style="padding:5px;color:var(--teal);text-decoration:none;" title="${e("فتح في Google Drive","Open in Google Drive")}">
                        ${s("external",13)}
                      </a>
                      <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${a(t.id)}" style="padding:5px;color:var(--blue);" title="${e("تحميل المخطط","Download")}">
                        ${s("download",14)}
                      </button>
                      ${k?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${a(t.id)}" style="padding:5px;color:var(--red);" title="${e("نقل لسلة المهملات","Move to trash")}">
                          ${s("trash",14)}
                        </button>
                      `:""}
                    </div>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `:G()}function G(){return`
    <div class="empty" style="padding:60px 20px;background:var(--surface);border:1px dashed var(--line);border-radius:14px;margin-top:16px;text-align:center;">
      <div style="color:var(--teal);margin-bottom:12px;">${s("document",40)}</div>
      <h3 style="margin:0 0 6px;font-size:16px;font-weight:800;color:var(--ink);">${e("لا توجد مخططات أو ملفات مطابقة","No blueprints or documents found")}</h3>
      <p style="margin:0 0 16px;font-size:13px;color:var(--muted);max-width:440px;margin-inline:auto;">
        ${e("لم يتم العثور على أي ملفات تطابق معايير البحث والفلترة المحددة. يمكنك تعديل خيارات التصفية أو رفع مخرج هندسي جديد.","No deliverables match the specified filters. Try adjusting your search or upload a new engineering drawing.")}
      </p>
      ${z("upload_documents")||N()?`
        <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;">
          ${s("upload",14)}
          <span>${e("رفع مخطط جديد الآن","Upload New Drawing")}</span>
        </button>
      `:""}
    </div>
  `}function J($=null){const x=g.data?.projects||[],b=$||x[0]?.id||"",w=g.data?.tasks?.filter(t=>t.projectId===b&&!t.deletedAt)||[],m=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${e("المشروع المستهدف *","Target Project *")}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${x.map(t=>`<option value="${a(t.id)}" ${t.id===b?"selected":""}>${a(t.code)} - ${a(e(t.nameAr,t.nameEn))}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${e("المهمة الهندسية (اختياري)","Engineering Task (Optional)")}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${e("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>
            ${w.map(t=>`<option value="${a(t.id)}">${a(e(t.titleAr,t.titleEn))}</option>`).join("")}
          </select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${e("التخصص الهندسي","Engineering Discipline")}</label>
          <select id="drawing-upload-discipline" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="architectural">${e("معماري (Architectural)","Architectural")}</option>
            <option value="structural">${e("إنشائي (Structural)","Structural")}</option>
            <option value="mep">${e("كهروميكانيكي (MEP)","MEP")}</option>
            <option value="boq">${e("كميات ومواصفات (BOQ & Specs)","BOQ & Specs")}</option>
            <option value="contracts">${e("عقود وتراخيص (Contracts)","Contracts & Permits")}</option>
            <option value="general">${e("مستندات عامة","General")}</option>
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${e("الحالة الهندسية المبدئية","Initial Approval Status")}</label>
          <select id="drawing-upload-status" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="draft">${e("مسودة عمل (Draft)","Draft")}</option>
            <option value="review" selected>${e("قيد المراجعة الفنية (Under Review)","Under Review")}</option>
            <option value="approved">${e("معتمد للتنفيذ (Approved for Construction)","Approved for Construction")}</option>
          </select>
        </div>
      </div>

      <!-- File Upload Dropzone -->
      <div class="field">
        <label style="font-size:12px;font-weight:700;">${e("الملفات والمخططات *","Drawings & Files *")}</label>
        <div id="drawing-dropzone" style="border:2px dashed var(--line);border-radius:12px;padding:24px 16px;text-align:center;background:var(--surface);cursor:pointer;transition:border-color 0.2s;">
          <div style="color:var(--teal);margin-bottom:8px;">${s("upload",28)}</div>
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:var(--ink);">${e("اسحب وأفلت المخططات هنا أو انقر للاختيار","Drag & drop drawings here or click to browse")}</p>
          <p style="margin:0;font-size:11px;color:var(--muted);">${e("يدعم ملفات هندسية عملاقة: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (حتى 100GB برفع مستأنف فائق السرعة)","Supports massive engineering files: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (Up to 100GB with resumable chunks)")}</p>
          <input type="file" multiple id="drawing-file-input" style="display:none;" />
        </div>
        <div id="drawing-selected-files-list" style="margin-top:10px;display:grid;gap:6px;"></div>
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;">
        <button type="button" class="btn btn-secondary btn-sm" data-action="close-modal">${e("إلغاء","Cancel")}</button>
        <button type="submit" class="btn btn-primary btn-sm" id="start-drawing-upload-btn" style="font-weight:700;" disabled>
          ${s("upload",14)} <span>${e("بدء الرفع المباشر","Start Resumable Upload")}</span>
        </button>
      </div>
    </form>
  `,u=document.getElementById("modal-root");if(u){u.innerHTML=H(e("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),e("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),m,"upload-drawing","modal-lg");const t=document.getElementById("drawing-upload-project"),l=document.getElementById("drawing-upload-task");t&&l&&t.addEventListener("change",()=>{const n=t.value,p=g.data?.tasks?.filter(c=>c.projectId===n&&!c.deletedAt)||[];l.innerHTML=`<option value="">${e("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+p.map(c=>`<option value="${a(c.id)}">${a(e(c.titleAr,c.titleEn))}</option>`).join("")});const r=document.getElementById("drawing-dropzone"),o=document.getElementById("drawing-file-input"),f=document.getElementById("drawing-selected-files-list"),y=document.getElementById("start-drawing-upload-btn");let d=[];const h=()=>{if(!d.length){f.innerHTML="",y.disabled=!0;return}y.disabled=!1,f.innerHTML=d.map((n,p)=>{const c=A(n.name,n.type),D=n.size>1048576?(n.size/1048576).toFixed(1)+" MB":Math.round(n.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${c.bg};color:${c.color};border:1px solid ${c.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${c.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${a(n.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${D})</span>
            </div>
            <button type="button" data-file-remove="${p}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),f.querySelectorAll("[data-file-remove]").forEach(n=>{n.addEventListener("click",()=>{const p=parseInt(n.dataset.fileRemove,10);d.splice(p,1),h()})})};r&&o&&(r.addEventListener("click",()=>o.click()),o.addEventListener("change",()=>{o.files?.length&&(d=Array.from(o.files),h())}),r.addEventListener("dragover",n=>{n.preventDefault(),r.style.borderColor="var(--teal)"}),r.addEventListener("dragleave",()=>{r.style.borderColor="var(--line)"}),r.addEventListener("drop",n=>{n.preventDefault(),r.style.borderColor="var(--line)",n.dataTransfer?.files?.length&&(d=Array.from(n.dataTransfer.files),h())}));const k=document.getElementById("upload-drawing-form");k&&k.addEventListener("submit",async n=>{if(n.preventDefault(),!d.length)return;const p=t.value,c=l.value||null,D=document.getElementById("drawing-upload-discipline")?.value||"architectural",I=document.getElementById("drawing-upload-status")?.value||"draft";Q(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:d,projectId:p,taskId:c,discipline:D,status:I})})}}export{J as n,te as t};
