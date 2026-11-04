import{t as ue}from"./rolldown-runtime-BQ-_32WO.js";import{$ as E,A as a,B as Me,C as I,D as e,E as ee,F as fe,G as S,I as Le,J as Ne,K as Fe,L as W,N as Oe,O,P as Y,Q as X,U as x,V as ve,Y as te,Z as xe,at as Re,ct as M,g as B,ht as l,j as ae,l as Be,nt as L,ot as ie,q as ne,rt as u,tt as qe,w as j}from"./core-realtime-BTzgw0Cs.js";import{s as Ue}from"./feature-settings-CvxHlg_4.js";import{a as He,i as Je,o as We,r as Ge,s as Xe}from"./feature-documents-CB670K02.js";var pt=ue({STATUS_OPTIONS:()=>je,buildAssigneeChipsHtml:()=>de,buildRemindersListHtml:()=>le,canUserMoveTask:()=>ee,canUserUploadToTask:()=>ye,closeDocumentPreviewModal:()=>Ge,downloadDocument:()=>Je,drawTimelineArrows:()=>Ke,filterTasks:()=>De,formatRemindAtDate:()=>Te,getDocumentShareableLink:()=>He,getSavedTaskSort:()=>U,getTaskSortOrder:()=>J,handleCopyDocLink:()=>We,initTaskModalWidgets:()=>Ae,openDocumentPreviewModal:()=>Xe,openTaskModal:()=>Ve,renderBoard:()=>re,renderCalendar:()=>oe,renderTaskAssignees:()=>be,renderTaskComments:()=>pe,renderTaskDocuments:()=>ze,renderTaskSortSelect:()=>se,renderTasks:()=>Ye,renderTimeline:()=>V,renderTimelinePanel:()=>ke,setSavedTaskSort:()=>qe,sortTasks:()=>we,sortTasksByImportance:()=>$e,taskCard:()=>he});function be(t){const s=l.data?.users||[],i=l._userMap||new Map(s.map(p=>[p.id,p])),n=t.assignee||i.get(t.assigneeId),r=(t.customFields?.additionalAssignees||t.customFields?.additional_assignees||[]).map(p=>i.get(p)).filter(Boolean),o=t.customFields?.externalAssignees||t.customFields?.external_assignees||[];let c='<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';return n||r.length?(c+='<div class="avatar-stack" style="display:flex;align-items:center;">',n&&(c+=`<span title="${a(e(n.name,n.nameEn||n.name))}">${I(n,"mini-avatar")}</span>`),r.slice(0,2).forEach(p=>{c+=`<span title="${a(e(p.name,p.nameEn||p.name))}" style="margin-inline-start:-8px;">${I(p,"mini-avatar")}</span>`}),r.length>2&&(c+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${r.slice(2).map(p=>e(p.name,p.nameEn||p.name)).join("، ")}">+${r.length-2}</span>`),c+="</div>",n&&(c+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${a(e(n.name,n.nameEn||n.name))}</span>`)):o.length||(c+='<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>'),o.length&&(o.slice(0,2).forEach(p=>{c+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${a(p)}">🌐 ${a(p)} <small style="opacity:0.8">(${e("خارجي","Ext")})</small></span>`}),o.length>2&&(c+=`<span style="font-size:10px;color:var(--amber);" title="${o.slice(2).map(a).join("، ")}">+${o.length-2}</span>`)),c+="</div>",c}function ye(t){if(!t)return!1;if(S())return!0;if(!j("upload_documents")&&!j("edit_tasks"))return!1;const s=l.data?.user?.id;if(!s)return!1;if(ee(t))return!0;const i=t.projectId||t.project_id;if(i&&Array.isArray(l.data?.projects)){const n=l.data.projects.find(r=>r.id===i);if(n){const r=n.managerId||n.manager_id,o=n.ownerId||n.owner_id||n.leadId||n.lead_id||n.createdById||n.created_by;if(r===s||o===s||Array.isArray(n.members)&&n.members.some(c=>(c.userId||c.id||c)===s)||Array.isArray(n.memberIds)&&n.memberIds.includes(s))return!0}}return!1}function he(t){const s=Me(t),i=s==="overdue"||ne(t);let n="",r="";s==="overdue"?(r="is-overdue",n=`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${x("alert",11)} ${u("overdue")}</span>`):s==="due_24h"?(r="is-due-24h",n=`<span class="due-tag-24h" style="display:inline-flex;align-items:center;gap:3px;" title="${e("متبقي أقل من 24 ساعة على موعد التسليم","Due in less than 24 hours")}">${x("clock",11)} ${e("خلال 24 ساعة","Due in 24h")}</span>`):s==="due_48h"?(r="is-due-48h",n=`<span class="due-tag-48h" style="display:inline-flex;align-items:center;gap:3px;" title="${e("متبقي أقل من 48 ساعة على موعد التسليم","Due within 48 hours")}">${x("clock",11)} ${e("خلال 48 ساعة","Due in 48h")}</span>`):s==="due_72h"&&(r="is-due-72h",n=`<span class="due-tag-72h" style="display:inline-flex;align-items:center;gap:3px;" title="${e("متبقي أقل من 72 ساعة على موعد التسليم","Due within 72 hours")}">${x("clock",11)} ${e("خلال 72 ساعة","Due in 72h")}</span>`);const o=i?"var(--red)":s==="due_24h"?"#ea580c":s==="due_48h"?"#d97706":s==="due_72h"?"#0284c7":"var(--muted)",c=l._commentCounts?l._commentCounts[t.id]||0:(l.data?.comments||[]).filter(v=>v.taskId===t.id).length,p=l._docCounts?l._docCounts[t.id]||0:(l.data?.documents||[]).filter(v=>v.taskId===t.id).length,d=t.progress===100?"var(--mint-strong)":t.progress>=80?"var(--amber)":t.progress>0?"var(--blue)":"var(--line)",f=ee(t),m=e(t.titleAr,t.titleEn);return`<article class="task-card ${r} ${f?"":"not-draggable"}" draggable="false" tabindex="0" role="button" aria-roledescription="sortable task card" aria-label="${a(m)}" data-action="open-task" data-task-id="${a(t.id)}">
    <div class="task-card-top">
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="task-drag-handle" title="${e("اسحب لتحريك المهمة","Drag to reorder")}" style="cursor:grab;touch-action:none;padding:1px 4px;border-radius:4px;color:var(--muted);font-size:12px;opacity:0.65;user-select:none;transition:opacity 0.15s ease;">⋮⋮</span>
        <span class="task-code">${a(t.templateId?t.templateId.replace("tpl-","#"):"#CUSTOM")}</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        ${t._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${e("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${e("معلقة","Pending")}</span>`:""}
        ${c>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${c} ${e("تعليقات","comments")}">💬 ${c}</span>`:""}
        ${p>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${p} ${e("مرفقات","attachments")}">📎 ${p}</span>`:""}
        ${n}
        <span class="priority-badge ${a(t.priority)}">${a(xe(t.priority))}</span>
      </div>
    </div>
    <h4>${a(e(t.titleAr,t.titleEn))}</h4>
    ${(()=>{const v=String(e(t.descriptionAr||t.description,t.descriptionEn||t.description)||"").trim();if(!v)return"";const h=v.length>50?v.substring(0,50).trim()+"...":v;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${a(v)}">${a(h)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${a(e(t.categoryAr,t.categoryEn)||"")}</span>
      ${t.dueDate?`<span class="task-due-date" style="display:inline-flex;align-items:center;gap:3px;color:${o};font-weight:${i||s?"700":"500"};">${x("calendar",11)} ${O(t.dueDate)}</span>`:""}
    </div>
    <div class="task-card-foot">
      ${be(t)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${t.progress===100?"var(--mint-strong)":"var(--teal)"};">${t.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${t.progress}%;background:${d};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function J(t){if(!t)return 999999;if(typeof t.sortOrder=="number")return t.sortOrder;if(typeof t.sort_order=="number")return t.sort_order;if(t.customFields){if(typeof t.customFields.sortOrder=="number")return t.customFields.sortOrder;if(typeof t.customFields.sort_order=="number")return t.customFields.sort_order}if(t.custom_fields){if(typeof t.custom_fields.sortOrder=="number")return t.custom_fields.sortOrder;if(typeof t.custom_fields.sort_order=="number")return t.custom_fields.sort_order}return 999999}function $e(t=[]){const s={urgent:4,high:3,medium:2,low:1},i=Date.now();return[...t].sort((n,r)=>{const o=n.status==="blocked"?1:0,c=r.status==="blocked"?1:0;if(o!==c)return c-o;const p=n.dueDate?new Date(`${n.dueDate.split("T")[0]}T23:59:59`).getTime():null,d=r.dueDate?new Date(`${r.dueDate.split("T")[0]}T23:59:59`).getTime():null,f=p&&p<i&&n.status!=="done"?1:0,m=d&&d<i&&r.status!=="done"?1:0;if(f!==m)return m-f;const v=s[n.priority]||2,h=s[r.priority]||2;if(v!==h)return h-v;if(p&&d){if(p!==d)return p-d}else{if(p&&!d)return-1;if(!p&&d)return 1}const b=J(n),D=J(r);return b!==D?b-D:(n.titleAr||"").localeCompare(r.titleAr||"","ar")})}function U(){try{return localStorage.getItem("darc_task_sort_pref")||"custom"}catch{return"custom"}}function se(t,s="sort-project-tasks"){const i=t||U();return`
    <div class="sort-box">
      <span>${e("الترتيب:","Sort:")}</span>
      <select class="filter-select select-compact" data-action="${s}">
        <option value="custom" ${i==="custom"?"selected":""}>${e("ترتيب مخصص (السحب والإسقاط)","Custom (Drag & Drop)")}</option>
        <option value="importance" ${i==="importance"?"selected":""}>${e("حسب الأهمية والأولوية","By Importance & Priority")}</option>
        <option value="deadline" ${i==="deadline"?"selected":""}>${e("الأقرب استحقاقاً","Earliest Deadline")}</option>
        <option value="alpha" ${i==="alpha"?"selected":""}>${e("أبجدياً","Alphabetical")}</option>
      </select>
    </div>
  `}function we(t=[],s=U()){return s==="deadline"?[...t].sort((i,n)=>(i.dueDate?new Date(`${i.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)-(n.dueDate?new Date(`${n.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)):s==="custom"?[...t].sort((i,n)=>J(i)-J(n)):s==="alpha"?[...t].sort((i,n)=>(i.titleAr||"").localeCompare(n.titleAr||"","ar")):$e(t)}function re(t,s=U()){const i=l.data?.users||[];l._userMap=new Map(i.map(o=>[o.id,o]));const n={};for(const o of l.data?.comments||[])o.taskId&&(n[o.taskId]=(n[o.taskId]||0)+1);const r={};for(const o of l.data?.documents||[])o.taskId&&(r[o.taskId]=(r[o.taskId]||0)+1);return l._commentCounts=n,l._docCounts=r,`<div class="board">${[{key:"not_started",dot:"",label:u("notStarted")},{key:"in_progress",dot:"blue",label:u("inProgress")},{key:"review",dot:"amber",label:e("مراجعة / اعتماد","Review / approval"),statuses:["review","approval","blocked"]},{key:"done",dot:"green",label:u("done")}].map(o=>{const c=we(t.filter(p=>(o.statuses||[o.key]).includes(p.status)),s);return`<section class="board-column" data-status="${o.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${o.dot}"></span>${o.label}</div><span class="board-count">${c.length}</span></div><div class="board-cards">${c.length?c.map(he).join(""):`<div class="empty" style="min-height:150px;pointer-events:none;">${u("noTasks")}</div>`}</div></section>`}).join("")}</div>`}function oe(t,s){const i=l.calendarDate?new Date(l.calendarDate):new Date,n=i.getFullYear(),r=i.getMonth(),o=`${l.lang==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][r]:["January","February","March","April","May","June","July","August","September","October","November","December"][r]} ${n}`,c=l.lang==="ar"?["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],p=new Date(n,r,1).getDay(),d=new Date(n,r+1,0).getDate(),f=new Date,m=f.getFullYear()===n&&f.getMonth()===r;let v="";for(let h=0;h<p;h++)v+='<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>';for(let h=1;h<=d;h++){const b=m&&f.getDate()===h,D=`${n}-${String(r+1).padStart(2,"0")}-${String(h).padStart(2,"0")}`,g=t.filter(w=>{if(!w.dueDate&&!w.startDate)return!1;const z=w.dueDate?w.dueDate.split("T")[0]:null,C=w.startDate?w.startDate.split("T")[0]:null;return z===D||C===D});v+=`
      <div class="calendar-day ${b?"is-today":""}" style="min-height:95px;min-width:0;overflow:hidden;background:${b?"var(--mint)":"var(--surface)"};border:1px solid ${b?"var(--teal)":"var(--line)"};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${b?"bold":"600"};color:${b?"var(--teal)":"var(--ink)"};">
          <span>${h}</span>
          ${b?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${e("اليوم","Today")}</span>`:""}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${g.map(w=>{const z=ve(w);return`
              <div data-action="open-task" data-task-id="${a(w.id)}" style="background:${z.bgColor};border:1px solid ${z.borderColor};border-inline-start:3px solid ${z.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${z.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${a(e(w.titleAr,w.titleEn))} — ${z.label}">
                <span style="font-weight:700;">${a(e(w.titleAr,w.titleEn))}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}return`
    <div class="calendar-wrapper" style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;">
      <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;font-size:15px;color:var(--ink);display:flex;align-items:center;gap:8px;">
          ${x("calendar",16)} ${o}
        </h3>
        <div style="display:flex;align-items:center;gap:6px;">
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${x(l.lang==="ar"?"arrow":"arrowLeft",12)} ${e("السابق","Prev")}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${e("اليوم","Today")}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${e("التالي","Next")} ${x(l.lang==="ar"?"arrowLeft":"arrow",12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${c.map(h=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${h}</div>`).join("")}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${v}
      </div>
    </div>
  `}function V(t){const s=t.filter(d=>d.startDate&&d.dueDate).sort((d,f)=>new Date(d.startDate)-new Date(f.startDate));if(!s.length)return`<div class="empty" style="min-height:300px">${x("calendar",24)}<span>${e("لا توجد مهام مجدولة زمنياً في هذا المشروع.","No scheduled tasks in this project.")}</span></div>`;let i=Math.min(...s.map(d=>new Date(d.startDate).getTime())),n=Math.max(...s.map(d=>new Date(d.dueDate).getTime()));const r=2592e5;i-=r,n+=r;const o=Math.max(7,Math.ceil((n-i)/864e5));let c="";for(let d=0;d<o;d++){const f=new Date(i+d*864e5),m=f.getDay()===5||f.getDay()===6,v=Le()==="hijri"?l.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":l.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",h=new Intl.DateTimeFormat(v,{month:"short"}).format(f);c+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${m?"var(--surface-soft)":"transparent"};border-bottom:1px solid var(--line)">${f.getDate()}<br>${h}</div>`}const p=s.map((d,f)=>{const m=Math.floor((new Date(d.startDate).getTime()-i)/864e5)+1,v=m+Math.max(1,Math.ceil((new Date(d.dueDate).getTime()-new Date(d.startDate).getTime())/864e5)+1),h=ve(d);return`<div style="display:contents" class="timeline-row" data-task-id="${d.id}" data-row="${f}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${d.id}" style="grid-column: ${m} / ${v}; margin: 8px 4px; background: ${h.color}; border: 1px solid ${h.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${a(e(d.titleAr,d.titleEn))} — ${h.label}">
        <span style="font-weight:600;opacity:0.9">${a(d.templateId?d.templateId.replace("tpl-","#"):"#")}</span> ${a(e(d.titleAr,d.titleEn))}
        ${d.dependencies&&d.dependencies.length?`<span style="float:${l.lang==="ar"?"left":"right"};opacity:0.8">${x("link",10)}</span>`:""}
      </div>
    </div>`}).join("");return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${o}, minmax(40px, 1fr)); min-width: ${o*40}px; position: relative;">
      ${c}
      ${p}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function ke(t,s){const i=l.timelineView||"gantt";return`
    <div class="panel">
      <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 class="panel-title">${e("المخطط الزمني والتقويم","Timeline & Calendar")}</h2>
          <p class="panel-subtitle">${e("متابعة تسلسل المهام ومواعيد التسليم بالصيغة الأنسب لك.","Track task flow and milestone deadlines in your preferred format.")}</p>
        </div>
        <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:3px;gap:3px;">
          <button class="btn btn-sm ${i==="gantt"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="gantt" style="font-size:11px;padding:4px 10px;">
            ${x("clock",12)} ${e("مخطط جانت","Gantt Chart")}
          </button>
          <button class="btn btn-sm ${i==="calendar"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="calendar" style="font-size:11px;padding:4px 10px;">
            ${x("calendar",12)} ${e("عرض التقويم","Calendar View")}
          </button>
        </div>
      </div>
      
      ${i==="calendar"?oe(t,s):V(t)}
    </div>
  `}typeof window<"u"&&(window.__timelineExports={renderTimelinePanel:ke,renderCalendar:oe,renderTimeline:V});function De(t){const s=(l.searches?.tasks||"").trim().toLowerCase();return t.filter(i=>{const n=!s||`${i.titleAr||""} ${i.titleEn||""} ${i.categoryAr||""} ${i.categoryEn||""}`.toLowerCase().includes(s),r=l.taskFilter==="all"||l.taskFilter==="mine"&&Ne(i,l.data?.user?.id)||l.taskFilter==="due_soon"&&Fe(i)||l.taskFilter==="overdue"&&ne(i)||l.taskFilter==="blocked"&&i.status==="blocked",o=l.taskProjectFilter==="all"||i.projectId===l.taskProjectFilter,c=!l.taskPriorityFilter||l.taskPriorityFilter==="all"||i.priority===l.taskPriorityFilter;return n&&r&&o&&c})}function Ye(){const t=De(l.data?.tasks||[]),s=[["all",u("all")],["mine",e("مسندة لي","Assigned to me")],["due_soon",e("تستحق قريباً","Due soon")],["overdue",u("overdue")],["blocked",u("blocked")]],i=l.myTaskSort||U();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${e("حركة التنفيذ","EXECUTION")}</p>
        <h1>${u("myTasks")}</h1>
        <p>${e("نظّم العمل حسب الحالة، الموعد، والمسؤولية.","Organize work by status, deadline, and ownership.")}</p>
      </div>
      <div class="page-actions">
        ${j("create_tasks")?`<button class="btn btn-primary" data-action="new-task">${x("plus",15)} ${u("addTask")}</button>`:""}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${s.map(([n,r])=>`
            <button class="segmented-tab ${l.taskFilter===n?"active":""}" data-action="task-filter" data-filter="${n}" role="tab">
              ${r}
            </button>
          `).join("")}
        </div>
        <div class="search-box tasks-search-box">
          ${x("search",15)}
          <input data-search="tasks" value="${a(l.searches.tasks)}" placeholder="${e("بحث في المهام...","Search tasks...")}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${e("📁 كل المشاريع","📁 All Projects")}</option>
            ${(l.data?.projects||[]).map(n=>`<option value="${a(n.id)}" ${l.taskProjectFilter===n.id?"selected":""}>${a(e(n.nameAr,n.nameEn))}</option>`).join("")}
          </select>
          <select class="filter-select select-compact" data-action="task-priority-filter" style="min-width:140px;">
            <option value="all">${e("⚡ كل الأولويات","⚡ All Priorities")}</option>
            <option value="urgent" ${l.taskPriorityFilter==="urgent"?"selected":""}>🔥 ${e("عاجلة","Urgent")}</option>
            <option value="high" ${l.taskPriorityFilter==="high"?"selected":""}>⚡ ${e("عالية","High")}</option>
            <option value="medium" ${l.taskPriorityFilter==="medium"?"selected":""}>🔹 ${e("متوسطة","Medium")}</option>
            <option value="low" ${l.taskPriorityFilter==="low"?"selected":""}>☕ ${e("منخفضة","Low")}</option>
          </select>
        </div>
        <div class="tasks-toolbar-sort">
          ${se(i,"sort-my-tasks")}
        </div>
      </div>
    </div>

    ${t.length?re(t,i):`<section class="panel"><div class="empty">${x("checklist",18)}<span>${u("noTasks")}</span></div></section>`}
  `}function Te(t){return Oe(t,{includeSeconds:!1}).full}function de(t=[],s=[]){const i=l.data?.users||[];let n="";return t.forEach(r=>{const o=i.find(c=>c.id===r)||{name:r,id:r};n+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${I(o,"mini-avatar")}
        <span style="font-weight:500;">${a(e(o.name,o.nameEn||o.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${a(r)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${e("إزالة","Remove")}">×</button>
      </span>
    `}),s.forEach(r=>{n+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${a(r)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${e("خارجي","Ext")}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${a(r)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${e("إزالة","Remove")}">×</button>
      </span>
    `}),n}function le(t=[]){return t.length?t.map((s,i)=>`
    <div class="reminder-card-row" data-idx="${i}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${a(Te(s.remindAt))}</strong>
        ${s.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${a(s.noteAr)}">(${a(s.noteAr)})</span>`:""}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${i}" data-rem-id="${a(s.id||"")}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${e("حذف التذكير","Delete reminder")}">
        ${x("trash",13)}
      </button>
    </div>
  `).join(""):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${e("لا توجد مواعيد تذكير مجدولة لهذه المهمة","No scheduled reminders for this task")}</div>`}function Ve(t=null,s=null,i=null){const n=l.data?.templates?.find(g=>g.id===(s||t?.templateId)),r=t?.projectId||i||l.activeProjectId||l.data?.projects?.[0]?.id||"",o=Array.isArray(t?.customFields?.additionalAssignees)?t.customFields.additionalAssignees:Array.isArray(t?.customFields?.additional_assignees)?t.customFields.additional_assignees:[],c=Array.isArray(t?.customFields?.externalAssignees)?t.customFields.externalAssignees:Array.isArray(t?.customFields?.external_assignees)?t.customFields.external_assignees:[];let p=[];Array.isArray(t?.customFields?.reminders)?p=t.customFields.reminders:t?.remindAt?p=[{id:"rem_"+Math.random().toString(36).substring(2,11),remindAt:t.remindAt,noteAr:""}]:Array.isArray(l.data?.reminders)&&t?.id&&(p=(l.data?.reminders||[]).filter(g=>g.taskId===t.id));const d=t?.progress!==void 0?t.progress:t?.status==="done"?100:t?.status==="review"||t?.status==="approval"?80:t?.status==="in_progress"?50:0,f=o.length>0||c.length>0,m=f?de(o,c):"",v=le(p),h=`<form id="task-form" data-task-id="${a(t?.id||"")}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${a(t?.typeAr||n?.typeAr||(n?"مخطط":""))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${a(t?.typeEn||n?.typeEn||(n?"Drawing":""))}" />
    <input type="hidden" name="additionalAssignees" id="task-additional-assignees-input" value="${a(JSON.stringify(o))}" />
    <input type="hidden" name="externalAssignees" id="task-external-assignees-input" value="${a(JSON.stringify(c))}" />
    <input type="hidden" name="remindersJson" id="task-reminders-input" value="${a(JSON.stringify(p))}" />

    <div class="form-grid">
      <!-- 📋 القسم 1: البيانات الأساسية والمكتبة القياسية -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 2px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📋</span> <span>${e("البيانات الأساسية والمكتبة القياسية","Basic Details & Standard Library")}</span>
      </div>

      <div class="field full">
        <label>${e("المشروع التابع له","Project")} *</label>
        <select name="projectId" id="task-project-select" required>
          ${(l.data?.projects||[]).map(g=>`<option value="${a(g.id)}" ${g.id===r?"selected":""}>${a(e(g.nameAr,g.nameEn))} (${a(g.code)})</option>`).join("")}
        </select>
      </div>

      <div class="field full">
        <label>${u("taskTitle")} *</label>
        <input name="titleAr" id="task-title-ar" value="${a(t?.titleAr||n?.nameAr||"")}" placeholder="${e("اسم المخرج أو المهمة","Deliverable or task name")}" required />
      </div>
      <div class="field">
        <label>${u("nameEn")}</label>
        <input name="titleEn" id="task-title-en" value="${a(t?.titleEn||n?.nameEn||"")}" placeholder="${e("Task / Deliverable Name (EN)","Task / Deliverable Name (EN)")}" />
      </div>
      <div class="field">
        <label>${u("addFromLibrary")}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${e("مهمة مخصصة","Custom task")}</option>
          ${(l.data?.templates||[]).map(g=>`<option value="${a(g.id)}" ${(t?.templateId||s)===g.id?"selected":""}>${a(g.code)} — ${a(e(g.nameAr,g.nameEn))}</option>`).join("")}
        </select>
      </div>

      <!-- 👥 القسم 2: المسؤوليات وفريق العمل -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>👥</span> <span>${e("المسؤوليات وفريق العمل","Ownership & Team")}</span>
      </div>

      <div class="field full">
        <label>${e("المسؤول الرئيسي","Primary Assignee")}</label>
        <select name="assigneeId" id="task-primary-assignee">
          <option value="">${e("— بدون تحديد —","— Unassigned —")}</option>
          ${(l.data?.users||[]).map(g=>`<option value="${a(g.id)}" ${(t?t.assigneeId===g.id:l.data?.user?.id===g.id)?"selected":""}>${a(e(g.name,g.nameEn||g.name))}</option>`).join("")}
        </select>
      </div>

      <!-- قائمة منسدلة موحدة وسريعة للبحث والتحديد للأعضاء والمسؤولين الخارجيين -->
      <div class="field full" style="position:relative;">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${e("فريق العمل والمسؤولون المشاركون (داخلي وخارجي)","Collaborators & Assignees (Team & External)")}</span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${e("اختر من الفريق أو اكتب اسماً خارجياً واضغط إضافة","Pick team members or type external name")}</span>
        </label>

        <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
        <div id="assignees-chips-container" style="display:${f?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
          ${m}
        </div>

        <!-- حقل البحث والإضافة السريعة -->
        <div style="position:relative;display:flex;gap:6px;">
          <input type="text" id="assignee-combobox-search" placeholder="${e("ابحث عن عضو بالفريق أو اكتب اسماً خارجياً...","Search team member or type external name...")}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          <button type="button" id="btn-add-external-quick" class="btn btn-soft btn-sm" style="display:none;padding:0 12px;white-space:nowrap;font-size:11px;">
            ➕ ${e("إضافة كمسؤول خارجي","Add external")}
          </button>
        </div>

        <!-- القائمة المنسدلة للبحث والاختيار -->
        <div id="assignee-combobox-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
        </div>
      </div>

      <!-- ⏱️ القسم 3: الحالة والجدولة والتذكيرات (بدون تبعيات نهائياً) -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>⏱️</span> <span>${e("الحالة والجدولة والتذكيرات","Status, Scheduling & Reminders")}</span>
      </div>

      <div class="field">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${u("status")}</span>
          <span id="task-auto-progress-badge" style="font-size:11px;font-weight:600;color:var(--teal);">(${d}%)</span>
        </label>
        <select name="status" id="task-status-select">${je().map(([g,w])=>`<option value="${g}" ${t?.status===g?"selected":""}>${w}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${u("priority")}</label>
        <select name="priority">${["low","medium","high","urgent"].map(g=>`<option value="${g}" ${(t?.priority||"medium")===g?"selected":""}>${xe(g)}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${u("startDate")}</label>
        <input type="date" name="startDate" id="task-start-date" value="${a((t?.startDate||"").split("T")[0])}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${u("dueDate")}</label>
        <input type="date" name="dueDate" id="task-due-date" value="${a((t?.dueDate||"").split("T")[0])}" min="${a((t?.startDate||"").split("T")[0])}" onchange="const st = document.getElementById('task-start-date'); if (st && st.value && this.value < st.value) this.value = st.value;" />
      </div>

      <!-- أداة التذكيرات المتعددة التفاعلية -->
      <div class="field full" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:10px;padding:12px;">
        <label style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:600;display:flex;align-items:center;gap:6px;">
            <span>⏰</span> ${e("تذكيرات المهمة (إشعار نظام + بريد إلكتروني للمسؤول)","Task Reminders (System Notification + Email to Assignee)")}
          </span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${e("يمكنك إضافة أكثر من موعد تذكير وحذف ما تشاء","Add multiple reminders and delete any")}</span>
        </label>

        <!-- قائمة التذكيرات المضافة (Pre-rendered for zero layout shift) -->
        <div id="task-reminders-list" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
          ${v}
        </div>

        <!-- صف إضافة تذكير جديد -->
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <input type="datetime-local" id="new-reminder-datetime" style="flex:1;min-width:180px;font-size:12px;padding:6px 10px;" />
          <input type="text" id="new-reminder-note" placeholder="${e("ملاحظة التذكير (اختياري)...","Reminder note (optional)...")}" style="flex:1;min-width:150px;font-size:12px;padding:6px 10px;" />
          <button type="button" id="btn-add-reminder" class="btn btn-soft btn-sm" style="white-space:nowrap;padding:7px 12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">
            ➕ ${e("إضافة تذكير","Add Reminder")}
          </button>
        </div>
      </div>

      <!-- 📝 القسم 4: تفاصيل ومخرجات المهمة -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📝</span> <span>${e("تفاصيل ومخرجات المهمة","Task Details & Deliverables")}</span>
      </div>

      <div class="field full">
        <label>${u("description")}</label>
        <textarea name="descriptionAr" placeholder="${e("ما المطلوب؟ وما معيار الإغلاق؟","What is required and what defines completion?")}">${a(t?.descriptionAr||"")}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${t&&(j("delete_tasks")||S())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${a(t.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${e("حذف المهمة ونقلها لسلة المهملات","Delete task and move to trash")}">
            ${x("trash",14)} ${e("حذف المهمة","Delete Task")}
          </button>
        `:""}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${u("cancel")}</button>
        <button type="submit" class="btn btn-primary">${x("check",14)} ${t?u("save"):u("create")}</button>
      </div>
    </div>
  </form>`;let b=h,D="";if(t){D="modal-lg";const g=ye(t);b=`
      <div class="task-modal-layout">
        <div class="task-modal-col task-modal-main">
          <h3 style="margin:0 0 15px;font-size:14px;">${e("تفاصيل المهمة","Task Details")}</h3>
          ${h}
        </div>
        <div class="task-modal-col task-modal-side">
          <div class="task-documents-section">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;font-size:14px;display:flex;align-items:center;gap:6px;">
                ${e("المخططات والملفات","Documents & Files")}
              </h3>
              ${g?`
              <label class="btn btn-soft btn-sm" style="cursor:pointer;margin:0;" id="task-upload-btn">
                ${x("plus",12)} ${e("اختيار ملفات","Choose Files")}
                <input type="file" multiple id="task-upload-input" data-task-id="${t.id}" style="display:none;" />
              </label>
              `:""}
            </div>
            ${g?`
            <div id="task-dropzone" data-action="trigger-upload" data-task-id="${t.id}" style="border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;background:var(--surface-soft);cursor:pointer;transition:all 0.2s ease;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;">
                <span style="color:var(--brand-teal);">${x("upload",22)}</span>
                <div style="font-size:12px;font-weight:600;color:var(--ink);">${e("اسحب المخططات والملفات وأفلتها هنا، أو اضغط للتصفح","Drag & drop files here, or click to browse")}</div>
                <div style="font-size:10px;color:var(--muted);">${e("دعم كامل لملفات CAD و PDF و 3D و الصور حتى 5GB","Full support for CAD, PDF, 3D & images up to 5GB")}</div>
              </div>
              <div id="upload-progress-container" style="display:none;margin-top:12px;padding:10px 12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.04);text-align:start;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--ink);margin-bottom:6px;gap:8px;">
                  <span id="upload-progress-text" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${e("جاري الرفع...","Uploading...")}</span>
                  <strong id="upload-progress-percent" style="color:var(--brand-teal);font-variant-numeric:tabular-nums;flex-shrink:0;">0%</strong>
                </div>
                <div style="height:6px;background:var(--line);border-radius:3px;overflow:hidden;position:relative;">
                  <div id="upload-progress-bar" style="width:0%;height:100%;background:linear-gradient(90deg, var(--brand-teal), #00c2cb);border-radius:3px;transition:width 0.15s ease;"></div>
                </div>
              </div>
            </div>
            `:`
            <div style="padding:10px 12px;margin-bottom:12px;background:var(--surface-soft);border:1px dashed var(--line);border-radius:8px;font-size:11px;color:var(--muted);text-align:center;">
              🔒 ${e("إرفاق ورفع الملفات متاح لمدير المشروع والمسند إليهم المهمة فقط.","File attachments restricted to project managers and task assignees.")}
            </div>
            `}
            <div id="task-documents-list">${ze(t)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${e("النقاشات والتعليقات","Discussion & Comments")}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${pe(t)}</div>
            <form id="task-comment-form" data-task-id="${t.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${e("اكتب تعليقاً... (استخدم @ للإشارة)","Write a comment... (use @ to mention)")}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${e("إرسال","Send")}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `}document.getElementById("modal-root").innerHTML=ie(t?e("تعديل المهمة","Edit task"):u("addTask"),e("المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.","A task is the unit of execution; link a standard deliverable and add a reminder."),b,"task",D),Ae(t)}function Ae(t){const s=document.getElementById("modal-root");if(!s)return;const i=s.querySelector("#task-status-select"),n=s.querySelector("#task-auto-progress-badge");i&&n&&i.addEventListener("change",()=>{const $={not_started:0,in_progress:50,review:80,approval:80,done:100}[i.value]??0;n.textContent=`(${$}%)`});const r=s.querySelector("#task-template-select");r&&r.addEventListener("change",()=>{const $=r.value,k=(l.data?.templates||[]).find(T=>T.id===$);if(k){const T=s.querySelector("#task-title-ar"),A=s.querySelector("#task-title-en"),N=s.querySelector("#task-type-ar"),F=s.querySelector("#task-type-en");T&&!T.value&&(T.value=k.nameAr||""),A&&!A.value&&(A.value=k.nameEn||""),N&&(N.value=k.typeAr||"مخطط"),F&&(F.value=k.typeEn||"Drawing")}});const o=s.querySelector("#task-additional-assignees-input"),c=s.querySelector("#task-external-assignees-input"),p=s.querySelector("#assignees-chips-container"),d=s.querySelector("#assignee-combobox-search"),f=s.querySelector("#assignee-combobox-dropdown"),m=s.querySelector("#btn-add-external-quick");let v=[];try{v=JSON.parse(o?.value||"[]")}catch{v=[]}let h=[];try{h=JSON.parse(c?.value||"[]")}catch{h=[]}function b(){o&&(o.value=JSON.stringify(v)),c&&(c.value=JSON.stringify(h))}function D(){if(p){if(v.length===0&&h.length===0){p.style.display="none",p.innerHTML="",b();return}p.style.display="flex",p.innerHTML=de(v,h),b()}}function g($=""){if(!f)return;const k=$.trim().toLowerCase(),T=l.data?.users||[],A=s.querySelector("#task-primary-assignee")?.value,N=T.filter(P=>{if(P.id===A)return!1;if(!k)return!0;const q=(P.name||"").toLowerCase(),K=(P.nameEn||"").toLowerCase(),Q=(P.email||"").toLowerCase();return q.includes(k)||K.includes(k)||Q.includes(k)});let F="";k&&(F+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${e("إضافة مسؤول خارجي:","Add external assignee:")} "${a($.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${e("إضافة سريعة","Quick Add")}</span>
        </div>
      `),N.length===0&&!k?F+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${e("لا يوجد مستخدمين آخرين","No other users")}</div>`:N.forEach(P=>{const q=v.includes(P.id);F+=`
          <div class="combobox-user-row" data-uid="${a(P.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${a(P.id)}" ${q?"checked":""} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${I(P,"mini-avatar")}
              <div>
                <strong style="color:var(--ink);">${a(e(P.name,P.nameEn||P.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${a(e(P.jobTitleAr,P.jobTitleEn)||P.email||"")}</span>
              </div>
            </div>
            ${q?'<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>':""}
          </div>
        `}),f.innerHTML=F,f.style.display="block"}b(),d&&(d.addEventListener("focus",()=>{g(d.value)}),d.addEventListener("input",()=>{const $=d.value.trim();g($),m&&(m.style.display=$.length>1?"inline-flex":"none")}),d.addEventListener("keydown",$=>{if($.key==="Enter"){$.preventDefault();const k=d.value.trim();k&&(h.includes(k)||(h.push(k),D()),d.value="",m&&(m.style.display="none"),f&&(f.style.display="none"))}})),m&&m.addEventListener("click",()=>{const $=d?.value.trim();$&&(h.includes($)||(h.push($),D()),d.value="",m.style.display="none",f&&(f.style.display="none"))}),f&&f.addEventListener("click",$=>{if($.target.closest(".dropdown-ext-action")){const T=d?.value.trim();T&&!h.includes(T)&&(h.push(T),D()),d&&(d.value=""),m&&(m.style.display="none"),f.style.display="none";return}const k=$.target.closest(".combobox-user-row");if(k){const T=k.dataset.uid;v.includes(T)?v=v.filter(A=>A!==T):v.push(T),D(),g(d?.value||"")}}),p&&p.addEventListener("click",$=>{const k=$.target.closest(".btn-remove-chip-user");if(k){const A=k.dataset.uid;v=v.filter(N=>N!==A),D(),f&&f.style.display==="block"&&g(d?.value||"");return}const T=$.target.closest(".btn-remove-chip-ext");if(T){const A=T.dataset.ext;h=h.filter(N=>N!==A),D()}});const w=s.querySelector("#task-reminders-input"),z=s.querySelector("#task-reminders-list"),C=s.querySelector("#new-reminder-datetime"),R=s.querySelector("#new-reminder-note"),H=s.querySelector("#btn-add-reminder");let _=[];try{_=JSON.parse(w?.value||"[]")}catch{_=[]}Array.isArray(_)||(_=[]);function y(){z&&(w&&(w.value=JSON.stringify(_)),z.innerHTML=le(_))}H&&H.addEventListener("click",()=>{const $=C?.value;if(!$){M(e("يرجى اختيار تاريخ ووقت التذكير.","Please pick a reminder date & time."),!0);return}const k=R?.value.trim()||"",T={id:"rem_temp_"+Math.random().toString(36).substring(2,11),remindAt:new Date($).toISOString(),noteAr:k};_.push(T),C&&(C.value=""),R&&(R.value=""),y(),M(e("تمت إضافة موعد التذكير للقائمة.","Reminder added to list."))}),z&&z.addEventListener("click",async $=>{const k=$.target.closest(".btn-delete-reminder");if(k){const T=Number(k.dataset.idx),A=k.dataset.remId;!isNaN(T)&&T>=0&&T<_.length&&(_.splice(T,1),y(),A&&!A.startsWith("rem_temp_")&&B(`/api/reminders/${A}`,{method:"DELETE"}).catch(()=>{}),M(e("تم حذف موعد التذكير.","Reminder deleted.")))}}),s.addEventListener("mousedown",$=>{f?.contains($.target)||d?.contains($.target)||m?.contains($.target)||(f&&(f.style.display="none"),m&&(m.style.display="none"))}),t&&t.id&&!t.id.startsWith("demo_")&&B(`/api/tasks/${encodeURIComponent(t.id)}/comments`,{silent:!0}).then($=>{if($&&Array.isArray($.comments)){l.data&&!l.data.comments&&(l.data.comments=[]);const k=new Map((l.data?.comments||[]).map(A=>[A.id,A]));for(const A of $.comments)k.set(A.id,A);l.data&&(l.data.comments=Array.from(k.values()));const T=document.getElementById("task-comments-list");T&&document.getElementById("task-comment-form")?.dataset?.taskId===t.id&&(T.innerHTML=pe(t))}}).catch(()=>{})}function pe(t){const s=(l.data?.comments||[]).filter(i=>i.taskId===t.id).sort((i,n)=>new Date(i.createdAt)-new Date(n.createdAt));return s.length?`<div style="display:flex;flex-direction:column;gap:12px;">${s.map(i=>{const n=i.user||(l.data?.users||[]).find(p=>p.id===i.userId)||l.data?.user||{name:"DARC Member",id:""},r=!!(n.id&&l.data?.user?.id&&n.id===l.data?.user?.id),o=r||typeof S=="function"&&S(),c=a(i.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,'<strong style="color:var(--blue)">@$1</strong>');return`
      <div class="task-comment-item" data-comment-id="${a(i.id)}" style="display:flex;gap:10px;flex-direction:${r?"row-reverse":"row"};">
        ${I(n)}
        <div style="display:flex;flex-direction:column;align-items:${r?"flex-end":"flex-start"};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${a(e(n.name,n.nameEn||n.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${O(i.createdAt,!0)}</span>
            ${o?`
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${a(i.id)}" data-task-id="${a(t.id)}" title="${e("تعديل التعليق","Edit comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${x("edit",12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${a(i.id)}" data-task-id="${a(t.id)}" title="${e("حذف التعليق","Delete comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${x("trash",12)}
                </button>
              </div>
            `:""}
          </div>
          <div id="comment-bubble-${a(i.id)}" style="background:${r?"var(--blue)":"var(--surface)"};color:${r?"#fff":"var(--ink)"};padding:8px 12px;border-radius:12px;font-size:13px;border:${r?"none":"1px solid var(--border)"};border-top-${r?"right":"left"}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${c}</div>
        </div>
      </div>
    `}).join("")}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${x("message",18)}<span style="font-size:12px;">${e("لا توجد تعليقات","No comments yet")}</span></div>`}function ze(t){const s=(l.data?.documents||[]).filter(i=>i.taskId===t.id).sort((i,n)=>new Date(n.createdAt)-new Date(i.createdAt));return s.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${s.map(i=>`
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;transition:background 0.15s ease;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;cursor:pointer;" data-action="preview-doc" data-doc-id="${a(i.id)}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${x("document",14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${a(i.originalName)}">${a(i.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${O(i.createdAt,!0)} · ${a(i.user?e(i.user.name,i.user.nameEn||i.user.name):"Team Member")} · ${i.size>1048576?(i.size/1048576).toFixed(1)+"MB":Math.round(i.size/1024)+"KB"}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${a(i.id)}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${e("نسخ رابط Google Drive","Copy Drive link")}">${x("link",14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${a(i.id)}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${e("معاينة المخطط في نافذة منبثقة","Preview in popup modal")}">${x("eye",14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${a(i.id)}" style="padding:4px;min-width:0;height:auto;color:var(--blue);" title="${e("تحميل المخطط","Download")}">${x("download",14)}</button>
        ${j("review_tasks")||j("approve_tasks")||j("upload_documents")||S()?`
          <select class="doc-status-select" data-doc-id="${a(i.id)}" style="font-size:11px;padding:2px 4px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);">
            <option value="draft" ${i.status==="draft"?"selected":""}>${e("مسودة","Draft")}</option>
            ${j("review_tasks")||S()?`<option value="review" ${i.status==="review"?"selected":""}>${e("مراجعة","Review")}</option>`:""}
            ${j("approve_tasks")||S()?`<option value="approved" ${i.status==="approved"?"selected":""}>${e("معتمد","Approved")}</option>`:""}
            <option value="superseded" ${i.status==="superseded"?"selected":""}>${e("ملغى","Superseded")}</option>
          </select>
        `:""}
        ${j("upload_documents")||S()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${a(i.id)}" style="padding:4px;min-width:0;height:auto;" title="${e("إعادة تسمية","Rename")}">${x("edit",14)}</button>`:""}
        ${j("delete_documents")||S()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${a(i.id)}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${e("حذف","Delete")}">${x("trash",14)}</button>`:""}
      </div>
    </div>
  `).join("")}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${x("document",18)}<span style="font-size:12px;">${e("لا توجد ملفات مرفوعة","No documents uploaded")}</span></div>`}function je(){return[["not_started",u("notStarted")],["in_progress",u("inProgress")],["review",u("review")],["approval",u("approval")],["done",u("done")],["blocked",u("blocked")],["canceled",u("canceled")]]}var me="";function Ke(){const t=document.querySelector(".timeline-container > div"),s=document.querySelector(".timeline-svg");if(!t||!s)return;const i=Array.from(document.querySelectorAll(".timeline-bar")),n=t.getBoundingClientRect(),r=`${Math.round(n.width)}_${i.length}_${l.lang}_${(l.data?.tasks||[]).length}`;if(r===me&&s.hasChildNodes())return;me=r,s.innerHTML="";const o={};i.forEach(d=>{const f=d.getBoundingClientRect();o[d.dataset.taskId]={left:f.left-n.left,right:f.right-n.left,top:f.top-n.top,bottom:f.bottom-n.top,width:f.width,height:f.height,center:f.top-n.top+f.height/2}});let c="";const p=l.lang==="ar";i.forEach(d=>{const f=d.dataset.taskId,m=(l.data?.tasks||[]).find(b=>b.id===f),v=m?.dependencies||m?.customFields?.dependencies||[];if(!m||!v.length)return;const h=o[f];h&&v.forEach(b=>{const D=o[b];if(!D)return;const g=p?D.left:D.right,w=D.center,z=p?h.right:h.left,C=h.center,R=g+(p?-20:20);c+=`<path d="M ${g} ${w} C ${R} ${w}, ${R} ${C}, ${z} ${C}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),s.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${c}
  `}var ct=ue({buildProjectMemberChipsHtml:()=>Z,exportPortfolioPDF:()=>st,exportPortfolioXLS:()=>at,exportProjectPDF:()=>nt,exportProjectXLS:()=>it,exportXLS:()=>ae,getCompanyBranding:()=>W,getDaysLeftBadge:()=>ce,getProjectTeam:()=>Qe,getProjectTeamData:()=>G,openCloneModal:()=>tt,openProjectModal:()=>et,projectCard:()=>Ce,renderInPagePrintModal:()=>ge,renderProjectCardTeamAvatars:()=>Se,renderProjectDetail:()=>Ze,renderProjectOverviewTab:()=>_e,renderProjectTeamAvatars:()=>Ee,renderProjectTimelineBar:()=>Pe,renderProjects:()=>Ie});function ce(t){if(!t)return"";const s=te(t);if(!s||isNaN(s.getTime()))return"";const i=Math.ceil((s-new Date)/864e5);if(isNaN(i))return"";let n="var(--mint-strong)",r="var(--mint)",o="";return i<0?(n="var(--red)",r="var(--red-soft)",o=e(`متأخر ${Math.abs(i)} يوم`,`${Math.abs(i)}d overdue`)):i===0?(n="var(--red)",r="var(--red-soft)",o=e("يستحق اليوم","Due today")):i<=2?(n="var(--red)",r="var(--red-soft)",o=e(`باقي ${i} يوم`,`${i}d left`)):i<=7?(n="var(--amber)",r="var(--amber-soft)",o=e(`باقي ${i} أيام`,`${i}d left`)):(n="var(--mint-strong)",r="var(--mint)",o=e(`باقي ${i} يوم`,`${i}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${n};background:${r};border:1px solid currentColor;">${x("clock",11)} ${o}</span>`}function G(t){const s=l.data?.users||[],i=(l.data?.tasks||[]).filter(o=>o.projectId===t.id),n=new Set,r=new Set;return t.managerId&&n.add(t.managerId),i.forEach(o=>{o.assigneeId&&n.add(o.assigneeId),(o.customFields?.additionalAssignees||o.customFields?.additional_assignees||[]).forEach(c=>n.add(c)),(o.customFields?.externalAssignees||o.customFields?.external_assignees||[]).forEach(c=>{c&&typeof c=="string"&&c.trim()&&r.add(c.trim())})}),{internalMembers:Array.from(n).map(o=>s.find(c=>c.id===o)).filter(Boolean),externalMembers:Array.from(r)}}function Qe(t){return G(t).internalMembers}function Ee(t,s=4,i=!0,n=[]){if((!t||!t.length)&&(!n||!n.length))return`<span style="font-size:11px;color:var(--muted);">${e("لا يوجد فريق محدد","No team assigned")}</span>`;const r=(t||[]).slice(0,s),o=(t||[]).length-s,c=(t||[]).map(d=>e(d.name,d.nameEn||d.name)).join("، ");let p='<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">';return r.forEach(d=>{const f=e(d.name,d.nameEn||d.name),m=i?`data-action="filter-by-member" data-member-id="${a(d.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:'style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"';p+=`
      <span class="team-member-chip" ${m} title="${a(f)} (${a(X(d))})">
        ${I(d,"mini-avatar")}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${a(f)}</span>
      </span>
    `}),o>0&&(p+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${a(c)}">+${o} ${e("آخرين","more")}</span>`),n&&n.length>0&&(p+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${a(n.join("، "))}">🌐 +${n.length} ${e("خارجي","ext")}</span>`),p+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${e("فريق العمل الداخلي","Internal Team")} (${(t||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(t||[]).map(d=>`
        <div ${i?`data-action="filter-by-member" data-member-id="${a(d.id)}" title="${a(e("فلترة مهام "+(d.name||""),"Filter tasks of "+(d.nameEn||d.name||"")))}"`:""} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${i?"cursor:pointer;transition:all 0.15s;":""}" ${i?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:""}>
          ${I(d,"micro-avatar")}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${a(e(d.name,d.nameEn||d.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${a(X(d))}</span>
          </div>
        </div>
      `).join("")}
    </div>
    
    ${n&&n.length>0?`
      <hr style="border:0;border-top:1px dashed var(--line);margin:8px 0 6px;" />
      <strong style="display:block;font-size:11px;color:var(--teal);margin-bottom:6px;">🌐 ${e("الشركاء والمتعاونون الخارجيون","External Partners")} (${n.length})</strong>
      <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin;">
        ${n.map(d=>`
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink);background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;white-space:nowrap;">
            <span style="font-size:11px;color:var(--teal);">🌐</span>
            <span style="font-weight:500;">${a(d)}</span>
          </div>
        `).join("")}
      </div>
    `:""}

    ${i?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${e("💡 اضغط على أي عضو لفلترة مهامه","💡 Click member to filter tasks")}</div>`:""}
  </div>`,p+="</div>",p}function Pe(t){if(!t.dueDate)return"";const s=te(t.dueDate);if(!s||isNaN(s.getTime()))return"";const i=new Date(t.startDate||t.createdAt||Date.now()-2592e6),n=new Date,r=s.getTime()-i.getTime();let o=0;r>0&&!isNaN(r)&&(o=Math.min(100,Math.max(0,Math.round((n.getTime()-i.getTime())/r*100))));const c=n>s,p=c?"var(--red)":o>=80&&!c?"var(--amber)":"var(--blue)";return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;flex-wrap:wrap;gap:6px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${x("clock",12)}
          <strong>${e("المؤشر الزمني للمشروع","Project Schedule Elapsed")}</strong>: 
          <span style="color:${p};font-weight:bold;">${c?e("انتهى موعد التسليم!","Deadline passed!"):e(`مضى ${o}% من الوقت`,`${o}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${O(t.startDate)} ➔ ${O(t.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${o}%;background:${p};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function Se(t=[],s=[],i=3){const n=t.length+s.length;if(n===0)return'<span style="font-size:11px;color:var(--muted);">—</span>';const r=t.slice(0,i),o=n-r.length;[...t.map(p=>e(p.name,p.nameEn||p.name)),...s].join("، ");let c=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${e("عرض فريق العمل","View Team")}">`;return c+='<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">',r.forEach((p,d)=>{c+=`
      <div style="margin-inline-start:${d===0?"0":"-8px"};position:relative;z-index:${10-d};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${I(p,"mini-avatar")}
      </div>
    `}),o>0&&(c+=`
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${o}
      </div>
    `),s&&s.length>0&&o<=0&&(c+='<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;">🌐</span>'),c+="</div>",c+=`
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${e("فريق العمل","Team Members")}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${n}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${t.map(p=>`
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${I(p,"micro-avatar")}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a(e(p.name,p.nameEn||p.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${a(X(p))}</span>
            </div>
          </div>
        `).join("")}
      </div>
      ${s&&s.length>0?`
        <div style="margin-top:8px;padding-top:6px;border-top:1px dashed var(--line);">
          <span style="font-size:9.5px;font-weight:700;color:var(--teal);display:block;margin-bottom:4px;">🌐 ${e("الشركاء الخارجيون","External Partners")} (${s.length})</span>
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${s.map(p=>`
              <div style="font-size:10.5px;color:var(--ink-soft);padding:2px 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                • ${a(p)}
              </div>
            `).join("")}
          </div>
        </div>
      `:""}
    </div>
  `,c+="</div>",c}function Ce(t){const{internalMembers:s,externalMembers:i}=G(t),n=t.manager||(l.data?.users||[]).find(c=>c.id===t.managerId),r=ce(t.dueDate),o=e(t.descriptionAr||t.clientAr,t.descriptionEn||t.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;cursor:pointer;" data-action="open-project" data-project-id="${a(t.id)}">
        <span class="project-card-symbol">${x("building",19)}</span>
        <div style="min-width:0;flex:1;">
          <span class="eyebrow" style="font-size:10px;margin-bottom:2px;display:block;">${a(t.code)}</span>
          <h3 class="project-card-title" title="${a(e(t.nameAr,t.nameEn))}">${a(e(t.nameAr,t.nameEn))}</h3>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;align-self:flex-start;">
        ${t._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${e("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${e("معلقة","Pending")}</span>`:""}
        <span class="status-badge ${a(t.health)}">${a(L(t.health))}</span>
      </div>
    </div>
    
    <p class="project-card-desc" title="${a(o||"")}">
      ${o?a(o):`<span style="color:var(--muted);font-style:italic;">${e("لا يوجد وصف مسجل لهذا المشروع","No description registered")}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${I(n,"mini-avatar")}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${u("manager")}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a(n?e(n.name,n.nameEn||n.name):"—")}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${u("team")} (${s.length+i.length})</span>
        ${Se(s,i,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${u("deadline")}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <strong>${t.dueDate?O(t.dueDate,!0):"—"}</strong>
          ${r}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${t.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${t.health==="off_track"?"red":t.health==="at_risk"?"amber":""}" style="width:${t.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${a(t.id)}">
      ${u("viewDetails")} ${x(l.lang==="ar"?"arrowLeft":"arrow",13)}
    </button>
  </article>`}function _e(t,s,i,n=[]){const r=t.manager||(l.data?.users||[]).find(d=>d.id===t.managerId),o=s.filter(d=>d.status==="done").length,c=s.filter(d=>d.status==="in_progress").length,p=s.filter(ne).length;return`
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${e("إجمالي المهام","Total Tasks")}</span>
          <div class="metric-value">${s.length}</div>
          <span class="metric-note up">${o} ${u("done")}</span>
        </div>
        <div class="metric-card blue" style="padding:14px 18px;">
          <span class="metric-label">${e("قيد التنفيذ","In Progress")}</span>
          <div class="metric-value">${c}</div>
          <span class="metric-note">${e("عمل جارٍ","Active work")}</span>
        </div>
        <div class="metric-card ${p?"red":"teal"}" style="padding:14px 18px;">
          <span class="metric-label">${u("overdue")}</span>
          <div class="metric-value">${p}</div>
          <span class="metric-note ${p?"alert":"up"}">${p?e("تحتاج تدخلاً عاجلاً","Needs urgent action"):e("لا يوجد تأخير","On track")}</span>
        </div>
        <div class="metric-card amber" style="padding:14px 18px;">
          <span class="metric-label">${e("فريق العمل","Team Size")}</span>
          <div class="metric-value">${i.length+(n?.length||0)}</div>
          <span class="metric-note">${e("أعضاء مساهمون","Active contributors")}</span>
        </div>
      </div>

      <!-- Schedule Timeline Bar -->
      ${Pe(t)}

      <!-- Details Grid -->
      <div class="project-details-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 280px), 1fr));gap:16px;">
        <!-- Left: Project Scope & Client -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${x("document",16)}
            ${e("نطاق وتفاصيل المشروع","Project Scope & Details")}
          </h3>
          <p style="color:var(--ink-soft);font-size:13px;line-height:1.7;margin-bottom:18px;">
            ${a(t.descriptionAr||t.descriptionEn||e("لا يوجد وصف مسجل لهذا المشروع حالياً.","No description available for this project."))}
          </p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:var(--surface-soft);padding:14px;border-radius:10px;border:1px solid var(--line);">
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${u("client")}</span>
              <strong style="font-size:13px;color:var(--ink);">${a(e(t.clientAr,t.clientEn)||"—")}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${u("lifecycle")}</span>
              <strong style="font-size:13px;color:var(--ink);">${a(L(t.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${u("startDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${O(t.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${u("dueDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${O(t.dueDate,!0)}</strong>
            </div>
          </div>
        </div>

        <!-- Right: Team & Leadership -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${x("users",16)}
            ${e("القيادة وفريق العمل","Leadership & Team")}
          </h3>

          <!-- Manager card -->
          <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:10px;margin-bottom:16px;background:var(--surface);">
            ${I(r)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${u("manager")}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${a(r?e(r.name,r.nameEn||r.name):"—")}</strong>
              <span style="font-size:11px;color:var(--muted);">${a(r?.email||"")}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${e("أعضاء الفريق الداخلي:","Internal Team Members:")}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${i.map(d=>{const f=s.filter(m=>m.assigneeId===d.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${I(d,"mini-avatar")}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${a(e(d.name,d.nameEn||d.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${a(X(d))}</span>
                    </div>
                  </div>
                  <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${f} ${u("tasks")}</span>
                </div>
              `}).join("")}
          </div>

          ${n&&n.length>0?`
            <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0 10px;" />
            <span style="font-size:11px;color:var(--teal);font-weight:bold;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              🌐 ${e("الشركاء والمتعاونون الخارجيون:","External Partners & Collaborators:")}
            </span>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:180px;overflow-y:auto;">
              ${n.map(d=>{const f=s.filter(m=>(m.customFields?.externalAssignees||m.customFields?.external_assignees||[]).includes(d)).length;return`
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="font-size:14px;">🌐</span>
                      <div>
                        <strong style="display:block;font-size:12px;color:var(--ink);">${a(d)}</strong>
                        <span style="font-size:10px;color:var(--muted);">${e("شريك / جهة خارجية","External Partner")}</span>
                      </div>
                    </div>
                    <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${f} ${u("tasks")}</span>
                  </div>
                `}).join("")}
            </div>
          `:""}
        </div>
      </div>
    </div>
  `}function Ie(){const t=(l.searches?.projects||"").trim().toLowerCase();let s=(l.data?.projects||[]).filter(n=>!t||`${n.nameAr||""} ${n.nameEn||""} ${n.code||""} ${n.clientAr||""} ${n.clientEn||""}`.toLowerCase().includes(t));const i=l.projectSort||"default";return i==="alpha-asc"?s.sort((n,r)=>(e(n.nameAr,n.nameEn)||"").localeCompare(e(r.nameAr,r.nameEn)||"",l.lang==="ar"?"ar":"en")):i==="alpha-desc"?s.sort((n,r)=>(e(r.nameAr,r.nameEn)||"").localeCompare(e(n.nameAr,n.nameEn)||"",l.lang==="ar"?"ar":"en")):i==="progress-asc"?s.sort((n,r)=>(Number(n.progress)||0)-(Number(r.progress)||0)):i==="progress-desc"&&s.sort((n,r)=>(Number(r.progress)||0)-(Number(n.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${e("المحفظة","PORTFOLIO")}</p><h1>${u("projects")}</h1><p>${e("كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.","One view for every project: health, progress, team, and next deadline.")}</p></div><div class="page-actions">${j("create_projects")?`<button class="btn btn-primary" data-action="new-project">${x("plus",15)} ${u("addProject")}</button>`:""}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${x("search",15)}<input data-search="projects" value="${a(l.searches.projects)}" placeholder="${u("search")}" /></div><div class="sort-box"><span>${e("الترتيب:","Sort:")}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${i==="default"?"selected":""}>${e("الافتراضي","Default")}</option><option value="alpha-asc" ${i==="alpha-asc"?"selected":""}>${e("أبجدياً (أ - ي)","Alphabetical (A - Z)")}</option><option value="alpha-desc" ${i==="alpha-desc"?"selected":""}>${e("أبجدياً (ي - أ)","Alphabetical (Z - A)")}</option><option value="progress-asc" ${i==="progress-asc"?"selected":""}>${e("نسبة الإنجاز (تصاعدي 0% ← 100%)","Progress (Low to High)")}</option><option value="progress-desc" ${i==="progress-desc"?"selected":""}>${e("نسبة الإنجاز (تنازلي 100% ← 0%)","Progress (High to Low)")}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${s.length} ${e("مشاريع","projects")}</span></div></div>${s.length?`<div class="project-cards">${s.map(Ce).join("")}</div>`:`<section class="panel"><div class="empty">${x("building",18)}<span>${u("noProjects")}</span></div></section>`}`}function Ze(){const t=l.data?.projects?.find(v=>v.id===l.activeProjectId);if(!t)return l.view="projects",Ie();const s=(l.data?.tasks||[]).filter(v=>v.projectId===t.id),{internalMembers:i,externalMembers:n}=G(t),r=l.projectTab||"tasks",o=l.projectMemberFilter||null,c=o?s.filter(v=>v.assigneeId===o||(v.customFields?.additionalAssignees||v.customFields?.additional_assignees||[]).includes(o)):s,p=o?l.data?.users?.find(v=>v.id===o):null;let d="";if(r==="overview")d=_e(t,s,i,n);else if(r==="tasks"){const v=l.projectTaskSort||U();d=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${u("projectTasks")} ${o?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${e("مهام","Tasks of")}: ${a(e(p?.name,p?.nameEn||p?.name))})</span>`:""}</h2>
            <p class="panel-subtitle">${e("توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.","Tasks grouped by current workflow state, automatically sorted.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${se(v,"sort-project-tasks")}
            ${o?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${x("close",12)} ${e("إلغاء الفلترة","Clear filter")}</button>`:""}
            ${j("create_tasks")?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${a(t.id)}" title="${e("اضغط N للإضافة السريعة","Press N to add quickly")}">${x("plus",14)} ${u("addTask")} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:""}
          </div>
        </div>
        ${re(c,v)}
      </div>
    `}else if(r==="timeline"){const{renderTimelinePanel:v}=window.__timelineExports||{};d=v?v(c,t):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${e("المخطط الزمني والتقويم","Timeline & Calendar")}</h2></div></div>${V(c)}</div>`}else if(r==="drawings"){const v=(l.data?.documents||[]).filter(g=>g.projectId===t.id&&!g.deletedAt),h=s.filter(g=>g.typeAr==="مخطط"||g.typeEn==="Drawing"||g.templateId),b=l.docTaskFilter||"all",D=b==="all"?v:v.filter(g=>g.taskId===b);d=`
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
                <option value="all" ${b==="all"?"selected":""}>${e("— جميع المهام —","— All Tasks —")}</option>
                ${s.map(g=>`<option value="${a(g.id)}" ${b===g.id?"selected":""}>${a(e(g.titleAr,g.titleEn))}</option>`).join("")}
              </select>
            </div>
            ${j("create_tasks")?`
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${a(t.id)}">
                ${x("plus",12)} ${e("إضافة مخرج / مخطط","Add Deliverable / Drawing")}
              </button>
            `:""}
          </div>
        </div>

        <!-- Section 1: Uploaded Files (Direct previews) -->
        <div style="margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${x("document",14)} ${e("الملفات والمخططات المرفوعة","Uploaded Files & Blueprints")} (${D.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${e("اسم المخطط / الملف","Blueprint / File Name")}</th>
                  <th>${u("tasks")}</th>
                  <th>${e("الحالة","Status")}</th>
                  <th>${e("الحجم","Size")}</th>
                  <th>${e("تاريخ الرفع","Upload Date")}</th>
                  <th style="text-align:end;">${e("الإجراءات","Actions")}</th>
                </tr>
              </thead>
              <tbody>
                ${D.length>0?D.map(g=>{const w=s.find(C=>C.id===g.taskId),z=g.size>1048576?(g.size/1048576).toFixed(1)+" MB":Math.round((g.size||0)/1024)+" KB";return`
                    <tr data-doc-id="${a(g.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${a(g.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${x("document",15)}
                          </span>
                          <div>
                            <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${a(g.originalName)}">
                              ${a(g.originalName)}
                            </strong>
                            <span style="font-size:11px;color:var(--muted);">${a(g.mimeType||"application/octet-stream")}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${w?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${a(w.id)}">${a(e(w.titleAr,w.titleEn))}</span>`:"—"}
                      </td>
                      <td>
                        <span class="status-badge ${a(g.status||"draft")}" style="font-size:11px;">
                          ${a(L(g.status||"draft"))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${z}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${O(g.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${a(g.id)}" style="padding:5px;" title="${e("معاينة المخطط","Preview")}">
                            ${x("eye",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${a(g.id)}" style="padding:5px;color:var(--teal);" title="${e("نسخ رابط Google Drive","Copy Drive Link")}">
                            ${x("link",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${a(g.id)}" style="padding:5px;color:var(--blue);" title="${e("تحميل المخطط","Download")}">
                            ${x("download",14)}
                          </button>
                        </div>
                      </td>
                    </tr>
                  `}).join(""):`
                  <tr>
                    <td colspan="6">
                      <div class="empty" style="padding:30px 10px;">
                        ${x("document",20)}
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
            ${x("checklist",14)} ${e("مخرجات المخططات المجدولة","Scheduled Drawing Tasks")} (${h.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${u("taskTitle")}</th>
                  <th>${u("taskType")}</th>
                  <th>${u("status")}</th>
                  <th>${u("progress")}</th>
                  <th>${u("assignee")}</th>
                </tr>
              </thead>
              <tbody>
                ${h.map(g=>`
                  <tr data-action="open-task" data-task-id="${a(g.id)}" style="cursor:pointer;" title="${e("انقر لعرض وتعديل المهمة ورفع المخططات","Click to open task and manage files")}">
                    <td><span class="table-title">${a(e(g.titleAr,g.titleEn))}</span><span class="table-sub">${a(g.templateId||"CUSTOM")}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${a(e(g.typeAr,g.typeEn)||e("مخطط","Drawing"))}</span></td>
                    <td><span class="status-badge ${a(g.status)}">${a(L(g.status))}</span></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;min-width:40px;">
                          <div style="height:100%;background:${g.status==="done"?"var(--green)":"var(--blue)"};width:${g.progress||0}%;"></div>
                        </div>
                        <span style="font-size:11px;font-weight:600;">${g.progress||0}%</span>
                      </div>
                    </td>
                    <td>${g.assignee?a(e(g.assignee.name,g.assignee.nameEn||g.assignee.name)):"—"}</td>
                  </tr>
                `).join("")||`<tr><td colspan="5"><div class="empty">${u("noTasks")}</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}else r==="activity"&&(d=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${u("activity")}</h2><p class="panel-subtitle">${e("كل تغيير مهم يبقى قابلًا للمراجعة.","Every important change remains reviewable.")}</p></div></div>${Ue(t.id)}</div>`);const f=t.manager||(l.data?.users||[]).find(v=>v.id===t.managerId),m=ce(t.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${x(l.lang==="ar"?"arrow":"arrowLeft",15)}</button>
        <div>
          <p class="eyebrow">${a(t.code)} · ${t.demo?u("sampleData"):u("active")}</p>
          <h1>${a(e(t.nameAr,t.nameEn))}</h1>
          <p>${a(e(t.descriptionAr||t.clientAr,t.descriptionEn||t.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${x("user",12)} 
              <strong>${u("manager")}:</strong> ${a(f?e(f.name,f.nameEn||f.name):"—")}
            </span>
            ${t.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${x("calendar",12)} ${O(t.dueDate,!0)}
                ${m}
              </span>
            `:""}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${x("users",12)}
              <span style="font-size:11px;">${u("team")}:</span>
              ${Ee(i,4,!0,n)}
            </span>
            <span class="status-badge ${a(t.health)}">${a(L(t.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${t.progress}%</strong>
        <span>${u("weightedProgress")}</span>
        ${j("edit_projects")||j("create_projects")||j("delete_projects")||j("view_reports")||S()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${x("more",15)} ${e("خيارات","Options")}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${l.lang==="ar"?"right:0;left:auto;":"left:0;right:auto;"};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:220px;max-width:min(280px,calc(100vw - 36px));padding:5px;margin-top:5px;text-align:start">
              ${j("edit_projects")||S()?`<button class="menu-item" data-action="edit-project" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${x("edit",14)} ${u("edit")}</button>`:""}
              ${j("create_projects")||S()?`<button class="menu-item" data-action="clone-project" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${x("document",14)} ${e("استنساخ المشروع","Clone Project")}</button>`:""}
              ${j("export_reports")||S()?`
                <button class="menu-item" data-action="export-project-pdf" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--brand-teal);font-weight:600;">
                  ${x("printer",14)} ${e("تقرير تنفيذي معتمد (PDF)","Executive Report (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project-client-pdf" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--ink);">
                  ${x("user",14)} ${e("تقرير تسليمات العميل (PDF)","Client Deliverables (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;">
                  ${x("document",14)} ${e("تصدير بيانات المهام (Excel)","Export Tasks (Excel)")}
                </button>
              `:""}
              ${j("delete_projects")||S()?`<button class="menu-item" data-action="delete-project" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${x("trash",14)} ${e("حذف المشروع","Delete Project")}</button>`:""}
            </div>
          </div>
        `:""}
      </div>
    </div>

    <!-- Sub Navigation Tabs: 'تفاصيل' instead of 'overview' -->
    <div class="detail-tabs">
      <button class="detail-tab ${r==="tasks"?"active":""}" data-action="project-tab" data-tab="tasks">${u("tasks")}</button>
      <button class="detail-tab ${r==="overview"?"active":""}" data-action="project-tab" data-tab="overview">${e("تفاصيل","Details")}</button>
      <button class="detail-tab ${r==="timeline"?"active":""}" data-action="project-tab" data-tab="timeline">${e("المخطط الزمني والتقويم","Timeline & Calendar")}</button>
      <button class="detail-tab ${r==="drawings"?"active":""}" data-action="project-tab" data-tab="drawings">${u("drawings")}</button>
      <button class="detail-tab ${r==="activity"?"active":""}" data-action="project-tab" data-tab="activity">${u("activity")}</button>
    </div>
    
    ${d}
  `}function Z(t=[]){const s=l.data?.users||[];return t.map(i=>{const n=s.find(r=>r.id===i)||{name:i,id:i};return`
      <span class="chip-item" data-uid="${a(i)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${I(n,"mini-avatar")}
        <span style="font-weight:500;">${a(e(n.name,n.nameEn||n.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${a(i)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${e("إزالة","Remove")}">×</button>
      </span>
    `}).join("")}function et(t=null){const s=t?.code||`DARC-${String((l.data?.projects?.length||0)+1).padStart(3,"0")}`,i=t?G(t).internalMembers.map(o=>o.id):[],n=i.length>0?i:[l.data?.user?.id].filter(Boolean),r=`
    <form id="project-form" data-project-id="${a(t?.id||"")}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${a(JSON.stringify(n))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${x("building",14)} <span>${e("البيانات الأساسية للمشروع","Core Project Information")}</span>
        </div>

        <div class="field full">
          <label>${u("nameAr")} *</label>
          <input name="nameAr" value="${a(t?.nameAr||"")}" placeholder="${e("مثال: فيلا النخيل — التصميم الداخلي","e.g. Al Nakheel Villa — Interior Design")}" required />
        </div>
        <div class="field">
          <label>${u("nameEn")}</label>
          <input name="nameEn" value="${a(t?.nameEn||"")}" placeholder="Al Nakheel Villa — Interior Design" />
        </div>
        <div class="field">
          <label>${u("projectCode")} *</label>
          <input name="code" value="${a(s)}" placeholder="DARC-025" required />
        </div>
        <div class="field full">
          <label>${u("client")}</label>
          <input name="clientAr" value="${a(t?.clientAr||"")}" placeholder="${e("اسم العميل أو الجهة المالكة","Client or owning entity")}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${x("calendar",14)} <span>${e("الجدولة والإدارة","Management & Schedule")}</span>
        </div>

        <div class="field full">
          <label>${u("manager")}</label>
          <select name="managerId" id="project-manager-select">
            <option value="">${e("— بدون تحديد —","— Unassigned —")}</option>
            ${(l.data?.users||[]).map(o=>`<option value="${a(o.id)}" ${(t?t.managerId===o.id:l.data?.user?.id===o.id)?"selected":""}>${a(e(o.name,o.nameEn||o.name))}</option>`).join("")}
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
          <label>${u("startDate")}</label>
          <input type="date" name="startDate" value="${a((t?.startDate||"").split("T")[0])}" />
        </div>
        <div class="field">
          <label>${u("dueDate")}</label>
          <input type="date" name="dueDate" value="${a((t?.dueDate||"").split("T")[0])}" />
        </div>

        <!-- 👥 القسم 3: أعضاء فريق المشروع والمشاركون -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:6px;">
            ${x("users",14)} <span>${e("أعضاء فريق المشروع والمشاركون","Project Team Members & Collaborators")}</span>
          </div>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${e("اختر من الفريق لإعطائهم حق الوصول للمشروع","Select team members who can access this project")}</span>
        </div>

        <div class="field full" style="position:relative;">
          <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
          <div id="project-members-chips-container" style="display:${n.length?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
            ${Z(n)}
          </div>

          <!-- حقل البحث والإضافة السريعة -->
          <div style="position:relative;display:flex;gap:6px;">
            <input type="text" id="project-member-search" placeholder="${e("ابحث عن عضو لإضافته لفريق المشروع...","Search team member to add to project team...")}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          </div>

          <!-- القائمة المنسدلة للبحث والاختيار -->
          <div id="project-member-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
          </div>
        </div>

        <!-- 📝 القسم 4: نطاق المشروع والملاحظات -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${x("document",14)} <span>${e("نطاق المشروع والملاحظات","Scope & Notes")}</span>
        </div>

        <div class="field full">
          <label>${e("وصف ونطاق المشروع","Project Scope & Description")}</label>
          <textarea name="descriptionAr" placeholder="${e("وصف مختصر لنطاق العمل، المعايير المعتمدة، وأي ملاحظات خاصة...","Brief description of scope, design criteria, and special notes...")}">${a(t?.descriptionAr||"")}</textarea>
        </div>
      </div>

      <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;margin-top:20px;">
        <div>
          ${t&&(j("delete_projects")||S())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${a(t.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${e("حذف المشروع ونقله لسلة المهملات","Delete project and move to trash")}">
              ${x("trash",14)} ${e("حذف المشروع","Delete Project")}
            </button>
          `:""}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${u("cancel")}</button>
          <button type="submit" class="btn btn-primary">${x("check",14)} ${t?u("save"):u("create")}</button>
        </div>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ie(t?e("تعديل بيانات المشروع","Edit Project"):u("addProject"),e("إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.","Manage project details, schedule, and workflow health."),r,"project"),setTimeout(()=>{const o=document.getElementById("project-member-search"),c=document.getElementById("project-member-dropdown"),p=document.getElementById("project-members-chips-container"),d=document.getElementById("project-members-input"),f=document.getElementById("project-manager-select");if(!o||!c||!p||!d)return;let m=[...n];function v(){p.innerHTML=Z(m),p.style.display=m.length?"flex":"none",d.value=JSON.stringify(m),p.querySelectorAll(".btn-remove-project-member").forEach(b=>{b.addEventListener("click",D=>{D.stopPropagation();const g=b.dataset.uid;m=m.filter(w=>w!==g),v()})})}f&&f.addEventListener("change",()=>{const b=f.value;b&&!m.includes(b)&&(m.push(b),v())});function h(b=""){const D=b.toLowerCase().trim(),g=(l.data?.users||[]).filter(w=>!m.includes(w.id)&&(!D||w.name&&w.name.toLowerCase().includes(D)||w.nameEn&&w.nameEn.toLowerCase().includes(D)||w.email&&w.email.toLowerCase().includes(D)));g.length?(c.innerHTML=g.map(w=>`
          <div class="project-member-opt" data-uid="${a(w.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${I(w,"mini-avatar")}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${a(e(w.name,w.nameEn||w.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${a(w.roleId||"")}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${e("إضافة","Add")}</span>
          </div>
        `).join(""),c.querySelectorAll(".project-member-opt").forEach(w=>{w.addEventListener("mouseenter",()=>w.style.background="var(--surface-soft)"),w.addEventListener("mouseleave",()=>w.style.background="transparent"),w.addEventListener("click",()=>{const z=w.dataset.uid;z&&!m.includes(z)&&(m.push(z),v(),o.value="",c.style.display="none")})})):c.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${e("لا يوجد أعضاء مطابقون","No matching members")}</div>`,c.style.display="block"}o.addEventListener("focus",()=>h(o.value)),o.addEventListener("input",()=>h(o.value)),document.addEventListener("click",b=>{!o.contains(b.target)&&!c.contains(b.target)&&(c.style.display="none")}),v()},50)}function tt(t){const s=`
    <form id="clone-form" data-project-id="${t.id}">
      <p style="margin-top:0;margin-bottom:20px;color:var(--ink-soft);font-size:13px">${e("أنت على وشك استنساخ المشروع:","You are about to clone the project:")} <strong style="color:var(--ink)">${a(e(t.nameAr,t.nameEn))}</strong></p>
      <div class="form-grid">
        <div class="field full">
          <label>${u("nameAr")}</label>
          <input name="nameAr" value="${a(t.nameAr)} (نسخة)" required />
        </div>
        <div class="field full">
          <label>${u("nameEn")}</label>
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
        
        <div style="padding-${l.lang==="ar"?"right":"left"}:26px">
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
        <button type="button" class="btn btn-ghost" data-action="close-modal">${u("cancel")}</button>
        <button type="submit" class="btn btn-primary">${x("document",14)} ${e("استنساخ المشروع","Clone Project")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ie(e("استنساخ المشروع","Clone Project"),e("أداة إنشاء قوالب المشاريع السريعة","Rapid project templating tool"),s,"clone");const i=document.getElementById("clone-form"),n=i.querySelector('input[name="cloneTasks"]'),r=i.querySelector('input[name="keepAssignees"]');n.addEventListener("change",o=>{r.disabled=!o.target.checked,o.target.checked||(r.checked=!1)}),i.addEventListener("submit",async o=>{o.preventDefault();const c=i.querySelector('button[type="submit"]');c.disabled=!0;try{const p={nameAr:i.nameAr.value,nameEn:i.nameEn.value,dueDate:i.dueDate.value,cloneTasks:i.cloneTasks.checked,keepAssignees:i.keepAssignees.checked,cloneMembers:i.cloneMembers.checked},d=await B(`/api/projects/${t.id}/clone`,{method:"POST",body:JSON.stringify(p)});Re(),l.view="project-detail",l.activeProjectId=d.project.id,await Be(),M(e("تم استنساخ المشروع بنجاح.","Project cloned successfully."))}catch(p){M(p.message,!0),c.disabled=!1}})}function at(){const t=l.data?.projects||[];if(!t||!t.length){M(e("لا توجد بيانات لتصديرها.","No data to export."),!0);return}const s=W(),i=Y(),n=11;let r="<table>";r+=`<tr><td colspan="${n}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${s.logoUrl?`<img src="${a(s.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${a(s.displayName)}</span>
  </td></tr>`,r+=`<tr><td colspan="${n}" class="subtitle">${e("تقرير حالة مشاريع المحفظة الهندسية","Portfolio Projects Status Report")}</td></tr>`,r+=`<tr><td colspan="${n}" class="meta">${e("تاريخ الإصدار:","Generated on:")} ${i}</td></tr>`,r+=`<tr><td colspan="${n}" style="border:none;"></td></tr>`,r+=`<tr class="header">
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
  </tr>`,t.forEach(o=>{const c=o.manager?e(o.manager.name,o.manager.nameEn||o.manager.name):"";r+=`<tr>
      <td>${a(E(o.code))}</td>
      <td>${a(E(o.nameAr))}</td>
      <td>${a(E(o.nameEn))}</td>
      <td>${a(E(e(o.clientAr,o.clientEn)))}</td>
      <td>${a(E(c))}</td>
      <td>${a(E(L(o.lifecycle)))}</td>
      <td>${a(E(L(o.health)))}</td>
      <td>${a(E(o.startDate||""))}</td>
      <td>${a(E(o.dueDate||""))}</td>
      <td>${o.progress||0}%</td>
      <td>${o.memberCount||0}</td>
    </tr>`}),r+="</table>",ae(`DARC_Portfolio_Report_${new Date().toISOString().split("T")[0]}`,r),M(e("تم بدء تحميل تقرير المحفظة.","Portfolio report download started.")),B("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:e("تقرير حالة مشاريع المحفظة (Excel)","Portfolio Projects Report (Excel)"),count:t.length}})}).catch(()=>{})}function it(t){const s=(l.data?.projects||[]).find(m=>m.id===t);if(!s)return;const i=(l.data?.tasks||[]).filter(m=>m.projectId===t);if(!i.length){M(e("لا توجد مهام لهذا المشروع لتصديرها.","No tasks to export."),!0);return}const n=W(),r=l.data?.users||[],o=new Map(r.map(m=>[m.id,m]));function c(m){if(!m)return"—";const v=o.get(m);return v?e(v.name,v.nameEn||v.name):m}const p=Y(),d=11;let f="<table>";f+=`<tr><td colspan="${d}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${n.logoUrl?`<img src="${a(n.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${a(n.displayName)}</span>
  </td></tr>`,f+=`<tr><td colspan="${d}" class="subtitle">${e("تقرير مهام ومخرجات المشروع:","Project Tasks & Deliverables Report:")} ${a(e(s.nameAr,s.nameEn))} (${a(s.code)})</td></tr>`,f+=`<tr><td colspan="${d}" class="meta">${e("العميل / المالك:","Client:")} ${a(e(s.clientAr,s.clientEn))||"—"} | ${e("تاريخ الإصدار:","Generated on:")} ${p}</td></tr>`,f+=`<tr><td colspan="${d}" style="border:none;"></td></tr>`,f+=`<tr class="header">
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
  </tr>`,i.forEach((m,v)=>{const h=m.templateId?m.templateId.replace("tpl-","#"):m.id?`#${m.id.slice(-6)}`:`#${v+1}`,b=c(m.assigneeId||m.assignee_id),D=c(m.reviewerId||m.reviewer_id),g=c(m.approverId||m.approver_id);f+=`<tr>
      <td style="text-align:center;font-weight:bold;">${a(E(h))}</td>
      <td>${a(E(m.titleAr))}</td>
      <td>${a(E(m.titleEn))}</td>
      <td>${a(E(e(m.categoryAr,m.categoryEn)))}</td>
      <td>${a(E(b))}</td>
      <td style="color:#0369a1;">${a(E(D))}</td>
      <td style="color:#047857;">${a(E(g))}</td>
      <td>${a(E(L(m.status)))}</td>
      <td>${a(E(m.startDate||""))}</td>
      <td>${a(E(m.dueDate||""))}</td>
      <td style="font-weight:bold;">${m.progress||0}%</td>
    </tr>`}),f+="</table>",ae(`DARC_Project_${s.code}_${new Date().toISOString().split("T")[0]}`,f),M(e("تم بدء تحميل تقرير المهام.","Report download started.")),B("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:t,details:{title:e(`تقرير مهام مشروع: ${s.nameAr}`,`Project Tasks Report: ${s.nameEn||s.nameAr}`),taskCount:i.length}})}).catch(()=>{})}function nt(t,s=!1){const i=(l.data?.projects||[]).find(y=>y.id===t);if(!i)return;const n=(l.data?.tasks||[]).filter(y=>y.projectId===t);if(!n.length){M(e("لا توجد مهام لهذا المشروع لطباعة التقرير.","No tasks to print report."),!0);return}const r=W(),o=l.data?.users||[],c=new Map(o.map(y=>[y.id,y]));function p(y){if(!y)return"—";const $=c.get(y);return $?e($.name,$.nameEn||$.name):y}function d(y){if(!y?.dueDate||["done","completed","canceled"].includes(y.status))return!1;const $=te(y.dueDate);return $?$<new Date:!1}const f=n.length,m=n.filter(y=>["done","completed"].includes(y.status)).length,v=n.filter(y=>["review","approval"].includes(y.status)).length;n.filter(y=>y.status==="in_progress").length;const h=n.filter(y=>d(y)).length,b=new Date,D=Y(b),g=fe(b),w=new Map;n.forEach(y=>{const $=e(y.categoryAr,y.categoryEn)||e(y.typeAr,y.typeEn)||e("عام","General"),k=w.get($)||{total:0,completed:0,weight:0,progressSum:0},T=Number(y.weight||1);k.total++,["done","completed"].includes(y.status)&&k.completed++,k.weight+=T,k.progressSum+=(y.progress||0)*T,w.set($,k)});const z=Array.from(w.entries()).map(([y,$])=>({name:y,percent:$.weight?Math.round($.progressSum/$.weight):0,completed:$.completed,total:$.total})),C=s?e("تقرير تسليمات ومخرجات المشروع للمالك والعميل","Client Deliverables & Milestone Brief"):e("تقرير الإنجاز التنفيذي والمخرجات والاعتمادات الهندسية","Official Executive Engineering & Deliverables Audit");s?e("ملخص رسمي لمخرجات ومخططات المشروع المعتمدة وتواريخ التسليم التعاقدية.","Official summary of approved architectural drawings, milestones, and deliverables."):e("بيان تفصيلي بمسار التنفيذ ومسؤوليات المراجعة والاعتماد لكافة مخرجات المشروع.","Detailed execution readout with review and approval sign-offs for all project assets.");const R=n.map((y,$)=>{const k=y.templateId?y.templateId.replace("tpl-","#"):y.id?`#${y.id.slice(-6)}`:`#${$+1}`,T=e(y.titleAr,y.titleEn),A=e(y.categoryAr,y.categoryEn)||e(y.typeAr,y.typeEn)||"—",N=L(y.status),F=y.progress||0,P=y.dueDate||"—";if(s)return`
        <tr>
          <td style="text-align:center;font-weight:bold;color:#475569;">${$+1}</td>
          <td style="text-align:center;font-weight:600;color:#0d6269;">${a(k)}</td>
          <td style="font-weight:600;">${a(T)}</td>
          <td style="text-align:center;">${a(A)}</td>
          <td style="text-align:center;"><span class="badge ${a(y.status)}">${a(N)}</span></td>
          <td style="text-align:center;direction:ltr;">${a(P)}</td>
          <td style="text-align:center;font-weight:bold;color:${F===100?"#0d6269":"#1e293b"};">${F}%</td>
        </tr>
      `;const q=p(y.assigneeId||y.assignee_id),K=p(y.reviewerId||y.reviewer_id),Q=p(y.approverId||y.approver_id);return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${$+1}</td>
        <td style="text-align:center;font-weight:600;color:#0d6269;">${a(k)}</td>
        <td style="font-weight:600;">${a(T)}</td>
        <td style="text-align:center;">${a(A)}</td>
        <td>${a(q)}</td>
        <td style="color:#0369a1;font-weight:600;">${a(K)}</td>
        <td style="color:#047857;font-weight:600;">${a(Q)}</td>
        <td style="text-align:center;"><span class="badge ${a(y.status)}">${a(N)}</span></td>
        <td style="text-align:center;direction:ltr;">${a(P)}</td>
        <td style="text-align:center;font-weight:bold;color:${F===100?"#0d6269":"#1e293b"};">${F}%</td>
      </tr>
    `}).join(""),H=`
    <!DOCTYPE html>
    <html lang="${l.lang}" dir="${l.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${a(r.displayName)} - ${a(i.code)} - ${s?"Client_Report":"Executive_Report"}</title>
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
          text-align: ${l.lang==="ar"?"left":"right"};
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
          text-align: ${l.lang==="ar"?"right":"left"};
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
            🖨️ ${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button class="btn-toolbar-ghost" onclick="window.location.search = (window.location.search.includes('client=1') ? '' : '?client=1')">
            🔄 ${s?e("التبديل للتقرير الفني الشامل","Switch to Technical Report"):e("التبديل لتقرير المالك والعميل","Switch to Client Report")}
          </button>
          <button class="btn-toolbar-ghost" onclick="window.close()">
            ✕ ${e("إغلاق","Close")}
          </button>
        </div>
      </div>

      <header class="report-header">
        <div>
          ${r.logoUrl?`
            <img src="${a(r.logoUrl)}" alt="Logo" class="brand-logo-img" />
          `:`
            <div class="brand-logo-fallback">D</div>
          `}
          <h1 class="brand-title">${a(r.displayName)}</h1>
          <div class="brand-sub">${e("مكتب الاستشارات والتصميم الهندسي","Architecture & Engineering Consultancy")}</div>
        </div>
        <div class="report-meta-box">
          <div class="report-type-badge">${a(C)}</div>
          <div><strong>${e("كود المشروع:","Project Code:")}</strong> ${a(i.code)}</div>
          <div><strong>${e("تاريخ التقرير:","Report Date:")}</strong> ${a(D)} - ${a(g)}</div>
          <div><strong>${e("حالة المشروع:","Project Status:")}</strong> ${a(L(i.lifecycle))} (${a(L(i.health))})</div>
        </div>
      </header>

      <div class="info-strip">
        <div class="info-cell">
          <strong>${e("اسم المشروع","Project Name")}</strong>
          <span>${a(e(i.nameAr,i.nameEn))}</span>
        </div>
        <div class="info-cell">
          <strong>${e("العميل / المالك","Client / Owner")}</strong>
          <span>${a(e(i.clientAr,i.clientEn))||"—"}</span>
        </div>
        <div class="info-cell">
          <strong>${e("الجدول الزمني","Schedule Timeline")}</strong>
          <span>${a(i.startDate||"—")} → ${a(i.dueDate||"—")}</span>
        </div>
        <div class="info-cell">
          <strong>${e("مدير المشروع المسؤول","Project Manager")}</strong>
          <span>${a(p(i.managerId))}</span>
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${i.progress||0}%</div>
          <div class="kpi-label">${e("نسبة الإنجاز الإجمالية","Overall Progress")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#047857;">${m} / ${f}</div>
          <div class="kpi-label">${e("المخرجات المعتمدة","Approved Deliverables")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#b45309;">${v}</div>
          <div class="kpi-label">${e("قيد المراجعة والاعتماد","Under Review")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:${h>0?"#b91c1c":"#64748b"};">${h}</div>
          <div class="kpi-label">${e("المخرجات المتأخرة","Overdue Deliverables")}</div>
        </div>
      </div>

      ${z.length?`
        <div class="disc-section">
          <strong style="font-size:11px;color:#334155;">${e("مؤشرات الإنجاز بحسب التخصص الهندسي:","Engineering Discipline Progress Breakdown:")}</strong>
          <div class="disc-grid">
            ${z.map(y=>`
              <div class="disc-item">
                <div style="display:flex;justify-content:space-between;font-weight:600;">
                  <span>${a(y.name)}</span>
                  <span>${y.percent}% (${y.completed}/${y.total})</span>
                </div>
                <div class="disc-bar-bg">
                  <div class="disc-bar-fill" style="width:${y.percent}%;"></div>
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
            <th>${s?e("اسم المخرج الهندسي / المخطط","Deliverable / Drawing Title"):e("المهمة والمخرج القياسي","Deliverable & Task Title")}</th>
            <th style="width:90px;">${e("التخصص","Discipline")}</th>
            ${s?"":`
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
          ${R}
        </tbody>
      </table>

      <div class="signature-section">
        <div class="stamp-box">
          ${e("ختم المكتب الهندسي والاستشاري المعتمد","Official Engineering Consultancy Stamp")}
        </div>
        <div class="signature-box">
          <div class="signature-title">${e("مهندس ومدير المشروع","Project Manager")}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${a(p(i.managerId))}</div>
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
        <div>${a(D)}</div>
      </footer>
    </body>
    </html>
  `,_=window.open("","_blank","width=1100,height=900");_?(_.document.open(),_.document.write(H),_.document.close()):ge(H),M(e("تم تجهيز التقرير الرسمي للطباعة والتصدير PDF.","Executive report ready for Print / PDF export.")),B("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:t,details:{title:a(C),type:s?"client_pdf":"executive_pdf",taskCount:f}})}).catch(()=>{})}function st(){const t=l.data?.projects||[];if(!t||!t.length){M(e("لا توجد مشاريع لتصدير التقرير.","No projects to export."),!0);return}const s=W(),i=new Date,n=Y(i),r=fe(i),o=t.length,c=t.filter(b=>b.health==="on_track").length,p=t.filter(b=>b.health==="at_risk").length,d=t.filter(b=>b.health==="off_track").length,f=t.map((b,D)=>{const g=b.manager?e(b.manager.name,b.manager.nameEn||b.manager.name):"—";return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${D+1}</td>
        <td style="text-align:center;font-weight:700;color:#0d6269;">${a(b.code)}</td>
        <td style="font-weight:700;">${a(e(b.nameAr,b.nameEn))}</td>
        <td>${a(e(b.clientAr,b.clientEn))||"—"}</td>
        <td>${a(g)}</td>
        <td style="text-align:center;"><span class="badge ${a(b.lifecycle)}">${a(L(b.lifecycle))}</span></td>
        <td style="text-align:center;"><span class="badge ${a(b.health)}">${a(L(b.health))}</span></td>
        <td style="text-align:center;direction:ltr;">${a(b.startDate||"—")}</td>
        <td style="text-align:center;direction:ltr;">${a(b.dueDate||"—")}</td>
        <td style="text-align:center;font-weight:bold;color:${b.progress===100?"#0d6269":"#0f172a"};">${b.progress||0}%</td>
      </tr>
    `}).join(""),m=e("تقرير الأداء ومتابعة المشاريع للمحفظة الهندسية","Official Portfolio Projects Status & Operations Readout"),v=`
    <!DOCTYPE html>
    <html lang="${l.lang}" dir="${l.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${a(s.displayName)} - Portfolio_Report_${new Date().toISOString().split("T")[0]}</title>
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
        th, td { border: 1px solid #cbd5e1; padding: 7px 9px; text-align: ${l.lang==="ar"?"right":"left"}; vertical-align: middle; }
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
          <strong style="color:#0d6269;font-size:13px;">${a(m)}</strong>
          <div style="font-size:11px;color:#64748b;">${e("معاينة تقرير المحفظة جاهزة للطباعة أو الحفظ كـ PDF.","Portfolio report preview ready for print / save as PDF.")}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-toolbar" onclick="window.print()">🖨️ ${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}</button>
          <button class="btn-toolbar-ghost" onclick="window.close()">✕ ${e("إغلاق","Close")}</button>
        </div>
      </div>

      <header class="report-header">
        <div>
          ${s.logoUrl?`<img src="${a(s.logoUrl)}" alt="Logo" class="brand-logo-img" />`:""}
          <h1 class="brand-title">${a(s.displayName)}</h1>
          <div style="font-size:11px;color:#64748b;">${e("الإدارة الهندسية وضبط الجودة والمشاريع","Engineering Operations & Project Portfolio Readout")}</div>
        </div>
        <div style="text-align:${l.lang==="ar"?"left":"right"};font-size:11px;color:#334155;line-height:1.6;">
          <div style="display:inline-block;background:#e6f4f5;color:#0d6269;font-weight:800;padding:3px 10px;border-radius:4px;font-size:11px;border:1px solid #bce1e4;margin-bottom:4px;">${e("تقرير حالة المحفظة","Portfolio Status Report")}</div>
          <div><strong>${e("تاريخ التقرير:","Report Date:")}</strong> ${a(n)} - ${a(r)}</div>
          <div><strong>${e("إجمالي المشاريع:","Total Projects:")}</strong> ${o}</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${o}</div>
          <div class="kpi-label">${e("إجمالي مشاريع المحفظة","Total Projects")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#166534;">${c}</div>
          <div class="kpi-label">${e("مشاريع تسير وفق الخطة","On Track Projects")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#b45309;">${p}</div>
          <div class="kpi-label">${e("مشاريع تحت المراقبة (مخاطر)","At Risk Projects")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#991b1b;">${d}</div>
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
          ${f}
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
        <div>${a(s.displayName)} — ${e("تقرير إداري معتمد لمحفظة المشاريع","Official Portfolio Readout")}</div>
        <div>${e("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${a(n)}</div>
      </footer>
    </body>
    </html>
  `,h=window.open("","_blank","width=1200,height=900");h?(h.document.open(),h.document.write(v),h.document.close()):ge(v),M(e("تم تجهيز تقرير المحفظة للطباعة والتصدير PDF.","Portfolio report ready for Print / PDF export.")),B("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:a(m),type:"portfolio_pdf",count:o}})}).catch(()=>{})}function ge(t){let s=document.getElementById("print-modal-overlay");s||(s=document.createElement("div"),s.id="print-modal-overlay",s.style.position="fixed",s.style.inset="0",s.style.zIndex="1400",s.style.background="rgba(0, 0, 0, 0.75)",s.style.backdropFilter="blur(4px)",s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="center",s.style.padding="15px",document.body.appendChild(s)),s.innerHTML=`
    <div style="background:var(--surface, #ffffff);color:var(--ink);width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.4);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line);background:var(--surface-soft);flex-wrap:wrap;gap:8px;">
        <strong style="color:var(--brand-teal);font-size:14px;">${e("معاينة التقرير الرسمي المعتمد (PDF Preview)","Official Approved Report (PDF Preview)")}</strong>
        <div style="display:flex;gap:10px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-print-iframe" style="display:flex;align-items:center;gap:6px;">
            ${x("printer",14)} ${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-close-print-modal">✕</button>
        </div>
      </div>
      <div style="flex:1;overflow:hidden;position:relative;background:#ffffff;">
        <iframe id="print-preview-iframe" style="width:100%;height:100%;border:none;background:#ffffff;" srcdoc="${a(t)}"></iframe>
      </div>
    </div>
  `,s.style.display="flex";const i=()=>{s.style.display="none",s.innerHTML="",window.removeEventListener("keydown",n)},n=r=>{r.key==="Escape"&&i()};window.addEventListener("keydown",n),document.getElementById("btn-close-print-modal")?.addEventListener("click",i),document.getElementById("btn-print-iframe")?.addEventListener("click",()=>{const r=document.getElementById("print-preview-iframe");r&&r.contentWindow&&(r.contentWindow.focus(),r.contentWindow.print())})}export{tt as a,ye as c,pe as d,ze as f,it as i,Ke as l,at as n,et as o,pt as p,nt as r,ct as s,st as t,Ve as u};
