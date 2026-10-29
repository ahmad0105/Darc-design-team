
import { state } from './state.js';
import { api, API_BASE, invalidateBootstrapEtag } from './api.js';
import { switchView, refreshView, renderView, renderApp, canAccessView, getFirstAllowedView, loadData } from './router.js';
import { openOmnisearch, closeOmnisearch, openShortcutsCheatsheet } from '../features/dashboard/omnisearch.js';
import { playSuccessChime, savePreferencesCookies, choose, esc, icon, t, can, isAdmin, avatar, roleName, statusText, initials, dateLabel } from './utils.js';
import { showToast, modalShell, closeModal, renderLoading } from '../shared/ui.js';
import { setSavedTaskSort, openDocumentPreviewModal, renderTaskDocuments } from '../features/tasks/tasks.js';
import { getPendingMutations, syncPendingMutations, getOfflineBootstrap, clearOfflineBootstrap, saveOfflineBootstrap } from './offline.js';
import { exportPortfolioXLS, exportProjectXLS, exportProjectPDF, exportPortfolioPDF } from '../features/projects/projects.js';
import { exportAuditLogsXLS, printAuditReport, fetchFullAuditHistory, canAccessSettingsSection } from '../features/settings/settings.js';
import { fetchAnalyticsData } from '../features/settings/analytics.js';
import { fetchDiagnosticsData, setDiagnosticsUserFilter, setDiagnosticsSeverityFilter, setDiagnosticsStatusFilter } from '../features/settings/diagnostics.js';
import { renderActivation, renderLogin, renderResetPassword } from '../features/auth/auth.js';

export async function handleSubmit(event) {
  const form = event.target;
  if (!['project-form', 'task-form', 'user-form', 'role-form', 'activation-form', 'task-comment-form', 'template-form', 'force-password-form'].includes(form.id) && !form.dataset.action) return;
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form).entries());
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add('is-loading');
  }
  try {
    if (form.id === 'activation-form') {
      if (values.password !== values.passwordConfirm) throw new Error(choose('كلمتا المرور غير متطابقتين.', 'Passwords do not match.'));
      delete values.passwordConfirm;
      await api('/api/auth/activate', { method: 'POST', body: JSON.stringify(values) });
      window.history.replaceState({}, '', window.location.pathname);
      await loadData(); 
    if (state.data?.user?.customFields?.calendarSystem) {
      state.calendarSystem = state.data.user.customFields.calendarSystem;
      try { localStorage.setItem('darc_calendar_system', state.calendarSystem); } catch (e) {}
    }
      return;
    }
    if (form.id === 'project-form') {
      if (!values.startDate) values.startDate = null;
      if (!values.dueDate) values.dueDate = null;
      if (!values.managerId) values.managerId = null;
      let memberIds = [];
      try {
        if (values.memberIds) memberIds = JSON.parse(values.memberIds);
      } catch (e) {}
      if (values.managerId && !memberIds.includes(values.managerId)) {
        memberIds.push(values.managerId);
      }
      values.memberIds = memberIds;
      const isEdit = !!form.dataset.projectId;
      const res = await api(isEdit ? `/api/projects/${form.dataset.projectId}` : '/api/projects', { method: isEdit ? 'PATCH' : 'POST', body: JSON.stringify(values) });
      if (res.project) {
        if (!state.data.projects) state.data.projects = [];
        if (isEdit) {
          const idx = state.data.projects.findIndex(p => p.id === res.project.id);
          if (idx !== -1) state.data.projects[idx] = { ...state.data.projects[idx], ...res.project };
        } else {
          state.data.projects.unshift(res.project);
        }
      }
      closeModal();
      renderView();
      showToast(choose('تم حفظ المشروع.', 'Project saved.'));
      return;
    }
    if (form.id === 'task-form') {
      const taskId = form.dataset.taskId;
      const reminderAt = values.remindAt; delete values.remindAt;
      values.templateId = values.templateId || null;
      values.typeAr = values.typeAr || (values.templateId ? 'مخطط' : null);
      values.typeEn = values.typeEn || (values.templateId ? 'Drawing' : null);
      if (!values.startDate) values.startDate = null;
      if (!values.dueDate) values.dueDate = null;
      if (!values.assigneeId) values.assigneeId = null;
      if (!values.reviewerId) values.reviewerId = null;

      // Collect multiple additional assignees (supports JSON from combobox or fallback to select options)
      let additionalAssignees = [];
      try {
        additionalAssignees = JSON.parse(values.additionalAssignees || '[]');
      } catch (e) {
        additionalAssignees = [...form.querySelectorAll('select[name="additionalAssignees"] option:checked')].map(opt => opt.value);
      }
      
      // Collect external assignees (supports JSON from combobox or comma string)
      let externalAssignees = [];
      try {
        externalAssignees = JSON.parse(values.externalAssignees || '[]');
      } catch (e) {
        const rawExternal = String(values.externalAssignees || '').trim();
        externalAssignees = rawExternal ? rawExternal.split(/[,،]+/).map(s => s.trim()).filter(Boolean) : [];
      }

      // Collect multiple reminders
      let reminders = [];
      try {
        reminders = JSON.parse(values.remindersJson || '[]');
      } catch (e) {
        reminders = [];
      }

      delete values.additionalAssignees;
      delete values.externalAssignees;
      delete values.remindersJson;
      delete values.dependencies;
      delete values.weight;
      delete values.progress;

      values.customFields = {
        additional_assignees: additionalAssignees,
        external_assignees: externalAssignees,
        reminders: reminders
      };

      if (!values.projectId) {
        values.projectId = state.activeProjectId || state.data.projects?.[0]?.id;
      }

      const isEdit = !!taskId;
      if (isEdit) {
        const existing = (state.data?.tasks || []).find(t => t.id === taskId);
        if (existing?.updatedAt) {
          values.expectedUpdatedAt = existing.updatedAt;
        }
      }

      let result;
      try {
        result = await api(isEdit ? `/api/tasks/${taskId}` : '/api/tasks', { method: isEdit ? 'PATCH' : 'POST', body: JSON.stringify(values) });
      } catch (err) {
        if (err.message && err.message.includes('تعارض')) {
          await refreshView(true);
          showToast(err.message, true);
          return;
        }
        throw err;
      }
      if (result.task) {
        if (!state.data.tasks) state.data.tasks = [];
        if (isEdit) {
          const idx = state.data.tasks.findIndex(t => t.id === result.task.id);
          if (idx !== -1) state.data.tasks[idx] = { ...state.data.tasks[idx], ...result.task };
        } else {
          state.data.tasks.unshift(result.task);

          // Auto-adjust filters so the newly created task is immediately visible to the user
          if (state.view === 'tasks') {
            if (state.taskProjectFilter !== 'all' && state.taskProjectFilter !== result.task.projectId) {
              state.taskProjectFilter = result.task.projectId;
            }
            if (state.taskFilter === 'mine' && result.task.assigneeId !== state.data.user?.id) {
              state.taskFilter = 'all';
            }
          }
        }

        // Sync any newly added reminders with /api/reminders
        if (Array.isArray(reminders) && reminders.length > 0) {
          for (const rem of reminders) {
            if (!rem.id || rem.id.startsWith('rem_temp_')) {
              const remindTime = rem.remindAt ? new Date(rem.remindAt) : null;
              if (!remindTime || isNaN(remindTime.getTime())) continue;
              api('/api/reminders', {
                method: 'POST',
                body: JSON.stringify({
                  taskId: result.task.id,
                  remindAt: remindTime.toISOString(),
                  noteAr: rem.noteAr || values.titleAr || 'تذكير لمتابعة المهمة'
                })
              }).catch(err => console.warn('[Reminder dispatch note]', err));
            }
          }
        }
      }
      closeModal();
      renderView();
      showToast(choose('تم حفظ المهمة بنجاح.', 'Task saved successfully.'));
      return;
    }
    if (form.id === 'task-comment-form') {
      const taskId = form.dataset.taskId;
      const res = await api(`/api/tasks/${taskId}/comments`, { method: 'POST', body: JSON.stringify(values) });
      form.reset();
      if (res.comment) {
        if (!state.data.comments) state.data.comments = [];
        state.data.comments.push(res.comment);
      }
      const task = state.data.tasks.find(t => t.id === taskId);
      const listEl = document.getElementById('task-comments-list');
      if (listEl) {
        listEl.innerHTML = renderTaskComments(task);
        listEl.scrollTop = listEl.scrollHeight;
      }
      if (submitButton) submitButton.disabled = false;
      return;
    }
    
    if (form.id === 'force-password-form') {
      if (!isAdmin() && !can('manage_users')) {
        throw new Error(choose('غير مصرح لك بتعيين كلمة مرور للمستخدمين.', 'Permission denied to set user password.'));
      }
      const userId = form.dataset.userId;
      const isPending = form.dataset.isPending === 'true';
      await api(`/api/users/${userId}/force-password`, { method: 'POST', body: JSON.stringify(values) });
      const localUser = state.data.users.find(u => u.id === userId);
      if (localUser) localUser.status = 'active';
      closeModal(); 
      renderView();
      showToast(isPending ? choose('تم تفعيل الحساب بنجاح.', 'Account activated successfully.') : choose('تم تغيير كلمة المرور وطرد المستخدم بنجاح.', 'Password changed and user kicked successfully.'));
      if (submitButton) submitButton.disabled = false;
      return;
    }
    if (form.id === 'user-form') {
      const userId = form.dataset.userId;
      const isEdit = !!userId;
      if (!isEdit && !isAdmin() && !can('manage_users')) {
        throw new Error(choose('غير مصرح لك بإضافة مستخدمين جدد.', 'Permission denied to create new users.'));
      }
      if (isEdit && !isAdmin() && !can('manage_users') && !can('manage_existing_account_permissions')) {
        throw new Error(choose('غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.', 'Permission denied to edit user accounts or permissions.'));
      }
      const res = await api(isEdit ? `/api/users/${userId}` : '/api/users', { method: isEdit ? 'PATCH' : 'POST', body: JSON.stringify(values) });
      if (res.user) {
        if (!state.data.users) state.data.users = [];
        if (isEdit) {
          const idx = state.data.users.findIndex(u => u.id === res.user.id);
          if (idx !== -1) state.data.users[idx] = { ...state.data.users[idx], ...res.user };
        } else {
          state.data.users.unshift(res.user);
        }
      }
      closeModal();
      renderView();
      showToast(choose('تم حفظ حساب العضو.', 'Member account saved.'));
      return;
    }
    if (form.id === 'role-form') {
      if (!isAdmin() && !can('manage_roles')) {
        throw new Error(choose('غير مصرح لك بإدارة وتعديل الأدوار.', 'Permission denied to manage roles.'));
      }
      const roleId = form.dataset.roleId;
      const permissions = [...form.querySelectorAll('input[name="permissions"]:checked')].map((el) => el.value);
      const isEdit = !!roleId;
      const res = await api(isEdit ? `/api/roles/${roleId}` : '/api/roles', { method: isEdit ? 'PATCH' : 'POST', body: JSON.stringify({ ...values, permissions }) });
      if (res.role) {
        if (!state.data.roles) state.data.roles = [];
        if (isEdit) {
          const idx = state.data.roles.findIndex(r => r.id === res.role.id);
          if (idx !== -1) state.data.roles[idx] = { ...state.data.roles[idx], ...res.role };
        } else {
          state.data.roles.push(res.role);
        }
      }
      closeModal();
      renderView();
      showToast(choose('تم حفظ الدور بنجاح.', 'Role saved.'));
      return;
    }
    if (form.id === 'template-form') {
      const templateId = form.dataset.templateId;
      const isEdit = !!templateId;
      const res = await api(isEdit ? `/api/templates/${templateId}` : '/api/templates', { method: isEdit ? 'PATCH' : 'POST', body: JSON.stringify(values) });
      if (res.template) {
        if (!state.data.templates) state.data.templates = [];
        if (isEdit) {
          const idx = state.data.templates.findIndex(t => t.id === res.template.id);
          if (idx !== -1) state.data.templates[idx] = { ...state.data.templates[idx], ...res.template };
        } else {
          state.data.templates.push(res.template);
        }
      }
      closeModal();
      renderView();
      showToast(choose('تم حفظ القالب بنجاح.', 'Template saved.'));
      return;
    }
    if (form.dataset.action === 'update-profile') {
      if (values.calendarSystem) {
        state.calendarSystem = values.calendarSystem;
        try { localStorage.setItem('darc_calendar_system', values.calendarSystem); } catch (e) {}
      }
      const res = await api('/api/users/me', { method: 'PATCH', body: JSON.stringify(values) });
      if (res.user) {
        state.data.user = { ...state.data.user, ...res.user };
        const idx = (state.data.users || []).findIndex(u => u.id === state.data.user.id);
        if (idx !== -1) state.data.users[idx] = { ...state.data.users[idx], ...res.user };
      }
      renderView();
      showToast(choose('تم حفظ وتحديث الملف الشخصي بنجاح.', 'Profile updated successfully.'));
      if (submitButton) submitButton.disabled = false;
      return;
    }
    if (form.dataset.action === 'update-company') {
      if (!isAdmin() && !can('manage_settings')) {
        throw new Error(choose('غير مصرح لك بتحديث إعدادات الشركة.', 'Permission denied to update company settings.'));
      }
      const res = await api('/api/company', { method: 'PATCH', body: JSON.stringify(values) });
      if (res.company) state.data.company = { ...state.data.company, ...res.company };
      renderView();
      showToast(choose('تم تحديث بيانات الشركة.', 'Company data updated.'));
      if (submitButton) submitButton.disabled = false;
      return;
    }
    if (form.dataset.action === 'change-password') {
      if (values.newPassword.length < 10) throw new Error(choose('كلمة المرور يجب أن تكون 10 أحرف على الأقل.', 'Password must be at least 10 characters.'));
      await api('/api/auth/change-password', { method: 'POST', body: JSON.stringify(values) });
      form.reset(); showToast(choose('تم تغيير كلمة المرور بنجاح. تم تسجيل الخروج من باقي الأجهزة.', 'Password changed successfully. Signed out of other devices.'));
      if (submitButton) submitButton.disabled = false;
      return;
    }
  } catch (error) {
    if (form.id === 'activation-form') renderActivation(values.token, error.message);
    else showToast(error.message, true);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.classList.remove('is-loading');
    }
  }
}



