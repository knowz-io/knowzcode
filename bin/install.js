#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const VERSION = '3.0.0';

// ============================================================================
// ASCII Art & Styling
// ============================================================================

const BANNER = `
  ╭───────────────────────────────────────────────────────────────╮
  │                                                               │
  │   ██╗  ██╗███╗   ██╗ ██████╗ ██╗    ██╗███████╗              │
  │   ██║ ██╔╝████╗  ██║██╔═══██╗██║    ██║╚══███╔╝              │
  │   █████╔╝ ██╔██╗ ██║██║   ██║██║ █╗ ██║  ███╔╝               │
  │   ██╔═██╗ ██║╚██╗██║██║   ██║██║███╗██║ ███╔╝                │
  │   ██║  ██╗██║ ╚████║╚██████╔╝╚███╔███╔╝███████╗              │
  │   ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝ ╚══════╝              │
  │                                                               │
  │   Lean orchestrator for Claude Code                           │
  │   v${VERSION}                                                      │
  │                                                               │
  ╰───────────────────────────────────────────────────────────────╯
`;

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function colorize(text, color) {
  return `${COLORS[color]}${text}${COLORS.reset}`;
}

function log(message, type = 'info') {
  const prefix = {
    info: colorize('  >', 'cyan'),
    success: colorize('  ✓', 'green'),
    warn: colorize('  !', 'yellow'),
    error: colorize('  ✗', 'red'),
  };
  console.log(`${prefix[type]} ${message}`);
}

function header(text) {
  console.log();
  console.log(colorize(`  ${text}`, 'bright'));
  console.log(colorize('  ' + '─'.repeat(text.length), 'dim'));
}

// ============================================================================
// Path Resolution
// ============================================================================

function expandHome(filepath) {
  if (filepath.startsWith('~')) {
    return path.join(process.env.HOME || process.env.USERPROFILE, filepath.slice(1));
  }
  return filepath;
}

function getClaudeConfigDir() {
  // Check for custom config directory
  const customDir = process.env.CLAUDE_CONFIG_DIR;
  if (customDir) {
    return expandHome(customDir);
  }
  // Default to ~/.claude
  return expandHome('~/.claude');
}

// ============================================================================
// File Operations
// ============================================================================

function copyRecursive(src, dest, options = {}) {
  const { pathReplacements = {} } = options;

  if (!fs.existsSync(src)) {
    return;
  }

  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    for (const item of fs.readdirSync(src)) {
      copyRecursive(
        path.join(src, item),
        path.join(dest, item),
        options
      );
    }
  } else {
    // Ensure parent directory exists
    const parentDir = path.dirname(dest);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }

    // Handle text files with path replacements
    const ext = path.extname(src).toLowerCase();
    if (['.md', '.json', '.yaml', '.yml'].includes(ext)) {
      let content = fs.readFileSync(src, 'utf8');

      for (const [search, replace] of Object.entries(pathReplacements)) {
        content = content.replace(new RegExp(search, 'g'), replace);
      }

      fs.writeFileSync(dest, content, 'utf8');
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

function countFiles(dir) {
  let count = 0;
  if (!fs.existsSync(dir)) return 0;

  const stat = fs.statSync(dir);
  if (stat.isFile()) return 1;

  for (const item of fs.readdirSync(dir)) {
    count += countFiles(path.join(dir, item));
  }
  return count;
}

// ============================================================================
// Installation Logic
// ============================================================================

async function promptInstallType() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    console.log();
    console.log('  Where would you like to install Knowz?');
    console.log();
    console.log(colorize('  [1]', 'cyan') + ' Global  ' + colorize('(~/.claude)', 'dim') + ' - Available in all projects');
    console.log(colorize('  [2]', 'cyan') + ' Local   ' + colorize('(./.claude)', 'dim') + ' - Project-specific installation');
    console.log();

    rl.question('  Enter choice [1/2]: ', (answer) => {
      rl.close();
      resolve(answer.trim() === '2' ? 'local' : 'global');
    });
  });
}

