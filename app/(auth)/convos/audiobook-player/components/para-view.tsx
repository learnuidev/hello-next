import { useReadModeState } from "@/components/read-mode-button";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { getActiveTranscriptions } from "@/components/youtube-page/get-active-transcriptions";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { cn, groupBy } from "@/lib/utils";
import { useMemo } from "react";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { ActiveButtons } from "./active-buttons";

import { ScrollArea } from "@/components/ui/scroll-area";

import { faLanguage, faRepeat } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { CharacterItem } from "@/components/_select-character/character-item";
import { useFontSizeStore } from "../hooks/use-font-size";

// import { getYablaLink } from "./utils/get-yabla-link";

const MAX_LIMIT = 9000;

export const ParaView = ({
  content,
  currentTranscription,
  currentTime,

  isPlaying,
  seekAndPlay,
}: {
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
  const active = usePlayerViewModeStore((state) => state.active);

  const { showChinglish, setShowChinglish } = useChinglishState();

  const group = useMemo(() => {
    return getActiveTranscriptions({
      limit: active,
      currentTime,
      transcriptions: content?.transcriptions || [],
    });
  }, [active, currentTime, content?.transcriptions]);

  const transcriptions = content?.transcriptions;
  const trans = useMemo(() => {
    return transcriptions;
  }, [transcriptions]);

  const groupedTranscriptions = groupBy(trans || []);

  const paraTranscriptions =
    active !== 9000
      ? [Object.values(groupedTranscriptions)?.[0]]
      : Object.values(groupedTranscriptions);

  const { fontSize } = useFontSizeStore();

  return (
    <div className={cn("px-4 pb-24", "max-w-4xl", "dark:bg-[rgb(13,14,15)]")}>
      <div className="sticky top-0 py-4 bg-gray-50 z-50 dark:bg-[rgb(9,10,11)]">
        <ActiveButtons />
        <div className="pb-4">
          <div
            className={cn(
              `flex justify-between items-center mt-2 w-full px-2`,
              "h-32"
            )}
          >
            <p className="space-x-2 font-extralight pb-[4px] overflow sm:text-xl text-sm">
              {showEn
                ? showChinglish
                  ? currentTranscription?.chinglish || currentTranscription?.en
                  : currentTranscription?.en
                : null}
            </p>
          </div>
        </div>
      </div>

      <div className="pb-32">
        <ScrollArea
          className={cn(
            `space-y-4 rounded-md  p-2 dark:border-gray-900 w-full pb-8`,
            "h-[400px] sm:h-[640px]"
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
                    {(active !== MAX_LIMIT ? group : transcriptions).map(
                      (transcription: any) => {
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
                                  ? "dark:text-white light:bg-yellow-200"
                                  : "dark:text-gray-400"
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
                                contentUnknowns?.items?.find((val) =>
                                  val?.input?.includes(item)
                                );

                              return (
                                <span
                                  style={{ fontSize: `${fontSize * 1.25}px` }}
                                  className="sm:text-xl"
                                  key={`para-mode-${item}-${idx}-${transcriptionInput}`}
                                >
                                  {/* <CharacterItem
                                    character={item}
                                    className={
                                      containsInUnknown &&
                                      "font-light dark:!text-pink-300 !text-pink-500 text-2xl"
                                    }
                                  /> */}
                                  {item}
                                </span>
                              );
                            })}
                          </span>
                        );
                      }
                    )}
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