export async function handleClick(event) {
  const dropdown = document.getElementById('mention-dropdown');
  const projectMenu = document.getElementById('project-menu');
  if (dropdown && !event.target.closest('#mention-dropdown') && !event.target.closest('input[name="content"]')) {
    dropdown.style.display = 'none';
  }
  if (projectMenu && !event.target.closest('#project-menu') && !event.target.closest('[data-action="toggle-project-menu"]')) {
    projectMenu.style.display = 'none';
  }
  if (event.target.classList.contains('modal-backdrop')) {
    closeModal();
    return;
  }

  // Trigger file picker when task-dropzone is clicked
  const dropzoneEl = event.target.closest('#task-dropzone');
  if (dropzoneEl && event.target.id !== 'task-upload-input') {
    const progress = document.getElementById('upload-progress-container');
    if (!progress || progress.style.display === 'none') {
      const uploadInput = document.getElementById('task-upload-input');
      if (uploadInput) uploadInput.click();
    }
    return;
  }

  const target = event.target.closest('[data-action], [data-view]');
  if (!target) return;
  const action = target.dataset.action;

  if (target.classList.contains('menu-item')) {
    const pMenu = target.closest('.dropdown-menu');
    if (pMenu) pMenu.style.display = 'none';
  }

  if (target.dataset.view) {
    switchView(target.dataset.view, target.dataset.projectId || undefined);
    return;
  }

  if (action === 'trigger-avatar-upload') {
    const input = document.getElementById('user-avatar-file-input');
    if (input) input.click();
    return;
  }

  if (action === 'trigger-company-logo-upload') {
    if (!isAdmin() && !can('manage_settings')) {
      showToast(choose('غير مصرح لك بتغيير شعار الشركة.', 'Permission denied to change company logo.'), true);
      return;
    }
    const input = document.getElementById('company-logo-file-input');
    if (input) input.click();
    return;
  }

  if (action === 'toggle-theme') {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    savePreferencesCookies({ theme: state.theme });
    document.documentElement.dataset.theme = state.theme;
    document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
      btn.textContent = state.theme === 'dark' ? '☀️' : '🌙';
    });
    return;
  }
  if (action === 'toggle-lang') {
    state.lang = state.lang === 'ar' ? 'en' : 'ar';
    savePreferencesCookies({ lang: state.lang });
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('is-ltr', state.lang === 'en');
    if (state.data) { renderApp(); } else {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      if (hash.get('activate')) renderActivation(hash.get('activate'));
      else if (hash.get('reset')) renderResetPassword(hash.get('reset'));
      else renderLogin('', document.getElementById('forgot-form') ? 'forgot' : 'login');
    }
    return;
  }
  if (action === 'quick-fill-login') {
    const btn = target.closest('[data-action="quick-fill-login"]');
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');
    const emailVal = btn?.dataset?.email || 'demo@darc-design.bond';
    const passVal = btn?.dataset?.pass || 'demo123456';
    if (emailInput) {
      emailInput.value = emailVal;
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      emailInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (passInput) {
      passInput.value = passVal;
      passInput.dispatchEvent(new Event('input', { bubbles: true }));
      passInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (btn?.dataset?.autosubmit === 'true') {
      const loginForm = document.getElementById('login-form');
      if (loginForm) {
        const isDemoEmail = emailVal.trim().toLowerCase() === 'demo@darc-design.bond' || emailVal.trim().toLowerCase() === 'demo@darc.local';
        const getTurnstileToken = () => {
          if (typeof window !== 'undefined' && window.turnstile && window._turnstileWidgetId !== undefined) {
            return window.turnstile.getResponse(window._turnstileWidgetId);
          }
          return null;
        };

        const executeSubmit = () => {
          if (typeof loginForm.requestSubmit === 'function') {
            loginForm.requestSubmit();
          } else {
            loginForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          }
        };

        const currentToken = getTurnstileToken();
        if (!isDemoEmail && !currentToken && typeof window !== 'undefined' && window.turnstile) {
          btn.disabled = true;
          const origHtml = btn.innerHTML;
          btn.innerHTML = `<span>⏳ ${choose('جاري التحقق من أمان المتصفح...', 'Verifying browser security...')}</span>`;
          let attempts = 0;
          const checkTimer = setInterval(() => {
            attempts++;
            const t = getTurnstileToken();
            if (t || attempts > 20) {
              clearInterval(checkTimer);
              btn.disabled = false;
              btn.innerHTML = origHtml;
              executeSubmit();
            }
          }, 100);
          return;
        }

        executeSubmit();
      }
    }
    return;
  }
  if (action === 'goto-forgot') { 
    event.preventDefault(); 
    if (typeof history !== 'undefined' && history.replaceState) {
      history.replaceState(null, '', '#forgot');
    }
    renderLogin('', 'forgot'); 
    return; 
  }
  if (action === 'goto-login') { 
    event.preventDefault(); 
    if (typeof history !== 'undefined' && history.replaceState) {
      history.replaceState(null, '', '#login');
    }
    renderLogin(); 
    return; 
  }
  if (action === 'reset-demo-sandbox') {
    try {
      showToast(choose('جاري إعادة ضبط بيانات العرض التجريبي...', 'Resetting demo sandbox...'), false);
      const res = await api('/api/demo/reset', { method: 'POST' });
      if (res && res.data) {
        state.data = res.data;
        saveOfflineBootstrap(res.data);
        renderApp();
        showToast(choose('تمت إعادة ضبط البيانات بنجاح ✨', 'Demo data reset successfully ✨'), false);
      }
    } catch (e) {
      showToast(e.message, true);
    }
    return;
  }
  if (action === 'toggle-sidebar') { state.sidebarOpen = !state.sidebarOpen; document.querySelector('.sidebar')?.classList.toggle('open', state.sidebarOpen); return; }
  if (action === 'logout') {
    if (typeof localStorage !== 'undefined') localStorage.removeItem('darc_token');
    if (typeof window !== 'undefined' && typeof window.disconnectSupabaseRealtime === 'function') {
      window.disconnectSupabaseRealtime('logout');
    }
    await api('/api/auth/logout', { method: 'POST' }).catch(() => {});
    try {
      await clearOfflineBootstrap();
    } catch (e) {
      try {
        localStorage.removeItem('darc_offline_bootstrap');
        localStorage.removeItem('darc_offline_queue');
      } catch (err) {}
    }
    invalidateBootstrapEtag();
    state.data = null;
    state.view = 'login';
    if (typeof history !== 'undefined' && history.replaceState) {
      history.replaceState(null, '', '#login');
    } else if (typeof window !== 'undefined') {
      window.location.hash = '#login';
    }
    renderLogin();
    return;
  }
  if (action === 'logout-all') {
    if (typeof localStorage !== 'undefined') localStorage.removeItem('darc_token');
    if (typeof window !== 'undefined' && typeof window.disconnectSupabaseRealtime === 'function') {
      window.disconnectSupabaseRealtime('logout_all');
    }
    await api('/api/auth/logout-all', { method: 'POST' }).catch(() => {});
    try {
      await clearOfflineBootstrap();
    } catch (e) {
      try {
        localStorage.removeItem('darc_offline_bootstrap');
        localStorage.removeItem('darc_offline_queue');
      } catch (err) {}
    }
    invalidateBootstrapEtag();
    state.data = null;
    state.view = 'login';
    if (typeof history !== 'undefined' && history.replaceState) {
      history.replaceState(null, '', '#login');
    } else if (typeof window !== 'undefined') {
      window.location.hash = '#login';
    }
    renderLogin();
    return;
  }
  if (action === 'open-omnisearch') { openOmnisearch(); return; }
  if (action === 'close-omnisearch') { closeOmnisearch(); return; }
  if (action === 'open-cheatsheet') { openShortcutsCheatsheet(); return; }
  if (action === 'close-modal') { closeModal(); return; }
  if (action === 'show-notifications') { showNotifications(); return; }
  if (action === 'read-notification') {
    const notifId = target.dataset.notificationId || target.closest('[data-notification-id]')?.dataset.notificationId;
    const notif = (state.data?.notifications || []).find(n => n.id === notifId);

    // 1. التحديث الفوري المتفائل (Optimistic Instant Update)
    if (notif) {
      notif.read = true;
      notif.readAt = new Date().toISOString();
    }
    renderApp();

    // إرسال طلب التحديث في الخلفية دون تعطيل واجهة المستخدم
    if (notifId) {
      api(`/api/notifications/${notifId}`, { method: 'PATCH', body: JSON.stringify({}) }).catch((err) => {
        console.warn('[Notifications] Failed to patch read status in background:', err);
      });
    }

    // 2. إغلاق فوري نظيف لمودال الإشعارات بدون تأخير زمني
    closeModal(true);

    // 3. استخراج المعرفات المستهدفة (مهمة، مستند/مخطط، أو مشروع)
    const taskId = target.dataset.taskId || notif?.taskId;
    const docId = target.dataset.documentId || notif?.documentId;
    const projectId = target.dataset.projectId || notif?.projectId;
    const notifType = target.dataset.type || notif?.type;

    // A. إذا كان الإشعار يشير لمستند/مخطط محدد
    if (docId) {
      openDocumentPreviewModal(docId);
      return;
    }

    // B. إذا كان الإشعار يشير لمهمة
    if (taskId) {
      let task = (state.data?.tasks || []).find(t => t.id === taskId);
      if (task) {
        if (task.projectId) state.activeProjectId = task.projectId;
        openTaskModal(task);
        return;
      }

      // إذا لم تكن المهمة محملة مسبقاً في الذاكرة (مثلاً مسندة حديثاً أو بمشروع آخر)، يتم جلبها فوراً من الخادم
      try {
        const fetchedTask = await api(`/api/tasks/${taskId}`);
        if (fetchedTask && fetchedTask.id) {
          if (!state.data.tasks) state.data.tasks = [];
          state.data.tasks.push(fetchedTask);
          if (fetchedTask.projectId) state.activeProjectId = fetchedTask.projectId;
          openTaskModal(fetchedTask);
          return;
        }
      } catch (err) {
        console.warn('[Notifications] Failed to fetch task on demand:', err);
      }
    }

    // C. إذا كان الإشعار مراجعة مخططات عامة داخل مشروع
    if (notifType === 'document_review' && projectId) {
      state.activeProjectId = projectId;
      state.projectTab = 'documents';
      switchView('project-detail', projectId);
      return;
    }

    // D. إذا كان الإشعار مرتبطاً بمشروع
    if (projectId) {
      state.activeProjectId = projectId;
      switchView('project-detail', projectId);
      return;
    }

    await refreshView();
    return;
  }
  if (action === 'mark-all-notifications-read') {
    try {
      await api('/api/notifications/read-all', { method: 'POST' });
      (state.data?.notifications || []).forEach(n => { n.read = true; n.readAt = new Date().toISOString(); });
      showNotifications();
      renderApp();
      showToast(choose('تم تحديد كافة التنبيهات كمقروءة.', 'All notifications marked as read.'));
    } catch (e) {
      showToast(e.message, true);
    }
    return;
  }
  if (action === 'toggle-project-menu') {
    if (projectMenu) projectMenu.style.display = projectMenu.style.display === 'none' ? 'block' : 'none';
    return;
  }
  if (action === 'preview-doc') {
    const docId = target.dataset.docId || target.closest('[data-doc-id]')?.dataset.docId;
    if (docId) {
      openDocumentPreviewModal(docId);
    }
    return;
  }
  if (action === 'copy-doc-link') {
    const docId = target.dataset.docId || target.closest('[data-doc-id]')?.dataset.docId;
    const doc = state.data?.documents?.find(d => d.id === docId);
    if (doc) {
      let link = doc.viewLink || doc.downloadLink || (doc.driveFileId ? `https://drive.google.com/file/d/${doc.driveFileId}/view` : '');
      if (!link || link.startsWith('file://') || link.startsWith('/')) {
        link = `${window.location.origin}/api/documents/${doc.id}`;
      }
      if (link) {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(link);
          } else {
            const input = document.createElement('textarea');
            input.value = link;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            input.remove();
          }
          showToast(choose('تم نسخ رابط الملف إلى الحافظة بنجاح.', 'Document link copied to clipboard.'));
        } catch (e) {
          window.prompt(choose('انسخ رابط الملف من هنا:', 'Copy document link:'), link);
        }
      } else {
        showToast(choose('لا يوجد رابط متاح لهذا الملف.', 'No link available for this document.'), true);
      }
    }
    return;
  }
  if (action === 'trigger-upload') {
    const progress = document.getElementById('upload-progress-container');
    if (!progress || progress.style.display === 'none') {
      const uploadInput = document.getElementById('task-upload-input');
      if (uploadInput) uploadInput.click();
    }
    return;
  }
  if (action === 'open-upload-drawing-modal') {
    if (typeof openUploadDrawingModal === 'function') {
      openUploadDrawingModal(target.dataset.projectId || null);
    } else if (typeof window.openUploadDrawingModal === 'function') {
      window.openUploadDrawingModal(target.dataset.projectId || null);
    }
    return;
  }
  if (action === 'new-project') { openProjectModal(); return; }
  if (action === 'edit-project') { const project = state.data.projects.find((item) => item.id === target.dataset.projectId); if (project) openProjectModal(project); return; }
  if (action === 'clone-project') { 
    const project = state.data.projects.find((item) => item.id === target.dataset.projectId);
    if (project) openCloneModal(project);
    return;
  }
  if (action === 'rename-doc') {
    const docId = target.dataset.docId;
    const doc = state.data?.documents?.find(d => d.id === docId);
    if (!doc) return;
    const newName = window.prompt(choose('أدخل الاسم الجديد:', 'Enter new name:'), doc.originalName);
    if (!newName || newName === doc.originalName) return;
    try {
      await api(`/api/documents/${docId}`, { method: 'PATCH', body: JSON.stringify({ originalName: newName }) });
      doc.originalName = newName;
      await refreshView(true);
      const task = state.data?.tasks?.find(t => t.id === doc.taskId);
      if (task) {
        const list = document.getElementById('task-documents-list');
        if (list) {
          list.innerHTML = renderTaskDocuments(task);
        }
      }
    } catch (e) { showToast(e.message, true); }
    return;
  }
  
  if (action === 'go-to-trash') {
    state.settingsSection = 'trash';
    state.trashLoaded = false;
    switchView('settings');
    return;
  }

  if (action === 'delete-doc') {
    if (!window.confirm(choose('هل أنت متأكد من نقل هذا المستند إلى سلة المهملات؟ يمكنك استعادته خلال 30 يوماً.', 'Are you sure you want to move this document to trash? You can restore it within 30 days.'))) return;
    const docId = target.dataset.docId;
    const doc = state.data?.documents?.find(d => d.id === docId);
    const taskId = doc?.taskId;
    try {
      await api(`/api/documents/${docId}`, { method: 'DELETE' });
      if (state.data?.documents) {
        state.data.documents = state.data.documents.filter(d => d.id !== docId);
      }
      state.trashLoaded = false;
      await refreshView(true);
      showToast(choose('تم نقل المستند إلى سلة المهملات بنجاح.', 'Document moved to trash successfully.'));
      if (taskId) {
        const task = state.data?.tasks?.find(t => t.id === taskId);
        if (task) {
          const list = document.getElementById('task-documents-list');
          if (list) {
            list.innerHTML = renderTaskDocuments(task);
          }
        }
      }
    } catch (e) { showToast(e.message, true); }
    return;
  }

  if (action === 'delete-project') {
    if (!window.confirm(choose('هل أنت متأكد من رغبتك بحذف هذا المشروع؟ سيتم أرشفته.', 'Are you sure you want to delete this project? It will be archived.'))) return;
    // Optimistic UI update for instant feedback
    const originalProjects = [...(state.data.projects || [])];
    state.data.projects = state.data.projects.filter(p => p.id !== target.dataset.projectId);
    closeModal();
    switchView('projects');
    showToast(choose('جاري حذف المشروع...', 'Deleting project...'));
    
    try {
      await api(`/api/projects/${target.dataset.projectId}`, { method: 'DELETE' });
      state.trashLoaded = false;
      if (typeof navigator !== 'undefined' && navigator.onLine) await refreshView(true);
      showToast(choose('تم حذف المشروع بنجاح.', 'Project deleted successfully.'));
    } catch (error) { 
      // Revert if failed
      state.data.projects = originalProjects;
      renderView();
      showToast(error.message, true); 
    }
    return;
  }
  if (action === 'delete-task') {
    if (!window.confirm(choose('هل أنت متأكد من حذف هذه المهمة؟ سيتم نقلها لسلة المهملات.', 'Are you sure you want to delete this task? It will be moved to trash.'))) return;
    const taskId = target.dataset.taskId;
    const originalTasks = [...(state.data.tasks || [])];
    state.data.tasks = state.data.tasks.filter(t => t.id !== taskId);
    closeModal();
    renderView();
    showToast(choose('جاري حذف المهمة...', 'Deleting task...'));
    try {
      await api(`/api/tasks/${taskId}`, { method: 'DELETE' });
      state.trashLoaded = false;
      if (typeof navigator !== 'undefined' && navigator.onLine) await refreshView(true);
      showToast(choose('تم حذف المهمة بنجاح.', 'Task deleted successfully.'));
    } catch (error) {
      state.data.tasks = originalTasks;
      renderView();
      showToast(error.message, true);
    }
    return;
  }
  if (action === 'edit-task-comment') {
    const commentId = target.dataset.commentId;
    const taskId = target.dataset.taskId;
    const comment = (state.data.comments || []).find(c => c.id === commentId);
    if (!comment) return;
    const newContent = window.prompt(choose('تعديل التعليق:', 'Edit comment:'), comment.content);
    if (newContent === null) return;
    const trimmed = newContent.trim();
    if (!trimmed) {
      showToast(choose('لا يمكن ترك التعليق فارغاً.', 'Comment cannot be empty.'), true);
      return;
    }
    if (trimmed === comment.content) return;
    try {
      const res = await api(`/api/tasks/${taskId}/comments/${commentId}`, {
        method: 'PATCH',
        body: JSON.stringify({ content: trimmed })
      });
      if (res.comment) {
        const idx = (state.data.comments || []).findIndex(c => c.id === commentId);
        if (idx !== -1) state.data.comments[idx] = res.comment;
        const task = (state.data.tasks || []).find(t => t.id === taskId);
        const listEl = document.getElementById('task-comments-list');
        if (listEl && task) {
          listEl.innerHTML = renderTaskComments(task);
        }
        showToast(choose('تم تعديل التعليق بنجاح.', 'Comment updated successfully.'));
      }
    } catch (err) {
      showToast(err.message, true);
    }
    return;
  }
  if (action === 'delete-task-comment') {
    const commentId = target.dataset.commentId;
    const taskId = target.dataset.taskId;
    if (!window.confirm(choose('هل أنت متأكد من حذف هذا التعليق؟', 'Are you sure you want to delete this comment?'))) return;
    try {
      await api(`/api/tasks/${taskId}/comments/${commentId}`, { method: 'DELETE' });
      if (state.data.comments) {
        state.data.comments = state.data.comments.filter(c => c.id !== commentId);
      }
      const task = (state.data.tasks || []).find(t => t.id === taskId);
      const listEl = document.getElementById('task-comments-list');
      if (listEl && task) {
        listEl.innerHTML = renderTaskComments(task);
      }
      showToast(choose('تم حذف التعليق بنجاح.', 'Comment deleted successfully.'));
    } catch (err) {
      showToast(err.message, true);
    }
    return;
  }
  if (action === 'manual-sync') {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      showToast(choose('أنت في وضع عدم الاتصال حالياً. كافة العمليات محفوظة محلياً وستُرفع تلقائياً عند عودة النت 📡', 'You are currently offline. Changes are saved locally and will auto-sync on reconnect 📡'), false);
      return;
    }
    const pending = getPendingMutations();
    if (!pending.length) {
      showToast(choose('جميع البيانات متزامنة ومحدثة بالكامل مع الخادم السحابي ✔️', 'All data is completely synchronized with cloud server ✔️'), false);
      return;
    }
    showToast(choose(`جاري مزامنة ${pending.length} عمليات معلقة مع السيرفر...`, `Syncing ${pending.length} pending actions with server...`), false);
    const res = await syncPendingMutations(api);
    if (res.synced > 0) {
      showToast(choose(`تمت مزامنة ${res.synced} عمليات بنجاح! 🚀`, `Successfully synced ${res.synced} actions! 🚀`), false);
      await loadData(); 
    if (state.data?.user?.customFields?.calendarSystem) {
      state.calendarSystem = state.data.user.customFields.calendarSystem;
      try { localStorage.setItem('darc_calendar_system', state.calendarSystem); } catch (e) {}
    }
    } else if (res.failed > 0) {
      showToast(choose(`فشلت مزامنة ${res.failed} عمليات، يرجى المحاولة لاحقاً.`, `Failed to sync ${res.failed} actions, please try again.`), true);
    }
    return;
  }
  if (action === 'new-task') { openTaskModal(null, null, target.dataset.projectId); return; }
  if (action === 'new-user') {
    if (!isAdmin() && !can('manage_users')) {
      showToast(choose('غير مصرح لك بإضافة مستخدمين جدد.', 'Permission denied to create new users.'), true);
      return;
    }
    openUserModal();
    return;
  }
  if (action === 'new-role') {
    if (!isAdmin() && !can('manage_roles')) {
      showToast(choose('غير مصرح لك بإنشاء أدوار جديدة.', 'Permission denied to create new roles.'), true);
      return;
    }
    openRoleModal();
    return;
  }
  if (action === 'new-template') { openTemplateModal(); return; }
  if (action === 'edit-template') { const template = state.data.templates.find((item) => item.id === target.dataset.templateId); if (template) openTemplateModal(template); return; }
  if (action === 'delete-template') { 
    if (!window.confirm(choose('هل أنت متأكد من حذف هذا القالب؟', 'Are you sure you want to delete this template?'))) return; 
    
    const originalTemplates = [...(state.data.templates || [])];
    state.data.templates = state.data.templates.filter(t => t.id !== target.dataset.templateId);
    renderView();
    closeModal();
    
    try { 
      await api(`/api/templates/${target.dataset.templateId}`, { method: 'DELETE' }); 
      await refreshView(true); 
      showToast(choose('تم حذف القالب.', 'Template deleted.')); 
    } catch (error) { 
      state.data.templates = originalTemplates;
      renderView();
      showToast(error.message, true); 
    } 
    return; 
  }
  if (action === 'open-project') { 
    state.projectTab = 'tasks'; 
    state.projectMemberFilter = null; 
    switchView('project-detail', target.dataset.projectId); 
    return; 
  }
  if (action === 'filter-by-member') {
    const memberId = target.dataset.memberId;
    state.projectMemberFilter = state.projectMemberFilter === memberId ? null : memberId;
    state.projectTab = 'tasks';
    requestAnimationFrame(() => renderView());
    return;
  }
  if (action === 'clear-member-filter') {
    state.projectMemberFilter = null;
    requestAnimationFrame(() => renderView());
    return;
  }
  if (action === 'back-to-projects') { 
    state.projectMemberFilter = null;
    switchView('projects', null); 
    return; 
  }
  if (action === 'project-tab') {
    state.projectTab = target.dataset.tab;
    try {
      if (typeof window !== 'undefined' && state.activeProjectId) {
        window._isInternalNav = true;
        window.location.hash = `project-detail?id=${encodeURIComponent(state.activeProjectId)}&tab=${encodeURIComponent(state.projectTab)}`;
      }
      if (typeof sessionStorage !== 'undefined') {
        const saved = sessionStorage.getItem('darc_last_route');
        const parsed = saved ? JSON.parse(saved) : {};
        parsed.view = 'project-detail';
        parsed.activeProjectId = state.activeProjectId;
        parsed.projectTab = state.projectTab;
        sessionStorage.setItem('darc_last_route', JSON.stringify(parsed));
      }
    } catch (e) {}
    target.closest('.detail-tabs')?.querySelectorAll('.detail-tab').forEach(b => b.classList.toggle('active', b === target));
    const main = document.getElementById('main-content');
    if (main) main.scrollTop = 0;
    requestAnimationFrame(() => renderView());
    return;
  }
  if (action === 'toggle-timeline-view') {
    state.timelineView = target.dataset.viewMode || 'gantt';
    requestAnimationFrame(() => renderView());
    return;
  }
  if (action === 'prev-calendar-month') {
    const d = state.calendarDate ? new Date(state.calendarDate) : new Date();
    d.setMonth(d.getMonth() - 1);
    state.calendarDate = d;
    requestAnimationFrame(() => renderView());
    return;
  }
  if (action === 'next-calendar-month') {
    const d = state.calendarDate ? new Date(state.calendarDate) : new Date();
    d.setMonth(d.getMonth() + 1);
    state.calendarDate = d;
    requestAnimationFrame(() => renderView());
    return;
  }
  if (action === 'today-calendar-month') {
    state.calendarDate = new Date();
    requestAnimationFrame(() => renderView());
    return;
  }
  if (action === 'open-task') {
    if (window._justDroppedAt && (Date.now() - window._justDroppedAt < 250)) {
      return; // Ignore synthetic click caused by mouse release on drop
    }
    const taskId = target.dataset.taskId || target.closest('[data-task-id]')?.dataset.taskId;
    if (!taskId) return;
    let task = (state.data?.tasks || []).find((item) => item.id === taskId);
    if (task) {
      openTaskModal(task);
      return;
    }
    api(`/api/tasks/${taskId}`).then((fetched) => {
      if (fetched && fetched.id) {
        if (!state.data.tasks) state.data.tasks = [];
        state.data.tasks.push(fetched);
        openTaskModal(fetched);
      } else {
        showToast(choose('تعذر العثور على المهمة أو تم نقلها لسلة المهملات.', 'Task not found or was moved to trash.'), true);
      }
    }).catch((err) => {
      showToast(choose('تعذر فتح المهمة: ' + err.message, 'Could not open task: ' + err.message), true);
    });
    return;
  }
  if (action === 'task-filter') {
    state.taskFilter = target.dataset.filter;
    target.closest('.view-toolbar-start')?.querySelectorAll('.filter-tab').forEach(b => b.classList.toggle('active', b === target));
    requestAnimationFrame(() => renderView());
    return;
  }
  if (action === 'template-category') {
    state.templateCategory = target.dataset.category;
    requestAnimationFrame(() => renderView());
    return;
  }
  if (action === 'use-template') { if (!state.data.projects.length) return showToast(t('noProjects'), true); openTaskModal(null, target.dataset.templateId, state.activeProjectId); return; }
  if (action === 'open-user') {
    if (!isAdmin() && !can('manage_users') && !can('manage_existing_account_permissions')) {
      showToast(choose('غير مصرح لك بتعديل بيانات أو صلاحيات المستخدمين.', 'Permission denied to edit user accounts or permissions.'), true);
      return;
    }
    const user = state.data.users.find((item) => item.id === target.dataset.userId);
    if (user) openUserModal(user);
    return;
  }
  if (action === 'impersonate-user') {
    if (!isAdmin()) {
      showToast(choose('هذه الصلاحية خاصة بمدير النظام فقط.', 'Impersonation is restricted to system admin only.'), true);
      return;
    }
    if (!window.confirm('هل أنت متأكد أنك تريد الدخول كـ هذا الحساب؟ للعودة ستحتاج لتسجيل الخروج والدخول بحسابك مجدداً.')) return;
    try {
      const res = await api(`/api/users/${target.dataset.userId}/impersonate`, { method: 'POST' });
      if (res && res.token && typeof localStorage !== 'undefined') {
        localStorage.setItem('darc_token', res.token);
      }
      window.location.reload();
    } catch(e) { showToast(e.message, true); }
    return;
  }
  if (action === 'force-password-user') {
    if (!isAdmin() && !can('manage_users')) {
      showToast(choose('غير مصرح لك بتعيين كلمة مرور للمستخدمين.', 'Permission denied to set user password.'), true);
      return;
    }
    const user = state.data.users.find((item) => item.id === target.dataset.userId);
    if (user) openForcePasswordModal(user);
    return;
  }

  if (action === 'invite-user') { 
    if (!isAdmin() && !can('manage_users')) {
      showToast(choose('غير مصرح لك بإرسال دعوات للمستخدمين.', 'Permission denied to invite users.'), true);
      return;
    }
    try { const result = await api(`/api/users/${target.dataset.userId}/invite`, { method: 'POST' }); await refreshView(); showToast(result.emailConfigured ? choose('تم إرسال الدعوة.', 'Invitation sent.') : choose('تم تجهيز الدعوة، لكن مزود البريد غير مكوّن.', 'Invite prepared, but the email provider is not configured.')); } catch (error) { showToast(error.message, true); } return; 
  }
  if (action === 'deactivate-user') { 
    if (!isAdmin() && !can('manage_users')) {
      showToast(choose('غير مصرح لك بتعطيل حسابات المستخدمين.', 'Permission denied to deactivate users.'), true);
      return;
    }
    if (!window.confirm(t('confirmDeactivate'))) return; 
    
    const userId = target.dataset.userId;
    const user = state.data.users.find(u => u.id === userId);
    const originalStatus = user ? user.status : null;
    if (user) user.status = 'inactive';
    renderView();
    closeModal();

    try { 
      await api(`/api/users/${userId}`, { method: 'DELETE' }); 
      await refreshView(true); 
      showToast(choose('تم تعطيل الحساب.', 'Account deactivated.')); 
    } catch (error) { 
      if (user) user.status = originalStatus;
      renderView();
      showToast(error.message, true); 
    } 
    return; 
  }
  if (action === 'settings-section') { 
    const requested = target.dataset.section || 'profile';
    if (!canAccessSettingsSection(requested)) {
      showToast(choose('غير مصرح لك بالوصول لهذا القسم من الإعدادات.', 'Access denied to this settings section.'), true);
      return;
    }
    state.settingsSection = requested; 
    try {
      if (typeof window !== 'undefined') {
        window._isInternalNav = true;
        window.location.hash = `settings?section=${encodeURIComponent(state.settingsSection)}`;
      }
      if (typeof sessionStorage !== 'undefined') {
        const saved = sessionStorage.getItem('darc_last_route');
        const parsed = saved ? JSON.parse(saved) : {};
        parsed.view = 'settings';
        parsed.settingsSection = state.settingsSection;
        sessionStorage.setItem('darc_last_route', JSON.stringify(parsed));
      }
    } catch (e) {}
    target.closest('.settings-nav')?.querySelectorAll('.settings-nav-item').forEach(b => b.classList.toggle('active', b === target));
    if (state.settingsSection === 'analytics') {
      fetchAnalyticsData(true).then(() => renderView()).catch(() => {});
    }
    if (state.settingsSection === 'trash' && !state.trashLoaded) {
      api('/api/trash').then(data => {
        state.trash = Array.isArray(data) ? data : (data.trash || [
          ...(data.projects || []).map(p => ({...p, type:'project'})),
          ...(data.tasks || []).map(t => ({...t, type:'task'})),
          ...(data.documents || []).map(d => ({...d, type:'document'}))
        ]);
        state.trashLoaded = true;
        try { if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('darc_trash_cache', JSON.stringify(state.trash)); } catch (e) {}
        renderView();
      }).catch(e => console.error(e));
    }
    requestAnimationFrame(() => renderView()); 
    return; 
  }
  if (action === 'refresh-analytics') {
    if (!canAccessSettingsSection('analytics')) {
      showToast(choose('غير مصرح لك بعرض وتحديث التحليلات والمراقبة.', 'Permission denied to view and refresh analytics.'), true);
      return;
    }
    try {
      await fetchAnalyticsData(true);
      renderView();
      showToast(choose('تم تحديث مؤشرات التحليلات والمراقبة الحية بنجاح.', 'Live observability and analytics refreshed successfully.'));
    } catch (e) {
      showToast(e.message, true);
    }
    return;
  }
  if (action === 'test-anomaly-alert') {
    if (!isAdmin() && !can('manage_settings')) {
      showToast(choose('غير مصرح لك بإجراء محاكاة التنبيهات.', 'Permission denied to simulate anomaly alert.'), true);
      return;
    }
    try {
      const res = await api('/api/telemetry/test-anomaly', { method: 'POST' });
      await fetchAnalyticsData(true);
      await loadData(true);
      renderApp();
      showToast(choose('🚨 تم رصد استهلاك زائد بنجاح وإرسال إشعار فوري لمركز التنبيهات!', '🚨 Anomaly detected! Alert notification dispatched to Notification Center!'));
    } catch (e) {
      showToast(e.message, true);
    }
    return;
  }
  if (action === 'goto-diagnostics') {
    if (!isAdmin() && !can('manage_settings')) {
      showToast(choose('غير مصرح لك بالوصول لتشخيص الأعطال.', 'Permission denied to access diagnostics.'), true);
      return;
    }
    state.settingsSection = 'diagnostics';
    if (typeof history !== 'undefined' && history.replaceState) {
      history.replaceState(null, '', '#settings?section=diagnostics');
    }
    renderView();
    return;
  }
  if (action === 'refresh-diagnostics') {
    if (!isAdmin() && !can('manage_settings')) {
      showToast(choose('غير مصرح لك بتحديث سجل الأعطال.', 'Permission denied to refresh diagnostics.'), true);
      return;
    }
    try {
      await fetchDiagnosticsData(true);
      renderView();
      showToast(choose('تم تحديث سجل الأخطاء وتشخيصات المستخدمين بنجاح.', 'Diagnostics and incidents refreshed successfully.'));
    } catch (e) {
      showToast(e.message, true);
    }
    return;
  }
  if (action === 'test-incident-simulate') {
    if (!isAdmin() && !can('manage_settings')) {
      showToast(choose('غير مصرح لك بإجراء محاكاة للأعطال.', 'Permission denied to simulate error incidents.'), true);
      return;
    }
    try {
      const res = await api('/api/telemetry/test-error', { method: 'POST' });
      await fetchDiagnosticsData(true);
      await loadData(true);
      renderView();
      showToast(choose('🚨 تم رصد الخطأ وتوثيق خطوات المستخدم وإرسال بريد تنبيه للإدارة بنجاح!', '🚨 Incident recorded with stack trace and alert email sent to admin!'));
    } catch (e) {
      showToast(e.message, true);
    }
    return;
  }
  if (action === 'test-diagnostic-email') {
    if (!isAdmin() && !can('manage_settings')) {
      showToast(choose('غير مصرح لك باختبار إرسال البريد.', 'Permission denied to test alert email.'), true);
      return;
    }
    try {
      const res = await api('/api/telemetry/test-email', { method: 'POST' });
      showToast(choose('✉️ تم إرسال رسالة اختبار التنبيهات البريدية للإدارة بنجاح!', '✉️ Test alert email dispatched to admin successfully!'));
    } catch (e) {
      showToast(e.message, true);
    }
    return;
  }
  if (action === 'filter-diagnostics-user') {
    const userId = target.dataset.userId || 'all';
    setDiagnosticsUserFilter(userId);
    renderView();
    return;
  }
  if (action === 'clear-diagnostics-user-filter') {
    setDiagnosticsUserFilter('all');
    renderView();
    return;
  }
  if (action === 'resolve-diagnostic-incident') {
    if (!isAdmin() && !can('manage_settings')) {
      showToast(choose('غير مصرح لك بمعالجة بلاغات الأعطال.', 'Permission denied to resolve incidents.'), true);
      return;
    }
    const incId = target.dataset.incidentId;
    if (incId) {
      try {
        await api(`/api/telemetry/incidents/${incId}/resolve`, { method: 'PATCH' });
        await fetchDiagnosticsData(true);
        renderView();
        showToast(choose('تم تحديد المشكلة كمعالجة بنجاح ✅', 'Incident marked as resolved ✅'));
      } catch (e) {
        showToast(e.message, true);
      }
    }
    return;
  }
  if (action === 'copy-debug-bundle') {
    const bundle = target.dataset.bundle;
    if (bundle && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(bundle).then(() => {
        showToast(choose('تم نسخ تقرير المشكلة الفني بالكامل للحافظة 📋', 'Full debug bundle copied to clipboard 📋'));
      }).catch(() => {
        showToast(choose('فشل النسخ التلقائي للحافظة', 'Failed to copy to clipboard'), true);
      });
    }
    return;
  }
  if (action === 'restore-item') {
    if (!isAdmin() && !can('manage_trash')) {
      showToast(choose('غير مصرح لك باستعادة العناصر المحذوفة.', 'Permission denied to restore deleted items.'), true);
      return;
    }
    try {
      await api(`/api/restore/${target.dataset.type}/${target.dataset.id}`, { method: 'POST' });
      const data = await api('/api/trash');
      state.trash = Array.isArray(data) ? data : (data.trash || [
        ...(data.projects || []).map(p => ({...p, type:'project'})),
        ...(data.tasks || []).map(t => ({...t, type:'task'})),
        ...(data.documents || []).map(d => ({...d, type:'document'}))
      ]);
      try { if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('darc_trash_cache', JSON.stringify(state.trash)); } catch (e) {}
      await refreshView();
      showToast(choose('تمت الاستعادة بنجاح.', 'Restored successfully.'));
    } catch(e) { showToast(e.message, true); }
    return;
  }
  if (action === 'filter-trash') {
    if (!isAdmin() && !can('manage_trash')) return;
    state.trashFilter = target.dataset.filter;
    requestAnimationFrame(() => renderView());
    return;
  }
  if (action === 'purge-trash-item') {
    if (!isAdmin() && !can('manage_trash')) {
      showToast(choose('غير مصرح لك بحذف العناصر نهائياً من سلة المهملات.', 'Permission denied to permanently delete trash items.'), true);
      return;
    }
    const type = target.dataset.type;
    const id = target.dataset.id;
    if (!window.confirm(choose('هل أنت متأكد من الحذف النهائي لهذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.', 'Are you sure you want to permanently delete this item? This action cannot be undone.'))) return;
    try {
      await api(`/api/trash/${type}/${id}`, { method: 'DELETE' });
      const data = await api('/api/trash');
      state.trash = Array.isArray(data) ? data : (data.trash || [
        ...(data.projects || []).map(p => ({...p, type:'project'})),
        ...(data.tasks || []).map(t => ({...t, type:'task'})),
        ...(data.documents || []).map(d => ({...d, type:'document'}))
      ]);
      renderView();
      showToast(choose('تم حذف العنصر نهائياً بنجاح.', 'Item permanently deleted.'));
    } catch(e) { showToast(e.message, true); }
    return;
  }
  if (action === 'empty-trash') {
    if (!isAdmin() && !can('manage_trash')) {
      showToast(choose('غير مصرح لك بإفراغ سلة المهملات.', 'Permission denied to empty trash.'), true);
      return;
    }
    if (!window.confirm(choose('هل أنت متأكد تماماً من إفراغ سلة المهملات بالكامل؟ سيتم مسح كافة العناصر المحذوفة نهائياً ولا يمكن استرجاعها.', 'Are you sure you want to empty the entire recycle bin? All items will be permanently erased.'))) return;
    try {
      await api('/api/trash/empty', { method: 'DELETE' });
      state.trash = [];
      renderView();
      showToast(choose('تم إفراغ سلة المهملات بالكامل بنجاح.', 'Trash bin emptied successfully.'));
    } catch(e) { showToast(e.message, true); }
    return;
  }
  if (action === 'open-role') {
    if (!isAdmin() && !can('manage_roles')) {
      showToast(choose('غير مصرح لك بتعديل الأدوار والصلاحيات.', 'Permission denied to modify roles.'), true);
      return;
    }
    const role = state.data.roles.find((item) => item.id === target.dataset.roleId);
    if (role) openRoleModal(role);
    return;
  }
  if (action === 'delete-role') { 
    if (!isAdmin() && !can('manage_roles')) {
      showToast(choose('غير مصرح لك بحذف الأدوار.', 'Permission denied to delete roles.'), true);
      return;
    }
    if (!window.confirm(t('confirmDeleteRole'))) return; 
    
    const roleId = target.dataset.roleId;
    const originalRoles = [...(state.data.roles || [])];
    state.data.roles = state.data.roles.filter(r => r.id !== roleId);
    renderView();
    closeModal();
    
    try { 
      await api(`/api/roles/${roleId}`, { method: 'DELETE' }); 
      await refreshView(true); 
      showToast(choose('تم حذف الدور.', 'Role deleted.')); 
    } catch (error) { 
      state.data.roles = originalRoles;
      renderView();
      showToast(error.message, true); 
    } 
    return; 
  }
  if (action === 'export-csv') {
    if (!can('export_reports') && !isAdmin()) {
      showToast(choose('ليس لديك صلاحية لتصدير التقارير.', 'You do not have permission to export reports.'), true);
      return;
    }
    exportPortfolioXLS();
    return;
  }
  if (action === 'print-portfolio-pdf') {
    if (!can('export_reports') && !isAdmin()) {
      showToast(choose('ليس لديك صلاحية لطباعة التقارير.', 'You do not have permission to print reports.'), true);
      return;
    }
    exportPortfolioPDF();
    return;
  }
  if (action === 'export-project') {
    if (!can('export_reports') && !isAdmin()) {
      showToast(choose('ليس لديك صلاحية لتصدير التقارير.', 'You do not have permission to export reports.'), true);
      return;
    }
    exportProjectXLS(target.dataset.projectId);
    return;
  }
  if (action === 'export-project-pdf') {
    if (!can('export_reports') && !isAdmin()) {
      showToast(choose('ليس لديك صلاحية لتصدير التقارير.', 'You do not have permission to export reports.'), true);
      return;
    }
    exportProjectPDF(target.dataset.projectId, false);
    return;
  }
  if (action === 'export-project-client-pdf') {
    if (!can('export_reports') && !isAdmin()) {
      showToast(choose('ليس لديك صلاحية لتصدير التقارير.', 'You do not have permission to export reports.'), true);
      return;
    }
    exportProjectPDF(target.dataset.projectId, true);
    return;
  }
  if (action === 'export-audit-xls') {
    if (!can('view_audit_logs') && !isAdmin()) {
      showToast(choose('ليس لديك صلاحية لتصدير سجل الرقابة.', 'You do not have permission to export audit logs.'), true);
      return;
    }
    exportAuditLogsXLS();
    return;
  }
  if (action === 'print-audit-pdf') {
    if (!can('view_audit_logs') && !isAdmin()) {
      showToast(choose('ليس لديك صلاحية لطباعة سجل الرقابة.', 'You do not have permission to print audit logs.'), true);
      return;
    }
    printAuditReport();
    return;
  }
  if (action === 'load-full-audit') {
    if (!isAdmin() && !can('view_audit_logs')) {
      showToast(choose('غير مصرح لك باستعراض سجل التدقيق الكامل.', 'Permission denied to view full audit logs.'), true);
      return;
    }
    fetchFullAuditHistory();
    return;
  }
  if (action === 'reset-audit-filters') {
    state.auditFilterAction = 'all';
    state.auditFilterEntity = 'all';
    state.auditFilterUser = 'all';
    state.auditSearchQuery = '';
    renderView();
    return;
  }
}

