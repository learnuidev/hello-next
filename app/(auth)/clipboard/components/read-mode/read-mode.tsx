import { cn } from "@/lib/utils";

import { ReadModeHeader } from "./components/read-mode-header";
import { ReadModeItem } from "./components/read-mode-item";

import { useClipboardSentenceView } from "../../hooks/use-clipboard-sentence-view";
import { useClipboardState } from "../../hooks/use-clipboard-state";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useMemo } from "react";

export function ReadMode({ lang }: { lang: string }) {
  const { sentenceView } = useClipboardSentenceView();
  const { state } = useClipboardState();

  const sentencesList = useMemo(() => {
    return state.split("\n").filter(Boolean);
  }, [state]);

  return (
    <div className="my-32 relative">
      {sentenceView && <ReadModeHeader />}

      <div
        className={cn(
          "overflow-y-auto mb-24  text-2xl font-light dark:text-gray-200 block w-full outline-none resize-none bg-inherit overflow-hidden h-[881px]",
          sentenceView && "mt-80"
        )}
      >
        <div className="space-y-8 mt-32">
          {sentencesList.map((item: any, sentenceIndex: number) => {
            return (
              <ReadModeItem
                sentenceIndex={sentenceIndex}
                key={`${item}-${sentenceIndex}-read-mode`}
                text={item}
                lang={lang}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
