"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import * as React from "react";

type AuthAlertVariant = "error" | "success" | "info";

export interface AuthAlertProps {
  variant?: AuthAlertVariant;
  children: React.ReactNode;
  className?: string;
  /** Rendered as a trailing action, e.g. a "Resend" button. */
  action?: React.ReactNode;
}

const variantStyles: Record<
  AuthAlertVariant,
  { wrapper: string; icon: React.ReactNode }
> = {
  error: {
    wrapper:
      "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/25 dark:bg-rose-500/10 dark:text-rose-300",
    icon: <AlertCircle className="h-4 w-4 shrink-0" />,
  },
  success: {
    wrapper:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300",
    icon: <CheckCircle2 className="h-4 w-4 shrink-0" />,
  },
  info: {
    wrapper:
      "border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-300",
    icon: <Info className="h-4 w-4 shrink-0" />,
  },
};

export function AuthAlert({
  variant = "error",
  children,
  className,
  action,
}: AuthAlertProps) {
  const styles = variantStyles[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={cn(
        "flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-[13px] leading-snug",
        styles.wrapper,
        className,
      )}
    >
      <span className="mt-px">{styles.icon}</span>
      <div className="flex-1 space-y-1">{children}</div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
