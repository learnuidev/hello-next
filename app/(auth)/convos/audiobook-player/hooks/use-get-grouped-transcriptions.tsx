import { getActiveTranscriptions } from "@/components/youtube-page/get-active-transcriptions";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { useMemo } from "react";

export const useGetGroupedTranscriptions = ({
  groupBy = "time",
  loop,
  currentTime,
  content,
}: {
  groupBy?: "time" | "length";
  content: IContent;
  currentTime: number;
  loop?: ContentTranscription;
}) => {
  const _currentTime = loop ? loop.start : currentTime;

  const active = usePlayerViewModeStore((state) => state.active);

  const group = useMemo(() => {
    return getActiveTranscriptions({
      groupBy,
      timeLimit: active,
      lengthLimit: 5,
      currentTime: _currentTime,
      transcriptions: content?.transcriptions || [],
    });
  }, [active, currentTime, content?.transcriptions]);

  return group;
};
