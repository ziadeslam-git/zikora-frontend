/**
 * Dashboard layout — wraps Student, Teacher, and Admin dashboards.
 *
 * Will include:
 *   - Collapsible sidebar (Server Component shell + Client toggle)
 *   - Dashboard-specific top bar (notifications, user avatar)
 *   - No marketing header or public footer
 *
 * The full sidebar and dashboard nav will be built in the Dashboard task.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh bg-background-subtle">
      {/* Sidebar placeholder — will be replaced in Dashboard task */}
      <aside
        className="hidden lg:flex w-64 shrink-0 flex-col border-e border-border bg-background"
        aria-label="قائمة الداشبورد"
      >
        <div className="flex h-16 items-center px-6 border-b border-border">
          <span className="text-lg font-bold text-primary">Zikora</span>
        </div>
        <div className="flex-1 p-4 text-sm text-foreground-muted">
          الشريط الجانبي — سيُبنى في تاسك الداشبورد
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Dashboard topbar placeholder */}
        <header className="sticky top-0 z-20 h-16 flex items-center border-b border-border bg-background px-4 sm:px-6">
          <span className="text-sm text-foreground-muted">
            شريط أدوات الداشبورد — سيُبنى في تاسك الداشبورد
          </span>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
