# Testes da API do Google Calendar - RotinaCare

## 📋 Pré-requisitos

Antes de testar, certifique-se de que:

1. ✅ O servidor está rodando (local ou Railway)
2. ✅ Você tem um token de autenticação válido
3. ✅ As variáveis de ambiente estão configuradas

---

## 🔑 Obter Token de Autenticação

Primeiro, faça login no app e obtenha o token JWT:

```bash
# Exemplo de login (ajuste conforme sua implementação)
curl -X POST https://api.rotinacare.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seu@email.com",
    "password": "sua_senha"
  }'
```

**Salve o token retornado:**
```bash
export TOKEN="seu_token_jwt_aqui"
```

---

## 🧪 TESTES DOS ENDPOINTS

### 1. Health Check (Verificar se o servidor está rodando)

```bash
curl https://api.rotinacare.com/api/health
```

**Resposta esperada:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-03T01:30:00.000Z",
  "uptime": 123.45,
  "version": "1.0.0"
}
```

---

### 2. Obter URL de Autorização OAuth

```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.rotinacare.com/api/google-calendar/auth-url
```

**Resposta esperada:**
```json
{
  "url": "https://accounts.google.com/o/oauth2/v2/auth?client_id=...",
  "message": "Redirect user to this URL to authorize Google Calendar access"
}
```

**Próximo passo:**
- Copie a URL retornada
- Cole no navegador
- Faça login com sua conta Google
- Autorize o acesso
- Você será redirecionado para: `https://app.rotinacare.com/calendar?connected=true`

---

### 3. Verificar Status da Conexão

**Antes de conectar:**
```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.rotinacare.com/api/google-calendar/status
```

**Resposta esperada (não conectado):**
```json
{
  "connected": false
}
```

**Depois de conectar:**
```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.rotinacare.com/api/google-calendar/status
```

**Resposta esperada (conectado):**
```json
{
  "connected": true,
  "email": "seu@gmail.com",
  "connectedAt": "2025-12-03T01:30:00.000Z"
}
```

---

### 4. Listar Calendários do Usuário

```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.rotinacare.com/api/google-calendar/calendars
```

**Resposta esperada:**
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

**Erro se não conectado:**
```json
{
  "error": "Google Calendar not connected",
  "code": "NOT_CONNECTED"
}
```

---

### 5. Sincronizar Evento com Google Calendar

**Criar um evento de teste primeiro (ajuste conforme sua API de eventos):**
```bash
# Supondo que você tenha um endpoint para criar eventos
curl -X POST https://api.rotinacare.com/api/events \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Consulta de Teste",
    "description": "Teste de sincronização com Google Calendar",
    "startTime": "2025-12-10T10:00:00-03:00",
    "endTime": "2025-12-10T11:00:00-03:00",
    "patientId": "uuid-do-paciente"
  }'
```

**Sincronizar o evento com Google Calendar:**
```bash
curl -X POST https://api.rotinacare.com/api/google-calendar/sync/EVENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "calendarId": "primary"
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "googleEventId": "abc123def456ghi789",
  "meetLink": "https://meet.google.com/xxx-yyyy-zzz",
  "htmlLink": "https://calendar.google.com/event?eid=...",
  "message": "Event synced to Google Calendar"
}
```

**Erros possíveis:**
```json
// Não conectado
{
  "error": "Google Calendar not connected",
  "code": "NOT_CONNECTED"
}

// Evento não encontrado
{
  "error": "Event not found",
  "code": "EVENT_NOT_FOUND"
}
```

---

### 6. Deletar Evento do Google Calendar

```bash
curl -X DELETE "https://api.rotinacare.com/api/google-calendar/event/GOOGLE_EVENT_ID?calendarId=primary" \
  -H "Authorization: Bearer $TOKEN"
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Event deleted from Google Calendar"
}
```

---

### 7. Desconectar Google Calendar

```bash
curl -X POST https://api.rotinacare.com/api/google-calendar/disconnect \
  -H "Authorization: Bearer $TOKEN"
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Google Calendar disconnected successfully"
}
```

---

## 🔄 FLUXO COMPLETO DE TESTE

### Passo 1: Verificar Status (Deve estar desconectado)
```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.rotinacare.com/api/google-calendar/status
```

### Passo 2: Obter URL de Autorização
```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.rotinacare.com/api/google-calendar/auth-url
```

### Passo 3: Abrir URL no Navegador e Autorizar
- Copie a URL retornada
- Cole no navegador
- Faça login e autorize

### Passo 4: Verificar Status Novamente (Deve estar conectado)
```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.rotinacare.com/api/google-calendar/status
```

