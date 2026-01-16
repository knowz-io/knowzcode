---
name: k:continue
description: Resume work from saved WorkGroup state
arguments:
  - name: workgroup
    description: WorkGroup ID to resume (uses active if omitted)
    required: false
  - name: phase
    description: Force resume from specific phase
    required: false
  - name: list
    description: List all WorkGroups and their states
    required: false
    default: false
---

# /k:continue - Resume WorkGroup

## Usage

```
/k:continue                           # Resume active WorkGroup
/k:continue --workgroup=wg-20240115-a3f2  # Resume specific WorkGroup
/k:continue --phase=execute           # Force resume from phase
/k:continue --list                    # List all WorkGroups
```

## What It Does

Resumes an interrupted or paused WorkGroup from its last saved state, allowing continuation of work across sessions.

## Pre-Resume Enforcement Gates

**CRITICAL: Before resuming, these gates are checked.**

### Gate 1: WorkGroup Existence Gate
```
IF --workgroup specified:
  Verify WorkGroup exists at knowz/workgroups/{wg-id}/
  IF not found: BLOCK with list of available WorkGroups
ELSE:
  Check knowz/state.json for active WorkGroup
  IF no active: Show list and prompt for selection
```

### Gate 2: State Integrity Gate
```
Verify state file is valid JSON
Verify required fields present (id, phase, phases)
IF corrupted:
  → Display warning with recovery options
  → STOP execution
  → Offer: repair, restart from phase, or abort
```

### Gate 3: File Conflict Gate
```
IF files modified outside WorkGroup since last activity:
  → List conflicting files
  → STOP execution
  → Wait for user resolution choice
```

**State Integrity Block Message:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  STATE INTEGRITY BLOCKED                             │
│                                                         │
│ WorkGroup state file appears corrupted or incomplete.   │
│                                                         │
│ File: knowz/workgroups/wg-xxx/state.json                │
│ Issue: Missing required field 'phases'                  │
│                                                         │
│ Options:                                                │
│ • "repair state" - Attempt automatic repair             │
│ • "restart from {phase}" - Reset to specific phase      │
│ • "abort" - Cancel resume operation                     │
└─────────────────────────────────────────────────────────┘
```

### Bypass Logging
All bypasses logged to `knowz/logs/enforcement.log`:
```json
{
  "timestamp": "2026-01-15T...",
  "gate": "state_integrity",
  "issue": "corrupted_state",
  "resolution": "repair",
  "workgroup": "wg-xxx"
}
```

### Step-by-Step Process

1. **Identify WorkGroup**

   a. **If no ID specified:**
      - Check `knowz/state.json` for active WorkGroup
      - If none active, show list and prompt

   b. **If ID specified:**
      - Load WorkGroup from `knowz/workgroups/<wg-id>/`
      - Validate WorkGroup exists and is resumable

2. **Load WorkGroup State**
   - Read `knowz/workgroups/<wg-id>/state.json`
   - Parse current phase and progress
   - Load timeline for context

3. **Analyze Interruption Point**
   - Determine last successful action
   - Check for partial work
   - Identify any conflicts or issues

4. **Restore Context**
   - Load specification (draft or approved)
   - Load execution plan (if exists)
   - Restore gathered context
   - Check file system state

5. **Display Resume Summary**
   ```
   WorkGroup: wg-20240115-a3f2
   Goal: Implement user authentication with OAuth2
   Mode: guided

   Progress:
   ✓ Specification: Complete
   ✓ Planning: Complete
   ◐ Execution: Cycle 2 of 3 (in progress)
     - Cycle 1: Complete (3/3 tasks)
     - Cycle 2: Partial (1/2 tasks complete)
     - Cycle 3: Pending
   ○ Audit: Pending
   ○ Finalize: Pending

   Last Activity: 2024-01-15T14:30:00Z (2 hours ago)
   ```

6. **Handle Partial State**

   | Scenario | Action |
   |----------|--------|
   | Clean interruption | Resume from next step |
   | Partial task | Offer to retry or skip |
   | Conflicting files | Show diff, ask resolution |
   | Failed task | Show error, offer retry |

7. **Resume Execution**
   - Continue from determined phase
   - Follow mode (auto/guided/step)
   - Update timeline with resume event

## Agents Delegated

| Agent | Purpose |
|-------|---------|
| `k-state-analyzer` | Determines resume point |
| `k-context-restorer` | Rebuilds execution context |
| `k-conflict-detector` | Checks for file conflicts |

## Expected Outcomes

- WorkGroup resumed from last state
- Context fully restored
- Execution continues normally
- Timeline updated with resume event

## State File Structure

```json
{
  "id": "wg-20240115-a3f2",
  "goal": "Implement user authentication with OAuth2",
  "mode": "guided",
  "phase": "execute",
  "created": "2024-01-15T10:30:00Z",
  "lastActivity": "2024-01-15T14:30:00Z",
  "phases": {
    "spec": "completed",
    "plan": "completed",
    "execute": "in_progress",
    "audit": "pending",
    "finalize": "pending"
  },
  "execution": {
    "totalCycles": 3,
    "currentCycle": 2,
    "cycles": {
      "1": {
        "status": "completed",
        "tasks": ["A", "B", "C"],
        "completedAt": "2024-01-15T12:00:00Z"
      },
      "2": {
        "status": "in_progress",
        "tasks": ["D", "E"],
        "completed": ["D"],
        "pending": ["E"]
      },
      "3": {
        "status": "pending",
        "tasks": ["F"]
      }
    }
  },
  "interruption": {
    "type": "user_stopped",
    "timestamp": "2024-01-15T14:30:00Z",
    "context": "User stopped during cycle 2 execution"
  }
}
```

## List Output

```
/k:continue --list

WorkGroups:

ID                  | Goal                           | Phase    | Status
--------------------|--------------------------------|----------|--------
wg-20240115-a3f2    | OAuth authentication           | execute  | active
wg-20240114-c8d1    | API pagination                 | complete | archived
wg-20240113-f2e9    | Database refactor              | audit    | paused
wg-20240112-a1b2    | User profile update            | complete | archived

Active: wg-20240115-a3f2
Paused: wg-20240113-f2e9 (failed audit, needs fixes)
```

## Recovery Scenarios

### Scenario 1: Clean Pause
User stopped work normally.
```
/k:continue
→ Resumes from next pending step
```

### Scenario 2: Task Failure
A task failed during execution.
```
/k:continue
→ Shows error details
→ Options: retry, skip, abort
```

### Scenario 3: File Conflicts
Files were modified outside WorkGroup.
```
/k:continue
→ Shows conflicting files
→ Options: keep ours, keep theirs, merge
```

### Scenario 4: Stale State
WorkGroup is old, codebase has changed.
```
/k:continue
→ Warns about age
→ Options: refresh context, continue anyway, abort
```

## Force Phase Resume

Override the saved phase (use carefully):

```
/k:continue --phase=spec     # Restart from specification
/k:continue --phase=plan     # Restart from planning
/k:continue --phase=execute  # Restart execution
/k:continue --phase=audit    # Jump to audit
```

**Warning:** Forcing a phase may lose progress. Use only when:
- State file is corrupted
- Need to redo a phase
- Recovering from major issues

## Notes

- WorkGroups persist across sessions
- Only one WorkGroup can be active at a time
- Use `--list` to see all WorkGroups
- Archived WorkGroups cannot be resumed
- State is saved after each significant action
