import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Pagination } from "@/components/Pagination";
import { getPageBySlug } from "@/data";

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
    <div className="flex min-h-screen">
      <Sidebar currentSlug={slug} />
      <div className="flex-1 flex justify-center min-w-0">
        <main className="flex-1 max-w-5xl px-12 py-10">
          <div className="mb-2 text-sm text-muted-foreground">{page.category}</div>
          <MarkdownRenderer content={page.content} />
          <Pagination currentSlug={slug} />
        </main>
        <TableOfContents sections={page.sections} />
      </div>
    </div>
  );
}
