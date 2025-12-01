import pinoHttp from 'pino-http';
import { logger } from '../lib/logger';
import type { Request, Response } from 'express';

/**
 * Middleware de logging HTTP
 * Registra todas as requisições e respostas
 */
export const httpLogger = pinoHttp({
  logger,
  
  // Customizar mensagem de log
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) {
      return 'error';
    }
    if (res.statusCode >= 400) {
      return 'warn';
    }
    if (res.statusCode >= 300) {
      return 'info';
    }
    return 'info';
  },

  // Customizar mensagem
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} ${res.statusCode}`;
  },

  // Customizar mensagem de erro
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} ${res.statusCode} - ${err.message}`;
  },

  // Adicionar atributos customizados
  customAttributeKeys: {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'duration',
  },

  // Serializers
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params,
      headers: {
        host: req.headers.host,
        'user-agent': req.headers['user-agent'],
        'content-type': req.headers['content-type'],
      },
      remoteAddress: req.socket?.remoteAddress,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
      headers: {
        'content-type': res.getHeader('content-type'),
        'content-length': res.getHeader('content-length'),
      },
    }),
  },
});

/**
 * Middleware para adicionar request ID
 */
export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: Function
) => {
  const requestId = req.headers['x-request-id'] || generateRequestId();
  req.id = requestId as string;
  res.setHeader('X-Request-ID', requestId);
  next();
};

/**
 * Gera ID único para requisição
 */
function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Middleware para logging de erros não tratados
 */
export const errorLoggingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: Function
) => {
  logger.error(
    {
      err,
      req: {
        id: req.id,
        method: req.method,
        url: req.url,
        headers: req.headers,
      },
    },
    'Unhandled error'
  );

  // Passar para próximo middleware de erro
  next(err);
};
