# PROMPT 5: Email Service - IMPLEMENTADO ✅

## 📋 STATUS: COMPLETO

Data de conclusão: 3 de dezembro de 2025

---

## ✅ O QUE FOI IMPLEMENTADO

### 1. Dependências Instaladas

**Pacotes adicionados:**
- ✅ `nodemailer@7.0.11` - Biblioteca para envio de emails via SMTP
- ✅ `@types/nodemailer@7.0.4` - Tipos TypeScript para nodemailer

**Comando executado:**
```bash
pnpm add nodemailer
pnpm add -D @types/nodemailer
```

---

### 2. Serviço de Email Criado

**Localização:** `/home/ubuntu/rotinacare/server/src/services/emailService.ts`

**Funcionalidades implementadas:**

#### **Configuração SMTP**
- ✅ Suporte para Gmail, SendGrid, Mailgun e outros provedores SMTP
- ✅ Configuração via variáveis de ambiente
- ✅ Transporter reutilizável (singleton pattern)
- ✅ Configurações especiais para Gmail (TLS)
- ✅ Suporte para SSL (porta 465) e TLS (porta 587)

#### **Funções Principais**
- ✅ `sendEmail()` - Envio genérico de emails
- ✅ `testEmailConfiguration()` - Teste de configuração SMTP
- ✅ `sendAppointmentReminder()` - Lembrete de consulta
- ✅ `sendWelcomeEmail()` - Email de boas-vindas
- ✅ `sendNotification()` - Notificação genérica

#### **Templates HTML**
- ✅ Template base responsivo e profissional
- ✅ Design moderno com gradientes
- ✅ Compatível com clientes de email
- ✅ Suporte para botões de ação
- ✅ Branding do RotinaCare

---

### 3. Rotas de Teste Criadas

**Localização:** `/home/ubuntu/rotinacare/server/src/routes/email.ts`

**Endpoints implementados:**

#### **GET /api/email/test-config**
- Testa configuração SMTP
- Verifica conectividade com servidor de email
- Requer autenticação

#### **POST /api/email/send-test**
- Envia email de teste
- Valida envio end-to-end
- Requer autenticação

---

### 4. Rotas Registradas no App

**Arquivo modificado:** `/home/ubuntu/rotinacare/server/src/index.ts`

**Mudanças:**
```typescript
// Import adicionado
import emailRoutes from './routes/email.js';

// Rota registrada
app.use('/api/email', emailRoutes);
```

---

## 📚 DOCUMENTAÇÃO DAS FUNÇÕES

### 1. sendEmail()

**Descrição:** Envia email genérico com suporte para HTML e texto plano.

**Parâmetros:**
```typescript
{
  to: string | string[];        // Destinatário(s)
  subject: string;               // Assunto do email
  html: string;                  // Conteúdo HTML
  text?: string;                 // Conteúdo texto plano (opcional)
  from?: string;                 // Remetente (opcional, usa EMAIL_FROM)
  replyTo?: string;              // Email para resposta (opcional)
}
```

**Retorno:** `Promise<boolean>` - `true` se enviado com sucesso

**Exemplo de uso:**
```typescript
import { sendEmail } from './services/emailService';

const success = await sendEmail({
  to: 'paciente@example.com',
  subject: 'Confirmação de Consulta',
  html: '<h1>Sua consulta foi confirmada!</h1>',
  text: 'Sua consulta foi confirmada!'
});

if (success) {
  console.log('Email enviado com sucesso!');
}
```

---

### 2. testEmailConfiguration()

**Descrição:** Testa se a configuração SMTP está válida.

**Retorno:**
```typescript
{
  success: boolean;
  message: string;
}
```

**Exemplo de uso:**
```typescript
import { testEmailConfiguration } from './services/emailService';

const result = await testEmailConfiguration();

if (result.success) {
  console.log('✅ SMTP configurado corretamente');
} else {
  console.error('❌ Erro:', result.message);
}
```

---

### 3. sendAppointmentReminder()

**Descrição:** Envia lembrete de consulta com template profissional.

