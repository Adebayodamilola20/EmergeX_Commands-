import { DocPage } from "./types";

export const bmadMethodPage: DocPage = {
  slug: "guides/bmad-method",
  title: "BMAD Method",
  description: "Understand EmergeX's structured approach to AI-driven coding.",
  category: "Guides",
  sections: [
    { id: "what-is-bmad", title: "What is BMAD?", level: 2 },
    { id: "planning-phase", title: "Planning Phase", level: 2 },
    { id: "how-planning-looks", title: "How Planning Looks", level: 3 },
    { id: "execution-phase", title: "Execution Phase", level: 2 },
    { id: "foresight-and-avenues", title: "Foresight and Avenues", level: 3 },
    { id: "momentum-tracking", title: "Momentum Tracking", level: 3 },
    { id: "verification-phase", title: "Verification Phase", level: 2 },
    { id: "how-bmad-differs-from-freeform-agents", title: "How BMAD Differs from Freeform Agents", level: 2 },
    { id: "bmad-documents", title: "BMAD Documents", level: 2 },
  ],
  content: `## What is BMAD?

BMAD stands for **Breakthrough Method of Agile AI-driven Development**. It is a structured approach to AI-assisted coding that separates planning from execution, ensuring the agent thinks before it acts.

Most chat-based coding agents operate in freeform mode - they receive a prompt and immediately start generating code. This works for simple tasks, but complex projects suffer from scope creep, missed requirements, and wasted tokens on wrong approaches.

BMAD solves this by enforcing three distinct phases: **Plan**, **Execute**, and **Verify**.

## Planning Phase

When you give EmergeX a task, it first classifies the work into one of five categories:

| Category | Example |
| --- | --- |
| **Code** | Build a REST API, fix a bug, refactor a module |
| **Creative** | Generate lyrics, design a UI mockup |
| **Research** | Investigate an API, compare libraries |
| **Planning** | Architect a system, create a project roadmap |
| **Communication** | Draft an email, write documentation |

Each category has a tailored planning approach. Code tasks get numbered implementation steps. Research tasks get exploration avenues. Creative tasks get structured briefs.

### How Planning Looks

\`\`\`
User: Build a Next.js site with auth and dark mode

EmergeX:
┌─────────────────────────────────────────┐
│ PLAN                                    │
├─────────────────────────────────────────┤
│ 1. Initialize Next.js project           │
│ 2. Set up authentication (NextAuth)     │
│ 3. Create theme provider (dark/light)   │
│ 4. Build UI components                  │
│ 5. Add tests and verify                 │
└─────────────────────────────────────────┘
\`\`\`

The plan is visible at any time via \`/plan\`. It also populates the Kanban board automatically - each step becomes a card that moves from Backlog to In Progress to Done as EmergeX works.

## Execution Phase

Once the plan is set, EmergeX executes each step sequentially. During execution, the system tracks:

- **Modified files** - Every file written or edited
- **Tool calls** - Every command run, search performed, or file read
- **Errors encountered** - Build failures, type errors, test failures
- **Evidence collected** - Pass/fail results from verification checks

The proactive planner updates predictions after every tool call, adjusting the remaining steps based on what it learns.

### Foresight and Avenues

EmergeX does not just follow a linear plan. It anticipates problems and explores alternatives:

- **Prediction** - Analyzes the current task to predict the next 3-5 logical steps. View with \`/predict\` or \`/next\`.
- **Avenues** - Before committing to an approach, EmergeX briefly explores multiple options and weighs trade-offs. View with \`/avenues\`.
- **Proactive warnings** - If EmergeX detects scope creep, technical debt, circular dependencies, over-engineering, or performance traps, it speaks up.

\`\`\`
Warning: Adding a 4th boolean prop to <Button> suggests
it may be time for a variant-based API instead.

Shall I propose a refactor, or continue as planned?
\`\`\`

### Momentum Tracking

The planner tracks execution velocity:

- **Steps completed** - How many plan steps are done
- **Rate** - Steps per minute
- **Streak** - Consecutive successful steps

View momentum stats with \`/momentum\`.

## Verification Phase

After execution, EmergeX collects evidence that the work is correct:

- **Type checking** - Runs \`tsc\` to verify TypeScript compiles
- **Tests** - Runs test suites if they exist
- **Lint** - Checks for code quality issues
- **Build** - Verifies the project builds successfully
- **Manual checks** - Reads back modified files to confirm changes

Evidence badges (pass/fail) appear in the chat stream after each file write and command execution. At the end of a task, EmergeX provides a completion report summarizing all evidence.

View the full evidence breakdown with \`/evidence\`.

## How BMAD Differs from Freeform Agents

| Aspect | Freeform Agent | BMAD Agent |
| --- | --- | --- |
| Planning | None - dives straight into code | Explicit plan before any code is written |
| Scope | Unbounded - may go on tangents | Bounded by the plan steps |
| Visibility | Chat stream only | Plan view, Kanban board, predictions, evidence |
| Recovery | Must re-explain on failure | Adjusts plan and retries the specific step |
| Verification | User manually checks | Automatic evidence collection |

## BMAD Documents

EmergeX ships with 20 BMAD planning documents covering project briefs, product requirement documents (PRDs), architecture docs, and epics. These live in \`docs/bmad/\` within the EmergeX-code repository and serve as templates for the agent's planning process.`,
};

