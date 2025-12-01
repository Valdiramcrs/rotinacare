import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from './lib/trpc';
import { Route, Switch } from 'wouter';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Doctors } from './pages/Doctors';
import { Medications } from './pages/Medications';
import { Exams } from './pages/Exams';
import { Appointments } from './pages/Appointments';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';

const queryClient = new QueryClient();

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute>
              <AppLayout>
                <Switch>
                  <Route path="/" component={Dashboard} />
                  <Route path="/doctors" component={Doctors} />
                  <Route path="/medications" component={Medications} />
                  <Route path="/exams" component={Exams} />
                  <Route path="/appointments" component={Appointments} />
                  <Route path="/settings" component={Settings} />
                </Switch>
              </AppLayout>
            </ProtectedRoute>
          </Switch>
        </AuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
