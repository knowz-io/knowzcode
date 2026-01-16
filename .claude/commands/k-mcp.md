---
name: k:mcp
description: Execute MCP operations via isolated subagent
arguments:
  - name: task_description
    description: Description of the MCP operation to perform
    required: true
  - name: server_name
    description: Target MCP server (any registered server)
    required: true
---

# /k:mcp - MCP Operations via Subagent

## Usage

```
/k:mcp <task_description> <server_name>
```

## Examples

```
/k:mcp "Take a screenshot of https://example.com" playwright
/k:mcp "Get top 10 errors" sentry
/k:mcp "Search for React patterns" knowz
/k:mcp "List open PRs" github
```

## How It Works

1. Spawns subagent via Task tool with fresh context
2. Subagent uses Claude's registered MCP tools
3. Returns compressed result (max 800 tokens)
4. Main orchestrator context stays clean

## Prerequisites

MCP servers must be registered first:

```bash
/k:mcp setup <server>        # Interactive setup
claude mcp add <name> <cmd>  # Manual
claude mcp list              # Verify
```

## Recommended Servers

| Server | Setup |
|--------|-------|
| knowz | `/k:mcp setup knowz` |
| playwright | `claude mcp add playwright npx @anthropic/mcp-server-playwright` |
| github | `claude mcp add github npx @anthropic/mcp-server-github` |
| sentry | `claude mcp add sentry npx @sentry/mcp-server` |

Any MCP server registered with Claude will work.
