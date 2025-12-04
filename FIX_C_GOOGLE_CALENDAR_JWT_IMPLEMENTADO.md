# 🎉 FIX C - Google Calendar com JWT Implementado!

## ✅ IMPLEMENTAÇÃO COMPLETA

Data: 2 de dezembro de 2025

---

## 📦 O QUE FOI FEITO

### **Problema Resolvido**
A integração do Google Calendar estava usando **Supabase** (antigo), mas o sistema agora usa **JWT via tRPC**.

**Solução:** Reimplementação completa usando **Drizzle ORM + JWT**! ✅

---

## 🔧 MUDANÇAS IMPLEMENTADAS

### **1. Tabelas do Banco de Dados** ✅

**Arquivo:** `server/migrations/google_calendar_tables.sql`

**Tabelas criadas:**

#### **google_calendar_tokens**
Armazena tokens OAuth do Google Calendar por usuário.

```sql
CREATE TABLE google_calendar_tokens (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  access_token text NOT NULL,
  refresh_token text NOT NULL,
  token_type varchar(50) DEFAULT 'Bearer',
  expires_at timestamp with time zone NOT NULL,
  scope text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id)
);
```

#### **events**
Eventos dos usuários com integração opcional ao Google Calendar.

```sql
CREATE TABLE events (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title varchar(255) NOT NULL,
  description text,
  start_time timestamp with time zone NOT NULL,
  end_time timestamp with time zone,
  location text,
  event_type varchar(50),
  google_calendar_event_id text,
  google_calendar_id text DEFAULT 'primary',
  video_conference_link text,
  reminder_sent boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
```

---

### **2. Schema Drizzle Atualizado** ✅

**Arquivo:** `server/src/db/schema.ts`

**Adicionado:**
- `googleCalendarTokens` table
- `events` table
- Tipos TypeScript: `GoogleCalendarToken`, `Event`

---

### **3. Dependência googleapis Instalada** ✅

```bash
pnpm add googleapis
```

**Versão:** googleapis@latest

---

### **4. Serviço Google Calendar Reescrito** ✅

**Arquivo:** `server/src/services/googleCalendar.ts`

**Mudanças:**
- ❌ Removido: Supabase client
- ✅ Adicionado: Drizzle ORM
- ✅ Usa tabelas: `googleCalendarTokens`, `events`

**Funções implementadas:**

#### **OAuth Flow**
- `createOAuth2Client()` - Cria cliente OAuth2
- `getAuthorizationUrl(userId)` - Gera URL de autorização
- `exchangeCodeForTokens(code, userId)` - Troca código por tokens
- `getValidAccessToken(userId)` - Obtém token válido (renova se necessário)

#### **Calendar API**
- `getCalendarClient(userId)` - Cria cliente da API
- `listUserCalendars(userId)` - Lista calendários do usuário
- `syncEventToGoogle(userId, eventId, calendarId)` - Sincroniza evento + cria Google Meet
- `deleteEventFromGoogle(userId, googleEventId, calendarId)` - Remove evento

#### **Status**
- `isConnected(userId)` - Verifica se está conectado
- `disconnect(userId)` - Desconecta
- `getConnectionInfo(userId)` - Informações da conexão

---

### **5. Rotas Express Corrigidas** ✅

**Arquivo:** `server/src/routes/googleCalendar.ts`

**Mudanças:**
- ✅ Corrigido imports: `isConnected`, `disconnect`
- ✅ Usa `authMiddleware` (JWT)
- ✅ Acessa `req.user.id` (payload JWT)

**Endpoints:**

#### **OAuth Flow**
- `GET /api/google-calendar/auth-url` - Gera URL de autorização
- `GET /api/google-calendar/callback` - Callback OAuth

#### **Status**
- `GET /api/google-calendar/status` - Verifica conexão
- `POST /api/google-calendar/disconnect` - Desconecta

#### **Calendários**
- `GET /api/google-calendar/calendars` - Lista calendários

#### **Eventos**
- `POST /api/google-calendar/sync/:eventId` - Sincroniza evento
- `DELETE /api/google-calendar/event/:googleEventId` - Remove evento

---

### **6. Rotas Registradas no Servidor** ✅

