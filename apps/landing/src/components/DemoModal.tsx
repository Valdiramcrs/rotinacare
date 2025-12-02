import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const demoSlides = [
  {
    title: 'Dashboard - Visão Geral da Sua Saúde',
    description: 'Acompanhe seu progresso de perfil, alertas ativos, próximas consultas e insights de IA em um só lugar.',
    image: '/demo/frame_001.png',
    features: [
      'Barra de progresso do perfil',
      'Próximas consultas e exames',
      'Alertas de saúde em tempo real',
      'Insights personalizados de IA',
    ],
  },
  {
    title: 'Dashboard - Insights e Recomendações de IA',
    description: 'Receba recomendações inteligentes baseadas no seu histórico médico e evolução de indicadores de saúde.',
    image: '/demo/dashboard_insights.png',
    features: [
      'Análise de medicamentos',
      'Recomendações de exames',
      'Evolução de indicadores',
      'Conversar com Assistente IA',
    ],
  },
  {
    title: 'Agenda - Calendário Completo',
    description: 'Visualize todas as suas consultas, exames e eventos de saúde em um calendário mensal intuitivo.',
    image: '/demo/agenda_calendario.png',
    features: [
      'Calendário mensal completo',
      'Integração com Google Calendar',
      'Filtros por tipo de evento',
      'Visualização de eventos agendados',
    ],
  },
  {
    title: 'Agenda - Detalhes do Evento',
    description: 'Gerencie detalhes completos de cada evento, incluindo profissional, local e observações.',
    image: '/demo/agenda_evento.png',
    features: [
      'Informações detalhadas do evento',
      'Profissional vinculado',
      'Local e horário',
      'Observações personalizadas',
    ],
  },
  {
    title: 'Profissionais - Lista Completa',
    description: 'Mantenha um cadastro organizado de todos os seus médicos e profissionais de saúde.',
    image: '/demo/profissionais_lista.png',
    features: [
      'Lista de profissionais cadastrados',
      'Especialidade e CRM',
      'Informações de contato',
      'Localização do consultório',
    ],
  },
  {
    title: 'Profissionais - Cadastro Rápido',
    description: 'Adicione novos profissionais de saúde de forma rápida e intuitiva.',
    image: '/demo/profissionais_novo.png',
    features: [
      'Formulário simplificado',
      'Especialidade e CRM',
      'Telefone e email',
      'Cidade e estado',
    ],
  },
  {
    title: 'Exames - Cadastro com Análise de IA',
    description: 'Adicione exames e envie PDFs para análise automática com inteligência artificial.',
    image: '/demo/exames_novo.png',
    features: [
      'Upload de PDF do laudo',
      'Análise automática com IA',
      'Tipo de exame e data',
      'Resumo dos achados',
    ],
  },
  {
    title: 'Exames - Gerenciamento Completo',
    description: 'Organize todos os seus exames com filtros avançados e comparação de resultados.',
    image: '/demo/exames_lista.png',
    features: [
      'Filtros por período',
      'Histórico completo de exames',
      'Comparação de resultados',
      'Gerenciamento de tags',
    ],
  },
  {
    title: 'Medicamentos - Lista Organizada',
    description: 'Acompanhe todos os seus medicamentos ativos e histórico de tratamentos.',
    image: '/demo/medicamentos_lista.png',
    features: [
      'Medicamentos em uso',
      'Dosagem e frequência',
      'Histórico de tratamentos',
      'Alertas de horários',
    ],
  },
  {
    title: 'Medicamentos - Cadastro Detalhado',
    description: 'Registre medicamentos com informações completas de dosagem, frequência e duração.',
    image: '/demo/medicamentos_novo.png',
    features: [
      'Nome e dosagem',
      'Frequência de uso',
      'Data de início e fim',
      'Observações médicas',
    ],
  },
];

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const nextSlide = () => {
    if (currentSlide < demoSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Tour de Demonstração
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col gap-4">
            {/* Screenshot */}
            <div className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <img
                src={demoSlides[currentSlide].image}
                alt={demoSlides[currentSlide].title}
                className="w-full h-auto max-h-96 object-contain bg-gray-50"
              />
            </div>

            {/* Slide Content */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {demoSlides[currentSlide].title}
              </h3>
              <p className="text-base text-gray-600 mb-4">
                {demoSlides[currentSlide].description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {demoSlides[currentSlide].features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-2.5 h-2.5 text-green-600"
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
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Anterior
          </button>

          {/* Slide Indicators */}
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
            disabled={currentSlide === demoSlides.length - 1}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Próximo
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-blue-50 border-t">
          <div className="text-center">
            <p className="text-sm text-gray-700 mb-3">
              Pronto para experimentar? Comece gratuitamente agora!
            </p>
            <a
              href="https://app.rotinacare.com/register"
              className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Começar Gratuitamente
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
