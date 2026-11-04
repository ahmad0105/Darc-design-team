import{t as ve}from"./rolldown-runtime-BQ-_32WO.js";import{$ as I,A as M,B as Ne,Et as l,F as B,H as xe,J as be,L as a,N as ae,P as e,R as ie,S as Fe,U as Oe,V as X,W,Z as y,_t as ne,ct as S,et as Re,ft as L,ht as Be,it as se,j as E,n as q,nt as re,ot as ye,pt as x,q as qe,rt as Ue,st as G,ut as He,yt as N}from"./core-dragdrop-B8Zn12as.js";import{s as Je}from"./feature-settings-BA3Qo8zE.js";import{a as We,i as Ye,o as Ge,r as Xe,s as Ve}from"./feature-documents-CWnRDQem.js";var gt=ve({STATUS_OPTIONS:()=>Pe,buildAssigneeChipsHtml:()=>pe,buildRemindersListHtml:()=>ce,canUserMoveTask:()=>ae,canUserUploadToTask:()=>$e,closeDocumentPreviewModal:()=>Xe,downloadDocument:()=>Ye,drawTimelineArrows:()=>Qe,filterTasks:()=>Te,formatRemindAtDate:()=>je,getDocumentShareableLink:()=>We,getSavedTaskSort:()=>H,getTaskSortOrder:()=>J,handleCopyDocLink:()=>Ge,initTaskModalWidgets:()=>Ee,openDocumentPreviewModal:()=>Ve,openTaskModal:()=>Ze,renderBoard:()=>de,renderCalendar:()=>le,renderTaskAssignees:()=>he,renderTaskComments:()=>ge,renderTaskDocuments:()=>ze,renderTaskSortSelect:()=>oe,renderTasks:()=>Ke,renderTimeline:()=>V,renderTimelinePanel:()=>Ae,setSavedTaskSort:()=>He,sortTasks:()=>De,sortTasksByImportance:()=>ke,taskCard:()=>we});function he(t){const s=l.data?.users||[],n=l._userMap||new Map(s.map(p=>[p.id,p])),i=t.assignee||n.get(t.assigneeId),o=(t.customFields?.additionalAssignees||t.customFields?.additional_assignees||[]).map(p=>n.get(p)).filter(Boolean),r=t.customFields?.externalAssignees||t.customFields?.external_assignees||[];let g='<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';return i||o.length?(g+='<div class="avatar-stack" style="display:flex;align-items:center;">',i&&(g+=`<span title="${a(e(i.name,i.nameEn||i.name))}">${M(i,"mini-avatar")}</span>`),o.slice(0,2).forEach(p=>{g+=`<span title="${a(e(p.name,p.nameEn||p.name))}" style="margin-inline-start:-8px;">${M(p,"mini-avatar")}</span>`}),o.length>2&&(g+=`<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${o.slice(2).map(p=>e(p.name,p.nameEn||p.name)).join("، ")}">+${o.length-2}</span>`),g+="</div>",i&&(g+=`<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${a(e(i.name,i.nameEn||i.name))}</span>`)):r.length||(g+='<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>'),r.length&&(r.slice(0,2).forEach(p=>{g+=`<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${a(p)}">🌐 ${a(p)} <small style="opacity:0.8">(${e("خارجي","Ext")})</small></span>`}),r.length>2&&(g+=`<span style="font-size:10px;color:var(--amber);" title="${r.slice(2).map(a).join("، ")}">+${r.length-2}</span>`)),g+="</div>",g}function $e(t){if(!t)return!1;if(I())return!0;if(!E("upload_documents")&&!E("edit_tasks"))return!1;const s=l.data?.user?.id;if(!s)return!1;if(ae(t))return!0;const n=t.projectId||t.project_id;if(n&&Array.isArray(l.data?.projects)){const i=l.data.projects.find(o=>o.id===n);if(i){const o=i.managerId||i.manager_id,r=i.ownerId||i.owner_id||i.leadId||i.lead_id||i.createdById||i.created_by;if(o===s||r===s||Array.isArray(i.members)&&i.members.some(g=>(g.userId||g.id||g)===s)||Array.isArray(i.memberIds)&&i.memberIds.includes(s))return!0}}return!1}function we(t){const s=qe(t),n=s==="overdue"||re(t);let i="",o="";s==="overdue"?(o="is-overdue",i=`<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${y("alert",11)} ${x("overdue")}</span>`):s==="due_24h"?(o="is-due-24h",i=`<span class="due-tag-24h" style="display:inline-flex;align-items:center;gap:3px;" title="${e("متبقي أقل من 24 ساعة على موعد التسليم","Due in less than 24 hours")}">${y("clock",11)} ${e("خلال 24 ساعة","Due in 24h")}</span>`):s==="due_48h"?(o="is-due-48h",i=`<span class="due-tag-48h" style="display:inline-flex;align-items:center;gap:3px;" title="${e("متبقي أقل من 48 ساعة على موعد التسليم","Due within 48 hours")}">${y("clock",11)} ${e("خلال 48 ساعة","Due in 48h")}</span>`):s==="due_72h"&&(o="is-due-72h",i=`<span class="due-tag-72h" style="display:inline-flex;align-items:center;gap:3px;" title="${e("متبقي أقل من 72 ساعة على موعد التسليم","Due within 72 hours")}">${y("clock",11)} ${e("خلال 72 ساعة","Due in 72h")}</span>`);const r=n?"var(--red)":s==="due_24h"?"#ea580c":s==="due_48h"?"#d97706":s==="due_72h"?"#0284c7":"var(--muted)",g=l._commentCounts?l._commentCounts[t.id]||0:(l.data?.comments||[]).filter(v=>v.taskId===t.id).length,p=l._docCounts?l._docCounts[t.id]||0:(l.data?.documents||[]).filter(v=>v.taskId===t.id).length,d=t.progress===100?"var(--mint-strong)":t.progress>=80?"var(--amber)":t.progress>0?"var(--blue)":"var(--line)",f=ae(t),m=e(t.titleAr,t.titleEn);return`<article class="task-card ${o} ${f?"":"not-draggable"}" draggable="false" tabindex="0" role="button" aria-roledescription="sortable task card" aria-label="${a(m)}" data-action="open-task" data-task-id="${a(t.id)}">
    <div class="task-card-top">
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="task-drag-handle" title="${e("اسحب لتحريك المهمة","Drag to reorder")}" aria-label="${e("مقبض السحب","Drag handle")}" role="button" tabindex="0"><span class="drag-handle-dots" aria-hidden="true">⋮⋮</span></span>
        <span class="task-code">${a(t.templateId?t.templateId.replace("tpl-","#"):"#CUSTOM")}</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        ${t._isOfflinePending?`<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${e("بانتظار المزامنة مع السيرفر","Pending cloud sync")}">⏳ ${e("معلقة","Pending")}</span>`:""}
        ${g>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${g} ${e("تعليقات","comments")}">💬 ${g}</span>`:""}
        ${p>0?`<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${p} ${e("مرفقات","attachments")}">📎 ${p}</span>`:""}
        ${i}
        <span class="priority-badge ${a(t.priority)}">${a(ye(t.priority))}</span>
      </div>
    </div>
    <h4>${a(e(t.titleAr,t.titleEn))}</h4>
    ${(()=>{const v=String(e(t.descriptionAr||t.description,t.descriptionEn||t.description)||"").trim();if(!v)return"";const h=v.length>50?v.substring(0,50).trim()+"...":v;return`<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${a(v)}">${a(h)}</p>`})()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${a(e(t.categoryAr,t.categoryEn)||"")}</span>
      ${t.dueDate?`<span class="task-due-date" style="display:inline-flex;align-items:center;gap:3px;color:${r};font-weight:${n||s?"700":"500"};">${y("calendar",11)} ${B(t.dueDate)}</span>`:""}
    </div>
    <div class="task-card-foot">
      ${he(t)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${t.progress===100?"var(--mint-strong)":"var(--teal)"};">${t.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${t.progress}%;background:${d};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`}function J(t){if(!t)return 999999;if(typeof t.sortOrder=="number")return t.sortOrder;if(typeof t.sort_order=="number")return t.sort_order;if(t.customFields){if(typeof t.customFields.sortOrder=="number")return t.customFields.sortOrder;if(typeof t.customFields.sort_order=="number")return t.customFields.sort_order}if(t.custom_fields){if(typeof t.custom_fields.sortOrder=="number")return t.custom_fields.sortOrder;if(typeof t.custom_fields.sort_order=="number")return t.custom_fields.sort_order}return 999999}function ke(t=[]){const s={urgent:4,high:3,medium:2,low:1},n=Date.now();return[...t].sort((i,o)=>{const r=i.status==="blocked"?1:0,g=o.status==="blocked"?1:0;if(r!==g)return g-r;const p=i.dueDate?new Date(`${i.dueDate.split("T")[0]}T23:59:59`).getTime():null,d=o.dueDate?new Date(`${o.dueDate.split("T")[0]}T23:59:59`).getTime():null,f=p&&p<n&&i.status!=="done"?1:0,m=d&&d<n&&o.status!=="done"?1:0;if(f!==m)return m-f;const v=s[i.priority]||2,h=s[o.priority]||2;if(v!==h)return h-v;if(p&&d){if(p!==d)return p-d}else{if(p&&!d)return-1;if(!p&&d)return 1}const $=J(i),D=J(o);return $!==D?$-D:(i.titleAr||"").localeCompare(o.titleAr||"","ar")})}function H(){try{return localStorage.getItem("darc_task_sort_pref")||"custom"}catch{return"custom"}}function oe(t,s="sort-project-tasks"){const n=t||H();return`
    <div class="sort-box">
      <span>${e("الترتيب:","Sort:")}</span>
      <select class="filter-select select-compact" data-action="${s}">
        <option value="custom" ${n==="custom"?"selected":""}>${e("ترتيب مخصص (السحب والإسقاط)","Custom (Drag & Drop)")}</option>
        <option value="importance" ${n==="importance"?"selected":""}>${e("حسب الأهمية والأولوية","By Importance & Priority")}</option>
        <option value="deadline" ${n==="deadline"?"selected":""}>${e("الأقرب استحقاقاً","Earliest Deadline")}</option>
        <option value="alpha" ${n==="alpha"?"selected":""}>${e("أبجدياً","Alphabetical")}</option>
      </select>
    </div>
  `}function De(t=[],s=H()){return s==="deadline"?[...t].sort((n,i)=>(n.dueDate?new Date(`${n.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)-(i.dueDate?new Date(`${i.dueDate.split("T")[0]}T23:59:59`).getTime():1/0)):s==="custom"?[...t].sort((n,i)=>J(n)-J(i)):s==="alpha"?[...t].sort((n,i)=>(n.titleAr||"").localeCompare(i.titleAr||"","ar")):ke(t)}function de(t,s=H()){const n=l.data?.users||[];l._userMap=new Map(n.map(r=>[r.id,r]));const i={};for(const r of l.data?.comments||[])r.taskId&&(i[r.taskId]=(i[r.taskId]||0)+1);const o={};for(const r of l.data?.documents||[])r.taskId&&(o[r.taskId]=(o[r.taskId]||0)+1);return l._commentCounts=i,l._docCounts=o,`<div class="board">${[{key:"not_started",dot:"",label:x("notStarted")},{key:"in_progress",dot:"blue",label:x("inProgress")},{key:"review",dot:"amber",label:e("مراجعة / اعتماد","Review / approval"),statuses:["review","approval","blocked"]},{key:"done",dot:"green",label:x("done")}].map(r=>{const g=De(t.filter(p=>(r.statuses||[r.key]).includes(p.status)),s);return`<section class="board-column" data-status="${r.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${r.dot}"></span>${r.label}</div><span class="board-count">${g.length}</span></div><div class="board-cards">${g.length?g.map(we).join(""):`<div class="empty" style="min-height:150px;pointer-events:none;">${x("noTasks")}</div>`}</div></section>`}).join("")}</div>`}function le(t,s){const n=l.calendarDate?new Date(l.calendarDate):new Date,i=n.getFullYear(),o=n.getMonth(),r=`${l.lang==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][o]:["January","February","March","April","May","June","July","August","September","October","November","December"][o]} ${i}`,g=l.lang==="ar"?["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],p=new Date(i,o,1).getDay(),d=new Date(i,o+1,0).getDate(),f=new Date,m=f.getFullYear()===i&&f.getMonth()===o;let v="";for(let h=0;h<p;h++)v+='<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>';for(let h=1;h<=d;h++){const $=m&&f.getDate()===h,D=`${i}-${String(o+1).padStart(2,"0")}-${String(h).padStart(2,"0")}`,c=t.filter(k=>{if(!k.dueDate&&!k.startDate)return!1;const z=k.dueDate?k.dueDate.split("T")[0]:null,_=k.startDate?k.startDate.split("T")[0]:null;return z===D||_===D});v+=`
      <div class="calendar-day ${$?"is-today":""}" style="min-height:95px;min-width:0;overflow:hidden;background:${$?"var(--mint)":"var(--surface)"};border:1px solid ${$?"var(--teal)":"var(--line)"};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${$?"bold":"600"};color:${$?"var(--teal)":"var(--ink)"};">
          <span>${h}</span>
          ${$?`<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${e("اليوم","Today")}</span>`:""}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${c.map(k=>{const z=be(k);return`
              <div data-action="open-task" data-task-id="${a(k.id)}" style="background:${z.bgColor};border:1px solid ${z.borderColor};border-inline-start:3px solid ${z.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${z.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${a(e(k.titleAr,k.titleEn))} — ${z.label}">
                <span style="font-weight:700;">${a(e(k.titleAr,k.titleEn))}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}return`
    <div class="calendar-wrapper" style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;">
      <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;font-size:15px;color:var(--ink);display:flex;align-items:center;gap:8px;">
          ${y("calendar",16)} ${r}
        </h3>
        <div style="display:flex;align-items:center;gap:6px;">
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${y(l.lang==="ar"?"arrow":"arrowLeft",12)} ${e("السابق","Prev")}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${e("اليوم","Today")}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${e("التالي","Next")} ${y(l.lang==="ar"?"arrowLeft":"arrow",12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${g.map(h=>`<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${h}</div>`).join("")}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${v}
      </div>
    </div>
  `}function V(t){const s=t.filter(d=>d.startDate&&d.dueDate).sort((d,f)=>new Date(d.startDate)-new Date(f.startDate));if(!s.length)return`<div class="empty" style="min-height:300px">${y("calendar",24)}<span>${e("لا توجد مهام مجدولة زمنياً في هذا المشروع.","No scheduled tasks in this project.")}</span></div>`;let n=Math.min(...s.map(d=>new Date(d.startDate).getTime())),i=Math.max(...s.map(d=>new Date(d.dueDate).getTime()));const o=2592e5;n-=o,i+=o;const r=Math.max(7,Math.ceil((i-n)/864e5));let g="";for(let d=0;d<r;d++){const f=new Date(n+d*864e5),m=f.getDay()===5||f.getDay()===6,v=Oe()==="hijri"?l.lang==="ar"?"ar-SA-u-ca-islamic-umalqura":"en-u-ca-islamic-umalqura":l.lang==="ar"?"ar-u-ca-gregory":"en-GB-u-ca-gregory",h=new Intl.DateTimeFormat(v,{month:"short"}).format(f);g+=`<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${m?"var(--surface-soft)":"transparent"};border-bottom:1px solid var(--line)">${f.getDate()}<br>${h}</div>`}const p=s.map((d,f)=>{const m=Math.floor((new Date(d.startDate).getTime()-n)/864e5)+1,v=m+Math.max(1,Math.ceil((new Date(d.dueDate).getTime()-new Date(d.startDate).getTime())/864e5)+1),h=be(d);return`<div style="display:contents" class="timeline-row" data-task-id="${d.id}" data-row="${f}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${d.id}" style="grid-column: ${m} / ${v}; margin: 8px 4px; background: ${h.color}; border: 1px solid ${h.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${a(e(d.titleAr,d.titleEn))} — ${h.label}">
        <span style="font-weight:600;opacity:0.9">${a(d.templateId?d.templateId.replace("tpl-","#"):"#")}</span> ${a(e(d.titleAr,d.titleEn))}
        ${d.dependencies&&d.dependencies.length?`<span style="float:${l.lang==="ar"?"left":"right"};opacity:0.8">${y("link",10)}</span>`:""}
      </div>
    </div>`}).join("");return`<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${r}, minmax(40px, 1fr)); min-width: ${r*40}px; position: relative;">
      ${g}
      ${p}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`}function Ae(t,s){const n=l.timelineView||"gantt";return`
    <div class="panel">
      <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 class="panel-title">${e("المخطط الزمني والتقويم","Timeline & Calendar")}</h2>
          <p class="panel-subtitle">${e("متابعة تسلسل المهام ومواعيد التسليم بالصيغة الأنسب لك.","Track task flow and milestone deadlines in your preferred format.")}</p>
        </div>
        <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:3px;gap:3px;">
          <button class="btn btn-sm ${n==="gantt"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="gantt" style="font-size:11px;padding:4px 10px;">
            ${y("clock",12)} ${e("مخطط جانت","Gantt Chart")}
          </button>
          <button class="btn btn-sm ${n==="calendar"?"btn-primary":"btn-ghost"}" data-action="toggle-timeline-view" data-view-mode="calendar" style="font-size:11px;padding:4px 10px;">
            ${y("calendar",12)} ${e("عرض التقويم","Calendar View")}
          </button>
        </div>
      </div>
      
      ${n==="calendar"?le(t,s):V(t)}
    </div>
  `}typeof window<"u"&&(window.__timelineExports={renderTimelinePanel:Ae,renderCalendar:le,renderTimeline:V});function Te(t){const s=(l.searches?.tasks||"").trim().toLowerCase();return t.filter(n=>{const i=!s||`${n.titleAr||""} ${n.titleEn||""} ${n.categoryAr||""} ${n.categoryEn||""}`.toLowerCase().includes(s),o=l.taskFilter==="all"||l.taskFilter==="mine"&&Ue(n,l.data?.user?.id)||l.taskFilter==="due_soon"&&Re(n)||l.taskFilter==="overdue"&&re(n)||l.taskFilter==="blocked"&&n.status==="blocked",r=l.taskProjectFilter==="all"||n.projectId===l.taskProjectFilter,g=!l.taskPriorityFilter||l.taskPriorityFilter==="all"||n.priority===l.taskPriorityFilter;return i&&o&&r&&g})}function Ke(){const t=Te(l.data?.tasks||[]),s=[["all",x("all")],["mine",e("مسندة لي","Assigned to me")],["due_soon",e("تستحق قريباً","Due soon")],["overdue",x("overdue")],["blocked",x("blocked")]],n=l.myTaskSort||H();return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${e("حركة التنفيذ","EXECUTION")}</p>
        <h1>${x("myTasks")}</h1>
        <p>${e("نظّم العمل حسب الحالة، الموعد، والمسؤولية.","Organize work by status, deadline, and ownership.")}</p>
      </div>
      <div class="page-actions">
        ${E("create_tasks")?`<button class="btn btn-primary" data-action="new-task">${y("plus",15)} ${x("addTask")}</button>`:""}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${s.map(([i,o])=>`
            <button class="segmented-tab ${l.taskFilter===i?"active":""}" data-action="task-filter" data-filter="${i}" role="tab">
              ${o}
            </button>
          `).join("")}
        </div>
        <div class="search-box tasks-search-box">
          ${y("search",15)}
          <input data-search="tasks" value="${a(l.searches.tasks)}" placeholder="${e("بحث في المهام...","Search tasks...")}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${e("📁 كل المشاريع","📁 All Projects")}</option>
            ${(l.data?.projects||[]).map(i=>`<option value="${a(i.id)}" ${l.taskProjectFilter===i.id?"selected":""}>${a(e(i.nameAr,i.nameEn))}</option>`).join("")}
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
          ${oe(n,"sort-my-tasks")}
        </div>
      </div>
    </div>

    ${t.length?de(t,n):`<section class="panel"><div class="empty">${y("checklist",18)}<span>${x("noTasks")}</span></div></section>`}
  `}function je(t){return Ne(t,{includeSeconds:!1}).full}function pe(t=[],s=[]){const n=l.data?.users||[];let i="";return t.forEach(o=>{const r=n.find(g=>g.id===o)||{name:o,id:o};i+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${M(r,"mini-avatar")}
        <span style="font-weight:500;">${a(e(r.name,r.nameEn||r.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${a(o)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${e("إزالة","Remove")}">×</button>
      </span>
    `}),s.forEach(o=>{i+=`
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${a(o)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${e("خارجي","Ext")}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${a(o)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${e("إزالة","Remove")}">×</button>
      </span>
    `}),i}function ce(t=[]){return t.length?t.map((s,n)=>`
    <div class="reminder-card-row" data-idx="${n}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${a(je(s.remindAt))}</strong>
        ${s.noteAr?`<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${a(s.noteAr)}">(${a(s.noteAr)})</span>`:""}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${n}" data-rem-id="${a(s.id||"")}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${e("حذف التذكير","Delete reminder")}">
        ${y("trash",13)}
      </button>
    </div>
  `).join(""):`<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${e("لا توجد مواعيد تذكير مجدولة لهذه المهمة","No scheduled reminders for this task")}</div>`}function Ze(t=null,s=null,n=null){const i=l.data?.templates?.find(c=>c.id===(s||t?.templateId)),o=t?.projectId||n||l.activeProjectId||l.data?.projects?.[0]?.id||"",r=Array.isArray(t?.customFields?.additionalAssignees)?t.customFields.additionalAssignees:Array.isArray(t?.customFields?.additional_assignees)?t.customFields.additional_assignees:[],g=Array.isArray(t?.customFields?.externalAssignees)?t.customFields.externalAssignees:Array.isArray(t?.customFields?.external_assignees)?t.customFields.external_assignees:[];let p=[];Array.isArray(t?.customFields?.reminders)?p=t.customFields.reminders:t?.remindAt?p=[{id:"rem_"+Math.random().toString(36).substring(2,11),remindAt:t.remindAt,noteAr:""}]:Array.isArray(l.data?.reminders)&&t?.id&&(p=(l.data?.reminders||[]).filter(c=>c.taskId===t.id));const d=t?.progress!==void 0?t.progress:t?.status==="done"?100:t?.status==="review"||t?.status==="approval"?80:t?.status==="in_progress"?50:0,f=r.length>0||g.length>0,m=f?pe(r,g):"",v=ce(p),h=`<form id="task-form" data-task-id="${a(t?.id||"")}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${a(t?.typeAr||i?.typeAr||(i?"مخطط":""))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${a(t?.typeEn||i?.typeEn||(i?"Drawing":""))}" />
    <input type="hidden" name="additionalAssignees" id="task-additional-assignees-input" value="${a(JSON.stringify(r))}" />
    <input type="hidden" name="externalAssignees" id="task-external-assignees-input" value="${a(JSON.stringify(g))}" />
    <input type="hidden" name="remindersJson" id="task-reminders-input" value="${a(JSON.stringify(p))}" />

    <div class="form-grid">
      <!-- 📋 القسم 1: البيانات الأساسية والمكتبة القياسية -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 2px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📋</span> <span>${e("البيانات الأساسية والمكتبة القياسية","Basic Details & Standard Library")}</span>
      </div>

      <div class="field full">
        <label>${e("المشروع التابع له","Project")} *</label>
        <select name="projectId" id="task-project-select" required>
          ${(l.data?.projects||[]).map(c=>`<option value="${a(c.id)}" ${c.id===o?"selected":""}>${a(e(c.nameAr,c.nameEn))} (${a(c.code)})</option>`).join("")}
        </select>
      </div>

      <div class="field full">
        <label>${x("taskTitle")} *</label>
        <input name="titleAr" id="task-title-ar" value="${a(t?.titleAr||i?.nameAr||"")}" placeholder="${e("اسم المخرج أو المهمة","Deliverable or task name")}" required />
      </div>
      <div class="field">
        <label>${x("nameEn")}</label>
        <input name="titleEn" id="task-title-en" value="${a(t?.titleEn||i?.nameEn||"")}" placeholder="${e("Task / Deliverable Name (EN)","Task / Deliverable Name (EN)")}" />
      </div>
      <div class="field">
        <label>${x("addFromLibrary")}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${e("مهمة مخصصة","Custom task")}</option>
          ${(l.data?.templates||[]).map(c=>`<option value="${a(c.id)}" ${(t?.templateId||s)===c.id?"selected":""}>${a(c.code)} — ${a(e(c.nameAr,c.nameEn))}</option>`).join("")}
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
          ${(l.data?.users||[]).map(c=>`<option value="${a(c.id)}" ${(t?t.assigneeId===c.id:l.data?.user?.id===c.id)?"selected":""}>${a(e(c.name,c.nameEn||c.name))}</option>`).join("")}
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
          <span>${x("status")}</span>
          <span id="task-auto-progress-badge" style="font-size:11px;font-weight:600;color:var(--teal);">(${d}%)</span>
        </label>
        <select name="status" id="task-status-select">${Pe().map(([c,k])=>`<option value="${c}" ${t?.status===c?"selected":""}>${k}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${x("priority")}</label>
        <select name="priority">${["low","medium","high","urgent"].map(c=>`<option value="${c}" ${(t?.priority||"medium")===c?"selected":""}>${ye(c)}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>${x("startDate")}</label>
        <input type="date" name="startDate" id="task-start-date" value="${a((t?.startDate||"").split("T")[0])}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${x("dueDate")}</label>
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
        <label>${x("description")}</label>
        <textarea name="descriptionAr" placeholder="${e("ما المطلوب؟ وما معيار الإغلاق؟","What is required and what defines completion?")}">${a(t?.descriptionAr||"")}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${t&&(E("delete_tasks")||I())?`
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${a(t.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${e("حذف المهمة ونقلها لسلة المهملات","Delete task and move to trash")}">
            ${y("trash",14)} ${e("حذف المهمة","Delete Task")}
          </button>
        `:""}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${x("cancel")}</button>
        <button type="submit" class="btn btn-primary">${y("check",14)} ${t?x("save"):x("create")}</button>
      </div>
    </div>
  </form>`;let $=h,D="";if(t){D="modal-lg";const c=$e(t);$=`
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
              ${c?`
              <label class="btn btn-soft btn-sm" style="cursor:pointer;margin:0;" id="task-upload-btn">
                ${y("plus",12)} ${e("اختيار ملفات","Choose Files")}
                <input type="file" multiple id="task-upload-input" data-task-id="${t.id}" style="display:none;" />
              </label>
              `:""}
            </div>
            ${c?`
            <div id="task-dropzone" data-action="trigger-upload" data-task-id="${t.id}" style="border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;background:var(--surface-soft);cursor:pointer;transition:all 0.2s ease;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;">
                <span style="color:var(--brand-teal);">${y("upload",22)}</span>
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
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${ge(t)}</div>
            <form id="task-comment-form" data-task-id="${t.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${e("اكتب تعليقاً... (استخدم @ للإشارة)","Write a comment... (use @ to mention)")}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${e("إرسال","Send")}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `}document.getElementById("modal-root").innerHTML=ne(t?e("تعديل المهمة","Edit task"):x("addTask"),e("المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.","A task is the unit of execution; link a standard deliverable and add a reminder."),$,"task",D),Ee(t)}function Ee(t){const s=document.getElementById("modal-root");if(!s)return;const n=s.querySelector("#task-status-select"),i=s.querySelector("#task-auto-progress-badge");n&&i&&n.addEventListener("change",()=>{const u={not_started:0,in_progress:50,review:80,approval:80,done:100}[n.value]??0;i.textContent=`(${u}%)`});const o=s.querySelector("#task-template-select");o&&o.addEventListener("change",()=>{const u=o.value,w=(l.data?.templates||[]).find(A=>A.id===u);if(w){const A=s.querySelector("#task-title-ar"),j=s.querySelector("#task-title-en"),O=s.querySelector("#task-type-ar"),R=s.querySelector("#task-type-en");A&&!A.value&&(A.value=w.nameAr||""),j&&!j.value&&(j.value=w.nameEn||""),O&&(O.value=w.typeAr||"مخطط"),R&&(R.value=w.typeEn||"Drawing")}});const r=s.querySelector("#task-additional-assignees-input"),g=s.querySelector("#task-external-assignees-input"),p=s.querySelector("#assignees-chips-container"),d=s.querySelector("#assignee-combobox-search"),f=s.querySelector("#assignee-combobox-dropdown"),m=s.querySelector("#btn-add-external-quick");let v=[];try{v=JSON.parse(r?.value||"[]")}catch{v=[]}let h=[];try{h=JSON.parse(g?.value||"[]")}catch{h=[]}function $(){r&&(r.value=JSON.stringify(v)),g&&(g.value=JSON.stringify(h))}function D(){if(p){if(v.length===0&&h.length===0){p.style.display="none",p.innerHTML="",$();return}p.style.display="flex",p.innerHTML=pe(v,h),$()}}function c(u=""){if(!f)return;const w=u.trim().toLowerCase(),A=l.data?.users||[],j=s.querySelector("#task-primary-assignee")?.value,O=A.filter(C=>{if(C.id===j)return!1;if(!w)return!0;const U=(C.name||"").toLowerCase(),K=(C.nameEn||"").toLowerCase(),Z=(C.email||"").toLowerCase();return U.includes(w)||K.includes(w)||Z.includes(w)});let R="";w&&(R+=`
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${e("إضافة مسؤول خارجي:","Add external assignee:")} "${a(u.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${e("إضافة سريعة","Quick Add")}</span>
        </div>
      `),O.length===0&&!w?R+=`<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${e("لا يوجد مستخدمين آخرين","No other users")}</div>`:O.forEach(C=>{const U=v.includes(C.id);R+=`
          <div class="combobox-user-row" data-uid="${a(C.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${a(C.id)}" ${U?"checked":""} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${M(C,"mini-avatar")}
              <div>
                <strong style="color:var(--ink);">${a(e(C.name,C.nameEn||C.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${a(e(C.jobTitleAr,C.jobTitleEn)||C.email||"")}</span>
              </div>
            </div>
            ${U?'<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>':""}
          </div>
        `}),f.innerHTML=R,f.style.display="block"}$(),d&&(d.addEventListener("focus",()=>{c(d.value)}),d.addEventListener("input",()=>{const u=d.value.trim();c(u),m&&(m.style.display=u.length>1?"inline-flex":"none")}),d.addEventListener("keydown",u=>{if(u.key==="Enter"){u.preventDefault();const w=d.value.trim();w&&(h.includes(w)||(h.push(w),D()),d.value="",m&&(m.style.display="none"),f&&(f.style.display="none"))}})),m&&m.addEventListener("click",()=>{const u=d?.value.trim();u&&(h.includes(u)||(h.push(u),D()),d.value="",m.style.display="none",f&&(f.style.display="none"))}),f&&f.addEventListener("click",u=>{if(u.target.closest(".dropdown-ext-action")){const A=d?.value.trim();A&&!h.includes(A)&&(h.push(A),D()),d&&(d.value=""),m&&(m.style.display="none"),f.style.display="none";return}const w=u.target.closest(".combobox-user-row");if(w){const A=w.dataset.uid;v.includes(A)?v=v.filter(j=>j!==A):v.push(A),D(),c(d?.value||"")}}),p&&p.addEventListener("click",u=>{const w=u.target.closest(".btn-remove-chip-user");if(w){const j=w.dataset.uid;v=v.filter(O=>O!==j),D(),f&&f.style.display==="block"&&c(d?.value||"");return}const A=u.target.closest(".btn-remove-chip-ext");if(A){const j=A.dataset.ext;h=h.filter(O=>O!==j),D()}});const k=s.querySelector("#task-reminders-input"),z=s.querySelector("#task-reminders-list"),_=s.querySelector("#new-reminder-datetime"),F=s.querySelector("#new-reminder-note"),P=s.querySelector("#btn-add-reminder");let T=[];try{T=JSON.parse(k?.value||"[]")}catch{T=[]}Array.isArray(T)||(T=[]);function b(){z&&(k&&(k.value=JSON.stringify(T)),z.innerHTML=ce(T))}P&&P.addEventListener("click",()=>{const u=_?.value;if(!u){N(e("يرجى اختيار تاريخ ووقت التذكير.","Please pick a reminder date & time."),!0);return}const w=F?.value.trim()||"",A={id:"rem_temp_"+Math.random().toString(36).substring(2,11),remindAt:new Date(u).toISOString(),noteAr:w};T.push(A),_&&(_.value=""),F&&(F.value=""),b(),N(e("تمت إضافة موعد التذكير للقائمة.","Reminder added to list."))}),z&&z.addEventListener("click",async u=>{const w=u.target.closest(".btn-delete-reminder");if(w){const A=Number(w.dataset.idx),j=w.dataset.remId;!isNaN(A)&&A>=0&&A<T.length&&(T.splice(A,1),b(),j&&!j.startsWith("rem_temp_")&&q(`/api/reminders/${j}`,{method:"DELETE"}).catch(()=>{}),N(e("تم حذف موعد التذكير.","Reminder deleted.")))}}),s.addEventListener("mousedown",u=>{f?.contains(u.target)||d?.contains(u.target)||m?.contains(u.target)||(f&&(f.style.display="none"),m&&(m.style.display="none"))}),t&&t.id&&!t.id.startsWith("demo_")&&q(`/api/tasks/${encodeURIComponent(t.id)}/comments`,{silent:!0}).then(u=>{if(u&&Array.isArray(u.comments)){l.data&&!l.data.comments&&(l.data.comments=[]);const w=new Map((l.data?.comments||[]).map(j=>[j.id,j]));for(const j of u.comments)w.set(j.id,j);l.data&&(l.data.comments=Array.from(w.values()));const A=document.getElementById("task-comments-list");A&&document.getElementById("task-comment-form")?.dataset?.taskId===t.id&&(A.innerHTML=ge(t))}}).catch(()=>{})}function ge(t){const s=(l.data?.comments||[]).filter(n=>n.taskId===t.id).sort((n,i)=>new Date(n.createdAt)-new Date(i.createdAt));return s.length?`<div style="display:flex;flex-direction:column;gap:12px;">${s.map(n=>{const i=n.user||(l.data?.users||[]).find(p=>p.id===n.userId)||l.data?.user||{name:"DARC Member",id:""},o=!!(i.id&&l.data?.user?.id&&i.id===l.data?.user?.id),r=o||typeof I=="function"&&I(),g=a(n.content).replace(/@([\p{L}\p{N}_.\-]+)/gu,'<strong style="color:var(--blue)">@$1</strong>');return`
      <div class="task-comment-item" data-comment-id="${a(n.id)}" style="display:flex;gap:10px;flex-direction:${o?"row-reverse":"row"};">
        ${M(i)}
        <div style="display:flex;flex-direction:column;align-items:${o?"flex-end":"flex-start"};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${a(e(i.name,i.nameEn||i.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${B(n.createdAt,!0)}</span>
            ${r?`
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${a(n.id)}" data-task-id="${a(t.id)}" title="${e("تعديل التعليق","Edit comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${y("edit",12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${a(n.id)}" data-task-id="${a(t.id)}" title="${e("حذف التعليق","Delete comment")}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${y("trash",12)}
                </button>
              </div>
            `:""}
          </div>
          <div id="comment-bubble-${a(n.id)}" style="background:${o?"var(--blue)":"var(--surface)"};color:${o?"#fff":"var(--ink)"};padding:8px 12px;border-radius:12px;font-size:13px;border:${o?"none":"1px solid var(--border)"};border-top-${o?"right":"left"}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${g}</div>
        </div>
      </div>
    `}).join("")}</div>`:`<div class="empty" style="padding:40px 10px;min-height:auto;">${y("message",18)}<span style="font-size:12px;">${e("لا توجد تعليقات","No comments yet")}</span></div>`}function ze(t){const s=(l.data?.documents||[]).filter(n=>n.taskId===t.id&&!n.deletedAt).sort((n,i)=>new Date(i.createdAt)-new Date(n.createdAt));return s.length?`<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${s.map(n=>`
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:var(--surface-soft);border:1px solid var(--line);border-radius:10px;transition:background 0.15s ease;flex-wrap:wrap;gap:8px;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;min-width:200px;cursor:pointer;" data-action="preview-doc" data-doc-id="${a(n.id)}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;flex-shrink:0;">${y("document",14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;min-width:0;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${a(n.originalName)}">${a(n.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${B(n.createdAt,!0)} · ${a(n.user?e(n.user.name,n.user.nameEn||n.user.name):"Team Member")} · ${n.size>1048576?(n.size/1048576).toFixed(1)+"MB":Math.round(n.size/1024)+"KB"}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
        <button type="button" class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${a(n.id)}" style="padding:6px;min-width:32px;min-height:32px;color:var(--brand-teal);display:inline-flex;align-items:center;justify-content:center;" title="${e("نسخ رابط Google Drive","Copy Drive link")}">${y("link",14)}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${a(n.id)}" style="padding:6px;min-width:32px;min-height:32px;color:var(--brand-teal);display:inline-flex;align-items:center;justify-content:center;" title="${e("معاينة المخطط في نافذة منبثقة","Preview in popup modal")}">${y("eye",14)}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${a(n.id)}" style="padding:6px;min-width:32px;min-height:32px;color:var(--blue);display:inline-flex;align-items:center;justify-content:center;" title="${e("تحميل المخطط","Download")}">${y("download",14)}</button>
        ${E("review_tasks")||E("approve_tasks")||E("upload_documents")||I()?`
          <select class="doc-status-select" data-doc-id="${a(n.id)}" style="font-size:11px;padding:3px 6px;border-radius:6px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;min-height:30px;">
            <option value="draft" ${n.status==="draft"?"selected":""}>${e("مسودة","Draft")}</option>
            ${E("review_tasks")||I()?`<option value="review" ${n.status==="review"?"selected":""}>${e("مراجعة","Review")}</option>`:""}
            ${E("approve_tasks")||I()?`<option value="approved" ${n.status==="approved"?"selected":""}>${e("معتمد","Approved")}</option>`:""}
            <option value="superseded" ${n.status==="superseded"?"selected":""}>${e("ملغى","Superseded")}</option>
          </select>
        `:""}
        ${E("upload_documents")||I()?`<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${a(n.id)}" style="padding:4px;min-width:0;height:auto;" title="${e("إعادة تسمية","Rename")}">${y("edit",14)}</button>`:""}
        ${E("delete_documents")||I()?`<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${a(n.id)}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${e("حذف","Delete")}">${y("trash",14)}</button>`:""}
      </div>
    </div>
  `).join("")}</div>`:`<div class="empty" style="padding:20px 10px;min-height:auto;">${y("document",18)}<span style="font-size:12px;">${e("لا توجد ملفات مرفوعة","No documents uploaded")}</span></div>`}function Pe(){return[["not_started",x("notStarted")],["in_progress",x("inProgress")],["review",x("review")],["approval",x("approval")],["done",x("done")],["blocked",x("blocked")],["canceled",x("canceled")]]}var fe="";function Qe(){const t=document.querySelector(".timeline-container > div"),s=document.querySelector(".timeline-svg");if(!t||!s)return;const n=Array.from(document.querySelectorAll(".timeline-bar")),i=t.getBoundingClientRect(),o=`${Math.round(i.width)}_${n.length}_${l.lang}_${(l.data?.tasks||[]).length}`;if(o===fe&&s.hasChildNodes())return;fe=o,s.innerHTML="";const r={};n.forEach(d=>{const f=d.getBoundingClientRect();r[d.dataset.taskId]={left:f.left-i.left,right:f.right-i.left,top:f.top-i.top,bottom:f.bottom-i.top,width:f.width,height:f.height,center:f.top-i.top+f.height/2}});let g="";const p=l.lang==="ar";n.forEach(d=>{const f=d.dataset.taskId,m=(l.data?.tasks||[]).find($=>$.id===f),v=m?.dependencies||m?.customFields?.dependencies||[];if(!m||!v.length)return;const h=r[f];h&&v.forEach($=>{const D=r[$];if(!D)return;const c=p?D.left:D.right,k=D.center,z=p?h.right:h.left,_=h.center,F=c+(p?-20:20);g+=`<path d="M ${c} ${k} C ${F} ${k}, ${F} ${_}, ${z} ${_}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`})}),s.innerHTML=`
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${g}
  `}var mt=ve({buildProjectMemberChipsHtml:()=>te,checkProjectCodeStatus:()=>ee,exportPortfolioPDF:()=>ot,exportPortfolioXLS:()=>nt,exportProjectPDF:()=>rt,exportProjectXLS:()=>st,exportXLS:()=>ie,getCompanyBranding:()=>W,getDaysLeftBadge:()=>me,getNextAvailableProjectCode:()=>Q,getProjectTeam:()=>et,getProjectTeamData:()=>Y,openCloneModal:()=>it,openProjectModal:()=>at,projectCard:()=>Ie,renderInPagePrintModal:()=>ue,renderProjectCardTeamAvatars:()=>_e,renderProjectDetail:()=>tt,renderProjectOverviewTab:()=>Me,renderProjectTeamAvatars:()=>Se,renderProjectTimelineBar:()=>Ce,renderProjects:()=>Le});function me(t){if(!t)return"";const s=se(t);if(!s||isNaN(s.getTime()))return"";const n=Math.ceil((s-new Date)/864e5);if(isNaN(n))return"";let i="var(--mint-strong)",o="var(--mint)",r="";return n<0?(i="var(--red)",o="var(--red-soft)",r=e(`متأخر ${Math.abs(n)} يوم`,`${Math.abs(n)}d overdue`)):n===0?(i="var(--red)",o="var(--red-soft)",r=e("يستحق اليوم","Due today")):n<=2?(i="var(--red)",o="var(--red-soft)",r=e(`باقي ${n} يوم`,`${n}d left`)):n<=7?(i="var(--amber)",o="var(--amber-soft)",r=e(`باقي ${n} أيام`,`${n}d left`)):(i="var(--mint-strong)",o="var(--mint)",r=e(`باقي ${n} يوم`,`${n}d left`)),`<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${i};background:${o};border:1px solid currentColor;">${y("clock",11)} ${r}</span>`}function Q(t=null){const s=String(t||new Date().getFullYear()).slice(-2),n=l.data?.projects||[],i=Array.isArray(l.trash)?l.trash.filter(d=>d.type==="project"||d.code):[],o=[...n,...i];let r=0,g=3;const p=new RegExp(`^DARC-${s}-(\\d+)$`,"i");for(const d of o){if(!d.code)continue;const f=String(d.code).trim().match(p);if(f){const m=f[1];m.length>g&&(g=m.length);const v=parseInt(m,10);!isNaN(v)&&v>r&&(r=v)}}return`DARC-${s}-${String(r+1).padStart(g,"0")}`}function ee(t,s=null){if(!t||!String(t).trim())return{valid:!1,message:e("كود المشروع مطلوب.","Project code is required."),status:"error"};const n=String(t).trim().toUpperCase(),i=(l.data?.projects||[]).filter(r=>!r.deletedAt&&!r.deleted_at).find(r=>r.code&&r.code.toUpperCase()===n&&r.id!==s);if(i)return{valid:!1,status:"error",message:e(`⚠️ الكود مستخدم بالفعل لمشروع: "${e(i.nameAr,i.nameEn)}"`,`⚠️ Code is already used by: "${e(i.nameAr,i.nameEn)}"`)};const o=(Array.isArray(l.trash)?l.trash.filter(r=>(r.type==="project"||r.code)&&r.id!==s):[]).find(r=>r.code&&r.code.toUpperCase()===n);return o?{valid:!1,status:"warning",message:e(`⚠️ محجوز لمشروع في سلة المحذوفات (فترة الـ 30 يوماً): "${e(o.nameAr,o.nameEn)}"`,`⚠️ Reserved for a project in trash (30-day window): "${e(o.nameAr,o.nameEn)}"`)}:{valid:!0,status:"success",message:e("✓ كود مميز ومتاح للاستخدام","✓ Unique and available")}}function Y(t){if(!t)return{internalMembers:[],externalMembers:[]};const s=l.data?.users||[],n=(l.data?.tasks||[]).filter(r=>r.projectId===t.id&&!r.deletedAt&&!r.deleted_at),i=new Set,o=new Set;return t.managerId&&i.add(t.managerId),Array.isArray(t.memberIds)&&t.memberIds.forEach(r=>r&&i.add(r)),Array.isArray(t.members)&&t.members.forEach(r=>{const g=typeof r=="string"?r:r.userId||r.id||r.user_id;g&&i.add(g)}),n.forEach(r=>{r.assigneeId&&i.add(r.assigneeId),(r.customFields?.additionalAssignees||r.customFields?.additional_assignees||[]).forEach(g=>i.add(g)),(r.customFields?.externalAssignees||r.customFields?.external_assignees||[]).forEach(g=>{g&&typeof g=="string"&&g.trim()&&o.add(g.trim())})}),{internalMembers:Array.from(i).map(r=>s.find(g=>g.id===r)).filter(Boolean),externalMembers:Array.from(o)}}function et(t){return Y(t).internalMembers}function Se(t,s=4,n=!0,i=[]){if((!t||!t.length)&&(!i||!i.length))return`<span style="font-size:11px;color:var(--muted);">${e("لا يوجد فريق محدد","No team assigned")}</span>`;const o=(t||[]).slice(0,s),r=(t||[]).length-s,g=(t||[]).map(d=>e(d.name,d.nameEn||d.name)).join("، ");let p='<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">';return o.forEach(d=>{const f=e(d.name,d.nameEn||d.name),m=n?`data-action="filter-by-member" data-member-id="${a(d.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:'style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"';p+=`
      <span class="team-member-chip" ${m} title="${a(f)} (${a(G(d))})">
        ${M(d,"mini-avatar")}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${a(f)}</span>
      </span>
    `}),r>0&&(p+=`<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${a(g)}">+${r} ${e("آخرين","more")}</span>`),i&&i.length>0&&(p+=`<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${a(i.join("، "))}">🌐 +${i.length} ${e("خارجي","ext")}</span>`),p+=`<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${e("فريق العمل الداخلي","Internal Team")} (${(t||[]).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(t||[]).map(d=>`
        <div ${n?`data-action="filter-by-member" data-member-id="${a(d.id)}" title="${a(e("فلترة مهام "+(d.name||""),"Filter tasks of "+(d.nameEn||d.name||"")))}"`:""} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${n?"cursor:pointer;transition:all 0.15s;":""}" ${n?`onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`:""}>
          ${M(d,"micro-avatar")}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${a(e(d.name,d.nameEn||d.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${a(G(d))}</span>
          </div>
        </div>
      `).join("")}
    </div>
    
    ${i&&i.length>0?`
      <hr style="border:0;border-top:1px dashed var(--line);margin:8px 0 6px;" />
      <strong style="display:block;font-size:11px;color:var(--teal);margin-bottom:6px;">🌐 ${e("الشركاء والمتعاونون الخارجيون","External Partners")} (${i.length})</strong>
      <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin;">
        ${i.map(d=>`
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink);background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;white-space:nowrap;">
            <span style="font-size:11px;color:var(--teal);">🌐</span>
            <span style="font-weight:500;">${a(d)}</span>
          </div>
        `).join("")}
      </div>
    `:""}

    ${n?`<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${e("💡 اضغط على أي عضو لفلترة مهامه","💡 Click member to filter tasks")}</div>`:""}
  </div>`,p+="</div>",p}function Ce(t){if(!t.dueDate)return"";const s=se(t.dueDate);if(!s||isNaN(s.getTime()))return"";const n=new Date(t.startDate||t.createdAt||Date.now()-2592e6),i=new Date,o=s.getTime()-n.getTime();let r=0;o>0&&!isNaN(o)&&(r=Math.min(100,Math.max(0,Math.round((i.getTime()-n.getTime())/o*100))));const g=i>s,p=g?"var(--red)":r>=80&&!g?"var(--amber)":"var(--blue)";return`
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;flex-wrap:wrap;gap:6px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${y("clock",12)}
          <strong>${e("المؤشر الزمني للمشروع","Project Schedule Elapsed")}</strong>: 
          <span style="color:${p};font-weight:bold;">${g?e("انتهى موعد التسليم!","Deadline passed!"):e(`مضى ${r}% من الوقت`,`${r}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${B(t.startDate)} ➔ ${B(t.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${r}%;background:${p};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function _e(t=[],s=[],n=3){const i=t.length+s.length;if(i===0)return'<span style="font-size:11px;color:var(--muted);">—</span>';const o=t.slice(0,n),r=i-o.length;[...t.map(p=>e(p.name,p.nameEn||p.name)),...s].join("، ");let g=`<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${e("عرض فريق العمل","View Team")}">`;return g+='<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">',o.forEach((p,d)=>{g+=`
      <div style="margin-inline-start:${d===0?"0":"-8px"};position:relative;z-index:${10-d};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${M(p,"mini-avatar")}
      </div>
    `}),r>0&&(g+=`
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${r}
      </div>
    `),s&&s.length>0&&r<=0&&(g+='<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;">🌐</span>'),g+="</div>",g+=`
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${e("فريق العمل","Team Members")}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${i}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${t.map(p=>`
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${M(p,"micro-avatar")}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a(e(p.name,p.nameEn||p.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${a(G(p))}</span>
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
  `,g+="</div>",g}function Ie(t){const{internalMembers:s,externalMembers:n}=Y(t),i=t.manager||(l.data?.users||[]).find(g=>g.id===t.managerId),o=me(t.dueDate),r=e(t.descriptionAr||t.clientAr,t.descriptionEn||t.clientEn);return`<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;cursor:pointer;" data-action="open-project" data-project-id="${a(t.id)}">
        <span class="project-card-symbol">${y("building",19)}</span>
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
    
    <p class="project-card-desc" title="${a(r||"")}">
      ${r?a(r):`<span style="color:var(--muted);font-style:italic;">${e("لا يوجد وصف مسجل لهذا المشروع","No description registered")}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${M(i,"mini-avatar")}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${x("manager")}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a(i?e(i.name,i.nameEn||i.name):"—")}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${x("team")} (${s.length+n.length})</span>
        ${_e(s,n,3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${x("deadline")}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <strong>${t.dueDate?B(t.dueDate,!0):"—"}</strong>
          ${o}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${t.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${t.health==="off_track"?"red":t.health==="at_risk"?"amber":""}" style="width:${t.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${a(t.id)}">
      ${x("viewDetails")} ${y(l.lang==="ar"?"arrowLeft":"arrow",13)}
    </button>
  </article>`}function Me(t,s,n,i=[]){const o=t.manager||(l.data?.users||[]).find(d=>d.id===t.managerId),r=s.filter(d=>d.status==="done").length,g=s.filter(d=>d.status==="in_progress").length,p=s.filter(re).length;return`
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${e("إجمالي المهام","Total Tasks")}</span>
          <div class="metric-value">${s.length}</div>
          <span class="metric-note up">${r} ${x("done")}</span>
        </div>
        <div class="metric-card blue" style="padding:14px 18px;">
          <span class="metric-label">${e("قيد التنفيذ","In Progress")}</span>
          <div class="metric-value">${g}</div>
          <span class="metric-note">${e("عمل جارٍ","Active work")}</span>
        </div>
        <div class="metric-card ${p?"red":"teal"}" style="padding:14px 18px;">
          <span class="metric-label">${x("overdue")}</span>
          <div class="metric-value">${p}</div>
          <span class="metric-note ${p?"alert":"up"}">${p?e("تحتاج تدخلاً عاجلاً","Needs urgent action"):e("لا يوجد تأخير","On track")}</span>
        </div>
        <div class="metric-card amber" style="padding:14px 18px;">
          <span class="metric-label">${e("فريق العمل","Team Size")}</span>
          <div class="metric-value">${n.length+(i?.length||0)}</div>
          <span class="metric-note">${e("أعضاء مساهمون","Active contributors")}</span>
        </div>
      </div>

      <!-- Schedule Timeline Bar -->
      ${Ce(t)}

      <!-- Details Grid -->
      <div class="project-details-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 280px), 1fr));gap:16px;">
        <!-- Left: Project Scope & Client -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${y("document",16)}
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
              <strong style="font-size:13px;color:var(--ink);">${a(L(t.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${x("startDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${B(t.startDate,!0)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${x("dueDate")}</span>
              <strong style="font-size:12px;color:var(--ink);">${B(t.dueDate,!0)}</strong>
            </div>
          </div>
        </div>

        <!-- Right: Team & Leadership -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${y("users",16)}
            ${e("القيادة وفريق العمل","Leadership & Team")}
          </h3>

          <!-- Manager card -->
          <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:10px;margin-bottom:16px;background:var(--surface);">
            ${M(o)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${x("manager")}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${a(o?e(o.name,o.nameEn||o.name):"—")}</strong>
              <span style="font-size:11px;color:var(--muted);">${a(o?.email||"")}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${e("أعضاء الفريق الداخلي:","Internal Team Members:")}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${n.map(d=>{const f=s.filter(m=>m.assigneeId===d.id).length;return`
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${M(d,"mini-avatar")}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${a(e(d.name,d.nameEn||d.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${a(G(d))}</span>
                    </div>
                  </div>
                  <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${f} ${x("tasks")}</span>
                </div>
              `}).join("")}
          </div>

          ${i&&i.length>0?`
            <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0 10px;" />
            <span style="font-size:11px;color:var(--teal);font-weight:bold;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              🌐 ${e("الشركاء والمتعاونون الخارجيون:","External Partners & Collaborators:")}
            </span>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:180px;overflow-y:auto;">
              ${i.map(d=>{const f=s.filter(m=>(m.customFields?.externalAssignees||m.customFields?.external_assignees||[]).includes(d)).length;return`
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="font-size:14px;">🌐</span>
                      <div>
                        <strong style="display:block;font-size:12px;color:var(--ink);">${a(d)}</strong>
                        <span style="font-size:10px;color:var(--muted);">${e("شريك / جهة خارجية","External Partner")}</span>
                      </div>
                    </div>
                    <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${f} ${x("tasks")}</span>
                  </div>
                `}).join("")}
            </div>
          `:""}
        </div>
      </div>
    </div>
  `}function Le(){const t=(l.searches?.projects||"").trim().toLowerCase();let s=(l.data?.projects||[]).filter(i=>!i.deletedAt&&!i.deleted_at).filter(i=>!t||`${i.nameAr||""} ${i.nameEn||""} ${i.code||""} ${i.clientAr||""} ${i.clientEn||""}`.toLowerCase().includes(t));const n=l.projectSort||"default";return n==="alpha-asc"?s.sort((i,o)=>(e(i.nameAr,i.nameEn)||"").localeCompare(e(o.nameAr,o.nameEn)||"",l.lang==="ar"?"ar":"en")):n==="alpha-desc"?s.sort((i,o)=>(e(o.nameAr,o.nameEn)||"").localeCompare(e(i.nameAr,i.nameEn)||"",l.lang==="ar"?"ar":"en")):n==="progress-asc"?s.sort((i,o)=>(Number(i.progress)||0)-(Number(o.progress)||0)):n==="progress-desc"&&s.sort((i,o)=>(Number(o.progress)||0)-(Number(i.progress)||0)),`<div class="page-head"><div><p class="eyebrow">${e("المحفظة","PORTFOLIO")}</p><h1>${x("projects")}</h1><p>${e("كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.","One view for every project: health, progress, team, and next deadline.")}</p></div><div class="page-actions">${E("create_projects")?`<button class="btn btn-primary" data-action="new-project">${y("plus",15)} ${x("addProject")}</button>`:""}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${y("search",15)}<input data-search="projects" value="${a(l.searches.projects)}" placeholder="${x("search")}" /></div><div class="sort-box"><span>${e("الترتيب:","Sort:")}</span><select id="sort-projects" class="select-compact" data-action="sort-projects"><option value="default" ${n==="default"?"selected":""}>${e("الافتراضي","Default")}</option><option value="alpha-asc" ${n==="alpha-asc"?"selected":""}>${e("أبجدياً (أ - ي)","Alphabetical (A - Z)")}</option><option value="alpha-desc" ${n==="alpha-desc"?"selected":""}>${e("أبجدياً (ي - أ)","Alphabetical (Z - A)")}</option><option value="progress-asc" ${n==="progress-asc"?"selected":""}>${e("نسبة الإنجاز (تصاعدي 0% ← 100%)","Progress (Low to High)")}</option><option value="progress-desc" ${n==="progress-desc"?"selected":""}>${e("نسبة الإنجاز (تنازلي 100% ← 0%)","Progress (High to Low)")}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${s.length} ${e("مشاريع","projects")}</span></div></div>${s.length?`<div class="project-cards">${s.map(Ie).join("")}</div>`:`<section class="panel"><div class="empty">${y("building",18)}<span>${x("noProjects")}</span></div></section>`}`}function tt(){const t=l.data?.projects?.find(v=>v.id===l.activeProjectId&&!v.deletedAt&&!v.deleted_at);if(!t)return l.view="projects",Le();const s=(l.data?.tasks||[]).filter(v=>v.projectId===t.id),{internalMembers:n,externalMembers:i}=Y(t),o=l.projectTab||"tasks",r=l.projectMemberFilter||null,g=r?s.filter(v=>v.assigneeId===r||(v.customFields?.additionalAssignees||v.customFields?.additional_assignees||[]).includes(r)):s,p=r?l.data?.users?.find(v=>v.id===r):null;let d="";if(o==="overview")d=Me(t,s,n,i);else if(o==="tasks"){const v=l.projectTaskSort||H();d=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${x("projectTasks")} ${r?`<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${e("مهام","Tasks of")}: ${a(e(p?.name,p?.nameEn||p?.name))})</span>`:""}</h2>
            <p class="panel-subtitle">${e("توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.","Tasks grouped by current workflow state, automatically sorted.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${oe(v,"sort-project-tasks")}
            ${r?`<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${y("close",12)} ${e("إلغاء الفلترة","Clear filter")}</button>`:""}
            ${E("create_tasks")?`<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${a(t.id)}" title="${e("اضغط N للإضافة السريعة","Press N to add quickly")}">${y("plus",14)} ${x("addTask")} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>`:""}
          </div>
        </div>
        ${de(g,v)}
      </div>
    `}else if(o==="timeline"){const{renderTimelinePanel:v}=window.__timelineExports||{};d=v?v(g,t):`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${e("المخطط الزمني والتقويم","Timeline & Calendar")}</h2></div></div>${V(g)}</div>`}else if(o==="drawings"){const v=(l.data?.documents||[]).filter(c=>c.projectId===t.id&&!c.deletedAt),h=s.filter(c=>c.typeAr==="مخطط"||c.typeEn==="Drawing"||c.templateId),$=l.docTaskFilter||"all",D=$==="all"?v:v.filter(c=>c.taskId===$);d=`
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
                <option value="all" ${$==="all"?"selected":""}>${e("— جميع المهام —","— All Tasks —")}</option>
                ${s.map(c=>`<option value="${a(c.id)}" ${$===c.id?"selected":""}>${a(e(c.titleAr,c.titleEn))}</option>`).join("")}
              </select>
            </div>
            ${E("create_tasks")?`
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${a(t.id)}">
                ${y("plus",12)} ${e("إضافة مخرج / مخطط","Add Deliverable / Drawing")}
              </button>
            `:""}
          </div>
        </div>

        <!-- Section 1: Uploaded Files (Direct previews) -->
        <div style="margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${y("document",14)} ${e("الملفات والمخططات المرفوعة","Uploaded Files & Blueprints")} (${D.length})
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
                ${D.length>0?D.map(c=>{const k=s.find(_=>_.id===c.taskId),z=c.size>1048576?(c.size/1048576).toFixed(1)+" MB":Math.round((c.size||0)/1024)+" KB";return`
                    <tr data-doc-id="${a(c.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${a(c.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${y("document",15)}
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
                        ${k?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${a(k.id)}">${a(e(k.titleAr,k.titleEn))}</span>`:"—"}
                      </td>
                      <td>
                        <span class="status-badge ${a(c.status||"draft")}" style="font-size:11px;">
                          ${a(L(c.status||"draft"))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${z}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${B(c.createdAt,!0)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${a(c.id)}" style="padding:5px;" title="${e("معاينة المخطط","Preview")}">
                            ${y("eye",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${a(c.id)}" style="padding:5px;color:var(--teal);" title="${e("نسخ رابط Google Drive","Copy Drive Link")}">
                            ${y("link",14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${a(c.id)}" style="padding:5px;color:var(--blue);" title="${e("تحميل المخطط","Download")}">
                            ${y("download",14)}
                          </button>
                        </div>
                      </td>
                    </tr>
                  `}).join(""):`
                  <tr>
                    <td colspan="6">
                      <div class="empty" style="padding:30px 10px;">
                        ${y("document",20)}
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
            ${y("checklist",14)} ${e("مخرجات المخططات المجدولة","Scheduled Drawing Tasks")} (${h.length})
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
                ${h.map(c=>`
                  <tr data-action="open-task" data-task-id="${a(c.id)}" style="cursor:pointer;" title="${e("انقر لعرض وتعديل المهمة ورفع المخططات","Click to open task and manage files")}">
                    <td><span class="table-title">${a(e(c.titleAr,c.titleEn))}</span><span class="table-sub">${a(c.templateId||"CUSTOM")}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${a(e(c.typeAr,c.typeEn)||e("مخطط","Drawing"))}</span></td>
                    <td><span class="status-badge ${a(c.status)}">${a(L(c.status))}</span></td>
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
    `}else o==="activity"&&(d=`<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${x("activity")}</h2><p class="panel-subtitle">${e("كل تغيير مهم يبقى قابلًا للمراجعة.","Every important change remains reviewable.")}</p></div></div>${Je(t.id)}</div>`);const f=t.manager||(l.data?.users||[]).find(v=>v.id===t.managerId),m=me(t.dueDate);return`
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${y(l.lang==="ar"?"arrow":"arrowLeft",15)}</button>
        <div>
          <p class="eyebrow">${a(t.code)} · ${t.demo?x("sampleData"):x("active")}</p>
          <h1>${a(e(t.nameAr,t.nameEn))}</h1>
          <p>${a(e(t.descriptionAr||t.clientAr,t.descriptionEn||t.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${y("user",12)} 
              <strong>${x("manager")}:</strong> ${a(f?e(f.name,f.nameEn||f.name):"—")}
            </span>
            ${t.dueDate?`
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${y("calendar",12)} ${B(t.dueDate,!0)}
                ${m}
              </span>
            `:""}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${y("users",12)}
              <span style="font-size:11px;">${x("team")}:</span>
              ${Se(n,4,!0,i)}
            </span>
            <span class="status-badge ${a(t.health)}">${a(L(t.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${t.progress}%</strong>
        <span>${x("weightedProgress")}</span>
        ${E("edit_projects")||E("create_projects")||E("delete_projects")||E("view_reports")||I()?`
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${y("more",15)} ${e("خيارات","Options")}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${l.lang==="ar"?"right:0;left:auto;":"left:0;right:auto;"};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:220px;max-width:min(280px,calc(100vw - 36px));padding:5px;margin-top:5px;text-align:start">
              ${E("edit_projects")||I()?`<button class="menu-item" data-action="edit-project" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${y("edit",14)} ${x("edit")}</button>`:""}
              ${E("create_projects")||I()?`<button class="menu-item" data-action="clone-project" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${y("document",14)} ${e("استنساخ المشروع","Clone Project")}</button>`:""}
              ${E("export_reports")||I()?`
                <button class="menu-item" data-action="export-project-pdf" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--brand-teal);font-weight:600;">
                  ${y("printer",14)} ${e("تقرير تنفيذي معتمد (PDF)","Executive Report (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project-client-pdf" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--ink);">
                  ${y("user",14)} ${e("تقرير تسليمات العميل (PDF)","Client Deliverables (PDF)")}
                </button>
                <button class="menu-item" data-action="export-project" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;">
                  ${y("document",14)} ${e("تصدير بيانات المهام (Excel)","Export Tasks (Excel)")}
                </button>
              `:""}
              ${E("delete_projects")||I()?`<button class="menu-item" data-action="delete-project" data-project-id="${a(t.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${y("trash",14)} ${e("حذف المشروع","Delete Project")}</button>`:""}
            </div>
          </div>
        `:""}
      </div>
    </div>

    <!-- Sub Navigation Tabs: 'تفاصيل' instead of 'overview' -->
    <div class="detail-tabs">
      <button class="detail-tab ${o==="tasks"?"active":""}" data-action="project-tab" data-tab="tasks">${x("tasks")}</button>
      <button class="detail-tab ${o==="overview"?"active":""}" data-action="project-tab" data-tab="overview">${e("تفاصيل","Details")}</button>
      <button class="detail-tab ${o==="timeline"?"active":""}" data-action="project-tab" data-tab="timeline">${e("المخطط الزمني والتقويم","Timeline & Calendar")}</button>
      <button class="detail-tab ${o==="drawings"?"active":""}" data-action="project-tab" data-tab="drawings">${x("drawings")}</button>
      <button class="detail-tab ${o==="activity"?"active":""}" data-action="project-tab" data-tab="activity">${x("activity")}</button>
    </div>
    
    ${d}
  `}function te(t=[]){const s=l.data?.users||[];return t.map(n=>{const i=s.find(o=>o.id===n)||{name:n,id:n};return`
      <span class="chip-item" data-uid="${a(n)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${M(i,"mini-avatar")}
        <span style="font-weight:500;">${a(e(i.name,i.nameEn||i.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${a(n)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${e("إزالة","Remove")}">×</button>
      </span>
    `}).join("")}function at(t=null){!l.trashLoaded&&typeof window<"u"&&q("/api/trash",{silent:!0}).then(p=>{p&&(l.trash=Array.isArray(p)?p:p.trash||[...(p.projects||[]).map(d=>({...d,type:"project"})),...(p.tasks||[]).map(d=>({...d,type:"task"})),...(p.documents||[]).map(d=>({...d,type:"document"}))],l.trashLoaded=!0)}).catch(()=>{});const s=t?.code||Q(),n=t?Y(t).internalMembers.map(p=>p.id):[],i=n.length>0?n:[l.data?.user?.id].filter(Boolean),o=ee(s,t?.id),r=o.status==="success"?"var(--mint-strong)":o.status==="warning"?"var(--amber-strong)":"var(--red)",g=`
    <form id="project-form" data-project-id="${a(t?.id||"")}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${a(JSON.stringify(i))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${y("building",14)} <span>${e("البيانات الأساسية للمشروع","Core Project Information")}</span>
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
              <span>🔄</span> <span>${e("توليد تلقائي (ISO)","Auto-generate (ISO)")}</span>
            </button>
          </div>
          <input name="code" id="project-code-input" value="${a(s)}" placeholder="DARC-26-001" autocomplete="off" required style="font-family:monospace;font-weight:700;text-transform:uppercase;" />
          <div id="project-code-feedback" style="font-size:11px;margin-top:4px;color:${r};display:flex;align-items:center;gap:4px;">
            ${a(o.message)}
          </div>
        </div>
        <div class="field full">
          <label>${x("client")}</label>
          <input name="clientAr" value="${a(t?.clientAr||"")}" placeholder="${e("اسم العميل أو الجهة المالكة","Client or owning entity")}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${y("calendar",14)} <span>${e("الجدولة والإدارة","Management & Schedule")}</span>
        </div>

        <div class="field full">
          <label>${x("manager")}</label>
          <select name="managerId" id="project-manager-select">
            <option value="">${e("— بدون تحديد —","— Unassigned —")}</option>
            ${(l.data?.users||[]).map(p=>`<option value="${a(p.id)}" ${(t?t.managerId===p.id:l.data?.user?.id===p.id)?"selected":""}>${a(e(p.name,p.nameEn||p.name))}</option>`).join("")}
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

        <!-- 👥 القسم 3: أعضاء فريق المشروع والمشاركون -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:6px;">
            ${y("users",14)} <span>${e("أعضاء فريق المشروع والمشاركون","Project Team Members & Collaborators")}</span>
          </div>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${e("اختر من الفريق لإعطائهم حق الوصول للمشروع","Select team members who can access this project")}</span>
        </div>

        <div class="field full" style="position:relative;">
          <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
          <div id="project-members-chips-container" style="display:${i.length?"flex":"none"};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
            ${te(i)}
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
          ${y("document",14)} <span>${e("نطاق المشروع والملاحظات","Scope & Notes")}</span>
        </div>

        <div class="field full">
          <label>${e("وصف ونطاق المشروع","Project Scope & Description")}</label>
          <textarea name="descriptionAr" placeholder="${e("وصف مختصر لنطاق العمل، المعايير المعتمدة، وأي ملاحظات خاصة...","Brief description of scope, design criteria, and special notes...")}">${a(t?.descriptionAr||"")}</textarea>
        </div>
      </div>

      <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;margin-top:20px;">
        <div>
          ${t&&(E("delete_projects")||I())?`
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${a(t.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${e("حذف المشروع ونقله لسلة المهملات","Delete project and move to trash")}">
              ${y("trash",14)} ${e("حذف المشروع","Delete Project")}
            </button>
          `:""}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${x("cancel")}</button>
          <button type="submit" class="btn btn-primary">${y("check",14)} ${t?x("save"):x("create")}</button>
        </div>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ne(t?e("تعديل بيانات المشروع","Edit Project"):x("addProject"),e("إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.","Manage project details, schedule, and workflow health."),g,"project"),setTimeout(()=>{const p=document.getElementById("project-member-search"),d=document.getElementById("project-member-dropdown"),f=document.getElementById("project-members-chips-container"),m=document.getElementById("project-members-input"),v=document.getElementById("project-manager-select");if(!p||!d||!f||!m)return;let h=[...i];function $(){f.innerHTML=te(h),f.style.display=h.length?"flex":"none",m.value=JSON.stringify(h),f.querySelectorAll(".btn-remove-project-member").forEach(P=>{P.addEventListener("click",T=>{T.stopPropagation();const b=P.dataset.uid;h=h.filter(u=>u!==b),$()})})}v&&v.addEventListener("change",()=>{const P=v.value;P&&!h.includes(P)&&(h.push(P),$())});function D(P=""){const T=P.toLowerCase().trim(),b=(l.data?.users||[]).filter(u=>!h.includes(u.id)&&(!T||u.name&&u.name.toLowerCase().includes(T)||u.nameEn&&u.nameEn.toLowerCase().includes(T)||u.email&&u.email.toLowerCase().includes(T)));b.length?(d.innerHTML=b.map(u=>`
          <div class="project-member-opt" data-uid="${a(u.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${M(u,"mini-avatar")}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${a(e(u.name,u.nameEn||u.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${a(u.roleId||"")}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${e("إضافة","Add")}</span>
          </div>
        `).join(""),d.querySelectorAll(".project-member-opt").forEach(u=>{u.addEventListener("mouseenter",()=>u.style.background="var(--surface-soft)"),u.addEventListener("mouseleave",()=>u.style.background="transparent"),u.addEventListener("click",()=>{const w=u.dataset.uid;w&&!h.includes(w)&&(h.push(w),$(),p.value="",d.style.display="none")})})):d.innerHTML=`<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${e("لا يوجد أعضاء مطابقون","No matching members")}</div>`,d.style.display="block"}p.addEventListener("focus",()=>D(p.value)),p.addEventListener("input",()=>D(p.value)),document.addEventListener("click",P=>{!p.contains(P.target)&&!d.contains(P.target)&&(d.style.display="none")});const c=document.getElementById("project-code-input"),k=document.getElementById("project-code-feedback"),z=document.getElementById("btn-regenerate-code"),_=document.querySelector('#project-form button[type="submit"]');function F(){if(!c||!k)return;const P=c.value.trim().toUpperCase();c.value=P;const T=ee(P,t?.id);k.textContent=T.message,k.style.color=T.status==="success"?"var(--mint-strong)":T.status==="warning"?"var(--amber-strong)":"var(--red)",_&&(_.disabled=!T.valid)}c&&(c.addEventListener("input",F),c.addEventListener("blur",F)),z&&z.addEventListener("click",P=>{P.preventDefault(),c&&(c.value=Q(),F())}),$()},50)}function it(t){const s=`
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
        <button type="button" class="btn btn-ghost" data-action="close-modal">${x("cancel")}</button>
        <button type="submit" class="btn btn-primary">${y("document",14)} ${e("استنساخ المشروع","Clone Project")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ne(e("استنساخ المشروع","Clone Project"),e("أداة إنشاء قوالب المشاريع السريعة","Rapid project templating tool"),s,"clone");const n=document.getElementById("clone-form"),i=n.querySelector('input[name="cloneTasks"]'),o=n.querySelector('input[name="keepAssignees"]');i.addEventListener("change",r=>{o.disabled=!r.target.checked,r.target.checked||(o.checked=!1)}),n.addEventListener("submit",async r=>{r.preventDefault();const g=n.querySelector('button[type="submit"]');g.disabled=!0;try{const p={nameAr:n.nameAr.value,nameEn:n.nameEn.value,dueDate:n.dueDate.value,cloneTasks:n.cloneTasks.checked,keepAssignees:n.keepAssignees.checked,cloneMembers:n.cloneMembers.checked},d=await q(`/api/projects/${t.id}/clone`,{method:"POST",body:JSON.stringify(p)});Be(),l.view="project-detail",l.activeProjectId=d.project.id,await Fe(),N(e("تم استنساخ المشروع بنجاح.","Project cloned successfully."))}catch(p){N(p.message,!0),g.disabled=!1}})}function nt(){const t=(l.data?.projects||[]).filter(r=>!r.deletedAt&&!r.deleted_at);if(!t||!t.length){N(e("لا توجد بيانات لتصديرها.","No data to export."),!0);return}const s=W(),n=X(),i=11;let o="<table>";o+=`<tr><td colspan="${i}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${s.logoUrl?`<img src="${a(s.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${a(s.displayName)}</span>
  </td></tr>`,o+=`<tr><td colspan="${i}" class="subtitle">${e("تقرير حالة مشاريع المحفظة الهندسية","Portfolio Projects Status Report")}</td></tr>`,o+=`<tr><td colspan="${i}" class="meta">${e("تاريخ الإصدار:","Generated on:")} ${n}</td></tr>`,o+=`<tr><td colspan="${i}" style="border:none;"></td></tr>`,o+=`<tr class="header">
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
  </tr>`,t.forEach(r=>{const g=r.manager?e(r.manager.name,r.manager.nameEn||r.manager.name):"";o+=`<tr>
      <td>${a(S(r.code))}</td>
      <td>${a(S(r.nameAr))}</td>
      <td>${a(S(r.nameEn))}</td>
      <td>${a(S(e(r.clientAr,r.clientEn)))}</td>
      <td>${a(S(g))}</td>
      <td>${a(S(L(r.lifecycle)))}</td>
      <td>${a(S(L(r.health)))}</td>
      <td>${a(S(r.startDate||""))}</td>
      <td>${a(S(r.dueDate||""))}</td>
      <td>${r.progress||0}%</td>
      <td>${r.memberCount||0}</td>
    </tr>`}),o+="</table>",ie(`DARC_Portfolio_Report_${new Date().toISOString().split("T")[0]}`,o),N(e("تم بدء تحميل تقرير المحفظة.","Portfolio report download started.")),q("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:e("تقرير حالة مشاريع المحفظة (Excel)","Portfolio Projects Report (Excel)"),count:t.length}})}).catch(()=>{})}function st(t){const s=(l.data?.projects||[]).find(m=>m.id===t&&!m.deletedAt&&!m.deleted_at);if(!s)return;const n=(l.data?.tasks||[]).filter(m=>m.projectId===t&&!m.deletedAt&&!m.deleted_at);if(!n.length){N(e("لا توجد مهام لهذا المشروع لتصديرها.","No tasks to export."),!0);return}const i=W(),o=l.data?.users||[],r=new Map(o.map(m=>[m.id,m]));function g(m){if(!m)return"—";const v=r.get(m);return v?e(v.name,v.nameEn||v.name):m}const p=X(),d=11;let f="<table>";f+=`<tr><td colspan="${d}" class="title" style="background:#0d6269;color:#ffffff;font-size:18px;font-weight:bold;text-align:center;padding:14px;">
    ${i.logoUrl?`<img src="${a(i.logoUrl)}" height="42" style="vertical-align:middle;margin-inline-end:12px;" />`:""}
    <span style="vertical-align:middle;">${a(i.displayName)}</span>
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
  </tr>`,n.forEach((m,v)=>{const h=m.templateId?m.templateId.replace("tpl-","#"):m.id?`#${m.id.slice(-6)}`:`#${v+1}`,$=g(m.assigneeId||m.assignee_id),D=g(m.reviewerId||m.reviewer_id),c=g(m.approverId||m.approver_id);f+=`<tr>
      <td style="text-align:center;font-weight:bold;">${a(S(h))}</td>
      <td>${a(S(m.titleAr))}</td>
      <td>${a(S(m.titleEn))}</td>
      <td>${a(S(e(m.categoryAr,m.categoryEn)))}</td>
      <td>${a(S($))}</td>
      <td style="color:#0369a1;">${a(S(D))}</td>
      <td style="color:#047857;">${a(S(c))}</td>
      <td>${a(S(L(m.status)))}</td>
      <td>${a(S(m.startDate||""))}</td>
      <td>${a(S(m.dueDate||""))}</td>
      <td style="font-weight:bold;">${m.progress||0}%</td>
    </tr>`}),f+="</table>",ie(`DARC_Project_${s.code}_${new Date().toISOString().split("T")[0]}`,f),N(e("تم بدء تحميل تقرير المهام.","Report download started.")),q("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:t,details:{title:e(`تقرير مهام مشروع: ${s.nameAr}`,`Project Tasks Report: ${s.nameEn||s.nameAr}`),taskCount:n.length}})}).catch(()=>{})}function rt(t,s=!1){const n=(l.data?.projects||[]).find(b=>b.id===t&&!b.deletedAt&&!b.deleted_at);if(!n)return;const i=(l.data?.tasks||[]).filter(b=>b.projectId===t&&!b.deletedAt&&!b.deleted_at);if(!i.length){N(e("لا توجد مهام لهذا المشروع لطباعة التقرير.","No tasks to print report."),!0);return}const o=W(),r=l.data?.users||[],g=new Map(r.map(b=>[b.id,b]));function p(b){if(!b)return"—";const u=g.get(b);return u?e(u.name,u.nameEn||u.name):b}function d(b){if(!b?.dueDate||["done","completed","canceled"].includes(b.status))return!1;const u=se(b.dueDate);return u?u<new Date:!1}const f=i.length,m=i.filter(b=>["done","completed"].includes(b.status)).length,v=i.filter(b=>["review","approval"].includes(b.status)).length;i.filter(b=>b.status==="in_progress").length;const h=i.filter(b=>d(b)).length,$=new Date,D=X($),c=xe($),k=new Map;i.forEach(b=>{const u=e(b.categoryAr,b.categoryEn)||e(b.typeAr,b.typeEn)||e("عام","General"),w=k.get(u)||{total:0,completed:0,weight:0,progressSum:0},A=Number(b.weight||1);w.total++,["done","completed"].includes(b.status)&&w.completed++,w.weight+=A,w.progressSum+=(b.progress||0)*A,k.set(u,w)});const z=Array.from(k.entries()).map(([b,u])=>({name:b,percent:u.weight?Math.round(u.progressSum/u.weight):0,completed:u.completed,total:u.total})),_=s?e("تقرير تسليمات ومخرجات المشروع للمالك والعميل","Client Deliverables & Milestone Brief"):e("تقرير الإنجاز التنفيذي والمخرجات والاعتمادات الهندسية","Official Executive Engineering & Deliverables Audit");s?e("ملخص رسمي لمخرجات ومخططات المشروع المعتمدة وتواريخ التسليم التعاقدية.","Official summary of approved architectural drawings, milestones, and deliverables."):e("بيان تفصيلي بمسار التنفيذ ومسؤوليات المراجعة والاعتماد لكافة مخرجات المشروع.","Detailed execution readout with review and approval sign-offs for all project assets.");const F=i.map((b,u)=>{const w=b.templateId?b.templateId.replace("tpl-","#"):b.id?`#${b.id.slice(-6)}`:`#${u+1}`,A=e(b.titleAr,b.titleEn),j=e(b.categoryAr,b.categoryEn)||e(b.typeAr,b.typeEn)||"—",O=L(b.status),R=b.progress||0,C=b.dueDate||"—";if(s)return`
        <tr>
          <td style="text-align:center;font-weight:bold;color:#475569;">${u+1}</td>
          <td style="text-align:center;font-weight:600;color:#0d6269;">${a(w)}</td>
          <td style="font-weight:600;">${a(A)}</td>
          <td style="text-align:center;">${a(j)}</td>
          <td style="text-align:center;"><span class="badge ${a(b.status)}">${a(O)}</span></td>
          <td style="text-align:center;direction:ltr;">${a(C)}</td>
          <td style="text-align:center;font-weight:bold;color:${R===100?"#0d6269":"#1e293b"};">${R}%</td>
        </tr>
      `;const U=p(b.assigneeId||b.assignee_id),K=p(b.reviewerId||b.reviewer_id),Z=p(b.approverId||b.approver_id);return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${u+1}</td>
        <td style="text-align:center;font-weight:600;color:#0d6269;">${a(w)}</td>
        <td style="font-weight:600;">${a(A)}</td>
        <td style="text-align:center;">${a(j)}</td>
        <td>${a(U)}</td>
        <td style="color:#0369a1;font-weight:600;">${a(K)}</td>
        <td style="color:#047857;font-weight:600;">${a(Z)}</td>
        <td style="text-align:center;"><span class="badge ${a(b.status)}">${a(O)}</span></td>
        <td style="text-align:center;direction:ltr;">${a(C)}</td>
        <td style="text-align:center;font-weight:bold;color:${R===100?"#0d6269":"#1e293b"};">${R}%</td>
      </tr>
    `}).join(""),P=`
    <!DOCTYPE html>
    <html lang="${l.lang}" dir="${l.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>${a(o.displayName)} - ${a(n.code)} - ${s?"Client_Report":"Executive_Report"}</title>
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
          <strong style="color:#0d6269;font-size:13px;">${a(_)}</strong>
          <div style="font-size:11px;color:#64748b;">${e("معاينة التقرير جاهزة للطباعة أو الحفظ المباشر كملف PDF رسمي.","Ready for printing or saving directly as an official executive PDF file.")}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-toolbar" onclick="window.print()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-inline-end:4px;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button class="btn-toolbar-ghost" onclick="window.location.search = (window.location.search.includes('client=1') ? '' : '?client=1')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-inline-end:4px;"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>${s?e("التبديل للتقرير الفني الشامل","Switch to Technical Report"):e("التبديل لتقرير المالك والعميل","Switch to Client Report")}
          </button>
          <button class="btn-toolbar-ghost" onclick="window.close()">
            ✕ ${e("إغلاق","Close")}
          </button>
        </div>
      </div>

      <header class="report-header">
        <div>
          ${o.logoUrl?`
            <img src="${a(o.logoUrl)}" alt="Logo" class="brand-logo-img" />
          `:`
            <div class="brand-logo-fallback">D</div>
          `}
          <h1 class="brand-title">${a(o.displayName)}</h1>
          <div class="brand-sub">${e("مكتب الاستشارات والتصميم الهندسي","Architecture & Engineering Consultancy")}</div>
        </div>
        <div class="report-meta-box">
          <div class="report-type-badge">${a(_)}</div>
          <div><strong>${e("كود المشروع:","Project Code:")}</strong> ${a(n.code)}</div>
          <div><strong>${e("تاريخ التقرير:","Report Date:")}</strong> ${a(D)} - ${a(c)}</div>
          <div><strong>${e("حالة المشروع:","Project Status:")}</strong> ${a(L(n.lifecycle))} (${a(L(n.health))})</div>
        </div>
      </header>

      <div class="info-strip">
        <div class="info-cell">
          <strong>${e("اسم المشروع","Project Name")}</strong>
          <span>${a(e(n.nameAr,n.nameEn))}</span>
        </div>
        <div class="info-cell">
          <strong>${e("العميل / المالك","Client / Owner")}</strong>
          <span>${a(e(n.clientAr,n.clientEn))||"—"}</span>
        </div>
        <div class="info-cell">
          <strong>${e("الجدول الزمني","Schedule Timeline")}</strong>
          <span>${a(n.startDate||"—")} → ${a(n.dueDate||"—")}</span>
        </div>
        <div class="info-cell">
          <strong>${e("مدير المشروع المسؤول","Project Manager")}</strong>
          <span>${a(p(n.managerId))}</span>
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${n.progress||0}%</div>
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
            ${z.map(b=>`
              <div class="disc-item">
                <div style="display:flex;justify-content:space-between;font-weight:600;">
                  <span>${a(b.name)}</span>
                  <span>${b.percent}% (${b.completed}/${b.total})</span>
                </div>
                <div class="disc-bar-bg">
                  <div class="disc-bar-fill" style="width:${b.percent}%;"></div>
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
          ${F}
        </tbody>
      </table>

      <div class="signature-section">
        <div class="stamp-box">
          ${e("ختم المكتب الهندسي والاستشاري المعتمد","Official Engineering Consultancy Stamp")}
        </div>
        <div class="signature-box">
          <div class="signature-title">${e("مهندس ومدير المشروع","Project Manager")}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${a(p(n.managerId))}</div>
          <div class="signature-line">${e("التوقيع والمصادقة","Sign & Date")}</div>
        </div>
        <div class="signature-box">
          <div class="signature-title">${e("الاعتماد والاستشاري العام","Approved By Lead Consultant")}</div>
          <div style="font-weight:600;font-size:11px;color:#334155;margin-top:6px;">${a(o.displayName)}</div>
          <div class="signature-line">${e("التوقيع والاعتماد النهائي","Sign & Authorization")}</div>
        </div>
      </div>

      <footer class="report-footer">
        <div>${a(o.displayName)} — ${e("وثيقة إدارية معتمدة صادرة عبر منصة دارك","Official Governance Document via DARC Platform")}</div>
        <div>${e("صفحة 1 من 1","Page 1 of 1")}</div>
        <div>${a(D)}</div>
      </footer>
    </body>
    </html>
  `,T=window.open("","_blank","width=1100,height=900");T?(T.document.open(),T.document.write(P),T.document.close()):ue(P),N(e("تم تجهيز التقرير الرسمي للطباعة والتصدير PDF.","Executive report ready for Print / PDF export.")),q("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"project",entityId:t,details:{title:a(_),type:s?"client_pdf":"executive_pdf",taskCount:f}})}).catch(()=>{})}function ot(){const t=(l.data?.projects||[]).filter($=>!$.deletedAt&&!$.deleted_at);if(!t||!t.length){N(e("لا توجد مشاريع لتصدير التقرير.","No projects to export."),!0);return}const s=W(),n=new Date,i=X(n),o=xe(n),r=t.length,g=t.filter($=>$.health==="on_track").length,p=t.filter($=>$.health==="at_risk").length,d=t.filter($=>$.health==="off_track").length,f=t.map(($,D)=>{const c=$.manager?e($.manager.name,$.manager.nameEn||$.manager.name):"—";return`
      <tr>
        <td style="text-align:center;font-weight:bold;color:#475569;">${D+1}</td>
        <td style="text-align:center;font-weight:700;color:#0d6269;">${a($.code)}</td>
        <td style="font-weight:700;">${a(e($.nameAr,$.nameEn))}</td>
        <td>${a(e($.clientAr,$.clientEn))||"—"}</td>
        <td>${a(c)}</td>
        <td style="text-align:center;"><span class="badge ${a($.lifecycle)}">${a(L($.lifecycle))}</span></td>
        <td style="text-align:center;"><span class="badge ${a($.health)}">${a(L($.health))}</span></td>
        <td style="text-align:center;direction:ltr;">${a($.startDate||"—")}</td>
        <td style="text-align:center;direction:ltr;">${a($.dueDate||"—")}</td>
        <td style="text-align:center;font-weight:bold;color:${$.progress===100?"#0d6269":"#0f172a"};">${$.progress||0}%</td>
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
          <button class="btn-toolbar" onclick="window.print()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-inline-end:4px;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}</button>
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
          <div><strong>${e("تاريخ التقرير:","Report Date:")}</strong> ${a(i)} - ${a(o)}</div>
          <div><strong>${e("إجمالي المشاريع:","Total Projects:")}</strong> ${r}</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${r}</div>
          <div class="kpi-label">${e("إجمالي مشاريع المحفظة","Total Projects")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#166534;">${g}</div>
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
        <div>${a(i)}</div>
      </footer>
    </body>
    </html>
  `,h=window.open("","_blank","width=1200,height=900");h?(h.document.open(),h.document.write(v),h.document.close()):ue(v),N(e("تم تجهيز تقرير المحفظة للطباعة والتصدير PDF.","Portfolio report ready for Print / PDF export.")),q("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",details:{title:a(m),type:"portfolio_pdf",count:r}})}).catch(()=>{})}function ue(t){let s=document.getElementById("print-modal-overlay");s||(s=document.createElement("div"),s.id="print-modal-overlay",s.style.position="fixed",s.style.inset="0",s.style.zIndex="1400",s.style.background="rgba(0, 0, 0, 0.75)",s.style.backdropFilter="blur(4px)",s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="center",s.style.padding="15px",document.body.appendChild(s)),s.innerHTML=`
    <div style="background:var(--surface, #ffffff);color:var(--ink);width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.4);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line);background:var(--surface-soft);flex-wrap:wrap;gap:8px;">
        <strong style="color:var(--brand-teal);font-size:14px;">${e("معاينة التقرير الرسمي المعتمد (PDF Preview)","Official Approved Report (PDF Preview)")}</strong>
        <div style="display:flex;gap:10px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-print-iframe" style="display:flex;align-items:center;gap:6px;">
            ${y("printer",14)} ${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-close-print-modal">✕</button>
        </div>
      </div>
      <div style="flex:1;overflow:hidden;position:relative;background:#ffffff;">
        <iframe id="print-preview-iframe" style="width:100%;height:100%;border:none;background:#ffffff;" srcdoc="${a(t)}"></iframe>
      </div>
    </div>
  `,s.style.display="flex";const n=()=>{s.style.display="none",s.innerHTML="",window.removeEventListener("keydown",i)},i=o=>{o.key==="Escape"&&n()};window.addEventListener("keydown",i),document.getElementById("btn-close-print-modal")?.addEventListener("click",n),document.getElementById("btn-print-iframe")?.addEventListener("click",()=>{const o=document.getElementById("print-preview-iframe");o&&o.contentWindow&&(o.contentWindow.focus(),o.contentWindow.print())})}export{it as a,$e as c,ge as d,ze as f,st as i,Qe as l,nt as n,at as o,gt as p,rt as r,mt as s,ot as t,Ze as u};
