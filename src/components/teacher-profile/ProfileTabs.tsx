"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProfileTabsProps {
  aboutTabContent: React.ReactNode;
  coursesTabContent: React.ReactNode;
  reviewsTabContent: React.ReactNode;
}

export function ProfileTabs({
  aboutTabContent,
  coursesTabContent,
  reviewsTabContent,
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<"about" | "courses" | "reviews">("about");

  const tabs = [
    { id: "about" as const, label: "عن المدرس" },
    { id: "courses" as const, label: "كل الكورسات" },
    { id: "reviews" as const, label: "التقييمات" },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-border-theme flex items-center gap-6 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-4 text-sm font-bold transition-colors whitespace-nowrap border-b-2",
              activeTab === tab.id
                ? "border-accent-500 text-accent-500"
                : "border-transparent text-text-secondary hover:text-ink hover:border-border-theme"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === "about" && aboutTabContent}
        {activeTab === "courses" && coursesTabContent}
        {activeTab === "reviews" && reviewsTabContent}
      </div>
    </div>
  );
}
