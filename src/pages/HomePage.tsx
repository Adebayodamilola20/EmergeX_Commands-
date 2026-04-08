import { useNavigate } from "react-router-dom";
import { Terminal, BookOpen, Code2 } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  const cards = [
    { icon: Terminal, title: "Installation", desc: "npm install and start coding", href: "/docs/getting-started/installation" },
    { icon: BookOpen, title: "Documentation", desc: "Architecture, guides, API reference", href: "/docs/getting-started/installation" },
    { icon: Code2, title: "Source Code", desc: "MIT licensed, contributions welcome", href: "https://github.com/AdebayoDamilola20/EmergeX_Commands-" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border px-6 py-3 flex items-center justify-between">
        <span className="font-bold text-foreground">EmergeX Code<span className="text-primary">.</span></span>
        <div className="flex items-center gap-4 text-sm">
          <button onClick={() => navigate("/docs/getting-started/installation")} className="text-muted-foreground hover:text-foreground transition-colors">Docs</button>
          <a href="https://github.com/AdebayoDamilola20/EmergeX_Commands-" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full">
          <h1 className="text-5xl font-bold text-heading-color mb-4">EmergeX Code</h1>
          <p className="text-lg text-foreground mb-8 leading-relaxed">
            Open source autonomous coding agent. Runs on local LLMs via Ollama.<br />
            No API keys required, no usage caps, no cloud dependency.
          </p>

          <div className="rounded-lg border border-code-border bg-code-bg p-4 mb-8 font-mono text-sm shadow-sm">
            <div className="text-muted-foreground">$ <span className="text-foreground">npm install -g @emergex/emergex-code</span></div>
            <div className="text-muted-foreground">$ <span className="text-primary">emergex</span></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map((card) => (
              <button
                key={card.title}
                onClick={() => card.href.startsWith("/") ? navigate(card.href) : window.open(card.href, "_blank")}
                className="text-left p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
              >
                <card.icon className="w-5 h-5 text-muted-foreground mb-2" />
                <div className="font-medium text-foreground text-sm mb-1">{card.title}</div>
                <div className="text-xs text-muted-foreground">{card.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
