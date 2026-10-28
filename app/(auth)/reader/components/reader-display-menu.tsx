"use client";

import { AutoHideOnIdle } from "@/components/auto-hide-on-idle";
import { useReadModeState } from "@/components/read-mode-button";
import { PreviewButton } from "@/components/settings-dialog/preview-button";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { usePreviewMode } from "@/components/settings-dialog/use-preview-mode";
import { Icons } from "@/components/ui/icons.v2";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ReaderThemeToggle } from "./reader-theme-toggle";

/**
 * One option of the display menu: a letter in a pill of its own, so the button
 * reads as a row of switches rather than as four letters that happen to sit
 * next to each other. A switch that is on keeps its pill lit.
 *
 * The letters are the same ones the rest of the app's PERC row uses — P for
 * pinyin, E for english, R for read mode, C for chinglish — because they are
 * the same switches: this is the side dock of the reading views, gathered into
 * a menu a phone can reach with a thumb.
 */
const DisplayOption = ({
  active,
  title,
  onClick,
  children,
}: {
  active: boolean;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold leading-none outline-none",
        "transition-all duration-200 focus-visible:ring-1 focus-visible:ring-rose-400/70",
        active
          ? "bg-gray-900 text-white shadow-sm shadow-zinc-900/20 dark:bg-white/[0.15] dark:text-white"
          : "text-gray-400 hover:bg-white hover:text-rose-400 dark:text-gray-500 dark:hover:bg-white/5 dark:hover:text-white",
      )}
    >
      {children}
    </button>
  );
};

/**
 * The display switches of a reading view, in a menu that opens upwards.
 *
 * It sits right before the edit button on a phone, where the floating side dock
 * of the desktop views would be in the way of the text and out of reach of a
 * thumb. The dock itself stays exactly as it is on the wide screen; this is the
 * same set of switches — PERC, then the meta-view preview, then the light/dark
 * switch under it — folded into one pill.
 *
 * It opens above the trigger rather than below it because the trigger is at the
 * top of the page: there is nothing above it to open into but the edge of the
 * screen, and the text it is about is underneath.
 */
export const ReaderDisplayMenu = ({
  variant = "inline",
}: {
  /**
   * `inline` is the one in the header row. `floating` is for the focused view,
   * which has no header of its own: it puts the same menu in the top corner and
   * lets it fade away once the pointer goes idle, the way the docks do.
   */
  variant?: "inline" | "floating";
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { readMode, setReadMode } = useReadModeState();
  const showEn = useBrightModeStore((state) => state.showEn);
  const setShowEn = useBrightModeStore((state) => state.setShowEn);
  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const setShowPinyin = useBrightModeStore((state) => state.setShowPinyin);
  const { showChinglish, setShowChinglish } = useChinglishState();
  const { currentMode } = usePreviewMode();

  // A preview mode of its own means the option has been turned away from the
  // plain one, which is what the lit pill on the right of the row says.
  const isPreviewOn = currentMode?.current !== "normal";

  // One dot per switch of the row inside, in the same order, so the menu says
  // what it holds — and what is on — without being opened.
  const dots = [
    { key: "p", on: showPinyin },
    { key: "e", on: showEn },
    { key: "r", on: readMode },
    { key: "c", on: showChinglish },
  ];

  const menu = (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          title="Reading options"
          className={cn(
            "group flex items-center gap-2 rounded-full border px-3 py-1.5 outline-none",
            "uppercase text-[11px] tracking-wider transition",
            "focus-visible:ring-1 focus-visible:ring-rose-400/70",
            isOpen
              ? "border-rose-400/60 text-rose-400 shadow-lg shadow-rose-400/10 ring-1 ring-rose-400/20 dark:border-gray-600 dark:text-white dark:ring-white/10"
              : "border-gray-200 text-gray-400 hover:border-rose-400/40 hover:text-rose-400 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:text-white",
          )}
        >
          <Icons.gear
            className={cn(
              "text-sm transition-transform duration-300",
              isOpen && "rotate-90",
            )}
          />

          {/* The menu says what it holds without being opened: one dot per
              switch, lit for the ones that are on. */}
          <span className="flex items-center gap-1">
            {dots.map(({ key, on }) => (
              <span
                key={key}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  on
                    ? "bg-rose-400 dark:bg-white"
                    : "bg-gray-300 dark:bg-gray-700",
                )}
              />
            ))}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        aria-label="Reading options"
        className={cn(
          "z-50 w-auto rounded-[1.6rem] border border-gray-200 bg-gray-50/95 p-1.5 backdrop-blur-md",
          "shadow-2xl shadow-zinc-900/30 dark:border-gray-800 dark:bg-black/95",
        )}
      >
        <div className="flex flex-col">
          {/* The four switches, in the order the app's other PERC row puts them
              in: pinyin, english, read mode, chinglish. */}
          <div className="flex items-center">
            <div className="flex items-center gap-0.5">
              <DisplayOption
                active={showPinyin}
                title="Pinyin"
                onClick={() => setShowPinyin(!showPinyin)}
              >
                P
              </DisplayOption>

              <DisplayOption
                active={showEn}
                title="English translation"
                onClick={() => setShowEn(!showEn)}
              >
                E
              </DisplayOption>

              <DisplayOption
                active={readMode}
                title="Read mode"
                onClick={() => setReadMode(!readMode)}
              >
                R
              </DisplayOption>

              <DisplayOption
                active={showChinglish}
                title="Chinglish translation"
                onClick={() => setShowChinglish(!showChinglish)}
              >
                C
              </DisplayOption>
            </div>

            <span className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-800" />

            {/* The preview keeps the button it has everywhere else in the app:
                a tap steps it to the next meta view, and the icon says which
                one it is on. */}
            <span
              title="Meta view"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200",
                isPreviewOn
                  ? "bg-white shadow-sm shadow-zinc-900/20 ring-1 ring-gray-200 dark:bg-white/[0.15] dark:ring-0"
                  : "hover:bg-white/60 dark:hover:bg-white/5",
              )}
            >
              <PreviewButton className="w-auto text-base leading-none" />
            </span>
          </div>

          {/* Under the preview, as in the side dock: the light/dark switch
              changes the room rather than the reading, so it sits below the run
              of switches instead of inside it. */}
          <div className="mt-1 flex items-center justify-between gap-4 border-t border-gray-200/70 px-2 pt-1.5 dark:border-gray-800/70">
            <span className="uppercase text-[10px] tracking-wider text-gray-400">
              Theme
            </span>

            <ReaderThemeToggle className="text-base" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  // Focused read is the one view with no header, so its menu floats where the
  // header would have been and hides itself like the other chrome does.
  if (variant === "floating") {
    return (
      <div className="pointer-events-none fixed right-3 top-3 z-50 sm:hidden">
        <AutoHideOnIdle hiddenOffset={-12}>{menu}</AutoHideOnIdle>
      </div>
    );
  }

  return <div className="sm:hidden">{menu}</div>;
};
