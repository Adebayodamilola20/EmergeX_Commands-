import { DocPage } from "./types";

export const installationPage: DocPage = {
  slug: "getting-started/installation",
  title: "Install EmergeX",
  description: "Set up EmergeX and its prerequisites in under two minutes.",
  category: "Getting Started",
  sections: [
    { id: "install-emergex", title: "Install EmergeX", level: 2 },
    { id: "prerequisites-automatic", title: "Prerequisites (Automatic)", level: 2 },
    { id: "ollama", title: "Ollama", level: 3 },
    { id: "pull-a-model", title: "Pull a Model", level: 3 },
    { id: "verify-installation", title: "Verify Installation", level: 2 },
    { id: "install-from-source-contributors", title: "Install from Source (Contributors)", level: 2 },
    { id: "troubleshooting", title: "Troubleshooting", level: 2 },
    { id: "ollama-connection-refused", title: "Ollama connection refused", level: 3 },
    { id: "model-not-found", title: "Model not found", level: 3 },
    { id: "permission-denied", title: "Permission denied on emergex command", level: 3 },
    { id: "next-steps", title: "Next Steps", level: 2 },
    { id: "migration-note", title: "Migration Note", level: 2 },
  ],
  content: `# Getting Started

## Install EmergeX

\`\`\`bash
npm install -g @emergex/emergex-code
emergex
\`\`\`

That's it. Two commands. EmergeX will guide you through Ollama setup on first launch if needed. Three binary aliases are installed: \`emergex\`, \`emergex-code\`, and \`8\` (the shortcut).

## Prerequisites (Automatic)

EmergeX uses Ollama for local LLM inference. If you don't have it, the first-run setup will walk you through it. To install manually:

### Ollama

Download from [ollama.ai](https://ollama.ai/) or install via Homebrew on macOS:

\`\`\`bash
brew install ollama
ollama serve
\`\`\`

### Pull a Model

\`\`\`bash
# Recommended starting model
ollama pull qwen2.5-coder:1.5b

# Larger, stronger reasoning
ollama pull qwen2.5-coder:7b
\`\`\`

## Verify Installation

\`\`\`bash
emergex
\`\`\`

You should see the EmergeX TUI appear with its splash animation.

## Install from Source (Contributors)

\`\`\`bash
git clone https://github.com/Adebayodamilola20/EmergeX_Foundation.git
cd EmergeX_Foundation
bun install
bun run tui
\`\`\`

## Troubleshooting

### Ollama connection refused

Make sure the Ollama service is running:

\`\`\`bash
ollama serve
\`\`\`

By default, Ollama listens on \`http://localhost:11434\`. If you have changed the port, update your EmergeX configuration accordingly.

### Model not found

If EmergeX reports a missing model, pull it explicitly:

\`\`\`bash
ollama pull qwen2.5-coder:7b
\`\`\`

### Permission denied on emergex command

Ensure the symlink target is executable:

\`\`\`bash
chmod +x ~/.local/bin/emergex
\`\`\`

## Next Steps

Head to the [Quick Start guide](/docs/getting-started/quick-start) to run your first coding session.

## Migration Note

If you were using 8gent previously, the new \`emergex\` command will automatically take over your old shortcuts.`,
};

export const quickStartPage: DocPage = {
  slug: "getting-started/quick-start",
  title: "Quick Start",
  description: "Your first coding session with EmergeX in under 5 minutes.",
  category: "Getting Started",
  sections: [
    { id: "launch-emergex", title: "Launch EmergeX", level: 2 },
    { id: "your-first-task", title: "Your First Task", level: 2 },
    { id: "ghost-suggestions", title: "Ghost Suggestions", level: 2 },
    { id: "working-with-files", title: "Working with Files", level: 2 },
    { id: "keyboard-shortcuts", title: "Keyboard Shortcuts", level: 2 },
    { id: "next-steps", title: "Next Steps", level: 2 },
  ],
  content: `# Quick Start

## Launch EmergeX

Start the TUI from any project directory:

\`\`\`bash
# Full command
emergex

# Short alias
8
\`\`\`

## Your First Task

Type a coding task in natural language. EmergeX will plan the work using the BMAD method, then execute it step by step.

> Build a REST API with Express that has user CRUD endpoints

EmergeX will:

1. **Plan** - Break the task into steps.
2. **Execute** - Write files and run commands.
3. **Verify** - Check that the code works.

## Ghost Suggestions

As you type, EmergeX shows dim ghost text predicting your next command. These suggestions are context-aware:

- **Git-aware** - Suggests commits when you are on a branch with changes.
- **Plan-aware** - Shows the next step from the active plan.
- **History-aware** - Learns from your recent commands.

Press **Tab** to accept a suggestion, or **Esc** to dismiss it.

## Working with Files

EmergeX can read, write, and edit files in your project. It uses AST-first navigation to minimize token usage, fetching only the symbols it needs rather than reading entire files.

> Show me the outline of src/parser.ts
> What does the buildSymbolId function do?
> Add error handling to the processData function in src/utils.ts

When EmergeX writes or edits files, it collects evidence (type checks, lint results) to verify the changes are correct. You will see pass/fail badges appear in the chat stream.

## Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| **Tab** | Accept ghost suggestion |
| **Esc** | Dismiss suggestion |
| **Ctrl+T** | Cycle agent mode (Planning, Researching, Implementing, Testing, Debugging) |
| **Ctrl+B** | Toggle process sidebar |
| **Up/Down** | Navigate command history |

## Next Steps

- [Configuration](/docs/getting-started/configuration) - Customize models, providers, and behavior.
- [BMAD Method](/docs/guides/bmad-method) - Understand EmergeX's structured planning approach.
- [TUI Guide](/docs/guides/tui) - Master the terminal interface.`,
};

