"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export interface CourseSearchInputProps {
  placeholder?: string;
}

export function CourseSearchInput({
  placeholder = "ابحث باسم الكورس، المادة، أو المعلم...",
}: CourseSearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const [value, setValue] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  // Sync internal state if URL param changes externally
  useEffect(() => {
    setValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  // Debounce search update to URL search params (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentQuery = searchParams.get("q") ?? "";
      if (value !== currentQuery) {
        const params = new URLSearchParams(searchParams.toString());
        if (value.trim()) {
          params.set("q", value.trim());
        } else {
          params.delete("q");
        }
        params.delete("page"); // Reset to page 1 on new search

        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value, searchParams, pathname, router]);

  const handleClear = () => {
    setValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search
        className={`absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
          isPending ? "text-accent-500 animate-pulse" : "text-text-secondary"
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border-theme bg-bg-surface ps-12 pe-12 py-3.5 text-base text-ink placeholder:text-text-secondary focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 shadow-xs transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute end-4 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-ink transition-colors rounded-full"
          aria-label="مسح البحث"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
