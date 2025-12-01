import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from './lib/trpc';
import { Route, Switch } from 'wouter';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { AdminProtectedRoute } from './components/AdminProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Clinics } from './pages/Clinics';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';

const queryClient = new QueryClient();

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AdminAuthProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <AdminProtectedRoute>
              <AdminLayout>
                <Switch>
                  <Route path="/" component={Dashboard} />
                  <Route path="/users" component={Users} />
                  <Route path="/clinics" component={Clinics} />
                  <Route path="/reports" component={Reports} />
                  <Route path="/settings" component={Settings} />
                </Switch>
              </AdminLayout>
            </AdminProtectedRoute>
          </Switch>
        </AdminAuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