export const configurationPage: DocPage = {
  slug: "getting-started/configuration",
  title: "Configuration",
  description: "Customize models, providers, permissions, and automation hooks.",
  category: "Getting Started",
  sections: [
    { id: "configuration-file", title: "Configuration File", level: 2 },
    { id: "model-selection", title: "Model Selection", level: 2 },
    { id: "recommended-models", title: "Recommended Models", level: 3 },
    { id: "provider-configuration", title: "Provider Configuration", level: 2 },
    { id: "ollama-default", title: "Ollama (Default)", level: 3 },
    { id: "openrouter", title: "OpenRouter", level: 3 },
    { id: "lm-studio", title: "LM Studio", level: 3 },
    { id: "permissions", title: "Permissions", level: 2 },
    { id: "hooks", title: "Hooks", level: 2 },
    { id: "mcp-servers", title: "MCP Servers", level: 2 },
    { id: "environment-variables", title: "Environment Variables", level: 2 },
  ],
  content: `## Configuration File

EmergeX reads its configuration from \`.emergex/config.json\` in your project root. A global configuration can also be placed at \`~/.emergex/config.json\`. Project-level settings override global ones.

\`\`\`json
{
  "model": "qwen2.5-coder:7b",
  "provider": "ollama",
  "ollamaUrl": "http://localhost:11434",
  "temperature": 0.7
}
\`\`\`

## Model Selection

EmergeX supports any model available through Ollama or OpenRouter. Use the \`/model\` command in the TUI to switch models interactively, or set the default in your config:

\`\`\`json
{
  "model": "qwen2.5-coder:7b"
}
\`\`\`

### Recommended Models

| Model | Size | Use Case |
| --- | --- | --- |
| \`qwen2.5-coder:7b\` | ~7GB | Recommended - strong upstream coding performance |
| \`qwen2.5-coder:1.5b\` | ~1.5GB | Fast - good for simple tasks |
| \`deepseek-coder:33b\` | ~33GB | Powerful - for complex reasoning |

The \`/model\` command accepts any arbitrary model identifier. If the model is available in your Ollama instance, EmergeX will use it.

## Provider Configuration

EmergeX supports three providers: Ollama (local), OpenRouter (cloud), and LM Studio (local).

\`\`\`json
{
  "provider": "ollama",
  "ollamaUrl": "http://localhost:11434"
}
\`\`\`

### Ollama (Default)

Runs models locally. No API key needed. Ollama must be running on the configured URL.

### OpenRouter

Access free and paid cloud models. Set your API key as an environment variable:

\`\`\`bash
export OPENROUTER_API_KEY=sk-or-your-key-here
\`\`\`

Then configure the provider:

\`\`\`json
{
  "provider": "openrouter"
}
\`\`\`

EmergeX's dynamic model router can automatically select the best available free model:

\`\`\`json
{
  "provider": "openrouter",
  "model": "auto:free"
}
\`\`\`

See the [OpenRouter guide](/docs/guides/openrouter) for details on available free models.

### LM Studio

If you prefer LM Studio over Ollama:

\`\`\`json
{
  "provider": "lmstudio",
  "lmStudioUrl": "http://localhost:1234"
}
\`\`\`

## Permissions

Permissions control which shell commands EmergeX can execute without asking. Stored at \`~/.emergex/permissions.json\`:

\`\`\`json
{
  "allowedPatterns": ["npm *", "bun *", "git *", "ls *", "cat *"],
  "deniedPatterns": ["rm -rf /", "sudo rm -rf"],
  "autoApprove": false,
  "logPath": "~/.emergex/logs/permissions.log"
}
\`\`\`

Dangerous commands (like \`rm -rf\`, \`sudo\`, \`git push --force\`) always require explicit approval regardless of your allowed patterns. Safe patterns like \`git status\`, \`bun run\`, and \`eslint\` are auto-approved by default.

Use \`/permissions\` in the TUI to view current settings, \`/allow <pattern>\` to add safe patterns, and \`/deny <pattern>\` to block patterns.

## Hooks

Hooks run custom code at key points in the agent workflow. Configure them in \`~/.emergex/hooks.json\`:

\`\`\`json
{
  "hooks": [
    {
      "type": "onComplete",
      "name": "Voice Notification",
      "mode": "shell",
      "command": "say 'Task completed'",
      "enabled": true,
      "async": true
    }
  ],
  "globalTimeout": 30000,
  "enabled": true
}
\`\`\`

Hook types include \`beforeTool\`, \`afterTool\`, \`beforeCommand\`, \`afterCommand\`, \`onError\`, \`onComplete\`, \`onStart\`, and \`onExit\`. See the [Hooks reference](/docs/reference/hooks) for full documentation.

## MCP Servers

Connect external tools via the Model Context Protocol. Store MCP server configurations in \`.emergex/mcp.json\`:

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
    }
  }
}
\`\`\`

See the [MCP Integration guide](/docs/guides/mcp-integration) for setup instructions.

## Environment Variables

| Variable | Purpose |
| --- | --- |
| \`OPENROUTER_API_KEY\` | API key for OpenRouter cloud models |
| \`TRAINING_PROXY_URL\` | Override training proxy URL |
| \`OLLAMA_HOST\` | Override default Ollama URL |`,
};
