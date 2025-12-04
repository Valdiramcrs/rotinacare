import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
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
        console.log('[useAuth Admin] setAuth:', { user });
        localStorage.setItem('rotinacare_admin_token', token);
        set({ token, user, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        console.log('[useAuth Admin] logout');
        localStorage.removeItem('rotinacare_admin_token');
        set({ token: null, user: null, isAuthenticated: false, isLoading: false });
      },

      setHydrated: () => set({ isHydrated: true, isLoading: false }),
    }),
    {
      name: 'rotinacare-admin-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => {
        console.log('[useAuth Admin] Iniciando rehydration...');
        return (state, error) => {
          if (error) {
            console.error('[useAuth Admin] Erro na rehydration:', error);
          } else {
            console.log('[useAuth Admin] Rehydration completa:', {
              isAuthenticated: state?.isAuthenticated,
              hasToken: !!state?.token,
              hasUser: !!state?.user,
            });
          }
          state?.setHydrated();
        };
      },
    }
  )
);

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
