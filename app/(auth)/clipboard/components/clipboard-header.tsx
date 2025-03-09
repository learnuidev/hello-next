/* eslint-disable @next/next/no-img-element */

"use client";

import { languages } from "@/app/next/features/phrase/languages";
import { useClipboardState } from "../hooks/use-clipboard-state";
import { useGetTotalWords } from "../hooks/use-get-total-words";
import { SettingsPopover } from "./settings-popover";

export const ClipboardHeader = () => {
  const totalWords = useGetTotalWords();

  const { setState } = useClipboardState();

  const lang = languages[0];

  return (
    <header className="w-full max-w-4xl sm:pr-0 pr-12 fixed top-0 py-4 z-30 dark:bg-[rgb(9,10,11)]/75 bg-white/75 dark:bg-react/75 backdrop-blur-sm">
      <div className="grid grid-cols-3 justify-between w-full">
        <div></div>
        <div
          className="bg-gray-100 dark:bg-[rgb(23,24,25)] py-[4px] rounded-full justify-self-center"
          onClick={() => {
            setState("");
          }}
        >
          <div className="pr-4 pl-4 py-[2px] w-full flex items-center justify-between space-x-4">
            <img src={lang.src} alt={lang.title} className="h-6 block" />

            <p className="font-bold text-2xl">{totalWords}</p>

            <p className="text-sm">Words</p>
          </div>
        </div>

        <SettingsPopover />
      </div>
    </header>
  );
};
