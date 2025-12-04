import { supabase } from '../lib/supabase.js';
import { sendAppointmentReminder } from './emailService.js';

// ============================================
// TIPOS
// ============================================

interface AppointmentReminder {
  eventId: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  title: string;
  startTime: Date;
  location: string | null;
  videoConferenceLink: string | null;
}

interface ReminderResult {
  sent: number;
  failed: number;
  errors: string[];
}

// ============================================
// FUNÇÕES PRINCIPAIS
// ============================================

/**
 * Buscar consultas que precisam de lembrete
 * Janela: entre 23h e 24h no futuro
 */
export async function getAppointmentsNeedingReminder(): Promise<AppointmentReminder[]> {
  const now = new Date();
  const in23Hours = new Date(now.getTime() + 23 * 60 * 60 * 1000);
  const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  console.log('[Reminders] Searching for appointments between:', {
    from: in23Hours.toISOString(),
    to: in24Hours.toISOString(),
  });

  try {
    // Buscar eventos na janela de tempo que ainda não tiveram lembrete
    const { data: events, error } = await supabase
      .from('events')
      .select(`
        id,
        title,
        start_time,
        location,
        video_conference_link,
        reminder_sent,
        patient_id
      `)
      .gte('start_time', in23Hours.toISOString())
      .lte('start_time', in24Hours.toISOString())
      .eq('reminder_sent', false);

    if (error) {
      console.error('[Reminders] Failed to fetch events:', error);
      throw error;
    }

    if (!events || events.length === 0) {
      console.log('[Reminders] No appointments found needing reminder');
      return [];
    }

    console.log('[Reminders] Found', events.length, 'appointments');

    // Buscar dados dos pacientes
    const reminders: AppointmentReminder[] = [];

    for (const event of events) {
      try {
        // Buscar perfil do paciente
        const { data: patient } = await supabase
          .from('patients')
          .select('id, full_name')
          .eq('id', event.patient_id)
          .single();

        if (!patient) {
          console.warn('[Reminders] Patient not found for event:', event.id);
          continue;
        }

        // Buscar email do usuário via Admin API
        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(
          event.patient_id
        );

        if (userError || !userData?.user?.email) {
          console.warn('[Reminders] User email not found for patient:', event.patient_id);
          continue;
        }

        reminders.push({
          eventId: event.id,
          patientId: event.patient_id,
          patientName: patient.full_name || 'Paciente',
          patientEmail: userData.user.email,
          title: event.title,
          startTime: new Date(event.start_time),
          location: event.location,
          videoConferenceLink: event.video_conference_link,
        });
      } catch (err) {
        console.error('[Reminders] Error processing event:', event.id, err);
      }
    }

    console.log('[Reminders] Prepared', reminders.length, 'reminders to send');
    return reminders;
  } catch (error) {
    console.error('[Reminders] Failed to get appointments:', error);
    return [];
  }
}

/**
 * Enviar lembrete individual
 */
export async function sendReminderEmail(reminder: AppointmentReminder): Promise<boolean> {
  try {
    // Formatar data e hora em português
    const dateStr = reminder.startTime.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const timeStr = reminder.startTime.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    });

    console.log('[Reminders] Sending reminder to:', reminder.patientEmail);

    const success = await sendAppointmentReminder({
      to: reminder.patientEmail,
      patientName: reminder.patientName,
      title: reminder.title,
      date: dateStr,
      time: timeStr,
      location: reminder.location || undefined,
      videoConferenceLink: reminder.videoConferenceLink || undefined,
    });

    if (success) {
      // Marcar como enviado no banco
      const { error } = await supabase
        .from('events')
        .update({ 
          reminder_sent: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', reminder.eventId);

      if (error) {
        console.error('[Reminders] Failed to mark as sent:', error);
      } else {
        console.log('[Reminders] Reminder sent and marked:', reminder.eventId);
      }
    }

    return success;
  } catch (error) {
    console.error('[Reminders] Failed to send reminder:', error);
    return false;
  }
}

/**
 * Processar todos os lembretes pendentes
 * Esta função deve ser chamada periodicamente (cron job)
 */
export async function processAppointmentReminders(): Promise<ReminderResult> {
  console.log('[Reminders] ========================================');
  console.log('[Reminders] Starting reminder processing...');
  console.log('[Reminders] Time:', new Date().toISOString());

  const result: ReminderResult = {
    sent: 0,
    failed: 0,
    errors: [],
  };

  try {
    const reminders = await getAppointmentsNeedingReminder();

    if (reminders.length === 0) {
      console.log('[Reminders] No reminders to process');
      return result;
    }

    for (const reminder of reminders) {
      try {
        const success = await sendReminderEmail(reminder);
        
        if (success) {
          result.sent++;
        } else {
          result.failed++;
          result.errors.push(`Failed to send to ${reminder.patientEmail}`);
        }
        
        // Pequeno delay entre envios para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error: any) {
        result.failed++;
        result.errors.push(`Error for ${reminder.patientEmail}: ${error.message}`);
      }
    }

    console.log('[Reminders] Processing complete:', result);
    return result;
  } catch (error: any) {
    console.error('[Reminders] Processing failed:', error);
    result.errors.push(`Processing error: ${error.message}`);
    return result;
  }
}

/**
 * Verificar e reenviar lembretes falhos
 * Útil para recuperação de erros
 */
export async function retryFailedReminders(): Promise<ReminderResult> {
  console.log('[Reminders] Retrying failed reminders...');
  
  // Buscar eventos que deveriam ter lembrete mas não foram marcados
  const now = new Date();
  const in1Hour = new Date(now.getTime() + 1 * 60 * 60 * 1000);
  const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('start_time', in1Hour.toISOString())
    .lte('start_time', in24Hours.toISOString())
    .eq('reminder_sent', false);

  if (!events || events.length === 0) {
    return { sent: 0, failed: 0, errors: [] };
  }

  console.log('[Reminders] Found', events.length, 'events needing retry');
  
  return processAppointmentReminders();
}
