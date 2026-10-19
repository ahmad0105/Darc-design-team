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
    const status = err.status || err.statusCode || (err.name === 'ValidationError' ? 400 : 500);
    const isOperational = err.isOperational || (status < 500);

    // Operational logging with correlation ID for full traceability
    console.error('[DARC Error]', requestId, status, err.message || err);

    const message = isOperational
      ? (err.message || 'حدث خطأ أثناء معالجة الطلب.')
      : 'حدث خطأ داخلي في الخادم.';

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
