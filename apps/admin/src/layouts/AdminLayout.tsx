import { Link, useLocation } from 'wouter';
import { Button, Avatar, AvatarFallback } from '@rotinacare/ui';
import { useAuth } from '../hooks/useAuth';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/users', label: 'Usuários', icon: '👥' },
    { href: '/clinics', label: 'Clínicas', icon: '🏥' },
    { href: '/reports', label: 'Relatórios', icon: '📈' },
    { href: '/settings', label: 'Configurações', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r bg-card">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">RotinaCare</h1>
          <p className="text-xs text-muted-foreground mt-1">Painel Administrativo</p>
        </div>

        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={logout}>
            Sair
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
