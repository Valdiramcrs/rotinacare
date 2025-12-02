# Build stage
FROM node:22-alpine AS builder

# Instalar pnpm
RUN npm install -g pnpm@9.0.0

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server/package.json ./server/
COPY packages/shared/package.json ./packages/shared/

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY server ./server
COPY packages/shared ./packages/shared

# Build do pacote shared
WORKDIR /app/packages/shared
RUN pnpm build

# Build do servidor
WORKDIR /app/server
RUN pnpm build

# Production stage
FROM node:22-alpine

# Instalar pnpm
RUN npm install -g pnpm@9.0.0

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server/package.json ./server/
COPY packages/shared/package.json ./packages/shared/

# Instalar APENAS dependências de produção
RUN pnpm install --frozen-lockfile --prod

# Copiar código compilado do builder
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /app/server

# Expor porta
EXPOSE 4000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:4000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando de inicialização
CMD ["node", "dist/index.js"]
