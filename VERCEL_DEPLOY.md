# Deploy dos Frontends no Vercel - RotinaCare

Guia completo para fazer deploy das três aplicações frontend (Landing, App, Admin) no Vercel.

## 📋 Pré-requisitos

- ✅ Conta no GitHub
- ✅ Repositório do projeto no GitHub
- ✅ Backend deployado no Railway
- ✅ [RAILWAY_DEPLOY.md](RAILWAY_DEPLOY.md) concluído

## 🎯 Visão Geral

Você vai criar **3 projetos separados** no Vercel:

| Aplicação | Projeto Vercel | Domínio | Descrição |
|-----------|----------------|---------|-----------|
| Landing | `rotinacare-landing` | `rotinacare.com` | Site institucional |
| App | `rotinacare-app` | `app.rotinacare.com` | Aplicação do paciente |
| Admin | `rotinacare-admin` | `admin.rotinacare.com` | Painel administrativo |

---

## 🚀 Passo a Passo

### 1. Criar Conta no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Sign Up"** no canto superior direito
3. Clique em **"Continue with GitHub"**
4. Autorize o acesso ao GitHub
5. Selecione plano **"Hobby"** (gratuito)
6. Aguarde redirecionamento para o Dashboard

**💡 Dica:** O plano Hobby é gratuito e suficiente para começar.

---

### 2. Importar Repositório

1. No Dashboard, clique em **"Add New..."** → **"Project"**
2. Na seção "Import Git Repository", procure `rotinacare`
3. Se não aparecer:
   - Clique em **"Adjust GitHub App Permissions"**
   - Selecione o repositório
   - Clique **"Install"**
4. Volte ao Vercel e o repositório aparecerá

---

## 📱 Deploy da Landing Page

### 3. Configurar Projeto Landing

1. Clique em **"Import"** ao lado do repositório `rotinacare`
2. Na tela de configuração:

#### Configure Project

- **Project Name:** `rotinacare-landing`
- **Framework Preset:** `Vite` (detectado automaticamente)
- **Root Directory:** Clique em **"Edit"** → Digite: `apps/landing`

#### Build and Output Settings

- **Build Command:** `cd ../.. && pnpm install && pnpm build --filter=@rotinacare/landing`
- **Output Directory:** `dist` (padrão)
- **Install Command:** (deixe vazio ou padrão)

#### Environment Variables

Clique em **"Add Environment Variable"**:

```env
VITE_API_URL=https://api.rotinacare.com
VITE_APP_NAME=RotinaCare
VITE_APP_VERSION=1.0.0
```

**⚠️ Importante:** Use a URL do Railway (ou domínio customizado se já configurou).

3. Clique em **"Deploy"**
4. Aguarde o build (2-3 minutos)
5. Status esperado: **"Ready"** ✅

### 4. Configurar Domínio da Landing

1. No projeto `rotinacare-landing`, clique em **"Settings"**
2. No menu lateral, clique em **"Domains"**
3. Adicione os domínios:

**Domínio principal:**
- Digite: `rotinacare.com`
- Clique **"Add"**

**Domínio www:**
- Digite: `www.rotinacare.com`
- Clique **"Add"**
- Configure redirect: `www` → `rotinacare.com`

4. O Vercel mostrará os registros DNS necessários:

```dns
# Registro A (apex domain)
A     @    76.76.21.21

# Registro CNAME (www)
CNAME www  cname.vercel-dns.com
```

5. **Anote estes registros** para configurar no DNS depois

---

## 💻 Deploy do App

### 5. Configurar Projeto App

1. Volte ao Dashboard do Vercel
2. Clique em **"Add New..."** → **"Project"**
3. Selecione o mesmo repositório `rotinacare`
4. Configure:

#### Configure Project

- **Project Name:** `rotinacare-app`
- **Framework Preset:** `Vite`
- **Root Directory:** `apps/app`

#### Build and Output Settings

- **Build Command:** `cd ../.. && pnpm install && pnpm build --filter=@rotinacare/app`
- **Output Directory:** `dist`

#### Environment Variables

