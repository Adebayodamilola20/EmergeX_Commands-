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
            const lowerPart = part.toLowerCase().trim();
            // CLI Commands (Purple)
            if (["ollama", "emergex", "git", "npm", "bun", "brew", "bash", "sh"].includes(lowerPart)) {
              return <span key={j} className="text-[hsl(var(--code-purple))] font-semibold animate-code-glow-purple">{part}</span>;
            }
            // Subcommands/Actions (Blue)
            if (["auth", "login", "logout", "status", "whoami", "serve", "pull", "run", "install", "init", "push", "checkout", "branch", "merge", "remote", "fetch", "clone", "outline", "symbol", "benchmark", "harness", "inspect", "doctor", "build", "test", "lint"].includes(lowerPart)) {
               return <span key={j} className="text-[hsl(var(--code-slash))] animate-code-glow">{part}</span>;
            }
            // Environment Variables (Purple values/keys)
            if (part.includes("=")) {
              const [key, val] = part.split("=");
              return (
                <span key={j}>
                  <span className="text-[hsl(var(--code-purple))]">{key}=</span>
                  <span className="text-[hsl(var(--code-slash))]">{val}</span>
                </span>
              );
            }
            // Strings/Arguments
            if (part.trim().startsWith("http") || part.trim().includes("/") || part.trim().match(/^[a-z0-9.]+:[a-z0-9.]+$/)) {
              return <span key={j} className="text-[hsl(var(--code-slash))]">{part}</span>;
            }
            // Slash Commands
            if (part.startsWith("/")) {
              return <span key={j} className="text-[hsl(var(--code-slash))]">{part}</span>;
            }
            return part;
          })}
        </div>
      );
    });
  };

  return (
    <div className="relative group rounded-xl border border-code-border bg-code-bg my-6 overflow-hidden shadow-md">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground/30 hover:text-foreground hover:bg-muted/20 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <pre className="p-5 overflow-x-auto text-[12px] leading-relaxed font-mono custom-scrollbar">
        <code className="text-foreground">{highlightCode(code)}</code>
      </pre>
    </div>
  );
}
