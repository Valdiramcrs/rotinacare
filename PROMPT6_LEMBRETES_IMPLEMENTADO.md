# PROMPT 6: Sistema de Lembretes de Consulta - IMPLEMENTADO ✅

## 📋 STATUS: COMPLETO

Data de conclusão: 3 de dezembro de 2025

---

## ✅ O QUE FOI IMPLEMENTADO

### 1. Serviço de Lembretes Criado

**Localização:** `/home/ubuntu/rotinacare/server/src/services/appointmentReminders.ts`

**Funcionalidades implementadas:**

#### **Busca Inteligente de Consultas**
- ✅ Busca eventos entre 23h e 24h no futuro
- ✅ Filtra apenas eventos com `reminder_sent = false`
- ✅ Busca dados do paciente (nome e email)
- ✅ Suporta múltiplos pacientes em paralelo

#### **Envio de Lembretes**
- ✅ Formata data e hora em português brasileiro
- ✅ Envia email usando template profissional
- ✅ Marca evento como `reminder_sent = true` após envio
- ✅ Delay entre envios para evitar rate limiting

#### **Processamento em Lote**
- ✅ Processa todos os lembretes pendentes
- ✅ Retorna estatísticas (enviados, falhos, erros)
- ✅ Logs detalhados de cada operação
- ✅ Tratamento robusto de erros

#### **Recuperação de Falhas**
- ✅ Função para reenviar lembretes falhos
- ✅ Busca eventos não marcados dentro de 24h
- ✅ Útil para recuperação de erros

---

### 2. Rotas de Cron Job Criadas

**Localização:** `/home/ubuntu/rotinacare/server/src/routes/cron.ts`

**Endpoints implementados:**

#### **POST /api/cron/reminders**
- Processa lembretes de consulta
- Autenticação via API key (`x-api-key` header)
- Retorna estatísticas de envio

#### **POST /api/cron/reminders/retry**
- Reprocessa lembretes falhos
- Autenticação via API key
- Útil para recuperação

#### **GET /api/cron/health**
- Health check do serviço
- Não requer autenticação
- Retorna status e timestamp

---

### 3. Rotas Registradas no App

**Arquivo modificado:** `/home/ubuntu/rotinacare/server/src/index.ts`

**Mudanças:**
```typescript
import cronRoutes from './routes/cron.js';
app.use('/api/cron', cronRoutes);
```

---

## 📚 DOCUMENTAÇÃO DAS FUNÇÕES

### 1. getAppointmentsNeedingReminder()

**Descrição:** Busca consultas que precisam de lembrete (entre 23h e 24h no futuro).

**Retorno:** `Promise<AppointmentReminder[]>`

**Lógica:**
1. Calcula janela de tempo (now + 23h até now + 24h)
2. Busca eventos na tabela `events` com `reminder_sent = false`
3. Para cada evento, busca dados do paciente
4. Busca email do usuário via Supabase Admin API
5. Retorna array de lembretes prontos para envio

**Exemplo de uso:**
```typescript
import { getAppointmentsNeedingReminder } from './services/appointmentReminders';

const reminders = await getAppointmentsNeedingReminder();
console.log(`Encontradas ${reminders.length} consultas para lembrar`);
```

---

### 2. sendReminderEmail()

**Descrição:** Envia lembrete individual e marca como enviado no banco.

**Parâmetros:**
```typescript
{
  eventId: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  title: string;
  startTime: Date;
  location: string | null;
  videoConferenceLink: string | null;
}
```

**Retorno:** `Promise<boolean>` - `true` se enviado com sucesso

**Lógica:**
1. Formata data e hora em português
2. Chama `sendAppointmentReminder()` do Email Service
3. Se sucesso, marca `reminder_sent = true` no banco
4. Retorna resultado

