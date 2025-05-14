import Link from "next/link";

import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { resolveLangCode } from "@/libs/openai/utils";
import { CharacterItem } from "../_select-character/character-item";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { smartSplit } from "./utils/smart-split";
import { useMemo } from "react";
import { HanziTooltip } from "../_select-character/selected-character/hanzi-tooltip";

export const ActiveTranscription = ({
  currentTime,
  transcriptions,
  contentId,
}: {
  currentTime: number;
  transcriptions: any;
  contentId: string;
}) => {
  const currentTranscription = transcriptions?.find(
    (trans: any) => trans?.start < currentTime && trans?.end > currentTime
  );

  const showPinyin = useBrightModeStore((state: any) => state.showPinyin);

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

  // return "TODO";

  return (
    <div className="text-center my-2 sm:mt-8 mt-4 mb-4 h-20">
      {showPinyin && (
        <Link
          target="_blank"
          href={`/nmm/${encodeURIComponent(
            currentTranscription?.input || currentTranscription?.hanzi
          )}${currentTranscription?.lang ? `?lang=${resolveLangCode(currentTranscription?.lang)}` : ""}`}
          className="text-gray-400 text-sm sm:text-[16px]"
        >
          {currentTranscription?.roman || currentTranscription?.pinyin}
        </Link>
      )}

      <p
        onClick={() => {
          setIfExists({ ...currentTranscription, contentId });
        }}
        className="text-xl sm:text-3xl font-extralight"
      >
        {splittedStrings?.map((val: string, idx: number) => {
          if (val === " ") {
            return (
              <span key={`active-transcription-${val}-${idx}`}>{val}</span>
            );
          }
          return (
            <Link
              onClick={() => {
                setIfExists({ ...currentTranscription, contentId });
              }}
              href={`/nmm/${encodeURIComponent(
                val
              )}${currentTranscription?.lang ? `?lang=${resolveLangCode(currentTranscription?.lang)}` : ""}`}
              target="_blank"
              key={`active-transcription-${val}-${idx}`}
            >
              <HanziTooltip
                component={{
                  hanzi: val,
                  input: val,
                  en: val || "",
                  pinyin: val,
                  lang: currentTranscription?.lang,
                }}
                character={val}
                lang={currentTranscription?.lang}
                key={JSON.stringify(val)}
              >
                <CharacterItem character={val} />{" "}
              </HanziTooltip>
            </Link>
          );
        })}
      </p>

      <p className="text-gray-500 text-sm sm:text-[16px]">
        {currentTranscription?.en}
      </p>
    </div>
  );
};
