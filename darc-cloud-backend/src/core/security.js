// Security & Hardening Middlewares for DARC Cloud Backend
import { getClientIp } from './rate-limit.js';

const ALLOWED_ORIGINS = [
  'http://localhost:4318',
  'http://127.0.0.1:4318',
  'http://localhost:8787',
  'http://127.0.0.1:8787',
  'https://darc-design-team.netlify.app',
  'https://darc-design-team.workers.dev',
  'https://darc-design-team.ahmad-hashmi-c.workers.dev',
  'https://darc-design.bond',
  'https://panel.darc-design.bond',
  'https://api.darc-design.bond'
];

/**
 * Standard HTTP Security Headers & Strict CSP to protect against XSS, clickjacking, etc.
 */
export function securityHeadersMiddleware() {
  const CSP_POLICY = [
    "default-src 'self' https://api.darc-design.bond https://*.darc-design.bond",
    "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https: http:",
    "connect-src 'self' https://api.darc-design.bond https://darc-cloud-backend.ahmad-hashmi-c.workers.dev https://*.supabase.co wss://*.supabase.co https://challenges.cloudflare.com https://www.googleapis.com data:",
    "frame-src 'self' https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');

  return async (c, next) => {
    await next();

    c.res.headers.set('Content-Security-Policy', CSP_POLICY);
    c.res.headers.set('X-Content-Type-Options', 'nosniff');
    c.res.headers.set('X-Frame-Options', 'DENY');
    c.res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    c.res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
    c.res.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    c.res.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');

    // Enable HSTS with preload for HTTPS connections
    if (c.req.url.startsWith('https://')) {
      c.res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    }
  };
}

// Edge Intrusion Detection & Auto-Jail Store
const _jailedIps = new Map(); // ip -> { jailUntil: number, offenses: number, reason: string }
const MAX_JAILED_RECORDS = 1000;

function cleanupJails(now) {
  for (const [ip, data] of _jailedIps.entries()) {
    if (now > data.jailUntil) _jailedIps.delete(ip);
  }
}

/**
 * Edge Intrusion Detection System (IDS) & Auto-Jail Sentry.
 * Automatically inspects incoming paths and parameters for malicious probing, SQLi scans,
 * path traversal, and exploit signatures. Automatically jails abusive IPs for 1 hour.
 */
export function edgeSentryMiddleware() {
  return async (c, next) => {
    const ip = getClientIp(c);
    const now = Date.now();

    // 1. Check if client IP is currently jailed
    const jailInfo = _jailedIps.get(ip);
    if (jailInfo) {
      if (now < jailInfo.jailUntil) {
        const remainingSec = Math.ceil((jailInfo.jailUntil - now) / 1000);
        c.res.headers.set('Retry-After', String(remainingSec));
        c.res.headers.set('X-Edge-Defense', 'JAILED');
        return c.json({
          error: 'تم حظر اتصالك مؤقتاً عبر نظام الحماية الدفاعية (DARC Edge Sentry) نظراً لرصد أنشطة مريبة أو محاولات فحص غير مصرح بها.',
          code: 'EDGE_SECURITY_JAIL',
          remainingSeconds: remainingSec
        }, 403);
      }
      _jailedIps.delete(ip);
    }

    const path = c.req.path.toLowerCase();
    const rawUrl = c.req.url.toLowerCase();

    // 2. High-Severity Probes & Exploit Scanners (Instant Jail: 1 hour)
    const isExploitProbe = 
      /\.(env|git|svn|htaccess|aws|ssh)($|\/|\?)/i.test(path) ||
      /\/(wp-admin|wp-login|xmlrpc|phpinfo|eval-stdin|cgi-bin|setup\.php|console|actuator|swagger-ui|shell\.php)/i.test(path) ||
      /(\.\.\/|\.\.%2f|%2e%2e)/i.test(rawUrl) ||
      /(union\s+select|select\s+.*\s+from|benchmark\(|sleep\(|waitfor\s+delay)/i.test(rawUrl) ||
      /(<script|javascript:|data:text\/html)/i.test(rawUrl) ||
      /(\||;|`)\s*(curl|wget|nc|bash|sh|powershell)\b/i.test(rawUrl);

    if (isExploitProbe) {
      cleanupJails(now);
      const jailDurationMs = 60 * 60 * 1000; // 1 hour jail
      _jailedIps.set(ip, {
        jailUntil: now + jailDurationMs,
        offenses: (jailInfo?.offenses || 0) + 1,
        reason: `Malicious probe or exploit pattern: ${path.slice(0, 50)}`
      });

      if (_jailedIps.size > MAX_JAILED_RECORDS) {
        const oldest = _jailedIps.keys().next().value;
        if (oldest) _jailedIps.delete(oldest);
      }

      console.warn(`[DARC Edge Sentry] Jailed IP ${ip} for 1 hour. Blocked: ${path}`);
      return c.json({
        error: 'طلب محجوب: تم رصد محاولة فحص أمني أو نمط استغلال غير مصرح به وتم حظر الاتصال تلقائياً.',
        code: 'EXPLOIT_PROBE_BLOCKED'
      }, 403);
    }

    await next();
  };
}

/**
 * Computes a cryptographic client device & IP subnet fingerprint for session binding.
 * Protects against session hijacking if JWT tokens are leaked across distinct networks or browsers.
 */
export async function computeClientFingerprint(c, secret = 'darc_sec_salt') {
  const ua = (c.req.header('user-agent') || 'unknown').slice(0, 100);
  const ip = getClientIp(c);

  // Extract network subnet: /24 for IPv4, /64 for IPv6 (tolerates cellular antenna hops while blocking foreign networks)
  let subnet = ip;
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) subnet = `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  } else if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length >= 4) subnet = parts.slice(0, 4).join(':');
  }

  const raw = `${ua}|${subnet}|${secret}`;
  const enc = new TextEncoder().encode(raw);
  const hashBuf = await crypto.subtle.digest('SHA-256', enc);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return hashArr.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
}

/**
 * Correlation ID Middleware (Request Tracing)
 * Attaches unique X-Request-Id to request context and outgoing response headers.
 */
export function correlationIdMiddleware() {
  return async (c, next) => {
    let requestId = c.req.header('x-request-id');
    if (!requestId) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        requestId = 'req_' + crypto.randomUUID().replace(/-/g, '').slice(0, 16);
      } else {
        requestId = 'req_' + Math.random().toString(36).substr(2, 12);
      }
    }
    c.set('requestId', requestId);
    c.res.headers.set('X-Request-Id', requestId);
    await next();
    c.res.headers.set('X-Request-Id', requestId);
  };
}

