# WorkGroup Completion Log Template

## Format

```markdown
# WorkGroup Completion: {wgid}

## Summary
- **Started:** {start_timestamp}
- **Completed:** {completion_timestamp}
- **Duration:** {duration}
- **Final Completion:** {percentage}%

## Phases Completed
- [x] Discover: Impact Analysis
- [x] Design: Specification
- [x] Build: Implementation
- [x] Check: Audit
- [x] Ship: Finalization

## Artifacts
- State: `knowz/workgroups/{wgid}_state.json`
- Impact: `knowz/workgroups/{wgid}_impact.json`
- Specs: `knowz/specs/{wgid}/`
- Audit: `knowz/workgroups/{wgid}_audit.json`

## Deviations Accepted
{list of accepted deviations with rationale}

## Notes
{any additional completion notes}
```
