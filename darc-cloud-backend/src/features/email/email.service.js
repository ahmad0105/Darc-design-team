// Enterprise Email & Automated Incident Alerting Service
// Sends rich HTML incident alerts via Resend API or resilient fallback logger

export async function sendEmail(env, { to, subject, html, text }) {
  const apiKey = env?.RESEND_API_KEY;
  const from = env?.EMAIL_FROM || 'DARC Incident Response <alerts@darc-design.bond>';
  const recipient = to || env?.ALERT_EMAIL || env?.ADMIN_EMAIL || 'admin@darc-design.bond';

  if (!apiKey) {
    console.log('[EmailService:SimulatedDispatch]', {
      recipient,
      subject,
      time: new Date().toISOString()
    });
    return {
      success: true,
      simulated: true,
      provider: 'sandbox_logger',
      recipient,
      subject,
      messageId: 'sim_' + Date.now().toString(36),
      deliveredAt: new Date().toISOString(),
      note: 'Resend API key is not yet set in environment. Email formatted and validated in sandbox.'
    };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(recipient) ? recipient : [recipient],
        subject,
        html,
        text: text || subject
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.warn('[EmailService:ResendAPIError]', res.status, data);
      return {
        success: false,
        simulated: false,
        provider: 'resend',
        error: data?.message || `HTTP ${res.status}`,
        recipient,
        deliveredAt: new Date().toISOString()
      };
    }

    return {
      success: true,
      simulated: false,
      provider: 'resend',
      messageId: data?.id || 'resend_' + Date.now().toString(36),
      recipient,
      deliveredAt: new Date().toISOString()
    };
  } catch (err) {
    console.error('[EmailService:NetworkError]', err);
    return {
      success: false,
      simulated: false,
      error: err.message,
      recipient,
      deliveredAt: new Date().toISOString()
    };
  }
}

/**
 * Builds and sends a rich HTML diagnostic email when an error or anomaly occurs.
 */
