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
import { useChinglishState } from "../settings-dialog/use-chinglish-state";

export const ActiveTranscription = ({
  currentTime,
  transcriptions,
  contentId,
  className,
  containsChinglish,
}: {
  currentTime: number;
  transcriptions: any;
  contentId: string;
  className?: string;
  containsChinglish?: boolean;
}) => {
  const currentTranscription = transcriptions?.find(
    (trans: any) => trans?.start <= currentTime && trans?.end >= currentTime
  );

  const { showChinglish, setShowChinglish } = useChinglishState();

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
      <div
        className={cn(
          "text-center sm:mt-8 mt-4 mb-4 h-24",

          currentTranscription?.en?.length > 200 && "",
          currentTranscription?.en?.length > 350 && "",

          className
        )}
      >
        {showPinyin && isNonRomanLang(currentTranscription?.lang) && (
          <Link
            target="_blank"
            href={`/nmm/${encodeURIComponent(
              currentTranscription?.input || currentTranscription?.hanzi
            )}${currentTranscription?.lang ? `?lang=${resolveLangCode(currentTranscription?.lang)}` : ""}`}
            className="dark:text-gray-400 text-gray-800 text-sm sm:text-[16px]"
          >
            {currentTranscription?.lang === "zh"
              ? currentTranscription?.pinyin
              : currentTranscription?.roman}
          </Link>
        )}

        <p
          onClick={() => {
            setIfExists({ ...currentTranscription, contentId });
          }}
          className="text-lg sm:text-3xl font-extralight"
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
                href={getHref({ val })}
                target="_blank"
                className="text-xs"
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

        <Link
          target="_blank"
          href={`/nmm/${encodeURIComponent(
            currentTranscription?.input || currentTranscription?.hanzi
          )}${currentTranscription?.lang ? `?lang=${resolveLangCode(currentTranscription?.lang)}` : ""}`}
          className="dark:text-gray-400 text-gray-800 text-sm sm:text-[16px]"
        >
          {containsChinglish && showChinglish
            ? currentTranscription?.chinglish
            : currentTranscription?.en}
        </Link>
      </div>
    </MandoContextMenu>
  );
};
