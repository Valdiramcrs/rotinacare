# Credenciais OAuth do Google Calendar - RotinaCare

## Status: ✅ Configuração Concluída no Google Cloud Console

**Data:** 3 de dezembro de 2025

## Informações do Cliente OAuth

### Cliente OAuth 2.0
- **Nome:** RotinaCare Web Client
- **Client ID:** `964161562990-rvs8tasgev7quj1upa74r9u0ug3l5m0i.apps.googleusercontent.com`
- **Projeto Google Cloud:** Manus001
- **Data de criação:** 29 de novembro de 2025 03:16:32 GMT+0
- **Data do último uso:** 30 de novembro de 2025

### URLs de Redirecionamento Configuradas ✅

1. **Frontend (Produção):**
   - `https://rotinacare.com/api/google-calendar/callback`

2. **Backend API (Produção):** ✅ **ADICIONADA**
   - `https://api.rotinacare.com/api/google-calendar/callback`

### Origens JavaScript Autorizadas

1. `https://rotinacare.com`

## Chaves Secretas do Cliente

### ⚠️ IMPORTANTE: Chaves Secretas Criadas

Foram criadas **2 chaves secretas** para o cliente OAuth:

#### Chave 1 (Antiga)
- **Chave secreta:** `****StpB` (mascarada)
- **Data de criação:** 29 de novembro de 2025 03:16:32 GMT+0
- **Status:** ✅ Ativada

#### Chave 2 (Nova) - CRIADA HOJE ✅
- **Chave secreta:** `****7KLF` (mascarada)
- **Data de criação:** 3 de dezembro de 2025 01:11:14 GMT+0
- **Status:** ✅ Ativada
- **Formato completo:** `GOCSPX-TzJk...` (início da chave)

### 📋 Ação Necessária

A chave secreta completa foi copiada para a área de transferência do navegador quando cliquei no botão "Copiar". 

**Para obter a chave secreta completa:**
1. A chave começa com `GOCSPX-TzJk`
2. Foi copiada para a área de transferência
3. Precisa ser salva nas variáveis de ambiente do Railway

### ⚠️ Aviso de Segurança

> "Ter mais de um secret aumenta os riscos à segurança. Desative e exclua o secret antigo quando verificar que o aplicativo está usando o novo."

**Recomendação:** Após confirmar que a nova chave funciona, desativar e excluir a chave antiga (`****StpB`).

## Próximos Passos

### 1. ✅ Configuração no Google Cloud Console (CONCLUÍDO)
- [x] Criar/verificar cliente OAuth 2.0
- [x] Adicionar URL de redirecionamento do backend
- [x] Criar nova chave secreta
- [x] Copiar chave secreta

### 2. ⏳ Configurar Variáveis de Ambiente no Railway (PENDENTE)

Adicionar as seguintes variáveis de ambiente no Railway:

```bash
GOOGLE_CLIENT_ID=964161562990-rvs8tasgev7quj1upa74r9u0ug3l5m0i.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-TzJk... (chave completa copiada)
GOOGLE_REDIRECT_URI=https://api.rotinacare.com/api/google-calendar/callback
```

### 3. ⏳ Verificar Google Calendar API Habilitada (PENDENTE)

Verificar se a Google Calendar API está habilitada no projeto Manus001.

### 4. ⏳ Criar Rotas do Backend (PENDENTE)

Criar os seguintes endpoints no backend:

- `GET /api/google-calendar/auth` - Iniciar fluxo OAuth
- `GET /api/google-calendar/callback` - Callback OAuth
- `GET /api/google-calendar/events` - Listar eventos
- `POST /api/google-calendar/events` - Criar evento
- `PUT /api/google-calendar/events/:id` - Atualizar evento
- `DELETE /api/google-calendar/events/:id` - Deletar evento
- `POST /api/google-calendar/sync` - Sincronizar eventos

### 5. ⏳ Testar Integração (PENDENTE)

- Testar fluxo OAuth
- Testar criação de eventos
- Testar sincronização

## Arquivos Relacionados

- `/home/ubuntu/rotinacare/server/src/services/googleCalendar.ts` - Serviço Google Calendar (criado)
- `/home/ubuntu/rotinacare/server/package.json` - Dependência `googleapis` instalada

## Documentação de Referência

- [Google Calendar API Documentation](https://developers.google.com/calendar/api/guides/overview)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [googleapis Node.js Client](https://github.com/googleapis/google-api-nodejs-client)

---

**Última atualização:** 3 de dezembro de 2025
**Status geral:** 🟡 Em Progresso - Configuração OAuth concluída, aguardando configuração de variáveis de ambiente
