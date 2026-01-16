# Discover Phase: Impact Analysis Delegation

**Target Agent:** k-impact-analyst

## Delegation Prompt

```
Analyze impact for WorkGroup {wgid}.
Change Set: {change_set_description}
Entry Point: {entry_point}

Write all discoveries to: knowz/workgroups/{wgid}_impact.json
```

## Return Contract (max 500 tokens)

```json
{
  "status": "complete|blocked|error",
  "impact_scope": "isolated|moderate|extensive",
  "affected_count": 0,
  "risk_level": "low|medium|high",
  "blocking_issues": [],
  "recommendation": "proceed|review|halt"
}
```

## On Return

- Record summary in state file
- DO NOT request exploration logs
- DO NOT ask for file contents
- Proceed to design phase if status=complete
