import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { ContentTranscription } from "@/domain/content/content.api";

import { useGetContentQuery } from "@/domain/content/content.queries";

export const useCurrentTranscription = (id: string) => {
  const { data: content } = useGetContentQuery({ contentId: id });

  const { currentTime: _currentTime = 0, setCurrentTime } = useCurrentTime(
    content.id
  );

  const currentTime = _currentTime;

  const currentTranscription = content?.transcriptions?.find(
    (transcription: any) =>
      transcription?.start <= currentTime && transcription?.end >= currentTime
  ) as ContentTranscription;

  return {
    currentTranscription,
  };
};