let _searchDebounceTimer = null;

export function handleInput(event) {
  if (event.target.name === 'content' && event.target.closest('#task-comment-form')) {
    const val = event.target.value;
    const match = val.match(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/);
    const dropdown = document.getElementById('mention-dropdown');
    if (match) {
      const query = match[1].toLowerCase();
      const users = (state.data?.users || []).filter(u => u.status !== 'inactive');
      const filtered = users.filter(u => `${u.name || ''} ${u.nameEn || ''} ${u.email || ''}`.toLowerCase().includes(query));
      if (filtered.length) {
        dropdown.innerHTML = filtered.map(u => {
          const rawName = u.name || u.nameEn || u.email || 'user';
          const username = rawName.trim().split(/\s+/)[0];
          return `
            <div class="mention-option" data-username="${esc(username)}" style="padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);">
              ${avatar(u, 'avatar-sm')}
              <span style="font-size:12px;">${esc(choose(u.name, u.nameEn || u.name))}</span>
            </div>
          `;
        }).join('');
        dropdown.style.display = 'block';
        
        const options = dropdown.querySelectorAll('.mention-option');
        options.forEach(opt => {
          opt.onclick = () => {
            const username = opt.dataset.username;
            event.target.value = val.replace(/@([a-zA-Z\u0600-\u06FF0-9_]*)$/, `@${username} `);
            dropdown.style.display = 'none';
            event.target.focus();
          };
        });
      } else {
        dropdown.style.display = 'none';
      }
    } else {
      dropdown.style.display = 'none';
    }
  }

  if (event.target.dataset.action === 'search-trash-input') {
    state.trashQuery = event.target.value;
    const cursor = event.target.selectionStart;
    clearTimeout(_searchDebounceTimer);
    _searchDebounceTimer = setTimeout(() => {
      renderView();
      const next = document.querySelector('[data-action="search-trash-input"]');
      if (next) { next.focus(); next.setSelectionRange(cursor, cursor); }
    }, 120);
    return;
  }

  if (event.target.dataset.action === 'search-audit-input') {
    state.auditSearchQuery = event.target.value;
    const cursor = event.target.selectionStart;
    clearTimeout(_searchDebounceTimer);
    _searchDebounceTimer = setTimeout(() => {
      renderView();
      const next = document.querySelector('[data-action="search-audit-input"]');
      if (next) { next.focus(); next.setSelectionRange(cursor, cursor); }
    }, 120);
    return;
  }

  const search = event.target.dataset.search || (event.target.dataset.action === 'search-documents' ? 'documents' : null);
  if (!search) return;
  state.searches[search] = event.target.value;
  const cursor = event.target.selectionStart;
  clearTimeout(_searchDebounceTimer);
  _searchDebounceTimer = setTimeout(() => {
    renderView();
    const next = document.querySelector(`[data-search="${search}"], [data-action="search-documents"]`);
    if (next) { next.focus(); next.setSelectionRange(cursor, cursor); }
  }, 120);
}