```env
VITE_API_URL=https://api.rotinacare.com
VITE_APP_NAME=RotinaCare App
VITE_APP_VERSION=1.0.0
```

5. Clique em **"Deploy"**
6. Aguarde o build concluir

### 6. Configurar Domínio do App

1. No projeto `rotinacare-app`, vá em **"Settings"** → **"Domains"**
2. Digite: `app.rotinacare.com`
3. Clique **"Add"**
4. Anote o registro DNS:

```dns
CNAME app  cname.vercel-dns.com
```

---

## 🔐 Deploy do Admin

### 7. Configurar Projeto Admin

1. Volte ao Dashboard do Vercel
2. Clique em **"Add New..."** → **"Project"**
3. Selecione o mesmo repositório `rotinacare`
4. Configure:

#### Configure Project

- **Project Name:** `rotinacare-admin`
- **Framework Preset:** `Vite`
- **Root Directory:** `apps/admin`

#### Build and Output Settings

- **Build Command:** `cd ../.. && pnpm install && pnpm build --filter=@rotinacare/admin`
- **Output Directory:** `dist`

#### Environment Variables

```env
VITE_API_URL=https://api.rotinacare.com
VITE_APP_NAME=RotinaCare Admin
VITE_APP_VERSION=1.0.0
```

5. Clique em **"Deploy"**
6. Aguarde o build concluir

### 8. Configurar Domínio do Admin

1. No projeto `rotinacare-admin`, vá em **"Settings"** → **"Domains"**
2. Digite: `admin.rotinacare.com`
3. Clique **"Add"**
4. Anote o registro DNS:

```dns
CNAME admin  cname.vercel-dns.com
```

---

## 🔑 Configurar CI/CD (Opcional)

### 9. Obter IDs dos Projetos

Para cada projeto, obtenha os IDs:

1. Clique no projeto
2. Vá em **"Settings"** → **"General"**
3. Role até **"Project ID"**
4. Copie o ID

**Salve:**
```env
VERCEL_LANDING_PROJECT_ID=prj_xxx
VERCEL_APP_PROJECT_ID=prj_yyy
VERCEL_ADMIN_PROJECT_ID=prj_zzz
```

### 10. Criar Token de API

1. Clique no seu avatar no canto superior direito
2. Clique em **"Settings"**
3. No menu lateral, clique em **"Tokens"**
4. Clique em **"Create Token"**
5. Configure:
   - **Token Name:** `GitHub Actions`
   - **Scope:** `Full Account`
   - **Expiration:** `No Expiration` (ou escolha período)
6. Clique em **"Create Token"**
7. **Copie o token** (só aparece uma vez!)

**Salve:**
```env
VERCEL_TOKEN=xxx_yyy_zzz
```

### 11. Obter Organization ID

1. Ainda em Settings
2. Clique em **"General"** no menu lateral
3. Role até **"Your ID"**
4. Copie o **Organization ID** (ou Team ID)

**Salve:**
```env
VERCEL_ORG_ID=team_xxx
```

---

## 🌐 Resumo dos Registros DNS

Configure estes registros no seu provedor DNS (Cloudflare, Namecheap, GoDaddy, etc):

```dns
# Landing (rotinacare.com)
A     @      76.76.21.21
CNAME www    cname.vercel-dns.com

# App (app.rotinacare.com)
CNAME app    cname.vercel-dns.com

# Admin (admin.rotinacare.com)
CNAME admin  cname.vercel-dns.com

# API (api.rotinacare.com) - Railway
CNAME api    [seu-projeto].up.railway.app
```

**⏱️ Tempo de propagação:** 5-30 minutos (pode levar até 48h em casos raros)

---

## ✅ Checklist de Validação

### Landing (rotinacare.com)

- [ ] Projeto criado: `rotinacare-landing`
- [ ] Root Directory: `apps/landing`
- [ ] Build Command configurado
- [ ] VITE_API_URL configurado
- [ ] Deploy com status "Ready"
- [ ] URL temporária funciona: `rotinacare-landing.vercel.app`
- [ ] Domínios adicionados: `rotinacare.com`, `www.rotinacare.com`
- [ ] Registros DNS anotados

