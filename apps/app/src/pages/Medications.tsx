import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from '@rotinacare/ui';

export function Medications() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Medicamentos</h1>
          <p className="text-muted-foreground">Gerencie seus medicamentos</p>
        </div>
        <Button>Adicionar Medicamento</Button>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">Losartana 50mg</h3>
                  <Badge variant="secondary">Ativo</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Dosagem:</span>
                    <p className="font-medium">1 comprimido</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Frequência:</span>
                    <p className="font-medium">1x ao dia</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Horário:</span>
                    <p className="font-medium">08:00</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Início:</span>
                    <p className="font-medium">01/01/2025</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
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
                  <h3 className="text-lg font-semibold">Metformina 850mg</h3>
                  <Badge variant="secondary">Ativo</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Dosagem:</span>
                    <p className="font-medium">1 comprimido</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Frequência:</span>
                    <p className="font-medium">2x ao dia</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Horário:</span>
                    <p className="font-medium">08:00, 20:00</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Início:</span>
                    <p className="font-medium">15/02/2025</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
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
