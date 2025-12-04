# Relatório Técnico Detalhado: Sistema RotinaCare

**Autor:** Manus AI  
**Data:** 02 de Dezembro de 2025  
**Versão:** 1.0

---

## 1. Introdução

Este documento fornece uma análise técnica completa e detalhada do sistema **RotinaCare**, uma aplicação web full-stack projetada para ajudar usuários a gerenciar suas rotinas de saúde, incluindo consultas, medicamentos, exames e muito mais. O objetivo deste relatório é servir como uma base de conhecimento abrangente para a manutenção, evolução e replicação do projeto em futuros desenvolvimentos.

O sistema foi construído utilizando uma arquitetura de monorepo, com um backend robusto em Node.js e múltiplos frontends em React, todos gerenciados com pnpm e Turbo. O deploy é automatizado e distribuído entre o Railway (para o backend) e o Vercel (para os frontends), garantindo escalabilidade, performance e um fluxo de CI/CD eficiente.

---

## 2. Arquitetura do Sistema

O RotinaCare adota uma arquitetura de monorepo, que centraliza todo o código-fonte em um único repositório Git. Esta abordagem facilita o compartilhamento de código, a padronização de ferramentas e a gestão de dependências entre os diferentes componentes do sistema.

### 2.1. Visão Geral da Arquitetura

A arquitetura é dividida em três camadas principais:

1.  **Camada de Apresentação (Frontend):** Composta por três aplicações web independentes, cada uma com uma responsabilidade específica:
    *   **Landing Page (`apps/landing`):** Página de marketing e apresentação do produto.
    *   **Aplicação Principal (`apps/app`):** Plataforma para os usuários (pacientes) gerenciarem suas rotinas de saúde.
    *   **Painel Administrativo (`apps/admin`):** Interface para administradores gerenciarem o sistema.

2.  **Camada de Aplicação (Backend):** Um servidor Node.js (`server/`) que expõe uma API utilizando tRPC para comunicação com os frontends. Esta camada é responsável por toda a lógica de negócio, autenticação e comunicação com o banco de dados.

3.  **Camada de Dados (Banco de Dados):** Um banco de dados PostgreSQL hospedado no Supabase, que armazena todas as informações do sistema, como usuários, médicos, medicamentos, exames e consultas.

### 2.2. Componentes do Monorepo

O monorepo é organizado da seguinte forma:

| Diretório         | Descrição                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| `apps/`           | Contém as aplicações web (frontends): `landing`, `app` e `admin`.                                       |
| `server/`         | Contém o código-fonte do backend (servidor Node.js com Express e tRPC).                               |
| `packages/`       | Contém pacotes compartilhados entre os diferentes componentes do sistema.                             |
| `packages/shared` | Pacote com tipos, schemas e utilitários compartilhados entre o backend e os frontends.                |
| `packages/ui`     | Biblioteca de componentes de UI (React) compartilhada entre os frontends.                             |
| `monitoring/`     | Configurações de monitoramento (Prometheus, Grafana).                                                 |
| `scripts/`        | Scripts utilitários para automação de tarefas.                                                        |

---

## 3. Stack Tecnológico

O sistema RotinaCare utiliza uma stack de tecnologias modernas e robustas, escolhidas para garantir performance, escalabilidade e uma excelente experiência de desenvolvimento.

### 3.1. Backend

| Tecnologia      | Versão | Descrição                                                                                             |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| **Node.js**     | 22.x   | Ambiente de execução JavaScript no servidor.                                                          |
| **Express**     | 4.19.0 | Framework web minimalista para Node.js, utilizado para criar o servidor e as rotas.                 |
| **tRPC**        | 11.0.0 | Framework para criar APIs type-safe sem a necessidade de gerar schemas ou código.                    |
| **Drizzle ORM** | 0.31.0 | ORM (Object-Relational Mapper) para TypeScript, utilizado para interagir com o banco de dados.       |
| **PostgreSQL**  | 15.x   | Banco de dados relacional robusto e escalável, hospedado no Supabase.                                 |
| **TypeScript**  | 5.4.0  | Superset do JavaScript que adiciona tipagem estática ao código.                                       |
| **Zod**         | 3.23.0 | Biblioteca para validação de schemas, utilizada com tRPC para garantir a segurança dos dados.       |
| **Pino**        | 10.1.0 | Logger de alta performance para Node.js.                                                            |
| **JWT**         | 9.0.2  | Implementação de JSON Web Tokens para autenticação de usuários.                                       |

