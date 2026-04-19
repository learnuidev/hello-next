// allow users to upload audio

import { useNewConvoStore } from "@/components/step";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { LangAndContentTypeSelector } from "../components/lang-content-type-selector";
import { ContentTitleInput } from "../components/content-title-input";
import { VideoPreview } from "./components/video-preview";
import { TranscriptionsInput } from "../components/transcriptions-input";
import { BackgroundImageSelector } from "../components/background-image-selector";

export const VideoFlow = () => {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const newConvo = useNewConvoStore((state) => state.convo) as any;

  return (
    <div>
      <ContentTitleInput />
      <div className="w-full">
        <LangAndContentTypeSelector />
      </div>

      <UploadFileButton
        className="mt-12"
        types={["mov", "mp4"]}
        onSuccess={(newAudio) => {
          setConvo("title", newAudio.name || "");
          setConvo("videoId", newAudio.id);
        }}
      >
        Add Video
      </UploadFileButton>

      {newConvo?.videoId && <VideoPreview userAssetId={newConvo.videoId} />}

      <BackgroundImageSelector />

      <TranscriptionsInput />
    </div>
  );
};
