import express from 'express';
import { logger } from './lib/logger.js';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index.js';
import { createContext } from './trpc.js';
// REMOVIDO: Rotas Supabase Auth (conflitante com tRPC JWT)
// import authRoutes from './routes/auth.js';
import googleCalendarRoutes from './routes/googleCalendar.js';
import emailRoutes from './routes/email.js';
import cronRoutes from './routes/cron.js';

const app = express();

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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
  });
});

// REMOVIDO: Rotas Supabase Auth (conflitante com tRPC JWT)
// Auth agora é feito via tRPC: /api/trpc/auth.login e /api/trpc/auth.register
// app.use('/api/auth', authRoutes);

// Google Calendar routes
app.use('/api/google-calendar', googleCalendarRoutes);

// Email routes
app.use('/api/email', emailRoutes);

// Cron routes
app.use('/api/cron', cronRoutes);

// tRPC middleware
app.use('/api/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`📊 Health check: http://localhost:${PORT}/api/health`);
  logger.info(`🔌 tRPC endpoint: http://localhost:${PORT}/api/trpc`);
});

export type AppRouter = typeof appRouter;
