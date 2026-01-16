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

## ⛔ CRITICAL: READ BEFORE PROCEEDING ⛔

**THIS COMMAND INITIALIZES A WORKGROUP AND HANDS OFF TO THE ORCHESTRATOR.**

YOU MUST:
1. Create the WorkGroup directory and state files
2. Gather initial context
3. Display summary
4. **SPAWN THE ORCHESTRATOR to drive the workflow**

❌ DO NOT:
- Write any implementation code yourself
- Modify source files directly
- Skip to implementation
- Bypass the orchestrator handoff

**WORKFLOW IS MANDATORY (driven by orchestrator):**
```
/k:work → [orchestrator] → spec → plan → execute → audit → finalize
```

**AFTER COMPLETING INITIALIZATION, YOU MUST:**
1. Display the WorkGroup summary
2. Spawn the `k-orchestrator` agent via Task tool (see "Orchestrator Handoff" section)
3. The orchestrator takes over from there

---

# /k:work - Start New WorkGroup

## Usage

```
/k:work "Implement user authentication with OAuth2"
/k:work "Add pagination to API endpoints" --mode=auto
/k:work "Refactor database layer" --mode=step
```

## What It Does

Creates a new WorkGroup session with a defined goal, initializing the tracking state and preparing for the specification phase.

### Execution Modes

| Mode | Description |
|------|-------------|
| `auto` | Runs through all phases automatically, pausing only on errors |
| `guided` | Prompts for confirmation between major phases |
| `step` | Requires explicit approval for each step |

### Step-by-Step Process

1. **Validate Environment**
   - Check `knowz/` directory exists (run `/k:init` if missing)
   - Load `knowz/config.yaml` settings
   - Verify no conflicting active WorkGroup

2. **Generate Slug and WorkGroup ID**

   **Slug Generation Rules:**
   - Extract key nouns and verbs from goal
   - Remove stop words (the, a, an, to, for, with, and, of)
   - Convert to kebab-case
   - Limit to 3-5 words
   - Lowercase only

   **Examples:**
   | Goal | Slug | WorkGroup ID |
   |------|------|--------------|
   | "Implement user authentication with OAuth2" | `user-auth-oauth2` | `wg-user-auth-oauth2-20240115` |
   | "Add pagination to API endpoints" | `api-pagination` | `wg-api-pagination-20240115` |
   | "Configure custom domains for Azure" | `azure-custom-domains` | `wg-azure-custom-domains-20240115` |

3. **Extract Keywords**
   - Identify searchable terms from goal
   - Include: technologies, actions, components
   - Store in state.json and README.md for search

4. **Create WorkGroup Directory**
   ```
   knowz/workgroups/wg-{YYYYMMDD}-{slug}/
   ├── README.md            # Human-readable documentation
   ├── state.json           # Machine-readable state
   ├── timeline.log         # Timestamped event log
   └── context/             # Gathered context files
   ```

5. **Analyze Goal**
   - Parse goal statement for key requirements
   - Identify affected system areas
   - Detect potential dependencies
   - Estimate complexity (small/medium/large)

6. **Gather Initial Context**
   - If `knowz/scans/` exists, load relevant sections
   - Scan codebase for related files
   - Store context in `context/` directory

7. **Initialize Dual-Format Files**

   **README.md (Human-Readable):**
   ```markdown
   # WorkGroup: User Authentication with OAuth2

   **ID:** `wg-user-auth-oauth2-20240115`
   **Created:** 2024-01-15T10:30:00Z
   **Status:** Planning - In Progress

   ## Goal
   Implement user authentication with OAuth2 for secure login.

   ## Keywords
   authentication, oauth2, user, login, security

   ## Requirements
   - Support Google and GitHub OAuth providers
   - Store refresh tokens securely
   - Implement session management
   ```

   **state.json (Machine-Readable):**
   ```json
   {
     "workgroup_id": "wg-user-auth-oauth2-20240115",
     "slug": "user-auth-oauth2",
     "title": "User Authentication with OAuth2",
     "primary_goal": "Implement user authentication with OAuth2",
     "keywords": ["authentication", "oauth2", "user", "login", "security"],
     "created_at": "2024-01-15T10:30:00Z",
     "current_phase": "1",
     "phases": {
       "spec": "pending",
       "plan": "pending",
       "execute": "pending",
       "audit": "pending",
       "finalize": "pending"
     }
   }
   ```

8. **Display Summary**
   - Show WorkGroup ID (slug-based, searchable)
   - Display extracted keywords
   - Display detected complexity
   - List gathered context files
   - Suggest next command (`/k:spec`)

