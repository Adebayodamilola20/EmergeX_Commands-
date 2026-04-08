import { DocPage } from "./types";

export const architectureOverviewPage: DocPage = {
  slug: "architecture/overview",
  title: "Architecture Overview",
  description: "Deep dive into the EmergeX monorepo and system flow.",
  category: "Architecture",
  sections: [
    { id: "system-flow", title: "System Flow", level: 2 },
    { id: "monorepo-structure", title: "Monorepo Structure", level: 2 },
    { id: "core-packages", title: "Core Packages", level: 2 },
    { id: "tui-architecture", title: "TUI Architecture", level: 2 },
    { id: "data-flow", title: "Data Flow", level: 2 },
  ],
  content: `## System Flow

EmergeX processes user intent through a layered pipeline:

\`\`\`
User Intent
    |
EmergeX TUI (Ink/React)
    |-- Animations & Effects
    |-- ADHD Mode
    |-- Ghost Suggestions
    |-- Kanban Board
    |
Proactive Planner (BMAD)
    |
Multi-Agent Orchestration
    |
Toolshed (capability discovery)
    |
+--------------------------------------+
| MCP | LSP | Web | Shell | AST | FS  |
| PDF | Image | Notebook | Background |
+--------------------------------------+
    |
Evidence Collection & Validation
    |
Completion Report + Voice Output
\`\`\`

The key design principle is that the agent prompt stays small. Tools and capabilities are discovered through the toolshed at runtime rather than loaded into context upfront.

## Monorepo Structure

\`\`\`
EmergeX-code/
|-- apps/
|   |-- tui/            # Terminal UI (Ink v6, React for CLI)
|   |-- clui/           # Tauri 2.0 desktop overlay app
|   |-- dashboard/      # Next.js admin panel
|   |-- debugger/       # Session debugger (Next.js)
|   |-- installer/      # CLI installer
|-- packages/
|   |-- eight/          # Core agent engine, REPL, providers
|   |-- ast-index/      # TypeScript AST parsing
|   |-- mcp/            # MCP client implementation
|   |-- lsp/            # LSP client for code intelligence
|   |-- orchestration/  # Multi-agent coordination
|   |-- planning/       # Proactive BMAD planning engine
|   |-- kernel/         # RL fine-tuning pipeline
|   |-- quarantine/     # Skill security sandbox
|   |-- toolshed/       # Capability discovery and registry
|   |-- validation/     # Evidence collection
|   |-- reporting/      # Completion reports
|   |-- permissions/    # Command permission system
|   |-- hooks/          # Automation hooks
|   |-- skills/         # Skill framework
|   |-- tools/          # Web, PDF, image, notebook tools
|   |-- personality/    # The Infinite Gentleman voice
|   |-- auth/           # Clerk authentication
|   |-- db/             # Convex reactive database
|   |-- voice/          # Speech-to-Text via Whisper
|   |-- types/          # Shared TypeScript types
|-- benchmarks/
|   |-- autoresearch/   # Karpathy-style iterative improvement
|   |-- categories/     # 6 tiers, 39+ tasks
|-- docs/
|   |-- bmad/           # 20 BMAD planning documents
\`\`\`

## Core Packages

**packages/eight** — The main agent engine. Contains the REPL, tool loop, provider clients (Ollama, OpenRouter, LM Studio), context engineering, and system prompt.

**packages/planning** — The proactive BMAD planner. Classifies tasks into categories, generates step-by-step plans, tracks momentum, and predicts upcoming steps.

**packages/toolshed** — The capability layer inspired by Stripe's agent architecture. Tools register themselves with capabilities and permissions. The agent queries the toolshed by capability rather than loading every tool into its prompt.

**packages/ast-index** — TypeScript AST parsing for symbol-level code retrieval. Instead of reading entire files, the agent fetches specific symbols, significantly reducing token usage.

**packages/kernel** — The RL fine-tuning pipeline. Four phases: proxy management, judge scoring (Gemini Flash), GRPO training orchestration, and production loop.

**packages/validation** — Evidence collection system. Gathers pass/fail signals after file writes, command executions, and git commits.

**packages/orchestration** — Multi-agent coordination. Supports spawning subagents for complex tasks and parallel tool execution.

## TUI Architecture

\`\`\`
apps/tui/src/
|-- theme/          # Tokens, semantic colors, ThemeProvider
|-- components/
|   |-- primitives/ # AppText, MutedText, Heading, Stack, Card, Badge
|   |-- feedback/   # Alert, SpinnerRow, ProgressBar
|   |-- forms/      # TextField, SelectField
|   |-- data-display/ # Table, KeyValueList
|   |-- navigation/ # Header, Footer
|-- hooks/          # useHotkeys, useViewport, useGhostSuggestion
|-- lib/            # Text utils (truncate, wrap), formatters
|-- screens/        # ChatScreen, OnboardingScreen
|-- app/            # Providers (ThemeProvider + ADHDMode)
\`\`\`

Screens compose primitives and widgets. No raw Ink elements appear in screen-level code.

## Data Flow

1. **User input** enters through the TUI's command input component
2. **Ghost suggestion** system checks git state, plan context, and history
3. **Slash commands** are intercepted and handled locally
4. **Chat messages** are sent to the agent engine
5. **The planner** classifies the task and generates a BMAD plan
6. **The tool loop** executes plan steps, querying the toolshed
7. **Evidence collector** captures verification signals
8. **Results stream** back to the TUI with typing effects
9. **Kanban board** updates automatically
10. **Completion report** summarizes the session`,
};