**Exemplo de uso:**
```typescript
import { sendReminderEmail } from './services/appointmentReminders';

const success = await sendReminderEmail({
  eventId: 'event-123',
  patientId: 'patient-456',
  patientName: 'João Silva',
  patientEmail: 'joao@example.com',
  title: 'Consulta com Dr. Carlos',
  startTime: new Date('2025-12-10T14:00:00'),
  location: 'Clínica Saúde Total',
  videoConferenceLink: 'https://meet.google.com/abc-defg-hij'
});
```

---

### 3. processAppointmentReminders()

**Descrição:** Processa todos os lembretes pendentes. **Esta é a função principal chamada pelo cron job.**

**Retorno:**
```typescript
{
  sent: number;      // Quantidade de lembretes enviados com sucesso
  failed: number;    // Quantidade de falhas
  errors: string[];  // Lista de erros detalhados
}
```

**Lógica:**
1. Busca todas as consultas que precisam de lembrete
2. Para cada consulta:
   - Envia email de lembrete
   - Marca como enviado no banco
   - Aguarda 500ms antes do próximo (rate limiting)
3. Retorna estatísticas

**Exemplo de uso:**
```typescript
import { processAppointmentReminders } from './services/appointmentReminders';

const result = await processAppointmentReminders();
console.log(`Enviados: ${result.sent}, Falhos: ${result.failed}`);
if (result.errors.length > 0) {
  console.error('Erros:', result.errors);
}
```

---

### 4. retryFailedReminders()

**Descrição:** Reprocessa lembretes que falharam anteriormente.

**Retorno:** `Promise<ReminderResult>`

**Lógica:**
1. Busca eventos entre 1h e 24h no futuro com `reminder_sent = false`
2. Chama `processAppointmentReminders()` para reprocessar
3. Retorna estatísticas

**Exemplo de uso:**
```typescript
import { retryFailedReminders } from './services/appointmentReminders';

const result = await retryFailedReminders();
console.log(`Reenviados: ${result.sent}`);
```

---

## 🔧 CONFIGURAÇÃO

### Variáveis de Ambiente

**Obrigatória:**
```env
CRON_API_KEY=sua-chave-secreta-muito-longa-e-segura-com-pelo-menos-32-caracteres
```

**Como gerar uma chave segura:**
```bash
# Usando OpenSSL
openssl rand -hex 32

# Usando Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Exemplo de resultado:
# 7f3d8a9b2c1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b
```

**Configurar no Railway:**
```bash
railway variables set CRON_API_KEY="7f3d8a9b2c1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b"
```

---

## 🧪 TESTES

### Teste 1: Health Check

```bash
curl https://api.rotinacare.com/api/cron/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-03T01:30:00.000Z",
  "service": "appointment-reminders",
  "version": "1.0.0"
}
```

---

### Teste 2: Trigger Manual (com API key)

```bash
curl -X POST \
  -H "x-api-key: sua-chave-secreta" \
  https://api.rotinacare.com/api/cron/reminders
```

**Resposta esperada (sem lembretes pendentes):**
```json
{
  "success": true,
  "timestamp": "2025-12-03T01:30:00.000Z",
  "sent": 0,
  "failed": 0,
  "errors": []
}
```

**Resposta esperada (com lembretes enviados):**
```json
{
  "success": true,
  "timestamp": "2025-12-03T01:30:00.000Z",
  "sent": 3,
  "failed": 0,
  "errors": []
}
```

**Resposta esperada (com falhas):**
```json
{
  "success": true,
  "timestamp": "2025-12-03T01:30:00.000Z",
  "sent": 2,
  "failed": 1,
  "errors": [
    "Failed to send to paciente@example.com"
  ]
}
```

---

### Teste 3: Sem API Key (deve falhar)

```bash
curl -X POST https://api.rotinacare.com/api/cron/reminders
```

**Resposta esperada:**
```json
{
  "error": "Unauthorized"
}
```

---

### Teste 4: Retry de Lembretes Falhos

```bash
curl -X POST \
  -H "x-api-key: sua-chave-secreta" \
  https://api.rotinacare.com/api/cron/reminders/retry
```

