import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { CurrentTranscriptionProps } from "../audiobook-player.types";

export function EnView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
}: CurrentTranscriptionProps) {
  const { showChinglish } = useChinglishState();
  return (
    <p
      onClick={() => {
        if (seekAndPlay) seekAndPlay(currentTranscription.start);
      }}
      className="text-[16px] sm:text-xl dark:text-gray-600 font-extralight"
    >
      {showChinglish && containsChinglish
        ? currentTranscription?.chinglish
        : currentTranscription?.en}
    </p>
  );
}
