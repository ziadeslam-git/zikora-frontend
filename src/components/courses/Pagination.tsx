import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
}

export function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, val]) => {
      if (val && key !== "page") {
        if (Array.isArray(val)) {
          val.forEach((v) => params.append(key, v));
        } else {
          params.set(key, val);
        }
      }
    });
    if (page > 1) {
      params.set("page", String(page));
    }
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "?";
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 pt-12 select-none" aria-label="تنقل الصفحات">
      {/* Previous Page Link */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-theme bg-bg-surface text-ink hover:bg-bg-surface-2 transition-colors"
          aria-label="الصفحة السابقة"
        >
          <ChevronRight className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
        </Link>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-theme bg-bg-surface text-text-secondary opacity-40 cursor-not-allowed">
          <ChevronRight className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <Link
              key={p}
              href={createPageUrl(p)}
              className={cn(
                "flex h-9 min-w-9 items-center justify-center rounded-xl px-3 font-latin text-sm font-bold transition-all duration-150",
                isActive
                  ? "bg-accent-500 text-white shadow-glow-accent"
                  : "border border-border-theme bg-bg-surface text-text-secondary hover:bg-bg-surface-2 hover:text-ink",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {p}
            </Link>
          );
        })}
      </div>

      {/* Next Page Link */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-theme bg-bg-surface text-ink hover:bg-bg-surface-2 transition-colors"
          aria-label="الصفحة التالية"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
        </Link>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-theme bg-bg-surface text-text-secondary opacity-40 cursor-not-allowed">
          <ChevronLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
        </span>
      )}
    </nav>
  );
}
