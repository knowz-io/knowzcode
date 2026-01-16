# DISABLED - Future Implementation

> **Status:** NOT YET IMPLEMENTED
>
> This executor is planned for a future phase. The current MCP manager uses
> Claude subagents only. When Gemini support is added, set `GEMINI_API_KEY`
> and enable in `mcp-manager-config.json`.

---

# K-MCP Gemini Executor

## Purpose

Execute MCP operations using Google Gemini as an intermediary, preventing MCP tool schemas and responses from polluting Claude's context. This agent reads Claude's MCP configuration, translates tool schemas into Gemini function declarations, and executes MCP calls via HTTP.

## When This Executor Is Used

The Gemini executor is the **primary** method when:
1. `GEMINI_API_KEY` environment variable is set
2. `execution_mode.gemini.enabled: true` in `mcp-manager-config.json`

Falls back to Claude native MCP when:
- `GEMINI_API_KEY` not set
- Gemini API call fails
- `execution_mode.gemini.enabled: false`

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Claude Orchestrator                          │
│                    (Zero MCP tools loaded)                          │
└────────────────────────────┬────────────────────────────────────────┘
                             │ Task: "search my knowledge for X"
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     K-MCP Gemini Executor                           │
│                                                                     │
│  1. Read ~/.claude/settings.json or .claude/settings.json          │
│  2. Parse mcpServers config (URLs, headers)                         │
│  3. Fetch tool schemas from MCP server                              │
│  4. Build Gemini function calling request                           │
│  5. Gemini returns function call decision                           │
│  6. Execute HTTP call to MCP server                                 │
│  7. Compress response to max 800 tokens                             │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      MCP Server (HTTP)                              │
│            e.g., https://mcp.knowz.io/mcp                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Execution Flow

### Step 1: Read MCP Configuration

Read Claude's MCP settings from (in order):
1. `.claude/settings.json` (project-level, takes precedence)
2. `~/.claude/settings.json` (user-level)

Expected format:
```json
{
  "mcpServers": {
    "knowz": {
      "url": "https://mcp.knowz.io/mcp",
      "headers": {
        "Authorization": "Bearer ukz_xxxxx"
      }
    },
    "custom-server": {
      "url": "https://my-server.com/mcp",
      "headers": {}
    }
  }
}
```

### Step 2: Fetch Tool Schemas from MCP Server

Make a request to the MCP server to get available tools:

```
GET https://mcp.knowz.io/mcp/tools
Authorization: Bearer ukz_xxxxx

Response:
{
  "tools": [
    {
      "name": "search_knowledge",
      "description": "Search across your knowledge base",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": { "type": "string", "description": "Search query" },
          "vaultId": { "type": "string", "description": "Optional vault ID" }
        },
        "required": ["query"]
      }
    },
    ...
  ]
}
```

### Step 3: Convert to Gemini Function Declarations

Transform MCP tool schemas into Gemini's function declaration format:

```json
{
  "function_declarations": [
    {
      "name": "search_knowledge",
      "description": "Search across your knowledge base",
      "parameters": {
        "type": "object",
        "properties": {
          "query": { "type": "string", "description": "Search query" },
          "vaultId": { "type": "string", "description": "Optional vault ID" }
        },
        "required": ["query"]
      }
    }
  ]
}
```

### Step 4: Call Gemini API

Send the task and function declarations to Gemini:

```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
Authorization: Bearer ${GEMINI_API_KEY}

{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "Search my knowledge for React patterns. Use the available tools to accomplish this task."
        }
      ]
    }
  ],
  "tools": [
    {
      "function_declarations": [/* from Step 3 */]
    }
  ],
  "tool_config": {
    "function_calling_config": {
      "mode": "AUTO"
    }
  }
}
```

### Step 5: Parse Gemini Response

Gemini returns a function call decision:

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "functionCall": {
              "name": "search_knowledge",
              "args": {
                "query": "React patterns"
              }
            }
          }
        ]
      }
    }
  ]
}
```

### Step 6: Execute MCP Tool Call

Make HTTP request to MCP server with the tool call:

```
POST https://mcp.knowz.io/mcp/tools/search_knowledge
Authorization: Bearer ukz_xxxxx
Content-Type: application/json

