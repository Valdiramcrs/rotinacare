# Observabilidade - Quick Start

Guia rápido para configurar observabilidade em 5 minutos.

## 1️⃣ Configurar Variáveis de Ambiente

```bash
# .env
LOG_LEVEL=info
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
RELEASE_VERSION=v1.0.0
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/xxx/xxx
```

## 2️⃣ Criar Conta no Sentry

1. Acesse [sentry.io](https://sentry.io)
2. Crie conta gratuita
3. Crie projeto "rotinacare-server"
4. Copie o DSN
5. Cole no `.env`

## 3️⃣ Configurar Slack Webhook

1. Acesse workspace do Slack
2. Apps → Incoming Webhooks
3. Add to Slack
4. Escolha canal (ex: #alerts)
5. Copie webhook URL
6. Cole no `.env`

## 4️⃣ Testar

```bash
# Iniciar servidor
pnpm dev:server

# Verificar health
curl http://localhost:4000/api/health

# Verificar métricas
curl http://localhost:4000/api/metrics/json

# Verificar logs
# Logs devem aparecer no terminal
```

## 5️⃣ Produção

### Opção A: DataDog (Recomendado)

```bash
# Adicionar ao Railway
DD_API_KEY=xxx
DD_SITE=datadoghq.com
DD_LOGS_ENABLED=true
DD_APM_ENABLED=true
```

### Opção B: Prometheus + Grafana

```bash
# docker-compose.yml
docker-compose up -d prometheus grafana

# Acessar Grafana
http://localhost:3000
# Login: admin / admin

# Importar dashboard
Dashboards → Import → Upload monitoring/grafana-dashboard.json
```

## 📊 URLs Úteis

- **Health Check:** `/api/health`
- **Liveness:** `/api/health/live`
- **Readiness:** `/api/health/ready`
- **Métricas (Prometheus):** `/api/metrics`
- **Métricas (JSON):** `/api/metrics/json`

## 🚨 Alertas de Teste

```bash
# Enviar alerta de teste
curl -X POST http://localhost:4000/api/test-alert
```

## 📚 Documentação Completa

Veja [OBSERVABILITY.md](../OBSERVABILITY.md) para documentação completa.