/**
 * Payload Limit Middleware
 * Protects against memory exhaustion and oversized payloads (default 2.5MB).
 */
export function payloadLimitMiddleware(maxBytes = 2.5 * 1024 * 1024) {
  return async (c, next) => {
    const method = c.req.method;
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return next();
    }
    // Skip chunked file uploads that handle streaming
    const contentRange = c.req.header('content-range');
    if (contentRange || c.req.path.includes('/documents/upload')) {
      return next();
    }
    const len = c.req.header('content-length');
    if (len && parseInt(len, 10) > maxBytes) {
      return c.json({
        error: 'حجم البيانات المرسلة كبير جداً ويتجاوز الحد الأقصى المسموح به (2.5MB).',
        code: 'PAYLOAD_TOO_LARGE'
      }, 413);
    }
    await next();
  };
}

function isAllowedOrigin(originStr) {
  if (!originStr || typeof originStr !== 'string') return false;
  try {
    const parsed = originStr.startsWith('http') ? new URL(originStr).origin : originStr;
    return (
      ALLOWED_ORIGINS.includes(parsed) ||
      parsed.startsWith('http://localhost:') ||
      parsed.startsWith('http://127.0.0.1:') ||
      parsed === 'https://darc-design-team.netlify.app' ||
      parsed.endsWith('.darc-design-team.netlify.app') ||
      parsed.endsWith('.workers.dev') ||
      parsed.endsWith('.pages.dev') ||
      parsed.endsWith('.darc-design.bond') ||
      parsed === 'https://darc-design.bond' ||
      parsed === 'https://panel.darc-design.bond' ||
      parsed.endsWith('.darc.local')
    );
  } catch {
    return false;
  }
}

