import { Router } from 'express';
import { getWhatsAppService } from '../services/whatsappService';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Middleware para verificar se usuário é profissional ou admin
const requireProfessionalOrAdmin = (req: any, res: any, next: any) => {
  if (!req.user || (!req.user.isProfessional && !req.user.isAdmin)) {
    return res.status(403).json({ error: 'Access denied. Professional or Admin only.' });
  }
  next();
};

/**
 * GET /api/whatsapp/status
 * Retorna status da conexão WhatsApp
 */
router.get('/status', authMiddleware, requireProfessionalOrAdmin, (req, res) => {
  try {
    const whatsappService = getWhatsAppService();
    const status = whatsappService.getStatus();
    
    res.json({
      success: true,
      data: status,
    });
  } catch (error) {
    console.error('[WhatsApp API] Error getting status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get WhatsApp status',
    });
  }
});

/**
 * POST /api/whatsapp/start
 * Inicia serviço WhatsApp
 */
router.post('/start', authMiddleware, requireProfessionalOrAdmin, async (req, res) => {
  try {
    const whatsappService = getWhatsAppService();
    await whatsappService.start();
    
    res.json({
      success: true,
      message: 'WhatsApp service started. Check QR code in console.',
    });
  } catch (error) {
    console.error('[WhatsApp API] Error starting service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start WhatsApp service',
    });
  }
});

/**
 * POST /api/whatsapp/stop
 * Para serviço WhatsApp
 */
router.post('/stop', authMiddleware, requireProfessionalOrAdmin, async (req, res) => {
  try {
    const whatsappService = getWhatsAppService();
    await whatsappService.stop();
    
    res.json({
      success: true,
      message: 'WhatsApp service stopped',
    });
  } catch (error) {
    console.error('[WhatsApp API] Error stopping service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to stop WhatsApp service',
    });
  }
});

/**
 * POST /api/whatsapp/send
 * Envia mensagem individual
 */
router.post('/send', authMiddleware, requireProfessionalOrAdmin, async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({
        success: false,
        error: 'Phone number and message are required',
      });
    }

    const whatsappService = getWhatsAppService();
    await whatsappService.sendMessage(phoneNumber, message);

    res.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('[WhatsApp API] Error sending message:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message',
    });
  }
});

/**
 * POST /api/whatsapp/send-medication-reminder
 * Envia lembrete de medicamento
 */
router.post('/send-medication-reminder', authMiddleware, requireProfessionalOrAdmin, async (req, res) => {
  try {
    const { phoneNumber, patientName, medicationName, dosage, time } = req.body;

    if (!phoneNumber || !patientName || !medicationName || !dosage || !time) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required',
      });
    }

    const whatsappService = getWhatsAppService();
    await whatsappService.sendMedicationReminder(phoneNumber, {
      patientName,
      medicationName,
      dosage,
      time,
    });

    res.json({
      success: true,
      message: 'Medication reminder sent successfully',
    });
  } catch (error) {
    console.error('[WhatsApp API] Error sending medication reminder:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send reminder',
    });
  }
});

/**
 * POST /api/whatsapp/send-appointment-reminder
 * Envia lembrete de consulta
 */
router.post('/send-appointment-reminder', authMiddleware, requireProfessionalOrAdmin, async (req, res) => {
  try {
    const { phoneNumber, patientName, doctorName, date, time, location } = req.body;

    if (!phoneNumber || !patientName || !doctorName || !date || !time || !location) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required',
      });
    }

    const whatsappService = getWhatsAppService();
    await whatsappService.sendAppointmentReminder(phoneNumber, {
      patientName,
      doctorName,
      date,
      time,
      location,
    });

    res.json({
      success: true,
      message: 'Appointment reminder sent successfully',
    });
  } catch (error) {
    console.error('[WhatsApp API] Error sending appointment reminder:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send reminder',
    });
  }
});

/**
 * POST /api/whatsapp/send-exam-result
 * Envia notificação de resultado de exame
 */
router.post('/send-exam-result', authMiddleware, requireProfessionalOrAdmin, async (req, res) => {
  try {
    const { phoneNumber, patientName, examName, result, doctorName } = req.body;

    if (!phoneNumber || !patientName || !examName || !result) {
      return res.status(400).json({
        success: false,
        error: 'Phone number, patient name, exam name, and result are required',
      });
    }

    const whatsappService = getWhatsAppService();
    await whatsappService.sendExamResult(phoneNumber, {
      patientName,
      examName,
      result,
      doctorName,
    });

    res.json({
      success: true,
      message: 'Exam result notification sent successfully',
    });
  } catch (error) {
    console.error('[WhatsApp API] Error sending exam result:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send notification',
    });
  }
});

/**
 * POST /api/whatsapp/send-bulk
 * Envia mensagens em massa
 */
router.post('/send-bulk', authMiddleware, requireProfessionalOrAdmin, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Messages array is required',
      });
    }

    const whatsappService = getWhatsAppService();
    const results = await whatsappService.sendBulkMessages(messages);

    res.json({
      success: true,
      message: `Bulk send completed: ${results.success} success, ${results.failed} failed`,
      data: results,
    });
  } catch (error) {
    console.error('[WhatsApp API] Error sending bulk messages:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send bulk messages',
    });
  }
});

export default router;
