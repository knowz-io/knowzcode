# Knowz: Automation Manifest

> Available commands, agents, and skills for the Knowz system.

## Commands

### Core Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/k:init` | Initialize Knowz in a project | `/k:init` |
| `/k:status` | Show current tracker state | `/k:status` |
| `/k:next` | Process next node in tracker | `/k:next` |
| `/k:log` | Display recent log entries | `/k:log [count]` |
| `/k:sync` | Synchronize all Knowz files | `/k:sync` |

### Planning Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/k:plan` | Create execution plan for goal | `/k:plan [goal]` |
| `/k:breakdown` | Break feature into nodes | `/k:breakdown [feature]` |
| `/k:prioritize` | Reorder nodes by priority | `/k:prioritize` |

### Execution Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/k:delegate` | Delegate task to subagent | `/k:delegate [agent] [task]` |
| `/k:implement` | Implement specific node | `/k:implement [node]` |
| `/k:review` | Review completed work | `/k:review [node]` |
| `/k:test` | Run tests for node | `/k:test [node]` |

### Maintenance Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/k:audit` | Audit Knowz files integrity | `/k:audit` |
| `/k:archive` | Archive completed session | `/k:archive` |
| `/k:report` | Generate progress report | `/k:report` |

## Agents

### Orchestrator

| Agent | Role | Capabilities |
|-------|------|--------------|
| `k-orchestrator` | Main coordinator | Read context, delegate tasks, track progress |

### Specialized Agents

| Agent | Role | Capabilities |
|-------|------|--------------|
| `k-architect` | System design | Architecture decisions, component design, API design |
| `k-implementer` | Code writing | Feature implementation, bug fixes, integrations |
| `k-tester` | Quality assurance | Test writing, test execution, coverage analysis |
| `k-reviewer` | Code review | Best practices, security review, performance review |
| `k-documenter` | Documentation | Code comments, README, API docs |
| `k-debugger` | Bug investigation | Root cause analysis, debugging, fixes |
| `k-refactorer` | Code improvement | Optimization, cleanup, modernization |

### Agent Delegation Matrix

| Task Type | Primary Agent | Backup Agent |
|-----------|--------------|--------------|
| New feature | `k-implementer` | `k-architect` |
| Bug fix | `k-debugger` | `k-implementer` |
| Performance | `k-refactorer` | `k-implementer` |
| Tests | `k-tester` | `k-implementer` |
| Documentation | `k-documenter` | `k-reviewer` |
| Architecture | `k-architect` | `k-reviewer` |

## Skills

### Built-in Skills

| Skill | Description | Trigger |
|-------|-------------|---------|
| Code Analysis | Analyze codebase structure | Auto |
| Dependency Check | Check for outdated deps | `/k:deps` |
| Security Scan | Basic security analysis | `/k:security` |
| Performance Profile | Identify bottlenecks | `/k:perf` |

### Integration Skills

| Skill | Description | Requirements |
|-------|-------------|--------------|
| Git Operations | Commit, branch, merge | Git installed |
| CI/CD Trigger | Trigger pipelines | CI/CD configured |
| Deploy | Deploy to environment | Deploy config |

## Return Contracts

### Standard Return Format

```markdown
Knowz: Return from k-[agent]

**Status:** [Success | Partial | Failed]

**Summary:**
[Brief description]

**Artifacts:**
- [Created] file.ts
- [Modified] other.ts

**Issues:**
- [Any problems]

**Recommendations:**
- [Next steps]
```

### Status Definitions

| Status | Meaning | Action |
|--------|---------|--------|
| `Success` | Task fully completed | Update tracker, continue |
| `Partial` | Task partially completed | Review, may continue |
| `Failed` | Task could not complete | Log, investigate, retry or skip |

## Workflow Templates

### Feature Implementation

```
1. /k:plan [feature]
2. /k:breakdown [feature]
3. /k:delegate k-architect [design]
4. /k:delegate k-implementer [code]
5. /k:delegate k-tester [tests]
6. /k:delegate k-reviewer [review]
7. /k:report
```

### Bug Fix

```
1. /k:delegate k-debugger [investigate]
2. /k:delegate k-implementer [fix]
3. /k:delegate k-tester [verify]
4. /k:report
```

### Refactoring

```
1. /k:delegate k-reviewer [analyze]
2. /k:delegate k-refactorer [improve]
3. /k:delegate k-tester [verify]
4. /k:report
```

## Configuration

### Knowz Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `auto_log` | `true` | Auto-log all operations |
| `strict_contracts` | `true` | Enforce return contracts |
| `parallel_agents` | `false` | Allow parallel delegation |

### File Locations

| File | Path | Purpose |
|------|------|---------|
| Project Context | `knowz/project.md` | Project overview |
| Tracker | `knowz/tracker.md` | Node status |
| Log | `knowz/log.md` | Audit trail |
| Loop | `knowz/loop.md` | Operational loop |
| Architecture | `knowz/architecture.md` | System design |
| Environment | `knowz/environment_context.md` | Platform info |
| Manifest | `knowz/automation_manifest.md` | This file |

---
*Knowz Version: 3.0*
*Manifest Version: 1.0*