**Parâmetros:**
```typescript
{
  to: string;                    // Email do paciente
  patientName: string;           // Nome do paciente
  title: string;                 // Título da consulta
  date: string;                  // Data formatada (ex: "10 de dezembro de 2025")
  time: string;                  // Horário (ex: "14:00")
  location?: string;             // Local (opcional)
  videoConferenceLink?: string;  // Link do Google Meet (opcional)
}
```

**Retorno:** `Promise<boolean>`

**Exemplo de uso:**
```typescript
import { sendAppointmentReminder } from './services/emailService';

const success = await sendAppointmentReminder({
  to: 'paciente@example.com',
  patientName: 'João Silva',
  title: 'Consulta com Dr. Carlos',
  date: '10 de dezembro de 2025',
  time: '14:00',
  location: 'Clínica Saúde Total - Sala 302',
  videoConferenceLink: 'https://meet.google.com/abc-defg-hij'
});
```

**Preview do email:**
```
🏥 Lembrete de Consulta

Olá, João Silva!

Este é um lembrete da sua consulta agendada para amanhã:

📋 Título: Consulta com Dr. Carlos
📅 Data: 10 de dezembro de 2025
🕐 Horário: 14:00
📍 Local: Clínica Saúde Total - Sala 302
💻 Videoconferência: [Botão: Entrar no Google Meet]

Não esqueça de comparecer!
```

---

### 4. sendWelcomeEmail()

**Descrição:** Envia email de boas-vindas para novos usuários.

**Parâmetros:**
```typescript
{
  to: string;      // Email do novo usuário
  name: string;    // Nome do usuário
}
```

**Retorno:** `Promise<boolean>`

**Exemplo de uso:**
```typescript
import { sendWelcomeEmail } from './services/emailService';

// Após criar novo usuário
const success = await sendWelcomeEmail({
  to: 'novousuario@example.com',
  name: 'Maria Santos'
});
```

**Preview do email:**
```
🎉 Bem-vindo ao RotinaCare!

Olá, Maria Santos!

Estamos muito felizes em ter você conosco...

O que você pode fazer:
✅ Cadastrar seus médicos e profissionais de saúde
✅ Registrar medicamentos e receber lembretes
✅ Acompanhar exames e diagnósticos
✅ Agendar consultas e sincronizar com Google Calendar
✅ Gerar insights com Inteligência Artificial

[Botão: Acessar meu painel]
```

---

### 5. sendNotification()

**Descrição:** Envia notificação genérica customizável.

**Parâmetros:**
```typescript
{
  to: string;           // Email do destinatário
  title: string;        // Título da notificação
  message: string;      // Mensagem (pode conter HTML)
  actionUrl?: string;   // URL do botão de ação (opcional)
  actionText?: string;  // Texto do botão (opcional, padrão: "Ver detalhes")
}
```

**Retorno:** `Promise<boolean>`

**Exemplo de uso:**
```typescript
import { sendNotification } from './services/emailService';

const success = await sendNotification({
  to: 'paciente@example.com',
  title: 'Novo Resultado de Exame',
  message: 'Seu resultado de exame já está disponível para visualização.',
  actionUrl: 'https://app.rotinacare.com/exams/123',
  actionText: 'Ver Resultado'
});
```

---

## 🔧 CONFIGURAÇÃO

### Variáveis de Ambiente

**Obrigatórias:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-ou-app-password
```

**Opcionais:**
```env
SMTP_PORT=587                                    # Padrão: 587 (TLS) ou 465 (SSL)
EMAIL_FROM="RotinaCare <noreply@rotinacare.com>" # Padrão: RotinaCare <noreply@rotinacare.com>
```

---

### Configuração para Gmail

**Passo 1: Ativar verificação em duas etapas**
1. Acesse: https://myaccount.google.com/security
2. Ative "Verificação em duas etapas"

**Passo 2: Gerar senha de app**
1. Acesse: https://myaccount.google.com/apppasswords
2. Selecione "Email" e "Outro (nome personalizado)"
3. Digite "RotinaCare"
4. Clique em "Gerar"
5. Copie a senha gerada (16 caracteres)

**Passo 3: Configurar variáveis de ambiente**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx  # Senha de app gerada
EMAIL_FROM="RotinaCare <seu-email@gmail.com>"
```

