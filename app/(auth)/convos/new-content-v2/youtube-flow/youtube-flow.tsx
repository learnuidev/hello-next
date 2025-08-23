import { useNewConvoStore } from "@/components/step";
import { normalizeYoutubeUrl } from "@/components/summary/parse-youtube-url";
import { useGetVideoByIdQuery } from "@/domain/youtube/get-video-by-id";
import { LangAndContentTypeSelector } from "../components/lang-content-type-selector";
import { YoutubeInput } from "./components/youtube-input";
import { YoutubeTranscriptionsInput } from "./components/youtube-transcriptions-input";

export const YoutubeFlow = () => {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const newConvo = useNewConvoStore((state) => state.convo) as any;

  const { data: youtubeVideoDetails } = useGetVideoByIdQuery(newConvo?.audio);

  const normalizedUrl = normalizeYoutubeUrl(newConvo?.audio);

  return (
    <div>
      <div className="flex gap-8 flex-col sm:flex-row">
        <div className="w-full">
          <LangAndContentTypeSelector />

          <YoutubeInput />
        </div>

        {/* <div className="w-full">
          {youtubeVideoDetails && <ReactPlayer url={normalizedUrl} />}
        </div> */}
      </div>

      <YoutubeTranscriptionsInput />
    </div>
  );
};
