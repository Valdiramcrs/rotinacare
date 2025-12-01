# Credenciais de Deploy - RotinasCare

## Supabase (Banco de Dados)

**Projeto:** RotinaCare  
**Region:** AWS us-west-2  
**Plan:** Free (Nano)  
**Status:** ✅ CONFIGURADO

### Connection String (Transaction Pooler - IPv4 Compatible)
```
DATABASE_URL=postgresql://postgres.pcthuczsisjnnettogln:123Mud@r@aws-0-us-west-2.pooler.supabase.com:6543/postgres
```

### Direct Connection (IPv6 only)
```
DATABASE_URL=postgresql://postgres:123Mud@r@db.pcthuczsisjnnettogln.supabase.co:5432/postgres
```

### Project Details
- **Project ID:** pcthuczsisjnnettogln
- **Database Password:** 123Mud@r
- **Organization:** CF236 Ltda.
- **Dashboard:** https://supabase.com/dashboard/project/pcthuczsisjnnettogln

### Tabelas Criadas
1. ✅ users (8 colunas)
2. ✅ doctors (11 colunas)
3. ✅ medications (11 colunas)
4. ✅ exams (10 colunas)
5. ✅ appointments (10 colunas)

---

## Railway (Backend API)

**Projeto:** confident-luck  
**Environment:** production  
**Region:** us-west1 (Legacy)  
**Status:** 🔄 DEPLOYING

### Service Details
- **Service Name:** @rotinacare/server
- **Repository:** https://github.com/Valdiramcrs/rotinacare
- **Root Directory:** server/
- **Build Command:** pnpm install && pnpm build
- **Start Command:** pnpm start

### Environment Variables Configured
```env
DATABASE_URL=postgresql://postgres.pcthuczsisjnnettogln:123Mud@r@aws-0-us-west-2.pooler.supabase.com:6543/postgres
NODE_ENV=production
PORT=4000
JWT_SECRET=rotinacare-super-secret-jwt-key-2024
CORS_ORIGIN=*
```

### Dashboard
- **Project URL:** https://railway.com/project/f3ea3d36-3c51-447a-9157-b3b53345972c
- **Service URL:** (será gerado após deploy completo)

### Deployment Status
- ✅ Variáveis configuradas
- 🔄 Build em progresso
- ⏳ Aguardando URL pública
_A ser preenchido_

---

## Vercel (Frontends)
_A ser preenchido_

---

**Data de criação:** 2025-12-01
