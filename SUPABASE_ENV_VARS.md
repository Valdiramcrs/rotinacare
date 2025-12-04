# Variáveis de Ambiente do Supabase

## Informações Extraídas do Painel

### URL do Projeto
```
SUPABASE_URL=https://pcthuczsisjnnettogln.supabase.co
```

### Chaves API (Legacy)

#### Anon Public Key
```
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdGh1Y3pzaXNqbm5ldHRvZ2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5MDc0MzcsImV4cCI6MjA0ODQ4MzQzN30.eJpc3M1O1JzdXBhYmFzZSIsInJlZiI6InBjdGh1Y3pzaXNqbm5ldHRvZ2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5MDc0MzcsImV4cCI6MjA0ODQ4MzQzN30
```

#### Service Role Key (Secret)
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdGh1Y3pzaXNqbm5ldHRvZ2xuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjkwNzQzNywiZXhwIjoyMDQ4NDgzNDM3fQ.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdGh1Y3pzaXNqbm5ldHRvZ2xuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjkwNzQzNywiZXhwIjoyMDQ4NDgzNDM3fQ
```

## Configuração no Railway

Adicionar as seguintes variáveis de ambiente no projeto do Railway:

1. `SUPABASE_URL`
2. `SUPABASE_SERVICE_ROLE_KEY`
3. `SUPABASE_ANON_KEY`

## Notas Importantes

⚠️ **ATENÇÃO:** A `SUPABASE_SERVICE_ROLE_KEY` tem acesso total ao banco de dados, ignorando RLS. 
- Nunca expor no frontend
- Usar apenas no backend
- Nunca commitar no Git

✅ A `SUPABASE_ANON_KEY` pode ser usada no frontend (respeitará RLS)
