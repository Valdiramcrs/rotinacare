import { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@rotinacare/ui';
import { useAuth } from '../hooks/useAuth';

export function GoogleAccountSettings() {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleEmail, setGoogleEmail] = useState<string | null>(null);
  const [googleAvatar, setGoogleAvatar] = useState<string | null>(null);

  useEffect(() => {
    checkGoogleConnection();
  }, []);

  const checkGoogleConnection = async () => {
    try {
      // Verificar se usuário tem googleId preenchido
      if (user?.email) {
        // Fazer request para verificar status da conexão
        const response = await fetch('https://api.rotinacare.com/api/trpc/user.me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userData = data.result?.data;
          
          if (userData?.googleId) {
            setIsConnected(true);
            setGoogleEmail(userData.email);
            setGoogleAvatar(userData.avatarUrl);
          }
        }
      }
    } catch (error) {
      console.error('[GoogleAccountSettings] Error checking connection:', error);
    }
  };

  const handleConnect = () => {
    // Redirecionar para OAuth Google
    window.location.href = 'https://api.rotinacare.com/api/auth/google';
  };

  const handleDisconnect = async () => {
    if (!confirm('Tem certeza que deseja desconectar sua conta Google? Você perderá o acesso ao login social e à sincronização com Google Calendar.')) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://api.rotinacare.com/api/auth/google/disconnect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsConnected(false);
        setGoogleEmail(null);
        setGoogleAvatar(null);
        alert('Conta Google desconectada com sucesso!');
      } else {
        const error = await response.json();
        alert(`Erro ao desconectar: ${error.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('[GoogleAccountSettings] Error disconnecting:', error);
      alert('Erro ao desconectar conta Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conta Google</CardTitle>
        <CardDescription>
          Gerencie sua conexão com o Google para login social e sincronização de calendário
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              {googleAvatar && (
                <img 
                  src={googleAvatar} 
                  alt="Google Avatar" 
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div className="flex-1">
                <p className="font-medium text-green-900">Conectado com Google</p>
                <p className="text-sm text-green-700">{googleEmail}</p>
              </div>
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>✅ Login social ativado</p>
              <p>✅ Sincronização com Google Calendar disponível</p>
            </div>

            <Button 
              variant="outline" 
              onClick={handleDisconnect}
              disabled={isLoading}
              className="w-full border-red-300 text-red-700 hover:bg-red-50"
            >
              {isLoading ? 'Desconectando...' : 'Desconectar conta Google'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600">
                Conecte sua conta Google para:
              </p>
              <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Fazer login com um clique</li>
                <li>Sincronizar consultas com Google Calendar</li>
                <li>Manter seus dados sempre atualizados</li>
              </ul>
            </div>

            <Button 
              onClick={handleConnect}
              className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Conectar com Google
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
