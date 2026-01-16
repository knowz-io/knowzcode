# Checkpoints

This document defines the checkpoints that govern specification approval, audit completion, context budget monitoring, and return contract validation in Knowz v3.

## Overview

Checkpoints are checkpoints that ensure work meets minimum standards before proceeding. Failing a checkpoint blocks progression until the issue is resolved.

```
[Draft] → [Quality Check] → [Approved] → [Execution] → [Audit] → [Complete]
              ↓ Fail
           [Revise]
```

## 1. Specification Checkpoints

### Quality Score Thresholds

| Score Range | Status | Action |
|-------------|--------|--------|
| 90-100% | Excellent | Proceed immediately |
| 80-89% | Good | Proceed, minor improvements optional |
| 70-79% | Acceptable | Proceed with noted improvements |
| 60-69% | Marginal | Review required before proceeding |
| 50-59% | Poor | Revision required |
| <50% | Unacceptable | Major rewrite required |

### Minimum Threshold

**Requirement**: Spec quality score must be ≥70% to proceed with execution.

### Scoring Components

| Component | Weight | Criteria |
|-----------|--------|----------|
| Completeness | 25% | All required sections present |
| Clarity | 25% | Unambiguous language, clear requirements |
| Testability | 20% | Acceptance criteria are verifiable |
| Scope | 15% | Well-defined boundaries |
| Dependencies | 15% | External dependencies identified |

### Scoring Rubric

#### Completeness (25 points)

```
25 pts: All sections complete with detailed content
20 pts: All sections present, minor gaps
15 pts: Most sections present, some incomplete
10 pts: Several sections missing
5 pts:  Only basic outline present
0 pts:  Incomplete or empty
```

#### Clarity (25 points)

```
25 pts: Crystal clear, no ambiguity
20 pts: Clear, minor clarifications helpful
15 pts: Generally clear, some ambiguous areas
10 pts: Multiple unclear requirements
5 pts:  Mostly ambiguous
0 pts:  Incomprehensible
```

#### Testability (20 points)

```
20 pts: All criteria measurable and verifiable
16 pts: Most criteria testable
12 pts: Some criteria testable
8 pts:  Few criteria testable
4 pts:  Criteria mostly untestable
0 pts:  No testable criteria
```

#### Scope (15 points)

```
15 pts: Boundaries perfectly defined
12 pts: Boundaries clear with minor gaps
9 pts:  Boundaries mostly defined
6 pts:  Scope unclear in areas
3 pts:  Scope poorly defined
0 pts:  No scope definition
```

#### Dependencies (15 points)

```
15 pts: All dependencies identified and documented
12 pts: Most dependencies identified
9 pts:  Some dependencies identified
6 pts:  Few dependencies identified
3 pts:  Dependencies mostly missing
0 pts:  No dependency analysis
```

### Validation Rules

```yaml
spec_quality:
  minimum_score: 70
  blocking: true
  components:
    - name: completeness
      weight: 25
      required_sections:
        - overview
        - requirements
        - acceptance_criteria
        - scope
    - name: clarity
      weight: 25
      checks:
        - no_ambiguous_terms
        - measurable_requirements
    - name: testability
      weight: 20
      checks:
        - verifiable_criteria
        - defined_test_cases
    - name: scope
      weight: 15
      checks:
        - boundaries_defined
        - exclusions_listed
    - name: dependencies
      weight: 15
      checks:
        - external_deps_listed
        - internal_deps_mapped
```

## 2. Audit Completion Thresholds

### Completion Requirements

| Threshold | Status | Action |
|-----------|--------|--------|
| 100% | Complete | Close audit |
| 95-99% | Near complete | Document gaps, may close |
| 90-94% | Acceptable | Document gaps, review required |
| 80-89% | Incomplete | Must address gaps |
| <80% | Failed | Audit cannot close |

### Minimum Threshold

**Requirement**: Audit completion must be ≥90% to close successfully.

### Audit Components

| Component | Required | Criteria |
|-----------|----------|----------|
| Task completion | Yes | All spec tasks addressed |
| Artifact verification | Yes | All outputs exist and valid |
| Test coverage | Yes | Acceptance criteria tested |
| Documentation | Recommended | Changes documented |
| Review sign-off | Recommended | Peer review completed |

### Audit Checklist Template

