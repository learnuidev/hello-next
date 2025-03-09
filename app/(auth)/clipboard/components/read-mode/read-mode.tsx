import { cn } from "@/lib/utils";

import { ReadModeHeader } from "./components/read-mode-header";
import { ReadModeItem } from "./components/read-mode-item";

import { useClipboardSentenceView } from "../../hooks/use-clipboard-sentence-view";
import { useClipboardState } from "../../hooks/use-clipboard-state";

export function ReadMode() {
  const { sentenceView } = useClipboardSentenceView();
  const { state } = useClipboardState();

  return (
    <div className="my-32 relative">
      {sentenceView && <ReadModeHeader />}

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
              return <ReadModeItem key={item} text={item} />;
            })}
        </div>
      </div>
    </div>
  );
}
