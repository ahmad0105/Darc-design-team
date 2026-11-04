import{t as le}from"./rolldown-runtime-BQ-_32WO.js";import{$ as pe,Et as E,F as ce,K as J,L as r,P as e,Z as S,_t as fe,ft as oe,ht as ge,j as X,l as K,n as ne,pt as Y,yt as W,z as ae}from"./core-dragdrop-B8Zn12as.js";var xe="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH",Z=`https://drive.google.com/drive/folders/${xe}?usp=sharing`;function re(o){if(K()||o&&(String(o.id).startsWith("doc_demo")||o.isDemo||String(o.driveFileId||"").startsWith("demo_"))){const n=o?.originalName;return n&&de.has(n)?`/assets/${encodeURIComponent(n)}`:o?.diskFilename&&!o.diskFilename.includes("drive.google.com")?o.diskFilename:"/assets/DARC-VILLA-ARCH-A101_Rev03.pdf"}if(!o)return Z;const i=o.driveFileId||o.drive_file_id;if(i&&!String(i).startsWith("demo_")&&String(i).length>=25&&i!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${encodeURIComponent(i)}/view?usp=sharing`;const c=o.diskFilename||o.disk_filename||o.viewLink||o.webViewLink||"";if(c&&c.includes("drive.google.com")){if(c.includes("1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"))return Z;if(c.includes("/folders/"))return c;const n=c.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(n&&n[1]&&!n[1].startsWith("demo_")&&n[1].length>=25&&n[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${n[1]}/view?usp=sharing`}return c&&(c.startsWith("https://")||c.startsWith("http://"))&&!c.includes("localhost")&&!c.includes("127.0.0.1")&&!c.includes("demo_sample")?c:Z}var de=new Set(["DARC-VILLA-ARCH-A101_Rev03.pdf","SKYLINE-CW-SECTION-DETAILS-DWG.pdf","RED-SEA-RESORT-MASTERPLAN-APPROVED.pdf","DARC-VILLA-BOQ-BILL-OF-QUANTITIES.xlsx","DARC-PALM-VILLA-TECHNICAL-SPECIFICATIONS.docx","DARC-ARCHITECTURAL-CONCEPT-PRESENTATION.pptx","DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4","PALM_VILLA_MAJLIS_3D_RENDER_4K.jpg","DARC-STRUCTURAL-LAYOUT-V2.dwg"]);function q(o){if(!o)return"";if(o.blobUrl&&typeof o.blobUrl=="string"&&o.blobUrl.startsWith("blob:"))return o.blobUrl;if(o._blobUrl&&typeof o._blobUrl=="string"&&o._blobUrl.startsWith("blob:"))return o._blobUrl;if(typeof window<"u"&&window.__docBlobCache){const g=window.__docBlobCache.get(o.id)||window.__docBlobCache.get(o.originalName);if(g&&typeof g=="string"&&g.startsWith("blob:"))return g}const i=!!(o.id?.startsWith("doc_demo_")||o.projectId?.startsWith("prj_demo_")||K()),c=(o.originalName||"").trim();if(i){if(c==="darc-walkthrough.mp4")return"/assets/DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4";if(c&&de.has(c))return`/assets/${encodeURIComponent(c)}`}const n=(o.diskFilename||o.disk_filename||o.url||"").trim();if(n&&(n.startsWith("https://")||n.startsWith("http://")))try{const g=new URL(n);if(["http:","https:"].includes(g.protocol)&&!g.hostname.includes("drive.google.com")&&!g.hostname.includes("docs.google.com"))return n}catch{}if(o.id)return`/api/documents/${encodeURIComponent(o.id)}?stream=1`;const x=c.replace(/[/\\:*?"<>|\x00-\x1f]/g,"_");return x?`/assets/${encodeURIComponent(x)}`:""}async function ue(o,i=null){if(!o)return;const c=re(o);let n=!1;try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(c),n=!0;else{const x=document.createElement("textarea");x.value=c,x.style.position="fixed",x.style.opacity="0",document.body.appendChild(x),x.select(),n=document.execCommand("copy"),x.remove()}}catch(x){console.warn("[DocViewer] Clipboard writeText failed:",x),window.prompt(e("انسخ رابط Google Drive من هنا:","Copy Google Drive link:"),c),n=!0}if(n){if(i){const g=i.innerHTML;i.innerHTML=`${S("check",14)} <span style="font-size:11px;font-weight:700;">${e("تم النسخ","Copied")}</span>`,i.style.color="var(--mint-strong, #10b981)",i.style.transition="all 0.2s ease",setTimeout(()=>{i.innerHTML=g,i.style.color=""},2200)}const x=K()||o&&(String(o.id).startsWith("doc_demo")||o.isDemo||String(o.driveFileId||"").startsWith("demo_"));W(e(x?"تم نسخ رابط المستند بنجاح ✅":"تم نسخ رابط المخرج الهندسي في Google Drive بنجاح ✅",x?"Document link copied successfully ✅":"Google Drive deliverable link copied ✅"))}}async function _(o){if(!o)return;let i=(E.data?.documents||[]).find(n=>n.id===o);if(!i)try{const n=await ne(`/api/documents/${o}`);n&&n.document&&(i=n.document)}catch{}if(!i){W(e("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}W(e(`جاري بدء تحميل "${i.originalName}"...`,`Starting download of "${i.originalName}"...`));const c=i.diskFilename||i.disk_filename||"";if(c&&c.includes("drive.google.com")){const n=c.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(n&&n[1]&&!n[1].startsWith("demo_")&&n[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"){const x=`https://drive.google.com/uc?export=download&id=${n[1]}`,g=(i.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),f=document.createElement("a");f.href=x,f.target="_blank",f.rel="noopener noreferrer",f.download=g,document.body.appendChild(f),f.click(),f.remove(),W(e(`تم بدء تنزيل "${i.originalName}" من Google Drive بنجاح.`,`Downloaded "${i.originalName}" from Google Drive.`));return}}try{let n=null;const x=q(i);if(x&&!x.startsWith("http://drive.google.com")&&!x.startsWith("https://drive.google.com"))try{const g=await fetch(x);g.ok&&(n=await g.blob())}catch(g){console.warn("[DocViewer] Real asset fetch error:",g)}if(n){const g=URL.createObjectURL(n),f=(i.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),I=document.createElement("a");I.href=g,I.download=f,document.body.appendChild(I),I.click(),I.remove(),setTimeout(()=>URL.revokeObjectURL(g),3e4),W(e(`تم تنزيل المستند الأصلي "${i.originalName}" بنجاح ✅`,`Downloaded "${i.originalName}" successfully ✅`));return}window.open(`/api/documents/${encodeURIComponent(i.id)}?download=1`,"_blank"),W(e(`تم بدء تنزيل "${i.originalName}" بنجاح.`,`Downloaded "${i.originalName}" successfully.`))}catch(n){console.error("[DocViewer] Local download creation failed:",n),window.open(`/api/documents/${encodeURIComponent(i.id)}?download=1`,"_blank")}}function Q(){const o=document.getElementById("preview-modal-overlay");if(!o)return;const i=o.querySelector("video");if(i)try{i.pause(),i.removeAttribute("src"),i.load()}catch{}window.__docPreviewKeyHandler&&(window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=null),document.body.style.overflow="",o.style.display="none",o.innerHTML=""}function be(){if(document.getElementById("darc-doc-viewer-responsive-styles"))return;const o=document.createElement("style");o.id="darc-doc-viewer-responsive-styles",o.textContent=`
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
  `,document.head.appendChild(o)}async function we(o){if(!o)return;be();let i=(E.data?.documents||[]).find(p=>p.id===o);if(!i)try{const p=await ne(`/api/documents/${o}`);p&&(p.id||p.document?.id)&&(i=p.document||p,E.data&&!E.data.documents&&(E.data.documents=[]),E.data?.documents&&E.data.documents.push(i))}catch(p){console.warn("[DocViewer] Failed to fetch doc on demand:",p)}if(!i){W(e("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}const c=(i.originalName||"").split(".").pop()?.toLowerCase()||"",n=J(i.originalName,i.mimeType),x=ae(i.originalName)||"V1",g=i.size>1048576?(i.size/1048576).toFixed(1)+" MB":Math.round((i.size||0)/1024)+" KB",f=c==="pdf"||n.isPdf,I=["dwg","dxf"].includes(c)||n.isCad,A=["rvt","rfa","ifc","skp"].includes(c)||n.isBim,N=["xlsx","xls","csv"].includes(c)||n.isExcel,R=["docx","doc","rtf","odt"].includes(c)||n.isWord,F=["pptx","ppt","key"].includes(c)||n.isPpt,j=["zip","rar","7z","tar"].includes(c)||n.isZip,a=["jpg","jpeg","png","webp","svg","heic"].includes(c)||n.isImg,P=["mp4","webm","mov","m4v"].includes(c)||i.mimeType&&i.mimeType.startsWith("video/"),u=K()||i&&(String(i.id).startsWith("doc_demo")||i.isDemo),L=re(i);let m=document.getElementById("preview-modal-overlay");m||(m=document.createElement("div"),m.id="preview-modal-overlay",document.body.appendChild(m)),m.innerHTML=`
    <div class="doc-modal-container">
      <!-- Universal Responsive Modal Header -->
      <div class="doc-modal-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line, #e2e8f0);background:var(--surface, #ffffff);flex-wrap:wrap;gap:10px;z-index:20;">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;flex:1;">
          <span style="background:${n.bg};color:${n.color};border:1px solid ${n.border};font-size:11px;font-weight:900;padding:4px 8px;border-radius:6px;flex-shrink:0;">
            ${n.ext}
          </span>
          <div style="min-width:0;flex:1;">
            <h3 style="margin:0;font-size:14px;font-weight:800;color:var(--ink, #0f172a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:clamp(220px, 45vw, 550px);" title="${r(i.originalName)}">
              ${r(i.originalName)}
            </h3>
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;font-size:11px;color:var(--muted, #64748b);flex-wrap:wrap;">
              <span class="version-badge" style="background:rgba(13,98,105,0.08);color:var(--teal, #0d6269);padding:1px 6px;border-radius:4px;font-weight:800;">${x}</span>
              <span>•</span>
              <span>${g}</span>
              <span>•</span>
              <span class="status-badge ${r(i.status||"approved")}" style="font-size:10px;padding:2px 7px;">${r(oe(i.status||"approved"))}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons (Responsive on Mobile) -->
        <div class="doc-modal-header-actions" style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <button type="button" class="btn btn-soft btn-sm" id="modal-copy-link-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--teal, #0d6269);" title="${e(u?"نسخ رابط المستند":"نسخ رابط Google Drive",u?"Copy Document Link":"Copy Drive Link")}">
            ${S("link",14)} <span class="btn-label">${e("نسخ الرابط","Copy Link")}</span>
          </button>
          <a href="${r(L)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;" title="${e(u?"فتح المستند":"فتح في Google Drive",u?"Open Document":"Open in Drive")}">
            ${S("external",13)} <span class="btn-label">${u?e("فتح الملف","Open File"):"Google Drive"}</span>
          </a>
          <button type="button" class="btn btn-primary btn-sm" id="modal-download-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;background:var(--brand-teal, #0d6269);color:#ffffff;" title="${e("تحميل المخطط","Download")}">
            ${S("download",14)} <span class="btn-label">${e("تنزيل الملف","Download")}</span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="close-doc-preview-btn" style="padding:6px;min-width:36px;height:36px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;" title="${e("إغلاق (Esc)","Close (Esc)")}">
            ${S("close",18)}
          </button>
        </div>
      </div>

      <!-- Main Viewer Viewport -->
      <div id="doc-viewer-viewport" class="touch-scroll" style="flex:1;position:relative;background:#0d1117;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        <!-- Injected format viewer below -->
      </div>
    </div>
  `,m.style.display="flex",document.body.style.overflow="hidden",window.__docPreviewKeyHandler&&window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=p=>{p.key==="Escape"&&Q()},window.addEventListener("keydown",window.__docPreviewKeyHandler),document.getElementById("modal-copy-link-btn")?.addEventListener("click",p=>{ue(i,p.currentTarget)}),document.getElementById("modal-download-btn")?.addEventListener("click",()=>{_(i.id)}),document.getElementById("close-doc-preview-btn")?.addEventListener("click",Q),m.onclick=p=>{p.target===m&&Q()};const z=document.getElementById("doc-viewer-viewport");if(z){if(f){const p=q(i);z.innerHTML=`
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
              ⬇️ ${e("تنزيل PDF","Download PDF")}
            </button>
          </div>
        </div>

        <!-- Native PDF Object + Mobile Fallback Container -->
        <div id="pdf-frame-container" style="flex:1;width:100%;height:100%;background:#525659;position:relative;overflow:hidden;">
          <object 
            id="pdf-native-object"
            data="${r(p)}#toolbar=1&navpanes=1&scrollbar=1" 
            type="application/pdf"
            style="width:100%;height:100%;border:none;display:block;"
          >
            <iframe 
              id="pdf-native-frame"
              src="${r(p)}#toolbar=1&navpanes=1&scrollbar=1" 
              type="application/pdf"
              style="width:100%;height:100%;border:none;display:block;"
              title="${r(i.originalName)}"
              allow="fullscreen"
            >
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;text-align:center;padding:24px;">
                <p style="margin-bottom:12px;font-size:14px;color:#cbd5e1;">${e("متصفحك يحتاج لفتح مستند PDF في نافذة جديدة أو تنزيله مباشرة.","Your browser requires opening this PDF in a new window or downloading it.")}</p>
                <a href="${r(p)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding:8px 18px;font-weight:700;">
                  ↗ ${e("فتح مستند PDF الأصلي","Open PDF in New Window")}
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    `,document.getElementById("pdf-open-newtab")?.addEventListener("click",()=>{window.open(p,"_blank")}),document.getElementById("pdf-download-btn")?.addEventListener("click",()=>{_(i.id)});return}if(a){let y=function(){D&&(D.style.transform=`translate(${t}px, ${s}px) scale(${d}) rotate(${h}deg)`),C&&(C.textContent=`${Math.round(d*100)}%`)};const p=q(i);z.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#0a0e14;user-select:none;">
        <!-- Inspection Toolbar -->
        <div style="position:absolute;top:16px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.88);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);padding:6px 14px;border-radius:30px;display:flex;align-items:center;gap:10px;z-index:20;box-shadow:0 10px 25px rgba(0,0,0,0.5);color:#fff;font-size:12px;">
          <button type="button" class="btn btn-ghost btn-sm" id="img-zoom-in" style="color:#fff;padding:4px 8px;font-weight:700;" title="${e("تكبير","Zoom In")}">🔍 +</button>
          <span id="img-zoom-level" style="font-weight:700;min-width:44px;text-align:center;">100%</span>
          <button type="button" class="btn btn-ghost btn-sm" id="img-zoom-out" style="color:#fff;padding:4px 8px;font-weight:700;" title="${e("تصغير","Zoom Out")}">🔍 -</button>
          <button type="button" class="btn btn-ghost btn-sm" id="img-rotate-btn" style="color:#38bdf8;padding:4px 8px;font-weight:700;" title="${e("تدوير 90 درجة","Rotate 90")}">↻ 90°</button>
          <button type="button" class="btn btn-ghost btn-sm" id="img-reset-btn" style="color:#fff;padding:4px 8px;font-weight:700;" title="${e("إعادة ضبط","Reset")}">⤢ 100%</button>
        </div>

        <!-- High-Res Image Viewport Canvas -->
        <div id="img-pan-viewport" style="flex:1;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:grab;position:relative;touch-action:none;">
          <img 
            id="active-preview-img" 
            src="${p}" 
            alt="${r(i.originalName)}" 
            style="max-width:92%;max-height:88%;object-fit:contain;border-radius:8px;box-shadow:0 20px 50px rgba(0,0,0,0.7);transition:transform 0.1s ease;transform-origin:center center;pointer-events:none;" 
          />
        </div>
      </div>
    `;let d=1,h=0,t=0,s=0,b=!1,k=0,$=0;const D=document.getElementById("active-preview-img"),C=document.getElementById("img-zoom-level"),w=document.getElementById("img-pan-viewport");if(document.getElementById("img-zoom-in")?.addEventListener("click",()=>{d=Math.min(5,d+.25),y()}),document.getElementById("img-zoom-out")?.addEventListener("click",()=>{d=Math.max(.4,d-.25),y()}),document.getElementById("img-rotate-btn")?.addEventListener("click",()=>{h=(h+90)%360,y()}),document.getElementById("img-reset-btn")?.addEventListener("click",()=>{d=1,h=0,t=0,s=0,y()}),w){w.addEventListener("wheel",B=>{B.preventDefault();const G=B.deltaY<0?.15:-.15;d=Math.max(.4,Math.min(5,d+G)),y()},{passive:!1}),w.addEventListener("pointerdown",B=>{b=!0;try{w.setPointerCapture(B.pointerId)}catch{}k=B.clientX-t,$=B.clientY-s,w.style.cursor="grabbing"}),w.addEventListener("pointermove",B=>{b&&(t=B.clientX-k,s=B.clientY-$,y())});const T=()=>{b=!1,w.style.cursor="grab"};w.addEventListener("pointerup",T),w.addEventListener("pointercancel",T),w.addEventListener("dblclick",()=>{d=d===1?2:1,t=0,s=0,y()})}return}if(P){const p=q(i);z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#06090e;">
        <!-- Video Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:10;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:900;color:#8b5cf6;background:rgba(139,92,246,0.15);padding:3px 8px;border-radius:4px;">MP4 / 4K</span>
            <span style="font-weight:700;color:#e2e8f0;">${e("جولة الموقع ونسبة الإنجاز (Site Progress)","Walkthrough Video")}</span>
            <span style="color:#64748b;">•</span>
            <span style="color:#94a3b8;">${g}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <select id="video-playback-rate" style="background:#1e293b;color:#e2e8f0;border:1px solid #334155;border-radius:6px;padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer;">
              <option value="0.75">0.75x</option>
              <option value="1" selected>1.0x ${e("عادي","Normal")}</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2.0x</option>
            </select>
            <button type="button" class="btn btn-sm" id="video-pip-btn" style="background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;">
              🗗 PiP
            </button>
            <button type="button" class="btn btn-sm btn-primary" id="video-download-btn" style="padding:4px 12px;font-weight:700;font-size:11px;">
              ⬇️ ${e("تنزيل الفيديو","Download Video")}
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
            src="${r(p)}"
          >
            <source src="${r(p)}" type="video/mp4" />
          </video>
        </div>

        <!-- Keyframe Jump Chips -->
        <div style="padding:8px 16px;background:rgba(15,23,42,0.95);border-top:1px solid #1e293b;display:flex;align-items:center;gap:8px;overflow-x:auto;" class="touch-scroll">
          <span style="font-size:11px;color:#94a3b8;white-space:nowrap;font-weight:700;">📍 ${e("محطات الجولة:","Keyframes:")}</span>
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
    `;const d=document.getElementById("darc-main-video-player");d&&(document.querySelectorAll(".video-jump-btn").forEach(h=>{h.addEventListener("click",()=>{const t=parseFloat(h.dataset.sec||"0");d.currentTime=t,d.play().catch(()=>{})})}),document.getElementById("video-playback-rate")?.addEventListener("change",h=>{d.playbackRate=parseFloat(h.target.value||"1")}),document.getElementById("video-pip-btn")?.addEventListener("click",async()=>{try{document.pictureInPictureElement?await document.exitPictureInPicture():d.requestPictureInPicture&&await d.requestPictureInPicture()}catch{}})),document.getElementById("video-download-btn")?.addEventListener("click",()=>_(i.id));return}if(I||A){z.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#0c1015;user-select:none;">
        <!-- CAD Inspection Top Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(16,20,24,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:20;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-weight:900;color:#0284c7;background:rgba(2,132,199,0.15);padding:3px 8px;border-radius:4px;">
              📐 CAD 2D
            </span>
            <span style="font-weight:700;color:#f8fafc;">${r(i.originalName)}</span>
            <span style="color:#64748b;">•</span>
            <span id="cad-coords" style="font-family:monospace;color:#38bdf8;font-size:11px;">X: 0.00m | Y: 0.00m</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="cad-zoom-in" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:4px 8px;font-weight:700;">➕</button>
            <button type="button" class="btn btn-sm" id="cad-zoom-out" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:4px 8px;font-weight:700;">➖</button>
            <button type="button" class="btn btn-sm" id="cad-reset" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:4px 8px;font-weight:700;">⤢ 100%</button>
            <button type="button" class="btn btn-sm" id="cad-download-btn" style="background:#0284c7;border:none;color:#fff;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ⬇️ ${e("تنزيل DWG / DXF","Download CAD")}
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
    `;const p=document.getElementById("cad-canvas"),d=document.getElementById("cad-canvas-box"),h=document.getElementById("cad-coords");if(p&&d){let G=function(){const v=Math.min(window.devicePixelRatio||1,2);p.width=d.clientWidth*v,p.height=d.clientHeight*v,U()},U=function(){if(!t)return;const v=Math.min(window.devicePixelRatio||1,2),M=p.width/v,O=p.height/v;t.save(),t.scale(v,v),t.clearRect(0,0,M,O),t.fillStyle="#0b1016",t.fillRect(0,0,M,O),t.translate(M/2+b,O/2+k),t.scale(s,s),t.lineWidth=1/s,t.strokeStyle="rgba(255, 255, 255, 0.04)";for(let l=-400;l<=400;l+=20)t.beginPath(),t.moveTo(l,-300),t.lineTo(l,300),t.stroke();for(let l=-300;l<=300;l+=20)t.beginPath(),t.moveTo(-400,l),t.lineTo(400,l),t.stroke();t.strokeStyle="rgba(2, 132, 199, 0.12)";for(let l=-400;l<=400;l+=100)t.beginPath(),t.moveTo(l,-300),t.lineTo(l,300),t.stroke();for(let l=-300;l<=300;l+=100)t.beginPath(),t.moveTo(-400,l),t.lineTo(400,l),t.stroke();const H=[{label:"1",x:-240},{label:"2",x:-120},{label:"3",x:0},{label:"4",x:120},{label:"5",x:240}],te=[{label:"A",y:-160},{label:"B",y:-60},{label:"C",y:60},{label:"D",y:160}];if(w?.checked&&(t.strokeStyle="rgba(56, 189, 248, 0.55)",t.setLineDash([8/s,4/s,2/s,4/s]),t.lineWidth=1.2/s,H.forEach(l=>{t.beginPath(),t.moveTo(l.x,-210),t.lineTo(l.x,210),t.stroke(),t.setLineDash([]),t.fillStyle="#0284c7",t.beginPath(),t.arc(l.x,-225,12,0,Math.PI*2),t.arc(l.x,225,12,0,Math.PI*2),t.fill(),t.fillStyle="#ffffff",t.font="bold 11px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(l.label,l.x,-225),t.fillText(l.label,l.x,225),t.setLineDash([8/s,4/s,2/s,4/s])}),te.forEach(l=>{t.beginPath(),t.moveTo(-290,l.y),t.lineTo(290,l.y),t.stroke(),t.setLineDash([]),t.fillStyle="#0284c7",t.beginPath(),t.arc(-305,l.y,12,0,Math.PI*2),t.arc(305,l.y,12,0,Math.PI*2),t.fill(),t.fillStyle="#ffffff",t.font="bold 11px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(l.label,-305,l.y),t.fillText(l.label,305,l.y),t.setLineDash([8/s,4/s,2/s,4/s])}),t.setLineDash([])),T?.checked&&(t.strokeStyle="#facc15",t.lineWidth=2.5/s,t.strokeRect(-240,-160,480,320),t.strokeRect(-120,-160,240,100),t.strokeRect(-240,60,240,100),t.strokeStyle="#38bdf8",t.strokeRect(120,60,140,100)),y?.checked&&(t.fillStyle="#4ade80",t.strokeStyle="#ffffff",t.lineWidth=1/s,H.forEach(l=>{te.forEach(V=>{t.fillRect(l.x-9,V.y-9,18,18),t.strokeRect(l.x-9,V.y-9,18,18),t.beginPath(),t.moveTo(l.x-9,V.y-9),t.lineTo(l.x+9,V.y+9),t.stroke()})})),B?.checked){t.strokeStyle="#f472b6",t.fillStyle="#f472b6",t.lineWidth=1.2/s,t.font="bold 10px monospace",t.textAlign="center";for(let l=0;l<H.length-1;l++){const V=H[l].x,ie=H[l+1].x,se=(V+ie)/2;t.beginPath(),t.moveTo(V,-190),t.lineTo(ie,-190),t.stroke(),t.fillText("6.00m",se,-196)}}t.restore()};const t=p.getContext("2d");let s=1,b=0,k=0,$=!1,D=0,C=0;const w=document.getElementById("layer-axes"),y=document.getElementById("layer-columns"),T=document.getElementById("layer-walls"),B=document.getElementById("layer-dims");window.addEventListener("resize",G),setTimeout(G,50),[w,y,T,B].forEach(v=>{v?.addEventListener("change",U)}),document.getElementById("cad-zoom-in")?.addEventListener("click",()=>{s=Math.min(4,s*1.25),U()}),document.getElementById("cad-zoom-out")?.addEventListener("click",()=>{s=Math.max(.3,s*.8),U()}),document.getElementById("cad-reset")?.addEventListener("click",()=>{s=1,b=0,k=0,U()}),d.addEventListener("wheel",v=>{v.preventDefault();const M=v.deltaY<0?1.15:.87;s=Math.max(.3,Math.min(4,s*M)),U()},{passive:!1}),d.addEventListener("pointerdown",v=>{$=!0;try{d.setPointerCapture(v.pointerId)}catch{}D=v.clientX-b,C=v.clientY-k,d.style.cursor="grabbing"}),d.addEventListener("pointermove",v=>{const M=d.getBoundingClientRect(),O=((v.clientX-M.left-M.width/2-b)/s/20).toFixed(2),H=((v.clientY-M.top-M.height/2-k)/s/20).toFixed(2);h&&(h.textContent=`X: ${O}m | Y: ${H}m`),$&&(b=v.clientX-D,k=v.clientY-C,U())});const ee=()=>{$=!1,d.style.cursor="crosshair"};d.addEventListener("pointerup",ee),d.addEventListener("pointercancel",ee)}document.getElementById("cad-download-btn")?.addEventListener("click",()=>_(i.id));return}if(N){let t=function(){const s=p[d],b=h.toLowerCase().trim(),k=s.rows.filter(y=>b?y.code.toLowerCase().includes(b)||y.desc.toLowerCase().includes(b)||y.unit.toLowerCase().includes(b):!0),$=k.reduce((y,T)=>y+T.total,0),D=document.getElementById("excel-interactive-table-body"),C=document.getElementById("excel-sheet-subtotal"),w=document.getElementById("excel-filtered-count");w&&(w.textContent=`${k.length} ${e("بند","items")}`),C&&(C.textContent=`${$.toLocaleString()} ${e("ر.س","SAR")}`),D&&(D.innerHTML=k.map(y=>`
          <tr style="border-bottom:1px solid var(--line, #e2e8f0);transition:background 0.15s ease;">
            <td style="padding:10px 14px;font-weight:800;font-family:monospace;color:var(--brand-teal, #0d6269);white-space:nowrap;">${r(y.code)}</td>
            <td style="padding:10px 14px;color:var(--ink, #0f172a);font-weight:600;min-width:240px;line-height:1.5;">${r(y.desc)}</td>
            <td style="padding:10px 14px;text-align:center;color:var(--ink-soft, #475569);font-weight:700;">${r(y.unit)}</td>
            <td style="padding:10px 14px;text-align:center;font-weight:800;font-variant-numeric:tabular-nums;">${y.qty.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:end;font-weight:700;font-variant-numeric:tabular-nums;">${y.rate.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:end;font-weight:900;color:#107c41;font-variant-numeric:tabular-nums;">${y.total.toLocaleString()}</td>
            <td style="padding:10px 14px;text-align:center;">
              <span class="status-badge approved" style="font-size:10px;padding:2px 8px;font-weight:800;">✅ ${e("معتمد","Approved")}</span>
            </td>
          </tr>
        `).join(""))};const p=[{id:"structural",title:e("أعمال الهيكل الإنشائي والعظم","Structural & Concrete Works"),rows:[{code:"01.01",desc:e("حفر وتجهيز الموقع وترحيل المخلفات لعمق التأسيس","Excavation & site prep to foundation depth"),unit:"م3",qty:1200,rate:45,total:54e3,status:"approved"},{code:"01.02",desc:e("خرسانة عادية للنظافة C20 سمك 10سم أسفل القواعد","Plain blinding concrete C20 (100mm) under footings"),unit:"م3",qty:180,rate:280,total:50400,status:"approved"},{code:"01.03",desc:e("خرسانة مسلحة للقواعد والرقاب C35 مقاوم للأملاح والكلوريدات","Reinforced concrete C35 SRC for footings and column necks"),unit:"م3",qty:420,rate:390,total:163800,status:"approved"},{code:"01.04",desc:e("حديد تسليح عالي المقاومة مشوه Grade 60 (ASTM A615)","Deformed high-strength rebar Grade 60 (ASTM A615)"),unit:"طن",qty:48,rate:3250,total:156e3,status:"approved"},{code:"01.05",desc:e("خرسانة مسلحة للأعمدة والجدران الاستنادية C40","Reinforced concrete C40 for columns and retaining walls"),unit:"م3",qty:260,rate:420,total:109200,status:"approved"},{code:"01.06",desc:e("عوازل مائية للقواعد ورقاب الأعمدة دهان بيتوميني وممبرين 4مم","Waterproofing bituminous primer + 4mm modified bitumen membrane"),unit:"م2",qty:850,rate:65,total:55250,status:"approved"},{code:"01.07",desc:e("أسقف خرسانية هوردي ولاكمرية Flat Slab مع كمرات ساقطة","Hollow-block and flat slab concrete with drop beams"),unit:"م3",qty:520,rate:410,total:213200,status:"approved"}]},{id:"finishes",title:e("التشطيبات المعمارية الفاخرة","Architectural Finishes"),rows:[{code:"02.01",desc:e("تكسيات حجر ترافنتينو إيطالي نخب أول للواجهات الخارجية","Italian Travertine stone cladding for exterior facades"),unit:"م2",qty:640,rate:480,total:307200,status:"approved"},{code:"02.02",desc:e("واجهات زجاجية مزدوجة معزولة حرارياً كيرتن وول قطاع Schüco","Double-glazed thermally broken curtain walls (Schüco profile)"),unit:"م2",qty:220,rate:1150,total:253e3,status:"approved"},{code:"02.03",desc:e("أرضيات رخام ستاتوريو إيطالي للمجالس والصالات الرئيسية","Statuario Italian marble flooring for main majlis & halls"),unit:"م2",qty:380,rate:620,total:235600,status:"approved"},{code:"02.04",desc:e("أسقف معلقة جبسية مقاومة للرطوبة مع مسارات إنارة مغناطيسية","Moisture-resistant gypsum ceilings with magnetic track lighting"),unit:"م2",qty:580,rate:195,total:113100,status:"approved"},{code:"02.05",desc:e("أبواب خشب جوز طبيعي بارتفاع 3.20م مع أقفال ذكية وكوالين خفية","Natural walnut flush doors (3.2m height) with concealed hinges"),unit:"عدد",qty:18,rate:4800,total:86400,status:"approved"},{code:"02.06",desc:e("دهانات داخلية ميكرو سمنت ديكوري فاخر للممرات والصالات","Luxury decorative microcement internal wall finishes"),unit:"م2",qty:1200,rate:85,total:102e3,status:"approved"}]},{id:"mep",title:e("الأنظمة الكهروميكانيكية والتكييف","MEP & HVAC Systems"),rows:[{code:"03.01",desc:e("نظام تكييف مركزي مخفي VRF إنفرتر مع تحكم ذكي غرفي","Inverter VRF central concealed AC system with smart zone thermostats"),unit:"نظام",qty:1,rate:28e4,total:28e4,status:"approved"},{code:"03.02",desc:e("شبكة التغذية والصرف الصحي أنابيب بولي بروبلين ألماني عازل للصوت","Acoustic PPR plumbing & drainage networks with booster pumps"),unit:"مقطوعية",qty:1,rate:95e3,total:95e3,status:"approved"},{code:"03.03",desc:e("نظام سمارت هوم للتحكم بالإنارة والتكييف والستائر بروتوكول KNX","KNX Smart Home automation for lighting, climate and shading"),unit:"نظام",qty:1,rate:145e3,total:145e3,status:"approved"},{code:"03.04",desc:e("لوحات التوزيع الكهربائية والقواطع الذكية شنايدر إلكتريك","Schneider Electric main electrical distribution boards & RCBOs"),unit:"لوحة",qty:6,rate:14e3,total:84e3,status:"approved"},{code:"03.05",desc:e("أنظمة إنذار ومكافحة الحريق وكواشف الدخان المتطورة","Advanced addressable fire alarm, smoke detectors & clean agent extinguishers"),unit:"نظام",qty:1,rate:48e3,total:48e3,status:"approved"}]}];let d=0,h="";z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);overflow:hidden;">
        <!-- Excel Green Header -->
        <div style="background:#107c41;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 8px rgba(16,124,65,0.25);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#107c41;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">X</div>
            <div>
              <div style="font-weight:800;font-size:14px;letter-spacing:-0.2px;">${r(i.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Excel Spreadsheet • ${e("جداول حساب الكميات والمقايسة المعتمدة","Approved Bill of Quantities")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="excel-print-btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              🖨️ ${e("طباعة المقايسة","Print BOQ")}
            </button>
            <button type="button" class="btn btn-sm" id="excel-direct-download" style="background:#ffffff;color:#107c41;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              ⬇️ ${e("تنزيل ملف XLSX الأصلي","Download XLSX")}
            </button>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 18px;background:var(--surface-soft, #f8fafc);border-bottom:1px solid var(--line, #e2e8f0);flex-wrap:wrap;gap:10px;">
          <!-- Sheet Tabs -->
          <div style="display:flex;align-items:center;gap:6px;overflow-x:auto;" class="touch-scroll">
            ${p.map((s,b)=>`
              <button type="button" class="excel-sheet-tab-btn" data-sheet-idx="${b}" style="padding:6px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid ${b===0?"#107c41":"var(--line, #e2e8f0)"};background:${b===0?"#107c41":"var(--surface, #ffffff)"};color:${b===0?"#ffffff":"var(--ink, #0f172a)"};white-space:nowrap;transition:all 0.15s ease;">
                ${r(s.title)}
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
    `,t(),document.querySelectorAll(".excel-sheet-tab-btn").forEach(s=>{s.addEventListener("click",()=>{d=parseInt(s.dataset.sheetIdx,10)||0,document.querySelectorAll(".excel-sheet-tab-btn").forEach((b,k)=>{k===d?(b.style.background="#107c41",b.style.borderColor="#107c41",b.style.color="#ffffff"):(b.style.background="var(--surface, #ffffff)",b.style.borderColor="var(--line, #e2e8f0)",b.style.color="var(--ink, #0f172a)")}),t()})}),document.getElementById("excel-live-search")?.addEventListener("input",s=>{h=s.target.value||"",t()}),document.getElementById("excel-print-btn")?.addEventListener("click",()=>window.print()),document.getElementById("excel-direct-download")?.addEventListener("click",()=>_(i.id));return}if(R){z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#1e242c;overflow:hidden;">
        <!-- Word Header -->
        <div style="background:#2b579a;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(43,87,154,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#2b579a;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">W</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${r(i.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Word Document • ${e("دفاتر الشروط والمواصفات الفنية المعتمدة","Approved Technical Specifications Document")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="word-print-btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              🖨️ ${e("طباعة الوثيقة","Print Specs")}
            </button>
            <button type="button" class="btn btn-sm" id="word-download-btn" style="background:#ffffff;color:#2b579a;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              ⬇️ ${e("تنزيل DOCX الأصلي","Download DOCX")}
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
                <div><span class="status-badge approved" style="font-size:10px;display:inline-block;margin-top:4px;">✅ معتمد للتنفيذ (Approved for Construction)</span></div>
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
    `,document.getElementById("word-print-btn")?.addEventListener("click",()=>window.print()),document.getElementById("word-download-btn")?.addEventListener("click",()=>_(i.id));return}if(F){let h=function(){const $=p[d],D=document.getElementById("ppt-slide-canvas-viewport"),C=document.getElementById("ppt-slide-counter"),w=document.getElementById("ppt-slide-dots-container");C&&(C.textContent=`${e("شريحة","Slide")} ${d+1} / ${p.length}`),w&&(w.innerHTML=p.map((y,T)=>`
          <button type="button" class="ppt-dot" data-dot-idx="${T}" style="width:${T===d?"24px":"8px"};height:8px;border-radius:4px;border:none;background:${T===d?"#d24726":"rgba(255,255,255,0.3)"};cursor:pointer;transition:all 0.2s ease;padding:0;" title="${e("انتقال للشريحة","Go to slide")} ${T+1}"></button>
        `).join(""),w.querySelectorAll(".ppt-dot").forEach(y=>{y.addEventListener("click",()=>{d=parseInt(y.dataset.dotIdx,10)||0,h()})})),D&&(D.style.backgroundColor=$.theme,D.innerHTML=$.html,document.getElementById("ppt-slide-download-btn")?.addEventListener("click",()=>_(i.id)))};const p=[{number:1,title:e("فلسفة التصميم والمفهوم المعماري","Design Philosophy & Architectural Concept"),subtitle:e("فيلا النخيل الفاخرة — مخرجات مرحلة المفهوم الأولي Concept Phase","Palm Villa Luxury Residence — Concept Deliverables"),theme:"#090d13",accent:"#d24726",html:`
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
              <span style="background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);">📍 ${e("الرياض / نخلة جميرا","Riyadh / Palm Jumeirah")}</span>
              <span style="background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);">📐 ${e("المساحة المبنية: 1,450 م2","BUA: 1,450 sqm")}</span>
              <span style="background:rgba(255,255,255,0.06);padding:6px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);">🏛️ ${e("الإصدار: Rev 03","Revision: Rev 03")}</span>
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
                <div style="background:rgba(2,132,199,0.1);border-left:3px solid #0284c7;padding:8px 12px;color:#e2e8f0;">⚡ ${e("توفير سنوي مقدر بنسبة 32% في استهلاك طاقة التكييف.","32% estimated annual HVAC cooling load reduction.")}</div>
                <div style="background:rgba(16,185,129,0.1);border-left:3px solid #10b981;padding:8px 12px;color:#e2e8f0;">🌿 ${e("استغلال الإضاءة الطبيعية لتقليل الاعتماد على الإنارة الاصطناعية النهارية.","Optimal daylight autonomy across all active family spaces.")}</div>
              </div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px dashed #334155;border-radius:12px;padding:24px;text-align:center;">
              <div style="font-size:48px;margin-bottom:12px;">☀️</div>
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
              <div style="font-size:48px;margin-bottom:12px;">🏛️</div>
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
              <div style="font-size:48px;margin-bottom:12px;">🏗️</div>
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
              <button type="button" class="btn btn-primary" id="ppt-slide-download-btn" style="background:#d24726;border:none;padding:10px 22px;border-radius:8px;font-weight:800;">
                ⬇️ ${e("تنزيل العرض التقديمي الكامل (PPTX)","Download Complete Presentation (PPTX)")}
              </button>
            </div>
          </div>
        `}];let d=0;z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#090d13;color:#f0f6fc;overflow:hidden;user-select:none;">
        <!-- PPT Header -->
        <div style="background:#d24726;color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(210,71,38,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d24726;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">P</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${r(i.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft PowerPoint Presentation • ${e("عرض المفهوم المعماري الأولي","Concept Design Presentation Deck")}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span id="ppt-slide-counter" style="font-size:12px;font-weight:800;background:rgba(0,0,0,0.25);padding:4px 10px;border-radius:12px;">شريحة 1 / 6</span>
            <button type="button" class="btn btn-sm" id="ppt-download-btn" style="background:#ffffff;color:#d24726;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              ⬇️ ${e("تنزيل PPTX الأصلي","Download PPTX")}
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
    `,h();const t=()=>{d=(d+1)%p.length,h()},s=()=>{d=(d-1+p.length)%p.length,h()};document.getElementById("ppt-next-btn")?.addEventListener("click",t),document.getElementById("ppt-prev-btn")?.addEventListener("click",s);const b=$=>{($.key==="ArrowRight"||$.key==="ArrowDown")&&t(),($.key==="ArrowLeft"||$.key==="ArrowUp")&&s()};window.addEventListener("keydown",b);const k=document.getElementById("ppt-touch-wrapper");if(k){let $=0;k.addEventListener("touchstart",D=>{$=D.changedTouches[0].screenX},{passive:!0}),k.addEventListener("touchend",D=>{const C=D.changedTouches[0].screenX-$;Math.abs(C)>40&&(C<0?t():s())},{passive:!0})}document.getElementById("ppt-download-btn")?.addEventListener("click",()=>_(i.id));return}if(j){z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);color:var(--text, #0f172a);overflow:hidden;">
        <!-- Zip Header -->
        <div style="background:#d97706;color:#ffffff;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d97706;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">📦</div>
            <div>
              <div style="font-weight:800;font-size:15px;">${r(i.originalName)}</div>
              <div style="font-size:12px;opacity:0.9;">Archive Deliverable Package • ${g}</div>
            </div>
          </div>
          <button type="button" class="btn btn-sm" id="zip-download-btn" style="background:#ffffff;color:#d97706;border:none;padding:6px 16px;border-radius:6px;font-weight:800;cursor:pointer;">
            ⬇️ ${e("تنزيل كامل الحزمة المضغوطة","Download Full Archive")}
          </button>
        </div>

        <!-- Archive Workspace Viewport -->
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;">
          <div style="max-width:540px;">
            <div style="font-size:48px;margin-bottom:16px;">📦</div>
            <h3 style="color:var(--text, #0f172a);font-size:18px;font-weight:800;margin:0 0 8px 0;">${r(i.originalName)}</h3>
            <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${e("ملف أرشيف مضغوط حقيقي معتمد. يحتوي على كامل مخرجات المشروع الهندسية جاهزة للتنزيل وفك الضغط.","Authentic archive deliverable. Ready for direct binary download and local extraction.")}
            </p>
            <button type="button" class="btn btn-primary" id="zip-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#d97706;color:#fff;border:none;cursor:pointer;">
              ⬇️ ${e("تنزيل الحزمة المضغوطة الآن","Download Archive Now")} (${g})
            </button>
          </div>
        </div>
      </div>
    `,document.getElementById("zip-download-btn")?.addEventListener("click",()=>_(i.id)),document.getElementById("zip-cta-download")?.addEventListener("click",()=>_(i.id));return}z.innerHTML=`
    <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;background:var(--surface, #ffffff);">
      <div style="width:80px;height:80px;border-radius:20px;background:${n.bg};color:${n.color};display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:900;margin-bottom:20px;border:2px solid ${n.border};">
        ${n.ext}
      </div>
      <h2 style="font-size:22px;font-weight:900;margin:0 0 8px 0;color:var(--text, #0f172a);">${r(i.originalName)}</h2>
      <p style="color:#64748b;font-size:14px;max-width:480px;line-height:1.6;margin:0 0 24px 0;">
        ${e("هذا المستند المعماري جاهز للتنزيل المباشر أو الفتح عبر التطبيق الهندسي المختص.","This architectural document is ready for direct download or local desktop review.")}
      </p>
      <div style="display:flex;gap:12px;">
        <button type="button" class="btn btn-primary" id="fallback-download-btn" style="padding:10px 24px;border-radius:8px;font-weight:800;">
          ⬇️ ${e("تنزيل الملف الآن","Download File")} (${g})
        </button>
      </div>
    </div>
  `,document.getElementById("fallback-download-btn")?.addEventListener("click",()=>_(i.id))}}var $e=le({openUploadDrawingModal:()=>ye,renderDocuments:()=>me});function me(){const o=E.data?.documents||[],i=E.data?.projects||[],c=E.data?.tasks||[],n=(E.searches?.documents||"").trim().toLowerCase(),x=E.docProjectFilter||"all",g=E.data?.user?.id,f=pe(),I=f||X("review_tasks")||X("approve_tasks")||X("edit_tasks"),A=new Set(c.filter(a=>!a.deletedAt).map(a=>a.id)),N=new Set(i.filter(a=>!a.deletedAt).map(a=>a.id)),R=o.filter(a=>!(a.deletedAt||a.projectId&&!N.has(a.projectId)||!a.projectId&&a.taskId&&!A.has(a.taskId)||x!=="all"&&a.projectId!==x||n&&!(a.originalName||"").toLowerCase().includes(n))).sort((a,P)=>new Date(P.createdAt||0)-new Date(a.createdAt||0)),F=R.reduce((a,P)=>a+(P.size||0),0),j=F>1073741824?(F/1073741824).toFixed(1)+" GB":F>1048576?(F/1048576).toFixed(1)+" MB":Math.round(F/1024)+" KB";return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${e("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h2>${Y("documents")}</h2>
        <p class="intro">${e("إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.","Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.")}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        ${X("upload_documents")||f?`
          <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:7px;font-weight:700;box-shadow:0 2px 8px rgba(13,98,105,0.25);">
            ${S("upload",14)}
            <span>${e("رفع مخطط / ملف جديد","Upload Drawing / File")}</span>
          </button>
        `:""}
        <button class="btn btn-secondary btn-sm" data-action="go-to-trash" style="display:inline-flex;align-items:center;gap:6px;" title="${e("الانتقال لسلة المحذوفات لاستعراض واستعادة الملفات والمشاريع المحذوفة","Go to trash bin to review and restore deleted files and projects")}">
          ${S("trash",14)}
          <span>${e("سلة المهملات","Trash")}</span>
        </button>
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;">
          ${R.length} ${e("مخطط / ملف","drawings")} (${j})
        </span>
      </div>
    </div>

    <!-- Filters Bar (Unified View Toolbar) -->
    <div class="view-toolbar" style="margin-bottom:20px;">
      <div class="view-toolbar-start" style="flex:1;">
        <div class="search-box" style="flex:1;max-width:440px;">
          ${S("search",15)}
          <input 
            type="search" 
            placeholder="${e("بحث برقم المخطط أو الاسم أو الامتداد (DWG, PDF, RVT)...","Search by drawing name, code, or format (DWG, PDF, RVT)...")}" 
            value="${r(E.searches?.documents||"")}" 
            data-search="documents" 
            data-action="search-documents" 
          />
        </div>

        <div class="sort-box">
          <span>${e("المشروع:","Project:")}</span>
          <select data-action="doc-project-filter" class="filter-select select-compact" style="min-width:180px;">
            <option value="all" ${x==="all"?"selected":""}>${e("— جميع المشاريع —","— All Projects —")}</option>
            ${i.map(a=>`<option value="${r(a.id)}" ${x===a.id?"selected":""}>${r(a.code)} - ${r(e(a.nameAr,a.nameEn))}</option>`).join("")}
          </select>
        </div>
      </div>

      <div class="view-toolbar-end">
        <span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">
          ${R.length} ${e("مخرجات","deliverables")}
        </span>
      </div>
    </div>

    <!-- Documents Table -->
    <div class="panel">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${e("المخطط / المخرج الهندسي","Drawing / Deliverable")}</th>
              <th>${Y("projects")}</th>
              <th>${Y("tasks")}</th>
              <th>${e("الإصدار","Revision")}</th>
              <th>${e("الحالة الهندسية","Status")}</th>
              <th>${e("الحجم","Size")}</th>
              <th>${e("تاريخ الرفع","Upload Date")}</th>
              <th style="text-align:end;">${e("الإجراءات","Actions")}</th>
            </tr>
          </thead>
          <tbody>
            ${R.length>0?R.map(a=>{const P=i.find(d=>d.id===a.projectId),u=c.find(d=>d.id===a.taskId),L=J(a.originalName,a.mimeType),m=ae(a.originalName),z=a.size>1048576?(a.size/1048576).toFixed(1)+" MB":Math.round((a.size||0)/1024)+" KB",p=f||X("delete_documents")||a.uploaderId===g;return`
                <tr data-doc-id="${r(a.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${r(a.id)}">
                      <span class="file-format-badge" style="background:${L.bg};color:${L.color};border:1px solid ${L.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${L.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${r(a.originalName)}">
                          ${r(a.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${L.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${P?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${r(P.id)}">${r(P.code)}</span>`:"—"}
                  </td>
                  <td>
                    ${u?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${r(u.id)}">${r(e(u.titleAr,u.titleEn))}</span>`:'<span style="color:var(--muted);font-size:11px;">مخطط عام</span>'}
                  </td>
                  <td>
                    ${m?`
                      <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                        ${m}
                      </span>
                    `:'<span style="font-size:11px;color:var(--muted);">V1</span>'}
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${I?`
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${r(a.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${a.status==="draft"?"selected":""}>📝 ${e("مسودة عمل","Draft")}</option>
                          <option value="review" ${a.status==="review"?"selected":""}>🔍 ${e("قيد المراجعة","Review")}</option>
                          <option value="approved" ${a.status==="approved"?"selected":""}>✅ ${e("معتمد للتنفيذ","Approved")}</option>
                          <option value="superseded" ${a.status==="superseded"?"selected":""}>⏳ ${e("مستبدل بنسخة أحدث","Superseded")}</option>
                        </select>
                      `:`
                        <span class="status-badge ${r(a.status||"draft")}" style="font-size:11px;">
                          ${r(oe(a.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${z}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${ce(a.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${r(a.id)}" style="padding:5px;" title="${e("معاينة","Preview")}">
                        ${S("eye",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${r(a.id)}" style="padding:5px;color:var(--teal);" title="${e("نسخ رابط Google Drive","Copy Drive Link")}">
                        ${S("link",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${r(a.id)}" style="padding:5px;color:var(--blue);" title="${e("تحميل المخطط","Download")}">
                        ${S("download",14)}
                      </button>
                      ${p?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${r(a.id)}" style="padding:5px;color:var(--red);" title="${e("نقل لسلة المهملات","Move to trash")}">
                          ${S("trash",14)}
                        </button>
                      `:""}
                    </div>
                  </td>
                </tr>
              `}).join(""):`
              <tr>
                <td colspan="8">
                  <div class="empty" style="padding:40px 20px;">
                    ${S("document",24)}
                    <span>${e("لا توجد ملفات أو مخططات مطابقة للبحث أو الفلترة المحددة.","No drawings or documents found matching the criteria.")}</span>
                  </div>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function ye(o=null){const i=E.data?.projects||[],c=o||i[0]?.id||"",n=E.data?.tasks?.filter(f=>f.projectId===c&&!f.deletedAt)||[],x=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${e("المشروع المستهدف *","Target Project *")}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${i.map(f=>`<option value="${r(f.id)}" ${f.id===c?"selected":""}>${r(f.code)} - ${r(e(f.nameAr,f.nameEn))}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${e("المهمة الهندسية (اختياري)","Engineering Task (Optional)")}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${e("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>
            ${n.map(f=>`<option value="${r(f.id)}">${r(e(f.titleAr,f.titleEn))}</option>`).join("")}
          </select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${e("التخصص الهندسي","Engineering Discipline")}</label>
          <select id="drawing-upload-discipline" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="معماري">🏛️ ${e("معماري (Architectural)","Architectural")}</option>
            <option value="إنشائي">🏗️ ${e("إنشائي (Structural)","Structural")}</option>
            <option value="كهرباء">⚡ ${e("كهرباء (Electrical)","Electrical")}</option>
            <option value="ميكانيك وتكييف">🌡️ ${e("ميكانيك وتكييف (HVAC)","HVAC")}</option>
            <option value="سباكة وصحي">💧 ${e("سباكة وصحي (Plumbing)","Plumbing")}</option>
            <option value="مخرجات ثلاثية الأبعاد">📐 ${e("3D / BIM (Revit/SketchUp)","3D / BIM")}</option>
            <option value="عام">📁 ${e("مستندات عامة ومواصفات","General Specs")}</option>
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${e("الحالة الهندسية المبدئية","Initial Approval Status")}</label>
          <select id="drawing-upload-status" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="draft">📝 ${e("مسودة عمل (Draft)","Draft")}</option>
            <option value="review" selected>🔍 ${e("قيد المراجعة الفنية (Under Review)","Under Review")}</option>
            <option value="approved">✅ ${e("معتمد للتنفيذ (Approved for Construction)","Approved for Construction")}</option>
          </select>
        </div>
      </div>

      <!-- File Upload Dropzone -->
      <div class="field">
        <label style="font-size:12px;font-weight:700;">${e("الملفات والمخططات *","Drawings & Files *")}</label>
        <div id="drawing-dropzone" style="border:2px dashed var(--line);border-radius:12px;padding:24px 16px;text-align:center;background:var(--surface);cursor:pointer;transition:border-color 0.2s;">
          <div style="color:var(--teal);margin-bottom:8px;">${S("upload",28)}</div>
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:var(--ink);">${e("اسحب وأفلت المخططات هنا أو انقر للاختيار","Drag & drop drawings here or click to browse")}</p>
          <p style="margin:0;font-size:11px;color:var(--muted);">${e("يدعم ملفات هندسية عملاقة: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (حتى 100GB برفع مستأنف فائق السرعة)","Supports massive engineering files: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (Up to 100GB with resumable chunks)")}</p>
          <input type="file" multiple id="drawing-file-input" style="display:none;" />
        </div>
        <div id="drawing-selected-files-list" style="margin-top:10px;display:grid;gap:6px;"></div>
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;">
        <button type="button" class="btn btn-secondary btn-sm" data-action="close-modal">${e("إلغاء","Cancel")}</button>
        <button type="submit" class="btn btn-primary btn-sm" id="start-drawing-upload-btn" style="font-weight:700;" disabled>
          ${S("upload",14)} <span>${e("بدء الرفع المباشر","Start Resumable Upload")}</span>
        </button>
      </div>
    </form>
  `,g=document.getElementById("modal-root");if(g){g.innerHTML=fe(e("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),e("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),x,"upload-drawing","modal-lg");const f=document.getElementById("drawing-upload-project"),I=document.getElementById("drawing-upload-task");f&&I&&f.addEventListener("change",()=>{const u=f.value,L=E.data?.tasks?.filter(m=>m.projectId===u&&!m.deletedAt)||[];I.innerHTML=`<option value="">${e("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+L.map(m=>`<option value="${r(m.id)}">${r(e(m.titleAr,m.titleEn))}</option>`).join("")});const A=document.getElementById("drawing-dropzone"),N=document.getElementById("drawing-file-input"),R=document.getElementById("drawing-selected-files-list"),F=document.getElementById("start-drawing-upload-btn");let j=[];const a=()=>{if(!j.length){R.innerHTML="",F.disabled=!0;return}F.disabled=!1,R.innerHTML=j.map((u,L)=>{const m=J(u.name,u.type),z=u.size>1048576?(u.size/1048576).toFixed(1)+" MB":Math.round(u.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${m.bg};color:${m.color};border:1px solid ${m.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${m.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${r(u.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${z})</span>
            </div>
            <button type="button" data-file-remove="${L}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),R.querySelectorAll("[data-file-remove]").forEach(u=>{u.addEventListener("click",L=>{const m=parseInt(u.dataset.fileRemove);j.splice(m,1),a()})})};A&&N&&(A.addEventListener("click",()=>N.click()),N.addEventListener("change",()=>{N.files?.length&&(j=Array.from(N.files),a())}),A.addEventListener("dragover",u=>{u.preventDefault(),A.style.borderColor="var(--teal)"}),A.addEventListener("dragleave",()=>{A.style.borderColor="var(--line)"}),A.addEventListener("drop",u=>{u.preventDefault(),A.style.borderColor="var(--line)",u.dataTransfer?.files?.length&&(j=Array.from(u.dataTransfer.files),a())}));const P=document.getElementById("upload-drawing-form");P&&P.addEventListener("submit",async u=>{if(u.preventDefault(),!j.length)return;const L=f.value,m=I.value||null,z=document.getElementById("drawing-upload-discipline")?.value||"عام",p=document.getElementById("drawing-upload-status")?.value||"draft";ge(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:j,projectId:L,taskId:m,discipline:z,status:p})})}}export{re as a,_ as i,ye as n,ue as o,Q as r,we as s,$e as t};
