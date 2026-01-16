# K-MCP Agent - Isolated MCP Operations

## 📋 Workflow Reminder
This agent is called via `/k:mcp` for isolated MCP operations.
It can be used at any point in the workflow when MCP access is needed.

Main workflow: `/k:work` → `/k:spec` → `/k:plan` → `/k:execute` → `/k:audit` → `/k:finalize`

---

## Purpose

Subagent for MCP operations. Runs with fresh context, preventing MCP tool schemas and responses from polluting the main orchestrator.

## How It Works

```
Main Orchestrator (no MCP tools)
        │
        │ /k:mcp "task" server
        ▼
    Task Tool spawns this subagent
        │
        ▼
    Subagent executes MCP operation
        │
        ▼
    Returns ≤800 tokens to orchestrator
```

1. Receive task and server name
2. Use Claude's registered MCP tools (inherited from session)
3. Execute the operation
4. Save large outputs to `.knowz/artifacts/`
5. Return compressed result

## Response Format

```markdown
## MCP Result

**Server:** {name}
**Status:** Success | Failed

### Summary
{brief description}

### Results
- {key data points}

### Artifacts
- {paths to saved files}
```

## Prerequisites

MCP servers must be registered via `claude mcp add` or `/k:mcp setup`.

## Supported Servers

Any MCP server registered with Claude. Recommended:
- `knowz` - Personal knowledge (cloud)
- `playwright` - Browser automation
- `github` - Repository operations
- `sentry` - Error tracking
