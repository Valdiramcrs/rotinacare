import express from 'express';
import { logger } from './lib/logger';
import { initSentry, sentryRequestHandler, sentryTracingHandler, sentryErrorHandler } from './lib/sentry';
import { httpLogger, requestIdMiddleware, errorLoggingMiddleware } from './middleware/logging';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createContext } from './trpc';
import { performanceMiddleware, getMetricsEndpoint, getMetricsJSON } from './lib/metrics';
import { performHealthCheck, livenessCheck, readinessCheck } from './lib/health';

const app = express();

// Inicializar Sentry
initSentry(app);

// Sentry request handler (deve ser o primeiro middleware)
app.use(sentryRequestHandler);
app.use(sentryTracingHandler);

// Request ID middleware
app.use(requestIdMiddleware);

// HTTP logging middleware
app.use(httpLogger);

// Performance monitoring middleware
app.use(performanceMiddleware);

// CORS configurado para aceitar requests de todos os subdomínios
app.use(cors({
  origin: [
    'https://rotinacare.com',
    'https://app.rotinacare.com',
    'https://admin.rotinacare.com',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
  ],
  credentials: true,
}));

app.use(express.json());

// tRPC middleware
app.use('/api/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
}));

// Health check endpoints
app.get('/api/health', async (req, res) => {
  const health = await performHealthCheck();
  const statusCode = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503;
  res.status(statusCode).json(health);
});

app.get('/api/health/live', (req, res) => {
  res.json(livenessCheck());
});

app.get('/api/health/ready', async (req, res) => {
  const ready = await readinessCheck();
  res.status(ready.ready ? 200 : 503).json(ready);
});

// Metrics endpoint
app.get('/api/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(getMetricsEndpoint());
});

app.get('/api/metrics/json', (req, res) => {
  res.json(getMetricsJSON());
});

const PORT = process.env.PORT || 4000;

// Error logging middleware
app.use(errorLoggingMiddleware);

// Sentry error handler (deve ser o último middleware)
app.use(sentryErrorHandler);

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`📊 Health check: http://localhost:${PORT}/api/health`);
  logger.info(`🔌 tRPC endpoint: http://localhost:${PORT}/api/trpc`);
});

export type AppRouter = typeof appRouter;