export const personalizationPage: DocPage = {
  slug: "guides/personalization",
  title: "Personalization",
  description: "Tailor the voice, personality, and tone of your agent.",
  category: "Guides",
  sections: [
    { id: "overview", title: "Overview", level: 2 },
    { id: "smart-onboarding", title: "Smart Onboarding", level: 2 },
    { id: "auto-detection", title: "Auto-Detection", level: 3 },
    { id: "the-3-question-flow", title: "The 3-Question Flow", level: 3 },
    { id: "adaptive-system-prompt", title: "Adaptive System Prompt", level: 2 },
    { id: "style-mapping", title: "Style Mapping", level: 3 },
    { id: "preferences-cloud-sync", title: "Preferences Cloud Sync", level: 2 },
    { id: "session-history-and-resume", title: "Session History and Resume", level: 2 },
    { id: "personal-lora-training", title: "Personal LoRA Training (Preview)", level: 2 },
    { id: "autonomy-thresholds", title: "Autonomy Thresholds", level: 2 },
    { id: "all-personalization-commands", title: "All Personalization Commands", level: 2 },
  ],
  content: `## Overview

EmergeX's personalization system is built on a simple principle: **the agent should know you better with every session**. Rather than asking you to fill out config files or tweak YAML, EmergeX detects your environment, asks three focused questions, and then adapts continuously.

The personalization pipeline has four stages:

1. **Auto-detection** - reads your git config, scans for Ollama/LM Studio models, checks \`gh auth\` status.
2. **Onboarding** - a 3-question interactive flow that fills in what detection missed.
3. **Cloud sync** - preferences travel with you across machines via Convex (after \`/auth login\`).
4. **Continuous learning** - session traces are collected and quality-filtered for personal LoRA fine-tuning.

All personalization data lives in \`.emergex/user.json\` (local) and optionally syncs to Convex (cloud). Local data is never sent to third parties. Cloud sync is opt-in via authentication.

## Smart Onboarding

On first launch, emergex runs auto-detection in parallel before asking you anything.

### Auto-Detection

| Signal | How it's detected | What it sets |
| --- | --- | --- |
| Your name | \`git config --global user.name\` | \`identity.name\` |
| Your email | \`git config --global user.email\` | displayed in onboarding summary |
| Ollama models | \`ollama list\` | available models, default model |
| LM Studio models | \`GET http://localhost:1234/v1/models\` | available models |
| GitHub auth | \`gh auth status\` | GitHub username |
| Preferred provider | presence of Ollama or LM Studio | default provider |

All checks run via \`Promise.allSettled\` - if any fail (e.g., Ollama not installed), they are silently skipped.

### The 3-Question Flow

After detection, onboarding presents what it found and asks only what it could not infer:

1. **Identity confirmation** - Shows detected name, email, GitHub, provider, models. Press Enter to accept or type corrections.
2. **Communication style** - Choose from: concise, detailed, casual, or formal.
3. **Confirmation** - Review and confirm settings.

Re-run onboarding at any time with \`/onboarding\` (aliases: \`/onboard\`, \`/setup\`, \`/intro\`).

## Adaptive System Prompt

EmergeX personalizes its system prompt based on your onboarding data. A \`USER_CONTEXT_SEGMENT\` is injected into every agent turn.

### Style Mapping

| Style | System prompt instruction |
| --- | --- |
| \`concise\` | Be brief and direct. Skip explanations unless asked. |
| \`detailed\` | Explain your reasoning. Teach as you go. |
| \`casual\` | Keep it friendly and collaborative. We're partners. |
| \`formal\` | Maintain professional tone. Be precise. |

## Preferences Cloud Sync

After authenticating with \`/auth login\`, your preferences sync to Convex and follow you across devices.

| Field | Description |
| --- | --- |
| Default model | Your preferred LLM |
| Default provider | Ollama, LM Studio, or OpenRouter |
| Communication style | How Eight talks to you |
| Language | Response language |
| Git branch prefix | e.g. \`EmergeX/\` |
| Autonomy threshold | When Eight asks for permission |

## Session History and Resume

EmergeX tracks your conversations and lets you pick up where you left off, even on a different machine.

| Command | Aliases | Description |
| --- | --- | --- |
| \`/history\` | \`/hist\`, \`/sessions\` | Browse all past sessions |
| \`/resume\` | \`/res\` | Resume a recent session (pick from last 5) |
| \`/continue\` | \`/cont\`, \`/last\` | Continue the most recent session automatically |
| \`/compact\` | \`/compress\`, \`/summarize\` | Summarize and compress the current conversation |

## Personal LoRA Training (Preview)

EmergeX collects high-quality session traces for personal LoRA fine-tuning. This feature is in preview and not yet shipped.

| Filter | Threshold |
| --- | --- |
| PRM judge score | >= 0.7 |
| User did not correct the response | \`false\` |
| All tool calls succeeded | \`true\` |
| Response length | >= 50 characters |

Training data is stored locally at \`.emergex/kernel/training/\`. Collection happens automatically.

## Autonomy Thresholds

The \`askThreshold\` setting controls when EmergeX pauses to ask for permission:

| Value | Behavior |
| --- | --- |
| \`always\` | Ask before every action |
| \`important\` | Ask before destructive or irreversible actions |
| \`fatal-only\` | Only ask before potentially dangerous operations (default) |
| \`never\` | Full autonomy - never ask |

## All Personalization Commands

| Command | Aliases | Description |
| --- | --- | --- |
| \`/onboarding\` | \`/onboard\`, \`/setup\`, \`/intro\` | Start or restart personalization setup |
| \`/preferences\` | \`/prefs\`, \`/settings\` | View or edit your preferences |
| \`/auth\` | \`/login\`, \`/account\` | Authentication management |
| \`/model\` | \`/m\` | Select LLM model |
| \`/provider\` | \`/pr\` | Select LLM provider |
| \`/voice\` | \`/v\` | Voice TTS settings |
| \`/language\` | \`/lang\`, \`/l\` | Set response language |
| \`/history\` | \`/hist\`, \`/sessions\` | Browse past sessions |
| \`/resume\` | \`/res\` | Resume a recent session |
| \`/continue\` | \`/cont\`, \`/last\` | Continue most recent session |
| \`/compact\` | \`/compress\`, \`/summarize\` | Compress current conversation |
| \`/infinite\` | \`/inf\` | Enable autonomous mode |
| \`/adhd\` | \`/bionic\`, \`/focus\` | Toggle ADHD/bionic reading mode |
| \`/status\` | \`/s\`, \`/st\` | Show session status |`,
};

