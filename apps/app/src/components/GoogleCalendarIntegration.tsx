import { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@rotinacare/ui';
import { Calendar, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface GoogleCalendarStatus {
  connected: boolean;
  email?: string;
}

export function GoogleCalendarIntegration() {
  const [status, setStatus] = useState<GoogleCalendarStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar status da conexão ao carregar
  useEffect(() => {
    checkConnectionStatus();
  }, []);

  async function checkConnectionStatus() {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('rotinacare_token');
      if (!token) {
        setStatus({ connected: false });
        setLoading(false);
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/api/google-calendar/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      } else {
        setStatus({ connected: false });
      }
    } catch (err) {
      console.error('Erro ao verificar status do Google Calendar:', err);
      setStatus({ connected: false });
      setError('Erro ao verificar conexão');
    } finally {
      setLoading(false);
    }
  }

  async function handleConnect() {
    try {
      setConnecting(true);
      setError(null);

      const token = localStorage.getItem('rotinacare_token');
      if (!token) {
        setError('Você precisa estar logado para conectar');
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/api/google-calendar/auth-url`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao obter URL de autorização');
      }

      const data = await response.json();
      
      // Redirecionar para a URL do Google OAuth
      window.location.href = data.url;
    } catch (err: any) {
      console.error('Erro ao conectar Google Calendar:', err);
      setError(err.message || 'Erro ao conectar com Google Calendar');
      setConnecting(false);
    }
  }

  async function handleDisconnect() {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('rotinacare_token');
      if (!token) return;

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/api/google-calendar/disconnect`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setStatus({ connected: false });
      } else {
        throw new Error('Erro ao desconectar');
      }
    } catch (err: any) {
      console.error('Erro ao desconectar Google Calendar:', err);
      setError(err.message || 'Erro ao desconectar');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Google Calendar
          </CardTitle>
          <CardDescription>Sincronize seus compromissos com o Google Calendar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Google Calendar
        </CardTitle>
        <CardDescription>Sincronize seus compromissos com o Google Calendar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {status?.connected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-md">
              <CheckCircle2 className="h-5 w-5" />
              <div className="flex-1">
                <p className="font-medium">Conectado ao Google Calendar</p>
                {status.email && (
                  <p className="text-sm opacity-80">{status.email}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Seus compromissos do RotinaCare serão sincronizados automaticamente com seu Google Calendar.
              </p>
              <Button 
                variant="outline" 
                onClick={handleDisconnect}
                disabled={loading}
              >
                Desconectar
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Conecte sua conta do Google para sincronizar automaticamente suas consultas, 
              exames e lembretes de medicamentos com o Google Calendar.
            </p>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Benefícios:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Sincronização automática de compromissos</li>
                <li>Lembretes no seu celular</li>
                <li>Visualização em qualquer dispositivo</li>
                <li>Compartilhamento com familiares</li>
              </ul>
            </div>

            <Button 
              onClick={handleConnect}
              disabled={connecting}
              className="w-full sm:w-auto"
            >
              {connecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Conectando...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Conectar Google Calendar
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
