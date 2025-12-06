import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

class WhatsAppService {
  private client: Client | null = null;
  private isReady: boolean = false;
  private qrCode: string | null = null;

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.client = new Client({
      authStrategy: new LocalAuth({
        dataPath: './.wwebjs_auth',
      }),
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
        ],
      },
    });

    this.client.on('qr', (qr) => {
      console.log('[WhatsApp] QR Code received');
      this.qrCode = qr;
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('[WhatsApp] Client is ready!');
      this.isReady = true;
      this.qrCode = null;
    });

    this.client.on('authenticated', () => {
      console.log('[WhatsApp] Authenticated');
    });

    this.client.on('auth_failure', (msg) => {
      console.error('[WhatsApp] Authentication failure:', msg);
      this.isReady = false;
    });

    this.client.on('disconnected', (reason) => {
      console.log('[WhatsApp] Client was disconnected:', reason);
      this.isReady = false;
    });

    this.client.on('message', async (message: Message) => {
      console.log('[WhatsApp] Message received:', message.body);
      
      // Auto-responder (exemplo)
      if (message.body.toLowerCase() === 'oi') {
        await message.reply('Olá! Esta é uma mensagem automática do RotinaCare. 👋');
      }
    });
  }

  async start() {
    if (!this.client) {
      throw new Error('WhatsApp client not initialized');
    }

    try {
      await this.client.initialize();
      console.log('[WhatsApp] Client initialization started');
    } catch (error) {
      console.error('[WhatsApp] Failed to start client:', error);
      throw error;
    }
  }

  async stop() {
    if (this.client) {
      await this.client.destroy();
      this.isReady = false;
      console.log('[WhatsApp] Client stopped');
    }
  }

  getStatus() {
    return {
      isReady: this.isReady,
      hasQRCode: !!this.qrCode,
      qrCode: this.qrCode,
    };
  }

  async sendMessage(phoneNumber: string, message: string): Promise<boolean> {
    if (!this.isReady || !this.client) {
      throw new Error('WhatsApp client is not ready');
    }

    try {
      // Formatar número: remover caracteres especiais e adicionar @c.us
      const formattedNumber = phoneNumber.replace(/\D/g, '') + '@c.us';
      
      await this.client.sendMessage(formattedNumber, message);
      console.log(`[WhatsApp] Message sent to ${phoneNumber}`);
      return true;
    } catch (error) {
      console.error('[WhatsApp] Failed to send message:', error);
      throw error;
    }
  }

  async sendMedicationReminder(phoneNumber: string, data: {
    patientName: string;
    medicationName: string;
    dosage: string;
    time: string;
  }): Promise<boolean> {
    const message = `🏥 *Lembrete de Medicamento - RotinaCare*

Olá ${data.patientName}! 👋

💊 *Medicamento:* ${data.medicationName}
📏 *Dosagem:* ${data.dosage}
🕐 *Horário:* ${data.time}

Não esqueça de tomar seu medicamento! 💚

_Enviado automaticamente via RotinaCare_`;

    return this.sendMessage(phoneNumber, message);
  }

  async sendAppointmentReminder(phoneNumber: string, data: {
    patientName: string;
    doctorName: string;
    date: string;
    time: string;
    location: string;
  }): Promise<boolean> {
    const message = `📅 *Lembrete de Consulta - RotinaCare*

Olá ${data.patientName}! 👋

Você tem uma consulta agendada:

👨‍⚕️ *Médico:* ${data.doctorName}
📆 *Data:* ${data.date}
🕐 *Horário:* ${data.time}
📍 *Local:* ${data.location}

Por favor, confirme sua presença respondendo esta mensagem. ✅

_Enviado automaticamente via RotinaCare_`;

    return this.sendMessage(phoneNumber, message);
  }

  async sendExamResult(phoneNumber: string, data: {
    patientName: string;
    examName: string;
    result: string;
    doctorName?: string;
  }): Promise<boolean> {
    const message = `🔬 *Resultado de Exame Disponível - RotinaCare*

Olá ${data.patientName}! 👋

Seu resultado de exame está disponível:

📋 *Exame:* ${data.examName}
📊 *Resultado:* ${data.result}
${data.doctorName ? `👨‍⚕️ *Médico responsável:* ${data.doctorName}` : ''}

Acesse o app para visualizar os detalhes completos: https://app.rotinacare.com

_Enviado automaticamente via RotinaCare_`;

    return this.sendMessage(phoneNumber, message);
  }

  async sendBulkMessages(messages: Array<{ phoneNumber: string; message: string }>): Promise<{
    success: number;
    failed: number;
    errors: Array<{ phoneNumber: string; error: string }>;
  }> {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ phoneNumber: string; error: string }>,
    };

    for (const msg of messages) {
      try {
        await this.sendMessage(msg.phoneNumber, msg.message);
        results.success++;
        
        // Delay entre mensagens para evitar bloqueio (3-5 segundos)
        await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
      } catch (error) {
        results.failed++;
        results.errors.push({
          phoneNumber: msg.phoneNumber,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return results;
  }
}

// Singleton instance
let whatsappServiceInstance: WhatsAppService | null = null;

export function getWhatsAppService(): WhatsAppService {
  if (!whatsappServiceInstance) {
    whatsappServiceInstance = new WhatsAppService();
  }
  return whatsappServiceInstance;
}

export { WhatsAppService };
