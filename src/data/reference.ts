import { DocPage } from "./types";

export const benchmarksPage: DocPage = {
  slug: "benchmarks",
  title: "Benchmarks",
  description: "Performance metrics and battle-test results across 15 domains.",
  category: "Benchmarks",
  sections: [
    { id: "the-six-tiers", title: "The Six Tiers", level: 2 },
    { id: "battle-test-results", title: "Battle Test Results", level: 2 },
    { id: "grading-methodology", title: "Grading Methodology", level: 2 },
    { id: "running-benchmarks", title: "Running Benchmarks", level: 2 },
    { id: "adding-new-benchmarks", title: "Adding New Benchmarks", level: 2 },
    { id: "checkpoint-validation", title: "Checkpoint Validation", level: 2 },
  ],
  content: `emergex includes a comprehensive benchmark suite with 39+ tasks across 6 tiers spanning 15 professional domains. Every benchmark is execution-graded: code runs against \`bun:test\` suites or it fails.

> **All Local Inference** — Every score below is from local inference via Ollama at zero cost. No cloud APIs, no paid models.

## The Six Tiers

**Tier 1: Fundamentals** — 5 benchmarks — Bug fixing, feature implementation, file manipulation.

**Tier 2: Fullstack** — 3 benchmarks — REST API with JWT auth, event-driven pub/sub, typed state machines.

**Tier 3: Agentic** — 7 benchmarks — Config parsing, ETL pipelines, reverse engineering, debugging.

**Tier 4: UI/CSS** — 8 benchmarks — Neumorphic, glassmorphism, 3D, animations, responsive layouts.

**Tier 5: Long-Horizon** — 9 benchmarks — Three.js rendering, React Native, Next.js server components, creative generation.

**Tier 6: Battle Test** — 15 benchmarks — Fifteen professional-domain tasks graded end-to-end.

## Battle Test Results

| ID | Domain | Task | Score | Status |
| --- | --- | --- | --- | --- |
| BT001 | Software Engineering | SaaS Auth — JWT, Roles, Rate Limiting | 94 | PASS |
| BT002 | Software Engineering | Event Architecture — Pub/Sub, DLQ, Retry | 92 | PASS |
| BT003 | Data Engineering | Data Pipeline — Stream Processing, Validation | 100 | PERFECT |
| BT004 | Developer Tools | CLI Framework — Parser, Help, Flags, Subcommands | 53 | Improving |
| BT005 | Software Engineering | State Machine — Typed Transitions, Guards | 92 | PASS |
| BT006 | Financial Consulting | Financial Dashboard — ROI, NPV, IRR, EBITDA | 54 | Improving |
| BT007 | Digital Marketing | SEO Audit Engine — Meta, Scoring, Core Web Vitals | 96 | PASS |
| BT008 | Marketing Automation | Email Campaign — Templates, A/B Testing, Analytics | 54 | Improving |
| BT009 | DevOps | CI/CD Pipeline — DSL, Dependency Graph, YAML | 33 | Improving |
| BT010 | Design Systems | Design Tokens — Multi-Format Export, Scales | 39 | Improving |
| BT011 | Video Production | Video Planner — Scene Graph, Timeline, FFmpeg | 100 | PERFECT |
| BT012 | Music Technology | Music Theory — Notes, Chords, Scales, Progressions | 81 | PASS |
| BT013 | Data Visualization | Charts, Scales, Layouts in SVG/ASCII | 30 | Improving |
| BT014 | AI Consulting | Report Generator — Assessment, Roadmap | 95 | PASS |
| BT015 | Cybersecurity | Security Audit — Scanner, Vuln DB, Reports | 30 | Improving |

## Grading Methodology

| Component | Weight | Method |
| --- | --- | --- |
| **Execution** | 70% | Code is compiled and run against test assertions |
| **Keywords** | 30% | Domain-specific pattern checks |

Each benchmark runs at three temperatures: **0.3**, **0.5**, and **0.7**. The best result is kept.

## Running Benchmarks

\`\`\`bash
# Single pass (all benchmarks)
bun run benchmark:v2

# Autoresearch loop (iterative improvement)
CATEGORY=battle-test MAX_ITERATIONS=5 bun run benchmark:loop

# Overnight continuous runner
bash benchmarks/autoresearch/overnight-runner.sh
\`\`\`

## Adding New Benchmarks

1. Add your test fixture in \`benchmarks/fixtures/<category>/\`
2. Add the benchmark definition to \`benchmarks/categories/<category>/benchmarks.ts\`
3. Run the harness to generate initial scores

## Checkpoint Validation

The benchmark suite serves as the regression gate for kernel fine-tuning. When the \`@EmergeX/kernel\` package trains a new LoRA checkpoint, it validates against these benchmarks before promotion.

\`\`\`bash
bun run benchmarks/autoresearch/validate-checkpoint.ts
\`\`\``,
};

