import Link from "next/link";

import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { resolveLangCode } from "@/libs/openai/utils";
import { CharacterItem } from "../_select-character/character-item";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { smartSplit } from "./utils/smart-split";
import { useCallback, useMemo } from "react";
import { HanziTooltip } from "../_select-character/selected-character/hanzi-tooltip";
import { isNonRomanLang } from "../_select-character/utils/is-non-roman-lang";
import { cn } from "@/lib/utils";
import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";
import {
  CurrentTranscriptionView,
  PinyinView,
} from "@/app/(auth)/convos/audiobook-player/components/current-transcription-view";

export const ActiveTranscription = ({
  currentTime,
  transcriptions,
  contentId,
  className,
  seekAndPlay,
  containsChinglish,
}: {
  seekAndPlay: (value: number) => void;
  currentTime: number;
  transcriptions: any;
  contentId: string;
  className?: string;
  containsChinglish: boolean;
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
        return `/nmm`;
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
          className="mb-4 sm:mb-8"
        />
      ) : (
        <div className="text-center sm:mt-8 mt-4 mb-2 h-20"></div>
      )}
    </MandoContextMenu>
  );
};
