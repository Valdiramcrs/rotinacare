import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { trpc } from '../lib/trpc';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isInitialized: false,
      
      initialize: () => {
        console.log('[useAuth] Inicializando autenticação...');
        
        // Ler token do localStorage
        const token = localStorage.getItem('rotinacare_token');
        console.log('[useAuth] Token encontrado:', !!token);
        
        if (token) {
          // Decodificar JWT para obter dados do usuário
          try {
            const payload = token.split('.')[1];
            const decoded = JSON.parse(atob(payload));
            console.log('[useAuth] Token decodificado:', decoded);
            
            // Verificar se token não expirou
            const isExpired = decoded.exp * 1000 < Date.now();
            console.log('[useAuth] Token expirado:', isExpired);
            
            if (isExpired) {
              console.log('[useAuth] Token expirado, removendo...');
              localStorage.removeItem('rotinacare_token');
              set({ token: null, user: null, isAuthenticated: false, isInitialized: true });
            } else {
              console.log('[useAuth] Token válido! Usuário autenticado.');
              set({ 
                token, 
                user: {
                  id: decoded.userId,
                  email: decoded.email,
                  name: decoded.name || '',
                  role: decoded.role,
                },
                isAuthenticated: true,
                isInitialized: true,
              });
            }
          } catch (error) {
            console.error('[useAuth] Erro ao decodificar token:', error);
            localStorage.removeItem('rotinacare_token');
            set({ token: null, user: null, isAuthenticated: false, isInitialized: true });
          }
        } else {
          console.log('[useAuth] Nenhum token, usuário não autenticado');
          set({ isInitialized: true });
        }
      },
      
      setAuth: (token, user) => {
        console.log('[useAuth] Login - salvando token');
        localStorage.setItem('rotinacare_token', token);
        set({ token, user, isAuthenticated: true, isInitialized: true });
      },
      
      logout: () => {
        console.log('[useAuth] Logout - removendo token');
        localStorage.removeItem('rotinacare_token');
        set({ token: null, user: null, isAuthenticated: false, isInitialized: true });
        window.location.href = '/login';
      },
    }),
    {
      name: 'rotinacare-auth',
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Hook com queries tRPC
export function useAuth() {
  const { token, user, isAuthenticated, isInitialized, setAuth, logout, initialize } = useAuthStore();
  
  // Inicializar na primeira montagem
  if (!isInitialized) {
    initialize();
  }
  
  // Query para buscar dados do usuário atual (apenas se tiver token)
  const meQuery = trpc.auth.me.useQuery(undefined, {
    enabled: !!token && isAuthenticated,
    retry: false,
    onError: () => {
      console.log('[useAuth] Query auth.me falhou, fazendo logout');
      // Token inválido, fazer logout
      logout();
    },
  });
  
  return {
    token,
    user: meQuery.data || user,
    isAuthenticated,
    isLoading: !isInitialized || (isAuthenticated && meQuery.isLoading),
    setAuth,
    logout,
  };
}
