import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '@rotinacare/shared';

interface AdminAuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session
    const token = localStorage.getItem('admin_token');
    if (token) {
      // TODO: Validate token and fetch admin user
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Implement admin login logic
    console.log('Admin Login:', email, password);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
