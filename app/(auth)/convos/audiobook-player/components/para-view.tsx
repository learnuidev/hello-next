import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { cn, groupBy } from "@/lib/utils";
import { useMemo } from "react";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";

import { ScrollArea } from "@/components/ui/scroll-area";

import { EnglishTopView } from "@/app/(auth)/convos/audiobook-player/components/english-top-view";
import { CharacterItem } from "@/components/_select-character/character-item";
import { isCharacterPartOfWordMatch } from "@/lib/content-bookmark";
import { useFontSizeStore } from "../hooks/use-font-size";
import { useGetGroupedTranscriptions } from "../hooks/use-get-grouped-transcriptions";

// import { getYablaLink } from "./utils/get-yabla-link";

const MAX_LIMIT = 9000;

export const ParaView = ({
  content,
  currentTranscription,
  currentTime,
  loop,

  isPlaying,
  seekAndPlay,
}: {
  loop?: ContentTranscription;
  currentTranscription: ContentTranscription;
  content: IContent;
  currentTime: number;
  isPlaying: boolean;

  seekAndPlay: (time: number) => void;
}) => {
  const showEn = useBrightModeStore((state) => state.showEn);

  const { data: contentUnknowns } = useListContentUnknownsQuery(content.id);

  const { setShowMenuBar } = useCharacterMenuBarStore();

  // const active = 16;
  const activeTimeLimit = usePlayerViewModeStore(
    (state) => state.activeTimeLimit,
  );

  const { showChinglish, setShowChinglish } = useChinglishState();

  const group = useGetGroupedTranscriptions({
    loop,
    currentTime,
    content,
  });

  const transcriptions = content?.transcriptions;
  const trans = useMemo(() => {
    return transcriptions;
  }, [transcriptions]);

  const groupedTranscriptions = groupBy(trans || []);

  const paraTranscriptions =
    activeTimeLimit !== 9000
      ? [Object.values(groupedTranscriptions)?.[0]]
      : Object.values(groupedTranscriptions);

  const { fontSize } = useFontSizeStore();

  return (
    <div className={cn("px-4 pb-24", "max-w-4xl")}>
      <EnglishTopView currentTranscription={currentTranscription} />

      <div className="pb-32">
        <ScrollArea
          className={cn(
            `space-y-4 rounded-md dark:border-gray-900 w-full pb-8`,
            "h-[400px] sm:h-[640px]",
          )}
        >
          <div
            className="space-y-8"
            style={{ lineHeight: `${fontSize * 2.25}px` }}
          >
            {paraTranscriptions?.map((transcriptions: any) => {
              const hanzis = transcriptions
                ?.map((t: any) => t?.hanzi)
                ?.join("");

              return (
                <div
                  key={`${JSON.stringify(transcriptions)}-${JSON.stringify(hanzis)}`}
                >
                  <div className="flex flex-wrap">
                    {(activeTimeLimit !== MAX_LIMIT
                      ? group
                      : transcriptions
                    ).map((transcription: any) => {
                      const isActiveTranscription =
                        transcription?.start < currentTime &&
                        transcription?.end > currentTime;

                      const transcriptionInput =
                        transcription?.input || transcription?.hanzi;

                      return (
                        <span
                          role="button"
                          className={`${
                            currentTime
                              ? isActiveTranscription
                                ? "dark:text-white text-black dark:bg-[rgb(11,12,13)]"
                                : "opacity-50"
                              : ""
                          } transition block py-1 px-1`}
                          key={
                            transcription?.id ||
                            `${transcription?.hanzi}-${transcription?.start}`
                          }
                          onClick={() => {
                            seekAndPlay(transcription?.start);
                          }}
                        >
                          {smartSplit({
                            input: transcriptionInput,
                            lang: content?.lang,
                          })?.map((item: string, idx: number) => {
                            const containsInUnknown =
                              contentUnknowns?.items?.find((val) => {
                                return isCharacterPartOfWordMatch(
                                  transcriptionInput,
                                  val?.input,
                                  item,
                                  idx,
                                );
                              });

                            return (
                              <span
                                className="sm:text-xl"
                                key={`para-mode-${item}-${idx}-${transcriptionInput}`}
                              >
                                <CharacterItem
                                  style={{
                                    fontSize: `${Math.min(42, fontSize * 1)}px`,
                                  }}
                                  character={item}
                                  className={cn(
                                    containsInUnknown &&
                                      "font-light dark:!text-pink-300 !text-pink-500",
                                    currentTime
                                      ? isActiveTranscription
                                        ? "dark:text-white text-black dark:bg-[rgb(11,12,13)]"
                                        : "opacity-50"
                                      : "",
                                  )}
                                />
                                {/* {item} */}
                              </span>
                            );
                          })}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
