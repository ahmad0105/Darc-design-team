/**
 * Frontend Notification Standard Library & Catalog
 * Single Source of Truth for icons, colors, category mappings, and bilingual title fallbacks.
 */

import { choose } from '../../core/utils.js';

export const NOTIFICATION_CATALOG = {
  assignment: {
    type: 'assignment',
    category: 'tasks',
    icon: 'user',
    color: 'blue',
    titleAr: 'إسناد مهمة جديدة',
    titleEn: 'Task Assigned',
    badgeTextAr: 'فتح المهمة',
    badgeTextEn: 'Open Task'
  },
  task_status: {
    type: 'task_status',
    category: 'tasks',
    icon: 'check',
    color: 'teal',
    titleAr: 'تحديث حالة المهمة',
    titleEn: 'Task Status Update',
    badgeTextAr: 'فتح المهمة',
    badgeTextEn: 'Open Task'
  },
  task_blocked: {
    type: 'task_blocked',
    category: 'tasks',
    icon: 'alert',
    color: 'red',
    titleAr: 'مهمة متوقفة',
    titleEn: 'Task Blocked',
    badgeTextAr: 'فتح المهمة',
    badgeTextEn: 'Open Task'
  },
  task_review: {
    type: 'task_review',
    category: 'tasks',
    icon: 'check',
    color: 'teal',
    titleAr: 'مهمة للمراجعة الفنية',
    titleEn: 'Task for Review',
    badgeTextAr: 'فتح المهمة',
    badgeTextEn: 'Open Task'
  },
  task_approval: {
    type: 'task_approval',
    category: 'tasks',
    icon: 'check',
    color: 'teal',
    titleAr: 'مهمة بانتظار الاعتماد',
    titleEn: 'Task Pending Approval',
    badgeTextAr: 'فتح المهمة',
    badgeTextEn: 'Open Task'
  },
  due_soon: {
    type: 'due_soon',
    category: 'schedule',
    icon: 'clock',
    color: 'amber',
    titleAr: 'موعد تسليم قريب',
    titleEn: 'Due Soon',
    badgeTextAr: 'فتح المهمة',
    badgeTextEn: 'Open Task'
  },
  overdue: {
    type: 'overdue',
    category: 'schedule',
    icon: 'alert',
    color: 'red',
    titleAr: 'مهمة متأخرة',
    titleEn: 'Overdue Task',
    badgeTextAr: 'فتح المهمة',
    badgeTextEn: 'Open Task'
  },
  reminder: {
    type: 'reminder',
    category: 'schedule',
    icon: 'clock',
    color: 'amber',
    titleAr: 'تذكير بموعد ⏰',
    titleEn: 'Due Reminder ⏰',
    badgeTextAr: 'فتح التذكير',
    badgeTextEn: 'Open Reminder'
  },
  comment: {
    type: 'comment',
    category: 'communication',
    icon: 'mail',
    color: 'blue',
    titleAr: 'تعليق جديد',
    titleEn: 'New Comment',
    badgeTextAr: 'عرض التعليق',
    badgeTextEn: 'View Comment'
  },
  mention: {
    type: 'mention',
    category: 'communication',
    icon: 'mail',
    color: 'blue',
    titleAr: 'تم ذكرك في تعليق',
    titleEn: 'Mentioned in Comment',
    badgeTextAr: 'عرض التعليق',
    badgeTextEn: 'View Comment'
  },
  document_review: {
    type: 'document_review',
    category: 'drawings',
    icon: 'document',
    color: 'amber',
    titleAr: 'مراجعة مخطط هندسي',
    titleEn: 'Drawing Review',
    badgeTextAr: 'معاينة المخطط',
    badgeTextEn: 'View Drawing'
  },
  document_approved: {
    type: 'document_approved',
    category: 'drawings',
    icon: 'document',
    color: 'teal',
    titleAr: 'اعتماد مخطط هندسي',
    titleEn: 'Drawing Approved',
    badgeTextAr: 'معاينة المخطط',
    badgeTextEn: 'View Drawing'
  },
  escalation: {
    type: 'escalation',
    category: 'system',
    icon: 'alert',
    color: 'red',
    titleAr: 'تصعيد مهمة ونظام',
    titleEn: 'Escalation Alert',
    badgeTextAr: 'التفاصيل',
    badgeTextEn: 'Details'
  },
  general: {
    type: 'general',
    category: 'system',
    icon: 'bell',
    color: 'blue',
    titleAr: 'تنبيه مساحة العمل',
    titleEn: 'Workspace Notification',
    badgeTextAr: 'عرض',
    badgeTextEn: 'View'
  }
};

export function getNotificationCatalogMeta(type) {
  const item = NOTIFICATION_CATALOG[type] || NOTIFICATION_CATALOG.general;
  return {
    ...item,
    defaultTitle: choose(item.titleAr, item.titleEn),
    badgeText: choose(item.badgeTextAr, item.badgeTextEn)
  };
}
