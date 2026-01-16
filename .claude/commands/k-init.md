---
name: k:init
description: Initialize Knowz project structure in current repository
arguments:
  - name: template
    description: Optional template type (default, library, api, cli)
    required: false
---

# /k:init - Initialize Knowz Project

## Usage

```
/k:init
/k:init --template=api
```

## What It Does

Initializes the Knowz v3 project structure in the current repository, creating all necessary directories and configuration files.

### Step-by-Step Process

1. **Check Prerequisites**
   - Verify current directory is a git repository (or initialize one)
   - Check for existing `knowz/` directory
   - If exists, prompt for confirmation to reset or merge

2. **Create Directory Structure**
   ```
   knowz/
   ├── workgroups/           # Active WorkGroup state
   │   └── .gitkeep
   ├── specs/                # Specification documents
   │   ├── drafts/           # Work-in-progress specs
   │   └── approved/         # Finalized specifications
   ├── plans/                # Execution plans
   │   └── archive/          # Completed plans
   ├── audits/               # Audit reports
   │   ├── security/
   │   ├── architecture/
   │   └── completeness/
   ├── maps/                 # Brownfield analysis (7 docs)
   │   └── .gitkeep
   ├── logs/                 # Agent execution logs
   │   └── .gitkeep
   └── config.yaml           # Project configuration
   ```

3. **Generate Configuration File**
   - Create `knowz/config.yaml` with default settings
   - Set project name from git remote or directory name
   - Configure default parallel task limit (3)
   - Set default mode (guided)

4. **Create Initial State**
   - Generate `knowz/state.json` for session tracking
   - Initialize empty WorkGroup registry

5. **Verify Setup**
   - Validate all directories created
   - Test write permissions
   - Display success summary

## Agents Delegated

This command runs directly without subagent delegation.

## Expected Outcomes

- `knowz/` directory structure created
- `knowz/config.yaml` with project settings
- `knowz/state.json` initialized
- Ready for `/k:work` or `/k:scan` commands

## Configuration Options

The generated `config.yaml` includes:

```yaml
project:
  name: <detected-name>
  version: "3.0"

execution:
  max_parallel_tasks: 3
  default_mode: guided
  auto_commit: false

paths:
  specs: knowz/specs
  plans: knowz/plans
  audits: knowz/audits
  maps: knowz/maps
  logs: knowz/logs

agents:
  timeout_minutes: 30
  retry_count: 2
```

## Notes

- Run this command once per repository
- Safe to re-run; will preserve existing content unless `--force` specified
- Creates `.gitignore` entries for logs and temp files
