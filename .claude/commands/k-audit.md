---
name: k:audit
description: Perform completeness audit on implemented changes
arguments:
  - name: type
    description: Audit type (completeness|security|architecture|all)
    required: false
    default: completeness
  - name: security
    description: Include security-focused audit
    required: false
    default: false
  - name: architecture
    description: Include architecture review
    required: false
    default: false
  - name: fix
    description: Automatically fix minor issues found
    required: false
    default: false
---

# /k:audit - Completeness Audit (Check Phase)

## Usage

```
/k:audit                          # Standard completeness audit
/k:audit --security               # Include security audit
/k:audit --architecture           # Include architecture review
/k:audit --security --architecture  # Full audit suite
/k:audit --type=all               # Run all audit types
/k:audit --fix                    # Auto-fix minor issues
```

## What It Does

Performs comprehensive audits on implemented changes to ensure completeness, security, and architectural integrity before finalization.

## Pre-Audit Enforcement Gates

**CRITICAL: Before any audit, these gates are checked.**

### Gate 1: WorkGroup Gate
```
IF enforcement-policy.yaml → workgroups.require_active == true:
  Verify active WorkGroup exists
  IF no WorkGroup: BLOCK
```

### Gate 2: Phase Sequence Gate
```
IF enforcement-policy.yaml → phases.enforce_sequence == true:
  Verify current_phase == "build"
  IF phase incorrect: BLOCK - Complete build phase first
```

### Gate 3: Build Completion Gate
```
Verify all execution cycles completed successfully
IF any cycle incomplete or failed:
  → Display warning with cycle status
  → STOP execution
  → Wait for user override
```

**Phase Sequence Block Message:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  PHASE SEQUENCE BLOCKED                              │
│                                                         │
│ Cannot run audit before build phase completes.          │
│                                                         │
│ Current phase: design                                   │
│ Required: build                                         │
│                                                         │
│ Recommended: Run /k:execute to complete build phase     │
│                                                         │
│ To proceed anyway, say: "skip to check"                 │
└─────────────────────────────────────────────────────────┘
```

### Bypass Logging
All bypasses logged to `knowz/logs/enforcement.log`:
```json
{
  "timestamp": "2026-01-15T...",
  "gate": "phase_sequence",
  "current_phase": "design",
  "target_phase": "check",
  "bypass_type": "user_override",
  "workgroup": "wg-xxx"
}
```

### Step-by-Step Process

1. **Load Execution Context**
   - Read approved specification from `knowz/specs/approved/`
   - Load execution logs from `knowz/logs/<wg-id>/`
   - Gather all modified files from cycles

2. **Completeness Audit (Default)**

   a. **Specification Compliance**
      - Cross-reference implementation with spec requirements
      - Check all functional requirements addressed
      - Verify non-functional requirements met

   b. **Code Quality Check**
      - Run linting on modified files
      - Check for TODO/FIXME comments
      - Verify documentation added
      - Ensure tests exist for new code

   c. **Integration Verification**
      - Run full test suite
      - Check build succeeds
      - Verify no regression in existing functionality

3. **Security Audit (if --security)**

   a. **Vulnerability Scan**
      - Check for common security anti-patterns
      - Scan for hardcoded credentials
      - Verify input validation
      - Check authentication/authorization

   b. **Dependency Audit**
      - Check for vulnerable dependencies
      - Verify secure versions used
      - Flag deprecated packages

   c. **Security Best Practices**
      - HTTPS enforcement
      - Secure cookie settings
      - CORS configuration
      - SQL injection prevention

4. **Architecture Audit (if --architecture)**

   a. **Design Pattern Compliance**
      - Verify adherence to existing patterns
      - Check separation of concerns
      - Validate module boundaries

   b. **Dependency Analysis**
      - Check for circular dependencies
      - Verify appropriate coupling
      - Validate import structures

   c. **Scalability Review**
      - Identify potential bottlenecks
      - Check resource usage patterns
      - Verify async handling

5. **Generate Audit Report**
   - Create `knowz/audits/<type>/<wg-id>-audit.md`
   - Categorize findings by severity
   - Provide remediation guidance
   - Track actionable items

6. **Handle Findings**
   - Critical: Block finalization
   - Major: Require acknowledgment
   - Minor: Auto-fix if `--fix` enabled
   - Info: Log for reference

## Agents Delegated

| Agent | Audit Type | Purpose |
|-------|------------|---------|
| `k-completeness-auditor` | completeness | Verifies spec compliance |
| `k-security-auditor` | security | Security vulnerability scan |
| `k-architecture-auditor` | architecture | Design and pattern review |
| `k-code-quality-checker` | all | Linting and standards |
| `k-auto-fixer` | all (with --fix) | Fixes minor issues |

## Expected Outcomes

- Audit reports in `knowz/audits/<type>/`
- Issues categorized by severity
- Remediation steps for each finding
- WorkGroup state updated based on results

## Audit Report Structure

```markdown
# Audit Report: <Goal Summary>
Generated: 2024-01-15T14:30:00Z
Type: Completeness + Security

## Summary
| Category | Critical | Major | Minor | Info |
|----------|----------|-------|-------|------|
| Completeness | 0 | 1 | 3 | 2 |
| Security | 0 | 0 | 2 | 5 |
| **Total** | **0** | **1** | **5** | **7** |

## Status: NEEDS ATTENTION
1 major issue requires resolution before finalization.

---

## Critical Issues
None

## Major Issues

### [M-001] Missing error handling in OAuth callback
**Location:** `src/auth/oauth.ts:45`
**Description:** OAuth callback does not handle provider errors gracefully.
**Remediation:** Add try-catch block and proper error response.
**Spec Reference:** NFR-2 (Error Handling)

---

## Minor Issues

### [m-001] Missing JSDoc on AuthController methods
**Location:** `src/auth/AuthController.ts`
**Auto-fixable:** Yes
**Status:** Fixed (--fix enabled)

### [m-002] Console.log statement in production code
**Location:** `src/auth/session.ts:23`
**Auto-fixable:** Yes
**Status:** Fixed (--fix enabled)

---

## Info

### [i-001] New dependency added: google-auth-library
**Note:** Version 8.x is latest stable, good choice.

---

## Verification Checklist
- [x] All functional requirements implemented
- [x] Tests added for new functionality
- [ ] Error handling complete (see M-001)
- [x] Documentation updated
- [x] No security vulnerabilities detected
- [x] Architecture patterns followed
```

## Severity Definitions

| Severity | Definition | Action |
|----------|------------|--------|
| Critical | Blocks deployment, security vulnerability | Must fix |
| Major | Significant issue, incomplete feature | Should fix |
| Minor | Code quality, style issues | Can auto-fix |
| Info | Observations, suggestions | For reference |

## Security Checks

The security audit includes:

- [ ] No hardcoded secrets or API keys
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding)
- [ ] CSRF protection enabled
- [ ] Authentication required on protected routes
- [ ] Authorization checks in place
- [ ] Secure session configuration
- [ ] HTTPS enforced in production
- [ ] Sensitive data encryption
- [ ] Dependency vulnerabilities checked
- [ ] Error messages don't leak information

## Notes

- Audit runs automatically in `auto` mode after execution
- Critical issues block `/k:finalize`
- Use `--fix` for quick resolution of minor issues
- Security audit recommended for any auth-related changes
- Architecture audit recommended for structural changes
