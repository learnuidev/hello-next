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
}

export function AuthButton({
  loading = false,
  loadingText,
  icon,
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
        "bg-rose-600 text-white shadow-sm hover:bg-rose-500",
        "focus-visible:ring-rose-500/30 disabled:hover:bg-rose-600",
        "disabled:cursor-not-allowed disabled:opacity-70",
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
