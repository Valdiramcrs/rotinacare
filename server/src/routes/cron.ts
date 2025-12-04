import { Router, Request, Response } from 'express';
import { processAppointmentReminders, retryFailedReminders } from '../services/appointmentReminders.js';

const router = Router();

/**
 * POST /api/cron/reminders
 * Processa lembretes de consulta
 * Deve ser chamado a cada hora via cron job externo
 */
router.post('/reminders', async (req: Request, res: Response) => {
  try {
    // Verificar API key para segurança
    const apiKey = req.headers['x-api-key'] || req.headers['x-cron-key'];
    
    if (apiKey !== process.env.CRON_API_KEY) {
      console.warn('[Cron] Unauthorized access attempt to /reminders');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('[Cron] Processing reminders triggered');
    
    const result = await processAppointmentReminders();
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (error: any) {
    console.error('[Cron] Failed to process reminders:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process reminders',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * POST /api/cron/reminders/retry
 * Tenta reenviar lembretes que falharam
 */
router.post('/reminders/retry', async (req: Request, res: Response) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.headers['x-cron-key'];
    
    if (apiKey !== process.env.CRON_API_KEY) {
      console.warn('[Cron] Unauthorized access attempt to /reminders/retry');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('[Cron] Retry reminders triggered');
    
    const result = await retryFailedReminders();
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (error: any) {
    console.error('[Cron] Failed to retry reminders:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retry reminders',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * GET /api/cron/health
 * Health check para o cron job
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'appointment-reminders',
    version: '1.0.0',
  });
});

export default router;
