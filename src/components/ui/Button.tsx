import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

/**
 * Button — Zikora Dual Theme Design System
 *
 * Variants:
 *   primary  — solid accent-500, white text. Default CTA.
 *   gradient — brandGradient bg. Hero CTAs & highlighted cards.
 *   outline  — transparent bg, accent border. Secondary actions.
 *   ghost    — no border/bg. Tertiary actions.
 *   danger   — danger-cta background. Destructive actions.
 *
 * Theme-Aware: uses CSS custom properties via Tailwind @theme mapping.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 shrink-0",
    "font-semibold rounded-xl",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-accent-500 text-white",
          "hover:bg-accent-hover hover:shadow-sm",
          "active:scale-[0.97]",
        ],
        gradient: [
          "bg-brand-gradient text-white shadow-glow-accent",
          "hover:opacity-95",
          "active:scale-[0.97]",
        ],
        outline: [
          "border border-accent-500 bg-transparent text-accent-500",
          "hover:bg-bg-surface-2 hover:border-accent-hover hover:text-accent-hover",
          "active:scale-[0.97]",
        ],
        ghost: [
          "bg-transparent text-ink",
          "hover:bg-bg-surface-2 hover:text-accent-500",
          "active:scale-[0.97]",
        ],
        danger: [
          "bg-danger-cta text-white",
          "hover:opacity-90 hover:shadow-sm",
          "active:scale-[0.97]",
        ],
      },
      size: {
        sm: "h-8  px-4  text-sm",
        md: "h-10 px-5  text-sm",
        lg: "h-12 px-6  text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  /** Shows a spinner and disables the button. Used for async actions. */
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled ?? loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

export { buttonVariants };
