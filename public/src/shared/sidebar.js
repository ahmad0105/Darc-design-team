import { state } from '../core/state.js';
import { choose, esc, icon, avatar, roleName, t, isAdmin, can } from '../core/utils.js';
import { canAccessView } from '../core/router.js';

export function navItem(view, label, iconName) {
  const active = state.view === view || (view === 'projects' && state.view === 'project-detail');
  return `<button class="nav-item ${active ? 'active' : ''}" data-view="${view}">${icon(iconName, 17)}<span>${label}</span></button>`;
}

export function renderSidebarBackdrop() {
  return `<div class="sidebar-backdrop ${state.sidebarOpen ? 'visible' : ''}" data-action="toggle-sidebar" aria-hidden="true"></div>`;
}

export function renderSidebar() {
  const user = state.data?.user || {};
  const hasAdminRights = isAdmin() || can('manage_settings') || can('manage_roles') || can('manage_users') || can('manage_trash') || can('view_audit_logs') || can('manage_templates');

  return `
    <aside class="sidebar ${state.sidebarOpen ? 'open' : ''}">
      <div class="sidebar-brand">
        ${state.data?.company?.logoUrl 
          ? `<img src="${esc(state.data?.company?.logoUrl)}" alt="Logo" style="width:32px;height:32px;object-fit:contain;border-radius:8px;background:var(--surface);flex-shrink:0;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${icon('building', 20)}</span>`
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
        ${canAccessView('team') ? navItem('team', t('team'), 'users') : ''}
        ${canAccessView('reports') ? navItem('reports', t('reports'), 'chart') : ''}
      </nav>
      <div class="nav-separator"></div>
      <div class="nav-title">${(hasAdminRights || canAccessView('templates')) ? choose('إدارة النظام', 'ADMIN') : choose('حسابي', 'MY ACCOUNT')}</div>
      <nav class="nav-list">
        ${canAccessView('templates') ? navItem('templates', t('templates'), 'layers') : ''}
        ${navItem('settings', hasAdminRights ? t('settings') : choose('الملف الشخصي والأمان', 'Profile & Security'), 'settings')}
      </nav>
      <div class="sidebar-bottom">
        <div class="admin-badge">${avatar(user)}<div class="admin-info"><strong>${esc(choose(user.name, user.nameEn || user.name))}</strong><span>${esc(roleName(user))}</span></div></div>
        <div class="sidebar-footer"><span>v1.0 · ${choose('نسخة عمل', 'Workspace build')}</span><button data-action="logout" title="${t('signOut')}">${icon('logout', 15)}</button></div>
      </div>
    </aside>
  `;
}

