# Deploy do Backend no Railway - RotinaCare

Guia completo para fazer deploy do servidor tRPC/Express no Railway.

## 📋 Pré-requisitos

- ✅ Conta no GitHub
- ✅ Repositório do projeto no GitHub
- ✅ Banco de dados Supabase configurado
- ✅ [SUPABASE_SETUP.md](SUPABASE_SETUP.md) concluído

## 🚀 Passo a Passo

### 1. Criar Conta no Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em **"Login"** no canto superior direito
3. Clique em **"Login with GitHub"** (recomendado)
4. Autorize o acesso ao GitHub
5. Aguarde redirecionamento para o Dashboard

**💡 Dica:** Login com GitHub facilita deploy automático via Git.

---

### 2. Criar Novo Projeto

1. No Dashboard, clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Se solicitado, clique em **"Configure GitHub App"**
4. Selecione o repositório `rotinacare`
5. Clique em **"Install & Authorize"**

---

### 3. Configurar o Serviço

1. O Railway detectará o monorepo
2. Clique em **"Add Service"** → **"GitHub Repo"**
3. Selecione o repositório novamente
4. Na tela de configuração:
   - **Root Directory:** `server`
   - **Branch:** `main` (ou sua branch principal)
5. Clique em **"Deploy"**

**⚠️ Importante:** O Root Directory é crucial para monorepos.

---

### 4. Configurar Build Settings

1. Clique no serviço criado (card com nome do repo)
2. Vá para a aba **"Settings"**
3. Na seção **"Build"**:
   - **Builder:** Nixpacks (padrão)
   - **Build Command:** `pnpm install && pnpm build`
   - **Start Command:** `pnpm start`
   - **Watch Paths:** `server/**`

4. Na seção **"Source"**:
   - **Root Directory:** `server`
   - **Branch:** `main`

5. Clique em **"Save Changes"**

---

### 5. Configurar Variáveis de Ambiente

1. Clique na aba **"Variables"**
2. Clique em **"New Variable"** para cada uma:

#### Variáveis Obrigatórias

```env
# Node
NODE_ENV=production
PORT=4000

# Database (copiar do Supabase)
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres

# JWT (gerar chave segura)
JWT_SECRET=SUA_CHAVE_SECRETA_MUITO_LONGA_MINIMO_32_CARACTERES

# CORS (adicionar seus domínios)
CORS_ORIGINS=https://rotinacare.com,https://app.rotinacare.com,https://admin.rotinacare.com
```

#### Variáveis Opcionais (Observabilidade)

```env
# Sentry
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
RELEASE_VERSION=v1.0.0

# Logs
LOG_LEVEL=info

# Alertas
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/xxx/xxx
```

**Para gerar JWT_SECRET seguro:**
```bash
openssl rand -base64 32
```

