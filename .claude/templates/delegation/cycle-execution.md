# Cycle-Based Parallel Execution Template

## Purpose
Template for orchestrators to dispatch parallel cycles of implementation tasks.
Each cycle contains up to 3 independent nodes that can execute concurrently.

---

## Cycle Dispatch Format

### Pre-Cycle Checklist
Before dispatching a cycle, verify:
1. All dependencies from previous cycles are complete
2. Each node in the cycle is independent (no inter-cycle dependencies)
3. State file is updated with current cycle number
4. Maximum 5 tasks per cycle

### Spawning Parallel Tasks

**CRITICAL**: Spawn ALL tasks in a single message to enable true parallel execution.

```
I am dispatching Cycle {cycle_number} with {n} parallel tasks:

<parallel_dispatch>
Task 1: {node_id}
Task 2: {node_id}
Task 3: {node_id}
</parallel_dispatch>
```

Then immediately invoke all Task tools in the same response:

```
[Task tool call 1 - Node A]
[Task tool call 2 - Node B]
[Task tool call 3 - Node C]
```

### Task Invocation Template

Each Task call must include:

```markdown
## Implementation Task: {node_id}

**Workgroup**: {workgroup_id}
**Cycle**: {cycle_number}
**Node**: {node_id}

### Context
- Spec Path: {spec_file_path}
- Dependencies: {list_of_completed_dependency_node_ids}
- State File: {state_file_path}

### Instructions
Follow the k-impl-agent protocol:
1. Read the spec at the provided path
2. Execute TDD loop: test -> implement -> verify
3. Return ONLY the structured JSON summary
4. Maximum 600 tokens in response

### Return Contract
Return ONLY this JSON structure:
{
  "node_id": "{node_id}",
  "status": "success|failure|blocked",
  "files_created": [],
  "files_modified": [],
  "tests": {
    "written": 0,
    "passing": 0,
    "failing": 0
  },
  "commits": [],
  "blockers": [],
  "duration_estimate": "{time}"
}
```

---

## Cycle Completion Verification

### Verification Protocol

After all tasks in a cycle return, verify completion:

```markdown
## Cycle {cycle_number} Completion Check

### Task Results
| Node ID | Status | Tests Passing | Commits |
|---------|--------|---------------|---------|
| {id}    | {status} | {n}/{m}    | {count} |

### Verification Steps
1. [ ] All tasks returned (count: {expected} / {actual})
2. [ ] No tasks in "blocked" status
3. [ ] All tests passing (no failures)
4. [ ] State file updated with completed nodes

### Cycle Status: {COMPLETE|INCOMPLETE|BLOCKED}
```

### Success Criteria
- All tasks returned with status "success"
- Zero test failures across all nodes
- State file reflects completed nodes

### Proceeding to Next Cycle
Only proceed when:
1. Cycle status is COMPLETE
2. State file updated
3. Next cycle dependencies satisfied

---

## Error Handling Per Cycle

### Error Categories

#### 1. Task Failure (status: "failure")
```json
{
  "error_type": "task_failure",
  "node_id": "{node_id}",
  "action": "retry_once_then_escalate",
  "retry_count": 0,
  "max_retries": 1
}
```

**Protocol**:
1. Log failure details to state file
2. Retry task once with same parameters
3. If retry fails, mark cycle as BLOCKED
4. Escalate to orchestrator for manual intervention

#### 2. Task Blocked (status: "blocked")
```json
{
  "error_type": "blocked",
  "node_id": "{node_id}",
  "blockers": [],
  "action": "resolve_blockers_or_skip"
}
```

**Protocol**:
1. Identify blocker type (missing dependency, external, unclear spec)
2. If resolvable: resolve and retry
3. If not resolvable: skip node, mark as deferred
4. Continue cycle with remaining nodes

#### 3. Partial Cycle Completion
```json
{
  "error_type": "partial_completion",
  "completed": [],
  "failed": [],
  "action": "assess_and_proceed"
}
```

**Protocol**:
1. Record completed nodes to state
2. Assess if failed nodes block subsequent cycles
3. If blocking: resolve failures before proceeding
4. If non-blocking: proceed with warning

#### 4. Timeout / No Response
```json
{
  "error_type": "timeout",
  "node_id": "{node_id}",
  "action": "retry_with_simplified_scope"
}
```

**Protocol**:
1. Mark task as timed out
2. Retry with reduced scope if possible
3. If still failing, mark as blocked

---

## State Updates

### After Each Cycle

Update state file with:

```json
{
  "current_cycle": {new_cycle_number},
  "cycles": {
    "{cycle_number}": {
      "status": "complete|partial|blocked",
      "started_at": "{timestamp}",
      "completed_at": "{timestamp}",
      "nodes": {
        "{node_id}": {
          "status": "success|failure|blocked|skipped",
          "result_summary": {}
        }
      }
    }
  }
}
```

---

## Example Cycle Dispatch

```markdown
## Dispatching Cycle 2

### Cycle Context
- Workgroup: wg-auth-system
- Previous Cycles Complete: [Cycle 1]
- Nodes in Cycle: 3

### Parallel Tasks

Spawning 3 parallel implementation tasks:

[Task 1: node-jwt-validator]
[Task 2: node-session-store]
[Task 3: node-auth-middleware]

All tasks spawned in single message for parallel execution.
Awaiting results...
```

---

## Constraints

1. **Maximum 5 tasks per cycle** - Prevents context overflow
2. **Fresh 175k context per task** - Each subagent starts clean
3. **600 token return limit** - Forces structured, minimal responses
4. **No cross-cycle dependencies within cycle** - Ensures true parallelism
5. **State file is source of truth** - All progress recorded there
