# Guia de Início Rápido - RotinasCare

## Visão Geral

Este é um projeto monorepo contendo três aplicações frontend independentes e um backend compartilhado.

### Estrutura do Projeto

```
rotinacare/
├── apps/
│   ├── landing/          # Landing page (porta 3000)
│   ├── app/              # Aplicação de usuários (porta 3001)
│   └── admin/            # Painel administrativo (porta 3002)
├── packages/
│   ├── ui/               # Componentes UI compartilhados
│   ├── shared/           # Types, schemas e utils
│   └── tailwind-config/  # Configuração Tailwind
└── server/               # Backend tRPC (porta 4000)
```

## Pré-requisitos

- Node.js 18+ instalado
- pnpm 9.0.0+ instalado (`npm install -g pnpm`)
- MySQL (opcional, para desenvolvimento com banco de dados)

## Instalação

```bash
# Instalar dependências
pnpm install
```

## Desenvolvimento

### Iniciar todas as aplicações

```bash
# Inicia todas as apps e o servidor simultaneamente
pnpm dev
```

### Iniciar aplicações individualmente

```bash
# Landing page
pnpm dev:landing

# App de usuários
pnpm dev:app

# Painel admin
pnpm dev:admin

# Servidor backend
pnpm dev:server
```

### URLs de Desenvolvimento

- **Landing**: http://localhost:3000
- **App**: http://localhost:3001
- **Admin**: http://localhost:3002
- **Server**: http://localhost:4000
- **Health Check**: http://localhost:4000/api/health

## Build

```bash
# Build de todas as aplicações
pnpm build

# Build individual
pnpm build:landing
pnpm build:app
pnpm build:admin
```

## Estrutura das Aplicações

### Landing (rotinacare.com)

Página pública com informações sobre o produto, preços e contato.

**Páginas:**
- Home (`/`)
- Funcionalidades (`/features`)
- Preços (`/pricing`)
- Contato (`/contact`)

### App (app.rotinacare.com)

Aplicação principal para usuários/pacientes gerenciarem sua saúde.

**Páginas:**
- Dashboard (`/`)
- Médicos (`/doctors`)
- Medicamentos (`/medications`)
- Exames (`/exams`)
- Consultas (`/appointments`)
- Configurações (`/settings`)

### Admin (admin.rotinacare.com)

Painel administrativo para gerenciar a plataforma.

**Páginas:**
- Dashboard (`/`)
- Usuários (`/users`)
- Clínicas (`/clinics`)
- Relatórios (`/reports`)
- Configurações (`/settings`)

## Backend (Server)

O backend usa **tRPC** para comunicação type-safe entre frontend e backend.

### Rotas disponíveis:

- `auth.*` - Autenticação (login, register, me)
- `doctors.*` - Gestão de médicos
- `medications.*` - Gestão de medicamentos
- `admin.*` - Rotas administrativas

### Configuração do Banco de Dados

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure as variáveis de ambiente no `.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua-senha
   DB_NAME=rotinacare
   ```

3. Execute as migrations (quando implementadas):
   ```bash
   cd server
   pnpm db:push
   ```

## Pacotes Compartilhados

### @rotinacare/ui

Componentes UI reutilizáveis baseados em Radix UI e TailwindCSS.

**Componentes disponíveis:**
- Button
- Input
- Card
- Badge
- Avatar

**Uso:**
```tsx
import { Button, Card } from '@rotinacare/ui';
```

### @rotinacare/shared

Types, schemas e utilitários compartilhados.

**Uso:**
```tsx
import { User, Doctor, createDoctorSchema } from '@rotinacare/shared';
import { formatDate } from '@rotinacare/shared/utils';
```

## Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Wouter** - Roteamento
- **tRPC** - Type-safe API
- **React Query** - Data fetching

### Backend
- **Express** - Server framework
- **tRPC** - Type-safe API
- **Drizzle ORM** - Database ORM
- **MySQL** - Database
- **Zod** - Schema validation

### Monorepo
- **pnpm** - Package manager
- **Turbo** - Build system

## Próximos Passos

1. **Implementar autenticação real**
   - Adicionar JWT tokens
   - Implementar hash de senhas
   - Criar middleware de autenticação

2. **Conectar ao banco de dados**
   - Implementar queries do Drizzle ORM
   - Criar migrations
   - Adicionar seeds de dados

3. **Adicionar validações**
   - Implementar validações de formulários
   - Adicionar feedback de erros
   - Melhorar UX

4. **Deploy**
   - Configurar CI/CD
   - Deploy no Vercel (frontend)
   - Deploy no Railway/Render (backend)

## Comandos Úteis

```bash
# Limpar node_modules e reinstalar
pnpm clean && pnpm install

# Verificar erros de TypeScript
pnpm lint

# Abrir Drizzle Studio (GUI para banco de dados)
cd server && pnpm db:studio
```

## Suporte

Para dúvidas ou problemas, consulte a documentação ou abra uma issue no repositório.
