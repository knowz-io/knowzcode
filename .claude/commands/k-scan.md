---
name: k:scan
description: Perform brownfield codebase analysis generating 7 documents
arguments:
  - name: scope
    description: Analysis scope (full|partial|incremental)
    required: false
    default: full
  - name: focus
    description: Specific area to focus on (e.g., "api", "database", "auth")
    required: false
  - name: output
    description: Output format (markdown|json|both)
    required: false
    default: markdown
---

# /k:scan - Brownfield Codebase Analysis

## Usage

```
/k:scan                            # Full codebase analysis
/k:scan --scope=partial --focus=api  # Analyze only API layer
/k:scan --scope=incremental        # Update existing maps
/k:scan --output=json              # Generate JSON format
```

## What It Does

Performs comprehensive analysis of an existing (brownfield) codebase, generating 7 structured documents that provide deep understanding of the system for future WorkGroups.

## Pre-Mapping Enforcement Gates

**CRITICAL: Before codebase analysis, these gates are checked.**

### Gate 1: Codebase Accessibility Gate
```
Verify current directory contains a codebase:
- Check for package.json, Cargo.toml, go.mod, pom.xml, etc.
- Check for src/, lib/, or similar directories
- Verify at least one recognized language detected

IF no codebase detected:
  → BLOCK with error: "No recognizable codebase found"
```

### Gate 2: Existing Maps Gate (for incremental)
```
IF --scope=incremental:
  Verify knowz/maps/ directory exists
  Verify at least one document exists
  IF no existing maps: BLOCK - Run full analysis first
```

### Gate 3: Context Budget Gate
```
Estimate codebase size (file count, total lines)
IF estimated analysis exceeds context budget:
  → WARN: "Large codebase detected. Analysis may take several minutes."
  → Suggest: "--scope=partial --focus={area}" for faster results
  → Continue (advisory only)
```

**Codebase Gate Block Message:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  CODEBASE GATE BLOCKED                               │
│                                                         │
│ No recognizable codebase found in current directory.    │
│                                                         │
│ Expected: package.json, Cargo.toml, go.mod, or similar  │
│ Found: (none)                                           │
│                                                         │
│ Ensure you're in a project root directory.              │
│                                                         │
│ To proceed anyway, say: "proceed with analysis"         │
└─────────────────────────────────────────────────────────┘
```

### Bypass Logging
All bypasses logged to `knowz/logs/enforcement.log`:
```json
{
  "timestamp": "2026-01-15T...",
  "gate": "codebase_accessibility",
  "command": "/k:scan",
  "bypass_type": "user_override"
}
```

### The 7 Documents

1. **Architecture Overview** (`architecture.md`)
2. **Module Inventory** (`modules.md`)
3. **Dependency Graph** (`dependencies.md`)
4. **API Surface** (`api.md`)
5. **Data Models** (`data-models.md`)
6. **Configuration Map** (`configuration.md`)
7. **Testing Landscape** (`testing.md`)

### Step-by-Step Process

1. **Initialize Analysis**
   - Create `knowz/maps/` directory if needed
   - Check for existing maps (for incremental update)
   - Detect project type and framework

2. **Project Detection**
   - Identify language(s) and frameworks
   - Detect build system and tools
   - Find entry points
   - Catalog package dependencies

3. **Generate Each Document**

   #### Document 1: Architecture Overview
   - System architecture pattern (MVC, microservices, etc.)
   - High-level component diagram
   - Request/response flow
   - Key architectural decisions

   #### Document 2: Module Inventory
   - All modules/packages/namespaces
   - Purpose of each module
   - Public interfaces
   - Internal dependencies

   #### Document 3: Dependency Graph
   - External dependencies with versions
   - Internal module dependencies
   - Circular dependency detection
   - Dependency tree visualization

   #### Document 4: API Surface
   - All endpoints (REST, GraphQL, etc.)
   - Request/response schemas
   - Authentication requirements
   - Rate limiting and quotas

   #### Document 5: Data Models
   - Database schemas
   - ORM models
   - Data relationships
   - Migration history

   #### Document 6: Configuration Map
   - Environment variables
   - Configuration files
   - Feature flags
   - Secrets management

   #### Document 7: Testing Landscape
   - Test frameworks used
   - Test coverage map
   - Test categories (unit, integration, e2e)
   - CI/CD integration

4. **Cross-Reference**
   - Link documents to each other
   - Create index file
   - Generate quick-reference summary

5. **Validate and Store**
   - Write to `knowz/maps/`
   - Generate checksums for change detection
   - Update `knowz/state.json`

## Agents Delegated

| Agent | Document | Purpose |
|-------|----------|---------|
| `k-architecture-analyzer` | architecture.md | System design analysis |
| `k-module-scanner` | modules.md | Module inventory |
| `k-dependency-mapper` | dependencies.md | Dependency analysis |
| `k-api-documenter` | api.md | API surface discovery |
| `k-schema-analyzer` | data-models.md | Data model extraction |
| `k-config-scanner` | configuration.md | Configuration mapping |
| `k-test-analyzer` | testing.md | Test landscape analysis |

## Expected Outcomes

```
knowz/maps/
├── index.md                 # Quick reference and links
├── architecture.md          # Document 1
├── modules.md               # Document 2
├── dependencies.md          # Document 3
├── api.md                   # Document 4
├── data-models.md           # Document 5
├── configuration.md         # Document 6
├── testing.md               # Document 7
├── diagrams/                # Generated diagrams
│   ├── architecture.mmd
│   ├── dependencies.mmd
│   └── data-flow.mmd
└── metadata.json            # Analysis metadata
```

## Document Structures

### 1. Architecture Overview
```markdown
# Architecture Overview