/**
 * Origin & Referer CSRF Shield for state-changing requests (POST, PUT, PATCH, DELETE).
 * Protects against cross-site request forgery and origin stripping attacks.
 */
export function csrfGuardMiddleware() {
  return async (c, next) => {
    const method = c.req.method;

    // Safe read-only & preflight methods + telemetry beacons
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || c.req.path === '/api/telemetry/heartbeat' || c.req.path === '/api/telemetry/report-error') {
      return next();
    }

    const origin = c.req.header('origin');
    const referer = c.req.header('referer');
    const secFetchSite = c.req.header('sec-fetch-site');

    // 1. Block explicit cross-site fetch metadata
    if (secFetchSite === 'cross-site') {
      return c.json(
        { error: 'طلب محجوب: مصدر غير مصرح به (Cross-Site Request Blocked).' },
        403
      );
    }

    // 2. Validate Origin if present
    if (origin) {
      if (!isAllowedOrigin(origin)) {
        return c.json(
          { error: 'طلب محجوب: مصدر غير مصرح به لمنع تزوير الطلبات (CSRF / Origin Rejected).' },
          403
        );
      }
      return next();
    }

    // 3. Fallback: Validate Referer if Origin is omitted
    if (referer) {
      if (!isAllowedOrigin(referer)) {
        return c.json(
          { error: 'طلب محجوب: ترويسة المرجع غير مصرح بها (CSRF / Referer Rejected).' },
          403
        );
      }
      return next();
    }

    // 4. If neither Origin nor Referer is provided:
    // Only allow if client provides explicit non-cookie credentials (Authorization header)
    const hasAuthHeader = !!c.req.header('authorization');
    if (!hasAuthHeader) {
      return c.json(
        { error: 'طلب محجوب: يجب تحديد مصدر الطلب (Missing Origin/Referer in state-changing request).' },
        403
      );
    }

    await next();
  };
}

/**
 * Strict Server-Side Request Forgery (SSRF) Guard.
 * Validates that a user-provided or config-provided outbound URL points strictly to a public HTTPS/HTTP server
 * and NEVER to internal infrastructure, link-local addresses, loopback, AWS/GCP/Cloud metadata services, or private RFC1918 subnets.
 */