### Passo 5: Listar Calendários
```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.rotinacare.com/api/google-calendar/calendars
```

### Passo 6: Criar e Sincronizar Evento
```bash
# Criar evento (ajuste conforme sua API)
# Depois sincronizar:
curl -X POST https://api.rotinacare.com/api/google-calendar/sync/EVENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"calendarId": "primary"}'
```

### Passo 7: Verificar no Google Calendar
- Abra https://calendar.google.com
- Verifique se o evento apareceu
- Clique no evento e verifique o link do Google Meet

### Passo 8: Desconectar (Opcional)
```bash
curl -X POST https://api.rotinacare.com/api/google-calendar/disconnect \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🐛 TROUBLESHOOTING

### Erro: "Failed to generate authorization URL"

**Causa:** Credenciais OAuth não configuradas.

**Solução:**
1. Verifique se as variáveis de ambiente estão definidas:
   ```bash
   echo $GOOGLE_CALENDAR_CLIENT_ID
   echo $GOOGLE_CALENDAR_CLIENT_SECRET
   ```
2. Se estiverem vazias, configure no Railway:
   ```bash
   railway variables set GOOGLE_CALENDAR_CLIENT_ID="seu_client_id"
   railway variables set GOOGLE_CALENDAR_CLIENT_SECRET="seu_client_secret"
   ```

### Erro: "redirect_uri_mismatch"

**Causa:** A URL de redirecionamento não está autorizada no Google Cloud Console.

**Solução:**
1. Acesse: https://console.cloud.google.com/apis/credentials
2. Clique no seu cliente OAuth
3. Adicione a URL em "URIs de redirecionamento autorizados":
   - Produção: `https://api.rotinacare.com/api/google-calendar/callback`
   - Desenvolvimento: `http://localhost:3001/api/google-calendar/callback`

### Erro: "Google Calendar not connected"

**Causa:** Usuário não autorizou o acesso ao Google Calendar.

**Solução:**
1. Obtenha a URL de autorização: `/api/google-calendar/auth-url`
2. Redirecione o usuário para a URL
3. Após autorização, verifique o status: `/api/google-calendar/status`

### Erro: "Event not found"

**Causa:** O ID do evento não existe no banco de dados.

**Solução:**
1. Verifique se o evento foi criado corretamente
2. Use um ID de evento válido

### Erro: "Token has been expired or revoked"

**Causa:** O refresh token foi revogado ou expirou.

**Solução:**
1. Desconecte o Google Calendar: `/api/google-calendar/disconnect`
2. Conecte novamente: `/api/google-calendar/auth-url`

---

## 📊 LOGS ÚTEIS

### Verificar logs do servidor

**Railway:**
```bash
railway logs
```

**Local:**
```bash
# Os logs aparecem no terminal onde o servidor está rodando
```

### Logs importantes:

```
[Google Calendar] Auth URL generated for user: uuid-do-usuario
[Google Calendar] Processing callback for user: uuid-do-usuario
[Google Calendar] Successfully connected for user: uuid-do-usuario
[Google Calendar] Syncing event: event-id to calendar: primary
[Google Calendar] Disconnected for user: uuid-do-usuario
```

---

## ✅ CHECKLIST DE VALIDAÇÃO

- [ ] Health check retorna status "healthy"
- [ ] Auth URL é gerada corretamente
- [ ] Callback processa código de autorização
- [ ] Status mostra "connected" após autorização
- [ ] Lista de calendários é retornada
- [ ] Evento é sincronizado com sucesso
- [ ] Link do Google Meet é gerado
- [ ] Evento aparece no Google Calendar
- [ ] Evento pode ser deletado
- [ ] Desconexão funciona corretamente

---

## 🎯 PRÓXIMOS PASSOS

Após validar todos os endpoints:

1. **Integrar com o Frontend**
   - Criar componente de conexão com Google
   - Adicionar botão de sincronizar evento
   - Exibir link do Google Meet

2. **Implementar Sincronização Automática**
   - Sincronizar automaticamente ao criar evento
   - Atualizar evento no Google Calendar ao editar
   - Deletar do Google Calendar ao remover

3. **Adicionar Webhooks (Opcional)**
   - Receber notificações de mudanças no Google Calendar
   - Sincronizar mudanças de volta para o RotinaCare

4. **Monitoramento**
   - Configurar alertas para erros
   - Monitorar taxa de sucesso de sincronização
   - Rastrear uso de cotas da API

---

**Documento criado por:** Manus AI Agent  
**Data:** 3 de dezembro de 2025  
**Versão:** 1.0