async function install(installType, configDir = null) {
  const sourceDir = path.join(__dirname, '..', '.claude');

  let targetDir;
  let pathPrefix;

  if (configDir) {
    targetDir = expandHome(configDir);
    pathPrefix = configDir.startsWith('~') ? configDir : targetDir;
  } else if (installType === 'local') {
    targetDir = path.join(process.cwd(), '.claude');
    pathPrefix = './.claude';
  } else {
    targetDir = getClaudeConfigDir();
    pathPrefix = '~/.claude';
  }

  header('Installing Knowz');

  log(`Source: ${sourceDir}`);
  log(`Target: ${targetDir}`);
  log(`Mode: ${installType}`);

  // Path replacements for markdown files
  const pathReplacements = {
    '~/.claude/': `${pathPrefix}/`,
  };

  // Create directories
  const dirs = ['commands/k', 'agents', 'skills', 'rules', 'templates'];
  for (const dir of dirs) {
    const fullPath = path.join(targetDir, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  }

  // Copy commands to k/ subdirectory
  console.log();
  log('Installing commands...');
  const commandsSrc = path.join(sourceDir, 'commands');
  const commandsDest = path.join(targetDir, 'commands', 'k');
  copyRecursive(commandsSrc, commandsDest, { pathReplacements });
  const commandCount = countFiles(commandsDest);
  log(`${commandCount} commands installed`, 'success');

  // Copy agents
  log('Installing agents...');
  const agentsSrc = path.join(sourceDir, 'agents');
  const agentsDest = path.join(targetDir, 'agents');
  copyRecursive(agentsSrc, agentsDest, { pathReplacements });
  const agentCount = countFiles(agentsDest);
  log(`${agentCount} agents installed`, 'success');

  // Copy skills
  log('Installing skills...');
  const skillsSrc = path.join(sourceDir, 'skills');
  const skillsDest = path.join(targetDir, 'skills');
  copyRecursive(skillsSrc, skillsDest, { pathReplacements });
  const skillCount = countFiles(skillsDest);
  log(`${skillCount} skills installed`, 'success');

  // Copy rules
  log('Installing rules...');
  const rulesSrc = path.join(sourceDir, 'rules');
  const rulesDest = path.join(targetDir, 'rules');
  copyRecursive(rulesSrc, rulesDest, { pathReplacements });
  const ruleCount = countFiles(rulesDest);
  log(`${ruleCount} rules installed`, 'success');

  // Copy templates
  log('Installing templates...');
  const templatesSrc = path.join(sourceDir, 'templates');
  const templatesDest = path.join(targetDir, 'templates');
  copyRecursive(templatesSrc, templatesDest, { pathReplacements });
  const templateCount = countFiles(templatesDest);
  log(`${templateCount} templates installed`, 'success');

  // Write version file
  fs.writeFileSync(path.join(targetDir, 'knowz-version'), VERSION);

  // Success message
  console.log();
  console.log('  ╭─────────────────────────────────────────────────────────────╮');
  console.log('  │                                                             │');
  console.log('  │  ' + colorize('Installation complete!', 'green') + '                                   │');
  console.log('  │                                                             │');
  console.log('  │  Start Claude Code and run:                                 │');
  console.log('  │                                                             │');
  console.log('  │    ' + colorize('/k:init', 'cyan') + '     Initialize Knowz in your project          │');
  console.log('  │    ' + colorize('/k:work', 'cyan') + '     Start a new WorkGroup                     │');
  console.log('  │    ' + colorize('/k:scan', 'cyan') + '     Analyze existing codebase                 │');
  console.log('  │                                                             │');
  console.log('  ╰─────────────────────────────────────────────────────────────╯');
  console.log();
}

// ============================================================================
// CLI Argument Parsing
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    installType: null,
    configDir: null,
    help: false,
    version: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '-g':
      case '--global':
        if (options.installType === 'local') {
          console.error('Error: Cannot use both --global and --local');
          process.exit(1);
        }
        options.installType = 'global';
        break;

      case '-l':
      case '--local':
        if (options.installType === 'global') {
          console.error('Error: Cannot use both --global and --local');
          process.exit(1);
        }
        options.installType = 'local';
        break;

      case '--config-dir':
        if (i + 1 >= args.length) {
          console.error('Error: --config-dir requires a path argument');
          process.exit(1);
        }
        options.configDir = args[++i];
        options.installType = 'custom';
        break;

      case '-h':
      case '--help':
        options.help = true;
        break;

      case '-v':
      case '--version':
        options.version = true;
        break;

      default:
        console.error(`Error: Unknown option '${arg}'`);
        process.exit(1);
    }
  }

  return options;
}

function showHelp() {
  console.log(BANNER);
  console.log('  Usage: npx knowz [options]');
  console.log();
  console.log('  Options:');
  console.log('    -g, --global       Install globally to ~/.claude');
  console.log('    -l, --local        Install locally to ./.claude');
  console.log('    --config-dir PATH  Install to custom Claude config directory');
  console.log('    -v, --version      Show version number');
  console.log('    -h, --help         Show this help message');
  console.log();
  console.log('  Examples:');
  console.log('    npx knowz                    Interactive installation');
  console.log('    npx knowz --global           Install globally');
  console.log('    npx knowz --local            Install to current project');
  console.log('    npx knowz@latest             Update to latest version');
  console.log();
}

// ============================================================================
// Main Entry Point
// ============================================================================

async function main() {
  const options = parseArgs();

  if (options.version) {
    console.log(VERSION);
    return;
  }

  if (options.help) {
    showHelp();
    return;
  }

  console.log(BANNER);

  let installType = options.installType;

  if (!installType) {
    installType = await promptInstallType();
  }

  await install(installType, options.configDir);
}

main().catch((err) => {
  console.error();
  log(`Installation failed: ${err.message}`, 'error');
  process.exit(1);
});
