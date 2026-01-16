---
name: k:finalize
description: Update as-built specifications and commit changes
arguments:
  - name: message
    description: Custom commit message (auto-generated if omitted)
    required: false
  - name: no-commit
    description: Skip git commit, only update as-built specs
    required: false
    default: false
  - name: amend
    description: Amend to previous commit instead of new commit
    required: false
    default: false
---

# /k:finalize - As-Built Spec Updates + Commit

## Usage

```
/k:finalize                              # Auto-generate commit message
/k:finalize --message="feat: add OAuth"  # Custom commit message
/k:finalize --no-commit                  # Only update specs, no commit
/k:finalize --amend                      # Amend previous commit
```

## What It Does

Completes the WorkGroup by updating specifications to reflect actual implementation (as-built), generating comprehensive commit messages, and creating the git commit.

## Pre-Finalization Enforcement Gates

**CRITICAL: Before any finalization, these gates are checked.**

### Gate 1: WorkGroup Gate
```
IF enforcement-policy.yaml → workgroups.require_active == true:
  Verify active WorkGroup exists
  IF no WorkGroup: BLOCK
```

### Gate 2: Phase Sequence Gate
```
IF enforcement-policy.yaml → phases.enforce_sequence == true:
  Verify current_phase == "check"
  IF phase incorrect: BLOCK - Complete check phase first
```

### Gate 3: Audit Gate
```
IF enforcement-policy.yaml → checkpoints.audit.blocking == true:
  Read audit results from knowz/workgroups/{wgid}_audit.json

  Check verdict:
    - IF require_verdict == "pass" → audit verdict must be "pass"
    - IF require_verdict == "conditional" → verdict must be "pass" or "conditional"

  Check completion:
    - IF completion < min_completion (default: 90%): FAIL

  IF gate fails:
    → Display warning with verdict and completion
    → STOP execution
    → Wait for user override
```

**Audit Gate Block Message:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  AUDIT GATE BLOCKED                                  │
│                                                         │
│ Audit verdict: fail                                     │
│ Required: pass                                          │
│ Completion: 78%                                         │
│ Required: 90%                                           │
│                                                         │
│ Outstanding issues:                                     │
│ • 3 acceptance criteria not verified                    │
│ • 1 critical issue unresolved                           │
│                                                         │
│ Recommended: Address audit findings before finalizing   │
│                                                         │
│ To proceed anyway, say: "finalize without passing audit"│
└─────────────────────────────────────────────────────────┘
```

### Gate 4: Git Branch Check
```
IF enforcement-policy.yaml → git.require_branch == true:
  Get current git branch
  IF branch in policy.git.protected_branches (main, master):
    → WARN: "On protected branch. Create feature branch?"
    → Note in output (does not block by default)
```

### Pre-Authorization Check
```
IF gate fails:
  Check enforcement-policy.yaml → pre_authorized_bypasses
  IF matching bypass found: Log and proceed
  ELSE: Display warning and STOP
