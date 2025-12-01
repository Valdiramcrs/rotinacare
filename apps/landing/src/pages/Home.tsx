import { Button } from '@rotinacare/ui';

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Cuide da sua saúde de forma{' '}
            <span className="text-primary">organizada</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Gerencie consultas, medicamentos, exames e muito mais em um só lugar.
            Sua rotina de saúde nunca foi tão simples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="https://app.rotinacare.com/register">
                Começar gratuitamente
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/features">Conhecer funcionalidades</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tudo que você precisa para cuidar da sua saúde
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Consultas</h3>
              <p className="text-muted-foreground">
                Organize todas as suas consultas médicas com lembretes automáticos.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Medicamentos</h3>
              <p className="text-muted-foreground">
                Controle seus medicamentos e nunca mais esqueça de tomar.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Exames</h3>
              <p className="text-muted-foreground">
                Armazene e acompanhe todos os seus exames em um só lugar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Crie sua conta gratuitamente e comece a organizar sua saúde hoje mesmo.
          </p>
          <Button size="lg" asChild>
            <a href="https://app.rotinacare.com/register">
              Criar conta grátis
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