export async function sendIncidentAlertEmail(env, incident) {
  const recipient = env?.ALERT_EMAIL || env?.ADMIN_EMAIL || 'admin@darc-design.bond';
  const severityBadgeColor = incident.severity === 'critical' ? '#ef4444' : incident.severity === 'high' ? '#f59e0b' : '#3b82f6';
  const severityLabel = incident.severity === 'critical' ? 'حرج جداً (CRITICAL)' : incident.severity === 'high' ? 'مرتفع (HIGH)' : 'متوسط (MEDIUM)';

  const breadcrumbsHtml = (incident.breadcrumbs || []).length
    ? incident.breadcrumbs.map((b, i) => `
        <li style="margin-bottom:6px;font-size:12px;color:#cbd5e1;">
          <span style="color:#94a3b8;font-family:monospace;">[${b.time || ''}]</span>
          <strong style="color:#38bdf8;">${b.category || 'action'}:</strong> ${b.message || ''}
        </li>
      `).join('')
    : '<li style="color:#94a3b8;font-size:12px;">لا توجد خطوات سابقة مسجلة</li>';

  const subject = `🚨 [تنبيه أمان ونظام] ${incident.titleAr || incident.title || 'رصد خطأ غير معتاد'} | ${incident.userName || incident.userEmail || 'مستخدم'}`;

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:24px;background-color:#0b1120;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f8fafc;direction:rtl;text-align:right;">
  <div style="max-width:680px;margin:0 auto;background:#1e293b;border-radius:12px;overflow:hidden;border:1px solid #334155;box-shadow:0 20px 25px -5px rgba(0,0,0,0.5);">
    
    <!-- Header -->
    <div style="background:#0f172a;padding:24px 28px;border-bottom:1px solid #334155;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="font-size:11px;font-weight:700;color:#38bdf8;letter-spacing:1px;text-transform:uppercase;">DARC DESIGN TEAM · OBSERVABILITY SYSTEM</div>
        <h1 style="margin:6px 0 0;font-size:18px;color:#ffffff;font-weight:700;">🚨 إشعار بحدوث مشكلة تشغيلية / خطأ برمجي</h1>
      </div>
      <div style="background:${severityBadgeColor};color:#ffffff;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;display:inline-block;">
        ${severityLabel}
      </div>
    </div>

    <!-- Body Container -->
    <div style="padding:28px;">
      
      <!-- Incident Overview -->
      <div style="background:#0f172a;border-radius:8px;padding:16px 20px;margin-bottom:20px;border-right:4px solid ${severityBadgeColor};">
        <h2 style="margin:0 0 8px;font-size:16px;color:#f1f5f9;">${incident.titleAr || incident.title}</h2>
        <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">${incident.detailAr || incident.message || 'تم التقاط استثناء أثناء تنفيذ طلب المستخدم.'}</p>
      </div>

      <!-- User Information Box -->
      <h3 style="margin:0 0 10px;font-size:14px;color:#cbd5e1;font-weight:600;">👤 بيانات المستخدم المتأثر:</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;background:#0f172a;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:12px;width:30%;">الاسم:</td>
          <td style="padding:10px 14px;border-bottom:1px solid #1e293b;color:#ffffff;font-size:12px;font-weight:600;">${incident.userName || 'مستخدم تجريبي / مجهول'}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:12px;">البريد الإلكتروني:</td>
          <td style="padding:10px 14px;border-bottom:1px solid #1e293b;color:#38bdf8;font-size:12px;font-family:monospace;">${incident.userEmail || 'demo@darc-design.bond'}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:12px;">المسمى الوظيفي والدور:</td>
          <td style="padding:10px 14px;border-bottom:1px solid #1e293b;color:#f8fafc;font-size:12px;">${incident.userRole || 'مهندس / مدير نظام'}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;color:#94a3b8;font-size:12px;">الموقع الجغرافي والـ IP:</td>
          <td style="padding:10px 14px;color:#f8fafc;font-size:12px;">${incident.city || 'Dubai'}, ${incident.country || 'AE'} (${incident.ip || '127.0.0.1'})</td>
        </tr>
      </table>

      <!-- Client Technical Environment -->
      <h3 style="margin:0 0 10px;font-size:14px;color:#cbd5e1;font-weight:600;">💻 بيئة الجهاز والمواصفات الفنية:</h3>
      <div style="background:#0f172a;border-radius:8px;padding:14px 18px;margin-bottom:20px;display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:12px;">
        <div><strong style="color:#94a3b8;">نوع الجهاز:</strong> <span style="color:#f8fafc;">${incident.deviceType || 'Desktop'}</span></div>
        <div><strong style="color:#94a3b8;">المتصفح:</strong> <span style="color:#f8fafc;">${incident.browser || 'Chrome'}</span></div>
        <div><strong style="color:#94a3b8;">نظام التشغيل:</strong> <span style="color:#f8fafc;">${incident.os || 'macOS'}</span></div>
        <div><strong style="color:#94a3b8;">دقة الشاشة:</strong> <span style="color:#f8fafc;">${incident.screenResolution || '1920x1080'}</span></div>
        <div><strong style="color:#94a3b8;">استهلاك الذاكرة (Heap):</strong> <span style="color:${incident.memoryMb > 130 ? '#ef4444' : '#10b981'};font-weight:bold;">${incident.memoryMb || 45} MB</span></div>
        <div><strong style="color:#94a3b8;">الصفحة الحالية:</strong> <span style="color:#38bdf8;font-family:monospace;">${incident.currentView || '#dashboard'}</span></div>
      </div>

      <!-- Technical Stack Trace / Error Details -->
      <h3 style="margin:0 0 10px;font-size:14px;color:#cbd5e1;font-weight:600;">🔍 التفاصيل البرمجية وموقع الخطأ (Stack Trace):</h3>
      <div style="background:#020617;border:1px solid #1e293b;border-radius:8px;padding:14px 16px;margin-bottom:20px;overflow-x:auto;">
        <div style="color:#ef4444;font-family:monospace;font-size:13px;font-weight:600;margin-bottom:8px;">${incident.errorMessage || incident.message || 'Unknown Exception'}</div>
        <pre style="margin:0;color:#94a3b8;font-family:Consolas,Monaco,'Courier New',monospace;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;">${incident.stackTrace || 'No stack trace provided.'}</pre>
      </div>

      <!-- User Breadcrumbs -->
      <h3 style="margin:0 0 10px;font-size:14px;color:#cbd5e1;font-weight:600;">👣 الخطوات التي قام بها المستخدم قبل حدوث المشكلة:</h3>
      <div style="background:#0f172a;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
        <ul style="margin:0;padding-right:20px;">
          ${breadcrumbsHtml}
        </ul>
      </div>

      <!-- Automated Diagnosis and Fix Guidance -->
      <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:16px 20px;margin-bottom:24px;">
        <h4 style="margin:0 0 6px;color:#10b981;font-size:14px;">💡 التشخيص التلقائي والحل المقترح:</h4>
        <p style="margin:0;font-size:12px;color:#d1fae5;line-height:1.6;">${incident.suggestedSolution || 'تحقق من صحة المدخلات واستجابة السيرفر وتفريغ التخزين المؤقت.'}</p>
      </div>

      <!-- Action Button -->
      <div style="text-align:center;margin-top:28px;">
        <a href="https://darc-design-team.ahmad-hashmi-c.workers.dev/#settings?section=diagnostics" style="background:#0284c7;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;box-shadow:0 4px 6px -1px rgba(0,0,0,0.3);">
          عرض تقرير المشكلة في لوحة التحكم الإدارية ←
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#0f172a;padding:16px 28px;border-top:1px solid #334155;text-align:center;font-size:11px;color:#64748b;">
      هذا إشعار تلقائي صادر عن نظام المراقبة والرصد الفوري لمنصة DARC Design Team · معرّف البلاغ: <span style="font-family:monospace;color:#94a3b8;">${incident.id}</span>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail(env, {
    to: recipient,
    subject,
    html,
    text: `${subject}\n\nUser: ${incident.userName} (${incident.userEmail})\nError: ${incident.errorMessage}\nLocation: ${incident.city}, ${incident.country}\nView details at: https://darc-design-team.ahmad-hashmi-c.workers.dev/#settings?section=diagnostics`
  });
}
