/**
 * DARC Notification Standard Library & Catalog
 * Single Source of Truth for all notification types, channels, severities, icons, and bilingual templates.
 */

export const NOTIFICATION_CATALOG = {
  // 1. Task Operations
  assignment: {
    type: 'assignment',
    category: 'tasks',
    icon: 'user',
    color: 'blue',
    severity: 'normal',
    defaultTitleAr: 'مهمة جديدة مسندة إليك 📋',
    defaultTitleEn: 'New Task Assigned to You 📋',
    formatMessage: ({ taskTitle, projectName }) => ({
      ar: `تم إسناد المهمة "${taskTitle}" إليك${projectName ? ` في مشروع ${projectName}` : ''}.`,
      en: `You have been assigned to task "${taskTitle}"${projectName ? ` in project ${projectName}` : ''}.`
    })
  },
  task_status: {
    type: 'task_status',
    category: 'tasks',
    icon: 'check',
    color: 'teal',
    severity: 'normal',
    defaultTitleAr: 'تحديث حالة مهمة 🔄',
    defaultTitleEn: 'Task Status Updated 🔄',
    formatMessage: ({ taskTitle, statusLabel }) => ({
      ar: `تم تحديث حالة المهمة "${taskTitle}" إلى (${statusLabel || 'حالة جديدة'}).`,
      en: `Task "${taskTitle}" status changed to (${statusLabel || 'new status'}).`
    })
  },
  task_blocked: {
    type: 'task_blocked',
    category: 'tasks',
    icon: 'alert',
    color: 'red',
    severity: 'high',
    defaultTitleAr: 'تنبيه: مهمة متوقفة (Blocked) ⚠️',
    defaultTitleEn: 'Alert: Task Blocked ⚠️',
    formatMessage: ({ taskTitle, reason }) => ({
      ar: `تم تعليق المهمة "${taskTitle}"${reason ? `: ${reason}` : ''}. يرجى مراجعة المعوقات.`,
      en: `Task "${taskTitle}" is blocked${reason ? `: ${reason}` : ''}. Please review blockers.`
    })
  },
  task_review: {
    type: 'task_review',
    category: 'tasks',
    icon: 'check',
    color: 'teal',
    severity: 'normal',
    defaultTitleAr: 'مهمة بانتظار المراجعة الفنية 🔍',
    defaultTitleEn: 'Task Ready for Technical Review 🔍',
    formatMessage: ({ taskTitle, projectName }) => ({
      ar: `المهمة "${taskTitle}"${projectName ? ` في مشروع ${projectName}` : ''} بانتظار المراجعة والتدقيق الفني.`,
      en: `Task "${taskTitle}"${projectName ? ` in ${projectName}` : ''} is awaiting technical review.`
    })
  },
  task_approval: {
    type: 'task_approval',
    category: 'tasks',
    icon: 'check',
    color: 'teal',
    severity: 'normal',
    defaultTitleAr: 'مهمة بانتظار الاعتماد النهائي ✍️',
    defaultTitleEn: 'Task Pending Final Approval ✍️',
    formatMessage: ({ taskTitle, projectName }) => ({
      ar: `المهمة "${taskTitle}"${projectName ? ` في مشروع ${projectName}` : ''} بانتظار الاعتماد الهندسي النهائي.`,
      en: `Task "${taskTitle}"${projectName ? ` in ${projectName}` : ''} is awaiting final engineering approval.`
    })
  },

  // 2. Schedule & Deadlines
  due_soon: {
    type: 'due_soon',
    category: 'schedule',
    icon: 'clock',
    color: 'amber',
    severity: 'medium',
    defaultTitleAr: 'موعد تسليم قريب ⏰',
    defaultTitleEn: 'Due Soon Reminder ⏰',
    formatMessage: ({ taskTitle, daysLeft }) => ({
      ar: `المهمة "${taskTitle}" تستحق التسليم خلال ${daysLeft || 1} يوم.`,
      en: `Task "${taskTitle}" is due in ${daysLeft || 1} days.`
    })
  },
  overdue: {
    type: 'overdue',
    category: 'schedule',
    icon: 'alert',
    color: 'red',
    severity: 'high',
    defaultTitleAr: 'تنبيه تأخير موعد تسليم 🚨',
    defaultTitleEn: 'Overdue Task Alert 🚨',
    formatMessage: ({ taskTitle }) => ({
      ar: `المهمة "${taskTitle}" تجاوزت موعد التسليم المحدد وتحتاج تدخلاً ومتابعة.`,
      en: `Task "${taskTitle}" is overdue and requires follow-up.`
    })
  },
  reminder: {
    type: 'reminder',
    category: 'schedule',
    icon: 'clock',
    color: 'amber',
    severity: 'normal',
    defaultTitleAr: 'تذكير بموعد مجدول ⏰',
    defaultTitleEn: 'Scheduled Due Reminder ⏰',
    formatMessage: ({ note, taskTitle }) => ({
      ar: note || `حان موعد التذكير بالمهمة "${taskTitle || ''}".`,
      en: note || `Reminder due for task "${taskTitle || ''}".`
    })
  },

  // 3. Team Communication & Mentions
  comment: {
    type: 'comment',
    category: 'communication',
    icon: 'mail',
    color: 'blue',
    severity: 'normal',
    defaultTitleAr: 'تعليق جديد على المهمة 💬',
    defaultTitleEn: 'New Task Comment 💬',
    formatMessage: ({ taskTitle, senderName }) => ({
      ar: `أضاف ${senderName || 'عضو بالفريق'} تعليقاً على: "${taskTitle}".`,
      en: `${senderName || 'Team member'} commented on: "${taskTitle}".`
    })
  },
  mention: {
    type: 'mention',
    category: 'communication',
    icon: 'mail',
    color: 'blue',
    severity: 'normal',
    defaultTitleAr: 'تم ذكرك في تعليق 📢',
    defaultTitleEn: 'Mentioned in Comment 📢',
    formatMessage: ({ taskTitle, senderName, isCollective }) => ({
      ar: isCollective ? `أشار ${senderName || 'عضو'} إلى كافة أعضاء المشروع في: "${taskTitle}"` : `أشار إليك ${senderName || 'عضو'} في المهمة: "${taskTitle}"`,
      en: isCollective ? `${senderName || 'Team member'} mentioned everyone in: "${taskTitle}"` : `${senderName || 'Team member'} mentioned you in: "${taskTitle}"`
    })
  },

  // 4. Engineering Drawings & Documents
  document_review: {
    type: 'document_review',
    category: 'drawings',
    icon: 'document',
    color: 'amber',
    severity: 'normal',
    defaultTitleAr: 'مخطط هندسي للمراجعة والتدقيق 📐',
    defaultTitleEn: 'Drawing Submitted for Review 📐',
    formatMessage: ({ docName, projectName, senderName }) => ({
      ar: `قام ${senderName || 'عضو بالفريق'} برفع المخطط "${docName}"${projectName ? ` بمشروع "${projectName}"` : ''} وهو بانتظار مراجعتك.`,
      en: `${senderName || 'Team member'} uploaded drawing "${docName}"${projectName ? ` in "${projectName}"` : ''}. It is awaiting your review.`
    })
  },
  document_approved: {
    type: 'document_approved',
    category: 'drawings',
    icon: 'document',
    color: 'teal',
    severity: 'normal',
    defaultTitleAr: 'تم اعتماد المخطط الهندسي بنجاح ✅',
    defaultTitleEn: 'Engineering Drawing Approved Successfully ✅',
    formatMessage: ({ docName, projectName }) => ({
      ar: `تم اعتماد المخطط الهندسي "${docName}"${projectName ? ` في مشروع "${projectName}"` : ''} بنجاح.`,
      en: `Engineering drawing "${docName}"${projectName ? ` in project "${projectName}"` : ''} has been approved.`
    })
  },

  // 5. System, Security & Operations
  escalation: {
    type: 'escalation',
    category: 'system',
    icon: 'alert',
    color: 'red',
    severity: 'high',
    defaultTitleAr: 'إنذار نظام وتصعيد أمني 🚨',
    defaultTitleEn: 'System Escalation Alert 🚨',
    formatMessage: ({ message }) => ({
      ar: message || 'تم رصد حالة استثنائية في النظام تتطلب متابعة الإدارة.',
      en: message || 'A system exception was detected that requires administrative attention.'
    })
  },
  general: {
    type: 'general',
    category: 'system',
    icon: 'bell',
    color: 'blue',
    severity: 'normal',
    defaultTitleAr: 'تنبيه مساحة العمل 🔔',
    defaultTitleEn: 'Workspace Notification 🔔',
    formatMessage: ({ message }) => ({
      ar: message || 'إشعار جديد في مساحة العمل.',
      en: message || 'New workspace notification.'
    })
  }
};

/**
 * Standardize notification payload against the Catalog Library
 */
export function buildStandardNotification(entry) {
  const catalogItem = NOTIFICATION_CATALOG[entry.type] || NOTIFICATION_CATALOG.general;
  
  let formatted = { ar: '', en: '' };
  if (typeof catalogItem.formatMessage === 'function') {
    formatted = catalogItem.formatMessage(entry.params || entry.data || {});
  }

  const titleAr = entry.titleAr || entry.title_ar || catalogItem.defaultTitleAr;
  const titleEn = entry.titleEn || entry.title_en || catalogItem.defaultTitleEn;
  const messageAr = entry.messageAr || entry.message_ar || entry.content || formatted.ar || '';
  const messageEn = entry.messageEn || entry.message_en || entry.content || formatted.en || messageAr;

  return {
    type: catalogItem.type,
    category: catalogItem.category,
    icon: catalogItem.icon,
    color: catalogItem.color,
    severity: catalogItem.severity,
    titleAr,
    titleEn,
    messageAr,
    messageEn,
    content: messageAr
  };
}
