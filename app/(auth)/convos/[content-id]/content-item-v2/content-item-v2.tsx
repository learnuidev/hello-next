import { useGetContentQuery } from "@/domain/content/content.queries";
import { useContentItemParams } from "./hooks/use-content-item-params";
import { YouTubePlayer } from "@/components/youtube-page/youtube-player";
import { AudioPlayer } from "./components/audio-player/audio-player";
import { PlayV2 } from "../../_play-v2/play-v2";

export const ContentItemV2 = () => {
  const { contentId } = useContentItemParams();
  const { data: content } = useGetContentQuery({ contentId });

  if (content?.audio?.includes("https://www.youtube.com")) {
    return <YouTubePlayer lessonId={contentId} />;
  }

  return <PlayV2 contentId={contentId} />;

  // return <AudioPlayer />;
};
