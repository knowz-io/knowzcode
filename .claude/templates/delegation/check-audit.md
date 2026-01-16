# Check Phase: Audit Delegation

**Target Agent:** k-arc-auditor

## Delegation Prompt

```
Review implementation for WorkGroup {wgid}.
Specifications: knowz/specs/{wgid}/
Implementation log: knowz/workgroups/{wgid}_impl.json

Write audit to: knowz/workgroups/{wgid}_audit.json
```

## Return Contract (max 700 tokens)

```json
{
  "status": "complete|blocked|error",
  "overall_completion_pct": 0.0,
  "node_scores": [
    {"node": "spec_name", "completion_pct": 0.0}
  ],
  "gap_count": 0,
  "deviation_count": 0,
  "critical_issues": [],
  "audit_verdict": "pass|conditional|fail"
}
```

## On Return

- Record summary in state file
- DO NOT request audit details
- Proceed to ship phase if audit_verdict != "fail"
