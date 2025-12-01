import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@rotinacare/ui';

export function Pricing() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Preços Simples e Transparentes</h1>
        <p className="text-xl text-muted-foreground">
          Escolha o plano ideal para você
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Gratuito</CardTitle>
            <CardDescription>Para começar</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">R$ 0</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✓ Até 3 médicos</li>
              <li>✓ Até 5 medicamentos</li>
              <li>✓ Consultas ilimitadas</li>
              <li>✓ Até 10 exames</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="https://app.rotinacare.com/register">Começar grátis</a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-primary shadow-lg">
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>Mais popular</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">R$ 19,90</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✓ Médicos ilimitados</li>
              <li>✓ Medicamentos ilimitados</li>
              <li>✓ Consultas ilimitadas</li>
              <li>✓ Exames ilimitados</li>
              <li>✓ Lembretes por email</li>
              <li>✓ Suporte prioritário</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <a href="https://app.rotinacare.com/register">Assinar Pro</a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Família</CardTitle>
            <CardDescription>Para toda a família</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">R$ 39,90</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✓ Tudo do Pro</li>
              <li>✓ Até 5 perfis</li>
              <li>✓ Compartilhamento de dados</li>
              <li>✓ Relatórios personalizados</li>
              <li>✓ Suporte premium</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="https://app.rotinacare.com/register">Assinar Família</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
