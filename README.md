# Knowz Framework

## Overview

Knowz is a structured AI development framework designed for context-efficient agent orchestration. It provides a hierarchical system of commands, specifications, and delegation patterns that enable complex multi-agent workflows while maintaining strict context budget discipline.

### Core Philosophy

- **Context is Currency**: Every token spent should deliver value
- **Delegation over Accumulation**: Distribute work to sub-agents rather than accumulating context
- **Specification-Driven Development**: Clear specs enable predictable outcomes
- **Return Contracts**: Every delegation must define what comes back

## Design Heritage

Knowz v0.1.0 consolidates the best features from two frameworks:

| Source | What We Adopted | Why |
|--------|-----------------|-----|
| **GSD (Get Shit Done)** | Fresh 175k context per subagent | Eliminates context degradation |
| | Cycle-based parallel execution | 3-5x faster execution |
| | 7-document brownfield analysis | Comprehensive codebase understanding |
| | Max 5 tasks per cycle | Prevents scope creep, ensures quality |
| **KnowzCode v2** | 8-section spec template | Forces complete thinking upfront |
| | Read-only audit agent (Phase 2B) | Catches false "done" claims |
| | As-built documentation | Specs stay accurate |
| | Quality scoring (0-100) | Objective measurement |
| | WorkGroup organization | Groups related changes |

**NEW in Knowz v0.1.0:**
- 30k orchestrator context budget (prevents bloat)
- Return contracts (<1k tokens per subagent return)
- MCP isolation (use MCP without context pollution)
- Optional Gemini CLI fallback (for 1M+ token tasks)

For detailed comparison, see [COMPARISON.md](./COMPARISON.md).

## Key Improvements from v2

### 1. Context Protection System

| Feature | v2 (KnowzCode) | v3 (Knowz) |
|---------|----------------|------------|
| Context tracking | Manual | Automated budget monitoring |
| Overflow prevention | None | Hard limits with warnings |
| Sub-agent isolation | Partial | Full context isolation |
| Return contracts | Informal | Structured validation |

### 2. Cycle Execution Model

Knowz introduces cycle-based execution for parallel workloads:

```
Cycle 1: [Task A] [Task B] [Task C]  ← Execute in parallel (max 5 per cycle)
          ↓         ↓         ↓
Cycle 2: [Task D depends on A,B]     ← Sequential dependency
          ↓
Cycle 3: [Final aggregation]
```

Benefits:
- Reduced total execution time (3-5x faster)
- Better resource utilization
- Clear dependency visualization
- Quality verification between cycles

### 3. MCP Manager

The Model Context Protocol (MCP) manager provides context-isolated access to external tools:

- **Context Isolation**: MCP tools run in isolated subagents, preventing schema pollution
- **Gemini-First Execution**: Uses Gemini API for MCP calls when configured, falls back to Claude
- **Cloud & Local Servers**: Supports HTTP-based cloud servers (Knowz) and local npx servers (Playwright, GitHub)
- **Easy Setup**: `/k:mcp setup` command with interactive configuration

#### Knowz Integration

Connect to your personal knowledge base:

```bash
# Interactive setup with registration
/k:mcp setup knowz

# Or manual configuration
export KNOWZ_API_KEY="ukz_your_key_here"
claude mcp add --transport http knowz "https://mcp.knowz.io/mcp" --header "Authorization: Bearer ${KNOWZ_API_KEY}"
```

Once configured, use natural language:
- "Search my knowledge for React patterns"
- "What do I know about authentication?"
- "Save this meeting summary to my notes"

#### Supported MCP Servers

| Server | Type | Setup Command |
|--------|------|---------------|
| Knowz | Cloud | `/k:mcp setup knowz` |
| Playwright | Local | `/k:mcp setup playwright` |
| GitHub | Local | `/k:mcp setup github` |
| Sentry | Local | `/k:mcp setup sentry` |
| Custom | HTTP | `/k:mcp setup https://your-server.com` |

## Quick Start Guide

### 1. Initialize a Project

```
/k:init
```

This creates the standard directory structure and configuration files.

### 2. Create a Specification

```
/k:spec create feature-name
```

Write your specification following the template provided.

### 3. Validate the Specification

```
/k:spec validate feature-name
```

