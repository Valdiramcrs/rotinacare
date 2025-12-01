import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from '@rotinacare/ui';

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-xl text-muted-foreground">
            Tem alguma dúvida? Estamos aqui para ajudar!
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Envie sua mensagem</CardTitle>
            <CardDescription>
              Responderemos o mais breve possível
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <Input id="name" placeholder="Seu nome completo" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Assunto
                </label>
                <Input id="subject" placeholder="Como podemos ajudar?" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Descreva sua dúvida ou sugestão..."
                />
              </div>

              <Button type="submit" className="w-full">
                Enviar mensagem
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">contato@rotinacare.com</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Suporte</h3>
              <p className="text-sm text-muted-foreground">Seg-Sex, 9h às 18h</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
