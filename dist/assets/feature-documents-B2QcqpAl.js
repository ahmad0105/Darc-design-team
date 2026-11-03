import{t as J}from"./rolldown-runtime-BQ-_32WO.js";import{A as n,D as t,G as ee,M as Y,O as te,U as L,at as oe,ct as N,g as Z,ht as I,nt as q,ot as ne,rt as G,w as H,z as O}from"./core-realtime-Cr24Cgah.js";var ie="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH",R=`https://drive.google.com/drive/folders/${ie}?usp=sharing`;function Q(d){if(!d)return R;const e=d.driveFileId||d.drive_file_id;if(e&&!String(e).startsWith("demo_")&&String(e).length>=25&&e!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${encodeURIComponent(e)}/view?usp=sharing`;const i=d.diskFilename||d.disk_filename||d.viewLink||d.webViewLink||"";if(i&&i.includes("drive.google.com")){if(i.includes("/folders/"))return i;const a=i.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(a&&a[1]&&!a[1].startsWith("demo_")&&a[1].length>=25&&a[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/file/d/${a[1]}/view?usp=sharing`}return i&&(i.startsWith("https://")||i.startsWith("http://"))&&!i.includes("localhost")&&!i.includes("127.0.0.1")&&!i.includes("demo_sample")?i:R}var de=new Set(["DARC-VILLA-ARCH-A101_Rev03.pdf","SKYLINE-CW-SECTION-DETAILS-DWG.pdf","RED-SEA-RESORT-MASTERPLAN-APPROVED.pdf","DARC-VILLA-BOQ-BILL-OF-QUANTITIES.xlsx","DARC-PALM-VILLA-TECHNICAL-SPECIFICATIONS.docx","DARC-ARCHITECTURAL-CONCEPT-PRESENTATION.pptx","DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4","PALM_VILLA_MAJLIS_3D_RENDER_4K.jpg","DARC-STRUCTURAL-LAYOUT-V2.dwg"]);function j(d){if(!d)return"";if(d.blobUrl&&typeof d.blobUrl=="string"&&d.blobUrl.startsWith("blob:"))return d.blobUrl;if(d._blobUrl&&typeof d._blobUrl=="string"&&d._blobUrl.startsWith("blob:"))return d._blobUrl;if(typeof window<"u"&&window.__docBlobCache){const p=window.__docBlobCache.get(d.id)||window.__docBlobCache.get(d.originalName);if(p&&typeof p=="string"&&p.startsWith("blob:"))return p}const e=(d.originalName||"").trim();if(e==="darc-walkthrough.mp4")return"/assets/DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4";if(e&&de.has(e))return`/assets/${encodeURIComponent(e)}`;const i=(d.diskFilename||d.disk_filename||d.url||"").trim();if(i&&(i.startsWith("https://")||i.startsWith("http://")))try{const p=new URL(i);if(["http:","https:"].includes(p.protocol))if(p.hostname.includes("drive.google.com")||p.hostname.includes("docs.google.com")){if(!p.pathname.includes("/folders/")){const s=i.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(s&&s[1]&&!s[1].startsWith("demo_")&&s[1].length>=25&&s[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/uc?export=download&id=${s[1]}`}}else return i}catch{console.warn("[DocViewer] Invalid storage URL format:",i)}const a=d.driveFileId||d.drive_file_id;if(a&&typeof a=="string"&&!a.startsWith("demo_")&&a.length>=25&&a!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH")return`https://drive.google.com/uc?export=download&id=${encodeURIComponent(a)}`;if(d.id)return`/api/documents/${encodeURIComponent(d.id)}?stream=1`;const l=e.replace(/[/\\:*?"<>|\x00-\x1f]/g,"_");return l?`/assets/${encodeURIComponent(l)}`:""}async function re(d,e=null){if(!d)return;const i=Q(d);let a=!1;try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(i),a=!0;else{const l=document.createElement("textarea");l.value=i,l.style.position="fixed",l.style.opacity="0",document.body.appendChild(l),l.select(),a=document.execCommand("copy"),l.remove()}}catch(l){console.warn("[DocViewer] Clipboard writeText failed, prompting:",l),window.prompt(t("انسخ رابط Google Drive من هنا:","Copy Google Drive link:"),i),a=!0}if(a){if(e){const l=e.innerHTML;e.innerHTML=`${L("check",14)} <span style="font-size:11px;font-weight:700;">${t("تم النسخ","Copied")}</span>`,e.style.color="var(--mint-strong, #10b981)",e.style.transition="all 0.2s ease",setTimeout(()=>{e.innerHTML=l,e.style.color=""},2200)}N(t(`تم نسخ رابط Google Drive بنجاح: ${i}`,`Google Drive link copied: ${i}`))}}async function D(d){if(!d)return;let e=(I.data?.documents||[]).find(l=>l.id===d);if(!e)try{const l=await Z(`/api/documents/${d}`);l&&l.document&&(e=l.document)}catch{}if(!e){N(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}N(t(`جاري بدء تحميل "${e.originalName}"...`,`Starting download of "${e.originalName}"...`));const i=(e.originalName||"").split(".").pop()?.toLowerCase()||"";i==="pdf"||e.mimeType&&e.mimeType.includes("pdf"),["dwg","dxf"].includes(i),["xlsx","xls","csv"].includes(i),["docx","doc","rtf","odt"].includes(i),["pptx","ppt","key"].includes(i),["jpg","jpeg","png","webp","svg"].includes(i)||e.mimeType&&e.mimeType.startsWith("image/"),["mp4","webm","mov"].includes(i)||e.mimeType&&e.mimeType.startsWith("video/");const a=e.diskFilename||e.disk_filename||"";if(a&&a.includes("drive.google.com")){const l=a.match(/(?:file\/d\/|id=)([a-zA-Z0-9_-]{20,50})/);if(l&&l[1]&&!l[1].startsWith("demo_")&&l[1]!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"){const p=`https://drive.google.com/uc?export=download&id=${l[1]}`,s=(e.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),$=document.createElement("a");$.href=p,$.target="_blank",$.rel="noopener noreferrer",$.download=s,document.body.appendChild($),$.click(),$.remove(),N(t(`تم بدء تنزيل "${e.originalName}" من Google Drive بنجاح.`,`Downloaded "${e.originalName}" from Google Drive.`));return}}try{let l=null;const p=j(e);if(p)try{const s=await fetch(p);s.ok&&(l=await s.blob())}catch(s){console.warn("[DocViewer] Real asset fetch error:",s)}if(!l){window.open(`/api/documents/${encodeURIComponent(e.id)}?download=1`,"_blank"),N(t(`تم بدء تنزيل "${e.originalName}" بنجاح.`,`Downloaded "${e.originalName}" successfully.`));return}if(l){const s=URL.createObjectURL(l),$=(e.originalName||"document").replace(/[/\\:*?"<>|\x00-\x1f]/g,"_"),E=document.createElement("a");E.href=s,E.download=$,document.body.appendChild(E),E.click(),E.remove(),setTimeout(()=>URL.revokeObjectURL(s),3e4),N(t(`تم تنزيل المستند الأصلي "${e.originalName}" بنجاح.`,`Downloaded "${e.originalName}" successfully.`))}}catch(l){console.error("[DocViewer] Local download creation failed:",l),window.open(`/api/documents/${encodeURIComponent(e.id)}?download=1`,"_blank")}}function W(){const d=document.getElementById("preview-modal-overlay");if(!d)return;const e=d.querySelector("video");if(e)try{e.pause(),e.removeAttribute("src"),e.load()}catch{}window.__docPreviewKeyHandler&&(window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=null),document.body.style.overflow="",d.style.display="none",d.innerHTML=""}async function pe(d){if(!d)return;let e=(I.data?.documents||[]).find(r=>r.id===d);if(!e)try{const r=await Z(`/api/documents/${d}`);r&&(r.id||r.document?.id)&&(e=r.document||r,I.data&&!I.data.documents&&(I.data.documents=[]),I.data?.documents&&I.data.documents.push(e))}catch(r){console.warn("[DocViewer] Failed to fetch doc on demand:",r)}if(!e){N(t("المستند غير موجود أو تم نقله لسلة المهملات.","Document not found."),!0);return}const i=(e.originalName||"").split(".").pop()?.toLowerCase()||"",a=O(e.originalName,e.mimeType),l=Y(e.originalName)||"V1",p=e.size>1048576?(e.size/1048576).toFixed(1)+" MB":Math.round((e.size||0)/1024)+" KB",s=i==="pdf"||a.isPdf,$=["dwg","dxf"].includes(i)||a.isCad,E=["rvt","rfa","ifc","skp"].includes(i)||a.isBim,C=["xlsx","xls","csv"].includes(i)||a.isExcel,P=["docx","doc","rtf","odt"].includes(i)||a.isWord,_=["pptx","ppt","key"].includes(i)||a.isPpt,F=["zip","rar","7z","tar"].includes(i)||a.isZip,o=["jpg","jpeg","png","webp","svg","heic"].includes(i)||a.isImg,A=["mp4","webm","mov","m4v"].includes(i)||e.mimeType&&e.mimeType.startsWith("video/"),g=Q(e);let w=document.getElementById("preview-modal-overlay");w||(w=document.createElement("div"),w.id="preview-modal-overlay",w.style.cssText=`
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(8, 14, 18, 0.88);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
    `,document.body.appendChild(w)),w.innerHTML=`
    <div style="background:var(--surface, #ffffff);width:100%;max-width:1240px;height:92vh;border-radius:16px;box-shadow:0 30px 70px rgba(0,0,0,0.5);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line, #e2e8f0);animation:modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);">
      <!-- Modal Header -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line, #e2e8f0);background:var(--surface, #ffffff);flex-wrap:wrap;gap:10px;">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;">
          <span style="background:${a.bg};color:${a.color};border:1px solid ${a.border};font-size:11px;font-weight:900;padding:4px 8px;border-radius:6px;flex-shrink:0;">
            ${a.ext}
          </span>
          <div style="min-width:0;">
            <h3 style="margin:0;font-size:15px;font-weight:800;color:var(--ink, #0f172a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:440px;" title="${n(e.originalName)}">
              ${n(e.originalName)}
            </h3>
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;font-size:11px;color:var(--muted, #64748b);">
              <span class="version-badge" style="background:rgba(13,98,105,0.08);color:var(--teal, #0d6269);padding:1px 6px;border-radius:4px;font-weight:800;">${l}</span>
              <span>•</span>
              <span>${p}</span>
              <span>•</span>
              <span class="status-badge ${n(e.status||"approved")}" style="font-size:10px;padding:2px 7px;">${n(q(e.status||"approved"))}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <button type="button" class="btn btn-soft btn-sm" id="modal-copy-link-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--teal, #0d6269);">
            ${L("link",14)} <span>${t("نسخ رابط Google Drive","Copy Drive Link")}</span>
          </button>
          <a href="${n(g)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;">
            ${L("external",13)} <span>${t("فتح في Drive","Open in Drive")}</span>
          </a>
          <button type="button" class="btn btn-primary btn-sm" id="modal-download-btn" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;background:var(--brand-teal, #0d6269);color:#ffffff;">
            ${L("download",14)} <span>${t("تحميل المخطط","Download")}</span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="close-doc-preview-btn" style="padding:6px;min-width:34px;height:34px;border-radius:8px;" title="${t("إغلاق","Close")}">
            ${L("close",18)}
          </button>
        </div>
      </div>

      <!-- Main Viewer Viewport -->
      <div id="doc-viewer-viewport" style="flex:1;position:relative;background:#0d1117;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        <!-- Content injected dynamically below -->
      </div>
    </div>
  `,w.style.display="flex",document.body.style.overflow="hidden",window.__docPreviewKeyHandler&&window.removeEventListener("keydown",window.__docPreviewKeyHandler),window.__docPreviewKeyHandler=r=>{r.key==="Escape"&&W()},window.addEventListener("keydown",window.__docPreviewKeyHandler);const h=document.getElementById("modal-copy-link-btn");h&&h.addEventListener("click",()=>re(e,h));const U=document.getElementById("modal-download-btn");U&&U.addEventListener("click",()=>D(e.id));const V=document.getElementById("close-doc-preview-btn");V&&V.addEventListener("click",W),w.onclick=r=>{r.target===w&&W()};const z=document.getElementById("doc-viewer-viewport");if(z){if(s){const r=j(e),y=e.driveFileId&&e.driveFileId.length>=25&&!e.driveFileId.startsWith("demo_")&&e.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(e.driveFileId)}/preview`:R;z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;position:relative;background:#1e242c;">
        <!-- PDF Architectural Inspection Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:rgba(15,23,42,0.95);border-bottom:1px solid #334155;color:#e2e8f0;font-size:12px;z-index:10;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-weight:900;color:#dc2626;background:rgba(220,38,38,0.15);padding:4px 8px;border-radius:4px;">PDF</span>
            <span style="font-weight:700;color:#38bdf8;">${t("المخطط المعماري الأصلي المعتمد (Native Blueprint PDF)","Architectural Plan View")}</span>
            <span style="color:#64748b;">|</span>
            <span>${p}</span>
            <span style="color:#64748b;">|</span>
            <span style="color:#2dd4bf;">● ${t("معتمد برقم ترخيص 2026/DARC-104","Engineering Stamp 2026/DARC-104")}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="pdf-view-native" style="background:#0284c7;color:#fff;border:none;padding:5px 12px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              📄 ${t("المستند المباشر (PDF)","Native PDF")}
            </button>
            <button type="button" class="btn btn-sm" id="pdf-view-drive" style="background:#1e293b;color:#94a3b8;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ☁️ ${t("معاينة Google Drive","Drive Preview")}
            </button>
            <span style="color:rgba(255,255,255,0.3);">|</span>
            <button type="button" class="btn btn-ghost btn-sm" id="pdf-open-newtab" style="color:#38bdf8;padding:4px 10px;font-weight:700;">
              ↗ ${t("فتح في نافذة كاملة","Open in New Tab")}
            </button>
            <button type="button" class="btn btn-sm btn-primary" id="pdf-download-btn" style="padding:4px 14px;font-weight:800;">
              ⬇️ ${t("تنزيل PDF الأصلي","Download Real PDF")}
            </button>
          </div>
        </div>

        <!-- Real Native PDF Viewport via Object + IFrame Fallback -->
        <div id="pdf-frame-container" style="flex:1;width:100%;height:100%;background:#525659;position:relative;">
          <object 
            id="pdf-native-object"
            data="${n(r)}#toolbar=1&navpanes=1&scrollbar=1" 
            type="application/pdf"
            style="width:100%;height:100%;border:none;display:block;"
          >
            <iframe 
              id="pdf-native-frame"
              src="${n(r)}#toolbar=1&navpanes=1&scrollbar=1" 
              type="application/pdf"
              style="width:100%;height:100%;border:none;display:block;"
              title="${n(e.originalName)}"
              allow="fullscreen"
            >
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;text-align:center;padding:24px;">
                <p style="margin-bottom:12px;font-size:14px;color:#cbd5e1;">${t("متصفحك يحتاج لفتح مستند PDF في نافذة جديدة أو تنزيله مباشرة.","Your browser requires opening this PDF in a new window or downloading it.")}</p>
                <a href="${n(r)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding:8px 18px;font-weight:700;">
                  ↗ ${t("فتح مستند PDF الأصلي","Open PDF in New Window")}
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    `,document.getElementById("pdf-view-native")?.addEventListener("click",()=>{const f=document.getElementById("pdf-frame-container");f&&(f.innerHTML=`
          <object id="pdf-native-object" data="${n(r)}#toolbar=1&navpanes=1" type="application/pdf" style="width:100%;height:100%;border:none;display:block;">
            <iframe id="pdf-native-frame" src="${n(r)}#toolbar=1&navpanes=1" type="application/pdf" style="width:100%;height:100%;border:none;display:block;" title="${n(e.originalName)}" allow="fullscreen"></iframe>
          </object>
        `),document.getElementById("pdf-view-native").style.background="#0284c7",document.getElementById("pdf-view-native").style.color="#fff",document.getElementById("pdf-view-drive").style.background="#1e293b",document.getElementById("pdf-view-drive").style.color="#94a3b8"}),document.getElementById("pdf-view-drive")?.addEventListener("click",()=>{const f=document.getElementById("pdf-frame-container");f&&(f.innerHTML=`<iframe src="${n(y)}" style="width:100%;height:100%;border:none;display:block;" allow="fullscreen" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`),document.getElementById("pdf-view-drive").style.background="#0284c7",document.getElementById("pdf-view-drive").style.color="#fff",document.getElementById("pdf-view-native").style.background="#1e293b",document.getElementById("pdf-view-native").style.color="#94a3b8"}),document.getElementById("pdf-open-newtab")?.addEventListener("click",()=>{window.open(r,"_blank")}),document.getElementById("pdf-download-btn")?.addEventListener("click",()=>D(e.id));return}if(o){let S=function(){v&&(v.style.transform=`translate(${k}px, ${c}px) scale(${y}) rotate(${f}deg)`),X&&(X.textContent=`${Math.round(y*100)}%`)};const r=j(e);z.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#0a0e14;user-select:none;">
        <!-- Image Inspection Toolbar -->
        <div style="position:absolute;top:16px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.85);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);padding:6px 14px;border-radius:30px;display:flex;align-items:center;gap:12px;z-index:20;box-shadow:0 10px 25px rgba(0,0,0,0.5);color:#fff;font-size:12px;">
          <button type="button" class="btn btn-ghost btn-sm" id="img-zoom-in" style="color:#fff;padding:4px 8px;" title="${t("تكبير","Zoom In")}">🔍 +</button>
          <span id="img-zoom-level" style="font-weight:700;min-width:44px;text-align:center;">100%</span>
          <button type="button" class="btn btn-ghost btn-sm" id="img-zoom-out" style="color:#fff;padding:4px 8px;" title="${t("تصغير","Zoom Out")}">🔍 -</button>
          <button type="button" class="btn btn-ghost btn-sm" id="img-rotate-btn" style="color:#38bdf8;padding:4px 8px;" title="${t("تدوير 90 درجة","Rotate 90")}">↻ 90°</button>
          <button type="button" class="btn btn-ghost btn-sm" id="img-reset-btn" style="color:#fff;padding:4px 8px;" title="${t("إعادة ضبط","Reset")}">⤢ 100%</button>
        </div>

        <!-- High-Res Image Viewport Canvas -->
        <div id="img-pan-viewport" style="flex:1;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:grab;position:relative;touch-action:none;">
          <img 
            id="active-preview-img" 
            src="${r}" 
            alt="${n(e.originalName)}" 
            style="max-width:92%;max-height:88%;object-fit:contain;border-radius:8px;box-shadow:0 20px 50px rgba(0,0,0,0.7);transition:transform 0.1s ease;transform-origin:center center;pointer-events:none;" 
          />
        </div>
      </div>
    `;let y=1,f=0,k=0,c=0,b=!1,x=null,u=0,m=0;const v=document.getElementById("active-preview-img"),X=document.getElementById("img-zoom-level"),T=document.getElementById("img-pan-viewport");if(document.getElementById("img-zoom-in")?.addEventListener("click",()=>{y=Math.min(5,y+.25),S()}),document.getElementById("img-zoom-out")?.addEventListener("click",()=>{y=Math.max(.4,y-.25),S()}),document.getElementById("img-rotate-btn")?.addEventListener("click",()=>{f=(f+90)%360,S()}),document.getElementById("img-reset-btn")?.addEventListener("click",()=>{y=1,f=0,k=0,c=0,S()}),T){T.addEventListener("wheel",B=>{B.preventDefault();const M=B.deltaY<0?.15:-.15;y=Math.max(.4,Math.min(5,y+M)),S()},{passive:!1}),T.addEventListener("pointerdown",B=>{b=!0,x=B.pointerId;try{T.setPointerCapture(B.pointerId)}catch{}u=B.clientX-k,m=B.clientY-c,T.style.cursor="grabbing"}),T.addEventListener("pointermove",B=>{!b||x!==null&&B.pointerId!==x||(k=B.clientX-u,c=B.clientY-m,S())});const K=B=>{if(b&&(x===null||B.pointerId===x)){b=!1,x=null;try{T.releasePointerCapture(B.pointerId)}catch{}T.style.cursor="grab"}};T.addEventListener("pointerup",K),T.addEventListener("pointercancel",K)}return}if(A){const r=j(e)||"/assets/DARC-VILLA-SITE-PROGRESS-WALKTHROUGH.mp4",y=e.driveFileId&&e.driveFileId.length>=25&&!e.driveFileId.startsWith("demo_")&&e.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(e.driveFileId)}/preview`:R;z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#06090e;color:#f8fafc;overflow:hidden;">
        <!-- Video Architectural Inspection Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:rgba(15,23,42,0.95);border-bottom:1px solid #334155;color:#e2e8f0;font-size:12px;z-index:10;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-weight:900;color:#a855f7;background:rgba(168,85,247,0.15);padding:4px 8px;border-radius:4px;">VIDEO</span>
            <span style="font-weight:700;color:#f8fafc;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${n(e.originalName)}">${n(e.originalName)}</span>
            <span style="color:#64748b;">|</span>
            <span>${p}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <!-- Speed Control -->
            <div style="display:flex;align-items:center;gap:4px;background:#1e293b;padding:2px 8px;border-radius:6px;border:1px solid #334155;">
              <span style="color:#94a3b8;font-size:11px;">⚡</span>
              <select id="video-playback-rate" style="background:transparent;border:none;color:#f8fafc;font-size:11px;font-weight:700;cursor:pointer;outline:none;">
                <option value="0.5" style="background:#1e293b;">0.5x</option>
                <option value="1" selected style="background:#1e293b;">1.0x</option>
                <option value="1.25" style="background:#1e293b;">1.25x</option>
                <option value="1.5" style="background:#1e293b;">1.5x</option>
                <option value="2" style="background:#1e293b;">2.0x</option>
              </select>
            </div>
            <!-- PiP -->
            <button type="button" class="btn btn-sm" id="video-pip-btn" style="background:#1e293b;color:#cbd5e1;border:1px solid #334155;padding:5px 10px;border-radius:6px;font-size:11px;cursor:pointer;" title="${t("صورة داخل صورة","Picture in Picture")}">
              📺 PiP
            </button>
            <!-- Fullscreen -->
            <button type="button" class="btn btn-sm" id="video-fullscreen-btn" style="background:#1e293b;color:#cbd5e1;border:1px solid #334155;padding:5px 10px;border-radius:6px;font-size:11px;cursor:pointer;" title="${t("ملء الشاشة","Fullscreen")}">
              ⛶
            </button>
            <span style="color:rgba(255,255,255,0.3);">|</span>
            <!-- Drive -->
            <button type="button" class="btn btn-sm" id="video-drive-btn" style="background:#1e293b;color:#94a3b8;border:1px solid #334155;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ☁️ ${t("معاينة Google Drive","Drive Preview")}
            </button>
            <!-- Open New Tab -->
            <button type="button" class="btn btn-ghost btn-sm" id="video-open-newtab" style="color:#38bdf8;padding:4px 10px;font-weight:700;" title="${t("فتح في نافذة جديدة","Open in New Tab")}">
              ↗
            </button>
            <!-- Download -->
            <button type="button" class="btn btn-sm btn-primary" id="video-download-btn" style="padding:4px 14px;font-weight:800;background:#0284c7;border:none;color:#fff;cursor:pointer;">
              ⬇️ ${t("تنزيل الفيديو","Download Video")}
            </button>
          </div>
        </div>

        <!-- Video Player Viewport -->
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;background:#000000;position:relative;overflow:hidden;">
          <video 
            id="darc-main-video-player"
            controls 
            autoplay 
            muted 
            playsinline 
            webkit-playsinline="true"
            preload="auto"
            style="width:100%;max-width:1080px;max-height:72vh;border-radius:12px;outline:none;box-shadow:0 25px 60px rgba(0,0,0,0.9);background:#0f172a;object-fit:contain;"
          >
            <source src="${n(r)}" type="video/mp4">
            <p style="color:#ffffff;text-align:center;">${t("متصفحك لا يدعم تشغيل هذا الفيديو مباشرة.","Your browser does not support HTML5 video playback.")}</p>
          </video>

          <!-- Error Alert Overlay (hidden by default) -->
          <div id="video-error-fallback" style="display:none;position:absolute;inset:20px;background:rgba(15,23,42,0.95);border-radius:12px;border:1px dashed #ef4444;align-items:center;justify-content:center;flex-direction:column;gap:12px;padding:30px;text-align:center;">
            <div style="font-size:36px;">⚠️</div>
            <div style="font-size:16px;font-weight:800;color:#f8fafc;">${t("تعذر تشغيل الفيديو المباشر من هذا المصدر","Unable to stream video from this source")}</div>
            <p style="color:#94a3b8;font-size:13px;max-width:460px;margin:0;">
              ${t("قد يكون مسار الملف مقيداً بسياسات الحماية أو غير متاح للمشاهدة المباشرة. يمكنك تنزيل الفيديو لمشاهدته على جهازك فوراً.","The video source might be restricted. You can download the file directly to view it on your device.")}
            </p>
            <button type="button" class="btn btn-primary" id="video-fallback-download-btn" style="padding:8px 20px;border-radius:8px;font-weight:800;">
              ⬇️ ${t("تنزيل ملف الفيديو الأصلي","Download Video File")}
            </button>
          </div>
        </div>
      </div>
    `;const f=document.getElementById("darc-main-video-player"),k=document.getElementById("video-error-fallback");f&&(f.addEventListener("error",()=>{console.warn("[DocViewer] Video failed to stream from primary source:",r),k&&(k.style.display="flex")}),document.querySelectorAll(".video-jump-btn").forEach(c=>{c.addEventListener("click",()=>{const b=parseFloat(c.dataset.sec||"0");f.currentTime=b,f.play().catch(x=>console.warn(x))})}),document.getElementById("video-playback-rate")?.addEventListener("change",c=>{f.playbackRate=parseFloat(c.target.value||"1")}),document.getElementById("video-pip-btn")?.addEventListener("click",async()=>{try{document.pictureInPictureElement?await document.exitPictureInPicture():f.requestPictureInPicture&&await f.requestPictureInPicture()}catch(c){console.warn("[DocViewer] PiP error:",c)}}),document.getElementById("video-fullscreen-btn")?.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen?.().catch(c=>console.warn(c)):f.requestFullscreen?.().catch(c=>console.warn(c))})),document.getElementById("video-drive-btn")?.addEventListener("click",()=>{window.open(y,"_blank")}),document.getElementById("video-open-newtab")?.addEventListener("click",()=>{window.open(r,"_blank")}),document.getElementById("video-download-btn")?.addEventListener("click",()=>D(e.id)),document.getElementById("video-fallback-download-btn")?.addEventListener("click",()=>D(e.id));return}if($||E){const r=e.driveFileId&&e.driveFileId.length>=25&&!e.driveFileId.startsWith("demo_")&&e.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(e.driveFileId)}/preview`:R;z.innerHTML=`
      <div style="width:100%;height:100%;position:relative;display:flex;flex-direction:column;background:#101418;user-select:none;">
        <!-- CAD Inspection Control Panel -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:rgba(16,20,24,0.95);border-bottom:1px solid #1e293b;color:#e2e8f0;font-size:12px;z-index:20;">
          <div style="display:flex;align-items:center;gap:16px;">
            <span style="font-weight:900;color:#0284c7;display:flex;align-items:center;gap:6px;">
              📐 ${a.ext} ${t("عارض المخططات الهندسية (CAD Workspace)","CAD Vector Workspace")}
            </span>
            <span style="color:#64748b;font-size:11px;">${p}</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <button type="button" class="btn btn-secondary btn-sm" id="cad-view-drive" style="font-size:11px;padding:5px 12px;background:#1e293b;border-color:#334155;color:#94a3b8;cursor:pointer;">
              🌐 Google Drive
            </button>
            <button type="button" class="btn btn-secondary btn-sm" id="cad-export-dxf" style="font-size:11px;padding:5px 14px;background:#0284c7;border:none;color:#fff;font-weight:700;cursor:pointer;">
              ⬇️ ${t("تنزيل DWG / DXF","Download DWG")}
            </button>
          </div>
        </div>

        <!-- CAD Vector Viewport -->
        <div id="cad-viewport-container" style="flex:1;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;background:#0b0f14;">
          <div style="text-align:center;padding:40px;max-width:600px;">
            <div style="font-size:48px;margin-bottom:16px;">📐</div>
            <h3 style="color:#f8fafc;font-size:18px;font-weight:800;margin:0 0 8px 0;">${n(e.originalName)}</h3>
            <p style="color:#94a3b8;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${t("ملف أوتوكاد الهندسي المعتمد (AutoCAD Drawing / DXF Vector). جاهز للتحميل والمعاينة المباشرة.","Approved AutoCAD Drawing deliverable. Ready for direct download and engineering review.")}
            </p>
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" id="cad-direct-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#0284c7;color:#fff;border:none;cursor:pointer;">
                ⬇️ ${t("تنزيل ملف CAD الأصلي","Download Original CAD File")} (${p})
              </button>
              <button type="button" class="btn btn-secondary" id="cad-view-drive-cta" style="padding:10px 18px;border-radius:8px;font-weight:700;background:#1e293b;color:#cbd5e1;border:1px solid #334155;cursor:pointer;">
                🌐 ${t("فتح في Google Drive","Open in Google Drive")}
              </button>
            </div>
          </div>
        </div>
      </div>
    `,document.getElementById("cad-view-drive")?.addEventListener("click",()=>{window.open(r,"_blank")}),document.getElementById("cad-view-drive-cta")?.addEventListener("click",()=>{window.open(r,"_blank")}),document.getElementById("cad-export-dxf")?.addEventListener("click",()=>{D(e.id)}),document.getElementById("cad-direct-download")?.addEventListener("click",()=>{D(e.id)});const y=document.getElementById("cad-viewport-container"),f=document.getElementById("cad-coords");y&&f&&y.addEventListener("mousemove",k=>{const c=y.getBoundingClientRect(),b=((k.clientX-c.left)/c.width*24).toFixed(2),x=((k.clientY-c.top)/c.height*16).toFixed(2);f.textContent=`X: ${b}m | Y: ${x}m`})}if(C){const r=j(e),y=r.startsWith("http")?r:typeof window<"u"?`${window.location.origin}${r}`:r,f=e.driveFileId&&e.driveFileId.length>=25&&!e.driveFileId.startsWith("demo_")&&e.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(e.driveFileId)}/preview`:R,k=e.driveFileId&&e.driveFileId.length>=25&&!e.driveFileId.startsWith("demo_")&&e.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?f:`https://docs.google.com/viewer?url=${encodeURIComponent(y)}&embedded=true`;z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);color:var(--text, #0f172a);overflow:hidden;">
        <!-- Excel Action Header -->
        <div style="background:#107c41;color:#ffffff;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 8px rgba(16,124,65,0.25);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#107c41;width:30px;height:30px;border-radius:6px;font-weight:900;font-size:16px;">X</div>
            <div>
              <div style="font-weight:800;font-size:14px;letter-spacing:-0.2px;">${n(e.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Excel Spreadsheet • ${p}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="excel-view-embed" style="background:#ffffff;color:#107c41;border:none;padding:5px 12px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              📊 ${t("معاينة Google Docs المباشرة","Google Docs Viewer")}
            </button>
            <button type="button" class="btn btn-sm" id="excel-view-drive" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ☁️ ${t("معاينة Google Drive","Drive Preview")}
            </button>
            <button type="button" class="btn btn-sm" id="excel-view-info" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">
              ℹ️ ${t("بطاقة المخرج","Deliverable Info")}
            </button>
            <button type="button" class="btn btn-sm" id="excel-open-newtab" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 10px;border-radius:6px;font-size:12px;cursor:pointer;" title="${t("فتح في نافذة جديدة","Open in New Tab")}">
              ↗️
            </button>
            <button type="button" class="btn btn-sm" id="excel-download-btn" style="background:#ffffff;color:#107c41;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:12px;cursor:pointer;">
              ⬇️ ${t("تنزيل XLSX الأصلي","Download XLSX")}
            </button>
          </div>
        </div>

        <!-- Live Embedded Viewer via Google Docs / Drive Embed -->
        <div id="excel-frame-container" style="flex:1;width:100%;height:100%;position:relative;background:#ffffff;">
          <iframe 
            id="excel-embed-iframe" 
            src="${n(k)}" 
            style="width:100%;height:100%;border:none;display:block;" 
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>

        <!-- Deliverable Info Card (toggled via button) -->
        <div id="excel-grid-viewport" style="display:none;flex:1;overflow:auto;background:var(--surface, #ffffff);flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;">
          <div style="max-width:540px;">
            <div style="font-size:48px;margin-bottom:16px;">📊</div>
            <h3 style="color:var(--text, #0f172a);font-size:18px;font-weight:800;margin:0 0 8px 0;">${n(e.originalName)}</h3>
            <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${t("جدول بيانات إكسل حقيقي معتمد. متاح للتنزيل المباشر أو المعاينة السحابية المباشرة.","Authentic Excel spreadsheet deliverable. Available for direct binary download or cloud review.")}
            </p>
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" id="excel-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#107c41;color:#fff;border:none;cursor:pointer;">
                ⬇️ ${t("تنزيل الملف المباشر","Download Original XLSX")} (${p})
              </button>
              <button type="button" class="btn btn-secondary" id="excel-cta-drive" style="padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer;">
                🌐 ${t("فتح عبر Google Drive","Open in Google Drive")}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;const c=document.getElementById("excel-frame-container"),b=document.getElementById("excel-grid-viewport"),x=document.getElementById("excel-embed-iframe"),u=document.getElementById("excel-view-embed"),m=document.getElementById("excel-view-drive"),v=document.getElementById("excel-view-info");u?.addEventListener("click",()=>{c&&b&&x&&(c.style.display="block",b.style.display="none",x.src=k),u.style.background="#ffffff",u.style.color="#107c41",m.style.background="rgba(255,255,255,0.2)",m.style.color="#ffffff",v.style.background="rgba(255,255,255,0.2)",v.style.color="#ffffff"}),m?.addEventListener("click",()=>{c&&b&&x&&(c.style.display="block",b.style.display="none",x.src=f),m.style.background="#ffffff",m.style.color="#107c41",u.style.background="rgba(255,255,255,0.2)",u.style.color="#ffffff",v.style.background="rgba(255,255,255,0.2)",v.style.color="#ffffff"}),v?.addEventListener("click",()=>{c&&b&&(c.style.display="none",b.style.display="flex"),v.style.background="#ffffff",v.style.color="#107c41",u.style.background="rgba(255,255,255,0.2)",u.style.color="#ffffff",m.style.background="rgba(255,255,255,0.2)",m.style.color="#ffffff"}),document.getElementById("excel-open-newtab")?.addEventListener("click",()=>{window.open(r,"_blank")}),document.getElementById("excel-cta-drive")?.addEventListener("click",()=>{window.open(f,"_blank")}),document.getElementById("excel-download-btn")?.addEventListener("click",()=>D(e.id)),document.getElementById("excel-cta-download")?.addEventListener("click",()=>D(e.id));return}if(P){const r=j(e),y=r.startsWith("http")?r:typeof window<"u"?`${window.location.origin}${r}`:r,f=e.driveFileId&&e.driveFileId.length>=25&&!e.driveFileId.startsWith("demo_")&&e.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(e.driveFileId)}/preview`:R,k=e.driveFileId&&e.driveFileId.length>=25&&!e.driveFileId.startsWith("demo_")&&e.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?f:`https://docs.google.com/viewer?url=${encodeURIComponent(y)}&embedded=true`;z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#1e242c;overflow:hidden;">
        <!-- Word Executive Toolbar -->
        <div style="background:#2b579a;color:#ffffff;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(43,87,154,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#2b579a;width:30px;height:30px;border-radius:6px;font-weight:900;font-size:16px;">W</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${n(e.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft Word Document • ${p}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="word-view-embed" style="background:#ffffff;color:#2b579a;border:none;padding:5px 12px;border-radius:4px;font-size:11px;font-weight:800;cursor:pointer;">
              📄 ${t("معاينة Google Docs المباشرة","Google Docs Viewer")}
            </button>
            <button type="button" class="btn btn-sm" id="word-view-drive" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer;">
              🌐 Google Drive
            </button>
            <button type="button" class="btn btn-sm" id="word-view-info" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer;">
              ℹ️ ${t("بطاقة المخرج","Deliverable Info")}
            </button>
            <button type="button" class="btn btn-sm" id="word-open-newtab" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 10px;border-radius:4px;font-size:11px;cursor:pointer;" title="${t("فتح في نافذة جديدة","Open in New Tab")}">
              ↗️
            </button>
            <button type="button" class="btn btn-sm" id="word-download-btn" style="background:#ffffff;color:#2b579a;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:12px;cursor:pointer;">
              ⬇️ ${t("تنزيل DOCX الأصلي","Download DOCX")}
            </button>
          </div>
        </div>

        <!-- Live Embedded Viewer via Google Docs / Drive Embed -->
        <div id="word-frame-container" style="flex:1;width:100%;height:100%;position:relative;background:#ffffff;">
          <iframe 
            id="word-embed-iframe" 
            src="${n(k)}" 
            style="width:100%;height:100%;border:none;display:block;" 
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>

        <!-- Word Workspace Viewport (toggled via button) -->
        <div id="word-main-content-layout" style="display:none;flex:1;align-items:center;justify-content:center;background:#0b0f15;padding:40px;text-align:center;">
          <div style="max-width:540px;">
            <div style="font-size:48px;margin-bottom:16px;">📄</div>
            <h3 style="color:#f8fafc;font-size:18px;font-weight:800;margin:0 0 8px 0;">${n(e.originalName)}</h3>
            <p style="color:#94a3b8;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${t("مستند وورد حقيقي معتمد. متاح للتنزيل المباشر أو المعاينة السحابية المباشرة.","Authentic Word document deliverable. Available for direct binary download or cloud review.")}
            </p>
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" id="word-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#2b579a;color:#fff;border:none;cursor:pointer;">
                ⬇️ ${t("تنزيل الملف المباشر","Download Original DOCX")} (${p})
              </button>
              <button type="button" class="btn btn-secondary" id="word-cta-drive" style="padding:10px 18px;border-radius:8px;font-weight:700;background:#1e293b;color:#cbd5e1;border:1px solid #334155;cursor:pointer;">
                🌐 ${t("فتح عبر Google Drive","Open in Google Drive")}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;const c=document.getElementById("word-frame-container"),b=document.getElementById("word-main-content-layout"),x=document.getElementById("word-embed-iframe"),u=document.getElementById("word-view-embed"),m=document.getElementById("word-view-drive"),v=document.getElementById("word-view-info");u?.addEventListener("click",()=>{c&&b&&x&&(c.style.display="block",b.style.display="none",x.src=k),u.style.background="#ffffff",u.style.color="#2b579a",m.style.background="rgba(255,255,255,0.2)",m.style.color="#ffffff",v.style.background="rgba(255,255,255,0.2)",v.style.color="#ffffff"}),m?.addEventListener("click",()=>{c&&b&&x&&(c.style.display="block",b.style.display="none",x.src=f),m.style.background="#ffffff",m.style.color="#2b579a",u.style.background="rgba(255,255,255,0.2)",u.style.color="#ffffff",v.style.background="rgba(255,255,255,0.2)",v.style.color="#ffffff"}),v?.addEventListener("click",()=>{c&&b&&(c.style.display="none",b.style.display="flex"),v.style.background="#ffffff",v.style.color="#2b579a",u.style.background="rgba(255,255,255,0.2)",u.style.color="#ffffff",m.style.background="rgba(255,255,255,0.2)",m.style.color="#ffffff"}),document.getElementById("word-open-newtab")?.addEventListener("click",()=>{window.open(r,"_blank")}),document.getElementById("word-cta-drive")?.addEventListener("click",()=>{window.open(f,"_blank")}),document.getElementById("word-download-btn")?.addEventListener("click",()=>D(e.id)),document.getElementById("word-cta-download")?.addEventListener("click",()=>D(e.id));return}if(_){const r=j(e),y=r.startsWith("http")?r:typeof window<"u"?`${window.location.origin}${r}`:r,f=e.driveFileId&&e.driveFileId.length>=25&&!e.driveFileId.startsWith("demo_")&&e.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?`https://drive.google.com/file/d/${encodeURIComponent(e.driveFileId)}/preview`:R,k=e.driveFileId&&e.driveFileId.length>=25&&!e.driveFileId.startsWith("demo_")&&e.driveFileId!=="1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH"?f:`https://docs.google.com/viewer?url=${encodeURIComponent(y)}&embedded=true`;z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#0d1117;color:#f0f6fc;overflow:hidden;">
        <!-- PPT Header Control Bar -->
        <div style="background:#d24726;color:#ffffff;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 2px 10px rgba(210,71,38,0.3);z-index:5;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d24726;width:30px;height:30px;border-radius:6px;font-weight:900;font-size:16px;">P</div>
            <div>
              <div style="font-weight:800;font-size:14px;">${n(e.originalName)}</div>
              <div style="font-size:11px;opacity:0.9;">Microsoft PowerPoint Presentation • ${p}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-sm" id="ppt-view-embed" style="background:#ffffff;color:#d24726;border:none;padding:5px 12px;border-radius:6px;font-weight:800;font-size:11px;cursor:pointer;">
              🖥️ ${t("معاينة Google Docs المباشرة","Google Docs Viewer")}
            </button>
            <button type="button" class="btn btn-sm" id="ppt-view-drive" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">
              🌐 Google Drive
            </button>
            <button type="button" class="btn btn-sm" id="ppt-view-info" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">
              ℹ️ ${t("بطاقة المخرج","Deliverable Info")}
            </button>
            <button type="button" class="btn btn-sm" id="ppt-open-newtab" style="background:rgba(255,255,255,0.2);color:#ffffff;border:none;padding:5px 10px;border-radius:6px;font-size:12px;cursor:pointer;" title="${t("فتح في نافذة جديدة","Open in New Tab")}">
              ↗️
            </button>
            <button type="button" class="btn btn-sm" id="ppt-download-btn" style="background:#ffffff;color:#d24726;border:none;padding:5px 14px;border-radius:6px;font-weight:800;font-size:12px;cursor:pointer;">
              ⬇️ ${t("تنزيل PPTX الأصلي","Download PPTX")}
            </button>
          </div>
        </div>

        <!-- Live Embedded Viewer via Google Docs / Drive Embed -->
        <div id="ppt-frame-container" style="flex:1;width:100%;height:100%;position:relative;background:#ffffff;">
          <iframe 
            id="ppt-embed-iframe" 
            src="${n(k)}" 
            style="width:100%;height:100%;border:none;display:block;" 
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>

        <!-- PPT Presentation Canvas Viewport (toggled via button) -->
        <div id="ppt-canvas-container" style="display:none;flex:1;align-items:center;justify-content:center;padding:40px;background:#090d13;overflow:auto;text-align:center;">
          <div style="max-width:540px;">
            <div style="font-size:48px;margin-bottom:16px;">🖥️</div>
            <h3 style="color:#f8fafc;font-size:18px;font-weight:800;margin:0 0 8px 0;">${n(e.originalName)}</h3>
            <p style="color:#94a3b8;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${t("عرض تقديمي باوربوينت حقيقي معتمد. متاح للتنزيل المباشر أو المعاينة السحابية المباشرة.","Authentic PowerPoint presentation deliverable. Available for direct binary download or cloud review.")}
            </p>
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" id="ppt-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#d24726;color:#fff;border:none;cursor:pointer;">
                ⬇️ ${t("تنزيل ملف العرض الأصلي","Download Original PPTX")} (${p})
              </button>
              <button type="button" class="btn btn-secondary" id="ppt-cta-drive" style="padding:10px 18px;border-radius:8px;font-weight:700;background:#161b22;color:#cbd5e1;border:1px solid #30363d;cursor:pointer;">
                🌐 ${t("فتح عبر Google Drive","Open in Google Drive")}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;const c=document.getElementById("ppt-frame-container"),b=document.getElementById("ppt-canvas-container"),x=document.getElementById("ppt-embed-iframe"),u=document.getElementById("ppt-view-embed"),m=document.getElementById("ppt-view-drive"),v=document.getElementById("ppt-view-info");u?.addEventListener("click",()=>{c&&b&&x&&(c.style.display="block",b.style.display="none",x.src=k),u.style.background="#ffffff",u.style.color="#d24726",m.style.background="rgba(255,255,255,0.2)",m.style.color="#ffffff",v.style.background="rgba(255,255,255,0.2)",v.style.color="#ffffff"}),m?.addEventListener("click",()=>{c&&b&&x&&(c.style.display="block",b.style.display="none",x.src=f),m.style.background="#ffffff",m.style.color="#d24726",u.style.background="rgba(255,255,255,0.2)",u.style.color="#ffffff",v.style.background="rgba(255,255,255,0.2)",v.style.color="#ffffff"}),v?.addEventListener("click",()=>{c&&b&&(c.style.display="none",b.style.display="flex"),v.style.background="#ffffff",v.style.color="#d24726",u.style.background="rgba(255,255,255,0.2)",u.style.color="#ffffff",m.style.background="rgba(255,255,255,0.2)",m.style.color="#ffffff"}),document.getElementById("ppt-open-newtab")?.addEventListener("click",()=>{window.open(r,"_blank")}),document.getElementById("ppt-cta-drive")?.addEventListener("click",()=>{window.open(f,"_blank")}),document.getElementById("ppt-download-btn")?.addEventListener("click",()=>D(e.id)),document.getElementById("ppt-cta-download")?.addEventListener("click",()=>D(e.id));return}if(F){z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;background:var(--surface, #ffffff);color:var(--text, #0f172a);overflow:hidden;">
        <!-- Zip Header -->
        <div style="background:#d97706;color:#ffffff;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:center;background:#ffffff;color:#d97706;width:32px;height:32px;border-radius:6px;font-weight:900;font-size:16px;">📦</div>
            <div>
              <div style="font-weight:800;font-size:15px;">${n(e.originalName)}</div>
              <div style="font-size:12px;opacity:0.9;">Archive Deliverable Package • ${p}</div>
            </div>
          </div>
          <button type="button" class="btn btn-sm" id="zip-download-btn" style="background:#ffffff;color:#d97706;border:none;padding:6px 16px;border-radius:6px;font-weight:800;cursor:pointer;">
            ⬇️ ${t("تنزيل كامل الحزمة المضغوطة","Download Full Archive")}
          </button>
        </div>

        <!-- Archive Workspace Viewport -->
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;">
          <div style="max-width:540px;">
            <div style="font-size:48px;margin-bottom:16px;">📦</div>
            <h3 style="color:var(--text, #0f172a);font-size:18px;font-weight:800;margin:0 0 8px 0;">${n(e.originalName)}</h3>
            <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 24px 0;">
              ${t("ملف أرشيف مضغوط حقيقي معتمد. يحتوي على كامل مخرجات المشروع الهندسية جاهزة للتنزيل وفك الضغط.","Authentic archive deliverable. Ready for direct binary download and local extraction.")}
            </p>
            <button type="button" class="btn btn-primary" id="zip-cta-download" style="padding:10px 22px;border-radius:8px;font-weight:800;background:#d97706;color:#fff;border:none;cursor:pointer;">
              ⬇️ ${t("تنزيل الحزمة المضغوطة الآن","Download Archive Now")} (${p})
            </button>
          </div>
        </div>
      </div>
    `,document.getElementById("zip-download-btn")?.addEventListener("click",()=>D(e.id)),document.getElementById("zip-cta-download")?.addEventListener("click",()=>D(e.id));return}!s&&!o&&!A&&!$&&!C&&!P&&!_&&!F&&(z.innerHTML=`
      <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;background:var(--surface, #ffffff);">
        <div style="width:80px;height:80px;border-radius:20px;background:${a.bg};color:${a.color};display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:900;margin-bottom:20px;border:2px solid ${a.border};">
          ${a.ext}
        </div>
        <h2 style="font-size:22px;font-weight:900;margin:0 0 8px 0;color:var(--text, #0f172a);">${n(e.originalName)}</h2>
        <p style="color:#64748b;font-size:14px;max-width:480px;line-height:1.6;margin:0 0 24px 0;">
          ${t("هذا المستند المعماري جاهز للتنزيل المباشر أو الفتح عبر التطبيق الهندسي المختص.","This architectural document is ready for direct download or local desktop review.")}
        </p>
        <div style="display:flex;gap:12px;">
          <button type="button" class="btn btn-primary" id="fallback-download-btn" style="padding:10px 24px;border-radius:8px;font-weight:800;">
            ⬇️ ${t("تنزيل الملف الآن","Download File")} (${p})
          </button>
        </div>
      </div>
    `,document.getElementById("fallback-download-btn")?.addEventListener("click",()=>D(e.id)))}}var fe=J({openUploadDrawingModal:()=>le,renderDocuments:()=>ae});function ae(){const d=I.data?.documents||[],e=I.data?.projects||[],i=I.data?.tasks||[],a=(I.searches?.documents||"").trim().toLowerCase(),l=I.docProjectFilter||"all",p=I.data?.user?.id,s=ee(),$=s||H("review_tasks")||H("approve_tasks")||H("edit_tasks"),E=new Set(i.filter(o=>!o.deletedAt).map(o=>o.id)),C=new Set(e.filter(o=>!o.deletedAt).map(o=>o.id)),P=d.filter(o=>!(o.deletedAt||o.taskId&&!E.has(o.taskId)||o.projectId&&!C.has(o.projectId)||l!=="all"&&o.projectId!==l||a&&!(o.originalName||"").toLowerCase().includes(a))).sort((o,A)=>new Date(A.createdAt||0)-new Date(o.createdAt||0)),_=P.reduce((o,A)=>o+(A.size||0),0),F=_>1073741824?(_/1073741824).toFixed(1)+" GB":_>1048576?(_/1048576).toFixed(1)+" MB":Math.round(_/1024)+" KB";return`
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${t("مركز المخرجات والمخططات الهندسية","DELIVERABLES & BLUEPRINTS CENTER")}</p>
        <h2>${G("documents")}</h2>
        <p class="intro">${t("إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.","Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.")}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        ${H("upload_documents")||s?`
          <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:7px;font-weight:700;box-shadow:0 2px 8px rgba(13,98,105,0.25);">
            ${L("upload",14)}
            <span>${t("رفع مخطط / ملف جديد","Upload Drawing / File")}</span>
          </button>
        `:""}
        <button class="btn btn-secondary btn-sm" data-action="go-to-trash" style="display:inline-flex;align-items:center;gap:6px;" title="${t("الانتقال لسلة المحذوفات لاستعراض واستعادة الملفات والمشاريع المحذوفة","Go to trash bin to review and restore deleted files and projects")}">
          ${L("trash",14)}
          <span>${t("سلة المهملات","Trash")}</span>
        </button>
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;">
          ${P.length} ${t("مخطط / ملف","drawings")} (${F})
        </span>
      </div>
    </div>

    <!-- Filters Bar (Unified View Toolbar) -->
    <div class="view-toolbar" style="margin-bottom:20px;">
      <div class="view-toolbar-start" style="flex:1;">
        <div class="search-box" style="flex:1;max-width:440px;">
          ${L("search",15)}
          <input 
            type="search" 
            placeholder="${t("بحث برقم المخطط أو الاسم أو الامتداد (DWG, PDF, RVT)...","Search by drawing name, code, or format (DWG, PDF, RVT)...")}" 
            value="${n(I.searches?.documents||"")}" 
            data-search="documents" 
            data-action="search-documents" 
          />
        </div>

        <div class="sort-box">
          <span>${t("المشروع:","Project:")}</span>
          <select data-action="doc-project-filter" class="filter-select select-compact" style="min-width:180px;">
            <option value="all" ${l==="all"?"selected":""}>${t("— جميع المشاريع —","— All Projects —")}</option>
            ${e.map(o=>`<option value="${n(o.id)}" ${l===o.id?"selected":""}>${n(o.code)} - ${n(t(o.nameAr,o.nameEn))}</option>`).join("")}
          </select>
        </div>
      </div>

      <div class="view-toolbar-end">
        <span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">
          ${P.length} ${t("مخرجات","deliverables")}
        </span>
      </div>
    </div>

    <!-- Documents Table -->
    <div class="panel">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${t("المخطط / المخرج الهندسي","Drawing / Deliverable")}</th>
              <th>${G("projects")}</th>
              <th>${G("tasks")}</th>
              <th>${t("الإصدار","Revision")}</th>
              <th>${t("الحالة الهندسية","Status")}</th>
              <th>${t("الحجم","Size")}</th>
              <th>${t("تاريخ الرفع","Upload Date")}</th>
              <th style="text-align:end;">${t("الإجراءات","Actions")}</th>
            </tr>
          </thead>
          <tbody>
            ${P.length>0?P.map(o=>{const A=e.find(z=>z.id===o.projectId),g=i.find(z=>z.id===o.taskId),w=O(o.originalName,o.mimeType),h=Y(o.originalName),U=o.size>1048576?(o.size/1048576).toFixed(1)+" MB":Math.round((o.size||0)/1024)+" KB",V=s||H("delete_documents")||o.uploaderId===p;return`
                <tr data-doc-id="${n(o.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${n(o.id)}">
                      <span class="file-format-badge" style="background:${w.bg};color:${w.color};border:1px solid ${w.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${w.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${n(o.originalName)}">
                          ${n(o.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${w.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${A?`<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${n(A.id)}">${n(A.code)}</span>`:"—"}
                  </td>
                  <td>
                    ${g?`<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${n(g.id)}">${n(t(g.titleAr,g.titleEn))}</span>`:'<span style="color:var(--muted);font-size:11px;">مخطط عام</span>'}
                  </td>
                  <td>
                    ${h?`
                      <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                        ${h}
                      </span>
                    `:'<span style="font-size:11px;color:var(--muted);">V1</span>'}
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${$?`
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${n(o.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${o.status==="draft"?"selected":""}>📝 ${t("مسودة عمل","Draft")}</option>
                          <option value="review" ${o.status==="review"?"selected":""}>🔍 ${t("قيد المراجعة","Review")}</option>
                          <option value="approved" ${o.status==="approved"?"selected":""}>✅ ${t("معتمد للتنفيذ","Approved")}</option>
                          <option value="superseded" ${o.status==="superseded"?"selected":""}>⏳ ${t("مستبدل بنسخة أحدث","Superseded")}</option>
                        </select>
                      `:`
                        <span class="status-badge ${n(o.status||"draft")}" style="font-size:11px;">
                          ${n(q(o.status||"draft"))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${U}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${te(o.createdAt,!0)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${n(o.id)}" style="padding:5px;" title="${t("معاينة","Preview")}">
                        ${L("eye",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${n(o.id)}" style="padding:5px;color:var(--teal);" title="${t("نسخ رابط Google Drive","Copy Drive Link")}">
                        ${L("link",14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${n(o.id)}" style="padding:5px;color:var(--blue);" title="${t("تحميل المخطط","Download")}">
                        ${L("download",14)}
                      </button>
                      ${V?`
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${n(o.id)}" style="padding:5px;color:var(--red);" title="${t("نقل لسلة المهملات","Move to trash")}">
                          ${L("trash",14)}
                        </button>
                      `:""}
                    </div>
                  </td>
                </tr>
              `}).join(""):`
              <tr>
                <td colspan="8">
                  <div class="empty" style="padding:40px 20px;">
                    ${L("document",24)}
                    <span>${t("لا توجد ملفات أو مخططات مطابقة للبحث أو الفلترة المحددة.","No drawings or documents found matching the criteria.")}</span>
                  </div>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `}function le(d=null){const e=I.data?.projects||[],i=d||e[0]?.id||"",a=I.data?.tasks?.filter(s=>s.projectId===i&&!s.deletedAt)||[],l=`
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("المشروع المستهدف *","Target Project *")}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${e.map(s=>`<option value="${n(s.id)}" ${s.id===i?"selected":""}>${n(s.code)} - ${n(t(s.nameAr,s.nameEn))}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("المهمة الهندسية (اختياري)","Engineering Task (Optional)")}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>
            ${a.map(s=>`<option value="${n(s.id)}">${n(t(s.titleAr,s.titleEn))}</option>`).join("")}
          </select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("التخصص الهندسي","Engineering Discipline")}</label>
          <select id="drawing-upload-discipline" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="معماري">🏛️ ${t("معماري (Architectural)","Architectural")}</option>
            <option value="إنشائي">🏗️ ${t("إنشائي (Structural)","Structural")}</option>
            <option value="كهرباء">⚡ ${t("كهرباء (Electrical)","Electrical")}</option>
            <option value="ميكانيك وتكييف">🌡️ ${t("ميكانيك وتكييف (HVAC)","HVAC")}</option>
            <option value="سباكة وصحي">💧 ${t("سباكة وصحي (Plumbing)","Plumbing")}</option>
            <option value="مخرجات ثلاثية الأبعاد">📐 ${t("3D / BIM (Revit/SketchUp)","3D / BIM")}</option>
            <option value="عام">📁 ${t("مستندات عامة ومواصفات","General Specs")}</option>
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${t("الحالة الهندسية المبدئية","Initial Approval Status")}</label>
          <select id="drawing-upload-status" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="draft">📝 ${t("مسودة عمل (Draft)","Draft")}</option>
            <option value="review" selected>🔍 ${t("قيد المراجعة الفنية (Under Review)","Under Review")}</option>
            <option value="approved">✅ ${t("معتمد للتنفيذ (Approved for Construction)","Approved for Construction")}</option>
          </select>
        </div>
      </div>

      <!-- File Upload Dropzone -->
      <div class="field">
        <label style="font-size:12px;font-weight:700;">${t("الملفات والمخططات *","Drawings & Files *")}</label>
        <div id="drawing-dropzone" style="border:2px dashed var(--line);border-radius:12px;padding:24px 16px;text-align:center;background:var(--surface);cursor:pointer;transition:border-color 0.2s;">
          <div style="color:var(--teal);margin-bottom:8px;">${L("upload",28)}</div>
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:var(--ink);">${t("اسحب وأفلت المخططات هنا أو انقر للاختيار","Drag & drop drawings here or click to browse")}</p>
          <p style="margin:0;font-size:11px;color:var(--muted);">${t("يدعم ملفات هندسية عملاقة: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (حتى 100GB برفع مستأنف فائق السرعة)","Supports massive engineering files: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (Up to 100GB with resumable chunks)")}</p>
          <input type="file" multiple id="drawing-file-input" style="display:none;" />
        </div>
        <div id="drawing-selected-files-list" style="margin-top:10px;display:grid;gap:6px;"></div>
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;">
        <button type="button" class="btn btn-secondary btn-sm" data-action="close-modal">${t("إلغاء","Cancel")}</button>
        <button type="submit" class="btn btn-primary btn-sm" id="start-drawing-upload-btn" style="font-weight:700;" disabled>
          ${L("upload",14)} <span>${t("بدء الرفع المباشر","Start Resumable Upload")}</span>
        </button>
      </div>
    </form>
  `,p=document.getElementById("modal-root");if(p){p.innerHTML=ne(t("رفع مخطط أو مخرج هندسي جديد","Upload Architectural Deliverable / Drawing"),t("رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.","Upload CAD, BIM, and PDF files with revision numbering and discipline tagging."),l,"upload-drawing","modal-lg");const s=document.getElementById("drawing-upload-project"),$=document.getElementById("drawing-upload-task");s&&$&&s.addEventListener("change",()=>{const g=s.value,w=I.data?.tasks?.filter(h=>h.projectId===g&&!h.deletedAt)||[];$.innerHTML=`<option value="">${t("— مخطط عام لكامل المشروع —","— General Project Drawing —")}</option>`+w.map(h=>`<option value="${n(h.id)}">${n(t(h.titleAr,h.titleEn))}</option>`).join("")});const E=document.getElementById("drawing-dropzone"),C=document.getElementById("drawing-file-input"),P=document.getElementById("drawing-selected-files-list"),_=document.getElementById("start-drawing-upload-btn");let F=[];const o=()=>{if(!F.length){P.innerHTML="",_.disabled=!0;return}_.disabled=!1,P.innerHTML=F.map((g,w)=>{const h=O(g.name,g.type),U=g.size>1048576?(g.size/1048576).toFixed(1)+" MB":Math.round(g.size/1024)+" KB";return`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${h.bg};color:${h.color};border:1px solid ${h.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${h.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${n(g.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${U})</span>
            </div>
            <button type="button" data-file-remove="${w}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `}).join(""),P.querySelectorAll("[data-file-remove]").forEach(g=>{g.addEventListener("click",w=>{const h=parseInt(g.dataset.fileRemove);F.splice(h,1),o()})})};E&&C&&(E.addEventListener("click",()=>C.click()),C.addEventListener("change",()=>{C.files?.length&&(F=Array.from(C.files),o())}),E.addEventListener("dragover",g=>{g.preventDefault(),E.style.borderColor="var(--teal)"}),E.addEventListener("dragleave",()=>{E.style.borderColor="var(--line)"}),E.addEventListener("drop",g=>{g.preventDefault(),E.style.borderColor="var(--line)",g.dataTransfer?.files?.length&&(F=Array.from(g.dataTransfer.files),o())}));const A=document.getElementById("upload-drawing-form");A&&A.addEventListener("submit",async g=>{if(g.preventDefault(),!F.length)return;const w=s.value,h=$.value||null,U=document.getElementById("drawing-upload-discipline")?.value||"عام",V=document.getElementById("drawing-upload-status")?.value||"draft";oe(),typeof window.uploadDirectFiles=="function"&&window.uploadDirectFiles({files:F,projectId:w,taskId:h,discipline:U,status:V})})}}export{Q as a,D as i,le as n,re as o,W as r,pe as s,fe as t};
