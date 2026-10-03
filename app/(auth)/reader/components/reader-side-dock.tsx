"use client";

import { ReadModeButton } from "@/components/read-mode-button";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { AutoHideOnIdle } from "@/components/auto-hide-on-idle";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

/**
 * The display switches of the reader — read mode and pinyin — as a bar of their
 * own, floating against the middle of the right edge so they sit next to the
 * text rather than under it.
 *
 * It behaves exactly like the docks at the bottom of the app: visible while you
 * are moving around, fading away once the pointer goes idle, back on the next
 * movement, and it never takes a click while it is out of the way.
 */
export const ReaderSideDock = () => {
  // The app's own pinyin preference: switching it here switches it for the
  // reader's views and for the character grids elsewhere in the app.
  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const setShowPinyin = useBrightModeStore((state) => state.setShowPinyin);

  return (
    <div className="pointer-events-none fixed right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-50">
      {/* A side bar has nothing to slide up from, so it simply fades. */}
      <AutoHideOnIdle hiddenOffset={0}>
        <div className="flex flex-col items-center px-3 py-5 bg-gray-50 dark:bg-black no-underline relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6">
          <div className="flex flex-col items-center space-y-6">
            <button
              title={showPinyin ? "Hide pinyin" : "Show pinyin"}
              onClick={() => {
                setShowPinyin(!showPinyin);
              }}
              className={cn(
                "transition text-xl",
                showPinyin
                  ? "text-gray-800 dark:text-white"
                  : "text-gray-500 hover:text-rose-400 dark:hover:text-white",
              )}
            >
              <Icons.language />
            </button>

            <ReadModeButton className="text-xl" />
          </div>
        </div>
      </AutoHideOnIdle>
    </div>
  );
};
