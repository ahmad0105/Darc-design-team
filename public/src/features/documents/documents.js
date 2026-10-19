// DARC Design Team — Documents Feature Module
import { state } from '../../core/state.js';
import { choose, t, esc, icon, dateLabel, statusText } from '../../core/utils.js';

export function renderDocuments() {
  const documents = state.data?.documents || [];
  const projects = state.data?.projects || [];
  const tasks = state.data?.tasks || [];
  const searchQuery = (state.searches?.documents || '').trim().toLowerCase();
  const projectFilter = state.docProjectFilter || 'all';

  const filteredDocs = documents.filter((doc) => {
    if (doc.deletedAt) return false;
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
        <p class="eyebrow">${choose('مركز المخرجات والمخططات', 'DELIVERABLES & BLUEPRINTS CENTER')}</p>
        <h2>${t('documents')}</h2>
        <p class="intro">${choose('استعراض وتحميل ومعاينة كافة المخططات والمستندات المرفوعة في جميع المشاريع.', 'Browse, preview, and download all architectural blueprints and documents uploaded across projects.')}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;">
          ${filteredDocs.length} ${choose('ملف', 'files')} (${totalSizeFormatted})
        </span>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="filters-bar" style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;align-items:center;">
      <div class="search-input" style="flex:1;min-width:240px;position:relative;">
        <input 
          type="search" 
          placeholder="${choose('بحث في أسماء الملفات والمخططات...', 'Search file and drawing names...')}" 
          value="${esc(state.searches?.documents || '')}" 
          data-action="search-documents" 
          style="width:100%;padding:9px 12px;padding-inline-start:34px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:13px;"
        />
        <span style="position:absolute;inset-inline-start:10px;top:50%;transform:translateY(-50%);color:var(--ink-soft);pointer-events:none;">
          ${icon('search', 15)}
        </span>
      </div>

      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:12px;color:var(--ink-soft);">${choose('المشروع:', 'Project:')}</span>
        <select data-action="doc-project-filter" style="padding:8px 12px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);font-size:12px;min-width:180px;">
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
              <th>${choose('اسم المخطط / الملف', 'File / Blueprint Name')}</th>
              <th>${t('projects')}</th>
              <th>${t('tasks')}</th>
              <th>${choose('الحالة', 'Status')}</th>
              <th>${choose('الحجم', 'Size')}</th>
              <th>${choose('تاريخ الرفع', 'Upload Date')}</th>
              <th style="text-align:end;">${choose('الإجراءات', 'Actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${filteredDocs.length > 0 ? filteredDocs.map((doc) => {
              const proj = projects.find(p => p.id === doc.projectId);
              const task = tasks.find(t => t.id === doc.taskId);
              const sizeMB = doc.size > 1024 * 1024 
                ? (doc.size / (1024 * 1024)).toFixed(1) + ' MB' 
                : Math.round((doc.size || 0) / 1024) + ' KB';

              return `
                <tr data-doc-id="${esc(doc.id)}">
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${esc(doc.id)}">
                      <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                        ${icon('document', 15)}
                      </span>
                      <div>
                        <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(doc.originalName)}">
                          ${esc(doc.originalName)}
                        </strong>
                        <span style="font-size:11px;color:var(--muted);">${esc(doc.mimeType || 'application/octet-stream')}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${proj ? `<span class="badge badge-neutral" style="font-size:11px;cursor:pointer;" data-action="open-project" data-project-id="${esc(proj.id)}">${esc(proj.code)}</span>` : '—'}
                  </td>
                  <td>
                    ${task ? `<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${esc(task.id)}">${esc(choose(task.titleAr, task.titleEn))}</span>` : '—'}
                  </td>
                  <td>
                    <span class="status-badge ${esc(doc.status || 'draft')}" style="font-size:11px;">
                      ${esc(statusText(doc.status || 'draft'))}
                    </span>
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
                    </div>
                  </td>
                </tr>
              `;
            }).join('') : `
              <tr>
                <td colspan="7">
                  <div class="empty" style="padding:40px 20px;">
                    ${icon('document', 24)}
                    <span>${choose('لا توجد ملفات مطابقة للبحث أو الفلترة المحددة.', 'No documents found matching the criteria.')}</span>
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
