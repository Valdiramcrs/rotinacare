# 🚀 RotinaCare - URLs de Deploy

**Data do Deploy:** 02 de Dezembro de 2025

---

## 📋 **BACKEND (Railway)**

### **API Backend**
- **URL de Produção:** `https://amused-respect-production-307d.up.railway.app`
- **Health Check:** `https://amused-respect-production-307d.up.railway.app/api/health`
- **Status:** ✅ **ONLINE e FUNCIONANDO**
- **Dashboard:** https://railway.com/project/fd4e3a1f-9e0d-4699-a209-d68e5964b63a
- **Service Name:** `amused-respect`

### **Configurações do Backend**
- **Root Directory:** `/` (raiz do monorepo)
- **Dockerfile Path:** `server/Dockerfile`
- **Variáveis de Ambiente:**
  - `NODE_ENV=production`
  - `PORT=4000`
  - `DATABASE_URL` (Supabase PostgreSQL)
  - `JWT_SECRET`
  - `CORS_ORIGINS`
  - `LOG_LEVEL`
  - `SUPABASE_URL`

---

## 🌐 **FRONTENDS (Vercel)**

### **1. LANDING (Página Principal)**
- **URL de Produção:** `https://rotinacare-landing-egw62sfag-valdiramcrs-projects.vercel.app`
- **Domínio Vercel:** `rotinacare-landing.vercel.app` (provavelmente)
- **Status:** ✅ **ONLINE e FUNCIONANDO**
- **Dashboard:** https://vercel.com/valdiramcrs-projects/rotinacare-landing
- **Root Directory:** `apps/landing`
- **Framework:** Vite
- **Descrição:** Landing page institucional com informações sobre o produto

**Funcionalidades visíveis:**
- ✅ Título: "Cuide da sua saúde de forma organizada"
- ✅ Menu: Funcionalidades, Preços, Contato, Entrar, Começar
- ✅ Seção de funcionalidades: Consultas, Medicamentos, Exames
- ✅ CTAs: "Começar gratuitamente", "Conhecer funcionalidades"

---

### **2. APP (Aplicação do Usuário)**
- **URL de Produção:** `https://rotinacare-app.vercel.app`
- **URL Alternativa:** `https://rotinacare-1cqlxyttg-valdiramcrs-projects.vercel.app`
- **Status:** ✅ **ONLINE e FUNCIONANDO**
- **Dashboard:** https://vercel.com/valdiramcrs-projects/rotinacare-app
- **Root Directory:** `apps/app`
- **Framework:** Vite
- **Descrição:** Aplicação principal para usuários finais gerenciarem sua saúde

**Funcionalidades visíveis:**
- ✅ Tela de Login com Email e Senha
- ✅ Descrição: "Acesse sua conta para gerenciar sua saúde"
- ✅ Link: "Criar conta"

---

### **3. ADMIN (Painel Administrativo)**
- **URL de Produção:** `https://rotinacare-admin.vercel.app`
- **URL Alternativa:** `https://rotinacare-admin-53sqp3ttu-valdiramcrs-projects.vercel.app`
- **Status:** ✅ **ONLINE e FUNCIONANDO**
- **Dashboard:** https://vercel.com/valdiramcrs-projects/rotinacare-admin
- **Root Directory:** `apps/admin`
- **Framework:** Vite
- **Descrição:** Painel administrativo para gerenciamento do sistema

**Funcionalidades visíveis:**
- ✅ Título: "RotinaCare Admin - Painel Administrativo"
- ✅ Tela de Login Administrativo
- ✅ Placeholder: "admin@rotinacare.com"

---

## 🔗 **INTEGRAÇÕES**

### **Banco de Dados (Supabase)**
- **Host:** `aws-0-us-west-2.pooler.supabase.com`
- **Port:** `6543`
- **Database:** `postgres`
- **Status:** ✅ **CONECTADO**

### **Repositório GitHub**
- **URL:** https://github.com/Valdiramcrs/rotinacare
- **Branch Principal:** `main`
- **Último Commit:** `5980bca - fix: build shared package in Dockerfile`

---

## 📊 **RESUMO DO STATUS**

| Serviço | URL | Status | Plataforma |
|---------|-----|--------|------------|
| **Backend API** | https://amused-respect-production-307d.up.railway.app | ✅ ONLINE | Railway |
| **Landing** | https://rotinacare-landing-egw62sfag-valdiramcrs-projects.vercel.app | ✅ ONLINE | Vercel |
| **App** | https://rotinacare-app.vercel.app | ✅ ONLINE | Vercel |
| **Admin** | https://rotinacare-admin.vercel.app | ✅ ONLINE | Vercel |

---

## 🎯 **PRÓXIMOS PASSOS RECOMENDADOS**

### **1. Configurar Domínios Personalizados**

