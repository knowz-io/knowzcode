---
name: k:execute
description: Execute planned tasks using parallel subagent cycles
arguments:
  - name: cycle
    description: Specific cycle number to execute (runs all if omitted)
    required: false
  - name: task
    description: Specific task ID to execute individually
    required: false
  - name: dry-run
    description: Show what would be executed without making changes
    required: false
    default: false
---

# /k:execute - Cycle Execution

## Usage

```
/k:execute                    # Execute all cycles sequentially
/k:execute --cycle=1           # Execute only cycle 1
/k:execute --cycle=2           # Execute cycle 2 (requires cycle 1 complete)
/k:execute --task=A           # Execute single task
/k:execute --dry-run          # Preview execution without changes
```

## What It Does

Executes the planned tasks in cycles, running up to 3 parallel subagents per cycle. Each subagent implements a specific task from the plan, and cycles execute sequentially with verification between them.

## Pre-Execution Enforcement Gates

**CRITICAL: Before any execution, these gates are checked.**

### Gate 1: WorkGroup Gate
```
IF enforcement-policy.yaml → workgroups.require_active == true:
  Verify active WorkGroup exists
  IF no WorkGroup: BLOCK
```

### Gate 2: Phase Sequence Gate
```
IF enforcement-policy.yaml → phases.enforce_sequence == true:
  Verify current_phase == "design" or "plan"
  IF phase incorrect: BLOCK - Complete required phases first
```

### Gate 3: Spec Checkpoint
```
IF enforcement-policy.yaml → checkpoints.spec.blocking == true:
  Read spec quality scores from WorkGroup state
  IF any spec score < policy.checkpoints.spec.min_score (default: 70%):
    → Display warning with scores
    → STOP execution
    → Wait for user override
```

**Spec Quality Block Message:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  SPEC CHECKPOINT BLOCKED                           │
│                                                         │
│ Specifications below quality threshold:                 │
│                                                         │
│ • auth-login.md: 58%  (required: 70%)                   │
│ • user-model.md: 65%  (required: 70%)                   │
│                                                         │
│ Recommended: Run /k:spec refine to improve quality      │
│                                                         │
│ To proceed anyway, say: "proceed with low quality spec" │
└─────────────────────────────────────────────────────────┘
```

### Pre-Authorization Check
```
IF gate fails:
  Check enforcement-policy.yaml → pre_authorized_bypasses
  IF matching bypass found: Log and proceed
  ELSE: Display warning and STOP
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
  "user_response": "proceed with low quality spec",
  "workgroup": "wg-xxx"
}
```

### Step-by-Step Process

1. **Load Execution Plan**
   - Read `knowz/plans/<wg-id>-plan.md`
   - Load task files from `knowz/workgroups/<wg-id>/tasks/`
   - Check WorkGroup state for completed cycles

2. **Validate Prerequisites**
   - Verify all previous cycles completed (if running specific cycle)
   - Check for uncommitted changes in working directory
   - Ensure no conflicting processes running

3. **For Each Cycle:**

   a. **Prepare Cycle**
      - Gather tasks for current cycle
      - Load context and dependencies
      - Create execution logs directory

   b. **Launch Parallel Subagents**
      - Spawn up to 3 `k-implementer` agents
      - Each agent receives:
        - Task specification file
        - Relevant codebase context
        - Approved specification excerpt
        - Files they are authorized to modify

   c. **Monitor Execution**
      - Stream logs to `knowz/logs/<wg-id>/cycle-<N>/`
      - Track progress of each task
      - Handle errors and retries

   d. **Collect Results**
      - Gather modifications from each agent
      - Validate no conflicting changes
      - Run task-level verifications

   e. **Cycle Verification**
      - Execute cycle verification checklist
      - Run affected tests
      - Check for linting/build errors

   f. **Update State**
      - Mark cycle as complete in state file
      - Log execution metrics
      - Proceed to next cycle or complete

4. **Final Verification**
   - Run full test suite
   - Check build succeeds
   - Validate all acceptance criteria

## Agents Delegated

| Agent | Quantity | Purpose |
|-------|----------|---------|
| `k-implementer` | Up to 3 per cycle | Implements individual tasks |
| `k-verifier` | 1 per cycle | Runs cycle verification checks |
| `k-conflict-resolver` | As needed | Resolves merge conflicts |

## Expected Outcomes

- All tasks implemented across cycles
- `knowz/logs/<wg-id>/` contains execution logs
- WorkGroup state updated to "audit" phase
- All tests passing
- Build succeeding

## Execution Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         CYCLE 1                              │
├───────────────┬───────────────┬───────────────┬────────────┤
│ k-implementer │ k-implementer │ k-implementer │            │
│   (Task A)    │   (Task B)    │   (Task C)    │            │
└───────┬───────┴───────┬───────┴───────┬───────┘            │
        │               │               │                     │
        └───────────────┴───────────────┘                     │
                        │                                     │
                   k-verifier                                 │
                        │                                     │
                        ▼                                     │
┌─────────────────────────────────────────────────────────────┤
│                         CYCLE 2                              │
├───────────────┬───────────────┬────────────────────────────┤
│ k-implementer │ k-implementer │                            │
│   (Task D)    │   (Task E)    │                            │
└───────┬───────┴───────┬───────┘                            │
        │               │                                     │
        └───────────────┘                                     │
                │                                             │
           k-verifier                                         │
                │                                             │
                ▼                                             │
┌─────────────────────────────────────────────────────────────┤
│                         CYCLE 3                              │
├───────────────┬────────────────────────────────────────────┤
│ k-implementer │                                            │
│   (Task F)    │                                            │
└───────┬───────┘                                            │
        │                                                     │
   k-verifier                                                 │
        │                                                     │
        ▼                                                     │
   [COMPLETE]                                                 │
└─────────────────────────────────────────────────────────────┘
```

