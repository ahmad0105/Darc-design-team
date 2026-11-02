import { getCookie, setCookie, deleteCookie } from 'hono/cookie';

export const SESSION_COOKIE_NAME = 'darc_session';
export const DEFAULT_SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

/**
 * Robust HTTPS / TLS detection across Cloudflare Workers, Netlify reverse proxy, and local dev
 */
export function isSecureRequest(c) {
  if (c.req.url.startsWith('https://')) return true;
  if (c.req.header('x-forwarded-proto') === 'https') return true;
  if (c.req.header('cf-visitor')?.includes('"scheme":"https"')) return true;
  if (c.env?.NODE_ENV === 'production' || c.env?.ENVIRONMENT === 'production') return true;
  
  try {
    const url = new URL(c.req.url);
    if (url.hostname !== '127.0.0.1' && url.hostname !== 'localhost') return true;
  } catch (e) {}
  
  return false;
}

/**
 * Sets an enterprise-grade hardened session cookie:
 * - HttpOnly: Inaccessible to JavaScript, immunizing against token theft via XSS
 * - Secure: Sent exclusively over TLS (HTTPS) in production and staging environments
 * - SameSite: 'Lax': Defends against cross-site CSRF while preserving seamless navigation
 * - Path: '/': Accessible across the entire workspace API
 * - MaxAge: Strict lifetime enforcement
 */
export function setSessionCookie(c, token, maxAgeSeconds = DEFAULT_SESSION_MAX_AGE) {
  const secure = isSecureRequest(c);
  
  // Dynamic domain targeting: when on *.darc-design.bond, bind cookie to parent domain .darc-design.bond
  let cookieDomain = undefined;
  try {
    const host = new URL(c.req.url).hostname;
    if (host === 'darc-design.bond' || host.endsWith('.darc-design.bond')) {
      cookieDomain = '.darc-design.bond';
    }
  } catch(e) {}

  setCookie(c, SESSION_COOKIE_NAME, token, {
    path: '/',
    httpOnly: true,
    secure: secure,
    sameSite: 'Lax',
    domain: cookieDomain,
    maxAge: maxAgeSeconds
  });
}

/**
 * Clears the session cookie definitively across all browsers by precisely matching
 * the path, secure, sameSite, and httpOnly flags across both domain-scoped and host-only cookies (RFC 6265bis).
 */
export function clearSessionCookie(c) {
  const secure = isSecureRequest(c);
  let cookieDomain = undefined;
  try {
    const host = new URL(c.req.url).hostname;
    if (host === 'darc-design.bond' || host.endsWith('.darc-design.bond')) {
      cookieDomain = '.darc-design.bond';
    }
  } catch(e) {}

  // 1. Delete domain-scoped cookie
  if (cookieDomain) {
    deleteCookie(c, SESSION_COOKIE_NAME, {
      path: '/',
      httpOnly: true,
      secure: secure,
      sameSite: 'Lax',
      domain: cookieDomain
    });
  }

  // 2. Delete host-only cookie (without domain attribute)
  deleteCookie(c, SESSION_COOKIE_NAME, {
    path: '/',
    httpOnly: true,
    secure: secure,
    sameSite: 'Lax'
  });
}

/**
 * Retrieves the session token adhering strictly to RFC 6750:
 * 1. Explicit Authorization Bearer header takes top priority (immune to stale ambient cookie desynchronization)
 * 2. HttpOnly session cookie acts as the resilient ambient fallback (for direct navigation or file requests)
 */
export function getSessionToken(c) {
  // 1. Primary: Explicit client authorization header
  const authHeader = c.req.header('Authorization') || c.req.header('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (token) return token;
  }

  // 2. Fallback: Ambient HttpOnly cookie
  const cookieToken = getCookie(c, SESSION_COOKIE_NAME);
  if (cookieToken) return cookieToken;

  return null;
}
