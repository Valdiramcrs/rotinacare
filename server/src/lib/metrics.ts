import { logger } from './logger';

/**
 * Sistema de métricas customizado
 * Para produção, integrar com Prometheus, DataDog, ou New Relic
 */

interface Metric {
  name: string;
  value: number;
  timestamp: Date;
  tags?: Record<string, string>;
}

class MetricsCollector {
  private metrics: Map<string, number> = new Map();
  private histograms: Map<string, number[]> = new Map();

  /**
   * Incrementa contador
   */
  increment(name: string, value: number = 1, tags?: Record<string, string>) {
    const current = this.metrics.get(name) || 0;
    this.metrics.set(name, current + value);

    logger.debug({
      metric: name,
      value,
      tags,
      type: 'counter',
    }, `Metric incremented: ${name}`);
  }

  /**
   * Define gauge (valor instantâneo)
   */
  gauge(name: string, value: number, tags?: Record<string, string>) {
    this.metrics.set(name, value);

    logger.debug({
      metric: name,
      value,
      tags,
      type: 'gauge',
    }, `Metric gauge: ${name}`);
  }

  /**
   * Registra valor em histograma (para percentis)
   */
  histogram(name: string, value: number, tags?: Record<string, string>) {
    const values = this.histograms.get(name) || [];
    values.push(value);
    this.histograms.set(name, values);

    logger.debug({
      metric: name,
      value,
      tags,
      type: 'histogram',
    }, `Metric histogram: ${name}`);
  }

  /**
   * Mede duração de operação
   */
  timing(name: string, duration: number, tags?: Record<string, string>) {
    this.histogram(name, duration, tags);

    logger.info({
      metric: name,
      duration,
      tags,
      type: 'timing',
    }, `Timing: ${name} took ${duration}ms`);
  }

  /**
   * Retorna todas as métricas
   */
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  /**
   * Retorna estatísticas de histograma
   */
  getHistogramStats(name: string) {
    const values = this.histograms.get(name);
    if (!values || values.length === 0) {
      return null;
    }

    const sorted = [...values].sort((a, b) => a - b);
    const len = sorted.length;

    return {
      count: len,
      min: sorted[0],
      max: sorted[len - 1],
      avg: sorted.reduce((a, b) => a + b, 0) / len,
      p50: sorted[Math.floor(len * 0.5)],
      p95: sorted[Math.floor(len * 0.95)],
      p99: sorted[Math.floor(len * 0.99)],
    };
  }

  /**
   * Reseta métricas (útil para testes)
   */
  reset() {
    this.metrics.clear();
    this.histograms.clear();
  }
}

export const metrics = new MetricsCollector();

/**
 * Métricas de negócio
 */
export const BusinessMetrics = {
  userRegistered: () => {
    metrics.increment('users.registered');
  },

  userLoggedIn: () => {
    metrics.increment('users.logged_in');
  },

  doctorCreated: () => {
    metrics.increment('doctors.created');
  },

  medicationCreated: () => {
    metrics.increment('medications.created');
  },

  examCreated: () => {
    metrics.increment('exams.created');
  },

  appointmentCreated: () => {
    metrics.increment('appointments.created');
  },
};

/**
 * Métricas de sistema
 */
export const SystemMetrics = {
  requestReceived: (method: string, path: string) => {
    metrics.increment('http.requests', 1, { method, path });
  },

  requestCompleted: (method: string, path: string, statusCode: number, duration: number) => {
    metrics.increment('http.requests.completed', 1, {
      method,
      path,
      status: statusCode.toString(),
    });
    metrics.timing('http.request.duration', duration, { method, path });
  },

  databaseQuery: (operation: string, duration: number) => {
    metrics.increment('db.queries', 1, { operation });
    metrics.timing('db.query.duration', duration, { operation });
  },

  cacheHit: (key: string) => {
    metrics.increment('cache.hits', 1, { key });
  },

  cacheMiss: (key: string) => {
    metrics.increment('cache.misses', 1, { key });
  },

  errorOccurred: (type: string, severity: string) => {
    metrics.increment('errors.total', 1, { type, severity });
  },
};

/**
 * Middleware para medir performance de requests
 */
export function performanceMiddleware(req: any, res: any, next: Function) {
  const start = Date.now();

  SystemMetrics.requestReceived(req.method, req.path);

  // Capturar quando response terminar
  res.on('finish', () => {
    const duration = Date.now() - start;
    SystemMetrics.requestCompleted(req.method, req.path, res.statusCode, duration);
  });

  next();
}

/**
 * Decorator para medir performance de funções
 */
export function measurePerformance(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const start = Date.now();
    try {
      const result = await originalMethod.apply(this, args);
      const duration = Date.now() - start;
      metrics.timing(`function.${propertyKey}`, duration);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      metrics.timing(`function.${propertyKey}.error`, duration);
      throw error;
    }
  };

  return descriptor;
}

/**
 * Helper para medir blocos de código
 */
export async function measure<T>(
  name: string,
  fn: () => Promise<T> | T
): Promise<T> {
  const start = Date.now();
  try {
    const result = await fn();
    const duration = Date.now() - start;
    metrics.timing(name, duration);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    metrics.timing(`${name}.error`, duration);
    throw error;
  }
}

/**
 * Endpoint para expor métricas (formato Prometheus)
 */
export function getMetricsEndpoint() {
  const allMetrics = metrics.getMetrics();
  
  let output = '# HELP rotinacare_metrics Application metrics\n';
  output += '# TYPE rotinacare_metrics counter\n';

  for (const [name, value] of Object.entries(allMetrics)) {
    output += `rotinacare_${name.replace(/\./g, '_')} ${value}\n`;
  }

  return output;
}

/**
 * Retorna métricas em formato JSON
 */
export function getMetricsJSON() {
  return {
    counters: metrics.getMetrics(),
    histograms: {
      'http.request.duration': metrics.getHistogramStats('http.request.duration'),
      'db.query.duration': metrics.getHistogramStats('db.query.duration'),
    },
    timestamp: new Date().toISOString(),
  };
}
