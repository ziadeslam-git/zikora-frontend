/**
 * Homepage — temporary placeholder.
 *
 * الصفحة الرئيسية ستُبنى في تاسك منفصل بعد استلام التصميم.
 * الـ Header والـ Footer يظهران تلقائيًا من الـ (marketing)/layout.tsx
 */
export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="space-y-6 max-w-lg">
        {/* Logo mark */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[var(--radius-xl)] bg-primary shadow-glow">
          <span className="text-white text-2xl font-bold select-none">Z</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            مرحبًا بك في{" "}
            <span className="text-primary">Zikora</span>
          </h1>
          <p className="text-lg text-foreground-muted">
            منصة التعليم الإلكتروني — الصفحة الرئيسية قيد الإنشاء.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-subtle px-4 py-2 text-sm text-foreground-muted">
          <span className="h-2 w-2 rounded-full bg-warning animate-pulse" aria-hidden="true" />
          قيد التطوير — سيتم إضافة التصميم الكامل قريبًا
        </div>
      </div>
    </div>
  );
}