export const cliReferencePage: DocPage = {
  slug: "reference/cli",
  title: "CLI Reference",
  description: "Complete guide to EmergeX terminal commands and flags.",
  category: "Reference",
  sections: [
    { id: "commands", title: "Commands", level: 2 },
    { id: "launch-the-tui", title: "Launch the TUI", level: 3 },
    { id: "specify-a-provider", title: "Specify a Provider", level: 3 },
    { id: "auth-commands", title: "Auth Commands", level: 3 },
    { id: "ast-commands", title: "AST Commands", level: 3 },
    { id: "benchmark-commands", title: "Benchmark Commands", level: 3 },
    { id: "harness-cli", title: "Harness CLI", level: 3 },
    { id: "configuration-paths", title: "Configuration Paths", level: 2 },
    { id: "environment-variables", title: "Environment Variables", level: 2 },
  ],
  content: `## Commands

EmergeX provides two entry points: the full command \`EmergeX\` and the short alias \`8\`.

### Launch the TUI

\`\`\`bash
# Full command
emergex

# Short alias
8

# From source
bun run tui
\`\`\`

### Specify a Provider

\`\`\`bash
# Use OpenRouter
emergex --provider openrouter

# Use LM Studio
emergex --provider lmstudio
\`\`\`

### Auth Commands

\`\`\`bash
# Log in via device code flow
emergex auth login

# Log out
emergex auth logout

# Check current auth status
emergex auth status

# Show current user info
emergex auth whoami
\`\`\`

### AST Commands

\`\`\`bash
# Show file outline
emergex outline src/parser.ts

# Get a specific symbol's source
emergex symbol src/parser.ts::buildSymbolId
\`\`\`

### Benchmark Commands

\`\`\`bash
# Run the full benchmark suite
bun run benchmark:v2

# Run autoresearch loop
CATEGORY=battle-test MAX_ITERATIONS=5 bun run benchmark:loop

# Overnight runner
bash benchmarks/autoresearch/overnight-runner.sh

# Validate a checkpoint
bun run benchmarks/autoresearch/validate-checkpoint.ts
\`\`\`

### Harness CLI

\`\`\`bash
# Run a session headlessly
harness run "Build a REST API"

# Inspect a past session
harness inspect <session-id>

# Check system health
harness doctor
\`\`\`

## Configuration Paths

| Path | Purpose |
| --- | --- |
| \`.emergex/config.json\` | Project-level configuration |
| \`~/.emergex/config.json\` | Global configuration |
| \`~/.emergex/permissions.json\` | Command permission rules |
| \`~/.emergex/hooks.json\` | Automation hooks |
| \`.emergex/mcp.json\` | MCP server configuration |

## Environment Variables

| Variable | Purpose | Required |
| --- | --- | --- |
| \`OPENROUTER_API_KEY\` | API key for OpenRouter | Only for OpenRouter |
| \`TRAINING_PROXY_URL\` | Training proxy URL override | Only for kernel fine-tuning |
| \`OLLAMA_HOST\` | Override default Ollama URL | No |
| \`GITHUB_PERSONAL_ACCESS_TOKEN\` | For GitHub MCP server | Only for GitHub |`,
};

