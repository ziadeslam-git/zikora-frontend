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
 * DashboardHeader — Client Component for the Dashboard layout top bar.
 * Matches Nexus reference: search input with ⌘F hint, notification bell with badge,
 * and user profile dropdown with avatar + 2 lines of text (name & email).
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
        "sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-neutral-200 bg-base-white px-4 sm:px-6 shadow-sm",
        className,
      )}
    >
      {/* Left side: Mobile Sidebar Toggle + Breadcrumb / Title */}
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="p-2 text-neutral-600 rounded-lg hover:bg-neutral-100 lg:hidden transition-colors"
            aria-label="فتح القائمة الجانبية"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className="flex items-center gap-2 text-sm">
          <span className="text-neutral-400 hidden sm:inline">اللوحة /</span>
          <h1 className="text-base font-bold text-ink">{title}</h1>
        </div>
      </div>

      {/* Center: Search Bar with ⌘F hint */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="search"
            placeholder="بحث في الكورسات، الطلاب..."
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 ps-9 pe-12 py-2 text-sm text-ink placeholder:text-neutral-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
          <kbd className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 items-center rounded border border-neutral-200 bg-white px-1.5 font-latin text-[10px] font-medium text-neutral-400 shadow-xs">
            ⌘F
          </kbd>
        </div>
      </div>

      {/* Right side: Notification Bell + User Profile Dropdown */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 text-neutral-600 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label={`الإشعارات (${unreadCount} غير مقروء)`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 font-latin end-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
              {unreadCount > 9 ? "+9" : unreadCount}
            </span>
          )}
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-neutral-200" />

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-expanded={profileOpen}
            aria-haspopup="true"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-sm shrink-0 border border-orange-200">
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
              <span className="text-xs text-neutral-500 font-latin leading-tight">{user.email}</span>
            </div>

            <ChevronDown
              className={cn(
                "h-4 w-4 text-neutral-400 transition-transform duration-200",
                profileOpen && "rotate-180",
              )}
            />
          </button>

          {/* Dropdown Menu Popup */}
          {profileOpen && (
            <div className="absolute end-0 mt-2 w-56 rounded-xl border border-neutral-200 bg-base-white p-1.5 shadow-lg z-50 space-y-0.5">
              {/* User info inside popup for mobile */}
              <div className="px-3 py-2 border-b border-neutral-100 sm:hidden">
                <p className="text-sm font-medium text-ink">{user.name}</p>
                <p className="text-xs text-neutral-500 font-latin truncate">{user.email}</p>
              </div>

              <Link
                href="/dashboard/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 rounded-lg hover:bg-neutral-100 hover:text-ink transition-colors"
              >
                <User className="h-4 w-4 text-neutral-500" />
                <span>البروفايل</span>
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 rounded-lg hover:bg-neutral-100 hover:text-ink transition-colors"
              >
                <Settings className="h-4 w-4 text-neutral-500" />
                <span>الإعدادات</span>
              </Link>

              <div className="my-1 border-t border-neutral-100" />

              <Link
                href="/auth/login"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-danger rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4 text-danger" />
                <span>تسجيل خروج</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