export const tuiGuidePage: DocPage = {
  slug: "guides/tui",
  title: "TUI Guide",
  description: "Master the terminal interface and ADHD-friendly features.",
  category: "Guides",
  sections: [
    { id: "overview", title: "Overview", level: 2 },
    { id: "key-screens", title: "Key Screens", level: 2 },
    { id: "chat-screen", title: "Chat Screen", level: 3 },
    { id: "kanban-board", title: "Kanban Board", level: 3 },
    { id: "animation-gallery", title: "Animation Gallery", level: 3 },
    { id: "adhd-bionic-reading-mode", title: "ADHD / Bionic Reading Mode", level: 2 },
    { id: "ghost-suggestions", title: "Ghost Suggestions", level: 2 },
    { id: "voice-output", title: "Voice Output", level: 2 },
    { id: "keyboard-shortcuts", title: "Keyboard Shortcuts", level: 2 },
    { id: "design-system", title: "Design System", level: 2 },
  ],
  content: `## Overview

The EmergeX TUI is built with Ink v6 (React for CLI). It provides a rich terminal experience with animations, intelligent suggestions, visual task management, and accessibility features. The design system uses semantic color tokens so the UI remains readable across terminal themes (dark, light, Solarized, etc.).

## Key Screens

### Chat Screen

The primary interface. You type at the bottom, messages appear above. The status bar shows the active model, git branch, and current agent mode.

Messages render with typing effects - characters appear progressively for short responses, word-by-word for longer content. Fade-in and pop-in animations smooth the visual flow.

### Kanban Board

Toggle with \`/kanban\` or \`/k\`. The board has three columns: **Backlog**, **In Progress**, and **Done**. When EmergeX creates a plan, each step becomes a Kanban card that moves automatically as the agent works.

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│ Backlog (3)     │ In Progress (1)  │ Done (2)                  │
├─────────────────────────────────────────────────────────────────┤
│ ○ Add tests     │ ● Fix auth bug   │ ✓ Setup project           │
│ ○ Update docs   │                  │ ✓ Create components       │
│ ○ Add caching   │                  │                           │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

Navigate cards with arrow keys.

### Animation Gallery

Access with \`/animations\` or \`/anim\`. EmergeX includes ten ASCII animations:

| Animation | Command | Description |
| --- | --- | --- |
| Matrix Rain | \`/animations matrix\` | Classic green falling code |
| Fire Effect | \`/animations fire\` | Dynamic flames |
| DNA Helix | \`/animations dna\` | Rotating double helix |
| Starfield | \`/animations stars\` | 3D space travel effect |
| Bouncing Dots | \`/animations dots\` | Mesmerizing particles |
| Glitch Text | \`/animations glitch\` | Cyberpunk text corruption |
| Confetti | \`/animations confetti\` | Celebration particles |
| Waveform | \`/animations wave\` | Audio-style wave |
| Gradient Wave | \`/animations gradient\` | Smooth color transitions |
| Gallery | \`/animations all\` | Browse all with arrow keys |

## ADHD / Bionic Reading Mode

Toggle with \`/adhd\`, \`/bionic\`, or \`/focus\`.

Bionic reading bolds the first half of each word, creating visual anchors that help your brain process text faster:

\`\`\`
Normal:   The quick brown fox jumps over the lazy dog
Bionic:   Th·e qui·ck bro·wn fox jum·ps ov·er the la·zy dog
\`\`\`

The bolded portions (before the dot) create fixation points. Research suggests this can improve reading speed by up to 2x for some readers.

## Ghost Suggestions

As you type, dim ghost text appears predicting your next command or input. The prediction system draws from three sources:

- **Git state** - If you have uncommitted changes, it may suggest a commit
- **Active plan** - Shows the next step from the current BMAD plan
- **Command history** - Learns from your recent inputs

Press **Tab** to accept the full suggestion. Press **Esc** to dismiss it.

## Voice Output

EmergeX can speak completion summaries aloud using TTS. The default voice is Moira (Irish) on macOS. Configure voice output via the \`/voice\` command or through a hook:

\`\`\`json
{
  "type": "onComplete",
  "mode": "shell",
  "command": "say -v Moira '{result}'"
}
\`\`\`

On macOS, this uses the built-in \`say\` command.

## Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| **Tab** | Accept ghost suggestion |
| **Esc** | Dismiss ghost suggestion |
| **Ctrl+T** | Cycle agent mode |
| **Ctrl+B** | Toggle process sidebar |
| **Up / Down** | Navigate command history |
| **Arrow keys** | Navigate Kanban cards (when board is visible) |

## Design System

The TUI follows a design-system-first architecture. All UI is built from primitive components rather than raw Ink elements.

| Component | Purpose |
| --- | --- |
| \`AppText\` | Base text with theme-aware colors |
| \`MutedText\` | De-emphasized secondary text |
| \`Heading\` | Section headings |
| \`Stack\` | Vertical layout |
| \`Inline\` | Horizontal layout |
| \`Card\` | Bordered content container |
| \`Badge\` | Status indicators |
| \`Alert\` | Feedback messages |
| \`SpinnerRow\` | Loading states |`,
};

