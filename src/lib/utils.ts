import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — Tailwind class merger utility (shadcn/ui pattern).
 *
 * Combines clsx (conditional classes) with tailwind-merge (conflict resolution).
 * Example: cn("px-4 py-2", isActive && "bg-primary", "px-6") → "py-2 bg-primary px-6"
 * tailwind-merge ensures conflicting classes (px-4 vs px-6) resolve correctly.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
