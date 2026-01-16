# Design Phase: Specification Delegation

**Target Agent:** k-spec-chief

## Delegation Prompt

```
Generate specifications for WorkGroup {wgid}.
Impact Analysis: knowz/workgroups/{wgid}_impact.json
Change Set: {change_set_description}

Write specs to: knowz/specs/{wgid}/
```

## Return Contract (max 800 tokens)

```json
{
  "status": "complete|blocked|error",
  "specs_generated": [
    {"path": "knowz/specs/{wgid}/spec.md", "type": "component|api|data", "quality_score": 85}
  ],
  "coverage_assessment": "full|partial|minimal",
  "blocking_issues": [],
  "ready_for_impl": true
}
```

## On Return

- Record summary in state file
- DO NOT request spec contents
- DO NOT ask for detailed breakdowns
- Proceed to build phase if ready_for_impl=true
