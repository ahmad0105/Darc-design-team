import { state } from '../../core/state.js';
import { choose, esc, icon, t, dateLabel, roleName } from '../../core/utils.js';
import { openTaskModal } from '../tasks/tasks.js';
import { openProjectModal } from '../projects/projects.js';
import { switchView } from '../../core/router.js';
import { modalShell } from '../../shared/ui.js';

const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
export const SHORTCUT_KEY = isMac ? '⌘K' : 'Ctrl+K';

let selectedIndex = 0;
let currentResults = [];

export function openOmnisearch() {
  const existing = document.getElementById('omnisearch-modal');
  if (existing) existing.remove();

  document.body.style.overflow = 'hidden';

  const placeholderText = choose(`ابحث في المشاريع، المهام، والأعضاء... (${SHORTCUT_KEY})`, `Search projects, tasks, team... (${SHORTCUT_KEY})`);

  const modalHtml = `
    <div id="omnisearch-modal" class="omnisearch-backdrop">
      <div class="omnisearch-box">
        <div class="omnisearch-input-wrap">
          <span style="color:var(--teal);display:flex;">${icon('search', 18)}</span>
          <input 
            id="omnisearch-input" 
            type="text" 
            autocomplete="off" 
            placeholder="${esc(placeholderText)}" 
            onfocus="this.placeholder=''" 
            onblur="if(!this.value) this.placeholder='${esc(placeholderText)}'"
          />
          <button class="btn btn-ghost btn-sm" data-action="close-omnisearch" style="padding:4px 8px;">
            <kbd class="shortcut-kbd">ESC</kbd>
          </button>
        </div>
        <div id="omnisearch-results-container" class="omnisearch-results">
          ${renderOmnisearchResults('')}
        </div>
        <div class="omnisearch-foot">
          <div class="omni-shortcuts-hint">
            <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd> ${choose('للتنقل', 'to navigate')}</span>
            <span><kbd class="shortcut-kbd">↵</kbd> ${choose('للاختيار', 'to select')}</span>
            <span><kbd class="shortcut-kbd">ESC</kbd> ${choose('للإغلاق', 'to close')}</span>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="open-cheatsheet" style="font-size:11px;padding:2px 6px;">
            ${icon('sparkles', 12)} ${choose('دليل الاختصارات (?)', 'Shortcuts (?)')}
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modalEl = document.getElementById('omnisearch-modal');
  if (modalEl) {
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) closeOmnisearch();
    });
  }

  const input = document.getElementById('omnisearch-input');
  if (input) {
    input.focus();
    input.addEventListener('input', (e) => {
      selectedIndex = 0;
      const container = document.getElementById('omnisearch-results-container');
      if (container) container.innerHTML = renderOmnisearchResults(e.target.value);
    });
    input.addEventListener('keydown', handleOmnisearchKeydown);
  }
}

export function closeOmnisearch() {
  const modal = document.getElementById('omnisearch-modal');
  if (modal) modal.remove();
  if (!document.querySelector('.modal-backdrop')) {
    document.body.style.overflow = '';
  }
}

function handleOmnisearchKeydown(e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (currentResults.length > 0) {
      selectedIndex = (selectedIndex + 1) % currentResults.length;
      updateSelection();
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (currentResults.length > 0) {
      selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
      updateSelection();
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (currentResults[selectedIndex]) {
      executeResult(currentResults[selectedIndex]);
    }
  } else if (e.key === 'Escape') {
    closeOmnisearch();
  }
}

function updateSelection() {
  document.querySelectorAll('.omni-item').forEach((el, idx) => {
    el.classList.toggle('selected', idx === selectedIndex);
    if (idx === selectedIndex) {
      el.scrollIntoView({ block: 'nearest' });
    }
  });
}

function executeResult(item) {
  closeOmnisearch();
  if (item.type === 'action') {
    if (item.id === 'new-task') {
      const activePrj = (state.data?.projects || []).find(p => p.id === (state.activeProjectId || state.lastActiveProjectId)) || (state.data?.projects || [])[0];
      openTaskModal(null, null, item.targetProjectId || activePrj?.id);
    }
    else if (item.id === 'new-project') openProjectModal();
    else if (item.id === 'cheatsheet') openShortcutsCheatsheet();
  } else if (item.type === 'project') {
    state.projectTab = 'tasks';
    state.lastActiveProjectId = item.id;
    switchView('project-detail', item.id);
  } else if (item.type === 'task') {
    const task = state.data?.tasks?.find(t => t.id === item.id);
    if (task) openTaskModal(task);
  } else if (item.type === 'user') {
    const user = state.data?.users?.find(u => u.id === item.id);
    if (user && typeof window.openUserModal === 'function') window.openUserModal(user);
  }
}

export function renderOmnisearchResults(rawQuery) {
  const q = rawQuery.trim().toLowerCase();
  const results = [];
  
  // 1. Quick Actions
  const activePrj = (state.data?.projects || []).find(p => p.id === (state.activeProjectId || state.lastActiveProjectId)) || (state.data?.projects || [])[0];
  const prjName = activePrj ? choose(activePrj.nameAr, activePrj.nameEn) : '';

  const actions = [
    { 
      type: 'action', 
      id: 'new-task', 
      targetProjectId: activePrj?.id,
      title: choose('إضافة مهمة جديدة', 'Create new task'), 
      sub: activePrj ? choose(`في مشروع: ${prjName}`, `In project: ${prjName}`) : choose('إجراء سريع', 'Quick action'), 
      icon: 'plus', 
      keywords: 'new task مهمة إضافة عمل جديد' 
    },
    { 
      type: 'action', 
      id: 'new-project', 
      title: choose('إنشاء مشروع جديد', 'Create new project'), 
      sub: choose('إجراء سريع', 'Quick action'), 
      icon: 'building', 
      keywords: 'new project مشروع إنشاء جديد' 
    },
    { 
      type: 'action', 
      id: 'cheatsheet', 
      title: choose('عرض دليل اختصارات لوحة المفاتيح', 'View keyboard shortcuts guide'), 
      sub: choose('مساعدة', 'Help'), 
      icon: 'sparkles', 
      keywords: 'shortcuts اختصارات كيبورد مساعدة' 
    }
  ];

  actions.forEach(act => {
    if (!q || act.keywords.includes(q) || act.title.toLowerCase().includes(q)) {
      results.push(act);
    }
  });

  // 2. Projects
  const projects = state.data?.projects || [];
  projects.forEach(p => {
    const match = !q || `${p.nameAr} ${p.nameEn} ${p.code} ${p.clientAr} ${p.clientEn}`.toLowerCase().includes(q);
    if (match) {
      results.push({
        type: 'project',
        id: p.id,
        title: choose(p.nameAr, p.nameEn),
        sub: `${p.code} · ${choose(p.clientAr, p.clientEn) || ''}`,
        badge: `${p.progress}%`,
        icon: 'building'
      });
    }
  });

  // 3. Tasks
  const tasks = state.data?.tasks || [];
  tasks.forEach(t => {
    const match = !q || `${t.titleAr} ${t.titleEn} ${t.categoryAr} ${t.categoryEn}`.toLowerCase().includes(q);
    if (match) {
      results.push({
        type: 'task',
        id: t.id,
        title: choose(t.titleAr, t.titleEn),
        sub: t.dueDate ? `📅 ${dateLabel(t.dueDate)}` : (choose(t.categoryAr, t.categoryEn) || ''),
        badge: `${t.progress}%`,
        icon: 'checklist'
      });
    }
  });

  // 4. Team Members
  const users = state.data?.users || [];
  users.forEach(u => {
    const match = !q || `${u.name} ${u.nameEn} ${u.email} ${u.jobTitleAr}`.toLowerCase().includes(q);
    if (match) {
      results.push({
        type: 'user',
        id: u.id,
        title: choose(u.name, u.nameEn || u.name),
        sub: u.email || '',
        badge: roleName(u),
        icon: 'user'
      });
    }
  });

  // Cap results at 15 for top performance
  currentResults = results.slice(0, 15);

  if (!currentResults.length) {
    return `
      <div class="empty" style="padding:30px 10px;text-align:center;">
        <span style="color:var(--muted);display:block;margin-bottom:6px;">${icon('search', 24)}</span>
        <strong style="color:var(--ink);">${choose('لا توجد نتائج مطابقة', 'No matching results')}</strong>
        <p style="color:var(--muted);font-size:12px;margin:4px 0 0;">${choose('جرب البحث بكلمات أخرى أو رمز المشروع.', 'Try different keywords or project code.')}</p>
      </div>
    `;
  }

  let currentCategory = '';
  return currentResults.map((item, idx) => {
    let categoryHeader = '';
    const catTitle = item.type === 'action' ? choose('إجراءات سريعة', 'Quick Actions')
      : item.type === 'project' ? choose('المشاريع', 'Projects')
      : item.type === 'task' ? choose('المهام والمخرجات', 'Tasks & Deliverables')
      : choose('فريق العمل', 'Team');

    if (catTitle !== currentCategory) {
      currentCategory = catTitle;
      categoryHeader = `<div class="omni-group-title">${catTitle}</div>`;
    }

    return `
      ${categoryHeader}
      <div class="omni-item ${idx === selectedIndex ? 'selected' : ''}" data-omni-index="${idx}" onclick="window.__selectOmniItem(${idx})">
        <div class="omni-item-left">
          <span style="color:var(--teal);display:flex;">${icon(item.icon, 15)}</span>
          <div style="display:flex;flex-direction:column;line-height:1.2;">
            <strong style="font-size:13px;">${esc(item.title)}</strong>
            ${item.sub ? `<span style="font-size:11px;color:var(--muted);">${esc(item.sub)}</span>` : ''}
          </div>
        </div>
        ${item.badge ? `<span class="omni-badge">${esc(item.badge)}</span>` : ''}
      </div>
    `;
  }).join('');
}

window.__selectOmniItem = (idx) => {
  if (currentResults[idx]) executeResult(currentResults[idx]);
};

export function openShortcutsCheatsheet() {
  closeOmnisearch();
  const formHtml = `
    <div style="padding:10px 0;">
      <p style="color:var(--ink-soft);font-size:13px;margin-top:0;">${choose('استخدم هذه الاختصارات لزيادة سرعة عملك داخل النظام بدون لمس الفأرة:', 'Use these shortcuts to navigate the workspace at full speed without a mouse:')}</p>
      
      <div class="cheatsheet-grid">
        <div class="cheatsheet-row">
          <span>${choose('البحث الشامل والأوامر السريعة', 'Omnisearch & Quick Commands')}</span>
          <kbd class="shortcut-kbd">${SHORTCUT_KEY}</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${choose('إضافة مهمة سريعة في المشروع', 'Add new task in project')}</span>
          <kbd class="shortcut-kbd">N</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${choose('إنشاء مشروع جديد', 'Create new project')}</span>
          <kbd class="shortcut-kbd">P</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${choose('فتح دليل الاختصارات هذا', 'Open this shortcuts guide')}</span>
          <kbd class="shortcut-kbd">? / ؟</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${choose('إغلاق أي نافذة منبثقة أو بحث', 'Close modal or search')}</span>
          <kbd class="shortcut-kbd">ESC</kbd>
        </div>
        <div class="cheatsheet-row">
          <span>${choose('التنقل بين نتائج البحث', 'Navigate search results')}</span>
          <span><kbd class="shortcut-kbd">↑</kbd> <kbd class="shortcut-kbd">↓</kbd></span>
        </div>
        <div class="cheatsheet-row">
          <span>${choose('تأكيد واختيار النتيجة', 'Select search result')}</span>
          <kbd class="shortcut-kbd">↵ Enter</kbd>
        </div>
      </div>

      <div class="modal-actions" style="margin-top:24px;">
        <button type="button" class="btn btn-primary" data-action="close-modal">${choose('فهمت ذلك', 'Got it')}</button>
      </div>
    </div>
  `;

  document.getElementById('modal-root').innerHTML = modalShell(
    choose('دليل اختصارات لوحة المفاتيح', 'Keyboard Shortcuts Guide'),
    choose('طرق سريعة للتنقل وإنجاز العمل بكفاءة عالية', 'Work faster with productivity hotkeys'),
    formHtml,
    'cheatsheet'
  );
}

export function setupGlobalShortcuts() {
  window.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT' || activeEl.isContentEditable);

    // 1. Omnisearch shortcut (Cmd+K / Ctrl+K) - works in both English & Arabic keyboards
    const isKeyK = e.code === 'KeyK' || e.key?.toLowerCase() === 'k' || e.key === 'ن';
    if ((e.metaKey || e.ctrlKey) && isKeyK) {
      e.preventDefault();
      const existing = document.getElementById('omnisearch-modal');
      if (existing) closeOmnisearch();
      else openOmnisearch();
      return;
    }

    // 2. Open Cheatsheet on '?' or '؟' or Shift+/
    const isQuestion = e.key === '?' || e.key === '؟' || (e.code === 'Slash' && e.shiftKey);
    if (isQuestion && !isInput) {
      e.preventDefault();
      openShortcutsCheatsheet();
      return;
    }

    // 3. New Task on 'N' when not typing
    const isKeyN = e.code === 'KeyN' || e.key?.toLowerCase() === 'n' || e.key === 'ى';
    if (isKeyN && !isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      const targetPrjId = (state.view === 'project-detail' && state.activeProjectId) ? state.activeProjectId : (state.data?.projects?.[0]?.id);
      openTaskModal(null, null, targetPrjId);
      return;
    }

    // 4. New Project on 'P' when not typing
    const isKeyP = e.code === 'KeyP' || e.key?.toLowerCase() === 'p' || e.key === 'ح';
    if (isKeyP && !isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      openProjectModal();
      return;
    }

    // 5. ESC to close Omnisearch or modal
    if (e.key === 'Escape') {
      const omni = document.getElementById('omnisearch-modal');
      if (omni) {
        e.preventDefault();
        closeOmnisearch();
        return;
      }
    }
  });
}
