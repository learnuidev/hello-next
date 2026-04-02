import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { useFontSizeStore } from "../hooks/use-font-size";

export function EnView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
}: CurrentTranscriptionProps) {
  const { showChinglish } = useChinglishState();
  const { fontSize } = useFontSizeStore();
  return (
    <p
      onClick={() => {
        if (seekAndPlay) seekAndPlay(currentTranscription.start);
      }}
      style={{ fontSize: `${fontSize}px` }}
      className="dark:text-gray-600 font-extralight"
    >
      {showChinglish && containsChinglish
        ? currentTranscription?.chinglish
        : currentTranscription?.en}
    </p>
  );
}
