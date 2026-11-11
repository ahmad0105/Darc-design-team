import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeArabic } from '../public/src/core/utils.js';
import { renderOmnisearchResults } from '../public/src/features/dashboard/omnisearch.js';
import { filterTasks } from '../public/src/features/tasks/tasks.js';
import { state } from '../public/src/core/state.js';
import { showToast, modalShell, closeModal, handleModalPopState, isAnyModalOpen } from '../public/src/shared/ui.js';
import { uploadRateLimiter, UPLOAD_MAX_SESSIONS, UPLOAD_ANON_MAX_SESSIONS } from '../darc-cloud-backend/src/core/rate-limit.js';
import { saveOfflineBootstrap, getOfflineBootstrap } from '../public/src/core/offline.js';

test('Field Resilience & Mobile UX Master Verification Suite', async (t) => {
  
  // =========================================================================
  // PILLAR 1: Universal Arabic & Numeral Normalization (normalizeArabic)
  // =========================================================================
  await t.test('1. normalizeArabic unifies Alef, Yaa, Taa-Marbuta, Tashkeel and Eastern Arabic Numerals', () => {
    // 1.1 Alef variations (أ, إ, آ -> ا)
    assert.equal(normalizeArabic('أحمد'), 'احمد');
    assert.equal(normalizeArabic('إبراهيم'), 'ابراهيم');
    assert.equal(normalizeArabic('آلاء'), 'الاء');

    // 1.2 Yaa / Alef-Maksura (ى -> ي)
    assert.equal(normalizeArabic('مستشفى التخصصي'), 'مستشفي التخصصي');
    assert.equal(normalizeArabic('علي'), 'علي');

    // 1.3 Taa-Marbuta (ة -> ه)
    assert.equal(normalizeArabic('مدرسة الأندلس'), 'مدرسه الاندلس');
    assert.equal(normalizeArabic('فيلا الشاطئ'), 'فيلا الشاطئ');

    // 1.4 Tashkeel Diacritics Removal (Fatha, Damma, Kasra, Shadda, Sukun, Tanween)
    const withDiacritics = 'مُخَطَّطٌ مِعْمَارِيٌّ مَشْرُوعٌ مُعْتَمَدٌ';
    assert.equal(normalizeArabic(withDiacritics), 'مخطط معماري مشروع معتمد');

    // 1.5 Eastern Arabic / Hindi Numerals (٠-٩ -> 0-9)
    assert.equal(normalizeArabic('فيلا ١٤'), 'فيلا 14');
    assert.equal(normalizeArabic('برج ٠١٢٣٤٥٦٧٨٩'), 'برج 0123456789');
    assert.equal(normalizeArabic('مشروع DARC-٢٦-٠٠٥'), 'مشروع darc-26-005');

    // 1.6 Edge cases & non-strings
    assert.equal(normalizeArabic(''), '');
    assert.equal(normalizeArabic(null), '');
    assert.equal(normalizeArabic(undefined), '');
  });

  await t.test('2. Omnisearch integrates normalizeArabic for resilient zero-miss query matching', () => {
    // Setup mock state for Omnisearch with valid admin credentials in state.data
    state.lang = 'ar';
    state.data = {
      user: { id: 'usr_admin_01', roleId: 'admin' },
      role: { permissions: ['*'] },
      projects: [
        {
          id: 'prj_14',
          nameAr: 'فيلا رقم 14 - حي النرجس',
          nameEn: 'Villa 14 - Al Narjis',
          code: 'DARC-26-014',
          clientAr: 'أحمد إبراهيم',
          clientEn: 'Ahmed Ibrahim',
          progress: 65
        }
      ],
      tasks: [
        {
          id: 'tsk_01',
          titleAr: 'مخططات الإنشائي والخرسانة',
          titleEn: 'Structural & Concrete Drawings',
          categoryAr: 'إنشائي',
          categoryEn: 'Structural',
          progress: 80
        }
      ],
      users: [
        {
          id: 'usr_02',
          name: 'إبراهيم الأنصاري',
          nameEn: 'Ibrahim Al-Ansari',
          email: 'ibrahim@darc-design.bond',
          jobTitleAr: 'مهندس موقع'
        }
      ]
    };

    // Query with Hindi Numerals '١٤': should find Project 14
    const htmlNumerals = renderOmnisearchResults('١٤');
    assert.ok(htmlNumerals.includes('فيلا رقم 14'), 'Searching with Hindi numeral ١٤ must match Latin 14');

    // Query with Alef variations 'احمد' (without Hamza): should match 'أحمد إبراهيم'
    const htmlHamza = renderOmnisearchResults('احمد');
    assert.ok(htmlHamza.includes('فيلا رقم 14'), 'Searching with bare Alef احمد must match client أحمد');

    // Query with Taa-Marbuta 'الخرسانه' (with Haa): should match 'الخرسانة'
    const htmlMarbuta = renderOmnisearchResults('الخرسانه');
    assert.ok(htmlMarbuta.includes('مخططات الإنشائي والخرسانة'), 'Searching with Haa must match Taa-Marbuta');
  });

  await t.test('2.1 Tasks & Projects local view filters integrate normalizeArabic', () => {
    state.taskFilter = 'all';
    state.taskProjectFilter = 'all';
    state.taskPriorityFilter = 'all';

    const testTasks = [
      { id: 't1', titleAr: 'صب خرسانة الدور 14', titleEn: 'Floor 14 Pouring', categoryAr: 'إنشائي' },
      { id: 't2', titleAr: 'تمديد كهرباء المطبخ', titleEn: 'Kitchen Wiring', categoryAr: 'كهرباء' }
    ];

    // Search with Hindi numerals '١٤'
    state.searches = { tasks: '١٤' };
    const filtered1 = filterTasks(testTasks);
    assert.equal(filtered1.length, 1);
    assert.equal(filtered1[0].id, 't1');

    // Search with bare Alef 'انشائي' for 'إنشائي'
    state.searches = { tasks: 'انشائي' };
    const filtered2 = filterTasks(testTasks);
    assert.equal(filtered2.length, 1);
    assert.equal(filtered2[0].id, 't1');
  });

  // =========================================================================
  // PILLAR 2: Toast Stacking Cap (Anti-Screen Flood)
  // =========================================================================
  await t.test('3. Toast Notification Engine strictly caps stack at 3 and evicts oldest smoothly', () => {
    // Minimal DOM environment for toast testing
    const createdElements = [];
    const toastRoot = {
      id: 'toast-root',
      children: [],
      appendChild(child) {
        this.children.push(child);
        child.parentElement = this;
      }
    };

    globalThis.document = {
      getElementById: (id) => (id === 'toast-root' ? toastRoot : null),
      createElement: (tag) => {
        const el = {
          tagName: tag,
          className: '',
          classList: {
            add(cls) { el.className += ` ${cls}`; },
            contains(cls) { return el.className.includes(cls); }
          },
          attributes: {},
          setAttribute(k, v) { this.attributes[k] = v; },
          dataset: {},
          innerHTML: '',
          querySelector: () => ({ addEventListener: () => {} }),
          addEventListener: () => {},
          remove() {
            const idx = toastRoot.children.indexOf(el);
            if (idx !== -1) toastRoot.children.splice(idx, 1);
          }
        };
        createdElements.push(el);
        return el;
      },
      body: {
        appendChild: () => {}
      }
    };

    // Trigger 5 toasts in sequence
    showToast('رسالة رقم 1', 'info');
    showToast('رسالة رقم 2', 'success');
    showToast('رسالة رقم 3', 'warning');
    assert.equal(toastRoot.children.length, 3, 'First 3 toasts should be present in stack');

    // 4th toast arrives: oldest (رسالة رقم 1) must be marked evicting and receive toast-exit
    showToast('رسالة رقم 4', 'error');
    const activeAfter4th = toastRoot.children.filter(c => !c.dataset.evicting);
    assert.equal(activeAfter4th.length, 3, 'Active toasts must be capped at 3');
    const evictingFirst = toastRoot.children.find(c => c.dataset.evicting === 'true');
    assert.ok(evictingFirst, 'Oldest toast must have dataset.evicting = true');
    assert.ok(evictingFirst.classList.contains('toast-exit'), 'Evicted toast must have toast-exit class');

    // 5th toast arrives: next oldest (رسالة رقم 2) must also be evicted
    showToast('رسالة رقم 5', 'upload');
    const activeAfter5th = toastRoot.children.filter(c => !c.dataset.evicting);
    assert.equal(activeAfter5th.length, 3, 'Active toasts must strictly remain at 3');
  });

  // =========================================================================
  // PILLAR 3: Mobile Popstate & Hardware Back-Button Coordination
  // =========================================================================
  await t.test('4. Modal Shell and Mobile Popstate coordination prevents navigation loss and back-loops', () => {
    const historyStack = [];
    let backCallCount = 0;

    globalThis.window = {
      history: {
        pushState(stateObj, title) {
          historyStack.push({ stateObj, title });
        },
        back() {
          backCallCount++;
          historyStack.pop();
        }
      },
      addEventListener: () => {}
    };

    const modalRootEl = {
      innerHTML: '',
      hasChildNodes: () => !!modalRootEl.innerHTML,
      querySelector: (sel) => {
        if (sel === '.modal-backdrop' || sel === '.modal') {
          return { classList: { add: () => {} } };
        }
        return null;
      }
    };

    globalThis.document = {
      getElementById: (id) => {
        if (id === 'modal-root') return modalRootEl;
        return null;
      },
      querySelector: (sel) => {
        if (sel === '.modal-backdrop' && modalRootEl.innerHTML) return true;
        return null;
      },
      body: { style: { overflow: '' } }
    };

    // 1. Open modal
    const shellHtml = modalShell('تعديل المهمة', 'تفاصيل المهمة الميدانية', '<div class="body"></div>', 'task');
    modalRootEl.innerHTML = shellHtml;

    assert.equal(historyStack.length, 1, 'Opening modal must push state to window.history');
    assert.equal(historyStack[0].stateObj.darcModal, 'task');
    assert.equal(isAnyModalOpen(), true, 'isAnyModalOpen must return true while modal is active');

    // 2. Simulate Android Hardware Back Button (browser pops state first, then dispatches popstate)
    historyStack.pop();
    handleModalPopState();
    assert.equal(backCallCount, 0, 'PopState close must NOT call history.back() again (prevents infinite loop)');

    // 3. Open second modal and close via UI [X] button
    const shellHtml2 = modalShell('إضافة مستخدم', 'بيانات العضو', '<div class="body"></div>', 'user');
    modalRootEl.innerHTML = shellHtml2;
    assert.equal(historyStack.length, 1, 'Second modal pushes state');

    closeModal(true, false); // fromPopstate = false (manual UI click)
    assert.equal(backCallCount, 1, 'Manual UI close must invoke window.history.back() to roll back history');
  });

  // =========================================================================
  // PILLAR 4: Backend Upload Rate Limiter (Field Inspection Photos)
  // =========================================================================
  await t.test('5. uploadRateLimiter allows 35 sessions for authenticated field engineers & caps anonymous at 5', async () => {
    assert.equal(UPLOAD_MAX_SESSIONS, 35, 'UPLOAD_MAX_SESSIONS must be configured to 35');
    assert.equal(UPLOAD_ANON_MAX_SESSIONS, 5, 'UPLOAD_ANON_MAX_SESSIONS must be configured to 5');

    const limiter = uploadRateLimiter();

    const mockCtx = (userId, ip) => ({
      req: {
        method: 'POST',
        header: (name) => (name === 'cf-connecting-ip' ? ip : null)
      },
      get: (key) => (key === 'userId' ? userId : null),
      json: (data, status, headers) => ({ data, status, headers })
    });

    // 5.1 Authenticated Field Engineer: Can perform up to 35 uploads without 429
    const authUserId = 'usr_field_eng_35';
    const authIp = '198.51.100.99';

    for (let i = 1; i <= 35; i++) {
      let nextCalled = false;
      await limiter(mockCtx(authUserId, authIp), async () => {
        nextCalled = true;
      });
      assert.equal(nextCalled, true, `Authenticated upload ${i} must be permitted`);
    }

    // 36th upload must be rate-limited (HTTP 429)
    let nextCalled36 = false;
    const res36 = await limiter(mockCtx(authUserId, authIp), async () => {
      nextCalled36 = true;
    });
    assert.equal(nextCalled36, false, '36th authenticated upload must be blocked');
    assert.equal(res36.status, 429, '36th authenticated upload must return HTTP 429');
    assert.equal(res36.data.code, 'UPLOAD_RATE_LIMITED');
    assert.ok(res36.data.error.includes('35 جلسات في الدقيقة'));

    // 5.2 Anonymous / Unauthenticated User: Capped at 5 uploads
    const anonIp = '203.0.113.88';
    for (let i = 1; i <= 5; i++) {
      let nextCalled = false;
      await limiter(mockCtx(null, anonIp), async () => {
        nextCalled = true;
      });
      assert.equal(nextCalled, true, `Anonymous upload ${i} must be permitted`);
    }

    // 6th upload must be blocked
    let nextCalled6 = false;
    const res6 = await limiter(mockCtx(null, anonIp), async () => {
      nextCalled6 = true;
    });
    assert.equal(nextCalled6, false, '6th anonymous upload must be blocked');
    assert.equal(res6.status, 429, '6th anonymous upload must return HTTP 429');
    assert.ok(res6.data.error.includes('5 جلسات في الدقيقة'));
  });

  // =========================================================================
  // PILLAR 5: Offline Storage Quota Guard (Mobile Safari 5MB Defense)
  // =========================================================================
  await t.test('6. saveOfflineBootstrap skips localStorage when payload exceeds 3.5MB to prevent QuotaExceededError', async () => {
    let storedKey = null;
    let storedVal = null;

    globalThis.localStorage = {
      setItem: (k, v) => {
        storedKey = k;
        storedVal = v;
      },
      getItem: (k) => (k === storedKey ? storedVal : null),
      removeItem: (k) => {
        if (storedKey === k) {
          storedKey = null;
          storedVal = null;
        }
      }
    };

    // 6.1 Normal-sized bootstrap payload (< 3.5MB): should write to localStorage
    const normalPayload = {
      user: { id: 'usr_01', name: 'مهندس الموقع' },
      projects: [{ id: 'prj_01', nameAr: 'مشروع برج العاصمة' }]
    };
    saveOfflineBootstrap(normalPayload);
    // Wait for idle/timeout persistence
    await new Promise(r => setTimeout(r, 80));

    assert.ok(storedVal, 'Normal payload must be stored in localStorage');
    const retrieved = getOfflineBootstrap();
    assert.equal(retrieved.user.id, 'usr_01');

    // 6.2 Oversized payload (> 3.5MB): simulated 4MB blob in projects
    storedKey = null;
    storedVal = null;
    const oversizedPayload = {
      user: { id: 'usr_01', name: 'مهندس الموقع' },
      projects: new Array(5000).fill(0).map((_, idx) => ({
        id: `prj_heavy_${idx}`,
        nameAr: 'مشروع ضخم ذو حمولة بيانات عالية جدا جدا جدا مع سجلات تدقيق متراكمة ومخرجات متعددة',
        details: 'A'.repeat(800) // ~4MB total
      }))
    };

    saveOfflineBootstrap(oversizedPayload);
    await new Promise(r => setTimeout(r, 80));
    // Must NOT have written to localStorage, avoiding QuotaExceededError
    assert.equal(storedVal, null, 'Oversized payload > 3.5MB must safely bypass localStorage');
  });

});
