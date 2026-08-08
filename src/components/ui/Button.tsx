import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

/**
 * Button — Zikora Design System
 *
 * Variants:
 *   primary  — solid brandOrange (#FC5A05), white text. Default CTA.
 *   gradient — brandGradient bg. SPARINGLY — Hero CTAs only (one per screen max).
 *   outline  — transparent bg, orange border. Secondary actions.
 *   ghost    — no border/bg. Tertiary actions (e.g., header "Login" link).
 *   danger   — red (#EF4444). Destructive actions only.
 *
 * Sizes: sm | md | lg
 * Loading: shows spinner, disables interaction.
 */
const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2 shrink-0",
    "font-semibold rounded-xl",           // rounded-xl = 12px (our "md" radius)
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-orange-500 text-white",
          "hover:bg-orange-600 hover:shadow-md",
          "active:scale-[0.97] active:bg-orange-700",
        ],
        gradient: [
          // Brand gradient — reserved for hero CTAs and the one highlighted card per screen
          "bg-brand-gradient text-white",
          "hover:opacity-90 hover:shadow-glow-orange",
          "active:scale-[0.97]",
        ],
        outline: [
          "border border-orange-500 bg-transparent text-orange-500",
          "hover:bg-orange-50 hover:border-orange-600 hover:text-orange-600",
          "active:scale-[0.97]",
        ],
        ghost: [
          "bg-transparent text-neutral-800",
          "hover:bg-neutral-100 hover:text-orange-500",
          "active:scale-[0.97]",
        ],
        danger: [
          "bg-danger text-white",
          "hover:opacity-90 hover:shadow-md",
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
