import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge — Zikora Design System
 *
 * Used for status indicators, labels, and tags.
 * Semantic variants only (success / danger / warning).
 *
 * ⚠️  Warning badge is visually close to brand orange (#FC5A05).
 *     Always accompany with an explicit warning icon — never color alone.
 */
const badgeVariants = cva(
  [
    "inline-flex items-center gap-1",
    "rounded-full px-2.5 py-0.5",
    "text-xs font-semibold",
    "border",
  ],
  {
    variants: {
      variant: {
        success: [
          "bg-green-50 text-success border-green-200",
        ],
        danger: [
          "bg-red-50 text-danger border-red-200",
        ],
        warning: [
          "bg-amber-50 text-warning border-amber-200",
        ],
        /** Neutral — for non-status tags (e.g., course categories) */
        default: [
          "bg-neutral-100 text-neutral-700 border-neutral-200",
        ],
        /** Brand — for featured/promoted items */
        brand: [
          "bg-orange-100 text-orange-600 border-orange-200",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

export interface BadgeProps extends BadgeVariants {
  className?: string;
  children: React.ReactNode;
}

export function Badge({ className, variant, children }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  );
}

export { badgeVariants };
