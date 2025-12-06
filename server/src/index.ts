import express from 'express';
import { logger } from './lib/logger.js';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index.js';
import { createContext } from './trpc.js';
// REMOVIDO: Rotas Supabase Auth (conflitante com tRPC JWT)
// import authRoutes from './routes/auth.js';
import googleCalendarRoutes from './routes/googleCalendar.js';
import googleAuthRoutes from './routes/googleAuth.js';
import emailRoutes from './routes/email.js';
import cronRoutes from './routes/cron.js';
import whatsappRoutes from './routes/whatsapp.js';
import { authMiddleware, AuthenticatedRequest } from './middleware/auth.js';
import { getAuthorizationUrl } from './services/googleCalendar.js';
import { Response } from 'express';

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

// Google OAuth routes (social login)
app.use('/api/auth', googleAuthRoutes);

// Google Calendar auth-url route (direct registration to avoid timeout)
app.get('/api/google-calendar/auth-url', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log('[Google Calendar] Direct route: Generating auth URL for user:', req.user!.userId);
    const authUrl = getAuthorizationUrl(req.user!.userId);
    console.log('[Google Calendar] Direct route: Auth URL generated successfully');
    return res.json({ 
      url: authUrl,
      message: 'Redirect user to this URL to authorize Google Calendar access'
    });
  } catch (error: any) {
    console.error('[Google Calendar] Direct route: Failed to generate auth URL:', error);
    return res.status(500).json({ 
      error: 'Failed to generate authorization URL',
      details: error.message
    });
  }
});

// Google Calendar routes (other routes)
app.use('/api/google-calendar', googleCalendarRoutes);

// Email routes
app.use('/api/email', emailRoutes);

// Cron routes
app.use('/api/cron', cronRoutes);

// WhatsApp routes (admin only)
app.use('/api/whatsapp', whatsappRoutes);

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
