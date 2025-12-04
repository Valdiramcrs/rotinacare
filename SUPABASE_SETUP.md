# Configuração do Supabase - RotinaCare

Guia completo para configurar o banco de dados PostgreSQL com Supabase.

## 📋 Pré-requisitos

- Conta no GitHub (recomendado para login)
- Navegador web

## 🚀 Passo a Passo

### 1. Criar Conta no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em **"Start your project"** (botão verde no canto superior direito)
3. Escolha uma opção de login:
   - **Continue with GitHub** (recomendado)
   - Continue with Email
4. Autorize o acesso se usar GitHub
5. Aguarde redirecionamento para o Dashboard

### 2. Criar Novo Projeto

1. No Dashboard, clique em **"New Project"**
2. Preencha os campos:
   - **Name:** `rotinacare`
   - **Database Password:** Clique no ícone de dado 🎲 para gerar senha forte
   - **⚠️ IMPORTANTE:** Copie e salve esta senha em local seguro
   - **Region:** Selecione `South America (São Paulo)` para menor latência
   - **Pricing Plan:** Free (0$/month)
3. Clique em **"Create new project"**
4. Aguarde 2-3 minutos enquanto o projeto é provisionado

### 3. Obter Connection String

1. No menu lateral, clique em **"Project Settings"** (ícone de engrenagem ⚙️)
2. Clique em **"Database"** no submenu
3. Role até a seção **"Connection string"**
4. Selecione a aba **"URI"**
5. Copie a connection string completa

**Formato:**
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
```

6. **⚠️ IMPORTANTE:** Substitua `[YOUR-PASSWORD]` pela senha que você salvou no Passo 2

### 4. Obter Chaves da API (Opcional)

Se quiser usar a autenticação do Supabase no futuro:

1. No menu lateral, clique em **"Project Settings"** (⚙️)
2. Clique em **"API"** no submenu
3. Copie as chaves:
   - **Project URL:** `https://[PROJECT-REF].supabase.co`
   - **anon public:** Chave pública (pode ser exposta no frontend)
   - **service_role:** Chave privada (NUNCA expor no frontend)

### 5. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# Na raiz do projeto
cp .env.example .env
```

Edite o arquivo `.env` e adicione:

```env
# Database (obrigatório)
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres

# Supabase (opcional, para usar Auth do Supabase no futuro)
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# JWT (manter para auth próprio)
JWT_SECRET=gerar_chave_secreta_32_caracteres_minimo

# Observability
SENTRY_DSN=
LOG_LEVEL=info
```

### 6. Aplicar Schema ao Banco

```bash
# Navegar para o diretório do servidor
cd server

# Gerar migrations
pnpm drizzle-kit generate

# Aplicar schema ao banco
pnpm drizzle-kit push
```

**Saída esperada:**
```
✓ Applying migrations...
✓ Done!
```

### 7. Popular Banco com Dados Iniciais

```bash
# Ainda no diretório server
pnpm db:seed
```

**Saída esperada:**
```
🌱 Seeding database...
✅ Admin user created: admin@rotinacare.com / admin123
✅ Test user created: teste@exemplo.com / teste123
✅ Database seeded successfully!
```

### 8. Verificar no Supabase Dashboard

1. Volte ao Dashboard do Supabase
2. No menu lateral, clique em **"Table Editor"**
3. Verifique se as tabelas foram criadas:
   - ✅ users
   - ✅ doctors
   - ✅ medications
   - ✅ exams
   - ✅ appointments

4. Clique na tabela **users** para ver os usuários criados

### 9. Testar Conexão

```bash
# Iniciar servidor
cd ..
pnpm dev:server
```

**Saída esperada:**
```
✅ Sentry inicializado (ou aviso se não configurado)
🚀 Server running on http://localhost:4000
📊 Health check: http://localhost:4000/api/health
🔌 tRPC endpoint: http://localhost:4000/api/trpc
```

Testar health check:
```bash
curl http://localhost:4000/api/health
```

**Resposta esperada:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-01T...",
  "uptime": 5,
  "version": "dev",
  "checks": {
    "database": {
      "status": "pass",
      "message": "Database is healthy",
      "responseTime": 15
    },
    "memory": {
      "status": "pass",
      "message": "Memory usage is normal",
      "details": {...}
    }
  }
}
```

