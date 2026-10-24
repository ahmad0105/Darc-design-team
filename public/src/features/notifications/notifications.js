
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
    const title = choose(notification.titleAr || notification.titleEn || notification.content || '', notification.titleEn || notification.titleAr || notification.content || '');
    const message = choose(notification.messageAr || notification.bodyAr || notification.content || '', notification.messageEn || notification.bodyEn || notification.content || '');
    const notifIcon = notification.type === 'overdue' || notification.type === 'escalation' ? 'alert' : notification.type === 'document_review' ? 'document' : notification.type === 'assignment' ? 'user' : 'bell';
    return `<button class="attention-item" data-action="read-notification" data-notification-id="${esc(notification.id)}" style="border:0;text-align:inherit;width:100%;opacity:${isRead ? '.65' : '1'}"><span class="attention-icon ${type}">${icon(notifIcon, 14)}</span><span class="attention-copy"><strong style="color:var(--${type})">${esc(title)}</strong><span>${esc(message)} · ${dateLabel(notification.createdAt)}</span></span></button>`;
  }).join('')}</div>` : `<div class="empty">${icon('bell', 18)}<span>${t('noAttention')}</span></div>`;

  const body = `${headerActions}${listHtml}`;
  document.getElementById('modal-root').innerHTML = modalShell(t('notifications'), choose('تنبيهاتك داخل مساحة العمل والبريد.', 'Your workspace and email notifications.'), body, 'notifications');
}

