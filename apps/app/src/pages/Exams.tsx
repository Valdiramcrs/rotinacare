import { Button, Card, CardContent, Badge } from '@rotinacare/ui';
import { WhatsAppButton, useWhatsAppMessage } from '../components/WhatsAppButton';

export function Exams() {
  const { formatExamReport } = useWhatsAppMessage();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Exames</h1>
          <p className="text-muted-foreground">Gerencie seus exames médicos</p>
        </div>
        <Button>Adicionar Exame</Button>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">Hemograma Completo</h3>
                  <Badge>Sangue</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-muted-foreground">Data:</span>
                    <p className="font-medium">15/11/2025</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Resultado:</span>
                    <p className="font-medium text-green-600">Normal</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Arquivo:</span>
                    <p className="font-medium">hemograma.pdf</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Todos os valores dentro da normalidade. Sem alterações significativas.
                </p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <WhatsAppButton
                  message={formatExamReport({
                    name: 'Hemograma Completo',
                    date: '15/11/2025',
                    laboratory: 'Laboratório Central',
                    result: 'Todos os valores dentro da normalidade. Sem alterações significativas.',
                  })}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Compartilhar
                </WhatsAppButton>
                <Button size="sm" variant="outline">Ver</Button>
                <Button size="sm" variant="outline">Editar</Button>
                <Button size="sm" variant="destructive">Excluir</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">Glicemia em Jejum</h3>
                  <Badge>Sangue</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-muted-foreground">Data:</span>
                    <p className="font-medium">20/11/2025</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Resultado:</span>
                    <p className="font-medium">95 mg/dL</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Arquivo:</span>
                    <p className="font-medium">glicemia.pdf</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Valor dentro da normalidade (70-100 mg/dL).
                </p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <WhatsAppButton
                  message={formatExamReport({
                    name: 'Glicemia em Jejum',
                    date: '20/11/2025',
                    laboratory: 'Laboratório Central',
                    result: '95 mg/dL - Valor dentro da normalidade (70-100 mg/dL)',
                  })}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Compartilhar
                </WhatsAppButton>
                <Button size="sm" variant="outline">Ver</Button>
                <Button size="sm" variant="outline">Editar</Button>
                <Button size="sm" variant="destructive">Excluir</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
