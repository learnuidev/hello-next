import { GenerateAudioDialog } from "./generate-audio-dialog/generate-audio-dialog";
import { UploadAudioButton } from "./upload-audio-button";

export const AddAudioButtons = (props: any) => {
  return (
    <div className="flex space-x-8 items-center">
      <UploadAudioButton {...props} />
      <GenerateAudioDialog />
    </div>
  );
};
