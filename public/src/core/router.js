import { state } from './state.js';
import { api, invalidateBootstrapEtag } from './api.js';
import { can, isAdmin, choose, t, esc, icon, avatar, roleName, currentViewTitle, hasSessionIndicator } from './utils.js';
import { saveOfflineBootstrap, getOfflineBootstrap, getOfflineBootstrapAsync, clearOfflineBootstrap, getPendingMutations, isOnline } from './offline.js';
import { showToast } from '../shared/ui.js';
import { recordBreadcrumb } from './telemetry.js';
import { renderNavbar, renderSyncIndicator, initSyncIndicatorListener, updateNavbarTitle } from '../shared/navbar.js';
import { renderSidebar, renderSidebarBackdrop } from '../shared/sidebar.js';

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
  const order = ['dashboard', 'projects', 'tasks', 'documents', 'team', 'reports', 'templates', 'settings'];
  for (const v of order) {
    if (canAccessView(v)) return v;
  }
  return 'dashboard';
}

initSyncIndicatorListener();

export function renderApp() {
  if (state.data && !canAccessView(state.view)) {
    state.view = getFirstAllowedView();
  }

  // Synchronize URL hash when entering authenticated workspace from #login, #forgot, or empty hash
  if (typeof window !== 'undefined') {
    const currentHash = window.location.hash.replace(/^#/, '');
    if (!currentHash || currentHash === 'login' || currentHash === 'forgot') {
      let targetHash = state.view;
      if (state.view === 'project-detail' && state.activeProjectId) {
        targetHash = `project-detail?id=${encodeURIComponent(state.activeProjectId)}${state.projectTab ? `&tab=${encodeURIComponent(state.projectTab)}` : ''}`;
      } else if (state.view === 'settings' && state.settingsSection) {
        targetHash = `settings?section=${encodeURIComponent(state.settingsSection)}`;
      }
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', `#${targetHash}`);
      } else {
        window._isInternalNav = true;
        window.location.hash = `#${targetHash}`;
      }
    }
  }

  document.body.classList.add('in-app');
  document.body.classList.toggle('is-ltr', state.lang === 'en');
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';

  document.getElementById('app').innerHTML = `
    <div class="app-shell ${state.lang === 'en' ? 'is-ltr' : ''}">
      ${renderSidebarBackdrop()}
      ${renderSidebar()}
      <section class="workspace">
        ${(state.data?.isDemo || state.data?.user?.id === 'usr_demo') ? `
        <div class="demo-showcase-banner">
          <div class="demo-showcase-content">
            <span class="demo-showcase-badge">${choose('بيئة عرض تجريبية', 'DEMO SHOWCASE')}</span>
            <span class="demo-showcase-timer">⏱️ ${choose('تنظيف ذاتي كل 15 دقيقة', 'Auto-resets every 15m')}</span>
            <span class="demo-showcase-desc">${choose('مساحة تفاعلية مخصصة لاستعراض قدرات المنصة — تُحذف الملفات والتعديلات تلقائياً كل 15 دقيقة لحماية السيرفر ونظافة العرض.', 'Interactive sandbox showcasing DARC capabilities — all demo changes & uploads automatically purge every 15 minutes.')}</span>
          </div>
          <div class="demo-showcase-actions">
            <button class="btn btn-xs demo-showcase-btn" data-action="reset-demo-sandbox">
              <span>🔄</span>
              <span>${choose('إعادة ضبط الآن', 'Reset Now')}</span>
            </button>
          </div>
        </div>` : ''}
        ${renderNavbar()}
        <main id="main-content" class="workspace-content"></main>
      </section>
    </div>
    <div id="modal-root"></div><div id="toast-root" class="toast-stack"></div>`;
  renderView();
}

let lastRenderedView = null;

export function renderView(force = false) {
  if (!force && (window._isDraggingTask || window._isKeyboardDraggingTask || window._isTouchHoldingTask)) {
    window._pendingRenderAfterDrag = true;
    return;
  }
  const main = document.getElementById('main-content');
  if (!main) return;
  if (!canAccessView(state.view)) {
    state.view = getFirstAllowedView();
  }

  // Preserve scroll states across re-renders of the same view (prevents board jump to first column)
  const isSameView = lastRenderedView === state.view;
  const prevMainScrollTop = isSameView ? main.scrollTop : 0;
  const prevMainScrollLeft = isSameView ? main.scrollLeft : 0;
  const prevBoard = isSameView ? main.querySelector('.board, .tasks-board, .board-columns') : null;
  const prevBoardScrollLeft = prevBoard ? prevBoard.scrollLeft : null;
  lastRenderedView = state.view;

  let html = '';
  if (state.view === 'dashboard' && typeof window.renderDashboard === 'function') html = window.renderDashboard();
  if (state.view === 'projects' && typeof window.renderProjects === 'function') html = window.renderProjects();
  if (state.view === 'tasks' && typeof window.renderTasks === 'function') html = window.renderTasks();
  if (state.view === 'documents' && typeof window.renderDocuments === 'function') html = window.renderDocuments();
  if (state.view === 'templates' && typeof window.renderTemplates === 'function') html = window.renderTemplates();
  if (state.view === 'team' && typeof window.renderTeam === 'function') html = window.renderTeam();
  if (state.view === 'reports' && typeof window.renderReports === 'function') html = window.renderReports();
  if (state.view === 'settings' && typeof window.renderSettings === 'function') html = window.renderSettings();
  if (state.view === 'project-detail' && typeof window.renderProjectDetail === 'function') html = window.renderProjectDetail();
  main.innerHTML = html;

  // Restore scroll positions so user stays exactly where they were
  if (prevMainScrollTop) main.scrollTop = prevMainScrollTop;
  if (prevMainScrollLeft) main.scrollLeft = prevMainScrollLeft;
  if (prevBoardScrollLeft !== null) {
    const newBoard = main.querySelector('.board, .tasks-board, .board-columns');
    if (newBoard) {
      newBoard.style.scrollSnapType = 'none';
      newBoard.scrollLeft = prevBoardScrollLeft;
      requestAnimationFrame(() => {
        if (newBoard && !window._isDraggingTask) {
          newBoard.style.scrollSnapType = '';
        }
      });
    }
  }
  
  if (state.view === 'project-detail' && state.projectTab === 'timeline') {
    setTimeout(() => {
      if (typeof window.drawTimelineArrows === 'function') window.drawTimelineArrows();
    }, 0);
  }
}

