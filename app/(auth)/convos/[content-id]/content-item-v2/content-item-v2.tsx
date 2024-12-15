import { useGetContentQuery } from "@/domain/content/content.queries";
import { useContentItemParams } from "./hooks/use-content-item-params";
import { YouTubePlayer } from "@/components/youtube-page/youtube-player";
import { AudioPlayer } from "./components/audio-player/audio-player";

export const ContentItemV2 = () => {
  const { contentId } = useContentItemParams();
  const { data: content } = useGetContentQuery({ contentId });

  if (content?.audio?.includes("https://www.youtube.com")) {
    return <YouTubePlayer lessonId={contentId} />;
  }

  return <AudioPlayer />;
};
