import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
    <html lang="ar" dir="rtl" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased bg-bg-base text-ink transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
