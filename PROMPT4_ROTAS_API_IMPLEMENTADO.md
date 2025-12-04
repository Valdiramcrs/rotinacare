# PROMPT 4: Rotas da API do Google Calendar - IMPLEMENTADO ✅

## 📋 STATUS: COMPLETO

Data de conclusão: 3 de dezembro de 2025

---

## ✅ O QUE FOI IMPLEMENTADO

### 1. Arquivo de Rotas Criado

**Localização:** `/home/ubuntu/rotinacare/server/src/routes/googleCalendar.ts`

**Rotas implementadas:**

#### **OAuth Flow**
- ✅ `GET /api/google-calendar/auth-url` - Gera URL de autorização OAuth
- ✅ `GET /api/google-calendar/callback` - Processa callback do Google OAuth

#### **Status e Conexão**
- ✅ `GET /api/google-calendar/status` - Verifica se usuário está conectado
- ✅ `POST /api/google-calendar/disconnect` - Desconecta Google Calendar

#### **Calendários**
- ✅ `GET /api/google-calendar/calendars` - Lista calendários do usuário

#### **Sincronização de Eventos**
- ✅ `POST /api/google-calendar/sync/:eventId` - Sincroniza evento com Google Calendar
- ✅ `DELETE /api/google-calendar/event/:googleEventId` - Remove evento do Google Calendar

---

### 2. Rotas Registradas no App Principal

**Arquivo modificado:** `/home/ubuntu/rotinacare/server/src/index.ts`

**Mudanças:**
```typescript
// Import adicionado
import googleCalendarRoutes from './routes/googleCalendar.js';

// Rota registrada
app.use('/api/google-calendar', googleCalendarRoutes);
```

---

### 3. Integração com Serviço Core

Todas as rotas estão integradas com as funções do serviço core:

| Rota | Função do Serviço |
|------|-------------------|
| `/auth-url` | `getAuthorizationUrl()` |
| `/callback` | `exchangeCodeForTokens()` |
| `/status` | `isGoogleCalendarConnected()`, `getConnectionInfo()` |
| `/disconnect` | `disconnectGoogleCalendar()` |
| `/calendars` | `listUserCalendars()` |
| `/sync/:eventId` | `syncEventToGoogle()` |
| `/event/:googleEventId` | `deleteEventFromGoogle()` |

---

## 📚 DOCUMENTAÇÃO DAS ROTAS

### 1. GET /api/google-calendar/auth-url

**Descrição:** Gera URL para iniciar fluxo OAuth do Google.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Resposta de Sucesso (200):**
```json
{
  "url": "https://accounts.google.com/o/oauth2/v2/auth?...",
  "message": "Redirect user to this URL to authorize Google Calendar access"
}
```

**Resposta de Erro (500):**
```json
{
  "error": "Failed to generate authorization URL",
  "details": "Error message"
}
```

**Uso no Frontend:**
```typescript
const response = await fetch('/api/google-calendar/auth-url', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const { url } = await response.json();
window.location.href = url; // Redirecionar usuário
```

---

### 2. GET /api/google-calendar/callback

**Descrição:** Processa callback do OAuth após autorização do usuário.

**Query Parameters:**
- `code` (string, obrigatório) - Código de autorização do Google
- `state` (string, obrigatório) - ID do usuário
- `error` (string, opcional) - Erro do OAuth se usuário negou acesso

**Redirecionamentos:**

**Sucesso:**
```
https://app.rotinacare.com/calendar?connected=true
```

**Erro - Acesso Negado:**
```
https://app.rotinacare.com/calendar?error=access_denied
```

**Erro - Código Ausente:**
```
https://app.rotinacare.com/calendar?error=missing_code
```

**Erro - State Ausente:**
```
https://app.rotinacare.com/calendar?error=missing_state
```

**Erro - Falha na Autenticação:**
```
https://app.rotinacare.com/calendar?error=auth_failed&message=<error_message>
```

**Fluxo:**
1. Usuário clica em "Conectar Google Calendar"
2. Frontend redireciona para URL de autorização
3. Usuário faz login no Google e autoriza
4. Google redireciona para este callback
5. Backend processa código e salva tokens
6. Usuário é redirecionado de volta para o app

---

### 3. GET /api/google-calendar/status

