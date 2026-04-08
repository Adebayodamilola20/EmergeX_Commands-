import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code: string) => {
    return code.split('\n').map((line, i) => {
      if (line.startsWith("#")) {
        return <div key={i} className="text-muted-foreground italic opacity-70">{line}</div>;
      }

      const parts = line.split(/(\s+)/);
      return (
        <div key={i} className="min-h-[1.25rem]">
          {parts.map((part, j) => {
            const cleanPart = part.replace(/[.,()]/g, "").toLowerCase().trim();
            // CLI Commands (Purple)
            if (["ollama", "emergex", "git", "npm", "bun", "brew", "bash", "sh"].includes(cleanPart)) {
              return <span key={j} className="text-[hsl(var(--code-purple))] font-semibold animate-code-glow-purple">{part}</span>;
            }
            // Subcommands/Actions (Blue)
            if (["auth", "login", "logout", "status", "whoami", "serve", "pull", "run", "install", "init", "push", "checkout", "branch", "merge", "remote", "fetch", "clone", "outline", "symbol", "benchmark", "harness", "inspect", "doctor", "build", "test", "lint"].includes(cleanPart)) {
              return <span key={j} className="text-[hsl(var(--code-slash))] animate-code-glow">{part}</span>;
            }
            // Environment Variables (Purple values/keys)
            if (part.includes("=")) {
              const [key, val] = part.split("=");
              return (
                <span key={j}>
                  <span className="text-[hsl(var(--code-purple))] animate-code-glow-purple">{key}=</span>
                  <span className="text-[hsl(var(--code-slash))] animate-code-glow">{val}</span>
                </span>
              );
            }
            // Strings/Arguments/Paths
            if (part.trim().startsWith("http") || part.trim().includes("/") || part.trim().match(/^[a-z0-9.]+:[a-z0-9.]+$/) || part.trim().startsWith("@")) {
              return <span key={j} className="text-[hsl(var(--code-slash))] opacity-90">{part}</span>;
            }
            // Slash Commands
            if (part.startsWith("/")) {
              return <span key={j} className="text-[hsl(var(--code-slash))] animate-code-glow">{part}</span>;
            }
            return part;
          })}
        </div>
      );
    });
  };

  return (
    <div className="relative group rounded-xl border border-code-border bg-code-bg/50 backdrop-blur-sm my-6 overflow-hidden shadow-2xl transition-all duration-300 hover:border-[hsl(var(--code-purple)/0.4)] hover:shadow-[0_0_20px_hsla(var(--code-purple),0.1)]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--code-purple)/0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-muted/30 transition-all duration-200 z-10 sm:opacity-0 sm:group-hover:opacity-100"
      >
        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
      </button>
      <pre className="p-3 md:p-5 overflow-x-auto overflow-y-hidden text-[11px] md:text-[13px] leading-relaxed font-mono custom-scrollbar">
        <code className="text-foreground/90">{highlightCode(code)}</code>
      </pre>
    </div>
  );
}
