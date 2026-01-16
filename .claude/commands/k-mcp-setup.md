---
name: k:mcp setup
description: Configure MCP servers (Knowz, Playwright, GitHub, Sentry, or custom)
arguments:
  - name: server
    description: Server name or URL (knowz, playwright, github, sentry, or custom URL)
    required: false
---

# /k:mcp setup - MCP Server Configuration

## Usage

```
/k:mcp setup                     # Interactive server selection
/k:mcp setup knowz               # Knowz with registration flow
/k:mcp setup playwright          # Playwright via npx
/k:mcp setup github              # GitHub via npx
/k:mcp setup sentry              # Sentry via npx
/k:mcp setup https://custom.io   # Custom HTTP server
```

## What It Does

Configures MCP (Model Context Protocol) servers for use with Claude Code. Handles authentication, registration (for Knowz), and runs the appropriate `claude mcp add` command.

---

## Interactive Flow

When run without arguments, presents a server selection menu:

```
/k:mcp setup

"Which MCP server do you want to configure?"

1. Knowz (recommended) - Personal knowledge base with search, Q&A, and note-taking
2. Playwright - Browser automation and screenshots
3. GitHub - Repository operations, PRs, issues
4. Sentry - Error tracking and monitoring
5. Custom URL - Any MCP-compatible server
```

---

## Server-Specific Flows

### Knowz (Special Features)

The Knowz flow includes registration and vault selection:

```
/k:mcp setup knowz

Step 1: API Key Check
├─ "Do you have a Knowz API key?"
│   ├─ Yes → Prompt for key
│   └─ No → "Would you like to register for Knowz?"
│           ├─ Yes → Registration flow
│           └─ No → Exit with link to https://knowz.io

Step 2: Validate API Key
├─ GET https://api.knowz.io/api/v1/vaults
├─ If 401 → "Invalid API key, please try again"
└─ If 200 → Continue

Step 3: Vault Selection
├─ Display user's vaults
├─ "Scope to a specific vault or access all?"
│   ├─ All vaults → No defaultVaultId parameter
│   └─ Specific vault → Use selected vault's ID
└─ Optional: "Use sandbox mode?" (strict vault isolation)

Step 4: Environment Variable
├─ "Set KNOWZ_API_KEY environment variable"
├─ Show command: export KNOWZ_API_KEY="ukz_..."
└─ Recommend adding to ~/.zshrc or ~/.bashrc

Step 5: Configure MCP
├─ Run: claude mcp add --transport http knowz "https://mcp.knowz.io/mcp[?defaultVaultId=...]" --header "Authorization: Bearer ${KNOWZ_API_KEY}"
└─ Verify with: claude mcp list

Step 6: Test Connection
├─ Suggest: "Ask Claude to 'list my vaults'"
└─ Confirm tools are available
```

#### Knowz Registration Sub-flow

When user doesn't have an API key:

```
"Let's create your Knowz account"

1. Prompt for:
   - Email address
   - Password (min 8 characters)
   - First name
   - Last name

2. POST https://api.knowz.io/api/v1/users/register
   {
     "username": "{email}",
     "email": "{email}",
     "password": "{password}",
     "firstName": "{firstName}",
     "lastName": "{lastName}",
     "returnPersonalApiKey": true
   }

3. On success, extract personalApiKey from response:
   {
     "userId": "...",
     "tenantId": "...",
     "personalApiKey": "ukz_..."  ← This is the API key
   }

4. Continue with vault selection (new users get a default "Personal" vault)
```

---

### Local NPX Servers (Playwright, GitHub, Sentry)

Simple one-step setup:

```
/k:mcp setup playwright

Step 1: Check Prerequisites
├─ Verify npx is available
└─ If not: "Please install Node.js first"

Step 2: Configure MCP
├─ Run: claude mcp add playwright npx @anthropic/mcp-server-playwright
└─ Verify with: claude mcp list

Step 3: Test
└─ Suggest: "Ask Claude to take a screenshot of a website"
```

#### NPX Server Commands

| Server | Command |
|--------|---------|
| playwright | `claude mcp add playwright npx @anthropic/mcp-server-playwright` |
| github | `claude mcp add github npx @anthropic/mcp-server-github` |
| sentry | `claude mcp add sentry npx @sentry/mcp-server` |

---

### Custom URL

For any MCP-compatible HTTP server:

```
/k:mcp setup https://my-mcp-server.com/mcp

Step 1: Server Name
├─ "What name should this server have?"
└─ Default: derived from hostname (e.g., "my-mcp-server")

Step 2: Authentication
├─ "Does this server require authentication?"
│   ├─ No → Skip to Step 3
│   └─ Yes → "What type?"
│       ├─ Bearer token → Prompt for token or env var name
│       ├─ API key header → Prompt for header name and value
│       └─ Basic auth → Prompt for username/password
└─ Recommend using environment variables for secrets

Step 3: Configure MCP
├─ Run: claude mcp add --transport http <name> <url> [--header "..."]
└─ Verify with: claude mcp list
```

---

## Examples

### Set up Knowz with existing API key

```
/k:mcp setup knowz

> Do you have a Knowz API key? Yes
> Enter your API key: ukz_xxxxx

Validating API key...
Found 3 vaults: Personal, Work, Projects

> Scope to a specific vault or access all?
  1. All vaults (default)
  2. Personal
  3. Work
  4. Projects

> 1

Set your environment variable:
  export KNOWZ_API_KEY="ukz_xxxxx"

Configuring MCP server...
  claude mcp add --transport http knowz "https://mcp.knowz.io/mcp" --header "Authorization: Bearer ${KNOWZ_API_KEY}"

Success! Knowz MCP server configured.
Try: "Search my knowledge for [topic]"
```

### Register for Knowz

```
/k:mcp setup knowz

> Do you have a Knowz API key? No
> Would you like to register? Yes

> Email: user@example.com
> Password: ********
> First name: John
> Last name: Doe

Creating account...
Success! Your API key: ukz_xxxxx

[Continues with vault selection...]
```

### Set up Playwright

```
/k:mcp setup playwright

Configuring Playwright MCP server...
  claude mcp add playwright npx @anthropic/mcp-server-playwright

Success! Playwright MCP server configured.
Try: "Take a screenshot of https://example.com"
```

---

## Troubleshooting

### "Server already exists"

If the MCP server is already configured:
```
claude mcp remove <server-name>
```
Then re-run `/k:mcp setup`.

### "npx not found"

Install Node.js from https://nodejs.org/

### "Invalid API key" (Knowz)

1. Check the key starts with `ukz_` (personal) or `kz_` (tenant)
2. Generate a new key at https://knowz.io/settings/api-keys
3. Ensure no extra spaces or characters

### "Connection refused"

1. Check the URL is correct
2. Verify the server is running
3. Check firewall/network settings

---

## Related Commands

- `/k:mcp <task> <server>` - Execute MCP operations
- `claude mcp list` - List configured servers
- `claude mcp remove <name>` - Remove a server

---

## Notes

- API keys should be stored in environment variables, not in code
- For team projects, document MCP setup in `.claude/settings.local.json` (gitignored)
- Knowz personal API keys (`ukz_`) are user-scoped; tenant keys (`kz_`) are organization-scoped
