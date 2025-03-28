import Link from "next/link";

import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { resolveLangCode } from "@/libs/openai/utils";
import { CharacterItem } from "../_select-character/character-item";

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

  const setIfExists = useSetIfExists();

  return (
    <div className="text-center my-2 sm:mt-8 mt-4 mb-4 h-20">
      <Link
        target="_blank"
        href={`/nmm/${encodeURIComponent(
          currentTranscription?.input || currentTranscription?.hanzi
        )}${currentTranscription?.lang ? `?lang=${resolveLangCode(currentTranscription?.lang)}` : ""}`}
        className="text-gray-400 text-sm sm:text-[16px]"
      >
        {currentTranscription?.pinyin || currentTranscription?.roman}
      </Link>

      <p
        onClick={() => {
          setIfExists({ ...currentTranscription, contentId });
        }}
        className="text-xl sm:text-3xl font-extralight"
      >
        {(currentTranscription?.input || currentTranscription?.hanzi)
          ?.split("")
          ?.map((val: string, idx: number) => {
            return (
              <Link
                onClick={() => {
                  setIfExists({ ...currentTranscription, contentId });
                }}
                href={`/nmm/${encodeURIComponent(
                  val
                )}${currentTranscription?.lang ? `?lang=${resolveLangCode(currentTranscription?.lang)}` : ""}`}
                target="_blank"
                key={`${val}-${idx}`}
              >
                <CharacterItem val={val} />
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
