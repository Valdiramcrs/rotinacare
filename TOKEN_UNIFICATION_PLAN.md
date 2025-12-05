# Plano de Unificação de Tokens Google

## Problema Atual

Atualmente temos **duplicação de tokens Google** em duas tabelas:

### 1. Tabela `users`
```sql
- googleId VARCHAR(255)
- googleAccessToken TEXT
- googleRefreshToken TEXT
```
**Uso:** OAuth social (login com Google)  
**Origem:** `server/src/routes/googleAuth.ts`

### 2. Tabela `google_calendar_tokens`
```sql
- userId UUID
- accessToken TEXT
- refreshToken TEXT
- expiresAt TIMESTAMP
- scope TEXT
```
**Uso:** Integração com Google Calendar  
**Origem:** `server/src/services/googleCalendar.ts`

---

## Análise

### Problema
- **Redundância:** Mesmos tokens armazenados em 2 lugares
- **Inconsistência:** Tokens podem ficar dessincronizados
- **Complexidade:** Duas fontes de verdade para o mesmo dado

### Solução Proposta

**MANTER apenas a tabela `users`** e remover `google_calendar_tokens`.

**Motivo:**
1. OAuth social já salva tokens completos em `users`
2. Tokens do OAuth incluem escopo `calendar`
3. Refresh token é único e pode ser reutilizado
4. Simplifica arquitetura

---

## Plano de Migração

### Fase 1: Atualizar `users` com campos adicionais
```sql
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS google_token_expires_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS google_token_scope TEXT;
```

### Fase 2: Migrar dados existentes
```sql
UPDATE users u
SET 
  google_access_token = gct.access_token,
  google_refresh_token = gct.refresh_token,
  google_token_expires_at = gct.expires_at,
  google_token_scope = gct.scope
FROM google_calendar_tokens gct
WHERE u.id = gct.user_id
  AND u.google_access_token IS NULL;
```

### Fase 3: Atualizar código
1. Modificar `googleCalendar.ts` para usar tabela `users`
2. Remover referências a `googleCalendarTokens`
3. Atualizar `googleAuth.ts` para salvar `expiresAt` e `scope`

### Fase 4: Remover tabela antiga (após validação)
```sql
DROP TABLE google_calendar_tokens;
```

---

## Decisão: NÃO UNIFICAR AGORA

**Motivo:** Risco de quebrar funcionalidade existente do Google Calendar.

**Alternativa:** Manter as duas tabelas mas **sincronizar** os tokens:
- Quando login OAuth salva tokens em `users`, também salvar em `google_calendar_tokens`
- Quando Calendar API renova token, também atualizar em `users`

Isso garante compatibilidade sem quebrar código existente.

---

## Melhorias Implementadas (sem unificação)

1. ✅ **Refresh automático de token** - Já existe em `googleCalendar.ts`
2. ✅ **Botão desconectar Google** - Remover tokens de ambas tabelas
3. ✅ **Exibir avatar** - Já salvo em `users.avatarUrl`
4. ✅ **Vincular Google a conta existente** - Atualizar `users` existente

---

## Conclusão

**Não vamos unificar as tabelas agora** para evitar riscos. Vamos focar nas melhorias de UX que agregam valor imediato.