## System Type
Monolithic Node.js application with Express framework

## Architecture Pattern
Model-View-Controller (MVC) with Service Layer

## Component Diagram
[Mermaid diagram]

## Request Flow
1. Request → Router
2. Router → Controller
3. Controller → Service
4. Service → Repository
5. Repository → Database

## Key Decisions
- ADR-001: Chose PostgreSQL for ACID compliance
- ADR-002: JWT for stateless authentication

## Technology Stack
| Layer | Technology |
|-------|------------|
| Runtime | Node.js 18 |
| Framework | Express 4.x |
| Database | PostgreSQL 14 |
| Cache | Redis 7 |
```

### 2. Module Inventory
```markdown
# Module Inventory

## Core Modules

### src/controllers/
Purpose: HTTP request handlers
Exports: UserController, AuthController, ProductController
Dependencies: services/, middleware/

### src/services/
Purpose: Business logic layer
Exports: UserService, AuthService, ProductService
Dependencies: repositories/, utils/

[continues for all modules]
```

### 3. Dependency Graph
```markdown
# Dependency Graph

## External Dependencies

| Package | Version | Purpose | Risk |
|---------|---------|---------|------|
| express | 4.18.2 | Web framework | Low |
| pg | 8.11.0 | PostgreSQL client | Low |
| jsonwebtoken | 9.0.0 | JWT handling | Medium |

## Internal Dependencies
[Mermaid graph]

## Circular Dependencies
None detected ✓

## Outdated Dependencies
- lodash: 4.17.20 → 4.17.21 (patch)
```

### 4. API Surface
```markdown
# API Surface

## Endpoints

### Authentication
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /auth/login | None | User login |
| POST | /auth/register | None | User registration |
| POST | /auth/logout | JWT | User logout |

### Users
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /users/:id | JWT | Get user by ID |
| PUT | /users/:id | JWT+Owner | Update user |

[continues for all endpoints]
```

### 5. Data Models
```markdown
# Data Models

## Database Schema

### users
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |

### Relationships
[ER diagram in Mermaid]

## ORM Models
- User (src/models/User.ts)
- Product (src/models/Product.ts)
```

### 6. Configuration Map
```markdown
# Configuration Map

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| DATABASE_URL | Yes | - | PostgreSQL connection |
| JWT_SECRET | Yes | - | Token signing key |
| PORT | No | 3000 | Server port |

## Configuration Files
- config/default.json
- config/production.json
- .env.example

## Secrets
Managed via: Environment variables
Production: AWS Secrets Manager
```

### 7. Testing Landscape
```markdown
# Testing Landscape

## Frameworks
- Jest (unit tests)
- Supertest (API tests)
- Cypress (e2e tests)

## Coverage
| Module | Statements | Branches | Functions |
|--------|------------|----------|-----------|
| controllers | 85% | 78% | 90% |
| services | 92% | 88% | 95% |
| utils | 100% | 100% | 100% |

## Test Locations
- tests/unit/
- tests/integration/
- tests/e2e/
```

## Scope Options

### Full (Default)
Complete codebase analysis. Best for initial setup.

### Partial
Analyze specific area only. Use with `--focus`.
```
/k:scan --scope=partial --focus=authentication
```

### Incremental
Update existing maps with changes since last analysis.
```
/k:scan --scope=incremental
```

## Notes

- Full analysis may take several minutes on large codebases
- Maps are used by `/k:work` for context gathering
- Run incrementally after major changes
- JSON output useful for tooling integration
