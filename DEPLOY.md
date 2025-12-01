# Guia de Deploy - RotinasCare

Este guia descreve como fazer o deploy completo da plataforma RotinasCare.

## Visão Geral

A plataforma RotinasCare é composta por:

- **3 aplicações frontend** (Landing, App, Admin) → Deploy no Vercel
- **1 backend** (Server) → Deploy no Railway ou similar
- **1 banco de dados** MySQL → Railway, PlanetScale ou AWS RDS

## Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Conta no [Railway](https://railway.app) ou similar
- Repositório Git (GitHub, GitLab, etc.)

## 1. Deploy do Banco de Dados

### Opção A: Railway (Recomendado)

1. Acesse [Railway](https://railway.app)
2. Crie novo projeto
3. Adicione serviço MySQL
4. Copie as credenciais de conexão

### Opção B: PlanetScale

1. Acesse [PlanetScale](https://planetscale.com)
2. Crie novo banco de dados
3. Copie a connection string

### Opção C: Supabase (Recomendado)

Veja [SUPABASE_SETUP.md](../SUPABASE_SETUP.md) para instruções completas.

## 2. Deploy do Backend (Server)

### Railway (Recomendado)

📚 **Guia completo:** [RAILWAY_DEPLOY.md](RAILWAY_DEPLOY.md)

**Resumo rápido:**

1. **Login no Railway**
   - Acesse [railway.app](https://railway.app)
   - Login com GitHub

2. **Deploy from GitHub**
   - New Project → Deploy from GitHub repo
   - Selecione repositório `rotinacare`
   - Root Directory: `server`

3. **Configurar variáveis**
   ```env
   NODE_ENV=production
   PORT=4000
   DATABASE_URL=postgresql://... (Supabase)
   JWT_SECRET=gere-chave-32-caracteres
   CORS_ORIGINS=https://rotinacare.com,https://app.rotinacare.com
   ```

4. **Deploy automático**
   - Push para GitHub → Deploy automático
   - Health check: `/api/health`

### Render

1. Crie novo Web Service
2. Conecte ao repositório
3. Configure:
   - Build Command: `cd server && pnpm install && pnpm build`
   - Start Command: `cd server && pnpm start`
4. Adicione variáveis de ambiente

### Docker

```bash
# Build
docker build -t rotinacare-server -f server/Dockerfile .

# Run
docker run -p 4000:4000 \
  -e DB_HOST=seu-host \
  -e DB_USER=seu-usuario \
  -e DB_PASSWORD=sua-senha \
  -e DB_NAME=rotinacare \
  -e JWT_SECRET=sua-chave-secreta \
  rotinacare-server
```

## 3. Deploy do Frontend

### Vercel (Recomendado)

Você precisa criar **3 projetos separados** no Vercel, ### Vercel (Recomendado)

📚 **Guia completo:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

**Resumo rápido:**

1. **Login no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Login com GitHub

2. **Deploy cada app** (3 projetos separados)
   - Landing: `apps/landing` → `rotinacare.com`
   - App: `apps/app` → `app.rotinacare.com`
   - Admin: `apps/admin` → `admin.rotinacare.com`

3. **Configurar cada projeto**
   - Framework: Vite
   - Build Command: `cd ../.. && pnpm install && pnpm build --filter=@rotinacare/[app]`
   - Output Directory: `dist`
   - Environment Variable: `VITE_API_URL=https://api.rotinacare.com`

4. **Deploy automático**
   - Push para GitHub → Deploy automático
   - Pull Request → Preview deployment
### Netlify

Similar ao Vercel:

```bash
cd apps/landing
netlify deploy --prod
```

## 4. Configurar CI/CD

### GitHub Actions (Já configurado)

Os workflows já estão criados em `.github/workflows/`.

**Secrets necessários:**

No GitHub, vá em Settings → Secrets → Actions e adicione:

```
# Vercel
VERCEL_TOKEN=seu-token-vercel
VERCEL_ORG_ID=seu-org-id
VERCEL_LANDING_PROJECT_ID=id-projeto-landing
VERCEL_APP_PROJECT_ID=id-projeto-app
VERCEL_ADMIN_PROJECT_ID=id-projeto-admin

# Railway
RAILWAY_TOKEN=seu-token-railway

# Database
DATABASE_URL=sua-connection-string
```

**Como obter os IDs do Vercel:**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# No diretório de cada app
cd apps/landing
vercel link

# Copiar .vercel/project.json
cat .vercel/project.json
```

## 5. Configurar Domínios

### DNS

Configure os registros DNS:

```
# Landing
A     @              76.76.21.21
CNAME www            cname.vercel-dns.com

# App
CNAME app            cname.vercel-dns.com

# Admin
CNAME admin          cname.vercel-dns.com

# API (Railway)
CNAME api            seu-projeto.railway.app
```

### SSL/TLS

- Vercel: SSL automático
- Railway: SSL automático
- Cloudflare: Opcional para CDN e proteção DDoS

## 6. Pós-Deploy

### 6.1. Popular banco de dados

```bash
# Via Railway CLI
railway run pnpm db:seed

# Ou via conexão direta
pnpm --filter @rotinacare/server db:seed
```

### 6.2. Testar endpoints

```bash
# Health check
curl https://seu-backend.railway.app/api/health

# Login
curl -X POST https://seu-backend.railway.app/api/trpc/auth.login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@exemplo.com","password":"teste123"}'
```

### 6.3. Monitoramento

**Vercel:**
- Analytics integrado
- Logs em tempo real

**Railway:**
- Logs no dashboard
- Métricas de uso

**Recomendações:**
- [Sentry](https://sentry.io) - Error tracking
- [LogRocket](https://logrocket.com) - Session replay
- [Uptime Robot](https://uptimerobot.com) - Monitoring

## 7. Rollback

### Vercel

```bash
# Listar deployments
vercel ls

# Promover deployment anterior
vercel promote <deployment-url>
```

### Railway

No dashboard, clique em "Rollback" no deployment anterior.

## 8. Custos Estimados

### Tier Gratuito

- **Vercel**: 3 projetos gratuitos
- **Railway**: $5 crédito/mês
- **PlanetScale**: 5GB gratuito

**Total**: ~$0-5/mês

### Produção (estimativa)

- **Vercel Pro**: $20/mês (por projeto)
- **Railway**: $20-50/mês
- **PlanetScale**: $29/mês
- **Domínio**: $12/ano

**Total**: ~$100-150/mês

## 9. Checklist de Deploy

- [ ] Banco de dados criado e acessível
- [ ] Variáveis de ambiente configuradas
- [ ] Backend deployado e funcionando
- [ ] Migrations executadas
- [ ] Seed executado (dados iniciais)
- [ ] Landing deployada
- [ ] App deployada
- [ ] Admin deployada
- [ ] Domínios configurados
- [ ] SSL ativo em todos os domínios
- [ ] CI/CD configurado
- [ ] Monitoramento ativo
- [ ] Backup configurado

## 10. Troubleshooting

### Erro de conexão com banco de dados

```bash
# Testar conexão
mysql -h seu-host -u seu-usuario -p

# Verificar firewall
# Adicionar IP do Railway nas regras de firewall
```

### Build falha no Vercel

```bash
# Limpar cache
vercel --force

# Verificar logs
vercel logs
```

### CORS error

Verifique se o backend está configurado para aceitar requests dos domínios corretos em `server/src/index.ts`.

## Suporte

Para problemas ou dúvidas, consulte:
- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Railway](https://docs.railway.app)
- Issues do repositório
