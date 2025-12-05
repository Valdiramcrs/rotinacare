import { useAuth } from '../hooks/useAuth';
import { Redirect } from 'wouter';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  console.log('[AdminProtectedRoute] Estado:', { isAuthenticated, isLoading, isAdmin: user?.isAdmin });

  // Aguardar hydration do Zustand
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Verificar se está autenticado E é admin
  if (!isAuthenticated || !user?.isAdmin) {
    console.log('[AdminProtectedRoute] Não autorizado, redirecionando para /login');
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
}
