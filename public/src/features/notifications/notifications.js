
import { state } from '../../core/state.js';
import { api } from '../../core/api.js';

export function showNotifications() {
  const notifications = state.data?.notifications || [];
  const body = notifications.length ? `<div class="attention-list">${notifications.slice(0, 12).map((notification) => { const type = notification.type === 'overdue' || notification.type === 'escalation' ? 'red' : notification.type === 'due_soon' ? 'amber' : 'blue'; return `<button class="attention-item" data-action="read-notification" data-notification-id="${esc(notification.id)}" style="border:0;text-align:inherit;width:100%;opacity:${notification.readAt ? '.65' : '1'}"><span class="attention-icon ${type}">${icon(notification.type === 'overdue' || notification.type === 'escalation' ? 'alert' : notification.type === 'assignment' ? 'user' : 'bell', 14)}</span><span class="attention-copy"><strong style="color:var(--${type})">${esc(choose(notification.titleAr, notification.titleEn))}</strong><span>${esc(choose(notification.messageAr, notification.messageEn))} · ${dateLabel(notification.createdAt)}</span></span></button>`; }).join('')}</div>` : `<div class="empty">${icon('bell', 18)}<span>${t('noAttention')}</span></div>`;
  document.getElementById('modal-root').innerHTML = modalShell(t('notifications'), choose('تنبيهاتك داخل مساحة العمل والبريد.', 'Your workspace and email notifications.'), body, 'notifications');
}

