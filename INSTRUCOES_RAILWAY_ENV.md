# Instruções: Configurar Variáveis de Ambiente no Railway

## Passo 1: Copiar as Chaves do Supabase

Você está atualmente na página de API Keys do Supabase:
https://supabase.com/dashboard/project/pcthuczsisjnnettogln/settings/api-keys/legacy

### Copiar as chaves:

1. **anon public key**: 
   - Clique no botão "Copy" ao lado do primeiro input (índice 67)
   - Salve em um arquivo temporário

2. **service_role key**:
   - Clique no botão "Copy" ao lado do segundo input (índice 70)
   - Salve em um arquivo temporário

## Passo 2: Acessar o Railway

1. Acesse: https://railway.app/
2. Faça login na sua conta
3. Selecione o projeto do RotinaCare Server

## Passo 3: Adicionar Variáveis de Ambiente

No painel do Railway, vá em **Variables** e adicione as seguintes variáveis:

### Variáveis Obrigatórias:

```
SUPABASE_URL=https://pcthuczsisjnnettogln.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[Cole a service_role key copiada]
SUPABASE_ANON_KEY=[Cole a anon key copiada]
```

### Variáveis Existentes (manter):

```
DATABASE_URL=[já configurado]
PORT=4000
NODE_ENV=production
```

## Passo 4: Fazer Deploy

Após adicionar as variáveis:

1. O Railway fará redeploy automático
2. Aguarde o deploy ser concluído
3. Verifique os logs para confirmar que não há erros

## Passo 5: Testar os Endpoints

Após o deploy, teste os endpoints de autenticação:

```bash
# Health check
curl https://seu-dominio-railway.app/api/health

# Me endpoint (requer token)
curl -H "Authorization: Bearer SEU_TOKEN" https://seu-dominio-railway.app/api/auth/me
```

## Notas Importantes

⚠️ **SEGURANÇA:**
- A `SUPABASE_SERVICE_ROLE_KEY` tem acesso total ao banco
- Nunca exponha essa chave no frontend
- Nunca commite no Git

✅ **VERIFICAÇÃO:**
- Confirme que todas as 3 variáveis do Supabase foram adicionadas
- Verifique se o deploy foi bem-sucedido
- Teste os endpoints após o deploy
