import { Router, Request, Response } from 'express';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.js';
import {
  getAuthorizationUrl,
  exchangeCodeForTokens,
  isConnected,
  disconnect,
  listUserCalendars,
  syncEventToGoogle,
  deleteEventFromGoogle,
  getConnectionInfo,
} from '../services/googleCalendar.js';

const router = Router();

// ============================================
// OAUTH FLOW
// ============================================

/**
 * GET /api/google-calendar/auth-url
 * Retorna URL para iniciar fluxo OAuth
 */
router.get('/auth-url', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const authUrl = getAuthorizationUrl(req.user!.id);
    
    console.log('[Google Calendar] Auth URL generated for user:', req.user!.id);
    
    res.json({ 
      url: authUrl,
      message: 'Redirect user to this URL to authorize Google Calendar access'
    });
  } catch (error: any) {
    console.error('[Google Calendar] Failed to generate auth URL:', error);
    res.status(500).json({ 
      error: 'Failed to generate authorization URL',
      details: error.message
    });
  }
});

/**
 * GET /api/google-calendar/callback
 * Callback do OAuth - recebe código do Google após autorização
 */
router.get('/callback', async (req: Request, res: Response) => {
  try {
    const { code, state, error: oauthError } = req.query;
    
    // Google pode retornar erro se usuário negou acesso
    if (oauthError) {
      console.error('[Google Calendar] OAuth error:', oauthError);
      return res.redirect('https://app.rotinacare.com/calendar?error=access_denied');
    }
    
    if (!code || typeof code !== 'string') {
      console.error('[Google Calendar] Missing authorization code');
      return res.redirect('https://app.rotinacare.com/calendar?error=missing_code');
    }
    
    if (!state || typeof state !== 'string') {
      console.error('[Google Calendar] Missing state parameter');
      return res.redirect('https://app.rotinacare.com/calendar?error=missing_state');
    }
    
    const userId = state;
    
    console.log('[Google Calendar] Processing callback for user:', userId);
    
    await exchangeCodeForTokens(code, userId);
    
    console.log('[Google Calendar] Successfully connected for user:', userId);
    
    // Redirecionar para o app com sucesso
    res.redirect('https://app.rotinacare.com/calendar?connected=true');
  } catch (error: any) {
    console.error('[Google Calendar] OAuth callback error:', error);
    res.redirect(`https://app.rotinacare.com/calendar?error=auth_failed&message=${encodeURIComponent(error.message)}`);
  }
});

// ============================================
// STATUS E CONEXÃO
// ============================================

/**
 * GET /api/google-calendar/status
 * Verifica se usuário está conectado ao Google Calendar
 */
router.get('/status', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const connected = await isConnected(req.user!.id);
    const connectionInfo = connected ? await getConnectionInfo(req.user!.id) : null;
    
    res.json({ 
      connected,
      ...connectionInfo
    });
  } catch (error: any) {
    console.error('[Google Calendar] Failed to check status:', error);
    res.status(500).json({ error: 'Failed to check connection status' });
  }
});

/**
 * POST /api/google-calendar/disconnect
 * Desconecta Google Calendar do usuário
 */
router.post('/disconnect', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    await disconnect(req.user!.id);
    
    console.log('[Google Calendar] Disconnected for user:', req.user!.id);
    
    res.json({ 
      success: true,
      message: 'Google Calendar disconnected successfully'
    });
  } catch (error: any) {
    console.error('[Google Calendar] Failed to disconnect:', error);
    res.status(500).json({ error: 'Failed to disconnect Google Calendar' });
  }
});

// ============================================
// CALENDÁRIOS
// ============================================

/**
 * GET /api/google-calendar/calendars
 * Lista todas as agendas do usuário no Google Calendar
 */
router.get('/calendars', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const calendars = await listUserCalendars(req.user!.id);
    
    res.json({ 
      calendars,
      count: calendars.length
    });
  } catch (error: any) {
    console.error('[Google Calendar] Failed to list calendars:', error);
    
    // Se não está conectado
    if (error.message.includes('not connected')) {
      return res.status(400).json({ 
        error: 'Google Calendar not connected',
        code: 'NOT_CONNECTED'
      });
    }
    
    res.status(500).json({ error: 'Failed to list calendars' });
  }
});

// ============================================
// SINCRONIZAÇÃO DE EVENTOS
// ============================================

/**
 * POST /api/google-calendar/sync/:eventId
 * Sincroniza um evento específico com o Google Calendar
 * Cria automaticamente link do Google Meet
 */
router.post('/sync/:eventId', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { eventId } = req.params;
    const { calendarId } = req.body; // Opcional: qual agenda usar
    
    if (!eventId) {
      return res.status(400).json({ error: 'eventId is required' });
    }
    
    console.log('[Google Calendar] Syncing event:', eventId, 'to calendar:', calendarId || 'primary');
    
    const result = await syncEventToGoogle(
      req.user!.id,
      eventId,
      calendarId || 'primary'
    );
    
    res.json({ 
      success: true,
      googleEventId: result.googleEventId,
      meetLink: result.meetLink,
      htmlLink: result.htmlLink,
      message: 'Event synced to Google Calendar'
    });
  } catch (error: any) {
    console.error('[Google Calendar] Failed to sync event:', error);
    
    if (error.message.includes('not connected')) {
      return res.status(400).json({ 
        error: 'Google Calendar not connected',
        code: 'NOT_CONNECTED'
      });
    }
    
    if (error.message.includes('not found')) {
      return res.status(404).json({ 
        error: 'Event not found',
        code: 'EVENT_NOT_FOUND'
      });
    }
    
    res.status(500).json({ error: 'Failed to sync event to Google Calendar' });
  }
});

/**
 * DELETE /api/google-calendar/event/:googleEventId
 * Remove evento do Google Calendar
 */
router.delete('/event/:googleEventId', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { googleEventId } = req.params;
    const { calendarId } = req.query;
    
    if (!googleEventId) {
      return res.status(400).json({ error: 'googleEventId is required' });
    }
    
    await deleteEventFromGoogle(
      req.user!.id,
      googleEventId,
      (calendarId as string) || 'primary'
    );
    
    res.json({ 
      success: true,
      message: 'Event deleted from Google Calendar'
    });
  } catch (error: any) {
    console.error('[Google Calendar] Failed to delete event:', error);
    res.status(500).json({ error: 'Failed to delete event from Google Calendar' });
  }
});

export default router;