export async function handleChange(event) {
  if (event.target.dataset.action === 'filter-diagnostics-severity') {
    setDiagnosticsSeverityFilter(event.target.value);
    renderView();
    return;
  }
  if (event.target.dataset.action === 'filter-diagnostics-status') {
    setDiagnosticsStatusFilter(event.target.value);
    renderView();
    return;
  }
  if (event.target.dataset.action === 'change-doc-status') {
    const docId = event.target.dataset.docId;
    const newStatus = event.target.value;
    const doc = state.data?.documents?.find(d => d.id === docId);
    if (!doc) return;
    try {
      await api(`/api/documents/${docId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      doc.status = newStatus;
      showToast(choose('تم تحديث حالة المخطط بنجاح ✅', 'Drawing status updated ✅'));
      await refreshView(true);
    } catch (err) {
      showToast(err.message, true);
    }
    return;
  }

  if (event.target.dataset.action === 'doc-project-filter') {
    state.docProjectFilter = event.target.value;
    renderView();
    return;
  }

  if (event.target.dataset.action === 'filter-project-docs-task') {
    state.docTaskFilter = event.target.value;
    renderView();
    return;
  }

  if (event.target.dataset.action === 'filter-audit-action') {
    state.auditFilterAction = event.target.value;
    renderView();
    return;
  }

  if (event.target.dataset.action === 'filter-audit-entity') {
    state.auditFilterEntity = event.target.value;
    renderView();
    return;
  }

  if (event.target.dataset.action === 'filter-audit-user') {
    state.auditFilterUser = event.target.value;
    renderView();
    return;
  }

  if (event.target.dataset.action === 'sort-project-tasks' || event.target.dataset.action === 'sort-my-tasks') {
    setSavedTaskSort(event.target.value);
    renderView();
    return;
  }

  if (event.target.name === 'templateId' && event.target.form?.id === 'task-form') {
    const form = event.target.form;
    const templateId = event.target.value;
    const template = state.data.templates?.find(t => t.id === templateId);
    const titleArInput = form.querySelector('input[name="titleAr"]');
    const titleEnInput = form.querySelector('input[name="titleEn"]');
    const typeArInput = form.querySelector('#task-type-ar');
    const typeEnInput = form.querySelector('#task-type-en');
    const descInput = form.querySelector('textarea[name="descriptionAr"]');
    if (template) {
      if (titleArInput && (!titleArInput.value || form.dataset.templateSelected === 'true')) {
        titleArInput.value = template.nameAr;
      }
      if (titleEnInput && (!titleEnInput.value || form.dataset.templateSelected === 'true')) {
        titleEnInput.value = template.nameEn || '';
      }
      if (typeArInput) typeArInput.value = template.typeAr || 'مخطط';
      if (typeEnInput) typeEnInput.value = template.typeEn || 'Drawing';
      if (descInput && (!descInput.value || form.dataset.templateSelected === 'true')) {
        descInput.value = template.descriptionAr || '';
      }
      form.dataset.templateSelected = 'true';
    } else {
      if (typeArInput) typeArInput.value = '';
      if (typeEnInput) typeEnInput.value = '';
      delete form.dataset.templateSelected;
    }
    return;
  }

  if (event.target.name === 'status' && event.target.form?.id === 'task-form') {
    const badge = event.target.form.querySelector('#task-auto-progress-badge');
    if (badge) {
      const pMap = { not_started: 0, in_progress: 50, review: 80, approval: 80, done: 100 };
      const val = pMap[event.target.value];
      badge.textContent = val !== undefined ? `(${val}%)` : '';
    }
    return;
  }

  if (event.target.dataset.action === 'task-project-filter') {
    state.taskProjectFilter = event.target.value;
    renderView();
    return;
  }

  if (event.target.dataset.action === 'task-priority-filter') {
    state.taskPriorityFilter = event.target.value;
    renderView();
    return;
  }

  if (event.target.id === 'sort-projects' || event.target.dataset?.action === 'sort-projects') {
    state.projectSort = event.target.value;
    renderView();
    return;
  }
  
  if (event.target.id === 'task-upload-input') {
    const files = event.target.files;
    if (!files.length) return;
    const taskId = event.target.dataset.taskId;
    uploadTaskFiles(files, taskId);
    return;
  }

  if (event.target.classList.contains('doc-status-select')) {
    const docId = event.target.dataset.docId;
    const newStatus = event.target.value;
    api(`/api/documents/${docId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus })
    }).then(() => {
      refreshView(true).then(() => showToast(choose('تم تحديث حالة المخطط.', 'Document status updated.')));
    }).catch(err => showToast(err.message, true));
    return;
  }

  if (event.target.id === 'user-avatar-file-input') {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) {
      showToast(choose('حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميغابايت.', 'Image is too large. Maximum allowed size is 2MB.'), true);
      event.target.value = '';
      return;
    }
    if (!file.type.startsWith('image/')) {
      showToast(choose('يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).', 'Please select a valid image file (JPG, PNG, WebP).'), true);
      event.target.value = '';
      return;
    }
    try {
      showToast(choose('جاري معالجة ورفع صورتك الشخصية...', 'Processing & uploading avatar...'));
      const dataUrl = await fileToDataUrl(file, 256, 256);
      const res = await api('/api/users/me', { method: 'PATCH', body: JSON.stringify({ avatarUrl: dataUrl }) });
      if (res.user) {
        state.data.user = { ...state.data.user, ...res.user };
        const idx = (state.data.users || []).findIndex(u => u.id === state.data.user.id);
        if (idx !== -1) state.data.users[idx] = { ...state.data.users[idx], ...res.user };
      }
      event.target.value = '';
      renderApp();
      playSuccessChime();
      showToast(choose('تم تحديث صورتك الشخصية وتثبيتها بنجاح!', 'Avatar updated successfully!'));
    } catch (err) {
      event.target.value = '';
      showToast(err.message, true);
    }
    return;
  }

  if (event.target.id === 'company-logo-file-input') {
    if (!isAdmin() && !can('manage_settings')) {
      showToast(choose('غير مصرح لك بتغيير شعار الشركة.', 'Permission denied to change company logo.'), true);
      event.target.value = '';
      return;
    }
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      showToast(choose('حجم الشعار كبير جداً، الحد الأقصى هو 3 ميغابايت.', 'Logo is too large. Maximum allowed size is 3MB.'), true);
      event.target.value = '';
      return;
    }
    if (!file.type.startsWith('image/')) {
      showToast(choose('يرجى اختيار ملف صورة أو شعار صالح.', 'Please select a valid logo image file.'), true);
      event.target.value = '';
      return;
    }
    try {
      showToast(choose('جاري معالجة ورفع شعار الشركة...', 'Uploading company logo...'));
      const dataUrl = await fileToDataUrl(file, 400, 400);
      const res = await api('/api/company', { method: 'PATCH', body: JSON.stringify({ logoUrl: dataUrl }) });
      if (res.company) {
        state.data.company = { ...state.data.company, ...res.company };
      }
      event.target.value = '';
      renderApp();
      playSuccessChime();
      showToast(choose('تم تحديث وتثبيت شعار مساحة العمل بنجاح!', 'Company logo updated successfully!'));
    } catch (err) {
      event.target.value = '';
      showToast(err.message, true);
    }
    return;
  }
}

