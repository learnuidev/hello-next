import Link from "next/link";

import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { resolveLangCode } from "@/libs/openai/utils";

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
    <div className="text-center my-2 sm:my-8 h-20">
      <p className="text-gray-400 text-sm sm:text-[16px]">
        {currentTranscription?.pinyin}
      </p>

      <Link
        onClick={() => {
          setIfExists({ ...currentTranscription, contentId });
        }}
        className="text-xl sm:text-3xl font-extralight"
        href={`/nmm/${encodeURIComponent(
          currentTranscription?.input || currentTranscription?.hanzi
        )}${currentTranscription?.lang ? `?lang=${resolveLangCode(currentTranscription?.lang)}` : ""}`}
        target="_blank"
      >
        {currentTranscription?.input || currentTranscription?.hanzi}
      </Link>

      <p className="text-gray-500 text-sm sm:text-[16px]">
        {currentTranscription?.en}
      </p>
    </div>
  );
};
