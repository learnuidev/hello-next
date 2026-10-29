"use client";

import { useEffect, useRef, useState } from "react";

import { Maximize, Minimize } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The box a feature is shown in.
 *
 * Two things live here. The frame keeps a full-screen sized screen inside a
 * page-sized space: the karaoke view paints its room with `position: fixed`, so
 * a transformed wrapper — which becomes the containing block for fixed children
 * — is what keeps the room in this box instead of over the whole page.
 *
 * And the button in the corner hands the same box to the Fullscreen API, so the
 * one element that changes the layout is the frame and not the app inside it.
 * The button sits inside the frame for that reason: everything outside it is
 * hidden while it is on screen.
 */
export const FeatureFrame = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(document.fullscreenElement === frameRef.current);

    document.addEventListener("fullscreenchange", onChange);

    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!frameRef.current) {
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await frameRef.current.requestFullscreen();
  };

  const label = isFullscreen ? "Exit full screen" : "Full screen";

  return (
    <div className={cn("relative mx-auto w-full max-w-5xl", className)}>
      <div
        ref={frameRef}
        className={cn(
          "relative overflow-y-auto overflow-x-hidden bg-background",
          isFullscreen
            ? "h-screen w-screen"
            : "max-h-[80vh] rounded-xl border border-border",
          // The containing block the karaoke room is confined to.
          "[transform:translateZ(0)]",
        )}
      >
        {/* Fixed rather than absolute: it holds its corner in the frame (and in
            full screen) instead of scrolling away with the content. */}
        <button
          type="button"
          onClick={toggleFullscreen}
          title={label}
          aria-label={label}
          className="fixed bottom-4 right-4 z-[60] flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/85 text-gray-500 backdrop-blur-sm transition hover:text-rose-400 dark:hover:text-white"
        >
          {isFullscreen ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </button>

        {children}
      </div>
    </div>
  );
};
