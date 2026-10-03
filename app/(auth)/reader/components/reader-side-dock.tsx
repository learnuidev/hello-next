"use client";

import { AutoHideOnIdle } from "@/components/auto-hide-on-idle";
import { PinyinButton } from "@/components/pinyin-button";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { ReadModeButton } from "@/components/read-mode-button";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

import { useReaderTranslateStore } from "../hooks/use-reader-translate";

/**
 * The switches of the reader, as a bar of their own floating against the middle
 * of the right edge so they sit next to the text rather than under it.
 *
 * Read mode, pinyin and — while reading line by line, where a translation is
 * worth having — Translate, which asks the app what the line on screen means
 * and then hands over the C (chinglish) and E (english) switches for it.
 *
 * It behaves exactly like the docks at the bottom of the app: visible while you
 * are moving around, fading away once the pointer goes idle, back on the next
 * movement, and it never takes a click while it is out of the way.
 */
export const ReaderSideDock = ({ showTranslate }: { showTranslate: boolean }) => {
  const showEn = useBrightModeStore((state) => state.showEn);
  const setShowEn = useBrightModeStore((state) => state.setShowEn);
  const { showChinglish, setShowChinglish } = useChinglishState();

  const translateOn = useReaderTranslateStore((state) => state.translateOn);
  const translation = useReaderTranslateStore((state) => state.translation);
  const isLoading = useReaderTranslateStore((state) => state.isLoading);
  const toggleTranslate = useReaderTranslateStore(
    (state) => state.toggleTranslate,
  );

  return (
    <div className="pointer-events-none fixed right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-50">
      {/* A side bar has nothing to slide up from, so it simply fades. */}
      <AutoHideOnIdle hiddenOffset={0}>
        <div className="flex flex-col items-center px-3 py-5 bg-gray-50 dark:bg-black no-underline relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6">
          <div className="flex flex-col items-center space-y-6">
            {showTranslate && (
              <button
                title={
                  translateOn ? "Hide the translation" : "Translate this line"
                }
                onClick={toggleTranslate}
                className={cn(
                  "transition text-xl",
                  translateOn
                    ? "text-gray-800 dark:text-white"
                    : "text-gray-500 hover:text-rose-400 dark:hover:text-white",
                )}
              >
                {translateOn && isLoading ? (
                  <Icons.spinner className="animate-spin" />
                ) : (
                  <Icons.language />
                )}
              </button>
            )}

            {/* Nothing to switch between until the line has come back
                translated. English and chinglish are two readings of the same
                translation, so they take turns in the one slot. */}
            {showTranslate && !!translation && (
              <>
                <button
                  title="Chinglish"
                  onClick={() => {
                    const next = !showChinglish;

                    setShowChinglish(next);

                    if (next) {
                      setShowEn(false);
                    }
                  }}
                  className={cn(
                    "transition text-xl",
                    showChinglish
                      ? "text-gray-800 dark:text-white"
                      : "text-gray-500 hover:text-rose-400 dark:hover:text-white",
                  )}
                >
                  C
                </button>

                <button
                  title="English"
                  onClick={() => {
                    const next = !showEn;

                    setShowEn(next);

                    if (next) {
                      setShowChinglish(false);
                    }
                  }}
                  className={cn(
                    "transition text-xl",
                    showEn
                      ? "text-gray-800 dark:text-white"
                      : "text-gray-500 hover:text-rose-400 dark:hover:text-white",
                  )}
                >
                  E
                </button>
              </>
            )}

            <PinyinButton className="text-xl" />
            <ReadModeButton className="text-xl" />
          </div>
        </div>
      </AutoHideOnIdle>
    </div>
  );
};
