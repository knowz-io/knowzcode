# Code Conventions

<!--
GUIDANCE FOR k-scan-agent:
- Analyze existing code patterns to infer conventions
- Check for eslint, prettier, editorconfig files
- Look for CONTRIBUTING.md or style guides
- Sample multiple files to confirm consistency
-->

## Naming Conventions

<!--
GUIDANCE: Document naming patterns found in codebase
- Analyze file names, function names, variable names
- Note any inconsistencies
-->

### Files and Directories

| Type | Convention | Example | Notes |
|------|------------|---------|-------|
| Components | <!-- e.g., PascalCase --> | <!-- e.g., UserProfile.tsx --> | |
| Utilities | <!-- e.g., camelCase --> | <!-- e.g., formatDate.ts --> | |
| Constants | <!-- e.g., SCREAMING_SNAKE --> | <!-- e.g., API_ENDPOINTS.ts --> | |
| Tests | <!-- e.g., *.test.ts --> | <!-- e.g., user.test.ts --> | |
| Styles | <!-- e.g., *.module.css --> | <!-- e.g., Button.module.css --> | |

### Code Elements

| Element | Convention | Example |
|---------|------------|---------|
| Variables | <!-- e.g., camelCase --> | `userName`, `isActive` |
| Constants | <!-- e.g., SCREAMING_SNAKE --> | `MAX_RETRIES`, `API_URL` |
| Functions | <!-- e.g., camelCase --> | `getUserById`, `handleClick` |
| Classes | <!-- e.g., PascalCase --> | `UserService`, `HttpClient` |
| Interfaces | <!-- e.g., PascalCase, I prefix? --> | `User`, `IUserService` |
| Types | <!-- e.g., PascalCase --> | `UserRole`, `ApiResponse` |
| Enums | <!-- e.g., PascalCase --> | `Status`, `Direction` |
| React Components | <!-- e.g., PascalCase --> | `UserCard`, `Modal` |
| Hooks | <!-- e.g., use prefix --> | `useAuth`, `useFetch` |

### Naming Patterns

<!-- Specific patterns for common operations -->

| Pattern | Convention | Example |
|---------|------------|---------|
| Boolean variables | <!-- e.g., is/has/can prefix --> | `isLoading`, `hasError` |
| Event handlers | <!-- e.g., handle prefix --> | `handleSubmit`, `onClick` |
| Async functions | <!-- e.g., fetch/get/load prefix --> | `fetchUsers`, `loadData` |
| Private members | <!-- e.g., _ prefix --> | `_internalState` |

## File Organization

<!--
GUIDANCE: Document how files are internally organized
- Import order
- Export patterns
- Section ordering
-->

### Import Order

```typescript
// <!-- Document the expected import order -->
// 1. <!-- e.g., Node built-ins -->
// 2. <!-- e.g., External packages -->
// 3. <!-- e.g., Internal aliases (@/) -->
// 4. <!-- e.g., Relative imports -->
// 5. <!-- e.g., Types -->
// 6. <!-- e.g., Styles -->
```

### File Structure Template

<!-- Typical file structure for main file types -->

#### Component File Structure

```typescript
// Imports

// Types/Interfaces

// Constants

// Helper functions

// Component definition

// Styles (if CSS-in-JS)

// Exports
```

#### Service/Module File Structure

```typescript
// Imports

// Types

// Constants

// Implementation

// Exports
```

### Export Patterns

| Pattern | Usage | Example |
|---------|-------|---------|
| Named exports | <!-- When used --> | `export { UserService }` |
| Default exports | <!-- When used --> | `export default UserCard` |
| Barrel exports | <!-- e.g., index.ts --> | `export * from './user'` |

## Code Style

<!--
GUIDANCE: Document code style preferences
- Check prettier/eslint configs
- Sample actual code for patterns
-->

### Formatting

| Rule | Setting | Enforced By |
|------|---------|-------------|
| Indent | <!-- e.g., 2 spaces --> | <!-- e.g., .prettierrc --> |
| Quotes | <!-- e.g., single --> | |
| Semicolons | <!-- e.g., required --> | |
| Trailing commas | <!-- e.g., es5 --> | |
| Line length | <!-- e.g., 100 --> | |
| Bracket spacing | <!-- e.g., true --> | |

### Language-Specific Style

#### TypeScript

| Preference | Setting | Notes |
|------------|---------|-------|
| Strict mode | <!-- yes/no --> | |
| Explicit return types | <!-- required/optional --> | |
| Interface vs Type | <!-- preference --> | |
| Null handling | <!-- optional chaining, nullish coalescing --> | |

#### React/JSX

| Preference | Setting | Notes |
|------------|---------|-------|
| Function vs Class components | <!-- e.g., Function only --> | |
| Props destructuring | <!-- e.g., In parameters --> | |
| State management | <!-- e.g., Hooks only --> | |
| Event handler naming | <!-- e.g., handleX --> | |

### Linting Rules

<!-- Key eslint rules enabled/disabled -->

| Rule | Setting | Rationale |
|------|---------|-----------|
| `no-unused-vars` | | |
| `no-console` | | |
| `@typescript-eslint/explicit-function-return-type` | | |

## Documentation Standards

<!--
GUIDANCE: Document how code documentation is handled
- JSDoc usage
- README requirements
- Inline comments
-->

### Code Comments

| Type | When Used | Example |
|------|-----------|---------|
| JSDoc | <!-- e.g., Public APIs --> | |
| Inline | <!-- e.g., Complex logic --> | |
| TODO | <!-- Format --> | `// TODO: description` |
| FIXME | <!-- Format --> | `// FIXME: description` |

### JSDoc Template

```typescript
/**
 * <!-- Brief description -->
 *
 * @param {Type} paramName - <!-- description -->
 * @returns {Type} <!-- description -->
 * @throws {Error} <!-- when thrown -->
 * @example
 * <!-- usage example -->
 */
```

### README Requirements

<!-- What should be in module/feature READMEs -->

| Section | Required | Content |
|---------|----------|---------|
| Purpose | | |
| Usage | | |
| API | | |
| Examples | | |

## Patterns and Anti-Patterns

<!--
GUIDANCE: Document encouraged patterns and discouraged practices
-->

### Encouraged Patterns

| Pattern | Example | Rationale |
|---------|---------|-----------|
| | | |

### Discouraged Practices

| Anti-Pattern | Alternative | Rationale |
|--------------|-------------|-----------|
| | | |

## Configuration Files

<!-- Reference to actual config files in codebase -->

| Config | Location | Manages |
|--------|----------|---------|
| ESLint | | |
| Prettier | | |
| EditorConfig | | |
| TypeScript | | |

---

## Analysis Metadata

| Field | Value |
|-------|-------|
| Analyzed | <!-- ISO date --> |
| Files Sampled | <!-- Number of files analyzed for conventions --> |
| Consistency Score | <!-- High/Medium/Low --> |
| Agent Version | <!-- k-scan-agent version --> |
