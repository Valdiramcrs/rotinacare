import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
      'Alertas de saúde em tempo real',
      'Próximas consultas e exames',
      'Insights personalizados de IA'
    ]
  },
  {
    title: 'Agenda Inteligente',
    description: 'Gerencie todas as suas consultas, exames e procedimentos em um calendário completo e integrado.',
    image: '/demo/frame_002.png',
    features: [
      'Calendário mensal completo',
      'Integração com Google Calendar',
      'Filtros por tipo de evento',
      'Criação rápida de novos eventos'
    ]
  },
  {
    title: 'Gerenciamento de Diagnósticos',
    description: 'Registre e acompanhe todos os seus diagnósticos médicos com filtros por período e histórico completo.',
    image: '/demo/frame_005.png',
    features: [
      'Filtros por data personalizados',
      'Histórico completo de diagnósticos',
      'Registro profissional vinculado',
      'Gerenciamento de tags'
    ]
  },
  {
    title: 'Cadastro Rápido de Diagnósticos',
    description: 'Adicione novos diagnósticos de forma simples e rápida, com campos intuitivos e evolução clínica.',
    image: '/demo/frame_006.png',
    features: [
      'Formulário intuitivo',
      'Data do diagnóstico',
      'Evolução clínica detalhada',
      'Salvamento rápido'
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
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Fechar modal"
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
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSlide === demoSlides.length - 1}
          >
            <span className="hidden sm:inline">Próximo</span>
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