export const slashCommandsPage: DocPage = {
  slug: "reference/slash-commands",
  title: "Slash Commands",
  description: "Quick reference for all in-TUI slash commands.",
  category: "Reference",
  sections: [
    { id: "core-commands", title: "Core Commands", level: 2 },
    { id: "visual-features", title: "Visual Features", level: 2 },
    { id: "ai-features", title: "AI Features", level: 2 },
    { id: "personalization", title: "Personalization", level: 2 },
    { id: "skill-management", title: "Skill Management", level: 2 },
    { id: "permission-commands", title: "Permission Commands", level: 2 },
    { id: "hook-commands", title: "Hook Commands", level: 2 },
    { id: "mcp-commands", title: "MCP Commands", level: 2 },
  ],
  content: `## Core Commands

| Command | Aliases | Description |
| --- | --- | --- |
| \`/help\` | \`/h\`, \`/?\` | Show all available commands |
| \`/clear\` | \`/cls\`, \`/c\` | Clear the chat screen |
| \`/quit\` | \`/q\`, \`/exit\` | Exit EmergeX |
| \`/status\` | \`/s\`, \`/st\` | Show session status |

## Visual Features

| Command | Aliases | Description |
| --- | --- | --- |
| \`/animations\` | \`/anim\`, \`/fx\` | Preview ASCII animations |
| \`/adhd\` | \`/bionic\`, \`/focus\` | Toggle bionic reading mode |
| \`/kanban\` | \`/k\`, \`/board\` | Toggle the Kanban board view |

## AI Features

| Command | Aliases | Description |
| --- | --- | --- |
| \`/model\` | \`/m\` | Select or switch the active LLM model |
| \`/provider\` | \`/pr\` | Select LLM provider |
| \`/plan\` | \`/pl\` | Show the current BMAD execution plan |
| \`/predict\` | \`/p\`, \`/next\` | Show predicted next steps |
| \`/avenues\` | \`/a\`, \`/paths\` | Show planned avenues and trade-offs |
| \`/momentum\` | | Show execution velocity stats |
| \`/infinite\` | \`/inf\` | Enable autonomous mode |
| \`/evidence\` | | Show full evidence breakdown |

## Personalization

| Command | Aliases | Description |
| --- | --- | --- |
| \`/onboarding\` | \`/setup\`, \`/intro\` | Start the personalization wizard |
| \`/preferences\` | \`/prefs\`, \`/settings\` | View or edit preferences |
| \`/voice\` | \`/v\` | Configure voice TTS settings |
| \`/language\` | \`/lang\`, \`/l\` | Set the response language |

## Skill Management

| Command | Aliases | Description |
| --- | --- | --- |
| \`/quarantine\` | \`/quar\`, \`/sandbox\` | Manage the skill quarantine system |
| \`/toolshed\` | \`/shed\`, \`/tools\` | Query available tools by capability |
| \`/skills\` | \`/sk\` | List and manage skills |

## Permission Commands

| Command | Description |
| --- | --- |
| \`/permissions\` | Show current permission config |
| \`/allow <pattern>\` | Add a pattern to the allowed list |
| \`/deny <pattern>\` | Add a pattern to the denied list |
| \`/auto-approve\` | Toggle auto-approve mode |

## Hook Commands

| Command | Description |
| --- | --- |
| \`/hooks\` | List all registered hooks |
| \`/hooks enable <id>\` | Enable a specific hook |
| \`/hooks disable <id>\` | Disable a specific hook |

## MCP Commands

| Command | Description |
| --- | --- |
| \`/mcp list\` | List connected MCP servers |
| \`/mcp connect <server>\` | Manually connect to an MCP server |`,
};

