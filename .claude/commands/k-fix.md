---
name: k:fix
description: Quick micro-fix for single-file or small changes
arguments:
  - name: description
    description: Description of the fix to apply
    required: true
  - name: file
    description: Target file path (auto-detected if omitted)
    required: false
  - name: test
    description: Run tests after fix
    required: false
    default: true
  - name: commit
    description: Auto-commit the fix
    required: false
    default: false
---

# /k:fix - Quick Micro-Fix

## Usage

```
/k:fix "Fix typo in error message"
/k:fix "Add null check to user lookup" --file=src/services/UserService.ts
/k:fix "Update deprecated API call" --test=false
/k:fix "Fix linting error on line 45" --commit
```

## What It Does

Applies small, focused fixes without the full WorkGroup ceremony. Designed for single-file changes, typo corrections, linting fixes, and other micro-modifications.

## Enforcement Gates

**NOTE: /k:fix intentionally bypasses WorkGroup requirements for speed.**

### Gate 1: Active WorkGroup Advisory
```
IF enforcement-policy.yaml → workgroups.require_active == true:
  Check if active WorkGroup exists
  IF active WorkGroup:
    → WARN: "Active WorkGroup detected. Consider if this fix belongs in the WorkGroup."
    → Continue (advisory only, not blocking)
```

### Gate 2: Complexity Gate
```
Analyze fix description for complexity indicators:
- Multiple file mentions → BLOCK
- "refactor", "restructure", "migrate" keywords → BLOCK
- "all", "every", "across" keywords → BLOCK

IF complexity detected:
  → Display recommendation to use /k:work
  → STOP execution
  → Wait for user confirmation to proceed
```

### Gate 3: Scope Validation Gate
```
IF --file specified:
  Verify file exists
  Verify file is not in protected paths (node_modules, .git, etc.)
IF file auto-detected:
  Verify exactly one file identified
  IF multiple candidates: Prompt user to choose
```

**Complexity Gate Block Message:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  COMPLEXITY GATE BLOCKED                             │
│                                                         │
│ This fix appears too complex for /k:fix:                │
│ • Detected: "refactor" keyword                          │
│ • May affect multiple files                             │
│                                                         │
│ Recommended: Use /k:work instead for proper tracking    │
│                                                         │
│ To proceed with /k:fix anyway, say: "proceed with fix"  │
└─────────────────────────────────────────────────────────┘
```

### Bypass Logging
All bypasses logged to `knowz/logs/enforcement.log`:
```json
{
  "timestamp": "2026-01-15T...",
  "gate": "complexity",
  "command": "/k:fix",
  "description": "Refactor error handling",
  "bypass_type": "user_override"
}
```

### When to Use /k:fix

| Use Case | Example |
|----------|---------|
| Typo in string/comment | "Fix typo: 'recieve' → 'receive'" |
| Missing null check | "Add null check before accessing user.email" |
| Linting error | "Fix ESLint no-unused-vars on line 23" |
| Deprecated API | "Update fs.exists to fs.existsSync" |
| Import correction | "Fix missing import for useState" |
| Single test fix | "Fix failing assertion in user.test.ts" |

### When NOT to Use /k:fix

- Changes spanning multiple files → Use `/k:work`
- New features → Use `/k:work`
- Architectural changes → Use `/k:work`
- Complex refactoring → Use `/k:work`

### Step-by-Step Process

1. **Parse Fix Request**
   - Analyze description for intent
   - Identify target file (explicit or detect)
   - Determine fix type (typo, logic, import, etc.)

2. **Locate Target**

   a. **If file specified:**
      - Validate file exists
      - Load file content

   b. **If file not specified:**
      - Search for relevant files
      - Use recent git changes as hint
      - Analyze error messages if present
      - Prompt if ambiguous

3. **Analyze Context**
   - Load surrounding code
   - Understand current implementation
   - Identify exact change location

4. **Generate Fix**
   - Create minimal change
   - Preserve existing style
   - Ensure syntactic correctness

5. **Apply Fix**
   - Make the modification
   - Show diff preview
   - Confirm change

6. **Validate (if --test)**
   - Run related tests
   - Check linting
   - Verify build

7. **Commit (if --commit)**
   - Stage changed file
   - Create fix commit:
     ```
     fix(<scope>): <description>

     Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
     ```

## Agents Delegated

| Agent | Purpose |
|-------|---------|
| `k-fix-analyzer` | Understands fix intent |
| `k-file-locator` | Finds target file if not specified |
| `k-micro-editor` | Applies minimal change |

## Expected Outcomes

- Single file modified with fix
- Tests passing (if run)
- Optional commit created
- No WorkGroup overhead

## Fix Categories

### 1. Text Fixes
```
/k:fix "Fix typo: 'occured' should be 'occurred'"
/k:fix "Update copyright year to 2024"
/k:fix "Fix grammatical error in error message"
```

### 2. Logic Fixes
```
/k:fix "Add null check before user.name access"
/k:fix "Fix off-by-one error in loop"
/k:fix "Handle undefined case in switch statement"
```

### 3. Import Fixes
```
/k:fix "Add missing React import"
/k:fix "Fix circular import in utils"
/k:fix "Remove unused import on line 5"
```

### 4. Linting Fixes
```
/k:fix "Fix ESLint prefer-const warning"
/k:fix "Add missing semicolon"
/k:fix "Fix indentation issue"
```

### 5. Type Fixes
```
/k:fix "Fix TypeScript type error on line 42"
/k:fix "Add missing type annotation"
/k:fix "Fix generic type parameter"
```

## Output Format

```
/k:fix "Fix typo in welcome message"

🔍 Analyzing fix request...
📁 Target: src/components/Welcome.tsx (detected)
📍 Location: Line 15

Preview:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- return <h1>Welcom to the app!</h1>;
+ return <h1>Welcome to the app!</h1>;
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Fix applied
✓ Tests passed (23 specs)
✓ Linting passed

Changes:
  M src/components/Welcome.tsx

Use --commit to create a commit for this fix.
```

## Commit Output

```
/k:fix "Fix typo in welcome message" --commit

[Previous output...]

📝 Creating commit...

fix(components): correct typo in Welcome message

'Welcom' → 'Welcome'

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>

✓ Committed: a3f2b1c
```

## Error Handling

| Scenario | Response |
|----------|----------|
| File not found | List similar files, ask for clarification |
| Multiple matches | Show options, ask user to choose |
| Tests fail | Show failure, don't commit, suggest fixes |
| Fix unclear | Ask clarifying questions |
| Too complex | Suggest using `/k:work` instead |

## Complexity Detection

If the fix seems too complex:

```
/k:fix "Refactor entire authentication system"

⚠️  This fix appears complex:
- May affect multiple files
- Involves structural changes
- Requires careful planning

Recommendation: Use /k:work instead:
  /k:work "Refactor entire authentication system"

Proceed with /k:fix anyway? [y/N]
```

## Notes

- Designed for speed, not ceremony
- Single file changes only
- No specification or planning phases
- Quick validation and optional commit
- Falls back to `/k:work` recommendation for complex changes
- Respects existing code style
- Logs action to `knowz/logs/fixes.log`
