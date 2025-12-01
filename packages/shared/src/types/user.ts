export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'admin';
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