### 3.2. Frontend

| Tecnologia        | Versão | Descrição                                                                                             |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| **React**         | 18.3.0 | Biblioteca JavaScript para criar interfaces de usuário.                                                 |
| **Vite**          | 5.3.0  | Ferramenta de build extremamente rápida para desenvolvimento web moderno.                                |
| **TypeScript**    | 5.4.0  | Superset do JavaScript que adiciona tipagem estática ao código.                                       |
| **Tailwind CSS**  | 3.4.4  | Framework CSS utility-first para criar designs customizados rapidamente.                                |
| **TanStack Query**| 5.45.0 | Biblioteca para data fetching e state management em React.                                            |
| **tRPC Client**   | 11.0.0 | Cliente tRPC para consumir a API do backend de forma type-safe.                                       |

### 3.3. Ferramentas e Infraestrutura

| Ferramenta    | Descrição                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| **pnpm**      | Gerenciador de pacotes rápido e eficiente em disco, ideal para monorepos.                             |
| **Turbo**     | Ferramenta de build de alta performance para monorepos JavaScript e TypeScript.                         |
| **Docker**      | Plataforma para desenvolver, enviar e executar aplicações em contêineres.                              |
| **Railway**     | Plataforma de deploy para o backend, com integração contínua via GitHub.                             |
| **Vercel**      | Plataforma de deploy para os frontends, com otimizações para performance e CI/CD.                     |
| **Supabase**    | Plataforma que oferece um banco de dados PostgreSQL gerenciado e outros serviços de backend.          |
| **GitHub**      | Plataforma de hospedagem de código-fonte e controle de versão com Git.                                |

---

## 4. Estrutura de Dados (Schema do Banco de Dados)

O banco de dados PostgreSQL é modelado utilizando o Drizzle ORM. As tabelas principais são:

| Tabela         | Descrição                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| `users`        | Armazena informações dos usuários (pacientes, médicos, admins), incluindo dados de autenticação.        |
| `doctors`      | Cadastro de médicos vinculados aos usuários.                                                          |
| `medications`  | Controle de medicamentos dos usuários, incluindo dosagem, frequência e período de uso.                 |
| `exams`        | Registro de exames realizados, com informações sobre laboratório, resultados e arquivos anexados.       |
| `appointments` | Agendamento de consultas, com informações sobre médico, data, local e status.                          |

O schema completo pode ser encontrado em `server/src/db/schema.ts`.

---

## 5. Configurações de Deploy

### 5.1. Backend (Railway)

- **Serviço:** `amused-respect`
- **Domínio:** `api.rotinacare.com`
- **Root Directory:** `/`
- **Dockerfile Path:** `server/Dockerfile`
- **Variáveis de Ambiente:**
  - `NODE_ENV=production`
  - `PORT=4000`
  - `DATABASE_URL` (Supabase PostgreSQL)
  - `JWT_SECRET`
  - `CORS_ORIGINS`

### 5.2. Frontends (Vercel)

| Projeto               | Root Directory  | Build Command                               |
| --------------------- | --------------- | ------------------------------------------- |
| `rotinacare-landing`  | `apps/landing`  | `cd ../.. && pnpm install && pnpm build:landing` |
| `rotinacare-app`      | `apps/app`      | `cd ../.. && pnpm install && pnpm build:app`     |
| `rotinacare-admin`    | `apps/admin`    | `cd ../.. && pnpm install && pnpm build:admin`   |

- **Variável de Ambiente (todos os projetos):** `VITE_API_URL=https://api.rotinacare.com`

---

## 6. Fluxos de Dados e APIs (tRPC)

O backend expõe uma API tRPC no endpoint `/api/trpc`. Os routers tRPC estão localizados em `server/src/routers/` e são organizados por recurso:

- `auth.ts`: Autenticação de usuários (login, registro)
- `doctors.ts`: CRUD de médicos
- `medications.ts`: CRUD de medicamentos
- `exams.ts`: CRUD de exames
- `appointments.ts`: CRUD de consultas
- `admin.ts`: Rotas administrativas

