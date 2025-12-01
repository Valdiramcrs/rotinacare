# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [2.0.0] - 2025-12-01

### ✨ Adicionado

#### Autenticação
- ✅ Sistema de autenticação JWT completo
- ✅ Hash de senhas com bcrypt (10 rounds)
- ✅ Middleware de autenticação no tRPC
- ✅ Proteção de rotas (protectedProcedure e adminProcedure)
- ✅ Endpoints de login, register, me, updateProfile, changePassword

#### Banco de Dados
- ✅ Conexão real com MySQL via Drizzle ORM
- ✅ Schema completo com 5 tabelas (users, doctors, medications, exams, appointments)
- ✅ Queries implementadas em todos os routers
- ✅ Validação de ownership (usuário só acessa seus próprios dados)
- ✅ Script de seed com dados de exemplo
- ✅ Configuração do Drizzle Kit para migrations

#### Routers Backend
- ✅ **auth**: login, register, me, updateProfile, changePassword
- ✅ **doctors**: list, get, create, update, delete
- ✅ **medications**: list, get, create, update, delete, active
- ✅ **admin**: stats, users, userStats, recentActivity, growthStats

#### Testes
- ✅ Configuração do Vitest
- ✅ Testes unitários para componente Button
- ✅ Testes para utilitários de autenticação (JWT, bcrypt)
- ✅ Testes para utilitários de formatação
- ✅ Scripts de teste: `test`, `test:ui`, `test:coverage`

#### CI/CD
- ✅ GitHub Actions workflow para CI (lint, test, build)
- ✅ GitHub Actions workflow para deploy (Vercel + Railway)
- ✅ Configuração do Vercel para 3 apps
- ✅ Dockerfile para o servidor
- ✅ docker-compose.yml para desenvolvimento local
- ✅ Guia completo de deploy (DEPLOY.md)

#### Documentação
- ✅ README.md completo e profissional
- ✅ GETTING_STARTED.md atualizado
- ✅ DEPLOY.md com instruções detalhadas
- ✅ PROJECT_SUMMARY.md com overview completo
- ✅ CHANGELOG.md (este arquivo)

### 🔧 Modificado

- 📝 Atualizado contexto tRPC com autenticação real
- 📝 Melhorado tratamento de erros com TRPCError
- 📝 Adicionado validações Zod em todos os inputs
- 📝 Configurado CORS para produção
- 📝 Otimizado queries do banco de dados

### 🔒 Segurança

- 🔐 Implementado hash de senhas (bcrypt)
- 🔐 Tokens JWT com expiração
- 🔐 Validação de ownership em todas as queries
- 🔐 Prepared statements (proteção contra SQL injection)
- 🔐 Validação de inputs com Zod

## [1.0.0] - 2025-11-30

### ✨ Adicionado

#### Estrutura Inicial
- ✅ Monorepo com pnpm workspaces
- ✅ Configuração Turbo para builds otimizados
- ✅ 3 aplicações frontend (Landing, App, Admin)
- ✅ Backend tRPC com Express
- ✅ 3 pacotes compartilhados (ui, shared, tailwind-config)

#### Aplicações
- ✅ **Landing**: 4 páginas (Home, Features, Pricing, Contact)
- ✅ **App**: 6 páginas (Dashboard, Doctors, Medications, Exams, Appointments, Settings)
- ✅ **Admin**: 5 páginas (Dashboard, Users, Clinics, Reports, Settings)

#### Componentes UI
- ✅ Button, Input, Card, Badge, Avatar
- ✅ Baseados em Radix UI
- ✅ Styled com TailwindCSS
- ✅ Variantes com class-variance-authority

#### Backend
- ✅ Servidor Express configurado
- ✅ tRPC setup básico
- ✅ 4 routers (auth, doctors, medications, admin)
- ✅ Schema do banco de dados
- ✅ Health check endpoint

### 📚 Documentação
- ✅ README.md inicial
- ✅ GETTING_STARTED.md
- ✅ PROJECT_SUMMARY.md

---

## Formato

Este changelog segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

### Tipos de Mudanças

- **Adicionado** para novas funcionalidades
- **Modificado** para mudanças em funcionalidades existentes
- **Descontinuado** para funcionalidades que serão removidas
- **Removido** para funcionalidades removidas
- **Corrigido** para correções de bugs
- **Segurança** para vulnerabilidades corrigidas
