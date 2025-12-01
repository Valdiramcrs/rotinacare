import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@rotinacare/ui';

export function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Administrativo</h1>
        <p className="text-muted-foreground">Visão geral da plataforma</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold mb-1">1,234</div>
            <div className="text-sm text-muted-foreground">Usuários ativos</div>
            <div className="text-xs text-green-600 mt-1">+12% este mês</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold mb-1">45</div>
            <div className="text-sm text-muted-foreground">Clínicas parceiras</div>
            <div className="text-xs text-green-600 mt-1">+3 novas</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold mb-1">8,567</div>
            <div className="text-sm text-muted-foreground">Consultas agendadas</div>
            <div className="text-xs text-blue-600 mt-1">Este mês</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold mb-1">98.5%</div>
            <div className="text-sm text-muted-foreground">Taxa de satisfação</div>
            <div className="text-xs text-green-600 mt-1">+0.5%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Novos Usuários</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'João Silva', email: 'joao@exemplo.com', date: 'Hoje' },
                { name: 'Maria Santos', email: 'maria@exemplo.com', date: 'Ontem' },
                { name: 'Pedro Costa', email: 'pedro@exemplo.com', date: 'Há 2 dias' },
                { name: 'Ana Paula', email: 'ana@exemplo.com', date: 'Há 3 dias' },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{user.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'Nova clínica cadastrada', detail: 'Clínica São Paulo', time: '5 min atrás' },
                { action: 'Usuário reportou problema', detail: 'Ticket #1234', time: '15 min atrás' },
                { action: 'Pagamento processado', detail: 'R$ 19,90', time: '1 hora atrás' },
                { action: 'Relatório gerado', detail: 'Relatório mensal', time: '2 horas atrás' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.detail}</p>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap ml-4">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