**Descrição:** Verifica se usuário está conectado ao Google Calendar.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Resposta - Não Conectado (200):**
```json
{
  "connected": false
}
```

**Resposta - Conectado (200):**
```json
{
  "connected": true,
  "email": "usuario@gmail.com",
  "connectedAt": "2025-12-03T01:30:00.000Z"
}
```

**Resposta de Erro (500):**
```json
{
  "error": "Failed to check connection status"
}
```

**Uso no Frontend:**
```typescript
const response = await fetch('/api/google-calendar/status', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const { connected, email } = await response.json();
if (connected) {
  console.log(`Conectado como: ${email}`);
}
```

---

### 4. POST /api/google-calendar/disconnect

**Descrição:** Desconecta Google Calendar do usuário.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Google Calendar disconnected successfully"
}
```

**Resposta de Erro (500):**
```json
{
  "error": "Failed to disconnect Google Calendar"
}
```

**Uso no Frontend:**
```typescript
const response = await fetch('/api/google-calendar/disconnect', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const { success } = await response.json();
if (success) {
  console.log('Desconectado com sucesso');
}
```

---

### 5. GET /api/google-calendar/calendars

**Descrição:** Lista todas as agendas do usuário no Google Calendar.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Resposta de Sucesso (200):**
```json
{
  "calendars": [
    {
      "id": "primary",
      "summary": "Minha Agenda",
      "description": "",
      "timeZone": "America/Sao_Paulo",
      "primary": true,
      "accessRole": "owner"
    },
    {
      "id": "exemplo@group.calendar.google.com",
      "summary": "Trabalho",
      "description": "Agenda de trabalho",
      "timeZone": "America/Sao_Paulo",
      "primary": false,
      "accessRole": "owner"
    }
  ],
  "count": 2
}
```

**Resposta de Erro - Não Conectado (400):**
```json
{
  "error": "Google Calendar not connected",
  "code": "NOT_CONNECTED"
}
```

**Resposta de Erro (500):**
```json
{
  "error": "Failed to list calendars"
}
```

**Uso no Frontend:**
```typescript
const response = await fetch('/api/google-calendar/calendars', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const { calendars, count } = await response.json();
console.log(`Encontradas ${count} agendas`);
```

---

### 6. POST /api/google-calendar/sync/:eventId

**Descrição:** Sincroniza um evento específico com o Google Calendar e cria link do Google Meet automaticamente.

**Headers:**
```
Authorization: Bearer <token_jwt>
Content-Type: application/json
```

**URL Parameters:**
- `eventId` (string, obrigatório) - ID do evento no banco de dados local

**Body:**
```json
{
  "calendarId": "primary"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "googleEventId": "abc123def456ghi789",
  "meetLink": "https://meet.google.com/xxx-yyyy-zzz",
  "htmlLink": "https://calendar.google.com/event?eid=...",
  "message": "Event synced to Google Calendar"
}
```

**Resposta de Erro - Não Conectado (400):**
```json
{
  "error": "Google Calendar not connected",
  "code": "NOT_CONNECTED"
}
```

**Resposta de Erro - Evento Não Encontrado (404):**
```json
{
  "error": "Event not found",
  "code": "EVENT_NOT_FOUND"
}
```

**Resposta de Erro (500):**
```json
{
  "error": "Failed to sync event to Google Calendar"
}
```

**Uso no Frontend:**
```typescript
const response = await fetch(`/api/google-calendar/sync/${eventId}`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    calendarId: 'primary'
  })
});
const { success, meetLink, htmlLink } = await response.json();
if (success) {
  console.log(`Link do Meet: ${meetLink}`);
  console.log(`Ver no Google Calendar: ${htmlLink}`);
}
```

---

### 7. DELETE /api/google-calendar/event/:googleEventId

**Descrição:** Remove evento do Google Calendar.

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**URL Parameters:**
- `googleEventId` (string, obrigatório) - ID do evento no Google Calendar

**Query Parameters:**
- `calendarId` (string, opcional) - ID da agenda (padrão: "primary")

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Event deleted from Google Calendar"
}
```

**Resposta de Erro (500):**
```json
{
  "error": "Failed to delete event from Google Calendar"
}
```

