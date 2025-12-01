import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@rotinacare/ui';

export function Features() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Funcionalidades</h1>
        <p className="text-xl text-muted-foreground">
          Tudo que você precisa para gerenciar sua saúde de forma eficiente
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Gestão de Médicos</CardTitle>
            <CardDescription>
              Mantenha um cadastro completo de todos os seus médicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Cadastro com especialidade e CRM</li>
              <li>• Informações de contato</li>
              <li>• Histórico de consultas</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Controle de Medicamentos</CardTitle>
            <CardDescription>
              Nunca mais esqueça de tomar seus medicamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Lembretes automáticos</li>
              <li>• Controle de dosagem e frequência</li>
              <li>• Histórico completo</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agendamento de Consultas</CardTitle>
            <CardDescription>
              Organize todas as suas consultas médicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Calendário integrado</li>
              <li>• Notificações de lembrete</li>
              <li>• Histórico de consultas</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gestão de Exames</CardTitle>
            <CardDescription>
              Armazene e acompanhe todos os seus exames
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Upload de arquivos</li>
              <li>• Organização por tipo</li>
              <li>• Acompanhamento de resultados</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-16">
        <Button size="lg" asChild>
          <a href="https://app.rotinacare.com/register">
            Começar agora
          </a>
        </Button>
      </div>
    </div>
  );
}
