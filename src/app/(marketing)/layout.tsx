import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Marketing layout — wraps public-facing pages (Home, Courses, About, etc.).
 *
 * Structure: Header (sticky) → main content → Footer (auto push-to-bottom).
 * Both Header and Footer are imported here — not in root layout — so dashboard
 * pages can have a completely different layout (sidebar, no footer, etc.).
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