---

### Configuração para SendGrid

**Passo 1: Criar conta no SendGrid**
1. Acesse: https://sendgrid.com
2. Crie uma conta gratuita (100 emails/dia)

**Passo 2: Gerar API Key**
1. Acesse: Settings > API Keys
2. Clique em "Create API Key"
3. Nome: "RotinaCare SMTP"
4. Permissões: "Full Access" ou "Mail Send"
5. Copie a API Key

**Passo 3: Configurar variáveis de ambiente**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxxx  # API Key do SendGrid
EMAIL_FROM="RotinaCare <noreply@rotinacare.com>"
```

---

### Configuração para Mailgun

**Passo 1: Criar conta no Mailgun**
1. Acesse: https://mailgun.com
2. Crie uma conta (5.000 emails/mês grátis nos primeiros 3 meses)

**Passo 2: Obter credenciais SMTP**
1. Acesse: Sending > Domain Settings > SMTP credentials
2. Copie o hostname, username e password

**Passo 3: Configurar variáveis de ambiente**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@seu-dominio.mailgun.org
SMTP_PASS=sua-senha-mailgun
EMAIL_FROM="RotinaCare <noreply@seu-dominio.com>"
```

---

## 🧪 TESTES

### Teste 1: Verificar Configuração SMTP

**Endpoint:** `GET /api/email/test-config`

**Comando:**
```bash
curl -H "Authorization: Bearer SEU_TOKEN" \
  https://api.rotinacare.com/api/email/test-config
```

**Resposta esperada (sucesso):**
```json
{
  "success": true,
  "message": "SMTP configuration is valid"
}
```

**Resposta esperada (erro - não configurado):**
```json
{
  "success": false,
  "message": "SMTP not configured. Check environment variables."
}
```

**Resposta esperada (erro - credenciais inválidas):**
```json
{
  "success": false,
  "message": "SMTP verification failed: Invalid login: 535-5.7.8 Username and Password not accepted"
}
```

---

### Teste 2: Enviar Email de Teste

**Endpoint:** `POST /api/email/send-test`

**Comando:**
```bash
curl -X POST \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"to": "seu-email@example.com"}' \
  https://api.rotinacare.com/api/email/send-test
```

**Resposta esperada (sucesso):**
```json
{
  "success": true,
  "message": "Test email sent successfully to seu-email@example.com"
}
```

**Resposta esperada (erro):**
```json
{
  "success": false,
  "message": "Failed to send test email. Check server logs for details."
}
```

**Email recebido:**
```
Assunto: ✅ Teste RotinaCare - Email Service

Email de Teste do RotinaCare

Este é um email de teste do sistema RotinaCare.

Se você recebeu este email, a configuração SMTP está 
funcionando perfeitamente! 🎉

📅 Data do teste: [data e hora completa]
Testado por: [seu email]
```

---

## 🔄 INTEGRAÇÃO COM OUTRAS FUNCIONALIDADES

### 1. Enviar Email de Boas-Vindas ao Criar Usuário

**Arquivo:** `src/routes/auth.ts`

```typescript
import { sendWelcomeEmail } from '../services/emailService.js';

// Após criar usuário
router.post('/create-profile', authMiddleware, async (req, res) => {
  // ... código de criação do perfil ...
  
  // Enviar email de boas-vindas
  await sendWelcomeEmail({
    to: req.user!.email,
    name: full_name
  });
  
  res.status(201).json({ patient });
});
```

---

### 2. Enviar Lembrete de Consulta (Agendamento Automático)

**Criar arquivo:** `src/jobs/appointmentReminders.ts`

