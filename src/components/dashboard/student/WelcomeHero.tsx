import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface WelcomeHeroProps {
  studentName: string;
  isNewStudent: boolean;
}

export function WelcomeHero({ studentName, isNewStudent }: WelcomeHeroProps) {
  // Simple date formatter (Arabic)
  const today = new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-ink">
          أهلاً، {studentName} 👋
        </h1>
        <p className="text-sm text-text-secondary">{today}</p>
      </div>

      <div className="bg-bg-surface border border-border-theme rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center">
        {isNewStudent ? (
          <div className="flex-1 text-center sm:text-start space-y-2">
            <h2 className="text-lg font-bold text-ink">
              ابدأ رحلتك التعليمية
            </h2>
            <p className="text-sm text-text-secondary">
              لم تبدأ أي كورس بعد. اكتشف المكتبة التعليمية وابدأ أول كورساتك الآن.
            </p>
          </div>
        ) : (
          <>
            <div className="w-full sm:w-32 aspect-video bg-bg-surface-2 rounded-xl shrink-0 relative overflow-hidden flex items-center justify-center border border-border-theme">
              {/* Thumbnail placeholder */}
              <span className="text-xs text-text-secondary">محاضرة 4</span>
            </div>
            
            <div className="flex-1 text-center sm:text-start w-full space-y-3">
              <div>
                <h2 className="text-lg font-bold text-ink truncate">
                  الكيمياء العضوية - أ. سامح إبراهيم
                </h2>
                <p className="text-sm text-text-secondary truncate">
                  المحاضرة 4: مشتقات الهيدروكربونات
                </p>
              </div>
              
              <div className="space-y-1.5 w-full max-w-xs mx-auto sm:mx-0">
                <div className="flex justify-between text-xs text-text-secondary font-latin">
                  <span>60%</span>
                  <span>45:00 / 1:15:00</span>
                </div>
                <div className="h-1.5 w-full bg-border-theme rounded-full overflow-hidden" dir="ltr">
                  <div className="h-full bg-accent-500 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
          {isNewStudent ? (
            <Link href="/courses" className="w-full">
              <Button variant="gradient" className="w-full sm:w-auto shadow-glow-accent !text-white gap-2">
                تصفح الكورسات
                <ArrowLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
              </Button>
            </Link>
          ) : (
            <Link href="/courses/chemistry-organic" className="w-full">
              <Button variant="gradient" className="w-full sm:w-auto shadow-glow-accent !text-white gap-2">
                كمل من هنا
                <ArrowLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