## Task Specification Format

Each `k-implementer` receives a task file:

```yaml
task_id: A
cycle: 1
title: Create auth controller
objective: |
  Create the AuthController class to handle OAuth authentication
  endpoints including initiation and callback handling.

files:
  create:
    - src/auth/AuthController.ts
  modify:
    - src/routes/index.ts

context:
  specification: knowz/specs/approved/wg-xxx-spec.md#auth-controller
  related_files:
    - src/controllers/BaseController.ts
    - src/middleware/auth.ts

acceptance_criteria:
  - AuthController class implements IController interface
  - GET /auth/google endpoint defined
  - GET /auth/callback endpoint defined
  - Unit tests created

constraints:
  - Do not modify files outside listed scope
  - Follow existing code style
  - Add JSDoc comments
```

## Error Handling

| Scenario | Handling |
|----------|----------|
| Task fails | Retry up to 2 times, then pause cycle |
| Conflict detected | Launch `k-conflict-resolver` agent |
| Tests fail | Pause, report failure, await guidance |
| Build breaks | Roll back cycle, report issue |

## Dry Run Output

```
/k:execute --dry-run

Execution Plan Preview:

Cycle 1 (3 tasks):
  ├─ Task A: Create auth controller
  │   └─ Files: src/auth/AuthController.ts (create)
  ├─ Task B: Add OAuth config
  │   └─ Files: config/oauth.ts (create)
  └─ Task C: Update user model
      └─ Files: src/models/user.ts (modify)

Cycle 2 (2 tasks):
  ├─ Task D: Implement OAuth flow
  │   └─ Files: src/auth/oauth.ts (create)
  └─ Task E: Session management
      └─ Files: src/auth/session.ts (create)

Cycle 3 (1 task):
  └─ Task F: Integration tests
      └─ Files: tests/auth.test.ts (create)

Total: 6 tasks across 3 cycles
```

## Notes

- Cycles execute strictly in order
- Failed cycle blocks subsequent cycles
- Use `--cycle` to re-run a specific cycle after fixes
- Logs are preserved for debugging
- All changes can be rolled back before finalization
