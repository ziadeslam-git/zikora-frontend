import type { Metadata } from "next";
import "./globals.css";

/**
 * Fonts: Cairo (Arabic) + Inter (Latin/Numbers)
 *
 * Loaded via CSS @import in globals.css instead of next/font/google.
 * Reason: The build/dev environment has no access to fonts.googleapis.com.
 * The fonts load correctly in the user's browser at runtime.
 *
 * When the environment has Google Fonts access, switch back to next/font/google:
 *   import { Cairo, Inter } from "next/font/google";
 *   const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic", "latin"], ... });
 */

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
    <html lang="ar" dir="rtl" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
