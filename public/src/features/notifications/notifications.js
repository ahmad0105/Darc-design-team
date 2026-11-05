import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { choose, esc, icon, dateLabel, t, isNotificationRead } from '../../core/utils.js';
import { modalShell } from '../../shared/ui.js';
import { getNotificationCatalogMeta } from './notifications.catalog.js';
import { getNotificationPermission, isIOSDevice, isStandalonePWA } from './notification-manager.js';

export function showNotifications() {
  const notifications = state.data?.notifications || [];
  const currentTab = state.notificationTab || 'all';

  const unreadCount = notifications.filter(n => !isNotificationRead(n)).length;
  const readCount = notifications.length - unreadCount;

  // Filter based on active tab
  let filteredNotifications = notifications;
  if (currentTab === 'unread') {
    filteredNotifications = notifications.filter(n => !isNotificationRead(n));
  } else if (currentTab === 'read') {
    filteredNotifications = notifications.filter(n => isNotificationRead(n));
  }

  const headerActions = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--line);flex-wrap:wrap;gap:10px;">
      <!-- Navigation filter tabs -->
      <div class="notif-tabs" style="display:inline-flex;align-items:center;background:var(--surface-soft);padding:3px;border-radius:10px;border:1px solid var(--line);gap:3px;">
        <button type="button" class="btn btn-sm ${currentTab === 'all' ? 'btn-primary' : 'btn-ghost'}" data-action="filter-notifications" data-tab="all" style="font-size:11px;padding:4px 10px;height:28px;border-radius:7px;display:inline-flex;align-items:center;gap:5px;">
          <span>${choose('الكل', 'All')}</span>
          <span style="font-size:10px;opacity:0.85;background:rgba(0,0,0,0.12);padding:1px 5px;border-radius:10px;">${notifications.length}</span>
        </button>
        <button type="button" class="btn btn-sm ${currentTab === 'unread' ? 'btn-primary' : 'btn-ghost'}" data-action="filter-notifications" data-tab="unread" style="font-size:11px;padding:4px 10px;height:28px;border-radius:7px;display:inline-flex;align-items:center;gap:5px;">
          <span>${choose('غير مقروء', 'Unread')}</span>
          ${unreadCount > 0 ? `<span style="font-size:10px;background:var(--amber-strong);color:#fff;padding:1px 5px;border-radius:10px;font-weight:700;">${unreadCount}</span>` : `<span style="font-size:10px;opacity:0.85;padding:1px 5px;">0</span>`}
        </button>
        <button type="button" class="btn btn-sm ${currentTab === 'read' ? 'btn-primary' : 'btn-ghost'}" data-action="filter-notifications" data-tab="read" style="font-size:11px;padding:4px 10px;height:28px;border-radius:7px;display:inline-flex;align-items:center;gap:5px;">
          <span>${choose('مقروء', 'Read')}</span>
          <span style="font-size:10px;opacity:0.85;padding:1px 5px;border-radius:10px;">${readCount}</span>
        </button>
      </div>

      <!-- Action buttons -->
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
        ${unreadCount > 0 ? `
          <button type="button" class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${choose('تحديد كافة التنبيهات كمقروءة', 'Mark all notifications as read')}">
            ${icon('check', 12)} ${choose('تحديد الكل كمقروء', 'Mark all read')}
          </button>
        ` : ''}
        ${readCount > 0 ? `
          <button type="button" class="btn btn-ghost btn-sm" data-action="clear-read-notifications" style="font-size:11px;color:var(--muted);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${choose('حذف كافة الإشعارات المقروءة', 'Clear all read notifications')}">
            ${icon('trash', 12)} ${choose('مسح المقروء', 'Clear read')}
          </button>
        ` : ''}
        <button type="button" class="btn btn-ghost btn-sm" data-action="send-test-notification" style="font-size:11px;color:var(--blue);padding:4px 8px;display:flex;align-items:center;gap:4px;" title="${choose('إرسال إشعار تجريبي فوري للتأكد من وصوله', 'Send live test notification')}">
          ${icon('bell', 12)} ${choose('تجربة إرسال', 'Test Send')}
        </button>
      </div>
    </div>
  `;

  const notifPerm = getNotificationPermission();
  const isIOSNonPwa = isIOSDevice() && !isStandalonePWA();

  let browserBanner = '';
  if (isIOSNonPwa) {
    browserBanner = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-radius:8px;background:var(--surface-soft);border:1px dashed var(--blue);margin-bottom:12px;font-size:11px;">
        <span style="color:var(--ink-soft);display:inline-flex;align-items:center;gap:5px;">${icon('phone', 13)} ${choose('تفعيل إشعارات نظام iOS الفورية على iPhone و iPad', 'Enable native iOS push alerts on iPhone & iPad')}</span>
        <button type="button" class="btn btn-primary btn-sm" data-action="show-ios-notification-guide" style="font-size:10px;padding:3px 8px;height:auto;flex-shrink:0;">${choose('عرض الطريقة', 'View Setup')}</button>
      </div>
    `;
  } else if (notifPerm === 'default') {
    browserBanner = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-radius:8px;background:var(--surface-soft);border:1px dashed var(--blue);margin-bottom:12px;font-size:11px;">
        <span style="color:var(--ink-soft);">${choose('تفعيل إشعارات سطح المكتب والجوال عند وصول مهام أو تنبيهات؟', 'Enable desktop & mobile alerts when new tasks or mentions arrive?')}</span>
        <button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications" style="font-size:10px;padding:3px 8px;height:auto;flex-shrink:0;">${choose('تفعيل الآن', 'Enable')}</button>
      </div>
    `;
  }

  let listHtml = '';

  if (filteredNotifications.length) {
    listHtml = `<div class="attention-list" style="display:flex;flex-direction:column;gap:8px;">${filteredNotifications.slice(0, 40).map((notification) => {
      const isRead = isNotificationRead(notification);
      const meta = getNotificationCatalogMeta(notification.type);

      const title = state.lang === 'ar'
        ? (notification.titleAr || meta.titleAr || notification.titleEn || meta.defaultTitle)
        : (notification.titleEn || meta.titleEn || notification.titleAr || meta.defaultTitle);

      const message = state.lang === 'ar'
        ? (notification.messageAr || notification.bodyAr || notification.content || '')
        : (notification.messageEn || notification.bodyEn || (notification.content !== notification.titleAr && notification.content !== notification.messageAr ? notification.content : '') || notification.messageAr || notification.bodyAr || '');

      const displaySubtitle = message && message !== title ? `${message} · ` : '';

      const isDrawing = notification.type === 'document_review' || notification.type === 'document_approved' || notification.documentId;
      const targetBadge = notification.taskId ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);font-weight:600;">${icon('check', 10)} ${choose('فتح المهمة', 'Open Task')}</span>` :
        isDrawing ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--blue);border:1px solid var(--line);font-weight:600;">${icon('document', 10)} ${choose('معاينة المخطط', 'View Drawing')}</span>` :
        notification.projectId ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--mint-strong);border:1px solid var(--line);font-weight:600;">${icon('building', 10)} ${choose('المشروع', 'Project')}</span>` : '';

      const unreadDot = !isRead ? `<span style="width:7px;height:7px;border-radius:50%;background:var(--blue);display:inline-block;flex-shrink:0;box-shadow:0 0 0 2px var(--surface);" title="${choose('غير مقروء', 'Unread')}"></span>` : '';
      const readBadge = isRead ? `<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;color:var(--muted);">${icon('check', 10)} <span style="font-size:9px;">${choose('مقروء', 'Read')}</span></span>` : '';

      const borderStyle = !isRead 
        ? 'border:1px solid rgba(56,189,248,0.35);border-inline-start:3px solid var(--blue);' 
        : 'border:1px solid var(--line);border-inline-start:3px solid transparent;';

      const bgStyle = !isRead ? 'background:var(--surface);' : 'background:var(--surface-soft);';
      const opacityStyle = isRead ? 'opacity:0.85;' : 'opacity:1;';

      return `
        <div class="attention-item notif-item ${!isRead ? 'notif-unread' : 'notif-read'}" 
             data-action="read-notification" 
             data-notification-id="${esc(notification.id)}" 
             data-task-id="${esc(notification.taskId || '')}" 
             data-project-id="${esc(notification.projectId || '')}" 
             data-document-id="${esc(notification.documentId || '')}" 
             data-type="${esc(notification.type || '')}" 
             style="${borderStyle}${bgStyle}${opacityStyle}text-align:start;width:100%;cursor:pointer;position:relative;display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;transition:all 0.15s ease;">
          
          <div style="display:flex;align-items:flex-start;gap:10px;flex:1;min-width:0;">
            <span class="attention-icon ${meta.color}" style="flex-shrink:0;margin-top:2px;">${icon(meta.icon, 14)}</span>
            <div class="attention-copy" style="flex:1;min-width:0;text-align:start;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:nowrap;overflow:hidden;">
                ${unreadDot}
                <strong dir="auto" style="color:var(--${meta.color});font-size:12px;font-weight:${!isRead ? '700' : '600'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(title)}</strong>
                ${readBadge}
                ${targetBadge}
              </div>
              <div dir="auto" style="color:var(--muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(message)}">
                ${esc(displaySubtitle)}<span style="color:var(--ink-soft);">${dateLabel(notification.createdAt)}</span>
              </div>
            </div>
          </div>

          <!-- Quick actions: Toggle read/unread & delete -->
          <div style="display:flex;align-items:center;gap:4px;margin-inline-start:10px;flex-shrink:0;">
            <button type="button" class="btn btn-ghost btn-sm notif-toggle-btn" 
                    data-action="toggle-notification-read" 
                    data-notification-id="${esc(notification.id)}" 
                    title="${isRead ? choose('تحديد كغير مقروء', 'Mark as unread') : choose('تحديد كمقروء', 'Mark as read')}" 
                    style="padding:4px 6px;height:26px;color:${isRead ? 'var(--muted)' : 'var(--blue)'};border-radius:6px;">
              ${icon(isRead ? 'bell' : 'check', 12)}
            </button>
            <button type="button" class="notif-dismiss-btn" 
                    data-action="delete-notification" 
                    data-notification-id="${esc(notification.id)}" 
                    title="${choose('حذف الإشعار', 'Dismiss notification')}" 
                    style="margin:0;">
              ${icon('close', 12)}
            </button>
          </div>
        </div>
      `;
    }).join('')}</div>`;
  } else {
    // Contextual empty state based on tab
    if (currentTab === 'unread') {
      listHtml = `
        <div class="empty" style="padding:40px 20px;text-align:center;">
          <span style="color:var(--teal);background:var(--mint);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
            ${icon('check', 24)}
          </span>
          <strong style="display:block;font-size:14px;color:var(--ink);">${choose('رائع! لقد اطلعت على كافة التنبيهات', 'All caught up! No unread notifications')}</strong>
          <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${choose('لا توجد إشعارات غير مقروءة في صندوق الوارد حالياً.', 'You have no unread notifications in your inbox right now.')}</span>
        </div>
      `;
    } else if (currentTab === 'read') {
      listHtml = `
        <div class="empty" style="padding:40px 20px;text-align:center;">
          <span style="color:var(--muted);background:var(--surface-soft);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
            ${icon('bell', 24)}
          </span>
          <strong style="display:block;font-size:14px;color:var(--ink);">${choose('لا توجد إشعارات مقروءة حالياً', 'No read notifications')}</strong>
          <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${choose('الإشعارات التي تفتحها أو تحددها كمقروءة ستظهر هنا.', 'Notifications you read or mark as read will appear here.')}</span>
        </div>
      `;
    } else {
      listHtml = `
        <div class="empty" style="padding:48px 20px;text-align:center;">
          <span style="color:var(--teal);background:var(--mint);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
            ${icon('bell', 24)}
          </span>
          <strong style="display:block;font-size:14px;color:var(--ink);">${choose('لا توجد إشعارات حالياً', 'No notifications right now')}</strong>
          <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${choose('ستظهر هنا التنبيهات الخاصة بالمهام والمشاريع والإشارات والتذكيرات.', 'Task, project, mention, and reminder alerts will appear here.')}</span>
        </div>
      `;
    }
  }

  const body = `${headerActions}${browserBanner}${listHtml}`;
  document.getElementById('modal-root').innerHTML = modalShell(t('notifications'), choose('تنبيهاتك داخل مساحة العمل والبريد.', 'Your workspace and email notifications.'), body, 'notifications', 'modal-notifications');
}
