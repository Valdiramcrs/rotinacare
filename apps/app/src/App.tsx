import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from './lib/trpc';
import { Route, Switch } from 'wouter';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Doctors } from './pages/Doctors';
import { Medications } from './pages/Medications';
import { Exams } from './pages/Exams';
import { Appointments } from './pages/Appointments';
import { Settings } from './pages/Settings';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AuthCallback from './pages/AuthCallback';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppRoutes() {
  return (
    <Switch>
      {/* Rotas públicas */}
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/auth/callback" component={AuthCallback} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      
      {/* Rotas protegidas */}
      <Route path="/">
        <ProtectedRoute>
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/dashboard">
        <ProtectedRoute>
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/doctors">
        <ProtectedRoute>
          <AppLayout>
            <Doctors />
          </AppLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/medications">
        <ProtectedRoute>
          <AppLayout>
            <Medications />
          </AppLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/exams">
        <ProtectedRoute>
          <AppLayout>
            <Exams />
          </AppLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/appointments">
        <ProtectedRoute>
          <AppLayout>
            <Appointments />
          </AppLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/settings">
        <ProtectedRoute>
          <AppLayout>
            <Settings />
          </AppLayout>
        </ProtectedRoute>
      </Route>
    </Switch>
  );
}

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
