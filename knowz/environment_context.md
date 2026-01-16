# Knowz: Environment Context

> Platform-specific commands, tools, and environment configuration.

## Current Environment

| Property | Value |
|----------|-------|
| **Platform** | [win32 \| darwin \| linux] |
| **Shell** | [PowerShell \| bash \| zsh] |
| **Node.js** | [Version] |
| **Package Manager** | [npm \| yarn \| pnpm] |
| **Git** | [Version] |

## Platform Commands

### File Operations

| Operation | Windows (PowerShell) | macOS/Linux (bash) |
|-----------|---------------------|-------------------|
| List files | `Get-ChildItem` / `dir` | `ls -la` |
| Create directory | `New-Item -ItemType Directory` | `mkdir -p` |
| Remove directory | `Remove-Item -Recurse` | `rm -rf` |
| Copy file | `Copy-Item` | `cp` |
| Move file | `Move-Item` | `mv` |
| Find files | `Get-ChildItem -Recurse -Filter` | `find . -name` |
| View file | `Get-Content` | `cat` |

### Environment Variables

| Operation | Windows (PowerShell) | macOS/Linux (bash) |
|-----------|---------------------|-------------------|
| Set variable | `$env:VAR = "value"` | `export VAR="value"` |
| Get variable | `$env:VAR` | `echo $VAR` |
| List all | `Get-ChildItem Env:` | `env` |

### Process Management

| Operation | Windows (PowerShell) | macOS/Linux (bash) |
|-----------|---------------------|-------------------|
| List processes | `Get-Process` | `ps aux` |
| Kill process | `Stop-Process -Id` | `kill -9` |
| Background job | `Start-Job` | `command &` |

### Network

| Operation | Windows (PowerShell) | macOS/Linux (bash) |
|-----------|---------------------|-------------------|
| Check port | `Test-NetConnection -Port` | `nc -zv` / `lsof -i` |
| HTTP request | `Invoke-WebRequest` | `curl` |
| DNS lookup | `Resolve-DnsName` | `dig` / `nslookup` |

## Development Tools

### Package Managers

```bash
# npm
npm install
npm run [script]
npm test

# yarn
yarn install
yarn [script]
yarn test

# pnpm
pnpm install
pnpm run [script]
pnpm test
```

### Git Commands

```bash
# Status and info
git status
git log --oneline -10
git branch -a

# Branching
git checkout -b feature/name
git merge branch-name

# Remote
git fetch origin
git pull origin main
git push origin branch-name
```

### Docker Commands

```bash
# Build and run
docker build -t image-name .
docker run -p 3000:3000 image-name

# Compose
docker-compose up -d
docker-compose down

# Inspect
docker ps
docker logs container-name
```

## IDE / Editor

| Editor | Config Location |
|--------|-----------------|
| VS Code | `.vscode/settings.json` |
| Vim/Neovim | `.vimrc` / `init.vim` |
| JetBrains | `.idea/` |

## Project-Specific Commands

### Development

```bash
# Start development server
[command]

# Run tests
[command]

# Build for production
[command]

# Lint code
[command]
```

### Database

```bash
# Run migrations
[command]

# Seed database
[command]

# Connect to database
[command]
```

### Deployment

```bash
# Deploy to staging
[command]

# Deploy to production
[command]

# Rollback
[command]
```

## Path Conventions

| Platform | Path Separator | Home Directory | Temp Directory |
|----------|----------------|----------------|----------------|
| Windows | `\` | `%USERPROFILE%` | `%TEMP%` |
| macOS | `/` | `$HOME` | `/tmp` |
| Linux | `/` | `$HOME` | `/tmp` |

## Environment Variables Required

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | Runtime environment | `development` |
| `DATABASE_URL` | Database connection | `postgres://...` |
| `API_KEY` | API authentication | `sk-...` |

## Notes

[Platform-specific gotchas and tips]

---
*Detected Platform: [Auto-detected]*
*Last Updated: [Date]*
