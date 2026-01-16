# System Architecture

<!--
GUIDANCE FOR k-scan-agent:
- Identify the primary architectural pattern from code structure
- Map data flow through the system
- Document component boundaries and interfaces
- Note any architectural decisions documented in ADRs or comments
-->

## Architecture Pattern

<!--
GUIDANCE: Identify which pattern(s) the codebase follows
- Clean Architecture / Hexagonal / Ports & Adapters
- MVC / MVP / MVVM
- Microservices / Modular Monolith
- Event-Driven / CQRS
- Layered Architecture
-->

**Primary Pattern:** <!-- e.g., Clean Architecture with Domain-Driven Design -->

**Secondary Patterns:** <!-- e.g., Repository Pattern, CQRS for queries -->

### Pattern Justification

<!-- Why this pattern was chosen (if documented) or apparent from structure -->

## Layer Diagram

<!--
GUIDANCE: Create ASCII diagram showing architectural layers
- Show dependency direction (outer layers depend on inner)
- Mark boundaries clearly
-->

```
┌─────────────────────────────────────────────────────────────┐
│                      Presentation Layer                      │
│  <!-- e.g., React Components, API Controllers -->           │
├─────────────────────────────────────────────────────────────┤
│                      Application Layer                       │
│  <!-- e.g., Use Cases, Services, Commands/Queries -->       │
├─────────────────────────────────────────────────────────────┤
│                        Domain Layer                          │
│  <!-- e.g., Entities, Value Objects, Domain Services -->    │
├─────────────────────────────────────────────────────────────┤
│                    Infrastructure Layer                      │
│  <!-- e.g., Repositories, External Services, DB -->         │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

<!--
GUIDANCE: Document how data moves through the system
- Request/Response flow
- Event flow (if event-driven)
- State management flow (for frontend)
-->

### Request Flow

```
<!-- ASCII diagram showing request flow -->
Client Request
      │
      ▼
┌─────────────┐
│             │
└─────────────┘
      │
      ▼
<!-- Continue flow -->
```

### State Management

<!-- For frontend: Redux, Zustand, Context, etc. -->
<!-- For backend: Session, Cache, Event sourcing, etc. -->

| Layer | State Type | Technology | Notes |
|-------|------------|------------|-------|
| | | | |

## Key Components

<!--
GUIDANCE: List major system components
- Core business modules
- Shared utilities
- Infrastructure services
-->

### Core Modules

| Component | Location | Responsibility | Dependencies |
|-----------|----------|----------------|--------------|
| | | | |

### Shared Components

| Component | Location | Used By | Purpose |
|-----------|----------|---------|---------|
| | | | |

### Infrastructure Components

| Component | Location | External Service | Purpose |
|-----------|----------|------------------|---------|
| | | | |

## Boundaries

<!--
GUIDANCE: Document system boundaries
- API boundaries
- Module boundaries
- Process boundaries
-->

### Internal Boundaries

| Boundary | Type | Interface | Notes |
|----------|------|-----------|-------|
| <!-- e.g., Domain/Infrastructure --> | <!-- e.g., Repository Interface --> | <!-- Location --> | |

### External Boundaries

| Boundary | Protocol | Authentication | Notes |
|----------|----------|----------------|-------|
| <!-- e.g., REST API --> | <!-- e.g., HTTPS --> | <!-- e.g., JWT --> | |

## Cross-Cutting Concerns

<!--
GUIDANCE: Document how cross-cutting concerns are handled
- Logging
- Authentication/Authorization
- Error handling
- Caching
-->

| Concern | Implementation | Location | Notes |
|---------|----------------|----------|-------|
| Logging | | | |
| Auth | | | |
| Error Handling | | | |
| Caching | | | |
| Validation | | | |

## Architecture Decision Records

<!--
GUIDANCE: Reference any ADRs found in the codebase
- Link to ADR files if they exist
- Summarize key decisions
-->

| ADR | Decision | Status | Date |
|-----|----------|--------|------|
| | | | |

---

## Analysis Metadata

| Field | Value |
|-------|-------|
| Analyzed | <!-- ISO date --> |
| Confidence | <!-- High/Medium/Low - based on how clear the architecture is --> |
| Agent Version | <!-- k-scan-agent version --> |
