import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { choose, esc, can, t, icon } from '../../core/utils.js';
import { showToast, modalShell } from '../../shared/ui.js';

export const TEMPLATE_CATEGORIES = [
  { id: 'architectural', ar: 'معماري', en: 'Architectural', iconName: 'building' },
  { id: 'electrical', ar: 'كهرباء — إلكتروميكانيك', en: 'Electrical', iconName: 'zap' },
  { id: 'plumbing', ar: 'سباكة — إلكتروميكانيك', en: 'Plumbing', iconName: 'droplet' },
  { id: 'hvac', ar: 'تكييف — إلكتروميكانيك', en: 'HVAC', iconName: 'thermometer' },
  { id: 'fire', ar: 'حريق — إلكتروميكانيك', en: 'Fire Protection', iconName: 'flame' },
  { id: 'low_current', ar: 'تيار خفيف', en: 'Low Current', iconName: 'signal' },
  { id: 'sections', ar: 'مقاطع', en: 'Sections', iconName: 'layers' },
  { id: 'detail', ar: 'تفصيلي', en: 'Detailed', iconName: 'search' },
  { id: 'site', ar: 'موقع عام', en: 'Site Plan', iconName: 'globe' },
  { id: 'quantity', ar: 'جداول كميات', en: 'Quantity Tables', iconName: 'chart' },
  { id: 'documents', ar: 'وثائق وخطابات', en: 'Documents & Letters', iconName: 'document' }
];

export function renderTemplates() {
  const query = (state.searches?.templates || '').trim().toLowerCase();
  const sortedTemplates = [...(state.data?.templates || [])].sort((a, b) => (parseInt(a.code, 10) || 0) - (parseInt(b.code, 10) || 0));

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
      <span class="mini-badge badge-pulse" style="padding:7px 12px;font-weight:700;">${sortedTemplates.length} ${t('templatesCount')}</span>
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
        <span class="category-icon">${icon('layers', 15)}</span>
        <span>${t('all')}</span>
        <small>${sortedTemplates.length}</small>
      </button>
      ${TEMPLATE_CATEGORIES.map(cat => `
        <button class="template-category-tab ${activeCategory === cat.id ? 'active' : ''}" data-action="template-category" data-category="${esc(cat.id)}">
          <span class="category-icon">${icon(cat.iconName || 'document', 16)}</span>
          <span>${esc(choose(cat.ar, cat.en))}</span>
          <small>${categoryCounts.get(cat.id) || 0}</small>
        </button>
      `).join('')}
    </aside>
    <div>
      ${groups.length ? groups.map(group => `
        <section class="template-section">
          <div class="template-section-head">
            <span class="category-icon">${icon(group.iconName || 'document', 18)}</span>
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
                ${can('manage_templates') ? `<button class="template-action" data-action="edit-template" data-template-id="${esc(template.id)}" title="${t('edit')}" style="margin-${state.lang === 'ar' ? 'right' : 'left'}:auto">${icon('edit', 14)}</button>` : ''}
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

export function getNextAvailableTemplateCode(templates = []) {
  const usedNumbers = new Set();
  for (const t of templates) {
    if (t?.code !== undefined && t?.code !== null) {
      const str = String(t.code).trim();
      if (/^\d+$/.test(str)) {
        const num = parseInt(str, 10);
        if (num > 0) usedNumbers.add(num);
      }
    }
  }
  let candidate = 1;
  while (usedNumbers.has(candidate)) {
    candidate++;
  }
  return candidate < 10 ? `0${candidate}` : `${candidate}`;
}

export function isTemplateCodeReserved(code, excludeTemplateId = null, templates = []) {
  if (!code || typeof code !== 'string') return false;
  const clean = code.trim().toLowerCase();
  if (!clean) return false;

  const cleanNum = /^\d+$/.test(clean) ? parseInt(clean, 10) : null;

  return templates.some(t => {
    if (!t) return false;
    if (excludeTemplateId && t.id === excludeTemplateId) return false;
    if (t.code === undefined || t.code === null) return false;

    const existing = String(t.code).trim().toLowerCase();
    if (!existing) return false;

    // Direct case-insensitive match
    if (existing === clean) return true;

    // Numeric equivalence (e.g. "1" matches "01")
    if (cleanNum !== null && /^\d+$/.test(existing)) {
      const existingNum = parseInt(existing, 10);
      if (cleanNum === existingNum) return true;
    }

    return false;
  });
}

export function openTemplateModal(template = null) {
  if (!can('manage_templates')) return showToast(t('permissionDenied'), true);

  const categoryOptions = TEMPLATE_CATEGORIES.map((c) => `<option value="${esc(c.id)}" ${template?.categoryId === c.id ? 'selected' : ''}>${esc(choose(c.ar, c.en))}</option>`).join('');
  const isEdit = Boolean(template && template.id);
  const nextCode = !isEdit ? getNextAvailableTemplateCode(state.data?.templates || []) : '';

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
      ${isEdit ? `
      <div class="field">
        <label>${choose('الكود', 'Code')} <span style="font-size:11px;font-weight:normal;color:var(--ink-soft);">${choose('(فريد ولا يتكرر)', '(Unique, no duplicates)')}</span></label>
        <input name="code" value="${esc(template?.code || '')}" placeholder="e.g. 01" required />
      </div>
      ` : `
      <div class="field" style="background:var(--surface-soft);padding:10px 14px;border-radius:8px;border:1px dashed var(--line);display:flex;align-items:center;justify-content:space-between;">
        <div>
          <span style="font-size:12px;font-weight:600;color:var(--ink);display:block;">${choose('الكود التلقائي', 'Auto-assigned Code')}</span>
          <span style="font-size:11px;color:var(--ink-soft);">${choose('يتم تعيينه تلقائياً ابتداءً من 1', 'Assigned automatically starting from 1')}</span>
        </div>
        <span class="badge" style="font-size:14px;font-weight:700;background:rgba(20,184,166,0.12);color:var(--brand-teal);padding:4px 10px;border-radius:6px;">#${esc(nextCode)}</span>
      </div>
      `}
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
