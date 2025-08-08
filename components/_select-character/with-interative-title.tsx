import { useCurrentTime } from "../youtube-page/use-current-time-store";
import { TextToSpeechProviders } from "./selected-character.constants";
import { useCharacterSoundState } from "./use-character-sound-state";
import { CharacterItem } from "./character-item";
import Link from "next/link";
import { smartSplit } from "../youtube-page/utils/smart-split";
import { cn } from "@/lib/utils";
import { useIsPlayingState } from "../youtube-page/use-is-playing-state";
import { useYoutubeRefState } from "./use-youtube-ref-state";
import { openInNewWindow } from "@/app/review/review-cloze-content/utils/open-in-new-window";
import { useRouter } from "next/navigation";
import { useAudioProviderState } from "../settings-dialog/hooks/use-audio-provider-state";

export const WithInteractiveTitle = ({
  text,
  lang,

  children,
  className,
  customRef,
}: {
  text: string;
  lang: string;
  children: React.ReactNode;
  className?: string;
  customRef?: any;
}) => {
  const { provider, setProvider } = useAudioProviderState();
  const id = `${text}#${lang}#${provider}`;
  const { currentTime, setCurrentTime } = useCurrentTime(id);

  const { seekAndPlay, youtubeRef } = useYoutubeRefState();

  const playerRef = customRef || youtubeRef;

  const { isPlaying, setIsPlaying } = useIsPlayingState(id);
  const { characterSound } = useCharacterSoundState({
    input: text,
    lang,
    provider,
  });

  const router = useRouter();

  if (!characterSound?.speechMarks?.chunks) {
    return children;
  }

  if (!isPlaying && lang !== "zh") {
    return children;
  }

  if (provider !== "speechify") {
    return children;
  }

  return (
    <div className={className}>
      {characterSound?.speechMarks?.chunks?.map((item: any) => {
        const startTime = item?.startTime / 1000;
        const endTime = item?.endTime / 1000;

        const link = isPlaying ? "" : `/nmm/${item?.value}?lang=${lang}`;

        return (
          <span
            // href={link}
            key={`smart-character-outer-${JSON.stringify(item)}`}
            onClick={() => {
              if (isPlaying) {
                seekAndPlay(startTime, playerRef);
                // setCurrentTime(startTime);
              } else {
                router.push(link);
                // openInNewWindow(link);
              }
            }}
          >
            {smartSplit({ input: item?.value, lang })?.map(
              (item: string, idx: number) => {
                return (
                  <span
                    className={cn(text?.length < 4 ? "text-5xl" : "text-2xl")}
                    key={`smart-character-${JSON.stringify(item)}-${idx}-${idx}`}
                    // href={`/nmm/${item}?lang=${lang}`}
                  >
                    <CharacterItem
                      className={cn(
                        "transition-all",
                        // text?.length < 8 ? "lg:text-4xl text-4xl" : "text-2xl",
                        isPlaying
                          ? currentTime >= startTime && currentTime <= endTime
                            ? "dark:text-white text-black"
                            : "dark:text-gray-700 text-gray-300"
                          : "",

                        "dark:hover:text-white hover:text-black",
                        className
                      )}
                      // disableForgotten
                      character={item}
                    />
                  </span>
                );
              }
            )}{" "}
          </span>
        );
      })}
      {/* <code>
        <pre>
          {JSON.stringify(
            {
              currentTime,
              ...characterSound,
            },
            null,
            4
          )}
        </pre>
      </code> */}
    </div>
  );
};
