---
name: k:plan
description: Create execution plan with parallelizable task cycles
arguments:
  - name: max-tasks
    description: Maximum tasks per cycle (default 3)
    required: false
    default: 3
  - name: strategy
    description: Planning strategy (conservative|balanced|aggressive)
    required: false
    default: balanced
---

# /k:plan - Execution Planning

## Usage

```
/k:plan                           # Create plan with defaults
/k:plan --max-tasks=2             # Limit to 2 parallel tasks
/k:plan --strategy=conservative   # More sequential, safer
/k:plan --strategy=aggressive     # More parallel, faster
```

## What It Does

Transforms the approved specification into an executable plan organized into cycles of parallel tasks. Each cycle contains up to 3 tasks (configurable) that can run simultaneously without conflicts.

## Pre-Planning Enforcement Gates

**CRITICAL: Before any planning, these gates are checked.**

### Gate 1: WorkGroup Gate
```
IF enforcement-policy.yaml → workgroups.require_active == true:
  Verify active WorkGroup exists
  IF no WorkGroup: BLOCK
```

### Gate 2: Phase Sequence Gate
```
IF enforcement-policy.yaml → phases.enforce_sequence == true:
  Verify current_phase == "design"
  IF phase incorrect: BLOCK - Complete design phase first
```

### Gate 3: Spec Checkpoint
```
IF enforcement-policy.yaml → checkpoints.spec.blocking == true:
  Read spec quality scores from WorkGroup state
  IF average score < policy.checkpoints.spec.min_score (default: 70%):
    → Display warning with scores
    → STOP execution
    → Wait for user override
```

**Spec Checkpoint Block Message:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  SPEC CHECKPOINT BLOCKED                           │
│                                                         │
│ Specification quality below threshold:                  │
│                                                         │
│ Current score: 58%                                      │
│ Required: 70%                                           │
│                                                         │
│ Recommended: Run /k:spec refine to improve quality      │
│                                                         │
│ To proceed anyway, say: "proceed with low quality spec" │
└─────────────────────────────────────────────────────────┘
```

### Bypass Logging
All bypasses logged to `knowz/logs/enforcement.log`:
```json
{
  "timestamp": "2026-01-15T...",
  "gate": "spec_quality",
  "threshold": 70,
  "actual": 58,
  "bypass_type": "user_override",
  "workgroup": "wg-xxx"
}
```

### Step-by-Step Process

1. **Load Approved Specification**
   - Read `knowz/specs/approved/<wg-id>-spec.md`
   - Parse technical design and requirements
   - Load task draft from `knowz/workgroups/<wg-id>/tasks-draft.json`

2. **Analyze Task Dependencies**
   - Build dependency graph between tasks
   - Identify shared resources (files, modules, APIs)
   - Detect potential conflicts
   - Calculate critical path

3. **Optimize Task Grouping**
   - Group independent tasks into cycles
   - Ensure no cycle exceeds `max-tasks` limit
   - Minimize total cycle count
   - Balance workload across cycles

4. **Generate Cycle Structure**
   ```
   Cycle 1: [Task A, Task B, Task C]  # Independent foundation tasks
   Cycle 2: [Task D, Task E]          # Depend on Cycle 1
   Cycle 3: [Task F]                  # Depends on Cycle 2
   ```

5. **Create Plan Document**
   - Write to `knowz/plans/<wg-id>-plan.md`
   - Include detailed task specifications
   - Document dependencies and risks
   - Add verification steps per cycle

6. **Generate Task Files**
   - Create individual task files for subagent execution
   - Store in `knowz/workgroups/<wg-id>/tasks/`
   - Each task file contains:
     - Clear objective
     - Files to modify
     - Acceptance criteria
     - Context from specification

7. **Update WorkGroup State**
   - Set phase to "execute"
   - Record cycle count
   - Initialize cycle tracking

## Agents Delegated

| Agent | Purpose |
|-------|---------|
| `k-dependency-analyzer` | Maps task dependencies and conflicts |
| `k-cycle-optimizer` | Groups tasks into optimal cycles |
| `k-task-specifier` | Creates detailed task specifications |

## Expected Outcomes

- `knowz/plans/<wg-id>-plan.md` with complete execution plan
- `knowz/workgroups/<wg-id>/tasks/` directory with task files
- Dependency graph documented
- Cycle execution order established

## Plan Structure

```markdown
# Execution Plan: <Goal Summary>

## Summary
- Total Tasks: 7
- Total Cycles: 3
- Estimated Duration: Medium
- Strategy: Balanced

## Dependency Graph
```
Task A ─┬─→ Task D ─┬─→ Task F
Task B ─┤           │
Task C ─┴─→ Task E ─┘
```

## Cycle Breakdown

### Cycle 1 (Foundation)
| Task | Description | Files | Est. Complexity |
|------|-------------|-------|-----------------|
| A | Create auth controller | src/auth/* | Medium |
| B | Add OAuth config | config/oauth.ts | Low |
| C | Update user model | src/models/user.ts | Low |

**Cycle 1 Verification:**
- [ ] Auth controller compiles
- [ ] Config loads without errors
- [ ] User model tests pass

### Cycle 2 (Integration)
| Task | Description | Files | Est. Complexity |
|------|-------------|-------|-----------------|
| D | Implement OAuth flow | src/auth/oauth.ts | High |
| E | Session management | src/auth/session.ts | Medium |

**Depends on:** Cycle 1
**Cycle 2 Verification:**
- [ ] OAuth flow initiates correctly
- [ ] Sessions created and validated

### Cycle 3 (Completion)
| Task | Description | Files | Est. Complexity |
|------|-------------|-------|-----------------|
| F | Integration tests | tests/auth.test.ts | Medium |

**Depends on:** Cycle 2
**Cycle 3 Verification:**
- [ ] All integration tests pass
- [ ] No regressions in existing tests
```

## Planning Strategies

### Conservative
- Maximum 2 tasks per cycle
- Adds buffer cycles for verification
- Preferred for complex or risky changes

### Balanced (Default)
- Up to 3 tasks per cycle
- Standard verification checkpoints
- Good for most use cases

### Aggressive
- Up to 5 tasks per cycle
- Minimal verification between cycles
- For simple, well-understood changes

## Conflict Detection

The planner automatically detects and resolves:

| Conflict Type | Resolution |
|---------------|------------|
| Same file modification | Sequential cycles |
| Shared module dependency | Same cycle or sequential |
| API contract changes | Consumer tasks after provider |
| Database migrations | Always first cycle |

## Notes

- Maximum of 3 tasks per cycle is a hard limit for quality
- Dependencies are strictly enforced during execution
- Plan can be reviewed and adjusted before execution
- Use `/k:execute --cycle=1` to run specific cycles
