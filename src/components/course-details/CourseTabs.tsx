"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type TabId = "overview" | "lectures" | "study-plan" | "reviews";

export interface CourseTabsProps {
  overviewContent: React.ReactNode;
  lecturesContent: React.ReactNode;
  studyPlanContent: React.ReactNode;
  reviewsContent: React.ReactNode;
  defaultTab?: TabId;
}

const tabList: { id: TabId; label: string }[] = [
  { id: "overview", label: "نظرة عامة" },
  { id: "lectures", label: "المحاضرات والدروس" },
  { id: "study-plan", label: "خطة المذاكرة 🚀" },
  { id: "reviews", label: "التقييمات والآراء" },
];

/**
 * CourseTabs — Client Component managing active tab state only.
 * Receives pre-rendered Server Component tab contents via named props,
 * preserving Server-Side Rendering efficiency for tab content.
 */
export function CourseTabs({
  overviewContent,
  lecturesContent,
  studyPlanContent,
  reviewsContent,
  defaultTab = "overview",
}: CourseTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>(defaultTab);

  return (
    <div className="space-y-8 text-start">
      {/* Horizontal Underlined Tabs Bar */}
      <div className="border-b border-border-theme overflow-x-auto scrollbar-none">
        <nav className="flex items-center gap-8 min-w-max" aria-label="أقسام الكورس">
          {tabList.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-4 text-base font-bold transition-all border-b-2 -mb-px cursor-pointer select-none",
                  isActive
                    ? "border-accent-500 text-accent-500 font-extrabold"
                    : "border-transparent text-text-secondary hover:text-ink hover:border-border-theme",
                )}
                aria-selected={isActive}
                role="tab"
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Render Active Tab Content */}
      <div role="tabpanel" className="pt-2">
        {activeTab === "overview" && overviewContent}
        {activeTab === "lectures" && lecturesContent}
        {activeTab === "study-plan" && studyPlanContent}
        {activeTab === "reviews" && reviewsContent}
      </div>
    </div>
  );
}
