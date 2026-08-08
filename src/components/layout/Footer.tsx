import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Video, Rss, Camera } from "lucide-react";

const footerLinks = {
  platform: {
    title: "المنصة",
    links: [
      { label: "الكورسات", href: "/courses" },
      { label: "المعلمون", href: "/instructors" },
      { label: "التسعير", href: "/pricing" },
      { label: "المدونة", href: "/blog" },
    ],
  },
  company: {
    title: "الشركة",
    links: [
      { label: "من نحن", href: "/about" },
      { label: "وظائف", href: "/careers" },
      { label: "الشركاء", href: "/partners" },
      { label: "تواصل معنا", href: "/contact" },
    ],
  },
  support: {
    title: "الدعم",
    links: [
      { label: "مركز المساعدة", href: "/help" },
      { label: "سياسة الاسترداد", href: "/refund-policy" },
      { label: "شروط الاستخدام", href: "/terms" },
      { label: "سياسة الخصوصية", href: "/privacy" },
    ],
  },
} as const;

const socialLinks = [
  { label: "يوتيوب", href: "https://youtube.com", Icon: Video },
  { label: "تويتر", href: "https://twitter.com", Icon: Globe },
  { label: "لينكدإن", href: "https://linkedin.com", Icon: Rss },
  { label: "إنستغرام", href: "https://instagram.com", Icon: Camera },
] as const;

const contactInfo = [
  { label: "info@zikora.com", href: "mailto:info@zikora.com", Icon: Mail },
  { label: "01000000000+", href: "tel:+201000000000", Icon: Phone },
  { label: "القاهرة، مصر", href: "#", Icon: MapPin },
] as const;

/**
 * Footer — Server Component (no interactivity, no state).
 * All links and content are static — renders on server with zero client JS.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-subtle mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="py-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 group" aria-label="Zikora">
              <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-primary">
                <span className="text-white text-sm font-bold select-none">Z</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">Zikora</span>
            </Link>

            <p className="text-sm text-foreground-muted leading-relaxed max-w-xs">
              منصة Zikora للتعليم الإلكتروني — نوفر كورسات احترافية عالية الجودة
              بأسعار مناسبة لكل المتعلمين في الوطن العربي.
            </p>

            {/* Contact */}
            <ul className="space-y-2" aria-label="معلومات التواصل">
              {contactInfo.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors"
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Columns */}
          {Object.values(footerLinks).map(({ title, links }) => (
            <div key={title} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="space-y-2.5" aria-label={title}>
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-foreground-muted hover:text-primary transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground-muted text-center sm:text-start">
            © {currentYear} Zikora. جميع الحقوق محفوظة.
          </p>

          {/* Social Links */}
          <ul className="flex items-center gap-3" aria-label="التواصل الاجتماعي">
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-foreground-muted hover:text-primary hover:bg-primary-light transition-all duration-150"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
