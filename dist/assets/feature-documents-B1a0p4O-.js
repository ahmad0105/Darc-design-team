import{t as $e}from"./rolldown-runtime-BQ-_32WO.js";import{$ as s,B as te,F as be,I as ie,J as ee,P as e,R as o,St as X,bt as ke,gt as pe,ht as ce,j as K,kt as S,l as ne,n as me,q as fe,tt as ve,vt as ze}from"./core-dragdrop-4uLM6sbt.js";var Ee="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH",le=`https://drive.google.com/drive/folders/${Ee}?usp=sharing`;function oe(r){if(ne()||r&&(String(r.id).startsWith("doc_demo")||r.isDemo||String(r.driveFileId||"").startsWith("demo_"))){const a=r?.originalName;return a&&ye.has(a)?`/assets/${encodeURIComponent(a)}`:r?.diskFilename&&!r.diskFilename.includes("drive.google.com")?r.diskFilename:"/assets/DARC-VILLA-ARCH-A101_Rev03.pdf"}if(!r)return le;const i=r.driveFileId||r.drive_file_id;if(i&&!String(i).startsWith("demo_")&&String(i).length>=25&&i!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${encodeURIComponent(i)}/view?usp=sharing`;const p=r.diskFilename||r.disk_filename||r.viewLink||r.webViewLink||"";if(p&&p.includes("drive.google.com")){if(p.includes("1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"))return le;if(p.includes("/folders/"))return p;const a=p.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(a&&a[1]&&!a[1].startsWith("demo_")&&a[1].length>=25&&a[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${a[1]}/view?usp=sharing`}return p&&(p.startsWith("https://")||p.startsWith("http://"))&&!p.includes("localhost")&&!p.includes("127.0.0.1")&&!p.includes("demo_sample")?p:le}var ye=new Set(["DARC-VILLA-ARCH-A101_Rev03.pdf","SKYLINE-CW-SECTION-DETAILS-DWG.pdf","RED-SEA-RESORT-MASTERPLAN-APPROVED.pdf","DARC-VILLA-BOQ-BILL-OF-QUANTITIES.xlsx","DARC-PALM-VILLA-TECHNICAL-SPECIFICATIONS.docx","DARC-ARCHITECTURAL-CONCEPT-PRESENTATION.pptx","DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4","PALM_VILLA_MAJLIS_3D_RENDER_4K.jpg","DARC-STRUCTURAL-LAYOUT-V2.dwg"]);function J(r){if(!r)return"";if(r.blobUrl&&typeof r.blobUrl=="string"&&r.blobUrl.startsWith("blob:"))return r.blobUrl;if(r._blobUrl&&typeof r._blobUrl=="string"&&r._blobUrl.startsWith("blob:"))return r._blobUrl;if(typeof window<"u"&&window.__docBlobCache){const x=window.__docBlobCache.get(r.id)||window.__docBlobCache.get(r.originalName);if(x&&typeof x=="string"&&x.startsWith("blob:"))return x}const i=!!(r.id?.startsWith("doc_demo_")||r.projectId?.startsWith("prj_demo_")||ne()),p=(r.originalName||"").trim();if(i){if(p==="darc-walkthrough.mp4")return"/assets/DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4";if(p&&ye.has(p))return`/assets/${encodeURIComponent(p)}`}const a=(r.diskFilename||r.disk_filename||r.url||"").trim();if(a&&(a.startsWith("https://")||a.startsWith("http://")))try{const x=new URL(a);if(["http:","https:"].includes(x.protocol)&&!x.hostname.includes("drive.google.com")&&!x.hostname.includes("docs.google.com"))return a}catch{}if(r.id)return`/api/documents/${encodeURIComponent(r.id)}?stream=1`;const u=p.replace(/[/\\:*?"<>|\x00-\x1f]/g,"_");return u?`/assets/${encodeURIComponent(u)}`:""}async function De(r,i=null){if(!r)return;const p=oe(r);let a=!1;try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(p),a=!0;else{const u=document.createElement("textarea");u.value=p,u.style.position="fixed",u.style.opacity="0",document.body.appendChild(u),u.select(),a=document.execCommand("copy"),u.remove()}}catch(u){console.warn("[DocViewer] Clipboard writeText failed:",u),window.prompt(e("انسخ رابط Google Drive من هنا:","Copy Google Drive link:"),p),a=!0}if(a){if(i){const x=i.innerHTML;i.innerHTML=`${s("check",14)} <span style="font-size:11px;font-weight:700;">${e("تم النسخ","Copied")}</span>`,i.style.color="var(--mint-strong, #10b981)",i.style.transition="all 0.2s ease",setTimeout(()=>{i.innerHTML=x,i.style.color=""},2200)}const u=ne()||r&&(String(r.id).startsWith("doc_demo")||r.isDemo||String(r.driveFileId||"").startsWith("demo_"));X(e(u?"تم نسخ رابط المستند بنجاح":"تم نسخ رابط المخرج الهندسي في Google Drive بنجاح",u?"Document link copied successfully":"Google Drive deliverable link copied"))}}async function U(r){if(!r)return;let i=(S.data?.documents||[]).find(a=>a.id===r);if(!i)try{const a=await me(`/api/documents/${r}`);a&&a.document&&(i=a.document)}catch{}if(!i){X(e("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}X(e(`جاري بدء تحميل "${i.originalName}"...`,`Starting download of "${i.originalName}"...`));const p=i.diskFilename||i.disk_filename||"";if(p&&p.includes("drive.google.com")){const a=p.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(a&&a[1]&&!a[1].startsWith("demo_")&&a[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"){const u=`https://drive.google.com/uc?export=download&id=${a[1]}`,x=(i.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),n=document.createElement("a");n.href=u,n.target="_blank",n.rel="noopener noreferrer",n.download=x,document.body.appendChild(n),n.click(),n.remove(),X(e(`تم بدء تنزيل "${i.originalName}" من Google Drive بنجاح.`,`Downloaded "${i.originalName}" from Google Drive.`));return}}try{let a=null;const u=J(i);if(u&&!u.startsWith("http://drive.google.com")&&!u.startsWith("https://drive.google.com"))try{const x=await fetch(u);x.ok&&(a=await x.blob())}catch(x){console.warn("[DocViewer] Real asset fetch error:",x)}if(a){const x=URL.createObjectURL(a),n=(i.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),m=document.createElement("a");m.href=x,m.download=n,document.body.appendChild(m),m.click(),m.remove(),setTimeout(()=>URL.revokeObjectURL(x),3e4),X(e(`تم تنزيل المستند الأصلي "${i.originalName}" بنجاح`,`Downloaded "${i.originalName}" successfully`));return}window.open(`/api/documents/${encodeURIComponent(i.id)}?download=1`,"_blank"),X(e(`تم بدء تنزيل "${i.originalName}" بنجاح.`,`Downloaded "${i.originalName}" successfully.`))}catch(a){console.error("[DocViewer] Local download creation failed:",a),window.open(`/api/documents/${encodeURIComponent(i.id)}?download=1`,"_blank")}}function de(){const r=document.getElementById("preview-modal-overlay");if(!r)return;const i=r.querySelector("video");if(i)try{i.pause(),i.removeAttribute("src"),i.load()}catch{}window.__docPreviewKeyHandler&&(window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=null),Array.isArray(window.__docPreviewCleanups)&&(window.__docPreviewCleanups.forEach(p=>{try{p()}catch{}}),window.__docPreviewCleanups=[]),document.body.style.overflow="",r.style.display="none",r.innerHTML=""}function Se(){if(document.getElementById("darc-doc-viewer-responsive-styles"))return;const r=document.createElement("style");r.id="darc-doc-viewer-responsive-styles",r.textContent=`
    #preview-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(8, 14, 18, 0.92);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: clamp(0px, 1.5vw, 16px);
      box-sizing: border-box;
      animation: docModalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes docModalFadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    .doc-modal-container {
      background: var(--surface, #ffffff);
      width: 100%;
      max-width: 1280px;
      height: 94vh;
      border-radius: 16px;
      box-shadow: 0 30px 80px rgba(0,0,0,0.6);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--line, #e2e8f0);
    }
    @media (max-width: 768px) {
      #preview-modal-overlay {
        padding: 0 !important;
      }
      .doc-modal-container {
        height: 100vh !important;
        height: 100dvh !important;
        max-width: 100vw !important;
        border-radius: 0 !important;
        border: none !important;
      }
      .doc-modal-header {
        padding: 10px 14px !important;
      }
      .doc-modal-header-actions .btn span.btn-label {
        display: none !important;
      }
      .doc-modal-header-actions .btn {
        padding: 6px 10px !important;
        min-height: 38px !important;
      }
    }
    /* Touch momentum scrolling */
    .touch-scroll {
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
    }
    /* Custom clean scrollbars */
    .doc-custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .doc-custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
    }
    .doc-custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(13, 98, 105, 0.35);
      border-radius: 3px;
    }
    .doc-custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(13, 98, 105, 0.6);
    }
  `,document.head.appendChild(r)}async function Te(r){if(!r)return;Se();let i=(S.data?.documents||[]).find(l=>l.id===r);if(!i)try{const l=await me(`/api/documents/${r}`);l&&(l.id||l.document?.id)&&(i=l.document||l,S.data&&!S.data.documents&&(S.data.documents=[]),S.data?.documents&&S.data.documents.push(i))}catch(l){console.warn("[DocViewer] Failed to fetch doc on demand:",l)}if(!i){X(e("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}const p=(i.originalName||"").split(".").pop()?.toLowerCase()||"",a=ee(i.originalName,i.mimeType),u=te(i.originalName)||"V1",x=ie(i),n=fe(x),m=i.size>1048576?(i.size/1048576).toFixed(1)+" MB":Math.round((i.size||0)/1024)+" KB",$=p==="pdf"||a.isPdf,h=["dwg","dxf"].includes(p)||a.isCad,T=["rvt","rfa","ifc","skp"].includes(p)||a.isBim,M=["xlsx","xls","csv"].includes(p)||a.isExcel,z=["docx","doc","rtf","odt"].includes(p)||a.isWord,F=["pptx","ppt","key"].includes(p)||a.isPpt,V=["zip","rar","7z","tar"].includes(p)||a.isZip,b=["jpg","jpeg","png","webp","svg","heic"].includes(p)||a.isImg,E=["mp4","webm","mov","m4v"].includes(p)||i.mimeType&&i.mimeType.startsWith("video/"),k=ne()||i&&(String(i.id).startsWith("doc_demo")||i.isDemo),H=oe(i),G=i.driveFileId||i.drive_file_id;let c=null;if(G&&!String(G).startsWith("demo_")&&String(G).length>=20&&G!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")c=`https://drive.google.com/file/d/${encodeURIComponent(G)}/preview`;else{const l=(i.diskFilename||i.disk_filename||i.viewLink||i.webViewLink||i.url||"").match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);l&&l[1]&&!l[1].startsWith("demo_")&&l[1].length>=20&&l[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"&&(c=`https://drive.google.com/file/d/${l[1]}/preview`)}let P=document.getElementById("preview-modal-overlay");P||(P=document.createElement("div"),P.id="preview-modal-overlay",document.body.appendChild(P)),P.innerHTML=`
    <div class="doc-modal-container">
      <!-- Universal Responsive Modal Header -->
      <div class="doc-modal-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line, #e2e8f0);background:var(--surface, #ffffff);flex-wrap:wrap;gap:10px;z-index:20;">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;flex:1;">
          <span style="background:${a.bg};color:${a.color};border:1px solid ${a.border};font-size:11px;font-weight:900;padding:4px 8px;border-radius:6px;flex-shrink:0;">
            ${a.ext}
          </span>
          <div style="min-width:0;flex:1;">
            <h3 style="margin:0;font-size:14px;font-weight:800;color:var(--ink, #0f172a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:clamp(220px, 45vw, 550px);" title="${o(i.originalName)}">
              ${o(i.originalName)}
            </h3>
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;font-size:11px;color:var(--muted, #64748b);flex-wrap:wrap;">
              <span class="version-badge" style="background:rgba(13,98,105,0.08);color:var(--teal, #0d6269);padding:1px 6px;border-radius:4px;font-weight:800;">${u}</span>
              <span>•</span>
              <span style="background:${n.bg};color:${n.color};border:1px solid ${n.border};padding:1px 6px;border-radius:4px;font-weight:800;">${e(n.labelAr,n.labelEn)}</span>
              <span>•</span>
              <span>${m}</span>
              <span>•</span>
              <span class="status-badge ${o(i.status||"approved")}" style="font-size:10px;padding:2px 7px;">${o(ce(i.status||"approved"))}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons (Responsive on Mobile) -->
        <div class="doc-modal-header-actions" style="display:flex;align-items:center;gap:8px;flex-shrink:0;flex-wrap:wrap;">
          <!-- Dual Engine Switcher -->
          <div class="doc-viewer-engine-switch" style="display:inline-flex;align-items:center;background:var(--surface-soft, #f1f5f9);border:1px solid var(--line, #e2e8f0);border-radius:8px;padding:2px;gap:2px;">
            <button type="button" class="btn btn-sm" id="btn-engine-native" style="padding:4px 9px;font-size:11px;font-weight:700;border-radius:6px;border:none;cursor:pointer;background:var(--brand-teal, #0d6269);color:#ffffff;transition:all 0.15s;" title="${e("عرض بالمستعرض المدمج فائق الدقة","View in Native High-Fidelity Viewer")}">
              ${e("المستعرض المدمج","Native")}
            </button>
            <button type="button" class="btn btn-sm" id="btn-engine-drive" style="padding:4px 9px;font-size:11px;font-weight:700;border-radius:6px;border:none;cursor:pointer;background:transparent;color:var(--ink-soft, #475569);transition:all 0.15s;" title="${e("عرض بتضمين Google Drive","View in Google Drive Viewer")}">
              Google Drive
            </button>
          </div>

          <button type="button" class="btn btn-soft btn-sm" id="modal-copy-link-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--teal, #0d6269);" title="${e(k?"نسخ رابط المستند":"نسخ رابط Google Drive",k?"Copy Document Link":"Copy Drive Link")}">
            ${s("link",14)} <span class="btn-label">${e("نسخ الرابط","Copy Link")}</span>
          </button>
          <a href="${o(H)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;" title="${e(k?"فتح المستند":"فتح في Google Drive",k?"Open Document":"Open in Drive")}">
            ${s("external",13)} <span class="btn-label">${k?e("فتح الملف","Open File"):"Google Drive"}</span>
          </a>
          <button type="button" class="btn btn-primary btn-sm" id="modal-download-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;background:var(--brand-teal, #0d6269);color:#ffffff;" title="${e("تحميل المخطط","Download")}">
            ${s("download",14)} <span class="btn-label">${e("تنزيل الملف","Download")}</span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="close-doc-preview-btn" style="padding:6px;min-width:36px;height:36px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;" title="${e("إغلاق (Esc)","Close (Esc)")}">
            ${s("close",18)}
          </button>
        </div>
      </div>

      <!-- Main Viewer Viewport -->
      <div id="doc-viewer-viewport" class="touch-scroll" style="flex:1;position:relative;background:#0d1117;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        <!-- Injected format viewer below -->
      </div>
    </div>
  `,P.style.display="flex",document.body.style.overflow="hidden",window.__docPreviewKeyHandler&&window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=l=>{l.key==="Escape"&&de()},window.addEventListener("keydown",window.__docPreviewKeyHandler),document.getElementById("modal-copy-link-btn")?.addEventListener("click",l=>{De(i,l.currentTarget)}),document.getElementById("modal-download-btn")?.addEventListener("click",()=>{U(i.id)}),document.getElementById("close-doc-preview-btn")?.addEventListener("click",de),P.onclick=l=>{l.target===P&&de()};const I=document.getElementById("doc-viewer-viewport");if(!I)return;function ae(){const l=I.querySelector("video");if(l)try{l.pause(),l.removeAttribute("src"),l.load()}catch{}Array.isArray(window.__docPreviewCleanups)&&(window.__docPreviewCleanups.forEach(d=>{try{d()}catch{}}),window.__docPreviewCleanups=[])}function Y(l){const d=document.getElementById("btn-engine-native"),y=document.getElementById("btn-engine-drive");d&&y&&(l==="native"?(d.style.background="var(--brand-teal, #0d6269)",d.style.color="#ffffff",y.style.background="transparent",y.style.color="var(--ink-soft, #475569)"):(y.style.background="var(--brand-teal, #0d6269)",y.style.color="#ffffff",d.style.background="transparent",d.style.color="var(--ink-soft, #475569)")),ae(),I.innerHTML="",l==="drive"?re():se()}function re(){c?I.innerHTML=`
        <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#1e293b;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #334155;color:#94a3b8;font-size:12px;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;"></span>
              <span style="font-weight:700;color:#f8fafc;">${e("مستعرض Google Drive السحابي الرسمي","Official Google Drive Cloud Viewer")}</span>
            </div>
            <a href="${o(H)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="color:#38bdf8;background:transparent;border:none;cursor:pointer;font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:4px;">
              ${s("external",12)} ${e("فتح في علامة تبويب جديدة","Open in New Tab")}
            </a>
          </div>
          <iframe 
            src="${o(c)}" 
            style="flex:1;width:100%;height:100%;border:none;background:#ffffff;" 
            allow="autoplay; encrypted-media; fullscreen"
            title="Google Drive Preview"
          ></iframe>
        </div>
      `:(I.innerHTML=`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;text-align:center;padding:30px;box-sizing:border-box;">
          <div style="background:rgba(15,23,42,0.85);border:1px solid #334155;border-radius:14px;padding:32px 24px;max-width:480px;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
            <div style="color:var(--teal, #0d6269);margin-bottom:14px;display:flex;justify-content:center;">${s("external",36)}</div>
            <h4 style="margin:0 0 8px;font-size:16px;font-weight:800;color:#f8fafc;">${e("معاينة Google Drive السحابية","Google Drive Cloud Preview")}</h4>
            <p style="margin:0 0 18px;font-size:13px;color:#94a3b8;line-height:1.6;">
              ${e("هذا الملف مخزن في بيئة العمل المحلية أو كعينة هندسية، ولا يتوفر له رابط تضمين مباشر من Drive. نوصي باستخدام المستعرض المدمج فائق الدقة.","This file is hosted locally or as a demo showcase asset and does not have an active Google Drive embed link. We recommend using the high-fidelity native viewer.")}
            </p>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary btn-sm" id="btn-revert-native" style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
                ${s("eye",13)} <span>${e("العودة للمستعرض المدمج","Back to Native Viewer")}</span>
              </button>
              <a href="${o(H)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
                ${s("external",13)} <span>${e("مجلد Google Drive","Google Drive Folder")}</span>
              </a>
            </div>
          </div>
        </div>
      `,document.getElementById("btn-revert-native")?.addEventListener("click",()=>Y("native")))}function se(){if($){const l=J(i);I.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#1e242c;">
        <!-- Inspection Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #334155;color:#e2e8f0;font-size:12px;z-index:10;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:900;color:#dc2626;background:rgba(220,38,38,0.15);padding:3px 8px;border-radius:4px;">PDF</span>
            <span style="font-weight:700;color:#38bdf8;">${e("المخطط المعماري المعتمد للتنفيذ","Architectural Blueprint")}</span>
            <span style="color:#64748b;display:none;sm:inline;">•</span>
            <span style="color:#2dd4bf;font-size:11px;">● ${e("معتمد برقم ترخيص 2026/DARC-104","Stamp 2026/DARC-104")}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="pdf-open-newtab" style="background:#0284c7;color:#fff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ↗ ${e("نافذة كاملة مستقلة","Full Window")}
            </button>
            <button type="button" class="btn btn-sm" id="pdf-download-btn" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ${s("download",12)} ${e("تنزيل PDF","Download PDF")}
            </button>
          </div>
        </div>

        <!-- Native PDF Object + Mobile Fallback Container -->
        <div id="pdf-frame-container" style="flex:1;width:100%;height:100%;background:#525659;position:relative;overflow:hidden;">
          <object 
            id="pdf-native-object"
            data="${o(l)}#toolbar=1&navpanes=1&scrollbar=1" 
            type="application/pdf"
            style="width:100%;height:100%;border:none;display:block;"
          >
            <iframe 
              id="pdf-native-frame"
              src="${o(l)}#toolbar=1&navpanes=1&scrollbar=1" 
              type="application/pdf"
              style="width:100%;height:100%;border:none;display:block;"
              title="${o(i.originalName)}"
              allow="fullscreen"
            >
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;text-align:center;padding:24px;">
                <p style="margin-bottom:12px;font-size:14px;color:#cbd5e1;">${e("متصفحك يحتاج لفتح مستند PDF في نافذة جديدة أو تنزيله مباشرة.","Your browser requires opening this PDF in a new window or downloading it.")}</p>
                <a href="${o(l)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding:8px 18px;font-weight:700;">
                  ↗ ${e("فتح مستند PDF الأصلي","Open PDF in New Window")}
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    `,document.getElementById("pdf-open-newtab")?.addEventListener("click",()=>{window.open(l,"_blank")}),document.getElementById("pdf-download-btn")?.addEventListener("click",()=>{U(i.id)});return}if(b){let w=function(){B&&(B.style.transform=`translate(${t}px, ${f}px) scale(${d}) rotate(${y}deg)`),R&&(R.textContent=`${Math.round(d*100)}%`)};const l=J(i);I.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#0a0e14;user-select:none;">
        <!-- Inspection Toolbar -->
        <div style="position:absolute;top:16px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.88);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);padding:6px 14px;border-radius:30px;display:flex;align-items:center;gap:10px;z-index:20;box-shadow:0 10px 25px rgba(0,0,0,0.5);color:#fff;font-size:12px;">
          <button type="button" class="btn btn-ghost btn-sm" id="img-zoom-in" style="color:#fff;padding:4px 8px;font-weight:700;display:inline-flex;align-items:center;" title="${e("تكبير","Zoom In")}">${s("plus",14)}</button>
          <span id="img-zoom-level" style="font-weight:700;min-width:44px;text-align:center;">100%</span>
          <button type="button" class="btn btn-ghost btn-sm" id="img-zoom-out" style="color:#fff;padding:4px 8px;font-weight:700;display:inline-flex;align-items:center;" title="${e("تصغير","Zoom Out")}">${s("minus",14)}</button>
          <button type="button" class="btn btn-ghost btn-sm" id="img-rotate-btn" style="color:#38bdf8;padding:4px 8px;font-weight:700;" title="${e("تدوير 90 درجة","Rotate 90")}">↻ 90°</button>
          <button type="button" class="btn btn-ghost btn-sm" id="img-reset-btn" style="color:#fff;padding:4px 8px;font-weight:700;" title="${e("إعادة ضبط","Reset")}">⤢ 100%</button>
        </div>

        <!-- High-Res Image Viewport Canvas -->
        <div id="img-pan-viewport" style="flex:1;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:grab;position:relative;touch-action:none;">
          <img 
            id="active-preview-img" 
            src="${l}" 
            alt="${o(i.originalName)}" 
            style="max-width:92%;max-height:88%;object-fit:contain;border-radius:8px;box-shadow:0 20px 50px rgba(0,0,0,0.7);transition:transform 0.1s ease;transform-origin:center center;pointer-events:none;" 
          />
        </div>
      </div>
    `;let d=1,y=0,t=0,f=0,v=!1,A=0,L=0;const B=document.getElementById("active-preview-img"),R=document.getElementById("img-zoom-level"),C=document.getElementById("img-pan-viewport");if(document.getElementById("img-zoom-in")?.addEventListener("click",()=>{d=Math.min(5,d+.25),w()}),document.getElementById("img-zoom-out")?.addEventListener("click",()=>{d=Math.max(.4,d-.25),w()}),document.getElementById("img-rotate-btn")?.addEventListener("click",()=>{y=(y+90)%360,w()}),document.getElementById("img-reset-btn")?.addEventListener("click",()=>{d=1,y=0,t=0,f=0,w()}),C){C.addEventListener("wheel",_=>{_.preventDefault();const Q=_.deltaY<0?.15:-.15;d=Math.max(.4,Math.min(5,d+Q)),w()},{passive:!1}),C.addEventListener("pointerdown",_=>{v=!0;try{C.setPointerCapture(_.pointerId)}catch{}A=_.clientX-t,L=_.clientY-f,C.style.cursor="grabbing"}),C.addEventListener("pointermove",_=>{v&&(t=_.clientX-A,f=_.clientY-L,w())});const j=()=>{v=!1,C.style.cursor="grab"};C.addEventListener("pointerup",j),C.addEventListener("pointercancel",j),C.addEventListener("dblclick",()=>{d=d===1?2:1,t=0,f=0,w()})}return}if(E){const l=J(i);I.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#06090e;">
        <!-- Video Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:10;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:900;color:#8b5cf6;background:rgba(139,92,246,0.15);padding:3px 8px;border-radius:4px;">MP4 / 4K</span>
            <span style="font-weight:700;color:#e2e8f0;">${e("جولة الموقع ونسبة الإنجاز (Site Progress)","Walkthrough Video")}</span>
            <span style="color:#64748b;">•</span>
            <span style="color:#94a3b8;">${m}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <select id="video-playback-rate" style="background:#1e293b;color:#e2e8f0;border:1px solid #334155;border-radius:6px;padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer;">
              <option value="0.75">0.75x</option>
              <option value="1" selected>1.0x ${e("عادي","Normal")}</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2.0x</option>
            </select>
            <button type="button" class="btn btn-sm" id="video-pip-btn" style="background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
              ${s("eye",13)} <span>PiP</span>
            </button>
            <button type="button" class="btn btn-sm btn-primary" id="video-download-btn" style="padding:4px 12px;font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:4px;">
              ${s("download",13)} <span>${e("تنزيل الفيديو","Download Video")}</span>
            </button>
          </div>
        </div>

        <!-- Video Player Viewport -->
        <div style="flex:1;position:relative;display:flex;align-items:center;justify-content:center;background:#000;overflow:hidden;">
          <video 
            id="darc-main-video-player" 
            controls 
            autoplay 
            playsinline 
            webkit-playsinline
            preload="metadata"
            style="max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;outline:none;"
            src="${o(l)}"
          >
            <source src="${o(l)}" type="video/mp4" />
          </video>
        </div>

        <!-- Keyframe Jump Chips -->
        <div style="padding:8px 16px;background:rgba(15,23,42,0.95);border-top:1px solid #1e293b;display:flex;align-items:center;gap:8px;overflow-x:auto;" class="touch-scroll">
          <span style="font-size:11px;color:#94a3b8;white-space:nowrap;font-weight:700;display:inline-flex;align-items:center;gap:4px;">${s("pin",12)} <span>${e("محطات الجولة:","Keyframes:")}</span></span>
          <button type="button" class="video-jump-btn" data-sec="0" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:14px;font-size:11px;cursor:pointer;white-space:nowrap;">
            00:00 ${e("المدخل والمجلس","Majlis & Entry")}
          </button>
          <button type="button" class="video-jump-btn" data-sec="4" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:14px;font-size:11px;cursor:pointer;white-space:nowrap;">
            00:04 ${e("الصالة الرئيسية والبهو","Main Hall")}
          </button>
          <button type="button" class="video-jump-btn" data-sec="8" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:14px;font-size:11px;cursor:pointer;white-space:nowrap;">
            00:08 ${e("المسبح والحديقة الخلفية","Courtyard & Pool")}
          </button>
        </div>
      </div>
    `;const d=document.getElementById("darc-main-video-player");d&&(document.querySelectorAll(".video-jump-btn").forEach(y=>{y.addEventListener("click",()=>{const t=parseFloat(y.dataset.sec||"0");d.currentTime=t,d.play().catch(()=>{})})}),document.getElementById("video-playback-rate")?.addEventListener("change",y=>{d.playbackRate=parseFloat(y.target.value||"1")}),document.getElementById("video-pip-btn")?.addEventListener("click",async()=>{try{document.pictureInPictureElement?await document.exitPictureInPicture():d.requestPictureInPicture&&await d.requestPictureInPicture()}catch{}})),document.getElementById("video-download-btn")?.addEventListener("click",()=>U(i.id));return}if(h||T){I.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#0c1015;user-select:none;">
        <!-- CAD Inspection Top Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(16,20,24,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:20;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-weight:900;color:#0284c7;background:rgba(2,132,199,0.15);padding:3px 8px;border-radius:4px;display:inline-flex;align-items:center;gap:4px;">
              ${s("compass",13)} <span>CAD 2D</span>
            </span>
            <span style="font-weight:700;color:#f8fafc;">${o(i.originalName)}</span>
            <span style="color:#64748b;">•</span>
            <span id="cad-coords" style="font-family:monospace;color:#38bdf8;font-size:11px;">X: 0.00m | Y: 0.00m</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="cad-zoom-in" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:4px 8px;font-weight:700;display:inline-flex;align-items:center;">${s("plus",14)}</button>
            <button type="button" class="btn btn-sm" id="cad-zoom-out" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:4px 8px;font-weight:700;display:inline-flex;align-items:center;">${s("minus",14)}</button>
            <button type="button" class="btn btn-sm" id="cad-reset" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:4px 8px;font-weight:700;">⤢ 100%</button>
            <button type="button" class="btn btn-sm" id="cad-download-btn" style="background:#0284c7;border:none;color:#fff;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
              ${s("download",13)} <span>${e("تنزيل DWG / DXF","Download CAD")}</span>
            </button>
          </div>
        </div>

        <!-- Layer Toggles Bar -->
        <div style="padding:6px 16px;background:rgba(12,16,21,0.9);border-bottom:1px solid #1e293b;display:flex;align-items:center;gap:12px;font-size:11px;color:#94a3b8;overflow-x:auto;" class="touch-scroll">
          <span style="font-weight:700;color:#cbd5e1;">${e("الطبقات:","Layers:")}</span>
          <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:#38bdf8;">
            <input type="checkbox" id="layer-axes" checked style="cursor:pointer;" /> ${e("المحاور (Axes)","Axes")}
          </label>
          <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:#4ade80;">
            <input type="checkbox" id="layer-columns" checked style="cursor:pointer;" /> ${e("الأعمدة (Columns)","Columns")}
          </label>
          <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:#facc15;">
            <input type="checkbox" id="layer-walls" checked style="cursor:pointer;" /> ${e("الجدران والكمرات (Walls)","Walls")}
          </label>
          <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:#f472b6;">
            <input type="checkbox" id="layer-dims" checked style="cursor:pointer;" /> ${e("الأبعاد (Dimensions)","Dimensions")}
          </label>
        </div>

        <!-- Interactive 2D Vector CAD Canvas -->
        <div id="cad-canvas-box" style="flex:1;width:100%;height:100%;position:relative;overflow:hidden;cursor:crosshair;touch-action:none;">
          <canvas id="cad-canvas" style="display:block;width:100%;height:100%;"></canvas>
        </div>
      </div>
    `;const l=document.getElementById("cad-canvas"),d=document.getElementById("cad-canvas-box"),y=document.getElementById("cad-coords");if(l&&d){let Q=function(){const D=Math.min(window.devicePixelRatio||1,2);l.width=d.clientWidth*D,l.height=d.clientHeight*D,W()},W=function(){if(!t)return;const D=Math.min(window.devicePixelRatio||1,2),N=l.width/D,Z=l.height/D;t.save(),t.scale(D,D),t.clearRect(0,0,N,Z),t.fillStyle="#0b1016",t.fillRect(0,0,N,Z),t.translate(N/2+v,Z/2+A),t.scale(f,f),t.lineWidth=1/f,t.strokeStyle="rgba(255, 255, 255, 0.04)";for(let g=-400;g<=400;g+=20)t.beginPath(),t.moveTo(g,-300),t.lineTo(g,300),t.stroke();for(let g=-300;g<=300;g+=20)t.beginPath(),t.moveTo(-400,g),t.lineTo(400,g),t.stroke();t.strokeStyle="rgba(2, 132, 199, 0.12)";for(let g=-400;g<=400;g+=100)t.beginPath(),t.moveTo(g,-300),t.lineTo(g,300),t.stroke();for(let g=-300;g<=300;g+=100)t.beginPath(),t.moveTo(-400,g),t.lineTo(400,g),t.stroke();const O=[{label:"1",x:-240},{label:"2",x:-120},{label:"3",x:0},{label:"4",x:120},{label:"5",x:240}],xe=[{label:"A",y:-160},{label:"B",y:-60},{label:"C",y:60},{label:"D",y:160}];if(C?.checked&&(t.strokeStyle="rgba(56, 189, 248, 0.55)",t.setLineDash([8/f,4/f,2/f,4/f]),t.lineWidth=1.2/f,O.forEach(g=>{t.beginPath(),t.moveTo(g.x,-210),t.lineTo(g.x,210),t.stroke(),t.setLineDash([]),t.fillStyle="#0284c7",t.beginPath(),t.arc(g.x,-225,12,0,Math.PI*2),t.arc(g.x,225,12,0,Math.PI*2),t.fill(),t.fillStyle="#ffffff",t.font="bold 11px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(g.label,g.x,-225),t.fillText(g.label,g.x,225),t.setLineDash([8/f,4/f,2/f,4/f])}),xe.forEach(g=>{t.beginPath(),t.moveTo(-290,g.y),t.lineTo(290,g.y),t.stroke(),t.setLineDash([]),t.fillStyle="#0284c7",t.beginPath(),t.arc(-305,g.y,12,0,Math.PI*2),t.arc(305,g.y,12,0,Math.PI*2),t.fill(),t.fillStyle="#ffffff",t.font="bold 11px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(g.label,-305,g.y),t.fillText(g.label,305,g.y),t.setLineDash([8/f,4/f,2/f,4/f])}),t.setLineDash([])),j?.checked&&(t.strokeStyle="#facc15",t.lineWidth=2.5/f,t.strokeRect(-240,-160,480,320),t.strokeRect(-120,-160,240,100),t.strokeRect(-240,60,240,100),t.strokeStyle="#38bdf8",t.strokeRect(120,60,140,100)),w?.checked&&(t.fillStyle="#4ade80",t.strokeStyle="#ffffff",t.lineWidth=1/f,O.forEach(g=>{xe.forEach(q=>{t.fillRect(g.x-9,q.y-9,18,18),t.strokeRect(g.x-9,q.y-9,18,18),t.beginPath(),t.moveTo(g.x-9,q.y-9),t.lineTo(g.x+9,q.y+9),t.stroke()})})),_?.checked){t.strokeStyle="#f472b6",t.fillStyle="#f472b6",t.lineWidth=1.2/f,t.font="bold 10px monospace",t.textAlign="center";for(let g=0;g<O.length-1;g++){const q=O[g].x,ue=O[g+1].x,we=(q+ue)/2;t.beginPath(),t.moveTo(q,-190),t.lineTo(ue,-190),t.stroke(),t.fillText("6.00m",we,-196)}}t.restore()};const t=l.getContext("2d");let f=1,v=0,A=0,L=!1,B=0,R=0;const C=document.getElementById("layer-axes"),w=document.getElementById("layer-columns"),j=document.getElementById("layer-walls"),_=document.getElementById("layer-dims");window.addEventListener("resize",Q),window.__docPreviewCleanups=window.__docPreviewCleanups||[],window.__docPreviewCleanups.push(()=>window.removeEventListener("resize",Q)),setTimeout(Q,50),[C,w,j,_].forEach(D=>{D?.addEventListener("change",W)}),document.getElementById("cad-zoom-in")?.addEventListener("click",()=>{f=Math.min(4,f*1.25),W()}),document.getElementById("cad-zoom-out")?.addEventListener("click",()=>{f=Math.max(.3,f*.8),W()}),document.getElementById("cad-reset")?.addEventListener("click",()=>{f=1,v=0,A=0,W()}),d.addEventListener("wheel",D=>{D.preventDefault();const N=D.deltaY<0?1.15:.87;f=Math.max(.3,Math.min(4,f*N)),W()},{passive:!1}),d.addEventListener("pointerdown",D=>{L=!0;try{d.setPointerCapture(D.pointerId)}catch{}B=D.clientX-v,R=D.clientY-A,d.style.cursor="grabbing"}),d.addEventListener("pointermove",D=>{const N=d.getBoundingClientRect(),Z=((D.clientX-N.left-N.width/2-v)/f/20).toFixed(2),O=((D.clientY-N.top-N.height/2-A)/f/20).toFixed(2);y&&(y.textContent=`X: ${Z}m | Y: ${O}m`),L&&(v=D.clientX-B,A=D.clientY-R,W())});const ge=()=>{L=!1,d.style.cursor="crosshair"};d.addEventListener("pointerup",ge),d.addEventListener("pointercancel",ge)}document.getElementById("cad-download-btn")?.addEventListener("click",()=>U(i.id));return}if(M){let t=function(){const f=l[d],v=y.toLowerCase().trim(),A=f.rows.filter(w=>v?w.code.toLowerCase().includes(v)||w.desc.toLowerCase().includes(v)||w.unit.toLowerCase().includes(v):!0),L=A.reduce((w,j)=>w+j.total,0),B=document.getElementById("excel-interactive-table-body"),R=document.getElementById("excel-sheet-subtotal"),C=document.getElementById("excel-filtered-count");C&&(C.textContent=`${A.length} ${e("بند","items")}`),R&&(R.textContent=`${L.toLocaleString()} ${e("ر.س","SAR")}`),B&&(B.innerHTML=A.map(w=>`
          <tr style="border-bottom:1px solid var(--line, #e2e8f0);transition:background 0.15s ease;">
            <td style="padding:10px 14px;font-weight:800;font-family:monospace;color:var(--brand-teal, #0d6269);white-space:nowrap;">${o(w.code)}</td>
            <td style="padding:10px 14px;color:var(--ink, #0f172a);font-weight:600;min-width:240px;line-height:1.5;">${o(w.desc)}</td>
            <td style="padding:10px 14px;text-align:center;color:var(--ink-soft, #475569);font-weight:700;">${o(w.unit)}</td>
            <td style="padding:10px 14px;text-align:center;font-weight:800;font-variant-numeric:tabular-nums;">${w.qty.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:end;font-weight:700;font-variant-numeric:tabular-nums;">${w.rate.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:end;font-weight:900;color:#107c41;font-variant-numeric:tabular-nums;">${w.total.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:center;">
              <span class="status-badge approved" style="font-size:10px;padding:2px 8px;font-weight:800;display:inline-flex;align-items:center;gap:4px;">${s("check",11)} ${e("معتمد","Approved")}</span>
            </td>
          </tr>
        `).join(""))};const l=[{id:"structural",title:e("أعمال الهيكل الإنشائي والعظم","Structural & Concrete Works"),rows:[{code:"01.01",desc:e("حفر وتجهيز الموقع وترحيل المخلفات لعمق التأسيس","Excavation & site prep to foundation depth"),unit:"م3",qty:1200,rate:45,total:54e3,status:"approved"},{code:"01.02",desc:e("خرسانة عادية للنظافة C20 سمك 10سم أسفل القواعد","Plain blinding concrete C20 (100mm) under footings"),unit:"م3",qty:180,rate:280,total:50400,status:"approved"},{code:"01.03",desc:e("خرسانة مسلحة للقواعد والرقاب C35 مقاوم للأملاح والكلوريدات","Reinforced concrete C35 SRC for footings and column necks"),unit:"م3",qty:420,rate:390,total:163800,status:"approved"},{code:"01.04",desc:e("حديد تسليح عالي المقاومة مشوه Grade 60 (ASTM A615)","Deformed high-strength rebar Grade 60 (ASTM A615)"),unit:"طن",qty:48,rate:3250,total:156e3,status:"approved"},{code:"01.05",desc:e("خرسانة مسلحة للأعمدة والجدران الاستنادية C40","Reinforced concrete C40 for columns and retaining walls"),unit:"م3",qty:260,rate:420,total:109200,status:"approved"},{code:"01.06",desc:e("عوازل مائية للقواعد ورقاب الأعمدة دهان بيتوميني وممبرين 4مم","Waterproofing bituminous primer + 4mm modified bitumen membrane"),unit:"م2",qty:850,rate:65,total:55250,status:"approved"},{code:"01.07",desc:e("أسقف خرسانية هوردي ولاكمرية Flat Slab مع كمرات ساقطة","Hollow-block and flat slab concrete with drop beams"),unit:"م3",qty:520,rate:410,total:213200,status:"approved"}]},{id:"finishes",title:e("التشطيبات المعمارية الفاخرة","Architectural Finishes"),rows:[{code:"02.01",desc:e("تكسيات حجر ترافنتينو إيطالي نخب أول للواجهات الخارجية","Italian Travertine stone cladding for exterior facades"),unit:"م2",qty:640,rate:480,total:307200,status:"approved"},{code:"02.02",desc:e("واجهات زجاجية مزدوجة معزولة حرارياً كيرتن وول قطاع Schüco","Double-glazed thermally broken curtain walls (Schüco profile)"),unit:"م2",qty:220,rate:1150,total:253e3,status:"approved"},{code:"02.03",desc:e("أرضيات رخام ستاتوريو إيطالي للمجالس والصالات الرئيسية","Statuario Italian marble flooring for main majlis & halls"),unit:"م2",qty:380,rate:620,total:235600,status:"approved"},{code:"02.04",desc:e("أسقف معلقة جبسية مقاومة للرطوبة مع مسارات إنارة مغناطيسية","Moisture-resistant gypsum ceilings with magnetic track lighting"),unit:"م2",qty:580,rate:195,total:113100,status:"approved"},{code:"02.05",desc:e("أبواب خشب جوز طبيعي بارتفاع 3.20م مع أقفال ذكية وكوالين خفية","Natural walnut flush doors (3.2m height) with concealed hinges"),unit:"عدد",qty:18,rate:4800,total:86400,status:"approved"},{code:"02.06",desc:e("دهانات داخلية ميكرو سمنت ديكوري فاخر للممرات والصالات","Luxury decorative microcement internal wall finishes"),unit:"م2",qty:1200,rate:85,total:102e3,status:"approved"}]},{id:"mep",title:e("الأنظمة الكهروميكانيكية والتكييف","MEP & HVAC Systems"),rows:[{code:"03.01",desc:e("نظام تكييف مركزي مخفي VRF إنفرتر مع تحكم ذكي غرفي","Inverter VRF central concealed AC system with smart zone thermostats"),unit:"نظام",qty:1,rate:28e4,total:28e4,status:"approved"},{code:"03.02",desc:e("شبكة التغذية والصرف الصحي أنابيب بولي بروبلين ألماني عازل للصوت","Acoustic PPR plumbing & drainage networks with booster pumps"),unit:"مقطوعية",qty:1,rate:95e3,total:95e3,status:"approved"},{code:"03.03",desc:e("نظام سمارت هوم للتحكم بالإنارة والتكييف والستائر بروتوكول KNX","KNX Smart Home automation for lighting, climate and shading"),unit:"نظام",qty:1,rate:145e3,total:145e3,status:"approved"},{code:"03.04",desc:e("لوحات التوزيع الكهربائية والقواطع الذكية شنايدر إلكتريك","Schneider Electric main electrical distribution boards & RCBOs"),unit:"لوحة",qty:6,rate:14e3,total:84e3,status:"approved"},{code:"03.05",desc:e("أنظمة إنذار ومكافحة الحريق وكواشف الدخان المتطورة","Advanced addressable fire alarm, smoke detectors & clean agent extinguishers"),unit:"نظام",qty:1,rate:48e3,total:48e3,status:"approved"}]}];let d=0,y="";I.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);overflow:hidden;">
        <!-- Excel Green Header -->
        <div style="background:#107c41;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 8px rgba(16,124,65,0.25);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#107c41;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">X</div>
            <div>
              <div style="font-weight:800;font-size:14px;letter-spacing:-0.2px;">${o(i.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Excel Spreadsheet • ${e("جداول حساب الكميات والمقايسة المعتمدة","Approved Bill of Quantities")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="excel-print-btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ${s("printer",13)} ${e("طباعة المقايسة","Print BOQ")}
            </button>
            <button type="button" class="btn btn-sm" id="excel-direct-download" style="background:#ffffff;color:#107c41;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              ${s("download",13)} ${e("تنزيل ملف XLSX الأصلي","Download XLSX")}
            </button>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 18px;background:var(--surface-soft, #f8fafc);border-bottom:1px solid var(--line, #e2e8f0);flex-wrap:wrap;gap:10px;">
          <!-- Sheet Tabs -->
          <div style="display:flex;align-items:center;gap:6px;overflow-x:auto;" class="touch-scroll">
            ${l.map((f,v)=>`
              <button type="button" class="excel-sheet-tab-btn" data-sheet-idx="${v}" style="padding:6px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid ${v===0?"#107c41":"var(--line, #e2e8f0)"};background:${v===0?"#107c41":"var(--surface, #ffffff)"};color:${v===0?"#ffffff":"var(--ink, #0f172a)"};white-space:nowrap;transition:all 0.15s ease;">
                ${o(f.title)}
              </button>
            `).join("")}
          </div>

          <!-- Live Search Input -->
          <div style="position:relative;min-width:240px;flex:1;max-width:360px;">
            <input 
              type="search" 
              id="excel-live-search" 
              placeholder="${e("بحث في بنود جدول الكميات...","Search BOQ items...")}" 
              style="width:100%;padding:7px 12px;font-size:12px;border:1px solid var(--line, #e2e8f0);border-radius:8px;background:var(--surface, #ffffff);color:var(--ink, #0f172a);outline:none;box-sizing:border-box;"
            />
          </div>
        </div>

        <!-- Spreadsheet Grid Container -->
        <div style="flex:1;overflow:auto;position:relative;" class="touch-scroll doc-custom-scrollbar">
          <table style="width:100%;border-collapse:collapse;font-size:12px;text-align:start;">
            <thead style="position:sticky;top:0;background:var(--surface-soft, #f1f5f9);z-index:5;border-bottom:2px solid var(--line, #cbd5e1);color:var(--ink, #0f172a);font-weight:800;">
              <tr>
                <th style="padding:10px 14px;text-align:start;white-space:nowrap;">${e("رقم البند","Item #")}</th>
                <th style="padding:10px 14px;text-align:start;">${e("التوصيف والمواصفات الهندسية","Description & Engineering Specs")}</th>
                <th style="padding:10px 14px;text-align:center;white-space:nowrap;">${e("الوحدة","Unit")}</th>
                <th style="padding:10px 14px;text-align:center;white-space:nowrap;">${e("الكمية","Qty")}</th>
                <th style="padding:10px 14px;text-align:end;white-space:nowrap;">${e("السعر الفردي (ر.س)","Rate (SAR)")}</th>
                <th style="padding:10px 14px;text-align:end;white-space:nowrap;">${e("الإجمالي (ر.س)","Total (SAR)")}</th>
                <th style="padding:10px 14px;text-align:center;white-space:nowrap;">${e("الحالة","Status")}</th>
              </tr>
            </thead>
            <tbody id="excel-interactive-table-body">
              <!-- Rendered dynamically -->
            </tbody>
          </table>
        </div>

        <!-- Spreadsheet Footer Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:var(--surface-soft, #f8fafc);border-top:1px solid var(--line, #e2e8f0);flex-wrap:wrap;gap:10px;font-size:12px;">
          <div style="display:flex;align-items:center;gap:10px;color:var(--ink-soft, #475569);font-weight:700;">
            <span id="excel-filtered-count">0 بند</span>
            <span>•</span>
            <span>${e("العملة: ريال سعودي (SAR)","Currency: Saudi Riyal (SAR)")}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-weight:700;color:var(--ink-soft, #475569);">${e("إجمالي القسم المحدد:","Subtotal:")}</span>
            <span id="excel-sheet-subtotal" style="font-size:15px;font-weight:900;color:#107c41;font-family:monospace;">0 ر.س</span>
          </div>
        </div>
      </div>
    `,t(),document.querySelectorAll(".excel-sheet-tab-btn").forEach(f=>{f.addEventListener("click",()=>{d=parseInt(f.dataset.sheetIdx,10)||0,document.querySelectorAll(".excel-sheet-tab-btn").forEach((v,A)=>{A===d?(v.style.background="#107c41",v.style.borderColor="#107c41",v.style.color="#ffffff"):(v.style.background="var(--surface, #ffffff)",v.style.borderColor="var(--line, #e2e8f0)",v.style.color="var(--ink, #0f172a)")}),t()})}),document.getElementById("excel-live-search")?.addEventListener("input",f=>{y=f.target.value||"",t()}),document.getElementById("excel-print-btn")?.addEventListener("click",()=>window.print()),document.getElementById("excel-direct-download")?.addEventListener("click",()=>U(i.id));return}if(z){I.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#1e242c;overflow:hidden;">
        <!-- Word Header -->
        <div style="background:#2b579a;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(43,87,154,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#2b579a;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">W</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${o(i.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Word Document • ${e("دفاتر الشروط والمواصفات الفنية المعتمدة","Approved Technical Specifications Document")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="word-print-btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ${s("printer",13)} ${e("طباعة الوثيقة","Print Specs")}
            </button>
            <button type="button" class="btn btn-sm" id="word-download-btn" style="background:#ffffff;color:#2b579a;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              ${s("download",13)} ${e("تنزيل DOCX الأصلي","Download DOCX")}
            </button>
          </div>
        </div>

        <!-- Section Navigation Chips -->
        <div style="padding:8px 18px;background:rgba(15,23,42,0.9);border-bottom:1px solid #334155;display:flex;align-items:center;gap:8px;overflow-x:auto;" class="touch-scroll">
          <span style="font-size:11px;color:#94a3b8;font-weight:700;white-space:nowrap;">${e("فهرس البنود:","Index:")}</span>
          <a href="#spec-sec-1" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:12px;font-size:11px;text-decoration:none;white-space:nowrap;">1. ${e("الاشتراطات العامة","General")}</a>
          <a href="#spec-sec-2" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:12px;font-size:11px;text-decoration:none;white-space:nowrap;">2. ${e("الخرسانة والحديد","Structural")}</a>
          <a href="#spec-sec-3" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:12px;font-size:11px;text-decoration:none;white-space:nowrap;">3. ${e("العوازل والواجهات","Insulation & Facades")}</a>
          <a href="#spec-sec-4" style="background:#1e293b;border:1px solid #334155;color:#38bdf8;padding:3px 10px;border-radius:12px;font-size:11px;text-decoration:none;white-space:nowrap;">4. ${e("كود البناء SBC","SBC Codes")}</a>
        </div>

        <!-- Executive Document Body (A4 styled layout) -->
        <div style="flex:1;overflow-y:auto;padding:24px 16px;display:flex;justify-content:center;background:#0d1117;" class="touch-scroll doc-custom-scrollbar">
          <div style="width:100%;max-width:880px;background:#ffffff;color:#0f172a;border-radius:12px;box-shadow:0 15px 40px rgba(0,0,0,0.5);padding:clamp(20px, 4vw, 48px);box-sizing:border-box;font-family:system-ui, -apple-system, sans-serif;line-height:1.7;">
            
            <!-- Document Formal Letterhead -->
            <div style="border-bottom:2px solid #2b579a;padding-bottom:18px;margin-bottom:28px;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
              <div>
                <h1 style="margin:0 0 6px;font-size:22px;color:#2b579a;font-weight:900;">DARC DESIGN TEAM</h1>
                <p style="margin:0;font-size:13px;color:#64748b;font-weight:700;">${e("قسم إدارة الجودة والمواصفات الهندسية التنفيذية","Engineering Quality & Technical Specifications Division")}</p>
              </div>
              <div style="text-align:end;font-size:11px;color:#64748b;">
                <div><strong>${e("رقم الوثيقة:","Doc Code:")}</strong> SPEC-2026-VILLA-01-REV03</div>
                <div><strong>${e("تاريخ الاعتماد:","Date:")}</strong> 2026-11-01</div>
                <div><span class="status-badge approved" style="font-size:10px;display:inline-flex;align-items:center;gap:4px;margin-top:4px;">${s("check",11)} معتمد للتنفيذ (Approved for Construction)</span></div>
              </div>
            </div>

            <!-- Title -->
            <div style="background:#f1f5f9;border-right:4px solid #2b579a;padding:14px 18px;margin-bottom:30px;border-radius:4px;">
              <h2 style="margin:0 0 4px;font-size:17px;font-weight:900;color:#0f172a;">${e("دفتر المواصفات الفنية العامة والخاصة لمشروع فيلا النخيل السكنية","General & Particular Technical Specifications for Palm Villa Project")}</h2>
              <p style="margin:0;font-size:12px;color:#475569;">${e("مطابقة للمخططات المعمارية والإنشائية المعتمدة وكود البناء السعودي (SBC)","Compliant with Approved Drawings and the Saudi Building Code (SBC)")}</p>
            </div>

            <!-- Section 1 -->
            <section id="spec-sec-1" style="margin-bottom:30px;">
              <h3 style="font-size:15px;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">1. ${e("الاشتراطات العامة وضبط الجودة بالموقع","1. General Requirements & Site Quality Control")}</h3>
              <p style="font-size:13px;color:#334155;margin:0 0 10px;">
                ${e("يلتزم المقاول المنفذ بالتقيد التام بجميع المخططات المعتمدة الصادرة عن استشاري المشروع (DARC Design Team). لا يُسمح بإجراء أي تعديل أو استبدال في المواد أو الأبعاد دون الحصول على اعتماد خطي مسبق (RFI / Material Approval Request).","The contractor shall strictly adhere to all approved drawings issued by the consultant (DARC Design Team). No modifications or substitutions shall be executed without prior written approval.")}
              </p>
              <ul style="font-size:13px;color:#334155;padding-right:20px;margin:0;">
                <li>${e("تقديم عينات المواد والتشطيبات للاستشاري قبل التوريد بمدة لا تقل عن 15 يوماً.","Submit material samples at least 15 days prior to site delivery.")}</li>
                <li>${e("توثيق جميع مراحل الصب والتأسيس بتقرير مصور واختبارات مختبر معتمد.","Document all concrete pours with certified third-party lab testing.")}</li>
              </ul>
            </section>

            <!-- Section 2 -->
            <section id="spec-sec-2" style="margin-bottom:30px;">
              <h3 style="font-size:15px;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">2. ${e("مواصفات الأعمال الخرسانية وحديد التسليح","2. Concrete & Structural Steel Specifications")}</h3>
              <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:14px;border:1px solid #cbd5e1;">
                <thead>
                  <tr style="background:#f8fafc;color:#0f172a;">
                    <th style="padding:8px 12px;border:1px solid #cbd5e1;text-align:start;">${e("العنصر الإنشائي","Structural Element")}</th>
                    <th style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${e("رتبة الخرسانة (f’c)","Concrete Grade")}</th>
                    <th style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${e("نوع الإسمنت","Cement Type")}</th>
                    <th style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${e("هبوط الخرسانة (Slump)","Slump Test")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;font-weight:700;">${e("القواعد والرقاب والميد","Footings & Grade Beams")}</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;font-weight:800;color:#2b579a;">C35 (35 MPa)</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${e("مقاوم للأملاح Type V","Sulfate Resistant")}</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">120 ± 25 mm</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;font-weight:700;">${e("الأعمدة والأسقف والكمرات","Columns & Slabs")}</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;font-weight:800;color:#2b579a;">C40 (40 MPa)</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">${e("بورتلاندي عادي Type I","Ordinary Portland")}</td>
                    <td style="padding:8px 12px;border:1px solid #cbd5e1;text-align:center;">140 ± 25 mm</td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:12px;color:#475569;margin:0;">
                ${e("حديد التسليح: مطابق للمواصفة ASTM A615 Grade 60 بحد خضوع لا يقل عن 420 ميجاباسكال، مع حماية أطراف التشريك والربط بسلك مجلفن نمرة 18.","Reinforcing steel: Conforming to ASTM A615 Grade 60 with yield strength not less than 420 MPa.")}
              </p>
            </section>

            <!-- Section 3 -->
            <section id="spec-sec-3" style="margin-bottom:30px;">
              <h3 style="font-size:15px;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">3. ${e("أنظمة العزل والكسوات المعمارية والواجهات","3. Insulation, Facades & Cladding")}</h3>
              <p style="font-size:13px;color:#334155;margin:0 0 10px;">
                ${e("تُنفذ العوازل المائية للأسطح بنظام الممبرين المزدوج (Dual Layer 4mm SBS Membrane) مع ضمان لا يقل عن 10 سنوات، وتُعزل الجدران الخارجية بألواح بوليسترين مبثوق XPS سمك 75مم لتحقيق معامل انتقال حراري U-value مطابق لمعايير المركز السعودي لكفاءة الطاقة (SEEC).","Waterproofing for roof slabs shall be executed with dual 4mm SBS modified membrane carrying a 10-year warranty. External walls insulated with 75mm XPS.")}
              </p>
            </section>

            <!-- Section 4 -->
            <section id="spec-sec-4">
              <h3 style="font-size:15px;color:#2b579a;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px;">4. ${e("الالتزام بكود البناء السعودي (SBC)","4. Compliance with Saudi Building Code")}</h3>
              <p style="font-size:13px;color:#334155;margin:0;">
                ${e("تمت صياغة واعتماد هذه المواصفات لتتوافق بشكل كامل مع اشتراطات SBC 201 (المعماري)، SBC 304 (الخرساني)، SBC 601 (كفاءة الطاقة)، و SBC 801 (الحماية من الحريق).","These specifications comply fully with SBC 201 (Architectural), SBC 304 (Structural Concrete), SBC 601 (Energy), and SBC 801 (Fire Protection).")}
              </p>
            </section>
          </div>
        </div>
      </div>
    `,document.getElementById("word-print-btn")?.addEventListener("click",()=>window.print()),document.getElementById("word-download-btn")?.addEventListener("click",()=>U(i.id));return}if(F){let y=function(){const L=l[d],B=document.getElementById("ppt-slide-canvas-viewport"),R=document.getElementById("ppt-slide-counter"),C=document.getElementById("ppt-slide-dots-container");R&&(R.textContent=`${e("شريحة","Slide")} ${d+1} / ${l.length}`),C&&(C.innerHTML=l.map((w,j)=>`
          <button type="button" class="ppt-dot" data-dot-idx="${j}" style="width:${j===d?"24px":"8px"};height:8px;border-radius:4px;border:none;background:${j===d?"#d24726":"rgba(255,255,255,0.3)"};cursor:pointer;transition:all 0.2s ease;padding:0;" title="${e("انتقال للشريحة","Go to slide")} ${j+1}"></button>
        `).join(""),C.querySelectorAll(".ppt-dot").forEach(w=>{w.addEventListener("click",()=>{d=parseInt(w.dataset.dotIdx,10)||0,y()})})),B&&(B.style.backgroundColor=L.theme,B.innerHTML=L.html,document.getElementById("ppt-slide-download-btn")?.addEventListener("click",()=>U(i.id)))};const l=[{number:1,title:e("فلسفة التصميم والمفهوم المعماري","Design Philosophy & Architectural Concept"),subtitle:e("فيلا النخيل الفاخرة — مخرجات مرحلة المفهوم الأولي Concept Phase","Palm Villa Luxury Residence — Concept Deliverables"),theme:"#090d13",accent:"#d24726",html:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:clamp(16px, 4vw, 40px);box-sizing:border-box;">
            <span style="font-size:12px;font-weight:900;color:#d24726;background:rgba(210,71,38,0.18);padding:4px 14px;border-radius:20px;letter-spacing:1px;margin-bottom:16px;">
              DARC ARCHITECTURAL PORTFOLIO 2026
            </span>
            <h1 style="font-size:clamp(22px, 4vw, 38px);font-weight:900;color:#ffffff;margin:0 0 12px;line-height:1.2;">
              PALM VILLA LUXURY CONCEPT
            </h1>
            <p style="font-size:clamp(13px, 1.8vw, 16px);color:#94a3b8;max-width:620px;line-height:1.6;margin:0 0 24px;">
              ${e("دمج العمارة النجدية المعاصرة بالخطوط الهندسية الحديثة، مع تعزيز الانفتاح البصري والخصوصية العائلية المطلقة.","Seamless blend of contemporary regional architecture and modern minimalism, maximizing indoor-outdoor spatial harmony.")}
            </p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;font-size:12px;color:#cbd5e1;">
              <span style="background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);display:inline-flex;align-items:center;gap:6px;">${s("pin",12)} ${e("الرياض / نخلة جميرا","Riyadh / Palm Jumeirah")}</span>
              <span style="background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);display:inline-flex;align-items:center;gap:6px;">${s("compass",12)} ${e("المساحة المبنية: 1,450 م2","BUA: 1,450 sqm")}</span>
              <span style="background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);display:inline-flex;align-items:center;gap:6px;">${s("building",12)} ${e("الإصدار: Rev 03","Revision: Rev 03")}</span>
            </div>
          </div>
        `},{number:2,title:e("دراسة الكتلة والتوجيه البيئي","Massing & Solar Shading Analysis"),subtitle:e("تحليل مسار الشمس وحركة الرياح لتخفيض الأحمال الحرارية بنسبة 35%","Solar path & wind direction study yielding 35% thermal load reduction"),theme:"#0d1117",accent:"#0284c7",html:`
          <div style="height:100%;display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:24px;align-items:center;padding:clamp(16px, 3vw, 40px);box-sizing:border-box;">
            <div>
              <span style="color:#0284c7;font-weight:800;font-size:12px;text-transform:uppercase;">Analysis & Simulation</span>
              <h2 style="color:#ffffff;font-size:clamp(18px, 2.5vw, 24px);margin:6px 0 14px;font-weight:900;">${e("دراسة التوجيه ومسار الإشعاع الشمسي","Microclimate & Solar Shading Analysis")}</h2>
              <p style="color:#94a3b8;font-size:13px;line-height:1.7;margin:0 0 16px;">
                ${e("تم توجيه الفتحات الزجاجية الكبرى نحو الشمال والشمال الشرقي، مع استخدام كواسر شمسية عمودية (Vertical Louvers) في الواجهات الغربية والجنوبية لتجنب وهج الشمس المباشر.","Primary fenestrations oriented towards North and Northeast, complemented by motorized architectural louvers on the West elevation to mitigate solar heat gain.")}
              </p>
              <div style="display:grid;gap:8px;font-size:12px;">
                <div style="background:rgba(2,132,199,0.1);border-left:3px solid #0284c7;padding:8px 12px;color:#e2e8f0;display:flex;align-items:center;gap:6px;"><span class="ui-inline-icon icon-info">${s("zap",14)}</span> ${e("توفير سنوي مقدر بنسبة 32% في استهلاك طاقة التكييف.","32% estimated annual HVAC cooling load reduction.")}</div>
                <div style="background:rgba(16,185,129,0.1);border-left:3px solid #10b981;padding:8px 12px;color:#e2e8f0;display:flex;align-items:center;gap:6px;"><span class="ui-inline-icon icon-success">${s("leaf",14)}</span> ${e("استغلال الإضاءة الطبيعية لتقليل الاعتماد على الإنارة الاصطناعية النهارية.","Optimal daylight autonomy across all active family spaces.")}</div>
              </div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px dashed #334155;border-radius:12px;padding:24px;text-align:center;">
              <div style="margin-bottom:12px;color:#f59e0b;display:flex;justify-content:center;">${s("sun",44)}</div>
              <h4 style="color:#f8fafc;margin:0 0 6px;">${e("توزيع الإشعاع الشمسي المباشر","Direct Radiation Spectrum")}</h4>
              <p style="color:#64748b;font-size:11px;margin:0;">SBC 601 Certified Passive Thermal Envelope</p>
            </div>
          </div>
        `},{number:3,title:e("المخطط التوجيهي والفصل الحركي","Zoning & Circulation Flow"),subtitle:e("التدرج من الفضاءات العامة إلى غرف النوم العائلية الخاصة","Public hospitality zones to private family living quarters"),theme:"#090d13",accent:"#10b981",html:`
          <div style="height:100%;display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:24px;align-items:center;padding:clamp(16px, 3vw, 40px);box-sizing:border-box;">
            <div>
              <span style="color:#10b981;font-weight:800;font-size:12px;">Spatial Hierarchy</span>
              <h2 style="color:#ffffff;font-size:clamp(18px, 2.5vw, 24px);margin:6px 0 14px;font-weight:900;">${e("التوزيع الفضائي والتدرج الوظيفي","Spatial Flow & Privacy Gradients")}</h2>
              <ul style="color:#cbd5e1;font-size:13px;line-height:1.8;padding-right:20px;margin:0;">
                <li><strong>${e("الجناح الرسمي (Ground Floor Majlis):","Formal Majlis:")}</strong> ${e("مدخل مستقل، بهو استقبال واسع، دورات مياه وصالة طعام فاخرة.","Dedicated guest entrance, expansive atrium, and luxury formal dining.")}</li>
                <li><strong>${e("قلب الفيلا (Central Family Living):","Family Heart:")}</strong> ${e("صالة عائلية بارتفاع مزدوج (Double Height) مطلة على الحديقة والمسبح.","Double-height living space with panoramic glazed connection to pool.")}</li>
                <li><strong>${e("الجناح الخاص (First Floor Suites):","Private Suites:")}</strong> ${e("4 أجنحة نوم ماستر مع تراسات معلقة وغرفة معيشة خاصة.","4 Master bedroom suites with cantilevered balconies.")}</li>
              </ul>
            </div>
            <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.25);border-radius:12px;padding:24px;text-align:center;">
              <div style="margin-bottom:12px;color:#10b981;display:flex;justify-content:center;">${s("building",44)}</div>
              <h4 style="color:#f8fafc;margin:0 0 6px;">${e("مخطط الحركة والخصوصية التامة","Circulation & Privacy Blueprint")}</h4>
              <p style="color:#94a3b8;font-size:12px;margin:0;">${e("فصل تام لحركة الضيوف عن خصوصية أهل المنزل.","Zero visual overlap between guest circulation and family quarters.")}</p>
            </div>
          </div>
        `},{number:4,title:e("لوحة المواد والكسوات المعمارية","Materiality & Texture Palette"),subtitle:e("حجر ترافنتينو، خشب تيرموود معالج، زجاج عاكس وألمنيوم برونزي","Travertine stone, thermo-treated oak, bronze anodized aluminum"),theme:"#0c1015",accent:"#f59e0b",html:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;padding:clamp(16px, 3vw, 40px);box-sizing:border-box;">
            <h2 style="color:#ffffff;font-size:clamp(18px, 2.5vw, 24px);margin:0 0 20px;font-weight:900;">${e("لوحة المواد والتشطيبات الفاخرة المعتمدة","Curated Architectural Material Board")}</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;">
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;">
                <div style="width:36px;height:36px;border-radius:8px;background:#e2d9cc;margin-bottom:10px;"></div>
                <h4 style="color:#fff;margin:0 0 4px;font-size:13px;">${e("حجر ترافنتينو بيج روماني","Roman Travertine")}</h4>
                <p style="color:#94a3b8;font-size:11px;margin:0;">${e("ملمس طبيعي معالج للواجهات الخارجية وممرات المدخل.","Honed unfilled finish for primary exterior facades.")}</p>
              </div>
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;">
                <div style="width:36px;height:36px;border-radius:8px;background:#654321;margin-bottom:10px;"></div>
                <h4 style="color:#fff;margin:0 0 4px;font-size:13px;">${e("خشب تيرموود معالج بالحرارة","Thermo-Wood Slats")}</h4>
                <p style="color:#94a3b8;font-size:11px;margin:0;">${e("مقاوم للعوامل الجوية والحرارة العالية مع كواسر شمسية.","Weather-resistant acoustic external louvers.")}</p>
              </div>
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;">
                <div style="width:36px;height:36px;border-radius:8px;background:#38bdf8;margin-bottom:10px;"></div>
                <h4 style="color:#fff;margin:0 0 4px;font-size:13px;">${e("زجاج Low-E مزدوج العزل","Low-E Performance Glass")}</h4>
                <p style="color:#94a3b8;font-size:11px;margin:0;">${e("عزل صوتي 42dB مع نفاذية ضوء ممتازة وعزل حراري.","U-value: 1.1 W/m²K, 42dB acoustic isolation.")}</p>
              </div>
            </div>
          </div>
        `},{number:5,title:e("الابتكار الإنشائي والحلول الهندسية","Structural Innovation & Cantilevers"),subtitle:e("أطراف معلقة (Cantilevers) بطول 4.20م مع بلاطات لاكمرية مسبقة الإجهاد","Post-tensioned 4.2m cantilevers creating column-free covered terraces"),theme:"#090d13",accent:"#8b5cf6",html:`
          <div style="height:100%;display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:24px;align-items:center;padding:clamp(16px, 3vw, 40px);box-sizing:border-box;">
            <div>
              <span style="color:#8b5cf6;font-weight:800;font-size:12px;">Structural Feasibility</span>
              <h2 style="color:#ffffff;font-size:clamp(18px, 2.5vw, 24px);margin:6px 0 14px;font-weight:900;">${e("الحلول الإنشائية للأسقف الطائرة","Post-Tensioned Cantilevered Structure")}</h2>
              <p style="color:#94a3b8;font-size:13px;line-height:1.7;margin:0 0 16px;">
                ${e("استخدام كمرات مدفونة بنظام الكابلات مسبقة الإجهاد (Post-Tension) لإلغاء أي أعمدة في منطقة المسبح والجلسة الخارجية المفتوحة، مما يمنح إطلالة بانورامية كاملة بدون عوائق بصرية.","Integration of post-tensioned embedded transfer girders enables a 4.2m column-free overhang across the poolside terrace for uninterrupted panoramic outdoor living.")}
              </p>
            </div>
            <div style="background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.25);border-radius:12px;padding:24px;text-align:center;">
              <div style="margin-bottom:12px;color:#8b5cf6;display:flex;justify-content:center;">${s("construction",44)}</div>
              <h4 style="color:#f8fafc;margin:0 0 6px;">4.20m Column-Free Overhang</h4>
              <p style="color:#94a3b8;font-size:12px;margin:0;">SBC 304 Reinforced Concrete Engineering Verification</p>
            </div>
          </div>
        `},{number:6,title:e("السيناريوهات الليلية وتصميم الإنارة","Nightscape & Lighting Symphony"),subtitle:e("درجات حرارة لونية دافئة (2700K - 3000K) مع إنارة جدارية مخفية","Warm 2700K-3000K indirect wash lighting emphasizing facade depth"),theme:"#070a0f",accent:"#f43f5e",html:`
          <div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:clamp(16px, 4vw, 40px);box-sizing:border-box;">
            <span style="color:#f43f5e;font-weight:800;font-size:12px;margin-bottom:12px;">Illumination Design</span>
            <h2 style="color:#ffffff;font-size:clamp(20px, 3vw, 30px);font-weight:900;margin:0 0 16px;">${e("الرؤية الليلية وتوزيع الإنارة المعمارية","Architectural Nightscape & Facade Lighting")}</h2>
            <p style="color:#94a3b8;font-size:14px;max-width:620px;line-height:1.7;margin:0 0 24px;">
              ${e("تم تصميم الإنارة المعمارية لتعزيز بروز كتل الحجر والخشب ليلاً بدون أي تلوث ضوئي، مع تخصيص مسارات إنارة أرضية خفية حول المسبح والحدائق العلوية.","Indirect warm linear wash illumination elevates natural textures, while shielded low-glare ground fixtures define evening circulation.")}
            </p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
              <button type="button" class="btn btn-primary" id="ppt-slide-download-btn" style="background:#d24726;border:none;padding:10px 22px;border-radius:8px;font-weight:800;display:inline-flex;align-items:center;gap:6px;">
                ${s("download",14)} ${e("تنزيل العرض التقديمي الكامل (PPTX)","Download Complete Presentation (PPTX)")}
              </button>
            </div>
          </div>
        `}];let d=0;I.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#090d13;color:#f0f6fc;overflow:hidden;user-select:none;">
        <!-- PPT Header -->
        <div style="background:#d24726;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(210,71,38,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d24726;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">P</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${o(i.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft PowerPoint Presentation • ${e("عرض المفهوم المعماري الأولي","Concept Design Presentation Deck")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span id="ppt-slide-counter" style="font-size:12px;font-weight:800;background:rgba(0,0,0,0.25);padding:4px 10px;border-radius:12px;">شريحة 1 / 6</span>
            <button type="button" class="btn btn-sm" id="ppt-download-btn" style="background:#ffffff;color:#d24726;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              ${s("download",13)} ${e("تنزيل PPTX الأصلي","Download PPTX")}
            </button>
          </div>
        </div>

        <!-- Slide Display Viewport with Touch Navigation -->
        <div style="flex:1;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;" id="ppt-touch-wrapper">
          <!-- Slide Canvas -->
          <div id="ppt-slide-canvas-viewport" style="width:100%;height:100%;overflow:hidden;transition:background-color 0.3s ease;">
            <!-- Slide Injected Here -->
          </div>

          <!-- Prev/Next Overlay Buttons (Apple HIG touch friendly >= 48px) -->
          <button type="button" id="ppt-prev-btn" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-size:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;box-shadow:0 8px 24px rgba(0,0,0,0.5);transition:all 0.15s ease;" title="${e("الشريحة السابقة","Previous Slide")}">
            ‹
          </button>
          <button type="button" id="ppt-next-btn" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-size:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;box-shadow:0 8px 24px rgba(0,0,0,0.5);transition:all 0.15s ease;" title="${e("الشريحة التالية","Next Slide")}">
            ›
          </button>
        </div>

        <!-- Bottom Controls & Dots Indicator -->
        <div style="padding:10px 18px;background:rgba(10,14,20,0.95);border-top:1px solid #1e293b;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div id="ppt-slide-dots-container" style="display:flex;align-items:center;gap:6px;">
            <!-- Dots injected dynamically -->
          </div>
          <div style="font-size:11px;color:#94a3b8;">
            ${e("استخدم الأسهم ‹ › أو اسحب الشاشة للتنقل بين الشرائح","Use ‹ › arrows or touch swipe to navigate slides")}
          </div>
        </div>
      </div>
    `,y();const t=()=>{d=(d+1)%l.length,y()},f=()=>{d=(d-1+l.length)%l.length,y()};document.getElementById("ppt-next-btn")?.addEventListener("click",t),document.getElementById("ppt-prev-btn")?.addEventListener("click",f);const v=L=>{(L.key==="ArrowRight"||L.key==="ArrowDown")&&t(),(L.key==="ArrowLeft"||L.key==="ArrowUp")&&f()};window.addEventListener("keydown",v),window.__docPreviewCleanups=window.__docPreviewCleanups||[],window.__docPreviewCleanups.push(()=>window.removeEventListener("keydown",v));const A=document.getElementById("ppt-touch-wrapper");if(A){let L=0;A.addEventListener("touchstart",B=>{L=B.changedTouches[0].screenX},{passive:!0}),A.addEventListener("touchend",B=>{const R=B.changedTouches[0].screenX-L;Math.abs(R)>40&&(R<0?t():f())},{passive:!0})}document.getElementById("ppt-download-btn")?.addEventListener("click",()=>U(i.id));return}if(V){I.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);color:var(--text, #0f172a);overflow:hidden;">
        <!-- Zip Header -->
        <div style="background:#d97706;color:#ffffff;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d97706;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">${s("package",18)}</div>
            <div>
              <div style="font-weight:800;font-size:15px;">${o(i.originalName)}</div>
              <div style="font-size:12px;opacity:0.9;">Archive Deliverable Package • ${m}</div>
            </div>
          </div>
          <button type="button" class="btn btn-sm" id="zip-download-btn" style="background:#ffffff;color:#d97706;border:none;padding:6px 16px;border-radius:6px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
            ${s("download",13)} ${e("تنزيل كامل الحزمة المضغوطة","Download Full Archive")}
          </button>
        </div>

        <!-- Archive Workspace Viewport -->
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;">
          <div style="max-width:540px;">
            <div style="margin-bottom:16px;color:#d97706;display:flex;justify-content:center;">${s("package",48)}</div>
            <h3 style="color:var(--text, #0f172a);font-size:18px;font-weight:800;margin:0 0 8px 0;">${o(i.originalName)}</h3>
            <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${e("ملف أرشيف مضغوط حقيقي معتمد. يحتوي على كامل مخرجات المشروع الهندسية جاهزة للتنزيل وفك الضغط.","Authentic archive deliverable. Ready for direct binary download and local extraction.")}
            </p>
            <button type="button" class="btn btn-primary" id="zip-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#d97706;color:#fff;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
              ${s("download",14)} ${e("تنزيل الحزمة المضغوطة الآن","Download Archive Now")} (${m})
            </button>
          </div>
        </div>
      </div>
    `,document.getElementById("zip-download-btn")?.addEventListener("click",()=>U(i.id)),document.getElementById("zip-cta-download")?.addEventListener("click",()=>U(i.id));return}I.innerHTML=`
    <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;background:var(--surface, #ffffff);">
      <div style="width:80px;height:80px;border-radius:20px;background:${a.bg};color:${a.color};display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:900;margin-bottom:20px;border:2px solid ${a.border};">
        ${a.ext}
      </div>
      <h2 style="font-size:22px;font-weight:900;margin:0 0 8px 0;color:var(--text, #0f172a);">${o(i.originalName)}</h2>
      <p style="color:#64748b;font-size:14px;max-width:480px;line-height:1.6;margin:0 0 24px 0;">
        ${e("هذا المستند المعماري جاهز للتنزيل المباشر أو الفتح عبر التطبيق الهندسي المختص.","This architectural document is ready for direct download or local desktop review.")}
      </p>
      <div style="display:flex;gap:12px;">
        <button type="button" class="btn btn-primary" id="fallback-download-btn" style="padding:10px 24px;border-radius:8px;font-weight:800;display:inline-flex;align-items:center;gap:6px;">
          ${s("download",14)} ${e("تنزيل الملف الآن","Download File")} (${m})
        </button>
      </div>
    </div>
  `,document.getElementById("fallback-download-btn")?.addEventListener("click",()=>U(i.id))}document.getElementById("btn-engine-native")?.addEventListener("click",()=>Y("native")),document.getElementById("btn-engine-drive")?.addEventListener("click",()=>Y("drive")),Y("native")}var Re=$e({openUploadDrawingModal:()=>Ae,renderDocuments:()=>Ce});function Ce(){const r=S.data?.documents||[],i=S.data?.projects||[],p=S.data?.tasks||[],a=(S.searches?.documents||"").trim().toLowerCase(),u=S.docProjectFilter||"all",x=S.docDisciplineFilter||"all",n=S.docStatusFilter||"all",m=S.docSortOrder||"newest",$=S.docViewMode||"grid",h=S.data?.user?.id,T=ve(),M=T||K("review_tasks")||K("approve_tasks")||K("edit_tasks"),z=K("upload_documents")||T,F=new Set(p.filter(c=>!c.deletedAt).map(c=>c.id)),V=new Set(i.filter(c=>!c.deletedAt).map(c=>c.id)),b=r.filter(c=>{if(c.deletedAt||c.projectId&&!V.has(c.projectId)||!c.projectId&&c.taskId&&!F.has(c.taskId)||u!=="all"&&c.projectId!==u||x!=="all"&&ie(c)!==x||n!=="all"&&(c.status||"draft")!==n)return!1;if(a){const P=(c.originalName||c.name||"").toLowerCase(),I=i.find(l=>l.id===c.projectId),ae=(I?.code||"").toLowerCase(),Y=e(I?.nameAr,I?.nameEn||"").toLowerCase(),re=(te(c.originalName)||"").toLowerCase(),se=(ee(c.originalName,c.mimeType).ext||"").toLowerCase();if(!(P.includes(a)||ae.includes(a)||Y.includes(a)||re.includes(a)||se.includes(a)))return!1}return!0});b.sort((c,P)=>m==="oldest"?new Date(c.createdAt||0)-new Date(P.createdAt||0):m==="name"?(c.originalName||"").localeCompare(P.originalName||""):m==="size"?(P.size||0)-(c.size||0):new Date(P.createdAt||0)-new Date(c.createdAt||0));const E=b.reduce((c,P)=>c+(P.size||0),0),k=E>1073741824?(E/1073741824).toFixed(1)+" GB":E>1048576?(E/1048576).toFixed(1)+" MB":Math.round(E/1024)+" KB",H=b.filter(c=>c.status==="approved").length,G=b.filter(c=>c.status==="review"||!c.status).length;return`
    <!-- Header -->
    <div class="page-head">
      <div>
        <p class="eyebrow">${e("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h1>${pe("documents")}</h1>
        <p>${e("إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.","Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.")}</p>
      </div>
      <div class="page-actions">
        ${z?`
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
          <span>${b.length} ${e("مخرج","files")}</span>
          <span style="opacity:0.6;">•</span>
          <span>${k}</span>
        </span>
      </div>
    </div>

    <!-- Quick Stats Metric Pills -->
    <div class="documents-stats-strip" style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
      <div class="mini-badge" style="padding:6px 12px;background:var(--surface);border:1px solid var(--line);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--teal);"></span>
        <span>${e("معتمد للتنفيذ:","Approved:")} <strong>${H}</strong></span>
      </div>
      <div class="mini-badge" style="padding:6px 12px;background:var(--surface);border:1px solid var(--line);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber);"></span>
        <span>${e("قيد المراجعة الفنية:","Under Review:")} <strong>${G}</strong></span>
      </div>
      <div class="mini-badge" style="padding:6px 12px;background:var(--surface);border:1px solid var(--line);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        ${s("folder",12)}
        <span>${e("المشاريع النشطة:","Active Projects:")} <strong>${i.filter(c=>!c.deletedAt).length}</strong></span>
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
            value="${o(S.searches?.documents||"")}" 
            data-search="documents" 
            data-action="search-documents" 
          />
        </div>

        <!-- Project Selector -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${s("building",13)} ${e("المشروع:","Project:")}</span>
          <select data-action="doc-project-filter" class="filter-select select-compact documents-select" style="min-width:160px;">
            <option value="all" ${u==="all"?"selected":""}>${e("— جميع المشاريع —","— All Projects —")}</option>
            ${i.map(c=>`<option value="${o(c.id)}" ${u===c.id?"selected":""}>${o(c.code)} - ${o(e(c.nameAr,c.nameEn))}</option>`).join("")}
          </select>
        </div>

        <!-- Discipline Filter -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${s("layers",13)} ${e("التخصص:","Discipline:")}</span>
          <select data-action="doc-discipline-filter" class="filter-select select-compact documents-select" style="min-width:140px;">
            <option value="all" ${x==="all"?"selected":""}>${e("— كل التخصصات —","— All Disciplines —")}</option>
            <option value="architectural" ${x==="architectural"?"selected":""}>${e("معماري (Architectural)","Architectural")}</option>
            <option value="structural" ${x==="structural"?"selected":""}>${e("إنشائي (Structural)","Structural")}</option>
            <option value="mep" ${x==="mep"?"selected":""}>${e("كهروميكانيكي (MEP)","MEP Systems")}</option>
            <option value="boq" ${x==="boq"?"selected":""}>${e("كميات ومواصفات (BOQ)","BOQ & Specs")}</option>
            <option value="contracts" ${x==="contracts"?"selected":""}>${e("عقود وتراخيص (Contracts)","Contracts & Permits")}</option>
          </select>
        </div>

        <!-- Status Filter -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${s("shield",13)} ${e("الحالة:","Status:")}</span>
          <select data-action="doc-status-filter" class="filter-select select-compact documents-select" style="min-width:130px;">
            <option value="all" ${n==="all"?"selected":""}>${e("— كل الحالات —","— All Statuses —")}</option>
            <option value="approved" ${n==="approved"?"selected":""}>${e("معتمد للتنفيذ","Approved")}</option>
            <option value="review" ${n==="review"?"selected":""}>${e("قيد المراجعة","Under Review")}</option>
            <option value="draft" ${n==="draft"?"selected":""}>${e("مسودة عمل","Draft")}</option>
            <option value="superseded" ${n==="superseded"?"selected":""}>${e("مستبدل بنسخة أحدث","Superseded")}</option>
          </select>
        </div>

        <!-- Sort Order -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${s("clock",13)} ${e("الترتيب:","Sort:")}</span>
          <select data-action="doc-sort-order" class="filter-select select-compact documents-select" style="min-width:130px;">
            <option value="newest" ${m==="newest"?"selected":""}>${e("الأحدث رفعاً","Newest First")}</option>
            <option value="oldest" ${m==="oldest"?"selected":""}>${e("الأقدم رفعاً","Oldest First")}</option>
            <option value="name" ${m==="name"?"selected":""}>${e("الاسم (أ - ي)","Name (A-Z)")}</option>
            <option value="size" ${m==="size"?"selected":""}>${e("الحجم (الأكبر)","Size (Largest)")}</option>
          </select>
        </div>

      </div>

      <!-- View Switcher (Grid vs Table) -->
      <div class="view-toolbar-end documents-toolbar-end" style="display:flex;align-items:center;gap:8px;">
        <div class="doc-view-toggle" style="display:inline-flex;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:3px;gap:2px;">
          <button 
            type="button" 
            class="btn btn-sm ${$==="grid"?"active":""}" 
            data-action="toggle-doc-view" 
            data-view-mode="grid"
            style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:8px;font-weight:700;font-size:12px;border:none;cursor:pointer;transition:all 0.15s;${$==="grid"?"background:var(--teal);color:#fff;box-shadow:0 2px 6px rgba(13,98,105,0.3);":"background:transparent;color:var(--ink-soft);"}"
            title="${e("عرض الشبكة المعمارية","Visual Blueprint Grid")}"
          >
            ${s("grid",14)}
            <span>${e("شبكة","Grid")}</span>
          </button>
          <button 
            type="button" 
            class="btn btn-sm ${$==="table"?"active":""}" 
            data-action="toggle-doc-view" 
            data-view-mode="table"
            style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:8px;font-weight:700;font-size:12px;border:none;cursor:pointer;transition:all 0.15s;${$==="table"?"background:var(--teal);color:#fff;box-shadow:0 2px 6px rgba(13,98,105,0.3);":"background:transparent;color:var(--ink-soft);"}"
            title="${e("عرض الجدول التنفيذي","Engineering Data Table")}"
          >
            ${s("list",14)}
            <span>${e("جدول","Table")}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Active Documents Presentation Mode -->
    ${$==="grid"?Le(b,i,p,M,T,h):Ie(b,i,p,M,T,h)}
  `}function Le(r,i,p,a,u,x){return r.length?`
    <div class="documents-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(295px, 1fr));gap:16px;margin-top:14px;">
      ${r.map(n=>{const m=i.find(k=>k.id===n.projectId),$=p.find(k=>k.id===n.taskId),h=ee(n.originalName,n.mimeType),T=te(n.originalName)||"V1",M=ie(n),z=fe(M),F=n.size>1048576?(n.size/1048576).toFixed(1)+" MB":Math.round((n.size||0)/1024)+" KB",V=u||K("delete_documents")||n.uploaderId===x,b=J(n),E=oe(n);return`
          <div class="doc-blueprint-card" data-doc-id="${o(n.id)}" style="background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 4px 16px rgba(0,0,0,0.03);transition:transform 0.2s cubic-bezier(0.16,1,0.3,1),box-shadow 0.2s cubic-bezier(0.16,1,0.3,1),border-color 0.2s;">
            
            <!-- Blueprint Thumbnail Banner -->
            <div class="doc-card-banner" data-action="preview-doc" data-doc-id="${o(n.id)}" style="height:148px;position:relative;background:var(--surface-soft);overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none;border-bottom:1px solid var(--line);">
              ${h.isImg&&b?`
                <img 
                  src="${o(b)}" 
                  alt="${o(n.originalName)}" 
                  loading="lazy" 
                  decoding="async" 
                  style="width:100%;height:100%;object-fit:cover;transition:transform 0.3s ease;" 
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
                />
                <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;flex-direction:column;gap:8px;">
                  <span style="background:${h.bg};color:${h.color};border:1px solid ${h.border};font-size:12px;font-weight:900;padding:6px 14px;border-radius:8px;">${h.ext}</span>
                </div>
              `:`
                <!-- Architectural Blueprint Vector Grid Backdrop -->
                <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(13,98,105,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,98,105,0.05) 1px, transparent 1px);background-size:14px 14px;pointer-events:none;"></div>
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;z-index:2;">
                  <span style="background:${h.bg};color:${h.color};border:1px solid ${h.border};font-size:13px;font-weight:900;padding:6px 16px;border-radius:8px;letter-spacing:0.8px;box-shadow:0 4px 12px rgba(0,0,0,0.04);">
                    ${h.ext}
                  </span>
                  <span style="font-size:11px;font-weight:700;color:var(--muted);">${h.label}</span>
                </div>
              `}

              <!-- Top Floating Badges (Discipline & Version) -->
              <div style="position:absolute;top:10px;left:10px;right:10px;display:flex;align-items:center;justify-content:space-between;pointer-events:none;z-index:3;">
                <span style="background:${z.bg};color:${z.color};border:1px solid ${z.border};font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);">
                  ${e(z.labelAr,z.labelEn)}
                </span>
                <span class="version-badge" style="background:rgba(15,23,42,0.78);color:#ffffff;border:1px solid rgba(255,255,255,0.15);font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);">
                  ${T}
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
                  data-doc-id="${o(n.id)}" 
                  style="margin:0;font-size:13.5px;font-weight:800;color:var(--ink);cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;" 
                  title="${o(n.originalName)}"
                >
                  ${o(n.originalName)}
                </h4>
                <div style="display:flex;align-items:center;gap:6px;margin-top:3px;font-size:11px;color:var(--muted);">
                  <span>${F}</span>
                  <span>•</span>
                  <span>${be(n.createdAt,!0)}</span>
                </div>
              </div>

              <!-- Project & Task Attribution Tags -->
              <div style="display:flex;flex-direction:column;gap:5px;font-size:11.5px;">
                <div style="display:flex;align-items:center;gap:6px;color:var(--ink-soft);">
                  ${s("building",12)}
                  ${m?`
                    <span 
                      data-action="open-project" 
                      data-project-id="${o(m.id)}" 
                      style="font-weight:700;color:var(--teal);cursor:pointer;text-decoration:none;"
                    >
                      ${o(m.code)} - ${o(e(m.nameAr,m.nameEn))}
                    </span>
                  `:'<span style="color:var(--muted);">—</span>'}
                </div>

                <div style="display:flex;align-items:center;gap:6px;color:var(--muted);">
                  ${s("checklist",12)}
                  ${$?`
                    <span 
                      data-action="open-task" 
                      data-task-id="${o($.id)}" 
                      style="cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink-soft);"
                    >
                      ${o(e($.titleAr,$.titleEn))}
                    </span>
                  `:`<span>${e("مخطط عام للمشروع","General Project Drawing")}</span>`}
                </div>
              </div>

              <!-- Approval Status Selector / Badge -->
              <div style="margin-top:auto;padding-top:6px;">
                ${a?`
                  <select 
                    class="select-compact doc-status-select" 
                    data-action="change-doc-status" 
                    data-doc-id="${o(n.id)}" 
                    style="width:100%;font-size:11.5px;font-weight:700;padding:5px 10px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;"
                  >
                    <option value="draft" ${n.status==="draft"?"selected":""}>${e("مسودة عمل (Draft)","Draft")}</option>
                    <option value="review" ${n.status==="review"?"selected":""}>${e("قيد المراجعة الفنية (Under Review)","Under Review")}</option>
                    <option value="approved" ${n.status==="approved"?"selected":""}>${e("معتمد للتنفيذ (Approved)","Approved")}</option>
                    <option value="superseded" ${n.status==="superseded"?"selected":""}>${e("مستبدل بنسخة أحدث (Superseded)","Superseded")}</option>
                  </select>
                `:`
                  <span class="status-badge ${o(n.status||"draft")}" style="font-size:11px;display:inline-block;padding:3px 8px;border-radius:6px;">
                    ${o(ce(n.status||"draft"))}
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
                  data-doc-id="${o(n.id)}" 
                  style="padding:4px 8px;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px;color:var(--teal);"
                  title="${e("معاينة المخطط في المشغل المدمج","Preview Drawing")}"
                >
                  ${s("eye",13)}
                  <span>${e("معاينة","Preview")}</span>
                </button>

                <a 
                  href="${o(E)}" 
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
                  data-doc-id="${o(n.id)}" 
                  style="padding:5px;color:var(--blue);" 
                  title="${e("تحميل المخطط مباشرة","Download")}"
                >
                  ${s("download",14)}
                </button>

                ${V?`
                  <button 
                    type="button" 
                    class="btn btn-sm btn-ghost" 
                    data-action="delete-doc" 
                    data-doc-id="${o(n.id)}" 
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
  `:he()}function Ie(r,i,p,a,u,x){return r.length?`
    <div class="panel" style="margin-top:14px;">
      <div class="table-wrap">
        <table class="data-table documents-table">
          <thead>
            <tr>
              <th>${e("المخطط / المخرج الهندسي","Drawing / Deliverable")}</th>
              <th>${pe("projects")}</th>
              <th>${pe("tasks")}</th>
              <th>${e("الإصدار","Revision")}</th>
              <th>${e("التخصص","Discipline")}</th>
              <th>${e("الحالة الهندسية","Status")}</th>
              <th>${e("الحجم","Size")}</th>
              <th>${e("تاريخ الرفع","Upload Date")}</th>
              <th style="text-align:end;">${e("الإجراءات","Actions")}</th>
            </tr>
          </thead>
          <tbody>
            ${r.map(n=>{const m=i.find(E=>E.id===n.projectId),$=p.find(E=>E.id===n.taskId),h=ee(n.originalName,n.mimeType),T=te(n.originalName)||"V1",M=ie(n),z=fe(M),F=n.size>1048576?(n.size/1048576).toFixed(1)+" MB":Math.round((n.size||0)/1024)+" KB",V=u||K("delete_documents")||n.uploaderId===x,b=oe(n);return`
                <tr data-doc-id="${o(n.id)}" class="doc-row">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${o(n.id)}">
                      <span class="file-format-badge" style="background:${h.bg};color:${h.color};border:1px solid ${h.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${h.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${o(n.originalName)}">
                          ${o(n.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${h.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${m?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${o(m.id)}">${o(m.code)}</span>`:"—"}
                  </td>
                  <td>
                    ${$?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${o($.id)}">${o(e($.titleAr,$.titleEn))}</span>`:`<span style="color:var(--muted);font-size:11px;">${e("مخطط عام","General Drawing")}</span>`}
                  </td>
                  <td>
                    <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                      ${T}
                    </span>
                  </td>
                  <td>
                    <span style="background:${z.bg};color:${z.color};border:1px solid ${z.border};font-size:10px;font-weight:800;padding:2px 7px;border-radius:6px;">
                      ${e(z.labelAr,z.labelEn)}
                    </span>
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${a?`
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${o(n.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${n.status==="draft"?"selected":""}>${e("مسودة عمل","Draft")}</option>
                          <option value="review" ${n.status==="review"?"selected":""}>${e("قيد المراجعة","Review")}</option>
                          <option value="approved" ${n.status==="approved"?"selected":""}>${e("معتمد للتنفيذ","Approved")}</option>
                          <option value="superseded" ${n.status==="superseded"?"selected":""}>${e("مستبدل بنسخة أحدث","Superseded")}</option>
                        </select>
                      `:`
                        <span class="status-badge ${o(n.status||"draft")}" style="font-size:11px;">
                          ${o(ce(n.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${F}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${be(n.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${o(n.id)}" style="padding:5px;" title="${e("معاينة","Preview")}">
                        ${s("eye",14)}
                      </button>
                      <a href="${o(b)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" style="padding:5px;color:var(--teal);text-decoration:none;" title="${e("فتح في Google Drive","Open in Google Drive")}">
                        ${s("external",13)}
                      </a>
                      <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${o(n.id)}" style="padding:5px;color:var(--blue);" title="${e("تحميل المخطط","Download")}">
                        ${s("download",14)}
                      </button>
                      ${V?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${o(n.id)}" style="padding:5px;color:var(--red);" title="${e("نقل لسلة المهملات","Move to trash")}">
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
  `:he()}function he(){return`
    <div class="empty" style="padding:60px 20px;background:var(--surface);border:1px dashed var(--line);border-radius:14px;margin-top:16px;text-align:center;">
      <div style="color:var(--teal);margin-bottom:12px;">${s("document",40)}</div>
      <h3 style="margin:0 0 6px;font-size:16px;font-weight:800;color:var(--ink);">${e("لا توجد مخططات أو ملفات مطابقة","No blueprints or documents found")}</h3>
      <p style="margin:0 0 16px;font-size:13px;color:var(--muted);max-width:440px;margin-inline:auto;">
        ${e("لم يتم العثور على أي ملفات تطابق معايير البحث والفلترة المحددة. يمكنك تعديل خيارات التصفية أو رفع مخرج هندسي جديد.","No deliverables match the specified filters. Try adjusting your search or upload a new engineering drawing.")}
      </p>
      ${K("upload_documents")||ve()?`
        <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;">
          ${s("upload",14)}
          <span>${e("رفع مخطط جديد الآن","Upload New Drawing")}</span>
        </button>
      `:""}
    </div>
  `}function Ae(r=null){const i=S.data?.projects||[],p=r||i[0]?.id||"",a=S.data?.tasks?.filter(n=>n.projectId===p&&!n.deletedAt)||[],u=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${e("المشروع المستهدف *","Target Project *")}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${i.map(n=>`<option value="${o(n.id)}" ${n.id===p?"selected":""}>${o(n.code)} - ${o(e(n.nameAr,n.nameEn))}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${e("المهمة الهندسية (اختياري)","Engineering Task (Optional)")}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${e("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>
            ${a.map(n=>`<option value="${o(n.id)}">${o(e(n.titleAr,n.titleEn))}</option>`).join("")}
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
  `,x=document.getElementById("modal-root");if(x){x.innerHTML=ke(e("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),e("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),u,"upload-drawing","modal-lg");const n=document.getElementById("drawing-upload-project"),m=document.getElementById("drawing-upload-task");n&&m&&n.addEventListener("change",()=>{const b=n.value,E=S.data?.tasks?.filter(k=>k.projectId===b&&!k.deletedAt)||[];m.innerHTML=`<option value="">${e("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+E.map(k=>`<option value="${o(k.id)}">${o(e(k.titleAr,k.titleEn))}</option>`).join("")});const $=document.getElementById("drawing-dropzone"),h=document.getElementById("drawing-file-input"),T=document.getElementById("drawing-selected-files-list"),M=document.getElementById("start-drawing-upload-btn");let z=[];const F=()=>{if(!z.length){T.innerHTML="",M.disabled=!0;return}M.disabled=!1,T.innerHTML=z.map((b,E)=>{const k=ee(b.name,b.type),H=b.size>1048576?(b.size/1048576).toFixed(1)+" MB":Math.round(b.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${k.bg};color:${k.color};border:1px solid ${k.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${k.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${o(b.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${H})</span>
            </div>
            <button type="button" data-file-remove="${E}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),T.querySelectorAll("[data-file-remove]").forEach(b=>{b.addEventListener("click",()=>{const E=parseInt(b.dataset.fileRemove,10);z.splice(E,1),F()})})};$&&h&&($.addEventListener("click",()=>h.click()),h.addEventListener("change",()=>{h.files?.length&&(z=Array.from(h.files),F())}),$.addEventListener("dragover",b=>{b.preventDefault(),$.style.borderColor="var(--teal)"}),$.addEventListener("dragleave",()=>{$.style.borderColor="var(--line)"}),$.addEventListener("drop",b=>{b.preventDefault(),$.style.borderColor="var(--line)",b.dataTransfer?.files?.length&&(z=Array.from(b.dataTransfer.files),F())}));const V=document.getElementById("upload-drawing-form");V&&V.addEventListener("submit",async b=>{if(b.preventDefault(),!z.length)return;const E=n.value,k=m.value||null,H=document.getElementById("drawing-upload-discipline")?.value||"architectural",G=document.getElementById("drawing-upload-status")?.value||"draft";ze(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:z,projectId:E,taskId:k,discipline:H,status:G})})}}export{oe as a,U as i,Ae as n,De as o,de as r,Te as s,Re as t};