## Agents Delegated

| Agent | Purpose |
|-------|---------|
| `k-context-gatherer` | Scans codebase for relevant files and patterns |
| `k-complexity-analyzer` | Estimates scope and identifies risks |

## Expected Outcomes

- New WorkGroup directory created under `knowz/workgroups/`
- `goal.md` with parsed requirements
- `state.json` initialized at "spec" phase
- Context gathered and ready for specification

## State Transitions

```
[start] → initialized → spec → plan → execute → audit → finalize → [complete]
```

## Mode Behavior

### Auto Mode
```
/k:work "goal" --mode=auto
```
After initialization, automatically proceeds through all phases via orchestrator.

### Guided Mode (Default)
```
/k:work "goal" --mode=guided
```
After initialization, spawns orchestrator which pauses between phases for review.

### Step Mode
```
/k:work "goal" --mode=step
```
After initialization, spawns orchestrator which pauses after each significant action.

## Orchestrator Handoff (CRITICAL)

**After Step 8 (Display Summary), you MUST spawn the orchestrator:**

```
Use Task tool to spawn k-orchestrator agent with:
- subagent_type: "k-orchestrator"
- prompt: |
    Resume orchestration for WorkGroup: {wg-id}
    Goal: {goal-statement}
    Mode: {auto|guided|step}
    Current Phase: spec (pending)

    Drive the workflow through all phases:
    1. spec → Delegate to k-spec-chief
    2. plan → Delegate to k-dependency-analyzer, k-cycle-optimizer
    3. execute → Spawn k-impl-agent subagents per cycle
    4. audit → Delegate to k-arc-auditor
    5. finalize → Delegate to k-finalization

    State file: knowz/workgroups/{wg-id}/state.json

    CRITICAL: You are a ROUTER, not a worker.
    - Do NOT read files yourself - spawn subagents to investigate
    - Do NOT explore code yourself - spawn subagents to explore
    - Do NOT analyze anything yourself - spawn subagents to analyze
    - ONLY read state.json, spawn subagents, receive summaries, update state
```

**The orchestrator takes over and drives the end-to-end workflow.**

**Orchestrator stays lean by delegation:**
- ALL exploration → subagents
- ALL analysis → subagents
- ALL implementation → subagents
- Orchestrator only routes and decides based on subagent summaries

In guided/step modes, the orchestrator will pause at appropriate checkpoints.
In auto mode, it runs through all phases, pausing only on errors.

## Enforcement Policy Integration

This command creates the WorkGroup that is **required** by other Knowz commands when enforcement is enabled.

### WorkGroup Gate
When `enforcement-policy.yaml` has `workgroups.require_active: true`:
- `/k:spec`, `/k:plan`, `/k:execute`, `/k:audit`, `/k:finalize` will BLOCK without active WorkGroup
- Users will see a warning and must run `/k:work` first (or explicitly override)

### Enforcement Policy Location
```
.claude/rules/enforcement-policy.yaml
```

### Bypassing WorkGroup Requirement
If a user explicitly requests to bypass (after seeing the warning):
- The bypass is logged to `knowz/logs/enforcement.log`
- Work can proceed but without WorkGroup tracking benefits

### Pre-Authorization
Users can pre-authorize WorkGroup bypass in `enforcement-policy.yaml`:
```yaml
pre_authorized_bypasses:
  - gate: workgroup
    condition: "command == 'k:fix'"   # Allow /k:fix without WorkGroup
    reason: "Quick fixes don't need full tracking"
```

## Notes

- Only one WorkGroup can be active at a time
- Use `/k:continue` to resume an interrupted WorkGroup
- Goal statement should be clear and actionable
- Context gathering may take time on large codebases
- **Other commands require active WorkGroup when enforcement is enabled**

---

## ⚠️ REMINDER: HAND OFF TO ORCHESTRATOR ⚠️

**DO NOT IMPLEMENT DIRECTLY. SPAWN THE ORCHESTRATOR.**

After Step 8 (Display Summary), spawn the orchestrator agent:

```
Task tool call:
- subagent_type: "k-orchestrator"
- description: "Orchestrate WorkGroup workflow"
- prompt: (see Orchestrator Handoff section above)
```

The orchestrator will drive the complete workflow:
1. **spec** - Create and refine specification
2. **plan** - Create execution plan
3. **execute** - Delegate to k-impl-agent subagents
4. **audit** - Verify via k-arc-auditor
5. **finalize** - Commit via k-finalization

**NEVER SKIP THE ORCHESTRATOR. NEVER IMPLEMENT DIRECTLY.**
