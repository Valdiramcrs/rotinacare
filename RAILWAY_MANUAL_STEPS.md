# 🚂 Passos Manuais para Deploy no Railway

## ❌ Problema Encontrado

O deploy via Railway CLI criou um serviço com código local (apenas diretório `server`), mas o projeto precisa de todo o monorepo para funcionar (pacotes compartilhados).

---

## ✅ Solução: Deploy via GitHub

### Passo 1: Deletar Serviço Atual

1. Acesse: https://railway.com/project/fd4e3a1f-9e0d-4699-a209-d68e5964b63a
2. Clique no serviço `rotinacare-backend`
3. Vá em **Settings** → **Danger** → **Delete Service**
4. Confirme a exclusão

### Passo 2: Criar Novo Serviço do GitHub

1. No projeto Railway, clique em **"Create"** (botão roxo no canto superior direito)
2. Selecione **"GitHub Repo"**
3. Escolha **"Valdiramcrs/rotinacare"**
4. O Railway detectará automaticamente os serviços do monorepo
5. Selecione apenas **"@rotinacare/server"**

### Passo 3: Configurar Root Directory

1. Clique no serviço criado
2. Vá em **Settings**
3. Em **"Root Directory"**, digite: `server`
4. Pressione Enter para salvar

### Passo 4: Adicionar Variáveis de Ambiente

1. Clique em **Variables**
2. Clique em **"Raw Editor"**
3. Cole o seguinte:

```env
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://postgres.pcthuczsisjnnettogln:123Mud@r@aws-0-us-west-2.pooler.supabase.com:6543/postgres
JWT_SECRET=RotinasCare2025SecretKeyMuitoSegura32chars
CORS_ORIGINS=https://rotinacare.com,https://app.rotinacare.com,https://admin.rotinacare.com
```

4. Clique em **"Update Variables"**

### Passo 5: Fazer Deploy

1. O deploy deve iniciar automaticamente
2. Aguarde ~2-3 minutos
3. Verifique os logs em **"Deployments"**

### Passo 6: Gerar Domínio Público

1. Vá em **Settings**
2. Em **"Public Networking"**, clique em **"Generate Domain"**
3. Copie a URL gerada (ex: `rotinacare-backend-production.up.railway.app`)
4. Salve em `DEPLOY_CREDENTIALS.md`

### Passo 7: Testar API

```bash
# Substituir pela URL gerada
curl https://rotinacare-backend-production.up.railway.app/api/health
```

Deve retornar:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "database": "connected"
}
```

---

## 📋 Checklist

- [ ] Deletar serviço atual
- [ ] Criar novo serviço do GitHub
- [ ] Configurar Root Directory: `server`
- [ ] Adicionar 5 variáveis de ambiente
- [ ] Aguardar deploy completar
- [ ] Gerar domínio público
- [ ] Testar endpoint `/api/health`
- [ ] Salvar URL em `DEPLOY_CREDENTIALS.md`

---

## 🔧 Troubleshooting

### Build falha com erro de "pnpm-workspace.yaml"

**Solução:** Certifique-se de que o Root Directory NÃO está configurado. O Railway deve buildar do raiz do repositório.

### Build falha com erro de tipos TypeScript

**Solução:** O código já foi corrigido no commit mais recente. Certifique-se de que o Railway está usando a branch `main` atualizada.

### Deploy trava em "Building..."

**Solução:** Aguarde até 5 minutos. Se não resolver, cancele e tente novamente.

### Variáveis não aparecem

**Solução:** Use "Raw Editor" ao invés de adicionar uma por uma.

---

## 📊 Tempo Estimado

- **Deletar e recriar:** 2 minutos
- **Configurar:** 3 minutos
- **Deploy:** 2-3 minutos
- **Total:** ~10 minutos

---

## 🎯 Próximo Passo

Após o Railway estar funcionando, você pode:

1. Atualizar as variáveis de ambiente dos frontends no Vercel com a URL do Railway
2. Fazer deploy dos frontends no Vercel
3. Configurar domínios personalizados

---

## 📍 Arquivos Relacionados

- `DEPLOY_CREDENTIALS.md` - Credenciais do Supabase
- `RAILWAY_DEPLOY.md` - Guia completo de deploy
- `RELATORIO_COMPLETO.md` - Relatório de tudo que foi feito

---

**Boa sorte com o deploy!** 🚀
