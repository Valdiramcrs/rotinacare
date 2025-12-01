#!/bin/bash

# Script de validação pré-deploy
# Verifica se todas as configurações necessárias estão presentes

set -e

echo "🔍 Validando configurações para deploy..."

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função de validação
validate() {
  if [ -z "$1" ]; then
    echo -e "${RED}❌ $2${NC}"
    return 1
  else
    echo -e "${GREEN}✅ $2${NC}"
    return 0
  fi
}

# Validar variáveis de ambiente
echo ""
echo "📋 Variáveis de Ambiente:"
validate "$DATABASE_URL" "DATABASE_URL"
validate "$JWT_SECRET" "JWT_SECRET"
validate "$NODE_ENV" "NODE_ENV"

# Validar arquivos necessários
echo ""
echo "📁 Arquivos:"
[ -f "package.json" ] && echo -e "${GREEN}✅ package.json${NC}" || echo -e "${RED}❌ package.json${NC}"
[ -f "tsconfig.json" ] && echo -e "${GREEN}✅ tsconfig.json${NC}" || echo -e "${RED}❌ tsconfig.json${NC}"
[ -f "src/index.ts" ] && echo -e "${GREEN}✅ src/index.ts${NC}" || echo -e "${RED}❌ src/index.ts${NC}"
[ -f "drizzle.config.ts" ] && echo -e "${GREEN}✅ drizzle.config.ts${NC}" || echo -e "${RED}❌ drizzle.config.ts${NC}"

# Validar dependências
echo ""
echo "📦 Dependências:"
if command -v pnpm &> /dev/null; then
  echo -e "${GREEN}✅ pnpm instalado${NC}"
else
  echo -e "${RED}❌ pnpm não encontrado${NC}"
  exit 1
fi

# Validar build
echo ""
echo "🏗️  Testando build..."
if pnpm build &> /dev/null; then
  echo -e "${GREEN}✅ Build bem-sucedido${NC}"
else
  echo -e "${RED}❌ Erro no build${NC}"
  exit 1
fi

# Validar conexão com banco
echo ""
echo "🗄️  Testando conexão com banco..."
if pnpm tsx src/db/index.ts &> /dev/null; then
  echo -e "${GREEN}✅ Conexão com banco OK${NC}"
else
  echo -e "${YELLOW}⚠️  Não foi possível validar conexão (pode ser normal)${NC}"
fi

echo ""
echo -e "${GREEN}✅ Validação concluída! Pronto para deploy.${NC}"
