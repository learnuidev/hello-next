"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import * as React from "react";

export interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  /** Text shown while the request is in flight. */
  loadingText?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

const variantStyles = {
  primary:
    "bg-rose-600 text-white shadow-sm hover:bg-rose-500 focus-visible:ring-rose-500/30 disabled:hover:bg-rose-600",
  secondary:
    "border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:ring-gray-400/30 dark:border-gray-800 dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-800/60",
  ghost:
    "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400/30 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-gray-100",
};

export function AuthButton({
  loading = false,
  loadingText,
  icon,
  variant = "primary",
  className,
  children,
  disabled,
  ...props
}: AuthButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold transition",
        "focus-visible:outline-none focus-visible:ring-4",
        "disabled:cursor-not-allowed disabled:opacity-70",
        variantStyles[variant],
        className,
      )}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          <span>{loadingText ?? children}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          {icon ? <span aria-hidden>{icon}</span> : null}
        </>
      )}
    </button>
  );
}