function fileToDataUrl(file, maxWidth = 300, maxHeight = 300) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(choose('فشل قراءة ملف الصورة.', 'Failed to read image file.')));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error(choose('صيغة الصورة تالفة أو غير صالحة.', 'Corrupted or invalid image format.')));
      img.onload = () => {
        try {
          const natW = img.naturalWidth || img.width;
          const natH = img.naturalHeight || img.height;

          // 1. Guard against Image Decompression Bombs & Pixel Flood attacks
          if (natW > 4096 || natH > 4096 || (natW * natH > 16000000)) {
            reject(new Error(choose('أبعاد الصورة ضخمة جداً وغير آمنة (Pixel Flood Blocked). يرجى اختيار صورة قياسية.', 'Image dimensions too large (Pixel Flood Blocked). Please select a standard image.')));
            return;
          }

          let width = natW;
          let height = natH;
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // 2. Compress to modern lightweight WebP (or JPEG fallback)
          let outputFormat = 'image/webp';
          let dataUrl = canvas.toDataURL(outputFormat, 0.82);
          if (!dataUrl.startsWith('data:image/webp')) {
            outputFormat = 'image/jpeg';
            dataUrl = canvas.toDataURL(outputFormat, 0.82);
          }

          // 3. Enforce strict Base64 payload limit to eliminate Database Bloat
          if (dataUrl.length > 180 * 1024) {
            dataUrl = canvas.toDataURL(outputFormat, 0.65);
          }

          resolve(dataUrl);
        } catch (e) {
          reject(new Error(choose('تعذر معالجة وضغط الصورة.', 'Failed to process and compress image.')));
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// Helper for performing chunk upload via XMLHttpRequest with byte-level progress tracking
function uploadChunkXHR({ url, chunk, contentRange, headers = {}, onProgress }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    if (url.includes('/api/')) {
      xhr.withCredentials = true;
      const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('darc_token') : null;
      if (token && !headers['Authorization']) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    }
    for (const [k, v] of Object.entries(headers)) {
      xhr.setRequestHeader(k, v);
    }
    if (contentRange) {
      xhr.setRequestHeader('Content-Range', contentRange);
    }
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) onProgress(e.loaded);
      };
    }
    xhr.onload = () => {
      resolve({
        status: xhr.status,
        ok: xhr.status >= 200 && xhr.status < 300,
        headers: {
          get: (name) => xhr.getResponseHeader(name)
        },
        responseText: xhr.responseText,
        json: () => {
          try { return JSON.parse(xhr.responseText); } catch (e) { return {}; }
        }
      });
    };
    xhr.onerror = () => reject(new Error('Network connection error'));
    xhr.ontimeout = () => reject(new Error('Upload chunk timeout'));
    xhr.timeout = 180000; // 3 minutes per chunk
    xhr.send(chunk);
  });
}

