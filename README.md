# RotinaCare

> Plataforma completa para gestão de saúde pessoal com monorepo moderno

[![CI/CD](https://github.com/seu-usuario/rotinacare/actions/workflows/ci.yml/badge.svg)](https://github.com/seu-usuario/rotinacare/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🎯 Sobre o Projeto

RotinaCare é uma plataforma web completa para gestão de saúde pessoal, permitindo que usuários organizem informações médicas, medicamentos, exames e consultas em um único lugar.

### ✨ Funcionalidades

- 🔐 **Autenticação JWT** completa com hash de senhas
- 👨‍⚕️ **Gestão de Médicos** - cadastre e organize seus médicos
- 💊 **Controle de Medicamentos** - acompanhe medicamentos e horários
- 🔬 **Registro de Exames** - armazene resultados e histórico
- 📅 **Agendamento de Consultas** - organize suas consultas
- 👥 **Painel Administrativo** - gestão completa da plataforma
- 📊 **Dashboard com Métricas** - visualize suas informações
- 🔒 **Segurança** - proteção de dados e autenticação robusta

## 🏗️ Arquitetura

Este é um **monorepo** gerenciado com **pnpm workspaces** e **Turbo**.

```
rotinacare/
├── apps/
│   ├── landing/          # Landing page pública (rotinacare.com)
│   ├── app/              # Aplicação de usuários (app.rotinacare.com)
│   └── admin/            # Painel admin (admin.rotinacare.com)
├── packages/
│   ├── ui/               # Componentes UI compartilhados
│   ├── shared/           # Types, schemas e utils
│   └── tailwind-config/  # Configuração Tailwind
└── server/               # Backend tRPC + Express
```

## 🚀 Stack Tecnológico

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Type safety
- **Vite** - Build tool ultra-rápido
- **TailwindCSS** - Styling utilitário
- **Wouter** - Roteamento leve
- **tRPC** - API type-safe
- **React Query** - Data fetching e cache

### Backend
- **Express** - Framework web
- **tRPC** - API type-safe end-to-end
- **Drizzle ORM** - Type-safe SQL ORM
- **PostgreSQL** - Banco de dados relacional
- **Supabase** - Banco gerenciado com backups automáticos
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **Zod** - Validação de schemas

### DevOps & Tooling
- **pnpm** - Package manager rápido
- **Turbo** - Build system monorepo
- **Vitest** - Framework de testes
- **GitHub Actions** - CI/CD
- **Docker** - Containerização
- **Vercel** - Deploy frontend
- **Railway** - Deploy backend

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- pnpm 9.0+
- Conta no Supabase (gratuita)

### Setup

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/rotinacare.git
cd rotinacare

# Instale as dependências
pnpm install

# Configure banco de dados Supabase
# Siga o guia completo em SUPABASE_SETUP.md
cp .env.example .env
# Edite .env com a connection string do Supabase

# Execute migrations
cd server
pnpm drizzle-kit push

# Popule com dados iniciais
pnpm db:seed
```

## 🎮 Desenvolvimento

### Iniciar todas as aplicações

```bash
pnpm dev
```

Isso iniciará:
- Landing: http://localhost:3000
- App: http://localhost:3001
- Admin: http://localhost:3002
- Server: http://localhost:4000

### Iniciar aplicações individuais

```bash
pnpm dev:landing    # Landing page
pnpm dev:app        # App de usuários
pnpm dev:admin      # Painel admin
pnpm dev:server     # Backend
```

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Testes com interface
pnpm test:ui

# Testes com coverage
pnpm test:coverage
```

## 🏗️ Build

```bash
# Build de todas as aplicações
pnpm build

# Build individual
pnpm build:landing
pnpm build:app
pnpm build:admin
```

## 🚢 Deploy

Consulte o [Guia de Deploy](DEPLOY.md) para instruções detalhadas.

### Quick Deploy

**Frontend (Vercel):**
```bash
cd apps/landing
vercel --prod
```

**Backend (Railway):**
```bash
cd server
railway up
```

## 📚 Documentação

- [Getting Started](GETTING_STARTED.md) - Guia de início rápido
- [Supabase Setup](SUPABASE_SETUP.md) - Configurar banco de dados
- [Railway Deploy](RAILWAY_DEPLOY.md) - Deploy do backend
- [Vercel Deploy](VERCEL_DEPLOY.md) - Deploy dos frontends
- [Deploy Guide](DEPLOY.md) - Guia completo de deploy
- [Observability Guide](OBSERVABILITY.md) - Sistema de observabilidade
- [Project Summary](PROJECT_SUMMARY.md) - Resumo do projeto

## 🔑 Credenciais de Teste

Após executar `pnpm db:seed`:

**Admin:**
- Email: `admin@rotinacare.com`
- Senha: `admin123`

**Usuário:**
- Email: `teste@exemplo.com`
- Senha: `teste123`

## 📊 Estrutura do Banco de Dados

**PostgreSQL (Supabase)**

```sql
users          # Usuários da plataforma (UUID)
doctors        # Médicos cadastrados (UUID)
medications    # Medicamentos (UUID, com campo active)
exams          # Exames realizados (UUID)
appointments   # Consultas agendadas (UUID)
```

**Características:**
- IDs com UUID (mais seguros que auto-increment)
- Foreign keys com cascade delete
- Timestamps automáticos
- Índices otimizados

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Scripts Disponíveis

```bash
pnpm dev              # Inicia todas as apps em modo dev
pnpm build            # Build de todas as apps
pnpm test             # Executa testes
pnpm test:ui          # Testes com interface
pnpm test:coverage    # Testes com coverage
pnpm lint             # Lint do código
pnpm clean            # Limpa node_modules e builds
```

## 🔒 Segurança

- Senhas são hasheadas com bcrypt (10 rounds)
- Autenticação via JWT com expiração de 7 dias
- Proteção de rotas no frontend e backend
- Validação de dados com Zod
- CORS configurado para domínios específicos
- Prepared statements (SQL injection protection)

## 📈 Performance

- Build otimizado com Vite
- Code splitting automático
- Lazy loading de rotas
- Cache de assets estáticos
- Compressão gzip/brotli
- CDN via Vercel

## 🌐 URLs

**Produção:**
- Landing: https://rotinacare.com
- App: https://app.rotinacare.com
- Admin: https://admin.rotinacare.com
- API: https://api.rotinacare.com

**Desenvolvimento:**
- Landing: http://localhost:3000
- App: http://localhost:3001
- Admin: http://localhost:3002
- API: http://localhost:4000

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ❤️ para facilitar a gestão de saúde pessoal