```typescript
import { supabase } from '../lib/supabase.js';
import { sendAppointmentReminder } from '../services/emailService.js';

/**
 * Job que roda diariamente para enviar lembretes de consultas
 * Envia lembretes 24h antes da consulta
 */
export async function sendAppointmentReminders() {
  console.log('[Job] Checking for appointments to remind...');
  
  // Data de amanhã
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
  
  // Buscar consultas de amanhã
  const { data: appointments, error } = await supabase
    .from('appointments')
    .select(`
      *,
      patient:patients(full_name, email),
      doctor:doctors(name)
    `)
    .gte('start_time', tomorrow.toISOString())
    .lt('start_time', dayAfterTomorrow.toISOString())
    .eq('status', 'confirmed');
  
  if (error) {
    console.error('[Job] Failed to fetch appointments:', error);
    return;
  }
  
  console.log(`[Job] Found ${appointments?.length || 0} appointments to remind`);
  
  // Enviar lembretes
  for (const appointment of appointments || []) {
    try {
      const startTime = new Date(appointment.start_time);
      
      await sendAppointmentReminder({
        to: appointment.patient.email,
        patientName: appointment.patient.full_name,
        title: appointment.title || `Consulta com ${appointment.doctor.name}`,
        date: startTime.toLocaleDateString('pt-BR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        time: startTime.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        location: appointment.location,
        videoConferenceLink: appointment.video_conference_link
      });
      
      console.log(`[Job] Reminder sent for appointment ${appointment.id}`);
    } catch (error) {
      console.error(`[Job] Failed to send reminder for appointment ${appointment.id}:`, error);
    }
  }
  
  console.log('[Job] Appointment reminders job completed');
}
```

**Agendar job (usando node-cron):**

```bash
pnpm add node-cron @types/node-cron
```

```typescript
// src/index.ts
import cron from 'node-cron';
import { sendAppointmentReminders } from './jobs/appointmentReminders.js';

// Rodar todo dia às 9h da manhã
cron.schedule('0 9 * * *', () => {
  console.log('[Cron] Running appointment reminders job...');
  sendAppointmentReminders();
}, {
  timezone: 'America/Sao_Paulo'
});
```

---

### 3. Notificar Paciente Quando Exame Estiver Pronto