Ensures the spec meets checkpoints (≥70% score required).

### 4. Execute with Delegation

```
/k:execute feature-name --delegate
```

Spawns sub-agents as needed, respecting context budgets.

### 5. Review Results

```
/k:audit feature-name
```

Generates completion report and validates return contracts.

## Directory Structure

```
project-root/
├── .claude/
│   ├── rules/                    # Agent behavior rules
│   │   ├── checkpoints.md      # Quality thresholds
│   │   ├── context-limits.md     # Budget configurations
│   │   └── delegation-rules.md   # Sub-agent policies
│   ├── commands/                 # Custom command definitions
│   └── settings.json             # Project settings
├── knowz/
│   ├── specs/                    # Feature specifications
│   │   ├── templates/            # Spec templates
│   │   └── active/               # Current specs
│   ├── agents/                   # Agent configurations
│   │   ├── profiles/             # Agent capability profiles
│   │   └── contracts/            # Return contract definitions
│   ├── plans/                     # Cycle execution plans
│   └── audits/                   # Completion audits
└── src/                          # Your source code
```

## Command Reference

| Command | Description | Example |
|---------|-------------|---------|
| `/k:init` | Initialize Knowz in current project | `/k:init` |
| `/k:spec create <name>` | Create new specification | `/k:spec create auth-system` |
| `/k:spec validate <name>` | Validate spec quality | `/k:spec validate auth-system` |
| `/k:spec list` | List all specifications | `/k:spec list` |
| `/k:execute <name>` | Execute a specification | `/k:execute auth-system` |
| `/k:execute <name> --delegate` | Execute with sub-agents | `/k:execute auth-system --delegate` |
| `/k:plan <name>` | Create execution plan with cycles | `/k:plan auth-system` |
| `/k:mcp setup` | Configure MCP servers (Knowz, etc.) | `/k:mcp setup knowz` |
| `/k:mcp <task> <server>` | Execute MCP operation | `/k:mcp "search for X" knowz` |
| `/k:audit <name>` | Generate completion audit | `/k:audit auth-system` |
| `/k:budget` | Show context budget status | `/k:budget` |
| `/k:budget reset` | Reset budget tracking | `/k:budget reset` |

## Migration Guide from KnowzCode v2

For detailed migration instructions, see [MIGRATION.md](./MIGRATION.md).

### Quick Migration Checklist

1. [ ] Rename `knowzcode/` directory to `knowz/`
2. [ ] Rename all `knowzcode_*` files to remove prefix
3. [ ] Update commands from `/kc:` to `/k:`
4. [ ] Update prefixes from `KnowzCode:` to `Knowz:`
5. [ ] Add new v3 directories (`plans/`, `agents/contracts/`)
6. [ ] Update checkpoint thresholds
7. [ ] Define return contracts for existing specs
8. [ ] Run verification suite

## Configuration

### Context Budget Settings

Edit `.claude/rules/context-limits.md`:

```markdown
## Budget Configuration

- Main agent: 80,000 tokens max
- Sub-agent: 20,000 tokens max
- Warning threshold: 70%
- Hard limit: 95%
```

### Checkpoints

Edit `.claude/rules/checkpoints.md`:

```markdown
## Quality Thresholds

- Spec quality score: ≥70%
- Audit completion: ≥90%
- Return contract validation: 100%
```

## Support

- Documentation: See `/knowz/docs/`
- Issues: Report via project issue tracker
- Updates: Check for framework updates with `/k:update check`

## Version History

| Version | Release | Key Changes |
|---------|---------|-------------|
| v0.1.0 | 2025-01 | Context protection, cycle execution, MCP manager, Knowz integration |
| v2.x | 2024 | KnowzCode - Basic delegation, specs |
| v1.x | 2024 | Initial framework |

---

## Acknowledgments

Knowz is built upon the foundations of two excellent projects:

- **[Noderr](https://github.com/kaithoughtarchitect/noderr)** by @kaithoughtarchitect - Pioneering work in systematic AI-driven development
- **[GSD (Get Shit Done)](https://github.com/glittercowboy/get-shit-done)** by @glittercowboy - Context engineering and parallel execution patterns

We're grateful for their contributions to the AI development tooling ecosystem.

---

*Knowz - Context-Efficient Agent Orchestration*