// Helper to query Google Drive for the current received range on resume
async function queryGDriveStatus(sessionUrl, fileSize) {
  try {
    const res = await uploadChunkXHR({
      url: sessionUrl,
      chunk: new Blob([]),
      contentRange: `bytes */${fileSize}`
    });
    if (res.status === 308) {
      const range = res.headers.get('Range');
      if (range) {
        const m = range.match(/bytes=0-(\d+)/);
        if (m && m[1]) return parseInt(m[1], 10) + 1;
      }
      return 0;
    }
    if (res.ok) {
      return { completed: true, data: res.json() };
    }
  } catch (e) {
    // Ignore query failure
  }
  return null;
}

let _floatingUploadTimeout = null;

export function getOrCreateFloatingUploadWidget({ projectName, taskName, totalFiles }) {
  if (_floatingUploadTimeout) {
    clearTimeout(_floatingUploadTimeout);
    _floatingUploadTimeout = null;
  }
  let widget = document.getElementById('floating-upload-manager');
  if (!widget) {
    widget = document.createElement('div');
    widget.id = 'floating-upload-manager';
    widget.setAttribute('dir', state.lang === 'ar' ? 'rtl' : 'ltr');
    widget.style.cssText = `
      position: fixed;
      bottom: 24px;
      inset-inline-start: 24px;
      z-index: 99999;
      width: 360px;
      max-width: calc(100vw - 48px);
      background: var(--surface);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--line);
      border-radius: var(--radius-md, 14px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22), 0 0 0 1px var(--line);
      color: var(--ink);
      font-family: inherit;
      overflow: hidden;
      transition: transform 0.25s ease, opacity 0.25s ease;
    `;

    widget.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--surface-soft);border-bottom:1px solid var(--line);">
        <div style="display:flex;align-items:center;gap:8px;">
          <span id="fum-indicator" style="display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal);"></span>
          <strong id="fum-header-title" style="font-size:12.5px;color:var(--ink);">${choose('رفع الملفات في الخلفية', 'Background File Upload')}</strong>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <button id="fum-minimize-btn" type="button" style="background:transparent;border:none;color:var(--ink-soft);cursor:pointer;padding:2px 6px;font-size:13px;line-height:1;border-radius:4px;" title="${choose('تصغير / توسيع', 'Minimize / Expand')}">—</button>
          <button id="fum-close-btn" type="button" style="background:transparent;border:none;color:var(--ink-soft);cursor:pointer;padding:2px 6px;font-size:15px;line-height:1;border-radius:4px;display:none;" title="${choose('إغلاق', 'Close')}">✕</button>
        </div>
      </div>
      <div id="fum-body" style="padding:12px 14px;display:flex;flex-direction:column;gap:9px;">
        <div style="display:flex;flex-direction:column;gap:3px;font-size:11.5px;color:var(--ink-soft);">
          <div style="display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <span style="color:var(--muted);">${choose('المشروع:', 'Project:')}</span>
            <span id="fum-proj-text" style="color:var(--ink);font-weight:600;">${esc(projectName || '—')}</span>
          </div>
          <div style="display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            <span style="color:var(--muted);">${choose('المهمة:', 'Task:')}</span>
            <span id="fum-task-text" style="color:var(--ink-soft);">${esc(taskName || '—')}</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;">
          <span id="fum-file-text" style="color:var(--ink);font-weight:600;max-width:230px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">...</span>
          <span id="fum-count-text" style="color:var(--muted);font-size:11px;">(1/${totalFiles})</span>
        </div>
        <div style="width:100%;height:6px;background:var(--line);border-radius:999px;overflow:hidden;">
          <div id="fum-progress-fill" style="width:0%;height:100%;background:var(--teal);border-radius:999px;transition:width 0.15s ease;"></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--ink-soft);">
          <span id="fum-pct-text" style="font-weight:700;color:var(--teal);">0%</span>
          <span id="fum-speed-text">0 MB / 0 MB</span>
          <span id="fum-eta-text" style="color:var(--muted);">—</span>
        </div>
        <div id="fum-status-badge" style="display:none;font-size:11px;padding:4px 8px;border-radius:6px;"></div>
      </div>
    `;

    document.body.appendChild(widget);

    const minBtn = widget.querySelector('#fum-minimize-btn');
    const fumBody = widget.querySelector('#fum-body');
    minBtn.addEventListener('click', () => {
      const isHidden = fumBody.style.display === 'none';
      fumBody.style.display = isHidden ? 'flex' : 'none';
      minBtn.textContent = isHidden ? '—' : '+';
    });

    const closeBtn = widget.querySelector('#fum-close-btn');
    closeBtn.addEventListener('click', () => {
      widget.remove();
    });
  } else {
    widget.style.opacity = '1';
    widget.style.transform = 'none';
    const projEl = widget.querySelector('#fum-proj-text');
    const taskEl = widget.querySelector('#fum-task-text');
    if (projEl && projectName) projEl.textContent = projectName;
    if (taskEl && taskName) taskEl.textContent = taskName;
  }
  return widget;
}

export function updateFloatingUploadWidget({
  fileName,
  fileIndex,
  totalFiles,
  pct,
  loadedMB,
  fileSizeMB,
  speedMBs,
  etaText,
  statusNote,
  isError,
  isDone
}) {
  const widget = document.getElementById('floating-upload-manager');
  if (!widget) return;

  const fileText = widget.querySelector('#fum-file-text');
  const countText = widget.querySelector('#fum-count-text');
  const fill = widget.querySelector('#fum-progress-fill');
  const pctText = widget.querySelector('#fum-pct-text');
  const speedText = widget.querySelector('#fum-speed-text');
  const etaEl = widget.querySelector('#fum-eta-text');
  const badge = widget.querySelector('#fum-status-badge');
  const indicator = widget.querySelector('#fum-indicator');
  const headerTitle = widget.querySelector('#fum-header-title');
  const closeBtn = widget.querySelector('#fum-close-btn');

  if (fileName && fileText) fileText.textContent = fileName;
  if (countText && fileIndex && totalFiles) countText.textContent = `(${fileIndex}/${totalFiles})`;
  if (fill && typeof pct === 'number') fill.style.width = `${pct}%`;
  if (pctText && typeof pct === 'number') pctText.textContent = `${pct}%`;
  if (speedText && loadedMB !== undefined && fileSizeMB !== undefined) {
    speedText.textContent = `${loadedMB} / ${fileSizeMB} MB • ${speedMBs || '0.0'} MB/s`;
  }
  if (etaEl && etaText) etaEl.textContent = `${choose('متبقي:', 'ETA:')} ${etaText}`;

  if (statusNote && badge) {
    badge.style.display = 'block';
    badge.textContent = statusNote;
    badge.style.background = isError ? 'var(--red-soft)' : 'var(--amber-soft)';
    badge.style.color = isError ? 'var(--red)' : 'var(--amber)';
    badge.style.border = isError ? '1px solid var(--red)' : '1px solid var(--amber)';
  } else if (!isError && !isDone && badge) {
    badge.style.display = 'none';
  }

  if (isDone) {
    if (indicator) {
      indicator.style.background = 'var(--mint-strong)';
      indicator.style.boxShadow = '0 0 10px var(--mint-strong)';
    }
    if (headerTitle) headerTitle.textContent = choose('اكتمل الرفع بنجاح! ✓', 'Upload Complete! ✓');
    if (pctText) pctText.textContent = '100%';
    if (fill) fill.style.width = '100%';
    if (closeBtn) closeBtn.style.display = 'inline-block';
    if (badge) {
      badge.style.display = 'block';
      badge.style.background = 'var(--mint)';
      badge.style.color = 'var(--teal-dark)';
      badge.style.border = '1px solid var(--mint-strong)';
      badge.textContent = choose('تم التوثيق والرفع إلى الخادم بنجاح.', 'Document saved & uploaded to server.');
    }
    _floatingUploadTimeout = setTimeout(() => {
      if (widget && widget.parentNode) {
        widget.style.opacity = '0';
        widget.style.transform = 'translateY(12px)';
        setTimeout(() => widget.remove(), 300);
      }
    }, 4500);
  }

  if (isError) {
    if (indicator) {
      indicator.style.background = 'var(--red)';
      indicator.style.boxShadow = '0 0 10px var(--red)';
    }
    if (headerTitle) headerTitle.textContent = choose('فشل في الرفع ✕', 'Upload Failed ✕');
    if (closeBtn) closeBtn.style.display = 'inline-block';
  }
}

export async function uploadTaskFiles(files, taskId) {
  if (!files || !files.length || !taskId) return;
  const task = state.data?.tasks?.find(t => t.id === taskId);
  return uploadDirectFiles({
    files,
    taskId,
    projectId: task?.projectId,
    status: 'draft',
    isTaskModal: true
  });
}

export async function uploadDirectFiles({ files, projectId = null, taskId = null, discipline = 'عام', status = 'draft', isTaskModal = false }) {
  if (!files || !files.length) return;
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    showToast(choose('لا يمكن رفع المخططات والملفات أثناء وضع عدم الاتصال. يرجى الاتصال بالإنترنت أولاً.', 'Cannot upload drawings or files while offline. Please connect to the internet first.'), true);
    return;
  }
  const task = taskId ? state.data?.tasks?.find(t => t.id === taskId) : null;
  const targetProjectId = projectId || task?.projectId;
  const project = targetProjectId ? state.data?.projects?.find(p => p.id === targetProjectId) : null;
  const existingDocs = state.data?.documents ? state.data.documents.filter(d => (!d.deletedAt) && (taskId ? d.taskId === taskId : d.projectId === targetProjectId)) : [];

  const projName = project ? project.nameAr : 'Project';
  const taskName = task ? task.titleAr : (discipline || 'General');

  const nextVersions = {};
  const getNextVersion = (ext) => {
    if (nextVersions[ext]) return nextVersions[ext];
    let maxV = 0;
    existingDocs.forEach(d => {
      if (d.originalName && d.originalName.toLowerCase().endsWith(ext)) {
        const match = d.originalName.match(/_v(\d+)\./);
        if (match && parseInt(match[1]) > maxV) maxV = parseInt(match[1]);
      }
    });
    nextVersions[ext] = maxV + 1;
    return maxV + 1;
  };

  const progressContainer = document.getElementById('upload-progress-container');
  const progressBar = document.getElementById('upload-progress-bar');
  const progressPercent = document.getElementById('upload-progress-percent');
  const progressText = document.getElementById('upload-progress-text');
  const dropzone = document.getElementById('task-dropzone');

  if (isTaskModal && progressContainer) progressContainer.style.display = 'block';
  if (isTaskModal && dropzone) dropzone.style.pointerEvents = 'none';

  // Initialize Persistent Floating Upload Widget on document.body
  getOrCreateFloatingUploadWidget({
    projectName: projName,
    taskName: taskName,
    totalFiles: files.length
  });

  // Screen WakeLock & Tab Close Protection for massive 10GB+ engineering files
  let wakeLock = null;
  const preventTabClose = (e) => {
    e.preventDefault();
    e.returnValue = choose('جاري رفع ملفات هندسية كبيرة. مغادرة الصفحة ستوقف الرفع.', 'Uploading large engineering files. Leaving will abort upload.');
    return e.returnValue;
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', preventTabClose);
    if ('wakeLock' in navigator) {
      try { navigator.wakeLock.request('screen').then(wl => { wakeLock = wl; }).catch(() => {}); } catch (e) {}
    }
  }

  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.size || file.size === 0) {
        showToast(choose(`الملف "${file.name}" فارغ لا يحتوي على بيانات.`, `File "${file.name}" is empty.`), true);
        continue;
      }
      // Enterprise Limit: Supports massive engineering point-clouds, BIM models, and CAD sets up to 100GB
      if (file.size > 100 * 1024 * 1024 * 1024) {
        showToast(choose(`حجم الملف "${file.name}" يتجاوز الحد الأقصى المسموح (100GB).`, `File "${file.name}" exceeds 100GB limit.`), true);
        continue;
      }
      const rawExt = file.name.split('.').pop()?.toLowerCase() || '';
      const dangerousExts = ['exe', 'bat', 'cmd', 'sh', 'bash', 'ps1', 'vbs', 'js', 'mjs', 'cjs', 'py', 'php', 'phtml', 'html', 'htm', 'jar', 'msi', 'dll', 'com', 'scr', 'hta', 'svg', 'apk'];
      if (dangerousExts.includes(rawExt) || file.type === 'image/svg+xml') {
        showToast(choose(`صيغة الملف "${file.name}" غير مسموح بها لأسباب أمنية.`, `File type for "${file.name}" is not permitted for security reasons.`), true);
        continue;
      }
      const lastDot = file.name.lastIndexOf('.');
      const ext = lastDot !== -1 ? file.name.substring(lastDot).toLowerCase() : '';
      const baseName = lastDot !== -1 ? file.name.substring(0, lastDot) : file.name;
      
      const sanitizePart = (s) => (s || '').replace(/[/\\:*?"<>|\x00-\x1f\x7f-\x9f\u202A-\u202E\u2066-\u2069]/g, '-').replace(/\s+/g, '_').trim();
      const safeProj = sanitizePart(projName) || 'Project';
      const safeTask = sanitizePart(taskName) || 'General';
      const safeBase = sanitizePart(baseName) || 'Drawing';

      const v = getNextVersion(ext);
      const compiledName = `${safeProj}_${safeTask}_${safeBase}_v${v}${ext}`;
      const fileSizeMB = file.size >= 1024 * 1024 * 1024
        ? `${(file.size / (1024 * 1024 * 1024)).toFixed(2)} GB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

      updateFloatingUploadWidget({
        fileName: file.name,
        fileIndex: i + 1,
        totalFiles: files.length,
        pct: 0,
        loadedMB: '0.0',
        fileSizeMB,
        speedMBs: '0.0',
        etaText: '...',
        statusNote: choose('بدء جلسة الرفع المستأنف...', 'Starting resumable session...')
      });

      // 1. Request Resumable Session with Google Drive
      const sessionData = await api('/api/documents/session', {
        method: 'POST',
        body: JSON.stringify({
          compiledName,
          mimeType: file.type || 'application/octet-stream',
          projectId: targetProjectId,
          taskId,
          size: file.size
        })
      });
      const sessionUrl = sessionData.sessionUrl;

      // 2. Dynamic Chunk Sizing for optimal throughput:
      // <= 10MB: Single chunk
      // <= 100MB: 8MB
      // <= 500MB: 16MB
      // <= 2GB: 32MB
      // > 2GB (10GB - 100GB): 64MB (256 * 256KB) for ultra-fast streaming
      let CHUNK_SIZE = 8 * 1024 * 1024;
      if (file.size <= 10 * 1024 * 1024) {
        CHUNK_SIZE = file.size;
      } else if (file.size <= 100 * 1024 * 1024) {
        CHUNK_SIZE = 8 * 1024 * 1024;
      } else if (file.size <= 500 * 1024 * 1024) {
        CHUNK_SIZE = 16 * 1024 * 1024;
      } else if (file.size <= 2 * 1024 * 1024 * 1024) {
        CHUNK_SIZE = 32 * 1024 * 1024;
      } else {
        CHUNK_SIZE = 64 * 1024 * 1024; // 64MB chunks for massive files
      }

      const fileStartTime = Date.now();
      let uploadedSoFar = 0;

      const updateProgressUI = (currentChunkLoaded) => {
        const totalUploaded = Math.min(file.size, uploadedSoFar + currentChunkLoaded);
        const pct = Math.min(100, Math.round((totalUploaded / file.size) * 100));
        const loadedFormatted = totalUploaded >= 1024 * 1024 * 1024
          ? `${(totalUploaded / (1024 * 1024 * 1024)).toFixed(2)} GB`
          : `${(totalUploaded / (1024 * 1024)).toFixed(1)} MB`;

        if (isTaskModal) {
          const bar = document.getElementById('upload-progress-bar');
          const pPercent = document.getElementById('upload-progress-percent');
          const pText = document.getElementById('upload-progress-text');
          const pContainer = document.getElementById('upload-progress-container');

          if (pContainer) pContainer.style.display = 'block';
          if (bar) bar.style.width = `${pct}%`;
          if (pPercent) pPercent.textContent = `${pct}%`;

          const elapsedSec = (Date.now() - fileStartTime) / 1000;
          const speedBps = totalUploaded / Math.max(elapsedSec, 0.2);
          const speedMBs = (speedBps / (1024 * 1024)).toFixed(1);

          const remainingBytes = Math.max(0, file.size - totalUploaded);
          const etaSeconds = Math.round(remainingBytes / Math.max(speedBps, 1));
          const etaText = etaSeconds < 60
            ? `${etaSeconds} ${choose('ثانية', 's')}`
            : `${Math.floor(etaSeconds / 60)}:${String(etaSeconds % 60).padStart(2, '0')} ${choose('دقيقة', 'min')}`;

          if (pText) {
            pText.textContent = `${choose('رفع إلى الخادم', 'Uploading to server')} (${i + 1}/${files.length}): ${file.name} — ${loadedFormatted} / ${fileSizeMB} (${pct}%) • ${speedMBs} MB/s • ${choose('متبقي:', 'ETA:')} ${etaText}`;
          }
        }

        const elapsedSec = (Date.now() - fileStartTime) / 1000;
        const speedBps = totalUploaded / Math.max(elapsedSec, 0.2);
        const speedMBs = (speedBps / (1024 * 1024)).toFixed(1);
        const remainingBytes = Math.max(0, file.size - totalUploaded);
        const etaSeconds = Math.round(remainingBytes / Math.max(speedBps, 1));
        const etaText = etaSeconds < 60 ? `${etaSeconds} s` : `${Math.floor(etaSeconds / 60)}m`;

        updateFloatingUploadWidget({
          fileName: file.name,
          fileIndex: i + 1,
          totalFiles: files.length,
          pct,
          loadedMB: loadedFormatted,
          fileSizeMB,
          speedMBs,
          etaText
        });
      };

      updateProgressUI(0);

      // 3. Stream Chunks to Google Drive (Direct Resumable Upload with Range Header Handling)
      let offset = 0;
      let driveFileId = null;
      let fallbackToProxy = false;

      while (offset < file.size) {
        const end = Math.min(offset + CHUNK_SIZE, file.size);
        const chunk = file.slice(offset, end);
        const contentRange = `bytes ${offset}-${end - 1}/${file.size}`;
        let chunkRetries = 0;
        let chunkSuccess = false;

        while (!chunkSuccess && chunkRetries < 5) {
          try {
            let res;
            if (!fallbackToProxy) {
              try {
                res = await uploadChunkXHR({
                  url: sessionUrl,
                  chunk,
                  contentRange,
                  headers: {},
                  onProgress: (loaded) => updateProgressUI(loaded)
                });
              } catch (netErr) {
                console.warn('[Upload] Direct GDrive upload failed, trying backend proxy:', netErr.message);
                fallbackToProxy = true;
              }
            }

            if (fallbackToProxy) {
              const docMeta = { projectId: targetProjectId, taskId, compiledName, mimeType: file.type, size: file.size, status };
              res = await uploadChunkXHR({
                url: `${API_BASE}/api/documents/chunk`,
                chunk,
                contentRange,
                headers: {
                  'x-session-url': sessionUrl,
                  'x-doc-meta': encodeURIComponent(JSON.stringify(docMeta))
                },
                onProgress: (loaded) => updateProgressUI(loaded)
              });
            }

            if (res.status === 308) {
              const rangeHeader = res.headers.get('Range');
              if (rangeHeader) {
                const match = rangeHeader.match(/bytes=0-(\d+)/);
                if (match && match[1]) {
                  offset = parseInt(match[1], 10) + 1;
                } else {
                  offset = end;
                }
              } else {
                offset = end;
              }
              uploadedSoFar = offset;
              updateProgressUI(0);
              chunkSuccess = true;
            } else if (res.ok) {
              const driveData = res.json();
              driveFileId = driveData.id || driveData.document?.id;
              uploadedSoFar = file.size;
              updateProgressUI(0);
              offset = file.size;
              chunkSuccess = true;
              break;
            } else {
              throw new Error(`Upload returned status ${res.status}`);
            }
          } catch (chunkErr) {
            chunkRetries++;
            updateFloatingUploadWidget({
              fileName: file.name,
              fileIndex: i + 1,
              totalFiles: files.length,
              statusNote: `${choose('إعادة المحاولة', 'Retrying')} (${chunkRetries}/5)...`
            });
            if (chunkRetries >= 5) throw new Error(`${choose('فشل الرفع بعد محاولات متعددة', 'Upload failed after multiple retries')}: ${chunkErr.message}`);

            await new Promise(r => setTimeout(r, 1000 * Math.pow(2, chunkRetries - 1)));

            // Query Google Drive status to resume from exact received byte
            const statusCheck = await queryGDriveStatus(sessionUrl, file.size);
            if (typeof statusCheck === 'number' && statusCheck > offset) {
              offset = statusCheck;
              uploadedSoFar = offset;
              break;
            } else if (statusCheck && statusCheck.completed) {
              driveFileId = statusCheck.data?.id;
              offset = file.size;
              chunkSuccess = true;
              break;
            }
          }
        }
      }

      // 4. Finalize in Supabase
      if (driveFileId && !driveFileId.startsWith('doc_')) {
        await api('/api/documents/finalize', {
          method: 'POST',
          body: JSON.stringify({
            driveFileId,
            projectId: targetProjectId,
            taskId,
            compiledName,
            mimeType: file.type,
            size: file.size,
            status
          })
        });
      }
    }

    await refreshView(true);
    if (isTaskModal && taskId) {
      const updatedTask = state.data?.tasks?.find(t => t.id === taskId);
      const docListEl = document.getElementById('task-documents-list');
      if (docListEl && updatedTask) {
        docListEl.innerHTML = renderTaskDocuments(updatedTask);
      }
    }
    
    // Play success luxury chime
    playSuccessChime();

    // Mark floating widget as done
    updateFloatingUploadWidget({
      fileIndex: files.length,
      totalFiles: files.length,
      pct: 100,
      isDone: true
    });

    showToast(choose('تم رفع المخطط وتوثيقه بنجاح إلى الخادم ✅', 'Drawing uploaded & registered successfully ✅'));
  } catch (err) {
    updateFloatingUploadWidget({
      isError: true,
      statusNote: err.message
    });
    showToast(err.message, true);
  } finally {
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', preventTabClose);
    }
    if (wakeLock) {
      try { wakeLock.release(); } catch (e) {}
      wakeLock = null;
    }
    if (isTaskModal) {
      const pContainer = document.getElementById('upload-progress-container');
      const bar = document.getElementById('upload-progress-bar');
      const dz = document.getElementById('task-dropzone');
      if (pContainer) pContainer.style.display = 'none';
      if (bar) bar.style.width = '0%';
      if (dz) dz.style.pointerEvents = 'auto';
      const input = document.getElementById('task-upload-input');
      if (input) input.value = '';
    }
  }
}