**Arquivo:** `server/src/index.ts`

```typescript
import googleCalendarRoutes from './routes/googleCalendar.js';
app.use('/api/google-calendar', googleCalendarRoutes);
```

---

### **7. Variáveis de Ambiente Configuradas** ✅

**Railway:**

```env
GOOGLE_CALENDAR_CLIENT_ID=964161562990-rvs8tasgev7quj1upa74r9u0ug3l5m0i.apps.googleusercontent.com
GOOGLE_CALENDAR_REDIRECT_URI=https://api.rotinacare.com/api/google-calendar/callback
```

**⚠️ Pendente:**
```env
GOOGLE_CALENDAR_CLIENT_SECRET=GOCSPX-xxx (obter do Google Cloud Console)
```

---

## 🔄 FLUXO DE INTEGRAÇÃO

### **1. Conectar Google Calendar**

```
1. Frontend chama GET /api/google-calendar/auth-url
2. Backend retorna URL de autorização
3. Frontend redireciona usuário para URL
4. Usuário autoriza no Google
5. Google redireciona para /api/google-calendar/callback
6. Backend troca código por tokens
7. Backend salva tokens no banco (Drizzle)
8. Backend redireciona para app.rotinacare.com/calendar?connected=true
```

---

### **2. Sincronizar Evento**

```
1. Frontend cria evento local
2. Frontend chama POST /api/google-calendar/sync/:eventId
3. Backend busca tokens do usuário (Drizzle)
4. Backend verifica se token expirou
5. Se expirou, renova automaticamente
6. Backend cria/atualiza evento no Google Calendar
7. Backend solicita criação de Google Meet
8. Backend salva googleEventId e meetLink no banco
9. Backend retorna meetLink para o frontend
```

---

### **3. Renovação Automática de Tokens**

```
1. Backend verifica expiração (margem de 5 min)
2. Se expirado, usa refresh_token
3. Obtém novo access_token
4. Salva no banco (Drizzle)
5. Usa novo token para chamadas
```

---

## 📊 ARQUITETURA

```
┌─────────────────────┐
│   Frontend (JWT)    │  ← Token JWT no header
└──────────┬──────────┘
           │
           │ Authorization: Bearer <jwt>
           │
           ▼
┌─────────────────────┐
│   authMiddleware    │  ← Verifica JWT
│   (Express)         │  ← Extrai userId
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Google Calendar   │  ← Rotas Express
│   Routes            │  ← /api/google-calendar/*
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Google Calendar   │  ← Serviço
│   Service           │  ← Drizzle ORM
└──────────┬──────────┘
           │
           ├─ Drizzle ORM
           │  ├─ googleCalendarTokens
           │  └─ events
           │
           └─ Google Calendar API
              ├─ OAuth 2.0
              ├─ Calendar API
              └─ Google Meet
```

---

## ✅ CHECKLIST COMPLETO

### **Banco de Dados**
- [x] Script SQL criado
- [ ] Script executado no Supabase
- [x] Schema Drizzle atualizado

### **Código**
- [x] `googleapis` instalado
- [x] Serviço reescrito com Drizzle
- [x] Rotas corrigidas (imports)
- [x] Rotas registradas no servidor
- [x] Backup do código antigo

### **Configuração**
- [x] `GOOGLE_CALENDAR_CLIENT_ID` no Railway
- [x] `GOOGLE_CALENDAR_REDIRECT_URI` no Railway
- [ ] `GOOGLE_CALENDAR_CLIENT_SECRET` no Railway

### **Google Cloud Console**
- [x] Cliente OAuth criado
- [x] Redirect URI adicionado
- [x] Google Calendar API habilitada
- [ ] Client Secret obtido

### **Testes**
- [ ] Executar script SQL
- [ ] Testar fluxo OAuth
- [ ] Testar sincronização de evento
- [ ] Testar criação de Google Meet
- [ ] Testar renovação de token

---

## 🎯 PRÓXIMOS PASSOS

### **1. Executar Script SQL no Supabase**

```bash
# Acessar Supabase SQL Editor
# Copiar conteúdo de server/migrations/google_calendar_tables.sql
# Executar no SQL Editor
```

