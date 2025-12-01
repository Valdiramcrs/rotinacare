import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@rotinacare/ui';

export function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da sua saúde</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold mb-1">5</div>
            <div className="text-sm text-muted-foreground">Médicos cadastrados</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold mb-1">12</div>
            <div className="text-sm text-muted-foreground">Medicamentos ativos</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold mb-1">3</div>
            <div className="text-sm text-muted-foreground">Consultas agendadas</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold mb-1">8</div>
            <div className="text-sm text-muted-foreground">Exames realizados</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
            <CardDescription>Suas consultas agendadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">Dr. João Silva</p>
                  <p className="text-sm text-muted-foreground">Cardiologista</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">15/12/2025</p>
                  <p className="text-sm text-muted-foreground">14:00</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">Dra. Maria Santos</p>
                  <p className="text-sm text-muted-foreground">Endocrinologista</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">20/12/2025</p>
                  <p className="text-sm text-muted-foreground">10:30</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medicamentos do Dia</CardTitle>
            <CardDescription>Lembre-se de tomar seus medicamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">Losartana 50mg</p>
                  <p className="text-sm text-muted-foreground">1 comprimido</p>
                </div>
                <div className="text-sm font-medium">08:00</div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">Metformina 850mg</p>
                  <p className="text-sm text-muted-foreground">1 comprimido</p>
                </div>
                <div className="text-sm font-medium">12:00</div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">Sinvastatina 20mg</p>
                  <p className="text-sm text-muted-foreground">1 comprimido</p>
                </div>
                <div className="text-sm font-medium">20:00</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
