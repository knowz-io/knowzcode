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

```
Use Task tool to spawn k-orchestrator agent with:
- subagent_type: "k-orchestrator"
- prompt: |
    Orchestrate WorkGroup: {wg-id}
    Goal: {goal-statement}
    Mode: {auto|guided|step}
    Current Phase: discover (pending)

    Start with discovery phase:
    1. Spawn k-context-gatherer → get relevant files summary
    2. Spawn k-complexity-analyzer → get complexity estimate
    3. Update state.json with discovery results
    4. Display summary to user

    Then continue through phases:
    5. spec → Delegate to k-spec-chief
    6. plan → Delegate to k-planner
    7. execute → Spawn k-impl-agent subagents per cycle
    8. audit → Delegate to k-arc-auditor
    9. finalize → Delegate to k-finalization

    State file: knowz/workgroups/{wg-id}/state.json

    CRITICAL: You are a ROUTER, not a worker.
    - Do NOT read files yourself - spawn subagents
    - Do NOT explore code yourself - spawn subagents
    - Do NOT analyze anything yourself - spawn subagents
    - ONLY spawn subagents, receive summaries, update state
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
