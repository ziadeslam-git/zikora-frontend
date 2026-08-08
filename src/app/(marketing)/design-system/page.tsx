import type { Metadata } from "next";
import {
  BookOpen, DollarSign, Users, TrendingUp,
  GraduationCap, Star, Bell, CheckCircle,
  AlertTriangle, Info,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export const metadata: Metadata = {
  title: "Design System — Zikora",
  description: "صفحة مرجعية لنظام تصميم Zikora — الألوان والخطوط والمكونات",
};

/* ─── Local sub-components (Server Components) ─────────────────────────── */

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
      <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
        {label}
      </span>
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      {description && <p className="text-neutral-600">{description}</p>}
    </div>
  );
}

function Divider() {
  return <hr className="border-neutral-200" />;
}

/* ─── Color Swatch ─────────────────────────────────────────────────────── */
function ColorSwatch({
  color,
  name,
  hex,
  isLight = false,
}: {
  color: string;
  name: string;
  hex: string;
  isLight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-xl border border-neutral-200 shadow-sm"
        style={{ backgroundColor: color }}
        aria-label={`${name}: ${hex}`}
      />
      <div>
        <p className="text-xs font-semibold text-ink">{name}</p>
        <p className="font-latin text-xs text-neutral-500">{hex}</p>
      </div>
    </div>
  );
}

/* ─── Type Scale Row ───────────────────────────────────────────────────── */
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
    <div className="flex items-baseline gap-4 border-b border-neutral-100 py-3 last:border-0">
      <span className="w-16 shrink-0 font-latin text-xs text-neutral-400">{label}</span>
      <span className={`${size} text-ink`}>{text}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Design System Page
   ═══════════════════════════════════════════════════════════════════════════ */
