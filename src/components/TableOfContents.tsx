import React, { useEffect, useState } from "react";
import { DocSection } from "@/data/types";

export function TableOfContents({ sections }: { sections: DocSection[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="w-[240px] shrink-0 h-screen sticky top-0 overflow-y-auto py-10 pr-6 hidden xl:block border-l border-border/10">
      <div className="text-[13px]">
        <div className="text-foreground/90 mb-4 font-semibold px-4">On this page</div>
        <ul className="relative space-y-1">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border/40" />
          {sections.map((s) => {
            const active = activeId === s.id;
            return (
              <li key={s.id} className="relative group">
                {active && (
                  <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-foreground z-10" />
                )}
                <a
                  href={`#${s.id}`}
                  className={`block transition-all duration-200 ${active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                    } ${s.level === 3 ? "pl-8" : "pl-4"} py-1.5`}
                >
                  {s.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
