# Knowz: Audit Log

> Chronological record of all significant operations, decisions, and changes.

## Log Format

```
[TIMESTAMP] [LEVEL] [AGENT] - Message
  Context: Additional details
  Result: Outcome if applicable
```

## Log Levels

| Level | Usage |
|-------|-------|
| `INFO` | General operations and status updates |
| `ACTION` | Code changes, file modifications |
| `DECISION` | Architectural or design decisions |
| `DELEGATE` | Subagent task delegation |
| `RETURN` | Subagent task completion |
| `ERROR` | Failures or issues encountered |
| `WARN` | Potential issues or concerns |

---

## Session Log

### [Date - Session ID]

```
[HH:MM] INFO [k-orchestrator] - Session started
  Context: [Goal or objective]
```

```
[HH:MM] DELEGATE [k-orchestrator] - Task delegated to k-[agent]
  Task: [Description]
  Contract: [Expected return format]
```

```
[HH:MM] ACTION [k-agent] - [Action taken]
  Files: [Affected files]
  Result: [Outcome]
```

```
[HH:MM] RETURN [k-agent] - Task completed
  Status: Success/Partial/Failed
  Summary: [Brief summary]
  Artifacts: [Created/modified items]
```

```
[HH:MM] DECISION [k-orchestrator] - [Decision made]
  Rationale: [Why this decision]
  Impact: [What this affects]
```

```
[HH:MM] INFO [k-orchestrator] - Session ended
  Completed: [X] nodes
  Pending: [Y] nodes
```

---

## Previous Sessions

### [Previous Date - Session ID]

[Archived log entries...]

---

## Statistics

| Metric | Value |
|--------|-------|
| Total Sessions | 0 |
| Total Actions | 0 |
| Total Delegations | 0 |
| Success Rate | 0% |

---
*Log Started: [Date]*
*Current Session: [Session ID]*
