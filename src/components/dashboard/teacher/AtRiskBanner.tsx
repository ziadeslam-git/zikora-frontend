import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BulkReminderButton } from "@/components/dashboard/teacher/BulkReminderButton";

interface AtRiskBannerProps {
  atRiskCount: number;
}

export function AtRiskBanner({ atRiskCount }: AtRiskBannerProps) {
  if (atRiskCount <= 0) return null;

  return (
    <div className="bg-danger/5 border border-danger/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-danger" />
        </div>
        <div>
          <h3 className="font-bold text-danger text-sm sm:text-base">
            ⚠️ {atRiskCount} طلاب محتاجين متابعة دلوقتي
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            طلاب متوسط درجاتهم أقل من 60% أو لم يتفاعلوا منذ أكثر من أسبوعين.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-danger border-danger/30 hover:bg-danger/5 shrink-0">
          شوف التفاصيل
        </Button>
        <BulkReminderButton />
      </div>
    </div>
  );
}
