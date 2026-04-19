import { useNewConvoStore } from "@/components/step";
import { normalizeYoutubeUrl } from "@/components/summary/parse-youtube-url";
import { useGetVideoByIdQuery } from "@/domain/youtube/get-video-by-id";
import { LangAndContentTypeSelector } from "../components/lang-content-type-selector";
import { YoutubeInput } from "./components/youtube-input";
import { TranscriptionsInput } from "../components/transcriptions-input";
import { UserAssetSelector } from "../components/user-asset-selector";

import { ContentTitleInput } from "../components/content-title-input";
import { BackgroundImageSelector } from "../components/background-image-selector";
import { useListYoutubeTranscriptionsQuery } from "@/domain/youtube/list-youtube-transcriptions";

export const YoutubeFlow = () => {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const newConvo = useNewConvoStore((state) => state.convo) as any;

  const { data: youtubeVideoDetails } = useGetVideoByIdQuery(newConvo?.audio);
  const { data: transcripts } = useListYoutubeTranscriptionsQuery({
    url: newConvo?.audio,
    lang: newConvo?.lang,
  });

  const normalizedUrl = normalizeYoutubeUrl(newConvo?.audio);

  return (
    <div>
      <ContentTitleInput />

      <div className="flex gap-8 flex-col sm:flex-row">
        <div className="w-full">
          <LangAndContentTypeSelector />

          <YoutubeInput />

          <UserAssetSelector assetType="youtube" />
        </div>

        {/* <div className="w-full">
          {youtubeVideoDetails && <ReactPlayer url={normalizedUrl} />}
        </div> */}
      </div>

      <BackgroundImageSelector />

      <TranscriptionsInput />
    </div>
  );
};
