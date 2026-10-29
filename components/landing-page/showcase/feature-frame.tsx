"use client";

import { useEffect, useRef, useState } from "react";

import { Maximize, Minimize } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The box a feature is shown in.
 *
 * The frame keeps a full-screen sized screen inside a page-sized space: the
 * karaoke view paints its room with `position: fixed`, so a transformed wrapper
 * — which becomes the containing block for fixed children — is what keeps the
 * room in this box instead of over the whole page.
 *
 * Going full screen grows the same box to the viewport rather than handing it to
 * the Fullscreen API. The player's settings popover, the collection dialog and
 * the suggestions drawer are all portalled to `document.body`, and while the
 * browser owns the screen everything outside the fullscreen element is hidden —
 * so the controls at the bottom would open nothing anyone could see. A fixed
 * overlay keeps the whole document visible, which is what keeps those controls
 * working.
 */
export const FeatureFrame = ({
  children,
  className,
  minHeight,
  onMeasure,
}: {
  children: React.ReactNode;
  className?: string;
  /**
   * How tall the frame has to be at least, so a short screen does not leave the
   * box smaller than the screen it was standing in for. Measured by the caller
   * off the tallest feature.
   */
  minHeight?: number | null;
  /** Told how tall this screen is, for the caller to take the tallest one. */
  onMeasure?: (height: number) => void;
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const element = contentRef.current;

    if (!element || !onMeasure) {
      return;
    }

    const report = () => onMeasure(element.scrollHeight);

    report();

    const observer = new ResizeObserver(report);

    observer.observe(element);

    return () => observer.disconnect();
  }, [onMeasure]);

  // Full screen is a mode of this frame, so Escape and the page scroll are its
  // to look after.
  useEffect(() => {
    if (!isFullscreen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);

      // Full screen takes the frame out of the flow, which shortens the page
      // and drags the scroll position up to the new end of it. The frame is
      // back in the flow by the next frame, so that is when the page can be
      // put back where it was.
      const scrollTop = scrollRef.current;

      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollTop });
      });
    };
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      scrollRef.current = window.scrollY;
    }

    setIsFullscreen((current) => !current);
  };

  const label = isFullscreen ? "Exit full screen" : "Full screen";

  return (
    <div
      className={cn("relative mx-auto w-full max-w-5xl", className)}
      // While the frame is out of the flow, this holds its place so the page
      // keeps its height (and its scroll position) underneath.
      style={isFullscreen && minHeight ? { minHeight: `${minHeight}px` } : undefined}
    >
      <div
        ref={frameRef}
        style={
          !isFullscreen && minHeight
            ? { minHeight: `${minHeight}px` }
            : undefined
        }
        className={cn(
          "relative overflow-y-auto overflow-x-hidden bg-background",
          isFullscreen
            ? // The same layer as the page's own floating bits (z-50) and later
              // in the document than all of them, so it covers the page; the
              // app's portalled popovers are later still, so they cover it.
              "fixed inset-0 z-50 h-screen w-screen"
            : "max-h-[80vh] rounded-xl border border-border",
          // The containing block the app's fixed layers are confined to.
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

        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};
