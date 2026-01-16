# Scan Document Type Templates

Use based on `document_type` parameter.

---

## STACK

```markdown
# Stack Analysis: {project_name}

## Languages
| Language | Version | Usage |
|----------|---------|-------|

## Frameworks
| Framework | Version | Purpose |
|-----------|---------|---------|

## Runtime
| Runtime | Version | Notes |
|---------|---------|-------|

## Build Tools
| Tool | Version | Config File |
|------|---------|-------------|

## Package Management
| Manager | Lock File | Package Count |
|---------|-----------|---------------|

## Key Dependencies
| Dependency | Version | Purpose |
|------------|---------|---------|
```

---

## ARCHITECTURE

```markdown
# Architecture Analysis: {project_name}

## Architecture Style
{monolith|microservices|modular|layered|etc}

## Entry Points
| Entry | Type | Purpose |
|-------|------|---------|

## Core Modules
| Module | Responsibility | Dependencies |
|--------|----------------|--------------|

## Data Flow
{description}

## External Boundaries
| Boundary | Type | Protocol |
|----------|------|----------|

## Architecture Diagram
{ASCII diagram or description}
```

---

## STRUCTURE

```markdown
# Structure Analysis: {project_name}

## Directory Layout
{tree structure}

## Key Directories
| Directory | Purpose | File Count |
|-----------|---------|------------|

## File Organization
| Pattern | Example | Purpose |
|---------|---------|---------|

## Naming Conventions
| Type | Convention | Example |
|------|------------|---------|

## Configuration Files
| File | Purpose | Location |
|------|---------|----------|
```

---

## CONVENTIONS

```markdown
# Conventions Analysis: {project_name}

## Code Style
| Aspect | Convention | Enforced By |
|--------|------------|-------------|

## Naming
| Type | Convention | Example |
|------|------------|---------|

## Patterns Used
| Pattern | Usage | Example Location |
|---------|-------|------------------|

## Error Handling
{description}

## Logging
{description}

## Comments/Documentation
{description}
```

---

## TESTING

```markdown
# Testing Analysis: {project_name}

## Test Framework
| Framework | Version | Config |
|-----------|---------|--------|

## Test Structure
| Type | Location | Count |
|------|----------|-------|

## Coverage
| Metric | Value | Tool |
|--------|-------|------|

## Test Patterns
| Pattern | Usage | Example |
|---------|-------|---------|

## CI Integration
{description}

## Test Gaps
| Area | Gap Type | Severity |
|------|----------|----------|
```

---

## INTEGRATIONS

```markdown
# Integrations Analysis: {project_name}

## APIs Consumed
| API | Purpose | Auth Method |
|-----|---------|-------------|

## APIs Exposed
| Endpoint | Method | Purpose |
|----------|--------|---------|

## Databases
| Database | Type | Purpose |
|----------|------|---------|

## Message Queues
| Queue | Type | Purpose |
|-------|------|---------|

## External Services
| Service | Purpose | Config Location |
|---------|---------|-----------------|

## Authentication
{description}
```

---

## CONCERNS

```markdown
# Concerns Analysis: {project_name}

## Technical Debt
| Concern | Severity | Location | Impact |
|---------|----------|----------|--------|

## Security Concerns
| Concern | Risk Level | Recommendation |
|---------|------------|----------------|

## Performance Concerns
| Concern | Impact | Location |
|---------|--------|----------|

## Maintainability Concerns
| Concern | Severity | Recommendation |
|---------|----------|----------------|

## Deprecated Dependencies
| Dependency | Status | Replacement |
|------------|--------|-------------|

## Priority Recommendations
1. {highest priority}
2. {second priority}
3. {third priority}
```
