import { cn } from "@/lib/utils";

import { getHeightClass } from "../../../convos/play-v3/utils/get-height-class";
import { ReadModeHeader } from "./components/read-mode-header";
import { ReadModeItem } from "./components/read-mode-item";
import { useReadModeStore } from "./hooks/use-readmode-store";

import { useClipboardFocus } from "../../hooks/use-clipboard-focus";
import { useClipboardState } from "../../hooks/use-clipboard-state";
import { useClipboardPinyinView } from "../../hooks/use-clipboard-pinyin-view";

export function ReadMode({
  setWords,
  translations,
  setTranslations,
  sentenceView,
  setSentenceView,
  hskView,
  setHskView,
}: any) {
  const selected = useReadModeStore((state) => state.selected);

  const { pinyinView, setPinyinView } = useClipboardPinyinView();

  const { focused } = useClipboardFocus();

  const { state } = useClipboardState();

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
                  // setFocusedWord={setFocusedWord}

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
