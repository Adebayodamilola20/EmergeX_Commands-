import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Pagination } from "@/components/Pagination";
import { getPageBySlug } from "@/data";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DocsPage() {
  const params = useParams();
  const slug = params["*"] || "getting-started/installation";
  const page = getPageBySlug(slug);

  useEffect(() => {
    if (page) {
      document.title = `${page.title} - EmergeX Code`;
    }
  }, [page]);

  if (!page) {
    return (
      <div className="flex min-h-screen">
        <Sidebar currentSlug={slug} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-heading-color mb-2">404</h1>
            <p className="text-muted-foreground">This page could not be found.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-background">
      <div className="hidden lg:block w-[280px] h-full sticky top-0 border-r border-sidebar-border bg-sidebar overflow-y-auto custom-scrollbar">
        <Sidebar currentSlug={slug} />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
        <header className="lg:hidden h-14 shrink-0 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-30 flex items-center px-4 justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors outline-none">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px] bg-sidebar border-sidebar-border">
                <Sidebar currentSlug={slug} />
              </SheetContent>
            </Sheet>
            <div className="ml-3 font-bold text-sm tracking-tight text-foreground">EmergeX Code</div>
          </div>
        </header>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex justify-center min-w-0">
            <main 
              key={slug}
              className="flex-1 max-w-5xl px-4 md:px-12 py-8 md:py-10 animate-content-fade"
            >
              <div className="mb-2 text-sm text-muted-foreground">{page.category}</div>
              <MarkdownRenderer content={page.content} />
              <Pagination currentSlug={slug} />
            </main>
            <div className="hidden xl:block w-[280px] h-screen sticky top-0 overflow-y-auto border-l border-sidebar-border/40 bg-background/50 backdrop-blur-sm custom-scrollbar">
              <TableOfContents sections={page.sections} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