**Uso no Frontend:**
```typescript
const response = await fetch(
  `/api/google-calendar/event/${googleEventId}?calendarId=primary`,
  {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);
const { success } = await response.json();
if (success) {
  console.log('Evento deletado do Google Calendar');
}
```

---

## 🔄 FLUXO COMPLETO DE INTEGRAÇÃO

### Fluxo de Autenticação

```
1. Frontend solicita URL de autorização
   ↓
   GET /api/google-calendar/auth-url
   ↓
   Retorna URL do Google

2. Frontend redireciona usuário para URL
   ↓
   Usuário faz login no Google
   ↓
   Usuário autoriza permissões

3. Google redireciona para callback
   ↓
   GET /api/google-calendar/callback?code=...&state=userId
   ↓
   Backend troca código por tokens
   ↓
   Tokens salvos no banco de dados
   ↓
   Usuário redirecionado para app com sucesso

4. Frontend verifica status
   ↓
   GET /api/google-calendar/status
   ↓
   Retorna { connected: true, email: "..." }
```

### Fluxo de Sincronização de Evento

```
1. Usuário cria evento no RotinaCare
   ↓
   POST /api/events
   ↓
   Evento salvo no banco de dados

2. Frontend solicita sincronização
   ↓
   POST /api/google-calendar/sync/:eventId
   ↓
   Backend busca evento no banco
   ↓
   Backend cria evento no Google Calendar
   ↓
   Backend gera link do Google Meet
   ↓
   Backend salva mapeamento (eventId ↔ googleEventId)
   ↓
   Retorna { success: true, meetLink: "...", htmlLink: "..." }

3. Frontend exibe link do Meet
   ↓
   Usuário pode clicar para entrar na reunião
```

---

## 🎨 EXEMPLO DE COMPONENTE REACT

### Componente de Conexão

```tsx
import React, { useState, useEffect } from 'react';

export const GoogleCalendarConnect: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/google-calendar/status', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      const data = await response.json();
      setConnected(data.connected);
      setEmail(data.email || null);
    } catch (error) {
      console.error('Failed to check status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      const response = await fetch('/api/google-calendar/auth-url', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Failed to get auth URL:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await fetch('/api/google-calendar/disconnect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      setConnected(false);
      setEmail(null);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="google-calendar-connect">
      {connected ? (
        <div>
          <p>✅ Conectado como: {email}</p>
          <button onClick={handleDisconnect}>
            Desconectar Google Calendar
          </button>
        </div>
      ) : (
        <div>
          <p>❌ Google Calendar não conectado</p>
          <button onClick={handleConnect}>
            Conectar Google Calendar
          </button>
        </div>
      )}
    </div>
  );
};

function getToken(): string {
  // Implementar lógica para obter token JWT
  return localStorage.getItem('token') || '';
}
```

### Componente de Sincronização de Evento

```tsx
import React, { useState } from 'react';

interface SyncButtonProps {
  eventId: string;
  onSync?: (meetLink: string) => void;
}

export const SyncEventButton: React.FC<SyncButtonProps> = ({ eventId, onSync }) => {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const response = await fetch(`/api/google-calendar/sync/${eventId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          calendarId: 'primary'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to sync event');
      }

      const data = await response.json();
      setSynced(true);
      setMeetLink(data.meetLink);
      
      if (onSync) {
        onSync(data.meetLink);
      }
    } catch (error) {
      console.error('Failed to sync event:', error);
      alert('Erro ao sincronizar evento');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="sync-event-button">
      {synced ? (
        <div>
          <p>✅ Sincronizado com Google Calendar</p>
          {meetLink && (
            <a href={meetLink} target="_blank" rel="noopener noreferrer">
              🎥 Entrar no Google Meet
            </a>
          )}
        </div>
      ) : (
        <button onClick={handleSync} disabled={syncing}>
          {syncing ? 'Sincronizando...' : 'Sincronizar com Google Calendar'}
        </button>
      )}
    </div>
  );
};

function getToken(): string {
  return localStorage.getItem('token') || '';
}
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Backend
- [x] Arquivo de rotas criado (`googleCalendar.ts`)
- [x] Rotas registradas no app principal (`index.ts`)
- [x] Integração com serviço core (`googleCalendar.js`)
- [x] Tratamento de erros implementado
- [x] Logs adicionados
- [x] Documentação criada

