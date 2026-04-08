import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Search, Sun, Moon, Command } from "lucide-react";
import { navigation, NavItem } from "@/data/types";

function NavSection({ item, currentSlug }: { item: NavItem; currentSlug: string }) {
  const navigate = useNavigate();
  const hasChildren = !!item.children;
  const [open, setOpen] = useState<boolean>(true);

  if (!hasChildren && item.slug) {
    const active = item.slug === currentSlug;
    return (
      <div className="relative group px-2 mb-0.5">
        {active && <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-foreground rounded-full z-10" />}
        <button
          onClick={() => navigate(`/docs/${item.slug}`)}
          className={`block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
            active 
              ? "bg-sidebar-accent text-foreground font-medium" 
              : "text-sidebar-foreground hover:text-foreground"
          }`}
        >
          {item.title}
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-1.5 text-xs font-semibold text-sidebar-foreground hover:text-foreground transition-colors group"
      >
        {item.title}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "" : "-rotate-90 text-muted-foreground/50"}`} />
      </button>
      {open && item.children && (
        <div className="mt-1 space-y-0.5 relative">
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-border/40" />
          {item.children.map((child) => {
            const active = child.slug === currentSlug;
            return (
              <div key={child.slug} className="relative group px-2 pl-4">
                {active && <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-foreground rounded-full z-10" />}
                <button
                  onClick={() => navigate(`/docs/${child.slug}`)}
                  className={`block w-full text-left px-4 py-1.5 text-sm rounded-md transition-colors ${
                    active 
                      ? "bg-sidebar-accent text-foreground font-medium" 
                      : "text-sidebar-foreground hover:text-foreground"
                  }`}
                >
                  {child.title}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ currentSlug }: { currentSlug: string }) {
  const [isDark, setIsDark] = useState(true);

  return (
    <aside className="w-[280px] shrink-0 h-screen sticky top-0 flex flex-col bg-sidebar border-r border-sidebar-border hidden lg:flex">
      <div className="p-6 pb-4">
        <a href="/" className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <div className="w-5 h-5 bg-foreground rounded flex items-center justify-center text-background">
            <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-background" />
          </div>
          EmergeX Code
        </a>
      </div>

      <div className="px-4 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/20 border border-border/40 text-muted-foreground text-sm hover:border-border/80 transition-colors cursor-pointer group shadow-sm">
          <Search className="w-3.5 h-3.5 group-hover:text-foreground transition-colors" />
          <span className="group-hover:text-foreground transition-colors flex-1">Search</span>
          <div className="flex items-center gap-0.5 text-[10px] font-medium opacity-40 group-hover:opacity-100 transition-opacity">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-1 custom-scrollbar">
        {navigation.map((item) => (
          <NavSection key={item.title} item={item} currentSlug={currentSlug} />
        ))}
      </nav>

      <div className="mt-auto p-4 flex items-center justify-end">
        <div className="inline-flex items-center p-1 rounded-full bg-muted/20 border border-border/40 shadow-sm">
          <button 
            onClick={() => setIsDark(false)}
            className={`p-1.5 rounded-full transition-all ${!isDark ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setIsDark(true)}
            className={`p-1.5 rounded-full transition-all ${isDark ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
