import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth();

  // Se já está autenticado, redirecionar
  if (isAuthenticated) {
    setLocation('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      console.log('[Login Admin] Tentando login...');
      
      const response = await fetch('https://api.rotinacare.com/api/trpc/auth.login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('[Login Admin] Resposta:', data);

      if (data.result?.data?.token) {
        const { token, user } = data.result.data;
        console.log('[Login Admin] User data:', user);
        
        // Verificar se é admin
        if (!user.isAdmin) {
          setError('Acesso restrito a administradores.');
          return;
        }
        
        login(token, user);
        console.log('[Login Admin] Login bem-sucedido, redirecionando...');
        setLocation('/');
      } else if (data.error) {
        setError(data.error.message || 'Erro ao fazer login');
      } else {
        setError('Resposta inválida do servidor');
      }
    } catch (err) {
      console.error('[Login Admin] Erro:', err);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600">RotinaCare Admin</h1>
          <p className="mt-2 text-gray-600">Painel Administrativo</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Login</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="admin@rotinacare.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