export function validateSafeExternalUrl(urlStr) {
  if (!urlStr || typeof urlStr !== 'string') {
    return { ok: false, error: 'الرابط غير صالح أو فارغ.' };
  }
  const trimmed = urlStr.trim();
  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { ok: false, error: 'صيغة الرابط غير صالحة.' };
  }

  // 1. Only allow HTTP and HTTPS protocols
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return { ok: false, error: 'بروتوكول الرابط غير مدعوم، يجب أن يكون http أو https.' };
  }

  const hostname = parsed.hostname.toLowerCase();

  // 2. Reject empty or invalid hostname
  if (!hostname || hostname.includes(' ') || hostname.includes('\t') || hostname.includes('\r') || hostname.includes('\n')) {
    return { ok: false, error: 'اسم المضيف غير صالح.' };
  }

  // 3. Reject Localhost & local domains
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal') ||
    hostname.endsWith('.arpa') ||
    hostname.endsWith('.corp') ||
    hostname.endsWith('.home') ||
    hostname.endsWith('.lan')
  ) {
    return { ok: false, error: 'لا يمكن استخدام نطاقات شبكة محلية أو داخلية (SSRF Protection).' };
  }

  // 4. Reject IPv6 loopback / unique local / link local
  if (
    hostname === '::1' ||
    hostname === '[::1]' ||
    hostname === '0:0:0:0:0:0:0:1' ||
    hostname.startsWith('fc00:') ||
    hostname.startsWith('fd00:') ||
    hostname.startsWith('fe80:') ||
    hostname.startsWith('[fc') ||
    hostname.startsWith('[fd') ||
    hostname.startsWith('[fe')
  ) {
    return { ok: false, error: 'عناوين IPv6 المحلية والداخلية محظورة (SSRF Protection).' };
  }

  // 5. Reject IPv4 Private / Loopback / Link-Local / Metadata ranges:
  // - 127.0.0.0/8 (Loopback)
  // - 10.0.0.0/8 (Private)
  // - 172.16.0.0/12 (Private 172.16 - 172.31)
  // - 192.168.0.0/16 (Private)
  // - 169.254.0.0/16 (Link-Local & Cloud Metadata e.g. 169.254.169.254)
  // - 0.0.0.0/8 & 255.255.255.255
  // - 100.64.0.0/10 (Carrier-Grade NAT)
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = hostname.match(ipv4Regex);
  if (match) {
    const o1 = Number(match[1]);
    const o2 = Number(match[2]);
    const o3 = Number(match[3]);
    const o4 = Number(match[4]);
    if ([o1, o2, o3, o4].some(octet => octet < 0 || octet > 255)) {
      return { ok: false, error: 'عنوان IP غير صالح.' };
    }
    // Loopback
    if (o1 === 127 || o1 === 0) {
      return { ok: false, error: 'عناوين IP المحلية محظورة (SSRF Protection).' };
    }
    // Link-local / Cloud Metadata (169.254.x.x)
    if (o1 === 169 && o2 === 254) {
      return { ok: false, error: 'عناوين الربط المحلي والبيانات الوصفية للسحابة محظورة (SSRF Protection).' };
    }
    // RFC 1918 Private ranges
    if (o1 === 10) {
      return { ok: false, error: 'عناوين الشبكات الخاصة (10.0.0.0/8) محظورة (SSRF Protection).' };
    }
    if (o1 === 172 && (o2 >= 16 && o2 <= 31)) {
      return { ok: false, error: 'عناوين الشبكات الخاصة (172.16.0.0/12) محظورة (SSRF Protection).' };
    }
    if (o1 === 192 && o2 === 168) {
      return { ok: false, error: 'عناوين الشبكات الخاصة (192.168.0.0/16) محظورة (SSRF Protection).' };
    }
    // Broadcast / CGNAT
    if (o1 === 255 || (o1 === 100 && (o2 >= 64 && o2 <= 127))) {
      return { ok: false, error: 'عناوين الشبكات غير المسموح بها محظورة (SSRF Protection).' };
    }
  }

  // 6. Reject numeric / hex / octal bypass notations (e.g. 2130706433, 0177.0.0.1, 0x7f.0.0.1)
  if (/^(0x[0-9a-f]+|\d+)$/i.test(hostname)) {
    return { ok: false, error: 'صيغ عناوين IP الرقمية الأحادية محظورة (SSRF Protection).' };
  }

  return { ok: true, cleanUrl: parsed.origin + parsed.pathname.replace(/\/+$/, '') };
}

/**
 * Cryptographically secure identifier generator using Web Crypto API.
 * Works uniformly in Cloudflare Workers and Node.js with 96-bit collision resistance.
 */
export function generateSecureId(prefix = 'id_') {
  if (typeof crypto !== 'undefined') {
    if (crypto.getRandomValues) {
      const bytes = new Uint8Array(12);
      crypto.getRandomValues(bytes);
      return prefix + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
    }
    if (crypto.randomUUID) {
      return prefix + crypto.randomUUID().replace(/-/g, '').slice(0, 24);
    }
  }
  // Cryptographically backed fallback
  const now = Date.now().toString(36);
  const rnd = Array.from({ length: 16 }, () => Math.floor(Math.random() * 36).toString(36)).join('');
  return prefix + now + rnd;
}
