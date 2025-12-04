# Configuração do Banco de Dados Supabase para Integração com Google Calendar

## ✅ Tarefa Concluída com Sucesso

Data: 02 de Dezembro de 2025
Projeto: RotinaCare
Banco de Dados: Supabase (PostgreSQL)
ID do Projeto: pcthuczsisjnnettogln

---

## 📋 Resumo das Alterações

### 1. Tabela `google_calendar_tokens` (CRIADA)

Tabela para armazenar tokens OAuth do Google Calendar para cada usuário.

**Campos:**
- `id` (uuid, PK) - ID único do registro
- `user_id` (uuid, FK → auth.users) - ID do usuário (único por usuário)
- `access_token` (text) - Token de acesso do Google
- `refresh_token` (text) - Token de refresh do Google
- `token_type` (varchar(50)) - Tipo do token (padrão: 'Bearer')
- `expires_at` (timestamptz) - Data/hora de expiração do token
- `scope` (text) - Escopos de permissão concedidos
- `created_at` (timestamptz) - Data/hora de criação
- `updated_at` (timestamptz) - Data/hora da última atualização

**Segurança:**
- ✅ Row Level Security (RLS) habilitado
- ✅ Policy criada: Usuários só podem ver/editar seus próprios tokens
- ✅ Constraint UNIQUE em `user_id`
- ✅ Foreign Key com CASCADE DELETE

**Índices:**
- ✅ `ix_google_calendar_tokens_user_id` - Índice em user_id para busca rápida

---

### 2. Tabela `appointments` (ATUALIZADA)

Adicionados 4 novos campos para integração com Google Calendar.

**Novos Campos:**
- `google_calendar_event_id` (text, nullable) - ID do evento no Google Calendar
- `google_calendar_id` (text, default 'primary') - ID do calendário no Google
- `video_conference_link` (text, nullable) - Link da videoconferência (Google Meet)
- `reminder_sent` (boolean, default false) - Flag indicando se o lembrete foi enviado

**Índices:**
- ✅ `ix_appointments_google_calendar_event_id` - Índice em google_calendar_event_id para busca rápida

---

## 🔍 Verificação

### Comandos SQL Executados:

#### 1. Criação da tabela google_calendar_tokens
```sql
CREATE TABLE public.google_calendar_tokens (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    access_token text NOT NULL,
    refresh_token text NOT NULL,
    token_type varchar(50) DEFAULT 'Bearer',
    expires_at timestamp with time zone NOT NULL,
    scope text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

CREATE INDEX ix_google_calendar_tokens_user_id ON public.google_calendar_tokens(user_id);

ALTER TABLE public.google_calendar_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY google_calendar_tokens_policy ON public.google_calendar_tokens
FOR ALL
USING (auth.uid() = user_id);

COMMENT ON TABLE public.google_calendar_tokens IS 'Stores Google Calendar OAuth tokens for each user';
```

**Status:** ✅ Executado com sucesso

#### 2. Atualização da tabela appointments
```sql
ALTER TABLE public.appointments 
ADD COLUMN IF NOT EXISTS google_calendar_event_id text,
ADD COLUMN IF NOT EXISTS google_calendar_id text DEFAULT 'primary',
ADD COLUMN IF NOT EXISTS video_conference_link text,
ADD COLUMN IF NOT EXISTS reminder_sent boolean DEFAULT false;

CREATE INDEX IF NOT EXISTS ix_appointments_google_calendar_event_id 
ON public.appointments(google_calendar_event_id);
```

**Status:** ✅ Executado com sucesso

---

## 📊 Estrutura Final Confirmada

### Tabela `appointments` - Campos Relacionados ao Google Calendar:

| Campo | Tipo | Nullable | Default | Descrição |
|-------|------|----------|---------|-----------|
| google_calendar_event_id | text | ✓ | null | ID do evento no Google Calendar |
| google_calendar_id | text | ✓ | 'primary' | ID do calendário (padrão: primary) |
| video_conference_link | text | ✓ | null | Link da videoconferência (Google Meet) |
| reminder_sent | boolean | ✓ | false | Flag de envio de lembrete |

### Tabela `google_calendar_tokens` - Estrutura Completa:

| Campo | Tipo | Nullable | Default | Descrição |
|-------|------|----------|---------|-----------|
| id | uuid | ✗ | gen_random_uuid() | Primary Key |
| user_id | uuid | ✗ | - | Foreign Key → auth.users(id) |
| access_token | text | ✗ | - | Token de acesso OAuth |
| refresh_token | text | ✗ | - | Token de refresh OAuth |
| token_type | varchar(50) | ✓ | 'Bearer' | Tipo do token |
| expires_at | timestamptz | ✗ | - | Expiração do token |
| scope | text | ✓ | - | Escopos de permissão |
| created_at | timestamptz | ✗ | now() | Data de criação |
| updated_at | timestamptz | ✗ | now() | Data de atualização |

---

## 🎯 Próximos Passos

Com o banco de dados configurado, os próximos passos para implementar a integração com Google Calendar são:

1. **Backend - API de Autenticação OAuth**
   - Implementar rota `/api/auth/google/calendar` para iniciar OAuth flow
   - Implementar rota `/api/auth/google/calendar/callback` para receber tokens
   - Salvar tokens na tabela `google_calendar_tokens`

2. **Backend - API de Sincronização**
   - Implementar serviço para criar eventos no Google Calendar
   - Implementar serviço para atualizar eventos existentes
   - Implementar serviço para deletar eventos
   - Implementar webhook para receber notificações de mudanças do Google

3. **Backend - Gerenciamento de Tokens**
   - Implementar serviço para refresh automático de tokens expirados
   - Implementar lógica de retry em caso de falha de API

4. **Frontend - Interface de Usuário**
   - Botão "Conectar Google Calendar" nas configurações
   - Indicador de status de sincronização
   - Opção para desconectar/reconectar
   - Visualização de eventos sincronizados

5. **Testes**
   - Testar fluxo completo de OAuth
   - Testar criação/edição/exclusão de eventos
   - Testar sincronização bidirecional
   - Testar refresh de tokens

---

## 📝 Notas Importantes

### Segurança
- ✅ RLS habilitado na tabela de tokens
- ✅ Tokens são específicos por usuário
- ✅ Cascade delete garante limpeza ao deletar usuário
- ⚠️ **IMPORTANTE:** Tokens devem ser criptografados em repouso (considerar usar `pgcrypto`)

### Performance
- ✅ Índices criados em campos de busca frequente
- ✅ Constraint UNIQUE previne duplicação de tokens por usuário

### Manutenção
- 🔄 Considerar implementar job para limpar tokens expirados antigos
- 🔄 Considerar implementar auditoria de uso de tokens
- 🔄 Considerar implementar rate limiting para chamadas à API do Google

---

## ✅ Checklist de Verificação

- [x] Tabela `google_calendar_tokens` criada
- [x] RLS habilitado na tabela `google_calendar_tokens`
- [x] Policy criada corretamente
- [x] Campos adicionados na tabela `appointments`
- [x] Índices criados
- [x] Estrutura verificada visualmente no Supabase
- [x] Documentação completa gerada

---

**Status Final:** ✅ **CONCLUÍDO COM SUCESSO**

Todas as alterações no banco de dados foram aplicadas corretamente e estão prontas para uso pela aplicação.
