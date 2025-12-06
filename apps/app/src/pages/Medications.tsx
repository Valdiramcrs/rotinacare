import { Button, Card, CardContent } from '@rotinacare/ui';
import { WhatsAppButton, useWhatsAppMessage } from '../components/WhatsAppButton';

export function Medications() {
  const { formatHealthReport } = useWhatsAppMessage();

  // Exemplo de dados (depois virá da API)
  const mockData = {
    patientName: 'João da Silva',
    medications: 3,
    appointments: 2,
    exams: 5,
  };

  const handleShareReport = () => {
    return formatHealthReport(mockData);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Medicamentos</h1>
          <p className="text-muted-foreground">Gerencie seus medicamentos</p>
        </div>
        <div className="flex gap-2">
          <WhatsAppButton
            message={handleShareReport()}
            size="sm"
            variant="outline"
            className="bg-white border-green-500 text-green-600 hover:bg-green-50"
          >
            Compartilhar Relatório
          </WhatsAppButton>
          <Button>Adicionar Medicamento</Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Nenhum medicamento cadastrado ainda.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
