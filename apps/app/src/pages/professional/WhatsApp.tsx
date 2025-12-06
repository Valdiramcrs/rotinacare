import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea, Label } from '@rotinacare/ui';
import { MessageCircle, Send, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function ProfessionalWhatsApp() {
  const { token } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [messageForm, setMessageForm] = useState({
    phoneNumber: '',
    message: '',
  });

  const [reminderForm, setReminderForm] = useState({
    phoneNumber: '',
    patientName: '',
    medicationName: '',
    dosage: '',
    time: '',
  });

  const handleStartWhatsApp = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.rotinacare.com/api/whatsapp/start', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('WhatsApp iniciado! Verifique os logs do servidor para escanear o QR Code.');
        // TODO: Implementar exibição de QR Code na interface
        checkStatus();
      }
    } catch (error) {
      console.error('Erro ao iniciar WhatsApp:', error);
      alert('Erro ao iniciar WhatsApp');
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    try {
      const response = await fetch('https://api.rotinacare.com/api/whatsapp/status', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsConnected(data.data.isReady);
        setQrCode(data.data.qrCode);
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageForm.phoneNumber || !messageForm.message) {
      alert('Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.rotinacare.com/api/whatsapp/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageForm),
      });

      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        setMessageForm({ phoneNumber: '', message: '' });
      } else {
        alert('Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem');
    } finally {
      setLoading(false);
    }
  };

  const handleSendReminder = async () => {
    if (!reminderForm.phoneNumber || !reminderForm.patientName || !reminderForm.medicationName) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.rotinacare.com/api/whatsapp/send-medication-reminder', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reminderForm),
      });

      if (response.ok) {
        alert('Lembrete enviado com sucesso!');
        setReminderForm({
          phoneNumber: '',
          patientName: '',
          medicationName: '',
          dosage: '',
          time: '',
        });
      } else {
        alert('Erro ao enviar lembrete');
      }
    } catch (error) {
      console.error('Erro ao enviar lembrete:', error);
      alert('Erro ao enviar lembrete');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">WhatsApp Automação</h1>
        <p className="text-muted-foreground">
          Envie lembretes e notificações automáticas para seus pacientes
        </p>
      </div>

      {/* Status da conexão */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Status da Conexão
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Conectado</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="font-medium">Desconectado</span>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={checkStatus} variant="outline" size="sm">
                Verificar Status
              </Button>
              {!isConnected && (
                <Button onClick={handleStartWhatsApp} disabled={loading}>
                  Conectar WhatsApp
                </Button>
              )}
            </div>
          </div>

          {qrCode && !isConnected && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Escaneie o QR Code com seu WhatsApp (disponível nos logs do servidor)
              </p>
              <p className="text-xs text-muted-foreground">
                O QR Code aparecerá nos logs do Railway. Acesse o painel do Railway para visualizar.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enviar mensagem individual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Enviar Mensagem Individual
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone (com DDD)</Label>
            <Input
              id="phone"
              placeholder="5511999999999"
              value={messageForm.phoneNumber}
              onChange={(e) => setMessageForm({ ...messageForm, phoneNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              placeholder="Digite sua mensagem..."
              rows={4}
              value={messageForm.message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessageForm({ ...messageForm, message: e.target.value })}
            />
          </div>

          <Button onClick={handleSendMessage} disabled={loading || !isConnected}>
            <Send className="mr-2 h-4 w-4" />
            Enviar Mensagem
          </Button>
        </CardContent>
      </Card>

      {/* Enviar lembrete de medicamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Enviar Lembrete de Medicamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reminder-phone">Telefone</Label>
              <Input
                id="reminder-phone"
                placeholder="5511999999999"
                value={reminderForm.phoneNumber}
                onChange={(e) => setReminderForm({ ...reminderForm, phoneNumber: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patient-name">Nome do Paciente</Label>
              <Input
                id="patient-name"
                placeholder="João da Silva"
                value={reminderForm.patientName}
                onChange={(e) => setReminderForm({ ...reminderForm, patientName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medication">Medicamento</Label>
              <Input
                id="medication"
                placeholder="Losartana 50mg"
                value={reminderForm.medicationName}
                onChange={(e) => setReminderForm({ ...reminderForm, medicationName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dosage">Dosagem</Label>
              <Input
                id="dosage"
                placeholder="1 comprimido"
                value={reminderForm.dosage}
                onChange={(e) => setReminderForm({ ...reminderForm, dosage: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Horário</Label>
              <Input
                id="time"
                placeholder="08:00"
                value={reminderForm.time}
                onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={handleSendReminder} disabled={loading || !isConnected}>
            <Send className="mr-2 h-4 w-4" />
            Enviar Lembrete
          </Button>
        </CardContent>
      </Card>

      {/* Aviso */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Importante:</strong> O WhatsApp Web não é oficial e pode violar os Termos de Serviço do WhatsApp.
            Use com moderação (máximo 50 mensagens/hora) para evitar bloqueio.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
