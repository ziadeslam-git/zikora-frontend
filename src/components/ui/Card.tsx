import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Card — Zikora Dual Theme Design System
 *
 * Theme-aware background (bg-bg-surface), border (border-border-theme), and text-ink.
 * Shadow adapts automatically (shadow-sm in light mode, no shadow in dark mode via CSS var).
 */
const cardVariants = cva(
  ["rounded-2xl transition-all duration-200"],
  {
    variants: {
      padding: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      highlighted: {
        false: [
          "bg-bg-surface border border-border-theme text-ink shadow-sm",
          "hover:border-accent-500/40",
        ],
        true: [
          "bg-brand-gradient text-white border-0 shadow-lg shadow-glow-accent",
          "hover:opacity-95",
        ],
      },
    },
    defaultVariants: {
      padding: "md",
      highlighted: false,
    },
  },
);

export type CardVariants = VariantProps<typeof cardVariants>;

export interface CardProps extends CardVariants {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article" | "section";
}

export function Card({
  className,
  padding,
  highlighted = false,
  as: Tag = "div",
  children,
}: CardProps) {
  return (
    <Tag
      className={cn(
        cardVariants({ padding, highlighted: highlighted ?? false }),
        className,
      )}
    >
      {children}
    </Tag>
  );
}
