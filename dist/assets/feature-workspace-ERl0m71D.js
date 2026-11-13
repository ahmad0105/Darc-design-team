import{t as ge}from"./rolldown-runtime-BQ-_32WO.js";import{Bt as T,Dt as U,Ht as g,It as fe,Nt as D,Ot as k,Pt as x,Q as A,Rt as te,St as me,T as ve,Tt as G,U as xe,Z as S,_t as v,at as X,ct as H,dt as F,et as e,it as a,lt as ae,n as L,tt as _,w as ue,wt as ee,x as be,y as ye,yt as N}from"./core-dragdrop-Dq52lIN0.js";import{s as he}from"./feature-settings-C732sNQP.js";var Ce=ge({buildProjectMemberChipsHtml:()=>J,checkProjectCodeStatus:()=>Y,exportPortfolioPDF:()=>Ee,exportPortfolioXLS:()=>Pe,exportProjectPDF:()=>ze,exportProjectXLS:()=>De,exportXLS:()=>X,getCompanyBranding:()=>F,getDaysLeftBadge:()=>W,getNextAvailableProjectCode:()=>q,getProjectTeam:()=>$e,getProjectTeamData:()=>R,openCloneModal:()=>je,openProjectModal:()=>ke,projectCard:()=>oe,renderInPagePrintModal:()=>K,renderProjectCardTeamAvatars:()=>se,renderProjectDetail:()=>we,renderProjectOverviewTab:()=>re,renderProjectTeamAvatars:()=>ie,renderProjectTimelineBar:()=>ne,renderProjects:()=>le});function W(t){if(!t)return"";const i=G(t);if(!i||isNaN(i.getTime()))return"";const o=Math.ceil((i-new Date)/864e5);if(isNaN(o))return"";let n="var(--mint-strong)",r="var(--mint)",s="";return o<0?(n="var(--red)",r="var(--red-soft)",s=e(`متأخر ${Math.abs(o)} يوم`,`${Math.abs(o)}d overdue`)):o===0?(n="var(--red)",r="var(--red-soft)",s=e("يستحق اليوم","Due today")):o<=2?(n="var(--red)",r="var(--red-soft)",s=e(`باقي ${o} يوم`,`${o}d left`)):o<=7?(n="var(--amber)",r="var(--amber-soft)",s=e(`باقي ${o} أيام`,`${o}d left`)):(n="var(--mint-strong)",r="var(--mint)",s=e(`باقي ${o} يوم`,`${o}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${n};background:${r};border:1px solid currentColor;">${v("clock",11)} ${s}</span>`}function q(t=null){const i=t?String(t).replace(/\D/g,""):"",o=i.length>=2?i.slice(-2):String(new Date().getFullYear()).slice(-2),n=g.data?.projects||[],r=Array.isArray(g.trash)?g.trash.filter(l=>l.type==="project"||l.code):[],s=[...n,...r];let m=0,d=3;for(const l of s){if(!l.code)continue;const h=String(l.code).trim().match(/^DARC-(\d{2})-(\d+)$/i);if(h&&h[1]===o){const f=h[2];f.length>d&&(d=f.length);const b=parseInt(f,10);!isNaN(b)&&b>m&&(m=b)}}return`DARC-${o}-${String(m+1).padStart(d,"0")}`}function Y(t,i=null){if(!t||!String(t).trim())return{valid:!1,message:e("كود المشروع مطلوب.","Project code is required."),status:"error"};const o=String(t).trim().toUpperCase(),n=(g.data?.projects||[]).filter(s=>!s.deletedAt&&!s.deleted_at).find(s=>s.code&&s.code.toUpperCase()===o&&s.id!==i);if(n)return{valid:!1,status:"error",message:e(`الكود مستخدم بالفعل لمشروع: "${e(n.nameAr,n.nameEn)}"`,`Code is already used by: "${e(n.nameAr,n.nameEn)}"`)};const r=(Array.isArray(g.trash)?g.trash.filter(s=>(s.type==="project"||s.code)&&s.id!==i):[]).find(s=>s.code&&s.code.toUpperCase()===o);return r?{valid:!1,status:"warning",message:e(`محجوز لمشروع في سلة المحذوفات (فترة الـ 30 يوماً): "${e(r.nameAr,r.nameEn)}"`,`Reserved for a project in trash (30-day window): "${e(r.nameAr,r.nameEn)}"`)}:{valid:!0,status:"success",message:e("كود مميز ومتاح للاستخدام","Unique and available")}}function R(t){if(!t)return{internalMembers:[],externalMembers:[]};const i=g.data?.users||[],o=(g.data?.tasks||[]).filter(s=>s.projectId===t.id&&!s.deletedAt&&!s.deleted_at),n=new Set,r=new Set;return t.managerId&&n.add(t.managerId),Array.isArray(t.memberIds)&&t.memberIds.forEach(s=>s&&n.add(s)),Array.isArray(t.members)&&t.members.forEach(s=>{const m=typeof s=="string"?s:s.userId||s.id||s.user_id;m&&n.add(m)}),o.forEach(s=>{s.assigneeId&&n.add(s.assigneeId),(s.customFields?.additionalAssignees||s.customFields?.additional_assignees||[]).forEach(m=>n.add(m)),(s.customFields?.externalAssignees||s.customFields?.external_assignees||[]).forEach(m=>{m&&typeof m=="string"&&m.trim()&&r.add(m.trim())})}),{internalMembers:Array.from(n).map(s=>i.find(m=>m.id===s)).filter(Boolean),externalMembers:Array.from(r)}}function $e(t){return R(t).internalMembers}function ie(t,i=4,o=!0,n=[]){if((!t||!t.length)&&(!n||!n.length))return`<span style="font-size:11px;color:var(--muted);">${e("لا يوجد فريق محدد","No team assigned")}</span>`;const r=(t||[]).slice(0,i),s=(t||[]).length-i,m=(t||[]).map(l=>e(l.name,l.nameEn||l.name)).join("، ");let d='<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">';return r.forEach(l=>{const h=e(l.name,l.nameEn||l.name),f=o?`data-action="filter-by-member" data-member-id="${a(l.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:'style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"';d+=`
      <span class="team-member-chip" ${f} title="${a(h)} (${a(U(l))})">
        ${S(l,"mini-avatar")}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${a(h)}</span>
      </span>
    `}),s>0&&(d+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${a(m)}">+${s} ${e("آخرين","more")}</span>`),n&&n.length>0&&(d+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;display:inline-flex;align-items:center;gap:3px;" title="${a(n.join("، "))}">${v("globe",11)} +${n.length} ${e("خارجي","ext")}</span>`),d+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${e("فريق العمل الداخلي","Internal Team")} (${(t||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(t||[]).map(l=>`
        <div ${o?`data-action="filter-by-member" data-member-id="${a(l.id)}" title="${a(e("فلترة مهام "+(l.name||""),"Filter tasks of "+(l.nameEn||l.name||"")))}"`:""} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${o?"cursor:pointer;transition:all 0.15s;":""}" ${o?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:""}>
          ${S(l,"micro-avatar")}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${a(e(l.name,l.nameEn||l.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${a(U(l))}</span>
          </div>
        </div>
      `).join("")}
    </div>
    
    ${n&&n.length>0?`
      <hr style="border:0;border-top:1px dashed var(--line);margin:8px 0 6px;" />
      <strong style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--teal);margin-bottom:6px;">${v("globe",12)} ${e("الشركاء والمتعاونون الخارجيون","External Partners")} (${n.length})</strong>
      <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin;">
        ${n.map(l=>`
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink);background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;white-space:nowrap;">
            <span style="display:inline-flex;align-items:center;color:var(--teal);">${v("globe",11)}</span>
            <span style="font-weight:500;">${a(l)}</span>
          </div>
        `).join("")}
      </div>
    `:""}

    ${o?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);display:flex;align-items:center;gap:4px;">${v("bulb",11)} <span>${e("اضغط على أي عضو لفلترة مهامه","Click member to filter tasks")}</span></div>`:""}
  </div>`,d+="</div>",d}function ne(t){if(!t.dueDate)return"";const i=G(t.dueDate);if(!i||isNaN(i.getTime()))return"";const o=new Date(t.startDate||t.createdAt||Date.now()-2592e6),n=new Date,r=i.getTime()-o.getTime();let s=0;r>0&&!isNaN(r)&&(s=Math.min(100,Math.max(0,Math.round((n.getTime()-o.getTime())/r*100))));const m=n>i,d=m?"var(--red)":s>=80&&!m?"var(--amber)":"var(--blue)";return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;flex-wrap:wrap;gap:6px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${v("clock",12)}
          <strong>${e("المؤشر الزمني للمشروع","Project Schedule Elapsed")}</strong>: 
          <span style="color:${d};font-weight:bold;">${m?e("انتهى موعد التسليم!","Deadline passed!"):e(`مضى ${s}% من الوقت`,`${s}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;display:inline-flex;align-items:center;gap:4px;">${_(t.startDate)} <span style="opacity:0.6;">→</span> ${_(t.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${s}%;background:${d};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function se(t=[],i=[],o=3){const n=t.length+i.length;if(n===0)return'<span style="font-size:11px;color:var(--muted);">—</span>';const r=t.slice(0,o),s=n-r.length;[...t.map(d=>e(d.name,d.nameEn||d.name)),...i].join("، ");let m=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${e("عرض فريق العمل","View Team")}">`;return m+='<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">',r.forEach((d,l)=>{m+=`
      <div style="margin-inline-start:${l===0?"0":"-8px"};position:relative;z-index:${10-l};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${S(d,"mini-avatar")}
      </div>
    `}),s>0&&(m+=`
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${s}
      </div>
    `),i&&i.length>0&&s<=0&&(m+=`<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;display:inline-flex;align-items:center;">${v("globe",10)}</span>`),m+="</div>",m+=`
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${e("فريق العمل","Team Members")}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${n}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${t.map(d=>`
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${S(d,"micro-avatar")}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a(e(d.name,d.nameEn||d.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${a(U(d))}</span>
            </div>
          </div>
        `).join("")}
      </div>
      ${i&&i.length>0?`
        <div style="margin-top:8px;padding-top:6px;border-top:1px dashed var(--line);">
          <span style="font-size:9.5px;font-weight:700;color:var(--teal);display:flex;align-items:center;gap:4px;margin-bottom:4px;">${v("globe",11)} ${e("الشركاء الخارجيون","External Partners")} (${i.length})</span>
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${i.map(d=>`
              <div style="font-size:10.5px;color:var(--ink-soft);padding:2px 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                • ${a(d)}
              </div>
            `).join("")}
          </div>
        </div>
      `:""}
    </div>
  `,m+="</div>",m}function oe(t){const{internalMembers:i,externalMembers:o}=R(t),n=t.manager||(g.data?.users||[]).find(m=>m.id===t.managerId),r=W(t.dueDate),s=e(t.descriptionAr||t.clientAr,t.descriptionEn||t.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;cursor:pointer;" data-action="open-project" data-project-id="${a(t.id)}">
        <span class="project-card-symbol">${v("building",19)}</span>
        <div style="min-width:0;flex:1;">
          <span class="eyebrow" style="font-size:10px;margin-bottom:2px;display:block;">${a(t.code)}</span>
          <h3 class="project-card-title" title="${a(e(t.nameAr,t.nameEn))}">${a(e(t.nameAr,t.nameEn))}</h3>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;align-self:flex-start;">
        ${t._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${e("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${e("معلقة","Pending")}</span>`:""}
        <span class="status-badge ${a(t.health)}">${a(D(t.health))}</span>
      </div>
    </div>
    
    <p class="project-card-desc" title="${a(s||"")}">
      ${s?a(s):`<span style="color:var(--muted);font-style:italic;">${e("لا يوجد وصف مسجل لهذا المشروع","No description registered")}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${S(n,"mini-avatar")}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${x("manager")}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a(n?e(n.name,n.nameEn||n.name):"—")}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${x("team")} (${i.length+o.length})</span>
        ${se(i,o,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${x("deadline")}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <strong>${t.dueDate?_(t.dueDate,!0):"—"}</strong>
          ${r}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${t.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${t.health==="off_track"?"red":t.health==="at_risk"?"amber":""}" style="width:${t.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${a(t.id)}">
      ${x("viewDetails")} ${v(g.lang==="ar"?"arrowLeft":"arrow",13)}
    </button>
  </article>`}function re(t,i,o,n=[]){const r=t.manager||(g.data?.users||[]).find(l=>l.id===t.managerId),s=i.filter(l=>l.status==="done").length,m=i.filter(l=>l.status==="in_progress").length,d=i.filter(me).length;return`
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${e("إجمالي المهام","Total Tasks")}</span>
          <div class="metric-value">${i.length}</div>
          <span class="metric-note up">${s} ${x("done")}</span>
        </div>
        <div class="metric-card blue" style="padding:14px 18px;">
          <span class="metric-label">${e("قيد التنفيذ","In Progress")}</span>
          <div class="metric-value">${m}</div>
          <span class="metric-note">${e("عمل جارٍ","Active work")}</span>
        </div>
        <div class="metric-card ${d?"red":"teal"}" style="padding:14px 18px;">
          <span class="metric-label">${x("overdue")}</span>
          <div class="metric-value">${d}</div>
          <span class="metric-note ${d?"alert":"up"}">${d?e("تحتاج تدخلاً عاجلاً","Needs urgent action"):e("لا يوجد تأخير","On track")}</span>
        </div>
        <div class="metric-card amber" style="padding:14px 18px;">
          <span class="metric-label">${e("فريق العمل","Team Size")}</span>
          <div class="metric-value">${o.length+(n?.length||0)}</div>
          <span class="metric-note">${e("أعضاء مساهمون","Active contributors")}</span>
        </div>
      </div>

      <!-- Schedule Timeline Bar -->
      ${ne(t)}

      <!-- Details Grid -->
      <div class="project-details-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 280px), 1fr));gap:16px;">
        <!-- Left: Project Scope & Client -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${v("document",16)}
            ${e("نطاق وتفاصيل المشروع","Project Scope & Details")}
          </h3>
          <p style="color:var(--ink-soft);font-size:13px;line-height:1.7;margin-bottom:18px;">
            ${a(t.descriptionAr||t.descriptionEn||e("لا يوجد وصف مسجل لهذا المشروع حالياً.","No description available for this project."))}
          </p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:var(--surface-soft);padding:14px;border-radius:10px;border:1px solid var(--line);">
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${x("client")}</span>
              <strong style="font-size:13px;color:var(--ink);">${a(e(t.clientAr,t.clientEn)||"—")}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${x("lifecycle")}</span>
              <strong style="font-size:13px;color:var(--ink);">${a(D(t.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${x("startDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${_(t.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${x("dueDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${_(t.dueDate,!0)}</strong>
            </div>
          </div>
        </div>

        <!-- Right: Team & Leadership -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${v("users",16)}
            ${e("القيادة وفريق العمل","Leadership & Team")}
          </h3>

          <!-- Manager card -->
          <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:10px;margin-bottom:16px;background:var(--surface);">
            ${S(r)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${x("manager")}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${a(r?e(r.name,r.nameEn||r.name):"—")}</strong>
              <span style="font-size:11px;color:var(--muted);">${a(r?.email||"")}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${e("أعضاء الفريق الداخلي:","Internal Team Members:")}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${o.map(l=>{const h=i.filter(f=>f.assigneeId===l.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${S(l,"mini-avatar")}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${a(e(l.name,l.nameEn||l.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${a(U(l))}</span>
                    </div>
                  </div>
                  <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${h} ${x("tasks")}</span>
                </div>
              `}).join("")}
          </div>

          ${n&&n.length>0?`
            <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0 10px;" />
            <span style="font-size:11px;color:var(--teal);font-weight:bold;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              ${v("globe",13)} ${e("الشركاء والمتعاونون الخارجيون:","External Partners & Collaborators:")}
            </span>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:180px;overflow-y:auto;">
              ${n.map(l=>{const h=i.filter(f=>(f.customFields?.externalAssignees||f.customFields?.external_assignees||[]).includes(l)).length;return`
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="color:var(--teal);display:inline-flex;align-items:center;">${v("globe",14)}</span>
                      <div>
                        <strong style="display:block;font-size:12px;color:var(--ink);">${a(l)}</strong>
                        <span style="font-size:10px;color:var(--muted);">${e("شريك / جهة خارجية","External Partner")}</span>
                      </div>
                    </div>
                    <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${h} ${x("tasks")}</span>
                  </div>
                `}).join("")}
            </div>
          `:""}
        </div>
      </div>
    </div>
  `}function le(){const t=ee(g.searches?.projects||"");let i=(g.data?.projects||[]).filter(n=>!n.deletedAt&&!n.deleted_at).filter(n=>!t||ee(`${n.nameAr||""} ${n.nameEn||""} ${n.code||""} ${n.clientAr||""} ${n.clientEn||""}`).includes(t));const o=g.projectSort||"default";return o==="alpha-asc"?i.sort((n,r)=>(e(n.nameAr,n.nameEn)||"").localeCompare(e(r.nameAr,r.nameEn)||"",g.lang==="ar"?"ar":"en")):o==="alpha-desc"?i.sort((n,r)=>(e(r.nameAr,r.nameEn)||"").localeCompare(e(n.nameAr,n.nameEn)||"",g.lang==="ar"?"ar":"en")):o==="progress-asc"?i.sort((n,r)=>(Number(n.progress)||0)-(Number(r.progress)||0)):o==="progress-desc"&&i.sort((n,r)=>(Number(r.progress)||0)-(Number(n.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${e("المحفظة","PORTFOLIO")}</p><h1>${x("projects")}</h1><p>${e("كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.","One view for every project: health, progress, team, and next deadline.")}</p></div><div class="page-actions">${A("create_projects")?`<button class="btn btn-primary" data-action="new-project">${v("plus",15)} ${x("addProject")}</button>`:""}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${v("search",15)}<input data-search="projects" value="${a(g.searches.projects)}" placeholder="${x("search")}" /></div><div class="sort-box"><span>${e("الترتيب:","Sort:")}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${o==="default"?"selected":""}>${e("الافتراضي","Default")}</option><option value="alpha-asc" ${o==="alpha-asc"?"selected":""}>${e("أبجدياً (أ - ي)","Alphabetical (A - Z)")}</option><option value="alpha-desc" ${o==="alpha-desc"?"selected":""}>${e("أبجدياً (ي - أ)","Alphabetical (Z - A)")}</option><option value="progress-asc" ${o==="progress-asc"?"selected":""}>${e("نسبة الإنجاز (تصاعدي 0% ← 100%)","Progress (Low to High)")}</option><option value="progress-desc" ${o==="progress-desc"?"selected":""}>${e("نسبة الإنجاز (تنازلي 100% ← 0%)","Progress (High to Low)")}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${i.length} ${e("مشاريع","projects")}</span></div></div>${i.length?`<div class="project-cards">${i.map(oe).join("")}</div>`:`<section class="panel"><div class="empty">${v("building",18)}<span>${x("noProjects")}</span></div></section>`}`}function we(){const t=g.data?.projects?.find(b=>b.id===g.activeProjectId&&!b.deletedAt&&!b.deleted_at);if(!t)return g.view="projects",le();const i=(g.data?.tasks||[]).filter(b=>b.projectId===t.id),{internalMembers:o,externalMembers:n}=R(t),r=g.projectTab||"tasks",s=g.projectMemberFilter||null,m=s?i.filter(b=>b.assigneeId===s||(b.customFields?.additionalAssignees||b.customFields?.additional_assignees||[]).includes(s)):i,d=s?g.data?.users?.find(b=>b.id===s):null;let l="";if(r==="overview")l=re(t,i,o,n);else if(r==="tasks"){const b=g.projectTaskSort||ye();l=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${x("projectTasks")} ${s?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${e("مهام","Tasks of")}: ${a(e(d?.name,d?.nameEn||d?.name))})</span>`:""}</h2>
            <p class="panel-subtitle">${e("توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.","Tasks grouped by current workflow state, automatically sorted.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${ue(b,"sort-project-tasks")}
            ${s?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${v("close",12)} ${e("إلغاء الفلترة","Clear filter")}</button>`:""}
            ${A("create_tasks")?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${a(t.id)}" title="${e("اضغط N للإضافة السريعة","Press N to add quickly")}">${v("plus",14)} ${x("addTask")} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:""}
          </div>
        </div>
        ${be(m,b)}
      </div>
    `}else if(r==="timeline"){const{renderTimelinePanel:b}=window.__timelineExports||{};l=b?b(m,t):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${e("المخطط الزمني والتقويم","Timeline & Calendar")}</h2></div></div>${ve(m)}</div>`}else if(r==="drawings"){const b=(g.data?.documents||[]).filter(c=>c.projectId===t.id&&!c.deletedAt),$=i.filter(c=>c.typeAr==="مخطط"||c.typeEn==="Drawing"||c.templateId),y=g.docTaskFilter||"all",P=y==="all"?b:b.filter(c=>c.taskId===y);l=`
      <div class="panel">
        <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h2 class="panel-title">${e("المخططات والمستندات الهندسية","Drawings & Documents")}</h2>
            <p class="panel-subtitle">${e("جميع المخططات والملفات المرفوعة لهذا المشروع مع إمكانية الفلترة حسب المهمة والمعاينة الفورية.","All blueprints and files uploaded for this project, with task filtering and instant preview.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <!-- Filter by Task dropdown -->
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:12px;color:var(--ink-soft);">${e("المهمة:","Task:")}</span>
              <select data-action="filter-project-docs-task" class="filter-select select-compact" style="max-width:100%;min-width:140px;">
                <option value="all" ${y==="all"?"selected":""}>${e("— جميع المهام —","— All Tasks —")}</option>
                ${i.map(c=>`<option value="${a(c.id)}" ${y===c.id?"selected":""}>${a(e(c.titleAr,c.titleEn))}</option>`).join("")}
              </select>
            </div>
            ${A("create_tasks")?`
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${a(t.id)}">
                ${v("plus",12)} ${e("إضافة مخرج / مخطط","Add Deliverable / Drawing")}
              </button>
            `:""}
          </div>
        </div>

        <!-- Section 1: Uploaded Files (Direct previews) -->
        <div style="margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${v("document",14)} ${e("الملفات والمخططات المرفوعة","Uploaded Files & Blueprints")} (${P.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${e("اسم المخطط / الملف","Blueprint / File Name")}</th>
                  <th>${x("tasks")}</th>
                  <th>${e("الحالة","Status")}</th>
                  <th>${e("الحجم","Size")}</th>
                  <th>${e("تاريخ الرفع","Upload Date")}</th>
                  <th style="text-align:end;">${e("الإجراءات","Actions")}</th>
                </tr>
              </thead>
              <tbody>
                ${P.length>0?P.map(c=>{const z=i.find(C=>C.id===c.taskId),I=c.size>1048576?(c.size/1048576).toFixed(1)+" MB":Math.round((c.size||0)/1024)+" KB";return`
                    <tr data-doc-id="${a(c.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${a(c.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${v("document",15)}
                          </span>
                          <div>
                            <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${a(c.originalName)}">
                              ${a(c.originalName)}
                            </strong>
                            <span style="font-size:11px;color:var(--muted);">${a(c.mimeType||"application/octet-stream")}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${z?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${a(z.id)}">${a(e(z.titleAr,z.titleEn))}</span>`:"—"}
                      </td>
                      <td>
                        <span class="status-badge ${a(c.status||"draft")}" style="font-size:11px;">
                          ${a(D(c.status||"draft"))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${I}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${_(c.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${a(c.id)}" style="padding:5px;" title="${e("معاينة المخطط","Preview")}">
                            ${v("eye",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${a(c.id)}" style="padding:5px;color:var(--teal);" title="${e("نسخ رابط Google Drive","Copy Drive Link")}">
                            ${v("link",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${a(c.id)}" style="padding:5px;color:var(--blue);" title="${e("تحميل المخطط","Download")}">
                            ${v("download",14)}
                          </button>
                        </div>
                      </td>
                    </tr>
                  `}).join(""):`
                  <tr>
                    <td colspan="6">
                      <div class="empty" style="padding:30px 10px;">
                        ${v("document",20)}
                        <span>${e("لا توجد ملفات مرفوعة لهذه المهمة أو المشروع حتى الآن.","No files uploaded for this task/project yet.")}</span>
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
            ${v("checklist",14)} ${e("مخرجات المخططات المجدولة","Scheduled Drawing Tasks")} (${$.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${x("taskTitle")}</th>
                  <th>${x("taskType")}</th>
                  <th>${x("status")}</th>
                  <th>${x("progress")}</th>
                  <th>${x("assignee")}</th>
                </tr>
              </thead>
              <tbody>
                ${$.map(c=>`
                  <tr data-action="open-task" data-task-id="${a(c.id)}" style="cursor:pointer;" title="${e("انقر لعرض وتعديل المهمة ورفع المخططات","Click to open task and manage files")}">
                    <td><span class="table-title">${a(e(c.titleAr,c.titleEn))}</span><span class="table-sub">${a(c.templateId||"CUSTOM")}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${a(e(c.typeAr,c.typeEn)||e("مخطط","Drawing"))}</span></td>
                    <td><span class="status-badge ${a(c.status)}">${a(D(c.status))}</span></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;min-width:40px;">
                          <div style="height:100%;background:${c.status==="done"?"var(--green)":"var(--blue)"};width:${c.progress||0}%;"></div>
                        </div>
                        <span style="font-size:11px;font-weight:600;">${c.progress||0}%</span>
                      </div>
                    </td>
                    <td>${c.assignee?a(e(c.assignee.name,c.assignee.nameEn||c.assignee.name)):"—"}</td>
                  </tr>
                `).join("")||`<tr><td colspan="5"><div class="empty">${x("noTasks")}</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}else r==="activity"&&(l=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${x("activity")}</h2><p class="panel-subtitle">${e("كل تغيير مهم يبقى قابلًا للمراجعة.","Every important change remains reviewable.")}</p></div></div>${he(t.id)}</div>`);const h=t.manager||(g.data?.users||[]).find(b=>b.id===t.managerId),f=W(t.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${v(g.lang==="ar"?"arrow":"arrowLeft",15)}</button>
        <div>
          <p class="eyebrow">${a(t.code)} · ${t.demo?x("sampleData"):x("active")}</p>
          <h1>${a(e(t.nameAr,t.nameEn))}</h1>
          <p>${a(e(t.descriptionAr||t.clientAr,t.descriptionEn||t.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${v("user",12)} 
              <strong>${x("manager")}:</strong> ${a(h?e(h.name,h.nameEn||h.name):"—")}
            </span>
            ${t.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${v("calendar",12)} ${_(t.dueDate,!0)}
                ${f}
              </span>
            `:""}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${v("users",12)}
              <span style="font-size:11px;">${x("team")}:</span>
              ${ie(o,4,!0,n)}
            </span>
            <span class="status-badge ${a(t.health)}">${a(D(t.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${t.progress}%</strong>
        <span>${x("weightedProgress")}</span>
        ${A("edit_projects")||A("create_projects")||A("delete_projects")||A("view_reports")||N()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${v("more",15)} ${e("خيارات","Options")}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${g.lang==="ar"?"right:0;left:auto;":"left:0;right:auto;"};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:220px;max-width:min(280px,calc(100vw - 36px));padding:5px;margin-top:5px;text-align:start">
              ${A("edit_projects")||N()?`<button class="menu-item" data-action="edit-project" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${v("edit",14)} ${x("edit")}</button>`:""}
              ${A("create_projects")||N()?`<button class="menu-item" data-action="clone-project" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${v("document",14)} ${e("استنساخ المشروع","Clone Project")}</button>`:""}
              ${A("export_reports")||N()?`
                <button class="menu-item" data-action="export-project-pdf" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--brand-teal);font-weight:600;">
                  ${v("printer",14)} ${e("تقرير تنفيذي معتمد (PDF)","Executive Report (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project-client-pdf" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--ink);">
                  ${v("user",14)} ${e("تقرير تسليمات العميل (PDF)","Client Deliverables (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;">
                  ${v("document",14)} ${e("تصدير بيانات المهام (Excel)","Export Tasks (Excel)")}
                </button>
              `:""}
              ${A("delete_projects")||N()?`<button class="menu-item" data-action="delete-project" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${v("trash",14)} ${e("حذف المشروع","Delete Project")}</button>`:""}
            </div>
          </div>
        `:""}
      </div>
    </div>

    <!-- Sub Navigation Tabs: 'تفاصيل' instead of 'overview' -->
    <div class="detail-tabs">
      <button class="detail-tab ${r==="tasks"?"active":""}" data-action="project-tab" data-tab="tasks">${x("tasks")}</button>
      <button class="detail-tab ${r==="overview"?"active":""}" data-action="project-tab" data-tab="overview">${e("تفاصيل","Details")}</button>
      <button class="detail-tab ${r==="timeline"?"active":""}" data-action="project-tab" data-tab="timeline">${e("المخطط الزمني والتقويم","Timeline & Calendar")}</button>
      <button class="detail-tab ${r==="drawings"?"active":""}" data-action="project-tab" data-tab="drawings">${x("drawings")}</button>
      <button class="detail-tab ${r==="activity"?"active":""}" data-action="project-tab" data-tab="activity">${x("activity")}</button>
    </div>
    
    ${l}
  `}function J(t=[]){const i=g.data?.users||[];return t.map(o=>{const n=i.find(r=>r.id===o)||{name:o,id:o};return`
      <span class="chip-item" data-uid="${a(o)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${S(n,"mini-avatar")}
        <span style="font-weight:500;">${a(e(n.name,n.nameEn||n.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${a(o)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${e("إزالة","Remove")}">×</button>
      </span>
    `}).join("")}function ke(t=null){!g.trashLoaded&&typeof window<"u"&&L("/api/trash",{silent:!0}).then(d=>{d&&(g.trash=Array.isArray(d)?d:d.trash||[...(d.projects||[]).map(l=>({...l,type:"project"})),...(d.tasks||[]).map(l=>({...l,type:"task"})),...(d.documents||[]).map(l=>({...l,type:"document"}))],g.trashLoaded=!0)}).catch(()=>{});const i=t?.code||q(),o=t?R(t).internalMembers.map(d=>d.id):[],n=o.length>0?o:[g.data?.user?.id].filter(Boolean),r=Y(i,t?.id),s=r.status==="success"?"var(--mint-strong)":r.status==="warning"?"var(--amber-strong)":"var(--red)",m=`
    <form id="project-form" data-project-id="${a(t?.id||"")}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${a(JSON.stringify(n))}" />

      <div class="form-grid">
        <!-- Section 1: Core Project Information -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${v("building",14)} <span>${e("البيانات الأساسية للمشروع","Core Project Information")}</span>
        </div>

        <div class="field full">
          <label>${x("nameAr")} *</label>
          <input name="nameAr" value="${a(t?.nameAr||"")}" placeholder="${e("مثال: فيلا النخيل — التصميم الداخلي","e.g. Al Nakheel Villa — Interior Design")}" required />
        </div>
        <div class="field">
          <label>${x("nameEn")}</label>
          <input name="nameEn" value="${a(t?.nameEn||"")}" placeholder="Al Nakheel Villa — Interior Design" />
        </div>
        <div class="field">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <label style="margin:0;">${x("projectCode")} *</label>
            <button type="button" id="btn-regenerate-code" style="background:none;border:none;font-size:11px;color:var(--teal);cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:3px;" title="${e("توليد كود تسلسلي هندسي سنوي تلقائياً (معيار ISO DARC-YY-###)","Auto-generate annual ISO project code (DARC-YY-###)")}">
              <span style="display:inline-flex;align-items:center;">${v("refresh",12)}</span> <span>${e("توليد تلقائي (ISO)","Auto-generate (ISO)")}</span>
            </button>
          </div>
          <input name="code" id="project-code-input" value="${a(i)}" placeholder="DARC-26-001" autocomplete="off" required style="font-family:monospace;font-weight:700;text-transform:uppercase;" />
          <div id="project-code-feedback" style="font-size:11px;margin-top:4px;color:${s};display:flex;align-items:center;gap:4px;">
            ${a(r.message)}
          </div>
        </div>
        <div class="field full">
          <label>${x("client")}</label>
          <input name="clientAr" value="${a(t?.clientAr||"")}" placeholder="${e("اسم العميل أو الجهة المالكة","Client or owning entity")}" />
        </div>

        <!-- Section 2: Management & Schedule -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${v("calendar",14)} <span>${e("الجدولة والإدارة","Management & Schedule")}</span>
        </div>

        <div class="field full">
          <label>${x("manager")}</label>
          <select name="managerId" id="project-manager-select">
            <option value="">${e("— بدون تحديد —","— Unassigned —")}</option>
            ${(g.data?.users||[]).map(d=>`<option value="${a(d.id)}" ${(t?t.managerId===d.id:g.data?.user?.id===d.id)?"selected":""}>${a(e(d.name,d.nameEn||d.name))}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>${e("أولوية المشروع","Project Priority")}</label>
          <select name="priority">
            <option value="low" ${t?.priority==="low"||t?.customFields?.priority==="low"?"selected":""}>${e("منخفضة","Low")}</option>
            <option value="medium" ${!t||t?.priority==="medium"||t?.customFields?.priority==="medium"||!t?.priority?"selected":""}>${e("متوسطة","Medium")}</option>
            <option value="high" ${t?.priority==="high"||t?.customFields?.priority==="high"?"selected":""}>${e("عالية","High")}</option>
            <option value="urgent" ${t?.priority==="urgent"||t?.customFields?.priority==="urgent"?"selected":""}>${e("حرجة / عاجلة","Urgent")}</option>
          </select>
        </div>
        <div class="field">
          <label>${e("حالة المشروع","Project Status")}</label>
          <select name="lifecycle">
            <option value="active" ${!t||t.lifecycle==="active"?"selected":""}>${e("نشط (قيد التنفيذ)","Active (In Progress)")}</option>
            <option value="planning" ${t?.lifecycle==="planning"?"selected":""}>${e("تخطيط","Planning")}</option>
            <option value="on_hold" ${t?.lifecycle==="on_hold"?"selected":""}>${e("معلق / متوقف","On Hold")}</option>
            <option value="completed" ${t?.lifecycle==="completed"?"selected":""}>${e("مكتمل","Completed")}</option>
            <option value="archived" ${t?.lifecycle==="archived"?"selected":""}>${e("مؤرشف","Archived")}</option>
          </select>
        </div>
        <div class="field">
          <label>${x("startDate")}</label>
          <input type="date" name="startDate" value="${a((t?.startDate||"").split("T")[0])}" />
        </div>
        <div class="field">
          <label>${x("dueDate")}</label>
          <input type="date" name="dueDate" value="${a((t?.dueDate||"").split("T")[0])}" />
        </div>

        <!-- Section 3: Project Team Members -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:6px;">
            ${v("users",14)} <span>${e("أعضاء فريق المشروع والمشاركون","Project Team Members & Collaborators")}</span>
          </div>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${e("اختر من الفريق لإعطائهم حق الوصول للمشروع","Select team members who can access this project")}</span>
        </div>

        <div class="field full" style="position:relative;">
          <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
          <div id="project-members-chips-container" style="display:${n.length?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
            ${J(n)}
          </div>

          <!-- حقل البحث والإضافة السريعة -->
          <div style="position:relative;display:flex;gap:6px;">
            <input type="text" id="project-member-search" placeholder="${e("ابحث عن عضو لإضافته لفريق المشروع...","Search team member to add to project team...")}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          </div>

          <!-- القائمة المنسدلة للبحث والاختيار -->
          <div id="project-member-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
          </div>
        </div>

        <!-- Section 4: Scope & Notes -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${v("document",14)} <span>${e("نطاق المشروع والملاحظات","Scope & Notes")}</span>
        </div>

        <div class="field full">
          <label>${e("وصف ونطاق المشروع","Project Scope & Description")}</label>
          <textarea name="descriptionAr" placeholder="${e("وصف مختصر لنطاق العمل، المعايير المعتمدة، وأي ملاحظات خاصة...","Brief description of scope, design criteria, and special notes...")}">${a(t?.descriptionAr||"")}</textarea>
        </div>
      </div>

      <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;margin-top:20px;">
        <div>
          ${t&&(A("delete_projects")||N())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${a(t.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${e("حذف المشروع ونقله لسلة المهملات","Delete project and move to trash")}">
              ${v("trash",14)} ${e("حذف المشروع","Delete Project")}
            </button>
          `:""}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${x("cancel")}</button>
          <button type="submit" class="btn btn-primary">${v("check",14)} ${t?x("save"):x("create")}</button>
        </div>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=te(t?e("تعديل بيانات المشروع","Edit Project"):x("addProject"),e("إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.","Manage project details, schedule, and workflow health."),m,"project"),setTimeout(()=>{const d=document.getElementById("project-member-search"),l=document.getElementById("project-member-dropdown"),h=document.getElementById("project-members-chips-container"),f=document.getElementById("project-members-input"),b=document.getElementById("project-manager-select");if(!d||!l||!h||!f)return;let $=[...n];function y(){h.innerHTML=J($),h.style.display=$.length?"flex":"none",f.value=JSON.stringify($),h.querySelectorAll(".btn-remove-project-member").forEach(w=>{w.addEventListener("click",j=>{j.stopPropagation();const p=w.dataset.uid;$=$.filter(u=>u!==p),y()})})}b&&b.addEventListener("change",()=>{const w=b.value;w&&!$.includes(w)&&($.push(w),y())});function P(w=""){const j=w.toLowerCase().trim(),p=(g.data?.users||[]).filter(u=>!$.includes(u.id)&&(!j||u.name&&u.name.toLowerCase().includes(j)||u.nameEn&&u.nameEn.toLowerCase().includes(j)||u.email&&u.email.toLowerCase().includes(j)));p.length?(l.innerHTML=p.map(u=>`
          <div class="project-member-opt" data-uid="${a(u.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${S(u,"mini-avatar")}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${a(e(u.name,u.nameEn||u.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${a(u.roleId||"")}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);display:inline-flex;align-items:center;gap:3px;">${v("plus",11)} ${e("إضافة","Add")}</span>
          </div>
        `).join(""),l.querySelectorAll(".project-member-opt").forEach(u=>{u.addEventListener("mouseenter",()=>u.style.background="var(--surface-soft)"),u.addEventListener("mouseleave",()=>u.style.background="transparent"),u.addEventListener("click",()=>{const E=u.dataset.uid;E&&!$.includes(E)&&($.push(E),y(),d.value="",l.style.display="none")})})):l.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${e("لا يوجد أعضاء مطابقون","No matching members")}</div>`,l.style.display="block"}d.addEventListener("focus",()=>P(d.value)),d.addEventListener("input",()=>P(d.value)),document.addEventListener("click",w=>{!d.contains(w.target)&&!l.contains(w.target)&&(l.style.display="none")});const c=document.getElementById("project-code-input"),z=document.getElementById("project-code-feedback"),I=document.getElementById("btn-regenerate-code"),C=document.querySelector('#project-form button[type="submit"]');function M(){if(!c||!z)return;const w=c.value.trim().toUpperCase();c.value=w;const j=Y(w,t?.id);z.textContent=j.message,z.style.color=j.status==="success"?"var(--mint-strong)":j.status==="warning"?"var(--amber-strong)":"var(--red)",C&&(C.disabled=!j.valid)}c&&(c.addEventListener("input",M),c.addEventListener("blur",M)),I&&I.addEventListener("click",w=>{w.preventDefault(),c&&(c.value=q(),M())}),y()},50)}function je(t){const i=`
    <form id="clone-form" data-project-id="${t.id}">
      <p style="margin-top:0;margin-bottom:20px;color:var(--ink-soft);font-size:13px">${e("أنت على وشك استنساخ المشروع:","You are about to clone the project:")} <strong style="color:var(--ink)">${a(e(t.nameAr,t.nameEn))}</strong></p>
      <div class="form-grid">
        <div class="field full">
          <label>${x("nameAr")}</label>
          <input name="nameAr" value="${a(t.nameAr)} (نسخة)" required />
        </div>
        <div class="field full">
          <label>${x("nameEn")}</label>
          <input name="nameEn" value="${a(t.nameEn)} (Copy)" required />
        </div>
      </div>
      
      <div class="field full">
        <label>${e("تاريخ التسليم المتوقع","Expected Due Date")}</label>
        <input name="dueDate" type="date" value="${(t.dueDate||"").split("T")[0]}" />
      </div>

      <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:8px;padding:15px;margin-top:20px;display:flex;flex-direction:column;gap:12px">
        <strong style="font-size:13px">${e("إعدادات النسخ المتقدمة","Advanced Clone Settings")}</strong>
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneTasks" checked style="width:16px;height:16px;margin:0">
          ${e("نسخ جميع المهام والهيكلة (Tasks)","Clone all tasks & structure")}
        </label>
        
        <div style="padding-${g.lang==="ar"?"right":"left"}:26px">
          <label style="display:flex;align-items:center;gap:8px;font-weight:400;color:var(--ink-soft);cursor:pointer">
            <input type="checkbox" name="keepAssignees" style="width:14px;height:14px;margin:0">
            ${e("الاحتفاظ بالمسند إليهم (Keep Assignees)","Keep Task Assignees")}
          </label>
        </div>
        
        <hr style="border:0;border-top:1px solid var(--border);margin:4px 0" />
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneMembers" checked style="width:16px;height:16px;margin:0">
          ${e("استنساخ أعضاء فريق العمل (Team)","Clone team members")}
        </label>
      </div>
      
      <div class="modal-actions" style="margin-top:24px">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${x("cancel")}</button>
        <button type="submit" class="btn btn-primary">${v("document",14)} ${e("استنساخ المشروع","Clone Project")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=te(e("استنساخ المشروع","Clone Project"),e("أداة إنشاء قوالب المشاريع السريعة","Rapid project templating tool"),i,"clone");const o=document.getElementById("clone-form"),n=o.querySelector('input[name="cloneTasks"]'),r=o.querySelector('input[name="keepAssignees"]');n.addEventListener("change",s=>{r.disabled=!s.target.checked,s.target.checked||(r.checked=!1)}),o.addEventListener("submit",async s=>{s.preventDefault();const m=o.querySelector('button[type="submit"]');m.disabled=!0;try{const d={nameAr:o.nameAr.value,nameEn:o.nameEn.value,dueDate:o.dueDate.value,cloneTasks:o.cloneTasks.checked,keepAssignees:o.keepAssignees.checked,cloneMembers:o.cloneMembers.checked},l=await L(`/api/projects/${t.id}/clone`,{method:"POST",body:JSON.stringify(d)});fe(),g.view="project-detail",g.activeProjectId=l.project.id,await xe(),T(e("تم استنساخ المشروع بنجاح.","Project cloned successfully."))}catch(d){T(d.message,!0),m.disabled=!1}})}function Pe(){const t=(g.data?.projects||[]).filter(s=>!s.deletedAt&&!s.deleted_at);if(!t||!t.length){T(e("لا توجد بيانات لتصديرها.","No data to export."),!0);return}const i=F(),o=H(),n=11;let r="<table>";r+=`<tr><td colspan="${n}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${i.logoUrl?`<img src="${a(i.logoUrl)}" height="42" loading="lazy" decoding="async" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${a(i.displayName)}</span>
  </td></tr>`,r+=`<tr><td colspan="${n}" class="subtitle">${e("تقرير حالة مشاريع المحفظة الهندسية","Portfolio Projects Status Report")}</td></tr>`,r+=`<tr><td colspan="${n}" class="meta">${e("تاريخ الإصدار:","Generated on:")} ${o}</td></tr>`,r+=`<tr><td colspan="${n}" style="border:none;"></td></tr>`,r+=`<tr class="header">
    <td>${e("كود المشروع","Code")}</td>
    <td>${e("اسم المشروع (عربي)","Project Name (Ar)")}</td>
    <td>${e("اسم المشروع (إنجليزي)","Project Name (En)")}</td>
    <td>${e("العميل / المالك","Client")}</td>
    <td>${e("مدير المشروع","Manager")}</td>
    <td>${e("المرحلة","Lifecycle")}</td>
    <td>${e("الصحة التشغيلية","Health")}</td>
    <td>${e("تاريخ البدء","Start Date")}</td>
    <td>${e("تاريخ التسليم","Due Date")}</td>
    <td>${e("نسبة الإنجاز","Progress %")}</td>
    <td>${e("عدد أعضاء الفريق","Team Size")}</td>
  </tr>`,t.forEach(s=>{const m=s.manager?e(s.manager.name,s.manager.nameEn||s.manager.name):"";r+=`<tr>
      <td>${a(k(s.code))}</td>
      <td>${a(k(s.nameAr))}</td>
      <td>${a(k(s.nameEn))}</td>
      <td>${a(k(e(s.clientAr,s.clientEn)))}</td>
      <td>${a(k(m))}</td>
      <td>${a(k(D(s.lifecycle)))}</td>
      <td>${a(k(D(s.health)))}</td>
      <td>${a(k(s.startDate||""))}</td>
      <td>${a(k(s.dueDate||""))}</td>
      <td>${s.progress||0}%</td>
      <td>${s.memberCount||0}</td>
    </tr>`}),r+="</table>",X(`DARC_Portfolio_Report_${new Date().toISOString().split("T")[0]}`,r),T(e("تم بدء تحميل تقرير المحفظة.","Portfolio report download started.")),L("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:e("تقرير حالة مشاريع المحفظة (Excel)","Portfolio Projects Report (Excel)"),count:t.length}})}).catch(()=>{})}function De(t){const i=(g.data?.projects||[]).find(f=>f.id===t&&!f.deletedAt&&!f.deleted_at);if(!i)return;const o=(g.data?.tasks||[]).filter(f=>f.projectId===t&&!f.deletedAt&&!f.deleted_at);if(!o.length){T(e("لا توجد مهام لهذا المشروع لتصديرها.","No tasks to export."),!0);return}const n=F(),r=g.data?.users||[],s=new Map(r.map(f=>[f.id,f]));function m(f){if(!f)return"—";const b=s.get(f);return b?e(b.name,b.nameEn||b.name):f}const d=H(),l=11;let h="<table>";h+=`<tr><td colspan="${l}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${n.logoUrl?`<img src="${a(n.logoUrl)}" height="42" loading="lazy" decoding="async" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${a(n.displayName)}</span>
  </td></tr>`,h+=`<tr><td colspan="${l}" class="subtitle">${e("تقرير مهام ومخرجات المشروع:","Project Tasks & Deliverables Report:")} ${a(e(i.nameAr,i.nameEn))} (${a(i.code)})</td></tr>`,h+=`<tr><td colspan="${l}" class="meta">${e("العميل / المالك:","Client:")} ${a(e(i.clientAr,i.clientEn))||"—"} | ${e("تاريخ الإصدار:","Generated on:")} ${d}</td></tr>`,h+=`<tr><td colspan="${l}" style="border:none;"></td></tr>`,h+=`<tr class="header">
    <td>${e("كود المخرج","Code")}</td>
    <td>${e("المهمة (عربي)","Task (Ar)")}</td>
    <td>${e("المهمة (إنجليزي)","Task (En)")}</td>
    <td>${e("التخصص / القسم","Category")}</td>
    <td>${e("المنفذ المسؤول","Assignee")}</td>
    <td>${e("المراجع الهندسي","Reviewer")}</td>
    <td>${e("المعتمد النهائي","Approver")}</td>
    <td>${e("الحالة","Status")}</td>
    <td>${e("تاريخ البدء","Start Date")}</td>
    <td>${e("تاريخ التسليم","Due Date")}</td>
    <td>${e("الإنجاز","Progress %")}</td>
  </tr>`,o.forEach((f,b)=>{const $=f.templateId?f.templateId.replace("tpl-","#"):f.id?`#${f.id.slice(-6)}`:`#${b+1}`,y=m(f.assigneeId||f.assignee_id),P=m(f.reviewerId||f.reviewer_id),c=m(f.approverId||f.approver_id);h+=`<tr>
      <td style="text-align:center;font-weight:bold;">${a(k($))}</td>
      <td>${a(k(f.titleAr))}</td>
      <td>${a(k(f.titleEn))}</td>
      <td>${a(k(e(f.categoryAr,f.categoryEn)))}</td>
      <td>${a(k(y))}</td>
      <td style="color:#0369a1;">${a(k(P))}</td>
      <td style="color:#047857;">${a(k(c))}</td>
      <td>${a(k(D(f.status)))}</td>
      <td>${a(k(f.startDate||""))}</td>
      <td>${a(k(f.dueDate||""))}</td>
      <td style="font-weight:bold;">${f.progress||0}%</td>
    </tr>`}),h+="</table>",X(`DARC_Project_${i.code}_${new Date().toISOString().split("T")[0]}`,h),T(e("تم بدء تحميل تقرير المهام.","Report download started.")),L("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:t,details:{title:e(`تقرير مهام مشروع: ${i.nameAr}`,`Project Tasks Report: ${i.nameEn||i.nameAr}`),taskCount:o.length}})}).catch(()=>{})}function ze(t,i=!1){const o=(g.data?.projects||[]).find(p=>p.id===t&&!p.deletedAt&&!p.deleted_at);if(!o)return;const n=(g.data?.tasks||[]).filter(p=>p.projectId===t&&!p.deletedAt&&!p.deleted_at);if(!n.length){T(e("لا توجد مهام لهذا المشروع لطباعة التقرير.","No tasks to print report."),!0);return}const r=F(),s=g.data?.users||[],m=new Map(s.map(p=>[p.id,p]));function d(p){if(!p)return"—";const u=m.get(p);return u?e(u.name,u.nameEn||u.name):p}function l(p){if(!p?.dueDate||["done","completed","canceled"].includes(p.status))return!1;const u=G(p.dueDate);return u?u<new Date:!1}const h=n.length,f=n.filter(p=>["done","completed"].includes(p.status)).length,b=n.filter(p=>["review","approval"].includes(p.status)).length;n.filter(p=>p.status==="in_progress").length;const $=n.filter(p=>l(p)).length,y=new Date,P=H(y),c=ae(y),z=new Map;n.forEach(p=>{const u=e(p.categoryAr,p.categoryEn)||e(p.typeAr,p.typeEn)||e("عام","General"),E=z.get(u)||{total:0,completed:0,weight:0,progressSum:0},O=Number(p.weight||1);E.total++,["done","completed"].includes(p.status)&&E.completed++,E.weight+=O,E.progressSum+=(p.progress||0)*O,z.set(u,E)});const I=Array.from(z.entries()).map(([p,u])=>({name:p,percent:u.weight?Math.round(u.progressSum/u.weight):0,completed:u.completed,total:u.total})),C=i?e("تقرير تسليمات ومخرجات المشروع للمالك والعميل","Client Deliverables & Milestone Brief"):e("تقرير الإنجاز التنفيذي والمخرجات والاعتمادات الهندسية","Official Executive Engineering & Deliverables Audit");i?e("ملخص رسمي لمخرجات ومخططات المشروع المعتمدة وتواريخ التسليم التعاقدية.","Official summary of approved architectural drawings, milestones, and deliverables."):e("بيان تفصيلي بمسار التنفيذ ومسؤوليات المراجعة والاعتماد لكافة مخرجات المشروع.","Detailed execution readout with review and approval sign-offs for all project assets.");const M=n.map((p,u)=>{const E=p.templateId?p.templateId.replace("tpl-","#"):p.id?`#${p.id.slice(-6)}`:`#${u+1}`,O=e(p.titleAr,p.titleEn),V=e(p.categoryAr,p.categoryEn)||e(p.typeAr,p.typeEn)||"—",Z=D(p.status),B=p.progress||0,Q=p.dueDate||"—";if(i)return`
        <tr>
          <td style="text-align:center;font-weight:bold;color:#475569;">${u+1}</td>
          <td style="text-align:center;font-weight:600;color:#0d6269;">${a(E)}</td>
          <td style="font-weight:600;">${a(O)}</td>
          <td style="text-align:center;">${a(V)}</td>
          <td style="text-align:center;"><span class="badge ${a(p.status)}">${a(Z)}</span></td>
          <td style="text-align:center;direction:ltr;">${a(Q)}</td>
          <td style="text-align:center;font-weight:bold;color:${B===100?"#0d6269":"#1e293b"};">${B}%</td>
        </tr>
      `;const de=d(p.assigneeId||p.assignee_id),pe=d(p.reviewerId||p.reviewer_id),ce=d(p.approverId||p.approver_id);return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${u+1}</td>
        <td style="text-align:center;font-weight:600;color:#0d6269;">${a(E)}</td>
        <td style="font-weight:600;">${a(O)}</td>
        <td style="text-align:center;">${a(V)}</td>
        <td>${a(de)}</td>
        <td style="color:#0369a1;font-weight:600;">${a(pe)}</td>
        <td style="color:#047857;font-weight:600;">${a(ce)}</td>
        <td style="text-align:center;"><span class="badge ${a(p.status)}">${a(Z)}</span></td>
        <td style="text-align:center;direction:ltr;">${a(Q)}</td>
        <td style="text-align:center;font-weight:bold;color:${B===100?"#0d6269":"#1e293b"};">${B}%</td>
      </tr>
    `}).join(""),w=`
    <!DOCTYPE html>
    <html lang="${g.lang}" dir="${g.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${a(r.displayName)} - ${a(o.code)} - ${i?"Client_Report":"Executive_Report"}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>
        @page { size: A4 portrait; margin: 12mm 14mm 15mm 14mm; }
        * { box-sizing: border-box; }
        body {
          font-family: 'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif;
          margin: 0;
          padding: 24px;
          color: #0f172a;
          background: #ffffff;
          font-size: 11px;
          line-height: 1.45;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .no-print-toolbar {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 10px 18px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .btn-toolbar {
          background: #0d6269;
          color: #ffffff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }
        .btn-toolbar-ghost {
          background: #e2e8f0;
          color: #1e293b;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          text-decoration: none;
        }
        .report-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 3px solid #0d6269;
          padding-bottom: 14px;
          margin-bottom: 16px;
        }
        .brand-logo-img {
          max-height: 52px;
          max-width: 170px;
          object-fit: contain;
          margin-bottom: 4px;
        }
        .brand-logo-fallback {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #0d6269, #00c2cb);
          color: #fff;
          font-weight: 800;
          font-size: 18px;
          border-radius: 10px;
          margin-bottom: 4px;
        }
        .brand-title {
          font-size: 19px;
          font-weight: 800;
          color: #0d6269;
          margin: 0;
          line-height: 1.2;
        }
        .brand-sub {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }
        .report-meta-box {
          text-align: ${g.lang==="ar"?"left":"right"};
          font-size: 11px;
          color: #334155;
          line-height: 1.6;
        }
        .report-type-badge {
          display: inline-block;
          background: #e6f4f5;
          color: #0d6269;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 4px;
          font-size: 11px;
          border: 1px solid #bce1e4;
          margin-bottom: 4px;
        }
        .info-strip {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 16px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .info-cell strong {
          display: block;
          font-size: 10px;
          color: #64748b;
          text-transform: uppercase;
        }
        .info-cell span {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
        }
        .kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }
        .kpi-card {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 8px;
          padding: 10px 12px;
          text-align: center;
          border-top: 3px solid #0d6269;
        }
        .kpi-val {
          font-size: 20px;
          font-weight: 800;
          color: #0d6269;
        }
        .kpi-label {
          font-size: 10px;
          color: #64748b;
          font-weight: 600;
          margin-top: 2px;
        }
        .disc-section {
          background: #fafafa;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 16px;
        }
        .disc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
          margin-top: 6px;
        }
        .disc-item {
          font-size: 10px;
        }
        .disc-bar-bg {
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
          margin-top: 3px;
        }
        .disc-bar-fill {
          height: 100%;
          background: #0d6269;
          border-radius: 3px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        th, td {
          border: 1px solid #cbd5e1;
          padding: 6px 8px;
          text-align: ${g.lang==="ar"?"right":"left"};
          vertical-align: middle;
        }
        th {
          background: #0d6269;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          text-align: center;
        }
        tr:nth-child(even) {
          background: #f8fafc;
        }
        .badge {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 9px;
          font-weight: 700;
        }
        .badge.done, .badge.completed { background: #dcfce7; color: #166534; }
        .badge.in_progress { background: #dbeafe; color: #1e40af; }
        .badge.review, .badge.approval { background: #fef3c7; color: #92400e; }
        .badge.blocked { background: #fee2e2; color: #991b1b; }
        .badge.not_started { background: #f1f5f9; color: #475569; }
        .signature-section {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          page-break-inside: avoid;
        }
        .signature-box {
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          background: #fafafa;
          min-height: 90px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .signature-title {
          font-size: 11px;
          font-weight: 700;
          color: #1e293b;
        }
        .signature-line {
          border-top: 1px dashed #94a3b8;
          margin-top: 35px;
          padding-top: 4px;
          font-size: 10px;
          color: #64748b;
        }
        .stamp-box {
          border: 2px dashed #0d6269;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          color: #0d6269;
          font-weight: 700;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 90px;
          background: #f0fdfa;
        }
        .report-footer {
          margin-top: 20px;
          border-top: 1px solid #e2e8f0;
          padding-top: 8px;
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          color: #94a3b8;
        }
        @media print {
          .no-print-toolbar { display: none !important; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="no-print-toolbar">
        <div>
          <strong style="color:#0d6269;font-size:13px;">${a(C)}</strong>
          <div style="font-size:11px;color:#64748b;">${e("معاينة التقرير جاهزة للطباعة أو الحفظ المباشر كملف PDF رسمي.","Ready for printing or saving directly as an official executive PDF file.")}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-toolbar" onclick="window.print()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-inline-end:4px;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button class="btn-toolbar-ghost" onclick="window.location.search = (window.location.search.includes('client=1') ? '' : '?client=1')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-inline-end:4px;"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>${i?e("التبديل للتقرير الفني الشامل","Switch to Technical Report"):e("التبديل لتقرير المالك والعميل","Switch to Client Report")}
          </button>
          <button class="btn-toolbar-ghost" onclick="window.close()">
            <span style="display:inline-flex;align-items:center;gap:4px;">${v("close",12)} ${e("إغلاق","Close")}</span>
          </button>
        </div>
      </div>

      <header class="report-header">
        <div>
          ${r.logoUrl?`
            <img src="${a(r.logoUrl)}" alt="Logo" loading="lazy" decoding="async" class="brand-logo-img" />
          `:`
            <div class="brand-logo-fallback">D</div>
          `}
          <h1 class="brand-title">${a(r.displayName)}</h1>
          <div class="brand-sub">${e("مكتب الاستشارات والتصميم الهندسي","Architecture & Engineering Consultancy")}</div>
        </div>
        <div class="report-meta-box">
          <div class="report-type-badge">${a(C)}</div>
          <div><strong>${e("كود المشروع:","Project Code:")}</strong> ${a(o.code)}</div>
          <div><strong>${e("تاريخ التقرير:","Report Date:")}</strong> ${a(P)} - ${a(c)}</div>
          <div><strong>${e("حالة المشروع:","Project Status:")}</strong> ${a(D(o.lifecycle))} (${a(D(o.health))})</div>
        </div>
      </header>

      <div class="info-strip">
        <div class="info-cell">
          <strong>${e("اسم المشروع","Project Name")}</strong>
          <span>${a(e(o.nameAr,o.nameEn))}</span>
        </div>
        <div class="info-cell">
          <strong>${e("العميل / المالك","Client / Owner")}</strong>
          <span>${a(e(o.clientAr,o.clientEn))||"—"}</span>
        </div>
        <div class="info-cell">
          <strong>${e("الجدول الزمني","Schedule Timeline")}</strong>
          <span>${a(o.startDate||"—")} → ${a(o.dueDate||"—")}</span>
        </div>
        <div class="info-cell">
          <strong>${e("مدير المشروع المسؤول","Project Manager")}</strong>
          <span>${a(d(o.managerId))}</span>
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${o.progress||0}%</div>
          <div class="kpi-label">${e("نسبة الإنجاز الإجمالية","Overall Progress")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#047857;">${f} / ${h}</div>
          <div class="kpi-label">${e("المخرجات المعتمدة","Approved Deliverables")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#b45309;">${b}</div>
          <div class="kpi-label">${e("قيد المراجعة والاعتماد","Under Review")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:${$>0?"#b91c1c":"#64748b"};">${$}</div>
          <div class="kpi-label">${e("المخرجات المتأخرة","Overdue Deliverables")}</div>
        </div>
      </div>

      ${I.length?`
        <div class="disc-section">
          <strong style="font-size:11px;color:#334155;">${e("مؤشرات الإنجاز بحسب التخصص الهندسي:","Engineering Discipline Progress Breakdown:")}</strong>
          <div class="disc-grid">
            ${I.map(p=>`
              <div class="disc-item">
                <div style="display:flex;justify-content:space-between;font-weight:600;">
                  <span>${a(p.name)}</span>
                  <span>${p.percent}% (${p.completed}/${p.total})</span>
                </div>
                <div class="disc-bar-bg">
                  <div class="disc-bar-fill" style="width:${p.percent}%;"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `:""}

      <table>
        <thead>
          <tr>
            <th style="width:30px;">#</th>
            <th style="width:75px;">${e("الكود","Code")}</th>
            <th>${i?e("اسم المخرج الهندسي / المخطط","Deliverable / Drawing Title"):e("المهمة والمخرج القياسي","Deliverable & Task Title")}</th>
            <th style="width:90px;">${e("التخصص","Discipline")}</th>
            ${i?"":`
              <th style="width:105px;">${e("المنفذ","Assignee")}</th>
              <th style="width:105px;">${e("المراجع","Reviewer")}</th>
              <th style="width:105px;">${e("المعتمد","Approver")}</th>
            `}
            <th style="width:80px;">${e("الحالة","Status")}</th>
            <th style="width:85px;">${e("موعد التسليم","Target Due")}</th>
            <th style="width:55px;">${e("الإنجاز","Progress")}</th>
          </tr>
        </thead>
        <tbody>
          ${M}
        </tbody>
      </table>

      <div class="signature-section">
        <div class="stamp-box">
          ${e("ختم المكتب الهندسي والاستشاري المعتمد","Official Engineering Consultancy Stamp")}
        </div>
        <div class="signature-box">
          <div class="signature-title">${e("مهندس ومدير المشروع","Project Manager")}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${a(d(o.managerId))}</div>
          <div class="signature-line">${e("التوقيع والمصادقة","Sign & Date")}</div>
        </div>
        <div class="signature-box">
          <div class="signature-title">${e("الاعتماد والاستشاري العام","Approved By Lead Consultant")}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${a(r.displayName)}</div>
          <div class="signature-line">${e("التوقيع والاعتماد النهائي","Sign & Authorization")}</div>
        </div>
      </div>

      <footer class="report-footer">
        <div>${a(r.displayName)} — ${e("وثيقة إدارية معتمدة صادرة عبر منصة دارك","Official Governance Document via DARC Platform")}</div>
        <div>${e("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${a(P)}</div>
      </footer>
    </body>
    </html>
  `,j=window.open("","_blank","width=1100,height=900");j?(j.document.open(),j.document.write(w),j.document.close()):K(w),T(e("تم تجهيز التقرير الرسمي للطباعة والتصدير PDF.","Executive report ready for Print / PDF export.")),L("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:t,details:{title:a(C),type:i?"client_pdf":"executive_pdf",taskCount:h}})}).catch(()=>{})}function Ee(){const t=(g.data?.projects||[]).filter(y=>!y.deletedAt&&!y.deleted_at);if(!t||!t.length){T(e("لا توجد مشاريع لتصدير التقرير.","No projects to export."),!0);return}const i=F(),o=new Date,n=H(o),r=ae(o),s=t.length,m=t.filter(y=>y.health==="on_track").length,d=t.filter(y=>y.health==="at_risk").length,l=t.filter(y=>y.health==="off_track").length,h=t.map((y,P)=>{const c=y.manager?e(y.manager.name,y.manager.nameEn||y.manager.name):"—";return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${P+1}</td>
        <td style="text-align:center;font-weight:700;color:#0d6269;">${a(y.code)}</td>
        <td style="font-weight:700;">${a(e(y.nameAr,y.nameEn))}</td>
        <td>${a(e(y.clientAr,y.clientEn))||"—"}</td>
        <td>${a(c)}</td>
        <td style="text-align:center;"><span class="badge ${a(y.lifecycle)}">${a(D(y.lifecycle))}</span></td>
        <td style="text-align:center;"><span class="badge ${a(y.health)}">${a(D(y.health))}</span></td>
        <td style="text-align:center;direction:ltr;">${a(y.startDate||"—")}</td>
        <td style="text-align:center;direction:ltr;">${a(y.dueDate||"—")}</td>
        <td style="text-align:center;font-weight:bold;color:${y.progress===100?"#0d6269":"#0f172a"};">${y.progress||0}%</td>
      </tr>
    `}).join(""),f=e("تقرير الأداء ومتابعة المشاريع للمحفظة الهندسية","Official Portfolio Projects Status & Operations Readout"),b=`
    <!DOCTYPE html>
    <html lang="${g.lang}" dir="${g.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${a(i.displayName)} - Portfolio_Report_${new Date().toISOString().split("T")[0]}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>
        @page { size: A4 landscape; margin: 12mm 15mm; }
        * { box-sizing: border-box; }
        body {
          font-family: 'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif;
          margin: 0;
          padding: 24px;
          color: #0f172a;
          background: #ffffff;
          font-size: 11px;
          line-height: 1.45;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .no-print-toolbar {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 10px 18px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .btn-toolbar {
          background: #0d6269;
          color: #ffffff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
        }
        .btn-toolbar-ghost {
          background: #e2e8f0;
          color: #1e293b;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
        }
        .report-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 3px solid #0d6269;
          padding-bottom: 14px;
          margin-bottom: 16px;
        }
        .brand-logo-img {
          max-height: 52px;
          max-width: 170px;
          object-fit: contain;
          margin-bottom: 4px;
        }
        .brand-title {
          font-size: 20px;
          font-weight: 800;
          color: #0d6269;
          margin: 0;
        }
        .kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 18px;
        }
        .kpi-card {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 8px;
          padding: 10px 14px;
          text-align: center;
          border-top: 3px solid #0d6269;
        }
        .kpi-val { font-size: 22px; font-weight: 800; color: #0d6269; }
        .kpi-label { font-size: 10px; color: #64748b; font-weight: 600; margin-top: 2px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        th, td { border: 1px solid #cbd5e1; padding: 7px 9px; text-align: ${g.lang==="ar"?"right":"left"}; vertical-align: middle; }
        th { background: #0d6269; color: #ffffff; font-size: 10px; font-weight: 700; text-align: center; }
        tr:nth-child(even) { background: #f8fafc; }
        .badge { display: inline-block; padding: 2px 6px; border-radius: 3px; font-size: 9px; font-weight: 700; }
        .badge.on_track, .badge.active, .badge.completed { background: #dcfce7; color: #166534; }
        .badge.at_risk, .badge.planning { background: #fef3c7; color: #92400e; }
        .badge.off_track, .badge.on_hold { background: #fee2e2; color: #991b1b; }
        .signature-section { margin-top: 28px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; page-break-inside: avoid; }
        .signature-box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; text-align: center; background: #fafafa; }
        .stamp-box { border: 2px dashed #0d6269; border-radius: 8px; padding: 12px; text-align: center; color: #0d6269; font-weight: 700; font-size: 11px; display: flex; align-items: center; justify-content: center; min-height: 80px; background: #f0fdfa; }
        .report-footer { margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 8px; display: flex; justify-content: space-between; font-size: 9px; color: #94a3b8; }
        @media print {
          .no-print-toolbar { display: none !important; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="no-print-toolbar">
        <div>
          <strong style="color:#0d6269;font-size:13px;">${a(f)}</strong>
          <div style="font-size:11px;color:#64748b;">${e("معاينة تقرير المحفظة جاهزة للطباعة أو الحفظ كـ PDF.","Portfolio report preview ready for print / save as PDF.")}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-toolbar" onclick="window.print()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-inline-end:4px;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}</button>
          <button class="btn-toolbar-ghost" onclick="window.close()"><span style="display:inline-flex;align-items:center;gap:4px;">${v("close",12)} ${e("إغلاق","Close")}</span></button>
        </div>
      </div>

      <header class="report-header">
        <div>
          ${i.logoUrl?`<img src="${a(i.logoUrl)}" alt="Logo" loading="lazy" decoding="async" class="brand-logo-img" />`:""}
          <h1 class="brand-title">${a(i.displayName)}</h1>
          <div style="font-size:11px;color:#64748b;">${e("الإدارة الهندسية وضبط الجودة والمشاريع","Engineering Operations & Project Portfolio Readout")}</div>
        </div>
        <div style="text-align:${g.lang==="ar"?"left":"right"};font-size:11px;color:#334155;line-height:1.6;">
          <div style="display:inline-block;background:#e6f4f5;color:#0d6269;font-weight:800;padding:3px 10px;border-radius:4px;font-size:11px;border:1px solid #bce1e4;margin-bottom:4px;">${e("تقرير حالة المحفظة","Portfolio Status Report")}</div>
          <div><strong>${e("تاريخ التقرير:","Report Date:")}</strong> ${a(n)} - ${a(r)}</div>
          <div><strong>${e("إجمالي المشاريع:","Total Projects:")}</strong> ${s}</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${s}</div>
          <div class="kpi-label">${e("إجمالي مشاريع المحفظة","Total Projects")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#166534;">${m}</div>
          <div class="kpi-label">${e("مشاريع تسير وفق الخطة","On Track Projects")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#b45309;">${d}</div>
          <div class="kpi-label">${e("مشاريع تحت المراقبة (مخاطر)","At Risk Projects")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#991b1b;">${l}</div>
          <div class="kpi-label">${e("مشاريع متأخرة أو حرجة","Off Track / Delayed")}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width:30px;">#</th>
            <th style="width:75px;">${e("كود المشروع","Code")}</th>
            <th>${e("اسم المشروع","Project Name")}</th>
            <th>${e("العميل / المالك","Client / Owner")}</th>
            <th>${e("مدير المشروع","Manager")}</th>
            <th style="width:80px;">${e("المرحلة","Lifecycle")}</th>
            <th style="width:80px;">${e("الصحة التشغيلية","Health")}</th>
            <th style="width:85px;">${e("تاريخ البدء","Start Date")}</th>
            <th style="width:85px;">${e("تاريخ التسليم","Due Date")}</th>
            <th style="width:65px;">${e("الإنجاز","Progress %")}</th>
          </tr>
        </thead>
        <tbody>
          ${h}
        </tbody>
      </table>

      <div class="signature-section">
        <div class="stamp-box">${e("ختم الإدارة الهندسية والمكتب الاستشاري","Engineering Management Official Stamp")}</div>
        <div class="signature-box">
          <div style="font-size:11px;font-weight:700;color:#1e293b;">${e("مسؤول ضبط المشاريع (PMO)","PMO Lead")}</div>
          <div style="border-top:1px dashed #94a3b8;margin-top:35px;padding-top:4px;font-size:10px;color:#64748b;">${e("التوقيع والتاريخ","Sign & Date")}</div>
        </div>
        <div class="signature-box">
          <div style="font-size:11px;font-weight:700;color:#1e293b;">${e("المدير التنفيذي العام","Executive Director")}</div>
          <div style="border-top:1px dashed #94a3b8;margin-top:35px;padding-top:4px;font-size:10px;color:#64748b;">${e("المصادقة والاعتماد","Sign & Approval")}</div>
        </div>
      </div>

      <footer class="report-footer">
        <div>${a(i.displayName)} — ${e("تقرير إداري معتمد لمحفظة المشاريع","Official Portfolio Readout")}</div>
        <div>${e("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${a(n)}</div>
      </footer>
    </body>
    </html>
  `,$=window.open("","_blank","width=1200,height=900");$?($.document.open(),$.document.write(b),$.document.close()):K(b),T(e("تم تجهيز تقرير المحفظة للطباعة والتصدير PDF.","Portfolio report ready for Print / PDF export.")),L("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:a(f),type:"portfolio_pdf",count:s}})}).catch(()=>{})}function K(t){let i=document.getElementById("print-modal-overlay");i||(i=document.createElement("div"),i.id="print-modal-overlay",i.style.position="fixed",i.style.inset="0",i.style.zIndex="1400",i.style.background="rgba(0, 0, 0, 0.75)",i.style.backdropFilter="blur(4px)",i.style.display="flex",i.style.flexDirection="column",i.style.alignItems="center",i.style.justifyContent="center",i.style.padding="15px",document.body.appendChild(i)),i.innerHTML=`
    <div style="background:var(--surface, #ffffff);color:var(--ink);width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.4);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line);background:var(--surface-soft);flex-wrap:wrap;gap:8px;">
        <strong style="color:var(--brand-teal);font-size:14px;">${e("معاينة التقرير الرسمي المعتمد (PDF Preview)","Official Approved Report (PDF Preview)")}</strong>
        <div style="display:flex;gap:10px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-print-iframe" style="display:flex;align-items:center;gap:6px;">
            ${v("printer",14)} ${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-close-print-modal">${v("close",14)}</button>
        </div>
      </div>
      <div style="flex:1;overflow:hidden;position:relative;background:#ffffff;">
        <iframe id="print-preview-iframe" style="width:100%;height:100%;border:none;background:#ffffff;" srcdoc="${a(t)}"></iframe>
      </div>
    </div>
  `,i.style.display="flex";const o=()=>{i.style.display="none",i.innerHTML="",window.removeEventListener("keydown",n)},n=r=>{r.key==="Escape"&&o()};window.addEventListener("keydown",n),document.getElementById("btn-close-print-modal")?.addEventListener("click",o),document.getElementById("btn-print-iframe")?.addEventListener("click",()=>{const r=document.getElementById("print-preview-iframe");r&&r.contentWindow&&(r.contentWindow.focus(),r.contentWindow.print())})}export{je as a,De as i,Pe as n,ke as o,ze as r,Ce as s,Ee as t};
