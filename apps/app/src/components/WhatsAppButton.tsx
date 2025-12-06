import { Button } from '@rotinacare/ui';

interface WhatsAppButtonProps {
  message: string;
  phoneNumber?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  message,
  phoneNumber,
  variant = 'default',
  size = 'md',
  className = '',
  children = 'Compartilhar no WhatsApp',
}: WhatsAppButtonProps) {
  const handleClick = () => {
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Se tiver número de telefone, usar API do WhatsApp
    // Senão, abrir WhatsApp Web para escolher contato
    const whatsappUrl = phoneNumber
      ? `https://wa.me/${phoneNumber}?text=${encodedMessage}`
      : `https://wa.me/?text=${encodedMessage}`;
    
    // Abrir em nova aba
    window.open(whatsappUrl, '_blank');
  };

  const sizeClasses = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      className={`bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 ${sizeClasses[size]} ${className}`}
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      {children}
    </Button>
  );
}

/**
 * Hook para gerar mensagens formatadas para WhatsApp
 */
export function useWhatsAppMessage() {
  const formatMedicationReminder = (medication: {
    name: string;
    dosage: string;
    frequency: string;
    time?: string;
  }) => {
    return `🏥 *Lembrete de Medicamento - RotinaCare*

💊 *Medicamento:* ${medication.name}
📏 *Dosagem:* ${medication.dosage}
⏰ *Frequência:* ${medication.frequency}
${medication.time ? `🕐 *Horário:* ${medication.time}` : ''}

Não esqueça de tomar seu medicamento! 💚

_Enviado via RotinaCare_`;
  };

  const formatAppointmentConfirmation = (appointment: {
    title: string;
    date: string;
    time: string;
    location?: string;
    doctor?: string;
  }) => {
    return `📅 *Confirmação de Consulta - RotinaCare*

🏥 *Consulta:* ${appointment.title}
${appointment.doctor ? `👨‍⚕️ *Médico:* ${appointment.doctor}` : ''}
📆 *Data:* ${appointment.date}
🕐 *Horário:* ${appointment.time}
${appointment.location ? `📍 *Local:* ${appointment.location}` : ''}

Por favor, confirme sua presença respondendo esta mensagem. ✅

_Enviado via RotinaCare_`;
  };

  const formatExamReport = (exam: {
    name: string;
    date: string;
    laboratory?: string;
    result?: string;
  }) => {
    return `🔬 *Relatório de Exame - RotinaCare*

📋 *Exame:* ${exam.name}
📆 *Data:* ${exam.date}
${exam.laboratory ? `🏢 *Laboratório:* ${exam.laboratory}` : ''}
${exam.result ? `\n📊 *Resultado:*\n${exam.result}` : ''}

_Enviado via RotinaCare_`;
  };

  const formatHealthReport = (data: {
    patientName: string;
    medications: number;
    appointments: number;
    exams: number;
  }) => {
    return `📊 *Relatório de Saúde - RotinaCare*

👤 *Paciente:* ${data.patientName}

📈 *Resumo:*
💊 Medicamentos ativos: ${data.medications}
📅 Consultas agendadas: ${data.appointments}
🔬 Exames registrados: ${data.exams}

Acesse o app para mais detalhes: https://app.rotinacare.com

_Enviado via RotinaCare_`;
  };

  const formatDoctorMessage = (data: {
    patientName: string;
    doctorName: string;
    message: string;
  }) => {
    return `👨‍⚕️ *Mensagem para Dr(a). ${data.doctorName}*

De: ${data.patientName}

${data.message}

_Enviado via RotinaCare_`;
  };

  return {
    formatMedicationReminder,
    formatAppointmentConfirmation,
    formatExamReport,
    formatHealthReport,
    formatDoctorMessage,
  };
}
