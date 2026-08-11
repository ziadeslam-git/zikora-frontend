import type { Metadata } from "next";
import { ExamRunner } from "@/components/exam/ExamRunner";

interface ExamPageProps {
  params: Promise<{
    examId: string;
  }>;
}

export const metadata: Metadata = {
  title: "أداء الامتحان التفاعلي — Zikora",
  description: "بيئة أداء الإمتحانات التفاعلية والتصحيح الآلي الفوري على منصة Zikora",
};

/**
 * Exam Page — Server Component.
 * Awaits Next.js 16 async params and renders ExamRunner client component.
 */
export default async function ExamPage({ params }: ExamPageProps) {
  const resolvedParams = await params;

  return (
    <ExamRunner examId={resolvedParams.examId} />
  );
}
