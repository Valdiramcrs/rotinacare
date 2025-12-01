import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@rotinacare/ui';

export function Reports() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Relatórios</h1>
          <p className="text-muted-foreground">Visualize e exporte relatórios da plataforma</p>
        </div>
        <Button>Gerar Relatório</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Crescimento de Usuários</CardTitle>
            <CardDescription>Últimos 12 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Gráfico de crescimento</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
            <CardDescription>Últimos 12 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Gráfico de receita</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios Disponíveis</CardTitle>
          <CardDescription>Selecione um relatório para visualizar ou exportar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Relatório de Usuários', description: 'Lista completa de usuários e estatísticas', date: 'Atualizado hoje' },
              { name: 'Relatório Financeiro', description: 'Receitas, despesas e balanço', date: 'Atualizado hoje' },
              { name: 'Relatório de Consultas', description: 'Consultas agendadas e realizadas', date: 'Atualizado hoje' },
              { name: 'Relatório de Satisfação', description: 'Avaliações e feedback dos usuários', date: 'Atualizado ontem' },
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{report.name}</h4>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Visualizar</Button>
                  <Button size="sm">Exportar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
