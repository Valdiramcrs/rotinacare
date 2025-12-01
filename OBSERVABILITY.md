# Guia de Observabilidade - RotinasCare

Este documento descreve o sistema completo de observabilidade implementado na plataforma RotinasCare, incluindo logging, monitoring, error tracking e alertas.

## 📊 Visão Geral

A observabilidade é composta por três pilares fundamentais:

1. **Logs** - Registros detalhados de eventos
2. **Métricas** - Medições quantitativas de performance
3. **Traces** - Rastreamento de requisições distribuídas

## 🔍 Logging

### Implementação

Utilizamos **Pino** para logging estruturado de alta performance.

**Características:**
- Logs em JSON estruturado (produção)
- Logs formatados e coloridos (desenvolvimento)
- Níveis: `debug`, `info`, `warn`, `error`, `fatal`
- Serialização automática de objetos
- Request ID em todas as requisições

### Configuração

```typescript
import { logger } from './lib/logger';

// Log simples
logger.info('Server started');

// Log com contexto
logger.info({ userId: '123', action: 'login' }, 'User logged in');

// Log de erro
logger.error({ err: error }, 'Database connection failed');
```

### Níveis de Log

| Nível | Uso | Exemplo |
|-------|-----|---------|
| `debug` | Informações de debugging | Valores de variáveis, fluxo de execução |
| `info` | Eventos normais | Requisições HTTP, operações bem-sucedidas |
| `warn` | Situações anormais não críticas | Retry de operação, uso alto de recursos |
| `error` | Erros que afetam funcionalidade | Falha em query, erro de validação |
| `fatal` | Erros críticos que param o sistema | Falha ao iniciar servidor |

### Variáveis de Ambiente

```bash
LOG_LEVEL=info  # debug, info, warn, error, fatal
```

### Agregação de Logs

**Produção:**
- Logs são enviados em formato JSON
- Integração com serviços: DataDog, Logtail, CloudWatch, etc.
- Retenção: 30 dias (configurável)

**Exemplo de integração com DataDog:**

```bash
# Via Docker
docker run -d \
  -e DD_API_KEY=<sua-api-key> \
  -e DD_LOGS_ENABLED=true \
  -v /var/log:/var/log:ro \
  datadog/agent:latest
```

## 🚨 Error Tracking

### Sentry

Utilizamos **Sentry** para rastreamento de erros em tempo real.

**Funcionalidades:**
- Captura automática de exceções
- Stack traces completos
- Breadcrumbs (rastro de ações)
- Session replay
- Performance monitoring
- Release tracking

### Configuração

**Backend:**

```typescript
import { initSentry } from './lib/sentry';

// Inicializar
initSentry(app);

// Capturar erro manualmente
import { captureException } from './lib/sentry';
captureException(error, { userId: '123' });
```

**Frontend:**

```typescript
import { initSentryClient } from '@rotinacare/shared';

initSentryClient({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  appName: 'app',
});
```

### Variáveis de Ambiente

```bash
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
RELEASE_VERSION=v1.0.0
```

### Configuração no Sentry