```markdown
## Audit: [Spec Name]

### Task Completion
- [ ] All requirements implemented
- [ ] All acceptance criteria met
- [ ] No blocking issues remain

### Artifact Verification
- [ ] All specified files created
- [ ] All modifications complete
- [ ] Artifacts accessible

### Test Coverage
- [ ] Unit tests written/updated
- [ ] Integration tests pass
- [ ] Acceptance tests pass

### Documentation
- [ ] Code comments added
- [ ] API documentation updated
- [ ] README updated if needed

### Completion Score
Tasks: __/__ (___%)
Artifacts: __/__ (___%)
Tests: __/__ (___%)
Docs: __/__ (___%)

Total: ____%
```

## 3. Context Budget Monitoring Rules

### Budget Allocation

| Agent Type | Default Budget | Hard Limit |
|------------|----------------|------------|
| Main Agent | 80,000 tokens | 95% of max |
| Sub-Agent | 20,000 tokens | 95% of allocation |
| Aggregate | 150,000 tokens | 95% of aggregate |

### Monitoring Thresholds

| Usage Level | Status | Action |
|-------------|--------|--------|
| 0-60% | Normal | Continue operation |
| 60-70% | Caution | Monitor closely |
| 70-85% | Warning | Consider delegation |
| 85-95% | Critical | Must delegate or complete |
| >95% | Exceeded | Operation blocked |

### Budget Rules

```yaml
context_budget:
  main_agent:
    allocation: 80000
    warning_threshold: 0.70
    critical_threshold: 0.85
    hard_limit: 0.95

  sub_agent:
    allocation: 20000
    warning_threshold: 0.70
    critical_threshold: 0.85
    hard_limit: 0.95

  actions:
    at_warning:
      - log_warning
      - suggest_delegation
    at_critical:
      - force_summarization
      - require_delegation
    at_hard_limit:
      - block_operation
      - force_return
```

### Budget Monitoring Behavior

#### At Warning (70%)

```
Knowz: Context budget at 70% (56,000/80,000 tokens)
Action: Consider delegating remaining work to sub-agents
Suggestion: /k:agent spawn worker --task remaining-work
```

#### At Critical (85%)

```
Knowz: CRITICAL - Context budget at 85% (68,000/80,000 tokens)
Action: Delegation required for new complex tasks
Enforcing: Automatic summarization of conversation history
```

#### At Hard Limit (95%)

```
Knowz: BLOCKED - Context budget exceeded (76,000/80,000 tokens)
Action: Cannot accept new input until context freed
Required: Complete current task and return, or reset context
```

### Delegation Triggers

| Condition | Required Action |
|-----------|-----------------|
| Task >10,000 tokens estimated | Delegate to sub-agent |
| Main agent >70% | Prefer delegation |
| Main agent >85% | Require delegation |
| Complex multi-file task | Recommend cycle execution |

## 4. Return Contract Validation Rules

### Contract Requirements

Every delegated task must have a return contract that specifies:

1. **Required fields** - What must be returned
2. **Field types** - Expected data types
3. **Validation rules** - Constraints on values
4. **Success criteria** - What constitutes success

### Validation Rules

```yaml
return_contract:
  validation: strict  # strict | lenient
  required_fields:
    - status
    - summary
    - artifacts
  optional_fields:
    - metrics
    - warnings
    - recommendations

  field_rules:
    status:
      type: enum
      values: [success, partial, failed]
      required: true

    summary:
      type: string
      min_length: 10
      max_length: 500
      required: true

    artifacts:
      type: array
      item_type: string
      min_items: 0
      required: true

    metrics:
      type: object
      required: false
      properties:
        tokens_used:
          type: integer
          min: 0
        files_modified:
          type: integer
          min: 0
        duration_ms:
          type: integer
          min: 0
```

### Validation Process

```
1. Agent completes task
2. Agent prepares return object
3. Knowz validates against contract
   - All required fields present?
   - All types correct?
   - All constraints satisfied?
4. If valid → Accept return
5. If invalid → Reject, request correction
```

### Contract Validation Examples

#### Valid Return

```json
{
  "status": "success",
  "summary": "Implemented user authentication with JWT tokens",
  "artifacts": [
    "src/auth/jwt.ts",
    "src/auth/middleware.ts",
    "tests/auth/jwt.test.ts"
  ],
  "metrics": {
    "tokens_used": 15000,
    "files_modified": 3,
    "duration_ms": 45000
  }
}
```

**Validation**: PASS

#### Invalid Return - Missing Required Field

```json
{
  "status": "success",
  "artifacts": ["src/auth/jwt.ts"]
}
```

**Validation**: FAIL - Missing required field: summary

#### Invalid Return - Wrong Type