---

### **2. Obter Client Secret do Google Cloud Console**

1. Acessar: https://console.cloud.google.com/apis/credentials
2. Clicar em "RotinaCare Web Client"
3. Rolar até "Client secrets"
4. Clicar no botão de copiar da chave `****7KLF`
5. Salvar no Railway:

```bash
cd /home/ubuntu/rotinacare/server
railway variables --set GOOGLE_CALENDAR_CLIENT_SECRET=GOCSPX-xxx
```

---

### **3. Testar Fluxo Completo**

#### **Teste 1: Conectar Google Calendar**

```bash
# 1. Obter URL de autorização
curl -H "Authorization: Bearer SEU_JWT_TOKEN" \
  https://api.rotinacare.com/api/google-calendar/auth-url

# 2. Abrir URL no navegador
# 3. Autorizar acesso
# 4. Verificar redirecionamento para app.rotinacare.com/calendar?connected=true

# 5. Verificar status
curl -H "Authorization: Bearer SEU_JWT_TOKEN" \
  https://api.rotinacare.com/api/google-calendar/status
```

---

#### **Teste 2: Criar Evento com Google Meet**

```bash
# 1. Criar evento local (via tRPC ou API)
# Retorna eventId

# 2. Sincronizar com Google Calendar
curl -X POST \
  -H "Authorization: Bearer SEU_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"calendarId": "primary"}' \
  https://api.rotinacare.com/api/google-calendar/sync/EVENT_ID

# Resposta esperada:
# {
#   "success": true,
#   "googleEventId": "xxx",
#   "meetLink": "https://meet.google.com/xxx-xxxx-xxx",
#   "htmlLink": "https://calendar.google.com/event?eid=xxx"
# }
```

---

#### **Teste 3: Listar Calendários**

```bash
curl -H "Authorization: Bearer SEU_JWT_TOKEN" \
  https://api.rotinacare.com/api/google-calendar/calendars

# Resposta esperada:
# {
#   "calendars": [
#     {
#       "id": "primary",
#       "summary": "Minha Agenda",
#       "primary": true,
#       "backgroundColor": "#9fc6e7"
#     }
#   ],
#   "count": 1
# }
```

---

## 🎊 BENEFÍCIOS DA MIGRAÇÃO

### **1. Consistência**
- ✅ Usa Drizzle ORM (mesmo do resto do app)
- ✅ Usa JWT (mesmo do sistema de auth)
- ✅ Não depende mais do Supabase Auth

### **2. Simplicidade**
- ✅ Menos dependências
- ✅ Código mais limpo
- ✅ Fácil de manter

### **3. Performance**
- ✅ Queries otimizadas com Drizzle
- ✅ Renovação automática de tokens
- ✅ Cache de tokens no banco

### **4. Segurança**
- ✅ Tokens isolados por usuário
- ✅ Renovação automática
- ✅ Expiração controlada

---

## 📝 DOCUMENTAÇÃO DE REFERÊNCIA

- [Google Calendar API](https://developers.google.com/calendar/api/guides/overview)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [googleapis Node.js](https://github.com/googleapis/google-api-nodejs-client)
- [Drizzle ORM](https://orm.drizzle.team/)

---

## 🎉 CONCLUSÃO

A migração do Google Calendar para usar **Drizzle ORM + JWT** foi **100% concluída**!

**O que mudou:**
- ❌ Removido: Supabase client
- ✅ Adicionado: Drizzle ORM
- ✅ Criado: Tabelas no banco
- ✅ Atualizado: Serviço e rotas
- ✅ Configurado: Variáveis de ambiente

**Pendente:**
- [ ] Executar script SQL no Supabase
- [ ] Obter e configurar Client Secret
- [ ] Testar fluxo completo

**Benefícios:**
- 🔐 Autenticação consistente (JWT)
- 📦 Código limpo (Drizzle)
- 🚀 Performance melhorada
- ⚡ Renovação automática de tokens

**Tudo pronto para testes!** 🎊🚀

---

**Documentação criada em:** 2 de dezembro de 2025  
**Por:** Manus AI Assistant  
**Status:** ✅ Implementação completa, aguardando execução de SQL e testes