{
  "query": "React patterns"
}
```

### Step 7: Compress and Return Result

Process the MCP response:
1. If response > 800 tokens, summarize key points
2. Save large data to `.knowz/artifacts/data/`
3. Return structured result to orchestrator

---

## Return Contract

### MAXIMUM RESPONSE: 800 tokens

### Response Format

```markdown
## MCP Operation Result

**Server:** knowz
**Tool:** search_knowledge
**Status:** Success | Failed | Partial
**Mode:** Gemini

### Summary
{2-3 sentences describing what was accomplished}

### Key Results
- {bullet points of important data}
- {IDs, URLs, counts as relevant}

### Artifacts (if any)
- Data: {path to saved file}
```

### MUST Return
- Concise summary of operation
- Success/failure status
- Key data points (IDs, counts, names)
- File paths for saved artifacts

### MUST NOT Return
- Full MCP responses (save to file if large)
- Raw JSON payloads
- Verbose logs

---

## Error Handling

### Gemini API Errors

| Error | Action |
|-------|--------|
| 401 Unauthorized | Check GEMINI_API_KEY |
| 429 Rate limited | Retry with backoff, then fallback to Claude |
| 500 Server error | Fallback to Claude native MCP |
| Timeout | Fallback to Claude native MCP |

### MCP Server Errors

| Error | Action |
|-------|--------|
| 401 Unauthorized | Return error, suggest checking API key |
| 404 Tool not found | Return error with available tools |
| 500 Server error | Return error with details |

### Fallback Behavior

When Gemini execution fails, automatically fall back to Claude native MCP:

```
1. Log warning: "Gemini execution failed, falling back to Claude native MCP"
2. Spawn k-mcp-agent subagent via Task tool
3. Pass original task and server name
4. k-mcp-agent uses Claude's built-in MCP tools
5. Return result from k-mcp-agent
```

---

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes (for Gemini mode) | Google AI API key |
| `KNOWZ_API_KEY` | For Knowz server | Knowz personal API key |

### mcp-manager-config.json Settings

```json
{
  "execution_mode": {
    "primary": "gemini",
    "fallback": "claude_native",
    "gemini": {
      "enabled": true,
      "api_key_env": "GEMINI_API_KEY",
      "model": "gemini-2.0-flash",
      "timeout_ms": 30000,
      "mcp_config_paths": [
        ".claude/settings.json",
        "~/.claude/settings.json"
      ]
    }
  }
}
```

---

## Example Execution

### Input
```
Task: "Search my knowledge for authentication best practices"
Server: knowz
```

### Execution Log
```
1. Read MCP config from ~/.claude/settings.json
   → Found server "knowz" at https://mcp.knowz.io/mcp

2. Fetch tool schemas from https://mcp.knowz.io/mcp/tools
   → Found 12 tools: search_knowledge, ask_question, create_knowledge, ...

3. Call Gemini API with task and function declarations
   → Gemini selected: search_knowledge(query="authentication best practices")

4. Execute MCP call: POST /mcp/tools/search_knowledge
   → Response: 15 results, 4500 tokens

5. Compress response
   → Saved full results to .knowz/artifacts/data/2024-01-15-search-auth.json
   → Returning summary (350 tokens)
```

### Output
```markdown
## MCP Operation Result

**Server:** knowz
**Tool:** search_knowledge
**Status:** Success
**Mode:** Gemini

### Summary
Found 15 knowledge items related to authentication best practices. Results include OAuth2 implementation guides, JWT security patterns, and session management strategies.

### Key Results
- 15 items found across 2 vaults
- Top result: "OAuth2 Implementation Guide" (relevance: 0.94)
- Topics covered: JWT, session management, password hashing, 2FA

### Artifacts
- Full results: .knowz/artifacts/data/2024-01-15-search-auth.json
```

---

## Benefits Over Direct MCP Loading

1. **Zero Context Pollution**: Gemini handles tool schemas, Claude never sees them
2. **Fresh Context**: Each operation gets a clean slate
3. **Large Response Handling**: Can process large MCP responses without impacting Claude
4. **Cost Efficiency**: Gemini Flash is faster and cheaper for tool routing
5. **Graceful Degradation**: Falls back to Claude if Gemini unavailable