```

### Bypass Logging
All bypasses logged to `knowz/logs/enforcement.log`:
```json
{
  "timestamp": "2026-01-15T...",
  "gate": "audit",
  "threshold": { "verdict": "pass", "completion": 90 },
  "actual": { "verdict": "fail", "completion": 78 },
  "bypass_type": "user_override",
  "user_response": "finalize without passing audit",
  "workgroup": "wg-xxx"
}
```

### Step-by-Step Process

1. **Verify Prerequisites**
   - Check audit passed (no critical/major issues)
   - Verify all cycles completed successfully
   - Ensure working directory is clean (no untracked files)

2. **Generate As-Built Specification**

   a. **Compare Planned vs Actual**
      - Diff approved spec against implementation
      - Identify any deviations or additions
      - Note removed or modified requirements

   b. **Create As-Built Document**
      - Copy approved spec to `knowz/specs/as-built/<wg-id>-as-built.md`
      - Annotate with actual implementation details
      - Mark any deviations with explanations
      - Add implementation notes

   c. **Update Cross-References**
      - Link to actual file paths
      - Update API documentation
      - Sync with any existing docs

3. **Prepare Commit**

   a. **Stage Files**
      - Add all modified implementation files
      - Add as-built specification
      - Add audit reports
      - Exclude logs and temp files

   b. **Generate Commit Message**
      ```
      <type>(<scope>): <description>

      <body with details>

      WorkGroup: <wg-id>
      Specification: knowz/specs/as-built/<wg-id>-as-built.md

      Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
      ```

   c. **Determine Commit Type**
      - `feat`: New feature
      - `fix`: Bug fix
      - `refactor`: Code restructuring
      - `docs`: Documentation only
      - `test`: Test additions
      - `chore`: Maintenance

4. **Execute Commit**
   - Validate staged files
   - Run pre-commit hooks
   - Create commit
   - Update WorkGroup state to "complete"

5. **Archive WorkGroup**
   - Move plan to `knowz/plans/archive/`
   - Compress logs
   - Update `knowz/state.json`
   - Clean up temporary files

6. **Generate Summary**
   - Display commit hash
   - Show files changed
   - Provide WorkGroup summary
   - Suggest next steps

## Agents Delegated

| Agent | Purpose |
|-------|---------|
| `k-spec-differ` | Compares planned vs actual implementation |
| `k-as-built-generator` | Creates as-built documentation |
| `k-commit-composer` | Generates semantic commit message |

## Expected Outcomes

- `knowz/specs/as-built/<wg-id>-as-built.md` created
- Git commit with all changes
- WorkGroup archived
- Clean state for next WorkGroup

## As-Built Specification Format

```markdown
# As-Built Specification: User Authentication with OAuth2

## Implementation Summary
- **WorkGroup ID:** wg-20240115-a3f2
- **Completed:** 2024-01-15T16:45:00Z
- **Total Tasks:** 6
- **Cycles Executed:** 3

## Original vs Actual

### Planned Changes
| Component | Planned | Actual | Notes |
|-----------|---------|--------|-------|
| AuthController | New | Created | As specified |
| UserService | Modify | Modified | Added extra method |
| SessionStore | Modify | Modified | As specified |

### Deviations
1. **Added `refreshToken` method to UserService**
   - Reason: Required for token refresh flow
   - Impact: None (additive change)

## Implementation Details

### Files Created
- `src/auth/AuthController.ts` (156 lines)
- `src/auth/oauth.ts` (89 lines)
- `src/auth/session.ts` (67 lines)
- `config/oauth.ts` (23 lines)
- `tests/auth.test.ts` (134 lines)

### Files Modified
- `src/routes/index.ts` (+12 lines)
- `src/models/user.ts` (+34 lines)
- `src/services/UserService.ts` (+45 lines)

### Dependencies Added
- google-auth-library@8.7.0

## Test Coverage
- New tests: 12
- All passing: Yes
- Coverage: 87%

## API Changes
| Endpoint | Method | Status |
|----------|--------|--------|
| /auth/google | GET | Implemented |
| /auth/callback | GET | Implemented |
| /auth/logout | POST | Implemented |
| /auth/refresh | POST | Added (not in original spec) |

## Performance Notes
- OAuth flow completes in ~800ms average
- Session creation: ~50ms
- Meets NFR-1 (< 2 seconds)
```

## Commit Message Examples

### Feature Commit
```
feat(auth): implement OAuth2 authentication with Google

- Add AuthController with OAuth flow endpoints
- Implement secure session management
- Create user provisioning for OAuth users
- Add comprehensive test coverage (87%)

WorkGroup: wg-20240115-a3f2
Specification: knowz/specs/as-built/wg-20240115-a3f2-as-built.md

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

### Bug Fix Commit
```
fix(api): resolve pagination offset calculation error

- Fix off-by-one error in page offset
- Add boundary checks for edge cases
- Update tests to cover edge cases

WorkGroup: wg-20240115-b7c9
Specification: knowz/specs/as-built/wg-20240115-b7c9-as-built.md

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

## Notes

- Finalize only runs if audit passed
- As-built specs provide implementation record
- Commit message follows Conventional Commits
- Use `--no-commit` to review changes first
- WorkGroup data archived, not deleted
