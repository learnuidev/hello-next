import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { TranscriptItem } from "@/components/youtube-page/youtube-transcript-item";
import { IContent } from "@/domain/content/content.api";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useMemo } from "react";

export const TranscriptListView = ({
  content,
  contentId,
  currentTime,
  playerRef,
}: {
  content: IContent;
  contentId: string;
  currentTime: number;
  playerRef: any;
}) => {
  const focusMode = usePlayerViewModeStore((state) => state.focusMode);
  const isVideoHidden = usePlayerViewModeStore((state) => state.isVideoHidden);

  const _toggleLoops = usePlayerViewModeStore((state) => state.toggleLoops);
  const toggleLoops = useMemo(
    () => _toggleLoops?.filter((loop: any) => loop?.contentId === contentId),
    [_toggleLoops, contentId],
  );
  const setToggleLoops = usePlayerViewModeStore(
    (state) => state.setToggleLoops,
  );

  const { data: learnedCharacters } = useListComponents();

  const transcriptions = content?.transcriptions || [];

  const filteredTranscriptions = transcriptions;

  return (
    <div className="px-4 pb-24 max-w-4xl">
      <ScrollArea className="space-y-4 h-[400px] sm:h-[640px] w-full rounded-md shadow-lg dark:shadow-gray-900 p-0 pb-16">
        <div className="sm:space-y-8 w-full">
          {filteredTranscriptions
            .filter((script: any) => {
              if (focusMode) {
                return (
                  (script?.timestamp?.[0] || script?.start) < currentTime &&
                  (script?.timestamp?.[1] || script?.end) > currentTime
                );
              }

              return true;
            })
            .map((transcription: any, idx: any) => {
              return (
                <TranscriptItem
                  example={transcription}
                  key={`${transcription?.id}-${idx}`}
                  toggleLoops={toggleLoops}
                  setToggleLoops={setToggleLoops}
                  currentTime={currentTime}
                  focusMode={focusMode}
                  isVideoHidden={isVideoHidden}
                  playerRef={playerRef}
                  learnedCharacters={learnedCharacters}
                  contentId={contentId}
                />
              );
            })}
        </div>
      </ScrollArea>
    </div>
  );
};
