# External Integrations

<!--
GUIDANCE FOR k-scan-agent:
- Search for API client configurations
- Check environment variables for service URLs/keys
- Analyze database connection strings
- Look for SDK initializations
-->

## APIs Consumed

<!--
GUIDANCE: Document all external APIs the system calls
- Look for fetch/axios calls, SDK usage
- Check for API key environment variables
- Note authentication methods
-->

### Internal APIs

| API | Base URL | Purpose | Auth Method |
|-----|----------|---------|-------------|
| | | | |

### Third-Party APIs

| Provider | API | Version | Purpose | Auth | Rate Limits |
|----------|-----|---------|---------|------|-------------|
| <!-- e.g., Stripe --> | <!-- e.g., Payments API --> | <!-- e.g., v2023-10 --> | <!-- e.g., Payment processing --> | <!-- e.g., API Key --> | <!-- e.g., 100/sec --> |
| | | | | | |

### API Client Configuration

| API | Client Location | Config Location | Notes |
|-----|-----------------|-----------------|-------|
| | | | |

## Databases

<!--
GUIDANCE: Document all database connections
- Check ORM configuration
- Look for connection strings
- Note any replicas or read/write splits
-->

### Primary Database

| Property | Value |
|----------|-------|
| Type | <!-- e.g., PostgreSQL --> |
| Version | <!-- e.g., 15.x --> |
| ORM | <!-- e.g., Prisma --> |
| Connection | <!-- e.g., DATABASE_URL env var --> |
| Pool Size | <!-- e.g., 10 --> |

### Database Schema

| Schema/DB | Purpose | Tables/Collections | Notes |
|-----------|---------|-------------------|-------|
| | | | |

### Additional Data Stores

| Store | Type | Purpose | Configuration |
|-------|------|---------|---------------|
| <!-- e.g., Redis --> | <!-- e.g., Cache --> | <!-- e.g., Session store --> | <!-- e.g., REDIS_URL --> |
| <!-- e.g., Elasticsearch --> | <!-- e.g., Search --> | | |

### ORM/Query Configuration

| Setting | Value | Location |
|---------|-------|----------|
| Schema file | | |
| Migrations | | |
| Seeds | | |

## Third-Party Services

<!--
GUIDANCE: Document all external service integrations
- Authentication providers
- Cloud services
- Analytics
- Monitoring
-->

### Authentication Services

| Service | Purpose | SDK/Library | Config |
|---------|---------|-------------|--------|
| <!-- e.g., Auth0 --> | <!-- e.g., User auth --> | <!-- e.g., @auth0/nextjs-auth0 --> | |
| <!-- e.g., Firebase Auth --> | | | |

### Cloud Services

| Provider | Service | Purpose | SDK |
|----------|---------|---------|-----|
| <!-- e.g., AWS --> | <!-- e.g., S3 --> | <!-- e.g., File storage --> | <!-- e.g., @aws-sdk/client-s3 --> |
| | <!-- e.g., SES --> | <!-- e.g., Email --> | |

### Analytics & Monitoring

| Service | Purpose | Integration | Data Collected |
|---------|---------|-------------|----------------|
| <!-- e.g., Segment --> | <!-- e.g., Event tracking --> | <!-- e.g., @segment/analytics-next --> | |
| <!-- e.g., Sentry --> | <!-- e.g., Error tracking --> | | |
| <!-- e.g., DataDog --> | <!-- e.g., APM --> | | |

### Payment Services

| Provider | Purpose | SDK | Sandbox/Test Mode |
|----------|---------|-----|-------------------|
| | | | |

### Communication Services

| Service | Purpose | SDK | Notes |
|---------|---------|-----|-------|
| <!-- e.g., Twilio --> | <!-- e.g., SMS --> | | |
| <!-- e.g., SendGrid --> | <!-- e.g., Email --> | | |

## Message Queues

<!--
GUIDANCE: Document async communication systems
- Check for queue client libraries
- Look for consumer/producer patterns
-->

### Queue System

| Property | Value |
|----------|-------|
| Type | <!-- e.g., RabbitMQ, SQS, Redis --> |
| Connection | <!-- e.g., QUEUE_URL env var --> |
| Client | <!-- e.g., bullmq --> |

### Queues/Topics

| Queue | Purpose | Producers | Consumers | DLQ |
|-------|---------|-----------|-----------|-----|
| | | | | |

### Message Patterns

| Pattern | Implementation | Use Case |
|---------|----------------|----------|
| Pub/Sub | | |
| Work Queue | | |
| Request/Reply | | |

## Webhooks

<!--
GUIDANCE: Document both incoming and outgoing webhooks
-->

### Incoming Webhooks

| Provider | Endpoint | Purpose | Verification |
|----------|----------|---------|--------------|
| <!-- e.g., Stripe --> | `/api/webhooks/stripe` | | <!-- e.g., Signature verification --> |

### Outgoing Webhooks

| Event | Destination | Payload | Retry Policy |
|-------|-------------|---------|--------------|
| | | | |

## Environment Variables

<!--
GUIDANCE: List all integration-related environment variables
- Do NOT include actual values
- Note which are required vs optional
-->

### Required

| Variable | Service | Purpose | Format |
|----------|---------|---------|--------|
| `DATABASE_URL` | | | `postgresql://...` |
| `API_KEY` | | | |

### Optional

| Variable | Service | Purpose | Default |
|----------|---------|---------|---------|
| | | | |

## Integration Health Checks

<!--
GUIDANCE: Document how integration health is monitored
-->

| Integration | Health Endpoint | Check Frequency | Alert Threshold |
|-------------|-----------------|-----------------|-----------------|
| | | | |

## Integration Dependencies

<!--
GUIDANCE: Document dependencies between integrations
-->

```
<!-- Dependency diagram -->
App
 ├── Auth Provider
 │    └── User Database
 ├── Payment Provider
 │    └── Webhook Handler
 └── Storage Provider
```

---

## Analysis Metadata

| Field | Value |
|-------|-------|
| Analyzed | <!-- ISO date --> |
| Integrations Found | <!-- Count --> |
| Env Vars Required | <!-- Count --> |
| Agent Version | <!-- k-scan-agent version --> |
