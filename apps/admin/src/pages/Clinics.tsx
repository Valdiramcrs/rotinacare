import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from '@rotinacare/ui';

export function Clinics() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Clínicas</h1>
          <p className="text-muted-foreground">Gerencie as clínicas parceiras</p>
        </div>
        <Button>Adicionar Clínica</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Clínica São Paulo', city: 'São Paulo', state: 'SP', doctors: 15, patients: 234, status: 'Ativa' },
          { name: 'Hospital Central', city: 'Rio de Janeiro', state: 'RJ', doctors: 42, patients: 567, status: 'Ativa' },
          { name: 'Clínica Ortopédica', city: 'Belo Horizonte', state: 'MG', doctors: 8, patients: 123, status: 'Ativa' },
          { name: 'Centro Médico Norte', city: 'Brasília', state: 'DF', doctors: 22, patients: 345, status: 'Pendente' },
        ].map((clinic, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{clinic.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {clinic.city}, {clinic.state}
                  </p>
                </div>
                <Badge variant={clinic.status === 'Ativa' ? 'default' : 'secondary'}>
                  {clinic.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Médicos:</span>
                  <span className="font-medium">{clinic.doctors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pacientes:</span>
                  <span className="font-medium">{clinic.patients}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Ver Detalhes
                </Button>
                <Button size="sm" variant="outline">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
