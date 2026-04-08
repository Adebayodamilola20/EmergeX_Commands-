import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Search, Sun, Moon, Command } from "lucide-react";
import { navigation, NavItem } from "@/data/types";
import { useTheme } from "next-themes";
import { SearchDialog } from "./SearchDialog";

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

export function Sidebar({ currentSlug, className }: { currentSlug: string; className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const isDark = resolvedTheme === "dark";

  return (
    <>
      <aside className={`w-[280px] shrink-0 h-full flex flex-col bg-sidebar border-r border-sidebar-border ${className}`}>
        <div className="p-6 pb-4">
          <a href="/" className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <div className="w-5 h-5 bg-foreground rounded flex items-center justify-center text-background">
              <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-background" />
            </div>
            EmergeX Code
          </a>
        </div>

        <div className="px-4 mb-6">
          <div 
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/10 border border-border/40 text-muted-foreground text-sm hover:border-border/80 hover:bg-muted/20 transition-all cursor-pointer group shadow-sm"
          >
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

        <div className="mt-auto p-4 flex items-center justify-between border-t border-sidebar-border/40">
          <div className="text-[10px] text-muted-foreground/50 font-medium px-2 italic">v0.1.0-alpha</div>
          <div className="inline-flex items-center p-1 rounded-full bg-muted/10 border border-border/40">
            <button 
              onClick={() => setTheme("light")}
              className={`p-1.5 rounded-full transition-all ${!isDark ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setTheme("dark")}
              className={`p-1.5 rounded-full transition-all ${isDark ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
