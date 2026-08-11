import type { Metadata } from "next";
import {
  BookOpen, DollarSign, Users, TrendingUp,
  GraduationCap, Star, Bell, CheckCircle,
  AlertTriangle, Info, Moon, Sun,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const metadata: Metadata = {
  title: "Design System — Zikora Dual Theme",
  description: "صفحة مرجعية لنظام تصميم Zikora المزدوج — Light (Techsara) & Dark (Brand Palette)",
};

/* ─── Local sub-components ─────────────────────────────────────────────── */

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 space-y-1">
      <span className="inline-block rounded-full bg-accent-blob/40 px-3 py-1 text-xs font-semibold text-accent-text">
        {label}
      </span>
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      {description && <p className="text-text-secondary">{description}</p>}
    </div>
  );
}

function Divider() {
  return <hr className="border-border-theme" />;
}

function ColorSwatch({
  color,
  name,
  hex,
}: {
  color: string;
  name: string;
  hex: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-xl border border-border-theme shadow-xs"
        style={{ backgroundColor: color }}
        aria-label={`${name}: ${hex}`}
      />
      <div>
        <p className="text-xs font-semibold text-ink">{name}</p>
        <p className="font-latin text-xs text-text-secondary">{hex}</p>
      </div>
    </div>
  );
}