export const mcpIntegrationPage: DocPage = {
  slug: "guides/mcp-integration",
  title: "MCP Integration",
  description: "Connect EmergeX to external tools and APIs via MCP.",
  category: "Guides",
  sections: [
    { id: "what-is-mcp", title: "What is MCP?", level: 2 },
    { id: "configuration", title: "Configuration", level: 2 },
    { id: "available-mcp-servers", title: "Available MCP Servers", level: 2 },
    { id: "using-mcp-tools", title: "Using MCP Tools", level: 2 },
    { id: "example-github-integration", title: "Example: GitHub Integration", level: 2 },
    { id: "writing-custom-mcp-servers", title: "Writing Custom MCP Servers", level: 2 },
  ],
  content: `## What is MCP?

The Model Context Protocol (MCP) is a standard for connecting AI agents to external tools and data sources. EmergeX includes a built-in MCP client that can connect to any MCP-compatible server, giving the agent access to tools like GitHub, databases, file systems, and more.

## Configuration

MCP servers are configured in \`.emergex/mcp.json\` in your project root:

\`\`\`json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"]
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data.db"]
    }
  }
}
\`\`\`

## Available MCP Servers

| Server | Package | Purpose |
| --- | --- | --- |
| GitHub | \`@modelcontextprotocol/server-github\` | Issues, PRs, repos, code search |
| Filesystem | \`@modelcontextprotocol/server-filesystem\` | Sandboxed file access |
| SQLite | \`@modelcontextprotocol/server-sqlite\` | Database queries |
| Postgres | \`@modelcontextprotocol/server-postgres\` | PostgreSQL access |
| Brave Search | \`@modelcontextprotocol/server-brave-search\` | Web search |

## Using MCP Tools

Once configured, MCP tools become available to the agent through the toolshed. The agent discovers MCP capabilities dynamically.

| Command | Description |
| --- | --- |
| \`/mcp list\` | List connected MCP servers and their tools |
| \`/mcp connect <server>\` | Manually connect to a server |

### How It Works Internally

1. **Server launch** - Spawns the MCP server process using the configured command
2. **Capability discovery** - Queries the server for available tools
3. **Tool registration** - Registers discovered tools in the toolshed
4. **Execution** - Routes tool calls through the MCP protocol
5. **Cleanup** - Shuts down server processes when the session ends

## Example: GitHub Integration

Set up the GitHub MCP server:

1. Create a GitHub personal access token at [github.com/settings/tokens](https://github.com/settings/tokens)

2. Add the server to \`.emergex/mcp.json\`:

\`\`\`json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
\`\`\`

3. Now you can ask EmergeX to interact with GitHub:

\`\`\`bash
> List the open issues on 8gi-foundation/EmergeX-code
> Create a PR for my current branch
> What are the failing checks on PR #42?
\`\`\`

## Writing Custom MCP Servers

Any process that speaks the MCP protocol can serve as a tool provider. The \`@modelcontextprotocol/sdk\` package provides TypeScript utilities for building servers:

\`\`\`bash
npm install @modelcontextprotocol/sdk
\`\`\`

Your server exposes tools with input schemas, and EmergeX's client discovers and calls them automatically.`,
};

