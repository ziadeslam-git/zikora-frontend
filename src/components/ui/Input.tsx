"use client";

import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import type { InputHTMLAttributes } from "react";

/**
 * Input — Zikora Design System
 *
 * Features:
 *   - rounded-lg (8px) border
 *   - Focus ring in brandOrange (#FC5A05)
 *   - Optional label (renders above the input)
 *   - Optional helperText (renders below in neutral-600)
 *   - Optional error (renders below in danger red + error icon + red border)
 *
 * "use client" because it wraps a controlled/uncontrolled HTML input
 * that needs to be hydrated correctly in React 19.
 *
 * React 19 compatible — ref passed as a direct prop (no forwardRef wrapper).
 */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  /** Full-width by default. Set to false for inline usage. */
  fullWidth?: boolean;
  /** Ref forwarded to the underlying <input> element */
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({
  label,
  helperText,
  error,
  fullWidth = true,
  className,
  id,
  ref,
  ...props
}: InputProps) {
  const inputId = id ?? (label ? `input-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);

  return (
    <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-neutral-800"
        >
          {label}
          {props.required && (
            <span className="text-danger ms-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Input element */}
      <input
        id={inputId}
        ref={ref}
        className={cn(
          // Base styles
          "w-full rounded-lg border bg-base-white px-3 py-2.5",
          "text-sm text-ink placeholder:text-neutral-400",
          "transition-all duration-150",
          // Focus ring — brandOrange
          "outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
          // Normal state border
          "border-neutral-200 hover:border-neutral-300",
          // Error state
          error && "border-danger focus:border-danger focus:ring-danger/20",
          // Disabled
          "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400",
          className,
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={
          error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        {...props}
      />

      {/* Error message */}
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-danger"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="text-xs text-neutral-600">
          {helperText}
        </p>
      )}
    </div>
  );
}
