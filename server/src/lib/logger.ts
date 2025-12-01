import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Logger estruturado com Pino
 * 
 * Em desenvolvimento: output formatado e colorido
 * Em produção: JSON estruturado para agregação
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  
  // Configuração de desenvolvimento
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
          singleLine: false,
        },
      }
    : undefined,

  // Configuração de produção
  formatters: isProduction
    ? {
        level: (label) => {
          return { level: label };
        },
      }
    : undefined,

  // Campos base em todos os logs
  base: {
    env: process.env.NODE_ENV,
    service: 'rotinacare-server',
  },

  // Timestamp
  timestamp: pino.stdTimeFunctions.isoTime,

  // Serializers customizados
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      headers: {
        host: req.headers.host,
        'user-agent': req.headers['user-agent'],
      },
      remoteAddress: req.remoteAddress,
      remotePort: req.remotePort,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
    err: pino.stdSerializers.err,
  },
});

/**
 * Logger para contextos específicos
 */
export const createContextLogger = (context: string) => {
  return logger.child({ context });
};

/**
 * Logger para usuários (com sanitização de dados sensíveis)
 */
export const logUserAction = (
  userId: string,
  action: string,
  metadata?: Record<string, any>
) => {
  logger.info(
    {
      userId,
      action,
      ...metadata,
    },
    `User action: ${action}`
  );
};

/**
 * Logger para erros com contexto adicional
 */
export const logError = (
  error: Error,
  context?: string,
  metadata?: Record<string, any>
) => {
  logger.error(
    {
      err: error,
      context,
      ...metadata,
    },
    `Error: ${error.message}`
  );
};

/**
 * Logger para métricas de performance
 */
export const logPerformance = (
  operation: string,
  duration: number,
  metadata?: Record<string, any>
) => {
  logger.info(
    {
      operation,
      duration,
      ...metadata,
    },
    `Performance: ${operation} took ${duration}ms`
  );
};

/**
 * Logger para eventos de segurança
 */
export const logSecurityEvent = (
  event: string,
  severity: 'low' | 'medium' | 'high' | 'critical',
  metadata?: Record<string, any>
) => {
  logger.warn(
    {
      securityEvent: event,
      severity,
      ...metadata,
    },
    `Security: ${event}`
  );
};
