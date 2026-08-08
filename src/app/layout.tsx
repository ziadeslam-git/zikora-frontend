import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

/**
 * Cairo — Arabic content (400 / 500 / 600 / 700 / 800 weights)
 * Exposes --font-cairo CSS variable consumed by globals.css @theme.
 */
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/**
 * Inter — Latin text, numbers, prices, course grades.
 * Exposes --font-inter CSS variable consumed by globals.css @theme.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zikora — منصة التعليم الإلكتروني",
    template: "%s | Zikora",
  },
  description:
    "منصة Zikora للتعليم الإلكتروني — كورسات احترافية في مختلف المجالات للطلاب والمعلمين.",
  keywords: ["تعليم", "كورسات", "e-learning", "Zikora", "منصة تعليمية"],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://zikora.com",
  ),
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "Zikora",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased font-arabic">
        {children}
      </body>
    </html>
  );
}
