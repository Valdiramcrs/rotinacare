import { Button } from '@rotinacare/ui';
import { 
  Clock, 
  Heart, 
  Lock, 
  FileText, 
  Calendar, 
  Sparkles, 
  Users, 
  Shield, 
  Activity,
  ArrowRight,
  Check
} from 'lucide-react';

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-8">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Seu Prontuário Médico Inteligente</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Sua saúde organizada,<br />
              <span className="text-blue-600">em um só lugar</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              O RotinaCare é o prontuário eletrônico que ajuda você a gerenciar sua saúde 
              com inteligência artificial, segurança e praticidade.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href="https://app.rotinacare.com/register" className="inline-flex items-center gap-2">
                  Começar Gratuitamente
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
              >
                Ver Demonstração
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Configuração em 2 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Cancele quando quiser</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Economize Tempo</h3>
              <p className="text-gray-600">
                Acesse todo seu histórico médico em segundos, sem precisar procurar papéis.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cuide da Sua Saúde</h3>
              <p className="text-gray-600">
                Acompanhe tratamentos, medicamentos e exames de forma organizada.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dados Protegidos</h3>
              <p className="text-gray-600">
                Seus dados médicos seguros e acessíveis apenas por você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa para cuidar da sua saúde
            </h2>
            <p className="text-xl text-gray-600">
              Recursos completos para organizar e acompanhar seu histórico médico
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Prontuário Eletrônico Completo</h3>
              <p className="text-gray-600">
                Organize todos os seus dados médicos em um só lugar: exames, medicamentos, 
                diagnósticos e procedimentos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Agenda Inteligente</h3>
              <p className="text-gray-600">
                Gerencie consultas, lembretes de medicamentos e acompanhamento de tratamentos 
                com facilidade.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Assistente IA</h3>
              <p className="text-gray-600">
                Análise inteligente de exames e recomendações personalizadas baseadas no seu 
                histórico médico.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compartilhamento Seguro</h3>
              <p className="text-gray-600">
                Compartilhe informações com médicos e familiares de forma controlada e segura.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Segurança e Privacidade</h3>
              <p className="text-gray-600">
                Seus dados protegidos com criptografia de ponta e conformidade com LGPD.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Activity className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Estatísticas de Saúde</h3>
              <p className="text-gray-600">
                Visualize tendências, gráficos e insights sobre sua saúde ao longo do tempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planos para todas as necessidades
            </h2>
            <p className="text-xl text-gray-600">
              Comece grátis e faça upgrade quando precisar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Gratuito */}
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Gratuito</h3>
              <p className="text-gray-600 mb-6">Ideal para começar</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">R$ 0</span>
                <span className="text-gray-600">/mês</span>
              </div>

              <Button 
                variant="outline" 
                className="w-full mb-6"
                asChild
              >
                <a href="https://app.rotinacare.com/register">Começar Grátis</a>
              </Button>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Até 10 exames</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Prontuário básico</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Agenda de consultas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Suporte por email</span>
                </li>
              </ul>
            </div>

            {/* Plano Premium */}
            <div className="bg-white p-8 rounded-2xl border-2 border-blue-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-gray-600 mb-6">Recomendado para uso completo</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">R$ 29,90</span>
                <span className="text-gray-600">/mês</span>
              </div>

              <Button 
                className="w-full mb-6 bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <a href="https://app.rotinacare.com/register">Assinar Agora</a>
              </Button>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Exames ilimitados</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Assistente IA completo</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Compartilhamento seguro</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Estatísticas avançadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Suporte prioritário</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Backup automático</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para organizar sua saúde?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Junte-se a milhares de pessoas que já estão cuidando melhor da sua saúde com o RotinaCare
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <a href="https://app.rotinacare.com/register" className="inline-flex items-center gap-2">
                Começar Agora Gratuitamente
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
