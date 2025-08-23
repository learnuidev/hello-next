import { Icons } from "@/components/ui/icons.v2";
import { useState } from "react";

import { NewConvoInput } from "../../new-convo/new-convo-input";
import { UploadSubtitlesInput } from "./upload-subtitles-input";

const CancelTranscriptionView = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="mb-8"
      onClick={() => {
        onClick();
      }}
    >
      <Icons.xMark />
    </button>
  );
};

export const TranscriptionsInput = () => {
  const [transcriptionView, setTranscriptionView] = useState<
    "add-text" | "add-file" | null
  >(null);

  if (transcriptionView === "add-text") {
    return (
      <div>
        <CancelTranscriptionView
          onClick={() => {
            setTranscriptionView(null);
          }}
        />

        <NewConvoInput />
      </div>
    );
  }

  if (transcriptionView === "add-file") {
    return (
      <div>
        <CancelTranscriptionView
          onClick={() => {
            setTranscriptionView(null);
          }}
        />

        <UploadSubtitlesInput />
      </div>
    );
  }

  return (
    <div className="flex gap-4 sm:gap-8 flex-col sm:flex-row items-center">
      <button
        onClick={() => {
          setTranscriptionView("add-text");
        }}
      >
        <Icons.plusIcon /> <span>Add subtitles text</span>
      </button>

      <p className="sm:my-4 my-0 text-gray-500">or</p>

      <button
        onClick={() => {
          setTranscriptionView("add-file");
        }}
      >
        <Icons.upload /> <span>Upload subtitles</span>
      </button>
    </div>
  );
};