export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="bg-brand-gradient text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white">
              Internal Reference · August 2026
            </span>
            <h1 className="text-4xl font-bold text-white">
              Zikora Design System
            </h1>
            <p className="max-w-xl text-lg text-white/80">
              نظام التصميم الموحّد — الألوان والخطوط والمسافات والمكونات.
              أي صفحة أو داشبورد بتتبني بعد كده تتبع الـ Tokens دي من غير اختراع.
            </p>
          </div>

          {/* Quick stats */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { v: "5",    l: "UI Components" },
              { v: "10",   l: "Orange Steps" },
              { v: "9",    l: "Neutral Steps" },
              { v: "2",    l: "Font Families" },
            ].map(({ v, l }) => (
              <div key={l} className="rounded-xl border border-white/20 bg-white/10 p-4 text-center">
                <p className="font-latin text-2xl font-bold text-white">{v}</p>
                <p className="mt-1 text-xs text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">

        {/* ════ 1. Colors ═════════════════════════════════════════════════ */}
        <section aria-labelledby="colors-heading">
          <SectionHeader
            label="01 · Colors"
            title="نظام الألوان"
            description="مصدر الحقيقة الوحيد — من ملف الـ Palette الرسمي لـ Zikora"
          />

          {/* Brand Orange Scale */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-ink">
                Brand Orange — الـ Tonal Scale (50–900)
              </h3>
              <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
                {[
                  { name: "50",  hex: "#FFF5EF" },
                  { name: "100", hex: "#FFE0CC" },
                  { name: "200", hex: "#FFC09A" },
                  { name: "300", hex: "#FF9864" },
                  { name: "400", hex: "#FD7633" },
                  { name: "500", hex: "#FC5A05" },
                  { name: "600", hex: "#CF4804" },
                  { name: "700", hex: "#A23803" },
                  { name: "800", hex: "#752801" },
                  { name: "900", hex: "#491900" },
                ].map(({ name, hex }) => (
                  <ColorSwatch key={name} color={hex} name={name} hex={hex} />
                ))}
              </div>

              {/* Gradient preview */}
              <div className="mt-4 flex items-center gap-4 rounded-xl p-4 bg-brand-gradient">
                <div>
                  <p className="font-semibold text-white">Brand Gradient</p>
                  <p className="font-latin text-xs text-white/70">
                    linear-gradient(135deg, #FC5A05 → #491900)
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    ⚠️ استخدم بحرص — Hero CTA + كارت مميز واحد بس لكل شاشة
                  </p>
                </div>
              </div>
            </div>

            {/* Core brand values */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-ink">الألوان الجوهرية</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <ColorSwatch color="#FC5A05" name="Brand Orange" hex="#FC5A05" />
                <ColorSwatch color="#141414" name="Ink" hex="#141414" />
                <ColorSwatch color="#F9F9F9" name="Base White" hex="#F9F9F9" isLight />
                <div className="flex flex-col gap-2">
                  <div className="h-16 w-full rounded-xl" style={{ background: "linear-gradient(135deg, #FC5A05, #491900)" }} />
                  <div>
                    <p className="text-xs font-semibold text-ink">Brand Gradient</p>
                    <p className="font-latin text-xs text-neutral-500">#FC5A05 → #491900</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Neutrals */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-ink">
                Neutrals (مشتقة من الـ Palette الرسمي)
              </h3>
              <div className="grid grid-cols-5 gap-3 sm:grid-cols-9">
                {[
                  { name: "50",  hex: "#F9F9F9" },
                  { name: "100", hex: "#EFEFEF" },
                  { name: "200", hex: "#DCDCDC" },
                  { name: "400 ★", hex: "#989795" },
                  { name: "500", hex: "#7F7D7B" },
                  { name: "600 ★", hex: "#646464" },
                  { name: "700", hex: "#494949" },
                  { name: "800 ★", hex: "#333333" },
                  { name: "900", hex: "#141414" },
                ].map(({ name, hex }) => (
                  <ColorSwatch key={name} color={hex} name={name} hex={hex} isLight={name.startsWith("5") || name.startsWith("1") || name.startsWith("2")} />
                ))}
              </div>
              <p className="mt-2 text-xs text-neutral-500">★ = Hex حرفي من ملف الـ Palette الرسمي</p>
            </div>

            {/* Semantic */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-ink">
                Semantic — حالات UI فقط
              </h3>
              <div className="grid grid-cols-3 gap-4 sm:w-64">
                <ColorSwatch color="#22C55E" name="Success" hex="#22C55E" />
                <ColorSwatch color="#EF4444" name="Danger" hex="#EF4444" />
                <ColorSwatch color="#F59E0B" name="Warning" hex="#F59E0B" />
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                ⚠️ Warning قريب من Brand Orange — دايمًا صاحبه بأيقونة تحذير واضحة
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* ════ 2. Typography ══════════════════════════════════════════════ */}
        <section aria-labelledby="typography-heading">
          <SectionHeader
            label="02 · Typography"
            title="الخطوط والحجم"
            description="Cairo للعربي · Inter للأرقام والإنجليزي"
          />

          {/* Font families */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <Card padding="md">
              <p className="mb-2 text-xs font-semibold text-neutral-500">
                Arabic — font-arabic (Cairo)
              </p>
              <p className="font-arabic text-2xl text-ink">
                منصة Zikora للتعليم الإلكتروني
              </p>
              <p className="mt-1 font-arabic text-sm text-neutral-600">
                كورسات احترافية في مختلف المجالات
              </p>
            </Card>
            <Card padding="md">
              <p className="mb-2 text-xs font-semibold text-neutral-500">
                Latin/Numbers — font-latin (Inter)
              </p>
              <p className="font-latin text-2xl text-ink">Zikora Platform</p>
              <p className="mt-1 font-latin text-sm text-neutral-600">
                1,234 Students · £ 24,500 · 98.5%
              </p>
            </Card>
          </div>

          {/* Type scale */}
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
            <TypeRow label="text-6xl"  size="text-6xl"  text="Max Hero · 60px" />
          </Card>
        </section>

        <Divider />

        {/* ════ 3. Buttons ═════════════════════════════════════════════════ */}
        <section aria-labelledby="buttons-heading">
          <SectionHeader
            label="03 · Buttons"
            title="الأزرار"
            description="5 Variants × 3 Sizes — Gradient محجوز لـ Hero CTAs فقط"
          />

          <div className="space-y-8">
            {/* Variants */}
            {(["primary", "gradient", "outline", "ghost", "danger"] as const).map((variant) => (
              <div key={variant} className="space-y-3">
                <div className="flex items-center gap-3">
                  <code className="rounded bg-neutral-100 px-2 py-0.5 font-latin text-xs text-neutral-700">
                    variant=&quot;{variant}&quot;
                  </code>
                  {variant === "gradient" && (
                    <Badge variant="warning">⚠️ Hero CTAs فقط</Badge>
                  )}
                </div>
                <div className={`flex flex-wrap items-center gap-3 rounded-xl p-5 ${variant === "ghost" ? "bg-neutral-100" : "bg-neutral-50"}`}>
                  <Button variant={variant} size="sm">صغير</Button>
                  <Button variant={variant} size="md">متوسط</Button>
                  <Button variant={variant} size="lg">كبير</Button>
                  <Button variant={variant} size="md" loading>جارٍ التحميل</Button>
                  <Button variant={variant} size="md" disabled>معطّل</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ════ 4. Cards ═══════════════════════════════════════════════════ */}
        <section aria-labelledby="cards-heading">
          <SectionHeader
            label="04 · Cards"
            title="الكروت"
            description="الكارت العادي أبيض دايمًا — الـ Highlighted واحد بس لكل شاشة"
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <Card padding="md">
              <p className="text-sm font-semibold text-neutral-500">padding=&quot;sm&quot;</p>
              <h3 className="mt-2 text-lg font-bold text-ink">كارت عادي</h3>
              <p className="mt-1 text-sm text-neutral-600">
                الكارت الافتراضي — خلفية بيضاء (#F9F9F9) وظل خفيف.
              </p>
            </Card>

            <Card padding="md" highlighted>
              <p className="text-sm font-medium text-white/70">highlighted=true</p>
              <h3 className="mt-2 text-lg font-bold text-white">الكارت المميز ⭐</h3>
              <p className="mt-1 text-sm text-white/80">
                واحد بس لكل شاشة — بيستخدم الـ Brand Gradient.
              </p>
              <p className="mt-3 font-latin text-3xl font-bold text-white">
                £ 24,500
              </p>
            </Card>

            <Card padding="lg">
              <p className="text-sm font-semibold text-neutral-500">padding=&quot;lg&quot;</p>
              <h3 className="mt-2 text-lg font-bold text-ink">كارت بـ padding كبير</h3>
              <p className="mt-1 text-sm text-neutral-600">
                مناسب للكروت التفصيلية أو الكروت اللي فيها إحصائية مهمة.
              </p>
            </Card>
          </div>
        </section>

        <Divider />

        {/* ════ 5. Stat Cards ══════════════════════════════════════════════ */}
        <section aria-labelledby="statcards-heading">
          <SectionHeader
            label="05 · StatCards"
            title="كروت الإحصائيات"
            description="كما هو في Donezo/Nexus — أبيض، أيقونة دايرة برتقالية، رقم كبير، Trend"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<DollarSign className="h-5 w-5" />}
              label="إجمالي الإيرادات"
              value="£ 24,500"
              trend={{ direction: "up", value: "+12.5%" }}
            />
            <StatCard
              icon={<Users className="h-5 w-5" />}
              label="الطلاب المسجلين"
              value={1248}
              trend={{ direction: "up", value: "+8.2%" }}
            />
            <StatCard
              icon={<BookOpen className="h-5 w-5" />}
              label="الكورسات النشطة"
              value={34}
              trend={{ direction: "down", value: "−2.1%", label: "من الأسبوع اللي فات" }}
            />
            <StatCard
              icon={<GraduationCap className="h-5 w-5" />}
              label="معدل الإتمام"
              value="87.3%"
              trend={{ direction: "up", value: "+4.0%" }}
            />
          </div>

          {/* Highlighted variant example */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-brand-gradient p-6 text-white shadow-lg lg:col-span-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 shrink-0">
                <Star className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <p className="mt-4 font-latin text-3xl font-bold text-white">£ 24,500</p>
              <p className="text-sm text-white/80">إجمالي الأرباح — الكارت المميز</p>
              <div className="mt-2 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-white/80" />
                <span className="font-latin text-xs font-semibold text-white">+12.5%</span>
                <span className="text-xs text-white/60">من الشهر اللي فات</span>
              </div>
            </div>
            <StatCard
              icon={<Users className="h-5 w-5" />}
              label="الطلاب المسجلين"
              value={1248}
              trend={{ direction: "up", value: "+8.2%" }}
            />
            <StatCard
              icon={<BookOpen className="h-5 w-5" />}
              label="الكورسات النشطة"
              value={34}
            />
            <StatCard
              icon={<Bell className="h-5 w-5" />}
              label="الإشعارات الجديدة"
              value={7}
            />
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            ↑ مثال عملي: الكارت الأول ممكن يبقى Gradient (واحد بس) — الباقي أبيض
          </p>
        </section>

        <Divider />

        {/* ════ 6. Badges ══════════════════════════════════════════════════ */}
        <section aria-labelledby="badges-heading">
          <SectionHeader label="06 · Badges" title="الـ Badges" />

          <Card padding="md">
            <div className="flex flex-wrap gap-3">
              <Badge variant="success">
                <CheckCircle className="h-3 w-3" aria-hidden="true" />
                مكتمل
              </Badge>
              <Badge variant="danger">متأخر</Badge>
              <Badge variant="warning">
                <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                ⚠️ تحذير — مع أيقونة دايمًا
              </Badge>
              <Badge variant="default">تقنية المعلومات</Badge>
              <Badge variant="default">تطوير الويب</Badge>
              <Badge variant="brand">
                <Star className="h-3 w-3" aria-hidden="true" />
                مميز
              </Badge>
              <Badge variant="brand">جديد</Badge>
            </div>
          </Card>
        </section>

        <Divider />

        {/* ════ 7. Inputs ══════════════════════════════════════════════════ */}
        <section aria-labelledby="inputs-heading">
          <SectionHeader
            label="07 · Inputs"
            title="حقول الإدخال"
            description="Focus ring برتقالي · Error state بالأحمر · Helper text رمادي"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Input
              label="الاسم الكامل"
              placeholder="مثال: أحمد محمد"
              helperText="سيظهر للطلاب والمعلمين"
            />
            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="ahmed@example.com"
              required
            />
            <Input
              label="رقم الهاتف"
              type="tel"
              placeholder="01000000000"
              error="رقم الهاتف غير صحيح — يجب أن يكون 11 رقمًا"
            />
            <Input
              label="كلمة المرور"
              type="password"
              placeholder="••••••••"
              helperText="8 أحرف على الأقل، حرف كبير ورقم"
            />
            <Input
              placeholder="بحث... (بدون label)"
            />
            <Input
              label="حقل معطّل"
              placeholder="لا يمكن التعديل"
              disabled
              defaultValue="قيمة ثابتة"
            />
          </div>
        </section>

        <Divider />

        {/* ════ 8. Radius & Shadows ════════════════════════════════════════ */}
        <section aria-labelledby="radius-heading">
          <SectionHeader label="08 · Radius & Shadows" title="الـ Radius والظلال" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "rounded-lg (8px)", cls: "rounded-lg",   shadow: "shadow-sm", sublabel: "Inputs, Badges" },
              { label: "rounded-xl (12px)", cls: "rounded-xl",  shadow: "shadow-md", sublabel: "Buttons" },
              { label: "rounded-2xl (16px)",cls: "rounded-2xl", shadow: "shadow-lg", sublabel: "Cards, Widgets" },
              { label: "rounded-full",     cls: "rounded-full", shadow: "shadow-sm", sublabel: "Avatars, Icons" },
            ].map(({ label, cls, shadow, sublabel }) => (
              <div key={label} className="flex flex-col gap-3">
                <div
                  className={`flex h-24 items-center justify-center bg-white border border-neutral-200 ${cls} ${shadow}`}
                >
                  <span className="font-latin text-xs text-neutral-500">{cls}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink">{label}</p>
                  <p className="text-xs text-neutral-500">{sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer note ──────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
          <div className="flex gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" aria-hidden="true" />
            <div>
              <p className="font-semibold text-orange-900">ملاحظات مهمة للتطبيق</p>
              <ul className="mt-2 space-y-1 text-sm text-orange-800">
                <li>• أقصى كارت Gradient واحد في الشاشة الواحدة</li>
                <li>• Warning دايمًا مع أيقونة — اللون قريب جدًا من Brand Orange</li>
                <li>• كروت الداشبورد دايمًا بيضاء (#F9F9F9) — مش Gradient</li>
                <li>• الأرقام والأسعار: font-latin (Inter)</li>
                <li>• النص العربي: font-arabic (Cairo)</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
