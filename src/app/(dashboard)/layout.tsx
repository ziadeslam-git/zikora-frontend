/**
 * Dashboard layout — wraps Student, Teacher, and Admin dashboards.
 *
 * Will include:
 *   - Collapsible sidebar (Server Component shell + Client toggle)
 *   - Dashboard-specific top bar (notifications, user avatar)
 *   - No marketing header or public footer
 *
 * The full sidebar and dashboard nav will be built in the Dashboard task (P4-W6).
 *
 * Token fix (2026-08-13): replaced all undefined generic tokens with Zikora equivalents:
 *   bg-background-subtle → bg-bg-surface
 *   bg-background         → bg-bg-base
 *   border-border         → border-border-theme
 *   text-primary          → text-ink
 *   text-foreground-muted → text-text-secondary
 */
import SidebarWrapper from "./components/SidebarWrapper";
import HeaderWrapper from "./components/HeaderWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh bg-bg-surface">
      <SidebarWrapper />

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0">
        <HeaderWrapper />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
