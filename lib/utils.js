import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes using clsx and tailwind-merge for proper override handling
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
