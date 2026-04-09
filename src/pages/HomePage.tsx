import { useNavigate } from "react-router-dom";
import { Terminal, BookOpen, Code2 } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function HomePage() {
  const navigate = useNavigate();

  const cards = [
    { icon: Terminal, title: "Installation", desc: "npm install and start coding", href: "/docs/getting-started/installation" },
    { icon: BookOpen, title: "Documentation", desc: "Architecture, guides, API reference", href: "/docs/architecture/overview" },
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

      <main className="flex-1 flex items-center justify-center px-6 py-12 md:py-20">
        <div className="max-w-3xl w-full">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-heading-color mb-6 tracking-tight animate-content-fade stagger-1">
              EmergeX Code<span className="text-primary">.</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto md:mx-0 animate-content-fade stagger-2">
              Open source autonomous coding agent. Runs on local LLMs via Ollama. 
              No API keys required, no usage caps, no cloud dependency.
            </p>
          </div>

          <div className="mb-12 animate-content-fade stagger-3">
            <Tabs defaultValue="mac-linux" className="w-full">
              <TabsList className="bg-muted border border-border w-full justify-start rounded-b-none h-auto p-0 inline-flex">
                <TabsTrigger value="mac-linux" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-b-0 border border-transparent data-[state=active]:border-border rounded-none rounded-t-lg px-4 py-2">
                  Mac / Linux
                </TabsTrigger>
                <TabsTrigger value="windows" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-b-0 border border-transparent data-[state=active]:border-border rounded-none rounded-t-lg px-4 py-2">
                  Windows
                </TabsTrigger>
              </TabsList>
              <TabsContent value="mac-linux" className="mt-0 border border-border border-t-0 p-4 bg-card/50 rounded-b-lg">
                <CodeBlock 
                  code={`$ sudo npm install -g @emergex/emergex-code\n$ emergex`} 
                  language="bash" 
                />
              </TabsContent>
              <TabsContent value="windows" className="mt-0 border border-border border-t-0 p-4 bg-card/50 rounded-b-lg">
                <CodeBlock 
                  code={`$ npm install -g @emergex/emergex-code\n$ emergex`} 
                  language="bash" 
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-content-fade stagger-4">
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
