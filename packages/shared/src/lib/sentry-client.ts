import * as Sentry from '@sentry/react';

const isProduction = import.meta.env.PROD;

export interface SentryConfig {
  dsn: string;
  appName: 'landing' | 'app' | 'admin';
  release?: string;
}

/**
 * Inicializa Sentry no frontend
 */
export function initSentryClient(config: SentryConfig) {
  if (!config.dsn) {
    console.warn('⚠️  Sentry DSN não configurado - error tracking desabilitado');
    return;
  }

  Sentry.init({
    dsn: config.dsn,
    
    // Identificação
    environment: import.meta.env.MODE || 'development',
    release: config.release || 'dev',
    
    // Tags
    initialScope: {
      tags: {
        app: config.appName,
      },
    },

    // Integrations
    integrations: [
      new Sentry.BrowserTracing({
        // Rastreamento de navegação
        routingInstrumentation: Sentry.reactRouterV6Instrumentation,
      }),
      new Sentry.Replay({
        // Session replay para debugging
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Performance monitoring
    tracesSampleRate: isProduction ? 0.1 : 1.0,
    
    // Session replay
    replaysSessionSampleRate: isProduction ? 0.1 : 0,
    replaysOnErrorSampleRate: 1.0, // Sempre capturar replay em erros

    // Filtros
    beforeSend(event, hint) {
      // Sanitizar dados sensíveis
      if (event.request) {
        delete event.request.cookies;
        if (event.request.headers) {
          delete event.request.headers.authorization;
        }
      }

      // Não enviar erros de rede em desenvolvimento
      if (!isProduction) {
        const error = hint.originalException as Error;
        if (error?.message?.includes('Network')) {
          return null;
        }
      }

      return event;
    },

    // Ignorar certos erros
    ignoreErrors: [
      // Erros de navegador
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      
      // Erros de extensões
      'chrome-extension://',
      'moz-extension://',
      
      // Erros de rede esperados
      'NetworkError',
      'Failed to fetch',
    ],
  });

  console.log('✅ Sentry Client inicializado');
}

/**
 * Captura erro manualmente
 */
export function captureError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Captura mensagem
 */
export function captureInfo(message: string, context?: Record<string, any>) {
  Sentry.captureMessage(message, {
    level: 'info',
    extra: context,
  });
}

/**
 * Define usuário no contexto
 */
export function setSentryUser(userId: string, email?: string) {
  Sentry.setUser({
    id: userId,
    email,
  });
}

/**
 * Limpa usuário do contexto
 */
export function clearSentryUser() {
  Sentry.setUser(null);
}

/**
 * Adiciona contexto customizado
 */
export function setSentryContext(key: string, value: Record<string, any>) {
  Sentry.setContext(key, value);
}

/**
 * Adiciona breadcrumb
 */
export function addSentryBreadcrumb(
  message: string,
  category: string,
  data?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    message,
    category,
    level: 'info',
    data,
  });
}

/**
 * HOC para capturar erros em componentes React
 */
export const SentryErrorBoundary = Sentry.ErrorBoundary;

/**
 * Hook para capturar erros
 */
export const useSentryScope = Sentry.withScope;
