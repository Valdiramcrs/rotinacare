# Arquitetura de Observabilidade

## 📐 Diagrama de Fluxo

```
┌─────────────────────────────────────────────────────────────────┐
│                      RotinaCare Application                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Landing  │  │   App    │  │  Admin   │  │  Server  │       │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
│       │             │              │             │              │
│       └─────────────┴──────────────┴─────────────┘              │
│                          │                                       │
└──────────────────────────┼───────────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │     Observability Stack              │
        └──────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   ┌────────┐        ┌─────────┐       ┌─────────┐
   │  Logs  │        │ Metrics │       │ Traces  │
   └────┬───┘        └────┬────┘       └────┬────┘
        │                 │                  │
        ▼                 ▼                  ▼
   ┌────────┐        ┌─────────┐       ┌─────────┐
   │  Pino  │        │ Custom  │       │ Sentry  │
   └────┬───┘        │ Metrics │       └────┬────┘
        │            └────┬────┘             │
        │                 │                  │
        ▼                 ▼                  ▼
   ┌────────┐        ┌──────────┐      ┌─────────┐
   │DataDog │        │Prometheus│      │ Sentry  │
   │ Logtail│        │          │      │   UI    │
   └────────┘        └────┬─────┘      └─────────┘
                          │
                          ▼
                     ┌─────────┐
                     │ Grafana │
                     └─────────┘
                          │
                          ▼
                    ┌──────────┐
                    │ Alertas  │
                    └────┬─────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   ┌────────┐       ┌────────┐      ┌────────┐
   │ Slack  │       │Discord │      │ Email  │
   └────────┘       └────────┘      └────────┘
```

## 🔄 Fluxo de Dados

### 1. Logs

```
Request → Pino Logger → JSON Output → Log Aggregator → Dashboard
```

**Componentes:**
- **Pino**: Logger de alta performance
- **Log Aggregator**: DataDog, Logtail, CloudWatch
- **Dashboard**: Interface de busca e análise

### 2. Métricas

```
Event → Metrics Collector → Prometheus → Grafana → Alertas
```

**Componentes:**
- **Metrics Collector**: Sistema customizado
- **Prometheus**: Time-series database
- **Grafana**: Visualização e dashboards
- **AlertManager**: Gerenciamento de alertas

### 3. Error Tracking

```
Error → Sentry SDK → Sentry Backend → Alertas + UI
```

**Componentes:**
- **Sentry SDK**: Captura de erros
- **Sentry Backend**: Processamento e agregação
- **Sentry UI**: Interface de análise

## 📊 Tipos de Dados Coletados

### Logs

| Tipo | Exemplo | Nível |
|------|---------|-------|
| HTTP Request | `GET /api/doctors 200 125ms` | info |
| Database Query | `SELECT * FROM users WHERE id = ?` | debug |
| Error | `Database connection failed` | error |
| Security Event | `Failed login attempt` | warn |

### Métricas

| Categoria | Métrica | Tipo |
|-----------|---------|------|
| HTTP | Request rate, Response time | Counter, Histogram |
| Database | Query count, Query duration | Counter, Histogram |
| Business | Users registered, Logins | Counter |
| System | Memory usage, CPU usage | Gauge |

### Traces

| Componente | Informação |
|------------|------------|
| Request ID | Identificador único |
| User ID | Usuário autenticado |
| Breadcrumbs | Ações do usuário |
| Stack trace | Pilha de execução |

## 🎯 Objetivos de Observabilidade

### SLIs (Service Level Indicators)

| Indicador | Métrica | Target |
|-----------|---------|--------|
| Availability | Uptime | > 99.9% |
| Latency | p95 response time | < 500ms |
| Error Rate | Errors/requests | < 0.1% |
| Throughput | Requests/second | Baseline |

### SLOs (Service Level Objectives)

- **Availability**: 99.9% uptime mensal
- **Latency**: 95% das requisições < 500ms
- **Error Budget**: 0.1% de erro permitido

## 🔧 Ferramentas por Camada

### Coleta

- **Logs**: Pino
- **Métricas**: Custom Collector
- **Traces**: Sentry

### Armazenamento

- **Logs**: DataDog, Logtail
- **Métricas**: Prometheus
- **Traces**: Sentry

### Visualização

- **Logs**: DataDog UI, Logtail UI
- **Métricas**: Grafana
- **Traces**: Sentry UI

### Alertas

- **Channels**: Slack, Discord, Email
- **Manager**: AlertManager, Sentry

## 💰 Custos Estimados

### Tier Gratuito

| Serviço | Limite Gratuito | Custo Excedente |
|---------|-----------------|-----------------|
| Sentry | 5k eventos/mês | $26/mês (10k) |
| DataDog | Trial 14 dias | $15/host/mês |
| Logtail | 1GB/mês | $0.25/GB |

### Produção (estimativa)

- **Sentry**: $26/mês (10k eventos)
- **DataDog**: $45/mês (3 hosts)
- **Logtail**: $25/mês (100GB)

**Total**: ~$100/mês

### Self-Hosted (alternativa)

- **Prometheus + Grafana**: Gratuito
- **Loki**: Gratuito
- **Jaeger**: Gratuito
- **Custo**: Apenas infraestrutura (~$20/mês)

## 📈 Escalabilidade

### Pequeno (< 1k usuários)

- Sentry gratuito
- Prometheus + Grafana local
- Logs em arquivo

### Médio (1k - 10k usuários)

- Sentry pago
- DataDog ou Logtail
- Prometheus + Grafana

### Grande (> 10k usuários)

- Sentry Enterprise
- DataDog completo
- Prometheus cluster
- Dedicated log storage

## 🔐 Segurança

### Dados Sensíveis

**Sanitização automática:**
- Senhas
- Tokens
- Cookies
- Headers de autenticação

**Configuração:**

```typescript
beforeSend(event) {
  delete event.request.cookies;
  delete event.request.headers.authorization;
  return event;
}
```

### Retenção de Dados

- **Logs**: 30 dias
- **Métricas**: 90 dias
- **Traces**: 90 dias

### Compliance

- LGPD: Dados pessoais anonimizados
- GDPR: Right to be forgotten implementado

## 📚 Referências

- [The Twelve-Factor App](https://12factor.net/)
- [Google SRE Book](https://sre.google/books/)
- [Observability Engineering](https://www.oreilly.com/library/view/observability-engineering/9781492076438/)
