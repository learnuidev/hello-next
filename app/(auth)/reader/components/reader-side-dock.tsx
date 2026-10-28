"use client";

import { AutoHideOnIdle } from "@/components/auto-hide-on-idle";
import { ChinglishButton } from "@/components/chinglish-button";
import { EnButton } from "@/components/en-button";
import { PinyinButton } from "@/components/pinyin-button";
import { PreviewButton } from "@/components/settings-dialog/preview-button";
import { ReadModeButton } from "@/components/read-mode-button";

import { useReaderTranslateAnswer } from "../hooks/use-reader-translate";
import { ReaderThemeToggle } from "./reader-theme-toggle";

/**
 * The switches of the reader, as a bar of their own floating against the middle
 * of the right edge so they sit next to the text rather than under it.
 *
 * Read mode, pinyin, and — while reading line by line, where a translation is
 * worth having — the E (english) and C (chinglish) switches, which show the
 * translation of the line on screen. They are the same four buttons as the
 * app's other PERC row, in the same order: pinyin, english, read mode,
 * chinglish.
 *
 * It is the wide screen's copy of the reader's switches: a phone gets the same
 * set folded into one menu, right before the edit button, because a bar against
 * the right edge is both in the way of the text and out of reach of a thumb
 * there (see `ReaderDisplayMenu`). The preview button below them steps through
 * the meta views rather than turning anything on.
 *
 * There is no button to ask for that translation: the reader asks about the line
 * it puts in the middle of the frame by itself (see `use-reader-translation`),
 * so the switches are simply there by the time a line has an answer.
 *
 * It behaves exactly like the docks at the bottom of the app: visible while you
 * are moving around, fading away once the pointer goes idle, back on the next
 * movement, and it never takes a click while it is out of the way.
 */
export const ReaderSideDock = ({
  showTranslate,
}: {
  showTranslate: boolean;
}) => {
  const { translation } = useReaderTranslateAnswer();

  return (
    <div className="pointer-events-none fixed right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 hidden sm:block">
      {/* A side bar has nothing to slide up from, so it simply fades. */}
      <AutoHideOnIdle hiddenOffset={0}>
        <div className="flex flex-col items-center px-3 py-5 bg-gray-50 dark:bg-black no-underline relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6">
          <div className="flex flex-col items-center space-y-6">
            {/* The four switches, in the order the app's other PERC row puts
                them in: pinyin, english, read mode, chinglish. English and
                chinglish are two readings of the same line, and both can be on
                at once: english shows first, chinglish on its own line below
                it. */}
            <PinyinButton className="text-xl" />
            <EnButton className="text-xl" />
            <ReadModeButton className="text-xl" />
            <ChinglishButton className="text-xl" />

            {/* The meta view preview keeps its place under the switches: it is
                not one of them — a tap steps it to the next view rather than
                turning it on — so it sits below them, out of the run of PERC.
                The light/dark switch is under it for the same reason: it
                changes the room, not the reading. */}
            <PreviewButton className="text-xl" />
            <ReaderThemeToggle className="text-xl" />
          </div>
        </div>
      </AutoHideOnIdle>
    </div>
  );
};