1. Criar projeto em [sentry.io](https://sentry.io)
2. Copiar DSN
3. Configurar alertas
4. Integrar com Slack/Discord

## 📈 Métricas

### Sistema de Métricas

Implementamos sistema customizado de métricas com suporte a:

- **Counters** - Valores incrementais (ex: total de requisições)
- **Gauges** - Valores instantâneos (ex: uso de memória)
- **Histograms** - Distribuição de valores (ex: latência)
- **Timings** - Duração de operações

### Métricas Disponíveis

#### Métricas de Negócio

| Métrica | Tipo | Descrição |
|---------|------|-----------|
| `users.registered` | Counter | Total de usuários registrados |
| `users.logged_in` | Counter | Total de logins |
| `doctors.created` | Counter | Médicos cadastrados |
| `medications.created` | Counter | Medicamentos cadastrados |
| `exams.created` | Counter | Exames cadastrados |
| `appointments.created` | Counter | Consultas agendadas |

#### Métricas de Sistema

| Métrica | Tipo | Descrição |
|---------|------|-----------|
| `http.requests` | Counter | Total de requisições HTTP |
| `http.requests.completed` | Counter | Requisições completadas |
| `http.request.duration` | Histogram | Duração de requisições |
| `db.queries` | Counter | Total de queries |
| `db.query.duration` | Histogram | Duração de queries |
| `errors.total` | Counter | Total de erros |

### Endpoints de Métricas

```bash
# Formato Prometheus
GET /api/metrics

# Formato JSON
GET /api/metrics/json
```

**Exemplo de resposta:**

```json
{
  "counters": {
    "users.registered": 1234,
    "http.requests": 45678
  },
  "histograms": {
    "http.request.duration": {
      "count": 1000,
      "min": 5,
      "max": 2500,
      "avg": 125,
      "p50": 100,
      "p95": 450,
      "p99": 850
    }
  },
  "timestamp": "2025-12-01T10:00:00.000Z"
}
```

### Integração com Prometheus

**prometheus.yml:**

```yaml
scrape_configs:
  - job_name: 'rotinacare'
    scrape_interval: 30s
    static_configs:
      - targets: ['api.rotinacare.com:4000']
    metrics_path: '/api/metrics'
```

## 🏥 Health Checks

### Endpoints

| Endpoint | Descrição | Uso |
|----------|-----------|-----|
| `/api/health` | Health check completo | Monitoring geral |
| `/api/health/live` | Liveness probe | Kubernetes liveness |
| `/api/health/ready` | Readiness probe | Kubernetes readiness |

### Health Check Completo

```bash
GET /api/health
```

**Resposta:**

```json
{
  "status": "healthy",
  "timestamp": "2025-12-01T10:00:00.000Z",
  "uptime": 3600,
  "version": "v1.0.0",
  "checks": {
    "database": {
      "status": "pass",
      "message": "Database is healthy",
      "responseTime": 15
    },
    "memory": {
      "status": "pass",
      "message": "Memory usage is normal",
      "details": {
        "heapUsed": "125MB",
        "heapTotal": "256MB",
        "percentage": "48.8%"
      }
    }
  }
}
```

### Status Codes

- `200` - Healthy ou Degraded
- `503` - Unhealthy

### Kubernetes Configuration

```yaml
livenessProbe:
  httpGet:
    path: /api/health/live
    port: 4000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /api/health/ready
    port: 4000
  initialDelaySeconds: 5
  periodSeconds: 5
```

## 🔔 Alertas

### Sistema de Alertas

Implementamos sistema de alertas multi-canal com suporte a:

- **Slack** - Via webhook
- **Discord** - Via webhook
- **Email** - Via SMTP
- **Sentry** - Para erros críticos

### Configuração

```bash
# Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/xxx/xxx

# Discord
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxx/xxx

# Email
ALERT_EMAIL_RECIPIENTS=ops@rotinacare.com,dev@rotinacare.com
```

### Alertas Pré-configurados

| Alerta | Severidade | Trigger |
|--------|-----------|---------|
| High Error Rate | Error | > 10 erros/min |
| Database Connection Failed | Critical | Falha na conexão |
| High Memory Usage | Warning/Critical | > 75% / > 90% |
| Slow Response | Warning | > 1000ms |
| Deployment Started | Info | Deploy iniciado |
| Deployment Completed | Info | Deploy concluído |

### Criar Alerta Customizado

```typescript
import { alertManager } from './lib/alerts';

alertManager.sendAlert({
  title: 'Custom Alert',
  message: 'Something happened',
  severity: 'warning',
  timestamp: new Date(),
  metadata: { key: 'value' },
});
```

## 📊 Dashboards

### Grafana

Dashboard pré-configurado disponível em `monitoring/grafana-dashboard.json`.

**Painéis incluídos:**
- Request Rate (requisições/segundo)
- Response Time (p50, p95, p99)
- Error Rate
- Database Query Performance
- Memory Usage
- Active Users
- Total Registrations

### Importar Dashboard

1. Acesse Grafana
2. Dashboards → Import
3. Upload `grafana-dashboard.json`
4. Selecione data source (Prometheus)

### Configurar Prometheus + Grafana

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-storage:/var/lib/grafana

volumes:
  grafana-storage:
```

## 🔧 Ferramentas Recomendadas

### SaaS (Mais Fácil)

| Ferramenta | Propósito | Preço |
|------------|-----------|-------|
| [Sentry](https://sentry.io) | Error tracking | Gratuito até 5k eventos/mês |
| [DataDog](https://datadoghq.com) | Logs + Métricas + APM | A partir de $15/host/mês |
| [Logtail](https://logtail.com) | Log aggregation | Gratuito até 1GB/mês |
| [Uptime Robot](https://uptimerobot.com) | Uptime monitoring | Gratuito até 50 monitors |
| [PagerDuty](https://pagerduty.com) | Incident management | A partir de $21/usuário/mês |

### Self-Hosted (Mais Controle)

| Ferramenta | Propósito |
|------------|-----------|
| Prometheus | Métricas |
| Grafana | Dashboards |
| Loki | Log aggregation |
| Jaeger | Distributed tracing |
| AlertManager | Alertas |

## 📋 Checklist de Produção

### Antes do Deploy

- [ ] Configurar `SENTRY_DSN`
- [ ] Configurar `LOG_LEVEL=info`
- [ ] Configurar webhooks de alerta (Slack/Discord)
- [ ] Configurar `RELEASE_VERSION`
- [ ] Testar health checks
- [ ] Testar endpoints de métricas
- [ ] Importar dashboard Grafana

### Após o Deploy

- [ ] Verificar logs em tempo real
- [ ] Verificar métricas no Grafana
- [ ] Testar alertas (enviar teste)
- [ ] Configurar uptime monitoring
- [ ] Configurar backup de logs
- [ ] Documentar runbooks

## 🚨 Troubleshooting

### Logs não aparecem

1. Verificar `LOG_LEVEL`
2. Verificar se logs estão em JSON (produção)
3. Verificar configuração do agregador

### Métricas não aparecem no Prometheus

1. Verificar `/api/metrics` retorna dados
2. Verificar configuração do Prometheus
3. Verificar firewall/network

### Alertas não são enviados

1. Verificar variáveis de ambiente
2. Testar webhook manualmente
3. Verificar logs do servidor

### Sentry não captura erros

1. Verificar `SENTRY_DSN`
2. Verificar se Sentry foi inicializado
3. Verificar filtros de erro

## 📚 Recursos

- [Pino Documentation](https://getpino.io)
- [Sentry Documentation](https://docs.sentry.io)
- [Prometheus Documentation](https://prometheus.io/docs)
- [Grafana Documentation](https://grafana.com/docs)
- [The Twelve-Factor App - Logs](https://12factor.net/logs)
- [Google SRE Book - Monitoring](https://sre.google/sre-book/monitoring-distributed-systems/)

---

**Última atualização:** 2025-12-01  
**Versão:** 2.0.0
