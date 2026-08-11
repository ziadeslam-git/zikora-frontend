"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export interface UserProfileInfo {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface DashboardHeaderProps {
  /** Page title for the breadcrumb header */
  title?: string;
  /** Number of unread notifications to display on the bell badge */
  unreadCount?: number;
  /** User account information */
  user?: UserProfileInfo;
  /** Mobile sidebar toggle callback */
  onMobileMenuToggle?: () => void;
  className?: string;
}

/**
 * DashboardHeader — Client Component for Dashboard top bar.
 * Theme-aware with search bar (⌘F hint), ThemeToggle, notification bell + badge,
 * and user profile dropdown with avatar + 2 lines of text.
 */
export function DashboardHeader({
  title = "الرئيسية",
  unreadCount = 3,
  user = {
    name: "أحمد علي",
    email: "ahmed.ali@example.com",
  },
  onMobileMenuToggle,
  className,
}: DashboardHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on click outside or Escape key press
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProfileOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border-theme bg-bg-surface px-4 sm:px-6 shadow-sm",
        className,
      )}
    >
      {/* Left side: Mobile Sidebar Toggle + Breadcrumb / Title */}
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="p-2 text-text-secondary rounded-lg hover:bg-bg-surface-2 lg:hidden transition-colors"
            aria-label="فتح القائمة الجانبية"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className="flex items-center gap-2 text-sm">
          <span className="text-text-secondary hidden sm:inline">اللوحة /</span>
          <h1 className="text-base font-bold text-ink">{title}</h1>
        </div>
      </div>

      {/* Center: Search Bar with ⌘F hint */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            type="search"
            placeholder="بحث في الكورسات، الطلاب..."
            className="w-full rounded-lg border border-border-theme bg-bg-base ps-9 pe-12 py-2 text-sm text-ink placeholder:text-text-secondary focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 transition-all"
          />
          <kbd className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 items-center rounded border border-border-theme bg-bg-surface px-1.5 font-latin text-[10px] font-medium text-text-secondary shadow-xs">
            ⌘F
          </kbd>
        </div>
      </div>

      {/* Right side: ThemeToggle + Notification Bell + User Profile Dropdown */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 text-text-secondary rounded-full hover:bg-bg-surface-2 transition-colors"
          aria-label={`الإشعارات (${unreadCount} غير مقروء)`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 font-latin end-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">
              {unreadCount > 9 ? "+9" : unreadCount}
            </span>
          )}
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-border-theme" />

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-1 rounded-lg hover:bg-bg-surface-2 transition-colors"
            aria-expanded={profileOpen}
            aria-haspopup="true"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-white font-bold text-sm shrink-0 border border-accent-500/20 shadow-glow-accent">
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                user.name.charAt(0)
              )}
            </div>

            {/* Name + Email (2 lines) */}
            <div className="hidden sm:flex flex-col text-start">
              <span className="text-sm font-medium text-ink leading-tight">{user.name}</span>
              <span className="text-xs text-text-secondary font-latin leading-tight">{user.email}</span>
            </div>

            <ChevronDown
              className={cn(
                "h-4 w-4 text-text-secondary transition-transform duration-200",
                profileOpen && "rotate-180",
              )}
            />
          </button>

          {/* Dropdown Menu Popup */}
          {profileOpen && (
            <div className="absolute end-0 mt-2 w-56 rounded-xl border border-border-theme bg-bg-surface p-1.5 shadow-lg z-50 space-y-0.5">
              {/* User info inside popup for mobile */}
              <div className="px-3 py-2 border-b border-border-theme sm:hidden">
                <p className="text-sm font-medium text-ink">{user.name}</p>
                <p className="text-xs text-text-secondary font-latin truncate">{user.email}</p>
              </div>

              <Link
                href="/dashboard/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-ink rounded-lg hover:bg-bg-surface-2 transition-colors"
              >
                <User className="h-4 w-4 text-text-secondary" />
                <span>البروفايل</span>
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-ink rounded-lg hover:bg-bg-surface-2 transition-colors"
              >
                <Settings className="h-4 w-4 text-text-secondary" />
                <span>الإعدادات</span>
              </Link>

              <div className="my-1 border-t border-border-theme" />

              <Link
                href="/auth/login"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-danger-cta rounded-lg hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-4 w-4 text-danger-cta" />
                <span>تسجيل خروج</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
