"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Filter, X, ChevronDown, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface FilterBarProps {
  totalResults: number;
}

const subjects = [
  { label: "كل المواد", value: "" },
  { label: "الفيزياء", value: "physics" },
  { label: "الكيمياء", value: "chemistry" },
  { label: "الأحياء", value: "biology" },
  { label: "الرياضيات", value: "math" },
  { label: "اللغة العربية", value: "arabic" },
  { label: "اللغة الإنجليزية", value: "english" },
  { label: "الجيولوجيا", value: "geology" },
  { label: "الفلسفة والمنطق", value: "philosophy" },
];

const grades = [
  { label: "كل الصفوف", value: "" },
  { label: "الصف الأول الثانوي", value: "1st-sec" },
  { label: "الصف الثاني الثانوي", value: "2nd-sec" },
  { label: "الصف الثالث الثانوي", value: "3rd-sec" },
];

const prices = [
  { label: "كل الأسعار", value: "" },
  { label: "مجاني", value: "free" },
  { label: "أقل من 300 ج.م", value: "under-300" },
  { label: "300 - 500 ج.م", value: "300-500" },
  { label: "أكثر من 500 ج.م", value: "over-500" },
];

const sortOptions = [
  { label: "الأحدث", value: "latest" },
  { label: "الأعلى تقييمًا", value: "rating" },
  { label: "الأقل سعرًا", value: "price-asc" },
  { label: "الأعلى سعرًا", value: "price-desc" },
];

export function FilterBar({ totalResults }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  const selectedSubject = searchParams.get("subject") ?? "";
  const selectedGrade = searchParams.get("grade") ?? "";
  const selectedPrice = searchParams.get("price") ?? "";
  const selectedSort = searchParams.get("sort") ?? "latest";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset to page 1
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleResetFilters = () => {
    router.push(pathname);
    setIsMobileSheetOpen(false);
  };

  const hasActiveFilters =
    Boolean(selectedSubject) ||
    Boolean(selectedGrade) ||
    Boolean(selectedPrice) ||
    selectedSort !== "latest";

  return (
    <div className="sticky top-20 z-40 bg-bg-surface border border-border-theme rounded-2xl p-4 shadow-sm mb-8">
      {/* Desktop Filter Bar (md:flex) */}
      <div className="hidden md:flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Subject Dropdown */}
          <div className="relative">
            <select
              value={selectedSubject}
              onChange={(e) => updateFilter("subject", e.target.value)}
              className="appearance-none rounded-xl border border-border-theme bg-bg-base ps-4 pe-9 py-2 text-sm font-semibold text-ink focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 cursor-pointer"
            >
              {subjects.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          </div>

          {/* Grade Dropdown */}
          <div className="relative">
            <select
              value={selectedGrade}
              onChange={(e) => updateFilter("grade", e.target.value)}
              className="appearance-none rounded-xl border border-border-theme bg-bg-base ps-4 pe-9 py-2 text-sm font-semibold text-ink focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 cursor-pointer"
            >
              {grades.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          </div>

          {/* Price Dropdown */}
          <div className="relative">
            <select
              value={selectedPrice}
              onChange={(e) => updateFilter("price", e.target.value)}
              className="appearance-none rounded-xl border border-border-theme bg-bg-base ps-4 pe-9 py-2 text-sm font-semibold text-ink focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 cursor-pointer"
            >
              {prices.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="appearance-none rounded-xl border border-border-theme bg-bg-base ps-4 pe-9 py-2 text-sm font-semibold text-ink focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 cursor-pointer"
            >
              {sortOptions.map((so) => (
                <option key={so.value} value={so.value}>
                  الترتيب: {so.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          </div>

          {/* Reset button if active filters exist */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-text-secondary hover:text-accent-500 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة ضبط</span>
            </button>
          )}
        </div>

        {/* Results counter */}
        <div className="text-sm font-bold text-text-secondary font-latin shrink-0">
          {totalResults} كورس مُتاح
        </div>
      </div>

      {/* Mobile Filter Row (<md) */}
      <div className="flex md:hidden items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsMobileSheetOpen(true)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4 text-accent-500" />
          <span>فلترة وتصفية</span>
          {hasActiveFilters && (
            <span className="h-2 w-2 rounded-full bg-accent-500" />
          )}
        </Button>

        <span className="text-sm font-bold text-text-secondary font-latin">
          {totalResults} كورس
        </span>
      </div>

      {/* Mobile Filter Bottom Sheet Modal */}
      <AnimatePresence>
        {isMobileSheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSheetOpen(false)}
              className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs md:hidden"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-bg-surface p-6 shadow-2xl border-t border-border-theme space-y-5 max-h-[85vh] overflow-y-auto md:hidden text-start"
            >
              {/* Sheet Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border-theme">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-accent-500" />
                  <h3 className="text-lg font-bold text-ink">تصفية الكورسات</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileSheetOpen(false)}
                  className="p-1 text-text-secondary hover:text-ink rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Stacked Dropdown Controls */}
              <div className="space-y-4">
                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary">المادة الدراسية</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => updateFilter("subject", e.target.value)}
                    className="w-full rounded-xl border border-border-theme bg-bg-base p-3 text-sm font-semibold text-ink"
                  >
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grade */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary">الصف الدراسي</label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => updateFilter("grade", e.target.value)}
                    className="w-full rounded-xl border border-border-theme bg-bg-base p-3 text-sm font-semibold text-ink"
                  >
                    {grades.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary">مستوى السعر</label>
                  <select
                    value={selectedPrice}
                    onChange={(e) => updateFilter("price", e.target.value)}
                    className="w-full rounded-xl border border-border-theme bg-bg-base p-3 text-sm font-semibold text-ink"
                  >
                    {prices.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary">ترتيب حسب</label>
                  <select
                    value={selectedSort}
                    onChange={(e) => updateFilter("sort", e.target.value)}
                    className="w-full rounded-xl border border-border-theme bg-bg-base p-3 text-sm font-semibold text-ink"
                  >
                    {sortOptions.map((so) => (
                      <option key={so.value} value={so.value}>
                        {so.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sheet Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-border-theme">
                {hasActiveFilters && (
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className="w-1/3"
                    onClick={handleResetFilters}
                  >
                    إعادة ضبط
                  </Button>
                )}
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  className={cn(hasActiveFilters ? "w-2/3" : "w-full")}
                  onClick={() => setIsMobileSheetOpen(false)}
                >
                  عرض النتائج ({totalResults})
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
