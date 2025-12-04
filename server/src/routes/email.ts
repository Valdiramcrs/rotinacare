import { Router, Response } from 'express';
import { testEmailConfiguration, sendEmail } from '../services/emailService.js';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/email/test-config
 * Testa configuração SMTP
 */
router.get('/test-config', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await testEmailConfiguration();
    
    console.log('[Email] Configuration test result:', result);
    
    res.json(result);
  } catch (error: any) {
    console.error('[Email] Failed to test configuration:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to test email configuration',
      error: error.message
    });
  }
});

/**
 * POST /api/email/send-test
 * Envia email de teste
 */
router.post('/send-test', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { to } = req.body;
    
    if (!to) {
      return res.status(400).json({ error: 'to is required' });
    }
    
    console.log('[Email] Sending test email to:', to);
    
    const success = await sendEmail({
      to,
      subject: '✅ Teste RotinaCare - Email Service',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">✅ Teste de Configuração</h1>
          </div>
          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #6366f1; margin-bottom: 15px;">Email de Teste do RotinaCare</h2>
            <p style="color: #1f2937; line-height: 1.6;">
              Este é um email de teste do sistema RotinaCare.
            </p>
            <p style="color: #1f2937; line-height: 1.6; margin-top: 15px;">
              Se você recebeu este email, a configuração SMTP está funcionando perfeitamente! 🎉
            </p>
            <div style="background-color: #f9fafb; padding: 20px; border-left: 4px solid #6366f1; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #6366f1; font-weight: 600;">📅 Data do teste:</p>
              <p style="margin: 5px 0 0 0; color: #1f2937;">${new Date().toLocaleString('pt-BR', { 
                timeZone: 'America/Sao_Paulo',
                dateStyle: 'full',
                timeStyle: 'long'
              })}</p>
            </div>
            <p style="color: #1f2937; line-height: 1.6; margin-top: 20px;">
              <strong>Testado por:</strong> ${req.user!.email}
            </p>
          </div>
          <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p>Atenciosamente,<br/><strong>Equipe RotinaCare</strong></p>
            <p style="margin-top: 15px;">
              <a href="https://app.rotinacare.com" style="color: #6366f1; text-decoration: none;">Acessar RotinaCare</a>
            </p>
          </div>
        </div>
      `,
    });
    
    if (success) {
      console.log('[Email] Test email sent successfully to:', to);
      res.json({ 
        success: true,
        message: `Test email sent successfully to ${to}`
      });
    } else {
      console.error('[Email] Failed to send test email to:', to);
      res.status(500).json({ 
        success: false,
        message: 'Failed to send test email. Check server logs for details.'
      });
    }
  } catch (error: any) {
    console.error('[Email] Failed to send test email:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
});

export default router;
