import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { CurrentTranscriptionView } from "@/app/(auth)/convos/audiobook-player/components/current-transcription-view";
import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";
import { resolveLangCode } from "@/libs/openai/utils";
import { useCallback, useMemo } from "react";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { smartSplit } from "./utils/smart-split";

export const ActiveTranscription = ({
  currentTime,
  transcriptions,
  contentId,
  className,
  seekAndPlay,
  containsChinglish = false,
  lang,
}: {
  seekAndPlay: (value: number) => void;
  currentTime: number;
  transcriptions: any;
  contentId: string;
  className?: string;
  containsChinglish?: boolean;
  lang: string;
}) => {
  const currentTranscription = transcriptions?.find(
    (trans: any) => trans?.start <= currentTime && trans?.end >= currentTime
  );

  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  const setIfExists = useSetIfExists();

  const splittedStrings = useMemo(() => {
    return smartSplit({
      input: currentTranscription?.input || currentTranscription?.hanzi,
      lang: currentTranscription?.lang,
    });
  }, [
    currentTranscription?.hanzi,
    currentTranscription?.input,
    currentTranscription?.lang,
  ]);

  const getHref = useCallback(
    ({ val }: any) => {
      try {
        return `/nmm/${encodeURIComponent(
          val
        )}${currentTranscription?.lang ? `?lang=${resolveLangCode(currentTranscription?.lang)}` : ""}`;
      } catch (err) {
        return `/`;
      }
    },
    [currentTranscription]
  );

  return (
    <MandoContextMenu lang={currentTranscription?.lang}>
      {currentTranscription ? (
        <CurrentTranscriptionView
          containsChinglish={containsChinglish}
          seekAndPlay={seekAndPlay}
          currentTranscription={currentTranscription}
          className="mb-4 sm:mb-8 sm:mt-8 mt-4"
          contentId={contentId}
          lang={lang}
        />
      ) : (
        <div className="text-center sm:mt-8 mt-4 mb-2 h-20"></div>
      )}
    </MandoContextMenu>
  );
};