export function switchView(view, projectId = undefined) {
  if (state.data && !canAccessView(view)) {
    view = getFirstAllowedView();
  }
  recordBreadcrumb('navigation', `الانتقال إلى واجهة #${view}${projectId ? ` (مشروع: ${projectId})` : ''}`);
  state.view = view;
  if (projectId !== undefined) state.activeProjectId = projectId;
  if (view === 'settings' && !state.settingsSection) state.settingsSection = 'profile';
  state.sidebarOpen = false;
  document.querySelector('.sidebar')?.classList.remove('open');
  document.querySelector('.sidebar-backdrop')?.classList.remove('visible');

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
    } else if (view === 'settings' && state.settingsSection) {
      hashStr = `settings?section=${encodeURIComponent(state.settingsSection)}`;
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
    const hasSession = hasSessionIndicator();
    if (!hasSession) {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('darc_token');
        localStorage.removeItem('darc_user_id');
      }
      try { clearOfflineBootstrap(); } catch (e) {}
      state.data = null;
      state.view = 'login';
      const unauthErr = new Error('No session');
      unauthErr.status = 401;
      throw unauthErr;
    }

    // SWR (Stale-While-Revalidate): If initial memory state is empty, hydrate immediately from cache in 0ms
    if (!state.data) {
      const cached = getOfflineBootstrap();
      if (cached && cached.user) {
        state.data = cached;
        if (state.view === 'login' || !canAccessView(state.view)) {
          state.view = getFirstAllowedView();
        }
        requestAnimationFrame(() => renderApp());
      }
    }

    const isTrashSection = state.view === 'settings' && state.settingsSection === 'trash';
    const trashPromise = isTrashSection && !state.trashLoaded
      ? api('/api/trash', { silent: true }).catch(() => null)
      : null;

    let payload = await api('/api/bootstrap', { silent });
    if (payload === null) {
      // HTTP 304 Not Modified
      if (state.data && state.data.user) {
        // Cache is completely identical and data is in memory: 0ms CPU & 0 DOM ops
        return;
      }
      // Memory is empty (fresh page load or hard reload): recover from offline storage
      const offline = await getOfflineBootstrapAsync();
      if (offline && offline.user) {
        payload = offline;
      } else {
        invalidateBootstrapEtag();
        payload = await api('/api/bootstrap', { silent: false, headers: { 'Cache-Control': 'no-cache, no-store' } });
      }
      if (!payload || !payload.user) return;
    }
    
    // Save to offline storage non-blockingly for instant access when offline
    saveOfflineBootstrap(payload);
    state.isOffline = false;

    // Resolve pre-fetched trash if on recycle bin section
    if (trashPromise) {
      try {
        const trashData = await trashPromise;
        if (trashData) {
          state.trash = Array.isArray(trashData) ? trashData : (trashData.trash || [
            ...(trashData.projects || []).map(p => ({...p, type:'project'})),
            ...(trashData.tasks || []).map(t => ({...t, type:'task'})),
            ...(trashData.documents || []).map(d => ({...d, type:'document'}))
          ]);
          state.trashLoaded = true;
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('darc_trash_cache', JSON.stringify(state.trash));
          }
        }
      } catch (e) {}
    }

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
        } else {
          // If task was recently moved (within last 20s) by drag & drop, preserve optimistic status, progress, and sortOrder against stale polls
          const movedInfo = window._recentlyMovedTasks?.get(localTask.id);
          if (movedInfo && (now - movedInfo.timestamp < 20000)) {
            const targetInPayload = payload.tasks.find(t => t.id === localTask.id);
            if (targetInPayload) {
              targetInPayload.status = movedInfo.status;
              if (movedInfo.progress !== undefined) {
                targetInPayload.progress = movedInfo.progress;
              }
              if (movedInfo.sortOrder !== undefined) {
                targetInPayload.sortOrder = movedInfo.sortOrder;
                targetInPayload.sort_order = movedInfo.sortOrder;
                if (!targetInPayload.customFields) targetInPayload.customFields = {};
                targetInPayload.customFields.sortOrder = movedInfo.sortOrder;
                targetInPayload.customFields.sort_order = movedInfo.sortOrder;
                if (!targetInPayload.custom_fields) targetInPayload.custom_fields = {};
                targetInPayload.custom_fields.sortOrder = movedInfo.sortOrder;
                targetInPayload.custom_fields.sort_order = movedInfo.sortOrder;
              }
            }
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
    
    if (isDataChanged || state.view === 'login') {
      if (payload && payload.user) {
        state.data = payload;
      }
      if (state.view === 'login' || !canAccessView(state.view)) {
        state.view = getFirstAllowedView();
      }
      const hasOpenModal = Boolean(document.getElementById('modal-root')?.children?.length);
      const isDragging = Boolean(
        window._isDraggingTask ||
        window._isTouchHoldingTask ||
        window._isKeyboardDraggingTask ||
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
      if (payload && payload.user) {
        state.data = payload; 
      } 
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

if (typeof window !== 'undefined') {
  window.renderApp = renderApp;
  window.renderView = renderView;
}
