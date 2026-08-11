import Link from "next/link";
import { Mail, MessageCircle, Send, Globe, Video, Rss, Camera } from "lucide-react";

const footerLinks = {
  platform: {
    title: "المنصة",
    links: [
      { label: "الكورسات", href: "/courses" },
      { label: "المعلمون", href: "/instructors" },
      { label: "الأسعار والعروض", href: "/pricing" },
      { label: "الأسئلة الشائعة", href: "/faq" },
    ],
  },
  support: {
    title: "الدعم",
    links: [
      { label: "تواصل معنا", href: "/contact" },
      { label: "سياسة الخصوصية", href: "/privacy" },
      { label: "الشروط والأحكام", href: "/terms" },
    ],
  },
} as const;

const contactInfo = [
  { label: "+20 100 000 0000", href: "https://wa.me/201000000000", Icon: MessageCircle, name: "واتساب" },
  { label: "info@zikora.com", href: "mailto:info@zikora.com", Icon: Mail, name: "بريد إلكتروني" },
  { label: "t.me/zikora", href: "https://t.me/zikora", Icon: Send, name: "تليجرام" },
] as const;

const socialLinks = [
  { label: "يوتيوب", href: "https://youtube.com", Icon: Video },
  { label: "تويتر", href: "https://twitter.com", Icon: Globe },
  { label: "لينكدإن", href: "https://linkedin.com", Icon: Rss },
  { label: "إنستغرام", href: "https://instagram.com", Icon: Camera },
] as const;

/**
 * Marketing Footer — Server Component.
 * Fixed rich dark background (#0A0B1A) with forced high-contrast white text on all children.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0A0B1A] !text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-start">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Logo + Short description + Social Icons */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Zikora">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500 !text-white font-bold font-latin shadow-glow-accent">
                Z
              </div>
              <span className="text-xl font-extrabold tracking-tight !text-white font-latin">
                Zikora
              </span>
            </Link>

            <p className="text-sm !text-white/80 leading-relaxed">
              منصة Zikora للتعليم الإلكتروني — نوفر كورسات احترافية عالية الجودة
              بأسعار مناسبة لكل المتعلمين في مصر والوطن العربي.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 !text-white hover:bg-accent-500 transition-all duration-150 border border-white/10"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: المنصة */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold !text-white">{footerLinks.platform.title}</h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.platform.links.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="!text-white/80 hover:!text-accent-500 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: الدعم */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold !text-white">{footerLinks.support.title}</h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.support.links.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="!text-white/80 hover:!text-accent-500 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: تواصل معنا */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold !text-white">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              {contactInfo.map(({ label, href, Icon, name }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 !text-white/80 hover:!text-accent-500 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-accent-500 shrink-0" aria-hidden="true" />
                    <span dir="ltr" className="font-latin !text-white/80">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs !text-white/50 md:text-start">
          <p>© {currentYear} Zikora. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
