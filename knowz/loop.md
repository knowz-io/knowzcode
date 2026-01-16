# Knowz: Operational Loop

> The lean orchestrator pattern with subagent delegation and return contracts.

## Core Philosophy

The orchestrator is a **lean coordinator**, not an implementer. It:
- Reads context from `knowz/` files
- Delegates work to specialized subagents
- Tracks progress in `tracker.md`
- Logs all operations in `log.md`
- Never writes code directly

## The Loop

```
┌─────────────────────────────────────────────────────────────┐
│                    KNOWZ OPERATIONAL LOOP                    │
└─────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │   1. READ    │  Load context from knowz/ files
    │   CONTEXT    │  - project.md (what we're building)
    └──────┬───────┘  - tracker.md (current state)
           │          - architecture.md (system design)
           ▼
    ┌──────────────┐
    │  2. SELECT   │  Pick next node from tracker.md
    │    NODE      │  - Priority order
    └──────┬───────┘  - Dependency resolution
           │          - Blocked item handling
           ▼
    ┌──────────────┐
    │ 3. DELEGATE  │  Dispatch to appropriate subagent
    │   TO AGENT   │  - Define return contract
    └──────┬───────┘  - Set scope boundaries
           │          - Log delegation in log.md
           ▼
    ┌──────────────┐
    │  4. AWAIT    │  Subagent executes task
    │   RETURN     │  - Follows contract
    └──────┬───────┘  - Returns structured result
           │          - Reports artifacts created
           ▼
    ┌──────────────┐
    │  5. UPDATE   │  Process subagent return
    │    STATE     │  - Update tracker.md
    └──────┬───────┘  - Log completion in log.md
           │          - Handle any failures
           ▼
    ┌──────────────┐
    │  6. REPORT   │  Communicate to user
    │  & CONTINUE  │  - Summary of progress
    └──────┬───────┘  - Next steps
           │
           └──────────► Loop to Step 1
```

## Commands

| Command | Description |
|---------|-------------|
| `/k:init` | Initialize knowz/ directory structure |
| `/k:status` | Show current tracker state |
| `/k:next` | Select and delegate next node |
| `/k:log` | Show recent log entries |
| `/k:sync` | Synchronize all knowz/ files |

## Subagent Delegation

### Delegation Format

```markdown
Knowz: Delegate to k-[agent]

**Task:** [Clear description of what to do]

**Scope:**
- [File/directory boundaries]
- [What NOT to touch]

**Return Contract:**
- Status: [Success | Partial | Failed]
- Summary: [What was done]
- Artifacts: [Files created/modified]
- Issues: [Any problems encountered]

**Context:**
- [Relevant information from project.md]
- [Dependencies from tracker.md]
```

### Return Format

```markdown
Knowz: Return from k-[agent]

**Status:** [Success | Partial | Failed]

**Summary:**
[Brief description of what was accomplished]

**Artifacts:**
- [Created] path/to/file.ts
- [Modified] path/to/other.ts
- [Deleted] path/to/old.ts

**Issues:**
- [Any blockers or concerns]

**Recommendations:**
- [Suggested next steps]
```

## Subagent Types

| Agent | Responsibility |
|-------|----------------|
| `k-architect` | System design, architecture decisions |
| `k-implementer` | Code writing, feature implementation |
| `k-tester` | Test writing, quality assurance |
| `k-reviewer` | Code review, best practices |
| `k-documenter` | Documentation, comments |
| `k-debugger` | Bug investigation, fixes |
| `k-refactorer` | Code improvement, optimization |

## State Files

| File | Purpose | Updated By |
|------|---------|------------|
| `knowz/project.md` | Project context | Manual / k-architect |
| `knowz/tracker.md` | Node status | k-orchestrator |
| `knowz/log.md` | Audit trail | All agents |
| `knowz/architecture.md` | System design | k-architect |
| `knowz/environment_context.md` | Platform info | k-orchestrator |
| `knowz/automation_manifest.md` | Available tools | Manual |

## Error Handling

### Subagent Failure

1. Log failure in `log.md`
2. Mark node as `[!]` blocked in `tracker.md`
3. Assess impact on dependent nodes
4. Report to user with options:
   - Retry with different approach
   - Skip and continue
   - Pause for manual intervention

### Context Drift

If `knowz/` files become stale:
1. Run `/k:sync` to refresh
2. Validate against actual codebase
3. Update discrepancies
4. Log sync operation

## Best Practices

1. **Stay Lean:** Orchestrator coordinates, doesn't implement
2. **Clear Contracts:** Every delegation has explicit return expectations
3. **Atomic Tasks:** One node = one focused task
4. **Log Everything:** Full auditability of all operations
5. **Fail Fast:** Surface issues immediately, don't hide failures
6. **Context First:** Always read knowz/ files before acting

---
*Knowz Version: 3.0*
*Pattern: Lean Orchestrator with Subagent Delegation*
