# Technology Stack

<!--
GUIDANCE FOR k-scan-agent:
- Analyze package.json, requirements.txt, Cargo.toml, pom.xml, or equivalent dependency files
- Check runtime configuration files for version constraints
- Identify build tool configuration (webpack, vite, gradle, etc.)
- Note any version pinning or range specifications
-->

## Languages

| Language | Version | Purpose |
|----------|---------|---------|
| <!-- e.g., TypeScript --> | <!-- e.g., 5.x --> | <!-- e.g., Primary application code --> |
| <!-- Add rows as needed --> | | |

## Runtime

| Runtime | Version | Notes |
|---------|---------|-------|
| <!-- e.g., Node.js --> | <!-- e.g., 20.x LTS --> | <!-- e.g., Server runtime --> |
| <!-- Add rows as needed --> | | |

## Frameworks

### Primary Framework

<!--
GUIDANCE: Identify the main application framework
- Name and version
- Why it was chosen (if documented)
- Any customizations or extensions
-->

| Framework | Version | Category | Notes |
|-----------|---------|----------|-------|
| <!-- e.g., Next.js --> | <!-- e.g., 14.x --> | <!-- e.g., Full-stack React --> | <!-- Key configuration notes --> |

### Supporting Frameworks

<!-- Secondary frameworks, UI libraries, etc. -->

| Framework | Version | Purpose |
|-----------|---------|---------|
| | | |

## Dependencies

### Production Dependencies

<!--
GUIDANCE: List key production dependencies
- Focus on architecturally significant packages
- Group by category if helpful
- Note any deprecated or outdated packages
-->

| Package | Version | Purpose | Notes |
|---------|---------|---------|-------|
| | | | |

### Development Dependencies

<!-- Build tools, testing frameworks, linters, etc. -->

| Package | Version | Purpose | Notes |
|---------|---------|---------|-------|
| | | | |

## Build Tools

### Build System

<!--
GUIDANCE: Document the build pipeline
- Primary build tool (webpack, vite, turbopack, etc.)
- Build configuration location
- Build modes (dev, prod, test)
-->

| Tool | Version | Configuration | Purpose |
|------|---------|---------------|---------|
| | | | |

### Package Manager

| Manager | Version | Lock File |
|---------|---------|-----------|
| <!-- e.g., pnpm --> | <!-- e.g., 8.x --> | <!-- e.g., pnpm-lock.yaml --> |

### Scripts

<!-- Key build/run scripts from package.json or equivalent -->

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | | |
| `build` | | |
| `test` | | |
| `lint` | | |

## Version Constraints

<!--
GUIDANCE: Note any specific version requirements or constraints
- Node version requirements (engines field)
- Peer dependency requirements
- Known incompatibilities
-->

### Engine Requirements

```
<!-- Copy from package.json engines field or equivalent -->
```

### Compatibility Notes

<!-- Any known version conflicts or requirements -->

---

## Analysis Metadata

| Field | Value |
|-------|-------|
| Analyzed | <!-- ISO date --> |
| Source Files | <!-- List of dependency files analyzed --> |
| Agent Version | <!-- k-scan-agent version --> |
