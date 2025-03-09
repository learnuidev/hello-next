import { cn } from "@/lib/utils";
import { useState } from "react";
import { getHeightClass } from "../../convos/play-v3/utils/get-height-class";
import { ReadModeHeader } from "./read-mode-header";
import { ReadModeItem } from "./read-mode-item";

export function ReadMode({
  state,
  setWords,
  translations,
  setTranslations,
  focused,
  setFocused,
  pinyinView,
  setPinyinView,
  sentenceView,
  setSentenceView,
  hskView,
  setHskView,
}: any) {
  const [selected, setFocusedWord] = useState<any>(null);
  const currentTranslation = translations?.[focused];

  const height = getHeightClass(currentTranslation?.output?.length);
  return (
    <div className="my-32 relative">
      {sentenceView && (
        <ReadModeHeader
          selected={selected}
          currentTranslation={currentTranslation}
          height={height}
        />
      )}

      <div
        className={cn(
          "overflow-y-auto mb-24  text-2xl font-light dark:text-gray-200 block w-full outline-none resize-none bg-inherit overflow-hidden h-[881px]",
          sentenceView && "mt-80"
        )}
      >
        <div className="space-y-8">
          {state
            .split("\n")
            .filter(Boolean)
            .map((item: any) => {
              return (
                <ReadModeItem
                  focusedWord={selected}
                  setFocusedWord={setFocusedWord}
                  focused={focused}
                  setFocused={setFocused}
                  translations={translations}
                  setTranslations={setTranslations}
                  setWords={setWords}
                  key={item}
                  text={item}
                  pinyinView={pinyinView}
                  setPinyinView={setPinyinView}
                  sentenceView={sentenceView}
                  setSentenceView={setSentenceView}
                  hskView={hskView}
                  setHskView={setHskView}
                  state={state}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
