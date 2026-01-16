---
name: k:spec
description: Draft and refine specifications for the current WorkGroup
arguments:
  - name: action
    description: Action to perform (draft|refine|approve)
    required: false
    default: draft
  - name: focus
    description: Specific area to focus specification on
    required: false
---

# /k:spec - Specification Phase

## Usage

```
/k:spec                           # Draft new specification
/k:spec --action=refine           # Refine existing draft
/k:spec --action=approve          # Approve and finalize spec
/k:spec --focus="API endpoints"   # Focus on specific area
```

## What It Does

Combines Discover (drafting) and Design (refinement) into a unified specification workflow. Creates detailed technical specifications that guide the execution phase.

## Pre-Specification Enforcement Gates

**CRITICAL: Before any specification work, these gates are checked.**

### Gate 1: WorkGroup Gate
```
IF enforcement-policy.yaml → workgroups.require_active == true:
  Verify active WorkGroup exists
  IF no WorkGroup: BLOCK - Run /k:work first
```

### Gate 2: Phase Sequence Gate
```
IF enforcement-policy.yaml → phases.enforce_sequence == true:
  Verify current_phase == "discover" or WorkGroup just created
  IF phase incorrect: BLOCK - Complete required phases first
```

**WorkGroup Gate Block Message:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  WORKGROUP GATE BLOCKED                              │
│                                                         │
│ No active WorkGroup found.                              │
│                                                         │
│ Recommended: Run /k:work first to create a WorkGroup    │
│                                                         │
│ To proceed anyway, say: "proceed without workgroup"     │
└─────────────────────────────────────────────────────────┘
```

### Bypass Logging
All bypasses logged to `knowz/logs/enforcement.log`:
```json
{
  "timestamp": "2026-01-15T...",
  "gate": "workgroup",
  "command": "/k:spec",
  "bypass_type": "user_override",
  "user_response": "proceed without workgroup"
}
```

### Step-by-Step Process

#### Discover: Requirements Analysis

1. **Load WorkGroup Context**
   - Read `knowz/workgroups/wg-{date}-{slug}/README.md`
   - Load gathered context from `context/` directory
   - Check for existing `knowz/scans/` documentation

2. **Analyze Requirements**
   - Break goal into discrete requirements
   - Identify technical constraints
   - Map dependencies between components
   - Flag ambiguities for clarification

3. **Generate Specification Draft**

   **Naming Convention:**
   - Derive spec name from workgroup slug + component focus
   - Format: `spec-{component}-{feature}-{date}.md`
   - Example: `spec-api-auth-oauth2-20240115.md`

   - Create `knowz/specs/drafts/spec-{date}-{slug}.md`
   - Structure:
     ```markdown
     # Specification: <Goal Summary>

     ## Overview
     ## Requirements
     ### Functional Requirements
     ### Non-Functional Requirements
     ## Technical Design
     ### Components Affected
     ### Data Flow
     ### API Changes
     ## Dependencies
     ## Risks and Mitigations
     ## Open Questions
     ```

4. **Create Task Breakdown**
   - Identify discrete implementation tasks
   - Estimate relative complexity per task
   - Group related tasks
   - Store in `knowz/workgroups/wg-{date}-{slug}/tasks-draft.json`

#### Design: Specification Refinement

5. **Review Draft**
   - Validate technical feasibility
   - Check for completeness
   - Identify gaps in specification

6. **Resolve Ambiguities**
   - Address open questions
   - Clarify edge cases
   - Add missing details

7. **Finalize Specification**
   - Move to `knowz/specs/approved/spec-{date}-{slug}.md`
   - Update WorkGroup state.json to "plan" phase
   - Sync README.md with current status
   - Generate specification checksum for tracking

## Agents Delegated

| Agent | Phase | Purpose |
|-------|-------|---------|
| `k-requirement-analyzer` | discover | Breaks down goal into requirements |
| `k-spec-drafter` | discover | Generates technical specification |
| `k-task-identifier` | discover | Extracts discrete tasks |
| `k-spec-reviewer` | design | Reviews for completeness |
| `k-spec-refiner` | design | Addresses gaps and ambiguities |

## Expected Outcomes

### After Draft Phase
- `knowz/specs/drafts/spec-{date}-{slug}.md` created
- `knowz/workgroups/wg-{date}-{slug}/tasks-draft.json` with task list
- List of open questions (if any)

### After Refine Phase
- `knowz/specs/approved/spec-{date}-{slug}.md` finalized
- All open questions resolved
- WorkGroup state.json and README.md updated
- WorkGroup ready for planning phase

## Specification Structure

```markdown
# Specification: User Authentication with OAuth2

## Overview
Brief description of what this change accomplishes.

## Requirements

### Functional Requirements
- FR-1: Users can authenticate via Google OAuth2
- FR-2: Session tokens stored securely
- FR-3: Logout invalidates all sessions

### Non-Functional Requirements
- NFR-1: Authentication completes within 2 seconds
- NFR-2: Support 1000 concurrent auth requests

## Technical Design

### Components Affected
| Component | Change Type | Description |
|-----------|-------------|-------------|
| AuthController | New | Handle OAuth callbacks |
| UserService | Modified | Add OAuth user creation |
| SessionStore | Modified | Token management |

### Data Flow
[Description or diagram of data flow]

### API Changes
| Endpoint | Method | Description |
|----------|--------|-------------|
| /auth/google | GET | Initiate OAuth flow |
| /auth/callback | GET | Handle OAuth callback |

## Dependencies
- Google OAuth2 library (v2.x)
- Session management middleware

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| OAuth provider downtime | High | Implement fallback auth |

## Open Questions
- [ ] Should we support multiple OAuth providers initially?
```

## Notes

- Specification quality directly impacts execution success
- Take time in guided/step mode to review thoroughly
- Specs are versioned; previous versions preserved
- Use `--focus` to work on specific sections incrementally
