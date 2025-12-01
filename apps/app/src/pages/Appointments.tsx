import { Button, Card, CardContent, Badge } from '@rotinacare/ui';

export function Appointments() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Consultas</h1>
          <p className="text-muted-foreground">Gerencie suas consultas médicas</p>
        </div>
        <Button>Agendar Consulta</Button>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">Dr. João Silva - Cardiologista</h3>
                  <Badge>Agendada</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-muted-foreground">Data:</span>
                    <p className="font-medium">15/12/2025</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Horário:</span>
                    <p className="font-medium">14:00</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Local:</span>
                    <p className="font-medium">Clínica São Paulo</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Telefone:</span>
                    <p className="font-medium">(11) 98765-4321</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Consulta de rotina - Checkup cardiológico anual
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button size="sm" variant="outline">Editar</Button>
                <Button size="sm" variant="destructive">Cancelar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">Dra. Maria Santos - Endocrinologista</h3>
                  <Badge>Agendada</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-muted-foreground">Data:</span>
                    <p className="font-medium">20/12/2025</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Horário:</span>
                    <p className="font-medium">10:30</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Local:</span>
                    <p className="font-medium">Hospital Central</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Telefone:</span>
                    <p className="font-medium">(11) 91234-5678</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Acompanhamento de diabetes - Avaliação de exames
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button size="sm" variant="outline">Editar</Button>
                <Button size="sm" variant="destructive">Cancelar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-muted">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between opacity-60">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">Dr. Pedro Costa - Ortopedista</h3>
                  <Badge variant="outline">Concluída</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-muted-foreground">Data:</span>
                    <p className="font-medium">05/11/2025</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Horário:</span>
                    <p className="font-medium">15:00</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Local:</span>
                    <p className="font-medium">Clínica Ortopédica</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Telefone:</span>
                    <p className="font-medium">(11) 99876-5432</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Consulta realizada - Avaliação de dor no joelho
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button size="sm" variant="outline">Ver Detalhes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