### App (app.rotinacare.com)

- [ ] Projeto criado: `rotinacare-app`
- [ ] Root Directory: `apps/app`
- [ ] Build Command configurado
- [ ] VITE_API_URL configurado
- [ ] Deploy com status "Ready"
- [ ] URL temporária funciona: `rotinacare-app.vercel.app`
- [ ] Domínio adicionado: `app.rotinacare.com`
- [ ] Registro DNS anotado

### Admin (admin.rotinacare.com)

- [ ] Projeto criado: `rotinacare-admin`
- [ ] Root Directory: `apps/admin`
- [ ] Build Command configurado
- [ ] VITE_API_URL configurado
- [ ] Deploy com status "Ready"
- [ ] URL temporária funciona: `rotinacare-admin.vercel.app`
- [ ] Domínio adicionado: `admin.rotinacare.com`
- [ ] Registro DNS anotado

### CI/CD (Opcional)

- [ ] VERCEL_TOKEN criado e salvo
- [ ] Project IDs copiados (3)
- [ ] Organization ID copiado
- [ ] Tokens adicionados ao GitHub Secrets

---

## 🔧 Configurações Avançadas

### Performance

Todas as apps já estão configuradas com:

- ✅ **Cache de Assets** - 1 ano (immutable)
- ✅ **Gzip/Brotli** - Compressão automática
- ✅ **Edge Network** - CDN global
- ✅ **HTTP/2** - Multiplexing
- ✅ **SPA Routing** - Rewrites configurados

### Segurança

Headers de segurança já configurados:

- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-XSS-Protection: 1; mode=block`
- ✅ HTTPS obrigatório
- ✅ HSTS habilitado

### Preview Deployments

O Vercel cria preview automático para:

- ✅ Pull Requests
- ✅ Branches (exceto main/production)
- ✅ Commits

**URL do preview:**
```
rotinacare-landing-git-[branch]-[user].vercel.app
```

### Environment Variables por Ambiente

Você pode ter variáveis diferentes para:

- **Production** - Branch `main`
- **Preview** - Pull Requests
- **Development** - Branch `develop`

**Configurar:**
1. Settings → Environment Variables
2. Escolha o ambiente ao adicionar variável

---

## 🚨 Troubleshooting

### Erro: "Build failed - Cannot find module"

**Causa:** Build Command incorreto ou Root Directory errado

**Solução:**
1. Verifique Root Directory: `apps/[nome-app]`
2. Verifique Build Command inclui: `cd ../.. && pnpm install`
3. Limpe cache: Settings → General → Clear Cache

### Erro: "Output directory dist does not exist"

**Causa:** Build não está gerando em `dist`

**Solução:**
1. Verifique `vite.config.ts` do app
2. Confirme `build.outDir` é `dist`
3. Teste build localmente: `pnpm build:[app]`

### Erro: "VITE_API_URL is not defined"

**Causa:** Variável de ambiente não configurada

**Solução:**
1. Settings → Environment Variables
2. Adicione `VITE_API_URL`
3. Redeploy: Deployments → ⋯ → Redeploy

### Erro: "Failed to fetch" ao chamar API

**Causa:** CORS ou URL da API incorreta

**Solução:**
1. Verifique `VITE_API_URL` está correto
2. Verifique CORS no backend inclui domínio Vercel
3. Teste API diretamente: `curl https://api.rotinacare.com/api/health`

### Build muito lento

**Causa:** Instalando dependências toda vez

**Solução:**
1. Vercel faz cache automaticamente
2. Use `pnpm install --frozen-lockfile`
3. Já configurado no `vercel.json`

### Deploy não atualiza

**Causa:** Cache do navegador ou CDN

**Solução:**
1. Limpe cache do navegador (Ctrl+Shift+R)
2. Verifique deployment ID mudou
3. Aguarde 1-2 minutos para propagação CDN

---

## 💰 Custos

### Hobby Plan (Gratuito)

- ✅ **100 GB** de bandwidth/mês
- ✅ **Unlimited** deployments
- ✅ **Unlimited** preview deployments
- ✅ **1** concurrent build
- ✅ **100** executions/dia (Serverless Functions)
- ✅ SSL automático
- ✅ CDN global

