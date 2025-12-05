import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isAdmin: boolean;
  isProfessional: boolean;
  isPatient: boolean;
  avatarUrl?: string | null;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: true,
      isHydrated: false,

      setAuth: (token: string, user: User) => {
        console.log('[useAuth] setAuth chamado:', { token: token.substring(0, 20) + '...', user });
        // Salvar token separadamente para compatibilidade
        localStorage.setItem('rotinacare_token', token);
        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        console.log('[useAuth] logout chamado');
        localStorage.removeItem('rotinacare_token');
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setHydrated: () => {
        set({ isHydrated: true, isLoading: false });
      },
    }),
    {
      name: 'rotinacare-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => {
        console.log('[useAuth] Iniciando rehydration...');
        return (state, error) => {
          if (error) {
            console.error('[useAuth] Erro na rehydration:', error);
          } else {
            console.log('[useAuth] Rehydration completa:', {
              isAuthenticated: state?.isAuthenticated,
              hasToken: !!state?.token,
              hasUser: !!state?.user,
            });
          }
          // Marcar como hidratado após carregar
          state?.setHydrated();
        };
      },
    }
  )
);

// Hook para usar em componentes
export const useAuth = () => {
  const store = useAuthStore();
  
  return {
    user: store.user,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading || !store.isHydrated,
    login: store.setAuth,
    logout: store.logout,
  };
};
