import { Router, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { db } from '../db/index.js';
import { users, googleCalendarTokens } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { generateToken, verifyToken } from '../lib/auth.js';
import { randomUUID } from 'crypto';

const router = Router();

// Configurar cliente OAuth2
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

/**
 * GET /api/auth/google
 * Inicia o fluxo OAuth - redireciona para página de login do Google
 */
router.get('/google', (req: Request, res: Response) => {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/calendar',
      ],
      prompt: 'consent', // Força mostrar tela de consentimento para obter refresh_token
    });

    console.log('[Google OAuth] Auth URL generated');
    res.redirect(authUrl);
  } catch (error: any) {
    console.error('[Google OAuth] Failed to generate auth URL:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'https://app.rotinacare.com';
    res.redirect(`${frontendUrl}/login?error=oauth_failed`);
  }
});

/**
 * GET /api/auth/google/callback
 * Callback do OAuth - recebe código do Google e cria/autentica usuário
 */
router.get('/google/callback', async (req: Request, res: Response) => {
  const frontendUrl = process.env.FRONTEND_URL || 'https://app.rotinacare.com';

  try {
    const { code, error: oauthError } = req.query;

    // Google pode retornar erro se usuário negou acesso
    if (oauthError) {
      console.error('[Google OAuth] OAuth error:', oauthError);
      return res.redirect(`${frontendUrl}/login?error=access_denied`);
    }

    if (!code || typeof code !== 'string') {
      console.error('[Google OAuth] Missing authorization code');
      return res.redirect(`${frontendUrl}/login?error=missing_code`);
    }

    console.log('[Google OAuth] Processing callback...');

    // Trocar código por tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Obter informações do usuário
    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new Error('Failed to get user info from Google');
    }

    const googleEmail = payload.email;
    const googleName = payload.name || googleEmail.split('@')[0];
    const googleAvatar = payload.picture || null;
    const googleId = payload.sub;

    console.log('[Google OAuth] User info retrieved:', googleEmail);

    // Verificar se usuário já existe
    let [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, googleEmail))
      .limit(1);

    const now = new Date();

    if (!user) {
      // Criar novo usuário
      const userId = randomUUID();
      
      await db.insert(users).values({
        id: userId,
        email: googleEmail,
        name: googleName,
        password: '', // Sem senha para login social
        role: 'patient',
        avatarUrl: googleAvatar,
        googleId: googleId,
        googleAccessToken: tokens.access_token || null,
        googleRefreshToken: tokens.refresh_token || null,
        isPatient: true,
        isAdmin: false,
        isProfessional: false,
        createdAt: now,
        updatedAt: now,
      });

      // Buscar usuário recém-criado
      [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      console.log('[Google OAuth] New user created:', userId);
    } else {
      // Atualizar tokens do Google no usuário existente
      await db
        .update(users)
        .set({
          googleId: googleId,
          googleAccessToken: tokens.access_token || null,
          googleRefreshToken: tokens.refresh_token || user.googleRefreshToken, // Manter refresh_token anterior se não vier novo
          avatarUrl: googleAvatar || user.avatarUrl,
          updatedAt: now,
        })
        .where(eq(users.id, user.id));

      console.log('[Google OAuth] User tokens updated:', user.id);
    }

    // Gerar token JWT
    const jwtToken = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as 'patient' | 'admin' | 'professional',
      isProfessional: user.isProfessional || false,
      isAdmin: user.isAdmin || false,
    });

    // Redirecionar para o frontend com token
    res.redirect(`${frontendUrl}/auth/callback?token=${jwtToken}`);
  } catch (error: any) {
    console.error('[Google OAuth] Callback error:', error);
    res.redirect(`${frontendUrl}/login?error=auth_failed&message=${encodeURIComponent(error.message)}`);
  }
});

/**
 * POST /api/auth/google/disconnect
 * Desconecta conta Google do usuário (remove tokens e googleId)
 */
router.post('/google/disconnect', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = decoded.userId;

    console.log('[Google Disconnect] Disconnecting user:', userId);

    // Remover tokens do Google da tabela users
    await db
      .update(users)
      .set({
        googleId: null,
        googleAccessToken: null,
        googleRefreshToken: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    // Remover tokens do Google Calendar (se existirem)
    await db
      .delete(googleCalendarTokens)
      .where(eq(googleCalendarTokens.userId, userId));

    console.log('[Google Disconnect] User disconnected successfully');

    res.json({ 
      success: true, 
      message: 'Google account disconnected successfully' 
    });
  } catch (error: any) {
    console.error('[Google Disconnect] Error:', error);
    res.status(500).json({ 
      error: 'Failed to disconnect Google account',
      message: error.message 
    });
  }
});

export default router;
