import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from '@rotinacare/ui';
import { GoogleCalendarIntegration } from '../components/GoogleCalendarIntegration';
import { GoogleAccountSettings } from '../components/GoogleAccountSettings';

export function Settings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Atualize suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nome completo
              </label>
              <Input id="name" defaultValue="João da Silva" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input id="email" type="email" defaultValue="joao@exemplo.com" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Telefone
              </label>
              <Input id="phone" defaultValue="(11) 98765-4321" />
            </div>
            <Button>Salvar alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Configure como deseja receber notificações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Lembretes de medicamentos</p>
                <p className="text-sm text-muted-foreground">Receba notificações para tomar seus medicamentos</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Lembretes de consultas</p>
                <p className="text-sm text-muted-foreground">Receba notificações sobre suas consultas agendadas</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações por email</p>
                <p className="text-sm text-muted-foreground">Receba atualizações por email</p>
              </div>
              <input type="checkbox" className="h-5 w-5" />
            </div>
            <Button>Salvar preferências</Button>
          </CardContent>
        </Card>

        <GoogleAccountSettings />

        <GoogleCalendarIntegration />

        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Altere sua senha</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium mb-2">
                Senha atual
              </label>
              <Input id="current-password" type="password" />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                Nova senha
              </label>
              <Input id="new-password" type="password" />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                Confirmar nova senha
              </label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button>Alterar senha</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
