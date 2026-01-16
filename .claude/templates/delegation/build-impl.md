# Build Phase: Implementation Delegation Template

## Purpose
Template for delegating individual node implementation tasks within a cycle.
Each node represents an independent unit of work with its own spec and dependencies.

---

## Delegation Header

```markdown
# Implementation Delegation: {node_id}

**Phase**: build - Implementation
**Workgroup**: {workgroup_id}
**Cycle**: {cycle_number}
**Delegated At**: {timestamp}
```

---

## Context Block

### Required Context

```markdown
## Context

### Specification
- **Spec Path**: {absolute_path_to_spec_file}
- **Spec Version**: {version_hash_or_number}

### Dependencies
- **Completed Dependencies**:
  - {dep_node_id_1}: {status}
  - {dep_node_id_2}: {status}
- **Artifacts Available**:
  - {path_to_artifact_1}
  - {path_to_artifact_2}

### Working Directory
- **Base Path**: {workgroup_base_path}
- **Implementation Path**: {where_to_create_files}
- **Test Path**: {where_to_create_tests}

### State Reference
- **State File**: {path_to_state_file}
- **Current Phase**: build
- **Current Cycle**: {cycle_number}
```

### Optional Context

```markdown
### Additional Context (if applicable)
- **Related Specs**: {list_of_related_spec_paths}
- **Shared Utilities**: {paths_to_shared_code}
- **Configuration**: {relevant_config_paths}
- **Prior Decisions**: {reference_to_decisions_in_state}
```

---

## Instructions Block

```markdown
## Instructions

### Agent Protocol
You are a k-impl-agent. Follow the implementation protocol exactly.

### Primary Objective
Implement the node specified in the spec file using TDD methodology.

### Execution Steps
1. **Read Spec**: Load and parse {spec_path}
2. **Verify Dependencies**: Confirm all dependencies are accessible
3. **TDD Loop**:
   - Write failing tests first
   - Implement minimum code to pass
   - Refactor if needed
   - Verify all tests pass
4. **Commit**: Create atomic commits for each logical change
5. **Report**: Return structured JSON summary only

### Constraints
- Fresh 175k context - do not assume prior knowledge
- Maximum 600 tokens in response
- Return ONLY structured JSON
- NO implementation details in response
- NO debugging logs in response
```

---

## Return Contract

### Required Response Format

```json
{
  "node_id": "{node_id}",
  "workgroup_id": "{workgroup_id}",
  "cycle": {cycle_number},
  "status": "success|failure|blocked",

  "files_created": [
    {
      "path": "{absolute_path}",
      "type": "implementation|test|config",
      "lines": {line_count}
    }
  ],

  "files_modified": [
    {
      "path": "{absolute_path}",
      "changes": "{brief_description}"
    }
  ],

  "tests": {
    "written": {count},
    "passing": {count},
    "failing": {count},
    "skipped": {count}
  },

  "commits": [
    {
      "hash": "{short_hash}",
      "message": "{commit_message}"
    }
  ],

  "blockers": [
    {
      "type": "dependency|spec_unclear|external|technical",
      "description": "{brief_description}",
      "severity": "blocking|warning"
    }
  ],

  "metrics": {
    "duration_seconds": {estimated_duration},
    "complexity": "low|medium|high"
  }
}
```

### Response Constraints

| Field | Required | Max Length |
|-------|----------|------------|
| node_id | Yes | 50 chars |
| status | Yes | enum |
| files_created | Yes | 10 items |
| files_modified | Yes | 10 items |
| tests | Yes | object |
| commits | Yes | 5 items |
| blockers | If any | 3 items |
| metrics | Yes | object |

### Status Definitions

- **success**: All tests pass, implementation complete, committed
- **failure**: Implementation attempted but tests failing or error occurred
- **blocked**: Cannot proceed due to unresolved blocker

---

## Validation Checklist

Before returning, the implementation agent must verify:

```markdown
## Pre-Return Validation

- [ ] Spec was read and understood
- [ ] All dependencies were accessible
- [ ] Tests were written before implementation
- [ ] All tests pass (or failure status set)
- [ ] Changes committed with descriptive messages
- [ ] Response is valid JSON
- [ ] Response under 600 tokens
- [ ] No implementation code in response
- [ ] No debug logs in response
```

---

## Example Delegation

```markdown
# Implementation Delegation: node-user-repository

**Phase**: build - Implementation
**Workgroup**: wg-user-service
**Cycle**: 2
**Delegated At**: 2025-01-15T10:30:00Z

## Context

### Specification
- **Spec Path**: /knowz/workgroups/wg-user-service/specs/node-user-repository.md
- **Spec Version**: v1.2

### Dependencies
- **Completed Dependencies**:
  - node-database-connection: success
  - node-user-model: success
- **Artifacts Available**:
  - /knowz/workgroups/wg-user-service/src/db/connection.ts
  - /knowz/workgroups/wg-user-service/src/models/user.ts

### Working Directory
- **Base Path**: /knowz/workgroups/wg-user-service
- **Implementation Path**: /knowz/workgroups/wg-user-service/src/repositories
- **Test Path**: /knowz/workgroups/wg-user-service/tests/repositories

### State Reference
- **State File**: /knowz/workgroups/wg-user-service/STATE.json
- **Current Phase**: build
- **Current Cycle**: 2

## Instructions

### Agent Protocol
You are a k-impl-agent. Follow the implementation protocol exactly.

### Primary Objective
Implement the UserRepository as specified, providing CRUD operations for User entities.

### Execution Steps
1. Read spec at /knowz/workgroups/wg-user-service/specs/node-user-repository.md
2. Verify database connection and user model are accessible
3. TDD Loop for each repository method
4. Commit changes
5. Return JSON summary only
```

---

## Error Scenarios

### Missing Dependency
```json
{
  "status": "blocked",
  "blockers": [{
    "type": "dependency",
    "description": "node-database-connection not found at expected path",
    "severity": "blocking"
  }]
}
```

### Spec Unclear
```json
{
  "status": "blocked",
  "blockers": [{
    "type": "spec_unclear",
    "description": "Return type for findByEmail not specified",
    "severity": "blocking"
  }]
}
```

### Partial Success
```json
{
  "status": "failure",
  "tests": {
    "written": 5,
    "passing": 3,
    "failing": 2
  },
  "blockers": [{
    "type": "technical",
    "description": "Edge case handling for null input failing",
    "severity": "warning"
  }]
}
```