**Resposta esperada:**
```json
{
  "success": true,
  "timestamp": "2025-12-03T01:30:00.000Z",
  "sent": 1,
  "failed": 0,
  "errors": []
}
```

---

## ⏰ CONFIGURAÇÃO DE CRON JOBS

### Opção 1: Usando cron-job.org (Recomendado - Gratuito)

**Passo 1: Criar conta**
1. Acesse: https://cron-job.org
2. Crie uma conta gratuita

**Passo 2: Criar cron job**
1. Clique em "Create cronjob"
2. Preencha:
   - **Title:** RotinaCare - Lembretes de Consulta
   - **URL:** `https://api.rotinacare.com/api/cron/reminders`
   - **Schedule:** `0 * * * *` (a cada hora)
   - **Request method:** POST
   - **Headers:**
     - Name: `x-api-key`
     - Value: `sua-chave-secreta`
3. Clique em "Create"
4. Ative o job

**Passo 3: Testar**
1. Clique em "Run now" para testar imediatamente
2. Verifique os logs para confirmar sucesso

---

### Opção 2: Usando GitHub Actions (Gratuito)

**Passo 1: Criar arquivo de workflow**

Crie `.github/workflows/reminders.yml` no repositório:

```yaml
name: Process Appointment Reminders

on:
  schedule:
    - cron: '0 * * * *'  # A cada hora
  workflow_dispatch:  # Permite trigger manual

jobs:
  process-reminders:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger reminder processing
        run: |
          curl -X POST \
            -H "x-api-key: ${{ secrets.CRON_API_KEY }}" \
            https://api.rotinacare.com/api/cron/reminders
```

**Passo 2: Configurar secret**
1. Vá para Settings > Secrets and variables > Actions
2. Clique em "New repository secret"
3. Name: `CRON_API_KEY`
4. Value: `sua-chave-secreta`
5. Clique em "Add secret"

**Passo 3: Testar**
1. Vá para Actions > Process Appointment Reminders
2. Clique em "Run workflow"
3. Verifique os logs

---

### Opção 3: Usando EasyCron (Gratuito até 20 jobs)

**Passo 1: Criar conta**
1. Acesse: https://www.easycron.com
2. Crie uma conta gratuita

**Passo 2: Criar cron job**
1. Clique em "Add Cron Job"
2. Preencha:
   - **URL:** `https://api.rotinacare.com/api/cron/reminders`
   - **Cron Expression:** `0 * * * *` (a cada hora)
   - **HTTP Method:** POST
   - **HTTP Headers:** `x-api-key: sua-chave-secreta`
3. Clique em "Create Cron Job"

---

### Opção 4: Usando Railway Cron (Se disponível)

Se o Railway suportar cron jobs nativamente:

```bash
# railway.toml
[deploy]
cron = "0 * * * * curl -X POST -H 'x-api-key: $CRON_API_KEY' https://api.rotinacare.com/api/cron/reminders"
```

---

## 🔄 FLUXO DE FUNCIONAMENTO

```
┌─────────────────────────────────────────────────────────────────┐
│                     CRON JOB (a cada hora)                       │
│                  cron-job.org / GitHub Actions                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  POST /api/cron/reminders                                        │
│  Headers: x-api-key: sua-chave-secreta                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. Verificar API key                                            │
│  2. Chamar processAppointmentReminders()                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  getAppointmentsNeedingReminder()                                │
│  - Buscar eventos entre 23h e 24h no futuro                      │
│  - Filtrar reminder_sent = false                                 │
│  - Buscar dados do paciente (nome e email)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Para cada evento:                                               │
│  1. Formatar data/hora em português                              │
│  2. sendAppointmentReminder() via Email Service                  │
│  3. Marcar reminder_sent = true no banco                         │
│  4. Aguardar 500ms (rate limiting)                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Retornar resultado:                                             │
│  { sent: X, failed: Y, errors: [...] }                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 LOGS E MONITORAMENTO

### Logs Importantes

O sistema gera logs detalhados:

```
[Reminders] ========================================
[Reminders] Starting reminder processing...
[Reminders] Time: 2025-12-03T01:00:00.000Z
[Reminders] Searching for appointments between: { from: '...', to: '...' }
[Reminders] Found 3 appointments
[Reminders] Prepared 3 reminders to send
[Reminders] Sending reminder to: paciente1@example.com
[Reminders] Reminder sent and marked: event-123
[Reminders] Sending reminder to: paciente2@example.com
[Reminders] Reminder sent and marked: event-456
[Reminders] Sending reminder to: paciente3@example.com
[Reminders] Reminder sent and marked: event-789
[Reminders] Processing complete: { sent: 3, failed: 0, errors: [] }
```

### Verificar Logs no Railway

```bash
# Ver últimos 100 logs
railway logs --tail 100

