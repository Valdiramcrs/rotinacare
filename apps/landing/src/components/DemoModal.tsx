import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, FileText, Calendar, Brain, Share2, Shield, BarChart3 } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const demoSlides = [
  {
    title: 'Prontuário Eletrônico Completo',
    description: 'Organize todos os seus dados médicos em um só lugar: exames, medicamentos, diagnósticos e procedimentos.',
    icon: FileText,
    features: [
      'Armazenamento seguro de documentos médicos',
      'Histórico completo de consultas e tratamentos',
      'Upload de exames e receitas médicas',
      'Busca rápida por data ou tipo de documento'
    ]
  },
  {
    title: 'Agenda Inteligente',
    description: 'Gerencie consultas, lembretes de medicamentos e acompanhamento de tratamentos com facilidade.',
    icon: Calendar,
    features: [
      'Agendamento de consultas médicas',
      'Lembretes automáticos de medicamentos',
      'Notificações de exames periódicos',
      'Sincronização com calendário pessoal'
    ]
  },
  {
    title: 'Assistente IA',
    description: 'Análise inteligente de exames e recomendações personalizadas baseadas no seu histórico médico.',
    icon: Brain,
    features: [
      'Interpretação de resultados de exames',
      'Sugestões personalizadas de cuidados',
      'Alertas de interações medicamentosas',
      'Análise de tendências de saúde'
    ]
  },
  {
    title: 'Compartilhamento Seguro',
    description: 'Compartilhe informações com médicos e familiares de forma controlada e segura.',
    icon: Share2,
    features: [
      'Controle granular de permissões',
      'Compartilhamento temporário de dados',
      'Acesso seguro para profissionais de saúde',
      'Histórico de acessos e compartilhamentos'
    ]
  },
  {
    title: 'Segurança e Privacidade',
    description: 'Seus dados protegidos com criptografia de ponta e conformidade com LGPD.',
    icon: Shield,
    features: [
      'Criptografia end-to-end',
      'Conformidade com LGPD',
      'Backup automático e seguro',
      'Autenticação de dois fatores'
    ]
  },
  {
    title: 'Estatísticas de Saúde',
    description: 'Visualize tendências, gráficos e insights sobre sua saúde ao longo do tempo.',
    icon: BarChart3,
    features: [
      'Gráficos de evolução de saúde',
      'Relatórios personalizados',
      'Comparação de resultados ao longo do tempo',
      'Exportação de dados para análise'
    ]
  }
];

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % demoSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + demoSlides.length) % demoSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const CurrentIcon = demoSlides[currentSlide].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Tour de Funcionalidades
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-blue-100 flex items-center justify-center">
                <CurrentIcon className="w-12 h-12 text-blue-600" />
              </div>
            </div>

            {/* Slide Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {demoSlides[currentSlide].title}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {demoSlides[currentSlide].description}
              </p>

              <ul className="space-y-3">
                {demoSlides[currentSlide].features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={prevSlide}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {demoSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={currentSlide === demoSlides.length - 1}
          >
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer CTA */}
        <div className="p-6 bg-blue-50 border-t">
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Pronto para experimentar? Comece gratuitamente agora!
            </p>
            <a
              href="https://app.rotinacare.com/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Começar Gratuitamente
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
