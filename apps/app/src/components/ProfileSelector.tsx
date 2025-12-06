import { useState, useEffect } from 'react';
import { ChevronDown, User, Stethoscope } from 'lucide-react';

type ProfileMode = 'patient' | 'professional';

interface ProfileSelectorProps {
  isProfessional: boolean;
  onModeChange?: (mode: ProfileMode) => void;
}

export function ProfileSelector({ isProfessional, onModeChange }: ProfileSelectorProps) {
  const [currentMode, setCurrentMode] = useState<ProfileMode>('patient');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Carregar modo salvo do localStorage
    const savedMode = localStorage.getItem('profileMode') as ProfileMode;
    if (savedMode && isProfessional) {
      setCurrentMode(savedMode);
    }
  }, [isProfessional]);

  const handleModeChange = (mode: ProfileMode) => {
    setCurrentMode(mode);
    localStorage.setItem('profileMode', mode);
    setIsOpen(false);
    
    if (onModeChange) {
      onModeChange(mode);
    }

    // Recarregar página para aplicar mudanças
    window.location.reload();
  };

  // Se não for profissional, não mostrar seletor
  if (!isProfessional) {
    return null;
  }

  const modes = [
    {
      id: 'patient' as ProfileMode,
      label: 'Modo Paciente',
      icon: User,
      description: 'Gerenciar minha saúde',
    },
    {
      id: 'professional' as ProfileMode,
      label: 'Modo Profissional',
      icon: Stethoscope,
      description: 'Atender pacientes',
    },
  ];

  const currentModeData = modes.find(m => m.id === currentMode);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors min-w-[220px] shadow-sm"
      >
        {currentModeData && (
          <>
            <currentModeData.icon className="w-5 h-5" />
            <span className="flex-1 text-left font-medium">{currentModeData.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {isOpen && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-[280px] bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                  currentMode === mode.id ? 'bg-primary/5' : ''
                }`}
              >
                <mode.icon className={`w-5 h-5 mt-0.5 ${
                  currentMode === mode.id ? 'text-primary' : 'text-gray-600'
                }`} />
                <div className="flex-1 text-left">
                  <div className={`font-medium ${
                    currentMode === mode.id ? 'text-primary' : 'text-gray-900'
                  }`}>
                    {mode.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {mode.description}
                  </div>
                </div>
                {currentMode === mode.id && (
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Hook para obter modo atual
export function useProfileMode(): ProfileMode {
  const [mode, setMode] = useState<ProfileMode>('patient');

  useEffect(() => {
    const savedMode = localStorage.getItem('profileMode') as ProfileMode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  return mode;
}
