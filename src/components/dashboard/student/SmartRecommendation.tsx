import Link from "next/link";
import { Lightbulb, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SmartRecommendationProps {
  weakestSubject: string;
  remainingLecturesInSubject: number;
  courseId: string;
}

export function SmartRecommendation({
  weakestSubject,
  remainingLecturesInSubject,
  courseId,
}: SmartRecommendationProps) {
  return (
    <div className="bg-accent-blob/10 border border-accent-500/20 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2 text-accent-text">
        <Lightbulb className="w-5 h-5 fill-current" />
        <h3 className="font-bold text-sm">التوصية الذكية</h3>
      </div>
      
      <p className="text-sm text-ink leading-relaxed">
        لاحظنا إنك محتاج تراجع <span className="font-bold text-accent-text">{weakestSubject}</span> — عندك <span className="font-bold font-latin">{remainingLecturesInSubject}</span> محاضرة متبقية فيها.
      </p>

      <div className="pt-2">
        <Link href={`/courses/${courseId}`}>
          <Button variant="outline" size="sm" className="w-full gap-2 border-accent-500/30 text-accent-text hover:bg-accent-blob/20">
            ابدأ المراجعة الآن
            <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
