export interface DocSection {
  id: string;
  title: string;
  level: number; // 2 = h2, 3 = h3
}

export interface DocPage {
  slug: string;
  title: string;
  description?: string;
  category: string;
  sections: DocSection[];
  content: string; // raw content with custom markdown-like syntax
}

export interface NavItem {
  title: string;
  slug?: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    title: "Getting Started",
    children: [
      { title: "Installation", slug: "getting-started/installation" },
      { title: "Quick Start", slug: "getting-started/quick-start" },
      { title: "Configuration", slug: "getting-started/configuration" },
    ],
  },
  {
    title: "Guides",
    children: [
      { title: "BMAD Method", slug: "guides/bmad-method" },
      { title: "Personalization", slug: "guides/personalization" },
      { title: "TUI Guide", slug: "guides/tui" },
      { title: "MCP Integration", slug: "guides/mcp-integration" },
      { title: "OpenRouter", slug: "guides/openrouter" },
    ],
  },
  {
    title: "Architecture",
    children: [
      { title: "Architecture Overview", slug: "architecture/overview" },
      { title: "EmergeX - The Infinite Gentleman", slug: "architecture/infinite-gentleman" },
      { title: "Kernel Fine-Tuning", slug: "architecture/kernel-fine-tuning" },
      { title: "Autoresearch", slug: "architecture/autoresearch" },
      { title: "Model Router", slug: "architecture/model-router" },
    ],
  },
  {
    title: "Benchmarks",
    slug: "benchmarks",
  },
  {
    title: "Reference",
    children: [
      { title: "CLI Reference", slug: "reference/cli" },
      { title: "Slash Commands", slug: "reference/slash-commands" },
      { title: "Tools Reference", slug: "reference/tools" },
      { title: "Design Systems", slug: "reference/design-systems" },
      { title: "Hooks Reference", slug: "reference/hooks" },
    ],
  },
  {
    title: "Contributing",
    slug: "contributing",
  },
];
