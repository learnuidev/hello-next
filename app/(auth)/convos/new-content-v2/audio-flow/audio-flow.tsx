// allow users to upload audio

import { useNewConvoStore } from "@/components/step";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { LangAndContentTypeSelector } from "../components/lang-content-type-selector";
import { ContentTitleInput } from "../components/content-title-input";
import { AudioPreview } from "./components/audio-preview";

export const AudioFlow = () => {
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
        types={["mp3", "m4a", "webm"]}
        onSuccess={(newAudio) => {
          setConvo("title", newAudio.name || "");
          setConvo("audioId", newAudio.id);
        }}
      />

      {newConvo?.audioId && <AudioPreview userAssetId={newConvo.audioId} />}
    </div>
  );
};