## ✅ Checklist de Validação

- [ ] Conta Supabase criada
- [ ] Projeto "rotinacare" criado
- [ ] Senha do banco salva em local seguro
- [ ] Connection string copiada
- [ ] Arquivo `.env` criado e configurado
- [ ] Migrations aplicadas (`pnpm drizzle-kit push`)
- [ ] Seed executado (`pnpm db:seed`)
- [ ] Tabelas visíveis no Table Editor
- [ ] Usuários criados (admin e teste)
- [ ] Servidor iniciado sem erros
- [ ] Health check retorna "healthy"

## 🔑 Credenciais de Teste

Após executar o seed:

**Admin:**
- Email: `admin@rotinacare.com`
- Senha: `admin123`

**Usuário:**
- Email: `teste@exemplo.com`
- Senha: `teste123`

## 📊 Recursos do Supabase

### Tier Gratuito Inclui:

- ✅ 500 MB de espaço em disco
- ✅ 2 GB de transferência de dados
- ✅ 50 MB de armazenamento de arquivos
- ✅ Backups automáticos (7 dias)
- ✅ SSL/TLS automático
- ✅ Pausado após 1 semana de inatividade (reativa automaticamente)

### Ferramentas Úteis:

1. **Table Editor** - Interface visual para dados
2. **SQL Editor** - Execute queries SQL
3. **Database** - Visualize schema e relacionamentos
4. **Logs** - Logs de queries e erros
5. **API Docs** - Documentação auto-gerada

## 🔧 Comandos Úteis

```bash
# Gerar migrations
pnpm --filter @rotinacare/server drizzle-kit generate

# Aplicar migrations
pnpm --filter @rotinacare/server drizzle-kit push

# Abrir Drizzle Studio (interface visual)
pnpm --filter @rotinacare/server db:studio

# Popular banco
pnpm --filter @rotinacare/server db:seed

# Executar query SQL no Supabase
# Use o SQL Editor no Dashboard
```

## 🚨 Troubleshooting

### Erro: "Connection refused"

**Causa:** Connection string incorreta ou senha errada

**Solução:**
1. Verifique se substituiu `[YOUR-PASSWORD]` pela senha real
2. Verifique se não há espaços extras na string
3. Teste a conexão no SQL Editor do Supabase

### Erro: "relation does not exist"

**Causa:** Schema não foi aplicado ao banco

**Solução:**
```bash
cd server
pnpm drizzle-kit push
```

### Erro: "DATABASE_URL is required"

**Causa:** Variável de ambiente não configurada

**Solução:**
1. Verifique se o arquivo `.env` existe na raiz
2. Verifique se `DATABASE_URL` está definida
3. Reinicie o servidor

### Projeto pausado (inatividade)

**Causa:** Tier gratuito pausa após 1 semana sem uso

**Solução:**
- O projeto reativa automaticamente na primeira requisição
- Aguarde 30-60 segundos para reativação
- Configure uptime monitoring para evitar pausas

## 🔐 Segurança

### Boas Práticas:

1. **NUNCA** commite o arquivo `.env` no Git
2. Use senhas fortes geradas aleatoriamente
3. Mantenha `SUPABASE_SERVICE_ROLE_KEY` privada
4. Use `SUPABASE_ANON_KEY` apenas no frontend
5. Configure Row Level Security (RLS) para produção
6. Rotacione senhas periodicamente

### Row Level Security (RLS):

Para produção, configure RLS no Supabase:

```sql
-- Exemplo: Usuário só pode ver seus próprios dados
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own doctors"
  ON doctors FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own doctors"
  ON doctors FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## 📚 Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Supabase Community](https://github.com/supabase/supabase/discussions)

## 🆘 Suporte

**Problemas com Supabase:**
- [Supabase Support](https://supabase.com/support)
- [Discord Community](https://discord.supabase.com)

**Problemas com o projeto:**
- Verifique [OBSERVABILITY.md](OBSERVABILITY.md) para logs
- Consulte [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

**Próximo passo:** [Deploy no Railway](DEPLOY.md#deploy-do-backend-server)
