import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extrair token da URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const error = params.get('error');

        if (error) {
          console.error('[OAuth Callback] Error:', error);
          setLocation('/login?error=' + error);
          return;
        }

        if (!token) {
          console.error('[OAuth Callback] No token received');
          setLocation('/login?error=no_token');
          return;
        }

        console.log('[OAuth Callback] Token received, fetching user data...');

        // Buscar dados do usuário com o token
        const response = await fetch('https://api.rotinacare.com/api/trpc/auth.me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('[OAuth Callback] User data:', data);

        if (data.result?.data) {
          const user = data.result.data;
          login(token, user);
          console.log('[OAuth Callback] Login successful, redirecting...');
          setLocation('/');
        } else {
          console.error('[OAuth Callback] Invalid response:', data);
          setLocation('/login?error=invalid_response');
        }
      } catch (err) {
        console.error('[OAuth Callback] Error:', err);
        setLocation('/login?error=callback_failed');
      }
    };

    handleCallback();
  }, [login, setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600">Autenticando com Google...</p>
      </div>
    </div>
  );
}
