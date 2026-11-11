// DARC Design Team — Deliverables & Engineering Blueprints Module
// World-class architectural documents hub with dual Visual Grid & Executive Table modes
// Seamless multi-discipline filtering, instant in-place search, and revision management

import { state } from '../../core/state.js';
import { 
  choose, 
  t, 
  esc, 
  icon, 
  dateLabel, 
  statusText, 
  can, 
  isAdmin, 
  getFileFormatInfo, 
  extractDrawingVersion, 
  detectDocumentDiscipline, 
  getDisciplineInfo,
  normalizeArabic 
} from '../../core/utils.js';
import { modalShell, closeModal } from '../../shared/ui.js';
import { getRealAssetUrl, getDocumentShareableLink } from './doc-viewer.js';

export function renderDocuments() {
  const documents = state.data?.documents || [];
  const projects = state.data?.projects || [];
  const tasks = state.data?.tasks || [];

  const searchQuery = (state.searches?.documents || '').trim().toLowerCase();
  const projectFilter = state.docProjectFilter || 'all';
  const disciplineFilter = state.docDisciplineFilter || 'all';
  const statusFilter = state.docStatusFilter || 'all';
  const sortOrder = state.docSortOrder || 'newest';
  const viewMode = state.docViewMode || 'grid';

  const currentUserId = state.data?.user?.id;
  const userIsAdmin = isAdmin();
  const canManageStatus = userIsAdmin || can('review_tasks') || can('approve_tasks') || can('edit_tasks');
  const canUpload = can('upload_documents') || userIsAdmin;

  const activeTaskIds = new Set(tasks.filter(t => !t.deletedAt).map(t => t.id));
  const activeProjectIds = new Set(projects.filter(p => !p.deletedAt).map(p => p.id));

  // 1. Filter out soft-deleted documents AND orphan documents from deleted projects
  const filteredDocs = documents.filter((doc) => {
    if (doc.deletedAt) return false;
    if (doc.projectId && !activeProjectIds.has(doc.projectId)) return false;
    if (!doc.projectId && doc.taskId && !activeTaskIds.has(doc.taskId)) return false;

    // Project filter
    if (projectFilter !== 'all' && doc.projectId !== projectFilter) return false;

    // Discipline filter
    if (disciplineFilter !== 'all') {
      const disc = detectDocumentDiscipline(doc);
      if (disc !== disciplineFilter) return false;
    }

    // Status filter
    if (statusFilter !== 'all') {
      const docSt = doc.status || 'draft';
      if (docSt !== statusFilter) return false;
    }

    // Search query
    if (searchQuery) {
      const q = normalizeArabic(searchQuery);
      const name = normalizeArabic(doc.originalName || doc.name || '');
      const proj = projects.find(p => p.id === doc.projectId);
      const projCode = normalizeArabic(proj?.code || '');
      const projName = normalizeArabic(choose(proj?.nameAr, proj?.nameEn || ''));
      const version = normalizeArabic(extractDrawingVersion(doc.originalName) || '');
      const fmt = getFileFormatInfo(doc.originalName, doc.mimeType);
      const ext = (fmt.ext || '').toLowerCase();

      const match = name.includes(q) ||
                    projCode.includes(q) ||
                    projName.includes(q) ||
                    version.includes(q) ||
                    ext.includes(q);
      if (!match) return false;
    }

    return true;
  });

  // 2. Sort documents according to user preference
  filteredDocs.sort((a, b) => {
    if (sortOrder === 'oldest') {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }
    if (sortOrder === 'name') {
      return (a.originalName || '').localeCompare(b.originalName || '');
    }
    if (sortOrder === 'size') {
      return (b.size || 0) - (a.size || 0);
    }
    // Default 'newest'
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  // Metrics computation
  const totalSize = filteredDocs.reduce((acc, d) => acc + (d.size || 0), 0);
  const totalSizeFormatted = totalSize > 1024 * 1024 * 1024 
    ? (totalSize / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
    : totalSize > 1024 * 1024 
      ? (totalSize / (1024 * 1024)).toFixed(1) + ' MB'
      : Math.round(totalSize / 1024) + ' KB';

  const approvedCount = filteredDocs.filter(d => d.status === 'approved').length;
  const reviewCount = filteredDocs.filter(d => d.status === 'review' || !d.status).length;

  return `
    <!-- Header -->
    <div class="page-head">
      <div>
        <p class="eyebrow">${choose('مركز المخرجات والمخططات الهندسية', 'DELIVERABLES & BLUEPRINTS CENTER')}</p>
        <h1>${t('documents')}</h1>
        <p>${choose('إدارة وتحميل ومعاينة المخططات المعمارية والإنشائية، ومتابعة إصدارات المخرجات (V1, V2, V3) واعتماداتها.', 'Manage, upload, and preview architectural drawings, track revisions (V1, V2, V3), and engineering approvals.')}</p>
      </div>
      <div class="page-actions">
        ${canUpload ? `
          <button class="btn btn-primary" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:7px;">
            ${icon('upload', 15)}
            <span>${choose('رفع مخطط / ملف جديد', 'Upload Drawing / File')}</span>
          </button>
        ` : ''}
        <button class="btn btn-secondary btn-sm" data-action="go-to-trash" style="display:inline-flex;align-items:center;gap:6px;" title="${choose('الانتقال لسلة المحذوفات لاستعراض واستعادة الملفات والمشاريع المحذوفة', 'Go to trash bin to review and restore deleted files and projects')}">
          ${icon('trash', 15)}
          <span>${choose('سلة المهملات', 'Trash')}</span>
        </button>
        <span class="mini-badge badge-pulse" style="padding:6px 12px;font-weight:700;font-size:12px;display:inline-flex;align-items:center;gap:6px;">
          <span>${filteredDocs.length} ${choose('مخرج', 'files')}</span>
          <span style="opacity:0.6;">•</span>
          <span>${totalSizeFormatted}</span>
        </span>
      </div>
    </div>

    <!-- Quick Stats Metric Pills -->
    <div class="documents-stats-strip" style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
      <div class="mini-badge" style="padding:6px 12px;background:var(--surface);border:1px solid var(--line);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--teal);"></span>
        <span>${choose('معتمد للتنفيذ:', 'Approved:')} <strong>${approvedCount}</strong></span>
      </div>
      <div class="mini-badge" style="padding:6px 12px;background:var(--surface);border:1px solid var(--line);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber);"></span>
        <span>${choose('قيد المراجعة الفنية:', 'Under Review:')} <strong>${reviewCount}</strong></span>
      </div>
      <div class="mini-badge" style="padding:6px 12px;background:var(--surface);border:1px solid var(--line);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        ${icon('folder', 12)}
        <span>${choose('المشاريع النشطة:', 'Active Projects:')} <strong>${projects.filter(p => !p.deletedAt).length}</strong></span>
      </div>
    </div>

    <!-- Unified Responsive View Toolbar -->
    <div class="view-toolbar documents-toolbar" style="gap:10px;flex-wrap:wrap;align-items:center;">
      <div class="view-toolbar-start documents-toolbar-start" style="flex:1 1 auto;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        
        <!-- 0ms Instant In-Place Search Box -->
        <div class="search-box documents-search-box" style="min-width:240px;flex:1 1 260px;">
          ${icon('search', 15)}
          <input 
            type="search" 
            placeholder="${choose('بحث برقم المخطط أو الاسم أو الامتداد (DWG, PDF, RVT)...', 'Search by drawing name, code, or format (DWG, PDF, RVT)...')}" 
            value="${esc(state.searches?.documents || '')}" 
            data-search="documents" 
            data-action="search-documents" 
          />
        </div>

        <!-- Project Selector -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${icon('building', 13)} ${choose('المشروع:', 'Project:')}</span>
          <select data-action="doc-project-filter" class="filter-select select-compact documents-select" style="min-width:160px;">
            <option value="all" ${projectFilter === 'all' ? 'selected' : ''}>${choose('— جميع المشاريع —', '— All Projects —')}</option>
            ${projects.map(p => `<option value="${esc(p.id)}" ${projectFilter === p.id ? 'selected' : ''}>${esc(p.code)} - ${esc(choose(p.nameAr, p.nameEn))}</option>`).join('')}
          </select>
        </div>

        <!-- Discipline Filter -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${icon('layers', 13)} ${choose('التخصص:', 'Discipline:')}</span>
          <select data-action="doc-discipline-filter" class="filter-select select-compact documents-select" style="min-width:140px;">
            <option value="all" ${disciplineFilter === 'all' ? 'selected' : ''}>${choose('— كل التخصصات —', '— All Disciplines —')}</option>
            <option value="architectural" ${disciplineFilter === 'architectural' ? 'selected' : ''}>${choose('معماري (Architectural)', 'Architectural')}</option>
            <option value="structural" ${disciplineFilter === 'structural' ? 'selected' : ''}>${choose('إنشائي (Structural)', 'Structural')}</option>
            <option value="mep" ${disciplineFilter === 'mep' ? 'selected' : ''}>${choose('كهروميكانيكي (MEP)', 'MEP Systems')}</option>
            <option value="boq" ${disciplineFilter === 'boq' ? 'selected' : ''}>${choose('كميات ومواصفات (BOQ)', 'BOQ & Specs')}</option>
            <option value="contracts" ${disciplineFilter === 'contracts' ? 'selected' : ''}>${choose('عقود وتراخيص (Contracts)', 'Contracts & Permits')}</option>
          </select>
        </div>

        <!-- Status Filter -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${icon('shield', 13)} ${choose('الحالة:', 'Status:')}</span>
          <select data-action="doc-status-filter" class="filter-select select-compact documents-select" style="min-width:130px;">
            <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>${choose('— كل الحالات —', '— All Statuses —')}</option>
            <option value="approved" ${statusFilter === 'approved' ? 'selected' : ''}>${choose('معتمد للتنفيذ', 'Approved')}</option>
            <option value="review" ${statusFilter === 'review' ? 'selected' : ''}>${choose('قيد المراجعة', 'Under Review')}</option>
            <option value="draft" ${statusFilter === 'draft' ? 'selected' : ''}>${choose('مسودة عمل', 'Draft')}</option>
            <option value="superseded" ${statusFilter === 'superseded' ? 'selected' : ''}>${choose('مستبدل بنسخة أحدث', 'Superseded')}</option>
          </select>
        </div>

        <!-- Sort Order -->
        <div class="sort-box documents-filter-group" style="flex:0 1 auto;">
          <span class="documents-filter-label">${icon('clock', 13)} ${choose('الترتيب:', 'Sort:')}</span>
          <select data-action="doc-sort-order" class="filter-select select-compact documents-select" style="min-width:130px;">
            <option value="newest" ${sortOrder === 'newest' ? 'selected' : ''}>${choose('الأحدث رفعاً', 'Newest First')}</option>
            <option value="oldest" ${sortOrder === 'oldest' ? 'selected' : ''}>${choose('الأقدم رفعاً', 'Oldest First')}</option>
            <option value="name" ${sortOrder === 'name' ? 'selected' : ''}>${choose('الاسم (أ - ي)', 'Name (A-Z)')}</option>
            <option value="size" ${sortOrder === 'size' ? 'selected' : ''}>${choose('الحجم (الأكبر)', 'Size (Largest)')}</option>
          </select>
        </div>

      </div>

      <!-- View Switcher (Grid vs Table) -->
      <div class="view-toolbar-end documents-toolbar-end" style="display:flex;align-items:center;gap:8px;">
        <div class="doc-view-toggle" style="display:inline-flex;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:3px;gap:2px;">
          <button 
            type="button" 
            class="btn btn-sm ${viewMode === 'grid' ? 'active' : ''}" 
            data-action="toggle-doc-view" 
            data-view-mode="grid"
            style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:8px;font-weight:700;font-size:12px;border:none;cursor:pointer;transition:all 0.15s;${viewMode === 'grid' ? 'background:var(--teal);color:#fff;box-shadow:0 2px 6px rgba(13,98,105,0.3);' : 'background:transparent;color:var(--ink-soft);'}"
            title="${choose('عرض الشبكة المعمارية', 'Visual Blueprint Grid')}"
          >
            ${icon('grid', 14)}
            <span>${choose('شبكة', 'Grid')}</span>
          </button>
          <button 
            type="button" 
            class="btn btn-sm ${viewMode === 'table' ? 'active' : ''}" 
            data-action="toggle-doc-view" 
            data-view-mode="table"
            style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:8px;font-weight:700;font-size:12px;border:none;cursor:pointer;transition:all 0.15s;${viewMode === 'table' ? 'background:var(--teal);color:#fff;box-shadow:0 2px 6px rgba(13,98,105,0.3);' : 'background:transparent;color:var(--ink-soft);'}"
            title="${choose('عرض الجدول التنفيذي', 'Engineering Data Table')}"
          >
            ${icon('list', 14)}
            <span>${choose('جدول', 'Table')}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Active Documents Presentation Mode -->
    ${viewMode === 'grid' ? renderDocumentsGrid(filteredDocs, projects, tasks, canManageStatus, userIsAdmin, currentUserId) : renderDocumentsTable(filteredDocs, projects, tasks, canManageStatus, userIsAdmin, currentUserId)}
  `;
}

/**
 * World-Class Visual Blueprint Grid Renderer
 */
function renderDocumentsGrid(docs, projects, tasks, canManageStatus, userIsAdmin, currentUserId) {
  if (!docs.length) {
    return renderEmptyDocumentsState();
  }

  return `
    <div class="documents-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(295px, 1fr));gap:16px;margin-top:14px;">
      ${docs.map(doc => {
        const proj = projects.find(p => p.id === doc.projectId);
        const task = tasks.find(t => t.id === doc.taskId);
        const fmt = getFileFormatInfo(doc.originalName, doc.mimeType);
        const version = extractDrawingVersion(doc.originalName) || 'V1';
        const discKey = detectDocumentDiscipline(doc);
        const disc = getDisciplineInfo(discKey);
        const sizeFormatted = doc.size > 1024 * 1024 
          ? (doc.size / (1024 * 1024)).toFixed(1) + ' MB' 
          : Math.round((doc.size || 0) / 1024) + ' KB';
        const canDeleteDoc = userIsAdmin || can('delete_documents') || doc.uploaderId === currentUserId;
        const realAssetUrl = getRealAssetUrl(doc);
        const shareLink = getDocumentShareableLink(doc);

        return `
          <div class="doc-blueprint-card" data-doc-id="${esc(doc.id)}" style="background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 4px 16px rgba(0,0,0,0.03);transition:transform 0.2s cubic-bezier(0.16,1,0.3,1),box-shadow 0.2s cubic-bezier(0.16,1,0.3,1),border-color 0.2s;">
            
            <!-- Blueprint Thumbnail Banner -->
            <div class="doc-card-banner" data-action="preview-doc" data-doc-id="${esc(doc.id)}" style="height:148px;position:relative;background:var(--surface-soft);overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none;border-bottom:1px solid var(--line);">
              ${fmt.isImg && realAssetUrl ? `
                <img 
                  src="${esc(realAssetUrl)}" 
                  alt="${esc(doc.originalName)}" 
                  loading="lazy" 
                  decoding="async" 
                  style="width:100%;height:100%;object-fit:cover;transition:transform 0.3s ease;" 
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
                />
                <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;flex-direction:column;gap:8px;">
                  <span style="background:${fmt.bg};color:${fmt.color};border:1px solid ${fmt.border};font-size:12px;font-weight:900;padding:6px 14px;border-radius:8px;">${fmt.ext}</span>
                </div>
              ` : `
                <!-- Architectural Blueprint Vector Grid Backdrop -->
                <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(13,98,105,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,98,105,0.05) 1px, transparent 1px);background-size:14px 14px;pointer-events:none;"></div>
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;z-index:2;">
                  <span style="background:${fmt.bg};color:${fmt.color};border:1px solid ${fmt.border};font-size:13px;font-weight:900;padding:6px 16px;border-radius:8px;letter-spacing:0.8px;box-shadow:0 4px 12px rgba(0,0,0,0.04);">
                    ${fmt.ext}
                  </span>
                  <span style="font-size:11px;font-weight:700;color:var(--muted);">${fmt.label}</span>
                </div>
              `}

              <!-- Top Floating Badges (Discipline & Version) -->
              <div style="position:absolute;top:10px;left:10px;right:10px;display:flex;align-items:center;justify-content:space-between;pointer-events:none;z-index:3;">
                <span style="background:${disc.bg};color:${disc.color};border:1px solid ${disc.border};font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);">
                  ${choose(disc.labelAr, disc.labelEn)}
                </span>
                <span class="version-badge" style="background:rgba(15,23,42,0.78);color:#ffffff;border:1px solid rgba(255,255,255,0.15);font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);">
                  ${version}
                </span>
              </div>

              <!-- Hover Eye Overlay Button -->
              <div class="doc-card-hover-overlay" style="position:absolute;inset:0;background:rgba(8,14,18,0.45);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);opacity:0;transition:opacity 0.2s ease;display:flex;align-items:center;justify-content:center;z-index:4;">
                <span class="btn btn-sm" style="background:#ffffff;color:var(--ink);font-weight:800;font-size:12px;padding:6px 14px;border-radius:8px;box-shadow:0 4px 14px rgba(0,0,0,0.25);display:inline-flex;align-items:center;gap:6px;">
                  ${icon('eye', 14)} <span>${choose('معاينة سريعة', 'Quick Preview')}</span>
                </span>
              </div>
            </div>

            <!-- Card Body -->
            <div class="doc-card-body" style="padding:14px 16px;display:flex;flex-direction:column;gap:10px;flex:1;">
              
              <!-- Title -->
              <div>
                <h4 
                  data-action="preview-doc" 
                  data-doc-id="${esc(doc.id)}" 
                  style="margin:0;font-size:13.5px;font-weight:800;color:var(--ink);cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;" 
                  title="${esc(doc.originalName)}"
                >
                  ${esc(doc.originalName)}
                </h4>
                <div style="display:flex;align-items:center;gap:6px;margin-top:3px;font-size:11px;color:var(--muted);">
                  <span>${sizeFormatted}</span>
                  <span>•</span>
                  <span>${dateLabel(doc.createdAt, true)}</span>
                </div>
              </div>

              <!-- Project & Task Attribution Tags -->
              <div style="display:flex;flex-direction:column;gap:5px;font-size:11.5px;">
                <div style="display:flex;align-items:center;gap:6px;color:var(--ink-soft);">
                  ${icon('building', 12)}
                  ${proj ? `
                    <span 
                      data-action="open-project" 
                      data-project-id="${esc(proj.id)}" 
                      style="font-weight:700;color:var(--teal);cursor:pointer;text-decoration:none;"
                    >
                      ${esc(proj.code)} - ${esc(choose(proj.nameAr, proj.nameEn))}
                    </span>
                  ` : '<span style="color:var(--muted);">—</span>'}
                </div>

                <div style="display:flex;align-items:center;gap:6px;color:var(--muted);">
                  ${icon('checklist', 12)}
                  ${task ? `
                    <span 
                      data-action="open-task" 
                      data-task-id="${esc(task.id)}" 
                      style="cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink-soft);"
                    >
                      ${esc(choose(task.titleAr, task.titleEn))}
                    </span>
                  ` : `<span>${choose('مخطط عام للمشروع', 'General Project Drawing')}</span>`}
                </div>
              </div>

              <!-- Approval Status Selector / Badge -->
              <div style="margin-top:auto;padding-top:6px;">
                ${canManageStatus ? `
                  <select 
                    class="select-compact doc-status-select" 
                    data-action="change-doc-status" 
                    data-doc-id="${esc(doc.id)}" 
                    style="width:100%;font-size:11.5px;font-weight:700;padding:5px 10px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;"
                  >
                    <option value="draft" ${doc.status === 'draft' ? 'selected' : ''}>${choose('مسودة عمل (Draft)', 'Draft')}</option>
                    <option value="review" ${doc.status === 'review' ? 'selected' : ''}>${choose('قيد المراجعة الفنية (Under Review)', 'Under Review')}</option>
                    <option value="approved" ${doc.status === 'approved' ? 'selected' : ''}>${choose('معتمد للتنفيذ (Approved)', 'Approved')}</option>
                    <option value="superseded" ${doc.status === 'superseded' ? 'selected' : ''}>${choose('مستبدل بنسخة أحدث (Superseded)', 'Superseded')}</option>
                  </select>
                ` : `
                  <span class="status-badge ${esc(doc.status || 'draft')}" style="font-size:11px;display:inline-block;padding:3px 8px;border-radius:6px;">
                    ${esc(statusText(doc.status || 'draft'))}
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
                  data-doc-id="${esc(doc.id)}" 
                  style="padding:4px 8px;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px;color:var(--teal);"
                  title="${choose('معاينة المخطط في المشغل المدمج', 'Preview Drawing')}"
                >
                  ${icon('eye', 13)}
                  <span>${choose('معاينة', 'Preview')}</span>
                </button>

                <a 
                  href="${esc(shareLink)}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-sm btn-ghost" 
                  style="padding:4px 8px;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px;color:var(--ink-soft);text-decoration:none;"
                  title="${choose('فتح في Google Drive', 'Open in Google Drive')}"
                >
                  ${icon('external', 12)}
                  <span>Drive</span>
                </a>
              </div>

              <div style="display:inline-flex;align-items:center;gap:4px;">
                <button 
                  type="button" 
                  class="btn btn-sm btn-ghost" 
                  data-action="download-doc" 
                  data-doc-id="${esc(doc.id)}" 
                  style="padding:5px;color:var(--blue);" 
                  title="${choose('تحميل المخطط مباشرة', 'Download')}"
                >
                  ${icon('download', 14)}
                </button>

                ${canDeleteDoc ? `
                  <button 
                    type="button" 
                    class="btn btn-sm btn-ghost" 
                    data-action="delete-doc" 
                    data-doc-id="${esc(doc.id)}" 
                    style="padding:5px;color:var(--red);" 
                    title="${choose('نقل لسلة المهملات', 'Move to trash')}"
                  >
                    ${icon('trash', 14)}
                  </button>
                ` : ''}
              </div>
            </div>

          </div>
        `;
      }).join('')}
    </div>
  `;
}

/**
 * Executive Engineering Data Table Renderer
 */
function renderDocumentsTable(docs, projects, tasks, canManageStatus, userIsAdmin, currentUserId) {
  if (!docs.length) {
    return renderEmptyDocumentsState();
  }

  return `
    <div class="panel" style="margin-top:14px;">
      <div class="table-wrap">
        <table class="data-table documents-table">
          <thead>
            <tr>
              <th>${choose('المخطط / المخرج الهندسي', 'Drawing / Deliverable')}</th>
              <th>${t('projects')}</th>
              <th>${t('tasks')}</th>
              <th>${choose('الإصدار', 'Revision')}</th>
              <th>${choose('التخصص', 'Discipline')}</th>
              <th>${choose('الحالة الهندسية', 'Status')}</th>
              <th>${choose('الحجم', 'Size')}</th>
              <th>${choose('تاريخ الرفع', 'Upload Date')}</th>
              <th style="text-align:end;">${choose('الإجراءات', 'Actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${docs.map((doc) => {
              const proj = projects.find(p => p.id === doc.projectId);
              const task = tasks.find(t => t.id === doc.taskId);
              const fmt = getFileFormatInfo(doc.originalName, doc.mimeType);
              const version = extractDrawingVersion(doc.originalName) || 'V1';
              const discKey = detectDocumentDiscipline(doc);
              const disc = getDisciplineInfo(discKey);
              const sizeMB = doc.size > 1024 * 1024 
                ? (doc.size / (1024 * 1024)).toFixed(1) + ' MB' 
                : Math.round((doc.size || 0) / 1024) + ' KB';
              const canDeleteDoc = userIsAdmin || can('delete_documents') || doc.uploaderId === currentUserId;
              const shareLink = getDocumentShareableLink(doc);

              return `
                <tr data-doc-id="${esc(doc.id)}" class="doc-row">
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
                    ${task ? `<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${esc(task.id)}">${esc(choose(task.titleAr, task.titleEn))}</span>` : `<span style="color:var(--muted);font-size:11px;">${choose('مخطط عام', 'General Drawing')}</span>`}
                  </td>
                  <td>
                    <span class="version-badge" style="display:inline-block;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);">
                      ${version}
                    </span>
                  </td>
                  <td>
                    <span style="background:${disc.bg};color:${disc.color};border:1px solid ${disc.border};font-size:10px;font-weight:800;padding:2px 7px;border-radius:6px;">
                      ${choose(disc.labelAr, disc.labelEn)}
                    </span>
                  </td>
                  <td>
                    <div class="doc-status-cell">
                      ${canManageStatus ? `
                        <select class="select-compact doc-status-select" data-action="change-doc-status" data-doc-id="${esc(doc.id)}" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);cursor:pointer;">
                          <option value="draft" ${doc.status === 'draft' ? 'selected' : ''}>${choose('مسودة عمل', 'Draft')}</option>
                          <option value="review" ${doc.status === 'review' ? 'selected' : ''}>${choose('قيد المراجعة', 'Review')}</option>
                          <option value="approved" ${doc.status === 'approved' ? 'selected' : ''}>${choose('معتمد للتنفيذ', 'Approved')}</option>
                          <option value="superseded" ${doc.status === 'superseded' ? 'selected' : ''}>${choose('مستبدل بنسخة أحدث', 'Superseded')}</option>
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
                      <a href="${esc(shareLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" style="padding:5px;color:var(--teal);text-decoration:none;" title="${choose('فتح في Google Drive', 'Open in Google Drive')}">
                        ${icon('external', 13)}
                      </a>
                      <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${esc(doc.id)}" style="padding:5px;color:var(--blue);" title="${choose('تحميل المخطط', 'Download')}">
                        ${icon('download', 14)}
                      </button>
                      ${canDeleteDoc ? `
                        <button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${esc(doc.id)}" style="padding:5px;color:var(--red);" title="${choose('نقل لسلة المهملات', 'Move to trash')}">
                          ${icon('trash', 14)}
                        </button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * Modern Architectural Empty State
 */
function renderEmptyDocumentsState() {
  return `
    <div class="empty" style="padding:60px 20px;background:var(--surface);border:1px dashed var(--line);border-radius:14px;margin-top:16px;text-align:center;">
      <div style="color:var(--teal);margin-bottom:12px;">${icon('document', 40)}</div>
      <h3 style="margin:0 0 6px;font-size:16px;font-weight:800;color:var(--ink);">${choose('لا توجد مخططات أو ملفات مطابقة', 'No blueprints or documents found')}</h3>
      <p style="margin:0 0 16px;font-size:13px;color:var(--muted);max-width:440px;margin-inline:auto;">
        ${choose('لم يتم العثور على أي ملفات تطابق معايير البحث والفلترة المحددة. يمكنك تعديل خيارات التصفية أو رفع مخرج هندسي جديد.', 'No deliverables match the specified filters. Try adjusting your search or upload a new engineering drawing.')}
      </p>
      ${(can('upload_documents') || isAdmin()) ? `
        <button class="btn btn-primary btn-sm" data-action="open-upload-drawing-modal" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;">
          ${icon('upload', 14)}
          <span>${choose('رفع مخطط جديد الآن', 'Upload New Drawing')}</span>
        </button>
      ` : ''}
    </div>
  `;
}

/**
 * Modal for uploading new architectural drawings & deliverables
 */
export function openUploadDrawingModal(preselectedProjectId = null) {
  const projects = state.data?.projects || [];
  const selectedProjId = preselectedProjectId || projects[0]?.id || '';
  const filteredTasks = state.data?.tasks?.filter(t => t.projectId === selectedProjId && !t.deletedAt) || [];

  const formBody = `
    <form id="upload-drawing-form" style="padding:16px 20px 20px;display:grid;gap:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${choose('المشروع المستهدف *', 'Target Project *')}</label>
          <select id="drawing-upload-project" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;" required>
            ${projects.map(p => `<option value="${esc(p.id)}" ${p.id === selectedProjId ? 'selected' : ''}>${esc(p.code)} - ${esc(choose(p.nameAr, p.nameEn))}</option>`).join('')}
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${choose('المهمة الهندسية (اختياري)', 'Engineering Task (Optional)')}</label>
          <select id="drawing-upload-task" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="">${choose('— مخطط عام لكامل المشروع —', '— General Project Drawing —')}</option>
            ${filteredTasks.map(t => `<option value="${esc(t.id)}">${esc(choose(t.titleAr, t.titleEn))}</option>`).join('')}
          </select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="field">
          <label style="font-size:12px;font-weight:700;">${choose('التخصص الهندسي', 'Engineering Discipline')}</label>
          <select id="drawing-upload-discipline" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="architectural">${choose('معماري (Architectural)', 'Architectural')}</option>
            <option value="structural">${choose('إنشائي (Structural)', 'Structural')}</option>
            <option value="mep">${choose('كهروميكانيكي (MEP)', 'MEP')}</option>
            <option value="boq">${choose('كميات ومواصفات (BOQ & Specs)', 'BOQ & Specs')}</option>
            <option value="contracts">${choose('عقود وتراخيص (Contracts)', 'Contracts & Permits')}</option>
            <option value="general">${choose('مستندات عامة', 'General')}</option>
          </select>
        </div>

        <div class="field">
          <label style="font-size:12px;font-weight:700;">${choose('الحالة الهندسية المبدئية', 'Initial Approval Status')}</label>
          <select id="drawing-upload-status" style="width:100%;min-height:44px;padding:8px 12px 8px 36px;font-size:13px;line-height:1.6;border:1px solid var(--line);border-radius:10px;background-color:var(--surface);color:var(--ink);box-sizing:border-box;">
            <option value="draft">${choose('مسودة عمل (Draft)', 'Draft')}</option>
            <option value="review" selected>${choose('قيد المراجعة الفنية (Under Review)', 'Under Review')}</option>
            <option value="approved">${choose('معتمد للتنفيذ (Approved for Construction)', 'Approved for Construction')}</option>
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
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.fileRemove, 10);
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
        const discipline = document.getElementById('drawing-upload-discipline')?.value || 'architectural';
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
