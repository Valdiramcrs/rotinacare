import { Link } from 'wouter';
import { Button } from '@rotinacare/ui';

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold text-primary">RotinasCare</a>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/features">
            <a className="text-sm font-medium hover:text-primary transition-colors">
              Funcionalidades
            </a>
          </Link>
          <Link href="/pricing">
            <a className="text-sm font-medium hover:text-primary transition-colors">
              Preços
            </a>
          </Link>
          <Link href="/contact">
            <a className="text-sm font-medium hover:text-primary transition-colors">
              Contato
            </a>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <a href="https://app.rotinacare.com/login">Entrar</a>
          </Button>
          <Button asChild>
            <a href="https://app.rotinacare.com/register">Começar</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