export const toolsReferencePage: DocPage = {
  slug: "reference/tools",
  title: "Tools Reference",
  description: "Documentation for built-in capabilities and tool discovery.",
  category: "Reference",
  sections: [
    { id: "how-tools-work", title: "How Tools Work", level: 2 },
    { id: "core-tools", title: "Core Tools", level: 2 },
    { id: "ast-tools", title: "AST Tools", level: 2 },
    { id: "mcp-tools", title: "MCP Tools", level: 2 },
    { id: "lsp-tools", title: "LSP Tools", level: 2 },
    { id: "web-tools", title: "Web Tools", level: 2 },
    { id: "media-tools", title: "Media Tools", level: 2 },
    { id: "notebook-tools", title: "Notebook Tools", level: 2 },
    { id: "background-tools", title: "Background Tools", level: 2 },
    { id: "capability-groups", title: "Capability Groups", level: 2 },
    { id: "permission-model", title: "Permission Model", level: 2 },
  ],
  content: `## How Tools Work

EmergeX uses a toolshed architecture inspired by Stripe's agent design. The agent never carries all tools in its prompt. Instead, it queries the toolshed by capability when needed.

\`\`\`typescript
// Agent queries by capability
toolshed.query(capability: "code.symbol")
// Returns: get_outline, get_symbol, search_symbols
\`\`\`

## Core Tools

| Tool | Description |
| --- | --- |
| \`read_file\` | Read file contents |
| \`write_file\` | Write file contents |
| \`edit_file\` | Edit file with find/replace |
| \`list_files\` | List directory contents |
| \`execute_command\` | Run shell commands |
| \`search_files\` | Glob and grep file search |

## AST Tools

| Tool | Description |
| --- | --- |
| \`get_outline\` | Extract all symbols from a file |
| \`get_symbol\` | Retrieve a single symbol by AST path |
| \`search_symbols\` | Cross-file symbol search |

## MCP Tools

| Tool | Description |
| --- | --- |
| \`mcp_connect\` | Connect to an MCP server |
| \`mcp_call\` | Call an MCP tool |
| \`mcp_list\` | List available MCP capabilities |

## LSP Tools

| Tool | Description |
| --- | --- |
| \`lsp_definition\` | Go to definition |
| \`lsp_references\` | Find all references |
| \`lsp_hover\` | Get hover information |
| \`lsp_completion\` | Get code completions |
| \`lsp_diagnostics\` | Get diagnostics |

## Web Tools

| Tool | Description |
| --- | --- |
| \`web_search\` | Search the web |
| \`web_fetch\` | Fetch URL content |
| \`extract_content\` | Extract readable content from a URL |

## Media Tools

| Tool | Description |
| --- | --- |
| \`read_image\` | Read and describe images |
| \`read_pdf\` | Extract text from PDF files |
| \`search_pdf\` | Search within PDF documents |

## Notebook Tools

| Tool | Description |
| --- | --- |
| \`read_notebook\` | Read a Jupyter notebook |
| \`edit_cell\` | Edit a specific notebook cell |
| \`run_cell\` | Execute a notebook cell |

## Background Tools

| Tool | Description |
| --- | --- |
| \`run_background\` | Run a command in the background |
| \`check_background\` | Check status of a background task |
| \`kill_background\` | Stop a background task |

## Capability Groups

| Capability | Tools |
| --- | --- |
| \`code\` | AST query, symbol edit, patch |
| \`code.symbol\` | get_outline, get_symbol, search_symbols |
| \`web\` | web_search, web_fetch, extract_content |
| \`media\` | read_image, read_pdf, search_pdf |
| \`mcp\` | mcp_connect, mcp_call, mcp_list |
| \`lsp\` | lsp_definition, lsp_references, lsp_hover, lsp_completion, lsp_diagnostics |
| \`execution\` | execute_command, run_background, check_background, kill_background |

## Permission Model

| Permission | Description |
| --- | --- |
| \`read:code\` | Read source files |
| \`write:code\` | Modify source files |
| \`read:fs\` | Read filesystem |
| \`write:fs\` | Write filesystem |
| \`exec:shell\` | Execute shell commands |
| \`net:fetch\` | Make HTTP requests |
| \`mcp:connect\` | Connect to MCP servers |`,
};

export const designSystemsPage: DocPage = {
  slug: "reference/design-systems",
  title: "Design Systems",
  description: "The EmergeX aesthetic and UI component library.",
  category: "Reference",
  sections: [
    { id: "overview", title: "Overview", level: 2 },
    { id: "design-system-database", title: "Design System Database", level: 2 },
    { id: "tui-theme-architecture", title: "TUI Theme Architecture", level: 2 },
    { id: "animation-library", title: "Animation Library", level: 2 },
    { id: "terminal-color-safety", title: "Terminal Color Safety", level: 2 },
    { id: "design-protocol", title: "Design Protocol", level: 2 },
  ],
  content: `## Overview

EmergeX ships with a curated design system database containing 54 themes, animation patterns, and a full token-based design architecture.

## Design System Database

- **54 themes** spanning minimal, brutalist, glassmorphism, neumorphic, editorial, dashboard, and more
- **97 color palettes** with accessibility-tested contrast ratios
- **57 font pairings** organized by mood and readability
- **99 UX guidelines** covering interaction patterns
- **9 technology stacks** with framework-specific patterns

## TUI Theme Architecture

Three layers:

**1. Design Tokens** — Raw values for color, spacing, and typography.

**2. Semantic Layer** — Maps tokens to meaning:

| Purpose | Token |
| --- | --- |
| Secondary/muted text | \`dimColor\` |
| Primary emphasis | \`bold\` |
| Brand/assistant | \`cyan\` |
| User text | \`yellow\` |
| Success | \`green\` |
| Error | \`red\` |
| Warning | \`yellow\` |
| Accent | \`magenta\` |

**3. Primitive Components** — Pre-built components that enforce design consistency:

| Component | Purpose |
| --- | --- |
| \`AppText\` | Base text with theme awareness |
| \`MutedText\` | De-emphasized text |
| \`Badge\` | Status indicators |
| \`Card\` | Content containers |
| \`Stack\` | Vertical layout |
| \`Inline\` | Horizontal layout |

## Animation Library

- **Staggered entrance** — elements appear sequentially
- **Smooth transitions** — state changes animate between values
- **Number counters** — values animate to their target
- **Loading states** — spinners, progress bars, and skeleton screens

## Terminal Color Safety

**Never use:** \`gray\`, \`white\`, \`black\` — they break on certain terminal themes.

**Safe named colors:** \`red\`, \`green\`, \`yellow\`, \`blue\`, \`magenta\`, \`cyan\`

## Design Protocol

1. **Before building any UI component:** Query the design systems DB or check TUI primitives.
2. **Before choosing colors/fonts:** Consult the theme tokens.
3. **Before shipping UI:** Run web-design-guidelines review.`,
};

