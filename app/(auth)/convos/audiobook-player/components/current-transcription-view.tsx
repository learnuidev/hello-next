import { useReadModeState } from "@/components/read-mode-button";
import { cn } from "@/lib/utils";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { ReaderView } from "./reader-view";
import { StandardView } from "./standard-view";

export function CurrentTranscriptionView({
  currentTranscription,
  containsChinglish,
  seekAndPlay,
  className,
  contentId,
  lang,
  currentTime,
}: CurrentTranscriptionProps) {
  const { readMode } = useReadModeState();

  return (
    <div className={cn("mt-4 lg:mt-24 max-w-7xl mx-4", className)}>
      {readMode ? (
        <div className="max-w-7xl">
          <ReaderView
            currentTime={currentTime}
            containsChinglish={containsChinglish}
            currentTranscription={currentTranscription}
            seekAndPlay={seekAndPlay}
            className={className}
            contentId={contentId}
            lang={lang}
          />
        </div>
      ) : (
        <StandardView
          currentTime={currentTime}
          containsChinglish={containsChinglish}
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
          className={className}
          contentId={contentId}
          lang={lang}
        />
      )}
    </div>
  );
}
