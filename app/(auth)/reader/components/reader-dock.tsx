"use client";

import { TheDock } from "@/components/the-dock";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { ReaderViewMode } from "../reader.types";

const VIEW_MODES: { id: ReaderViewMode; title: string; Icon: any }[] = [
  { id: "read", title: "Read", Icon: Icons.bookOpen },
  { id: "dynocloze", title: "Dynocloze", Icon: Icons.play },
  { id: "focused", title: "Focused read", Icon: Icons.glassesRound },
  { id: "stats", title: "Stats", Icon: Icons.chartColumn },
  { id: "list", title: "Reading list", Icon: Icons.bookmark },
];

/**
 * The reader's own bar, sitting where every other dock in the app does: it
 * fades and sinks away once the pointer goes idle and comes back on the next
 * movement (see `TheDock`).
 *
 * It carries the views of a text, and — once something has been picked out of
 * the text — the button that files it into the reading list. Read mode and
 * pinyin live in their own dock on the right, see `ReaderSideDock`.
 */
export const ReaderDock = ({
  viewMode,
  onViewModeChange,
  selectionCount,
  onSaveSelection,
}: {
  viewMode: ReaderViewMode;
  onViewModeChange: (viewMode: ReaderViewMode) => void;
  selectionCount: number;
  onSaveSelection: () => void;
}) => {
  return (
    <TheDock className="bottom-2" innerClassName="sm:block">
      <div className="flex items-center w-full justify-center">
        <div className="overflow-y-auto px-4 sm:px-6 py-2 bg-gray-50 dark:bg-black no-underline relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6">
          <div className="space-x-5 md:space-x-8 flex justify-center items-center w-full">
            <Link
              href="/reader"
              title="All texts"
              className="text-gray-500 hover:text-rose-400 dark:hover:text-white transition text-xl"
            >
              <Icons.rectangleHistory />
            </Link>

            {VIEW_MODES.map(({ id, title, Icon }) => (
              <button
                key={id}
                title={title}
                onClick={() => {
                  onViewModeChange(id);
                }}
                className={cn(
                  "transition text-xl",
                  viewMode === id
                    ? "text-gray-800 dark:text-white"
                    : "text-gray-500 hover:text-rose-400 dark:hover:text-white",
                )}
              >
                <Icon />
              </button>
            ))}

            {selectionCount > 0 && (
              <button
                title="Save selection to the reading list"
                onClick={onSaveSelection}
                className="text-rose-400 hover:text-rose-300 transition text-xl"
              >
                <Icons.bookmarkSolid />
                <span className="ml-1 text-xs">{selectionCount}</span>
              </button>
            )}

          </div>

          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </div>
      </div>
    </TheDock>
  );
};
