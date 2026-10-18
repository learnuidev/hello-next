"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface HorizontalScrollerProps {
  children: React.ReactNode;
  /** Accessible name for the scrollable region. */
  label: string;
  className?: string;
  /** Extra classes for the arrow buttons. */
  arrowClassName?: string;
  scrollLeftLabel?: string;
  scrollRightLabel?: string;
}

/**
 * Netflix-style horizontal row: native swipe/trackpad scrolling with the
 * scrollbar hidden, plus arrow buttons on pointer devices.
 *
 * Arrow visibility is derived from real scroll metrics, so a row that fits on
 * screen never shows controls it cannot use.
 */
export function HorizontalScroller({
  children,
  label,
  className,
  arrowClassName,
  scrollLeftLabel = "向左滚动",
  scrollRightLabel = "向右滚动",
}: HorizontalScrollerProps) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(maxScroll > 4 && el.scrollLeft < maxScroll - 4);
    };

    update();

    // Widths change when the data arrives or the viewport is resized; a
    // ResizeObserver on the container plus a MutationObserver on its children
    // covers both without re-binding listeners on every render.
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(el, { childList: true });

    el.addEventListener("scroll", update, { passive: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;

    // Slightly less than a full viewport, so the card at the edge stays partly
    // visible and the row reads as continuous.
    const amount = Math.max(el.clientWidth * 0.8, 240);

    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const arrowClasses = cn(
    "absolute top-[35%] z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full md:flex",
    "border border-gray-200 bg-white/95 text-gray-600 shadow-md backdrop-blur-sm transition",
    "hover:border-rose-200 hover:text-rose-500",
    "dark:border-gray-800 dark:bg-[#15171d]/95 dark:text-gray-300 dark:hover:border-rose-500/40 dark:hover:text-rose-400",
    "opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40",
    arrowClassName,
  );

  return (
    <div className="group/row relative">
      <div
        ref={scrollerRef}
        role="group"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "flex gap-4 overflow-x-auto scroll-smooth snap-x pb-2",
          "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40",
          // Hide the native scrollbar; the row is meant to be swiped.
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className,
        )}
      >
        {children}
      </div>

      {canScrollLeft ? (
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label={scrollLeftLabel}
          className={cn(arrowClasses, "-left-4")}
        >
          <Icons.arrowLeft className="text-sm" />
        </button>
      ) : null}

      {canScrollRight ? (
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label={scrollRightLabel}
          className={cn(arrowClasses, "-right-4")}
        >
          <Icons.arrowRight className="text-sm" />
        </button>
      ) : null}
    </div>
  );
}
