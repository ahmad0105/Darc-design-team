import{t as he}from"./rolldown-runtime-BQ-_32WO.js";import{$ as de,At as me,Bt as I,It as Be,J as Q,Pt as Re,Q as we,Rt as Y,Z as e,dt as ne,gt as $e,h as pe,jt as xe,mt as s,n as ke,rt as ce,tt as a,ut as ye,xt as ie}from"./core-dragdrop-CjSMdOSc.js";var Oe=he({GDRIVE_ROOT_FOLDER_ID:()=>Ee,GDRIVE_ROOT_FOLDER_URL:()=>se,closeDocumentPreviewModal:()=>le,downloadDocument:()=>U,getDocumentShareableLink:()=>oe,getRealAssetUrl:()=>Z,handleCopyDocLink:()=>ze,openDocumentPreviewModal:()=>je,parseDxfAscii:()=>Ce,registerActiveBlobUrl:()=>Se,revokeAllActiveBlobUrls:()=>Le}),Ee="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH",se=`https://drive.google.com/drive/folders/${Ee}?usp=sharing`;function oe(o){if(pe()||o&&(String(o.id).startsWith("doc_demo")||o.isDemo||String(o.driveFileId||"").startsWith("demo_"))){const r=o?.originalName;return r&&De.has(r)?`/assets/${encodeURIComponent(r)}`:o?.diskFilename&&!o.diskFilename.includes("drive.google.com")?o.diskFilename:"/assets/DARC-VILLA-ARCH-A101_Rev03.pdf"}if(!o)return se;const i=o.driveFileId||o.drive_file_id;if(i&&!String(i).startsWith("demo_")&&String(i).length>=25&&i!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${encodeURIComponent(i)}/view?usp=sharing`;const l=o.diskFilename||o.disk_filename||o.viewLink||o.webViewLink||"";if(l&&l.includes("drive.google.com")){if(l.includes("1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"))return se;if(l.includes("/folders/"))return l;const r=l.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(r&&r[1]&&!r[1].startsWith("demo_")&&r[1].length>=25&&r[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${r[1]}/view?usp=sharing`}return l&&(l.startsWith("https://")||l.startsWith("http://"))&&!l.includes("localhost")&&!l.includes("127.0.0.1")&&!l.includes("demo_sample")?l:se}var De=new Set(["DARC-VILLA-ARCH-A101_Rev03.pdf","SKYLINE-CW-SECTION-DETAILS-DWG.pdf","RED-SEA-RESORT-MASTERPLAN-APPROVED.pdf","DARC-VILLA-BOQ-BILL-OF-QUANTITIES.xlsx","DARC-PALM-VILLA-TECHNICAL-SPECIFICATIONS.docx","DARC-ARCHITECTURAL-CONCEPT-PRESENTATION.pptx","DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4","PALM_VILLA_MAJLIS_3D_RENDER_4K.jpg","DARC-STRUCTURAL-LAYOUT-V2.dwg"]);function Z(o){if(!o)return"";if(o.blobUrl&&typeof o.blobUrl=="string"&&o.blobUrl.startsWith("blob:"))return o.blobUrl;if(o._blobUrl&&typeof o._blobUrl=="string"&&o._blobUrl.startsWith("blob:"))return o._blobUrl;if(typeof window<"u"&&window.__docBlobCache){const d=window.__docBlobCache.get(o.id)||window.__docBlobCache.get(o.originalName);if(d&&typeof d=="string"&&d.startsWith("blob:"))return d}const i=!!(o.id?.startsWith("doc_demo_")||o.projectId?.startsWith("prj_demo_")||pe()),l=(o.originalName||"").trim();if(i){if(l==="darc-walkthrough.mp4")return"/assets/DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4";if(l&&De.has(l))return`/assets/${encodeURIComponent(l)}`}const r=(o.diskFilename||o.disk_filename||o.url||"").trim();if(r&&(r.startsWith("https://")||r.startsWith("http://")))try{const d=new URL(r);if(["http:","https:"].includes(d.protocol)&&!d.hostname.includes("drive.google.com")&&!d.hostname.includes("docs.google.com"))return r}catch{}if(o.id)return`/api/documents/${encodeURIComponent(o.id)}?stream=1`;const b=l.replace(/[/\\:*?"<>|\x00-\x1f]/g,"_");return b?`/assets/${encodeURIComponent(b)}`:""}async function ze(o,i=null){if(!o)return;const l=oe(o);let r=!1;try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(l),r=!0;else{const b=document.createElement("textarea");b.value=l,b.style.position="fixed",b.style.opacity="0",document.body.appendChild(b),b.select(),r=document.execCommand("copy"),b.remove()}}catch(b){console.warn("[DocViewer] Clipboard writeText failed:",b),window.prompt(e("انسخ رابط Google Drive من هنا:","Copy Google Drive link:"),l),r=!0}if(r){if(i){const d=i.innerHTML;i.innerHTML=`${s("check",14)} <span style="font-size:11px;font-weight:700;">${e("تم النسخ","Copied")}</span>`,i.style.color="var(--mint-strong, #10b981)",i.style.transition="all 0.2s ease",setTimeout(()=>{i.innerHTML=d,i.style.color=""},2200)}const b=pe()||o&&(String(o.id).startsWith("doc_demo")||o.isDemo||String(o.driveFileId||"").startsWith("demo_"));Y(e(b?"تم نسخ رابط المستند بنجاح":"تم نسخ رابط المخرج الهندسي في Google Drive بنجاح",b?"Document link copied successfully":"Google Drive deliverable link copied"))}}async function U(o){if(!o)return;let i=(I.data?.documents||[]).find(r=>r.id===o);if(!i)try{const r=await ke(`/api/documents/${o}`);r&&r.document&&(i=r.document)}catch{}if(!i){Y(e("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}Y(e(`جاري بدء تحميل "${i.originalName}"...`,`Starting download of "${i.originalName}"...`));const l=i.diskFilename||i.disk_filename||"";if(l&&l.includes("drive.google.com")){const r=l.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(r&&r[1]&&!r[1].startsWith("demo_")&&r[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"){const b=`https://drive.google.com/uc?export=download&id=${r[1]}`,d=(i.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),n=document.createElement("a");n.href=b,n.target="_blank",n.rel="noopener noreferrer",n.download=d,document.body.appendChild(n),n.click(),n.remove(),Y(e(`تم بدء تنزيل "${i.originalName}" من Google Drive بنجاح.`,`Downloaded "${i.originalName}" from Google Drive.`));return}}try{let r=null;const b=Z(i);if(b&&!b.startsWith("http://drive.google.com")&&!b.startsWith("https://drive.google.com"))try{const d=await fetch(b);d.ok&&(r=await d.blob())}catch(d){console.warn("[DocViewer] Real asset fetch error:",d)}if(r){const d=URL.createObjectURL(r);Se(d);const n=(i.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),v=document.createElement("a");v.href=d,v.download=n,document.body.appendChild(v),v.click(),v.remove(),setTimeout(()=>URL.revokeObjectURL(d),3e4),Y(e(`تم تنزيل المستند الأصلي "${i.originalName}" بنجاح`,`Downloaded "${i.originalName}" successfully`));return}window.open(`/api/documents/${encodeURIComponent(i.id)}?download=1`,"_blank"),Y(e(`تم بدء تنزيل "${i.originalName}" بنجاح.`,`Downloaded "${i.originalName}" successfully.`))}catch(r){console.error("[DocViewer] Local download creation failed:",r),window.open(`/api/documents/${encodeURIComponent(i.id)}?download=1`,"_blank")}}var be=new Set;function Se(o){o&&typeof o=="string"&&o.startsWith("blob:")&&be.add(o)}function Le(){typeof URL>"u"||typeof URL.revokeObjectURL!="function"||(be.forEach(o=>{try{URL.revokeObjectURL(o)}catch{}}),be.clear())}function le(){const o=document.getElementById("preview-modal-overlay");if(!o)return;const i=o.querySelector("video");if(i)try{i.pause(),i.removeAttribute("src"),i.load()}catch{}o.querySelectorAll("canvas").forEach(l=>{try{l.width=0,l.height=0}catch{}}),o.querySelectorAll("iframe, object").forEach(l=>{try{l.src="about:blank",l.data="about:blank"}catch{}}),Le(),window.__docPreviewKeyHandler&&(window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=null),Array.isArray(window.__docPreviewCleanups)&&(window.__docPreviewCleanups.forEach(l=>{try{l()}catch{}}),window.__docPreviewCleanups=[]),document.body.style.overflow="",o.style.display="none",o.innerHTML=""}function _e(){if(document.getElementById("darc-doc-viewer-responsive-styles"))return;const o=document.createElement("style");o.id="darc-doc-viewer-responsive-styles",o.textContent=`
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
  `,document.head.appendChild(o)}function Ce(o){if(!o||typeof o!="string")return null;const i=o.split(/\r?\n/);if(i.length<4)return null;const l=[],r=new Set;let b=!1,d=null;for(let n=0;n<i.length-1;n+=2){const v=i[n].trim(),x=i[n+1]?.trim()||"",m=parseInt(v,10);if(!isNaN(m))if(m===0){if(x!=="SECTION")if(x==="ENDSEC")b&&d&&l.push(d),d=null,b=!1;else{if(x==="EOF")break;b&&(d&&l.push(d),d={type:x,layer:"0"})}}else m===2&&x==="ENTITIES"?b=!0:b&&d&&(m===8?(d.layer=x,r.add(x)):m===10?d.x1=parseFloat(x):m===20?d.y1=parseFloat(x):m===11?d.x2=parseFloat(x):m===21?d.y2=parseFloat(x):m===40?d.radius=parseFloat(x):m===50?d.startAngle=parseFloat(x):m===51?d.endAngle=parseFloat(x):m===62?d.colorIndex=parseInt(x,10):m===1&&(d.text=x))}return b&&d&&l.push(d),{entities:l,layers:Array.from(r)}}async function je(o){if(!o)return;_e();let i=(I.data?.documents||[]).find(p=>p.id===o);if(!i)try{const p=await ke(`/api/documents/${o}`);p&&(p.id||p.document?.id)&&(i=p.document||p,I.data&&!I.data.documents&&(I.data.documents=[]),I.data?.documents&&I.data.documents.push(i))}catch(p){console.warn("[DocViewer] Failed to fetch doc on demand:",p)}if(!i){Y(e("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}const l=(i.originalName||"").split(".").pop()?.toLowerCase()||"",r=ne(i.originalName,i.mimeType),b=ce(i.originalName)||"V1",d=de(i),n=ye(d),v=i.size>1048576?(i.size/1048576).toFixed(1)+" MB":Math.round((i.size||0)/1024)+" KB",x=l==="pdf"||r.isPdf,m=["dwg","dxf"].includes(l)||r.isCad,j=["rvt","rfa","ifc","skp"].includes(l)||r.isBim,V=["xlsx","xls","csv"].includes(l)||r.isExcel,S=["docx","doc","rtf","odt"].includes(l)||r.isWord,H=["pptx","ppt","key"].includes(l)||r.isPpt,O=["zip","rar","7z","tar"].includes(l)||r.isZip,h=["jpg","jpeg","png","webp","svg","heic"].includes(l)||r.isImg,C=["mp4","webm","mov","m4v"].includes(l)||i.mimeType&&i.mimeType.startsWith("video/"),D=pe()||i&&(String(i.id).startsWith("doc_demo")||i.isDemo),W=oe(i),q=i.driveFileId||i.drive_file_id;let f=null;if(q&&!String(q).startsWith("demo_")&&String(q).length>=20&&q!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")f=`https://drive.google.com/file/d/${encodeURIComponent(q)}/preview`;else{const p=(i.diskFilename||i.disk_filename||i.viewLink||i.webViewLink||i.url||"").match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);p&&p[1]&&!p[1].startsWith("demo_")&&p[1].length>=20&&p[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"&&(f=`https://drive.google.com/file/d/${p[1]}/preview`)}let A=document.getElementById("preview-modal-overlay");A||(A=document.createElement("div"),A.id="preview-modal-overlay",document.body.appendChild(A)),A.innerHTML=`
    <div class="doc-modal-container">
      <!-- Universal Responsive Modal Header -->
      <div class="doc-modal-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line, #e2e8f0);background:var(--surface, #ffffff);flex-wrap:wrap;gap:10px;z-index:20;">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;flex:1;">
          <span style="background:${r.bg};color:${r.color};border:1px solid ${r.border};font-size:11px;font-weight:900;padding:4px 8px;border-radius:6px;flex-shrink:0;">
            ${r.ext}
          </span>
          <div style="min-width:0;flex:1;">
            <h3 style="margin:0;font-size:14px;font-weight:800;color:var(--ink, #0f172a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:clamp(220px, 45vw, 550px);" title="${a(i.originalName)}">
              ${a(i.originalName)}
            </h3>
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;font-size:11px;color:var(--muted, #64748b);flex-wrap:wrap;">
              <span class="version-badge" style="background:rgba(13,98,105,0.08);color:var(--teal, #0d6269);padding:1px 6px;border-radius:4px;font-weight:800;">${b}</span>
              <span>•</span>
              <span style="background:${n.bg};color:${n.color};border:1px solid ${n.border};padding:1px 6px;border-radius:4px;font-weight:800;">${e(n.labelAr,n.labelEn)}</span>
              <span>•</span>
              <span>${v}</span>
              <span>•</span>
              <span class="status-badge ${a(i.status||"approved")}" style="font-size:10px;padding:2px 7px;">${a(me(i.status||"approved"))}</span>
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

          <button type="button" class="btn btn-soft btn-sm" id="modal-copy-link-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--teal, #0d6269);" title="${e(D?"نسخ رابط المستند":"نسخ رابط Google Drive",D?"Copy Document Link":"Copy Drive Link")}">
            ${s("link",14)} <span class="btn-label">${e("نسخ الرابط","Copy Link")}</span>
          </button>
          <a href="${a(W)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;" title="${e(D?"فتح المستند":"فتح في Google Drive",D?"Open Document":"Open in Drive")}">
            ${s("external",13)} <span class="btn-label">${D?e("فتح الملف","Open File"):"Google Drive"}</span>
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
  `,A.style.display="flex",document.body.style.overflow="hidden",window.__docPreviewKeyHandler&&window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=p=>{p.key==="Escape"&&le()},window.addEventListener("keydown",window.__docPreviewKeyHandler),document.getElementById("modal-copy-link-btn")?.addEventListener("click",p=>{ze(i,p.currentTarget)}),document.getElementById("modal-download-btn")?.addEventListener("click",()=>{U(i.id)}),document.getElementById("close-doc-preview-btn")?.addEventListener("click",le),A.onclick=p=>{p.target===A&&le()};const P=document.getElementById("doc-viewer-viewport");if(!P)return;function te(){const p=P.querySelector("video");if(p)try{p.pause(),p.removeAttribute("src"),p.load()}catch{}Array.isArray(window.__docPreviewCleanups)&&(window.__docPreviewCleanups.forEach(g=>{try{g()}catch{}}),window.__docPreviewCleanups=[])}function J(p){const g=document.getElementById("btn-engine-native"),$=document.getElementById("btn-engine-drive");g&&$&&(p==="native"?(g.style.background="var(--brand-teal, #0d6269)",g.style.color="#ffffff",$.style.background="transparent",$.style.color="var(--ink-soft, #475569)"):($.style.background="var(--brand-teal, #0d6269)",$.style.color="#ffffff",g.style.background="transparent",g.style.color="var(--ink-soft, #475569)")),te(),P.innerHTML="",p==="drive"?fe():ge()}function fe(){f?P.innerHTML=`
        <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#1e293b;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #334155;color:#94a3b8;font-size:12px;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;"></span>
              <span style="font-weight:700;color:#f8fafc;">${e("مستعرض Google Drive السحابي الرسمي","Official Google Drive Cloud Viewer")}</span>
            </div>
            <a href="${a(W)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="color:#38bdf8;background:transparent;border:none;cursor:pointer;font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:4px;">
              ${s("external",12)} ${e("فتح في علامة تبويب جديدة","Open in New Tab")}
            </a>
          </div>
          <iframe 
            src="${a(f)}" 
            style="flex:1;width:100%;height:100%;border:none;background:#ffffff;" 
            allow="autoplay; encrypted-media; fullscreen"
            title="Google Drive Preview"
          ></iframe>
        </div>
      `:(P.innerHTML=`
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
              <a href="${a(W)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
                ${s("external",13)} <span>${e("مجلد Google Drive","Google Drive Folder")}</span>
              </a>
            </div>
          </div>
        </div>
      `,document.getElementById("btn-revert-native")?.addEventListener("click",()=>J("native")))}function ge(){if(x){const p=Z(i);P.innerHTML=`
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
            data="${a(p)}#toolbar=1&navpanes=1&scrollbar=1" 
            type="application/pdf"
            style="width:100%;height:100%;border:none;display:block;"
          >
            <iframe 
              id="pdf-native-frame"
              src="${a(p)}#toolbar=1&navpanes=1&scrollbar=1" 
              type="application/pdf"
              style="width:100%;height:100%;border:none;display:block;"
              title="${a(i.originalName)}"
              allow="fullscreen"
            >
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;text-align:center;padding:24px;">
                <p style="margin-bottom:12px;font-size:14px;color:#cbd5e1;">${e("متصفحك يحتاج لفتح مستند PDF في نافذة جديدة أو تنزيله مباشرة.","Your browser requires opening this PDF in a new window or downloading it.")}</p>
                <a href="${a(p)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding:8px 18px;font-weight:700;">
                  ↗ ${e("فتح مستند PDF الأصلي","Open PDF in New Window")}
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    `,document.getElementById("pdf-open-newtab")?.addEventListener("click",()=>{window.open(p,"_blank")}),document.getElementById("pdf-download-btn")?.addEventListener("click",()=>{U(i.id)});return}if(h){let k=function(){u&&(u.style.transform=`translate(${T}px, ${z}px) scale(${g}) rotate(${$}deg)`),B&&(B.textContent=`${Math.round(g*100)}%`)};const p=Z(i);P.innerHTML=`
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
            src="${p}" 
            alt="${a(i.originalName)}" 
            style="max-width:92%;max-height:88%;object-fit:contain;border-radius:8px;box-shadow:0 20px 50px rgba(0,0,0,0.7);transition:transform 0.1s ease;transform-origin:center center;pointer-events:none;" 
          />
        </div>
      </div>
    `;let g=1,$=0,T=0,z=0,y=!1,_=0,t=0;const u=document.getElementById("active-preview-img"),B=document.getElementById("img-zoom-level"),L=document.getElementById("img-pan-viewport");if(document.getElementById("img-zoom-in")?.addEventListener("click",()=>{g=Math.min(5,g+.25),k()}),document.getElementById("img-zoom-out")?.addEventListener("click",()=>{g=Math.max(.4,g-.25),k()}),document.getElementById("img-rotate-btn")?.addEventListener("click",()=>{$=($+90)%360,k()}),document.getElementById("img-reset-btn")?.addEventListener("click",()=>{g=1,$=0,T=0,z=0,k()}),L){L.addEventListener("wheel",N=>{N.preventDefault();const ae=N.deltaY<0?.15:-.15;g=Math.max(.4,Math.min(5,g+ae)),k()},{passive:!1}),L.addEventListener("pointerdown",N=>{y=!0;try{L.setPointerCapture(N.pointerId)}catch{}_=N.clientX-T,t=N.clientY-z,L.style.cursor="grabbing"}),L.addEventListener("pointermove",N=>{y&&(T=N.clientX-_,z=N.clientY-t,k())});const F=()=>{y=!1,L.style.cursor="grab"};L.addEventListener("pointerup",F),L.addEventListener("pointercancel",F),L.addEventListener("dblclick",()=>{g=g===1?2:1,T=0,z=0,k()})}return}if(C){const p=Z(i);P.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#06090e;">
        <!-- Video Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:10;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:900;color:#8b5cf6;background:rgba(139,92,246,0.15);padding:3px 8px;border-radius:4px;">MP4 / 4K</span>
            <span style="font-weight:700;color:#e2e8f0;">${e("جولة الموقع ونسبة الإنجاز (Site Progress)","Walkthrough Video")}</span>
            <span style="color:#64748b;">•</span>
            <span style="color:#94a3b8;">${v}</span>
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
            src="${a(p)}"
          >
            <source src="${a(p)}" type="video/mp4" />
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
    `;const g=document.getElementById("darc-main-video-player");g&&(document.querySelectorAll(".video-jump-btn").forEach($=>{$.addEventListener("click",()=>{const T=parseFloat($.dataset.sec||"0");g.currentTime=T,g.play().catch(()=>{})})}),document.getElementById("video-playback-rate")?.addEventListener("change",$=>{g.playbackRate=parseFloat($.target.value||"1")}),document.getElementById("video-pip-btn")?.addEventListener("click",async()=>{try{document.pictureInPictureElement?await document.exitPictureInPicture():g.requestPictureInPicture&&await g.requestPictureInPicture()}catch{}})),document.getElementById("video-download-btn")?.addEventListener("click",()=>U(i.id));return}if(m||j){let p=null;const g=Z(i),$={WALLS:"#4ade80",COLUMNS:"#f87171",AXES:"#38bdf8",DIMS:"#f472b6",DOORS:"#facc15",WINDOWS:"#60a5fa"},T=`
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
    `;P.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#0c1015;user-select:none;">
        <!-- CAD Inspection Top Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(16,20,24,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:20;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-weight:900;color:#0284c7;background:rgba(2,132,199,0.15);padding:3px 8px;border-radius:4px;display:inline-flex;align-items:center;gap:4px;">
              ${s("compass",13)} <span>CAD 2D</span>
            </span>
            <span style="font-weight:700;color:#f8fafc;">${a(i.originalName)}</span>
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
        <div class="cad-layer-bar touch-scroll" style="padding:6px 16px;background:rgba(12,16,21,0.9);border-bottom:1px solid #1e293b;display:flex;align-items:center;gap:12px;font-size:11px;color:#94a3b8;overflow-x:auto;">
          <span style="font-weight:700;color:#cbd5e1;">${e("الطبقات:","Layers:")}</span>
          ${T}
        </div>

        <!-- Interactive 2D Vector CAD Canvas -->
        <div id="cad-canvas-box" style="flex:1;width:100%;height:100%;position:relative;overflow:hidden;cursor:crosshair;touch-action:none;">
          <canvas id="cad-canvas" style="display:block;width:100%;height:100%;"></canvas>
        </div>
      </div>
    `;const z=document.getElementById("cad-canvas"),y=document.getElementById("cad-canvas-box"),_=document.getElementById("cad-coords");if(z&&y){let ue=function(){const w=Math.min(window.devicePixelRatio||1,2);z.width=y.clientWidth*w,z.height=y.clientHeight*w,X()},X=function(){if(!t)return;const w=Math.min(window.devicePixelRatio||1,2),R=z.width/w,K=z.height/w;t.save(),t.scale(w,w),t.clearRect(0,0,R,K),t.fillStyle="#0b1016",t.fillRect(0,0,R,K),t.translate(R/2+B,K/2+L),t.scale(u,u),t.lineWidth=1/u,t.strokeStyle="rgba(255, 255, 255, 0.04)";for(let c=-400;c<=400;c+=20)t.beginPath(),t.moveTo(c,-300),t.lineTo(c,300),t.stroke();for(let c=-300;c<=300;c+=20)t.beginPath(),t.moveTo(-400,c),t.lineTo(400,c),t.stroke();t.strokeStyle="rgba(2, 132, 199, 0.12)";for(let c=-400;c<=400;c+=100)t.beginPath(),t.moveTo(c,-300),t.lineTo(c,300),t.stroke();for(let c=-300;c<=300;c+=100)t.beginPath(),t.moveTo(-400,c),t.lineTo(400,c),t.stroke();if(p&&p.entities&&p.entities.length>0){const c=new Set;P.querySelectorAll(".cad-layer-chk:checked").forEach(E=>c.add(E.dataset.cadLayer)),p.entities.forEach(E=>{if(!c.has(E.layer))return;const ee=$[E.layer.toUpperCase()]||"#38bdf8";if(E.type==="LINE")t.beginPath(),t.moveTo(E.x1*20,-E.y1*20),t.lineTo(E.x2*20,-E.y2*20),t.strokeStyle=ee,t.lineWidth=Math.max(1,2.5/u),t.stroke();else if(E.type==="POINT"){t.fillStyle=ee,t.strokeStyle="#ffffff",t.lineWidth=1/u;const G=Math.max(6,12/u);t.fillRect(E.x1*20-G/2,-E.y1*20-G/2,G,G),t.strokeRect(E.x1*20-G/2,-E.y1*20-G/2,G,G)}else E.type==="CIRCLE"&&(t.beginPath(),t.arc(E.x1*20,-E.y1*20,(E.radius||1)*20,0,Math.PI*2),t.strokeStyle=ee,t.lineWidth=Math.max(1,2/u),t.stroke())}),t.restore();return}const M=[{label:"1",x:-240},{label:"2",x:-120},{label:"3",x:0},{label:"4",x:120},{label:"5",x:240}],re=[{label:"A",y:-160},{label:"B",y:-60},{label:"C",y:60},{label:"D",y:160}];if(ae?.checked&&(t.strokeStyle="rgba(56, 189, 248, 0.55)",t.setLineDash([8/u,4/u,2/u,4/u]),t.lineWidth=1.2/u,M.forEach(c=>{t.beginPath(),t.moveTo(c.x,-210),t.lineTo(c.x,210),t.stroke(),t.setLineDash([]),t.fillStyle="#0284c7",t.beginPath(),t.arc(c.x,-225,12,0,Math.PI*2),t.arc(c.x,225,12,0,Math.PI*2),t.fill(),t.fillStyle="#ffffff",t.font="bold 11px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(c.label,c.x,-225),t.fillText(c.label,c.x,225),t.setLineDash([8/u,4/u,2/u,4/u])}),re.forEach(c=>{t.beginPath(),t.moveTo(-290,c.y),t.lineTo(290,c.y),t.stroke(),t.setLineDash([]),t.fillStyle="#0284c7",t.beginPath(),t.arc(-305,c.y,12,0,Math.PI*2),t.arc(305,c.y,12,0,Math.PI*2),t.fill(),t.fillStyle="#ffffff",t.font="bold 11px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(c.label,-305,c.y),t.fillText(c.label,305,c.y),t.setLineDash([8/u,4/u,2/u,4/u])}),t.setLineDash([])),Pe?.checked&&(t.strokeStyle="#facc15",t.lineWidth=2.5/u,t.strokeRect(-240,-160,480,320),t.strokeRect(-120,-160,240,100),t.strokeRect(-240,60,240,100),t.strokeStyle="#38bdf8",t.strokeRect(120,60,140,100)),Ie?.checked&&(t.fillStyle="#4ade80",t.strokeStyle="#ffffff",t.lineWidth=1/u,M.forEach(c=>{re.forEach(E=>{t.fillRect(c.x-9,E.y-9,18,18),t.strokeRect(c.x-9,E.y-9,18,18),t.beginPath(),t.moveTo(c.x-9,E.y-9),t.lineTo(c.x+9,E.y+9),t.stroke()})})),Te?.checked){t.strokeStyle="#f472b6",t.fillStyle="#f472b6",t.lineWidth=1.2/u,t.font="bold 10px monospace",t.textAlign="center";for(let c=0;c<M.length-1;c++){const E=M[c].x,ee=M[c+1].x,G=(E+ee)/2;t.beginPath(),t.moveTo(E,-190),t.lineTo(ee,-190),t.stroke(),t.fillText("6.00m",G,-196)}}t.restore()};const t=z.getContext("2d");let u=1,B=0,L=0,k=!1,F=0,N=0;const ae=document.getElementById("layer-axes"),Ie=document.getElementById("layer-columns"),Pe=document.getElementById("layer-walls"),Te=document.getElementById("layer-dims");g&&typeof window<"u"&&window.fetch&&fetch(g).then(w=>w.ok?w.text():"").then(w=>{if(w&&(w.includes("SECTION")||w.includes("ENTITIES"))){const R=Ce(w);if(R&&R.layers&&R.layers.length>0){p=R;const K=P.querySelector(".cad-layer-bar");K&&(K.innerHTML=`<span style="font-weight:700;color:#cbd5e1;">${e("الطبقات:","Layers:")}</span>`+R.layers.map((M,re)=>`
                        <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:${$[M.toUpperCase()]||`hsl(${re*75%360}, 85%, 65%)`};font-weight:700;">
                          <input type="checkbox" class="cad-layer-chk" data-cad-layer="${a(M)}" checked style="cursor:pointer;" /> ${a(M)}
                        </label>
                      `).join(""),K.querySelectorAll(".cad-layer-chk").forEach(M=>M.addEventListener("change",X))),X()}}}).catch(()=>{}),window.addEventListener("resize",ue),window.__docPreviewCleanups=window.__docPreviewCleanups||[],window.__docPreviewCleanups.push(()=>window.removeEventListener("resize",ue)),setTimeout(ue,50),P.querySelectorAll(".cad-layer-chk, #layer-axes, #layer-columns, #layer-walls, #layer-dims").forEach(w=>{w?.addEventListener("change",X)}),document.getElementById("cad-zoom-in")?.addEventListener("click",()=>{u=Math.min(4,u*1.25),X()}),document.getElementById("cad-zoom-out")?.addEventListener("click",()=>{u=Math.max(.3,u*.8),X()}),document.getElementById("cad-reset")?.addEventListener("click",()=>{u=1,B=0,L=0,X()}),y.addEventListener("wheel",w=>{w.preventDefault();const R=w.deltaY<0?1.15:.87;u=Math.max(.3,Math.min(4,u*R)),X()},{passive:!1}),y.addEventListener("pointerdown",w=>{k=!0;try{y.setPointerCapture(w.pointerId)}catch{}F=w.clientX-B,N=w.clientY-L,y.style.cursor="grabbing"}),y.addEventListener("pointermove",w=>{const R=y.getBoundingClientRect(),K=((w.clientX-R.left-R.width/2-B)/u/20).toFixed(2),M=((w.clientY-R.top-R.height/2-L)/u/20).toFixed(2);_&&(_.textContent=`X: ${K}m | Y: ${M}m`),k&&(B=w.clientX-F,L=w.clientY-N,X())});const ve=()=>{k=!1,y.style.cursor="crosshair"};y.addEventListener("pointerup",ve),y.addEventListener("pointercancel",ve)}document.getElementById("cad-download-btn")?.addEventListener("click",()=>U(i.id));return}if(V){let T=function(){const z=p[g],y=$.toLowerCase().trim(),_=z.rows.filter(k=>y?k.code.toLowerCase().includes(y)||k.desc.toLowerCase().includes(y)||k.unit.toLowerCase().includes(y):!0),t=_.reduce((k,F)=>k+F.total,0),u=document.getElementById("excel-interactive-table-body"),B=document.getElementById("excel-sheet-subtotal"),L=document.getElementById("excel-filtered-count");L&&(L.textContent=`${_.length} ${e("بند","items")}`),B&&(B.textContent=`${t.toLocaleString()} ${e("ر.س","SAR")}`),u&&(u.innerHTML=_.map(k=>`
          <tr style="border-bottom:1px solid var(--line, #e2e8f0);transition:background 0.15s ease;">
            <td style="padding:10px 14px;font-weight:800;font-family:monospace;color:var(--brand-teal, #0d6269);white-space:nowrap;">${a(k.code)}</td>
            <td style="padding:10px 14px;color:var(--ink, #0f172a);font-weight:600;min-width:240px;line-height:1.5;">${a(k.desc)}</td>
            <td style="padding:10px 14px;text-align:center;color:var(--ink-soft, #475569);font-weight:700;">${a(k.unit)}</td>
            <td style="padding:10px 14px;text-align:center;font-weight:800;font-variant-numeric:tabular-nums;">${k.qty.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:end;font-weight:700;font-variant-numeric:tabular-nums;">${k.rate.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:end;font-weight:900;color:#107c41;font-variant-numeric:tabular-nums;">${k.total.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:center;">
              <span class="status-badge approved" style="font-size:10px;padding:2px 8px;font-weight:800;display:inline-flex;align-items:center;gap:4px;">${s("check",11)} ${e("معتمد","Approved")}</span>
            </td>
          </tr>
        `).join(""))};const p=[{id:"structural",title:e("أعمال الهيكل الإنشائي والعظم","Structural & Concrete Works"),rows:[{code:"01.01",desc:e("حفر وتجهيز الموقع وترحيل المخلفات لعمق التأسيس","Excavation & site prep to foundation depth"),unit:"م3",qty:1200,rate:45,total:54e3,status:"approved"},{code:"01.02",desc:e("خرسانة عادية للنظافة C20 سمك 10سم أسفل القواعد","Plain blinding concrete C20 (100mm) under footings"),unit:"م3",qty:180,rate:280,total:50400,status:"approved"},{code:"01.03",desc:e("خرسانة مسلحة للقواعد والرقاب C35 مقاوم للأملاح والكلوريدات","Reinforced concrete C35 SRC for footings and column necks"),unit:"م3",qty:420,rate:390,total:163800,status:"approved"},{code:"01.04",desc:e("حديد تسليح عالي المقاومة مشوه Grade 60 (ASTM A615)","Deformed high-strength rebar Grade 60 (ASTM A615)"),unit:"طن",qty:48,rate:3250,total:156e3,status:"approved"},{code:"01.05",desc:e("خرسانة مسلحة للأعمدة والجدران الاستنادية C40","Reinforced concrete C40 for columns and retaining walls"),unit:"م3",qty:260,rate:420,total:109200,status:"approved"},{code:"01.06",desc:e("عوازل مائية للقواعد ورقاب الأعمدة دهان بيتوميني وممبرين 4مم","Waterproofing bituminous primer + 4mm modified bitumen membrane"),unit:"م2",qty:850,rate:65,total:55250,status:"approved"},{code:"01.07",desc:e("أسقف خرسانية هوردي ولاكمرية Flat Slab مع كمرات ساقطة","Hollow-block and flat slab concrete with drop beams"),unit:"م3",qty:520,rate:410,total:213200,status:"approved"}]},{id:"finishes",title:e("التشطيبات المعمارية الفاخرة","Architectural Finishes"),rows:[{code:"02.01",desc:e("تكسيات حجر ترافنتينو إيطالي نخب أول للواجهات الخارجية","Italian Travertine stone cladding for exterior facades"),unit:"م2",qty:640,rate:480,total:307200,status:"approved"},{code:"02.02",desc:e("واجهات زجاجية مزدوجة معزولة حرارياً كيرتن وول قطاع Schüco","Double-glazed thermally broken curtain walls (Schüco profile)"),unit:"م2",qty:220,rate:1150,total:253e3,status:"approved"},{code:"02.03",desc:e("أرضيات رخام ستاتوريو إيطالي للمجالس والصالات الرئيسية","Statuario Italian marble flooring for main majlis & halls"),unit:"م2",qty:380,rate:620,total:235600,status:"approved"},{code:"02.04",desc:e("أسقف معلقة جبسية مقاومة للرطوبة مع مسارات إنارة مغناطيسية","Moisture-resistant gypsum ceilings with magnetic track lighting"),unit:"م2",qty:580,rate:195,total:113100,status:"approved"},{code:"02.05",desc:e("أبواب خشب جوز طبيعي بارتفاع 3.20م مع أقفال ذكية وكوالين خفية","Natural walnut flush doors (3.2m height) with concealed hinges"),unit:"عدد",qty:18,rate:4800,total:86400,status:"approved"},{code:"02.06",desc:e("دهانات داخلية ميكرو سمنت ديكوري فاخر للممرات والصالات","Luxury decorative microcement internal wall finishes"),unit:"م2",qty:1200,rate:85,total:102e3,status:"approved"}]},{id:"mep",title:e("الأنظمة الكهروميكانيكية والتكييف","MEP & HVAC Systems"),rows:[{code:"03.01",desc:e("نظام تكييف مركزي مخفي VRF إنفرتر مع تحكم ذكي غرفي","Inverter VRF central concealed AC system with smart zone thermostats"),unit:"نظام",qty:1,rate:28e4,total:28e4,status:"approved"},{code:"03.02",desc:e("شبكة التغذية والصرف الصحي أنابيب بولي بروبلين ألماني عازل للصوت","Acoustic PPR plumbing & drainage networks with booster pumps"),unit:"مقطوعية",qty:1,rate:95e3,total:95e3,status:"approved"},{code:"03.03",desc:e("نظام سمارت هوم للتحكم بالإنارة والتكييف والستائر بروتوكول KNX","KNX Smart Home automation for lighting, climate and shading"),unit:"نظام",qty:1,rate:145e3,total:145e3,status:"approved"},{code:"03.04",desc:e("لوحات التوزيع الكهربائية والقواطع الذكية شنايدر إلكتريك","Schneider Electric main electrical distribution boards & RCBOs"),unit:"لوحة",qty:6,rate:14e3,total:84e3,status:"approved"},{code:"03.05",desc:e("أنظمة إنذار ومكافحة الحريق وكواشف الدخان المتطورة","Advanced addressable fire alarm, smoke detectors & clean agent extinguishers"),unit:"نظام",qty:1,rate:48e3,total:48e3,status:"approved"}]}];let g=0,$="";P.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);overflow:hidden;">
        <!-- Excel Green Header -->
        <div style="background:#107c41;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 8px rgba(16,124,65,0.25);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#107c41;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">X</div>
            <div>
              <div style="font-weight:800;font-size:14px;letter-spacing:-0.2px;">${a(i.originalName)}</div>
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
            ${p.map((z,y)=>`
              <button type="button" class="excel-sheet-tab-btn" data-sheet-idx="${y}" style="padding:6px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid ${y===0?"#107c41":"var(--line, #e2e8f0)"};background:${y===0?"#107c41":"var(--surface, #ffffff)"};color:${y===0?"#ffffff":"var(--ink, #0f172a)"};white-space:nowrap;transition:all 0.15s ease;">
                ${a(z.title)}
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
    `,T(),document.querySelectorAll(".excel-sheet-tab-btn").forEach(z=>{z.addEventListener("click",()=>{g=parseInt(z.dataset.sheetIdx,10)||0,document.querySelectorAll(".excel-sheet-tab-btn").forEach((y,_)=>{_===g?(y.style.background="#107c41",y.style.borderColor="#107c41",y.style.color="#ffffff"):(y.style.background="var(--surface, #ffffff)",y.style.borderColor="var(--line, #e2e8f0)",y.style.color="var(--ink, #0f172a)")}),T()})}),document.getElementById("excel-live-search")?.addEventListener("input",z=>{$=z.target.value||"",T()}),document.getElementById("excel-print-btn")?.addEventListener("click",()=>window.print()),document.getElementById("excel-direct-download")?.addEventListener("click",()=>U(i.id));return}if(S){P.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#1e242c;overflow:hidden;">
        <!-- Word Header -->
        <div style="background:#2b579a;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(43,87,154,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#2b579a;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">W</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${a(i.originalName)}</div>
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
    `,document.getElementById("word-print-btn")?.addEventListener("click",()=>window.print()),document.getElementById("word-download-btn")?.addEventListener("click",()=>U(i.id));return}if(H){let $=function(){const t=p[g],u=document.getElementById("ppt-slide-canvas-viewport"),B=document.getElementById("ppt-slide-counter"),L=document.getElementById("ppt-slide-dots-container");B&&(B.textContent=`${e("شريحة","Slide")} ${g+1} / ${p.length}`),L&&(L.innerHTML=p.map((k,F)=>`
          <button type="button" class="ppt-dot" data-dot-idx="${F}" style="width:${F===g?"24px":"8px"};height:8px;border-radius:4px;border:none;background:${F===g?"#d24726":"rgba(255,255,255,0.3)"};cursor:pointer;transition:all 0.2s ease;padding:0;" title="${e("انتقال للشريحة","Go to slide")} ${F+1}"></button>
        `).join(""),L.querySelectorAll(".ppt-dot").forEach(k=>{k.addEventListener("click",()=>{g=parseInt(k.dataset.dotIdx,10)||0,$()})})),u&&(u.style.backgroundColor=t.theme,u.innerHTML=t.html,document.getElementById("ppt-slide-download-btn")?.addEventListener("click",()=>U(i.id)))};const p=[{number:1,title:e("فلسفة التصميم والمفهوم المعماري","Design Philosophy & Architectural Concept"),subtitle:e("فيلا النخيل الفاخرة — مخرجات مرحلة المفهوم الأولي Concept Phase","Palm Villa Luxury Residence — Concept Deliverables"),theme:"#090d13",accent:"#d24726",html:`
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
        `}];let g=0;P.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#090d13;color:#f0f6fc;overflow:hidden;user-select:none;">
        <!-- PPT Header -->
        <div style="background:#d24726;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(210,71,38,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d24726;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">P</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${a(i.originalName)}</div>
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
    `,$();const T=()=>{g=(g+1)%p.length,$()},z=()=>{g=(g-1+p.length)%p.length,$()};document.getElementById("ppt-next-btn")?.addEventListener("click",T),document.getElementById("ppt-prev-btn")?.addEventListener("click",z);const y=t=>{(t.key==="ArrowRight"||t.key==="ArrowDown")&&T(),(t.key==="ArrowLeft"||t.key==="ArrowUp")&&z()};window.addEventListener("keydown",y),window.__docPreviewCleanups=window.__docPreviewCleanups||[],window.__docPreviewCleanups.push(()=>window.removeEventListener("keydown",y));const _=document.getElementById("ppt-touch-wrapper");if(_){let t=0;_.addEventListener("touchstart",u=>{t=u.changedTouches[0].screenX},{passive:!0}),_.addEventListener("touchend",u=>{const B=u.changedTouches[0].screenX-t;Math.abs(B)>40&&(B<0?T():z())},{passive:!0})}document.getElementById("ppt-download-btn")?.addEventListener("click",()=>U(i.id));return}if(O){P.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);color:var(--text, #0f172a);overflow:hidden;">
        <!-- Zip Header -->
        <div style="background:#d97706;color:#ffffff;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d97706;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">${s("package",18)}</div>
            <div>
              <div style="font-weight:800;font-size:15px;">${a(i.originalName)}</div>
              <div style="font-size:12px;opacity:0.9;">Archive Deliverable Package • ${v}</div>
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
            <h3 style="color:var(--text, #0f172a);font-size:18px;font-weight:800;margin:0 0 8px 0;">${a(i.originalName)}</h3>
            <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${e("ملف أرشيف مضغوط حقيقي معتمد. يحتوي على كامل مخرجات المشروع الهندسية جاهزة للتنزيل وفك الضغط.","Authentic archive deliverable. Ready for direct binary download and local extraction.")}
            </p>
            <button type="button" class="btn btn-primary" id="zip-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#d97706;color:#fff;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
              ${s("download",14)} ${e("تنزيل الحزمة المضغوطة الآن","Download Archive Now")} (${v})
            </button>
          </div>
        </div>
      </div>
    `,document.getElementById("zip-download-btn")?.addEventListener("click",()=>U(i.id)),document.getElementById("zip-cta-download")?.addEventListener("click",()=>U(i.id));return}P.innerHTML=`
    <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;background:var(--surface, #ffffff);">
      <div style="width:80px;height:80px;border-radius:20px;background:${r.bg};color:${r.color};display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:900;margin-bottom:20px;border:2px solid ${r.border};">
        ${r.ext}
      </div>
      <h2 style="font-size:22px;font-weight:900;margin:0 0 8px 0;color:var(--text, #0f172a);">${a(i.originalName)}</h2>
      <p style="color:#64748b;font-size:14px;max-width:480px;line-height:1.6;margin:0 0 24px 0;">
        ${e("هذا المستند المعماري جاهز للتنزيل المباشر أو الفتح عبر التطبيق الهندسي المختص.","This architectural document is ready for direct download or local desktop review.")}
      </p>
      <div style="display:flex;gap:12px;">
        <button type="button" class="btn btn-primary" id="fallback-download-btn" style="padding:10px 24px;border-radius:8px;font-weight:800;display:inline-flex;align-items:center;gap:6px;">
          ${s("download",14)} ${e("تنزيل الملف الآن","Download File")} (${v})
        </button>
      </div>
    </div>
  `,document.getElementById("fallback-download-btn")?.addEventListener("click",()=>U(i.id))}document.getElementById("btn-engine-native")?.addEventListener("click",()=>J("native")),document.getElementById("btn-engine-drive")?.addEventListener("click",()=>J("drive")),J("native")}var Ge=he({openUploadDrawingModal:()=>Ue,renderDocuments:()=>Me});function Me(){const o=I.data?.documents||[],i=I.data?.projects||[],l=I.data?.tasks||[],r=(I.searches?.documents||"").trim().toLowerCase(),b=I.docProjectFilter||"all",d=I.docDisciplineFilter||"all",n=I.docStatusFilter||"all",v=I.docSortOrder||"newest",x=I.docViewMode||"grid",m=I.data?.user?.id,j=$e(),V=j||Q("review_tasks")||Q("approve_tasks")||Q("edit_tasks"),S=Q("upload_documents")||j,H=new Set(l.filter(f=>!f.deletedAt).map(f=>f.id)),O=new Set(i.filter(f=>!f.deletedAt).map(f=>f.id)),h=o.filter(f=>{if(f.deletedAt||f.projectId&&!O.has(f.projectId)||!f.projectId&&f.taskId&&!H.has(f.taskId)||b!=="all"&&f.projectId!==b||d!=="all"&&de(f)!==d||n!=="all"&&(f.status||"draft")!==n)return!1;if(r){const A=ie(r),P=ie(f.originalName||f.name||""),te=i.find(g=>g.id===f.projectId),J=ie(te?.code||""),fe=ie(e(te?.nameAr,te?.nameEn||"")),ge=ie(ce(f.originalName)||""),p=(ne(f.originalName,f.mimeType).ext||"").toLowerCase();if(!(P.includes(A)||J.includes(A)||fe.includes(A)||ge.includes(A)||p.includes(A)))return!1}return!0});h.sort((f,A)=>v==="oldest"?new Date(f.createdAt||0)-new Date(A.createdAt||0):v==="name"?(f.originalName||"").localeCompare(A.originalName||""):v==="size"?(A.size||0)-(f.size||0):new Date(A.createdAt||0)-new Date(f.createdAt||0));const C=h.reduce((f,A)=>f+(A.size||0),0),D=C>1073741824?(C/1073741824).toFixed(1)+" GB":C>1048576?(C/1048576).toFixed(1)+" MB":Math.round(C/1024)+" KB",W=h.filter(f=>f.status==="approved").length,q=h.filter(f=>f.status==="review"||!f.status).length;return`
    <!-- Header -->
    <div class="page-head">
      <div>
        <p class="eyebrow">${e("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h1>${xe("documents")}</h1>
        <p>${e("إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.","Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.")}</p>
      </div>
      <div class="page-actions">
        ${S?`
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
          <span>${h.length} ${e("مخرج","files")}</span>
          <span style="opacity:0.6;">•</span>
          <span>${D}</span>
        </span>
      </div>
    </div>

    <!-- Quick Stats Metric Pills -->
    <div class="documents-stats-strip" style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
      <div class="mini-badge" style="padding:6px 12px;background:var(--surface);border:1px solid var(--line);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--teal);"></span>
        <span>${e("معتمد للتنفيذ:","Approved:")} <strong>${W}</strong></span>
      </div>
      <div class="mini-badge" style="padding:6px 12px;background:var(--surface);border:1px solid var(--line);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber);"></span>
        <span>${e("قيد المراجعة الفنية:","Under Review:")} <strong>${q}</strong></span>
      </div>
      <div class="mini-badge" style="padding:6px 12px;background:var(--surface);border:1px solid var(--line);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        ${s("folder",12)}
        <span>${e("المشاريع النشطة:","Active Projects:")} <strong>${i.filter(f=>!f.deletedAt).length}</strong></span>
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
            value="${a(I.searches?.documents||"")}" 
            data-search="documents" 
            data-action="search-documents" 
          />
        </div>

        <!-- Project Selector -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${s("building",13)} ${e("المشروع:","Project:")}</span>
          <select data-action="doc-project-filter" class="filter-select select-compact documents-select" style="min-width:160px;">
            <option value="all" ${b==="all"?"selected":""}>${e("— جميع المشاريع —","— All Projects —")}</option>
            ${i.map(f=>`<option value="${a(f.id)}" ${b===f.id?"selected":""}>${a(f.code)} - ${a(e(f.nameAr,f.nameEn))}</option>`).join("")}
          </select>
        </div>

        <!-- Discipline Filter -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${s("layers",13)} ${e("التخصص:","Discipline:")}</span>
          <select data-action="doc-discipline-filter" class="filter-select select-compact documents-select" style="min-width:140px;">
            <option value="all" ${d==="all"?"selected":""}>${e("— كل التخصصات —","— All Disciplines —")}</option>
            <option value="architectural" ${d==="architectural"?"selected":""}>${e("معماري (Architectural)","Architectural")}</option>
            <option value="structural" ${d==="structural"?"selected":""}>${e("إنشائي (Structural)","Structural")}</option>
            <option value="mep" ${d==="mep"?"selected":""}>${e("كهروميكانيكي (MEP)","MEP Systems")}</option>
            <option value="boq" ${d==="boq"?"selected":""}>${e("كميات ومواصفات (BOQ)","BOQ & Specs")}</option>
            <option value="contracts" ${d==="contracts"?"selected":""}>${e("عقود وتراخيص (Contracts)","Contracts & Permits")}</option>
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
            <option value="newest" ${v==="newest"?"selected":""}>${e("الأحدث رفعاً","Newest First")}</option>
            <option value="oldest" ${v==="oldest"?"selected":""}>${e("الأقدم رفعاً","Oldest First")}</option>
            <option value="name" ${v==="name"?"selected":""}>${e("الاسم (أ - ي)","Name (A-Z)")}</option>
            <option value="size" ${v==="size"?"selected":""}>${e("الحجم (الأكبر)","Size (Largest)")}</option>
          </select>
        </div>

      </div>

      <!-- View Switcher (Grid vs Table) -->
      <div class="view-toolbar-end documents-toolbar-end" style="display:flex;align-items:center;gap:8px;">
        <div class="doc-view-toggle" style="display:inline-flex;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:3px;gap:2px;">
          <button 
            type="button" 
            class="btn btn-sm ${x==="grid"?"active":""}" 
            data-action="toggle-doc-view" 
            data-view-mode="grid"
            style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:8px;font-weight:700;font-size:12px;border:none;cursor:pointer;transition:all 0.15s;${x==="grid"?"background:var(--teal);color:#fff;box-shadow:0 2px 6px rgba(13,98,105,0.3);":"background:transparent;color:var(--ink-soft);"}"
            title="${e("عرض الشبكة المعمارية","Visual Blueprint Grid")}"
          >
            ${s("grid",14)}
            <span>${e("شبكة","Grid")}</span>
          </button>
          <button 
            type="button" 
            class="btn btn-sm ${x==="table"?"active":""}" 
            data-action="toggle-doc-view" 
            data-view-mode="table"
            style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:8px;font-weight:700;font-size:12px;border:none;cursor:pointer;transition:all 0.15s;${x==="table"?"background:var(--teal);color:#fff;box-shadow:0 2px 6px rgba(13,98,105,0.3);":"background:transparent;color:var(--ink-soft);"}"
            title="${e("عرض الجدول التنفيذي","Engineering Data Table")}"
          >
            ${s("list",14)}
            <span>${e("جدول","Table")}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Active Documents Presentation Mode -->
    ${x==="grid"?Fe(h,i,l,V,j,m):Ne(h,i,l,V,j,m)}
  `}function Fe(o,i,l,r,b,d){return o.length?`
    <div class="documents-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(295px, 1fr));gap:16px;margin-top:14px;">
      ${o.map(n=>{const v=i.find(D=>D.id===n.projectId),x=l.find(D=>D.id===n.taskId),m=ne(n.originalName,n.mimeType),j=ce(n.originalName)||"V1",V=de(n),S=ye(V),H=n.size>1048576?(n.size/1048576).toFixed(1)+" MB":Math.round((n.size||0)/1024)+" KB",O=b||Q("delete_documents")||n.uploaderId===d,h=Z(n),C=oe(n);return`
          <div class="doc-blueprint-card" data-doc-id="${a(n.id)}" style="background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 4px 16px rgba(0,0,0,0.03);transition:transform 0.2s cubic-bezier(0.16,1,0.3,1),box-shadow 0.2s cubic-bezier(0.16,1,0.3,1),border-color 0.2s;">
            
            <!-- Blueprint Thumbnail Banner -->
            <div class="doc-card-banner" data-action="preview-doc" data-doc-id="${a(n.id)}" style="height:148px;position:relative;background:var(--surface-soft);overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none;border-bottom:1px solid var(--line);">
              ${m.isImg&&h?`
                <img 
                  src="${a(h)}" 
                  alt="${a(n.originalName)}" 
                  loading="lazy" 
                  decoding="async" 
                  style="width:100%;height:100%;object-fit:cover;transition:transform 0.3s ease;" 
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
                />
                <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;flex-direction:column;gap:8px;">
                  <span style="background:${m.bg};color:${m.color};border:1px solid ${m.border};font-size:12px;font-weight:900;padding:6px 14px;border-radius:8px;">${m.ext}</span>
                </div>
              `:`
                <!-- Architectural Blueprint Vector Grid Backdrop -->
                <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(13,98,105,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,98,105,0.05) 1px, transparent 1px);background-size:14px 14px;pointer-events:none;"></div>
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;z-index:2;">
                  <span style="background:${m.bg};color:${m.color};border:1px solid ${m.border};font-size:13px;font-weight:900;padding:6px 16px;border-radius:8px;letter-spacing:0.8px;box-shadow:0 4px 12px rgba(0,0,0,0.04);">
                    ${m.ext}
                  </span>
                  <span style="font-size:11px;font-weight:700;color:var(--muted);">${m.label}</span>
                </div>
              `}

              <!-- Top Floating Badges (Discipline & Version) -->
              <div style="position:absolute;top:10px;left:10px;right:10px;display:flex;align-items:center;justify-content:space-between;pointer-events:none;z-index:3;">
                <span style="background:${S.bg};color:${S.color};border:1px solid ${S.border};font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);">
                  ${e(S.labelAr,S.labelEn)}
                </span>
                <span class="version-badge" style="background:rgba(15,23,42,0.78);color:#ffffff;border:1px solid rgba(255,255,255,0.15);font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);">
                  ${j}
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
                  data-doc-id="${a(n.id)}" 
                  style="margin:0;font-size:13.5px;font-weight:800;color:var(--ink);cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;" 
                  title="${a(n.originalName)}"
                >
                  ${a(n.originalName)}
                </h4>
                <div style="display:flex;align-items:center;gap:6px;margin-top:3px;font-size:11px;color:var(--muted);">
                  <span>${H}</span>
                  <span>•</span>
                  <span>${we(n.createdAt,!0)}</span>
                </div>
              </div>

              <!-- Project & Task Attribution Tags -->
              <div style="display:flex;flex-direction:column;gap:5px;font-size:11.5px;">
                <div style="display:flex;align-items:center;gap:6px;color:var(--ink-soft);">
                  ${s("building",12)}
                  ${v?`
                    <span 
                      data-action="open-project" 
                      data-project-id="${a(v.id)}" 
                      style="font-weight:700;color:var(--teal);cursor:pointer;text-decoration:none;"
                    >
                      ${a(v.code)} - ${a(e(v.nameAr,v.nameEn))}
                    </span>
                  `:'<span style="color:var(--muted);">—</span>'}
                </div>

                <div style="display:flex;align-items:center;gap:6px;color:var(--muted);">
                  ${s("checklist",12)}
                  ${x?`
                    <span 
                      data-action="open-task" 
                      data-task-id="${a(x.id)}" 
                      style="cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink-soft);"
                    >
                      ${a(e(x.titleAr,x.titleEn))}
                    </span>
                  `:`<span>${e("مخطط عام للمشروع","General Project Drawing")}</span>`}
                </div>
              </div>

              <!-- Approval Status Selector / Badge -->
              <div style="margin-top:auto;padding-top:6px;">
                ${r?`
                  <select 
                    class="select-compact doc-status-select" 
                    data-action="change-doc-status" 
                    data-doc-id="${a(n.id)}" 
                    style="width:100%;font-size:11.5px;font-weight:700;padding:5px 10px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;"
                  >
                    <option value="draft" ${n.status==="draft"?"selected":""}>${e("مسودة عمل (Draft)","Draft")}</option>
                    <option value="review" ${n.status==="review"?"selected":""}>${e("قيد المراجعة الفنية (Under Review)","Under Review")}</option>
                    <option value="approved" ${n.status==="approved"?"selected":""}>${e("معتمد للتنفيذ (Approved)","Approved")}</option>
                    <option value="superseded" ${n.status==="superseded"?"selected":""}>${e("مستبدل بنسخة أحدث (Superseded)","Superseded")}</option>
                  </select>
                `:`
                  <span class="status-badge ${a(n.status||"draft")}" style="font-size:11px;display:inline-block;padding:3px 8px;border-radius:6px;">
                    ${a(me(n.status||"draft"))}
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
                  data-doc-id="${a(n.id)}" 
                  style="padding:4px 8px;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px;color:var(--teal);"
                  title="${e("معاينة المخطط في المشغل المدمج","Preview Drawing")}"
                >
                  ${s("eye",13)}
                  <span>${e("معاينة","Preview")}</span>
                </button>

                <a 
                  href="${a(C)}" 
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
                  data-doc-id="${a(n.id)}" 
                  style="padding:5px;color:var(--blue);" 
                  title="${e("تحميل المخطط مباشرة","Download")}"
                >
                  ${s("download",14)}
                </button>

                ${O?`
                  <button 
                    type="button" 
                    class="btn btn-sm btn-ghost" 
                    data-action="delete-doc" 
                    data-doc-id="${a(n.id)}" 
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
  `:Ae()}function Ne(o,i,l,r,b,d){return o.length?`
    <div class="panel" style="margin-top:14px;">
      <div class="table-wrap">
        <table class="data-table documents-table">
          <thead>
            <tr>
              <th>${e("المخطط / المخرج الهندسي","Drawing / Deliverable")}</th>
              <th>${xe("projects")}</th>
              <th>${xe("tasks")}</th>
              <th>${e("الإصدار","Revision")}</th>
              <th>${e("التخصص","Discipline")}</th>
              <th>${e("الحالة الهندسية","Status")}</th>
              <th>${e("الحجم","Size")}</th>
              <th>${e("تاريخ الرفع","Upload Date")}</th>
              <th style="text-align:end;">${e("الإجراءات","Actions")}</th>
            </tr>
          </thead>
          <tbody>
            ${o.map(n=>{const v=i.find(C=>C.id===n.projectId),x=l.find(C=>C.id===n.taskId),m=ne(n.originalName,n.mimeType),j=ce(n.originalName)||"V1",V=de(n),S=ye(V),H=n.size>1048576?(n.size/1048576).toFixed(1)+" MB":Math.round((n.size||0)/1024)+" KB",O=b||Q("delete_documents")||n.uploaderId===d,h=oe(n);return`
                <tr data-doc-id="${a(n.id)}" class="doc-row">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${a(n.id)}">
                      <span class="file-format-badge" style="background:${m.bg};color:${m.color};border:1px solid ${m.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${m.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${a(n.originalName)}">
                          ${a(n.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${m.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${v?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${a(v.id)}">${a(v.code)}</span>`:"—"}
                  </td>
                  <td>
                    ${x?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${a(x.id)}">${a(e(x.titleAr,x.titleEn))}</span>`:`<span style="color:var(--muted);font-size:11px;">${e("مخطط عام","General Drawing")}</span>`}
                  </td>
                  <td>
                    <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                      ${j}
                    </span>
                  </td>
                  <td>
                    <span style="background:${S.bg};color:${S.color};border:1px solid ${S.border};font-size:10px;font-weight:800;padding:2px 7px;border-radius:6px;">
                      ${e(S.labelAr,S.labelEn)}
                    </span>
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${r?`
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${a(n.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${n.status==="draft"?"selected":""}>${e("مسودة عمل","Draft")}</option>
                          <option value="review" ${n.status==="review"?"selected":""}>${e("قيد المراجعة","Review")}</option>
                          <option value="approved" ${n.status==="approved"?"selected":""}>${e("معتمد للتنفيذ","Approved")}</option>
                          <option value="superseded" ${n.status==="superseded"?"selected":""}>${e("مستبدل بنسخة أحدث","Superseded")}</option>
                        </select>
                      `:`
                        <span class="status-badge ${a(n.status||"draft")}" style="font-size:11px;">
                          ${a(me(n.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${H}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${we(n.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${a(n.id)}" style="padding:5px;" title="${e("معاينة","Preview")}">
                        ${s("eye",14)}
                      </button>
                      <a href="${a(h)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" style="padding:5px;color:var(--teal);text-decoration:none;" title="${e("فتح في Google Drive","Open in Google Drive")}">
                        ${s("external",13)}
                      </a>
                      <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${a(n.id)}" style="padding:5px;color:var(--blue);" title="${e("تحميل المخطط","Download")}">
                        ${s("download",14)}
                      </button>
                      ${O?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${a(n.id)}" style="padding:5px;color:var(--red);" title="${e("نقل لسلة المهملات","Move to trash")}">
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
  `:Ae()}function Ae(){return`
    <div class="empty" style="padding:60px 20px;background:var(--surface);border:1px dashed var(--line);border-radius:14px;margin-top:16px;text-align:center;">
      <div style="color:var(--teal);margin-bottom:12px;">${s("document",40)}</div>
      <h3 style="margin:0 0 6px;font-size:16px;font-weight:800;color:var(--ink);">${e("لا توجد مخططات أو ملفات مطابقة","No blueprints or documents found")}</h3>
      <p style="margin:0 0 16px;font-size:13px;color:var(--muted);max-width:440px;margin-inline:auto;">
        ${e("لم يتم العثور على أي ملفات تطابق معايير البحث والفلترة المحددة. يمكنك تعديل خيارات التصفية أو رفع مخرج هندسي جديد.","No deliverables match the specified filters. Try adjusting your search or upload a new engineering drawing.")}
      </p>
      ${Q("upload_documents")||$e()?`
        <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;">
          ${s("upload",14)}
          <span>${e("رفع مخطط جديد الآن","Upload New Drawing")}</span>
        </button>
      `:""}
    </div>
  `}function Ue(o=null){const i=I.data?.projects||[],l=o||i[0]?.id||"",r=I.data?.tasks?.filter(n=>n.projectId===l&&!n.deletedAt)||[],b=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${e("المشروع المستهدف *","Target Project *")}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${i.map(n=>`<option value="${a(n.id)}" ${n.id===l?"selected":""}>${a(n.code)} - ${a(e(n.nameAr,n.nameEn))}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${e("المهمة الهندسية (اختياري)","Engineering Task (Optional)")}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${e("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>
            ${r.map(n=>`<option value="${a(n.id)}">${a(e(n.titleAr,n.titleEn))}</option>`).join("")}
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
  `,d=document.getElementById("modal-root");if(d){d.innerHTML=Be(e("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),e("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),b,"upload-drawing","modal-lg");const n=document.getElementById("drawing-upload-project"),v=document.getElementById("drawing-upload-task");n&&v&&n.addEventListener("change",()=>{const h=n.value,C=I.data?.tasks?.filter(D=>D.projectId===h&&!D.deletedAt)||[];v.innerHTML=`<option value="">${e("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+C.map(D=>`<option value="${a(D.id)}">${a(e(D.titleAr,D.titleEn))}</option>`).join("")});const x=document.getElementById("drawing-dropzone"),m=document.getElementById("drawing-file-input"),j=document.getElementById("drawing-selected-files-list"),V=document.getElementById("start-drawing-upload-btn");let S=[];const H=()=>{if(!S.length){j.innerHTML="",V.disabled=!0;return}V.disabled=!1,j.innerHTML=S.map((h,C)=>{const D=ne(h.name,h.type),W=h.size>1048576?(h.size/1048576).toFixed(1)+" MB":Math.round(h.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${D.bg};color:${D.color};border:1px solid ${D.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${D.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${a(h.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${W})</span>
            </div>
            <button type="button" data-file-remove="${C}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),j.querySelectorAll("[data-file-remove]").forEach(h=>{h.addEventListener("click",()=>{const C=parseInt(h.dataset.fileRemove,10);S.splice(C,1),H()})})};x&&m&&(x.addEventListener("click",()=>m.click()),m.addEventListener("change",()=>{m.files?.length&&(S=Array.from(m.files),H())}),x.addEventListener("dragover",h=>{h.preventDefault(),x.style.borderColor="var(--teal)"}),x.addEventListener("dragleave",()=>{x.style.borderColor="var(--line)"}),x.addEventListener("drop",h=>{h.preventDefault(),x.style.borderColor="var(--line)",h.dataTransfer?.files?.length&&(S=Array.from(h.dataTransfer.files),H())}));const O=document.getElementById("upload-drawing-form");O&&O.addEventListener("submit",async h=>{if(h.preventDefault(),!S.length)return;const C=n.value,D=v.value||null,W=document.getElementById("drawing-upload-discipline")?.value||"architectural",q=document.getElementById("drawing-upload-status")?.value||"draft";Re(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:S,projectId:C,taskId:D,discipline:W,status:q})})}}export{Oe as n,Ge as t};
