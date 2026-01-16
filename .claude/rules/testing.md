# Testing Rules

This document defines testing requirements, TDD enforcement, and verification standards for Knowz v3.

## TDD Enforcement

### Mandatory TDD Workflow

All implementation via `k-impl-agent` MUST follow TDD:

```
┌─────────────────────────────────────────────────────────────┐
│  RED → GREEN → REFACTOR (Mandatory Cycle)                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. RED: Write failing test first                           │
│     ├── Test must fail initially (proves validity)          │
│     ├── Test must exercise the requirement                  │
│     └── If test passes without code → test is wrong         │
│                                                             │
│  2. GREEN: Minimum implementation to pass                   │
│     ├── No premature optimization                           │
│     ├── No extra features beyond spec                       │
│     └── Run test → MUST pass                                │
│                                                             │
│  3. REFACTOR: Clean up while maintaining tests              │
│     ├── Improve code quality only                           │
│     ├── All tests must still pass                           │
│     └── No functional changes                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Test Requirements by Phase

| Phase | Testing Requirement |
|-------|---------------------|
| `k-spec` | Define testing strategy section (mandatory) |
| `k-plan` | Map test coverage to task nodes |
| `k-execute` | Run affected tests after each cycle |
| `k-audit` | Verify test coverage meets criteria |
| `k-finalize` | Full test suite must pass |

## Test Coverage Requirements

### Minimum Thresholds

| Coverage Type | Minimum | Recommended |
|---------------|---------|-------------|
| Line coverage | 70% | 85% |
| Branch coverage | 60% | 75% |
| Function coverage | 80% | 90% |

### Coverage Enforcement

```yaml
test_coverage:
  blocking: true
  thresholds:
    line: 70
    branch: 60
    function: 80
  enforcement_point: "k-audit"
```

## Test Types Required

### Unit Tests

- Required for all new functions/methods
- Mock external dependencies
- Test edge cases and error paths
- Follow AAA pattern: Arrange, Act, Assert

### Integration Tests

- Required for API endpoints
- Required for database operations
- Required for external service integrations
- Test real interactions (no mocks)

### E2E Tests (via Playwright MCP)

When configured via `k-mcp-setup playwright`:

```
Usage: k-mcp "test description" playwright

Examples:
  k-mcp "Navigate to /login and verify form renders" playwright
  k-mcp "Submit login form and verify redirect to dashboard" playwright
  k-mcp "Take screenshot of error state" playwright
```

## Test Verification Checkpoints

### Pre-Execution Verification

Before `k-execute` runs, verify:
- [ ] Testing strategy defined in spec
- [ ] Test files exist for modified components
- [ ] Test framework is configured

### Cycle Verification

After each `k-execute` cycle:
- [ ] Run affected tests
- [ ] All tests pass (or failures documented)
- [ ] No regressions in existing tests

### Pre-Finalization Verification

Before `k-finalize` commits:
- [ ] Full test suite passes
- [ ] Coverage meets thresholds
- [ ] No skipped tests without justification
- [ ] Acceptance criteria verified by tests

## Test File Conventions

### Naming

| Project Type | Convention |
|--------------|------------|
| TypeScript/JS | `*.test.ts`, `*.spec.ts` |
| Python | `test_*.py`, `*_test.py` |
| Go | `*_test.go` |
| Rust | `#[cfg(test)]` modules |

### Location

| Pattern | Description |
|---------|-------------|
| Co-located | `src/auth/login.ts` → `src/auth/login.test.ts` |
| Separate | `src/auth/login.ts` → `tests/auth/login.test.ts` |

Follow existing project conventions.

## Test Execution Commands

### Framework Detection

The test-runner skill auto-detects:

| Framework | Detection | Command |
|-----------|-----------|---------|
| Jest | `jest.config.*` | `npm test` or `jest` |
| Vitest | `vitest.config.*` | `npm test` or `vitest` |
| Pytest | `pytest.ini`, `pyproject.toml` | `pytest` |
| Go Test | `*_test.go` | `go test ./...` |
| Cargo Test | `Cargo.toml` | `cargo test` |

### Manual Override

Specify custom test command in spec:

```markdown
## Testing Strategy

- Framework: Custom
- Command: `npm run test:custom`
- Coverage: `npm run coverage`
```

## Acceptance Criteria Testing

### Criteria → Test Mapping

Each acceptance criterion in spec MUST have corresponding test:

```markdown
## Acceptance Criteria

1. User can log in with valid credentials
   → Test: `login.test.ts:should authenticate valid user`

2. Invalid password shows error message
   → Test: `login.test.ts:should reject invalid password`

3. Session expires after 30 minutes
   → Test: `session.test.ts:should expire after timeout`
```

### Audit Verification

`k-audit` checks:
- All criteria have test mappings
- All mapped tests exist
- All mapped tests pass

## Browser Testing (Playwright MCP)

### Setup

```bash
k-mcp-setup playwright
# Runs: claude mcp add playwright npx @anthropic/mcp-server-playwright
```

### Capabilities

| Tool | Description |
|------|-------------|
| `browser_navigate` | Navigate to URL |
| `browser_screenshot` | Capture page screenshot |
| `browser_click` | Click element by selector |
| `browser_fill` | Fill input field |
| `browser_evaluate` | Execute JavaScript |

### E2E Test Example

```
k-mcp "Navigate to https://app.example.com/login, fill email with 'test@example.com', fill password with 'password123', click submit button, verify redirect to /dashboard" playwright
```

## Test Failure Handling

### In k-execute

```
IF tests fail during cycle:
  1. Document failure in cycle log
  2. Attempt fix within TDD loop
  3. If unresolvable → return "failure" status
  4. Orchestrator decides: retry or escalate
```

### In k-audit

```
IF tests fail during audit:
  1. Record in audit findings
  2. Classify severity:
     - Critical: Core functionality broken
     - Major: Feature incomplete
     - Minor: Edge case unhandled
  3. Block finalization if Critical/Major
```

### In k-finalize

```
IF tests fail during finalization:
  → BLOCK commit
  → Display: "Cannot finalize. X tests failing."
  → Require: "finalize with failing tests" to override
  → Log bypass if overridden
```

## Test Metrics Tracking

### Per-WorkGroup Metrics

Tracked in `knowz/workgroups/{wgid}_state.json`:

```json
{
  "tests": {
    "total": 45,
    "passing": 43,
    "failing": 2,
    "skipped": 0,
    "coverage": {
      "line": 87.5,
      "branch": 72.3,
      "function": 91.2
    }
  }
}
```

### Historical Metrics

Logged in `knowz/logs/test-metrics.json`:

```json
{
  "workgroup": "wg-xxx",
  "timestamp": "2026-01-15T...",
  "tests_added": 12,
  "coverage_delta": "+5.2%",
  "regressions": 0
}
```

---

*Testing is mandatory. TDD is enforced. Coverage is tracked.*
