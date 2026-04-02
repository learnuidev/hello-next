import { getActiveTranscriptions } from "@/components/youtube-page/get-active-transcriptions";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { useMemo } from "react";

export const useGetGroupedTranscriptions = ({
  loop,
  currentTime,
  content,
}: {
  content: IContent;
  currentTime: number;
  loop?: ContentTranscription;
}) => {
  const _currentTime = loop ? loop.start : currentTime;

  const active = usePlayerViewModeStore((state) => state.active);

  const group = useMemo(() => {
    return getActiveTranscriptions({
      limit: active,
      currentTime: _currentTime,
      transcriptions: content?.transcriptions || [],
    });
  }, [active, currentTime, content?.transcriptions]);

  return group;
};
