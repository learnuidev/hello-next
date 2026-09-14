"use client";

import { AutoHideOnIdle } from "@/components/auto-hide-on-idle";
import { cn } from "@/lib/utils";
import React from "react";

/**
 * The floating bars (main navbar, character navbar, cloze dock, ...).
 *
 * They sit pinned to the bottom of the viewport and behave exactly like the
 * audiobook player dock: visible while you are moving around, then they fade
 * and sink away once the pointer goes idle — and come straight back on the
 * next movement. Resting the pointer on them, or focusing them with the
 * keyboard, keeps them up; on touch screens (below `sm`) they stay put.
 *
 * The behaviour is unconditional, matching the player dock. `isAutomatic` is
 * still accepted so existing call sites keep working, but the bars no longer
 * sit there permanently when a preference says otherwise.
 */
export const TheDock = ({
  children,
  innerClassName,
  className,
}: {
  children?: React.ReactNode;
  innerClassName?: string;
  className?: string;
  /** Accepted for backwards compatibility; the bars always auto-hide now. */
  isAutomatic?: boolean;
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-50 flex justify-center",
        className ?? "bottom-2",
      )}
    >
      {/* AutoHideOnIdle owns pointer events: interactive while shown,
          click-through once it has sunk away. */}
      <AutoHideOnIdle className={cn("w-full", innerClassName)}>
        {children}
      </AutoHideOnIdle>
    </div>
  );
};
