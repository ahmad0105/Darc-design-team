import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { choose, esc, icon, dateLabel, t } from '../../core/utils.js';
import { modalShell } from '../../shared/ui.js';
import { getNotificationCatalogMeta } from './notifications.catalog.js';

export function showNotifications() {
  const notifications = state.data?.notifications || [];
  const unreadCount = notifications.filter(n => !n.read && !n.readAt).length;
  const readCount = notifications.length - unreadCount;

  const headerActions = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--line);flex-wrap:wrap;gap:8px;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="mini-badge" style="background:${unreadCount > 0 ? 'var(--mint)' : 'var(--surface-soft)'};color:${unreadCount > 0 ? 'var(--teal)' : 'var(--muted)'};font-weight:700;padding:4px 8px;border-radius:6px;">
          ${unreadCount} ${choose('غير مقروء', 'unread')}
        </span>
        <span style="font-size:11px;color:var(--muted);">(${notifications.length} ${choose('إجمالي', 'total')})</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        ${unreadCount > 0 ? `
          <button type="button" class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 8px;display:flex;align-items:center;gap:4px;">
            ${icon('check', 12)} ${choose('تحديد الكل كمقروء', 'Mark all as read')}
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

  const browserBanner = (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') ? `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-radius:8px;background:var(--surface-soft);border:1px dashed var(--blue);margin-bottom:12px;font-size:11px;">
      <span style="color:var(--ink-soft);">${choose('تفعيل إشعارات سطح المكتب والمتصفح عند وصول مهام أو تنبيهات؟', 'Enable desktop browser alerts when new tasks or mentions arrive?')}</span>
      <button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications" style="font-size:10px;padding:3px 8px;height:auto;flex-shrink:0;">${choose('تفعيل الآن', 'Enable')}</button>
    </div>
  ` : '';

  const listHtml = notifications.length ? `<div class="attention-list">${notifications.slice(0, 30).map((notification) => {
    const isRead = Boolean(notification.readAt || notification.read);
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

    return `
      <div class="attention-item notif-item" data-action="read-notification" data-notification-id="${esc(notification.id)}" data-task-id="${esc(notification.taskId || '')}" data-project-id="${esc(notification.projectId || '')}" data-document-id="${esc(notification.documentId || '')}" data-type="${esc(notification.type || '')}" style="border:1px solid ${!isRead ? 'rgba(56,189,248,0.25)' : 'var(--line)'};text-align:start;width:100%;cursor:pointer;opacity:${isRead ? '.75' : '1'};background:${!isRead ? 'var(--surface)' : 'var(--surface-soft)'};position:relative;display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;transition:all 0.15s ease;">
        <div style="display:flex;align-items:flex-start;gap:10px;flex:1;min-width:0;">
          <span class="attention-icon ${meta.color}" style="flex-shrink:0;margin-top:2px;">${icon(meta.icon, 14)}</span>
          <div class="attention-copy" style="flex:1;min-width:0;text-align:start;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:nowrap;overflow:hidden;">
              ${unreadDot}
              <strong dir="auto" style="color:var(--${meta.color});font-size:12px;font-weight:${!isRead ? '700' : '600'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(title)}</strong>
              ${targetBadge}
            </div>
            <div dir="auto" style="color:var(--muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(message)}">
              ${esc(displaySubtitle)}<span style="color:var(--ink-soft);">${dateLabel(notification.createdAt)}</span>
            </div>
          </div>
        </div>
        <button type="button" class="notif-dismiss-btn" data-action="delete-notification" data-notification-id="${esc(notification.id)}" title="${choose('حذف الإشعار', 'Dismiss notification')}" style="margin-inline-start:10px;flex-shrink:0;">
          ${icon('close', 12)}
        </button>
      </div>
    `;
  }).join('')}</div>` : `
    <div class="empty" style="padding:48px 20px;text-align:center;">
      <span style="color:var(--teal);background:var(--mint);padding:12px;border-radius:14px;display:inline-flex;margin-bottom:10px;">
        ${icon('bell', 24)}
      </span>
      <strong style="display:block;font-size:14px;color:var(--ink);">${choose('لا توجد إشعارات حالياً', 'No notifications right now')}</strong>
      <span style="display:block;color:var(--muted);font-size:12px;margin-top:4px;">${choose('ستظهر هنا التنبيهات الخاصة بالمهام والمشاريع والإشارات والتذكيرات.', 'Task, project, mention, and reminder alerts will appear here.')}</span>
    </div>
  `;

  const body = `${headerActions}${browserBanner}${listHtml}`;
  document.getElementById('modal-root').innerHTML = modalShell(t('notifications'), choose('تنبيهاتك داخل مساحة العمل والبريد.', 'Your workspace and email notifications.'), body, 'notifications', 'modal-notifications');
}