export const autoresearchPage: DocPage = {
  slug: "architecture/autoresearch",
  title: "Autoresearch",
  description: "How EmergeX uses iterative loops to improve its prompts.",
  category: "Architecture",
  sections: [
    { id: "overview", title: "Overview", level: 2 },
    { id: "how-it-works", title: "How It Works", level: 2 },
    { id: "grading-methodology", title: "Grading Methodology", level: 3 },
    { id: "enhanced-patterns", title: "Enhanced Patterns", level: 2 },
    { id: "results", title: "Results", level: 2 },
    { id: "key-insights", title: "Key Insights", level: 2 },
    { id: "running-autoresearch", title: "Running Autoresearch", level: 2 },
  ],
  content: `## Overview

emergex uses [Karpathy's autoresearch methodology](https://github.com/karpathy/autoresearch) to iteratively improve its system prompts. The harness runs benchmarks in a loop, identifies weaknesses, generates enhanced prompt patterns, and re-runs - scores improve automatically without human intervention.

## How It Works

\`\`\`
+-------------------------------------------+
|           AUTORESEARCH LOOP               |
|                                           |
|  1. Run all benchmarks with EmergeX         |
|  2. Compare scores to Claude baselines    |
|  3. Identify weak benchmarks              |
|  4. Generate enhanced prompt patterns     |
|  5. Append patterns to system prompt      |
|  6. Repeat from step 1                    |
|                                           |
|  Loop runs forever until interrupted      |
+-------------------------------------------+
\`\`\`

### Grading Methodology

| Component | Weight | Method |
| --- | --- | --- |
| Execution | 70% | Code is compiled and run against test assertions |
| Keywords | 30% | Domain-specific pattern checks (JWT, topological sort, NPV, etc.) |

Temperature sweep runs each benchmark at 0.3, 0.5, and 0.7. The best result is kept.

## Enhanced Patterns

When EmergeX loses a benchmark, the harness generates category-specific enhanced patterns:

- **Bug Fixing** — Race condition patterns, memory leak patterns, null reference patterns
- **File Manipulation** — Input validation, error messages, code organization
- **Feature Implementation** — LRU caching patterns, complete implementation examples

## Results

After 15+ iterations of autoresearch:

| Benchmark | Before | After | Improvement |
| --- | --- | --- | --- |
| BF001 Race Conditions | 50 | 100 | +50 |
| BF003 Null References | 50 | 100 | +50 |
| FM001 Validation | 50 | 100 | +50 |
| FI001 LRU Caching | 50 | 100 | +50 |
| BF002 Memory Leaks | 50 | 85 | +35 |

## Key Insights

1. **Variance is inherent.** Local LLMs have high variance between runs.
2. **Pattern injection works.** Adding enhanced patterns reliably improves scores by 15-50 points.
3. **Diminishing returns.** After core patterns are added, further improvement comes from model variance.
4. **Temperature matters.** The same model scores 43 at temp=0.3 and 92 at temp=0.7.
5. **Knowledge vs Execution gap.** Models score 100% on keywords but 0% on execution for complex tasks.
6. **Mutations compound.** BT001 went from 85 to 94 after one round of mutations.

## Running Autoresearch

\`\`\`bash
# Single pass (all benchmarks)
bun run benchmark:v2

# Autoresearch loop (iterative improvement)
CATEGORY=battle-test MAX_ITERATIONS=5 bun run benchmark:loop

# Overnight continuous runner
bash benchmarks/autoresearch/overnight-runner.sh
\`\`\``,
};