```json
{
  "status": "done",
  "summary": "Task completed",
  "artifacts": "src/file.ts"
}
```

**Validation**: FAIL
- status: "done" not in allowed values [success, partial, failed]
- artifacts: Expected array, got string

### Enforcement Levels

| Level | Behavior | Use Case |
|-------|----------|----------|
| Strict | Reject any invalid return | Production |
| Lenient | Warn but accept | Development |
| Disabled | No validation | Testing only |

### Contract Validation Configuration

```json
{
  "contracts": {
    "enforcement": "strict",
    "on_invalid": "reject",
    "max_retries": 2,
    "fallback": "escalate_to_main"
  }
}
```

## 5. Test Checkpoint

### Test Pass Requirements

| Status | Condition | Action |
|--------|-----------|--------|
| Pass | All tests passing | Proceed to finalization |
| Warn | Tests passing, coverage low | Warn but allow proceed |
| Block | Tests failing | Block finalization |

### Minimum Thresholds

**Requirement**: All tests must pass before finalization (100% pass rate).

### Coverage Thresholds

| Coverage Type | Minimum | Recommended | Blocking |
|---------------|---------|-------------|----------|
| Line | 70% | 85% | Warn only |
| Branch | 60% | 75% | Warn only |
| Function | 80% | 90% | Warn only |

### Test Checkpoint Rules

```yaml
tests:
  require_passing: true          # All tests must pass
  blocking: true                 # Block ship if tests fail
  bypass_allowed: true           # Can override with explicit confirmation
  coverage:
    enforce: true                # Check coverage thresholds
    blocking: false              # Coverage is warn-only, not blocking
    thresholds:
      line: 70
      branch: 60
      function: 80
```

### Test Checkpoint Flow

```
1. Run full test suite
2. Check test results:
   - IF any test failing → BLOCK
   - IF all tests pass → Continue
3. Check coverage:
   - IF coverage < threshold → WARN
   - IF coverage >= threshold → PASS
4. Return checkpoint result
```

### Test Checkpoint Block Message

```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  TEST CHECKPOINT BLOCKED                             │
│                                                         │
│ Test Results: 47/50 passing (3 failing)                 │
│ Required: 100% passing                                  │
│                                                         │
│ Failing Tests:                                          │
│ • auth.test.ts:45 - should reject invalid token         │
│ • user.test.ts:78 - should update profile               │
│ • api.test.ts:123 - should paginate results             │
│                                                         │
│ Recommended: Fix failing tests before finalization      │
│                                                         │
│ To proceed anyway, say: "finalize with failing tests"   │
└─────────────────────────────────────────────────────────┘
```

### Coverage Warning Message

```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  COVERAGE BELOW THRESHOLD                            │
│                                                         │
│ Line Coverage: 65% (threshold: 70%)                     │
│ Branch Coverage: 58% (threshold: 60%)                   │
│ Function Coverage: 82% (threshold: 80%)                 │
│                                                         │
│ Uncovered Files:                                        │
│ • src/utils/helpers.ts (23% coverage)                   │
│ • src/services/cache.ts (45% coverage)                  │
│                                                         │
│ Recommended: Add tests to improve coverage              │
│                                                         │
│ Proceeding with finalization...                         │
└─────────────────────────────────────────────────────────┘
```

### TDD Enforcement

The `k-impl-agent` enforces TDD during implementation:

```
FOR each requirement:
  1. RED: Write failing test
  2. GREEN: Implement minimum code
  3. REFACTOR: Clean up
```

Tests written during TDD are tracked in the agent return:

```json
{
  "tests": {
    "written": 6,
    "passing": 6,
    "failing": 0,
    "skipped": 0
  }
}
```

## Checkpoint Summary

| Gate | Minimum | Blocking | Enforcement |
|------|---------|----------|-------------|
| Spec Quality | 70% | Yes | Before execution |
| Audit Completion | 90% | Yes | Before close |
| Context Budget | <95% | Yes | Continuous |
| Return Contract | 100% valid | Yes | On return |
| Test Pass | 100% | Yes | Before finalization |
| Test Coverage | 70%/60%/80% | Warn only | Before finalization |

## Bypassing Checkpoints

Checkpoints can only be bypassed with explicit override:

```
/k:execute spec-name --bypass-checkpoint --reason "Emergency fix"
```

Bypasses are:
- Logged with timestamp and reason
- Flagged for review
- Limited to authorized users
- Not recommended for production

---

*Checkpoints ensure consistent standards across all Knowz v3 operations*
