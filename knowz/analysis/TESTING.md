# Testing Infrastructure

<!--
GUIDANCE FOR k-scan-agent:
- Identify test framework from dependencies and config files
- Analyze test file patterns and locations
- Check for CI configuration (GitHub Actions, etc.)
- Calculate coverage if reports exist
-->

## Test Framework

<!--
GUIDANCE: Document the testing stack
- Unit test framework
- Integration test tools
- E2E framework
- Mocking libraries
-->

### Primary Framework

| Framework | Version | Configuration | Purpose |
|-----------|---------|---------------|---------|
| <!-- e.g., Jest --> | <!-- e.g., 29.x --> | <!-- e.g., jest.config.js --> | <!-- e.g., Unit & Integration --> |

### Supporting Tools

| Tool | Version | Purpose |
|------|---------|---------|
| <!-- e.g., React Testing Library --> | | <!-- Component testing --> |
| <!-- e.g., MSW --> | | <!-- API mocking --> |
| <!-- e.g., Playwright --> | | <!-- E2E testing --> |
| <!-- e.g., Faker --> | | <!-- Test data generation --> |

### Test Runners

| Context | Runner | Command | Notes |
|---------|--------|---------|-------|
| Unit | | `npm test` | |
| Integration | | | |
| E2E | | | |
| Watch mode | | `npm test -- --watch` | |

## Coverage Configuration

<!--
GUIDANCE: Document coverage settings and targets
- Check jest.config.js, nyc config, etc.
- Note any coverage enforcement
-->

### Coverage Targets

| Metric | Target | Current | Enforced |
|--------|--------|---------|----------|
| Statements | <!-- e.g., 80% --> | <!-- e.g., 75% --> | <!-- Yes/No --> |
| Branches | | | |
| Functions | | | |
| Lines | | | |

### Coverage Collection

| Setting | Value |
|---------|-------|
| Collect from | <!-- e.g., src/**/*.{ts,tsx} --> |
| Exclude | <!-- e.g., **/*.d.ts, **/*.test.ts --> |
| Reports | <!-- e.g., lcov, text, html --> |
| Output directory | <!-- e.g., coverage/ --> |

### Coverage Thresholds

```javascript
// <!-- Copy from config if exists -->
coverageThreshold: {
  global: {
    branches: /* value */,
    functions: /* value */,
    lines: /* value */,
    statements: /* value */
  }
}
```

## Test Organization

<!--
GUIDANCE: Document how tests are structured
- Co-located vs separate directory
- Naming conventions
- Helper organization
-->

### Test Location

| Test Type | Location Pattern | Example |
|-----------|------------------|---------|
| Unit tests | <!-- e.g., Co-located --> | `src/utils/format.test.ts` |
| Integration | <!-- e.g., __tests__/ --> | `__tests__/api/users.test.ts` |
| E2E | <!-- e.g., e2e/ --> | `e2e/auth.spec.ts` |
| Fixtures | <!-- e.g., __fixtures__/ --> | |

### File Naming

| Test Type | Pattern | Example |
|-----------|---------|---------|
| Unit | <!-- e.g., *.test.ts --> | `user.test.ts` |
| Integration | <!-- e.g., *.integration.test.ts --> | |
| E2E | <!-- e.g., *.spec.ts --> | `login.spec.ts` |

### Test Utilities

| Utility | Location | Purpose |
|---------|----------|---------|
| Test helpers | | |
| Mock factories | | |
| Custom matchers | | |
| Setup files | | |

## Test Patterns

<!--
GUIDANCE: Document testing patterns used in codebase
- AAA pattern (Arrange, Act, Assert)
- Describe/it structure
- Mock patterns
-->

### Structure Pattern

```typescript
// <!-- Example of test structure used -->
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  });

  describe('methodName', () => {
    it('should do something when condition', () => {
      // Arrange

      // Act

      // Assert
    });
  });
});
```

### Mocking Patterns

| What | How | Example |
|------|-----|---------|
| API calls | <!-- e.g., MSW --> | |
| Modules | <!-- e.g., jest.mock --> | |
| Time | <!-- e.g., jest.useFakeTimers --> | |
| Environment | <!-- e.g., process.env --> | |

### Data Patterns

| Pattern | Tool | Location |
|---------|------|----------|
| Factories | <!-- e.g., Fishery --> | |
| Fixtures | | |
| Builders | | |

## CI/CD Integration

<!--
GUIDANCE: Document how tests run in CI
- Check .github/workflows, .gitlab-ci.yml, etc.
- Note any required checks
-->

### CI Configuration

| CI System | Config File | Pipeline |
|-----------|-------------|----------|
| <!-- e.g., GitHub Actions --> | <!-- e.g., .github/workflows/test.yml --> | |

### Pipeline Stages

| Stage | Tests Run | Required | Notes |
|-------|-----------|----------|-------|
| PR Check | | | |
| Main Branch | | | |
| Deploy | | | |

### Required Checks

| Check | Blocking | Threshold |
|-------|----------|-----------|
| Unit tests pass | | |
| Coverage threshold | | |
| E2E tests pass | | |
| Lint | | |

## Test Commands

<!--
GUIDANCE: Document all test-related npm scripts
-->

| Command | Purpose | Flags |
|---------|---------|-------|
| `npm test` | | |
| `npm run test:watch` | | |
| `npm run test:coverage` | | |
| `npm run test:e2e` | | |
| `npm run test:ci` | | |

## Testing Gaps

<!--
GUIDANCE: Identify areas with insufficient testing
- Check coverage reports
- Note untested modules
-->

### Low Coverage Areas

| Area | Current Coverage | Priority |
|------|------------------|----------|
| | | |

### Missing Test Types

| Type | Status | Impact |
|------|--------|--------|
| Unit tests | | |
| Integration tests | | |
| E2E tests | | |
| Performance tests | | |
| Accessibility tests | | |

---

## Analysis Metadata

| Field | Value |
|-------|-------|
| Analyzed | <!-- ISO date --> |
| Test Files Found | <!-- Count --> |
| Overall Coverage | <!-- Percentage if available --> |
| Agent Version | <!-- k-scan-agent version --> |
