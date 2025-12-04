import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

// ============================================
// CONFIGURAÇÃO
// ============================================

let transporter: Transporter | null = null;

/**
 * Obter transporter SMTP configurado
 */
function getEmailTransporter(): Transporter | null {
  // Reutilizar transporter existente
  if (transporter) return transporter;

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn('[Email] SMTP not configured. Required variables: SMTP_HOST, SMTP_USER, SMTP_PASS');
    return null;
  }

  try {
    const port = parseInt(smtpPort || '587');
    
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure: port === 465, // SSL para porta 465
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      // Configurações adicionais para Gmail
      ...(smtpHost.includes('gmail') && {
        tls: {
          rejectUnauthorized: false,
        },
      }),
    });

    console.log('[Email] SMTP transporter configured:', {
      host: smtpHost,
      port,
      user: smtpUser,
    });
    
    return transporter;
  } catch (error) {
    console.error('[Email] Failed to configure SMTP transporter:', error);
    return null;
  }
}

// ============================================
// FUNÇÕES PRINCIPAIS
// ============================================

/**
 * Enviar email genérico
 */
export async function sendEmail(options: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}): Promise<boolean> {
  const emailTransporter = getEmailTransporter();

  if (!emailTransporter) {
    console.error('[Email] Cannot send email: SMTP not configured');
    return false;
  }

  try {
    const emailFrom = options.from || process.env.EMAIL_FROM || 'RotinaCare <noreply@rotinacare.com>';

    const result = await emailTransporter.sendMail({
      from: emailFrom,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
    });

    console.log('[Email] Email sent:', {
      to: options.to,
      subject: options.subject,
      messageId: result.messageId,
    });
    
    return true;
  } catch (error) {
    console.error('[Email] Failed to send email:', error);
    return false;
  }
}

/**
 * Testar configuração SMTP
 */
export async function testEmailConfiguration(): Promise<{
  success: boolean;
  message: string;
}> {
  const emailTransporter = getEmailTransporter();

  if (!emailTransporter) {
    return { 
      success: false, 
      message: 'SMTP not configured. Check environment variables.' 
    };
  }

  try {
    await emailTransporter.verify();
    console.log('[Email] SMTP configuration verified successfully');
    return { 
      success: true, 
      message: 'SMTP configuration is valid' 
    };
  } catch (error: any) {
    console.error('[Email] SMTP verification failed:', error);
    return { 
      success: false, 
      message: `SMTP verification failed: ${error.message}` 
    };
  }
}

// ============================================
// TEMPLATES DE EMAIL
// ============================================

/**
 * Template base para emails
 */
function getEmailTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6; 
          color: #1f2937;
          background-color: #f3f4f6;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .header { 
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
          color: white; 
          padding: 30px; 
          text-align: center; 
          border-radius: 12px 12px 0 0; 
        }
        .header h1 {
          font-size: 24px;
          font-weight: 600;
        }
        .content { 
          background-color: #ffffff; 
          padding: 30px; 
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .info-box { 
          background-color: #f9fafb; 
          padding: 20px; 
          border-left: 4px solid #6366f1; 
          margin: 20px 0; 
          border-radius: 0 8px 8px 0; 
        }
        .info-item { 
          margin: 12px 0; 
        }
        .info-label { 
          font-weight: 600; 
          color: #6366f1; 
        }
        .button { 
          display: inline-block; 
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
          color: white !important; 
          padding: 14px 28px; 
          text-decoration: none; 
          border-radius: 8px; 
          margin: 20px 0; 
          font-weight: 600;
        }
        .button:hover {
          opacity: 0.9;
        }
        .footer { 
          text-align: center; 
          color: #6b7280; 
          font-size: 12px; 
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }
        .footer a {
          color: #6366f1;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${content}
        <div class="footer">
          <p>Atenciosamente,<br/><strong>Equipe RotinaCare</strong></p>
          <p style="margin-top: 15px;">
            <a href="https://app.rotinacare.com">Acessar RotinaCare</a>
          </p>
          <p style="font-size: 10px; color: #9ca3af; margin-top: 15px;">
            Este é um email automático. Por favor, não responda diretamente.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Enviar lembrete de consulta
 */
export async function sendAppointmentReminder(options: {
  to: string;
  patientName: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  videoConferenceLink?: string;
}): Promise<boolean> {
  const content = `
    <div class="header">
      <h1>🏥 Lembrete de Consulta</h1>
    </div>
    <div class="content">
      <p>Olá, <strong>${options.patientName}</strong>!</p>
      <p>Este é um lembrete da sua consulta agendada para amanhã:</p>
      
      <div class="info-box">
        <div class="info-item">
          <span class="info-label">📋 Título:</span> ${options.title}
        </div>
        <div class="info-item">
          <span class="info-label">📅 Data:</span> ${options.date}
        </div>
        <div class="info-item">
          <span class="info-label">🕐 Horário:</span> ${options.time}
        </div>
        ${options.location ? `
        <div class="info-item">
          <span class="info-label">📍 Local:</span> ${options.location}
        </div>
        ` : ''}
        ${options.videoConferenceLink ? `
        <div class="info-item">
          <span class="info-label">💻 Videoconferência:</span><br/>
          <a href="${options.videoConferenceLink}" class="button">
            Entrar no Google Meet
          </a>
        </div>
        ` : ''}
      </div>
      
      <p><strong>Não esqueça de comparecer!</strong></p>
      <p>Se precisar remarcar, acesse sua agenda no RotinaCare.</p>
    </div>
  `;

  return sendEmail({
    to: options.to,
    subject: `🏥 Lembrete: ${options.title} - Amanhã às ${options.time}`,
    html: getEmailTemplate(content),
  });
}

/**
 * Enviar email de boas-vindas
 */
export async function sendWelcomeEmail(options: {
  to: string;
  name: string;
}): Promise<boolean> {
  const content = `
    <div class="header">
      <h1>🎉 Bem-vindo ao RotinaCare!</h1>
    </div>
    <div class="content">
      <p>Olá, <strong>${options.name}</strong>!</p>
      <p>Estamos muito felizes em ter você conosco. O RotinaCare foi criado para ajudar você a gerenciar sua saúde de forma simples e organizada.</p>
      
      <div class="info-box">
        <h3 style="margin-bottom: 15px; color: #6366f1;">O que você pode fazer:</h3>
        <div class="info-item">✅ Cadastrar seus médicos e profissionais de saúde</div>
        <div class="info-item">✅ Registrar medicamentos e receber lembretes</div>
        <div class="info-item">✅ Acompanhar exames e diagnósticos</div>
        <div class="info-item">✅ Agendar consultas e sincronizar com Google Calendar</div>
        <div class="info-item">✅ Gerar insights com Inteligência Artificial</div>
      </div>
      
      <p style="text-align: center;">
        <a href="https://app.rotinacare.com/dashboard" class="button">
          Acessar meu painel
        </a>
      </p>
    </div>
  `;

  return sendEmail({
    to: options.to,
    subject: '🎉 Bem-vindo ao RotinaCare!',
    html: getEmailTemplate(content),
  });
}

/**
 * Enviar notificação genérica
 */
export async function sendNotification(options: {
  to: string;
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
}): Promise<boolean> {
  const content = `
    <div class="header">
      <h1>🔔 ${options.title}</h1>
    </div>
    <div class="content">
      <p>${options.message}</p>
      
      ${options.actionUrl ? `
      <p style="text-align: center;">
        <a href="${options.actionUrl}" class="button">
          ${options.actionText || 'Ver detalhes'}
        </a>
      </p>
      ` : ''}
    </div>
  `;

  return sendEmail({
    to: options.to,
    subject: `🔔 ${options.title}`,
    html: getEmailTemplate(content),
  });
}
