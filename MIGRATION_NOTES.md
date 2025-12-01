# Notas de Migração: MySQL → PostgreSQL (Supabase)

## 📋 Resumo

O projeto RotinasCare foi migrado de **MySQL** para **PostgreSQL** usando **Supabase** como banco gerenciado.

**Data da migração:** 2025-12-01  
**Versão:** 2.1.0

---

## 🔄 Mudanças Principais

### 1. Schema do Banco de Dados

**Antes (MySQL):**
```typescript
import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  // ...
});
```

**Depois (PostgreSQL):**
```typescript
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  // ...
});
```

**Principais mudanças:**
- ✅ IDs mudaram de `VARCHAR(36)` para `UUID` nativo
- ✅ Adicionado campo `active` em `medications`
- ✅ Adicionado campo `title` em `appointments`
- ✅ Removido campo `type` de `exams`
- ✅ Adicionado campo `laboratory` em `exams`
- ✅ Foreign keys com `onDelete: 'cascade'` e `onDelete: 'set null'`

### 2. Dependências

**Removido:**
```json
{
  "dependencies": {
    "mysql2": "^3.15.3"
  }
}
```

**Adicionado:**
```json
{
  "dependencies": {
    "postgres": "^3.4.7"
  }
}
```

### 3. Configuração do Drizzle

**Antes:**
```typescript
export default {
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
```

**Depois:**
```typescript
export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### 4. Conexão do Banco

**Antes:**
```typescript
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({...});
export const db = drizzle(connection, { schema });
```

**Depois:**
```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
```

### 5. Variáveis de Ambiente

**Antes:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=rotinacare
```

**Depois:**
```env
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
```

---

## ✅ Vantagens da Migração

### PostgreSQL vs MySQL

| Recurso | MySQL | PostgreSQL |
|---------|-------|------------|
| UUID nativo | ❌ (via VARCHAR) | ✅ Tipo nativo |
| JSON avançado | Básico | Avançado (JSONB) |
| Full-text search | Limitado | Completo |
| Extensões | Limitadas | Muitas (PostGIS, etc) |
| ACID compliance | Sim | Sim |
| Licença | GPL | PostgreSQL License (mais permissiva) |

### Supabase vs Self-Hosted

| Recurso | Self-Hosted | Supabase |
|---------|-------------|----------|
| Setup | Manual | Automático |
| Backups | Manual | Automático (7 dias) |
| SSL/TLS | Configurar | Automático |
| Scaling | Manual | Automático |
| Monitoring | Configurar | Built-in |
| Custo inicial | Servidor | Gratuito |
| Manutenção | Alta | Baixa |

---

## 🚀 Benefícios

1. **Banco Gerenciado**
   - Backups automáticos
   - SSL/TLS configurado
   - Monitoring built-in
   - Pausado automaticamente quando inativo (tier gratuito)

2. **UUIDs Nativos**
   - Mais seguros que auto-increment
   - Não expõem quantidade de registros
   - Podem ser gerados no cliente

3. **Melhor Performance**
   - Queries complexas mais rápidas
   - Índices mais eficientes
   - JSONB para dados semi-estruturados

4. **Ferramentas Visuais**
   - Table Editor
   - SQL Editor
   - Logs em tempo real
   - API auto-gerada

5. **Tier Gratuito Generoso**
   - 500 MB de espaço
   - 2 GB de transferência
   - Unlimited API requests
   - Sem cartão de crédito necessário

---

## 📝 Checklist de Migração

### Arquivos Modificados

- [x] `server/src/db/schema.ts` - Schema PostgreSQL
- [x] `server/src/db/index.ts` - Conexão PostgreSQL
- [x] `server/src/db/seed.ts` - Seed atualizado
- [x] `server/drizzle.config.ts` - Config PostgreSQL
- [x] `server/package.json` - Dependências
- [x] `.env.example` - Variáveis atualizadas

### Arquivos Criados

- [x] `SUPABASE_SETUP.md` - Guia completo
- [x] `MIGRATION_NOTES.md` - Este arquivo

### Arquivos Atualizados

- [x] `README.md` - Documentação principal
- [x] `DEPLOY.md` - Guia de deploy
- [x] `CHANGELOG.md` - Histórico de mudanças

### Arquivos Removidos

- [x] `docker-compose.yml` - Não mais necessário (MySQL local)

---

## 🔧 Comandos Atualizados

### Antes (MySQL)

```bash
# Iniciar banco local
docker-compose up -d mysql

# Aplicar migrations
cd server && pnpm db:push

# Seed
pnpm db:seed
```

### Depois (PostgreSQL/Supabase)

```bash
# Configurar Supabase (uma vez)
# Seguir SUPABASE_SETUP.md

# Aplicar migrations
cd server && pnpm drizzle-kit push

# Seed
pnpm db:seed
```

---

## 🚨 Breaking Changes

### Para Desenvolvedores

1. **Variáveis de Ambiente**
   - Substituir `DB_HOST`, `DB_USER`, etc. por `DATABASE_URL`
   - Atualizar `.env` local

2. **IDs**
   - Mudaram de `string` para `UUID`
   - Código que gera IDs manualmente precisa ser atualizado

3. **Queries**
   - Sintaxe SQL pode ser ligeiramente diferente
   - Testar todas as queries críticas

### Para Produção

1. **Migração de Dados**
   - Se já tem dados em MySQL, precisa migrar
   - Use ferramentas como `pgloader` ou scripts customizados

2. **Connection String**
   - Atualizar em todos os ambientes (dev, staging, prod)
   - Atualizar em serviços de deploy (Railway, Vercel, etc)

3. **Backups**
   - Fazer backup completo do MySQL antes de migrar
   - Validar dados após migração

---

## 📊 Compatibilidade

### Drizzle ORM

- ✅ Totalmente compatível com PostgreSQL
- ✅ Suporta UUIDs nativos
- ✅ Migrations automáticas
- ✅ Type-safety mantido

### tRPC

- ✅ Sem mudanças necessárias
- ✅ Types atualizados automaticamente

### Frontend

- ✅ Sem mudanças necessárias
- ✅ IDs são strings (UUID serializado)

---

## 🔄 Rollback (se necessário)

Se precisar voltar para MySQL:

1. Restaurar arquivos do Git:
```bash
git checkout HEAD~1 -- server/src/db/schema.ts
git checkout HEAD~1 -- server/src/db/index.ts
git checkout HEAD~1 -- server/drizzle.config.ts
```

2. Reinstalar dependências:
```bash
cd server
pnpm remove postgres
pnpm add mysql2
```

3. Restaurar `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=rotinacare
```

4. Aplicar schema:
```bash
pnpm db:push
```

---

## 📚 Recursos

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Drizzle ORM PostgreSQL](https://orm.drizzle.team/docs/get-started-postgresql)
- [MySQL to PostgreSQL Migration Guide](https://www.postgresql.org/docs/current/migration.html)

---

## 🆘 Suporte

**Problemas com a migração:**
1. Verifique [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
2. Consulte [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
3. Abra issue no repositório

**Problemas com Supabase:**
- [Supabase Support](https://supabase.com/support)
- [Discord Community](https://discord.supabase.com)

---

**Última atualização:** 2025-12-01  
**Versão:** 2.1.0
