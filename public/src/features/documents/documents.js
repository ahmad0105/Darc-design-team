// DARC Design Team — Documents Feature Module
import { state } from '../../core/state.js';
import { choose, t, esc, icon, dateLabel, statusText, can, isAdmin, getFileFormatInfo, extractDrawingVersion } from '../../core/utils.js';
import { modalShell, closeModal } from '../../shared/ui.js';

export function renderDocuments() {
  const documents = state.data?.documents || [];
  const projects = state.data?.projects || [];
  const tasks = state.data?.tasks || [];
  const searchQuery = (state.searches?.documents || '').trim().toLowerCase();
  const projectFilter = state.docProjectFilter || 'all';

  const currentUserId = state.data?.user?.id;
  const userIsAdmin = isAdmin();
  const canManageStatus = userIsAdmin || can('review_tasks') || can('approve_tasks') || can('edit_tasks');
  const activeTaskIds = new Set(tasks.filter(t => !t.deletedAt).map(t => t.id));
  const activeProjectIds = new Set(projects.filter(p => !p.deletedAt).map(p => p.id));

  // Filter out soft-deleted documents AND orphan documents from deleted tasks or deleted projects
  const filteredDocs = documents.filter((doc) => {
    if (doc.deletedAt) return false;
    if (doc.taskId && !activeTaskIds.has(doc.taskId)) return false;
    if (doc.projectId && !activeProjectIds.has(doc.projectId)) return false;

    if (projectFilter !== 'all' && doc.projectId !== projectFilter) return false;
    if (searchQuery) {
      const name = (doc.originalName || '').toLowerCase();
      if (!name.includes(searchQuery)) return false;
    }
    return true;
  }).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  const totalSize = filteredDocs.reduce((acc, d) => acc + (d.size || 0), 0);
  const totalSizeFormatted = totalSize > 1024 * 1024 * 1024 
    ? (totalSize / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
    : totalSize > 1024 * 1024 
      ? (totalSize / (1024 * 1024)).toFixed(1) + ' MB'
      : Math.round(totalSize / 1024) + ' KB';

  return `
    <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <p class="eyebrow">${choose('مركز المخرجات والمخططات الهندسية', 'DELIVERABLES & BLUEPRINTS CENTER')}</p>
        <h2>${t('documents')}</h2>
        <p class="intro">${choose('إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.', 'Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.')}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        ${(can('upload_documents') || userIsAdmin) ? `
          <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:7px;font-weight:700;box-shadow:0 2px 8px rgba(13,98,105,0.25);">
            ${icon('upload', 14)}
            <span>${choose('رفع مخطط / ملف جديد', 'Upload Drawing / File')}</span>
          </button>
        ` : ''}
        <button class="btn btn-secondary btn-sm" data-action="go-to-trash" style="display:inline-flex;align-items:center;gap:6px;" title="${choose('الانتقال لسلة المحذوفات لاستعراض واستعادة الملفات والمشاريع المحذوفة', 'Go to trash bin to review and restore deleted files and projects')}">
          ${icon('trash', 14)}
          <span>${choose('سلة المهملات', 'Trash')}</span>
        </button>
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;">
          ${filteredDocs.length} ${choose('مخطط / ملف', 'drawings')} (${totalSizeFormatted})
        </span>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="filters-bar" style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;align-items:center;">
      <div class="search-input" style="flex:1;min-width:240px;position:relative;">
        <input 
          type="search" 
          placeholder="${choose('بحث برقم المخطط أو الاسم أو الامتداد (DWG, PDF, RVT)...', 'Search by drawing name, code, or format (DWG, PDF, RVT)...')}" 
          value="${esc(state.searches?.documents || '')}" 
          data-action="search-documents" 
          style="width:100%;padding:9px 12px;padding-inline-start:34px;background:var(--surface);border:1px solid var(--line);border-radius:10px;font-size:13px;"
        />
        <span style="position:absolute;inset-inline-start:10px;top:50%;transform:translateY(-50%);color:var(--ink-soft);pointer-events:none;">
          ${icon('search', 15)}
        </span>
      </div>

      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:12px;color:var(--ink-soft);">${choose('المشروع:', 'Project:')}</span>
        <select data-action="doc-project-filter" style="padding:8px 12px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);font-size:12px;min-width:180px;">
          <option value="all" ${projectFilter === 'all' ? 'selected' : ''}>${choose('— جميع المشاريع —', '— All Projects —')}</option>
          ${projects.map(p => `<option value="${esc(p.id)}" ${projectFilter === p.id ? 'selected' : ''}>${esc(p.code)} - ${esc(choose(p.nameAr, p.nameEn))}</option>`).join('')}
        </select>
      </div>
    </div>

    <!-- Documents Table -->
    <div class="panel">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${choose('المخطط / المخرج الهندسي', 'Drawing / Deliverable')}</th>
              <th>${t('projects')}</th>
              <th>${t('tasks')}</th>
              <th>${choose('الإصدار', 'Revision')}</th>
              <th>${choose('الحالة الهندسية', 'Status')}</th>
              <th>${choose('الحجم', 'Size')}</th>
              <th>${choose('تاريخ الرفع', 'Upload Date')}</th>
              <th style="text-align:end;">${choose('الإجراءات', 'Actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${filteredDocs.length > 0 ? filteredDocs.map((doc) => {
              const proj = projects.find(p => p.id === doc.projectId);
              const task = tasks.find(t => t.id === doc.taskId);
              const fmt = getFileFormatInfo(doc.originalName, doc.mimeType);
              const version = extractDrawingVersion(doc.originalName);
              const sizeMB = doc.size > 1024 * 1024 
                ? (doc.size / (1024 * 1024)).toFixed(1) + ' MB' 
                : Math.round((doc.size || 0) / 1024) + ' KB';

              const canDeleteDoc = userIsAdmin || can('delete_documents') || doc.uploaderId === currentUserId;

              return `
                <tr data-doc-id="${esc(doc.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${esc(doc.id)}">
                      <span class="file-format-badge" style="background:${fmt.bg};color:${fmt.color};border:1px solid ${fmt.border};font-size:10px;font-weight:900;padding:4px 7px;border-radius:6px;flex-shrink:0;letter-spacing:0.5px;">
                        ${fmt.ext}
                      </span>
                      <div style="min-width:0;">
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(doc.originalName)}">
                          ${esc(doc.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${fmt.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${proj ? `<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${esc(proj.id)}">${esc(proj.code)}</span>` : '—'}
                  </td>
                  <td>
                    ${task ? `<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${esc(task.id)}">${esc(choose(task.titleAr, task.titleEn))}</span>` : '<span style="color:var(--muted);font-size:11px;">مخطط عام</span>'}
                  </td>
                  <td>
                    ${version ? `
                      <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                        ${version}
                      </span>
                    ` : `<span style="font-size:11px;color:var(--muted);">V1</span>`}
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${canManageStatus ? `
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${esc(doc.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${doc.status === 'draft' ? 'selected' : ''}>📝 ${choose('مسودة عمل', 'Draft')}</option>
                          <option value="review" ${doc.status === 'review' ? 'selected' : ''}>🔍 ${choose('قيد المراجعة', 'Review')}</option>
                          <option value="approved" ${doc.status === 'approved' ? 'selected' : ''}>✅ ${choose('معتمد للتنفيذ', 'Approved')}</option>
                          <option value="superseded" ${doc.status === 'superseded' ? 'selected' : ''}>⏳ ${choose('مستبدل بنسخة أحدث', 'Superseded')}</option>
                        </select>
                      ` : `
                        <span class="status-badge ${esc(doc.status || 'draft')}" style="font-size:11px;">
                          ${esc(statusText(doc.status || 'draft'))}
                        </span>
                      `}
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${sizeMB}</td>
                  <td style="font-size:12px;color:var(--ink-soft);">${dateLabel(doc.createdAt, true)}</td>
                  <td style="text-align:end;">
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                      <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${esc(doc.id)}" style="padding:5px;" title="${choose('معاينة', 'Preview')}">
                        ${icon('eye', 14)}
                      </button>
                      <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${esc(doc.id)}" style="padding:5px;color:var(--teal);" title="${choose('نسخ الرابط', 'Copy Link')}">
                        ${icon('link', 14)}
                      </button>
                      <a href="/api/documents/${esc(doc.id)}" target="_blank" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${choose('تحميل', 'Download')}">
                        ${icon('download', 14)}
                      </a>
                      ${canDeleteDoc ? `
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${esc(doc.id)}" style="padding:5px;color:var(--red);" title="${choose('نقل لسلة المهملات', 'Move to trash')}">
                          ${icon('trash', 14)}
                        </button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('') : `
              <tr>
                <td colspan="8">
                  <div class="empty" style="padding:40px 20px;">
                    ${icon('document', 24)}
                    <span>${choose('لا توجد ملفات أو مخططات مطابقة للبحث أو الفلترة المحددة.', 'No drawings or documents found matching the criteria.')}</span>
                  </div>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function openUploadDrawingModal(preselectedProjectId = null) {
  const projects = state.data?.projects || [];
  const selectedProjId = preselectedProjectId || projects[0]?.id || '';
  const filteredTasks = state.data?.tasks?.filter(t => t.projectId === selectedProjId && !t.deletedAt) || [];

  const formBody = `
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${choose('المشروع المستهدف *', 'Target Project *')}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${projects.map(p => `<option value="${esc(p.id)}" ${p.id === selectedProjId ? 'selected' : ''}>${esc(p.code)} - ${esc(choose(p.nameAr, p.nameEn))}</option>`).join('')}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${choose('المهمة الهندسية (اختياري)', 'Engineering Task (Optional)')}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${choose('— مخطط عام لكامل المشروع —', '— General Project Drawing —')}</option>
            ${filteredTasks.map(t => `<option value="${esc(t.id)}">${esc(choose(t.titleAr, t.titleEn))}</option>`).join('')}
          </select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${choose('التخصص الهندسي', 'Engineering Discipline')}</label>
          <select id="drawing-upload-discipline" style="width:100%;min-height:44px;padding:8px 12px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="معماري">🏛️ ${choose('معماري (Architectural)', 'Architectural')}</option>
            <option value="إنشائي">🏗️ ${choose('إنشائي (Structural)', 'Structural')}</option>
            <option value="كهرباء">⚡ ${choose('كهرباء (Electrical)', 'Electrical')}</option>
            <option value="ميكانيك وتكييف">🌡️ ${choose('ميكانيك وتكييف (HVAC)', 'HVAC')}</option>
            <option value="سباكة وصحي">💧 ${choose('سباكة وصحي (Plumbing)', 'Plumbing')}</option>
            <option value="مخرجات ثلاثية الأبعاد">📐 ${choose('3D / BIM (Revit/SketchUp)', '3D / BIM')}</option>
            <option value="عام">📁 ${choose('مستندات عامة ومواصفات', 'General Specs')}</option>
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${choose('الحالة الهندسية المبدئية', 'Initial Approval Status')}</label>
          <select id="drawing-upload-status" style="width:100%;min-height:44px;padding:8px 12px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="draft">📝 ${choose('مسودة عمل (Draft)', 'Draft')}</option>
            <option value="review" selected>🔍 ${choose('قيد المراجعة الفنية (Under Review)', 'Under Review')}</option>
            <option value="approved">✅ ${choose('معتمد للتنفيذ (Approved for Construction)', 'Approved for Construction')}</option>
          </select>
        </div>
      </div>

      <!-- File Upload Dropzone -->
      <div class="field">
        <label style="font-size:12px;font-weight:700;">${choose('الملفات والمخططات *', 'Drawings & Files *')}</label>
        <div id="drawing-dropzone" style="border:2px dashed var(--line);border-radius:12px;padding:24px 16px;text-align:center;background:var(--surface);cursor:pointer;transition:border-color 0.2s;">
          <div style="color:var(--teal);margin-bottom:8px;">${icon('upload', 28)}</div>
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:var(--ink);">${choose('اسحب وأفلت المخططات هنا أو انقر للاختيار', 'Drag & drop drawings here or click to browse')}</p>
          <p style="margin:0;font-size:11px;color:var(--muted);">${choose('يدعم ملفات هندسية عملاقة: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (حتى 100GB برفع مستأنف فائق السرعة)', 'Supports massive engineering files: DWG, DXF, RVT, IFC, SKP, PDF, ZIP (Up to 100GB with resumable chunks)')}</p>
          <input type="file" multiple id="drawing-file-input" style="display:none;" />
        </div>
        <div id="drawing-selected-files-list" style="margin-top:10px;display:grid;gap:6px;"></div>
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;">
        <button type="button" class="btn btn-secondary btn-sm" data-action="close-modal">${choose('إلغاء', 'Cancel')}</button>
        <button type="submit" class="btn btn-primary btn-sm" id="start-drawing-upload-btn" style="font-weight:700;" disabled>
          ${icon('upload', 14)} <span>${choose('بدء الرفع المباشر', 'Start Resumable Upload')}</span>
        </button>
      </div>
    </form>
  `;

  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    modalRoot.innerHTML = modalShell(
      choose('رفع مخطط أو مخرج هندسي جديد', 'Upload Architectural Deliverable / Drawing'),
      choose('رفع ملفات CAD و BIM و PDF مع توثيق الإصدارات والتخصص الهندسي.', 'Upload CAD, BIM, and PDF files with revision numbering and discipline tagging.'),
      formBody,
      'upload-drawing',
      'modal-lg'
    );

    // Setup project change dynamic task population
    const projSelect = document.getElementById('drawing-upload-project');
    const taskSelect = document.getElementById('drawing-upload-task');
    if (projSelect && taskSelect) {
      projSelect.addEventListener('change', () => {
        const pId = projSelect.value;
        const pTasks = state.data?.tasks?.filter(t => t.projectId === pId && !t.deletedAt) || [];
        taskSelect.innerHTML = `<option value="">${choose('— مخطط عام لكامل المشروع —', '— General Project Drawing —')}</option>` +
          pTasks.map(t => `<option value="${esc(t.id)}">${esc(choose(t.titleAr, t.titleEn))}</option>`).join('');
      });
    }

    // Dropzone trigger
    const dropzone = document.getElementById('drawing-dropzone');
    const fileInput = document.getElementById('drawing-file-input');
    const listContainer = document.getElementById('drawing-selected-files-list');
    const submitBtn = document.getElementById('start-drawing-upload-btn');

    let _selectedFiles = [];

    const renderSelectedFiles = () => {
      if (!_selectedFiles.length) {
        listContainer.innerHTML = '';
        submitBtn.disabled = true;
        return;
      }
      submitBtn.disabled = false;
      listContainer.innerHTML = _selectedFiles.map((file, i) => {
        const fmt = getFileFormatInfo(file.name, file.type);
        const sz = file.size > 1024 * 1024 ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' : Math.round(file.size / 1024) + ' KB';
        return `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:12px;">
            <div style="display:flex;align-items:center;gap:8px;min-width:0;">
              <span class="file-format-badge" style="background:${fmt.bg};color:${fmt.color};border:1px solid ${fmt.border};font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;">${fmt.ext}</span>
              <span style="font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;">${esc(file.name)}</span>
              <span style="color:var(--muted);font-size:11px;">(${sz})</span>
            </div>
            <button type="button" data-file-remove="${i}" style="background:transparent;border:0;color:var(--red);cursor:pointer;font-size:16px;">&times;</button>
          </div>
        `;
      }).join('');

      listContainer.querySelectorAll('[data-file-remove]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.dataset.fileRemove);
          _selectedFiles.splice(idx, 1);
          renderSelectedFiles();
        });
      });
    };

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', () => {
        if (fileInput.files?.length) {
          _selectedFiles = Array.from(fileInput.files);
          renderSelectedFiles();
        }
      });

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--teal)';
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = 'var(--line)';
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--line)';
        if (e.dataTransfer?.files?.length) {
          _selectedFiles = Array.from(e.dataTransfer.files);
          renderSelectedFiles();
        }
      });
    }

    // Submit handler
    const form = document.getElementById('upload-drawing-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!_selectedFiles.length) return;

        const projectId = projSelect.value;
        const taskId = taskSelect.value || null;
        const discipline = document.getElementById('drawing-upload-discipline')?.value || 'عام';
        const status = document.getElementById('drawing-upload-status')?.value || 'draft';

        // Close modal and launch direct upload
        closeModal();

        if (typeof window.uploadDirectFiles === 'function') {
          window.uploadDirectFiles({
            files: _selectedFiles,
            projectId,
            taskId,
            discipline,
            status
          });
        }
      });
    }
  }
}
