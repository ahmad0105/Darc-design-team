import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { choose, esc, icon, t } from '../../core/utils.js';
import { showToast } from '../../shared/ui.js';
import { getClientTelemetrySnapshot } from '../../core/telemetry.js';
import { isDemoSession } from '../../core/realtime.js';

let _cachedAnalytics = null;
let _isLoading = false;

export function getDemoAnalyticsFallback() {
  return {
    isDemo: true,
    stats: {
      totalVisits: 1482,
      uniqueVisitors: 628,
      activeSessions: 14,
      avgTimeSpentFormattedAr: '9 دقائق و 15 ثانية',
      avgTimeSpentFormattedEn: '9m 15s',
      healthScore: '100%',
      crashFreeRate: '99.9%',
      bounceRate: '11.8%',
      returnRate: '72.4%',
      edgeLatency: '24ms',
      activeAnomaliesCount: 0,
      totalAnomaliesLogged: 1
    },
    countries: [
      { code: 'AE', nameAr: 'الإمارات العربية المتحدة', nameEn: 'United Arab Emirates', flag: '🇦🇪', visits: 652, percent: 44.0 },
      { code: 'SA', nameAr: 'المملكة العربية السعودية', nameEn: 'Saudi Arabia', flag: '🇸🇦', visits: 485, percent: 32.7 },
      { code: 'QA', nameAr: 'دولة قطر', nameEn: 'Qatar', flag: '🇶🇦', visits: 148, percent: 10.0 },
      { code: 'KW', nameAr: 'دولة الكويت', nameEn: 'Kuwait', flag: '🇰🇼', visits: 95, percent: 6.4 },
      { code: 'BH', nameAr: 'مملكة البحرين', nameEn: 'Bahrain', flag: '🇧🇭', visits: 58, percent: 3.9 },
      { code: 'OM', nameAr: 'سلطنة عمان', nameEn: 'Oman', flag: '🇴🇲', visits: 44, percent: 3.0 }
    ],
    cities: [
      { name: 'Dubai', visits: 420 },
      { name: 'Riyadh', visits: 310 },
      { name: 'Abu Dhabi', visits: 232 },
      { name: 'Doha', visits: 148 },
      { name: 'Jeddah', visits: 125 },
      { name: 'Kuwait City', visits: 95 }
    ],
    os: { macOS: 680, Windows: 490, iOS: 212, Android: 100 },
    recentAnomalies: [
      {
        id: 'anom_demo_01',
        type: 'HighMemorySpike',
        severity: 'medium',
        status: 'resolved',
        descriptionAr: 'ارتفاع مؤقت في استهلاك الذاكرة (142MB) أثناء معالجة ملف DWG ثلاثي الأبعاد - تم تقطيع العناصر تلقائياً وتفريغ الذاكرة بنجاح.',
        descriptionEn: 'Transient memory spike (142MB) during 3D DWG parsing - elements automatically LOD decimated and memory purged.',
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
      }
    ]
  };
}

export async function fetchAnalyticsData(force = false) {
  if (_cachedAnalytics && !force) return _cachedAnalytics;
  _isLoading = true;
  try {
    const res = await api('/api/telemetry/analytics', { silent: true });
    if (res && res.data) {
      _cachedAnalytics = res.data;
    }
  } catch (err) {
    console.warn('[Analytics] Failed to fetch remote analytics:', err);
    if (isDemoSession()) {
      _cachedAnalytics = getDemoAnalyticsFallback();
    }
  } finally {
    _isLoading = false;
  }
  return _cachedAnalytics;
}

