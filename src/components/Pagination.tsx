import React from "react";
import { Link } from "react-router-dom";
import { allPages } from "../data";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentSlug: string;
}

export const Pagination: React.FC<PaginationProps> = ({ currentSlug }) => {
  const currentIndex = allPages.findIndex((page) => page.slug === currentSlug);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  if (!prevPage && !nextPage) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-12 mt-12 border-t border-border/40">
      {prevPage ? (
        <Link
          to={`/docs/${prevPage.slug}`}
          className="group flex flex-col items-start p-4 rounded-lg border border-border/40 bg-card/20 hover:bg-card/40 transition-all duration-200 hover:border-sidebar-border"
        >
          <div className="flex items-center text-xs text-muted-foreground mb-1 group-hover:text-foreground transition-colors">
            <ChevronLeft className="w-3 h-3 mr-1" />
            Previous
          </div>
          <div className="text-base font-medium mb-1 text-foreground">
            {prevPage.title}
          </div>
          {prevPage.description && (
            <div className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {prevPage.description}
            </div>
          )}
        </Link>
      ) : (
        <div />
      )}

      {nextPage ? (
        <Link
          to={`/docs/${nextPage.slug}`}
          className="group flex flex-col items-end p-4 rounded-lg border border-border/40 bg-card/20 hover:bg-card/40 transition-all duration-200 hover:border-sidebar-border text-right"
        >
          <div className="flex items-center text-xs text-muted-foreground mb-1 group-hover:text-foreground transition-colors">
            Next
            <ChevronRight className="w-3 h-3 ml-1" />
          </div>
          <div className="text-base font-medium mb-1 text-foreground">
            {nextPage.title}
          </div>
          {nextPage.description && (
            <div className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {nextPage.description}
            </div>
          )}
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};
