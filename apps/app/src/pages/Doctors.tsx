import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from '@rotinacare/ui';
import { WhatsAppButton, useWhatsAppMessage } from '../components/WhatsAppButton';

export function Doctors() {
  const { formatDoctorMessage } = useWhatsAppMessage();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Médicos</h1>
          <p className="text-muted-foreground">Gerencie seus médicos</p>
        </div>
        <Button>Adicionar Médico</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Dr. João Silva</CardTitle>
                <Badge className="mt-2">Cardiologista</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">CRM:</span> 12345-SP
              </div>
              <div>
                <span className="text-muted-foreground">Telefone:</span> (11) 98765-4321
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span> joao@exemplo.com
              </div>
              <div>
                <span className="text-muted-foreground">Local:</span> São Paulo, SP
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <WhatsAppButton
                message={formatDoctorMessage({
                  patientName: 'João da Silva',
                  doctorName: 'João Silva',
                  message: 'Olá Dr. João, gostaria de tirar uma dúvida sobre minha consulta.',
                })}
                phoneNumber="5511987654321"
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white w-full"
              >
                Enviar Mensagem
              </WhatsAppButton>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Editar
                </Button>
                <Button size="sm" variant="destructive">
                  Excluir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Dra. Maria Santos</CardTitle>
                <Badge className="mt-2">Endocrinologista</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">CRM:</span> 67890-SP
              </div>
              <div>
                <span className="text-muted-foreground">Telefone:</span> (11) 91234-5678
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span> maria@exemplo.com
              </div>
              <div>
                <span className="text-muted-foreground">Local:</span> São Paulo, SP
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <WhatsAppButton
                message={formatDoctorMessage({
                  patientName: 'João da Silva',
                  doctorName: 'Maria Santos',
                  message: 'Olá Dra. Maria, gostaria de tirar uma dúvida sobre meus exames.',
                })}
                phoneNumber="5511912345678"
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white w-full"
              >
                Enviar Mensagem
              </WhatsAppButton>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Editar
                </Button>
                <Button size="sm" variant="destructive">
                  Excluir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Dr. Pedro Costa</CardTitle>
                <Badge className="mt-2">Ortopedista</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">CRM:</span> 11223-SP
              </div>
              <div>
                <span className="text-muted-foreground">Telefone:</span> (11) 99876-5432
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span> pedro@exemplo.com
              </div>
              <div>
                <span className="text-muted-foreground">Local:</span> São Paulo, SP
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <WhatsAppButton
                message={formatDoctorMessage({
                  patientName: 'João da Silva',
                  doctorName: 'Pedro Costa',
                  message: 'Olá Dr. Pedro, gostaria de agendar uma consulta de retorno.',
                })}
                phoneNumber="5511998765432"
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white w-full"
              >
                Enviar Mensagem
              </WhatsAppButton>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Editar
                </Button>
                <Button size="sm" variant="destructive">
                  Excluir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