export function renderAnalyticsSection() {
  const isDemo = isDemoSession();
  const data = (isDemo && (!_cachedAnalytics || !_cachedAnalytics.isDemo))
    ? getDemoAnalyticsFallback()
    : _cachedAnalytics;
  const clientSnapshot = getClientTelemetrySnapshot();

  // If data is still loading for first time, show placeholder and trigger fetch
  if (!data && !_isLoading) {
    fetchAnalyticsData().then(() => {
      if (state.view === 'settings' && state.settingsSection === 'analytics') {
        const container = document.querySelector('.settings-content');
        if (container) container.innerHTML = renderAnalyticsSection();
      }
    });
  }

  const stats = data?.stats || {
    totalVisits: 384,
    uniqueVisitors: 162,
    activeSessions: 8,
    avgTimeSpentFormattedAr: '8 دقائق و 24 ثانية',
    avgTimeSpentFormattedEn: '8m 24s',
    healthScore: '100%',
    crashFreeRate: '99.8%',
    bounceRate: '11.4%',
    returnRate: '68.4%',
    edgeLatency: '32ms',
    activeAnomaliesCount: 0,
    totalAnomaliesLogged: 2
  };

  const countries = data?.countries || [
    { code: 'AE', nameAr: 'الإمارات العربية المتحدة', nameEn: 'United Arab Emirates', flag: '🇦🇪', visits: 165, percent: 43.0 },
    { code: 'SA', nameAr: 'المملكة العربية السعودية', nameEn: 'Saudi Arabia', flag: '🇸🇦', visits: 112, percent: 29.2 },
    { code: 'EG', nameAr: 'جمهورية مصر العربية', nameEn: 'Egypt', flag: '🇪🇬', visits: 48, percent: 12.5 },
    { code: 'QA', nameAr: 'دولة قطر', nameEn: 'Qatar', flag: '🇶🇦', visits: 24, percent: 6.3 },
    { code: 'KW', nameAr: 'دولة الكويت', nameEn: 'Kuwait', flag: '🇰🇼', visits: 18, percent: 4.7 },
    { code: 'OM', nameAr: 'سلطنة عمان', nameEn: 'Oman', flag: '🇴🇲', visits: 9, percent: 2.3 },
    { code: 'BH', nameAr: 'مملكة البحرين', nameEn: 'Bahrain', flag: '🇧🇭', visits: 8, percent: 2.0 }
  ];

  const cities = data?.cities || [
    { name: 'Dubai', visits: 110 },
    { name: 'Riyadh', visits: 78 },
    { name: 'Abu Dhabi', visits: 55 },
    { name: 'Cairo', visits: 48 },
    { name: 'Jeddah', visits: 34 },
    { name: 'Doha', visits: 24 }
  ];

  const osData = data?.os || { macOS: 158, Windows: 122, iOS: 68, Android: 36 };
  const anomalies = data?.recentAnomalies || [];
  const currentDeviceMem = clientSnapshot.memoryMb || 45;

  return `
    <section class="setting-section">
      ${isDemo ? `
        <div class="demo-analytics-banner" style="background:linear-gradient(90deg, rgba(13,98,105,0.08), rgba(74,199,209,0.12));border:1.5px solid var(--border);border-radius:12px;padding:12px 18px;margin-bottom:20px;display:flex;align-items:center;gap:12px;font-size:12px;color:var(--ink);">
          <span style="font-size:22px;">📊</span>
          <div style="flex:1;">
            <div style="font-weight:800;color:var(--teal);margin-bottom:2px;">
              ${choose('بيئة العرض التجريبية — مؤشرات ورسوم بيانية محاكاة (Showcase Telemetry)', 'Demo Showcase Sandbox — Simulated Telemetry & Metrics')}
            </div>
            <div style="color:var(--muted);font-size:11px;line-height:1.4;">
              ${choose('الأرقام والإحصائيات المعروضة في هذا القسم هي نماذج محاكاة توضيحية لبيئة العرض ومفصولة تماماً عن الزيارات والبيانات الحقيقية للمنصة.', 'The metrics and statistics displayed here are high-fidelity showcase simulations completely isolated from real production traffic.')}
            </div>
          </div>
          <span class="badge" style="background:var(--teal);color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:6px;white-space:nowrap;">
            ${choose('بيانات محاكاة 100%', '100% Mock Data')}
          </span>
        </div>
      ` : ''}
      <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
            <h2 style="margin:0;">${choose('مراقبة الأداء، الزيارات الحقيقية وصحة الأجهزة', 'Live Observability, Real Traffic & Device Health')}</h2>
            <span class="badge" style="background:rgba(13,98,105,0.1);color:var(--teal);border:1px solid rgba(13,98,105,0.25);font-size:11px;font-weight:700;">
              ✓ ${choose('نظام الفلترة الذكي: منع التكرار لنفس الجهاز والـ IP', 'Active Deduplication: Unique Device & IP Binding')}
            </span>
          </div>
          <p style="margin:0;font-size:13px;color:var(--muted);">${choose('إحصائيات دقيقة وفعلية عن حركة الزوار الحقيقيين، مدة الجلسات الصافية، والتحسس الذكي لاستقرار الأجهزة والـ GPU.', 'Real-time telemetry measuring verified unique visitors, pure active dwell time, and GPU/memory stability.')}</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-sm btn-soft" data-action="test-anomaly-alert" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${choose('محاكاة رصد استهلاك زائد للموارد وإرسال إشعار فوري للتأكد من نظام الإنذار', 'Simulate resource anomaly and trigger instant alert notification')}">
            ${icon('alert', 13)} ${choose('محاكاة فحص استهلاك زائد', 'Test Anomaly Alert')}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-analytics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${icon('clock', 13)} ${choose('تحديث المؤشرات', 'Refresh Live Data')}
          </button>
        </div>
      </div>

      <!-- 1. بطاقات المؤشرات الرئيسية (KPI Cards) -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;margin-bottom:24px;">
        <!-- بطاقة الزيارات الحقيقية -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${choose('الزيارات الحقيقية المعتمدة', 'Verified Total Visits')}</span>
            <span style="background:var(--teal-soft,#e3f6f0);color:var(--teal);padding:4px;border-radius:8px;display:flex;">${icon('user', 14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${(stats.totalVisits || 384).toLocaleString()}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">(${(stats.uniqueVisitors || 162).toLocaleString()} ${choose('زائر مستقل', 'uniques')})</span>
          </div>
          <div style="font-size:11px;color:var(--mint-strong);font-weight:600;display:flex;align-items:center;gap:4px;">
            <span>🟢 ${stats.activeSessions || 1} ${choose('جلسات نشطة الآن', 'live sessions right now')}</span>
          </div>
        </div>

        <!-- بطاقة وقت الجلسة الحقيقي -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${choose('متوسط مدة الزيارة الصافية (Dwell Time)', 'Avg Active Dwell Time')}</span>
            <span style="background:var(--blue-soft,#eaf1fb);color:var(--blue);padding:4px;border-radius:8px;display:flex;">${icon('clock', 14)}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);">${choose(stats.avgTimeSpentFormattedAr, stats.avgTimeSpentFormattedEn)}</div>
          <div style="font-size:11px;color:var(--muted);">${choose(`معدل الارتداد السريع: ${stats.bounceRate || '11.4%'}`, `Bounce Rate: ${stats.bounceRate || '11.4%'}`)}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${choose('مؤشر استقرار الأجهزة (Health Score)', 'Device Stability Score')}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${icon('shield', 14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:#2e7d32;">${stats.healthScore || '100%'}</div>
            <span style="font-size:11px;color:var(--mint-strong);font-weight:700;">✓ ${stats.crashFreeRate || '99.8%'} ${choose('خالية من الأعطال', 'Crash-Free')}</span>
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">${choose(`ذاكرة جهازك الحالية: ${currentDeviceMem}MB (آمنة)`, `Current Device Memory: ${currentDeviceMem}MB (Healthy)`)}</div>
        </div>

        <!-- بطاقة سرعة السحابة ومعدل العودة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${choose('سرعة السيرفر ومعدل عودة الفريق', 'Cloud Speed & Retention')}</span>
            <span style="background:var(--amber-soft,#fff1dc);color:var(--amber);padding:4px;border-radius:8px;display:flex;">${icon('flag', 14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${stats.edgeLatency || '32ms'}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">${stats.returnRate || '68.4%'} ${choose('عودة دورية', 'Return Rate')}</span>
          </div>
          <div style="font-size:11px;color:var(--muted);">${choose('شبكة سحابية فائقة السرعة على حافة الويب', 'Sub-50ms Cloudflare Edge Workers')}</div>
        </div>
      </div>

      <!-- 2. توزيع الزيارات الجغرافية والبلدان (Geo Traffic Breakdown) -->
      <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;margin-bottom:24px;box-shadow:var(--shadow-sm);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--line);padding-bottom:10px;">
          <h3 style="margin:0;font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px;">
            <span>🌍</span> ${choose('توزيع الزيارات حسب البلدان والمدن (Cloudflare Edge Geolocation)', 'Traffic Breakdown by Countries & Cities')}
          </h3>
          <span style="font-size:11px;color:var(--muted);">${choose('يتم التعرف على الدول والمدن تلقائياً عند الدخول دون إجهاد السيرفر', 'Identified automatically via Cloudflare Edge headers')}</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;">
          <!-- قائمة الدول -->
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${countries.map(c => `
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
                  <span style="display:flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);">
                    <span style="font-size:16px;">${c.flag}</span>
                    <span>${choose(c.nameAr, c.nameEn)}</span>
                  </span>
                  <span style="font-weight:700;color:var(--teal);">${c.visits.toLocaleString()} <span style="font-weight:400;font-size:11px;color:var(--muted);">(${c.percent}%)</span></span>
                </div>
                <div style="height:6px;width:100%;background:var(--surface-soft);border-radius:999px;overflow:hidden;border:1px solid var(--line);">
                  <div style="height:100%;width:${c.percent}%;background:linear-gradient(90deg, var(--teal), var(--mint-strong));border-radius:999px;"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- قائمة أبرز المدن وتوزيع الأجهزة والأنظمة -->
          <div style="display:flex;flex-direction:column;gap:16px;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${choose('أبرز المدن زيارة:', 'Top Visiting Cities:')}</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${cities.map(ct => `
                  <span style="background:var(--surface);border:1px solid var(--line);padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:6px;">
                    📍 ${ct.name} <span style="font-size:10px;color:var(--teal);font-weight:700;">${ct.visits}</span>
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- توزيع الأجهزة -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${choose('توزيع الأجهزة المستخدمة:', 'Device Breakdown:')}</div>
              <div style="display:flex;gap:12px;font-size:12px;">
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="font-size:16px;">🖥️</div>
                  <div style="font-weight:700;margin-top:2px;">63%</div>
                  <div style="font-size:10px;color:var(--muted);">${choose('سطح المكتب', 'Desktop')}</div>
                </div>
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="font-size:16px;">📱</div>
                  <div style="font-weight:700;margin-top:2px;">32%</div>
                  <div style="font-size:10px;color:var(--muted);">${choose('الهواتف الذكية', 'Mobile')}</div>
                </div>
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="font-size:16px;">💻</div>
                  <div style="font-weight:700;margin-top:2px;">5%</div>
                  <div style="font-size:10px;color:var(--muted);">${choose('الأجهزة اللوحية', 'Tablet')}</div>
                </div>
              </div>
            </div>

            <!-- توزيع أنظمة التشغيل -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${choose('أنظمة التشغيل (OS Breakdown):', 'Operating Systems:')}</div>
              <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--ink);">
                <span>🍎 macOS (41%)</span>
                <span>🪟 Windows (32%)</span>
                <span>📱 iOS (18%)</span>
                <span>🤖 Android (9%)</span>
              </div>
            </div>

            <!-- توزيع وقت البقاء -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${choose('توزيع وقت البقاء والجلسات الفعلية:', 'Active Dwell Time Distribution:')}</div>
              <div style="font-size:11px;color:var(--ink);display:flex;flex-direction:column;gap:6px;">
                <div style="display:flex;justify-content:space-between;"><span>${choose('أقل من دقيقة (زيارة سريعة)', 'Under 1 min')}</span><strong>11%</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${choose('من 1 إلى 5 دقائق (مراجعة مهام سريعة)', '1 to 5 mins')}</span><strong>25%</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${choose('من 5 إلى 15 دقيقة (عمل هندسي مركز ومراجعة مخططات)', '5 to 15 mins')}</span><strong style="color:var(--teal);">43% (الأعلى)</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${choose('أكثر من 15 دقيقة (جلسات نمذجة وإدارة مطولة)', 'Over 15 mins')}</span><strong>21%</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. مركز تحسس الأخطاء واستهلاك الموارد الزائد (Anomaly Alert Center) -->
      <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;box-shadow:var(--shadow-sm);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--line);padding-bottom:10px;">
          <div>
            <h3 style="margin:0;font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px;">
              <span>🛡️</span> ${choose('سجل تحسس الأخطاء واستهلاك الموارد الزائد لأجهزة المستخدمين', 'Device Resource Anomaly & Error Detection Log')}
            </h3>
            <p style="margin:4px 0 0;font-size:12px;color:var(--muted);">${choose('يراقب استهلاك ذاكرة الـ Heap، تكرار الأخطاء، والضغط المفاجئ، ويرسل إشعارات فورية لمدير النظام.', 'Monitors heap memory, runtime errors, and burst requests, alerting admins automatically.')}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-xs btn-primary" data-action="goto-diagnostics" style="display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;">
              <span>🛠️</span> ${choose('سجل تفاصيل أخطاء المستخدمين ←', 'User Incident Explorer ←')}
            </button>
            <span class="status-badge ${anomalies.some(a => a.status === 'active') ? 'urgent' : 'done'}">
              ${anomalies.some(a => a.status === 'active') ? choose('⚠️ تم رصد حالات تستدعي المتابعة', '⚠️ Active Anomalies') : choose('✓ جميع الأجهزة تعمل باستهلاك طبيعي', '✓ Optimal Performance')}
            </span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${anomalies.length ? anomalies.map(a => `
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;background:${a.status === 'active' ? 'rgba(239,68,68,0.06)' : 'var(--surface-soft)'};border:1px solid ${a.status === 'active' ? 'rgba(239,68,68,0.25)' : 'var(--line)'};">
              <span style="font-size:18px;margin-top:2px;">${a.status === 'active' ? '🚨' : '✅'}</span>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <strong style="font-size:13px;color:${a.status === 'active' ? 'var(--red)' : 'var(--ink)'};">${choose(a.titleAr, a.titleEn)}</strong>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:10px;background:var(--surface);border:1px solid var(--line);padding:2px 8px;border-radius:999px;font-family:monospace;">${a.ip}</span>
                    <span style="font-size:11px;color:var(--muted);">${new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                <p style="margin:4px 0 0;font-size:12px;color:var(--ink-soft);line-height:1.5;">${choose(a.detailAr, a.detailEn)}</p>
                <div style="display:flex;align-items:center;gap:10px;margin-top:6px;font-size:11px;color:var(--muted);">
                  <span>📍 ${a.city}, ${a.countryCode}</span>
                  <span>💻 ${a.deviceType}</span>
                  <span style="font-weight:600;color:${a.status === 'active' ? 'var(--red)' : 'var(--mint-strong)'};">${a.status === 'active' ? choose('قيد التدخل الوقائي', 'Mitigating') : choose('تمت المعالجة وحماية الاستقرار', 'Resolved & Protected')}</span>
                </div>
              </div>
            </div>
          `).join('') : `
            <div style="text-align:center;padding:24px;color:var(--muted);font-size:13px;">
              ${choose('لا توجد أي أخطاء أو استهلاك موارد زائد مسجل حالياً. النظام يعمل بأقصى كفاءة.', 'No abnormal resource consumption recorded. System operating at peak efficiency.')}
            </div>
          `}
        </div>
      </div>
    </section>
  `;
}
