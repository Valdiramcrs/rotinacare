import * as Sentry from '@sentry/node';
import type { Express } from 'express';

const isProduction = process.env.NODE_ENV === 'production';
const SENTRY_DSN = process.env.SENTRY_DSN;

/**
 * Inicializa Sentry para error tracking
 */
export function initSentry(app: Express) {
  if (!SENTRY_DSN) {
    console.warn('⚠️  SENTRY_DSN não configurado - error tracking desabilitado');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    
    // Ambiente
    environment: process.env.NODE_ENV || 'development',
    
    // Release tracking
    release: process.env.RELEASE_VERSION || 'dev',

    // Performance monitoring
    tracesSampleRate: isProduction ? 0.1 : 1.0, // 10% em prod, 100% em dev

    // Filtros de eventos
    beforeSend(event, hint) {
      // Não enviar erros de autenticação
      const error = hint.originalException as Error;
      if (error?.message?.includes('Unauthorized')) {
        return null;
      }

      // Sanitizar dados sensíveis
      if (event.request) {
        delete event.request.cookies;
        if (event.request.headers) {
          delete event.request.headers.authorization;
          delete event.request.headers.cookie;
        }
      }

      return event;
    },

    // Ignorar certos erros
    ignoreErrors: [
      'UNAUTHORIZED',
      'FORBIDDEN',
      'NOT_FOUND',
      'Network request failed',
      'NetworkError',
    ],
  });

  console.log('✅ Sentry inicializado');
}

/**
 * Captura exceção manualmente
 */
export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Captura mensagem manualmente
 */
export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = 'info',
  context?: Record<string, any>
) {
  Sentry.captureMessage(message, {
    level,
    extra: context,
  });
}

/**
 * Define contexto do usuário
 */
export function setUserContext(userId: string, email?: string, username?: string) {
  Sentry.setUser({
    id: userId,
    email,
    username,
  });
}

/**
 * Limpa contexto do usuário
 */
export function clearUserContext() {
  Sentry.setUser(null);
}

/**
 * Adiciona breadcrumb (rastro de navegação)
 */
export function addBreadcrumb(
  message: string,
  category: string,
  level: Sentry.SeverityLevel = 'info',
  data?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data,
  });
}