# Filtrar logs de lembretes
railway logs | grep "\[Reminders\]"

# Filtrar logs de cron
railway logs | grep "\[Cron\]"
```

---

## 🐛 TROUBLESHOOTING

### Erro: "Unauthorized"

**Causa:** API key incorreta ou ausente.

**Solução:**
1. Verifique se `CRON_API_KEY` está configurada no Railway
2. Verifique se o header `x-api-key` está correto no cron job
3. Gere uma nova chave se necessário

---

### Erro: "No appointments found needing reminder"

**Causa:** Não há consultas agendadas para as próximas 23-24 horas.

**Solução:**
- Isso é normal! O sistema só envia lembretes 24h antes
- Crie uma consulta de teste para amanhã no mesmo horário
- Aguarde o próximo ciclo do cron job

---

### Erro: "Patient not found for event"

**Causa:** Evento sem `patient_id` ou paciente deletado.

**Solução:**
1. Verifique se todos os eventos têm `patient_id` válido
2. Verifique se o paciente existe na tabela `patients`

---

### Erro: "User email not found for patient"

**Causa:** Usuário não encontrado no Supabase Auth.

**Solução:**
1. Verifique se o `patient_id` corresponde a um usuário no Supabase Auth
2. Verifique se o usuário tem email cadastrado

---

### Lembretes não estão sendo enviados

**Possíveis causas:**
1. Cron job não está rodando
2. API key incorreta
3. Email service não configurado
4. Eventos já marcados como `reminder_sent = true`

**Solução:**
1. Verifique logs do cron job externo (cron-job.org, GitHub Actions)
2. Teste manualmente: `curl -X POST -H "x-api-key: ..." https://api.rotinacare.com/api/cron/reminders`
3. Verifique se o email service está configurado: `GET /api/email/test-config`
4. Verifique no banco se `reminder_sent = false` para eventos futuros

---

### Lembretes duplicados

**Causa:** Cron job rodando mais de uma vez por hora ou `reminder_sent` não sendo marcado.

**Solução:**
1. Verifique se há apenas um cron job ativo
2. Verifique se a flag `reminder_sent` está sendo atualizada corretamente
3. Ajuste a janela de tempo (23-24h) se necessário

---

## 📈 MELHORIAS FUTURAS

### 1. Lembretes Personalizáveis

Permitir que usuários escolham quando receber lembretes:
- 24 horas antes (padrão)
- 48 horas antes
- 1 hora antes
- Múltiplos lembretes

```typescript
// Adicionar campo na tabela events
reminder_hours_before: number[] = [24, 1]  // 24h e 1h antes
```

---

### 2. Lembretes via SMS/WhatsApp

Integrar com Twilio ou WhatsApp Business API:

```typescript
import { sendSMS } from './smsService';

if (patient.phone_number) {
  await sendSMS({
    to: patient.phone_number,
    message: `Lembrete: ${title} amanhã às ${time}`
  });
}
```

---

### 3. Dashboard de Monitoramento

Criar dashboard para visualizar:
- Quantidade de lembretes enviados por dia
- Taxa de sucesso/falha
- Consultas sem lembrete
- Histórico de envios

---

### 4. Notificações Push

Enviar notificações push para o app mobile:

