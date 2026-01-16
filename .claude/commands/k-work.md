---
name: k:work
description: Start a new WorkGroup with a defined goal
arguments:
  - name: goal
    description: The goal or objective for this WorkGroup
    required: true
  - name: mode
    description: Execution mode (auto|guided|step)
    required: false
    default: guided
---

## ⛔ CRITICAL: STAY MINIMAL ⛔

**THIS COMMAND ONLY CREATES THE WORKGROUP AND SPAWNS THE ORCHESTRATOR.**

YOU MUST:
1. Create the WorkGroup directory and state.json
2. **IMMEDIATELY spawn the orchestrator**

❌ DO NOT (these fill main context):
- Gather context yourself
- Analyze the goal yourself
- Read codebase files yourself
- Do ANY research yourself

**The orchestrator handles discovery via subagents.**

```
/k:work → [spawn orchestrator immediately] → orchestrator handles everything
```

---

# /k:work - Start New WorkGroup

## Usage

```
/k:work "Implement user authentication with OAuth2"
/k:work "Add pagination to API endpoints" --mode=auto
/k:work "Refactor database layer" --mode=step
```

## What It Does

Creates a new WorkGroup session and immediately hands off to the orchestrator. The orchestrator drives all phases including discovery.

### Execution Modes

| Mode | Description |
|------|-------------|
| `auto` | Orchestrator runs all phases automatically |
| `guided` | Orchestrator pauses between phases for review |
| `step` | Orchestrator pauses after each significant action |

## Step-by-Step Process (MINIMAL)

### 1. Validate Environment
- Check `knowz/` directory exists (run `/k:init` if missing)
- Verify no conflicting active WorkGroup

### 2. Generate Slug and WorkGroup ID

**Slug Generation Rules:**
- Extract key nouns and verbs from goal
- Remove stop words (the, a, an, to, for, with, and, of)
- Convert to kebab-case, limit to 3-5 words

**Examples:**
| Goal | WorkGroup ID |
|------|--------------|
| "Implement user authentication with OAuth2" | `wg-user-auth-oauth2-20240115` |
| "Add pagination to API endpoints" | `wg-api-pagination-20240115` |

### 3. Create WorkGroup Directory

```
knowz/workgroups/wg-{YYYYMMDD}-{slug}/
├── README.md            # Basic info only
├── state.json           # Initialized state
├── timeline.log         # Event log
└── context/             # Empty - orchestrator fills this
```

### 4. Initialize State

**state.json:**
```json
{
  "workgroup_id": "wg-{slug}-{date}",
  "slug": "{slug}",
  "primary_goal": "{goal}",
  "mode": "{auto|guided|step}",
  "created_at": "{timestamp}",
  "current_phase": "discover",
  "phases": {
    "discover": "pending",
    "spec": "pending",
    "plan": "pending",
    "execute": "pending",
    "audit": "pending",
    "finalize": "pending"
  }
}
```

### 5. Spawn Orchestrator IMMEDIATELY

**Do not do any research or context gathering. Spawn the orchestrator now.**

## Orchestrator Handoff

⚠️ **USE THIS PROMPT EXACTLY - DO NOT ADD INVESTIGATION STEPS** ⚠️

When spawning the orchestrator, use ONLY this prompt template. Do NOT add:
- Curl commands
- Investigation steps
- "Check this field"
- "Look at Sentry"
- Any specific instructions about HOW to investigate

The orchestrator will spawn subagents to figure out HOW. You only provide WHAT (the goal).

```
Use Task tool to spawn k-orchestrator agent with:
- subagent_type: "k-orchestrator"
- prompt: |
    Orchestrate WorkGroup: {wg-id}
    Goal: {goal-statement}
    Mode: {auto|guided|step}
    Current Phase: discover (pending)

    State file: knowz/workgroups/{wg-id}/state.json

    YOU ARE A ROUTER. Delegate ALL work to subagents:

    Phase 0 - Discovery (spawn these in parallel):
    - Spawn k-context-gatherer with goal → returns relevant files
    - Spawn k-complexity-analyzer with goal → returns complexity estimate

    Phase 1-5 - Delegate to phase agents:
    - spec → k-spec-chief
    - plan → k-parallel-planner
    - execute → k-impl-agent (up to 3 per cycle)
    - audit → k-arc-auditor
    - finalize → k-finalization

    DO NOT use Read, Grep, Glob, Bash, or curl yourself.
    DO NOT investigate yourself.
    ONLY spawn subagents and update state.
```

**WRONG** (adds investigation steps):
```
prompt: |
  Goal: Fix summary not showing
  1. Use curl to check the API...  ← WRONG
  2. Check if field exists...      ← WRONG
```

**CORRECT** (only goal, let orchestrator delegate):
```
prompt: |
  Goal: Fix summary not showing on staging for knowledge item X
  Mode: auto
  Current Phase: discover

  YOU ARE A ROUTER. Spawn subagents for discovery.
```

## Orchestrator Spawn Failure

If the Task tool returns an error (e.g., "tool use concurrency"):

**NEVER fall back to doing work in main context.**

Instead:
1. Ensure state.json is saved
2. Tell the user: "Orchestrator spawn failed. Run `/k:continue --workgroup={wg-id}` to retry."
3. STOP - do not do any work yourself

## State Transitions

```
[k:work creates] → discover → spec → plan → execute → audit → finalize → [complete]
                   ↑
                   orchestrator starts here
```

## Notes

- k:work does MINIMAL work - just creates WorkGroup and spawns orchestrator
- ALL research, context gathering, analysis happens in orchestrator via subagents
- Only one WorkGroup can be active at a time
- Use `/k:continue --workgroup={wg-id}` to resume

---

## ⚠️ REMINDER ⚠️

**DO NOT:**
- Gather context yourself
- Analyze the goal yourself
- Read files yourself
- Do ANY research yourself

**DO:**
1. Create WorkGroup directory + state.json
2. Spawn orchestrator immediately
3. Stop - orchestrator takes over