Os frontends utilizam o `@trpc/react-query` para consumir a API de forma type-safe, garantindo que os dados trafegados entre o cliente e o servidor estejam sempre consistentes com os tipos definidos no pacote `@rotinacare/shared`.

---

## 7. Padrões de Código e Boas Práticas

- **Tipagem Estática:** Uso intensivo de TypeScript em todo o projeto para garantir a segurança e a manutenibilidade do código.
- **ES Modules:** Utilização de ES Modules em todo o backend Node.js.
- **Monorepo:** Organização do código em um monorepo com pnpm e Turbo para facilitar o compartilhamento de código e a gestão de dependências.
- **CI/CD:** Deploy contínuo configurado no Railway e Vercel via GitHub, garantindo que cada push para a branch `main` dispare um novo deploy.
- **Variáveis de Ambiente:** Centralização de todas as configurações sensíveis em variáveis de ambiente, seguindo as melhores práticas de segurança.
- **Logs e Monitoramento:** Configuração de logs com Pino e estrutura para monitoramento com Prometheus e Grafana.

---

## 8. Instruções para Replicar o Projeto

Para replicar o projeto RotinaCare, siga os seguintes passos:

1.  **Clonar o Repositório:**
    ```bash
    git clone https://github.com/Valdiramcrs/rotinacare.git
    cd rotinacare
    ```

2.  **Instalar Dependências:**
    ```bash
    pnpm install
    ```

3.  **Configurar Variáveis de Ambiente:**
    - Crie um arquivo `.env` na raiz do projeto e nos subdiretórios (`server`, `apps/*`) com as variáveis necessárias (ex: `DATABASE_URL`, `JWT_SECRET`, `VITE_API_URL`).

4.  **Rodar em Desenvolvimento:**
    ```bash
    pnpm dev
    ```

5.  **Fazer Build para Produção:**
    ```bash
    pnpm build
    ```

6.  **Configurar Deploy:**
    - Siga as configurações de deploy detalhadas na seção 5 deste relatório para configurar o deploy no Railway e Vercel.

---

## 9. Conclusão

O sistema RotinaCare é um exemplo robusto e bem arquitetado de uma aplicação web moderna, utilizando as melhores práticas de desenvolvimento e as tecnologias mais atuais do ecossistema JavaScript. Este relatório serve como um guia completo para entender, manter e evoluir o projeto, além de ser uma excelente base para a criação de novos sistemas com arquitetura similar.

**Fim do Relatório.**


---

## 10. Diagramas Visuais

Para facilitar a compreensão da arquitetura e dos fluxos do sistema, foram gerados os seguintes diagramas:

### 10.1. Diagrama de Arquitetura Geral

Este diagrama ilustra a relação entre os principais componentes do sistema, incluindo frontends, backend, banco de dados e pacotes compartilhados.

![Diagrama de Arquitetura Geral](/home/ubuntu/rotinacare/diagrams/architecture.png)

### 10.2. Diagrama de Estrutura de Diretórios

Este diagrama mostra a organização dos diretórios no monorepo, destacando a localização de cada aplicação e pacote.

![Diagrama de Estrutura de Diretórios](/home/ubuntu/rotinacare/diagrams/directory-structure.png)

### 10.3. Diagrama de Schema do Banco de Dados

Este diagrama apresenta o modelo de entidade e relacionamento (ER) do banco de dados, mostrando as tabelas e suas relações.

![Diagrama de Schema do Banco de Dados](/home/ubuntu/rotinacare/diagrams/database-schema.png)

### 10.4. Diagrama de Fluxo de Dados (tRPC)

Este diagrama de sequência detalha o fluxo de uma requisição desde a interação do usuário no frontend até a resposta do banco de dados, passando pela API tRPC.

![Diagrama de Fluxo de Dados (tRPC)](/home/ubuntu/rotinacare/diagrams/data-flow.png)

### 10.5. Diagrama de Deploy

Este diagrama ilustra o fluxo de deploy contínuo (CI/CD) desde o repositório no GitHub até a publicação dos serviços no Vercel e Railway, incluindo a configuração de DNS.

![Diagrama de Deploy](/home/ubuntu/rotinacare/diagrams/deployment.png)
