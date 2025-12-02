import { Link } from 'wouter';
import { Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white mb-3">
              <Activity className="w-5 h-5" />
              <span className="font-bold">RotinaCare</span>
            </div>
            <p className="text-sm text-gray-400">
              Seu prontuário médico inteligente
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    Recursos
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    Preços
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Segurança
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    Contato
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2025 RotinaCare - CF236 Ltda. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
