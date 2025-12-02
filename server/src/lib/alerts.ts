import { logger } from './logger.js';
import { captureMessage } from './sentry.js';

export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface Alert {
  title: string;
  message: string;
  severity: AlertSeverity;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AlertChannel {
  name: string;
  send: (alert: Alert) => Promise<void>;
}

/**
 * Sistema de alertas
 */
class AlertManager {
  private channels: AlertChannel[] = [];
  private alertHistory: Alert[] = [];
  private maxHistorySize = 1000;

  /**
   * Registra canal de alerta
   */
  registerChannel(channel: AlertChannel) {
    this.channels.push(channel);
    logger.info(`Alert channel registered: ${channel.name}`);
  }

  /**
   * Envia alerta para todos os canais
   */
  async sendAlert(alert: Alert) {
    // Adicionar ao histórico
    this.alertHistory.unshift(alert);
    if (this.alertHistory.length > this.maxHistorySize) {
      this.alertHistory.pop();
    }

    // Log do alerta
    logger[alert.severity === 'critical' || alert.severity === 'error' ? 'error' : 'warn'](
      {
        alert: alert.title,
        severity: alert.severity,
        metadata: alert.metadata,
      },
      alert.message
    );

    // Enviar para Sentry se for crítico ou erro
    if (alert.severity === 'critical' || alert.severity === 'error') {
      captureMessage(
        `[${alert.severity.toUpperCase()}] ${alert.title}: ${alert.message}`,
        alert.severity === 'critical' ? 'fatal' : 'error',
        alert.metadata
      );
    }

    // Enviar para todos os canais
    const promises = this.channels.map((channel) =>
      channel.send(alert).catch((error) => {
        logger.error(
          { err: error, channel: channel.name },
          `Failed to send alert via ${channel.name}`
        );
      })
    );

    await Promise.allSettled(promises);
  }

  /**
   * Retorna histórico de alertas
   */
  getHistory(limit: number = 100): Alert[] {
    return this.alertHistory.slice(0, limit);
  }

  /**
   * Limpa histórico
   */
  clearHistory() {
    this.alertHistory = [];
  }
}

export const alertManager = new AlertManager();

/**
 * Canal de alerta via Webhook (Slack, Discord, etc)
 */
export class WebhookAlertChannel implements AlertChannel {
  name = 'webhook';

  constructor(private webhookUrl: string) {}

  async send(alert: Alert): Promise<void> {
    const payload = {
      text: `🚨 ${alert.title}`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `${this.getSeverityEmoji(alert.severity)} ${alert.title}`,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Severity:*\n${alert.severity.toUpperCase()}`,
            },
            {
              type: 'mrkdwn',
              text: `*Time:*\n${alert.timestamp.toISOString()}`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message:*\n${alert.message}`,
          },
        },
      ],
    };

    if (alert.metadata) {
      payload.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Metadata:*\n\`\`\`${JSON.stringify(alert.metadata, null, 2)}\`\`\``,
        },
      });
    }

    const response = await fetch(this.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.statusText}`);
    }
  }

  private getSeverityEmoji(severity: AlertSeverity): string {
    const emojis = {
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌',
      critical: '🔥',
    };
    return emojis[severity];
  }
}

/**
 * Canal de alerta via Email (usando serviço SMTP)
 */
export class EmailAlertChannel implements AlertChannel {
  name = 'email';

  constructor(
    private recipients: string[],
    private smtpConfig?: {
      host: string;
      port: number;
      user: string;
      pass: string;
    }
  ) {}

  async send(alert: Alert): Promise<void> {
    // Implementação simplificada
    // Em produção, usar nodemailer ou serviço de email
    logger.info(
      {
        recipients: this.recipients,
        alert: alert.title,
      },
      'Email alert would be sent'
    );
  }
}

/**
 * Helpers para criar alertas comuns
 */
export const Alerts = {
  highErrorRate: (errorCount: number, timeWindow: string) => {
    alertManager.sendAlert({
      title: 'High Error Rate Detected',
      message: `${errorCount} errors occurred in the last ${timeWindow}`,
      severity: 'error',
      timestamp: new Date(),
      metadata: { errorCount, timeWindow },
    });
  },

  databaseConnectionFailed: (error: Error) => {
    alertManager.sendAlert({
      title: 'Database Connection Failed',
      message: `Failed to connect to database: ${error.message}`,
      severity: 'critical',
      timestamp: new Date(),
      metadata: { error: error.message },
    });
  },

  highMemoryUsage: (percentage: number) => {
    alertManager.sendAlert({
      title: 'High Memory Usage',
      message: `Memory usage is at ${percentage}%`,
      severity: percentage > 90 ? 'critical' : 'warning',
      timestamp: new Date(),
      metadata: { percentage },
    });
  },

  slowResponse: (endpoint: string, duration: number) => {
    alertManager.sendAlert({
      title: 'Slow Response Time',
      message: `Endpoint ${endpoint} took ${duration}ms to respond`,
      severity: 'warning',
      timestamp: new Date(),
      metadata: { endpoint, duration },
    });
  },

  deploymentStarted: (version: string) => {
    alertManager.sendAlert({
      title: 'Deployment Started',
      message: `Deploying version ${version}`,
      severity: 'info',
      timestamp: new Date(),
      metadata: { version },
    });
  },

  deploymentCompleted: (version: string) => {
    alertManager.sendAlert({
      title: 'Deployment Completed',
      message: `Successfully deployed version ${version}`,
      severity: 'info',
      timestamp: new Date(),
      metadata: { version },
    });
  },
};

/**
 * Inicializa sistema de alertas
 */
export function initAlerts() {
  // Registrar canal Slack se configurado
  const slackWebhook = process.env.SLACK_WEBHOOK_URL;
  if (slackWebhook) {
    alertManager.registerChannel(new WebhookAlertChannel(slackWebhook));
    logger.info('Slack alerts enabled');
  }

  // Registrar canal Discord se configurado
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhook) {
    alertManager.registerChannel(new WebhookAlertChannel(discordWebhook));
    logger.info('Discord alerts enabled');
  }

  // Registrar canal Email se configurado
  const emailRecipients = process.env.ALERT_EMAIL_RECIPIENTS?.split(',');
  if (emailRecipients && emailRecipients.length > 0) {
    alertManager.registerChannel(new EmailAlertChannel(emailRecipients));
    logger.info('Email alerts enabled');
  }

  logger.info('Alert system initialized');
}