export const modelRouterPage: DocPage = {
  slug: "architecture/model-router",
  title: "Model Router",
  description: "Experience-based intelligent routing across multiple LLMs.",
  category: "Architecture",
  sections: [
    { id: "overview", title: "Overview", level: 2 },
    { id: "experience-based-routing", title: "Experience-Based Routing", level: 2 },
    { id: "multi-model-fallback", title: "Multi-Model Fallback", level: 2 },
    { id: "benchmark-driven-routing", title: "Benchmark-Driven Routing", level: 2 },
    { id: "dynamic-free-model-selection", title: "Dynamic Free Model Selection", level: 2 },
    { id: "configuration", title: "Configuration", level: 2 },
  ],
  content: `## Overview

EmergeX does not use a single model for every task. The model router learns from benchmark results and past sessions to route each task to the model most likely to succeed.

## Experience-Based Routing

The model router maintains an experience database that tracks how each model performs across task categories. When a new task arrives, the router:

1. Classifies the task into a domain
2. Looks up historical performance for each available model
3. Routes to the model with the highest recorded score
4. Falls back to the default model if no experience data exists

## Multi-Model Fallback

\`\`\`
qwen3.5 (local, primary)
    |-- timeout or error
    v
devstral:latest (local, fallback)
    |-- timeout or error
    v
auto:free (OpenRouter, cloud fallback)
\`\`\`

## Benchmark-Driven Routing

| Domain | qwen3.5 | devstral | qwen3:14b |
| --- | --- | --- | --- |
| Auth System (BT001) | 94 | - | 94 |
| Event Architecture (BT002) | 92 | - | 92 |
| Data Pipeline (BT003) | - | 100 | - |
| State Machine (BT005) | 92 | - | 92 |
| SEO Audit (BT007) | 96 | - | 96 |
| Video Production (BT011) | 100 | - | 100 |

The router uses this data to make informed decisions.

## Dynamic Free Model Selection

For OpenRouter users, \`getBestFreeModel()\` queries the OpenRouter API:

1. Fetches the full model list from \`/api/v1/models\`
2. Filters for models with the \`:free\` suffix
3. Sorts by context length
4. Caches results for one hour

## Configuration

The model router does not require explicit configuration. It builds its experience database from benchmark runs and kernel scoring.

\`\`\`bash
# Run benchmarks to populate experience data
bun run benchmark:v2
\`\`\``,
};

export const infiniteGentlemanPage: DocPage = {
  slug: "architecture/infinite-gentleman",
  title: "EmergeX - The Infinite Gentleman",
  description: "The personality protocol that makes EmergeX a perfect pair.",
  category: "Architecture",
  sections: [
    { id: "voice-and-personality", title: "Voice and Personality", level: 2 },
    { id: "the-gentleman-protocol", title: "The Gentleman Protocol", level: 2 },
  ],
  content: `## Voice and Personality

EmergeX features a unique personality known as **The Infinite Gentleman**. This is not just a communication style; it is a core system component that ensures polite, proactive, and professional interaction across all agent sessions.

## The Gentleman Protocol

[Content coming soon... Please provide the specific details you want included here.]`,
};

