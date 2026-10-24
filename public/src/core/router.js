import { state } from './state.js';
import { api } from './api.js';
import { can, isAdmin, choose, t, esc, icon, avatar, roleName, currentViewTitle } from './utils.js';
import { saveOfflineBootstrap, getOfflineBootstrap, getOfflineBootstrapAsync, getPendingMutations, isOnline } from './offline.js';

export function canAccessView(view) {
  if (!state.data) return true;
  if (view === 'dashboard') return can('view_dashboard');
  if (view === 'projects' || view === 'project-detail') return can('view_projects');
  if (view === 'tasks') return can('create_tasks') || can('edit_tasks') || can('delete_tasks') || can('assign_tasks') || can('review_tasks') || can('approve_tasks') || can('manage_reminders') || can('view_projects') || isAdmin();
  if (view === 'documents') return can('upload_documents') || can('delete_documents') || isAdmin();
  if (view === 'templates') return can('manage_templates') || isAdmin();
  if (view === 'team') return isAdmin() || can('manage_users');
  if (view === 'reports') return can('view_reports') || isAdmin();
  if (view === 'settings') return true;
  return false;
}

export function getFirstAllowedView() {
  const order = ['dashboard', 'projects', 'tasks', 'documents', 'templates', 'team', 'reports', 'settings'];
  for (const v of order) {
    if (canAccessView(v)) return v;
  }
  return 'dashboard';
}

