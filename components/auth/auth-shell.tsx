"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import * as React from "react";

interface AuthShellProps {
  /** Small uppercase word above the title, e.g. "Welcome back". */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  /** Rendered below the card, usually a "switch account" link. */
  footer?: React.ReactNode;
  /** Width of the card. Confirmation steps look better slightly narrower. */
  size?: "default" | "compact";
}

/**
 * Shared chrome for the login / register screens: a soft rose glow on the page,
 * a single elevated card, and a consistent brand mark.
 *
 * The page itself supplies the base background colour (`bg`), so the glow here
 * fades to transparent and never leaves a visible edge.
 */
export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
  size = "default",
}: AuthShellProps) {
  return (
    <div className="relative isolate flex min-h-[calc(100vh-6rem)] w-full items-center justify-center overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[380px] w-[min(100%,620px)] -translate-x-1/2 rounded-full bg-rose-500/[0.07] blur-[120px] dark:bg-rose-600/10"
      />

      <div className="flex w-full max-w-lg flex-col items-center">
        <div
          className={cn(
            "w-full rounded-2xl border border-gray-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_40px_-16px_rgba(16,24,40,0.16)]",
            "dark:border-gray-800 dark:bg-[#0f1117] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_16px_40px_-16px_rgba(0,0,0,0.7)]",
            size === "compact" ? "max-w-sm" : "max-w-md",
          )}
        >
          <div className="flex flex-col items-center px-6 pt-8 text-center sm:px-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20">
              <Icons.mandarin className="text-xl" />
            </div>

            {eyebrow ? (
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-600 dark:text-rose-400">
                {eyebrow}
              </p>
            ) : null}

            <h1 className="mt-2 text-[26px] font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-50">
              {title}
            </h1>

            {description ? (
              <p className="mt-2.5 max-w-[19rem] text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {description}
              </p>
            ) : null}
          </div>

          <div className="px-6 pb-8 pt-7 sm:px-8">{children}</div>
        </div>

        {footer ? (
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