function TypeRow({
  label,
  size,
  text,
}: {
  label: string;
  size: string;
  text: string;
}) {
  return (
    <div className="flex items-baseline gap-4 border-b border-border-theme py-3 last:border-0">
      <span className="w-16 shrink-0 font-latin text-xs text-text-secondary">{label}</span>
      <span className={`${size} text-ink`}>{text}</span>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-bg-base text-ink transition-colors duration-200">
      {/* Page Header */}
      <div className="bg-brand-gradient text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <span className="inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                Dual Theme Specification · Light (Techsara) & Dark (Brand Palette)
              </span>
              <h1 className="text-4xl font-bold text-white">
                Zikora Design System
              </h1>
              <p className="max-w-xl text-lg text-white/80">
                نظام تصميم مزدوج موحّد وقابل للتكيّف. استخدم الزر لتجربة التبديل المباشر بين الوضع الفاتح والوضع الداكن.
              </p>
            </div>

            {/* Live Theme Toggle */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shrink-0">
              <span className="text-sm font-bold text-white">تبديل المظهر:</span>
              <ThemeToggle className="bg-white text-ink hover:bg-neutral-100" />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { v: "2", l: "Themes (Light/Dark)" },
              { v: "5", l: "Core UI Components" },
              { v: "100%", l: "CSS Variable Theme Driven" },
              { v: "RTL", l: "Native Support" },
            ].map(({ v, l }) => (
              <div key={l} className="rounded-xl border border-white/20 bg-white/10 p-4 text-center">
                <p className="font-latin text-2xl font-bold text-white">{v}</p>
                <p className="mt-1 text-xs text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">

        {/* 1. Light Mode Palette */}
        <section aria-labelledby="light-palette">
          <SectionHeader
            label="01 · Light Theme"
            title="Light Mode (Techsara Reference)"
            description="الوضع الفاتح الافتراضي عند زيارة الموقع — مستخرج بالكامل من صورة الـ Reference"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ColorSwatch color="#FFFFFF" name="bgBase" hex="#FFFFFF" />
            <ColorSwatch color="#F7F7FC" name="bgSurface" hex="#F7F7FC" />
            <ColorSwatch color="#5B4FE0" name="accent500" hex="#5B4FE0" />
            <ColorSwatch color="#C7CDFF" name="accentBlob" hex="#C7CDFF" />
            <ColorSwatch color="#14162B" name="ink" hex="#14162B" />
            <ColorSwatch color="#5B5D77" name="textSecondary" hex="#5B5D77" />
            <ColorSwatch color="#E5E5F0" name="border" hex="#E5E5F0" />
            <div className="flex flex-col gap-2">
              <div className="h-16 w-full rounded-xl border border-border-theme" style={{ background: "linear-gradient(135deg, #4C6FFF 0%, #5B4FE0 45%, #7B5CF0 100%)" }} />
              <div>
                <p className="text-xs font-semibold text-ink">brandGradient</p>
                <p className="font-latin text-xs text-text-secondary">Indigo/Violet</p>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* 2. Dark Mode Palette */}
        <section aria-labelledby="dark-palette">
          <SectionHeader
            label="02 · Dark Theme"
            title="Dark Mode (Official Zikora Brand Palette)"
            description="الوضع الداكن الموثّق حرفيًا من skill الـ Thumbnail Design"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ColorSwatch color="#0A0A0A" name="bgBase" hex="#0A0A0A" />
            <ColorSwatch color="#111111" name="bgSurface" hex="#111111" />
            <ColorSwatch color="#1A1A1A" name="bgSurface2" hex="#1A1A1A" />
            <ColorSwatch color="#7C3AED" name="accent500" hex="#7C3AED" />
            <ColorSwatch color="#9B30FF" name="accentGlow" hex="#9B30FF" />
            <ColorSwatch color="#A855F7" name="accentText" hex="#A855F7" />
            <ColorSwatch color="#CC1010" name="dangerCta" hex="#CC1010" />
            <div className="flex flex-col gap-2">
              <div className="h-16 w-full rounded-xl border border-border-theme" style={{ background: "linear-gradient(135deg, #6B21D4 0%, #7C3AED 50%, #9B30FF 100%)" }} />
              <div>
                <p className="text-xs font-semibold text-ink">brandGradient</p>
                <p className="font-latin text-xs text-text-secondary">Purple Glow</p>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* 3. Typography */}
        <section aria-labelledby="typography-heading">
          <SectionHeader
            label="03 · Typography"
            title="الخطوط وحجم النصوص"
            description="Cairo للعربي · Inter للأرقام والإنجليزية"
          />

          <Card padding="md">
            <TypeRow label="text-xs"   size="text-xs"   text="تسمية · Label · Timestamp · 12px" />
            <TypeRow label="text-sm"   size="text-sm"   text="نص ثانوي · Form hints · Helper text · 14px" />
            <TypeRow label="text-base" size="text-base" text="نص أساسي · Body text · 16px" />
            <TypeRow label="text-lg"   size="text-lg"   text="عنوان الكارت · Card Title · 18px" />
            <TypeRow label="text-xl"   size="text-xl"   text="عنوان قسم فرعي · Section Subtitle · 20px" />
            <TypeRow label="text-2xl"  size="text-2xl"  text="عنوان صفحة الداشبورد · 24px" />
            <TypeRow label="text-3xl"  size="text-3xl"  text="عنوان قسم صفحة الهوم · 30px" />
            <TypeRow label="text-4xl"  size="text-4xl"  text="Hero Subheading · 36px" />
            <TypeRow label="text-5xl"  size="text-5xl"  text="Hero Heading · 48px" />
          </Card>
        </section>

        <Divider />

        {/* 4. Buttons */}
        <section aria-labelledby="buttons-heading">
          <SectionHeader
            label="04 · Buttons"
            title="الأزرار التفاعلية"
            description="تتكيّف تلقائيًا حسب الوضع المختار (Light / Dark)"
          />

          <div className="space-y-6">
            {(["primary", "gradient", "outline", "ghost", "danger"] as const).map((variant) => (
              <div key={variant} className="space-y-3">
                <code className="rounded bg-bg-surface-2 px-2 py-1 font-latin text-xs text-accent-text">
                  variant=&quot;{variant}&quot;
                </code>
                <div className="flex flex-wrap items-center gap-3 rounded-xl p-5 border border-border-theme bg-bg-surface">
                  <Button variant={variant} size="sm">صغير</Button>
                  <Button variant={variant} size="md">متوسط</Button>
                  <Button variant={variant} size="lg">كبير</Button>
                  <Button variant={variant} size="md" loading>تحميل</Button>
                  <Button variant={variant} size="md" disabled>معطّل</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* 5. Cards */}
        <section aria-labelledby="cards-heading">
          <SectionHeader label="05 · Cards" title="الكروت والتنظيم" />

          <div className="grid gap-4 sm:grid-cols-3">
            <Card padding="md">
              <p className="text-sm font-semibold text-text-secondary">الكارت الأساسي</p>
              <h3 className="mt-2 text-lg font-bold text-ink">كارت محتوى</h3>
              <p className="mt-1 text-sm text-text-secondary">
                يتكيف تلقائيًا مع خلفيات وإطارات الوضعين الفاتح والداكن.
              </p>
            </Card>

            <Card padding="md" highlighted>
              <p className="text-sm font-medium text-white/70">highlighted=true</p>
              <h3 className="mt-2 text-lg font-bold text-white">الكارت المميز ⭐</h3>
              <p className="mt-1 text-sm text-white/80">
                يستخدم تدرج البراند المعتمد حسب الوضع المختار.
              </p>
            </Card>

            <Card padding="lg">
              <p className="text-sm font-semibold text-text-secondary">padding=&quot;lg&quot;</p>
              <h3 className="mt-2 text-lg font-bold text-ink">كارت واسع</h3>
              <p className="mt-1 text-sm text-text-secondary">
                مثالي للإحصائيات أو النموذج التفصيلي.
              </p>
            </Card>
          </div>
        </section>

        <Divider />

        {/* 6. Inputs */}
        <section aria-labelledby="inputs-heading">
          <SectionHeader label="06 · Inputs" title="حقول الإدخال" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Input label="الاسم الكامل" placeholder="أحمد محمد" />
            <Input label="البريد الإلكتروني" type="email" placeholder="ahmed@example.com" required />
            <Input label="رقم الهاتف" type="tel" error="رقم غير صحيح" />
          </div>
        </section>

      </div>
    </div>
  );
}