export function renderSyncIndicator() {
  const pending = getPendingMutations();
  const count = pending.length;
  const online = isOnline();

  if (!online) {
    return `<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--amber-strong);border:1px solid rgba(245,158,11,0.3);background:rgba(245,158,11,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${choose('وضع عدم الاتصال — كافة العمليات محفوظة محلياً وستُرفع تلقائياً', 'Offline Mode — all actions stored locally and will auto-sync')}">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber-strong);box-shadow:0 0 6px var(--amber-strong);"></span>
      <span>${choose('أوفلاين', 'Offline')}</span>
      ${count > 0 ? `<span class="sync-count-chip" style="background:var(--amber-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${count}</span>` : ''}
    </button>`;
  }
  if (count > 0) {
    return `<button class="btn btn-sm btn-ghost offline-indicator-pill" data-action="manual-sync" style="font-size:11px;font-weight:700;color:var(--teal-strong);border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.08);padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;" title="${choose('انقر للمزامنة الفورية مع السيرفر', 'Click to sync now with server')}">
      <span class="sync-spinner" style="display:inline-block;">🔄</span>
      <span>${choose('مزامنة معلقة', 'Pending Sync')}</span>
      <span class="sync-count-chip" style="background:var(--teal-strong);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px;">${count}</span>
    </button>`;
  }
  return '';
}

if (typeof window !== 'undefined' && !window._darcSyncIndicatorBound) {
  window._darcSyncIndicatorBound = true;
  const updateIndicator = () => {
    const el = document.getElementById('sync-status-indicator');
    if (el) el.innerHTML = renderSyncIndicator();
  };
  window.addEventListener('darc:queue-change', updateIndicator);
  window.addEventListener('online', updateIndicator);
  window.addEventListener('offline', updateIndicator);
}

export function navItem(view, label, iconName) {
  const active = state.view === view || (view === 'projects' && state.view === 'project-detail');
  return `<button class="nav-item ${active ? 'active' : ''}" data-view="${view}">${icon(iconName, 17)}<span>${label}</span></button>`;
}

export function renderApp() {
  if (!canAccessView(state.view)) {
    state.view = getFirstAllowedView();
  }

  // Synchronize URL hash when entering authenticated workspace from #login, #forgot, or empty hash
  if (typeof window !== 'undefined') {
    const currentHash = window.location.hash.replace(/^#/, '');
    if (!currentHash || currentHash === 'login' || currentHash === 'forgot') {
      let targetHash = state.view;
      if (state.view === 'project-detail' && state.activeProjectId) {
        targetHash = `project-detail?id=${encodeURIComponent(state.activeProjectId)}${state.projectTab ? `&tab=${encodeURIComponent(state.projectTab)}` : ''}`;
      }
      window._isInternalNav = true;
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', `#${targetHash}`);
      } else {
        window.location.hash = `#${targetHash}`;
      }
    }
  }

  document.body.classList.add('in-app');
  document.body.classList.toggle('is-ltr', state.lang === 'en');
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  const notifications = state.data?.notifications || [];
  const unread = notifications.filter((notification) => !notification.read).length;
  const user = state.data?.user || {};
  const hasAdminRights = isAdmin() || can('manage_settings') || can('manage_roles') || can('manage_users') || can('manage_trash') || can('view_audit_logs');

  document.getElementById('app').innerHTML = `
    <div class="app-shell ${state.lang === 'en' ? 'is-ltr' : ''}">
      <aside class="sidebar ${state.sidebarOpen ? 'open' : ''}">
        <div class="sidebar-brand">
          ${state.data?.company?.logoUrl 
            ? `<img src="${esc(state.data.company.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${icon('building', 20)}</span>`
            : `<span class="brand-mark">${icon('building', 20)}</span>`
          }
          <div>
            <div class="brand-name">${esc(choose(state.data?.company?.nameAr || state.data?.company?.name || 'DARC Design Team', state.data?.company?.nameEn || state.data?.company?.name || 'DARC Design Team'))}</div>
            <div class="brand-subtitle">${t('workspace')}</div>
          </div>
        </div>
        <div class="nav-title">${choose('مساحة العمل', 'WORKSPACE')}</div>
        <nav class="nav-list">
          ${canAccessView('dashboard') ? navItem('dashboard', t('dashboard'), 'grid') : ''}
          ${canAccessView('projects') ? navItem('projects', t('projects'), 'building') : ''}
          ${canAccessView('tasks') ? navItem('tasks', t('myTasks'), 'checklist') : ''}
          ${canAccessView('documents') ? navItem('documents', t('documents'), 'document') : ''}
          ${canAccessView('templates') ? navItem('templates', t('templates'), 'layers') : ''}
          ${canAccessView('team') ? navItem('team', t('team'), 'users') : ''}
          ${canAccessView('reports') ? navItem('reports', t('reports'), 'chart') : ''}
        </nav>
        <div class="nav-separator"></div>
        <div class="nav-title">${hasAdminRights ? choose('إدارة النظام', 'ADMIN') : choose('حسابي', 'MY ACCOUNT')}</div>
        <nav class="nav-list">${navItem('settings', hasAdminRights ? t('settings') : choose('الملف الشخصي والأمان', 'Profile & Security'), 'settings')}</nav>
        <div class="sidebar-bottom">
          <div class="admin-badge">${avatar(user)}<div class="admin-info"><strong>${esc(choose(user.name, user.nameEn || user.name))}</strong><span>${esc(roleName(user))}</span></div></div>
          <div class="sidebar-footer"><span>v1.0 · ${choose('نسخة عمل', 'Workspace build')}</span><button data-action="logout" title="${t('signOut')}">${icon('logout', 15)}</button></div>
        </div>
      </aside>
      <section class="workspace">
        ${(state.data?.isDemo || state.data?.user?.id === 'usr_demo') ? `
        <div class="demo-showcase-banner" style="display:flex;align-items:center;justify-content:space-between;background:linear-gradient(90deg, rgba(13,98,105,0.12), rgba(20,184,166,0.14));border-bottom:1px solid rgba(20,184,166,0.28);padding:8px 20px;font-size:12px;color:var(--ink);gap:12px;flex-wrap:wrap;z-index:90;">
          <div style="display:flex;align-items:center;gap:8px;font-weight:600;">
            <span style="background:var(--brand-teal);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:12px;letter-spacing:0.5px;text-transform:uppercase;">${choose('بيئة عرض تجريبية', 'DEMO SHOWCASE')}</span>
            <span>${choose('مساحة تفاعلية مخصصة لاستعراض قدرات المنصة — يمكنك تجربة النقل والتعديل بحرية دون التأثير على البيانات الحقيقية.', 'Interactive sandbox showcasing DARC capabilities — feel free to explore, drag, and test without affecting real data.')}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button class="btn btn-xs btn-soft" data-action="reset-demo-sandbox" style="font-size:11px;padding:3px 10px;border-radius:6px;display:flex;align-items:center;gap:4px;">
              <span>🔄</span>
              <span>${choose('إعادة ضبط البيانات', 'Reset Demo Data')}</span>
            </button>
          </div>
        </div>` : ''}
        <header class="topbar">
          <div class="topbar-left"><button class="icon-button mobile-menu" data-action="toggle-sidebar" aria-label="Menu">${icon('menu', 18)}</button><div><div class="topbar-kicker">DARC / ${t('workspace')}</div><div class="topbar-title">${esc(currentViewTitle())}</div></div></div>
          <div class="topbar-right">
            <span id="sync-status-indicator">${renderSyncIndicator()}</span>
            <button class="topbar-search-trigger" data-action="open-omnisearch" title="${choose('بحث شامل وسريع', 'Omnisearch')}">
              ${icon('search', 14)}
              <span>${choose('بحث شامل...', 'Search...')}</span>
              <kbd class="shortcut-kbd">${typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl+K'}</kbd>
            </button>
            <button class="icon-button" data-action="open-cheatsheet" title="${choose('دليل اختصارات لوحة المفاتيح (?)', 'Keyboard shortcuts guide (?)')}" style="color:var(--ink-soft);" aria-label="Shortcuts">
              <kbd class="shortcut-kbd" style="font-size:12px;padding:2px 7px;font-weight:bold;">?</kbd>
            </button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-theme">${state.theme === 'dark' ? '☀️' : '🌙'}</button>
            <button class="btn btn-ghost btn-sm" data-action="toggle-lang">${state.lang === 'ar' ? 'EN' : 'عربي'} ${icon('globe', 14)}</button>
            <button class="icon-button" data-action="show-notifications" aria-label="${t('notifications')}">${icon('bell', 17)}${unread ? '<span class="notification-dot"></span>' : ''}</button>
            <div class="topbar-divider"></div>
            <div class="profile-chip">${avatar(user)}<div class="profile-chip-text"><strong>${esc(choose(user.name, user.nameEn || user.name))}</strong><span>${esc(roleName(user))}</span></div></div>
          </div>
        </header>
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`;
  renderView();
}

export function renderView() {
  const main = document.getElementById('main-content');
  if (!main) return;
  if (!canAccessView(state.view)) {
    state.view = getFirstAllowedView();
  }
  let html = '';
  if (state.view === 'dashboard') html = renderDashboard();
  if (state.view === 'projects') html = renderProjects();
  if (state.view === 'tasks') html = renderTasks();
  if (state.view === 'documents') html = renderDocuments();
  if (state.view === 'templates') html = renderTemplates();
  if (state.view === 'team') html = renderTeam();
  if (state.view === 'reports') html = renderReports();
  if (state.view === 'settings') html = renderSettings();
  if (state.view === 'project-detail') html = renderProjectDetail();
  main.innerHTML = html;
  
  if (state.view === 'project-detail' && state.projectTab === 'timeline') {
    setTimeout(drawTimelineArrows, 0);
  }
}

export function switchView(view, projectId = undefined) {
  if (!canAccessView(view)) {
    view = getFirstAllowedView();
  }
  state.view = view;
  if (projectId !== undefined) state.activeProjectId = projectId;
  if (view === 'settings') state.settingsSection = 'profile';
  state.sidebarOpen = false;
  document.querySelector('.sidebar')?.classList.remove('open');

  // Instant 0ms visual feedback on navigation buttons
  document.querySelectorAll('.nav-item').forEach((btn) => {
    const v = btn.dataset.view;
    const isActive = v === view || (v === 'projects' && view === 'project-detail');
    btn.classList.toggle('active', isActive);
  });

  const titleEl = document.querySelector('.topbar-title');
  if (titleEl) titleEl.textContent = currentViewTitle();

  try {
    let hashStr = view;
    if (view === 'project-detail' && state.activeProjectId) {
      hashStr = `project-detail?id=${encodeURIComponent(state.activeProjectId)}${state.projectTab ? `&tab=${encodeURIComponent(state.projectTab)}` : ''}`;
    }
    if (typeof window !== 'undefined' && window.location.hash.replace(/^#/, '') !== hashStr) {
      window._isInternalNav = true;
      window.location.hash = hashStr;
    }
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('darc_last_route', JSON.stringify({
        view: state.view,
        activeProjectId: state.activeProjectId,
        projectTab: state.projectTab,
        settingsSection: state.settingsSection
      }));
    }
  } catch (e) {}

  requestAnimationFrame(() => {
    renderView();
    const main = document.getElementById('main-content');
    if (main) {
      main.scrollTop = 0;
      main.scrollLeft = 0;
    }
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  });
}

export async function refreshView(silent = false) { try { await loadData(silent); } catch (error) { showToast(error.message, true); } }

export async function loadData(silent = false) {
  try {
    let payload = await api('/api/bootstrap', { silent });
    if (payload === null) {
      // HTTP 304 Not Modified
      if (state.data) {
        // Cache is completely identical and data is in memory: 0ms CPU & 0 DOM ops
        return;
      }
      // Memory is empty (fresh page load or hard reload): recover from offline storage
      const offline = await getOfflineBootstrapAsync();
      if (offline && offline.user) {
        payload = offline;
      } else {
        payload = await api('/api/bootstrap', { silent: false, headers: { 'Cache-Control': 'no-cache, no-store' } });
      }
      if (!payload) return;
    }
    
    // Save to offline storage non-blockingly for instant access when offline
    saveOfflineBootstrap(payload);
    state.isOffline = false;

    // Optimistic Preservation Guard: Protect recently created/updated items against race conditions or stale caches
    if (state.data?.tasks && payload?.tasks) {
      const now = Date.now();
      const payloadTaskIds = new Set(payload.tasks.map(t => t.id));
      for (const localTask of state.data.tasks) {
        if (!payloadTaskIds.has(localTask.id)) {
          const createdAtTime = localTask.createdAt ? new Date(localTask.createdAt).getTime() : now;
          if (now - createdAtTime < 120000) {
            payload.tasks.unshift(localTask);
            payloadTaskIds.add(localTask.id);
          }
        }
      }
    }

    if (state.data?.projects && payload?.projects) {
      const now = Date.now();
      const payloadProjIds = new Set(payload.projects.map(p => p.id));
      for (const localProj of state.data.projects) {
        if (!payloadProjIds.has(localProj.id)) {
          const createdAtTime = localProj.createdAt ? new Date(localProj.createdAt).getTime() : now;
          if (now - createdAtTime < 120000) {
            payload.projects.unshift(localProj);
            payloadProjIds.add(localProj.id);
          }
        }
      }
    }
    
    // Deep entity check: Ensure reorders, status changes, and progress updates trigger re-render
    let hasEntityChanged = false;
    if (state.data && payload) {
      if (state.data.updatedAt !== payload.updatedAt) {
        hasEntityChanged = true;
      } else if (state.data.tasks?.length !== payload.tasks?.length || state.data.projects?.length !== payload.projects?.length) {
        hasEntityChanged = true;
      } else {
        const oldTasks = state.data.tasks || [];
        const newTasks = payload.tasks || [];
        for (let i = 0; i < newTasks.length; i++) {
          const nt = newTasks[i], ot = oldTasks[i];
          if (!ot || ot.id !== nt.id || ot.status !== nt.status || (ot.sortOrder || ot.sort_order) !== (nt.sortOrder || nt.sort_order) || ot.progress !== nt.progress) {
            hasEntityChanged = true;
            break;
          }
        }
        if (!hasEntityChanged) {
          const oldProjs = state.data.projects || [];
          const newProjs = payload.projects || [];
          for (let i = 0; i < newProjs.length; i++) {
            const np = newProjs[i], op = oldProjs[i];
            if (!op || op.id !== np.id || op.lifecycle !== np.lifecycle || op.health !== np.health || op.progress !== np.progress) {
              hasEntityChanged = true;
              break;
            }
          }
        }
      }
    }

    const isDataChanged = !state.data || hasEntityChanged ||
      state.data.comments?.length !== payload.comments?.length ||
      state.data.documents?.length !== payload.documents?.length ||
      state.data.users?.length !== payload.users?.length ||
      state.data.auditLogs?.length !== payload.auditLogs?.length ||
      state.data.notifications?.length !== payload.notifications?.length;
    
    if (isDataChanged) {
      state.data = payload;
      if (!canAccessView(state.view)) {
        state.view = getFirstAllowedView();
      }
      const hasOpenModal = Boolean(document.getElementById('modal-root')?.children?.length);
      const isDragging = Boolean(
        document.querySelector('.is-dragging') ||
        document.querySelector('.touch-dragging') ||
        document.querySelector('.drag-placeholder')
      );
      const isTyping = Boolean(
        document.activeElement && 
        ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) &&
        document.getElementById('main-content')?.contains(document.activeElement)
      );

      // Do not disrupt ongoing touch/mouse drags or active typing during silent background sync
      if (silent && (isDragging || isTyping)) {
        return;
      }

      if (!silent && !hasOpenModal) {
        requestAnimationFrame(() => renderApp());
      } else {
        requestAnimationFrame(() => renderView());
      }
    } else {
      // Just update state silently without re-rendering the DOM
      state.data = payload; 
      if (!canAccessView(state.view)) {
        state.view = getFirstAllowedView();
        requestAnimationFrame(() => renderView());
      }
    }
  } catch (error) {
    // If unauthorized or forbidden, do NOT fallback to previous user's offline cache
    if (error && (error.status === 401 || error.status === 403)) {
      throw error;
    }
    const cachedData = await getOfflineBootstrapAsync();
    if (cachedData) {
      state.data = cachedData;
      if (!canAccessView(state.view)) {
        state.view = getFirstAllowedView();
      }
      state.isOffline = true;
      const hasOpenModal = Boolean(document.getElementById('modal-root')?.children?.length);
      if (!silent && !hasOpenModal) renderApp();
      else renderView();
      return;
    }
    throw error;
  }
}