```typescript
import { sendPushNotification } from './pushService';

await sendPushNotification({
  userId: patient.id,
  title: 'Lembrete de Consulta',
  body: `${title} amanhã às ${time}`
});
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Backend
- [x] Serviço de lembretes criado (`appointmentReminders.ts`)
- [x] Rotas de cron job criadas (`cron.ts`)
- [x] Rotas registradas no app (`index.ts`)
- [x] Autenticação via API key implementada
- [x] Logs detalhados adicionados
- [x] Documentação criada

### Configuração
- [ ] Variável `CRON_API_KEY` configurada no Railway
- [ ] Cron job externo configurado (cron-job.org, GitHub Actions, etc.)
- [ ] Health check respondendo
- [ ] Trigger manual testado com sucesso

### Testes
- [ ] Health check retorna status "ok"
- [ ] Trigger manual com API key funciona
- [ ] Trigger sem API key retorna 401
- [ ] Lembrete enviado para consulta de teste
- [ ] Flag `reminder_sent` marcada no banco
- [ ] Email recebido na caixa de entrada

---

## 🚀 PRÓXIMOS PASSOS

### 1. Configurar API Key (URGENTE - 5 minutos)

```bash
# Gerar chave segura
openssl rand -hex 32

# Configurar no Railway
railway variables set CRON_API_KEY="chave-gerada-aqui"
```

---

### 2. Configurar Cron Job Externo (10 minutos)

**Opção recomendada: cron-job.org**

1. Acesse: https://cron-job.org
2. Crie conta gratuita
3. Adicione cron job:
   - URL: `https://api.rotinacare.com/api/cron/reminders`
   - Schedule: `0 * * * *`
   - Method: POST
   - Header: `x-api-key: sua-chave-secreta`
4. Ative o job

---

### 3. Testar Sistema (15 minutos)

```bash
# 1. Testar health check
curl https://api.rotinacare.com/api/cron/health

# 2. Criar consulta de teste para amanhã no mesmo horário

# 3. Trigger manual
curl -X POST \
  -H "x-api-key: sua-chave-secreta" \
  https://api.rotinacare.com/api/cron/reminders

# 4. Verificar email recebido

# 5. Verificar no banco se reminder_sent = true
```

---

### 4. Monitorar Primeiros Envios (1 dia)

- Verificar logs do Railway a cada hora
- Verificar logs do cron-job.org
- Confirmar que lembretes estão sendo enviados
- Ajustar configurações se necessário

---

## 📚 RECURSOS ADICIONAIS

### Documentação
- **Serviço de Lembretes:** `/home/ubuntu/rotinacare/server/src/services/appointmentReminders.ts`
- **Rotas de Cron:** `/home/ubuntu/rotinacare/server/src/routes/cron.ts`
- **Este Documento:** `/home/ubuntu/rotinacare/PROMPT6_LEMBRETES_IMPLEMENTADO.md`

### Links Úteis
- **cron-job.org:** https://cron-job.org
- **GitHub Actions:** https://docs.github.com/en/actions
- **EasyCron:** https://www.easycron.com
- **Cron Expression Generator:** https://crontab.guru

---

## 🎊 CONCLUSÃO

A implementação do sistema de lembretes automáticos está **100% completa**!

O sistema está pronto para:
- ✅ Buscar consultas que precisam de lembrete (23-24h antes)
- ✅ Enviar emails automáticos com template profissional
- ✅ Marcar lembretes como enviados no banco
- ✅ Processar em lote com estatísticas
- ✅ Recuperar de falhas
- ✅ Autenticação segura via API key
- ✅ Logs detalhados para monitoramento

**Próxima ação crítica:** Configurar API key e cron job externo.

Após a configuração, o sistema enviará lembretes automaticamente a cada hora, garantindo que os pacientes sejam notificados 24 horas antes de suas consultas! ⏰📧🎉

---

**Documento criado por:** Manus AI Agent  
**Data:** 3 de dezembro de 2025  
**Versão:** 1.0  
**Status:** ✅ Completo e Pronto para Configuração