#### **No Vercel:**
1. Acesse cada projeto no Vercel Dashboard
2. Vá em **Settings → Domains**
3. Adicione os domínios personalizados:
   - **Landing:** `rotinacare.com` e `www.rotinacare.com`
   - **App:** `app.rotinacare.com`
   - **Admin:** `admin.rotinacare.com`

#### **No Railway:**
1. Acesse o projeto no Railway Dashboard
2. Vá em **Settings → Networking → Custom Domain**
3. Adicione o domínio: `api.rotinacare.com`

#### **No DNS (Registrar de Domínio):**
Adicione os seguintes registros DNS:

```
# Landing
A     rotinacare.com           → 76.76.21.21 (Vercel IP)
CNAME www.rotinacare.com       → cname.vercel-dns.com

# App
CNAME app.rotinacare.com       → cname.vercel-dns.com

# Admin
CNAME admin.rotinacare.com     → cname.vercel-dns.com

# API Backend
CNAME api.rotinacare.com       → [Railway CNAME fornecido]
```

---

### **2. Atualizar CORS_ORIGINS no Backend**

Após configurar os domínios personalizados, atualize a variável `CORS_ORIGINS` no Railway:

```
CORS_ORIGINS=https://rotinacare.com,https://www.rotinacare.com,https://app.rotinacare.com,https://admin.rotinacare.com
```

---

### **3. Atualizar VITE_API_URL nos Frontends**

Após configurar o domínio personalizado da API, atualize a variável `VITE_API_URL` em cada projeto no Vercel:

1. Acesse cada projeto no Vercel Dashboard
2. Vá em **Settings → Environment Variables**
3. Adicione/Atualize:
   ```
   VITE_API_URL=https://api.rotinacare.com
   ```
4. Faça um **Redeploy** de cada projeto para aplicar as mudanças

---

### **4. Configurar SSL/TLS**

- ✅ **Vercel:** SSL automático (já configurado)
- ✅ **Railway:** SSL automático (já configurado)

---

### **5. Monitoramento e Logs**

#### **Railway:**
- **Logs:** https://railway.com/project/fd4e3a1f-9e0d-4699-a209-d68e5964b63a/service/70f796b5-ced5-4539-a48f-2fc101976eae/logs
- **Metrics:** https://railway.com/project/fd4e3a1f-9e0d-4699-a209-d68e5964b63a/service/70f796b5-ced5-4539-a48f-2fc101976eae/metrics

#### **Vercel:**
- **Landing Logs:** https://vercel.com/valdiramcrs-projects/rotinacare-landing/logs
- **App Logs:** https://vercel.com/valdiramcrs-projects/rotinacare-app/logs
- **Admin Logs:** https://vercel.com/valdiramcrs-projects/rotinacare-admin/logs

---

### **6. Habilitar Analytics (Opcional)**

#### **Vercel Speed Insights:**
1. Acesse cada projeto no Vercel Dashboard
2. Clique em **"Enable Speed Insights"**
3. Isso permitirá monitorar a performance do site

#### **Vercel Analytics:**
1. Acesse cada projeto no Vercel Dashboard
2. Vá em **Analytics**
3. Clique em **"Enable"**
4. Isso permitirá monitorar visitantes e page views

---

## 🔒 **SEGURANÇA**

### **Variáveis de Ambiente Sensíveis:**
- ✅ `JWT_SECRET` - Configurado no Railway
- ✅ `DATABASE_URL` - Configurado no Railway
- ⚠️ **IMPORTANTE:** Nunca commite essas variáveis no Git!

### **CORS:**
- ✅ Configurado para aceitar apenas os domínios do projeto
- ⚠️ **IMPORTANTE:** Atualize após configurar domínios personalizados

---

## 📝 **NOTAS IMPORTANTES**

1. **URLs Temporárias do Vercel:**
   - As URLs com sufixo `-egw62sfag-valdiramcrs-projects.vercel.app` são URLs de preview
   - Após configurar domínios personalizados, essas URLs continuarão funcionando mas não serão as principais

2. **Deploy Automático:**
   - Todos os projetos estão configurados para deploy automático ao fazer push no branch `main`
   - Railway: Detecta mudanças no repositório e faz redeploy automático
   - Vercel: Detecta mudanças no repositório e faz redeploy automático

3. **Monorepo:**
   - O projeto usa pnpm workspaces
   - O pacote `@rotinacare/shared` é compartilhado entre todos os apps
   - Mudanças no `shared` requerem rebuild de todos os apps que o utilizam

4. **ES Modules:**
   - Todos os imports relativos devem incluir extensão `.js`
   - Exemplo: `import { logger } from './lib/logger.js'`

---

## 🎊 **DEPLOY CONCLUÍDO COM SUCESSO!**

✅ **Backend:** Railway  
✅ **Landing:** Vercel  
✅ **App:** Vercel  
✅ **Admin:** Vercel  

**Todos os serviços estão ONLINE e FUNCIONANDO!** 🚀

---

**Documentação gerada em:** 02/12/2025 às 00:12 UTC-3