// Global Drag & Drop handler for task dropzone
if (typeof window !== 'undefined' && !window._taskDropzoneListenersSet) {
  window._taskDropzoneListenersSet = true;
  document.addEventListener('dragover', (e) => {
    const dropzone = e.target.closest('#task-dropzone');
    if (dropzone) {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--brand-teal)';
      dropzone.style.background = 'var(--teal-soft)';
    }
  });

  document.addEventListener('dragleave', (e) => {
    const dropzone = e.target.closest('#task-dropzone');
    if (dropzone) {
      dropzone.style.borderColor = 'var(--border)';
      dropzone.style.background = 'var(--surface-soft)';
    }
  });

  document.addEventListener('drop', (e) => {
    const dropzone = e.target.closest('#task-dropzone');
    if (dropzone) {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--border)';
      dropzone.style.background = 'var(--surface-soft)';
      const taskId = dropzone.dataset.taskId;
      const files = e.dataTransfer?.files;
      if (files && files.length) {
        uploadTaskFiles(files, taskId);
      }
    }
  });
}

export async function init() {
  savePreferencesCookies({ theme: state.theme, lang: state.lang });
  try {
    state.calendarSystem = localStorage.getItem('darc_calendar_system') || state.calendarSystem || 'gregorian';
  } catch (e) {}

  if (typeof window !== 'undefined' && window.matchMedia && !window._darcThemeListenerBound) {
    window._darcThemeListenerBound = true;
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        try {
          const explicit = localStorage.getItem('darc-theme');
          if (!explicit) {
            state.theme = e.matches ? 'dark' : 'light';
            document.documentElement.dataset.theme = state.theme;
            const themeBtn = document.querySelector('[data-action="toggle-theme"]');
            if (themeBtn) themeBtn.textContent = state.theme === 'dark' ? '☀️' : '🌙';
          }
        } catch (err) {}
      });
    } catch (err) {}
  }

  const rawHash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
  const hashParams = new URLSearchParams(rawHash.includes('?') ? rawHash.split('?')[1] : (rawHash.includes('=') ? rawHash : ''));
  const activationToken = hashParams.get('activate');
  if (activationToken) return renderActivation(activationToken);
  const resetToken = hashParams.get('reset');
  if (resetToken) return renderResetPassword(resetToken);
  if (rawHash === 'forgot') return renderLogin('', 'forgot');
  if (rawHash === 'login') return renderLogin();

  // Restore route from hash or session storage on refresh BEFORE initial paint
  try {
    if (rawHash) {
      const [viewPart, queryPart] = rawHash.split('?');
      const validViews = ['dashboard', 'projects', 'tasks', 'documents', 'templates', 'team', 'reports', 'settings', 'project-detail'];
      if (validViews.includes(viewPart)) {
        state.view = viewPart;
        if (queryPart) {
          const q = new URLSearchParams(queryPart);
          if (q.get('id')) state.activeProjectId = q.get('id');
          if (q.get('tab')) state.projectTab = q.get('tab');
          if (q.get('section')) state.settingsSection = q.get('section');
        }
      }
    } else if (typeof sessionStorage !== 'undefined') {
      const saved = sessionStorage.getItem('darc_last_route');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.view) state.view = parsed.view;
        if (parsed.activeProjectId) state.activeProjectId = parsed.activeProjectId;
        if (parsed.projectTab) state.projectTab = parsed.projectTab;
        if (parsed.settingsSection) state.settingsSection = parsed.settingsSection;
      }
    }
  } catch (e) {}

  if (state.view === 'settings' && !state.settingsSection) {
    state.settingsSection = 'profile';
  }

  // Instant 0ms Paint: If offline cache is available, pre-render workspace immediately
  const cachedData = getOfflineBootstrap();
  if (cachedData && cachedData.user) {
    state.data = cachedData;
    if (!canAccessView(state.view)) {
      state.view = getFirstAllowedView();
    }
    renderApp();
  } else {
    renderLoading();
  }

  try { 
    // Replay any pending mutations from previous offline sessions before loading fresh bootstrap
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      if (getPendingMutations().length > 0) {
        await syncPendingMutations(api);
      }
    }
    await loadData(); 
    if (state.data?.user?.customFields?.calendarSystem) {
      state.calendarSystem = state.data.user.customFields.calendarSystem;
      try { localStorage.setItem('darc_calendar_system', state.calendarSystem); } catch (e) {}
    } 
    
    // Start Smart Live Sync (Sequential Polling with Adaptive Idle Throttling & Stampede Guard)
    if (!window._darcPollingActive) {
      window._darcPollingActive = true;
      let _pollTimer = null;
      let _pollFailures = 0;
      let _isPollInFlight = false;
      let _lastActivityTime = Date.now();
      let _lastPollTime = 0;

      const markUserActive = () => {
        const wasIdle = (Date.now() - _lastActivityTime) > 45000;
        _lastActivityTime = Date.now();
        // If user returns after being idle and more than 4s have passed since last poll, refresh instantly
        if (wasIdle && (Date.now() - _lastPollTime) > 4000 && !_isPollInFlight) {
          runPoll();
        }
      };

      if (typeof window !== 'undefined') {
        let _throttleActive = 0;
        const onUserGesture = () => {
          const now = Date.now();
          if (now - _throttleActive > 5000) {
            _throttleActive = now;
            markUserActive();
          }
        };
        window.addEventListener('click', onUserGesture, { passive: true });
        window.addEventListener('keydown', onUserGesture, { passive: true });
        window.addEventListener('touchstart', onUserGesture, { passive: true });
        window.addEventListener('mousemove', onUserGesture, { passive: true });
      }

      const scheduleNextPoll = () => {
        if (_pollTimer) clearTimeout(_pollTimer);
        // Adaptive Idle Throttling: If user is inactive for >45s, relax polling to 15s (saves 75% edge requests)
        const isUserIdle = (Date.now() - _lastActivityTime) > 45000;
        const baseDelay = isUserIdle ? 15000 : 4000;
        const delay = _pollFailures > 0 ? Math.min(25000, baseDelay * Math.pow(2, _pollFailures)) : baseDelay;
        _pollTimer = setTimeout(runPoll, delay);
      };

      const runPoll = async () => {
        // Pause polling when browser tab is hidden to save battery and bandwidth
        if (typeof document !== 'undefined' && document.hidden) {
          scheduleNextPoll();
          return;
        }
        if (!state.data?.user || !state.view || state.view === 'login') {
          scheduleNextPoll();
          return;
        }
        if (_isPollInFlight) {
          scheduleNextPoll();
          return;
        }

        _isPollInFlight = true;
        _lastPollTime = Date.now();
        try {
          await loadData(true); // Silent ETag 304 refresh
          _pollFailures = 0;    // Reset failure counter on successful handshake
        } catch (e) {
          _pollFailures++;      // Back off to prevent console flooding during edge restarts
        } finally {
          _isPollInFlight = false;
          scheduleNextPoll();
        }
      };

      scheduleNextPoll();

      // Refresh immediately when user returns to tab
      if (typeof document !== 'undefined') {
        document.addEventListener('visibilitychange', () => {
          if (!document.hidden && state.data?.user && state.view && state.view !== 'login') {
            markUserActive();
            runPoll();
          }
        });
      }
    }
  } catch (e) { 
    if (typeof window !== 'undefined') {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#login');
      } else {
        window.location.hash = '#login';
      }
    }
    renderLogin(); 
  }
}