export const hooksReferencePage: DocPage = {
  slug: "reference/hooks",
  title: "Hooks Reference",
  description: "Configure automation triggers for your agent workflow.",
  category: "Reference",
  sections: [
    { id: "overview", title: "Overview", level: 2 },
    { id: "configuration", title: "Configuration", level: 2 },
    { id: "hook-types", title: "Hook Types", level: 2 },
    { id: "hook-modes", title: "Hook Modes", level: 2 },
    { id: "context-variables", title: "Context Variables", level: 2 },
    { id: "default-hooks", title: "Default Hooks", level: 2 },
    { id: "api-usage", title: "API Usage", level: 2 },
    { id: "examples", title: "Examples", level: 2 },
  ],
  content: `## Overview

Hooks run custom code at key points in the agent workflow. They support shell commands, external scripts, and inline JavaScript. Configure hooks in \`~/.emergex/hooks.json\`.

## Configuration

\`\`\`json
{
  "hooks": [
    {
      "id": "hook_123",
      "type": "onComplete",
      "name": "Voice Notification",
      "description": "Speaks completion message via macOS TTS",
      "mode": "shell",
      "command": "say -v Moira 'Task completed'",
      "enabled": true,
      "async": true,
      "continueOnError": true
    }
  ],
  "globalTimeout": 30000,
  "enabled": true
}
\`\`\`

## Hook Types

| Type | Trigger |
| --- | --- |
| \`beforeTool\` | Before any tool executes |
| \`afterTool\` | After any tool completes |
| \`beforeCommand\` | Before a shell command runs |
| \`afterCommand\` | After a shell command completes |
| \`onError\` | When a tool or command fails |
| \`onComplete\` | When a task finishes |
| \`onStart\` | When the agent session starts |
| \`onExit\` | When the agent session ends |

## Hook Modes

**Shell Mode** — Run shell commands with variable substitution:

\`\`\`json
{
  "mode": "shell",
  "command": "echo 'Tool {tool} completed in {duration}ms'"
}
\`\`\`

**Script Mode** — Run external script files:

\`\`\`json
{
  "mode": "script",
  "scriptPath": "~/.emergex/hooks/notify.ts"
}
\`\`\`

**Function Mode** — Run inline JavaScript:

\`\`\`json
{
  "mode": "function",
  "functionBody": "console.log('Tool:', context.tool); return 'done';"
}
\`\`\`

## Context Variables

| Variable | Description |
| --- | --- |
| \`{tool}\` | Current tool name |
| \`{command}\` | Shell command being run |
| \`{result}\` | Tool or command output |
| \`{error}\` | Error message if failed |
| \`{sessionId}\` | Current session ID |
| \`{duration}\` | Execution time in milliseconds |

## Default Hooks

| Name | Type | Description |
| --- | --- | --- |
| Tool Logger | \`afterTool\` | Logs tool executions |
| Command Logger | \`afterCommand\` | Logs shell commands |
| Error Logger | \`onError\` | Logs errors |
| macOS Notification | \`onComplete\` | Shows a system notification |
| Voice Notification | \`onComplete\` | TTS announcement |
| Auto Git Add | \`afterTool\` | Stages changed files |
| Auto Lint | \`afterTool\` | Runs linter after file writes |

## API Usage

\`\`\`typescript
import { getHookManager, registerShellHook } from "EmergeX-code/hooks";

const manager = getHookManager();

// Register a custom hook
const hook = registerShellHook(
  "onComplete",
  "My Notification",
  "say 'Done: {result}'"
);

// Execute hooks manually
await manager.executeHooks("onComplete", {
  result: "Task finished",
  duration: 1500
});
\`\`\`

## Examples

**Voice notification on completion:**

\`\`\`json
{
  "type": "onComplete",
  "mode": "shell",
  "command": "say -v Moira 'Task completed'",
  "async": true
}
\`\`\`

**Telegram notification:**

\`\`\`json
{
  "type": "onComplete",
  "mode": "shell",
  "command": "curl -s -X POST https://api.telegram.org/bot$BOT_TOKEN/sendMessage -d chat_id=$CHAT_ID -d text='EmergeX: {result}'",
  "async": true
}
\`\`\``,
};

