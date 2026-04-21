import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAudioProviderState } from "../settings-dialog/hooks/use-audio-provider-state";
import { useCurrentTime } from "../youtube-page/use-current-time-store";
import { useIsPlayingState } from "../youtube-page/use-is-playing-state";
import { smartSplit } from "../youtube-page/utils/smart-split";
import { CharacterItem } from "./character-item";
import { useCharacterSoundState } from "./use-character-sound-state";
import { useYoutubeRefState } from "./use-youtube-ref-state";

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
  const { currentTime, setCurrentTime, duration } = useCurrentTime(id);

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
            key={`smart-character-outer-${JSON.stringify(item)}`}
            onClick={() => {
              if (isPlaying) {
                seekAndPlay(startTime, playerRef);
              } else {
                router.push(link);
              }
            }}
          >
            {smartSplit({ input: item?.value, lang })?.map(
              (character: string, idx: number) => {
                return (
                  <span
                    className={cn(text?.length < 4 ? "text-5xl" : "text-2xl")}
                    key={`smart-character-${JSON.stringify(character)}-${idx}-${idx}`}
                    // href={`/nmm/${item}?lang=${lang}`}
                  >
                    <CharacterItem
                      hanzis={smartSplit({ input: item?.value, lang })}
                      className={cn(
                        "transition-all",
                        // text?.length < 8 ? "lg:text-4xl text-4xl" : "text-2xl",
                        isPlaying
                          ? currentTime >= startTime && currentTime <= endTime
                            ? "dark:text-white text-black"
                            : "dark:text-gray-700 text-gray-300"
                          : "",

                        "dark:hover:text-white hover:text-black",
                        className,
                      )}
                      // disableForgotten
                      character={character}
                    />
                  </span>
                );
              },
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
