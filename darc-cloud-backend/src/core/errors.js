/**
 * Operational Error Taxonomy & Centralized Error Resilience (OWASP & Node Best Practices)
 */

export class AppError extends Error {
  constructor(message, statusCode = 500, errorCode = 'INTERNAL_ERROR', isOperational = true) {
    super(message);
    this.name = 'AppError';
    this.status = statusCode;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export function createErrorHandler() {
  return (err, c) => {
    const requestId = c.get('requestId') || c.req.header('x-request-id') || ('req_' + Math.random().toString(36).substr(2, 9));
    const isSyntax = err instanceof SyntaxError || err.name === 'SyntaxError';
    const isValidation = err.name === 'ValidationError' || isSyntax;
    const status = err.status || err.statusCode || (isValidation ? 400 : 500);
    const isOperational = err.isOperational || (status < 500);

    // Operational logging with correlation ID for full traceability
    console.error('[DARC Error]', requestId, status, err.message || err);

    // Automatic capture of 500 Internal Server Errors into Incident Center
    if (status >= 500 && c?.env) {
      try {
        const userId = c.get('userId') || 'system_backend';
        const isDemo = Boolean(c.get('isDemo') || (userId && String(userId).startsWith('usr_demo')));
        const reqUrl = c.req?.url ? new URL(c.req.url) : null;
        const method = c.req?.method || 'GET';
        const pathname = reqUrl ? reqUrl.pathname : '/';

        const serverIncident = {
          userId,
          isDemo,
          origin: 'backend_worker',
          severity: 'critical',
          errorType: err.name || 'BackendInternalServerError',
          errorMessage: `[Server 500] ${err.message || 'Internal Server Error'} at ${method} ${pathname}`,
          stackTrace: err.stack || 'No server stack trace captured',
          currentView: pathname,
          titleAr: `خطأ خادم داخلي (HTTP 500): ${err.name || 'InternalError'} في ${method} ${pathname}`,
          titleEn: `Backend Server 500: ${err.name || 'InternalError'} at ${method} ${pathname}`,
          breadcrumbs: [
            { time: new Date().toTimeString().split(' ')[0], category: 'http.request', message: `${method} ${pathname} (RequestId: ${requestId})` },
            { time: new Date().toTimeString().split(' ')[0], category: 'error', message: err.message || 'Fatal Server Exception' }
          ]
        };

        const recordPromise = import('../features/telemetry/telemetry.service.js')
          .then(m => m.recordErrorIncident(c.env, serverIncident))
          .catch(e => console.warn('[ErrorHandler] Failed to auto-record server incident:', e.message));

        if (c.executionCtx && typeof c.executionCtx.waitUntil === 'function') {
          c.executionCtx.waitUntil(recordPromise);
        }
      } catch (logErr) {
        console.warn('[ErrorHandler] Interceptor error:', logErr.message);
      }
    }

    let message = isOperational
      ? (err.message || 'حدث خطأ أثناء معالجة الطلب.')
      : 'حدث خطأ داخلي في الخادم.';

    if (isSyntax) {
      message = 'تنسيق البيانات المُرسلة غير صالح (Invalid JSON body).';
    }

    const errorCode = err.errorCode || (
      status === 400 ? 'VALIDATION_ERROR' :
      status === 401 ? 'UNAUTHORIZED' :
      status === 403 ? 'FORBIDDEN' :
      status === 404 ? 'NOT_FOUND' :
      status === 413 ? 'PAYLOAD_TOO_LARGE' :
      status === 429 ? 'RATE_LIMITED' : 'INTERNAL_SERVER_ERROR'
    );

    c.header('X-Request-Id', requestId);
    return c.json({
      error: message,
      code: errorCode,
      requestId
    }, status);
  };
}