Ou use um gerador online: [generate-secret.now.sh](https://generate-secret.now.sh/32)

3. Após adicionar todas, o Railway fará redeploy automaticamente

---

### 6. Configurar Domínio Público

#### 6.1. Domínio Railway (Temporário)

1. Vá para a aba **"Settings"**
2. Role até **"Networking"**
3. Clique em **"Generate Domain"**
4. O Railway gerará algo como: `rotinacare-server-production.up.railway.app`
5. **Copie este domínio**

#### 6.2. Domínio Customizado (Produção)

1. Na mesma seção **"Networking"**, clique em **"Custom Domain"**
2. Digite: `api.rotinacare.com`
3. O Railway mostrará um registro CNAME:
   ```
   CNAME api → [seu-projeto].up.railway.app
   ```
4. **Anote este CNAME** para configurar no seu provedor DNS

**Configurar DNS:**
- Se usar Cloudflare, Namecheap, GoDaddy, etc:
  - Adicione registro CNAME: `api` → `[seu-projeto].up.railway.app`
  - Aguarde propagação (5-30 minutos)

---

### 7. Verificar Deploy

1. Clique na aba **"Deployments"**
2. Aguarde o deploy concluir
3. Status esperado: **"Success"** ✅
4. Clique no deployment para ver logs

**Logs esperados:**
```
🚀 Server running on http://localhost:4000
📊 Health check: http://localhost:4000/api/health
🔌 tRPC endpoint: http://localhost:4000/api/trpc
```

---

### 8. Testar Endpoints

Abra o terminal e execute:

```bash
# Health check (substitua pelo seu domínio)
curl https://rotinacare-server-production.up.railway.app/api/health

# Resposta esperada:
{
  "status": "healthy",
  "timestamp": "2025-12-01T...",
  "uptime": 5,
  "version": "v1.0.0",
  "checks": {
    "database": {
      "status": "pass",
      "message": "Database is healthy",
      "responseTime": 15
    },
    "memory": {
      "status": "pass",
      "message": "Memory usage is normal"
    }
  }
}
```

**Se retornar erro:**
1. Verifique logs no Railway (aba Deployments)
2. Verifique variáveis de ambiente
3. Verifique DATABASE_URL está correto
4. Verifique se banco Supabase está ativo

---

### 9. Executar Migrations

Se as tabelas ainda não existem no banco:

#### Opção A: Via Railway Shell

1. No Railway, clique no serviço
2. Vá para aba **"Settings"**
3. Na seção **"Service"**, clique em **"Open Shell"**
4. Execute:

```bash
pnpm drizzle-kit push
```

#### Opção B: Localmente (Recomendado)

```bash
# Na sua máquina
cd server
export DATABASE_URL="sua-connection-string-supabase"
pnpm drizzle-kit push
```

---

### 10. Popular Dados Iniciais

#### Opção A: Via Railway Shell

```bash
pnpm db:seed
```

#### Opção B: Via Supabase SQL Editor

1. Acesse Dashboard do Supabase
2. Clique em **"SQL Editor"**
3. Execute:

```sql
-- Criar usuário admin (senha: admin123)
INSERT INTO users (email, password, name, role)
VALUES (
  'admin@rotinacare.com',
  '$2b$10$rqHvVvVHxYNYp.VqR7VVxOZgqVLNqYqYqYqYqYqYqYqYqYqYqYqYq',
  'Administrador',
  'admin'
);

-- Criar usuário teste (senha: teste123)
INSERT INTO users (email, password, name, role)
VALUES (
  'teste@exemplo.com',
  '$2b$10$rqHvVvVHxYNYp.VqR7VVxOZgqVLNqYqYqYqYqYqYqYqYqYqYqYqYq',
  'Usuário Teste',
  'patient'
);
```

**⚠️ Nota:** Gere hashes bcrypt reais para produção usando:
```bash
node -e "console.log(require('bcryptjs').hashSync('sua-senha', 10))"
```

---

## 🔧 Configurações Avançadas

### Health Checks

O Railway usa o endpoint `/api/health` para verificar se o serviço está funcionando.

**Configuração (já incluída):**
- Path: `/api/health`
- Timeout: 300s
- Restart Policy: ON_FAILURE
- Max Retries: 10

### Auto Deploy

O Railway faz deploy automático quando você faz push para a branch configurada.

**Para desabilitar:**
1. Settings → Deploy
2. Desmarque "Auto Deploy"

### Variáveis de Ambiente por Branch

Você pode ter variáveis diferentes para staging e production:

1. Crie outro serviço para staging
2. Configure branch `develop`
3. Use variáveis diferentes

---

## 📊 Monitoramento

### Logs em Tempo Real

1. Clique no serviço
2. Vá para aba **"Deployments"**
3. Clique no deployment ativo
4. Logs aparecem em tempo real

### Métricas

1. Clique no serviço
2. Vá para aba **"Metrics"**
3. Visualize:
   - CPU usage
   - Memory usage
   - Network traffic
   - Request count

### Alertas

Configure alertas no Sentry (já integrado):
- Erros em produção
- Performance degradada
- Alta taxa de erro

---

## 💰 Custos

### Tier Gratuito (Trial)

- **$5 de crédito** inicial
- **500 horas** de execução/mês
- **100 GB** de tráfego de saída
- **1 GB** de RAM

### Hobby Plan ($5/mês)

- **$5 de crédito** mensal
- **500 horas** de execução
- **100 GB** de tráfego
- Sem cartão de crédito necessário

### Pro Plan ($20/mês)

- **$20 de crédito** mensal
- **Unlimited** execução
- **Unlimited** tráfego
- Suporte prioritário

**Estimativa para RotinaCare:**
- Hobby Plan é suficiente para começar
- ~$3-5/mês de uso real

---

## ✅ Checklist de Validação

- [ ] Conta Railway criada
- [ ] Repositório GitHub conectado
- [ ] Root Directory: `server`
- [ ] Build Command: `pnpm install && pnpm build`
- [ ] Start Command: `pnpm start`
- [ ] DATABASE_URL configurado (Supabase)
- [ ] JWT_SECRET configurado (32+ caracteres)
- [ ] CORS_ORIGINS configurado
- [ ] NODE_ENV=production
- [ ] Deploy com status "Success"
- [ ] Health check retorna `{"status":"healthy"}`
- [ ] Domínio público gerado
- [ ] CNAME para `api.rotinacare.com` anotado
- [ ] Migrations aplicadas
- [ ] Dados iniciais populados
- [ ] Sentry configurado (opcional)

---

## 🚨 Troubleshooting

### Erro: "Cannot find module"

**Causa:** Root Directory incorreto ou dependências não instaladas

**Solução:**
1. Verifique Root Directory está como `server`
2. Verifique Build Command: `pnpm install && pnpm build`
3. Limpe cache: Settings → Deploy → Clear Cache

### Erro: "Connection refused" no banco

**Causa:** DATABASE_URL incorreto ou banco inacessível

**Solução:**
1. Verifique DATABASE_URL no Railway
2. Teste conexão localmente:
   ```bash
   psql "postgresql://..."
   ```
3. Verifique se banco Supabase está ativo (não pausado)

### Erro: "CORS blocked"

**Causa:** CORS_ORIGINS não inclui o domínio do frontend

**Solução:**
1. Adicione todos os domínios em CORS_ORIGINS
2. Formato: `https://domain1.com,https://domain2.com`
3. Sem espaços entre vírgulas

### Erro: "Build failed"

**Causa:** Erro de TypeScript ou dependências faltando

**Solução:**
1. Verifique logs do build
2. Teste build localmente: `pnpm build`
3. Verifique se todas as dependências estão no package.json

### Deploy lento

**Causa:** Build pesado ou muitas dependências

**Solução:**
1. Use cache: Railway faz automaticamente
2. Otimize dependências (remova não usadas)
3. Use `pnpm install --frozen-lockfile`

### Serviço crashando

**Causa:** Erro não tratado ou falta de memória

**Solução:**
1. Verifique logs para stack trace
2. Verifique métricas de memória
3. Adicione mais RAM (upgrade plan)
4. Verifique Sentry para erros

---

## 🔐 Segurança

### Boas Práticas

1. **JWT_SECRET**
   - Mínimo 32 caracteres
   - Gerado aleatoriamente
   - Nunca commitar no Git

2. **DATABASE_URL**
   - Usar variável de ambiente
   - Nunca expor publicamente

3. **CORS**
   - Listar apenas domínios necessários
   - Não usar `*` em produção

4. **Variáveis Sensíveis**
   - Usar Railway Variables
   - Não commitar no código

5. **HTTPS**
   - Railway fornece SSL automático
   - Sempre usar HTTPS em produção

---

## 🔄 CI/CD Automático

O Railway já faz CI/CD automático:

1. **Push para GitHub** → Deploy automático
2. **Pull Request** → Preview deployment
3. **Merge para main** → Deploy em produção

**Customizar:**
- Use GitHub Actions para testes antes do deploy
- Veja [.github/workflows/ci.yml](../.github/workflows/ci.yml)

---

## 📚 Recursos Adicionais

- [Railway Documentation](https://docs.railway.app)
- [Railway CLI](https://docs.railway.app/develop/cli)
- [Railway Templates](https://railway.app/templates)
- [Railway Community](https://discord.gg/railway)

---

## 🆘 Suporte

**Problemas com Railway:**
- [Railway Help Center](https://help.railway.app)
- [Discord Community](https://discord.gg/railway)
- [Twitter @Railway](https://twitter.com/Railway)

**Problemas com o projeto:**
- Verifique [OBSERVABILITY.md](OBSERVABILITY.md) para logs
- Consulte [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Abra issue no repositório

---

## 📝 Informações para Salvar

Após concluir o deploy, salve estas informações:

```
# Railway
RAILWAY_PROJECT_ID=[copiado do dashboard]
RAILWAY_SERVICE_ID=[copiado do dashboard]
RAILWAY_SERVICE_URL=https://rotinacare-server-production.up.railway.app

# Domínio Customizado
API_DOMAIN=api.rotinacare.com
CNAME_TARGET=[seu-projeto].up.railway.app

# Credenciais
JWT_SECRET=[gerado]
DATABASE_URL=[Supabase]

# Observabilidade
SENTRY_DSN=[se configurado]
```

---

## 🎯 Próximos Passos

Após concluir este deploy:

1. ✅ Configure DNS (CNAME para api.rotinacare.com)
2. ✅ Teste todos os endpoints
3. ✅ Configure alertas no Sentry
4. ✅ Configure uptime monitoring
5. ➡️ **Próximo:** [Deploy dos Frontends no Vercel](VERCEL_DEPLOY.md)

---

**Última atualização:** 2025-12-01  
**Versão:** 2.1.0
