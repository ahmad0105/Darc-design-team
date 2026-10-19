import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { choose, esc, can, t, icon } from '../../core/utils.js';
import { showToast, modalShell } from '../../shared/ui.js';

export const TEMPLATE_CATEGORIES = [
  { id: 'architectural', ar: 'معماري', en: 'Architectural', icon: '🏛️' },
  { id: 'electrical', ar: 'كهرباء — إلكتروميكانيك', en: 'Electrical', icon: '⚡' },
  { id: 'plumbing', ar: 'سباكة — إلكتروميكانيك', en: 'Plumbing', icon: '💧' },
  { id: 'hvac', ar: 'تكييف — إلكتروميكانيك', en: 'HVAC', icon: '🌡️' },
  { id: 'fire', ar: 'حريق — إلكتروميكانيك', en: 'Fire Protection', icon: '🧯' },
  { id: 'low_current', ar: 'تيار خفيف', en: 'Low Current', icon: '📡' },
  { id: 'sections', ar: 'مقاطع', en: 'Sections', icon: '✂️' },
  { id: 'detail', ar: 'تفصيلي', en: 'Detailed', icon: '🔍' },
  { id: 'site', ar: 'موقع عام', en: 'Site Plan', icon: '🗺️' },
  { id: 'quantity', ar: 'جداول كميات', en: 'Quantity Tables', icon: '📊' },
  { id: 'documents', ar: 'وثائق وخطابات', en: 'Documents & Letters', icon: '📄' }
];

export function renderTemplates() {
  const query = state.searches.templates.trim().toLowerCase();
  const sortedTemplates = [...(state.data.templates || [])].sort((a, b) => (parseInt(a.code, 10) || 0) - (parseInt(b.code, 10) || 0));

  const categoryCounts = new Map();
  TEMPLATE_CATEGORIES.forEach(c => categoryCounts.set(c.id, 0));
  sortedTemplates.forEach(t => {
    categoryCounts.set(t.categoryId, (categoryCounts.get(t.categoryId) || 0) + 1);
  });

  const activeCategory = state.templateCategory || 'all';

  const groups = TEMPLATE_CATEGORIES.map(cat => {
    if (activeCategory !== 'all' && activeCategory !== cat.id) return null;

    const items = sortedTemplates.filter(t => {
      if (t.categoryId !== cat.id) return false;
      if (!query) return true;
      return `${t.nameAr} ${t.nameEn} ${t.code} ${t.typeAr} ${t.typeEn}`.toLowerCase().includes(query);
    });

    if (!items.length) return null;
    return { ...cat, items };
  }).filter(Boolean);

  return `<div class="page-head">
    <div>
      <p class="eyebrow">${choose('مخرجات DARC القياسية', 'DARC STANDARD DELIVERABLES')}</p>
      <h1>${t('templates')}</h1>
      <p>${t('standardLibrarySub')}</p>
    </div>
    <div class="page-actions">
      <span class="mini-badge" style="padding:9px 11px;color:var(--teal);background:var(--mint);font-weight:700;">${sortedTemplates.length} ${t('templatesCount')}</span>
      ${can('manage_templates') ? `<button class="btn btn-primary" data-action="new-template" style="margin-${state.lang === 'ar' ? 'right' : 'left'}:10px">${icon('plus', 15)} ${choose('إضافة قالب', 'Add Template')}</button>` : ''}
    </div>
  </div>
  <div class="view-toolbar">
    <div class="view-toolbar-start">
      <div class="search-box">
        ${icon('search', 15)}
        <input data-search="templates" value="${esc(state.searches.templates)}" placeholder="${t('search')}" />
      </div>
    </div>
  </div>
  <div class="template-layout">
    <aside class="template-sidebar">
      <button class="template-category-tab ${activeCategory === 'all' ? 'active' : ''}" data-action="template-category" data-category="all">
        <span class="category-icon">◌</span>
        <span>${t('all')}</span>
        <small>${sortedTemplates.length}</small>
      </button>
      ${TEMPLATE_CATEGORIES.map(cat => `
        <button class="template-category-tab ${activeCategory === cat.id ? 'active' : ''}" data-action="template-category" data-category="${esc(cat.id)}">
          <span class="category-icon">${esc(cat.icon)}</span>
          <span>${esc(choose(cat.ar, cat.en))}</span>
          <small>${categoryCounts.get(cat.id) || 0}</small>
        </button>
      `).join('')}
    </aside>
    <div>
      ${groups.length ? groups.map(group => `
        <section class="template-section">
          <div class="template-section-head">
            <span class="category-icon">${esc(group.icon)}</span>
            <div>
              <h3>${esc(choose(group.ar, group.en))}</h3>
              <span>${group.items.length} ${t('templatesCount')}</span>
            </div>
          </div>
          <div class="template-grid">
            ${group.items.map(template => `
              <article class="template-item" style="position:relative;cursor:${can('manage_templates') ? 'pointer' : 'default'};" ${can('manage_templates') ? `data-action="edit-template" data-template-id="${esc(template.id)}"` : ''}>
                <span class="template-number">${esc(template.code)}</span>
                <div class="template-copy">
                  <strong>${esc(choose(template.nameAr, template.nameEn))}</strong>
                  <span>${esc(state.lang === 'ar' ? template.nameEn : template.nameAr)}</span>
                </div>
                <span class="mini-badge" style="background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);font-size:11px;font-weight:600;padding:2px 8px;border-radius:6px;margin-inline-start:auto;">${esc(template.typeAr || 'مخطط')}</span>
                <button class="btn btn-secondary btn-sm" data-action="use-template" data-template-id="${esc(template.id)}" title="${t('useTemplate')}" style="padding:3px 8px;font-size:11px;margin-inline-start:6px;display:inline-flex;align-items:center;gap:4px;border-radius:6px;">
                  ${icon('plus', 12)}
                  <span>${t('useTemplate')}</span>
                </button>
                ${can('manage_templates') ? `<button class="template-action" data-action="edit-template" data-template-id="${esc(template.id)}" title="${t('edit')}" style="background:var(--surface-soft);color:var(--ink-soft);border-radius:6px;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);margin-${state.lang === 'ar' ? 'right' : 'left'}:6px">${icon('edit', 14)}</button>` : ''}
              </article>
            `).join('')}
          </div>
        </section>
      `).join('') : `
        <section class="panel">
          <div class="empty">
            ${icon('layers', 18)}
            <span>${t('noTasks')}</span>
          </div>
        </section>
      `}
    </div>
  </div>`;
}