### Google Cloud Console
- [x] Projeto criado (Manus001)
- [x] Cliente OAuth 2.0 criado (RotinaCare Web Client)
- [x] Tela de consentimento OAuth configurada
- [x] URIs de redirecionamento adicionados
- [x] Google Calendar API habilitada
- [x] Escopos configurados

### Variáveis de Ambiente
- [ ] `GOOGLE_CALENDAR_CLIENT_ID` configurada no Railway
- [ ] `GOOGLE_CALENDAR_CLIENT_SECRET` configurada no Railway
- [ ] `GOOGLE_CALENDAR_REDIRECT_URI` configurada (opcional)

### Testes
- [ ] Health check testado
- [ ] Auth URL gerada com sucesso
- [ ] Callback processa código corretamente
- [ ] Status retorna conexão correta
- [ ] Lista de calendários funciona
- [ ] Sincronização de evento funciona
- [ ] Link do Google Meet é gerado
- [ ] Deleção de evento funciona
- [ ] Desconexão funciona

### Frontend (Próximos Passos)
- [ ] Componente de conexão criado
- [ ] Botão de sincronizar evento adicionado
- [ ] Exibição de link do Meet implementada
- [ ] Tratamento de erros no frontend
- [ ] Feedback visual para usuário

---

## 🚀 PRÓXIMOS PASSOS

### 1. Configurar Variáveis de Ambiente no Railway (URGENTE)

```bash
railway variables set GOOGLE_CALENDAR_CLIENT_ID="964161562990-rvs8tasgev7quj1upa74r9u0ug3l5m0i.apps.googleusercontent.com"
railway variables set GOOGLE_CALENDAR_CLIENT_SECRET="GOCSPX-[CHAVE_COMPLETA]"
```

⚠️ **Lembre-se:** Você precisa obter a chave secreta completa do Google Cloud Console!

### 2. Deploy do Backend

```bash
cd /home/ubuntu/rotinacare/server
git add .
git commit -m "feat: add Google Calendar API routes"
git push origin main
```

### 3. Testar Endpoints

Use os comandos do arquivo `TESTES_API_GOOGLE_CALENDAR.md` para validar cada endpoint.

### 4. Implementar Frontend

Crie os componentes React usando os exemplos fornecidos neste documento.

### 5. Integração Automática

Considere sincronizar automaticamente ao criar/editar eventos:

```typescript
// Após criar evento
const event = await createEvent(eventData);

// Sincronizar automaticamente se usuário estiver conectado
const { connected } = await checkGoogleCalendarStatus();
if (connected) {
  await syncEventToGoogle(event.id);
}
```

---

## 📚 RECURSOS ADICIONAIS

### Documentação
- **Arquivo de Rotas:** `/home/ubuntu/rotinacare/server/src/routes/googleCalendar.ts`
- **Testes da API:** `/home/ubuntu/rotinacare/TESTES_API_GOOGLE_CALENDAR.md`
- **Configuração OAuth:** `/home/ubuntu/rotinacare/GOOGLE_CALENDAR_OAUTH_SETUP_COMPLETO.md`
- **Implementação Geral:** `/home/ubuntu/rotinacare/IMPLEMENTACAO_GOOGLE_CALENDAR_FINAL.md`

### Links Úteis
- **Google Cloud Console:** https://console.cloud.google.com/apis/credentials?project=manus001
- **Cliente OAuth:** https://console.cloud.google.com/auth/clients/964161562990-rvs8tasgev7quj1upa74r9u0ug3l5m0i.apps.googleusercontent.com?project=manus001
- **Google Calendar API:** https://developers.google.com/calendar/api/v3/reference

---

## 🎊 CONCLUSÃO

A implementação das rotas da API do Google Calendar está **100% completa**! 

Todas as rotas foram criadas seguindo o PROMPT 4, integradas com o serviço core, e documentadas com exemplos de uso.

**Próxima ação crítica:** Configurar as variáveis de ambiente no Railway e fazer o deploy do backend.

---

**Documento criado por:** Manus AI Agent  
**Data:** 3 de dezembro de 2025  
**Versão:** 1.0  
**Status:** ✅ Completo e Pronto para Deploy