export const kernelFineTuningPage: DocPage = {
  slug: "architecture/kernel-fine-tuning",
  title: "Kernel Fine-Tuning",
  description: "Continuous model improvement through RL fine-tuning.",
  category: "Architecture",
  sections: [
    { id: "motivation", title: "Motivation", level: 2 },
    { id: "architecture", title: "Architecture", level: 2 },
    { id: "three-layer-model-architecture", title: "Three-Layer Model Architecture", level: 2 },
    { id: "model-versioning", title: "Model Versioning", level: 2 },
    { id: "promotion-flow", title: "Promotion Flow", level: 3 },
    { id: "the-four-phases", title: "The Four Phases", level: 2 },
    { id: "phase-1-proxy-management", title: "Phase 1: Proxy Management", level: 3 },
    { id: "phase-2-judge-scoring", title: "Phase 2: Judge Scoring", level: 3 },
    { id: "phase-3-training-orchestration", title: "Phase 3: Training Orchestration", level: 3 },
    { id: "phase-4-production-loop", title: "Phase 4: Production Loop", level: 3 },
    { id: "unified-entry-point", title: "Unified Entry Point", level: 2 },
    { id: "how-to-enable", title: "How to Enable", level: 2 },
    { id: "safety-rails", title: "Safety Rails", level: 2 },
    { id: "configuration", title: "Configuration", level: 2 },
  ],
  content: `## Motivation

EmergeX normally routes to static model weights. Models never learn from your sessions. The kernel fine-tuning pipeline closes this loop: every coding session becomes training data, and GRPO continuously evolves a LoRA adapter on top of your base model. The model gets better at your workflows over time.

## Architecture

\`\`\`
+----------------+          +----------------+          +----------------+
|  EmergeX TUI   |--------> | Training Proxy |--------> |     Ollama     |
|   (Bun/Ink)    |<-------- |    :30000      |<-------- |     :11434     |
+----------------+          +----------------+          +----------------+
                                    |
                                    v
                            +----------------+
                            | Judge LLM (PRM)| <--- scores responses
                            | gemini-2.5-flash|      asynchronously
                            +----------------+
                                    |
                                    v
                            +----------------+
                            | GRPO Trainer   | <--- LoRA fine-tuning
                            | (MinT backend) |     during idle/sleep
                            +----------------+
                                    |
                                    v
                            +----------------+
                            | Hot-swap LoRA  | <--- adapter merged
                            | back to Ollama |      without restart
                            +----------------+
\`\`\`

## Three-Layer Model Architecture

EmergeX models stack three layers at inference time:

| Layer | What | Source | Location |
| --- | --- | --- | --- |
| **Layer 1** | Base Model (Static) | Upstream weights (e.g. Qwen 3) | \`~/.ollama/models\` |
| **Layer 2** | Domain Model (Shared) | Official EmergeX adapters | \`@emergex/kernel\` |
| **Layer 3** | Personal Model (Unique) | Your own session LoRAs | \`~/.emergex/kernel/personal\` |

When a new EmergeX version releases (Layer 2 update), users are prompted to retrain their Personal LoRA (Layer 3) so it aligns with the updated adapter weights.

## Model Versioning

EmergeX models follow a strict naming convention: \`emergex-{major.minor.patch}-q{gen}:{params}\`

| Segment | Meaning | Bumps when... |
| --- | --- | --- |
| \`major\` | Base model change | Switching upstream weights (e.g., Qwen 3 to Qwen 3.5) |
| \`minor\` | Judge-validated improvement | Gemini Flash confirms score gain on autoresearch suite |
| \`patch\` | Nightly build | Every GRPO training batch produces a new patch |
| \`q{gen}\` | Quantization generation | Quantization method changes |
| \`{params}\` | Parameter count | Model size changes |

### Promotion Flow

1. **Nightly training** produces a new patch (e.g., \`emergex-1.0.42-q3:14b\`)
2. **Gemini Flash judge** scores the checkpoint against the autoresearch benchmark suite
3. If the checkpoint **outperforms** the current release, \`version-manager.ts\` promotes it to a new minor version (e.g., \`emergex-1.1-q3:14b\`)
4. If it **regresses**, the checkpoint is rolled back automatically

The \`version-manager.ts\` module in \`packages/emergex/\` manages this lifecycle. The Gemini Flash judge (\`google/gemini-2.5-flash:free\` via OpenRouter) provides zero-cost semantic evaluation.

## The Four Phases

The \`@emergex/kernel\` package implements the full pipeline in four phases.

### Phase 1: Proxy Management

File: \`packages/kernel/proxy.ts\`

Manages the training proxy process that sits between EmergeX and Ollama. The proxy intercepts requests to collect conversation traces for training.

- Start/stop training proxy process
- Health checks with configurable timeout
- Latency overhead monitoring (direct vs proxied requests)
- Configurable latency threshold with alerting

\`\`\`typescript
const proxy = new TrainingProxy(config);
await proxy.start();
const acceptable = await proxy.isLatencyAcceptable(); // compare direct vs proxied
\`\`\`

### Phase 2: Judge Scoring

File: \`packages/kernel/judge.ts\`

Scores every agent response using a Process Reward Model (PRM) via Gemini Flash through OpenRouter. The judge evaluates on four criteria:

| Criterion | Weight | What it measures |
| --- | --- | --- |
| Execution success | 40% | Did the code work? |
| Code quality | 20% | Clean, readable, idiomatic? |
| Tool efficiency | 20% | Minimal tool calls, no wasted reads? |
| Directness | 20% | Did the agent get to the point? |

\`\`\`typescript
const scorer = new JudgeScorer(config);
const score = await scorer.score(sessionId, turnIndex, turn, model, prompt, response);
const trend = scorer.getScoreTrend(7); // 7-day rolling window
\`\`\`

Score history is persisted to \`~/.emergex/kernel/score-history.json\`.

### Phase 3: Training Orchestration

File: \`packages/kernel/training.ts\`

Collects scored responses into GRPO training batches. Trivial responses (perfect scores) and very poor responses are filtered out - the model learns most from challenging-but-achievable tasks.

- Automatic training trigger when batch is full
- Checkpoint creation and lifecycle tracking
- Benchmark validation gate via the autoresearch suite
- Auto-rollback on regression

\`\`\`typescript
const trainer = new TrainingOrchestrator(config);
trainer.addSample(scoreRecord); // buffers, auto-triggers when batch full
const checkpoints = trainer.getCheckpoints(); // list all with status
\`\`\`

Training state is persisted to \`~/.emergex/kernel/training/state.json\`.

### Phase 4: Production Loop

File: \`packages/kernel/loop.ts\`

Ties everything together. Handles MadMax scheduling (training only during idle/sleep windows), auto-promotion of improved checkpoints into the model router, and health monitoring.

\`\`\`typescript
const loop = new ProductionLoop(config);
await loop.processTurn(sessionId, turnIndex, model, prompt, response);
const active = loop.getActiveModel(); // base or fine-tuned
const health = loop.getHealthStatus(); // improving/stable/declining
\`\`\`

**MadMax scheduling:** Weight updates are deferred to idle periods and sleep hours (default: 23:00 to 07:00) so they never interrupt active coding sessions.

## Unified Entry Point

The kernel system provides a single entry point for all fine-tuning operations. This ensures that training, scoring, and promotion remain synchronized.

## How to Enable

To enable kernel fine-tuning, set \`kernel.enabled\` to \`true\` in your global configuration file at \`~/.emergex/config.json\`.

## Safety Rails

EmergeX includes safety rails to prevent catastrophic forgetting and ensure model stability. Checkpoints are only promoted if they pass the full regression suite.

## Configuration

Detailed configuration options for the kernel pipeline:
- \`trainingProxy.port\`: Default is \`30000\`
- \`madMax.schedule\`: Crontab style schedule for training windows
- \`judge.model\`: The model used for PRM scoring`,
};
