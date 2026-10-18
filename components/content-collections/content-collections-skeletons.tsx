"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Loading placeholders for the collections tab.
 *
 * They mirror the poster cards and the horizontal shelf they sit in, so the
 * row does not jump when the data arrives. Every collection section loads its
 * items independently, so each one shows its own placeholder row instead of a
 * spinner.
 */

/** Shared card width — keep in sync with `CollectionContentCard`. */
export const collectionCardWidthClassName =
  "w-[12rem] sm:w-[14rem] flex-shrink-0";

/**
 * Skeleton fill. The stock `bg-muted` is too close to the card surface in both
 * themes, so the pulse needs an explicit tone to stay visible.
 */
function Bone({ className }: { className?: string }) {
  return (
    <Skeleton className={cn("bg-gray-200/80 dark:bg-gray-800/80", className)} />
  );
}

/**
 * One placeholder card. The real card is a square cover with an overlay that
 * only appears on hover, so the placeholder is a square tile too.
 */
export function CollectionCardSkeleton() {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-lg shadow",
        "bg-white ring-1 ring-gray-200/80 dark:bg-[rgb(16,17,21)] dark:ring-white/[0.07]",
        collectionCardWidthClassName,
      )}
    >
      <Bone className="absolute inset-0 rounded-none" />
    </div>
  );
}

/**
 * A horizontal row of placeholder cards, clipped at the edge exactly like the
 * real shelf. Announced to assistive tech as a busy region while keeping the
 * decorative pulses out of the accessibility tree.
 */
export function CollectionCardsSkeleton({
  count = 4,
  label = "正在加载收藏内容…",
}: {
  count?: number;
  label?: string;
}) {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">{label}</span>
      <div aria-hidden className="flex gap-4 overflow-hidden pb-2">
        {Array.from({ length: count }).map((_, index) => (
          <CollectionCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

/** Placeholder for a whole section: collection header, then its row. */
export function CollectionSectionSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <section className="mb-14">
      <div aria-hidden className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <Bone className="h-9 w-9 rounded-full flex-shrink-0" />
          <Bone className="h-5 w-40 max-w-[50%] rounded" />
          <Bone className="h-3.5 w-12 flex-shrink-0 rounded" />
        </div>
        <Bone className="h-4 w-4 rounded-sm flex-shrink-0" />
      </div>

      <CollectionCardsSkeleton count={cards} />
    </section>
  );
}

/** Placeholder for the whole tab, shown until the collection list resolves. */
export function ContentCollectionsSkeleton({
  sections = 2,
  cards = 4,
}: {
  sections?: number;
  cards?: number;
}) {
  return (
    <div>
      <span className="sr-only">正在加载收藏集…</span>
      {Array.from({ length: sections }).map((_, index) => (
        <CollectionSectionSkeleton key={index} cards={cards} />
      ))}
    </div>
  );
}