```typescript
import { sendNotification } from '../services/emailService.js';

// Após upload de resultado de exame
router.post('/exams/:id/upload-result', authMiddleware, async (req, res) => {
  // ... código de upload ...
  
  // Buscar dados do paciente e exame
  const { data: exam } = await supabase
    .from('exams')
    .select('*, patient:patients(full_name, email)')
    .eq('id', examId)
    .single();
  
  // Enviar notificação
  await sendNotification({
    to: exam.patient.email,
    title: 'Resultado de Exame Disponível',
    message: `Olá, ${exam.patient.full_name}!<br/><br/>O resultado do seu exame <strong>${exam.name}</strong> já está disponível para visualização.`,
    actionUrl: `https://app.rotinacare.com/exams/${examId}`,
    actionText: 'Ver Resultado'
  });
  
  res.json({ success: true });
});
```

---

## 📊 MONITORAMENTO E LOGS

### Logs Importantes

O serviço de email gera logs detalhados:

```
[Email] SMTP transporter configured: { host: 'smtp.gmail.com', port: 587, user: 'email@gmail.com' }
[Email] Email sent: { to: 'paciente@example.com', subject: 'Lembrete de Consulta', messageId: '<abc123@gmail.com>' }
[Email] SMTP configuration verified successfully
[Email] Failed to send email: Error: Invalid login
```

### Verificar Logs no Railway

```bash
railway logs --tail 100
```

### Filtrar Logs de Email

```bash
railway logs | grep "\[Email\]"
```

---

## 🐛 TROUBLESHOOTING

### Erro: "SMTP not configured"

**Causa:** Variáveis de ambiente não definidas.

**Solução:**
```bash
railway variables set SMTP_HOST="smtp.gmail.com"
railway variables set SMTP_USER="seu-email@gmail.com"
railway variables set SMTP_PASS="sua-senha-de-app"
```

---

### Erro: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Causa:** Credenciais inválidas ou senha de app não gerada.

**Solução para Gmail:**
1. Verifique se a verificação em duas etapas está ativada
2. Gere uma nova senha de app em: https://myaccount.google.com/apppasswords
3. Use a senha de app (16 caracteres) no `SMTP_PASS`

---

### Erro: "Connection timeout"

**Causa:** Porta bloqueada ou firewall.

**Solução:**
1. Tente porta 465 (SSL) em vez de 587 (TLS):
   ```bash
   railway variables set SMTP_PORT="465"
   ```
2. Verifique se o Railway permite conexões SMTP de saída

---

### Email não chega na caixa de entrada

**Possíveis causas:**
1. Email foi para spam
2. Domínio não verificado (SendGrid/Mailgun)
3. Limite de envio atingido

**Solução:**
1. Verifique pasta de spam
2. Configure SPF, DKIM e DMARC no seu domínio
3. Use domínio verificado no SendGrid/Mailgun
4. Verifique cotas de envio do provedor

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Backend
- [x] Dependências instaladas (`nodemailer`, `@types/nodemailer`)
- [x] Serviço de email criado (`emailService.ts`)
- [x] Rotas de teste criadas (`email.ts`)
- [x] Rotas registradas no app (`index.ts`)
- [x] Funções de template implementadas
- [x] Documentação criada

### Configuração
- [ ] Variáveis de ambiente configuradas no Railway
- [ ] Teste de configuração retorna sucesso
- [ ] Email de teste recebido na caixa de entrada

### Integração
- [ ] Email de boas-vindas integrado ao cadastro
- [ ] Job de lembretes de consulta implementado
- [ ] Notificações de exames implementadas

---

## 🚀 PRÓXIMOS PASSOS

### 1. Configurar Variáveis de Ambiente (URGENTE)

**Para Gmail:**
```bash
railway variables set SMTP_HOST="smtp.gmail.com"
railway variables set SMTP_PORT="587"
railway variables set SMTP_USER="seu-email@gmail.com"
railway variables set SMTP_PASS="sua-senha-de-app-16-caracteres"
railway variables set EMAIL_FROM="RotinaCare <seu-email@gmail.com>"
```

### 2. Testar Configuração

```bash
# Testar configuração SMTP
curl -H "Authorization: Bearer SEU_TOKEN" \
  https://api.rotinacare.com/api/email/test-config

# Enviar email de teste
curl -X POST \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"to": "seu-email@example.com"}' \
  https://api.rotinacare.com/api/email/send-test
```

### 3. Integrar com Cadastro de Usuário

Adicione envio de email de boas-vindas ao criar novo usuário.

### 4. Implementar Job de Lembretes

Configure job diário para enviar lembretes de consultas 24h antes.

### 5. Adicionar Notificações de Exames

Notifique pacientes quando resultados de exames estiverem prontos.

---

## 📚 RECURSOS ADICIONAIS

### Documentação
- **Serviço de Email:** `/home/ubuntu/rotinacare/server/src/services/emailService.ts`
- **Rotas de Teste:** `/home/ubuntu/rotinacare/server/src/routes/email.ts`
- **Este Documento:** `/home/ubuntu/rotinacare/PROMPT5_EMAIL_SERVICE_IMPLEMENTADO.md`

### Links Úteis
- **Nodemailer:** https://nodemailer.com/about/
- **Gmail App Passwords:** https://myaccount.google.com/apppasswords
- **SendGrid:** https://sendgrid.com
- **Mailgun:** https://mailgun.com

---

## 🎊 CONCLUSÃO

A implementação do serviço de email está **100% completa**!

O sistema está pronto para:
- ✅ Enviar emails transacionais (lembretes, notificações)
- ✅ Emails de boas-vindas para novos usuários
- ✅ Templates HTML profissionais e responsivos
- ✅ Suporte para múltiplos provedores SMTP
- ✅ Testes e validação de configuração

**Próxima ação crítica:** Configurar variáveis de ambiente no Railway e testar o envio de emails.

Após a configuração, você terá um sistema completo de comunicação por email integrado ao RotinaCare! 📧🎉

---

**Documento criado por:** Manus AI Agent  
**Data:** 3 de dezembro de 2025  
**Versão:** 1.0  
**Status:** ✅ Completo e Pronto para Configuração
