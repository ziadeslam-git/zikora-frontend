import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Card — Zikora Design System
 *
 * Default: white (#F9F9F9) background, rounded-2xl (16px), soft shadow.
 *
 * `highlighted` prop (boolean):
 *   When true → applies brandGradient background with white text.
 *   ⚠️  RULE: Maximum ONE highlighted card per screen/section.
 *   Overusing highlighted breaks the "hero" visual effect (Finexy mistake).
 *
 * `padding` prop: "sm" | "md" | "lg"
 */
const cardVariants = cva(
  // Base: every card shares these
  ["rounded-2xl transition-shadow duration-200"],
  {
    variants: {
      padding: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      highlighted: {
        false: [
          "bg-base-white border border-neutral-200 shadow-sm",
          "hover:shadow-md",
        ],
        true: [
          "bg-brand-gradient text-white border-0 shadow-lg",
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
  /** Use as a regular HTML div or article */
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