// Route synchronization for browser Back / Forward history navigation
if (typeof window !== 'undefined' && !window._hashChangeListenerSet) {
  window._hashChangeListenerSet = true;
  window.addEventListener('hashchange', () => {
    if (window._isInternalNav) {
      window._isInternalNav = false;
      return;
    }
    const rawHash = window.location.hash.replace(/^#/, '');
    if (!rawHash) return;
    const [viewPart, queryPart] = rawHash.split('?');
    if (viewPart === 'login') {
      if (state.data?.user) {
        state.data.user = null;
      }
      renderLogin();
      return;
    }
    if (viewPart === 'forgot') {
      renderLogin('', 'forgot');
      return;
    }
    const hashParams = new URLSearchParams(queryPart || (rawHash.includes('=') ? rawHash : ''));
    if (hashParams.get('activate')) {
      renderActivation(hashParams.get('activate'));
      return;
    }
    if (hashParams.get('reset')) {
      renderResetPassword(hashParams.get('reset'));
      return;
    }
    const validViews = ['dashboard', 'projects', 'tasks', 'documents', 'templates', 'team', 'reports', 'settings', 'project-detail'];
    if (validViews.includes(viewPart)) {
      if (state.data && !canAccessView(viewPart)) {
        switchView(getFirstAllowedView());
        return;
      }
      let pid = state.activeProjectId;
      if (queryPart) {
        const q = new URLSearchParams(queryPart);
        if (q.get('id')) pid = q.get('id');
        if (q.get('tab')) state.projectTab = q.get('tab');
        if (q.get('section')) {
          const reqSec = q.get('section');
          if (viewPart === 'settings' && state.data && !canAccessSettingsSection(reqSec)) {
            state.settingsSection = 'profile';
            if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
              window.history.replaceState(null, '', '#settings?section=profile');
            }
          } else {
            state.settingsSection = reqSec;
          }
        }
      } else if (viewPart === 'settings' && state.data && !canAccessSettingsSection(state.settingsSection)) {
        state.settingsSection = 'profile';
      }
      if (state.view !== viewPart || state.activeProjectId !== pid) {
        switchView(viewPart, pid);
      } else {
        renderView();
      }
    }
  });
}

// UI-03: Auto-update timeline arrows on scroll with requestAnimationFrame throttling
if (typeof window !== 'undefined' && !window._timelineScrollListenerSet) {
  window._timelineScrollListenerSet = true;
  let _timelineRafScheduled = false;
  document.addEventListener('scroll', (e) => {
    if (e.target && e.target.classList && (e.target.classList.contains('timeline-scroll') || e.target.classList.contains('gantt-scroll') || e.target.classList.contains('timeline-board'))) {
      if (!_timelineRafScheduled) {
        _timelineRafScheduled = true;
        requestAnimationFrame(() => {
          if (typeof drawTimelineArrows === 'function') drawTimelineArrows();
          _timelineRafScheduled = false;
        });
      }
    }
  }, true);
}
