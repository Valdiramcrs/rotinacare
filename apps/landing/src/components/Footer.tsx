import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">RotinasCare</h3>
            <p className="text-sm text-muted-foreground">
              Cuide da sua saúde de forma organizada e eficiente.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Funcionalidades
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Preços
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Contato
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Termos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RotinasCare. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
