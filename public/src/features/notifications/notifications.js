
import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { choose, esc, icon, dateLabel, t } from '../../core/utils.js';
import { modalShell } from '../../shared/ui.js';

export function showNotifications() {
  const notifications = state.data?.notifications || [];
  const unreadCount = notifications.filter(n => !n.read && !n.readAt).length;

  const headerActions = unreadCount > 0 ? `
    <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
      <button class="btn btn-ghost btn-sm" data-action="mark-all-notifications-read" style="font-size:11px;color:var(--teal);padding:4px 10px;">
        ${icon('check', 13)} ${choose('تحديد الكل كمقروء', 'Mark all as read')}
      </button>
    </div>
  ` : '';

  const listHtml = notifications.length ? `<div class="attention-list">${notifications.slice(0, 20).map((notification) => {
    const type = notification.type === 'overdue' || notification.type === 'escalation' ? 'red' : (notification.type === 'due_soon' || notification.type === 'document_review') ? 'amber' : 'blue';
    const isRead = Boolean(notification.readAt || notification.read);
    const defaultTitle = notification.type === 'overdue' ? choose('مهمة متأخرة', 'Overdue Task') :
      notification.type === 'escalation' ? choose('تصعيد مهمة', 'Task Escalation') :
      notification.type === 'due_soon' ? choose('موعد تسليم قريب', 'Due Soon') :
      notification.type === 'document_review' ? choose('مراجعة مستند', 'Document Review') :
      notification.type === 'assignment' ? choose('إسناد مهمة جديدة', 'Task Assigned') :
      choose('تنبيه مساحة العمل', 'Workspace Notification');
    const title = choose(notification.titleAr || notification.titleEn || defaultTitle, notification.titleEn || notification.titleAr || defaultTitle);
    const message = choose(notification.messageAr || notification.bodyAr || notification.content || '', notification.messageEn || notification.bodyEn || notification.content || '');
    const displaySubtitle = message && message !== title ? `${message} · ` : '';
    const notifIcon = notification.type === 'overdue' || notification.type === 'escalation' ? 'alert' : notification.type === 'document_review' ? 'document' : notification.type === 'assignment' ? 'user' : 'bell';
    const targetBadge = notification.taskId ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);margin-inline-start:6px;font-weight:600;">${icon('check', 10)} ${choose('فتح المهمة', 'Open Task')}</span>` :
      notification.documentId ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--blue);border:1px solid var(--line);margin-inline-start:6px;font-weight:600;">${icon('document', 10)} ${choose('معاينة المخطط', 'View Drawing')}</span>` :
      notification.projectId ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 6px;border-radius:4px;background:var(--surface-soft);color:var(--mint-strong);border:1px solid var(--line);margin-inline-start:6px;font-weight:600;">${icon('project', 10)} ${choose('المشروع', 'Project')}</span>` : '';

    return `<button class="attention-item" data-action="read-notification" data-notification-id="${esc(notification.id)}" data-task-id="${esc(notification.taskId || '')}" data-project-id="${esc(notification.projectId || '')}" data-document-id="${esc(notification.documentId || '')}" data-type="${esc(notification.type || '')}" style="border:0;text-align:inherit;width:100%;cursor:pointer;opacity:${isRead ? '.65' : '1'}"><span class="attention-icon ${type}">${icon(notifIcon, 14)}</span><span class="attention-copy"><strong style="color:var(--${type});display:flex;align-items:center;justify-content:space-between;"><span>${esc(title)}</span>${targetBadge}</strong><span>${esc(displaySubtitle)}${dateLabel(notification.createdAt)}</span></span></button>`;
  }).join('')}</div>` : `<div class="empty">${icon('bell', 18)}<span>${t('noAttention')}</span></div>`;

  const body = `${headerActions}${listHtml}`;
  document.getElementById('modal-root').innerHTML = modalShell(t('notifications'), choose('تنبيهاتك داخل مساحة العمل والبريد.', 'Your workspace and email notifications.'), body, 'notifications');
}

