import { useCurrentTime } from "../youtube-page/use-current-time-store";
import { TextToSpeechProviders } from "./selected-character.constants";
import { useCharacterSoundState } from "./use-character-sound-state";
import { CharacterItem } from "./character-item";
import Link from "next/link";
import { smartSplit } from "../youtube-page/utils/smart-split";
import { cn } from "@/lib/utils";
import { useIsPlayingState } from "../youtube-page/use-is-playing-state";
import { useYoutubeRefState } from "./use-youtube-ref-state";

export const WithInteractiveTitle = ({
  text,
  lang,
  provider,
  children,
  className,
  customRef,
}: {
  text: string;
  lang: string;
  provider: TextToSpeechProviders;
  children: React.ReactNode;
  className?: string;
  customRef?: any;
}) => {
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

  if (!characterSound?.speechMarks?.chunks) {
    return children;
  }

  return (
    <div className={className}>
      {characterSound?.speechMarks?.chunks?.map((item: any) => {
        const startTime = item?.startTime / 1000;
        const endTime = item?.endTime / 1000;

        return (
          <Link
            href={isPlaying ? "" : `/nmm/${item?.value}?lang=${lang}`}
            key={`smart-character-outer-${JSON.stringify(item)}`}
            onClick={() => {
              if (isPlaying) {
                seekAndPlay(startTime);
                // setCurrentTime(startTime);
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
                        // text?.length < 8 ? "lg:text-4xl text-4xl" : "text-2xl",
                        isPlaying
                          ? currentTime >= startTime && currentTime <= endTime
                            ? "dark:text-white text-black"
                            : "dark:text-gray-800 text-gray-500"
                          : "",
                        className
                      )}
                      // disableForgotten
                      character={item}
                    />
                  </span>
                );
              }
            )}{" "}
          </Link>
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
