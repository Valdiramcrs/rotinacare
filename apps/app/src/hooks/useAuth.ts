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
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) => {
        localStorage.setItem('rotinacare_token', token);
        set({ token, user, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('rotinacare_token');
        set({ token: null, user: null, isAuthenticated: false });
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
  const { token, user, isAuthenticated, setAuth, logout } = useAuthStore();
  
  // Query para buscar dados do usuário atual
  const meQuery = trpc.auth.me.useQuery(undefined, {
    enabled: !!token,
    retry: false,
    onError: () => {
      // Token inválido, fazer logout
      logout();
    },
  });

  return {
    token,
    user: meQuery.data || user,
    isAuthenticated,
    isLoading: meQuery.isLoading,
    setAuth,
    logout,
  };
}
