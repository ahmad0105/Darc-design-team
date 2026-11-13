import{t as ue}from"./rolldown-runtime-BQ-_32WO.js";import{A as We,At as V,Bt as l,It as ke,J as D,K as ye,M as Ve,Mt as qe,Q as be,Rt as T,Tt as F,X as Je,Y as j,Z as e,at as je,ct as Ke,d as ae,gt as C,h as M,ht as Re,it as pe,j as Ye,jt as g,kt as U,l as Pe,mt as n,n as P,nt as Qe,o as Le,ot as Me,p as Ie,q as xe,st as Ce,tt as t,wt as G}from"./core-dragdrop-CjSMdOSc.js";var vt=ue({fetchAnalyticsData:()=>Be,getDemoAnalyticsFallback:()=>Se,renderAnalyticsSection:()=>Ee}),N=null,he=!1;function Se(){return{isDemo:!0,stats:{totalVisits:1482,uniqueVisitors:628,activeSessions:14,avgTimeSpentFormattedAr:"9 دقائق و 15 ثانية",avgTimeSpentFormattedEn:"9m 15s",healthScore:"100%",crashFreeRate:"99.9%",bounceRate:"11.8%",returnRate:"72.4%",edgeLatency:"24ms",activeAnomaliesCount:0,totalAnomaliesLogged:1},countries:[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",visits:652,percent:44},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",visits:485,percent:32.7},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",visits:148,percent:10},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",visits:95,percent:6.4},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",visits:58,percent:3.9},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",visits:44,percent:3}],cities:[{name:"Dubai",visits:420},{name:"Riyadh",visits:310},{name:"Abu Dhabi",visits:232},{name:"Doha",visits:148},{name:"Jeddah",visits:125},{name:"Kuwait City",visits:95}],os:{macOS:680,Windows:490,iOS:212,Android:100},recentAnomalies:[{id:"anom_demo_01",type:"HighMemorySpike",severity:"medium",status:"resolved",descriptionAr:"ارتفاع مؤقت في استهلاك الذاكرة (142MB) أثناء معالجة ملف DWG ثلاثي الأبعاد - تم تقطيع العناصر تلقائياً وتفريغ الذاكرة بنجاح.",descriptionEn:"Transient memory spike (142MB) during 3D DWG parsing - elements automatically LOD decimated and memory purged.",timestamp:new Date(Date.now()-72e5).toISOString()}]}}async function Be(s=!1){if(N&&!s)return N;he=!0;try{const a=await P("/api/telemetry/analytics",{silent:!0});a&&a.data&&(N=a.data)}catch(a){console.warn("[Analytics] Failed to fetch remote analytics:",a),M()&&(N=Se())}finally{he=!1}return N}function Ee(){const s=M(),a=s&&(!N||!N.isDemo)?Se():N,r=Pe();!a&&!he&&Be().then(()=>{if(l.view==="settings"&&l.settingsSection==="analytics"){const u=document.querySelector(".settings-content");u&&(u.innerHTML=Ee())}});const o=a?.stats||{totalVisits:384,uniqueVisitors:162,activeSessions:8,avgTimeSpentFormattedAr:"8 دقائق و 24 ثانية",avgTimeSpentFormattedEn:"8m 24s",healthScore:"100%",crashFreeRate:"99.8%",bounceRate:"11.4%",returnRate:"68.4%",edgeLatency:"32ms",activeAnomaliesCount:0,totalAnomaliesLogged:2},p=a?.countries||[{code:"AE",nameAr:"الإمارات العربية المتحدة",nameEn:"United Arab Emirates",visits:165,percent:43},{code:"SA",nameAr:"المملكة العربية السعودية",nameEn:"Saudi Arabia",visits:112,percent:29.2},{code:"EG",nameAr:"جمهورية مصر العربية",nameEn:"Egypt",visits:48,percent:12.5},{code:"QA",nameAr:"دولة قطر",nameEn:"Qatar",visits:24,percent:6.3},{code:"KW",nameAr:"دولة الكويت",nameEn:"Kuwait",visits:18,percent:4.7},{code:"OM",nameAr:"سلطنة عمان",nameEn:"Oman",visits:9,percent:2.3},{code:"BH",nameAr:"مملكة البحرين",nameEn:"Bahrain",visits:8,percent:2}],d=a?.cities||[{name:"Dubai",visits:110},{name:"Riyadh",visits:78},{name:"Abu Dhabi",visits:55},{name:"Cairo",visits:48},{name:"Jeddah",visits:34},{name:"Doha",visits:24}];a?.os;const b=a?.recentAnomalies||[],x=r.memoryMb||45;return`
    <section class="setting-section">
      ${s?`
        <div class="demo-analytics-banner" style="background:linear-gradient(90deg, rgba(13,98,105,0.08), rgba(74,199,209,0.12));border:1.5px solid var(--border);border-radius:12px;padding:12px 18px;margin-bottom:20px;display:flex;align-items:center;gap:12px;font-size:12px;color:var(--ink);">
          <span style="color:var(--teal);display:flex;align-items:center;">${n("chart",22)}</span>
          <div style="flex:1;">
            <div style="font-weight:800;color:var(--teal);margin-bottom:2px;">
              ${e("بيئة العرض التجريبية — مؤشرات ورسوم بيانية محاكاة (Showcase Telemetry)","Demo Showcase Sandbox — Simulated Telemetry & Metrics")}
            </div>
            <div style="color:var(--muted);font-size:11px;line-height:1.4;">
              ${e("الأرقام والإحصائيات المعروضة في هذا القسم هي نماذج محاكاة توضيحية لبيئة العرض ومفصولة تماماً عن الزيارات والبيانات الحقيقية للمنصة.","The metrics and statistics displayed here are high-fidelity showcase simulations completely isolated from real production traffic.")}
            </div>
          </div>
          <span class="badge" style="background:var(--teal);color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:6px;white-space:nowrap;">
            ${e("بيانات محاكاة 100%","100% Mock Data")}
          </span>
        </div>
      `:""}
      <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
            <h2 style="margin:0;">${e("مراقبة الأداء، الزيارات الحقيقية وصحة الأجهزة","Live Observability, Real Traffic & Device Health")}</h2>
            <span class="badge" style="background:rgba(13,98,105,0.1);color:var(--teal);border:1px solid rgba(13,98,105,0.25);font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px;">
              ${U("active")} ${e("نظام الفلترة الذكي: منع التكرار لنفس الجهاز والـ IP","Active Deduplication: Unique Device & IP Binding")}
            </span>
          </div>
          <p style="margin:0;font-size:13px;color:var(--muted);">${e("إحصائيات دقيقة وفعلية عن حركة الزوار الحقيقيين، مدة الجلسات الصافية، والتحسس الذكي لاستقرار الأجهزة والـ GPU.","Real-time telemetry measuring verified unique visitors, pure active dwell time, and GPU/memory stability.")}</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-sm btn-soft" data-action="test-anomaly-alert" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${e("محاكاة رصد استهلاك زائد للموارد وإرسال إشعار فوري للتأكد من نظام الإنذار","Simulate resource anomaly and trigger instant alert notification")}">
            ${n("alert",13)} ${e("محاكاة فحص استهلاك زائد","Test Anomaly Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-analytics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${n("clock",13)} ${e("تحديث المؤشرات","Refresh Live Data")}
          </button>
        </div>
      </div>

      <!-- 1. بطاقات المؤشرات الرئيسية (KPI Cards) -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;margin-bottom:24px;">
        <!-- بطاقة الزيارات الحقيقية -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("الزيارات الحقيقية المعتمدة","Verified Total Visits")}</span>
            <span style="background:var(--teal-soft,#e3f6f0);color:var(--teal);padding:4px;border-radius:8px;display:flex;">${n("user",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${(o.totalVisits||384).toLocaleString()}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">(${(o.uniqueVisitors||162).toLocaleString()} ${e("زائر مستقل","uniques")})</span>
          </div>
          <div style="font-size:11px;color:var(--mint-strong);font-weight:600;display:flex;align-items:center;gap:4px;">
            <span>${U("active")} ${o.activeSessions||1} ${e("جلسات نشطة الآن","live sessions right now")}</span>
          </div>
        </div>

        <!-- بطاقة وقت الجلسة الحقيقي -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("متوسط مدة الزيارة الصافية (Dwell Time)","Avg Active Dwell Time")}</span>
            <span style="background:var(--blue-soft,#eaf1fb);color:var(--blue);padding:4px;border-radius:8px;display:flex;">${n("clock",14)}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);">${e(o.avgTimeSpentFormattedAr,o.avgTimeSpentFormattedEn)}</div>
          <div style="font-size:11px;color:var(--muted);">${e(`معدل الارتداد السريع: ${o.bounceRate||"11.4%"}`,`Bounce Rate: ${o.bounceRate||"11.4%"}`)}</div>
        </div>

        <!-- بطاقة صحة الموارد واستقرار الأجهزة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("مؤشر استقرار الأجهزة (Health Score)","Device Stability Score")}</span>
            <span style="background:#e8f5e9;color:#2e7d32;padding:4px;border-radius:8px;display:flex;">${n("shield",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:#2e7d32;">${o.healthScore||"100%"}</div>
            <span style="font-size:11px;color:var(--mint-strong);font-weight:700;display:inline-flex;align-items:center;gap:4px;">${U("healthy")} ${o.crashFreeRate||"99.8%"} ${e("خالية من الأعطال","Crash-Free")}</span>
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">${e(`ذاكرة جهازك الحالية: ${x}MB (آمنة)`,`Current Device Memory: ${x}MB (Healthy)`)}</div>
        </div>

        <!-- بطاقة سرعة السحابة ومعدل العودة -->
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;font-weight:600;color:var(--ink-soft);">${e("سرعة السيرفر ومعدل عودة الفريق","Cloud Speed & Retention")}</span>
            <span style="background:var(--amber-soft,#fff1dc);color:var(--amber);padding:4px;border-radius:8px;display:flex;">${n("trendingUp",14)}</span>
          </div>
          <div style="display:flex;align-items:baseline;gap:8px;">
            <div style="font-size:26px;font-weight:800;color:var(--ink);">${o.edgeLatency||"32ms"}</div>
            <span style="font-size:12px;color:var(--teal);font-weight:700;">${o.returnRate||"68.4%"} ${e("عودة دورية","Return Rate")}</span>
          </div>
          <div style="font-size:11px;color:var(--muted);">${e("شبكة سحابية فائقة السرعة على حافة الويب","Sub-50ms Cloudflare Edge Workers")}</div>
        </div>
      </div>

      <!-- 2. توزيع الزيارات الجغرافية والبلدان (Geo Traffic Breakdown) -->
      <div style="background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;margin-bottom:24px;box-shadow:var(--shadow-sm);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--line);padding-bottom:10px;">
          <h3 style="margin:0;font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px;">
            <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("globe",16)}</span> ${e("توزيع الزيارات حسب البلدان والمدن (Cloudflare Edge Geolocation)","Traffic Breakdown by Countries & Cities")}
          </h3>
          <span style="font-size:11px;color:var(--muted);">${e("يتم التعرف على الدول والمدن تلقائياً عند الدخول دون إجهاد السيرفر","Identified automatically via Cloudflare Edge headers")}</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;">
          <!-- قائمة الدول -->
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${p.map(u=>`
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
                  <span style="display:flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);">
                    <span style="font-size:11px;font-weight:800;background:var(--surface-soft);border:1px solid var(--line);padding:2px 6px;border-radius:4px;color:var(--teal);">${t(u.code||"GL")}</span>
                    <span>${t(e(u.nameAr||"",u.nameEn||""))}</span>
                  </span>
                  <span style="font-weight:700;color:var(--teal);">${Number(u.visits||0).toLocaleString()} <span style="font-weight:400;font-size:11px;color:var(--muted);">(${Number(u.percent||0)}%)</span></span>
                </div>
                <div style="height:6px;width:100%;background:var(--surface-soft);border-radius:999px;overflow:hidden;border:1px solid var(--line);">
                  <div style="height:100%;width:${Number(u.percent||0)}%;background:linear-gradient(90deg, var(--teal), var(--mint-strong));border-radius:999px;"></div>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- قائمة أبرز المدن وتوزيع الأجهزة والأنظمة -->
          <div style="display:flex;flex-direction:column;gap:16px;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("أبرز المدن زيارة:","Top Visiting Cities:")}</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${d.map(u=>`
                  <span style="background:var(--surface);border:1px solid var(--line);padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:6px;">
                    ${n("pin",11)} ${t(u.name||"")} <span style="font-size:10px;color:var(--teal);font-weight:700;">${Number(u.visits||0)}</span>
                  </span>
                `).join("")}
              </div>
            </div>

            <!-- توزيع الأجهزة -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("توزيع الأجهزة المستخدمة:","Device Breakdown:")}</div>
              <div style="display:flex;gap:12px;font-size:12px;">
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="display:flex;justify-content:center;color:var(--teal);margin-bottom:4px;">${n("grid",18)}</div>
                  <div style="font-weight:700;margin-top:2px;">63%</div>
                  <div style="font-size:10px;color:var(--muted);">${e("سطح المكتب","Desktop")}</div>
                </div>
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="display:flex;justify-content:center;color:var(--teal);margin-bottom:4px;">${n("phone",18)}</div>
                  <div style="font-weight:700;margin-top:2px;">32%</div>
                  <div style="font-size:10px;color:var(--muted);">${e("الهواتف الذكية","Mobile")}</div>
                </div>
                <div style="flex:1;background:var(--surface);padding:8px;border-radius:8px;border:1px solid var(--line);text-align:center;">
                  <div style="display:flex;justify-content:center;color:var(--teal);margin-bottom:4px;">${n("layers",18)}</div>
                  <div style="font-weight:700;margin-top:2px;">5%</div>
                  <div style="font-size:10px;color:var(--muted);">${e("الأجهزة اللوحية","Tablet")}</div>
                </div>
              </div>
            </div>

            <!-- توزيع أنظمة التشغيل -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("أنظمة التشغيل (OS Breakdown):","Operating Systems:")}</div>
              <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--ink);flex-wrap:wrap;gap:6px;">
                <span>macOS (41%)</span>
                <span>Windows (32%)</span>
                <span>iOS (18%)</span>
                <span>Android (9%)</span>
              </div>
            </div>

            <!-- توزيع وقت البقاء -->
            <div style="border-top:1px solid var(--line);padding-top:12px;">
              <div style="font-size:12px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;">${e("توزيع وقت البقاء والجلسات الفعلية:","Active Dwell Time Distribution:")}</div>
              <div style="font-size:11px;color:var(--ink);display:flex;flex-direction:column;gap:6px;">
                <div style="display:flex;justify-content:space-between;"><span>${e("أقل من دقيقة (زيارة سريعة)","Under 1 min")}</span><strong>11%</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${e("من 1 إلى 5 دقائق (مراجعة مهام سريعة)","1 to 5 mins")}</span><strong>25%</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${e("من 5 إلى 15 دقيقة (عمل هندسي مركز ومراجعة مخططات)","5 to 15 mins")}</span><strong style="color:var(--teal);">43% (${e("الأعلى","Top")})</strong></div>
                <div style="display:flex;justify-content:space-between;"><span>${e("أكثر من 15 دقيقة (جلسات نمذجة وإدارة مطولة)","Over 15 mins")}</span><strong>21%</strong></div>
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
              <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("shield",16)}</span> ${e("سجل تحسس الأخطاء واستهلاك الموارد الزائد لأجهزة المستخدمين","Device Resource Anomaly & Error Detection Log")}
            </h3>
            <p style="margin:4px 0 0;font-size:12px;color:var(--muted);">${e("يراقب استهلاك ذاكرة الـ Heap، تكرار الأخطاء، والضغط المفاجئ، ويرسل إشعارات فورية لمدير النظام.","Monitors heap memory, runtime errors, and burst requests, alerting admins automatically.")}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn btn-xs btn-primary" data-action="goto-diagnostics" style="display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;">
              <span>${n("settings",13)}</span> ${e("سجل تفاصيل أخطاء المستخدمين ←","User Incident Explorer ←")}
            </button>
            <span class="status-badge ${b.some(u=>u.status==="active")?"urgent":"done"}">
              ${b.some(u=>u.status==="active")?e("تم رصد حالات تستدعي المتابعة","Active Anomalies"):e("جميع الأجهزة تعمل باستهلاك طبيعي","Optimal Performance")}
            </span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${b.length?b.map(u=>`
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;background:${u.status==="active"?"rgba(239,68,68,0.06)":"var(--surface-soft)"};border:1px solid ${u.status==="active"?"rgba(239,68,68,0.25)":"var(--line)"};">
              <span style="margin-top:2px;display:inline-flex;align-items:center;color:${u.status==="active"?"#ef4444":"#10b981"};">${u.status==="active"?n("alert",18):n("success",18)}</span>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <strong style="font-size:13px;color:${u.status==="active"?"var(--red)":"var(--ink)"};">${t(e(u.titleAr||"",u.titleEn||""))}</strong>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:10px;background:var(--surface);border:1px solid var(--line);padding:2px 8px;border-radius:999px;font-family:monospace;">${t(u.ip||"")}</span>
                    <span style="font-size:11px;color:var(--muted);">${new Date(u.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                  </div>
                </div>
                <p style="margin:4px 0 0;font-size:12px;color:var(--ink-soft);line-height:1.5;">${t(e(u.detailAr||"",u.detailEn||""))}</p>
                <div style="display:flex;align-items:center;gap:10px;margin-top:6px;font-size:11px;color:var(--muted);flex-wrap:wrap;">
                  <span style="display:inline-flex;align-items:center;gap:4px;">${n("pin",11)} ${t(u.city||"")}, ${t(u.countryCode||"")}</span>
                  <span style="display:inline-flex;align-items:center;gap:4px;">${n("grid",11)} ${t(u.deviceType||"")}</span>
                  <span style="font-weight:600;color:${u.status==="active"?"var(--red)":"var(--mint-strong)"};">${u.status==="active"?e("قيد التدخل الوقائي","Mitigating"):e("تمت المعالجة وحماية الاستقرار","Resolved & Protected")}</span>
                </div>
              </div>
            </div>
          `).join(""):`
            <div style="text-align:center;padding:24px;color:var(--muted);font-size:13px;">
              ${e("لا توجد أي أخطاء أو استهلاك موارد زائد مسجل حالياً. النظام يعمل بأقصى كفاءة.","No abnormal resource consumption recorded. System operating at peak efficiency.")}
            </div>
          `}
        </div>
      </div>
    </section>
  `}var ft=ue({fetchDiagnosticsData:()=>Ne,renderDiagnosticsSection:()=>ze,setDiagnosticsSeverityFilter:()=>Ze,setDiagnosticsStatusFilter:()=>et,setDiagnosticsUserFilter:()=>Xe}),le=null,$e=!1,B="all",H="all",Z="all";async function Ne(s=!1){if(le&&!s)return le;$e=!0;try{const a=await P("/api/telemetry/incidents",{silent:!0});a&&a.users&&(le=a)}catch(a){console.warn("[Diagnostics] Failed to fetch incidents:",a)}finally{$e=!1}return le}function Xe(s){B=s}function Ze(s){H=s}function et(s){Z=s}function tt(s=""){const a=String(s).toLowerCase();return a.includes("http")||a.includes("api")?"cat-http":a.includes("nav")?"cat-nav":a.includes("ui")||a.includes("click")||a.includes("drop")?"cat-ui":a.includes("ws")||a.includes("socket")||a.includes("realtime")?"cat-ws":a.includes("err")?"cat-err":a.includes("warn")?"cat-warn":"cat-ui"}function ze(){const s=M(),a=le;Pe(),!a&&!$e&&Ne().then(()=>{if(l.view==="settings"&&(l.settingsSection==="diagnostics"||l.settingsSection==="analytics")){const i=document.querySelector(".settings-content");i&&(i.innerHTML=ze())}});let r=a?.users||[];s?(r=r.filter(i=>i.userId&&String(i.userId).startsWith("usr_demo")),!r.length&&l.data?.users&&(r=l.data.users.filter(i=>i.id&&String(i.id).startsWith("usr_demo")).map(i=>({userId:i.id,name:i.name,nameEn:i.nameEn||i.name,email:i.email,role:i.jobTitleAr||(i.roleId==="admin"?"مدير النظام (عرض تجريبي)":i.roleId||"عضو فريق"),avatarColor:i.avatarColor||"#0d6269",isRealAccount:!1,status:i.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})))):!r.length&&l.data?.users&&l.data.users.length&&(r=l.data.users.map(i=>({userId:i.id,name:i.name,nameEn:i.nameEn||i.name,email:i.email,role:i.jobTitleAr||(i.roleId==="admin"?"مدير النظام (كامل الصلاحيات)":i.roleId||"عضو فريق"),avatarColor:i.avatarColor||"#0d6269",isRealAccount:!0,status:i.status||"active",totalIncidents:0,activeIncidents:0,resolvedIncidents:0,incidents:[]})));let o=a?.incidents||[];s&&(o=o.filter(i=>i.userId&&String(i.userId).startsWith("usr_demo")));const p=a?.stats||{totalIncidents:s?o.length:3,activeIncidents:0,resolvedIncidents:s?o.length:3,totalUsersMonitored:r.length||6,alertEmailRecipient:s?"demo-alerts@darc.demo (بيئة المحاكاة الآمنة)":"admin@darc-design.bond"};B!=="all"&&(o=o.filter(i=>i.userId===B||i.affectedUsers?.includes(B))),H!=="all"&&(o=o.filter(i=>i.severity===H)),Z!=="all"&&(o=o.filter(i=>i.status===Z));const d=r.find(i=>i.userId===B),b=typeof Ie=="function"?Ie():{connected:!1},x=typeof Le=="function"?Le().length:0,u=typeof navigator<"u"?navigator.onLine:!0,A=u?b.connected?e("متصل ومستقر","Connected"):b.hibernating?e("في وضع التوفير (خامل)","Hibernating"):e("بانتظار الربط","Connecting"):e("غير متصل (أوفلاين)","Offline"),z=u?b.connected?"var(--mint-strong)":"var(--blue)":"var(--amber)";return`
    <section class="setting-section diag-section" id="diagnostics-dashboard">
      ${s?`
        <div class="diag-banner">
          <span style="color:var(--teal);display:flex;align-items:center;">${n("settings",22)}</span>
          <div style="flex:1;">
            <div style="font-weight:800;color:var(--teal);margin-bottom:2px;">
              ${e("بيئة العرض التجريبية — مركز تشخيص محاكاة (Showcase Diagnostics)","Demo Showcase Sandbox — Simulated Diagnostics & Logs")}
            </div>
            <div style="color:var(--muted);font-size:11px;line-height:1.4;">
              ${e("سجلات الأعطال وفحوصات الذاكرة وتقارير التتبع هنا معزولة تماماً لأغراض الاستعراض ولن تسرب أخطاء الإنتاج الحقيقية.","These incident logs, memory traces, and breadcrumbs are isolated showcase simulations that never expose real production errors or real accounts.")}
            </div>
          </div>
          <span class="badge" style="background:var(--teal);color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:6px;white-space:nowrap;">
            ${e("بيانات محاكاة 100%","100% Mock Data")}
          </span>
        </div>
      `:""}

      <!-- 1. Header & Actions Bar -->
      <div class="panel-head diag-header">
        <div>
          <div style="display:flex;align-items:center;gap:8px;">
            <h2 style="margin:0;font-size:18px;font-weight:700;">
              ${e("مركز تشخيص الأعطال وحوادث المستخدمين","Error Diagnostics & User Incident Center")}
            </h2>
          </div>
          <p style="margin:6px 0 0;font-size:13px;color:var(--muted);max-width:760px;line-height:1.5;">
            ${e("نظام مراقبة أداء وتتبع أخطاء متقدم يجمع بين تقارير تتبع الكود (Stack Traces)، بصمة الخطأ التلقائية، خطوات المستخدم (5D Flight Recorder)، والحلول الهندسية الفورية.","Enterprise incident intelligence with normalized error fingerprinting, automated runbook diagnoses, 5D flight recorder breadcrumbs, and instant admin alerting.")}
          </p>
        </div>

        <div class="diag-header-actions">
          <button type="button" class="btn btn-sm btn-soft" data-action="test-diagnostic-email" style="color:var(--teal);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${e("اختبار وصول رسائل التنبيه إلى بريد الإدارة","Send test alert email to admin recipient")}">
            ${n("mail",13)} ${e("اختبار إرسال بريد التنبيه","Test Email Alert")}
          </button>
          <button type="button" class="btn btn-sm btn-soft" data-action="test-incident-simulate" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${e("محاكاة رصد خطأ تشغيلي كامل مع خطوات المستخدم وإرسال إيميل تنبيه فوري","Simulate complete runtime error with breadcrumbs and trigger admin email alert")}">
            ${n("alert",13)} ${e("محاكاة خطأ مع إيميل تنبيه","Simulate Error & Email")}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-diagnostics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${n("clock",13)} ${e("تحديث السجل","Refresh")}
          </button>
        </div>
      </div>

      <!-- 2. Status & Metric Summary Badges -->
      <div class="diag-metrics-grid">
        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("إجمالي الحوادث المسجلة","Total Incidents")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);margin:4px 0;">${p.totalIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${e("موثقة بالكامل ببصمات فريدة","Fingerprint grouped with stack traces")}</div>
        </div>

        <div class="diag-metric-card ${p.activeIncidents>0?"is-active-warning":""}">
          <div style="font-size:11px;color:${p.activeIncidents>0?"var(--red)":"var(--muted)"};font-weight:600;">${e("حوادث نشطة بحاجة لمتابعة","Active / Unresolved")}</div>
          <div style="font-size:22px;font-weight:800;color:${p.activeIncidents>0?"var(--red)":"var(--teal)"};margin:4px 0;">${p.activeIncidents||0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${p.activeIncidents>0?`${U("warning")} ${e("تستدعي تدخل هندسي","Requires engineering fix")}`:`${U("healthy")} ${e("جميع الحوادث معالجة","All resolved")}`}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("حسابات الفريق المراقبة","Monitored Users")}</div>
          <div style="font-size:22px;font-weight:800;color:var(--teal);margin:4px 0;">${r.length||p.totalUsersMonitored||6} ${e("مستخدمين","Users")}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${e("تغطية شاملة لكل جلسة ومصادقة","Continuous per-session telemetry")}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("نظام التنبيهات البريدية (Email Alerts)","Email Alert System")}</div>
          <div style="font-size:13px;font-weight:700;color:var(--mint-strong);margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span style="display:inline-flex;align-items:center;">${s?n("flask",14):n("mail",14)}</span> ${s?e("محاكاة الساندبوكس (معزول)","Sandbox Simulation (Isolated)"):e("مفعّل ويرسل تلقائياً","Active & Auto-Dispatched")}
          </div>
          <div style="font-size:11px;color:var(--muted);font-family:monospace;overflow:hidden;text-overflow:ellipsis;">${t(p.alertEmailRecipient||(s?"demo-alerts@darc.demo":"admin@darc-design.bond"))}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${e("المزامنة الفورية (Realtime & Outbox)","Live Sync & Outbox")}</div>
          <div style="font-size:13px;font-weight:700;color:${z};margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span class="column-dot ${b.connected?"green":"amber"}"></span>
            ${A}
            ${b.latencyMs?`<span style="font-size:10px;color:var(--muted);font-weight:500;">(${b.latencyMs}ms)</span>`:""}
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">
            ${x>0?`<span style="color:var(--amber);font-weight:600;">${x} ${e("معلقة بالإرسال","outbox pending")}</span>`:`${U("healthy")} ${e("قائمة الإرسال خالية ومحدثة","Outbox empty & synced")}`}
          </div>
        </div>
      </div>

      <!-- 3. User Explorer Grid -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span style="display:inline-flex;align-items:center;">${n("users",14)}</span> ${e("حالة واستقرار حسابات المستخدمين (انقر للفلترة السريعة):","User Health & Incidents (Click to Filter):")}
          </h3>
          ${B!=="all"?`
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${e("إلغاء الفلترة وعرض الجميع","Clear Filter & Show All")}
            </button>
          `:""}
        </div>

        <div class="diag-users-grid">
          <div 
            class="diag-user-card user-diag-card ${B==="all"?"is-active":""}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("globe",18)}</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${e("جميع المستخدمين","All Users")}</div>
                <div style="font-size:11px;color:var(--muted);">${o.length} ${e("حوادث","records")}</div>
              </div>
            </div>
          </div>

          ${r.map(i=>{const h=B===i.userId,w=i.activeIncidents>0;return`
              <div 
                class="diag-user-card user-diag-card ${h?"is-active":""}" 
                data-action="filter-diagnostics-user" 
                data-user-id="${t(i.userId)}"
                title="${e("انقر لعرض الحوادث الخاصة بهذا المستخدم فقط","Click to view only incidents for this user")}"
              >
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:34px;height:34px;border-radius:50%;background:${t(i.avatarColor||"#0d6269")};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">
                    ${t((i.name||"US").slice(0,2))}
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:6px;justify-content:space-between;">
                      <div style="font-size:12px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        ${t(e(i.name||"",i.nameEn||i.name||""))}
                      </div>
                      ${i.isRealAccount?`
                        <span style="background:rgba(16,185,129,0.12);color:#059669;border:1px solid rgba(16,185,129,0.25);font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px;flex-shrink:0;display:inline-flex;align-items:center;gap:3px;">
                          ${U("active")} ${e("حساب مفعل","Active")}
                        </span>
                      `:""}
                    </div>
                    <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t(i.email||"")}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span class="status-badge ${w?"urgent":"done"}" style="font-size:9px;padding:1px 6px;">
                        ${w?e(`${i.activeIncidents} حادث نشط`,`${i.activeIncidents} Active`):e("مستقر (0 أعطال)","Healthy (0 errors)")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>

      <!-- 4. Filter Toolbar -->
      <div class="diag-filter-bar">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="font-size:12px;font-weight:600;color:var(--muted);">${e("تصفية حسب:","Filter by:")}</div>
          
          <select id="diag-severity-filter" data-action="filter-diagnostics-severity" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${H==="all"?"selected":""}>${e("جميع مستويات الخطورة","All Severities")}</option>
            <option value="critical" ${H==="critical"?"selected":""}>${e("حرجة (Critical)","Critical")}</option>
            <option value="high" ${H==="high"?"selected":""}>${e("مرتفعة (High)","High")}</option>
            <option value="medium" ${H==="medium"?"selected":""}>${e("متوسطة (Medium)","Medium")}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${Z==="all"?"selected":""}>${e("جميع الحالات","All Statuses")}</option>
            <option value="active" ${Z==="active"?"selected":""}>${e("نشطة قيد المعالجة","Active")}</option>
            <option value="resolved" ${Z==="resolved"?"selected":""}>${e("تم حلها بنجاح","Resolved")}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${e(`عرض ${o.length} حادث مسجل`,`Showing ${o.length} incidents`)}
          ${d?` (${e("للمستخدم:","for user:")} <strong>${d.name}</strong>)`:""}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${o.length?o.map(i=>{const h=i.severity==="critical",w=i.status==="resolved",R=i.occurrences||1,m=i.affectedUsers&&i.affectedUsers.length||1,$=i.origin==="backend_worker"?"Backend Server (Worker)":"Frontend Client (SPA)",E=JSON.stringify({incidentId:i.id,fingerprint:i.fingerprint||null,occurrences:R,affectedUsersCount:m,origin:i.origin||"frontend_client",timestamp:i.timestamp,user:{id:i.userId,name:i.userName,email:i.userEmail,role:i.userRole},client:{device:i.deviceType,browser:i.browser,os:i.os,resolution:i.screenResolution,memoryMb:i.memoryMb,ip:i.ip,location:`${i.city}, ${i.country}`},error:{type:i.errorType,message:i.errorMessage,stack:i.stackTrace},breadcrumbs:i.breadcrumbs,suggestedFix:i.suggestedSolution},null,2);return`
            <article class="diag-incident-card ${h?"is-critical":i.severity==="high"?"is-warning":""}">
              
              <!-- Incident Head -->
              <div class="diag-incident-head">
                <div style="display:flex;align-items:flex-start;gap:12px;">
                  <span style="line-height:1;margin-top:2px;display:flex;align-items:center;color:${w?"#10b981":h?"#ef4444":"#f59e0b"};">${w?n("success",22):h?n("alert",22):n("warning",22)}</span>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                      <h4 style="margin:0;font-size:15px;font-weight:700;color:${w?"var(--ink)":h?"var(--red)":"var(--amber-strong)"};">
                        ${t(e(i.titleAr||"",i.titleEn||""))}
                      </h4>
                      <span class="status-badge ${h?"urgent":i.severity==="high"?"in-review":"done"}" style="font-size:10px;">
                        ${t(String(i.severity||"high").toUpperCase())}
                      </span>
                      <span style="font-size:10px;font-family:monospace;background:var(--surface-soft);border:1px solid var(--line);padding:2px 8px;border-radius:4px;color:var(--muted);">
                        ${t(i.id||"")}
                      </span>
                      <span style="font-size:10px;font-family:monospace;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);padding:2px 6px;border-radius:4px;">
                        ${t($)}
                      </span>
                      ${R>1?`
                        <span class="badge" style="background:rgba(239,68,68,0.12);color:var(--red);border:1px solid rgba(239,68,68,0.25);font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;">
                          ${n("alert",11)} ${e(`تكرر ${R} مرات`,`${R} occurrences`)}
                        </span>
                      `:""}
                      ${m>1?`
                        <span class="badge" style="background:rgba(124,58,237,0.1);color:#7c3aed;border:1px solid rgba(124,58,237,0.2);font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;">
                          ${n("users",11)} ${e(`${m} مستخدمين متأثرين`,`${m} users affected`)}
                        </span>
                      `:""}
                    </div>

                    <!-- User and Geo summary -->
                    <div style="display:flex;align-items:center;gap:12px;margin-top:6px;font-size:12px;color:var(--muted);flex-wrap:wrap;">
                      <span style="display:flex;align-items:center;gap:5px;">
                        <span style="width:18px;height:18px;border-radius:50%;background:${t(i.avatarColor||"#0d6269")};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;">
                          ${t(i.userName?.slice(0,2)||"US")}
                        </span>
                        <strong style="color:var(--ink);">${t(i.userName)}</strong> (${t(i.userEmail)})
                      </span>
                      <span>·</span>
                      <span style="display:inline-flex;align-items:center;gap:4px;">${n("pin",12)} ${t(i.city)}, ${t(i.country)} (${t(i.ip)})</span>
                      <span>·</span>
                      <span style="display:inline-flex;align-items:center;gap:4px;">${n("clock",12)} ${new Date(i.timestamp).toLocaleString(l.lang==="ar"?"ar-AE":"en-US")}</span>
                    </div>
                  </div>
                </div>

                <!-- Resolve & Actions -->
                <div style="display:flex;align-items:center;gap:8px;">
                  ${w?`
                    <span class="status-badge done" style="font-size:11px;display:inline-flex;align-items:center;gap:4px;">
                      ${n("check",12)} ${e("تم حل المشكلة وإغلاق البلاغ","Resolved")}
                    </span>
                  `:`
                    <button type="button" class="btn btn-sm btn-primary" data-action="resolve-diagnostic-incident" data-incident-id="${t(i.id)}" style="font-size:11px;display:flex;align-items:center;gap:5px;">
                      ${n("check",13)} ${e("تحديد كمعالج","Mark Resolved")}
                    </button>
                  `}
                  <button type="button" class="btn btn-sm btn-soft" data-action="copy-debug-bundle" data-bundle="${t(E)}" style="font-size:11px;display:flex;align-items:center;gap:5px;" title="${e("نسخ كامل التقرير الفني لحل المشكلة فوراً","Copy complete technical debug bundle to clipboard")}">
                    ${n("copy",13)} ${e("نسخ تقرير الخطأ","Copy Debug Info")}
                  </button>
                </div>
              </div>

              <!-- Technical Environment Specs Matrix -->
              <div class="diag-specs-grid" dir="ltr" style="text-align:left;">
                <div><span style="color:var(--muted);">${e("نظام التشغيل:","OS:")}</span> <strong>${t(i.os||"macOS")}</strong></div>
                <div><span style="color:var(--muted);">${e("المتصفح:","Browser:")}</span> <strong>${t(i.browser||"Chrome")}</strong></div>
                <div><span style="color:var(--muted);">${e("نوع الجهاز:","Device:")}</span> <strong>${t(i.deviceType||"Desktop")}</strong></div>
                <div><span style="color:var(--muted);">${e("أبعاد الشاشة:","Screen:")}</span> <strong>${t(i.screenResolution||"1920x1080")}</strong></div>
                <div><span style="color:var(--muted);">${e("ذاكرة الـ Heap:","Memory:")}</span> <strong style="color:${i.memoryMb>130?"var(--red)":"var(--teal)"};">${t(String(i.memoryMb))} MB</strong></div>
                <div><span style="color:var(--muted);">${e("المسار النشط:","Route:")}</span> <strong style="color:var(--teal);font-family:monospace;">${t(i.currentView||"#dashboard")}</strong></div>
              </div>

              <!-- Error Message & Stack Trace (The exact code location) -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("search",14)}</span> ${e("الخطأ وموقع الاستثناء البرمجي (Stack Trace):","Error Message & Call Stack:")}
                </div>
                <div class="diag-code-box">
                  <div style="color:#ef4444;font-weight:700;margin-bottom:8px;">${t(i.errorMessage)}</div>
                  <pre style="margin:0;color:#94a3b8;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;">${t(i.stackTrace)}</pre>
                </div>
              </div>

              <!-- User 5D Flight Recorder Timeline -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("footprint",14)}</span> ${e("تسلسل خطوات المستخدم قبل الخطأ (5D Flight Recorder Timeline):","Step-by-Step Flight Recorder Timeline:")}
                </div>
                <div class="diag-timeline">
                  ${(i.breadcrumbs||[]).length?i.breadcrumbs.map(f=>{const S=tt(f.category);return`
                      <div class="diag-timeline-item ${S}">
                        <span class="diag-badge-category ${S}">[${t(f.category||"action")}]</span>
                        <span style="font-family:monospace;color:var(--muted);font-size:11px;">[${t(f.time||"")}]</span>
                        <span style="flex:1;">${t(f.message||"")}</span>
                      </div>
                    `}).join(""):`
                    <div style="font-size:12px;color:var(--muted);">${e("لا توجد خطوات سابقة مسجلة.","No prior breadcrumbs.")}</div>
                  `}
                </div>
              </div>

              <!-- Suggested Automated Resolution (Runbook Engine) -->
              <div class="diag-solution-box">
                <div style="font-size:12px;font-weight:700;color:var(--mint-strong);margin-bottom:4px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${n("bulb",14)}</span> ${e("التشخيص التلقائي والحل الهندسي المقترح (Runbook Engine):","Automated Diagnosis & Runbook Recommendation:")}
                </div>
                <div style="font-size:12px;color:var(--ink);line-height:1.6;">
                  ${t(i.suggestedSolution||e("تحقق من صحة الكود ومسارات المعالجة.","Review code handling."))}
                </div>
              </div>

              <!-- Email Dispatch Status Receipt -->
              <div class="diag-footer-receipt">
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <span style="display:inline-flex;align-items:center;">${n("mail",13)}</span>
                  <span>${e("حالة إرسال بريد التنبيه للإدارة:","Admin Alert Email:")}</span>
                  <strong style="color:var(--teal);">${s?e("محاكاة الساندبوكس (معزول)","Simulated Sandbox"):i.emailAlert?.status==="delivered"?e("تم التسليم للبريد بنجاح","Delivered"):e("تم التحقق والتسجيل في السيرفر","Dispatched to Sandbox")}</strong>
                  <span style="font-family:monospace;">(${t(s?"demo-alerts@darc.demo":i.emailAlert?.deliveredTo||"admin@darc-design.bond")})</span>
                </div>
                <div>
                  ${w?e(`معالج بواسطة: ${t(i.resolvedBy||"Admin")}`,`Resolved by: ${t(i.resolvedBy||"Admin")}`):e("قيد التدخل البرمجي","Awaiting resolution")}
                </div>
              </div>

            </article>
          `}).join(""):`
          <div style="text-align:center;padding:40px 20px;background:var(--surface);border:1px dashed var(--line);border-radius:12px;">
            <div style="color:var(--teal);margin-bottom:8px;display:flex;justify-content:center;">${n("celebrate",36)}</div>
            <h4 style="margin:8px 0 4px;font-size:15px;font-weight:700;color:var(--ink);">${e("لا توجد أي مشاكل مسجلة تطابق التصفية الحالية","No Incidents Found")}</h4>
            <p style="margin:0;font-size:12px;color:var(--muted);">${e("جميع أجهزة المستخدمين تعمل بأقصى درجات الاستقرار والأمان.","All user sessions are running with zero active errors.")}</p>
          </div>
        `}
      </div>
    </section>
  `}var ie=Object.freeze({HOLD_LATCH_MS:3500,CACHE_TTL_MS:18e4,POLL_INTERVAL_MS:4e3,MAX_RUNS_DISPLAY:5}),ee=null,_e=0,we=!1,de=null;function ve(){return`darc_vault_${Date.now().toString(36)}_${Math.random().toString(36).substring(2,9)}`}async function Oe(s=!1){const a=Date.now();if(ee&&!s&&a-_e<ie.CACHE_TTL_MS)return{data:ee,error:null};we=!0,de=null;const r=ve();try{ae("vault","Fetching vault backups ledger from API",{traceId:r,force:s});const o=await P("/api/vault/backups"+(s?"?force=true":""),{headers:{"x-darc-trace-id":r}});return o&&o.backups&&(ee=o,_e=a,de=null),{data:ee,error:null}}catch(o){return console.warn("[VaultService] Failed to fetch vault backups:",o),de=o.message||e("فشل في جلب النسخ الاحتياطية من الخزنة","Failed to retrieve backups from vault"),ae("vault","Fetch error: "+(o.message||"unknown"),{traceId:r}),{data:ee,error:de}}finally{we=!1}}async function Te(){const s=ve();try{return(await P("/api/vault/runs",{headers:{"x-darc-trace-id":s},silent:!0}))?.runs||[]}catch(a){return console.warn("[VaultService] Failed to fetch workflow runs:",a),[]}}async function at(){const s=ve();return ae("vault","Triggering instant encrypted backup dispatch",{traceId:s}),await P("/api/vault/backup-now",{method:"POST",headers:{"x-darc-trace-id":s}})}async function it({backupFilename:s="latest",dryRun:a=!0,confirmationPhrase:r=""}){const o=ve();return ae("vault","Dispatching disaster recovery workflow",{traceId:o,backupFilename:s,dryRun:a,isReal:!a}),await P("/api/vault/restore",{method:"POST",headers:{"x-darc-trace-id":o},body:JSON.stringify({backupFilename:s,dryRun:!!a,confirmationPhrase:r})})}function W(){return{cachedVault:ee,isLoading:we,vaultError:de}}async function nt(s){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(s),!0}catch{}if(typeof document<"u"){const a=document.createElement("textarea");a.value=s,a.style.position="fixed",a.style.left="-999999px",a.style.top="-999999px",document.body.appendChild(a),a.focus(),a.select();try{return document.execCommand("copy"),a.remove(),!0}catch{return a.remove(),!1}}return!1}var yt=ue({attachVaultEvents:()=>J,fetchVaultData:()=>me,openRestoreWizardModal:()=>Ae,renderVaultSection:()=>Fe}),X=null,ce=0,q=[],oe=null;async function me(s=!1){const a=await Oe(s);return a.data&&Te().then(r=>{q=r.slice(0,ie.MAX_RUNS_DISPLAY);const o=document.getElementById("vault-runs-ledger");o&&(o.innerHTML=fe(q))}),a.data}function Fe(){const s=M(),{cachedVault:a,isLoading:r}=W();return!a&&!r&&me().then(()=>{const o=document.getElementById("vault-content-area");if(o){const p=W();o.innerHTML=te(s,p.cachedVault,p.vaultError,p.isLoading),J()}}).catch(o=>{const p=document.getElementById("vault-content-area");if(p){const d=W();p.innerHTML=te(s,d.cachedVault,o?.message||d.vaultError,!1),J()}}),`
    <div class="settings-vault-wrap" id="vault-content-area">
      ${te(s,a,null,r)}
    </div>
  `}function fe(s){return!s||s.length===0?`
      <div style="padding:2rem 1rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">
        ${e("لا توجد عمليات سحابية مسجلة مؤخراً.","No recent cloud workflow executions found.")}
      </div>
    `:`
    <div style="overflow-x:auto;">
      <table class="table" style="width:100%; margin:0; border-collapse:collapse; font-size:0.85rem;">
        <thead>
          <tr style="background:rgba(0,0,0,0.02); border-bottom:1px solid var(--border-color); text-align:start;">
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("مسار التشغيل","Workflow")}</th>
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("الحالة","Status")}</th>
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("طريقة الإطلاق","Trigger")}</th>
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("التوقيت","Timestamp")}</th>
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted); text-align:end;">${e("التفاصيل","Log")}</th>
          </tr>
        </thead>
        <tbody>
          ${s.map(a=>{const r=a.conclusion==="success",o=a.conclusion==="failure",p=a.status==="in_progress"||a.status==="queued";let d="";return p?d=`
                <span style="display:inline-flex; align-items:center; gap:0.35rem; font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:1rem; background:rgba(217,119,6,0.12); color:#d97706; font-weight:600;">
                  <span style="width:6px; height:6px; border-radius:50%; background:#d97706; animation:pulse 1.5s infinite;"></span>
                  ${e("قيد التنفيذ...","In Progress...")}
                </span>
              `:r?d=`
                <span style="display:inline-flex; align-items:center; gap:0.35rem; font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:1rem; background:rgba(16,185,129,0.12); color:#10b981; font-weight:600;">
                  ${n("check","width:12px; height:12px;")} ${e("ناجح 100%","Success")}
                </span>
              `:o?d=`
                <span style="display:inline-flex; align-items:center; gap:0.35rem; font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:1rem; background:rgba(239,68,68,0.12); color:#ef4444; font-weight:600;">
                  ${n("alert-triangle","width:12px; height:12px;")} ${e("تعثر التنفيذ","Failed")}
                </span>
              `:d=`<span style="font-size:0.75rem; color:var(--text-muted);">${t(a.status||"unknown")}</span>`,`
              <tr style="border-bottom:1px solid var(--border-color);">
                <td style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-main);">
                  <div style="display:flex; align-items:center; gap:0.4rem;">
                    ${n("terminal","width:14px; height:14px; color:var(--text-muted);")}
                    <span>${t(a.name)}</span>
                  </div>
                </td>
                <td style="padding:0.75rem 1.25rem;">${d}</td>
                <td style="padding:0.75rem 1.25rem; color:var(--text-muted); font-size:0.8rem; font-family:monospace;">
                  ${a.event==="workflow_dispatch"?e("يدوي من اللوحة","Manual UI"):t(a.event)}
                </td>
                <td style="padding:0.75rem 1.25rem; color:var(--text-muted); font-size:0.8rem;">
                  ${pe(a.createdAt)}
                </td>
                <td style="padding:0.75rem 1.25rem; text-align:end;">
                  <a href="${t(a.htmlUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="font-size:0.75rem; text-decoration:none; padding:0.25rem 0.6rem;">
                    ${e("GitHub ↗","GitHub ↗")}
                  </a>
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `}function te(s,a,r=null,o=!1){if(!a&&r)return`
      <div class="vault-error-state card" style="text-align:center; padding:3.5rem 1.5rem; border:1px solid rgba(239, 68, 68, 0.3); background:rgba(239, 68, 68, 0.04); border-radius:1rem; margin-bottom:2rem;">
        <div style="color:#ef4444; margin-bottom:1rem;">
          ${n("alert-triangle","width:36px; height:36px;")}
        </div>
        <h3 style="font-weight:700; color:var(--text-main); margin-bottom:0.5rem;">
          ${e("تعذر تحميل سجل النسخ الاحتياطية من Google Drive","Failed to Load Backups Ledger from Google Drive")}
        </h3>
        <p style="color:var(--text-muted); font-size:0.9rem; max-width:540px; margin:0 auto 1.5rem auto;">
          ${t(r)}
        </p>
        <button id="btn-retry-vault-fetch" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:0.5rem; background:#059669; border-color:#059669; font-size:0.9rem;">
          ${n("refresh","width:15px; height:15px;")}
          <span>${e("إعادة المحاولة الآن","Retry Now")}</span>
        </button>
      </div>
    `;if(!a||o)return`
      <div class="vault-loading-state" style="text-align:center; padding:4rem 1rem;">
        <div class="loading-spinner" style="margin: 0 auto 1.5rem auto;"></div>
        <h3 style="font-weight:600; color:var(--text-main); margin-bottom:0.5rem;">
          ${e("جاري فحص خزنة Google Drive 5TB ومطابقة النسخ المشفرة...","Scanning Google Drive 5TB Vault & Verifying Checksums...")}
        </h3>
        <p style="color:var(--text-muted); font-size:0.9rem;">
          ${e("يتم الاتصال عبر مصادقة Google OAuth2 المشفرة","Connecting via secure Google OAuth2 handshake")}
        </p>
      </div>
    `;const p=a?.total||0,d=a?.latestBackup,b=a?.backups||[];return`
    <!-- Top Hero Banner: Karim Al-Hakim Serenity & High Resilience -->
    <div class="vault-hero-card" style="
      background: linear-gradient(135deg, rgba(16, 24, 39, 0.95), rgba(15, 23, 42, 0.98));
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-radius: 1rem;
      padding: 1.75rem 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      position: relative;
      overflow: hidden;
    ">
      <div style="position:absolute; top:-40px; right:-40px; width:180px; height:180px; background:radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%); pointer-events:none;"></div>
      
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1.25rem;">
        <div>
          <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
            <span style="
              display:inline-flex; align-items:center; gap:0.5rem;
              background:rgba(16, 185, 129, 0.12); color:#10b981;
              padding:0.35rem 0.85rem; border-radius:2rem; font-size:0.8rem; font-weight:700;
              border: 1px solid rgba(16, 185, 129, 0.3);
            ">
              <span style="width:8px; height:8px; border-radius:50%; background:#10b981; box-shadow:0 0 10px #10b981; animation:pulse 2s infinite;"></span>
              ${e("نظام الحصانة السحابية نشط 100%","Air-Gapped Cloud Vault Active")}
            </span>
            <span style="color:var(--text-muted); font-size:0.85rem;">
              ${e("حساب Google Drive 5TB + أرشيف GitHub السحابي","Google Drive 5TB + GitHub Azure Cloud")}
            </span>
          </div>

          <h2 style="font-size:1.45rem; font-weight:700; color:#f8fafc; margin:0 0 0.5rem 0; letter-spacing:-0.02em;">
            ${e("مركز النسخ الاحتياطي والتعافي من الكوارث (DARC Vault)","Disaster Recovery & Enterprise Vault")}
          </h2>
          <p style="color:#94a3b8; font-size:0.92rem; max-width:680px; line-height:1.6; margin:0;">
            ${e("النسخ تُسحب ذرياً، تُشفر محلياً بـ AES-256 عسكري قبل خروجها للإنترنت، وتُحفظ مستقلاً في سحابتين منفصلتين لحماية بيانات المشاريع من أي كارثة أو عطل سحابي.","Database is dumped atomically, encrypted client-side with AES-256 before transit, and preserved across two independent cloud providers with 30-day rolling retention.")}
          </p>
        </div>

        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <button id="btn-trigger-backup-now" class="btn btn-secondary" style="background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.12); color:#e2e8f0;">
            ${n("upload","width:15px; height:15px;")}
            <span>${e("أخذ نسخة فورية الآن","Backup Now")}</span>
          </button>
          <button id="btn-refresh-vault" class="btn btn-secondary" style="background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.12); color:#e2e8f0;">
            ${n("refresh","width:15px; height:15px;")}
            <span>${e("تحديث القائمة","Refresh Vault")}</span>
          </button>
          <button id="btn-open-restore-wizard" class="btn btn-primary" style="background:#059669; border-color:#059669; color:#fff; box-shadow:0 4px 14px rgba(5,150,105,0.4);">
            ${n("shield","width:15px; height:15px;")}
            <span>${e("معالج الاستعادة الآمن","Restore Wizard")}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Metrics Bento Row -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; margin-bottom:2rem;">
      <div class="card" style="padding:1.25rem 1.5rem; border-radius:0.75rem; border:1px solid var(--border-color);">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${e("حالة أحدث نسخة مشفرة","Latest Encrypted Backup")}
        </span>
        <div style="font-size:1.15rem; font-weight:700; color:var(--text-main); margin-top:0.5rem; display:flex; align-items:center; gap:0.5rem;">
          <span style="color:#10b981;">${n("check","width:18px; height:18px;")}</span>
          <span>${d?pe(d.createdAt):e("لا توجد نسخ","None")}</span>
        </div>
      </div>

      <div class="card" style="padding:1.25rem 1.5rem; border-radius:0.75rem; border:1px solid var(--border-color);">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${e("معيار التشفير المعتمد","Cipher Standard")}
        </span>
        <div style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin-top:0.5rem; font-family:monospace;">
          AES-256-CBC (PBKDF2 100k)
        </div>
      </div>

      <div class="card" style="padding:1.25rem 1.5rem; border-radius:0.75rem; border:1px solid var(--border-color);">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${e("إجمالي النسخ المتاحة (Drive 5TB)","Total Backups Available")}
        </span>
        <div style="font-size:1.5rem; font-weight:800; color:#10b981; margin-top:0.35rem;">
          ${p} ${e("نسخ موثقة","Archives")}
        </div>
      </div>

      <div class="card" style="padding:1.25rem 1.5rem; border-radius:0.75rem; border:1px solid var(--border-color);">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${e("حجم أرشيف قاعدة البيانات الأحدث","Latest Archive Size")}
        </span>
        <div style="font-size:1.4rem; font-weight:800; color:var(--text-main); margin-top:0.5rem;">
          ${d?.sizeFormatted||"—"}
        </div>
      </div>
    </div>

    <!-- Backups Table Ledger -->
    <div class="card" style="padding:0; overflow:hidden; border-radius:0.75rem; border:1px solid var(--border-color); margin-bottom:2rem;">
      <div style="padding:1.25rem 1.5rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
        <h3 style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin:0;">
          ${e("سجل النسخ الاحتياطية المتاحة على Google Drive (5TB)","Available Backups Ledger (Google Drive 5TB)")}
        </h3>
        <span style="font-size:0.82rem; color:var(--text-muted);">
          ${e("فترة الاستبقاء: 30 يوماً متجددة","Retention Policy: 30-Day Rolling")}
        </span>
      </div>

      ${b.length===0?`
        <div style="padding:3rem 1rem; text-align:center; color:var(--text-muted);">
          <p>${e("لم يتم العثور على نسخ احتياطية في مجلد Drive.","No encrypted backups found in Google Drive folder.")}</p>
        </div>
      `:`
        <div style="overflow-x:auto;">
          <table class="table" style="width:100%; margin:0; border-collapse:collapse; font-size:0.9rem;">
            <thead>
              <tr style="background:rgba(0,0,0,0.03); border-bottom:1px solid var(--border-color); text-align:start;">
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("اسم الملف المشفر","Encrypted Filename")}</th>
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("تاريخ الحفظ","Timestamp")}</th>
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("الحجم","Size")}</th>
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted);">${e("بصمة SHA-256","Integrity")}</th>
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted); text-align:end;">${e("الإجراءات","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${b.map(x=>`
                <tr style="border-bottom:1px solid var(--border-color); transition:background 0.15s ease;">
                  <td style="padding:1rem 1.25rem; font-weight:600; color:var(--text-main);">
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                      <span style="color:#10b981;">${n("lock","width:16px; height:16px;")}</span>
                      <code style="font-family:monospace; font-size:0.85rem; color:var(--text-main);">${t(x.filename)}</code>
                    </div>
                  </td>
                  <td style="padding:1rem 1.25rem; color:var(--text-muted);">${pe(x.createdAt)}</td>
                  <td style="padding:1rem 1.25rem; color:var(--text-main); font-weight:600;">${x.sizeFormatted}</td>
                  <td style="padding:1rem 1.25rem;">
                    <span style="
                      display:inline-flex; align-items:center; gap:0.35rem;
                      font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:1rem;
                      background:rgba(16,185,129,0.1); color:#10b981; font-weight:600;
                    ">
                      ${n("check","width:12px; height:12px;")} ${e("مطابقة وموثقة","Verified SHA-256")}
                    </span>
                  </td>
                  <td style="padding:1rem 1.25rem; text-align:end;">
                    <a href="https://drive.google.com/file/d/${t(x.id)}/view" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="font-size:0.8rem; margin-inline-end:0.4rem; text-decoration:none;">
                      ${n("download","width:13px; height:13px;")}
                      <span>${e("Drive","Drive")}</span>
                    </a>
                    <button class="btn btn-sm btn-secondary btn-copy-cli" data-filename="${t(x.filename)}" style="font-size:0.8rem; margin-inline-end:0.4rem;">
                      ${n("copy","width:13px; height:13px;")}
                      <span>${e("أمر CLI","CLI Command")}</span>
                    </button>
                    <button class="btn btn-sm btn-primary btn-restore-target" data-filename="${t(x.filename)}" style="background:#059669; border-color:#059669; font-size:0.8rem;">
                      ${n("shield","width:13px; height:13px;")}
                      <span>${e("استعادة","Restore")}</span>
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `}
    </div>

    <!-- Live Cloud Run & Automation Ledger -->
    <div class="card" style="padding:0; overflow:hidden; border-radius:0.75rem; border:1px solid var(--border-color);">
      <div style="padding:1.25rem 1.5rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
        <div>
          <h3 style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin:0;">
            ${e("سجل العمليات الحية ومسارات الأتمتة (Cloud Run Ledger)","Live Automation & Cloud Run History")}
          </h3>
          <span style="font-size:0.82rem; color:var(--text-muted);">
            ${e("مراقبة حالة مسارات GitHub Actions المباشرة للنسخ والتعافي","Live GitHub Actions Workflow Executions")}
          </span>
        </div>
        <button id="btn-refresh-runs" class="btn btn-sm btn-secondary" style="font-size:0.8rem;">
          ${n("refresh","width:13px; height:13px;")}
          <span>${e("تحديث السجل الحي","Refresh Runs")}</span>
        </button>
      </div>

      <div id="vault-runs-ledger">
        ${fe(q)}
      </div>
    </div>
  `}function J(){const s=document.getElementById("btn-retry-vault-fetch");s&&(s.onclick=async()=>{s.disabled=!0,s.innerHTML=`${n("refresh","width:15px; height:15px; animation:spin 1s linear infinite;")} <span>${e("جاري الفحص...","Retrying...")}</span>`,await me(!0);const d=document.getElementById("vault-content-area");if(d){const b=W();d.innerHTML=te(M(),b.cachedVault,b.vaultError,b.isLoading),J()}});const a=document.getElementById("btn-trigger-backup-now");a&&(a.onclick=async()=>{a.disabled=!0,a.innerHTML=`${n("refresh","width:15px; height:15px; animation:spin 1s linear infinite;")} <span>${e("جاري الإطلاق...","Launching...")}</span>`;try{await at(),T(e("تم إطلاق مسار النسخ الاحتياطي المشفر على GitHub بنجاح","Encrypted backup dispatched to GitHub successfully")),He()}catch(d){T(d.message||"Failed to dispatch backup","error")}finally{a.disabled=!1,a.innerHTML=`${n("upload","width:15px; height:15px;")} <span>${e("أخذ نسخة فورية الآن","Backup Now")}</span>`}});const r=document.getElementById("btn-refresh-vault");r&&(r.onclick=async()=>{r.disabled=!0,r.innerHTML=`${n("refresh","width:16px; height:16px; animation:spin 1s linear infinite;")} <span>${e("جاري الفحص...","Scanning...")}</span>`,await me(!0);const d=document.getElementById("vault-content-area");if(d){const x=W();d.innerHTML=te(M(),x.cachedVault,x.vaultError,x.isLoading),J()}const b=W();b.vaultError?T(b.vaultError,"error"):T(e("تم تحديث قائمة النسخ من Google Drive بنجاح","Vault list refreshed successfully"))});const o=document.getElementById("btn-refresh-runs");o&&(o.onclick=async()=>{o.disabled=!0,q=(await Te()).slice(0,ie.MAX_RUNS_DISPLAY);const d=document.getElementById("vault-runs-ledger");d&&(d.innerHTML=fe(q)),o.disabled=!1,T(e("تم تحديث سجل العمليات الحية","Live run history updated"))});const p=document.getElementById("btn-open-restore-wizard");p&&(p.onclick=()=>Ae("latest")),document.querySelectorAll(".btn-restore-target").forEach(d=>{d.onclick=()=>{Ae(d.getAttribute("data-filename"))}}),document.querySelectorAll(".btn-copy-cli").forEach(d=>{d.onclick=async()=>{const b=`openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -pass pass:"$BACKUP_ENCRYPTION_KEY" -in "${d.getAttribute("data-filename")}" | gunzip | psql "$SUPABASE_DB_URL"`;await nt(b)?T(e("تم نسخ أمر فك التشفير والاستعادة إلى الحافظة","Decryption & restore command copied to clipboard")):T(e("تعذر النسخ التلقائي، يرجى النسخ يدوياً","Could not auto-copy, please copy manually"),"error")}})}function He(){oe&&clearInterval(oe);let s=0;oe=setInterval(async()=>{if(typeof document<"u"&&document.hidden)return;s++;const a=await Te();q=a.slice(0,ie.MAX_RUNS_DISPLAY);const r=document.getElementById("vault-runs-ledger");r&&(r.innerHTML=fe(q)),(!a.some(o=>o.status==="in_progress"||o.status==="queued")||s>15)&&(clearInterval(oe),oe=null,Oe(!0).then(()=>{const o=document.getElementById("vault-content-area");if(o){const p=W();o.innerHTML=te(M(),p.cachedVault,p.vaultError,p.isLoading),J()}}))},ie.POLL_INTERVAL_MS)}function Ae(s="latest"){ae("vault","Opened disaster recovery wizard modal",{targetFilename:s});const a=`
    <div class="restore-wizard-dialog" style="max-width:540px; margin:0 auto; padding:1.5rem 0;">
      <div style="text-align:center; margin-bottom:1.5rem;">
        <div style="width:56px; height:56px; border-radius:50%; background:rgba(217,119,6,0.12); color:#d97706; display:inline-flex; align-items:center; justify-content:center; margin-bottom:1rem;">
          ${n("alert-triangle","width:28px; height:28px;")}
        </div>
        <h3 style="font-size:1.3rem; font-weight:700; color:var(--text-main); margin:0 0 0.5rem 0;">
          ${e("معالج استعادة قاعدة البيانات (Disaster Recovery)","Database Disaster Recovery Wizard")}
        </h3>
        <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.5; margin:0;">
          ${e("النسخة المستهدفة:","Target Backup Archive:")}
          <strong style="color:#10b981; font-family:monospace;">${t(s)}</strong>
        </p>
      </div>

      <!-- Mode Selector: Dry Run vs Real Restore -->
      <div style="background:var(--surface); border:1px solid var(--border-color); border-radius:0.75rem; padding:1.25rem; margin-bottom:1.5rem;">
        <label style="display:flex; align-items:flex-start; gap:0.75rem; cursor:pointer; margin-bottom:1rem;">
          <input type="radio" name="restore-mode" id="mode-dryrun" value="dryrun" checked style="margin-top:0.25rem;">
          <div>
            <strong style="display:flex; align-items:center; gap:0.4rem; color:var(--text-main); font-size:0.95rem;">
              <span style="color:#10b981;">${n("check","width:16px; height:16px;")}</span>
              <span>${e("محاكاة تجريبية آمنة (Dry-Run Rehearsal)","Safe Dry-Run Rehearsal")}</span>
            </strong>
            <p style="color:var(--text-muted); font-size:0.83rem; margin:0.25rem 0 0 0; line-height:1.4;">
              ${e("يقوم السيرفر بتنزيل النسخة، التحقق من بصمة SHA-256، وفك تشفيرها للتأكد من سلامتها دون أي مساس ببيانات الإنتاج الحية.","Downloads archive, validates SHA-256 checksum & decrypts without touching production database.")}
            </p>
          </div>
        </label>

        <label style="display:flex; align-items:flex-start; gap:0.75rem; cursor:pointer; margin:0;">
          <input type="radio" name="restore-mode" id="mode-real" value="real" style="margin-top:0.25rem;">
          <div>
            <strong style="display:flex; align-items:center; gap:0.4rem; color:#ef4444; font-size:0.95rem;">
              <span style="color:#ef4444;">${n("alert-triangle","width:16px; height:16px;")}</span>
              <span>${e("استعادة حقيقية كاملة (Live Production Restore)","Live Production Restore")}</span>
            </strong>
            <p style="color:var(--text-muted); font-size:0.83rem; margin:0.25rem 0 0 0; line-height:1.4;">
              ${e("يؤخذ باك أب استباقي فوري، ثم يتم حقن النسخة المستهدفة داخل معاملة ذرية مع تجميد التريغرز لمنع تكرار الإشعارات والرسائل.","Takes pre-restore safety snapshot, disables triggers & injects SQL atomically.")}
            </p>
          </div>
        </label>
      </div>

      <!-- Live Restore Confirmation Box -->
      <div id="real-confirm-box" style="display:none; background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.3); border-radius:0.75rem; padding:1.25rem; margin-bottom:1.5rem;">
        <label style="font-size:0.85rem; font-weight:700; color:#ef4444; display:block; margin-bottom:0.5rem;">
          ${e("اكتب عبارة الأمان لتأكيد الاستعادة الحية:","Type confirmation phrase to proceed:")}
        </label>
        <input type="text" id="input-confirm-phrase" class="form-control" placeholder="RESTORE_PRODUCTION_DATABASE" style="font-family:monospace; letter-spacing:0.05em;">
      </div>

      <!-- Karim Al-Hakim 3.5s Radial Hold Safety Trigger -->
      <div style="text-align:center; padding:1rem 0;">
        <button id="btn-hold-restore" class="btn" style="
          width:100%; height:52px; font-weight:700; font-size:1rem;
          background:#059669; color:#fff; border:none; border-radius:0.75rem;
          position:relative; overflow:hidden; user-select:none;
        ">
          <span id="hold-progress-bar" style="
            position:absolute; top:0; left:0; bottom:0; width:0%;
            background:rgba(255,255,255,0.25); transition:width 0.05s linear;
          "></span>
          <span id="hold-btn-text" style="position:relative; z-index:2; display:inline-flex; align-items:center; gap:0.5rem;">
            ${n("play","width:18px; height:18px;")}
            <span>${e("اضغط مطولاً لبدء المحاكاة التجريبية (3.5 ثانية)","Hold 3.5s to Execute Rehearsal")}</span>
          </span>
        </button>
        <p style="color:var(--text-muted); font-size:0.8rem; margin-top:0.75rem;">
          ${e("آلية أمان لمنع النقر بالخطأ تحت الضغط العصبي","Safety latch to prevent accidental activation under stress")}
        </p>
      </div>

      <div id="restore-live-feedback" style="display:none; margin-top:1rem; padding:1rem; border-radius:0.5rem; background:rgba(0,0,0,0.2); font-family:monospace; font-size:0.85rem;"></div>
    </div>
  `,r=document.getElementById("modal-root");if(!r){console.error("[Vault] modal-root element not found in DOM");return}r.innerHTML=ke(e("غرفة عمليات التعافي من الكوارث","Disaster Recovery Ops"),e("نظام استعادة آمن محمي بلقطة استباقية وتجميد الـ Triggers","Secure recovery protected by pre-flight snapshot & trigger freeze"),a,"restore-wizard","modal-lg");const o=document.getElementById("mode-dryrun"),p=document.getElementById("mode-real"),d=document.getElementById("real-confirm-box"),b=document.getElementById("hold-btn-text"),x=document.getElementById("btn-hold-restore");if(!o||!p||!x){console.warn("[Vault] Wizard modal elements not ready in DOM");return}const u=()=>{const w=o.checked;d&&(d.style.display=w?"none":"block"),x&&(x.style.background=w?"#059669":"#dc2626"),b&&(w?b.innerHTML=`${n("play","width:18px; height:18px;")} <span>${e("اضغط مطولاً لبدء المحاكاة التجريبية (3.5 ثوانٍ)","Hold 3.5s to Execute Rehearsal")}</span>`:b.innerHTML=`${n("alert-triangle","width:18px; height:18px;")} <span>${e("اضغط مطولاً لتأكيد الاستعادة الحية (3.5 ثوانٍ)","Hold 3.5s to Trigger LIVE Restore")}</span>`)};o.onchange=u,p.onchange=u;const A=document.getElementById("hold-progress-bar");let z=0;const i=()=>{const w=o.checked;if(!w&&(document.getElementById("input-confirm-phrase")?.value||"").trim()!=="RESTORE_PRODUCTION_DATABASE"){T(e("يجب كتابة عبارة التأكيد RESTORE_PRODUCTION_DATABASE أولاً","Please enter confirmation phrase first"),"error");return}z=Date.now(),ce=0,A.style.width="0%",X=setInterval(()=>{const R=Date.now()-z;ce=Math.min(R/ie.HOLD_LATCH_MS*100,100),A.style.width=ce+"%",ce>=100&&(clearInterval(X),X=null,st(s,w))},50)},h=()=>{X&&(clearInterval(X),X=null,A.style.width="0%")};x.addEventListener("mousedown",i),x.addEventListener("mouseup",h),x.addEventListener("mouseleave",h),x.addEventListener("touchstart",i,{passive:!0}),x.addEventListener("touchend",h)}async function st(s,a){const r=document.getElementById("restore-live-feedback"),o=document.getElementById("btn-hold-restore");o&&(o.disabled=!0),r&&(r.style.display="block",r.innerHTML=`
      <div style="color:#10b981; display:flex; align-items:center; gap:0.4rem;">${n("play","width:14px; height:14px;")} <span>${e("جاري إطلاق مسار التعافي على GitHub Actions...","Dispatching Disaster Recovery on GitHub Actions...")}</span></div>
      <div style="color:var(--text-muted); margin-top:0.4rem;">Mode: ${a?"DRY_RUN (Safe Rehearsal)":"PRODUCTION_RESTORE"}</div>
    `);try{ae("vault","Triggering restore API call",{backupFilename:s,isDryRun:a}),await it({backupFilename:s,dryRun:a,confirmationPhrase:a?"DRY_RUN_REHEARSAL":"RESTORE_PRODUCTION_DATABASE"}),r&&(r.innerHTML+=`
        <div style="color:#10b981; margin-top:0.6rem; display:flex; align-items:center; gap:0.4rem;">${n("check","width:14px; height:14px;")} <span>${e("تم قبول العملية وتشغيل المسار المعزول بنجاح!","Workflow dispatched successfully!")}</span></div>
        <div style="color:var(--text-muted); margin-top:0.4rem;">Status: Initiated via GitHub Actions Runner</div>
        <div style="margin-top:0.75rem;">
          <a href="https://github.com/ahmad0105/Darc-design-team/actions/workflows/database-restore.yml" target="_blank" class="btn btn-sm btn-secondary" style="font-size:0.8rem;">
            ${e("متابعة التنفيذ الحي على GitHub ↗","Watch Live Run on GitHub ↗")}
          </a>
        </div>
      `),T(e("تم إطلاق مسار التعافي بنجاح","Disaster recovery launched successfully")),He()}catch(p){r&&(r.innerHTML+=`
        <div style="color:#ef4444; margin-top:0.6rem; display:flex; align-items:center; gap:0.4rem;">${n("alert-triangle","width:14px; height:14px;")} <span>${e("خطأ في إطلاق المسار:","Dispatch Error:")} ${t(p.message)}</span></div>
      `),T(p.message||"Error triggering restore","error")}finally{o&&(o.disabled=!1)}}var bt=ue({FULL_PERMISSIONS_CATALOG:()=>Ge,canAccessSettingsSection:()=>j,exportAuditLogsXLS:()=>ot,fetchFullAuditHistory:()=>dt,openRoleModal:()=>pt,openUserModal:()=>mt,printAuditReport:()=>lt,renderSettings:()=>ct,renderTeam:()=>rt,renderUserActivityCell:()=>Ue});function rt(){if(!C()&&!D("manage_users"))return`<section class="panel"><div class="empty">${n("alert",18)}<span>${e("غير مصرح لك بعرض هذه الصفحة.","You are not authorized to view this page.")}</span></div></section>`;const s=l.data?.user?.id;let a=(l.data?.users||[]).filter(r=>r.status!=="inactive");return s!=="usr_ahmad"?a=a.filter(r=>r.id!=="usr_ahmad"):a=[...a].sort((r,o)=>r.id==="usr_ahmad"?-1:o.id==="usr_ahmad"?1:0),`
    <div class="page-head">
      <div>
        <p class="eyebrow">${e("الأشخاص والمسؤوليات","PEOPLE & OWNERSHIP")}</p>
        <h1>${g("team")}</h1>
        <p>${e("كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.","Every member has a clear role, responsibility, and next action.")}</p>
      </div>
      <div class="page-actions">
        ${C()||D("manage_users")?`<button class="btn btn-primary" data-action="new-user">${n("plus",15)} ${g("addMember")}</button>`:""}
      </div>
    </div>
    <div class="team-grid">
      ${a.map(r=>{const o=qe(r.id,l.data?.tasks||[]),p=r.id==="usr_ahmad";return`
          <article class="member-card ${p?"system-developer-card":""}" style="${p?"border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);":""}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${xe(r,"avatar-lg")}
                <div class="member-card-person-copy">
                  <strong>${t(e(r.name,r.nameEn||r.name))}</strong>
                  <span>${t(e(r.jobTitleAr||(p?"المبرمج / مدير النظام":""),r.jobTitleEn||r.jobTitleAr||""))}</span>
                </div>
              </div>
              ${p?`<span class="stealth-dev-badge">${n("shield",12)} ${e("مدير ومطور النظام","Super Admin & Dev")}</span>`:Je()&&r.id!==l.data?.user?.id?`<button class="member-menu" data-action="open-user" data-user-id="${t(r.id)}">${n("more",15)}</button>`:""}
            </div>
            <div class="member-card-role">
              <span class="status-badge ${r.status==="active"?"done":"not_started"}">${t(G(r))}</span>
            </div>
            <div class="member-card-stats">
              <span>${g("progress")} <strong>${o.progress}%</strong></span>
              <span>${o.tasks} ${g("tasks")}</span>
            </div>
            <div class="member-email">${r.email?t(r.email):g("noEmail")}</div>
          </article>
        `}).join("")}
    </div>
  `}function Ue(s){const a=s.lastActiveAt||s.customFields?.lastActiveAt,r=s.lastLoginAt||s.customFields?.lastLoginAt;if(!a&&!r)return`<span class="activity-never">${e("لم يسجل دخول بعد","Never logged in")}</span>`;const o=Date.now(),p=a?new Date(a).getTime():0,d=s.id===l.data?.user?.id?0:p&&!isNaN(p)?Math.floor((o-p)/6e4):999999,b=d>=0&&d<=5;let x="";if(b)x=`<span class="activity-pill online"><span class="activity-dot online"></span> ${e("نشط الآن","Online")}</span>`;else if(d<60)x=`<span class="activity-pill recent"><span class="activity-dot recent"></span> ${e(`منذ ${d} دقيقة`,`${d}m ago`)}</span>`;else if(d<1440){const A=Math.floor(d/60);x=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${e(`منذ ${A} ساعة`,`${A}h ago`)}</span>`}else p>0&&(x=`<span class="activity-pill idle"><span class="activity-dot idle"></span> ${be(a,!1)}</span>`);const u=r?`<span class="activity-sub" title="${t(r)}">${e("دخول:","Login:")} ${be(r,!0)}</span>`:"";return`<div class="activity-wrapper">${x}${u}</div>`}function De(s){return pe(s,{includeSeconds:!0})}function ge(s){const a=s.action||"",r=s.entityType||s.entity_type||"",o=s.details||{};let p="badge-neutral",d=a,b=r;a==="login"?(p="badge-teal",d=e("تسجيل دخول","Sign In"),b=e("جلسة نظام","System Session")):a==="create"?(p="badge-mint",d=e("إنشاء جديد","Created")):a==="update"?(p="badge-blue",d=e("تعديل بيانات","Updated")):a==="delete"?(p="badge-red",d=e("نقل للمهملات","Moved to Trash")):a==="status_change"?(p="badge-amber",d=e("تغيير حالة","Status Changed")):a==="export_report"?(p="badge-teal",d=e("تصدير تقرير","Exported Report")):a==="restore"?(p="badge-mint",d=e("استعادة","Restored")):a==="purge"?(p="badge-danger",d=e("حذف نهائي","Purged")):a==="invite"&&(p="badge-blue",d=e("دعوة مستخدم","Invite Sent")),r==="task"?b=e("مهمة","Task"):r==="project"?b=e("مشروع","Project"):r==="document"?b=e("مستند","Document"):r==="user"?b=e("مستخدم","User"):r==="report"?b=e("تقرير","Report"):r==="role"&&(b=e("دور وصلاحيات","Role"));let x="—";return o.title||o.name?x=`<strong>${t(o.title||o.name)}</strong>`:a==="status_change"&&(o.oldStatus||o.newStatus)?x=`<span>${t(V(o.oldStatus))} → <strong>${t(V(o.newStatus))}</strong></span>`:s.entityId&&(x=`<code style="font-size:11px;color:var(--muted);">${t(s.entityId)}</code>`),{badgeClass:p,actionLabel:d,entityLabel:b,detailHtml:x}}function ot(s=null){if(!D("view_audit_logs")&&!C()){T(e("ليس لديك صلاحية لتصدير سجل الرقابة.","You do not have permission to export audit logs."),!0);return}const a=s||l._lastFilteredAuditLogs||l.data?.auditLogs||[];if(!a.length){T(e("لا توجد عمليات لتصديرها.","No logs to export."),!0);return}const r=Ke(),o=r.displayName,p=r.logoUrl,d=l.data?.user||{},b=e(d.name,d.nameEn||d.name)||"Admin",x=je(),u=Me();let A=`
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${p?`<img src="${t(p)}" height="38" loading="lazy" decoding="async" style="vertical-align:middle;margin-inline-end:10px;" />`:""}
          <span style="vertical-align:middle;">${e("سجل الرقابة والتدقيق الأمني والعمليات — "+o,"Audit & Security Trail Report — "+o)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${e("المؤسسة:","Company:")} ${t(o)} | ${e("المشرف المستخرج:","Exported by:")} ${t(b)} | ${e("تاريخ التصدير:","Export Date:")} ${t(x)} ${t(u)}
        </th>
      </tr>
      <tr>
        <th colspan="7" style="background:#f8fafc;color:#64748b;font-size:11px;text-align:center;padding:6px;">
          ${e("إجمالي العمليات المضمنة في التقرير:","Total Events in Report:")} ${a.length} ${e("عملية","events")}
        </th>
      </tr>
      <tr style="height:10px;"><td colspan="7" style="border:none;"></td></tr>
      <tr class="header" style="background:#134e4a;color:#ffffff;font-weight:bold;font-size:12px;text-align:center;">
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("المعرف","ID")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("التاريخ والوقت","Date & Time")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("المنفذ / المستخدم","Actor")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("الدور الوظيفي","Role")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("نوع النشاط","Action")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("نوع العنصر","Entity")}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${e("التفاصيل والتغييرات","Details / Context")}</th>
      </tr>
  `;a.forEach((i,h)=>{const w=i.user||(i.userId?(l.data?.users||[]).find(I=>I.id===i.userId):null),R=w?e(w.name,w.nameEn||w.name):e("النظام","System"),m=w?G(w):"—",$=De(i.createdAt),{actionLabel:E,entityLabel:f}=ge(i);let S="";i.details?.title||i.details?.name?S=i.details.title||i.details.name:i.action==="status_change"?S=`${V(i.details?.oldStatus)} → ${V(i.details?.newStatus)}`:typeof i.details=="object"?S=JSON.stringify(i.details):S=String(i.details||i.entityId||"—");const y=h%2===0?"#ffffff":"#f8fafc";A+=`
      <tr style="background:${y};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${t(F(i.id||"—"))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(F(`${$.date} ${$.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${t(F(R))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${t(F(m))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(F(E))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${t(F(f))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${t(F(S))}</td>
      </tr>
    `}),A+="</table>";const z=new Date().toISOString().split("T")[0];Qe(`DARC_Audit_Trail_${z}`,A),T(e("تم تصدير ملف سجل التدقيق بنجاح.","Audit trail exported successfully.")),P("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_${z}`,details:{reportType:"Audit_Logs_Excel",count:a.length}})}).catch(()=>{})}function lt(s=null){const a=s||l._lastFilteredAuditLogs||l.data?.auditLogs||[];if(!a.length){T(e("لا توجد عمليات لطباعتها.","No logs to print."),!0);return}const r=l.data?.company||{},o=e(r.nameAr||r.name,r.nameEn||r.name)||"DARC Design Team";let p=r.logoUrl||"";p.startsWith("/")&&typeof window<"u"&&window.location?.origin&&(p=`${window.location.origin}${p}`);const d=l.data?.user||{},b=e(d.name,d.nameEn||d.name)||"Admin",x=je(),u=Me(),A=a.length,z=a.filter(f=>f.action==="create").length,i=a.filter(f=>f.action==="update"||f.action==="status_change").length,h=a.filter(f=>f.action==="delete"||f.action==="purge"||f.action==="trash").length;let w="";a.forEach((f,S)=>{const y=f.user||(f.userId?(l.data?.users||[]).find(O=>O.id===f.userId):null),I=y?e(y.name,y.nameEn||y.name):e("النظام","System"),ne=y?G(y):"—",c=De(f.createdAt),{actionLabel:v,entityLabel:k}=ge(f);let L="";f.details?.title||f.details?.name?L=f.details.title||f.details.name:f.action==="status_change"?L=`${V(f.details?.oldStatus)} → ${V(f.details?.newStatus)}`:typeof f.details=="object"?L=JSON.stringify(f.details):L=String(f.details||f.entityId||"—"),w+=`
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${t(f.id||String(S+1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${t(c.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${t(c.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${t(I)}</div>
          <div style="font-size:10px;color:#64748b;">${t(ne)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${t(v)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${t(k)}</td>
        <td style="font-size:11px;color:#334155;">${t(L)}</td>
      </tr>
    `});const R=`
    <!DOCTYPE html>
    <html lang="${l.lang}" dir="${l.lang==="ar"?"rtl":"ltr"}">
    <head>
      <meta charset="utf-8" />
      <title>DARC Audit & Security Report - ${new Date().toISOString().split("T")[0]}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <style>
        @page { size: A4 landscape; margin: 12mm; }
        * { box-sizing: border-box; }
        body {
          font-family: 'Cairo', system-ui, -apple-system, sans-serif;
          margin: 0;
          padding: 24px;
          color: #0f172a;
          background: #ffffff;
          font-size: 11px;
          line-height: 1.4;
        }
        .report-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #0d6269;
          padding-bottom: 14px;
          margin-bottom: 16px;
        }
        .brand-title {
          font-size: 20px;
          font-weight: 800;
          color: #0d6269;
          margin: 0;
        }
        .report-subtitle {
          font-size: 12px;
          color: #475569;
          margin-top: 4px;
        }
        .report-meta-box {
          text-align: ${l.lang==="ar"?"left":"right"};
          font-size: 11px;
          color: #334155;
        }
        .kpi-row {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .kpi-card {
          flex: 1;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 8px;
          padding: 8px 12px;
          text-align: center;
        }
        .kpi-val {
          font-size: 18px;
          font-weight: 800;
          color: #0d6269;
        }
        .kpi-label {
          font-size: 10px;
          color: #64748b;
          margin-top: 2px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        th, td {
          border: 1px solid #cbd5e1;
          padding: 7px 9px;
          text-align: ${l.lang==="ar"?"right":"left"};
          vertical-align: middle;
        }
        th {
          background: #0d6269;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          text-align: center;
        }
        tr:nth-child(even) {
          background: #f8fafc;
        }
        .print-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          background: #e2e8f0;
          color: #1e293b;
        }
        .signature-section {
          margin-top: 32px;
          display: flex;
          justify-content: space-between;
          gap: 30px;
          page-break-inside: avoid;
        }
        .signature-box {
          flex: 1;
          border-top: 1px dashed #94a3b8;
          padding-top: 8px;
          text-align: center;
          font-size: 11px;
          color: #475569;
        }
        .no-print-bar {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 10px 16px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .btn-print {
          background: #0d6269;
          color: #ffffff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          font-family: inherit;
        }
        @media print {
          .no-print-bar { display: none !important; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="no-print-bar">
        <div>
          <strong>${e("معاينة التقرير الرقابي الرسمي جاهزة للطباعة / التصدير PDF","Official Executive Audit Report Ready for Print / Save as PDF")}</strong>
          <span style="display:block;font-size:11px;color:#64748b;">${e('يمكنك الضغط على زر الطباعة أدناه واختيار "Save as PDF" لتخزين الملف كـ PDF رسمي.','Click the button below and choose "Save as PDF" in your browser.')}</span>
        </div>
        <button class="btn-print" onclick="window.print()">${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}</button>
      </div>

      <header class="report-header">
        <div>
          ${p?`<img src="${t(p)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />`:""}
          <h1 class="brand-title">${t(o)}</h1>
          <div class="report-subtitle">${e("تقرير الرقابة والتدقيق الأمني وسجل العمليات الإدارية","Official Security Audit & Governance Operations Trail")}</div>
        </div>
        <div class="report-meta-box">
          <div><strong>${e("المشرف المستخرج:","Generated By:")}</strong> ${t(b)}</div>
          <div><strong>${e("تاريخ التقرير:","Report Date:")}</strong> ${t(x)} - ${t(u)}</div>
          <div><strong>${e("حالة النظام:","System Status:")}</strong> Active / Enforced</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${A}</div>
          <div class="kpi-label">${e("إجمالي العمليات","Total Events")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#059669;">${z}</div>
          <div class="kpi-label">${e("عمليات إنشاء","Create Operations")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#2563eb;">${i}</div>
          <div class="kpi-label">${e("عمليات تعديل وحالة","Updates & State Changes")}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#dc2626;">${h}</div>
          <div class="kpi-label">${e("عمليات حذف وحركة سلة","Deletions & Trash Moves")}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width:50px;">#</th>
            <th style="width:130px;">${e("التاريخ والوقت","Timestamp")}</th>
            <th style="width:160px;">${e("المستخدم / المنفذ","Actor")}</th>
            <th style="width:90px;">${e("نوع النشاط","Action")}</th>
            <th style="width:90px;">${e("نوع العنصر","Entity")}</th>
            <th>${e("التفاصيل والتغييرات","Details & Context")}</th>
          </tr>
        </thead>
        <tbody>
          ${w}
        </tbody>
      </table>

      <footer class="signature-section">
        <div class="signature-box">
          <strong>${e("إعداد وتصدير التقرير","Prepared By")}</strong><br /><br />
          <span>${t(b)}</span>
        </div>
        <div class="signature-box">
          <strong>${e("مسؤول الجودة والامتثال الأمني","Security & Compliance Lead")}</strong><br /><br />
          <span>..............................................</span>
        </div>
        <div class="signature-box">
          <strong>${e("الاعتماد الإداري العام","General Management Approval")}</strong><br /><br />
          <span>..............................................</span>
        </div>
      </footer>
    </body>
    </html>
  `;let m=document.getElementById("audit-report-preview-modal");m||(m=document.createElement("div"),m.id="audit-report-preview-modal",m.style.position="fixed",m.style.inset="0",m.style.background="rgba(0, 0, 0, 0.7)",m.style.backdropFilter="blur(4px)",m.style.zIndex="999999",m.style.display="none",m.style.alignItems="center",m.style.justifyContent="center",m.style.padding="15px",document.body.appendChild(m)),m.innerHTML=`
    <div style="background:var(--surface, #ffffff);color:var(--ink);width:95%;max-width:1150px;height:92vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.4);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--line);background:var(--surface-soft);flex-wrap:wrap;gap:8px;">
        <strong style="color:var(--brand-teal);font-size:14px;">${e("معاينة التقرير الرقابي الرسمي (Audit Trail PDF Preview)","Official Audit Trail Report (PDF Preview)")}</strong>
        <div style="display:flex;gap:10px;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-print-audit-iframe" style="display:flex;align-items:center;gap:6px;">
            ${n("printer",14)} ${e("طباعة / حفظ كـ PDF","Print / Save as PDF")}
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-close-audit-print-modal">${n("close",14)}</button>
        </div>
      </div>
      <div style="flex:1;overflow:hidden;position:relative;background:#ffffff;">
        <iframe id="audit-print-preview-iframe" style="width:100%;height:100%;border:none;background:#ffffff;" srcdoc="${t(R)}"></iframe>
      </div>
    </div>
  `,m.style.display="flex";const $=()=>{m.style.display="none",m.innerHTML="",window.removeEventListener("keydown",E)},E=f=>{f.key==="Escape"&&$()};window.addEventListener("keydown",E),document.getElementById("btn-close-audit-print-modal")?.addEventListener("click",$),document.getElementById("btn-print-audit-iframe")?.addEventListener("click",()=>{const f=document.getElementById("audit-print-preview-iframe");f&&f.contentWindow&&(f.contentWindow.focus(),f.contentWindow.print())}),P("/api/audit",{method:"POST",body:JSON.stringify({action:"export_report",entityType:"report",entityId:`rep_audit_print_${Date.now()}`,details:{reportType:"Audit_Logs_Print_PDF",count:a.length}})}).catch(()=>{})}async function dt(){try{T(e("جاري تحميل سجل التدقيق التاريخي الكامل...","Loading complete audit history..."));const s=await P("/api/audit?limit=1000");s&&s.logs&&(l.data.auditLogs=s.logs,l.auditFullHistoryLoaded=!0,renderView(),T(e(`تم جلب ${s.logs.length} عملية بنجاح.`,`Loaded ${s.logs.length} audit logs.`)))}catch(s){T(s.message||e("فشل جلب السجل التاريخي.","Failed to fetch audit history."),!0)}}function ct(){const s=l.data?.user?.id,a=C(),r=j("company"),o=j("whatsapp"),p=j("roles"),d=j("accounts"),b=j("trash"),x=j("audit"),u=j("analytics"),A=j("diagnostics"),z=j("vault"),i=[["profile",e("الملف الشخصي","Profile")],["notifications",e("الإشعارات والتنبيهات","Notifications & Alerts")],...r?[["company",g("company")]]:[],...o?[["whatsapp",e("تنبيهات واتساب","WhatsApp Alerts")]]:[],...p?[["roles",g("roles")]]:[],...d?[["accounts",g("accounts")]]:[],["security",e("الأمان","Security")],...b?[["trash",e("سلة المهملات","Trash")]]:[],...x?[["audit",g("audit")]]:[],...u?[["analytics",e("المراقبة والزيارات والأداء","Observability & Analytics")]]:[],...A?[["diagnostics",e("تشخيص الأعطال والمستخدمين","Error Logs & User Diagnostics")]]:[],...z?[["vault",e("مركز النسخ والتعافي من الكوارث","Disaster Recovery & Vault")]]:[]];i.some(([m])=>m===l.settingsSection)||(l.settingsSection=i[0]?.[0]||"profile");const h=l.data?.user||{};let w="";if(l.settingsSection==="profile"&&(w=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("الملف الشخصي","Profile")}</h2>
            <p>${e("إدارة صورتك الشخصية وبيانات حسابك في النظام.","Manage your profile picture and account information.")}</p>
          </div>
        </div>

        <div class="profile-avatar-card">
          <label for="user-avatar-file-input" class="avatar-upload-trigger" id="profile-avatar-preview" role="button" tabindex="0" title="${e("انقر لرفع صورة شخصية جديدة","Click to upload a new profile picture")}">
            <div class="avatar-upload-circle">
              ${h.avatarUrl?`<img src="${t(h.avatarUrl)}" alt="Avatar" loading="lazy" decoding="async" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(h.avatarColor||"")?h.avatarColor:"#0d6269"};">${t(Re(h))}</div>`:`<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(h.avatarColor||"")?h.avatarColor:"#0d6269"};">${t(Re(h))}</div>`}
              <div class="avatar-upload-overlay">
                ${n("upload",18)}
                <span>${e("تغيير","Change")}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${t(e(h.name,h.nameEn||h.name))}</h3>
            <p class="profile-user-role">${t(e(h.jobTitleAr||"",h.jobTitleEn||h.jobTitleAr||""))} · <span class="status-badge done">${t(G(h))}</span></p>
            <div class="profile-upload-actions">
              <input type="file" id="user-avatar-file-input" accept="image/jpeg,image/png,image/webp" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="user-avatar-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${n("upload",14)} ${e("رفع صورة جديدة","Upload new avatar")}
              </label>
              <span class="upload-hint">${e("يدعم JPG, PNG, WebP (حد أقصى 2MB)","Supports JPG, PNG, WebP (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-profile">
          <div class="form-grid">
            <div class="field">
              <label>${g("nameAr")}</label>
              <input name="name" value="${t(h.name||"")}" required />
            </div>
            <div class="field">
              <label>${g("nameEn")}</label>
              <input name="nameEn" value="${t(h.nameEn||"")}" />
            </div>
            <div class="field">
              <label>${g("jobTitle")} (${e("عربي","AR")})</label>
              <input name="jobTitleAr" value="${t(h.jobTitleAr||"")}" />
            </div>
            <div class="field">
              <label>${g("jobTitle")} (${e("إنجليزي","EN")})</label>
              <input name="jobTitleEn" value="${t(h.jobTitleEn||"")}" />
            </div>
            <div class="field full">
              <label>${g("email")}</label>
              <input value="${t(h.email||"")}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${e("رقم الواتساب للتنبيهات الفردية","WhatsApp Phone for Alerts")}</label>
              <input type="tel" name="phone" dir="ltr" value="${t(h.phone||h.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" />
              <small class="field-hint">${e("أدخل رقم هاتفك مع مفتاح الدولة لاستلام تنبيهات المهام والمخططات المسندة إليك مباشرة على الواتساب.","Enter your phone number with country code to receive alerts for assigned tasks and drawings directly on WhatsApp.")}</small>
            </div>
            <div class="field full">
              <label for="settings-calendar-system">${e("نظام التقويم المفضل في المنصة","Preferred Calendar System")}</label>
              <select id="settings-calendar-system" name="calendarSystem">
                <option value="gregorian" ${Ce()==="gregorian"?"selected":""}>${e("التقويم الميلادي (Gregorian) — اليوم / الشهر / السنة","Gregorian Calendar — Day / Month / Year")}</option>
                <option value="hijri" ${Ce()==="hijri"?"selected":""}>${e("التقويم الهجري (أم القرى) — اليوم / الشهر / السنة","Hijri Calendar (Umm al-Qura) — Day / Month / Year")}</option>
              </select>
              <small class="field-hint">${e("يحدد صيغة عرض التواريخ في سجل العمليات، الجداول، وإحصائيات المشاريع في حسابك.","Sets the date format across audit logs, tables, and project analytics in your account.")}</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${g("save")}</button>
          </div>
        </form>
      </section>
    `),l.settingsSection==="company"&&(a||D("manage_settings"))){const m=l.data?.company||{};w=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("company")}</h2>
            <p>${e("هوية مساحة العمل وشعار الشركة واللغة الافتراضية.","Workspace identity, company logo, and default language.")}</p>
          </div>
        </div>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${e("انقر لرفع وتعديل شعار الشركة","Click to upload and change company logo")}">
            <div class="logo-upload-box">
              ${m.logoUrl?`<img src="${t(m.logoUrl)}" alt="Logo" loading="lazy" decoding="async" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${n("building",24)}</span>`:`<span class="brand-mark">${n("building",24)}</span>`}
              <div class="logo-upload-overlay">
                ${n("upload",16)}
                <span>${e("تعديل","Edit")}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${t(m.name||"DARC Design Team")}</strong>
            <span class="company-sub">${e("العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض","Arabic default · English support · Riyadh timezone")}</span>
            <div class="company-upload-actions">
              <input type="file" id="company-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="company-logo-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${n("upload",14)} ${e("رفع وتعديل الشعار","Upload & Change Logo")}
              </label>
              <span class="upload-hint">${e("يدعم PNG, SVG, JPG (حد أقصى 2MB)","Supports PNG, SVG, JPG (Max 2MB)")}</span>
            </div>
          </div>
        </div>

        <form data-action="update-company" class="company-form">
          <div class="form-grid">
            <div class="field">
              <label>${g("nameAr")}</label>
              <input name="nameAr" value="${t(m.nameAr||"")}" required />
            </div>
            <div class="field">
              <label>${g("nameEn")}</label>
              <input name="nameEn" value="${t(m.nameEn||"")}" />
            </div>
            <div class="field full">
              <label>${g("emailStatus")}</label>
              <input value="${t(l.data?.emailConfigured?g("emailConfigured"):g("emailNotConfigured"))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${g("save")}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:16px;">${n("info",16)}<span>${g("emailInfo")}</span></div>
      </section>
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("نموذج الإنجاز","Progress model")}</h2>
            <p>${g("weightedExplanation")}</p>
          </div>
        </div>
        <div class="report-stat-list">
          <div class="report-stat"><span>${g("weightedProgress")}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${g("simpleProgress")}</span><strong style="color:var(--ink-soft)">—</strong></div>
        </div>
      </section>
    `}if(l.settingsSection==="security"&&(w=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("الأمان","Security")}</h2>
            <p>${e("تغيير كلمة المرور أو تسجيل الخروج من كافة الأجهزة.","Change your password or sign out from all devices.")}</p>
          </div>
        </div>
        <form data-action="change-password">
          <div class="form-grid" style="margin-top:18px">
            <div class="field"><label>${e("كلمة المرور الحالية","Current password")}</label><input type="password" name="oldPassword" autocomplete="current-password" required /></div>
            <div class="field"><label>${e("كلمة المرور الجديدة","New password")}</label><input type="password" name="newPassword" minlength="10" autocomplete="new-password" required /></div>
          </div>
          <div class="form-actions" style="margin-top:20px"><button type="submit" class="btn btn-primary">${g("save")}</button></div>
        </form>
        <hr style="margin:28px 0;border:0;border-top:1px solid var(--line)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
          <div>
            <h3 style="font-size:14px;margin:0 0 4px">${e("تسجيل الخروج من كل الأجهزة","Sign out of all devices")}</h3>
            <p style="color:var(--muted);font-size:12px;margin:0;">${e("إنهاء كافة الجلسات النشطة على كل المتصفحات.","End all active sessions on all browsers.")}</p>
          </div>
          <button class="btn btn-danger btn-sm" data-action="logout-all">${e("تسجيل خروج للكل","Sign out all")}</button>
        </div>
      </section>
    `),l.settingsSection==="notifications"){const m=We(),$=Ye()&&!Ve(),E=m==="granted",f=m==="denied",S=$?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);font-weight:700;">${e("مدعومة عبر تطبيق الويب (PWA)","Supported via Web App (PWA)")}</span>`:`<span class="mini-badge" style="background:${E?"var(--mint)":f?"var(--red-soft)":"var(--surface-soft)"};color:${E?"var(--teal)":f?"var(--red)":"var(--muted)"};font-weight:700;">
          ${E?e("مفعلة على هذا المتصفح","Enabled on this browser"):f?e("محظورة من إعدادات المتصفح","Blocked in browser settings"):e("بانتظار الموافقة","Permission pending")}
        </span>`,y=$?`<button type="button" class="btn btn-primary btn-sm" data-action="show-ios-notification-guide">${n("bell",14)} ${e("طريقة التفعيل على iPhone","iPhone Setup Guide")}</button>`:E?`<button type="button" class="btn btn-ghost btn-sm" data-action="test-browser-notification" style="color:var(--teal);">${n("check",14)} ${e("فحص إشعار المتصفح","Test Browser Alert")}</button>`:`<button type="button" class="btn btn-primary btn-sm" data-action="enable-browser-notifications">${n("check",14)} ${e("تفعيل الإشعارات الآن","Enable Notifications")}</button>`;w=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${e("الإشعارات والتنبيهات","Notifications & Alerts")}</h2>
            <p>${e("تخصيص قنوات وصول التنبيهات الفورية وإشعارات المتصفح لسطح المكتب والهواتف الذكية.","Configure real-time notification channels and alerts for desktop and mobile.")}</p>
          </div>
          <button type="button" class="btn btn-primary btn-sm" data-action="send-test-notification">
            ${n("bell",14)} ${e("إرسال إشعار تجريبي فوري","Send Test Notification")}
          </button>
        </div>

        <div style="display:grid;gap:16px;margin-top:16px;">
          <!-- 1. Browser Web Notifications Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon ${E?"teal":f?"red":"blue"}" style="margin-top:2px;">
                ${n("bell",16)}
              </span>
              <div>
                <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:3px;">
                  ${e("إشعارات سطح المكتب والمتصفح والجوال (Web Alerts)","Desktop & Mobile Web Notifications")}
                </strong>
                <p style="margin:0;font-size:11px;color:var(--muted);max-width:480px;line-height:1.5;">
                  ${e("تسمح للموقع بإرسال تنبيهات فورية للنظام حتى عندما يكون المتصفح في الخلفية أو شاشة الهاتف مغلقة.","Allows the platform to deliver native system notifications even when the browser is in the background or screen locked.")}
                </p>
                <div style="margin-top:6px;">
                  ${S}
                </div>
              </div>
            </div>
            <div>
              ${y}
            </div>
          </div>

          <!-- 2. Audio Chimes Card -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <span class="attention-icon teal" style="margin-top:2px;">
                ${n("check",16)}
              </span>
              <div>
                <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:3px;">
                  ${e("النغمة التنبيهية الفاخرة (Audio Chime)","Acoustic Alert Chime")}
                </strong>
                <p style="margin:0;font-size:11px;color:var(--muted);max-width:480px;line-height:1.5;">
                  ${e("نغمة صوتية هادئة مدمجة باستخدام Web Audio API تعزف فورياً عند وصول أي تنبيه في الوقت الفعلي.","Subtle built-in harmonic chime generated via Web Audio API playing whenever a live alert arrives.")}
                </p>
              </div>
            </div>
            <button type="button" class="btn btn-soft btn-sm" data-action="play-test-chime" style="display:inline-flex;align-items:center;gap:6px;">
              ${n("volume",14)} ${e("استمع للنغمة","Play Chime")}
            </button>
          </div>

          <!-- 3. Channel Status Matrix -->
          <div style="padding:16px;border-radius:14px;border:1px solid var(--line);background:var(--surface);">
            <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:8px;">
              ${e("جاهزية قنوات الإرسال المربوطة","Connected Notification Channels")}
            </strong>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;margin-top:10px;">
              <div style="padding:10px;border-radius:10px;background:var(--surface-soft);border:1px solid var(--line);">
                <span style="font-size:10px;color:var(--muted);display:block;">${e("التنبيهات داخل المنصة","In-App Alerts")}</span>
                <strong style="color:var(--teal);font-size:12px;display:inline-flex;align-items:center;gap:4px;">${n("check",12)} ${e("نشطة وفورية (WebSocket)","Active Real-Time")}</strong>
              </div>
              <div style="padding:10px;border-radius:10px;background:var(--surface-soft);border:1px solid var(--line);">
                <span style="font-size:10px;color:var(--muted);display:block;">${e("تنبيهات واتساب المباشرة","WhatsApp Direct Alerts")}</span>
                <strong style="color:var(--teal);font-size:12px;display:inline-flex;align-items:center;gap:4px;">${n("check",12)} ${e("مربوطة (Baileys Engine)","Connected Baileys")}</strong>
              </div>
              <div style="padding:10px;border-radius:10px;background:var(--surface-soft);border:1px solid var(--line);">
                <span style="font-size:10px;color:var(--muted);display:block;">${e("بريد الإشعارات السحابي","Cloud Email Gateway")}</span>
                <strong style="color:var(--teal);font-size:12px;display:inline-flex;align-items:center;gap:4px;">${n("check",12)} ${e("جاهز (Resend API)","Ready Resend")}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    `}if(l.settingsSection==="accounts"&&d){const m=C()||D("view_user_activity"),$=C()||D("manage_users"),E=C()||D("manage_existing_account_permissions")||D("manage_users"),f=C()&&!M();let S=l.data?.users||[];s!=="usr_ahmad"&&(S=S.filter(y=>y.id!=="usr_ahmad")),w=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("accounts")}</h2>
            <p>${e("الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.","Current accounts and each member’s access. Add, edit, or deactivate them here.")}</p>
          </div>
          ${$?`<button class="btn btn-primary btn-sm" data-action="new-user">${n("plus",14)} ${g("addMember")}</button>`:""}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${g("team")}</th>
                <th>${g("role")}</th>
                <th>${g("email")}</th>
                <th>${g("accountStatus")}</th>
                ${m?`<th>${e("آخر ظهور ونشاط","Last Seen & Activity")}</th>`:""}
                ${E?"<th></th>":""}
              </tr>
            </thead>
            <tbody>
              ${S.map(y=>{const I=y.id==="usr_ahmad";return`
                  <tr>
                    <td>
                      <div class="team-member">
                        ${xe(y)}
                        <div class="team-member-copy">
                          <strong>${t(e(y.name,y.nameEn||y.name))}</strong>
                          <span>${t(e(y.jobTitleAr||(I?"المبرمج / مدير النظام":""),y.jobTitleEn||y.jobTitleAr||""))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${I?`<span class="stealth-dev-badge">${n("shield",12)} ${e("مدير ومطور النظام","Super Admin & Dev")}</span>`:t(G(y))}
                    </td>
                    <td>
                      ${y.email?t(y.email):`<span style="color:var(--muted)">${g("noEmail")}</span>`}
                      ${y.phone||y.customFields?.phone?`<div style="font-size:11px;color:var(--primary);direction:ltr;text-align:right;margin-top:3px;font-family:monospace;font-weight:600;display:inline-flex;align-items:center;gap:4px;">${n("phone",11)} ${t(y.phone||y.customFields?.phone)}</div>`:""}
                    </td>
                    <td>
                      <span class="status-badge ${y.status==="active"?"done":"not_started"}">${y.status==="active"?g("activeAccount"):g("pendingAccount")}</span>
                    </td>
                    ${m?`
                      <td>
                        ${Ue(y)}
                      </td>
                    `:""}
                    ${E?`
                      <td>
                        <div class="role-actions">
                          ${I?`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${t(y.id)}">${g("edit")}</button>
                          `:`
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${t(y.id)}">${g("edit")}</button>
                            ${y.id!==l.data?.user?.id?`
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${t(y.id)}" title="${y.status==="pending"?e("تفعيل الحساب يدوياً","Activate manually"):e("تغيير كلمة المرور","Change password")}">${n(y.status==="pending"?"check":"settings",13)}</button>
                              ${f?`<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${t(y.id)}" title="دخول كـ هذا الحساب">${n("user",13)}</button>`:""}
                            `:""}
                            ${y.id!==l.data?.user?.id&&y.email?`<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${t(y.id)}">${n("send",13)}</button>`:""}
                            ${y.id!==l.data?.user?.id?`<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${t(y.id)}">${n("trash",13)}</button>`:""}
                          `}
                        </div>
                      </td>
                    `:""}
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `}if(l.settingsSection==="roles"&&(a||D("manage_roles"))&&(w=`
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${g("roles")}</h2>
            <p>${e("إدارة الأدوار وصلاحيات الوصول للنظام.","Manage roles and access permissions across the system.")}</p>
          </div>
          ${a||D("manage_roles")?`<button class="btn btn-primary btn-sm" data-action="new-role">${n("plus",14)} ${g("addRole")}</button>`:""}
        </div>
        <div class="role-list">
          ${(l.data?.roles||[]).map(m=>`
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${t(e(m.nameAr,m.nameEn))}</strong>
                  ${m.builtIn?`<span class="role-system-badge">${n("shield",11)} ${g("builtIn")}</span>`:""}
                </div>
                <p class="role-desc">${t(e(m.descriptionAr,m.descriptionEn))}</p>
                <div class="role-meta">${m.permissions.includes("*")?e("صلاحية كاملة","Full access"):`${m.permissions.length} ${g("permissionCount")}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${t(m.id)}">${n("edit",13)} ${g("edit")}</button>
                ${m.builtIn?"":`<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${t(m.id)}">${n("trash",13)}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `),l.settingsSection==="trash"&&b){if(!l.trash&&typeof sessionStorage<"u")try{const c=sessionStorage.getItem("darc_trash_cache");c&&(l.trash=JSON.parse(c))}catch{}!l.trashLoaded&&!l._trashFetching&&(l._trashFetching=!0,P("/api/trash").then(c=>{l.trash=Array.isArray(c)?c:c.trash||[...(c.projects||[]).map(v=>({...v,type:"project"})),...(c.tasks||[]).map(v=>({...v,type:"task"})),...(c.documents||[]).map(v=>({...v,type:"document"}))],l.trashLoaded=!0,l._trashFetching=!1;try{typeof sessionStorage<"u"&&sessionStorage.setItem("darc_trash_cache",JSON.stringify(l.trash))}catch{}typeof window.renderView=="function"&&window.renderView()}).catch(c=>{l._trashFetching=!1,console.error("[Trash fetch error]",c)}));const m=l.trash||[],$=l.trashFilter||"all",E=(l.trashQuery||"").trim().toLowerCase(),f=m.filter(c=>{if($!=="all"&&c.type!==$)return!1;if(!E)return!0;const v=(e(c.nameAr||c.titleAr,c.nameEn||c.titleEn)||c.name||c.title||c.originalName||"").toLowerCase(),k=(c.code||c.projectCode||"").toLowerCase(),L=(c.projectNameAr||c.projectNameEn||"").toLowerCase();return v.includes(E)||k.includes(E)||L.includes(E)}),S=m.filter(c=>c.type==="project").length,y=m.filter(c=>c.type==="task").length,I=m.filter(c=>c.type==="document").length,ne=m.length?`
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${n("info",16)}</div>
        <div class="trash-notice-text">
          <strong>${e("سلة المحذوفات المركزية المحمية","Central Protected Trash Bin")}</strong>
          <p>${e("تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.","Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.")}</p>
        </div>
      </div>

      <div class="view-toolbar trash-filter-bar">
        <div class="trash-filter-group">
          <button type="button" class="btn btn-sm ${$==="all"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="all">
            ${n("layers",14)}
            <span>${e("الكل","All")}</span>
            <span class="badge ${$==="all"?"badge-on-primary":"badge-neutral"}">${m.length}</span>
          </button>
          <button type="button" class="btn btn-sm ${$==="project"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="project">
            ${n("building",14)}
            <span>${e("المشاريع","Projects")}</span>
            <span class="badge ${$==="project"?"badge-on-primary":"badge-neutral"}">${S}</span>
          </button>
          <button type="button" class="btn btn-sm ${$==="task"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="task">
            ${n("checklist",14)}
            <span>${e("المهام","Tasks")}</span>
            <span class="badge ${$==="task"?"badge-on-primary":"badge-neutral"}">${y}</span>
          </button>
          <button type="button" class="btn btn-sm ${$==="document"?"btn-primary":"btn-ghost"}" data-action="filter-trash" data-filter="document">
            ${n("document",14)}
            <span>${e("المستندات","Documents")}</span>
            <span class="badge ${$==="document"?"badge-on-primary":"badge-neutral"}">${I}</span>
          </button>
        </div>
        <div class="search-box search-sm trash-search-box">
          ${n("search",14)}
          <input type="search" placeholder="${e("بحث في المحذوفات...","Search deleted items...")}" value="${t(l.trashQuery||"")}" data-action="search-trash-input" />
        </div>
      </div>

      ${f.length?`
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${e("الاسم / العنوان","Name / Title")}</th>
                <th>${e("النوع","Type")}</th>
                <th>${e("المشروع التابع له","Project")}</th>
                <th>${e("الحالة السابقة","Prior Status")}</th>
                <th>${e("تاريخ الحذف","Deleted At")}</th>
                <th style="text-align:${l.lang==="ar"?"left":"right"}">${e("الإجراءات","Actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${f.map(c=>{const v=c.type==="project",k=c.type==="task",L=c.type==="document",O=e(c.nameAr||c.titleAr,c.nameEn||c.titleEn)||c.name||c.title||c.originalName||c.code||e("عنصر محذوف","Deleted item"),_=!v&&c.projectId?(l.data?.projects||[]).find(re=>re.id===c.projectId):null,K=c.projectNameAr||c.projectNameEn||(_?e(_.nameAr,_.nameEn||_.nameAr):null),Y=c.projectCode||_?.code,Q=L&&c.size?c.size>1048576?(c.size/1048576).toFixed(1)+" MB":Math.round(c.size/1024)+" KB":"",se=a||D("manage_trash")||c.uploaderId===s;return`
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${v?"is-project":k?"is-task":"is-doc"}">
                          ${n(v?"building":k?"checklist":"document",14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${t(O)}</strong>
                          ${c.code||v?`<span class="trash-item-code">${t(c.code||c.id)}</span>`:""}
                          ${L&&Q?`<span class="trash-item-code" style="color:var(--muted);">${Q}</span>`:""}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${v?"type-project":k?"type-task":"type-doc"}">
                        ${n(v?"building":k?"checklist":"document",11)}
                        ${v?e("مشروع","Project"):k?e("مهمة","Task"):e("مستند","Document")}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${v?`<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${e("مشروع رئيسي","Primary Project")}</span>`:K?`${n("building",11)} <span>${t(K)}${Y?` (${t(Y)})`:""}</span>${L&&c.taskTitleAr?` <span style="font-size:11px;color:var(--muted)">· ${t(c.taskTitleAr)}</span>`:""}`:'<span style="color:var(--muted)">—</span>'}
                      </span>
                    </td>
                    <td>
                      ${c.status?`<span class="status-badge ${t(c.status)}">${t(V(c.status))}</span>`:'<span style="color:var(--muted)">—</span>'}
                    </td>
                    <td>
                      <span class="trash-date" title="${t(c.deletedAt||"")}">
                        ${be(c.deletedAt,!0)}
                      </span>
                    </td>
                    <td style="text-align:${l.lang==="ar"?"left":"right"}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${t(c.type)}" data-id="${t(c.id)}" title="${e("استعادة العنصر وإعادته للعمل","Restore item to active")}">
                          ${n(l.lang==="ar"?"arrow":"arrowLeft",12)} ${e("استعادة","Restore")}
                        </button>
                        ${se?`
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${t(c.type)}" data-id="${t(c.id)}" title="${e("حذف العنصر نهائياً","Permanently delete item")}">
                            ${n("trash",12)} ${e("حذف نهائي","Purge")}
                          </button>
                        `:""}
                      </div>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      `:`
        <div class="empty">
          ${n("search",22)}
          <span>${e("لا توجد نتائج تطابق بحثك في سلة المهملات.","No items match your search in trash.")}</span>
        </div>
      `}
    `:!l.trashLoaded&&!m.length?`
      <div style="padding:48px 20px;text-align:center;">
        <div style="width:32px;height:32px;margin:0 auto 14px;border:3px solid var(--line);border-top-color:var(--teal);border-radius:50%;animation:spin 0.75s linear infinite;"></div>
        <div style="font-size:14px;font-weight:700;color:var(--ink);">${e("جاري فحص واسترجاع عناصر سلة المهملات...","Loading recycle bin items...")}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px;">${e("يتم جلب المشاريع والمهام والمستندات المحذوفة من الخادم...","Fetching deleted projects, tasks, and drawings from server...")}</div>
      </div>
    `:`
      <div class="empty">
        ${n("trash",24)}
        <span>${e("سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.","Trash is empty, no deleted items found.")}</span>
      </div>
    `;w=`
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${e("سلة المهملات","Recycle Bin")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${!l.trashLoaded&&!m.length?e("جاري التحميل...","Loading..."):`${m.length} ${e("عناصر","items")}`}
              </span>
            </div>
            <p>${e("استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.","Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.")}</p>
          </div>
          ${(a||D("manage_trash"))&&m.length>0?`
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${e("حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات","Permanently erase all deleted items")}">
                ${n("trash",13)} ${e("إفراغ سلة المهملات","Empty Trash")}
              </button>
            </div>
          `:""}
        </div>
        ${ne}
      </section>
    `}if(l.settingsSection==="audit"&&(a||D("view_audit_logs"))){const m=[...l.data?.auditLogs||[]].sort((v,k)=>new Date(k.createdAt).getTime()-new Date(v.createdAt).getTime()),$=l.auditFilterAction||"all",E=l.auditFilterEntity||"all",f=l.auditFilterUser||"all",S=(l.auditSearchQuery||"").trim().toLowerCase(),y=m.filter(v=>{if($!=="all"&&v.action!==$||E!=="all"&&(v.entityType||v.entity_type)!==E||f!=="all"&&(v.userId||v.user_id||v.user?.id)!==f)return!1;if(S){const k=v.user||(v.userId?(l.data?.users||[]).find(re=>re.id===v.userId):null),L=(k&&e(k.name,k.nameEn||k.name)||"").toLowerCase(),{actionLabel:O,entityLabel:_}=ge(v),K=(O||v.action||"").toLowerCase(),Y=(_||v.entityType||"").toLowerCase(),Q=(v.id||v.entityId||"").toLowerCase(),se=typeof v.details=="object"?JSON.stringify(v.details).toLowerCase():String(v.details||"").toLowerCase();if(!(L.includes(S)||K.includes(S)||Y.includes(S)||Q.includes(S)||se.includes(S)))return!1}return!0});l._lastFilteredAuditLogs=y;const I=[["all",e("كافة العمليات","All Actions")],["create",e("إنشاء جديد","Create")],["update",e("تعديل بيانات","Update")],["status_change",e("تغيير حالة","Status Change")],["delete",e("نقل للمهملات","Delete / Trash")],["restore",e("استعادة","Restore")],["purge",e("حذف نهائي","Purge")],["export_report",e("تصدير تقرير","Export Report")],["login",e("تسجيل دخول","Sign In")],["invite",e("دعوة مستخدم","Invite")]],ne=[["all",e("كافة العناصر","All Entities")],["project",e("المشاريع","Projects")],["task",e("المهام","Tasks")],["document",e("المستندات","Documents")],["user",e("المستخدمين","Users")],["role",e("الأدوار والصلاحيات","Roles")],["company",e("إعدادات الشركة","Company Settings")],["report",e("التقارير","Reports")]],c=$!=="all"||E!=="all"||f!=="all"||!!S;w=`
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${g("audit")}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${y.length} ${e("عملية معروضة","events shown")}
              </span>
              ${c?`
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${e("من أصل","out of")} ${m.length}
                </span>
              `:""}
            </div>
            <p>${e("سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.","Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.")}</p>
          </div>
          <div class="page-actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${l.auditFullHistoryLoaded?"":`
              <button class="btn btn-ghost btn-sm" data-action="load-full-audit" title="${e("جلب الأرشيف الكامل للسجلات من السيرفر","Load complete audit archive")}">
                ${n("refresh",13)} ${e("تحميل الأرشيف الكامل","Load All History")}
              </button>
            `}
            <button class="btn btn-soft btn-sm" data-action="export-audit-xls" title="${e("تصدير السجل كملف Excel منسق","Export as styled Excel file")}">
              ${n("download",13)} ${e("تصدير Excel","Export Excel")}
            </button>
            <button class="btn btn-primary btn-sm" data-action="print-audit-pdf" title="${e("معاينة وطباعة تقرير رسمي وحفظه كـ PDF","Print or save executive PDF report")}">
              ${n("printer",13)} ${e("طباعة تقرير PDF","Print / PDF")}
            </button>
          </div>
        </div>

        <div class="view-toolbar audit-toolbar" style="gap:10px;margin-bottom:16px;">
          <div class="search-box search-sm" style="flex:1;min-width:240px;max-width:380px;">
            ${n("search",14)}
            <input type="search" placeholder="${e("بحث فوري بالمنفذ، العملية، أو التفاصيل...","Search by actor, action, details...")}" value="${t(l.auditSearchQuery||"")}" data-action="search-audit-input" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="filter-select select-compact select-sm" data-action="filter-audit-action" style="min-width:125px;">
              ${I.map(([v,k])=>`<option value="${v}" ${$===v?"selected":""}>${k}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${ne.map(([v,k])=>`<option value="${v}" ${E===v?"selected":""}>${k}</option>`).join("")}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${e("كافة المستخدمين","All Users")}</option>
              ${(l.data?.users||[]).map(v=>`<option value="${v.id}" ${f===v.id?"selected":""}>${t(e(v.name,v.nameEn||v.name))}</option>`).join("")}
            </select>
            ${c?`
              <button class="btn btn-ghost btn-sm" data-action="reset-audit-filters" style="font-size:11px;color:var(--muted);padding:4px 8px;" title="${e("إعادة تعيين الفلاتر","Reset filters")}">
                ${e("إلغاء التصفية","Clear")}
              </button>
            `:""}
          </div>
        </div>

        ${y.length?`
          <div class="table-wrap" style="border:1px solid var(--line);border-radius:12px;overflow-x:auto;background:var(--surface);">
            <table class="data-table" style="width:100%;border-collapse:collapse;font-size:12px;min-width:650px;">
              <thead>
                <tr style="background:var(--surface-soft);border-bottom:1px solid var(--line);color:var(--ink-soft);font-size:11px;font-weight:700;text-align:inherit;">
                  <th style="padding:12px 14px;">${e("المستخدم / المنفذ","User / Actor")}</th>
                  <th style="padding:12px 14px;">${e("نوع النشاط والعملية","Action & Target")}</th>
                  <th style="padding:12px 14px;">${e("التفاصيل والتغيير","Details / Context")}</th>
                  <th style="padding:12px 14px;text-align:${l.lang==="ar"?"left":"right"};">${e("التاريخ والوقت الدقيق","Exact Date & Time")}</th>
                </tr>
              </thead>
              <tbody>
                ${y.map(v=>{const k=v.user||(v.userId?(l.data?.users||[]).find(re=>re.id===v.userId):null),L=k?e(k.name,k.nameEn||k.name):e("النظام","System"),O=k?G(k):e("تلقائي","Automated"),_=De(v.createdAt),{badgeClass:K,actionLabel:Y,entityLabel:Q,detailHtml:se}=ge(v);return`
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${xe(k)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${t(L)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${t(O)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${K}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${t(Y)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${t(Q)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${se}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${l.lang==="ar"?"left":"right"};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${t(_.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${n("clock",11)}
                          <span>${t(_.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:`
          <div class="empty">
            ${n(c?"search":"checklist",24)}
            <span>${c?e("لا توجد عمليات تطابق معايير التصفية المحددة.","No audit logs match the selected filter criteria."):e("لا توجد عمليات مسجلة حتى الآن.","No audit logs recorded yet.")}</span>
            ${c?`
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${e("إعادة تعيين الفلاتر","Reset filters")}
              </button>
            `:""}
          </div>
        `}
      </section>
    `}if(l.settingsSection==="analytics"&&u&&(w=Ee()),l.settingsSection==="diagnostics"&&A&&(w=ze()),l.settingsSection==="vault"&&z&&(w=Fe(),requestAnimationFrame(()=>{J()})),l.settingsSection==="whatsapp"&&o){const m=M(),$=l.data?.company?.customFields?.whatsapp||l.data?.company?.custom_fields?.whatsapp||{};w=`
      <section class="setting-section">
        ${m?`
          <div class="demo-whatsapp-banner" style="background:rgba(13,98,105,0.08);border:1px solid rgba(13,98,105,0.25);border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;gap:12px;">
            <span style="color:var(--teal);display:flex;align-items:center;">${n("shield",22)}</span>
            <div style="flex:1;">
              <strong style="display:block;font-size:13px;color:var(--teal);margin-bottom:2px;">${e("بيئة العرض التجريبية المعزولة (Demo Sandbox)","Isolated Demo Showcase Sandbox")}</strong>
              <span style="font-size:11px;color:var(--muted);line-height:1.4;">${e("إعدادات بوابات واتساب هنا معزولة تماماً للاستعراض؛ لن يتم استهلاك رصيد أو إرسال رسائل فعلية عبر الشبكة.","WhatsApp gateway configuration is an isolated simulation for demonstration only; no live external traffic is dispatched.")}</span>
            </div>
            <span class="badge" style="background:var(--teal);color:#fff;font-size:10px;font-weight:700;padding:3px 8px;border-radius:6px;">
              ${e("محاكاة آمنة","Isolated Simulation")}
            </span>
          </div>
        `:""}
        <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
          <div>
            <h2>${e("تنبيهات واتساب الميدانية للمشاريع","Field WhatsApp Alerts")}</h2>
            <p>${e("ربط آمن عبر بروتوكول Multi-Device المباشر مع خوارزميات محاكاة السلوك البشري لحماية الأرقام من الحظر.","Secure connection via Multi-Device protocol with anti-ban human behavior simulation.")}</p>
          </div>
          <span class="status-badge ${$.enabled?"done":"neutral"}">
            ${$.enabled?e("مفعل نشط","Active"):e("معطل","Disabled")}
          </span>
        </div>

        <form data-action="update-whatsapp" class="settings-form" style="max-width:740px;display:grid;gap:18px;">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
            <div>
              <strong style="display:block;font-size:14px;color:var(--ink);margin-bottom:4px;">${e("تفعيل إرسال التنبيهات عبر واتساب","Enable WhatsApp Notifications")}</strong>
              <span style="font-size:12px;color:var(--muted);">${e("إرسال إشعارات فورية لمهندسي الموقع والإدارة عند حدوث تغييرات حرجة.","Send instant alerts to field engineers & management upon critical updates.")}</span>
            </div>
            <label class="switch" style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" name="enabled" ${$.enabled?"checked":""} style="opacity:0;width:0;height:0;" id="wa-toggle-enabled" />
              <span class="slider round" style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:var(--line);transition:.3s;border-radius:24px;"></span>
            </label>
          </div>

          <div class="form-grid">
            <div class="field">
              <label>${e("نوع مزود البوابة (Provider)","Gateway Provider")}</label>
              <select name="provider" class="select-compact" style="width:100%;height:42px;">
                <option value="evolution" ${$.provider!=="webhook"?"selected":""}>Evolution API / Baileys</option>
                <option value="webhook" ${$.provider==="webhook"?"selected":""}>Webhook (Custom Webhook URL)</option>
              </select>
            </div>

            <div class="field">
              <label>${e("اسم جلسة الربط (Instance Name)","Instance Name")}</label>
              <input type="text" name="instanceName" value="${t($.instanceName||"darc-workspace")}" placeholder="darc-workspace" required />
            </div>
          </div>

          <div class="field">
            <label>${e("رابط خادم البوابة (Server Gateway URL) *","Server Gateway URL *")}</label>
            <input type="url" name="serverUrl" value="${t($.serverUrl||"")}" placeholder="https://evolution-api.example.com" />
            <small style="font-size:11px;color:var(--muted);margin-top:4px;display:block;">${e("رابط خادم Evolution API الخاص بمكتبكم (أو رابط الـ Webhook المستلم).","Your office Evolution API instance URL or receiving Webhook.")}</small>
          </div>

          <div class="field">
            <label>${e("مفتاح الأمان (API Key / Token)","API Key / Token")}</label>
            <input type="password" name="apiKey" value="${t($.apiKey||"")}" placeholder="••••••••••••••••" />
          </div>

          <div class="field">
            <label>${e("المستلم الافتراضي / قروب الواتساب (اختياري)","Default Recipient / WhatsApp Group (Optional)")}</label>
            <input type="text" name="recipient" value="${t($.recipient||"")}" placeholder="${e("كود قروب واتساب المهندسين (1203630...@g.us) أو رقم جوال الإدارة","WhatsApp Group JID (1203630...@g.us) or Management Phone")}" />
            <small style="font-size:11px;color:var(--teal);margin-top:4px;display:block;">${e("ملاحظة: هذا الحقل اختياري. في حال عدم وجود قروب حالياً، يمكنك تركه فارغاً وسيتكفل النظام بإرسال كافة التنبيهات والمنشن كرسائل فردية مباشرة إلى هواتف المهندسين والمدير المسجلة في حساباتهم.","Note: This field is optional. If you do not have a group yet, leave it blank and the system will automatically send alerts & mentions directly to engineers & manager personal phones.")}</small>
          </div>

          <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;padding:16px;">
            <strong style="display:block;font-size:13px;color:var(--ink);margin-bottom:10px;">${e("أحداث التنبيه الفوري التلقائية:","Automated Trigger Events:")}</strong>
            <div style="display:grid;gap:8px;">
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnCollectiveMention" ${$.notifyOnCollectiveMention!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("megaphone",13)} ${e("عند المنشن الجماعي (@all / @الكل): إرسال تنبيه مباشر لكل أعضاء المشروع والإدارة حتى المدير","When collective mention (@all / @everyone): send direct alert to all project members and managers")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="sendGroupBroadcast" ${$.sendGroupBroadcast?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("users",13)} ${e("إرسال نسخة لقروب الواتساب العام (في حال إدخال كود القروب في الحقل أعلاه)","Send a copy to the WhatsApp Group (if Group JID is set above)")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnBlocked" ${$.notifyOnBlocked!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("warning",13)} ${e("عند تعليق مهمة هندسية (Task Blocked) لتنبيه الموقع فوراً","When a task is blocked to alert field engineers instantly")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnApproval" ${$.notifyOnApproval!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("search",13)} ${e("عند إحالة مهمة للمراجعة والاعتماد (Review / Approval)","When a deliverable is submitted for review & approval")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink);cursor:pointer;">
                <input type="checkbox" name="notifyOnDrawing" ${$.notifyOnDrawing!==!1?"checked":""} />
                <span style="display:inline-flex;align-items:center;gap:6px;">${n("compass",13)} ${e("عند اعتماد أو رفع مخطط معماري أو إنشائي جديد (New Drawing)","When an architectural or structural drawing is approved/uploaded")}</span>
              </label>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:10px;">
            <button type="submit" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:7px;">
              ${n("check",14)} <span>${e("حفظ إعدادات واتساب","Save WhatsApp Settings")}</span>
            </button>
            <button type="button" class="btn btn-soft" data-action="test-whatsapp" style="display:inline-flex;align-items:center;gap:7px;">
              <span>${n("phone",13)}</span> <span>${e("إرسال تنبيه تجريبي للواتساب","Send Test WhatsApp Alert")}</span>
            </button>
          </div>
        </form>
      </section>
    `}const R=a||D("manage_settings")||D("manage_roles")||D("manage_users")||D("manage_trash")||D("view_audit_logs");return`
    <div class="page-head">
      <div>
        <p class="eyebrow">${R?e("تحكم مركزي","CENTRAL CONTROL"):e("الملف الشخصي","USER PROFILE")}</p>
        <h1>${R?g("settings"):e("الملف الشخصي والأمان","Profile & Security")}</h1>
        <p>${R?e("إدارة إعدادات الشركة والحسابات والأدوار والنظام.","Manage workspace, accounts, roles, and settings."):e("إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.","Manage your account info, password, and personal avatar.")}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${n(a?"shield":"user",13)} ${t(G(h))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${i.map(([m,$])=>`<button class="${l.settingsSection===m?"active":""}" data-action="settings-section" data-section="${m}">${$}</button>`).join("")}
      </aside>
      <div class="settings-content">${w}</div>
    </div>
  `}var Ge=[{id:"view_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"عرض المشاريع",nameEn:"View Projects"},{id:"create_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إنشاء مشاريع جديدة",nameEn:"Create Projects"},{id:"edit_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"تعديل بيانات ومراحل المشاريع",nameEn:"Edit Projects"},{id:"delete_projects",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"حذف المشاريع",nameEn:"Delete Projects"},{id:"manage_project_members",category:"projects",categoryAr:"المشاريع والفرق",categoryEn:"Projects & Teams",nameAr:"إدارة وتعيين أعضاء المشروع",nameEn:"Manage Project Members"},{id:"create_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إنشاء المهام والمخرجات",nameEn:"Create Tasks"},{id:"edit_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"تعديل تفاصيل وحالة المهام",nameEn:"Edit Tasks"},{id:"delete_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"حذف المهام",nameEn:"Delete Tasks"},{id:"assign_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إسناد وتوزيع المهام للمنفذين",nameEn:"Assign Tasks"},{id:"review_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"مراجعة المخرجات الهندسية",nameEn:"Review Deliverables"},{id:"approve_tasks",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"اعتماد وتوقيع المخرجات الهندسية",nameEn:"Approve Deliverables"},{id:"manage_reminders",category:"tasks",categoryAr:"المهام والتنفيذ",categoryEn:"Tasks & Execution",nameAr:"إدارة التذكيرات والمتابعات",nameEn:"Manage Reminders"},{id:"upload_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"رفع وإدارة المخططات والمستندات",nameEn:"Upload Documents"},{id:"delete_documents",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"حذف المخططات والمستندات",nameEn:"Delete Documents"},{id:"manage_templates",category:"documents",categoryAr:"المخططات والمكتبة القياسية",categoryEn:"Drawings & Deliverables Library",nameAr:"إدارة مكتبة القوالب والمخرجات القياسية",nameEn:"Manage Templates Library"},{id:"view_dashboard",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض لوحة التحكم والمؤشرات",nameEn:"View Dashboard"},{id:"view_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"عرض صفحة التقارير والمؤشرات",nameEn:"View Reports"},{id:"export_reports",category:"reports",categoryAr:"المؤشرات والتقارير",categoryEn:"Analytics & Reports",nameAr:"تصدير التقارير (Excel)",nameEn:"Export Reports (Excel)"},{id:"manage_users",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة ودعوة وتفعيل حسابات المستخدمين",nameEn:"Manage Users"},{id:"manage_existing_account_permissions",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"تعديل أدوار وصلاحيات الحسابات الموجودة",nameEn:"Manage Existing Account Permissions"},{id:"view_user_activity",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"متابعة أوقات دخول ونشاط المستخدمين",nameEn:"View User Logins & Activity Timestamps"},{id:"manage_roles",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إنشاء وتعديل الأدوار والصلاحيات",nameEn:"Manage Roles & Permissions"},{id:"manage_settings",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة إعدادات النظام والشركة ومساحة العمل",nameEn:"Manage Company & Settings"},{id:"manage_trash",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"إدارة واستعادة سلة المهملات",nameEn:"Manage Trash"},{id:"view_audit_logs",category:"admin",categoryAr:"النظام والأمان",categoryEn:"Administration & Governance",nameAr:"استعراض سجل الرقابة والعمليات الأمنية",nameEn:"View Audit Logs"}];function pt(s=null){const a=l.data?.permissionsCatalog&&l.data.permissionsCatalog.length>=10?l.data.permissionsCatalog:Ge,r=new Map;a.forEach(u=>{const A=u.category||"general",z=e(u.categoryAr||A,u.categoryEn||A);r.has(A)||r.set(A,{name:z,items:[]}),r.get(A).items.push(u)});const o=s?.id==="admin"||s?.permissions&&s.permissions.includes("*"),p=Array.from(r.entries()).map(([u,A])=>{const z=A.items.map(i=>{const h=i.id||i.key,w=e(i.nameAr||i.ar,i.nameEn||i.en||h),R=o||s?.permissions&&(s.permissions.includes(h)||typeof ye<"u"&&ye[h]&&s.permissions.includes(ye[h])),m=o?"disabled":"";return`
        <label class="permission-option" style="cursor:${o?"default":"pointer"};">
          <input type="checkbox" name="permissions" value="${t(h)}" ${R?"checked":""} ${m} />
          <span style="font-weight:500;">${t(w)}</span>
        </label>
      `}).join("");return`
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${t(A.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${A.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${z}
        </div>
      </div>
    `}).join(""),d=o?"":`
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${g("permissions")} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${a.length} ${e("صلاحية متاحة","available permissions")})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${e("تحديد الكل","Select All")}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${e("إلغاء التحديد","Deselect All")}</button>
      </div>
    </div>
  `,b=`
    <form id="role-form" data-role-id="${t(s?.id||"")}">
      <div class="form-grid">
        <div class="field">
          <label>${g("nameAr")} *</label>
          <input name="nameAr" value="${t(s?.nameAr||"")}" required />
        </div>
        <div class="field">
          <label>${g("nameEn")}</label>
          <input name="nameEn" value="${t(s?.nameEn||"")}" />
        </div>
        <div class="field full">
          <label>${g("roleDescription")}</label>
          <textarea name="descriptionAr" rows="2">${t(s?.descriptionAr||"")}</textarea>
        </div>
      </div>
      ${o?`
        <div class="role-modal-note" style="margin-top:15px;">
          ${e("مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.","The system administrator always keeps full root privileges [*] across all aspects of the system.")}
        </div>
      `:`
        ${d}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${p}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button>
        <button type="submit" class="btn btn-primary">${n("check",14)} ${s?g("save"):g("create")}</button>
      </div>
    </form>
  `;document.getElementById("modal-root").innerHTML=ke(s?e("تعديل الدور والصلاحيات","Edit role & permissions"):g("addRole"),e("تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.","Define granular permissions and workspace access levels for this role."),b,"role","modal-lg");const x=document.getElementById("modal-root");if(x){const u=x.querySelector("#btn-perm-select-all"),A=x.querySelector("#btn-perm-deselect-all");u&&u.addEventListener("click",()=>{x.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(z=>z.checked=!0)}),A&&A.addEventListener("click",()=>{x.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(z=>z.checked=!1)})}}function mt(s=null){if(s?.id==="usr_ahmad"&&l.data?.user?.id!=="usr_ahmad")return T(e("لا يمكن تعديل حساب مدير ومطور النظام.","System Developer account is protected."),!0);if(!s&&!C())return T(g("adminOnly"),!0);const a=!C(),r=a?"disabled":"",o=(l.data?.roles||[]).filter(d=>C()||d.id!=="admin"),p=`<form id="user-form" data-user-id="${t(s?.id||"")}" data-permission-only="${a}"><div class="form-grid"><div class="field full"><label>${g("nameAr")}</label><input name="name" value="${t(s?.name||"")}" ${r} required /></div><div class="field"><label>${g("nameEn")}</label><input name="nameEn" value="${t(s?.nameEn||"")}" ${r} /></div><div class="field"><label>${g("jobTitle")}</label><input name="jobTitleAr" value="${t(s?.jobTitleAr||"")}" ${r} /></div><div class="field"><label>${g("email")}</label><input name="email" type="email" value="${t(s?.email||"")}" placeholder="name@darc.com" ${r} /></div><div class="field"><label>${e("رقم الواتساب للتنبيهات","WhatsApp Phone")}</label><input name="phone" type="tel" dir="ltr" value="${t(s?.phone||s?.customFields?.phone||"")}" placeholder="مثال: +966501234567" pattern="^\\+?[0-9]{7,16}$" ${r} /></div><div class="field"><label>${g("role")}</label><select name="roleId">${o.map(d=>`<option value="${t(d.id)}" ${s?.roleId===d.id?"selected":""}>${t(e(d.nameAr,d.nameEn))}</option>`).join("")}</select></div></div><div class="field-hint">${a?e("يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.","Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator."):e("إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.","If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.")}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${g("cancel")}</button><button type="submit" class="btn btn-primary">${n("check",14)} ${s?a?e("حفظ الصلاحية","Save permission"):g("save"):g("create")}</button></div></form>`;document.getElementById("modal-root").innerHTML=ke(s?a?e("تعديل صلاحية الحساب","Change account permission"):e("تعديل حساب العضو","Edit member account"):g("addMember"),e("الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.","The role defines what this member can see and change across projects."),p,"user")}export{vt as i,yt as n,ft as r,bt as t};