export function openTemplateModal(template = null) {
  if (!can('manage_templates')) return showToast(t('permissionDenied'), true);

  const categoryOptions = TEMPLATE_CATEGORIES.map((c) => `<option value="${esc(c.id)}" ${template?.categoryId === c.id ? 'selected' : ''}>${esc(choose(c.ar, c.en))}</option>`).join('');
  
  const form = `<form id="template-form" data-template-id="${esc(template?.id || '')}">
    <div class="form-grid">
      <div class="field">
        <label>${t('nameAr')}</label>
        <input name="nameAr" value="${esc(template?.nameAr || '')}" required />
      </div>
      <div class="field">
        <label>${t('nameEn')}</label>
        <input name="nameEn" value="${esc(template?.nameEn || '')}" required />
      </div>
      <div class="field">
        <label>${choose('الرمز / الكود', 'Code')}</label>
        <input name="code" value="${esc(template?.code || '')}" placeholder="e.g. 01" />
      </div>
      <div class="field">
        <label>${choose('التصنيف', 'Category')}</label>
        <select name="categoryId" required>${categoryOptions}</select>
      </div>
      <div class="field">
        <label>${choose('النوع (عربي)', 'Type (Ar)')}</label>
        <input name="typeAr" value="${esc(template?.typeAr || 'مخطط')}" required />
      </div>
      <div class="field">
        <label>${choose('النوع (إنجليزي)', 'Type (En)')}</label>
        <input name="typeEn" value="${esc(template?.typeEn || 'Drawing')}" required />
      </div>
      <div class="field">
        <label>${choose('الوزن الافتراضي', 'Default Weight')}</label>
        <input name="defaultWeight" type="number" min="1" value="${template?.defaultWeight || 1}" required />
      </div>
      <div class="field">
        <label>${choose('المدة الافتراضية (أيام)', 'Default Duration (Days)')}</label>
        <input name="defaultDuration" type="number" min="1" value="${template?.defaultDuration || 5}" required />
      </div>
    </div>
    <div class="modal-actions" style="display:flex;justify-content:space-between;width:100%">
      ${template ? `<button type="button" class="btn btn-ghost" data-action="delete-template" data-template-id="${esc(template.id)}" style="color:var(--red)">${icon('trash', 14)} ${t('delete')}</button>` : '<div></div>'}
      <div style="display:flex;gap:10px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t('cancel')}</button>
        <button type="submit" class="btn btn-primary">${icon('check', 14)} ${template ? t('save') : t('create')}</button>
      </div>
    </div>
  </form>`;
  
  document.getElementById('modal-root').innerHTML = modalShell(template ? choose('تعديل قالب', 'Edit Template') : choose('إضافة قالب جديد', 'Add New Template'), choose('القوالب تساعد الفريق على إدراج المهام بسرعة وبمعايير ثابتة.', 'Templates help the team insert tasks quickly with standard criteria.'), form, 'template');
}
