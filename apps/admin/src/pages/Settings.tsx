import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from '@rotinacare/ui';

export function Settings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">Configure a plataforma</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações Gerais</CardTitle>
            <CardDescription>Configurações básicas da plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="platform-name" className="block text-sm font-medium mb-2">
                Nome da Plataforma
              </label>
              <Input id="platform-name" defaultValue="RotinasCare" />
            </div>
            <div>
              <label htmlFor="support-email" className="block text-sm font-medium mb-2">
                Email de Suporte
              </label>
              <Input id="support-email" type="email" defaultValue="suporte@rotinacare.com" />
            </div>
            <div>
              <label htmlFor="max-users" className="block text-sm font-medium mb-2">
                Máximo de Usuários por Plano Gratuito
              </label>
              <Input id="max-users" type="number" defaultValue="1000" />
            </div>
            <Button>Salvar Configurações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Planos e Preços</CardTitle>
            <CardDescription>Configure os planos de assinatura</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Plano Pro</h4>
                  <Button size="sm" variant="outline">Editar</Button>
                </div>
                <p className="text-sm text-muted-foreground">R$ 19,90/mês</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Plano Família</h4>
                  <Button size="sm" variant="outline">Editar</Button>
                </div>
                <p className="text-sm text-muted-foreground">R$ 39,90/mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrações</CardTitle>
            <CardDescription>Configure integrações com serviços externos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Email (SMTP)</h4>
                <p className="text-sm text-muted-foreground">Configurado</p>
              </div>
              <Button size="sm" variant="outline">Configurar</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Pagamentos (Stripe)</h4>
                <p className="text-sm text-muted-foreground">Não configurado</p>
              </div>
              <Button size="sm" variant="outline">Configurar</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">SMS</h4>
                <p className="text-sm text-muted-foreground">Não configurado</p>
              </div>
              <Button size="sm" variant="outline">Configurar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