export const openrouterPage: DocPage = {
  slug: "guides/openrouter",
  title: "OpenRouter",
  description: "Access high-performance cloud models with EmergeX.",
  category: "Guides",
  sections: [
    { id: "why-openrouter", title: "Why OpenRouter?", level: 2 },
    { id: "setup", title: "Setup", level: 2 },
    { id: "available-free-models", title: "Available Free Models", level: 2 },
    { id: "dynamic-model-router", title: "Dynamic Model Router", level: 2 },
    { id: "hybrid-setup", title: "Hybrid Setup: Local + Cloud Fallback", level: 2 },
    { id: "cost", title: "Cost", level: 2 },
  ],
  content: `## Why OpenRouter?

Not everyone has a GPU capable of running local models. OpenRouter provides access to free and paid cloud models through a unified API. EmergeX's dynamic model router can automatically select the best available free model, keeping your costs at zero.

## Setup

### 1. Get an API Key

Sign up at [openrouter.ai](https://openrouter.ai/) and create an API key.

### 2. Set the Environment Variable

\`\`\`bash
export OPENROUTER_API_KEY=sk-or-your-key-here
\`\`\`

### 3. Configure EmergeX

\`\`\`bash
/provider openrouter
\`\`\`

Or set it in \`.emergex/config.json\`:

\`\`\`json
{
  "provider": "openrouter",
  "model": "auto:free"
}
\`\`\`

## Available Free Models

| Model | Strengths |
| --- | --- |
| \`openrouter/auto\` | Smart routing to best free model |
| \`qwen/qwen3-coder-480b:free\` | Top-tier coding performance |
| \`meta-llama/llama-3.3-70b-instruct:free\` | Strong general purpose |
| \`google/gemma-3-27b-it:free\` | Efficient mid-size model |
| \`deepseek/deepseek-chat-v3-0324:free\` | DeepSeek V3, strong at reasoning |

## Dynamic Model Router

EmergeX includes an experience-based model router that learns which models perform best for different task types. When you use \`auto:free\`, the router:

1. Queries OpenRouter for available free models
2. Checks its experience database for domain-specific performance data
3. Routes to the model with the best track record for the current task type

## Hybrid Setup: Local + Cloud Fallback

\`\`\`json
{
  "provider": "ollama",
  "model": "qwen3.5",
  "fallback": {
    "provider": "openrouter",
    "model": "auto:free"
  }
}
\`\`\`

With this configuration, EmergeX uses your local model by default and falls back to a free cloud model if Ollama is unavailable or the local model times out.

## Cost

Free models on OpenRouter have rate limits but no per-token charges. For heavier usage, OpenRouter offers paid models with higher rate limits and better availability.`,
};
