import { db } from '../db';
import { sql } from 'drizzle-orm';
import { logger } from './logger';

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  checks: {
    database: HealthCheck;
    memory: HealthCheck;
    [key: string]: HealthCheck;
  };
}

export interface HealthCheck {
  status: 'pass' | 'warn' | 'fail';
  message?: string;
  responseTime?: number;
  details?: Record<string, any>;
}

const startTime = Date.now();

/**
 * Verifica saúde do banco de dados
 */
async function checkDatabase(): Promise<HealthCheck> {
  const start = Date.now();
  
  try {
    // Tenta fazer uma query simples
    await db.execute(sql`SELECT 1`)
    
    const responseTime = Date.now() - start;
    
    return {
      status: responseTime < 100 ? 'pass' : 'warn',
      message: responseTime < 100 ? 'Database is healthy' : 'Database is slow',
      responseTime,
    };
  } catch (error) {
    logger.error({ err: error }, 'Database health check failed');
    
    return {
      status: 'fail',
      message: 'Database connection failed',
      responseTime: Date.now() - start,
      details: {
        error: (error as Error).message,
      },
    };
  }
}

/**
 * Verifica uso de memória
 */
function checkMemory(): HealthCheck {
  const usage = process.memoryUsage();
  const heapUsedMB = Math.round(usage.heapUsed / 1024 / 1024);
  const heapTotalMB = Math.round(usage.heapTotal / 1024 / 1024);
  const percentage = (heapUsedMB / heapTotalMB) * 100;

  let status: 'pass' | 'warn' | 'fail' = 'pass';
  let message = 'Memory usage is normal';

  if (percentage > 90) {
    status = 'fail';
    message = 'Memory usage is critical';
  } else if (percentage > 75) {
    status = 'warn';
    message = 'Memory usage is high';
  }

  return {
    status,
    message,
    details: {
      heapUsed: `${heapUsedMB}MB`,
      heapTotal: `${heapTotalMB}MB`,
      percentage: `${percentage.toFixed(1)}%`,
      rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
      external: `${Math.round(usage.external / 1024 / 1024)}MB`,
    },
  };
}

/**
 * Health check completo
 */
export async function performHealthCheck(): Promise<HealthCheckResult> {
  const checks = {
    database: await checkDatabase(),
    memory: checkMemory(),
  };

  // Determinar status geral
  let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
  
  const hasFailure = Object.values(checks).some((check) => check.status === 'fail');
  const hasWarning = Object.values(checks).some((check) => check.status === 'warn');

  if (hasFailure) {
    overallStatus = 'unhealthy';
  } else if (hasWarning) {
    overallStatus = 'degraded';
  }

  return {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000), // segundos
    version: process.env.RELEASE_VERSION || 'dev',
    checks,
  };
}

/**
 * Health check simples (liveness probe)
 */
export function livenessCheck(): { alive: boolean } {
  return { alive: true };
}

/**
 * Readiness check (pronto para receber tráfego)
 */
export async function readinessCheck(): Promise<{ ready: boolean; reason?: string }> {
  try {
    // Verificar apenas banco de dados
    const dbCheck = await checkDatabase();
    
    if (dbCheck.status === 'fail') {
      return {
        ready: false,
        reason: 'Database is not available',
      };
    }

    return { ready: true };
  } catch (error) {
    return {
      ready: false,
      reason: (error as Error).message,
    };
  }
}
