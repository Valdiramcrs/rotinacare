import { Link } from 'wouter';
import { Button } from '@rotinacare/ui';
import { Activity } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Activity className="w-6 h-6 text-blue-600" />
            RotinaCare
          </a>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-gray-700" asChild>
            <a href="https://app.rotinacare.com/login">Entrar</a>
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <a href="https://app.rotinacare.com/register">Começar Agora</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
