import { Button, Card, CardContent } from '@rotinacare/ui';

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