**Suficiente para:**
- Projetos pessoais
- Protótipos
- MVPs
- ~10k visitantes/mês

### Pro Plan ($20/mês)

- ✅ **1 TB** de bandwidth
- ✅ **Unlimited** tudo
- ✅ **12** concurrent builds
- ✅ **1M** executions/mês
- ✅ Suporte prioritário
- ✅ Analytics avançado

**Recomendado para:**
- Produção
- Startups
- ~100k visitantes/mês

### Estimativa RotinaCare

- **Hobby Plan:** Gratuito (início)
- **Pro Plan:** $20/mês (crescimento)
- **Custo real:** $0-5/mês (com Hobby)

---

## 🔐 Segurança

### Boas Práticas

1. **Variáveis de Ambiente**
   - NUNCA commitar secrets no código
   - Usar variáveis do Vercel
   - Prefixar com `VITE_` para expor no frontend

2. **API Keys**
   - Nunca expor no frontend
   - Usar backend como proxy
   - Validar no servidor

3. **CORS**
   - Configurar domínios permitidos no backend
   - Não usar `*` em produção

4. **HTTPS**
   - Vercel fornece SSL automático
   - Sempre usar HTTPS

5. **Headers de Segurança**
   - Já configurados no `vercel.json`
   - CSP pode ser adicionado se necessário

---

## 🔄 CI/CD Automático

O Vercel já faz CI/CD automático:

1. **Push para GitHub** → Deploy automático
2. **Pull Request** → Preview deployment
3. **Merge para main** → Deploy em produção

**Customizar:**
- Use GitHub Actions para testes antes do deploy
- Veja [.github/workflows/ci.yml](../.github/workflows/ci.yml)

**Deploy manual (se necessário):**
```bash
# Instalar Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
pnpm deploy:landing  # ou deploy:app, deploy:admin
```

---

## 📊 Monitoramento

### Analytics

1. No projeto, clique em **"Analytics"**
2. Visualize:
   - Page views
   - Unique visitors
   - Top pages
   - Devices
   - Browsers
   - Countries

### Real-Time Logs

1. Clique em **"Deployments"**
2. Clique no deployment ativo
3. Clique em **"Runtime Logs"**
4. Logs aparecem em tempo real

### Speed Insights

1. Habilite em Settings → Speed Insights
2. Visualize métricas Core Web Vitals:
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)

---

## 📚 Recursos Adicionais

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Vite Documentation](https://vitejs.dev)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

## 🆘 Suporte

**Problemas com Vercel:**
- [Vercel Support](https://vercel.com/support)
- [Discord Community](https://vercel.com/discord)
- [Twitter @vercel](https://twitter.com/vercel)

**Problemas com o projeto:**
- Verifique [OBSERVABILITY.md](OBSERVABILITY.md) para logs
- Consulte [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Abra issue no repositório

---

## 📝 Informações para Salvar

Após concluir o deploy, salve estas informações:

```env
# Vercel - Landing
VERCEL_LANDING_PROJECT_ID=prj_xxx
VERCEL_LANDING_URL=https://rotinacare.com

# Vercel - App
VERCEL_APP_PROJECT_ID=prj_yyy
VERCEL_APP_URL=https://app.rotinacare.com

# Vercel - Admin
VERCEL_ADMIN_PROJECT_ID=prj_zzz
VERCEL_ADMIN_URL=https://admin.rotinacare.com

# Vercel - Geral
VERCEL_ORG_ID=team_xxx
VERCEL_TOKEN=xxx_yyy_zzz

# DNS
# (registros anotados acima)
```

---

## 🎯 Próximos Passos

Após concluir este deploy:

1. ✅ Configure DNS (registros anotados)
2. ✅ Aguarde propagação (5-30 min)
3. ✅ Teste todos os domínios
4. ✅ Verifique integração com API
5. ✅ Configure Analytics
6. ✅ Configure Speed Insights
7. ➡️ **Próximo:** Configurar DNS no provedor

---

**Última atualização:** 2025-12-01  
**Versão:** 2.1.0
