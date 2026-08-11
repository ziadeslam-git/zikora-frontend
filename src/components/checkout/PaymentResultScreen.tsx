import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface PaymentResultScreenProps {
  variant: "success" | "pending" | "failed";
  icon: LucideIcon;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  buttonVariant?: "gradient" | "primary" | "outline";
}

/**
 * PaymentResultScreen — Reusable Payment Result Presenter Component (Server Component).
 * Renders centered layout for Success, Pending, and Failed payment confirmation states.
 */
export function PaymentResultScreen({
  variant,
  icon: Icon,
  title,
  description,
  buttonLabel,
  buttonHref,
  buttonVariant = "gradient",
}: PaymentResultScreenProps) {
  return (
    <div className="min-h-[70vh] bg-bg-base text-ink flex items-center justify-center p-6">
      <div className="bg-bg-surface border border-border-theme rounded-3xl p-8 sm:p-12 max-w-md w-full text-center space-y-6 shadow-md">
        {/* Circle Icon */}
        <div
          className={cn(
            "flex h-20 w-20 items-center justify-center rounded-full mx-auto shadow-xs",
            variant === "success" && "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
            variant === "pending" && "bg-amber-500/10 text-amber-500 border border-amber-500/20",
            variant === "failed" && "bg-danger-cta/10 text-danger-cta border border-danger-cta/20",
          )}
        >
          <Icon className="h-10 w-10" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link href={buttonHref} className="w-full inline-block">
            <Button
              variant={buttonVariant}
              size="lg"
              className="w-full font-bold shadow-glow-accent"
            >
              {buttonLabel}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
