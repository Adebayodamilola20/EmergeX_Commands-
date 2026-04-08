import React from "react";
import { CodeBlock } from "./CodeBlock";

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Inline code
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Link
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    const matches = [
      boldMatch ? { type: "bold", index: boldMatch.index!, match: boldMatch } : null,
      codeMatch ? { type: "code", index: codeMatch.index!, match: codeMatch } : null,
      linkMatch ? { type: "link", index: linkMatch.index!, match: linkMatch } : null,
    ].filter(Boolean).sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0]!;
    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index));
    }

    if (first.type === "bold") {
      parts.push(<strong key={key++} className="font-semibold text-heading-color">{first.match[1]}</strong>);
      remaining = remaining.slice(first.index + first.match[0].length);
    } else if (first.type === "code") {
      const codeText = first.match[1];
      const isEnvVar = /^[A-Z_0-9]+$/.test(codeText);
      const isCommand = /^(emergex|bun|npm|git|bash|sh|8gent)$/.test(codeText.toLowerCase());
      const isPurple = isEnvVar || isCommand;
      
      parts.push(
        <code 
          key={key++} 
          className={`px-1.5 py-0.5 rounded text-sm font-mono border ${
            isPurple 
              ? "bg-[hsl(var(--code-purple)/0.15)] text-[hsl(var(--code-purple))] border-[hsl(var(--code-purple)/0.3)]" 
              : "bg-[hsl(var(--code-slash)/0.15)] text-[hsl(var(--code-slash))] border-[hsl(var(--code-slash)/0.3)]"
          }`}
        >
          {first.match[1]}
        </code>
      );
      remaining = remaining.slice(first.index + first.match[0].length);
    } else if (first.type === "link") {
      parts.push(
        <a key={key++} href={first.match[2]} className="text-link-color hover:underline">
          {first.match[1]}
        </a>
      );
      remaining = remaining.slice(first.index + first.match[0].length);
    }
  }

  return parts;
}

function renderTable(lines: string[]): React.ReactNode {
  const rows = lines.filter((l) => !l.match(/^\|\s*-+/));
  if (rows.length < 1) return null;

  const parseRow = (row: string) =>
    row.split("|").slice(1, -1).map((c) => c.trim());

  const headers = parseRow(rows[0]);
  const bodyRows = rows.slice(1).map(parseRow);

  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-table-header-bg">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left font-medium text-foreground border-b border-border">
                {parseInlineMarkdown(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-table-row-hover transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-muted-foreground">
                  {parseInlineMarkdown(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(<CodeBlock key={key++} code={codeLines.join("\n")} language={lang} />);
      continue;
    }

    // Table
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(<React.Fragment key={key++}>{renderTable(tableLines)}</React.Fragment>);
      continue;
    }

    // Headings
    if (line.startsWith("## ")) {
      const text = line.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      elements.push(
        <h2 key={key++} id={id} className="text-2xl font-bold text-heading-color mt-10 mb-4 scroll-mt-6">
          {parseInlineMarkdown(text)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      const text = line.slice(4);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      elements.push(
        <h3 key={key++} id={id} className="text-xl font-semibold text-heading-color mt-8 mb-3 scroll-mt-6">
          {parseInlineMarkdown(text)}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={key++} className="border-l-2 border-primary pl-4 my-4 text-muted-foreground italic">
          {parseInlineMarkdown(line.slice(2))}
        </blockquote>
      );
      i++;
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\.\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="list-decimal list-inside my-4 space-y-1.5 text-foreground">
          {items.map((item, j) => (
            <li key={j} className="leading-relaxed">{parseInlineMarkdown(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc list-inside my-4 space-y-1.5 text-foreground">
          {items.map((item, j) => (
            <li key={j} className="leading-relaxed">{parseInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="my-3 leading-relaxed text-foreground">
        {parseInlineMarkdown(line)}
      </p>
    );
    i++;
  }

  return <div className="max-w-none">{elements}</div>;
}
