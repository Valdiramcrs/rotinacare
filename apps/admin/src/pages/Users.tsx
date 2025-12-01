import { Button, Card, CardContent, Badge } from '@rotinacare/ui';

export function Users() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Usuários</h1>
          <p className="text-muted-foreground">Gerencie os usuários da plataforma</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Exportar</Button>
          <Button>Adicionar Usuário</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Nome</th>
                  <th className="text-left p-4 font-medium">Email</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Plano</th>
                  <th className="text-left p-4 font-medium">Cadastro</th>
                  <th className="text-left p-4 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'João Silva', email: 'joao@exemplo.com', status: 'Ativo', plan: 'Pro', date: '01/01/2025' },
                  { name: 'Maria Santos', email: 'maria@exemplo.com', status: 'Ativo', plan: 'Gratuito', date: '15/01/2025' },
                  { name: 'Pedro Costa', email: 'pedro@exemplo.com', status: 'Ativo', plan: 'Família', date: '20/01/2025' },
                  { name: 'Ana Paula', email: 'ana@exemplo.com', status: 'Inativo', plan: 'Gratuito', date: '05/02/2025' },
                ].map((user, i) => (
                  <tr key={i} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-muted-foreground">{user.email}</td>
                    <td className="p-4">
                      <Badge variant={user.status === 'Ativo' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4">{user.plan}</td>
                    <td className="p-4 text-muted-foreground">{user.date}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Ver</Button>
                        <Button size="sm" variant="outline">Editar</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
