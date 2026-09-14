"use client";

import { AutoHideOnIdle } from "@/components/auto-hide-on-idle";
import { cn } from "@/lib/utils";

/**
 * Player controls pinned to the bottom of the viewport. Like a video player's
 * control bar, it slides up when the mouse moves and fades out once the
 * pointer has been idle for a couple of seconds. Below `sm` it stays visible.
 */
export const AudiobookPlayerDock = ({
  children,
  className,
  innerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-50 flex justify-center",
        className,
      )}
    >
      <AutoHideOnIdle className={cn("w-full max-w-4xl", innerClassName)}>
        {children}
      </AutoHideOnIdle>
    </div>
  );
};
