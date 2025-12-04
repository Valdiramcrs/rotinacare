import { useAuth } from '../hooks/useAuth';
import { Redirect } from 'wouter';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('[ProtectedRoute] Estado:', { isAuthenticated, isLoading });

  // Aguardar hydration do Zustand
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('[ProtectedRoute] Não autenticado, redirecionando para /login');
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
}
