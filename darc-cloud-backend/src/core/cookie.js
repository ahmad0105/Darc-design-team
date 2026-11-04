import { getCookie, setCookie, deleteCookie } from 'hono/cookie';

export const SESSION_COOKIE_NAME = 'darc_session';
export const CLIENT_INDICATOR_COOKIE = 'darc_logged_in';
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
 * Sets an enterprise-grade hardened session cookie suite:
 * - HttpOnly darc_session: Inaccessible to JavaScript, immunizing against token theft via XSS
 * - Non-HttpOnly darc_logged_in: Light presence indicator, allows client-side zero-trust cookie deletion detection
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

  // 1. Primary HttpOnly token cookie
  setCookie(c, SESSION_COOKIE_NAME, token, {
    path: '/',
    httpOnly: true,
    secure: secure,
    sameSite: 'Lax',
    domain: cookieDomain,
    maxAge: maxAgeSeconds
  });

  // 2. Client-side indicator cookie (allows frontend to immediately detect if user deleted cookies)
  setCookie(c, CLIENT_INDICATOR_COOKIE, '1', {
    path: '/',
    httpOnly: false,
    secure: secure,
    sameSite: 'Lax',
    domain: cookieDomain,
    maxAge: maxAgeSeconds
  });
}

/**
 * Clears the session cookies definitively across all browsers by precisely matching
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

  // 1. Delete domain-scoped cookies
  if (cookieDomain) {
    deleteCookie(c, SESSION_COOKIE_NAME, {
      path: '/',
      httpOnly: true,
      secure: secure,
      sameSite: 'Lax',
      domain: cookieDomain
    });
    deleteCookie(c, CLIENT_INDICATOR_COOKIE, {
      path: '/',
      httpOnly: false,
      secure: secure,
      sameSite: 'Lax',
      domain: cookieDomain
    });
  }

  // 2. Delete host-only cookies (without domain attribute)
  deleteCookie(c, SESSION_COOKIE_NAME, {
    path: '/',
    httpOnly: true,
    secure: secure,
    sameSite: 'Lax'
  });
  deleteCookie(c, CLIENT_INDICATOR_COOKIE, {
    path: '/',
    httpOnly: false,
    secure: secure,
    sameSite: 'Lax'
  });
}

/**
 * Retrieves the session token adhering strictly to zero-trust session revocation rules:
 * 1. Ambient HttpOnly cookie is top priority for browser contexts.
 * 2. If the request originates from a browser with ambient cookies but the session cookie was deleted,
 *    stale Authorization Bearer tokens are explicitly rejected to prevent ghost session resurrection.
 * 3. Explicit Authorization Bearer header is accepted for non-browser programmatic clients (CLI / scripts).
 */
export function getSessionToken(c) {
  // 1. Primary: Ambient HttpOnly cookie
  const cookieToken = getCookie(c, SESSION_COOKIE_NAME);
  if (cookieToken) return cookieToken;

  // 2. Browser anti-resurrection guard:
  // If the request presents browser cookies (e.g. preferences/theme/Cloudflare) but darc_session is absent,
  // the user has explicitly deleted or lost their session cookie. Do NOT allow lingering client headers.
  const rawCookies = c.req.header('cookie') || c.req.header('Cookie') || '';
  const hasBrowserCookies = Boolean(rawCookies && (rawCookies.includes('darc_') || rawCookies.includes('cf_') || rawCookies.includes('__cf')));
  if (hasBrowserCookies && !cookieToken) {
    return null;
  }

  // 3. Programmatic Authorization Bearer fallback (CLI, automation, mobile apps)
  const authHeader = c.req.header('Authorization') || c.req.header('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (token) return token;
  }

  return null;
}