export const contributingPage: DocPage = {
  slug: "contributing",
  title: "Contributing",
  description: "Guide for developers wishing to improve EmergeX.",
  category: "Contributing",
  sections: [
    { id: "philosophy", title: "Philosophy", level: 2 },
    { id: "getting-started", title: "Getting Started", level: 2 },
    { id: "code-standards", title: "Code Standards", level: 2 },
    { id: "contribution-workflow", title: "Contribution Workflow", level: 2 },
    { id: "project-structure", title: "Project Structure", level: 2 },
    { id: "areas-to-contribute", title: "Areas to Contribute", level: 2 },
  ],
  content: `## Philosophy

EmergeX is built on a few core principles:

1. **Local-first.** The agent should work entirely offline with local LLMs.
2. **Token efficiency.** Every design decision considers token cost.
3. **Execution over knowledge.** Benchmarks are execution-graded.
4. **Self-improvement.** The autoresearch pipeline creates feedback loops.

## Getting Started

\`\`\`bash
git clone https://github.com/Adebayodamilola20/EmergeX_Foundation.git
cd EmergeX_Foundation
bun install
bun run tui

# Run the benchmark suite
bun run benchmark:v2
\`\`\`

## Code Standards

**Runtime** — EmergeX uses **Bun** exclusively. No Node.js-specific APIs.

**TUI Rules:**
- No raw \`<Text>\` or \`<Box>\` in screens — use primitives
- No forbidden colors: \`gray\`, \`white\`, \`black\`
- Safe named colors: \`red\`, \`green\`, \`yellow\`, \`blue\`, \`magenta\`, \`cyan\`
- Formatting in \`lib/\` — use \`formatTokens()\`, \`formatDuration()\`, \`truncate()\`

**AI Judging** — Never use string matching. Always use the Vercel AI SDK as a judge.

**Versioning** — Follow SemVer. Version lives in \`package.json\`, \`bin/EmergeX.ts\`, and \`README.md\`.

## Contribution Workflow

1. Fork the repo
2. Create a feature branch (\`git checkout -b feature/amazing\`)
3. Make your changes following the code standards
4. Run benchmarks to verify nothing regresses
5. Update \`CHANGELOG.md\`
6. Commit and push
7. Open a Pull Request

## Project Structure

\`\`\`
EmergeX-code/
|-- apps/
|   |-- tui/            # Terminal UI (Ink v6)
|   |-- clui/           # Desktop overlay (Tauri 2.0)
|   |-- dashboard/      # Admin panel (Next.js)
|-- packages/
|   |-- eight/          # Core agent engine
|   |-- ast-index/      # AST parsing
|   |-- mcp/            # MCP client
|   |-- planning/       # BMAD planner
|   |-- kernel/         # RL fine-tuning
|   |-- toolshed/       # Tool registry
|   |-- validation/     # Evidence collection
|   |-- hooks/          # Hook system
|   |-- permissions/    # Permission system
|   |-- tools/          # Web, PDF, image tools
|-- benchmarks/
|   |-- autoresearch/   # Self-improving harness
|   |-- categories/     # 6 tiers, 39+ tasks
\`\`\`

## Areas to Contribute

- **Benchmarks** — Add new benchmark categories or improve existing ones
- **Tool implementations** — New tools for the toolshed
- **MCP servers** — Custom MCP server integrations
- **TUI components** — New primitives, animations, or visualizations
- **Model support** — Test and document performance with new models
- **Documentation** — Improve guides and reference docs`,
};
